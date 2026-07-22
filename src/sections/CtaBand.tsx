import Reveal from "../components/Reveal";

export default function CtaBand() {
  return (
    <section
      className="px-6 py-[14vh] md:px-10"
      style={{ background: "var(--color-bg-elevated)" }}
    >
      <div className="mx-auto max-w-[760px] text-center">
        <Reveal>
          <h2 className="font-display text-[clamp(32px,5vw,48px)] font-semibold leading-[1.1] tracking-[-0.02em] text-foreground">
            ¿Necesitás una solución a medida?
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-5 text-[clamp(18px,2vw,22px)] font-light leading-[1.5] text-foreground/75">
            Enviá tus requisitos y datos de contacto válidos. Nuestros
            ingenieros entregan una solución personalizada en 24 horas.
          </p>
        </Reveal>
        <Reveal delay={0.16}>
          <a
            href="#contacto"
            className="mt-9 inline-flex items-center gap-2 rounded-[980px] bg-brand-blue px-7 py-3 text-[17px] text-white transition-all hover:bg-brand-blue-hover hover:shadow-[0_12px_32px_-8px_rgba(0,113,227,0.6)] active:scale-[0.98]"
          >
            Solicitar demo
            <svg
              className="h-3.5 w-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
