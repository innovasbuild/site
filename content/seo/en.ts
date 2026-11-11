import type { RouteKey } from "@/lib/i18n"
import type { SeoMeta } from "../types"

export const seo: Record<RouteKey, SeoMeta> = {
  "/": {
    title: "A Company Run on Coordinated AI | INNOV.AS",
    description:
      "We organize your company's knowledge and data, then build the agents that take over repetitive work. It all runs on AI Central, our platform, with permissions that control who can access what.",
  },
  "/central-ia": {
    title: "AI Central: your people, agents, and tools, with permissions | INNOV.AS",
    description:
      "Your company's knowledge, agents, and tools in one place, with permissions for each person. Use it from the platform or from Claude and ChatGPT.",
  },
  "/servicios": {
    title: "Services: a team that implements AI across your company, end to end | INNOV.AS",
    description:
      "We map how your company works, organize what it knows, build the agents, and run them with you. We work in three-month waves, and each one ends with something running.",
  },
  "/precios": {
    title: "AI Central pricing: free for three months | INNOV.AS",
    description:
      "AI Central is free for three months, with up to 3 users and 5 skills. The Team plan costs USD 10 per user per month, and the Enterprise plan is custom-built with our team.",
  },
  "/proyectos": {
    title: "Custom projects: platforms, data, and software | INNOV.AS",
    description:
      "The same team that implements AI Central builds custom data platforms and software, from discovery through ongoing operations.",
  },
  "/nosotros": {
    title: "About | INNOV.AS",
    description:
      "25 years of transforming more than 150 organizations in 14 countries. AI Central, and the team that implements it, come out of that experience.",
  },
  "/contacto": {
    title: "Contact: let's start with a conversation | INNOV.AS",
    description:
      "Write to us or book a free 30-minute orientation call: what it's like to work with coordinated, governed AI, with examples from your own company.",
  },
  "/privacidad": {
    title: "Privacy Policy | INNOV.AS",
    description: "How INNOV.AS collects, uses, and protects the personal data of its clients and the users of its services.",
  },
  "/terminos": {
    title: "Terms and Conditions | INNOV.AS",
    description: "Terms and conditions for using INNOV.AS services: contracting terms, responsibilities, and the obligations of each party.",
  },
}
