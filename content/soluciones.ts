import type { Cta } from "./types"

export const hero = {
  eyebrow: "// soluciones → producción",
  posterTitle: "De punta a punta",
  posterAccent: "punta",
  title: "Diseñamos, construimos y operamos",
  subhead:
    "Proyectos de transformación para organismos internacionales y empresas: de la arquitectura a producción, con el mismo equipo senior en cada fase y IA nativa en el delivery.",
  ctaPrimary: { label: "Hablemos de tu proyecto", href: "/contacto" } as Cta,
}

export const solutionTypes = {
  kicker: { index: "01", label: "qué construimos" },
  posterTitle: "Qué construimos",
  title: "Plataformas, datos y procesos con IA",
  items: [
    {
      title: "Plataformas y productos a medida",
      description:
        "Aplicaciones web y productos digitales sobre Next.js, Node y Postgres, con arquitectura multi-tenant: escalan a nuevas unidades, verticales o países sin rehacer la base.",
    },
    {
      title: "Datos, GIS y analítica",
      description:
        "Pipelines de datos, dashboards y plataformas territoriales para decisiones operativas, con experiencia en datos satelitales y análisis geoespacial para organismos internacionales.",
    },
    {
      title: "Procesos con IA",
      description:
        "Asistentes, agentes de proceso y el brain que les da contexto, embebidos en la solución. IA donde hace falta criterio, lógica determinística donde hace falta precisión, y gobernanza para que el directorio sepa qué hace la IA y con qué resultado.",
    },
    {
      title: "Integraciones y APIs",
      description:
        "Orquestación entre sistemas existentes: aprobaciones, reportes, sincronización. Trazable, auditable, mantenible.",
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
        "Cada fase entrega un tramo del sistema verificable: diseño, desarrollo, pruebas de aceptación. Entregables definidos por contrato, gate de decisión entre fases.",
    },
    {
      title: "Go-live e hipercuidado.",
      description:
        "Puesta en producción acompañada: monitoreo intensivo, ajustes finos y transferencia a los equipos del cliente.",
    },
    {
      title: "Operación continua.",
      description:
        "La plataforma se opera y evoluciona: optimización de modelos y costos, ajuste de agentes, infraestructura monitoreada y asegurada, y detección de las próximas etapas.",
    },
  ],
  principles: [
    "IA donde hace falta criterio; lógica determinística donde hace falta precisión.",
    "Datos estructurados como contrato entre sistemas.",
    "Todo trazable: cada decisión del sistema puede explicarse.",
    "Escalabilidad pensada antes de escribir la primera línea.",
  ],
}

export const operateInB = {
  kicker: { index: "03", label: "operar en b" },
  posterTitle: "No se termina, se opera",
  posterAccent: "opera",
  title: "Un sistema con IA no se termina, se opera",
  intro:
    "Sin operación continua, un sistema con IA se degrada: aparecen mejores modelos, cambian los procesos, se abren nuevas oportunidades. Operar en B es la capa que lo mantiene funcionando y mejorando.",
  foundation:
    "Todo esto corre sobre un brain vivo: interconectamos los flujos y el contexto de tu negocio para que cada cliente, empleado, asistente o bot tenga la información y las herramientas que necesita, en el momento en que las necesita.",
  pillars: [
    {
      title: "Optimización de modelos",
      description: "El costo por operación baja solo cuando aparece un modelo mejor y lo migramos sin fricción.",
    },
    {
      title: "Ajuste continuo de agentes",
      description: "Los agentes se afinan contra el uso real: nuevos casos, excepciones, criterios que cambian.",
    },
    {
      title: "Infraestructura y seguridad",
      description: "La base que sostiene el sistema se mantiene, se monitorea y se asegura en el tiempo.",
    },
    {
      title: "Entrega de valor por etapas",
      description: "La operación diaria revela los próximos procesos a transformar.",
    },
  ],
}

export const audience = {
  kicker: { index: "04", label: "para quién" },
  posterTitle: "Trabajamos con",
  title: "Trabajamos con",
  items: [
    "Organismos internacionales y sector público: proyectos de datos, plataformas territoriales y transformación institucional, vía licitación o contratación directa.",
    "Empresas medianas y grandes con un proyecto concreto de plataforma, producto digital o procesos con IA, y un sponsor en dirección o gerencia general.",
  ],
  note: "Sos una pyme y querés empezar por tu operación diaria? Mirá En Paralelo.",
  noteCta: { label: "En Paralelo →", href: "/en-paralelo" } as Cta,
}

export const finalCta = {
  title: "Contanos tu proyecto",
  cta: { label: "Hablemos", href: "/contacto" } as Cta,
  note: "La primera conversación es con el equipo que después ejecuta.",
}
