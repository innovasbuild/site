"use client"

import { motion, useReducedMotion } from "framer-motion"
import type { Vertical } from "@/content/types"

interface Rail {
  from: string
  to: string
  vertical?: Vertical
  note?: string
}

interface VerticalRailProps {
  rails: Rail[];
  surface?: "light" | "dark"
}

const color: Record<string, string> = {
  company: "var(--color-teal)",
  people: "var(--color-plum)",
}
const colorDark: Record<string, string> = {
  company: "var(--color-teal-dark)",
  people: "var(--color-plum-dark)",
}

/** Un riel A→B por vertical — canónicamente dos: personas y empresas. */
export function VerticalRail({ rails, surface = "light" }: VerticalRailProps) {
  const reduce = useReducedMotion()
  return (
    <div className="flex flex-col gap-3">
      {rails.map((rail, i) => {
        const v = rail.vertical ?? "company"
        const c = surface === "dark" ? colorDark[v] : color[v]
        return (
          <div key={i} className="flex flex-wrap items-baseline gap-3 font-mono text-sm">
            {rail.note && (
              <span className="text-xs uppercase tracking-wider" style={{ color: surface === "dark" ? "rgba(237,232,220,.6)" : "var(--color-ink-40)" }}>
                {rail.note}
              </span>
            )}
            <span className={surface === "dark" ? "text-paper/70" : "text-ink-70"}>{rail.from}</span>
            <motion.span
              aria-hidden
              initial={reduce ? false : { opacity: 0, x: -6 }}
              whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.2, 0.6, 0.2, 1] }}
              style={{ color: c }}
            >
              →
            </motion.span>
            <span className={surface === "dark" ? "text-paper" : "text-ink"} style={{ fontWeight: 700 }}>{rail.to}</span>
          </div>
        )
      })}
    </div>
  )
}
