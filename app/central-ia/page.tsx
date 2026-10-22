import { Arrow } from "@/components/arrow"
import type { Metadata } from "next"
import { Hero } from "@/components/hero"
import { PageSection } from "@/components/page-section"
import { ArrowList } from "@/components/arrow-list"
import { CtaBanner } from "@/components/cta-banner"
import { JsonLd } from "@/components/json-ld"
import { HandDrawn } from "@/components/illustrations/hand-drawn"
import { homeIllustrations as il } from "@/components/illustrations/home"
import { seo } from "@/content/seo"
import { buildMetadata } from "@/lib/metadata"
import { productSchema } from "@/lib/schema"
import { hero, brain, permisos, agentes, control, puertas, herramientas, sistemas, finalCta } from "@/content/central-ia"

export const metadata: Metadata = buildMetadata("/central-ia", seo["/central-ia"])

export default function CentralIaPage() {
  return (
    <main>
      <JsonLd data={productSchema} />
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

      <PageSection kicker={brain.kicker} posterTitle={brain.posterTitle} width="lg">
        <div className="mt-6 grid gap-10 md:grid-cols-[1.2fr_0.8fr] md:items-center">
          <div>
            <p className="text-ink-70">{brain.body}</p>
            <ArrowList items={brain.features} className="mt-6" />
          </div>
          <HandDrawn illustration={il.piezaBrain} className="w-full" />
        </div>
      </PageSection>

      <PageSection kicker={permisos.kicker} posterTitle={permisos.posterTitle} soft width="lg">
        <p className="mt-4 font-display text-xl text-ink">{permisos.lead}</p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {permisos.items.map((item) => (
            <div key={item.title} className="rounded border border-ink bg-paper p-6">
              <p className="font-display text-lg font-bold text-ink">{item.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-70">{item.description}</p>
            </div>
          ))}
        </div>
      </PageSection>

      <PageSection kicker={agentes.kicker} posterTitle={agentes.posterTitle} width="lg">
        <div className="mt-6 grid gap-10 md:grid-cols-[1.2fr_0.8fr] md:items-center">
          <div>
            <p className="text-ink-70">{agentes.body}</p>
            <div className="mt-6 rounded border border-ink bg-paper-soft p-6">
              <p className="font-mono text-xs uppercase tracking-wider text-teal">{agentes.exampleTitle}</p>
              <p className="mt-3 text-sm leading-relaxed text-ink-70">{agentes.example}</p>
            </div>
            <p className="mt-6 font-medium text-ink">{agentes.closing}</p>
          </div>
          <HandDrawn illustration={il.piezaAgentes} className="w-full" />
        </div>
      </PageSection>

      <PageSection kicker={control.kicker} posterTitle={control.posterTitle} posterAccent={control.posterAccent} soft>
        <p className="mt-4 text-ink-70">{control.lead}</p>
        <div className="mt-8 divide-y divide-line rounded border border-ink bg-paper">
          {control.levels.map((level) => (
            <div key={level.what} className="grid gap-2 p-5 sm:grid-cols-2">
              <p className="text-sm text-ink">{level.what}</p>
              <p className="text-sm font-medium text-teal">{level.rule}</p>
            </div>
          ))}
        </div>
      </PageSection>

      <PageSection kicker={puertas.kicker} posterTitle={puertas.posterTitle}>
        <p className="mt-4 text-ink-70">{puertas.body}</p>
        <ol className="mt-8 grid gap-4 sm:grid-cols-2">
          {puertas.steps.map((step, index) => (
            <li key={step} className="rounded border border-ink bg-paper-soft p-5 text-sm text-ink-70">
              <span className="block font-mono text-xs text-teal">{`0${index + 1}`} <Arrow long /></span>
              <span className="mt-2 block">{step}</span>
            </li>
          ))}
        </ol>
      </PageSection>

      <PageSection kicker={herramientas.kicker} posterTitle={herramientas.posterTitle} soft width="lg">
        <div className="mt-6 grid gap-10 md:grid-cols-[1.2fr_0.8fr] md:items-center">
          <div>
            <p className="text-ink-70">{herramientas.body}</p>
            <p className="mt-4 font-medium text-ink">{herramientas.panel}</p>
          </div>
          <HandDrawn illustration={il.piezaHerramientas} className="w-full" />
        </div>
      </PageSection>

      <PageSection kicker={sistemas.kicker} posterTitle={sistemas.posterTitle}>
        <ArrowList items={sistemas.items} className="mt-8" />
      </PageSection>

      <CtaBanner title={finalCta.title} cta={finalCta.cta} secondary={finalCta.secondary} note={finalCta.note} />
    </main>
  )
}
