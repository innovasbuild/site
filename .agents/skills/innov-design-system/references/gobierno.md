# Gobierno y evolución del sistema

Este sistema es una base para crecer. Esta guía dice quién lo cuida, qué se puede cambiar, cómo se cambia y por dónde conviene hacerlo evolucionar.

## Dueños

- **Luli** define la dirección de arte: propone cambios de paleta, tipografía, ilustración y layout, con bocetos o piezas de prueba.
- **Mati** valida: ninguna versión rige hasta que Mati la aprueba, y su aprobación queda en `decisiones.md` con fecha.
- **El resto del equipo** (comercial, producto, quien arme una pieza) puede **proponer** cambios y soportes nuevos. Las devoluciones de clientes o del dueño entran como propuesta, no como regla.

## Qué es núcleo y qué es evolución

| Núcleo (cambia poco y con decisión explícita) | Evolución (se espera que crezca) |
|---|---|
| Logo: isotipo, wordmark y sus variantes | Soportes nuevos (planillas y tableros, video, eventos, UI de Central IA) |
| Paleta base (paper, ink, teal, segundo color oliva/lima, taupe) | Plantillas por soporte |
| Tipografías Newsreader + Schibsted Grotesk + IBM Plex Mono | Piezas nuevas de la serie del cerebro |
| Rol de los acentos: teal plataforma, segundo color gente | Banco de fotografía propio |
| Flecha `A ──→ B` y notación mono como elementos firma | Componentes y secciones del sitio |
| Reglas de contraste y de fondos oscuros | Motion, tono de voz por canal, ejemplos de copy |

Un cambio de núcleo es versión mayor.

## Versiones

- **Mayor (2.0):** cambia algo del núcleo. (Las v1.5 y v1.6 cambiaron paleta, tipografía e imagen dentro de la serie 1.x; desde la v1.7 se sigue este criterio.)
- **Menor (1.8):** se suma un soporte, una plantilla, un componente o una regla nueva.
- **Corrección (1.7.1):** se aclara o corrige algo sin cambiar el criterio.

La versión vigente figura al final del `SKILL.md`; el historial completo, en `decisiones.md`.

## Circuito de un cambio

1. **Propuesta.** Qué pieza, qué problema, qué se propone, en una línea. Se registra como `propuesta` en `decisiones.md`.
2. **Prueba en una pieza real.** Se aplica en una pieza concreta (una sección del sitio, un deck, un posteo) antes de volverlo regla.
3. **Decisión.** Mati aprueba, ajusta o descarta, y queda en `decisiones.md` con fecha y responsable.
4. **Actualización.** Se edita el archivo del soporte (o se crea desde `soportes/_plantilla.md`), los tokens si corresponde, y se sube la versión al final del `SKILL.md`. La fuente de verdad es `.agents/skills/innov-design-system/` del repo del sitio; después se copia idéntica a `.claude/skills/innov-design-system/`.
5. **Publicación.** El skill se sube como borrador al brain de INNOV.AS y un administrador lo publica. Si cambia la dirección de arte, se actualiza también `marketing/identidad-visual-innovas` en el brain.
6. **Comunicación.** Aviso corto al equipo: qué cambió y desde cuándo rige.

## Reglas para cambiar

- Un color o tipografía nuevos se agregan primero a `assets/tokens/globals.css` y después se usan.
- Todo color nuevo de texto o interfaz lleva su contraste calculado (WCAG 2.1, AA mínimo), sobre claro y sobre `ink` si va a usarse en oscuro.
- Un soporte nuevo sigue la estructura de `soportes/_plantilla.md`, sin excepciones.
- Las herramientas se nombran solo en "Notas por herramienta".
- Lo que queda sin confirmar se marca con ⚠️ y se resuelve en la próxima versión.
- Lo que se retira no se borra del registro: queda en `decisiones.md` como `retirada`, para no volver a probarlo.

## Revisión periódica

Cada trimestre se toma una muestra de piezas recientes (dos por soporte) y se pasan por el checklist de cada soporte. Lo que falla en más de una pieza indica que la regla no es clara o la plantilla no existe: esa es la próxima mejora.

- ¿Qué piezas se hicieron por fuera de las plantillas? ¿Por qué?
- ¿Qué consultas se repiten? Cada una es una regla o plantilla que falta.
- ¿Qué soporte nuevo apareció?
- ¿Algún color, tamaño o recurso se usa distinto a lo escrito? ¿Se corrige la pieza o la regla?
- ¿El copy sigue alineado con `marketing/mensajes-innovas`?

## Ideas para hacer evolucionar el sistema

**Fundaciones**
- Instalar las tres fuentes en las máquinas del equipo.
- Valores de impresión (CMYK) por prueba, si se imprime algo más que documentos de oficina.

**Plantillas listas para usar**
- Deck comercial y de propuesta en el formato nativo de Claude.
- Propuesta en Word con estilos, informe del Radar y one-pager.
- Kit de LinkedIn con las plantillas tipo de `soportes/redes.md`.
- Firma de correo en HTML.

**Contenido de marca**
- Banco de fotografía propio que reemplace las referencias de Unsplash.
- Más piezas de la serie del cerebro (método, olas, control).
- Biblioteca de cifras vigentes con fuente y fecha.
- Logos institucionales (BM, BID, FAO, SAGyP) en monocromo para la franja.

**Soportes por sumar**
- Planillas, tableros y gráficos (paleta de series de datos).
- Video y animación (apertura, cierre, zócalos).
- Eventos e impresión (roll-up, credenciales).
- UI de Central IA, si la plataforma adopta la marca.
