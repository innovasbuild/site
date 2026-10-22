import type { Cta, FooterColumn, NavLink } from "./types"

/** App de Central IA: ahí viven el alta, el onboarding y los pagos. */
export const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://app.innov.as"

/** En false, los botones de alta llevan al formulario de contacto. Pasar a true con el portal de pagos listo. */
export const signupLive = false

/** Link al alta en la app con el plan elegido. */
export const signupHref = (plan: "gratis" | "equipo") =>
  signupLive ? `${appUrl}/signup?plan=${plan}` : "/contacto"

export const navLinks: NavLink[] = [
  { label: "Central IA", href: "/central-ia" },
  { label: "Cómo implementamos", href: "/como-implementamos" },
  { label: "Nosotros", href: "/nosotros" },
]

/** CTA principal del sitio: el alta gratis en la app. */
export const primaryCta: Cta = { label: "Empezá gratis", href: signupHref("gratis") }
export const primaryCtaNote = "Gratis hasta 3 usuarios y 5 skills. El uso de IA se paga por consumo."

export const navCta: Cta = primaryCta

/** CTA secundario: la primera conversación con el equipo. */
export const conversationCta: Cta = { label: "Agendá una primera conversación", href: "/contacto" }
export const conversationCtaNote = "30 minutos, sin costo, con el equipo que después implementa."

export const footerColumns: FooterColumn[] = [
  {},
  {
    heading: "Sitemap",
    links: [
      { label: "Central IA", href: "/central-ia" },
      { label: "Cómo implementamos", href: "/como-implementamos" },
      { label: "Nosotros", href: "/nosotros" },
      { label: "Proyectos a medida", href: "/proyectos" },
      { label: "Contacto", href: "/contacto" },
    ],
  },
]

export const footerInstitutional = {
  name: "INNOV.AS",
  description:
    "INNOV.AS ofrece Central IA, la plataforma que ordena la adopción de IA en la empresa, y el equipo que la implementa. Buenos Aires, Argentina.",
}

export const footerContact = {
  email: "hola@innov.as",
  linkedin: "https://www.linkedin.com/company/innov-as",
}

export const footerLegal = "© 2026 INNOV.AS. Todos los derechos reservados."

export const globalMicrocopy = {
  submitButton: "Enviar",
  submitSuccess: "Recibimos tus datos. Te escribimos dentro de las próximas 24 horas hábiles para coordinar la conversación.",
  submitError: "No pudimos enviar el formulario. Probá de nuevo o escribinos a hola@innov.as.",
}

export const notFoundContent = {
  message: "Esta página no existe. Pero tu próxima oportunidad de automatización seguro que sí.",
  cta: { label: "Volver al inicio", href: "/" } as Cta,
}
