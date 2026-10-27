import Link from "next/link"
import { ArrowText } from "@/components/arrow"
import { Aparece } from "@/components/aparece"
import { FotosRotan } from "@/components/fotos-rotan"
import { PosterHeading } from "@/components/poster-heading"
import type { Cta } from "@/content/types"
import type { Imagen } from "@/content/imagenes"

/**
 * Hero de página interior con foto a sangre (v1.6). La foto va detrás de un velo de tinta, más cargado del
 * lado del texto; el titular usa el acento lima. Sube por detrás de la barra como el hero oscuro del home.
 * Con varias fotos, se alternan despacio (ver FotosRotan). El texto y los botones entran escalonados.
 */
export function HeroFoto({
  eyebrow,
  posterTitle,
  posterAccent,
  supportLine,
  subhead,
  ctaPrimary,
  ctaSecondary,
  note,
  fotos,
  velo = "normal",
}: {
  eyebrow: string
  posterTitle: string
  posterAccent?: string
  /** Línea de apoyo debajo del titular, en la tipografía de títulos. */
  supportLine?: string
  subhead: string
  ctaPrimary: Cta
  ctaSecondary?: Cta
  note?: string
  fotos: Imagen[]
  /** "suave" para fotos que ya son oscuras del lado del texto (ondas de la paleta). */
  velo?: "normal" | "suave"
}) {
  return (
    <section className="bajo-nav relative overflow-hidden bg-ink text-paper">
      <FotosRotan fotos={fotos} />
      <div
        className={
          velo === "suave"
            ? "absolute inset-0 bg-gradient-to-r from-ink/55 via-ink/20 to-transparent"
            : "absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/70 to-ink/20"
        }
      />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink/70 to-transparent" />

      <div className="relative mx-auto flex min-h-[min(88vh,820px)] max-w-7xl flex-col justify-end px-6 pt-36 pb-16 md:px-20 md:pb-24">
        <p className="font-mono text-xs tracking-wider text-paper/70 uppercase">
          <ArrowText>{eyebrow}</ArrowText>
        </p>
        <div className="mt-6 max-w-4xl">
          <PosterHeading as="h1" size="md" accent={posterAccent} surface="foto" className="text-paper">
            {posterTitle}
          </PosterHeading>
        </div>
        {supportLine && (
          <p className="mt-5 max-w-2xl font-display text-xl text-balance text-paper">{supportLine}</p>
        )}
        <Aparece demora={0.35}>
          <p className="mt-6 max-w-2xl text-[18px] leading-[1.6] text-balance text-paper/80">{subhead}</p>
        </Aparece>

        <Aparece demora={0.5} className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <Link
            href={ctaPrimary.href}
            className="rounded-full bg-teal-ui-dark px-7 py-3 text-base font-bold text-on-brand transition-transform hover:-translate-y-0.5"
          >
            <ArrowText>{ctaPrimary.label}</ArrowText>
          </Link>
          {ctaSecondary && (
            <Link
              href={ctaSecondary.href}
              className="rounded-full border border-paper px-7 py-3 text-base font-bold text-paper transition-colors hover:bg-paper hover:text-ink"
            >
              <ArrowText>{ctaSecondary.label}</ArrowText>
            </Link>
          )}
        </Aparece>
        {note && <p className="mt-4 font-mono text-xs text-paper/60">{note}</p>}
      </div>
    </section>
  )
}
