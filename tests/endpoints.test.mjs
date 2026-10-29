// Tests de integración contra el sitio corriendo: BASE_URL=http://localhost:3300 npm run test:endpoints
import { test } from "node:test"
import assert from "node:assert/strict"

const base = process.env.BASE_URL ?? "http://localhost:3300"
const get = (path, accept) => fetch(`${base}${path}`, { headers: accept ? { Accept: accept } : {} })
const varyHasAccept = (res) => (res.headers.get("vary") ?? "").toLowerCase().split(/\s*,\s*/).includes("accept")

test("home con Accept: text/markdown responde Markdown con Vary: Accept", async () => {
  const res = await get("/", "text/markdown")
  assert.equal(res.status, 200)
  assert.match(res.headers.get("content-type"), /^text\/markdown/)
  assert.ok(varyHasAccept(res), `Vary: ${res.headers.get("vary")}`)
  const body = await res.text()
  assert.match(body, /^# /)
  assert.ok(body.includes("https://innov.as/llms.txt"))
})

test("home con Accept: text/html sigue respondiendo HTML", async () => {
  const res = await get("/", "text/html")
  assert.equal(res.status, 200)
  assert.match(res.headers.get("content-type"), /^text\/html/)
  assert.match(await res.text(), /<html/)
})

test("el título del home es Empresa Coordinada con AI", async () => {
  const html = await (await get("/", "text/html")).text()
  assert.match(html, /<title>Empresa Coordinada con AI \| INNOV\.AS<\/title>/)
  assert.match(html, /<meta property="og:title" content="Empresa Coordinada con AI \| INNOV\.AS"/)
})

test("404 con Accept: text/markdown devuelve cuerpo Markdown", async () => {
  const res = await get("/__ruta-que-no-existe", "text/markdown")
  assert.equal(res.status, 404)
  assert.match(res.headers.get("content-type"), /^text\/markdown/)
  assert.ok(varyHasAccept(res))
  const body = await res.text()
  assert.ok(body.length >= 20)
  assert.ok(body.includes("https://innov.as/llms.txt"))
})

test("404 en HTML conserva el status 404 y la página de siempre", async () => {
  const res = await get("/__ruta-que-no-existe", "text/html")
  assert.equal(res.status, 404)
  assert.match(res.headers.get("content-type"), /^text\/html/)
})

test("páginas existentes no dan 404 al pedir Markdown", async () => {
  const res = await get("/central-ia", "text/markdown")
  assert.equal(res.status, 200)
})

test("Accept sin tipos soportados devuelve 406", async () => {
  const res = await get("/", "application/json")
  assert.equal(res.status, 406)
  assert.ok(varyHasAccept(res))
})

test("la navegación RSC de Next no se ve afectada", async () => {
  const res = await fetch(`${base}/central-ia`, { headers: { RSC: "1", Accept: "*/*" } })
  assert.equal(res.status, 200)
})

test("llms.txt y sitemap.xml se sirven igual", async () => {
  const llms = await get("/llms.txt", "text/markdown")
  assert.equal(llms.status, 200)
  assert.ok((await llms.text()).includes("## Cuándo usar INNOV.AS"))
  assert.equal((await get("/sitemap.xml")).status, 200)
})

test("el JSON-LD de Organization trae contactPoint y address", async () => {
  const html = await (await get("/", "text/html")).text()
  const blocks = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)].map((m) => JSON.parse(m[1]))
  const org = blocks.find((b) => b["@type"] === "Organization")
  assert.ok(org, "hay un bloque Organization")
  assert.equal(org.contactPoint["@type"], "ContactPoint")
  assert.ok(org.contactPoint.email && org.contactPoint.contactType)
  assert.equal(org.address["@type"], "PostalAddress")
  assert.equal(org.address.addressCountry, "AR")
})
