import { useEffect, useMemo, useState } from "react";
import { Briefcase, GraduationCap, Link as LinkIcon, Mail, MapPin, Phone, UserRound } from "lucide-react";
import { UploadResumeModal } from "../components/UploadResumeModal";
import { useAppContext } from "../services/AppContext";

function SummaryCard({ icon: Icon, label, value }) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-card">
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-lg bg-slate-100 text-slate-700">
          <Icon className="h-5 w-5" />
        </span>
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="text-base font-bold text-slate-900">{value}</p>
        </div>
      </div>
    </article>
  );
}

export function ProfilePage() {
  const { currentUser, updateProfile, onResumeUpload, hasResume, resumeAnalysis } = useAppContext();
  const [modalOpen, setModalOpen] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    university: "",
    degree: "",
    graduationYear: "",
    targetRole: "",
    experienceLevel: "",
    bio: "",
    skills: "",
    linkedin: "",
    github: ""
  });

  useEffect(() => {
    if (!currentUser) return;

    setForm({
      name: currentUser.name || "",
      email: currentUser.email || "",
      phone: currentUser.profile?.phone || "",
      location: currentUser.profile?.location || "",
      university: currentUser.profile?.university || "",
      degree: currentUser.profile?.degree || "",
      graduationYear: currentUser.profile?.graduationYear || "",
      targetRole: currentUser.profile?.targetRole || "",
      experienceLevel: currentUser.profile?.experienceLevel || "",
      bio: currentUser.profile?.bio || "",
      skills: (currentUser.profile?.skills || []).join(", "),
      linkedin: currentUser.profile?.linkedin || "",
      github: currentUser.profile?.github || ""
    });
  }, [currentUser]);

  const completion = useMemo(() => {
    const fields = [
      form.name,
      form.email,
      form.phone,
      form.location,
      form.university,
      form.degree,
      form.graduationYear,
      form.targetRole,
      form.experienceLevel,
      form.bio,
      form.skills,
      form.linkedin,
      form.github
    ];

    const filled = fields.filter((value) => value.trim()).length;
    return Math.round((filled / fields.length) * 100);
  }, [form]);

  const onChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    updateProfile({
      name: form.name,
      email: form.email,
      phone: form.phone,
      location: form.location,
      university: form.university,
      degree: form.degree,
      graduationYear: form.graduationYear,
      targetRole: form.targetRole,
      experienceLevel: form.experienceLevel,
      bio: form.bio,
      linkedin: form.linkedin,
      github: form.github,
      skills: form.skills.split(",").map((skill) => skill.trim()).filter(Boolean)
    });
  };

  return (
    <section className="space-y-4 smooth-enter">
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-card">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-2xl font-extrabold text-slate-900">Profile Details</h3>
            <p className="mt-1 text-sm text-slate-500">Keep your academic and professional information accurate for better recommendations.</p>
          </div>
          <div className="min-w-[220px] rounded-xl bg-emerald-50 p-3">
            <div className="flex items-center justify-between text-sm font-semibold text-emerald-700">
              <span>Profile completion</span>
              <span>{completion}%</span>
            </div>
            <div className="mt-2 h-3 rounded-full bg-emerald-100">
              <div className="h-3 rounded-full bg-emerald-500 transition-all duration-500" style={{ width: `${completion}%` }}></div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <SummaryCard icon={UserRound} label="Full Name" value={form.name || "Not set"} />
        <SummaryCard icon={Mail} label="Email" value={form.email || "Not set"} />
        <SummaryCard icon={Briefcase} label="Target Role" value={form.targetRole || "Not set"} />
        <SummaryCard icon={GraduationCap} label="Graduation" value={form.graduationYear || "Not set"} />
      </div>

      <form className="grid gap-4 xl:grid-cols-[1.4fr_1fr]" onSubmit={onSubmit}>
        <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-card">
          <h4 className="text-xl font-extrabold text-slate-900">Personal Information</h4>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <input className="h-11 rounded-lg border border-slate-200 px-3 text-sm" value={form.name} onChange={(e) => onChange("name", e.target.value)} placeholder="Full name" />
            <input className="h-11 rounded-lg border border-slate-200 px-3 text-sm" type="email" value={form.email} onChange={(e) => onChange("email", e.target.value)} placeholder="Email address" />
            <input className="h-11 rounded-lg border border-slate-200 px-3 text-sm" value={form.phone} onChange={(e) => onChange("phone", e.target.value)} placeholder="Phone number" />
            <div className="relative">
              <MapPin className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
              <input className="h-11 w-full rounded-lg border border-slate-200 pl-10 pr-3 text-sm" value={form.location} onChange={(e) => onChange("location", e.target.value)} placeholder="Location" />
            </div>
            <input className="h-11 rounded-lg border border-slate-200 px-3 text-sm" value={form.university} onChange={(e) => onChange("university", e.target.value)} placeholder="University / College" />
            <input className="h-11 rounded-lg border border-slate-200 px-3 text-sm" value={form.degree} onChange={(e) => onChange("degree", e.target.value)} placeholder="Degree" />
            <input className="h-11 rounded-lg border border-slate-200 px-3 text-sm" value={form.graduationYear} onChange={(e) => onChange("graduationYear", e.target.value)} placeholder="Graduation year" />
            <input className="h-11 rounded-lg border border-slate-200 px-3 text-sm" value={form.experienceLevel} onChange={(e) => onChange("experienceLevel", e.target.value)} placeholder="Experience level" />
          </div>

          <h4 className="mt-6 text-xl font-extrabold text-slate-900">Career Preferences</h4>
          <div className="mt-4 grid gap-3">
            <input className="h-11 rounded-lg border border-slate-200 px-3 text-sm" value={form.targetRole} onChange={(e) => onChange("targetRole", e.target.value)} placeholder="Target role" />
            <input className="h-11 rounded-lg border border-slate-200 px-3 text-sm" value={form.skills} onChange={(e) => onChange("skills", e.target.value)} placeholder="Skills separated by commas" />
            <textarea className="rounded-lg border border-slate-200 p-3 text-sm" rows="5" value={form.bio} onChange={(e) => onChange("bio", e.target.value)} placeholder="Short profile summary" />
          </div>
        </article>

        <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-card">
          <h4 className="text-xl font-extrabold text-slate-900">Professional Links</h4>
          <div className="mt-4 grid gap-3">
            <div className="relative">
              <LinkIcon className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
              <input className="h-11 w-full rounded-lg border border-slate-200 pl-10 pr-3 text-sm" value={form.linkedin} onChange={(e) => onChange("linkedin", e.target.value)} placeholder="LinkedIn profile URL" />
            </div>
            <div className="relative">
              <LinkIcon className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
              <input className="h-11 w-full rounded-lg border border-slate-200 pl-10 pr-3 text-sm" value={form.github} onChange={(e) => onChange("github", e.target.value)} placeholder="GitHub profile URL" />
            </div>
          </div>

          <div className="mt-6 rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
            <p className="font-semibold text-slate-800">Recommended profile checklist</p>
            <ul className="mt-2 space-y-2">
              <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-emerald-600" /> Add a working phone number</li>
              <li className="flex items-center gap-2"><GraduationCap className="h-4 w-4 text-blue-600" /> Keep academic details current</li>
              <li className="flex items-center gap-2"><Briefcase className="h-4 w-4 text-violet-600" /> Set the exact role you are targeting</li>
            </ul>
          </div>

          <div className="mt-6 rounded-xl border border-slate-200 bg-blue-50 p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-base font-bold text-slate-900">Add Resume</p>
                <p className="mt-1 text-sm text-slate-600">
                  Upload your resume to activate the analyzer and unlock personalized recommendations.
                </p>
              </div>
              <button
                type="button"
                className="rounded-lg bg-brandBlue px-4 py-2 text-sm font-semibold text-white"
                onClick={() => setModalOpen(true)}
              >
                {hasResume ? "Replace Resume" : "Add Resume"}
              </button>
            </div>

            {hasResume && (
              <div className="mt-4 rounded-xl bg-white p-4 text-sm text-slate-700">
                <p><strong>Uploaded Resume:</strong> {currentUser?.profile?.uploadedResumeName || "Resume uploaded"}</p>
                <p className="mt-1"><strong>Analyzer Score:</strong> {resumeAnalysis?.score || 0}%</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {(resumeAnalysis?.extractedSkills || []).map((skill) => (
                    <span key={skill} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">{skill}</span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button className="mt-6 h-11 w-full rounded-lg bg-brandBlue text-sm font-semibold text-white transition hover:bg-[#4056c6]">Save Profile</button>
        </article>
      </form>

      <UploadResumeModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onUpload={async () => {
          const ok = await onResumeUpload(resumeFile);
          if (ok) {
            setModalOpen(false);
            setResumeFile(null);
          }
        }}
        onFileChange={setResumeFile}
      />
    </section>
  );
}
