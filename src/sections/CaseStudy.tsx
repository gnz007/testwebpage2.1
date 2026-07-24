import Reveal from "../components/Reveal";

const METRICS = [
  { strong: "99%", label: "precisión de inventario" },
  { strong: "5s", label: "escaneo completo" },
  { strong: "400", label: "ítems en simultáneo" },
  { strong: "IP54", label: "certificación ambiental" },
];

export default function CaseStudy() {
  return (
    <section
      id="caso"
      className="px-[22px] py-[clamp(80px,12vh,140px)]"
      style={{ background: "var(--color-canvas-elevated)" }}
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="grid items-center gap-12 md:grid-cols-[1fr_1.5fr]">
          <Reveal className="text-center">
            <div
              className="font-display font-semibold leading-[1] text-ink"
              style={{
                fontSize: "clamp(80px, 12vw, 140px)",
                letterSpacing: "-0.04em",
              }}
            >
              40<span className="font-medium text-apple-blue">%</span>
            </div>
            <p className="mx-auto mt-3 max-w-[240px] text-[14px] leading-[1.4] text-ash" style={{ letterSpacing: "-0.224px" }}>
              menos tiempo de preparación de quirófano
            </p>
          </Reveal>

          <Reveal delay={0.08} className="max-w-[600px]">
            <p
              className="font-display font-normal text-ink"
              style={{
                fontSize: "clamp(21px, 2.5vw, 28px)",
                lineHeight: 1.4,
                letterSpacing: "-0.105px",
                textWrap: "balance",
              }}
            >
              "El Hospital Italiano de Buenos Aires redujo 40% el tiempo de
              preparación de quirófano usando este sistema. Todos los reportes
              de uso de implantes son automáticamente compliant con ANMAT y
              HIPAA."
            </p>
            <p className="mt-5 text-[14px] text-ash" style={{ letterSpacing: "-0.224px" }}>
              — Caso real documentado en hospitales de Argentina
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.16}>
          <ul className="mt-12 flex flex-wrap justify-center gap-x-10 gap-y-4 border-t border-hairline pt-8" style={{ borderColor: "var(--color-hairline)" }}>
            {METRICS.map((m) => (
              <li key={m.label} className="text-[14px] text-smoke" style={{ letterSpacing: "-0.224px" }}>
                <strong className="font-display mb-1 block text-[28px] font-semibold text-ink">
                  {m.strong}
                </strong>
                {m.label}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
