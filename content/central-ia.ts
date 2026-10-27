import type { Cta } from "./types"
import { primaryCta, conversationCta, conversationCtaNote } from "./global"
import { imagenes } from "./imagenes"

/**
 * /central-ia, octubre 2026 (segunda vuelta). Pedido del dueño: no mostrar cómo funciona por dentro (las demos
 * animadas salen de la página) sino los componentes del producto y el beneficio que le dan a la empresa,
 * incluido qué pasa con el conocimiento cuando una persona se va.
 */

export const hero = {
  eyebrow: "// la infraestructura → central ia",
  posterTitle: "Central IA",
  posterAccent: "IA",
  supportLine: "La base sobre la que tu empresa construye su IA.",
  subhead:
    "Donde vive lo que sabe tu empresa, trabajan sus agentes y se conectan sus sistemas, con permisos por persona y registro de todo. Nuestro equipo la implementa y la opera con vos.",
  ctaPrimary: conversationCta,
  ctaSecondary: primaryCta,
}

export type Ilustracion = "brain" | "agentes" | "herramientas"

export interface Componente {
  nombre: string
  titulo: string
  texto: string
  /** Los tres componentes principales van grandes, con su dibujo de la serie del cerebro. */
  ilustracion?: Ilustracion
}

export const componentes = {
  kicker: { index: "01", label: "componentes" },
  posterTitle: "Lo que tu empresa gana",
  posterAccent: "gana",
  intro: "Cada componente de Central IA resuelve algo que hoy le cuesta tiempo, dinero o tranquilidad a tu empresa.",
  principales: [
    {
      nombre: "Brain",
      titulo: "El conocimiento deja de depender de pocas personas",
      texto:
        "Criterios, procesos, clientes y decisiones en un solo lugar, ordenado por temas. Tu gente y tus agentes trabajan sobre lo mismo, y cada consulta arranca desde lo que la empresa ya sabe.",
      ilustracion: "brain",
    },
    {
      nombre: "Agentes",
      titulo: "El trabajo que se repite lo hace un agente",
      texto:
        "Diseñados con tu equipo para tareas concretas y conectados a tus sistemas. Cada agente nuevo hereda el conocimiento, los permisos y los controles que ya están.",
      ilustracion: "agentes",
    },
    {
      nombre: "Herramientas",
      titulo: "Tus sistemas, sin migrar nada",
      texto:
        "El CRM, el correo, las planillas y tus fuentes de datos se conectan a Central IA. Cada persona usa lo que tiene habilitado.",
      ilustracion: "herramientas",
    },
  ] as Componente[],
  restoTitulo: "Y todo, con control",
  resto: [
    {
      nombre: "Permisos por persona",
      titulo: "Abrís la IA a todos sin abrir todo",
      texto: "Lector, editor, administrador o sin acceso, por carpeta y por página. Lo confidencial queda donde tiene que estar.",
    },
    {
      nombre: "Responsables por tema",
      titulo: "Quien escribe es quien sabe",
      texto: "Cada tema tiene quién lo escribe y quién lo aprueba. La IA aprende de la fuente correcta.",
    },
    {
      nombre: "Aprobaciones",
      titulo: "Nada sale sin que una persona lo vea",
      texto: "Lo que llega a un cliente o cambia un sistema pasa por una aprobación, según la política de tu empresa.",
    },
    {
      nombre: "Registro y costos",
      titulo: "Sabés qué pasó y cuánto costó",
      texto: "Cada acción y cada llamada a un modelo quedan registradas con su costo. Con topes de gasto por empresa.",
    },
    {
      nombre: "Desde tu asistente",
      titulo: "Aprovechás las licencias que ya pagás",
      texto: "Quien usa Claude o ChatGPT conecta su asistente a Central IA, con el mismo contenido y los mismos permisos.",
    },
    {
      nombre: "Espacio propio",
      titulo: "Tu información, aislada",
      texto: "Cada empresa en su espacio, con ingreso por la cuenta de Microsoft o de Google de la empresa.",
    },
  ] as Componente[],
}

export const continuidad = {
  kicker: { index: "02", label: "continuidad" },
  posterTitle: "Cuando alguien se va, lo que sabe se queda",
  posterAccent: "se queda",
  intro:
    "En la mayoría de las empresas el método vive en la cabeza de pocas personas. Cuando una se va, se lleva años de criterio, contactos y atajos. Con Central IA ese conocimiento se guarda mientras la persona trabaja y pasa entero a quien llega.",
  personas: { sale: "Martín", saleRol: "Compras, 9 años", llega: "Lucía", llegaRol: "Compras, primer día", brain: "Brain" },
  temas: ["Proveedores", "Cómo se decide", "Precios", "Contactos", "Excepciones"],
  fases: [
    {
      nombre: "Mientras trabaja",
      titulo: "Lo que sabe queda escrito",
      puntos: [
        "Sus criterios y procesos viven en el Brain, en la carpeta de su área.",
        "Las reuniones del equipo se transcriben y suman lo que se decidió.",
        "Cuando un agente aprende algo nuevo, propone el cambio y un responsable lo aprueba.",
      ],
    },
    {
      nombre: "Cuando se va",
      titulo: "La salida es ordenada",
      puntos: [
        "Sus accesos se cierran el mismo día, en la plataforma y en su asistente.",
        "Lo que escribió no se borra: queda en el Brain, con el historial de cada cambio.",
        "Los temas que tenía a cargo pasan a otro responsable.",
      ],
    },
    {
      nombre: "Cuando llega alguien",
      titulo: "Arranca con el contexto completo",
      puntos: [
        "Hereda los accesos del puesto, no los de la persona.",
        "Consulta el Brain como le preguntaría a quien estaba antes: cómo se decide, a quién se llama, qué se acordó.",
        "Los agentes del área siguen trabajando igual desde el primer día.",
      ],
    },
  ],
}

export const control = {
  kicker: { index: "03", label: "control" },
  posterTitle: "Tu gente decide",
  posterAccent: "decide",
  lead: "Abrís la IA a toda la empresa sin perder el control. Cada acción tiene un nivel, y el nivel define si necesita a una persona.",
  levels: [
    { what: "Trabaja solo con datos de la plataforma", rule: "Corre sola." },
    { what: "Gasta en servicios de terceros, como los modelos de IA", rule: "Corre sola, con tope por corrida y presupuesto diario." },
    { what: "Escribe en un sistema de la empresa, como el CRM", rule: "La política la elige tu empresa. Por defecto, pide aprobación." },
    { what: "Le llega a una persona de afuera, como un mail", rule: "Aprobación humana siempre." },
  ],
}

export const conEquipo = {
  kicker: { index: "04", label: "implementación" },
  titulo: "Central IA viene con un equipo",
  texto:
    "No te damos una herramienta para que te arregles. Nuestro equipo la instala, arma el Brain con tu gente, construye los agentes y los opera con vos, ola tras ola.",
  foto: imagenes.equipoPizarra,
  cta: { label: "Ver cómo trabajamos", href: "/servicios" } as Cta,
}

export const sistemas = {
  kicker: { index: "05", label: "para sistemas" },
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
  title: "Conocé Central IA con tu equipo",
  cta: conversationCta,
  secondary: primaryCta,
  note: conversationCtaNote,
}

/* --------------------------------------------------------------------------------------------------------
   Demos animadas de la versión anterior de esta página. Ya no se muestran en /central-ia; quedan por si
   sirven para una demo comercial o para la app.
   -------------------------------------------------------------------------------------------------------- */

/**
 * Demo animada de la sección Brain, armada sobre las pantallas "Brain · Índice" y "Brain · Página" del producto:
 * las carpetas, una búsqueda y el historial de una página. Empresa y nombres inventados (la misma empresa que la
 * demo de permisos). En los fragmentos, lo que va entre ** se resalta.
 */
export const demoBrain = {
  label: "Demo de Central IA: el Brain con sus carpetas, una búsqueda y el historial de versiones de una página",
  pasos: [
    { titulo: "Todo en un lugar", detalle: "Lo que sabe tu empresa, ordenado en carpetas." },
    { titulo: "Lo encontrás rápido", detalle: "Búsqueda en español sobre todo el Brain." },
    { titulo: "Cada cambio queda", detalle: "Historial de versiones, para comparar y volver." },
  ],
  usuario: { iniciales: "A" },
  titulo: "Brain",
  nuevaPagina: "Nueva página",
  buscarPlaceholder: "Buscar en el brain",
  buscar: "Buscar",
  estado: "Activas y borradores",
  consulta: "plazo de pago distribuidores",
  carpetas: [
    { nombre: "empresa", detalle: "Quiénes somos, nuestra voz y las reglas", paginas: "12 páginas" },
    { nombre: "comercial", detalle: "Clientes, listas de precios y condiciones", paginas: "9 páginas" },
    { nombre: "produccion", detalle: "Líneas, turnos y procedimientos de planta", paginas: "14 páginas" },
    { nombre: "calidad", detalle: "Normas, análisis y qué hacer si algo sale mal", paginas: "8 páginas" },
    { nombre: "compras", detalle: "Proveedores de trigo y cómo se decide", paginas: "6 páginas" },
    { nombre: "logistica", detalle: "Depósitos, transportes y entregas", paginas: "7 páginas" },
  ],
  resultadosTitulo: "3 resultados",
  resultados: [
    { titulo: "Condiciones para distribuidores", carpeta: "comercial", fragmento: "…el **plazo de pago** para **distribuidores** es de 45 días desde la factura…" },
    { titulo: "Lista de precios 2026", carpeta: "comercial", fragmento: "…precios para **distribuidores** con **pago** a 30 y 45 días…" },
    { titulo: "Cómo calificar un distribuidor nuevo", carpeta: "comercial", fragmento: "…pedimos referencias de **pago** antes del primer pedido…" },
  ],
  /** Carpeta que se despliega en el árbol cuando se abre la página, y sus páginas. */
  carpetaAbierta: "comercial",
  paginasCarpeta: ["Condiciones para distribuidores", "Lista de precios 2026", "Cómo calificar un distribuidor nuevo"],
  pagina: {
    migas: "← Brain · comercial",
    acciones: ["Editar", "Historial", "Detalles"],
    titulo: "Condiciones para distribuidores",
    parrafo:
      "Lo que acordamos con cada distribuidor sale de acá. Si un caso no entra en estas reglas, lo decide la gerencia comercial.",
    subtitulo: "Plazos y montos",
    items: ["Pedido mínimo: 2 pallets.", "Bonificación por pronto pago: 3% a 10 días."],
    /** El ítem que cambió en la última versión: antes y después. */
    cambio: { etiqueta: "Plazo de pago:", antes: "30 días", despues: "45 días" },
  },
  historial: {
    titulo: "Historial",
    versiones: [
      { cuando: "Hoy, 10:42", quien: "Ana Torres", que: "Cambió el plazo de pago de 30 a 45 días." },
      { cuando: "12 oct", quien: "Martín Ruiz", que: "Sumó la bonificación por pronto pago." },
      { cuando: "3 sep", quien: "Martín Ruiz", que: "Creó la página." },
    ],
    restaurar: "Restaurar",
  },
}

/**
 * Demo animada de la sección Permisos, armada sobre la pantalla "Alta · Carpetas · Propuesta" del producto:
 * proponemos las carpetas, se restringe una y se ve lo mismo con los ojos de una persona del equipo.
 * Empresa y nombres inventados.
 */
export const demoPermisos = {
  label: "Demo de Central IA: las carpetas del Brain, quién accede a cada una y cómo las ve una persona del equipo",
  pasos: [
    { titulo: "Armamos el Brain", detalle: "Leemos tu sitio y proponemos las carpetas." },
    { titulo: "Vos decidís quién ve", detalle: "Cada carpeta, abierta o restringida." },
    { titulo: "Cada uno ve lo suyo", detalle: "Lector, editor, administrador o sin acceso." },
  ],
  producto: "Central IA",
  pasoAlta: "Paso 3 de 6 · Las carpetas de tu brain",
  leyendo: "Estamos leyendo molineraaustral.com.ar",
  leyendoDetalle: "El brain es la memoria de tu empresa. Lo ordenamos en carpetas, y cada carpeta decide quién la ve.",
  titulo: "Así ordenaríamos el brain de Molinera Austral",
  bajada: "Leímos molineraaustral.com.ar y propusimos estas carpetas. Cambiá lo que quieras.",
  carpetas: [
    { nombre: "Dirección", detalle: "Decisiones y planes que no van a todo el equipo.", restringida: true, rol: "Sin acceso" },
    { nombre: "Finanzas", detalle: "Márgenes y contratos con cifras.", restringida: true, rol: "Sin acceso" },
    { nombre: "Compra de trigo", detalle: "Proveedores, precios y cómo se decide cada compra.", restringida: false, rol: "Sin acceso" },
    { nombre: "Producción", detalle: "Líneas, turnos y procedimientos de planta.", restringida: false, rol: "Lector" },
    { nombre: "Comercial", detalle: "Clientes, listas de precios y cómo vendemos.", restringida: false, rol: "Editor" },
    { nombre: "Calidad", detalle: "Normas y qué hacer cuando algo sale mal.", restringida: false, rol: "Lector" },
  ],
  /** Índice de la carpeta que el cursor pasa de abierta a restringida. */
  cambia: 2,
  abierta: "Abierta",
  restringida: "Restringida",
  crear: "Crear estas carpetas",
  creadas: "Carpetas creadas",
  miembro: { iniciales: "A", titulo: "Así lo ve Ana, de Comercial", bajada: "Ve solo lo que le toca, con su nivel en cada carpeta." },
}

/** Demo animada de la sección Agentes: el agente redacta un mail y una persona lo aprueba. Nombres inventados. */
export const demoAgente = {
  label: "Demo de Central IA: un agente redacta un mail y una persona lo aprueba antes de que salga",
  pasos: [
    { titulo: "Le pedís", detalle: "Con tus palabras, desde el chat." },
    { titulo: "Busca y redacta", detalle: "Usa HubSpot y el Brain, con tus permisos." },
    { titulo: "Vos aprobás", detalle: "Nada sale sin que una persona lo apruebe." },
  ],
  usuario: { iniciales: "S", nombre: "Sofía" },
  agente: "Outreach",
  bienvenida: "En qué trabajamos",
  placeholder: "Escribí un mensaje para Outreach",
  pedido: "Armame un mail para Carla Méndez, de Logística Ribera, sobre el piloto de agentes en logística.",
  tituloHilo: "Mail a Carla Méndez",
  hilos: [
    { titulo: "Calificar cuentas de logística", agente: "Outreach" },
    { titulo: "Resumen semanal del pipeline", agente: "Asistente" },
    { titulo: "Ideas de focos para el Q4", agente: "Outreach" },
  ],
  herramientas: [
    { trabajando: "Buscando a Carla en HubSpot", listo: "Encontró a Carla en HubSpot" },
    { trabajando: "Leyendo la cuenta en el Brain", listo: "Leyó la cuenta en el Brain" },
    { trabajando: "Redactando el mail", listo: "Redactó el mail" },
  ],
  respuesta:
    "Listo. Vi que Logística Ribera abrió dos depósitos este año, así que armé el mail alrededor de eso. Te lo dejo para que lo apruebes antes de que salga.",
  aprobacion: {
    titulo: "Aprobación pendiente: enviar mail",
    para: "carla.mendez@logribera.com.ar",
    asunto: "Dos depósitos nuevos y los pedidos que salen tarde",
    cuerpo:
      "Hola Carla:\n\nVi que Logística Ribera abrió dos depósitos este año. Con esa red, cada pedido que sale tarde le cuesta a alguien una llamada. En INNOV.AS armamos agentes que ordenan esas excepciones antes de que lleguen a una persona.\n\nTe muestro cómo quedó en otra operación parecida? Son 20 minutos.\n\nSofía\nINNOV.AS",
    aprobar: "Aprobar y enviar",
    cancelar: "Cancelar",
  },
  enviado: "Enviado a Carla. Lo aprobó Sofía y quedó en el registro.",
  esperando: "Respondé la tarjeta pendiente para seguir",
} as const

/**
 * Demo animada de la sección Herramientas, armada sobre las pantallas "Chat · Nuevo chat · Outreach" (sin Apollo y
 * con Apollo) del producto. La pantalla "Mis cuentas" no está en el diseño: sigue el mismo estilo. Los íconos de
 * cada capacidad (`icono`) son nombres de lucide, los mismos del diseño.
 */
export const demoHerramientas = {
  label: "Demo de Central IA: lo que un agente puede hacer con tus herramientas, y cómo se suma una cuenta nueva",
  pasos: [
    { titulo: "Lo que ya usás, adentro", detalle: "Gmail, HubSpot y tus fuentes de datos, en el chat." },
    { titulo: "Cada uno, su cuenta", detalle: "Conectás la tuya y usás lo que te habilitaron." },
    { titulo: "Suma lo que podés hacer", detalle: "Lo nuevo aparece al momento, en la plataforma y en tu asistente." },
  ],
  usuario: { iniciales: "S" },
  bienvenida: "En qué trabajamos",
  placeholder: "Escribí un mensaje para Outreach",
  agente: "Outreach",
  capacidadesTitulo: "Qué podés hacer con Outreach",
  capacidades: [
    { icono: "upload", texto: "Cargar contactos pegando un CSV" },
    { icono: "building", texto: "Investigar una empresa y armar su ficha" },
    { icono: "map-pin", texto: "Buscar negocios por rubro y zona con Google Places" },
    { icono: "mail", texto: "Redactar mensajes y mandarlos por Gmail cuando los aprobás" },
    { icono: "inbox", texto: "Leer respuestas, registrarlas en HubSpot y agendar seguimientos" },
  ],
  nueva: { icono: "user-search", texto: "Encontrar personas nuevas por rubro, tamaño y cargo", detalle: "Con tu cuenta de Apollo", marca: "Nuevo" },
  aviso: "Conectando tu cuenta de Apollo también podés encontrar personas nuevas por rubro, tamaño y cargo.",
  avisoLink: "Conectar en Mis cuentas",
  cuentas: {
    titulo: "Mis cuentas",
    bajada: "Tus agentes usan estas cuentas con tus permisos. Las desconectás cuando quieras.",
    lista: [
      { icono: "mail", nombre: "Gmail", detalle: "Mandar los mensajes que aprobaste", conectada: true },
      { icono: "inbox", nombre: "HubSpot", detalle: "Registrar respuestas y seguimientos", conectada: true },
      { icono: "map-pin", nombre: "Google Places", detalle: "Buscar negocios por rubro y zona", conectada: true },
      { icono: "user-search", nombre: "Apollo", detalle: "Encontrar personas por rubro, tamaño y cargo", conectada: false },
    ],
    conectada: "Conectada",
    conectar: "Conectar",
    conectando: "Conectando…",
  },
}
