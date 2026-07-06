import { z } from "zod"
import type { Cta } from "./types"

export const hero = {
  eyebrow: "// contacto ──→ próximo paso",
  title: "Hablemos",
  subhead: "Contanos en qué estás y te respondemos dentro de las 48 horas hábiles.",
}

export const intents = [
  {
    value: "transformar",
    label: "Transformar mi operación",
    description: "Automatización, agentes, plataformas de datos.",
  },
  {
    value: "formar-equipo",
    label: "Formar a mi equipo",
    description: "Programa Desde Adentro in-company.",
  },
  {
    value: "ser-trainer",
    label: "Ser trainer",
    description: "Certificación en la metodología Desde Adentro.",
  },
] as const

export const tamanoEmpresaOptions = ["Menos de 50 personas", "50–200", "200–1000", "Más de 1000"]
export const personasOptions = ["<15", "15–25", "25–50", "+50"]

const baseFields = {
  nombre: z.string().min(1, "Ingresá tu nombre."),
  email: z.string().email("Ingresá un email válido."),
  empresa: z.string().min(1, "Ingresá tu empresa u organización."),
  pais: z.string().min(1, "Ingresá tu país."),
}

const transformarSchema = z.object({
  intent: z.literal("transformar"),
  ...baseFields,
  proceso: z.string().min(1, "Contanos qué proceso o área querés transformar."),
  tamanoEmpresa: z.string().min(1, "Seleccioná el tamaño de tu empresa."),
})

const formarEquipoSchema = z.object({
  intent: z.literal("formar-equipo"),
  ...baseFields,
  personas: z.string().min(1, "Seleccioná para cuántas personas."),
  area: z.string().min(1, "Contanos qué área/s."),
})

const serTrainerSchema = z.object({
  intent: z.literal("ser-trainer"),
  ...baseFields,
  linkedinOrCv: z.string().url("Ingresá una URL válida de LinkedIn o CV."),
  usoIA: z.string().min(1, "Contanos cómo usás IA hoy en tu trabajo."),
  experiencia: z.string().min(1, "Contanos tu experiencia facilitando o enseñando."),
})

export const contactFormSchema = z.discriminatedUnion("intent", [
  transformarSchema,
  formarEquipoSchema,
  serTrainerSchema,
])

export type ContactFormValues = z.infer<typeof contactFormSchema>

/**
 * Forma plana usada por react-hook-form: los campos condicionales son
 * opcionales acá y se validan de verdad contra contactFormSchema (union
 * discriminada) en el submit y en app/api/contact/route.ts.
 */
export interface ContactFormFieldValues {
  intent: ContactFormValues["intent"]
  nombre: string
  email: string
  empresa: string
  pais: string
  proceso?: string
  tamanoEmpresa?: string
  personas?: string
  area?: string
  linkedinOrCv?: string
  usoIA?: string
  experiencia?: string
}

export const submitButtonLabel = "Enviar consulta"
export const submitNote = "Sin spam ni newsletters no pedidas. Solo respondemos tu consulta."
export const directEmailNote = "¿Preferís email?"
export const directEmail = "hola@innov.as"

export const contactCta: Cta = { label: "Hablemos", href: "/contacto" }
