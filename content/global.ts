import type { Cta, FooterColumn, NavLink } from "./types"

/** App de Central IA: ahí viven el alta, el onboarding y los pagos. */
export const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://app.innov.as"

/** En false, los botones de alta llevan al formulario de contacto. Pasar a true con el portal de pagos listo. */
export const signupLive = false

/** Link al alta en la app con el plan elegido. */
export const signupHref = (plan: "gratis" | "equipo") =>
  signupLive ? `${appUrl}/signup?plan=${plan}` : "/contacto"

export const navLinks: NavLink[] = [
  { label: "Servicios", href: "/servicios" },
  { label: "Central IA", href: "/central-ia" },
  { label: "Nosotros", href: "/nosotros" },
]

/** CTA principal del sitio: el alta en la app. */
export const primaryCta: Cta = { label: "Empezá ahora", href: signupHref("gratis") }
export const primaryCtaNote = "Creás la cuenta de tu empresa en minutos, sin instalar nada."

/** CTA de la conversación con el equipo: el principal del home y de la barra, por la venta a empresas. */
export const conversationCta: Cta = { label: "Solicitá una demo", href: "/contacto" }
export const conversationCtaNote = "30 minutos con el equipo que después implementa."

export const navCta: Cta = conversationCta

export const footerColumns: FooterColumn[] = [
  {},
  {
    heading: "Sitemap",
    links: [
      { label: "Central IA", href: "/central-ia" },
      { label: "Servicios", href: "/servicios" },
      { label: "Nosotros", href: "#contacto" },
      { label: "Proyectos a medida", href: "/proyectos" },
      { label: "Contacto", href: "#contacto" },
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
