import { Fragment } from "react"
import { cn } from "@/lib/utils"

interface ArrowProps {
  /** Versión larga, para marcadores (01 ──→). */
  long?: boolean
  className?: string
}

/**
 * Flecha de la notación de transición, en SVG. Reemplaza a los glifos "→" y "──→",
 * que se desalinean según la fuente. Hereda el color y escala con el texto.
 */
export function Arrow({ long, className }: ArrowProps) {
  const w = long ? 40 : 18
  return (
    <svg
      viewBox={`0 0 ${w} 10`}
      aria-hidden
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("inline-block h-[0.62em] shrink-0 align-[0.02em]", long ? "w-[2.5em]" : "w-[1.12em]", className)}
    >
      <path d={`M1 5 H${w - 1.5}`} vectorEffect="non-scaling-stroke" />
      <path d={`M${w - 5.5} 1.2 L${w - 1.2} 5 L${w - 5.5} 8.8`} vectorEffect="non-scaling-stroke" />
    </svg>
  )
}

/** Renderiza un texto cambiando cada "→" o "──→" por la flecha en SVG. */
export function ArrowText({ children }: { children: string }) {
  const parts = children.split(/(─*→)/)
  return (
    <>
      {parts.map((part, i) =>
        part.endsWith("→") ? <Arrow key={i} long={part.length > 1} /> : <Fragment key={i}>{part}</Fragment>
      )}
    </>
  )
}
