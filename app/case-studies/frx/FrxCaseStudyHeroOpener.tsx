"use client";

import {
  useCallback,
  useRef,
  useState,
  type ComponentType,
  type ReactNode,
  type RefObject,
} from "react";

type FrxCaseStudyModalProps = {
  onClose: () => void;
  openerRef: RefObject<HTMLButtonElement | null>;
};

const heroLinkClass =
  "block w-full cursor-pointer rounded-[12px] border-0 bg-transparent p-0 text-left outline-none focus-visible:ring-2 focus-visible:ring-black/25 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F4F2EE]";

export default function FrxCaseStudyHeroOpener({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  const openerRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [Modal, setModal] = useState<ComponentType<FrxCaseStudyModalProps> | null>(
    null,
  );
  const [loading, setLoading] = useState(false);

  const openModal = useCallback(async () => {
    if (!Modal && !loading) {
      setLoading(true);
      try {
        const mod = await import("./FrxCaseStudyModal");
        setModal(() => mod.default);
      } finally {
        setLoading(false);
      }
    }
    setOpen(true);
  }, [Modal, loading]);

  return (
    <>
      <button
        ref={openerRef}
        type="button"
        aria-label={label}
        aria-haspopup="dialog"
        aria-expanded={open}
        className={heroLinkClass}
        onClick={() => {
          void openModal();
        }}
      >
        {children}
      </button>
      {open && Modal ? (
        <Modal onClose={() => setOpen(false)} openerRef={openerRef} />
      ) : null}
    </>
  );
}