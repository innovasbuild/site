"use client"

import { useEffect, useRef, useState } from "react"
import { useInView, useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"
import { CerebroRed } from "@/components/cerebro-red"
import { PosterHeading } from "@/components/poster-heading"
import { homeIllustrations as il } from "@/components/illustrations/home"
import { olaCero as c } from "@/content/servicios"

/** Cuánto tarda en encenderse cada ítem, una vez que la lista entra en pantalla. */
const PASO = 650

/**
 * Qué deja la ola cero. A la izquierda el Brain de la serie del cerebro, que se arma solo. A la derecha, una
 * barra de tres meses y la lista de lo que queda: al entrar en pantalla los ítems se encienden de a uno (el
 * recién encendido brilla en lima un momento), la barra avanza y el contador sube hasta 5/5. Pasa una vez.
 */
export function OlaCero() {
  const ref = useRef<HTMLDivElement>(null)
  const visto = useInView(ref, { once: true, amount: 0.4 })
  const reduce = useReducedMotion()
  const total = c.items.length
  const [listos, setListos] = useState(0)

  useEffect(() => {
    if (reduce) {
      setListos(total)
      return
    }
    if (!visto || listos >= total) return
    const t = setTimeout(() => setListos((n) => n + 1), listos === 0 ? 400 : PASO)
    return () => clearTimeout(t)
  }, [visto, listos, total, reduce])

  return (
    <section className="border-y border-line bg-paper-soft">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:px-20 md:py-28 lg:grid-cols-[5fr_7fr] lg:gap-20">
        <div>
          <p className="font-mono text-[13px] tracking-[0.12em] text-teal uppercase">
            {c.kicker.index} · {c.kicker.label}
          </p>
          <div className="mt-3">
            <PosterHeading size="sm" accent={c.posterAccent}>{c.posterTitle}</PosterHeading>
          </div>
          <div className="mt-10 max-w-[340px] [&>*]:w-full">
            <CerebroRed label={il.piezaBrain.label} className="serie-cerebro" />
          </div>
        </div>

        <div ref={ref} className="lg:pt-4">
          <div className="flex items-end justify-between gap-6">
            <p className="text-[17px] leading-[1.6] text-ink-70">{c.intro}</p>
            <p className="shrink-0 font-mono text-[12px] tracking-[0.12em] text-ink-40 uppercase">
              {c.funcionandoLabel}{" "}
              <span className="font-display text-[28px] tracking-normal text-teal tabular-nums normal-case">
                {listos}/{total}
              </span>
            </p>
          </div>

          {/* Tres meses */}
          <div className="mt-5">
            <div className="h-[3px] overflow-hidden rounded-full bg-ink/10">
              <div
                className="h-full bg-teal transition-[width] duration-700 ease-[var(--ease-out-quint)]"
                style={{ width: `${(listos / total) * 100}%` }}
              />
            </div>
            <div className="mt-2 grid grid-cols-3 font-mono text-[11px] tracking-[0.08em] text-ink-40 uppercase">
              {c.meses.map((m, i) => (
                <span key={m} className={cn(i === 1 && "text-center", i === 2 && "text-right")}>
                  {m}
                </span>
              ))}
            </div>
          </div>

          <ol className="mt-6 border-t border-ink">
            {c.items.map((item, i) => {
              const listo = i < listos
              return (
                <li key={item.titulo} className="grid grid-cols-[2.5rem_1fr] gap-4 border-b border-line py-5">
                  <span
                    aria-hidden
                    className={cn(
                      "mt-0.5 flex size-7 items-center justify-center rounded-full border text-[13px] transition-all duration-500",
                      listo ? "animate-[brillo_1.4s_var(--ease)_both] border-teal bg-teal text-on-brand" : "border-ink-40 text-transparent"
                    )}
                  >
                    ✓
                  </span>
                  <div className={cn("transition-opacity duration-500", listo ? "opacity-100" : "opacity-45")}>
                    <p className="text-[18px] leading-[1.3] font-semibold text-ink">{item.titulo}</p>
                    <p className="mt-1 text-[15px] leading-[1.55] text-ink-70">{item.texto}</p>
                  </div>
                </li>
              )
            })}
          </ol>
          <p className="mt-6 font-mono text-[12px] leading-[1.6] tracking-[0.04em] text-ink-40">{c.nota}</p>
        </div>
      </div>
    </section>
  )
}
