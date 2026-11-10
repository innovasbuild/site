import { home } from "@/content/home"
import { global } from "@/content/global"
import { footerContact } from "@/content/shared"
import { seo } from "@/content/seo"
import { pathFor, type Locale } from "@/lib/i18n"

const baseUrl = "https://innov.as"

const absolute = (href: string) => (href.startsWith("/") ? `${baseUrl}${href}` : href)

/** Versión Markdown del home, para agentes que piden Accept: text/markdown. Sale del mismo contenido que la página. */
export function buildHomeMarkdown(locale: Locale): string {
  const { hero, oferta, recorrido, agentes, control, trayectoria, quienesSomos } = home[locale]
  const { markdown: md } = global[locale]
  const link = (label: string, key: string) => `- [${label}](${absolute(pathFor(key, locale))})`
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
    ...recorrido.etapas.map((etapa) => `- **${etapa.nombre}** (${etapa.duracion}): ${etapa.texto} ${md.deliverable}: ${etapa.entrega}`),
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
    `## ${md.moreInfo}`,
    "",
    link(md.links.aiCentral, "/central-ia"),
    link(md.links.services, "/servicios"),
    link(md.links.projects, "/proyectos"),
    link(md.links.about, "/nosotros"),
    link(md.links.contact, "/contacto"),
    `- [${md.links.llms}](${baseUrl}${md.llmsPath})`,
    `- Email: ${footerContact.email}`,
    "",
  )

  return lines.join("\n")
}

/** Cuerpo Markdown del 404, con caminos para seguir. */
export function buildNotFoundMarkdown(pathname: string, locale: Locale): string {
  const { markdown: md } = global[locale]
  return [
    `# ${md.notFoundTitle}`,
    "",
    md.notFoundBody.replace("{path}", pathname),
    "",
    md.notFoundNext,
    "",
    `- [${md.links.home}](${absolute(pathFor("/", locale))})`,
    `- [${md.links.llms}](${baseUrl}${md.llmsPath})`,
    `- [${md.links.sitemap}](${baseUrl}/sitemap.xml)`,
    `- [${md.links.contact}](${absolute(pathFor("/contacto", locale))})`,
    "",
  ].join("\n")
}
