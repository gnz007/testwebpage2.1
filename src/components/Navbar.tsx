import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { List, X } from "@phosphor-icons/react";

const NAV_LINKS = [
  { href: "#producto", label: "Producto" },
  { href: "#caracteristicas", label: "Características" },
  { href: "#caso", label: "Caso real" },
  { href: "#especificaciones", label: "Especificaciones" },
  { href: "#contacto", label: "Contacto" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
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
    <header
      className={`sticky top-0 z-[100] transition-colors duration-300`}
      style={{
        backgroundColor: scrolled ? "color-mix(in srgb, #f5f5f7 72%, transparent)" : "transparent",
        backdropFilter: scrolled ? "saturate(180%) blur(20px)" : undefined,
        WebkitBackdropFilter: scrolled ? "saturate(180%) blur(20px)" : undefined,
        borderBottom: scrolled ? "1px solid var(--color-hairline)" : "1px solid transparent",
      }}
    >
      <nav
        className="mx-auto flex h-[60px] max-w-[1440px] items-center justify-between gap-4 px-[22px]"
        aria-label="Navegación principal"
      >
        {/* Logo */}
        <a href="#top" className="flex items-center" aria-label="Cykeo Argentina — Inicio">
          <img src="/logo.svg" alt="Cykeo Argentina" width={112} height={28} className="h-7 w-auto" />
        </a>

        {/* Center — nav links */}
        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[14px] font-normal text-ink opacity-[0.88] transition-colors hover:text-link-blue"
              style={{ letterSpacing: "-0.224px" }}
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Right — actions */}
        <div className="flex items-center gap-3">
          <a
            href="#contacto"
            className="hidden rounded-[980px] bg-apple-blue px-[18px] py-[8px] text-[14px] font-normal text-white transition-colors hover:bg-apple-blue-hover sm:inline-flex"
          >
            Solicitar demo
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            className="flex h-9 w-9 items-center justify-center rounded-full text-ink transition-colors hover:bg-surface-hover md:hidden"
          >
            <motion.span animate={{ opacity: open ? 0 : 1 }} transition={{ duration: reduce ? 0 : 0.2 }} className="absolute">
              <List size={20} weight="regular" />
            </motion.span>
            <motion.span animate={{ opacity: open ? 1 : 0 }} transition={{ duration: reduce ? 0 : 0.2 }} className="absolute">
              <X size={20} weight="regular" />
            </motion.span>
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: reduce ? 0 : 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden"
            style={{ backgroundColor: "#f5f5f7" }}
          >
            <nav className="flex flex-col gap-1 px-[22px] py-4" aria-label="Navegación móvil">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 text-[15px] text-ink transition-colors hover:bg-surface-hover"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#contacto"
                onClick={() => setOpen(false)}
                className="mt-3 inline-flex items-center justify-center rounded-[980px] bg-apple-blue px-5 py-3 text-[14px] font-medium text-white"
              >
                Solicitar demo →
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
