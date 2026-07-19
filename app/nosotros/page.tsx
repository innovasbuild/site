import type { Metadata } from "next"
import { Hero } from "@/components/hero"
import { SectionKicker } from "@/components/section-kicker"
import { CtaBanner } from "@/components/cta-banner"
import { seo } from "@/content/seo"
import { hero, history, team, principles, finalCta } from "@/content/nosotros"

export const metadata: Metadata = seo["/nosotros"]

export default function NosotrosPage() {
  return (
    <main>
      <Hero eyebrow={hero.eyebrow} title={hero.title} subhead={hero.subhead} ctaPrimary={hero.ctaPrimary} />

      <section className="mx-auto max-w-4xl px-6 py-20">
        <SectionKicker index={history.kicker.index} label={history.kicker.label} />
        <h2 className="mt-3 font-display text-3xl font-semibold text-ink md:text-4xl">{history.title}</h2>
        <p className="mt-4 text-ink-70">
          {history.body} {history.bodyDato}
        </p>
        <p className="mt-4 text-ink-70">{history.closing}</p>
      </section>

      <section className="border-y border-line bg-paper-soft">
        <div className="mx-auto max-w-4xl px-6 py-20">
          <SectionKicker index={team.kicker.index} label={team.kicker.label} vertical="people" />
          <h2 className="mt-3 font-display text-3xl font-semibold text-ink md:text-4xl">{team.title}</h2>
          <p className="mt-4 font-medium text-ink">{team.mission}</p>
          <p className="mt-4 text-ink-70">{team.intro}</p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {team.focus.map((item) => (
              <div key={item.title} className="rounded border border-ink bg-paper p-6">
                <p className="font-display text-lg font-semibold text-ink">{item.title}</p>
                <p className="mt-2 text-sm text-ink-70">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-20">
        <SectionKicker index={principles.kicker.index} label={principles.kicker.label} />
        <h2 className="mt-3 font-display text-3xl font-semibold text-ink md:text-4xl">{principles.title}</h2>
        <ul className="mt-8 space-y-4">
          {principles.items.map((item) => (
            <li key={item} className="flex gap-3 text-sm text-ink-70">
              <span className="font-mono text-teal">→</span> {item}
            </li>
          ))}
        </ul>
      </section>

      <CtaBanner title={finalCta.title} cta={finalCta.cta} />
    </main>
  )
}
