import { Newsreader, Schibsted_Grotesk, IBM_Plex_Mono } from "next/font/google"

/** Títulos y marca: Newsreader, con itálica para la palabra destacada ("Central IA"). */
export const display = Newsreader({
  subsets: ["latin"],
  variable: "--font-display",
  style: ["normal", "italic"],
  axes: ["opsz"],
  display: "swap",
})

/** Texto corrido. */
export const sans = Schibsted_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

/** Etiquetas y notación. */
export const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
  display: "swap",
})
