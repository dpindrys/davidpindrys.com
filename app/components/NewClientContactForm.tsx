"use client";

import { useForm, ValidationError } from "@formspree/react";

import { PRIMARY_FILLED_INTERACTIVE } from "./buttonTokens";
import { frxSectionBodyClass } from "../case-studies/frx/frxCaseStudyTypography";

const labelClass =
  "font-sans text-[13px] font-semibold leading-none text-black/80";

const inputClass =
  "w-full rounded-xl border border-black/10 bg-white px-4 py-3 font-sans text-[16px] leading-normal text-black outline-none transition-[border-color,box-shadow] placeholder:text-black/35 focus-visible:border-black/25 focus-visible:ring-2 focus-visible:ring-black/10 disabled:cursor-not-allowed disabled:opacity-60";

const cardClass =
  "rounded-2xl border border-black/10 bg-white p-6 shadow-[0_10px_30px_-22px_rgba(0,0,0,0.25)] md:p-8";

const titleClass =
  "font-sans text-[18px] font-semibold leading-[1.3] text-black md:text-[19px]";

const privacyClass =
  "flex items-center gap-2 font-sans text-[13px] leading-[1.45] text-black/50";

const errorClass =
  "font-sans text-[14px] leading-[1.5] text-red-700 md:text-[15px]";

/** Public Formspree form id — override via NEXT_PUBLIC_FORMSPREE_FORM_ID if needed. */
const FORMSPREE_FORM_ID =
  process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID?.trim() || "mykqbbye";

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

export default function NewClientContactForm() {
  const [state, handleSubmit] = useForm(FORMSPREE_FORM_ID);

  if (state.succeeded) {
    return (
      <div className={cardClass}>
        <p className={frxSectionBodyClass}>
          Thanks — your message was sent. I&apos;ll get back to you soon.
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

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-6">
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
              disabled={state.submitting}
            />
            <ValidationError
              prefix="Name"
              field="name"
              errors={state.errors}
              className={errorClass}
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
              disabled={state.submitting}
            />
            <ValidationError
              prefix="Email"
              field="email"
              errors={state.errors}
              className={errorClass}
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
            disabled={state.submitting}
          />
          <ValidationError
            prefix="Company"
            field="company"
            errors={state.errors}
            className={errorClass}
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
            disabled={state.submitting}
          />
          <ValidationError
            prefix="Message"
            field="message"
            errors={state.errors}
            className={errorClass}
          />
        </label>

        <ValidationError errors={state.errors} className={errorClass} />

        <div className="flex flex-col gap-3">
          <button
            type="submit"
            disabled={state.submitting}
            className={`inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl px-6 font-sans text-[16px] font-semibold leading-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/25 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto ${PRIMARY_FILLED_INTERACTIVE}`}
          >
            <SendIcon />
            <span>{state.submitting ? "Sending…" : "Send message"}</span>
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
