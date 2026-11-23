import Link from "next/link"
import type { Metadata } from "next"
import { lang } from "next/root-params"
import { Arrow } from "@/components/arrow"
import { ArrowList } from "@/components/arrow-list"
import { PageSection } from "@/components/page-section"
import { PosterHeading } from "@/components/poster-heading"
import { StatCounter } from "@/components/stat-counter"
import { buildMetadata } from "@/lib/metadata"
import { presentacion } from "@/content/presentacion"
import type { Locale } from "@/lib/i18n"

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await lang()) as Locale
  return buildMetadata("/central-ia/presentacion", locale, { noindex: true })
}

/**
 * Presentación de Central IA en una página, para dejar por link en el seguimiento del outreach. Sigue el deck
 * "Central IA · Resumen" diapositiva por diapositiva: portada y cierre oscuros (las dos secciones oscuras que
 * admite la página), y nueve secciones claras que alternan fondo.
 */
export default async function PresentacionPage() {
  const locale = (await lang()) as Locale
  const { portada, momento, propuesta, piezas, gobierno, puertas, equipo, semana, metodo, nosotros, cierre } =
    presentacion[locale]

  return (
    <main>
      {/* Portada */}
      <section className="bg-ink text-paper">
        <div className="mx-auto flex min-h-[78vh] max-w-6xl flex-col justify-center px-6 py-24">
          <p className="font-mono text-[13px] uppercase tracking-[0.12em] text-teal-dark">{portada.eyebrow}</p>
          <div className="mt-6">
            <PosterHeading as="h1" size="md" accent={portada.posterAccent} surface="dark">
              {portada.posterTitle}
            </PosterHeading>
          </div>
          <p className="mt-8 max-w-3xl font-display text-[clamp(1.5rem,2.6vw,2.25rem)] leading-[1.2]">{portada.supportLine}</p>
          <p className="mt-5 max-w-2xl text-[17px] leading-[1.6] text-paper/75">{portada.subhead}</p>
          <p className="mt-12 font-mono text-xs uppercase tracking-wider text-paper/60">{portada.firma}</p>
        </div>
      </section>

      {/* 01 · El momento */}
      <PageSection
        kicker={momento.kicker}
        posterTitle={momento.posterTitle}
        posterAccent={momento.posterAccent}
        intro={<p className="mt-4 max-w-2xl text-lg text-ink-70">{momento.intro}</p>}
      >
        <div className="mt-10 divide-y divide-line border-y border-line">
          {momento.puntos.map((p) => (
            <div key={p.titulo} className="grid gap-2 py-6 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:gap-10">
              <h3 className="font-display text-xl font-medium text-ink">{p.titulo}</h3>
              <p className="text-[15px] leading-relaxed text-ink-70">{p.texto}</p>
            </div>
          ))}
        </div>
        <p className="mt-10 max-w-3xl border-l-2 border-teal pl-5 font-display text-xl leading-snug text-ink">{momento.cierre}</p>
      </PageSection>

      {/* 02 · Lo que proponemos */}
      <PageSection
        kicker={propuesta.kicker}
        posterTitle={propuesta.posterTitle}
        posterAccent={propuesta.posterAccent}
        soft
        width="lg"
        intro={<p className="mt-4 max-w-2xl text-lg text-ink-70">{propuesta.intro}</p>}
      >
        <div className="mt-10 grid gap-6 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:items-stretch">
          {[propuesta.a, propuesta.b].map((lado, i) => (
            <div key={lado.etiqueta} className="contents">
              {i === 1 && (
                <div className="flex items-center justify-center text-teal" aria-hidden>
                  <Arrow long className="text-2xl max-md:rotate-90" />
                </div>
              )}
              <div className={i === 0 ? "rounded-[16px] border border-ink bg-paper p-6" : "rounded-[16px] border-2 border-teal bg-paper p-6"}>
                <p className={i === 0 ? "font-mono text-xs uppercase tracking-wider text-ink-40" : "font-mono text-xs uppercase tracking-wider text-teal"}>
                  {lado.etiqueta}
                </p>
                <h3 className="mt-3 font-display text-xl font-medium text-ink">{lado.titulo}</h3>
                <ArrowList items={lado.items} className="mt-5" />
              </div>
            </div>
          ))}
        </div>
        <p className="mt-10 max-w-3xl text-[17px] leading-relaxed text-ink">{propuesta.cierre}</p>
      </PageSection>

      {/* 03 · Tres piezas */}
      <PageSection
        kicker={piezas.kicker}
        posterTitle={piezas.posterTitle}
        posterAccent={piezas.posterAccent}
        width="lg"
        intro={<p className="mt-4 max-w-2xl text-lg text-ink-70">{piezas.intro}</p>}
      >
        <div className="mt-10 grid divide-y divide-line border-y border-line md:grid-cols-3 md:divide-x md:divide-y-0">
          {piezas.items.map((p) => (
            <div key={p.titulo} className="py-6 md:px-6 md:first:pl-0 md:last:pr-0">
              <p className="font-mono text-xs uppercase tracking-wider text-teal">{p.titulo}</p>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-70">{p.texto}</p>
            </div>
          ))}
        </div>
      </PageSection>

      {/* 04 · Gobierno en el producto */}
      <PageSection
        kicker={gobierno.kicker}
        posterTitle={gobierno.posterTitle}
        posterAccent={gobierno.posterAccent}
        soft
        width="lg"
        intro={<p className="mt-4 max-w-2xl text-lg text-ink-70">{gobierno.intro}</p>}
      >
        <ArrowList items={gobierno.reglas} className="mt-8 max-w-3xl" />
        <p className="mt-10 font-mono text-xs uppercase tracking-wider text-ink-40">{gobierno.nivelesTitulo}</p>
        <div className="mt-3 divide-y divide-line rounded-[16px] border border-ink bg-paper">
          {gobierno.niveles.map((nivel, i) => (
            <div key={nivel.que} className="grid gap-2 p-5 sm:grid-cols-[3rem_1fr_1fr] sm:items-center">
              <span className="font-mono text-xs text-ink-40">{i}</span>
              <p className="text-[15px] text-ink">{nivel.que}</p>
              <p className="text-[15px] font-medium text-teal">{nivel.regla}</p>
            </div>
          ))}
        </div>
      </PageSection>

      {/* 05 · Dos puertas */}
      <PageSection
        kicker={puertas.kicker}
        posterTitle={puertas.posterTitle}
        posterAccent={puertas.posterAccent}
        width="lg"
        intro={<p className="mt-4 max-w-2xl text-lg text-ink-70">{puertas.intro}</p>}
      >
        <div className="mt-10 grid divide-y divide-line border-y border-line md:grid-cols-2 md:divide-x md:divide-y-0">
          {puertas.items.map((p) => (
            <div key={p.titulo} className="py-6 md:px-8 md:first:pl-0 md:last:pr-0">
              <p className="font-mono text-xs uppercase tracking-wider text-teal">{p.titulo}</p>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-70">{p.texto}</p>
            </div>
          ))}
        </div>
        <p className="mt-10 max-w-3xl border-l-2 border-plum pl-5 text-[17px] leading-relaxed text-ink">{puertas.cierre}</p>
      </PageSection>

      {/* 06 · Un equipo, de punta a punta */}
      <PageSection
        kicker={equipo.kicker}
        posterTitle={equipo.posterTitle}
        posterAccent={equipo.posterAccent}
        soft
        width="lg"
        intro={<p className="mt-4 max-w-2xl text-lg text-ink-70">{equipo.intro}</p>}
      >
        <div className="mt-10 grid divide-y divide-line border-y border-line md:grid-cols-3 md:divide-x md:divide-y-0">
          {equipo.capas.map((c) => (
            <div key={c.titulo} className="py-6 md:px-6 md:first:pl-0 md:last:pr-0">
              <p className="font-mono text-xs uppercase tracking-wider text-ink-40">{c.numero}</p>
              <h3 className="mt-2 font-display text-xl font-medium text-ink">{c.titulo}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-70">{c.texto}</p>
            </div>
          ))}
        </div>
        <p className="mt-10 max-w-3xl text-[17px] leading-relaxed text-ink">{equipo.cierre}</p>
      </PageSection>

      {/* 07 · Semana a semana */}
      <PageSection
        kicker={semana.kicker}
        posterTitle={semana.posterTitle}
        posterAccent={semana.posterAccent}
        width="lg"
        intro={<p className="mt-4 max-w-2xl text-lg text-ink-70">{semana.intro}</p>}
      >
        <ol className="mt-10 grid gap-x-10 divide-y divide-line border-y border-line md:grid-cols-2 md:divide-y-0">
          {semana.pasos.map((p) => (
            <li key={p.titulo} className="grid grid-cols-[2.5rem_1fr] gap-3 py-6 md:border-b md:border-line">
              <span className="font-mono text-sm text-teal">{`0${p.numero}`}</span>
              <div>
                <h3 className="font-display text-lg font-medium text-ink">{p.titulo}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-70">{p.texto}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-10 max-w-3xl border-l-2 border-plum pl-5 text-[17px] leading-relaxed text-ink">{semana.cierre}</p>
      </PageSection>

      {/* 08 · Cómo trabajamos */}
      <PageSection
        kicker={metodo.kicker}
        posterTitle={metodo.posterTitle}
        posterAccent={metodo.posterAccent}
        soft
        width="lg"
        intro={<p className="mt-4 max-w-2xl text-lg text-ink-70">{metodo.intro}</p>}
      >
        <div className="mt-10 divide-y divide-line border-y border-line">
          {metodo.pasos.map((p) => (
            <div key={p.titulo} className="grid gap-2 py-6 md:grid-cols-[12rem_minmax(0,1fr)_minmax(0,2fr)] md:gap-8">
              <p className="font-mono text-xs uppercase tracking-wider text-teal">{p.numero}</p>
              <h3 className="font-display text-xl font-medium text-ink">{p.titulo}</h3>
              <p className="text-[15px] leading-relaxed text-ink-70">{p.texto}</p>
            </div>
          ))}
        </div>
        <p className="mt-10 max-w-3xl text-[17px] leading-relaxed text-ink">{metodo.cierre}</p>
      </PageSection>

      {/* 09 · Quiénes somos */}
      <PageSection kicker={nosotros.kicker} posterTitle={nosotros.posterTitle} posterAccent={nosotros.posterAccent} width="lg">
        <div className="mt-10 grid gap-8 border-y border-line py-8 sm:grid-cols-3">
          {nosotros.cifras.map((c) => (
            <StatCounter key={c.label} value={c.value} suffix={c.suffix} label={c.label} caption={c.caption} size="sm" />
          ))}
        </div>
        <p className="mt-10 max-w-3xl text-[17px] leading-relaxed text-ink">{nosotros.texto}</p>
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-ink-40">{nosotros.sectoresTitulo}</p>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-70">{nosotros.sectores}</p>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-ink-40">{nosotros.comoTitulo}</p>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-70">{nosotros.como}</p>
          </div>
        </div>
      </PageSection>

      {/* Cierre · A ──→ B */}
      <section className="bg-ink text-paper">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <p className="font-mono text-[13px] uppercase tracking-[0.12em] text-teal-dark">{cierre.eyebrow}</p>
          <div className="mt-6">
            <PosterHeading size="sm" accent={cierre.posterAccent} surface="dark">
              {cierre.posterTitle}
            </PosterHeading>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:items-center">
            <div className="rounded-[16px] border border-paper/25 p-6">
              <p className="font-mono text-xs uppercase tracking-wider text-paper/60">A</p>
              <p className="mt-3 text-[17px] leading-relaxed text-paper/80">{cierre.a}</p>
            </div>
            <div className="flex justify-center text-lima" aria-hidden>
              <Arrow long className="text-3xl max-md:rotate-90" />
            </div>
            <div className="rounded-[16px] border border-teal-dark p-6">
              <p className="font-mono text-xs uppercase tracking-wider text-teal-dark">B</p>
              <p className="mt-3 text-[17px] leading-relaxed text-paper">{cierre.b}</p>
            </div>
          </div>
          <div className="mt-14 flex flex-wrap items-center gap-6">
            <Link
              href={cierre.cta.href}
              className="rounded-full bg-teal-ui-dark px-7 py-3 text-base font-bold text-on-brand transition-transform hover:-translate-y-0.5"
            >
              {cierre.cta.label}
            </Link>
            <p className="font-mono text-sm text-paper/70">{cierre.contacto}</p>
          </div>
        </div>
      </section>
    </main>
  )
}
