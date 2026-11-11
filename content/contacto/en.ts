export const hero = {
  eyebrow: "// contact → first conversation",
  title: "Let's start with a conversation",
  subhead: "Leave your details and we'll get back to you, or book an orientation call with our team directly.",
}

/** Orientation call. The booking URL (HubSpot Meetings) is in shared.ts. */
export const orientacion = {
  kicker: "orientation call",
  title: "Book an orientation call",
  lead: "30 minutes, free, with the team that does the implementation.",
  items: [
    "We walk through what it's like for a company to work with coordinated, governed AI.",
    "We show you, with practical examples from your company, how it would work.",
  ],
  cta: "Book an orientation call",
}

export const formTitle = "Write to us"

/** Form field labels. */
export const fields = {
  nombre: "Name",
  email: "Work email",
  empresa: "Company",
  pais: "Country",
  tamano: "How many people are in your company?",
  usoIA: "What AI do you use today?",
  consulta: "Anything you'd like to tell us up front (optional)",
  elige: "Choose an option",
  enviando: "Sending...",
}

export const tamanos = ["Up to 50 people", "50 to 200", "200 to 500", "More than 500"]
export const usosIA = ["ChatGPT licenses", "Claude licenses", "Copilot or other", "Personal accounts", "Nothing yet"]

/** Form validation messages. The schema is in index.ts. */
export const formErrors = {
  nombreRequerido: "Enter your name.",
  nombreLargo: "The name is too long.",
  emailInvalido: "Enter a valid email address.",
  emailLargo: "The email address is too long.",
  empresaRequerida: "Enter your company.",
  empresaLarga: "The company name is too long.",
  paisRequerido: "Enter your country.",
  paisLargo: "The country name is too long.",
  opcionRequerida: "Choose an option.",
  consultaLarga: "The message is too long.",
}

export const submitNote = "We only use your details to set up the conversation."
export const directEmailNote = "Prefer to write by email?"
