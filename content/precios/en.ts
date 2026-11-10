import type { Cta } from "../types"
import { primaryCta } from "../global/en"
import { signupHref } from "../shared"
import type { FaqItem } from "../faq/es"
import type { Plan } from "./es"

const talkCta: Cta = { label: "Let's talk", href: "/en/contact" }

export const hero = {
  eyebrow: "// pricing → plans",
  posterTitle: "Get started now",
  posterAccent: "now",
  supportLine: "Three plans, from your first team to the whole company.",
  subhead:
    "You create your company's account in minutes and work with the Brain from day one. When more people join, you pay per person. If you want our team to implement it with you, we build it to fit.",
  ctaPrimary: primaryCta,
  ctaSecondary: talkCta,
}

export const planes = {
  kicker: { index: "01", label: "plans" },
  posterTitle: "Three plans",
  items: [
    {
      id: "gratis",
      name: "Free",
      price: "USD 0",
      period: "for 3 months, up to 3 users",
      description: "For a small team to try AI Central for three months with what the company knows.",
      features: [
        "Three months of use.",
        "Up to 3 users.",
        "Brain with pages, folders, and version history.",
        "Permissions by folder and by page.",
        "Up to 5 skills.",
        "Connection to Claude and ChatGPT through MCP.",
        "Sign-in restricted to your company's domain.",
      ],
      cta: { label: "Get started", href: signupHref("gratis", "en") },
      note: "AI usage inside the platform is billed by consumption.",
    },
    {
      id: "equipo",
      name: "Team",
      price: "USD 10",
      period: "per user per month",
      example: "5 users: USD 50 per month.",
      description: "So the whole company works from the same Brain and the same rules.",
      includesFrom: "Everything in Free, plus:",
      features: [
        "Unlimited users.",
        "Unlimited skills.",
      ],
      cta: { label: "Choose Team", href: signupHref("equipo", "en") },
      note: "AI usage inside the platform is billed by consumption.",
      featured: true,
    },
    {
      id: "empresa",
      name: "Enterprise",
      price: "Custom",
      period: "with our team",
      description:
        "To implement AI Central with a team that has experience running AI in production, and that operates it with you.",
      includesFrom: "Everything in Team, plus:",
      features: [
        "Radar: three to four hours with your leadership team and a two-year plan. Credited when you implement Wave Zero.",
        "Method Map: the method of each area of the business, with the scope of each quarterly wave. Credited when you implement Wave Zero and Wave One.",
        "Three-month work waves, with a fixed scope and something running at the end of each one.",
        "Skills and agents built around your method, and your tools connected.",
        "Ongoing operation of the platform and support so your people adopt it.",
      ],
      cta: talkCta,
      link: { label: "See services →", href: "/en/services" },
      note: "Starts with the Radar or the Method Map.",
    },
  ] satisfies Plan[],
}

export const consumo = {
  kicker: { index: "02", label: "ai usage" },
  posterTitle: "You pay for what you use",
  posterAccent: "use",
  body:
    "The Brain, permissions, and skills are included in every plan. What's billed separately is the use of AI models inside the platform, in chat and in agents, based on what each company consumes.",
  items: [
    {
      title: "With your own assistant",
      description:
        "If your people work from their own Claude or ChatGPT connected through MCP, the model runs on that license.",
    },
    {
      title: "Spending in plain sight",
      description: "Every model call is logged with its cost.",
    },
    {
      title: "With a cap",
      description: "Each company has a spending cap, and each agent a daily budget.",
    },
  ],
}

export const faqSection = {
  kicker: { index: "03", label: "frequently asked questions" },
  posterTitle: "Questions",
}

export const faqPrecios: FaqItem[] = [
  {
    question: "What's a skill?",
    answer:
      "It's a procedure from your company, written so the assistant can follow it step by step: how to answer a complaint, how to build a quote, how to qualify a customer. It lives in AI Central, and anyone with permission can use it, from the platform or from their assistant.",
  },
  {
    question: "What happens when the fourth person joins?",
    answer:
      "The company moves to the Team plan and pays for each user. Everything they loaded on the Free plan stays as is.",
  },
  {
    question: "What happens after three months?",
    answer:
      "To keep using AI Central, the company moves to the Team plan and pays for each user. Everything they loaded on the Free plan stays as is.",
  },
  {
    question: "Do I need ChatGPT or Claude?",
    answer:
      "No. People without their own assistant go straight to the platform from the browser. People who already have a license connect AI Central to their assistant and use it from there.",
  },
  {
    question: "What currency do you bill in?",
    answer: "Prices are in US dollars and don't include any taxes that apply in your country.",
  },
  {
    question: "How is the Enterprise plan priced?",
    answer:
      "It starts with a first conversation at no cost. If it makes sense to continue, there are two assessments. The Radar maps your company in three to four hours with the leadership team, sizes Wave Zero, and is credited when you implement it. The Method Map goes into each area of the business, defines the scope of the quarterly waves, and is credited when you implement Wave Zero and Wave One. Each work wave is quoted with a fixed scope before it starts.",
  },
]

export const finalCta = {
  title: "Create your company's account",
  cta: primaryCta,
  secondary: talkCta,
  note: "Free for three months, up to 3 users and 5 skills.",
}
