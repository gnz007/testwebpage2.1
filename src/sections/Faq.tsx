import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Reveal from "../components/Reveal";

const FAQS = [
  {
    q: "¿Cómo simplifica la pantalla táctil el flujo de trabajo quirúrgico?",
    a: "La pantalla de 21.5″ funciona como centro de control. Escaneos completos de inventario en segundos. Packs vencidos resaltan en rojo en pantalla. Se pueden asignar ítems a cirujanos específicos arrastrándolos con sus credenciales RFID. El Hospital Italiano de Buenos Aires redujo 40% el tiempo de preparación de quirófano usando este sistema, y todos los reportes de uso de implantes son automáticamente compliant con ANMAT y HIPAA.",
  },
  {
    q: "¿Puede rastrear implantes metálicos a través de las puertas de vidrio?",
    a: "Sí. Las antenas están calibradas para leer a través de 12mm de vidrio, combinadas con tags RFID anti-metal específicos para implantes de titanio. El boost de señal se activa cuando las puertas detectan proximidad. Hospitales reportan 99%+ de precisión incluso escaneando cientos de implantes sin abrir el gabinete.",
  },
  {
    q: "¿Cómo funciona el compliance con ANMAT y FDA 21 CFR Part 11?",
    a: "Todo está en capas. Los escaneos biométricos mantienen fuera al personal no autorizado, cada acción queda registrada en memoria cifrada, y la información del paciente se enmascara automáticamente en reportes exportados. Una clínica en Buenos Aires pasó una auditoría ANMAT sin observaciones usando este sistema, con cero violaciones de trazabilidad.",
  },
];

function FaqItem({
  faq,
  open,
  onToggle,
}: {
  faq: { q: string; a: string };
  open: boolean;
  onToggle: () => void;
}) {
  const reduce = useReducedMotion();
  return (
    <div style={{ borderBottom: "1px solid var(--color-hairline)" }}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 py-6 text-left font-display text-[21px] font-normal leading-[1.24] text-ink"
        style={{ letterSpacing: "-0.105px" }}
      >
        <span>{faq.q}</span>
        <svg
          className="h-5 w-5 shrink-0 text-link-blue transition-transform duration-300"
          style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 5v14M5 12h14" />
        </svg>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-7 text-[17px] leading-[1.5] text-smoke max-w-[72ch]">
              {faq.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Faq() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  return (
    <section className="px-[22px] py-[clamp(80px,12vh,140px)]">
      <div className="mx-auto max-w-[980px]">
        <Reveal className="mb-16 text-center">
          <h2 className="font-display font-semibold text-ink" style={{ fontSize: "clamp(32px,5vw,48px)", lineHeight: 1.14, letterSpacing: "0.44px", textWrap: "balance" }}>
            Preguntas frecuentes
          </h2>
          <span className="mx-auto mt-6 block h-[2px] w-[60px] bg-apple-blue" />
        </Reveal>

        <Reveal>
          <div>
            {FAQS.map((f, i) => (
              <FaqItem
                key={f.q}
                faq={f}
                open={openIdx === i}
                onToggle={() => setOpenIdx(openIdx === i ? null : i)}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
