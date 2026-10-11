# T5: Propuesta de sitio con Central IA adelante

> Fecha: 2026-10-10 · Estado: propuesta con decisiones cerradas por Mati el 2026-10-10 (sección 6), nada implementado
> Fuentes: el repo del sitio, siete páginas del brain (revisiones del 2026-10-03 y 2026-10-10) y la home de wonderful.ai leída el 2026-10-10.
> Reglas de copy aplicadas a todos los textos propuestos: rioplatense, sin raya larga, sin signos de apertura, en afirmativo, sin nombres de founders, sin nombrar a Wonderful.

Los textos entre corchetes son notas para vos y quedan fuera del sitio.

---

## 1. Diagnóstico del sitio actual

### 1.1 Mapa

| Ruta | Estado | Secciones | Mensaje que transmite hoy |
|---|---|---|---|
| `/` | En nav | Hero, Qué construimos, Sin capas, De A a B, Credenciales, En Paralelo, CTA doble | Firma de ingeniería que ejecuta proyectos de plataformas, datos e IA para organismos y empresas |
| `/soluciones` | En nav | Hero, Qué construimos, Cómo trabajamos, Operar en B, Trabajamos con, CTA | Proyectos a medida por fases, de arquitectura a operación |
| `/en-paralelo` | En nav | Hero, tesis A a B, Asistentes y brains, Cómo funciona, Para quién, CTA | Línea para pymes: cerebro digital y agentes por olas a precio cerrado |
| `/nosotros` | En nav | Hero, Lo que hicimos, Por qué existimos, Principios, CTA | Trayectoria de proyectos, misión, sin bios |
| `/contacto` | En nav | Hero, formulario | "Contanos en qué estás", respuesta en 48 horas hábiles |
| `/recursos` | Sin links, noindex | Hero, lista vacía | "Estamos preparando el material" |
| `/desde-adentro` y `/desde-adentro/se-trainer` | Sin links, noindex | Programa de formación y certificación | Línea de educación, despublicada en julio |
| `/privacidad`, `/terminos` | Footer | Legales | Sin cambios |
| `/empresa` | Redirect en `next.config.mjs` | Lleva a un deck en Google Slides | El deck institucional, que es del posicionamiento anterior |
| `/cuentas/demo`, `/cuentas/lagomarsino`, `/cuentas/supply-chain` | HTML estático en `public/` | Presentaciones por cuenta | Públicas, sin noindex, una con el nombre de un prospecto en la URL |

Navegación (`content/global.ts`): Soluciones, En Paralelo, Nosotros, Contacto, y el botón "Hablemos". El footer repite el mismo mapa.

### 1.2 A dónde llevan los CTA

Todos los botones del sitio terminan en `/contacto`. Los únicos links que van a otro lado son cruces internos ("Cómo trabajamos" a `/soluciones`, "Conocé En Paralelo" a `/en-paralelo`).

En `/contacto` hay un solo formulario (`components/contact-form.tsx`): nombre, email laboral, teléfono, empresa, país y un campo libre. Hace POST a una función de Supabase (`/functions/v1/contact_form`) que vive fuera de este repo, así que desde acá no pude ver qué pasa con el dato después. El visitante ve un mensaje en la misma página: "Te respondemos dentro de las próximas 48 horas hábiles". Alternativa: el mail `hola@innov.as`.

Lo que falta en ese camino:

- Agenda. El visitante espera hasta dos días hábiles para que alguien le proponga un horario.
- Preguntas que califiquen. El formulario omite tamaño de la empresa y qué IA usan hoy, que son los dos datos que definen la primera conversación.
- Página de confirmación con el paso siguiente.
- Medición. `app/layout.tsx` carga Google Analytics, HubSpot y el tracker de Apollo, y el envío del formulario pasa sin registrar un evento de conversión.

### 1.3 Qué contradice el posicionamiento nuevo

**Identidad**

- `content/home.ts`, hero: "Ingeniería de transformación", "Diseñamos, construimos y operamos la solución completa", público "organismos internacionales y empresas". Es la identidad de firma ejecutora que quedó atrás.
- `content/global.ts`, footer: "Ingeniería de transformación digital. Diseñamos, construimos y operamos plataformas de datos e IA".
- `public/llms.txt`: "INNOV.AS es una consultora de ingeniería". Es la contradicción más directa, y es el archivo que leen los asistentes de IA cuando alguien pregunta por la empresa.
- `content/seo.ts` y `lib/schema.ts`: títulos, descripciones y JSON-LD con el mismo relato. El catálogo de servicios del schema sale de `content/soluciones.ts`.
- La plataforma está ausente de todo el sitio. "Brain" aparece como un entregable más ("el brain que les da contexto", "Company Brain"), sin producto que lo contenga.

**Jerarquía**

- El home dedica cuatro de siete bloques a proyectos a medida. En Paralelo es el bloque seis, rotulado "para pymes".
- El CTA final (`DualCta`) le pide al visitante que elija entre "Proyectos" y "Pymes: En Paralelo". Con el posicionamiento nuevo hay una sola puerta.
- En Paralelo tiene lugar propio en la navegación y página propia con su marca.

**Segmento**

- `/soluciones`: "empresas medianas y grandes". `/en-paralelo`: "pymes y empresas de alto valor por persona: corredores, distribuidores, estudios". El canon nuevo es "empresas pequeñas, medianas y grandes".

**Reglas de afirmación**

- `content/home.ts`, credenciales: "Trabajamos para organismos internacionales", en presente. La regla habilita "ofertas en curso".
- La cinta de logos incluye BID y FAO bajo "Organizaciones con las que hemos colaborado". Junto a la frase anterior se lee como clientes de INNOV.AS.
- `content/nosotros.ts`: "Ejecutamos proyectos end-to-end para bancos, gobierno, ONGs" y "Hoy ejecutamos esa experiencia como firma". Las cifras de 150 proyectos, 25 años y 10 países están tipadas como `Dato`, que en `content/types.ts` significa "pendiente de confirmar antes de publicar". Están publicadas.
- `/en-paralelo`, "Asistentes y brains": presenta asistentes digitales, bots de proceso, company brain e "IA con gobernanza, con evaluación, guardrails y métricas de adopción" como un catálogo disponible. Hoy existe un agente.
- `/en-paralelo`, "Cómo funciona": "Precio fijo contra entrega, sin anticipos" y la escalera Radar, Mapa del Método, Olas, Operar en B, con los nombres de la marca que pasa a un costado.

**Dolor**

- El sitio le habla a quien todavía tiene que decidir si usa IA ("escalás sin multiplicar estructura", "la tecnología sola no transforma nada"). Los tres dolores que hoy abren reuniones están ausentes: adopción parada en personas, quién le enseña a la IA, IA sin gobierno.

**Lo que se sostiene**

- La regla stealth se cumple: busqué nombres propios en `app`, `components`, `content`, `lib` y `llms.txt` y el resultado fue vacío.
- El sistema de diseño y casi todos los componentes sirven tal cual.
- "Tu gente decide y los agentes ejecutan" ya está en `content/en-paralelo.ts`.
- La estructura de pasos de "Cómo funciona" es la base del "cómo implementamos".

### 1.4 Contradicciones entre el pedido y el brain, y cómo quedaron

1. **Claude y ChatGPT por MCP.** El brain decía "probado solo con Claude Code". Mati confirmó el 2026-10-10 que el conector funciona bien con ChatGPT y que el acceso por MCP se comunica como disponible. Los textos nombran a los dos asistentes sin reservas. El brain quedó actualizado.
2. **El nombre.** Resuelto. La advertencia sobre marca y dominio se sacó del brain el 2026-10-10.
3. **Qué se afirma como disponible.** El brain separa lo que existe de lo que está en el plan (permisos por persona sobre agentes y herramientas, configuración desde el panel, ingreso con Microsoft). Mati decidió el 2026-10-10 que el sitio da todo por completo. Los textos lo afirman sin etiquetas de estado. Las reglas de afirmación del brain todavía dicen lo contrario.
4. **El proceso de implementación** (`producto/proceso-de-implementacion`, borrador del 2026-10-03) promete elegir la nube con sistemas, autenticar contra el directorio de la empresa y WhatsApp para operativos. Quedó fuera de los textos.
5. **Duración de la ola.** El canon de mensajes dice tres meses; el proceso y el pricing dicen tres o cuatro. Usé tres.
6. **Los diagnósticos.** Resuelto con la definición de Mati del 2026-10-10: son dos productos con alcance distinto, Radar y Mapa del Método (sección 4.2). Cambia la regla de bonificación respecto de `comercial/pricing-en-paralelo`, que acreditaba el Radar al Mapa y el Mapa a la ola uno; esa página quedó actualizada.
7. **Dato desactualizado en el brain.** La home de Wonderful anuncia hoy una Serie C de USD 550M. El benchmark del brain quedó corregido.

### 1.5 Qué tomo de la referencia

De la home de Wonderful, como estructura:

- El titular dice para quién es y qué logra en una línea, y el botón principal es una conversación con una persona.
- La oferta se nombra en tres partes que el visitante puede repetir: plataforma, equipo que despliega, estrategia.
- La prueba va inmediatamente después del hero, con resultados en números.
- Los botones secundarios llevan a entender el producto, nunca a una prueba gratis.

Nuestra versión: el botón principal también es una conversación; la oferta se nombra en dos partes, plataforma e implementación; y la prueba, mientras falten casos, es la plataforma funcionando en nuestra propia operación y una demo verificable.

---

## 2. Arquitectura propuesta

### 2.1 Páginas

| Ruta | Qué pasa | Rol |
|---|---|---|
| `/` | Se reescribe | Dolor, producto, gobierno, método, primer paso |
| `/central-ia` | Nueva | El producto en detalle: tres piezas, permisos, dos puertas y reglas de control. Es la página para la persona de sistemas |
| `/como-implementamos` | Nueva, hereda el método de En Paralelo | Primera conversación, Radar, ola cero, olas y operación. Incluye el bloque para el directorio y las preguntas frecuentes |
| `/en-paralelo` | Se va, con redirect 301 a `/como-implementamos` | La marca sale de la navegación y de los textos |
| `/soluciones` | Se renombra a `/proyectos`, con redirect 301 | Proyectos a medida, fuera del menú principal |
| `/nosotros` | Se reescribe | Quiénes somos por proyectos y dominios, y por qué construimos Central IA |
| `/contacto` | Se reescribe | Primera conversación: agenda y formulario corto |
| `/recursos` | Se va | Está vacía |
| `/desde-adentro` y `/se-trainer` | Se van | Línea despublicada, sin links entrantes |
| `/privacidad`, `/terminos` | Quedan | Revisar que mencionen la plataforma cuando haya clientes adentro |
| `/empresa` | Se pausa el redirect hasta tener el deck nuevo | Hoy lleva al deck anterior |
| `/cuentas/*` | Se les agrega noindex | Material comercial por cuenta |

### 2.2 Navegación

Menú: **Central IA · Cómo implementamos · Nosotros** y el botón **Agendá una conversación**.

Footer: las tres del menú, más Proyectos a medida, Contacto, Privacidad y Términos. Descripción institucional nueva:

> INNOV.AS ofrece Central IA, la plataforma que ordena la adopción de IA en la empresa, y el equipo que la implementa. Buenos Aires, Argentina.

### 2.3 Dónde va cada cosa

- **El producto** se comunica en dos niveles. En el home, las tres piezas en un bloque. En `/central-ia`, el detalle: permisos, reglas de control, las dos puertas, las herramientas y el panel de la empresa.
- **El "cómo implementamos"** tiene un bloque de cuatro pasos en el home y página propia. Es donde vive lo que se conserva de En Paralelo, con la voz de INNOV.AS y sin la marca. Radar y Mapa del Método se conservan como nombres de los dos diagnósticos. "Operar en B" pasa a ser "operación continua".
- **"Tu gente decide, los agentes ejecutan"** va en el bloque de gobierno del home y abre la sección de aprobaciones en `/central-ia`.
- **La notación A a B** queda como recurso gráfico (kickers, rieles del hero). La tesis "De A a B" como bloque del home sale.

---

## 3. El home, sección por sección

### 3.1 Hero

**Responde:** qué es esto, y es para mi empresa.

- Eyebrow: `// IA suelta → IA ordenada`
- Póster: **Central IA** (acento en "IA")
- Línea de apoyo: La plataforma que ordena la adopción de IA en tu empresa.
- Bajada: El conocimiento de tu empresa, sus agentes y sus herramientas en un solo lugar, con permisos sobre quién accede a qué. Tu gente trabaja desde la plataforma o desde el asistente que ya usa, y nuestro equipo la implementa con vos.
- CTA principal: **Agendá una primera conversación** → `/contacto`
- CTA secundario: **Conocé Central IA →** → `/central-ia`
- Nota bajo los botones: 30 minutos con quien conduce la empresa, sin costo.
- Rieles: `licencias sueltas ──→ IA de toda la empresa` · `cada uno por su cuenta ──→ permisos por persona`

**Componentes:** `Hero` con `variant="dark"` y `backdrop="network"`, y `VerticalRail`, como hoy. Falta: una prop para la nota bajo los botones.

### 3.2 Los tres dolores

**Responde:** entienden lo que me pasa.

- Kicker: `01 · dónde estás hoy`
- Póster: **IA por todos lados**
- Bajada: Tu empresa ya usa IA. Hay licencias repartidas, asistentes personales y alguna automatización por área. El paso que sigue es ordenarla.

Tres tarjetas:

1. **La IA quedó en una o dos personas.** Alguien del equipo avanzó mucho con su asistente: tableros, rutinas, criterios. Todo eso vive en su cuenta, y el resto del equipo sigue arrancando de cero.
2. **Cualquiera le enseña a la IA de la empresa.** Cuando todos pueden cargarle criterios, el conocimiento se degrada. Hace falta definir quién escribe en cada tema, quién lee y quién aprueba.
3. **Información confidencial en cuentas personales.** Hay gente procesando datos de clientes y números de la empresa con su cuenta personal de IA, y aplicaciones hechas adentro, cada una con su base y su ingreso.

- Cierre: Central IA está hecha para ordenar las tres.

**Componentes:** `SectionKicker`, `PosterHeading`, tres `LevelCard` con la prop `kicker` en "01", "02", "03" (hoy muestra "A→B" por defecto).

### 3.3 Qué es Central IA

**Responde:** qué es exactamente lo que ofrecen.

- Kicker: `02 · la plataforma`
- Póster: **Tres piezas, un lugar**
- Bajada: Central IA es la plataforma donde tu empresa entra con sus usuarios y encuentra su conocimiento, sus agentes y sus herramientas. Funciona como el sistema operativo de IA de la empresa.

Tres tarjetas:

1. **Brain**
   El conocimiento colectivo de tu empresa: criterios, procesos, mensajes, cuentas, decisiones. Tu gente lo consulta para trabajar y lo alimenta donde le toca aportar. Los agentes trabajan con ese mismo conocimiento.
2. **Agentes**
   Trabajadores de IA para tareas concretas, preparados en acuerdo con tu empresa. Al definir cada uno se fija qué datos puede usar y qué personas pueden usarlo.
3. **Herramientas**
   Tu CRM, tu correo y tus fuentes de datos conectados a la plataforma, con permisos por persona. Cada uno ve y usa las herramientas que le habilitaron, desde la plataforma o desde su asistente.

- Link: **Ver la plataforma en detalle →** → `/central-ia`

**Componentes:** `LevelCard` con "01", "02", "03" en `kicker`. Falta construir: un diagrama propio de Central IA (tres piezas en el centro, permisos alrededor, dos puertas de entrada) que reemplace a `TransitionDiagram` en el home. Es la pieza gráfica que más ayuda a que el producto se entienda de un vistazo.

### 3.4 Gobierno en el producto

**Responde:** cómo sé que esto queda bajo control.

- Kicker: `03 · gobernanza`
- Póster: **Tu gente decide** (acento en "decide")
- Línea de apoyo: Tu gente decide, los agentes ejecutan.
- Bajada: Los permisos, las aprobaciones y el registro los hace cumplir la plataforma. Valen igual para todas las personas y todos los agentes, todos los días.

Cuatro ítems:

1. **Permisos por carpeta y por página.** Cada persona lee lo que le corresponde y escribe donde le toca aportar. Cuatro niveles: lector, editor, administrador y sin acceso.
2. **El agente ve lo mismo que vos.** En el chat, cada agente actúa con los permisos de la persona que le habla.
3. **Lo que sale hacia afuera lo aprueba una persona.** Un mail a un cliente pasa siempre por aprobación humana antes de enviarse. Cuando un agente propone un cambio al Brain, lo aprueba un administrador.
4. **Todo queda registrado.** Cada acción y cada llamada a un modelo quedan asentadas, con su costo, en un registro inalterable.

**Componentes:** el patrón de tarjetas con flecha del bloque "Sin capas" de `app/page.tsx`, en grilla de dos por dos.

### 3.5 Dos puertas

**Responde:** tengo que cambiar las herramientas que ya pago.

- Kicker: `04 · cómo se usa`
- Póster: **Dos puertas**
- Línea de apoyo: Partimos de las licencias que tu empresa ya paga.
- Cuerpo: Quien ya trabaja con Claude o ChatGPT conecta Central IA a su asistente por MCP y usa desde ahí lo que la empresa le habilitó. Quien trabaja sin asistente propio entra directo a la plataforma desde el navegador. El contenido y los permisos son los mismos por las dos puertas.
- Rieles: `tu Claude o tu ChatGPT ──→ Central IA` (por MCP) · `tu navegador ──→ Central IA` (web)

**Componentes:** `VerticalRail` sobre fondo claro, con `PosterHeading`.

### 3.6 Cómo implementamos

**Responde:** cómo se empieza y cuánto tarda.

- Kicker: `05 · cómo implementamos`
- Póster: **Por olas**
- Bajada: Central IA llega con el equipo que la implementa. Relevamos cómo trabaja tu empresa, armamos el Brain y preparamos cada agente con vos.

Cuatro pasos:

1. **Primera conversación.** 30 minutos con quien conduce la empresa. Vemos qué IA ya usan, dónde quedó trabada y si tiene sentido seguir. Sin costo.
2. **Radar.** Tres a cuatro horas de reuniones con tu equipo directivo. Te llevás un informe con el método de tu empresa relevado, los puntos de dolor y las oportunidades, ordenados en un plan a dos años con datos, habilidades, agentes y herramientas. USD 1.500, bonificado si implementás la ola cero.
3. **Ola cero, tres meses.** Deja funcionando el Brain, los permisos y un primer circuito de negocio, con un grupo chico de tu equipo y una reunión de trabajo por semana. Vas a ver algo andando en las primeras semanas.
4. **Olas siguientes y operación.** Cada ola dura tres meses y termina con algo operando. Entre una ola y la siguiente decidís si seguís, cambiás el orden o frenás. La velocidad la elegís vos.

- Nota bajo los pasos: Para planificar la mejora de toda la empresa existe el Mapa del Método, un relevamiento más profundo que define el alcance de cada ola trimestral, área por área.

- Link: **Ver el método completo →** → `/como-implementamos`



**Componentes:** las tarjetas de pasos que hoy usan `/soluciones` y `/en-paralelo`.

### 3.7 El primer paso, puertas adentro

**Responde:** cómo defiendo esto ante mi directorio.

- Kicker: `06 · el primer paso`
- Póster: **Un paso acotado**
- Bajada: El primer compromiso es chico, tiene precio fijo y deja un informe que sirve aunque la decisión sea frenar ahí.

Dos tarjetas:

**Qué se aprueba**
- Un Radar de USD 1.500: tres a cuatro horas de tu equipo directivo.
- Un informe escrito que queda en la empresa: método relevado, puntos de dolor, oportunidades y plan a dos años.
- El Radar se bonifica completo al implementar la ola cero.
- Entre ola y ola hay un punto de decisión para seguir, reordenar o frenar.

**Qué riesgo baja**
- La información de la empresa pasa a trabajarse en un espacio con usuarios corporativos y permisos.
- La empresa define quién lee y quién escribe en cada tema.
- Se aprovechan las licencias de IA que ya se pagan.
- Todo lo que llega a un cliente pasa antes por una persona.

- CTA secundario: **Descargá el resumen para tu directorio** → PDF de una página

**Componentes:** dos `EconomicsCard` (existe y hoy solo la usa una página despublicada). Falta construir: el PDF de una página, que responde al freno que apareció en la reunión con el grupo de seguros.

### 3.8 Quiénes somos

**Responde:** quiénes son y por qué creerles.

- Kicker: `07 · quiénes somos`
- Póster: **Primero, en casa**
- Cuerpo: INNOV.AS es la primera empresa adentro de Central IA. Nuestro trabajo comercial corre ahí todos los días: el Brain con nuestros criterios, los permisos de cada persona del equipo y un agente de prospección que investiga, redacta, espera la aprobación de una persona y recién entonces envía. En la primera conversación te la mostramos funcionando.
- Segundo párrafo: Somos un equipo senior con 25 años transformando más de 150 organizaciones en 14 países, en consumo masivo, educación, agro, organismos internacionales y sector público. Trabajamos con empresas pequeñas, medianas y grandes de Latinoamérica, en español y con quien conduce la empresa en la mesa.
- Cinta de organizaciones, con rótulo nuevo: `Organizaciones para las que trabajó nuestro equipo`. BID y FAO se quedan en la cinta: son experiencia previa del equipo. La frase "Trabajamos para organismos internacionales" sale.
- Cifras: `25 años` · `+150 organizaciones` · `14 países`
- Link: **Conocenos →** → `/nosotros`

**Componentes:** `InstitutionalStrip` y tres `StatCounter`.

### 3.9 Preguntas frecuentes

**Responde:** las objeciones que quedan.

- **Ya pagamos licencias de ChatGPT o Claude. Central IA las reemplaza?** Las aprovecha. La licencia le da un asistente a cada persona. Central IA le da a la empresa un conocimiento compartido, permisos y agentes, y cada persona los usa desde el asistente que ya tiene.
- **Cuánto tarda en verse algo?** La ola cero dura tres meses y se concentra en un solo caso de negocio. En las primeras semanas ya hay algo andando.
- **Dónde queda la información de mi empresa?** En un espacio propio de tu empresa dentro de Central IA, aislado del de las demás. Los modelos de IA trabajan sin ver credenciales. [El detalle de infraestructura queda para la reunión con sistemas.]
- **Cómo entra mi gente?** Con el correo de la empresa: por invitación, o abierto a quien tenga un correo verificado de tu dominio. El ingreso es con la cuenta de Microsoft o de Google de la empresa, o con un link que llega por mail.
- **Qué necesitamos de nuestro lado?** Quien conduce la empresa en la mesa, una persona de sistemas como interlocutor y un grupo chico del área por la que se empieza.
- **Cuánto cuesta?** El primer paso es el Radar: USD 1.500, bonificado si implementás la ola cero. Cada ola se cotiza con alcance cerrado antes de empezar. La plataforma tiene un mantenimiento mensual más el consumo de modelos, que te informamos.
- **Qué diferencia hay entre el Radar y el Mapa del Método?** El Radar dimensiona la ola cero y traza un plan a dos años en pocas horas de tu equipo directivo. El Mapa del Método entra en cada área del negocio y define en detalle el alcance de las olas trimestrales para toda la empresa. Se bonifica al implementar la ola cero y la ola uno.

**Componentes:** `TrainerFaq` renombrado a `Faq` (es genérico, usa el `Accordion` de `ui/`).

### 3.10 Cierre

**Responde:** qué hago ahora.

- Título: **Contanos cómo está la IA en tu empresa hoy**
- CTA: **Agendá una primera conversación** → `/contacto`
- Nota: 30 minutos, sin costo, con el equipo que después implementa.

**Componentes:** `CtaBanner`. `DualCta` deja de usarse.

---

## 4. Las demás páginas

### 4.1 `/central-ia`

Para quien quiere entender el producto antes de la reunión, y para la persona de sistemas que va a opinar.

1. **Hero.** Póster: "Central IA". Apoyo: "Tu gente, tus agentes y tus herramientas, con permisos." Bajada: "Una plataforma donde la empresa entra con sus usuarios y encuentra lo que sabe, los agentes que la ayudan y las herramientas que ya usa. Cada empresa en su espacio, aislada de las demás." CTA: "Pedí una demo" → `/contacto`.
2. **Brain.** Qué es y qué resuelve: el método de la empresa deja de vivir en la cabeza de pocas personas, y cada conversación con un asistente parte de lo que la empresa ya sabe. Funciones disponibles: páginas en carpetas, editor visual, historial de versiones con comparación y restauración, búsqueda en español.
3. **Permisos.** Los cuatro niveles, por carpeta y por página, por persona o para todos, con herencia. La frase central: "El mismo permiso vale en la web, en tu asistente y en el chat con un agente."
4. **Agentes.** Cómo se define uno: se acuerda con la empresa, INNOV.AS lo implementa, se fija qué datos puede usar y qué personas pueden usarlo. Ejemplo real: el agente de prospección comercial y su ciclo, contado como lo usamos nosotros. Cierre: "Cada agente nuevo hereda el Brain, los permisos, las aprobaciones y el registro."
5. **Tu gente decide, los agentes ejecutan.** La tabla de niveles de acción, en lenguaje de negocio: trabaja solo con datos de la plataforma, corre sola; gasta en servicios de terceros, corre sola con tope; escribe en un sistema de la empresa, política que elige la empresa; le llega a alguien de afuera, aprobación humana siempre.
6. **Dos puertas.** Lo mismo del home, más cómo se conecta Claude o ChatGPT paso a paso.
7. **Herramientas y panel de la empresa.** El CRM, el correo y las fuentes de datos conectados, con permisos por persona, desde la plataforma o por MCP. La empresa configura desde su panel cómo entra su gente, qué agentes tiene, qué herramientas conecta y quién accede a qué.
8. **Para sistemas.** Tres roles (administrador de plataforma, administrador de la empresa, miembro), ingreso sin contraseñas, el modelo trabaja sin ver credenciales, registro inalterable, tope de gasto por empresa.
9. **Cierre.** "Mirala funcionando" → `/contacto`.

**Componentes:** todos existen salvo el diagrama del producto. Lleva dos o tres capturas reales de la plataforma con datos de demostración; la interfaz todavía muestra el nombre anterior, así que se actualiza o se recortan.

### 4.2 `/como-implementamos`

1. **Hero.** Póster: "Por olas". Apoyo: "Cada tres meses, algo nuevo operando." Bajada: "Implementamos Central IA adentro de tu empresa con un método de etapas cortas. Cada una tiene alcance cerrado y un resultado que queda funcionando." CTA: "Agendá una primera conversación".
2. **El camino.** Los cuatro pasos del home con más detalle: qué pasa en cada uno, cuánto dura, qué entrega y qué decide la empresa al final.
3. **Dos formas de empezar.** Dos tarjetas lado a lado.
   - **Radar · USD 1.500.** Para dimensionar la ola cero. Tres a cuatro horas de reuniones con el equipo directivo. Releva el método de la empresa con el detalle necesario para dimensionar la implementación, y entrega un informe con los puntos de dolor y las oportunidades en un plan a dos años: datos, habilidades, agentes y herramientas. Bonificado al implementar la ola cero, de unos tres meses.
   - **Mapa del Método.** Para planificar la mejora de toda la empresa. Profundiza en el método de cada área del negocio, identifica las principales oportunidades y define en detalle el alcance en olas trimestrales. Bonificado al implementar la ola cero y la ola uno, unos seis meses. [Precio de lista USD 7.500. Según la recomendación aceptada el sitio publica un solo número, el del Radar, y este se conversa en la reunión. Si preferís publicarlo, es agregar una línea.]
4. **La ola cero por dentro.** Qué queda al terminar: la empresa dada de alta con sus usuarios, el Brain inicial en tres frentes (personas y roles, procesos, criterios de decisión), los permisos y responsables por tema, las licencias que ya tienen conectadas al Brain y un primer circuito de negocio elegido en el Radar.
5. **Principios.** Valor para el negocio cada una o dos semanas. Primero velocidad, después optimización. Cada tema del Brain tiene un para qué. La velocidad la elige la empresa.
6. **Quién hace qué.** De tu lado: quien conduce la empresa como sponsor, un interlocutor de sistemas, un responsable por tema del Brain. Del nuestro: perfil de datos, arquitectura y conducción técnica, construcción de agentes, procesos y adopción. Sin nombres.
7. **El primer paso, puertas adentro.** El bloque 3.7 ampliado, con el PDF.
8. **Preguntas frecuentes.** Las del home más las de método: qué pasa si frenamos después del Radar, cómo se elige el primer circuito, cuánto tiempo le pide a mi equipo.
9. **Cierre.** CTA a `/contacto`.

**Componentes:** tarjetas de pasos, `EconomicsCard`, `Faq`, `CtaBanner`. Nada nuevo.

### 4.3 `/proyectos`

Una sola página, sobria, fuera del menú principal.

- **Hero.** Póster: "A medida". Bajada: "El mismo equipo que implementa Central IA construye plataformas de datos y software a medida para organizaciones con un proyecto concreto."
- **Qué construimos.** Las cuatro tarjetas de `content/soluciones.ts`, con retoques menores.
- **Cómo trabajamos.** Los cuatro pasos y los principios actuales.
- **Con quién.** "Empresas con un proyecto de plataforma o producto digital, y organismos y sector público, por licitación o contratación directa." Sin "ejecutamos para".
- **Puente.** "Tu necesidad es ordenar la IA de la empresa: mirá Central IA." → `/central-ia`
- **Cierre.** "Contanos tu proyecto" → `/contacto`.

Sale el bloque "Operar en B" (el brain vivo ahora es producto y se cuenta en `/central-ia`).

### 4.4 `/nosotros`

- **Hero.** Póster: "Probado en terreno" puede quedar. Bajada nueva: "INNOV.AS nace de años de construir tecnología para organizaciones con poco margen de error. De esa experiencia sale Central IA: la plataforma que ordena la adopción de IA en la empresa, y el equipo que la implementa."
- **Por qué construimos Central IA.** Vimos a las empresas llenarse de IA suelta, y vimos que la gobernanza escrita en un documento dura poco. La pusimos en el producto.
- **De dónde venimos.** Experiencia por dominios y proyectos, sin personas: plataformas de datos territoriales, análisis satelital, comercio electrónico de consumo masivo, plataformas educativas. Cifras: 25 años transformando más de 150 organizaciones en 14 países.
- **Cómo pensamos.** Los principios actuales sirven, con uno nuevo adelante: "El control va en el producto."
- **Cierre.** Cambia "Querés trabajar con nosotros?" (que se lee como búsqueda de empleo) por "Conversemos" → `/contacto`.
- **Link a `/proyectos`** dentro de "De dónde venimos".

### 4.5 `/contacto`

- **Título:** Agendá una primera conversación
- **Bajada:** 30 minutos con el equipo que después implementa. Vemos qué IA ya usa tu empresa, dónde quedó trabada y cuál sería el primer paso. Sin costo.
- **Qué pasa después,** en tres líneas a la vista: elegís un horario; en la reunión te mostramos Central IA funcionando; si tiene sentido, agendamos el Radar.
- **Agenda embebida** como acción principal, sobre el calendario de Mati (ver 5.1).
- **Formulario corto** como alternativa ("Preferís que te escribamos?"): nombre, email laboral, empresa, país, cantidad de personas en la empresa (rangos), qué IA usan hoy (opciones) y un campo libre opcional.
- **Mail directo:** queda.

### 4.6 Piezas transversales

- `content/seo.ts`: título del home "Central IA: la plataforma que ordena la adopción de IA en tu empresa | INNOV.AS". Descripción: el one-liner comercial del canon.
- `lib/schema.ts`: la organización con la descripción nueva, y Central IA como producto.
- `public/llms.txt`: reescribirlo entero con el elevator pitch del canon. Es barato y es lo que van a citar los asistentes.
- `not-found`: el chiste de "tu próxima oportunidad de automatización" puede quedar.

---

## 5. Camino de conversión

| Dónde | CTA | A dónde lleva |
|---|---|---|
| Menú, en todas las páginas | Agendá una conversación | `/contacto` |
| Hero del home | Agendá una primera conversación | `/contacto` |
| Hero del home, secundario | Conocé Central IA | `/central-ia` |
| Bloque de producto | Ver la plataforma en detalle | `/central-ia` |
| Bloque de método | Ver el método completo | `/como-implementamos` |
| Bloque del primer paso | Descargá el resumen para tu directorio | PDF |
| Cierre del home | Agendá una primera conversación | `/contacto` |
| `/central-ia` | Pedí una demo / Mirala funcionando | `/contacto` |
| `/como-implementamos` | Agendá una primera conversación | `/contacto` |
| `/proyectos` | Contanos tu proyecto | `/contacto` |

Una sola conversión, la primera conversación. Los secundarios existen para que quien todavía duda siga leyendo, y vuelven siempre al mismo lugar.

**Después del clic, propuesto**

1. El visitante llega a `/contacto` y ve qué va a pasar en la reunión.
2. Elige un horario en la agenda, o deja el formulario.
3. Ve una confirmación con el paso siguiente y el link al resumen para el directorio.
4. Recibe la invitación por mail con dos preguntas previas: qué IA usan hoy y quiénes van a estar.
5. En la reunión: demo de Central IA sobre el brain propio y propuesta de Radar.

**Qué falta construir para que funcione**

- La agenda (ver 5.1). Hoy hay solo formulario con respuesta en 48 horas hábiles.
- Los dos campos de calificación en el formulario, y pasarlos a la función de Supabase.
- La confirmación con paso siguiente (hoy es una línea de texto bajo el botón).
- El evento de conversión en Analytics para agenda y formulario.
- El PDF para el directorio.
- Confirmar qué hace la función `contact_form` con el dato: si lo carga en HubSpot y a quién le avisa. Está fuera de este repo.

---

### 5.1 La agenda, con cuatro empresas en el mismo calendario

El riesgo es que la agenda ofrezca un horario que está ocupado por una reunión de otra empresa. Se resuelve eligiendo una herramienta que mire varios calendarios al calcular la disponibilidad, sin mostrarle a nadie de qué es cada evento.

Punto de partida: en la cuenta de Google que tengo conectada ya aparecen juntos los cinco calendarios personales (innov.as, ucrop.it, plunkton.com, okeefe.com.ar y gmail), así que el cruce ya existe en al menos una cuenta.

Propuesta:

1. La agenda se crea desde `matias@innov.as`, para que la invitación le llegue al prospecto con el dominio de INNOV.AS.
2. Los otros cuatro calendarios se comparten con esa cuenta en modo "ver solo libre u ocupado", si todavía no lo están.
3. La herramienta se configura para chequear disponibilidad contra los cinco.
4. Un solo tipo de reunión: 30 minutos, con ventana horaria acotada, margen de 15 minutos entre reuniones, aviso mínimo de un día y tope de reuniones por día.

Herramienta: HubSpot Meetings, confirmada por Mati el 2026-10-10, porque el sitio ya carga su tracking y el contacto queda creado en el CRM. Hay que confirmar en su configuración que deja elegir varios calendarios de la cuenta conectada para la disponibilidad. Si se queda corta, las páginas de reserva de Google Calendar lo hacen de forma nativa con los calendarios de la lista, y Cal.com o Calendly aceptan varias cuentas conectadas a la vez.

---

## 6. Decisiones

### Cerradas por Mati el 2026-10-10

| Tema | Decisión |
|---|---|
| Proyectos a medida | Página propia `/proyectos`, fuera del menú, linkeada desde footer y Nosotros |
| Precio | Se publica la estructura completa y un número, el del Radar: USD 1.500, bonificado al implementar la ola cero |
| Diagnósticos | Dos productos: Radar y Mapa del Método, con el alcance de la sección 4.2 |
| Prueba social | La plataforma en nuestra propia operación, demo verificable y experiencia del equipo por dominios |
| Marca Central IA | Se usa. La advertencia se sacó del brain |
| Claude y ChatGPT | Se nombran. El conector funciona con ChatGPT y el acceso por MCP se comunica como disponible |
| Agenda | Embebida en `/contacto`, sobre el calendario de Mati, con formulario como alternativa |
| Dónde corre | El sitio afirma aislamiento entre empresas y manejo de credenciales. El resto, en la reunión con sistemas |
| Capturas | Dos o tres capturas reales en `/central-ia` |
| Desde Adentro y Recursos | Se borran las tres rutas |
| `/empresa` y `/cuentas/*` | Redirect en pausa hasta el deck nuevo; noindex para las cuentas |
| Mensaje a organismos | El anterior, sin "ejecutamos para", en `/proyectos` |

### Cerradas en la segunda ronda, 2026-10-10

| Tema | Decisión |
|---|---|
| BID y FAO | Se quedan en la cinta de organizaciones, como experiencia previa del equipo |
| Cifras de trayectoria | 25 años transformando más de 150 organizaciones en 14 países |
| Estado de la plataforma | Todo se da por completo. Sin etiquetas de "en el plan" |
| Herramienta de agenda | HubSpot Meetings, confirmada |

### Cerradas en la tercera ronda, 2026-10-10

| Tema | Decisión |
|---|---|
| Precio del Mapa del Método | Fuera del sitio. Se publica solo el del Radar |
| Reglas de afirmación | El brain quedó actualizado: la plataforma se comunica completa; lo que falta construir es tema interno y se hace para Lagomarsino |
| Experiencia y clientes | Vago a propósito: se habla de la experiencia transformando empresas, sin diferenciar tecnologías ni desglosar qué fue sobre Central IA |

Sin pendientes. El resumen de estas decisiones vive en el brain, en `marketing/sitio-central-ia`.
