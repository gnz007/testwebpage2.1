import Reveal from "../components/Reveal";

const BENTO = [
  {
    kind: "large-image",
    img: "/assets/scene-or.png",
    alt: "Quirófano con gabinete RFID Cykeo en uso",
    title: "Integración con flujo quirúrgico",
    desc: "Interfaces HL7 / FHIR sincronizan con Epic y Cerner para preparar kits por caso usando datos del EMR en tiempo real.",
  },
  {
    kind: "icon",
    iconKey: "scan",
    title: "Escaneo de alta densidad",
    desc: "Impinj R2000 identifica 800+ ítems por estante, 1.000 tags/min.",
  },
  {
    kind: "icon",
    iconKey: "auth",
    title: "Doble autenticación",
    desc: "Vena del dedo + RFID con auditoría, cumple FDA 21 CFR Part 11.",
  },
  {
    kind: "large-image",
    img: "/assets/scene-pharmacy.png",
    alt: "Farmacia hospitalaria con gabinete RFID",
    title: "Trazabilidad farmacéutica completa",
    desc: "Registro blockchain con timestamps cifrados SHA-256 sobre Hyperledger. Cada retiro queda documentado para auditorías ANMAT.",
  },
  {
    kind: "icon",
    iconKey: "build",
    title: "Construcción ruggedizada",
    desc: "Acero al carbona 1.2mm, 200kg de carga, IP54 para lavado de quirófano.",
  },
];

const ICONS: Record<string, React.ReactNode> = {
  scan: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-8 w-8 text-brand-blue"
    >
      <rect x="6" y="6" width="12" height="12" rx="2" />
      <path d="M9 9h6v6H9z" />
      <path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2" />
    </svg>
  ),
  auth: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-8 w-8 text-brand-blue"
    >
      <path d="M12 2L4 6v6c0 5 3.5 9.5 8 10 4.5-.5 8-5 8-10V6l-8-4z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
  build: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-8 w-8 text-brand-blue"
    >
      <path d="M12 2l9 5v10l-9 5-9-5V7l9-5z" />
      <path d="M12 22V12M12 12L3 7M12 12l9-5" />
    </svg>
  ),
};

export default function Features() {
  return (
    <section id="caracteristicas" className="px-6 py-[14vh] md:px-10">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-16 text-center">
          <h2 className="font-display text-[clamp(32px,5vw,48px)] font-semibold leading-[1.1] tracking-[-0.02em] text-foreground">
            Características clave
          </h2>
          <hr className="mx-auto mt-6 h-[2px] w-[60px] border-0 bg-brand-blue" />
        </Reveal>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {BENTO.map((t, i) =>
            t.kind === "large-image" ? (
              <Reveal
                key={t.title}
                delay={i * 0.08}
                className="group relative col-span-1 flex min-h-[340px] flex-col justify-end overflow-hidden rounded-[8px] border border-white/10 md:col-span-2"
              >
                <img
                  src={t.img}
                  alt={t.alt}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover opacity-70 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                />
                <div
                  className="relative z-10 flex flex-col gap-3 p-8 text-white"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(10,14,26,0.92) 0%, rgba(10,14,26,0.4) 50%, transparent 100%)",
                  }}
                >
                  <h3 className="font-display text-[28px] font-semibold leading-[1.18] tracking-tight">
                    {t.title}
                  </h3>
                  <p className="max-w-[480px] text-[14px] leading-[1.5] text-white/85">
                    {t.desc}
                  </p>
                </div>
              </Reveal>
            ) : (
              <Reveal
                key={t.title}
                delay={i * 0.08}
                className="liquid-glass flex h-full flex-col gap-3 rounded-[8px] p-8 transition-all hover:-translate-y-1"
              >
                {ICONS[t.iconKey!]}
                <h3 className="font-display text-[24px] font-semibold leading-[1.18] tracking-tight text-foreground">
                  {t.title}
                </h3>
                <p className="text-[14px] leading-[1.5] text-foreground/75">
                  {t.desc}
                </p>
              </Reveal>
            )
          )}
        </div>
      </div>
    </section>
  );
}
