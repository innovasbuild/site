import type { Cta, Vertical } from "./types"
import { primaryCta, primaryCtaNote, conversationCta } from "./global"

export const hero = {
  eyebrow: "// IA suelta → IA ordenada",
  posterTitle: "Central IA",
  posterAccent: "IA",
  supportLine: "La plataforma que ordena la adopción de IA en tu empresa.",
  subhead:
    "El conocimiento de tu empresa, sus agentes y sus herramientas en un solo lugar, con permisos sobre quién accede a qué. Tu gente trabaja desde la plataforma o desde el asistente que ya usa. Si querés, nuestro equipo la implementa con vos.",
  ctaPrimary: primaryCta,
  ctaSecondary: conversationCta,
  note: primaryCtaNote,
  rails: [
    { from: "licencias sueltas", to: "IA de toda la empresa", vertical: "company" as Vertical, note: "adopción" },
    { from: "cada uno por su cuenta", to: "permisos por persona", vertical: "company" as Vertical, note: "gobierno" },
  ],
}

export const dolores = {
  kicker: { index: "01", label: "dónde estás hoy" },
  posterTitle: "IA por todos lados",
  intro:
    "Tu empresa ya usa IA. Hay licencias repartidas, asistentes personales y alguna automatización por área. El paso que sigue es ordenarla.",
  cards: [
    {
      illustration: "dolorAdopcion",
      title: "La IA quedó en una o dos personas",
      description:
        "Alguien del equipo avanzó mucho con su asistente: tableros, rutinas, criterios. Todo eso vive en su cuenta, y el resto del equipo sigue arrancando de cero.",
    },
    {
      illustration: "dolorEscritura",
      title: "Cualquiera le enseña a la IA de la empresa",
      description:
        "Cuando todos pueden cargarle criterios, el conocimiento se degrada. Hace falta definir quién escribe en cada tema, quién lee y quién aprueba.",
    },
    {
      illustration: "dolorFuga",
      title: "Lo confidencial en cuentas personales",
      description:
        "Hay gente procesando datos de clientes y números de la empresa con su cuenta personal de IA, y aplicaciones hechas adentro, cada una con su base y su ingreso.",
    },
  ],
  closing: "Central IA está hecha para ordenar las tres.",
} as const

export const piezas = {
  kicker: { index: "02", label: "la plataforma" },
  posterTitle: "Tres piezas, un lugar",
  intro:
    "Central IA es la plataforma donde tu empresa entra con sus usuarios y encuentra su conocimiento, sus agentes y sus herramientas. Funciona como el sistema operativo de IA de la empresa.",
  cards: [
    {
      illustration: "piezaBrain",
      title: "Brain",
      description:
        "El conocimiento colectivo de tu empresa: criterios, procesos, mensajes, cuentas, decisiones. Tu gente lo consulta para trabajar y lo alimenta donde le toca aportar. Los agentes trabajan con ese mismo conocimiento.",
    },
    {
      illustration: "piezaAgentes",
      title: "Agentes",
      description:
        "Trabajadores de IA para tareas concretas, preparados en acuerdo con tu empresa. Al definir cada uno se fija qué datos puede usar y qué personas pueden usarlo.",
    },
    {
      illustration: "piezaHerramientas",
      title: "Herramientas",
      description:
        "Tu CRM, tu correo y tus fuentes de datos conectados a la plataforma, con permisos por persona. Cada uno ve y usa las herramientas que le habilitaron, desde la plataforma o desde su asistente.",
    },
  ],
  cta: { label: "Ver la plataforma en detalle →", href: "/central-ia" } as Cta,
} as const

export const gobierno = {
  kicker: { index: "03", label: "gobernanza" },
  posterTitle: "Tu gente decide",
  posterAccent: "decide",
  supportLine: "Tu gente decide, los agentes ejecutan.",
  intro:
    "Los permisos, las aprobaciones y el registro los hace cumplir la plataforma. Valen igual para todas las personas y todos los agentes, todos los días.",
  items: [
    {
      title: "Permisos por carpeta y por página",
      description:
        "Cada persona lee lo que le corresponde y escribe donde le toca aportar. Cuatro niveles: lector, editor, administrador y sin acceso.",
    },
    {
      title: "El agente ve lo mismo que vos",
      description: "En el chat, cada agente actúa con los permisos de la persona que le habla.",
    },
    {
      title: "Lo que sale hacia afuera lo aprueba una persona",
      description:
        "Un mail a un cliente pasa siempre por aprobación humana antes de enviarse. Cuando un agente propone un cambio al Brain, lo aprueba un administrador.",
    },
    {
      title: "Todo queda registrado",
      description: "Cada acción y cada llamada a un modelo quedan asentadas, con su costo, en un registro inalterable.",
    },
  ],
}

export const dosPuertas = {
  kicker: { index: "04", label: "cómo se usa" },
  posterTitle: "Dos puertas",
  supportLine: "Partimos de las licencias que tu empresa ya paga.",
  body:
    "Quien ya trabaja con Claude o ChatGPT conecta Central IA a su asistente por MCP y usa desde ahí lo que la empresa le habilitó. Quien trabaja sin asistente propio entra directo a la plataforma desde el navegador. El contenido y los permisos son los mismos por las dos puertas.",
  rails: [
    { from: "tu Claude o tu ChatGPT", to: "Central IA", vertical: "company" as Vertical, note: "por MCP" },
    { from: "tu navegador", to: "Central IA", vertical: "company" as Vertical, note: "web" },
  ],
}

export const pasos = [
  {
    title: "Creás la cuenta.",
    description:
      "Con el correo de tu empresa, en minutos. Es gratis hasta 3 usuarios y 5 skills.",
  },
  {
    title: "Invitás a tu equipo.",
    description:
      "Definís quién lee y quién escribe en cada carpeta, o abrís el ingreso a todo el dominio de tu empresa.",
  },
  {
    title: "Cargás el Brain.",
    description:
      "Procesos, criterios y las skills que tu equipo repite todos los días, ordenados en carpetas y con responsables.",
  },
  {
    title: "Conectás tu asistente.",
    description:
      "Cada persona suma Central IA a su Claude o su ChatGPT, o entra directo desde el navegador, con sus permisos.",
  },
]

export const empezar = {
  kicker: { index: "05", label: "cómo empezar" },
  posterTitle: "Empezá hoy",
  posterAccent: "hoy",
  intro: "Central IA se usa sola. Tu equipo arranca en una tarde, sin instalar nada.",
  cta: primaryCta,
}

export const servicios = {
  kicker: { index: "06", label: "servicios" },
  posterTitle: "Con nuestro equipo",
  posterAccent: "equipo",
  intro:
    "Si querés ir más rápido, implementamos Central IA con vos. Es el plan Empresa: relevamos el método de tu empresa, armamos el Brain y las skills, preparamos los agentes y operamos la plataforma por olas de tres meses, cada una con algo funcionando al final.",
  items: [
    "Arranca con el Radar: unas horas con tu equipo directivo y un plan a dos años.",
    "Cada ola tiene alcance cerrado y se cotiza antes de empezar.",
    "Entre una ola y la siguiente decidís si seguís, cambiás el orden o frenás.",
  ],
  cta: { label: "Ver servicios →", href: "/servicios" } as Cta,
}

export const trayectoria = {
  stats: [
    { value: 25, suffix: "", label: "años", tone: "company" as const },
    { value: 150, suffix: "+", label: "organizaciones", tone: "ink" as const },
    { value: 14, suffix: "", label: "países", tone: "company" as const },
  ],
  logosLabel: "Organizaciones para las que trabajó nuestro equipo",
  logos: [
    "Lenovo",
    "Kimberly Clark",
    "Pearson Education",
    "McGraw Hill",
    "Despegar.com",
    "Falabella",
    "BID",
    "FAO",
    "SAGyP",
    "SENASA",
    "Google Argentina",
    "Grupo Don Mario",
    "BASF",
  ],
}

export const quienesSomos = {
  kicker: { index: "07", label: "quiénes somos" },
  posterTitle: "Primero, en casa",
  body:
    "INNOV.AS es la primera empresa adentro de Central IA. Nuestro trabajo comercial corre ahí todos los días: el Brain con nuestros criterios, los permisos de cada persona del equipo y un agente de prospección que investiga, redacta, espera la aprobación de una persona y recién entonces envía. En la primera conversación te la mostramos funcionando.",
  body2:
    "Somos un equipo senior con 25 años transformando más de 150 organizaciones en 14 países, en consumo masivo, educación, agro, organismos internacionales y sector público. Trabajamos con empresas pequeñas, medianas y grandes de Latinoamérica, en español y con quien conduce la empresa en la mesa.",
  cta: { label: "Conocenos →", href: "/nosotros" } as Cta,
}

export const faqSection = {
  kicker: { index: "08", label: "preguntas frecuentes" },
  posterTitle: "Preguntas",
}

export const finalCta = {
  title: "Ordená la IA de tu empresa",
  cta: primaryCta,
  secondary: conversationCta,
  note: primaryCtaNote,
}
