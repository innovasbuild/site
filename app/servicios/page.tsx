import type { Metadata } from "next"
import { Hero } from "@/components/hero"
import { PageSection } from "@/components/page-section"
import { ArrowList } from "@/components/arrow-list"
import { StepCards } from "@/components/step-cards"
import { EconomicsCard } from "@/components/economics-card"
import { Faq } from "@/components/faq"
import { CtaBanner } from "@/components/cta-banner"
import { seo } from "@/content/seo"
import { buildMetadata } from "@/lib/metadata"
import { faqProducto, faqMetodo } from "@/content/faq"
import { hero, camino, diagnosticos, olaCero, principios, roles, primerPaso, finalCta } from "@/content/servicios"

export const metadata: Metadata = buildMetadata("/servicios", seo["/servicios"])

export default function ServiciosPage() {
  return (
    <main>
      <Hero
        field="waves"
        eyebrow={hero.eyebrow}
        posterTitle={hero.posterTitle}
        posterAccent={hero.posterAccent}
        posterSize="sm"
        supportLine={hero.supportLine}
        subhead={hero.subhead}
        ctaPrimary={hero.ctaPrimary}
        ctaSecondary={hero.ctaSecondary}
      />

      <PageSection kicker={camino.kicker} posterTitle={camino.posterTitle} width="lg">
        <div className="mt-10">
          <StepCards steps={camino.steps} />
        </div>
      </PageSection>

      <PageSection kicker={diagnosticos.kicker} posterTitle={diagnosticos.posterTitle} soft width="lg">
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {diagnosticos.cards.map((card) => (
            <div key={card.title} className="rounded border border-ink bg-paper p-6">
              <h3 className="font-display text-2xl font-bold text-ink">{card.title}</h3>
              <p className="mt-2 font-medium text-ink">{card.lead}</p>
              <ArrowList items={card.items} className="mt-4" />
            </div>
          ))}
        </div>
      </PageSection>

      <PageSection kicker={olaCero.kicker} posterTitle={olaCero.posterTitle}>
        <p className="mt-4 text-ink-70">{olaCero.intro}</p>
        <ArrowList items={olaCero.items} className="mt-6" />
      </PageSection>

      <PageSection kicker={principios.kicker} posterTitle={principios.posterTitle} soft>
        <ArrowList items={principios.items} className="mt-8" />
      </PageSection>

      <PageSection kicker={roles.kicker} posterTitle={roles.posterTitle} width="lg">
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {roles.cards.map((card) => (
            <EconomicsCard key={card.title} title={card.title} items={card.items} />
          ))}
        </div>
      </PageSection>

      <PageSection kicker={primerPaso.kicker} posterTitle={primerPaso.posterTitle} soft width="lg">
        <p className="mt-4 max-w-2xl text-ink-70">{primerPaso.intro}</p>
        <div className="mt-10 grid gap-6 md:grid-cols-2 [&>div]:bg-paper">
          {primerPaso.cards.map((card) => (
            <EconomicsCard key={card.title} title={card.title} items={card.items} />
          ))}
        </div>
      </PageSection>

      <PageSection kicker={{ index: "07", label: "preguntas frecuentes" }} posterTitle="Preguntas">
        <div className="mt-8">
          <Faq items={[...faqMetodo, ...faqProducto]} />
        </div>
      </PageSection>

      <CtaBanner title={finalCta.title} cta={finalCta.cta} secondary={finalCta.secondary} note={finalCta.note} />
    </main>
  )
}
