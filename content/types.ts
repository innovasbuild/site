export interface Cta {
  label: string
  href: string
}

export interface SeoMeta {
  title: string
  description: string
}

export interface NavLink {
  label: string
  href: string
}

export interface FooterColumn {
  heading?: string
  links?: NavLink[]
}

/**
 * Cifra o dato pendiente de confirmar antes de publicar (ver docs/t3.1-copy-sitio-innovas.md).
 * Se muestra literal en la UI — no reemplazar por un valor inventado.
 */
export type Dato = string

export type Vertical = "company" | "people"
