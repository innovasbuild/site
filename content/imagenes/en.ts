/**
 * Site photos (English alt text). The image sources are the same as in es.ts; when the photos change, update `src` in both files.
 */

export interface Imagen {
  src: string
  alt: string
  natural?: boolean
}

const unsplash = (id: string, alt: string): Imagen => ({
  src: `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=75`,
  alt,
})

/** Our own photos, in public/images. `natural`: already color-treated and grained, so the common filter is skipped. */
const propia = (archivo: string, alt: string): Imagen => ({ src: `/images/${archivo}`, alt, natural: true })

export const imagenes = {
  // Infrastructure: structure and scale.
  estructura: unsplash("photo-1609627016501-b862497c7294", "Steel structure seen from below"),
  techoVidrio: unsplash("photo-1509024368907-57294758cfc5", "Glass ceiling with a grid frame"),
  ciudadNoche: unsplash("photo-1603793510575-a8cf24361baa", "City at night seen from above, with the lights of the buildings"),

  // Team and implementation.
  taller: unsplash("photo-1532622785990-d2c36a76f5a6", "Two people working at a whiteboard"),
  tallerPizarra: unsplash("photo-1581091877018-dac6a371d50f", "Two colleagues organizing ideas at a whiteboard"),
  conversacion: unsplash("photo-1573497620053-ea5300f94f21", "Two people talking in an office"),
  directorio: unsplash("photo-1573167507387-6b4b98cb7c13", "Leadership team gathered around a table"),
  equipoMesa: unsplash("photo-1603202662747-00e33e7d1468", "Team working around a table in an office"),
  ejecutivos: unsplash("photo-1758518730037-a16581a040e8", "Professionals gathered around a table"),
  continuidad: propia("continuidad-traspaso.jpg", "Two people working together at a computer, in motion"),
  manifiestoBase: propia("manifiesto-base.jpg", "Industrial building seen from above, surrounded by greenery"),
  manifiestoAgentes: propia("manifiesto-agentes.jpg", "Aisle between rows of control panels and equipment"),
  manifiestoEquipo: propia("manifiesto-equipo.jpg", "Grid of steel beams seen from below"),
  equipoPizarra: propia("equipo-pizarra.jpg", "Two people talking in front of a whiteboard"),
  reunionControl: propia("control-reunion.jpg", "Leadership team gathered around a table, backlit"),
  heroServicios: propia("servicios-hero.jpg", "Team gathered around a long table, watching a person present at the whiteboard"),
  equipoFondo: propia("equipo-fondo.jpg", "Dark waves in greens and lime, with grain"),
  centralIaHero: propia("central-ia-hero.jpg", "Blurred waves in dark greens and lime, with grain"),
  comoTrabajamos: propia("como-trabajamos.jpg", "Two people in front of a whiteboard, in motion"),
  rolesTuLado: propia("roles-tu-lado.jpg", "Blurred silhouette in greens and lime, lit by neon"),
  rolesNuestro: propia("roles-nuestro.jpg", "Two spheres of green and lime light on a dark background"),
  socios: unsplash("photo-1758518731706-be5d5230e5a5", "Team talking in a modern office"),
  traspaso: unsplash("photo-1758876203342-fc14c0bba67c", "Two colleagues working together at a desk"),

  // Operations.
  oficinaAbierta: unsplash("photo-1631193816258-28b44b21e78b", "Open-plan office with rows of desks"),
  operacion: unsplash("photo-1527192491265-7e15c55b1ed2", "People working in front of monitors"),
  atencion: unsplash("photo-1766066014237-00645c74e9c6", "Support team working with headsets"),

  // Industries.
  legajos: unsplash("photo-1583521214690-73421a1829a9", "Stacks of documents and folders"),
  analista: unsplash("photo-1758876201660-103984519266", "Analyst working at a computer"),
  biblioratos: unsplash("photo-1544396821-4dd40b938ad3", "Binders lined up on a shelf"),
} satisfies Record<string, Imagen>

/** Accessible descriptions of the hand-drawn illustrations (components/illustrations/home.ts), by name. */
export const ilustraciones = {
  dolorAdopcion: "An assistant window full of notes and dashboards, with three empty windows pointing at it",
  dolorEscritura: "An open notebook with pencils coming at it from every side, overlapping lines and one crossed out",
  dolorFuga: "A document with an open padlock leaves the company for personal chat bubbles",
  piezaBrain: "A filing cabinet with organized folders, and two sheets with a stamp coming out of it",
  piezaAgentes: "A to-do list that checks itself off, with the last item waiting for a person's signature",
  piezaHerramientas: "Three windows (email, contacts, and a spreadsheet) plugged into the same board, each plug with its own key",
}
