import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ResumeRequiredState } from "../components/ResumeRequiredState";
import { useAppContext } from "../services/AppContext";

function SkillGap({ label, percent, tag }) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between">
        <strong>{label}</strong>
        <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-bold text-amber-600">{tag}</span>
      </div>
      <div className="h-2 rounded-full bg-slate-200"><div className="h-2 rounded-full bg-brandBlue" style={{ width: `${percent}%` }}></div></div>
      <p className="mt-1 text-sm text-slate-500">{percent}% complete</p>
    </div>
  );
}

export function RecommendationsPage() {
  const navigate = useNavigate();
  const { recommendations, jobs, onApplyJob, showToast, hasResume, resumeAnalysis } = useAppContext();
  const [count, setCount] = useState(2);
  const visible = useMemo(() => recommendations.slice(0, count), [recommendations, count]);
  const appliedJob = jobs.find((job) => job.applied);

  if (!hasResume) {
    return (
      <ResumeRequiredState
        title="Upload your resume to receive career recommendations"
        description="Recommendations are generated only after the resume analyzer extracts your skills and compares them with role requirements."
        actionLabel="Go To Profile And Add Resume"
        onAction={() => navigate("/app/profile")}
      />
    );
  }

  return (
    <section className="space-y-4">
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-card">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-2xl font-extrabold">Career Recommendations</h3>
          <div className="flex gap-2">
            <button className="rounded-lg border border-slate-200 px-3 py-2 text-sm" onClick={() => showToast("Shared")}>Share</button>
            <button className="rounded-lg bg-brandBlue px-3 py-2 text-sm font-semibold text-white" onClick={() => showToast("Export started")}>Export</button>
          </div>
        </div>
      </div>

      <div className="tab-transition grid gap-4 xl:grid-cols-[2fr_1fr]">
        <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-card">
          <h4 className="text-xl font-extrabold">Recommended Career Paths</h4>
          <p className="text-sm text-slate-500">Based on {resumeAnalysis?.filename || "your resume analysis"}</p>
          <div className="mt-4 grid gap-3">
            {visible.length === 0 && (
              <div className="rounded-xl border border-dashed border-slate-300 p-5 text-sm text-slate-500">
                No strong career matches were found yet. Try updating your resume with more projects and technical keywords.
              </div>
            )}
            {visible.map((rec) => (
              <article key={rec.id} className="rounded-xl border border-slate-200 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h5 className="text-xl font-extrabold">{rec.role}</h5>
                    <p className="text-sm text-slate-500">Recommended based on your API, Adaptability, Angular skills</p>
                  </div>
                  <div className="text-right text-emerald-600"><p className="text-4xl font-extrabold">{rec.match}%</p><p className="text-sm font-semibold">Match</p></div>
                </div>
                <p className="mt-3 text-sm font-semibold">Required Skills:</p>
                <div className="mt-2 flex flex-wrap gap-2">{rec.skills.map((s) => <span key={s} className="rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-[#5472b8]">{s}</span>)}</div>
                <div className="mt-3 grid gap-2 sm:grid-cols-2 text-sm"><p><strong>Salary Range:</strong> <span className="font-semibold text-emerald-600">{rec.salary}</span></p><p><strong>Top Companies:</strong> {rec.company}</p></div>
                <button className="mt-3 h-10 w-full rounded-lg bg-brandBlue text-sm font-semibold text-white" onClick={() => onApplyJob(rec.id, { applyUrl: rec.applyUrl, role: rec.role })}>Apply Now</button>
              </article>
            ))}
          </div>

          <div className="mt-4 text-center">
            <button className="rounded-lg bg-brandBlue px-6 py-2 text-sm font-semibold text-white" onClick={() => setCount((c) => Math.min(c + 1, recommendations.length))}>Load more</button>
          </div>
        </article>

        <div className="space-y-4">
          <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-card">
            <h4 className="text-xl font-extrabold">Skill Gap Analysis</h4>
            <SkillGap label="Machine Learning" percent={30} tag="High" />
            <SkillGap label="Cloud Computing" percent={45} tag="Medium" />
            <SkillGap label="System Design" percent={20} tag="High" />
            <SkillGap label="Data Structures" percent={70} tag="Medium" />
          </article>

          {appliedJob ? (
            <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-card">
              <h4 className="text-xl font-extrabold">Company Applied Form</h4>
              <p className="text-sm text-slate-500">Shown only for companies you applied</p>
              <form className="mt-3 grid gap-2 text-sm" onSubmit={(event) => { event.preventDefault(); showToast("Submitted"); }}>
                <input className="h-10 rounded-lg border border-slate-200 px-3" placeholder="Package (e.g., ₹12 LPA)" defaultValue={appliedJob.salary} />
                <input className="h-10 rounded-lg border border-slate-200 px-3" placeholder="Resume Link (optional)" defaultValue={resumeAnalysis?.filename || ""} />
                <textarea className="rounded-lg border border-slate-200 p-3" rows="3" placeholder="Required details"></textarea>
                <select className="h-10 rounded-lg border border-slate-200 px-3"><option>Applied</option><option>Interview</option><option>Offer</option></select>
                <div className="flex gap-2"><button className="rounded-lg bg-brandBlue px-4 py-2 text-white">Submit</button><button type="button" className="rounded-lg border border-slate-200 px-4 py-2" onClick={() => showToast(`Viewing ${appliedJob.role}`)}>View Job</button></div>
              </form>
            </article>
          ) : (
            <article className="rounded-xl border border-dashed border-slate-300 bg-white p-4 text-sm text-slate-500 shadow-card">
              Apply to a recommended job first and the company application form will appear here.
            </article>
          )}
        </div>
      </div>

      <article className="tab-transition rounded-xl border border-slate-200 bg-white p-4 shadow-card">
        <h4 className="text-xl font-extrabold">Job Matches</h4>
        <p className="text-sm text-slate-500">Top opportunities tailored for you</p>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="border-b border-slate-200 text-slate-600"><tr><th className="py-2">Role</th><th>Company</th><th>Match</th><th>Salary</th><th>Action</th></tr></thead>
            <tbody>
              {jobs.slice(0, 5).map((job) => (
                <tr key={job.id} className="border-b border-slate-100">
                  <td className="py-2 font-semibold">{job.role}</td>
                  <td>{job.company}</td>
                  <td><span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-700">{job.match}%</span></td>
                  <td>{job.salary}</td>
                  <td><button className="rounded-lg border border-slate-200 px-3 py-1" onClick={() => onApplyJob(job.id, { applyUrl: job.applyUrl, role: job.role })}>Apply Now</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>
    </section>
  );
}
