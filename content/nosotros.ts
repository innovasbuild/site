import type { Cta, Dato } from "./types"

export const hero = {
  eyebrow: "// nosotros → terreno",
  title: "Ingeniería de transformación, probada en el terreno",
  subhead:
    "INNOV.AS nace de años de construir tecnología para quienes menos margen de error tienen: organismos internacionales, sector público y empresas en plena transformación.",
  ctaPrimary: { label: "Hablemos", href: "/contacto" } as Cta,
}

export const history = {
  kicker: { index: "01", label: "credenciales" },
  title: "Lo que hicimos nos define",
  body: "Ejecutamos proyectos end-to-end — diseño, datos, IA y soporte — para bancos, gobierno, ONGs y empresas de consumo masivo en la región: plataformas de datos territoriales, análisis satelital, sistemas de trazabilidad y automatización de procesos." as Dato,
  bodyDato: "[DATO: N proyectos / N años / N países — confirmar cifras publicables]" as Dato,
  closing:
    "Esa experiencia formó nuestra manera de trabajar: arquitectura que escala, datos estructurados, trazabilidad total y cero tolerancia a los proyectos que quedan en piloto.",
}

export const team = {
  kicker: { index: "02", label: "quiénes somos" },
  title: "Quiénes somos",
  members: [
    {
      name: "Matías O'Keefe — Co-founder & CEO.",
      bio: "Ingeniero, arquitecto de producto y estratega técnico. Lidera la arquitectura de soluciones y la visión de plataforma: sistemas multi-tenant, agentes de IA y automatización con gobernanza. [DATO: 1-2 líneas de bio a validar por Mati]" as Dato,
    },
    {
      name: "Marcos [APELLIDO] — Co-founder.",
      bio: "[DATO: bio y rol a completar por Marcos]" as Dato,
    },
  ],
}

export const principles = {
  kicker: { index: "03", label: "cómo pensamos" },
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
