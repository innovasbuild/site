import { test } from "node:test"
import assert from "node:assert/strict"
import { readdirSync, readFileSync, statSync, existsSync } from "node:fs"
import { join, relative } from "node:path"

const ROOT = new URL("..", import.meta.url).pathname

// Voseo rioplatense. Las palabras neutras parecidas (más, después, país, está, aquí) no entran.
const VOSEO =
  /\b(vos|sos|podés|querés|tenés|sabés|hacés|necesitás|creás|preferís|empezá|agendá|escribinos|contanos|dejanos|mirá|elegí|pedí|conocé|probá|sumate|hablá|dejá|completá|ingresá|descubrí|arrancá|fijate|abrís|acelerás|aceptás|actuás|aprobás|aprovechás|acá|cambiá|cambiás|completás|conectás|contratás|creá|debés|decidís|declarás|desconectás|elegís|encontrás|escribí|frenás|incluí|inscribís|llevás|pagás|pedís|quedás|respondé|usás|trabajás|contactanos|conocenos|armame)\b/i

function walk(dir, exts, out = []) {
  if (!existsSync(dir)) return out
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    if (statSync(p).isDirectory()) walk(p, exts, out)
    else if (exts.some((e) => p.endsWith(e))) out.push(p)
  }
  return out
}

const files = [
  ...walk(join(ROOT, "content"), [".ts"]).filter((f) => !/\/en\.ts$/.test(f)),
  ...walk(join(ROOT, "components"), [".tsx"]),
  ...walk(join(ROOT, "app"), [".tsx"]),
  join(ROOT, "lib/markdown.ts"),
  join(ROOT, "lib/schema.ts"),
  join(ROOT, "public/llms.txt"),
].filter((f) => existsSync(f) && !f.includes("/public/en/"))

const isComment = (l) => /^\s*(\/\/|\*|\/\*)/.test(l)

test("el sitio en español no usa voseo", () => {
  const hits = []
  for (const f of files) {
    readFileSync(f, "utf8")
      .split("\n")
      .forEach((line, i) => {
        if (isComment(line)) return
        const m = line.match(VOSEO)
        if (m) hits.push(`${relative(ROOT, f)}:${i + 1} "${m[0]}"`)
      })
  }
  assert.deepEqual(hits, [], `Voseo encontrado:\n${hits.join("\n")}`)
})
