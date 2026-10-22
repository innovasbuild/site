"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import { effect, frame, init, surface } from "vgpu"
import { cn } from "@/lib/utils"
import { SCENE_SHADER, SCENES, STYLES, type SceneName, type SceneStyle } from "./scene-shader"

/**
 * Escena animada en WebGPU. Todas las instancias comparten un solo dispositivo GPU
 * y un solo registro del cursor. Solo se dibuja lo que está en pantalla.
 * Sin WebGPU se muestra `fallback`; con movimiento reducido queda quieta.
 */

type Gpu = Awaited<ReturnType<typeof init>>
let gpuPromise: Promise<Gpu> | null = null
const getGpu = () => (gpuPromise ??= init())

const pointer = { x: 0, y: 0, inside: false }
if (typeof window !== "undefined") {
  window.addEventListener(
    "pointermove",
    (e) => {
      pointer.x = e.clientX
      pointer.y = e.clientY
      pointer.inside = true
    },
    { passive: true }
  )
  document.documentElement.addEventListener("pointerleave", () => (pointer.inside = false))
}

function cssColor(name: string): [number, number, number] {
  const probe = document.createElement("span")
  probe.style.color = `var(${name})`
  document.body.appendChild(probe)
  const rgb = getComputedStyle(probe).color.match(/[\d.]+/g)?.slice(0, 3).map(Number) ?? [0, 0, 0]
  probe.remove()
  return [rgb[0] / 255, rgb[1] / 255, rgb[2] / 255]
}

interface AgentSceneProps {
  scene: SceneName
  look: SceneStyle
  /** Token del fondo sobre el que se apoya (debe coincidir con la tarjeta). */
  bg?: string
  label: string
  className?: string
  /** Lo que se muestra si el navegador no tiene WebGPU. */
  fallback?: ReactNode
}

export function AgentScene({ scene, look, bg = "--color-paper-soft", label, className, fallback: fallbackNode }: AgentSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [fallback, setFallback] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    if (!("gpu" in navigator)) {
      setFallback(true)
      return
    }
    let disposed = false
    let raf = 0
    let visible = false
    let cleanupSurface: (() => void) | undefined
    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting), { rootMargin: "80px" })
    io.observe(canvas)

    void (async () => {
      try {
        const gpu = await getGpu()
        if (disposed) return
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
        const target = surface(gpu, canvas, { dpr: [1, 1.5] })
        cleanupSurface = () => target.dispose()
        const cssSize = () => [canvas.clientWidth, canvas.clientHeight] as [number, number]
        const fx = effect(gpu, SCENE_SHADER, {
          label: `scene-${scene}`,
          set: {
            params: {
              res: cssSize(),
              mouse: [0.5, 0.5],
              time: 0,
              scene: SCENES.indexOf(scene),
              style: STYLES.indexOf(look),
              hover: 0,
              bg: cssColor(look === "constelacion" ? "--color-ink" : bg),
              paper: cssColor("--color-paper"),
              ink: cssColor("--color-ink"),
              inkSoft: cssColor("--color-ink-soft"),
              teal: cssColor("--color-teal"),
              plum: cssColor("--color-plum"),
              taupe: cssColor("--color-taupe"),
              tealDark: cssColor("--color-teal-dark"),
              plumDark: cssColor("--color-plum-dark"),
            },
          },
        })
        target.onResize(() => fx.set({ params: { res: cssSize() } }))

        const start = performance.now()
        const m = { x: 0.5, y: 0.5, hover: 0 }
        const tick = () => {
          if (disposed) return
          raf = requestAnimationFrame(tick)
          if (!visible) return
          const rect = canvas.getBoundingClientRect()
          const tx = (pointer.x - rect.left) / rect.width
          const ty = (pointer.y - rect.top) / rect.height
          m.x += (tx - m.x) * 0.08
          m.y += (ty - m.y) * 0.08
          m.hover += ((pointer.inside && !reduced ? 1 : 0) - m.hover) * 0.05
          fx.set({
            params: {
              time: reduced ? 2 : (performance.now() - start) / 1000,
              mouse: [m.x, m.y],
              hover: m.hover,
            },
          })
          frame(gpu, (f) => f.pass(target, fx))
        }
        tick()
      } catch (error) {
        console.warn("AgentScene: WebGPU no disponible.", error)
        setFallback(true)
      }
    })()

    return () => {
      disposed = true
      cancelAnimationFrame(raf)
      io.disconnect()
      cleanupSurface?.()
    }
  }, [scene, look, bg])

  if (fallback) {
    if (fallbackNode) return <>{fallbackNode}</>
    return (
      <div role="img" aria-label={label} className={cn("grid place-items-center font-mono text-xs text-ink-70", className)}>
        Sin WebGPU en este navegador
      </div>
    )
  }

  return <canvas ref={canvasRef} role="img" aria-label={label} className={cn("block", className)} />
}
