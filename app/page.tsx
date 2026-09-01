import Link from "next/link"
import { Hero } from "@/components/hero"
import { LevelCard } from "@/components/level-card"
import { InstitutionalStrip } from "@/components/institutional-strip"
import { DualCta } from "@/components/dual-cta"
import { SectionKicker } from "@/components/section-kicker"
import { TransitionDiagram } from "@/components/transition-diagram"
import { PosterHeading } from "@/components/poster-heading"
import { StatCounter } from "@/components/stat-counter"
import { VerticalRail } from "@/components/vertical-rail"
import { hero, whatWeDo, howWeExecute, thesis, credentials, enParaleloBlock, finalCta } from "@/content/home"

export default function Home() {
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
        variant="dark"
        backdrop="network"
      >
        <div className="mt-10 max-w-xl">
          <VerticalRail rails={hero.rails} surface="dark" />
        </div>
      </Hero>

      {/* Bloque 2 — Qué construimos */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <SectionKicker index={whatWeDo.kicker.index} label={whatWeDo.kicker.label} />
        <div className="mt-3">
          <PosterHeading size="sm">{whatWeDo.posterTitle}</PosterHeading>
        </div>
        <p className="mt-4 max-w-2xl text-ink-70">{whatWeDo.intro}</p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {whatWeDo.cards.map((card) => (
            <LevelCard key={card.title} title={card.title} description={card.description} vertical={card.vertical} />
          ))}
        </div>
      </section>

      {/* Bloque 3 — Cómo ejecutamos */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <SectionKicker index={howWeExecute.kicker.index} label={howWeExecute.kicker.label} />
        <div className="mt-3">
          <PosterHeading size="sm" accent={howWeExecute.posterAccent}>{howWeExecute.posterTitle}</PosterHeading>
        </div>
        <p className="mt-4 max-w-2xl text-ink-70">{howWeExecute.title}</p>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {howWeExecute.items.map((item) => (
            <div key={item.title} className="rounded border border-ink bg-paper p-6">
              <span className="font-mono text-sm text-teal">──→</span>
              <h3 className="mt-3 font-display text-xl font-bold text-ink">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-70">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bloque 4 — La tesis A→B */}
      <section className="border-y border-line bg-paper-soft">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-start">
            <div>
              <SectionKicker index={thesis.kicker.index} label={thesis.kicker.label} />
              <div className="mt-3">
                <PosterHeading size="sm" accent={thesis.posterAccent}>{thesis.posterTitle}</PosterHeading>
              </div>
              <p className="mt-4 text-ink-70">{thesis.body}</p>
              <Link href={thesis.cta.href} className="mt-6 inline-block font-bold text-teal hover:underline">
                {thesis.cta.label}
              </Link>
            </div>

            <div className="flex aspect-4/3 items-center justify-center rounded border border-ink bg-paper p-6">
              <TransitionDiagram className="h-full w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Bloque 5 — Credenciales */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <SectionKicker index={credentials.kicker.index} label={credentials.kicker.label} />
        <div className="mt-3">
          <PosterHeading size="sm">{credentials.posterTitle}</PosterHeading>
        </div>
        <div className="mt-8 flex flex-wrap items-start gap-14 border-t border-line pt-8">
          <StatCounter value={credentials.stat.value} suffix={credentials.stat.suffix} label={credentials.stat.label} />
          <p className="max-w-md self-center text-ink-70">{credentials.intro}</p>
        </div>
      </section>
      <InstitutionalStrip names={credentials.logos} label={credentials.logosLabel} />
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {credentials.projects.map((project) => (
            <div key={project} className="rounded border border-ink bg-paper-soft p-6 text-sm text-ink-70">
              {project}
            </div>
          ))}
        </div>
      </section>

      {/* Bloque 6 — En Paralelo (pymes) */}
      <section className="border-y border-line bg-paper-soft">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center">
          <div className="flex justify-center">
            <SectionKicker index={enParaleloBlock.kicker.index} label={enParaleloBlock.kicker.label} vertical="people" />
          </div>
          <div className="mt-3">
            <PosterHeading size="sm" tone="people" align="center">{enParaleloBlock.posterTitle}</PosterHeading>
          </div>
          <p className="mt-4 text-balance font-display text-xl text-ink">{enParaleloBlock.title}</p>
          <p className="mt-4 text-ink-70">{enParaleloBlock.body}</p>
          <Link
            href={enParaleloBlock.cta.href}
            className="mt-8 inline-block rounded bg-plum px-6 py-3 text-base font-bold text-on-brand transition-transform hover:-translate-y-0.5 hover:shadow-plum"
          >
            {enParaleloBlock.cta.label}
          </Link>
        </div>
      </section>

      {/* Bloque 7 — CTA final */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <PosterHeading size="sm" align="center">{finalCta.posterTitle}</PosterHeading>
        <div className="mt-10">
          <DualCta title="" cardA={finalCta.cardA} cardB={finalCta.cardB} />
        </div>
      </section>
    </main>
  )
}
