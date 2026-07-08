const PATH_D =
  "M 60 150 C 45 108,92 92,112 118 C 132 144,90 162,68 140 C 48 118,102 86,132 108 C 164 130,122 178,84 172 C 52 167,52 128,80 128 C 102 128,150 128,220 168 C 260 190,300 155,330 150"

interface TransitionDiagramProps {
  className?: string
}

export function TransitionDiagram({ className }: TransitionDiagramProps) {
  return (
    <svg
      viewBox="0 0 400 300"
      className={className}
      role="img"
      aria-label="Diagrama de transición: de un proceso desordenado (A) a un proceso ordenado y autónomo (B)"
    >
      {/* ticks decorativos */}
      <g stroke="var(--color-ink)" strokeOpacity={0.3} strokeWidth={1.5}>
        <line x1="34" y1="66" x2="34" y2="94" />
        <line x1="26" y1="94" x2="42" y2="94" />
        <line x1="180" y1="58" x2="350" y2="58" />
        <line x1="180" y1="50" x2="180" y2="66" />
        <line x1="265" y1="50" x2="265" y2="66" />
        <line x1="350" y1="50" x2="350" y2="66" />
        <line x1="30" y1="248" x2="185" y2="248" />
        <line x1="30" y1="240" x2="30" y2="256" />
        <line x1="185" y1="240" x2="185" y2="256" />
      </g>

      {/* tangle → shaft, se dibuja al entrar */}
      <path
        d={PATH_D}
        fill="none"
        stroke="var(--color-ink)"
        strokeWidth={2.5}
        strokeLinecap="round"
        pathLength={1}
        className="animate-draw"
      />

      {/* acento teal, llega un poco después */}
      <path
        d="M 190 145 C 215 152, 245 158, 275 152"
        fill="none"
        stroke="var(--color-teal)"
        strokeWidth={3}
        strokeLinecap="round"
        pathLength={1}
        className="animate-draw"
        style={{ animationDelay: "calc(var(--dur-draw) * 0.35)" }}
      />

      {/* punta de flecha */}
      <path
        d="M 330 141 L 350 150 L 330 159"
        fill="none"
        stroke="var(--color-ink)"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="opacity-0 animate-[fade-in_var(--dur-fast)_ease-out_forwards]"
        style={{ animationDelay: "var(--dur-draw)" }}
      />

      {/* nodo B */}
      <g
        className="opacity-0 animate-[fade-in_var(--dur-fast)_ease-out_forwards]"
        style={{ animationDelay: "var(--dur-draw)" }}
      >
        <circle cx="350" cy="150" r="13" fill="none" stroke="var(--color-ink)" strokeWidth={2} />
        <line x1="350" y1="137" x2="350" y2="163" stroke="var(--color-ink)" strokeWidth={1.5} />
        <line x1="337" y1="150" x2="363" y2="150" stroke="var(--color-ink)" strokeWidth={1.5} />
      </g>

      {/* punto que viaja — el proceso ya autónomo, en loop continuo */}
      <circle
        r="4.5"
        fill="var(--color-teal)"
        className="animate-travel-dot"
        style={{ offsetPath: `path("${PATH_D} L 350 150")` }}
      />

      <text x="60" y="230" textAnchor="middle" className="fill-ink font-mono text-[13px]">
        A
      </text>
      <text x="350" y="230" textAnchor="middle" className="fill-ink font-mono text-[13px]">
        B
      </text>
    </svg>
  )
}
