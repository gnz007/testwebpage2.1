import { useEffect, useRef } from "react";
import Reveal from "../components/Reveal";

export default function DarkBand() {
  const imgRef = useRef<HTMLImageElement>(null);
  const bandRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const img = imgRef.current;
    const band = bandRef.current;
    if (!img || !band) return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const rect = band.getBoundingClientRect();
        if (rect.bottom > 0 && rect.top < window.innerHeight) {
          const offset = (window.innerHeight - rect.top) * 0.15;
          img.style.transform = `translateY(${offset}px) scale(1.1)`;
        }
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={bandRef}
      className="relative overflow-hidden px-[22px] py-[clamp(100px,16vh,160px)]"
      style={{ background: "#1d1d1f", color: "#ffffff" }}
    >
      <img
        ref={imgRef}
        src="/assets/dark-band.png"
        alt=""
        className="absolute inset-0 z-0 h-full w-full object-cover will-change-transform"
        style={{ opacity: 0.35 }}
        aria-hidden="true"
        loading="lazy"
      />
      <div className="relative z-10 mx-auto max-w-[980px] text-center">
        <Reveal>
          <h2 className="font-display font-light leading-[1.1] text-white" style={{ fontSize: "clamp(36px,6vw,64px)", letterSpacing: "-0.02em" }}>
            Cada escaneo, trazado.
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <span className="mx-auto mt-6 block h-[2px] w-[60px]" style={{ background: "var(--color-signal-blue)" }} />
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mx-auto mt-7 max-w-[620px] font-light text-white/82" style={{ fontSize: "clamp(19px,2.2vw,24px)", lineHeight: 1.24 }}>
            Conectividad WiFi y 4G mantiene alertas en vivo. Siempre sabés qué
            entra y qué sale, sin demoras, sin ítems perdidos. Control directo,
            sin complicaciones.
          </p>
        </Reveal>
        <Reveal delay={0.24}>
          <a
            href="#contacto"
            className="mt-10 inline-flex items-center gap-2 rounded-[980px] px-7 py-3 text-[16px] font-normal text-white backdrop-blur-md transition-all hover:bg-white/10"
            style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.3)" }}
          >
            Solicitar demo
          </a>
        </Reveal>
      </div>
    </section>
  );
}
