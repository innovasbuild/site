import type { Cta, Vertical } from "../types"
import { primaryCta, conversationCtaNote } from "../global/en"
import { imagenes, type Imagen } from "../imagenes/en"

/** Home page, English version. Same sections and order as es.ts, written for a US buyer. */

export const hero = {
  eyebrow: "// AI consulting and implementation",
  posterTitle: "Your company's AI, end to end",
  posterAccent: "end to end",
  supportLine: "We set up the infrastructure, build the agents, and stay with you at every stage.",
  subhead:
    "One team accountable for the whole process. We map how your company works, organize what it knows, add agents that take over repetitive work, and run them with you, wave after wave.",
  ctaPrimary: primaryCta,
  note: conversationCtaNote,
  rails: [
    { from: "scattered licenses", to: "company-wide AI", vertical: "company" as Vertical, note: "adoption" },
    { from: "everyone on their own", to: "permissions for each person", vertical: "company" as Vertical, note: "control" },
  ],
}

/**
 * Manifesto: lights up word by word as it scrolls into view. Each sentence can carry a small photo
 * inline, after its text.
 */
export const manifiesto = {
  kicker: { index: "01", label: "what we do" },
  frases: [
    { texto: "One organized foundation for everything your company knows.", foto: imagenes.rolesTuLado },
    { texto: "Agents that take over the work that repeats.", foto: imagenes.rolesNuestro },
    { texto: "And a senior team that implements it alongside yours, and stays.", foto: imagenes.equipoFondo },
  ] as { texto: string; foto: Imagen }[],
}

export const antesDespues = {
  kicker: { index: "02", label: "where you are today" },
  posterTitle: "From scattered AI to company-wide AI",
  posterAccent: "company-wide AI",
  intro:
    "Your company already uses AI: licenses spread around, personal assistants, and an automation here and there. It works, but everyone does their own thing.",
  hoyLabel: "Today",
  despuesLabel: "With INNOV.AS",
  filas: [
    {
      hoy: "AI lives with one or two people. If they leave, it leaves with them.",
      despues: "What they know stays in the company and helps the whole team.",
    },
    {
      hoy: "Anyone can teach the AI, with no standards.",
      despues: "Every topic has someone who writes it, someone who reads it, and someone who approves it.",
    },
    {
      hoy: "Customer data sits in personal accounts and standalone apps.",
      despues: "Everything lives in one company-owned space, with permissions and an activity log.",
    },
    {
      hoy: "Pilots that never make it past the pilot stage.",
      despues: "Business workflows in operation, with a new one every wave.",
    },
  ],
}

export const oferta = {
  kicker: { index: "03", label: "what you're buying" },
  posterTitle: "Three layers, one accountable team",
  posterAccent: "one accountable team",
  intro:
    "This isn't a license or a one-off project. It's the infrastructure, the agents, and the team, all under one relationship from start to finish.",
  cards: [
    {
      etiqueta: "infrastructure",
      titulo: "The foundation everything else is built on",
      texto:
        "AI Central, our platform, organizes your company's knowledge, access, and systems. Every new agent builds on what's already there, under the same rules.",
      foto: imagenes.estructura,
      cta: { label: "Explore AI Central", href: "/en/ai-central" } as Cta,
    },
    {
      etiqueta: "agents",
      titulo: "Agents that take on work",
      texto:
        "Designed with your team for specific tasks: quoting, reviewing files, replying, following up. They work with your systems, and your people approve what matters.",
      foto: imagenes.operacion,
      cta: { label: "See examples", href: "#agentes" } as Cta,
    },
    {
      etiqueta: "team",
      titulo: "A team that stays with you",
      texto:
        "Senior consultants who map, implement, and operate alongside you. They're there from the first meeting through day-to-day operations.",
      foto: imagenes.taller,
      cta: { label: "See our services", href: "/en/services" } as Cta,
    },
  ],
}

/** Layers that light up as the walkthrough advances (bottom to top). */
export const capas = [
  "Infrastructure and access",
  "Your company's knowledge",
  "First agent in production",
  "Agents in more areas",
  "Ongoing operations and improvement",
]

export const recorrido = {
  kicker: { index: "04", label: "how we work" },
  posterTitle: "A process, not a project",
  posterAccent: "process",
  intro:
    "Each stage leaves something working and sets up the next one. You set the pace. We're with you at every step.",
  capasTitulo: "What's already running",
  tablistLabel: "Stages of the work",
  estados: { encendida: "running", planeada: "planned" },
  entregaLabel: "What you get",
  equipoLabel: "Who's involved",
  etapas: [
    {
      nombre: "First conversation",
      duracion: "30 minutes",
      texto:
        "The person who runs your company and our team. We look at what AI you already use, where it got stuck, and what makes sense to tackle first.",
      entrega: "A first map of where your company stands with AI.",
      equipo: "INNOV.AS partners and the person who runs your company.",
      capas: { encendidas: 0, planeadas: 0 },
    },
    {
      nombre: "Radar",
      duracion: "3 to 4 hours",
      texto:
        "We work with your leadership team to see how the business is divided, where the volume is, and which decisions drive it. We rank each opportunity by its impact and by how often the task repeats.",
      entrega: "A report with the method we mapped, the prioritized opportunities, and a two-year plan.",
      equipo: "Your leadership team and our senior consultants.",
      capas: { encendidas: 0, planeadas: 5 },
    },
    {
      nombre: "Wave Zero",
      duracion: "3 months",
      texto:
        "We install the foundation: AI Central in your company, access for each person, the Brain with what your company knows, and a first business workflow, chosen in the Radar.",
      entrega: "The infrastructure up and running, and a first agent working with your team.",
      equipo: "A small group from your department, our data specialist, and the person who builds the agents.",
      capas: { encendidas: 3, planeadas: 5 },
    },
    {
      nombre: "Waves",
      duracion: "every 3 months",
      texto:
        "Each wave adds a business workflow with its agents. We implement it, measure it, and move on to the next. Between waves, you decide whether to speed up, change the order, or stop.",
      entrega: "One new workflow in operation per wave, with its measurements.",
      equipo: "The owners of each area and the INNOV.AS team you hired.",
      capas: { encendidas: 4, planeadas: 5 },
    },
    {
      nombre: "Ongoing operations",
      duracion: "always",
      texto:
        "We keep the Brain current, tune the agents as they get used, watch what each operation costs, and add whatever changes in your company.",
      entrega: "AI that gets better with use, and a team that responds.",
      equipo: "Your people day to day, with our team behind them.",
      capas: { encendidas: 5, planeadas: 5 },
    },
  ],
}

export const agentes = {
  kicker: { index: "05", label: "agents at work" },
  posterTitle: "Agents that take on work",
  posterAccent: "work",
  intro:
    "Each agent is designed with your team for a specific task and works with the systems you already use. Your people decide. The agents execute.",
  agenteLabel: "The agent",
  genteLabel: "Your people",
  rubrosLabel: "Industries",
  rubros: [
    {
      nombre: "Insurance",
      tareas: [
        {
          titulo: "Quotes",
          agente: "Builds the quote from the customer's data and each carrier's terms.",
          gente: "The broker reviews it and sends it.",
        },
        {
          titulo: "Claims",
          agente: "Organizes the claim report, requests what's missing, and assembles the file.",
          gente: "The claims analyst decides how to proceed.",
        },
        {
          titulo: "Renewals",
          agente: "Spots upcoming expirations, prepares the proposal, and schedules the outreach.",
          gente: "The account executive approves it before it goes out.",
        },
      ],
    },
    {
      nombre: "Financial services",
      tareas: [
        {
          titulo: "Client files",
          agente: "Collects each client's documents and checks them against company policy.",
          gente: "Compliance approves the exceptions.",
        },
        {
          titulo: "Credit analysis",
          agente: "Prepares the analysis from internal information and external sources.",
          gente: "The committee decides.",
        },
        {
          titulo: "Collections",
          agente: "Prioritizes the portfolio, drafts each outreach, and logs the response.",
          gente: "The team approves payment agreements.",
        },
      ],
    },
    {
      nombre: "Law firms",
      tareas: [
        {
          titulo: "Case files",
          agente: "Summarizes each update and adds it to the case record.",
          gente: "The attorney in charge validates it.",
        },
        {
          titulo: "Filings",
          agente: "Drafts a first version using the firm's templates and standards.",
          gente: "The partner reviews and signs it.",
        },
        {
          titulo: "Deadlines",
          agente: "Tracks due dates and alerts the right person in time.",
          gente: "Each owner confirms the action.",
        },
      ],
    },
    {
      nombre: "Across the company",
      tareas: [
        {
          titulo: "Customer inquiries",
          agente: "Answers questions using current policies and pricing, and logs every contact.",
          gente: "Sales takes the cases that need a person.",
        },
        {
          titulo: "Purchasing",
          agente: "Compares suppliers against the company's criteria and drafts a recommendation.",
          gente: "The purchasing manager decides.",
        },
        {
          titulo: "Onboarding and offboarding",
          agente: "When someone joins or leaves, it prepares their access and notifies each department.",
          gente: "HR confirms it.",
        },
      ],
    },
  ],
}

export const control = {
  kicker: { index: "06", label: "control" },
  frase: "Your people decide. The agents execute.",
  intro:
    "The rules don't sit in a document. The infrastructure enforces them, the same way for every person and every agent, every day.",
  foto: imagenes.reunionControl,
  items: [
    { titulo: "Everyone sees their own", texto: "Permissions by person, by topic, and by document." },
    { titulo: "Agents don't see more than they should", texto: "They work with the same permissions as the person using them." },
    { titulo: "A person approves whatever goes out", texto: "No email reaches a customer without an approval." },
    { titulo: "Everything is logged", texto: "Every action and its cost, in a log that can't be edited." },
  ],
}

export const trayectoria = {
  stats: [
    { value: 25, suffix: "", label: "years", tone: "company" as const },
    { value: 150, suffix: "+", label: "organizations", tone: "ink" as const },
    { value: 14, suffix: "", label: "countries", tone: "company" as const },
  ],
  logosLabel: "Organizations our team has worked for",
  logos: [
    "Lenovo",
    "Kimberly-Clark",
    "Pearson Education",
    "McGraw Hill",
    "Despegar.com",
    "Falabella",
    "IDB",
    "FAO",
    "SAGyP",
    "SENASA",
    "Google Argentina",
    "Grupo Don Mario",
    "BASF",
  ],
}

export const quienesSomos = {
  kicker: { index: "07", label: "who we are" },
  posterTitle: "A senior team, at your table",
  posterAccent: "at your table",
  body:
    "We're a senior team with 25 years of experience transforming more than 150 organizations in 14 countries, across consumer goods, education, agriculture, international organizations, and the public sector. We work in English and Spanish, directly with the person who runs the company.",
  body2:
    "And we use what we sell. Our sales team works on AI Central every day, with an agent that researches, drafts, and waits for a person to approve before anything goes out. We'll show it to you live in the demo.",
  cta: { label: "Get to know us →", href: "/en/about" } as Cta,
}

export const faqSection = {
  kicker: { index: "08", label: "frequently asked questions" },
  posterTitle: "Questions",
}

export const finalCta = {
  title: "Let's talk about your company",
  cta: primaryCta,
  note: conversationCtaNote,
}

/** The three pain points from the previous version of the home page. Used by components/home-portada.tsx (currently not on the home page). */
export const dolores = {
  kicker: { index: "01", label: "where you are today" },
  posterTitle: "AI everywhere",
  intro:
    "Your company already uses AI: licenses spread around, personal assistants, and an automation here and there. It works, but everyone does their own thing. The next step is to bring order to it.",
  cards: [
    {
      illustration: "dolorAdopcion",
      title: "AI lives with one or two people",
      description:
        "Someone on the team got far with their assistant: dashboards, routines, standards. All of it lives in their account. Everyone else keeps starting from scratch, and if that person leaves, it all leaves with them.",
    },
    {
      illustration: "dolorEscritura",
      title: "The AI learns from everyone, unfiltered",
      description:
        "When anyone can teach the company's AI, it learns from everything: what's right and what isn't. You need to define who writes on each topic, who reads, and who approves.",
    },
    {
      illustration: "dolorFuga",
      title: "Confidential data in personal accounts",
      description:
        "Customer data and company numbers pass through personal AI accounts. And every app built in-house has its own database and its own access.",
    },
  ],
  closing: "We organize it with your team.",
  closingAccent: "organize",
} as const
