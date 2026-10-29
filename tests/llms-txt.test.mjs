import { test } from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"

const text = readFileSync(new URL("../public/llms.txt", import.meta.url), "utf8")
const lines = text.split("\n")

test("llms.txt sigue el formato de llmstxt.org", () => {
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
})

test("llms.txt tiene la sección de cuándo usar INNOV.AS", () => {
  const start = lines.indexOf("## Cuándo usar INNOV.AS")
  assert.ok(start > 0, "existe la sección")
  const items = []
  for (const line of lines.slice(start + 1)) {
    if (line.startsWith("## ")) break
    if (line.startsWith("- ")) items.push(line)
  }
  assert.ok(items.length >= 3, "nombra varios casos de uso")
  assert.ok(items.some((l) => l.includes("https://innov.as/contacto")), "dice cómo derivar al contacto")
})
