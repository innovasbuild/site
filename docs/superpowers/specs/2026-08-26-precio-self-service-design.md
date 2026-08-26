# `/precio` — Cotizador self-service "En Paralelo"

**Fecha:** 2026-08-26
**Estado:** diseño aprobado, pendiente de plan de implementación

## Problema

El sitio no tiene ninguna vía autogestionada para cotizar y pagar. Todo pasa por
`/contacto`, que abre una conversación con ventas. Existe una maqueta HTML suelta
(`suscribite-en-paralelo.html`) con el cotizador de "En Paralelo" completo, pero no
está integrada al sitio, no persiste nada, no manda mails y contiene un formulario
de tarjeta sin backend que no puede publicarse.

## Objetivo

Publicar `/precio` como página del sitio, funcionando de punta a punta: el visitante
cotiza, deja sus datos, se registra como lead en el CRM, recibe un mail con las
instrucciones de pago, y puede pagar por Mercado Pago o transferencia bancaria.

La página tiene que ser caminable como maqueta desde el primer commit, y volverse
real por partes a medida que se completan los datos operativos que hoy no existen.

## Decisiones tomadas

| Decisión | Elegido | Descartado |
|---|---|---|
| Nivel de integración de pago | Link de pago de MP creado a mano + transferencia | API de Checkout Pro con webhook; Preapproval/suscripciones |
| Backend | Edge Function nueva `precio_lead` en el repo del CRM | Route Handler en Next.js; extender `contact_form` |
| Mails | Interno a ventas **y** al visitante | Sólo uno de los dos |
| Último paso | Elección de medio de pago, sin datos sensibles | Formulario de tarjeta; pago sólo por mail; subida de comprobante |
| Registro en CRM | Contacto + empresa + nota + **deal** | Sólo contacto + empresa + nota |
| Monto del primer pago (con Ola Starter) | Sólo la primera cuota, USD 1.500 | El total de USD 6.000; que el visitante elija |
| Moneda | USD contractual + referencia en ARS al cambio BNA (venta) del cierre del día anterior | Sólo USD; sólo ARS |
| Front-end | Página en el sistema, copy y precios en `content/` | HTML estático en `public/`; componente monolítico |

## Fuera de alcance

- Cobro automático por API de Mercado Pago, webhooks y conciliación automática.
- Recurrencia real de la suscripción mensual desde el mes 5 (queda manual, a cargo
  de ventas).
- Búsqueda automática de razón social por CUIT. Se mantiene el modo manual de la
  maqueta: el visitante escribe el nombre de la empresa. No se inventan datos.
- Subida de comprobante de transferencia.
- Firma del contrato. Se formaliza después, en el onboarding.

## Arquitectura

### Repo del sitio (`/Users/mok/Sites/innovas/site`)

| Archivo | Responsabilidad | Estado |
|---|---|---|
| `app/precio/page.tsx` | Server component: hero, metadata, JSON-LD, fetch del tipo de cambio, cálculo de readiness | nuevo |
| `components/precio-wizard.tsx` | Único componente cliente: 4 pasos, estado del cotizador, submit | nuevo |
| `components/precio-pending-panel.tsx` | Checklist de pendientes, sólo en modo maqueta | nuevo |
| `lib/precio-quote.ts` | `computeQuote()` — función pura, sin React ni DOM | nuevo |
| `lib/precio-readiness.ts` | Deriva qué capacidades están listas desde la config | nuevo |
| `lib/bna-rate.ts` | Fetch + cache del tipo de cambio, con fallback | nuevo |
| `content/precio.ts` | Copy, catálogo de precios, links de MP, datos de transferencia, URLs de Calendly | nuevo |
| `content/seo.ts` | Entrada `/precio` | editado |
| `app/sitemap.ts` | Excluye `/precio` mientras `launchReady` sea falso | editado |
| `components/navbar.tsx` | Alta del link, sólo cuando `launchReady` | editado |
| `package.json` + `vitest.config.ts` | Runner de tests (hoy el repo no tiene ninguno) | nuevo / editado |

### Repo del CRM (`/Users/mok/Sites/innovas/crm`)

`supabase/functions/precio_lead/`, espejando la descomposición de `contact_form`:

| Módulo | Responsabilidad |
|---|---|
| `index.ts` | CORS con origin allowlist, secret compartido, cap de body, orquestación |
| `validateQuotePayload.ts` | Valida y normaliza el payload; rechaza CUIT inválido |
| `computeQuote.ts` | Copia en Deno de la lógica de cotización — fuente de verdad de la plata |
| `createQuoteLead.ts` | Contacto + empresa + nota + deal contra `supabaseAdmin` |
| `buildQuoteNoteText.ts` | Texto de la nota con el detalle de la cotización |
| `buildDealInsert.ts` | Mapeo puro al row de `deals` |
| `buildSalesNotification.ts` | Subject/text/html del mail interno |
| `buildVisitorInstructions.ts` | Subject/text/html del mail al visitante |
| `sendPostmark.ts` | Envío con timeout de 5 s, igual que `sendLeadNotification.ts` |

## Modelo de cotización

`computeQuote({ diag, olaStarter })` devuelve:

```
{ diagValue, olaStarterBruto, creditApplied, totalPrograma,
  montoPrimerPago, cuotasRestantes, mensualDesdeMes5 }
```

Donde `cuotasRestantes` es la cantidad de cuotas que quedan después del primer pago
(3 sólo en el caso Radar + Ola Starter, 0 en el resto) y `mensualDesdeMes5` es el abono
mensual, o `null` cuando no hay suscripción (los casos sin Ola Starter).

Reglas, preservadas exactamente de la maqueta HTML:

- Catálogo: Radar USD 1.500; Mapa del Método USD 7.500 (desde); plan PRO USD 1.500/mes.
- Ola Starter vale 4 cuotas del plan: bruto USD 6.000.
- Con **Radar** + Ola Starter, el Radar queda **bonificado**: no se cobra y no se
  acredita nada (`creditApplied = 0`).
- Con **Mapa** + Ola Starter, el Mapa se cobra y se **acredita 100%** contra el bruto
  de Ola Starter: `creditApplied = min(diagValue, bruto)`.
- Total del programa: siempre `max(diagValue, bruto)`.
- `montoPrimerPago`: USD 1.500 en el caso Radar + Ola Starter (primera de 4 cuotas);
  el total del programa en todos los demás casos.

Los cuatro escenarios y sus montos:

| Diagnóstico | Ola Starter | Total programa | Primer pago | Después |
|---|---|---|---|---|
| Radar | no | USD 1.500 | USD 1.500 | nada (pago único) |
| Radar | sí | USD 6.000 | USD 1.500 | 3 cuotas de 1.500, luego 1.500/mes desde el mes 5 |
| Mapa | no | USD 7.500 | USD 7.500 | nada (pago único) |
| Mapa | sí | USD 7.500 | USD 7.500 | 1.500/mes desde el mes 5 |

Sólo hay **dos montos de primer pago**: USD 1.500 y USD 7.500. Por eso alcanzan dos
links de pago de Mercado Pago.

## Tipo de cambio

El BNA no publica API oficial. Se usa `https://dolarapi.com/v1/dolares/oficial`
(gratis, sin key, fuente BNA), tomando `venta`, cacheado 24 h vía
`fetch(url, { next: { revalidate: 86400 } })` en el server component.

Si el fetch falla, devuelve una forma inesperada o un valor no positivo, se cae a
`fallbackRate` (valor + fecha, en `content/precio.ts`) y los importes en ARS se
rotulan como referencia desactualizada. Nunca se muestra un número inventado.

Todo importe en ARS se rotula "referencia, al cambio BNA del DD/MM". El precio
contractual es el USD.

## Paso 3 — cómo pagar

Reemplaza el formulario de tarjeta de la maqueta. **Cero campos de tarjeta en
ningún punto del sistema**: no hay backend propio que pueda recibirlos y mandar un
número de tarjeta en texto plano a un servidor propio es incumplimiento de PCI-DSS.

- **Mercado Pago**: botón que abre, en pestaña nueva, el link correspondiente a
  `montoPrimerPago`. Si no hay link configurado para ese monto, la tarjeta no se
  ofrece (falla en seguro: nunca manda a pagar un monto equivocado).
- **Transferencia bancaria**: titular, CUIT, CBU y alias, cada uno con botón de copiar.
- **Términos**: checkbox obligatorio, apuntando a `/terminos` y `/privacidad`, que ya
  existen en el sitio.
- Aclaración explícita de que el monto final en ARS lo confirma Mercado Pago al abrir
  el link, porque el link tiene el monto en pesos congelado al momento de crearse y
  drifta respecto del tipo de cambio que muestra la página.
- Cada link lleva un campo `creadoEl`; con más de 30 días, la página loguea un warning
  en desarrollo para avisar que hay que regenerarlo.

## Paso 4 — confirmación

Se mantiene lo de la maqueta: confirmación + agendar el Radar por Calendly, con **dos
URLs distintas** (1 reunión / las 4 encadenadas). El bloque de agendar sólo aparece si
el diagnóstico es Radar y el visitante lo pidió en el paso 1.

## Flujo de datos del submit

1. El wizard postea a `${NEXT_PUBLIC_SUPABASE_URL}/functions/v1/precio_lead` con el
   header `x-precio-form-secret`.
2. El payload lleva **sólo la selección** (`diag`, `olaStarter`, `radarOpt`), los datos
   de contacto y empresa, y la aceptación de términos. **Nunca montos.**
3. La función valida, recalcula la cotización con su propio `computeQuote.ts`, y
   persiste contacto + empresa + nota + deal.
4. Después de persistir, intenta los dos mails (best-effort).
5. Devuelve `200 { message: "OK", visitorEmailSent: boolean }`.

### Por qué el cliente no manda montos

Es el límite de confianza del sistema. Si el front mandara `total: 1`, no cambiaría
nada: los mails y el deal salen con lo que calcula el servidor.

El costo es que la tabla de precios queda duplicada en dos repos y eso drifta.
Mitigación: los tests de los cuatro escenarios existen a los dos lados con los mismos
números literales, y cada archivo lleva un comentario apuntando al otro. Tocar un
precio en un solo lado deja un test rojo.

## Registro en el CRM

Contacto + empresa + nota reusando la lógica de `contact_form` (misma resolución de
`sales_id` por email desde la tabla `sales`, mismo get-or-create de empresa y
contacto, mismo refresco de `last_seen` en repetidas).

Más un `deal`:

- `name`: `"En Paralelo — <Empresa>"`
- `amount`: total del programa, en USD. Nota: `deals.amount` no tiene columna de
  moneda; se asume que el pipeline está en USD.
- `stage`: por env var `PRECIO_DEAL_STAGE`, default `propuesta-economica`. Alguien que
  completó el cotizador ya se autogestionó una propuesta económica; no es un
  "identificado".
- `category`: por env var `PRECIO_DEAL_CATEGORY`, default `transformacion-digital`.
- `description`: el mismo detalle de la cotización que la nota.
- `sales_id`: el mismo rep que resuelve `contact_form`.

## Los dos mails

Ambos por Postmark, reusando `POSTMARK_SERVER_TOKEN`.

**Interno**, a `NOTIFICATION_RECIPIENT_EMAILS` (var que ya existe): lead, cotización
elegida, montos, CUIT, web, y link al deal en el CRM.

**Al visitante**, desde `hola@innov.as`: resumen de la cotización en USD con la
referencia en ARS y la fecha del cambio BNA, link de pago de Mercado Pago, datos de
transferencia, y qué pasa después. Requiere que `hola@innov.as` esté verificado como
sender signature en Postmark.

### Manejo de errores

Los dos envíos son best-effort y se intentan **sólo después** de que el lead está
persistido. Un Postmark caído se loguea y nunca cuesta el lead: se devuelve 2xx.

Con una diferencia respecto de `contact_form`: el mail al visitante es el que lleva
las instrucciones de pago. La respuesta incluye `visitorEmailSent`. Si es `false`, la
pantalla de confirmación cambia el copy y muestra las instrucciones de pago en
pantalla, con un fallback a `hola@innov.as`. El visitante nunca queda sin saber cómo
pagar.

## Seguridad

Mismo modelo que `contact_form`, por las razones que documenta
`adr/ADR-036aa537-TASK-001-contact-form-auth-boundary.md`:

- Origin allowlist (`PRECIO_FORM_ALLOWED_ORIGIN`) como restricción real de qué
  browsers pueden llamar al endpoint.
- Secret compartido (`PRECIO_FORM_SHARED_SECRET`) como filtro anti-abuso trivial. No
  es un secreto de verdad: viaja en el bundle del browser.
- Cap de body antes de parsear.
- Cero mensajes de error de base de datos hacia el caller; el detalle se loguea del
  lado del servidor.
- Escape de HTML y saneo de saltos de línea en todo texto libre que entra a los mails,
  reusando los helpers de `buildLeadNotificationMessage.ts`.
- Ningún dato de tarjeta atraviesa el sistema.

## Modo maqueta y desbloqueo progresivo

Un solo mecanismo, sin ramas ni código temporal: la config declara qué falta y todo se
deriva de eso.

`lib/precio-readiness.ts` devuelve el estado de cinco capacidades y un `launchReady`
global. Cómo se determina cada una:

| Capacidad | Se considera lista cuando |
|---|---|
| `mercadoPago` | `content/precio.ts` tiene un link no vacío para el monto en cuestión. Se evalúa **por monto**, no global |
| `transferencia` | `content/precio.ts` tiene titular, CUIT, CBU y alias, todos no vacíos |
| `calendly` | Las dos URLs (1 reunión y 4 reuniones) están seteadas y son distintas entre sí |
| `backend` | `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_PRECIO_FORM_SECRET` están presentes en el entorno |
| `mailVisitante` | El flag manual `visitorEmailSenderVerified` en `content/precio.ts` está en `true` |

`mailVisitante` es un flag manual a propósito: el sitio no tiene forma de consultar si
`hola@innov.as` está verificado en Postmark, y no se puede inferir. Se pone en `true` a
mano una vez confirmada la verificación.

`launchReady` es la conjunción de las cinco, con `mercadoPago` exigido para los dos
montos posibles.

| Capacidad | Falta (modo maqueta) | Falta (producción) | Lista |
|---|---|---|---|
| Link de MP | Tarjeta con chip "pendiente", botón deshabilitado | Tarjeta no se ofrece | Botón que abre el link del monto |
| Transferencia | Campos con `CBU pendiente` en gris, sin copiar | Tarjeta no se ofrece | Datos reales + copiar |
| Calendly | Botones deshabilitados con "pendiente" | Bloque no se ofrece | Abren los dos eventos |
| Backend | Submit sin red: simula éxito y avanza | Submit muestra fallback a `hola@innov.as` | POST real a `precio_lead` |
| Mail al visitante | "En la versión final te llega un mail" | Instrucciones en pantalla | "Te mandamos un mail a `<email>`" |

**Guardrail:** el modo maqueta se activa sólo con `?mockup=1` o fuera de producción.
Nunca se activa solo en producción por tener config incompleta. Cuando está activo, un
banner fijo arriba dice `MAQUETA — no se procesa ningún pago`.

**Panel de pendientes**, sólo en modo maqueta: checklist de los cinco items, cada uno
con ✅ o ⏳, qué falta exactamente y en qué archivo o variable de entorno se completa.

**Exposición en SEO:** mientras `launchReady` sea falso, `/precio` lleva
`robots: noindex`, queda fuera del sitemap (que hoy se deriva de las claves de
`content/seo.ts`, así que hace falta una exclusión explícita) y fuera del navbar.

## Testing

El repo del sitio no tiene runner hoy: `package.json` no tiene script `test`. Se suma
vitest (una devDependency, un `vitest.config.ts` mínimo, un script `test`).

**Sitio:**
- Los cuatro escenarios de `computeQuote`, con montos literales.
- `bna-rate`: éxito, fetch fallido, forma inesperada, valor no positivo → fallback.
- Selección de link de MP por monto, incluido "no hay link → no se ofrece MP".
- `precio-readiness`: config vacía, parcial y completa.

**CRM:** unitarios de los módulos puros nuevos, en el proyecto `functions` de vitest
que ya existe. En particular `computeQuote.ts` con los mismos montos literales que el
sitio, y `buildDealInsert.ts`.

**Manual:** `supabase functions serve` + curl (como documenta el comentario al pie de
`contact_form/index.ts`), y una pasada del wizard completo en el browser por los
cuatro caminos.

## Datos operativos pendientes

La página falla en seguro sin ellos y el panel de pendientes los lista, pero sin estos
datos no cobra:

1. Los dos links de pago de Mercado Pago: uno por USD 1.500, uno por USD 7.500.
2. Datos de transferencia: titular, CUIT, CBU, alias.
3. Las dos URLs de Calendly: 1 reunión y las 4 del Radar.
4. `hola@innov.as` verificado como sender signature en Postmark.
5. `PRECIO_FORM_SHARED_SECRET` y `PRECIO_FORM_ALLOWED_ORIGIN` seteados en Supabase, y
   `NEXT_PUBLIC_PRECIO_FORM_SECRET` en Vercel.

## Riesgos conocidos

- **Drift del monto en ARS del link de MP.** El link tiene el monto en pesos congelado
  al crearse. Mitigado con el rótulo "referencia", la aclaración de que MP confirma el
  monto final, y el warning por `creadoEl` con más de 30 días. No está resuelto: se
  resuelve de verdad recién integrando la API de Checkout Pro.
- **Tabla de precios duplicada en dos repos.** Mitigado con tests espejados de montos
  literales a los dos lados.
- **Recurrencia manual.** Las 3 cuotas restantes y el abono desde el mes 5 los gestiona
  ventas a mano. El copy tiene que decirlo explícito, sin prometer débito automático.
- **`deals.amount` sin moneda.** Se asume USD; si el pipeline tiene deals en otra
  moneda, los reportes mezclan unidades.
