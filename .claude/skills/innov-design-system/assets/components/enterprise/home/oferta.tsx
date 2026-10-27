import Link from "next/link"
import { Arrow } from "@/components/arrow"
import { Aparece } from "@/components/aparece"
import { Foto } from "@/components/foto"
import { PosterHeading } from "@/components/poster-heading"
import { oferta as c } from "@/content/home"

/**
 * Lo que contrata la empresa: infraestructura, agentes y equipo. Tres tarjetas altas con foto a sangre;
 * al pasar el cursor la foto se acerca y el texto sube.
 */
export function Oferta() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 md:px-20 md:py-28">
      <div className="max-w-3xl">
        <p className="font-mono text-[13px] tracking-[0.12em] text-teal uppercase">
          {c.kicker.index} · {c.kicker.label}
        </p>
        <div className="mt-3">
          <PosterHeading size="sm" accent={c.posterAccent}>{c.posterTitle}</PosterHeading>
        </div>
        <p className="mt-5 text-[17px] leading-[1.6] text-ink-70">{c.intro}</p>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {c.cards.map((card, i) => (
          <Aparece key={card.etiqueta} demora={i * 0.1}>
            <Link
              href={card.cta.href}
              className="group relative block aspect-[4/5] overflow-hidden rounded-[20px] text-paper"
            >
              <Foto imagen={card.foto} className="absolute inset-0" imgClassName="group-hover:scale-[1.06]" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/10" />
              <div className="relative flex h-full flex-col justify-between p-7">
                <p className="font-mono text-[12px] tracking-[0.12em] uppercase">
                  <span className="text-lima">0{i + 1}</span> · {card.etiqueta}
                </p>
                <div className="transition-transform duration-500 lg:translate-y-10 lg:group-hover:translate-y-0">
                  <h3 className="font-display text-[clamp(1.75rem,2.4vw,2.25rem)] leading-[1.05] font-medium tracking-[-0.02em]">
                    {card.titulo}
                  </h3>
                  <p className="mt-3 text-[15px] leading-[1.55] text-paper/80">{card.texto}</p>
                  <p className="mt-5 inline-flex items-center gap-2 text-[15px] font-semibold text-paper transition-opacity duration-500 lg:opacity-0 lg:group-hover:opacity-100">
                    {card.cta.label} <Arrow className="text-lima" />
                  </p>
                </div>
              </div>
            </Link>
          </Aparece>
        ))}
      </div>
    </section>
  )
}
