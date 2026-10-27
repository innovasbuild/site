/**
 * Fotos del sitio. Por ahora son fotos de referencia de Unsplash (licencia libre, uso comercial permitido),
 * servidas desde su CDN. Cuando lleguen las fotos propias o un banco elegido, se reemplaza `src` acá y en
 * ningún otro lado.
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

/** Fotos propias, en public/images. `natural`: ya vienen tratadas (color y grano), no se les aplica el filtro común. */
const propia = (archivo: string, alt: string): Imagen => ({ src: `/images/${archivo}`, alt, natural: true })

export const imagenes = {
  // Infraestructura: estructura y escala.
  estructura: unsplash("photo-1609627016501-b862497c7294", "Estructura de acero vista desde abajo"),
  techoVidrio: unsplash("photo-1509024368907-57294758cfc5", "Techo de vidrio con estructura en grilla"),
  ciudadNoche: unsplash("photo-1603793510575-a8cf24361baa", "Ciudad de noche vista desde arriba, con las luces de los edificios"),

  // Equipo e implementación.
  taller: unsplash("photo-1532622785990-d2c36a76f5a6", "Dos personas trabajando sobre una pizarra"),
  tallerPizarra: unsplash("photo-1581091877018-dac6a371d50f", "Dos colegas ordenando ideas frente a una pizarra"),
  conversacion: unsplash("photo-1573497620053-ea5300f94f21", "Dos personas conversando en una oficina"),
  directorio: unsplash("photo-1573167507387-6b4b98cb7c13", "Equipo directivo reunido alrededor de una mesa"),
  equipoMesa: unsplash("photo-1603202662747-00e33e7d1468", "Equipo trabajando alrededor de una mesa en una oficina"),
  ejecutivos: unsplash("photo-1758518730037-a16581a040e8", "Profesionales reunidos alrededor de una mesa"),
  continuidad: propia("continuidad-traspaso.jpg", "Dos personas trabajando juntas frente a una computadora, en movimiento"),
  manifiestoBase: propia("manifiesto-base.jpg", "Edificio industrial visto desde arriba, rodeado de verde"),
  manifiestoAgentes: propia("manifiesto-agentes.jpg", "Pasillo entre filas de tableros y equipos"),
  manifiestoEquipo: propia("manifiesto-equipo.jpg", "Estructura de vigas en grilla vista desde abajo"),
  equipoPizarra: propia("equipo-pizarra.jpg", "Dos personas conversando frente a una pizarra"),
  reunionControl: propia("control-reunion.jpg", "Equipo directivo reunido alrededor de una mesa, a contraluz"),
  heroServicios: propia("servicios-hero.jpg", "Equipo reunido alrededor de una mesa larga, mirando a una persona que presenta en la pizarra"),
  equipoFondo: propia("equipo-fondo.jpg", "Ondas oscuras en verdes y lima, con grano"),
  centralIaHero: propia("central-ia-hero.jpg", "Ondas desenfocadas en verdes oscuros y lima, con grano"),
  comoTrabajamos: propia("como-trabajamos.jpg", "Dos personas frente a una pizarra, en movimiento"),
  rolesTuLado: propia("roles-tu-lado.jpg", "Silueta borrosa en verdes y lima, con luz de neón"),
  rolesNuestro: propia("roles-nuestro.jpg", "Dos esferas de luz en verde y lima sobre fondo oscuro"),
  socios: unsplash("photo-1758518731706-be5d5230e5a5", "Equipo conversando en una oficina moderna"),
  traspaso: unsplash("photo-1758876203342-fc14c0bba67c", "Dos colegas trabajando juntos en un escritorio"),

  // Operación.
  oficinaAbierta: unsplash("photo-1631193816258-28b44b21e78b", "Oficina de planta abierta con filas de escritorios"),
  operacion: unsplash("photo-1527192491265-7e15c55b1ed2", "Personas trabajando frente a monitores"),
  atencion: unsplash("photo-1766066014237-00645c74e9c6", "Equipo de atención trabajando con auriculares"),

  // Rubros.
  legajos: unsplash("photo-1583521214690-73421a1829a9", "Pilas de documentos y carpetas"),
  analista: unsplash("photo-1758876201660-103984519266", "Analista trabajando en su computadora"),
  biblioratos: unsplash("photo-1544396821-4dd40b938ad3", "Biblioratos ordenados en una estantería"),
} satisfies Record<string, Imagen>
