import { Link, useLocation, useNavigate } from "react-router-dom";
import { LogOut, Menu, UserRound } from "lucide-react";
import clsx from "clsx";
import { useAppContext } from "../services/AppContext";

export function TopNavbar({ mobileOpen, setMobileOpen }) {
  const { isAuth, currentUser, logout } = useAppContext();
  const location = useLocation();
  const navigate = useNavigate();

  const onGoDashboard = () => {
    if (!isAuth) {
      navigate("/login");
      return;
    }
    navigate("/app/dashboard");
  };

  const navItems = [
    ["Home", "/"],
    ["Features", "/#features"],
    ["About", "/#about"],
    ["Contact", "/#contact"]
  ];

  const isHomeLinkActive = (to) => {
    if (to === "/") {
      return location.pathname === "/" && !location.hash;
    }

    const [path, hash] = to.split("#");
    return location.pathname === path && location.hash === `#${hash}`;
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-[74px] max-w-[1240px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-[#3f6cd8] to-[#2d4fb4] text-xs font-extrabold text-white">CG</div>
          <span className="text-[26px] font-extrabold text-[#2d4fb4]">Career Guidance</span>
        </div>

        <nav className="hidden items-center gap-2 lg:flex">
          {navItems.map(([label, to]) => (
            <a
              key={label}
              href={to}
              className={clsx(
                "rounded-lg px-3 py-2 text-base font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-brandBlue",
                isHomeLinkActive(to) && "bg-[#e7efff] text-brandBlue"
              )}
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-semibold text-slate-600">
            <UserRound className="h-4 w-4 text-slate-500" />
            {isAuth ? currentUser?.name || "User" : "Guest"}
          </span>

          <button className="rounded-lg border border-slate-200 px-3 py-2 text-base font-semibold text-slate-700 transition hover:border-brandBlue hover:text-brandBlue" onClick={onGoDashboard}>Dashboard</button>
          <div className="h-5 w-px bg-slate-200"></div>
          {isAuth ? (
            <button className="flex items-center gap-1 rounded-lg px-3 py-2 text-base font-semibold text-slate-700 transition hover:bg-slate-100" onClick={() => { logout(); navigate("/"); }}>
              <LogOut className="h-4 w-4" /> Logout
            </button>
          ) : (
            <Link to="/login" className="rounded-lg bg-brandBlue px-4 py-2 text-base font-semibold text-white">Sign In</Link>
          )}
        </div>

        <button className="lg:hidden" onClick={() => setMobileOpen((v) => !v)}>
          <Menu className="h-6 w-6" />
        </button>
      </div>

      <div className={clsx("border-t border-slate-200 bg-white p-4 lg:hidden", !mobileOpen && "hidden")}>
        <div className="grid gap-3 text-base font-semibold text-slate-700">
          {navItems.map(([label, to]) => (
            <a key={label} href={to} onClick={() => setMobileOpen(false)}>{label}</a>
          ))}
          <button className="text-left" onClick={() => { onGoDashboard(); setMobileOpen(false); }}>Dashboard</button>
          {isAuth ? <button className="text-left" onClick={() => { logout(); navigate("/"); setMobileOpen(false); }}>Logout</button> : <Link to="/login" onClick={() => setMobileOpen(false)}>Sign In</Link>}
        </div>
      </div>
    </header>
  );
}
