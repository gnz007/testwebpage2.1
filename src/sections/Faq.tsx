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
    <div className="border-b border-white/10">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 py-6 text-left font-display text-[21px] font-normal leading-[1.24] tracking-tight text-foreground"
      >
        <span>{faq.q}</span>
        <svg
          className="h-5 w-5 flex-shrink-0 text-brand-blue transition-transform duration-300"
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
            transition={{
              duration: reduce ? 0 : 0.4,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="overflow-hidden"
          >
            <div className="pb-7 text-[17px] leading-[1.5] text-foreground/75 max-w-[72ch]">
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
    <section className="px-6 py-[14vh] md:px-10">
      <div className="mx-auto max-w-[760px]">
        <Reveal className="mb-12 text-center">
          <h2 className="font-display text-[clamp(32px,5vw,48px)] font-semibold leading-[1.1] tracking-[-0.02em] text-foreground">
            Preguntas frecuentes
          </h2>
          <hr className="mx-auto mt-6 h-[2px] w-[60px] border-0 bg-brand-blue" />
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
