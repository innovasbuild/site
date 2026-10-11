import { HandDrawn } from "@/components/illustrations/hand-drawn"
import { homeIllustrations } from "@/components/illustrations/home"

interface IllustratedCard {
  illustration: keyof typeof homeIllustrations
  title: string
  description: string
}

/** Tarjetas con ilustración a mano arriba, título y texto. */
export function IllustratedCards({ cards }: { cards: readonly IllustratedCard[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {cards.map((card) => (
        <div key={card.title} className="flex flex-col rounded border border-ink bg-paper-soft p-6">
          <HandDrawn illustration={homeIllustrations[card.illustration]} className="w-full" />
          <h3 className="mt-4 font-display text-xl font-bold text-ink">{card.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-70">{card.description}</p>
        </div>
      ))}
    </div>
  )
}
