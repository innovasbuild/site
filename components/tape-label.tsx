"use client"

import { motion, useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"

interface TapeLabelProps {
  children: string
  tone?: "teal" | "plum" | "ink" | "taupe"
  rotate?: number
  className?: string
  style?: React.CSSProperties
}

const bg: Record<string, string> = {
  teal: "var(--color-teal)",
  plum: "var(--color-plum)",
  ink: "var(--color-ink)",
  taupe: "var(--color-taupe)",
}

/** Cinta rotada en mono, ~6°. Máximo 2 por composición, 1–2 palabras cada una. */
export function TapeLabel({ children, tone = "teal", rotate, className, style }: TapeLabelProps) {
  const reduce = useReducedMotion()
  const r = rotate ?? -6.5
  const fg = tone === "taupe" ? "var(--color-ink)" : "var(--color-on-brand)"

  return (
    <motion.span
      initial={reduce ? false : { rotate: 0, scale: 0.86, opacity: 0 }}
      whileInView={reduce ? undefined : { rotate: r, scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.42, ease: [0.34, 1.4, 0.5, 1] }}
      className={cn("inline-block whitespace-nowrap font-mono text-xs font-bold uppercase text-white", className)}
      style={{
        background: bg[tone],
        color: fg,
        letterSpacing: "0.12em",
        padding: "0.34em 0.85em 0.28em",
        borderRadius: "var(--radius-tape)",
        boxShadow: "var(--shadow-tape)",
        transform: reduce ? `rotate(${r}deg)` : undefined,
        ...style,
      }}
    >
      {children}
    </motion.span>
  )
}
