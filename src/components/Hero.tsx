import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "@phosphor-icons/react";
import Navbar from "./Navbar";
import Marquee from "./Marquee";

const VIDEO_URL = "/assets/ef98c909-4bd5-4e46-a797-af102557380d.mp4";

function useVideoFadeLoop(videoRef: React.RefObject<HTMLVideoElement | null>) {
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) {
      video.style.opacity = "1";
      return;
    }

    const FADE_DURATION = 500;
    let rafId = 0;
    let fadeStart = 0;
    let phase:
      | "idle"
      | "fade-in"
      | "playing"
      | "fade-out"
      | "paused-restart" = "idle";

    const tick = (now: number) => {
      if (!video) return;
      const elapsed = now - fadeStart;

      if (phase === "fade-in") {
        const t = Math.min(1, elapsed / FADE_DURATION);
        video.style.opacity = String(t);
        if (t >= 1) {
          phase = "playing";
          return;
        }
      } else if (phase === "fade-out") {
        const t = Math.max(0, 1 - elapsed / FADE_DURATION);
        video.style.opacity = String(t);
        if (t <= 0) {
          phase = "paused-restart";
          setTimeout(() => {
            if (!video) return;
            video.currentTime = 0;
            video.play().catch(() => {});
            fadeStart = performance.now();
            phase = "fade-in";
            rafId = requestAnimationFrame(tick);
          }, 100);
          return;
        }
      }
      rafId = requestAnimationFrame(tick);
    };

    const startFadeIn = () => {
      fadeStart = performance.now();
      phase = "fade-in";
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(tick);
    };

    const startFadeOut = () => {
      fadeStart = performance.now();
      phase = "fade-out";
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(tick);
    };

    video.style.opacity = "0";
    video.addEventListener("play", startFadeIn);
    video.addEventListener("ended", startFadeOut);

    video.play().catch(() => {
      video.style.opacity = "1";
    });

    return () => {
      cancelAnimationFrame(rafId);
      video.removeEventListener("play", startFadeIn);
      video.removeEventListener("ended", startFadeOut);
    };
  }, [videoRef]);
}

function HeroHeadline() {
  const reduce = useReducedMotion();
  return (
    <motion.h1
      initial={reduce ? {} : { opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: reduce ? 0 : 0.8,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="font-normal leading-[1.02] tracking-[-0.024em]"
      style={{
        fontFamily: '"General Sans", "Inter", ui-sans-serif, system-ui, sans-serif',
        fontSize: "clamp(64px, 12vw, 180px)",
      }}
    >
      <span className="block text-foreground">Gabinete</span>
      <span className="block">
        <span className="text-foreground">Médico </span>
        <span
          className="bg-clip-text text-transparent"
          style={{
            backgroundImage:
              "linear-gradient(to left, #0ea5e9, #0071e3, #fcd34d)",
          }}
        >
          RFID
        </span>
      </span>
    </motion.h1>
  );
}

function HeroSubAndCta() {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? {} : { opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: reduce ? 0 : 0.8,
        delay: 0.15,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="mt-6 flex flex-col items-center gap-7"
    >
      <p className="max-w-md text-[18px] leading-8 text-hero-sub opacity-80">
        Almacenamiento inteligente para activos médicos críticos, con
        trazabilidad total.
      </p>

      {/* Demo request pill */}
      <div className="flex items-center gap-2 rounded-[6px] border border-white/10 bg-white/5 p-1 pl-4 shadow-[0_2px_10px_-2px_rgba(0,0,0,0.4)] backdrop-blur-md">
        <input
          type="text"
          placeholder="Institución / hospital / farmacia..."
          className="w-[220px] bg-transparent py-2 text-[14px] text-foreground placeholder:text-foreground/40"
          aria-label="Institución para demo"
        />
        <button
          type="button"
          onClick={() => {
            const t = document.querySelector("#contacto");
            if (t) t.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-blue text-white transition-all hover:bg-brand-blue-hover hover:shadow-[0_8px_24px_-8px_rgba(0,113,227,0.7)] active:scale-95"
          aria-label="Solicitar demo"
        >
          <ArrowRight size={16} weight="bold" />
        </button>
      </div>

      {/* Compliance bullets */}
      <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13px] text-foreground/70">
        <li className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-blue" />
          Compliance ANMAT y FDA 21 CFR Part 11
        </li>
        <li className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-blue" />
          Pantalla táctil HD 21.5″
        </li>
        <li className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-blue" />
          Acceso por RFID, huella o reconocimiento facial
        </li>
      </ul>
    </motion.div>
  );
}

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  useVideoFadeLoop(videoRef);

  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col overflow-visible bg-bg"
    >
      {/* Background video layer */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop={false}
          muted
          playsInline
          className="h-full w-full object-cover"
          style={{ opacity: 0 }}
        >
          <source src={VIDEO_URL} type="video/mp4" />
        </video>
      </div>

      {/* Centered blurred overlay shape */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[984px] -translate-x-1/2 -translate-y-1/2 bg-gray-950 opacity-90"
        style={{ filter: "blur(82px)" }}
        aria-hidden="true"
      />

      {/* Content layer */}
      <div className="relative z-10 flex flex-1 flex-col">
        <Navbar />

        {/* Centered hero content */}
        <div className="flex flex-1 flex-col items-center justify-center px-8 pt-8 text-center">
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6 flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.18em] text-foreground/60"
          >
            <span className="h-1 w-1 rounded-full bg-brand-blue" />
            Distribuido en Argentina · Sede en Buenos Aires
          </motion.p>

          <HeroHeadline />
          <HeroSubAndCta />
        </div>

        {/* Marquee pinned bottom */}
        <div className="pb-10">
          <Marquee />
        </div>
      </div>
    </section>
  );
}
