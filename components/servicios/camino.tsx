"use client"

import { useEffect, useRef, useState } from "react"
import { useInView, useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"
import { PosterHeading } from "@/components/poster-heading"
import { camino as c } from "@/content/servicios"

const DURACION = 7500

/**
 * El camino en detalle, en banda oscura: las cinco etapas sobre una línea que se va llenando. Avanza solo
 * mientras la sección está en pantalla (se pausa con el cursor encima o al elegir una etapa). Debajo, la
 * etapa con su duración en grande y cuatro campos que entran escalonados; la decisión de la empresa va en
 * lima, el color de lo que decide la gente sobre oscuro.
 */
export function Camino() {
  const [activa, setActiva] = useState(0)
  const [pausa, setPausa] = useState(false)
  const ref = useRef<HTMLElement>(null)
  const visible = useInView(ref, { amount: 0.35 })
  const reduce = useReducedMotion()
  const corre = visible && !pausa && !reduce

  useEffect(() => {
    if (!corre) return
    const t = setTimeout(() => setActiva((a) => (a + 1) % c.etapas.length), DURACION)
    return () => clearTimeout(t)
  }, [corre, activa])

  const etapa = c.etapas[activa]
  const paso = 100 / c.etapas.length

  return (
    <section ref={ref} className="bg-ink text-paper">
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-20 md:py-28">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
          <div>
            <p className="font-mono text-[13px] tracking-[0.12em] text-teal-dark uppercase">
              {c.kicker.index} · {c.kicker.label}
            </p>
            <div className="mt-3">
              <PosterHeading size="sm" accent={c.posterAccent} surface="dark" className="text-paper">
                {c.posterTitle}
              </PosterHeading>
            </div>
          </div>
          <p className="max-w-xl text-[17px] leading-[1.6] text-paper/70 lg:justify-self-end">{c.intro}</p>
        </div>

        <div className={cn("mt-14", !corre && "pausado")} onMouseEnter={() => setPausa(true)} onMouseLeave={() => setPausa(false)}>
          {/* Línea con las etapas */}
          <div className="-mx-6 overflow-x-auto px-6 pb-2 md:mx-0 md:overflow-visible md:px-0">
            <div className="relative min-w-[680px]" role="tablist" aria-label="Etapas">
              <span className="absolute top-[7px] right-0 left-0 h-px bg-paper/25" />
              <span
                className="absolute top-[6px] left-0 h-[3px] bg-teal-dark transition-[width] duration-700 ease-[var(--ease-out-quint)]"
                style={{ width: `${activa * paso}%` }}
              />
              <span className="absolute top-[6px] h-[3px] overflow-hidden" style={{ left: `${activa * paso}%`, width: `${paso}%` }}>
                <span
                  key={`${activa}-${corre}`}
                  className="barra-progreso block h-full bg-lima"
                  style={{ ["--dur-paso" as string]: `${DURACION}ms` }}
                />
              </span>

              <div className="relative grid grid-cols-5">
                {c.etapas.map((e, i) => {
                  const on = i === activa
                  const hecha = i < activa
                  return (
                    <button
                      key={e.nombre}
                      type="button"
                      role="tab"
                      aria-selected={on}
                      onClick={() => setActiva(i)}
                      className="group self-start pr-4 text-left"
                    >
                      <span
                        className={cn(
                          "block size-[15px] rounded-full border-2 transition-all duration-500",
                          on
                            ? "scale-125 border-lima bg-lima shadow-[0_0_0_6px_color-mix(in_oklab,var(--color-lima)_22%,transparent)]"
                            : hecha
                              ? "border-teal-dark bg-teal-dark"
                              : "border-paper/40 bg-ink"
                        )}
                      />
                      <span className={cn("mt-5 block font-mono text-[11px] tracking-[0.08em] uppercase", on ? "text-lima" : "text-paper/40")}>
                        0{i + 1} · {e.duracion}
                      </span>
                      <span
                        className={cn(
                          "mt-1.5 block font-display text-[clamp(1.25rem,1.9vw,1.625rem)] leading-[1.15] font-medium tracking-[-0.015em] transition-colors",
                          on ? "text-paper" : "text-paper/40 group-hover:text-paper/70"
                        )}
                      >
                        {e.nombre}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* La etapa: duración en grande y sus cuatro campos */}
          <div key={activa} className="mt-12 grid gap-8 border-t border-paper/15 pt-10 lg:grid-cols-[4fr_8fr] lg:gap-12">
            <div className="animate-[sube_700ms_var(--ease-out-quint)_both]">
              <p className="font-mono text-[12px] tracking-[0.12em] text-paper/50 uppercase">
                {c.etapaLabel} 0{activa + 1} / 0{c.etapas.length}
              </p>
              <p className="mt-3 font-display text-[clamp(3rem,6vw,5.5rem)] leading-[0.95] font-medium tracking-[-0.035em] text-lima italic">
                {etapa.duracion}
              </p>
              <p className="mt-3 font-display text-[clamp(1.5rem,2.4vw,2rem)] leading-[1.1] font-medium tracking-[-0.02em]">{etapa.nombre}</p>
            </div>
            <div className="grid gap-x-10 sm:grid-cols-2">
              <Campo label={c.campos.pasa} texto={etapa.pasa} orden={0} />
              <Campo label={c.campos.llevas} texto={etapa.llevas} orden={1} destacado />
              <Campo label={c.campos.pide} texto={etapa.pide} orden={2} />
              <Campo label={c.campos.decision} texto={etapa.decision} orden={3} gente />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Campo({ label, texto, orden, destacado, gente }: { label: string; texto: string; orden: number; destacado?: boolean; gente?: boolean }) {
  return (
    <div
      className="animate-[sube_700ms_var(--ease-out-quint)_both] border-b border-paper/15 py-5 sm:[&:nth-child(n+3)]:border-b-0"
      style={{ animationDelay: `${120 + orden * 110}ms` }}
    >
      <p
        className={cn(
          "flex items-center gap-2 font-mono text-[11px] tracking-[0.12em] uppercase",
          gente ? "text-lima" : destacado ? "text-teal-dark" : "text-paper/50"
        )}
      >
        {gente && <span className="size-1.5 rounded-full bg-lima" />}
        {label}
      </p>
      <p
        className={cn(
          "mt-2",
          destacado
            ? "font-display text-[22px] leading-[1.3] font-medium tracking-[-0.01em] text-paper"
            : "text-[16px] leading-[1.55] text-paper/75"
        )}
      >
        {texto}
      </p>
    </div>
  )
}
