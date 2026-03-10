import { useMemo, useState } from "react";
import { Filter, Search } from "lucide-react";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { ResumeRequiredState } from "../components/ResumeRequiredState";
import { useAppContext } from "../services/AppContext";

export function JobsPage() {
  const navigate = useNavigate();
  const { jobs, onApplyJob, onSaveJob, showToast, hasResume } = useAppContext();
  const [tab, setTab] = useState("all");
  const [query, setQuery] = useState("");

  if (!hasResume) {
    return (
      <ResumeRequiredState
        title="Upload your resume to unlock matching jobs"
        description="The job portal stays empty until your resume is analyzed. After analysis, only suitable jobs with matching skills will appear here."
        actionLabel="Add Resume In Profile"
        onAction={() => navigate("/app/profile")}
      />
    );
  }

  const filtered = useMemo(() => {
    let list = jobs;
    if (tab === "recommended") list = list.filter((job) => job.recommended);
    if (tab === "saved") list = list.filter((job) => job.saved);
    if (tab === "applied") list = list.filter((job) => job.applied);

    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter((job) => `${job.role} ${job.company} ${job.skills.join(" ")}`.toLowerCase().includes(q));
    }

    return list;
  }, [jobs, tab, query]);

  const applied = filtered.find((job) => job.applied);

  const counters = [
    [jobs.length, "Total Jobs"],
    [jobs.filter((j) => j.saved).length, "Saved Jobs"],
    [jobs.filter((j) => j.applied).length, "Applied Jobs"],
    [jobs.filter((j) => j.recommended).length, "Recommended"]
  ];

  return (
    <section className="space-y-4">
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-card">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-2xl font-extrabold">Job Integration</h3>
          <div className="flex gap-2 text-sm">
            <button className="rounded-lg border border-slate-200 px-3 py-2" onClick={() => showToast("Filters opened")}><Filter className="h-4 w-4" /></button>
            <button className="rounded-lg border border-slate-200 px-3 py-2" onClick={() => showToast("Compare mode")}>Compare</button>
            <button className="rounded-lg border border-slate-200 px-3 py-2" onClick={() => showToast("Alerts enabled")}>Alerts</button>
            <button className="rounded-lg border border-slate-200 px-3 py-2" onClick={() => showToast("Insights updated")}>Insights</button>
          </div>
        </div>
      </div>

      <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-card">
        <div className="grid gap-3 md:grid-cols-[1fr_auto]">
          <div className="flex items-center rounded-lg border border-slate-200 px-3">
            <Search className="h-4 w-4 text-slate-400" />
            <input className="ml-2 h-10 w-full border-0 p-0 text-sm outline-none" placeholder="Search jobs, companies, or skills..." value={query} onChange={(e) => setQuery(e.target.value)} />
          </div>
          <button className="h-10 rounded-lg bg-brandBlue px-6 text-sm font-semibold text-white" onClick={() => showToast("Search updated")}>Search</button>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {counters.map(([value, title]) => (
            <article key={title} className="rounded-xl border border-slate-200 p-4 text-center">
              <p className="text-2xl font-extrabold">{value}</p>
              <p className="text-sm text-slate-500">{title}</p>
            </article>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {[
            ["all", "All Jobs"],
            ["recommended", "Recommended"],
            ["saved", "Saved"],
            ["applied", "Applied"]
          ].map(([key, label]) => (
            <button key={key} className={clsx("rounded-lg border px-3 py-2 text-sm font-semibold", tab === key ? "border-brandBlue bg-brandBlue text-white" : "border-slate-200 bg-white")} onClick={() => setTab(key)}>
              {label}
            </button>
          ))}
        </div>
      </article>

      <div key={`${tab}-${query}`} className="tab-transition space-y-4">
      {filtered.length === 0 && (
        <article className="rounded-xl border border-dashed border-slate-300 bg-white p-5 text-sm text-slate-500 shadow-card">
          No matching jobs found for the current filter. Try another tab or update your resume with more relevant skills.
        </article>
      )}
      {filtered.map((job) => (
        <article key={job.id} className="rounded-xl border border-slate-200 bg-white p-4 shadow-card">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h4 className="text-xl font-extrabold">{job.role} <span className="ml-2 rounded-full bg-emerald-100 px-2 py-0.5 text-sm text-emerald-700">{job.match}% Match</span></h4>
              <p className="text-base text-slate-500">{job.company}</p>
              <p className="mt-2 text-slate-500">Develop machine learning models and data pipelines.</p>
              <p className="mt-2 text-sm text-slate-500">{job.location} - {job.salary}</p>
              <div className="mt-2 flex flex-wrap gap-2">{job.skills.map((skill) => <span key={skill} className="rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-[#5472b8]">{skill}</span>)}</div>
            </div>
            <button className="rounded-lg border border-slate-200 px-3 py-2 text-sm" onClick={() => onSaveJob(job.id)}>{job.saved ? "Saved" : "Save"}</button>
          </div>
          <div className="mt-3 grid grid-cols-[1fr_auto_auto] gap-2">
            <button className="rounded-lg bg-brandBlue py-2 text-sm font-semibold text-white" onClick={() => onApplyJob(job.id, { applyUrl: job.applyUrl, role: job.role })}>Apply Now</button>
            <button className="rounded-lg border border-slate-200 px-3 py-2 text-sm" onClick={() => showToast("Added to compare")}>+</button>
            <button className="rounded-lg border border-slate-200 px-3 py-2 text-sm" onClick={() => showToast("Shared job")}>⇪</button>
          </div>
        </article>
      ))}

      {tab === "applied" && applied && (
        <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-card">
          <h4 className="text-xl font-extrabold">Company Applied Form</h4>
          <p className="text-sm text-slate-500">Shown only for companies you applied</p>
          <div className="mt-3 rounded-lg border border-slate-200 p-3 text-sm">
            <p><strong>Company:</strong> {applied.company}</p>
            <p><strong>Role:</strong> {applied.role}</p>
            <p><strong>Location:</strong> {applied.location}</p>
            <p><strong>Package:</strong> {applied.salary}</p>
          </div>
          <form className="mt-3 grid gap-2 text-sm" onSubmit={(event) => { event.preventDefault(); showToast("Submitted"); }}>
            <input className="h-10 rounded-lg border border-slate-200 px-3" placeholder="Package" />
            <input className="h-10 rounded-lg border border-slate-200 px-3" placeholder="Resume Link" />
            <textarea className="rounded-lg border border-slate-200 p-3" rows="4" placeholder="Required Details"></textarea>
            <select className="h-10 rounded-lg border border-slate-200 px-3"><option>Select status</option><option>Applied</option><option>Interview</option><option>Offer</option></select>
            <div className="flex gap-2"><button className="rounded-lg bg-brandBlue px-4 py-2 text-white">Submit</button><button type="button" className="rounded-lg border border-slate-200 px-4 py-2" onClick={() => showToast("Viewing job")}>View Job</button></div>
          </form>
        </article>
      )}
      </div>
    </section>
  );
}
