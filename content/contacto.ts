import { z } from "zod"

export const hero = {
  eyebrow: "// contacto → primera conversación",
  title: "Empecemos por conversar",
  subhead: "Dejanos tus datos y te escribimos, o agendá directo una charla de orientación con nuestro equipo.",
}

/** Charla de orientación: se agenda en la página de reservas de HubSpot Meetings. Se puede pisar por entorno. */
export const orientacion = {
  kicker: "charla de orientación",
  title: "Agendá una charla de orientación",
  lead: "30 minutos, sin costo, con el equipo que después implementa.",
  items: [
    "Repasamos cómo es para una empresa trabajar con IA coordinada y con gobernanza.",
    "Vemos con ejemplos prácticos de tu empresa cómo funcionaría.",
  ],
  cta: "Agendar una charla de orientación",
  url: process.env.NEXT_PUBLIC_HUBSPOT_MEETINGS_URL ?? "https://meetings.hubspot.com/matias122",
}

export const formTitle = "Escribinos"

/** Formulario "Contact Form del Sitio" de HubSpot: el sitio le envía directo, sin backend propio. */
export const hubspotForm = {
  portalId: process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID ?? "51464889",
  formId: "1f6b4869-1b14-47eb-b033-b3f3e16a0e15",
}

export const tamanos = ["Hasta 50 personas", "50 a 200", "200 a 500", "Más de 500"]
export const usosIA = ["Licencias de ChatGPT", "Licencias de Claude", "Copilot u otra", "Cuentas personales", "Todavía nada"]

export const contactFormSchema = z.object({
  nombre: z.string().min(1, "Ingresá tu nombre.").max(200, "El nombre es demasiado largo."),
  email: z.string().email("Ingresá un email válido.").max(255, "El email es demasiado largo."),
  empresa: z.string().min(1, "Ingresá tu empresa.").max(200, "El nombre de la empresa es demasiado largo."),
  pais: z.string().min(1, "Ingresá tu país.").max(100, "El país es demasiado largo."),
  tamano: z.string().min(1, "Elegí una opción."),
  usoIA: z.string().min(1, "Elegí una opción."),
  consulta: z.string().max(5000, "El mensaje es demasiado largo.").optional().or(z.literal("")),
})

export type ContactFormValues = z.infer<typeof contactFormSchema>

export const submitNote = "Solo usamos tus datos para coordinar la conversación."
export const directEmailNote = "Preferís email?"
export const directEmail = "hola@innov.as"
