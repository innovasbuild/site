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
  children: React.ReactNode
}

/** Sección estándar de página interior: kicker, titular póster y contenido. */
export function PageSection({ kicker, posterTitle, posterAccent, soft, width = "md", children }: PageSectionProps) {
  return (
    <section className={cn(soft && "border-y border-line bg-paper-soft")}>
      <div className={cn("mx-auto px-6 py-20", width === "lg" ? "max-w-6xl" : "max-w-4xl")}>
        <SectionKicker index={kicker.index} label={kicker.label} />
        <div className="mt-3">
          <PosterHeading size="sm" accent={posterAccent}>{posterTitle}</PosterHeading>
        </div>
        {children}
      </div>
    </section>
  )
}
