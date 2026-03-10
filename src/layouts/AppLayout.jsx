import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { TopNavbar } from "../components/TopNavbar";
import { Sidebar } from "../components/Sidebar";

export function AppLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <>
      <TopNavbar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <div className="mx-auto grid max-w-[1240px] grid-cols-1 lg:grid-cols-[260px_1fr]">
        <Sidebar />
        <div className="app-scroll max-h-[calc(100vh-74px)] overflow-auto px-4 py-4 sm:px-6">
          <div key={location.pathname} className="page-transition">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
