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
import { faq } from "@/content/faq"
import { servicios } from "@/content/servicios"
import { lang } from "next/root-params"
import type { Locale } from "@/lib/i18n"

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await lang()) as Locale
  return buildMetadata("/servicios", seo[locale]["/servicios"])
}

/**
 * Servicios contados desde quien decide (v1.6): un equipo que implementa la IA de la empresa de punta a punta.
 * Mismas secciones que el sitio publicado, en el mismo orden: el camino, dos formas de empezar, la ola cero,
 * cómo trabajamos, quién hace qué, el primer paso y preguntas.
 */
export default async function ServiciosPage() {
  const locale = (await lang()) as Locale
  const { faqMetodo, faqProducto } = faq[locale]
  const { hero, principios, faqSection, finalCta } = servicios[locale]
  return (
    <main>
      <HeroFoto
        eyebrow={hero.eyebrow}
        posterTitle={hero.posterTitle}
        posterAccent={hero.posterAccent}
        subhead={hero.subhead}
        ctaPrimary={hero.ctaPrimary}
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

      <CtaBanner title={finalCta.title} cta={finalCta.cta} note={finalCta.note} />
    </main>
  )
}
