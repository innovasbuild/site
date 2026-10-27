export interface FaqItem {
  question: string
  answer: string
}

export const faqProducto: FaqItem[] = [
  {
    question: "Ya pagamos licencias de ChatGPT o Claude. Central IA las reemplaza?",
    answer:
      "Las aprovecha. La licencia le da un asistente a cada persona. Central IA le da a la empresa un conocimiento compartido, permisos y agentes, y cada persona los usa desde el asistente que ya tiene.",
  },
  {
    question: "Necesito contratarlos para usar Central IA?",
    answer:
      "No. Creás la cuenta de tu empresa y la usan solos. Si querés que la implementemos con vos, es el plan Empresa: relevamos tu método, armamos el Brain y los agentes, y la operamos con tu equipo.",
  },
  {
    question: "Dónde queda la información de mi empresa?",
    answer:
      "En un espacio propio de tu empresa dentro de Central IA, aislado del de las demás. Los modelos de IA trabajan sin ver credenciales.",
  },
  {
    question: "Cómo entra mi gente?",
    answer:
      "Con el correo de la empresa: por invitación, o abierto a quien tenga un correo verificado de tu dominio. El ingreso es con la cuenta de Microsoft o de Google de la empresa, o con un link que llega por mail.",
  },
  {
    question: "Cuánto cuesta?",
    answer:
      "Se paga por usuario, y el uso de IA dentro de la plataforma se paga por consumo. Si la implementamos con vos, cada ola se cotiza con alcance cerrado antes de empezar.",
  },
]

/** Preguntas del home: arrancan por el trabajo con el equipo y después la plataforma. */
export const faqHome: FaqItem[] = [
  {
    question: "Cómo arranca el trabajo con ustedes?",
    answer:
      "Con una conversación de 30 minutos. Si tiene sentido seguir, hacemos el Radar: tres a cuatro horas con tu equipo directivo y un informe con el método relevado, las oportunidades y un plan a dos años.",
  },
  {
    question: "Qué pasa si frenamos después del Radar?",
    answer:
      "Te quedás con el informe: el método de tu empresa relevado, los puntos de dolor, las oportunidades y el plan a dos años. Sirve aunque la decisión sea frenar ahí.",
  },
  {
    question: "Ya pagamos licencias de ChatGPT o Claude. Central IA las reemplaza?",
    answer:
      "Las aprovecha. La licencia le da un asistente a cada persona. Central IA le da a la empresa un conocimiento compartido, permisos y agentes, y cada persona los usa desde el asistente que ya tiene.",
  },
  {
    question: "Dónde queda la información de mi empresa?",
    answer:
      "En un espacio propio de tu empresa dentro de Central IA, aislado del de las demás. Los modelos de IA trabajan sin ver credenciales.",
  },
  {
    question: "Cuánto cuesta?",
    answer:
      "El Radar tiene precio fijo y se bonifica al implementar la ola cero. Cada ola se cotiza con alcance cerrado antes de empezar. La plataforma se paga por usuario, y el uso de IA, por consumo.",
  },
]

export const faqMetodo: FaqItem[] = [
  {
    question: "Qué necesitamos de nuestro lado para implementar?",
    answer:
      "Quien conduce la empresa en la mesa, una persona de sistemas como interlocutor y un grupo chico del área por la que se empieza.",
  },
  {
    question: "Qué diferencia hay entre el Radar y el Mapa del Método?",
    answer:
      "El Radar dimensiona la ola cero y traza un plan a dos años en pocas horas de tu equipo directivo. El Mapa del Método entra en cada área del negocio y define en detalle el alcance de las olas trimestrales para toda la empresa. Se bonifica al implementar la ola cero y la ola uno.",
  },
  {
    question: "Qué pasa si frenamos después del Radar?",
    answer:
      "Te quedás con el informe: el método de tu empresa relevado, los puntos de dolor, las oportunidades y el plan a dos años. Sirve aunque la decisión sea frenar ahí.",
  },
  {
    question: "Cómo se elige el primer circuito de negocio?",
    answer:
      "Sale del Radar. Ponderamos cada oportunidad por su impacto en el negocio y por cuánto se repite la tarea, y arrancamos por la que mueve más y se repite más.",
  },
  {
    question: "Cuánto tiempo le pide a mi equipo?",
    answer:
      "En el Radar, tres a cuatro horas de reuniones con el equipo directivo. En la ola cero, un grupo chico del área elegida y una reunión de trabajo por semana.",
  },
]
