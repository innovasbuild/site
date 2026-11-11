import { headers } from "next/headers"
import type { Metadata } from "next"
import { SiteShell } from "./site-shell"
import { NotFoundContent } from "@/components/not-found-content"
import { locales, type Locale } from "@/lib/i18n"

export const metadata: Metadata = { title: "404 | INNOV.AS" }

/**
 * 404 de todo el sitio. El layout raíz está bajo un segmento dinámico ([lang]), así que Next no puede armar el 404
 * con layout.tsx + not-found.tsx: esta página trae el documento completo y toma el idioma del header x-lang que
 * pone proxy.ts.
 */
export default async function GlobalNotFound() {
  const value = (await headers()).get("x-lang")
  const locale: Locale = locales.find((l) => l === value) ?? "es"
  return (
    <SiteShell locale={locale}>
      <NotFoundContent locale={locale} />
    </SiteShell>
  )
}
