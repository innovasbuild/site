"use client"

import { useRef } from "react"
import { useInView, useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"
import { manifiesto as delHome } from "@/content/home"
import type { Imagen } from "@/content/imagenes"

/**
 * Manifiesto del home: tres frases en grande que se encienden palabra por palabra al entrar en pantalla,
 * con una foto chica incrustada en la línea al final de cada una (interlock texto/imagen). Sin props usa las
 * frases del home; otras páginas (nosotros) le pasan las suyas.
 */
export function Manifiesto({
  manifiesto = delHome,
}: {
  manifiesto?: { kicker: { index: string; label: string }; frases: { texto: string; foto: Imagen }[] }
}) {
  const ref = useRef<HTMLParagraphElement>(null)
  const visto = useInView(ref, { once: true, amount: 0.35 })
  const reduce = useReducedMotion()
  const encendido = visto || reduce
  let n = 0

  return (
    <section className="mx-auto max-w-7xl px-6 py-24 md:px-20 md:py-32">
      <p className="font-mono text-[13px] tracking-[0.12em] text-teal uppercase">
        {manifiesto.kicker.index} · {manifiesto.kicker.label}
      </p>
      <p
        ref={ref}
        className="mt-6 font-display text-[clamp(2rem,4.4vw,3.75rem)] leading-[1.12] font-medium tracking-[-0.025em] text-ink"
      >
        {manifiesto.frases.map((frase, f) => (
          <span key={f}>
            {frase.texto.split(" ").map((palabra) => {
              const i = n++
              return (
                <span
                  key={i}
                  className="transition-colors duration-500"
                  style={{
                    color: encendido ? undefined : "var(--color-line)",
                    transitionDelay: reduce ? "0ms" : `${i * 45}ms`,
                  }}
                >
                  {palabra}{" "}
                </span>
              )
            })}
            <span
              aria-hidden
              className={cn(
                "foto inline-block h-[0.78em] w-[1.9em] rounded-full align-[-0.06em] transition-[scale,opacity] duration-700",
                frase.foto.natural && "foto-natural",
                encendido ? "scale-100 opacity-100" : "scale-75 opacity-0"
              )}
              style={{ transitionDelay: reduce ? "0ms" : `${n * 45}ms` }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={frase.foto.src} alt="" loading="lazy" />
            </span>{" "}
          </span>
        ))}
      </p>
    </section>
  )
}
