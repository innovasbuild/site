# Documentos

## 1. Alcance

Propuestas comerciales y técnicas, informes del Radar, one-pagers, contratos y anexos, y cualquier documento que se lea en pantalla o se imprima.

## 2. Formatos y medidas

- **A4 vertical** como estándar (210×297mm).
- **Documento editable (Google Docs o Word): fondo blanco `#FFFFFF`**, sin color de página ni sombreado de fondo en ninguna sección (decisión del 2026-10-20, para imprimir sin gastar tinta).
- **PDF de diseño (one-pager, informe maquetado):** fondo `paper` `#F6F4EF`.
- Para terceros, siempre exportar también a PDF.

### Dónde sale el documento (v1.8)

| Caso | Salida |
|---|---|
| La persona no pide un formato | **Google Doc** en el Drive de INNOV.AS, creado con `gws-innov` |
| `gws-innov` no está disponible en la sesión | **.docx** |
| La persona pide Word, .docx o PDF | Ese formato |

Las dos salidas parten del mismo archivo: **`scripts/build_docx.py`** arma el .docx con la marca y, para Google Docs, ese .docx se sube con conversión. Así el Google Doc hereda estilos con nombre, logo, encabezado y pie sin rehacer nada a mano. Google Docs tiene las tres fuentes de la marca, así que el documento se ve igual que el Word (verificado el 2026-10-30).

## 3. Grilla y márgenes

- Márgenes de 25mm. Encabezado y pie a 12mm del borde.
- Una columna para texto corrido; dos columnas solo en one-pagers.
- Sin bloques de color a sangre ni franjas de borde a borde: se imprimen mal en impresoras de oficina. El bloque lateral teal es para decks y web.

## 4. Tipografía

| Estilo (nombre en el archivo) | Fuente | Tamaño | Color |
|---|---|---|---|
| Título | Newsreader, minúscula, palabra en itálica | 28pt | `#15191A`, destacada en `#0F6B60` |
| Título 1 (`Heading 1`) | Newsreader, minúscula | 19pt | `#15191A` |
| Título 2 (`Heading 2`) | Schibsted Grotesk bold | 13.5pt | `#15191A` |
| Etiqueta | IBM Plex Mono caja alta | 8.5pt | `#0F6B60` |
| Normal (cuerpo) | Schibsted Grotesk, interlineado 1.25 | 10.5pt | `#15191A` |
| Texto de tabla | Schibsted Grotesk | 9pt | `#15191A` |
| Cifra | Newsreader | 30pt | `#15191A` |
| Notación (flecha, fechas, estados) | IBM Plex Mono | 9.5pt | `#15191A` |
| Nota (pie, fuentes) | Schibsted Grotesk | 8pt | `#15191A` |

- Usar siempre los estilos con nombre, no formato manual: así funcionan el índice, la navegación y el PDF accesible, y la conversión a Google Docs los conserva.
- En documentos editables Newsreader va en su peso regular: es el que existe con el mismo nombre en Word, Google Docs y cualquier máquina con la fuente instalada. El peso 500 queda para web y slides.
- Titular póster y cintas solo en la portada, si la pieza las necesita. Dentro del documento, títulos normales.
- Fallback si quien recibe un .docx no tiene las fuentes: Georgia para títulos y Arial para cuerpo. Por eso a terceros se manda también el PDF.

## 5. Color

- Texto y estructura en `#15191A`. Filetes y bordes de tabla en `#15191A` o `#A3A69F` (taupe solo como filete, nunca como texto).
- Acento `#0F6B60` para la palabra destacada del título, etiquetas, filetes y encabezados de tabla (6.38:1 sobre blanco). Oliva `#4F6B00` solo como detalle puntual (6.11:1).
- Bloques secundarios (cuadro destacado, contadores): `#ECEAE3`.
- **El lima no va en documentos editables**: sobre blanco no se lee.
- Rojo funcional `#B23A48` solo para riesgos o errores en tablas, con etiqueta de texto.

## 6. Logo

**Ningún documento se entrega sin el logo.** Sale siempre del archivo, nunca tipeado.

- **Portada:** `assets/logo/png/innovas-horizontal-ink.png`, 48mm de ancho (≥32mm), arriba a la izquierda, con su resguardo (viene en el archivo).
- **Sin portada** (one-pager, contrato, anexo): el mismo logo a 36mm arriba del título.
- **Páginas interiores:** `innovas-isotipo-teal.png` de 9mm de alto en el encabezado.
- **A una tinta:** `innovas-horizontal-mono-ink.png`.
- Los PNG están a 2x del SVG, con fondo transparente. Usar estos, no convertir el SVG por cuenta propia.

## 7. Recursos de marca

`build_docx.py` resuelve cada recurso como un tipo de bloque del JSON:

| Recurso | Bloque | Cómo sale |
|---|---|---|
| Etiqueta de sección `01 · RESUMEN` | `etiqueta` | Mono caja alta teal, arriba del título |
| Par A y B | `ab` | Tabla de tres columnas: hoy, `──→` en teal, con INNOV.AS. Va en el resumen ejecutivo |
| Contadores | `contadores` | Cifra en Newsreader con unidad en negrita y contexto debajo, en recuadros `#ECEAE3` |
| Camino del cliente | `lista` numerada | Los cinco estados con su explicación |
| Tabla | `tabla` | Encabezado teal con filete teal, filas con filete taupe, fila de encabezado marcada |
| Cuadro destacado | `destacado` | Recuadro `#ECEAE3` con padding, no se corta entre páginas |
| Nota o fuente | `nota` | 8pt |

- **Ilustraciones:** captura a 2x de la serie del cerebro sobre el fondo de la página.
- **Sin fotos** en documentos editables; en un one-pager de PDF, a lo sumo una foto del registro del sitio, tratada.

### Tipos de documento

| Tipo | `portada` | Particularidad |
|---|---|---|
| Propuesta comercial | `true` | Resumen ejecutivo de 1 página con A y B, alcance por olas, precio solo si es para ese cliente, cierre con el siguiente paso |
| Informe del Radar | `true` | Hallazgos, Mapa del Método, recomendación de ola cero |
| One-pager | `false` | Dos columnas, contadores, una ilustración o foto (como PDF de diseño) |
| Contrato o anexo | `false` | Estilos limpios, sin capa editorial |

## 8. Accesibilidad y legibilidad

- Estilos de título reales (no negrita agrandada) para que el PDF tenga estructura navegable.
- Texto alternativo en imágenes y diagramas.
- Tablas con fila de encabezado marcada como tal (el script la marca).
- PDF exportado con etiquetas de accesibilidad.

## 9. Qué evitar

Color de página o sombreado de fondo, franjas a sangre, lima en cualquier parte, taupe como texto, marcas de agua con el logo agrandado, el nombre INNOV.AS tipeado en lugar del logo, formato manual en vez de estilos, más de dos niveles de viñetas, capturas de pantalla borrosas, nombres de personas del equipo.

## 10. Checklist

- [ ] Salida correcta: Google Doc por defecto, .docx si no hay `gws-innov` o si se pidió Word.
- [ ] Logo en portada (o arriba del título) e isotipo en el encabezado interior, desde `assets/logo/png/`.
- [ ] Fondo blanco; PDF de diseño sobre papel.
- [ ] Estilos con nombre aplicados.
- [ ] Teal como acento; oliva puntual; sin lima.
- [ ] Pie con nombre del documento, fecha y página.
- [ ] PDF adjunto si sale de la empresa.

## 11. Notas por herramienta

- **Generación por código (recomendada para agentes):** escribir el contenido como JSON con el esquema de la cabecera de `scripts/build_docx.py` y correr `python3 scripts/build_docx.py contenido.json salida.docx` (requiere `python-docx`). El script corta si no encuentra el logo. Referencia de cómo queda aplicado: `assets/ejemplos/innovas-propuesta-ejemplo.json` y su `.docx`.
- **Google Docs con `gws-innov`:** con el .docx armado, subirlo convertido. La ruta de `--upload` es la de la máquina donde corre `gws-innov`; si el .docx se armó en otro lado, primero se copia ahí.

  ```
  drive files create --json '{"name":"<título>","mimeType":"application/vnd.google-apps.document","parents":["<carpeta, si la persona la indicó>"]}' --upload "<ruta>.docx" --upload-content-type application/vnd.openxmlformats-officedocument.wordprocessingml.document --params '{"fields":"id,webViewLink","supportsAllDrives":true}'
  ```

  Devolver el `webViewLink`. Sin carpeta indicada, queda en la raíz del Drive de quien opera. Los conectores nativos de Google no se usan para esto.
- **Procesadores de texto de escritorio:** partir de `assets/plantillas/innovas-documento.docx`, que trae estilos, portada, encabezado y pie; incrustar las fuentes si el archivo se comparte editable.
- **Procesadores de texto en la nube a mano:** partir de la plantilla subida con conversión, igual que arriba, en vez de configurar estilos desde cero.
