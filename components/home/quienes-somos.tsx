import Link from "next/link"
import { ArrowText } from "@/components/arrow"
import { SectionKicker } from "@/components/section-kicker"
import { PosterHeading } from "@/components/poster-heading"
import { StatCounter } from "@/components/stat-counter"
import { quienesSomos as c, trayectoria } from "@/content/home"

/** Quiénes somos, con el armado anterior: texto, las cifras en una fila y el link. Sin foto. */
export function QuienesSomos() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <SectionKicker index={c.kicker.index} label={c.kicker.label} />
      <div className="mt-3">
        <PosterHeading size="sm" accent={c.posterAccent}>{c.posterTitle}</PosterHeading>
      </div>
      <p className="mt-4 max-w-3xl text-ink-70">{c.body}</p>
      <div className="mt-8 flex flex-wrap gap-12 border-t border-line pt-8">
        {trayectoria.stats.map((s) => (
          <StatCounter key={s.label} value={s.value} suffix={s.suffix} label={s.label} tone={s.tone} size="sm" />
        ))}
      </div>
      <p className="mt-8 max-w-3xl text-ink-70">{c.body2}</p>
      <Link href={c.cta.href} className="mt-6 inline-block font-bold text-teal hover:underline">
        <ArrowText>{c.cta.label}</ArrowText>
      </Link>
    </section>
  )
}
