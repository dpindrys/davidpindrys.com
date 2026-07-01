"use client";

import { useState } from "react";

import { PRIMARY_FILLED_INTERACTIVE } from "./buttonTokens";
import { frxSectionBodyClass } from "../case-studies/frx/frxCaseStudyTypography";

const labelClass =
  "font-sans text-[13px] font-semibold leading-none text-black/80";

const inputClass =
  "w-full rounded-xl border border-black/10 bg-white px-4 py-3 font-sans text-[16px] leading-normal text-black outline-none transition-[border-color,box-shadow] placeholder:text-black/35 focus-visible:border-black/25 focus-visible:ring-2 focus-visible:ring-black/10";

const cardClass =
  "rounded-2xl border border-black/10 bg-white p-6 shadow-[0_10px_30px_-22px_rgba(0,0,0,0.25)] md:p-8";

const titleClass =
  "font-sans text-[18px] font-semibold leading-[1.3] text-black md:text-[19px]";

const privacyClass =
  "flex items-center gap-2 font-sans text-[13px] leading-[1.45] text-black/50";

const errorClass =
  "font-sans text-[14px] leading-[1.5] text-red-700 md:text-[15px]";

const CONTACT_EMAIL = "dpindrys@gmail.com";
const FORMSPREE_FORM_ID = process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID?.trim();

function SendIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className="shrink-0"
    >
      <path
        d="M22 3 11 14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 3l-7 19-4-9-9-4 19-7z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className="shrink-0"
    >
      <rect
        x="5"
        y="11"
        width="14"
        height="10"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <path
        d="M8 11V8a4 4 0 118 0v3"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

type SubmitMode = "formspree" | "mailto";

export default function NewClientContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitMode, setSubmitMode] = useState<SubmitMode | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const company = String(data.get("company") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (!name || !email || !message) {
      setError("Please fill in your name, email, and message.");
      return;
    }

    setLoading(true);
    setError(null);

    if (FORMSPREE_FORM_ID) {
      try {
        const payload = new FormData();
        payload.append("name", name);
        payload.append("email", email);
        payload.append("_replyto", email);
        payload.append("_subject", "Message from portfolio — David Pindrys");
        if (company) payload.append("company", company);
        payload.append("message", message);

        const response = await fetch(
          `https://formspree.io/f/${FORMSPREE_FORM_ID}`,
          {
            method: "POST",
            headers: { Accept: "application/json" },
            body: payload,
          },
        );

        const result = (await response.json().catch(() => null)) as {
          error?: string;
        } | null;

        if (!response.ok) {
          throw new Error(
            result?.error ?? "Unable to send your message. Please try again.",
          );
        }

        setSubmitMode("formspree");
        setSubmitted(true);
        form.reset();
      } catch (submitError) {
        setError(
          submitError instanceof Error
            ? submitError.message
            : "Unable to send your message. Please try again.",
        );
      } finally {
        setLoading(false);
      }
      return;
    }

    const subject = encodeURIComponent("Message from portfolio — David Pindrys");
    const body = encodeURIComponent(
      [
        `Name: ${name}`,
        `Email: ${email}`,
        company ? `Company: ${company}` : null,
        "",
        message,
      ]
        .filter(Boolean)
        .join("\n"),
    );

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    setSubmitMode("mailto");
    setSubmitted(true);
    form.reset();
    setLoading(false);
  }

  if (submitted) {
    return (
      <div className={cardClass}>
        <p className={frxSectionBodyClass}>
          {submitMode === "formspree"
            ? "Thanks — your message was sent. I'll get back to you soon."
            : "Thanks — your email client should open with a draft message. Send it when you are ready and I will follow up shortly."}
        </p>
      </div>
    );
  }

  return (
    <div className={cardClass}>
      <div className="flex flex-col gap-2">
        <h2 className={titleClass}>Send me a message</h2>
        <p className="font-sans text-[14px] leading-[1.55] text-black/70 md:text-[15px]">
          Whether you&apos;re exploring a partnership or just want to connect, fill
          out the form below and I&apos;ll get back to you soon.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-6" noValidate>
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
              disabled={loading}
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
              disabled={loading}
            />
          </label>
        </div>

        <label className="flex flex-col gap-2">
          <span className={labelClass}>
            Company <span className="font-normal text-black/45">(optional)</span>
          </span>
          <input
            type="text"
            name="company"
            autoComplete="organization"
            className={inputClass}
            placeholder="Your company"
            disabled={loading}
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className={labelClass}>Message</span>
          <textarea
            name="message"
            required
            rows={5}
            className={`${inputClass} min-h-[140px] resize-y`}
            placeholder="Tell me about your project or question..."
            disabled={loading}
          />
        </label>

        {error ? (
          <p className={errorClass} role="alert">
            {error}
          </p>
        ) : null}

        <div className="flex flex-col gap-3">
          <button
            type="submit"
            disabled={loading}
            className={`inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl px-6 font-sans text-[16px] font-semibold leading-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/25 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto ${PRIMARY_FILLED_INTERACTIVE}`}
          >
            <SendIcon />
            <span>{loading ? "Sending…" : "Send message"}</span>
          </button>
          <p className={privacyClass}>
            <LockIcon />
            <span>Your information is never shared.</span>
          </p>
        </div>
      </form>
    </div>
  );
}
