import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "@phosphor-icons/react";
import Navbar from "./Navbar";

const VIDEO_URL = "/assets/hero-bg.mp4";
const VIDEO_POSTER = "/assets/hero-cabinet.png";

const BULLETS = [
  "Compliance ANMAT y FDA 21 CFR Part 11",
  "Pantalla táctil HD 21.5″ (Windows / Android)",
  "Acceso por RFID, huella o reconocimiento facial",
];

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

    // Pausa el video cuando sale del viewport (performance + bateria)
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              video.play().catch(() => {});
            } else {
              video.pause();
            }
          });
        },
        { threshold: 0.05 }
      );
      io.observe(video);
      return () => io.disconnect();
    }
  }, [videoRef]);
}

function RfidPulse() {
  return (
    <div className="pointer-events-none absolute left-1/2 top-[40%] z-[2] -translate-x-1/2 -translate-y-1/2">
      <span className="rfid-pulse-ring absolute left-1/2 top-1/2 block h-[60px] w-[60px] -translate-x-1/2 -translate-y-1/2 scale-0 rounded-full border-2 border-apple-blue opacity-0" style={{ animation: "rfid-pulse 3s ease-out infinite" }} />
      <span className="rfid-pulse-ring absolute left-1/2 top-1/2 block h-[60px] w-[60px] -translate-x-1/2 -translate-y-1/2 scale-0 rounded-full border-2 border-apple-blue opacity-0" style={{ animation: "rfid-pulse 3s ease-out infinite", animationDelay: "1s" }} />
      <span className="rfid-pulse-ring absolute left-1/2 top-1/2 block h-[60px] w-[60px] -translate-x-1/2 -translate-y-1/2 scale-0 rounded-full border-2 border-apple-blue opacity-0" style={{ animation: "rfid-pulse 3s ease-out infinite", animationDelay: "2s" }} />
    </div>
  );
}

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  useVideoFadeLoop(videoRef);
  const reduce = useReducedMotion();

  return (
    <section
      id="top"
      className="relative overflow-hidden bg-canvas"
      style={{ paddingTop: 60 }}
    >
      {/* Video de fondo del header hero */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster={VIDEO_POSTER}
        aria-hidden="true"
        className="absolute inset-0 z-[0] h-full w-full object-cover"
        style={{ opacity: reduce ? 1 : 0 }}
      >
        <source src={VIDEO_URL} type="video/mp4" />
      </video>

      {/* Overlay para legibilidad sobre el video (light tokens) */}
      <div
        className="pointer-events-none absolute inset-0 z-[0]"
        style={{
          background:
            "linear-gradient(180deg, color-mix(in srgb, #f5f5f7 55%, transparent) 0%, color-mix(in srgb, #f5f5f7 78%, transparent) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Mesh gradient sutil */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 600px 400px at 30% 30%, rgba(0,113,227,0.06), transparent 70%), radial-gradient(ellipse 500px 300px at 70% 60%, rgba(41,151,255,0.04), transparent 60%)",
        }}
      />

      {/* Nav */}
      <Navbar />

      {/* Hero inner — asimetrico: texto izq, imagen der dominante */}
      <div className="relative z-[2] mx-auto grid max-w-[1440px] items-center gap-12 px-[22px] pb-[clamp(40px,6vh,80px)] pt-[clamp(60px,10vh,100px)] md:grid-cols-2">
        {/* Columna izquierda: contenido */}
        <div className="max-w-[540px] md:text-left text-center">
          {/* Eyebrow */}
          <motion.p
            initial={reduce ? {} : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduce ? 0 : 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-5 text-[14px] font-normal text-ash"
            style={{ letterSpacing: "-0.01em" }}
          >
            Distribuido en Argentina · Sede en Buenos Aires
          </motion.p>

          {/* H1 */}
          <motion.h1
            initial={reduce ? {} : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0 : 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-semibold leading-[1.07] text-ink"
            style={{
              fontSize: "clamp(40px, 6vw, 64px)",
              letterSpacing: "-0.005em",
              textWrap: "balance",
            }}
          >
            Gabinete Médico RFID
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={reduce ? {} : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0 : 0.8, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 font-light text-smoke"
            style={{
              fontSize: "clamp(21px, 2.5vw, 28px)",
              lineHeight: 1.24,
              letterSpacing: "-0.105px",
            }}
          >
            Almacenamiento inteligente para activos médicos críticos.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={reduce ? {} : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0 : 0.8, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="mt-9 flex flex-wrap gap-4 md:justify-start justify-center"
          >
            <a
              href="#contacto"
              className="inline-flex items-center gap-2 rounded-[980px] bg-apple-blue px-[22px] py-[11px] text-[17px] font-normal text-white transition-all hover:bg-apple-blue-hover active:scale-[0.98]"
            >
              Solicitar demo
              <span className="ml-1 flex h-7 w-7 items-center justify-center rounded-full bg-white/22">
                <ArrowRight size={14} weight="bold" />
              </span>
            </a>
            <a
              href="#especificaciones"
              className="inline-flex items-center rounded-[980px] border border-link-blue px-[22px] py-[11px] text-[17px] font-normal text-link-blue transition-all hover:bg-[rgba(0,102,204,0.06)]"
            >
              Ver especificaciones
            </a>
          </motion.div>

          {/* Bullets de compliance */}
          <motion.ul
            initial={reduce ? {} : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0 : 0.8, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="mt-9 flex flex-wrap gap-x-8 gap-y-3 text-[14px] text-graphite md:justify-start justify-center"
          >
            {BULLETS.map((b) => (
              <li key={b} className="flex items-center gap-2">
                <svg className="h-4 w-4 shrink-0 text-apple-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12l5 5L20 7" />
                </svg>
                {b}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* Columna derecha: imagen del producto */}
        <motion.div
          initial={reduce ? {} : { opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.8, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
          className="relative order-[-1] flex justify-center items-center md:order-none"
        >
          <RfidPulse />
          <img
            src="/assets/hero-cabinet.png"
            alt="Gabinete médico RFID Cykeo con pantalla táctil de 21.5 pulgadas y puertas de vidrio"
            width={1024}
            height={1024}
            fetchPriority="high"
            className="relative z-[1] w-full max-w-[560px] rounded-[8px] object-cover"
            style={{ boxShadow: "rgba(0,0,0,0.22) 3px 5px 30px 0px" }}
          />
        </motion.div>
      </div>
    </section>
  );
}
