import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { List, X } from "@phosphor-icons/react";

const NAV_LINKS = [
  { href: "#producto", label: "producto" },
  { href: "#caracteristicas", label: "características" },
  { href: "#caso", label: "caso real" },
  { href: "#especificaciones", label: "especificaciones" },
  { href: "#contacto", label: "contacto" },
];

function RfidGlyph() {
  return (
    <svg
      viewBox="0 0 64 64"
      className="h-7 w-7"
      fill="none"
      aria-label="Cykeo"
    >
      <rect x="0" y="0" width="64" height="64" rx="14" fill="#0071e3" />
      <g
        stroke="#ffffff"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        transform="translate(32, 38)"
      >
        <path d="M -10 0 A 10 10 0 0 1 10 0" opacity="0.95" />
        <path d="M -16 0 A 16 16 0 0 1 16 0" opacity="0.7" />
        <path d="M -22 0 A 22 22 0 0 1 22 0" opacity="0.45" />
      </g>
      <circle cx="32" cy="38" r="3" fill="#ffffff" />
    </svg>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div
      className={`w-full px-8 pt-5 transition-all ${
        scrolled ? "bg-bg/80 backdrop-blur-md" : ""
      }`}
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between"
        aria-label="Navegación principal"
      >
        {/* Left — brand */}
        <a
          href="#top"
          className="flex items-center gap-2"
          aria-label="Cykeo Argentina — Inicio"
        >
          <RfidGlyph />
          <span className="font-display text-[19px] font-semibold tracking-tight text-foreground">
            Cykeo
          </span>
          <span className="hidden text-[10px] font-medium uppercase tracking-[0.18em] text-brand-blue sm:inline">
            Argentina
          </span>
        </a>

        {/* Center — nav links */}
        <div className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[13px] font-normal lowercase tracking-tight text-foreground/80 transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Right — actions */}
        <div className="flex items-center gap-3">
          <a
            href="mailto:ventas@cykeo.com.ar"
            className="hidden text-[13px] lowercase tracking-tight text-foreground/70 transition-colors hover:text-foreground lg:inline"
          >
            hablar con ventas
          </a>
          <a
            href="#contacto"
            className="hidden rounded-full bg-brand-blue px-5 py-2 text-[13px] font-medium text-white transition-all hover:bg-brand-blue-hover hover:shadow-[0_8px_24px_-8px_rgba(0,113,227,0.6)] active:scale-95 sm:inline-flex"
          >
            solicitar demo →
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            className="relative flex h-9 w-9 items-center justify-center rounded-full text-foreground transition-colors hover:bg-foreground/5 md:hidden"
          >
            <motion.span
              animate={{ opacity: open ? 0 : 1 }}
              transition={{ duration: reduce ? 0 : 0.2 }}
              className="absolute"
            >
              <List size={20} weight="regular" />
            </motion.span>
            <motion.span
              animate={{ opacity: open ? 1 : 0 }}
              transition={{ duration: reduce ? 0 : 0.2 }}
              className="absolute"
            >
              <X size={20} weight="regular" />
            </motion.span>
          </button>
        </div>
      </nav>

      {/* Divider line — gradient */}
      <div
        className="mt-[3px] h-px w-full"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(255, 255, 255, 0.15), transparent)",
        }}
        aria-hidden="true"
      />

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{
              duration: reduce ? 0 : 0.25,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="md:hidden"
          >
            <nav
              className="flex flex-col gap-1 py-4"
              aria-label="Navegación móvil"
            >
              {NAV_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 text-[15px] lowercase tracking-tight text-foreground transition-colors hover:bg-foreground/5"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#contacto"
                onClick={() => setOpen(false)}
                className="mt-3 inline-flex items-center justify-center rounded-full bg-brand-blue px-5 py-3 text-[14px] font-medium text-white"
              >
                solicitar demo →
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
