# INNOV.AS — Dirección de arte / Identidad visual (Entregable T3.2)

> Fuente de verdad de la identidad visual del sitio. Autocontenido: no requiere
> acceso a ninguna conversación previa. Consumido por T3.3 (implementación) y por
> cualquier agente futuro (deck, one-pager, documento Word).
> Estado: v1 — dirección recomendada, lista para implementar. Revisión: Mati (aprobada).
> **Update 2026-07-05:** agregado token `paper-print` (`#FAF8F5`) — fondo específico para .docx/.pdf, ver sección 2. Desde la v1.3 los .docx llevan blanco y solo el .pdf conserva este token.
> **Update 2026-08:** agregada la capa editorial de escala póster — ver addendum al final de este documento.
> **⚠️ Update 2026-10-27 (v1.5/v1.6.1):** la paleta y las tipografías de este documento están reemplazadas. Rigen papel `#F6F4EF`, tinta `#15191A`, teal `#0F6B60`, oliva `#4F6B00`/lima `#D4F36B` y Newsreader, Schibsted Grotesk e IBM Plex Mono: ver la tabla de tokens del `SKILL.md` y `assets/tokens/globals.css`. Este documento queda como referencia de estructura y componentes.
> **Update 2026-10-20 (v1.3):** reposicionamiento con Central IA adelante: nuevos roles de `teal` y `plum`, camino del cliente, hero oscuro, fondo blanco en Word. Ver addendum al final (§10).

---

## 0. Resumen en una línea

**"Sistema Cálido / Notación de Transición":** editorial cálido + anotación técnica sobre neutros tostados, donde la marca vive en la **flecha entre un estado A y un estado B**. El sistema encarna la tesis del negocio (la empresa pasa de IA suelta a IA con gobierno) y codifica por color dos roles: la plataforma (`teal`) y la gente de la empresa (`plum`).

---

## 1. Análisis y decisión (por qué esta dirección y no la default)

Se evaluaron 5 familias con personalidad: minimalismo cálido, neo-brutalismo, editorial/Swiss, geometría orgánica y color-block audaz. Conclusión y decisiones:

- **Rechazado a propósito el default de AI 2026**: fondo crema + serif alto contraste + acento terracota. Es el look que satura al sector *y* la terracota es casi el coral de la interfaz de Claude → habría hecho ver a INNOV.AS genérico y derivativo.
- **El desafío real** es tender un puente entre dos temperaturas: la gente de la empresa (calidez, decisión humana) y la plataforma (credibilidad técnica, sistema, gobernanza). La dirección elegida resuelve esa tensión: papel cálido + serif humanista dan el lado humano; la notación mono, los ticks y la grilla dan el lado sistema.
- **Dirección alternativa considerada y descartada**: versión fondo-tinta (dark) con papel como acento y un único señal. Más audaz pero más fría para el cuerpo del sitio. Se reserva como tratamiento para secciones puntuales (hoy el hero del home), no como esqueleto global.

---

## 2. Paleta (tokens + contraste WCAG verificado)

| Token | Hex | Rol | Contraste sobre papel |
|---|---|---|---|
| `paper` | `#EDE8DC` | Superficie base (oat cálido, no crema-blanco) — pantalla/digital (web, slides) | — |
| `paper-print` | `#FAF8F5` | Superficie base para **.pdf**: variante más clara que `paper`, pensada para lectura larga e impresión. Los **.docx llevan blanco `#FFFFFF`** desde la v1.3 | — |
| `paper-soft` | `#E4DDCC` | Superficie de tarjeta / bloque secundario (funciona sobre `paper`, `paper-print` y blanco) | — |
| `ink` | `#1F1B19` | Texto y estructura (negro cálido, no puro) | **13.98:1 (AAA)** |
| `teal` | `#0F6B60` | **Marca** · plataforma · sistema · agentes | 5.22:1 (AA) |
| `plum` | `#8C3B5D` | La gente de la empresa · decisión humana · guiño | 5.93:1 (AA) |
| `taupe` | `#A79E8E` | Bordes, metadatos, notación | 2.17:1 — **decorativo** |

**Ratios en botones:** texto blanco sobre teal 6.38:1 (AA), sobre ciruela 7.24:1 (AAA). Ambos válidos.

**Reglas de uso (obligatorias):**
- `taupe` **nunca** para texto esencial chico (no pasa AA). Solo bordes, ticks, metadatos ≥18px o decorativo.
- `teal` es el color de marca dominante. `plum` entra con **restricción**: marca a la gente de la empresa y la decisión humana (permisos, aprobaciones) y el detalle con guiño de las ilustraciones. No pintar bloques enteros de ciruela.
- Ningún componente usa teal y ciruela juntos con igual peso: uno manda, el otro acenta.
- Estados: éxito = teal; error/alerta = derivar un rojo cálido `#B23A48` (fuera de paleta de marca, solo funcional); foco = teal con `outline-offset`.

### 2.1 Fondos oscuros (secciones puntuales, slides) — agregado 2026-07-06

> Esto NO es un "modo oscuro" en el sentido de preferencia de usuario / toggle de
> sistema operativo. Es la variante de la paleta para **secciones o piezas puntuales
> que se diseñan sobre fondo oscuro a propósito** — el hero del
> home, una slide de cierre de deck, un bloque de cita destacada — tal como ya
> preveía la sección 1 de este documento ("Dirección alternativa considerada... se
> reserva como tratamiento posible para secciones puntuales"). No se implementa con
> `prefers-color-scheme` ni un toggle: se aplica explícitamente a los componentes que
> lo necesiten.

**Por qué hace falta una variante y no alcanza con invertir fondo/texto:** `teal` y
`plum` están calibrados para leerse sobre `paper` (fondo claro). Sobre `ink` como
fondo, esos mismos hex **no pasan contraste accesible** — se ven apagados y quedan
por debajo del mínimo de WCAG. Se verificó con la fórmula de contraste de WCAG
(relative luminance) y se derivaron variantes más claras que sí cumplen:

| Token | Hex | Rol | Contraste vs. `ink` (fondo) |
|---|---|---|---|
| `ink` (reutilizado) | `#1F1B19` | Fondo base de la sección oscura | — |
| `ink-soft` | `#2A2522` | Superficie elevada / card sobre fondo oscuro (equivalente a `paper-soft` en el modo claro) | 1.13:1 — diferenciación sutil de superficie, no de texto |
| `paper` (reutilizado) | `#EDE8DC` | Texto principal sobre fondo oscuro | **13.98:1 (AAA)** |
| `teal-dark` | `#159384` | Texto/íconos en teal directamente sobre `ink` (párrafos, links, iconografía chica) | **4.51:1 (AA)** |
| `teal-ui-dark` | `#107468` | Fill de botones/CTA y texto grande (≥18px) en teal sobre `ink` | 3.03:1 (AA large-text/UI) |
| `plum-dark` | `#C0688D` | Texto/íconos en plum directamente sobre `ink` | **4.56:1 (AA)** |
| `plum-ui-dark` | `#A5466E` | Fill de botones/CTA y texto grande en plum sobre `ink` | 3.01:1 (AA large-text/UI) |
| `danger-dark` | `#CC626F` | Estado de error/alerta sobre `ink` | 4.52:1 (AA) |
| `taupe` (reutilizado, sin cambios) | `#A79E8E` | Bordes/metadatos sobre `ink` — mejora a 6.45:1, pero se mantiene la misma regla de uso (nunca texto esencial) por consistencia entre modos | 6.45:1 |

**Botones/CTA sobre fondo oscuro (contraste ya verificado en ambas direcciones):**
- Primario (plataforma/teal): fill `teal-ui-dark` (#107468) + texto blanco → 5.65:1 en el texto, y el botón en sí tiene 3.03:1 contra el fondo `ink` (cumple el mínimo de componente de UI de WCAG 1.4.11 — si se usara el `teal` original de #0F6B60, dan 2.68:1 contra `ink` y el botón "desaparece" visualmente del fondo).
- Secundario (gente/plum): fill `plum-ui-dark` (#A5466E) + texto blanco.
- Ghost/outline sobre oscuro: borde `paper`, hover invierte a fill sólido `paper` con texto `ink` — es la misma lógica del ghost en modo claro (invierte a `ink`), reflejada.

**Regla dura:** nunca usar `teal` o `plum` "originales" (los de la sección 2, calibrados para `paper`) directamente sobre `ink` u otro fondo oscuro — usar siempre las variantes `-dark`/`-ui-dark`. Esto es literalmente lo mismo error que "hex hardcodeado fuera de contrato": son colores de marca, pero calibrados para la superficie equivocada.

---

## 3. Tipografía

Tres roles, tres familias. La personalidad la cargan display y mono; el cuerpo es neutro a propósito.

| Rol | Familia | Uso | Notas técnicas |
|---|---|---|---|
| Display | **Fraunces** (variable) | H1–H3, titulares póster, números grandes | `opsz` 144 y `SOFT` 40–45 en tamaños grandes (calidez); pesos 600–900 para títulos. Bajar `opsz` a 9–20 si se usa chica. |
| Texto / UI | **Inter** | Cuerpo, labels, navegación, formularios | Pesos 400/500/600. Neutro, alta legibilidad. |
| Notación | **Space Mono** | Firma A→B, etiquetas de estado, datos, ticks | 400/700. Es el elemento "sistema". No usar para párrafos. |

- **Por qué Fraunces y no un serif literario:** se descartó Instrument Serif (rígido, un solo peso percibido) y Hedvig Letters Serif (un solo peso real, sin bold → títulos flojos). Fraunces conserva la calidez humanista buscada pero tiene rango completo 100–900 + eje `SOFT`, así que los títulos pesan de verdad.
- **Licencia:** las tres son open source (Google Fonts / SIL OFL), self-host recomendado (`next/font`) para performance y evitar CLS.
- **Fallbacks:** Fraunces → Georgia, serif · Inter → system-ui, sans-serif · Space Mono → ui-monospace, monospace.

Escala tipográfica (rem, base 16px): 0.75 / 0.875 / 1 / 1.125 / 1.375 / 1.75 / 2.25 / 3 / clamp(3.5→4.5) para hero.

---

## 4. Sistema visual

### 4.1 Elemento firma — la flecha de transición `A ──→ B`
Es el activo de marca. No es decoración: es la tesis del negocio hecha glifo. Usos canónicos:
- **Wordmark:** ~~`innovas` en Fraunces + superíndice mono `[A→B]` en teal~~ — **deprecado (agosto 2026).** El wordmark ahora es lettering vectorizado dentro del logo: ver la sección Logo del `SKILL.md` y `assets/logo/`. La flecha sigue viva en los marcadores de sección, el código de vertical y el progreso — pero no en el wordmark.
- **Marcadores de sección:** `// 01 ──→ estado`.
- **Rieles de mensaje:** `A ──→ B` con A y B explícitos, por ejemplo `IA suelta ──→ IA con gobierno`.
- **Progreso:** `[▪▪▪▪░░] 4/6 ──→` para las etapas del camino del cliente.
Regla: la flecha y la notación mandan en **estructura**; el papel cálido y el serif mandan en **superficie**. Si una vista se carga de mono+color, se enfría → recortar.

### 4.2 Visualización propietaria: "El camino del cliente"
El recorrido del cliente ES una transición de estado en 5 etapas (desde la v1.3; antes era el camino de 4 niveles del programa educativo). Se visualiza como una escalera de estados horizontal (vertical en mobile), reutilizando la flecha:

```
[ Primera conversación ] ──→ [ Radar ] ──→ [ Ola cero ] ──→ [ Olas ] ──→ [ Operación continua ]
      estado 01              estado 02     estado 03       estado 04       estado 05
```

- Nodos con borde `ink`; el nodo destacado va en `teal`. `plum` solo si el nodo implica una decisión humana. El gradiente `plum → teal` del camino anterior queda fuera.
- Cada nodo: label mono de estado + título Fraunces + resultado de una línea (Inter).
- Es el componente más reconocible del sitio; merece animación de revelado en scroll (ver 4.4).

### 4.3 Iconografía e imagen
- **Íconos:** trazo lineal 1.5px, esquinas apenas redondeadas (radio 2px), mismo peso visual que los ticks mono. Nada de íconos rellenos 3D ni degradés.
- **Imagen:** ilustraciones a mano (ver addendum v1.2 y `SKILL.md`). Sin fotografía de stock ni capturas del producto por ahora. Evitar ilustración "blob" genérica de startup.
- **Datos y diagramas:** estética blueprint — ticks de coordenada mono, líneas hairline `ink@18%`, sin sombras dramáticas.

### 4.4 Motion (sobriedad institucional)
- **Sí se anima:** dibujo de la flecha `A→B` al cargar el hero (stroke-dashoffset ~1s); revelado en scroll del camino del cliente (stagger 80ms por nodo); micro-interacción hover en botones (translateY -1px + sombra sólida offset, sin blur).
- **No se anima:** texto de cuerpo, logos institucionales (salvo la marquesina de la franja, ver §10), nada parallax, nada de auto-play llamativo.
- **Obligatorio:** respetar `prefers-reduced-motion` (sin excepción).

---

## 5. Componentes clave (especificados)

| Componente | Spec |
|---|---|
| **Hero (Home)** | Fondo `ink` con trama de puntos (`HeroDots`, ver `SKILL.md`). Eyebrow mono `// [posicionamiento]`. H1 Fraunces con la palabra clave en `teal-dark`. Debajo, los rieles de mensaje con A y B explícitos. CTA primario `teal-ui-dark` ("Agendá una conversación"). La trama se apaga detrás del texto. |
| **Card de pieza o etapa** | Borde `ink` 1px, radio 5px, fondo `paper-soft`. Esquina mono `A→B` o número de estado. Título Fraunces 620. Ilustración a mano cuando la pieza la tiene. Barra inferior 3px en `teal` (`plum` si el contenido es de decisión humana). |
| **Tarjeta de charla de orientación** | Junto al formulario en `/contacto`. Borde `ink`, fondo `paper-soft`, 30 minutos sin costo. Botón secundario que abre la agenda en una pestaña nueva. |
| **Franja institucional** | Rótulo "Organizaciones para las que trabajó nuestro equipo", con la lista de la trayectoria del equipo (`content/home.ts`). Fondo `ink` o `paper-soft`, nombres o logos en monocromo, hairline separadora. Corre como marquesina lenta, excepción de motion documentada en §10; quieta con `prefers-reduced-motion`. |
| **CTA** | Primario: sólido `teal`, texto blanco, radio 4px, hover translateY + sombra sólida. Secundario: sólido `plum` cuando el destino habla de la gente o de la decisión humana. Ghost: borde `ink`, hover invierte a fondo `ink`. |
| **Formulario de contacto** | Un solo formulario (nombre, email, empresa, país, tamaño, qué IA usan, mensaje). Acción principal de `/contacto`; se envía directo a HubSpot. Foco visible teal. |

---

## 6. Tokens de implementación

Entregados como archivos separados (fuente única de verdad, contrato para T3.3):
- `globals.css` — custom properties en `:root` (colores, tipografía, escala, radios, sombras).
- `tailwind.config.ts` — mapea los tokens a la escala de Tailwind vía `var(--…)`.

Regla de implementación (de T3.3): **cero valores mágicos** de color/tipografía en JSX. Todo consume tokens. Si un valor no está en los tokens, no se usa: se agrega al contrato primero.

---

## 7. Checklist de aceptación de la identidad (QA visual)

- [ ] Ningún texto esencial usa `taupe`.
- [ ] Ningún H1/CTA depende de faux-bold (usar pesos reales de Fraunces).
- [ ] `plum` aparece solo marcando a la gente de la empresa, la decisión humana o el guiño de una ilustración, nunca como relleno masivo.
- [ ] La flecha `A→B` aparece en: marcadores de sección, rieles de mensaje y camino del cliente (ya no en el wordmark — ver sección Logo del `SKILL.md`).
- [ ] El logo usa la variante correcta para su fondo y respeta tamaño mínimo y área de resguardo.
- [ ] Franja institucional sobria y monocromo; su único movimiento es la marquesina lenta, quieta con `prefers-reduced-motion`.
- [ ] `prefers-reduced-motion` respetado en todas las animaciones.
- [ ] Fuentes self-hosted vía `next/font` (sin CLS, sin request a Google en runtime).

---

## 8. Addendum agosto 2026 — capa editorial de escala póster

Extensión aprobada por Mati sobre esta dirección de arte, no un reemplazo. Mecanismo tomado de referencias editoriales de agencia (inspiración de mecanismo, no de paleta: cero colores nuevos, sigue siendo `teal`/`plum`/`ink`/`taupe`/`paper`).

**Componentes nuevos:**

| Componente | Spec |
|---|---|
| `PosterHeading` | Fraunces estirada al máximo (no una condensada), 1–4 palabras, `SOFT 0`/`WONK 0`, peso 900, caja alta, `line-height` 0.84 (0.78 en `xl`), `letter-spacing` −0.028em (−0.038em en `xl`). Prop `scale="slide"` fuerza los tamaños px fijos (`--text-poster-slide-*`) para lienzos de tamaño fijo — la escala clamp (`--text-poster-*`) es solo para web, mide contra el viewport. Máximo un titular póster por pantalla/slide. |
| `TapeLabel` | Cinta rotada en Space Mono caja alta, tracking 0.12em, ángulo `--tape-rot` (−6.5°) o `--tape-rot-alt` (5.5°), sombra `--shadow-tape` (2px 2px 0, sin blur), entra con `innov-tape-in` (0°→ángulo, escala 0.86→1, 420ms, `--ease-tape` con leve overshoot). Máximo 2 por composición, 1–2 palabras cada una. |
| `InterlockHeadline` | Interlock texto/imagen: un bloque de imagen (`--interlock-h` 0.78em de alto) incrustado dentro de una línea de `PosterHeading`, separado por `--interlock-gap` (0.06em). |
| `StatCounter` | Cifra en Fraunces a `--text-counter` (clamp 3.5rem→9rem), `line-height` 0.82, cuenta desde 0 al entrar en viewport (IntersectionObserver al 40%, 1200ms, ease cúbico de salida). Siempre acompañada de unidad y contexto en una línea secundaria en Inter — nunca un número solo. |
| `IllustrationSlot` | Andamio, no un componente de marca: sostiene el layout y publica esta spec en pantalla mientras el hueco está vacío. Trazo a mano alzada 1.6px en `ink`, sin relleno, fondo transparente, un único acento plano (`teal` o `plum` si la pieza es de personas) de 28–46px rotado ~7°. Registro diagramático (flujos, procesos, mapas de estado), nunca personajes/escenas/isométrico/3D. Proporción 4:3 o 16:9. **No se dibuja a mano por el agente — se encarga aparte.** |

**Bloque de color a sangre lateral:** franja vertical `--colorblock-w-narrow` (14vw) en teal, tocando los cuatro bordes de su lado — portada y cierre de deck/página, único elemento full-bleed de color del sistema.

**Checklist adicional:**
- [ ] Titulares póster en slides/print usan `scale="slide"`, nunca la escala clamp ni un `fontSize` inline.
- [ ] Máximo un titular póster por pantalla/slide, y máximo 2 cintas por composición.
- [ ] Ningún `IllustrationSlot` fue reemplazado por un ícono o clipart genérico dibujado ad-hoc — se encarga aparte.


---

## 9. Addendum octubre 2026 — v1.2

Decidido por Mati el 2026-10-10, al replantear el sitio con Central IA adelante. Paleta, tipografías y logo no cambian. La spec operativa completa vive en `SKILL.md`; acá queda el registro de qué cambió y por qué.

| Tema | Antes | v1.2 | Por qué |
|---|---|---|---|
| Escala póster web | sm 44→96 · md 56→176 · xl 72→256 | sm 40→64 · md 44→96 · xl 56→176 | Los titulares pesaban demasiado; la jerarquía la dan el aire y las ilustraciones |
| Hero del home | Red de nodos en canvas 2D | Trama de puntos en WebGPU (`HeroDots`), puntos `paper` con foco `teal-dark`, reacción sutil al cursor | La red quedaba cargada. El hero pasa a ser atmósfera y el relato queda en el titular |
| Registro de ilustración (§4.3) | Solo diagramas | Objetos y diagramas, sin personas | Los dolores del cliente se entienden mejor con objetos reconocibles |
| Trazo de ilustración | 1.6px, luego 3.2px con hachurado | 3.2px tipo marcador, sin hachurado | Aguanta tamaños chicos y se lee como dibujo a mano |
| Color de ilustración | Un acento | Teal principal más un detalle plum | Más vida sin ampliar la paleta. Plum siempre pesa menos |
| Tono de ilustración | Técnico | Claro, con un guiño por pieza | Cercanía con quien conduce una empresa mediana |
| Motion (§4.4) | Sin bucles ni auto-play | Se suman el dibujo progresivo de ilustraciones, una vez al entrar en pantalla, y el fondo animado del hero como único bucle | Es el gesto de dibujo a mano que más aporta, y queda acotado |

**Checklist adicional v1.2:**
- [ ] Cada ilustración tiene un acento teal de 38 a 54px y, como mucho, un detalle plum de hasta 30px.
- [ ] Ninguna ilustración incluye personas, texto ni hachurado.
- [ ] `HeroDots` aparece una sola vez por página, tiene alternativa estática sin WebGPU y queda quieto con `prefers-reduced-motion`.
- [ ] El texto del hero se lee sobre la trama en escritorio y en celular.


---

## 10. Addendum octubre 2026 — v1.3

Decidido el 2026-10-20 para alinear la identidad con el reposicionamiento del 2026-10-09: INNOV.AS ofrece servicios sobre su plataforma, Central IA. Paleta, tipografías, logo y todo lo de la v1.2 no cambian.

| Tema | Antes | v1.3 | Por qué |
|---|---|---|---|
| Rol de `teal` | Empresas, agéntico | Plataforma, sistema, agentes | Ya no hay dos verticales de negocio |
| Rol de `plum` | Personas, educación | La gente de la empresa, decisión humana, guiño | Desde Adentro está despublicada. El rol nuevo calza con "tu gente decide, los agentes ejecutan" y con el detalle plum de la ilustración |
| Tokens de acento | `--color-vertical-company/people` | `--color-accent-system/people`; los `vertical-*` quedan como alias deprecados | Evita romper el sitio mientras migra |
| Visualización propietaria | Camino de 4 niveles educativo | Camino del cliente de 5 estados | El recorrido vigente es el del cliente |
| Componentes | Card de nivel, Sé Trainer, formulario segmentado | Card de pieza o etapa y tarjeta de charla; se retiran los otros dos | `/contacto` tiene un formulario y la charla de orientación |
| Hero (§5) | Fondo `paper` con dos rieles | Hero oscuro con `HeroDots` | Ya estaba decidido en la v1.2 y el §5 no lo reflejaba |
| Imagen | Fotografía de talleres | Solo ilustraciones | Decisión del sitio nuevo |
| Fondo en Word | `paper-print` `#FAF8F5` | Blanco `#FFFFFF` | Simplifica la impresión. El .pdf mantiene `paper-print` |
| Franja institucional | Marquesina sin resolver frente a la regla de motion | Excepción documentada: sigue como marquesina lenta, quieta con reduced-motion | Decisión del 2026-10-21: se deja como está en el sitio |
| Contenido | Sin reglas en el skill | Sección "Contenido y voz" en `SKILL.md` | La identidad viaja con su mensaje |

**Checklist adicional v1.3:**
- [ ] Ninguna pieza nueva menciona En Paralelo, Desde Adentro, Sé Trainer ni el programa de niveles.
- [ ] `teal` se lee como plataforma y `plum` como gente o decisión humana.
- [ ] Los .docx tienen fondo blanco, sin color de página ni bloques de color a sangre.
- [ ] El copy sigue la sección "Contenido y voz" de `SKILL.md`.
