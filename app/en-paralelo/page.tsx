import type { Metadata } from "next"
import Link from "next/link"
import { Hero } from "@/components/hero"
import { LevelCard } from "@/components/level-card"
import { SectionKicker } from "@/components/section-kicker"
import { PosterHeading } from "@/components/poster-heading"
import { TransitionDiagram } from "@/components/transition-diagram"
import { VerticalRail } from "@/components/vertical-rail"
import { CtaBanner } from "@/components/cta-banner"
import { seo } from "@/content/seo"
import { buildMetadata } from "@/lib/metadata"
import { hero, thesis, whatWeBuild, howItWorks, audience, finalCta } from "@/content/en-paralelo"

export const metadata: Metadata = buildMetadata("/en-paralelo", seo["/en-paralelo"])

export default function EnParaleloPage() {
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
      >
        <div className="mt-10 max-w-xl">
          <VerticalRail rails={hero.rails} />
        </div>
      </Hero>

      {/* La tesis completa */}
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

            <div className="flex aspect-4/3 items-center justify-center rounded border border-ink bg-paper p-6">
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

      {/* Qué implementamos */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <SectionKicker index={whatWeBuild.kicker.index} label={whatWeBuild.kicker.label} />
        <div className="mt-3">
          <PosterHeading size="sm">{whatWeBuild.posterTitle}</PosterHeading>
        </div>
        <p className="mt-4 max-w-2xl text-ink-70">{whatWeBuild.intro}</p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {whatWeBuild.cards.map((card) => (
            <LevelCard key={card.title} title={card.title} description={card.description} vertical={card.vertical} />
          ))}
        </div>
      </section>

      {/* Cómo funciona */}
      <section id={howItWorks.id} className="border-y border-line bg-paper-soft scroll-mt-20">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <SectionKicker index={howItWorks.kicker.index} label={howItWorks.kicker.label} />
          <div className="mt-3">
            <PosterHeading size="sm">{howItWorks.posterTitle}</PosterHeading>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {howItWorks.steps.map((step) => (
              <div key={step.title} className="rounded border border-ink bg-paper p-6">
                <p className="font-display text-lg font-bold text-ink">{step.title}</p>
                <p className="mt-2 text-sm text-ink-70">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 border-t border-line pt-10">
            <h3 className="font-display text-xl font-bold text-ink">{howItWorks.operateInB.title}</h3>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {howItWorks.operateInB.pillars.map((pillar) => (
                <div key={pillar.title} className="rounded border border-ink bg-paper p-6">
                  <p className="font-display text-lg font-bold text-ink">{pillar.title}</p>
                  <p className="mt-2 text-sm text-ink-70">{pillar.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Para quién */}
      <section className="mx-auto max-w-4xl px-6 py-20">
        <SectionKicker index={audience.kicker.index} label={audience.kicker.label} />
        <div className="mt-3">
          <PosterHeading size="sm">{audience.posterTitle}</PosterHeading>
        </div>
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
      </section>

      <CtaBanner title={finalCta.title} cta={finalCta.cta} note={finalCta.note} />
    </main>
  )
}
