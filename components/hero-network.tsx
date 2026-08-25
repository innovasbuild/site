"use client"

import { useEffect, useRef } from "react"

/**
 * Backdrop del hero: red de clusters (áreas de la organización) conectados por
 * troncales, dibujada en canvas con la paleta calibrada para fondo ink.
 * Reemplaza a la imagen bitmap del hero — cero assets, escala a cualquier viewport.
 */
export function HeroNetwork({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d", { alpha: false })
    if (!ctx) return

    const CFG = { density: 1.0, fps: 30, maxDPR: 1.5, pulses: 10, alphaBands: 4 }
    const DESIGN_W = 1200
    const DESIGN_H = 700

    // Paleta ya calibrada para fondo oscuro (teal-dark, plum-dark, paper, stone).
    const PALETTE: number[][] = [
      [21, 147, 132],
      [192, 104, 141],
      [237, 232, 220],
      [167, 158, 142],
      [167, 158, 142],
    ]
    const BG = "#1F1B19"
    const VIGNETTE = [42, 37, 34]
    const CORE_FILL = "#2A2522"
    const PULSE = [237, 232, 220]
    const BRIDGE = 4

    const CLUSTERS = [
      { cx: 748, cy: 430, r: 190, count: 54, cores: 4, weight: 1.0 },
      { cx: 318, cy: 236, r: 152, count: 40, cores: 3, weight: 0.86 },
      { cx: 286, cy: 516, r: 140, count: 32, cores: 3, weight: 0.6 },
      { cx: 916, cy: 176, r: 132, count: 28, cores: 3, weight: 0.62 },
    ]
    const SATELLITES = 26

    let seed = 42
    const rnd = () => {
      const x = Math.sin(seed++) * 10000
      return x - Math.floor(x)
    }

    interface Node {
      c: number
      bx: number
      by: number
      x: number
      y: number
      r: number
      core: boolean
      w: number
      px: number
      py: number
      sx: number
      sy: number
      dd: number
    }
    interface Edge {
      a: Node
      b: Node
      max: number
      c: number
      trunk?: boolean
      bow?: number
    }

    let nodes: Node[] = []
    let edges: Edge[] = []
    let edgeCount = 0
    let buckets: Int32Array[] = []
    let counts: Int32Array = new Int32Array(0)
    let pulses: { e: number; t: number; v: number }[] = []

    function build() {
      nodes = []
      edges = []
      seed = 42
      const mobile = canvas!.clientWidth < 760
      const d = CFG.density * (mobile ? 0.62 : 1)

      CLUSTERS.forEach((cl, c) => {
        const n = Math.max(8, Math.round(cl.count * d))
        for (let i = 0; i < n; i++) {
          const dist = Math.pow(rnd(), 1.75) * cl.r
          const theta = rnd() * Math.PI * 2
          const isCore = i < cl.cores
          const df = Math.max(0.08, 1 - dist / cl.r)
          nodes.push({
            c,
            bx: cl.cx + Math.cos(theta) * dist,
            by: cl.cy + Math.sin(theta) * dist * 0.84,
            x: 0,
            y: 0,
            r: isCore ? 5.5 + rnd() * 4 : 1.1 + df * 3.0,
            core: isCore,
            w: cl.weight,
            px: rnd() * 6.283,
            py: rnd() * 6.283,
            sx: 0.3 + rnd() * 0.45,
            sy: 0.3 + rnd() * 0.45,
            dd: 7 + rnd() * 13,
          })
        }
      })

      for (let s = 0; s < Math.round(SATELLITES * d); s++) {
        nodes.push({
          c: BRIDGE,
          bx: 60 + rnd() * 1080,
          by: 50 + rnd() * 600,
          x: 0,
          y: 0,
          r: 1.0 + rnd() * 1.4,
          core: false,
          w: 0.5,
          px: rnd() * 6.283,
          py: rnd() * 6.283,
          sx: 0.16 + rnd() * 0.3,
          sy: 0.16 + rnd() * 0.3,
          dd: 9 + rnd() * 9,
        })
      }

      for (let a = 0; a < nodes.length; a++) {
        for (let b = a + 1; b < nodes.length; b++) {
          const na = nodes[a]
          const nb = nodes[b]
          const dx = na.bx - nb.bx
          const dy = na.by - nb.by
          const dist = Math.sqrt(dx * dx + dy * dy)
          let max: number
          let ok = false
          if (na.c === nb.c && na.c !== BRIDGE) {
            max = na.core || nb.core ? 132 : 70
            if (dist < max) ok = rnd() > 0.2
          } else {
            max = 108
            if (dist < max) ok = rnd() > 0.74
          }
          if (ok) edges.push({ a: na, b: nb, max, c: na.c === nb.c ? na.c : BRIDGE })
        }
      }

      const coresByCluster: Node[][] = [[], [], [], []]
      nodes.forEach((n) => {
        if (n.core && n.c !== BRIDGE) coresByCluster[n.c].push(n)
      })
      for (let A = 0; A < 4; A++) {
        for (let B = A + 1; B < 4; B++) {
          const la = coresByCluster[A]
          const lb = coresByCluster[B]
          if (!la.length || !lb.length) continue
          for (let L = 0; L < 2; L++) {
            const na = la[L % la.length]
            const nb = lb[(L + 1) % lb.length]
            const tdx = na.bx - nb.bx
            const tdy = na.by - nb.by
            edges.push({
              a: na,
              b: nb,
              max: Math.sqrt(tdx * tdx + tdy * tdy) * 1.55,
              c: BRIDGE,
              trunk: true,
              bow: (rnd() - 0.5) * 0.22,
            })
          }
        }
      }

      edgeCount = edges.length
      buckets = []
      counts = new Int32Array(PALETTE.length * CFG.alphaBands)
      for (let k = 0; k < PALETTE.length * CFG.alphaBands; k++) buckets.push(new Int32Array(edgeCount))
      pulses = []
      for (let p = 0; p < CFG.pulses; p++) {
        pulses.push({ e: Math.floor(rnd() * edgeCount) | 0, t: rnd(), v: 0.003 + rnd() * 0.0045 })
      }
    }

    const SPRITE = 64
    let sprites: HTMLCanvasElement[] = []
    function buildSprites() {
      sprites = PALETTE.map((rgb) => {
        const oc = document.createElement("canvas")
        oc.width = oc.height = SPRITE
        const octx = oc.getContext("2d")!
        const g = octx.createRadialGradient(SPRITE / 2, SPRITE / 2, 0, SPRITE / 2, SPRITE / 2, SPRITE / 2)
        const base = 0.55
        g.addColorStop(0, `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${base})`)
        g.addColorStop(0.45, `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${(base * 0.34).toFixed(3)})`)
        g.addColorStop(1, `rgba(${rgb[0]},${rgb[1]},${rgb[2]},0)`)
        octx.fillStyle = g
        octx.fillRect(0, 0, SPRITE, SPRITE)
        return oc
      })
    }

    let vignette: HTMLCanvasElement | null = null
    function buildVignette(w: number, h: number) {
      const LW = 160
      const LH = Math.max(1, Math.round((160 * h) / w))
      const oc = document.createElement("canvas")
      oc.width = LW
      oc.height = LH
      const o = oc.getContext("2d")!
      const g = o.createRadialGradient(LW * 0.58, LH * 0.5, 0, LW * 0.58, LH * 0.5, Math.max(LW, LH) * 0.78)
      g.addColorStop(0, `rgba(${VIGNETTE[0]},${VIGNETTE[1]},${VIGNETTE[2]},0.75)`)
      g.addColorStop(1, `rgba(${VIGNETTE[0]},${VIGNETTE[1]},${VIGNETTE[2]},0)`)
      o.fillStyle = g
      o.fillRect(0, 0, LW, LH)
      vignette = oc
    }

    let W = 0
    let H = 0
    let dpr = 1
    let scale = 1
    let offX = 0
    let offY = 0
    function resize() {
      W = canvas!.clientWidth || canvas!.parentElement!.clientWidth
      H = canvas!.clientHeight || canvas!.parentElement!.clientHeight
      if (!W || !H) return
      dpr = Math.min(window.devicePixelRatio || 1, CFG.maxDPR)
      canvas!.width = Math.round(W * dpr)
      canvas!.height = Math.round(H * dpr)
      scale = Math.max(W / DESIGN_W, H / DESIGN_H)
      offX = (W - DESIGN_W * scale) / 2
      offY = (H - DESIGN_H * scale) / 2
      buildVignette(W, H)
    }

    function draw(t: number) {
      if (!W || !H) return
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx!.globalCompositeOperation = "source-over"
      ctx!.globalAlpha = 1
      ctx!.fillStyle = BG
      ctx!.fillRect(0, 0, W, H)
      if (vignette) ctx!.drawImage(vignette, 0, 0, W, H)
      ctx!.setTransform(scale * dpr, 0, 0, scale * dpr, offX * dpr, offY * dpr)

      const cb: number[] = []
      for (let i = 0; i < CLUSTERS.length; i++) {
        cb.push(Math.sin(t * 0.4 + i) * 7, Math.cos(t * 0.33 + i * 1.5) * 7)
      }
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i]
        const ox = n.c !== BRIDGE ? cb[n.c * 2] : 0
        const oy = n.c !== BRIDGE ? cb[n.c * 2 + 1] : 0
        n.x = n.bx + ox + Math.sin(t * n.sx + n.px) * n.dd
        n.y = n.by + oy + Math.cos(t * n.sy + n.py) * n.dd
      }

      counts.fill(0)
      for (let i = 0; i < edgeCount; i++) {
        const e = edges[i]
        if (e.trunk) continue
        const dx = e.a.x - e.b.x
        const dy = e.a.y - e.b.y
        const f = 1 - Math.sqrt(dx * dx + dy * dy) / (e.max * 1.35)
        if (f <= 0.04) continue
        let band = (f * CFG.alphaBands) | 0
        if (band > CFG.alphaBands - 1) band = CFG.alphaBands - 1
        const k = e.c * CFG.alphaBands + band
        buckets[k][counts[k]++] = i
      }

      ctx!.lineWidth = 0.85
      for (let ci = 0; ci < PALETTE.length; ci++) {
        const rgb = PALETTE[ci]
        for (let band = 0; band < CFG.alphaBands; band++) {
          const kk = ci * CFG.alphaBands + band
          const cnt = counts[kk]
          if (!cnt) continue
          const al = ((band + 0.5) / CFG.alphaBands) * 0.3
          ctx!.strokeStyle = `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${al.toFixed(3)})`
          ctx!.beginPath()
          const buf = buckets[kk]
          for (let q = 0; q < cnt; q++) {
            const ed = edges[buf[q]]
            ctx!.moveTo(ed.a.x, ed.a.y)
            ctx!.lineTo(ed.b.x, ed.b.y)
          }
          ctx!.stroke()
        }
      }

      const tr = PALETTE[BRIDGE]
      ctx!.lineWidth = 1.1
      ctx!.strokeStyle = `rgba(${tr[0]},${tr[1]},${tr[2]},0.22)`
      ctx!.beginPath()
      for (let i = 0; i < edgeCount; i++) {
        const te = edges[i]
        if (!te.trunk) continue
        const mx = (te.a.x + te.b.x) / 2
        const my = (te.a.y + te.b.y) / 2
        const vx = te.b.x - te.a.x
        const vy = te.b.y - te.a.y
        ctx!.moveTo(te.a.x, te.a.y)
        ctx!.quadraticCurveTo(mx - vy * te.bow!, my + vx * te.bow!, te.b.x, te.b.y)
      }
      ctx!.stroke()

      ctx!.globalCompositeOperation = "lighter"
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i]
        if (n.r < 2.6) continue
        const pulse = 1 + Math.sin(t * 1.6 + n.px) * 0.13
        const s = n.r * (n.core ? 8.5 : 5.4) * pulse
        ctx!.globalAlpha = n.w
        ctx!.drawImage(sprites[n.c], n.x - s / 2, n.y - s / 2, s, s)
      }
      ctx!.globalCompositeOperation = "source-over"
      ctx!.globalAlpha = 1

      for (let cj = 0; cj < PALETTE.length; cj++) {
        const rg = PALETTE[cj]
        ctx!.fillStyle = `rgba(${rg[0]},${rg[1]},${rg[2]},0.9)`
        ctx!.beginPath()
        for (let i = 0; i < nodes.length; i++) {
          const n = nodes[i]
          if (n.c !== cj || n.core) continue
          ctx!.moveTo(n.x + n.r, n.y)
          ctx!.arc(n.x, n.y, n.r, 0, 6.2832)
        }
        ctx!.fill()
      }

      ctx!.lineWidth = 1.8
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i]
        if (!n.core) continue
        const rc = PALETTE[n.c]
        ctx!.beginPath()
        ctx!.arc(n.x, n.y, n.r, 0, 6.2832)
        ctx!.fillStyle = CORE_FILL
        ctx!.fill()
        ctx!.strokeStyle = `rgba(${rc[0]},${rc[1]},${rc[2]},0.95)`
        ctx!.stroke()
      }

      ctx!.fillStyle = `rgba(${PULSE[0]},${PULSE[1]},${PULSE[2]},1)`
      for (let i = 0; i < pulses.length; i++) {
        const pu = pulses[i]
        pu.t += pu.v
        if (pu.t >= 1) {
          pu.t = 0
          pu.e = (pu.e * 7 + 13) % edgeCount
        }
        const pe = edges[pu.e]
        if (!pe) continue
        ctx!.globalAlpha = Math.sin(pu.t * Math.PI) * 0.9
        ctx!.beginPath()
        ctx!.arc(pe.a.x + (pe.b.x - pe.a.x) * pu.t, pe.a.y + (pe.b.y - pe.a.y) * pu.t, 1.9, 0, 6.2832)
        ctx!.fill()
      }
      ctx!.globalAlpha = 1
    }

    let running = true
    let raf = 0
    let last = 0
    let clock = 0
    const STEP = 1000 / CFG.fps
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)")

    function frame(now: number) {
      if (!running) return
      raf = requestAnimationFrame(frame)
      if (now - last < STEP) return
      const dt = Math.min(now - last, 100)
      last = now
      clock += dt * 0.001
      draw(clock)
    }

    buildSprites()
    build()
    resize()
    draw(0)
    if (!reduce.matches) {
      last = performance.now()
      raf = requestAnimationFrame(frame)
    }

    const onResize = () => {
      resize()
      draw(clock)
    }
    window.addEventListener("resize", onResize, { passive: true })
    let ro: ResizeObserver | null = null
    if ("ResizeObserver" in window && canvas.parentElement) {
      ro = new ResizeObserver(onResize)
      ro.observe(canvas.parentElement)
    }

    return () => {
      running = false
      if (raf) cancelAnimationFrame(raf)
      if (ro) ro.disconnect()
      window.removeEventListener("resize", onResize)
    }
  }, [])

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />
}
