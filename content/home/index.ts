import type { Locale } from "@/lib/i18n"
import * as es from "./es"
import * as en from "./en"

export const home = { es, en } satisfies Record<Locale, typeof es>
