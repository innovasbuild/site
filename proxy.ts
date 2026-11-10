import { NextResponse, type NextRequest } from "next/server"
import { negotiate } from "@/lib/negotiation"
import { buildHomeMarkdown, buildNotFoundMarkdown } from "@/lib/markdown"
import { LOCALE_COOKIE, localeRedirect, resolvePath, type Locale } from "@/lib/i18n"

const isCuentas = (pathname: string) => pathname === "/cuentas" || pathname.startsWith("/cuentas/")

const markdownHeaders = {
  "Content-Type": "text/markdown; charset=utf-8",
  Vary: "Accept",
}

/**
 * Las URLs públicas se reescriben a las internas bajo app/[lang] (/servicios → /es/servicios, /en/services →
 * /en/servicios). Además:
 * - /es/... y /en/<slug español> redirigen (308) a la URL canónica.
 * - Con EN_LIVE, una URL se redirige (307) a su par en el otro idioma si el visitante prefiere ese idioma (cookie,
 *   Accept-Language o país). Sin EN_LIVE no se redirige a nadie. Los bots y los agentes nunca se redirigen.
 * - Con Accept: text/markdown, el home y los 404 responden en Markdown (acceptmarkdown.com); los navegadores
 *   siguen recibiendo el HTML.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isNavigation = request.method === "GET" || request.method === "HEAD"
  // Lo que no es una navegación y el material por cuenta no se tocan.
  if (!isNavigation || isCuentas(pathname)) return NextResponse.next()

  // Las navegaciones internas de Next (RSC y prefetch) solo necesitan la reescritura a la ruta interna:
  // sin negociación de contenido ni redirección por idioma.
  const isInternal = request.headers.has("rsc") || request.headers.has("next-router-prefetch")

  const representation = isInternal ? "html" : negotiate(request.headers.get("accept"))

  if (representation === "none") {
    return new NextResponse("Not Acceptable. Disponible como text/html o text/markdown.\n", {
      status: 406,
      headers: { "Content-Type": "text/plain; charset=utf-8", Vary: "Accept" },
    })
  }

  const resolved = resolvePath(pathname)

  if (resolved && "redirect" in resolved) {
    const url = request.nextUrl.clone()
    url.pathname = resolved.redirect
    return NextResponse.redirect(url, 308)
  }

  // Idioma de las páginas que no existen: el 404 se muestra con el layout de su idioma.
  const notFoundLocale: Locale = pathname === "/en" || pathname.startsWith("/en/") ? "en" : "es"

  if (representation === "markdown") {
    if (resolved?.key === "/") return new NextResponse(buildHomeMarkdown(resolved.locale), { headers: markdownHeaders })
    if (!resolved) {
      return new NextResponse(buildNotFoundMarkdown(pathname, notFoundLocale), { status: 404, headers: markdownHeaders })
    }
  }

  if (!resolved) {
    // Ruta que no existe: se reescribe a una ruta interna sin página (si no, /foo caería en /[lang] con lang=foo)
    // y cae en app/global-not-found.tsx, que toma el idioma de este header.
    const headers = new Headers(request.headers)
    headers.set("x-lang", notFoundLocale)
    const url = request.nextUrl.clone()
    if (!/^\/(es|en)(\/|$)/.test(pathname)) url.pathname = `/es${pathname}`
    return NextResponse.rewrite(url, { request: { headers } })
  }

  if (!isInternal) {
    const target = localeRedirect(pathname, {
      cookie: request.cookies.get(LOCALE_COOKIE)?.value,
      acceptLanguage: request.headers.get("accept-language"),
      country: request.headers.get("x-vercel-ip-country"),
      userAgent: request.headers.get("user-agent"),
      accept: request.headers.get("accept"),
    })
    if (target) {
      const url = request.nextUrl.clone()
      url.pathname = target
      const response = NextResponse.redirect(url, 307)
      response.headers.set("Cache-Control", "private, no-store")
      return response
    }
  }

  // El HTML sigue su camino normal. Next 16 fija el Vary de las páginas al renderizar (pisa cualquier valor
  // que se ponga acá o en next.config), así que Vary: Accept solo viaja en las respuestas Markdown y 406.
  const url = request.nextUrl.clone()
  url.pathname = `/${resolved.locale}${resolved.key === "/" ? "" : resolved.key}`
  // x-lang solo lo fija este proxy (para el 404 global): se descarta el que mande el cliente.
  const headers = new Headers(request.headers)
  headers.delete("x-lang")
  return NextResponse.rewrite(url, { request: { headers } })
}

export const config = {
  // Solo páginas: se excluyen los assets de Next, la API y cualquier archivo con extensión (llms.txt, sitemap.xml…).
  matcher: ["/((?!_next/|api/|.*\\.[^/]+$).*)"],
}
