# Identidad INNOV.AS en piezas sin código

Cheat sheet para decks (pptx), documentos Word (docx), one-pagers (pdf), o cualquier pieza donde no hay `var(--...)` disponible. Mismo sistema que el código — acá van los valores literales.

## Paleta (hex directo)

| Uso | Hex | Notas |
|---|---|---|
| Fondo / superficie base | `#EDE8DC` | Oat cálido, no crema-blanco puro. Fondo por defecto de slides y piezas digitales (Google Slides, etc.). |
| Fondo / superficie base: **documentos Word (.docx)** | `#FFFFFF` | Blanco puro, para simplificar la impresión: sin color de página ni sombreado de fondo. Decisión del 2026-10-20. Presentaciones y web no cambian. |
| Fondo / superficie base: **PDF** | `#FAF8F5` | Variante clara del papel para lectura larga e impresión. Se usa en .pdf; el oat `#EDE8DC` pesa demasiado como fondo de página completa. |
| Superficie secundaria (tarjeta, bloque) | `#E4DDCC` | Para diferenciar un bloque sin salir de la familia cálida. En docx (fondo blanco) y pdf, `#E4DDCC` da contraste suficiente contra el fondo más claro: no hace falta un tercer tono. |
| Texto principal | `#1F1B19` | Negro cálido, no negro puro. Úsalo para todo texto de cuerpo y titulares. |
| Marca / acento dominante | `#0F6B60` (teal) | Úsalo para el título clave, CTAs y detalles de plataforma, sistema y agentes. Es el color que más debe leerse como "INNOV.AS". |
| Acento "gente" | `#8C3B5D` (plum/ciruela) | Marca a la gente de la empresa y la decisión humana (permisos, aprobaciones), y el detalle con guiño de las ilustraciones. No lo uses como color dominante de una slide completa. |
| Metadatos / líneas decorativas | `#A79E8E` (taupe) | Bordes, separadores, notas al pie. **Nunca como color de texto principal** — el contraste no alcanza para lectura cómoda. |
| Rojo funcional (alerta, no es color de marca) | `#B23A48` | Solo para estados de error/riesgo en tablas o diagramas, no para branding. |

Regla de peso: si tuvieras que describir la slide en un color, debería ser teal (o el fondo papel). Plum entra puntual, nunca compite en protagonismo con teal en la misma pieza.

## Tipografía

| Rol | Familia | Dónde conseguirla |
|---|---|---|
| Títulos / números grandes | Fraunces | Google Fonts (variable, pesos 100–900). En Office/Canva sin soporte variable, usar el peso estático más cercano a 600–700 (SemiBold/Bold). |
| Cuerpo de texto | Inter | Google Fonts. Viene preinstalada o descargable en la mayoría de editores. |
| Datos, etiquetas de estado, notación técnica | Space Mono | Google Fonts. Úsala con moderación — es para "firmar" datos o estados (`4/6 →`), nunca para párrafos completos. |

Si la herramienta no permite instalar fuentes (ej. algunas plantillas de Canva compartidas), el fallback aceptable es: Georgia para títulos, sistema (Arial/Helvetica/system-ui) para cuerpo — pero es un fallback, no una alternativa de diseño; si podés instalar las fuentes reales, hacelo.

## Logo

El logo es **isotipo (perfil-circuito) + wordmark `INNOV.AS`**. El wordmark es lettering vectorizado: **no se tipea** — se inserta el SVG/PNG del archivo. Si en tu herramienta escribís "INNOV.AS" en Fraunces, eso es texto, no el logo.

| Variante | Archivo | Fondo donde va | Colores |
|---|---|---|---|
| Horizontal primaria | `innovas-horizontal-ink.svg` | Claro: `#EDE8DC`, `#FAF8F5`, blanco | isotipo `#0F6B60` · wordmark `#1F1B19` |
| Horizontal sobre oscuro | `innovas-horizontal-dark.svg` | `#1F1B19` / `#2A2522` | isotipo `#159384` · wordmark `#EDE8DC` |
| Badge cuadrado con nombre | `innovas-badge-lockup-teal.svg` | — (trae fondo `#0F6B60`) | marca en `#EDE8DC` |
| Badge cuadrado solo isotipo | `innovas-badge-iso-teal.svg` | — (trae fondo `#0F6B60`) | marca en `#EDE8DC` |
| Isotipo suelto | `innovas-isotipo-teal/ink/paper.svg` | según el color elegido | — |
| Monocromo | `innovas-horizontal-mono-ink/paper.svg` | Franja institucional de un tercero, 1 tinta | todo en un solo color |

**Reglas que no se negocian en una slide ni en un Word:**

- **Sobre fondo oscuro cambia el archivo, no el color a mano.** El isotipo teal `#0F6B60` sobre `#1F1B19` da 2.68:1 — ilegible. La variante oscura usa `#159384` (4.51:1).
- **Tamaño mínimo:** horizontal 120px de ancho en pantalla (≈32mm impreso); isotipo suelto 24px. Por debajo, el circuito se funde. Para un favicon de 16px usá el badge, no el isotipo transparente.
- **Área de resguardo:** el archivo ya la trae (90px de margen sobre el lienzo de 991×319). Si lo recortás, reponé ese margen: nada — texto, cinta, borde, foto — entra ahí.
- **No:** degradé, sombra, blur, rotación, estirado no proporcional, recolor fuera de la tabla, separar isotipo y wordmark para armar tu propio lockup, agregarle tagline.
- El set anterior con **BUILD SOLUTIONS** y la **N invertida** está deprecado. Si lo encontrás en una plantilla vieja, reemplazalo.

## Slides o páginas con fondo oscuro (puntual, no todo el deck)

Para una slide de cierre, una sección de énfasis, o una cita destacada sobre fondo
oscuro — no para todo el deck, esto es puntual — usá esta variante en vez de la
paleta de arriba:

| Uso | Hex | Notas |
|---|---|---|
| Fondo | `#1F1B19` (ink) | El mismo ink que se usa como texto en la paleta clara, acá pasa a ser el fondo. |
| Superficie secundaria sobre oscuro | `#2A2522` | Para un bloque o tarjeta que necesite diferenciarse del fondo, sin ser un color de marca. |
| Texto principal sobre oscuro | `#EDE8DC` (paper) | El fondo claro pasa a ser el texto — es una inversión completa, no una simplificación. |
| Acento teal sobre oscuro | `#159384` | **No uses el `#0F6B60` de la paleta clara acá** — sobre fondo oscuro se ve apagado y pierde legibilidad. Este tono más claro es la versión correcta para fondo oscuro. |
| Acento plum sobre oscuro | `#C0688D` | Mismo motivo: el `#8C3B5D` original es para fondo claro. |

Regla de uso: igual que en la paleta clara, teal domina y plum es puntual (gente y guiño). La única diferencia real es que los hex del acento cambian por la variante
más clara — el resto de las reglas (nunca plum como fondo completo, taupe nunca como
texto de lectura) se mantienen igual.

## Tono y elemento de marca

- La marca firma con el **logo** (arriba) y compone con la **flecha de transición `A ──→ B`**: son dos cosas distintas y conviven. El logo va donde se identifica al emisor — esquina de portada, pie de página, encabezado del one-pager. La flecha es el recurso gráfico del contenido: marcadores de sección, rieles de mensaje, progreso, diagramas de estado. Si la pieza pide un elemento gráfico de marca en grande, esa es la flecha — nunca un ícono de IA genérico ni el logo agrandado como decoración.
- Motion/animación (si el formato lo permite, ej. deck presentado en vivo): sobrio. Se anima la flecha o una transición de estado, nunca texto de cuerpo ni logos de organizaciones (siempre estáticos y monocromos en decks, documentos y PDF).
- Franjas de logos institucionales: fondo `ink` o `paper-soft`, logos en monocromo, sin efectos. Es la prueba de credibilidad — tiene que sentirse sobria, no promocional.

## Capa editorial (agregado agosto 2026) — cintas, titulares gigantes, contadores

Aplica igual en decks, one-pagers y documentos: no es un tratamiento exclusivo de código.

- **Titulares póster:** 1 a 4 palabras, Fraunces al peso más alto disponible (900 o el equivalente Black/ExtraBold de la herramienta), caja alta, interlineado bien apretado (~0.84, en Canva/Slides ajustalo manualmente si la herramienta no baja de 1.0). En slides de 1280×720 o página impresa, el tamaño de referencia es **~84–104px** — no una escala fluida, porque el lienzo es fijo. No intentes meter una frase larga: si no entra en 2-3 líneas cortas, el titular está mal escrito, no mal maquetado.
- **Cintas (etiquetas rotadas):** texto corto (1-2 palabras) en Space Mono caja alta, rotadas entre -7° y +6°, con una sombra sólida chica offset (no blur) detrás. Máximo 2 cintas por pieza. Sirven para marcar estado o metadato con energía (`OLA CERO`, `RADAR`).
- **Contadores:** cifra grande en Fraunces (mismo peso que un titular póster) seguida, en una línea aparte y más chica, de la unidad y el contexto — nunca el número solo. Ej.: `150+` arriba, `organizaciones transformadas en 14 países` abajo en Inter.
- **Ilustración:** ver spec debajo — si la pieza necesita un diagrama y no hay uno encargado, dejá el espacio en blanco con una nota de placeholder en vez de improvisar un ícono o clipart genérico.

## Spec de ilustración (para encargar las piezas, no para dibujarlas ad-hoc)

Spec v1.2 (octubre 2026):

- Trazo tipo marcador, ~3.2px, en `#1F1B19` (ink), con extremos redondeados e irregularidad de mano visible.
- Sin relleno en el trazo. Dos acentos planos por pieza: teal (`#0F6B60`) como principal, un bloque de 38 a 54px rotado ~7°; y plum (`#8C3B5D`) como detalle, de hasta 30px, que lleva el guiño. Plum siempre pesa menos que teal.
- Fondo transparente, pensado para apoyarse sobre `paper` o `paper-soft`.
- Registro de objetos y diagramas: ventanas, notas, carpetas, llaves, candados, flechas, nodos. Sin personas, escenas, isométrico ni 3D.
- Tono claro, con un solo guiño por pieza.
- Proporción 4:3 (lienzo 400x300).
- Titulares póster en web: un escalón menos desde la v1.2 (tope de 64px en el tamaño chico). En slides y documentos la escala no cambió.
- Fondo del hero en piezas fijas: una captura quieta de la trama de puntos, puntos en `#EDE8DC` apagados sobre `#1F1B19` con un foco en `#159384`.

## Documentos Word (.docx): fondo blanco (v1.3)

Decisión del 2026-10-20: los documentos Word se diseñan para imprimirse sin gastar tinta ni pelear con el color de página. Presentaciones y web quedan como están.

- **Fondo:** blanco `#FFFFFF`. Sin color de página ni sombreado de fondo en ninguna sección.
- **Texto y estructura:** `#1F1B19` para cuerpo y titulares. Filetes y bordes de tabla en `#1F1B19` o `#A79E8E` (taupe solo como filete, nunca como texto).
- **Acento:** `#0F6B60` para el título clave, filetes y encabezados de tabla. `#8C3B5D` solo como detalle puntual.
- **Bloques secundarios** (cuadro destacado, fila de tabla): `#E4DDCC`, el único tono cálido de superficie.
- **Sin bloques de color a sangre ni franjas de borde a borde:** se imprimen mal en impresoras de oficina. El bloque lateral teal es para decks y web.
- **Logo:** `innovas-horizontal-ink.svg` en el encabezado o la portada, con su área de resguardo. Sobre blanco vale la variante primaria.
- **Tipografía:** Fraunces para títulos, Inter para cuerpo, Space Mono para estados y datos. Si quien recibe el archivo no tiene las fuentes, el fallback es Georgia para títulos y Arial para cuerpo.
- **Capa editorial:** titular póster y cintas se reservan para la portada, si la pieza las necesita. Dentro del documento, títulos normales.

## Decks (v1.3)

Guía agnóstica del formato. Los decks de INNOV.AS se arman en el formato nativo de Claude (el tipo Slides) y se exportan de ahí a .pptx. Esta sección aporta la marca; la estructura y la edición de cada slide siguen las instrucciones del tipo que se use. Las reglas valen igual si el deck se arma en otra herramienta.

**Lienzo y tamaños**
- Lienzo 16:9. Los valores de referencia están calibrados sobre 1280×720 px.
- Titular póster: 84, 96 o 104 px según `--text-poster-slide-sm/-slide/-slide-xl`. En el .pptx exportado equivalen a 63, 72 y 78 pt (1 px = 0,75 pt sobre un lienzo de 13,33 pulgadas de ancho).
- Un titular póster por slide, de 1 a 4 palabras. Máximo 2 cintas por slide.

**Color y fondo**
- Valores en hex directo de la paleta de este archivo, nunca los de un tema de la herramienta. Fondo `#EDE8DC`, texto `#1F1B19`, acento `#0F6B60`, `#8C3B5D` solo para la gente, la decisión humana o el guiño.
- Slides oscuras: máximo 2 por deck, con la paleta oscura de arriba y el logo `innovas-horizontal-dark.svg`. Una puede llevar la captura fija de la trama de puntos del hero; si el formato no admite la imagen, fondo `#1F1B19` liso.
- Portada y cierre pueden usar el bloque de color lateral teal. Es el único elemento a sangre del deck.

**Tipografía**
- Fraunces para titulares y cifras, Inter para cuerpo, Space Mono para estados y cintas.
- El .pptx exportado usa las fuentes que tenga instaladas quien lo abra. Sin ellas cae a Georgia para titulares y Arial para cuerpo. Cuando el deck va a otra persona, avisar o enviar también el PDF, que conserva las fuentes. No sustituir por otra familia a mano.

**Logo e ilustraciones**
- El logo es siempre el archivo de `assets/logo/`, con su área de resguardo y tamaño mínimo. Si el formato no admite SVG, usar un PNG exportado a 2x del mismo SVG, sin recolorear.
- Las ilustraciones son las del home (`assets/illustrations/svg/`) o piezas nuevas hechas con el procedimiento de ocho pasos, insertadas como SVG o PNG a 2x. Sin animación.
- Las cintas llevan sombra sólida con desplazamiento y sin desenfoque.

**Movimiento**
- Cada slide se lee completa en estático. El .pptx exportado puede perder animaciones y transiciones del formato nativo, así que ninguna idea depende de ellas.

**Esqueleto sugerido** (el del sitio; se adapta a la audiencia)
1. Portada con el logo y el titular.
2. Los tres dolores, con sus ilustraciones.
3. Las tres piezas de Central IA: Brain, agentes y herramientas.
4. Gobierno: "tu gente decide, los agentes ejecutan".
5. Dos puertas: la plataforma y el asistente que la persona ya usa.
6. Camino del cliente: primera conversación, Radar, ola cero, olas y operación continua.
7. Quiénes somos: trayectoria del equipo con contadores (cifra, unidad y contexto).
8. Cierre con la primera conversación como siguiente paso.

**Voz:** la sección "Contenido y voz en piezas de marca" del `SKILL.md`. La plataforma va adelante y los servicios se cuentan sobre ella.

**Verificación después de exportar a .pptx**
- Abrir el archivo y revisar fuentes, fondo, logo y que cada slide se lea completa.
- Contraste: texto `#EDE8DC` sobre `#1F1B19`, acentos `#159384` y `#C0688D` solo en slides oscuras.
- Sin guion largo ni signos de apertura (¿ ¡) en ningún texto.
- Máximo 2 slides oscuras, un titular póster y 2 cintas por slide.

## Contenido y voz

Antes de escribir el copy de cualquier pieza, aplicá la sección "Contenido y voz en piezas de marca" del `SKILL.md` (canon en `marketing/mensajes-innovas` del brain).

## Qué evitar

- No uses degradés, sombras difusas (blur) o íconos 3D rellenos — el sistema usa trazo lineal fino y sombras sólidas con offset, no blur.
- No pintes una slide o página entera de plum.
- No uses taupe para texto que alguien tiene que leer con atención (cuerpo, CTAs, datos clave).
