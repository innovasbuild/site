import { z } from "zod"

export const hero = {
  eyebrow: "// contacto → primera conversación",
  title: "Agendá una primera conversación",
  subhead:
    "30 minutos con el equipo que después implementa. Vemos qué IA ya usa tu empresa, dónde quedó trabada y cuál sería el primer paso. Sin costo.",
}

export const nextSteps = [
  "Elegís un horario.",
  "En la reunión te mostramos Central IA funcionando.",
  "Si tiene sentido, agendamos el Radar.",
]

export const meetingsUrl = process.env.NEXT_PUBLIC_HUBSPOT_MEETINGS_URL ?? ""

export const formIntro = { withAgenda: "Preferís que te escribamos?", alone: "Dejanos tus datos y coordinamos un horario." }

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
