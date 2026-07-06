interface InstitutionalStripProps {
  names: string[]
}

export function InstitutionalStrip({ names }: InstitutionalStripProps) {
  return (
    <div className="border-y border-line bg-ink py-8">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-10 gap-y-4 px-6">
        {names.map((name) => (
          <span key={name} className="font-mono text-sm uppercase tracking-wide text-paper/60">
            {name}
          </span>
        ))}
      </div>
    </div>
  )
}
