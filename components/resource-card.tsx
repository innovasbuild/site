import type { Resource } from "@/content/recursos"

export function ResourceCard({ resource }: { resource: Resource }) {
  return (
    <a
      href={resource.href}
      className="block rounded border border-ink bg-paper-soft p-6 transition-transform hover:-translate-y-0.5"
    >
      <p className="font-mono text-xs uppercase tracking-wider text-teal">{resource.format}</p>
      <p className="mt-3 font-display text-lg font-semibold text-ink">{resource.title}</p>
      <p className="mt-2 text-sm text-ink-70">{resource.description}</p>
    </a>
  )
}
