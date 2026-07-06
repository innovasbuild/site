import type { Metadata } from "next"
import { Hero } from "@/components/hero"
import { LevelCard } from "@/components/level-card"
import { SectionKicker } from "@/components/section-kicker"
import { CtaBanner } from "@/components/cta-banner"
import { seo } from "@/content/seo"
import { hero, solutionTypes, methodology, audience, finalCta } from "@/content/soluciones"

export const metadata: Metadata = seo["/soluciones"]

export default function SolucionesPage() {
  return (
    <main>
      <Hero eyebrow={hero.eyebrow} title={hero.title} subhead={hero.subhead} ctaPrimary={hero.ctaPrimary} />

      <section className="mx-auto max-w-6xl px-6 py-20">
        <SectionKicker index={solutionTypes.kicker.index} label={solutionTypes.kicker.label} />
        <h2 className="mt-3 font-display text-3xl font-semibold text-ink md:text-4xl">{solutionTypes.title}</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {solutionTypes.items.map((item) => (
            <LevelCard key={item.title} title={item.title} description={item.description} />
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-paper-soft">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <SectionKicker index={methodology.kicker.index} label={methodology.kicker.label} />
          <h2 className="mt-3 font-display text-3xl font-semibold text-ink md:text-4xl">{methodology.title}</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {methodology.steps.map((step) => (
              <div key={step.title} className="rounded border border-ink bg-paper p-6">
                <p className="font-display text-lg font-semibold text-ink">{step.title}</p>
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

      <section className="mx-auto max-w-4xl px-6 py-20">
        <SectionKicker index={audience.kicker.index} label={audience.kicker.label} />
        <h2 className="mt-3 font-display text-3xl font-semibold text-ink md:text-4xl">{audience.title}</h2>
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
