import type { Cta, FooterColumn, NavLink } from "../types"
import { signupHref } from "../shared"

export const navLinks: NavLink[] = [
  { label: "Servicios", href: "/servicios" },
  { label: "Central IA", href: "/central-ia" },
  { label: "Nosotros", href: "/nosotros" },
]

/** CTA principal del sitio: el alta en la app. */
export const primaryCta: Cta = { label: "Empieza ahora", href: signupHref("gratis") }
export const primaryCtaNote = "Creas la cuenta de tu empresa en minutos, sin instalar nada."

/** Nota bajo "Empezá ahora" en los heros y cierres: mientras el alta no está abierta, el botón lleva a la conversación con el equipo. */
export const conversationCtaNote = "30 minutos con el equipo que después implementa."

export const navCta: Cta = primaryCta

export const footerColumns: FooterColumn[] = [
  {},
  {
    heading: "Sitemap",
    links: [
      { label: "Central IA", href: "/central-ia" },
      { label: "Servicios", href: "/servicios" },
      { label: "Proyectos a medida", href: "/proyectos" },
    ],
  },
]

export const footerInstitutional = {
  name: "INNOV.AS",
  description:
    "INNOV.AS ofrece Central IA, la plataforma que ordena la adopción de IA en la empresa, y el equipo que la implementa. Buenos Aires, Argentina.",
}

export const footerContactLinks: NavLink[] = [
  { label: "Nosotros", href: "/nosotros" },
  { label: "Contacto", href: "/contacto" },
]

export const footerLegal = "© 2026 INNOV.AS. Todos los derechos reservados."

export const globalMicrocopy = {
  submitButton: "Enviar",
  submitSuccess: "Recibimos tus datos. Te escribimos dentro de las próximas 24 horas hábiles para coordinar la conversación.",
  submitError: "No pudimos enviar el formulario. Prueba de nuevo o escríbenos a hola@innov.as.",
}

export const notFoundContent = {
  message: "Esta página no existe. Pero tu próxima oportunidad de automatización seguro que sí.",
  cta: { label: "Volver al inicio", href: "/" } as Cta,
}

/** Etiqueta accesible del selector de idioma. */
export const languageSwitchLabel = "Cambiar idioma"
