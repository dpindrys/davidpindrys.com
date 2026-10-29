export default function Footer() {
  return (
    <footer className="w-full px-6 md:px-10">
      <div className="mx-auto flex w-full max-w-[1040px] flex-col gap-3 border-t border-black/10 py-8 font-sans text-[13px] text-black/55 sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 David Pindrys · Senior Product Designer · Boston, USA</p>
        <a href="#top" className="transition-colors hover:text-black">
          Back to top <span aria-hidden>↑</span>
        </a>
      </div>
    </footer>
  );
}
