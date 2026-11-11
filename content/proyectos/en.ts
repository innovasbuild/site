import type { Cta } from "../types"

export const hero = {
  eyebrow: "// projects → custom",
  posterTitle: "Custom builds",
  posterAccent: "builds",
  subhead:
    "The same team that implements AI Central builds custom data platforms and software for organizations with a specific project.",
  ctaPrimary: { label: "Tell us about your project", href: "/en/contact" } as Cta,
}

export const solutionTypes = {
  kicker: { index: "01", label: "what we build" },
  posterTitle: "What we build",
  items: [
    {
      title: "Custom platforms and products",
      description:
        "Web applications and digital products on a multi-tenant architecture: they scale to new business units, verticals, or countries without rebuilding the foundation.",
    },
    {
      title: "Data, GIS, and analytics",
      description:
        "Data pipelines, dashboards, and territorial platforms for operational decisions, with experience in satellite data and geospatial analysis.",
    },
    {
      title: "AI-powered processes",
      description:
        "Assistants and process agents embedded in the solution. AI where judgment is needed and deterministic logic where precision is needed.",
    },
    {
      title: "Integrations and APIs",
      description:
        "Orchestration across your existing systems: approvals, reports, synchronization. Traceable, auditable, and maintainable.",
    },
  ],
}

export const methodology = {
  kicker: { index: "02", label: "how we work" },
  posterTitle: "How we work",
  steps: [
    {
      title: "Discovery and architecture.",
      description:
        "We work with the teams involved, design the solution architecture, and fix the scope for each phase. Structural decisions are made with the business in the room.",
    },
    {
      title: "Phased build.",
      description:
        "Each phase delivers a verifiable piece of the system: design, development, and acceptance testing, with a decision point between phases.",
    },
    {
      title: "Going live.",
      description: "A supported launch: intensive monitoring, fine-tuning, and handoff to the client's teams.",
    },
    {
      title: "Ongoing operations.",
      description: "The platform is operated and evolves, with monitored and secured infrastructure.",
    },
  ],
  principles: [
    "AI where judgment is needed; deterministic logic where precision is needed.",
    "Structured data as the contract between systems.",
    "Everything traceable: every decision the system makes can be explained.",
    "Scalability planned before the first line of code is written.",
  ],
}

export const audience = {
  kicker: { index: "03", label: "who it's for" },
  posterTitle: "Who it's for",
  items: [
    "Companies with a platform or digital product project, and a sponsor in executive leadership or general management.",
    "Government agencies and the public sector, through competitive bidding or direct contracting.",
  ],
  note: "If what you need is to bring order to your company's AI, look at AI Central.",
  noteCta: { label: "AI Central →", href: "/en/ai-central" } as Cta,
}

export const finalCta = {
  title: "Tell us about your project",
  cta: { label: "Let's talk", href: "/en/contact" } as Cta,
  note: "The first conversation is with the team that does the work afterward.",
}
