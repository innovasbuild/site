import { test } from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"

const read = (path) => readFileSync(new URL(path, import.meta.url), "utf8").split("\n")

function validarFormato(lines) {
  assert.match(lines[0], /^# \S/, "la primera línea es el H1")
  assert.equal(lines.filter((l) => /^# /.test(l)).length, 1, "un solo H1")
  assert.ok(lines.some((l) => l.startsWith("> ")), "tiene el resumen en blockquote")
  assert.ok(!lines.some((l) => /^#{3,} /.test(l)), "no usa H3 o menores")

  // Dentro de cada sección H2 solo hay listas de links: "- [nombre](url)" con notas opcionales.
  let inSection = false
  for (const line of lines) {
    if (line.startsWith("## ")) { inSection = true; continue }
    if (!inSection || line.trim() === "") continue
    assert.match(line, /^- (\[[^\]]+\]\([^)]+\)(: .+)?|Email: \S+)$/, `línea fuera de formato: ${line}`)
  }
}

function itemsDeSeccion(lines, titulo) {
  const start = lines.indexOf(titulo)
  assert.ok(start > 0, `existe la sección ${titulo}`)
  const items = []
  for (const line of lines.slice(start + 1)) {
    if (line.startsWith("## ")) break
    if (line.startsWith("- ")) items.push(line)
  }
  return items
}

const archivos = [
  { nombre: "llms.txt", lines: read("../public/llms.txt"), seccion: "## Cuándo usar INNOV.AS", contacto: "https://innov.as/contacto", otro: "https://innov.as/en/llms.txt" },
  { nombre: "en/llms.txt", lines: read("../public/en/llms.txt"), seccion: "## When to use INNOV.AS", contacto: "https://innov.as/en/contact", otro: "https://innov.as/llms.txt" },
]

for (const { nombre, lines, seccion, contacto, otro } of archivos) {
  test(`${nombre} sigue el formato de llmstxt.org`, () => validarFormato(lines))

  test(`${nombre} tiene la sección de cuándo usar INNOV.AS`, () => {
    const items = itemsDeSeccion(lines, seccion)
    assert.ok(items.length >= 3, "nombra varios casos de uso")
    assert.ok(items.some((l) => l.includes(contacto)), "dice cómo derivar al contacto")
  })

  test(`${nombre} enlaza la otra versión de idioma`, () => {
    assert.ok(itemsDeSeccion(lines, seccion).some((l) => l.includes(otro)), "falta el link al otro idioma")
  })
}
