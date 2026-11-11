# Sitio bilingüe: español neutro e inglés

**Fecha:** 2026-11-08
**Estado:** diseño revisado, pendiente de aprobación de Mati

## Intención

Que un contacto de EE. UU. al que le hablamos de INNOV.AS entre al sitio y sienta que la empresa
piensa en inglés, y que eso le dé confianza para contratarnos. Y que a un contacto de cualquier país
de Latinoamérica le pase lo mismo con la versión en español. Ninguna de las dos versiones tiene que
leerse como una traducción.

Además de las personas que llegan por un link, nos tienen que encontrar en Google y en los chats de
IA (ChatGPT, Claude, Perplexity) en los dos idiomas.

## Objetivos

1. Versión completa del sitio en inglés, escrita como original (adaptación, no traducción literal).
2. El español actual pasa de rioplatense (voseo) a **español neutro** en todo el sitio.
3. Cada visitante ve su idioma sin hacer nada, y puede cambiarlo.
4. Los dos idiomas se indexan por separado en Google y quedan disponibles para agentes de IA.
5. El inglés no puede quedar desactualizado respecto del español.

## No objetivos

- Contenido distinto por mercado: precios, proyectos y casos son los mismos en los dos idiomas
  (decisión de Mati: "por ahora lo mismo").
- Otros idiomas (portugués, etc.).
- Cambiar el diseño visual del sitio más allá del selector de idioma.

## Antiobjetivos (sería un fracaso aunque funcione)

- Un inglés que suene traducido o con giros del español.
- Que el español deje de aparecer en Google porque Googlebot rastrea desde EE. UU. y lo redirigimos.
- Que un texto exista en un idioma y falte o quede viejo en el otro.
- Romper las URLs actuales en español (ya indexadas y compartidas).

## Decisiones tomadas

| Decisión | Elegido | Descartado |
|---|---|---|
| URLs | Español en las URLs actuales (`/servicios`); inglés bajo `/en/...` | Misma URL para los dos idiomas (Google indexaría uno solo) |
| Detección | 1) idioma del navegador, 2) país si el navegador no define, 3) selector manual que se recuerda | Solo por país |
| Variante del español | Neutro, para todos los países | Rioplatense |
| Nombre del producto en inglés | **AI Central** | "Central IA" fijo; "Central AI" |
| Contenido por mercado | El mismo en los dos idiomas | Precios/casos distintos |
| Mantenimiento | Claude actualiza el inglés en el mismo cambio que toca el español, y la estructura lo exige (falla el build/tests si falta una traducción) | Traducción manual aparte |

## Cómo funciona (lo decidido)

### Rutas

- Español: las URLs de hoy, sin prefijo: `/`, `/servicios`, `/central-ia`, `/nosotros`, `/contacto`,
  `/proyectos`, `/precios`, `/privacidad`, `/terminos`.
- Inglés: bajo `/en`, con slugs en inglés (decisión de Claude): `/en`, `/en/services`,
  `/en/ai-central`, `/en/about`, `/en/contact`, `/en/projects`, `/en/pricing`, `/en/privacy`,
  `/en/terms`.
- Cada página en un idioma conoce su par en el otro (un mapa de rutas único, compartido por el
  proxy, el sitemap, el selector y la metadata).

### Detección y redirección (en `proxy.ts`)

Se aplica solo a navegaciones GET/HEAD de personas, con las mismas exclusiones que hoy (RSC, prefetch,
assets, API, archivos con extensión).

1. Si hay cookie de idioma elegido → se respeta y no se redirige más allá de llevar a su par.
2. Si no, `Accept-Language`: si el idioma preferido es español → español; si es otro idioma → inglés.
3. Si no hay `Accept-Language` útil → país (`x-vercel-ip-country`): países hispanohablantes → español;
   el resto → inglés.
4. Si el idioma resultante no es el de la URL pedida → redirección temporal (307) a la página par.

**Nunca se redirige** a crawlers ni agentes (Googlebot, Bingbot, GPTBot, ClaudeBot, PerplexityBot y
similares, y cualquier pedido con `Accept: text/markdown`): ven exactamente la URL que pidieron. Esto
es lo que mantiene indexados los dos idiomas.

La negociación de Markdown que ya existe sigue igual y se extiende a `/en` (home y 404 en inglés).

### Selector ES / EN

Discreto, en la navbar (y en el menú móvil). Lleva a la página par, no a la home, y guarda la
elección en una cookie de larga duración para que la próxima visita no se redirija.

### SEO

- `<html lang>` correcto por idioma (`es` / `en`).
- `alternates.languages` (hreflang) en cada página: `es`, `en` y `x-default` (→ español,
  decisión de Claude: es el mercado actual).
- Canonical propio por idioma (cada página es canónica de sí misma).
- `openGraph.locale`: `es_419` y `en_US` (hoy dice `es_AR`).
- Sitemap con las dos versiones y sus alternates.
- Metadata (`content/seo.ts`) y datos estructurados (`lib/schema.ts`) en los dos idiomas.

### Agentes de IA

- `llms.txt` en español neutro y `/en/llms.txt` en inglés (o el mecanismo equivalente que el builder
  elija), con links a las páginas del idioma correspondiente, y referencia cruzada entre ambos.
- Markdown de home y 404 en los dos idiomas.

### Contenido

- Todo el texto vive en `content/`. Se reorganiza para que cada módulo tenga su versión `es` y `en`
  con **el mismo tipo TypeScript**, de modo que si falta una clave en inglés no compila.
- Los textos que hoy están escritos directo en componentes (hay unos pocos, p. ej. en
  `components/hero-field.tsx` y `components/central/componentes-grid.tsx`) se pasan a `content/`.
- Textos con imágenes que contengan palabras (p. ej. `public/central-ia-hero.jpg`, si tiene texto)
  se relevan; si llevan texto en español, se lista cuál hace falta rehacer.
- En inglés, "Central IA" → "AI Central" en todo el texto, metadata, schema y llms.txt.
- Español neutro: tuteo en lugar de voseo ("puedes", "agenda", "escríbenos"), sin modismos
  rioplatenses. Se entrega con un antes/después para que Mati lo revise.
- Respetar el lenguaje acordado con el BID (asistentes digitales, bots, brains) en la versión
  en español.

### Mantenimiento continuo

- Regla para agentes en el repo (`AGENTS.md` / `CLAUDE.md` del proyecto): todo cambio de copy en
  español incluye su actualización en inglés en el mismo commit.
- Test que verifica que los dos idiomas tienen las mismas claves y que el mapa de rutas está completo
  (cada ruta ES tiene par EN y viceversa).

## Restricciones

- Next.js 16 con App Router y `proxy.ts` (no `middleware.ts`). Leer
  `node_modules/next/dist/docs/` antes de escribir código; no hay i18n integrado del App Router, se
  resuelve con segmento dinámico o rutas paralelas.
- No cambiar las URLs en español existentes.
- No agregar dependencias de i18n salvo que el builder justifique que ahorran código real
  (el contenido ya está centralizado en `content/`, probablemente alcanza con un diccionario tipado).
- Mantener los tests existentes (`tests/negotiation`, `llms-txt`, `endpoints`) pasando.
- Hosting en Vercel (el header de país viene de ahí).

## Lo que queda a criterio del builder

- Estructura de carpetas en `app/` (segmento `[lang]` con rewrite interno vs. árbol `/en` aparte).
- Formato exacto de la cookie y lista de user agents de crawlers.
- Cómo se organizan los archivos de `content/` por idioma.

## Decisiones de Claude (a confirmar al leer)

- `/cuentas/*` queda fuera: no pasa a neutro, no se redirige y no entra en el test de pares.
- Como `next.config.mjs` tiene `typescript.ignoreBuildErrors: true`, se suma `tsc --noEmit` a
  `pnpm test` para que una traducción faltante haga fallar los tests.
- Orden de trabajo por fases: 1) rutas, proxy, selector y SEO; 2) español neutro; 3) inglés.
  Cada fase se puede publicar por separado; `/en` lleva `noindex` hasta que se apruebe el inglés.

## Respuestas de Mati a la revisión

- **Aprobación del inglés:** la hace Mati. `/en` lleva `noindex` hasta que la apruebe.
- **App (`app.innov.as`):** su traducción y el renombre a "AI Central" se manejan en otra
  conversación; quedan fuera de este trabajo.
- **Imágenes con texto:** hay que rehacerlas en inglés, y eso es parte del lanzamiento de `/en`
  (lo bloquea). Se rehacen con el procedimiento de ilustraciones del skill `innov-design-system`.
- **Textos legales:** se traducen sin cláusula de prevalencia del español.

## Decisiones de Claude sobre lo que quedó abierto

- Agenda de HubSpot y formulario: `/en` usa los mismos links por ahora. Si el formulario es propio
  del sitio, se le agrega un campo oculto de idioma para distinguir los leads en HubSpot; si es un
  embed de HubSpot, se deja igual y se anota como pendiente.
