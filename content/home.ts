import type { Cta, Dato, Vertical } from "./types"

export interface SolutionCard {
  title: string
  description: string
  vertical: Vertical
}

export const hero = {
  eyebrow: "// innov.as ──→ transformación",
  titlePrefix: "Automatización agéntica para transformar tu operación. ",
  titleHighlight: "Adopción real",
  titleSuffix: " para sostenerla.",
  subhead:
    "Diseñamos y ejecutamos soluciones de datos e inteligencia artificial para empresas y organismos internacionales — con años de proyectos entregados para Banco Mundial, BID, FAO y compañías privadas de la región.",
  ctaPrimary: { label: "Hablemos de tu operación", href: "/contacto" } as Cta,
  ctaSecondary: { label: "Conocé Desde Adentro →", href: "/desde-adentro" } as Cta,
}

export const whatWeDo = {
  kicker: { index: "01", label: "qué hacemos" },
  title: "Soluciones estructurales, no experimentos",
  intro:
    "Construimos sistemas que operan procesos de negocio de punta a punta. Sin pilotos eternos: arquitectura pensada para producción desde el día uno.",
  cards: [
    {
      title: "Agentes que operan procesos",
      description:
        "Agentes de IA que ejecutan flujos completos — atención, análisis, back-office — con lógica determinística donde hace falta precisión e IA donde hace falta criterio.",
      vertical: "company",
    },
    {
      title: "Plataformas de datos",
      description:
        "Plataformas multi-tenant que integran tus fuentes, estructuran la información y la convierten en decisiones. Diseñadas para escalar a nuevos países, unidades o verticales sin rehacer la base.",
      vertical: "company",
    },
    {
      title: "Automatización de procesos",
      description:
        "Relevamos, priorizamos y automatizamos los procesos que más cuestan: integraciones, workflows y orquestación con trazabilidad completa.",
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
  intro: "Por eso INNOV.AS trabaja con dos motores:",
  engines: [
    {
      name: "Motor 1 — Soluciones.",
      description: "Nuestro equipo construye los sistemas complejos: agentes, plataformas, integraciones.",
      vertical: "company" as Vertical,
    },
    {
      name: "Motor 2 — Capacidades.",
      description:
        "Tu equipo se potencia con Desde Adentro, nuestro programa de adopción de IA: 4 niveles que llevan a tu gente de usuaria básica a orquestadora de agentes — trabajando sobre procesos reales de tu empresa desde la primera semana.",
      vertical: "people" as Vertical,
    },
  ],
  closing:
    "Cuando los dos motores giran juntos, el negocio acelera: nosotros resolvemos lo estructural mientras tu equipo multiplica lo cotidiano y sostiene el cambio.",
  cta: { label: "Conocé el programa Desde Adentro →", href: "/desde-adentro" } as Cta,
}

export const credentials = {
  kicker: { index: "03", label: "credenciales" },
  title: "Años de ejecución. Proyectos reales.",
  intro:
    "Trabajamos para organismos internacionales y empresas que no pueden darse el lujo de experimentar: [DATO: N] años de proyectos de transformación con tecnología en la región." as Dato,
  logos: ["Banco Mundial", "BID", "FAO", "SAGyP", "INTA", "SENASA"],
  projects: [
    "Plataforma de visualización territorial para organismo multilateral — datos geoespaciales, análisis satelital y arquitectura multi-tenant. [DATO: validar descripción publicable BID AR-T1401]",
    "[DATO: proyecto privado destacable]",
    "[DATO: proyecto agri-tech / datos destacable]",
  ] as Dato[],
}

export const finalCta = {
  title: "¿Por dónde empezamos?",
  cardA: {
    title: "Tengo un proyecto de transformación",
    description: "Automatización, agentes, plataformas de datos. Contanos tu operación y armamos el camino.",
    cta: { label: "Hablemos", href: "/contacto" } as Cta,
    vertical: "company" as Vertical,
  },
  cardB: {
    title: "Quiero potenciar a mi equipo",
    description:
      "El programa Desde Adentro forma a tu gente y devuelve un mapa de oportunidades de tu propia empresa.",
    cta: { label: "Ver el programa", href: "/desde-adentro" } as Cta,
    vertical: "people" as Vertical,
  },
}
