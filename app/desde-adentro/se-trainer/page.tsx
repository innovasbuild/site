import type { Metadata } from "next"
import { Hero } from "@/components/hero"
import { SectionKicker } from "@/components/section-kicker"
import { LevelCard } from "@/components/level-card"
import { LevelRecoveryTable } from "@/components/level-recovery-table"
import { TrainerFaq } from "@/components/trainer-faq"
import { CtaBanner } from "@/components/cta-banner"
import { seo } from "@/content/seo"
import { hero, opportunity, howItWorks, transparency, profile, recovery, faq, finalCta } from "@/content/se-trainer"

export const metadata: Metadata = seo["/desde-adentro/se-trainer"]

export default function SeTrainerPage() {
  return (
    <main>
      <Hero eyebrow={hero.eyebrow} title={hero.title} subhead={hero.subhead} ctaPrimary={hero.ctaPrimary} />

      {/* La oportunidad */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <SectionKicker index={opportunity.kicker.index} label={opportunity.kicker.label} vertical="people" />
        <h2 className="mt-3 font-display text-3xl font-semibold text-ink md:text-4xl">{opportunity.title}</h2>
        <p className="mt-4 max-w-2xl text-ink-70">{opportunity.intro}</p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {opportunity.items.map((item) => (
            <LevelCard key={item.title} title={item.title} description={item.description} vertical="people" />
          ))}
        </div>
      </section>

      {/* Cómo funciona */}
      <section className="border-y border-line bg-paper-soft">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <SectionKicker index={howItWorks.kicker.index} label={howItWorks.kicker.label} vertical="people" />
          <h2 className="mt-3 font-display text-3xl font-semibold text-ink md:text-4xl">{howItWorks.title}</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {howItWorks.steps.map((step) => (
              <div key={step.title} className="rounded border border-ink bg-paper p-5">
                <p className="font-display text-lg font-semibold text-ink">{step.title}</p>
                <p className="mt-2 text-sm text-ink-70">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transparencia */}
      <section className="mx-auto max-w-4xl px-6 py-20">
        <SectionKicker index={transparency.kicker.index} label={transparency.kicker.label} vertical="people" />
        <h2 className="mt-3 font-display text-3xl font-semibold text-ink md:text-4xl">{transparency.title}</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded border border-teal bg-paper-soft p-5">
            <p className="font-mono text-xs text-teal">ES:</p>
            <p className="mt-2 text-sm text-ink-70">{transparency.isText}</p>
          </div>
          <div className="rounded border border-ink bg-paper-soft p-5">
            <p className="font-mono text-xs text-ink-40">NO ES:</p>
            <p className="mt-2 text-sm text-ink-70">{transparency.isNotText}</p>
          </div>
        </div>
      </section>

      {/* Perfil buscado + recuperación de inversión */}
      <section className="border-y border-line bg-paper-soft">
        <div className="mx-auto grid max-w-5xl gap-10 px-6 py-20 md:grid-cols-2">
          <div>
            <SectionKicker index={profile.kicker.index} label={profile.kicker.label} vertical="people" />
            <h2 className="mt-3 font-display text-2xl font-semibold text-ink">{profile.title}</h2>
            <ul className="mt-6 space-y-3">
              {profile.items.map((item) => (
                <li key={item} className="flex gap-2 text-sm text-ink-70">
                  <span className="font-mono text-plum">→</span> {item}
                </li>
              ))}
            </ul>
          </div>
          <LevelRecoveryTable title={recovery.title} rows={recovery.rows} />
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-6 py-20">
        <h2 className="font-display text-3xl font-semibold text-ink md:text-4xl">Preguntas frecuentes</h2>
        <div className="mt-8">
          <TrainerFaq items={faq} />
        </div>
      </section>

      <CtaBanner title="Aplicá a la certificación" cta={finalCta.cta} note={finalCta.note} />
    </main>
  )
}
