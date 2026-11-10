import { z } from "zod"
import type { Locale } from "@/lib/i18n"
import * as es from "./es"
import * as en from "./en"

export const contacto = { es, en } satisfies Record<Locale, typeof es>

const crearEsquema = (m: typeof es.formErrors) =>
  z.object({
    nombre: z.string().min(1, m.nombreRequerido).max(200, m.nombreLargo),
    email: z.string().email(m.emailInvalido).max(255, m.emailLargo),
    empresa: z.string().min(1, m.empresaRequerida).max(200, m.empresaLarga),
    pais: z.string().min(1, m.paisRequerido).max(100, m.paisLargo),
    tamano: z.string().min(1, m.opcionRequerida),
    usoIA: z.string().min(1, m.opcionRequerida),
    consulta: z.string().max(5000, m.consultaLarga).optional().or(z.literal("")),
  })

export const contactFormSchema = (locale: Locale) => crearEsquema(contacto[locale].formErrors)

export type ContactFormValues = z.infer<ReturnType<typeof crearEsquema>>
