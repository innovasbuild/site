import type { Metadata } from "next"
import { ContactForm } from "@/components/contact-form"
import { MeetingsEmbed } from "@/components/meetings-embed"
import { seo } from "@/content/seo"
import { buildMetadata } from "@/lib/metadata"
import { hero, nextSteps, meetingsUrl, formIntro } from "@/content/contacto"

export const metadata: Metadata = buildMetadata("/contacto", seo["/contacto"])

export default function ContactoPage() {
  return (
    <main>
      <section className="border-b border-line bg-paper">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center">
          <p className="font-mono text-xs uppercase tracking-wider text-teal">{hero.eyebrow}</p>
          <h1 className="mt-6 text-balance font-display text-4xl font-bold text-ink md:text-5xl">{hero.title}</h1>
          <p className="mt-4 text-balance text-lg text-ink-70">{hero.subhead}</p>
          <ol className="mt-10 grid gap-4 text-left sm:grid-cols-3">
            {nextSteps.map((step, index) => (
              <li key={step} className="rounded border border-ink bg-paper-soft p-4 text-sm text-ink-70">
                <span className="block font-mono text-xs text-teal">{`0${index + 1} ──→`}</span>
                <span className="mt-2 block">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {meetingsUrl && (
        <section className="mx-auto max-w-4xl px-6 pt-16">
          <MeetingsEmbed url={meetingsUrl} />
        </section>
      )}

      <section className="px-6 py-16">
        <p className="mb-6 text-center font-display text-xl text-ink">{meetingsUrl ? formIntro.withAgenda : formIntro.alone}</p>
        <ContactForm />
      </section>
    </main>
  )
}
