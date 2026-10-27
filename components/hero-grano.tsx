"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

/**
 * Granulado del hero: puntitos redondos del color teal luz sobre el fondo oscuro, casi ausentes a la
 * izquierda (donde está el texto) y más presentes hacia la derecha, donde no hay contenido.
 * Sin el cursor es una imagen quieta: cada grano tiene un lugar y un umbral fijos y un campo de densidad
 * con crestas (ruido deformado) decide cuáles se ven.
 * El cursor empuja cada punto por separado, como una mano que pasa por arena: los que están en su camino
 * salen despedidos un poco (cada uno con su masa) y vuelven solos a su lugar con un resorte amortiguado.
 * No aparecen puntos nuevos. Además, algunos granos se encienden de a ratos como neón lima y se apagan.
 * Con "reducir movimiento" el grano queda quieto y unos pocos quedan encendidos.
 * Colores: --color-teal-dark (grano) y --color-plum-dark (neón lima).
 */

/** Lado de cada celda (un grano por celda), en px CSS. */
const CELDA = 3
/** Radio del punto, en px CSS. */
const RADIO_PUNTO = 1.2
/** Cuánto se corre cada grano de su centro de celda, en px CSS (para que no se vea una grilla). */
const JITTER = 1
/** Cada cuántas celdas se calcula el campo de densidad (después se interpola). */
const PASO_CAMPO = 4
/** Niveles de opacidad con los que se agrupan los granos para dibujarlos por lotes. */
const NIVELES = 6
/** Momento del ruido que se dibuja: cambia la forma de las crestas. */
const SEMILLA = 2
/** Densidad máxima a la derecha (0–1) y opacidad máxima del grano (0–1). */
const DENSIDAD = 0.4
const OPACIDAD = 0.7
/** Qué tan gradual es el fundido de cada grano, en unidades de densidad. */
const FUNDIDO = 0.08

/** Empuje: radio de alcance del cursor (px), cuánto del movimiento del cursor recibe cada punto, y cuánto sale hacia afuera. */
const RADIO_EMPUJE = 90
const FUERZA = 1.4
const DISPERSION = 0.35
/** Velocidad máxima que puede tomar un punto (px/s). */
const VEL_MAX = 110
/** Resorte que lo devuelve a su lugar: rigidez y amortiguación (más rigidez = vuelve antes). */
const RIGIDEZ = 6
const AMORTIGUACION = 4
/** Neón: qué parte de los granos se enciende (como máximo cuántos), cuánto dura cada ciclo y cuánto brilla. */
const PROPORCION_NEON = 0.012
const MAX_NEON = 70
const CICLO_NEON: [number, number] = [3.5, 8]
const BRILLO_NEON = 9

const hash = (x: number, y: number) => {
  let h = (Math.imul(x, 374761393) + Math.imul(y, 668265263)) | 0
  h = Math.imul(h ^ (h >>> 13), 1274126177)
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295
}

const suave = (t: number) => t * t * (3 - 2 * t)

/** Ruido de valor 2D en [0, 1]. */
const ruido = (x: number, y: number) => {
  const xi = Math.floor(x)
  const yi = Math.floor(y)
  const xf = suave(x - xi)
  const yf = suave(y - yi)
  const a = hash(xi, yi)
  const b = hash(xi + 1, yi)
  const c = hash(xi, yi + 1)
  const d = hash(xi + 1, yi + 1)
  return a + (b - a) * xf + (c - a) * yf + (a - b - c + d) * xf * yf
}

const leerColor = (el: HTMLElement, token = "--color-teal-dark"): [number, number, number] => {
  const hex = getComputedStyle(el).getPropertyValue(token).trim()
  const m = /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(hex)
  return m ? [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)] : [92, 196, 176]
}

export function HeroGrano({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    const padre = canvas?.parentElement
    const ctx = canvas?.getContext("2d")
    if (!canvas || !padre || !ctx) return

    const reducir = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    let anchoPx = 0
    let altoPx = 0
    let ancho = 0
    let alto = 0
    let color = "rgb(92,196,176)"
    /** Por celda: nivel de opacidad (0 = apagado), posición de origen, desplazamiento, velocidad y masa. */
    let nivelDe = new Uint8Array(0)
    let homeX = new Float32Array(0)
    let homeY = new Float32Array(0)
    let dX = new Float32Array(0)
    let dY = new Float32Array(0)
    let vX = new Float32Array(0)
    let vY = new Float32Array(0)
    let masa = new Float32Array(0)
    /** Celdas encendidas (las únicas que se dibujan) y celdas en movimiento. */
    let visibles = new Int32Array(0)
    let enMovimiento = new Uint8Array(0)
    let activos: number[] = []
    let alfaNivel: number[] = []
    const lotesX: number[][] = Array.from({ length: NIVELES }, () => [])
    const lotesY: number[][] = Array.from({ length: NIVELES }, () => [])
    let raf = 0
    let previo = 0
    let visible = true
    let lima = "rgb(212,243,107)"
    /** Los granos quietos se pintan una vez en una capa aparte; solo se repintan si algo se movió. */
    const capa = document.createElement("canvas")
    const capaCtx = capa.getContext("2d")!
    let capaVieja = true
    /** Granos de neón: celda, período (s) y fase. */
    let neon: { c: number; periodo: number; fase: number }[] = []

    /** Genera los granos: campo de densidad con crestas, umbral y posición al azar por celda. */
    const generar = () => {
      anchoPx = padre.clientWidth
      altoPx = padre.clientHeight
      ancho = Math.ceil(anchoPx / CELDA)
      alto = Math.ceil(altoPx / CELDA)
      if (!ancho || !alto) {
        ancho = 0
        return
      }
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      canvas.width = capa.width = Math.ceil(anchoPx * dpr)
      canvas.height = capa.height = Math.ceil(altoPx * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      capaCtx.setTransform(dpr, 0, 0, dpr, 0, 0)
      capaVieja = true
      const [r, g, b] = leerColor(canvas)
      color = `rgb(${r},${g},${b})`
      const [lr, lg, lb] = leerColor(canvas, "--color-plum-dark")
      lima = `rgb(${lr},${lg},${lb})`
      // En pantallas angostas el texto ocupa todo el ancho: el grano baja para no tapar la lectura.
      const intensidad = anchoPx < 1024 ? 0.3 : 1

      const gx = Math.ceil(ancho / PASO_CAMPO) + 2
      const gy = Math.ceil(alto / PASO_CAMPO) + 2
      const campo = new Float32Array(gx * gy)
      const paso = PASO_CAMPO * CELDA
      for (let j = 0; j < gy; j++) {
        const y = j * paso
        const yn = Math.min(1, y / altoPx)
        for (let i = 0; i < gx; i++) {
          const x = i * paso
          const xn = Math.min(1, x / anchoPx)
          const pos = Math.min(1, Math.max(0, (xn * 0.9 + yn * 0.1 - 0.35) / 0.65))
          const base = 0.004 + DENSIDAD * Math.pow(suave(pos), 1.4)
          const wx = ruido(x * 0.003 + SEMILLA, y * 0.003 - SEMILLA * 0.6)
          const wy = ruido(x * 0.003 - SEMILLA * 0.8 + 7.3, y * 0.003 + SEMILLA + 2.1)
          const n = ruido(x * 0.006 + wx * 2.4 + SEMILLA * 1.3, y * 0.006 + wy * 2.4)
          const cresta = 1 - Math.abs(2 * n - 1)
          campo[j * gx + i] = base * (0.3 + 1.7 * cresta * cresta)
        }
      }

      const total = ancho * alto
      nivelDe = new Uint8Array(total)
      homeX = new Float32Array(total)
      homeY = new Float32Array(total)
      dX = new Float32Array(total)
      dY = new Float32Array(total)
      vX = new Float32Array(total)
      vY = new Float32Array(total)
      masa = new Float32Array(total)
      enMovimiento = new Uint8Array(total)
      activos = []
      alfaNivel = Array.from({ length: NIVELES }, (_, l) => (OPACIDAD * intensidad * (l + 1)) / NIVELES)
      const k = intensidad / FUNDIDO
      const tope = OPACIDAD * intensidad
      const lista: number[] = []
      for (let y = 0; y < alto; y++) {
        const fy = y / PASO_CAMPO
        const j = Math.floor(fy)
        const ty = fy - j
        for (let x = 0; x < ancho; x++) {
          const fx = x / PASO_CAMPO
          const i = Math.floor(fx)
          const tx = fx - i
          const p = j * gx + i
          const densidad =
            campo[p] * (1 - tx) * (1 - ty) + campo[p + 1] * tx * (1 - ty) + campo[p + gx] * (1 - tx) * ty + campo[p + gx + 1] * tx * ty
          const v = (densidad - Math.random()) * k
          if (v <= 0) continue
          const c = y * ancho + x
          nivelDe[c] = 1 + Math.min(NIVELES - 1, Math.floor((Math.min(v, tope) / tope) * NIVELES))
          homeX[c] = (x + 0.5) * CELDA + (Math.random() - 0.5) * 2 * JITTER
          homeY[c] = (y + 0.5) * CELDA + (Math.random() - 0.5) * 2 * JITTER
          masa[c] = 0.5 + Math.random() * 1.1
          lista.push(c)
        }
      }
      visibles = Int32Array.from(lista)
      // Elige al azar los granos que se van a encender como neón.
      const cuantos = Math.min(MAX_NEON, Math.round(lista.length * PROPORCION_NEON * intensidad))
      neon = Array.from({ length: cuantos }, () => ({
        c: lista[Math.floor(Math.random() * lista.length)],
        periodo: CICLO_NEON[0] + Math.random() * (CICLO_NEON[1] - CICLO_NEON[0]),
        fase: Math.random(),
      }))
    }

    const pintarCapa = () => {
      for (let l = 0; l < NIVELES; l++) {
        lotesX[l].length = 0
        lotesY[l].length = 0
      }
      for (let n = 0; n < visibles.length; n++) {
        const c = visibles[n]
        const l = nivelDe[c] - 1
        lotesX[l].push(homeX[c] + dX[c])
        lotesY[l].push(homeY[c] + dY[c])
      }
      capaCtx.clearRect(0, 0, anchoPx, altoPx)
      capaCtx.fillStyle = color
      for (let l = 0; l < NIVELES; l++) {
        const xs = lotesX[l]
        if (!xs.length) continue
        capaCtx.globalAlpha = alfaNivel[l]
        capaCtx.beginPath()
        for (let n = 0; n < xs.length; n++) {
          capaCtx.moveTo(xs[n] + RADIO_PUNTO, lotesY[l][n])
          capaCtx.arc(xs[n], lotesY[l][n], RADIO_PUNTO, 0, Math.PI * 2)
        }
        capaCtx.fill()
      }
      capaCtx.globalAlpha = 1
      capaVieja = false
    }

    /** Pinta el grano y, encima, los granos de neón que están encendidos en el segundo `seg`. */
    const dibujar = (seg: number) => {
      if (!ancho) return
      if (capaVieja) pintarCapa()
      ctx.clearRect(0, 0, anchoPx, altoPx)
      ctx.drawImage(capa, 0, 0, anchoPx, altoPx)
      ctx.fillStyle = lima
      ctx.shadowColor = lima
      for (const { c, periodo, fase } of neon) {
        // Se enciende suave, brilla un momento y se apaga; casi todo el ciclo queda apagado.
        const luz = reducir ? (fase > 0.6 ? 0.85 : 0) : Math.max(0, Math.sin(Math.PI * 2 * (seg / periodo + fase))) ** 6
        if (luz < 0.02) continue
        ctx.globalAlpha = luz
        ctx.shadowBlur = BRILLO_NEON * luz
        ctx.beginPath()
        ctx.arc(homeX[c] + dX[c], homeY[c] + dY[c], RADIO_PUNTO * 1.5, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.shadowBlur = 0
      ctx.globalAlpha = 1
    }

    /** Cada cuadro: avanza el resorte de los puntos que se movieron (cuando se asientan dejan de
     * actualizarse) y repinta. Corre mientras el hero está en pantalla, por el neón. */
    const paso = (ms: number) => {
      raf = 0
      if (!visible) {
        previo = 0
        return
      }
      const dt = previo ? Math.min(1 / 30, (ms - previo) / 1000) : 1 / 60
      previo = ms
      if (activos.length) capaVieja = true
      let w = 0
      for (let n = 0; n < activos.length; n++) {
        const c = activos[n]
        vX[c] += (-RIGIDEZ * dX[c] - AMORTIGUACION * vX[c]) * dt
        vY[c] += (-RIGIDEZ * dY[c] - AMORTIGUACION * vY[c]) * dt
        dX[c] += vX[c] * dt
        dY[c] += vY[c] * dt
        if (Math.abs(dX[c]) + Math.abs(dY[c]) + Math.abs(vX[c]) + Math.abs(vY[c]) < 0.05) {
          dX[c] = dY[c] = vX[c] = vY[c] = 0
          enMovimiento[c] = 0
        } else {
          activos[w++] = c
        }
      }
      activos.length = w
      dibujar(ms / 1000)
      raf = requestAnimationFrame(paso)
    }
    const animar = () => {
      if (!raf && visible && !reducir) raf = requestAnimationFrame(paso)
    }

    /** El cursor empuja los puntos cercanos. `mx` y `my` son su movimiento en px CSS. */
    const empujar = (cx: number, cy: number, mx: number, my: number) => {
      const mov = Math.hypot(mx, my)
      if (!ancho || mov < 0.5) return
      const x0 = Math.max(0, Math.floor((cx - RADIO_EMPUJE) / CELDA))
      const x1 = Math.min(ancho - 1, Math.ceil((cx + RADIO_EMPUJE) / CELDA))
      const y0 = Math.max(0, Math.floor((cy - RADIO_EMPUJE) / CELDA))
      const y1 = Math.min(alto - 1, Math.ceil((cy + RADIO_EMPUJE) / CELDA))
      for (let y = y0; y <= y1; y++) {
        for (let x = x0; x <= x1; x++) {
          const c = y * ancho + x
          if (!nivelDe[c]) continue
          const ddx = homeX[c] + dX[c] - cx
          const ddy = homeY[c] + dY[c] - cy
          const dist = Math.hypot(ddx, ddy)
          if (dist >= RADIO_EMPUJE) continue
          const f = (1 - dist / RADIO_EMPUJE) ** 2
          const q = (f * FUERZA) / masa[c]
          // Sale en la dirección del cursor y un poco hacia afuera, con un desvío propio de cada punto.
          const afuera = dist > 0.01 ? (DISPERSION * mov) / dist : 0
          const azar = (Math.random() - 0.5) * 0.6 * mov
          vX[c] = Math.max(-VEL_MAX, Math.min(VEL_MAX, vX[c] + q * mx + f * afuera * ddx + f * azar))
          vY[c] = Math.max(-VEL_MAX, Math.min(VEL_MAX, vY[c] + q * my + f * afuera * ddy - f * azar))
          if (!enMovimiento[c]) {
            enMovimiento[c] = 1
            activos.push(c)
          }
        }
      }
      animar()
    }

    generar()
    dibujar(0)
    const ro = new ResizeObserver(() => {
      generar()
      dibujar(performance.now() / 1000)
    })
    ro.observe(padre)
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      animar()
    })
    io.observe(padre)

    let ultimoX = NaN
    let ultimoY = NaN
    const alMover = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect()
      const cx = e.clientX - r.left
      const cy = e.clientY - r.top
      if (!Number.isNaN(ultimoX)) empujar(cx, cy, cx - ultimoX, cy - ultimoY)
      ultimoX = cx
      ultimoY = cy
    }
    const alSalir = () => {
      ultimoX = NaN
      ultimoY = NaN
    }
    if (!reducir) {
      padre.addEventListener("pointermove", alMover)
      padre.addEventListener("pointerleave", alSalir)
    }

    return () => {
      padre.removeEventListener("pointermove", alMover)
      padre.removeEventListener("pointerleave", alSalir)
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
    }
  }, [])

  return <canvas ref={ref} aria-hidden className={cn("pointer-events-none absolute inset-0 h-full w-full", className)} />
}
