import { Navigate, Route, Routes } from "react-router-dom";
import { PublicLayout } from "./layouts/PublicLayout";
import { AppLayout } from "./layouts/AppLayout";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { LoginPage } from "./pages/LoginPage";
import { DashboardPage } from "./pages/DashboardPage";
import { RecommendationsPage } from "./pages/RecommendationsPage";
import { JobsPage } from "./pages/JobsPage";
import { ReportsPage } from "./pages/ReportsPage";
import { ProfilePage } from "./pages/ProfilePage";
import { AppProvider, useAppContext } from "./services/AppContext";

function ProtectedRoute({ children }) {
  const { isAuth } = useAppContext();
  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function Toast() {
  const { toast } = useAppContext();
  return (
    <div className={`fixed bottom-4 right-4 z-[100] rounded-lg bg-slate-900 px-4 py-2 text-sm text-white ${!toast ? "hidden" : ""}`}>
      {toast}
    </div>
  );
}

function AppRoutes() {
  return (
    <>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>

        <Route
          path="/app"
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="recommendations" element={<RecommendationsPage />} />
          <Route path="jobs" element={<JobsPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route index element={<Navigate to="dashboard" replace />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toast />
    </>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
}
