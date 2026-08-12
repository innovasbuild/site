interface EconomicsCardProps {
  title: string
  items: string[]
}

export function EconomicsCard({ title, items }: EconomicsCardProps) {
  return (
    <div className="rounded border border-ink bg-paper-soft p-6">
      <h3 className="font-display text-lg font-bold text-ink">{title}</h3>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-2 text-sm text-ink-70">
            <span className="font-mono text-teal">→</span> {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
