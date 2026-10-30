# Presentaciones

## 1. Alcance

Decks comerciales (primera conversación, propuesta, Radar), de seguimiento con clientes y presentaciones institucionales.

## 2. Formatos y medidas

- **16:9**, lienzo de referencia 1280×720 px. En 1920×1080, multiplicar todo por 1.5.
- Conversión a .pptx: 1 px = 0,75 pt (lienzo de 13,33 × 7,5 pulgadas).
- Para mandar afuera de la empresa: PDF, que conserva las fuentes.

### Dónde sale el deck

| Caso | Salida |
|---|---|
| La persona no pide un formato | Formato nativo de Claude (tipo Slides), exportable a .pptx o PDF (decisión del 2026-10-20) |
| La persona pide PowerPoint o .pptx | `scripts/build_pptx.py` |

En los dos casos la marca sale de este archivo y del logo en `assets/logo/png/`: la herramienta pone la estructura, este soporte pone el sistema.

## 3. Grilla y márgenes (sobre 1280×720)

- Margen de 64px a los cuatro lados.
- Etiqueta de sección en y = 72px y título en y = 112px, iguales en todas las slides de contenido.
- Zona del pie: últimos 48px. Nombre del deck y número en mono a la izquierda; **isotipo abajo a la derecha, en todas las slides de contenido**.

## 4. Tipografía

| Elemento | px (1280×720) | pt en .pptx | Fuente |
|---|---|---|---|
| Titular póster | 84 / 96 / 104 (`--text-poster-slide-sm/-slide/-slide-xl`) | 63 / 72 / 78 | Newsreader 700, minúscula, palabra en itálica |
| Título de slide | 52 | 39 | Newsreader 500 (regular en .pptx), minúscula, palabra en itálica |
| Cuerpo | 22–24 | 16,5–18 | Schibsted Grotesk |
| Etiqueta de sección / cinta | 15 | 11 | IBM Plex Mono caja alta, teal |
| Cifra de contador | 96 sola, 64 en fila | 72 / 48 | Newsreader |
| Pie | 14 | 10,5 | IBM Plex Mono, taupe (metadato, no lectura) |

- Un titular póster por slide, de 1 a 4 palabras. Si no entra en 2 o 3 líneas cortas, está mal escrito, no mal maquetado.
- Nada por debajo de 14px.

## 5. Color

- Fondo `#F6F4EF`, texto `#15191A`, acento `#0F6B60`. Oliva `#4F6B00` solo para la gente, la decisión humana o el guiño. Valores de la paleta, nunca los de un tema de la herramienta.
- **Slides oscuras:** máximo 2 por deck (portada y una cita o póster). Fondo `#15191A`. Texto `#F6F4EF`, teal `#5CC4B0`, palabra destacada en lima `#D4F36B`. Relleno teal con texto blanco: `#107468`. `build_pptx.py` pasa a papel la tercera oscura y avisa.
- Lima nunca como texto sobre fondo claro.
- **Bloque lateral teal** (24% del ancho, a sangre): solo portada clara y cierre.

## 6. Logo

**Ningún deck se entrega sin el logo.** Sale siempre del archivo, nunca tipeado.

| Slide | Archivo | Tamaño y lugar |
|---|---|---|
| Portada oscura | `innovas-horizontal-dark.png` | 220px de ancho, arriba a la izquierda |
| Portada clara | `innovas-horizontal-ink.png` | 220px de ancho, arriba a la izquierda |
| Contenido sobre papel | `innovas-isotipo-teal.png` | 28px de alto, abajo a la derecha |
| Contenido oscuro | `innovas-isotipo-paper.png` | 28px de alto, abajo a la derecha |
| Cierre | `innovas-horizontal-ink.png` (o `-dark` si es oscuro) | 200px de ancho, abajo a la izquierda |

Los PNG están a 2x del SVG, con fondo transparente y el resguardo incluido. Si la herramienta acepta SVG, usar el SVG de `assets/logo/` con el mismo nombre.

## 7. Recursos de marca y estructura tipo del deck

Esqueleto (el del home del sitio, v1.6; se adapta a la audiencia). Entre paréntesis, el `tipo` de slide en `build_pptx.py`:

1. **Portada** (`portada`): logo, etiqueta y titular póster. Oscura por defecto; clara con bloque lateral teal.
2. **Manifiesto, "hoy ──→ con INNOV.AS"** (`ab`): pares A y B explícitos, flecha en teal.
3. **Lo que contrata la empresa** (`contenido`): infraestructura, agentes y equipo, con `──→` como viñeta.
4. **Un proceso, no un proyecto** (`camino`): primera conversación, Radar, ola cero, olas y operación continua; el estado actual en teal.
5. **Agentes que toman trabajo, por rubro** (`contenido` o `ab` con "el agente ──→ tu gente").
6. **Control** (`poster`): "tu gente decide, los agentes ejecutan". Puede ser la segunda oscura.
7. **Quiénes somos** (`contadores`): cifra, unidad y contexto, sobre `#ECEAE3`.
8. **Cierre** (`cierre`): la primera conversación como siguiente paso, con bloque lateral teal y logo.

Recursos:

- **Etiquetas de sección:** `03 · CONTROL`. **Cintas:** máximo 2 por slide, sombra sólida desplazada sin desenfoque.
- **Ilustraciones de producto:** captura a 2x de la serie del cerebro ya armada, sobre el mismo fondo, sin recorte ni sombra agregada.
- **Fotos:** las del registro del sitio (`content/imagenes.ts`) con su tratamiento; nunca más de una foto grande por slide.
- **Diagramas:** la flecha `A ──→ B` y la notación mono; si falta un diagrama encargado, dejar el espacio con una nota de placeholder antes que improvisar un ícono.
- **Franja de organizaciones:** logos en monocromo, estáticos, sobre `ink` o `paper-soft`.

Referencia de cómo queda aplicado: `assets/ejemplos/innovas-deck-ejemplo.json` y su `.pptx` (7 slides, una por tipo).

## 8. Accesibilidad y legibilidad

- Cada slide se lee completa en estático: el .pptx exportado puede perder animaciones y transiciones.
- Probar la slide a 50% de zoom: si no se lee, sobra texto.
- Una idea por slide; el título dice la conclusión.
- Orden de lectura correcto de los objetos para que el PDF sea navegable.

## 9. Qué evitar

Más de 2 slides oscuras, dos titulares póster en una slide, slides enteras en oliva o lima, lima como texto sobre claro, degradés y sombras difusas (salvo el velo sobre foto), íconos 3D o de IA genéricos, el logo agrandado como decoración o tipeado, slides de contenido sin isotipo, transiciones vistosas, texto animado letra por letra.

## 10. Checklist

- [ ] Logo horizontal en portada y cierre, isotipo en el pie de cada slide de contenido, siempre en la misma esquina.
- [ ] Fuentes, fondo y logo correctos después de exportar.
- [ ] Texto `#F6F4EF` sobre `#15191A`; `#5CC4B0` y `#D4F36B` solo en slides oscuras.
- [ ] Máximo 2 slides oscuras, un titular póster y 2 cintas por slide.
- [ ] A y B explícitos donde aparece la flecha.
- [ ] Sin guion largo ni signos de apertura (¿ ¡).
- [ ] PDF adjunto si el deck sale de la empresa.

## 11. Notas por herramienta

- **Formato nativo de Claude (tipo Slides):** la estructura y la edición de cada slide siguen las instrucciones del tipo; la marca sale de este archivo. Subir al artifact los PNG del logo que pide la tabla de la sección 6 y referenciarlos desde ahí; cargar Newsreader, Schibsted Grotesk e IBM Plex Mono desde Google Fonts; usar las medidas en px de este archivo, nunca la escala `clamp` de web. Exportar a .pptx o PDF desde ahí.
- **PowerPoint por código:** escribir el contenido como JSON con el esquema de la cabecera de `scripts/build_pptx.py` y correr `python3 scripts/build_pptx.py contenido.json salida.pptx` (requiere `python-pptx`). El script corta si no encuentra el logo.
- **Editores de presentaciones de escritorio:** partir de `assets/ejemplos/innovas-deck-ejemplo.pptx` y duplicar la slide del tipo que haga falta. Incrustar las fuentes si el archivo se comparte editable. Sin las fuentes, el .pptx cae a Georgia y Arial: avisar o mandar el PDF, y no sustituir por otra familia a mano.
- **Editores en la nube y herramientas de diseño online:** cargar paleta, fuentes y logos en el kit de marca; si no se pueden instalar las fuentes, el fallback es Georgia, Arial y Courier New, como último recurso.
