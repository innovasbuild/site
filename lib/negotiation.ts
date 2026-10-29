/**
 * Negociación de contenido por el header Accept (RFC 9110, sección 12.5.1), para servir Markdown a agentes.
 * Sin imports a propósito: así los tests la cargan directo con node.
 */

export type Representation = "markdown" | "html" | "none"

type Range = { type: string; subtype: string; q: number }

function parseAccept(accept: string): Range[] {
  return accept
    .split(",")
    .map((part) => {
      const [media, ...params] = part.trim().split(";")
      const [type, subtype] = media.trim().toLowerCase().split("/")
      let q = 1
      for (const param of params) {
        const [key, value] = param.trim().split("=")
        if (key?.trim().toLowerCase() === "q") {
          const parsed = Number.parseFloat(value)
          q = Number.isNaN(parsed) ? 0 : Math.min(Math.max(parsed, 0), 1)
        }
      }
      return { type, subtype, q }
    })
    .filter((range) => range.type && range.subtype)
}

/** q de un tipo concreto: gana el rango más específico que lo cubre (text/html > text/* > *\/*). */
function qualityFor(ranges: Range[], type: string, subtype: string): number {
  let best: { specificity: number; q: number } | null = null
  for (const range of ranges) {
    let specificity = -1
    if (range.type === type && range.subtype === subtype) specificity = 2
    else if (range.type === type && range.subtype === "*") specificity = 1
    else if (range.type === "*" && range.subtype === "*") specificity = 0
    if (specificity >= 0 && (!best || specificity > best.specificity)) best = { specificity, q: range.q }
  }
  return best?.q ?? 0
}

/**
 * Qué servir para un Accept dado. Markdown solo cuando se lo pide explícitamente (text/markdown) con una q
 * igual o mayor que la de HTML: los navegadores nunca lo piden y siguen recibiendo HTML.
 * "none" significa que el cliente no acepta ninguna de las dos (corresponde un 406).
 */
export function negotiate(accept: string | null | undefined): Representation {
  if (!accept || !accept.trim()) return "html"
  const ranges = parseAccept(accept)
  if (ranges.length === 0) return "html"

  const explicitMarkdown = ranges.some((r) => r.type === "text" && r.subtype === "markdown" && r.q > 0)
  const markdown = qualityFor(ranges, "text", "markdown")
  const html = qualityFor(ranges, "text", "html")

  if (explicitMarkdown && markdown >= html) return "markdown"
  if (html > 0) return "html"
  if (markdown > 0) return "markdown"
  return "none"
}
