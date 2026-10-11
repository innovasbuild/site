import type { Metadata } from "next"
import { ArrowText } from "@/components/arrow"
import { ContactForm } from "@/components/contact-form"
import { OrientationCard } from "@/components/orientation-card"
import { seo } from "@/content/seo"
import { buildMetadata } from "@/lib/metadata"
import { hero, formTitle } from "@/content/contacto"

export const metadata: Metadata = buildMetadata("/contacto", seo["/contacto"])

export default function ContactoPage() {
  return (
    <main>
      <section className="border-b border-line bg-paper">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center">
          <p className="font-mono text-xs uppercase tracking-wider text-teal"><ArrowText>{hero.eyebrow}</ArrowText></p>
          <h1 className="mt-6 text-balance font-display text-4xl font-bold text-ink md:text-5xl">{hero.title}</h1>
          <p className="mt-4 text-balance text-lg text-ink-70">{hero.subhead}</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
        <div>
          <h2 className="mb-6 font-display text-2xl font-bold text-ink">{formTitle}</h2>
          <ContactForm />
        </div>
        <OrientationCard />
      </section>
    </main>
  )
}
