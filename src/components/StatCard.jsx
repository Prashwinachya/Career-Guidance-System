const TONES = {
  emerald: {
    border: "border-emerald-100",
    value: "text-emerald-700",
    glow: "from-emerald-50 to-white"
  },
  blue: {
    border: "border-blue-100",
    value: "text-blue-700",
    glow: "from-blue-50 to-white"
  },
  violet: {
    border: "border-violet-100",
    value: "text-violet-700",
    glow: "from-violet-50 to-white"
  },
  amber: {
    border: "border-amber-100",
    value: "text-amber-700",
    glow: "from-amber-50 to-white"
  }
};

export function StatCard({ title, value, note, tone = "blue" }) {
  const style = TONES[tone] || TONES.blue;

  return (
    <article className={`relative overflow-hidden rounded-2xl border bg-gradient-to-br p-4 shadow-card ${style.border} ${style.glow}`}>
      <div className="absolute right-0 top-0 h-20 w-20 rounded-full bg-white/60 blur-2xl"></div>
      <h5 className="text-base font-semibold text-slate-700">{title}</h5>
      <p className={`mt-2 text-3xl font-extrabold ${style.value}`}>{value}</p>
      <p className="text-sm text-slate-500">{note}</p>
    </article>
  );
}
