# Componentes web — specs

Specs para implementar en React/Next.js con los tokens de `assets/tokens/`. Ningún componente lleva hex ni nombre de fuente literal. El repo del sitio es la implementación de referencia; las copias que viajan con el skill están en `assets/components/`. Reglas de uso del sitio en `soportes/web.md`; ilustraciones en `ilustracion.md`.

## Capa editorial

| Componente | Qué hace | Regla clave |
|---|---|---|
| **PosterHeading** | Titular a escala póster | 1–4 palabras, Newsreader 700 en minúscula, palabra o frase destacada en itálica (`accent`, admite varias palabras), `line-height` `--lh-poster`. `scale="slide"` en lienzos fijos. Uno por pantalla |
| **TapeLabel** | Cinta rotada en mono, versión física del marcador de sección | Máximo 2 por composición, 1–2 palabras. Ángulos `--tape-rot` −6.5° / `--tape-rot-alt` 5.5°. Sombra sólida `--shadow-tape`, nunca blur |
| **InterlockHeadline** | Bloque de imagen incrustado dentro de una línea de titular | Alto `--interlock-h` (0.78em), gap `--interlock-gap` |
| **StatCounter** | Cifra en Newsreader que cuenta desde 0 al entrar (IntersectionObserver 40%, 1200ms) | Siempre con unidad y contexto. `size="sm"` (`--text-counter-sm`) en filas de datos |
| **IllustrationSlot** | Andamio mientras una ilustración no está hecha | Se reemplaza por una pieza de la serie del cerebro, nunca por un ícono genérico |

## Estructura y marca

| Componente | Spec |
|---|---|
| **Logo** | `components/logo.tsx`, prop `surface="light" \| "dark"`, consume `--color-teal`/`--color-teal-dark`/`--color-ink`/`--color-paper` |
| **Barra** | Píldora con borde y desenfoque de fondo, links en píldora, CTA primario a la derecha (`bg-teal`; sobre el hero oscuro `bg-teal-ui-dark`) |
| **Button** | Píldora (`rounded-full`), Schibsted Grotesk bold, texto `text-on-brand`. Primario `bg-teal hover:shadow-teal`; sobre oscuro `bg-teal-ui-dark`. Secundario `bg-plum` solo si el destino habla de la gente o la decisión humana. Ghost: borde `ink` que se invierte en hover. Hover `-translate-y-0.5` |
| **SectionMarker** | Etiqueta mono `03 · CONTROL` arriba del título |
| **TransitionArrow** | La flecha `A ──→ B`; se dibuja con `stroke-dashoffset` (1000ms) al entrar |
| **VerticalRail** | Rieles de mensaje con A y B explícitos |
| **Tarjeta** | Blanca con filete de tinta 1px, radio `--radius-md`, sin sombra difusa |
| **InstitutionalStrip** | "Organizaciones para las que trabajó nuestro equipo", nombres o logos en monocromo, fondo `ink` o `paper-soft`. Marquesina lenta (32s, pausa con el cursor), quieta con `prefers-reduced-motion`. Lista en `content/home.ts` |
| **Formulario de contacto** | Un solo formulario (nombre, email, empresa, país, tamaño, qué IA usan, mensaje), directo a HubSpot. Foco visible teal. `SegmentedIntent` queda sin uso |
| **Bloque lateral** | Franja vertical teal a sangre de `--colorblock-w-narrow` (14vw) o `--colorblock-w` (24vw). Solo portada y cierre |

## Camino del cliente (`LevelPath`)

Escalera de estados unidos por la flecha, horizontal en escritorio y vertical en móvil.

```
[ Primera conversación ] ──→ [ Radar ] ──→ [ Ola cero ] ──→ [ Olas ] ──→ [ Operación continua ]
      estado 01              estado 02     estado 03       estado 04       estado 05
```

- Cada nodo: etiqueta mono de estado, título en Newsreader y una línea de resultado en Schibsted Grotesk. Los cinco nombres no se renombran por pieza.
- Nodos con borde `ink`; el destacado en `teal`. Oliva solo si el nodo implica una decisión humana. Una pieza que muestra una parte deja el resto con borde `taupe`.
- Revelado en scroll, fade-up de 80ms por nodo.
- ⚠️ Spec de la v1.3, a confirmar al implementarla en el sitio. En el home v1.6 el proceso se cuenta con `Recorrido`.

## Heros

### `HeroGrano` (home, v1.5)

Fondo oscuro de grano: puntitos redondos teal luz, ralos donde está el texto y más densos a la derecha, quietos. El cursor los empuja de a uno y vuelven con resorte. Algunos se encienden de a ratos como neón lima. Canvas 2D, colores leídos de los tokens. Reemplaza a `HeroDots` en el home.

### `HeroField` (páginas internas, v1.3.1)

Fondo animado del hero claro, con un patrón propio por página que cuenta en abstracto lo que dice.

| Página | Patrón | Qué cuenta | Acento teal | Cursor |
|---|---|---|---|---|
| `/central-ia` | `flow`: guiones que siguen un flujo | La plataforma ordena | Foco que deriva | Los guiones se alinean hacia → |
| `/como-implementamos` | `waves`: olas concéntricas de puntos | Las olas del método | La ola cero | Larga su propia onda |
| `/proyectos` | `blocks`: bloques que se arman y desarman | Piezas en construcción | Algunos bloques armados | Completa los bloques |
| `/nosotros` | `contours`: curvas de nivel | Trayectoria, terreno | Una de cada cinco curvas | Levanta un cerro |
| `/precios` | `meter`: columnas tipo medidor | El consumo | El punto superior | Sube las columnas cercanas |
| `/contacto` | `signal`: pulsos que viajan por filas | Un mensaje de A a B | La punta del pulso | Agranda los puntos cercanos |

- Sobre `paper`, trazos en `ink` tenue y acento `teal`; con `surface="dark"` usa `paper` y `teal-dark`. No suma secciones oscuras.
- La trama casi desaparece detrás del texto (`align="center"` en `/contacto`) y se atenúa en pantallas angostas; `blocks` y `meter` bajan más su intensidad.
- WebGPU con `vgpu`; sin WebGPU, trama estática en CSS; con `prefers-reduced-motion`, quieta.
- Un patrón por página, ninguno repetido. Las legales no llevan. Una página nueva necesita un patrón nuevo con su propia idea, o va sin fondo.

### `HeroDots` (v1.2, sin uso en el home desde la v1.5)

Grilla de puntos tipo semitono sobre `ink` en WebGPU (`vgpu`), con zona encendida en `teal-dark` que deriva y apertura alrededor del cursor. Valores aprobados: paso 18px, punto 0.62, velocidad 0.12, radio del cursor 190px, foco 0.9. Respaldo estático en CSS.

## Home de venta enterprise (v1.6)

`app/page.tsx`, componentes en `components/home/` (copia en `assets/components/enterprise/home/`).

| Orden | Componente | Spec |
|---|---|---|
| 1 | Hero | Titular "La IA de tu empresa, *de punta a punta*" y franja institucional debajo |
| 2 | `Manifiesto` | Tres frases grandes que se encienden palabra por palabra, con una foto en píldora al final de cada una |
| 3 | `AntesDespues` | Filas A ──→ B que entran escalonadas |
| 4 | `Oferta` | Infraestructura, agentes y equipo en tarjetas altas con foto a sangre; de a dos en ancho medio y de a tres en grande; el texto que sube con el cursor solo en pantallas grandes |
| 5 | `Recorrido` | Cinco etapas que avanzan solas con barra de progreso, se pausan con el cursor y se pueden elegir. Al costado, una única tarjeta con "qué te llevás", "quiénes están" y las capas que ya funcionan, que se encienden de abajo hacia arriba. Sin fotos ni botón suelto |
| 6 | `AgentesRubros` | Rubros en grande que rotan solos; cada tarea como pase de manos "el agente ──→ tu gente". Sin foto ni tarjetas |
| 7 | `BandaControl` | Foto a sangre con velo y cuatro garantías en filetes |
| 8 | `QuienesSomos` | Cifras a escala de sección (`StatCounter size="sm"`) |
| 9 | Preguntas frecuentes y cierre | — |

Apoyo: `Foto` y `Aparece` (`assets/components/enterprise/`), registro `imagenes.ts`.

## Central IA (v1.6)

`app/central-ia/page.tsx`, componentes en `components/central/` (copia en `assets/components/enterprise/central/`).

- **`ComponentesGrid`:** Brain, Agentes y Herramientas en tres columnas separadas por filetes, cada una con su dibujo de la serie del cerebro en una caja de alto fijo para alinear los títulos; el resto de los componentes en lista de dos columnas con filetes. Sin cajas ni tarjetas.
- **`Continuidad`:** tres fases que avanzan solas (mientras trabaja, cuando se va, cuando llega alguien) con un esquema persona → Brain → persona. Sin foto.
- Control por niveles, banda "Central IA viene con un equipo" (foto) y detalle para sistemas.
- Las demos animadas del producto se borraron en la v1.6.1 (siguen en git, commit `cd4e599`); sus datos quedan en `content/central-ia.ts`.

## Secuencias que avanzan solas

Recorrido, rubros y continuidad comparten reglas: corren solo mientras están en pantalla, muestran barra de progreso, se pausan con el cursor, se pueden elegir a mano y quedan quietas con `prefers-reduced-motion`.

## Motion de componentes

| Qué | Valores |
|---|---|
| Titular | Revelado por palabra o línea, escalonado 70ms, 620ms |
| Cinta | 0° → ángulo final con escala 0.86 → 1, 420ms, `--ease-tape` |
| Contador | 1200ms, una vez |
| Camino del cliente | Fade-up, 80ms por nodo |
| Flecha | `stroke-dashoffset`, 1000ms |
| Hover de CTA | `translateY(-1px)` + sombra sólida |
