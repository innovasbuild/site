import Link from "next/link"
import type { Cta } from "@/content/types"

interface CtaBannerProps {
  title: string
  cta: Cta
  note?: string
}

export function CtaBanner({ title, cta, note }: CtaBannerProps) {
  return (
    <section className="border-t border-line bg-paper-soft">
      <div className="mx-auto max-w-3xl px-6 py-16 text-center">
        <h2 className="font-display text-2xl font-bold text-ink md:text-3xl">{title}</h2>
        <Link
          href={cta.href}
          className="mt-6 inline-block rounded bg-teal px-6 py-3 text-base font-bold text-on-brand transition-transform hover:-translate-y-0.5 hover:shadow-teal"
        >
          {cta.label}
        </Link>
        {note && <p className="mt-3 text-sm text-ink-40">{note}</p>}
      </div>
    </section>
  )
}
