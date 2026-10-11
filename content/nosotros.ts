import type { Cta } from "./types"
import { primaryCta } from "./global"

export const hero = {
  eyebrow: "// nosotros → terreno",
  posterTitle: "Probado en terreno",
  posterAccent: "terreno",
  subhead:
    "INNOV.AS nace de años de construir tecnología para organizaciones con poco margen de error. De esa experiencia sale Central IA: la plataforma que ordena la adopción de IA en la empresa, y el equipo que la implementa.",
  ctaPrimary: primaryCta,
}

export const why = {
  kicker: { index: "01", label: "por qué central ia" },
  posterTitle: "Por qué la construimos",
  body:
    "Vimos a las empresas llenarse de IA suelta: licencias repartidas, asistentes personales, automatizaciones por área. Y vimos que la gobernanza escrita en un documento dura poco.",
  lead: "Por eso la pusimos en el producto: los permisos, las aprobaciones y el registro los hace cumplir la plataforma.",
}

export const history = {
  kicker: { index: "02", label: "de dónde venimos" },
  posterTitle: "De dónde venimos",
  body:
    "Llevamos 25 años transformando más de 150 organizaciones en 14 países. Plataformas de datos territoriales, análisis satelital, comercio electrónico de consumo masivo y plataformas educativas, para empresas, organismos internacionales y sector público.",
  closing:
    "Esa experiencia formó nuestra manera de trabajar: arquitectura que escala, datos estructurados, trazabilidad total y proyectos que llegan a operar.",
  link: { label: "También construimos a medida →", href: "/proyectos" } as Cta,
}

export const team = {
  kicker: { index: "03", label: "equipo" },
  posterTitle: "Cómo es el equipo",
  intro:
    "Somos un equipo chico y estable: arquitectos de producto e ingenieros con roles fijos. Quienes diseñan son quienes construyen y operan, y trabajan aumentados con agentes.",
  focus: [
    {
      title: "Arquitectura de soluciones",
      description: "Sistemas multi-tenant, agentes de IA y automatización con gobernanza, pensados para escalar.",
    },
    {
      title: "Datos y adopción",
      description:
        "Datos estructurados como contrato entre sistemas, y acompañamiento a las personas que sostienen el cambio adentro de la empresa.",
    },
  ],
}

export const principles = {
  kicker: { index: "04", label: "cómo pensamos" },
  posterTitle: "Principios",
  items: [
    "El control va en el producto.",
    "Infraestructura primero, funciones después. Lo estructural bien hecho paga para siempre.",
    "La adopción es el producto: un sistema vale cuando la gente lo usa.",
    "Determinístico donde hay que ser exactos, IA donde hay que tener criterio.",
  ],
}

export const finalCta = {
  title: "Conversemos",
  cta: primaryCta,
}
