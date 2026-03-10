const publicPage = document.getElementById("publicPage");
const loginPage = document.getElementById("loginPage");
const appPage = document.getElementById("appPage");
const welcomeLabel = document.getElementById("welcomeLabel");
const topDashboardBtn = document.getElementById("topDashboardBtn");
const topLogoutBtn = document.getElementById("topLogoutBtn");
const getStartedBtn = document.getElementById("getStartedBtn");
const loginForm = document.getElementById("loginForm");
const forgotBtn = document.getElementById("forgotBtn");
const signupBtn = document.getElementById("signupBtn");
const adminBtn = document.getElementById("adminBtn");
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const mobileDashBtn = document.getElementById("mobileDashBtn");
const mobileLogoutBtn = document.getElementById("mobileLogoutBtn");
const themeBtn = document.getElementById("themeBtn");
const toast = document.getElementById("toast");

const sideButtons = document.querySelectorAll(".side-btn");
const pagePanels = document.querySelectorAll(".page-panel");
const navButtons = document.querySelectorAll(".nav-btn, .mobile-nav");

const quickActions = document.getElementById("quickActions");
const kpiCards = document.getElementById("kpiCards");
const activityList = document.getElementById("activityList");
const recommendationCards = document.getElementById("recommendationCards");
const loadMoreBtn = document.getElementById("loadMoreBtn");
const skillGaps = document.getElementById("skillGaps");
const companyForm = document.getElementById("companyForm");
const jobMatchRows = document.getElementById("jobMatchRows");

const jobsList = document.getElementById("jobsList");
const jobTabs = document.getElementById("jobTabs");
const jobCounters = document.getElementById("jobCounters");
const jobSearch = document.getElementById("jobSearch");
const jobSearchBtn = document.getElementById("jobSearchBtn");
const appliedFormBlock = document.getElementById("appliedFormBlock");
const appliedFormMeta = document.getElementById("appliedFormMeta");
const appliedForm = document.getElementById("appliedForm");

const reportStats = document.getElementById("reportStats");
const reportList = document.getElementById("reportList");
const newReportBtn = document.getElementById("newReportBtn");

const resumeModal = document.getElementById("resumeModal");
const resumeFile = document.getElementById("resumeFile");
const resumeSubmitBtn = document.getElementById("resumeSubmitBtn");
const resumeCancelBtn = document.getElementById("resumeCancelBtn");

const statApps = document.getElementById("statApps");
const statMatches = document.getElementById("statMatches");
const statViews = document.getElementById("statViews");
const statSkills = document.getElementById("statSkills");

let isAuth = sessionStorage.getItem("cgs-auth") === "1";
let recPage = 0;
let currentAppPage = "dashboard";
let jobTab = "all";
let selectedAppliedJob = null;

const jobs = [
  { id: 1, role: "Data Scientist", company: "Amazon", match: 100, salary: "₹18-25 LPA", location: "Mumbai, India", skills: ["Python", "Machine Learning", "SQL", "TensorFlow", "Data Science"], recommended: true, saved: false, applied: false },
  { id: 2, role: "Backend Developer", company: "Infosys", match: 80, salary: "₹9-14 LPA", location: "Bengaluru, India", skills: ["Java", "Spring", "REST API", "Microservices"], recommended: true, saved: false, applied: false },
  { id: 3, role: "Frontend Developer", company: "TechCorp Inc.", match: 95, salary: "₹8-12 LPA", location: "Pune, India", skills: ["React", "JavaScript", "TypeScript", "CSS", "HTML"], recommended: false, saved: false, applied: false },
  { id: 4, role: "DevOps Engineer", company: "InnovateLab", match: 82, salary: "₹10-15 LPA", location: "Hyderabad, India", skills: ["Docker", "Kubernetes", "AWS", "Linux", "CI/CD"], recommended: true, saved: false, applied: false },
  { id: 5, role: "React Developer", company: "StartupXYZ", match: 88, salary: "₹6-10 LPA", location: "Remote", skills: ["React", "Redux", "Tailwind"], recommended: false, saved: false, applied: false }
];

let reports = [
  { id: "r1", title: "Career Analysis Report", date: "2024-01-15", size: "2.4 MB", ready: true, sections: ["Profile Summary", "Skill Assessment", "Career Recommendations", "Market Analysis", "Action Plan"] },
  { id: "r2", title: "Skill Gap Analysis", date: "2024-01-10", size: "1.8 MB", ready: true, sections: ["Current Skills", "Required Skills", "Learning Path", "Certification Recommendations", "Timeline"] }
];

const recommendationPool = [
  { role: "Data Scientist", match: 100, salary: "₹18-25 LPA", company: "Amazon", skills: ["Python", "Machine Learning", "SQL", "TensorFlow", "Data Science"] },
  { role: "Backend Developer", match: 100, salary: "₹14-22 LPA", company: "Infosys", skills: ["Java", "Spring", "SQL", "REST API", "microservices"] },
  { role: "Frontend Developer", match: 80, salary: "₹12-18 LPA", company: "Microsoft", skills: ["React", "JavaScript", "TypeScript", "CSS", "HTML"] },
  { role: "DevOps Engineer", match: 80, salary: "₹14-22 LPA", company: "Infosys", skills: ["Docker", "Kubernetes", "AWS", "Linux", "CI/CD"] }
];

function showToast(message) {
  if (!toast) {
    return;
  }

  toast.textContent = message;
  toast.classList.remove("hidden");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.add("hidden"), 1800);
}

function setMainView(view) {
  publicPage.classList.add("hidden-view");
  loginPage.classList.add("hidden-view");
  appPage.classList.add("hidden-view");
  view.classList.remove("hidden-view");
}

function setAppPage(pageName) {
  currentAppPage = pageName;

  pagePanels.forEach((panel) => panel.classList.add("hidden-view"));
  const panel = document.getElementById(`page-${pageName}`);
  if (panel) {
    panel.classList.remove("hidden-view");
  }

  sideButtons.forEach((btn) => {
    const isActive = btn.dataset.page === pageName;
    btn.classList.toggle("bg-[#e8effc]", isActive);
    btn.classList.toggle("text-brandBlue", isActive);
  });
}

function syncAuthUi() {
  if (isAuth) {
    welcomeLabel.textContent = "Welcome, Demo";
    topDashboardBtn.textContent = "Dashboard";
  } else {
    welcomeLabel.textContent = "Welcome, Guest";
    topDashboardBtn.textContent = "Sign In";
  }
}

function openDashboard() {
  if (!isAuth) {
    setMainView(loginPage);
    showToast("Please sign in first.");
    return;
  }

  setMainView(appPage);
  setAppPage(currentAppPage);
}

function renderKpiCards() {
  const cards = [
    ["12", "Job Matches", "+3 this week"],
    ["85%", "Profile Complete", "Almost there!"],
    ["21", "Applications", "20 pending review"],
    ["5", "Skills to Learn", "Priority: React.js"]
  ];

  kpiCards.innerHTML = cards
    .map(([value, title, sub]) => `
      <article class="rounded-xl border border-slate-200 bg-white p-4">
        <p class="text-4xl font-extrabold text-brandBlue">${value}</p>
        <h5 class="mt-1 text-lg font-bold">${title}</h5>
        <p class="text-sm text-slate-500">${sub}</p>
      </article>
    `)
    .join("");
}

function renderQuickActions() {
  const actions = [
    ["resume", "Upload Resume", "Upload and analyze your resume", "blue"],
    ["recommendations", "View Recommendations", "See your career recommendations", "green"],
    ["jobs", "Browse Jobs", "Find relevant job opportunities", "purple"],
    ["report", "Generate Report", "Download your career report", "orange"]
  ];

  quickActions.innerHTML = actions
    .map(([type, title, subtitle, color]) => `
      <button class="quick-action rounded-xl border border-slate-200 p-4 text-left transition hover:border-brandBlue" data-action="${type}">
        <div class="mb-2 inline-grid h-10 w-10 place-items-center rounded-lg ${
          color === "blue"
            ? "bg-blue-500"
            : color === "green"
              ? "bg-emerald-500"
              : color === "purple"
                ? "bg-purple-500"
                : "bg-orange-500"
        } text-white">⬒</div>
        <p class="font-bold">${title}</p>
        <p class="text-sm text-slate-500">${subtitle}</p>
      </button>
    `)
    .join("");

  document.querySelectorAll(".quick-action").forEach((btn) => {
    btn.addEventListener("click", () => {
      const action = btn.dataset.action;
      if (action === "resume") {
        resumeModal.classList.remove("hidden-view");
      }
      if (action === "recommendations") {
        setAppPage("recommendations");
      }
      if (action === "jobs") {
        setAppPage("jobs");
      }
      if (action === "report") {
        setAppPage("reports");
      }
    });
  });
}

function renderActivity() {
  const items = [
    ["Resume uploaded and analyzed", "completed", "2 hours ago"],
    ["Career recommendations generated", "completed", "1 day ago"],
    ["Skill gap analysis completed", "completed", "2 days ago"],
    ["Profile updated", "completed", "3 days ago"]
  ];

  activityList.innerHTML = items
    .map(
      ([title, status, time]) => `
      <li class="rounded-lg bg-slate-50 p-3 text-sm">
        <div class="flex items-start justify-between gap-2">
          <p class="font-semibold text-slate-700">${title}</p>
          <span class="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700">${status}</span>
        </div>
        <p class="mt-1 text-slate-500">◷ ${time}</p>
      </li>`
    )
    .join("");
}

function renderRecommendations() {
  const chunk = recommendationPool.slice(0, (recPage + 1) * 2);

  recommendationCards.innerHTML = chunk
    .map(
      (job) => `
      <article class="rounded-xl border border-slate-200 p-4">
        <div class="flex items-start justify-between gap-3">
          <div>
            <h5 class="text-2xl font-extrabold">${job.role}</h5>
            <p class="text-sm text-slate-500">Recommended based on your API, Adaptability, Angular skills</p>
          </div>
          <div class="text-right text-emerald-600"><p class="text-4xl font-extrabold">${job.match}%</p><p class="text-sm font-semibold">Match</p></div>
        </div>
        <p class="mt-3 text-sm font-semibold">Required Skills:</p>
        <div class="mt-2 flex flex-wrap gap-2">${job.skills
          .map((s) => `<span class="rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-[#5472b8]">${s}</span>`)
          .join("")}</div>
        <div class="mt-3 grid gap-2 sm:grid-cols-2 text-sm">
          <p><strong>Salary Range:</strong> <span class="font-semibold text-emerald-600">${job.salary}</span></p>
          <p><strong>Top Companies:</strong> ${job.company}</p>
        </div>
        <button class="apply-btn mt-3 h-10 w-full rounded-lg bg-brandBlue text-sm font-semibold text-white" data-role="${job.role}" data-company="${job.company}">Apply Now</button>
      </article>
    `
    )
    .join("");

  document.querySelectorAll(".apply-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      showToast(`Application started for ${btn.dataset.role}`);
      const found = jobs.find((j) => j.role === btn.dataset.role);
      if (found) {
        found.applied = true;
        selectedAppliedJob = found;
        renderJobs();
      }
    });
  });
}

function renderSkillGaps() {
  const gaps = [
    ["Machine Learning", 30, "High", "bg-rose-100 text-rose-600"],
    ["Cloud Computing", 45, "Medium", "bg-amber-100 text-amber-600"],
    ["System Design", 20, "High", "bg-rose-100 text-rose-600"],
    ["Data Structures", 70, "Medium", "bg-amber-100 text-amber-600"]
  ];

  skillGaps.innerHTML = gaps
    .map(
      ([name, pct, tag, cls]) => `
      <div>
        <div class="mb-1 flex items-center justify-between"><strong>${name}</strong><span class="rounded-full px-2 py-0.5 text-xs font-bold ${cls}">${tag}</span></div>
        <div class="h-2 rounded-full bg-slate-200"><div class="h-2 rounded-full bg-brandBlue" style="width:${pct}%"></div></div>
        <p class="mt-1 text-sm text-slate-500">${pct}% complete</p>
      </div>
    `
    )
    .join("");
}

function renderJobMatchesTable() {
  jobMatchRows.innerHTML = jobs
    .slice(0, 5)
    .map(
      (job) => `
      <tr class="border-b border-slate-100">
        <td class="py-2 font-semibold">${job.role}</td>
        <td>${job.company}</td>
        <td><span class="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-700">${job.match}%</span></td>
        <td>${job.salary}</td>
        <td><button class="table-apply rounded-lg border border-slate-200 px-3 py-1" data-id="${job.id}">Apply Now</button></td>
      </tr>
    `
    )
    .join("");

  document.querySelectorAll(".table-apply").forEach((btn) => {
    btn.addEventListener("click", () => {
      const job = jobs.find((j) => String(j.id) === btn.dataset.id);
      if (!job) {
        return;
      }
      job.applied = true;
      selectedAppliedJob = job;
      showToast(`Applied to ${job.role}`);
      renderJobs();
    });
  });
}

function filteredJobs() {
  const query = jobSearch.value.trim().toLowerCase();
  let list = jobs;

  if (jobTab === "recommended") {
    list = list.filter((j) => j.recommended);
  }
  if (jobTab === "saved") {
    list = list.filter((j) => j.saved);
  }
  if (jobTab === "applied") {
    list = list.filter((j) => j.applied);
  }

  if (query) {
    list = list.filter((j) => (`${j.role} ${j.company} ${j.skills.join(" ")}`).toLowerCase().includes(query));
  }

  return list;
}

function renderJobCounters() {
  const counters = [
    [jobs.length, "Total Jobs"],
    [jobs.filter((j) => j.saved).length, "Saved Jobs"],
    [jobs.filter((j) => j.applied).length, "Applied Jobs"],
    [jobs.filter((j) => j.recommended).length, "Recommended"]
  ];

  jobCounters.innerHTML = counters
    .map(
      ([v, label]) => `
      <article class="rounded-xl border border-slate-200 p-4 text-center">
        <p class="text-4xl font-extrabold">${v}</p>
        <p class="text-sm text-slate-500">${label}</p>
      </article>
    `
    )
    .join("");
}

function renderJobTabs() {
  const tabs = [
    ["all", "All Jobs"],
    ["recommended", "Recommended"],
    ["saved", "Saved"],
    ["applied", "Applied"]
  ];

  jobTabs.innerHTML = tabs
    .map(
      ([key, label]) => `
      <button class="job-tab rounded-lg border px-3 py-2 text-sm font-semibold ${
        jobTab === key ? "bg-brandBlue text-white border-brandBlue" : "border-slate-200 bg-white"
      }" data-tab="${key}">${label}</button>
    `
    )
    .join("");

  document.querySelectorAll(".job-tab").forEach((btn) => {
    btn.addEventListener("click", () => {
      jobTab = btn.dataset.tab;
      renderJobs();
    });
  });
}

function renderJobs() {
  renderJobCounters();
  renderJobTabs();

  const list = filteredJobs();
  jobsList.innerHTML = list
    .map(
      (job) => `
      <article class="rounded-xl border border-slate-200 bg-white p-4">
        <div class="flex items-start justify-between gap-2">
          <div>
            <h4 class="text-2xl font-extrabold">${job.role} <span class="ml-2 rounded-full bg-emerald-100 px-2 py-0.5 text-sm text-emerald-700">${job.match}% Match</span></h4>
            <p class="text-lg text-slate-500">${job.company}</p>
            <p class="mt-2 text-slate-500">Develop machine learning models and data pipelines.</p>
            <p class="mt-2 text-sm text-slate-500">${job.location} • ${job.salary}</p>
            <div class="mt-2 flex flex-wrap gap-2">${job.skills
              .map((s) => `<span class="rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-[#5472b8]">${s}</span>`)
              .join("")}</div>
          </div>
          <button class="save-job rounded-lg border border-slate-200 px-3 py-2 text-sm" data-id="${job.id}">${job.saved ? "Saved" : "Save"}</button>
        </div>
        <div class="mt-3 grid grid-cols-[1fr_auto_auto] gap-2">
          <button class="apply-job rounded-lg bg-brandBlue py-2 text-sm font-semibold text-white" data-id="${job.id}">Apply Now</button>
          <button class="rounded-lg border border-slate-200 px-3 py-2 text-sm" data-toast="Added to compare">+</button>
          <button class="rounded-lg border border-slate-200 px-3 py-2 text-sm" data-toast="Shared job">⇪</button>
        </div>
      </article>
    `
    )
    .join("");

  document.querySelectorAll(".save-job").forEach((btn) => {
    btn.addEventListener("click", () => {
      const job = jobs.find((j) => String(j.id) === btn.dataset.id);
      if (!job) return;
      job.saved = !job.saved;
      renderJobs();
    });
  });

  document.querySelectorAll(".apply-job").forEach((btn) => {
    btn.addEventListener("click", () => {
      const job = jobs.find((j) => String(j.id) === btn.dataset.id);
      if (!job) return;
      job.applied = true;
      selectedAppliedJob = job;
      showToast(`Applied to ${job.role}`);
      renderJobs();
    });
  });

  if (jobTab === "applied" && selectedAppliedJob) {
    appliedFormBlock.classList.remove("hidden-view");
    appliedFormMeta.innerHTML = `
      <p><strong>Company:</strong> ${selectedAppliedJob.company}</p>
      <p><strong>Role:</strong> ${selectedAppliedJob.role}</p>
      <p><strong>Location:</strong> ${selectedAppliedJob.location}</p>
      <p><strong>Package:</strong> ${selectedAppliedJob.salary}</p>`;
  } else {
    appliedFormBlock.classList.add("hidden-view");
  }
}

function renderReportStats() {
  const stats = [
    [reports.length, "Total Reports"],
    [reports.filter((r) => r.ready).length, "Ready to Download"],
    [2, "This Month"],
    [1, "Shared Reports"]
  ];

  reportStats.innerHTML = stats
    .map(
      ([v, t]) => `
      <article class="rounded-xl border border-slate-200 bg-white p-4">
        <p class="text-sm font-semibold text-slate-500">${t}</p>
        <p class="mt-1 text-4xl font-extrabold">${v}</p>
      </article>
    `
    )
    .join("");
}

function renderReports() {
  renderReportStats();
  reportList.innerHTML = reports
    .map(
      (r) => `
      <article class="rounded-xl border border-slate-200 bg-white p-4">
        <div class="flex flex-wrap items-start justify-between gap-2">
          <div>
            <h4 class="text-2xl font-extrabold">${r.title} <span class="ml-2 rounded-full bg-emerald-100 px-2 py-0.5 text-sm text-emerald-700">Ready</span></h4>
            <p class="text-sm text-slate-500">Comprehensive analysis of your career profile and recommendations</p>
          </div>
          <p class="text-sm text-slate-500">${r.date}<br/>PDF • ${r.size}</p>
        </div>
        <p class="mt-3 text-sm font-semibold">Report Sections:</p>
        <div class="mt-2 flex flex-wrap gap-2">${r.sections
          .map((s) => `<span class="rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-[#5472b8]">${s}</span>`)
          .join("")}</div>
        <div class="mt-3 flex gap-2">
          <button class="rounded-lg border border-slate-200 px-3 py-2 text-sm" data-toast="Preview ${r.title}">Preview</button>
          <button class="rounded-lg bg-brandBlue px-3 py-2 text-sm font-semibold text-white" data-toast="Downloading ${r.title}">Download</button>
          <button class="rounded-lg border border-slate-200 px-3 py-2 text-sm" data-toast="Shared ${r.title}">Share</button>
        </div>
      </article>
    `
    )
    .join("");
}

function closeMobileMenu() {
  mobileMenu.classList.add("hidden");
}

function initPublicNav() {
  navButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const nav = btn.dataset.nav;
      if (!nav) return;
      setMainView(publicPage);
      closeMobileMenu();

      if (nav === "home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      const target = document.getElementById(nav === "features" || nav === "about" ? "aboutSection" : "contactSection");
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}

function initActions() {
  mobileMenuBtn.addEventListener("click", () => mobileMenu.classList.toggle("hidden"));

  themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("bg-[#eef3fb]");
    document.body.classList.toggle("bg-slate-900");
    document.body.classList.toggle("text-white");
  });

  getStartedBtn.addEventListener("click", () => setMainView(loginPage));

  topDashboardBtn.addEventListener("click", openDashboard);
  topLogoutBtn.addEventListener("click", () => {
    isAuth = false;
    sessionStorage.removeItem("cgs-auth");
    syncAuthUi();
    setMainView(publicPage);
    showToast("Logged out");
  });

  mobileDashBtn.addEventListener("click", () => {
    closeMobileMenu();
    openDashboard();
  });

  mobileLogoutBtn.addEventListener("click", () => {
    closeMobileMenu();
    isAuth = false;
    sessionStorage.removeItem("cgs-auth");
    syncAuthUi();
    setMainView(publicPage);
  });

  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = document.getElementById("emailInput").value.trim();
    const password = document.getElementById("passwordInput").value.trim();

    if (email !== "demo@example.com" || password !== "password123") {
      showToast("Invalid credentials");
      return;
    }

    isAuth = true;
    sessionStorage.setItem("cgs-auth", "1");
    syncAuthUi();
    setMainView(appPage);
    setAppPage("dashboard");
    showToast("Welcome back");
  });

  forgotBtn.addEventListener("click", () => showToast("Reset link sent"));
  signupBtn.addEventListener("click", () => showToast("Sign up coming soon"));
  adminBtn.addEventListener("click", () => showToast("Admin access restricted"));

  sideButtons.forEach((btn) => {
    btn.addEventListener("click", () => setAppPage(btn.dataset.page));
  });

  loadMoreBtn.addEventListener("click", () => {
    if (recPage < 1) {
      recPage += 1;
      renderRecommendations();
      return;
    }
    showToast("No more recommendations");
  });

  companyForm.addEventListener("submit", (event) => {
    event.preventDefault();
    showToast("Company form submitted");
  });

  jobSearchBtn.addEventListener("click", renderJobs);
  jobSearch.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      renderJobs();
    }
  });

  appliedForm.addEventListener("submit", (event) => {
    event.preventDefault();
    showToast("Applied company form submitted");
  });

  newReportBtn.addEventListener("click", () => {
    const next = reports.length + 1;
    reports.unshift({
      id: `r${Date.now()}`,
      title: `Generated Career Report ${next}`,
      date: "2024-01-20",
      size: "2.0 MB",
      ready: true,
      sections: ["Summary", "Skill Gap", "Recommendations", "Timeline", "Action Plan"]
    });
    renderReports();
    showToast("New report generated");
  });

  resumeCancelBtn.addEventListener("click", () => {
    resumeModal.classList.add("hidden-view");
  });

  resumeSubmitBtn.addEventListener("click", () => {
    if (!resumeFile.files.length) {
      showToast("Select a file first");
      return;
    }
    resumeModal.classList.add("hidden-view");
    statApps.textContent = String(Number(statApps.textContent) + 1);
    statMatches.textContent = String(Number(statMatches.textContent) + 1);
    statViews.textContent = String(Number(statViews.textContent) + 2);
    statSkills.textContent = String(Number(statSkills.textContent) + 1);
    activityList.insertAdjacentHTML(
      "afterbegin",
      `<li class="rounded-lg bg-slate-50 p-3 text-sm"><div class="flex items-start justify-between gap-2"><p class="font-semibold text-slate-700">Resume uploaded and analyzed</p><span class="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700">completed</span></div><p class="mt-1 text-slate-500">◷ just now</p></li>`
    );
    showToast("Resume uploaded successfully");
  });

  resumeModal.addEventListener("click", (event) => {
    if (event.target === resumeModal) {
      resumeModal.classList.add("hidden-view");
    }
  });

  document.addEventListener("click", (event) => {
    const btn = event.target.closest("[data-toast]");
    if (btn) {
      showToast(btn.dataset.toast);
    }
  });
}

function initializeUi() {
  syncAuthUi();
  renderKpiCards();
  renderQuickActions();
  renderActivity();
  renderRecommendations();
  renderSkillGaps();
  renderJobMatchesTable();
  renderJobs();
  renderReports();

  if (isAuth) {
    setMainView(appPage);
    setAppPage("dashboard");
  } else {
    setMainView(publicPage);
  }
}

initPublicNav();
initActions();
initializeUi();
