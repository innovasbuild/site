/**
 * Red de nodos con forma de cerebro, compartida por las ilustraciones de B + C (el Brain y el cerebrito de
 * los agentes). La red crece nodo por nodo: de los que ya están salen ramas y en la punta de cada rama nace
 * un nodo nuevo con un destello lima, que después se conecta con sus vecinos.
 * Todo está en el lienzo del cerebro (200×150); quien dibuja decide escala y posición.
 */

/** Contorno del cerebro de perfil, tomado de una referencia anatómica: frontal a la izquierda, temporal
 * abajo, cerebelo y tronco abajo a la derecha. Se suaviza con Catmull-Rom. */
const CONTORNO: [number, number][] = [
  [22.7, 69.4], [30.8, 42.4], [47, 26.2], [66.8, 17.2], [92, 12.7], [119, 13.6], [142.4, 20.8], [162.2, 35.2],
  [174.8, 53.2], [181.1, 67.6], [178.4, 85.6], [169.4, 100], [167.6, 110.8], [160.4, 123.4], [144.2, 129.7],
  [124.4, 128.8], [113.6, 123.4], [110, 125.2], [108.2, 134.2], [99.2, 134.2], [97.4, 121.6], [88.4, 116.2],
  [72.2, 110.8], [57.8, 103.6], [52.4, 92.8], [39.8, 89.2], [27.2, 83.8],
]

/** Curva suave cerrada que pasa por los puntos (Catmull-Rom convertida a cúbicas). */
function curvaCerrada(pts: [number, number][]) {
  const n = pts.length
  let d = `M${pts[0][0]} ${pts[0][1]}`
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n]
    const p1 = pts[i]
    const p2 = pts[(i + 1) % n]
    const p3 = pts[(i + 2) % n]
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6]
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6]
    d += `C${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${p2[0]} ${p2[1]}`
  }
  return `${d}Z`
}

export const SILUETA = curvaCerrada(CONTORNO)
/** Caja del cerebro dentro del lienzo de 200×150: x, y, ancho, alto. */
export const CAJA_CEREBRO = [20, 12, 163, 124] as const
/** Surcos principales: fisura lateral, surco central, límite del cerebelo, pliegues y líneas del cerebelo. */
export const SURCOS = [
  "M58 95C78 86 98 78 121 69",
  "M110 14C106 33 101 52 97 70",
  "M113 111C132 104 150 101 169 101",
  "M56 46C62 57 66 67 66 79",
  "M137 31C139 43 143 53 146 64",
  "M80 20C82 32 80 42 76 51",
  "M121 121C135 116 150 113 164 112",
  "M128 127C140 124 150 121 160 118",
]

/** Cuánto tarda en crecer cada rama y en sumarse cada conexión extra (s). */
export const RAMA = 0.45
export const CONEXION = 0.4

/** Generador pseudoaleatorio con semilla, para que la red sea siempre la misma. */
function azar(semilla: number) {
  let s = semilla
  return () => {
    s = (s * 16807) % 2147483647
    return s / 2147483647
  }
}

export interface Red {
  x: Float32Array
  y: Float32Array
  r: Float32Array
  vecinos: number[][]
  aristas: [number, number][]
  /** Cuánto se curva cada rama hacia un costado. */
  curva: Float32Array
}

/** Arma la red: nodos sobre el contorno y repartidos adentro, conectados con sus vecinos cercanos. */
export function armarRed({ separacion = 10.5, alcance = 18, maxConexiones = 4, semilla = 7 } = {}): Red {
  const rnd = azar(semilla)
  const molde = document.createElement("canvas").getContext("2d")!
  const silueta = new Path2D(SILUETA)
  const xs: number[] = []
  const ys: number[] = []
  const lejos = (x: number, y: number, min: number) => xs.every((px, i) => (px - x) ** 2 + (ys[i] - y) ** 2 >= min * min)

  // Nodos sobre el contorno, para que la silueta se lea clara.
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path")
  path.setAttribute("d", SILUETA)
  svg.appendChild(path)
  svg.style.position = "absolute"
  svg.style.visibility = "hidden"
  document.body.appendChild(svg)
  const largo = path.getTotalLength()
  for (let l = 0; l < largo; l += separacion * 1.05) {
    const p = path.getPointAtLength(l)
    if (lejos(p.x, p.y, separacion * 0.9)) {
      xs.push(p.x)
      ys.push(p.y)
    }
  }
  svg.remove()

  // Relleno con separación mínima (dardos al azar).
  const [bx, by, bw, bh] = CAJA_CEREBRO
  for (let intento = 0; intento < 6000; intento++) {
    const x = bx + rnd() * bw
    const y = by + rnd() * bh
    if (molde.isPointInPath(silueta, x, y) && lejos(x, y, separacion)) {
      xs.push(x)
      ys.push(y)
    }
  }

  const n = xs.length
  const vecinos: number[][] = Array.from({ length: n }, () => [])
  const aristas: [number, number][] = []
  for (let i = 0; i < n; i++) {
    const cerca = xs
      .map((x, j) => [j, (x - xs[i]) ** 2 + (ys[j] - ys[i]) ** 2] as const)
      .filter(([j, d]) => j !== i && d < alcance * alcance)
      .sort((a, b) => a[1] - b[1])
      .slice(0, maxConexiones)
    for (const [j] of cerca) {
      if (vecinos[i].includes(j)) continue
      // La conexión no puede salirse de la silueta (por ejemplo, cruzar el hueco del tronco).
      const mx = (xs[i] + xs[j]) / 2
      const my = (ys[i] + ys[j]) / 2
      if (!molde.isPointInPath(silueta, mx, my) && !molde.isPointInStroke(silueta, mx, my)) continue
      vecinos[i].push(j)
      vecinos[j].push(i)
      aristas.push([i, j])
    }
  }
  const r = Float32Array.from({ length: n }, () => {
    const t = rnd()
    return t > 0.85 ? 3.2 : t > 0.55 ? 2.4 : 1.7
  })
  const curva = Float32Array.from({ length: n }, () => (rnd() - 0.5) * 0.5)
  return { x: Float32Array.from(xs), y: Float32Array.from(ys), r, vecinos, aristas, curva }
}

export interface Plan {
  /** Cuándo empieza a crecer la rama de cada nodo; el nodo nace cuando la rama llega (+ RAMA). */
  prende: Float32Array
  /** De qué nodo sale la rama que trae a cada uno (-1 para el primero). */
  padre: Int32Array
  /** Cuándo termina de armarse todo. */
  fin: number
}

/** Orden de crecimiento desde un nodo al azar: de a uno, primero lento y después más rápido, en `armado` segundos. */
export function planificar(red: Red, armado: number): Plan {
  const n = red.x.length
  const prende = new Float32Array(n)
  const padre = new Int32Array(n).fill(-1)
  const orden: number[] = []
  const visto = new Uint8Array(n)
  const inicio = Math.floor(Math.random() * n)
  visto[inicio] = 1
  orden.push(inicio)
  for (let k = 0; k < orden.length; k++) {
    const vecinos = [...red.vecinos[orden[k]]].sort(() => Math.random() - 0.5)
    for (const j of vecinos) {
      if (!visto[j]) {
        visto[j] = 1
        padre[j] = orden[k]
        orden.push(j)
      }
    }
  }
  for (let i = 0; i < n; i++) if (!visto[i]) orden.push(i)
  orden.forEach((i, k) => (prende[i] = armado * (k / n) ** 0.8))
  return { prende, padre, fin: armado + RAMA + CONEXION }
}

export const sale = (x: number) => 1 - (1 - x) ** 3

/** Cuánto apareció cada nodo (0–1) y cuánto destella (0–1) en el momento `t`. */
export function estadoNodos(plan: Plan, t: number, apagando: number, aparece: Float32Array, destello: Float32Array) {
  for (let i = 0; i < aparece.length; i++) {
    aparece[i] = sale(Math.min(1, Math.max(0, (t - plan.prende[i] - RAMA) / 0.25))) * (1 - apagando)
    destello[i] = aparece[i] * Math.max(0, 1 - Math.abs(t - plan.prende[i] - RAMA - 0.1) / 0.5)
  }
}

/** Halo radial precalculado del color dado. */
export function crearHalo(color: string) {
  const halo = document.createElement("canvas")
  halo.width = halo.height = 64
  const h = halo.getContext("2d")!
  const g = h.createRadialGradient(32, 32, 0, 32, 32, 32)
  g.addColorStop(0, color)
  g.addColorStop(0.3, `${color}66`)
  g.addColorStop(1, `${color}00`)
  h.fillStyle = g
  h.fillRect(0, 0, 64, 64)
  return halo
}

export interface Pintura {
  tinta: string
  teal: string
  lima: string
  halo: HTMLCanvasElement
  /** Grosor de las ramas y multiplicador del radio de los nodos, en unidades del lienzo del cerebro. */
  grosor?: number
  radio?: number
}

/** Pinta ramas y nodos en el contexto, que ya tiene que estar en coordenadas del lienzo del cerebro. */
export function pintarRed(
  ctx: CanvasRenderingContext2D,
  red: Red,
  plan: Plan,
  t: number,
  apagando: number,
  aparece: Float32Array,
  brillo: Float32Array,
  { tinta, teal, lima, halo, grosor = 0.8, radio = 1 }: Pintura,
) {
  const { prende, padre } = plan
  ctx.lineCap = "round"
  // Ramas: la que trae a cada nodo crece desde su padre; las demás conexiones se suman cuando el nodo ya nació.
  ctx.lineWidth = grosor
  ctx.strokeStyle = tinta
  for (const [a, b] of red.aristas) {
    const [p, q] = prende[a] <= prende[b] ? [a, b] : [b, a]
    const esRama = padre[q] === p
    const desde = esRama ? prende[q] : prende[q] + RAMA
    const largo = sale(Math.min(1, Math.max(0, (t - desde) / (esRama ? RAMA : CONEXION)))) * (1 - apagando)
    if (largo <= 0.01) continue
    ctx.globalAlpha = esRama ? 0.6 : 0.4
    // Curva cuadrática con el punto de control corrido hacia un costado, cortada en "largo" (De Casteljau).
    const x0 = red.x[p]
    const y0 = red.y[p]
    const x1 = red.x[q]
    const y1 = red.y[q]
    const cx = (x0 + x1) / 2 - (y1 - y0) * red.curva[q]
    const cy = (y0 + y1) / 2 + (x1 - x0) * red.curva[q]
    const ax = x0 + (cx - x0) * largo
    const ay = y0 + (cy - y0) * largo
    const bx = cx + (x1 - cx) * largo
    const by = cy + (y1 - cy) * largo
    ctx.beginPath()
    ctx.moveTo(x0, y0)
    ctx.quadraticCurveTo(ax, ay, ax + (bx - ax) * largo, ay + (by - ay) * largo)
    ctx.stroke()
  }
  // Nodos: nacen en la punta de su rama en teal, con un destello lima y halo.
  for (let i = 0; i < red.x.length; i++) {
    const a = aparece[i]
    if (a < 0.02) continue
    const r = red.r[i] * radio * a
    const x = red.x[i]
    const y = red.y[i]
    const k = brillo[i]
    if (k > 0.05) {
      ctx.globalAlpha = k * 0.9
      ctx.drawImage(halo, x - r * 4, y - r * 4, r * 8, r * 8)
    }
    ctx.globalAlpha = a
    ctx.fillStyle = teal
    ctx.beginPath()
    ctx.arc(x, y, r, 0, Math.PI * 2)
    ctx.fill()
    if (k > 0.05) {
      ctx.globalAlpha = k
      ctx.fillStyle = lima
      ctx.beginPath()
      ctx.arc(x, y, r * 0.62, 0, Math.PI * 2)
      ctx.fill()
    }
  }
  ctx.globalAlpha = 1
}

export const leerToken = (el: HTMLElement, token: string, respaldo: string) =>
  getComputedStyle(el).getPropertyValue(token).trim() || respaldo
