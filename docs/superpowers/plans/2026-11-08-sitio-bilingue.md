# Sitio bilingüe: plan de implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** El sitio de INNOV.AS en español neutro (URLs actuales) y en inglés (`/en/...`), con detección automática de idioma, selector ES/EN, SEO por idioma y versiones para agentes de IA.

**Architecture:** Todo el árbol de `app/` pasa a `app/[lang]/`, con las carpetas internas en español. `proxy.ts` reescribe las URLs públicas a las internas (`/servicios` → `/es/servicios`, `/en/services` → `/en/servicios`) y decide redirecciones por cookie, `Accept-Language` y país. Los Server Components leen el idioma con `lang()` de `next/root-params`; los Client Components, con un contexto (`useLocale()`). Cada módulo de `content/` tiene versión `es` y `en` con el mismo tipo, así que una clave faltante en inglés no compila. Un único flag (`EN_LIVE`) mantiene el inglés oculto (sin redirección, sin selector, `noindex`, fuera del sitemap) hasta que Mati lo apruebe.

**Tech Stack:** Next.js 16.3.8 (App Router, `proxy.ts`, `next/root-params`), TypeScript, tests con `node --test` (Node 24 con type stripping), pnpm, Vercel.

**Spec:** `docs/superpowers/specs/2026-11-08-sitio-bilingue-design.md`

## Global Constraints

- Leer `node_modules/next/dist/docs/` antes de tocar routing (`01-app/02-guides/internationalization.md`, `01-app/03-api-reference/04-functions/next-root-params.md`, `03-file-conventions/proxy.md`).
- Las URLs en español no cambian: `/`, `/servicios`, `/central-ia`, `/nosotros`, `/contacto`, `/proyectos`, `/precios`, `/privacidad`, `/terminos`, `/cuentas/*`.
- URLs en inglés: `/en`, `/en/services`, `/en/ai-central`, `/en/about`, `/en/contact`, `/en/projects`, `/en/pricing`, `/en/privacy`, `/en/terms`.
- En inglés el producto se llama **AI Central** (nunca "Central IA" ni "Central AI").
- Español neutro con tuteo; sin voseo ni modismos rioplatenses. Mantener el lenguaje BID (asistentes digitales, bots, brains).
- El inglés se escribe como original, no como traducción literal. Lo aprueba Mati.
- Mismo contenido, precios y proyectos en los dos idiomas.
- Textos legales en inglés sin cláusula de prevalencia del español.
- `/cuentas/*` queda fuera: sin redirección, sin par en inglés, sin pasar a neutro.
- Crawlers y agentes (`Accept: text/markdown` o user agent de bot) nunca se redirigen.
- Sin dependencias nuevas de i18n.
- `lib/i18n.ts` no importa nada (igual que `lib/negotiation.ts`), para que los tests lo carguen directo con node.
- Commits con prefijo `feat:`, `fix:`, `refactor:`, `docs:`, `test:`.

## Review Focus

1. **Googlebot desde EE. UU. pidiendo `/servicios`** sin `Accept-Language`: tiene que recibir 200 en español, nunca un 307 a `/en/services`. Lo cubre el test `detectLocale nunca redirige bots` (Task 3) y el de endpoints (Task 11).
2. **Visitante con cookie `lang=es` que abre un link a `/en/services`**: va a `/servicios`. Con cookie `lang=en` y link a `/servicios`, va a `/en/services`. Test en Task 3.
3. **URL inexistente bajo `/en`** (`/en/foo`): 404 con layout e idioma inglés, y en Markdown si lo pide un agente. Test en Task 11.
4. **Rutas duplicadas**: `/es/servicios` y `/en/servicios` (slug español bajo `/en`) redirigen con 308 a su URL pública, para que no haya contenido duplicado. Test en Task 3.
5. **Mientras `EN_LIVE` es `false`**: un visitante de EE. UU. sigue viendo español; nadie es redirigido a `/en`. Test en Task 3.

---

## Fase A: español neutro (se puede publicar sola)

### Task 1: el chequeo de tipos entra en los tests

**Files:**
- Modify: `package.json` (script `test`)

- [ ] **Step 1:** Cambiar `"test"` a `"tsc --noEmit && node --test tests/*.test.mjs"`. Hoy `next.config.mjs` tiene `typescript.ignoreBuildErrors: true` y el build no frena por tipos; el flag queda como está.
- [ ] **Step 2:** Correr `pnpm test`. Esperado: pasa (tsc sin errores; los tests de negociación y llms.txt en verde). `endpoints.test.mjs` no debe entrar en el glob: renombrarlo a `tests/endpoints.int.mjs` y actualizar `test:endpoints`.
- [ ] **Step 3:** Commit `test: el chequeo de tipos corre con pnpm test`.

### Task 2: todo el español pasa a neutro

**Files:**
- Modify: `content/*.ts`, los componentes con texto escrito directo (relevar con grep), `public/llms.txt`, `lib/markdown.ts`, `lib/schema.ts`
- Create: `tests/espanol-neutro.test.mjs`
- Create: `docs/2026-11-08-espanol-neutro-antes-despues.md`

- [ ] **Step 1: test que falla.** `tests/espanol-neutro.test.mjs` recorre `content/**/*.ts`, `components/**/*.tsx`, `app/**/*.tsx`, `lib/markdown.ts`, `public/llms.txt` (excluye `content/**/en.ts` y `public/en/`) y falla si encuentra voseo. Regex curada, que se amplía con lo que aparezca en el relevamiento:
  `\b(vos|sos|podés|querés|tenés|sabés|hacés|necesitás|creás|preferís|empezá|agendá|escribinos|contanos|dejanos|mirá|elegí|pedí|conocé|probá|sumate|hablá|dejá|completá|ingresá|descubrí|arrancá|fijate)\b` (case-insensitive). Mensaje: archivo, línea y palabra.
- [ ] **Step 2:** `node --test tests/espanol-neutro.test.mjs`. Esperado: FAIL listando, entre otros, `podés`, `querés`, `agendá`, `escribinos`, `Ingresá`.
- [ ] **Step 3: reescribir a tuteo neutro** ("puedes", "agenda", "escríbenos", "Ingresa tu nombre"). Revisar también modismos que la regex no ve (p. ej. "charla" se mantiene; "laburo", "re", "che" no van). Ojo con `primaryCta: "Empezá ahora"` → "Empieza ahora" y `directEmailNote: "Preferís email?"` → "¿Prefieres escribir por email?".
- [ ] **Step 4:** Anotar cada cambio en `docs/2026-11-08-espanol-neutro-antes-despues.md` como tabla `| Archivo | Antes | Después |`.
- [ ] **Step 5:** `pnpm test`. Esperado: PASS.
- [ ] **Step 6:** Commit `feat: el sitio pasa a español neutro`. **Gate:** Mati revisa el antes/después antes de publicar.

---

## Fase B: infraestructura bilingüe (inglés oculto)

### Task 3: idiomas, rutas y detección

**Files:**
- Create: `lib/i18n.ts`
- Create: `tests/i18n.test.mjs`

**Interfaces (Produces):**
- `export const locales = ["es", "en"] as const`; `export type Locale = (typeof locales)[number]`
- `export const EN_LIVE = false`
- `export const LOCALE_COOKIE = "lang"`
- `export const routes: { key: string; es: string; en: string }[]` — `key` es la ruta interna en español sin prefijo (`"/servicios"`); `es` y `en` son las URLs públicas.
- `export function resolvePath(pathname: string): { locale: Locale; key: string } | { redirect: string } | null` — URL pública → ruta interna. `null` si no es ruta conocida (404 o `/cuentas`). `{ redirect }` para `/es/...` y `/en/<slug español>`.
- `export function pathFor(key: string, locale: Locale): string`
- `export function counterpart(pathname: string, to: Locale): string` — par de una URL pública; si no hay par, la home del idioma.
- `export function detectLocale(input: { cookie?: string | null; acceptLanguage?: string | null; country?: string | null; userAgent?: string | null; accept?: string | null; enLive?: boolean }): Locale | null` — `null` = no redirigir (bot o agente).
- `export const SPANISH_COUNTRIES` (AR BO CL CO CR CU DO EC ES GQ GT HN MX NI PA PE PR PY SV UY VE).

- [ ] **Step 1: tests que fallan** en `tests/i18n.test.mjs` (importa `../lib/i18n.ts`):
  - `resolvePath("/servicios")` → `{ locale: "es", key: "/servicios" }`; `resolvePath("/en/services")` → `{ locale: "en", key: "/servicios" }`; `resolvePath("/en")` → `{ locale: "en", key: "/" }`.
  - `resolvePath("/es/servicios")` → `{ redirect: "/servicios" }`; `resolvePath("/en/servicios")` → `{ redirect: "/en/services" }`.
  - `resolvePath("/foo")` → `null`; `resolvePath("/cuentas/lagomarsino")` → `null`.
  - `counterpart("/central-ia", "en")` → `"/en/ai-central"`; `counterpart("/en/contact", "es")` → `"/contacto"`.
  - cada `route` tiene `es` y `en` únicos, y `en` empieza con `/en`.
  - `detectLocale` con `enLive: true`: cookie `en` gana sobre `Accept-Language: es`; `Accept-Language: es-MX,en;q=0.5` → `es`; `en-US` → `en`; `pt-BR` → `en`; sin `Accept-Language` y país `MX` → `es`; país `US` → `en`; sin nada → `es`.
  - **nunca redirige bots:** user agent `Googlebot`, `bingbot`, `GPTBot`, `ClaudeBot`, `PerplexityBot`, `OAI-SearchBot` → `null`; `accept: "text/markdown"` → `null`.
  - **con `enLive: false`:** `Accept-Language: en-US` y país `US` → `es`, y cookie `en` también → `es`.
- [ ] **Step 2:** `node --test tests/i18n.test.mjs`. Esperado: FAIL (módulo no existe).
- [ ] **Step 3:** Implementar `lib/i18n.ts` sin imports. `Accept-Language`: tomar el rango de mayor `q`, comparar el subtag primario; `*` o vacío cuentan como ausente.
- [ ] **Step 4:** `pnpm test`. Esperado: PASS.
- [ ] **Step 5:** Commit `feat: rutas y detección de idioma`.

### Task 4: contenido por idioma

**Files:**
- Modify → mover: cada `content/<modulo>.ts` pasa a `content/<modulo>/es.ts` (los mismos exports de hoy, solo texto) y suma `content/<modulo>/en.ts` y `content/<modulo>/index.ts`. Módulos: `central-ia`, `contacto`, `faq`, `global`, `home`, `imagenes`, `nosotros`, `precios`, `proyectos`, `seo`, `servicios`.
- Create: `content/shared.ts` para lo que no es texto (`appUrl`, `signupLive`, `hubspotForm`, URL de meetings, `footerContact`).
- Create: `tests/contenido.test.mjs`

**Interfaces (Produces):**
- `content/<modulo>/index.ts`: `import * as es from "./es"; import * as en from "./en"; export const <modulo> = { es, en } satisfies Record<Locale, typeof es>` (nombres: `home`, `centralIa`, `servicios`, `proyectos`, `nosotros`, `contacto`, `precios`, `faq`, `global`, `seo`, `imagenes`).
- Uso: `const { hero } = home[locale]`.
- `content/seo/*.ts` se indexa por `key` de `routes` (no por URL pública).
- `contacto`: el `contactFormSchema` pasa a `contactFormSchema(locale)` porque sus mensajes son texto.
- En esta tarea, cada `en.ts` es temporalmente `export * from "./es"` (el inglés se escribe en la Fase C).

- [ ] **Step 1: test que falla** `tests/contenido.test.mjs`: para cada módulo, `content/<modulo>/es.ts` y `en.ts` existen; ningún `href` interno de `es.ts` empieza con `/en` y todo `href` interno de `en.ts` empieza con `/en` (o es `/cuentas` o externo). La comprobación de `href` se hace leyendo el archivo como texto con la regex `href:\s*"(\/[^"]*)"`.
- [ ] **Step 2:** Correr: FAIL.
- [ ] **Step 3:** Mover los archivos y actualizar todos los imports de `@/content/...` (hay ~58). En este paso los componentes siguen leyendo `es`, para que el sitio no cambie; el idioma se conecta en la Task 5.
- [ ] **Step 4:** `pnpm test`. Esperado: PASS (con `en` reexportando `es`, los `href` de `en` todavía fallan → marcar esa aserción con `{ todo: "Fase C" }` hasta la Task 8).
- [ ] **Step 5:** Commit `refactor: el contenido se separa por idioma`.

### Task 5: rutas bajo `app/[lang]` y proxy

**Files:**
- Move: `app/layout.tsx`, `app/page.tsx`, `app/not-found.tsx` y cada `app/<ruta>/page.tsx` a `app/[lang]/...` (carpetas internas en español).
- Create: `app/[lang]/[...rest]/page.tsx` (llama a `notFound()`, para que el 404 use el layout del idioma).
- Create: `components/locale-provider.tsx` (`"use client"`; `LocaleProvider({ locale, children })` y `useLocale(): Locale`).
- Modify: `proxy.ts`, `lib/markdown.ts`, todos los componentes que leen `content/`.

**Interfaces:**
- Consumes: `resolvePath`, `detectLocale`, `counterpart`, `EN_LIVE`, `LOCALE_COOKIE` de `lib/i18n.ts`; `<modulo>[locale]` de Task 4.
- Produces: en Server Components, `const locale = (await lang()) as Locale` con `import { lang } from "next/root-params"`; en Client Components, `useLocale()`. `buildHomeMarkdown(locale: Locale)` y `buildNotFoundMarkdown(pathname: string, locale: Locale)`.

- [ ] **Step 1:** `app/[lang]/layout.tsx`: `<html lang={locale}>`, envuelve `children` en `<LocaleProvider locale={locale}>`, `generateStaticParams` → `[{ lang: "es" }, { lang: "en" }]`, y `dynamicParams = false`.
- [ ] **Step 2:** `proxy.ts`, en este orden y manteniendo las exclusiones de hoy (no GET/HEAD, `rsc`, `next-router-prefetch`, matcher): `/cuentas` pasa sin tocar; `resolvePath` → si `{ redirect }`, 308; si es ruta conocida, `detectLocale` con los headers (`cookie`, `accept-language`, `x-vercel-ip-country`, `user-agent`, `accept`) y, si el resultado no es `null` y es distinto del idioma de la URL, 307 a `counterpart`, con `Cache-Control: private, no-store`; si no, `NextResponse.rewrite` a `/${locale}${key}`. Si es `null` (no conocida), rewrite a `/es${pathname}` o `/en/...` según el prefijo, para que caiga en el 404 de ese idioma. La negociación de Markdown se mantiene igual, pasando el idioma de la URL a los builders.
- [ ] **Step 3:** Conectar el idioma en todos los componentes y páginas que leen `content/`. Los server components pasan a `async` si hace falta.
- [ ] **Step 4:** `pnpm test` y `pnpm build`. Esperado: PASS; el build lista `/es/...` y `/en/...`.
- [ ] **Step 5:** `pnpm dev` y `BASE_URL=http://localhost:3300 pnpm test:endpoints`. Esperado: PASS (las URLs en español responden igual que antes). Verificar en el navegador `/`, `/servicios`, `/contacto` y `/foo` (404).
- [ ] **Step 6:** Commit `feat: rutas por idioma bajo app/[lang]`.

### Task 6: SEO por idioma

**Files:**
- Modify: `lib/metadata.ts`, `app/sitemap.ts`, `lib/schema.ts`, `app/robots.ts` (sin cambios de reglas; confirmar), páginas que llaman a `buildMetadata`.

**Interfaces:**
- `buildMetadata(key: string, locale: Locale, options?: { noindex?: boolean }): Metadata` — toma título y descripción de `seo[locale][key]`; `alternates.canonical = pathFor(key, locale)`; si `EN_LIVE`, `alternates.languages = { es: pathFor(key,"es"), en: pathFor(key,"en"), "x-default": pathFor(key,"es") }`; `openGraph.locale` = `es_419` o `en_US`; si `locale === "en" && !EN_LIVE`, `robots: { index: false, follow: false }`.
- Las páginas pasan a `generateMetadata` para leer el idioma.
- `organizationSchema(locale)` y `productSchema(locale)`: en inglés `name: "AI Central"`, `availableLanguage: ["es", "en"]`.

- [ ] **Step 1:** Implementar. El sitemap incluye las URLs en inglés solo si `EN_LIVE`, cada entrada con `alternates.languages`. `/precios` sigue afuera.
- [ ] **Step 2:** Agregar a `tests/endpoints.int.mjs`: `/servicios` tiene `<link rel="canonical" href="https://innov.as/servicios">` y `<html lang="es">`; `/en/services` tiene `<meta name="robots" content="noindex, nofollow">` mientras `EN_LIVE` es `false`.
- [ ] **Step 3:** `pnpm test`, `pnpm dev` + `pnpm test:endpoints`. Esperado: PASS.
- [ ] **Step 4:** Commit `feat: metadata, sitemap y schema por idioma`.

### Task 7: selector ES / EN

**Files:**
- Create: `components/language-switcher.tsx`
- Modify: `components/navbar.tsx` (barra y menú móvil)

**Interfaces:**
- `LanguageSwitcher()`: client; usa `usePathname()`, `useLocale()` y `counterpart`. Al hacer clic, escribe `document.cookie = "lang=<destino>; path=/; max-age=31536000; samesite=lax"` y navega con `window.location.assign(counterpart(...))` (navegación completa, para que el proxy lea la cookie). No se renderiza si `!EN_LIVE`.

- [ ] **Step 1:** Implementar con el estilo de la navbar (texto mono pequeño, `ES / EN`, el idioma actual resaltado, `aria-label` "Cambiar idioma" / "Change language").
- [ ] **Step 2:** Con `EN_LIVE` en `true` solo en local, verificar en el navegador: desde `/servicios`, el clic lleva a `/en/services`; recargar `/servicios` con la cookie `en` redirige a `/en/services`. Volver `EN_LIVE` a `false`.
- [ ] **Step 3:** Commit `feat: selector de idioma`.

---

## Fase C: inglés

### Task 8: copy en inglés

**Files:**
- Modify: cada `content/<modulo>/en.ts` (reemplaza el `export * from "./es"`), `tests/contenido.test.mjs`
- Create: `public/en/llms.txt`
- Modify: `public/llms.txt` (link al inglés), `lib/markdown.ts`

- [ ] **Step 1: tests.** En `tests/contenido.test.mjs`: sacar el `todo` de los `href`; ningún `en.ts` contiene `export * from "./es"`; ningún `en.ts` contiene "Central IA" ni "Central AI"; `public/en/llms.txt` cumple el mismo formato que valida `tests/llms-txt.test.mjs` (extraer la validación a una función y correrla sobre los dos archivos) y su sección `## When to use INNOV.AS` incluye `https://innov.as/en/contact`.
- [ ] **Step 2:** Correr: FAIL.
- [ ] **Step 3:** Escribir el inglés módulo por módulo, como original para un comprador de EE. UU. (inglés americano, voz activa, sin calcos). Orden: `global`, `seo`, `home`, `central-ia`, `servicios`, `proyectos`, `nosotros`, `contacto` (incluye los mensajes de validación), `faq`, `precios`, legales. Los `alt` de `imagenes` también.
- [ ] **Step 4:** `public/llms.txt` suma, al final de "Cuándo usar INNOV.AS", `- [English version](https://innov.as/en/llms.txt): …`, y `public/en/llms.txt` enlaza la versión en español.
- [ ] **Step 5:** `pnpm test`. Esperado: PASS.
- [ ] **Step 6:** Commit `feat: versión en inglés del sitio`. **Gate:** Mati revisa el inglés en local con `EN_LIVE` en `true`.

### Task 9: el formulario marca el idioma del lead

**Files:**
- Modify: `components/contact-form.tsx`

- [ ] **Step 1:** Agregar al mensaje que se envía a HubSpot la línea `Idioma del sitio: ${locale}` (no se crean propiedades nuevas en el CRM, por la misma razón por la que hoy empresa y país viajan en el mensaje). El `pageUri` ya distingue `/en/contact`.
- [ ] **Step 2:** Verificar en local que el body del POST incluye la línea (pestaña de red del navegador), sin enviar el formulario real.
- [ ] **Step 3:** Commit `feat: el formulario indica el idioma del sitio`.

### Task 10: imágenes con texto en inglés

**Files:**
- Modify: `content/imagenes/en.ts` y los componentes con imágenes o SVG que tengan texto en español (`components/hero-field.tsx`, `components/central/componentes-grid.tsx`, `components/illustrations/*`, `public/images/*`, `public/brand/*`).
- Create: `docs/2026-11-08-imagenes-con-texto.md`

- [ ] **Step 1:** Relevar cada imagen e ilustración que muestre texto. Volcar la lista en `docs/2026-11-08-imagenes-con-texto.md` (archivo, texto que tiene, dónde se usa).
- [ ] **Step 2:** Rehacer cada una en inglés siguiendo el procedimiento de ilustraciones del skill `innov-design-system` (los 8 pasos, con HandDrawn). Las que sean SVG o texto en componentes pasan a leer el texto de `content/`. Las rasterizadas se guardan como `<nombre>-en.<ext>` y `content/imagenes/en.ts` apunta a ellas.
- [ ] **Step 3:** Revisar en el navegador cada página en `/en` con `EN_LIVE` en `true` en local: no queda texto en español visible.
- [ ] **Step 4:** Commit `feat: imágenes con texto en inglés`.

### Task 11: lanzamiento y regla de mantenimiento

**Files:**
- Modify: `lib/i18n.ts` (`EN_LIVE = true`), `tests/endpoints.int.mjs`, `AGENTS.md` del proyecto

- [ ] **Step 1: tests de endpoints**:
  - `GET /servicios` con `Accept-Language: en-US` → 307 a `/en/services`.
  - `GET /servicios` con `User-Agent: Googlebot/2.1` y sin `Accept-Language` → 200, `<html lang="es">`.
  - `GET /servicios` con cookie `lang=es` y `Accept-Language: en-US` → 200.
  - `GET /es/servicios` → 308 a `/servicios`; `GET /en/servicios` → 308 a `/en/services`.
  - `GET /en/foo` → 404 con `<html lang="en">`; con `Accept: text/markdown` → 404 en Markdown.
  - `GET /en` con `Accept: text/markdown` → 200, Markdown en inglés que menciona "AI Central".
  - `/servicios` incluye `<link rel="alternate" hreflang="en" href="https://innov.as/en/services">` y `hreflang="x-default"`.
  - `GET /cuentas/lagomarsino` con `Accept-Language: en-US` → no redirige.
- [ ] **Step 2:** `EN_LIVE = true`. `pnpm test`, `pnpm build`, `pnpm dev` + `pnpm test:endpoints`. Esperado: PASS.
- [ ] **Step 3:** Agregar a `AGENTS.md`, fuera del bloque que genera `next dev`: "Todo cambio de texto visible se hace en `es.ts` y `en.ts` en el mismo commit. El inglés se escribe como original; en inglés el producto se llama AI Central. El español es neutro (tuteo)."
- [ ] **Step 4:** Commit `feat: publicar la versión en inglés`. Después del deploy, pedir en Google Search Console la indexación del sitemap.
