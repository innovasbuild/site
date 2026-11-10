// Tests de integración contra el sitio corriendo: BASE_URL=http://localhost:3300 pnpm test:endpoints
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

const manual = (path, headers = {}) => fetch(`${base}${path}`, { redirect: "manual", headers })
const EN = { "Accept-Language": "en-US" }
const htmlLang = (html) => html.match(/<html[^>]*\slang="([^"]*)"/)?.[1]

test("/servicios responde 200 con lang es y /en/services con lang en", async () => {
  const es = await manual("/servicios")
  assert.equal(es.status, 200)
  assert.equal(htmlLang(await es.text()), "es")
  const en = await manual("/en/services", EN)
  assert.equal(en.status, 200)
  assert.equal(htmlLang(await en.text()), "en")
})

test("las URLs no canónicas redirigen con 308", async () => {
  const a = await manual("/es/servicios")
  assert.equal(a.status, 308)
  assert.equal(new URL(a.headers.get("location"), base).pathname, "/servicios")
  const b = await manual("/en/servicios")
  assert.equal(b.status, 308)
  assert.equal(new URL(b.headers.get("location"), base).pathname, "/en/services")
})

test("el 404 usa el layout de su idioma", async () => {
  const es = await manual("/foo")
  assert.equal(es.status, 404)
  assert.equal(htmlLang(await es.text()), "es")
  const en = await manual("/en/foo", EN)
  assert.equal(en.status, 404)
  assert.equal(htmlLang(await en.text()), "en")
})

test("404 en inglés con Accept: text/markdown devuelve Markdown", async () => {
  const res = await manual("/en/foo", { Accept: "text/markdown" })
  assert.equal(res.status, 404)
  assert.match(res.headers.get("content-type"), /^text\/markdown/)
})

test("/servicios con Accept-Language en-US redirige (307) a /en/services", async () => {
  const res = await manual("/servicios", EN)
  assert.equal(res.status, 307)
  assert.equal(new URL(res.headers.get("location"), base).pathname, "/en/services")
})

test("/servicios sin Accept-Language responde 200 en español", async () => {
  const res = await manual("/servicios")
  assert.equal(res.status, 200)
  assert.equal(htmlLang(await res.text()), "es")
})

test("un bot (Googlebot) nunca es redirigido", async () => {
  const res = await manual("/servicios", { ...EN, "User-Agent": "Googlebot/2.1 (+http://www.google.com/bot.html)" })
  assert.equal(res.status, 200)
  assert.equal(htmlLang(await res.text()), "es")
})

test("un agente que pide Markdown nunca es redirigido, aunque prefiera inglés", async () => {
  const res = await manual("/servicios", { ...EN, Accept: "text/markdown" })
  assert.ok(![307, 308].includes(res.status), `status ${res.status}`)
  assert.equal(res.headers.get("location"), null)
})

test("la cookie lang=es gana sobre Accept-Language en-US", async () => {
  const res = await manual("/servicios", { ...EN, Cookie: "lang=es" })
  assert.equal(res.status, 200)
})

test("/en/services con cookie lang=es redirige (307) a /servicios", async () => {
  const res = await manual("/en/services", { Cookie: "lang=es" })
  assert.equal(res.status, 307)
  assert.equal(new URL(res.headers.get("location"), base).pathname, "/servicios")
})

test("/cuentas/lagomarsino no redirige con Accept-Language en-US", async () => {
  const res = await manual("/cuentas/lagomarsino", EN)
  assert.ok(![307, 308].includes(res.status), `status ${res.status}`)
  assert.equal(res.headers.get("location"), null)
})

test("/en con Accept: text/markdown responde Markdown en inglés con AI Central", async () => {
  const res = await manual("/en", { Accept: "text/markdown" })
  assert.equal(res.status, 200)
  assert.match(res.headers.get("content-type"), /^text\/markdown/)
  assert.ok((await res.text()).includes("AI Central"))
})

test("/servicios: canonical, alternates es/en/x-default, html lang=es e indexable", async () => {
  const html = await (await get("/servicios", "text/html")).text()
  assert.match(html, /<html lang="es"/)
  assert.match(html, /<link rel="canonical" href="https:\/\/innov\.as\/servicios"/)
  assert.match(html, /<link rel="alternate" hrefLang="en" href="https:\/\/innov\.as\/en\/services"/i)
  assert.match(html, /<link rel="alternate" hrefLang="x-default" href="https:\/\/innov\.as\/servicios"/i)
  assert.doesNotMatch(html, /name="robots" content="noindex/)
  assert.match(html, /property="og:locale" content="es_419"/)
})

test("/en/services: canonical propio, indexable y alternates", async () => {
  const html = await (await manual("/en/services", EN)).text()
  assert.match(html, /<html lang="en"/)
  assert.match(html, /<link rel="canonical" href="https:\/\/innov\.as\/en\/services"/)
  assert.match(html, /<link rel="alternate" hrefLang="es" href="https:\/\/innov\.as\/servicios"/i)
  assert.doesNotMatch(html, /name="robots" content="noindex/)
  assert.match(html, /property="og:locale" content="en_US"/)
})

test("/en: el JSON-LD usa el producto AI Central", async () => {
  const html = await (await manual("/en", EN)).text()
  assert.match(html, /"name":"AI Central"/)
  assert.doesNotMatch(html, /Central IA/)
})

test("sitemap.xml lista las URLs en ambos idiomas y deja afuera /precios", async () => {
  const xml = await (await get("/sitemap.xml")).text()
  assert.match(xml, /<loc>https:\/\/innov\.as\/servicios<\/loc>/)
  assert.match(xml, /<loc>https:\/\/innov\.as\/en\/services<\/loc>/)
  assert.doesNotMatch(xml, /precios|\/en\/pricing/)
})
