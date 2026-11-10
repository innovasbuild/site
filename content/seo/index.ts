import type { Locale } from "@/lib/i18n"
import { seo as es } from "./es"
import { seo as en } from "./en"

/** Indexado por `key` de `routes` (lib/i18n), no por la URL pública. */
export const seo = { es, en } satisfies Record<Locale, typeof es>
