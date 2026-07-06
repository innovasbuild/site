interface RecoveryRow {
  label: string
  value: string
}

interface LevelRecoveryTableProps {
  title: string
  rows: RecoveryRow[]
}

export function LevelRecoveryTable({ title, rows }: LevelRecoveryTableProps) {
  return (
    <div className="rounded border border-ink bg-paper-soft p-6">
      <h3 className="font-display text-lg font-semibold text-ink">{title}</h3>
      <dl className="mt-4 divide-y divide-line">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between py-3">
            <dt className="text-sm text-ink-70">{row.label}</dt>
            <dd className="font-mono text-sm text-teal">{row.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
