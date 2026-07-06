---
name: innov-design-system
description: >-
  Sistema de identidad visual y design tokens de INNOV.AS (sistema "Cálido / Notación de Transición" —
  paper/ink/teal/plum + Fraunces/Inter/Space Mono). Usar SIEMPRE que se construya, edite o revise cualquier
  pieza de marca de INNOV.AS — componentes React/Next.js/Tailwind del sitio institucional (home, programas,
  hero, cards), decks o one-pagers comerciales, materiales de la línea de Educación IA, branding del LMS, o
  cualquier UI o documento que deba verse "de INNOV.AS". Activar también si el usuario menciona colores,
  paleta, tipografías, marca, identidad visual, hero, tokens, Tailwind config, style tile, o pide
  implementar/diseñar algo para innov.as — incluso si no nombra el skill explícitamente ni adjunta los
  archivos de referencia. Regla dura para código: cero hex o nombres de fuente hardcodeados en JSX/TSX,
  todo vía var(--...) o clases Tailwind mapeadas a los tokens; fuentes self-host con next/font.
---

# INNOV.AS — Design System

## Qué es

"Sistema Cálido / Notación de Transición": editorial cálido (papel tostado, serif humanista) + anotación técnica (mono, ticks, flecha) sobre neutros. La marca vive en la flecha de transición `A ──→ B` — codifica la tesis del negocio (toda transformación es un cambio de estado) y las dos verticales de INNOV.AS: `teal` (empresas / agéntico) y `plum` (personas / educación).

Esto no es una preferencia estética a discutir en cada tarea — ya fue definido, aprobado por Mati, y tiene tokens de código listos (`assets/tokens/`). El trabajo de cualquier pieza nueva es **aplicar** este sistema, no reinventar paleta o tipografía.

## Regla dura para código

**Cero hex, cero nombres de fuente hardcodeados en JSX/TSX.** Todo color y tipografía se consume vía `var(--...)` (CSS) o clases Tailwind que ya mapean a esos tokens (`bg-paper`, `text-ink`, `text-teal`, `font-display`, etc.).

Por qué importa: los tokens son el contrato entre diseño e implementación (`innov/diseno/tokens/` es la fuente de verdad, este skill trae una copia empaquetada en `assets/tokens/`). Si un componente hardcodea `#0F6B60` en vez de `text-teal`, ese componente se desincroniza en el momento en que la paleta cambie una vez — y va a pasar, porque el sitio, los decks y el LMS comparten la misma marca. Un valor que no está en los tokens no se inventa: se agrega al contrato primero (edita `globals.css`, después úsalo).

## Tokens — resumen rápido

| Token | Hex | Rol | Contraste |
|---|---|---|---|
| `paper` | `#EDE8DC` | Superficie base | — |
| `paper-soft` | `#E4DDCC` | Tarjeta / bloque secundario | — |
| `ink` | `#1F1B19` | Texto y estructura | 13.98:1 (AAA) |
| `teal` | `#0F6B60` | **Marca** · empresas · agéntico | 5.22:1 (AA) |
| `plum` | `#8C3B5D` | Personas · educación | 5.93:1 (AA) |
| `taupe` | `#A79E8E` | Bordes/ticks/metadatos — **nunca texto esencial chico** | 2.17:1, no pasa AA |

Reglas de uso: `teal` manda como color de marca. `plum` entra solo para codificar la vertical personas (kickers, barras, íconos) — nunca como relleno masivo, y nunca junto a `teal` con igual peso en un mismo componente.

**Tipografía:** Fraunces (display — H1-H3, wordmark, `opsz`/`SOFT` variables para calidez) · Inter (texto/UI) · Space Mono (notación: firma `A→B`, estados, datos — nunca párrafos).

Tabla completa de tokens (escala tipográfica, radios, sombras, motion) en `assets/tokens/globals.css` — es la fuente ejecutable, no la reescribas de memoria.

## Workflow — implementación en código (Next.js/Tailwind)

1. **Verificá si el proyecto ya tiene los tokens** (buscá `--color-teal` en el CSS global o `teal` en `tailwind.config`). Si no existen: copiá `assets/tokens/globals.css` al stylesheet global del proyecto y fusioná `assets/tokens/tailwind.config.ts` (el bloque `theme.extend`) al config existente — no lo sobrescribas entero, el proyecto puede tener otras extensiones.

2. **Fuentes self-host con `next/font`** (nunca `<link>` a Google Fonts ni `@import`). Ejemplo para App Router, coherente con las variables CSS que ya esperan estos nombres:

   ```ts
   // app/fonts.ts
   import { Fraunces, Inter, Space_Mono } from "next/font/google";

   export const fraunces = Fraunces({
     subsets: ["latin"],
     variable: "--font-display",
     axes: ["opsz", "SOFT", "WONK"],
     display: "swap",
   });

   export const inter = Inter({
     subsets: ["latin"],
     variable: "--font-sans",
     display: "swap",
   });

   export const spaceMono = Space_Mono({
     subsets: ["latin"],
     weight: ["400", "700"],
     variable: "--font-mono",
     display: "swap",
   });
   ```

   Aplicá las tres clases `variable` en el elemento raíz (`<html className={\`${fraunces.variable} ${inter.variable} ${spaceMono.variable}\`}>`). `next/font` sobreescribe los `--font-*` de `globals.css` con el stack real self-hosted; los valores en `globals.css` quedan como fallback documentado, no hace falta tocarlos.

3. **Construí con clases Tailwind mapeadas a tokens**, nunca `style={{color: "#..."}}` ni clases arbitrarias `bg-[#0F6B60]`. Ejemplos: `bg-paper text-ink`, `text-teal font-display`, `border-ink font-mono text-xs`.

4. **Antes de dar por terminado un componente, auditá lo que escribiste:**

   ```bash
   python3 scripts/audit_tokens.py <archivos-o-carpeta-tocados>
   ```

   El script busca hex sueltos y `font-family`/`fontFamily` hardcodeados fuera de los archivos de tokens. Si marca algo, corregilo antes de entregar — no es opcional, es la misma regla que un linter de CI aplicaría.

5. **Para el elemento firma, el camino de 4 niveles, y specs de componentes** (hero, card de nivel, sección "Sé Trainer", franja institucional, CTA, motion) — leé `references/direccion-de-arte.md`, secciones 4 y 5. No reinventes estos componentes desde cero: ya están especificados.

6. **Referencia visual navegable:** `assets/style-tile.html` — abrí este archivo (es HTML autocontenido) para ver la paleta, tipografía y componentes ya renderizados. Útil para comparar contra lo que estás construyendo, especialmente si no tenés certeza de cómo se ve un token aplicado.

## Workflow — piezas sin código (decks, one-pagers, branding del LMS)

Estas piezas no consumen `var(--...)` — necesitan los valores literales. Usá `references/non-code-usage.md`: mismo sistema de colores/tipografía que el código, pero con hex directos, notas de licencia de fuente para herramientas de diseño/oficina, y las mismas reglas de uso (plum restringido a la vertical personas, taupe nunca como texto principal, teal domina). No inventes una paleta "similar" para estas piezas — son la misma marca, solo sin la capa de tokens de CSS.

**Excepción de fondo para .docx y .pdf:** en estos dos formatos específicamente, el fondo/superficie base es `#FAF8F5` (no `#EDE8DC`). El oat más oscuro funciona bien en pantalla/slide pero pesa demasiado como fondo de página completa en un documento de lectura larga o para imprimir. El resto de la paleta (ink, teal, plum, taupe) no cambia. Detalle en `references/non-code-usage.md`.

## Recursos del skill

- `references/direccion-de-arte.md` — guía completa de dirección de arte (T3.2): análisis y justificación de la dirección, paleta con contraste WCAG, tipografía, sistema visual (flecha, camino de 4 niveles, iconografía, motion), specs de componentes clave, checklist de aceptación.
- `references/non-code-usage.md` — cheat sheet de marca para piezas sin código.
- `assets/tokens/globals.css` + `assets/tokens/tailwind.config.ts` — fuente de verdad ejecutable, para copiar/fusionar al proyecto.
- `assets/style-tile.html` — referencia visual navegable de todo el sistema.
- `scripts/audit_tokens.py` — detecta hex y fuentes hardcodeadas fuera de los archivos de tokens.

## Mantenimiento

Este skill empaqueta una copia de `innov/diseno/` (carpeta local de Mati, fuente original) para que funcione de forma autocontenida en cualquier sesión. Si la dirección de arte cambia, actualizá primero `innov/diseno/` y el brain (`marketing/identidad-visual-innovas.md`), y después sincronizá este skill — no al revés.
