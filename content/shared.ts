import { pathFor, type Locale } from "@/lib/i18n"

/** Lo que no es texto y vale igual en todos los idiomas. */

/** App de Central IA: ahí viven el alta, el onboarding y los pagos. */
export const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://app.innov.as"

/** En false, los botones de alta llevan al formulario de contacto. Pasar a true con el portal de pagos listo. */
export const signupLive = false

/** Link al alta en la app con el plan elegido; sin alta abierta, al contacto del idioma. */
export const signupHref = (plan: "gratis" | "equipo", locale: Locale = "es") =>
  signupLive ? `${appUrl}/signup?plan=${plan}` : pathFor("/contacto", locale)

/** Charla de orientación: se agenda en la página de reservas de HubSpot Meetings. Se puede pisar por entorno. */
export const meetingsUrl = process.env.NEXT_PUBLIC_HUBSPOT_MEETINGS_URL ?? "https://meetings.hubspot.com/matias122"

/** Formulario "Contact Form del Sitio" de HubSpot: el sitio le envía directo, sin backend propio. */
export const hubspotForm = {
  portalId: process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID ?? "51464889",
  formId: "1f6b4869-1b14-47eb-b033-b3f3e16a0e15",
}

export const footerContact = {
  email: "hola@innov.as",
  linkedin: "https://www.linkedin.com/company/innov-as",
}

export const directEmail = "hola@innov.as"
