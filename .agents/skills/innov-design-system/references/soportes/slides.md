# Presentaciones

## 1. Alcance

Decks comerciales (primera conversación, propuesta, Radar), de seguimiento con clientes y presentaciones institucionales. Los decks de INNOV.AS se arman en el formato nativo de Claude (el tipo Slides) y se exportan de ahí a .pptx o PDF; las reglas valen igual en cualquier otra herramienta.

## 2. Formatos y medidas

- **16:9**, lienzo de referencia 1280×720 px. En 1920×1080, multiplicar todo por 1.5.
- Conversión al .pptx exportado: 1 px = 0,75 pt (lienzo de 13,33 pulgadas de ancho).
- Para mandar afuera de la empresa: PDF, que conserva las fuentes.

## 3. Grilla y márgenes (sobre 1280×720)

- Margen de 64px a los cuatro lados (referencia v1.7).
- Título siempre a la misma altura en las slides de contenido.
- Etiqueta de sección mono arriba del título; logo o isotipo en el pie, siempre en la misma esquina.

## 4. Tipografía

| Elemento | px (1280×720) | pt en .pptx | Fuente |
|---|---|---|---|
| Titular póster | 84 / 96 / 104 (`--text-poster-slide-sm/-slide/-slide-xl`) | 63 / 72 / 78 | Newsreader 700, minúscula, palabra en itálica |
| Título de slide | 48–56 (referencia v1.7) | 36–42 | Newsreader 500, minúscula |
| Cuerpo | 20–24 (referencia v1.7) | 15–18 | Schibsted Grotesk |
| Etiqueta de sección / cinta | 14–16 | 11–12 | IBM Plex Mono caja alta |
| Cifra de contador | 96 sola, 56–64 en fila | 72 / 42–48 | Newsreader |

- Un titular póster por slide, de 1 a 4 palabras. Si no entra en 2–3 líneas cortas, está mal escrito, no mal maquetado.
- Nada por debajo de 14px.

## 5. Color

- Fondo `#F6F4EF`, texto `#15191A`, acento `#0F6B60`. Oliva `#4F6B00` solo para la gente, la decisión humana o el guiño. Valores en hex directo de la paleta, nunca los de un tema de la herramienta.
- **Slides oscuras:** máximo 2 por deck (portada y cierre, o una cita). Fondo `#15191A` liso o con foto tratada y velo. Texto `#F6F4EF`, teal `#5CC4B0`, segundo color lima `#D4F36B`. Relleno teal con texto blanco: `#107468`; relleno oliva con texto blanco: `#516E00`.
- Lima nunca como texto sobre fondo claro.

## 6. Logo

- **Portada:** `innovas-horizontal-ink.svg` sobre papel o `innovas-horizontal-dark.svg` sobre tinta, ≥120px de ancho, con su resguardo.
- **Slides de contenido:** isotipo de 24–32px en el pie, siempre en la misma esquina.
- **Cierre:** logo horizontal o badge `innovas-badge-lockup-teal.svg` como sello.
- Si el formato no admite SVG, un PNG exportado a 2x del mismo SVG, sin recolorear.

## 7. Recursos de marca — estructura tipo del deck

Esqueleto sugerido (el del home del sitio, v1.6; se adapta a la audiencia):

1. **Portada:** logo y titular póster. Puede llevar el bloque lateral teal o una foto a sangre con velo de tinta (son los únicos elementos a sangre del deck).
2. **Manifiesto o "hoy ──→ con INNOV.AS":** pares A y B explícitos.
3. **Lo que contrata la empresa:** infraestructura, agentes y equipo.
4. **Un proceso, no un proyecto:** primera conversación, Radar, ola cero, olas y operación continua, como camino del cliente con la flecha.
5. **Agentes que toman trabajo, por rubro:** "el agente ──→ tu gente".
6. **Control:** "tu gente decide, los agentes ejecutan".
7. **Quiénes somos:** trayectoria del equipo con contadores (cifra, unidad y contexto).
8. **Cierre:** la primera conversación como siguiente paso.

Recursos:

- **Etiquetas de sección:** `03 · CONTROL`. **Cintas:** máximo 2 por slide, sombra sólida desplazada sin desenfoque.
- **Ilustraciones de producto:** captura a 2x de la serie del cerebro ya armada, sobre el mismo fondo, sin recorte ni sombra agregada.
- **Fotos:** las del registro del sitio (`content/imagenes.ts`) con su tratamiento; nunca más de una foto grande por slide.
- **Diagramas:** la flecha `A ──→ B` y la notación mono; si falta un diagrama encargado, dejar el espacio con una nota de placeholder antes que improvisar un ícono.
- **Franja de organizaciones:** logos en monocromo, estáticos, sobre `ink` o `paper-soft`.

## 8. Accesibilidad y legibilidad

- Cada slide se lee completa en estático: el .pptx exportado puede perder animaciones y transiciones.
- Probar la slide a 50% de zoom: si no se lee, sobra texto.
- Una idea por slide; el título dice la conclusión.
- Orden de lectura correcto de los objetos para que el PDF sea navegable.

## 9. Qué evitar

Más de 2 slides oscuras, dos titulares póster en una slide, slides enteras en oliva o lima, lima como texto sobre claro, degradés y sombras difusas (salvo el velo sobre foto), íconos 3D o de IA genéricos, el logo agrandado como decoración, transiciones vistosas, texto animado letra por letra.

## 10. Checklist

- [ ] Fuentes, fondo y logo correctos después de exportar.
- [ ] Texto `#F6F4EF` sobre `#15191A`; `#5CC4B0` y `#D4F36B` solo en slides oscuras.
- [ ] Máximo 2 slides oscuras, un titular póster y 2 cintas por slide.
- [ ] A y B explícitos donde aparece la flecha.
- [ ] Sin guion largo ni signos de apertura (¿ ¡).
- [ ] PDF adjunto si el deck sale de la empresa.

## 11. Notas por herramienta

- **Formato nativo de Claude (tipo Slides):** la estructura y la edición de cada slide siguen las instrucciones del tipo; este archivo aporta la marca. Exportar a .pptx o PDF desde ahí.
- **Editores de presentaciones de escritorio:** definir un patrón con los diseños de la estructura tipo y usar marcadores de posición. Incrustar las fuentes si el archivo se comparte editable. Sin las fuentes, el .pptx cae a Georgia y Arial: avisar o mandar el PDF, y no sustituir por otra familia a mano.
- **Editores en la nube y herramientas de diseño online:** cargar paleta, fuentes y logos en el kit de marca; si no se pueden instalar las fuentes, el fallback es Georgia, Arial y Courier New, como último recurso.
