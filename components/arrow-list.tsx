import { cn } from "@/lib/utils"

/** Lista con la flecha de la notación como viñeta. */
export function ArrowList({ items, className }: { items: readonly string[]; className?: string }) {
  return (
    <ul className={cn("space-y-3", className)}>
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-sm leading-relaxed text-ink-70">
          <span className="font-mono text-teal">→</span> {item}
        </li>
      ))}
    </ul>
  )
}
