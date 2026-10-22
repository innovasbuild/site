import type { Cta } from "./types"
import { primaryCta, primaryCtaNote } from "./global"

const demoCta: Cta = { label: "Pedí una demo", href: "/contacto" }

export const hero = {
  eyebrow: "// producto → central ia",
  posterTitle: "Central IA",
  posterAccent: "IA",
  supportLine: "Tu gente, tus agentes y tus herramientas, con permisos.",
  subhead:
    "Una plataforma donde la empresa entra con sus usuarios y encuentra lo que sabe, los agentes que la ayudan y las herramientas que ya usa. Cada empresa en su espacio, aislada de las demás.",
  ctaPrimary: primaryCta,
  ctaSecondary: demoCta,
}

export const brain = {
  kicker: { index: "01", label: "brain" },
  posterTitle: "Lo que la empresa sabe",
  body:
    "El Brain reúne en un solo lugar los criterios, procesos, mensajes, cuentas y decisiones de tu empresa. El método deja de vivir en la cabeza de pocas personas, y cada conversación con un asistente parte de lo que la empresa ya sabe.",
  features: [
    "Páginas ordenadas en carpetas, con editor visual.",
    "Historial de versiones, con comparación y restauración.",
    "Búsqueda en español sobre todo el contenido.",
    "Lo consultan las personas y los agentes, con las mismas reglas.",
  ],
}

export const permisos = {
  kicker: { index: "02", label: "permisos" },
  posterTitle: "Quién lee, quién escribe",
  lead: "El mismo permiso vale en la web, en tu asistente y en el chat con un agente.",
  items: [
    { title: "Cuatro niveles", description: "Lector, editor, administrador y sin acceso." },
    { title: "Por carpeta y por página", description: "Se definen donde hace falta, y lo de adentro los hereda." },
    { title: "Por persona o para todos", description: "Un tema puede estar abierto a toda la empresa o a tres personas." },
    { title: "Escritura con responsables", description: "Cada tema tiene quién lo escribe y quién lo aprueba." },
  ],
}

export const agentes = {
  kicker: { index: "03", label: "agentes" },
  posterTitle: "Agentes a tu medida",
  body:
    "Cada agente se define en acuerdo con tu empresa y lo implementa nuestro equipo. Al definirlo se fijan dos cosas: qué datos puede usar y qué personas pueden usarlo.",
  exampleTitle: "Un ejemplo que usamos todos los días",
  example:
    "Nuestro agente de prospección comercial investiga cada empresa, redacta con los criterios comerciales del Brain, controla el texto contra reglas de estilo, deja el mensaje en una cola para que una persona lo apruebe, lo envía desde la casilla de quien aprobó, lo registra en el CRM y propone el seguimiento.",
  closing: "Cada agente nuevo hereda el Brain, los permisos, las aprobaciones y el registro.",
}

export const control = {
  kicker: { index: "04", label: "reglas de control" },
  posterTitle: "Tu gente decide",
  posterAccent: "decide",
  lead: "Tu gente decide, los agentes ejecutan. Cada acción tiene un nivel, y el nivel define si necesita a una persona.",
  levels: [
    { what: "Trabaja solo con datos de la plataforma", rule: "Corre sola." },
    { what: "Gasta en servicios de terceros, como los modelos de IA", rule: "Corre sola, con tope por corrida y presupuesto diario." },
    { what: "Escribe en un sistema de la empresa, como el CRM", rule: "La política la elige tu empresa. Por defecto, pide aprobación." },
    { what: "Le llega a una persona de afuera, como un mail", rule: "Aprobación humana siempre." },
  ],
}

export const puertas = {
  kicker: { index: "05", label: "dos puertas" },
  posterTitle: "Dos puertas",
  body:
    "Quien ya trabaja con Claude o ChatGPT conecta Central IA a su asistente por MCP y usa desde ahí lo que la empresa le habilitó. Quien trabaja sin asistente propio entra directo a la plataforma desde el navegador. El contenido y los permisos son los mismos por las dos puertas.",
  steps: [
    "Entrás a Central IA con el correo de tu empresa.",
    "Ves el listado de lo que tenés disponible, con las instrucciones de conexión.",
    "Agregás el conector a tu Claude o tu ChatGPT y te autenticás con tu cuenta.",
    "Desde tu asistente buscás, leés y escribís según tus permisos.",
  ],
}

export const herramientas = {
  kicker: { index: "06", label: "herramientas y panel" },
  posterTitle: "Lo que ya usás",
  body:
    "Tu CRM, tu correo y tus fuentes de datos se conectan a Central IA con permisos por persona. Cada uno ve y usa las herramientas que le habilitaron, desde la plataforma o desde su asistente.",
  panel:
    "Desde el panel de la empresa definís cómo entra tu gente, qué agentes tiene, qué herramientas conecta y quién accede a qué.",
}

export const sistemas = {
  kicker: { index: "07", label: "para sistemas" },
  posterTitle: "Para sistemas",
  items: [
    "Tres roles: administrador de plataforma, administrador de la empresa y miembro.",
    "Ingreso con la cuenta de Microsoft o de Google de la empresa, o con link por mail. Sin contraseñas.",
    "Por invitación, o abierto a quien tenga un correo verificado del dominio de la empresa.",
    "Cada empresa en su espacio, aislada de las demás.",
    "Los modelos de IA trabajan sin ver credenciales.",
    "Registro inalterable de cada acción y del costo de cada llamada a un modelo.",
    "Tope de gasto por empresa.",
  ],
}

export const finalCta = {
  title: "Probala con tu equipo",
  cta: primaryCta,
  secondary: demoCta,
  note: primaryCtaNote,
}
