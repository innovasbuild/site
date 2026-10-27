# Redes sociales

> ⚠️ **Propuesta v1.7** (2026-10-27): armada desde la base del sistema, sin piezas reales de prueba todavía. Validar con la primera tanda de posteos y registrar la decisión en `../decisiones.md`.

## 1. Alcance

Posteos de imagen fija y carruseles en LinkedIn (el canal principal de INNOV.AS), avatares y portadas de perfil de la empresa. Los mensajes de prospección uno a uno no llevan piezas gráficas.

## 2. Formatos y medidas

| Formato | Medida (px) | Uso |
|---|---|---|
| Vertical 4:5 | 1080×1350 | Posteo con más presencia en el feed; formato preferido |
| Cuadrado 1:1 | 1080×1080 | Posteo general |
| Horizontal 1.91:1 | 1200×627 | Posteo con link |
| Carrusel (documento) | 1080×1350 por lámina, 4–10 láminas | Explicar un proceso, una lista, el camino del cliente |
| Avatar | 400×400 (recorte circular) | Perfil de la empresa |
| Portada de página | 1128×191 | Encabezado de la página de empresa |

## 3. Grilla y márgenes

- Margen de seguridad de 80px a los cuatro lados.
- En carruseles, margen, etiqueta y posición del título idénticos en todas las láminas.
- Logo siempre en la misma esquina inferior.

## 4. Tipografía (sobre 1080px de ancho)

| Elemento | Tamaño | Fuente |
|---|---|---|
| Titular póster | 96–120px | Newsreader 700, minúscula, palabra en itálica |
| Título | 64–80px | Newsreader 500 |
| Cifra | 160–200px | Newsreader |
| Texto | 36–44px | Schibsted Grotesk |
| Etiqueta de sección / cinta | 26–30px | IBM Plex Mono caja alta |

Máximo **20 palabras** en la imagen; el resto va en el copy. Nada por debajo de 26px.

## 5. Color

Papel dominante, teal como marca, tinta para texto. Fondo `ink` para piezas de énfasis (cifra, cita, anuncio), con `#5CC4B0` y lima `#D4F36B` como acentos. En un carrusel, máximo 2 láminas oscuras.

## 6. Logo

- **Avatar:** `innovas-badge-iso-teal.svg` exportado a 400×400 (el isotipo queda centrado en el recorte circular).
- **En posteos:** isotipo de 56–72px en la esquina inferior, siempre la misma. Logo horizontal solo en piezas institucionales, ≥240px de ancho.
- Sobre `ink`: variantes `-dark`/`-paper`; sobre papel: `-ink`/`-teal`.

## 7. Recursos de marca — plantillas tipo

| Plantilla | Composición |
|---|---|
| **A ──→ B** | Etiqueta mono, "hoy" arriba y "con INNOV.AS" abajo, unidos por la flecha |
| **Cifra** | Fondo papel o tinta, cifra gigante en Newsreader, unidad y contexto debajo |
| **Titular** | Titular póster de 1–4 palabras con la palabra destacada en teal (lima sobre tinta) y una cinta |
| **Ilustración** | Captura a 2x de la serie del cerebro sobre papel, titular corto |
| **Carrusel** | Lámina 1: titular y etiqueta con el tema; centrales: un punto por lámina con número en mono; última: cierre con logo y siguiente paso |

El copy sigue la voz del `SKILL.md`: afirmativo, sin guion largo ni ¿ ¡, sin nombres de clientes ni casos atribuidos a Central IA.

## 8. Accesibilidad y legibilidad

- Texto alternativo en cada imagen publicada.
- Mirar la pieza al tamaño de una pantalla de teléfono antes de publicar.
- Hashtags en CamelCase.

## 9. Qué evitar

Plantillas genéricas de las herramientas, imágenes generadas con IA, íconos de cerebro o robot genéricos (va la serie del cerebro), textos largos dentro de la imagen, lima como texto sobre papel, más de una foto por pieza.

## 10. Checklist

- [ ] Formato correcto y margen de seguridad respetado.
- [ ] ≤ 20 palabras en la imagen, nada debajo de 26px.
- [ ] Isotipo en la esquina estándar.
- [ ] Texto alternativo cargado.
- [ ] Copy según la voz.

## 11. Notas por herramienta

- **Herramientas de diseño gráfico online:** crear el kit de marca con paleta, las tres fuentes y los SVG; guardar las plantillas tipo con estos nombres.
- **LinkedIn:** los carruseles se suben como documento PDF; las medidas de portada cambian seguido, verificar la vigente y dejar lo importante al centro.
- **Generación por código o por IA:** usar la escala de lienzo fijo, nunca la escala `clamp` de web.
