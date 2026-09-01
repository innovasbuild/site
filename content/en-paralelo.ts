import type { Cta, Vertical } from "./types"
import type { SolutionCard } from "./home"

export const hero = {
  eyebrow: "// pymes → en paralelo",
  posterTitle: "IA en paralelo",
  posterAccent: "paralelo",
  supportLine: "Crece tu negocio sin aumentar estructura.",
  subhead:
    "La IA no reemplaza a tu equipo: trabaja en paralelo. Implementamos el cerebro digital de tu empresa y agentes educados con tu método, por olas verificables a precio cerrado.",
  ctaPrimary: { label: "Hablemos de tu operación", href: "/contacto" } as Cta,
  rails: [
    { from: "tu equipo hoy", to: "tu equipo con agentes", vertical: "company" as Vertical, note: "empresas" },
    { from: "horas repetitivas", to: "procesos automatizados", vertical: "company" as Vertical, note: "tareas" },
  ],
}

export const thesis = {
  kicker: { index: "01", label: "la tesis" },
  posterTitle: "No se instala, se adopta",
  posterAccent: "instala",
  title: "La tecnología sola no transforma nada",
  body:
    "Vimos demasiados proyectos de IA morir en el mismo lugar: la solución funciona, pero la organización no la adopta. La transformación profunda no se instala desde afuera, se adopta desde adentro, cuando tu propia gente entiende la tecnología, detecta las oportunidades y empuja el cambio.",
  intro: "Por eso pensamos la transformación como un solo movimiento, de A a B:",
  engines: [
    {
      name: "A. Hoy.",
      description:
        "Todo pasa por tu gente: procesos manuales, decisiones concentradas en pocas personas, conocimiento tácito que no escala.",
      vertical: "people" as Vertical,
    },
    {
      name: "B. En paralelo.",
      description:
        "Tu gente decide y los agentes ejecutan. La IA trabaja al lado de tu equipo, no en su lugar: un estado operativo, no un destino final.",
      vertical: "company" as Vertical,
    },
  ],
  closing:
    "El programa forma champions internos sobre tus propios procesos desde la primera ola, para que el cambio se sostenga adentro y no dependa de nosotros para siempre.",
  cta: { label: "Cómo funciona →", href: "#como-funciona" } as Cta,
}

export const whatWeBuild = {
  kicker: { index: "02", label: "qué implementamos" },
  posterTitle: "Asistentes y brains",
  title: "Asistentes digitales, agentes AI y company brains, sin experimentos",
  intro:
    "Construimos los tres sistemas que necesita una organización para operar con IA: asistentes que atienden a tu gente y a tus clientes, bots que ejecutan procesos sin supervisión, y el brain que les da contexto y memoria. Arquitectura pensada para producción desde el día uno.",
  cards: [
    {
      title: "Asistentes digitales",
      description:
        "Agentes conversacionales que atienden, consultan y resuelven: atención, soporte, análisis de documentos, con IA donde hace falta criterio y lógica determinística donde hace falta precisión.",
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

export const howItWorks = {
  kicker: { index: "03", label: "cómo funciona" },
  posterTitle: "Cómo funciona",
  id: "como-funciona",
  steps: [
    {
      title: "Radar.",
      description:
        "Diagnóstico corto: entrevistas con varias áreas, mapa de oportunidades y cuellos de botella priorizados. Puerta de entrada de bajo compromiso: se acredita al paso siguiente.",
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
  operateInB: {
    title: "Operar en B",
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
  },
}

export const audience = {
  kicker: { index: "04", label: "para quién" },
  posterTitle: "Para quién",
  title: "Hecho para empresas de alto valor por persona",
  items: [
    "Tu facturación es alta para la gente que son: corredores, distribuidores, estudios, agencias, importadores.",
    "El método que funciona vive en la cabeza de pocas personas, y los sistemas que tenés registran lo que ya pasó.",
    "Para manejar el doble tendrías que contratar el doble, y eso te pone un techo.",
  ],
  note: "Si tu proyecto es construir una plataforma o un producto digital a medida, mirá Soluciones.",
  noteCta: { label: "Soluciones →", href: "/soluciones" } as Cta,
}

export const finalCta = {
  title: "El diagnóstico se agenda en una llamada",
  cta: { label: "Hablemos", href: "/contacto" } as Cta,
  note: "Cuatro reuniones de una hora y un mapa de oportunidades priorizadas. Se acredita al paso siguiente.",
}
