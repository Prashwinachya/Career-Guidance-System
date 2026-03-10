import { ReportCard } from "../components/ReportCard";
import { useNavigate } from "react-router-dom";
import { ResumeRequiredState } from "../components/ResumeRequiredState";
import { useAppContext } from "../services/AppContext";

function Stat({ title, value }) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-card">
      <p className="text-sm font-semibold text-slate-500">{title}</p>
      <p className="mt-1 text-2xl font-extrabold">{value}</p>
    </article>
  );
}

export function ReportsPage() {
  const navigate = useNavigate();
  const { reports, onGenerateReport, showToast, hasResume } = useAppContext();

  if (!hasResume) {
    return (
      <ResumeRequiredState
        title="Upload your resume before generating reports"
        description="Career reports depend on your resume analysis, extracted skills, and personalized role matches."
        actionLabel="Add Resume In Profile"
        onAction={() => navigate("/app/profile")}
      />
    );
  }

  return (
    <section className="space-y-4">
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-card">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-2xl font-extrabold">Reports</h3>
          <div className="flex gap-2">
            <button className="rounded-lg border border-slate-200 px-3 py-2 text-sm" onClick={() => showToast("Share all")}>Share All</button>
            <button className="rounded-lg bg-brandBlue px-3 py-2 text-sm font-semibold text-white" onClick={onGenerateReport}>Generate New</button>
          </div>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Stat title="Total Reports" value={reports.length} />
        <Stat title="Ready to Download" value={reports.length} />
        <Stat title="This Month" value={2} />
        <Stat title="Shared Reports" value={1} />
      </div>

      {reports.map((report) => (
        <ReportCard
          key={report.id}
          report={report}
          onPreview={() => showToast(`Preview ${report.title}`)}
          onDownload={() => showToast(`Downloading ${report.title}`)}
          onShare={() => showToast(`Shared ${report.title}`)}
        />
      ))}
    </section>
  );
}
