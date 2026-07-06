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

## Tono y elemento de marca

- El elemento visual que identifica a la marca es la **flecha de transición `A ──→ B`** (un estado inicial que se transforma en otro). Si la pieza tiene espacio para un elemento gráfico de marca (portada de deck, encabezado de one-pager), esta flecha — no un logo genérico ni un ícono de IA genérico — es el recurso correcto.
- Motion/animación (si el formato lo permite, ej. deck presentado en vivo): sobrio. Se anima la flecha o una transición de estado, nunca texto de cuerpo ni logos institucionales (Banco Mundial, BID, etc. — esos van siempre estáticos y monocromos).
- Franjas de logos institucionales: fondo `ink` o `paper-soft`, logos en monocromo, sin efectos. Es la prueba de credibilidad — tiene que sentirse sobria, no promocional.

## Qué evitar

- No uses degradés, sombras difusas (blur) o íconos 3D rellenos — el sistema usa trazo lineal fino y sombras sólidas con offset, no blur.
- No pintes una slide o página entera de plum.
- No uses taupe para texto que alguien tiene que leer con atención (cuerpo, CTAs, datos clave).
