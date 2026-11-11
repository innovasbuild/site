import type { Metadata } from "next"
import { LegalDocumentPage } from "@/components/legal-document"
import { legal } from "@/content/legal"
import { buildMetadata } from "@/lib/metadata"
import { lang } from "next/root-params"
import type { Locale } from "@/lib/i18n"

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await lang()) as Locale
  return buildMetadata("/privacidad", locale)
}

export default async function PrivacidadPage() {
  const locale = (await lang()) as Locale
  return <LegalDocumentPage locale={locale} doc={legal[locale].privacidad} other="/terminos" />
}
