interface Step {
  title: string
  description: string
}

/** Tarjetas de pasos numerados: el camino de implementación y metodologías. */
export function StepCards({ steps }: { steps: Step[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {steps.map((step, index) => (
        <div key={step.title} className="rounded border border-ink bg-paper p-6">
          <span className="font-mono text-xs text-teal">{`0${index + 1} ──→`}</span>
          <p className="mt-3 font-display text-lg font-bold text-ink">{step.title}</p>
          <p className="mt-2 text-sm leading-relaxed text-ink-70">{step.description}</p>
        </div>
      ))}
    </div>
  )
}
