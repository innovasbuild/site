import type { Cta, Dato } from "./types"

export const hero = {
  eyebrow: "// nosotros → terreno",
  posterTitle: "Probado en terreno",
  posterAccent: "terreno",
  title: "Ingeniería de transformación, probada en el terreno",
  subhead:
    "INNOV.AS nace de años de construir tecnología para quienes menos margen de error tienen: organismos internacionales, sector público y empresas en plena transformación. Hoy ejecutamos esa experiencia como firma: el mismo equipo senior diseña, construye y opera.",
  ctaPrimary: { label: "Hablemos", href: "/contacto" } as Cta,
}

export const history = {
  kicker: { index: "01", label: "credenciales" },
  posterTitle: "Lo que hicimos",
  title: "Lo que hicimos nos define",
  body: "Ejecutamos proyectos end-to-end — diseño, datos, IA y soporte — para bancos, gobierno, ONGs y empresas de consumo masivo en la región: plataformas de datos territoriales, análisis satelital, sistemas de trazabilidad y automatización de procesos." as Dato,
  bodyDato: "Más de 150 proyectos / +25 años / +10 países" as Dato,
  stats: [
    { value: 150, suffix: "+", label: "proyectos", tone: "company" as const },
    { value: 25, suffix: "+", label: "años", tone: "ink" as const },
    { value: 10, suffix: "+", label: "países", tone: "people" as const },
  ],
  closing:
    "Esa experiencia formó nuestra manera de trabajar: arquitectura que escala, datos estructurados, trazabilidad total y cero tolerancia a los proyectos que quedan en piloto.",
}

export const team = {
  kicker: { index: "02", label: "misión y equipo" },
  posterTitle: "Por qué existimos",
  title: "Por qué existimos",
  mission:
    "Ejecutamos transformación con IA para organizaciones que no pueden darse el lujo de experimentar. Medimos el éxito por el resultado de negocio de nuestros clientes — no por horas facturadas ni por funcionalidades entregadas.",
  intro:
    "Somos un equipo chico y estable: arquitectos de producto e ingenieros con roles fijos. Cada integrante responde por un tramo del sistema de punta a punta.",
  focus: [
    {
      title: "Arquitectura de soluciones",
      description:
        "Diseño de sistemas multi-tenant, agentes de IA y automatización con gobernanza — pensados para escalar, no para la próxima demo.",
    },
    {
      title: "Datos y adopción",
      description:
        "Datos estructurados como contrato entre sistemas, y acompañamiento a los champions internos que sostienen el cambio adentro de la organización.",
    },
  ],
}

export const principles = {
  kicker: { index: "03", label: "cómo pensamos" },
  posterTitle: "Principios",
  title: "Principios",
  items: [
    "Infraestructura primero, features después. Lo estructural bien hecho paga para siempre.",
    "La adopción es el producto. Un sistema que nadie usa es un gasto con interfaz.",
    "Determinístico donde hay que ser exactos, IA donde hay que tener criterio.",
    "Validar rápido en el mercado le gana a planificar perfecto en el pizarrón.",
  ],
}

export const finalCta = {
  title: "¿Querés trabajar con nosotros?",
  cta: { label: "Hablemos", href: "/contacto" } as Cta,
}
