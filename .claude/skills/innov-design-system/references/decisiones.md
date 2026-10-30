# Registro de decisiones

Una línea por decisión o propuesta. Lo más nuevo arriba. Estado: `propuesta` · `aprobada` · `descartada` · `pendiente` · `retirada`.

| Fecha | Versión | Decisión | Estado | Responsable |
|---|---|---|---|---|
| 2026-10-30 | 1.8 | Documentos: sin formato pedido, salen como Google Doc en el Drive de INNOV.AS vía `gws-innov`; sin `gws-innov`, como .docx. El Google Doc es el .docx de `build_docx.py` subido con conversión | aprobada | Mati |
| 2026-10-30 | 1.8 | Presentaciones como soporte con sistema propio dentro del skill (no un sistema de diseño aparte): estructura tipo con un tipo de slide por sección, `build_pptx.py` y deck de ejemplo | aprobada | Mati |
| 2026-10-30 | 1.8 | Logo obligatorio en toda pieza fija; PNG a 2x de las diez variantes en `assets/logo/png/` y `public/brand/png/` | aprobada | Mati |
| 2026-10-30 | 1.8 | En documentos editables Newsreader va en peso regular (el 500 no existe con el mismo nombre en Word y Google Docs) | aprobada | Mati |
| 2026-10-30 | 1.8 | Tamaños de slides fijados con el deck de ejemplo: título 52px, cuerpo 22–24px, etiqueta 15px, pie 14px | propuesta | Luli |
| 2026-10-30 | — | `innovas-lockup-vertical-paper.png` existe en `public/brand/png/` sin SVG ni lugar en la tabla de variantes: incorporarlo o retirarlo | pendiente | Luli |
| 2026-10-27 | 1.7 | Skill reorganizado por soporte (web, presentaciones, documentos, redes, email) con la estructura del de Lagomarsino; base común en `SKILL.md`; componentes, ilustración, gobierno y decisiones aparte. Sale `references/non-code-usage.md`. Sin cambios de reglas | aprobada | Mati |
| 2026-10-27 | 1.7 | Reglas de redes sociales y email | propuesta | Luli / Mati |
| 2026-10-27 | 1.7 | Tamaños de título, cuerpo y márgenes en slides y documentos (marcados "referencia v1.7") | propuesta | Luli |
| 2026-10-27 | 1.7 | Se reponen en `assets/tokens/globals.css` los tokens que la v1.5 había perdido: `--text-poster-slide-*`, `--interlock-*`, `--tape-rot-alt`, `--tape-size`, `--colorblock-w*`, `--illus-*` | aprobada | Mati |
| 2026-10-27 | 1.6.1 | `plum-ui-dark` pasa a `#516E00` (3.02:1 sobre `ink`; `#4F6B00` daba 2.90) | aprobada | Mati |
| 2026-10-27 | 1.6.1 | El sitio deja el óxido `#B0441F` / coral `#E07A55` y usa oliva y lima como segundo color | aprobada | Mati |
| 2026-10-27 | 1.6.1 | Logo (SVG y PNG) e ilustraciones a mano recoloreados a la v1.5; style tile rehecho; botones teal sobre oscuro en `teal-ui-dark`; demos `demo-*.tsx` borradas; `audit_tokens.py` separa errores de avisos | aprobada | Mati |
| 2026-10-27 | 1.6 | Venta enterprise: fotografía con tratamiento común (`Foto`, `.foto`, `.foto-natural`), solo en el sitio | aprobada | Luli / Mati |
| 2026-10-27 | 1.6 | Home reordenado (manifiesto, hoy → con INNOV.AS, lo que contratás, recorrido, agentes por rubro, control) y `/central-ia` por componentes y continuidad, sin demos | aprobada | Luli / Mati |
| 2026-10-27 | 1.6 | Central IA como base del proceso y del equipo en el home y la oferta, no como protagonista. Se aparta de `marketing/mensajes-innovas` | pendiente | Mati |
| 2026-10-27 | 1.5 | Paleta papel `#F6F4EF` / tinta `#15191A` / teal `#0F6B60`, segundo color oliva `#4F6B00` sobre claro y lima `#D4F36B` sobre oscuro; rige para toda pieza. Sale `paper-print` | aprobada | Luli / Mati |
| 2026-10-27 | 1.5 | Newsreader + Schibsted Grotesk + IBM Plex Mono reemplazan a Fraunces, Inter y Space Mono | aprobada | Luli / Mati |
| 2026-10-27 | 1.5 | Barra y botones en píldora, tarjetas blancas con filete de tinta | aprobada | Luli / Mati |
| 2026-10-26 | 1.5 | Serie del cerebro (`CerebroRed`, `AgenteRobot`, `HerramientasEnchufe`) y hero con grano (`HeroGrano`) | aprobada | Luli |
| 2026-10-26 | 1.5 | Escenas en volumen (`AgentScene`) fuera del sitio | retirada | Luli |
| 2026-10-22 | 1.4 | Escenas animadas en volumen para piezas de producto y dolores, con bots con visor y ojos | retirada (v1.5) | Mati |
| 2026-10-22 | 1.3.1 | Fondo animado propio en el hero de cada página interna (`HeroField`, seis patrones) | aprobada | Mati |
| 2026-10-21 | 1.3 | La franja institucional corre como marquesina lenta (excepción de motion) | aprobada | Mati |
| 2026-10-20 | 1.3 | `teal` = plataforma y segundo color = gente; camino del cliente en cinco estados; sección de contenido y voz | aprobada | Mati |
| 2026-10-20 | 1.3 | Documentos Word con fondo blanco `#FFFFFF` | aprobada | Mati |
| 2026-10-20 | 1.3 | Decks en el formato nativo de Claude, exportados a .pptx | aprobada | Mati |
| 2026-10-10 | 1.2 | Ilustración a mano de objetos y diagramas (`HandDrawn`, trazo 3.2px, acento teal y detalle) con procedimiento obligatorio de ocho pasos | aprobada | Mati |
| 2026-10-10 | 1.2 | Escala póster web un escalón menos; hero oscuro con trama de puntos (`HeroDots`) | aprobada | Mati |
| 2026-08 | 1.1 | Logo canónico (isotipo circuito + wordmark `INNOV.AS`), siete variantes, contraste, tamaño mínimo y resguardo medidos. Se deprecan el wordmark tipográfico y el set BUILD SOLUTIONS / N invertida | aprobada | Mati |
| 2026-08 | 1.0 | Capa editorial de escala póster (PosterHeading, TapeLabel, InterlockHeadline, StatCounter, IllustrationSlot) sobre el sistema "Cálido / Notación de Transición" | aprobada | Mati |
| 2026-10-27 | — | Si decks, documentos y redes pasan a la serie del cerebro o siguen con la ilustración a mano | pendiente | Mati |
| 2026-10-27 | — | Implementar el camino del cliente (`LevelPath`) en el sitio con la spec de la v1.3 | pendiente | Sitio |
| 2026-10-20 | — | Migrar las clases `vertical-*` del sitio a `accent-system/people` | pendiente | Sitio |
| 2026-10-10 | — | Lucide como set de íconos | propuesta | Luli |
| 2026-08 | — | Logos institucionales (BM, BID, FAO, SAGyP) en monocromo para la franja | pendiente | Luli |
| 2026-08 | — | Actualizar `innov/diseno/` y el `.skill` empaquetado (siguen en la v1.1) | pendiente | Mati |
