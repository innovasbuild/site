import type { Cta, FooterColumn, NavLink } from "./types"

export const navLinks: NavLink[] = [
  { label: "Soluciones", href: "/soluciones" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Contacto", href: "/contacto" },
]

export const navCta: Cta = { label: "Hablemos", href: "/contacto" }

export const footerColumns: FooterColumn[] = [
  {
    // Columna 1 — institucional, sin heading (ver t3.1-copy-sitio-innovas.md #footer)
  },
  {
    heading: "Sitemap",
    links: [
      { label: "Soluciones", href: "/soluciones" },
      { label: "Nosotros", href: "/nosotros" },
      { label: "Contacto", href: "/contacto" },
    ],
  },
]

export const footerInstitutional = {
  name: "INNOV.AS",
  description: "Soluciones tecnológicas end-to-end para transformación de empresas. Buenos Aires, Argentina.",
}

export const footerContact = {
  email: "hola@innov.as",
  linkedin: "https://www.linkedin.com/company/innov-as",
}

export const footerLegal = "© 2026 INNOV.AS. Todos los derechos reservados."

export const globalMicrocopy = {
  submitButton: "Enviar consulta",
  submitSuccess: "Recibimos tu consulta. Te respondemos dentro de las próximas 48 horas hábiles.",
  submitError: "No pudimos enviar el formulario. Probá de nuevo o escribinos a hola@innov.as.",
}

export const notFoundContent = {
  message: "Esta página no existe. Pero tu próxima oportunidad de automatización seguro que sí.",
  cta: { label: "Volver al inicio", href: "/" } as Cta,
}
