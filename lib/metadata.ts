import type { Metadata } from "next"
import { seo } from "@/content/seo"
import { EN_LIVE, hreflangFor, pathFor, type Locale, type RouteKey } from "@/lib/i18n"

const siteName = "INNOV.AS"
const defaultImage = "/images/home-hero.png"
const ogLocale = { es: "es_419", en: "en_US" } as const

export function buildMetadata(key: RouteKey, locale: Locale, options?: { noindex?: boolean }): Metadata {
  const { title, description } = seo[locale][key]
  const path = pathFor(key, locale)
  const languages = hreflangFor(key)
  const hidden = options?.noindex || (locale === "en" && !EN_LIVE)
  return {
    title,
    description,
    alternates: { canonical: path, ...(languages ? { languages } : {}) },
    openGraph: {
      title,
      description,
      url: path,
      siteName,
      locale: ogLocale[locale],
      type: "website",
      images: [{ url: defaultImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [defaultImage],
    },
    ...(hidden ? { robots: { index: false, follow: false } } : {}),
  }
}
