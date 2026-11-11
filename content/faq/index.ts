import type { Locale } from "@/lib/i18n"
import type { Widen } from "../types"
import * as es from "./es"
import * as en from "./en"
export type { FaqItem } from "./es"
export const faq = { es, en } satisfies Record<Locale, Widen<typeof es>>
