import type { Cta, Vertical } from "./types"
import { primaryCta, conversationCtaNote } from "./global"
import { imagenes, type Imagen } from "./imagenes"

/**
 * Home, octubre 2026 (segunda vuelta). Pedido del dueño: menos plataforma a la vista y más la venta de un
 * proceso grande para empresas grandes. Quien decide tiene que ver tres cosas: una infraestructura sobre la
 * que se construye todo ordenado, agentes que van tomando trabajo, y un equipo que implementa y acompaña
 * de punta a punta.
 */

export const hero = {
  eyebrow: "// consultoría e implementación de IA",
  posterTitle: "La IA de tu empresa, de punta a punta",
  posterAccent: "de punta a punta",
  supportLine: "Ponemos la infraestructura, construimos los agentes y te acompañamos en cada etapa.",
  subhead:
    "Un solo equipo responsable de todo el proceso: relevamos cómo trabaja tu empresa, ordenamos lo que sabe, sumamos agentes que toman el trabajo que se repite y los operamos con vos, ola tras ola.",
  ctaPrimary: primaryCta,
  note: conversationCtaNote,
  rails: [
    { from: "licencias sueltas", to: "IA de toda la empresa", vertical: "company" as Vertical, note: "adopción" },
    { from: "cada uno por su cuenta", to: "permisos por persona", vertical: "company" as Vertical, note: "control" },
  ],
}

/**
 * Manifiesto: se enciende palabra por palabra al entrar en pantalla. Cada frase puede llevar una foto chica
 * incrustada en la línea, después de su texto.
 */
export const manifiesto = {
  kicker: { index: "01", label: "qué hacemos" },
  frases: [
    { texto: "Una base ordenada donde vive lo que sabe tu empresa.", foto: imagenes.rolesTuLado },
    { texto: "Agentes que toman el trabajo que se repite.", foto: imagenes.rolesNuestro },
    { texto: "Y un equipo senior que lo implementa con el tuyo, y se queda.", foto: imagenes.equipoFondo },
  ] as { texto: string; foto: Imagen }[],
}

export const antesDespues = {
  kicker: { index: "02", label: "dónde estás hoy" },
  posterTitle: "De IA suelta a IA de toda la empresa",
  posterAccent: "toda la empresa",
  intro:
    "Tu empresa ya usa IA: licencias repartidas, asistentes personales y alguna automatización por área. Funciona, pero cada uno por su lado.",
  hoyLabel: "Hoy",
  despuesLabel: "Con INNOV.AS",
  filas: [
    {
      hoy: "La IA quedó en una o dos personas. Si se van, se la llevan.",
      despues: "Lo que saben queda en la empresa y le sirve a todo el equipo.",
    },
    {
      hoy: "Cualquiera le enseña a la IA, sin criterio.",
      despues: "Cada tema tiene quién lo escribe, quién lo lee y quién lo aprueba.",
    },
    {
      hoy: "Datos de clientes en cuentas personales y aplicaciones sueltas.",
      despues: "Todo en un espacio propio de la empresa, con permisos y registro.",
    },
    {
      hoy: "Pilotos que nunca pasan del piloto.",
      despues: "Circuitos de negocio operando, uno nuevo en cada ola.",
    },
  ],
}

export const oferta = {
  kicker: { index: "03", label: "lo que contratás" },
  posterTitle: "Tres capas, un responsable",
  posterAccent: "un responsable",
  intro:
    "No es una licencia ni un proyecto suelto. Es la infraestructura, los agentes y el equipo, con una sola relación de punta a punta.",
  cards: [
    {
      etiqueta: "infraestructura",
      titulo: "La base sobre la que se construye todo",
      texto:
        "Central IA, nuestra plataforma, ordena el conocimiento, los accesos y los sistemas de tu empresa. Cada agente nuevo se apoya en lo que ya está, con las mismas reglas.",
      foto: imagenes.estructura,
      cta: { label: "Conocé Central IA", href: "/central-ia" } as Cta,
    },
    {
      etiqueta: "agentes",
      titulo: "Agentes que toman trabajo",
      texto:
        "Diseñados con tu equipo para tareas concretas: cotizar, revisar legajos, responder, hacer seguimiento. Trabajan con tus sistemas y tu gente aprueba lo importante.",
      foto: imagenes.operacion,
      cta: { label: "Ver ejemplos", href: "#agentes" } as Cta,
    },
    {
      etiqueta: "equipo",
      titulo: "Un equipo que te acompaña",
      texto:
        "Consultores senior que relevan, implementan y operan con vos. Están desde la primera reunión hasta la operación de todos los días.",
      foto: imagenes.taller,
      cta: { label: "Ver servicios", href: "/servicios" } as Cta,
    },
  ],
}

/** Capas que se van encendiendo a medida que avanza el recorrido (de abajo hacia arriba). */
export const capas = [
  "Infraestructura y accesos",
  "El conocimiento de la empresa",
  "Primer agente en producción",
  "Agentes en más áreas",
  "Operación y mejora continua",
]

export const recorrido = {
  kicker: { index: "04", label: "cómo trabajamos" },
  posterTitle: "Un proceso, no un proyecto",
  posterAccent: "proceso",
  intro:
    "Cada etapa deja algo funcionando y prepara la siguiente. Vos decidís la velocidad. Nosotros estamos en cada paso.",
  capasTitulo: "Lo que ya está funcionando",
  entregaLabel: "Qué te llevás",
  equipoLabel: "Quiénes están",
  etapas: [
    {
      nombre: "Primera conversación",
      duracion: "30 minutos",
      texto:
        "Quien conduce la empresa y nuestro equipo. Vemos qué IA ya usan, dónde quedó trabada y qué tendría sentido mover primero.",
      entrega: "Un primer mapa de dónde está tu empresa con la IA.",
      equipo: "Socios de INNOV.AS y quien conduce la empresa.",
      capas: { encendidas: 0, planeadas: 0 },
    },
    {
      nombre: "Radar",
      duracion: "3 a 4 horas",
      texto:
        "Relevamos con tu equipo directivo cómo se reparte el negocio, dónde está el volumen y qué decisiones lo mueven. Ponderamos cada oportunidad por su impacto y por cuánto se repite.",
      entrega: "Un informe con el método relevado, las oportunidades priorizadas y un plan a dos años.",
      equipo: "Tu equipo directivo y nuestros consultores senior.",
      capas: { encendidas: 0, planeadas: 5 },
    },
    {
      nombre: "Ola cero",
      duracion: "3 meses",
      texto:
        "Instalamos la base: Central IA en tu empresa, los accesos de cada persona, el Brain con lo que sabe tu empresa y un primer circuito de negocio, elegido en el Radar.",
      entrega: "La infraestructura andando y un primer agente trabajando con tu equipo.",
      equipo: "Un grupo chico de tu área, nuestro perfil de datos y quien construye los agentes.",
      capas: { encendidas: 3, planeadas: 5 },
    },
    {
      nombre: "Olas",
      duracion: "cada 3 meses",
      texto:
        "Cada ola suma un circuito de negocio con sus agentes. Se implementa, se mide y se pasa al siguiente. Entre una ola y otra decidís si acelerás, cambiás el orden o frenás.",
      entrega: "Un circuito nuevo operando por ola, con su medición.",
      equipo: "Los responsables de cada área y el equipo de INNOV.AS que contrataste.",
      capas: { encendidas: 4, planeadas: 5 },
    },
    {
      nombre: "Operación continua",
      duracion: "siempre",
      texto:
        "Mantenemos el Brain al día, ajustamos los agentes con el uso, cuidamos el costo de cada operación y sumamos lo que cambia en tu empresa.",
      entrega: "IA que mejora con el uso, y un equipo que responde.",
      equipo: "Tu gente en el día a día, con nuestro equipo detrás.",
      capas: { encendidas: 5, planeadas: 5 },
    },
  ],
}

export const agentes = {
  kicker: { index: "05", label: "agentes en el trabajo" },
  posterTitle: "Agentes que toman trabajo",
  posterAccent: "trabajo",
  intro:
    "Cada agente se diseña con tu equipo para una tarea concreta y trabaja con los sistemas que ya usás. Tu gente decide, los agentes ejecutan.",
  agenteLabel: "El agente",
  genteLabel: "Tu gente",
  rubros: [
    {
      nombre: "Seguros",
      tareas: [
        {
          titulo: "Cotizaciones",
          agente: "Arma la cotización con los datos del cliente y las condiciones de cada aseguradora.",
          gente: "El productor la revisa y la envía.",
        },
        {
          titulo: "Siniestros",
          agente: "Ordena la denuncia, pide lo que falta y arma el legajo.",
          gente: "El analista define el curso.",
        },
        {
          titulo: "Renovaciones",
          agente: "Detecta vencimientos, prepara la propuesta y agenda el contacto.",
          gente: "El ejecutivo la aprueba antes de que salga.",
        },
      ],
    },
    {
      nombre: "Servicios financieros",
      tareas: [
        {
          titulo: "Legajos",
          agente: "Reúne la documentación de cada cliente y la controla contra la política de la empresa.",
          gente: "Cumplimiento aprueba las excepciones.",
        },
        {
          titulo: "Análisis de crédito",
          agente: "Prepara el análisis con la información interna y la de fuentes externas.",
          gente: "El comité decide.",
        },
        {
          titulo: "Cobranzas",
          agente: "Prioriza la cartera, redacta cada gestión y registra la respuesta.",
          gente: "El equipo aprueba los acuerdos de pago.",
        },
      ],
    },
    {
      nombre: "Estudios jurídicos",
      tareas: [
        {
          titulo: "Expedientes",
          agente: "Resume cada novedad y la deja en la ficha del caso.",
          gente: "El abogado a cargo la valida.",
        },
        {
          titulo: "Escritos",
          agente: "Arma el primer borrador con los modelos y los criterios del estudio.",
          gente: "El socio lo revisa y lo firma.",
        },
        {
          titulo: "Plazos",
          agente: "Sigue los vencimientos y avisa con tiempo a quien corresponde.",
          gente: "Cada responsable confirma la acción.",
        },
      ],
    },
    {
      nombre: "Toda la empresa",
      tareas: [
        {
          titulo: "Atención comercial",
          agente: "Responde consultas con los criterios y precios vigentes, y registra cada contacto.",
          gente: "Ventas toma los casos que piden una persona.",
        },
        {
          titulo: "Compras",
          agente: "Compara proveedores con los criterios de la empresa y arma la recomendación.",
          gente: "El responsable de compras decide.",
        },
        {
          titulo: "Altas y bajas",
          agente: "Cuando alguien entra o se va, prepara sus accesos y avisa a cada área.",
          gente: "Recursos humanos lo confirma.",
        },
      ],
    },
  ],
}

export const control = {
  kicker: { index: "06", label: "control" },
  frase: "Tu gente decide, los agentes ejecutan.",
  intro:
    "Las reglas no quedan en un documento: las hace cumplir la infraestructura, igual para todas las personas y todos los agentes, todos los días.",
  foto: imagenes.reunionControl,
  items: [
    { titulo: "Cada uno ve lo suyo", texto: "Permisos por persona, por tema y por documento." },
    { titulo: "El agente no ve de más", texto: "Trabaja con los mismos permisos de quien lo usa." },
    { titulo: "Lo que sale, lo aprueba una persona", texto: "Ningún mail llega a un cliente sin una aprobación." },
    { titulo: "Todo queda registrado", texto: "Cada acción y su costo, en un registro que no se edita." },
  ],
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
    "Kimberly-Clark",
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
  posterTitle: "Un equipo senior, en tu mesa",
  posterAccent: "en tu mesa",
  body:
    "Somos un equipo senior con 25 años transformando más de 150 organizaciones en 14 países, en consumo masivo, educación, agro, organismos internacionales y sector público. Trabajamos en español y directamente con quien conduce la empresa.",
  body2:
    "Y usamos lo mismo que vendemos: nuestra área comercial trabaja todos los días sobre Central IA, con un agente que investiga, redacta y espera que una persona lo apruebe antes de enviar. En la demo te lo mostramos funcionando.",
  cta: { label: "Conocenos →", href: "/nosotros" } as Cta,
}

export const faqSection = {
  kicker: { index: "08", label: "preguntas frecuentes" },
  posterTitle: "Preguntas",
}

export const finalCta = {
  title: "Hablemos de tu empresa",
  cta: primaryCta,
  note: conversationCtaNote,
}

/** Los tres dolores de la versión anterior del home. Los usa components/home-portada.tsx (hoy fuera del home). */
export const dolores = {
  kicker: { index: "01", label: "dónde estás hoy" },
  posterTitle: "IA por todos lados",
  intro:
    "Tu empresa ya usa IA: licencias repartidas, asistentes personales y alguna automatización por área. Funciona, pero cada uno por su lado. El paso que sigue es ordenarla.",
  cards: [
    {
      illustration: "dolorAdopcion",
      title: "La IA quedó en una o dos personas",
      description:
        "Alguien del equipo avanzó mucho con su asistente: tableros, rutinas, criterios. Todo eso vive en su cuenta. El resto sigue arrancando de cero, y si esa persona se va, se lo lleva.",
    },
    {
      illustration: "dolorEscritura",
      title: "La IA aprende de todos, sin filtro",
      description:
        "Cuando cualquiera puede enseñarle a la IA de la empresa, aprende de todo: lo que está bien y lo que no. Hace falta definir quién escribe en cada tema, quién lee y quién aprueba.",
    },
    {
      illustration: "dolorFuga",
      title: "Lo confidencial, en cuentas personales",
      description:
        "Datos de clientes y números de la empresa pasan por cuentas personales de IA. Y cada aplicación hecha adentro tiene su propia base y su propio acceso.",
    },
  ],
  closing: "Los ordenamos con tu equipo.",
  closingAccent: "ordenamos",
} as const
