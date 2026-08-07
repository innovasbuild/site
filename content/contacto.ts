import { z } from "zod"
import type { Cta } from "./types"

export const hero = {
  eyebrow: "// contacto → próximo paso",
  title: "Hablemos",
  subhead: "Contanos en qué estás y te respondemos dentro de las 48 horas hábiles.",
}

export const contactFormSchema = z.object({
  nombre: z.string().min(1, "Ingresá tu nombre.").max(200, "El nombre es demasiado largo."),
  email: z.string().email("Ingresá un email válido.").max(255, "El email es demasiado largo."),
  telefono: z
    .string()
    .max(30, "El teléfono es demasiado largo.")
    .regex(/^[\d\s+-]*$/, "Usá solo números, espacios, \"+\" y \"-\".")
    .optional()
    .or(z.literal("")),
  empresa: z.string().min(1, "Ingresá tu empresa u organización.").max(200, "El nombre de la empresa es demasiado largo."),
  pais: z.string().min(1, "Ingresá tu país.").max(100, "El país es demasiado largo."),
  consulta: z.string().min(1, "Contanos en qué podemos ayudarte.").max(5000, "El mensaje es demasiado largo."),
})

export type ContactFormValues = z.infer<typeof contactFormSchema>

export type ContactFormFieldValues = ContactFormValues

export const submitButtonLabel = "Enviar consulta"
export const submitNote = "Sin spam ni newsletters no pedidas. Solo respondemos tu consulta."
export const directEmailNote = "¿Preferís email?"
export const directEmail = "hola@innov.as"

export const contactCta: Cta = { label: "Hablemos", href: "/contacto" }
