import type { Metadata } from "next"
import { Hero } from "@/components/hero"
import { PageSection } from "@/components/page-section"
import { PlanCard } from "@/components/plan-card"
import { Faq } from "@/components/faq"
import { CtaBanner } from "@/components/cta-banner"
import { seo } from "@/content/seo"
import { buildMetadata } from "@/lib/metadata"
import { hero, planes, consumo, faqSection, faqPrecios, finalCta } from "@/content/precios"

export const metadata: Metadata = buildMetadata("/precios", seo["/precios"])

export default function PreciosPage() {
  return (
    <main>
      <Hero
        eyebrow={hero.eyebrow}
        posterTitle={hero.posterTitle}
        posterAccent={hero.posterAccent}
        posterSize="sm"
        supportLine={hero.supportLine}
        subhead={hero.subhead}
        ctaPrimary={hero.ctaPrimary}
        ctaSecondary={hero.ctaSecondary}
      />

      <PageSection kicker={planes.kicker} posterTitle={planes.posterTitle} soft width="lg">
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {planes.items.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>
      </PageSection>

      <PageSection kicker={consumo.kicker} posterTitle={consumo.posterTitle} posterAccent={consumo.posterAccent} width="lg">
        <p className="mt-4 max-w-3xl text-ink-70">{consumo.body}</p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {consumo.items.map((item) => (
            <div key={item.title} className="rounded border border-ink bg-paper-soft p-6">
              <p className="font-display text-lg font-bold text-ink">{item.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-70">{item.description}</p>
            </div>
          ))}
        </div>
      </PageSection>

      <PageSection kicker={faqSection.kicker} posterTitle={faqSection.posterTitle} soft>
        <div className="mt-8">
          <Faq items={faqPrecios} />
        </div>
      </PageSection>

      <CtaBanner title={finalCta.title} cta={finalCta.cta} secondary={finalCta.secondary} note={finalCta.note} />
    </main>
  )
}
