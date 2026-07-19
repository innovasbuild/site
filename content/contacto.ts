import { z } from "zod"
import type { Cta } from "./types"

export const hero = {
  eyebrow: "// contacto → próximo paso",
  title: "Hablemos",
  subhead: "Contanos en qué estás y te respondemos dentro de las 48 horas hábiles.",
}

export const contactFormSchema = z.object({
  nombre: z.string().min(1, "Ingresá tu nombre."),
  email: z.string().email("Ingresá un email válido."),
  empresa: z.string().min(1, "Ingresá tu empresa u organización."),
  pais: z.string().min(1, "Ingresá tu país."),
  consulta: z.string().min(1, "Contanos en qué podemos ayudarte."),
})

export type ContactFormValues = z.infer<typeof contactFormSchema>

export type ContactFormFieldValues = ContactFormValues

export const submitButtonLabel = "Enviar consulta"
export const submitNote = "Sin spam ni newsletters no pedidas. Solo respondemos tu consulta."
export const directEmailNote = "¿Preferís email?"
export const directEmail = "hola@innov.as"

export const contactCta: Cta = { label: "Hablemos", href: "/contacto" }
