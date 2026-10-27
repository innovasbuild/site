import Link from "next/link"
import { ArrowText } from "@/components/arrow"
import { ArrowList } from "@/components/arrow-list"
import { cn } from "@/lib/utils"
import type { Plan } from "@/content/precios"

/** Tarjeta de un plan de precios. El destacado lleva borde y botón en teal. */
export function PlanCard({ plan }: { plan: Plan }) {
  const { featured } = plan

  return (
    <div
      className={cn(
        "relative flex h-full flex-col rounded border bg-paper p-6 md:p-8",
        featured ? "border-teal shadow-teal" : "border-ink"
      )}
    >
      <p className="font-mono text-xs uppercase tracking-wider text-teal">{`// ${plan.name}`}</p>

      <p className="mt-5 font-display text-4xl font-bold text-ink md:text-5xl">{plan.price}</p>
      <p className="mt-1 font-mono text-xs text-ink-70">{plan.period}</p>
      {plan.example && <p className="mt-1 font-mono text-xs text-ink-40">{plan.example}</p>}

      <p className="mt-5 text-sm leading-relaxed text-ink-70">{plan.description}</p>

      <div className="mt-6 border-t border-line pt-6">
        {plan.includesFrom && <p className="mb-3 text-sm font-medium text-ink">{plan.includesFrom}</p>}
        <ArrowList items={plan.features} />
      </div>

      <div className="mt-auto pt-8">
        <Link
          href={plan.cta.href}
          className={cn(
            "block rounded-full px-7 py-3 text-center text-base font-bold transition-transform hover:-translate-y-0.5",
            featured
              ? "bg-teal text-on-brand hover:shadow-teal"
              : "border border-ink text-ink hover:bg-ink hover:text-paper"
          )}
        >
          <ArrowText>{plan.cta.label}</ArrowText>
        </Link>
        {plan.link && (
          <Link href={plan.link.href} className="mt-3 block text-center text-sm font-bold text-teal hover:underline">
            <ArrowText>{plan.link.label}</ArrowText>
          </Link>
        )}
        {plan.note && <p className="mt-3 text-center text-xs leading-relaxed text-ink-40">{plan.note}</p>}
      </div>

      {featured && <span className="absolute inset-x-0 top-0 h-[3px] rounded-t bg-teal" />}
    </div>
  )
}
