import type { Locale } from "@/lib/i18n"
import type { Widen } from "../types"
import * as es from "./es"
import * as en from "./en"
export type { Block, LegalDocument, LegalSection } from "./es"
export const legal = { es, en } satisfies Record<Locale, Widen<typeof es>>
