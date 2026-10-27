"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Aparece } from "@/components/aparece"
import { Foto } from "@/components/foto"
import { PosterHeading } from "@/components/poster-heading"
import { dosFormas as c } from "@/content/servicios"

/**
 * Los dos diagnósticos comparados fila por fila. Cada uno lleva arriba su foto con el nombre encima; al pasar
 * el cursor por una columna (o por su foto) la foto se acerca y esa columna se resalta, para comparar. En
 * pantallas chicas cada diagnóstico se lee completo, uno debajo del otro.
 */
export function DosFormas() {
  const [mira, setMira] = useState<number | null>(null)

  return (
    <section className="mx-auto max-w-7xl px-6 py-20 md:px-20 md:py-28">
      <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
        <div>
          <p className="font-mono text-[13px] tracking-[0.12em] text-teal uppercase">
            {c.kicker.index} · {c.kicker.label}
          </p>
          <div className="mt-3">
            <PosterHeading size="sm" accent={c.posterAccent}>{c.posterTitle}</PosterHeading>
          </div>
        </div>
        <p className="max-w-xl text-[17px] leading-[1.6] text-ink-70 lg:justify-self-end">{c.intro}</p>
      </div>

      {/* Pantallas medianas y grandes: fotos arriba y tabla */}
      <div className="mt-14 hidden md:block" onMouseLeave={() => setMira(null)}>
        <div className="grid grid-cols-[minmax(0,3fr)_minmax(0,4fr)_minmax(0,4fr)] gap-x-4">
          <span />
          {c.opciones.map((o, k) => (
            <Aparece key={o.nombre} demora={k * 0.12}>
              <Cabecera opcion={o} activa={mira === k} onEnter={() => setMira(k)} />
            </Aparece>
          ))}
        </div>
        <div className="mt-6 border-t border-ink">
          {c.filas.map((fila, f) => (
            <Aparece key={fila} demora={0.1 + f * 0.07}>
              <div className="grid grid-cols-[minmax(0,3fr)_minmax(0,4fr)_minmax(0,4fr)] gap-x-4 border-b border-line">
                <p className="py-6 pr-8 font-mono text-[12px] tracking-[0.1em] text-ink-40 uppercase">{fila}</p>
                {c.opciones.map((o, k) => (
                  <p
                    key={o.nombre}
                    onMouseEnter={() => setMira(k)}
                    className={cn(
                      "px-5 py-6 text-[16px] leading-[1.55] transition-[color,background-color] duration-300",
                      mira === null ? "text-ink" : mira === k ? "bg-white text-ink" : "text-ink-40"
                    )}
                  >
                    {o.valores[f]}
                  </p>
                ))}
              </div>
            </Aparece>
          ))}
        </div>
      </div>

      {/* Pantallas chicas: un diagnóstico debajo del otro */}
      <div className="mt-10 flex flex-col gap-12 md:hidden">
        {c.opciones.map((o) => (
          <div key={o.nombre}>
            <Cabecera opcion={o} />
            <dl className="mt-4">
              {c.filas.map((fila, f) => (
                <div key={fila} className="border-b border-line py-4">
                  <dt className="font-mono text-[11px] tracking-[0.1em] text-ink-40 uppercase">{fila}</dt>
                  <dd className="mt-1 text-[16px] leading-[1.55] text-ink">{o.valores[f]}</dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
    </section>
  )
}

function Cabecera({
  opcion,
  activa,
  onEnter,
}: {
  opcion: (typeof c.opciones)[number]
  activa?: boolean
  onEnter?: () => void
}) {
  return (
    <div onMouseEnter={onEnter} className="group relative aspect-[16/10] overflow-hidden rounded-[20px] text-paper">
      <Foto
        imagen={opcion.foto}
        className="absolute inset-0"
        imgClassName={cn("group-hover:scale-[1.06]", activa && "scale-[1.06]")}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/5" />
      <div className="absolute inset-x-0 bottom-0 p-6">
        <p className="font-mono text-[11px] tracking-[0.12em] text-lima uppercase">{opcion.etiqueta}</p>
        <p className="mt-1.5 font-display text-[clamp(1.875rem,3vw,2.75rem)] leading-[1] font-medium tracking-[-0.03em]">
          {opcion.nombre}
        </p>
      </div>
    </div>
  )
}
