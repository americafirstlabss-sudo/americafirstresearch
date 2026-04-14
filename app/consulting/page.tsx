import { ArrowRight, Beaker, CalendarDays, ClipboardList, LineChart, ShieldCheck, Stethoscope } from "lucide-react";
import { ConsultationForm } from "@/components/forms/consultation-form";

export default function ConsultingPage() {
  const consultingSteps = [
    {
      step: "Step 01",
      title: "Initial Intake",
      body: "Share your goals, history, symptoms, current labs, and the main outcomes you want to focus on.",
      Icon: ClipboardList
    },
    {
      step: "Step 02",
      title: "Physician Review",
      body: "Your biomarkers, priorities, and lifestyle factors are reviewed to shape a more personalized strategy.",
      Icon: Stethoscope
    },
    {
      step: "Step 03",
      title: "Action Plan",
      body: "Receive guidance on next steps, follow-up priorities, and a roadmap centered on longevity and wellness.",
      Icon: LineChart
    }
  ];

  return (
    <main className="shell py-16">
      <section className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.34em] text-black">Longevity MD Consulting</p>
          <h1 className="mt-4 text-5xl font-semibold text-platinum md:text-6xl">Physician-Guided Longevity Planning</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-platinum/72">
            Personalized consulting for patients focused on performance, preventive health, hormone optimization, metabolic support, and long-term longevity strategy.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a href="#booking" className="button-primary">Book a Consultation</a>
            <a href="#services" className="button-secondary">View Services</a>
          </div>
        </div>
        <div className="panel p-8">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["1:1", "Physician review and individualized planning"],
              ["Labs", "Interpretation support for biomarkers and ongoing progress"],
              ["Goals", "Energy, recovery, body composition, and long-term wellness"]
            ].map(([title, text]) => (
              <div key={title} className="rounded-[26px] border border-graphite/10 bg-white/82 p-5">
                <p className="text-3xl font-semibold text-platinum">{title}</p>
                <p className="mt-3 text-sm leading-7 text-platinum/68">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="mt-20 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.34em] text-black">What This Covers</p>
          <h2 className="mt-4 text-4xl font-semibold text-platinum">What This Covers</h2>
          <div className="mt-6 space-y-4">
            {[
              "Longevity-focused health review",
              "Performance and recovery planning",
              "Hormone and wellness discussion",
              "Lab interpretation and next-step guidance",
              "Body composition and metabolic support planning"
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 text-sm text-platinum/72">
                <ArrowRight className="h-4 w-4 text-[#9c7a2b]" />
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="panel p-8">
          <p className="text-[11px] font-medium uppercase tracking-[0.34em] text-black">Who It&apos;s For</p>
          <h2 className="mt-4 text-4xl font-semibold text-platinum">Who It&apos;s For</h2>
          <p className="mt-6 text-base leading-8 text-platinum/72">
            Built for adults seeking physician-guided support around optimization, preventive care, wellness strategy, and a more structured approach to long-term health.
          </p>
          <p className="mt-5 text-base leading-8 text-platinum/72">
            This page is positioned as a consulting and planning service, with recommendations based on goals, history, labs, and progress markers.
          </p>
        </div>
      </section>

      <section className="mt-20">
        <div className="mb-8">
          <p className="text-[11px] font-medium uppercase tracking-[0.34em] text-black">How It Works</p>
          <h2 className="mt-4 text-4xl font-semibold text-platinum">How It Works</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {consultingSteps.map(({ step, title, body, Icon: StepIcon }) => {
            return (
              <div key={title} className="panel p-6">
                <p className="text-[11px] font-medium uppercase tracking-[0.34em] text-black">{step}</p>
                <StepIcon className="mt-5 h-7 w-7 text-[#9c7a2b]" />
                <h3 className="mt-5 text-2xl font-semibold text-platinum">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-platinum/68">{body}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mt-20 grid gap-6 lg:grid-cols-2">
        <div className="panel p-8">
          <p className="text-[11px] font-medium uppercase tracking-[0.34em] text-black">Typical Focus Areas</p>
          <h2 className="mt-4 text-4xl font-semibold text-platinum">Typical Focus Areas</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {["Hormone support", "Fatigue", "Recovery", "Weight management", "Inflammation", "Sleep quality", "Performance"].map((item) => (
              <div key={item} className="rounded-full border border-graphite/10 bg-white/82 px-4 py-2 text-sm text-platinum/70">
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="panel p-8">
          <p className="text-[11px] font-medium uppercase tracking-[0.34em] text-black">What To Bring</p>
          <h2 className="mt-4 text-4xl font-semibold text-platinum">What To Bring</h2>
          <div className="mt-6 space-y-4">
            {["Recent labs", "Relevant medical history", "Current medications", "Supplements", "Clear list of goals"].map((item) => (
              <div key={item} className="flex items-center gap-3 text-sm text-platinum/72">
                <Beaker className="h-4 w-4 text-[#9c7a2b]" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-20 panel p-8 md:p-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.75fr]">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.34em] text-black">Consult Format</p>
            <h2 className="mt-4 text-4xl font-semibold text-platinum">Consult Format</h2>
            <p className="mt-6 text-base leading-8 text-platinum/72">
              Structured telehealth-style planning session with follow-up guidance depending on the service tier.
            </p>
          </div>
          <div className="flex items-center justify-start lg:justify-end">
            <a href="#booking" className="button-primary">Book Now</a>
          </div>
        </div>
      </section>

      <section id="booking" className="mt-20">
        <ConsultationForm />
      </section>
    </main>
  );
}
