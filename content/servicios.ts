import { primaryCta, conversationCtaNote } from "./global"
import { imagenes, type Imagen } from "./imagenes"

/**
 * Servicios, octubre 2026 (venta enterprise). Mismo pedido que el home: quien decide tiene que ver un equipo
 * que acompaña de punta a punta. Contenido tomado del brain (producto/proceso-de-implementacion,
 * company/innov-overview y marketing/mensajes-innovas). Respeta las secciones del sitio publicado: el camino,
 * dos formas de empezar, la ola cero, cómo trabajamos, quién hace qué, el primer paso y preguntas.
 */

export const hero = {
  eyebrow: "// servicios → de punta a punta",
  posterTitle: "Un equipo que se sienta con el tuyo",
  posterAccent: "con el tuyo",
  subhead:
    "Implementamos la IA en tu empresa de punta a punta: relevamos cómo trabaja, ordenamos lo que sabe, construimos los agentes y los operamos con vos. Por olas de tres meses, cada una con un circuito de negocio funcionando al final.",
  ctaPrimary: primaryCta,
  note: conversationCtaNote,
  fotos: [imagenes.heroServicios],
}

/** El camino de punta a punta, en detalle. Mismos cinco nombres que el home. */
export const camino = {
  kicker: { index: "01", label: "el camino" },
  posterTitle: "De la primera charla a la operación",
  posterAccent: "operación",
  intro:
    "El objetivo es que la IA quede trabajando en tu negocio, no en un piloto. Cada etapa deja algo funcionando y termina en una decisión tuya: vos elegís la velocidad.",
  etapaLabel: "Etapa",
  campos: {
    pasa: "Qué pasa",
    llevas: "Qué te llevás",
    pide: "Qué le pide a tu equipo",
    decision: "Al terminar, decidís",
  },
  etapas: [
    {
      nombre: "Primera conversación",
      duracion: "30 minutos",
      pasa: "Quien conduce la empresa y nuestro equipo. Vemos qué IA ya usan, dónde quedó trabada y qué tendría sentido mover primero.",
      llevas: "Un primer mapa de dónde está tu empresa con la IA.",
      pide: "Media hora de quien conduce la empresa.",
      decision: "Si hacemos el Radar.",
    },
    {
      nombre: "Radar",
      duracion: "3 a 4 horas",
      pasa: "Relevamos con tu equipo directivo cómo se reparte el negocio, dónde está el volumen y qué decisiones lo mueven.",
      llevas: "Un informe con el método relevado, los puntos de dolor, las oportunidades priorizadas y un plan a dos años.",
      pide: "Tres a cuatro horas de reuniones con el equipo directivo.",
      decision: "Si arrancamos la ola cero, con qué circuito y a qué velocidad.",
    },
    {
      nombre: "Ola cero",
      duracion: "3 meses",
      pasa: "Instalamos la base: Central IA en tu empresa, los accesos de cada persona, el Brain inicial y un primer circuito de negocio.",
      llevas: "La infraestructura andando y un primer agente trabajando con tu equipo.",
      pide: "Un grupo chico del área elegida y una reunión de trabajo por semana.",
      decision: "Qué ola sigue, o si frenás acá.",
    },
    {
      nombre: "Olas",
      duracion: "cada 3 meses",
      pasa: "Cada ola suma un circuito de negocio con sus agentes y sube de escalón los datos que lo alimentan. Se implementa, se hace visible y se mide antes de pasar al siguiente.",
      llevas: "Un circuito nuevo operando por ola, con su medición.",
      pide: "El responsable del área de cada ola y su equipo.",
      decision: "Si acelerás, cambiás el orden o frenás.",
    },
    {
      nombre: "Operación continua",
      duracion: "siempre",
      pasa: "El Brain sigue vivo: cada cambio en tu empresa entra al día siguiente. Una ronda de entrevistas por equipo cada seis meses.",
      llevas: "IA que mejora con el uso y un equipo detrás que la conoce.",
      pide: "Tu gente trabajando como siempre.",
      decision: "Qué más sumar, cuando lo necesites.",
    },
  ],
}

/** Los dos diagnósticos, comparados fila por fila. */
export const dosFormas = {
  kicker: { index: "02", label: "dos formas de empezar" },
  posterTitle: "Empezá por un diagnóstico",
  posterAccent: "diagnóstico",
  intro: "Los dos tienen precio fijo y dejan un informe escrito que queda en tu empresa, aunque la decisión sea frenar ahí.",
  filas: ["Para qué", "Cuánto le pide a tu equipo", "Qué entrega", "Se bonifica"],
  opciones: [
    {
      nombre: "Radar",
      etiqueta: "El más elegido",
      foto: imagenes.manifiestoBase,
      valores: [
        "Para dimensionar la ola cero y saber por dónde empezar.",
        "Tres a cuatro horas de reuniones con el equipo directivo.",
        "El método relevado, los puntos de dolor, las oportunidades y un plan a dos años.",
        "Completo, al implementar la ola cero.",
      ],
    },
    {
      nombre: "Mapa del Método",
      etiqueta: "Para toda la empresa",
      foto: imagenes.oficinaAbierta,
      valores: [
        "Para planificar la mejora de toda la empresa, área por área.",
        "Entrevistas con cada área del negocio.",
        "Las oportunidades de cada área y el alcance detallado de cada ola trimestral.",
        "Completo, al implementar la ola cero y la ola uno.",
      ],
    },
  ],
}

/** Qué deja funcionando la ola cero. Primero lo blando, después lo duro. */
export const olaCero = {
  kicker: { index: "03", label: "la ola cero por dentro" },
  posterTitle: "Tres meses que dejan la base",
  posterAccent: "la base",
  intro: "Al terminar la ola cero, en tu empresa queda:",
  funcionandoLabel: "Funcionando",
  meses: ["Mes 1", "Mes 2", "Mes 3"],
  items: [
    { titulo: "Central IA instalada", texto: "Tu empresa dada de alta, con el ingreso de cada persona con su cuenta de la empresa." },
    { titulo: "El Brain en tres frentes", texto: "Personas y roles, procesos, y los criterios con los que se decide." },
    { titulo: "Permisos y responsables", texto: "Quién lee, quién escribe y quién aprueba en cada tema." },
    { titulo: "Tus licencias de IA, conectadas", texto: "Las que ya pagan, trabajando con lo que sabe la empresa." },
    { titulo: "Un primer circuito operando", texto: "El que se eligió en el Radar, con su agente y su medición." },
  ],
  nota: "Arrancamos por lo blando (criterios, manuales, decisiones) y después conectamos los sistemas.",
}

/** Banda de foto con la forma de trabajar. */
export const principios = {
  kicker: { index: "04", label: "cómo trabajamos" },
  frase: "Algo andando cada una o dos semanas.",
  intro: "El gran proyecto que entrega todo al final queda descartado por diseño. Salimos andando y mejoramos con el uso.",
  foto: imagenes.comoTrabajamos as Imagen,
  items: [
    { titulo: "Primero velocidad", texto: "Salimos con lo resuelto y optimizamos con datos de uso." },
    { titulo: "Cada tema con un para qué", texto: "Antes de cargar algo al Brain definimos a quién le sirve y cuándo." },
    { titulo: "Lo imperfecto, con norte", texto: "Arrancamos con una parte de cada tema y el camino para completarlo." },
    { titulo: "La velocidad la elegís vos", texto: "El mapa define qué hay para hacer. Cuánto por mes, lo decidís en cada ola." },
  ],
}

export const roles = {
  kicker: { index: "05", label: "quién hace qué" },
  posterTitle: "Quién se sienta en la mesa",
  posterAccent: "en la mesa",
  lados: [
    {
      titulo: "De tu lado",
      tono: "gente" as const,
      foto: imagenes.rolesTuLado,
      /** Las fotos son verticales: se recortan en 16:9, y esta posición decide qué franja queda a la vista. */
      posicion: "object-[50%_30%]",
      items: [
        { rol: "Quien conduce la empresa", texto: "Es el sponsor. Destraba cuando un área dice que sí y sigue igual." },
        { rol: "Una persona de sistemas", texto: "Nuestro interlocutor: qué se resuelve entre equipos y qué se eleva." },
        { rol: "Alguien de procesos", texto: "Con llegada a todas las áreas y buen trato con la gente." },
        { rol: "Un responsable por tema", texto: "Cuida el contenido de su parte del Brain." },
      ],
    },
    {
      titulo: "Del nuestro",
      tono: "equipo" as const,
      foto: imagenes.rolesNuestro,
      posicion: "object-[50%_45%]",
      items: [
        { rol: "Datos", texto: "Llega primero: releva dónde está la información y entra área por área." },
        { rol: "Arquitectura y conducción técnica", texto: "Diseña la base y responde por todo lo que se construye encima." },
        { rol: "Construcción de agentes", texto: "Arma cada agente con el equipo que hace la tarea." },
        { rol: "Procesos y adopción", texto: "Acompaña a tu gente hasta que lo nuevo es la forma de trabajar." },
      ],
    },
  ],
}

/** El primer paso: qué se aprueba y qué riesgo baja. */
export const primerPaso = {
  kicker: { index: "06", label: "el primer paso" },
  titulo: "Un paso acotado",
  intro: "El primer compromiso es chico, tiene precio fijo y deja un informe que sirve aunque la decisión sea frenar ahí.",
  foto: imagenes.conversacion,
  columnas: [
    {
      titulo: "Qué se aprueba",
      items: [
        "Un Radar: tres a cuatro horas de tu equipo directivo.",
        "Un informe escrito que queda en la empresa: método relevado, puntos de dolor, oportunidades y plan a dos años.",
        "El Radar se bonifica completo al implementar la ola cero.",
        "Entre ola y ola hay un punto de decisión para seguir, reordenar o frenar.",
      ],
    },
    {
      titulo: "Qué riesgo baja",
      items: [
        "La información de la empresa pasa a trabajarse en un espacio con usuarios corporativos y permisos.",
        "La empresa define quién lee y quién escribe en cada tema.",
        "Se aprovechan las licencias de IA que ya se pagan.",
        "Todo lo que llega a un cliente pasa antes por una persona.",
      ],
    },
  ],
}

export const faqSection = {
  kicker: { index: "07", label: "preguntas frecuentes" },
  posterTitle: "Preguntas",
}

export const finalCta = {
  title: "Empecemos por conversar",
  cta: primaryCta,
  note: conversationCtaNote,
}
