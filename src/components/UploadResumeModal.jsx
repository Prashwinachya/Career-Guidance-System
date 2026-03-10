export function UploadResumeModal({ open, onClose, onUpload, onFileChange }) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/45 p-4" onClick={(event) => event.target === event.currentTarget && onClose()}>
      <div className="w-full max-w-md rounded-xl bg-white p-5 shadow-2xl">
        <h4 className="text-2xl font-extrabold">Upload Resume</h4>
        <p className="mt-1 text-sm text-slate-500">Upload a PDF, DOCX, or text resume to unlock personalized analysis.</p>
        <label className="mt-3 block text-sm font-semibold">Select Resume File</label>
        <input type="file" accept=".pdf,.docx,.txt,.md" className="mt-2 w-full rounded-lg border border-slate-200 p-2 text-sm" onChange={(event) => onFileChange(event.target.files[0] || null)} />
        <div className="mt-4 grid grid-cols-2 gap-2">
          <button className="rounded-lg bg-brandBlue py-2 text-sm font-semibold text-white" onClick={onUpload}>Upload Resume</button>
          <button className="rounded-lg border border-slate-200 py-2 text-sm font-semibold" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
