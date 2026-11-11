import Link from "next/link"
import { Arrow } from "@/components/arrow"
import { legal, type Block, type LegalDocument } from "@/content/legal"
import { pathFor, type Locale } from "@/lib/i18n"

/** Texto con **negrita**, _cursiva_ y [enlace](destino). Los destinos que empiezan con "/" son internos. */
function Inline({ text, bold }: { text: string; bold?: boolean }) {
  const parts = text.split(/(\*\*[^*]+\*\*|_[^_]+_|\[[^\]]+\]\([^)]+\))/g)
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("**")) return <strong key={i}>{part.slice(2, -2)}</strong>
        if (part.startsWith("_")) return <em key={i}>{part.slice(1, -1)}</em>
        const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
        if (!link) return part
        const [, label, href] = link
        const className = bold ? "font-semibold text-teal underline" : "text-teal underline"
        return href.startsWith("/") ? (
          <Link key={i} href={href} className={className}>{label}</Link>
        ) : (
          <a key={i} href={href} className={className}>{label}</a>
        )
      })}
    </>
  )
}

function BlockView({ block }: { block: Block }) {
  if ("p" in block) {
    return (
      <p>
        <Inline text={block.p} />
      </p>
    )
  }
  if ("ul" in block) {
    return (
      <ul className="list-disc space-y-2 pl-5">
        {block.ul.map((item) => (
          <li key={item}>
            <Inline text={item} />
          </li>
        ))}
      </ul>
    )
  }
  const { title, lines, note, highlight } = block.card
  return (
    <div className={highlight ? "mt-2 mb-4 rounded-xl border border-teal/20 bg-paper-soft p-6" : "mt-2 rounded-xl bg-paper-soft p-6"}>
      {title && <p className={highlight ? "mb-1 font-display font-bold text-ink" : "font-display font-bold text-ink"}>{title}</p>}
      {lines.map((line) => (
        <p key={line}>
          <Inline text={line} bold={highlight} />
        </p>
      ))}
      {note && (
        <p className="mt-2 text-sm text-ink-70">
          <Inline text={note} />
        </p>
      )}
    </div>
  )
}

/** Página legal: encabezado oscuro y las secciones numeradas. `other` es la otra página legal, para el link del pie. */
export function LegalDocumentPage({ locale, doc, other }: { locale: Locale; doc: LegalDocument; other: "/privacidad" | "/terminos" }) {
  const { labels } = legal[locale]
  return (
    <main>
      <section className="border-b border-line bg-ink pt-32 pb-16 text-paper">
        <div className="mx-auto max-w-3xl px-6">
          <p className="font-mono text-xs uppercase tracking-widest text-teal-dark">{labels.eyebrow}</p>
          <h1 className="mt-4 font-display text-4xl font-bold text-paper md:text-5xl">{doc.title}</h1>
          <p className="mt-3 text-sm text-paper/50">{labels.updated}</p>
        </div>
      </section>

      <div className="mx-auto max-w-[780px] px-6 py-16 lg:py-24">
        {doc.sections.map((section) => (
          <div key={section.title} className="mb-10">
            <h2 className="font-display text-xl font-bold text-ink mb-4">{section.title}</h2>
            <div className="space-y-3 text-[15px] leading-relaxed text-ink-70">
              {section.blocks.map((block, i) => (
                <BlockView key={i} block={block} />
              ))}
            </div>
          </div>
        ))}

        <div className="mt-12 flex flex-col gap-4 border-t border-line pt-8 text-sm text-ink-70 sm:flex-row">
          <Link href={pathFor(other, locale)} className="text-teal hover:underline">
            {other === "/terminos" ? labels.seeTerms : labels.seePrivacy} <Arrow />
          </Link>
          <Link href={pathFor("/", locale)} className="hover:text-teal transition-colors">{labels.backHome}</Link>
        </div>
      </div>
    </main>
  )
}
