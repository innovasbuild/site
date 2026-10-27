"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Logo } from "@/components/logo"
import { navLinks, navCta } from "@/content/global"

/** Cuánto hay que bajar antes de que la barra pueda esconderse, y cuánto movimiento cuenta como un gesto. */
const BAJADA_MIN = 120
const GESTO = 6

/** Si lo que pasa por detrás de la barra es oscuro: busca el primer fondo opaco bajo su centro. */
function fondoOscuro(barra: HTMLElement, pincel: CanvasRenderingContext2D) {
  const r = barra.getBoundingClientRect()
  const debajo = document.elementsFromPoint(window.innerWidth / 2, r.top + r.height / 2)
  let el: Element | null = debajo.find((e) => !barra.closest("header")?.contains(e)) ?? document.body
  while (el) {
    // El color puede venir en rgb, oklab o color(srgb …): un píxel de canvas lo pasa a rgba.
    pincel.clearRect(0, 0, 1, 1)
    pincel.fillStyle = getComputedStyle(el).backgroundColor
    pincel.fillRect(0, 0, 1, 1)
    const [rr, gg, bb, aa] = pincel.getImageData(0, 0, 1, 1).data
    if (aa > 128) return 0.2126 * rr + 0.7152 * gg + 0.0722 * bb < 110
    el = el.parentElement
  }
  return false
}

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const headerRef = useRef<HTMLElement>(null)
  const barraRef = useRef<HTMLElement>(null)
  const [oculta, setOculta] = useState(false)
  // La barra es de vidrio y toma el tono de lo que tiene detrás: oscura sobre el hero, clara sobre papel.
  const [sobreOscuro, setSobreOscuro] = useState(true)
  // El cambio de tono se anima solo después de la primera lectura, para que al cargar no haya un fundido.
  const [tonoListo, setTonoListo] = useState(false)
  const menuAbierto = useRef(false)
  menuAbierto.current = isMobileMenuOpen

  // Alto de la barra (--alto-nav), para que un hero oscuro (.bajo-nav) pase por detrás de ella, y
  // visibilidad: al bajar se esconde y al subir, aunque sea un poco, vuelve a aparecer.
  useEffect(() => {
    const header = headerRef.current
    if (!header) return
    const medir = () => document.documentElement.style.setProperty("--alto-nav", `${header.offsetHeight}px`)
    let ultimo = window.scrollY
    const montada = performance.now()
    const alScrollear = () => {
      const y = window.scrollY
      // Al recargar, el navegador restaura la posición con un salto: eso no es un gesto de la persona.
      if (performance.now() - montada < 800) {
        ultimo = y
        return
      }
      const dy = y - ultimo
      if (y < BAJADA_MIN || dy < -GESTO) setOculta(false)
      else if (dy > GESTO && !menuAbierto.current) setOculta(true)
      if (Math.abs(dy) > GESTO) ultimo = y
    }
    medir()
    const ro = new ResizeObserver(medir)
    ro.observe(header)
    window.addEventListener("scroll", alScrollear, { passive: true })
    return () => {
      ro.disconnect()
      window.removeEventListener("scroll", alScrollear)
    }
  }, [])

  useEffect(() => {
    const barra = barraRef.current
    const pincel = document.createElement("canvas").getContext("2d", { willReadFrequently: true })
    if (!barra || !pincel) return
    let raf = 0
    const mirar = () => {
      raf = 0
      setSobreOscuro(fondoOscuro(barra, pincel))
    }
    const pedir = () => {
      if (!raf) raf = requestAnimationFrame(mirar)
    }
    mirar()
    const habilitar = requestAnimationFrame(() => setTonoListo(true))
    window.addEventListener("scroll", pedir, { passive: true })
    window.addEventListener("resize", pedir)
    return () => {
      cancelAnimationFrame(raf)
      cancelAnimationFrame(habilitar)
      window.removeEventListener("scroll", pedir)
      window.removeEventListener("resize", pedir)
    }
  }, [pathname])

  return (
    <header
      ref={headerRef}
      data-nav
      onFocusCapture={() => setOculta(false)}
      className={cn(
        "pointer-events-none sticky top-0 z-50 px-4 py-3 transition-transform duration-300 ease-out motion-reduce:transition-none md:px-6",
        oculta && "-translate-y-[130%]"
      )}
    >
      <div className="pointer-events-auto mx-auto max-w-7xl">
        <nav
          ref={barraRef}
          className={cn(
            "flex items-center justify-between rounded-full border py-2 pr-2 pl-6 backdrop-blur-xl backdrop-saturate-150 md:pl-7",
            tonoListo && "transition-colors duration-300",
            sobreOscuro
              ? "border-paper/10 bg-ink/40 shadow-[0_8px_24px_-14px_rgba(0,0,0,0.5)]"
              : "border-ink/10 bg-paper/55 shadow-[0_8px_24px_-16px_rgba(21,25,26,0.3)]"
          )}
        >
          <Link href="/" aria-label="INNOV.AS">
            <Logo className="h-7 w-auto" surface={sobreOscuro ? "dark" : "light"} />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden items-center gap-2 md:flex">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-3 text-sm font-medium transition-colors",
                    sobreOscuro ? "hover:text-teal-dark" : "hover:text-teal",
                    isActive ? (sobreOscuro ? "text-teal-dark" : "text-teal") : sobreOscuro ? "text-paper/80" : "text-ink/75"
                  )}
                >
                  {link.label}
                </Link>
              )
            })}
            <Link
              href={navCta.href}
              className={cn("ml-2 rounded-full px-5 py-2.5 text-sm font-bold text-on-brand transition-transform hover:-translate-y-0.5", sobreOscuro ? "bg-teal-ui-dark" : "bg-teal hover:shadow-teal")}
            >
              {navCta.label}
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className={cn("mr-3 md:hidden", sobreOscuro ? "text-paper" : "text-ink")}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Abrir menú"
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </nav>

        {isMobileMenuOpen && (
          <div className="mt-2 rounded-3xl border border-line bg-paper px-6 py-6 shadow-lg md:hidden">
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-medium text-ink hover:text-teal"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href={navCta.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-fit rounded-full bg-teal px-5 py-2 text-sm font-bold text-on-brand"
              >
                {navCta.label}
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
