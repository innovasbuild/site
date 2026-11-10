import type { Locale } from "@/lib/i18n"
import * as es from "./es"
import * as en from "./en"

export const proyectos = { es, en } satisfies Record<Locale, typeof es>
