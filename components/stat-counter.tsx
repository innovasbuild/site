"use client"

import { useRef } from "react"
import { motion, useInView, useReducedMotion, animate } from "framer-motion"
import { useEffect, useState } from "react"
import type { Vertical } from "@/content/types"

interface StatCounterProps {
  value: number
  prefix?: string
  suffix?: string
  label?: string
  caption?: string
  tone?: Vertical | "ink"
}

const toneColor: Record<string, string> = {
  company: "var(--color-teal)",
  people: "var(--color-plum)",
  ink: "var(--color-ink)",
}

/** Cifra grande con conteo animado al entrar en viewport + label mono. */
export function StatCounter({ value, prefix = "", suffix = "", label, caption, tone = "company" }: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  const reduce = useReducedMotion()
  const [n, setN] = useState(reduce ? value : 0)

  useEffect(() => {
    if (!inView || reduce) return
    const controls = animate(0, value, {
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setN(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, value, reduce])

  return (
    <div ref={ref} className="flex flex-col gap-2">
      <div
        className="font-display tabular-nums"
        style={{
          fontVariationSettings: "var(--fraunces-poster)",
          fontWeight: 700,
          fontSize: "var(--text-counter)",
          lineHeight: "var(--lh-counter)",
          letterSpacing: "var(--track-poster)",
          color: toneColor[tone],
        }}
      >
        {prefix}{n.toLocaleString("es-AR")}{suffix}
      </div>
      {label && <div className="font-mono text-xs uppercase tracking-wider text-ink-40">{label}</div>}
      {caption && <p className="max-w-[26ch] text-sm leading-relaxed text-ink-70">{caption}</p>}
    </div>
  )
}
