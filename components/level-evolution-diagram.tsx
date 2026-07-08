const LEVEL_COLOR = [
  "var(--color-plum)",
  "color-mix(in srgb, var(--color-plum) 66%, var(--color-teal) 34%)",
  "color-mix(in srgb, var(--color-plum) 33%, var(--color-teal) 67%)",
  "var(--color-teal)",
]

const GAP = 25
const WIDTH = 150
const HEIGHTS = [100, 115, 130, 145]
const BOTTOMS = [300, 275, 250, 220]

const STEPS = HEIGHTS.map((h, i) => {
  const x = 40 + i * (WIDTH + GAP)
  const bottom = BOTTOMS[i]
  return { x, w: WIDTH, top: bottom - h, bottom }
})

interface LevelEvolutionDiagramProps {
  className?: string
}

export function LevelEvolutionDiagram({ className }: LevelEvolutionDiagramProps) {
  const centers = STEPS.map((s) => ({ x: s.x + s.w / 2, y: (s.top + s.bottom) / 2 }))

  return (
    <svg
      viewBox="0 0 720 330"
      className={className}
      role="img"
      aria-label="El camino de 4 niveles: de un usuario individual a un sistema de agentes orquestado, en complejidad creciente"
    >
      {/* escalones */}
      <g fill="none" stroke="var(--color-ink)" strokeWidth={1.75}>
        {STEPS.map((s, i) => (
          <rect key={i} x={s.x} y={s.top} width={s.w} height={s.bottom - s.top} />
        ))}
      </g>

      {/* ticks tipo regla entre escalones */}
      <g stroke="var(--color-ink)" strokeOpacity={0.4} strokeWidth={1}>
        {STEPS.slice(0, -1).map((s, i) => {
          const next = STEPS[i + 1]
          const x = s.x + s.w + GAP / 2
          const yTop = Math.min(s.top, next.top)
          const yBottom = Math.max(s.bottom, next.bottom)
          const ticks = Array.from({ length: 4 }, (_, t) => yTop + ((yBottom - yTop) * t) / 3)
          return (
            <g key={i}>
              <line x1={x} y1={yTop} x2={x} y2={yBottom} />
              {ticks.map((ty, t) => (
                <line key={t} x1={x - 6} y1={ty} x2={x + 6} y2={ty} />
              ))}
            </g>
          )
        })}
      </g>

      {/* brackets de medición en las puntas */}
      <g stroke="var(--color-ink)" strokeOpacity={0.6} strokeWidth={1.25}>
        <line x1="26" y1={STEPS[0].top} x2="26" y2={STEPS[0].bottom} />
        <line x1="20" y1={STEPS[0].top} x2="32" y2={STEPS[0].top} />
        <line x1="20" y1={STEPS[0].bottom} x2="32" y2={STEPS[0].bottom} />
        <line x1={STEPS[3].x + STEPS[3].w + 16} y1={STEPS[3].top} x2={STEPS[3].x + STEPS[3].w + 16} y2={STEPS[3].bottom} />
        <line
          x1={STEPS[3].x + STEPS[3].w + 10}
          y1={STEPS[3].top}
          x2={STEPS[3].x + STEPS[3].w + 22}
          y2={STEPS[3].top}
        />
        <line
          x1={STEPS[3].x + STEPS[3].w + 10}
          y1={STEPS[3].bottom}
          x2={STEPS[3].x + STEPS[3].w + 22}
          y2={STEPS[3].bottom}
        />
      </g>

      {/* numeración */}
      <g className="fill-ink-40 font-mono text-[13px]">
        <text x="10" y={(STEPS[0].top + STEPS[0].bottom) / 2 - 30}>
          01
        </text>
        {STEPS.map((s, i) => (
          <text key={i} x={s.x + 2} y={s.bottom + 22}>
            {`0${i + 1}`}
          </text>
        ))}
        <text x={STEPS[3].x + STEPS[3].w + 30} y={(STEPS[3].top + STEPS[3].bottom) / 2 - 30}>
          04
        </text>
      </g>

      {/* nivel 01 — fundamentos: un solo nodo */}
      <g
        className="opacity-0 animate-[fade-in_var(--dur-fast)_ease-out_forwards]"
        style={{ animationDelay: "calc(var(--dur-draw) * 0.15)" }}
      >
        <circle cx={centers[0].x} cy={centers[0].y} r="8" fill={LEVEL_COLOR[0]} />
      </g>

      {/* nivel 02 — usuario avanzado: dos nodos conectados */}
      <g
        className="opacity-0 animate-[fade-in_var(--dur-fast)_ease-out_forwards]"
        style={{ animationDelay: "calc(var(--dur-draw) * 0.4)" }}
      >
        <line
          x1={centers[1].x - 14}
          y1={centers[1].y}
          x2={centers[1].x + 14}
          y2={centers[1].y}
          stroke={LEVEL_COLOR[1]}
          strokeWidth={2}
        />
        <circle cx={centers[1].x - 14} cy={centers[1].y} r="6.5" fill={LEVEL_COLOR[1]} />
        <circle cx={centers[1].x + 14} cy={centers[1].y} r="6.5" fill={LEVEL_COLOR[1]} />
      </g>

      {/* nivel 03 — builder: una pequeña estructura triangular */}
      <g
        className="opacity-0 animate-[fade-in_var(--dur-fast)_ease-out_forwards]"
        style={{ animationDelay: "calc(var(--dur-draw) * 0.65)" }}
      >
        <path
          d={`M ${centers[2].x} ${centers[2].y - 17} L ${centers[2].x - 15} ${centers[2].y + 10} L ${
            centers[2].x + 15
          } ${centers[2].y + 10} Z`}
          fill="none"
          stroke={LEVEL_COLOR[2]}
          strokeWidth={2}
        />
        <circle cx={centers[2].x} cy={centers[2].y - 17} r="5.5" fill={LEVEL_COLOR[2]} />
        <circle cx={centers[2].x - 15} cy={centers[2].y + 10} r="5.5" fill={LEVEL_COLOR[2]} />
        <circle cx={centers[2].x + 15} cy={centers[2].y + 10} r="5.5" fill={LEVEL_COLOR[2]} />
      </g>

      {/* nivel 04 — orquestador: hub con nodos en órbita, en movimiento continuo */}
      <g
        className="opacity-0 animate-[fade-in_var(--dur-fast)_ease-out_forwards]"
        style={{ animationDelay: "calc(var(--dur-draw) * 0.9)" }}
      >
        <circle cx={centers[3].x} cy={centers[3].y} r="8" fill={LEVEL_COLOR[3]} />
        <g
          className="animate-orbit"
          style={{ transformOrigin: `${centers[3].x}px ${centers[3].y}px`, animationDelay: "var(--dur-draw)" }}
        >
          {[0, 90, 180, 270].map((angle) => {
            const rad = (angle * Math.PI) / 180
            const r = 24
            const sx = centers[3].x + r * Math.cos(rad)
            const sy = centers[3].y + r * Math.sin(rad)
            return (
              <g key={angle}>
                <line
                  x1={centers[3].x}
                  y1={centers[3].y}
                  x2={sx}
                  y2={sy}
                  stroke={LEVEL_COLOR[3]}
                  strokeWidth={1.2}
                  strokeOpacity={0.5}
                />
                <circle cx={sx} cy={sy} r="4" fill={LEVEL_COLOR[3]} />
              </g>
            )
          })}
        </g>
      </g>
    </svg>
  )
}
