import { cn } from "@/lib/utils"
import { SectionKicker } from "@/components/section-kicker"
import { PosterHeading } from "@/components/poster-heading"

interface PageSectionProps {
  kicker: { index: string; label: string }
  posterTitle: string
  posterAccent?: string
  /** Fondo alterno, para separar secciones consecutivas. */
  soft?: boolean
  width?: "md" | "lg"
  /** Texto que va pegado al titular, en la misma columna. */
  intro?: React.ReactNode
  /** Dibujo al costado del titular y el intro; el resto del contenido va abajo, a todo el ancho. */
  aside?: React.ReactNode
  children?: React.ReactNode
}

/** Sección estándar de página interior: kicker, titular póster y contenido. */
export function PageSection({ kicker, posterTitle, posterAccent, soft, width = "md", intro, aside, children }: PageSectionProps) {
  const cabecera = (
    <>
      <SectionKicker index={kicker.index} label={kicker.label} />
      <div className="mt-3">
        <PosterHeading size="sm" accent={posterAccent}>{posterTitle}</PosterHeading>
      </div>
      {intro}
    </>
  )
  return (
    <section className={cn(soft && "border-y border-line bg-paper-soft")}>
      <div className={cn("mx-auto px-6 py-20", width === "lg" ? "max-w-6xl" : "max-w-4xl")}>
        {aside ? (
          <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_300px] md:items-center md:gap-14">
            <div>{cabecera}</div>
            <div className="mx-auto w-full max-w-[300px]">{aside}</div>
          </div>
        ) : (
          cabecera
        )}
        {children}
      </div>
    </section>
  )
}
