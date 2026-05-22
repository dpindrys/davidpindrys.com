"use client";

import { useState } from "react";

import { PRIMARY_FILLED_INTERACTIVE } from "./buttonTokens";
import { frxSectionBodyClass } from "../case-studies/frx/frxCaseStudyTypography";

const labelClass =
  "font-sans text-[13px] font-semibold leading-none text-black/80";

const inputClass =
  "w-full rounded-xl border border-black/10 bg-white px-4 py-3 font-sans text-[16px] leading-normal text-black outline-none transition-[border-color,box-shadow] placeholder:text-black/35 focus-visible:border-black/25 focus-visible:ring-2 focus-visible:ring-black/10";

const CONTACT_EMAIL = "dpindrys@gmail.com";

export default function NewClientContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const company = String(data.get("company") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const subject = encodeURIComponent("New client inquiry — David Pindrys portfolio");
    const body = encodeURIComponent(
      [
        `Name: ${name}`,
        `Email: ${email}`,
        company ? `Organization: ${company}` : null,
        "",
        message,
      ]
        .filter(Boolean)
        .join("\n"),
    );

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    setSubmitted(true);
    form.reset();
  }

  if (submitted) {
    return (
      <p className={`${frxSectionBodyClass} max-w-[42rem]`}>
        Thanks — your email client should open with a draft message. Send it when
        you are ready and I will follow up shortly.
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-[42rem] flex-col gap-6"
      noValidate
    >
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className={labelClass}>Name</span>
          <input
            type="text"
            name="name"
            required
            autoComplete="name"
            className={inputClass}
            placeholder="Your name"
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className={labelClass}>Email</span>
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            className={inputClass}
            placeholder="you@company.com"
          />
        </label>
      </div>

      <label className="flex flex-col gap-2">
        <span className={labelClass}>
          Organization <span className="font-normal text-black/45">(optional)</span>
        </span>
        <input
          type="text"
          name="company"
          autoComplete="organization"
          className={inputClass}
          placeholder="Company or team"
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className={labelClass}>How can I help?</span>
        <textarea
          name="message"
          required
          rows={5}
          className={`${inputClass} resize-y min-h-[140px]`}
          placeholder="Briefly describe your project, timeline, and what you are looking for."
        />
      </label>

      <div>
        <button
          type="submit"
          className={`inline-flex h-12 items-center rounded-2xl px-6 font-sans text-[16px] font-semibold leading-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/25 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F4F2EE] ${PRIMARY_FILLED_INTERACTIVE}`}
        >
          Send inquiry
        </button>
      </div>
    </form>
  );
}
