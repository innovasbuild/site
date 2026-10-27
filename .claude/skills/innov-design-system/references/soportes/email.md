# Email

> ⚠️ **Propuesta v1.7** (2026-10-27): armada desde la base del sistema. Validar con la firma y la primera newsletter reales y registrar la decisión en `../decisiones.md`.

## 1. Alcance

Firma de correo, mails comerciales maquetados, newsletters y avisos de Central IA. Los mails de prospección uno a uno van en texto plano y solo llevan la firma.

## 2. Formatos y medidas

- Ancho de contenido: **600px**, centrado.
- Imágenes exportadas a 1200px y mostradas a 600px.
- HTML de menos de 100KB; imágenes livianas.

## 3. Grilla y márgenes

- Una columna. Padding lateral de 32px (24px en móvil).
- Bloques separados por 32px de aire o por un filete de tinta.
- Estructura tipo: logo → etiqueta mono → título → cuerpo → botón → pie.

## 4. Tipografía

| Elemento | Tamaño | Fuente (con fallback) |
|---|---|---|
| Título | 28–32px | Newsreader → Georgia, serif |
| Cuerpo | 16px / 1.5 | Schibsted Grotesk → Arial, sans-serif |
| Etiqueta | 12px caja alta | IBM Plex Mono → Courier New, monospace |
| Botón | 15px bold | Schibsted Grotesk → Arial |
| Pie | 12px | Schibsted Grotesk → Arial |

Muchos clientes de correo ignoran las fuentes web: el diseño tiene que verse bien con Georgia y Arial.

## 5. Color

Fondo exterior `#ECEAE3`, contenido sobre `#FFFFFF` o `#F6F4EF`. Texto `#15191A`, links y botón `#0F6B60` con texto blanco. Sin fondos oscuros completos ni lima.

## 6. Logo

- **Encabezado:** `innovas-horizontal-ink` en PNG a 2x, mostrado a 160–200px de ancho.
- **Firma:** isotipo teal en PNG a 2x, mostrado a 28–32px.
- Siempre con `alt="INNOV.AS"`.

## 7. Recursos de marca

### Firma de correo

```
Nombre Apellido                       Schibsted Grotesk bold 14px  #15191A
Puesto                                Schibsted Grotesk 13px       #15191A
INNOV.AS · Central IA                 IBM Plex Mono 12px           #0F6B60
innov.as                              Schibsted Grotesk 12px       #0F6B60
[isotipo 28px]
```

Sin banners, frases ni avisos legales en imagen.

### Mail comercial o newsletter

- Etiqueta mono con el tema (`RADAR`, `OLA CERO`).
- Título en minúscula con la palabra destacada en itálica teal.
- Par A ──→ B en una línea cuando el mail presenta una propuesta.
- Una sola llamada a la acción como botón (la primera conversación o el Radar).

## 8. Accesibilidad y legibilidad

- El mensaje se entiende con las imágenes bloqueadas: nada importante dentro de imágenes.
- Botones de 44px de alto mínimo, en HTML, no imagen.
- Probar en modo oscuro: el logo `-ink` pierde el wordmark sobre fondo oscuro; si el cliente invierte colores, usar el isotipo teal solo.
- Versión de texto plano para newsletters.

## 9. Qué evitar

Mails que son una sola imagen, fondos oscuros completos, lima, GIFs pesados, varios botones compitiendo, firmas con más de cinco líneas.

## 10. Checklist

- [ ] 600px, una columna.
- [ ] Se lee bien con fuentes de fallback y con imágenes bloqueadas.
- [ ] Un botón principal.
- [ ] Logo PNG 2x con `alt`.
- [ ] Probado en móvil y modo oscuro.

## 11. Notas por herramienta

- **Clientes de correo:** cargar la firma como HTML desde la plantilla oficial, no copiarla de un documento.
- **Plataformas de envío masivo y CRM:** crear una plantilla base con encabezado, pie y estilos, y bloquear los bloques fijos.
