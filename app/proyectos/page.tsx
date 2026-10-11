import type { Metadata } from "next"
import Link from "next/link"
import { Hero } from "@/components/hero"
import { LevelCard } from "@/components/level-card"
import { PageSection } from "@/components/page-section"
import { ArrowList } from "@/components/arrow-list"
import { StepCards } from "@/components/step-cards"
import { CtaBanner } from "@/components/cta-banner"
import { JsonLd } from "@/components/json-ld"
import { seo } from "@/content/seo"
import { buildMetadata } from "@/lib/metadata"
import { buildServiceCatalogSchema } from "@/lib/schema"
import { hero, solutionTypes, methodology, audience, finalCta } from "@/content/proyectos"

export const metadata: Metadata = buildMetadata("/proyectos", seo["/proyectos"])

export default function ProyectosPage() {
  return (
    <main>
      <JsonLd data={buildServiceCatalogSchema()} />
      <Hero
        eyebrow={hero.eyebrow}
        posterTitle={hero.posterTitle}
        posterAccent={hero.posterAccent}
        posterSize="sm"
        subhead={hero.subhead}
        ctaPrimary={hero.ctaPrimary}
      />

      <PageSection kicker={solutionTypes.kicker} posterTitle={solutionTypes.posterTitle} width="lg">
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {solutionTypes.items.map((item, index) => (
            <LevelCard key={item.title} title={item.title} description={item.description} kicker={`0${index + 1}`} />
          ))}
        </div>
      </PageSection>

      <PageSection kicker={methodology.kicker} posterTitle={methodology.posterTitle} soft width="lg">
        <div className="mt-10">
          <StepCards steps={methodology.steps} />
        </div>
        <ArrowList items={methodology.principles} className="mt-10 grid gap-3 space-y-0 border-t border-line pt-8 sm:grid-cols-2" />
      </PageSection>

      <PageSection kicker={audience.kicker} posterTitle={audience.posterTitle}>
        <ul className="mt-8 space-y-4">
          {audience.items.map((item) => (
            <li key={item} className="rounded border border-ink bg-paper-soft p-5 text-sm text-ink-70">
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-ink-70">
          {audience.note}{" "}
          <Link href={audience.noteCta.href} className="font-bold text-teal hover:underline">
            {audience.noteCta.label}
          </Link>
        </p>
      </PageSection>

      <CtaBanner title={finalCta.title} cta={finalCta.cta} note={finalCta.note} />
    </main>
  )
}
