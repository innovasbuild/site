import type { Metadata } from "next"
import Link from "next/link"
import { Hero } from "@/components/hero"
import { SectionKicker } from "@/components/section-kicker"
import { LevelPath } from "@/components/level-path"
import { LevelEvolutionDiagram } from "@/components/level-evolution-diagram"
import { seo } from "@/content/seo"
import { buildMetadata } from "@/lib/metadata"
import { hero, notACourse, levels, executiveClose, whyInnovas, finalCta } from "@/content/desde-adentro"

export const metadata: Metadata = buildMetadata("/desde-adentro", seo["/desde-adentro"], { noindex: true })

export default function DesdeAdentroPage() {
  return (
    <main>
      <Hero eyebrow={hero.eyebrow} title={hero.title} subhead={hero.subhead} ctaPrimary={hero.ctaPrimary} />

      {/* Por qué no es un curso */}
      <section className="mx-auto max-w-4xl px-6 py-20">
        <SectionKicker index={notACourse.kicker.index} label={notACourse.kicker.label} vertical="people" />
        <h2 className="mt-3 font-display text-3xl font-bold text-ink md:text-4xl">{notACourse.title}</h2>
        <p className="mt-4 text-ink-70">{notACourse.body}</p>
        <p className="mt-4 text-ink-70">{notACourse.closing}</p>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {notACourse.cycle.map((item, index) => (
            <div key={item.step} className="rounded border border-ink bg-paper-soft p-5">
              <span className="font-mono text-xs text-plum">{`0${index + 1}`}</span>
              <p className="mt-2 font-display text-lg font-bold text-ink">{item.step}</p>
              <p className="mt-1 text-sm text-ink-70">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Los 4 niveles */}
      <section className="border-y border-line bg-paper-soft">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <SectionKicker index={levels.kicker.index} label={levels.kicker.label} />
          <h2 className="mt-3 font-display text-3xl font-bold text-ink md:text-4xl">{levels.title}</h2>

          <div className="mt-8 flex aspect-[21/9] items-center justify-center rounded border border-ink bg-paper p-6">
            <LevelEvolutionDiagram className="h-full w-full" />
          </div>

          <div className="mt-10">
            <LevelPath items={levels.items} />
          </div>
          <p className="mt-8 text-sm text-ink-40">{levels.footnote}</p>
        </div>
      </section>

      {/* Cierre ejecutivo */}
      <section className="mx-auto max-w-4xl px-6 py-20">
        <SectionKicker index={executiveClose.kicker.index} label={executiveClose.kicker.label} />
        <h2 className="mt-3 font-display text-3xl font-bold text-ink md:text-4xl">{executiveClose.title}</h2>
        <p className="mt-4 text-ink-70">{executiveClose.body}</p>
      </section>

      {/* Por qué INNOV.AS */}
      <section className="border-y border-line bg-ink text-paper">
        <div className="mx-auto max-w-4xl px-6 py-20">
          <SectionKicker index={whyInnovas.kicker.index} label={whyInnovas.kicker.label} className="text-paper/40" />
          <h2 className="mt-3 font-display text-3xl font-bold text-paper md:text-4xl">{whyInnovas.title}</h2>
          <p className="mt-4 text-paper/70">{whyInnovas.body}</p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-16 text-center">
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href={finalCta.ctaPrimary.href}
            className="rounded bg-teal px-6 py-3 text-base font-bold text-on-brand transition-transform hover:-translate-y-0.5 hover:shadow-teal"
          >
            {finalCta.ctaPrimary.label}
          </Link>
          <Link href={finalCta.ctaSecondary.href} className="text-sm font-bold text-plum hover:underline">
            {finalCta.ctaSecondary.label}
          </Link>
        </div>
      </section>
    </main>
  )
}
