import type { Cta } from "../types"
import type { Punto, Paso } from "./es"

/**
 * /en/ai-central/overview, November 2026. The AI Central overview we leave in outreach follow-ups. Written as
 * an original English version of the "INNOV.AS · AI Central · Summary" deck. Not indexed: it's for whoever
 * gets the link.
 */

export const portada = {
  eyebrow: "// ai central → overview",
  posterTitle: "AI, with governance",
  posterAccent: "with governance",
  supportLine: "AI is already inside your company. AI Central is where you govern it.",
  subhead:
    "The platform that brings your company's knowledge, agents, and tools under one permission model, plus the team that rolls it out wave by wave.",
  firma: "INNOV.AS · AI implementation for companies of every size",
}

export const momento = {
  kicker: { index: "01", label: "the moment" },
  posterTitle: "AI is already in",
  posterAccent: "already in",
  intro: "What's missing is a place to organize it.",
  puntos: [
    {
      titulo: "It lives with one or two people",
      texto:
        "Whoever uses AI does it with their own license and their own chat. What they learn stays in their account: a sharp analysis, a great reply to a client, or a solid report gets made once and stays in that chat.",
    },
    {
      titulo: "Everyone teaches it their own way",
      texto:
        "Each person loads their own criteria. A procedure, a price list, or a decision rule ends up in several versions, one per person.",
    },
    {
      titulo: "Confidential data in personal accounts",
      texto:
        "Client data, prices, margins, and salaries flow through personal assistants, outside role-based permissions and outside the company's records.",
    },
  ] as Punto[],
  cierre:
    "Boards have moved from asking how to get started with AI to asking how to organize it: who can access what, what an agent is allowed to do, and who answers for it.",
}

export const propuesta = {
  kicker: { index: "02", label: "what we propose" },
  posterTitle: "from people to company",
  posterAccent: "company",
  intro: "AI already speeds up each person. AI Central speeds up the company.",
  a: {
    etiqueta: "A · today · individual acceleration",
    titulo: "Each person moves ahead with their own license",
    items: [
      "They learn, build their analyses and routines, and get faster every week.",
      "What they gain stays in their account and leaves with them.",
      "Everyone teaches their AI what they believe, and versions multiply.",
      "The company adds up accelerated individuals, each with their own capacity.",
    ],
  },
  b: {
    etiqueta: "B · with ai central · company-wide adoption",
    titulo: "A shared brain, agents by role",
    items: [
      "The brain grows through its owners: each area decides who teaches it and what gets written down.",
      "Agents are assigned by role: each person uses the ones that fit them, with the data they're allowed to see.",
      "Everyone keeps working from their own Claude, ChatGPT, or Copilot, now connected.",
      "Acceleration becomes the company's, with governance.",
    ],
  },
  cierre:
    "From accelerated people to a company that learns. INNOV.AS implements on top of the platform: we map how each area works, build the brain, and prepare the agents you need.",
}

export const piezas = {
  kicker: { index: "03", label: "three pieces, one place" },
  posterTitle: "three pieces, one place",
  posterAccent: "one place",
  intro: "Brain, agents, and tools, all under the same permissions.",
  items: [
    {
      titulo: "Brain",
      texto:
        "Your company's collective intelligence: products, clients, suppliers, procedures, criteria, and decisions. People look things up to do their work and add to it where they're meant to contribute. Agents work from that same knowledge.",
    },
    {
      titulo: "Agents",
      texto:
        "AI workers set up for specific tasks, agreed with each area: handling inquiries, building quotes, checking documents, briefing leadership. Each agent knows which data it can use and which people can use it.",
    },
    {
      titulo: "Tools",
      texto:
        "Your management system, CRM, email, and spreadsheets, connected to the platform under the same permissions. The right people use them from the platform or from their own assistant.",
    },
  ] as Punto[],
}

export const gobierno = {
  kicker: { index: "04", label: "governance built in" },
  posterTitle: "governance built in",
  posterAccent: "built in",
  intro: "The platform enforces permissions, approvals, and the audit log.",
  reglas: [
    "Permissions by folder and by page: reader, editor, admin, or no access, per person or per role, with inheritance. The same permission applies on the web, in the connected assistant, and in a chat with an agent.",
    "Each area decides who teaches the brain. Every folder has an owner for its content and writing rules: which fields a record requires, which format, what counts as incomplete.",
    "An agent sees, at most, what the person using it can see.",
    "Anything that goes out to a client goes through a person. Always.",
    "Everything that runs is kept in a tamper-proof log, with its cost. Credentials stay out of the model's reach.",
  ],
  nivelesTitulo: "Effect level of each action",
  niveles: [
    { que: "Platform data only", regla: "Runs on its own" },
    { que: "Spends on models or third-party data", regla: "Runs on its own, with a per-run cap and a daily budget" },
    { que: "Writes to a company system, such as the management system", regla: "A policy the company chooses. Asks for approval by default" },
    { que: "Reaches someone outside, such as a client", regla: "Human approval, always" },
  ],
}

export const puertas = {
  kicker: { index: "05", label: "two doors" },
  posterTitle: "two doors",
  posterAccent: "doors",
  intro: "You start from the licenses your company already pays for.",
  items: [
    {
      titulo: "Door 1 · from the platform",
      texto:
        "People sign in with their company account and find the knowledge, agents, and tools that belong to them. A list shows what's available and how to connect it. It works for anyone who still works without an AI of their own.",
    },
    {
      titulo: "Door 2 · from their assistant",
      texto:
        "The Claude, ChatGPT, Gemini, or Copilot licenses your company enables connect to the brain, the agents, and the tools through MCP. Same content, same permissions, and everyone keeps the tool they already use.",
    },
  ] as Punto[],
  cierre:
    "When an account is deactivated at the company, access closes on both doors. What that person learned and added stays in the company's brain.",
}

export const equipo = {
  kicker: { index: "06", label: "one team, end to end" },
  posterTitle: "three layers, one team",
  posterAccent: "one team",
  intro: "You hire three layers. One team answers for all three.",
  capas: [
    {
      numero: "Layer 1",
      titulo: "Infrastructure",
      texto:
        "AI Central: the brain, permissions, the audit log, connectors, and the model gateway. Per user, per month. It's the floor everything else stands on.",
    },
    {
      numero: "Layer 2",
      titulo: "Agents",
      texto:
        "AI workers built for your company's workflows: handling inquiries, quotes, documentation, briefs for leadership. Each one with a level of delegation that grows with its track record.",
    },
    {
      numero: "Layer 3",
      titulo: "Consulting team",
      texto:
        "Senior people who interview those who do the work, write down how decisions get made, load it into the brain, and build the agents. The same people from the first conversation to day-to-day operation.",
    },
  ] as Paso[],
  cierre:
    "Whoever maps the process is the one who builds on it and the one who answers when something changes: one team across sales, implementation, and support.",
}

export const semana = {
  kicker: { index: "07", label: "what the team does" },
  posterTitle: "week by week",
  posterAccent: "week",
  intro: "What the team does during a wave.",
  pasos: [
    { numero: "1", titulo: "Listens first", texto: "Recorded interviews with the people who do the work: how it's done, how it's decided, where it gets stuck. First we understand, then we build." },
    { numero: "2", titulo: "Writes down the method", texto: "What comes out of the interviews goes into the brain with an owner, a version, and permissions. Your company's own criteria, in its own words." },
    { numero: "3", titulo: "Builds in the open", texto: "Something usable every one or two weeks: a connected source, a spreadsheet turned into a database, a dashboard, an agent. Acceptance criteria written before building." },
    { numero: "4", titulo: "Trains by role", texto: "A short program per role, built on real cases: what each person solves with AI and with which information." },
    { numero: "5", titulo: "Measures", texto: "Every workflow has its metric defined before starting: hours, days to resolution, error rate. The baseline is taken in week one." },
    { numero: "6", titulo: "Keeps it alive", texto: "After the wave, the brain stays current: what changes in the company goes in the next day. Agents are tuned to real use and the cost per operation is watched." },
  ] as Paso[],
  cierre:
    "A weekly session with your lead and a decision point at the end of each wave: continue, reprioritize, change pace, or pause, at the company's choice.",
}

export const metodo = {
  kicker: { index: "08", label: "how we work" },
  posterTitle: "three-month waves",
  posterAccent: "three-month",
  intro: "Diagnosis, Brain, and three-month waves.",
  pasos: [
    { numero: "1 · diagnosis", titulo: "The method map", texto: "We map the company's way of working together with you. You get a map with a 24-month plan, organized into development waves." },
    { numero: "2 · kickoff wave", titulo: "The company Brain", texto: "We install AI Central and build the Brain: processes, clients, and criteria in one place, with AI agents that work under each person's permissions. It runs alongside what you already do and is up and running within a few weeks." },
    { numero: "3 · three-month waves", titulo: "One process running per wave", texto: "Each wave takes a specific business process and leaves it running at the close, with its metric. Then you decide: continue, change focus, or stop. The company sets the pace." },
    { numero: "4 · separate costs", titulo: "Platform and development", texto: "AI Central is billed per user. Development (agents, integrations, process automation) happens in closed waves, quoted by how fast you want to move." },
  ] as Paso[],
  cierre: "For large companies and smaller ones, with a senior team that implements and tailored starter packs.",
}

export const nosotros = {
  kicker: { index: "09", label: "who we are" },
  posterTitle: "the platform and the team",
  posterAccent: "the team",
  cifras: [
    { value: 25, suffix: "", label: "years", caption: "transforming organizations" },
    { value: 150, suffix: "+", label: "organizations", caption: "of every size" },
    { value: 14, suffix: "", label: "countries", caption: "across Latin America and beyond" },
  ],
  texto:
    "INNOV.AS delivers services on its own platform, AI Central, which organizes AI adoption across the company with governance over information, agents, and tools. The platform runs our own sales operation: the brain, the prospecting agent, and the CRM we show are the ones we use every day. That's the proof we offer, along with a live demo.",
  sectoresTitulo: "Sectors and markets where our team has worked",
  sectores:
    "Industry · Consumer goods · Retail · Agribusiness and food · Energy · Healthcare · Insurance · Banking and fintech · Technology and telecom · Logistics · Education · Governments and international organizations.",
  comoTitulo: "How we work",
  como: "A senior team working directly with you, with AI built into delivery. Verifiable deliverables at every phase, in English or Spanish, with the person who runs the area at the table.",
}

export const cierre = {
  eyebrow: "// a ──→ b",
  posterTitle: "from A to B",
  posterAccent: "B",
  a: "Your company's method lives in emails, PDFs, spreadsheets, and in the heads of a few people. Everyone starts from scratch with their own AI.",
  b: "It lives in a governed brain, with agents that handle the repetitive work and people who decide what matters. And a team that keeps it alive, wave after wave.",
  cta: { label: "Set up a conversation", href: "/en/contact" } as Cta,
  contacto: "hola@innov.as · www.innov.as",
}
