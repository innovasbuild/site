"use client"

import { useEffect, useRef, useState } from "react"
import { useInView, useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"
import { PosterHeading } from "@/components/poster-heading"
import { continuidad as c } from "@/content/central-ia"

const DURACION = 8000

/** Una persona del esquema: círculo con la inicial, nombre y rol. */
function Persona({ nombre, rol, estado }: { nombre: string; rol: string; estado: "activa" | "fuera" | "espera" }) {
  return (
    <div className={cn("flex w-20 flex-col items-center text-center transition-opacity duration-700 sm:w-24", estado !== "activa" && "opacity-35")}>
      <span
        className={cn(
          "flex size-14 items-center justify-center rounded-full font-display text-2xl text-on-brand transition-colors duration-700 sm:size-16",
          estado === "activa" ? "bg-plum" : "border-2 border-dashed border-ink-40 bg-transparent text-ink-40"
        )}
      >
        {nombre[0]}
      </span>
      <span className="mt-2 text-[14px] font-semibold text-ink">{nombre}</span>
      <span className="text-[12px] leading-tight text-ink-70">{rol}</span>
    </div>
  )
}

/** Tramo entre una persona y el Brain; con `fluye`, pasan puntos en el sentido de la flecha. */
function Tramo({ fluye, cortado }: { fluye: boolean; cortado?: boolean }) {
  return (
    <div className="relative mx-1 h-6 min-w-6 flex-1 self-start mt-5 sm:mt-6">
      <span
        className={cn(
          "absolute top-1/2 right-0 left-0 border-t transition-colors duration-700",
          cortado ? "border-dashed border-ink-40" : fluye ? "border-teal" : "border-line"
        )}
      />
      {fluye &&
        [0, 1, 2].map((k) => (
          <span
            key={k}
            className="punto-fluye absolute top-1/2 -mt-[3px] size-1.5 rounded-full bg-teal"
            style={{ animationDelay: `${k * 600}ms` }}
          />
        ))}
    </div>
  )
}

/**
 * Qué pasa con el conocimiento cuando alguien se va: tres fases que avanzan solas (se pausan con el cursor
 * encima o al elegir una). El esquema muestra a quien se va, el Brain del área y a quien llega.
 */
export function Continuidad() {
  const [fase, setFase] = useState(0)
  const [pausa, setPausa] = useState(false)
  const ref = useRef<HTMLElement>(null)
  const visible = useInView(ref, { amount: 0.35 })
  const reduce = useReducedMotion()
  const corre = visible && !pausa && !reduce

  useEffect(() => {
    if (!corre) return
    const t = setTimeout(() => setFase((f) => (f + 1) % c.fases.length), DURACION)
    return () => clearTimeout(t)
  }, [corre, fase])

  const p = c.personas
  const actual = c.fases[fase]

  return (
    <section ref={ref} className="border-y border-line bg-paper-soft">
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
          className={cn("mt-14 grid gap-8 lg:grid-cols-[5fr_6fr] lg:gap-12", !corre && "pausado")}
          onMouseEnter={() => setPausa(true)}
          onMouseLeave={() => setPausa(false)}
        >
          <div>
            <div className="grid grid-cols-3 border-t border-ink" role="tablist" aria-label="Fases">
              {c.fases.map((f, i) => (
                <button
                  key={f.nombre}
                  type="button"
                  role="tab"
                  aria-selected={i === fase}
                  onClick={() => setFase(i)}
                  className="relative pt-4 pb-3 pr-3 text-left"
                >
                  <span className={cn("block font-mono text-xs", i === fase ? "text-teal" : "text-ink-40")}>0{i + 1}</span>
                  <span className={cn("mt-1 block text-[15px] leading-tight font-semibold", i === fase ? "text-ink" : "text-ink-40")}>
                    {f.nombre}
                  </span>
                  <span className="absolute top-[-1px] right-3 left-0 block h-[2px] overflow-hidden">
                    {i === fase && (
                      <span
                        key={`${fase}-${corre}`}
                        className="barra-progreso block h-full bg-teal"
                        style={{ ["--dur-paso" as string]: `${DURACION}ms` }}
                      />
                    )}
                  </span>
                </button>
              ))}
            </div>
            <div key={fase} className="animate-[fade-in_500ms_ease]">
              <h3 className="mt-8 font-display text-[clamp(1.75rem,2.6vw,2.25rem)] leading-[1.1] font-medium tracking-[-0.02em] text-ink">
                {actual.titulo}
              </h3>
              <ul className="mt-5 flex flex-col gap-3">
                {actual.puntos.map((punto) => (
                  <li key={punto} className="flex gap-3 text-[16px] leading-[1.55] text-ink-70">
                    <span className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-teal" />
                    {punto}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex items-center rounded-[20px] border border-line bg-paper p-5 sm:p-8" aria-hidden>
            <div className="flex w-full items-start">
              <Persona nombre={p.sale} rol={p.saleRol} estado={fase === 0 ? "activa" : "fuera"} />
              <Tramo fluye={fase === 0} cortado={fase > 0} />
              <div className="flex min-w-0 flex-[3] flex-col items-center">
                <div className="w-full rounded-[16px] border-2 border-teal bg-white p-3 sm:p-4">
                  <p className="font-mono text-[11px] tracking-[0.12em] text-teal uppercase">{p.brain} · Compras</p>
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {c.temas.map((tema, i) => (
                      <span
                        key={tema}
                        className={cn(
                          "rounded-full px-2.5 py-1 text-[12px] font-medium transition-all duration-500",
                          fase === 2 ? "bg-teal text-on-brand" : "bg-teal/10 text-teal"
                        )}
                        style={{ transitionDelay: `${i * 80}ms` }}
                      >
                        {tema}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="mt-2 text-center text-[12px] text-ink-70">
                  {fase === 0 ? "Se completa mientras trabaja" : fase === 1 ? "Queda todo, con su historial" : "Disponible desde el primer día"}
                </p>
              </div>
              <Tramo fluye={fase === 2} />
              <Persona nombre={p.llega} rol={p.llegaRol} estado={fase === 2 ? "activa" : "espera"} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
