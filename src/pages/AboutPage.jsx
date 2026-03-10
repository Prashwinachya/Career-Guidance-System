import { useState } from "react";
import { BookOpen, GraduationCap, Mail, MapPin, Phone, User } from "lucide-react";
import { useAppContext } from "../services/AppContext";

function FeatureCard({ icon, title, text }) {
  return (
    <article className="text-center">
      <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-brandBlue to-brandPurple text-white">{icon}</div>
      <h3 className="mt-4 text-4xl font-bold">{title}</h3>
      <p className="mx-auto mt-2 max-w-sm text-xl text-slate-500">{text}</p>
    </article>
  );
}

export function AboutPage() {
  const { showToast } = useAppContext();
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!contactForm.name.trim() || !contactForm.email.trim() || !contactForm.message.trim()) {
      showToast("Fill in all contact form fields");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(contactForm.email.trim())) {
      showToast("Enter a valid email address");
      return;
    }

    showToast("Message submitted successfully");
    setContactForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="aboutSection">
      <section className="mx-auto max-w-[1240px] px-4 pb-14 pt-8 text-center sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-slate-900 sm:text-5xl lg:text-6xl">About Our Platform</h1>
        <p className="mx-auto mt-4 max-w-4xl text-base leading-8 text-slate-500 sm:text-xl">
          Developed by VTU 5th Semester CSE students under the guidance of Mrs. Srividya Bhat at Sahyadri College of Engineering &amp; Management.
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          <FeatureCard icon={<GraduationCap />} title="VTU Project" text="Final year project for VTU 5th Semester Computer Science Engineering students." />
          <FeatureCard icon={<User />} title="Expert Guidance" text="Mentored by Mrs. Srividya Bhat, ensuring academic excellence and practical implementation." />
          <FeatureCard icon={<BookOpen />} title="Sahyadri College" text="Developed at Sahyadri College of Engineering & Management, Mangalore." />
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-[1240px] px-4 pb-10 pt-8 text-center sm:px-6 lg:px-8">
        <h2 className="text-4xl font-extrabold text-slate-900 sm:text-5xl lg:text-6xl">Get In Touch</h2>
        <p className="mx-auto mt-4 max-w-4xl text-base leading-8 text-slate-500 sm:text-xl">Have questions about our platform? We'd love to hear from you.</p>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          <a href="mailto:career.guidance@vtu.edu.in" className="block rounded-2xl transition hover:-translate-y-0.5">
            <FeatureCard icon={<Mail />} title="Email Us" text="career.guidance@vtu.edu.in" />
          </a>
          <a href="tel:+919876543210" className="block rounded-2xl transition hover:-translate-y-0.5">
            <FeatureCard icon={<Phone />} title="Call Us" text="+91 98765 43210" />
          </a>
          <a href="https://maps.google.com/?q=Sahyadri+College+of+Engineering+%26+Management+Mangalore" target="_blank" rel="noreferrer" className="block rounded-2xl transition hover:-translate-y-0.5">
            <FeatureCard icon={<MapPin />} title="Visit Us" text="Sahyadri College of Engineering & Management, Mangalore" />
          </a>
        </div>

        <form
          className="mx-auto mt-12 max-w-2xl rounded-xl border border-slate-200 bg-white p-5 text-left shadow-card"
          onSubmit={handleSubmit}
        >
          <h3 className="text-2xl font-extrabold">Contact Form</h3>
          <div className="mt-3 grid gap-3">
            <input className="h-11 rounded-lg border border-slate-200 px-3" placeholder="Name" value={contactForm.name} onChange={(event) => setContactForm((prev) => ({ ...prev, name: event.target.value }))} />
            <input className="h-11 rounded-lg border border-slate-200 px-3" type="email" placeholder="Email" value={contactForm.email} onChange={(event) => setContactForm((prev) => ({ ...prev, email: event.target.value }))} />
            <textarea className="rounded-lg border border-slate-200 p-3" rows="4" placeholder="Message" value={contactForm.message} onChange={(event) => setContactForm((prev) => ({ ...prev, message: event.target.value }))}></textarea>
            <button className="h-11 rounded-lg bg-brandBlue px-4 text-sm font-semibold text-white">Submit</button>
          </div>
        </form>
      </section>

      <section className="bg-gradient-to-r from-brandBlue via-[#4f4ce6] to-brandPurple py-16 text-white">
        <div className="mx-auto max-w-[1240px] px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-4xl font-extrabold sm:text-5xl lg:text-6xl">Ready to Transform Your Career?</h2>
          <p className="mx-auto mt-4 max-w-4xl text-base text-white/90 sm:text-xl">Join thousands of students who have already discovered their ideal career path with our AI-powered guidance system.</p>
        </div>
      </section>
    </section>
  );
}
