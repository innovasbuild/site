import { cn } from "@/lib/utils"
import type { Vertical } from "@/content/types"

interface SectionKickerProps {
  index: string
  label: string
  vertical?: Vertical
  className?: string
}

const verticalColor: Record<Vertical, string> = {
  company: "text-teal",
  people: "text-plum",
}

export function SectionKicker({ index, label, vertical = "company", className }: SectionKickerProps) {
  return (
    <p className={cn("font-mono text-xs uppercase tracking-wider text-ink-40", className)}>
      <span className={verticalColor[vertical]}>{`// ${index}`}</span> ──→ {label}
    </p>
  )
}
