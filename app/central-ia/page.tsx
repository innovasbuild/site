import Link from "next/link"
import type { Metadata } from "next"
import { ArrowText } from "@/components/arrow"
import { Hero } from "@/components/hero"
import { PageSection } from "@/components/page-section"
import { ArrowList } from "@/components/arrow-list"
import { CtaBanner } from "@/components/cta-banner"
import { JsonLd } from "@/components/json-ld"
import { Foto } from "@/components/foto"
import { ComponentesGrid } from "@/components/central/componentes-grid"
import { Continuidad } from "@/components/central/continuidad"
import { seo } from "@/content/seo"
import { buildMetadata } from "@/lib/metadata"
import { productSchema } from "@/lib/schema"
import { hero, control, conEquipo, sistemas, finalCta } from "@/content/central-ia"

export const metadata: Metadata = buildMetadata("/central-ia", seo["/central-ia"])

/**
 * Central IA contada por sus componentes y lo que le dan a la empresa, sin pantallas ni demos del producto:
 * componentes, continuidad del conocimiento, control, el equipo que la implementa y el detalle para sistemas.
 */
export default function CentralIaPage() {
  return (
    <main>
      <JsonLd data={productSchema} />
      <Hero
        field="flow"
        eyebrow={hero.eyebrow}
        posterTitle={hero.posterTitle}
        posterAccent={hero.posterAccent}
        posterSize="sm"
        supportLine={hero.supportLine}
        subhead={hero.subhead}
        ctaPrimary={hero.ctaPrimary}
        ctaSecondary={hero.ctaSecondary}
      />

      {/* 01 — Componentes y su beneficio */}
      <ComponentesGrid />

      {/* 02 — Cuando alguien se va */}
      <Continuidad />

      {/* 03 — Control */}
      <PageSection kicker={control.kicker} posterTitle={control.posterTitle} posterAccent={control.posterAccent} width="lg">
        <p className="mt-4 max-w-2xl text-ink-70">{control.lead}</p>
        <div className="mt-8 divide-y divide-line rounded-[16px] border border-ink bg-paper">
          {control.levels.map((level, i) => (
            <div key={level.what} className="grid gap-2 p-5 sm:grid-cols-[3rem_1fr_1fr] sm:items-center">
              <span className="font-mono text-xs text-ink-40">0{i + 1}</span>
              <p className="text-[15px] text-ink">{level.what}</p>
              <p className="text-[15px] font-medium text-teal">{level.rule}</p>
            </div>
          ))}
        </div>
      </PageSection>

      {/* 04 — Viene con un equipo */}
      <section className="bg-ink text-paper">
        <div className="mx-auto grid max-w-7xl lg:grid-cols-2">
          <Foto imagen={conEquipo.foto} className="min-h-[320px] lg:min-h-[520px]" />
          <div className="flex flex-col justify-center px-6 py-16 md:px-16">
            <p className="font-mono text-[13px] tracking-[0.12em] text-teal-dark uppercase">
              {conEquipo.kicker.index} · {conEquipo.kicker.label}
            </p>
            <h2 className="mt-4 font-display text-[clamp(2.25rem,4vw,3.5rem)] leading-[1.02] font-medium tracking-[-0.03em]">
              {conEquipo.titulo}
            </h2>
            <p className="mt-5 max-w-lg text-[17px] leading-[1.6] text-paper/75">{conEquipo.texto}</p>
            <Link href={conEquipo.cta.href} className="mt-8 inline-block font-semibold text-lima hover:underline">
              <ArrowText>{`${conEquipo.cta.label} →`}</ArrowText>
            </Link>
          </div>
        </div>
      </section>

      {/* 05 — Para sistemas */}
      <PageSection kicker={sistemas.kicker} posterTitle={sistemas.posterTitle}>
        <ArrowList items={sistemas.items} className="mt-8" />
      </PageSection>

      <CtaBanner title={finalCta.title} cta={finalCta.cta} secondary={finalCta.secondary} note={finalCta.note} />
    </main>
  )
}
