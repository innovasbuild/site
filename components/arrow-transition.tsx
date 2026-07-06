"use client"

import { motion, useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"
import type { Vertical } from "@/content/types"

interface ArrowTransitionProps {
  from: string
  to: string
  vertical?: Vertical
  className?: string
}

const verticalColor: Record<Vertical, string> = {
  company: "text-teal",
  people: "text-plum",
}

export function ArrowTransition({ from, to, vertical = "company", className }: ArrowTransitionProps) {
  const reduce = useReducedMotion()

  return (
    <span className={cn("inline-flex items-baseline gap-2 font-mono text-sm", className)}>
      <span className="text-ink-70">{from}</span>
      <motion.span
        aria-hidden
        initial={reduce ? false : { opacity: 0, x: -6 }}
        whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.2, 0.6, 0.2, 1] }}
        className={verticalColor[vertical]}
      >
        ──→
      </motion.span>
      <span className="text-ink">{to}</span>
    </span>
  )
}
