import { test } from "node:test"
import assert from "node:assert/strict"
import { negotiate } from "../lib/negotiation.ts"

test("sin Accept o con Accept vacío sirve HTML", () => {
  assert.equal(negotiate(null), "html")
  assert.equal(negotiate(""), "html")
})

test("Accept: text/markdown sirve Markdown", () => {
  assert.equal(negotiate("text/markdown"), "markdown")
})

test("el Accept típico de un navegador sirve HTML", () => {
  const chrome = "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8"
  assert.equal(negotiate(chrome), "html")
  assert.equal(negotiate("text/html"), "html")
  assert.equal(negotiate("*/*"), "html")
})

test("respeta las q-values", () => {
  assert.equal(negotiate("text/html;q=0.5, text/markdown"), "markdown")
  assert.equal(negotiate("text/markdown;q=0.5, text/html"), "html")
  assert.equal(negotiate("text/markdown, */*;q=0.8"), "markdown")
  assert.equal(negotiate("text/markdown;q=0, text/html"), "html")
})

test("empate entre Markdown explícito y HTML: Markdown", () => {
  assert.equal(negotiate("text/markdown, text/html"), "markdown")
  assert.equal(negotiate("text/html, text/markdown"), "markdown")
})

test("el rango más específico define la q", () => {
  assert.equal(negotiate("text/*;q=0.2, text/markdown;q=0.9"), "markdown")
  assert.equal(negotiate("text/markdown;q=0.3, text/*"), "html")
})

test("sin tipos aceptables devuelve none (406)", () => {
  assert.equal(negotiate("application/json"), "none")
  assert.equal(negotiate("text/html;q=0, text/markdown;q=0"), "none")
})
