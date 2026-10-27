import { Aparece } from "@/components/aparece"
import { Foto } from "@/components/foto"
import { FraseEncendida } from "@/components/frase-encendida"
import type { Imagen } from "@/content/imagenes"

/**
 * Banda de foto a sangre con velo oscuro: la frase en grande, un texto y hasta cuatro puntos en filetes.
 * Con `encender`, la frase se enciende palabra por palabra al entrar en pantalla.
 */
export function BandaFoto({
  kicker,
  frase,
  intro,
  foto,
  items,
  encender = false,
}: {
  kicker: { index: string; label: string }
  frase: string
  intro?: string
  foto: Imagen
  items?: { titulo: string; texto: string }[]
  encender?: boolean
}) {
  return (
    <section className="relative overflow-hidden bg-ink text-paper">
      <Foto imagen={foto} className="absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/60 to-ink/15" />
      <div className="relative mx-auto max-w-7xl px-6 py-24 md:px-20 md:py-32">
        <p className="font-mono text-[13px] tracking-[0.12em] text-teal-dark uppercase">
          {kicker.index} · {kicker.label}
        </p>
        {encender ? (
          <FraseEncendida
            texto={frase}
            className="mt-5 max-w-4xl font-display text-[clamp(2.5rem,5.5vw,4.75rem)] leading-[1.02] font-medium tracking-[-0.03em]"
          />
        ) : (
          <Aparece>
            <p className="mt-5 max-w-4xl font-display text-[clamp(2.5rem,5.5vw,4.75rem)] leading-[1.02] font-medium tracking-[-0.03em]">
              {frase}
            </p>
          </Aparece>
        )}
        {intro && <p className="mt-6 max-w-2xl text-[18px] leading-[1.6] text-paper/75">{intro}</p>}
        {items && (
          <div className="mt-14 grid gap-px overflow-hidden rounded-[16px] bg-paper/15 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((item, i) => (
              <Aparece key={item.titulo} demora={i * 0.08} className="bg-ink/70 p-6 backdrop-blur-sm">
                <span className="font-mono text-xs text-lima">0{i + 1}</span>
                <p className="mt-3 text-[18px] leading-[1.3] font-semibold">{item.titulo}</p>
                <p className="mt-2 text-[15px] leading-[1.5] text-paper/70">{item.texto}</p>
              </Aparece>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
