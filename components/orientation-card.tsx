"use client"

import { ArrowList } from "@/components/arrow-list"
import { orientacion } from "@/content/contacto"

/** Tarjeta de la charla de orientación: explica para qué es y abre la agenda en una pestaña nueva. */
export function OrientationCard() {
  return (
    <div className="rounded border border-ink bg-paper p-8">
      <p className="font-mono text-xs uppercase tracking-wider text-teal">{`// ${orientacion.kicker}`}</p>
      <h2 className="mt-4 text-balance font-display text-2xl font-bold text-ink">{orientacion.title}</h2>
      <p className="mt-3 font-medium text-ink">{orientacion.lead}</p>
      <ArrowList items={orientacion.items} className="mt-5" />
      <a
        href={orientacion.url}
        target="_blank"
        rel="noreferrer"
        onClick={() => window.gtag?.("event", "agenda_click", { method: "charla_orientacion" })}
        className="mt-8 inline-block rounded bg-teal px-6 py-3 text-base font-bold text-on-brand transition-transform hover:-translate-y-0.5 hover:shadow-teal"
      >
        {orientacion.cta}
      </a>
    </div>
  )
}
