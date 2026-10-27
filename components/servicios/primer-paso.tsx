import { Aparece } from "@/components/aparece"
import { Foto } from "@/components/foto"
import { cn } from "@/lib/utils"
import { primerPaso as c } from "@/content/servicios"

/**
 * El primer paso, en banda oscura partida: la foto a un lado (se acerca al pasar el cursor) y, al otro, qué
 * se aprueba y qué riesgo baja. Los ítems entran escalonados, cada uno con su tilde.
 */
export function PrimerPaso() {
  return (
    <section className="bg-ink text-paper">
      <div className="mx-auto grid max-w-7xl lg:grid-cols-[5fr_7fr]">
        <div className="group relative min-h-[300px] overflow-hidden lg:min-h-full">
          <Foto imagen={c.foto} className="absolute inset-0" imgClassName="group-hover:scale-[1.05]" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent lg:bg-gradient-to-l" />
        </div>

        <div className="px-6 py-16 md:px-16 lg:py-24">
          <p className="font-mono text-[13px] tracking-[0.12em] text-teal-dark uppercase">
            {c.kicker.index} · {c.kicker.label}
          </p>
          <Aparece>
            <h2 className="mt-4 font-display text-[clamp(2.25rem,4vw,3.5rem)] leading-[1.02] font-medium tracking-[-0.03em]">
              {c.titulo}
            </h2>
          </Aparece>
          <p className="mt-5 max-w-xl text-[19px] leading-[1.6] text-paper/80">{c.intro}</p>

          <div className="mt-12 grid gap-10 sm:grid-cols-2 sm:gap-10">
            {c.columnas.map((col, k) => (
              <div key={col.titulo}>
                <p
                  className={cn(
                    "border-b border-paper/25 pb-3 font-mono text-[14px] tracking-[0.12em] uppercase",
                    k === 0 ? "text-lima" : "text-teal-dark"
                  )}
                >
                  {col.titulo}
                </p>
                <ul>
                  {col.items.map((item, i) => (
                    <li key={item} className="border-b border-paper/15">
                      <Aparece demora={k * 0.15 + i * 0.09}>
                        <p className="flex gap-3 py-5 text-[18px] leading-[1.5] text-paper/85">
                          <span
                            aria-hidden
                            className={cn(
                              "mt-[4px] flex size-[22px] shrink-0 items-center justify-center rounded-full text-[12px] text-ink",
                              k === 0 ? "bg-lima" : "bg-teal-dark"
                            )}
                          >
                            ✓
                          </span>
                          {item}
                        </p>
                      </Aparece>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
