"use client"

import { useLayoutEffect, useRef, useState, type ReactNode } from "react"
import { Geist } from "next/font/google"
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { Logo } from "@/components/logo"
import { cn } from "@/lib/utils"

/**
 * Piezas compartidas por las demos animadas de Central IA (DemoAgente, DemoPermisos): la tipografía de las
 * pantallas del producto (Geist, como en pen.dev), el escenario que se dibuja a tamaño fijo y se escala al ancho
 * disponible, los pasos que se marcan a la izquierda, el cursor y las ayudas del guion.
 */

export const producto = Geist({ subsets: ["latin"], display: "swap" })

export const CANCELADO = Symbol("cancelado")
/** El guion buscó un elemento que todavía no está en pantalla: se vuelve a empezar desde el principio. */
export const FALTA = Symbol("falta")

/** Corre el guion y, si se cortó por FALTA mientras el efecto sigue montado, lo vuelve a empezar. */
export function correrGuion(guion: () => Promise<void>, vivo: () => boolean) {
  guion().catch((e) => {
    if (e === FALTA && vivo()) return correrGuion(guion, vivo)
    if (e !== CANCELADO && e !== FALTA) throw e
  })
}

/** Medidas de diseño de la maqueta: completa y, debajo de `corte` px de ancho, compacta. */
export interface Medidas {
  completa: { w: number; h: number }
  compacta: { w: number; h: number }
}

export function useEscenario(medidas: Medidas, corte = 560) {
  const marcoRef = useRef<HTMLDivElement>(null)
  const escenarioRef = useRef<HTMLDivElement>(null)
  const reducir = useReducedMotion()
  const aLaVista = useInView(marcoRef, { amount: 0.35 })
  const [ancho, setAncho] = useState(0)
  const [pestanaVisible, setPestanaVisible] = useState(true)

  // Con la pestaña oculta el navegador no dibuja y las transiciones no terminan: la demo se pausa.
  useLayoutEffect(() => {
    const alCambiar = () => setPestanaVisible(document.visibilityState === "visible")
    alCambiar()
    document.addEventListener("visibilitychange", alCambiar)
    return () => document.removeEventListener("visibilitychange", alCambiar)
  }, [])
  const enPantalla = aLaVista && pestanaVisible

  useLayoutEffect(() => {
    const marco = marcoRef.current
    if (!marco) return
    const ro = new ResizeObserver(([e]) => setAncho(e.contentRect.width))
    ro.observe(marco)
    return () => ro.disconnect()
  }, [])

  const completa = !(ancho && ancho < corte)
  const { w, h } = completa ? medidas.completa : medidas.compacta
  const escala = ancho ? Math.min(1, ancho / w) : 0
  return { marcoRef, escenarioRef, reducir, enPantalla, completa, w, h, escala, medido: escala > 0 }
}

type Escenario = ReturnType<typeof useEscenario>

/** Caja que reserva el alto escalado y dibuja adentro la maqueta a tamaño de diseño. */
export function Marco({ esc, label, children }: { esc: Escenario; label: string; children: ReactNode }) {
  const { marcoRef, escenarioRef, w, h, escala, medido } = esc
  return (
    <div
      ref={marcoRef}
      role="img"
      aria-label={label}
      className="relative w-full"
      style={{ height: medido ? h * escala : undefined, aspectRatio: medido ? undefined : `${w} / ${h}` }}
    >
      {medido && (
        <div
          ref={escenarioRef}
          aria-hidden
          className={cn("absolute top-0 left-0 origin-top-left select-none", producto.className)}
          style={{ width: w, height: h, transform: `scale(${escala})` }}
        >
          {children}
        </div>
      )}
    </div>
  )
}

/**
 * Ayudas para escribir el guion dentro de un efecto. `vivo()` dice si el efecto sigue montado; cuando deja de
 * estarlo, `esperar` y `mover` cortan el guion con CANCELADO.
 */
export function ayudasDeGuion(opciones: {
  vivo: () => boolean
  escenario: () => HTMLElement | null
  w: number
  /** Anima el cursor (en la demo, el `animate` de useAnimate aplicado al elemento del cursor). */
  animar: (valores: Record<string, number>, transicion: { duration: number; ease?: [number, number, number, number] }) => unknown
}) {
  const { vivo, escenario, w, animar } = opciones
  const esperar = (ms: number) =>
    new Promise<void>((ok, mal) => setTimeout(() => (vivo() ? ok() : mal(CANCELADO)), ms))
  // Centro de un elemento, en coordenadas del escenario sin escalar.
  const centro = (el: HTMLElement | null) => {
    const esc = escenario()
    if (!esc || !el) throw FALTA
    const e = esc.getBoundingClientRect()
    const r = el.getBoundingClientRect()
    const k = e.width / w
    return { x: (r.left + r.width / 2 - e.left) / k, y: (r.top + r.height / 2 - e.top) / k }
  }
  const mover = async (destino: { x: number; y: number }, duracion: number) => {
    await animar(destino, { duration: duracion, ease: [0.45, 0, 0.2, 1] })
    if (!vivo()) throw CANCELADO
  }
  const ubicar = (valores: Record<string, number>) => animar(valores, { duration: 0 })
  const ocultar = () => animar({ opacity: 0 }, { duration: 0.4 })
  return { esperar, centro, mover, ubicar, ocultar }
}

/** Los pasos de la demo: en columna a la izquierda; en pantallas chicas, en fila arriba. */
export function Pasos({ pasos, actual }: { pasos: readonly { titulo: string; detalle: string }[]; actual: number }) {
  return (
    <ol className="grid grid-cols-3 gap-3 lg:flex lg:flex-col lg:gap-0">
      {pasos.map((paso, i) => {
        const activo = i === actual
        return (
          <li
            key={paso.titulo}
            className={cn(
              "border-t-2 pt-3 transition-colors duration-500 lg:border-t-0 lg:border-l-2 lg:py-4 lg:pl-5",
              activo ? "border-teal" : "border-line"
            )}
          >
            <span className={cn("font-mono text-[12px] tracking-[0.1em] transition-colors duration-500", activo ? "text-teal" : "text-ink-40")}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <p
              className={cn(
                "mt-1 font-display text-[18px] leading-[1.1] font-medium tracking-[-0.02em] transition-colors duration-500 lg:text-[28px]",
                activo ? "text-ink" : "text-ink-40"
              )}
            >
              {paso.titulo}
            </p>
            <p className={cn("mt-1.5 hidden text-[15px] leading-[1.45] transition-colors duration-500 lg:block", activo ? "text-ink-70" : "text-ink-40")}>
              {paso.detalle}
            </p>
          </li>
        )
      })}
    </ol>
  )
}

/** Pasos a la izquierda y maqueta a la derecha. */
export function Disposicion({ pasos, children, className }: { pasos: ReactNode; children: ReactNode; className?: string }) {
  return (
    <div className={cn("grid items-center gap-8 lg:grid-cols-[230px_minmax(0,1fr)] lg:gap-14", className)}>
      <div>{pasos}</div>
      {children}
    </div>
  )
}

/** Barra de arriba de la app (pantallas Chat y Brain del producto): logo, navegación y avatar. */
export function CabeceraProducto({
  completa,
  iniciales,
  outreachRef,
}: {
  completa: boolean
  iniciales: string
  /** Para que el cursor de la demo pueda ir al menú Outreach. */
  outreachRef?: React.RefObject<HTMLSpanElement | null>
}) {
  return (
    <div className="flex h-[56px] shrink-0 items-center gap-3 border-b border-[#ECEAE4] px-6">
      <Logo className="h-[22px] w-auto" />
      {completa && (
        <nav className="ml-3 flex items-center gap-5 text-[14px] text-[#5F5F5D]">
          <span>Chat</span>
          <span ref={outreachRef} className="flex items-center gap-1">
            Outreach <ChevronDown className="size-4" />
          </span>
          <span>Brain</span>
        </nav>
      )}
      <span className="ml-auto grid size-8 place-items-center rounded-full bg-[#1C1C1C]/[0.04] text-[12px] font-medium text-[#5F5F5D]">
        {iniciales}
      </span>
    </div>
  )
}

export function Aparece({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/** Puntero con la punta en (0,0); cada clic deja una onda. */
export function Cursor({ clics }: { clics: number }) {
  return (
    <div className="relative">
      <AnimatePresence>
        {clics > 0 && (
          <motion.span
            key={clics}
            className="absolute -top-4 -left-4 size-8 rounded-full bg-teal/35"
            initial={{ scale: 0.2, opacity: 1 }}
            animate={{ scale: 1.3, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>
      <svg width="22" height="26" viewBox="0 0 22 26" className="relative drop-shadow-[0_2px_3px_rgba(0,0,0,0.25)]">
        <path
          d="M1.5 1.5 L1.5 20 L6.4 15.6 L9.6 23 L12.9 21.6 L9.8 14.4 L16.4 14.2 Z"
          fill="#1C1C1C"
          stroke="white"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}
