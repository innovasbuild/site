"use client"

import { useEffect, useRef, useState } from "react"
import { clock, effect, frameLoop, init, surface } from "vgpu"
import type { FrameLoopHandle } from "vgpu"
import { cn } from "@/lib/utils"

/**
 * Backdrop del hero: trama de puntos tipo semitono (WebGPU, vía vgpu) que respira
 * y se abre apenas alrededor del cursor. Puntos en tono papel con un foco teal.
 * Los colores salen de los tokens CSS; sin WebGPU cae a una trama estática en CSS.
 */

export interface HeroDotsParams {
  /** Paso de la grilla, en px CSS. */
  cell: number
  /** Radio máximo del punto, como fracción de media celda (0–1). */
  size: number
  /** Velocidad del movimiento. */
  speed: number
  /** Radio de la zona que se abre alrededor del cursor, en px CSS. */
  cursor: number
  /** Intensidad del foco teal (0–1). */
  focus: number
}

export const heroDotsDefaults: HeroDotsParams = { cell: 18, size: 0.62, speed: 0.12, cursor: 190, focus: 0.9 }

const SHADER = /* wgsl */ `
struct Params {
  res: vec2f,
  mouse: vec2f,
  time: f32,
  cell: f32,
  size: f32,
  cursor: f32,
  focus: f32,
  hover: f32,
  bg: vec3f,
  dot: vec3f,
  accent: vec3f,
}
@group(0) @binding(0) var<uniform> params: Params;

fn hash(p: vec2f) -> f32 {
  let q = fract(p * vec2f(123.34, 456.21));
  let r = q + dot(q, q + 45.32);
  return fract(r.x * r.y);
}

fn noise(p: vec2f) -> f32 {
  let i = floor(p);
  let f = fract(p);
  let u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2f(1.0, 0.0)), u.x),
    mix(hash(i + vec2f(0.0, 1.0)), hash(i + vec2f(1.0, 1.0)), u.x),
    u.y,
  );
}

fn fbm(p: vec2f) -> f32 {
  return noise(p) * 0.62 + noise(p * 2.03 + 11.7) * 0.38;
}

@fragment fn fs_main(@location(0) uv: vec2f) -> @location(0) vec4f {
  let px = uv * params.res;
  let id = floor(px / params.cell);
  let center = (id + 0.5) * params.cell;
  let local = (px - center) / (params.cell * 0.5);
  let c = center / params.res.y;

  // Campo lento que hace respirar el radio de cada punto.
  let t = params.time;
  let field = fbm(c * 2.4 + vec2f(t * 0.6, -t * 0.35));
  let wave = 0.5 + 0.5 * sin(c.x * 3.1 - c.y * 2.2 + t * 1.7 + field * 4.0);
  var radius = params.size * smoothstep(0.18, 0.95, field * 0.72 + wave * 0.28);

  // El texto vive a la izquierda: la trama gana presencia hacia la derecha.
  let cu = center / params.res;
  // En pantallas angostas el texto ocupa todo el ancho y la trama entera se apaga.
  let narrow = 1.0 - smoothstep(600.0, 1000.0, params.res.x);
  let side = mix(0.1, 1.0, smoothstep(0.32, 0.9, cu.x));
  radius *= side * mix(1.0, 0.55, narrow);

  // La trama se abre alrededor del cursor.
  let d = distance(center, params.mouse * params.res);
  let open = 1.0 - smoothstep(0.0, params.cursor, d);
  radius *= 1.0 - 0.82 * open * params.hover;

  // Foco teal que deriva despacio.
  let fpos = vec2f(0.72 + 0.08 * sin(t * 0.5), 0.46 + 0.1 * cos(t * 0.37));
  let fd = distance(cu * vec2f(params.res.x / params.res.y, 1.0), fpos * vec2f(params.res.x / params.res.y, 1.0));
  let glow = (1.0 - smoothstep(0.05, 0.46, fd)) * params.focus;

  let edge = 1.6 / params.cell;
  let mask = 1.0 - smoothstep(radius - edge, radius + edge, length(local));
  let ink = mix(params.dot, params.accent, glow);
  let alpha = mask * mix(0.34, 1.0, glow) * mix(0.35, 1.0, side) * mix(1.0, 0.6, narrow);
  return vec4f(mix(params.bg, ink, alpha), 1.0);
}
`

function cssColor(name: string): [number, number, number] {
  const probe = document.createElement("span")
  probe.style.color = `var(${name})`
  document.body.appendChild(probe)
  const rgb = getComputedStyle(probe).color.match(/[\d.]+/g)?.slice(0, 3).map(Number) ?? [0, 0, 0]
  probe.remove()
  return [rgb[0] / 255, rgb[1] / 255, rgb[2] / 255]
}

function startDots(canvas: HTMLCanvasElement, paramsRef: { current: HeroDotsParams }, onFail: () => void): () => void {
  let disposed = false
  let loop: FrameLoopHandle | undefined
  let gpu: Awaited<ReturnType<typeof init>> | undefined
  const mouse = { x: 0.5, y: 0.5, hover: 0, target: 0 }

  const onMove = (e: PointerEvent) => {
    const rect = canvas.getBoundingClientRect()
    mouse.x = (e.clientX - rect.left) / rect.width
    mouse.y = (e.clientY - rect.top) / rect.height
    mouse.target = mouse.x >= 0 && mouse.x <= 1 && mouse.y >= 0 && mouse.y <= 1 ? 1 : 0
  }
  window.addEventListener("pointermove", onMove, { passive: true })

  void (async () => {
    try {
      gpu = await init()
      if (disposed) return gpu.dispose()

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      const canvasSurface = surface(gpu, canvas, { dpr: [1, 2] })
      const cssSize = () => [canvas.clientWidth, canvas.clientHeight] as [number, number]
      const p = paramsRef.current
      const dots = effect(gpu, SHADER, {
        label: "hero-dots",
        set: {
          params: {
            res: cssSize(),
            mouse: [0.5, 0.5],
            time: 0,
            cell: p.cell,
            size: p.size,
            cursor: p.cursor,
            focus: p.focus,
            hover: 0,
            bg: cssColor("--color-ink"),
            dot: cssColor("--color-paper"),
            accent: cssColor("--color-teal-dark"),
          },
        },
      })
      canvasSurface.onResize(() => dots.set({ params: { res: cssSize() } }))

      const time = clock(gpu)
      loop = frameLoop(gpu, (frame) => {
        const q = paramsRef.current
        mouse.hover += (mouse.target - mouse.hover) * 0.08
        dots.set({
          params: {
            time: reduced ? 0 : time.time * q.speed,
            mouse: [mouse.x, mouse.y],
            hover: reduced ? 0 : mouse.hover,
            cell: q.cell,
            size: q.size,
            cursor: q.cursor,
            focus: q.focus,
          },
        })
        frame.pass(canvasSurface, dots)
      })
    } catch (error) {
      console.warn("HeroDots: WebGPU no disponible, se usa la trama estática.", error)
      onFail()
    }
  })()

  return () => {
    disposed = true
    window.removeEventListener("pointermove", onMove)
    loop?.stop()
    gpu?.dispose()
  }
}

export function HeroDots({ className, params = heroDotsDefaults }: { className?: string; params?: HeroDotsParams }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const paramsRef = useRef(params)
  const [fallback, setFallback] = useState(false)
  paramsRef.current = params

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    if (!("gpu" in navigator)) {
      setFallback(true)
      return
    }
    return startDots(canvas, paramsRef, () => setFallback(true))
  }, [])

  if (fallback) {
    return (
      <div
        aria-hidden
        className={cn(
          "bg-ink bg-[radial-gradient(var(--color-taupe)_1.2px,transparent_1.6px)] bg-[length:18px_18px] opacity-40",
          className
        )}
      />
    )
  }

  return <canvas ref={canvasRef} aria-hidden className={cn("block h-full w-full", className)} />
}
