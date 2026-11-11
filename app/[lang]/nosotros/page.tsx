import type { Metadata } from "next"
import { HeroFoto } from "@/components/hero-foto"
import { InstitutionalStrip } from "@/components/institutional-strip"
import { CtaBanner } from "@/components/cta-banner"
import { Manifiesto } from "@/components/home/manifiesto"
import { Trayectoria } from "@/components/nosotros/trayectoria"
import { Equipo } from "@/components/nosotros/equipo"
import { LoUsamos } from "@/components/nosotros/lo-usamos"
import { Principios } from "@/components/nosotros/principios"
import { buildMetadata } from "@/lib/metadata"
import { home } from "@/content/home"
import { nosotros } from "@/content/nosotros"
import { lang } from "next/root-params"
import type { Locale } from "@/lib/i18n"

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await lang()) as Locale
  return buildMetadata("/nosotros", locale)
}

/**
 * Nosotros (v1.6): por qué existimos, de dónde venimos, cómo es el equipo, que usamos lo que vendemos y cómo
 * pensamos. Sin nombres ni bios (regla del brain); las fotos son de ambiente.
 */
export default async function NosotrosPage() {
  const locale = (await lang()) as Locale
  const { trayectoria: delHome } = home[locale]
  const { hero, porQue, finalCta } = nosotros[locale]
  return (
    <main>
      <HeroFoto
        eyebrow={hero.eyebrow}
        posterTitle={hero.posterTitle}
        posterAccent={hero.posterAccent}
        subhead={hero.subhead}
        ctaPrimary={hero.ctaPrimary}
        fotos={[hero.foto]}
      />

      {/* 01 — Por qué existimos */}
      <Manifiesto manifiesto={porQue} />

      {/* 02 — De dónde venimos, y las organizaciones */}
      <Trayectoria />
      <InstitutionalStrip names={delHome.logos} label={delHome.logosLabel} />

      {/* 03 — El equipo */}
      <Equipo />

      {/* 04 — Usamos lo que vendemos */}
      <LoUsamos />

      {/* 05 — Cómo pensamos */}
      <Principios />


      <CtaBanner title={finalCta.title} cta={finalCta.cta} note={finalCta.note} />
    </main>
  )
}
