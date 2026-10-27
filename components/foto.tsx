import { cn } from "@/lib/utils"
import type { Imagen } from "@/content/imagenes"

/**
 * Foto con el tratamiento común del sitio (color apenas bajado y grano, ver `.foto` en globals.css).
 * El contenedor define el tamaño; la imagen lo cubre.
 */
export function Foto({
  imagen,
  className,
  imgClassName,
  prioridad = false,
  children,
}: {
  imagen: Imagen
  className?: string
  imgClassName?: string
  prioridad?: boolean
  children?: React.ReactNode
}) {
  return (
    <div className={cn("foto", imagen.natural && "foto-natural", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imagen.src}
        alt={imagen.alt}
        loading={prioridad ? "eager" : "lazy"}
        decoding="async"
        className={imgClassName}
      />
      {children}
    </div>
  )
}
