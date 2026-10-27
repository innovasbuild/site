"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import { CAJA_CEREBRO, SILUETA, SURCOS, leerToken } from "@/components/red-cerebro"

/**
 * Herramientas: cuatro herramientas (correo, datos, agenda y reportes) dibujadas en línea, como fichas con
 * una mancha lima corrida, que se enchufan de a una al cerebro con un cable. Al enchufarse, la ficha se
 * enciende, el cerebro destella en neón lima y por el cable empiezan a viajar datos. Cuando están todas,
 * esperan un rato, se desenchufan y vuelve a empezar. Mismo lenguaje que el Brain y el agente.
 * Con "reducir movimiento" se ven todas enchufadas y quietas.
 */

const ANCHO = 200
const ALTO = 150
const GROSOR = 1.6
/** Caja donde va el cerebro, abajo al centro. */
const CEREBRO = { x: 54, y: 70, w: 92, h: 70 }
/** Tiempos, en segundos: separación entre herramientas, cuánto tarda el cable, cuánto quedan todas y cuánto tardan en irse. */
const ENTRE = 1.3
const CABLE = 0.9
const MANTIENE = 4
const APAGA = 0.8

type Glifo = "correo" | "datos" | "agenda" | "reportes"
/** Fichas: centro en x, glifo y punto del cerebro (en su propio lienzo de 200×150) donde se enchufa. */
const FICHAS: { x: number; glifo: Glifo; enchufe: [number, number] }[] = [
  { x: 34, glifo: "correo", enchufe: [55, 30] },
  { x: 78, glifo: "datos", enchufe: [90, 14] },
  { x: 122, glifo: "agenda", enchufe: [125, 15] },
  { x: 166, glifo: "reportes", enchufe: [158, 36] },
]
const FICHA = { y: 8, w: 28, h: 24, r: 6 }

const sale = (x: number) => 1 - (1 - x) ** 3
const entre = (x: number) => Math.min(1, Math.max(0, x))

export function HerramientasEnchufe({ label, className }: { label: string; className?: string }) {
  const contRef = useRef<HTMLDivElement>(null)
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const cont = contRef.current
    const canvas = ref.current
    const ctx = canvas?.getContext("2d")
    if (!cont || !canvas || !ctx) return

    const reducir = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const tinta = leerToken(cont, "--color-ink", "#15191A")
    const teal = leerToken(cont, "--color-teal", "#0F6B60")
    const lima = leerToken(cont, "--color-plum-dark", "#D4F36B")
    const siluetaPath = new Path2D(SILUETA)
    const surcosPath = SURCOS.slice(0, 3).map((d) => new Path2D(d))

    // El cerebro (caja de 163×124 en su lienzo) entra en CEREBRO.
    const [bx, by, bw, bh] = CAJA_CEREBRO
    const k = Math.min(CEREBRO.w / bw, CEREBRO.h / bh)
    const cbx = CEREBRO.x + (CEREBRO.w - bw * k) / 2 - bx * k
    const cby = CEREBRO.y + (CEREBRO.h - bh * k) / 2 - by * k

    // Cada cable es una cúbica desde abajo de la ficha hasta su punto del cerebro.
    const cables = FICHAS.map((f) => {
      const ex = cbx + f.enchufe[0] * k
      const ey = cby + f.enchufe[1] * k
      const sx = f.x
      const sy = FICHA.y + FICHA.h + 1
      return [sx, sy, sx, sy + 20, ex, ey - 22, ex, ey - 6] as const
    })
    const enCable = (c: readonly number[], t: number): [number, number] => {
      const u = 1 - t
      return [
        u * u * u * c[0] + 3 * u * u * t * c[2] + 3 * u * t * t * c[4] + t * t * t * c[6],
        u * u * u * c[1] + 3 * u * u * t * c[3] + 3 * u * t * t * c[5] + t * t * t * c[7],
      ]
    }

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
      escala = Math.min(ancho / ANCHO, alto / ALTO)
      ox = (ancho - ANCHO * escala) / 2
      oy = (alto - ALTO * escala) / 2
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    medir()

    const glifo = (g: Glifo, x: number, y: number) => {
      ctx.beginPath()
      if (g === "correo") {
        ctx.rect(x - 6, y - 4, 12, 8)
        ctx.moveTo(x - 6, y - 4)
        ctx.lineTo(x, y + 0.5)
        ctx.lineTo(x + 6, y - 4)
      } else if (g === "datos") {
        ctx.ellipse(x, y - 3.5, 5.5, 2, 0, 0, Math.PI * 2)
        ctx.moveTo(x - 5.5, y - 3.5)
        ctx.lineTo(x - 5.5, y + 3.5)
        ctx.ellipse(x, y + 3.5, 5.5, 2, 0, Math.PI, 0, true)
        ctx.lineTo(x + 5.5, y - 3.5)
      } else if (g === "agenda") {
        ctx.roundRect(x - 6, y - 4.5, 12, 10, 1.5)
        ctx.moveTo(x - 6, y - 1)
        ctx.lineTo(x + 6, y - 1)
        ctx.moveTo(x - 3, y - 6.5)
        ctx.lineTo(x - 3, y - 3.5)
        ctx.moveTo(x + 3, y - 6.5)
        ctx.lineTo(x + 3, y - 3.5)
      } else {
        ctx.moveTo(x - 5, y + 5)
        ctx.lineTo(x - 5, y + 1)
        ctx.moveTo(x, y + 5)
        ctx.lineTo(x, y - 4)
        ctx.moveTo(x + 5, y + 5)
        ctx.lineTo(x + 5, y - 1)
      }
      ctx.stroke()
    }

    const dibujar = (seg: number) => {
      const llenas = (FICHAS.length - 1) * ENTRE + CABLE
      const ciclo = llenas + MANTIENE + APAGA
      const t = reducir ? llenas + 1 : seg % ciclo
      const apagando = reducir ? 0 : entre((t - llenas - MANTIENE) / APAGA)

      ctx.clearRect(0, 0, ancho, alto)
      ctx.save()
      ctx.translate(ox, oy)
      ctx.scale(escala, escala)
      ctx.lineCap = "round"
      ctx.lineJoin = "round"

      // Cuánto avanzó cada cable y cuánto destella el cerebro (cada enchufe suma un destello).
      const avance = FICHAS.map((_, i) => sale(entre((t - i * ENTRE) / CABLE)) * (1 - apagando))
      let destello = 0
      let enchufadas = 0
      FICHAS.forEach((_, i) => {
        const llega = i * ENTRE + CABLE
        if (t >= llega) enchufadas++
        destello = Math.max(destello, Math.max(0, 1 - Math.abs(t - llega - 0.15) / 0.5))
      })
      const brilloBase = (enchufadas / FICHAS.length) * 0.6 * (1 - apagando)
      const luz = Math.min(1, brilloBase + destello * (1 - apagando))

      // Cerebro: relleno teal suave, y el neón lima que se enciende con los enchufes.
      ctx.save()
      ctx.translate(cbx, cby)
      ctx.scale(k, k)
      ctx.fillStyle = teal
      ctx.globalAlpha = 0.1
      ctx.fill(siluetaPath)
      ctx.globalAlpha = 1
      ctx.strokeStyle = tinta
      ctx.lineWidth = GROSOR / k
      ctx.stroke(siluetaPath)
      ctx.lineWidth = (GROSOR * 0.8) / k
      for (const s of surcosPath) ctx.stroke(s)
      if (luz > 0.02) {
        ctx.strokeStyle = lima
        ctx.shadowColor = lima
        for (const [w, blur, alfa] of [
          [GROSOR * 2.4, 10 + 12 * luz, 0.4 * luz],
          [GROSOR * 0.9, 4 + 6 * luz, luz],
        ] as const) {
          ctx.shadowBlur = blur * escala
          ctx.globalAlpha = alfa
          ctx.lineWidth = w / k
          ctx.stroke(siluetaPath)
          for (const s of surcosPath) ctx.stroke(s)
        }
        ctx.shadowBlur = 0
        ctx.globalAlpha = 1
      }
      ctx.restore()

      FICHAS.forEach((f, i) => {
        const c = cables[i]
        const a = avance[i]
        const conectada = a >= 0.999
        // Cable: se dibuja desde la ficha hasta el cerebro.
        if (a > 0.01) {
          ctx.strokeStyle = tinta
          ctx.lineWidth = GROSOR * 0.75
          ctx.globalAlpha = 0.7
          ctx.beginPath()
          ctx.moveTo(c[0], c[1])
          const pasos = 28
          for (let p = 1; p <= pasos * a; p++) {
            const [x, y] = enCable(c, p / pasos)
            ctx.lineTo(x, y)
          }
          ctx.stroke()
          // Ficha del enchufe en la punta, con sus dos patitas hacia el cerebro.
          const [px, py] = enCable(c, a)
          ctx.globalAlpha = 1
          ctx.fillStyle = conectada ? lima : "#ffffff00"
          ctx.beginPath()
          ctx.roundRect(px - 3, py - 3, 6, 5, 1.2)
          if (conectada) ctx.fill()
          ctx.stroke()
          ctx.beginPath()
          ctx.moveTo(px - 1.3, py + 2)
          ctx.lineTo(px - 1.3, py + 4.5)
          ctx.moveTo(px + 1.3, py + 2)
          ctx.lineTo(px + 1.3, py + 4.5)
          ctx.stroke()
          // Datos viajando por el cable hacia el cerebro.
          if (conectada && !reducir) {
            const viaje = ((t - (i * ENTRE + CABLE)) * 0.7) % 1
            const [dx, dy] = enCable(c, viaje)
            ctx.fillStyle = lima
            ctx.shadowColor = lima
            ctx.shadowBlur = 6 * escala
            ctx.globalAlpha = Math.sin(viaje * Math.PI) * (1 - apagando)
            ctx.beginPath()
            ctx.arc(dx, dy, 1.9, 0, Math.PI * 2)
            ctx.fill()
            ctx.shadowBlur = 0
            ctx.globalAlpha = 1
          }
        }
        // Ficha de la herramienta: se enciende (mancha lima) cuando queda enchufada.
        const x = f.x - FICHA.w / 2
        const encendida = entre((t - i * ENTRE - CABLE) / 0.3) * (1 - apagando)
        if (encendida > 0.01) {
          ctx.globalAlpha = encendida
          ctx.fillStyle = lima
          ctx.beginPath()
          ctx.roundRect(x + 3, FICHA.y + 3, FICHA.w, FICHA.h, FICHA.r)
          ctx.fill()
          ctx.globalAlpha = 1
        }
        ctx.strokeStyle = tinta
        ctx.lineWidth = GROSOR
        ctx.beginPath()
        ctx.roundRect(x, FICHA.y, FICHA.w, FICHA.h, FICHA.r)
        ctx.stroke()
        ctx.lineWidth = GROSOR * 0.8
        glifo(f.glifo, f.x, FICHA.y + FICHA.h / 2)
      })
      ctx.restore()
    }

    let raf = 0
    let visible = false
    let inicio = 0
    const cuadro = (ms: number) => {
      raf = 0
      if (!visible) return
      if (!inicio) inicio = ms
      dibujar((ms - inicio) / 1000)
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

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
    }
  }, [])

  return (
    <div ref={contRef} role="img" aria-label={label} className={cn("relative aspect-[4/3] w-full", className)}>
      <canvas ref={ref} aria-hidden className="absolute inset-0 h-full w-full" />
    </div>
  )
}
