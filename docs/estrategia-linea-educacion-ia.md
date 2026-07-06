# INNOV.AS — Línea de Educación IA + Transformación de Procesos

> Documento maestro: estrategia, arquitectura del sistema educativo y backlog de tareas delegables con prompts.
> Fecha: 2026-07-05 · Estado: v1 — decisiones validadas en entrevista con Mati.

---

## 1. Decisiones tomadas (fuente de verdad)

| Dimensión               | Decisión                                                                                                                                                                                       |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Estructura              | Línea de negocio dentro de INNOV.AS (no marca ni sociedad nueva)                                                                                                                               |
| Cliente inicial         | Empresas privadas medianas/grandes (agro, banca, retail, industria)                                                                                                                            |
| Rol de multilaterales   | Credencial y prueba de capacidad de ejecución (BM, BID, FAO, SAGyP). No son el comprador del funnel educativo inicial                                                                          |
| Modelo P&L              | **Dos líneas autosuficientes**: (A) Educación y (B) Transformación. Educación debe ser rentable por sí sola, no loss-leader                                                                    |
| Trainers                | Red externa certificada: profesionales pagan la certificación y luego INNOV.AS los contrata por proyecto                                                                                       |
| Formato educativo       | Mixto: contenido asincrónico + **tareas donde el alumno usa IA para mapear casos de negocio de su propia empresa** + talleres prácticos (online o in-house) donde se discuten las resoluciones |
| Niveles                 | 4 niveles: Fundamentos → Usuario Avanzado → Builder → Orquestador                                                                                                                              |
| Contenido               | Curaduría de material online (mayormente en inglés) + estructura propia. Pulir con material original con la experiencia. Mati aporta links de x.com (nivel avanzado)                           |
| Stack enseñado          | Opinionado: ChatGPT/Claude → Claude/Copilot avanzado → n8n/Make + APIs → agentes multi-step                                                                                                    |
| LMS                     | SaaS educativo (LearnWorlds / Teachable / Circle — a seleccionar en T2.1)                                                                                                                      |
| Idioma/geo              | Español, LATAM primero                                                                                                                                                                         |
| Sitio web               | Sitio innov.as COMPLETO sobre el repo Next.js existente, en español. Home = transformación digital + automatización agéntica; la tesis "la adopción se da desde adentro" conecta con la línea educativa. Dos motores: soluciones estructurales + equipo potenciándose |
| Diferencia con Plunkton | Plunkton = producto SaaS de agentes conversacionales por vertical. Esta línea = servicios de educación + transformación de procesos. Sin overlap de foco ni de socios                          |

---

## 2. Tesis estratégica

**El funnel es: educar → detectar → transformar.**

1. La empresa contrata un programa de formación IA para sus equipos (línea Educación, rentable standalone).
2. Las **tareas del curso son discovery encubierto**: cada alumno mapea casos de negocio y oportunidades de automatización de su propia empresa usando IA. Al final de una cohorte, INNOV.AS tiene un inventario documentado de procesos mejorables, priorizado por la propia gente del cliente.
3. Los talleres revelan quiénes son los builders y champions internos.
4. La propuesta de transformación (línea B) se arma sobre ese inventario, con los champions formados como aliados internos → adopción más rápida y menor resistencia al cambio.

**El flywheel de trainers:** certificar trainers externos es un producto con margen (pagan por certificarse) que a la vez construye la capacidad de entrega (INNOV.AS los contrata por cohorte). El costo de escalar la entrega lo financia el propio trainer.

**Ventaja competitiva frente a academias de IA genéricas:** INNOV.AS no vende cursos, vende capacidad de ejecución probada — años de proyectos de transformación con tecnología para Banco Mundial, BID, FAO, SAGyP y empresas privadas. La educación es el primer paso de un camino de transformación real, no un certificado más.

### Contrapeso anti-sobreconstrucción

Riesgo conocido: construir demasiado antes de validar. Reglas para esta línea:

- No se produce contenido de Nivel 3 y 4 hasta vender la primera cohorte de Nivel 1–2.
- No se desarrolla nada custom sobre el LMS: SaaS out-of-the-box hasta tener 3+ cohortes pagas.
- El programa de certificación de trainers se lanza después del primer piloto in-company exitoso, no antes.
- Meta de validación: **1 piloto in-company pago en los primeros 60 días.**

---

## 3. Arquitectura del sistema educativo

### Los 4 niveles

| #   | Nombre               | Audiencia                                   | Outcome                                                                                                                       | Duración estimada       | Stack                                                         |
| --- | -------------------- | ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ----------------------- | ------------------------------------------------------------- |
| 1   | **Fundamentos IA**   | Todos los empleados                         | Entiende qué es la IA generativa, qué puede y no puede hacer, la usa a diario con criterio y seguridad                        | 3–4 semanas (2–3 h/sem) | ChatGPT / Claude / Gemini (el que use la empresa)             |
| 2   | **Usuario Avanzado** | Analistas, mandos medios, profesionales     | Domina prompting estructurado, proyectos/GPTs/artefactos, integra IA a su flujo de trabajo real y multiplica su productividad | 4–5 semanas             | Claude / ChatGPT avanzado, Copilot, NotebookLM                |
| 3   | **Builder**          | Perfiles técnicos-curiosos, ops, innovación | Construye automatizaciones y primeros agentes sin ser developer: workflows, integraciones, APIs                               | 6 semanas               | n8n / Make, APIs, structured output                           |
| 4   | **Orquestador**      | Champions, líderes de transformación        | Diseña sistemas multi-agente, rediseña procesos end-to-end, define gobernanza y métricas de adopción                          | 6–8 semanas             | n8n multi-agente, agentes con estado, evaluación y guardrails |

**Producto 5 — Certificación de Trainers:** programa aparte. El candidato ya domina Nivel 1–2 (idealmente 3), paga la certificación, aprende la metodología de facilitación de INNOV.AS (cómo correr talleres, cómo evaluar tareas, cómo detectar oportunidades de transformación) y queda habilitado — y contratable — para facilitar cohortes.

### Pedagogía de cada nivel (el "modo mixto")

Cada módulo repite el mismo ciclo de 3 pasos:

1. **Async:** contenido curado (video + lectura + demo) en el LMS. Consumo individual.
2. **Tarea aplicada:** el alumno usa IA para resolver un caso **de su propia empresa** — mapear un proceso, identificar una oportunidad, prototipar una automatización. Entrega estructurada (template estándar).
3. **Taller live (online o in-house):** el trainer facilita la discusión de las resoluciones. Peer learning: personas enseñando a personas. Se documentan las mejores oportunidades detectadas.

El template de entrega de tareas es un asset estratégico: alimenta el **inventario de oportunidades de transformación** por cliente (ver T1.3).

---

## 4. Modelo de negocio

### Línea A — Educación (rentable standalone)

| Producto | Comprador | Modelo de precio (a definir en T0.2) |
|---|---|---|
| Programa in-company por nivel | Empresa (HR / Innovación / Gerencia) | Por cohorte (cupo 15–25 personas) |
| Certificación de Trainers | Profesional independiente | Por persona, pago único |
| Suscripción de contenido async | Empresa (post-programa) | Por seat/mes (fase 2, no lanzar aún) |

### Línea B — Transformación (upsell natural)

| Producto | Trigger | Modelo |
|---|---|---|
| Diagnóstico + roadmap de automatización | Inventario de oportunidades de la cohorte | Proyecto fixed-price |
| Implementación de agentes/automatizaciones | Roadmap aprobado | Proyecto + retainer |
| Acompañamiento a champions | Nivel 4 completado | Retainer mensual |

### Unit economics del trainer externo

El trainer paga certificación → INNOV.AS lo contrata por cohorte a tarifa fija → margen de la cohorte = precio in-company − (tarifa trainer + costo LMS + overhead comercial). La calidad se controla con rúbrica de certificación, evaluación post-cohorte (NPS alumnos) y recertificación periódica.

---

## 5. Backlog de tareas delegables

### Cómo usar este backlog

Cada tarea tiene: objetivo, entregable, dependencias y un **prompt autocontenido** listo para copiar a otro agente (Claude, Cowork u otro). Antes de cada prompt, pegar el **Bloque de Contexto Común** de abajo. Los prompts asumen que el agente NO tiene acceso a esta conversación.

### Bloque de Contexto Común (pegar al inicio de todo prompt)

```text
CONTEXTO: INNOV.AS es una firma argentina de soluciones tecnológicas end-to-end
cuyos lideres tienen años de experiencia ejecutando proyectos de transformación digital para organismos multilaterales (Banco Mundial, BID, FAO), sector público (SAGyP, INTA, SENASA) y empresas privadas. Está lanzando una línea de negocio de
Educación IA + Transformación de Procesos con este modelo:

- FUNNEL: programas de formación IA in-company (4 niveles: Fundamentos,
  Usuario Avanzado, Builder, Orquestador) → las tareas del curso hacen que
  los alumnos mapeen oportunidades de automatización de su propia empresa →
  ese inventario alimenta proyectos de transformación con agentes IA,
  ejecutados junto a champions internos formados en el programa.
- PEDAGOGÍA: modo mixto por módulo: (1) contenido async en LMS SaaS,
  (2) tarea aplicada a la empresa del alumno con template estándar,
  (3) taller live (online/in-house) facilitado por un trainer donde se
  discuten las resoluciones entre pares.
- TRAINERS: red externa certificada. Pagan la certificación, luego INNOV.AS
  los contrata por cohorte.
- DOS LÍNEAS P&L AUTOSUFICIENTES: Educación debe ser rentable standalone;
  Transformación es upsell, no subsidio.
- CLIENTE INICIAL: empresas privadas medianas/grandes de LATAM. Los
  multilaterales son credencial de ejecución, no el comprador inicial.
- IDIOMA: español (LATAM). Materiales fuente pueden estar en inglés.
- STACK ENSEÑADO (opinionado): ChatGPT/Claude → Claude/Copilot avanzado →
  n8n/Make + APIs → agentes multi-step.
- PRINCIPIOS INNOV.AS: outputs estructurados, separación determinístico vs
  IA, estado persistente, pensar multi-cliente/reutilizable desde el día 1,
  validar en mercado rápido antes de sobre-construir.
- CALIDAD: todo entregable debe quedar listo para cliente sin edición.
  Sin lenguaje de relleno.
```

---

### FASE 0 — Posicionamiento y oferta

#### T0.1 · Naming y posicionamiento de la línea educativa

- **Objetivo:** nombre de la línea (ej. "INNOV Academy" u opción mejor) y posicionamiento formal usando el framework Obviously Awesome de April Dunford.
- **Entregable:** documento con 5 opciones de nombre evaluadas, posicionamiento completo (alternativas competitivas, atributos únicos, valor, cliente objetivo, categoría de mercado) y tagline.
- **Dependencias:** ninguna. **Agente sugerido:** Claude con skill `obviously-awesome`.

**Prompt:**

```text
[Bloque de Contexto Común]

TAREA: Definí el naming y posicionamiento de la línea de Educación IA de
INNOV.AS usando el framework Obviously Awesome (April Dunford).

1. Listá las alternativas competitivas reales del comprador (academias de IA
   online, consultoras Big-4 con práctica de IA, cursos gratuitos de
   Google/OpenAI/Anthropic, no hacer nada).
2. Identificá los atributos únicos: (a) el funnel educación→transformación
   con inventario de oportunidades como subproducto del curso, (b) champions
   internos que aceleran la adopción, (c) track record de ejecución en BM,
   BID, FAO y empresas privadas, (d) trainers certificados con metodología
   propia.
3. Derivá el valor y el cliente que más lo valora (gerencias de innovación,
   operaciones y RRHH de empresas medianas/grandes LATAM).
4. Elegí la categoría de mercado que hace obvio el diferencial (¿"formación
   corporativa en IA"? ¿"programa de transformación con IA"? justificá).
5. Proponé 5 nombres para la línea (que convivan con la marca INNOV.AS,
   dominio .as o subdominio disponible deseable) con pros/contras, y un
   tagline en español para cada finalista.

FORMATO: markdown estructurado, tabla comparativa de nombres, recomendación
final justificada en ≤5 líneas.
```

#### T0.2 · Oferta y pricing

- **Objetivo:** estructura de precios de los 3 productos de Educación (programa in-company por nivel, certificación de trainers, y talleres sueltos si aplica) + tarifario de trainers.
- **Entregable:** documento de pricing con lógica de márgenes por cohorte.
- **Dependencias:** T0.1. **Agente sugerido:** Claude con skill `pricing-strategy`.

**Prompt:**

```text
[Bloque de Contexto Común]

TAREA: Diseñá el pricing de la línea Educación. Restricción dura: la línea
debe ser rentable standalone (no es loss-leader de consultoría).

1. Investigá precios de referencia LATAM/Argentina 2026: formación
   corporativa in-company (por cohorte de 15-25 personas), certificaciones
   profesionales de IA, y tarifas de facilitadores freelance senior.
2. Proponé pricing para: (a) programa in-company Nivel 1 y Nivel 2 (los que
   se lanzan primero), (b) certificación de trainers (pago único por
   persona), (c) bundle multi-nivel con descuento.
3. Armá el unit economics por cohorte: precio − (tarifa trainer + costo LMS
   por seat + costo comercial estimado 15%) = margen. Mostrá 3 escenarios
   (piso/base/premium).
4. Definí la tarifa por cohorte que INNOV.AS paga al trainer certificado,
   de modo que el trainer recupere su inversión en certificación en ≤2
   cohortes (incentivo de reclutamiento).
5. Precios en USD con equivalente ARS referencial.

FORMATO: markdown con tablas. Toda cifra investigada con fuente; toda
suposición marcada como tal.
```

---

### FASE 1 — Curriculum

#### T1.1 · Curaduría de materiales por nivel

- **Objetivo:** mapear y ordenar el mejor material online existente (mayormente inglés) contra la estructura de 4 niveles.
- **Entregable:** matriz material × nivel × módulo con evaluación de calidad y qué gap hay que producir en propio.
- **Dependencias:** ninguna (puede correr en paralelo a Fase 0). **Agente sugerido:** agente de research con web search.
- **Nota:** Mati aporta además sus links guardados de x.com (nivel avanzado) — pasarlos al agente como input adicional.

**Prompt:**

```text
[Bloque de Contexto Común]

TAREA: Investigá y curá material educativo online para armar la base de
contenidos de los 4 niveles. Punto de partida (validá vigencia y ampliá):

- Anthropic AI Fluency / Anthropic Academy (framework 4D) — niveles 1-2
- OpenAI Academy (básico hasta agentes, certificados gratis) — niveles 1-3
- Google AI Essentials (~10 h, principiantes) — nivel 1
- Microsoft AI Skills Initiative / IBM SkillsBuild — nivel 1-2
- DeepLearning.AI short courses (prompting, agents, RAG) — niveles 2-4
- Hugging Face Agents Course — niveles 3-4
- n8n Academy/docs y Make Academy — nivel 3
- DataCamp "Introduction to AI for Work" — nivel 1

PARA CADA NIVEL (1-Fundamentos, 2-Usuario Avanzado, 3-Builder,
4-Orquestador):
1. Definí 5-7 módulos tentativos (título + objetivo de aprendizaje).
2. Mapeá qué recurso existente cubre cada módulo: URL, idioma, formato,
   duración, licencia/costo, calidad (1-5) y si es usable directo,
   adaptable, o solo inspiración.
3. Marcá los GAPS: módulos sin material adecuado en español o sin material
   con enfoque de negocio LATAM → candidatos a producción propia.
4. Priorizá: qué 20% de producción propia desbloquea lanzar Niveles 1-2.

RESTRICCIÓN: los Niveles 1-2 se lanzan primero; profundidad de análisis
ahí. Niveles 3-4 pueden quedar en esqueleto.
FORMATO: markdown, una tabla por nivel, sección final de gaps priorizados.
```

#### T1.2 · Diseño curricular detallado — Nivel 1 y Nivel 2

- **Objetivo:** syllabus completo listo para cargar al LMS y vender.
- **Entregable:** por cada nivel: módulos, lecciones async, tareas aplicadas, guion de talleres, evaluación y criterio de aprobación.
- **Dependencias:** T1.1. **Agente sugerido:** Claude (uno por nivel, mismo prompt parametrizado).

**Prompt (parametrizar {NIVEL}):**

```text
[Bloque de Contexto Común]

INPUT: adjunto la matriz de curaduría de materiales (output de T1.1).

TAREA: Diseñá el syllabus completo del {NIVEL} para cohortes in-company de
15-25 personas, duración {3-4 semanas N1 / 4-5 semanas N2}, carga 2-3
h/semana.

Para CADA módulo:
1. Objetivo de aprendizaje observable ("al terminar, el alumno puede X").
2. Contenido async: lecciones con recurso curado asignado (o marca de
   producción propia), duración por lección.
3. TAREA APLICADA: consigna donde el alumno usa IA sobre un caso real de SU
   empresa. Debe producir un entregable estructurado usando el template de
   oportunidades (proceso analizado, dolor, solución propuesta con IA,
   impacto estimado, esfuerzo estimado). La progresión de tareas a lo largo
   del programa construye un mini-inventario de oportunidades por alumno.
4. GUION DEL TALLER (90 min): apertura, dinámica de discusión de tareas
   entre pares, rol del trainer, cierre con síntesis de oportunidades
   detectadas. Formato facilitable por un trainer certificado que no es el
   autor del contenido.
5. Evaluación: rúbrica simple por tarea + criterio de aprobación del nivel
   y credencial que se emite.

FORMATO: markdown listo para cargar al LMS, en español, tono profesional
cercano (español rioplatense neutro, "vos" evitado en materiales escritos).
```

#### T1.3 · Template + banco de casos: el inventario de oportunidades

- **Objetivo:** diseñar el template estándar de entrega de tareas y el mecanismo que consolida las entregas de una cohorte en un inventario de oportunidades de automatización (el asset que alimenta la línea Transformación).
- **Entregable:** template de tarea (JSON + versión formulario), template de inventario consolidado por cliente, y guía de uso para trainers.
- **Dependencias:** T1.2. **Agente sugerido:** Claude.

**Prompt:**

```text
[Bloque de Contexto Común]

TAREA: Diseñá el sistema de captura de oportunidades embebido en las tareas
del curso.

1. TEMPLATE DE TAREA (por alumno): estructura JSON con campos: proceso
   analizado, área, dolor actual, frecuencia/volumen, solución propuesta
   (clasificada: asistencia IA / automatización determinística / agente),
   impacto estimado (horas/mes, $), esfuerzo estimado (S/M/L), datos y
   sistemas involucrados, riesgos. Versión legible como formulario para el
   LMS y versión JSON para procesamiento posterior.
2. CONSOLIDADOR: template del "Inventario de Oportunidades de [Cliente]"
   que agrega las entregas de una cohorte: matriz impacto × esfuerzo,
   top-10 priorizado, clasificación IA vs determinístico, quick wins.
   Este documento es el que el equipo comercial usa para proponer el
   proyecto de transformación.
3. GUÍA PARA TRAINERS: cómo dar feedback a las tareas, cómo detectar en el
   taller cuáles oportunidades tienen potencial real, y qué señales
   escalar al equipo comercial de INNOV.AS.

PRINCIPIO CLAVE: separar en la clasificación qué se resuelve con lógica
determinística y qué requiere IA — es parte de la pedagogía y del sello
metodológico de INNOV.AS.
FORMATO: markdown + bloques JSON de ejemplo completos.
```

#### T1.4 · Programa de Certificación de Trainers

- **Objetivo:** diseñar el producto "Train the Trainer": curriculum de la certificación, rúbrica de evaluación, contrato-marco y sistema de control de calidad.
- **Entregable:** programa completo + rúbrica + esquema de recertificación.
- **Dependencias:** T1.2, T1.3. **Agente sugerido:** Claude.

**Prompt:**

```text
[Bloque de Contexto Común]

INPUT: syllabus Niveles 1-2 (T1.2) y guía de trainers (T1.3).

TAREA: Diseñá el Programa de Certificación de Trainers de INNOV.AS.

1. PERFIL DE ENTRADA: requisitos (dominio equivalente a Nivel 2+,
   experiencia facilitando o enseñando, disponibilidad). Filtro de admisión.
2. CURRICULUM DE CERTIFICACIÓN (2-3 semanas): metodología de facilitación
   de talleres del sistema INNOV.AS, manejo del template de oportunidades,
   práctica supervisada (facilitar un taller simulado), evaluación final.
3. RÚBRICA DE CERTIFICACIÓN: criterios observables, umbral de aprobación,
   feedback estructurado a no aprobados.
4. MODELO DE RELACIÓN: el trainer certificado paga la certificación y queda
   en la red contratado por cohorte (no exclusividad, sí no-competencia
   sobre clientes de INNOV.AS — marcar cláusulas a validar con abogado).
5. CONTROL DE CALIDAD CONTINUO: NPS de alumnos por taller, observación
   aleatoria, recertificación anual, causales de baja de la red.

FORMATO: markdown. Todo lo legal marcado como "borrador a validar con
abogado".
```

---

### FASE 2 — Plataforma LMS

#### T2.1 · Selección del LMS SaaS

- **Objetivo:** elegir la plataforma para el componente async con matriz de decisión.
- **Entregable:** matriz comparativa + recomendación + estimación de costo año 1.
- **Dependencias:** ninguna. **Agente sugerido:** agente de research con web search.

**Prompt:**

```text
[Bloque de Contexto Común]

TAREA: Evaluá y recomendá el LMS SaaS para la línea educativa. Candidatos
mínimos: LearnWorlds, Teachable, Circle, Thinkific, Kajabi, Disco. Agregá
otros si son relevantes en 2026 para cohort-based corporate training.

CRITERIOS (ponderalos y justificá pesos):
1. Soporte de cohortes con calendario (no solo self-paced).
2. Tareas con entrega y feedback del trainer (assignments).
3. Comunidad/discusión entre alumnos.
4. Certificados de finalización con branding propio.
5. Multi-tenant o espacios separados por empresa cliente (crítico: cohortes
   in-company aisladas entre sí).
6. Roles: admin INNOV.AS / trainer externo con permisos limitados / alumno.
7. Interfaz y contenidos en español.
8. API/webhooks para exportar progreso y entregas (futuro: consolidar el
   inventario de oportunidades automáticamente).
9. Pricing: costo por seat o flat, escenario 3 cohortes de 20 alumnos
   simultáneas año 1.
10. SSO corporativo (nice-to-have para clientes grandes).

FORMATO: matriz de decisión con puntajes, costo total año 1 por candidato,
recomendación final y plan B. Fuentes con URL y fecha de consulta.
```

#### T2.2 · Setup del LMS y estructura de cohortes

- **Objetivo:** dejar la plataforma operativa con el Nivel 1 cargado y una cohorte demo.
- **Entregable:** checklist de setup ejecutado + cohorte demo navegable + manual de operación.
- **Dependencias:** T2.1, T1.2. **Agente sugerido:** Claude con browser (Claude in Chrome) + Mati para altas de cuenta/pagos.

**Prompt:**

```text
[Bloque de Contexto Común]

INPUT: LMS seleccionado (T2.1), syllabus Nivel 1 (T1.2), branding INNOV.AS.

TAREA: Generá el plan de implementación del LMS y ejecutá lo automatizable:

1. CHECKLIST DE SETUP: cuenta, dominio/subdominio (ej.
   academia.innov.as), branding, plantilla de certificado, estructura de
   espacios por cliente, roles y permisos de trainers.
2. CARGA DEL NIVEL 1: estructura de módulos/lecciones/tareas según
   syllabus, con placeholders donde el contenido aún no existe.
3. COHORTE DEMO: una cohorte de prueba con 3 usuarios ficticios (alumno,
   trainer, admin) para validar el flujo completo: consumir lección →
   entregar tarea → feedback de trainer → certificado.
4. MANUAL DE OPERACIÓN (1 página): cómo crear una cohorte nueva para un
   cliente, alta de alumnos, asignación de trainer, cierre y reporte.

FORMATO: markdown con checklist ejecutable paso a paso; marcar qué pasos
requieren acción humana (pagos, DNS, legales).
```

---

### FASE 3 — Sitio web

> Base: repo Next.js existente de innov.as. Se traduce íntegramente al español y se reemplazan todos los textos y contenidos. Requisito de diseño: personalidad visual propia, alejarse del look genérico actual (ver T3.2).

#### T3.1 · Arquitectura de contenidos y copywriting del sitio innov.as completo

- **Alcance:** el sitio COMPLETO de innov.as, no solo la sección educativa. La narrativa maestra del home: INNOV.AS transforma empresas con soluciones estructurales complejas (automatización agéntica, plataformas de datos, IA aplicada) — y la adopción profunda solo se logra desde adentro, por eso existe la línea educativa "Desde Adentro". Soluciones complejas + equipo potenciándose en paralelo = negocio acelerado.
- **Audiencias:** (1) empresarios/decisores privados que compran transformación y/o educación, (2) decisores de multilaterales y sector público (BM, BID, SAGyP) que validan capacidad de ejecución, (3) profesionales que quieren certificarse como trainers.
- **Entregable:** documento página por página con copy final en español.
- **Dependencias:** T0.1 ✅ (naming: Desde Adentro). **Agente sugerido:** Claude.

**Prompt:**

```text
[Bloque de Contexto Común]

INPUT: posicionamiento aprobado (T0.1): la línea educativa se llama
"Desde Adentro — Programa de Adopción de IA de INNOV.AS", categoría
"programa de adopción de IA", tagline "La IA no se implementa. Se adopta
desde adentro."

TAREA: Escribí el copy completo del sitio innov.as en español (rioplatense
neutro profesional), página por página. Es el sitio institucional COMPLETO
de INNOV.AS: la propuesta principal es transformación digital y
automatización agéntica; la línea educativa es parte orgánica de esa
narrativa, no un sitio de cursos.

NARRATIVA MAESTRA DEL HOME (en este orden):
1. HERO — INNOV.AS transforma empresas con tecnología: automatización
   agéntica, plataformas de datos, IA aplicada a procesos reales. Años de
   ejecución para Banco Mundial, BID, FAO, SAGyP y empresas privadas.
   CTA primario: "Hablemos de tu operación".
2. QUÉ HACEMOS — soluciones estructurales complejas: agentes que operan
   procesos end-to-end, plataformas multi-tenant, integración de datos,
   automatización determinística + IA donde corresponde. 3-4 cards de
   tipos de solución con resultados esperables.
3. LA TESIS (puente a educación) — "La tecnología sola no transforma
   nada. La adopción profunda se da desde adentro": mientras INNOV.AS
   construye las soluciones estructurales, tu equipo se potencia con el
   programa Desde Adentro — y la transformación se acelera porque la
   empuja tu propia gente. Este bloque explica el modelo de dos motores
   (soluciones + capacidades internas) y linkea a /desde-adentro.
4. CREDENCIALES — logos y años de experiencia (multilaterales + privados),
   2-3 proyectos destacados sin datos confidenciales.
5. CTA FINAL — dual: "Tengo un proyecto de transformación" /
   "Quiero potenciar a mi equipo".

ARQUITECTURA DE PÁGINAS:
1. HOME — según narrativa maestra de arriba.
2. /soluciones — Transformación y automatización agéntica: tipos de
   solución, metodología (separación determinístico vs IA, arquitectura
   multi-tenant, datos estructurados), cómo es trabajar con INNOV.AS
   (del diagnóstico al retainer), casos tipo.
3. /desde-adentro — el programa completo: la tesis, los 4 niveles (para
   quién, outcome, formato mixto: async + casos reales de la empresa +
   talleres), el diferencial del inventario de oportunidades, cierre
   ejecutivo. Sin precios publicados: CTA "Hablemos".
4. /desde-adentro/se-trainer — página con PROFUNDIDAD sobre el negocio
   del trainer: aprender IA al nivel de enseñarla, certificarse en la
   metodología INNOV.AS y facilitar cohortes corporativas contratado por
   INNOV.AS. Oportunidad económica (recuperás la inversión en ~2
   cohortes), perfil buscado, admisión selectiva, control de calidad,
   FAQ. Tono: carrera profesional seria, cero vibra piramidal.
5. /nosotros — historia y años de experiencia del equipo en proyectos de
   transformación con tecnología: multilaterales (BM, BID, FAO), sector
   público (SAGyP, INTA, SENASA) y privados. Perfiles de Matías y
   Marcos. Página que valida ante decisores institucionales.
6. /contacto — formulario segmentado: "Proyecto de transformación" /
   "Formar a mi equipo" / "Quiero ser trainer".

REGLAS DE COPY:
- Cada página: H1, subheads, cuerpo, CTAs y microcopy definidos.
- El home NUNCA se lee como sitio de una academia: es una firma de
  transformación con un programa educativo que hace la adopción posible.
- Beneficios antes que features; cifras concretas donde existan (marcar
  placeholder [DATO] donde falte confirmación).
- Nada de relleno ni superlativos vacíos. Publicable sin edición.
- SEO: title y meta description por página, en español.

FORMATO: markdown, una sección por página, copy final (no wireframe).
```

#### T3.2 · Dirección de arte / identidad visual propia — ✅ Completado (2026-07-05)

- **Objetivo:** definir una identidad visual con personalidad que rompa con el diseño genérico del sitio actual, antes de tocar código.
- **Entregable:** guía de dirección de arte: paleta, tipografías, estilo de ilustración/imagen, motion, componentes clave (hero, cards de niveles, sección trainer) + moodboard de referencias.
- **Dependencias:** T0.1. **Agente sugerido:** Claude con skill de diseño frontend (ver nota de skills al final del documento) + revisión humana de Mati.
- **Estado:** entregado y aprobado por Mati. Sistema "Cálido / Notación de Transición" (paper + teal/plum + Fraunces/Inter/Space Mono). Archivos de referencia en `innov/diseno/`: `T3.2-direccion-de-arte.md` (guía completa), `tokens/globals.css` + `tokens/tailwind.config.ts` (tokens listos para T3.3), `ref/innovas-style-tile-v3.html` (style tile). Registrado en el brain: [[identidad-visual-innovas]].

**Prompt:**

```text
[Bloque de Contexto Común]

TAREA: Definí la dirección de arte del nuevo sitio de INNOV.AS. El sitio
actual es Next.js con estética genérica (tipo template SaaS). Queremos
personalidad propia y memorable, sin perder seriedad ante decisores
corporativos e institucionales (Banco Mundial, BID).

1. ANÁLISIS: revisá 5-7 referencias de sitios de educación ejecutiva /
   consultoría tech con identidad fuerte (no templates). Extraé qué los
   hace distintivos: tipografía, color, layout, motion, ilustración.
2. PROPUESTA (2 direcciones alternativas + recomendación):
   - Paleta completa (tokens: primario, secundario, superficies, estados)
     con ratios de contraste WCAG AA verificados.
   - Par tipográfico (display + texto) con licencia web viable.
   - Sistema visual: estilo de imágenes/ilustraciones, iconografía,
     tratamiento de datos y diagramas (el "camino de 4 niveles" merece
     una visualización propia y reconocible).
   - Motion: qué se anima y qué no (sobriedad institucional).
3. COMPONENTES CLAVE especificados: hero de home, card de nivel/programa,
   sección "Sé Trainer", franja de logos institucionales, CTA.
4. TOKENS: entregá los design tokens como variables CSS listas para
   Tailwind config.

FORMATO: markdown + bloques de código de tokens. Cada decisión justificada
en 1-2 líneas, sin teoría de diseño genérica.
```

#### T3.3 · Implementación en el repo Next.js existente

- **Objetivo:** sitio nuevo online: traducción total al español, contenidos reemplazados por el copy de T3.1, identidad visual de T3.2 aplicada, nuevas páginas (Programas, Sé Trainer, Transformación).
- **Entregable:** PR(s) sobre el repo con el sitio completo + checklist de QA.
- **Dependencias:** T3.1, T3.2. **Agente sugerido:** Claude Code sobre el repo, con skill `frontend-dev`.

**Prompt:**

```text
[Bloque de Contexto Común]

INPUT: 
(1) acceso al repo Next.js del sitio innov.as actual, 
(2) documento de copy completo (T3.1), 
(3) - dirección de arte + tokens en innov/diseno/
    - Contrato de identidad: innov/diseno/T3.2-direccion-de-arte.md
    - Tokens (fuente de verdad): innov/diseno/tokens/globals.css + tailwind.config.ts
  - Referencia visual: innov/diseno/ref/innovas-style-tile.html
  REGLA: consumir tokens vía var(--…). Cero hex/tipografías hardcodeadas en JSX.
  Fuentes self-host con next/font (Fraunces variable, Inter, Space Mono).

TAREA: Reimplementá el sitio sobre el repo existente.

1. AUDITORÍA INICIAL: mapear estructura actual (App Router o Pages,
   sistema de estilos, componentes, i18n existente o no). Reportar antes
   de tocar código.
2. IDIOMA: contenido final en español. Si el repo tiene i18n, dejar
   es-AR como default; si no, NO agregar framework de i18n ahora
   (YAGNI — se agrega si se decide versión EN).
3. CONTENIDO: reemplazar el 100% de textos por el copy de T3.1. Nada de
   texto del sitio viejo debe sobrevivir. Los contenidos van en archivos
   estructurados (MDX o JSON/TS tipado) separados de los componentes —
   contenido como datos, no hardcodeado en JSX.
4. DISEÑO: usar el skill `innov-design-system` (sistema "Cálido /
   Notación de Transición": paper/ink/teal/plum + Fraunces/Inter/Space
   Mono). Regla dura: cero hex ni fuentes hardcodeadas en JSX/TSX — todo
   vía var(--...) o clases Tailwind mapeadas a tokens; fuentes self-host
   con next/font. Componentes clave: hero, cards de soluciones, bloque
   de la tesis, visualización del camino de 4 niveles, sección Sé
   Trainer, franja institucional.
5. PÁGINAS: home (narrativa: transformación agéntica → tesis "desde
   adentro" → línea educativa), /soluciones, /desde-adentro,
   /desde-adentro/se-trainer, /nosotros, /contacto (formulario
   segmentado en 3 intenciones; integración simple: API route + email o
   webhook, sin backend nuevo).
6. SEO: metadata por página según T3.1, og:images, sitemap, robots.
7. QA: build sin errores, Lighthouse ≥90 en performance/SEO/a11y,
   responsive mobile-first verificado, links y CTAs funcionando.

ENTREGA: PRs chicos y temáticos (setup tokens → contenido → páginas
nuevas → QA), cada uno con descripción de qué cambió y screenshots.
```

---

### FASE 4 — Comercial

#### T4.1 · Materiales de venta

- **Objetivo:** one-pager y deck para la venta in-company.
- **Entregable:** one-pager PDF + deck de 10-12 slides.
- **Dependencias:** T0.1, T0.2, T3.1 (reutiliza copy). **Agente sugerido:** Claude con skills `pptx`/`pdf`.

**Prompt:**

```text
[Bloque de Contexto Común]

INPUT: posicionamiento (T0.1), pricing (T0.2), copy del sitio (T3.1).

TAREA: Creá los materiales de venta para el programa in-company.

1. ONE-PAGER (PDF, 1 carilla): para dejar tras una primera reunión con un
   gerente/dueño. Problema → programa de 4 niveles → el diferencial del
   inventario de oportunidades → track record (BM, BID, FAO, SAGyP +
   privados) → inversión desde [precio N1] → CTA.
2. DECK (10-12 slides): narrativa para reunión de venta: contexto de
   adopción de IA en LATAM (2-3 datos duros con fuente), costo de no
   actuar, el programa y su pedagogía, el camino educación→transformación,
   casos/credenciales, equipo, pricing, próximos pasos.

DISEÑO: sobrio corporativo alineado a la identidad de T3.2 si está
disponible; si no, tipografía limpia y paleta neutra + un acento.
FORMATO: archivos finales editables + PDF.
```

#### T4.2 · Funnel comercial y outbound

- **Objetivo:** proceso comercial documentado + secuencia de outbound para conseguir los primeros 3 pilotos.
- **Entregable:** playbook comercial + secuencia de emails/LinkedIn + criterios de calificación.
- **Dependencias:** T0.2, T4.1. **Agente sugerido:** Claude.

**Prompt:**

```text
[Bloque de Contexto Común]

TAREA: Diseñá el proceso comercial para vender los primeros 3 programas
piloto in-company en Argentina.

1. ICP: 3 perfiles priorizados de empresa (tamaño, industria — agro,
   banca/seguros, retail/industria —, señales de compra: contrató jefe de
   innovación, anunció proyectos de IA, etc.) y el buyer dentro de cada
   una (dueño/CEO en medianas; RRHH/Innovación en grandes).
2. OFERTA PILOTO: condiciones especiales para los primeros 3 (descuento a
   cambio de caso de éxito documentado y testimonios). Definir qué pide
   INNOV.AS a cambio.
3. SECUENCIA OUTBOUND: 4 touchpoints (email 1, LinkedIn, email 2,
   llamada) con textos completos, personalizables por [INDUSTRIA] y
   [SEÑAL]. Tono: par estratégico, no vendedor de cursos.
4. CALIFICACIÓN: checklist BANT adaptado + red flags (buscan "un curso
   barato de ChatGPT", no hay sponsor con poder, etc.).
5. MÉTRICAS DEL FUNNEL: contactados → reuniones → propuestas → cierres,
   con targets realistas para 90 días.

FORMATO: markdown, textos de outreach listos para usar.
```

#### T4.3 · Diseño del piloto

- **Objetivo:** definir el paquete piloto (alcance, métricas de éxito, condiciones) que valida el modelo completo en 60 días.
- **Entregable:** documento de diseño del piloto + template de acuerdo.
- **Dependencias:** T0.2, T1.2. **Agente sugerido:** Claude.

**Prompt:**

```text
[Bloque de Contexto Común]

TAREA: Diseñá el programa piloto que valida el modelo con el primer
cliente pago en 60 días.

1. ALCANCE: 1 cohorte de Nivel 1 (15-20 personas) + módulo de cierre
   ejecutivo donde se presenta el inventario de oportunidades al
   management. Duración total: 4-5 semanas.
2. MÉTRICAS DE ÉXITO (definir umbral por cada una): completion rate,
   NPS de alumnos, cantidad y calidad de oportunidades detectadas,
   % del management que acepta reunión de propuesta de transformación,
   conversión a proyecto de Línea B.
3. QUÉ SE VALIDA DEL MODELO: pedagogía mixta, template de oportunidades,
   disposición a pagar, y si el inventario realmente genera pipeline de
   transformación.
4. CONDICIONES COMERCIALES: precio piloto, contrapartidas (caso de éxito,
   testimonio, referidos), y qué NO incluye.
5. OPERACIÓN: quién facilita (los founders en el piloto — antes de tener
   trainers certificados), calendario tipo, checklist semanal.
6. DECISIÓN POST-PILOTO: criterios go/no-go/pivot explícitos.

FORMATO: markdown + template de acuerdo comercial marcado "borrador a
validar con abogado".
```

---

### FASE 5 — Institucionalización

#### T5.1 · Ingest al brain (wiki INNOV.AS)

- **Objetivo:** registrar la nueva línea de negocio en el company brain.
- **Entregable:** página nueva en `producto/` (o `comercial/`), index y log actualizados.
- **Dependencias:** T0.1 (para usar el nombre final). **Agente sugerido:** Claude en este mismo proyecto Cowork.

**Prompt:**

```text
TAREA: Ingestá al brain de INNOV.AS (carpeta brain/, leer BRAIN.md para
convenciones) la nueva línea de negocio de Educación IA + Transformación.

1. Leé brain/index.md y brain/BRAIN.md.
2. Creá la página producto/linea-educacion-ia.md con: qué es, modelo de
   dos líneas P&L, los 4 niveles + certificación de trainers, funnel
   educación→transformación, decisiones tomadas (tabla del documento
   maestro), estado y próximos hitos. Frontmatter y links [[...]] según
   convenciones.
3. Actualizá brain/index.md y agregá entrada en brain/log.md con formato
   "## [FECHA] ingest | Línea Educación IA".
4. Referenciá el documento maestro local:
   innov/estrategia-linea-educacion-ia.md.

Mostrá el resumen de cambios antes de escribir.
```

---

## 6. Riesgos y mitigaciones

| Riesgo | Prob. | Mitigación |
|---|---|---|
| Sobre-construcción antes de validar (patrón conocido) | Alta | Reglas de la sección 2; piloto pago en 60 días como gate para todo lo demás |
| Contenido curado en inglés no aterriza en audiencia LATAM no técnica | Media | Tareas y talleres 100% en español sobre casos propios; el async curado se acompaña con guías-puente en español |
| Calidad dispar de trainers externos daña la marca | Media | Founders facilitan el piloto; certificación con rúbrica + NPS por taller + recertificación. Trainers entran recién post-piloto |
| El inventario de oportunidades no convierte a proyectos (funnel roto) | Media | Métrica explícita en el piloto; módulo de cierre ejecutivo diseñado para la conversión |
| Canibalización o confusión con Plunkton | Baja | Separación documentada: Plunkton = producto SaaS conversacional; esta línea = servicios educación+transformación. Sin socios compartidos |
| Percepción "esquema piramidal" en el producto trainer | Baja | Copy de la página Sé Trainer transparente: admisión selectiva, control de calidad, relación contractual clara |

## 7. Métricas de la línea (primeros 6 meses)

- **Educación:** cohortes vendidas, revenue educación, margen por cohorte, completion rate, NPS alumnos, trainers certificados activos.
- **Funnel:** oportunidades detectadas por cohorte, % cohortes que generan reunión ejecutiva, conversión cohorte → proyecto de transformación.
- **Transformación:** pipeline generado ($), proyectos cerrados, revenue Línea B atribuible a Línea A.

## 8. Plan de los próximos 14 días

| Día | Acción | Tarea |
|---|---|---|
| 1–2 | Delegar T0.1 (naming/posicionamiento) y T1.1 (curaduría) en paralelo | T0.1, T1.1 |
| 3–4 | Revisar naming con Marcos y decidir. Delegar T0.2 (pricing) | T0.2 |
| 5–7 | Delegar T1.2 (syllabus N1-N2) y T2.1 (selección LMS) | T1.2, T2.1 |
| 8–10 | Delegar T3.1 (copy sitio) y T3.2 (dirección de arte). Pasar links de x.com al agente de T1.1 | T3.1, T3.2 |
| 11–12 | Revisar copy y arte. Delegar T3.3 (implementación web) y T4.1 (materiales venta) | T3.3, T4.1 |
| 13–14 | Delegar T4.2 (outbound) y armar lista de 20 empresas objetivo con Marcos. Ingest al brain | T4.2, T5.1 |

**Regla de secuencia:** T1.3, T1.4, T2.2 y T4.3 se delegan recién cuando hay señal comercial (primera reunión de venta agendada). Niveles 3-4 en detalle: recién post-piloto.

---

## Apéndice — Skills de Claude para el diseño del sitio

Búsqueda realizada (2026-07-05): no hay skills instalables adicionales específicas de identidad visual en el catálogo. Plan con lo disponible:

1. **`frontend-dev`** (instalada): usar en T3.3 para la implementación Next.js/Tailwind.
2. **`design:design-system-management`** (instalada): usar en T3.2 para formalizar tokens y componentes como sistema.
3. **`design:design-critique`** (instalada): pasar el sitio actual y los mockups nuevos por crítica estructurada — útil para objetivar por qué el diseño actual se siente genérico.
4. **Skill propia** (recomendado): una vez aprobada la dirección de arte de T3.2, usar `skill-creator` para crear un skill `innov-design-system` con los tokens, tipografías, componentes y reglas visuales de INNOV.AS. Así cualquier agente futuro (sitio, deck, one-pager, LMS branding) produce diseño consistente sin re-explicar la identidad. Mismo patrón que el UDS de ucrop.it.
