---
name: "innov-design-system"
description: "Sistema de identidad visual de INNOV.AS y de su plataforma Central IA: paleta papel/tinta/teal/lima, Newsreader/Schibsted Grotesk/IBM Plex Mono, logo perfil-circuito, flecha A→B, titulares en minúscula con palabra en itálica, ilustraciones de la serie del cerebro, fotografía del sitio y reglas por soporte (web, presentaciones, documentos, redes sociales, email). Usar SIEMPRE al crear, editar o revisar cualquier pieza de INNOV.AS en cualquier soporte: sitio, decks, one-pagers, Word, PDF, posteos, firmas o mails, y al proponer cambios al sistema de marca. Activar también con ilustraciones, cerebro, robot o agentes dibujados, diagramas, hero, colores, tipografías, tokens, logo, favicon, titulares póster, camino del cliente o voz de marca. Reglas duras: cero hex o fuentes hardcodeados (var(--...) o Tailwind); el logo siempre es el archivo; las ilustraciones nuevas siguen la serie del cerebro; los Word llevan fondo blanco."
---

# INNOV.AS — Design System

## Qué es

Sistema **"Cálido / Notación de Transición"**: papel claro y serif de lectura (lo editorial), más notación técnica en mono (lo de sistema), sobre neutros. Es la identidad de INNOV.AS, la empresa que acompaña a empresas grandes a adoptar IA de punta a punta sobre su plataforma, Central IA.

Los dos acentos tienen rol fijo: **`teal` es la plataforma** (sistema, agentes, herramientas) y **el segundo color es la gente de la empresa** (quién decide, quién aprueba, el guiño): oliva sobre claro y lima sobre oscuro. Es la misma idea que "tu gente decide, los agentes ejecutan".

La marca se apoya en cinco elementos:

1. **El logo** (isotipo perfil-circuito + wordmark `INNOV.AS`): la firma institucional. Identifica al emisor.
2. **La flecha `A ──→ B`**: el recurso gráfico de composición y la tesis del negocio (la empresa pasa de IA suelta a IA con gobierno). Va en marcadores, rieles de mensaje, progreso y diagramas.
3. **El titular con palabra destacada**: Newsreader en minúscula, con la palabra o frase que importa en itálica ("la IA de tu empresa, *de punta a punta*").
4. **La notación mono**: etiquetas de sección en IBM Plex Mono (`03 · CONTROL`), estados (`4/6 →`) y cintas.
5. **El encendido lima**: el neón de las ilustraciones y el acento sobre fondo oscuro o foto.

Esto no se rediscute en cada pieza. El trabajo de cualquier entregable es **aplicar** el sistema, no inventar paletas, tipografías ni recursos "parecidos".

**Ámbito:** marca de INNOV.AS y de Central IA. Los logos de terceros (franja de organizaciones, clientes) solo aparecen en monocromo y sin efectos.

## Cómo usar este skill

1. Leer este archivo: define la base que vale en todos los soportes (paleta, tipografía, logo, elementos firma, imagen, voz).
2. Abrir el archivo del soporte de la pieza en `references/soportes/`: formatos, medidas, tamaños, estructura tipo y checklist.
3. Al terminar, pasar el checklist del soporte y el checklist general de este archivo.

| Soporte | Archivo |
|---|---|
| Web y pantallas (sitio, landings, UI de Central IA) | `references/soportes/web.md` + `references/componentes.md` |
| Presentaciones | `references/soportes/slides.md` |
| Documentos (Word, PDF, one-pagers, propuestas) | `references/soportes/documentos.md` |
| Redes sociales | `references/soportes/redes.md` ⚠️ propuesta v1.7 |
| Email (firma, mails comerciales, newsletters) | `references/soportes/email.md` ⚠️ propuesta v1.7 |
| Soporte que no está en la lista | Aplicar la base de este archivo y proponerlo con `references/soportes/_plantilla.md` |

Las reglas están escritas para cualquier herramienta. Cada archivo de soporte termina con "Notas por herramienta", la única sección donde se nombran productos.

**Ilustraciones** (serie del cerebro, ilustración a mano y su procedimiento): `references/ilustracion.md`.
**Para cambiar o hacer crecer el sistema:** `references/gobierno.md` (quién decide, núcleo y evolución, circuito de cambio) y `references/decisiones.md` (registro de decisiones y pendientes).

## Regla dura para código

**Cero hex y cero nombres de fuente literales en JSX/TSX/CSS de componentes.** Todo color y tipografía se consume vía `var(--...)` o clases Tailwind mapeadas (`bg-paper`, `text-ink`, `text-teal`, `font-display`). Un valor que no está en `assets/tokens/globals.css` se agrega ahí primero. Auditar con `python3 scripts/audit_tokens.py <carpeta>` antes de entregar.

**Lienzos fijos** (slides, print, .docx, .pdf, redes) usan siempre la escala en px (`--text-poster-slide-*`), nunca la escala `clamp` de web, que mide contra el ancho del navegador y no contra el lienzo. En componentes: `scale="slide"`.

## Paleta

Contrastes medidos con la fórmula WCAG 2.1 el 2026-10-27, contra `paper` salvo que se indique otra cosa.

| Token | Hex | Rol | Contraste |
|---|---|---|---|
| `paper` | `#F6F4EF` | Superficie base (web, slides, PDF, redes) | — |
| `paper-soft` | `#ECEAE3` | Bloque secundario, tarjeta, franja | — |
| blanco | `#FFFFFF` | Superficie base **solo .docx**; tarjetas sobre `paper` | — |
| `ink` | `#15191A` | Texto y estructura; fondo de secciones oscuras | 16.11:1 AAA |
| `teal` | `#0F6B60` | **MARCA.** Plataforma, sistema, agentes, botones, links | 5.80:1 AA (6.38:1 sobre blanco) |
| `plum` (oliva) | `#4F6B00` | La gente de la empresa, decisión humana, guiño, sobre claro | 5.56:1 AA (6.11:1 sobre blanco) |
| `lima` | `#D4F36B` | Neón: encendido de ilustraciones, acento sobre oscuro o foto | 14.19:1 sobre `ink`. **Nunca texto sobre claro** (1.14:1) |
| `taupe` | `#A3A69F` | Bordes, ticks, separadores, metadatos no esenciales | 2.24:1 → **nunca texto de lectura** |
| `danger` | `#B23A48` | Solo estados de error o riesgo, con etiqueta de texto | — no es color de marca |

Los tokens del segundo color conservan el nombre `plum` para no romper el código.

### Jerarquía de color

- **Teal manda.** Si tuvieras que describir la pieza en un color, es teal sobre papel.
- **El segundo color acentúa.** Oliva (o lima sobre oscuro) marca a la gente y la decisión humana, y lleva el guiño. Nunca relleno masivo ni una slide entera, y nunca con el mismo peso que teal en un mismo componente.
- **Tinta es la voz.** Títulos, cuerpo y estructura en `ink`.
- **Lima es luz, no texto.** Sobre claro solo como relleno o trazo de ilustración, nunca como letra.

### Fondos oscuros (secciones puntuales, no dark-mode)

Para hero, portada y cierre de deck, cita o banda de énfasis. Máximo **2 pantallas o slides oscuras por pieza**.

| Uso | Token | Hex | Contraste sobre `ink` |
|---|---|---|---|
| Fondo | `ink` | `#15191A` | — |
| Tarjeta elevada | `ink-soft` | `#1F2526` | — |
| Texto | `paper` | `#F6F4EF` | 16.11:1 |
| Teal (texto, íconos chicos) | `teal-dark` | `#5CC4B0` | 8.41:1 |
| Teal (relleno de botón, texto blanco encima) | `teal-ui-dark` | `#107468` | 3.14:1 (blanco encima 5.65:1) |
| Segundo color | `plum-dark` = lima | `#D4F36B` | 14.19:1 |
| Segundo color (relleno) | `plum-ui-dark` | `#516E00` | 3.02:1 (blanco encima 5.87:1) |
| Error | `danger-dark` | `#CC626F` | 4.68:1 |

**Regla dura:** sobre `ink`/`ink-soft` nunca `teal`, `plum` ni sus `bg-` sin sufijo `-dark`/`-ui-dark`: `teal` sobre `ink` da 2.78:1. El audit lo detecta.

## Tipografía

| Rol | Familia | Uso |
|---|---|---|
| Display | **Newsreader** (500 títulos, 700 póster, itálica) | H1–H3, titulares póster, cifras. En minúscula, con la palabra o frase destacada en itálica |
| Texto / UI | **Schibsted Grotesk** (400–700) | Cuerpo, botones, formularios, tablas |
| Notación | **IBM Plex Mono** (400–700) | Etiquetas de sección (`03 · CONTROL`), estados, datos, cintas. Nunca párrafos |

- Las tres son de Google Fonts (SIL OFL). Reemplazan a Fraunces, Inter y Space Mono, que no van en ninguna pieza nueva.
- Fallback, solo si la herramienta no permite instalar fuentes: Georgia (títulos), Arial (cuerpo), Courier New (etiquetas).
- Nada de una cuarta familia. Nada de caja alta en párrafos.

**Escalas.** Web (`clamp`): `--text-poster-sm` 44→64px · `--text-poster` 44→96px · `--text-poster-xl` 56→176px · `--text-counter` 56→144px · `--text-counter-sm` 40→60px. Lienzo fijo (sobre 1280×720): `--text-poster-slide-sm` 84px · `--text-poster-slide` 96px · `--text-poster-slide-xl` 104px. Los valores de cada soporte están en su archivo.

## Logo

**Isotipo** (perfil humano trazado como circuito: las pistas entran por la izquierda y cierran el contorno de la cara) + **wordmark `INNOV.AS`** en lettering vectorizado. El wordmark **no se tipea**: siempre se usa el archivo. "INNOV.AS" escrito en Newsreader es texto, no el logo.

### Variantes — `assets/logo/`

| Archivo | Colores | Dónde va |
|---|---|---|
| `innovas-horizontal-ink.svg` | isotipo `#0F6B60`, wordmark `#15191A` | **Primaria.** Fondos claros: papel, blanco |
| `innovas-horizontal-dark.svg` | isotipo `#5CC4B0`, wordmark `#F6F4EF` | Fondo `ink`/`ink-soft` |
| `innovas-horizontal-paper.svg` | isotipo `#0F6B60`, wordmark `#F6F4EF` | Solo sobre foto o fondo medio, verificando contraste a mano. Sobre `ink` va `-dark` |
| `innovas-badge-lockup-teal.svg` | fondo `#0F6B60`, marca `#F6F4EF` | Avatar cuadrado con nombre, ícono de app, sello de cierre |
| `innovas-badge-iso-teal.svg` | fondo `#0F6B60`, isotipo `#F6F4EF` | Avatar donde el nombre ya está al lado, favicon de 16px |
| `innovas-isotipo-teal/-ink/-paper.svg` | según nombre | Favicon ≥24px, bullet de marca |
| `innovas-horizontal-mono-ink/-paper.svg` | un color | Impresión a una tinta, franja institucional de un tercero |

PNG listos para herramientas que no aceptan SVG: `public/brand/png/` del repo del sitio. Usar esos o exportar a 2x el SVG, sin recolorear.

### Reglas duras

1. **Contraste calculado:** teal sobre papel 5.80:1, sobre blanco 6.38:1; `teal-dark` sobre `ink` 8.41:1; teal sobre `ink` **2.78:1, no se usa**. Sobre oscuro cambia el archivo, no el color a mano.
2. **Tamaño mínimo:** horizontal 120px de ancho (≈32mm impreso); isotipo 24px. Para 16px va el badge.
3. **Área de resguardo:** viene en el archivo (90px sobre el lienzo de 991×319 a izquierda, arriba y derecha; 48px abajo). Si se recorta, se repone. Nada entra ahí.
4. **No se toca:** sin recolor fuera de la tabla, degradé, sombra, blur, rotación ni estirado; no se separa isotipo y wordmark; no lleva tagline. El set con **BUILD SOLUTIONS** y la **N invertida** está deprecado.
5. **Un logo por pieza** en tamaño firma. Nunca agrandado como decoración: si la pieza pide un elemento gráfico grande, es la flecha.
6. **En código:** `components/logo.tsx` (prop `surface="light" | "dark"`). Los hex dentro de los SVG son la excepción explícita a la regla de cero hex.

## Elementos firma

| Elemento | Spec | Regla |
|---|---|---|
| **Flecha `A ──→ B`** | Glifo en IBM Plex Mono; en grande, trazo `ink` con punta | A y B siempre explícitos. Es el único elemento gráfico de marca que va en grande |
| **Titular póster** | Newsreader 700 en minúscula, palabra destacada en itálica (teal sobre claro, lima sobre oscuro), interlineado 0.95–1.0, tracking −3% | 1 a 4 palabras. Uno por pantalla o slide |
| **Etiqueta de sección** | IBM Plex Mono caja alta, número y punto medio: `03 · CONTROL` | Una por sección, arriba del título |
| **Cinta** | Etiqueta en mono caja alta rotada (−6.5° / +5.5°), sombra sólida desplazada, sin blur | Máximo 2 por composición, 1–2 palabras |
| **Contador** | Cifra en Newsreader; debajo, en Schibsted Grotesk, la unidad y el contexto | Nunca un número suelto. Escala póster para una cifra sola; en fila, tamaño de sección |
| **Botón** | Píldora, Schibsted Grotesk bold. Primario `teal` (sobre oscuro `teal-ui-dark`) con texto blanco; hover sube 1px y suma sombra sólida | Un primario por pantalla |
| **Tarjeta** | Blanca con filete de tinta, sin sombra difusa | Se prefieren filas con filetes y columnas separadas por líneas antes que grillas de tarjetas iguales |
| **Bloque lateral** | Franja vertical teal a sangre (14vw o 24vw) | Solo portada y cierre. Único bloque de color a sangre |
| **Franja institucional** | "Organizaciones para las que trabajó nuestro equipo", logos o nombres en monocromo sobre `ink` o `paper-soft` | Sobria. Lista vigente en `content/home.ts` del sitio |

**Notación de apoyo** (en vez de un set de íconos): `──→`/`→`, `//` como prefijo de marcador, `▪`/`░` para progreso (`[▪▪▪▪░░] 4/6`), `·` como separador. Todo en IBM Plex Mono.

## Imagen

- **Ilustración de producto:** la **serie del cerebro** (Brain, agente robot, herramientas que se enchufan). Toda ilustración nueva sigue su lenguaje. Spec y procedimiento en `references/ilustracion.md`. En lienzos fijos va una captura a 2x del dibujo armado, sin animación.
- **Fotografía:** recurso del **sitio** desde la v1.6, para contar equipo, trabajo y escala. Tratamiento común (color apenas bajado, contraste suave, grano fino), texto sobre velo `ink` con acento lima, sin caras reconocibles de clientes ni logos, nunca presentada como un caso o como el equipo real. Reglas completas en `references/soportes/web.md`. Otros soportes solo reutilizan fotos del registro del sitio, donde su archivo lo indica.
- **Sin** fotos de stock genéricas sin tratar, capturas de pantalla del producto en piezas de venta, íconos de IA genéricos, clipart ni imágenes generadas con IA.

## Iconografía

No hay set de íconos: la notación mono resuelve los glifos. Si algún día hace falta un set real: trazo lineal 1.5px, radio 2px. **Lucide** es la candidata, sin aplicar en ninguna pieza; confirmar antes de usar.

## Motion (base)

Ease `--ease` `cubic-bezier(0.2,0.6,0.2,1)`; revelados `--ease-out-quint`; cintas `--ease-tape`.

- **Se anima:** revelado de titulares, cintas, contadores, la flecha `A→B` y el dibujo de las ilustraciones, una vez al entrar en pantalla; hover de botones.
- **No se anima:** texto de cuerpo, logos (salvo la marquesina lenta de la franja institucional en el sitio), nada parallax ni atado al scroll.
- `prefers-reduced-motion`: todo quieto y a 0ms. Obligatorio.
- En lienzos fijos cada pieza se lee completa en estático. Las animaciones en bucle del sitio están en `references/soportes/web.md`.

## Voz

Antes de escribir el copy de cualquier pieza, leer `marketing/mensajes-innovas` en el brain: es el canon y, si contradice esta sección, gana el brain. Resumen operativo:

- **Central IA es la base** del proceso y del equipo (v1.6: en el home y la oferta va como base, no como protagonista; `/central-ia` la cuenta completa. Se aparta del canon del brain y queda pendiente de validación). Los servicios se cuentan como lo que INNOV.AS hace sobre ella.
- **Sin las marcas En Paralelo ni Desde Adentro.** Del método quedan las olas, Radar, Mapa del Método, "tu gente decide, los agentes ejecutan" y "operación continua".
- **Afirmativo**, sin guion largo ni signos de apertura (¿ ¡).
- **A y B explícitos** en cada pieza. B es operación continua, no un destino.
- **Plataforma completa**, sin "próximamente".
- **Experiencia:** "25 años transformando más de 150 organizaciones en 14 países", en conjunto. Sin cantidades de clientes ni casos atribuidos a Central IA.
- **Organizaciones:** "para las que trabajó nuestro equipo". Banco Mundial no figura mientras sea oferta en curso. "Ejecutamos para" solo con contrato firmado.
- **Sin nombres de personas** en material que circule. **Sin nombrar competencia.**
- **Precio público:** solo el Radar, USD 1.500, bonificado al implementar la ola cero.

## Workflow — código (Next.js / Tailwind)

1. Buscar `--color-teal` en el CSS global del proyecto. Si no está, copiar `assets/tokens/globals.css` y fusionar el `theme.extend` de `assets/tokens/tailwind.config.ts` (sin pisar el config entero).
2. Fuentes self-hosted con `next/font` (nunca `<link>` ni `@import` a Google Fonts):

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

   Aplicar las tres `variable` en `<html>`.
3. Construir con clases mapeadas: `bg-paper text-ink`, `text-teal font-display`, `font-mono text-xs`, `text-poster`, `shadow-teal`, `rounded-full`. Nunca `bg-[#0F6B60]` ni `style={{color: "..."}}`.
4. Specs de componentes: `references/componentes.md`. Reglas del sitio: `references/soportes/web.md`.
5. Auditar: `python3 scripts/audit_tokens.py <archivos-o-carpeta>`.
6. Referencia visual navegable: `assets/style-tile.html`.

## Workflow — piezas sin código

Abrir el archivo del soporte en `references/soportes/`. Ahí están los valores literales: hex, tamaños en la unidad del soporte, medidas de lienzo, estructura tipo y notas por herramienta.

**Fondo por formato:** web, slides, PDF y redes sobre `paper` `#F6F4EF`. **Word (.docx) sobre blanco `#FFFFFF`**, con bloques secundarios en `#ECEAE3`.

**Fuentes:** Newsreader, Schibsted Grotesk e IBM Plex Mono tienen que estar instaladas en la máquina que arma la pieza; sin ellas el archivo editable se desarma en la de quien lo recibe. Para terceros, mandar también el PDF.

## Checklist antes de entregar cualquier pieza

- [ ] ¿El color dominante es teal sobre papel (o blanco en Word)?
- [ ] ¿El segundo color aparece solo para la gente, la decisión humana o el guiño?
- [ ] ¿Lima solo como luz (sobre oscuro, foto o ilustración), nunca como texto sobre claro?
- [ ] ¿Títulos en Newsreader en minúscula con la palabra destacada en itálica, texto en Schibsted Grotesk, etiquetas en IBM Plex Mono?
- [ ] ¿Sobre fondo oscuro se usaron las variantes `-dark`/`-ui-dark`, y hay como mucho 2 pantallas oscuras?
- [ ] ¿Ningún texto de lectura en `taupe`?
- [ ] ¿Las cifras tienen unidad y contexto?
- [ ] ¿A y B explícitos donde aparece la flecha?
- [ ] ¿Logo de la tabla de variantes, con resguardo, tamaño mínimo y sin efectos?
- [ ] ¿Copy según la voz (sin guion largo ni ¿ ¡, sin nombres de personas)?
- [ ] ¿Pasó el checklist del archivo de su soporte?
- [ ] En código: `audit_tokens.py` sin violaciones.

## Recursos del skill

- `assets/tokens/globals.css` · `assets/tokens/tailwind.config.ts` — contrato ejecutable.
- `assets/logo/` — logo en SVG: horizontal (ink, dark, paper, mono), badges sobre teal e isotipo suelto.
- `assets/components/` — componentes del sitio: `serie-cerebro/`, `hero-grano.tsx`, `hero-field.tsx`, `enterprise/` (v1.6) y los anteriores `hero-dots.tsx`, `agent-scene.tsx` + `scene-shader.ts` (sin uso desde la v1.5).
- `assets/illustrations/` — ilustración a mano: `hand-drawn.tsx`, `home.ts` y seis SVG de referencia.
- `assets/style-tile.html` — referencia visual navegable (v1.6.1).
- `references/soportes/` — un archivo por soporte con la misma estructura, más `_plantilla.md`.
- `references/componentes.md` — specs de componentes web.
- `references/ilustracion.md` — serie del cerebro, ilustración a mano y procedimientos.
- `references/gobierno.md` — dueños, núcleo y evolución, versiones, circuito de cambio.
- `references/decisiones.md` — registro de decisiones, historial de versiones y pendientes.
- `references/prompt-gema-ilustraciones.md` — brief de estilo para encargar ilustración a mano afuera.
- `references/direccion-de-arte.md` — dirección de arte original (T3.2), **histórico**: paleta y fuentes superadas.
- `scripts/audit_tokens.py` — detecta hex y fuentes hardcodeadas y teal sin variante sobre oscuro.

## Mantenimiento

Luli define la dirección de arte y Mati la valida (ver `references/gobierno.md`). Fuente de verdad: `.agents/skills/innov-design-system/` del repo del sitio; `.claude/skills/innov-design-system/` es una copia idéntica. Todo cambio se registra en `references/decisiones.md`, se sube como borrador al skill del brain de INNOV.AS y se refleja en `marketing/identidad-visual-innovas`.

**Versión 1.7** (2026-10-27). Reorganiza el skill por soporte, con la misma estructura que el de Lagomarsino: base común en este archivo, un archivo por soporte en `references/soportes/` (web, presentaciones, documentos, y redes y email como propuesta), componentes web, ilustración, gobierno y registro de decisiones aparte. Reemplaza a `references/non-code-usage.md`. No cambia ninguna regla vigente.

Historial completo de versiones (1.0 a 1.6.1) y pendientes en `references/decisiones.md`.
