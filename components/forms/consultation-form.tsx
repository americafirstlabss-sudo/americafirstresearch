"use client";

import { useState } from "react";

export function ConsultationForm() {
  const [status, setStatus] = useState("Send your request to reserve a physician-guided review.");
  const [submitted, setSubmitted] = useState(false);

  async function action(formData: FormData) {
    setSubmitted(false);
    setStatus("Sending...");
    const payload = {
      fullName: formData.get("fullName"),
      email: formData.get("email"),
      primaryGoal: formData.get("primaryGoal"),
      preferredDate: formData.get("preferredDate"),
      timeZone: formData.get("timeZone"),
      timeSlot: formData.get("timeSlot"),
      notes: formData.get("notes")
    };

    const response = await fetch("/api/consultations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await response.json();
    if (response.ok) {
      setSubmitted(true);
      setStatus(data.message ?? "Request received");
      return;
    }

    setStatus(data.error ?? "Could not submit");
  }

  return (
    <form action={action} className="panel p-6 md:p-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.34em] text-black">Request a Longevity MD Consultation</p>
          <h3 className="mt-3 text-3xl font-semibold text-platinum">$99 Initial Booking Fee</h3>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-platinum/68">
            Send your name, email, goals, and preferred appointment windows. We&apos;ll follow up with availability and next steps. A $99 consultation fee is required to reserve your call request.
          </p>
        </div>
        <div className="rounded-full border border-gold/20 bg-gold/10 px-4 py-2 text-sm font-semibold text-gold">
          $99
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <input name="fullName" required placeholder="Full Name" className="h-12 rounded-2xl border border-graphite/10 bg-white/88 px-4 text-sm text-platinum outline-none placeholder:text-platinum/35 md:col-span-2" />
        <input name="email" required type="email" placeholder="Email" className="h-12 rounded-2xl border border-graphite/10 bg-white/88 px-4 text-sm text-platinum outline-none placeholder:text-platinum/35 md:col-span-2" />
        <input name="primaryGoal" required placeholder="Energy, labs, recovery, weight, hormone support..." className="h-12 rounded-2xl border border-graphite/10 bg-white/88 px-4 text-sm text-platinum outline-none placeholder:text-platinum/35 md:col-span-2" />
        <input name="preferredDate" type="date" required className="h-12 rounded-2xl border border-graphite/10 bg-white/88 px-4 text-sm text-platinum outline-none" />
        <select name="timeZone" defaultValue="Eastern Time" className="h-12 rounded-2xl border border-graphite/10 bg-white/88 px-4 text-sm text-platinum outline-none">
          <option>Eastern Time</option>
          <option>Central Time</option>
          <option>Mountain Time</option>
          <option>Pacific Time</option>
        </select>
        <select name="timeSlot" required className="h-12 rounded-2xl border border-graphite/10 bg-white/88 px-4 text-sm text-platinum outline-none md:col-span-2">
          <option value="">Preferred Time Slot</option>
          <option>8:00 AM</option>
          <option>9:00 AM</option>
          <option>10:30 AM</option>
          <option>11:00 AM</option>
          <option>12:00 PM</option>
          <option>1:00 PM</option>
          <option>1:30 PM</option>
          <option>2:00 PM</option>
          <option>3:00 PM</option>
          <option>4:00 PM</option>
          <option>4:30 PM</option>
          <option>5:00 PM</option>
        </select>
      </div>

      <textarea name="notes" placeholder="Tell us what you want to focus on." className="mt-4 min-h-36 w-full rounded-3xl border border-graphite/10 bg-white/88 px-4 py-4 text-sm text-platinum outline-none placeholder:text-platinum/35" />

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className={`text-sm ${submitted ? "text-[#9c7a2b]" : "text-platinum/55"}`}>{status}</p>
        <button type="submit" className="button-primary">
          Request Consultation
        </button>
      </div>
    </form>
  );
}
