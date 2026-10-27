# Ilustración

Tres lenguajes, con estado distinto:

| Lenguaje | Estado | Dónde |
|---|---|---|
| **Serie del cerebro** (v1.5) | **Vigente.** Toda ilustración nueva sigue este lenguaje | Sitio; capturas a 2x en decks, documentos y redes |
| **Ilustración a mano** (v1.2) | ⚠️ Sin definir si sigue fuera del sitio (ver `decisiones.md`) | Referencia; piezas fijas mientras no se decida |
| **Escenas en volumen** (v1.4) | Archivada desde la v1.5. No se usa en piezas nuevas | — |

En cualquier soporte fijo (slide, documento, posteo) va una **captura a 2x del dibujo ya armado**, sobre el mismo fondo de la pieza, sin recorte ni sombra agregada.

**Descartado en el camino (no volver):** 3D de juguete, figuras de puntos granulados, íconos de línea genéricos tipo Lucide como ilustración, imágenes generadas con IA (gouache, collage, grabado, línea continua) y repetir el efecto de nodos dentro del robot.

## Serie del cerebro (v1.5)

Definida por Luli el 2026-10-26 a partir de sus propios bocetos. Es un **storytime**: el mismo cerebro aparece en todas las piezas y cuenta la historia del producto.

- **El cerebro:** silueta anatómica de perfil (frontal a la izquierda, temporal abajo, cerebelo y tronco abajo a la derecha) con los surcos principales. Es una sola, compartida: `CONTORNO`, `SILUETA` y `SURCOS` en `red-cerebro.ts`. No se redibuja por pieza.
- **Brain (`CerebroRed`):** el cerebro como red de nodos que se arma **nodo por nodo**: de los nodos que ya están crecen ramas curvas, en la punta nace un nodo nuevo con un destello lima ("una idea que se prende") y después se conecta con sus vecinos. Se desarma suave y vuelve a empezar desde otro punto. El cursor ilumina los nodos cercanos.
- **Agentes (`AgenteRobot`):** robotito minimalista de línea, con mancha lima corrida en el cuerpo, cabeza-pantalla `teal` y adentro un **cerebrito de neón lima ya armado** (sin nodos) que se enciende de a ratos junto con la antena. Saluda, parpadea y flota apenas.
- **Herramientas (`HerramientasEnchufe`):** un cerebro que **recibe herramientas**: cuatro fichas de línea (correo, datos, agenda, reportes) que se enchufan de a una con un cable; al conectarse, la ficha se enciende en lima, el cerebro destella y viajan datos por el cable.

**Lenguaje común (obligatorio en toda pieza nueva):**

- Fondo de la superficie (blanco o papel), nunca un panel de color detrás.
- Línea de tinta de **1.6** en el lienzo de 200×150.
- Nodos y cabeza en `teal`; **encendido siempre en neón lima** (trazo lima con resplandor); mancha lima corrida como único relleno de color.
- Encuadre parejo entre piezas: la figura ocupa el alto de la tarjeta.

**Técnica:** canvas 2D en un componente cliente, lienzo de 200×150 escalado a la tarjeta (4:3), solo anima en pantalla; con `prefers-reduced-motion` queda quieto y armado. Colores leídos de los tokens con `leerToken` (sin respaldo en hex).

**Componentes:** `components/red-cerebro.ts` (silueta, red y pintura compartidas), `cerebro-red.tsx`, `agente-robot.tsx`, `herramientas-enchufe.tsx`; copias en `assets/components/serie-cerebro/`.

### Procedimiento para una pieza nueva de la serie

1. **Concepto antes de dibujar:** una línea con qué le pasa al cerebro (o al robot) y qué se enciende. Visto bueno de quien la pidió.
2. **Partir de lo compartido:** silueta, red y pintura de `red-cerebro.ts`; no se redibuja el cerebro.
3. **Respetar el lenguaje común** de arriba: línea 1.6, teal en nodos y cabeza, lima solo como encendido.
4. **Verla en contexto** en la tarjeta real, en escritorio y celular, con y sin `prefers-reduced-motion`.
5. **Revisar:** se entiende sin leer el texto, parece de la misma familia, el encendido se ve al tamaño de uso. Mostrar captura y ajustar.

## Ilustración a mano (v1.2)

Objetos y diagramas con trazo de marcador. Reemplazó la spec de trazo fino de la v1.0.

- **Registro:** objetos reconocibles de trabajo (ventana de asistente, nota, carpeta, fichero, cuaderno, lápiz, llave, candado, enchufe, burbuja de chat, planilla) combinados con flechas y nodos. **Sin personas**, caras ni manos. Sin isométrico, 3D, degradé ni sombra difusa.
- **Trazo:** marcador de **3.2px** en `ink` (`--illus-stroke`), extremos y uniones redondeados, sin relleno, irregularidad de mano pareja.
- **Color:** dos acentos planos con pesos distintos. **Teal** principal: bloque de **38 a 54px** (`--illus-accent-size`) rotado unos **7°** (`--illus-accent-rot`) sobre lo que importa. **Oliva** como detalle: bloque de hasta **30px** (`--illus-detail-size`) rotado al revés, con el guiño. Encima de un acento puede ir una marca corta en `paper`. Es la única excepción a no juntar teal y el segundo color en un componente, porque el detalle siempre pesa menos.
- **Sin hachurado.** Superficies de color planas.
- **Tono:** se entiende a primera vista y tiene un solo guiño (un candado abierto, un renglón tachado).
- **Complejidad:** una idea por pieza, hasta unos 45 trazos, lienzo `viewBox 0 0 400 300`, fondo transparente.
- **Texto:** ninguno dentro del dibujo; `aria-label` con la descripción.
- **Movimiento:** cada trazo se dibuja una vez al entrar (620ms, `--ease-out-quint`, 40ms entre trazos); los acentos entran con escala 0.86 → 1 (420ms, `--ease-tape`).

### Procedimiento (obligatorio si se usa)

Decisión de Mati del 2026-10-10: son los pasos que produjeron las seis del home, para que piezas hechas en sesiones distintas sean consistentes.

1. **Concepto antes de dibujar.** Una línea con la situación, los objetos y el guiño. Visto bueno de quien la pidió.
2. **Mirar las existentes.** `assets/illustrations/home.ts` y los SVG de `assets/illustrations/svg/`, como referencia de vocabulario, densidad y proporciones. Reutilizar los objetos que ya existen con la misma construcción.
3. **Dibujar como lista de trazos.** Lienzo 400×300, un `path` por trazo escrito a mano, coordenadas apenas desparejas, hasta unos 45 trazos, sin texto.
4. **Poner los acentos.** Bloque teal de 38–54px rotado ~7° y detalle oliva de hasta 30px rotado al revés.
5. **Renderizar con `HandDrawn`** (`assets/illustrations/hand-drawn.tsx`), nunca un SVG suelto con otros valores: fija el grosor, los extremos, el filtro de temblor (`feTurbulence` 0.035, dos octavas, semilla 7, desplazamiento 3.4), los colores por token y el dibujo al entrar. Fuera de código, armar el SVG estático con la misma estructura que los de `assets/illustrations/svg/`.
6. **Verla en contexto** en una tarjeta real con su título y texto, al tamaño de uso.
7. **Revisarla con honestidad:** se entiende sin leer, el guiño se ve, parece de la familia, ningún objeto se confunde. Lo que no pase se redibuja.
8. **Mostrar y ajustar.**

Valores literales para piezas fijas: trazo `#15191A`, teal `#0F6B60`, oliva `#4F6B00`. Los SVG de `assets/illustrations/svg/` ya están en la paleta v1.5. Brief para encargar afuera: `prompt-gema-ilustraciones.md`.

## Escenas en volumen (v1.4, archivada)

Escenas 3D chicas y mate en WebGPU (`AgentScene`, `assets/components/agent-scene.tsx` + `scene-shader.ts`, con `vgpu`), con agentes como bots con visor y ojos que miran al cursor. Ganaron un laboratorio el 2026-10-22 y la serie del cerebro las reemplazó en el sitio el 2026-10-26. Los componentes quedan en el skill como referencia técnica; no se usan en piezas nuevas sin una decisión registrada en `decisiones.md`. Su vocabulario (agente, persona, herramienta, Brain, hub, conexión, permiso, dato) y su procedimiento de ocho pasos están en el `SKILL.md` de la v1.6.1 (commit `be2a53a` del repo del sitio).
