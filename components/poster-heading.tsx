"use client"

import { motion, useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"
import type { Vertical } from "@/content/types"

interface PosterHeadingProps {
  children: string
  size?: "sm" | "md" | "xl"
  tone?: Vertical
  accent?: string
  align?: "left" | "center" | "right"
  as?: "h1" | "h2" | "h3"
  className?: string
  /** Superficie donde vive el titular. En "dark" (sobre bg-ink) el accent usa los tokens -dark. */
  surface?: "light" | "dark"
}

const sizeClass: Record<string, string> = {
  sm: "text-poster-sm",
  md: "text-poster",
  xl: "text-poster-xl",
}

/**
 * Titular escala póster: Fraunces estirada al máximo, 1–4 palabras, reveal por palabra.
 * Máximo un PosterHeading por pantalla/sección.
 */
export function PosterHeading({ children, size = "md", tone = "company", accent, align = "left", as = "h2", className, surface = "light" }: PosterHeadingProps) {
  const Tag = as
  const reduce = useReducedMotion()
  const words = children.trim().split(/\s+/)
  const accentColor =
    surface === "dark"
      ? tone === "people"
        ? "var(--color-plum-dark)"
        : "var(--color-teal-dark)"
      : tone === "people"
        ? "var(--color-plum)"
        : "var(--color-teal)"

  return (
    <Tag
      className={cn(
        "m-0 font-display uppercase",
        sizeClass[size],
        align === "center" && "text-center",
        align === "right" && "text-right",
        className
      )}
      style={{
        fontVariationSettings: "var(--fraunces-poster)",
        fontWeight: 700,
        lineHeight: size === "xl" ? "var(--lh-poster-tight)" : "var(--lh-poster)",
        letterSpacing: size === "xl" ? "var(--track-poster-xl)" : "var(--track-poster)",
      }}
    >
      {words.map((w, i) => {
        const isAccent = accent && w.toLowerCase().replace(/[.,;:]/g, "") === accent.toLowerCase()
        return (
          <span key={i} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}>
            <motion.span
              initial={reduce ? false : { y: "0.5em", opacity: 0 }}
              whileInView={reduce ? undefined : { y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.62, delay: reduce ? 0 : i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: "inline-block", color: isAccent ? accentColor : undefined }}
            >
              {w}
            </motion.span>
            {i < words.length - 1 && "\u00A0"}
          </span>
        )
      })}
    </Tag>
  )
}
