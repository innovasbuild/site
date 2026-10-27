"use client"

import { useEffect, useRef, useState } from "react"
import { useInView, useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"
import { PosterHeading } from "@/components/poster-heading"
import { capas, recorrido as c } from "@/content/home"

/** Cuánto dura cada etapa en pantalla antes de pasar sola a la siguiente. */
const DURACION = 7000

/**
 * El recorrido de punta a punta: cinco etapas que avanzan solas mientras la sección está en pantalla (se
 * pausa con el cursor encima o al elegir una). A la derecha, la foto de la etapa y las capas que ya quedan
 * funcionando, que se van encendiendo de abajo hacia arriba: todo se construye sobre la misma base.
 */
export function Recorrido() {
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
          className={cn("mt-12 grid gap-8 lg:grid-cols-[5fr_7fr] lg:gap-12", !corre && "pausado")}
          onMouseEnter={() => setPausa(true)}
          onMouseLeave={() => setPausa(false)}
        >
          {/* Etapas */}
          <ol className="border-t border-ink" role="tablist" aria-label="Etapas del trabajo">
            {c.etapas.map((e, i) => {
              const on = i === activa
              return (
                <li key={e.nombre} className="border-b border-line">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={on}
                    onClick={() => setActiva(i)}
                    className="group w-full py-5 text-left"
                  >
                    <span className="flex items-baseline gap-4">
                      <span className={cn("font-mono text-xs transition-colors", on ? "text-teal" : "text-ink-40")}>
                        0{i + 1}
                      </span>
                      <span
                        className={cn(
                          "font-display text-[clamp(1.375rem,2vw,1.75rem)] leading-[1.15] font-medium tracking-[-0.015em] transition-colors",
                          on ? "text-ink" : "text-ink-40 group-hover:text-ink-70"
                        )}
                      >
                        {e.nombre}
                      </span>
                      <span className="ml-auto shrink-0 font-mono text-[11px] tracking-[0.08em] text-ink-40 uppercase">
                        {e.duracion}
                      </span>
                    </span>
                    <span
                      className={cn(
                        "grid transition-[grid-template-rows,opacity] duration-500",
                        on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      )}
                    >
                      <span className="overflow-hidden">
                        <span className="block pt-3 pl-8 text-[15px] leading-[1.6] text-ink-70">{e.texto}</span>
                      </span>
                    </span>
                  </button>
                  <span className="block h-[2px] overflow-hidden bg-transparent">
                    {on && (
                      <span
                        key={`${activa}-${corre}`}
                        className="barra-progreso block h-full bg-teal"
                        style={{ ["--dur-paso" as string]: `${DURACION}ms` }}
                      />
                    )}
                  </span>
                </li>
              )
            })}
          </ol>

          {/* Qué te llevás, quiénes están y las capas que ya funcionan, todo a la vista junto a las etapas */}
          <div className="self-start rounded-[20px] border border-line bg-paper p-6 sm:p-8">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <p className="font-mono text-[11px] tracking-[0.12em] text-teal uppercase">{c.entregaLabel}</p>
                <p key={`e-${activa}`} className="mt-2 animate-[fade-in_600ms_ease] font-display text-[22px] leading-[1.25] font-medium tracking-[-0.01em] text-ink">
                  {etapa.entrega}
                </p>
              </div>
              <div>
                <p className="font-mono text-[11px] tracking-[0.12em] text-ink-40 uppercase">{c.equipoLabel}</p>
                <p key={`q-${activa}`} className="mt-2 animate-[fade-in_600ms_ease] text-[16px] leading-[1.5] text-ink-70">
                  {etapa.equipo}
                </p>
              </div>
            </div>
            <div className="mt-6 border-t border-line pt-6">
              <p className="font-mono text-[11px] tracking-[0.12em] text-ink-40 uppercase">{c.capasTitulo}</p>
              <ul className="mt-4 flex flex-col-reverse gap-1.5">
                {capas.map((capa, i) => {
                  const encendida = i < etapa.capas.encendidas
                  const planeada = !encendida && i < etapa.capas.planeadas
                  return (
                    <li
                      key={capa}
                      className={cn(
                        "flex items-center justify-between rounded-md border px-4 py-2.5 text-[14px] transition-all duration-500",
                        encendida && "border-teal bg-teal text-on-brand",
                        planeada && "border-dashed border-ink-40 text-ink-70",
                        !encendida && !planeada && "border-line text-ink-40"
                      )}
                      style={{ transitionDelay: `${i * 90}ms` }}
                    >
                      <span>{capa}</span>
                      <span className="ml-3 shrink-0 font-mono text-[11px] tracking-[0.08em] whitespace-nowrap uppercase">
                        {encendida ? "funcionando" : planeada ? "en el plan" : ""}
                      </span>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
