import type { Metadata } from "next"
import { HandDrawn, type Illustration } from "@/components/illustrations/hand-drawn"
import { homeIllustrations as il } from "@/components/illustrations/home"

export const metadata: Metadata = {
  title: "Lab: ilustraciones",
  robots: { index: false, follow: false },
}

const groups: { kicker: string; items: { illustration: Illustration; title: string; body: string }[] }[] = [
  {
    kicker: "// 01 ──→ dónde estás hoy",
    items: [
      {
        illustration: il.dolorAdopcion,
        title: "La IA quedó en una o dos personas",
        body: "Alguien del equipo avanzó mucho con su asistente: tableros, rutinas, criterios. Todo eso vive en su cuenta, y el resto del equipo sigue arrancando de cero.",
      },
      {
        illustration: il.dolorEscritura,
        title: "Cualquiera le enseña a la IA de la empresa",
        body: "Cuando todos pueden cargarle criterios, el conocimiento se degrada. Hace falta definir quién escribe en cada tema, quién lee y quién aprueba.",
      },
      {
        illustration: il.dolorFuga,
        title: "Información confidencial en cuentas personales",
        body: "Hay gente procesando datos de clientes y números de la empresa con su cuenta personal de IA, y aplicaciones hechas adentro, cada una con su base y su ingreso.",
      },
    ],
  },
  {
    kicker: "// 02 ──→ la plataforma",
    items: [
      {
        illustration: il.piezaBrain,
        title: "Brain",
        body: "El conocimiento colectivo de tu empresa: criterios, procesos, mensajes, cuentas, decisiones. Tu gente lo consulta para trabajar y lo alimenta donde le toca aportar.",
      },
      {
        illustration: il.piezaAgentes,
        title: "Agentes",
        body: "Trabajadores de IA para tareas concretas, preparados en acuerdo con tu empresa. Al definir cada uno se fija qué datos puede usar y qué personas pueden usarlo.",
      },
      {
        illustration: il.piezaHerramientas,
        title: "Herramientas",
        body: "Tu CRM, tu correo y tus fuentes de datos conectados a la plataforma, con permisos por persona. Cada uno ve y usa las herramientas que le habilitaron.",
      },
    ],
  },
]

export default function IllustrationLabPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      {groups.map((group) => (
        <section key={group.kicker} className="mb-20">
          <p className="font-mono text-xs uppercase tracking-wider text-teal">{group.kicker}</p>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {group.items.map((item) => (
              <div key={item.title} className="flex flex-col rounded border border-ink bg-paper-soft p-6">
                <HandDrawn illustration={item.illustration} className="w-full" />
                <h3 className="mt-4 font-display text-xl font-bold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-70">{item.body}</p>
              </div>
            ))}
          </div>
        </section>
      ))}
    </main>
  )
}
