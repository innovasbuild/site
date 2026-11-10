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

  // Hasta que el inglés se escriba (Fase C, Task 8), en.ts reexporta es.
  test(
    `content/${modulo}/en.ts: los href internos empiezan con /en (o son /cuentas)`,
    { todo: "Fase C" },
    () => {
      const malos = hrefsInternos(join(ROOT, "content", modulo, "en.ts")).filter(
        (h) => !(h === "/en" || h.startsWith("/en/") || h.startsWith("/cuentas")),
      )
      assert.deepEqual(malos, [])
    },
  )
}
