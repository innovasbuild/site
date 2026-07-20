import type { Cta, Dato, Vertical } from "./types"

export interface SolutionCard {
  title: string
  description: string
  vertical: Vertical
}

export const hero = {
  eyebrow: "// innov.as → transformación",
  titlePrefix: "La IA trabaja en paralelo a tu gente. ",
  titleHighlight: "Vos escalás",
  titleSuffix: " sin multiplicar estructura.",
  subhead:
    "Diseñamos y ejecutamos soluciones de datos e inteligencia artificial para empresas medianas y grandes, y para organismos internacionales — con años de proyectos entregados para bancos, gobierno, ONGs y empresas de consumo masivo en la región.",
  ctaPrimary: { label: "Hablemos de tu operación", href: "/contacto" } as Cta,
  ctaSecondary: { label: "Cómo trabajamos →", href: "/soluciones" } as Cta,
}

export const whatWeDo = {
  kicker: { index: "01", label: "qué hacemos" },
  title: "Asistentes digitales, agentes AI y company brains — no experimentos",
  intro:
    "Construimos los tres sistemas que necesita una organización para operar con IA: asistentes que atienden a tu gente y a tus clientes, bots que ejecutan procesos sin supervisión, y el brain que les da contexto y memoria. Arquitectura pensada para producción desde el día uno.",
  cards: [
    {
      title: "Asistentes digitales",
      description:
        "Agentes conversacionales que atienden, consultan y resuelven — atención, soporte, análisis de documentos — con IA donde hace falta criterio y lógica determinística donde hace falta precisión.",
      vertical: "company",
    },
    {
      title: "Bots de proceso",
      description:
        "Automatización de workflows completos: integraciones, aprobaciones, orquestación entre sistemas, con trazabilidad de punta a punta.",
      vertical: "company",
    },
    {
      title: "Company Brain",
      description:
        "La base de datos y conocimiento que le da contexto a cada asistente y bot. Plataformas multi-tenant que escalan a nuevos países, unidades o verticales sin rehacer la base.",
      vertical: "company",
    },
    {
      title: "IA con gobernanza",
      description:
        "Implementaciones con evaluación, guardrails y métricas de adopción. Para que el directorio sepa qué hace la IA, por qué y con qué resultado.",
      vertical: "company",
    },
  ] as SolutionCard[],
}

export const thesis = {
  kicker: { index: "02", label: "la tesis" },
  title: "La tecnología sola no transforma nada",
  body: "Vimos demasiados proyectos de IA morir en el mismo lugar: la solución funciona, pero la organización no la adopta. La transformación profunda no se instala desde afuera — se adopta desde adentro, cuando tu propia gente entiende la tecnología, detecta las oportunidades y empuja el cambio.",
  intro: "Por eso pensamos la transformación como un solo movimiento, de A a B:",
  engines: [
    {
      name: "A — Hoy.",
      description:
        "Todo pasa por tu gente: procesos manuales, decisiones concentradas en pocas personas, conocimiento tácito que no escala.",
      vertical: "people" as Vertical,
    },
    {
      name: "B — En paralelo.",
      description:
        "Tu gente decide y los agentes ejecutan. La IA trabaja al lado de tu equipo, no en su lugar — un estado operativo, no un destino final.",
      vertical: "company" as Vertical,
    },
  ],
  closing:
    "El programa forma champions internos sobre tus propios procesos desde la primera ola, para que el cambio se sostenga adentro y no dependa de nosotros para siempre.",
  cta: { label: "Cómo trabajamos →", href: "/soluciones" } as Cta,
}

export const credentials = {
  kicker: { index: "03", label: "credenciales" },
  title: "Años de ejecución. Proyectos reales.",
  intro:
    "Trabajamos para organismos internacionales y empresas que no pueden darse el lujo de experimentar: +25 años de proyectos de transformación con tecnología en la región." as Dato,
  logosLabel: "Organizaciones con las que hemos colaborado" as Dato,
  logos: [
    "Lenovo",
    "Kimberly Clark",
    "Pearson Education",
    "McGraw Hill",
    "Despegar.com",
    "Falabella",
    "BID",
    "FAO",
    "SAGyP",
    "SENASA",
    "Google Argentina",
    "Grupo Don Mario",
    "BASF",
  ],
  projects: [
    "Plataforma de visualización territorial para organismo multilateral — datos geoespaciales, análisis satelital y arquitectura multi-tenant. ",
    "Ecommerce para la venta de productos de consumo masivo para la empresa Kimberly Clark en Argentina.",
    "Múltiples plataformas educativas para Pearson y McGraw Hill en Estados Unidos, con integración de contenidos, analítica y personalización.",
  ] as Dato[],
}

export const finalCta = {
  title: "¿Por dónde empezamos?",
  cardA: {
    title: "Empresas",
    description: "Tenemos procesos que no escalan. Automatización, agentes, plataformas de datos.",
    cta: { label: "Hablemos", href: "/contacto" } as Cta,
    vertical: "company" as Vertical,
  },
  cardB: {
    title: "Organismos y sector público",
    description: "Proyectos de datos, plataformas territoriales y transformación institucional.",
    cta: { label: "Hablemos", href: "/contacto" } as Cta,
    vertical: "people" as Vertical,
  },
}
