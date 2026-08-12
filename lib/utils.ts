import { type ClassValue, clsx } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

/**
 * twMerge no conoce los tokens custom de app/globals.css (Tailwind v4 CSS-first,
 * sin tailwind.config). Sin esto, "text-poster" (tamaño) y "text-paper" (color)
 * caen en el mismo grupo genérico y se pisan entre sí — la clase que venga
 * después en cn(...) borra a la otra en vez de coexistir.
 */
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      color: [
        "paper", "paper-soft", "ink", "ink-70", "ink-40", "teal", "plum", "taupe",
        "brand", "line", "on-brand", "success", "danger",
        "vertical-company", "vertical-people",
        "ink-soft", "teal-dark", "teal-ui-dark", "plum-dark", "plum-ui-dark", "danger-dark",
      ],
      text: ["hero", "poster-sm", "poster", "poster-xl", "counter"],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
