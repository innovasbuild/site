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
}: HeroProps) {
  return (
    <section className="border-b border-line bg-paper">
      <div className="mx-auto max-w-5xl px-6 py-24 text-center md:py-32">
        <p className="font-mono text-xs uppercase tracking-wider text-teal">{eyebrow}</p>

        <h1 className="mt-6 text-balance font-display text-4xl font-semibold leading-tight text-ink md:text-hero">
          {title ?? (
            <>
              {titlePrefix}
              {titleHighlight && <span className="text-teal">{titleHighlight}</span>}
              {titleSuffix}
            </>
          )}
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-balance text-lg text-ink-70">{subhead}</p>

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
              className="rounded border border-ink px-6 py-3 text-base font-semibold text-ink transition-colors hover:bg-ink hover:text-paper"
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
