import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../services/AppContext";

export function LoginPage() {
  const navigate = useNavigate();
  const { login, signup, loginWithProvider, showToast } = useAppContext();
  const [mode, setMode] = useState("signin");
  const [email, setEmail] = useState("demo@example.com");
  const [password, setPassword] = useState("password123");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
    const ok = mode === "signin"
      ? login(email, password)
      : signup({ name, email, password, confirmPassword });

    if (ok) {
      navigate("/app/dashboard");
    }
  };

  return (
    <section className="mx-auto grid min-h-[calc(100vh-74px)] max-w-[1240px] place-items-center px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-lg">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-brandBlue to-brandPurple text-white">→</div>
        <h2 className="mt-4 text-center text-3xl font-extrabold">{mode === "signin" ? "Welcome Back" : "Create Your Account"}</h2>
        <p className="mt-1 text-center text-sm text-slate-500">
          {mode === "signin" ? "Sign in to continue your career journey" : "Sign up to unlock personalized recommendations"}
        </p>

        <div className="mt-5 grid grid-cols-2 rounded-lg bg-slate-100 p-1 text-sm font-semibold">
          <button
            type="button"
            className={`rounded-md px-3 py-2 transition ${mode === "signin" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"}`}
            onClick={() => setMode("signin")}
          >
            Sign In
          </button>
          <button
            type="button"
            className={`rounded-md px-3 py-2 transition ${mode === "signup" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"}`}
            onClick={() => setMode("signup")}
          >
            Create ID
          </button>
        </div>

        <form className="mt-5 grid gap-3" onSubmit={onSubmit}>
          {mode === "signup" && (
            <>
              <label className="text-sm font-semibold">Full Name</label>
              <input
                className="h-11 rounded-lg border border-slate-200 px-3 text-sm"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
              />
            </>
          )}

          <label className="text-sm font-semibold">Email Address</label>
          <input
            className="h-11 rounded-lg border border-slate-200 px-3 text-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
          />

          <label className="text-sm font-semibold">Password</label>
          <input
            className="h-11 rounded-lg border border-slate-200 px-3 text-sm"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 8 characters"
          />

          {mode === "signup" && (
            <>
              <label className="text-sm font-semibold">Confirm Password</label>
              <input
                className="h-11 rounded-lg border border-slate-200 px-3 text-sm"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter password"
              />
            </>
          )}

          <div className="flex items-center justify-between text-sm text-slate-500">
            <label className="flex items-center gap-2"><input type="checkbox" /> Remember me</label>
            <button type="button" className="font-semibold text-brandBlue" onClick={() => showToast("Reset link sent")}>Forgot password?</button>
          </div>

          <button className="h-11 rounded-lg bg-brandBlue text-sm font-semibold text-white">
            {mode === "signin" ? "Sign In" : "Create Account"}
          </button>
        </form>

        <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
          <button
            type="button"
            className="rounded-lg border border-slate-200 px-3 py-2 font-medium"
            onClick={() => {
              const ok = loginWithProvider("Google");
              if (ok) navigate("/app/dashboard");
            }}
          >
            Google
          </button>
          <button
            type="button"
            className="rounded-lg border border-slate-200 px-3 py-2 font-medium"
            onClick={() => {
              const ok = loginWithProvider("LinkedIn");
              if (ok) navigate("/app/dashboard");
            }}
          >
            LinkedIn
          </button>
        </div>

        <p className="mt-4 text-center text-sm text-slate-500">
          {mode === "signin" ? "No account yet?" : "Already registered?"}{" "}
          <button type="button" className="font-semibold text-brandBlue" onClick={() => setMode((m) => (m === "signin" ? "signup" : "signin"))}>
            {mode === "signin" ? "Create new ID" : "Sign in here"}
          </button>
        </p>

        <div className="mt-4 rounded-lg bg-slate-50 p-3 text-center text-xs text-slate-500">
          <p className="font-semibold">DEMO CREDENTIALS</p>
          <p>Email: demo@example.com</p>
          <p>Password: password123</p>
        </div>
      </div>
    </section>
  );
}
