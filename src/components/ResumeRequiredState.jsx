export function ResumeRequiredState({ title, description, actionLabel, onAction }) {
  return (
    <section className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center shadow-card">
      <div className="mx-auto max-w-2xl">
        <p className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
          Resume analysis required
        </p>
        <h3 className="mt-4 text-2xl font-extrabold text-slate-900">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
        <button
          type="button"
          className="mt-5 rounded-xl bg-brandBlue px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#4056c6]"
          onClick={onAction}
        >
          {actionLabel}
        </button>
      </div>
    </section>
  );
}
