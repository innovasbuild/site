import type { Config } from "tailwindcss";

/**
 * INNOV.AS — Tailwind config
 * Mapea los tokens de globals.css (fuente de verdad) a la escala de Tailwind
 * vía var(--...). No hardcodear hex acá: si falta un valor, se agrega primero
 * en globals.css. Entregable T3.2 → consumido por T3.3.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}", "./app/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: "var(--color-paper)",
          soft: "var(--color-paper-soft)",
        },
        ink: {
          DEFAULT: "var(--color-ink)",
          70: "var(--color-ink-70)",
          40: "var(--color-ink-40)",
        },
        teal: "var(--color-teal)",
        plum: "var(--color-plum)",
        taupe: "var(--color-taupe)",
        // semánticos
        brand: "var(--color-brand)",
        "vertical-company": "var(--color-vertical-company)",
        "vertical-people": "var(--color-vertical-people)",
        line: "var(--color-line)",
        "on-brand": "var(--color-on-brand)",
        success: "var(--color-success)",
        danger: "var(--color-danger)",
        // fondos oscuros (secciones puntuales — no es dark-mode de usuario,
        // ver T3.2 sección 2.1). Nunca usar `teal`/`plum` a secas sobre `ink`.
        "ink-soft": "var(--color-ink-soft)",
        "teal-dark": "var(--color-teal-dark)",
        "teal-ui-dark": "var(--color-teal-ui-dark)",
        "plum-dark": "var(--color-plum-dark)",
        "plum-ui-dark": "var(--color-plum-ui-dark)",
        "danger-dark": "var(--color-danger-dark)",
      },
      fontFamily: {
        display: "var(--font-display)",
        sans: "var(--font-sans)",
        mono: "var(--font-mono)",
      },
      fontSize: {
        xs: "var(--text-xs)",
        sm: "var(--text-sm)",
        base: "var(--text-base)",
        md: "var(--text-md)",
        lg: "var(--text-lg)",
        xl: "var(--text-xl)",
        "2xl": "var(--text-2xl)",
        "3xl": "var(--text-3xl)",
        hero: "var(--text-hero)",
        "poster-sm": "var(--text-poster-sm)",
        poster: "var(--text-poster)",
        "poster-xl": "var(--text-poster-xl)",
        counter: "var(--text-counter)",
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        DEFAULT: "var(--radius)",
        md: "var(--radius-md)",
        tape: "var(--radius-tape)",
      },
      boxShadow: {
        teal: "var(--shadow-teal)",
        plum: "var(--shadow-plum)",
        tape: "var(--shadow-tape)",
      },
      transitionTimingFunction: {
        brand: "var(--ease)",
        "out-quint": "var(--ease-out-quint)",
        tape: "var(--ease-tape)",
      },
    },
  },
  plugins: [],
};

export default config;
