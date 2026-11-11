// Sin imports, para que node --test lo cargue directo (como lib/negotiation.ts).
export type HubspotMessageData = {
  empresa: string
  pais: string
  tamano: string
  usoIA: string
  consulta?: string
}

// Las etiquetas quedan en español: son para el equipo que lee el CRM, sin importar el idioma del sitio.
export function buildHubspotMessage(data: HubspotMessageData, locale: string): string {
  return [
    `Idioma del sitio: ${locale}`,
    `Empresa: ${data.empresa}`,
    `País: ${data.pais}`,
    `Tamaño: ${data.tamano}`,
    `IA que usan hoy: ${data.usoIA}`,
    data.consulta,
  ]
    .filter(Boolean)
    .join("\n")
}
