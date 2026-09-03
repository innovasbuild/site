# INNOV.AS — Dirección de arte / Identidad visual (Entregable T3.2)

> Fuente de verdad de la identidad visual del sitio. Autocontenido: no requiere
> acceso a ninguna conversación previa. Consumido por T3.3 (implementación) y por
> cualquier agente futuro (deck, one-pager, branding del LMS).
> Estado: v1 — dirección recomendada, lista para implementar. Revisión: Mati (aprobada).
> **Update 2026-07-05:** agregado token `paper-print` (`#FAF8F5`) — fondo específico para .docx/.pdf, ver sección 2.
> **Update 2026-08:** agregada la capa editorial de escala póster — ver addendum al final de este documento.

---

## 0. Resumen en una línea

**"Sistema Cálido / Notación de Transición":** editorial cálido + anotación técnica sobre neutros tostados, donde la marca vive en la **flecha entre un estado A y un estado B**. El sistema encarna la tesis del negocio (toda transformación —persona o empresa— es una transición de estado) y codifica por color las dos verticales.

---

## 1. Análisis y decisión (por qué esta dirección y no la default)

Se evaluaron 5 familias con personalidad: minimalismo cálido, neo-brutalismo, editorial/Swiss, geometría orgánica y color-block audaz. Conclusión y decisiones:

- **Rechazado a propósito el default de AI 2026**: fondo crema + serif alto contraste + acento terracota. Es el look que satura al sector *y* la terracota es casi el coral de la interfaz de Claude → habría hecho ver a INNOV.AS genérico y derivativo.
- **El desafío real** es tender un puente entre dos temperaturas: transformación de *personas* (educación → calidez, humanidad) y de *empresas* (procesos agénticos → credibilidad técnica, sistema). La dirección elegida resuelve esa tensión: papel cálido + serif humanista dan el lado humano; la notación mono, los ticks y la grilla dan el lado sistema.
- **Dirección alternativa considerada y descartada**: versión fondo-tinta (dark) con papel como acento y un único señal. Más audaz pero más fría y menos apta para decisores institucionales (BM, BID) en la home. Se reserva como tratamiento posible para secciones puntuales (ej. Transformación), no como esqueleto global.

---

## 2. Paleta (tokens + contraste WCAG verificado)

| Token | Hex | Rol | Contraste sobre papel |
|---|---|---|---|
| `paper` | `#EDE8DC` | Superficie base (oat cálido, no crema-blanco) — pantalla/digital (web, slides, LMS) | — |
| `paper-print` | `#FAF8F5` | Superficie base para **documentos .docx y .pdf**: variante más clara que `paper`, pensada para lectura larga e impresión (el oat `#EDE8DC` pesa demasiado como fondo de página completa) | — |
| `paper-soft` | `#E4DDCC` | Superficie de tarjeta / bloque secundario (funciona sobre `paper` y sobre `paper-print`) | — |
| `ink` | `#1F1B19` | Texto y estructura (negro cálido, no puro) | **13.98:1 (AAA)** |
| `teal` | `#0F6B60` | **Marca** · empresas · agéntico · sistema | 5.22:1 (AA) |
| `plum` | `#8C3B5D` | Personas · educación · lado humano | 5.93:1 (AA) |
| `taupe` | `#A79E8E` | Bordes, metadatos, notación | 2.17:1 — **decorativo** |

**Ratios en botones:** texto blanco sobre teal 6.38:1 (AA), sobre ciruela 7.24:1 (AAA). Ambos válidos.

**Reglas de uso (obligatorias):**
- `taupe` **nunca** para texto esencial chico (no pasa AA). Solo bordes, ticks, metadatos ≥18px o decorativo.
- `teal` es el color de marca dominante. `plum` entra con **restricción**: solo para codificar el lado personas/educación (kickers, barras, íconos de esa vertical). No pintar bloques enteros de ciruela.
- Ningún componente usa teal y ciruela juntos con igual peso: uno manda, el otro acenta.
- Estados: éxito = teal; error/alerta = derivar un rojo cálido `#B23A48` (fuera de paleta de marca, solo funcional); foco = teal con `outline-offset`.

### 2.1 Fondos oscuros (secciones puntuales, slides) — agregado 2026-07-06

> Esto NO es un "modo oscuro" en el sentido de preferencia de usuario / toggle de
> sistema operativo. Es la variante de la paleta para **secciones o piezas puntuales
> que se diseñan sobre fondo oscuro a propósito** — la sección "Transformación" del
> sitio, una slide de cierre de deck, un bloque de cita destacada — tal como ya
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
- Primario (empresas/teal): fill `teal-ui-dark` (#107468) + texto blanco → 5.65:1 en el texto, y el botón en sí tiene 3.03:1 contra el fondo `ink` (cumple el mínimo de componente de UI de WCAG 1.4.11 — si se usara el `teal` original de #0F6B60, dan 2.68:1 contra `ink` y el botón "desaparece" visualmente del fondo).
- Secundario (personas/plum): fill `plum-ui-dark` (#A5466E) + texto blanco.
- Ghost/outline sobre oscuro: borde `paper`, hover invierte a fill sólido `paper` con texto `ink` — es la misma lógica del ghost en modo claro (invierte a `ink`), reflejada.

**Regla dura:** nunca usar `teal` o `plum` "originales" (los de la sección 2, calibrados para `paper`) directamente sobre `ink` u otro fondo oscuro — usar siempre las variantes `-dark`/`-ui-dark`. Esto es literalmente lo mismo error que "hex hardcodeado fuera de contrato": son colores de marca, pero calibrados para la superficie equivocada.

---

## 3. Tipografía

Tres roles, tres familias. La personalidad la cargan display y mono; el cuerpo es neutro a propósito.

| Rol | Familia | Uso | Notas técnicas |
|---|---|---|---|
| Display | **Fraunces** (variable) | H1–H3, wordmark, números grandes | `opsz` 144 y `SOFT` 40–45 en tamaños grandes (calidez); pesos 600–900 para títulos. Bajar `opsz` a 9–20 si se usa chica. |
| Texto / UI | **Inter** | Cuerpo, labels, navegación, formularios | Pesos 400/500/600. Neutro, alta legibilidad. |
| Notación | **Space Mono** | Firma A→B, etiquetas de estado, datos, ticks, código de vertical | 400/700. Es el elemento "sistema". No usar para párrafos. |

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
- **Código de vertical:** `personas→` (ciruela) · `empresas→` (teal).
- **Progreso de curso/lección:** `[▪▪▪▪░░] 4/6 ──→`.
Regla: la flecha y la notación mandan en **estructura**; el papel cálido y el serif mandan en **superficie**. Si una vista se carga de mono+color, se enfría → recortar.

### 4.2 Visualización propietaria: "El camino de 4 niveles"
El recorrido educativo ES una transición de estado en 4 etapas. Se visualiza como una escalera de estados horizontal (vertical en mobile), reutilizando la flecha:

```
[ Fundamentos ] ──→ [ Usuario Avanzado ] ──→ [ Builder ] ──→ [ Orquestador ]
   estado 01            estado 02              estado 03        estado 04
```

- **Gradiente conceptual de color:** el nivel 1 arranca en `plum` (personas/entrada humana) y progresa hacia `teal` en el nivel 4 (empresas/dominio agéntico). El aprendiz literalmente "se transforma" del color personas al color empresas. Interpolar 2 pasos intermedios entre plum→teal.
- Cada nodo: label mono de estado + título Fraunces + outcome de una línea (Inter).
- Es el componente más reconocible del sitio; merece animación de revelado en scroll (ver 4.4).

### 4.3 Iconografía e imagen
- **Íconos:** trazo lineal 1.5px, esquinas apenas redondeadas (radio 2px), mismo peso visual que los ticks mono. Nada de íconos rellenos 3D ni degradés.
- **Imagen:** fotografía real de talleres/personas con un tratamiento consistente (leve calidez, no stock azulado corporativo). Duotono opcional en teal/ink para franjas. Evitar ilustración "blob" genérica de startup.
- **Datos y diagramas:** estética blueprint — ticks de coordenada mono, líneas hairline `ink@18%`, sin sombras dramáticas.

### 4.4 Motion (sobriedad institucional)
- **Sí se anima:** dibujo de la flecha `A→B` al cargar el hero (stroke-dashoffset ~1s); revelado en scroll de la escalera de 4 niveles (stagger 80ms por nodo); micro-interacción hover en botones (translateY -1px + sombra sólida offset, sin blur).
- **No se anima:** texto de cuerpo, logos institucionales, nada parallax, nada de auto-play llamativo.
- **Obligatorio:** respetar `prefers-reduced-motion` (sin excepción).

---

## 5. Componentes clave (especificados)

| Componente | Spec |
|---|---|
| **Hero (Home)** | Fondo `paper`. Eyebrow mono `// [posicionamiento]`. H1 Fraunces 660, con la palabra clave en `teal`. Debajo: las dos rieles `persona ──→ persona capaz` / `empresa ──→ empresa agéntica`. CTA primario teal ("Agendar diagnóstico"). Sin imagen de fondo compitiendo con el H1. |
| **Card de nivel/programa** | Borde `ink` 1px, radio 5px, fondo `paper-soft`. Esquina mono `A→B`. Kicker de vertical (plum o teal). Título Fraunces 620. Barra inferior 3px del color de la vertical. |
| **Sección "Sé Trainer"** | Registro más cálido (puede apoyarse en `plum`). Tono: oportunidad de carrera seria, no pirámide. Tabla de "recuperás la inversión en ≈2 cohortes" con notación mono para las cifras. |
| **Franja institucional (BM, BID, FAO, SAGyP…)** | Fondo `ink` o `paper-soft`, logos en monocromo (`ink` o `paper`), alineados a grilla, hairline separadora. Cero animación. Es la prueba de credibilidad: sobria. |
| **CTA** | Primario: sólido `teal`, texto blanco, radio 4px, hover translateY + sombra sólida. Secundario (personas): sólido `plum`. Ghost: borde `ink`, hover invierte a fondo `ink`. |
| **Formulario de contacto segmentado** | 3 intenciones ("Formar a mi equipo" / "Ser trainer" / "Proyecto de transformación") como toggle mono; cada una ajusta campos. Foco visible teal. |

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
- [ ] `plum` aparece solo codificando la vertical personas, nunca como relleno masivo.
- [ ] La flecha `A→B` aparece en: marcadores de sección, códigos de vertical y camino de 4 niveles (ya no en el wordmark — ver sección Logo del `SKILL.md`).
- [ ] El logo usa la variante correcta para su fondo y respeta tamaño mínimo y área de resguardo.
- [ ] Franja institucional sobria, monocromo, sin motion.
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
