# T4 — Reposicionamiento del sitio innov.as

> Fecha: 2026-08-27 · Estado: aprobado por Mati, listo para implementar
> Ejecutor: Claude Code, sobre el repo del sitio (Next.js App Router, contenido en `content/*.ts`)
> Origen: entrevista de reposicionamiento del 2026-08-27. Decisión de fondo: INNOV.AS se para como firma de ingeniería de transformación digital que ejecuta proyectos grandes end-to-end (organismos, gobierno y mid-market privado). En Paralelo pasa a ser la línea pyme, sub-marca con página propia. Hoy el sitio comunica al revés: el home es el pitch de En Paralelo.

---

## 0. Reglas duras (leer antes de tocar nada)

**Design system.** Todo estilo sale de los tokens del sistema "Cálido / Notación de Transición" ya presentes en `app/globals.css` y Tailwind: cero hex y cero fuentes hardcodeadas en JSX/TSX. Titulares póster (`PosterHeading`): 1 a 4 palabras, máximo uno por pantalla/sección. `TapeLabel`: máximo 2 por composición. Secciones oscuras (`variant="dark"` del Hero): solo acentos con sufijo `-dark`/`-ui-dark`, jamás `text-teal`/`bg-teal` a secas sobre `bg-ink`. Antes de entregar, correr `python3 scripts/audit_tokens.py` del skill de diseño sobre los archivos tocados si está disponible en el repo; si no, revisar a ojo que no haya hex nuevos.

**Copy.** Todo texto nuevo o reescrito cumple las reglas editoriales de la casa:

- Sin em dash (—) ni símbolos de aproximación. Usar coma, punto o "y"/"de".
- Signos de pregunta y exclamación solo de cierre ("por dónde empezamos?"). En los bloques que se tocan, corregir también los existentes.
- Redacción en afirmativo: describir lo que algo es. Excepción única: cuando desmentir es el punto del mensaje (ej. el tagline de En Paralelo "La IA no reemplaza a tu equipo").
- Español rioplatense profesional (voseo), como el resto del sitio.
- En los bloques de contenido que este doc reescribe, eliminar de paso los em dashes que traían las versiones anteriores.

**Modo stealth (regla de empresa, no negociable).** Sin nombres de founders en ninguna parte del sitio: ni copy, ni metadata, ni JSON-LD, ni alt texts. La experiencia previa se nombra sin identificar personas, exactamente al nivel de detalle que ya tiene el sitio hoy (logos y descripciones de proyectos sin nombres propios del equipo). Verificar que ningún cambio introduzca una regresión.

**Qué NO tocar.** `/precio` y toda la mecánica de `precioLaunchReady` quedan como están (solo se agrega un link condicional desde la página nueva). `/desde-adentro` y `/desde-adentro/se-trainer` siguen existiendo sin links entrantes (despublicadas del nav). `/privacidad`, `/terminos`, `/recursos`, `/contacto`: sin cambios de contenido.

---

## 1. Logo oficial (navbar + footer + favicon + schema)

Actualización 2026-09-01: el **logo oficial** (isotipo cabeza-circuito + INNOV.AS, aprobado 2026-08-31, canon en el skill `innov-design-system` v1.1) reemplaza al wordmark tipográfico en todo el sitio. El navbar hoy renderiza el texto `innov.as [A→B]`: eso sale. Los archivos ya están en `public/brand/` (SVGs canon + rasters en `png/`).

- `components/navbar.tsx`: reemplazar el wordmark tipográfico por `<Image src="/brand/innovas-horizontal-ink.svg" alt="INNOV.AS">` (next/image). Mínimo verificado del horizontal: **120px de ancho**; en el navbar usar 140-160px.
- `components/footer.tsx`: mismo logo horizontal `-ink` (el footer es claro). Si alguna vez el footer pasa a fondo `ink`, la variante correcta es `innovas-horizontal-dark.svg` (isotipo en `teal-dark`): `teal` a secas sobre `ink` da 2.68:1 y está prohibido.
- Sobre fondo teal (bloques, CTA banners) va `innovas-horizontal-paper.svg` o el badge.
- Favicon e íconos de `public/` (favicon.ico, icon-*.png): regenerar desde `innovas-badge-iso-teal.svg`. Regla verificada: para 16px va el **badge** (isotipo sobre cuadrado teal), el isotipo transparente no resiste ese tamaño. Mínimo del isotipo suelto: 24px.
- `lib/schema.ts` (JSON-LD): `logo` apunta a `https://innov.as/brand/png/innovas-horizontal-ink.png`; el nombre de la organización queda "INNOV.AS"; si la description repite el posicionamiento viejo, actualizarla con la del footer (sección 2).
- La notación `[A→B]` sigue viva como recurso del sistema (kickers `// 01 ──→`, diagramas, códigos de vertical): el logo firma quién emite, el glifo compone qué se cuenta. Lo que queda deprecado es el wordmark tipográfico como identificador de marca.

---

## 2. `content/global.ts`

```ts
export const navLinks: NavLink[] = [
  { label: "Soluciones", href: "/soluciones" },
  { label: "En Paralelo", href: "/en-paralelo" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Contacto", href: "/contacto" },
]
```

- `precioNavLink` y la lógica de inserción condicional quedan igual (cuando `precioLaunchReady` sea true, "Precios" se inserta después de "En Paralelo", no después de "Soluciones": ajustar el índice del splice en `navbar.tsx`).
- Footer, columna Sitemap: Soluciones · En Paralelo · Nosotros · Contacto.
- `footerInstitutional.description`: `"Ingeniería de transformación digital. Diseñamos, construimos y operamos plataformas de datos e IA. Buenos Aires, Argentina."`
- Resto del archivo sin cambios.

---

## 3. Home — `content/home.ts` + `app/page.tsx`

Nueva estructura de bloques (orden final en `page.tsx`):

```
1. Hero institucional (dark + backdrop network, SE MANTIENE el fondo dinámico de red/brain)
2. Qué construimos          (kicker 01)
3. Cómo ejecutamos          (kicker 02)  ← sección nueva
4. La tesis A→B, versión corta (kicker 03)
5. Credenciales             (kicker 04)  ← contenido intacto, solo cambia el índice del kicker
6. En Paralelo, bloque pyme (kicker 05)  ← sección nueva
7. CTA final dual
```

### 3.1 `hero`

```ts
export const hero = {
  eyebrow: "// diseño → operación",
  posterTitle: "Ingeniería de transformación",
  posterAccent: "transformación",
  supportLine: "Diseñamos, construimos y operamos la solución completa.",
  titlePrefix: "Diseñamos, construimos y operamos ",
  titleHighlight: "la solución completa",
  titleSuffix: ".",
  subhead:
    "Plataformas de datos, software a medida y procesos con IA para organismos internacionales y empresas. El mismo equipo senior de la arquitectura a la operación, con IA nativa en el delivery.",
  ctaPrimary: { label: "Hablemos de tu proyecto", href: "/contacto" } as Cta,
  ctaSecondary: { label: "Cómo trabajamos →", href: "/soluciones" } as Cta,
  rails: [
    { from: "diagnóstico", to: "producción", vertical: "company" as Vertical, note: "proyectos" },
    { from: "equipo senior", to: "equipo + agentes", vertical: "company" as Vertical, note: "delivery" },
  ],
}
```

En `page.tsx` el Hero conserva `variant="dark"` y `backdrop="network"` (decisión explícita de Mati: la imagen dinámica de red/brain se queda). "Ingeniería de transformación" son 3 palabras: entra en la regla de escala póster; verificar en mobile que el clamp no rompa línea de forma fea (si "transformación" queda huérfana, permitir el corte en dos líneas que el componente ya maneja).

### 3.2 `whatWeDo` (reescritura completa)

```ts
export const whatWeDo = {
  kicker: { index: "01", label: "qué construimos" },
  posterTitle: "Qué construimos",
  title: "Plataformas, datos y procesos con IA, de punta a punta",
  intro:
    "Ejecutamos el ciclo completo de un proyecto de transformación: arquitectura, desarrollo, datos y operación. IA embebida donde hace falta criterio, lógica determinística donde hace falta precisión.",
  cards: [
    {
      title: "Plataformas a medida",
      description:
        "Software y productos digitales sobre arquitectura multi-tenant: escalan a nuevas unidades, verticales o países sin rehacer la base.",
      vertical: "company",
    },
    {
      title: "Datos, GIS y analítica",
      description:
        "Pipelines de datos, tableros y plataformas territoriales, con experiencia en datos satelitales para proyectos de organismos internacionales.",
      vertical: "company",
    },
    {
      title: "Procesos con IA",
      description:
        "Agentes y automatización embebidos en la solución: asistentes, bots de proceso y el brain que les da contexto y memoria.",
      vertical: "company",
    },
    {
      title: "Operación continua",
      description:
        "La plataforma entregada se opera: modelos que se optimizan, agentes que se ajustan, infraestructura monitoreada y asegurada.",
      vertical: "company",
    },
  ] as SolutionCard[],
}
```

### 3.3 `howWeExecute` (sección nueva)

```ts
export const howWeExecute = {
  kicker: { index: "02", label: "cómo ejecutamos" },
  posterTitle: "Sin capas",
  posterAccent: "capas",
  title: "Dos diferenciales, verificables en la primera reunión",
  items: [
    {
      title: "Seniority directo",
      description:
        "Los que diseñan son los que construyen y operan. Decisiones de arquitectura con el negocio en la mesa, agilidad de boutique con gobierno de programa de firma grande.",
    },
    {
      title: "IA nativa en el delivery",
      description:
        "Nuestros equipos trabajan aumentados con agentes. Eso entrega a una velocidad y un costo por entregable fuera del alcance de una estructura tradicional.",
    },
  ],
}
```

Layout sugerido en `page.tsx`: sección de dos columnas sobre `bg-paper`, cada diferencial como card `border-ink` con el título en Fraunces y un tick mono `──→` como bullet. Sin componentes nuevos: reutilizar el patrón de cards existente.

### 3.4 `thesis` (versión corta institucional)

Reemplaza a la tesis actual (que se muda completa a `/en-paralelo`, ver sección 4):

```ts
export const thesis = {
  kicker: { index: "03", label: "la tesis" },
  posterTitle: "De A a B",
  posterAccent: "B",
  title: "Toda transformación es un cambio de estado",
  body:
    "Trabajamos con una notación simple: A es cómo opera hoy tu organización, B es cómo opera con la tecnología adoptada. Nuestro trabajo es el trayecto completo, y un sistema está terminado recién cuando tu gente lo adoptó y lo opera.",
  cta: { label: "Cómo trabajamos →", href: "/soluciones" } as Cta,
}
```

En `page.tsx` esta sección conserva el `TransitionDiagram` (la flecha es la firma de la marca) y pierde las cards de engines A/B y el párrafo de champions, que se van a `/en-paralelo`. El kicker deja de usar `vertical="people"`: pasa a la vertical por defecto (teal), porque ya no habla de la línea pyme.

### 3.5 `credentials`

Contenido intacto (stat 25+, intro, logos, 3 cards de proyectos: todo queda tal cual, confirmado por Mati). Solo cambia `kicker.index` a `"04"`.

### 3.6 `enParaleloBlock` (sección nueva, va después de credenciales)

```ts
export const enParaleloBlock = {
  kicker: { index: "05", label: "para pymes" },
  posterTitle: "En Paralelo",
  title: "La IA trabaja en paralelo a tu gente. Vos escalás sin multiplicar estructura.",
  body:
    "Para pymes y empresas de alto valor por persona: implementamos el cerebro digital de tu empresa y agentes educados con tu método, por olas con precio cerrado. Arranca con un diagnóstico corto y sigue solo si ves valor.",
  cta: { label: "Conocé En Paralelo →", href: "/en-paralelo" } as Cta,
}
```

Layout sugerido: sección diferenciada sobre `bg-paper-soft` con borde superior e inferior (`border-y border-line`), mismo patrón visual que la vieja sección de tesis, para que se lea como "otra cosa dentro de la casa". Un solo `PosterHeading` y un CTA prominente.

### 3.7 `finalCta`

```ts
export const finalCta = {
  posterTitle: "Por dónde empezamos",
  title: "Por dónde empezamos?",
  cardA: {
    title: "Proyectos",
    description: "Organismos y empresas con un proyecto de plataforma, datos o IA. Ejecución end-to-end.",
    cta: { label: "Hablemos", href: "/contacto" } as Cta,
    vertical: "company" as Vertical,
  },
  cardB: {
    title: "Pymes: En Paralelo",
    description: "Un cerebro digital y agentes trabajando junto a tu equipo, empezando por un diagnóstico corto.",
    cta: { label: "Conocé En Paralelo", href: "/en-paralelo" } as Cta,
    vertical: "people" as Vertical,
  },
}
```

(`vertical` en las cards es el acento visual del componente `DualCta`, igual que hoy; se mantiene el contraste company/people para que las dos cards se distingan.)

---

## 4. Página nueva — `/en-paralelo`

Crear `content/en-paralelo.ts` y `app/en-paralelo/page.tsx`. Reutilizar los componentes existentes (Hero, SectionKicker, PosterHeading, LevelCard, TransitionDiagram, VerticalRail, CtaBanner/DualCta): sin componentes nuevos. La página recibe `precioLaunchReady` igual que el navbar (misma fuente de verdad) para el CTA de cotización.

### 4.1 `hero`

```ts
export const hero = {
  eyebrow: "// pymes → en paralelo",
  posterTitle: "IA en paralelo",
  posterAccent: "paralelo",
  supportLine: "Crece tu negocio sin aumentar estructura.",
  subhead:
    "La IA no reemplaza a tu equipo: trabaja en paralelo. Implementamos el cerebro digital de tu empresa y agentes educados con tu método, por olas verificables a precio cerrado.",
  ctaPrimary: { label: "Hablemos de tu operación", href: "/contacto" } as Cta,
  // ctaSecondary solo si precioLaunchReady:
  ctaSecondary: { label: "Cotizá online →", href: "/precio" } as Cta,
  rails: [
    { from: "tu equipo hoy", to: "tu equipo con agentes", vertical: "company" as Vertical, note: "empresas" },
    { from: "horas repetitivas", to: "procesos automatizados", vertical: "company" as Vertical, note: "tareas" },
  ],
}
```

Hero en variante clara (sin `dark`): el home se queda con la única pantalla oscura de la ruta principal. Los rails son los del home viejo.

### 4.2 `thesis` (la tesis completa, movida del home)

Migrar tal cual desde el `thesis` actual de `content/home.ts` (versión de hoy, antes de este cambio): kicker "la tesis", posterTitle "No se instala, se adopta" con accent "instala", title "La tecnología sola no transforma nada", body, intro "Por eso pensamos la transformación como un solo movimiento, de A a B:", los dos `engines` (A — Hoy / B — En paralelo) y el `closing` de champions. El CTA del bloque pasa a `{ label: "Cómo funciona →", href: "#como-funciona" }` (ancla interna). Conserva `vertical="people"` en el kicker y el `TransitionDiagram`.

### 4.3 `whatWeBuild` (movido del home viejo)

Las 4 cards del `whatWeDo` actual del home migran acá sin cambios de texto: Asistentes digitales, Bots de proceso, Company Brain, IA con gobernanza. Kicker: `{ index: "02", label: "qué implementamos" }`, posterTitle "Asistentes y brains", title e intro los actuales del home.

### 4.4 `howItWorks` (movido de soluciones)

La metodología Radar / Mapa del Método / Olas de transformación / Operar en B migra desde `content/soluciones.ts` (bloque `methodology.steps`) sin cambios de texto, más los 4 `pillars` del bloque `operateInB` actual como sub-sección "Operar en B". Kicker `{ index: "03", label: "cómo funciona" }`, id de ancla `como-funciona`. Los `principles` NO migran (se quedan en soluciones, son de la casa).

### 4.5 `audience`

```ts
export const audience = {
  kicker: { index: "04", label: "para quién" },
  posterTitle: "Para quién",
  title: "Hecho para empresas de alto valor por persona",
  items: [
    "Tu facturación es alta para la gente que son: corredores, distribuidores, estudios, agencias, importadores.",
    "El método que funciona vive en la cabeza de pocas personas, y los sistemas que tenés registran lo que ya pasó.",
    "Para manejar el doble tendrías que contratar el doble, y eso te pone un techo.",
  ],
  note: "Si tu proyecto es construir una plataforma o un producto digital a medida, mirá Soluciones.",
  noteCta: { label: "Soluciones →", href: "/soluciones" } as Cta,
}
```

### 4.6 `finalCta`

```ts
export const finalCta = {
  title: "El diagnóstico se agenda en una llamada",
  cta: { label: "Hablemos", href: "/contacto" } as Cta,
  note: "Cuatro reuniones de una hora y un mapa de oportunidades priorizadas. Se acredita al paso siguiente.",
}
```

Si `precioLaunchReady` es true, agregar CTA secundario "Cotizá online →" a `/precio`.

---

## 5. Soluciones — `content/soluciones.ts` (reescritura institucional)

La página pasa a ser la página de la línea principal: proyectos end-to-end. La metodología Radar/Olas se va a `/en-paralelo` (sección 4.4).

### 5.1 `hero`

```ts
export const hero = {
  eyebrow: "// soluciones → producción",
  posterTitle: "De punta a punta",
  posterAccent: "punta",
  title: "Diseñamos, construimos y operamos",
  subhead:
    "Proyectos de transformación para organismos internacionales y empresas: de la arquitectura a producción, con el mismo equipo senior en cada fase y IA nativa en el delivery.",
  ctaPrimary: { label: "Hablemos de tu proyecto", href: "/contacto" } as Cta,
}
```

### 5.2 `solutionTypes` (qué construimos, versión extendida)

Kicker `{ index: "01", label: "qué construimos" }`, posterTitle "Qué construimos", title "Plataformas, datos y procesos con IA".

```ts
items: [
  {
    title: "Plataformas y productos a medida",
    description:
      "Aplicaciones web y productos digitales sobre Next.js, Node y Postgres, con arquitectura multi-tenant: escalan a nuevas unidades, verticales o países sin rehacer la base.",
  },
  {
    title: "Datos, GIS y analítica",
    description:
      "Pipelines de datos, dashboards y plataformas territoriales para decisiones operativas, con experiencia en datos satelitales y análisis geoespacial para organismos internacionales.",
  },
  {
    title: "Procesos con IA",
    description:
      "Asistentes, agentes de proceso y el brain que les da contexto, embebidos en la solución. IA donde hace falta criterio, lógica determinística donde hace falta precisión, y gobernanza para que el directorio sepa qué hace la IA y con qué resultado.",
  },
  {
    title: "Integraciones y APIs",
    description:
      "Orquestación entre sistemas existentes: aprobaciones, reportes, sincronización. Trazable, auditable, mantenible.",
  },
]
```

### 5.3 `methodology` (reescrito: fases de proyecto institucional)

Kicker `{ index: "02", label: "cómo trabajamos" }`, posterTitle "Cómo trabajamos".

```ts
steps: [
  {
    title: "Descubrimiento y arquitectura.",
    description:
      "Relevamiento con las áreas involucradas, arquitectura de solución y alcance cerrado por fase. Las decisiones estructurales se toman con el negocio en la mesa.",
  },
  {
    title: "Construcción por fases.",
    description:
      "Cada fase entrega un tramo del sistema verificable: diseño, desarrollo, pruebas de aceptación. Entregables definidos por contrato, gate de decisión entre fases.",
  },
  {
    title: "Go-live e hipercuidado.",
    description:
      "Puesta en producción acompañada: monitoreo intensivo, ajustes finos y transferencia a los equipos del cliente.",
  },
  {
    title: "Operación continua.",
    description:
      "La plataforma se opera y evoluciona: optimización de modelos y costos, ajuste de agentes, infraestructura monitoreada y asegurada, y detección de las próximas etapas.",
  },
]
```

Los 4 `principles` actuales quedan tal cual (son de la casa y ya cumplen las reglas de copy).

### 5.4 `operateInB`

Queda en la página con el mismo contenido actual (intro, foundation, 4 pillars): el argumento "un sistema con IA no se termina, se opera" vale para las dos líneas y acá sostiene la fase 4. Solo corregir el em dash del texto si aparece en los bloques tocados.

### 5.5 `audience` (reescrito)

```ts
items: [
  "Organismos internacionales y sector público: proyectos de datos, plataformas territoriales y transformación institucional, vía licitación o contratación directa.",
  "Empresas medianas y grandes con un proyecto concreto de plataforma, producto digital o procesos con IA, y un sponsor en dirección o gerencia general.",
],
note: "Sos una pyme y querés empezar por tu operación diaria? Mirá En Paralelo.",
noteCta: { label: "En Paralelo →", href: "/en-paralelo" }
```

### 5.6 `finalCta`

```ts
export const finalCta = {
  title: "Contanos tu proyecto",
  cta: { label: "Hablemos", href: "/contacto" } as Cta,
  note: "La primera conversación es con el equipo que después ejecuta.",
}
```

### 5.7 `app/soluciones/page.tsx`

Ajustar al nuevo contenido (mismos componentes; la sección de metodología ahora son las 4 fases; agregar la nota con CTA a En Paralelo al final del bloque audience).

---

## 6. Nosotros — retoques mínimos

`content/nosotros.ts` ya está alineado ("Ingeniería de transformación, probada en el terreno"). Cambios puntuales:

- `hero.subhead`: reemplazar por `"INNOV.AS nace de años de construir tecnología para quienes menos margen de error tienen: organismos internacionales, sector público y empresas en plena transformación. Hoy ejecutamos esa experiencia como firma: el mismo equipo senior diseña, construye y opera."`
- `team.intro`: quitar la construcción negativa y el em dash: `"Somos un equipo chico y estable: arquitectos de producto e ingenieros con roles fijos. Cada integrante responde por un tramo del sistema de punta a punta."`
- Resto igual. Verificar que siga sin nombres propios (stealth).

---

## 7. SEO, sitemap y metadata

### `content/seo.ts`

```ts
"/": {
  title: "INNOV.AS — Ingeniería de transformación digital con IA nativa",
  description:
    "Diseñamos, construimos y operamos plataformas de datos, software a medida y procesos con IA para organismos internacionales y empresas en Latinoamérica. El mismo equipo senior de la arquitectura a la operación.",
},
"/soluciones": {
  title: "Soluciones — Proyectos end-to-end de datos e IA | INNOV.AS",
  description:
    "Plataformas a medida, datos y GIS, procesos con IA e integraciones: proyectos de transformación por fases verificables, del descubrimiento a la operación continua.",
},
"/en-paralelo": {
  title: "En Paralelo — IA trabajando junto a tu equipo | INNOV.AS",
  description:
    "La línea de INNOV.AS para pymes: cerebro digital y agentes educados con tu método, por olas verificables a precio cerrado. La IA trabaja en paralelo a tu gente, vos escalás sin multiplicar estructura.",
},
```

Las demás entradas quedan igual (incluida `/precio`, que ya nombra a En Paralelo).

### Otros

- `app/sitemap.ts`: agregar `/en-paralelo`.
- `app/en-paralelo/page.tsx`: exportar `metadata` desde `content/seo.ts` con el mismo patrón que las otras páginas.
- `lib/schema.ts`: revisar el JSON-LD de Organization; si la `description` trae el posicionamiento viejo, usar la description nueva del home. Sin nombres de personas (stealth).
- Redirects: ninguno (no cambia ninguna URL existente).

---

## 8. QA antes de entregar

1. `npm run build` y `npm run lint` limpios; `npm run test` (vitest) verde.
2. `python3 scripts/audit_tokens.py` (del design system) sobre los archivos tocados, o revisión manual: cero hex y cero fuentes hardcodeadas nuevas.
3. Grep de regresión de copy en los archivos tocados: sin `—`, sin `¿`, sin `¡`.
4. Grep de stealth en todo `content/`, `app/`, `lib/schema.ts`: cero apariciones de nombres de founders.
5. Navegación: las 4 entradas del nav resuelven; el link "Precios" solo aparece con `precioLaunchReady` y queda en la posición correcta; footer actualizado.
6. `/en-paralelo` renderiza con hero claro, tesis completa con diagrama, 4 cards, metodología con ancla `#como-funciona` funcionando, CTA de precio visible solo con el gate activo.
7. Home: hero oscuro con backdrop network intacto, acentos de la sección oscura con tokens `-dark`, orden de kickers 01 a 05 consistente, un solo PosterHeading por sección.
8. `prefers-reduced-motion` sigue respetado (no agregar animaciones nuevas fuera de las que ya traen los componentes).
9. Mobile: poster del hero ("Ingeniería de transformación") legible en 375px de ancho.
10. Sitemap incluye `/en-paralelo`; `/desde-adentro` sigue sin links entrantes.

---

## 9. Fuera de alcance de esta tarea

LinkedIn institucional, decks PPT, cambios en `/precio` o en el cotizador, `/desde-adentro`, ilustraciones nuevas (los `IllustrationSlot` se encargan aparte), y cualquier contenido del brain. El copy de este doc es final y aprobado; ante una duda de implementación que obligue a cambiar un texto, consultar antes de improvisar.
