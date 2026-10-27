# Documentos

## 1. Alcance

Propuestas comerciales y técnicas en Word, informes del Radar, one-pagers, contratos y anexos, y cualquier documento que se lea en pantalla o se imprima.

## 2. Formatos y medidas

- **A4 vertical** como estándar (210×297mm).
- **Word (.docx): fondo blanco `#FFFFFF`**, sin color de página ni sombreado de fondo en ninguna sección (decisión del 2026-10-20, para imprimir sin gastar tinta).
- **PDF de diseño (one-pager, informe maquetado):** fondo `paper` `#F6F4EF`.
- Para terceros, siempre exportar también a PDF.

## 3. Grilla y márgenes

- Márgenes de 25mm (referencia v1.7). Encabezado y pie a 12mm del borde.
- Una columna para texto corrido; dos columnas solo en one-pagers.
- Sin bloques de color a sangre ni franjas de borde a borde: se imprimen mal en impresoras de oficina. El bloque lateral teal es para decks y web.

## 4. Tipografía

| Estilo | Fuente | Tamaño (referencia v1.7) | Color |
|---|---|---|---|
| Título del documento | Newsreader 500, minúscula, palabra en itálica | 28pt | `#15191A`, destacada en `#0F6B60` |
| Título 1 | Newsreader 500 | 18–20pt | `#15191A` |
| Título 2 | Schibsted Grotesk bold | 13–14pt | `#15191A` |
| Etiqueta de sección / estado | IBM Plex Mono caja alta | 8–9pt | `#0F6B60` |
| Cuerpo | Schibsted Grotesk | 10.5–11pt | `#15191A` |
| Tablas | Schibsted Grotesk | 9pt | `#15191A` |
| Notas, pie, fuentes | Schibsted Grotesk | 8pt | `#15191A` |

- Usar estilos de párrafo con nombre, no formato manual: así funcionan el índice, la navegación y el PDF accesible.
- Titular póster y cintas solo en la portada, si la pieza las necesita. Dentro del documento, títulos normales.
- Fallback si quien recibe no tiene las fuentes: Georgia para títulos y Arial para cuerpo.

## 5. Color

- Texto y estructura en `#15191A`. Filetes y bordes de tabla en `#15191A` o `#A3A69F` (taupe solo como filete, nunca como texto).
- Acento `#0F6B60` para el título clave, filetes y encabezados de tabla (6.38:1 sobre blanco). Oliva `#4F6B00` solo como detalle puntual (6.11:1).
- Bloques secundarios (cuadro destacado, fila de tabla): `#ECEAE3`.
- **El lima no va en Word**: sobre blanco no se lee.
- Rojo funcional `#B23A48` solo para riesgos o errores en tablas, con etiqueta de texto.

## 6. Logo

- **Portada o encabezado:** `innovas-horizontal-ink.svg` (o su PNG a 2x), ≥32mm de ancho, con su área de resguardo.
- **Páginas interiores:** isotipo de 8–10mm en el encabezado o el pie (referencia v1.7).
- **A una tinta:** `innovas-horizontal-mono-ink.svg`.

## 7. Recursos de marca

- **Contadores:** cifra en Newsreader con unidad y contexto debajo en Schibsted Grotesk, dentro de un recuadro `#ECEAE3`.
- **Flecha y A/B:** en el resumen ejecutivo, el par "hoy ──→ con INNOV.AS" explícito.
- **Camino del cliente:** la escalera de cinco estados con la flecha, el nodo destacado en teal.
- **Ilustraciones:** captura a 2x de la serie del cerebro sobre el fondo de la página.
- **Sin fotos** en Word; en un one-pager de PDF, a lo sumo una foto del registro del sitio, tratada.

### Tipos de documento

| Tipo | Portada | Particularidad |
|---|---|---|
| Propuesta comercial | Sí | Resumen ejecutivo de 1 página con A y B, alcance por olas, precio solo si es para ese cliente, cierre con el siguiente paso |
| Informe del Radar | Sí | Hallazgos, mapa del método, recomendación de ola cero |
| One-pager | No | Dos columnas, contadores, una ilustración o foto |
| Contrato o anexo | No | Estilos limpios, sin capa editorial |

## 8. Accesibilidad y legibilidad

- Estilos de título reales (no negrita agrandada) para que el PDF tenga estructura navegable.
- Texto alternativo en imágenes y diagramas.
- Tablas con fila de encabezado marcada como tal.
- PDF exportado con etiquetas de accesibilidad.

## 9. Qué evitar

Color de página o sombreado de fondo en Word, franjas a sangre, lima en cualquier parte, taupe como texto, marcas de agua con el logo agrandado, más de dos niveles de viñetas, capturas de pantalla borrosas, nombres de personas del equipo.

## 10. Checklist

- [ ] Word sobre blanco; PDF de diseño sobre papel.
- [ ] Estilos de párrafo aplicados.
- [ ] Logo correcto con resguardo.
- [ ] Teal como acento; oliva puntual; sin lima.
- [ ] Pie con nombre del documento, fecha y página.
- [ ] PDF accesible adjunto si sale de la empresa.

## 11. Notas por herramienta

- **Procesadores de texto de escritorio:** guardar una plantilla con estilos, encabezado y pie; incrustar las fuentes si el archivo se comparte editable.
- **Procesadores de texto en la nube:** configurar los estilos de título una vez y guardarlos como predeterminados. Si no están las tres fuentes, usar el fallback y avisar.
- **Generación por código (docx/pdf):** tomar los hex de este archivo, nunca los de un tema por defecto de la librería.
