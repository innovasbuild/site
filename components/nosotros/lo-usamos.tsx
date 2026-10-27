"use client"

import { useEffect, useRef, useState } from "react"
import { useInView, useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"
import { PosterHeading } from "@/components/poster-heading"
import { loUsamos as c } from "@/content/nosotros"

const DURACION = 3200

/**
 * Usamos lo que vendemos: el agente de nuestra área comercial, paso a paso. Los pasos se encienden de a uno
 * mientras la sección está en pantalla (se pausan con el cursor). El paso que hace una persona va con el
 * color de la gente.
 */
export function LoUsamos() {
  const [paso, setPaso] = useState(0)
  const [pausa, setPausa] = useState(false)
  const ref = useRef<HTMLElement>(null)
  const visible = useInView(ref, { amount: 0.35 })
  const reduce = useReducedMotion()
  const corre = visible && !pausa && !reduce

  useEffect(() => {
    if (!corre) return
    const t = setTimeout(() => setPaso((p) => (p + 1) % c.pasos.length), DURACION)
    return () => clearTimeout(t)
  }, [corre, paso])

  return (
    <section ref={ref} className="mx-auto max-w-7xl px-6 py-20 md:px-20 md:py-28">
      <div className="grid gap-12 lg:grid-cols-[5fr_7fr] lg:gap-20">
        <div>
          <p className="font-mono text-[13px] tracking-[0.12em] text-teal uppercase">
            {c.kicker.index} · {c.kicker.label}
          </p>
          <div className="mt-3">
            <PosterHeading size="sm" accent={c.posterAccent}>{c.posterTitle}</PosterHeading>
          </div>
          <p className="mt-6 text-[17px] leading-[1.6] text-ink-70">{c.intro}</p>
        </div>

        <ol
          className={cn("self-center border-t border-ink", !corre && "pausado")}
          onMouseEnter={() => setPausa(true)}
          onMouseLeave={() => setPausa(false)}
        >
          {c.pasos.map((p, i) => {
            const on = i === paso
            const gente = p.quien === "gente"
            return (
              <li key={p.nombre} className="relative border-b border-line">
                <button type="button" onClick={() => setPaso(i)} className="grid w-full grid-cols-[3rem_1fr] gap-4 py-6 text-left sm:grid-cols-[3rem_minmax(0,1fr)_8rem] sm:items-baseline">
                  <span className={cn("font-mono text-xs transition-colors", on ? (gente ? "text-plum" : "text-teal") : "text-ink-40")}>
                    0{i + 1}
                  </span>
                  <span>
                    <span
                      className={cn(
                        "block font-display text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.05] font-medium tracking-[-0.025em] transition-colors duration-300",
                        on ? (gente ? "text-plum italic" : "text-ink italic") : "text-ink-40"
                      )}
                    >
                      {p.nombre}
                    </span>
                    <span className={cn("mt-1.5 block text-[16px] leading-[1.5] transition-colors duration-300", on ? "text-ink-70" : "text-ink-40")}>
                      {p.texto}
                    </span>
                  </span>
                  <span
                    className={cn(
                      "col-start-2 flex items-center gap-2 font-mono text-[11px] tracking-[0.1em] uppercase sm:col-start-auto sm:justify-self-end",
                      gente ? "text-plum" : "text-teal"
                    )}
                  >
                    <span className={cn("size-1.5 rounded-full", gente ? "bg-plum" : "bg-teal")} />
                    {gente ? c.genteLabel : c.agenteLabel}
                  </span>
                </button>
                <span className="absolute right-0 bottom-[-1px] left-0 block h-[2px] overflow-hidden">
                  {on && (
                    <span
                      key={`${paso}-${corre}`}
                      className={cn("barra-progreso block h-full", gente ? "bg-plum" : "bg-teal")}
                      style={{ ["--dur-paso" as string]: `${DURACION}ms` }}
                    />
                  )}
                </span>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
