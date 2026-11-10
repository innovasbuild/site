import type { Cta } from "../types"
import { primaryCta, conversationCtaNote } from "../global/en"
import { imagenes, type Imagen } from "../imagenes/en"

/**
 * About, English version. Rule from the brain (company/innov-overview): no names or bios of team members;
 * experience is told as a group (25 years, more than 150 organizations, 14 countries). The photos are for mood
 * and aren't presented as the real team.
 */

export const hero = {
  eyebrow: "// about → in the field",
  posterTitle: "Twenty-five years in the field",
  posterAccent: "in the field",
  subhead:
    "We're a senior team of product, data, and engineering people. For years, we've been putting technology to work inside organizations that can't afford mistakes. AI Central, and the way we implement it, come from that.",
  ctaPrimary: primaryCta,
  foto: imagenes.techoVidrio,
}

/** Why we exist: three sentences that light up, each ending with a small pill-shaped photo. */
export const porQue = {
  kicker: { index: "01", label: "why we exist" },
  frases: [
    { texto: "We watched companies fill up with scattered AI.", foto: imagenes.rolesTuLado },
    { texto: "We saw that rules written in a document don't last.", foto: imagenes.rolesNuestro },
    { texto: "So we built them into the infrastructure, and we sit down to implement it with each company.", foto: imagenes.equipoFondo },
  ] as { texto: string; foto: Imagen }[],
}

export const trayectoria = {
  kicker: { index: "02", label: "where we come from" },
  posterTitle: "Technology that makes it into production",
  posterAccent: "production",
  body:
    "We've built territorial data platforms, satellite analysis, consumer-goods e-commerce, and educational platforms, for companies, international organizations, and the public sector.",
  closing:
    "That experience shaped how we work: architecture that scales, organized data, everything logged, and projects that go into production.",
  cifras: [
    { value: 25, suffix: "", label: "years", texto: "building technology for organizations that can't afford mistakes." },
    { value: 150, suffix: "+", label: "organizations", texto: "companies, international organizations, and the public sector." },
    { value: 14, suffix: "", label: "countries" },
  ] as { value: number; suffix: string; label: string; texto?: string }[],
  link: { label: "We also build custom software →", href: "/en/projects" } as Cta,
}

/** The team: photo on one side, how we work and the four profiles on the other. */
export const equipo = {
  kicker: { index: "03", label: "the team" },
  titulo: "The people who design, build, and run it",
  texto:
    "We're a small, stable team with fixed roles. You work with the same people from the first meeting through operations, with no layers in between, and with agents that multiply what we can deliver.",
  foto: imagenes.equipoFondo,
  perfiles: [
    { titulo: "Data", texto: "Maps where the information lives and organizes it." },
    { titulo: "Architecture", texto: "Designs the foundation that scales and answers for it." },
    { titulo: "Agents", texto: "Builds each agent with the person who does the task." },
    { titulo: "Process and adoption", texto: "Supports people until the new way sticks." },
  ],
}

/** We use what we sell: INNOV.AS's own sales agent, step by step. */
export const loUsamos = {
  kicker: { index: "04", label: "we use what we sell" },
  posterTitle: "Our sales team already works this way",
  posterAccent: "this way",
  intro:
    "Every day, on AI Central. An agent prepares the work and a person decides. We'll show it to you live in the demo.",
  pasos: [
    { nombre: "Researches", texto: "Reads the account and what we know about its industry in our Brain.", quien: "agente" as const },
    { nombre: "Drafts", texto: "Writes the message in our voice, following our rules.", quien: "agente" as const },
    { nombre: "Waits", texto: "Nothing goes out until a person on the team approves it.", quien: "gente" as const },
    { nombre: "Logs", texto: "Every step is recorded: who approved it and what it cost.", quien: "agente" as const },
  ],
  agenteLabel: "The agent",
  genteLabel: "A person",
}

export const principios = {
  kicker: { index: "05", label: "how we think" },
  posterTitle: "Our four non-negotiables",
  posterAccent: "non-negotiables",
  items: [
    {
      frase: "Control is part of the product.",
      texto: "Permissions, approvals, and the activity log are enforced by the infrastructure, not by a document.",
    },
    {
      frase: "Infrastructure first.",
      texto: "Getting the structure right pays off forever: every new agent builds on what's already there.",
    },
    {
      frase: "Adoption is the product.",
      texto: "A system is worth what people actually use. That's why we work with your team, not around it.",
    },
    {
      frase: "Precise where there's no room for error.",
      texto: "Fixed rules where precision matters, AI where judgment is needed.",
    },
  ],
}

export const finalCta = {
  title: "Meet the team that will work with you",
  cta: primaryCta,
  note: conversationCtaNote,
}
