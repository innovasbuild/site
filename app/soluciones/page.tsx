import type { Metadata } from "next"
import { Hero } from "@/components/hero"
import { LevelCard } from "@/components/level-card"
import { SectionKicker } from "@/components/section-kicker"
import { CtaBanner } from "@/components/cta-banner"
import { JsonLd } from "@/components/json-ld"
import { PosterHeading } from "@/components/poster-heading"
import { seo } from "@/content/seo"
import { buildMetadata } from "@/lib/metadata"
import { buildServiceCatalogSchema } from "@/lib/schema"
import { hero, solutionTypes, methodology, operateInB, audience, finalCta } from "@/content/soluciones"

export const metadata: Metadata = buildMetadata("/soluciones", seo["/soluciones"])

export default function SolucionesPage() {
  return (
    <main>
      <JsonLd data={buildServiceCatalogSchema()} />
      <Hero
        eyebrow={hero.eyebrow}
        posterTitle={hero.posterTitle}
        posterSize="sm"
        supportLine={hero.title}
        subhead={hero.subhead}
        ctaPrimary={hero.ctaPrimary}
      />

      <section className="mx-auto max-w-6xl px-6 py-20">
        <SectionKicker index={solutionTypes.kicker.index} label={solutionTypes.kicker.label} />
        <div className="mt-3"><PosterHeading size="sm">{solutionTypes.posterTitle}</PosterHeading></div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {solutionTypes.items.map((item) => (
            <LevelCard key={item.title} title={item.title} description={item.description} />
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-paper-soft">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <SectionKicker index={methodology.kicker.index} label={methodology.kicker.label} />
          <div className="mt-3"><PosterHeading size="sm">{methodology.posterTitle}</PosterHeading></div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {methodology.steps.map((step) => (
              <div key={step.title} className="rounded border border-ink bg-paper p-6">
                <p className="font-display text-lg font-bold text-ink">{step.title}</p>
                <p className="mt-2 text-sm text-ink-70">{step.description}</p>
              </div>
            ))}
          </div>
          <ul className="mt-10 grid gap-3 border-t border-line pt-8 sm:grid-cols-2">
            {methodology.principles.map((principle) => (
              <li key={principle} className="flex gap-2 text-sm text-ink-70">
                <span className="font-mono text-teal">→</span> {principle}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-20">
        <SectionKicker index={operateInB.kicker.index} label={operateInB.kicker.label} />
        <div className="mt-3"><PosterHeading size="sm" accent={operateInB.posterAccent}>{operateInB.posterTitle}</PosterHeading></div>
        <p className="mt-4 max-w-2xl text-ink-70">{operateInB.intro}</p>
        <p className="mt-4 max-w-2xl font-medium text-ink">{operateInB.foundation}</p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {operateInB.pillars.map((pillar) => (
            <div key={pillar.title} className="rounded border border-ink bg-paper-soft p-6">
              <p className="font-display text-lg font-bold text-ink">{pillar.title}</p>
              <p className="mt-2 text-sm text-ink-70">{pillar.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-20">
        <SectionKicker index={audience.kicker.index} label={audience.kicker.label} />
        <div className="mt-3"><PosterHeading size="sm">{audience.posterTitle}</PosterHeading></div>
        <ul className="mt-8 space-y-4">
          {audience.items.map((item) => (
            <li key={item} className="rounded border border-ink bg-paper-soft p-5 text-sm text-ink-70">
              {item}
            </li>
          ))}
        </ul>
      </section>

      <CtaBanner title={finalCta.title} cta={finalCta.cta} note={finalCta.note} />
    </main>
  )
}
