import { ArrowText } from "@/components/arrow"
import type { Metadata } from "next"
import Link from "next/link"
import { Hero } from "@/components/hero"
import { PageSection } from "@/components/page-section"
import { ArrowList } from "@/components/arrow-list"
import { CtaBanner } from "@/components/cta-banner"
import { StatCounter } from "@/components/stat-counter"
import { InstitutionalStrip } from "@/components/institutional-strip"
import { seo } from "@/content/seo"
import { buildMetadata } from "@/lib/metadata"
import { trayectoria } from "@/content/home"
import { hero, why, history, team, principles, finalCta } from "@/content/nosotros"

export const metadata: Metadata = buildMetadata("/nosotros", seo["/nosotros"])

export default function NosotrosPage() {
  return (
    <main>
      <Hero
        eyebrow={hero.eyebrow}
        posterTitle={hero.posterTitle}
        posterAccent={hero.posterAccent}
        posterSize="sm"
        subhead={hero.subhead}
        ctaPrimary={hero.ctaPrimary}
        ctaSecondary={hero.ctaSecondary}
      />

      <PageSection kicker={why.kicker} posterTitle={why.posterTitle}>
        <p className="mt-4 text-ink-70">{why.body}</p>
        <p className="mt-4 font-display text-xl text-ink">{why.lead}</p>
      </PageSection>

      <PageSection kicker={history.kicker} posterTitle={history.posterTitle} soft>
        <p className="mt-4 text-ink-70">{history.body}</p>
        <div className="mt-8 flex flex-wrap gap-12 border-t border-line pt-8">
          {trayectoria.stats.map((s) => (
            <StatCounter key={s.label} value={s.value} suffix={s.suffix} label={s.label} tone={s.tone} />
          ))}
        </div>
        <p className="mt-8 text-ink-70">{history.closing}</p>
        <Link href={history.link.href} className="mt-6 inline-block font-bold text-teal hover:underline">
          <ArrowText>{history.link.label}</ArrowText>
        </Link>
      </PageSection>
      <InstitutionalStrip names={trayectoria.logos} label={trayectoria.logosLabel} />

      <PageSection kicker={team.kicker} posterTitle={team.posterTitle}>
        <p className="mt-4 text-ink-70">{team.intro}</p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {team.focus.map((item) => (
            <div key={item.title} className="rounded border border-ink bg-paper-soft p-6">
              <p className="font-display text-lg font-bold text-ink">{item.title}</p>
              <p className="mt-2 text-sm text-ink-70">{item.description}</p>
            </div>
          ))}
        </div>
      </PageSection>

      <PageSection kicker={principles.kicker} posterTitle={principles.posterTitle} soft>
        <ArrowList items={principles.items} className="mt-8" />
      </PageSection>

      <CtaBanner title={finalCta.title} cta={finalCta.cta} secondary={finalCta.secondary} />
    </main>
  )
}
