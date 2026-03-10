import { useState } from "react";
import { QuickActionCard } from "../components/QuickActionCard";
import { ResumeRequiredState } from "../components/ResumeRequiredState";
import { StatCard } from "../components/StatCard";
import { UploadResumeModal } from "../components/UploadResumeModal";
import { useAppContext } from "../services/AppContext";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight, BadgeCheck, BriefcaseBusiness, CheckCircle2, FileSearch, Gauge, Sparkles, Target } from "lucide-react";

export function DashboardPage() {
  const navigate = useNavigate();
  const { stats, activity, onResumeUpload, onGenerateReport, currentUser, showToast, hasResume, resumeAnalysis, resumeOverview } = useAppContext();
  const [modalOpen, setModalOpen] = useState(false);
  const [file, setFile] = useState(null);
  const readinessScore = resumeOverview.marketReadiness;

  const quickActions = [
    ["Replace Resume", "Refresh your analysis with a stronger profile", () => setModalOpen(true), FileSearch, "from-blue-50 to-white"],
    ["View Recommendations", "Open role-fit recommendations from your resume", () => navigate("/app/recommendations"), Sparkles, "from-violet-50 to-white"],
    ["Browse Jobs", "See matching openings and apply externally", () => navigate("/app/jobs"), BriefcaseBusiness, "from-emerald-50 to-white"],
    ["Generate Report", "Create and open your latest progress report", async () => {
      await onGenerateReport();
      navigate("/app/reports");
    }, BadgeCheck, "from-amber-50 to-white"]
  ];

  const analytics = [
    { title: "Profile Completion", value: 84, month: "+9% this month", color: "bg-emerald-500", bg: "bg-emerald-50", text: "text-emerald-700" },
    { title: "Skill Readiness", value: 71, month: "+11% this month", color: "bg-sky-500", bg: "bg-sky-50", text: "text-sky-700" },
    { title: "Interview Confidence", value: 63, month: "+7% this month", color: "bg-amber-500", bg: "bg-amber-50", text: "text-amber-700" },
    { title: "Industry Alignment", value: 77, month: "+6% this month", color: "bg-violet-500", bg: "bg-violet-50", text: "text-violet-700" }
  ];

  const insights = [
    ["Applications", stats.apps, "text-blue-700", "bg-blue-50"],
    ["Matches", stats.matches, "text-emerald-700", "bg-emerald-50"],
    ["Profile Views", stats.views, "text-violet-700", "bg-violet-50"],
    ["Skills", stats.skills, "text-amber-700", "bg-amber-50"]
  ];

  if (!hasResume) {
    return (
      <>
        <ResumeRequiredState
          title="Upload your resume to unlock analysis and matching jobs"
          description="The system will first analyze your resume, extract skills, and then show only the roles and recommendations that fit your profile."
          actionLabel="Upload And Analyze Resume"
          onAction={() => setModalOpen(true)}
        />

        <UploadResumeModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onUpload={async () => {
            const ok = await onResumeUpload(file);
            if (ok) {
              setModalOpen(false);
              setFile(null);
            }
          }}
          onFileChange={setFile}
        />
      </>
    );
  }

  return (
    <section className="space-y-4">
      <div className="smooth-enter rounded-[28px] border border-slate-200/80 bg-white/90 p-4 shadow-card backdrop-blur">
        <div className="items-start grid gap-4 lg:grid-cols-[2fr_1fr]">
          <div className="dashboard-hero relative self-start overflow-hidden rounded-[28px] p-5 text-white">
            <div className="absolute -right-12 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl"></div>
            <div className="absolute bottom-0 right-16 h-28 w-28 rounded-full bg-cyan-200/20 blur-2xl"></div>
            <div className="relative">
              <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/85">
                <Sparkles className="h-3.5 w-3.5" /> Resume intelligence active
              </p>
              <h3 className="mt-4 text-[2rem] font-extrabold leading-tight">Welcome back, {currentUser?.name || "Learner"}</h3>
              <p className="mt-2 max-w-2xl text-sm text-white/90">Your placement readiness has improved by 8% this month. The latest resume analysis is already shaping role fit, skill priorities, and application strategy.</p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs">
                <span className="rounded-full border border-white/30 bg-white/15 px-3 py-1.5">Last active: 2 hours ago</span>
                <span className="rounded-full border border-white/30 bg-white/15 px-3 py-1.5">Profile strength: 84%</span>
                <span className="rounded-full border border-white/30 bg-white/15 px-3 py-1.5">{stats.matches} strong matches unlocked</span>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/20 bg-white/10 p-3 backdrop-blur-sm">
                  <p className="text-xs font-semibold uppercase tracking-wide text-white/75">Resume Score</p>
                  <p className="mt-1 text-xl font-extrabold">{resumeAnalysis?.score || 0}%</p>
                </div>
                <div className="rounded-2xl border border-white/20 bg-white/10 p-3 backdrop-blur-sm">
                  <p className="text-xs font-semibold uppercase tracking-wide text-white/75">Top Strength</p>
                  <p className="mt-1 text-base font-extrabold">{resumeOverview.strongestArea}</p>
                </div>
                <div className="rounded-2xl border border-white/20 bg-white/10 p-3 backdrop-blur-sm">
                  <p className="text-xs font-semibold uppercase tracking-wide text-white/75">Next Focus</p>
                  <p className="mt-1 text-base font-extrabold">{resumeOverview.nextFocus}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-[28px] border border-slate-200 bg-gradient-to-br from-white via-white to-slate-50 p-5">
            <div className="flex items-center justify-between">
              <h4 className="text-xl font-extrabold">Quick Stats</h4>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">Live</span>
            </div>
            <div className="mt-4 grid gap-3 text-sm">
              {insights.map(([label, value, text, bg]) => (
                <div key={label} className="rounded-2xl border border-slate-100 bg-white px-4 py-3 shadow-sm">
                  <p className="flex items-center justify-between">
                    <span className="font-medium text-slate-700">{label}</span>
                    <strong className={`rounded-full px-2.5 py-1 ${text} ${bg}`}>{value}</strong>
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-2xl bg-slate-900 p-4 text-white">
              <p className="text-xs font-semibold uppercase tracking-wide text-white/60">Readiness Pulse</p>
              <p className="mt-2 text-3xl font-extrabold">{readinessScore}%</p>
              <p className="mt-1 text-sm text-white/70">Your strongest matching role is already above the shortlist threshold.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Profile Completion" value="84%" note="Strong momentum this week" tone="blue" />
        <StatCard title="Resume Analysis" value={`${resumeAnalysis?.score || 0}%`} note="Resume insights generated" tone="emerald" />
        <StatCard title="Career Matches" value={String(stats.matches)} note="Roles matching your profile" tone="violet" />
        <StatCard title="Skill Gaps" value={String(resumeAnalysis?.missing?.length || 0)} note="Priority skills to improve" tone="amber" />
      </div>

      <article className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-card">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h4 className="text-xl font-extrabold">Resume Analyzer</h4>
            <p className="mt-1 text-sm text-slate-500">{resumeAnalysis?.summary}</p>
          </div>
          <button type="button" className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold" onClick={() => setModalOpen(true)}>
            Replace Resume
          </button>
        </div>
        <div className="mt-5 grid gap-4 xl:grid-cols-[320px_1fr]">
          <div className="rounded-[24px] border border-slate-200 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-5 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/50">Analyzer Score</p>
                <p className="mt-2 text-4xl font-extrabold">{resumeAnalysis?.score || 0}%</p>
              </div>
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white/10">
                <Gauge className="h-6 w-6 text-cyan-200" />
              </div>
            </div>
            <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/10">
              <div className="h-3 rounded-full bg-gradient-to-r from-cyan-300 via-blue-400 to-emerald-400" style={{ width: `${resumeAnalysis?.score || 0}%` }}></div>
            </div>
            <div className="mt-5 grid gap-3 text-sm">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                <p className="text-white/60">Detected Skills</p>
                <p className="mt-1 text-lg font-bold">{resumeAnalysis?.extractedSkills?.length || 0}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                <p className="text-white/60">Uploaded File</p>
                <p className="mt-1 line-clamp-2 font-semibold">{resumeAnalysis?.filename}</p>
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-[24px] bg-emerald-50 p-4">
                <div className="flex items-center gap-2 text-emerald-700">
                  <BadgeCheck className="h-4 w-4" />
                  <p className="text-sm font-semibold">Strongest Area</p>
                </div>
                <p className="mt-2 text-lg font-extrabold text-emerald-900">{resumeOverview.strongestArea}</p>
              </div>
              <div className="rounded-[24px] bg-amber-50 p-4">
                <div className="flex items-center gap-2 text-amber-700">
                  <Target className="h-4 w-4" />
                  <p className="text-sm font-semibold">Next Focus</p>
                </div>
                <p className="mt-2 text-lg font-extrabold text-amber-900">{resumeOverview.nextFocus}</p>
              </div>
              <div className="rounded-[24px] bg-blue-50 p-4">
                <div className="flex items-center gap-2 text-blue-700">
                  <BriefcaseBusiness className="h-4 w-4" />
                  <p className="text-sm font-semibold">Market Readiness</p>
                </div>
                <p className="mt-2 text-lg font-extrabold text-blue-900">{resumeOverview.marketReadiness}%</p>
              </div>
            </div>

            <div className="rounded-[24px] border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-4">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <h5 className="text-base font-extrabold text-slate-900">Detected Skill Stack</h5>
                  <p className="text-sm text-slate-500">These skills are actively shaping your recommended roles and application matches.</p>
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">Parsed from resume</span>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {(resumeAnalysis?.extractedSkills || []).map((skill) => (
                  <span key={skill} className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 shadow-sm">{skill}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </article>

      <article className="smooth-enter rounded-[28px] border border-slate-200 bg-white p-5 shadow-card">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h4 className="text-xl font-extrabold">Progress Analytics</h4>
          <p className="text-sm text-slate-500">Monthly improvement overview</p>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {analytics.map((item) => (
            <div key={item.title} className="rounded-[24px] border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-4">
              <div className="flex items-center justify-between text-sm font-semibold">
                <span>{item.title}</span>
                <span className={`rounded-full px-2 py-1 ${item.bg} ${item.text}`}>{item.month}</span>
              </div>
              <div className="mt-2 h-3 rounded-full bg-slate-200">
                <div className={`h-3 rounded-full ${item.color} transition-all duration-500`} style={{ width: `${item.value}%` }}></div>
              </div>
              <p className="mt-1 text-sm text-slate-500">{item.value}% completion</p>
            </div>
          ))}
        </div>
      </article>

      <div className="grid gap-4 xl:grid-cols-[2fr_1fr]">
        <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-card">
          <h4 className="text-xl font-extrabold">Quick Actions</h4>
          <p className="text-sm text-slate-500">Get started with these common tasks</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {quickActions.map(([title, subtitle, handler, icon, accent]) => (
              <QuickActionCard key={title} title={title} subtitle={subtitle} onClick={handler} icon={icon} accent={accent} />
            ))}
          </div>
        </article>

        <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-card">
          <h4 className="text-xl font-extrabold">Recent Activity</h4>
          <p className="text-sm text-slate-500">Your latest actions and updates</p>
          <div className="mt-3 grid gap-2">
            {activity.map((item, idx) => (
              <div key={`${item.title}-${idx}`} className="rounded-lg bg-slate-50 p-3 text-sm">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-semibold text-slate-700">{item.title}</p>
                  <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700">completed</span>
                </div>
                <p className="mt-1 text-slate-500">◷ {item.time}</p>
              </div>
            ))}
          </div>
        </article>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-card">
          <h4 className="text-xl font-extrabold">Learning Path</h4>
          <p className="text-sm text-slate-500">Recommended skills to develop from resume analysis</p>
          <div className="mt-3 grid gap-2 text-sm">
            {(resumeAnalysis?.missing || ["Portfolio Projects", "Interview Preparation", "System Design"]).map((item, index) => (
              <div key={item} className="rounded-lg bg-amber-50 p-3">
                <strong>{index + 1} {item}</strong>
                <p className="text-slate-500">Recommended next improvement area</p>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-card">
          <h4 className="text-xl font-extrabold">Performance</h4>
          <p className="text-sm text-slate-500">Your career metrics</p>
          <p className="mt-4 text-center text-4xl font-extrabold text-brandBlue">8.6</p>
          <div className="mt-3 grid grid-cols-2 gap-2 text-center text-sm">
            <div className="rounded-lg bg-blue-50 p-3"><strong>81%</strong><p>Skills</p></div>
            <div className="rounded-lg bg-green-50 p-3"><strong>84%</strong><p>Profile</p></div>
            <div className="rounded-lg bg-slate-50 p-3"><strong>59%</strong><p>Network</p></div>
            <div className="rounded-lg bg-amber-50 p-3"><strong>88%</strong><p>Growth</p></div>
          </div>
        </article>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-card">
          <h4 className="text-xl font-extrabold">AI Career Assistant</h4>
          <p className="text-sm text-slate-500">Get personalized career advice</p>
          <div className="mt-3 rounded-lg bg-purple-50 p-4 text-sm">
            <p>
              {`Based on your resume, strengthen ${resumeOverview.nextFocus} to improve your shortlist score and unlock stronger matches.`}
            </p>
            <div className="mt-3 flex gap-2">
              <button className="rounded-md border border-slate-200 bg-white px-3 py-1" type="button" onClick={() => navigate("/app/recommendations")}>Learn More</button>
              <button className="rounded-md border border-slate-200 bg-white px-3 py-1" type="button" onClick={() => showToast("Tip dismissed")}>Dismiss</button>
            </div>
          </div>
        </article>

        <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-card">
          <h4 className="text-xl font-extrabold">Career Timeline</h4>
          <p className="text-sm text-slate-500">Your career milestones</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600" /> Profile Created - 1/18/2026</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600" /> Resume Uploaded - 1/18/2026</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600" /> First Application - 1/18/2026</li>
            <li className="flex items-center gap-2"><ArrowUpRight className="h-4 w-4 text-blue-600" /> Interview Prep Started - 2/02/2026</li>
          </ul>
        </article>
      </div>

      <UploadResumeModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onUpload={async () => {
          const ok = await onResumeUpload(file);
          if (ok) {
            setModalOpen(false);
            setFile(null);
          }
        }}
        onFileChange={setFile}
      />
    </section>
  );
}
