import type { Metadata } from "next"
import { buildMetadata } from "@/lib/metadata"
import { lang } from "next/root-params"
import type { Locale } from "@/lib/i18n"
import { SiteShell } from "../site-shell"

export const dynamicParams = false

export function generateStaticParams() {
  return [{ lang: "es" }, { lang: "en" }]
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await lang()) as Locale
  return {
    metadataBase: new URL("https://innov.as"),
    ...buildMetadata("/", locale),
    generator: "v0.app",
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = (await lang()) as Locale
  return <SiteShell locale={locale}>{children}</SiteShell>
}
