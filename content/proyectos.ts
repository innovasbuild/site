import type { Cta } from "./types"

export const hero = {
  eyebrow: "// proyectos → a medida",
  posterTitle: "A medida",
  posterAccent: "medida",
  subhead:
    "El mismo equipo que implementa Central IA construye plataformas de datos y software a medida para organizaciones con un proyecto concreto.",
  ctaPrimary: { label: "Contanos tu proyecto", href: "/contacto" } as Cta,
}

export const solutionTypes = {
  kicker: { index: "01", label: "qué construimos" },
  posterTitle: "Qué construimos",
  items: [
    {
      title: "Plataformas y productos a medida",
      description:
        "Aplicaciones web y productos digitales sobre arquitectura multi-tenant: escalan a nuevas unidades, verticales o países sin rehacer la base.",
    },
    {
      title: "Datos, GIS y analítica",
      description:
        "Pipelines de datos, tableros y plataformas territoriales para decisiones operativas, con experiencia en datos satelitales y análisis geoespacial.",
    },
    {
      title: "Procesos con IA",
      description:
        "Asistentes y agentes de proceso embebidos en la solución. IA donde hace falta criterio y lógica determinística donde hace falta precisión.",
    },
    {
      title: "Integraciones y APIs",
      description:
        "Orquestación entre sistemas existentes: aprobaciones, reportes, sincronización. Trazable, auditable y mantenible.",
    },
  ],
}

export const methodology = {
  kicker: { index: "02", label: "cómo trabajamos" },
  posterTitle: "Cómo trabajamos",
  steps: [
    {
      title: "Descubrimiento y arquitectura.",
      description:
        "Relevamiento con las áreas involucradas, arquitectura de solución y alcance cerrado por fase. Las decisiones estructurales se toman con el negocio en la mesa.",
    },
    {
      title: "Construcción por fases.",
      description:
        "Cada fase entrega un tramo del sistema verificable: diseño, desarrollo y pruebas de aceptación, con un punto de decisión entre fases.",
    },
    {
      title: "Puesta en producción.",
      description: "Salida acompañada: monitoreo intensivo, ajustes finos y transferencia a los equipos del cliente.",
    },
    {
      title: "Operación continua.",
      description: "La plataforma se opera y evoluciona, con la infraestructura monitoreada y asegurada.",
    },
  ],
  principles: [
    "IA donde hace falta criterio; lógica determinística donde hace falta precisión.",
    "Datos estructurados como contrato entre sistemas.",
    "Todo trazable: cada decisión del sistema puede explicarse.",
    "Escalabilidad pensada antes de escribir la primera línea.",
  ],
}

export const audience = {
  kicker: { index: "03", label: "con quién" },
  posterTitle: "Con quién",
  items: [
    "Empresas con un proyecto de plataforma o producto digital, y un sponsor en dirección o gerencia general.",
    "Organismos y sector público, por licitación o contratación directa.",
  ],
  note: "Tu necesidad es ordenar la IA de la empresa: mirá Central IA.",
  noteCta: { label: "Central IA →", href: "/central-ia" } as Cta,
}

export const finalCta = {
  title: "Contanos tu proyecto",
  cta: { label: "Hablemos", href: "/contacto" } as Cta,
  note: "La primera conversación es con el equipo que después ejecuta.",
}
