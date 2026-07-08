interface InstitutionalStripProps {
  names: string[]
  label?: string
}

export function InstitutionalStrip({ names, label }: InstitutionalStripProps) {
  return (
    <div className="border-y border-line bg-ink py-8">
      {label && (
        <p className="mb-5 text-center font-mono text-xs uppercase tracking-wide text-paper/40">{label}</p>
      )}
      <div className="group overflow-hidden">
        <div className="flex w-max animate-marquee gap-x-10 group-hover:[animation-play-state:paused]">
          {[...names, ...names].map((name, index) => (
            <span
              key={`${name}-${index}`}
              className="whitespace-nowrap font-mono text-sm uppercase tracking-wide text-paper/60"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
