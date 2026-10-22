"use client"

import { useEffect, useRef, useState } from "react"
import { clock, effect, frameLoop, init, surface } from "vgpu"
import type { FrameLoopHandle } from "vgpu"
import { cn } from "@/lib/utils"

/**
 * Fondos de hero de las páginas internas: misma familia que HeroDots (WebGPU vía vgpu,
 * colores por token, cursor, respaldo estático, reduced-motion) con un patrón propio
 * por página. Sobre papel: tinta tenue y acento teal; la trama se apaga detrás del texto.
 */

export type HeroFieldPattern = "flow" | "waves" | "blocks" | "contours" | "meter" | "signal"

const PRELUDE = /* wgsl */ `
struct Params {
  res: vec2f,
  mouse: vec2f,
  time: f32,
  hover: f32,
  textAt: f32,
  cursor: f32,
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

// Cuánto se ve la trama en ese punto: se apaga detrás del texto (a la izquierda o al
// centro, según align) y en pantallas angostas.
fn presence(cu: vec2f) -> f32 {
  let narrow = 1.0 - smoothstep(600.0, 1000.0, params.res.x);
  let left = smoothstep(0.48, 0.95, cu.x);
  let center = smoothstep(0.2, 0.46, abs(cu.x - 0.5));
  let side = mix(0.05, 1.0, mix(left, center, params.textAt));
  return side * mix(1.0, 0.45, narrow);
}

// Cercanía al cursor (0 lejos, 1 encima).
fn near(p: vec2f) -> f32 {
  let d = distance(p, params.mouse * params.res);
  return (1.0 - smoothstep(0.0, params.cursor, d)) * params.hover;
}

fn disc(local: vec2f, radius: f32, cell: f32) -> f32 {
  let edge = 1.6 / cell;
  return 1.0 - smoothstep(radius - edge, radius + edge, length(local));
}
`

const MAIN = /* wgsl */ `
@fragment fn fs_main(@location(0) uv: vec2f) -> @location(0) vec4f {
  let o = pattern(uv * params.res);
  return vec4f(mix(params.bg, o.rgb, clamp(o.a, 0.0, 1.0)), 1.0);
}
`

const PATTERNS: Record<HeroFieldPattern, string> = {
  // Central IA: guiones que siguen un flujo y se alinean hacia la derecha cerca del cursor.
  flow: /* wgsl */ `
fn pattern(px: vec2f) -> vec4f {
  let cell = 22.0;
  let id = floor(px / cell);
  let center = (id + 0.5) * cell;
  let local = (px - center) / (cell * 0.5);
  let c = center / params.res.y;
  let cu = center / params.res;
  let t = params.time;

  let n = near(center);
  let field = fbm(c * 1.7 + vec2f(t * 0.05, -t * 0.03));
  let ang = mix((field - 0.5) * 5.2, 0.0, n);
  let ca = cos(ang);
  let sa = sin(ang);
  let p = vec2f(ca * local.x + sa * local.y, -sa * local.x + ca * local.y);
  let len = mix(0.28, 0.72, fbm(c * 3.1 - vec2f(t * 0.04, 0.0)));
  let d = length(vec2f(max(abs(p.x) - len, 0.0), p.y));
  let edge = 1.6 / cell;
  let mask = 1.0 - smoothstep(0.12 - edge, 0.12 + edge, d);

  let fpos = vec2f(0.74 + 0.07 * sin(t * 0.21), 0.5 + 0.12 * cos(t * 0.17));
  let fd = distance(cu * vec2f(params.res.x / params.res.y, 1.0), fpos * vec2f(params.res.x / params.res.y, 1.0));
  let glow = max(1.0 - smoothstep(0.05, 0.38, fd), n);
  let col = mix(params.dot, params.accent, glow);
  return vec4f(col, mask * mix(0.22, 0.85, glow) * presence(cu));
}
`,

  // Cómo implementamos: olas concéntricas de puntos; el cursor larga su propia onda.
  waves: /* wgsl */ `
fn pattern(px: vec2f) -> vec4f {
  let cell = 16.0;
  let id = floor(px / cell);
  let center = (id + 0.5) * cell;
  let local = (px - center) / (cell * 0.5);
  let cu = center / params.res;
  let t = params.time;

  let src = vec2f(params.res.x * 0.88, params.res.y * 0.6);
  let d = distance(center, src) / params.res.y;
  let rings = pow(0.5 + 0.5 * sin(d * 20.0 - t * 1.1), 3.0);

  let dm = distance(center, params.mouse * params.res);
  let reach = 1.0 - smoothstep(0.0, params.cursor * 1.5, dm);
  let ripple = pow(0.5 + 0.5 * sin(dm * 0.07 - t * 4.0), 4.0) * reach * params.hover;

  let k = max(rings, ripple);
  let pres = presence(cu);
  let radius = mix(0.14, 0.68, k) * mix(0.6, 1.0, pres);
  let mask = disc(local, radius, cell);

  // La ola más cercana al origen va en teal: la ola cero.
  let zero = smoothstep(0.7, 1.0, rings) * (1.0 - smoothstep(0.18, 0.42, d));
  let glow = max(zero, ripple);
  let col = mix(params.dot, params.accent, glow);
  return vec4f(col, mask * mix(0.2, 0.8, max(k, glow)) * pres);
}
`,

  // Proyectos: bloques que se arman y se desarman; cerca del cursor se completan.
  blocks: /* wgsl */ `
fn pattern(px: vec2f) -> vec4f {
  let cell = 20.0;
  let id = floor(px / cell);
  let center = (id + 0.5) * cell;
  let local = (px - center) / (cell * 0.5);
  let cu = center / params.res;
  let t = params.time;

  let n = near(center);
  let v = fbm(id * 0.14 + vec2f(t * 0.09, -t * 0.06));
  let build = smoothstep(0.46, 0.64, v + n * 0.45);
  let size = mix(0.1, 0.74, build);
  let r = 0.14;
  let q = abs(local) - vec2f(max(size - r, 0.0));
  let d = length(max(q, vec2f(0.0))) + min(max(q.x, q.y), 0.0) - r;
  let edge = 1.6 / cell;
  let mask = 1.0 - smoothstep(-edge, edge, d);

  let pick = step(0.9, hash(id + 3.1)) * build;
  let glow = max(pick, n * build);
  let col = mix(params.dot, params.accent, glow);
  let pres = presence(cu);
  return vec4f(col, mask * mix(0.16, 0.66, build) * pres * pres);
}
`,

  // Nosotros: curvas de nivel que derivan; el cursor levanta un cerro. Cada quinta curva en teal.
  contours: /* wgsl */ `
fn pattern(px: vec2f) -> vec4f {
  let c = px / params.res.y;
  let cu = px / params.res;
  let t = params.time;

  let dm = distance(px, params.mouse * params.res) / params.cursor;
  let hill = exp(-dm * dm) * 0.32 * params.hover;
  let h = fbm(c * 1.5 + vec2f(t * 0.025, t * 0.018)) + hill;
  let v = h * 16.0;
  let fw = max(fwidth(v), 0.0001);
  let f = fract(v);
  let d = min(f, 1.0 - f);
  let line = 1.0 - smoothstep(fw * 0.7, fw * 1.9, d);

  let level = floor(v + 0.5);
  let index = 1.0 - step(0.5, abs(level - 5.0 * floor(level / 5.0 + 0.5)));
  let col = mix(params.dot, params.accent, index);
  return vec4f(col, line * mix(0.28, 0.8, index) * presence(cu));
}
`,

  // Precios: columnas de puntos que suben y bajan como un medidor de consumo.
  meter: /* wgsl */ `
fn pattern(px: vec2f) -> vec4f {
  let cell = 16.0;
  let id = floor(px / cell);
  let center = (id + 0.5) * cell;
  let local = (px - center) / (cell * 0.5);
  let cu = center / params.res;
  let t = params.time;

  let dx = (center.x - params.mouse.x * params.res.x) / params.cursor;
  let lift = exp(-dx * dx) * 0.3 * params.hover;
  let v = fbm(vec2f(id.x * 0.09, t * 0.22));
  let level = mix(0.08, 0.82, smoothstep(0.2, 0.8, v)) + lift;
  let rise = 1.0 - cu.y;
  let filled = 1.0 - smoothstep(level - 0.004, level + 0.004, rise);
  let top = filled * (1.0 - smoothstep(0.0, cell * 1.5 / params.res.y, level - rise));

  let radius = mix(0.16, 0.56, filled);
  let mask = disc(local, radius, cell);
  let col = mix(params.dot, params.accent, top);
  let pres = presence(cu);
  return vec4f(col, mask * mix(0.14, 0.55, filled) * mix(1.0, 1.4, top) * pres * pres);
}
`,

  // Contacto: filas con pulsos que viajan de izquierda a derecha, de A a B.
  signal: /* wgsl */ `
fn pattern(px: vec2f) -> vec4f {
  let cell = vec2f(13.0, 26.0);
  let id = floor(px / cell);
  let center = (id + 0.5) * cell;
  let cu = center / params.res;
  let t = params.time;

  let rh = hash(vec2f(7.0, id.y));
  let span = params.res.x * 1.5;
  let head = fract(t * (0.035 + 0.05 * rh) + rh) * span - params.res.x * 0.25;
  let db = head - center.x;
  let trail = select(exp(db / 10.0), exp(-db / 160.0), db >= 0.0);
  let tip = exp(-abs(db) / 18.0);

  let n = near(center);
  let radius = mix(0.2, 0.62, max(trail, n * 0.7));
  let local = (px - center) / 6.5;
  let mask = disc(local, radius, 13.0);
  let col = mix(params.dot, params.accent, max(tip, n * 0.6));
  return vec4f(col, mask * mix(0.16, 0.8, max(trail, n * 0.6)) * presence(cu));
}
`,
}

function cssColor(name: string): [number, number, number] {
  const probe = document.createElement("span")
  probe.style.color = `var(${name})`
  document.body.appendChild(probe)
  const rgb = getComputedStyle(probe).color.match(/[\d.]+/g)?.slice(0, 3).map(Number) ?? [0, 0, 0]
  probe.remove()
  return [rgb[0] / 255, rgb[1] / 255, rgb[2] / 255]
}

interface FieldOptions {
  pattern: HeroFieldPattern
  dark: boolean
  align: number
}

function startField(canvas: HTMLCanvasElement, opts: FieldOptions, onFail: () => void): () => void {
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
      const field = effect(gpu, PRELUDE + PATTERNS[opts.pattern] + MAIN, {
        label: `hero-field-${opts.pattern}`,
        set: {
          params: {
            res: cssSize(),
            mouse: [0.5, 0.5],
            time: 0,
            hover: 0,
            textAt: opts.align,
            cursor: 170,
            bg: cssColor(opts.dark ? "--color-ink" : "--color-paper"),
            dot: cssColor(opts.dark ? "--color-paper" : "--color-ink"),
            accent: cssColor(opts.dark ? "--color-teal-dark" : "--color-teal"),
          },
        },
      })
      canvasSurface.onResize(() => field.set({ params: { res: cssSize() } }))

      const time = clock(gpu)
      loop = frameLoop(gpu, (frame) => {
        mouse.hover += (mouse.target - mouse.hover) * 0.08
        field.set({
          params: {
            time: reduced ? 0 : time.time,
            mouse: [mouse.x, mouse.y],
            hover: reduced ? 0 : mouse.hover,
          },
        })
        frame.pass(canvasSurface, field)
      })
    } catch (error) {
      console.warn("HeroField: WebGPU no disponible, se usa la trama estática.", error)
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

export function HeroField({
  pattern,
  surface: tone = "light",
  align = "left",
  className,
}: {
  pattern: HeroFieldPattern
  surface?: "light" | "dark"
  /** Dónde vive el texto: la trama se apaga ahí. */
  align?: "left" | "center"
  className?: string
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [fallback, setFallback] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    if (!("gpu" in navigator)) {
      setFallback(true)
      return
    }
    return startField(canvas, { pattern, dark: tone === "dark", align: align === "center" ? 1 : 0 }, () => setFallback(true))
  }, [pattern, tone, align])

  if (fallback) {
    return (
      <div
        aria-hidden
        className={cn(
          "bg-[radial-gradient(var(--color-taupe)_1.2px,transparent_1.6px)] bg-[length:18px_18px] opacity-50",
          align === "center"
            ? "[mask-image:linear-gradient(to_right,black,transparent_30%,transparent_70%,black)]"
            : "[mask-image:linear-gradient(to_right,transparent_35%,black)]",
          className
        )}
      />
    )
  }

  return <canvas ref={canvasRef} aria-hidden className={cn("block h-full w-full", className)} />
}
