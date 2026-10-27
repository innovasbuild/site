import { AgentScene } from "@/components/animated/agent-scene"
import { SCENES, type SceneName } from "@/components/animated/scene-shader"
import { HandDrawn } from "@/components/illustrations/hand-drawn"
import { homeIllustrations } from "@/components/illustrations/home"
import { CerebroRed } from "@/components/cerebro-red"
import { AgenteRobot } from "@/components/agente-robot"
import { HerramientasEnchufe } from "@/components/herramientas-enchufe"

interface IllustratedCard {
  illustration: keyof typeof homeIllustrations
  title: string
  description: string
}

const isScene = (name: string): name is SceneName => (SCENES as readonly string[]).includes(name)

/** Las tres piezas tienen ilustración propia (la serie del cerebro); el resto usa la escena o el dibujo a mano. */
const piezasPropias: Partial<Record<string, "brain" | "agentes" | "herramientas">> = {
  piezaBrain: "brain",
  piezaAgentes: "agentes",
  piezaHerramientas: "herramientas",
}

/** Los dibujos de la serie del cerebro van más chicos dentro de la tarjeta. */
const dibujoChico = "serie-cerebro mx-auto w-4/5"

/**
 * Tarjetas con ilustración arriba, título y texto. Brain, Agentes y Herramientas usan sus dibujos
 * animados propios; para el resto, con `animated` la ilustración es la escena en volumen (WebGPU)
 * y la versión a mano queda como respaldo.
 */
export function IllustratedCards({
  cards,
  animated = false,
  sceneBg = "--color-paper-soft",
}: {
  cards: readonly IllustratedCard[]
  animated?: boolean
  /** Token del fondo de la tarjeta, para que la escena se funda con ella. */
  sceneBg?: string
}) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {cards.map((card) => {
        const drawn = <HandDrawn illustration={homeIllustrations[card.illustration]} className="w-full" />
        const propia = piezasPropias[card.illustration]
        const label = homeIllustrations[card.illustration].label
        return (
          <div key={card.title} className="flex flex-col rounded border border-ink bg-paper-soft p-6">
            {propia === "brain" ? (
              <CerebroRed label={label} className={dibujoChico} />
            ) : propia === "agentes" ? (
              <AgenteRobot label={label} className={dibujoChico} />
            ) : propia === "herramientas" ? (
              <HerramientasEnchufe label={label} className={dibujoChico} />
            ) : animated && isScene(card.illustration) ? (
              <AgentScene
                scene={card.illustration}
                look="volumen"
                bg={sceneBg}
                label={label}
                className="aspect-[4/3] w-full"
                fallback={drawn}
              />
            ) : (
              drawn
            )}
            <h3 className="mt-4 font-display text-xl font-bold text-ink">{card.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-70">{card.description}</p>
          </div>
        )
      })}
    </div>
  )
}
