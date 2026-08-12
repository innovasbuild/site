import type { Metadata } from "next"
import { Hero } from "@/components/hero"
import { SectionKicker } from "@/components/section-kicker"
import { CtaBanner } from "@/components/cta-banner"
import { PosterHeading } from "@/components/poster-heading"
import { StatCounter } from "@/components/stat-counter"
import { seo } from "@/content/seo"
import { buildMetadata } from "@/lib/metadata"
import { hero, history, team, principles, finalCta } from "@/content/nosotros"

export const metadata: Metadata = buildMetadata("/nosotros", seo["/nosotros"])

export default function NosotrosPage() {
  return (
    <main>
      <Hero eyebrow={hero.eyebrow} posterTitle={hero.posterTitle} posterAccent={hero.posterAccent} subhead={hero.subhead} ctaPrimary={hero.ctaPrimary} />

      <section className="mx-auto max-w-4xl px-6 py-20">
        <SectionKicker index={history.kicker.index} label={history.kicker.label} />
        <div className="mt-3"><PosterHeading size="sm">{history.posterTitle}</PosterHeading></div>
        <p className="mt-4 text-ink-70">{history.body}</p>
        <div className="mt-8 flex flex-wrap gap-12 border-t border-line pt-8">
          {history.stats.map((s) => (
            <StatCounter key={s.label} value={s.value} suffix={s.suffix} label={s.label} tone={s.tone} />
          ))}
        </div>
        <p className="mt-8 text-ink-70">{history.closing}</p>
      </section>

      <section className="border-y border-line bg-paper-soft">
        <div className="mx-auto max-w-4xl px-6 py-20">
          <SectionKicker index={team.kicker.index} label={team.kicker.label} vertical="people" />
          <div className="mt-3"><PosterHeading size="sm" tone="people">{team.posterTitle}</PosterHeading></div>
          <p className="mt-4 font-medium text-ink">{team.mission}</p>
          <p className="mt-4 text-ink-70">{team.intro}</p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {team.focus.map((item) => (
              <div key={item.title} className="rounded border border-ink bg-paper p-6">
                <p className="font-display text-lg font-bold text-ink">{item.title}</p>
                <p className="mt-2 text-sm text-ink-70">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-20">
        <SectionKicker index={principles.kicker.index} label={principles.kicker.label} />
        <div className="mt-3"><PosterHeading size="sm">{principles.posterTitle}</PosterHeading></div>
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
