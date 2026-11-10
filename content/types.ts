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

/**
 * Igual que T pero con los literales de string, number y boolean ensanchados a su tipo base.
 * Sirve para que el inglés cumpla la forma del español sin tener que repetir sus textos literales.
 */
export type Widen<T> = T extends string
  ? string
  : T extends number
    ? number
    : T extends boolean
      ? boolean
      : T extends (...args: never[]) => unknown
        ? T
        : T extends readonly unknown[]
          ? { [K in keyof T]: Widen<T[K]> }
          : T extends object
            ? { [K in keyof T]: Widen<T[K]> }
            : T
