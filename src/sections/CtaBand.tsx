import Reveal from "../components/Reveal";

export default function CtaBand() {
  return (
    <section
      className="px-[22px] py-[clamp(80px,12vh,140px)]"
      style={{ background: "var(--color-canvas-elevated)" }}
    >
      <div className="mx-auto max-w-[980px] text-center">
        <Reveal>
          <h2 className="font-display font-semibold text-ink" style={{ fontSize: "clamp(32px,5vw,48px)", lineHeight: 1.14, letterSpacing: "0.44px", textWrap: "balance" }}>
            ¿Necesitás una solución a medida?
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-5 font-light text-smoke" style={{ fontSize: "clamp(17px,2vw,21px)", lineHeight: 1.5 }}>
            Enviá tus requisitos y datos de contacto válidos. Nuestros
            ingenieros entregan una solución personalizada en 24 horas.
          </p>
        </Reveal>
        <Reveal delay={0.16}>
          <a
            href="#contacto"
            className="mt-9 inline-flex items-center gap-2 rounded-[980px] bg-apple-blue px-[22px] py-[11px] text-[17px] font-normal text-white transition-all hover:bg-apple-blue-hover active:scale-[0.98]"
          >
            Solicitar demo
            <span className="ml-1 flex h-7 w-7 items-center justify-center rounded-full bg-white/22">
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
