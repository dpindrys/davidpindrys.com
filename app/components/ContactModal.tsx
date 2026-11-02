"use client";

import { useForm, ValidationError } from "@formspree/react";
import {
  createContext,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";
import { createPortal } from "react-dom";

const FORMSPREE_FORM_ID = process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID?.trim() || "mykqbbye";

const labelClass = "font-sans text-[13px] font-medium leading-none text-black/70";
const inputClass =
  "w-full border border-black/15 bg-white px-4 py-3 font-sans text-[16px] leading-normal text-black outline-none placeholder:text-black/35 focus-visible:border-black disabled:cursor-not-allowed disabled:opacity-60";
const errorClass = "font-sans text-[14px] leading-[1.5] text-red-700";

const primaryButtonClass =
  "inline-flex items-center bg-[#D8EF7A] px-5 py-3.5 font-sans text-[15px] font-medium text-black transition-colors hover:bg-[#CBE35F] disabled:cursor-not-allowed disabled:opacity-60";

const navButtonClass =
  "inline-flex items-center bg-[#1F2621] px-4 py-2.5 font-sans text-[14px] font-medium leading-none text-[#F4F2EE] transition-colors hover:bg-[#2A332C]";

type OpenContact = (opener: HTMLElement | null) => void;

const ContactContext = createContext<OpenContact>(() => {});

function getFocusable(root: HTMLElement) {
  return [...root.querySelectorAll<HTMLElement>("a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled])")].filter(
    (el) => !el.closest("[hidden]") && el.tabIndex !== -1,
  );
}

function ContactForm() {
  const [state, handleSubmit] = useForm(FORMSPREE_FORM_ID);
  const statusRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (state.succeeded) statusRef.current?.focus();
  }, [state.succeeded]);

  if (state.succeeded) {
    return (
      <p
        ref={statusRef}
        tabIndex={-1}
        role="status"
        className="mt-6 font-sans text-[16px] leading-[1.55] text-black outline-none"
      >
        Thanks. Your message was sent.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} autoComplete="on" name="contact" className="mt-6 flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <label htmlFor="contact-name" className="flex flex-col gap-2">
          <span className={labelClass}>Name</span>
          <input
            id="contact-name"
            type="text"
            name="name"
            required
            autoComplete="name"
            autoCapitalize="words"
            className={inputClass}
            placeholder="What should I call you?"
            disabled={state.submitting}
          />
          <ValidationError prefix="Name" field="name" errors={state.errors} className={errorClass} />
        </label>
        <label htmlFor="contact-email" className="flex flex-col gap-2">
          <span className={labelClass}>Email</span>
          <input
            id="contact-email"
            type="email"
            name="email"
            required
            autoComplete="email"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            inputMode="email"
            className={inputClass}
            placeholder="Where can I reply?"
            disabled={state.submitting}
          />
          <ValidationError prefix="Email" field="email" errors={state.errors} className={errorClass} />
        </label>
      </div>

      <label htmlFor="contact-company" className="flex flex-col gap-2">
        <span className={labelClass}>Company (optional)</span>
        <input
          id="contact-company"
          type="text"
          name="company"
          autoComplete="organization"
          className={inputClass}
          placeholder="Where do you work? Skip if it's personal."
          disabled={state.submitting}
        />
        <ValidationError prefix="Company" field="company" errors={state.errors} className={errorClass} />
      </label>

      <label htmlFor="contact-message" className="flex flex-col gap-2">
        <span className={labelClass}>Message</span>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          autoComplete="off"
          className={`${inputClass} min-h-[140px] resize-y`}
          placeholder="What's on your mind? A workflow, a prototype, a question, anything."
          disabled={state.submitting}
        />
        <ValidationError prefix="Message" field="message" errors={state.errors} className={errorClass} />
      </label>

      <ValidationError errors={state.errors} className={errorClass} />

      <div className="flex flex-col items-start gap-3">
        <button type="submit" disabled={state.submitting} className={primaryButtonClass}>
          {state.submitting ? "Sending…" : "Send it"}
        </button>
        <p className="font-sans text-[13px] leading-[1.45] text-black/55">I won&apos;t share this with anyone.</p>
      </div>
    </form>
  );
}

function ContactDialog({
  open,
  onClose,
  openerRef,
}: {
  open: boolean;
  onClose: () => void;
  openerRef: RefObject<HTMLElement | null>;
}) {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const opener = openerRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const frame = requestAnimationFrame(() => {
      document.getElementById("contact-name")?.focus();
    });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab") return;
      const dialog = dialogRef.current;
      if (!dialog) return;
      const focusable = getFocusable(dialog);
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;
      if (event.shiftKey && (active === first || !dialog.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      opener?.focus();
    };
  }, [open, onClose, openerRef]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 z-[130] flex items-end justify-center p-3 sm:items-center sm:p-6">
      <div className="absolute inset-0 bg-black/45" onClick={onClose} />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative max-h-[min(92vh,760px)] w-full max-w-[36rem] overflow-y-auto bg-[#F4F2EE] p-5 shadow-[0_24px_80px_-32px_rgba(0,0,0,0.45)] sm:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <h2
            id={titleId}
            className="font-sans text-[clamp(1.5rem,3vw,2rem)] font-normal leading-[1.15] tracking-[-0.03em] text-black"
          >
            Tell me what you&apos;re working on
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-11 w-11 shrink-0 items-center justify-center bg-transparent font-sans text-[20px] leading-none text-black/70 hover:text-black"
          >
            <span aria-hidden>×</span>
          </button>
        </div>
        <ContactForm />
      </div>
    </div>,
    document.body,
  );
}

export function ContactProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const openerRef = useRef<HTMLElement | null>(null);

  const openContact: OpenContact = (opener) => {
    openerRef.current = opener;
    setOpen(true);
  };

  return (
    <ContactContext.Provider value={openContact}>
      <div inert={open ? true : undefined}>{children}</div>
      <ContactDialog open={open} onClose={() => setOpen(false)} openerRef={openerRef} />
    </ContactContext.Provider>
  );
}

export function TalkButton({
  children,
  variant = "primary",
  className = "",
}: {
  children: ReactNode;
  variant?: "primary" | "nav";
  className?: string;
}) {
  const openContact = useContext(ContactContext);
  return (
    <button
      type="button"
      className={`${variant === "nav" ? navButtonClass : primaryButtonClass} ${className}`}
      onClick={(event) => openContact(event.currentTarget)}
    >
      {children}
    </button>
  );
}
