---
name: "innov-design-system"
description: "Sistema de identidad visual de INNOV.AS y de su plataforma Central IA: paleta papel/tinta/teal/lima, Newsreader/Schibsted Grotesk/IBM Plex Mono, escala póster, hero con grano, ilustraciones de la serie del cerebro (Brain, agente robot, herramientas que se enchufan). Usar SIEMPRE al crear, editar o revisar cualquier pieza de marca de INNOV.AS: sitio, decks, one-pagers, Word, PDF o UI. Activar también con ilustraciones, dibujos, cerebro, robot o agentes dibujados, diagramas, hero, colores, tipografías, tokens, logo, favicon, titulares póster, camino del cliente o voz de marca. Reglas duras: cero hex o fuentes hardcodeados (var(--...) o Tailwind); el logo siempre es el SVG; las ilustraciones nuevas siguen el lenguaje de la serie del cerebro; los Word llevan fondo blanco."
---

# INNOV.AS — Design System

## Qué es

"Sistema Cálido / Notación de Transición": editorial cálido (papel claro, serif de lectura) + anotación técnica (mono, ticks, flecha) sobre neutros. Es la identidad de INNOV.AS, la empresa que ofrece servicios sobre su plataforma, Central IA. La marca vive en la flecha de transición `A ──→ B`, que codifica la tesis del negocio: la empresa pasa de IA suelta (A) a IA con gobierno (B). Los dos acentos tienen rol semántico: `teal` es la plataforma (sistema, agentes, herramientas) y el segundo color (token `plum`: oliva sobre claro, lima sobre oscuro, desde la v1.5) es la gente de la empresa (quién decide, quién aprueba, el guiño), la misma idea de "tu gente decide, los agentes ejecutan".

**Actualización agosto 2026:** se agregó una capa editorial de escala póster (inspirada en el *mecanismo* de referencias editoriales de agencia, no en su paleta) — titulares gigantes (hoy en Newsreader), cintas rotadas en mono, interlock texto/imagen, contadores animados y slots de ilustración a mano alzada. No es una paleta ni tipografía nueva: son componentes y tokens de escala que se suman al mismo contrato de 3 colores.

**Actualización octubre 2026 (v1.2):** decidida por Mati el 2026-10-10 al replantear el sitio con Central IA adelante. Paleta, tipografías y logo no cambian. Cambian cuatro cosas: la escala póster web baja un escalón, el hero oscuro lleva una trama de puntos en WebGPU (`HeroDots`), la ilustración pasa de diagrama puro a objetos y diagramas con dos acentos (`HandDrawn`), y las reglas de movimiento admiten el dibujo progresivo de ilustraciones y el fondo animado del hero.

**Actualización octubre 2026 (v1.6, venta enterprise):** definida por Luli el 2026-10-27 a partir de la devolución del dueño de INNOV.AS sobre la v1.5, y validada por Mati el 2026-10-27 al pasarla al brain. El sitio se vende a empresas grandes como un proceso de punta a punta, no como una plataforma. Paleta, tipografías y logo no cambian. Cambian tres cosas: entra la **fotografía** como recurso del sitio (sección propia), el **home** se reordena alrededor de lo que contrata la empresa (infraestructura, agentes y equipo) y de un proceso que se recorre etapa por etapa, y **`/central-ia`** se cuenta por componentes y beneficios, sin demos de cómo funciona. Detalle en las secciones "Fotografía (v1.6)" y "Home y Central IA de venta enterprise (v1.6)".

**Actualización octubre 2026 (v1.5, rediseño "B + C"):** definida por Luli el 2026-10-26 y validada por Mati el 2026-10-27. Cambian paleta y tipografía: papel `#F6F4EF`, tinta `#15191A`, teal de marca sin cambios, y el segundo color pasa de `plum` a oliva `#4F6B00` sobre claro y **lima `#D4F36B`** sobre oscuro (los tokens siguen llamándose `plum`/`plum-dark`). Títulos en **Newsreader** (500, en minúscula, palabra destacada en itálica), texto en **Schibsted Grotesk**, etiquetas en **IBM Plex Mono** (`03 · CONTROL`). Barra oscura con los links en pill, botones en pill, tarjetas blancas con filete de tinta. Las ilustraciones de las piezas pasan a la **serie del cerebro** (sección propia más abajo), que reemplaza a las escenas en volumen de la v1.4 en el sitio. Rige para **toda pieza** (sitio, decks, Word, PDF), no solo el sitio. La v1.6.1 (2026-10-27) sube `plum-ui-dark` a `#516E00` para que pase 3:1 sobre `ink` y deja el sitio con esta misma paleta (antes usaba óxido `#B0441F` como segundo color).

**Actualización octubre 2026 (v1.4):** decidida por Mati el 2026-10-22 a partir de un pedido de Marcos (las ilustraciones a mano no cerraban para la venta corporativa). Las ilustraciones del sitio (las tres piezas del producto y, desde el mismo día, los tres dolores) pasan a escenas animadas en volumen, en WebGPU, que reaccionan al cursor (`AgentScene`). Los agentes se representan como bots con visor y ojos. Las ilustraciones a mano quedan como respaldo sin WebGPU y para piezas fuera del sitio.

**Actualización octubre 2026 (v1.3):** decidida el 2026-10-20 para alinear la identidad con el reposicionamiento del 2026-10-09 (Central IA adelante, En Paralelo a un costado, Desde Adentro despublicada). Paleta, tipografías, logo y todo lo de la v1.2 no cambian. Cambian cinco cosas: `teal` y `plum` pasan a codificar plataforma y gente en lugar de empresas y personas; el camino de 4 niveles educativo pasa a ser el camino del cliente; las piezas de marca siguen reglas de contenido y voz (sección propia); los documentos Word llevan fondo blanco; y se suma una guía para decks.

Esto no es una preferencia estética a discutir en cada tarea — ya fue definido, aprobado por Mati, y tiene tokens de código listos (`assets/tokens/`). El trabajo de cualquier pieza nueva es **aplicar** este sistema, no reinventar paleta, tipografía o mecanismos editoriales.

## Regla dura para código

**Cero hex, cero nombres de fuente hardcodeados en JSX/TSX.** Todo color y tipografía se consume vía `var(--...)` (CSS) o clases Tailwind que ya mapean a esos tokens (`bg-paper`, `text-ink`, `text-teal`, `font-display`, etc.). Un valor que no está en los tokens no se inventa: se agrega al contrato primero (edita `globals.css`, después úsalo).

**Regla dura para titulares póster:** en lienzos de tamaño fijo (slides, print/.docx/.pdf) usar siempre `--text-poster-slide-sm/--text-poster-slide/--text-poster-slide-xl` (px absolutos, calibrados sobre 1280×720) — nunca la escala clamp de web (`--text-poster-sm/--text-poster/--text-poster-xl`, que mide contra el viewport del navegador y en una slide cambiaría de tamaño según el ancho de la ventana, no de la slide). En componentes se pide con `scale="slide"`.

## Tokens — resumen rápido

| Token | Hex | Rol | Contraste |
|---|---|---|---|
| `paper` | `#F6F4EF` | Superficie base (web, slides y .pdf) | — |
| `paper-soft` | `#ECEAE3` | Tarjeta / bloque secundario | — |
| `ink` | `#15191A` | Texto y estructura | 16.11:1 sobre `paper` (AAA) |
| `teal` | `#0F6B60` | **Marca** · plataforma · sistema · agentes | 5.80:1 (AA) |
| `plum` (oliva) | `#4F6B00` | La gente de la empresa · decisión humana · guiño, sobre claro | 5.56:1 (AA) |
| `lima` | `#D4F36B` | Neón: el "encendido" de las ilustraciones y el acento sobre oscuro o foto. **Nunca texto sobre claro** (1.14:1) | 14.19:1 sobre `ink` |
| `taupe` | `#A3A69F` | Bordes/ticks/metadatos — **nunca texto esencial chico** | 2.24:1, no pasa AA |

Contrastes medidos con la fórmula WCAG el 2026-10-27. Los **.docx llevan fondo blanco `#FFFFFF`** (ver "Piezas sin código"); sobre blanco, `teal` da 6.38:1 y oliva 6.11:1. El token `paper-print` salió en la v1.5: el papel nuevo ya es claro y los .pdf van sobre `paper`.

Reglas de uso: `teal` manda como color de marca. El segundo color (`plum`: oliva sobre claro, lima sobre oscuro) entra para marcar a la gente de la empresa y la decisión humana (permisos, aprobaciones, quién responde) y como detalle con guiño. Nunca como relleno masivo, y nunca junto a `teal` con igual peso en un mismo componente: teal manda, el segundo color acentúa. Los tokens conservan el nombre `plum` para no romper el código.

**Tipografía (v1.5):** **Newsreader** (display: H1-H3, titulares póster y cifras; peso 500 en títulos y 700 en escala póster, en minúscula, con la palabra o frase destacada en itálica) · **Schibsted Grotesk** (texto/UI) · **IBM Plex Mono** (notación: etiquetas de sección como `03 · CONTROL`, firma `A→B`, estados, datos, cintas — nunca párrafos). Reemplazan a Fraunces, Inter y Space Mono, que no van en ninguna pieza nueva. Las tres son de Google Fonts (SIL OFL). Los tokens `--fraunces-*` quedan en `normal` solo por compatibilidad.

**Escala póster (web, clamp, v1.2: un escalón menos):** `--text-poster-sm` clamp(40→64) · `--text-poster` clamp(44→96) · `--text-poster-xl` clamp(56→176). La escala de slide/print no cambió. **Escala póster (slide/print, px fijo):** `--text-poster-slide-sm` 84px · `--text-poster-slide` 96px · `--text-poster-slide-xl` 104px. Los titulares póster van de **1 a 4 palabras** (una frase larga no entra y pierde el golpe). Máximo **un** titular póster por pantalla o slide.

Tabla completa de tokens en `assets/tokens/globals.css` — es la fuente ejecutable, no la reescribas de memoria.

### Fondos oscuros (secciones puntuales del sitio, slides — no es dark-mode de usuario)

Cuando una sección, componente o slide se diseña sobre fondo oscuro a propósito, **`teal` y `plum` "a secas" no sirven ahí** — están calibrados para leerse sobre `paper` y no pasan contraste WCAG sobre `ink`. Existe una variante calculada y verificada (contrastes sobre `ink`: `teal-dark` `#5CC4B0` 8.41:1, `teal-ui-dark` `#107468` 3.14:1, `plum-dark` = lima `#D4F36B` 14.19:1, `plum-ui-dark` `#516E00` 3.02:1, `danger-dark` `#CC626F` 4.68:1; `ink-soft` `#1F2526`):

| Contexto | Fondo | Texto principal | Acento teal | Acento plum |
|---|---|---|---|---|
| Oscuro | `bg-ink` (o `bg-ink-soft` para tarjeta elevada) | `text-paper` | `text-teal-dark` (texto/íconos chicos) · `bg-teal-ui-dark` (fill de botón/texto grande) | `text-plum-dark` · `bg-plum-ui-dark` |

**Regla dura:** nunca combines `bg-ink`/`bg-ink-soft` con `text-teal`, `bg-teal`, `text-plum` o `bg-plum` sin sufijo `-dark`/`-ui-dark`. Máximo 2 pantallas/slides oscuras por pieza. `scripts/audit_tokens.py` detecta esta combinación a nivel archivo (heurística — si el script no dice nada igual revisá a ojo).

## Logo

El logo es **isotipo + wordmark**, ambos vectores cerrados. Reemplaza el wordmark tipográfico anterior (`innovas` compuesto en Fraunces con superíndice `[A→B]`), que queda **deprecado**.

- **Isotipo:** perfil humano trazado como circuito — las pistas entran por la izquierda y cierran el contorno de la cara. Misma tesis que la flecha `A ──→ B`: entrada → transformación → estado. Convive con la flecha, no la reemplaza: la flecha sigue siendo el elemento gráfico de composición, el logo es la firma institucional.
- **Wordmark:** `INNOV.AS` es **lettering vectorizado, no texto vivo**. No se recompone tipeando en Newsreader ni en ninguna otra fuente — siempre se usa el SVG. Si necesitás el nombre como texto corriente (título, cuerpo), eso es texto en Fraunces/Inter y no es el logo.

### Variantes — archivos en `assets/logo/`

| Archivo | Lienzo | Isotipo | Wordmark | Dónde va |
|---|---|---|---|---|
| `innovas-horizontal-ink.svg` | 991×319, transp. | `teal` | `ink` | **Primaria.** Cualquier fondo claro: `paper`, blanco |
| `innovas-horizontal-dark.svg` | 991×319, transp. | `teal-dark` | `paper` | Fondo `ink`/`ink-soft` — slides y secciones oscuras |
| `innovas-horizontal-paper.svg` | 991×319, transp. | `teal` | `paper` | Export plano que conserva el isotipo en teal original. **No tiene superficie segura dentro del sistema**: sobre `ink` el isotipo queda en 2.78:1. Usalo solo sobre foto o fondo medio verificando el contraste a mano — para fondo `ink` va `-dark` |
| `innovas-badge-lockup-teal.svg` | 747×741, fondo `teal` | `paper` | `paper` | Avatar cuadrado: LinkedIn, redes, app icon, sello de cierre de deck |
| `innovas-badge-iso-teal.svg` | 747×741, fondo `teal` | `paper` | — | Avatar donde el nombre ya aparece al lado (perfil de red, favicon chico) |
| `innovas-isotipo-teal.svg` · `-ink.svg` · `-paper.svg` | 174×221, transp. | según nombre | — | Favicon ≥24px, marca de agua, bullet de marca |
| `innovas-horizontal-mono-ink.svg` · `-paper.svg` | 991×319, transp. | mono | mono | Solo cuando la pieza exige monocromía: franja institucional de un tercero, impresión a 1 tinta |

### Reglas duras

**1 · Contraste (calculado, no estimado).**

| Combinación | Ratio | |
|---|---|---|
| `teal` sobre `paper` | 5.80:1 | ✅ |
| `teal` sobre blanco | 6.38:1 | ✅ |
| `ink` sobre `paper` | 16.11:1 | ✅ |
| `paper` sobre `teal` (badges) | 5.80:1 | ✅ |
| `teal-dark` sobre `ink` | 8.41:1 | ✅ |
| `teal` sobre `ink` | **2.78:1** | ❌ no llega ni a 3:1 |

Valores de la v1.6.1: desde el 2026-10-27 los SVG y PNG del logo usan tinta `#15191A`, papel `#F6F4EF` y, en la variante oscura, `teal-dark` `#5CC4B0`.

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
| **PosterHeading** | Titular a escala póster | 1–4 palabras, `scale="slide"` en lienzos fijos, Newsreader 700 en minúscula, palabra o frase destacada en itálica (`accent`), `line-height` `--lh-poster` |
| **InterlockHeadline** | Interlock texto/imagen: un bloque de imagen incrustado dentro de una línea de titular póster | Alto del bloque `--interlock-h` (0.78em), gap `--interlock-gap` |
| **StatCounter** | Cifra grande en Newsreader que cuenta desde 0 al entrar en viewport (IntersectionObserver 40%, 1200ms) | Cifra siempre con unidad y contexto en una línea secundaria — nunca un número suelto |
| **IllustrationSlot** | Andamio que sostiene el layout mientras una ilustración no está hecha | Se reemplaza por una pieza `HandDrawn` que cumpla la spec de ilustración v1.2, nunca por un ícono o clipart genérico |
| **HandDrawn** (v1.2) | Ilustración a mano en SVG que se dibuja al entrar en pantalla | Spec completa en "Ilustración (v1.2)" más abajo. En el sitio: `components/illustrations/hand-drawn.tsx` más un archivo de trazos por conjunto |
| **HeroDots** (v1.2) | Fondo del hero oscuro: trama de puntos tipo semitono en WebGPU | Spec en "Hero con trama de puntos (v1.2)". Un solo uso por página, solo en el hero. En el sitio: `components/hero-dots.tsx` |
| **AgentScene** (v1.4) | Escena animada en volumen (WebGPU) para las piezas del producto: formas mate, luz suave, sombra de contacto, agentes que miran al cursor | Spec y procedimiento en "Ilustración animada en volumen (v1.4)". Siempre con `fallback` a la `HandDrawn` equivalente y `bg` igual al fondo de la superficie. En el sitio: `components/animated/` |
| **HeroField** (v1.3.1) | Fondo animado del hero claro de cada página interna, con un patrón propio por página | Spec en "Fondos de hero de páginas internas (v1.3.1)". Un patrón por página, solo en el hero, nunca dos páginas con el mismo. En el sitio: `components/hero-field.tsx` |

## Ilustración (v1.2)

Reemplaza la spec de trazo fino, acento único y registro solo diagramático.

- **Registro:** objetos y diagramas. Objetos reconocibles de trabajo (ventana de asistente, nota, carpeta, fichero, cuaderno, lápiz, llave, candado, enchufe, burbuja de chat, planilla) combinados con flechas y nodos. **Sin personas**, caras ni manos. Sin isométrico, 3D, degradé ni sombra difusa. (Estas reglas son de la ilustración a mano. Las escenas en volumen de la v1.4 tienen las suyas, más abajo.)
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

## Ilustraciones: la serie del cerebro (v1.5)

Definida por Luli el 2026-10-26 a partir de sus propios bocetos. Reemplaza en el sitio a las escenas en volumen (v1.4) para Brain, Agentes y Herramientas. Es un **storytime**: el mismo cerebro aparece en todas las piezas y cuenta la historia del producto.

- **El cerebro:** silueta anatómica de perfil (frontal a la izquierda, temporal abajo, cerebelo y tronco abajo a la derecha) con los surcos principales. Es una sola, compartida: `CONTORNO`, `SILUETA` y `SURCOS` en `red-cerebro.ts`. No se redibuja por pieza.
- **Brain (`CerebroRed`):** el cerebro como red de nodos que se arma **nodo por nodo**: de los nodos que ya están crecen ramas curvas, en la punta nace un nodo nuevo con un destello lima ("una idea que se prende") y después se conecta con sus vecinos. Se desarma suave y vuelve a empezar desde otro punto. El cursor ilumina los nodos cercanos.
- **Agentes (`AgenteRobot`):** robotito minimalista de línea, con mancha lima corrida en el cuerpo (como un dibujo a mano), cabeza-pantalla turquesa (`teal`) y adentro un **cerebrito de neón lima ya armado** (sin nodos) que se enciende de a ratos junto con la antena. Saluda, parpadea y flota apenas. No repite el armado de nodos del Brain.
- **Herramientas (`HerramientasEnchufe`):** un cerebro que **recibe herramientas**: cuatro fichas de línea (correo, datos, agenda, reportes) que se enchufan de a una con un cable; al conectarse, la ficha se enciende en lima, el cerebro destella en neón lima y viajan datos por el cable.
- **Lenguaje común (obligatorio en toda pieza nueva de la serie):** fondo de la superficie (blanco/papel, nunca un panel de color detrás), línea de tinta de **1.6** en el lienzo de 200×150, nodos y cabeza en `teal`, **"encendido" siempre en neón lima** (trazo lima con resplandor), mancha lima corrida como único relleno de color, encuadre parejo entre piezas (la figura ocupa el alto de la tarjeta).
- **Técnica:** canvas 2D en un componente cliente, lienzo de 200×150 escalado a la tarjeta (4:3), solo anima en pantalla, con `prefers-reduced-motion` queda quieto y armado. Colores leídos de los tokens.
- **Descartado en el camino (no volver):** 3D de juguete, figuras de puntos granulados, íconos de línea genéricos tipo Lucide, imágenes generadas con IA (gouache, collage, grabado, línea continua) y repetir el efecto de nodos dentro del robot.
- **Componentes:** `components/red-cerebro.ts` (silueta, red y pintura compartidas), `components/cerebro-red.tsx`, `components/agente-robot.tsx`, `components/herramientas-enchufe.tsx`; copias en `assets/components/serie-cerebro/`. Se usan en las tarjetas de "Tres piezas" del home y en `/central-ia`.
- **Hero del home:** fondo de grano (`components/hero-grano.tsx`, copia en `assets/components/`): puntitos redondos teal luz, ralos donde está el texto y más densos a la derecha, quietos; el cursor los empuja de a uno y vuelven con un resorte. Algunos granos se encienden de a ratos como neón lima. Reemplaza a `HeroDots` en el home.

## Ilustración animada en volumen (v1.4)

Decidida por Mati el 2026-10-22, tras comparar tres sistemas en un laboratorio (volumen, trama de puntos y constelación de luz). Ganó **volumen**: es el más corporativo y el que mejor se lee. Se usa en todas las ilustraciones del sitio: primero las piezas del producto y, por decisión de Mati del mismo día, también los dolores.

- **Qué es:** escenas 3D chicas, mate, con luz suave y sombra de contacto, que se funden con el fondo de la superficie donde van (`paper` o `paper-soft`, sin caja ni borde propio). Se mueven despacio y en continuo, y reaccionan al cursor.
- **Vocabulario fijo.** Toda escena se arma con estas formas, siempre con la misma construcción:
  - **Agente:** bot de cuerpo redondeado (píldora, esfera o rombo) con visor `ink` y dos ojos encendidos. Flota, parpadea cada tanto y gira el cuerpo hacia el cursor. Puede llevar una antena con bolita `plum` como guiño.
  - **Persona:** esfera. En `plum` si es la gente que decide o usa la IA, en `taupe` apagado si quedó afuera.
  - **Herramienta:** bloque redondeado neutro.
  - **Brain / conocimiento:** esfera `teal`.
  - **Plataforma / hub:** bloque `teal`.
  - **Conexión:** cable fino `ink` con pulsos `teal` que viajan.
  - **Permiso:** anillo `plum` alrededor de lo que protege.
  - **Dato:** cubito `teal`.
- **Color:** cinco materiales, todos leídos de los tokens: neutro (papel aclarado), `teal`, `plum`, apagado (`taupe`) y `ink`. Un protagonista en `teal` por escena; `plum` como detalle, a lo sumo dos elementos.
- **Caras:** única excepción a "sin caras" del sistema, y solo para los agentes: visor y dos ojos, sin boca ni otros rasgos. Las personas nunca tienen cara.
- **Luz y cámara:** fijas y comunes a todas las escenas (cámara apenas elevada, luz arriba a la izquierda, sombra sobre un piso invisible). No se ajustan por escena.
- **Cursor:** la escena gira apenas hacia el cursor, los agentes lo miran y la zona cercana se aclara un poco. Sin cursor, vaivén suave. Con `prefers-reduced-motion`, quietas y sin reacción.
- **Composición:** una idea por escena, hasta unas 15 formas, lienzo 4:3. Nada se corta en el borde ni sale del cuadro al moverse.
- **Respaldo:** cada escena tiene su par a mano (`HandDrawn`), que se muestra sin WebGPU. Una escena nueva no se publica sin su par.
- **Dónde va:** toda ilustración del sitio: dolores y piezas del producto en el home, y piezas en `/central-ia`. Una ilustración nueva del sitio se hace como escena en volumen, con su par a mano. Solo sobre fondo claro. No va en el hero. Hasta unas seis escenas por página.
- **Rendimiento:** un solo dispositivo GPU compartido por todas las escenas de la página, solo se dibuja lo que está en pantalla, densidad de píxel entre 1 y 1.5.
- **Componente:** `AgentScene` (`components/animated/agent-scene.tsx`, shader en `components/animated/scene-shader.ts`; copias en `assets/components/`). Props: `scene`, `look="volumen"`, `bg` (token del fondo de la superficie), `label` y `fallback`. El shader conserva los estilos `trama` y `constelacion` del laboratorio, no aprobados: no se usan.

### Procedimiento de escena animada (obligatorio)

Mismo espíritu que el de ilustración: consistencia total entre escenas hechas en sesiones distintas.

1. **Concepto antes de modelar.** Una línea con la situación, las formas del vocabulario que la cuentan y el guiño. Visto bueno de quien la pidió.
2. **Mirar las existentes.** `sceneBrain`, `sceneAgentes` y `sceneHerramientas` en `scene-shader.ts` son la referencia de escala, densidad y ritmo.
3. **Escribir la escena** como una función `sceneNombre(p)` en `scene-shader.ts`, usando solo `bot()`, esferas, bloques (`sdBox`), cables (`sdSeg`) y anillos (`sdTorus`) registrados con `put(distancia, material, ...)`. Sumar el nombre a `SCENES` y su rama en `map()`. No se agregan formas, materiales, luces ni cámaras nuevas sin pasar por una decisión de diseño.
4. **Acentos:** un protagonista `teal`, `plum` como detalle, el resto neutro o apagado.
5. **Movimiento:** lento (velocidades entre 0.2 y 1.4 rad/s), flotación chica, pulsos que viajan en ciclos. Nada brusco.
6. **Par a mano:** dibujar la `HandDrawn` equivalente con los ocho pasos de ilustración. Es el respaldo.
7. **Verla en contexto:** con `AgentScene` en la tarjeta o sección real y `bg` igual a su fondo. Mover el cursor por la página, revisar escritorio y celular, y probar el respaldo.
8. **Revisar y mostrar:** se entiende sin leer el texto, el bot se lee como bot, parece de la misma familia que las otras. Presentar captura y ajustar lo que se pida.

En piezas fijas (decks, documentos, PDF) se usa una captura del render a 2x sobre el fondo de la pieza.

## Hero con trama de puntos (v1.2)

Reemplaza la red de nodos del hero del home, que quedaba cargada. Es atmósfera: no cuenta el producto, eso lo hace el titular.

- **Qué es:** una grilla de puntos tipo semitono sobre `ink`. El radio de cada punto respira con un campo lento. Puntos en tono `paper`, apagados, con una zona que se enciende en `teal-dark` y deriva despacio.
- **Cursor:** la trama se abre apenas alrededor del cursor. Sutil: se descubre sin competir con el titular ni con el botón.
- **Texto primero:** la trama se apaga detrás de la columna de texto y gana presencia hacia la derecha. En pantallas angostas se atenúa entera.
- **Tecnología:** WebGPU con la librería `vgpu`, shader WGSL en un componente cliente. Los colores se leen de los tokens CSS en tiempo de ejecución.
- **Obligatorio:** sin WebGPU cae a una trama estática en CSS; con `prefers-reduced-motion` queda quieta y sin reacción al cursor.
- **Límites:** solo en el hero oscuro, una vez por página. Cuenta como una de las dos secciones oscuras que admite una pieza. En slides y documentos se usa una captura fija del mismo shader.
- **Valores** (aprobados por Mati el 2026-10-11): paso de grilla 18px, punto 0.62, velocidad 0.12, radio del cursor 190px, foco 0.9.

Ya existían del inventario original (`direccion-de-arte.md` § 4-5) y siguen vigentes, con el uso que se les da desde la v1.3: `TransitionArrow`, `SectionMarker`, `Button`, `InstitutionalStrip`, `LevelCard` (card de pieza o etapa), `VerticalRail` (rieles de mensaje) y `LevelPath` (ahora camino del cliente). `Wordmark` está deprecado y lo reemplaza el logo. `SegmentedIntent` queda sin uso: `/contacto` tiene un formulario único.

**Bloque de color a sangre lateral:** franja vertical de `--colorblock-w-narrow` (14vw) o `--colorblock-w` (24vw) en teal, tocando los cuatro bordes de su lado. Único elemento full-bleed de color del sistema — portada y cierre.

## Fondos de hero de páginas internas (v1.3.1)

Decidido por Mati el 2026-10-22. El home tiene la trama de puntos oscura; cada página interna lleva en su hero claro un fondo de la misma familia con personalidad propia. El patrón cuenta en abstracto lo que dice la página, no lo ilustra.

| Página | Patrón | Qué cuenta | Acento teal | Cursor |
|---|---|---|---|---|
| `/central-ia` | `flow`: guiones que siguen un flujo | La plataforma ordena | Foco que deriva | Los guiones se alinean hacia → |
| `/como-implementamos` | `waves`: olas concéntricas de puntos | Las olas del método | La ola más cercana al origen (ola cero) | Larga su propia onda |
| `/proyectos` | `blocks`: bloques que se arman y desarman | Piezas en construcción | Algunos bloques armados | Completa los bloques |
| `/nosotros` | `contours`: curvas de nivel | Trayectoria, terreno | Una de cada cinco curvas | Levanta un cerro |
| `/precios` | `meter`: columnas de puntos tipo medidor | El consumo | El punto superior de cada columna | Sube las columnas cercanas |
| `/contacto` | `signal`: pulsos que viajan por filas | Un mensaje de A a B | La punta del pulso | Agranda los puntos cercanos |

- **Superficie:** sobre `paper`, con trazos en `ink` tenue y acento `teal`. No suman secciones oscuras. Si alguna vez van sobre `ink`, el componente usa `paper` y `teal-dark` (`surface="dark"`).
- **Texto primero:** la trama casi desaparece detrás de la columna de texto (izquierda, o centro en `/contacto` con `align="center"`) y gana presencia hacia el lado libre. En pantallas angostas se atenúa entera. Los patrones llenos (`blocks`, `meter`) bajan más su intensidad.
- **Tecnología y respaldo:** igual que `HeroDots`. WebGPU con `vgpu`, colores leídos de los tokens, trama estática en CSS sin WebGPU, quieto y sin cursor con `prefers-reduced-motion`.
- **Límites:** un patrón por página, solo en el hero, y ninguno se repite entre páginas. Las páginas legales (`/terminos`, `/privacidad`) no llevan. Una página nueva que quiera fondo necesita un patrón nuevo con su propia idea. Si no, va sin fondo.
- **Componente:** `HeroField` (`components/hero-field.tsx`; copia en `assets/components/hero-field.tsx`), con la prop `field` del `Hero` o directo en un hero propio.

## Camino del cliente (v1.3)

Reemplaza al camino de 4 niveles del programa educativo (Fundamentos, Usuario Avanzado, Builder, Orquestador), que sale del sistema junto con Desde Adentro. El componente (`LevelPath`) es el mismo con otro contenido: una escalera de estados unidos por la flecha `A ──→ B`, horizontal en escritorio y vertical en celular.

```
[ Primera conversación ] ──→ [ Radar ] ──→ [ Ola cero ] ──→ [ Olas ] ──→ [ Operación continua ]
      estado 01              estado 02     estado 03       estado 04       estado 05
```

- Cada nodo: etiqueta mono de estado, título en Newsreader y una línea de resultado en Schibsted Grotesk. Los cinco nombres son los del método vigente y no se renombran por pieza.
- Color: nodos con borde `ink`; el nodo que la pieza quiere destacar va en `teal`. El gradiente `plum → teal` del camino anterior queda fuera. El segundo color (oliva) entra solo si el nodo implica una decisión humana (por ejemplo, la aprobación del directorio).
- Una pieza que muestra el camino completo usa los cinco estados. Una pieza que muestra una parte deja el resto con borde `taupe` como contexto.
- Movimiento: el mismo revelado en scroll (fade-up, 80ms por nodo).
- ⚠️ Spec propuesta en la v1.3, a confirmar al implementarla en el sitio.

## Fotografía (v1.6)

Decidida el 2026-10-27, tras la referencia que dio el dueño (el sitio de Wonderful: fotos grandes que dan color e impacto). Reemplaza la regla de "solo ilustraciones" de la v1.3. Las ilustraciones de la serie del cerebro siguen siendo el recurso de **producto**; la fotografía cuenta **equipo, trabajo y escala**.

- **Tratamiento común (obligatorio):** toda foto pasa por `Foto` (`components/foto.tsx`), que aplica `.foto`: color apenas bajado (`saturate(0.78)`), contraste suave y un grano fino encima. Así fotos de orígenes distintos se leen como una serie.
- **Foto propia ya tratada:** si llega con su color y su grano (las de teal y lima que manda Luli), se registra con `natural: true` en `content/imagenes.ts` y no recibe el filtro (`.foto-natural`).
- **Dónde viven:** fotos propias en `public/images/`; todas se registran en `content/imagenes.ts` (`imagenes`), y las páginas solo las piden por nombre. Cambiar una foto es tocar ese archivo.
- **Fotos de referencia:** las que no son propias vienen de Unsplash (licencia libre, uso comercial permitido, sin crédito obligatorio), servidas desde su CDN. Para el sitio final se bajan al proyecto o se reemplazan por fotos propias. No son exclusivas.
- **Sobre foto:** el texto va sobre un velo `ink` (degradé o plano) y el acento es `lima`, nunca `teal` ni `plum` a secas. Con una foto oscura con color propio el velo es más liviano del lado donde no hay texto.
- **Dónde sí:** manifiesto del home (foto chica dentro de la línea, en píldora), tarjetas de lo que contrata la empresa, banda de control, banda "Central IA viene con un equipo".
- **Dónde no (decidido en la revisión):** dentro del recorrido por etapas (pelea con el texto y empuja las capas hacia abajo), en las filas de agentes por rubro, en Quiénes somos (las cifras ya ocupan la sección) y en la sección de continuidad. Ahí el texto y los esquemas van solos.
- **Sin caras reconocibles de clientes ni logos:** son fotos de ambiente. No se presentan como casos ni como el equipo real.

## Home y Central IA de venta enterprise (v1.6)

El comprador es una empresa grande que paga un proceso largo. El sitio tiene que mostrar un **equipo que acompaña de punta a punta**, sobre una infraestructura, con agentes que van tomando trabajo. La plataforma es la base, no el protagonista.

**Home**, en este orden (`app/page.tsx`, componentes en `components/home/`, copia en `assets/components/enterprise/home/`):

1. **Hero** con el titular "La IA de tu empresa, *de punta a punta*" (la palabra destacada puede ser una frase: `PosterHeading` acepta un `accent` de varias palabras) y la franja institucional debajo.
2. **Manifiesto** (`Manifiesto`): tres frases grandes que se encienden palabra por palabra, con una foto en píldora al final de cada una.
3. **Hoy → con INNOV.AS** (`AntesDespues`): filas A ──→ B que entran escalonadas.
4. **Lo que contratás** (`Oferta`): infraestructura, agentes y equipo, en tarjetas altas con foto a sangre. De a dos por fila en ancho medio y de a tres en pantallas grandes; el texto que sube al pasar el cursor es solo de pantallas grandes.
5. **Un proceso, no un proyecto** (`Recorrido`): cinco etapas (primera conversación, Radar, ola cero, olas, operación continua) que avanzan solas con barra de progreso, se pausan con el cursor y se pueden elegir. Al costado, una **única tarjeta** con "qué te llevás", "quiénes están" y las capas que ya funcionan, que se encienden de abajo hacia arriba. Sin fotos ni botón suelto al final.
6. **Agentes que toman trabajo** (`AgentesRubros`): rubros en grande que rotan solos; cada tarea se lee como un pase de manos "el agente ──→ tu gente". Sin foto ni tarjetas.
7. **Control** (`BandaControl`): foto a sangre con velo y cuatro garantías en filetes.
8. **Quiénes somos** (`QuienesSomos`): como en la v1.5, con las cifras a escala de sección (`StatCounter size="sm"`, token `--text-counter-sm`).
9. Preguntas frecuentes y cierre.

**Central IA** (`app/central-ia/page.tsx`, componentes en `components/central/`):

- **Componentes y su beneficio** (`ComponentesGrid`): los tres principales (Brain, Agentes, Herramientas) en tres columnas separadas por filetes, cada una con su dibujo de la serie del cerebro y la ilustración en una caja de alto fijo para que los títulos queden alineados. Los demás componentes, como lista de dos columnas con filetes. **Sin cajas ni tarjetas**: la lectura de "demasiados bloques" fue la devolución.
- **Cuando alguien se va** (`Continuidad`): tres fases que avanzan solas (mientras trabaja, cuando se va, cuando llega alguien) con un esquema persona → Brain → persona. Sin foto.
- Control por niveles, banda "Central IA viene con un equipo" (foto) y detalle para sistemas.
- **Ya no se muestran las demos animadas** del producto (Brain, permisos, agente, herramientas). Sus componentes (`demo-*.tsx`) se borraron en la v1.6.1 y quedan en el historial de git (commit `cd4e599`); sus datos siguen en `content/central-ia.ts` por si sirven para una demo comercial.

**Reglas que salieron de la revisión (aplican a toda pieza nueva del sitio):**

- Una sección no mezcla más de un recurso pesado: foto **o** esquema **o** tarjetas, no los tres.
- Evitar grillas de tarjetas con el mismo peso: se prefieren filas con filetes, columnas separadas por líneas y listas.
- Lo que explica un proceso se lee **junto** a lo que se está mirando, no debajo de una imagen alta.
- Los botones no quedan sueltos al final de una sección que ya tiene un cierre: el CTA vive en la barra y en el cierre de la página.
- Las cifras grandes de la escala póster (`--text-counter`) son para una cifra sola; en una fila de datos se usa `size="sm"`.
- Las pestañas y secuencias que avanzan solas solo corren mientras están en pantalla, se pausan con el cursor y quedan quietas con `prefers-reduced-motion`.

## Iconografía

**No hay set de íconos.** El sistema resuelve glifos con **notación mono en caracteres Unicode**, no con un icon set: `──→`/`→` (elemento firma), `//` (prefijo de marcador), `▪`/`░` (bullets y barra de progreso `[▪▪▪▪░░] 4/6`), `·` (separador de metadatos), `[ ]` (encierra superíndices/códigos). Todos en IBM Plex Mono, heredan el tamaño de la línea, color de la vertical cuando corresponde. Si algún día hace falta un set real: trazo lineal 1.5px, radio 2px — **Lucide** es la sustitución candidata, pero no está aplicada en ninguna pieza; confirmar antes de usar.

## Motion (nivel "medio", actualizado en v1.2)

Ease por defecto `--ease` `cubic-bezier(0.2,0.6,0.2,1)`; revelados `--ease-out-quint`; cintas `--ease-tape` (con overshoot).

**Se anima:** reveal de titular por palabra/línea (stagger 70ms, 620ms) · cintas entrando 0°→ángulo final con escala 0.86→1 (420ms) · contadores (1200ms) · camino del cliente (fade-up 80ms/nodo) · flecha A→B (`stroke-dashoffset`, 1000ms) · hover de CTA (`translateY(-1px)` + sombra sólida).

**Nuevo en v1.2:**
- **Dibujo de ilustraciones.** Cada trazo se dibuja con `stroke-dashoffset` (620ms, `--ease-out-quint`, 40ms de escalonado entre trazos) y los acentos entran con escala 0.86→1 (420ms, `--ease-tape`). Se dispara una sola vez, cuando el 40% de la pieza entra en pantalla, y queda quieta.
- **Fondo del hero.** `HeroDots` en el home y `HeroField` en las páginas internas se mueven solos y en continuo. Junto a la marquesina de la franja institucional, son las únicas animaciones en bucle del sistema.

**No se anima:** texto de cuerpo, logos institucionales (salvo el desplazamiento de la franja, ver la excepción más abajo), nada parallax ni atado a la posición del scroll, y ningún otro bucle o auto-play fuera del fondo del hero (uno por página) y de la franja. Las entradas al aparecer en pantalla (titulares, contadores, ilustraciones) se disparan una vez y no siguen al scroll.

`prefers-reduced-motion`: todas las duraciones a 0ms, ilustraciones ya dibujadas, fondo del hero y franja institucional quietos. Obligatorio, no opcional.

> **Excepción de motion (decidida el 2026-10-21):** la franja institucional (`InstitutionalStrip`) sigue corriendo como marquesina lenta (32s, pausa al pasar el cursor) y queda quieta con `prefers-reduced-motion`. Es la segunda animación en bucle del sistema, junto al fondo del hero. En decks, documentos y PDF los logos son siempre estáticos.

> **Excepción de motion (v1.4, decidida el 2026-10-22):** las escenas en volumen (`AgentScene`) se mueven en continuo mientras están en pantalla y reaccionan al cursor. Solo en las piezas del producto, con las reglas de "Ilustración animada en volumen (v1.4)". Con `prefers-reduced-motion` quedan quietas.

> **Excepción de motion (decidida el 2026-10-22):** el fondo animado del hero deja de ser exclusivo del hero oscuro del home. Cada página interna lleva el suyo (`HeroField`) sobre el hero claro, con las reglas de "Fondos de hero de páginas internas (v1.3.1)". Sigue valiendo uno por página. En decks y documentos se usa una captura fija.

## Contenido y voz en piezas de marca (v1.3)

La identidad visual no alcanza si el mensaje es el anterior. Antes de escribir el copy de una pieza (sitio, deck, one-pager, Word), leé `marketing/mensajes-innovas` en el brain: ahí vive el canon y, si contradice esta sección, gana el brain. Resumen operativo:

- **Plataforma adelante.** (v1.6: en el home y en la oferta la plataforma va como la **base** del proceso y del equipo, no como protagonista, por la devolución del dueño; `/central-ia` sigue contándola completa. Esto se aparta del canon del brain y queda pendiente de validación.) Se presenta primero Central IA, la plataforma que ordena la adopción de IA en la empresa con gobernanza sobre permisos y acceso. Los servicios (relevar el método, armar el brain, preparar agentes, operar) se cuentan como lo que INNOV.AS hace sobre ella.
- **Sin la marca En Paralelo ni Desde Adentro.** Del método se conservan las olas, los nombres Radar y Mapa del Método y la frase "tu gente decide, los agentes ejecutan". La última etapa se llama "operación continua".
- **Afirmativo.** "Ofrecemos servicios sobre una plataforma" en lugar de definirse por lo que la empresa no es. Sin guion largo ni signos de apertura (¿ ¡) en ninguna pieza.
- **A y B explícitos.** El glifo firma y el copy explica. Cada pieza define su par concreto, por ejemplo A: la IA quedó en una o dos personas, B: toda la empresa trabaja con IA y con permisos. B es un estado de operación continua, no un destino al que se llega.
- **Plataforma completa.** Se comunica sin etiquetas de "próximamente" ni "en el plan".
- **Tamaño de cliente.** Empresas pequeñas, medianas y grandes. El rango de empleados del foco comercial es interno y no figura.
- **Experiencia.** "25 años transformando más de 150 organizaciones en 14 países", en conjunto y sin desglosar por tecnología. Sin cantidades de clientes ni casos atribuidos a Central IA.
- **Organizaciones.** La franja "Organizaciones para las que trabajó nuestro equipo" lista la trayectoria del equipo; la lista vigente vive en `content/home.ts` del sitio. Banco Mundial no figura mientras sea oferta en curso. "Ejecutamos para" se habilita recién con contrato firmado.
- **Sin nombres de personas.** Ni founders ni bios en material que circule.
- **Precio.** El único número público es el del Radar, USD 1.500, bonificado al implementar la ola cero.
- **Competencia.** No se nombra en piezas públicas.
- **Imagen.** (v1.6) Ilustraciones de la serie del cerebro para el producto y **fotografía de ambiente** tratada (sección "Fotografía (v1.6)"). Sin capturas ni pantallas del producto en el sitio: la plataforma se cuenta por componentes y beneficios.

## Workflow — implementación en código (Next.js/Tailwind)

1. **Verificá si el proyecto ya tiene los tokens** (buscá `--color-teal` o `--text-poster` en el CSS global). Si no existen, o si existen sin la capa editorial: copiá `assets/tokens/globals.css` al stylesheet global y fusioná `assets/tokens/tailwind.config.ts` (bloque `theme.extend`) — no sobrescribas el config entero.

2. **Fuentes self-host con `next/font`** (nunca `<link>` a Google Fonts ni `@import`):

   ```ts
   // app/fonts.ts
   import { Newsreader, Schibsted_Grotesk, IBM_Plex_Mono } from "next/font/google";

   export const display = Newsreader({
     subsets: ["latin"],
     variable: "--font-display",
     style: ["normal", "italic"], // la itálica es la palabra destacada
     axes: ["opsz"],
     display: "swap",
   });

   export const sans = Schibsted_Grotesk({
     subsets: ["latin"],
     variable: "--font-sans",
     display: "swap",
   });

   export const mono = IBM_Plex_Mono({
     subsets: ["latin"],
     weight: ["400", "500", "700"],
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

5. **Specs de componentes** (elemento firma, camino del cliente, hero, card de pieza o etapa, franja institucional, CTA, motion) en `references/direccion-de-arte.md` §4-5; **capa editorial** (PosterHeading, TapeLabel, InterlockHeadline, StatCounter, IllustrationSlot) en el addendum al final del mismo archivo. No reinventes estos componentes desde cero: ya están especificados.

6. **Referencia visual navegable:** `assets/style-tile.html` — v1.6.1: paleta clara y oscura con contrastes, tipografía, píldoras, filetes, tarjetas, foto con velo y firma. **No incluye la capa editorial** (titulares póster, cintas, interlock, contadores) — para eso, revisar el addendum de `direccion-de-arte.md` o los templates del design system vivo hasta que se actualice.

## Workflow — piezas sin código (decks, one-pagers, documentos Word)

Estas piezas no consumen `var(--...)` — necesitan los valores literales. Usá `references/non-code-usage.md`: paleta/tipografía en hex directo, la capa editorial en valores literales (tamaños de titular póster para slide/print, ángulos y specs de cinta, spec de ilustración, formato de contador), y las mismas reglas de uso. No inventes una paleta o mecanismo "similar" — es la misma marca.

**Fondo por formato.** Presentaciones, web y .pdf usan `paper` `#F6F4EF`. Los **documentos Word (.docx) llevan fondo blanco `#FFFFFF`** para simplificar la impresión: sin color de página ni sombreado de fondo, y los bloques secundarios en `paper-soft` `#ECEAE3`. El resto de la paleta no cambia. Las reglas de Word y la guía de decks (agnóstica del formato: se arman en formato nativo de Claude y se exportan a .pptx) están en `references/non-code-usage.md`, con los valores de la v1.5.

## Recursos del skill

- `references/direccion-de-arte.md` — guía de dirección de arte (T3.2) + addendum agosto 2026 con la capa editorial.
- `references/non-code-usage.md` — cheat sheet de marca para piezas sin código, con capa editorial, reglas de Word (fondo blanco) y guía de decks.
- `assets/tokens/globals.css` + `assets/tokens/tailwind.config.ts` — fuente de verdad ejecutable, incluye tokens de escala póster, cintas, interlock, contadores e ilustración.
- `assets/logo/` — logo canónico en SVG: horizontal (`-ink` / `-dark` / `-paper` / mono), badges cuadrados sobre teal (lockup e isotipo) e isotipo suelto (teal / ink / paper).
- `assets/illustrations/` — componente `hand-drawn.tsx`, los trazos de las seis ilustraciones a mano (`home.ts`) y sus SVG ya renderizados (`svg/`, recoloreados a la v1.5 el 2026-10-27). Referencia de la ilustración a mano; en el sitio manda la serie del cerebro.
- `assets/components/hero-dots.tsx` — el fondo de trama de puntos del hero, con su shader (requiere la librería `vgpu`).
- `assets/components/hero-field.tsx` — los fondos de hero de las páginas internas, seis patrones (requiere la librería `vgpu`).
- `assets/components/agent-scene.tsx` + `assets/components/scene-shader.ts` — las escenas animadas en volumen y su shader con el vocabulario de formas (requiere la librería `vgpu`). Desde la v1.5 no se usan en el sitio.
- `assets/components/serie-cerebro/` — la serie del cerebro (v1.5): `red-cerebro.ts`, `cerebro-red.tsx`, `agente-robot.tsx`, `herramientas-enchufe.tsx`.
- `assets/components/hero-grano.tsx` — el fondo de grano del hero del home (v1.5).
- `assets/components/enterprise/` — la versión de venta enterprise (v1.6): `foto.tsx`, `aparece.tsx`, `imagenes.ts` (registro de fotos), `home/` (manifiesto, antes-despues, oferta, recorrido, agentes-rubros, banda-control, quienes-somos) y `central/` (componentes-grid, continuidad).
- `assets/style-tile.html` — referencia visual navegable de la v1.6.1 (paleta, tipografía, componentes, foto y firma). Sin la capa editorial.
- `scripts/audit_tokens.py` — detecta hex y fuentes hardcodeadas fuera de los archivos de tokens.

## Mantenimiento

Fuente de verdad desde la v1.3: `.agents/skills/innov-design-system/` del repo del sitio (la copia de `.claude/skills/` es idéntica). Después de editar se carga al brain (borrador del skill, un administrador lo publica) y se actualiza `innov/diseno/`. Si cambia la dirección de arte, se actualiza también `marketing/identidad-visual-innovas` en el brain.

**Versión:** 1.6.1 (octubre 2026) — 2026-10-27, a pedido de Mati al validar la v1.5 y la v1.6. `plum-ui-dark` pasa de `#4F6B00` (2.90:1 sobre `ink`, no llegaba a 3:1) a `#516E00` (3.02:1). El sitio deja el segundo color óxido (`#B0441F`, coral `#E07A55` sobre oscuro) que había quedado en `app/globals.css` y usa la paleta del skill. Reescritas con la v1.5 las secciones de tokens, tipografía, capa editorial, camino del cliente, fuentes con `next/font`, piezas sin código y `references/non-code-usage.md`. Sale `paper-print`. También el 2026-10-27: logo (SVG y PNG, sitio y skill) e ilustraciones a mano recoloreados a la v1.5; style tile rehecho; botones teal sobre oscuro en `teal-ui-dark`; etiqueta "Legal" en `teal-dark`; demos `demo-*.tsx` borradas (sin uso); `leerToken` sin respaldo en hex; `audit_tokens.py` separa errores de avisos, ignora `hover:bg-ink` y exime `components/ui/`. Pendiente: definir si las piezas fuera del sitio pasan a la serie del cerebro.

**1.6** (octubre 2026) — definida por Luli el 2026-10-27. Venta enterprise: fotografía con tratamiento común (`Foto`, `.foto`, `.foto-natural`), token `--color-lima`, `--text-counter-sm`, barra de progreso para secuencias que avanzan solas, home reordenado (manifiesto, hoy → con INNOV.AS, lo que contratás, recorrido de punta a punta, agentes por rubro, control) y `/central-ia` por componentes con la sección de continuidad.

**1.5** (octubre 2026) — definida por Luli el 2026-10-26. Rediseño "B + C" (paleta papel/tinta/teal/lima, Newsreader + Schibsted Grotesk + IBM Plex Mono, barra y botones en pill, tarjetas blancas) y serie del cerebro para las ilustraciones (`CerebroRed`, `AgenteRobot`, `HerramientasEnchufe`), más el hero con grano (`HeroGrano`). Actualizados: este archivo, `assets/tokens/globals.css` y `assets/components/`.

**1.4** (octubre 2026) — decidida por Mati el 2026-10-22. Escenas animadas en volumen para las piezas del producto (`AgentScene`, WebGPU con `vgpu`), con vocabulario fijo de formas, agentes como bots con visor y ojos (excepción a "sin caras" solo para ellos), reacción al cursor, respaldo `HandDrawn` y procedimiento propio de ocho pasos. Excepción de motion que las admite. Actualizados: este archivo, `references/non-code-usage.md` y `assets/components/` (`agent-scene.tsx`, `scene-shader.ts`).

**1.3.1** (octubre 2026) — decidida el 2026-10-22. Fondos animados en el hero claro de las páginas internas (`HeroField`, seis patrones, uno por página) y excepción de motion que los admite. Actualizados: este archivo y `assets/components/hero-field.tsx`.

**1.3** (octubre 2026) — decidida el 2026-10-20 por el reposicionamiento con Central IA adelante. `teal` y `plum` pasan a plataforma y gente (tokens nuevos `--color-accent-system/people`, los `vertical-*` quedan como alias deprecados); el camino de 4 niveles pasa a camino del cliente; sección de contenido y voz; documentos Word con fondo blanco `#FFFFFF`; guía de decks; style tile y brief de ilustración al día. Pendiente: implementar el camino del cliente en el sitio y migrar las clases `vertical-*` del sitio (`app/globals.css`, `lib/utils.ts`).

**1.2** (octubre 2026) — decidida por Mati el 2026-10-10. Escala póster web un escalón menos; hero oscuro con trama de puntos en WebGPU (`HeroDots`, con `vgpu`); ilustración de objetos y diagramas con trazo marcador de 3.2px, acento teal y detalle plum (`HandDrawn`), sin hachurado; dibujo progresivo de ilustraciones y fondo animado del hero admitidos en Motion. Actualizados en esta versión: este archivo, `references/prompt-gema-ilustraciones.md`, `assets/tokens/globals.css` y los addendum de `references/direccion-de-arte.md` y `references/non-code-usage.md`. El camino de producción de ilustraciones es el procedimiento de la sección "Ilustración (v1.2)". Pendiente: refrescar `assets/style-tile.html` y resolver la marquesina de la franja institucional.

**1.1** (agosto 2026) — incorpora el **logo canónico** (isotipo circuito + wordmark `INNOV.AS`) con sus siete variantes en `assets/logo/`, reglas de superficie con contraste calculado, tamaños mínimos medidos y área de resguardo; depreca el wordmark tipográfico anterior y el set con tagline BUILD SOLUTIONS / N invertida.

**1.0** (agosto 2026) — incorpora la capa editorial de escala póster (PosterHeading, TapeLabel, InterlockHeadline, StatCounter, IllustrationSlot) sobre el sistema base "Cálido / Notación de Transición", más la recalibración v1.0 de la spec de ilustración a mano alzada: trazo 3.2px (antes 1.6px), acento 38–54px rotado 7° (antes 28–46px), e incorporación del hachurado a mano para superficies con color (grosor de hachura = 50% del trazo principal), con irregularidad de trazo más marcada. Pendiente para una próxima sincronización: propagar esta recalibración a `references/prompt-gema-ilustraciones.md`, `references/direccion-de-arte.md`, `references/non-code-usage.md` y `assets/tokens/globals.css` (`--illus-stroke`, `--illus-accent-size`, sumar `--illus-accent-rot` y `--illus-fill-stroke`), refrescar `assets/style-tile.html` con ejemplos de la capa editorial, y sumar los **logos institucionales** (BM, BID, FAO, SAGyP) en monocromo para la franja de credibilidad — el logo propio ya quedó incorporado en 1.1.
