import type { Cta } from "./types"

export const hero = {
  eyebrow: "// soluciones ──→ producción",
  title: "Transformación con automatización agéntica",
  subhead:
    "Del diagnóstico a producción: sistemas que operan procesos reales, construidos por el equipo que después no desaparece.",
  ctaPrimary: { label: "Hablemos de tu operación", href: "/contacto" } as Cta,
}

export const solutionTypes = {
  kicker: { index: "01", label: "qué construimos" },
  title: "Qué construimos",
  items: [
    {
      title: "Agentes de procesos end-to-end",
      description:
        "Atención comercial, gestión de turnos, análisis de documentos, back-office. Agentes con estado persistente, salidas estructuradas y separación clara entre lo que decide la IA y lo que ejecuta la lógica determinística.",
    },
    {
      title: "Plataformas de datos e integración",
      description:
        "Postgres como fuente de verdad, APIs, integraciones con tus sistemas existentes. Multi-tenant desde el día uno: lo que construimos para una unidad de negocio escala a las demás.",
    },
    {
      title: "Automatización de workflows",
      description:
        "Orquestación de procesos con n8n y herramientas de integración: aprobaciones, reportes, sincronización entre sistemas. Trazable, auditable, mantenible.",
    },
    {
      title: "Analítica y visualización",
      description:
        "Dashboards y plataformas GIS para decisiones operativas — incluida experiencia en datos satelitales y territoriales para proyectos de organismos internacionales.",
    },
  ],
}

export const methodology = {
  kicker: { index: "02", label: "cómo trabajamos" },
  title: "Cómo trabajamos",
  steps: [
    {
      title: "1. Diagnóstico (2–4 semanas).",
      description:
        "Relevamos procesos, datos y sistemas. Salís con un roadmap priorizado por impacto y esfuerzo — no con un PowerPoint de tendencias.",
    },
    {
      title: "2. Construcción por etapas.",
      description:
        "Cada etapa entrega algo que funciona en producción. Arquitectura multi-tenant, datos estructurados, estado persistente: los cimientos se ponen una sola vez.",
    },
    {
      title: "3. Adopción y acompañamiento.",
      description:
        "Champions internos formados en Desde Adentro + retainer de evolución. El sistema mejora con el uso; tu equipo lo opera cada vez más solo.",
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
  kicker: { index: "03", label: "para quién" },
  title: "Trabajamos con",
  items: [
    "Empresas medianas y grandes de agro, banca y seguros, retail e industria que necesitan pasar de pruebas sueltas de IA a sistemas que operan.",
    "Organismos internacionales y sector público — Banco Mundial, BID, FAO, SAGyP — con proyectos de datos, plataformas territoriales y transformación institucional.",
  ],
}

export const finalCta = {
  title: "¿Tu operación tiene procesos que duelen?",
  cta: { label: "Hablemos", href: "/contacto" } as Cta,
  note: "El diagnóstico inicial no compromete a nada.",
}
