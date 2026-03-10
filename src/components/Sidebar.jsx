import { Home, User, ClipboardList, Briefcase, FileText } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";

const items = [
  ["Dashboard", "/app/dashboard", Home],
  ["Profile", "/app/profile", User],
  ["Recommendations", "/app/recommendations", ClipboardList],
  ["Jobs", "/app/jobs", Briefcase],
  ["Reports", "/app/reports", FileText]
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="border-r border-slate-200 bg-gradient-to-b from-[#f9fbff] via-white to-[#f7fbff] px-4 py-4 lg:min-h-[calc(100vh-74px)]">
      <p className="mb-3 px-2 text-xs font-bold uppercase tracking-wider text-slate-400">Workspace</p>
      <nav className="grid gap-2 text-base font-semibold text-slate-600">
        {items.map(([label, to, Icon]) => (
          <Link
            key={label}
            to={to}
            className={clsx(
              "group flex items-center gap-3 rounded-xl px-3 py-2.5 transition",
              location.pathname === to
                ? "bg-gradient-to-r from-[#dce8ff] to-[#eff5ff] text-[#2645a3] shadow-sm"
                : "hover:bg-slate-100"
            )}
          >
            <span
              className={clsx(
                "grid h-8 w-8 place-items-center rounded-lg border border-slate-200 bg-white text-slate-500 transition",
                location.pathname === to && "border-[#bdd0ff] text-[#2645a3]"
              )}
            >
              <Icon className="h-4 w-4" />
            </span>
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
