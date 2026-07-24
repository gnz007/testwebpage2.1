const COLS: {
  heading: string;
  links: { label: string; href: string; static?: boolean }[];
}[] = [
  {
    heading: "Producto",
    links: [
      { label: "Visión general", href: "#producto" },
      { label: "Características", href: "#caracteristicas" },
      { label: "Especificaciones", href: "#especificaciones" },
      { label: "Aplicaciones", href: "#top" },
    ],
  },
  {
    heading: "Soluciones",
    links: [
      { label: "Centro quirúrgico", href: "#top" },
      { label: "Farmacia hospitalaria", href: "#top" },
      { label: "Laboratorio", href: "#top" },
      { label: "Sustancias controladas", href: "#top" },
    ],
  },
  {
    heading: "Contacto",
    links: [
      { label: "+54 11 4321-5000", href: "tel:+541143215000" },
      { label: "ventas@cykeo.com.ar", href: "mailto:ventas@cykeo.com.ar" },
      { label: "Av. del Libertador 1200", href: "#", static: true },
      { label: "C1426, CABA, Argentina", href: "#", static: true },
    ],
  },
];

export default function Footer() {
  return (
    <footer
      className="px-[22px] pb-8 pt-16 text-[12px] text-ash"
      style={{ background: "var(--color-canvas)", borderTop: "1px solid var(--color-hairline)" }}
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="grid grid-cols-2 gap-10 pb-12 sm:grid-cols-3 lg:grid-cols-4">
          <div>
            <div className="font-display text-[16px] font-semibold text-ink" style={{ letterSpacing: "-0.01em" }}>
              Cykeo Argentina
            </div>
            <p className="mt-2 max-w-[240px] text-[12px] leading-[1.5] text-ash">
              Distribución oficial de gabinetes médicos RFID para hospitales,
              farmacias y laboratorios en todo el país.
            </p>
          </div>

          {COLS.map((c) => (
            <div key={c.heading}>
              <h3 className="mb-3 text-[12px] font-semibold text-ink" style={{ letterSpacing: "-0.224px" }}>
                {c.heading}
              </h3>
              {c.links.map((l) =>
                l.static ? (
                  <span key={l.label} className="block py-1 leading-[2] text-ash">
                    {l.label}
                  </span>
                ) : (
                  <a
                    key={l.label}
                    href={l.href}
                    className="block py-1 leading-[2] text-ash transition-colors hover:text-ink"
                  >
                    {l.label}
                  </a>
                )
              )}
            </div>
          ))}
        </div>

        <hr style={{ border: 0, borderTop: "1px solid var(--color-hairline)" }} />

        <div className="flex flex-col items-start justify-between gap-4 py-6 text-[12px] text-ash sm:flex-row sm:items-center">
          <p>© 2026 Cykeo Argentina. Todos los derechos reservados.</p>
          <nav className="flex gap-6" aria-label="Legal">
            <a href="#" className="transition-colors hover:text-ink">Privacidad</a>
            <a href="#" className="transition-colors hover:text-ink">Términos</a>
            <a href="#" className="transition-colors hover:text-ink">Mapa del sitio</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
