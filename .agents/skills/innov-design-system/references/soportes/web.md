# Web y pantallas

## 1. Alcance

Sitio innov.as, landings de campaña y pantallas de Central IA que muestren la marca. Las specs de componentes están en `../componentes.md`, los tokens en `../../assets/tokens/` y las ilustraciones en `../ilustracion.md`.

## 2. Formatos y medidas

| Breakpoint | Ancho | Uso |
|---|---|---|
| Móvil | < 768px | Una columna; la barra se colapsa en menú |
| Tablet (`md`) | 768–1023px | Tarjetas de a dos |
| Escritorio (`lg`/`xl`) | ≥ 1024px | Contenedor máx. 1280px (`max-w-7xl`); tarjetas de a tres |

- Probar siempre en 375, 768 y 1440px.
- Fotos: WebP o AVIF desde `next/image`, registradas en `content/imagenes.ts`. Proporción 4:5 o 3:4 en tarjetas altas, 16:9 a sangre en bandas.
- Ilustraciones de la serie del cerebro: lienzo 4:3.

## 3. Grilla y márgenes

- Contenedor de 1280px centrado; el texto siempre dentro. Fotos, bandas oscuras y el bloque lateral pueden ir a sangre.
- Ancho de lectura de 60–75 caracteres (`max-w-2xl`/`max-w-3xl` en párrafos).
- **Una sección, un recurso pesado:** foto **o** esquema **o** tarjetas, no los tres.
- Se prefieren filas con filetes, columnas separadas por líneas y listas antes que grillas de tarjetas con el mismo peso.
- Lo que explica un proceso va **junto** a lo que se mira, no debajo de una imagen alta.

## 4. Tipografía

| Elemento | Token / clase | Fuente |
|---|---|---|
| H1 de hero | `text-hero` (56→72px) o `PosterHeading` | Newsreader 500, minúscula, palabra en itálica |
| Titular póster | `text-poster-sm` / `text-poster` / `text-poster-xl` | Newsreader 700, 1–4 palabras, uno por pantalla |
| H2 de sección | `text-3xl` (48px) a `text-2xl` (36px) | Newsreader 500 |
| H3 / tarjeta | `text-xl` (28px) a `text-lg` (22px) | Newsreader 500 |
| Cuerpo | `text-base` a `text-md` (16–18px), interlineado 1.5–1.6 | Schibsted Grotesk |
| Etiqueta de sección | `text-xs`/`text-sm` caja alta | IBM Plex Mono |
| Contador | `text-counter` (cifra sola) o `text-counter-sm` (fila) | Newsreader |

Nada de texto de lectura por debajo de 14px.

## 5. Color

Fondo `paper`, bloques alternos en `paper-soft`, tarjetas blancas con filete de tinta. Botón primario `teal` con texto blanco. Máximo **dos secciones oscuras** por página (`ink`), contando el hero del home; ahí van las variantes `-dark`/`-ui-dark`. Lima solo sobre `ink`, sobre foto con velo o como encendido de ilustración.

## 6. Logo

- **Barra:** `Logo` con `surface="light"` sobre papel y `surface="dark"` cuando la barra está sobre el hero oscuro; dentro de la barra en píldora, ≥120px de ancho.
- **Footer:** horizontal según el fondo.
- **Favicon:** en `public/`: `icon.svg`, `favicon.ico`/`favicon.png`, `icon.png` e `icon-light-32x32.png`/`icon-dark-32x32.png` según el tema del sistema. A 16px, el badge.
- Nunca el `-paper` sobre `ink`: ahí va el componente con `surface="dark"`.

## 7. Recursos de marca

### Hero

- **Home:** fondo oscuro con grano (`HeroGrano`): puntitos teal luz, ralos detrás del texto y densos a la derecha, que el cursor empuja y vuelven con resorte; algunos se encienden en lima. Titular "la IA de tu empresa, *de punta a punta*" y franja institucional debajo.
- **Páginas internas:** hero claro con un fondo animado propio por página (`HeroField`), que cuenta en abstracto lo que dice la página. Un patrón por página, nunca repetido; las legales no llevan. Tabla de patrones en `../componentes.md`.
- La trama siempre se apaga detrás de la columna de texto y en pantallas angostas.

### Fotografía (v1.6, solo sitio)

Entró por la referencia que dio el dueño (fotos grandes que dan color e impacto). La serie del cerebro sigue siendo el recurso de **producto**; la foto cuenta **equipo, trabajo y escala**.

- **Tratamiento común (obligatorio):** toda foto pasa por `Foto` (`components/foto.tsx`), que aplica `.foto`: `saturate(0.78)`, contraste suave y grano fino. Así fotos de orígenes distintos se leen como una serie.
- **Foto propia ya tratada** (las de teal y lima que manda Luli): se registra con `natural: true` y no recibe el filtro (`.foto-natural`).
- **Registro:** fotos propias en `public/images/`; todas se registran en `content/imagenes.ts` y las páginas las piden por nombre. Cambiar una foto es tocar ese archivo.
- **Referencias de Unsplash:** licencia libre, servidas desde su CDN. Para el sitio final se bajan al proyecto o se reemplazan por propias.
- **Texto sobre foto:** velo `ink` (degradé o plano) y acento lima, nunca `teal` ni `plum` a secas. Con foto oscura de color propio, el velo es más liviano del lado sin texto.
- **Dónde sí:** manifiesto del home (foto chica en píldora dentro de la línea), tarjetas de lo que contrata la empresa, banda de control, banda "Central IA viene con un equipo".
- **Dónde no:** recorrido por etapas, filas de agentes por rubro, Quiénes somos y continuidad. Ahí el texto y los esquemas van solos.
- **Sin caras reconocibles de clientes ni logos.** Son fotos de ambiente: no se presentan como casos ni como el equipo real.

### Estructura del home y de `/central-ia` (v1.6)

El comprador es una empresa grande que paga un proceso largo: el sitio muestra un equipo que acompaña de punta a punta, sobre una infraestructura, con agentes que van tomando trabajo.

- **Home:** hero → manifiesto → hoy ──→ con INNOV.AS → lo que contratás (infraestructura, agentes, equipo) → un proceso, no un proyecto (cinco etapas) → agentes que toman trabajo por rubro → control → quiénes somos → preguntas frecuentes y cierre.
- **`/central-ia`:** componentes y su beneficio (Brain, Agentes y Herramientas con la serie del cerebro, el resto en lista), continuidad cuando alguien se va, control por niveles, banda con el equipo y detalle para sistemas. Sin demos de cómo funciona por dentro.
- Detalle de cada componente en `../componentes.md`.

### Otros recursos

- **Contadores:** cifra con unidad y contexto; `size="sm"` en filas de datos.
- **CTA:** vive en la barra y en el cierre de la página. No se deja un botón suelto al final de una sección que ya tiene cierre.
- **Ilustraciones:** serie del cerebro, en las tarjetas de "Tres piezas" del home y en `/central-ia`. Ver `../ilustracion.md`.

### Movimiento propio del sitio

Además de la base del `SKILL.md`, el sitio admite estas animaciones continuas, todas solo mientras están en pantalla y quietas con `prefers-reduced-motion`:

- El fondo del hero (`HeroGrano` en el home, `HeroField` en las internas), uno por página.
- La marquesina lenta de la franja institucional (32s, pausa con el cursor).
- Las ilustraciones de la serie del cerebro.
- Las secuencias que avanzan solas (recorrido, rubros, continuidad), con barra de progreso, pausa con el cursor y selección manual.

## 8. Accesibilidad y legibilidad

- Contraste WCAG 2.1 AA en todo texto (los tokens lo garantizan si se respetan los usos).
- Foco visible en teal (`teal-dark` sobre oscuro).
- `alt` en toda foto con contenido; `aria-label` en las ilustraciones; decorativas con `alt=""`.
- `prefers-reduced-motion` respetado en todas las animaciones.
- Áreas táctiles de 44×44px mínimo.
- Fuentes self-hosted con `next/font`, sin saltos de layout.

## 9. Qué evitar

Grillas de tarjetas iguales, secciones que mezclan foto, esquema y tarjetas, botones sueltos al final de cada sección, texto sobre foto sin velo, teal sobre `ink`, lima como texto sobre papel, capturas del producto, popups al entrar, parallax, carruseles automáticos fuera de las secuencias documentadas.

## 10. Checklist

- [ ] `audit_tokens.py` sin violaciones; los avisos revisados a mano.
- [ ] Máximo dos secciones oscuras; variantes `-dark` en ellas.
- [ ] Un recurso pesado por sección.
- [ ] Fotos por `Foto`, registradas en `content/imagenes.ts`, solo donde corresponde.
- [ ] Un titular póster por pantalla y una sola palabra o frase destacada.
- [ ] Probado en 375, 768 y 1440px, con `prefers-reduced-motion` activado.
- [ ] Contraste AA y foco visible.

## 11. Notas por herramienta

- **Código (Next.js + Tailwind):** ver `SKILL.md` › Workflow código. El repo del sitio es la referencia viva: `app/globals.css`, `app/fonts.ts`, `components/`.
- **Herramientas de diseño de interfaces:** crear la paleta como variables con los mismos nombres de token (`paper`, `ink`, `teal`, `plum`, `lima`…) para que diseño y código hablen igual.
- **Verificación visual sin navegador interactivo:** capturas con un navegador sin interfaz a 1440 y 375px.
