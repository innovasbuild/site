import type { Cta } from "./types"
import { primaryCta, signupHref } from "./global"
import type { FaqItem } from "./faq"

const talkCta: Cta = { label: "Hablemos", href: "/contacto" }

export const hero = {
  eyebrow: "// precios → planes",
  posterTitle: "Empezá ahora",
  posterAccent: "ahora",
  supportLine: "Tres planes, del primer equipo a toda la empresa.",
  subhead:
    "Creás la cuenta de tu empresa en minutos y trabajás con el Brain desde el primer día. Cuando se suma más gente, pagás por persona. Si querés que nuestro equipo la implemente con vos, lo armamos a medida.",
  ctaPrimary: primaryCta,
  ctaSecondary: talkCta,
}

export interface Plan {
  id: "gratis" | "equipo" | "empresa"
  name: string
  price: string
  period: string
  example?: string
  description: string
  includesFrom?: string
  features: string[]
  cta: Cta
  link?: Cta
  note?: string
  featured?: boolean
}

export const planes = {
  kicker: { index: "01", label: "planes" },
  posterTitle: "Tres planes",
  items: [
    {
      id: "gratis",
      name: "Gratis",
      price: "USD 0",
      period: "por 3 meses, hasta 3 usuarios",
      description: "Para que un equipo chico pruebe Central IA durante tres meses con lo que la empresa sabe.",
      features: [
        "Tres meses de uso.",
        "Hasta 3 usuarios.",
        "Brain con páginas, carpetas e historial de versiones.",
        "Permisos por carpeta y por página.",
        "Hasta 5 skills.",
        "Conexión a Claude y ChatGPT por MCP.",
        "Ingreso restringible al dominio de tu empresa.",
      ],
      cta: { label: "Empezá ahora", href: signupHref("gratis") },
      note: "El uso de IA dentro de la plataforma se paga por consumo.",
    },
    {
      id: "equipo",
      name: "Equipo",
      price: "USD 10",
      period: "por usuario por mes",
      example: "5 usuarios: USD 50 por mes.",
      description: "Para que toda la empresa trabaje con el mismo Brain y las mismas reglas.",
      includesFrom: "Todo lo de Gratis, más:",
      features: [
        "Usuarios sin límite.",
        "Skills sin límite.",
      ],
      cta: { label: "Elegí Equipo", href: signupHref("equipo") },
      note: "El uso de IA dentro de la plataforma se paga por consumo.",
      featured: true,
    },
    {
      id: "empresa",
      name: "Empresa",
      price: "A medida",
      period: "con nuestro equipo",
      description:
        "Para implementar Central IA con un equipo con experiencia en IA en producción, que la opera con vos.",
      includesFrom: "Todo lo de Equipo, más:",
      features: [
        "Radar: tres a cuatro horas con tu equipo directivo y un plan a dos años. Bonificado al implementar la ola cero.",
        "Mapa del Método: el método de cada área del negocio, con el alcance de cada ola trimestral. Bonificado al implementar la ola cero y la ola uno.",
        "Olas de trabajo de tres meses, con alcance cerrado y algo operando al final de cada una.",
        "Skills y agentes armados con tu método, y tus herramientas conectadas.",
        "Operación continua de la plataforma y acompañamiento para que tu gente la adopte.",
      ],
      cta: talkCta,
      link: { label: "Ver servicios →", href: "/servicios" },
      note: "Arranca con el Radar o con el Mapa del Método.",
    },
  ] satisfies Plan[],
}

export const consumo = {
  kicker: { index: "02", label: "uso de ia" },
  posterTitle: "Pagás lo que usás",
  posterAccent: "usás",
  body:
    "El Brain, los permisos y las skills están incluidos en cada plan. Lo que se paga aparte es el uso de los modelos de IA dentro de la plataforma, en el chat y en los agentes, según lo que consume cada empresa.",
  items: [
    {
      title: "Con tu propio asistente",
      description:
        "Si tu gente trabaja desde su Claude o su ChatGPT conectado por MCP, el modelo corre en esa licencia.",
    },
    {
      title: "Gasto a la vista",
      description: "Cada llamada a un modelo queda registrada con su costo.",
    },
    {
      title: "Con tope",
      description: "Cada empresa tiene un tope de gasto, y cada agente un presupuesto diario.",
    },
  ],
}

export const faqSection = {
  kicker: { index: "03", label: "preguntas frecuentes" },
  posterTitle: "Preguntas",
}

export const faqPrecios: FaqItem[] = [
  {
    question: "Qué es una skill?",
    answer:
      "Es un procedimiento de tu empresa escrito para que el asistente lo siga paso a paso: cómo se responde un reclamo, cómo se arma una cotización, cómo se califica un cliente. Vive en Central IA y la usa cualquier persona con permiso, desde la plataforma o desde su asistente.",
  },
  {
    question: "Qué pasa cuando se suma la cuarta persona?",
    answer:
      "La empresa pasa al plan Equipo y paga por cada usuario. Todo lo que cargaron en el plan Gratis queda igual.",
  },
  {
    question: "Qué pasa a los tres meses?",
    answer:
      "Para seguir usando Central IA, la empresa pasa al plan Equipo y paga por cada usuario. Todo lo que cargaron en el plan Gratis queda igual.",
  },
  {
    question: "Necesito tener ChatGPT o Claude?",
    answer:
      "No. Quien trabaja sin asistente propio entra directo a la plataforma desde el navegador. Quien ya tiene una licencia conecta Central IA a su asistente y la usa desde ahí.",
  },
  {
    question: "En qué moneda se cobra?",
    answer: "Los precios están en dólares y no incluyen los impuestos que correspondan en tu país.",
  },
  {
    question: "Cómo se cotiza el plan Empresa?",
    answer:
      "Empieza con una primera conversación sin costo. Si tiene sentido seguir, hay dos diagnósticos. El Radar releva tu empresa en tres a cuatro horas con el equipo directivo, dimensiona la ola cero y se bonifica al implementarla. El Mapa del Método entra en cada área del negocio, define el alcance de las olas trimestrales y se bonifica al implementar la ola cero y la ola uno. Cada ola de trabajo se cotiza con alcance cerrado antes de empezar.",
  },
]

export const finalCta = {
  title: "Creá la cuenta de tu empresa",
  cta: primaryCta,
  secondary: talkCta,
  note: "Gratis por tres meses, hasta 3 usuarios y 5 skills.",
}
