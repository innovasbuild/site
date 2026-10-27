"use client"

import { useEffect, useRef, useState } from "react"
import { useInView, useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Arrow } from "@/components/arrow"
import { PosterHeading } from "@/components/poster-heading"
import { agentes as c } from "@/content/home"

const DURACION = 6500

/**
 * Agentes en el trabajo, por rubro. A la izquierda los rubros en grande, que avanzan solos (se pausan con el
 * cursor encima o al elegir uno). A la derecha, las tareas del rubro como un pase de manos: lo que hace el
 * agente ──→ lo que decide la gente.
 */
export function AgentesRubros() {
  const [activo, setActivo] = useState(0)
  const [pausa, setPausa] = useState(false)
  const ref = useRef<HTMLElement>(null)
  const visible = useInView(ref, { amount: 0.35 })
  const reduce = useReducedMotion()
  const corre = visible && !pausa && !reduce

  useEffect(() => {
    if (!corre) return
    const t = setTimeout(() => setActivo((a) => (a + 1) % c.rubros.length), DURACION)
    return () => clearTimeout(t)
  }, [corre, activo])

  const rubro = c.rubros[activo]

  return (
    <section id="agentes" ref={ref} className="scroll-mt-24">
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-20 md:py-28">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
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

        <div
          className={cn("mt-14 grid gap-10 border-t border-ink pt-10 lg:grid-cols-[4fr_8fr] lg:gap-16", !corre && "pausado")}
          onMouseEnter={() => setPausa(true)}
          onMouseLeave={() => setPausa(false)}
        >
          {/* Rubros */}
          <div className="flex gap-x-6 gap-y-1 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0" role="tablist" aria-label="Rubros">
            {c.rubros.map((r, i) => {
              const on = i === activo
              return (
                <button
                  key={r.nombre}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => setActivo(i)}
                  className="group shrink-0 text-left lg:py-2"
                >
                  <span
                    className={cn(
                      "block font-display text-[clamp(1.5rem,2.6vw,2.375rem)] leading-[1.1] font-medium tracking-[-0.02em] whitespace-nowrap transition-colors duration-300",
                      on ? "text-ink italic" : "text-ink-40 group-hover:text-ink-70"
                    )}
                  >
                    {r.nombre}
                  </span>
                  <span className="mt-1.5 block h-[2px] w-full overflow-hidden lg:w-40">
                    {on && (
                      <span
                        key={`${activo}-${corre}`}
                        className="barra-progreso block h-full bg-teal"
                        style={{ ["--dur-paso" as string]: `${DURACION}ms` }}
                      />
                    )}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Tareas: pase de manos del agente a la gente */}
          <div key={rubro.nombre}>
            <div className="hidden grid-cols-[10rem_1fr_3rem_1fr] gap-5 pb-3 font-mono text-[11px] tracking-[0.12em] uppercase md:grid">
              <span />
              <span className="flex items-center gap-2 text-teal">
                <span className="size-1.5 rounded-full bg-teal" /> {c.agenteLabel}
              </span>
              <span />
              <span className="flex items-center gap-2 text-plum">
                <span className="size-1.5 rounded-full bg-plum" /> {c.genteLabel}
              </span>
            </div>
            {rubro.tareas.map((t, i) => (
              <div
                key={t.titulo}
                className="grid animate-[fade-in_600ms_ease_both] gap-3 border-b border-line py-6 first:border-t md:grid-cols-[10rem_1fr_3rem_1fr] md:items-center md:gap-5"
                style={{ animationDelay: `${i * 120}ms` }}
              >
                <h3 className="font-display text-[24px] leading-[1.15] font-medium tracking-[-0.01em] text-ink">{t.titulo}</h3>
                <p className="text-[16px] leading-[1.5] text-ink">
                  <span className="mr-2 font-mono text-[11px] tracking-[0.1em] text-teal uppercase md:hidden">{c.agenteLabel}</span>
                  {t.agente}
                </p>
                <Arrow long className="hidden text-lg text-ink-40 md:block" />
                <p className="text-[16px] leading-[1.5] text-ink-70">
                  <span className="mr-2 font-mono text-[11px] tracking-[0.1em] text-plum uppercase md:hidden">{c.genteLabel}</span>
                  {t.gente}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
