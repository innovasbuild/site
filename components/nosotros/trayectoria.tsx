import Link from "next/link"
import { ArrowText } from "@/components/arrow"
import { PosterHeading } from "@/components/poster-heading"
import { StatCounter } from "@/components/stat-counter"
import { trayectoria as c } from "@/content/nosotros"

/**
 * De dónde venimos: el texto a la izquierda y, a la derecha, las tres cifras una por fila (cada una sola en
 * su fila, a escala póster), con su explicación al costado.
 */
export function Trayectoria() {
  return (
    <section className="border-y border-line bg-paper-soft">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:px-20 md:py-28 lg:grid-cols-[5fr_7fr] lg:gap-20">
        <div>
          <p className="font-mono text-[13px] tracking-[0.12em] text-teal uppercase">
            {c.kicker.index} · {c.kicker.label}
          </p>
          <div className="mt-3">
            <PosterHeading size="sm" accent={c.posterAccent}>{c.posterTitle}</PosterHeading>
          </div>
          <p className="mt-6 text-[17px] leading-[1.6] text-ink-70">{c.body}</p>
          <p className="mt-4 text-[17px] leading-[1.6] text-ink-70">{c.closing}</p>
          <Link href={c.link.href} className="mt-8 inline-block font-semibold text-teal hover:underline">
            <ArrowText>{c.link.label}</ArrowText>
          </Link>
        </div>

        <div className="border-t border-ink">
          {c.cifras.map((cifra, i) => (
            <div key={cifra.label} className="grid items-center gap-4 border-b border-line py-9 sm:grid-cols-[minmax(0,1fr)_13rem] sm:gap-8">
              <StatCounter value={cifra.value} suffix={cifra.suffix} tone={i === 1 ? "ink" : "company"} ajustada />
              <div>
                <p className="font-mono text-xs tracking-wider text-ink-40 uppercase">{cifra.label}</p>
                {cifra.texto && <p className="mt-1.5 text-[16px] leading-[1.5] text-ink-70">{cifra.texto}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
