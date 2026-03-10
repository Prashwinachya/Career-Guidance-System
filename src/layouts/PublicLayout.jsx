import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { TopNavbar } from "../components/TopNavbar";

export function PublicLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <>
      <TopNavbar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <div key={location.pathname} className="page-transition">
        <Outlet />
      </div>
    </>
  );
}
