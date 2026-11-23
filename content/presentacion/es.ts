import type { Cta } from "../types"

/**
 * /central-ia/presentacion, noviembre 2026. La presentación de Central IA que se deja en el seguimiento del
 * outreach ("te dejo esto que armamos"). Sale del deck "INNOV.AS · Central IA · Resumen" y se lee de corrido,
 * como una secuencia de diapositivas. No se indexa: es material para quien la recibe por link.
 */

export interface Punto {
  titulo: string
  texto: string
}

export interface Paso {
  numero: string
  titulo: string
  texto: string
}

export const portada = {
  eyebrow: "// central ia → resumen",
  posterTitle: "la IA, con gobierno",
  posterAccent: "con gobierno",
  supportLine: "La IA ya está en la empresa. Central IA es donde se gobierna.",
  subhead:
    "La plataforma que reúne el conocimiento, los agentes y las herramientas de la empresa bajo un mismo modelo de permisos, y el equipo que la implementa ola por ola.",
  firma: "INNOV.AS · implementación de IA para empresas y pymes",
}

export const momento = {
  kicker: { index: "01", label: "el momento" },
  posterTitle: "la IA ya entró",
  posterAccent: "ya entró",
  intro: "Falta el lugar donde ordenarla.",
  puntos: [
    {
      titulo: "Queda en una o dos personas",
      texto:
        "Quien usa IA lo hace con su licencia y su chat. Lo que aprende queda en su cuenta: un buen análisis, una buena respuesta a un cliente o un buen informe se hace una vez y queda en ese chat.",
    },
    {
      titulo: "Cada uno le enseña lo suyo",
      texto:
        "Cada persona carga sus propios criterios. Un procedimiento, una lista de precios o un criterio de decisión conviven en versiones distintas, una por persona.",
    },
    {
      titulo: "Lo confidencial, en cuentas personales",
      texto:
        "Datos de clientes, precios, márgenes y remuneraciones pasan por asistentes personales, fuera de los permisos por rol y del registro de la empresa.",
    },
  ] as Punto[],
  cierre:
    "Los directorios ya pasaron de preguntar cómo empezar con la IA a preguntar cómo ordenarla: quién accede a qué, qué puede hacer un agente y quién responde por eso.",
}

export const propuesta = {
  kicker: { index: "02", label: "lo que proponemos" },
  posterTitle: "de personas a empresa",
  posterAccent: "empresa",
  intro: "La IA ya acelera a cada persona. Central IA acelera a la empresa.",
  a: {
    etiqueta: "A · hoy · aceleración individual",
    titulo: "Cada persona avanza con su licencia",
    items: [
      "Aprende, arma sus análisis y sus rutinas, y cada semana es más rápida.",
      "Lo que gana queda en su cuenta y se va con ella.",
      "Cada uno le enseña a su IA lo que cree, y las versiones se multiplican.",
      "La empresa suma individuos acelerados, cada uno con su propia capacidad.",
    ],
  },
  b: {
    etiqueta: "B · con central ia · adopción corporativa",
    titulo: "Un brain compartido, agentes según roles",
    items: [
      "El brain crece por sus responsables: cada área decide quién le enseña y qué queda escrito.",
      "Los agentes se distribuyen según roles: cada persona usa los que le corresponden, con los datos que puede ver.",
      "Cada persona sigue trabajando desde su Claude, su ChatGPT o su Copilot, ahora conectados.",
      "La aceleración pasa a ser de la empresa, con gobierno.",
    ],
  },
  cierre:
    "De personas aceleradas a una empresa que aprende. INNOV.AS implementa sobre la plataforma: releva el método de cada área, arma el brain y prepara los agentes que hacen falta.",
}

export const piezas = {
  kicker: { index: "03", label: "tres piezas, un lugar" },
  posterTitle: "tres piezas, un lugar",
  posterAccent: "un lugar",
  intro: "Brain, agentes y herramientas, con los mismos permisos.",
  items: [
    {
      titulo: "Brain",
      texto:
        "La inteligencia colectiva de la empresa: productos, clientes, proveedores, procedimientos, criterios y decisiones. Las personas lo consultan para trabajar y lo alimentan donde les toca aportar. Los agentes trabajan con ese mismo conocimiento.",
    },
    {
      titulo: "Agentes",
      texto:
        "Trabajadores de IA preparados para tareas concretas, en acuerdo con cada área: atención de consultas, armado de presupuestos, control de documentos, brief para la dirección. Cada agente sabe qué datos puede usar y qué personas pueden usarlo.",
    },
    {
      titulo: "Herramientas",
      texto:
        "El sistema de gestión, el CRM, el correo y las planillas, conectados a la plataforma con el mismo nivel de permisos. Las personas correctas los usan desde la plataforma o desde su asistente.",
    },
  ] as Punto[],
}

export const gobierno = {
  kicker: { index: "04", label: "gobierno en el producto" },
  posterTitle: "gobierno en el producto",
  posterAccent: "producto",
  intro: "Permisos, aprobaciones y registro los hace cumplir la plataforma.",
  reglas: [
    "Permisos por carpeta y por página: lector, editor, administrador o sin acceso, por persona o por rol, con herencia. El mismo permiso vale en la web, en el asistente conectado y en el chat con un agente.",
    "Quién le enseña al brain se decide por área. Cada carpeta tiene un responsable de su contenido y reglas de escritura: qué campos exige una ficha, qué formato, qué queda incompleto.",
    "Un agente ve, como máximo, lo que ve la persona que lo usa.",
    "Lo que sale hacia un cliente pasa por una persona. Siempre.",
    "Todo lo que corre queda en un registro inalterable, con su costo. Las credenciales quedan fuera del alcance del modelo.",
  ],
  nivelesTitulo: "Nivel de efecto de cada acción",
  niveles: [
    { que: "Solo datos de la plataforma", regla: "Corre sola" },
    { que: "Gasta en modelos o en datos de terceros", regla: "Corre sola, con tope por corrida y presupuesto diario" },
    { que: "Escribe en un sistema de la empresa, como el sistema de gestión", regla: "Política que elige la empresa. Por defecto pide aprobación" },
    { que: "Le llega a una persona de afuera, como un cliente", regla: "Aprobación humana, siempre" },
  ],
}

export const puertas = {
  kicker: { index: "05", label: "dos puertas" },
  posterTitle: "dos puertas",
  posterAccent: "puertas",
  intro: "Se parte de las licencias que la empresa ya paga.",
  items: [
    {
      titulo: "Puerta 1 · desde la plataforma",
      texto:
        "La persona entra con su cuenta corporativa y encuentra el conocimiento, los agentes y las herramientas que le corresponden. Un listado le dice qué tiene disponible y cómo conectarlo. Sirve para quien todavía trabaja sin una IA propia.",
    },
    {
      titulo: "Puerta 2 · desde su asistente",
      texto:
        "Las licencias de Claude, ChatGPT, Gemini o Copilot que la empresa habilite se conectan al brain, a los agentes y a las herramientas por MCP. Es el mismo contenido con los mismos permisos, y cada persona sigue con la herramienta que ya usa.",
    },
  ] as Punto[],
  cierre:
    "Si una cuenta se da de baja en la empresa, el acceso se corta en las dos puertas. Lo que esa persona aprendió y cargó queda en el brain de la empresa.",
}

export const equipo = {
  kicker: { index: "06", label: "un equipo, de punta a punta" },
  posterTitle: "tres capas, un equipo",
  posterAccent: "un equipo",
  intro: "Se contratan tres capas. Un solo equipo responde por las tres.",
  capas: [
    {
      numero: "Capa 1",
      titulo: "Infraestructura",
      texto:
        "Central IA: el brain, los permisos, el registro, los conectores y la pasarela de modelos. Por usuario, por mes. Es el piso sobre el que se apoya todo lo demás.",
    },
    {
      numero: "Capa 2",
      titulo: "Agentes",
      texto:
        "Trabajadores de IA construidos para los circuitos de la empresa: atención de consultas, presupuestos, documentación, brief para la dirección. Cada uno con un nivel de delegación que crece según su historial.",
    },
    {
      numero: "Capa 3",
      titulo: "Equipo consultor",
      texto:
        "Gente senior que entrevista a quienes hacen el trabajo, escribe cómo se decide, lo carga al brain y construye los agentes. Las mismas personas desde la primera conversación hasta la operación diaria.",
    },
  ] as Paso[],
  cierre:
    "Quien releva el proceso es quien construye sobre él y quien responde cuando algo cambia: un mismo equipo en lo comercial, en la implementación y en el soporte.",
}

export const semana = {
  kicker: { index: "07", label: "qué hace el equipo" },
  posterTitle: "semana a semana",
  posterAccent: "semana",
  intro: "Qué hace el equipo durante una ola.",
  pasos: [
    { numero: "1", titulo: "Escucha primero", texto: "Entrevistas grabadas con quienes hacen el trabajo: cómo se hace, cómo se decide, dónde se traba. Primero se entiende, después se construye." },
    { numero: "2", titulo: "Escribe el método", texto: "Lo que salió de las entrevistas entra al brain con responsable, versión y permisos. El criterio de la empresa, en su propio lenguaje." },
    { numero: "3", titulo: "Construye a la vista", texto: "Algo usable cada una o dos semanas: una fuente conectada, una planilla pasada a base, un tablero, un agente. Criterios de aceptación escritos antes de construir." },
    { numero: "4", titulo: "Capacita por rol", texto: "Un programa corto por rol sobre casos reales: qué resuelve cada persona con IA y con qué información." },
    { numero: "5", titulo: "Mide", texto: "Cada circuito tiene su métrica definida antes de empezar: horas, días de resolución, tasa de error. La línea de base se toma la primera semana." },
    { numero: "6", titulo: "Lo mantiene vivo", texto: "Después de la ola, el brain sigue al día: lo que cambia en la empresa entra al día siguiente. Los agentes se ajustan al uso real y se cuida el costo por operación." },
  ] as Paso[],
  cierre:
    "Una sesión semanal con el referente y un punto de decisión al cierre de cada ola: seguir, reordenar, cambiar de velocidad o pausar, a elección de la empresa.",
}

export const metodo = {
  kicker: { index: "08", label: "cómo trabajamos" },
  posterTitle: "olas de tres meses",
  posterAccent: "tres meses",
  intro: "Diagnóstico, Brain y olas de tres meses.",
  pasos: [
    { numero: "1 · diagnóstico", titulo: "El mapa del método", texto: "Relevamos con la empresa su método de trabajo. Queda un mapa con el plan a 24 meses, ordenado en olas de desarrollo." },
    { numero: "2 · ola de inicio", titulo: "El Brain de la empresa", texto: "Instalamos Central IA y armamos el Brain: procesos, clientes y criterios en un solo lugar, con agentes de IA que trabajan con los permisos de cada persona. Corre en paralelo a lo que ya hacen y queda funcionando en pocas semanas." },
    { numero: "3 · olas de 3 meses", titulo: "Un proceso funcionando por ola", texto: "Cada ola toma un proceso concreto del negocio y lo deja funcionando al cierre, con su métrica. Al terminar se decide: seguir, cambiar el foco o parar. La velocidad la elige la empresa." },
    { numero: "4 · costos separados", titulo: "Plataforma y desarrollos", texto: "Central IA se abona por usuario. Los desarrollos (agentes, integraciones, automatización de procesos) se trabajan en olas cerradas, cotizadas según la intensidad de avance." },
  ] as Paso[],
  cierre: "Para grandes empresas y para pymes, con un equipo senior que implementa y packs de inicio a medida.",
}

export const nosotros = {
  kicker: { index: "09", label: "quiénes somos" },
  posterTitle: "la plataforma y el equipo",
  posterAccent: "el equipo",
  cifras: [
    { value: 25, suffix: "", label: "años", caption: "transformando organizaciones" },
    { value: 150, suffix: "+", label: "organizaciones", caption: "de todos los tamaños" },
    { value: 14, suffix: "", label: "países", caption: "en América Latina y en el mundo" },
  ],
  texto:
    "INNOV.AS ofrece servicios sobre una plataforma propia, Central IA, que ordena la adopción de IA en la empresa con gobernanza sobre la información, los agentes y las herramientas. La plataforma corre en nuestra propia operación comercial: el brain, el agente de prospección y el CRM que mostramos son los que usamos todos los días. Esa es la prueba que ofrecemos, junto con una demo en vivo.",
  sectoresTitulo: "Sectores y mercados donde trabajó nuestro equipo",
  sectores:
    "Industria · Consumo masivo · Retail · Agro y alimentos · Energía · Salud · Seguros · Banca y fintech · Tecnología y telecomunicaciones · Logística · Educación · Gobiernos y organismos internacionales.",
  comoTitulo: "Cómo trabajamos",
  como: "Equipo senior directo, con IA nativa en el delivery. Entregables verificables por fase, en español y con quien conduce el área en la mesa.",
}

export const cierre = {
  eyebrow: "// a ──→ b",
  posterTitle: "de A a B",
  posterAccent: "B",
  a: "El método de la empresa vive en mails, PDFs, planillas y en la cabeza de pocas personas. Cada uno arranca de cero con su IA.",
  b: "Vive en un brain gobernado, con agentes que ejecutan lo repetitivo y personas que deciden lo que importa. Y un equipo que lo mantiene vivo, ola tras ola.",
  cta: { label: "Coordinar una conversación", href: "/contacto" } as Cta,
  contacto: "hola@innov.as · www.innov.as",
}
