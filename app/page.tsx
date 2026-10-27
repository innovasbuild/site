import { InstitutionalStrip } from "@/components/institutional-strip"
import { SectionKicker } from "@/components/section-kicker"
import { PosterHeading } from "@/components/poster-heading"
import { CtaBanner } from "@/components/cta-banner"
import { Faq } from "@/components/faq"
import { Hero } from "@/components/hero"
import { JsonLd } from "@/components/json-ld"
import { Manifiesto } from "@/components/home/manifiesto"
import { AntesDespues } from "@/components/home/antes-despues"
import { Oferta } from "@/components/home/oferta"
import { Recorrido } from "@/components/home/recorrido"
import { AgentesRubros } from "@/components/home/agentes-rubros"
import { BandaControl } from "@/components/home/banda-control"
import { QuienesSomos } from "@/components/home/quienes-somos"
import { productSchema } from "@/lib/schema"
import { faqHome } from "@/content/faq"
import { hero, trayectoria, faqSection, finalCta } from "@/content/home"

/**
 * Home. Se cuenta desde quien decide: qué hacemos (manifiesto), dónde está su empresa hoy, qué contrata
 * (infraestructura, agentes y equipo), el proceso de punta a punta, agentes trabajando por rubro, el control
 * y quiénes somos. La plataforma aparece como la base, sin pantallas.
 */
export default function Home() {
  return (
    <main>
      <JsonLd data={productSchema} />
      <Hero
        eyebrow={hero.eyebrow}
        posterTitle={hero.posterTitle}
        posterAccent={hero.posterAccent}
        posterSize="sm"
        supportLine={hero.supportLine}
        subhead={hero.subhead}
        ctaPrimary={hero.ctaPrimary}
        ctaSecondary={hero.ctaSecondary}
        note={hero.note}
        variant="dark"
        backdrop="dots"
      />
      <InstitutionalStrip names={trayectoria.logos} label={trayectoria.logosLabel} />

      {/* 01 — Qué hacemos, en una frase grande */}
      <Manifiesto />

      {/* 02 — Hoy ──→ con INNOV.AS */}
      <AntesDespues />

      {/* 03 — Lo que contratás: infraestructura, agentes, equipo */}
      <Oferta />

      {/* 04 — El proceso de punta a punta */}
      <Recorrido />

      {/* 05 — Agentes en el trabajo, por rubro */}
      <AgentesRubros />

      {/* 06 — Control */}
      <BandaControl />

      {/* 07 — Quiénes somos */}
      <QuienesSomos />

      {/* 08 — Preguntas frecuentes */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <SectionKicker index={faqSection.kicker.index} label={faqSection.kicker.label} />
          <div className="mt-3">
            <PosterHeading size="sm">{faqSection.posterTitle}</PosterHeading>
          </div>
          <div className="mt-8">
            <Faq items={faqHome} />
          </div>
        </div>
      </section>

      <CtaBanner title={finalCta.title} cta={finalCta.cta} secondary={finalCta.secondary} note={finalCta.note} />
    </main>
  )
}
