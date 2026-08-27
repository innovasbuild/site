# `/precio` — Cotizador self-service "En Paralelo" — Plan de implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publicar `/precio` en el sitio de INNOV.AS como cotizador self-service caminable desde el primer commit, que registra el lead en el CRM, manda dos mails y ofrece pago por Mercado Pago o transferencia.

**Architecture:** El front-end es una página de Next.js App Router: un server component que resuelve tipo de cambio y readiness, y un árbol de componentes cliente para el wizard de 4 pasos. Toda la lógica de plata vive en funciones puras testeables (`lib/precio-quote.ts`), y todo el copy y la configuración operativa en `content/precio.ts`. El backend es una Supabase Edge Function nueva (`precio_lead`) en el repo del CRM, que **recalcula la cotización del lado del servidor** y nunca confía en montos enviados por el cliente. Un único mecanismo de "readiness" derivado de la configuración hace que la página sea una maqueta caminable y se vuelva real por partes, sin código temporal.

**Tech Stack:** Next.js 16 (App Router, React 19), Tailwind CSS v4 con tokens propios, TypeScript strict, vitest (a instalar en el sitio; ya existe en el CRM), Supabase Edge Functions (Deno), Postmark.

**Spec:** `docs/superpowers/specs/2026-08-26-precio-self-service-design.md`

## Global Constraints

- **Dos repos.** Sitio: `/Users/mok/Sites/innovas/site`. CRM: `/Users/mok/Sites/innovas/crm`. Cada task dice en cuál trabaja. Nunca commitear los dos en el mismo commit.
- **Cero datos de tarjeta.** Ningún campo de tarjeta en ningún componente, payload, tabla o mail. No hay backend propio que pueda recibirlos legalmente (PCI-DSS).
- **El cliente nunca manda montos.** El payload al backend lleva sólo `diag`, `olaStarter`, `radarOpt`, datos de contacto y aceptación de términos. La Edge Function recalcula todo.
- **Cero valores hardcodeados de diseño.** Sin hex ni nombres de fuente en JSX. Todo vía clases Tailwind mapeadas a los tokens de `app/globals.css`: `bg-paper`, `bg-paper-soft`, `text-ink`, `text-ink-70`, `text-ink-40`, `text-teal`, `text-danger`, `border-line`, `text-on-brand`, `font-display`, `font-sans`, `font-mono`.
- **Copy en `content/`.** Ningún string de cara al usuario dentro de un componente. Convención existente del repo.
- **Nunca inventar datos.** Ni razón social por CUIT, ni tipo de cambio. Si un dato falta, se muestra el estado "pendiente" literal (convención del tipo `Dato` en `content/types.ts`).
- **Catálogo de precios (verbatim de la spec):** Radar USD 1.500. Mapa del Método USD 7.500. Plan PRO USD 1.500/mes. Ola Starter = 4 cuotas del plan = USD 6.000.
- **Los cuatro escenarios, con montos literales.** Estos números aparecen en tests a los dos lados del sistema y no se cambian sin cambiar los dos:

  | Diagnóstico | Ola Starter | Total programa | Primer pago | Cuotas restantes | Mensual desde mes 5 |
  |---|---|---|---|---|---|
  | radar | no | 1500 | 1500 | 0 | null |
  | radar | sí | 6000 | 1500 | 3 | 1500 |
  | mapa | no | 7500 | 7500 | 0 | null |
  | mapa | sí | 7500 | 7500 | 0 | 1500 |

- **Idioma:** todo el copy en español rioplatense (voseo), con acentos correctos.
- **Type check obligatorio.** `npx tsc --noEmit` en el sitio antes de cada commit.

---

## Estructura de archivos

### Repo del sitio

| Archivo | Responsabilidad |
|---|---|
| `vitest.config.ts` | Config mínima de vitest, entorno node, sólo tests de `lib/` |
| `lib/precio-quote.ts` | `computeQuote()` y el catálogo de precios. Pura, sin React ni DOM |
| `lib/precio-readiness.ts` | Deriva qué capacidades están listas desde config + env |
| `lib/bna-rate.ts` | Fetch, validación y fallback del tipo de cambio |
| `content/precio.ts` | Copy, config de pago (links MP, transferencia, Calendly), flags |
| `app/precio/page.tsx` | Server component: metadata, tipo de cambio, readiness, modo maqueta |
| `components/precio/wizard.tsx` | Orquestador: estado del cotizador, navegación entre pasos |
| `components/precio/step-cotizador.tsx` | Paso 1: elegir diagnóstico, Ola Starter, agendar |
| `components/precio/step-resumen.tsx` | Paso 2: resumen de la cotización |
| `components/precio/step-datos.tsx` | Paso 3: contacto + empresa + CUIT |
| `components/precio/step-pago.tsx` | Paso 4: elegir medio de pago + términos |
| `components/precio/confirmacion.tsx` | Pantalla final: confirmación + agendar Calendly |
| `components/precio/copy-field.tsx` | Campo de sólo lectura con botón de copiar |
| `components/precio/pending-panel.tsx` | Checklist de pendientes, sólo en modo maqueta |
| `components/precio/mockup-banner.tsx` | Banner fijo "MAQUETA — no se procesa ningún pago" |
| `components/precio/precio-money.tsx` | Muestra un monto en USD con su referencia en ARS |
| `content/seo.ts` | Entrada `/precio` (editado) |
| `app/sitemap.ts` | Exclusión de `/precio` mientras no esté listo (editado) |
| `content/global.ts` | Alta del nav link cuando esté listo (editado) |

### Repo del CRM

| Archivo | Responsabilidad |
|---|---|
| `supabase/functions/precio_lead/index.ts` | CORS, secret, cap de body, orquestación |
| `supabase/functions/precio_lead/computeQuote.ts` | Copia en Deno de la lógica de cotización |
| `supabase/functions/precio_lead/validateQuotePayload.ts` | Validación y normalización del payload |
| `supabase/functions/precio_lead/buildQuoteNoteText.ts` | Texto de la nota del CRM |
| `supabase/functions/precio_lead/buildDealInsert.ts` | Mapeo puro al row de `deals` |
| `supabase/functions/precio_lead/buildSalesNotification.ts` | Mail interno |
| `supabase/functions/precio_lead/buildVisitorInstructions.ts` | Mail al visitante |
| `supabase/functions/precio_lead/sendPostmark.ts` | Envío con timeout |
| `supabase/functions/precio_lead/createQuoteLead.ts` | Contacto + empresa + nota + deal |

---

## Task 1: Runner de tests y lógica de cotización

**Repo:** sitio

**Files:**
- Create: `vitest.config.ts`
- Create: `lib/precio-quote.ts`
- Test: `lib/precio-quote.test.ts`
- Modify: `package.json` (agregar script `test` y devDependency `vitest`)

**Interfaces:**
- Consumes: nada.
- Produces:
  - `type Diagnostico = "radar" | "mapa"`
  - `const CATALOGO` con `radar.valor`, `radar.label`, `mapa.valor`, `mapa.label`, `planMensual`, `planNombre`, `olaStarterCuotas`
  - `interface Quote { diag, diagLabel, diagValue, diagBonificado, olaStarter, olaStarterBruto, creditApplied, totalPrograma, montoPrimerPago, cuotasRestantes, mensualDesdeMes5 }`
  - `function computeQuote(input: { diag: Diagnostico; olaStarter: boolean }): Quote`
  - `const montosPrimerPagoPosibles: number[]`

- [ ] **Step 1: Instalar vitest**

```bash
cd /Users/mok/Sites/innovas/site
npm install --save-dev vitest@^4.1.0
```

- [ ] **Step 2: Crear la config de vitest**

El repo no tiene runner hoy. Entorno node y nada más: los componentes se prueban a mano en el browser (así lo decide la spec), acá sólo corre lógica pura.

`vitest.config.ts`:

```ts
import path from "node:path"
import { defineConfig } from "vitest/config"

// Sólo lógica pura de `lib/`. Los componentes del wizard se verifican a mano en el
// browser (ver la spec): no hay entorno de DOM configurado acá a propósito.
export default defineConfig({
  resolve: {
    alias: { "@": path.resolve(__dirname, "./") },
  },
  test: {
    environment: "node",
    include: ["lib/**/*.test.ts"],
  },
})
```

- [ ] **Step 3: Agregar el script de test**

En `package.json`, dentro de `"scripts"`, agregar:

```json
    "test": "vitest run",
    "test:watch": "vitest",
```

- [ ] **Step 4: Escribir los tests que fallan**

`lib/precio-quote.test.ts`:

```ts
import { describe, expect, it } from "vitest"
import { computeQuote, montosPrimerPagoPosibles } from "./precio-quote"

/**
 * Los cuatro escenarios del cotizador, con montos literales.
 * ESPEJADO en el repo del CRM: supabase/functions/precio_lead/computeQuote.test.ts
 * Si cambia un precio, tiene que cambiar en los dos lados o uno de los dos queda rojo.
 */
describe("computeQuote", () => {
  it("radar sin Ola Starter: pago único de 1500, sin suscripción", () => {
    expect(computeQuote({ diag: "radar", olaStarter: false })).toEqual({
      diag: "radar",
      diagLabel: "Radar",
      diagValue: 1500,
      diagBonificado: false,
      olaStarter: false,
      olaStarterBruto: 0,
      creditApplied: 0,
      totalPrograma: 1500,
      montoPrimerPago: 1500,
      cuotasRestantes: 0,
      mensualDesdeMes5: null,
    })
  })

  it("radar con Ola Starter: el Radar queda bonificado y no se acredita nada", () => {
    expect(computeQuote({ diag: "radar", olaStarter: true })).toEqual({
      diag: "radar",
      diagLabel: "Radar",
      diagValue: 1500,
      diagBonificado: true,
      olaStarter: true,
      olaStarterBruto: 6000,
      creditApplied: 0,
      totalPrograma: 6000,
      montoPrimerPago: 1500,
      cuotasRestantes: 3,
      mensualDesdeMes5: 1500,
    })
  })

  it("mapa sin Ola Starter: pago único de 7500, sin suscripción", () => {
    expect(computeQuote({ diag: "mapa", olaStarter: false })).toEqual({
      diag: "mapa",
      diagLabel: "Mapa del Método",
      diagValue: 7500,
      diagBonificado: false,
      olaStarter: false,
      olaStarterBruto: 0,
      creditApplied: 0,
      totalPrograma: 7500,
      montoPrimerPago: 7500,
      cuotasRestantes: 0,
      mensualDesdeMes5: null,
    })
  })

  it("mapa con Ola Starter: se cobra el mapa y acredita 6000, Ola Starter sin cargo extra", () => {
    expect(computeQuote({ diag: "mapa", olaStarter: true })).toEqual({
      diag: "mapa",
      diagLabel: "Mapa del Método",
      diagValue: 7500,
      diagBonificado: false,
      olaStarter: true,
      olaStarterBruto: 6000,
      creditApplied: 6000,
      totalPrograma: 7500,
      montoPrimerPago: 7500,
      cuotasRestantes: 0,
      mensualDesdeMes5: 1500,
    })
  })

  it("el total del programa nunca es menor al diagnóstico ya pagado", () => {
    for (const diag of ["radar", "mapa"] as const) {
      for (const olaStarter of [false, true]) {
        const q = computeQuote({ diag, olaStarter })
        const cobrable = q.diagBonificado ? 0 : q.diagValue
        expect(q.totalPrograma).toBe(Math.max(cobrable, q.olaStarterBruto))
      }
    }
  })
})

describe("montosPrimerPagoPosibles", () => {
  it("son exactamente dos, ordenados, y de ahí salen los links de Mercado Pago", () => {
    expect(montosPrimerPagoPosibles).toEqual([1500, 7500])
  })
})
```

- [ ] **Step 5: Correr los tests para verificar que fallan**

Run: `npm test`
Expected: FAIL — no se puede resolver `./precio-quote`.

- [ ] **Step 6: Implementar la lógica**

`lib/precio-quote.ts`:

```ts
/**
 * Lógica de cotización de "En Paralelo". Pura: sin React, sin DOM, sin red.
 *
 * ESPEJADO en el repo del CRM, en
 * `supabase/functions/precio_lead/computeQuote.ts`, porque la Edge Function
 * recalcula los montos del lado del servidor y no confía en los que manda el
 * browser. Los tests de los dos lados usan los mismos montos literales: si
 * cambiás un precio acá y no allá, uno de los dos queda rojo.
 */

export type Diagnostico = "radar" | "mapa"

export const CATALOGO = {
  radar: { valor: 1500, label: "Radar" },
  mapa: { valor: 7500, label: "Mapa del Método" },
  planMensual: 1500,
  planNombre: "PRO",
  olaStarterCuotas: 4,
} as const

export interface Quote {
  diag: Diagnostico
  diagLabel: string
  /** Valor de catálogo del diagnóstico, se cobre o no. */
  diagValue: number
  /** El Radar queda sin cargo al sumar Ola Starter: no se cobra ni se acredita. */
  diagBonificado: boolean
  olaStarter: boolean
  /** Valor bruto de Ola Starter (4 cuotas del plan), o 0 si no se sumó. */
  olaStarterBruto: number
  /** Cuánto del diagnóstico se acredita contra Ola Starter. */
  creditApplied: number
  /** Total del programa: lo que cuesta todo junto. */
  totalPrograma: number
  /** Lo que se cobra en este primer pago. */
  montoPrimerPago: number
  /** Cuotas que quedan después del primer pago. */
  cuotasRestantes: number
  /** Abono mensual desde el mes 5, o null si no hay suscripción. */
  mensualDesdeMes5: number | null
}

export function computeQuote({
  diag,
  olaStarter,
}: {
  diag: Diagnostico
  olaStarter: boolean
}): Quote {
  const diagValue = CATALOGO[diag].valor
  const diagLabel = CATALOGO[diag].label

  if (!olaStarter) {
    // Pago único del diagnóstico, sin suscripción ni compromiso asociado.
    return {
      diag,
      diagLabel,
      diagValue,
      diagBonificado: false,
      olaStarter: false,
      olaStarterBruto: 0,
      creditApplied: 0,
      totalPrograma: diagValue,
      montoPrimerPago: diagValue,
      cuotasRestantes: 0,
      mensualDesdeMes5: null,
    }
  }

  const olaStarterBruto = CATALOGO.planMensual * CATALOGO.olaStarterCuotas

  // Con Radar, el diagnóstico se bonifica: no entra a la cuenta ni como cobro ni
  // como crédito. Con Mapa, se cobra de verdad y se acredita contra el bruto.
  const diagBonificado = diag === "radar"
  const diagCobrable = diagBonificado ? 0 : diagValue
  const creditApplied = Math.min(diagCobrable, olaStarterBruto)
  const netoOlaStarter = olaStarterBruto - creditApplied
  const totalPrograma = diagCobrable + netoOlaStarter

  // Sólo el camino Radar + Ola Starter se paga en cuotas: el primer pago es una
  // cuota del plan y quedan las 3 restantes. En el camino Mapa, el excedente del
  // diagnóstico ya cubre Ola Starter entera, así que es un pago único.
  const enCuotas = diagBonificado
  const montoPrimerPago = enCuotas ? CATALOGO.planMensual : totalPrograma
  const cuotasRestantes = enCuotas ? CATALOGO.olaStarterCuotas - 1 : 0

  return {
    diag,
    diagLabel,
    diagValue,
    diagBonificado,
    olaStarter: true,
    olaStarterBruto,
    creditApplied,
    totalPrograma,
    montoPrimerPago,
    cuotasRestantes,
    mensualDesdeMes5: CATALOGO.planMensual,
  }
}

/**
 * Los montos distintos que puede tener un primer pago. Se deriva de
 * `computeQuote` en vez de escribirse a mano, para que agregar un escenario no
 * deje links de Mercado Pago sin configurar en silencio.
 */
export const montosPrimerPagoPosibles: number[] = Array.from(
  new Set(
    (["radar", "mapa"] as const).flatMap((diag) =>
      [false, true].map((olaStarter) => computeQuote({ diag, olaStarter }).montoPrimerPago),
    ),
  ),
).sort((a, b) => a - b)
```

- [ ] **Step 7: Correr los tests y el type check**

Run: `npm test && npx tsc --noEmit`
Expected: 6 tests PASS, tsc sin errores.

- [ ] **Step 8: Commit**

```bash
cd /Users/mok/Sites/innovas/site
git add vitest.config.ts package.json package-lock.json lib/precio-quote.ts lib/precio-quote.test.ts
git commit -m "feat: lógica de cotización de En Paralelo y runner de tests"
```

---

## Task 2: Configuración y copy de `/precio`

**Repo:** sitio

**Files:**
- Create: `content/precio.ts`

**Interfaces:**
- Consumes: `montosPrimerPagoPosibles`, `CATALOGO` de `lib/precio-quote.ts`.
- Produces:
  - `interface MercadoPagoLink { montoUsd: number; url: string; creadoEl: string }`
  - `interface DatosTransferencia { titular: string; cuit: string; cbu: string; alias: string }`
  - `interface FallbackRate { venta: number; fecha: string }`
  - `const pagoConfig` con `mercadoPagoLinks`, `transferencia`, `calendly`, `visitorEmailSenderVerified`, `fallbackRate`
  - `const precioCopy` (objeto de copy por sección)
  - `const contactoDirecto = "hola@innov.as"`

- [ ] **Step 1: Crear el archivo de configuración y copy**

Todos los datos operativos arrancan vacíos a propósito: la página los detecta como pendientes y no inventa nada. `fallbackRate` arranca en `null` porque un tipo de cambio inventado es peor que no mostrar pesos.

`content/precio.ts`:

```ts
import { CATALOGO, montosPrimerPagoPosibles } from "@/lib/precio-quote"

/**
 * Link de pago de Mercado Pago creado a mano en el panel, con monto fijo.
 * `url` y `creadoEl` vacíos = pendiente: la página no ofrece Mercado Pago para
 * ese monto en vez de mandar a pagar un importe equivocado.
 *
 * `creadoEl` importa porque el link tiene el monto EN PESOS congelado al momento
 * de crearse, y drifta contra el tipo de cambio que muestra la página.
 */
export interface MercadoPagoLink {
  montoUsd: number
  url: string
  /** Fecha ISO (YYYY-MM-DD) en que se creó el link en el panel de MP. */
  creadoEl: string
}

export interface DatosTransferencia {
  titular: string
  cuit: string
  cbu: string
  alias: string
}

/** Última cotización BNA conocida, para cuando el fetch en vivo falla. */
export interface FallbackRate {
  /** Divisa vendedora, en ARS por USD. */
  venta: number
  /** Fecha ISO (YYYY-MM-DD) del cierre al que corresponde. */
  fecha: string
}

/** Días después de los cuales un link de Mercado Pago se considera vencido. */
export const MP_LINK_MAX_DIAS = 30

export const pagoConfig = {
  /**
   * Un link por cada monto posible de primer pago. La lista se genera desde
   * `montosPrimerPagoPosibles` para que no queden montos sin entrada.
   * PENDIENTE: pegar las URLs del panel de Mercado Pago y su fecha de creación.
   */
  mercadoPagoLinks: montosPrimerPagoPosibles.map(
    (montoUsd): MercadoPagoLink => ({ montoUsd, url: "", creadoEl: "" }),
  ),

  /** PENDIENTE: datos de la cuenta que recibe las transferencias. */
  transferencia: {
    titular: "",
    cuit: "",
    cbu: "",
    alias: "",
  } as DatosTransferencia,

  /** PENDIENTE: dos eventos distintos de Calendly. */
  calendly: {
    unaReunion: "",
    cuatroReuniones: "",
  },

  /**
   * PENDIENTE: poner en true recién cuando hola@innov.as esté verificado como
   * sender signature en Postmark. No se puede detectar desde el sitio, es manual.
   */
  visitorEmailSenderVerified: false,

  /**
   * PENDIENTE: última cotización BNA conocida. Queda en null a propósito: si el
   * fetch en vivo falla y no hay fallback, la página no muestra pesos en vez de
   * mostrar un número inventado.
   */
  fallbackRate: null as FallbackRate | null,
}

export const contactoDirecto = "hola@innov.as"

export const precioCopy = {
  hero: {
    eyebrow: "En Paralelo",
    title: "Elegí cómo empezamos",
    subhead:
      "Todo en cuotas, sin letra chica escondida. El mismo proceso que usa el equipo comercial, en versión self-service.",
  },

  pasos: ["Tu plan", "Tu resumen", "Tus datos", "Cómo pagás"],

  cotizador: {
    bloqueDiagnostico: "1. Elegí tu diagnóstico",
    diagnosticos: {
      radar: {
        titulo: "Radar",
        precio: `USD ${CATALOGO.radar.valor.toLocaleString("en-US")} · 100% acreditable`,
        descripcion:
          "4 reuniones de 1 hora, coordinadas por vos. El diagnóstico estándar para arrancar.",
      },
      mapa: {
        titulo: "Mapa del Método",
        precio: `Desde USD ${CATALOGO.mapa.valor.toLocaleString("en-US")} · 100% acreditable`,
        descripcion:
          "Diagnóstico más profundo: business case y roadmap en olas, para operaciones grandes o con varios circuitos.",
      },
    },
    estadoRadarBonificado:
      "Al sumar Ola Starter, tu Radar queda bonificado: no pagás nada aparte por él.",
    estadoMapaAcreditado:
      "Pagás el Mapa del Método hoy, y se acredita 100% contra el valor de tu Ola Starter.",
    estadoSinOlaStarter: (diagLabel: string) =>
      `Pagás ${diagLabel === CATALOGO.radar.label ? "el Radar" : "el Mapa del Método"} hoy, sin compromiso de suscripción. Si más adelante sumás Ola Starter, este pago se acredita 100%.`,

    bloqueOlaStarter: "2. Sumá Ola Starter",
    bloqueOlaStarterOpcional: "(opcional)",
    olaStarter: {
      titulo: "Ola Starter",
      descripcion:
        "Tableros de control + tu propio sistema con IA, pagada en tus primeros 4 meses de suscripción. Si tu diagnóstico es el Radar, queda bonificado (sin cargo); si es el Mapa del Método, se acredita 100% acá.",
      incluye: `Incluye el plan ${CATALOGO.planNombre}, USD ${CATALOGO.planMensual.toLocaleString("en-US")}/mes. Si más adelante tu operación crece y necesitás más capacidad, hacés el upgrade desde adentro del producto.`,
      labelBruto: "Valor Ola Starter",
      labelRadarBonificado: "Tu Radar",
      valorRadarBonificado: "Bonificado, sin cargo",
      labelTotal: "Total del programa",
    },

    bloqueOlas: "3. Programa en olas",
    olas: {
      titulo: "Olas a medida",
      precio: "A cotizar",
      descripcion:
        "Para transformar más de un circuito de tu operación, más allá de Ola Starter. No tiene precio de catálogo acá: se arma y se cotiza con el equipo, precio cerrado y en cuotas.",
      cta: "Quiero que me coticen una ola →",
    },

    bloqueAgendar: "4. Tu diagnóstico, agendado",
    bloqueAgendarOpcional: "(opcional)",
    agendar: {
      titulo: "Agendar mi Radar",
      descripcion: "Después de pagar, coordinás el horario vos mismo.",
      estadoActivo:
        "Vas a poder elegir agendar 1 reunión ahora o las 4 del Radar completo, al confirmar.",
      estadoInactivo:
        "No pasa nada: podés agendarlo más adelante desde el mail de bienvenida, sin costo extra.",
    },

    hablarConEquipo: "Prefiero hablar con el equipo",
    continuar: "Ver resumen",
  },

  resumen: {
    title: "Tu resumen",
    subhead: "Así queda armada tu suscripción. En el próximo paso pedimos tus datos.",
    tuPlan: "Tu plan",
    labelOlaStarter: "Ola Starter (valor)",
    labelSuscripcion: "Suscripción",
    labelHoy: "Primer pago",
    labelPagoUnico: "Pago único",
    labelPrimeraCuota: (cuotasRestantes: number, monto: string) =>
      `Primera de ${cuotasRestantes + 1} cuotas de ${monto}`,
    labelDespues: "Después",
    labelDesdeMes5: "Desde el mes 5",
    radarBonificado: "Bonificado, sin cargo (sumaste Ola Starter)",
    disclaimerConOlaStarter:
      "Precio cerrado para Ola Starter y la suscripción elegida, siempre en cuotas. Las cuotas restantes y el abono mensual los coordina el equipo con vos: todavía no hay débito automático.",
    disclaimerPagoUnico: (diagLabel: string) =>
      `Pago único de tu ${diagLabel}. Sin suscripción ni renovación automática. Si más adelante sumás Ola Starter o una ola a medida, este pago se acredita 100%.`,
    atras: "Atrás",
    continuar: "Continuar",
  },

  datos: {
    title: "Tus datos",
    subhead: "Para armar tu suscripción y coordinar tu diagnóstico.",
    bloqueContacto: "Contacto",
    bloqueEmpresa: "Empresa",
    labels: {
      nombre: "Nombre",
      apellido: "Apellido",
      email: "Email",
      celular: "Celular",
      web: "Página web de la empresa",
      webOpcional: "(opcional)",
      cuit: "CUIT de la empresa",
      empresa: "Nombre de la empresa",
    },
    placeholders: {
      nombre: "Tu nombre",
      apellido: "Tu apellido",
      email: "vos@tuempresa.com",
      celular: "+54 9 11 1234 5678",
      web: "www.tuempresa.com",
      cuit: "30-12345678-9",
      empresa: "Nombre de tu empresa",
    },
    hints: {
      web: "Nos ayuda a entender tu operación antes del diagnóstico.",
      cuit: "El CUIT lo usamos para armar tu contrato de suscripción.",
      empresa: "Escribilo vos: no verificamos la razón social automáticamente.",
    },
    errores: {
      nombre: "Completá tu nombre.",
      apellido: "Completá tu apellido.",
      email: "Ingresá un email válido.",
      celular: "Completá tu celular.",
      cuit: "Ingresá un CUIT válido (11 dígitos).",
      empresa: "Completá el nombre de la empresa.",
    },
    atras: "Atrás",
    continuar: "Continuar",
  },

  pago: {
    title: "Cómo pagás",
    subhead: (monto: string) => `Se cobra ${monto} para arrancar. Elegí el medio que te quede mejor.`,
    mercadoPago: {
      titulo: "Mercado Pago",
      descripcion:
        "Se abre el checkout de Mercado Pago en una pestaña nueva. El monto final en pesos te lo confirma Mercado Pago ahí.",
      cta: "Pagar con Mercado Pago",
      pendiente: "Pendiente de configurar",
      vencido:
        "Este link tiene más de 30 días: hay que regenerarlo en el panel de Mercado Pago.",
    },
    transferencia: {
      titulo: "Transferencia bancaria",
      descripcion:
        "Transferí el equivalente en pesos y mandanos el comprobante por mail. Confirmamos dentro del día hábil.",
      labels: { titular: "Titular", cuit: "CUIT", cbu: "CBU", alias: "Alias" },
      pendiente: "Pendiente",
      copiar: "Copiar",
      copiado: "Copiado",
    },
    terminos: {
      prefijo: "Acepto los ",
      terminos: "Términos y Condiciones",
      union: " y la ",
      privacidad: "Política de Privacidad",
      sufijo: " de INNOV.AS.",
      error: "Tenés que aceptar los términos para continuar.",
    },
    atras: "Atrás",
    confirmar: "Confirmar y recibir instrucciones",
    enviando: "Enviando...",
    errorEnvio: `No pudimos registrar tu solicitud. Probá de nuevo o escribinos a ${contactoDirecto}.`,
  },

  confirmacion: {
    title: "Listo",
    mailEnviado: (email: string) =>
      `Bienvenido a En Paralelo. Te mandamos un mail a ${email} con el resumen de tu cotización y las instrucciones de pago.`,
    mailNoEnviado: `Registramos tu solicitud, pero no pudimos mandarte el mail. Las instrucciones de pago están acá abajo — si necesitás una mano, escribinos a ${contactoDirecto}.`,
    mailSimulado:
      "Esto es una maqueta: no se registró nada ni se envió ningún mail. En la versión final te llega un mail con el resumen y las instrucciones de pago.",
    agendar: {
      intro:
        "Antes de tu primera reunión te vamos a mandar un formulario corto para entender de qué se trata tu empresa (por eso nos sirvió tu web). Elegí cómo agendar tu Radar:",
      una: "Agendar 1 reunión",
      cuatro: "Agendar las 4 reuniones",
      pendiente: "Agenda pendiente de configurar",
    },
    equipoContacta: (diagLabel: string) =>
      `El equipo se va a contactar para coordinar tu ${diagLabel}.`,
  },

  moneda: {
    referencia: (fecha: string) => `referencia, al cambio BNA del ${fecha}`,
    referenciaDesactualizada: (fecha: string) =>
      `referencia, al cambio BNA del ${fecha} — puede estar desactualizado`,
    sinReferencia: "referencia en pesos no disponible",
  },

  maqueta: {
    banner: "MAQUETA — no se procesa ningún pago",
    panelTitulo: "Pendientes para publicar",
    panelIntro:
      "Cada item que completes desbloquea ese pedazo del flujo en el próximo reload.",
    listo: "Listo",
    pendiente: "Pendiente",
  },
}
```

- [ ] **Step 2: Verificar que compila**

Run: `npx tsc --noEmit`
Expected: sin errores.

- [ ] **Step 3: Commit**

```bash
cd /Users/mok/Sites/innovas/site
git add content/precio.ts
git commit -m "feat: copy y configuración de pago de /precio, con pendientes explícitos"
```

---

## Task 3: Readiness — qué está listo y qué falta

**Repo:** sitio

**Files:**
- Create: `lib/precio-readiness.ts`
- Test: `lib/precio-readiness.test.ts`

**Interfaces:**
- Consumes: `pagoConfig`, `MercadoPagoLink`, `MP_LINK_MAX_DIAS` de `content/precio.ts`; `montosPrimerPagoPosibles` de `lib/precio-quote.ts`.
- Produces:
  - `interface Readiness { mercadoPago: boolean; transferencia: boolean; calendly: boolean; backend: boolean; mailVisitante: boolean; launchReady: boolean }`
  - `interface ReadinessEnv { supabaseUrl?: string; formSecret?: string }`
  - `function computeReadiness(config: typeof pagoConfig, env: ReadinessEnv): Readiness`
  - `function mpLinkParaMonto(config: typeof pagoConfig, montoUsd: number): MercadoPagoLink | null`
  - `function mpLinkVencido(link: MercadoPagoLink, hoy: Date): boolean`

- [ ] **Step 1: Escribir los tests que fallan**

`lib/precio-readiness.test.ts`:

```ts
import { describe, expect, it } from "vitest"
import { computeReadiness, mpLinkParaMonto, mpLinkVencido } from "./precio-readiness"
import type { pagoConfig as PagoConfig } from "@/content/precio"

type Config = typeof PagoConfig

function configVacia(): Config {
  return {
    mercadoPagoLinks: [
      { montoUsd: 1500, url: "", creadoEl: "" },
      { montoUsd: 7500, url: "", creadoEl: "" },
    ],
    transferencia: { titular: "", cuit: "", cbu: "", alias: "" },
    calendly: { unaReunion: "", cuatroReuniones: "" },
    visitorEmailSenderVerified: false,
    fallbackRate: null,
  }
}

function configCompleta(): Config {
  return {
    mercadoPagoLinks: [
      { montoUsd: 1500, url: "https://mpago.la/aaa", creadoEl: "2026-08-20" },
      { montoUsd: 7500, url: "https://mpago.la/bbb", creadoEl: "2026-08-20" },
    ],
    transferencia: {
      titular: "INNOV.AS SRL",
      cuit: "30-71234567-9",
      cbu: "0170099220000012345678",
      alias: "innovas.pagos",
    },
    calendly: {
      unaReunion: "https://calendly.com/innovas/radar-1",
      cuatroReuniones: "https://calendly.com/innovas/radar-4",
    },
    visitorEmailSenderVerified: true,
    fallbackRate: { venta: 1465, fecha: "2026-08-25" },
  }
}

const envCompleto = { supabaseUrl: "https://x.supabase.co", formSecret: "s3cr3t" }

describe("computeReadiness", () => {
  it("con la config vacía, nada está listo", () => {
    expect(computeReadiness(configVacia(), {})).toEqual({
      mercadoPago: false,
      transferencia: false,
      calendly: false,
      backend: false,
      mailVisitante: false,
      launchReady: false,
    })
  })

  it("con todo completo, launchReady es true", () => {
    expect(computeReadiness(configCompleta(), envCompleto)).toEqual({
      mercadoPago: true,
      transferencia: true,
      calendly: true,
      backend: true,
      mailVisitante: true,
      launchReady: true,
    })
  })

  it("mercadoPago exige un link para TODOS los montos posibles", () => {
    const config = configCompleta()
    config.mercadoPagoLinks[1].url = ""
    const r = computeReadiness(config, envCompleto)
    expect(r.mercadoPago).toBe(false)
    expect(r.launchReady).toBe(false)
  })

  it("transferencia exige los cuatro datos", () => {
    const config = configCompleta()
    config.transferencia.alias = ""
    expect(computeReadiness(config, envCompleto).transferencia).toBe(false)
  })

  it("calendly exige dos URLs distintas: el mismo link dos veces no cuenta", () => {
    const config = configCompleta()
    config.calendly.cuatroReuniones = config.calendly.unaReunion
    expect(computeReadiness(config, envCompleto).calendly).toBe(false)
  })

  it("backend exige URL y secret en el entorno", () => {
    const config = configCompleta()
    expect(computeReadiness(config, { supabaseUrl: "https://x.supabase.co" }).backend).toBe(false)
    expect(computeReadiness(config, { formSecret: "s3cr3t" }).backend).toBe(false)
  })

  it("una config parcial marca listo sólo lo que está", () => {
    const config = configVacia()
    config.transferencia = configCompleta().transferencia
    const r = computeReadiness(config, {})
    expect(r.transferencia).toBe(true)
    expect(r.mercadoPago).toBe(false)
    expect(r.launchReady).toBe(false)
  })
})

describe("mpLinkParaMonto", () => {
  it("devuelve el link del monto pedido cuando tiene URL", () => {
    const link = mpLinkParaMonto(configCompleta(), 7500)
    expect(link?.url).toBe("https://mpago.la/bbb")
  })

  it("devuelve null cuando el link existe pero no tiene URL", () => {
    expect(mpLinkParaMonto(configVacia(), 1500)).toBeNull()
  })

  it("devuelve null para un monto que no está en la lista", () => {
    expect(mpLinkParaMonto(configCompleta(), 3000)).toBeNull()
  })
})

describe("mpLinkVencido", () => {
  const link = { montoUsd: 1500, url: "https://mpago.la/aaa", creadoEl: "2026-08-01" }

  it("no está vencido dentro de los 30 días", () => {
    expect(mpLinkVencido(link, new Date("2026-08-20"))).toBe(false)
  })

  it("está vencido pasados los 30 días", () => {
    expect(mpLinkVencido(link, new Date("2026-09-15"))).toBe(true)
  })

  it("sin fecha de creación no se puede saber, así que no se marca vencido", () => {
    expect(mpLinkVencido({ ...link, creadoEl: "" }, new Date("2026-09-15"))).toBe(false)
  })
})
```

- [ ] **Step 2: Correr los tests para verificar que fallan**

Run: `npm test lib/precio-readiness.test.ts`
Expected: FAIL — no se puede resolver `./precio-readiness`.

- [ ] **Step 3: Implementar**

`lib/precio-readiness.ts`:

```ts
import { MP_LINK_MAX_DIAS, pagoConfig, type MercadoPagoLink } from "@/content/precio"
import { montosPrimerPagoPosibles } from "@/lib/precio-quote"

// `typeof pagoConfig` necesita el import de valor (no `import type`): así se
// tipa contra la forma real de la config sin repetirla a mano acá.
type PagoConfig = typeof pagoConfig

/**
 * Estado de las cinco capacidades de las que depende `/precio`. Se deriva de la
 * configuración y del entorno: no hay ningún flag manual de "modo maqueta" en
 * el código, para que no queden ramas temporales que después haya que borrar.
 */
export interface Readiness {
  /** Hay link de Mercado Pago para TODOS los montos posibles de primer pago. */
  mercadoPago: boolean
  transferencia: boolean
  calendly: boolean
  /** Hay URL de Supabase y secret del formulario en el entorno. */
  backend: boolean
  /**
   * hola@innov.as está verificado en Postmark. Es un flag manual porque el sitio
   * no tiene forma de consultarlo.
   */
  mailVisitante: boolean
  launchReady: boolean
}

export interface ReadinessEnv {
  supabaseUrl?: string
  formSecret?: string
}

function lleno(value: string): boolean {
  return value.trim().length > 0
}

export function mpLinkParaMonto(
  config: PagoConfig,
  montoUsd: number,
): MercadoPagoLink | null {
  const link = config.mercadoPagoLinks.find((l) => l.montoUsd === montoUsd)
  if (!link || !lleno(link.url)) return null
  return link
}

/**
 * Un link de Mercado Pago tiene el monto en pesos congelado al crearse, así que
 * envejece. Sin `creadoEl` no se puede saber: se devuelve false en vez de asumir
 * lo peor y esconder el medio de pago.
 */
export function mpLinkVencido(link: MercadoPagoLink, hoy: Date): boolean {
  if (!lleno(link.creadoEl)) return false
  const creado = new Date(link.creadoEl)
  if (Number.isNaN(creado.getTime())) return false
  const dias = (hoy.getTime() - creado.getTime()) / 86_400_000
  return dias > MP_LINK_MAX_DIAS
}

export function computeReadiness(config: PagoConfig, env: ReadinessEnv): Readiness {
  const mercadoPago = montosPrimerPagoPosibles.every(
    (monto) => mpLinkParaMonto(config, monto) !== null,
  )

  const t = config.transferencia
  const transferencia = lleno(t.titular) && lleno(t.cuit) && lleno(t.cbu) && lleno(t.alias)

  // Dos URLs distintas: apuntar las dos al mismo evento es el bug que tenía la
  // maqueta original, y desde afuera se ve como si funcionara.
  const calendly =
    lleno(config.calendly.unaReunion) &&
    lleno(config.calendly.cuatroReuniones) &&
    config.calendly.unaReunion !== config.calendly.cuatroReuniones

  const backend = lleno(env.supabaseUrl ?? "") && lleno(env.formSecret ?? "")
  const mailVisitante = config.visitorEmailSenderVerified

  return {
    mercadoPago,
    transferencia,
    calendly,
    backend,
    mailVisitante,
    launchReady: mercadoPago && transferencia && calendly && backend && mailVisitante,
  }
}
```

- [ ] **Step 4: Correr los tests y el type check**

Run: `npm test && npx tsc --noEmit`
Expected: todos PASS, tsc sin errores.

- [ ] **Step 5: Commit**

```bash
cd /Users/mok/Sites/innovas/site
git add lib/precio-readiness.ts lib/precio-readiness.test.ts
git commit -m "feat: readiness de /precio derivado de la configuración"
```

---

## Task 4: Tipo de cambio BNA

**Repo:** sitio

**Files:**
- Create: `lib/bna-rate.ts`
- Test: `lib/bna-rate.test.ts`

**Interfaces:**
- Consumes: `FallbackRate` de `content/precio.ts`.
- Produces:
  - `interface BnaRate { venta: number; fecha: string; stale: boolean }`
  - `const DOLARAPI_URL: string`
  - `function fetchBnaRate(fallback: FallbackRate | null, fetchImpl?: typeof fetch): Promise<BnaRate | null>`
  - `function usdToArs(usd: number, rate: BnaRate | null): number | null`

- [ ] **Step 1: Escribir los tests que fallan**

`lib/bna-rate.test.ts`:

```ts
import { describe, expect, it, vi } from "vitest"
import { fetchBnaRate, usdToArs } from "./bna-rate"

const fallback = { venta: 1400, fecha: "2026-08-01" }

function okResponse(body: unknown) {
  return { ok: true, json: async () => body } as Response
}

describe("fetchBnaRate", () => {
  it("usa la cotización en vivo cuando la respuesta es válida", async () => {
    const fetchImpl = vi.fn(async () =>
      okResponse({ venta: 1465.5, fechaActualizacion: "2026-08-25T21:00:00.000Z" }),
    ) as unknown as typeof fetch

    const rate = await fetchBnaRate(fallback, fetchImpl)

    expect(rate).toEqual({ venta: 1465.5, fecha: "2026-08-25", stale: false })
  })

  it("cae al fallback si la red falla", async () => {
    const fetchImpl = vi.fn(async () => {
      throw new Error("network down")
    }) as unknown as typeof fetch

    expect(await fetchBnaRate(fallback, fetchImpl)).toEqual({
      venta: 1400,
      fecha: "2026-08-01",
      stale: true,
    })
  })

  it("cae al fallback si la respuesta no es 2xx", async () => {
    const fetchImpl = vi.fn(async () => ({ ok: false }) as Response) as unknown as typeof fetch
    expect((await fetchBnaRate(fallback, fetchImpl))?.stale).toBe(true)
  })

  it("cae al fallback si el JSON tiene una forma inesperada", async () => {
    const fetchImpl = vi.fn(async () =>
      okResponse({ compra: 1400 }),
    ) as unknown as typeof fetch
    expect((await fetchBnaRate(fallback, fetchImpl))?.stale).toBe(true)
  })

  it("cae al fallback si venta no es un número positivo", async () => {
    const fetchImpl = vi.fn(async () =>
      okResponse({ venta: 0, fechaActualizacion: "2026-08-25T21:00:00.000Z" }),
    ) as unknown as typeof fetch
    expect((await fetchBnaRate(fallback, fetchImpl))?.stale).toBe(true)
  })

  it("sin fallback y con la red caída devuelve null: no se inventa un número", async () => {
    const fetchImpl = vi.fn(async () => {
      throw new Error("network down")
    }) as unknown as typeof fetch
    expect(await fetchBnaRate(null, fetchImpl)).toBeNull()
  })
})

describe("usdToArs", () => {
  it("convierte y redondea al peso", () => {
    expect(usdToArs(1500, { venta: 1465.5, fecha: "2026-08-25", stale: false })).toBe(2198250)
  })

  it("sin cotización devuelve null", () => {
    expect(usdToArs(1500, null)).toBeNull()
  })
})
```

- [ ] **Step 2: Correr los tests para verificar que fallan**

Run: `npm test lib/bna-rate.test.ts`
Expected: FAIL — no se puede resolver `./bna-rate`.

- [ ] **Step 3: Implementar**

`lib/bna-rate.ts`:

```ts
import type { FallbackRate } from "@/content/precio"

/**
 * El BNA no publica una API oficial. dolarapi expone la cotización oficial, cuya
 * fuente es el Banco Nación, sin key y gratis. Se toma `venta` (divisa vendedora)
 * porque es la que aplica a alguien que compra dólares para pagar.
 */
export const DOLARAPI_URL = "https://dolarapi.com/v1/dolares/oficial"

export interface BnaRate {
  /** ARS por USD, divisa vendedora. */
  venta: number
  /** Fecha ISO (YYYY-MM-DD) de la cotización. */
  fecha: string
  /** true = viene del fallback configurado, no de la cotización en vivo. */
  stale: boolean
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value)
}

function fallbackToRate(fallback: FallbackRate | null): BnaRate | null {
  if (!fallback) return null
  return { venta: fallback.venta, fecha: fallback.fecha, stale: true }
}

/**
 * Trae la cotización oficial. Ante cualquier problema —red, status, forma del
 * JSON, valor no positivo— cae al fallback configurado, y si no hay fallback
 * devuelve null. Nunca devuelve un número inventado.
 *
 * `fetchImpl` existe para poder testear sin red; en producción se usa el fetch
 * de Next.js, cacheado 24 h desde el server component que la llama.
 */
export async function fetchBnaRate(
  fallback: FallbackRate | null,
  fetchImpl: typeof fetch = fetch,
): Promise<BnaRate | null> {
  try {
    const response = await fetchImpl(DOLARAPI_URL, {
      next: { revalidate: 86_400 },
    } as RequestInit)

    if (!response.ok) return fallbackToRate(fallback)

    const json: unknown = await response.json()
    if (typeof json !== "object" || json === null) return fallbackToRate(fallback)

    const { venta, fechaActualizacion } = json as {
      venta?: unknown
      fechaActualizacion?: unknown
    }
    if (!isFiniteNumber(venta) || venta <= 0) return fallbackToRate(fallback)

    const fecha =
      typeof fechaActualizacion === "string" && fechaActualizacion.length >= 10
        ? fechaActualizacion.slice(0, 10)
        : ""
    if (!fecha) return fallbackToRate(fallback)

    return { venta, fecha, stale: false }
  } catch {
    return fallbackToRate(fallback)
  }
}

/** Convierte un monto en USD a pesos redondeados, o null si no hay cotización. */
export function usdToArs(usd: number, rate: BnaRate | null): number | null {
  if (!rate) return null
  return Math.round(usd * rate.venta)
}
```

- [ ] **Step 4: Correr los tests y el type check**

Run: `npm test && npx tsc --noEmit`
Expected: todos PASS, tsc sin errores.

- [ ] **Step 5: Commit**

```bash
cd /Users/mok/Sites/innovas/site
git add lib/bna-rate.ts lib/bna-rate.test.ts
git commit -m "feat: cotización BNA con validación y fallback explícito"
```

---

## Task 5: Formato de montos, banner de maqueta y shell de la página

**Repo:** sitio

**Files:**
- Create: `lib/precio-format.ts`
- Test: `lib/precio-format.test.ts`
- Create: `components/precio/precio-money.tsx`
- Create: `components/precio/mockup-banner.tsx`
- Create: `components/precio/wizard.tsx`
- Create: `app/precio/page.tsx`
- Modify: `content/precio.ts` (usar `fmtUsd` en vez de `toLocaleString("en-US")`)
- Modify: `content/seo.ts`

**Interfaces:**
- Consumes: `computeQuote`, `Diagnostico`, `CATALOGO` (Task 1); `pagoConfig`, `precioCopy` (Task 2); `computeReadiness`, `Readiness` (Task 3); `fetchBnaRate`, `usdToArs`, `BnaRate` (Task 4).
- Produces:
  - `function fmtUsd(monto: number): string` → `"USD 1.500"`
  - `function fmtArs(monto: number): string` → `"ARS 2.198.250"`
  - `function fmtFechaCorta(iso: string): string` → `"25/08"`
  - `<PrecioMoney usd={number} rate={BnaRate | null} />`
  - `<MockupBanner />`
  - `<PrecioWizard readiness={Readiness} rate={BnaRate | null} mockup={boolean} />`
  - `interface WizardState { diag: Diagnostico; olaStarter: boolean; radarOpt: boolean }`

- [ ] **Step 1: Escribir los tests de formato**

Los montos se muestran con formato argentino (punto de miles), no el `en-US` que traía la maqueta original.

`lib/precio-format.test.ts`:

```ts
import { describe, expect, it } from "vitest"
import { fmtArs, fmtFechaCorta, fmtUsd } from "./precio-format"

describe("fmtUsd", () => {
  it("usa punto como separador de miles", () => {
    expect(fmtUsd(1500)).toBe("USD 1.500")
    expect(fmtUsd(7500)).toBe("USD 7.500")
  })

  it("redondea al dólar", () => {
    expect(fmtUsd(1500.6)).toBe("USD 1.501")
  })
})

describe("fmtArs", () => {
  it("usa punto como separador de miles", () => {
    expect(fmtArs(2198250)).toBe("ARS 2.198.250")
  })
})

describe("fmtFechaCorta", () => {
  it("convierte una fecha ISO a DD/MM", () => {
    expect(fmtFechaCorta("2026-08-25")).toBe("25/08")
  })

  it("no se corre de día por zona horaria", () => {
    // Parseado como Date, "2026-01-01" es medianoche UTC y en Argentina cae el
    // 31/12. Por eso se parsea el string a mano.
    expect(fmtFechaCorta("2026-01-01")).toBe("01/01")
  })

  it("devuelve cadena vacía si la fecha no es válida", () => {
    expect(fmtFechaCorta("")).toBe("")
    expect(fmtFechaCorta("mañana")).toBe("")
  })
})
```

- [ ] **Step 2: Correr los tests para verificar que fallan**

Run: `npm test lib/precio-format.test.ts`
Expected: FAIL — no se puede resolver `./precio-format`.

- [ ] **Step 3: Implementar el formato**

`lib/precio-format.ts`:

```ts
const NUMERO_AR = new Intl.NumberFormat("es-AR", { maximumFractionDigits: 0 })

export function fmtUsd(monto: number): string {
  return `USD ${NUMERO_AR.format(Math.round(monto))}`
}

export function fmtArs(monto: number): string {
  return `ARS ${NUMERO_AR.format(Math.round(monto))}`
}

/**
 * "2026-08-25" → "25/08". Se parsea el string a mano en vez de con `new Date()`
 * porque una fecha ISO sin hora se interpreta como medianoche UTC, que en
 * Argentina es el día anterior.
 */
export function fmtFechaCorta(iso: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso)
  if (!match) return ""
  return `${match[3]}/${match[2]}`
}
```

- [ ] **Step 4: Correr los tests**

Run: `npm test lib/precio-format.test.ts`
Expected: PASS.

- [ ] **Step 5: Unificar el formato en el copy**

En `content/precio.ts`, agregar el import y reemplazar los tres `toLocaleString("en-US")` por `fmtUsd`:

```ts
import { fmtUsd } from "@/lib/precio-format"
```

- En `cotizador.diagnosticos.radar.precio`: `` `${fmtUsd(CATALOGO.radar.valor)} · 100% acreditable` ``
- En `cotizador.diagnosticos.mapa.precio`: `` `Desde ${fmtUsd(CATALOGO.mapa.valor)} · 100% acreditable` ``
- En `cotizador.olaStarter.incluye`: `` `Incluye el plan ${CATALOGO.planNombre}, ${fmtUsd(CATALOGO.planMensual)}/mes. Si más adelante tu operación crece y necesitás más capacidad, hacés el upgrade desde adentro del producto.` ``

- [ ] **Step 6: Crear el componente de monto**

Muestra el USD (que es el precio contractual) y, abajo, la referencia en pesos siempre rotulada.

`components/precio/precio-money.tsx`:

```tsx
import type { BnaRate } from "@/lib/bna-rate"
import { usdToArs } from "@/lib/bna-rate"
import { fmtArs, fmtFechaCorta, fmtUsd } from "@/lib/precio-format"
import { precioCopy } from "@/content/precio"
import { cn } from "@/lib/utils"

/**
 * El USD es el precio contractual. El ARS es siempre referencia y se rotula como
 * tal, incluida la fecha del cambio BNA, para que nadie lo lea como precio final.
 */
export function PrecioMoney({
  usd,
  rate,
  className,
}: {
  usd: number
  rate: BnaRate | null
  className?: string
}) {
  const ars = usdToArs(usd, rate)

  return (
    <span className={cn("inline-flex flex-col", className)}>
      <span className="font-mono font-bold text-teal">{fmtUsd(usd)}</span>
      <span className="font-mono text-xs text-ink-40">
        {ars === null || rate === null
          ? precioCopy.moneda.sinReferencia
          : `${fmtArs(ars)} — ${
              rate.stale
                ? precioCopy.moneda.referenciaDesactualizada(fmtFechaCorta(rate.fecha))
                : precioCopy.moneda.referencia(fmtFechaCorta(rate.fecha))
            }`}
      </span>
    </span>
  )
}
```

- [ ] **Step 7: Crear el banner de maqueta**

`components/precio/mockup-banner.tsx`:

```tsx
import { precioCopy } from "@/content/precio"

/**
 * Imposible de confundir con la página real. Se renderiza sólo cuando el modo
 * maqueta está activo, y el modo maqueta nunca se activa solo en producción.
 */
export function MockupBanner() {
  return (
    <div className="sticky top-0 z-60 border-b border-ink bg-plum px-6 py-2 text-center">
      <p className="font-mono text-xs font-bold uppercase tracking-wider text-on-brand">
        {precioCopy.maqueta.banner}
      </p>
    </div>
  )
}
```

- [ ] **Step 8: Crear el shell del wizard**

Por ahora sólo maneja estado y navegación, y renderiza un placeholder por paso. Los pasos reales llegan en las tasks 6 a 11.

`components/precio/wizard.tsx`:

```tsx
"use client"

import { useState } from "react"
import type { Diagnostico } from "@/lib/precio-quote"
import { computeQuote } from "@/lib/precio-quote"
import type { BnaRate } from "@/lib/bna-rate"
import type { Readiness } from "@/lib/precio-readiness"
import { precioCopy } from "@/content/precio"
import { cn } from "@/lib/utils"

export interface WizardState {
  diag: Diagnostico
  olaStarter: boolean
  /** Si quiere agendar el Radar al confirmar. Sólo aplica al Radar. */
  radarOpt: boolean
}

const TOTAL_PASOS = 4

export function PrecioWizard({
  readiness,
  rate,
  mockup,
}: {
  readiness: Readiness
  rate: BnaRate | null
  mockup: boolean
}) {
  const [paso, setPaso] = useState(1)
  const [state, setState] = useState<WizardState>({
    diag: "radar",
    olaStarter: false,
    radarOpt: true,
  })

  const quote = computeQuote({ diag: state.diag, olaStarter: state.olaStarter })

  const irA = (n: number) => {
    setPaso(n)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="mx-auto max-w-2xl px-6 pb-24">
      <ol className="mb-9 flex justify-center gap-2" aria-label="Progreso">
        {Array.from({ length: TOTAL_PASOS }, (_, i) => i + 1).map((n) => (
          <li
            key={n}
            aria-current={n === paso ? "step" : undefined}
            className={cn(
              "h-1 w-6 rounded-sm",
              n === paso ? "bg-teal" : n < paso ? "bg-teal/60" : "bg-line",
            )}
          >
            <span className="sr-only">{precioCopy.pasos[n - 1]}</span>
          </li>
        ))}
      </ol>

      {/* Los pasos reales se agregan en las tasks 6 a 11. */}
      <p className="text-center font-mono text-sm text-ink-40">
        Paso {paso}: {precioCopy.pasos[paso - 1]}
      </p>
      <p className="mt-2 text-center font-mono text-xs text-ink-40">
        Total del programa: {quote.totalPrograma} · maqueta: {String(mockup)} · MP listo:{" "}
        {String(readiness.mercadoPago)} · cambio: {rate ? rate.fecha : "sin dato"}
      </p>
      <div className="mt-6 flex justify-center gap-3">
        <button
          type="button"
          onClick={() => irA(Math.max(1, paso - 1))}
          className="rounded border border-line px-4 py-2 text-sm text-ink-70"
        >
          {precioCopy.resumen.atras}
        </button>
        <button
          type="button"
          onClick={() => irA(Math.min(TOTAL_PASOS, paso + 1))}
          className="rounded bg-teal px-4 py-2 text-sm font-bold text-on-brand"
        >
          {precioCopy.resumen.continuar}
        </button>
      </div>
    </div>
  )
}
```

- [ ] **Step 9: Agregar la entrada de SEO**

En `content/seo.ts`, dentro del objeto `seo`, agregar:

```ts
  "/precio": {
    title: "Precios de En Paralelo — cotizá y arrancá online — INNOV.AS",
    description:
      "Cotizá tu diagnóstico y tu Ola Starter en dos minutos, sin reunión previa. Precio cerrado en dólares, pago por Mercado Pago o transferencia.",
  },
```

- [ ] **Step 10: Crear la página**

`app/precio/page.tsx`:

```tsx
import type { Metadata } from "next"
import { fetchBnaRate } from "@/lib/bna-rate"
import { computeReadiness } from "@/lib/precio-readiness"
import { buildMetadata } from "@/lib/metadata"
import { seo } from "@/content/seo"
import { pagoConfig, precioCopy } from "@/content/precio"
import { MockupBanner } from "@/components/precio/mockup-banner"
import { PrecioWizard } from "@/components/precio/wizard"

const readiness = computeReadiness(pagoConfig, {
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
  formSecret: process.env.NEXT_PUBLIC_PRECIO_FORM_SECRET,
})

// Mientras falte cualquier pieza, la página existe pero no se indexa.
export const metadata: Metadata = buildMetadata("/precio", seo["/precio"], {
  noindex: !readiness.launchReady,
})

/**
 * Modo maqueta:
 *  - `?mockup=1` lo fuerza en cualquier entorno, incluido producción, para poder
 *    recorrer el flujo en un deploy de preview.
 *  - `?mockup=0` lo apaga.
 *  - Sin parámetro: activo sólo fuera de producción y mientras falte configurar
 *    algo. Nunca se activa solo en producción.
 */
function resolveMockup(param: string | string[] | undefined): boolean {
  if (param === "1") return true
  if (param === "0") return false
  return process.env.NODE_ENV !== "production" && !readiness.launchReady
}

export default async function PrecioPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const params = await searchParams
  const mockup = resolveMockup(params.mockup)

  const rate = await fetchBnaRate(pagoConfig.fallbackRate)

  return (
    <>
      {mockup && <MockupBanner />}
      <main>
        <section className="border-b border-line bg-paper">
          <div className="mx-auto max-w-3xl px-6 py-20 text-center">
            <p className="font-mono text-xs uppercase tracking-wider text-teal">
              {precioCopy.hero.eyebrow}
            </p>
            <h1 className="mt-6 font-display text-4xl font-bold text-ink md:text-5xl">
              {precioCopy.hero.title}
            </h1>
            <p className="mt-4 text-lg text-ink-70">{precioCopy.hero.subhead}</p>
          </div>
        </section>

        <section className="pt-16">
          <PrecioWizard readiness={readiness} rate={rate} mockup={mockup} />
        </section>
      </main>
    </>
  )
}
```

- [ ] **Step 11: Verificar en el browser**

Run: `npm run dev`
Abrir `http://localhost:3300/precio`.
Expected: banner de maqueta arriba (porque falta todo por configurar), hero, 4 puntos de progreso, y los botones de atrás/continuar moviendo el paso de 1 a 4.

- [ ] **Step 12: Type check y commit**

```bash
cd /Users/mok/Sites/innovas/site
npm test && npx tsc --noEmit
git add lib/precio-format.ts lib/precio-format.test.ts components/precio content/precio.ts content/seo.ts app/precio
git commit -m "feat: shell de /precio con modo maqueta y formato de montos"
```

---

## Task 6: Paso 1 — el cotizador

**Repo:** sitio

**Files:**
- Create: `components/precio/step-cotizador.tsx`
- Modify: `components/precio/wizard.tsx` (renderizar el paso 1 real)

**Interfaces:**
- Consumes: `WizardState` (Task 5), `Quote`, `CATALOGO`, `Diagnostico` (Task 1), `PrecioMoney` (Task 5), `precioCopy` (Task 2).
- Produces: `<StepCotizador state rate quote onChange onContinuar />` con
  `onChange: (patch: Partial<WizardState>) => void` y `onContinuar: () => void`.

- [ ] **Step 1: Crear el componente**

Tres bloques de elección más uno informativo, igual que la maqueta HTML. El bloque 4 (agendar) sólo aparece con Radar: el Mapa del Método lo coordina el equipo.

`components/precio/step-cotizador.tsx`:

```tsx
"use client"

import type { BnaRate } from "@/lib/bna-rate"
import type { Diagnostico, Quote } from "@/lib/precio-quote"
import { CATALOGO } from "@/lib/precio-quote"
import { precioCopy, contactoDirecto } from "@/content/precio"
import { PrecioMoney } from "./precio-money"
import type { WizardState } from "./wizard"
import { cn } from "@/lib/utils"

const DIAGS: Diagnostico[] = ["radar", "mapa"]

export function StepCotizador({
  state,
  quote,
  rate,
  onChange,
  onContinuar,
}: {
  state: WizardState
  quote: Quote
  rate: BnaRate | null
  onChange: (patch: Partial<WizardState>) => void
  onContinuar: () => void
}) {
  const copy = precioCopy.cotizador

  const estadoDiag = !state.olaStarter
    ? copy.estadoSinOlaStarter(quote.diagLabel)
    : quote.diagBonificado
      ? copy.estadoRadarBonificado
      : copy.estadoMapaAcreditado

  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-wider text-ink-40">
        {copy.bloqueDiagnostico}
      </p>
      <div className="mt-2 grid gap-3 sm:grid-cols-2">
        {DIAGS.map((diag) => {
          const d = copy.diagnosticos[diag]
          const selected = state.diag === diag
          return (
            <button
              key={diag}
              type="button"
              aria-pressed={selected}
              onClick={() => onChange({ diag })}
              className={cn(
                "rounded-md border bg-paper-soft p-4 text-left transition-colors",
                selected ? "border-teal ring-1 ring-teal" : "border-line hover:border-teal",
              )}
            >
              <h3 className="font-display text-base font-bold text-ink">{d.titulo}</h3>
              <p className="mt-1 font-mono text-xs font-bold text-teal">{d.precio}</p>
              <p className="mt-2 text-sm text-ink-70">{d.descripcion}</p>
            </button>
          )
        })}
      </div>
      <p className="mt-2 text-xs text-ink-40">{estadoDiag}</p>

      <p className="mt-8 font-mono text-xs uppercase tracking-wider text-ink-40">
        {copy.bloqueOlaStarter}{" "}
        <span className="normal-case tracking-normal">{copy.bloqueOlaStarterOpcional}</span>
      </p>
      <div className="mt-2 rounded-md border border-teal bg-teal/5 p-4">
        <label className="flex cursor-pointer items-start justify-between gap-4">
          <span>
            <span className="block font-display text-base font-bold text-ink">
              {copy.olaStarter.titulo}
            </span>
            <span className="mt-1 block text-sm text-ink-70">{copy.olaStarter.descripcion}</span>
          </span>
          <input
            type="checkbox"
            checked={state.olaStarter}
            onChange={(e) => onChange({ olaStarter: e.target.checked })}
            className="mt-1 h-5 w-5 shrink-0 accent-teal"
          />
        </label>

        {state.olaStarter && (
          <dl className="mt-4 border-t border-line pt-3 text-sm">
            <div className="flex items-start justify-between gap-4 py-1">
              <dt className="text-ink-70">{copy.olaStarter.labelBruto}</dt>
              <dd>
                <PrecioMoney usd={quote.olaStarterBruto} rate={rate} className="text-right" />
              </dd>
            </div>
            <div className="flex items-start justify-between gap-4 py-1">
              <dt className="text-ink-70">
                {quote.diagBonificado
                  ? copy.olaStarter.labelRadarBonificado
                  : `Tu ${quote.diagLabel}`}
              </dt>
              <dd className="font-mono text-sm text-ink">
                {quote.diagBonificado
                  ? copy.olaStarter.valorRadarBonificado
                  : `${quote.creditApplied} acreditados`}
              </dd>
            </div>
            <div className="flex items-start justify-between gap-4 border-t border-line py-2">
              <dt className="font-bold text-ink">{copy.olaStarter.labelTotal}</dt>
              <dd>
                <PrecioMoney usd={quote.totalPrograma} rate={rate} className="text-right" />
              </dd>
            </div>
            <p className="mt-2 text-xs text-ink-40">{copy.olaStarter.incluye}</p>
          </dl>
        )}
      </div>

      <p className="mt-8 font-mono text-xs uppercase tracking-wider text-ink-40">
        {copy.bloqueOlas}
      </p>
      <div className="mt-2 rounded-md border border-line bg-paper-soft p-4">
        <h3 className="flex items-baseline justify-between gap-3 font-display text-base font-bold text-ink">
          {copy.olas.titulo}
          <span className="font-mono text-xs font-bold text-teal">{copy.olas.precio}</span>
        </h3>
        <p className="mt-2 text-sm text-ink-70">{copy.olas.descripcion}</p>
        <a
          href={`mailto:${contactoDirecto}?subject=${encodeURIComponent("Quiero que me coticen una ola")}`}
          className="mt-3 inline-block text-sm font-bold text-teal underline"
        >
          {copy.olas.cta}
        </a>
      </div>

      {state.diag === "radar" && (
        <>
          <p className="mt-8 font-mono text-xs uppercase tracking-wider text-ink-40">
            {copy.bloqueAgendar}{" "}
            <span className="normal-case tracking-normal">{copy.bloqueAgendarOpcional}</span>
          </p>
          <div className="mt-2 rounded-md border border-line bg-paper-soft p-4">
            <label className="flex cursor-pointer items-start justify-between gap-4">
              <span>
                <span className="block font-display text-base font-bold text-ink">
                  {copy.agendar.titulo}
                </span>
                <span className="mt-1 block text-sm text-ink-70">{copy.agendar.descripcion}</span>
              </span>
              <input
                type="checkbox"
                checked={state.radarOpt}
                onChange={(e) => onChange({ radarOpt: e.target.checked })}
                className="mt-1 h-5 w-5 shrink-0 accent-teal"
              />
            </label>
            <p className="mt-2 text-xs text-ink-40">
              {state.radarOpt ? copy.agendar.estadoActivo : copy.agendar.estadoInactivo}
            </p>
          </div>
        </>
      )}

      <div className="mt-8 flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
        <a href="/contacto" className="p-2 text-center text-sm text-teal underline">
          {copy.hablarConEquipo}
        </a>
        <button
          type="button"
          onClick={onContinuar}
          className="rounded bg-teal px-6 py-3 text-sm font-bold text-on-brand transition-transform hover:-translate-y-0.5"
        >
          {copy.continuar}
        </button>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Conectarlo al wizard**

En `components/precio/wizard.tsx`:

1. Agregar el import: `import { StepCotizador } from "./step-cotizador"`
2. Agregar el handler antes del `return`:

```tsx
  const patch = (p: Partial<WizardState>) =>
    setState((prev) => {
      const next = { ...prev, ...p }
      // El bloque de agendar sólo existe para el Radar: al pasar a Mapa se apaga
      // para que no viaje un radarOpt true que la confirmación no puede honrar.
      if (next.diag !== "radar") next.radarOpt = false
      return next
    })
```

3. Reemplazar el bloque placeholder (los dos `<p>` de debug y el `<div>` de botones) por:

```tsx
      {paso === 1 && (
        <StepCotizador
          state={state}
          quote={quote}
          rate={rate}
          onChange={patch}
          onContinuar={() => irA(2)}
        />
      )}
```

4. Dejar temporalmente, debajo, para poder seguir recorriendo los pasos que faltan:

```tsx
      {paso > 1 && (
        <div className="text-center">
          <p className="font-mono text-sm text-ink-40">
            Paso {paso}: {precioCopy.pasos[paso - 1]}
          </p>
          <button
            type="button"
            onClick={() => irA(paso - 1)}
            className="mt-4 rounded border border-line px-4 py-2 text-sm text-ink-70"
          >
            {precioCopy.resumen.atras}
          </button>
        </div>
      )}
```

5. Quitar el import de `readiness` sin uso si tsc se queja: `readiness` sigue llegando por props y se usa en la Task 10.

- [ ] **Step 3: Verificar en el browser**

Run: `npm run dev`, abrir `http://localhost:3300/precio`.
Expected, probando las cuatro combinaciones:
- Radar sin Ola Starter: el texto de estado dice que pagás el Radar hoy sin compromiso. Aparece el bloque de agendar.
- Radar con Ola Starter: aparece el detalle con Valor Ola Starter `USD 6.000`, "Bonificado, sin cargo", y total `USD 6.000`.
- Mapa sin Ola Starter: desaparece el bloque de agendar.
- Mapa con Ola Starter: el detalle muestra `6000 acreditados` y total `USD 7.500`.
- Los montos en pesos dicen "referencia en pesos no disponible" (todavía no hay `fallbackRate` y el fetch en vivo puede fallar).

- [ ] **Step 4: Type check y commit**

```bash
cd /Users/mok/Sites/innovas/site
npx tsc --noEmit
git add components/precio/step-cotizador.tsx components/precio/wizard.tsx
git commit -m "feat: paso 1 de /precio, el cotizador"
```

---

## Task 7: Paso 2 — el resumen

**Repo:** sitio

**Files:**
- Create: `components/precio/step-resumen.tsx`
- Modify: `components/precio/wizard.tsx`

**Interfaces:**
- Consumes: `Quote` (Task 1), `PrecioMoney`, `WizardState` (Task 5), `precioCopy` (Task 2).
- Produces: `<StepResumen quote rate onAtras onContinuar />`.

- [ ] **Step 1: Crear el componente**

Fondo oscuro, como el `result-card` de la maqueta. Regla del design system: sobre fondo oscuro nunca `text-teal` a secas, va `text-teal-dark`.

`components/precio/step-resumen.tsx`:

```tsx
"use client"

import type { BnaRate } from "@/lib/bna-rate"
import { usdToArs } from "@/lib/bna-rate"
import type { Quote } from "@/lib/precio-quote"
import { CATALOGO } from "@/lib/precio-quote"
import { fmtArs, fmtFechaCorta, fmtUsd } from "@/lib/precio-format"
import { precioCopy } from "@/content/precio"

function Linea({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-paper/15 py-2 text-sm">
      <span className="text-paper/70">{label}</span>
      <span className="font-mono text-right text-paper">{value}</span>
    </div>
  )
}

export function StepResumen({
  quote,
  rate,
  onAtras,
  onContinuar,
}: {
  quote: Quote
  rate: BnaRate | null
  onAtras: () => void
  onContinuar: () => void
}) {
  const copy = precioCopy.resumen
  const arsPrimerPago = usdToArs(quote.montoPrimerPago, rate)

  return (
    <div>
      <p className="text-center font-mono text-xs uppercase tracking-wider text-teal">
        {precioCopy.pasos[1]}
      </p>
      <h2 className="mt-3 text-center font-display text-3xl font-bold text-ink">{copy.title}</h2>
      <p className="mx-auto mt-3 max-w-md text-center text-ink-70">{copy.subhead}</p>

      <div className="mt-7 rounded-md bg-ink p-6">
        <p className="font-mono text-[10px] uppercase tracking-wider text-paper/50">
          {copy.tuPlan}
        </p>
        <Linea
          label={quote.diagLabel}
          value={
            quote.diagBonificado
              ? copy.radarBonificado
              : quote.olaStarter
                ? `${fmtUsd(quote.diagValue)}, acreditado ${fmtUsd(quote.creditApplied)}`
                : fmtUsd(quote.diagValue)
          }
        />
        {quote.olaStarter && (
          <>
            <Linea label={copy.labelOlaStarter} value={fmtUsd(quote.olaStarterBruto)} />
            <Linea
              label={copy.labelSuscripcion}
              value={`${CATALOGO.planNombre}: ${fmtUsd(CATALOGO.planMensual)}/mes`}
            />
          </>
        )}

        <p className="mt-5 font-mono text-[10px] uppercase tracking-wider text-paper/50">
          {copy.labelHoy}
        </p>
        <p className="font-display text-3xl font-bold text-teal-dark">
          {fmtUsd(quote.montoPrimerPago)}
        </p>
        <p className="font-mono text-xs text-paper/50">
          {arsPrimerPago === null || rate === null
            ? precioCopy.moneda.sinReferencia
            : `${fmtArs(arsPrimerPago)} — ${
                rate.stale
                  ? precioCopy.moneda.referenciaDesactualizada(fmtFechaCorta(rate.fecha))
                  : precioCopy.moneda.referencia(fmtFechaCorta(rate.fecha))
              }`}
        </p>
        <Linea
          label={
            quote.cuotasRestantes > 0
              ? copy.labelPrimeraCuota(quote.cuotasRestantes, fmtUsd(quote.montoPrimerPago))
              : copy.labelPagoUnico
          }
          value={quote.olaStarter ? fmtUsd(quote.totalPrograma) : fmtUsd(quote.montoPrimerPago)}
        />

        {quote.mensualDesdeMes5 !== null && (
          <>
            <p className="mt-5 font-mono text-[10px] uppercase tracking-wider text-paper/50">
              {copy.labelDespues}
            </p>
            <Linea
              label={copy.labelDesdeMes5}
              value={`${fmtUsd(quote.mensualDesdeMes5)}/mes`}
            />
          </>
        )}

        <p className="mt-4 text-xs leading-relaxed text-paper/50">
          {quote.olaStarter
            ? copy.disclaimerConOlaStarter
            : copy.disclaimerPagoUnico(quote.diagLabel)}
        </p>
      </div>

      <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
        <button
          type="button"
          onClick={onAtras}
          className="rounded border border-line px-6 py-3 text-sm text-ink-70 hover:bg-paper-soft"
        >
          {copy.atras}
        </button>
        <button
          type="button"
          onClick={onContinuar}
          className="rounded bg-teal px-6 py-3 text-sm font-bold text-on-brand transition-transform hover:-translate-y-0.5"
        >
          {copy.continuar}
        </button>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Conectarlo al wizard**

En `components/precio/wizard.tsx`, agregar el import `import { StepResumen } from "./step-resumen"` y, después del bloque de `paso === 1`:

```tsx
      {paso === 2 && (
        <StepResumen
          quote={quote}
          rate={rate}
          onAtras={() => irA(1)}
          onContinuar={() => irA(3)}
        />
      )}
```

Cambiar la condición del placeholder de `{paso > 1 && (` a `{paso > 2 && (`.

- [ ] **Step 3: Verificar en el browser**

Recorrer las cuatro combinaciones y confirmar los montos contra la tabla de Global Constraints:
- radar/no: primer pago `USD 1.500`, "Pago único", sin bloque "Después".
- radar/sí: primer pago `USD 1.500`, "Primera de 4 cuotas de USD 1.500", después `USD 1.500/mes`.
- mapa/no: primer pago `USD 7.500`, "Pago único", sin bloque "Después".
- mapa/sí: primer pago `USD 7.500`, "Pago único", después `USD 1.500/mes`, y el Mapa figura "acreditado USD 6.000".

- [ ] **Step 4: Type check y commit**

```bash
cd /Users/mok/Sites/innovas/site
npx tsc --noEmit
git add components/precio/step-resumen.tsx components/precio/wizard.tsx
git commit -m "feat: paso 2 de /precio, el resumen de la cotización"
```

---

## Task 8: Validación de los datos del lead

**Repo:** sitio

**Files:**
- Create: `lib/precio-lead.ts`
- Test: `lib/precio-lead.test.ts`
- Modify: `content/precio.ts` (mensaje de error del CUIT)

**Interfaces:**
- Consumes: nada.
- Produces:
  - `interface DatosLead { nombre: string; apellido: string; email: string; celular: string; web: string; cuit: string; empresa: string }`
  - `const DATOS_LEAD_VACIO: DatosLead`
  - `type CampoDatos = keyof DatosLead`
  - `function validateEmail(value: string): boolean`
  - `function validateCuit(value: string): boolean`
  - `function normalizeCuit(value: string): string`
  - `function validateDatos(datos: DatosLead): Partial<Record<CampoDatos, true>>`

- [ ] **Step 1: Escribir los tests que fallan**

La maqueta original sólo contaba 11 dígitos. Validar el dígito verificador atrapa el error de tipeo, que es el caso real: un CUIT mal cargado rompe el contrato después.

`lib/precio-lead.test.ts`:

```ts
import { describe, expect, it } from "vitest"
import {
  DATOS_LEAD_VACIO,
  normalizeCuit,
  validateCuit,
  validateDatos,
  validateEmail,
} from "./precio-lead"

describe("validateEmail", () => {
  it("acepta un email común", () => {
    expect(validateEmail("vos@tuempresa.com")).toBe(true)
  })

  it("rechaza lo que no tiene arroba o dominio", () => {
    expect(validateEmail("vos")).toBe(false)
    expect(validateEmail("vos@tuempresa")).toBe(false)
    expect(validateEmail("vos @tuempresa.com")).toBe(false)
    expect(validateEmail("")).toBe(false)
  })
})

describe("validateCuit", () => {
  it("acepta un CUIT válido con y sin guiones", () => {
    // 30-71234567-9: dígito verificador correcto.
    expect(validateCuit("30-71234567-9")).toBe(true)
    expect(validateCuit("30712345679")).toBe(true)
    expect(validateCuit(" 30-71234567-9 ")).toBe(true)
  })

  it("rechaza un CUIT con el dígito verificador equivocado", () => {
    expect(validateCuit("30-71234567-0")).toBe(false)
  })

  it("rechaza una cantidad de dígitos que no sea 11", () => {
    expect(validateCuit("3071234567")).toBe(false)
    expect(validateCuit("307123456790")).toBe(false)
    expect(validateCuit("")).toBe(false)
  })

  it("rechaza letras", () => {
    expect(validateCuit("30-7123456A-9")).toBe(false)
  })
})

describe("normalizeCuit", () => {
  it("formatea a XX-XXXXXXXX-X", () => {
    expect(normalizeCuit("30712345679")).toBe("30-71234567-9")
    expect(normalizeCuit("30-71234567-9")).toBe("30-71234567-9")
  })

  it("devuelve el original si no tiene 11 dígitos", () => {
    expect(normalizeCuit("123")).toBe("123")
  })
})

describe("validateDatos", () => {
  const validos = {
    nombre: "Matías",
    apellido: "O'Keefe",
    email: "matias@innov.as",
    celular: "+54 9 11 1234 5678",
    web: "",
    cuit: "30-71234567-9",
    empresa: "INNOV.AS",
  }

  it("no devuelve errores con datos válidos", () => {
    expect(validateDatos(validos)).toEqual({})
  })

  it("la web es opcional", () => {
    expect(validateDatos({ ...validos, web: "" })).toEqual({})
    expect(validateDatos({ ...validos, web: "www.innov.as" })).toEqual({})
  })

  it("marca todos los campos requeridos vacíos de una sola vez", () => {
    expect(validateDatos(DATOS_LEAD_VACIO)).toEqual({
      nombre: true,
      apellido: true,
      email: true,
      celular: true,
      cuit: true,
      empresa: true,
    })
  })

  it("rechaza un nombre de una sola letra", () => {
    expect(validateDatos({ ...validos, nombre: "M" })).toEqual({ nombre: true })
  })

  it("rechaza un celular demasiado corto", () => {
    expect(validateDatos({ ...validos, celular: "123" })).toEqual({ celular: true })
  })
})
```

- [ ] **Step 2: Correr los tests para verificar que fallan**

Run: `npm test lib/precio-lead.test.ts`
Expected: FAIL — no se puede resolver `./precio-lead`.

- [ ] **Step 3: Implementar**

`lib/precio-lead.ts`:

```ts
export interface DatosLead {
  nombre: string
  apellido: string
  email: string
  celular: string
  /** Opcional: ayuda a entender la operación antes del diagnóstico. */
  web: string
  cuit: string
  empresa: string
}

export type CampoDatos = keyof DatosLead

export const DATOS_LEAD_VACIO: DatosLead = {
  nombre: "",
  apellido: "",
  email: "",
  celular: "",
  web: "",
  cuit: "",
  empresa: "",
}

// Chequeo de forma, no RFC5322: el objetivo es rechazar basura, no cumplir la spec.
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const CUIT_PESOS = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2]

export function validateEmail(value: string): boolean {
  return EMAIL_REGEX.test(value.trim())
}

/** Deja sólo los dígitos, para poder aceptar el CUIT con o sin guiones. */
function soloDigitos(value: string): string {
  return value.replace(/\D/g, "")
}

/**
 * Valida los 11 dígitos y además el dígito verificador (módulo 11). Un CUIT con
 * un dígito mal tipeado pasa el chequeo de largo pero rompe el contrato después,
 * así que se valida de verdad.
 */
export function validateCuit(value: string): boolean {
  const trimmed = value.trim()
  // Rechaza letras u otros caracteres que no sean dígitos, espacios o guiones.
  if (!/^[\d\s-]+$/.test(trimmed)) return false

  const digitos = soloDigitos(trimmed)
  if (digitos.length !== 11) return false

  const suma = CUIT_PESOS.reduce((acc, peso, i) => acc + peso * Number(digitos[i]), 0)
  const resto = suma % 11
  const esperado = resto === 0 ? 0 : resto === 1 ? 9 : 11 - resto

  return Number(digitos[10]) === esperado
}

export function normalizeCuit(value: string): string {
  const digitos = soloDigitos(value)
  if (digitos.length !== 11) return value
  return `${digitos.slice(0, 2)}-${digitos.slice(2, 10)}-${digitos.slice(10)}`
}

/**
 * Devuelve un objeto con los campos que fallaron. Valida todo de una pasada para
 * que el formulario pueda mostrar todos los errores juntos en vez de uno por vez.
 */
export function validateDatos(datos: DatosLead): Partial<Record<CampoDatos, true>> {
  const errores: Partial<Record<CampoDatos, true>> = {}

  if (datos.nombre.trim().length < 2) errores.nombre = true
  if (datos.apellido.trim().length < 2) errores.apellido = true
  if (!validateEmail(datos.email)) errores.email = true
  if (datos.celular.trim().length < 6) errores.celular = true
  if (!validateCuit(datos.cuit)) errores.cuit = true
  if (datos.empresa.trim().length < 2) errores.empresa = true

  return errores
}
```

- [ ] **Step 4: Ajustar el mensaje de error del CUIT**

En `content/precio.ts`, en `datos.errores.cuit`, reemplazar el texto por uno que describa la validación real:

```ts
      cuit: "Revisá el CUIT: no es válido.",
```

- [ ] **Step 5: Correr los tests y el type check**

Run: `npm test && npx tsc --noEmit`
Expected: todos PASS, tsc sin errores.

- [ ] **Step 6: Commit**

```bash
cd /Users/mok/Sites/innovas/site
git add lib/precio-lead.ts lib/precio-lead.test.ts content/precio.ts
git commit -m "feat: validación de datos del lead, con dígito verificador de CUIT"
```

---

## Task 9: Paso 3 — tus datos

**Repo:** sitio

**Files:**
- Create: `components/precio/step-datos.tsx`
- Modify: `components/precio/wizard.tsx`

**Interfaces:**
- Consumes: `DatosLead`, `CampoDatos`, `validateDatos`, `normalizeCuit`, `DATOS_LEAD_VACIO` (Task 8), `precioCopy` (Task 2).
- Produces: `<StepDatos datos onChange onAtras onContinuar />`, donde `onContinuar` sólo se llama si la validación pasa.

- [ ] **Step 1: Crear el componente**

No hay búsqueda de CUIT: el nombre de la empresa lo escribe siempre el visitante, y el hint lo dice. Nunca se inventa una razón social.

`components/precio/step-datos.tsx`:

```tsx
"use client"

import { useState } from "react"
import type { CampoDatos, DatosLead } from "@/lib/precio-lead"
import { normalizeCuit, validateDatos } from "@/lib/precio-lead"
import { precioCopy } from "@/content/precio"
import { cn } from "@/lib/utils"

function Campo({
  campo,
  label,
  placeholder,
  type = "text",
  hint,
  opcional,
  value,
  error,
  onChange,
  onBlur,
}: {
  campo: CampoDatos
  label: string
  placeholder: string
  type?: string
  hint?: string
  opcional?: string
  value: string
  error: boolean
  onChange: (v: string) => void
  onBlur?: () => void
}) {
  const errorId = `err-${campo}`
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={campo} className="text-sm font-bold text-ink">
        {label}
        {opcional && <span className="ml-1 font-normal text-ink-40">{opcional}</span>}
      </label>
      <input
        id={campo}
        name={campo}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        aria-invalid={error || undefined}
        aria-describedby={error ? errorId : undefined}
        className={cn(
          "rounded border bg-paper px-3 py-2.5 text-base text-ink outline-teal",
          error ? "border-danger" : "border-line",
        )}
      />
      {hint && !error && <span className="text-xs text-ink-40">{hint}</span>}
      {error && (
        <span id={errorId} className="text-xs text-danger">
          {precioCopy.datos.errores[campo as keyof typeof precioCopy.datos.errores]}
        </span>
      )}
    </div>
  )
}

export function StepDatos({
  datos,
  onChange,
  onAtras,
  onContinuar,
}: {
  datos: DatosLead
  onChange: (patch: Partial<DatosLead>) => void
  onAtras: () => void
  onContinuar: () => void
}) {
  const copy = precioCopy.datos
  const [errores, setErrores] = useState<Partial<Record<CampoDatos, true>>>({})

  const intentarContinuar = () => {
    const found = validateDatos(datos)
    setErrores(found)
    if (Object.keys(found).length === 0) onContinuar()
  }

  // Limpia el error de un campo en cuanto se lo edita, para no dejarlo en rojo
  // mientras el visitante lo está corrigiendo.
  const set = (patch: Partial<DatosLead>) => {
    const campos = Object.keys(patch) as CampoDatos[]
    setErrores((prev) => {
      const next = { ...prev }
      for (const c of campos) delete next[c]
      return next
    })
    onChange(patch)
  }

  return (
    <div>
      <p className="text-center font-mono text-xs uppercase tracking-wider text-teal">
        {precioCopy.pasos[2]}
      </p>
      <h2 className="mt-3 text-center font-display text-3xl font-bold text-ink">{copy.title}</h2>
      <p className="mx-auto mt-3 max-w-md text-center text-ink-70">{copy.subhead}</p>

      <div className="mt-7 rounded-md border border-line bg-paper-soft p-6">
        <p className="font-mono text-xs uppercase tracking-wider text-ink-40">
          {copy.bloqueContacto}
        </p>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          <Campo
            campo="nombre"
            label={copy.labels.nombre}
            placeholder={copy.placeholders.nombre}
            value={datos.nombre}
            error={!!errores.nombre}
            onChange={(nombre) => set({ nombre })}
          />
          <Campo
            campo="apellido"
            label={copy.labels.apellido}
            placeholder={copy.placeholders.apellido}
            value={datos.apellido}
            error={!!errores.apellido}
            onChange={(apellido) => set({ apellido })}
          />
        </div>
        <div className="mt-4 grid gap-4">
          <Campo
            campo="email"
            type="email"
            label={copy.labels.email}
            placeholder={copy.placeholders.email}
            value={datos.email}
            error={!!errores.email}
            onChange={(email) => set({ email })}
          />
          <Campo
            campo="celular"
            type="tel"
            label={copy.labels.celular}
            placeholder={copy.placeholders.celular}
            value={datos.celular}
            error={!!errores.celular}
            onChange={(celular) => set({ celular })}
          />
        </div>

        <p className="mt-7 font-mono text-xs uppercase tracking-wider text-ink-40">
          {copy.bloqueEmpresa}
        </p>
        <div className="mt-3 grid gap-4">
          <Campo
            campo="web"
            label={copy.labels.web}
            opcional={copy.labels.webOpcional}
            placeholder={copy.placeholders.web}
            hint={copy.hints.web}
            value={datos.web}
            error={false}
            onChange={(web) => set({ web })}
          />
          <Campo
            campo="empresa"
            label={copy.labels.empresa}
            placeholder={copy.placeholders.empresa}
            hint={copy.hints.empresa}
            value={datos.empresa}
            error={!!errores.empresa}
            onChange={(empresa) => set({ empresa })}
          />
          <Campo
            campo="cuit"
            label={copy.labels.cuit}
            placeholder={copy.placeholders.cuit}
            hint={copy.hints.cuit}
            value={datos.cuit}
            error={!!errores.cuit}
            onChange={(cuit) => set({ cuit })}
            onBlur={() => onChange({ cuit: normalizeCuit(datos.cuit) })}
          />
        </div>

        <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
          <button
            type="button"
            onClick={onAtras}
            className="rounded border border-line px-6 py-3 text-sm text-ink-70 hover:bg-paper"
          >
            {copy.atras}
          </button>
          <button
            type="button"
            onClick={intentarContinuar}
            className="rounded bg-teal px-6 py-3 text-sm font-bold text-on-brand transition-transform hover:-translate-y-0.5"
          >
            {copy.continuar}
          </button>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Conectarlo al wizard**

En `components/precio/wizard.tsx`:

1. Imports: `import { StepDatos } from "./step-datos"` y `import { DATOS_LEAD_VACIO, type DatosLead } from "@/lib/precio-lead"`.
2. Estado nuevo, junto a los otros `useState`:

```tsx
  const [datos, setDatos] = useState<DatosLead>(DATOS_LEAD_VACIO)
```

3. Después del bloque de `paso === 2`:

```tsx
      {paso === 3 && (
        <StepDatos
          datos={datos}
          onChange={(patch) => setDatos((prev) => ({ ...prev, ...patch }))}
          onAtras={() => irA(2)}
          onContinuar={() => irA(4)}
        />
      )}
```

4. Cambiar la condición del placeholder de `{paso > 2 && (` a `{paso > 3 && (`.

- [ ] **Step 3: Verificar en el browser**

- Continuar con todo vacío: 6 campos en rojo con sus mensajes, no avanza.
- Escribir en un campo en rojo: el rojo se va al tipear.
- CUIT `30-71234567-0`: error "Revisá el CUIT: no es válido."
- CUIT `30712345679` y salir del campo: se reformatea a `30-71234567-9`.
- Web vacía: no bloquea.
- Con todo válido: avanza al paso 4.

- [ ] **Step 4: Type check y commit**

```bash
cd /Users/mok/Sites/innovas/site
npx tsc --noEmit
git add components/precio/step-datos.tsx components/precio/wizard.tsx
git commit -m "feat: paso 3 de /precio, datos de contacto y empresa"
```

---

## Task 10: Paso 4 — cómo pagás

**Repo:** sitio

**Files:**
- Create: `components/precio/copy-field.tsx`
- Create: `components/precio/step-pago.tsx`
- Modify: `components/precio/wizard.tsx`

**Interfaces:**
- Consumes: `Quote` (Task 1), `pagoConfig`, `precioCopy` (Task 2), `mpLinkParaMonto`, `mpLinkVencido`, `Readiness` (Task 3), `PrecioMoney` (Task 5).
- Produces:
  - `<CopyField label value />`
  - `<StepPago quote rate readiness mockup enviando error onAtras onConfirmar />`

- [ ] **Step 1: Crear el campo copiable**

`components/precio/copy-field.tsx`:

```tsx
"use client"

import { useState } from "react"
import { precioCopy } from "@/content/precio"

export function CopyField({ label, value }: { label: string; value: string }) {
  const [copiado, setCopiado] = useState(false)
  const copy = precioCopy.pago.transferencia
  const pendiente = value.trim().length === 0

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopiado(true)
      window.setTimeout(() => setCopiado(false), 2000)
    } catch (error) {
      // Sin permiso de clipboard el valor sigue visible y seleccionable a mano:
      // no hay nada que recuperar, sólo se deja registro.
      console.error("No se pudo copiar al portapapeles:", error)
    }
  }

  return (
    <div className="flex items-center justify-between gap-3 border-b border-line py-2">
      <span className="text-sm text-ink-70">{label}</span>
      <span className="flex items-center gap-2">
        <span className="font-mono text-sm text-ink">{pendiente ? copy.pendiente : value}</span>
        {!pendiente && (
          <button
            type="button"
            onClick={copiar}
            className="rounded border border-line px-2 py-1 font-mono text-[11px] text-ink-70 hover:bg-paper"
          >
            {copiado ? copy.copiado : copy.copiar}
          </button>
        )}
      </span>
    </div>
  )
}
```

- [ ] **Step 2: Crear el paso de pago**

Nada de campos de tarjeta. En producción, un medio sin configurar simplemente no se ofrece; en maqueta se muestra deshabilitado con su chip, para poder ver cómo va a quedar.

`components/precio/step-pago.tsx`:

```tsx
"use client"

import { useState } from "react"
import Link from "next/link"
import type { BnaRate } from "@/lib/bna-rate"
import type { Quote } from "@/lib/precio-quote"
import { fmtUsd } from "@/lib/precio-format"
import { mpLinkParaMonto, mpLinkVencido, type Readiness } from "@/lib/precio-readiness"
import { pagoConfig, precioCopy } from "@/content/precio"
import { PrecioMoney } from "./precio-money"
import { CopyField } from "./copy-field"
import { cn } from "@/lib/utils"

function ChipPendiente({ texto }: { texto: string }) {
  return (
    <span className="rounded-sm bg-plum/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-plum">
      {texto}
    </span>
  )
}

export function StepPago({
  quote,
  rate,
  readiness,
  mockup,
  enviando,
  error,
  onAtras,
  onConfirmar,
}: {
  quote: Quote
  rate: BnaRate | null
  readiness: Readiness
  mockup: boolean
  enviando: boolean
  error: string | null
  onAtras: () => void
  onConfirmar: () => void
}) {
  const copy = precioCopy.pago
  const [acepta, setAcepta] = useState(false)
  const [errorTerminos, setErrorTerminos] = useState(false)

  const mpLink = mpLinkParaMonto(pagoConfig, quote.montoPrimerPago)
  const mpVencido = mpLink ? mpLinkVencido(mpLink, new Date()) : false
  const mostrarMp = mpLink !== null || mockup
  const mostrarTransferencia = readiness.transferencia || mockup

  const confirmar = () => {
    if (!acepta) {
      setErrorTerminos(true)
      return
    }
    setErrorTerminos(false)
    onConfirmar()
  }

  return (
    <div>
      <p className="text-center font-mono text-xs uppercase tracking-wider text-teal">
        {precioCopy.pasos[3]}
      </p>
      <h2 className="mt-3 text-center font-display text-3xl font-bold text-ink">{copy.title}</h2>
      <p className="mx-auto mt-3 max-w-md text-center text-ink-70">
        {copy.subhead(fmtUsd(quote.montoPrimerPago))}
      </p>
      <div className="mt-4 flex justify-center">
        <PrecioMoney usd={quote.montoPrimerPago} rate={rate} className="items-center" />
      </div>

      <div className="mt-7 grid gap-4">
        {mostrarMp && (
          <div className="rounded-md border border-line bg-paper-soft p-5">
            <h3 className="flex items-center gap-2 font-display text-base font-bold text-ink">
              {copy.mercadoPago.titulo}
              {!mpLink && <ChipPendiente texto={copy.mercadoPago.pendiente} />}
            </h3>
            <p className="mt-2 text-sm text-ink-70">{copy.mercadoPago.descripcion}</p>
            {mpVencido && (
              <p className="mt-2 text-xs text-danger">{copy.mercadoPago.vencido}</p>
            )}
            <a
              href={mpLink?.url || undefined}
              target="_blank"
              rel="noopener noreferrer"
              aria-disabled={!mpLink}
              onClick={(e) => {
                if (!mpLink) e.preventDefault()
              }}
              className={cn(
                "mt-4 inline-block rounded px-5 py-2.5 text-sm font-bold",
                mpLink
                  ? "bg-teal text-on-brand transition-transform hover:-translate-y-0.5"
                  : "cursor-not-allowed bg-taupe text-on-brand",
              )}
            >
              {copy.mercadoPago.cta}
            </a>
          </div>
        )}

        {mostrarTransferencia && (
          <div className="rounded-md border border-line bg-paper-soft p-5">
            <h3 className="flex items-center gap-2 font-display text-base font-bold text-ink">
              {copy.transferencia.titulo}
              {!readiness.transferencia && (
                <ChipPendiente texto={copy.transferencia.pendiente} />
              )}
            </h3>
            <p className="mt-2 text-sm text-ink-70">{copy.transferencia.descripcion}</p>
            <div className="mt-3">
              <CopyField
                label={copy.transferencia.labels.titular}
                value={pagoConfig.transferencia.titular}
              />
              <CopyField
                label={copy.transferencia.labels.cuit}
                value={pagoConfig.transferencia.cuit}
              />
              <CopyField
                label={copy.transferencia.labels.cbu}
                value={pagoConfig.transferencia.cbu}
              />
              <CopyField
                label={copy.transferencia.labels.alias}
                value={pagoConfig.transferencia.alias}
              />
            </div>
          </div>
        )}
      </div>

      <label className="mt-6 flex items-start gap-2.5">
        <input
          type="checkbox"
          checked={acepta}
          onChange={(e) => {
            setAcepta(e.target.checked)
            if (e.target.checked) setErrorTerminos(false)
          }}
          className="mt-0.5 h-4 w-4 shrink-0 accent-teal"
        />
        <span className="text-xs text-ink-70">
          {copy.terminos.prefijo}
          <Link href="/terminos" target="_blank" className="text-teal underline">
            {copy.terminos.terminos}
          </Link>
          {copy.terminos.union}
          <Link href="/privacidad" target="_blank" className="text-teal underline">
            {copy.terminos.privacidad}
          </Link>
          {copy.terminos.sufijo}
        </span>
      </label>
      {errorTerminos && <p className="mt-2 text-xs text-danger">{copy.terminos.error}</p>}
      {error && <p className="mt-2 text-xs text-danger">{error}</p>}

      <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
        <button
          type="button"
          onClick={onAtras}
          disabled={enviando}
          className="rounded border border-line px-6 py-3 text-sm text-ink-70 hover:bg-paper-soft disabled:opacity-50"
        >
          {copy.atras}
        </button>
        <button
          type="button"
          onClick={confirmar}
          disabled={enviando}
          className="rounded bg-teal px-6 py-3 text-sm font-bold text-on-brand transition-transform hover:-translate-y-0.5 disabled:bg-taupe"
        >
          {enviando ? copy.enviando : copy.confirmar}
        </button>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Conectarlo al wizard**

En `components/precio/wizard.tsx`:

1. Import: `import { StepPago } from "./step-pago"`.
2. Estado nuevo:

```tsx
  const [enviando, setEnviando] = useState(false)
  const [errorEnvio, setErrorEnvio] = useState<string | null>(null)
```

3. Después del bloque de `paso === 3`:

```tsx
      {paso === 4 && (
        <StepPago
          quote={quote}
          rate={rate}
          readiness={readiness}
          mockup={mockup}
          enviando={enviando}
          error={errorEnvio}
          onAtras={() => irA(3)}
          onConfirmar={() => {
            // El envío real llega en la Task 11.
            setErrorEnvio(null)
            setEnviando(false)
          }}
        />
      )}
```

4. Borrar el bloque placeholder de `{paso > 3 && (` — ya no queda ningún paso sin implementar.

- [ ] **Step 4: Verificar en el browser**

- Con la config vacía y modo maqueta: aparecen las dos tarjetas con chip "Pendiente", el botón de MP en gris y no clickeable, y los datos de transferencia diciendo "Pendiente" sin botón de copiar.
- Confirmar sin tildar términos: mensaje de error, no avanza.
- Los links de Términos y Privacidad abren `/terminos` y `/privacidad` en pestaña nueva.
- El monto de arriba cambia entre `USD 1.500` y `USD 7.500` según el camino elegido en el paso 1.

- [ ] **Step 5: Type check y commit**

```bash
cd /Users/mok/Sites/innovas/site
npx tsc --noEmit
git add components/precio/copy-field.tsx components/precio/step-pago.tsx components/precio/wizard.tsx
git commit -m "feat: paso 4 de /precio, elección de medio de pago sin datos sensibles"
```

---

## Task 11: Envío y pantalla de confirmación

**Repo:** sitio

**Files:**
- Create: `lib/precio-submit.ts`
- Test: `lib/precio-submit.test.ts`
- Create: `components/precio/confirmacion.tsx`
- Modify: `components/precio/wizard.tsx`

**Interfaces:**
- Consumes: `WizardState` (Task 5), `DatosLead`, `normalizeCuit` (Task 8), `Quote` (Task 1), `pagoConfig`, `precioCopy` (Task 2), `Readiness` (Task 3).
- Produces:
  - `interface SubmitPayload { diag: Diagnostico; olaStarter: boolean; radarOpt: boolean; nombre: string; apellido: string; email: string; celular: string; cuit: string; empresa: string; web: string; aceptaTerminos: true }`
  - `interface SubmitResult { visitorEmailSent: boolean; simulated: boolean }`
  - `function buildSubmitPayload(state: WizardState, datos: DatosLead): SubmitPayload`
  - `function submitLead(args: { payload: SubmitPayload; endpoint: string; secret: string; fetchImpl?: typeof fetch }): Promise<SubmitResult>`
  - `<Confirmacion quote datos resultado readiness />`

- [ ] **Step 1: Escribir los tests que fallan**

El test que importa es el que verifica que el payload **no lleva montos**: es la constraint global del sistema, y es la clase de cosa que alguien rompe agregando un campo "para el mail" sin pensar.

`lib/precio-submit.test.ts`:

```ts
import { describe, expect, it, vi } from "vitest"
import { buildSubmitPayload, submitLead } from "./precio-submit"

const state = { diag: "radar", olaStarter: true, radarOpt: true } as const
const datos = {
  nombre: "  Matías ",
  apellido: " O'Keefe ",
  email: "  Matias@INNOV.as ",
  celular: " +54 9 11 1234 5678 ",
  web: " www.innov.as ",
  cuit: "30712345679",
  empresa: " INNOV.AS ",
}

describe("buildSubmitPayload", () => {
  it("normaliza los datos: trim, email en minúscula, CUIT formateado", () => {
    expect(buildSubmitPayload(state, datos)).toEqual({
      diag: "radar",
      olaStarter: true,
      radarOpt: true,
      nombre: "Matías",
      apellido: "O'Keefe",
      email: "matias@innov.as",
      celular: "+54 9 11 1234 5678",
      cuit: "30-71234567-9",
      empresa: "INNOV.AS",
      web: "www.innov.as",
      aceptaTerminos: true,
    })
  })

  it("NO manda montos: el servidor recalcula la cotización", () => {
    const payload = buildSubmitPayload(state, datos) as Record<string, unknown>
    for (const prohibido of [
      "total",
      "totalPrograma",
      "monto",
      "montoPrimerPago",
      "diagValue",
      "olaStarterBruto",
      "creditApplied",
      "precio",
      "amount",
    ]) {
      expect(payload).not.toHaveProperty(prohibido)
    }
  })

  it("apaga radarOpt cuando el diagnóstico no es el Radar", () => {
    const payload = buildSubmitPayload({ diag: "mapa", olaStarter: false, radarOpt: true }, datos)
    expect(payload.radarOpt).toBe(false)
  })
})

describe("submitLead", () => {
  const payload = buildSubmitPayload(state, datos)
  const args = { payload, endpoint: "https://x.supabase.co/functions/v1/precio_lead", secret: "s3cr3t" }

  it("postea con el header del secret y devuelve si el mail al visitante salió", async () => {
    const fetchImpl = vi.fn(async () => ({
      ok: true,
      json: async () => ({ message: "OK", visitorEmailSent: true }),
    }) as Response) as unknown as typeof fetch

    const result = await submitLead({ ...args, fetchImpl })

    expect(result).toEqual({ visitorEmailSent: true, simulated: false })
    const [url, init] = (fetchImpl as unknown as ReturnType<typeof vi.fn>).mock.calls[0]
    expect(url).toBe(args.endpoint)
    expect((init as RequestInit).method).toBe("POST")
    expect((init as RequestInit).headers).toMatchObject({
      "Content-Type": "application/json",
      "x-precio-form-secret": "s3cr3t",
    })
    expect(JSON.parse((init as RequestInit).body as string)).toEqual(payload)
  })

  it("trata visitorEmailSent ausente como false, sin romper", async () => {
    const fetchImpl = vi.fn(async () => ({
      ok: true,
      json: async () => ({ message: "OK" }),
    }) as Response) as unknown as typeof fetch

    expect(await submitLead({ ...args, fetchImpl })).toEqual({
      visitorEmailSent: false,
      simulated: false,
    })
  })

  it("lanza si la respuesta no es 2xx", async () => {
    const fetchImpl = vi.fn(async () => ({
      ok: false,
      status: 500,
      json: async () => ({ message: "Could not process the submission" }),
    }) as Response) as unknown as typeof fetch

    await expect(submitLead({ ...args, fetchImpl })).rejects.toThrow(/500/)
  })

  it("lanza si la red falla", async () => {
    const fetchImpl = vi.fn(async () => {
      throw new Error("network down")
    }) as unknown as typeof fetch

    await expect(submitLead({ ...args, fetchImpl })).rejects.toThrow()
  })
})
```

- [ ] **Step 2: Correr los tests para verificar que fallan**

Run: `npm test lib/precio-submit.test.ts`
Expected: FAIL — no se puede resolver `./precio-submit`.

- [ ] **Step 3: Implementar**

`lib/precio-submit.ts`:

```ts
import type { Diagnostico } from "@/lib/precio-quote"
import type { DatosLead } from "@/lib/precio-lead"
import { normalizeCuit } from "@/lib/precio-lead"
import type { WizardState } from "@/components/precio/wizard"

/**
 * Lo único que viaja al backend. Deliberadamente SIN montos: la Edge Function
 * recalcula la cotización a partir de `diag` y `olaStarter`, así que un cliente
 * manipulado no puede cambiar lo que se cobra ni lo que dice el mail.
 * Si agregás un campo acá, agregalo también en
 * `supabase/functions/precio_lead/validateQuotePayload.ts` del repo del CRM.
 */
export interface SubmitPayload {
  diag: Diagnostico
  olaStarter: boolean
  radarOpt: boolean
  nombre: string
  apellido: string
  email: string
  celular: string
  cuit: string
  empresa: string
  /** Opcional en la UI; viaja como cadena vacía cuando no se completó. */
  web: string
  aceptaTerminos: true
}

export interface SubmitResult {
  /** Si el mail con las instrucciones de pago llegó a salir. */
  visitorEmailSent: boolean
  /** true = modo maqueta, no se registró ni se envió nada. */
  simulated: boolean
}

export function buildSubmitPayload(state: WizardState, datos: DatosLead): SubmitPayload {
  return {
    diag: state.diag,
    olaStarter: state.olaStarter,
    // Agendar sólo existe para el Radar: no se manda un true que el backend no
    // puede honrar.
    radarOpt: state.diag === "radar" ? state.radarOpt : false,
    nombre: datos.nombre.trim(),
    apellido: datos.apellido.trim(),
    email: datos.email.trim().toLowerCase(),
    celular: datos.celular.trim(),
    cuit: normalizeCuit(datos.cuit.trim()),
    empresa: datos.empresa.trim(),
    web: datos.web.trim(),
    aceptaTerminos: true,
  }
}

export async function submitLead({
  payload,
  endpoint,
  secret,
  fetchImpl = fetch,
}: {
  payload: SubmitPayload
  endpoint: string
  secret: string
  fetchImpl?: typeof fetch
}): Promise<SubmitResult> {
  const response = await fetchImpl(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-precio-form-secret": secret,
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error(`precio_lead respondió ${response.status}`)
  }

  const body: unknown = await response.json().catch(() => null)
  const visitorEmailSent =
    typeof body === "object" &&
    body !== null &&
    (body as { visitorEmailSent?: unknown }).visitorEmailSent === true

  return { visitorEmailSent, simulated: false }
}
```

- [ ] **Step 4: Correr los tests**

Run: `npm test lib/precio-submit.test.ts`
Expected: PASS.

- [ ] **Step 5: Crear la pantalla de confirmación**

Tres variantes de copy según qué pasó de verdad con el mail. Nunca dice "te mandamos un mail" si no salió.

`components/precio/confirmacion.tsx`:

```tsx
"use client"

import type { Quote } from "@/lib/precio-quote"
import type { DatosLead } from "@/lib/precio-lead"
import type { SubmitResult } from "@/lib/precio-submit"
import type { Readiness } from "@/lib/precio-readiness"
import { pagoConfig, precioCopy } from "@/content/precio"
import { CopyField } from "./copy-field"
import { cn } from "@/lib/utils"

export function Confirmacion({
  quote,
  datos,
  resultado,
  readiness,
  radarOpt,
}: {
  quote: Quote
  datos: DatosLead
  resultado: SubmitResult
  readiness: Readiness
  /** Si el visitante pidió agendar el Radar en el paso 1. Sólo importa con Radar. */
  radarOpt: boolean
}) {
  const copy = precioCopy.confirmacion
  const t = precioCopy.pago.transferencia

  const mensaje = resultado.simulated
    ? copy.mailSimulado
    : resultado.visitorEmailSent
      ? copy.mailEnviado(datos.email.trim().toLowerCase())
      : copy.mailNoEnviado

  // El bloque de agendar sólo aplica al Radar y sólo si lo pidió en el paso 1.
  const mostrarAgendar = quote.diag === "radar" && radarOpt

  return (
    <div className="text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-teal">
        <span aria-hidden="true" className="text-2xl text-on-brand">
          ✓
        </span>
      </div>
      <h2 className="mt-4 font-display text-3xl font-bold text-ink">{copy.title}</h2>
      <p className="mx-auto mt-3 max-w-md text-ink-70">{mensaje}</p>

      {quote.diag !== "radar" && (
        <p className="mx-auto mt-2 max-w-md text-sm text-ink-70">
          {copy.equipoContacta(quote.diagLabel)}
        </p>
      )}

      {/* Si el mail no salió, las instrucciones de pago tienen que estar acá:
          el visitante no puede quedarse sin saber cómo pagar. */}
      {!resultado.visitorEmailSent && !resultado.simulated && readiness.transferencia && (
        <div className="mt-6 rounded-md border border-line bg-paper-soft p-5 text-left">
          <h3 className="font-display text-base font-bold text-ink">{t.titulo}</h3>
          <div className="mt-3">
            <CopyField label={t.labels.titular} value={pagoConfig.transferencia.titular} />
            <CopyField label={t.labels.cuit} value={pagoConfig.transferencia.cuit} />
            <CopyField label={t.labels.cbu} value={pagoConfig.transferencia.cbu} />
            <CopyField label={t.labels.alias} value={pagoConfig.transferencia.alias} />
          </div>
        </div>
      )}

      {mostrarAgendar && (
        <div className="mt-6 rounded-md border border-line bg-paper-soft p-5 text-left">
          <p className="text-sm text-ink-70">{copy.agendar.intro}</p>
          {!readiness.calendly && (
            <p className="mt-2 font-mono text-[10px] uppercase tracking-wider text-plum">
              {copy.agendar.pendiente}
            </p>
          )}
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            {(
              [
                { label: copy.agendar.una, url: pagoConfig.calendly.unaReunion, primary: false },
                {
                  label: copy.agendar.cuatro,
                  url: pagoConfig.calendly.cuatroReuniones,
                  primary: true,
                },
              ] as const
            ).map(({ label, url, primary }) => (
              <a
                key={label}
                href={url || undefined}
                target="_blank"
                rel="noopener noreferrer"
                aria-disabled={!url}
                onClick={(e) => {
                  if (!url) e.preventDefault()
                }}
                className={cn(
                  "flex-1 rounded px-5 py-2.5 text-center text-sm font-bold",
                  !url
                    ? "cursor-not-allowed bg-taupe text-on-brand"
                    : primary
                      ? "bg-teal text-on-brand"
                      : "border border-line text-ink-70 hover:bg-paper",
                )}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 6: Conectar el envío en el wizard**

En `components/precio/wizard.tsx`:

1. Imports:

```tsx
import { Confirmacion } from "./confirmacion"
import { buildSubmitPayload, submitLead, type SubmitResult } from "@/lib/precio-submit"
```

2. Estado nuevo: `const [resultado, setResultado] = useState<SubmitResult | null>(null)`

3. Reemplazar el `onConfirmar` placeholder del paso 4 por `onConfirmar={confirmar}` y agregar antes del `return`:

```tsx
  const confirmar = async () => {
    setErrorEnvio(null)

    // En maqueta no se toca la red: se simula el éxito para poder recorrer el
    // flujo completo antes de que exista el backend.
    if (mockup) {
      setResultado({ visitorEmailSent: false, simulated: true })
      irA(5)
      return
    }

    const endpoint = process.env.NEXT_PUBLIC_SUPABASE_URL
      ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/precio_lead`
      : ""
    const secret = process.env.NEXT_PUBLIC_PRECIO_FORM_SECRET ?? ""

    if (!endpoint || !secret) {
      // Producción sin backend configurado: no se finge un envío.
      console.error("precio: falta NEXT_PUBLIC_SUPABASE_URL o NEXT_PUBLIC_PRECIO_FORM_SECRET.")
      setErrorEnvio(precioCopy.pago.errorEnvio)
      return
    }

    setEnviando(true)
    try {
      const result = await submitLead({
        payload: buildSubmitPayload(state, datos),
        endpoint,
        secret,
      })
      setResultado(result)
      irA(5)
    } catch (error) {
      console.error("precio: falló el envío del lead", error)
      setErrorEnvio(precioCopy.pago.errorEnvio)
    } finally {
      setEnviando(false)
    }
  }
```

4. Después del bloque de `paso === 4`:

```tsx
      {paso === 5 && resultado && (
        <Confirmacion
          quote={quote}
          datos={datos}
          resultado={resultado}
          readiness={readiness}
          radarOpt={state.radarOpt}
        />
      )}
```

5. La barra de progreso sigue mostrando 4 pasos; el 5 es la confirmación. Cambiar la clase del punto para que quede todo completo: en el `cn` de los `<li>`, reemplazar la condición por

```tsx
              n === paso ? "bg-teal" : n < paso ? "bg-teal/60" : "bg-line",
```

que con `paso === 5` deja los cuatro en `bg-teal/60`. (Ya es así: no hace falta cambio, sólo verificarlo.)

- [ ] **Step 7: Verificar en el browser**

- Recorrer el flujo completo en modo maqueta: confirmar lleva a la pantalla de "Listo" con el texto de maqueta que aclara que no se envió nada.
- Con Radar: aparece el bloque de agendar con los dos botones en gris y el chip de "Agenda pendiente de configurar".
- Con Mapa: no aparece el bloque de agendar, y sí la línea de que el equipo se contacta para coordinar el Mapa del Método.

- [ ] **Step 8: Type check y commit**

```bash
cd /Users/mok/Sites/innovas/site
npm test && npx tsc --noEmit
git add lib/precio-submit.ts lib/precio-submit.test.ts components/precio/confirmacion.tsx components/precio/wizard.tsx
git commit -m "feat: envío del lead y pantalla de confirmación de /precio"
```

---

## Task 12: Panel de pendientes

**Repo:** sitio

**Files:**
- Create: `components/precio/pending-panel.tsx`
- Modify: `app/precio/page.tsx`

**Interfaces:**
- Consumes: `Readiness` (Task 3), `precioCopy` (Task 2).
- Produces: `<PendingPanel readiness={Readiness} />`

- [ ] **Step 1: Crear el panel**

Cada item dice exactamente dónde se completa, para que no haya que leer el código para saberlo.

`components/precio/pending-panel.tsx`:

```tsx
import type { Readiness } from "@/lib/precio-readiness"
import { precioCopy } from "@/content/precio"
import { cn } from "@/lib/utils"

const ITEMS: {
  key: keyof Omit<Readiness, "launchReady">
  titulo: string
  donde: string
}[] = [
  {
    key: "mercadoPago",
    titulo: "Links de pago de Mercado Pago (uno por USD 1.500 y uno por USD 7.500)",
    donde: "content/precio.ts → pagoConfig.mercadoPagoLinks (url y creadoEl)",
  },
  {
    key: "transferencia",
    titulo: "Datos de transferencia: titular, CUIT, CBU y alias",
    donde: "content/precio.ts → pagoConfig.transferencia",
  },
  {
    key: "calendly",
    titulo: "Dos URLs de Calendly distintas: 1 reunión y las 4 del Radar",
    donde: "content/precio.ts → pagoConfig.calendly",
  },
  {
    key: "backend",
    titulo: "Edge Function precio_lead conectada",
    donde: "Variables de entorno NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_PRECIO_FORM_SECRET",
  },
  {
    key: "mailVisitante",
    titulo: "hola@innov.as verificado como sender signature en Postmark",
    donde: "content/precio.ts → pagoConfig.visitorEmailSenderVerified (flag manual)",
  },
]

export function PendingPanel({ readiness }: { readiness: Readiness }) {
  const copy = precioCopy.maqueta
  const listos = ITEMS.filter((i) => readiness[i.key]).length

  return (
    <aside className="mx-auto mb-12 max-w-2xl rounded-md border border-plum bg-paper-soft p-5">
      <h2 className="flex items-baseline justify-between gap-3 font-display text-base font-bold text-ink">
        {copy.panelTitulo}
        <span className="font-mono text-xs font-normal text-ink-40">
          {listos}/{ITEMS.length}
        </span>
      </h2>
      <p className="mt-1 text-xs text-ink-40">{copy.panelIntro}</p>
      <ul className="mt-4 flex flex-col gap-3">
        {ITEMS.map((item) => {
          const listo = readiness[item.key]
          return (
            <li key={item.key} className="flex gap-3">
              <span
                aria-hidden="true"
                className={cn("font-mono text-sm", listo ? "text-teal" : "text-plum")}
              >
                {listo ? "✓" : "○"}
              </span>
              <span>
                <span className="block text-sm text-ink">
                  {item.titulo}{" "}
                  <span
                    className={cn(
                      "font-mono text-[10px] uppercase tracking-wider",
                      listo ? "text-teal" : "text-plum",
                    )}
                  >
                    {listo ? copy.listo : copy.pendiente}
                  </span>
                </span>
                {!listo && (
                  <span className="mt-0.5 block font-mono text-[11px] text-ink-40">
                    {item.donde}
                  </span>
                )}
              </span>
            </li>
          )
        })}
      </ul>
    </aside>
  )
}
```

- [ ] **Step 2: Renderizarlo en la página**

En `app/precio/page.tsx`:

1. Import: `import { PendingPanel } from "@/components/precio/pending-panel"`
2. Dentro de la `<section className="pt-16">`, antes del `<PrecioWizard ...>`:

```tsx
          {mockup && (
            <div className="px-6">
              <PendingPanel readiness={readiness} />
            </div>
          )}
```

- [ ] **Step 3: Verificar en el browser**

- Con la config vacía: el panel dice `0/5` y los cinco items en "Pendiente" con su ubicación.
- Completar `pagoConfig.transferencia` con datos de prueba y recargar: el panel pasa a `1/5`, ese item queda en ✓ "Listo", y en el paso 4 la tarjeta de transferencia deja de tener el chip de pendiente y aparecen los botones de copiar.

- [ ] **Step 4: Type check y commit**

```bash
cd /Users/mok/Sites/innovas/site
npx tsc --noEmit
git add components/precio/pending-panel.tsx app/precio/page.tsx
git commit -m "feat: panel de pendientes de /precio en modo maqueta"
```

---

## Task 13: Exposición pública condicionada al readiness

**Repo:** sitio

**Files:**
- Modify: `app/sitemap.ts`
- Modify: `content/global.ts`
- Modify: `components/navbar.tsx`

**Interfaces:**
- Consumes: `computeReadiness` (Task 3), `pagoConfig` (Task 2).
- Produces: `const precioLaunchReady: boolean` exportado de `lib/precio-readiness.ts`, y `navLinks` filtrado.

- [ ] **Step 1: Exportar el readiness resuelto**

`pagoConfig` ya está importado como valor desde la Task 3 (para el `typeof
pagoConfig` de `PagoConfig`), así que no hace falta agregar un import nuevo.
Al final de `lib/precio-readiness.ts`, agregar:

```ts
/**
 * Readiness resuelto con la configuración y el entorno reales. Se usa para
 * decidir si `/precio` se indexa, entra al sitemap y aparece en el navbar: la
 * página existe siempre, pero no se promociona hasta estar completa.
 */
export const precioReadiness = computeReadiness(pagoConfig, {
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
  formSecret: process.env.NEXT_PUBLIC_PRECIO_FORM_SECRET,
})

export const precioLaunchReady = precioReadiness.launchReady
```

- [ ] **Step 2: Usarlo en la página en vez de recalcularlo**

En `app/precio/page.tsx`, reemplazar el bloque

```tsx
const readiness = computeReadiness(pagoConfig, {
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
  formSecret: process.env.NEXT_PUBLIC_PRECIO_FORM_SECRET,
})
```

por

```tsx
import { precioReadiness as readiness } from "@/lib/precio-readiness"
```

y quitar el import de `computeReadiness`.

- [ ] **Step 3: Excluir `/precio` del sitemap hasta que esté lista**

`app/sitemap.ts` completo:

```ts
import type { MetadataRoute } from "next"
import { seo } from "@/content/seo"
import { precioLaunchReady } from "@/lib/precio-readiness"

const baseUrl = "https://innov.as"

export default function sitemap(): MetadataRoute.Sitemap {
  return Object.keys(seo)
    .filter((route) => !route.startsWith("/desde-adentro"))
    // /precio existe siempre, pero no se ofrece a los buscadores hasta que se
    // pueda cobrar de verdad. Mismo criterio que el noindex de la página.
    .filter((route) => route !== "/precio" || precioLaunchReady)
    .map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
    }))
}
```

- [ ] **Step 4: Agregar el link de nav, apagado hasta el lanzamiento**

En `content/global.ts`, agregar el import y el campo opcional al link:

```ts
import { precioLaunchReady } from "@/lib/precio-readiness"
```

y reemplazar `navLinks` por:

```ts
export const navLinks: NavLink[] = [
  { label: "Soluciones", href: "/soluciones" },
  // Se muestra recién cuando /precio puede cobrar de verdad (ver precio-readiness).
  ...(precioLaunchReady ? [{ label: "Precios", href: "/precio" }] : []),
  { label: "Nosotros", href: "/nosotros" },
  { label: "Contacto", href: "/contacto" },
]
```

Y en `footerColumns`, dentro de la columna "Sitemap", agregar el mismo spread después de Soluciones:

```ts
      ...(precioLaunchReady ? [{ label: "Precios", href: "/precio" }] : []),
```

`components/navbar.tsx` no necesita cambios: ya itera `navLinks`.

- [ ] **Step 5: Verificar**

Run: `npm run dev`
- `http://localhost:3300/precio` sigue funcionando.
- El navbar **no** muestra "Precios" (falta configuración).
- `http://localhost:3300/sitemap.xml` no incluye `/precio`.
- En el HTML de `/precio`, la meta de robots dice `noindex`.

- [ ] **Step 6: Type check, tests y commit**

```bash
cd /Users/mok/Sites/innovas/site
npm test && npx tsc --noEmit && npm run build
git add lib/precio-readiness.ts app/precio/page.tsx app/sitemap.ts content/global.ts
git commit -m "feat: /precio no se indexa ni se promociona hasta poder cobrar"
```

---

## Task 14: Cotización del lado del servidor

**Repo:** CRM (`/Users/mok/Sites/innovas/crm`)

**Files:**
- Create: `supabase/functions/precio_lead/computeQuote.ts`
- Test: `supabase/functions/precio_lead/computeQuote.test.ts`

**Interfaces:**
- Consumes: nada. Módulo sin imports, para que corra igual en Deno y en el proyecto `functions` de vitest.
- Produces: `type Diagnostico`, `const CATALOGO`, `interface Quote`, `function computeQuote(...)`. Mismas firmas que `lib/precio-quote.ts` del sitio.

- [ ] **Step 1: Escribir el test espejado**

Los mismos cuatro escenarios y los mismos montos literales que `lib/precio-quote.test.ts` del sitio. Ese espejado es lo que evita que un precio cambie en un repo y no en el otro.

`supabase/functions/precio_lead/computeQuote.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { computeQuote } from "./computeQuote.ts";

/**
 * ESPEJADO en el repo del sitio: lib/precio-quote.test.ts
 * Mismos montos literales a propósito. Si cambia un precio, tienen que cambiar
 * los dos archivos o uno de los dos queda rojo.
 */
describe("computeQuote", () => {
  it("radar sin Ola Starter", () => {
    expect(computeQuote({ diag: "radar", olaStarter: false })).toEqual({
      diag: "radar",
      diagLabel: "Radar",
      diagValue: 1500,
      diagBonificado: false,
      olaStarter: false,
      olaStarterBruto: 0,
      creditApplied: 0,
      totalPrograma: 1500,
      montoPrimerPago: 1500,
      cuotasRestantes: 0,
      mensualDesdeMes5: null,
    });
  });

  it("radar con Ola Starter: bonificado, primer pago de una cuota", () => {
    expect(computeQuote({ diag: "radar", olaStarter: true })).toEqual({
      diag: "radar",
      diagLabel: "Radar",
      diagValue: 1500,
      diagBonificado: true,
      olaStarter: true,
      olaStarterBruto: 6000,
      creditApplied: 0,
      totalPrograma: 6000,
      montoPrimerPago: 1500,
      cuotasRestantes: 3,
      mensualDesdeMes5: 1500,
    });
  });

  it("mapa sin Ola Starter", () => {
    expect(computeQuote({ diag: "mapa", olaStarter: false })).toEqual({
      diag: "mapa",
      diagLabel: "Mapa del Método",
      diagValue: 7500,
      diagBonificado: false,
      olaStarter: false,
      olaStarterBruto: 0,
      creditApplied: 0,
      totalPrograma: 7500,
      montoPrimerPago: 7500,
      cuotasRestantes: 0,
      mensualDesdeMes5: null,
    });
  });

  it("mapa con Ola Starter: acredita 6000, pago único de 7500", () => {
    expect(computeQuote({ diag: "mapa", olaStarter: true })).toEqual({
      diag: "mapa",
      diagLabel: "Mapa del Método",
      diagValue: 7500,
      diagBonificado: false,
      olaStarter: true,
      olaStarterBruto: 6000,
      creditApplied: 6000,
      totalPrograma: 7500,
      montoPrimerPago: 7500,
      cuotasRestantes: 0,
      mensualDesdeMes5: 1500,
    });
  });
});
```

- [ ] **Step 2: Correr el test para verificar que falla**

Run: `cd /Users/mok/Sites/innovas/crm && npm run test:unit:functions -- computeQuote`
Expected: FAIL — no se puede resolver `./computeQuote.ts`.

- [ ] **Step 3: Implementar**

Copiar la lógica del sitio, con las extensiones `.ts` en los imports que pide Deno (este módulo no importa nada, así que no aplica) y sin el `montosPrimerPagoPosibles`, que sólo lo necesita el front.

`supabase/functions/precio_lead/computeQuote.ts`:

```ts
/**
 * Lógica de cotización de "En Paralelo", del lado del servidor.
 *
 * ESPEJADO del repo del sitio (`lib/precio-quote.ts`). Existe acá porque la
 * función NO confía en montos enviados por el browser: el payload trae sólo la
 * selección y los montos se recalculan. Los tests de los dos lados usan los
 * mismos montos literales.
 *
 * Sin imports a propósito: corre igual bajo Deno y bajo el proyecto "functions"
 * de Vitest.
 */

export type Diagnostico = "radar" | "mapa";

export const CATALOGO = {
  radar: { valor: 1500, label: "Radar" },
  mapa: { valor: 7500, label: "Mapa del Método" },
  planMensual: 1500,
  planNombre: "PRO",
  olaStarterCuotas: 4,
} as const;

export interface Quote {
  diag: Diagnostico;
  diagLabel: string;
  diagValue: number;
  diagBonificado: boolean;
  olaStarter: boolean;
  olaStarterBruto: number;
  creditApplied: number;
  totalPrograma: number;
  montoPrimerPago: number;
  cuotasRestantes: number;
  mensualDesdeMes5: number | null;
}

export function computeQuote({
  diag,
  olaStarter,
}: {
  diag: Diagnostico;
  olaStarter: boolean;
}): Quote {
  const diagValue = CATALOGO[diag].valor;
  const diagLabel = CATALOGO[diag].label;

  if (!olaStarter) {
    return {
      diag,
      diagLabel,
      diagValue,
      diagBonificado: false,
      olaStarter: false,
      olaStarterBruto: 0,
      creditApplied: 0,
      totalPrograma: diagValue,
      montoPrimerPago: diagValue,
      cuotasRestantes: 0,
      mensualDesdeMes5: null,
    };
  }

  const olaStarterBruto = CATALOGO.planMensual * CATALOGO.olaStarterCuotas;

  // Con Radar el diagnóstico se bonifica: no entra ni como cobro ni como crédito.
  const diagBonificado = diag === "radar";
  const diagCobrable = diagBonificado ? 0 : diagValue;
  const creditApplied = Math.min(diagCobrable, olaStarterBruto);
  const totalPrograma = diagCobrable + (olaStarterBruto - creditApplied);

  const enCuotas = diagBonificado;

  return {
    diag,
    diagLabel,
    diagValue,
    diagBonificado,
    olaStarter: true,
    olaStarterBruto,
    creditApplied,
    totalPrograma,
    montoPrimerPago: enCuotas ? CATALOGO.planMensual : totalPrograma,
    cuotasRestantes: enCuotas ? CATALOGO.olaStarterCuotas - 1 : 0,
    mensualDesdeMes5: CATALOGO.planMensual,
  };
}
```

- [ ] **Step 4: Correr el test**

Run: `npm run test:unit:functions -- computeQuote`
Expected: 4 tests PASS.

- [ ] **Step 5: Commit**

```bash
cd /Users/mok/Sites/innovas/crm
git add supabase/functions/precio_lead/computeQuote.ts supabase/functions/precio_lead/computeQuote.test.ts
git commit -m "feat(precio_lead): cotización recalculada del lado del servidor"
```

---

## Task 15: Validación del payload

**Repo:** CRM

**Files:**
- Create: `supabase/functions/precio_lead/validateQuotePayload.ts`
- Test: `supabase/functions/precio_lead/validateQuotePayload.test.ts`

**Interfaces:**
- Consumes: `Diagnostico` de `./computeQuote.ts`.
- Produces:
  - `const MAX_LENGTHS`, `const FIELD_LABELS`
  - `interface QuotePayload { diag: Diagnostico; olaStarter: boolean; radarOpt: boolean; nombre: string; apellido: string; email: string; celular: string; cuit: string; empresa: string; web: string | null }`
  - `interface ValidationError { field: string; message: string }`
  - `type ValidationResult = { data: QuotePayload; error?: undefined } | { data?: undefined; error: ValidationError }`
  - `function validateQuotePayload(body: any): ValidationResult`

- [ ] **Step 1: Escribir los tests que fallan**

`supabase/functions/precio_lead/validateQuotePayload.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { validateQuotePayload } from "./validateQuotePayload.ts";

const valido = {
  diag: "radar",
  olaStarter: true,
  radarOpt: true,
  nombre: "Matías",
  apellido: "O'Keefe",
  email: "Matias@INNOV.as",
  celular: "+54 9 11 1234 5678",
  cuit: "30-71234567-9",
  empresa: "INNOV.AS",
  web: "www.innov.as",
  aceptaTerminos: true,
};

describe("validateQuotePayload", () => {
  it("normaliza un payload válido", () => {
    const { data, error } = validateQuotePayload(valido);
    expect(error).toBeUndefined();
    expect(data).toEqual({
      diag: "radar",
      olaStarter: true,
      radarOpt: true,
      nombre: "Matías",
      apellido: "O'Keefe",
      email: "matias@innov.as",
      celular: "+54 9 11 1234 5678",
      cuit: "30-71234567-9",
      empresa: "INNOV.AS",
      web: "www.innov.as",
    });
  });

  it("rechaza un body que no sea objeto", () => {
    expect(validateQuotePayload(null).error?.field).toBe("body");
    expect(validateQuotePayload([]).error?.field).toBe("body");
    expect(validateQuotePayload("hola").error?.field).toBe("body");
  });

  it("rechaza un diagnóstico desconocido", () => {
    expect(validateQuotePayload({ ...valido, diag: "otro" }).error?.field).toBe("diag");
  });

  it("rechaza olaStarter y radarOpt que no sean booleanos", () => {
    expect(validateQuotePayload({ ...valido, olaStarter: "si" }).error?.field).toBe("olaStarter");
    expect(validateQuotePayload({ ...valido, radarOpt: 1 }).error?.field).toBe("radarOpt");
  });

  it("exige la aceptación de términos", () => {
    expect(validateQuotePayload({ ...valido, aceptaTerminos: false }).error?.field).toBe(
      "aceptaTerminos",
    );
    const sinTerminos = { ...valido } as Record<string, unknown>;
    delete sinTerminos.aceptaTerminos;
    expect(validateQuotePayload(sinTerminos).error?.field).toBe("aceptaTerminos");
  });

  it("rechaza un email inválido", () => {
    expect(validateQuotePayload({ ...valido, email: "matias@innovas" }).error?.field).toBe("email");
  });

  it("rechaza un CUIT con dígito verificador equivocado", () => {
    expect(validateQuotePayload({ ...valido, cuit: "30-71234567-0" }).error?.field).toBe("cuit");
  });

  it("acepta el CUIT sin guiones y lo normaliza", () => {
    expect(validateQuotePayload({ ...valido, cuit: "30712345679" }).data?.cuit).toBe(
      "30-71234567-9",
    );
  });

  it("rechaza campos requeridos vacíos", () => {
    for (const field of ["nombre", "apellido", "celular", "empresa"]) {
      expect(validateQuotePayload({ ...valido, [field]: "   " }).error?.field).toBe(field);
    }
  });

  it("rechaza campos por encima del largo máximo", () => {
    expect(validateQuotePayload({ ...valido, nombre: "a".repeat(201) }).error?.field).toBe("nombre");
  });

  it("la web es opcional y se normaliza a null cuando falta", () => {
    for (const web of ["", "   ", undefined, null]) {
      expect(validateQuotePayload({ ...valido, web }).data?.web).toBeNull();
    }
  });

  it("apaga radarOpt cuando el diagnóstico no es Radar, sin fallar", () => {
    const { data } = validateQuotePayload({ ...valido, diag: "mapa", radarOpt: true });
    expect(data?.radarOpt).toBe(false);
  });

  it("ignora campos extra, incluidos montos que un cliente pudiera inventar", () => {
    const { data } = validateQuotePayload({ ...valido, totalPrograma: 1, montoPrimerPago: 1 });
    expect(data).not.toHaveProperty("totalPrograma");
    expect(data).not.toHaveProperty("montoPrimerPago");
  });
});
```

- [ ] **Step 2: Correr el test para verificar que falla**

Run: `npm run test:unit:functions -- validateQuotePayload`
Expected: FAIL — no se puede resolver `./validateQuotePayload.ts`.

- [ ] **Step 3: Implementar**

`supabase/functions/precio_lead/validateQuotePayload.ts`:

```ts
import type { Diagnostico } from "./computeQuote.ts";

/**
 * Topes de largo del formulario de /precio. Generosos pero acotados, para
 * rechazar payloads obviamente abusivos antes de tocar la base.
 */
export const MAX_LENGTHS = {
  nombre: 200,
  apellido: 200,
  email: 255,
  celular: 30,
  cuit: 20,
  empresa: 200,
  web: 255,
} as const;

/** Etiquetas del formulario, para mensajes de error legibles. */
export const FIELD_LABELS: Record<string, string> = {
  diag: "Diagnóstico",
  olaStarter: "Ola Starter",
  radarOpt: "Agendar el Radar",
  aceptaTerminos: "Términos y Condiciones",
  nombre: "Nombre",
  apellido: "Apellido",
  email: "Email",
  celular: "Celular",
  cuit: "CUIT",
  empresa: "Nombre de la empresa",
  web: "Página web",
};

export interface QuotePayload {
  diag: Diagnostico;
  olaStarter: boolean;
  radarOpt: boolean;
  nombre: string;
  apellido: string;
  email: string;
  celular: string;
  cuit: string;
  empresa: string;
  web: string | null;
}

export interface ValidationError {
  field: string;
  message: string;
}

export type ValidationResult =
  | { data: QuotePayload; error?: undefined }
  | { data?: undefined; error: ValidationError };

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DIAGS: Diagnostico[] = ["radar", "mapa"];
const CUIT_PESOS = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];

/**
 * Valida los 11 dígitos y el dígito verificador (módulo 11).
 * ESPEJADO del repo del sitio: lib/precio-lead.ts
 */
function cuitValido(value: string): boolean {
  if (!/^[\d\s-]+$/.test(value)) return false;
  const digitos = value.replace(/\D/g, "");
  if (digitos.length !== 11) return false;
  const suma = CUIT_PESOS.reduce(
    (acc, peso, i) => acc + peso * Number(digitos[i]),
    0,
  );
  const resto = suma % 11;
  const esperado = resto === 0 ? 0 : resto === 1 ? 9 : 11 - resto;
  return Number(digitos[10]) === esperado;
}

function normalizeCuit(value: string): string {
  const d = value.replace(/\D/g, "");
  return `${d.slice(0, 2)}-${d.slice(2, 10)}-${d.slice(10)}`;
}

function err(field: string, message: string): ValidationResult {
  return { error: { field, message } };
}

function requiredString(
  value: unknown,
  field: keyof typeof MAX_LENGTHS,
): { value: string } | { error: ValidationError } {
  if (typeof value !== "string" || value.trim().length === 0) {
    return { error: { field, message: `${FIELD_LABELS[field]} is required` } };
  }
  const trimmed = value.trim();
  if (trimmed.length > MAX_LENGTHS[field]) {
    return {
      error: {
        field,
        message: `${FIELD_LABELS[field]} must be at most ${MAX_LENGTHS[field]} characters`,
      },
    };
  }
  return { value: trimmed };
}

/**
 * Valida y normaliza el body del formulario de /precio.
 *
 * Sólo lee los campos reconocidos: cualquier clave extra se ignora. Eso incluye
 * montos: si un cliente manipulado manda `totalPrograma`, no llega a ninguna
 * parte, porque los montos los recalcula `computeQuote`.
 */
export function validateQuotePayload(
  // deno-lint-ignore no-explicit-any
  body: any,
): ValidationResult {
  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    return err("body", "Payload must be a JSON object");
  }

  if (!DIAGS.includes(body.diag)) {
    return err("diag", `${FIELD_LABELS.diag} must be one of: ${DIAGS.join(", ")}`);
  }
  const diag = body.diag as Diagnostico;

  if (typeof body.olaStarter !== "boolean") {
    return err("olaStarter", `${FIELD_LABELS.olaStarter} must be a boolean`);
  }
  if (typeof body.radarOpt !== "boolean") {
    return err("radarOpt", `${FIELD_LABELS.radarOpt} must be a boolean`);
  }

  // El checkbox de términos es el compromiso comercial y legal: sin eso no se
  // registra nada.
  if (body.aceptaTerminos !== true) {
    return err("aceptaTerminos", `${FIELD_LABELS.aceptaTerminos} must be accepted`);
  }

  const campos: (keyof typeof MAX_LENGTHS)[] = [
    "nombre",
    "apellido",
    "email",
    "celular",
    "cuit",
    "empresa",
  ];
  const valores: Record<string, string> = {};
  for (const field of campos) {
    const result = requiredString(body[field], field);
    if ("error" in result) return { error: result.error };
    valores[field] = result.value;
  }

  const email = valores.email.toLowerCase();
  if (!EMAIL_REGEX.test(email)) {
    return err("email", `${FIELD_LABELS.email} must be a valid email address`);
  }

  if (!cuitValido(valores.cuit)) {
    return err("cuit", `${FIELD_LABELS.cuit} must be a valid CUIT`);
  }

  let web: string | null = null;
  if (typeof body.web === "string" && body.web.trim().length > 0) {
    const trimmed = body.web.trim();
    if (trimmed.length > MAX_LENGTHS.web) {
      return err(
        "web",
        `${FIELD_LABELS.web} must be at most ${MAX_LENGTHS.web} characters`,
      );
    }
    web = trimmed;
  }

  return {
    data: {
      diag,
      olaStarter: body.olaStarter,
      // Agendar sólo existe para el Radar. Se apaga en silencio en vez de
      // rechazar el envío: es una preferencia, no un error del visitante.
      radarOpt: diag === "radar" ? body.radarOpt : false,
      nombre: valores.nombre,
      apellido: valores.apellido,
      email,
      celular: valores.celular,
      cuit: normalizeCuit(valores.cuit),
      empresa: valores.empresa,
      web,
    },
  };
}
```

- [ ] **Step 4: Correr el test**

Run: `npm run test:unit:functions -- validateQuotePayload`
Expected: todos PASS.

- [ ] **Step 5: Commit**

```bash
cd /Users/mok/Sites/innovas/crm
git add supabase/functions/precio_lead/validateQuotePayload.ts supabase/functions/precio_lead/validateQuotePayload.test.ts
git commit -m "feat(precio_lead): validación del payload del cotizador"
```

---

## Task 16: Nota del CRM y row del deal

**Repo:** CRM

**Files:**
- Create: `supabase/functions/precio_lead/buildQuoteNoteText.ts`
- Test: `supabase/functions/precio_lead/buildQuoteNoteText.test.ts`
- Create: `supabase/functions/precio_lead/buildDealInsert.ts`
- Test: `supabase/functions/precio_lead/buildDealInsert.test.ts`

**Interfaces:**
- Consumes: `QuotePayload` (Task 15), `Quote` (Task 14).
- Produces:
  - `function buildQuoteNoteText(payload: QuotePayload, quote: Quote): string`
  - `interface DealInsert { name: string; company_id: number; contact_ids: number[]; category: string; stage: string; description: string; amount: number; sales_id: number }`
  - `function buildDealInsert(args: { payload: QuotePayload; quote: Quote; companyId: number; contactId: number; salesId: number; stage: string; category: string }): DealInsert`

- [ ] **Step 1: Escribir los tests que fallan**

`supabase/functions/precio_lead/buildQuoteNoteText.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { buildQuoteNoteText } from "./buildQuoteNoteText.ts";
import { computeQuote } from "./computeQuote.ts";
import type { QuotePayload } from "./validateQuotePayload.ts";

const payload: QuotePayload = {
  diag: "radar",
  olaStarter: true,
  radarOpt: true,
  nombre: "Matías",
  apellido: "O'Keefe",
  email: "matias@innov.as",
  celular: "+54 9 11 1234 5678",
  cuit: "30-71234567-9",
  empresa: "INNOV.AS",
  web: "www.innov.as",
};

describe("buildQuoteNoteText", () => {
  it("incluye el diagnóstico, Ola Starter, los montos y el CUIT", () => {
    const quote = computeQuote({ diag: payload.diag, olaStarter: payload.olaStarter });
    const text = buildQuoteNoteText(payload, quote);

    expect(text).toContain("Radar");
    expect(text).toContain("Ola Starter: sí");
    expect(text).toContain("Total del programa: USD 6000");
    expect(text).toContain("Primer pago: USD 1500");
    expect(text).toContain("CUIT: 30-71234567-9");
    expect(text).toContain("www.innov.as");
    expect(text).toContain("Agendar Radar: sí");
  });

  it("dice 'sin sitio' cuando no se completó la web", () => {
    const quote = computeQuote({ diag: "mapa", olaStarter: false });
    const text = buildQuoteNoteText({ ...payload, web: null, diag: "mapa" }, quote);
    expect(text).toContain("sin sitio");
  });

  it("no incluye la línea de agendar cuando el diagnóstico no es el Radar", () => {
    const quote = computeQuote({ diag: "mapa", olaStarter: false });
    const text = buildQuoteNoteText({ ...payload, diag: "mapa", radarOpt: false }, quote);
    expect(text).not.toContain("Agendar Radar");
  });
});
```

`supabase/functions/precio_lead/buildDealInsert.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { buildDealInsert } from "./buildDealInsert.ts";
import { computeQuote } from "./computeQuote.ts";
import type { QuotePayload } from "./validateQuotePayload.ts";

const payload: QuotePayload = {
  diag: "mapa",
  olaStarter: true,
  radarOpt: false,
  nombre: "Matías",
  apellido: "O'Keefe",
  email: "matias@innov.as",
  celular: "+54 9 11 1234 5678",
  cuit: "30-71234567-9",
  empresa: "INNOV.AS",
  web: null,
};

describe("buildDealInsert", () => {
  it("mapea el total del programa como amount, en USD", () => {
    const quote = computeQuote({ diag: payload.diag, olaStarter: payload.olaStarter });

    expect(
      buildDealInsert({
        payload,
        quote,
        companyId: 10,
        contactId: 20,
        salesId: 3,
        stage: "propuesta-economica",
        category: "transformacion-digital",
      }),
    ).toEqual({
      name: "En Paralelo — INNOV.AS",
      company_id: 10,
      contact_ids: [20],
      category: "transformacion-digital",
      stage: "propuesta-economica",
      description: expect.stringContaining("Mapa del Método"),
      amount: 7500,
      sales_id: 3,
    });
  });
});
```

- [ ] **Step 2: Correr los tests para verificar que fallan**

Run: `npm run test:unit:functions -- buildQuoteNoteText buildDealInsert`
Expected: FAIL — no se puede resolver ninguno de los dos módulos.

- [ ] **Step 3: Implementar**

`supabase/functions/precio_lead/buildQuoteNoteText.ts`:

```ts
import type { Quote } from "./computeQuote.ts";
import type { QuotePayload } from "./validateQuotePayload.ts";

/**
 * Texto de la nota que queda en el contacto del CRM con el detalle de la
 * cotización que se autogestionó. Mismo criterio que la nota de contact_form:
 * texto plano, una línea por dato.
 */
export function buildQuoteNoteText(payload: QuotePayload, quote: Quote): string {
  const lines = [
    `Cotización de En Paralelo — ${quote.diagLabel}`,
    `Ola Starter: ${payload.olaStarter ? "sí" : "no"}`,
    `Total del programa: USD ${quote.totalPrograma}`,
    `Primer pago: USD ${quote.montoPrimerPago}`,
    ...(quote.mensualDesdeMes5 !== null
      ? [`Abono desde el mes 5: USD ${quote.mensualDesdeMes5}/mes`]
      : []),
    `CUIT: ${payload.cuit}`,
    `Web: ${payload.web ?? "sin sitio"}`,
  ];

  if (payload.diag === "radar") {
    lines.push(`Agendar Radar: ${payload.radarOpt ? "sí" : "no"}`);
  }

  return lines.join("\n");
}
```

`supabase/functions/precio_lead/buildDealInsert.ts`:

```ts
import type { Quote } from "./computeQuote.ts";
import type { QuotePayload } from "./validateQuotePayload.ts";
import { buildQuoteNoteText } from "./buildQuoteNoteText.ts";

/** Row insertado en `public.deals` para una cotización autogestionada. */
export interface DealInsert {
  name: string;
  company_id: number;
  contact_ids: number[];
  category: string;
  stage: string;
  description: string;
  amount: number;
  sales_id: number;
}

/**
 * Mapeo puro al row de `deals`. `amount` es el total del programa en USD:
 * `deals.amount` no tiene columna de moneda, se asume que el pipeline está en
 * USD (ver la spec, sección "Riesgos conocidos").
 */
export function buildDealInsert({
  payload,
  quote,
  companyId,
  contactId,
  salesId,
  stage,
  category,
}: {
  payload: QuotePayload;
  quote: Quote;
  companyId: number;
  contactId: number;
  salesId: number;
  stage: string;
  category: string;
}): DealInsert {
  return {
    name: `En Paralelo — ${payload.empresa}`,
    company_id: companyId,
    contact_ids: [contactId],
    category,
    stage,
    description: buildQuoteNoteText(payload, quote),
    amount: quote.totalPrograma,
    sales_id: salesId,
  };
}
```

- [ ] **Step 4: Correr los tests**

Run: `npm run test:unit:functions -- buildQuoteNoteText buildDealInsert`
Expected: todos PASS.

- [ ] **Step 5: Commit**

```bash
cd /Users/mok/Sites/innovas/crm
git add supabase/functions/precio_lead/buildQuoteNoteText.ts supabase/functions/precio_lead/buildQuoteNoteText.test.ts supabase/functions/precio_lead/buildDealInsert.ts supabase/functions/precio_lead/buildDealInsert.test.ts
git commit -m "feat(precio_lead): texto de la nota y mapeo del deal"
```

---

## Task 17: Persistencia — contacto, empresa, nota y deal

**Repo:** CRM

**Files:**
- Create: `supabase/functions/precio_lead/createQuoteLead.ts`

**Interfaces:**
- Consumes: `QuotePayload` (Task 15), `computeQuote`, `Quote` (Task 14), `buildDealInsert` (Task 16), `buildQuoteNoteText` (Task 16), `supabaseAdmin` de `../_shared/supabaseAdmin.ts`.
- Produces: `function createQuoteLead(payload: QuotePayload): Promise<{ contactId: number; dealId: number; quote: Quote }>`

No lleva test unitario propio: sólo orquesta llamadas a Supabase (igual que `createLeadFromForm.ts`, que tampoco lo tiene). Se verifica con la prueba manual de la Task 20.

Este módulo **duplica** la resolución de `sales_id` y el get-or-create de empresa/contacto de `contact_form/createLeadFromForm.ts` en vez de importarlos. Es deliberado: cada Edge Function se despliega de forma independiente y hoy ninguna función comparte lógica de negocio con otra (`_shared/` sólo tiene infraestructura: cliente de Supabase, CORS, auth). Mantiene esa convención.

- [ ] **Step 1: Implementar**

`supabase/functions/precio_lead/createQuoteLead.ts`:

```ts
import { supabaseAdmin } from "../_shared/supabaseAdmin.ts";
import { computeQuote, type Quote } from "./computeQuote.ts";
import type { QuotePayload } from "./validateQuotePayload.ts";
import { buildDealInsert } from "./buildDealInsert.ts";
import { buildQuoteNoteText } from "./buildQuoteNoteText.ts";

/**
 * Resuelve el sales_id configurado, igual que contact_form/createLeadFromForm.ts.
 * Duplicado a propósito: ver el comentario de esta task en el plan.
 */
async function resolveSalesId(): Promise<number> {
  const salesEmail = (Deno.env.get("CONTACT_FORM_SALES_EMAIL") || "")
    .trim()
    .toLowerCase();
  if (!salesEmail) {
    throw new Error("Missing CONTACT_FORM_SALES_EMAIL env variable");
  }

  const { data: sales, error } = await supabaseAdmin
    .from("sales")
    .select("id")
    .eq("email", salesEmail)
    .neq("disabled", true)
    .maybeSingle();

  if (error) {
    throw new Error(
      `Could not fetch sales rep for email ${salesEmail}: ${error.message}`,
    );
  }
  if (!sales) {
    throw new Error(`No active sales rep found for email ${salesEmail}`);
  }
  return sales.id;
}

async function getOrCreateCompany({
  name,
  salesId,
}: {
  name: string;
  salesId: number;
}): Promise<{ id: number }> {
  const { data: existing, error: fetchError } = await supabaseAdmin
    .from("companies")
    .select("id")
    .eq("name", name)
    .maybeSingle();
  if (fetchError) {
    throw new Error(
      `Could not fetch company for name ${name}: ${fetchError.message}`,
    );
  }
  if (existing) return existing;

  const { data: created, error: createError } = await supabaseAdmin
    .from("companies")
    .insert({ name, sales_id: salesId })
    .select("id")
    .single();
  if (createError || !created) {
    throw new Error(
      `Could not create company for name ${name}: ${createError?.message}`,
    );
  }
  return created;
}

function splitFullName(fullName: string): { firstName: string; lastName: string } {
  const trimmed = fullName.trim();
  if (!trimmed.includes(" ")) return { firstName: "", lastName: trimmed };
  const parts = trimmed.split(" ");
  return { firstName: parts[0], lastName: parts.slice(1).join(" ") };
}

async function getOrCreateContact({
  email,
  nombre,
  apellido,
  celular,
  companyId,
  salesId,
}: {
  email: string;
  nombre: string;
  apellido: string;
  celular: string;
  companyId: number;
  salesId: number;
}): Promise<{ id: number }> {
  const { data: existing, error: fetchError } = await supabaseAdmin
    .from("contacts")
    .select("id")
    .contains("email_jsonb", JSON.stringify([{ email }]))
    .maybeSingle();
  if (fetchError) {
    throw new Error(
      `Could not fetch contact for email ${email}: ${fetchError.message}`,
    );
  }

  const now = new Date().toISOString();

  if (existing) {
    const { error: updateError } = await supabaseAdmin
      .from("contacts")
      .update({ last_seen: now })
      .eq("id", existing.id);
    if (updateError) {
      throw new Error(
        `Could not refresh last_seen for contact ${existing.id}: ${updateError.message}`,
      );
    }
    return { id: existing.id };
  }

  // El payload ya trae nombre y apellido por separado (a diferencia de
  // contact_form, que recibe un nombre completo): se usan directo.
  const { firstName, lastName } = { firstName: nombre, lastName: apellido };
  void splitFullName; // no se usa acá; queda documentado por qué (ver arriba).

  const { data: created, error: createError } = await supabaseAdmin
    .from("contacts")
    .insert({
      first_name: firstName,
      last_name: lastName,
      email_jsonb: [{ email, type: "Work" }],
      phone_jsonb: [{ number: celular, type: "Work" }],
      company_id: companyId,
      sales_id: salesId,
      first_seen: now,
      last_seen: now,
      tags: [],
    })
    .select("id")
    .single();
  if (createError || !created) {
    throw new Error(
      `Could not create contact for email ${email}: ${createError?.message}`,
    );
  }
  return { id: created.id };
}

async function addNoteToContact({
  contactId,
  text,
  salesId,
}: {
  contactId: number;
  text: string;
  salesId: number;
}): Promise<void> {
  const { error } = await supabaseAdmin.from("contact_notes").insert({
    contact_id: contactId,
    text,
    sales_id: salesId,
  });
  if (error) {
    throw new Error(
      `Could not create note for contact ${contactId}: ${error.message}`,
    );
  }
}

async function createDeal(
  insert: ReturnType<typeof buildDealInsert>,
): Promise<{ id: number }> {
  const { data, error } = await supabaseAdmin
    .from("deals")
    .insert(insert)
    .select("id")
    .single();
  if (error || !data) {
    throw new Error(`Could not create deal: ${error?.message}`);
  }
  return data;
}

/**
 * Registra una cotización autogestionada: contacto + empresa + nota + deal,
 * asignados al rep configurado. Recalcula la cotización con `computeQuote`
 * (nunca confía en montos externos). Lanza en cualquier falla — el caller
 * (index.ts) debe convertirlo en 5xx y no intentar los mails.
 */
export async function createQuoteLead(
  payload: QuotePayload,
): Promise<{ contactId: number; dealId: number; quote: Quote }> {
  const quote = computeQuote({ diag: payload.diag, olaStarter: payload.olaStarter });
  const salesId = await resolveSalesId();

  const company = await getOrCreateCompany({ name: payload.empresa, salesId });
  const contact = await getOrCreateContact({
    email: payload.email,
    nombre: payload.nombre,
    apellido: payload.apellido,
    celular: payload.celular,
    companyId: company.id,
    salesId,
  });

  await addNoteToContact({
    contactId: contact.id,
    text: buildQuoteNoteText(payload, quote),
    salesId,
  });

  const stage = Deno.env.get("PRECIO_DEAL_STAGE") || "propuesta-economica";
  const category = Deno.env.get("PRECIO_DEAL_CATEGORY") || "transformacion-digital";

  const deal = await createDeal(
    buildDealInsert({
      payload,
      quote,
      companyId: company.id,
      contactId: contact.id,
      salesId,
      stage,
      category,
    }),
  );

  return { contactId: contact.id, dealId: deal.id, quote };
}
```

- [ ] **Step 2: Type check con Deno (si está instalado) o revisión manual**

Run: `cd /Users/mok/Sites/innovas/crm && deno check supabase/functions/precio_lead/createQuoteLead.ts 2>/dev/null || echo "Deno no disponible: se revisa en la Task 20 con supabase functions serve"`
Expected: sin errores de tipos, o el aviso de que se difiere a la Task 20.

- [ ] **Step 3: Commit**

```bash
cd /Users/mok/Sites/innovas/crm
git add supabase/functions/precio_lead/createQuoteLead.ts
git commit -m "feat(precio_lead): persistencia de contacto, empresa, nota y deal"
```

---

## Task 18: Contenido de los dos mails

**Repo:** CRM

**Files:**
- Create: `supabase/functions/precio_lead/buildSalesNotification.ts`
- Test: `supabase/functions/precio_lead/buildSalesNotification.test.ts`
- Create: `supabase/functions/precio_lead/buildVisitorInstructions.ts`
- Test: `supabase/functions/precio_lead/buildVisitorInstructions.test.ts`

**Interfaces:**
- Consumes: `QuotePayload` (Task 15), `Quote` (Task 14), reusa `escapeHtml`/`sanitizeForSubject` (reimplementadas acá, mismo criterio que Task 17 de no importar entre funciones).
- Produces:
  - `interface EmailContent { subject: string; textBody: string; htmlBody: string }`
  - `function buildSalesNotification(args: { payload: QuotePayload; quote: Quote; contactId: number; dealId: number; crmBaseUrl?: string }): EmailContent`
  - `interface MpLinkEnv { montoUsd: number; url: string }`
  - `interface TransferenciaEnv { titular: string; cuit: string; cbu: string; alias: string }`
  - `function buildVisitorInstructions(args: { payload: QuotePayload; quote: Quote; mpLink: MpLinkEnv | null; transferencia: TransferenciaEnv | null }): EmailContent`

- [ ] **Step 1: Escribir los tests que fallan**

`supabase/functions/precio_lead/buildSalesNotification.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { buildSalesNotification } from "./buildSalesNotification.ts";
import { computeQuote } from "./computeQuote.ts";
import type { QuotePayload } from "./validateQuotePayload.ts";

const payload: QuotePayload = {
  diag: "radar",
  olaStarter: true,
  radarOpt: true,
  nombre: "Matías",
  apellido: "O'Keefe",
  email: "matias@innov.as",
  celular: "+54 9 11 1234 5678",
  cuit: "30-71234567-9",
  empresa: "INNOV.AS",
  web: "www.innov.as",
};
const quote = computeQuote({ diag: payload.diag, olaStarter: payload.olaStarter });

describe("buildSalesNotification", () => {
  it("incluye el lead, la cotización y el link al deal cuando hay crmBaseUrl", () => {
    const msg = buildSalesNotification({
      payload,
      quote,
      contactId: 20,
      dealId: 55,
      crmBaseUrl: "https://crm.innov.as",
    });

    expect(msg.subject).toContain("INNOV.AS");
    expect(msg.textBody).toContain("matias@innov.as");
    expect(msg.textBody).toContain("USD 6000");
    expect(msg.textBody).toContain("https://crm.innov.as/#/deals/55/show");
    expect(msg.htmlBody).toContain("O&#39;Keefe");
  });

  it("omite el link al CRM cuando no hay crmBaseUrl", () => {
    const msg = buildSalesNotification({ payload, quote, contactId: 20, dealId: 55 });
    expect(msg.textBody).not.toContain("CRM link");
  });

  it("nunca deja que un nombre con salto de línea inyecte líneas en el subject", () => {
    const msg = buildSalesNotification({
      payload: { ...payload, nombre: "Matías\nBcc: atacante@evil.com" },
      quote,
      contactId: 20,
      dealId: 55,
    });
    expect(msg.subject).not.toContain("\n");
  });
});
```

`supabase/functions/precio_lead/buildVisitorInstructions.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { buildVisitorInstructions } from "./buildVisitorInstructions.ts";
import { computeQuote } from "./computeQuote.ts";
import type { QuotePayload } from "./validateQuotePayload.ts";

const payload: QuotePayload = {
  diag: "radar",
  olaStarter: true,
  radarOpt: true,
  nombre: "Matías",
  apellido: "O'Keefe",
  email: "matias@innov.as",
  celular: "+54 9 11 1234 5678",
  cuit: "30-71234567-9",
  empresa: "INNOV.AS",
  web: "www.innov.as",
};
const quote = computeQuote({ diag: payload.diag, olaStarter: payload.olaStarter });

const mpLink = { montoUsd: 1500, url: "https://mpago.la/aaa" };
const transferencia = {
  titular: "INNOV.AS SRL",
  cuit: "30-71234567-9",
  cbu: "0170099220000012345678",
  alias: "innovas.pagos",
};

describe("buildVisitorInstructions", () => {
  it("muestra el monto en USD, nunca en pesos", () => {
    const msg = buildVisitorInstructions({ payload, quote, mpLink, transferencia });
    expect(msg.textBody).toContain("USD 1500");
    expect(msg.textBody).not.toMatch(/ARS|\$\d/);
  });

  it("incluye el link de Mercado Pago cuando está configurado", () => {
    const msg = buildVisitorInstructions({ payload, quote, mpLink, transferencia });
    expect(msg.htmlBody).toContain("https://mpago.la/aaa");
  });

  it("omite Mercado Pago cuando no hay link para el monto", () => {
    const msg = buildVisitorInstructions({ payload, quote, mpLink: null, transferencia });
    expect(msg.textBody).not.toContain("Mercado Pago:");
  });

  it("omite transferencia cuando no está configurada", () => {
    const msg = buildVisitorInstructions({ payload, quote, mpLink, transferencia: null });
    expect(msg.textBody).not.toContain("CBU");
  });

  it("saluda por el nombre y escapa HTML en el cuerpo html", () => {
    const msg = buildVisitorInstructions({
      payload: { ...payload, nombre: "<script>alert(1)</script>" },
      quote,
      mpLink,
      transferencia,
    });
    expect(msg.htmlBody).not.toContain("<script>");
  });
});
```

- [ ] **Step 2: Correr los tests para verificar que fallan**

Run: `npm run test:unit:functions -- buildSalesNotification buildVisitorInstructions`
Expected: FAIL — no se pueden resolver los dos módulos.

- [ ] **Step 3: Implementar**

`supabase/functions/precio_lead/buildSalesNotification.ts`:

```ts
import type { Quote } from "./computeQuote.ts";
import type { QuotePayload } from "./validateQuotePayload.ts";

export interface EmailContent {
  subject: string;
  textBody: string;
  htmlBody: string;
}

function sanitizeForSubject(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Mail interno a ventas cuando alguien cotiza y deja sus datos en /precio. */
export function buildSalesNotification({
  payload,
  quote,
  contactId,
  dealId,
  crmBaseUrl,
}: {
  payload: QuotePayload;
  quote: Quote;
  contactId: number;
  dealId: number;
  crmBaseUrl?: string;
}): EmailContent {
  const nombreCompleto = `${payload.nombre} ${payload.apellido}`;
  const subject = `Cotización En Paralelo: ${sanitizeForSubject(nombreCompleto)} (${sanitizeForSubject(
    payload.empresa,
  )})`;

  const dealLink = crmBaseUrl ? `${crmBaseUrl}/#/deals/${dealId}/show` : null;

  const textLines = [
    `Nombre: ${nombreCompleto}`,
    `Email: ${payload.email}`,
    `Celular: ${payload.celular}`,
    `Empresa: ${payload.empresa}`,
    `CUIT: ${payload.cuit}`,
    `Web: ${payload.web ?? "sin sitio"}`,
    `Diagnóstico: ${quote.diagLabel}`,
    `Ola Starter: ${payload.olaStarter ? "sí" : "no"}`,
    `Total del programa: USD ${quote.totalPrograma}`,
    `Primer pago: USD ${quote.montoPrimerPago}`,
    `Contact id: ${contactId}`,
    `Deal id: ${dealId}`,
  ];
  if (dealLink) textLines.push(`CRM link: ${dealLink}`);

  const htmlLines = [
    `<p><strong>Nombre:</strong> ${escapeHtml(nombreCompleto)}</p>`,
    `<p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>`,
    `<p><strong>Celular:</strong> ${escapeHtml(payload.celular)}</p>`,
    `<p><strong>Empresa:</strong> ${escapeHtml(payload.empresa)}</p>`,
    `<p><strong>CUIT:</strong> ${escapeHtml(payload.cuit)}</p>`,
    `<p><strong>Web:</strong> ${escapeHtml(payload.web ?? "sin sitio")}</p>`,
    `<p><strong>Diagnóstico:</strong> ${escapeHtml(quote.diagLabel)}</p>`,
    `<p><strong>Ola Starter:</strong> ${payload.olaStarter ? "sí" : "no"}</p>`,
    `<p><strong>Total del programa:</strong> USD ${quote.totalPrograma}</p>`,
    `<p><strong>Primer pago:</strong> USD ${quote.montoPrimerPago}</p>`,
  ];
  if (dealLink) {
    htmlLines.push(`<p><a href="${escapeHtml(dealLink)}">Abrir deal en el CRM</a></p>`);
  }

  return { subject, textBody: textLines.join("\n"), htmlBody: htmlLines.join("\n") };
}
```

`supabase/functions/precio_lead/buildVisitorInstructions.ts`:

```ts
import type { Quote } from "./computeQuote.ts";
import type { QuotePayload } from "./validateQuotePayload.ts";
import type { EmailContent } from "./buildSalesNotification.ts";

export interface MpLinkEnv {
  montoUsd: number;
  url: string;
}

export interface TransferenciaEnv {
  titular: string;
  cuit: string;
  cbu: string;
  alias: string;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Mail al visitante con el resumen de su cotización y cómo pagar.
 *
 * Deliberadamente en USD, sin equivalente en pesos: un monto en ARS queda
 * desactualizado en el momento en que se envía e invita a la disputa ("me
 * habían dicho tal monto"). Ver la spec, sección de los dos mails.
 */
export function buildVisitorInstructions({
  payload,
  quote,
  mpLink,
  transferencia,
}: {
  payload: QuotePayload;
  quote: Quote;
  mpLink: MpLinkEnv | null;
  transferencia: TransferenciaEnv | null;
}): EmailContent {
  const subject = `Tu cotización de En Paralelo — ${quote.diagLabel}`;

  const textLines = [
    `Hola ${payload.nombre},`,
    "",
    `Así queda tu cotización de En Paralelo:`,
    `- Diagnóstico: ${quote.diagLabel}`,
    `- Ola Starter: ${payload.olaStarter ? "sí" : "no"}`,
    `- Total del programa: USD ${quote.totalPrograma}`,
    `- Primer pago: USD ${quote.montoPrimerPago}`,
  ];

  const htmlLines = [
    `<p>Hola ${escapeHtml(payload.nombre)},</p>`,
    `<p>Así queda tu cotización de En Paralelo:</p>`,
    `<ul>`,
    `<li>Diagnóstico: ${escapeHtml(quote.diagLabel)}</li>`,
    `<li>Ola Starter: ${payload.olaStarter ? "sí" : "no"}</li>`,
    `<li>Total del programa: USD ${quote.totalPrograma}</li>`,
    `<li>Primer pago: USD ${quote.montoPrimerPago}</li>`,
    `</ul>`,
  ];

  if (mpLink) {
    textLines.push(
      "",
      `Mercado Pago: ${mpLink.url}`,
      "(el monto final en pesos te lo confirma Mercado Pago al abrir el link)",
    );
    htmlLines.push(
      `<p><a href="${escapeHtml(mpLink.url)}">Pagar con Mercado Pago</a><br>` +
        `<small>El monto final en pesos te lo confirma Mercado Pago al abrir el link.</small></p>`,
    );
  }

  if (transferencia) {
    textLines.push(
      "",
      "Transferencia bancaria:",
      `Titular: ${transferencia.titular}`,
      `CUIT: ${transferencia.cuit}`,
      `CBU: ${transferencia.cbu}`,
      `Alias: ${transferencia.alias}`,
    );
    htmlLines.push(
      `<p><strong>Transferencia bancaria</strong><br>` +
        `Titular: ${escapeHtml(transferencia.titular)}<br>` +
        `CUIT: ${escapeHtml(transferencia.cuit)}<br>` +
        `CBU: ${escapeHtml(transferencia.cbu)}<br>` +
        `Alias: ${escapeHtml(transferencia.alias)}</p>`,
    );
  }

  if (quote.diag === "radar" && payload.radarOpt) {
    textLines.push("", "Te va a llegar por separado el link para agendar tu Radar.");
    htmlLines.push(`<p>Te va a llegar por separado el link para agendar tu Radar.</p>`);
  }

  return { subject, textBody: textLines.join("\n"), htmlBody: htmlLines.join("\n") };
}
```

- [ ] **Step 4: Correr los tests**

Run: `npm run test:unit:functions -- buildSalesNotification buildVisitorInstructions`
Expected: todos PASS.

- [ ] **Step 5: Commit**

```bash
cd /Users/mok/Sites/innovas/crm
git add supabase/functions/precio_lead/buildSalesNotification.ts supabase/functions/precio_lead/buildSalesNotification.test.ts supabase/functions/precio_lead/buildVisitorInstructions.ts supabase/functions/precio_lead/buildVisitorInstructions.test.ts
git commit -m "feat(precio_lead): contenido del mail interno y del mail al visitante"
```

---

## Task 19: Envío por Postmark

**Repo:** CRM

**Files:**
- Create: `supabase/functions/precio_lead/sendPostmark.ts`

**Interfaces:**
- Consumes: `EmailContent` de `./buildSalesNotification.ts`.
- Produces: `function sendEmail(args: { to: string[]; from: string; content: EmailContent }): Promise<void>`

Sin test unitario: es una llamada de red, igual que `sendLeadNotification.ts` (que tampoco lo tiene). Se verifica en la Task 20.

- [ ] **Step 1: Implementar**

`supabase/functions/precio_lead/sendPostmark.ts`:

```ts
import type { EmailContent } from "./buildSalesNotification.ts";

const POSTMARK_SEND_URL = "https://api.postmarkapp.com/email";
const POSTMARK_TIMEOUT_MS = 5_000;

/**
 * Envía un mail por la Send API de Postmark. Lanza en cualquier falla —el
 * caller (index.ts) debe capturarlo: ni la notificación interna ni el mail al
 * visitante pueden costar el lead ya persistido.
 */
export async function sendEmail({
  to,
  from,
  content,
}: {
  to: string[];
  from: string;
  content: EmailContent;
}): Promise<void> {
  const token = Deno.env.get("POSTMARK_SERVER_TOKEN");
  if (!token) {
    throw new Error("Missing POSTMARK_SERVER_TOKEN env variable (configuration error)");
  }
  if (to.length === 0) {
    throw new Error("No recipients configured for this email");
  }

  const response = await fetch(POSTMARK_SEND_URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-Postmark-Server-Token": token,
    },
    body: JSON.stringify({
      From: from,
      To: to.join(", "),
      Subject: content.subject,
      TextBody: content.textBody,
      HtmlBody: content.htmlBody,
      MessageStream: "outbound",
    }),
    signal: AbortSignal.timeout(POSTMARK_TIMEOUT_MS),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(`Postmark send failed with status ${response.status}: ${detail}`);
  }
}
```

- [ ] **Step 2: Commit**

```bash
cd /Users/mok/Sites/innovas/crm
git add supabase/functions/precio_lead/sendPostmark.ts
git commit -m "feat(precio_lead): envío de mails por Postmark"
```

---

## Task 20: Orquestación — `index.ts`

**Repo:** CRM

**Files:**
- Create: `supabase/functions/precio_lead/index.ts`

**Interfaces:**
- Consumes: todo lo de las Tasks 14 a 19.
- Produces: el endpoint HTTP `POST /functions/v1/precio_lead`.

Sigue el mismo esqueleto que `contact_form/index.ts`: CORS scoped al origin, secret compartido, cap de body, y notificación best-effort después de persistir. Sin test automatizado — se verifica con `supabase functions serve` + curl, igual que documenta `contact_form/index.ts` en su comentario final.

- [ ] **Step 1: Implementar**

`supabase/functions/precio_lead/index.ts`:

```ts
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { validateQuotePayload } from "./validateQuotePayload.ts";
import { createQuoteLead } from "./createQuoteLead.ts";
import type { Quote } from "./computeQuote.ts";
import { buildSalesNotification } from "./buildSalesNotification.ts";
import { buildVisitorInstructions, type MpLinkEnv, type TransferenciaEnv } from "./buildVisitorInstructions.ts";
import { sendEmail } from "./sendPostmark.ts";

const MAX_BODY_BYTES = 10_000;

const SHARED_SECRET = Deno.env.get("PRECIO_FORM_SHARED_SECRET");
const ALLOWED_ORIGIN = Deno.env.get("PRECIO_FORM_ALLOWED_ORIGIN");
if (!SHARED_SECRET) {
  throw new Error("Missing PRECIO_FORM_SHARED_SECRET env variable");
}
if (!ALLOWED_ORIGIN) {
  throw new Error("Missing PRECIO_FORM_ALLOWED_ORIGIN env variable");
}

// Mismo modelo de seguridad que contact_form: el origin allowlist es la
// restricción real; el secret compartido es sólo un filtro anti-abuso trivial,
// porque un cliente browser no puede mantenerlo confidencial.
// Ver adr/ADR-036aa537-TASK-001-contact-form-auth-boundary.md
function buildCorsHeaders() {
  return {
    "Access-Control-Allow-Origin": ALLOWED_ORIGIN!,
    "Access-Control-Allow-Headers": "content-type, x-precio-form-secret",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };
}

function jsonResponse(status: number, body: Record<string, unknown>) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...buildCorsHeaders() },
  });
}

/**
 * Links de Mercado Pago por monto, desde `PRECIO_MP_LINKS`: JSON
 * `{"1500":"https://mpago.la/aaa","7500":"https://mpago.la/bbb"}`.
 * Configuración por env porque el mail se arma del lado del servidor y no
 * puede confiar en URLs que mande el browser. Ver la spec: esto duplica
 * `content/precio.ts` del sitio y puede driftear; se revisa a mano en cada
 * regeneración de link.
 */
function getMpLink(montoUsd: number): MpLinkEnv | null {
  const raw = Deno.env.get("PRECIO_MP_LINKS");
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Record<string, string>;
    const url = parsed[String(montoUsd)];
    return url ? { montoUsd, url } : null;
  } catch (error) {
    console.error("precio_lead: PRECIO_MP_LINKS no es JSON válido", error);
    return null;
  }
}

function getTransferencia(): TransferenciaEnv | null {
  const titular = Deno.env.get("PRECIO_TRANSFER_TITULAR");
  const cuit = Deno.env.get("PRECIO_TRANSFER_CUIT");
  const cbu = Deno.env.get("PRECIO_TRANSFER_CBU");
  const alias = Deno.env.get("PRECIO_TRANSFER_ALIAS");
  if (!titular || !cuit || !cbu || !alias) return null;
  return { titular, cuit, cbu, alias };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: buildCorsHeaders() });
  }
  if (req.method !== "POST") {
    return jsonResponse(405, { message: "Method Not Allowed" });
  }

  const providedSecret = req.headers.get("x-precio-form-secret");
  if (!providedSecret || providedSecret !== SHARED_SECRET) {
    return jsonResponse(401, { message: "Unauthorized" });
  }

  const contentLengthHeader = req.headers.get("content-length");
  const contentLength = contentLengthHeader ? Number(contentLengthHeader) : NaN;
  if (!contentLengthHeader || Number.isNaN(contentLength) || contentLength > MAX_BODY_BYTES) {
    return jsonResponse(400, { message: "Request body too large or missing" });
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return jsonResponse(400, { message: "Request body must be valid JSON" });
  }

  const { data: payload, error: validationError } = validateQuotePayload(json);
  if (validationError) {
    return jsonResponse(400, {
      message: `Invalid field: ${validationError.field}`,
      detail: validationError.message,
    });
  }

  let contactId: number;
  let dealId: number;
  let quote: Quote;
  try {
    ({ contactId, dealId, quote } = await createQuoteLead(payload));
  } catch (error) {
    // Nunca se filtra el detalle del error de base de datos al caller público.
    console.error("precio_lead: failed to record quote lead", error);
    return jsonResponse(500, { message: "Could not process the submission" });
  }

  // Las dos notificaciones son best-effort y se intentan recién después de
  // persistir. Un Postmark caído nunca cuesta el lead: se loguea y se sigue.
  const salesRecipients = (Deno.env.get("NOTIFICATION_RECIPIENT_EMAILS") || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const sender = Deno.env.get("CONTACT_FORM_NOTIFICATION_SENDER");
  const visitorSender = Deno.env.get("PRECIO_VISITOR_EMAIL_SENDER") || "hola@innov.as";
  const crmBaseUrl = Deno.env.get("CRM_BASE_URL") || undefined;

  if (sender && salesRecipients.length > 0) {
    try {
      await sendEmail({
        to: salesRecipients,
        from: sender,
        content: buildSalesNotification({ payload, quote, contactId, dealId, crmBaseUrl }),
      });
    } catch (error) {
      console.error("precio_lead: failed to send sales notification", error);
    }
  } else {
    console.error("precio_lead: sales notification skipped, missing sender or recipients");
  }

  let visitorEmailSent = false;
  try {
    await sendEmail({
      to: [payload.email],
      from: visitorSender,
      content: buildVisitorInstructions({
        payload,
        quote,
        mpLink: getMpLink(quote.montoPrimerPago),
        transferencia: getTransferencia(),
      }),
    });
    visitorEmailSent = true;
  } catch (error) {
    console.error("precio_lead: failed to send visitor instructions", error);
  }

  return jsonResponse(200, { message: "OK", visitorEmailSent });
});

/* Para invocar en local:
  1. `make start`
  2. En `supabase/functions/.env`, además de lo que ya usa contact_form, agregar:
     PRECIO_FORM_SHARED_SECRET, PRECIO_FORM_ALLOWED_ORIGIN, PRECIO_DEAL_STAGE
     (opcional), PRECIO_DEAL_CATEGORY (opcional), PRECIO_MP_LINKS (JSON),
     PRECIO_TRANSFER_TITULAR, PRECIO_TRANSFER_CUIT, PRECIO_TRANSFER_CBU,
     PRECIO_TRANSFER_ALIAS, PRECIO_VISITOR_EMAIL_SENDER.
  3. `make start-supabase-functions`
  4. curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/precio_lead' \
      --header 'Content-Type: application/json' \
      --header 'x-precio-form-secret: testsecret' \
      --data '{
        "diag": "radar", "olaStarter": true, "radarOpt": true,
        "nombre": "Matías", "apellido": "OKeefe", "email": "matias@example.com",
        "celular": "+54 9 11 1234 5678", "cuit": "30-71234567-9",
        "empresa": "Example Corp", "web": "www.example.com",
        "aceptaTerminos": true
      }'
  Expected: 200 con { "message": "OK", "visitorEmailSent": true|false }, un
  contacto/empresa/nota/deal nuevos en la base local, y (si Postmark está
  configurado) los dos mails.
*/
```

- [ ] **Step 2: Correr toda la suite de `functions` del CRM**

Run: `cd /Users/mok/Sites/innovas/crm && npm run test:unit:functions`
Expected: todos los tests de `precio_lead` y de `contact_form` PASS (no se rompió nada existente).

- [ ] **Step 3: Prueba manual de punta a punta**

Seguir el comentario del Step 1: `make start`, completar `supabase/functions/.env`, `make start-supabase-functions`, correr el curl. Confirmar en la base local que aparecen el contacto, la empresa, la nota con el detalle de la cotización, y el deal con `amount = 6000` (para ese payload: radar + Ola Starter).

- [ ] **Step 4: Commit**

```bash
cd /Users/mok/Sites/innovas/crm
git add supabase/functions/precio_lead/index.ts
git commit -m "feat(precio_lead): orquestación del endpoint, con los dos mails"
```

---

## Task 21: Conectar el sitio al backend real y cerrar la config

**Repo:** sitio (+ referencia a variables del CRM)

**Files:**
- Modify: `.env.local` (agregar `NEXT_PUBLIC_PRECIO_FORM_SECRET`, no versionado)
- Modify: `content/precio.ts` (dejar comentario apuntando a las env vars equivalentes del CRM)

**Interfaces:**
- Consumes: `PRECIO_FORM_SHARED_SECRET` del lado del CRM debe ser el mismo valor que `NEXT_PUBLIC_PRECIO_FORM_SECRET` del lado del sitio.
- Produces: nada nuevo — cierra el cableado entre los dos repos.

- [ ] **Step 1: Agregar el secret al sitio**

`.env.local` no está versionado (confirmado por `.gitignore`), así que se edita directo, sin exponerlo en el commit:

```bash
cd /Users/mok/Sites/innovas/site
echo "NEXT_PUBLIC_PRECIO_FORM_SECRET=<mismo valor que PRECIO_FORM_SHARED_SECRET en Supabase>" >> .env.local
```

Reemplazar `<mismo valor que PRECIO_FORM_SHARED_SECRET en Supabase>` por el secret real generado (por ejemplo, `openssl rand -hex 32`), y setear el mismo valor como `PRECIO_FORM_SHARED_SECRET` en las variables de entorno de la Edge Function en Supabase (panel del proyecto → Edge Functions → precio_lead → Settings, o `supabase secrets set`). También hay que setearlo en Vercel (`vercel env add NEXT_PUBLIC_PRECIO_FORM_SECRET`) para que el build de producción lo tenga.

- [ ] **Step 2: Dejar la referencia cruzada en el copy**

En `content/precio.ts`, en el comentario de `pagoConfig.mercadoPagoLinks`, agregar una línea:

```ts
  /**
   * Un link por cada monto posible de primer pago. La lista se genera desde
   * `montosPrimerPagoPosibles` para que no queden montos sin entrada.
   * PENDIENTE: pegar las URLs del panel de Mercado Pago y su fecha de creación.
   * Recordatorio: el mismo par monto→URL tiene que estar en `PRECIO_MP_LINKS`
   * del lado de la Edge Function (repo del CRM), porque el mail al visitante
   * se arma en el servidor. Los dos lados pueden driftear: revisar los dos al
   * regenerar un link.
   */
```

Y en `transferencia`:

```ts
  /**
   * PENDIENTE: datos de la cuenta que recibe las transferencias.
   * Recordatorio: los mismos cuatro valores van en PRECIO_TRANSFER_TITULAR,
   * PRECIO_TRANSFER_CUIT, PRECIO_TRANSFER_CBU y PRECIO_TRANSFER_ALIAS del lado
   * de la Edge Function.
   */
```

- [ ] **Step 3: Verificar de punta a punta con el backend real**

Con el secret cargado en los dos lados y la función corriendo (local con `make start-supabase-functions`, o desplegada), recorrer `/precio` sin `?mockup=1` en un entorno no productivo: completar los 4 pasos, confirmar, y verificar que la pantalla final dice si el mail salió o no, según la respuesta real del backend.

- [ ] **Step 4: Commit**

```bash
cd /Users/mok/Sites/innovas/site
git add content/precio.ts
git commit -m "docs: referencia cruzada entre content/precio.ts y las env vars de precio_lead"
```

(El cambio de `.env.local` no se commitea: ya está en `.gitignore`.)

---

## Task 22: Verificación final y checklist de publicación

**Repo:** los dos

**Files:** ninguno nuevo — sólo verificación.

- [ ] **Step 1: Suite completa en el sitio**

```bash
cd /Users/mok/Sites/innovas/site
npm test
npx tsc --noEmit
npm run lint
npm run build
```
Expected: todo verde. `npm run build` en particular confirma que `/precio` prerenderiza sin errores con la config vacía (modo maqueta implícito fuera de producción no aplica al build, así que además correr `NODE_ENV=production npm run build` una vez y confirmar que sin `?mockup=1` la página en producción no ofrece medios de pago sin configurar en vez de romper).

- [ ] **Step 2: Suite completa en el CRM**

```bash
cd /Users/mok/Sites/innovas/crm
npm run test:unit:functions
```
Expected: verde, incluidos los tests nuevos de `precio_lead` y los preexistentes de `contact_form`.

- [ ] **Step 3: Recorrido manual de los cuatro caminos, en modo maqueta**

En `http://localhost:3300/precio?mockup=1`, para cada combinación de diagnóstico × Ola Starter:
1. El resumen (paso 2) muestra los montos de la tabla de Global Constraints.
2. El paso de pago (paso 4) muestra el monto correcto y, si `mockup=1`, las tarjetas de MP/transferencia con sus chips de pendiente.
3. La confirmación (paso 5) muestra el copy de maqueta y, sólo con Radar, el bloque de agendar.

- [ ] **Step 4: Checklist de los 5 datos operativos pendientes**

Antes de anunciar `/precio` como publicado, confirmar cada uno (usando el panel de pendientes en `?mockup=1` como fuente de verdad):

- [ ] Dos links de Mercado Pago (USD 1.500 y USD 7.500) en `content/precio.ts` **y** en `PRECIO_MP_LINKS` de la Edge Function.
- [ ] Datos de transferencia en `content/precio.ts` **y** en las cuatro `PRECIO_TRANSFER_*` de la Edge Function.
- [ ] Las dos URLs de Calendly en `content/precio.ts`, verificando que son eventos distintos.
- [ ] `hola@innov.as` verificado como sender signature en Postmark, y `pagoConfig.visitorEmailSenderVerified = true`.
- [ ] `PRECIO_FORM_SHARED_SECRET` / `PRECIO_FORM_ALLOWED_ORIGIN` en Supabase, y `NEXT_PUBLIC_PRECIO_FORM_SECRET` en Vercel, con el mismo valor de secret a los dos lados.

Cuando los 5 están listos, `computeReadiness` devuelve `launchReady: true` solo: el navbar muestra "Precios", `/precio` entra al sitemap y pierde el `noindex`, sin tocar código.

- [ ] **Step 5: Commit final (si quedó algo pendiente de los pasos anteriores)**

Si el Step 1 o 2 encontraron algo para corregir, arreglarlo y commitear con mensaje descriptivo antes de dar la tarea por terminada.

---

## Self-Review

**Cobertura de la spec:** cada sección de `docs/superpowers/specs/2026-08-26-precio-self-service-design.md` tiene task: arquitectura de archivos (Tasks 1–2, 14–20), modelo de cotización (Task 1 y 14, espejados), tipo de cambio (Task 4), paso 3/pago (Task 10), paso 4/confirmación (Task 11), flujo de datos del submit sin montos (Task 11 y 15), registro en el CRM (Tasks 16–17), los dos mails (Tasks 18–20, con la corrección de que el mail al visitante va en USD), seguridad (Task 20, mismo modelo que `contact_form`), modo maqueta y desbloqueo progresivo (Tasks 3, 5, 10–13), testing (todas las tasks con test, más Task 22), datos operativos pendientes (Task 12 y el checklist de la Task 22).

**Placeholders:** ninguno — cada step de código lleva la implementación completa, sin "TODO" ni "similar a la task N".

**Consistencia de tipos:** `Quote`, `WizardState`, `DatosLead`, `Readiness`, `QuotePayload` y `SubmitPayload` se usan con los mismos nombres de campo en todas las tasks que los consumen; verificado cruzando las secciones "Interfaces" de cada task contra su uso en tasks posteriores.
