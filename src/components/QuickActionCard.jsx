export function QuickActionCard({ title, subtitle, onClick, icon: Icon, accent = "from-white to-[#f8fbff]" }) {
  return (
    <button className={`group relative overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br ${accent} p-4 text-left transition duration-200 hover:-translate-y-1 hover:border-brandBlue hover:shadow-lg`} onClick={onClick}>
      <div className="absolute right-0 top-0 h-20 w-20 rounded-full bg-white/50 blur-2xl transition group-hover:scale-110"></div>
      {Icon ? (
        <span className="mb-3 grid h-10 w-10 place-items-center rounded-xl border border-white/70 bg-white/80 text-slate-700 shadow-sm">
          <Icon className="h-5 w-5" />
        </span>
      ) : null}
      <p className="text-base font-extrabold text-slate-900">{title}</p>
      <p className="text-sm text-slate-500">{subtitle}</p>
      <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-slate-400">Open</p>
    </button>
  );
}
