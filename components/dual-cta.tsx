import Link from "next/link"
import { cn } from "@/lib/utils"
import type { Cta, Vertical } from "@/content/types"

interface DualCtaCard {
  title: string
  description: string
  cta: Cta
  vertical: Vertical
}

interface DualCtaProps {
  title: string
  cardA: DualCtaCard
  cardB: DualCtaCard
}

const verticalButton: Record<Vertical, string> = {
  company: "bg-teal hover:shadow-teal",
  people: "bg-plum hover:shadow-plum",
}

function Card({ card }: { card: DualCtaCard }) {
  return (
    <div className="flex flex-col rounded border border-ink bg-paper-soft p-8">
      <h3 className="font-display text-2xl font-semibold text-ink">{card.title}</h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-70">{card.description}</p>
      <Link
        href={card.cta.href}
        className={cn(
          "mt-6 w-fit rounded px-6 py-3 text-sm font-semibold text-on-brand transition-transform hover:-translate-y-0.5",
          verticalButton[card.vertical]
        )}
      >
        {card.cta.label}
      </Link>
    </div>
  )
}

export function DualCta({ title, cardA, cardB }: DualCtaProps) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <h2 className="text-center font-display text-3xl font-semibold text-ink md:text-4xl">{title}</h2>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <Card card={cardA} />
        <Card card={cardB} />
      </div>
    </section>
  )
}
