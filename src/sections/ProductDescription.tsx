import Reveal from "../components/Reveal";

export default function ProductDescription() {
  return (
    <section id="producto" className="px-[22px] pt-[clamp(80px,12vh,140px)]">
      <div className="mx-auto max-w-[980px] text-center">
        <Reveal>
          <p
            className="mb-5 text-[clamp(12px,1.5vw,14px)] font-semibold uppercase text-apple-blue"
            style={{ letterSpacing: "0.08em" }}
          >
            Inteligencia estéril. Cero compromisos.
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2
            className="font-display font-semibold text-ink"
            style={{
              fontSize: "clamp(32px, 5vw, 48px)",
              lineHeight: 1.14,
              letterSpacing: "0.44px",
              textWrap: "balance",
            }}
          >
            Cada ítem trazado, cada escaneo confiable.
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <span className="mx-auto mt-6 block h-[2px] w-[60px] bg-apple-blue" />
        </Reveal>
        <Reveal delay={0.24}>
          <p
            className="mx-auto mt-7 max-w-[720px] font-light text-smoke"
            style={{ fontSize: "clamp(17px, 2vw, 21px)", lineHeight: 1.5 }}
          >
            El gabinete Cykeo mantiene los consumibles quirúrgicos bajo llave,
            registrados y fáciles de rastrear. Doble cámara más RFID maneja 400
            ítems con precisión del 99%, reduciendo horas de personal y errores.
            Funciona en salas estériles, compatible con Windows y Android, y
            cumple los requisitos de auditoría ANMAT y FDA.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
