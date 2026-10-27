"use client"

import { useEffect, useRef, useState } from "react"
import { useInView, useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Foto } from "@/components/foto"
import type { Imagen } from "@/content/imagenes"

/**
 * Fondo de fotos que se alternan con un fundido lento; la que está a la vista se aleja apenas mientras dura.
 * Solo avanza en pantalla y queda quieta con "reducir movimiento". Abajo a la derecha, una rayita por foto
 * con su progreso. Con una sola foto es una foto quieta con el acercamiento de entrada.
 */
export function FotosRotan({ fotos, duracion = 6500, className }: { fotos: Imagen[]; duracion?: number; className?: string }) {
  const [activa, setActiva] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const visible = useInView(ref, { amount: 0.2 })
  const reduce = useReducedMotion()
  const corre = visible && !reduce && fotos.length > 1

  useEffect(() => {
    if (!corre) return
    const t = setTimeout(() => setActiva((a) => (a + 1) % fotos.length), duracion)
    return () => clearTimeout(t)
  }, [corre, activa, fotos.length, duracion])

  return (
    <div ref={ref} className={cn("absolute inset-0", !corre && "pausado", className)}>
      {fotos.map((foto, i) => (
        <Foto
          key={foto.src}
          imagen={foto}
          prioridad={i === 0}
          className={cn("absolute inset-0 transition-opacity duration-[1600ms]", i === activa ? "opacity-100" : "opacity-0")}
          imgClassName={i === activa ? "animate-[acercar_9s_var(--ease)_both]" : undefined}
        />
      ))}
      {fotos.length > 1 && (
        <div className="absolute right-6 bottom-6 z-20 flex gap-2 md:right-20 md:bottom-10" aria-hidden>
          {fotos.map((foto, i) => (
            <span key={foto.src} className="block h-[2px] w-10 overflow-hidden bg-paper/25">
              {i === activa && (
                <span
                  key={`${activa}-${corre}`}
                  className="barra-progreso block h-full bg-lima"
                  style={{ ["--dur-paso" as string]: `${duracion}ms` }}
                />
              )}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
