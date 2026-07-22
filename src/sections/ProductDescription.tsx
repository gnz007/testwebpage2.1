import Reveal from "../components/Reveal";

export default function ProductDescription() {
  return (
    <section id="producto" className="px-6 py-[14vh] md:px-10">
      <div className="mx-auto max-w-[760px] text-center">
        <Reveal>
          <p className="mb-5 text-[12px] font-semibold uppercase tracking-[0.18em] text-signal-blue">
            Inteligencia estéril. Cero compromisos.
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="font-display text-[clamp(32px,5vw,52px)] font-semibold leading-[1.1] tracking-[-0.02em] text-foreground">
            Cada ítem trazado, cada escaneo confiable.
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <hr className="mx-auto mt-6 h-[2px] w-[60px] border-0 bg-brand-blue" />
        </Reveal>
        <Reveal delay={0.24}>
          <p className="mt-7 text-[clamp(18px,2vw,22px)] font-light leading-[1.5] text-foreground/75">
            El gabinete Cykeo mantiene los consumibles quirúrgicos bajo llave,
            registrados y fáciles de rastrear. Doble cámara más RFID maneja
            400 ítems con precisión del 99%, reduciendo horas de personal y
            errores. Funciona en salas estériles, compatible con Windows y
            Android, y cumple los requisitos de auditoría ANMAT y FDA.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
