import { primaryCta, conversationCtaNote } from "../global/en"
import { imagenes, type Imagen } from "../imagenes/en"

/**
 * Services, English version. Same sections as es.ts: the path, two ways to start, Wave Zero, how we work,
 * who does what, the first step, and questions.
 */

export const hero = {
  eyebrow: "// services → end to end",
  posterTitle: "A team that sits down with yours",
  posterAccent: "with yours",
  subhead:
    "We implement AI across your company, end to end: we map how it works, organize what it knows, build the agents, and run them with you. We work in three-month waves, and each one ends with a business workflow up and running.",
  ctaPrimary: primaryCta,
  note: conversationCtaNote,
  fotos: [imagenes.heroServicios],
}

/** The end-to-end path, in detail. Same five names as the home page. */
export const camino = {
  kicker: { index: "01", label: "the path" },
  posterTitle: "From the first talk to operations",
  posterAccent: "operations",
  intro:
    "The goal is for AI to actually work in your business, not sit in a pilot. Each stage leaves something working and ends with a decision from you: you set the pace.",
  etapaLabel: "Stage",
  tablistLabel: "Stages",
  campos: {
    pasa: "What happens",
    llevas: "What you get",
    pide: "What it asks of your team",
    decision: "When it ends, you decide",
  },
  etapas: [
    {
      nombre: "First conversation",
      duracion: "30 minutes",
      pasa: "The person who runs the company and our team. We look at what AI you already use, where it got stuck, and what makes sense to tackle first.",
      llevas: "A first map of where your company stands with AI.",
      pide: "Half an hour from the person who runs the company.",
      decision: "Whether we do the Radar.",
    },
    {
      nombre: "Radar",
      duracion: "3 to 4 hours",
      pasa: "We work with your leadership team to see how the business is divided, where the volume is, and which decisions drive it.",
      llevas: "A report with the method we mapped, the pain points, the prioritized opportunities, and a two-year plan.",
      pide: "Three to four hours of meetings with the leadership team.",
      decision: "Whether we start Wave Zero, with which workflow, and at what pace.",
    },
    {
      nombre: "Wave Zero",
      duracion: "3 months",
      pasa: "We install the foundation: AI Central in your company, access for each person, the initial Brain, and a first business workflow.",
      llevas: "The infrastructure up and running, and a first agent working with your team.",
      pide: "A small group from the chosen area and one working session per week.",
      decision: "Which wave comes next, or whether you stop here.",
    },
    {
      nombre: "Waves",
      duracion: "every 3 months",
      pasa: "Each wave adds a business workflow with its agents and moves the data that feeds it up a level. We implement it, make it visible, and measure it before moving on to the next.",
      llevas: "One new workflow in operation per wave, with its measurements.",
      pide: "The owner of each wave's area and their team.",
      decision: "Whether you speed up, change the order, or stop.",
    },
    {
      nombre: "Ongoing operations",
      duracion: "always",
      pasa: "The Brain stays alive: every change in your company is reflected by the next day. We run a round of interviews with each team every six months.",
      llevas: "AI that gets better with use, and a team behind it that knows it.",
      pide: "Your people working as usual.",
      decision: "What else to add, when you need it.",
    },
  ],
}

/** The two assessments, compared row by row. */
export const dosFormas = {
  kicker: { index: "02", label: "two ways to start" },
  posterTitle: "Start with an assessment",
  posterAccent: "assessment",
  intro: "Both have a fixed price and leave a written report that stays with your company, even if you decide to stop there.",
  filas: ["What it's for", "What it asks of your team", "What it delivers", "Credit toward implementation"],
  opciones: [
    {
      nombre: "Radar",
      etiqueta: "Most popular",
      foto: imagenes.manifiestoBase,
      valores: [
        "To size Wave Zero and know where to start.",
        "Three to four hours of meetings with the leadership team.",
        "The method we mapped, the pain points, the opportunities, and a two-year plan.",
        "Full credit when you implement Wave Zero.",
      ],
    },
    {
      nombre: "Method Map",
      etiqueta: "For the whole company",
      foto: imagenes.oficinaAbierta,
      valores: [
        "To plan improvements across the whole company, area by area.",
        "Interviews with each area of the business.",
        "Each area's opportunities and the detailed scope of each quarterly wave.",
        "Full credit when you implement Wave Zero and Wave One.",
      ],
    },
  ],
}

/** What Wave Zero leaves running. The human side first, then the technical side. */
export const olaCero = {
  kicker: { index: "03", label: "inside wave zero" },
  posterTitle: "Three months that lay the foundation",
  posterAccent: "the foundation",
  intro: "When Wave Zero ends, your company has:",
  funcionandoLabel: "Running",
  meses: ["Month 1", "Month 2", "Month 3"],
  items: [
    { titulo: "AI Central installed", texto: "Your company set up, with each person signing in with their company account." },
    { titulo: "The Brain, in three parts", texto: "People and roles, processes, and the criteria used to decide." },
    { titulo: "Permissions and owners", texto: "Who reads, who writes, and who approves on each topic." },
    { titulo: "Your AI licenses, connected", texto: "The ones you already pay for, working with what the company knows." },
    { titulo: "A first workflow in operation", texto: "The one chosen in the Radar, with its agent and its measurements." },
  ],
  nota: "We start with the human side of the business (criteria, manuals, decisions) and connect the systems after that.",
}

/** Photo band with how we work. */
export const principios = {
  kicker: { index: "04", label: "how we work" },
  frase: "Something working every week or two.",
  intro: "The big project that delivers everything at the end is ruled out by design. We launch working and improve with use.",
  foto: imagenes.comoTrabajamos as Imagen,
  items: [
    { titulo: "Speed first", texto: "We launch with what's solved and optimize with usage data." },
    { titulo: "Every topic has a purpose", texto: "Before loading anything into the Brain, we define who it's for and when they need it." },
    { titulo: "Imperfect, but headed somewhere", texto: "We start with part of each topic and the path to complete it." },
    { titulo: "You choose the pace", texto: "The map defines what there is to do. How much per month, you decide in each wave." },
  ],
}

export const roles = {
  kicker: { index: "05", label: "who does what" },
  posterTitle: "Who sits at the table",
  posterAccent: "at the table",
  lados: [
    {
      titulo: "On your side",
      tono: "gente" as const,
      foto: imagenes.rolesTuLado,
      /** The photos are vertical: they're cropped to 16:9, and this position decides which strip stays visible. */
      posicion: "object-[50%_30%]",
      items: [
        { rol: "The person who runs the company", texto: "The sponsor. Unblocks things when an area says yes but nothing moves." },
        { rol: "Someone from IT", texto: "Our point of contact: what gets resolved between teams and what gets escalated." },
        { rol: "A process owner", texto: "Someone with reach into every area who works well with people." },
        { rol: "An owner for each topic", texto: "Looks after the content of their part of the Brain." },
      ],
    },
    {
      titulo: "On ours",
      tono: "equipo" as const,
      foto: imagenes.rolesNuestro,
      posicion: "object-[50%_45%]",
      items: [
        { rol: "Data", texto: "Arrives first: maps where the information lives and goes area by area." },
        { rol: "Architecture and technical lead", texto: "Designs the foundation and answers for everything built on top of it." },
        { rol: "Agent engineering", texto: "Builds each agent with the team that does the task." },
        { rol: "Process and adoption", texto: "Supports your people until the new way is simply how they work." },
      ],
    },
  ],
}

/** The first step: what gets approved and what risk it reduces. */
export const primerPaso = {
  kicker: { index: "06", label: "the first step" },
  titulo: "A limited first step",
  intro: "The first commitment is small, has a fixed price, and leaves a report that's useful even if you decide to stop there.",
  foto: imagenes.conversacion,
  columnas: [
    {
      titulo: "What you approve",
      items: [
        "One Radar: three to four hours of your leadership team's time.",
        "A written report that stays with the company: the method we mapped, pain points, opportunities, and a two-year plan.",
        "The Radar is fully credited when you implement Wave Zero.",
        "Between waves, there's a decision point to continue, reorder, or stop.",
      ],
    },
    {
      titulo: "What risk it reduces",
      items: [
        "Company information moves into a space with corporate accounts and permissions.",
        "The company defines who reads and who writes on each topic.",
        "The AI licenses you already pay for keep getting used.",
        "Anything that reaches a customer goes through a person first.",
      ],
    },
  ],
}

export const faqSection = {
  kicker: { index: "07", label: "frequently asked questions" },
  posterTitle: "Questions",
}

export const finalCta = {
  title: "Let's start with a conversation",
  cta: primaryCta,
  note: conversationCtaNote,
}
