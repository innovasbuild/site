import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import type { Cta } from "@/content/types"
import { PosterHeading } from "@/components/poster-heading"
import { TapeLabel } from "@/components/tape-label"

interface HeroProps {
  eyebrow: string
  /** Titular escala póster, 1–4 palabras. Reemplaza al h1 plano. */
  posterTitle?: string
  posterAccent?: string
  /** Escala del póster — "sm" si el titular tiene palabras largas que desbordan a "md" (default). */
  posterSize?: "sm" | "md" | "xl"
  /** Línea de apoyo en Fraunces, debajo del póster (la frase larga que no entra en escala póster). */
  supportLine?: string
  /** Compat: h1 plano cuando la página no tiene un titular corto para escala póster. */
  title?: string
  subhead: string
  ctaPrimary: Cta
  ctaSecondary?: Cta
  tapeLabel?: string
  children?: React.ReactNode
  variant?: "light" | "dark"
  imageSlot?: { src: string; alt: string }
}

export function Hero({
  eyebrow,
  posterTitle,
  posterAccent,
  posterSize = "md",
  supportLine,
  title,
  subhead,
  ctaPrimary,
  ctaSecondary,
  tapeLabel,
  children,
  variant = "light",
  imageSlot,
}: HeroProps) {
  const isDark = variant === "dark"

  return (
    <section className={cn("relative overflow-hidden border-b", isDark ? "border-paper/10 bg-ink" : "border-line bg-paper")}>
      {isDark && imageSlot && (
        <div className="absolute inset-0 z-0">
          <Image src={imageSlot.src} alt={imageSlot.alt} fill priority className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-ink/40" />
        </div>
      )}
      <div className="relative z-10 mx-auto max-w-5xl px-6 py-24 md:py-32">
        <p className={cn("font-mono text-xs uppercase tracking-wider", isDark ? "text-paper/70" : "text-teal")}>{eyebrow}</p>

        <div className="relative mt-6">
          {posterTitle ? (
            <PosterHeading as="h1" size={posterSize} accent={posterAccent} className={isDark ? "text-paper" : "text-ink"}>
              {posterTitle}
            </PosterHeading>
          ) : (
            <h1 className={cn("text-balance font-display text-4xl font-bold leading-tight md:text-hero", isDark ? "text-paper" : "text-ink")}>
              {title}
            </h1>
          )}
          {tapeLabel && (
            <span className="absolute -right-2 -bottom-3 hidden sm:inline-block">
              <TapeLabel tone={isDark ? "teal" : "ink"}>{tapeLabel}</TapeLabel>
            </span>
          )}
        </div>

        {supportLine && (
          <p className={cn("mt-4 max-w-2xl text-balance font-display text-xl", isDark ? "text-paper" : "text-ink")}>{supportLine}</p>
        )}

        <p className={cn("mt-6 max-w-2xl text-balance text-lg", isDark ? "text-paper/70" : "text-ink-70")}>{subhead}</p>

        <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <Link
            href={ctaPrimary.href}
            className={cn(
              "rounded bg-teal px-6 py-3 text-base font-bold text-on-brand transition-transform",
              "hover:-translate-y-0.5 hover:shadow-teal"
            )}
          >
            {ctaPrimary.label}
          </Link>
          {ctaSecondary && (
            <Link
              href={ctaSecondary.href}
              className={cn(
                "rounded border px-6 py-3 text-base font-bold transition-colors",
                isDark
                  ? "border-paper text-paper hover:bg-paper hover:text-ink"
                  : "border-ink text-ink hover:bg-ink hover:text-paper"
              )}
            >
              {ctaSecondary.label}
            </Link>
          )}
        </div>

        {children}
      </div>
    </section>
  )
}
