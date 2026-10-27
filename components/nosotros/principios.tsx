import { Aparece } from "@/components/aparece"
import { PosterHeading } from "@/components/poster-heading"
import { principios as c } from "@/content/nosotros"

/**
 * Cómo pensamos: cada principio como una frase grande en su fila, con la explicación al costado. Al pasar el
 * cursor la frase se corre apenas.
 */
export function Principios() {
  return (
    <section className="border-y border-line bg-paper-soft">
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-20 md:py-28">
        <p className="font-mono text-[13px] tracking-[0.12em] text-teal uppercase">
          {c.kicker.index} · {c.kicker.label}
        </p>
        <div className="mt-3 max-w-3xl">
          <PosterHeading size="sm" accent={c.posterAccent}>{c.posterTitle}</PosterHeading>
        </div>

        <ol className="mt-14 border-t border-ink">
          {c.items.map((item, i) => (
            <li key={item.frase} className="border-b border-line">
              <Aparece demora={i * 0.08}>
                <div className="group grid gap-3 py-8 md:grid-cols-[4rem_minmax(0,7fr)_minmax(0,5fr)] md:items-baseline md:gap-6 md:py-10">
                  <span className="font-mono text-xs text-teal">0{i + 1}</span>
                  <p className="font-display text-[clamp(1.875rem,3.6vw,3.25rem)] leading-[1.05] font-medium tracking-[-0.03em] text-ink transition-transform duration-500 ease-[var(--ease-out-quint)] md:group-hover:translate-x-2">
                    {item.frase}
                  </p>
                  <p className="text-[16px] leading-[1.6] text-ink-70">{item.texto}</p>
                </div>
              </Aparece>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
