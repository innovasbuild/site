"use client"

import { useRef } from "react"
import { useInView, useReducedMotion } from "framer-motion"

/**
 * Frase que se enciende palabra por palabra al entrar en pantalla, una sola vez (como el manifiesto del
 * home). Pensada para fondo oscuro: arranca apenas visible y termina en el color del texto.
 */
export function FraseEncendida({ texto, className }: { texto: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const visto = useInView(ref, { once: true, amount: 0.5 })
  const reduce = useReducedMotion()
  const encendido = visto || reduce

  return (
    <p ref={ref} className={className}>
      {texto.split(" ").map((palabra, i) => (
        <span
          key={i}
          className="transition-opacity duration-500"
          style={{ opacity: encendido ? 1 : 0.18, transitionDelay: reduce ? "0ms" : `${i * 70}ms` }}
        >
          {palabra}{" "}
        </span>
      ))}
    </p>
  )
}
