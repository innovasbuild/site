import { Aparece } from "@/components/aparece"
import { Foto } from "@/components/foto"
import { PosterHeading } from "@/components/poster-heading"
import { cn } from "@/lib/utils"
import { roles as c } from "@/content/servicios"

/**
 * Quién se sienta en la mesa: los dos lados en dos columnas, cada uno encabezado por su foto (que se acerca
 * al pasar el cursor) y con sus roles en filas con filete que se corren apenas al pasarles por encima. La
 * gente de la empresa con su color (plum, lima sobre la foto), el equipo de INNOV.AS con teal.
 */
export function Roles() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 md:px-20 md:py-28">
      <p className="font-mono text-[13px] tracking-[0.12em] text-teal uppercase">
        {c.kicker.index} · {c.kicker.label}
      </p>
      <div className="mt-3 max-w-3xl">
        <PosterHeading size="sm" accent={c.posterAccent}>{c.posterTitle}</PosterHeading>
      </div>

      <div className="mt-14 grid gap-14 md:grid-cols-2 md:gap-10">
        {c.lados.map((lado, l) => {
          const gente = lado.tono === "gente"
          return (
            <div key={lado.titulo}>
              <Aparece demora={l * 0.12}>
                <div className="group relative aspect-[16/9] overflow-hidden rounded-[20px] text-paper">
                  <Foto imagen={lado.foto} className="absolute inset-0" imgClassName={cn("group-hover:scale-[1.06]", lado.posicion)} />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent" />
                  <p className="absolute bottom-5 left-6 flex items-center gap-2.5 font-display text-[clamp(1.75rem,2.6vw,2.25rem)] leading-none font-medium tracking-[-0.02em]">
                    <span className={cn("size-2.5 rounded-full", gente ? "bg-lima" : "bg-teal-dark")} />
                    {lado.titulo}
                  </p>
                </div>
              </Aparece>
              <ul className="mt-4">
                {lado.items.map((item, i) => (
                  <li key={item.rol} className="group border-b border-line">
                    <Aparece demora={0.1 + i * 0.07}>
                      <div className="grid grid-cols-[2rem_1fr] gap-3 py-5 transition-transform duration-500 ease-[var(--ease-out-quint)] group-hover:translate-x-1.5">
                        <span className={cn("pt-1.5 font-mono text-xs", gente ? "text-plum" : "text-teal")}>0{i + 1}</span>
                        <div>
                          <p className="font-display text-[clamp(1.25rem,1.8vw,1.5rem)] leading-[1.2] font-medium tracking-[-0.01em] text-ink">
                            {item.rol}
                          </p>
                          <p className="mt-1.5 text-[15px] leading-[1.55] text-ink-70">{item.texto}</p>
                        </div>
                      </div>
                    </Aparece>
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
    </section>
  )
}
