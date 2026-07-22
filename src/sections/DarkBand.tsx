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
      className="relative overflow-hidden px-6 py-[16vh]"
      style={{ background: "#06080f" }}
    >
      <img
        ref={imgRef}
        src="/assets/dark-band.png"
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-30 will-change-transform"
        aria-hidden="true"
        loading="lazy"
      />
      <div className="relative z-10 mx-auto max-w-[760px] text-center">
        <Reveal>
          <h2 className="font-display text-[clamp(36px,6vw,64px)] font-light leading-[1.1] tracking-[-0.02em] text-white">
            Cada escaneo, trazado.
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <hr className="mx-auto mt-6 h-[2px] w-[60px] border-0 bg-signal-blue" />
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mx-auto mt-7 max-w-[620px] text-[clamp(19px,2.2vw,24px)] font-light leading-[1.24] text-white/82">
            Conectividad WiFi y 4G mantiene alertas en vivo. Siempre sabés qué
            entra y qué sale, sin demoras, sin ítems perdidos. Control directo,
            sin complicaciones.
          </p>
        </Reveal>
        <Reveal delay={0.24}>
          <a
            href="#contacto"
            className="mt-10 inline-flex items-center gap-2 rounded-[980px] border border-white/20 bg-white/5 px-7 py-3 text-[16px] font-normal text-white backdrop-blur-md transition-all hover:bg-white/10"
          >
            Solicitar demo
          </a>
        </Reveal>
      </div>
    </section>
  );
}
