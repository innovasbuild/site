import type { Metadata } from "next"
import { HeroFoto } from "@/components/hero-foto"
import { BandaFoto } from "@/components/banda-foto"
import { SectionKicker } from "@/components/section-kicker"
import { PosterHeading } from "@/components/poster-heading"
import { Faq } from "@/components/faq"
import { CtaBanner } from "@/components/cta-banner"
import { Camino } from "@/components/servicios/camino"
import { DosFormas } from "@/components/servicios/dos-formas"
import { OlaCero } from "@/components/servicios/ola-cero"
import { Roles } from "@/components/servicios/roles"
import { PrimerPaso } from "@/components/servicios/primer-paso"
import { seo } from "@/content/seo"
import { buildMetadata } from "@/lib/metadata"
import { faqMetodo, faqProducto } from "@/content/faq"
import { hero, principios, faqSection, finalCta } from "@/content/servicios"

export const metadata: Metadata = buildMetadata("/servicios", seo["/servicios"])

/**
 * Servicios contados desde quien decide (v1.6): un equipo que implementa la IA de la empresa de punta a punta.
 * Mismas secciones que el sitio publicado, en el mismo orden: el camino, dos formas de empezar, la ola cero,
 * cómo trabajamos, quién hace qué, el primer paso y preguntas.
 */
export default function ServiciosPage() {
  return (
    <main>
      <HeroFoto
        eyebrow={hero.eyebrow}
        posterTitle={hero.posterTitle}
        posterAccent={hero.posterAccent}
        subhead={hero.subhead}
        ctaPrimary={hero.ctaPrimary}
        ctaSecondary={hero.ctaSecondary}
        note={hero.note}
        fotos={hero.fotos}
      />

      {/* 01 — El camino, etapa por etapa */}
      <Camino />

      {/* 02 — Radar o Mapa del Método */}
      <DosFormas />

      {/* 03 — Qué deja la ola cero */}
      <OlaCero />

      {/* 04 — Cómo trabajamos */}
      <BandaFoto kicker={principios.kicker} frase={principios.frase} intro={principios.intro} foto={principios.foto} items={principios.items} encender />

      {/* 05 — Quién hace qué */}
      <Roles />

      {/* 06 — El primer paso */}
      <PrimerPaso />

      {/* 07 — Preguntas frecuentes */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <SectionKicker index={faqSection.kicker.index} label={faqSection.kicker.label} />
          <div className="mt-3">
            <PosterHeading size="sm">{faqSection.posterTitle}</PosterHeading>
          </div>
          <div className="mt-8">
            <Faq items={[...faqMetodo, ...faqProducto]} />
          </div>
        </div>
      </section>

      <CtaBanner title={finalCta.title} cta={finalCta.cta} secondary={finalCta.secondary} note={finalCta.note} />
    </main>
  )
}
