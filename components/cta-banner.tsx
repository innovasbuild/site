import Link from "next/link"
import type { Cta } from "@/content/types"

interface CtaBannerProps {
  title: string
  cta: Cta
  /** Botón secundario, con borde, al lado del principal. */
  secondary?: Cta
  note?: string
}

export function CtaBanner({ title, cta, secondary, note }: CtaBannerProps) {
  return (
    <section className="border-t border-line bg-paper-soft">
      <div className="mx-auto max-w-3xl px-6 py-16 text-center">
        <h2 className="font-display text-2xl font-bold text-ink md:text-3xl">{title}</h2>
        <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href={cta.href}
            className="inline-block rounded-full bg-teal px-7 py-3 text-base font-bold text-on-brand transition-transform hover:-translate-y-0.5 hover:shadow-teal"
          >
            {cta.label}
          </Link>
          {secondary && (
            <Link
              href={secondary.href}
              className="inline-block rounded-full border border-ink px-7 py-3 text-base font-bold text-ink transition-colors hover:bg-ink hover:text-paper"
            >
              {secondary.label}
            </Link>
          )}
        </div>
        {note && <p className="mt-3 text-sm text-ink-40">{note}</p>}
      </div>
    </section>
  )
}
