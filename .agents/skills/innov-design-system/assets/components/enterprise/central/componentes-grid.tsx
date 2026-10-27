import { Aparece } from "@/components/aparece"
import { AgenteRobot } from "@/components/agente-robot"
import { CerebroRed } from "@/components/cerebro-red"
import { HerramientasEnchufe } from "@/components/herramientas-enchufe"
import { PosterHeading } from "@/components/poster-heading"
import { homeIllustrations as il } from "@/components/illustrations/home"
import { componentes as c, type Ilustracion } from "@/content/central-ia"

const dibujo: Record<Ilustracion, React.ReactNode> = {
  brain: <CerebroRed label={il.piezaBrain.label} className="serie-cerebro" />,
  agentes: <AgenteRobot label={il.piezaAgentes.label} className="serie-cerebro" />,
  herramientas: <HerramientasEnchufe label={il.piezaHerramientas.label} className="serie-cerebro" />,
}

/**
 * Componentes de Central IA, contados por lo que le dan a la empresa. Sin cajas: los tres principales como
 * un tríptico separado por líneas, con su dibujo de la serie del cerebro, y el resto como una lista de dos
 * columnas con filetes.
 */
export function ComponentesGrid() {
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

      <div className="mt-14 grid border-t border-ink md:grid-cols-3 md:divide-x md:divide-line">
        {c.principales.map((comp, i) => (
          <Aparece key={comp.nombre} demora={i * 0.08} className="border-b border-line py-10 md:border-b-0 md:px-8 md:first:pl-0 md:last:pr-0">
            <div className="mx-auto flex h-[196px] w-3/4 max-w-[260px] items-end [&>*]:w-full">{comp.ilustracion && dibujo[comp.ilustracion]}</div>
            <p className="mt-6 font-mono text-[12px] tracking-[0.12em] text-teal uppercase">{comp.nombre}</p>
            <h3 className="mt-2 font-display text-[clamp(1.5rem,2.2vw,1.875rem)] leading-[1.12] font-medium tracking-[-0.015em] text-ink">
              {comp.titulo}
            </h3>
            <p className="mt-3 text-[16px] leading-[1.6] text-ink-70">{comp.texto}</p>
          </Aparece>
        ))}
      </div>

      <div className="mt-16 grid gap-10 lg:grid-cols-[4fr_8fr] lg:gap-16">
        <h3 className="font-display text-[clamp(1.75rem,2.6vw,2.25rem)] leading-[1.1] font-medium tracking-[-0.02em] text-ink">
          {c.restoTitulo}
        </h3>
        <dl className="grid gap-x-12 sm:grid-cols-2">
          {c.resto.map((comp) => (
            <div key={comp.nombre} className="border-t border-line py-6">
              <dt>
                <span className="font-mono text-[11px] tracking-[0.12em] text-teal uppercase">{comp.nombre}</span>
                <span className="mt-1.5 block text-[18px] leading-[1.3] font-semibold text-ink">{comp.titulo}</span>
              </dt>
              <dd className="mt-1.5 text-[15px] leading-[1.55] text-ink-70">{comp.texto}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
