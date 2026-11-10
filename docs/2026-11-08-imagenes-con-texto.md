# Imágenes e ilustraciones con texto (versión en inglés)

Relevamiento de todo lo visual que usan las páginas de `app/`. Resultado: ninguna imagen ni ilustración del sitio lleva texto en español dentro del archivo o del código de dibujo, así que no hizo falta rehacer ni duplicar ninguna. Los textos asociados (alt y aria-label) ya salen de `content/imagenes/{es,en}.ts` según el idioma.

## Imágenes propias (public/images)

| Archivo | Texto que tiene | Dónde se usa | Resolución |
|---|---|---|---|
| central-ia-hero.jpg, equipo-fondo.jpg, roles-nuestro.jpg, roles-tu-lado.jpg | Ninguno (ondas, esferas y siluetas borrosas) | Heros y bloques de /central-ia, /nosotros, /servicios | Sin cambios |
| manifiesto-base.jpg, manifiesto-agentes.jpg, manifiesto-equipo.jpg | Ninguno (edificio, pasillo de tableros, vigas) | Manifiesto de la home | Sin cambios |
| control-reunion.jpg, continuidad-traspaso.jpg, servicios-hero.jpg | Ninguno (personas desenfocadas; la pizarra de servicios-hero está en blanco) | Home, /central-ia, /servicios | Sin cambios |
| como-trabajamos.jpg, equipo-pizarra.jpg | Garabatos ilegibles en una pizarra, desenfocados por el movimiento; no se lee ninguna palabra | /servicios, /central-ia | Sin cambios |
| home-hero.png | Ninguno (las pantallas del escritorio no son legibles) | Imagen Open Graph por defecto (lib/metadata.ts) | Sin cambios |
| se-trainer-banner.png | Ya está en inglés (ideation, flow, goals, feedback loop) | No lo usa ninguna página | Sin cambios; sin uso |

Las fotos de Unsplash no llevan texto.

## Ilustraciones y escenas en código

| Archivo | Texto | Resolución |
|---|---|---|
| components/illustrations/hand-drawn.tsx y home.ts | Solo trazos (paths); el texto accesible entra por la prop `label`, que viene de `ilustraciones` en content/imagenes por idioma | Ya bilingüe |
| components/cerebro-red.tsx, agente-robot.tsx, herramientas-enchufe.tsx (canvas) | Sin `fillText` ni texto; el `label` accesible viene de content/imagenes por idioma | Ya bilingüe |
| components/animated/agent-scene.tsx, scene-shader.ts, hero-field.tsx, hero-dots.tsx, hero-grano.tsx | Shaders y canvas sin texto; solo un `console.warn` de desarrollo en español (no visible para el visitante) | Sin cambios |
| components/logo.tsx, public/brand/*.svg, public/*.svg | Marca INNOV.AS, igual en ambos idiomas; sin `<text>` | Sin cambios |
| public/brand/ilustraciones/serie-cerebro-*.png | Sin texto (cerebro en red); ningún componente las usa | Sin cambios |

## Verificación en /en (EN_LIVE en true, local)

Se revisó el HTML de /en, /en/services, /en/ai-central, /en/about, /en/contact, /en/projects, /en/pricing, /en/privacy y /en/terms: todos responden 200, no hay `<text>` en SVG y todos los alt y aria-label están en inglés. EN_LIVE se dejó otra vez en false.
