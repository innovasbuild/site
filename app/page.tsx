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
import { hero, whatWeDo, thesis, credentials, finalCta } from "@/content/home"

export default function Home() {
  return (
    <main>
      <Hero
        eyebrow={hero.eyebrow}
        posterTitle={hero.posterTitle}
        posterAccent={hero.posterAccent}
        posterSize="sm"
        supportLine={hero.supportLine}
        tapeLabel={hero.tapeLabel}
        subhead={hero.subhead}
        ctaPrimary={hero.ctaPrimary}
        ctaSecondary={hero.ctaSecondary}
        variant="dark"
        imageSlot={{ src: "/images/home-hero.png", alt: "Operación agéntica de noche, tratamiento duotono ink/teal" }}
      >
        <div className="mt-10 max-w-xl">
          <VerticalRail rails={hero.rails} surface="dark" />
        </div>
      </Hero>

      {/* Bloque 2 — Qué hacemos */}
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

      {/* Bloque 3 — La tesis */}
      <section className="border-y border-line bg-paper-soft">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-start">
            <div>
              <SectionKicker index={thesis.kicker.index} label={thesis.kicker.label} vertical="people" />
              <div className="mt-3">
                <PosterHeading size="sm" tone="people" accent={thesis.posterAccent}>{thesis.posterTitle}</PosterHeading>
              </div>
              <p className="mt-4 text-ink-70">{thesis.body}</p>
              <p className="mt-6 font-medium text-ink">{thesis.intro}</p>
            </div>

            <div className="flex aspect-[4/3] items-center justify-center rounded border border-ink bg-paper p-6">
              <TransitionDiagram className="h-full w-full" />
            </div>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {thesis.engines.map((engine) => (
              <div key={engine.name} className="rounded border border-ink bg-paper p-5">
                <p className={`font-mono text-xs ${engine.vertical === "people" ? "text-plum" : "text-teal"}`}>
                  {engine.name}
                </p>
                <p className="mt-2 text-sm text-ink-70">{engine.description}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-ink-70">{thesis.closing}</p>
          <Link href={thesis.cta.href} className="mt-6 inline-block font-bold text-teal hover:underline">
            {thesis.cta.label}
          </Link>
        </div>
      </section>

      {/* Bloque 4 — Credenciales */}
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

      {/* Bloque 5 — CTA final */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <PosterHeading size="sm" align="center">{finalCta.posterTitle}</PosterHeading>
        <div className="mt-10">
          <DualCta title="" cardA={finalCta.cardA} cardB={finalCta.cardB} />
        </div>
      </section>
    </main>
  )
}
