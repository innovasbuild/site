"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import { SILUETA, SURCOS, armarRed, crearHalo, estadoNodos, leerToken, pintarRed, planificar } from "@/components/red-cerebro"

/**
 * Brain: un cerebro que se va formando nodo por nodo sobre el fondo de la tarjeta. Arranca con un solo
 * nodo; de los que ya están crecen ramas, y en la punta de cada rama nace un nodo nuevo con un destello
 * (una idea que se prende), que después se conecta con sus vecinos. Así hasta que el cerebro queda armado.
 * Después se desarma suave y vuelve a empezar desde otro punto. El cursor ilumina los nodos que tiene cerca.
 * Colores: --color-teal (nodos), --color-ink (conexiones y surcos), --color-plum-dark (destello de neón lima).
 * Con "reducir movimiento" se muestra el cerebro prendido y quieto.
 */

const ANCHO = 200
const ALTO = 150
/** Tiempos del ciclo, en segundos: cuánto tarda en armarse, cuánto queda armado y cuánto tarda en apagarse. */
const ARMADO = 6.5
const MANTIENE = 5
const APAGA = 1.6
const RADIO_CURSOR = 26

export function CerebroRed({ label, className }: { label: string; className?: string }) {
  const contRef = useRef<HTMLDivElement>(null)
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const cont = contRef.current
    const canvas = ref.current
    const ctx = canvas?.getContext("2d")
    if (!cont || !canvas || !ctx) return

    const reducir = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const red = armarRed()
    const n = red.x.length
    const tinta = leerToken(cont, "--color-ink", "#15191A")
    const pintura = {
      tinta,
      teal: leerToken(cont, "--color-teal", "#0F6B60"),
      lima: leerToken(cont, "--color-plum-dark", "#D4F36B"),
      halo: crearHalo(leerToken(cont, "--color-plum-dark", "#D4F36B")),
      grosor: 1.1,
      radio: 1.1,
    }
    let plan = planificar(red, ARMADO)

    const cursor = { x: -999, y: -999 }
    const aparece = new Float32Array(n)
    const destello = new Float32Array(n)
    const brillo = new Float32Array(n)
    const siluetaPath = new Path2D(SILUETA)
    const surcosPath = SURCOS.map((d) => new Path2D(d))
    let ancho = 0
    let alto = 0
    let escala = 1
    let ox = 0
    let oy = 0
    const medir = () => {
      ancho = cont.clientWidth
      alto = cont.clientHeight
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      canvas.width = Math.ceil(ancho * dpr)
      canvas.height = Math.ceil(alto * dpr)
      escala = Math.min(ancho / ANCHO, alto / ALTO) * 0.94
      ox = (ancho - ANCHO * escala) / 2
      oy = (alto - ALTO * escala) / 2
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    medir()

    const dibujar = (seg: number) => {
      const ciclo = plan.fin + MANTIENE + APAGA
      const t = reducir ? plan.fin + 1 : seg % ciclo
      const apagando = reducir ? 0 : Math.max(0, (t - plan.fin - MANTIENE) / APAGA)
      estadoNodos(plan, t, apagando, aparece, destello)
      let armado = 0
      for (let i = 0; i < n; i++) {
        armado += aparece[i]
        // Al nacer destella; después queda prendido, titilando apenas. El cursor ilumina los cercanos.
        let b = aparece[i] * 0.15 + destello[i] * 0.85
        if (!reducir) b *= 0.9 + 0.1 * Math.sin(seg * 3 + i * 1.7)
        const dx = red.x[i] * escala + ox - cursor.x
        const dy = red.y[i] * escala + oy - cursor.y
        const cerca = aparece[i] * Math.max(0, 1 - Math.hypot(dx, dy) / (RADIO_CURSOR * escala))
        brillo[i] += (Math.min(1, b + cerca * 0.6) - brillo[i]) * (reducir ? 1 : 0.3)
      }
      armado /= n

      ctx.clearRect(0, 0, ancho, alto)
      ctx.save()
      ctx.translate(ox, oy)
      ctx.scale(escala, escala)
      ctx.lineCap = "round"
      // Contorno y surcos: aparecen a medida que el cerebro se arma.
      ctx.strokeStyle = tinta
      ctx.lineWidth = 1.6
      ctx.globalAlpha = 0.5 * armado * armado
      ctx.stroke(siluetaPath)
      ctx.lineWidth = 1.3
      ctx.globalAlpha = 0.45 * armado * armado
      for (const surco of surcosPath) ctx.stroke(surco)
      pintarRed(ctx, red, plan, t, apagando, aparece, brillo, pintura)
      ctx.restore()
    }

    let raf = 0
    let visible = false
    let inicio = 0
    let ultimaVuelta = 0
    const cuadro = (ms: number) => {
      raf = 0
      if (!visible) return
      if (!inicio) inicio = ms
      const seg = (ms - inicio) / 1000
      const vuelta = Math.floor(seg / (plan.fin + MANTIENE + APAGA))
      if (vuelta !== ultimaVuelta) {
        ultimaVuelta = vuelta
        plan = planificar(red, ARMADO)
      }
      dibujar(seg)
      if (!reducir) raf = requestAnimationFrame(cuadro)
    }
    const animar = () => {
      if (!raf && visible) raf = requestAnimationFrame(cuadro)
    }

    const ro = new ResizeObserver(() => {
      medir()
      animar()
    })
    ro.observe(cont)
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      animar()
    })
    io.observe(cont)

    const alMover = (e: PointerEvent) => {
      const r = cont.getBoundingClientRect()
      cursor.x = e.clientX - r.left
      cursor.y = e.clientY - r.top
    }
    const alSalir = () => {
      cursor.x = -999
      cursor.y = -999
    }
    if (!reducir) {
      cont.addEventListener("pointermove", alMover)
      cont.addEventListener("pointerleave", alSalir)
    }

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      cont.removeEventListener("pointermove", alMover)
      cont.removeEventListener("pointerleave", alSalir)
    }
  }, [])

  return (
    <div ref={contRef} role="img" aria-label={label} className={cn("relative aspect-[4/3] w-full", className)}>
      <canvas ref={ref} aria-hidden className="absolute inset-0 h-full w-full" />
    </div>
  )
}
