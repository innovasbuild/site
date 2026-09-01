# Identidad INNOV.AS en piezas sin código

Cheat sheet para decks (pptx), one-pagers (pdf/docx), branding del LMS, o cualquier pieza donde no hay `var(--...)` disponible. Mismo sistema que el código — acá van los valores literales.

## Paleta (hex directo)

| Uso | Hex | Notas |
|---|---|---|
| Fondo / superficie base | `#EDE8DC` | Oat cálido, no crema-blanco puro. Fondo por defecto de slides y piezas digitales (Google Slides, LMS, etc.). |
| Fondo / superficie base — **documentos Word/PDF** | `#FAF8F5` | Variante más clara del papel, específica para archivos **.docx y .pdf**: el oat `#EDE8DC` se lee bien en pantalla/slide pero queda pesado como fondo de página completa en un documento — `#FAF8F5` mantiene la calidez del sistema sin oscurecer la lectura larga ni gastar tinta de más si se imprime. Usalo en vez de `#EDE8DC` cada vez que el entregable sea un .docx o .pdf. |
| Superficie secundaria (tarjeta, bloque) | `#E4DDCC` | Para diferenciar un bloque sin salir de la familia cálida. En docx/pdf, si el fondo base es `#FAF8F5`, ese mismo `#E4DDCC` ya da contraste suficiente contra el nuevo fondo más claro — no hace falta un tercer tono. |
| Texto principal | `#1F1B19` | Negro cálido, no negro puro. Úsalo para todo texto de cuerpo y titulares. |
| Marca / acento dominante | `#0F6B60` (teal) | Úsalo para el título clave, CTAs, íconos de la vertical "empresas". Es el color que más debe leerse como "INNOV.AS". |
| Acento vertical "personas" | `#8C3B5D` (plum/ciruela) | Solo para marcar contenido de la línea de Educación/personas (kickers, barras). No lo uses como color dominante de una slide completa. |
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

Regla de uso: igual que en la paleta clara, teal domina y plum es puntual (vertical
personas). La única diferencia real es que los hex del acento cambian por la variante
más clara — el resto de las reglas (nunca plum como fondo completo, taupe nunca como
texto de lectura) se mantienen igual.

## Tono y elemento de marca

- La marca firma con el **logo** (arriba) y compone con la **flecha de transición `A ──→ B`**: son dos cosas distintas y conviven. El logo va donde se identifica al emisor — esquina de portada, pie de página, encabezado del one-pager. La flecha es el recurso gráfico del contenido: marcadores de sección, códigos de vertical, progreso, diagramas de estado. Si la pieza pide un elemento gráfico de marca en grande, esa es la flecha — nunca un ícono de IA genérico ni el logo agrandado como decoración.
- Motion/animación (si el formato lo permite, ej. deck presentado en vivo): sobrio. Se anima la flecha o una transición de estado, nunca texto de cuerpo ni logos institucionales (Banco Mundial, BID, etc. — esos van siempre estáticos y monocromos).
- Franjas de logos institucionales: fondo `ink` o `paper-soft`, logos en monocromo, sin efectos. Es la prueba de credibilidad — tiene que sentirse sobria, no promocional.

## Capa editorial (agregado agosto 2026) — cintas, titulares gigantes, contadores

Aplica igual en decks, one-pagers y LMS: no es un tratamiento exclusivo de código.

- **Titulares póster:** 1 a 4 palabras, Fraunces al peso más alto disponible (900 o el equivalente Black/ExtraBold de la herramienta), caja alta, interlineado bien apretado (~0.84, en Canva/Slides ajustalo manualmente si la herramienta no baja de 1.0). En slides de 1280×720 o página impresa, el tamaño de referencia es **~84–104px** — no una escala fluida, porque el lienzo es fijo. No intentes meter una frase larga: si no entra en 2-3 líneas cortas, el titular está mal escrito, no mal maquetado.
- **Cintas (etiquetas rotadas):** texto corto (1-2 palabras) en Space Mono caja alta, rotadas entre -7° y +6°, con una sombra sólida chica offset (no blur) detrás. Máximo 2 cintas por pieza. Sirven para marcar estado o metadato con energía (`NIVEL 02`, `EMPRESAS→`).
- **Contadores:** cifra grande en Fraunces (mismo peso que un titular póster) seguida, en una línea aparte y más chica, de la unidad y el contexto — nunca el número solo. Ej.: `150+` arriba, `egresados del programa` abajo en Inter.
- **Ilustración:** ver spec debajo — si la pieza necesita un diagrama y no hay uno encargado, dejá el espacio en blanco con una nota de placeholder en vez de improvisar un ícono o clipart genérico.

## Spec de ilustración (para encargar las piezas, no para dibujarlas ad-hoc)

- Trazo a mano alzada, ~1.6px, en `#1F1B19` (ink). Una sola pasada continua, con irregularidad visible — no vector geométrico perfecto.
- Sin relleno. Un único acento de color plano por pieza: un cuadradito o punto de ~28-46px en teal (`#0F6B60`) o plum (`#8C3B5D`) si la pieza habla de personas, rotado ~7°.
- Fondo transparente, pensado para apoyarse sobre `paper` o `paper-soft`.
- Registro diagramático (flujos, procesos, mapas de estado) — nunca personajes, escenas, isométrico ni 3D.
- Proporción habitual 4:3 o 16:9.

## Qué evitar

- No uses degradés, sombras difusas (blur) o íconos 3D rellenos — el sistema usa trazo lineal fino y sombras sólidas con offset, no blur.
- No pintes una slide o página entera de plum.
- No uses taupe para texto que alguien tiene que leer con atención (cuerpo, CTAs, datos clave).
