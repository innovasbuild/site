import { test } from "node:test"
import assert from "node:assert/strict"
import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"

const ROOT = new URL("..", import.meta.url).pathname
const modulos = ["central-ia", "contacto", "faq", "global", "home", "imagenes", "nosotros", "precios", "proyectos", "seo", "servicios"]

const hrefsInternos = (archivo) =>
  [...readFileSync(archivo, "utf8").matchAll(/href:\s*"(\/[^"]*)"/g)].map((m) => m[1])

for (const modulo of modulos) {
  test(`content/${modulo} tiene es.ts, en.ts e index.ts`, () => {
    for (const f of ["es.ts", "en.ts", "index.ts"]) {
      assert.ok(existsSync(join(ROOT, "content", modulo, f)), `falta content/${modulo}/${f}`)
    }
  })

  test(`content/${modulo}/es.ts no tiene href internos bajo /en`, () => {
    const malos = hrefsInternos(join(ROOT, "content", modulo, "es.ts")).filter((h) => h === "/en" || h.startsWith("/en/"))
    assert.deepEqual(malos, [])
  })

  test(`content/${modulo}/en.ts: los href internos empiezan con /en (o son /cuentas)`, () => {
    const malos = hrefsInternos(join(ROOT, "content", modulo, "en.ts")).filter(
      (h) => !(h === "/en" || h.startsWith("/en/") || h.startsWith("/cuentas")),
    )
    assert.deepEqual(malos, [])
  })

  test(`content/${modulo}/en.ts está escrito, no reexporta es`, () => {
    const texto = readFileSync(join(ROOT, "content", modulo, "en.ts"), "utf8")
    assert.ok(!/export \* from "\.\/es"/.test(texto), "reexporta ./es")
  })

  test(`content/${modulo}/en.ts llama AI Central al producto`, () => {
    const texto = readFileSync(join(ROOT, "content", modulo, "en.ts"), "utf8")
    assert.ok(!/Central IA|Central AI/i.test(texto), "dice Central IA o Central AI")
  })
}

test("content/legal tiene es.ts, en.ts e index.ts, y el inglés no reexporta es", () => {
  for (const f of ["es.ts", "en.ts", "index.ts"]) assert.ok(existsSync(join(ROOT, "content/legal", f)), `falta content/legal/${f}`)
  const en = readFileSync(join(ROOT, "content/legal/en.ts"), "utf8")
  assert.ok(!/export \* from "\.\/es"/.test(en))
  assert.ok(!/Central IA|Central AI/i.test(en))
  assert.ok(!/prevalec|prevail|Spanish version (shall|will)/i.test(en), "el inglés no puede decir que el español prevalece")
})
