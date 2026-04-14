"use client";

import { useState } from "react";

const subjectOptions = [
  "Order Support",
  "Product Question",
  "Shipping Inquiry",
  "General Inquiry"
];

export function ContactForm() {
  const [status, setStatus] = useState("");
  const [submitted, setSubmitted] = useState(false);

  async function action(formData: FormData) {
    setSubmitted(false);
    setStatus("Sending...");

    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      orderNumber: formData.get("orderNumber"),
      subject: formData.get("subject"),
      message: formData.get("message")
    };

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await response.json();

    if (!response.ok) {
      setStatus(data.error ?? "Could not send your message.");
      return;
    }

    setSubmitted(true);
    setStatus(data.message ?? "Your message has been sent. Our team will get back to you shortly.");
  }

  return (
    <form action={action} className="panel p-6 md:p-8">
      <div className="grid gap-4 md:grid-cols-2">
        <input
          name="name"
          required
          placeholder="Full Name"
          className="h-12 rounded-2xl border border-graphite/10 bg-white/88 px-4 text-sm text-platinum outline-none placeholder:text-platinum/35"
        />
        <input
          name="email"
          required
          type="email"
          placeholder="Email Address"
          className="h-12 rounded-2xl border border-graphite/10 bg-white/88 px-4 text-sm text-platinum outline-none placeholder:text-platinum/35"
        />
        <input
          name="orderNumber"
          placeholder="Order Number"
          className="h-12 rounded-2xl border border-graphite/10 bg-white/88 px-4 text-sm text-platinum outline-none placeholder:text-platinum/35"
        />
        <select
          name="subject"
          required
          defaultValue=""
          className="h-12 rounded-2xl border border-graphite/10 bg-white/88 px-4 text-sm text-platinum outline-none"
        >
          <option value="" disabled>
            Subject
          </option>
          {subjectOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <textarea
        name="message"
        required
        placeholder="Message"
        className="mt-4 min-h-40 w-full rounded-3xl border border-graphite/10 bg-white/88 px-4 py-4 text-sm text-platinum outline-none placeholder:text-platinum/35"
      />

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className={`text-sm ${submitted ? "text-[#9c7a2b]" : "text-platinum/55"}`}>
          {status || "Our team typically responds within 24-48 hours."}
        </p>
        <button type="submit" className="button-primary">
          Send Message
        </button>
      </div>
    </form>
  );
}
