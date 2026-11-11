import type { Metadata } from "next"
import { LegalDocumentPage } from "@/components/legal-document"
import { legal } from "@/content/legal"
import { buildMetadata } from "@/lib/metadata"
import { lang } from "next/root-params"
import type { Locale } from "@/lib/i18n"

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await lang()) as Locale
  return buildMetadata("/terminos", locale)
}

export default async function TerminosPage() {
  const locale = (await lang()) as Locale
  return <LegalDocumentPage locale={locale} doc={legal[locale].terminos} other="/privacidad" />
}
