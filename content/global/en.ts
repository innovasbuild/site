import type { Cta, FooterColumn, NavLink } from "../types"
import { signupHref } from "../shared"

export const navLinks: NavLink[] = [
  { label: "Services", href: "/en/services" },
  { label: "AI Central", href: "/en/ai-central" },
  { label: "About", href: "/en/about" },
]

/** Main call to action: sign up in the app. */
export const primaryCta: Cta = { label: "Get started", href: signupHref("gratis", "en") }
export const primaryCtaNote = "Set up your company's account in minutes. Nothing to install."

/** Note under "Get started" in heroes and closing banners: until signup opens, the button leads to a conversation with the team. */
export const conversationCtaNote = "30 minutes with the team that does the implementation."

export const navCta: Cta = primaryCta

export const footerColumns: FooterColumn[] = [
  {},
  {
    heading: "Sitemap",
    links: [
      { label: "AI Central", href: "/en/ai-central" },
      { label: "Services", href: "/en/services" },
      { label: "Custom projects", href: "/en/projects" },
    ],
  },
]

export const footerInstitutional = {
  name: "INNOV.AS",
  description:
    "INNOV.AS offers AI Central, the platform that brings order to AI adoption across your company, and the team that implements it. Based in Buenos Aires, Argentina.",
}

export const footerContactLinks: NavLink[] = [
  { label: "About", href: "/en/about" },
  { label: "Contact", href: "/en/contact" },
]

export const footerLegal = "© 2026 INNOV.AS. All rights reserved."

export const globalMicrocopy = {
  submitButton: "Send",
  submitSuccess: "Thanks, we got your details. We'll email you within 24 business hours to set up a time to talk.",
  submitError: "We couldn't send the form. Please try again or email us at hola@innov.as.",
}

export const notFoundContent = {
  message: "This page doesn't exist. But your next automation opportunity does.",
  cta: { label: "Back to home", href: "/en" } as Cta,
}

/** Accessible label for the language switcher. */
export const languageSwitchLabel = "Change language"

/** Fixed text in the navbar and footer. */
export const chrome = {
  openMenu: "Open menu",
  contactHeading: "Contact",
  privacy: "Privacy",
  terms: "Terms and Conditions",
}

/** Labels in the Markdown version of the home page and the 404 that agents read. */
export const markdown = {
  deliverable: "Deliverable",
  moreInfo: "More information",
  links: {
    aiCentral: "AI Central",
    services: "Services",
    projects: "Custom projects",
    about: "About",
    contact: "Contact",
    llms: "Index for agents (llms.txt)",
    sitemap: "Sitemap (sitemap.xml)",
    home: "Home",
  },
  llmsPath: "/en/llms.txt",
  notFoundTitle: "404: page not found",
  notFoundBody: "The path `{path}` doesn't exist on innov.as.",
  notFoundNext: "Where to go next:",
}

/** Datos de schema.org (lib/schema.ts). */
export const schemaText = {
  areaServed: "Latin America",
  serviceCatalogName: "INNOV.AS custom projects",
}
