"use client"

import { motion, useReducedMotion } from "framer-motion"

interface LevelPathItem {
  label: string
  title: string
  duration: string
  outcome: string
}

interface LevelPathProps {
  items: LevelPathItem[]
}

const nodeColor = [
  "var(--color-plum)",
  "color-mix(in srgb, var(--color-plum) 66%, var(--color-teal) 34%)",
  "color-mix(in srgb, var(--color-plum) 33%, var(--color-teal) 67%)",
  "var(--color-teal)",
]

export function LevelPath({ items }: LevelPathProps) {
  const reduce = useReducedMotion()

  return (
    <div className="grid gap-6 md:grid-cols-4 md:gap-4">
      {items.map((item, index) => (
        <motion.div
          key={item.title}
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: reduce ? 0 : index * 0.08, ease: [0.2, 0.6, 0.2, 1] }}
          className="relative flex flex-col rounded border border-ink bg-paper-soft p-6"
        >
          <span
            className="absolute inset-x-0 top-0 h-[3px] rounded-t"
            style={{ backgroundColor: nodeColor[index] }}
          />
          <span className="font-mono text-xs text-ink-40">{item.label}</span>
          <h3 className="mt-3 font-display text-xl font-semibold text-ink">{item.title}</h3>
          <p className="mt-1 font-mono text-xs text-ink-40">{item.duration}</p>
          <p className="mt-3 text-sm leading-relaxed text-ink-70">{item.outcome}</p>
          {index < items.length - 1 && (
            <span
              aria-hidden
              className="absolute -right-4 top-1/2 hidden -translate-y-1/2 font-mono text-lg md:block"
              style={{ color: nodeColor[index + 1] }}
            >
              →
            </span>
          )}
        </motion.div>
      ))}
    </div>
  )
}
