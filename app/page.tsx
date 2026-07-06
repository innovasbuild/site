import Link from "next/link"
import { Hero } from "@/components/hero"
import { LevelCard } from "@/components/level-card"
import { InstitutionalStrip } from "@/components/institutional-strip"
import { DualCta } from "@/components/dual-cta"
import { SectionKicker } from "@/components/section-kicker"
import { hero, whatWeDo, thesis, credentials, finalCta } from "@/content/home"

export default function Home() {
  return (
    <main>
      <Hero
        eyebrow={hero.eyebrow}
        titlePrefix={hero.titlePrefix}
        titleHighlight={hero.titleHighlight}
        titleSuffix={hero.titleSuffix}
        subhead={hero.subhead}
        ctaPrimary={hero.ctaPrimary}
        ctaSecondary={hero.ctaSecondary}
      />

      {/* Bloque 2 — Qué hacemos */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <SectionKicker index={whatWeDo.kicker.index} label={whatWeDo.kicker.label} />
        <h2 className="mt-3 font-display text-3xl font-semibold text-ink md:text-4xl">{whatWeDo.title}</h2>
        <p className="mt-4 max-w-2xl text-ink-70">{whatWeDo.intro}</p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {whatWeDo.cards.map((card) => (
            <LevelCard key={card.title} title={card.title} description={card.description} vertical={card.vertical} />
          ))}
        </div>
      </section>

      {/* Bloque 3 — La tesis */}
      <section className="border-y border-line bg-paper-soft">
        <div className="mx-auto max-w-4xl px-6 py-20">
          <SectionKicker index={thesis.kicker.index} label={thesis.kicker.label} vertical="people" />
          <h2 className="mt-3 font-display text-3xl font-semibold text-ink md:text-4xl">{thesis.title}</h2>
          <p className="mt-4 text-ink-70">{thesis.body}</p>
          <p className="mt-6 font-medium text-ink">{thesis.intro}</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
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
          <Link href={thesis.cta.href} className="mt-6 inline-block font-semibold text-teal hover:underline">
            {thesis.cta.label}
          </Link>
        </div>
      </section>

      {/* Bloque 4 — Credenciales */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <SectionKicker index={credentials.kicker.index} label={credentials.kicker.label} />
        <h2 className="mt-3 font-display text-3xl font-semibold text-ink md:text-4xl">{credentials.title}</h2>
        <p className="mt-4 max-w-2xl text-ink-70">{credentials.intro}</p>
      </section>
      <InstitutionalStrip names={credentials.logos} />
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
      <DualCta title={finalCta.title} cardA={finalCta.cardA} cardB={finalCta.cardB} />
    </main>
  )
}
