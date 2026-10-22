import { primaryCta, conversationCta, conversationCtaNote } from "./global"

export const hero = {
  eyebrow: "// servicios → plan empresa",
  posterTitle: "Con nuestro equipo",
  posterAccent: "equipo",
  supportLine: "Central IA se usa sola. Si querés ir más rápido, la implementamos con vos.",
  subhead:
    "Es el plan Empresa. Relevamos el método de tu empresa, armamos el Brain y las skills, preparamos los agentes y operamos la plataforma con vos, por olas de tres meses con alcance cerrado y algo funcionando al final de cada una.",
  ctaPrimary: conversationCta,
  ctaSecondary: primaryCta,
}

export const camino = {
  kicker: { index: "01", label: "el camino" },
  posterTitle: "El camino",
  steps: [
    {
      title: "Primera conversación.",
      description:
        "30 minutos con quien conduce la empresa, sin costo. Vemos qué IA ya usan y dónde quedó trabada, y te mostramos Central IA funcionando. Al final decidís si avanzamos con el Radar.",
    },
    {
      title: "Radar.",
      description:
        "Tres a cuatro horas de reuniones con tu equipo directivo. Entrega un informe con el método relevado, los puntos de dolor, las oportunidades y un plan a dos años. Con ese informe decidís si arrancamos la ola cero.",
    },
    {
      title: "Ola cero, tres meses.",
      description:
        "Deja funcionando el Brain, los permisos y un primer circuito de negocio. Trabajamos con un grupo chico de tu equipo y una reunión por semana, y vas a ver algo andando en las primeras semanas.",
    },
    {
      title: "Olas siguientes y operación.",
      description:
        "Cada ola dura tres meses y termina con algo operando. Entre una y otra decidís si seguís, cambiás el orden o frenás. En paralelo, operamos lo que ya está andando y mantenemos el Brain al día.",
    },
  ],
}

export const diagnosticos = {
  kicker: { index: "02", label: "dos formas de empezar" },
  posterTitle: "Dos formas de empezar",
  cards: [
    {
      title: "Radar",
      lead: "Para dimensionar la ola cero.",
      items: [
        "Tres a cuatro horas de reuniones con el equipo directivo.",
        "Releva el método de tu empresa con el detalle necesario para dimensionar la implementación.",
        "Informe con los puntos de dolor y las oportunidades, en un plan a dos años con datos, habilidades, agentes y herramientas.",
        "Bonificado al implementar la ola cero, de unos tres meses.",
      ],
    },
    {
      title: "Mapa del Método",
      lead: "Para planificar la mejora de toda la empresa.",
      items: [
        "Profundiza en el método de cada área del negocio.",
        "Identifica las principales oportunidades a trabajar en cada una.",
        "Define en detalle el alcance en olas trimestrales.",
        "Bonificado al implementar la ola cero y la ola uno, unos seis meses.",
      ],
    },
  ],
}

export const olaCero = {
  kicker: { index: "03", label: "la ola cero por dentro" },
  posterTitle: "La ola cero",
  intro: "Al terminar los tres meses, en tu empresa queda:",
  items: [
    "Tu empresa dada de alta en Central IA, con sus usuarios.",
    "El Brain inicial en tres frentes: personas y roles, procesos, y criterios de decisión.",
    "Los permisos y los responsables de cada tema.",
    "Las licencias de IA que ya tienen, conectadas al Brain.",
    "Un primer circuito de negocio operando, elegido en el Radar.",
  ],
}

export const principios = {
  kicker: { index: "04", label: "cómo trabajamos" },
  posterTitle: "Principios",
  items: [
    "Valor para el negocio cada una o dos semanas.",
    "Primero velocidad, después optimización.",
    "Cada tema del Brain tiene un para qué.",
    "La velocidad la elige la empresa.",
  ],
}

export const roles = {
  kicker: { index: "05", label: "quién hace qué" },
  posterTitle: "Quién hace qué",
  cards: [
    {
      title: "De tu lado",
      items: [
        "Quien conduce la empresa, como sponsor con autoridad.",
        "Una persona de sistemas como interlocutor.",
        "Un responsable por cada tema del Brain.",
      ],
    },
    {
      title: "Del nuestro",
      items: [
        "Un perfil de datos, que releva dónde está la información y entra área por área.",
        "Arquitectura y conducción técnica.",
        "Construcción de agentes.",
        "Procesos y adopción.",
      ],
    },
  ],
}

export const primerPaso = {
  kicker: { index: "06", label: "el primer paso" },
  posterTitle: "Un paso acotado",
  intro: "El primer compromiso es chico, tiene precio fijo y deja un informe que sirve aunque la decisión sea frenar ahí.",
  cards: [
    {
      title: "Qué se aprueba",
      items: [
        "Un Radar: tres a cuatro horas de tu equipo directivo.",
        "Un informe escrito que queda en la empresa: método relevado, puntos de dolor, oportunidades y plan a dos años.",
        "El Radar se bonifica completo al implementar la ola cero.",
        "Entre ola y ola hay un punto de decisión para seguir, reordenar o frenar.",
      ],
    },
    {
      title: "Qué riesgo baja",
      items: [
        "La información de la empresa pasa a trabajarse en un espacio con usuarios corporativos y permisos.",
        "La empresa define quién lee y quién escribe en cada tema.",
        "Se aprovechan las licencias de IA que ya se pagan.",
        "Todo lo que llega a un cliente pasa antes por una persona.",
      ],
    },
  ],
}

export const finalCta = {
  title: "Empecemos por conversar",
  cta: conversationCta,
  secondary: primaryCta,
  note: conversationCtaNote,
}
