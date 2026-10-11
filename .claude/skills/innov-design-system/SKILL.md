---
name: "innov-design-system"
description: "Sistema de identidad visual de INNOV.AS (\"Cálido / Notación de Transición\": paper/ink/teal/plum + Fraunces/Inter/Space Mono, capa editorial de escala póster y, desde la v1.2 de octubre 2026, hero con trama de puntos e ilustraciones a mano con procedimiento obligatorio). Usar SIEMPRE al construir, editar o revisar cualquier pieza de marca de INNOV.AS: sitio, decks, one-pagers, LMS o cualquier UI o documento que deba verse \"de INNOV.AS\". Activar también si se piden ilustraciones, dibujos a mano, diagramas, spots o un hero para INNOV.AS, o si se mencionan colores, paleta, tipografías, tokens, logo, isotipo, favicon, titulares póster o cintas. Incluye el logo canónico en assets/logo/ y las seis ilustraciones de referencia en assets/illustrations/. Regla dura: cero hex o fuentes hardcodeados, todo vía var(--...) o Tailwind; el logo siempre es el SVG; toda ilustración sigue los ocho pasos del procedimiento y se renderiza con HandDrawn."
---

# INNOV.AS — Design System

## Qué es

"Sistema Cálido / Notación de Transición": editorial cálido (papel tostado, serif humanista) + anotación técnica (mono, ticks, flecha) sobre neutros. La marca vive en la flecha de transición `A ──→ B` — codifica la tesis del negocio (toda transformación es un cambio de estado) y las dos verticales de INNOV.AS: `teal` (empresas / agéntico) y `plum` (personas / educación).

**Actualización agosto 2026:** se agregó una capa editorial de escala póster (inspirada en el *mecanismo* de referencias editoriales de agencia, no en su paleta) — titulares gigantes en Fraunces, cintas rotadas en mono, interlock texto/imagen, contadores animados y slots de ilustración a mano alzada. No es una paleta ni tipografía nueva: son componentes y tokens de escala que se suman al mismo contrato de 3 colores.

**Actualización octubre 2026 (v1.2):** decidida por Mati el 2026-10-10 al replantear el sitio con Central IA adelante. Paleta, tipografías y logo no cambian. Cambian cuatro cosas: la escala póster web baja un escalón, el hero oscuro lleva una trama de puntos en WebGPU (`HeroDots`), la ilustración pasa de diagrama puro a objetos y diagramas con dos acentos (`HandDrawn`), y las reglas de movimiento admiten el dibujo progresivo de ilustraciones y el fondo animado del hero.

Esto no es una preferencia estética a discutir en cada tarea — ya fue definido, aprobado por Mati, y tiene tokens de código listos (`assets/tokens/`). El trabajo de cualquier pieza nueva es **aplicar** este sistema, no reinventar paleta, tipografía o mecanismos editoriales.

## Regla dura para código

**Cero hex, cero nombres de fuente hardcodeados en JSX/TSX.** Todo color y tipografía se consume vía `var(--...)` (CSS) o clases Tailwind que ya mapean a esos tokens (`bg-paper`, `text-ink`, `text-teal`, `font-display`, etc.). Un valor que no está en los tokens no se inventa: se agrega al contrato primero (edita `globals.css`, después úsalo).

**Regla dura para titulares póster:** en lienzos de tamaño fijo (slides, print/.docx/.pdf) usar siempre `--text-poster-slide-sm/--text-poster-slide/--text-poster-slide-xl` (px absolutos, calibrados sobre 1280×720) — nunca la escala clamp de web (`--text-poster-sm/--text-poster/--text-poster-xl`, que mide contra el viewport del navegador y en una slide cambiaría de tamaño según el ancho de la ventana, no de la slide). En componentes se pide con `scale="slide"`.

## Tokens — resumen rápido

| Token | Hex | Rol | Contraste |
|---|---|---|---|
| `paper` | `#EDE8DC` | Superficie base | — |
| `paper-soft` | `#E4DDCC` | Tarjeta / bloque secundario | — |
| `paper-print` | `#FAF8F5` | Superficie base **solo .docx/.pdf** — el oat pesa en lectura larga | — |
| `ink` | `#1F1B19` | Texto y estructura | 13.98:1 (AAA) |
| `teal` | `#0F6B60` | **Marca** · empresas · agéntico | 5.22:1 (AA) |
| `plum` | `#8C3B5D` | Personas · educación | 5.93:1 (AA) |
| `taupe` | `#A79E8E` | Bordes/ticks/metadatos — **nunca texto esencial chico** | 2.17:1, no pasa AA |

Reglas de uso: `teal` manda como color de marca. `plum` entra solo para codificar la vertical personas (kickers, barras, íconos, cintas de esa vertical) — nunca como relleno masivo, y nunca junto a `teal` con igual peso en un mismo componente. En una pieza de vertical empresas, `plum` puede aparecer puntualmente en slides/secciones de equipo o transferencia de capacidades — la restricción es por sección, no "la pieza entera es teal".

**Tipografía:** Fraunces (display — H1-H3, wordmark, titulares póster, cifras; `opsz`/`SOFT` variables para calidez, `SOFT 0`/`WONK 0`/peso 900 en escala póster) · Inter (texto/UI) · Space Mono (notación: firma `A→B`, estados, datos, cintas — nunca párrafos).

**Escala póster (web, clamp, v1.2: un escalón menos):** `--text-poster-sm` clamp(40→64) · `--text-poster` clamp(44→96) · `--text-poster-xl` clamp(56→176). La escala de slide/print no cambió. **Escala póster (slide/print, px fijo):** `--text-poster-slide-sm` 84px · `--text-poster-slide` 96px · `--text-poster-slide-xl` 104px. Los titulares póster van de **1 a 4 palabras** (Fraunces estirada, no condensada — una frase larga no entra y pierde el golpe). Máximo **un** titular póster por pantalla o slide.

Tabla completa de tokens en `assets/tokens/globals.css` — es la fuente ejecutable, no la reescribas de memoria.

### Fondos oscuros (secciones puntuales del sitio, slides — no es dark-mode de usuario)

Cuando una sección, componente o slide se diseña sobre fondo oscuro a propósito, **`teal` y `plum` "a secas" no sirven ahí** — están calibrados para leerse sobre `paper` y no pasan contraste WCAG sobre `ink`. Existe una variante calculada y verificada:

| Contexto | Fondo | Texto principal | Acento teal | Acento plum |
|---|---|---|---|---|
| Oscuro | `bg-ink` (o `bg-ink-soft` para tarjeta elevada) | `text-paper` | `text-teal-dark` (texto/íconos chicos) · `bg-teal-ui-dark` (fill de botón/texto grande) | `text-plum-dark` · `bg-plum-ui-dark` |

**Regla dura:** nunca combines `bg-ink`/`bg-ink-soft` con `text-teal`, `bg-teal`, `text-plum` o `bg-plum` sin sufijo `-dark`/`-ui-dark`. Máximo 2 pantallas/slides oscuras por pieza. `scripts/audit_tokens.py` detecta esta combinación a nivel archivo (heurística — si el script no dice nada igual revisá a ojo).

## Logo

El logo es **isotipo + wordmark**, ambos vectores cerrados. Reemplaza el wordmark tipográfico anterior (`innovas` compuesto en Fraunces con superíndice `[A→B]`), que queda **deprecado**.

- **Isotipo:** perfil humano trazado como circuito — las pistas entran por la izquierda y cierran el contorno de la cara. Misma tesis que la flecha `A ──→ B`: entrada → transformación → estado. Convive con la flecha, no la reemplaza: la flecha sigue siendo el elemento gráfico de composición, el logo es la firma institucional.
- **Wordmark:** `INNOV.AS` es **lettering vectorizado, no texto vivo**. No se recompone tipeando en Fraunces ni en ninguna otra fuente — siempre se usa el SVG. Si necesitás el nombre como texto corriente (título, cuerpo), eso es texto en Fraunces/Inter y no es el logo.

### Variantes — archivos en `assets/logo/`

| Archivo | Lienzo | Isotipo | Wordmark | Dónde va |
|---|---|---|---|---|
| `innovas-horizontal-ink.svg` | 991×319, transp. | `teal` | `ink` | **Primaria.** Cualquier fondo claro: `paper`, `paper-print`, blanco |
| `innovas-horizontal-dark.svg` | 991×319, transp. | `teal-dark` | `paper` | Fondo `ink`/`ink-soft` — slides y secciones oscuras |
| `innovas-horizontal-paper.svg` | 991×319, transp. | `teal` | `paper` | Export plano que conserva el isotipo en teal original. **No tiene superficie segura dentro del sistema**: sobre `ink` el isotipo queda en 2.68:1. Usalo solo sobre foto o fondo medio verificando el contraste a mano — para fondo `ink` va `-dark` |
| `innovas-badge-lockup-teal.svg` | 747×741, fondo `teal` | `paper` | `paper` | Avatar cuadrado: LinkedIn, redes, app icon, sello de cierre de deck |
| `innovas-badge-iso-teal.svg` | 747×741, fondo `teal` | `paper` | — | Avatar donde el nombre ya aparece al lado (perfil de red, favicon chico) |
| `innovas-isotipo-teal.svg` · `-ink.svg` · `-paper.svg` | 174×221, transp. | según nombre | — | Favicon ≥24px, marca de agua, bullet de marca |
| `innovas-horizontal-mono-ink.svg` · `-paper.svg` | 991×319, transp. | mono | mono | Solo cuando la pieza exige monocromía: franja institucional de un tercero, impresión a 1 tinta |

### Reglas duras

**1 · Contraste (calculado, no estimado).**

| Combinación | Ratio | |
|---|---|---|
| `teal` sobre `paper` | 5.22:1 | ✅ |
| `teal` sobre blanco | 6.38:1 | ✅ |
| `ink` sobre `paper` | 13.98:1 | ✅ |
| `paper` sobre `teal` (badges) | 5.22:1 | ✅ |
| `teal-dark` sobre `ink` | 4.51:1 | ✅ |
| `teal` sobre `ink` | **2.68:1** | ❌ no llega ni a 3:1 |

Por eso sobre fondo oscuro va `innovas-horizontal-dark.svg` — nunca el `-ink` recoloreado a mano ni el `-paper` conservando el isotipo teal original. Es el mismo criterio que ya rige para `teal`/`plum` en la sección de fondos oscuros.

**2 · Tamaño mínimo (medido rasterizando, no estimado).** Horizontal: **120px de ancho** — a 100px los serifs del wordmark empiezan a cerrarse, a 80px las pistas del circuito se funden. Isotipo suelto: **24px** — a 20px es el límite, a 16px las pistas colapsan en una mancha. Para un **favicon de 16px usá el badge**, no el isotipo transparente: el fondo teal sólido sostiene la lectura donde el trazo no.

**3 · Área de resguardo.** Los archivos ya la traen incorporada: en el horizontal son 90px sobre el lienzo de 991×319 (≈ 0.52× el ancho del isotipo) a izquierda, arriba y derecha, y 48px abajo. Si recortás el SVG a su bounding box, reponé ese margen. Nada entra en esa zona — ni texto, ni cinta, ni borde.

**4 · No se toca.** No se recolorea fuera de la tabla de variantes · nada de degradé, sombra ni blur · no se rota · no se estira (escalá siempre proporcional) · no se separa el isotipo del wordmark para armar un lockup propio — los dos lockups aprobados son el horizontal y el badge vertical · no se le agrega tagline. El set anterior con tagline **BUILD SOLUTIONS** y la **N invertida** queda **deprecado**: no va en ninguna pieza nueva.

**5 · En código.** El sitio ya tiene el logo como componente (`components/logo.tsx`, prop `surface="light" | "dark"`) consumiendo `var(--color-teal)` / `var(--color-teal-dark)` / `var(--color-ink)` / `var(--color-paper)`. En un proyecto Next.js usá el componente; los SVG de `assets/logo/` son para piezas fuera de código. Los hex literales dentro de esos SVG son la excepción explícita a "cero hex hardcodeado" — igual que `assets/tokens/`, son archivos de contrato.

## Capa editorial — componentes (agregado agosto 2026)

Cuatro adiciones que no reemplazan nada del sistema previo, lo escalan:

| Componente | Qué hace | Regla clave |
|---|---|---|
| **TapeLabel** | Etiqueta cinta rotada en mono, versión física del marcador de sección (`// 03 ──→`) | Máximo **2 cintas** por composición, 1–2 palabras cada una. Ángulos `--tape-rot -6.5deg` / `--tape-rot-alt 5.5deg`. Sombra sólida `--shadow-tape`, nunca blur |
| **PosterHeading** | Titular a escala póster | 1–4 palabras, `scale="slide"` en lienzos fijos, `SOFT 0`/`WONK 0`/peso 900, `line-height` 0.84 (0.78 en xl) |
| **InterlockHeadline** | Interlock texto/imagen: un bloque de imagen incrustado dentro de una línea de titular póster | Alto del bloque `--interlock-h` (0.78em), gap `--interlock-gap` |
| **StatCounter** | Cifra grande en Fraunces que cuenta desde 0 al entrar en viewport (IntersectionObserver 40%, 1200ms) | Cifra siempre con unidad y contexto en una línea secundaria — nunca un número suelto |
| **IllustrationSlot** | Andamio que sostiene el layout mientras una ilustración no está hecha | Se reemplaza por una pieza `HandDrawn` que cumpla la spec de ilustración v1.2, nunca por un ícono o clipart genérico |
| **HandDrawn** (v1.2) | Ilustración a mano en SVG que se dibuja al entrar en pantalla | Spec completa en "Ilustración (v1.2)" más abajo. En el sitio: `components/illustrations/hand-drawn.tsx` más un archivo de trazos por conjunto |
| **HeroDots** (v1.2) | Fondo del hero oscuro: trama de puntos tipo semitono en WebGPU | Spec en "Hero con trama de puntos (v1.2)". Un solo uso por página, solo en el hero. En el sitio: `components/hero-dots.tsx` |

## Ilustración (v1.2)

Reemplaza la spec de trazo fino, acento único y registro solo diagramático.

- **Registro:** objetos y diagramas. Objetos reconocibles de trabajo (ventana de asistente, nota, carpeta, fichero, cuaderno, lápiz, llave, candado, enchufe, burbuja de chat, planilla) combinados con flechas y nodos. **Sin personas**, caras ni manos. Sin isométrico, 3D, degradé ni sombra difusa.
- **Trazo:** tipo marcador, **3.2px** en `ink`, extremos y uniones redondeados, sin relleno. Irregularidad de mano visible y pareja en toda la pieza.
- **Color:** dos acentos planos por pieza, con pesos distintos. **Teal** es el principal: un bloque de **38 a 54px** de lado, rotado unos **7°**, sobre el elemento que importa. **Plum** es un detalle: un bloque de hasta **30px**, rotado en sentido contrario, que lleva el guiño. Encima de un acento puede ir una marca corta en `paper` (un tilde, una cruz, un signo). Es la única excepción a la regla de no juntar teal y plum en un componente, y vale porque plum siempre pesa menos.
- **Hachurado:** fuera en v1.2. Las superficies de color son planas.
- **Tono:** claro y con un guiño. La idea se entiende a primera vista y hay un solo detalle con humor (un candado que quedó abierto, un renglón tachado). Un guiño por pieza.
- **Complejidad:** una idea por ilustración, hasta unos 45 trazos. Lienzo `viewBox 0 0 400 300`, fondo transparente, pensada para apoyarse sobre `paper` o `paper-soft`.
- **Texto:** ninguno dentro del dibujo. Va `aria-label` con la descripción.
- **Movimiento:** cada trazo se dibuja una vez cuando la pieza entra en pantalla (ver Motion).

### Procedimiento de ilustración (obligatorio)

Decisión de Mati del 2026-10-10: toda ilustración de INNOV.AS se hace siguiendo estos pasos, que son los que produjeron las seis del home. El objetivo es consistencia total entre piezas hechas en sesiones distintas.

1. **Concepto antes de dibujar.** Por cada pieza, escribir en una línea qué situación concreta muestra, con qué objetos, y cuál es el guiño. Presentárselo a quien la pidió y esperar el visto bueno. Una idea y un guiño por pieza.
2. **Mirar las existentes.** Abrir `assets/illustrations/home.ts` (en el repo del sitio, `components/illustrations/home.ts`) y los SVG ya renderizados de `assets/illustrations/svg/`, y usar esas seis como referencia de vocabulario, densidad y proporciones. Reutilizar los objetos que ya existen (ventana, nota, carpeta, llave, candado, burbuja, lápiz) con la misma construcción.
3. **Dibujar como lista de trazos.** Lienzo 400x300. Un `path` por trazo, escrito a mano: rectángulos con esquinas en curva, coordenadas apenas desparejas, líneas que no cierran perfecto. Hasta unos 45 trazos. Sin texto.
4. **Poner los acentos.** Un bloque teal de 38 a 54px rotado unos 7° sobre lo que importa, y un detalle plum de hasta 30px rotado en sentido contrario con el guiño. Marca en `paper` encima solo si aporta.
5. **Renderizar con `HandDrawn`.** Nunca un SVG suelto con otros valores: el componente fija el grosor de 3.2px, los extremos redondeados, el filtro de temblor (`feTurbulence` 0.035, dos octavas, semilla 7, desplazamiento 3.4), los colores por token y el dibujo al entrar en pantalla. El componente viaja en este skill (`assets/illustrations/hand-drawn.tsx`): en un proyecto que no lo tenga, se copia tal cual. Para una pieza fuera de código (deck, documento) o una sesión sin navegador, se arma el SVG estático con la misma estructura que los de `assets/illustrations/svg/`: mismo filtro, mismo grosor, colores en hex de la paleta.
6. **Verla en contexto.** Montarla en una tarjeta real junto a su título y su texto (en el sitio, una página temporal sin links que se borra al terminar), capturar la pantalla y mirarla al tamaño en que se va a usar.
7. **Revisarla con honestidad.** Se entiende sin leer el texto? El guiño se ve a ese tamaño? Parece de la misma familia que las otras? Algún objeto se confunde con otra cosa? Lo que no pase se redibuja antes de mostrarlo, y lo que quede flojo se dice.
8. **Mostrar y ajustar.** Presentar la captura con una línea por pieza sobre cómo quedó, y redibujar lo que se pida.

`references/prompt-gema-ilustraciones.md` está actualizado a la v1.2 y queda solo como brief de estilo si alguna vez se encarga una pieza afuera.

## Hero con trama de puntos (v1.2)

Reemplaza la red de nodos del hero del home, que quedaba cargada. Es atmósfera: no cuenta el producto, eso lo hace el titular.

- **Qué es:** una grilla de puntos tipo semitono sobre `ink`. El radio de cada punto respira con un campo lento. Puntos en tono `paper`, apagados, con una zona que se enciende en `teal-dark` y deriva despacio.
- **Cursor:** la trama se abre apenas alrededor del cursor. Sutil: se descubre sin competir con el titular ni con el botón.
- **Texto primero:** la trama se apaga detrás de la columna de texto y gana presencia hacia la derecha. En pantallas angostas se atenúa entera.
- **Tecnología:** WebGPU con la librería `vgpu`, shader WGSL en un componente cliente. Los colores se leen de los tokens CSS en tiempo de ejecución.
- **Obligatorio:** sin WebGPU cae a una trama estática en CSS; con `prefers-reduced-motion` queda quieta y sin reacción al cursor.
- **Límites:** solo en el hero oscuro, una vez por página. Cuenta como una de las dos secciones oscuras que admite una pieza. En slides y documentos se usa una captura fija del mismo shader.
- **Valores** (aprobados por Mati el 2026-10-11): paso de grilla 18px, punto 0.62, velocidad 0.12, radio del cursor 190px, foco 0.9.

Ya existían del inventario original (`direccion-de-arte.md` § 4-5) y siguen vigentes sin cambios: `Wordmark`, `TransitionArrow`, `SectionMarker`, `Button`, `LevelCard`, `InstitutionalStrip`, `LevelPath` (camino de 4 niveles, gradiente `plum → teal` en pasos discretos 0/34/67/100%), `VerticalRail`, `SegmentedIntent`.

**Bloque de color a sangre lateral:** franja vertical de `--colorblock-w-narrow` (14vw) o `--colorblock-w` (24vw) en teal, tocando los cuatro bordes de su lado. Único elemento full-bleed de color del sistema — portada y cierre.

## Iconografía

**No hay set de íconos.** El sistema resuelve glifos con **notación mono en caracteres Unicode**, no con un icon set: `──→`/`→` (elemento firma), `//` (prefijo de marcador), `▪`/`░` (bullets y barra de progreso `[▪▪▪▪░░] 4/6`), `·` (separador de metadatos), `[ ]` (encierra superíndices/códigos). Todos en Space Mono, heredan el tamaño de la línea, color de la vertical cuando corresponde. Si algún día hace falta un set real: trazo lineal 1.5px, radio 2px — **Lucide** es la sustitución candidata, pero no está aplicada en ninguna pieza; confirmar antes de usar.

## Motion (nivel "medio", actualizado en v1.2)

Ease por defecto `--ease` `cubic-bezier(0.2,0.6,0.2,1)`; revelados `--ease-out-quint`; cintas `--ease-tape` (con overshoot).

**Se anima:** reveal de titular por palabra/línea (stagger 70ms, 620ms) · cintas entrando 0°→ángulo final con escala 0.86→1 (420ms) · contadores (1200ms) · camino de 4 niveles (fade-up 80ms/nodo) · flecha A→B (`stroke-dashoffset`, 1000ms) · hover de CTA (`translateY(-1px)` + sombra sólida).

**Nuevo en v1.2:**
- **Dibujo de ilustraciones.** Cada trazo se dibuja con `stroke-dashoffset` (620ms, `--ease-out-quint`, 40ms de escalonado entre trazos) y los acentos entran con escala 0.86→1 (420ms, `--ease-tape`). Se dispara una sola vez, cuando el 40% de la pieza entra en pantalla, y queda quieta.
- **Fondo del hero.** `HeroDots` se mueve solo y en continuo. Es la única animación en bucle del sistema.

**No se anima:** texto de cuerpo, logos institucionales, nada parallax ni atado a la posición del scroll, y ningún otro bucle o auto-play fuera del fondo del hero. Las entradas al aparecer en pantalla (titulares, contadores, ilustraciones) se disparan una vez y no siguen al scroll.

`prefers-reduced-motion`: todas las duraciones a 0ms, ilustraciones ya dibujadas y fondo del hero quieto. Obligatorio, no opcional.

> ⚠️ Sin resolver: la franja institucional del sitio (`InstitutionalStrip`) corre como marquesina, y esta sección la excluye desde antes de la v1.2. Queda por decidir si se detiene o se suma como excepción.

## Workflow — implementación en código (Next.js/Tailwind)

1. **Verificá si el proyecto ya tiene los tokens** (buscá `--color-teal` o `--text-poster` en el CSS global). Si no existen, o si existen sin la capa editorial: copiá `assets/tokens/globals.css` al stylesheet global y fusioná `assets/tokens/tailwind.config.ts` (bloque `theme.extend`) — no sobrescribas el config entero.

2. **Fuentes self-host con `next/font`** (nunca `<link>` a Google Fonts ni `@import`):

   ```ts
   // app/fonts.ts
   import { Fraunces, Inter, Space_Mono } from "next/font/google";

   export const fraunces = Fraunces({
     subsets: ["latin"],
     variable: "--font-display",
     axes: ["opsz", "SOFT", "WONK"],
     display: "swap",
   });

   export const inter = Inter({
     subsets: ["latin"],
     variable: "--font-sans",
     display: "swap",
   });

   export const spaceMono = Space_Mono({
     subsets: ["latin"],
     weight: ["400", "700"],
     variable: "--font-mono",
     display: "swap",
   });
   ```

   Aplicá las tres clases `variable` en el elemento raíz. `next/font` sobreescribe los `--font-*` de `globals.css` con el stack real self-hosted.

3. **Construí con clases Tailwind mapeadas a tokens** (`bg-paper text-ink`, `text-teal font-display`, `border-ink font-mono text-xs`, `text-poster`, `shadow-ink`, `rounded-tape`), nunca `style={{color:"#..."}}` ni `bg-[#0F6B60]`.

4. **Auditá antes de entregar:**

   ```bash
   python3 scripts/audit_tokens.py <archivos-o-carpeta-tocados>
   ```

5. **Specs de componentes** (elemento firma, camino de 4 niveles, hero, card de nivel, franja institucional, CTA, motion) en `references/direccion-de-arte.md` §4-5; **capa editorial** (PosterHeading, TapeLabel, InterlockHeadline, StatCounter, IllustrationSlot) en el addendum al final del mismo archivo. No reinventes estos componentes desde cero: ya están especificados.

6. **Referencia visual navegable:** `assets/style-tile.html` — cubre paleta/tipografía/componentes base. **No incluye aún la capa editorial** (titulares póster, cintas, interlock, contadores) — para eso, revisar el addendum de `direccion-de-arte.md` o los templates del design system vivo hasta que se actualice.

## Workflow — piezas sin código (decks, one-pagers, branding del LMS)

Estas piezas no consumen `var(--...)` — necesitan los valores literales. Usá `references/non-code-usage.md`: paleta/tipografía en hex directo, la capa editorial en valores literales (tamaños de titular póster para slide/print, ángulos y specs de cinta, spec de ilustración, formato de contador), y las mismas reglas de uso. No inventes una paleta o mecanismo "similar" — es la misma marca.

**Excepción de fondo para .docx y .pdf:** el fondo/superficie base es `#FAF8F5` (`paper-print`), no `#EDE8DC`. El resto de la paleta no cambia.

## Recursos del skill

- `references/direccion-de-arte.md` — guía de dirección de arte (T3.2) + addendum agosto 2026 con la capa editorial.
- `references/non-code-usage.md` — cheat sheet de marca para piezas sin código, con capa editorial incluida.
- `assets/tokens/globals.css` + `assets/tokens/tailwind.config.ts` — fuente de verdad ejecutable, incluye tokens de escala póster, cintas, interlock, contadores e ilustración.
- `assets/logo/` — logo canónico en SVG: horizontal (`-ink` / `-dark` / `-paper` / mono), badges cuadrados sobre teal (lockup e isotipo) e isotipo suelto (teal / ink / paper).
- `assets/illustrations/` — componente `hand-drawn.tsx`, los trazos de las seis ilustraciones del home (`home.ts`) y sus SVG ya renderizados (`svg/`). Son la referencia de estilo de toda ilustración nueva.
- `assets/components/hero-dots.tsx` — el fondo de trama de puntos del hero, con su shader (requiere la librería `vgpu`).
- `assets/style-tile.html` — referencia visual navegable de la paleta/tipografía/componentes base (pendiente de actualización con la capa editorial).
- `scripts/audit_tokens.py` — detecta hex y fuentes hardcodeadas fuera de los archivos de tokens.

## Mantenimiento

Este skill empaqueta una copia de `innov/diseno/` (carpeta local de Mati, fuente original) para que funcione de forma autocontenida en cualquier sesión. Si la dirección de arte cambia, actualizá primero `innov/diseno/` y el brain (`marketing/identidad-visual-innovas.md`), y después sincronizá este skill — no al revés.

**Versión:** 1.2 (octubre 2026) — decidida por Mati el 2026-10-10. Escala póster web un escalón menos; hero oscuro con trama de puntos en WebGPU (`HeroDots`, con `vgpu`); ilustración de objetos y diagramas con trazo marcador de 3.2px, acento teal y detalle plum (`HandDrawn`), sin hachurado; dibujo progresivo de ilustraciones y fondo animado del hero admitidos en Motion. Actualizados en esta versión: este archivo, `references/prompt-gema-ilustraciones.md`, `assets/tokens/globals.css` y los addendum de `references/direccion-de-arte.md` y `references/non-code-usage.md`. El camino de producción de ilustraciones es el procedimiento de la sección "Ilustración (v1.2)". Pendiente: refrescar `assets/style-tile.html` y resolver la marquesina de la franja institucional.

**1.1** (agosto 2026) — incorpora el **logo canónico** (isotipo circuito + wordmark `INNOV.AS`) con sus siete variantes en `assets/logo/`, reglas de superficie con contraste calculado, tamaños mínimos medidos y área de resguardo; depreca el wordmark tipográfico anterior y el set con tagline BUILD SOLUTIONS / N invertida.

**1.0** (agosto 2026) — incorpora la capa editorial de escala póster (PosterHeading, TapeLabel, InterlockHeadline, StatCounter, IllustrationSlot) sobre el sistema base "Cálido / Notación de Transición", más la recalibración v1.0 de la spec de ilustración a mano alzada: trazo 3.2px (antes 1.6px), acento 38–54px rotado 7° (antes 28–46px), e incorporación del hachurado a mano para superficies con color (grosor de hachura = 50% del trazo principal), con irregularidad de trazo más marcada. Pendiente para una próxima sincronización: propagar esta recalibración a `references/prompt-gema-ilustraciones.md`, `references/direccion-de-arte.md`, `references/non-code-usage.md` y `assets/tokens/globals.css` (`--illus-stroke`, `--illus-accent-size`, sumar `--illus-accent-rot` y `--illus-fill-stroke`), refrescar `assets/style-tile.html` con ejemplos de la capa editorial, y sumar los **logos institucionales** (BM, BID, FAO, SAGyP) en monocromo para la franja de credibilidad — el logo propio ya quedó incorporado en 1.1.
