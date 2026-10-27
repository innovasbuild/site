import { Aparece } from "@/components/aparece"
import { Foto } from "@/components/foto"
import { equipo as c } from "@/content/nosotros"

/**
 * El equipo, sobre una imagen a sangre en los colores de la paleta (en lugar del fondo oscuro liso). La
 * imagen es oscura del lado del texto y se enciende en lima hacia la derecha; un velo suave del lado izquierdo
 * asegura la lectura. Cuatro perfiles en filetes, entrando escalonados.
 */
export function Equipo() {
  return (
    <section className="relative overflow-hidden bg-ink text-paper">
      <Foto imagen={c.foto} className="absolute inset-0" imgClassName="object-[50%_72%]" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/40 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6 py-24 md:px-20 md:py-32">
        <div className="max-w-2xl">
          <p className="font-mono text-[13px] tracking-[0.12em] text-teal-dark uppercase">
            {c.kicker.index} · {c.kicker.label}
          </p>
          <h2 className="mt-4 font-display text-[clamp(2.25rem,4vw,3.5rem)] leading-[1.02] font-medium tracking-[-0.03em]">
            {c.titulo}
          </h2>
          <p className="mt-5 text-[17px] leading-[1.6] text-paper/80">{c.texto}</p>
          <dl className="mt-10 grid border-t border-paper/25 sm:grid-cols-2">
            {c.perfiles.map((p, i) => (
              <div key={p.titulo} className="border-b border-paper/25 py-5 sm:odd:pr-6 sm:even:pl-6">
                <Aparece demora={i * 0.07}>
                  <dt className="flex items-baseline gap-3">
                    <span className="font-mono text-xs text-lima">0{i + 1}</span>
                    <span className="text-[18px] font-semibold">{p.titulo}</span>
                  </dt>
                  <dd className="mt-1.5 text-[15px] leading-[1.5] text-paper/75">{p.texto}</dd>
                </Aparece>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
