/**
 * Idiomas, mapa de rutas ES↔EN y detección de idioma (la usa proxy.ts).
 * Sin imports a propósito: así los tests la cargan directo con node.
 */

export const locales = ["es", "en"] as const
export type Locale = (typeof locales)[number]

/** Mientras sea false no se redirige a nadie a /en y el inglés queda noindex. */
export const EN_LIVE = true

export const LOCALE_COOKIE = "lang"

/** `key` es la ruta interna en español sin prefijo; `es` y `en` son las URLs públicas. */
export const routes = [
  { key: "/", es: "/", en: "/en" },
  { key: "/servicios", es: "/servicios", en: "/en/services" },
  { key: "/central-ia", es: "/central-ia", en: "/en/ai-central" },
  { key: "/nosotros", es: "/nosotros", en: "/en/about" },
  { key: "/contacto", es: "/contacto", en: "/en/contact" },
  { key: "/proyectos", es: "/proyectos", en: "/en/projects" },
  { key: "/precios", es: "/precios", en: "/en/pricing" },
  { key: "/privacidad", es: "/privacidad", en: "/en/privacy" },
  { key: "/terminos", es: "/terminos", en: "/en/terms" },
] as const satisfies readonly { key: string; es: string; en: string }[]

export type RouteKey = (typeof routes)[number]["key"]

export const SPANISH_COUNTRIES = [
  "AR", "BO", "CL", "CO", "CR", "CU", "DO", "EC", "ES", "GQ",
  "GT", "HN", "MX", "NI", "PA", "PE", "PR", "PY", "SV", "UY", "VE",
]

function stripTrailingSlash(pathname: string): string {
  return pathname.length > 1 ? pathname.replace(/\/+$/, "") || "/" : pathname
}

/** URL pública → ruta interna. null si no es una ruta conocida; { redirect } para /es/... y /en/<slug español>. */
export function resolvePath(
  pathname: string,
): { locale: Locale; key: string } | { redirect: string } | null {
  const path = stripTrailingSlash(pathname)

  if (path === "/es") return { redirect: "/" }
  if (path.startsWith("/es/")) {
    // Solo se redirige a rutas españolas conocidas: evita redirects abiertos (//host) y 307 que terminan en 404.
    const rest = path.slice(3)
    const target = resolvePath(rest)
    return target && "key" in target && target.locale === "es" ? { redirect: rest } : null
  }

  const isEn = path === "/en" || path.startsWith("/en/")
  if (isEn) {
    const byEn = routes.find((r) => r.en === path)
    if (byEn) return { locale: "en", key: byEn.key }
    const bySpanishSlug = routes.find((r) => r.key !== "/" && "/en" + r.es === path)
    return bySpanishSlug ? { redirect: bySpanishSlug.en } : null
  }

  const byEs = routes.find((r) => r.es === path)
  return byEs ? { locale: "es", key: byEs.key } : null
}

export function pathFor(key: string, locale: Locale): string {
  const route = routes.find((r) => r.key === key)
  if (!route) return locale === "en" ? "/en" : "/"
  return route[locale]
}

/** Par de una URL pública en el otro idioma; si no hay par, la home de ese idioma. */
export function counterpart(pathname: string, to: Locale): string {
  const resolved = resolvePath(pathname)
  return pathFor(resolved && "key" in resolved ? resolved.key : "/", to)
}

const BOT_UA =
  /googlebot|bingbot|gptbot|claudebot|claude-web|perplexitybot|oai-searchbot|chatgpt-user|applebot|duckduckbot|yandex|baiduspider|facebookexternalhit|linkedinbot|slurp|bot|crawler|spider/i

/** Idioma del rango Accept-Language de mayor q, o null si no hay ninguno utilizable. */
function fromAcceptLanguage(header: string | null | undefined): Locale | null {
  if (!header) return null
  let best: { tag: string; q: number } | null = null
  for (const part of header.split(",")) {
    const [range, ...params] = part.trim().split(";")
    const tag = range.trim().toLowerCase()
    if (!tag || tag === "*") continue
    let q = 1
    for (const param of params) {
      const [key, value] = param.trim().split("=")
      if (key?.trim().toLowerCase() === "q") {
        const parsed = Number.parseFloat(value)
        q = Number.isNaN(parsed) ? 0 : parsed
      }
    }
    if (q > 0 && (!best || q > best.q)) best = { tag, q }
  }
  if (!best) return null
  return best.tag.split("-")[0] === "es" ? "es" : "en"
}

/** Idioma al que redirigir en la home; null = no redirigir (bot o agente). */
export function detectLocale(input: {
  cookie?: string | null
  acceptLanguage?: string | null
  country?: string | null
  userAgent?: string | null
  accept?: string | null
  enLive?: boolean
}): Locale | null {
  if (input.userAgent && BOT_UA.test(input.userAgent)) return null
  if (input.accept && input.accept.toLowerCase().includes("text/markdown")) return null

  if (!(input.enLive ?? EN_LIVE)) return "es"

  if (input.cookie === "es" || input.cookie === "en") return input.cookie

  const fromHeader = fromAcceptLanguage(input.acceptLanguage)
  if (fromHeader) return fromHeader

  if (input.country) return SPANISH_COUNTRIES.includes(input.country.toUpperCase()) ? "es" : "en"
  return "es"
}

/** Destino del redirect por idioma (307) para una URL pública conocida, o null. Sin EN_LIVE no se redirige a nadie. */
export function localeRedirect(
  pathname: string,
  input: Parameters<typeof detectLocale>[0],
): string | null {
  if (!(input.enLive ?? EN_LIVE)) return null
  const resolved = resolvePath(pathname)
  if (!resolved || !("key" in resolved)) return null
  const detected = detectLocale(input)
  return detected && detected !== resolved.locale ? counterpart(pathname, detected) : null
}

/** Alternates hreflang de una ruta (es, en, x-default → español); null mientras el inglés no esté publicado. */
export function hreflangFor(
  key: string,
  enLive: boolean = EN_LIVE,
): Record<string, string> | null {
  if (!enLive) return null
  return { es: pathFor(key, "es"), en: pathFor(key, "en"), "x-default": pathFor(key, "es") }
}
