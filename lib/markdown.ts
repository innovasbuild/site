import { home } from "@/content/home"
import { footerContact } from "@/content/shared"
import { seo } from "@/content/seo"
import type { Locale } from "@/lib/i18n"

const baseUrl = "https://innov.as"

const absolute = (href: string) => (href.startsWith("/") ? `${baseUrl}${href}` : href)

/** Versión Markdown del home, para agentes que piden Accept: text/markdown. Sale del mismo contenido que la página. */
export function buildHomeMarkdown(locale: Locale): string {
  const { hero, oferta, recorrido, agentes, control, trayectoria, quienesSomos } = home[locale]
  const lines: string[] = [
    `# ${hero.posterTitle}`,
    "",
    `> ${seo[locale]["/"].description}`,
    "",
    hero.supportLine,
    "",
    hero.subhead,
    "",
    `- [${hero.ctaPrimary.label}](${absolute(hero.ctaPrimary.href)}): ${hero.note}`,
    "",
    `## ${oferta.posterTitle}`,
    "",
    oferta.intro,
    "",
    ...oferta.cards.map((card) => `- **${card.titulo}** (${card.etiqueta}): ${card.texto}`),
    "",
    `## ${recorrido.posterTitle}`,
    "",
    recorrido.intro,
    "",
    ...recorrido.etapas.map((etapa) => `- **${etapa.nombre}** (${etapa.duracion}): ${etapa.texto} Entrega: ${etapa.entrega}`),
    "",
    `## ${agentes.posterTitle}`,
    "",
    agentes.intro,
    "",
  ]

  for (const rubro of agentes.rubros) {
    lines.push(`### ${rubro.nombre}`, "")
    for (const tarea of rubro.tareas) lines.push(`- **${tarea.titulo}**: ${tarea.agente} ${tarea.gente}`)
    lines.push("")
  }

  lines.push(
    `## ${control.frase}`,
    "",
    control.intro,
    "",
    ...control.items.map((item) => `- **${item.titulo}**: ${item.texto}`),
    "",
    `## ${quienesSomos.posterTitle}`,
    "",
    quienesSomos.body,
    "",
    quienesSomos.body2,
    "",
    `${trayectoria.logosLabel}: ${trayectoria.logos.join(", ")}.`,
    "",
    "## Más información",
    "",
    `- [Central IA](${baseUrl}/central-ia)`,
    `- [Servicios](${baseUrl}/servicios)`,
    `- [Proyectos a medida](${baseUrl}/proyectos)`,
    `- [Nosotros](${baseUrl}/nosotros)`,
    `- [Contacto](${baseUrl}/contacto)`,
    `- [Índice para agentes (llms.txt)](${baseUrl}/llms.txt)`,
    `- Email: ${footerContact.email}`,
    "",
  )

  return lines.join("\n")
}

/** Cuerpo Markdown del 404, con caminos para seguir. */
export function buildNotFoundMarkdown(pathname: string, locale: Locale): string {
  return [
    "# 404: página no encontrada",
    "",
    `La ruta \`${pathname}\` no existe en innov.as.`,
    "",
    "Para seguir:",
    "",
    `- [Inicio](${baseUrl}/)`,
    `- [Índice para agentes (llms.txt)](${baseUrl}/llms.txt)`,
    `- [Mapa del sitio (sitemap.xml)](${baseUrl}/sitemap.xml)`,
    `- [Contacto](${baseUrl}/contacto)`,
    "",
  ].join("\n")
}
