import { NextResponse, type NextRequest } from "next/server"
import { negotiate } from "@/lib/negotiation"
import { buildHomeMarkdown, buildNotFoundMarkdown } from "@/lib/markdown"
import { seo } from "@/content/seo"

/** Rutas que existen como página. Lo que no está acá (ni bajo /cuentas) es un 404. */
const knownRoutes = new Set(Object.keys(seo))
const isKnownRoute = (pathname: string) =>
  knownRoutes.has(pathname) || pathname === "/cuentas" || pathname.startsWith("/cuentas/")

const markdownHeaders = {
  "Content-Type": "text/markdown; charset=utf-8",
  Vary: "Accept",
}

/**
 * Negociación de contenido para agentes (acceptmarkdown.com): con Accept: text/markdown, el home y los 404
 * responden en Markdown; los navegadores siguen recibiendo el HTML de siempre.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isNavigation = request.method === "GET" || request.method === "HEAD"
  // Las navegaciones internas de Next (RSC y prefetch) no se tocan.
  if (!isNavigation || request.headers.has("rsc") || request.headers.has("next-router-prefetch")) {
    return NextResponse.next()
  }

  const representation = negotiate(request.headers.get("accept"))

  if (representation === "none") {
    return new NextResponse("Not Acceptable. Disponible como text/html o text/markdown.\n", {
      status: 406,
      headers: { "Content-Type": "text/plain; charset=utf-8", Vary: "Accept" },
    })
  }

  if (representation === "markdown") {
    if (pathname === "/") return new NextResponse(buildHomeMarkdown(), { headers: markdownHeaders })
    if (!isKnownRoute(pathname)) {
      return new NextResponse(buildNotFoundMarkdown(pathname), { status: 404, headers: markdownHeaders })
    }
  }

  // El HTML sigue su camino normal. Next 16 fija el Vary de las páginas al renderizar (pisa cualquier valor
  // que se ponga acá o en next.config), así que Vary: Accept solo viaja en las respuestas Markdown y 406.
  return NextResponse.next()
}

export const config = {
  // Solo páginas: se excluyen los assets de Next, la API y cualquier archivo con extensión (llms.txt, sitemap.xml…).
  matcher: ["/((?!_next/|api/|.*\\.[^/]+$).*)"],
}
