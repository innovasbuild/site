import type { Metadata } from "next"
import { Hero } from "@/components/hero"
import { ResourceCard } from "@/components/resource-card"
import { hero, resources } from "@/content/recursos"

export const metadata: Metadata = {
  title: "Recursos — INNOV.AS",
  description: hero.subhead,
  robots: { index: false, follow: false },
}

export default function RecursosPage() {
  return (
    <main>
      <Hero eyebrow={hero.eyebrow} title={hero.title} subhead={hero.subhead} ctaPrimary={hero.ctaPrimary} />

      <section className="mx-auto max-w-6xl px-6 py-20">
        {resources.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {resources.map((resource) => (
              <ResourceCard key={resource.title} resource={resource} />
            ))}
          </div>
        ) : (
          <p className="text-ink-70">Estamos preparando el material. Muy pronto vas a encontrar guías y recursos acá.</p>
        )}
      </section>
    </main>
  )
}
