import { cn } from "@/lib/utils"
import type { Vertical } from "@/content/types"

interface LevelCardProps {
  title: string
  description: string
  vertical?: Vertical
  kicker?: string
  className?: string
}

const verticalBar: Record<Vertical, string> = {
  company: "bg-teal",
  people: "bg-plum",
}

const verticalText: Record<Vertical, string> = {
  company: "text-teal",
  people: "text-plum",
}

export function LevelCard({ title, description, vertical = "company", kicker, className }: LevelCardProps) {
  return (
    <div
      className={cn(
        "relative flex h-full flex-col rounded border border-ink bg-paper-soft p-6",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <span className={cn("font-mono text-xs", verticalText[vertical])}>{kicker ?? "A→B"}</span>
      </div>
      <h3 className="mt-4 font-display text-xl font-semibold text-ink">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-70">{description}</p>
      <span className={cn("absolute inset-x-0 bottom-0 h-[3px] rounded-b", verticalBar[vertical])} />
    </div>
  )
}
