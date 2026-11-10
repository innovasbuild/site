import { test } from "node:test"
import assert from "node:assert/strict"
import { routes, resolvePath, pathFor, counterpart, detectLocale, localeRedirect, EN_LIVE, LOCALE_COOKIE } from "../lib/i18n.ts"

test("resolvePath: URLs públicas a ruta interna", () => {
  assert.deepEqual(resolvePath("/servicios"), { locale: "es", key: "/servicios" })
  assert.deepEqual(resolvePath("/"), { locale: "es", key: "/" })
  assert.deepEqual(resolvePath("/en/services"), { locale: "en", key: "/servicios" })
  assert.deepEqual(resolvePath("/en"), { locale: "en", key: "/" })
})

test("resolvePath tolera la barra final", () => {
  assert.deepEqual(resolvePath("/servicios/"), { locale: "es", key: "/servicios" })
  assert.deepEqual(resolvePath("/en/"), { locale: "en", key: "/" })
  assert.deepEqual(resolvePath("/en/services/"), { locale: "en", key: "/servicios" })
})

test("resolvePath redirige /es/... y /en/<slug español>", () => {
  assert.deepEqual(resolvePath("/es/servicios"), { redirect: "/servicios" })
  assert.deepEqual(resolvePath("/es"), { redirect: "/" })
  assert.deepEqual(resolvePath("/en/servicios"), { redirect: "/en/services" })
})

test("resolvePath no redirige /es/... a destinos desconocidos ni externos", () => {
  for (const p of ["/es//evil.com", "/es/\\evil.com", "/es/foo", "/es/cuentas/x", "/es/es/servicios", "/es/en/services"]) {
    assert.equal(resolvePath(p), null, p)
  }
  assert.deepEqual(resolvePath("/es/servicios/"), { redirect: "/servicios" })
})

test("resolvePath devuelve null para rutas desconocidas y /cuentas", () => {
  assert.equal(resolvePath("/foo"), null)
  assert.equal(resolvePath("/cuentas/lagomarsino"), null)
  assert.equal(resolvePath("/enfoque"), null)
})

test("pathFor y counterpart", () => {
  assert.equal(pathFor("/", "en"), "/en")
  assert.equal(pathFor("/servicios", "es"), "/servicios")
  assert.equal(counterpart("/central-ia", "en"), "/en/ai-central")
  assert.equal(counterpart("/en/contact", "es"), "/contacto")
  assert.equal(counterpart("/foo", "en"), "/en")
  assert.equal(counterpart("/en/foo", "es"), "/")
})

test("cada ruta tiene es y en únicos, y en empieza con /en", () => {
  assert.equal(new Set(routes.map((r) => r.es)).size, routes.length)
  assert.equal(new Set(routes.map((r) => r.en)).size, routes.length)
  for (const r of routes) assert.ok(r.en.startsWith("/en"), r.en)
})

test("constantes", () => {
  assert.equal(typeof EN_LIVE, "boolean")
  assert.equal(LOCALE_COOKIE, "lang")
})

const live = { enLive: true }

test("detectLocale: cookie, Accept-Language y país", () => {
  assert.equal(detectLocale({ ...live, cookie: "en", acceptLanguage: "es" }), "en")
  assert.equal(detectLocale({ ...live, cookie: "es", acceptLanguage: "en-US" }), "es")
  assert.equal(detectLocale({ ...live, cookie: "fr", acceptLanguage: "es" }), "es")
  assert.equal(detectLocale({ ...live, acceptLanguage: "es-MX,en;q=0.5" }), "es")
  assert.equal(detectLocale({ ...live, acceptLanguage: "en-US" }), "en")
  assert.equal(detectLocale({ ...live, acceptLanguage: "pt-BR" }), "en")
  assert.equal(detectLocale({ ...live, acceptLanguage: "en;q=0.5,es;q=0.9" }), "es")
  assert.equal(detectLocale({ ...live, acceptLanguage: "*", country: "MX" }), "es")
  assert.equal(detectLocale({ ...live, country: "MX" }), "es")
  assert.equal(detectLocale({ ...live, country: "mx" }), "es")
  assert.equal(detectLocale({ ...live, country: "US" }), "en")
  assert.equal(detectLocale({ ...live }), "es")
})

test("detectLocale nunca redirige bots ni agentes", () => {
  for (const userAgent of ["Googlebot/2.1", "bingbot", "GPTBot/1.0", "ClaudeBot", "PerplexityBot", "OAI-SearchBot", "Applebot", "SomeCrawler"]) {
    assert.equal(detectLocale({ ...live, userAgent, acceptLanguage: "en-US" }), null, userAgent)
  }
  assert.equal(detectLocale({ ...live, accept: "text/markdown", acceptLanguage: "en-US" }), null)
  assert.equal(detectLocale({ ...live, accept: "text/html", acceptLanguage: "en-US", userAgent: "Mozilla/5.0" }), "en")
})

test("detectLocale con enLive false siempre es es", () => {
  assert.equal(detectLocale({ enLive: false, acceptLanguage: "en-US", country: "US" }), "es")
  assert.equal(detectLocale({ enLive: false, cookie: "en" }), "es")
})

test("localeRedirect: sin EN_LIVE nunca redirige", () => {
  const input = { enLive: false, cookie: "en", acceptLanguage: "en-US" }
  assert.equal(localeRedirect("/servicios", input), null)
  assert.equal(localeRedirect("/en/services", { enLive: false, cookie: "es" }), null)
})

test("localeRedirect: con EN_LIVE redirige en ambos sentidos", () => {
  assert.equal(localeRedirect("/servicios", { enLive: true, acceptLanguage: "en-US" }), "/en/services")
  assert.equal(localeRedirect("/en/services", { enLive: true, cookie: "es" }), "/servicios")
})

test("localeRedirect: bots y mismo idioma no redirigen", () => {
  assert.equal(localeRedirect("/servicios", { enLive: true, acceptLanguage: "en-US", userAgent: "Googlebot/2.1" }), null)
  assert.equal(localeRedirect("/servicios", { enLive: true, acceptLanguage: "es-AR" }), null)
  assert.equal(localeRedirect("/foo", { enLive: true, acceptLanguage: "en-US" }), null)
})
