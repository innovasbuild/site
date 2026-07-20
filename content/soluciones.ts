import type { Cta } from "./types"

export const hero = {
  eyebrow: "// soluciones → producción",
  title: "Transformación con automatización agéntica",
  subhead:
    "Del diagnóstico a producción: sistemas que operan procesos reales, construidos por el equipo que después no desaparece.",
  ctaPrimary: { label: "Hablemos de tu operación", href: "/contacto" } as Cta,
}

export const solutionTypes = {
  kicker: { index: "01", label: "qué construimos" },
  title: "Asistentes digitales, bots y brains",
  items: [
    {
      title: "Asistentes digitales",
      description:
        "Atención comercial, gestión de turnos, análisis de documentos, back-office. Agentes con estado persistente, salidas estructuradas y separación clara entre lo que decide la IA y lo que ejecuta la lógica determinística.",
    },
    {
      title: "Bots de automatización",
      description:
        "Orquestación de procesos con n8n y herramientas de integración: aprobaciones, reportes, sincronización entre sistemas. Trazable, auditable, mantenible.",
    },
    {
      title: "Company Brain — plataformas de datos e integración",
      description:
        "Postgres como fuente de verdad, APIs, integraciones con tus sistemas existentes. Multi-tenant desde el día uno: lo que construimos para una unidad de negocio escala a las demás.",
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
      title: "Radar.",
      description:
        "Diagnóstico corto: entrevistas con varias áreas, mapa de oportunidades y cuellos de botella priorizados. Puerta de entrada de bajo compromiso — se acredita al paso siguiente.",
    },
    {
      title: "Mapa del Método.",
      description:
        "Relevamiento profundo, business case y roadmap por etapas, con alcance y precio cerrado por ola. El documento vale por sí mismo, y se acredita al paso siguiente.",
    },
    {
      title: "Olas de transformación.",
      description:
        "Cada ola entrega un circuito operando: diseño, construcción, UAT, go-live e hipercuidado. Precio fijo contra entrega, sin anticipos, con gate de decisión entre etapas.",
    },
    {
      title: "Operar en B.",
      description:
        "Operación continua: optimización de modelos, ajuste de agentes, infraestructura y detección de nuevas etapas. Champions internos formados durante el programa operan cada vez más solos.",
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
  title: "Trabajamos con",
  items: [
    "Empresas medianas y grandes de agro, banca y seguros, retail e industria que necesitan pasar de pruebas sueltas de IA a sistemas que operan.",
    "Organismos internacionales y sector público — bancos, gobierno, ONGs y empresas de consumo masivo en la región — con proyectos de datos, plataformas territoriales y transformación institucional.",
  ],
}

export const finalCta = {
  title: "¿Tu operación tiene procesos que duelen?",
  cta: { label: "Hablemos", href: "/contacto" } as Cta,
  note: "El diagnóstico inicial no compromete a nada.",
}
