import type { Cta } from "./types"
import { primaryCta, conversationCta, conversationCtaNote } from "./global"
import { imagenes, type Imagen } from "./imagenes"

/**
 * Nosotros, octubre 2026 (venta enterprise). Regla del brain (company/innov-overview): sin nombres ni bios del
 * equipo; la experiencia se dice en conjunto (25 años, más de 150 organizaciones, 14 países). Las fotos son de
 * ambiente y no se presentan como el equipo real.
 */

export const hero = {
  eyebrow: "// nosotros → en terreno",
  posterTitle: "Veinticinco años en terreno",
  posterAccent: "en terreno",
  subhead:
    "Somos un equipo senior de producto, datos e ingeniería. Llevamos años haciendo que la tecnología llegue a operar en organizaciones con poco margen de error. De ahí sale Central IA, y la forma en que la implementamos.",
  ctaPrimary: conversationCta,
  ctaSecondary: primaryCta,
  foto: imagenes.techoVidrio,
}

/** Por qué existimos: tres frases que se encienden, con una foto chica en píldora al final de cada una. */
export const porQue = {
  kicker: { index: "01", label: "por qué existimos" },
  frases: [
    { texto: "Vimos a las empresas llenarse de IA suelta.", foto: imagenes.rolesTuLado },
    { texto: "Vimos que las reglas escritas en un documento duran poco.", foto: imagenes.rolesNuestro },
    { texto: "Por eso las pusimos en la infraestructura, y nos sentamos a implementarla con cada empresa.", foto: imagenes.equipoFondo },
  ] as { texto: string; foto: Imagen }[],
}

export const trayectoria = {
  kicker: { index: "02", label: "de dónde venimos" },
  posterTitle: "Tecnología que llega a operar",
  posterAccent: "operar",
  body:
    "Construimos plataformas de datos territoriales, análisis satelital, comercio electrónico de consumo masivo y plataformas educativas, para empresas, organismos internacionales y sector público.",
  closing:
    "Esa experiencia formó nuestra manera de trabajar: arquitectura que escala, datos ordenados, todo registrado y proyectos que terminan operando.",
  cifras: [
    { value: 25, suffix: "", label: "años", texto: "construyendo tecnología para organizaciones con poco margen de error." },
    { value: 150, suffix: "+", label: "organizaciones", texto: "empresas, organismos internacionales y sector público." },
    { value: 14, suffix: "", label: "países" },
  ] as { value: number; suffix: string; label: string; texto?: string }[],
  link: { label: "También construimos a medida →", href: "/proyectos" } as Cta,
}

/** El equipo: foto a un lado, cómo trabajamos y los cuatro perfiles al otro. */
export const equipo = {
  kicker: { index: "03", label: "el equipo" },
  titulo: "Quienes diseñan, construyen y operan",
  texto:
    "Somos un equipo chico y estable, con roles fijos. Trabajás con las mismas personas desde la primera reunión hasta la operación, sin capas en el medio, y con agentes que nos aumentan en cada entrega.",
  foto: imagenes.equipoFondo,
  perfiles: [
    { titulo: "Datos", texto: "Releva dónde está la información y la ordena." },
    { titulo: "Arquitectura", texto: "Diseña la base que escala y responde por ella." },
    { titulo: "Agentes", texto: "Construye cada agente con quien hace la tarea." },
    { titulo: "Procesos y adopción", texto: "Acompaña a la gente hasta que lo nuevo queda." },
  ],
}

/** Usamos lo que vendemos: el agente comercial de INNOV.AS, paso a paso. */
export const loUsamos = {
  kicker: { index: "04", label: "usamos lo que vendemos" },
  posterTitle: "Nuestra área comercial ya trabaja así",
  posterAccent: "así",
  intro:
    "Todos los días, sobre Central IA. Un agente prepara el trabajo y una persona decide. En la demo te lo mostramos funcionando.",
  pasos: [
    { nombre: "Investiga", texto: "Lee la cuenta y lo que sabemos de su rubro en nuestro Brain.", quien: "agente" as const },
    { nombre: "Redacta", texto: "Arma el mensaje con nuestra voz y nuestras reglas.", quien: "agente" as const },
    { nombre: "Espera", texto: "Nada sale sin que una persona del equipo lo apruebe.", quien: "gente" as const },
    { nombre: "Registra", texto: "Queda cada paso, quién lo aprobó y cuánto costó.", quien: "agente" as const },
  ],
  agenteLabel: "El agente",
  genteLabel: "Una persona",
}

export const principios = {
  kicker: { index: "05", label: "cómo pensamos" },
  posterTitle: "Cuatro ideas que no negociamos",
  posterAccent: "no negociamos",
  items: [
    {
      frase: "El control va en el producto.",
      texto: "Los permisos, las aprobaciones y el registro los hace cumplir la infraestructura, no un documento.",
    },
    {
      frase: "Infraestructura primero.",
      texto: "Lo estructural bien hecho paga para siempre: cada agente nuevo se apoya en lo que ya está.",
    },
    {
      frase: "La adopción es el producto.",
      texto: "Un sistema vale cuando la gente lo usa. Por eso trabajamos con tu equipo, no alrededor.",
    },
    {
      frase: "Exactos donde no hay margen.",
      texto: "Reglas fijas donde hay que ser exactos, IA donde hace falta criterio.",
    },
  ],
}

export const finalCta = {
  title: "Conocé al equipo que va a trabajar con vos",
  cta: conversationCta,
  secondary: primaryCta,
  note: conversationCtaNote,
}
