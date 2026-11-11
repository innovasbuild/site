import { test } from "node:test"
import assert from "node:assert/strict"
import { buildHubspotMessage } from "../lib/hubspot-message.ts"

const data = { empresa: "Acme", pais: "Chile", tamano: "50-200", usoIA: "ChatGPT", consulta: "Hola" }
const base = ["Empresa: Acme", "País: Chile", "Tamaño: 50-200", "IA que usan hoy: ChatGPT", "Hola"]

for (const locale of ["es", "en"]) {
  test(`buildHubspotMessage: incluye el idioma del sitio (${locale}) y conserva las líneas existentes`, () => {
    assert.equal(buildHubspotMessage(data, locale), [`Idioma del sitio: ${locale}`, ...base].join("\n"))
  })
}

test("buildHubspotMessage: sin consulta no deja línea vacía", () => {
  assert.equal(buildHubspotMessage({ ...data, consulta: "" }, "en"), ["Idioma del sitio: en", ...base.slice(0, 4)].join("\n"))
})
