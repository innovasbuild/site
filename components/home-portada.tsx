import Link from "next/link"
import { hero, dolores } from "@/content/home"
import { HeroGrano } from "@/components/hero-grano"

/**
 * Hero y sección 01 de la home. El hero es oscuro, con Newsreader y la palabra destacada en itálica, botones en pill y
 * el grano de fondo que se intensifica a la derecha; sube por detrás de la barra (.bajo-nav) para que no
 * se vea el corte. La sección 01 es una hoja clara redondeada apoyada sobre el oscuro, con tarjetas.
 * El copy sale de content/home.ts.
 */

const eyebrow = hero.eyebrow.replace(/^\/\/\s*/, "")
const [tituloAntes, tituloDespues] = hero.posterTitle.split(hero.posterAccent)
const kicker = `${dolores.kicker.index} · ${dolores.kicker.label}`
const [cierreAntes, cierreDespues] = dolores.closing.split(dolores.closingAccent)

export function HomeHero() {
  return (
    <section className="bajo-nav relative overflow-hidden bg-ink text-paper">
      <HeroGrano />
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-12 px-6 pt-20 pb-28 md:px-20 lg:flex-row lg:items-center lg:justify-between lg:gap-14">
        <div className="max-w-[760px]">
          <p className="font-mono text-[13px] tracking-[0.12em] text-teal-dark uppercase">{eyebrow}</p>
          <h1 className="mt-4 font-display text-[clamp(3rem,6.5vw,5.75rem)] leading-[0.95] font-medium tracking-[-0.035em]">
            {tituloAntes}
            <span className="text-teal-dark italic">{hero.posterAccent}</span>
            {tituloDespues}
          </h1>
          <p className="mt-5 text-[clamp(1.25rem,1.8vw,1.5rem)] leading-[1.25] font-medium tracking-[-0.01em]">{hero.supportLine}</p>
          <p className="mt-3 text-[19px] leading-[1.55] text-paper/70">{hero.subhead}</p>
          <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row">
            <Link href={hero.ctaPrimary.href} className="rounded-full bg-teal px-7 py-4 text-[17px] font-semibold text-on-brand">
              {hero.ctaPrimary.label}
            </Link>
            <Link href={hero.ctaSecondary.href} className="rounded-full border-[1.5px] border-paper/70 px-7 py-[15px] text-[17px] font-semibold text-paper">
              {hero.ctaSecondary.label}
            </Link>
          </div>
          <p className="mt-4 font-mono text-xs text-paper/60">{hero.note}</p>
        </div>
      </div>
    </section>
  )
}

export function HomeDolores() {
  return (
    <div className="bg-ink">
      <section className="rounded-t-[24px] bg-paper text-ink">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-20">
          <p className="font-mono text-[13px] tracking-[0.12em] text-teal uppercase">{kicker}</p>
          <h2 className="mt-3.5 pb-[0.1em] font-display text-[clamp(2.75rem,5.5vw,4rem)] leading-none font-medium tracking-[-0.03em]">
            {dolores.posterTitle}
          </h2>
          <p className="mt-4 max-w-[720px] text-[17px] leading-[1.6] text-ink-70">{dolores.intro}</p>
          <div className="mt-11 grid gap-5 md:grid-cols-3">
            {dolores.cards.map((card, i) => (
              <div key={card.title} className="flex flex-col gap-2.5 rounded-lg border border-line border-t-2 border-t-ink bg-white p-7">
                <span className="font-display text-[40px] leading-none text-teal italic">{i + 1}.</span>
                <h3 className="text-[22px] leading-[1.2] font-bold">{card.title}</h3>
                <p className="text-[15px] leading-[1.6] text-ink-70">{card.description}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 font-display text-[30px] tracking-[-0.01em]">
            {cierreAntes}
            <span className="text-teal italic">{dolores.closingAccent}</span>
            {cierreDespues}
          </p>
        </div>
      </section>
    </div>
  )
}
