"use client"

import { useEffect, useId, useRef, useState, type CSSProperties } from "react"
import { cn } from "@/lib/utils"

/**
 * Ilustración a mano del sistema v1.2: objetos y diagramas, trazo tipo marcador,
 * acento teal más un detalle plum. El trazo se dibuja una vez al entrar en pantalla.
 */

export interface IllustrationAccent {
  tone: "teal" | "plum"
  /** x, y, ancho, alto, rotación en grados. */
  rect: [number, number, number, number, number]
  /** Índice de trazo después del cual aparece. */
  at: number
  /** Trazo en tono papel dibujado encima del acento. */
  mark?: string
}

export interface Illustration {
  label: string
  lines: string[]
  accents: IllustrationAccent[]
}

const STYLE = `
.illus [data-draw] { stroke-dasharray: 1; stroke-dashoffset: 1; opacity: 0; }
.illus [data-pop] { opacity: 0; transform-box: fill-box; transform-origin: center; }
.illus[data-in="true"] [data-draw] { animation: illus-draw 620ms var(--ease-out-quint) forwards; animation-delay: calc(var(--i) * 40ms); }
.illus[data-in="true"] [data-pop] { animation: illus-pop 420ms var(--ease-tape) forwards; animation-delay: calc(var(--i) * 40ms); }
@keyframes illus-draw { 0% { stroke-dashoffset: 1; opacity: 1; } 100% { stroke-dashoffset: 0; opacity: 1; } }
@keyframes illus-pop { 0% { opacity: 0; scale: 0.86; } 100% { opacity: 1; scale: 1; } }
@media (prefers-reduced-motion: reduce) {
  .illus [data-draw], .illus [data-pop] { animation: none !important; stroke-dashoffset: 0; opacity: 1; }
}
`

const toneFill = { teal: "var(--color-teal)", plum: "var(--color-plum)" }

export function HandDrawn({ illustration, className }: { illustration: Illustration; className?: string }) {
  const ref = useRef<SVGSVGElement>(null)
  const filterId = useId()
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => entry.isIntersecting && setInView(true), { threshold: 0.4 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <svg
      ref={ref}
      viewBox="0 0 400 300"
      role="img"
      aria-label={illustration.label}
      data-in={inView}
      className={cn("illus", className)}
      fill="none"
    >
      <style>{STYLE}</style>
      <defs>
        <filter id={filterId} x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="7" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="3.4" />
        </filter>
      </defs>
      <g filter={`url(#${filterId})`}>
        <g stroke="var(--color-ink)" strokeWidth={3.2} strokeLinecap="round" strokeLinejoin="round">
          {illustration.lines.map((d, i) => (
            <path key={`${i}-${d}`} d={d} pathLength={1} data-draw style={{ "--i": i } as CSSProperties} />
          ))}
        </g>
        {illustration.accents.map(({ tone, rect: [x, y, w, h, rot], at, mark }) => (
          <g key={`${tone}-${x}-${y}`} data-pop style={{ "--i": at } as CSSProperties}>
            <rect x={x} y={y} width={w} height={h} transform={`rotate(${rot} ${x + w / 2} ${y + h / 2})`} fill={toneFill[tone]} />
            {mark && <path d={mark} stroke="var(--color-paper)" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" />}
          </g>
        ))}
      </g>
    </svg>
  )
}
