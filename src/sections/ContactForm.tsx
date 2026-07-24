import { useState } from "react";
import Reveal from "../components/Reveal";

const FIELDS: {
  name: "nombre" | "email" | "tel" | "institucion";
  label: string;
  type: string;
  placeholder: string;
}[] = [
  { name: "nombre", label: "Nombre *", type: "text", placeholder: "Su nombre" },
  { name: "email", label: "Email *", type: "email", placeholder: "nombre@institucion.com.ar" },
  { name: "tel", label: "Teléfono *", type: "tel", placeholder: "+54 11 1234-5678" },
  { name: "institucion", label: "Institución *", type: "text", placeholder: "Hospital / clínica / laboratorio" },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+]?[\d\s()-]{6,}$/;

export default function ContactForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const validate = (form: HTMLFormElement) => {
    const data = new FormData(form);
    const e: Record<string, string> = {};

    const nombre = (data.get("nombre") as string)?.trim() ?? "";
    const email = (data.get("email") as string)?.trim() ?? "";
    const tel = (data.get("tel") as string)?.trim() ?? "";
    const institucion = (data.get("institucion") as string)?.trim() ?? "";

    if (!nombre) e.nombre = "El nombre es obligatorio.";
    if (!email) e.email = "El email es obligatorio.";
    else if (!EMAIL_RE.test(email)) e.email = "Dirección de email inválida.";
    if (!tel) e.tel = "El teléfono es obligatorio.";
    else if (!PHONE_RE.test(tel)) e.tel = "Número de teléfono inválido.";
    if (!institucion) e.institucion = "La institución es obligatoria.";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate(e.currentTarget)) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1200);
  };

  return (
    <section id="contacto" className="px-[22px] py-[clamp(80px,12vh,140px)]">
      <div className="mx-auto max-w-[980px]">
        <Reveal className="mb-16 text-center">
          <h2 className="font-display font-semibold text-ink" style={{ fontSize: "clamp(32px,5vw,48px)", lineHeight: 1.14, letterSpacing: "0.44px", textWrap: "balance" }}>
            Solicitar demo
          </h2>
          <span className="mx-auto mt-6 block h-[2px] w-[60px] bg-apple-blue" />
          <p className="mx-auto mt-5 max-w-[560px] text-[16px] leading-[1.5] text-smoke">
            Coordinamos una demostración presencial u online en Buenos Aires y
            todo el país.
          </p>
        </Reveal>

        {sent ? (
          <Reveal>
            <div
              className="rounded-[8px] p-12 text-center"
              style={{ background: "var(--color-surface)", border: "1px solid var(--color-hairline)" }}
            >
              <svg className="mx-auto mb-4 h-12 w-12 text-apple-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12l5 5L20 7" />
              </svg>
              <h3 className="mb-3 font-display text-[24px] font-normal text-ink">
                Solicitud enviada
              </h3>
              <p className="text-smoke">
                Gracias. Nuestro equipo de Argentina se contactará a la
                brevedad para coordinar la demostración.
              </p>
            </div>
          </Reveal>
        ) : (
          <Reveal>
            <form
              onSubmit={onSubmit}
              noValidate
              className={loading ? "opacity-60 pointer-events-none" : ""}
            >
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {FIELDS.map((f) => (
                  <div key={f.name}>
                    <label
                      htmlFor={f.name}
                      className="mb-1.5 block text-[12px] font-medium text-smoke"
                      style={{ letterSpacing: "-0.224px" }}
                    >
                      {f.label}
                    </label>
                    <input
                      id={f.name}
                      name={f.name}
                      type={f.type}
                      placeholder={f.placeholder}
                      aria-invalid={!!errors[f.name]}
                      className="w-full rounded-[8px] px-4 py-3 text-[17px] text-ink transition-all placeholder:text-ash focus:shadow-[0_0_0_4px_rgba(0,113,227,0.15)]"
                      style={{
                        background: "var(--color-surface)",
                        border: errors[f.name] ? "1px solid #c00" : "1px solid var(--color-hairline)",
                        boxShadow: errors[f.name] ? "0 0 0 4px rgba(204,0,0,0.1)" : undefined,
                        letterSpacing: "-0.272px",
                      }}
                      onFocus={(e) => {
                        if (!errors[f.name]) e.currentTarget.style.borderColor = "var(--color-apple-blue)";
                      }}
                      onBlur={(e) => {
                        if (!errors[f.name]) e.currentTarget.style.borderColor = "var(--color-hairline)";
                      }}
                    />
                    {errors[f.name] && (
                      <span role="alert" className="mt-1.5 block text-[12px]" style={{ color: "#c00" }}>
                        {errors[f.name]}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-5">
                <label
                  htmlFor="mensaje"
                  className="mb-1.5 block text-[12px] font-medium text-smoke"
                  style={{ letterSpacing: "-0.224px" }}
                >
                  Mensaje
                </label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  rows={4}
                  placeholder="Contanos sobre su necesidad: cantidad de gabinetes, tipo de insumos a rastrear, integración con sistemas existentes..."
                  className="w-full resize-y rounded-[8px] px-4 py-3 text-[17px] text-ink transition-all placeholder:text-ash focus:shadow-[0_0_0_4px_rgba(0,113,227,0.15)]"
                  style={{
                    background: "var(--color-surface)",
                    border: "1px solid var(--color-hairline)",
                    letterSpacing: "-0.272px",
                    minHeight: 100,
                  }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = "var(--color-apple-blue)"; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = "var(--color-hairline)"; }}
                />
              </div>

              <div className="mt-7 text-center">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-[980px] bg-apple-blue px-8 py-3.5 text-[17px] font-normal text-white transition-all hover:bg-apple-blue-hover active:scale-[0.98]"
                >
                  <span>{loading ? "Enviando..." : "Enviar solicitud"}</span>
                  {!loading && (
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/22">
                      <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </span>
                  )}
                </button>
              </div>
            </form>
          </Reveal>
        )}
      </div>
    </section>
  );
}
