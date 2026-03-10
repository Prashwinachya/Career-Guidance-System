import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  applyJob,
  fetchJobs,
  fetchRecommendations,
  fetchReports,
  generateReport,
  saveJob,
  uploadResume
} from "./careerService";
import {
  analyzeResumeFile,
  buildResumeOverview,
  personalizeJobs,
  personalizeRecommendations
} from "./resumeAnalyzer";
import { FALLBACK_JOBS, FALLBACK_RECOMMENDATIONS, FALLBACK_REPORTS } from "./fallbackData";

const AppContext = createContext(null);
const AUTH_KEY = "cgs-auth";
const USERS_KEY = "cgs-users";
const SESSION_USER_KEY = "cgs-session-user";

const DEFAULT_PROFILE = {
  phone: "+91 98765 43210",
  location: "Mangalore, Karnataka",
  university: "Sahyadri College of Engineering & Management",
  degree: "B.E. Computer Science",
  graduationYear: "2027",
  targetRole: "Frontend Developer",
  experienceLevel: "Student",
  bio: "Motivated computer science student focused on building production-ready web applications and improving placement readiness.",
  skills: ["React", "JavaScript", "Node.js", "SQL"],
  linkedin: "https://linkedin.com/in/demo-user",
  github: "https://github.com/demo-user",
  savedJobs: [],
  appliedJobs: [],
  generatedReports: [],
  resumeAnalysis: null,
  uploadedResumeName: "",
  uploadedResumeAt: ""
};

function normalizeUser(user) {
  return {
    ...user,
    profile: {
      ...DEFAULT_PROFILE,
      ...(user.profile || {})
    }
  };
}

function createUserRecord({ id, name, email, password, createdAt }) {
  return normalizeUser({
    id,
    name,
    email,
    password,
    createdAt,
    profile: {
      ...DEFAULT_PROFILE,
      linkedin: `https://linkedin.com/in/${name.trim().toLowerCase().replace(/\s+/g, "-")}`,
      github: `https://github.com/${name.trim().toLowerCase().replace(/\s+/g, "-")}`
    }
  });
}

function getStoredUsers() {
  const rawUsers = localStorage.getItem(USERS_KEY);
  if (rawUsers) {
    try {
      const parsed = JSON.parse(rawUsers);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map(normalizeUser);
      }
    } catch {
      // Fall through to default demo account.
    }
  }

  const demoUsers = [createUserRecord({
    id: "demo-user",
    name: "Demo User",
    email: "demo@example.com",
    password: "password123",
    createdAt: "2026-01-01"
  })];
  localStorage.setItem(USERS_KEY, JSON.stringify(demoUsers));
  return demoUsers;
}

function toSafeUser(user) {
  if (!user) return null;
  const { password, ...safeUser } = user;
  return safeUser;
}

export function AppProvider({ children }) {
  const [users, setUsers] = useState(getStoredUsers);
  const [currentUser, setCurrentUser] = useState(() => {
    const sessionEmail = localStorage.getItem(SESSION_USER_KEY);
    if (!sessionEmail) return null;
    return getStoredUsers().find((user) => user.email === sessionEmail) ?? null;
  });
  const [isAuth, setIsAuth] = useState(localStorage.getItem(AUTH_KEY) === "1" && Boolean(localStorage.getItem(SESSION_USER_KEY)));
  const [recommendationCatalog, setRecommendationCatalog] = useState([]);
  const [jobCatalog, setJobCatalog] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [reports, setReports] = useState([]);
  const [activity, setActivity] = useState([
    { title: "Resume uploaded and analyzed", time: "2 hours ago" },
    { title: "Career recommendations generated", time: "1 day ago" },
    { title: "Skill gap analysis completed", time: "2 days ago" },
    { title: "Profile updated", time: "3 days ago" }
  ]);
  const [stats, setStats] = useState({ apps: 0, matches: 0, views: 156, skills: 15 });
  const [toast, setToast] = useState("");

  useEffect(() => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }, [users]);

  const showToast = (message) => {
    setToast(message);
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => setToast(""), 1800);
  };

  useEffect(() => {
    async function loadData() {
      try {
        const [recData, jobData, reportData] = await Promise.all([
          fetchRecommendations(),
          fetchJobs(),
          fetchReports()
        ]);
        setRecommendationCatalog(recData);
        setJobCatalog(jobData);
        setReports(reportData);
      } catch (error) {
        setRecommendationCatalog(FALLBACK_RECOMMENDATIONS);
        setJobCatalog(FALLBACK_JOBS);
        setReports(FALLBACK_REPORTS);
      }
    }

    loadData();
  }, []);

  useEffect(() => {
    const resumeAnalysis = currentUser?.profile?.resumeAnalysis;

    if (!resumeAnalysis) {
      setRecommendations([]);
      setJobs([]);
      return;
    }

    setRecommendations(personalizeRecommendations(recommendationCatalog, resumeAnalysis));
    setJobs(personalizeJobs(jobCatalog, resumeAnalysis, currentUser.profile));
  }, [recommendationCatalog, jobCatalog, currentUser]);

  useEffect(() => {
    const appliedCount = currentUser?.profile?.appliedJobs?.length || 0;
    const skillCount = currentUser?.profile?.resumeAnalysis?.extractedSkills?.length || 0;

    setStats({
      apps: appliedCount,
      matches: jobs.filter((job) => job.recommended).length,
      views: 80 + skillCount * 5,
      skills: skillCount
    });
  }, [currentUser, jobs]);

  useEffect(() => {
    const userReports = currentUser?.profile?.generatedReports || [];
    if (!userReports.length) {
      return;
    }

    setReports((prev) => {
      const existingIds = new Set(prev.map((report) => report.id));
      return [...userReports.filter((report) => !existingIds.has(report.id)), ...prev];
    });
  }, [currentUser]);

  const persistUser = (updatedUser) => {
    setCurrentUser(updatedUser);
    setUsers((prev) => prev.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
  };

  const login = (email, password) => {
    const normalizedEmail = email.trim().toLowerCase();
    const matchedUser = users.find((user) => user.email.toLowerCase() === normalizedEmail && user.password === password);

    if (!matchedUser) {
      showToast("Invalid credentials");
      return false;
    }

    localStorage.setItem(AUTH_KEY, "1");
    localStorage.setItem(SESSION_USER_KEY, matchedUser.email);
    setCurrentUser(normalizeUser(matchedUser));
    setIsAuth(true);
    showToast(`Welcome back, ${matchedUser.name}`);
    return true;
  };

  const signup = ({ name, email, password, confirmPassword }) => {
    const normalizedEmail = email.trim().toLowerCase();
    const cleanName = name.trim();

    if (!cleanName || !normalizedEmail || !password) {
      showToast("All fields are required");
      return false;
    }

    if (!/^\S+@\S+\.\S+$/.test(normalizedEmail)) {
      showToast("Enter a valid email address");
      return false;
    }

    if (password.length < 8) {
      showToast("Password should be at least 8 characters");
      return false;
    }

    if (password !== confirmPassword) {
      showToast("Passwords do not match");
      return false;
    }

    if (users.some((user) => user.email.toLowerCase() === normalizedEmail)) {
      showToast("Account already exists. Please sign in.");
      return false;
    }

    const createdUser = createUserRecord({
      id: `user-${Date.now()}`,
      name: cleanName,
      email: normalizedEmail,
      password,
      createdAt: new Date().toISOString().slice(0, 10)
    });

    setUsers((prev) => [...prev, createdUser]);
    setCurrentUser(createdUser);
    localStorage.setItem(AUTH_KEY, "1");
    localStorage.setItem(SESSION_USER_KEY, createdUser.email);
    setIsAuth(true);
    showToast("Account created successfully");
    return true;
  };

  const logout = () => {
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(SESSION_USER_KEY);
    setCurrentUser(null);
    setIsAuth(false);
    showToast("Logged out");
  };

  const updateProfile = (profileData) => {
    if (!currentUser) {
      showToast("Sign in to update profile");
      return false;
    }

    const nextName = profileData.name?.trim() || "";
    const nextEmail = profileData.email?.trim().toLowerCase() || "";

    if (!nextName || !nextEmail) {
      showToast("Name and email are required");
      return false;
    }

    if (!/^\S+@\S+\.\S+$/.test(nextEmail)) {
      showToast("Enter a valid email address");
      return false;
    }

    const emailTaken = users.some(
      (user) => user.id !== currentUser.id && user.email.toLowerCase() === nextEmail
    );

    if (emailTaken) {
      showToast("That email is already used by another account");
      return false;
    }

    const updatedUser = normalizeUser({
      ...currentUser,
      name: nextName,
      email: nextEmail,
      profile: {
        ...currentUser.profile,
        ...profileData,
        skills: profileData.skills
      }
    });

    persistUser(updatedUser);
    localStorage.setItem(SESSION_USER_KEY, nextEmail);
    addActivity("Profile updated");
    showToast("Profile updated successfully");
    return true;
  };

  const loginWithProvider = (provider) => {
    const matchedUser = users.find((user) => user.email === "demo@example.com");
    if (!matchedUser) {
      showToast("Demo account unavailable");
      return false;
    }

    localStorage.setItem(AUTH_KEY, "1");
    localStorage.setItem(SESSION_USER_KEY, matchedUser.email);
    setCurrentUser(normalizeUser(matchedUser));
    setIsAuth(true);
    showToast(`${provider} sign in completed`);
    return true;
  };

  const addActivity = (title) => {
    setActivity((prev) => [{ title, time: "just now" }, ...prev].slice(0, 6));
  };

  const onResumeUpload = async (file) => {
    if (!file) {
      showToast("Select a resume file");
      return false;
    }

    if (!currentUser) {
      showToast("Sign in to upload your resume");
      return false;
    }

    let analysis;

    try {
      analysis = await analyzeResumeFile(file);
    } catch (error) {
      showToast(error.message || "Resume analysis failed");
      return false;
    }

    try {
      await uploadResume(file);
    } catch {
      // Continue with local analysis even if API upload fails.
    }

    const updatedUser = normalizeUser({
      ...currentUser,
      profile: {
        ...currentUser.profile,
        resumeAnalysis: analysis,
        uploadedResumeName: file.name,
        uploadedResumeAt: new Date().toISOString()
      }
    });

    persistUser(updatedUser);
    addActivity("Resume uploaded and analyzed");
    showToast("Resume analyzed successfully");
    return true;
  };

  const openApplicationUrl = (applyUrl) => {
    if (!applyUrl) {
      return;
    }

    const openedWindow = window.open(applyUrl, "_blank", "noopener,noreferrer");
    if (!openedWindow) {
      window.location.assign(applyUrl);
    }
  };

  const onApplyJob = async (jobId, options = {}) => {
    if (!currentUser?.profile?.resumeAnalysis) {
      showToast("Upload your resume to unlock job applications");
      return;
    }

    try {
      await applyJob(jobId);
    } catch {
      // Keep local applied state even if backend is not reachable.
    }
    setJobs((prev) => prev.map((job) => (job.id === jobId ? { ...job, applied: true } : job)));
    const selected = jobs.find((job) => job.id === jobId) || recommendations.find((job) => job.id === jobId) || null;
    const nextAppliedJobs = Array.from(new Set([...(currentUser.profile.appliedJobs || []), jobId]));
    persistUser({
      ...currentUser,
      profile: {
        ...currentUser.profile,
        appliedJobs: nextAppliedJobs
      }
    });

    openApplicationUrl(options.applyUrl || selected?.applyUrl);

    if (selected) {
      addActivity(`${selected.role} application submitted`);
      showToast(`Applied for ${selected.role}`);
      return;
    }

    showToast(options.role ? `Applied for ${options.role}` : "Application started");
  };

  const onSaveJob = async (jobId) => {
    if (!currentUser?.profile?.resumeAnalysis) {
      showToast("Upload your resume to unlock job saves");
      return;
    }

    try {
      await saveJob(jobId);
    } catch {
      // Keep local save state even if backend is not reachable.
    }
    setJobs((prev) => prev.map((job) => (job.id === jobId ? { ...job, saved: !job.saved } : job)));
    const alreadySaved = currentUser.profile.savedJobs || [];
    const nextSavedJobs = alreadySaved.includes(jobId)
      ? alreadySaved.filter((id) => id !== jobId)
      : [...alreadySaved, jobId];

    persistUser({
      ...currentUser,
      profile: {
        ...currentUser.profile,
        savedJobs: nextSavedJobs
      }
    });
    showToast(nextSavedJobs.includes(jobId) ? "Job saved" : "Saved job removed");
  };

  const onGenerateReport = async () => {
    if (!currentUser?.profile?.resumeAnalysis) {
      showToast("Upload your resume to generate a report");
      return;
    }

    let created;

    try {
      created = await generateReport();
    } catch {
      created = {
        id: `r-local-${Date.now()}`,
        title: `Generated Career Report ${reports.length + 1}`,
        date: new Date().toISOString().slice(0, 10),
        size: "2.0 MB",
        sections: ["Summary", "Skills", "Recommendations", "Market", "Action Plan"]
      };
    }

    setReports((prev) => [created, ...prev]);
    persistUser({
      ...currentUser,
      profile: {
        ...currentUser.profile,
        generatedReports: [created, ...(currentUser.profile.generatedReports || [])]
      }
    });
    showToast("New report generated");
  };

  const resumeAnalysis = currentUser?.profile?.resumeAnalysis || null;
  const hasResume = Boolean(resumeAnalysis);
  const resumeOverview = buildResumeOverview(resumeAnalysis, recommendations);

  const value = useMemo(
    () => ({
      isAuth,
      currentUser: toSafeUser(currentUser),
      hasResume,
      resumeAnalysis,
      resumeOverview,
      login,
      signup,
      loginWithProvider,
      logout,
      updateProfile,
      recommendations,
      jobs,
      reports,
      activity,
      stats,
      toast,
      showToast,
      onResumeUpload,
      onApplyJob,
      onSaveJob,
      onGenerateReport
    }),
    [isAuth, currentUser, hasResume, resumeAnalysis, resumeOverview, recommendations, jobs, reports, activity, stats, toast, users]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return ctx;
}
