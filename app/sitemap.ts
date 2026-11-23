import type { MetadataRoute } from "next"
import { EN_LIVE, hreflangFor, pathFor, routes } from "@/lib/i18n"

const baseUrl = "https://innov.as"
const absolute = (languages: Record<string, string>) =>
  Object.fromEntries(Object.entries(languages).map(([lang, path]) => [lang, `${baseUrl}${path}`]))

export default function sitemap(): MetadataRoute.Sitemap {
  // /precios queda fuera mientras no esté publicada; la presentación de Central IA es material por link, sin indexar.
  const keys = routes.map((r) => r.key).filter((key) => key !== "/precios" && key !== "/central-ia/presentacion")
  const locales = EN_LIVE ? (["es", "en"] as const) : (["es"] as const)
  return keys.flatMap((key) =>
    locales.map((locale) => {
      const languages = hreflangFor(key)
      return {
        url: `${baseUrl}${pathFor(key, locale)}`,
        lastModified: new Date(),
        ...(languages ? { alternates: { languages: absolute(languages) } } : {}),
      }
    }),
  )
}
