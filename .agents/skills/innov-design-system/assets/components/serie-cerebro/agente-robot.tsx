"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import { CAJA_CEREBRO, SILUETA, SURCOS, crearHalo, leerToken } from "@/components/red-cerebro"

/**
 * Agentes: un robotito minimalista de línea, con una mancha de color corrida en el cuerpo (como un
 * dibujo a mano) y la cabeza como una pantalla turquesa. Lo acompañan dos agentes más chicos, uno a cada lado. Adentro tiene un cerebrito de neón, con la misma forma
 * que el Brain, que se enciende fuerte de a ratos; cuando brilla, la antena también. Mientras tanto saluda con un brazo y
 * parpadea. Mismo lenguaje que el Brain: tinta, teal, lima, fondo de la tarjeta.
 * Con "reducir movimiento" queda quieto, con el cerebro prendido.
 */

const ANCHO = 200
const ALTO = 150
/** Cada cuántos segundos se ilumina el cerebrito. */
const PULSO = 3.2
/** Ventana de la cabeza donde va el cerebrito (lienzo de 200×150). */
const VENTANA = { x: 83, y: 31, w: 34, h: 26 }
const GROSOR = 1.6
/** El agente principal en el centro, saludando, y dos más chicos a los costados, cada uno con su ritmo. */
const EQUIPO = [
  { x: 28, escala: 0.55, desfase: 1.4, saluda: false },
  { x: 172, escala: 0.55, desfase: 2.3, saluda: false },
  { x: 100, escala: 0.92, desfase: 0, saluda: true },
]

export function AgenteRobot({ label, className }: { label: string; className?: string }) {
  const contRef = useRef<HTMLDivElement>(null)
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const cont = contRef.current
    const canvas = ref.current
    const ctx = canvas?.getContext("2d")
    if (!cont || !canvas || !ctx) return

    const reducir = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const tinta = leerToken(cont, "--color-ink")
    const teal = leerToken(cont, "--color-teal")
    const lima = leerToken(cont, "--color-lima")
    const papel = leerToken(cont, "--color-paper")
    const halo = crearHalo(leerToken(cont, "--color-teal-dark"))
    const siluetaPath = new Path2D(SILUETA)
    // Solo los surcos principales, para que en chico se lea simple.
    const surcosPath = SURCOS.slice(0, 3).map((d) => new Path2D(d))

    // El cerebro (caja de 163×124) entra en la ventana de la cabeza.
    const [bx, by, bw, bh] = CAJA_CEREBRO
    const k = Math.min(VENTANA.w / bw, VENTANA.h / bh)
    const cx = VENTANA.x + (VENTANA.w - bw * k) / 2 - bx * k
    const cy = VENTANA.y + (VENTANA.h - bh * k) / 2 - by * k

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

    const caja = (x: number, y: number, w: number, h: number, r: number) => {
      ctx.beginPath()
      ctx.roundRect(x, y, w, h, r)
    }

    /** Un robot en el lienzo de 200×150, ya ubicado. `s` es su escala, para que el trazo quede parejo. */
    const robot = (seg: number, saluda: boolean, s: number) => {
      const grosor = GROSOR / s
      // El cerebrito se ilumina suave de a ratos (sube, queda un momento y baja); la antena acompaña.
      const fase = (seg % PULSO) / PULSO
      const luz = reducir ? 1 : Math.sin(Math.min(1, fase / 0.55) * Math.PI) ** 2
      const listo = luz
      const saludo = reducir || !saluda ? 0 : Math.sin(seg * 3.2) * 0.22
      const parpadeo = !reducir && seg % 4.2 < 0.14 ? 0.15 : 1
      const flota = reducir ? 0 : Math.sin(seg * 1.6) * 1.2

      ctx.strokeStyle = tinta
      ctx.lineWidth = grosor

      // Piernas.
      ctx.beginPath()
      ctx.moveTo(91, 118)
      ctx.lineTo(89, 141)
      ctx.lineTo(83, 141)
      ctx.moveTo(109, 118)
      ctx.lineTo(111, 141)
      ctx.lineTo(117, 141)
      ctx.stroke()

      ctx.save()
      ctx.translate(0, flota)
      // Brazo que presenta (izquierda) y brazo que saluda (derecha), con manitos redondas.
      // Los que no saludan tienen los dos brazos iguales, abajo.
      ctx.beginPath()
      ctx.moveTo(80, 96)
      ctx.quadraticCurveTo(66, 106, 58, 94)
      ctx.stroke()
      ctx.beginPath()
      ctx.arc(56, 91, 3.2, 0, Math.PI * 2)
      ctx.stroke()
      if (saluda) {
        ctx.save()
        ctx.translate(120, 94)
        ctx.rotate(saludo)
        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.quadraticCurveTo(16, -2, 18, -20)
        ctx.stroke()
        ctx.beginPath()
        ctx.arc(18.5, -23.5, 3.2, 0, Math.PI * 2)
        ctx.stroke()
        ctx.restore()
      } else {
        ctx.beginPath()
        ctx.moveTo(120, 96)
        ctx.quadraticCurveTo(134, 106, 142, 94)
        ctx.stroke()
        ctx.beginPath()
        ctx.arc(144, 91, 3.2, 0, Math.PI * 2)
        ctx.stroke()
      }

      // Cuerpo: mancha lima corrida y contorno de tinta, con dos botoncitos.
      ctx.fillStyle = lima
      caja(85, 90, 40, 31, 7)
      ctx.fill()
      caja(80, 86, 40, 32, 7)
      ctx.stroke()
      ctx.fillStyle = tinta
      ctx.beginPath()
      ctx.arc(94, 102, 1.6, 0, Math.PI * 2)
      ctx.arc(100, 102, 1.6, 0, Math.PI * 2)
      ctx.fill()
      // Cuello.
      ctx.beginPath()
      ctx.moveTo(100, 79)
      ctx.lineTo(100, 86)
      ctx.stroke()

      // Cabeza de vidrio con el cerebrito adentro.
      // Pantalla turquesa (el teal de marca), donde el neón lima resalta.
      ctx.fillStyle = teal
      caja(70, 21, 60, 58, 13)
      ctx.fill()
      // Cerebrito de neón: trazo lima con resplandor, tenue en reposo y encendido fuerte en cada pulso.
      const intensidad = 0.45 + 0.55 * luz
      ctx.save()
      ctx.translate(cx, cy)
      ctx.scale(k, k)
      ctx.strokeStyle = lima
      ctx.shadowColor = lima
      // Dos pasadas: una ancha y difusa (el resplandor) y otra fina y nítida (el tubo).
      for (const [ancho, blur, alfa] of [
        [grosor * 2.2, 10 + 14 * luz, 0.35 * intensidad],
        [grosor * 0.9, 4 + 6 * luz, intensidad],
      ] as const) {
        ctx.shadowBlur = blur * escala * s
        ctx.globalAlpha = alfa
        ctx.lineWidth = ancho / k
        ctx.stroke(siluetaPath)
        for (const surco of surcosPath) ctx.stroke(surco)
      }
      ctx.restore()
      ctx.shadowBlur = 0
      ctx.globalAlpha = 1
      // Ojos: dos rayitas abajo de la ventana, que parpadean.
      ctx.fillStyle = papel
      caja(89, 68.5 + 1.5 * (1 - parpadeo), 6, 3 * parpadeo, 1.5)
      ctx.fill()
      caja(105, 68.5 + 1.5 * (1 - parpadeo), 6, 3 * parpadeo, 1.5)
      ctx.fill()
      // Antena con su nodo, que se prende en lima cuando el cerebro está listo.
      ctx.beginPath()
      ctx.moveTo(100, 21)
      ctx.lineTo(100, 12)
      ctx.stroke()
      if (listo > 0.02) {
        ctx.globalAlpha = listo * 0.9
        ctx.drawImage(halo, 100 - 11, 9 - 11, 22, 22)
        ctx.globalAlpha = 1
      }
      ctx.fillStyle = teal
      ctx.beginPath()
      ctx.arc(100, 9, 3.2, 0, Math.PI * 2)
      ctx.fill()
      if (listo > 0.02) {
        ctx.globalAlpha = listo
        ctx.fillStyle = lima
        ctx.beginPath()
        ctx.arc(100, 9, 2, 0, Math.PI * 2)
        ctx.fill()
        ctx.globalAlpha = 1
      }
      ctx.restore()
    }

    const dibujar = (seg: number) => {
      ctx.clearRect(0, 0, ancho, alto)
      ctx.save()
      ctx.translate(ox, oy)
      ctx.scale(escala, escala)
      ctx.lineCap = "round"
      ctx.lineJoin = "round"
      ctx.strokeStyle = tinta
      ctx.lineWidth = GROSOR
      // Un solo piso para el equipo.
      ctx.beginPath()
      ctx.moveTo(6, 142)
      ctx.lineTo(194, 142)
      ctx.stroke()
      // Cada uno parado sobre el piso en su lugar, con su propio ritmo (desfase en segundos).
      for (const r of EQUIPO) {
        ctx.save()
        ctx.translate(r.x, 142)
        ctx.scale(r.escala, r.escala)
        ctx.translate(-100, -142)
        robot(seg + r.desfase, r.saluda, r.escala)
        ctx.restore()
      }
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
