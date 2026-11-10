import type { Locale } from "@/lib/i18n"
import * as es from "./es"
import * as en from "./en"
export type { Ilustracion, Componente } from "./es"
export const centralIa = { es, en } satisfies Record<Locale, typeof es>
