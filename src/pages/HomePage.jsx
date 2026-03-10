import { ArrowRight, BadgeCheck, Briefcase, Mail, MapPin, Phone, Sparkles, Target, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { useAppContext } from "../services/AppContext";

function Metric({ value, label }) {
  return (
    <div className="text-center">
      <p className="text-4xl font-extrabold text-brandBlue">{value}</p>
      <p className="text-sm font-medium text-slate-500">{label}</p>
    </div>
  );
}

export function HomePage() {
  const { isAuth, currentUser, showToast } = useAppContext();

  const steps = [
    ["1", "Create Your ID", "Register in seconds and set your preferred career domains."],
    ["2", "Upload Resume", "Analyze strengths, gaps, and growth opportunities instantly."],
    ["3", "Track Dashboard", "Monitor monthly progress with colorful analytics and action plans."]
  ];

  const highlights = [
    ["AI Roadmap", "Adaptive skill roadmap based on your target role and strengths."],
    ["Job Match Score", "Role fit scoring with salary trends and interview readiness."],
    ["Career Reports", "Shareable progress reports for mentors and placement drives."]
  ];

  const innovationPillars = [
    {
      icon: <Sparkles className="h-5 w-5" />,
      title: "Resume-first intelligence",
      description: "The platform reads your resume, extracts skills, and builds a focused career path before showing jobs."
    },
    {
      icon: <Target className="h-5 w-5" />,
      title: "Role-specific action plans",
      description: "Every learner gets practical next steps for internships, projects, certifications, and placement prep."
    },
    {
      icon: <TrendingUp className="h-5 w-5" />,
      title: "Live growth tracking",
      description: "Progress cards, report generation, and match signals help students see improvement month over month."
    }
  ];

  const valueProps = [
    "AI-powered resume analysis with extracted skills and role fit insights",
    "Personalized jobs, recommendations, and reports in one guided workspace",
    "Placement-focused tracking built for students who want a clear next step"
  ];

  const contactCards = [
    {
      title: "Mail the team",
      value: "career.guidance@vtu.edu.in",
      href: "mailto:career.guidance@vtu.edu.in",
      icon: <Mail className="h-5 w-5" />
    },
    {
      title: "Call support",
      value: "+91 98765 43210",
      href: "tel:+919876543210",
      icon: <Phone className="h-5 w-5" />
    },
    {
      title: "Visit campus",
      value: "Sahyadri College of Engineering & Management, Mangalore",
      href: "https://maps.google.com/?q=Sahyadri+College+of+Engineering+%26+Management+Mangalore",
      icon: <MapPin className="h-5 w-5" />
    }
  ];

  return (
    <section className="pb-12">
      <section className="smooth-enter mx-auto mt-6 max-w-[1240px] overflow-hidden rounded-3xl border border-[#d9e4f7] bg-gradient-to-br from-[#f0f7ff] via-[#ffffff] to-[#eaf4ff] px-4 pb-12 pt-10 text-center shadow-card sm:px-6 lg:px-8">
        <p className="mx-auto inline-flex items-center rounded-full border border-[#c4d7ff] bg-[#edf4ff] px-4 py-1 text-sm font-semibold text-[#2352a3]">
          New: Personalized monthly growth tracker is live
        </p>
        <h1 className="mt-4 text-5xl font-extrabold text-[#3346b3] sm:text-6xl">Career Guidance System</h1>
        <p className="mx-auto mt-4 max-w-4xl text-base leading-relaxed text-slate-600 sm:text-lg">
          AI-powered career counseling platform for VTU students. Discover role-specific recommendations, skill gap analysis, and progress insights built to help you move from learning to placement.
        </p>

        <div className="mx-auto mt-6 flex max-w-4xl flex-wrap items-center justify-center gap-2 text-sm font-medium text-slate-600">
          {valueProps.map((item) => (
            <span key={item} className="inline-flex items-center gap-2 rounded-full border border-[#d6e3ff] bg-white/90 px-4 py-2">
              <BadgeCheck className="h-4 w-4 text-[#2d62d6]" />
              {item}
            </span>
          ))}
        </div>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          {isAuth ? (
            <>
              <Link to="/app/dashboard" className="inline-flex items-center gap-2 rounded-xl bg-brandBlue px-7 py-3 text-base font-semibold text-white transition hover:translate-y-[-1px] hover:bg-[#3f52c7]">
                Open Dashboard
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/app/profile" className="rounded-xl border border-slate-200 bg-white px-7 py-3 text-base font-semibold text-slate-700 transition hover:border-brandBlue hover:text-brandBlue">
                Continue as {currentUser?.name?.split(" ")[0] || "User"}
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" className="rounded-xl bg-brandBlue px-7 py-3 text-base font-semibold text-white transition hover:translate-y-[-1px] hover:bg-[#3f52c7]">Get Started</Link>
              <Link to="/login" className="rounded-xl border border-slate-200 bg-white px-7 py-3 text-base font-semibold text-slate-700 transition hover:border-brandBlue hover:text-brandBlue">Sign In</Link>
            </>
          )}
        </div>

        <div className="mx-auto mt-8 grid max-w-5xl gap-4 text-left md:grid-cols-3">
          {innovationPillars.map((pillar) => (
            <div key={pillar.title} className="rounded-2xl border border-[#d6e6ff] bg-white/85 p-5 shadow-sm backdrop-blur">
              <div className="inline-flex rounded-xl bg-[#edf4ff] p-3 text-[#2d62d6]">{pillar.icon}</div>
              <h3 className="mt-4 text-lg font-bold text-slate-900">{pillar.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{pillar.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="smooth-enter mx-auto mt-5 grid max-w-[1240px] grid-cols-2 gap-6 rounded-2xl border border-slate-200 bg-white px-4 py-8 sm:grid-cols-4 sm:px-6 lg:px-8">
        <Metric value="10,000+" label="Students Helped" />
        <Metric value="95%" label="Success Rate" />
        <Metric value="500+" label="Partner Companies" />
        <Metric value="24/7" label="Support Available" />
      </section>

      <section id="features" className="smooth-enter mx-auto mt-5 grid max-w-[1240px] gap-4 px-4 sm:px-6 lg:grid-cols-[1.3fr_1fr] lg:px-8">
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
          <h3 className="text-2xl font-extrabold text-slate-900">Get Started Journey</h3>
          <p className="mt-1 text-sm text-slate-500">Set up your account and start tracking your career growth in under five minutes.</p>
          <div className="mt-4 grid gap-3">
            {steps.map(([number, title, description]) => (
              <div key={title} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm font-bold text-brandBlue">Step {number}</p>
                <p className="mt-1 text-lg font-bold text-slate-900">{title}</p>
                <p className="mt-1 text-sm text-slate-600">{description}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
          <h3 className="text-2xl font-extrabold text-slate-900">What You Get</h3>
          <div className="mt-3 grid gap-3">
            {highlights.map(([title, description]) => (
              <div key={title} className="rounded-xl bg-[#f7faff] p-4">
                <p className="font-bold text-[#27458f]">{title}</p>
                <p className="mt-1 text-sm text-slate-600">{description}</p>
              </div>
            ))}
          </div>
          <Link to="/about" className="mt-4 inline-flex rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-brandBlue hover:text-brandBlue">
            Explore Platform Details
          </Link>
        </article>
      </section>

      <section id="about" className="smooth-enter mx-auto mt-5 grid max-w-[1240px] gap-5 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#3760ca]">Why this platform stands out</p>
          <h2 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">An innovative placement companion, not just another job board</h2>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
            Career Guidance System combines resume analysis, AI recommendation logic, growth reporting, and placement-oriented job discovery in one student-first workflow. Instead of pushing generic listings, it first understands the learner and then recommends the right direction.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl bg-[#f7faff] p-4">
              <div className="inline-flex rounded-xl bg-white p-3 text-[#2d62d6] shadow-sm"><Briefcase className="h-5 w-5" /></div>
              <h3 className="mt-3 text-lg font-bold text-slate-900">Built for real placement outcomes</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">Students can move from resume upload to job discovery, saved roles, applications, and reports without leaving the platform.</p>
            </div>
            <div className="rounded-2xl bg-[#f7faff] p-4">
              <div className="inline-flex rounded-xl bg-white p-3 text-[#2d62d6] shadow-sm"><Sparkles className="h-5 w-5" /></div>
              <h3 className="mt-3 text-lg font-bold text-slate-900">Innovative decision support</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">The app highlights skill gaps, recommends direction, and helps learners understand why a role fits them.</p>
            </div>
          </div>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-gradient-to-br from-[#15336f] via-[#2858c6] to-[#5f6cf0] p-6 text-white shadow-card">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/75">For students, mentors, and placement cells</p>
          <h3 className="mt-3 text-3xl font-extrabold">One workspace for analysis, preparation, and action</h3>
          <div className="mt-6 grid gap-3">
            {[
              "Resume-driven guidance before recommendations are unlocked",
              "Career reports that can be shared during mentoring and review sessions",
              "A cleaner path from profile setup to job application and tracking"
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-medium text-white/95">
                {item}
              </div>
            ))}
          </div>
          <Link to={isAuth ? "/app/dashboard" : "/login"} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-[#23449d] transition hover:translate-y-[-1px]">
            {isAuth ? "Go to your workspace" : "Start your guided journey"}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </article>
      </section>

      <section id="contact" className="smooth-enter mx-auto mt-5 max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#3760ca]">Contact</p>
              <h2 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">Talk to the team behind the platform</h2>
              <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
                Reach out for demos, academic collaboration, placement-cell onboarding, or product feedback. Every contact option below is clickable and ready to use.
              </p>
            </div>
            <Link to="/about" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-brandBlue hover:text-brandBlue">
              View full about page
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {contactCards.map((card) => (
              <a
                key={card.title}
                href={card.href}
                target={card.href.startsWith("http") ? "_blank" : undefined}
                rel={card.href.startsWith("http") ? "noreferrer" : undefined}
                className="rounded-2xl border border-slate-200 bg-[#f8fbff] p-5 transition hover:-translate-y-0.5 hover:border-[#b8d0ff] hover:shadow-sm"
              >
                <div className="inline-flex rounded-xl bg-white p-3 text-[#2d62d6] shadow-sm">{card.icon}</div>
                <h3 className="mt-4 text-lg font-bold text-slate-900">{card.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{card.value}</p>
              </a>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-[#dce7ff] bg-gradient-to-r from-[#eef4ff] via-white to-[#eff7ff] p-5 sm:flex sm:items-center sm:justify-between">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Need a platform walkthrough?</h3>
              <p className="mt-1 text-sm text-slate-600">Use the dashboard after login to explore resume analysis, role recommendations, reports, and job matching end to end.</p>
            </div>
            <button
              type="button"
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-brandBlue px-5 py-3 text-sm font-semibold text-white sm:mt-0"
              onClick={() => showToast("Contact channels are active. Use email, call, or campus visit links above.")}
            >
              Verify contact options
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>
    </section>
  );
}
