"use client"

import { useState, type CSSProperties } from "react"
import { Hero } from "@/components/hero"
import { VerticalRail } from "@/components/vertical-rail"
import { heroDotsDefaults, type HeroDotsParams } from "@/components/hero-dots"

/** Página de prueba del hero nuevo. Sin links entrantes; no forma parte del sitio. */

const controls: { key: keyof HeroDotsParams; label: string; min: number; max: number; step: number }[] = [
  { key: "cell", label: "paso de la grilla (px)", min: 10, max: 36, step: 1 },
  { key: "size", label: "tamaño del punto", min: 0.2, max: 1, step: 0.02 },
  { key: "speed", label: "velocidad", min: 0, max: 0.5, step: 0.01 },
  { key: "cursor", label: "radio del cursor (px)", min: 0, max: 400, step: 10 },
  { key: "focus", label: "foco teal", min: 0, max: 1, step: 0.05 },
]

const rails = [
  { from: "licencias sueltas", to: "IA de toda la empresa", vertical: "company" as const, note: "adopción" },
  { from: "cada uno por su cuenta", to: "permisos por persona", vertical: "company" as const, note: "gobierno" },
]

export function HeroLab() {
  const [params, setParams] = useState<HeroDotsParams>(heroDotsDefaults)
  const [backdrop, setBackdrop] = useState<"dots" | "network">("dots")
  const [smallType, setSmallType] = useState(true)

  // La v1.2 ya trae el titular en 64px; el botón permite comparar contra los 96px anteriores.
  const typeScale = smallType ? undefined : ({ "--text-poster-sm": "clamp(2.75rem, 8vw, 6rem)" } as CSSProperties)

  return (
    <main style={typeScale}>
      <Hero
        key={backdrop}
        eyebrow="// IA suelta → IA ordenada"
        posterTitle="Central IA"
        posterAccent="IA"
        posterSize="sm"
        supportLine="La plataforma que ordena la adopción de IA en tu empresa."
        subhead="El conocimiento de tu empresa, sus agentes y sus herramientas en un solo lugar, con permisos sobre quién accede a qué. Tu gente trabaja desde la plataforma o desde el asistente que ya usa, y nuestro equipo la implementa con vos."
        ctaPrimary={{ label: "Agendá una primera conversación", href: "/contacto" }}
        ctaSecondary={{ label: "Conocé Central IA →", href: "/lab/hero" }}
        variant="dark"
        backdrop={backdrop}
        dotsParams={params}
      >
        <div className="mt-10 max-w-xl">
          <VerticalRail rails={rails} surface="dark" />
        </div>
      </Hero>

      <section className="mx-auto max-w-5xl px-6 py-12">
        <p className="font-mono text-xs uppercase tracking-wider text-teal">// lab → ajustes del hero</p>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {controls.map((c) => (
            <label key={c.key} className="block font-mono text-xs text-ink-70">
              {c.label}: {params[c.key]}
              <input
                type="range"
                min={c.min}
                max={c.max}
                step={c.step}
                value={params[c.key]}
                onChange={(e) => setParams((p) => ({ ...p, [c.key]: Number(e.target.value) }))}
                className="mt-2 block w-full accent-teal"
              />
            </label>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-4 font-mono text-xs">
          <button
            type="button"
            onClick={() => setBackdrop((b) => (b === "dots" ? "network" : "dots"))}
            className="rounded border border-ink px-4 py-2 text-ink hover:bg-ink hover:text-paper"
          >
            fondo: {backdrop === "dots" ? "trama de puntos" : "red actual"}
          </button>
          <button
            type="button"
            onClick={() => setSmallType((v) => !v)}
            className="rounded border border-ink px-4 py-2 text-ink hover:bg-ink hover:text-paper"
          >
            titular: {smallType ? "v1.2 (64px)" : "anterior (96px)"}
          </button>
          <button
            type="button"
            onClick={() => setParams(heroDotsDefaults)}
            className="rounded border border-ink px-4 py-2 text-ink hover:bg-ink hover:text-paper"
          >
            volver a los valores iniciales
          </button>
        </div>
        <pre className="mt-8 overflow-x-auto rounded border border-line bg-paper-soft p-4 font-mono text-xs text-ink-70">
          {JSON.stringify(params)}
        </pre>
      </section>
    </main>
  )
}
