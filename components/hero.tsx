import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import type { Cta } from "@/content/types"

interface HeroProps {
  eyebrow: string
  titlePrefix?: string
  titleHighlight?: string
  titleSuffix?: string
  title?: string
  subhead: string
  ctaPrimary: Cta
  ctaSecondary?: Cta
  children?: React.ReactNode
  variant?: "light" | "dark"
  /** Imagen de fondo full-bleed (solo variant="dark"). */
  imageSlot?: { src: string; alt: string }
}

export function Hero({
  eyebrow,
  titlePrefix,
  titleHighlight,
  titleSuffix,
  title,
  subhead,
  ctaPrimary,
  ctaSecondary,
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
          {/* scrim: mantiene legible el texto sobre la foto */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-ink/40" />
        </div>
      )}
      <div className="relative z-10 mx-auto max-w-5xl px-6 py-24 text-center md:py-32">
        <p
          className={cn(
            "font-mono text-xs uppercase tracking-wider",
            isDark ? "text-paper/70" : "text-teal"
          )}
        >
          {eyebrow}
        </p>

        <h1
          className={cn(
            "mt-6 text-balance font-display text-4xl font-semibold leading-tight md:text-hero",
            isDark ? "text-paper" : "text-ink"
          )}
        >
          {title ?? (
            <>
              {titlePrefix}
              {titleHighlight && (
                <span className={cn(isDark ? "text-paper underline decoration-teal decoration-4" : "text-teal")}>
                  {titleHighlight}
                </span>
              )}
              {titleSuffix}
            </>
          )}
        </h1>

        <p
          className={cn(
            "mx-auto mt-6 max-w-2xl text-balance text-lg",
            isDark ? "text-paper/70" : "text-ink-70"
          )}
        >
          {subhead}
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href={ctaPrimary.href}
            className={cn(
              "rounded bg-teal px-6 py-3 text-base font-semibold text-on-brand transition-transform",
              "hover:-translate-y-0.5 hover:shadow-teal"
            )}
          >
            {ctaPrimary.label}
          </Link>
          {ctaSecondary && (
            <Link
              href={ctaSecondary.href}
              className={cn(
                "rounded border px-6 py-3 text-base font-semibold transition-colors",
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
