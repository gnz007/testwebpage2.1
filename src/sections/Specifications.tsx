import Reveal from "../components/Reveal";

const SPECS = [
  { value: "21.5″", label: "Pantalla táctil capacitiva", body: "HD multitouch con Windows o Android. Control total del inventario a la vista, escaneos completos en segundos." },
  { value: "400", label: "Capacidad de ítems", body: "Hasta 400 piezas trazadas en simultáneo con precisión superior al 99%, incluso a través de puertas de vidrio." },
  { value: "≤5s", label: "Velocidad de escaneo", body: "Escaneo completo del gabinete en 5 segundos, 1.000 tags por minuto. Rotación de quirófano sin demoras." },
  { value: "IP54", label: "Certificación ambiental", body: "Resistente a polvo y agua. Soporta lavado de descontaminación estándar en quirófanos argentinos." },
  { value: "200kg", label: "Carga máxima", body: "Chasis de acero al carbona de 1.2mm. Construido para uso intensivo en ambientes hospitalarios exigentes." },
  { value: "840-960", label: "Rango de frecuencia (MHz)", body: "Cobertura UHF global. Compatible con estándares EPC C1G2 e ISO 18000-6C para tags de cualquier proveedor." },
];

export default function Specifications() {
  return (
    <section
      id="especificaciones"
      className="px-[22px] py-[clamp(80px,12vh,140px)]"
      style={{ background: "var(--color-canvas-elevated)" }}
    >
      <div className="mx-auto max-w-[1440px]">
        <Reveal className="mb-16 text-center">
          <h2 className="font-display font-semibold text-ink" style={{ fontSize: "clamp(32px,5vw,48px)", lineHeight: 1.14, letterSpacing: "0.44px", textWrap: "balance" }}>
            Especificaciones técnicas
          </h2>
          <span className="mx-auto mt-6 block h-[2px] w-[60px] bg-apple-blue" />
          <p className="mx-auto mt-5 max-w-[560px] text-[16px] leading-[1.5] text-smoke">
            Ingeniería de precisión para entornos hospitalarios exigentes.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SPECS.map((s, i) => (
            <Reveal
              key={s.label}
              delay={(i % 3) * 0.08}
              className="rounded-[8px] p-8 transition-all hover:-translate-y-1"
              style={{ background: "var(--color-surface)", border: "1px solid var(--color-hairline)" }}
            >
              <div className="font-display mb-1 text-[clamp(28px,4vw,40px)] font-semibold leading-[1.1] text-ink" style={{ letterSpacing: "0.44px" }}>
                {s.value}
              </div>
              <div className="mb-4 text-[12px] text-ash" style={{ letterSpacing: "-0.224px" }}>
                {s.label}
              </div>
              <p className="text-[14px] leading-[1.5] text-smoke">
                {s.body}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mt-10 text-center text-[12px] text-ash">
            El rendimiento del producto se basa en pruebas en ambiente
            controlado. Según el entorno, los resultados pueden variar.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
