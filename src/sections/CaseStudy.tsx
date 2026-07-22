import Reveal from "../components/Reveal";

export default function CaseStudy() {
  return (
    <section
      id="caso"
      className="px-6 py-[14vh] md:px-10"
      style={{ background: "var(--color-bg-elevated)" }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 md:grid-cols-[1fr_1.5fr]">
          <Reveal className="text-center">
            <div className="font-display text-[clamp(80px,12vw,140px)] font-semibold leading-[1] tracking-[-0.04em] text-foreground">
              40<span className="font-medium text-brand-blue">%</span>
            </div>
            <p className="mx-auto mt-3 max-w-[240px] text-[14px] leading-[1.4] tracking-tight text-foreground/60">
              menos tiempo de preparación de quirófano
            </p>
          </Reveal>

          <Reveal delay={0.08} className="max-w-[600px]">
            <p className="font-display text-[clamp(22px,2.5vw,30px)] font-normal leading-[1.35] tracking-tight text-foreground">
              "El Hospital Italiano de Buenos Aires redujo 40% el tiempo de
              preparación de quirófano usando este sistema. Todos los reportes
              de uso de implantes son automáticamente compliant con ANMAT y
              HIPAA."
            </p>
            <p className="mt-5 text-[14px] text-foreground/60">
              — Caso real documentado en hospitales de Argentina
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.16}>
          <ul className="mt-12 flex flex-wrap justify-center gap-x-10 gap-y-4 border-t border-white/10 pt-8">
            <li className="text-[14px] text-foreground/75">
              <strong className="font-display block text-[28px] font-semibold text-foreground">
                99%
              </strong>
              precisión de inventario
            </li>
            <li className="text-[14px] text-foreground/75">
              <strong className="font-display block text-[28px] font-semibold text-foreground">
                5s
              </strong>
              escaneo completo
            </li>
            <li className="text-[14px] text-foreground/75">
              <strong className="font-display block text-[28px] font-semibold text-foreground">
                400
              </strong>
              ítems en simultáneo
            </li>
            <li className="text-[14px] text-foreground/75">
              <strong className="font-display block text-[28px] font-semibold text-foreground">
                IP54
              </strong>
              certificación ambiental
            </li>
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
