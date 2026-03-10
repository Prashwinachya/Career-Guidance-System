import { Share2 } from "lucide-react";

export function ReportCard({ report, onPreview, onDownload, onShare }) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-card">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h4 className="text-xl font-extrabold">
            {report.title}
            <span className="ml-2 rounded-full bg-emerald-100 px-2 py-0.5 text-sm text-emerald-700">Ready</span>
          </h4>
          <p className="text-sm text-slate-500">Comprehensive analysis of your career profile and recommendations</p>
        </div>
        <p className="text-sm text-slate-500">
          {report.date}
          <br />
          PDF - {report.size}
        </p>
      </div>
      <p className="mt-3 text-sm font-semibold">Report Sections:</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {report.sections.map((section) => (
          <span key={section} className="rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-[#5472b8]">
            {section}
          </span>
        ))}
      </div>
      <div className="mt-3 flex gap-2">
        <button className="rounded-lg border border-slate-200 px-3 py-2 text-sm" onClick={onPreview}>Preview</button>
        <button className="rounded-lg bg-brandBlue px-3 py-2 text-sm font-semibold text-white" onClick={onDownload}>Download</button>
        <button className="rounded-lg border border-slate-200 px-3 py-2 text-sm" onClick={onShare}><Share2 className="h-4 w-4" /></button>
      </div>
    </article>
  );
}
