import type { Cta, Dato, Vertical } from "./types"

export interface SolutionCard {
  title: string
  description: string
  vertical: Vertical
}

export const hero = {
  eyebrow: "// diseño → operación",
  posterTitle: "Ingeniería de transformación",
  posterAccent: "transformación",
  supportLine: "Diseñamos, construimos y operamos la solución completa.",
  titlePrefix: "Diseñamos, construimos y operamos ",
  titleHighlight: "la solución completa",
  titleSuffix: ".",
  subhead:
    "Plataformas de datos, software a medida y procesos con IA para organismos internacionales y empresas. El mismo equipo senior de la arquitectura a la operación, con IA nativa en el delivery.",
  ctaPrimary: { label: "Hablemos de tu proyecto", href: "/contacto" } as Cta,
  ctaSecondary: { label: "Cómo trabajamos →", href: "/soluciones" } as Cta,
  rails: [
    { from: "diagnóstico", to: "producción", vertical: "company" as Vertical, note: "proyectos" },
    { from: "equipo senior", to: "equipo + agentes", vertical: "company" as Vertical, note: "delivery" },
  ],
}

export const whatWeDo = {
  kicker: { index: "01", label: "qué construimos" },
  posterTitle: "Qué construimos",
  title: "Plataformas, datos y procesos con IA, de punta a punta",
  intro:
    "Ejecutamos el ciclo completo de un proyecto de transformación: arquitectura, desarrollo, datos y operación. IA embebida donde hace falta criterio, lógica determinística donde hace falta precisión.",
  cards: [
    {
      title: "Plataformas a medida",
      description:
        "Software y productos digitales sobre arquitectura multi-tenant: escalan a nuevas unidades, verticales o países sin rehacer la base.",
      vertical: "company",
    },
    {
      title: "Datos, GIS y analítica",
      description:
        "Pipelines de datos, tableros y plataformas territoriales, con experiencia en datos satelitales para proyectos de organismos internacionales.",
      vertical: "company",
    },
    {
      title: "Procesos con IA",
      description:
        "Agentes y automatización embebidos en la solución: asistentes, bots de proceso y el brain que les da contexto y memoria.",
      vertical: "company",
    },
    {
      title: "Operación continua",
      description:
        "La plataforma entregada se opera: modelos que se optimizan, agentes que se ajustan, infraestructura monitoreada y asegurada.",
      vertical: "company",
    },
  ] as SolutionCard[],
}

export const howWeExecute = {
  kicker: { index: "02", label: "cómo ejecutamos" },
  posterTitle: "Sin capas",
  posterAccent: "capas",
  title: "Dos diferenciales, verificables en la primera reunión",
  items: [
    {
      title: "Seniority directo",
      description:
        "Los que diseñan son los que construyen y operan. Decisiones de arquitectura con el negocio en la mesa, agilidad de boutique con gobierno de programa de firma grande.",
    },
    {
      title: "IA nativa en el delivery",
      description:
        "Nuestros equipos trabajan aumentados con agentes. Eso entrega a una velocidad y un costo por entregable fuera del alcance de una estructura tradicional.",
    },
  ],
}

export const thesis = {
  kicker: { index: "03", label: "la tesis" },
  posterTitle: "De A a B",
  posterAccent: "B",
  title: "Toda transformación es un cambio de estado",
  body:
    "Trabajamos con una notación simple: A es cómo opera hoy tu organización, B es cómo opera con la tecnología adoptada. Nuestro trabajo es el trayecto completo, y un sistema está terminado recién cuando tu gente lo adoptó y lo opera.",
  cta: { label: "Cómo trabajamos →", href: "/soluciones" } as Cta,
}

export const credentials = {
  kicker: { index: "04", label: "credenciales" },
  posterTitle: "Años de ejecución",
  title: "Años de ejecución. Proyectos reales.",
  intro:
    "Trabajamos para organismos internacionales y empresas que no pueden darse el lujo de experimentar: +25 años de proyectos de transformación con tecnología en la región." as Dato,
  stat: { value: 25, suffix: "+", label: "años de proyectos" },
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

export const enParaleloBlock = {
  kicker: { index: "05", label: "para pymes" },
  posterTitle: "En Paralelo",
  title: "La IA trabaja en paralelo a tu gente. Vos escalás sin multiplicar estructura.",
  body:
    "Para pymes y empresas de alto valor por persona: implementamos el cerebro digital de tu empresa y agentes educados con tu método, por olas con precio cerrado. Arranca con un diagnóstico corto y sigue solo si ves valor.",
  cta: { label: "Conocé En Paralelo →", href: "/en-paralelo" } as Cta,
}

export const finalCta = {
  posterTitle: "Por dónde empezamos",
  title: "Por dónde empezamos?",
  cardA: {
    title: "Proyectos",
    description: "Organismos y empresas con un proyecto de plataforma, datos o IA. Ejecución end-to-end.",
    cta: { label: "Hablemos", href: "/contacto" } as Cta,
    vertical: "company" as Vertical,
  },
  cardB: {
    title: "Pymes: En Paralelo",
    description: "Un cerebro digital y agentes trabajando junto a tu equipo, empezando por un diagnóstico corto.",
    cta: { label: "Conocé En Paralelo", href: "/en-paralelo" } as Cta,
    vertical: "people" as Vertical,
  },
}
