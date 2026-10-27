# Identidad INNOV.AS en piezas sin código

Cheat sheet para decks (pptx), documentos Word (docx), one-pagers (pdf), o cualquier pieza donde no hay `var(--...)` disponible. Mismo sistema que el código — acá van los valores literales. Paleta y tipografía de la **v1.5** (validada por Mati el 2026-10-27), con el ajuste de contraste de la v1.6.1.

## Paleta (hex directo)

| Uso | Hex | Notas |
|---|---|---|
| Fondo / superficie base | `#F6F4EF` (paper) | Papel claro y neutro. Fondo por defecto de slides, piezas digitales y PDF. |
| Fondo / superficie base: **documentos Word (.docx)** | `#FFFFFF` | Blanco puro, para simplificar la impresión: sin color de página ni sombreado de fondo. Decisión del 2026-10-20. |
| Superficie secundaria (tarjeta, bloque) | `#ECEAE3` (paper-soft) | Para diferenciar un bloque sin salir de la familia. Sirve igual sobre blanco. |
| Texto principal | `#15191A` (ink) | Casi negro con un toque verde, no negro puro. Para todo texto de cuerpo y titulares. 16.11:1 sobre papel. |
| Marca / acento dominante | `#0F6B60` (teal) | Título clave, CTAs y detalles de plataforma, sistema y agentes. Es el color que más debe leerse como "INNOV.AS". 5.80:1 sobre papel. |
| Acento "gente" sobre claro | `#4F6B00` (oliva) | Marca a la gente de la empresa y la decisión humana (permisos, aprobaciones) y el detalle con guiño. No lo uses como color dominante de una slide completa. 5.56:1 sobre papel. |
| Neón | `#D4F36B` (lima) | El "encendido" de las ilustraciones y el acento sobre fondo oscuro o sobre foto. **Nunca como texto sobre fondo claro** (1.14:1, no se lee). |
| Metadatos / líneas decorativas | `#A3A69F` (taupe) | Bordes, separadores, notas al pie. **Nunca como color de texto principal** (2.24:1). |
| Rojo funcional (alerta, no es color de marca) | `#B23A48` | Solo para estados de error/riesgo en tablas o diagramas, no para branding. |

Regla de peso: si tuvieras que describir la slide en un color, debería ser teal (o el fondo papel). El oliva y el lima entran puntuales, nunca compiten en protagonismo con teal en la misma pieza.

## Tipografía

| Rol | Familia | Dónde conseguirla |
|---|---|---|
| Títulos / cifras grandes | **Newsreader** | Google Fonts (variable y estáticas). Títulos en peso 500, en minúscula, con la palabra o frase destacada en itálica. Titulares póster en 700. |
| Cuerpo de texto | **Schibsted Grotesk** | Google Fonts. |
| Etiquetas, datos, estados | **IBM Plex Mono** | Google Fonts. Para etiquetas de sección (`03 · CONTROL`), firmas de estado (`4/6 →`) y cintas, nunca para párrafos. |

Las tres tienen licencia abierta (SIL OFL) y hay que instalarlas en la máquina que arma la pieza. Fraunces, Inter y Space Mono son de la versión anterior y no van en ninguna pieza nueva.

Si la herramienta no permite instalar fuentes (ej. algunas plantillas de Canva compartidas), el fallback aceptable es: Georgia para títulos, Arial/Helvetica para cuerpo y Courier New para etiquetas — pero es un fallback, no una alternativa de diseño; si podés instalar las fuentes reales, hacelo.

## Logo

El logo es **isotipo (perfil-circuito) + wordmark `INNOV.AS`**. El wordmark es lettering vectorizado: **no se tipea** — se inserta el SVG/PNG del archivo. Si en tu herramienta escribís "INNOV.AS" en Newsreader, eso es texto, no el logo.

| Variante | Archivo | Fondo donde va | Colores (los del archivo) |
|---|---|---|---|
| Horizontal primaria | `innovas-horizontal-ink.svg` | Claro: papel o blanco | isotipo `#0F6B60` · wordmark `#1F1B19` |
| Horizontal sobre oscuro | `innovas-horizontal-dark.svg` | Tinta (`#15191A`) | isotipo `#159384` · wordmark `#EDE8DC` |
| Badge cuadrado con nombre | `innovas-badge-lockup-teal.svg` | — (trae fondo `#0F6B60`) | marca en `#EDE8DC` |
| Badge cuadrado solo isotipo | `innovas-badge-iso-teal.svg` | — (trae fondo `#0F6B60`) | marca en `#EDE8DC` |
| Isotipo suelto | `innovas-isotipo-teal/ink/paper.svg` | según el color elegido | — |
| Monocromo | `innovas-horizontal-mono-ink/paper.svg` | Franja institucional de un tercero, 1 tinta | todo en un solo color |

⚠️ Los SVG del logo todavía tienen la tinta y el papel de la v1.4 (`#1F1B19`, `#EDE8DC`). Se usan igual, sin recolorear a mano, hasta que se actualicen los archivos.

**Reglas que no se negocian en una slide ni en un Word:**

- **Sobre fondo oscuro cambia el archivo, no el color a mano.** El isotipo teal `#0F6B60` sobre tinta no se lee; la variante oscura existe para eso.
- **Tamaño mínimo:** horizontal 120px de ancho en pantalla (≈32mm impreso); isotipo suelto 24px. Por debajo, el circuito se funde. Para un favicon de 16px usá el badge, no el isotipo transparente.
- **Área de resguardo:** el archivo ya la trae (90px de margen sobre el lienzo de 991×319). Si lo recortás, reponé ese margen: nada — texto, cinta, borde, foto — entra ahí.
- **No:** degradé, sombra, blur, rotación, estirado no proporcional, recolor fuera de la tabla, separar isotipo y wordmark para armar tu propio lockup, agregarle tagline.
- El set anterior con **BUILD SOLUTIONS** y la **N invertida** está deprecado. Si lo encontrás en una plantilla vieja, reemplazalo.

## Slides o páginas con fondo oscuro (puntual, no todo el deck)

Para una slide de cierre, una sección de énfasis, o una cita destacada sobre fondo oscuro — no para todo el deck, esto es puntual — usá esta variante en vez de la paleta de arriba:

| Uso | Hex | Notas |
|---|---|---|
| Fondo | `#15191A` (ink) | El mismo ink que se usa como texto en la paleta clara, acá pasa a ser el fondo. |
| Superficie secundaria sobre oscuro | `#1F2526` | Para un bloque o tarjeta que necesite diferenciarse del fondo. |
| Texto principal sobre oscuro | `#F6F4EF` (paper) | 16.11:1. |
| Acento teal sobre oscuro | `#5CC4B0` | **No uses el `#0F6B60` de la paleta clara acá.** 8.41:1 sobre tinta. Para un relleno teal (botón, bloque) con texto blanco encima, `#107468`. |
| Acento "gente" sobre oscuro | `#D4F36B` (lima) | 14.19:1. Para un relleno oliva con texto blanco encima, `#516E00` (3.02:1 contra el fondo). |

Regla de uso: igual que en la paleta clara, teal domina y el segundo color es puntual (gente y guiño). Taupe nunca como texto de lectura.

## Fotografía

En el sitio entra la fotografía de ambiente con tratamiento común (sección "Fotografía (v1.6)" del `SKILL.md`). En una pieza fija se puede usar una foto del registro del sitio (`content/imagenes.ts`) ya tratada: color apenas bajado, contraste suave, grano fino. El texto encima va sobre un velo de tinta y el acento es lima. Sin caras reconocibles de clientes ni logos, y nunca presentada como un caso o como el equipo real.

## Tono y elemento de marca

- La marca firma con el **logo** (arriba) y compone con la **flecha de transición `A ──→ B`**: son dos cosas distintas y conviven. El logo va donde se identifica al emisor — esquina de portada, pie de página, encabezado del one-pager. La flecha es el recurso gráfico del contenido: marcadores de sección, rieles de mensaje, progreso, diagramas de estado. Si la pieza pide un elemento gráfico de marca en grande, esa es la flecha — nunca un ícono de IA genérico ni el logo agrandado como decoración.
- Motion/animación (si el formato lo permite, ej. deck presentado en vivo): sobrio. Se anima la flecha o una transición de estado, nunca texto de cuerpo ni logos de organizaciones (siempre estáticos y monocromos en decks, documentos y PDF).
- Franjas de logos institucionales: fondo `ink` o `paper-soft`, logos en monocromo, sin efectos. Es la prueba de credibilidad — tiene que sentirse sobria, no promocional.

## Capa editorial — cintas, titulares gigantes, contadores

Aplica igual en decks, one-pagers y documentos: no es un tratamiento exclusivo de código.

- **Titulares póster:** 1 a 4 palabras, Newsreader 700, en minúscula, con la palabra o frase destacada en itálica (en teal, o en lima sobre oscuro). Interlineado apretado (~0.95–1.0) y un tracking apenas negativo (−3%). En slides de 1280×720 o página impresa, el tamaño de referencia es **~84–104px** — no una escala fluida, porque el lienzo es fijo. Si no entra en 2-3 líneas cortas, el titular está mal escrito, no mal maquetado.
- **Etiquetas de sección:** IBM Plex Mono en mayúscula con número y punto medio: `03 · CONTROL`.
- **Cintas (etiquetas rotadas):** texto corto (1-2 palabras) en IBM Plex Mono caja alta, rotadas entre -7° y +6°, con una sombra sólida chica offset (no blur) detrás. Máximo 2 cintas por pieza. Sirven para marcar estado o metadato con energía (`OLA CERO`, `RADAR`).
- **Contadores:** cifra grande en Newsreader seguida, en una línea aparte y más chica, de la unidad y el contexto — nunca el número solo. Ej.: `150+` arriba, `organizaciones transformadas en 14 países` abajo en Schibsted Grotesk. En una fila de varias cifras, tamaño de sección, no póster.
- **Botones y etiquetas:** en píldora. Tarjetas blancas con filete de tinta; se prefieren filas con filetes y columnas separadas por líneas antes que grillas de tarjetas iguales.
- **Ilustración:** ver spec debajo — si la pieza necesita un diagrama y no hay uno encargado, dejá el espacio en blanco con una nota de placeholder en vez de improvisar un ícono o clipart genérico.

## Ilustraciones

- **Producto (Brain, agentes, herramientas):** la serie del cerebro del sitio (sección "Ilustraciones: la serie del cerebro (v1.5)" del `SKILL.md`). En una pieza fija se usa una captura a 2x del dibujo ya armado, sobre el mismo fondo de la pieza, sin recorte ni sombra agregada. Línea de tinta, nodos y cabeza en teal, encendido en lima.
- **Ilustración a mano (v1.2):** ⚠️ sin definir si sigue para piezas fuera del sitio. Si se usa, trazo tipo marcador de ~3.2px en `#15191A`, extremos redondeados, dos acentos planos por pieza (teal `#0F6B60` principal, un bloque de 38 a 54px rotado ~7°; oliva `#4F6B00` como detalle de hasta 30px con el guiño), fondo transparente, lienzo 4:3 (400×300), objetos y diagramas, sin personas. Los SVG de `assets/illustrations/svg/` tienen todavía los colores de la v1.4.

## Documentos Word (.docx): fondo blanco (v1.3)

Decisión del 2026-10-20: los documentos Word se diseñan para imprimirse sin gastar tinta ni pelear con el color de página.

- **Fondo:** blanco `#FFFFFF`. Sin color de página ni sombreado de fondo en ninguna sección.
- **Texto y estructura:** `#15191A` para cuerpo y titulares. Filetes y bordes de tabla en `#15191A` o `#A3A69F` (taupe solo como filete, nunca como texto).
- **Acento:** `#0F6B60` para el título clave, filetes y encabezados de tabla (6.38:1 sobre blanco). `#4F6B00` solo como detalle puntual (6.11:1). El lima no va en Word: sobre blanco no se lee.
- **Bloques secundarios** (cuadro destacado, fila de tabla): `#ECEAE3`.
- **Sin bloques de color a sangre ni franjas de borde a borde:** se imprimen mal en impresoras de oficina. El bloque lateral teal es para decks y web.
- **Logo:** `innovas-horizontal-ink.svg` en el encabezado o la portada, con su área de resguardo.
- **Tipografía:** Newsreader para títulos, Schibsted Grotesk para cuerpo, IBM Plex Mono para estados y datos. Si quien recibe el archivo no tiene las fuentes, el fallback es Georgia para títulos y Arial para cuerpo.
- **Capa editorial:** titular póster y cintas se reservan para la portada, si la pieza las necesita. Dentro del documento, títulos normales.

## Decks (v1.3, valores de la v1.5)

Guía agnóstica del formato. Los decks de INNOV.AS se arman en el formato nativo de Claude (el tipo Slides) y se exportan de ahí a .pptx. Esta sección aporta la marca; la estructura y la edición de cada slide siguen las instrucciones del tipo que se use. Las reglas valen igual si el deck se arma en otra herramienta.

**Lienzo y tamaños**
- Lienzo 16:9. Los valores de referencia están calibrados sobre 1280×720 px.
- Titular póster: 84, 96 o 104 px según `--text-poster-slide-sm/-slide/-slide-xl`. En el .pptx exportado equivalen a 63, 72 y 78 pt (1 px = 0,75 pt sobre un lienzo de 13,33 pulgadas de ancho).
- Un titular póster por slide, de 1 a 4 palabras. Máximo 2 cintas por slide.

**Color y fondo**
- Valores en hex directo de la paleta de este archivo, nunca los de un tema de la herramienta. Fondo `#F6F4EF`, texto `#15191A`, acento `#0F6B60`, oliva `#4F6B00` solo para la gente, la decisión humana o el guiño.
- Slides oscuras: máximo 2 por deck, con la paleta oscura de arriba y el logo `innovas-horizontal-dark.svg`. Fondo `#15191A` liso o con una foto tratada y su velo.
- Portada y cierre pueden usar el bloque de color lateral teal o una foto a sangre con velo de tinta. Son los únicos elementos a sangre del deck.

**Tipografía**
- Newsreader para titulares y cifras, Schibsted Grotesk para cuerpo, IBM Plex Mono para etiquetas, estados y cintas.
- El .pptx exportado usa las fuentes que tenga instaladas quien lo abra. Sin ellas cae a Georgia para titulares y Arial para cuerpo. Cuando el deck va a otra persona, avisar o enviar también el PDF, que conserva las fuentes. No sustituir por otra familia a mano.

**Logo, ilustraciones y fotos**
- El logo es siempre el archivo de `assets/logo/`, con su área de resguardo y tamaño mínimo. Si el formato no admite SVG, usar un PNG exportado a 2x del mismo SVG, sin recolorear.
- Ilustraciones de producto: capturas de la serie del cerebro a 2x. Sin animación.
- Fotos: las del registro del sitio, con su tratamiento, y nunca más de una foto grande por slide.
- Las cintas llevan sombra sólida con desplazamiento y sin desenfoque.

**Movimiento**
- Cada slide se lee completa en estático. El .pptx exportado puede perder animaciones y transiciones del formato nativo, así que ninguna idea depende de ellas.

**Esqueleto sugerido** (el del home del sitio, v1.6; se adapta a la audiencia)
1. Portada con el logo y el titular.
2. Manifiesto o "hoy ──→ con INNOV.AS" con pares A y B explícitos.
3. Lo que contrata la empresa: infraestructura, agentes y equipo.
4. Un proceso, no un proyecto: primera conversación, Radar, ola cero, olas y operación continua.
5. Agentes que toman trabajo, por rubro: "el agente ──→ tu gente".
6. Control: "tu gente decide, los agentes ejecutan".
7. Quiénes somos: trayectoria del equipo con contadores (cifra, unidad y contexto).
8. Cierre con la primera conversación como siguiente paso.

**Voz:** la sección "Contenido y voz en piezas de marca" del `SKILL.md`.

**Verificación después de exportar a .pptx**
- Abrir el archivo y revisar fuentes, fondo, logo y que cada slide se lea completa.
- Contraste: texto `#F6F4EF` sobre `#15191A`, acentos `#5CC4B0` y `#D4F36B` solo en slides oscuras; lima nunca como texto sobre claro.
- Sin guion largo ni signos de apertura (¿ ¡) en ningún texto.
- Máximo 2 slides oscuras, un titular póster y 2 cintas por slide.

## Contenido y voz

Antes de escribir el copy de cualquier pieza, aplicá la sección "Contenido y voz en piezas de marca" del `SKILL.md` (canon en `marketing/mensajes-innovas` del brain).

## Qué evitar

- No uses degradés, sombras difusas (blur) o íconos 3D rellenos — el sistema usa trazo lineal fino y sombras sólidas con offset, no blur. La excepción es el velo de tinta sobre las fotos.
- No pintes una slide o página entera de oliva ni de lima.
- No uses lima como texto sobre fondo claro.
- No uses taupe para texto que alguien tiene que leer con atención (cuerpo, CTAs, datos clave).
