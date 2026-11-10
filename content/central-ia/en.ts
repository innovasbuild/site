import type { Cta } from "../types"
import { primaryCta, conversationCtaNote } from "../global/en"
import { imagenes } from "../imagenes/en"
import type { Componente } from "./es"

/**
 * /ai-central, English version. Same sections as es.ts: the product's components and the benefit each one gives the
 * company, including what happens to knowledge when a person leaves.
 */

export const hero = {
  eyebrow: "// the infrastructure → ai central",
  posterTitle: "AI Central",
  posterAccent: "Central",
  supportLine: "The foundation your company builds its AI on.",
  subhead:
    "Where what your company knows lives, where its agents work, and where its systems connect, with permissions for each person and a record of everything. Our team implements and operates it with you.",
  ctaPrimary: primaryCta,
  foto: imagenes.centralIaHero,
}

export const componentes = {
  kicker: { index: "01", label: "components" },
  posterTitle: "What your company gains",
  posterAccent: "gains",
  intro: "Each AI Central component solves something that costs your company time, money, or peace of mind today.",
  principales: [
    {
      nombre: "Brain",
      titulo: "Knowledge stops depending on a few people",
      texto:
        "Standards, processes, customers, and decisions in one place, organized by topic. Your people and your agents work from the same source, and every question starts from what the company already knows.",
      ilustracion: "brain",
    },
    {
      nombre: "Agents",
      titulo: "Repetitive work gets done by an agent",
      texto:
        "Designed with your team for specific tasks and connected to your systems. Every new agent inherits the knowledge, permissions, and controls already in place.",
      ilustracion: "agentes",
    },
    {
      nombre: "Tools",
      titulo: "Your systems, with no migration",
      texto:
        "Your CRM, email, spreadsheets, and data sources connect to AI Central. Each person uses what they've been given access to.",
      ilustracion: "herramientas",
    },
  ] as Componente[],
  restoTitulo: "And all of it under control",
  resto: [
    {
      nombre: "Permissions by person",
      titulo: "Open AI to everyone without opening everything",
      texto: "Reader, editor, admin, or no access, by folder and by page. Confidential material stays where it belongs.",
    },
    {
      nombre: "Owners by topic",
      titulo: "The person who writes it is the person who knows it",
      texto: "Every topic has someone who writes it and someone who approves it. The AI learns from the right source.",
    },
    {
      nombre: "Approvals",
      titulo: "Nothing goes out without a person seeing it",
      texto: "Anything that reaches a customer or changes a system goes through an approval, based on your company's policy.",
    },
    {
      nombre: "Logs and costs",
      titulo: "You know what happened and what it cost",
      texto: "Every action and every model call is logged with its cost, with spending caps for each company.",
    },
    {
      nombre: "From your own assistant",
      titulo: "Get more from the licenses you already pay for",
      texto: "People who use Claude or ChatGPT connect their assistant to AI Central, with the same content and the same permissions.",
    },
    {
      nombre: "Your own space",
      titulo: "Your information, isolated",
      texto: "Each company has its own space, with sign-in through the company's Microsoft or Google account.",
    },
  ] as Componente[],
}

export const continuidad = {
  kicker: { index: "02", label: "continuity" },
  posterTitle: "When someone leaves, what they know stays",
  posterAccent: "stays",
  tablistLabel: "Phases",
  captions: ["Fills in as they work", "Everything stays, with its history", "Available from day one"],
  intro:
    "At most companies, the method lives in the heads of a few people. When one of them leaves, years of judgment, contacts, and shortcuts go with them. With AI Central, that knowledge is captured while the person works and passes in full to whoever comes next.",
  personas: { sale: "Martín", saleRol: "Purchasing, 9 years", llega: "Lucía", llegaRol: "Purchasing, first day", brain: "Brain" },
  temas: ["Suppliers", "How decisions get made", "Pricing", "Contacts", "Exceptions"],
  fases: [
    {
      nombre: "While they work",
      titulo: "What they know gets written down",
      puntos: [
        "Their standards and processes live in the Brain, in their area's folder.",
        "Team meetings are transcribed and add what was decided.",
        "When an agent learns something new, it proposes the change and an owner approves it.",
      ],
    },
    {
      nombre: "When they leave",
      titulo: "An orderly exit",
      puntos: [
        "Their access is closed the same day, on the platform and in their assistant.",
        "What they wrote isn't deleted. It stays in the Brain, with the history of every change.",
        "The topics they owned pass to another owner.",
      ],
    },
    {
      nombre: "When someone arrives",
      titulo: "They start with the full context",
      puntos: [
        "They inherit the role's access, not the previous person's.",
        "They consult the Brain the way they'd ask the person before them: how decisions get made, who to call, what was agreed.",
        "The area's agents keep working the same from day one.",
      ],
    },
  ],
}

export const control = {
  kicker: { index: "03", label: "control" },
  posterTitle: "Your people decide",
  posterAccent: "decide",
  lead: "Open AI to the whole company without losing control. Every action has a level, and the level determines whether it needs a person.",
  levels: [
    { what: "Works only with data from the platform", rule: "Runs on its own." },
    { what: "Spends money on third-party services, like AI models", rule: "Runs on its own, with a cap per run and a daily budget." },
    { what: "Writes to a company system, like the CRM", rule: "Your company chooses the policy. By default, it asks for approval." },
    { what: "Reaches someone outside the company, like an email", rule: "Human approval, always." },
  ],
}

export const conEquipo = {
  kicker: { index: "04", label: "implementation" },
  titulo: "AI Central comes with a team",
  texto:
    "We don't hand you a tool and wish you luck. Our team installs it, builds the Brain with your people, builds the agents, and runs them with you, wave after wave.",
  foto: imagenes.equipoPizarra,
  cta: { label: "See how we work", href: "/en/services" } as Cta,
}

export const sistemas = {
  kicker: { index: "05", label: "for IT" },
  posterTitle: "For IT",
  items: [
    "Three roles: platform admin, company admin, and member.",
    "Sign-in with the company's Microsoft or Google account, or with an emailed link. No passwords.",
    "By invitation, or open to anyone with a verified email on the company's domain.",
    "Each company in its own space, isolated from the others.",
    "AI models work without seeing credentials.",
    "Tamper-proof log of every action and of the cost of every model call.",
    "Spending cap per company.",
  ],
}

export const finalCta = {
  title: "Get to know AI Central with your team",
  cta: primaryCta,
  note: conversationCtaNote,
}

/* --------------------------------------------------------------------------------------------------------
   Animated demos from the previous version of this page. They're no longer shown on /en/ai-central; they
   stay in case they're useful for a sales demo or for the app.
   -------------------------------------------------------------------------------------------------------- */

/**
 * Animated demo of the Brain section. Made-up company and names (the same company as the permissions demo).
 * In the snippets, text between ** is highlighted.
 */
export const demoBrain = {
  label: "AI Central demo: the Brain with its folders, a search, and the version history of a page",
  pasos: [
    { titulo: "Everything in one place", detalle: "What your company knows, organized in folders." },
    { titulo: "Find it fast", detalle: "Search across the whole Brain." },
    { titulo: "Every change is kept", detalle: "Version history, to compare and roll back." },
  ],
  usuario: { iniciales: "A" },
  titulo: "Brain",
  nuevaPagina: "New page",
  buscarPlaceholder: "Search the brain",
  buscar: "Search",
  estado: "Active and drafts",
  consulta: "distributor payment terms",
  carpetas: [
    { nombre: "company", detalle: "Who we are, our voice, and the rules", paginas: "12 pages" },
    { nombre: "sales", detalle: "Customers, price lists, and terms", paginas: "9 pages" },
    { nombre: "production", detalle: "Lines, shifts, and plant procedures", paginas: "14 pages" },
    { nombre: "quality", detalle: "Standards, tests, and what to do if something goes wrong", paginas: "8 pages" },
    { nombre: "purchasing", detalle: "Wheat suppliers and how we decide", paginas: "6 pages" },
    { nombre: "logistics", detalle: "Warehouses, carriers, and deliveries", paginas: "7 pages" },
  ],
  resultadosTitulo: "3 results",
  resultados: [
    { titulo: "Terms for distributors", carpeta: "sales", fragmento: "…the **payment terms** for **distributors** are 45 days from the invoice…" },
    { titulo: "2026 price list", carpeta: "sales", fragmento: "…pricing for **distributors** with **payment** at 30 and 45 days…" },
    { titulo: "How to qualify a new distributor", carpeta: "sales", fragmento: "…we ask for **payment** references before the first order…" },
  ],
  /** Folder that expands in the tree when the page opens, and its pages. */
  carpetaAbierta: "sales",
  paginasCarpeta: ["Terms for distributors", "2026 price list", "How to qualify a new distributor"],
  pagina: {
    migas: "← Brain · sales",
    acciones: ["Edit", "History", "Details"],
    titulo: "Terms for distributors",
    parrafo:
      "Whatever we agree with each distributor comes from here. If a case doesn't fit these rules, the sales director decides.",
    subtitulo: "Terms and amounts",
    items: ["Minimum order: 2 pallets.", "Early-payment discount: 3% at 10 days."],
    /** The item that changed in the latest version: before and after. */
    cambio: { etiqueta: "Payment terms:", antes: "30 days", despues: "45 days" },
  },
  historial: {
    titulo: "History",
    versiones: [
      { cuando: "Today, 10:42", quien: "Ana Torres", que: "Changed the payment terms from 30 to 45 days." },
      { cuando: "Oct 12", quien: "Martín Ruiz", que: "Added the early-payment discount." },
      { cuando: "Sep 3", quien: "Martín Ruiz", que: "Created the page." },
    ],
    restaurar: "Restore",
  },
}

/**
 * Animated demo of the Permissions section: we propose the folders, one gets restricted, and we see the same
 * thing through the eyes of a team member. Made-up company and names.
 */
export const demoPermisos = {
  label: "AI Central demo: the Brain's folders, who can access each one, and how a team member sees them",
  pasos: [
    { titulo: "We build the Brain", detalle: "We read your website and propose the folders." },
    { titulo: "You decide who sees what", detalle: "Each folder, open or restricted." },
    { titulo: "Everyone sees their own", detalle: "Reader, editor, admin, or no access." },
  ],
  producto: "AI Central",
  pasoAlta: "Step 3 of 6 · Your brain's folders",
  leyendo: "We're reading molineraaustral.com.ar",
  leyendoDetalle: "The brain is your company's memory. We organize it in folders, and each folder decides who sees it.",
  titulo: "Here's how we'd organize the Molinera Austral brain",
  bajada: "We read molineraaustral.com.ar and proposed these folders. Change whatever you like.",
  carpetas: [
    { nombre: "Leadership", detalle: "Decisions and plans that don't go to the whole team.", restringida: true, rol: "No access" },
    { nombre: "Finance", detalle: "Margins and contracts with figures.", restringida: true, rol: "No access" },
    { nombre: "Wheat purchasing", detalle: "Suppliers, prices, and how each purchase is decided.", restringida: false, rol: "No access" },
    { nombre: "Production", detalle: "Lines, shifts, and plant procedures.", restringida: false, rol: "Reader" },
    { nombre: "Sales", detalle: "Customers, price lists, and how we sell.", restringida: false, rol: "Editor" },
    { nombre: "Quality", detalle: "Standards and what to do when something goes wrong.", restringida: false, rol: "Reader" },
  ],
  /** Index of the folder the cursor switches from open to restricted. */
  cambia: 2,
  abierta: "Open",
  restringida: "Restricted",
  crear: "Create these folders",
  creadas: "Folders created",
  miembro: { iniciales: "A", titulo: "How Ana, from Sales, sees it", bajada: "She sees only what's hers, with her level on each folder." },
}

/** Animated demo of the Agents section: the agent drafts an email and a person approves it. Made-up names. */
export const demoAgente = {
  label: "AI Central demo: an agent drafts an email and a person approves it before it goes out",
  pasos: [
    { titulo: "You ask", detalle: "In your own words, from the chat." },
    { titulo: "It searches and drafts", detalle: "Uses HubSpot and the Brain, with your permissions." },
    { titulo: "You approve", detalle: "Nothing goes out without a person's approval." },
  ],
  usuario: { iniciales: "S", nombre: "Sofía" },
  agente: "Outreach",
  bienvenida: "What are we working on?",
  placeholder: "Write a message to Outreach",
  pedido: "Draft an email for Carla Méndez, at Logística Ribera, about the logistics agent pilot.",
  tituloHilo: "Email to Carla Méndez",
  hilos: [
    { titulo: "Qualify logistics accounts", agente: "Outreach" },
    { titulo: "Weekly pipeline summary", agente: "Assistant" },
    { titulo: "Focus ideas for Q4", agente: "Outreach" },
  ],
  herramientas: [
    { trabajando: "Looking up Carla in HubSpot", listo: "Found Carla in HubSpot" },
    { trabajando: "Reading the account in the Brain", listo: "Read the account in the Brain" },
    { trabajando: "Drafting the email", listo: "Drafted the email" },
  ],
  respuesta:
    "Done. I saw that Logística Ribera opened two warehouses this year, so I built the email around that. It's ready for you to approve before it goes out.",
  aprobacion: {
    titulo: "Approval pending: send email",
    para: "carla.mendez@logribera.com.ar",
    asunto: "Two new warehouses and the orders that ship late",
    cuerpo:
      "Hi Carla,\n\nI saw that Logística Ribera opened two warehouses this year. With a network that size, every order that ships late costs someone a phone call. At INNOV.AS, we build agents that sort out those exceptions before they reach a person.\n\nCan I show you how it looks in a similar operation? It takes 20 minutes.\n\nSofía\nINNOV.AS",
    aprobar: "Approve and send",
    cancelar: "Cancel",
  },
  enviado: "Sent to Carla. Sofía approved it and it's in the log.",
  esperando: "Respond to the pending card to continue",
} as const

/**
 * Animated demo of the Tools section: what an agent can do with your tools, and how a new account gets added.
 * The icon of each capability (`icono`) is a lucide name, the same as in the design.
 */
export const demoHerramientas = {
  label: "AI Central demo: what an agent can do with your tools, and how a new account gets added",
  pasos: [
    { titulo: "What you already use, built in", detalle: "Gmail, HubSpot, and your data sources, in the chat." },
    { titulo: "Each person, their own account", detalle: "You connect yours and use what you've been given access to." },
    { titulo: "Adds to what you can do", detalle: "New capabilities show up right away, on the platform and in your assistant." },
  ],
  usuario: { iniciales: "S" },
  bienvenida: "What are we working on?",
  placeholder: "Write a message to Outreach",
  agente: "Outreach",
  capacidadesTitulo: "What you can do with Outreach",
  capacidades: [
    { icono: "upload", texto: "Upload contacts by pasting a CSV" },
    { icono: "building", texto: "Research a company and build its profile" },
    { icono: "map-pin", texto: "Find businesses by industry and area with Google Places" },
    { icono: "mail", texto: "Draft messages and send them through Gmail once you approve them" },
    { icono: "inbox", texto: "Read replies, log them in HubSpot, and schedule follow-ups" },
  ],
  nueva: { icono: "user-search", texto: "Find new people by industry, size, and title", detalle: "With your Apollo account", marca: "New" },
  aviso: "Connect your Apollo account and you can also find new people by industry, size, and title.",
  avisoLink: "Connect in My accounts",
  cuentas: {
    titulo: "My accounts",
    bajada: "Your agents use these accounts with your permissions. You can disconnect them anytime.",
    lista: [
      { icono: "mail", nombre: "Gmail", detalle: "Send the messages you approved", conectada: true },
      { icono: "inbox", nombre: "HubSpot", detalle: "Log replies and follow-ups", conectada: true },
      { icono: "map-pin", nombre: "Google Places", detalle: "Find businesses by industry and area", conectada: true },
      { icono: "user-search", nombre: "Apollo", detalle: "Find people by industry, size, and title", conectada: false },
    ],
    conectada: "Connected",
    conectar: "Connect",
    conectando: "Connecting…",
  },
}
