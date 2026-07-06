import type { Cta } from "./types"

export const hero = {
  eyebrow: "// desde adentro ──→ adopción",
  title: "La IA no se implementa. Se adopta desde adentro.",
  subhead:
    "Desde Adentro es el programa de adopción de IA de INNOV.AS: formamos a tus equipos en 4 niveles mientras tu propia gente releva las oportunidades de automatización de la empresa. No es un curso — al final tenés capacidades instaladas y un roadmap para actuar.",
  ctaPrimary: { label: "Quiero este programa en mi empresa", href: "/contacto" } as Cta,
}

export const notACourse = {
  kicker: { index: "01", label: "no es un curso" },
  title: "Los cursos entregan diplomas. Desde Adentro entrega un roadmap.",
  body: "Cada participante trabaja sobre procesos reales de tu empresa desde la primera semana. Las tareas del programa no son ejercicios de laboratorio: son relevamientos de oportunidades — qué proceso duele, cuánto cuesta, cómo se resolvería con IA o automatización.",
  closing:
    "Al cierre de cada cohorte, el management recibe el Inventario de Oportunidades: el mapa de automatización de la empresa, priorizado por impacto y esfuerzo, hecho por la gente que conoce los procesos porque los sufre todos los días.",
  cycle: [
    { step: "Aprendé", description: "contenido curado a tu ritmo en nuestra plataforma." },
    { step: "Aplicá", description: "usá IA sobre un caso real de tu área y documentá la oportunidad." },
    {
      step: "Discutí",
      description: "taller en vivo con un trainer certificado: las mejores soluciones se debaten entre pares.",
    },
  ],
}

export const levels = {
  kicker: { index: "02", label: "de usuario a orquestador" },
  title: "El camino: de usuario a orquestador",
  items: [
    {
      label: "estado 01",
      title: "Fundamentos",
      duration: "3–4 semanas · toda la empresa",
      outcome:
        "Tu equipo entiende qué puede y qué no puede hacer la IA generativa, y la usa a diario con criterio y seguridad. Sin humo: práctica desde el primer día.",
    },
    {
      label: "estado 02",
      title: "Usuario Avanzado",
      duration: "4–5 semanas · analistas y mandos medios",
      outcome:
        "Prompting estructurado, asistentes configurados para su rol, IA integrada al flujo de trabajo real. Acá se multiplica la productividad individual.",
    },
    {
      label: "estado 03",
      title: "Builder",
      duration: "6 semanas · perfiles técnicos y de operaciones",
      outcome: "Automatizaciones e integraciones sin ser developer: workflows, APIs, primeros agentes. Tu gente empieza a construir.",
    },
    {
      label: "estado 04",
      title: "Orquestador",
      duration: "6–8 semanas · champions y líderes de cambio",
      outcome:
        "Sistemas de agentes, rediseño de procesos, gobernanza y métricas de adopción. Los que van a liderar la transformación desde adentro.",
    },
  ],
  footnote:
    "Los niveles 1 y 2 forman la base de toda la organización; los niveles 3 y 4 se activan con los perfiles que el propio programa revela.",
}

export const executiveClose = {
  kicker: { index: "03", label: "el cierre ejecutivo" },
  title: "Termina la cohorte, empieza la transformación",
  body: "La última sesión no es una entrega de certificados: es una reunión de trabajo con tu management donde presentamos el Inventario de Oportunidades consolidado — con impacto estimado, esfuerzo y quick wins identificados. Qué hacer con ese mapa es tu decisión; si querés ejecutarlo, somos el mismo equipo que construye las soluciones.",
}

export const whyInnovas = {
  kicker: { index: "04", label: "por qué innov.as" },
  title: "Formamos con la autoridad de quien ejecuta",
  body: "No somos una academia que da cursos de herramientas. Somos una firma que lleva años construyendo plataformas y automatización para Banco Mundial, BID, FAO y empresas de la región — y esa experiencia es el programa. Los trainers se certifican en nuestra metodología y facilitan con control de calidad continuo.",
}

export const finalCta = {
  ctaPrimary: { label: "Quiero este programa en mi empresa", href: "/contacto" } as Cta,
  ctaSecondary: { label: "¿Querés ser trainer? →", href: "/desde-adentro/se-trainer" } as Cta,
}
