import type { Cta } from "./types"

export interface Resource {
  title: string
  description: string
  href: string
  format: string
}

export const hero = {
  eyebrow: "// recursos → material educativo",
  title: "Recursos",
  subhead: "Guías y piezas para entender la transformación con IA antes de empezar un proyecto.",
  ctaPrimary: { label: "Hablemos", href: "/contacto" } as Cta,
}

export const resources: Resource[] = []
