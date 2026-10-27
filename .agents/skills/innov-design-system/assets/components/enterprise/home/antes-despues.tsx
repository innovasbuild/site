import { Arrow } from "@/components/arrow"
import { Aparece } from "@/components/aparece"
import { PosterHeading } from "@/components/poster-heading"
import { antesDespues as c } from "@/content/home"

/** Dónde está la empresa hoy y dónde queda: filas A ──→ B, que entran escalonadas. */
export function AntesDespues() {
  return (
    <section className="border-y border-line bg-paper-soft">
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-20 md:py-24">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end">
          <div>
            <p className="font-mono text-[13px] tracking-[0.12em] text-teal uppercase">
              {c.kicker.index} · {c.kicker.label}
            </p>
            <div className="mt-3">
              <PosterHeading size="sm" accent={c.posterAccent}>{c.posterTitle}</PosterHeading>
            </div>
          </div>
          <p className="max-w-xl text-[17px] leading-[1.6] text-ink-70 lg:justify-self-end">{c.intro}</p>
        </div>

        <div className="mt-12 hidden grid-cols-[1fr_4rem_1fr] gap-6 pb-3 font-mono text-xs tracking-[0.12em] uppercase md:grid">
          <span className="text-ink-40">{c.hoyLabel}</span>
          <span />
          <span className="text-teal">{c.despuesLabel}</span>
        </div>
        <div className="border-t border-ink md:mt-0 mt-10">
          {c.filas.map((fila, i) => (
            <Aparece key={fila.hoy} demora={i * 0.08}>
              <div className="group grid gap-3 border-b border-line py-6 transition-colors md:grid-cols-[1fr_4rem_1fr] md:items-center md:gap-6 md:py-7">
                <p className="text-[17px] leading-[1.5] text-ink-70">
                  <span className="mr-2 font-mono text-xs text-ink-40 md:hidden">{c.hoyLabel}</span>
                  {fila.hoy}
                </p>
                <Arrow long className="text-xl text-teal transition-transform duration-300 group-hover:translate-x-2" />
                <p className="font-display text-[clamp(1.375rem,2.2vw,1.75rem)] leading-[1.2] font-medium tracking-[-0.015em] text-ink">
                  {fila.despues}
                </p>
              </div>
            </Aparece>
          ))}
        </div>
      </div>
    </section>
  )
}
