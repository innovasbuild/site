import Link from "next/link"
import { Hero } from "@/components/hero"
import { InstitutionalStrip } from "@/components/institutional-strip"
import { SectionKicker } from "@/components/section-kicker"
import { PosterHeading } from "@/components/poster-heading"
import { StatCounter } from "@/components/stat-counter"
import { VerticalRail } from "@/components/vertical-rail"
import { CtaBanner } from "@/components/cta-banner"
import { EconomicsCard } from "@/components/economics-card"
import { Faq } from "@/components/faq"
import { StepCards } from "@/components/step-cards"
import { IllustratedCards } from "@/components/illustrated-cards"
import { JsonLd } from "@/components/json-ld"
import { productSchema } from "@/lib/schema"
import { faqProducto } from "@/content/faq"
import {
  hero,
  dolores,
  piezas,
  gobierno,
  dosPuertas,
  pasos,
  implementacion,
  primerPaso,
  trayectoria,
  quienesSomos,
  faqSection,
  finalCta,
} from "@/content/home"

export default function Home() {
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
        note={hero.note}
        variant="dark"
        backdrop="dots"
      >
        <div className="mt-10 max-w-xl">
          <VerticalRail rails={hero.rails} surface="dark" />
        </div>
      </Hero>

      {/* 01 — Los tres dolores */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <SectionKicker index={dolores.kicker.index} label={dolores.kicker.label} />
        <div className="mt-3">
          <PosterHeading size="sm">{dolores.posterTitle}</PosterHeading>
        </div>
        <p className="mt-4 max-w-2xl text-ink-70">{dolores.intro}</p>
        <div className="mt-10">
          <IllustratedCards cards={dolores.cards} />
        </div>
        <p className="mt-8 font-display text-xl text-ink">{dolores.closing}</p>
      </section>

      {/* 02 — Qué es Central IA */}
      <section className="border-y border-line bg-paper-soft">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <SectionKicker index={piezas.kicker.index} label={piezas.kicker.label} />
          <div className="mt-3">
            <PosterHeading size="sm">{piezas.posterTitle}</PosterHeading>
          </div>
          <p className="mt-4 max-w-2xl text-ink-70">{piezas.intro}</p>
          <div className="mt-10 [&>div>div]:bg-paper">
            <IllustratedCards cards={piezas.cards} />
          </div>
          <Link href={piezas.cta.href} className="mt-8 inline-block font-bold text-teal hover:underline">
            {piezas.cta.label}
          </Link>
        </div>
      </section>

      {/* 03 — Gobierno en el producto */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <SectionKicker index={gobierno.kicker.index} label={gobierno.kicker.label} />
        <div className="mt-3">
          <PosterHeading size="sm" accent={gobierno.posterAccent}>{gobierno.posterTitle}</PosterHeading>
        </div>
        <p className="mt-4 font-display text-xl text-ink">{gobierno.supportLine}</p>
        <p className="mt-4 max-w-2xl text-ink-70">{gobierno.intro}</p>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {gobierno.items.map((item) => (
            <div key={item.title} className="rounded border border-ink bg-paper p-6">
              <span className="font-mono text-sm text-teal">──→</span>
              <h3 className="mt-3 font-display text-xl font-bold text-ink">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-70">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 04 — Dos puertas */}
      <section className="border-y border-line bg-paper-soft">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 md:grid-cols-2 md:items-center">
          <div>
            <SectionKicker index={dosPuertas.kicker.index} label={dosPuertas.kicker.label} />
            <div className="mt-3">
              <PosterHeading size="sm">{dosPuertas.posterTitle}</PosterHeading>
            </div>
            <p className="mt-4 font-display text-xl text-ink">{dosPuertas.supportLine}</p>
            <p className="mt-4 text-ink-70">{dosPuertas.body}</p>
          </div>
          <div className="rounded border border-ink bg-paper p-6">
            <VerticalRail rails={dosPuertas.rails} />
          </div>
        </div>
      </section>

      {/* 05 — Cómo implementamos */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <SectionKicker index={implementacion.kicker.index} label={implementacion.kicker.label} />
        <div className="mt-3">
          <PosterHeading size="sm">{implementacion.posterTitle}</PosterHeading>
        </div>
        <p className="mt-4 max-w-2xl text-ink-70">{implementacion.intro}</p>
        <div className="mt-10">
          <StepCards steps={pasos} />
        </div>
        <p className="mt-6 max-w-3xl text-sm text-ink-70">{implementacion.note}</p>
        <Link href={implementacion.cta.href} className="mt-6 inline-block font-bold text-teal hover:underline">
          {implementacion.cta.label}
        </Link>
      </section>

      {/* 06 — El primer paso, puertas adentro */}
      <section className="border-y border-line bg-paper-soft">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <SectionKicker index={primerPaso.kicker.index} label={primerPaso.kicker.label} />
          <div className="mt-3">
            <PosterHeading size="sm">{primerPaso.posterTitle}</PosterHeading>
          </div>
          <p className="mt-4 max-w-2xl text-ink-70">{primerPaso.intro}</p>
          <div className="mt-10 grid gap-6 md:grid-cols-2 [&>div]:bg-paper">
            {primerPaso.cards.map((card) => (
              <EconomicsCard key={card.title} title={card.title} items={card.items} />
            ))}
          </div>
        </div>
      </section>

      {/* 07 — Quiénes somos */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <SectionKicker index={quienesSomos.kicker.index} label={quienesSomos.kicker.label} />
        <div className="mt-3">
          <PosterHeading size="sm">{quienesSomos.posterTitle}</PosterHeading>
        </div>
        <p className="mt-4 max-w-3xl text-ink-70">{quienesSomos.body}</p>
        <div className="mt-8 flex flex-wrap gap-12 border-t border-line pt-8">
          {trayectoria.stats.map((s) => (
            <StatCounter key={s.label} value={s.value} suffix={s.suffix} label={s.label} tone={s.tone} />
          ))}
        </div>
        <p className="mt-8 max-w-3xl text-ink-70">{quienesSomos.body2}</p>
        <Link href={quienesSomos.cta.href} className="mt-6 inline-block font-bold text-teal hover:underline">
          {quienesSomos.cta.label}
        </Link>
      </section>
      <InstitutionalStrip names={trayectoria.logos} label={trayectoria.logosLabel} />

      {/* 08 — Preguntas frecuentes */}
      <section className="mx-auto max-w-3xl px-6 py-20">
        <SectionKicker index={faqSection.kicker.index} label={faqSection.kicker.label} />
        <div className="mt-3">
          <PosterHeading size="sm">{faqSection.posterTitle}</PosterHeading>
        </div>
        <div className="mt-8">
          <Faq items={faqProducto} />
        </div>
      </section>

      <CtaBanner title={finalCta.title} cta={finalCta.cta} note={finalCta.note} />
    </main>
  )
}
