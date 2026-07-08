import type { Cta } from "./types"

export const hero = {
  eyebrow: "// sé trainer → carrera",
  title: "Aprendé IA al nivel de enseñarla",
  subhead:
    "Certificate en la metodología Desde Adentro y facilitá programas de adopción de IA en empresas — contratado por INNOV.AS, con contenidos, plataforma y respaldo de una firma que ejecuta proyectos reales.",
  ctaPrimary: { label: "Aplicar a la certificación", href: "/contacto" } as Cta,
}

export const opportunity = {
  kicker: { index: "01", label: "la oportunidad" },
  title: "El negocio de entrenar empresas",
  intro:
    "La demanda de formación en IA corporativa explotó, pero enseñar bien es otra cosa: hace falta método, materiales probados y una marca que abra puertas. Eso es lo que te da la certificación:",
  items: [
    {
      title: "Metodología completa:",
      description:
        "guiones de taller, rúbricas de evaluación, el sistema de Inventario de Oportunidades. No improvisás slides: facilitás un programa probado.",
    },
    {
      title: "Cohortes reales:",
      description: "INNOV.AS vende los programas; vos los facilitás, contratado por cohorte. Sin salir a vender ni armar contenido.",
    },
    {
      title: "Economía clara:",
      description:
        "con la tarifa por cohorte, recuperás la inversión de la certificación en aproximadamente dos cohortes facilitadas. Desde ahí, es ingreso recurrente por proyecto.",
    },
    {
      title: "Crecimiento:",
      description:
        "los mejores trainers acceden a cohortes de niveles superiores, programas presenciales y proyectos de adopción más profundos.",
    },
  ],
}

export const howItWorks = {
  kicker: { index: "02", label: "cómo funciona" },
  title: "De profesional con dominio de IA a trainer certificado",
  steps: [
    {
      title: "1. Aplicás.",
      description:
        "Buscamos gente que ya usa IA en serio en su trabajo y tiene condiciones para facilitar grupos. La admisión es selectiva — decimos que no seguido.",
    },
    {
      title: "2. Te certificás (2–3 semanas).",
      description:
        "Metodología de facilitación, manejo del sistema de oportunidades, práctica supervisada con feedback y evaluación final con rúbrica.",
    },
    {
      title: "3. Facilitás.",
      description: "Entrás a la red de trainers: INNOV.AS te asigna cohortes según tu perfil, industria y disponibilidad.",
    },
    {
      title: "4. Mantenés el estándar.",
      description: "Evaluación de alumnos por taller, acompañamiento y recertificación anual. La calidad de la red es el activo de todos.",
    },
  ],
}

export const transparency = {
  kicker: { index: "03", label: "transparencia" },
  title: "Lo que esto es — y lo que no",
  isText:
    "una certificación profesional paga, con cupos limitados, que te habilita a facilitar programas que INNOV.AS vende y opera. Ganás por trabajo facilitado, no por reclutar a nadie.",
  isNotText:
    "un esquema de referidos, una franquicia ni una promesa de ingresos pasivos. Si no hay cohortes vendidas en tu perfil e industria, no hay facilitación — por eso la admisión es selectiva y está atada a la demanda real.",
}

export const profile = {
  kicker: { index: "04", label: "¿sos vos?" },
  title: "¿Sos vos?",
  items: [
    "Usás IA a diario en tu trabajo y podés demostrarlo (nivel equivalente a Usuario Avanzado o superior).",
    "Tenés experiencia facilitando, enseñando o liderando equipos.",
    "Te interesa el mundo empresa: procesos, productividad, resultados — no solo la tecnología.",
    "Disponibilidad para facilitar talleres en horario laboral (virtual; presencial es un plus).",
  ],
}

export const recovery = {
  title: "Recuperás la inversión en ≈2 cohortes",
  rows: [
    { label: "Certificación (pago único)", value: "[DATO: precio]" },
    { label: "Tarifa por cohorte facilitada", value: "[DATO: tarifa]" },
    { label: "Cohortes para recuperar inversión", value: "≈ 2" },
  ],
}

export const faq = [
  {
    question: "¿Cuánto cuesta la certificación?",
    answer:
      "El precio se comunica al avanzar tu aplicación. La cohorte fundadora tiene condiciones especiales. [Decisión: no publicar precio — coherente con regla de pricing]",
  },
  {
    question: "¿Cuánto puedo facturar?",
    answer:
      "Cobrás una tarifa fija por cohorte facilitada. Con dos cohortes recuperás la inversión de la certificación; el resto depende de la demanda y tu desempeño.",
  },
  {
    question: "¿Necesito saber programar?",
    answer:
      "No. Necesitás dominar el uso avanzado de IA y saber facilitar. Para los niveles técnicos (3 y 4) hay trainers con perfil builder.",
  },
  {
    question: "¿Es exclusivo?",
    answer:
      "No exigimos exclusividad. Sí firmamos no-competencia sobre clientes de INNOV.AS y estándares de calidad de la red.",
  },
  {
    question: "¿Qué pasa si no apruebo la certificación?",
    answer: "Recibís feedback estructurado y podés volver a rendir la evaluación práctica una vez sin costo adicional.",
  },
]

export const finalCta = {
  cta: { label: "Aplicar a la certificación", href: "/contacto" } as Cta,
  note: "cupos limitados por cohorte fundadora.",
}
