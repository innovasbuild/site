import type { Metadata } from "next"
import { ContactForm } from "@/components/contact-form"
import { seo } from "@/content/seo"
import { hero } from "@/content/contacto"

export const metadata: Metadata = seo["/contacto"]

export default function ContactoPage() {
  return (
    <main>
      <section className="border-b border-line bg-paper">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center">
          <p className="font-mono text-xs uppercase tracking-wider text-teal">{hero.eyebrow}</p>
          <h1 className="mt-6 font-display text-4xl font-semibold text-ink md:text-5xl">{hero.title}</h1>
          <p className="mt-4 text-lg text-ink-70">{hero.subhead}</p>
        </div>
      </section>

      <section className="px-6 py-16">
        <ContactForm />
      </section>
    </main>
  )
}
