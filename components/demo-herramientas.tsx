"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useAnimate } from "framer-motion"
import { ArrowUp, Building2, Check, Inbox, LoaderCircle, Mail, MapPin, Plus, Send, Upload, UserSearch, type LucideIcon } from "lucide-react"
import {
  CabeceraProducto,
  Cursor,
  Disposicion,
  Marco,
  Pasos,
  ayudasDeGuion,
  correrGuion,
  useEscenario,
} from "@/components/demo-escenario"
import { cn } from "@/lib/utils"
import { demoHerramientas as d } from "@/content/central-ia"

/**
 * Demo animada de herramientas, armada sobre las pantallas "Chat · Nuevo chat · Outreach" del diseño del producto
 * (pen.dev), con su tipografía (Geist) y sus tamaños. Se ve lo que Outreach puede hacer con las herramientas
 * conectadas; el cursor entra a "Mis cuentas", conecta Apollo y, al volver, aparece la capacidad nueva.
 * Corre solo mientras está en pantalla. Con movimiento reducido queda quieta con Apollo ya conectado.
 */

const MEDIDAS = {
  completa: { w: 900, h: 600 },
  compacta: { w: 390, h: 700 },
}

const ICONOS: Record<string, LucideIcon> = {
  upload: Upload,
  building: Building2,
  "map-pin": MapPin,
  mail: Mail,
  inbox: Inbox,
  "user-search": UserSearch,
}

type Fase = "outreach" | "cuentas"
type Apollo = "no" | "conectando" | "si"

const INICIO = {
  fase: "outreach" as Fase,
  filas: 0,
  apollo: "no" as Apollo,
  paso: -1,
  presionado: null as null | "link" | "conectar" | "outreach",
}

export function DemoHerramientas({ className }: { className?: string }) {
  const esc = useEscenario(MEDIDAS)
  const { escenarioRef, reducir, enPantalla, medido, completa, w, h } = esc
  const listaRef = useRef<HTMLDivElement>(null)
  const linkRef = useRef<HTMLSpanElement>(null)
  const conectarRef = useRef<HTMLDivElement>(null)
  const outreachRef = useRef<HTMLSpanElement>(null)
  const [cursorRef, animarCursor] = useAnimate<HTMLDivElement>()

  const [s, setS] = useState(INICIO)
  const [clics, setClics] = useState(0)
  const [visible, setVisible] = useState(true)

  // Con movimiento reducido: Outreach con Apollo ya conectado, quieto.
  useEffect(() => {
    if (!reducir) return
    setS({ ...INICIO, filas: d.capacidades.length + 1, apollo: "si", paso: 2 })
  }, [reducir])

  useEffect(() => {
    if (reducir || !enPantalla || !medido) return
    let vivo = true
    const { esperar, centro, mover, ubicar, ocultar } = ayudasDeGuion({
      vivo: () => vivo,
      escenario: () => escenarioRef.current,
      w,
      animar: (valores, transicion) => animarCursor(cursorRef.current, valores, transicion),
    })
    const actualizar = (cambios: Partial<typeof INICIO>) => vivo && setS((prev) => ({ ...prev, ...cambios }))
    const clic = async (sobre: (typeof INICIO)["presionado"] = null) => {
      setClics((c) => c + 1)
      actualizar({ presionado: sobre })
      await esperar(160)
      actualizar({ presionado: null })
    }

    async function guion() {
      while (vivo) {
        setS(INICIO)
        await ubicar({ x: w * 0.7, y: h + 40, opacity: 1 })
        setVisible(true)

        // 1 · Lo que ya usás, adentro
        actualizar({ paso: 0 })
        for (let i = 1; i <= d.capacidades.length; i++) {
          await esperar(170)
          actualizar({ filas: i })
        }
        const lista = centro(listaRef.current)
        await mover({ x: lista.x - 120, y: lista.y - 30 }, 1)
        await mover({ x: lista.x + 140, y: lista.y + 30 }, 1.3)
        await esperar(500)

        // 2 · Cada uno, su cuenta
        actualizar({ paso: 1 })
        await mover(centro(linkRef.current), 0.9)
        await clic("link")
        actualizar({ fase: "cuentas" })
        await esperar(1300)
        await mover(centro(conectarRef.current), 1)
        await clic("conectar")
        actualizar({ apollo: "conectando" })
        await esperar(1100)
        actualizar({ apollo: "si" })
        await esperar(1200)

        // 3 · Suma lo que podés hacer
        actualizar({ paso: 2 })
        if (outreachRef.current) {
          await mover(centro(outreachRef.current), 1)
          await clic("outreach")
        } else {
          await mover({ x: w * 0.8, y: h * 0.4 }, 0.8)
        }
        actualizar({ fase: "outreach", filas: d.capacidades.length + 1 })
        await esperar(500)
        await mover({ x: w * 0.82, y: h * 0.7 }, 1)
        await esperar(3600)

        ocultar()
        setVisible(false)
        await esperar(600)
      }
    }

    correrGuion(guion, () => vivo)
    return () => {
      vivo = false
      setS(INICIO)
      setVisible(true)
    }
  }, [reducir, enPantalla, medido, w, h, animarCursor, cursorRef, escenarioRef])

  return (
    <Disposicion className={className} pasos={<Pasos pasos={d.pasos} actual={s.paso} />}>
      <Marco esc={esc} label={d.label}>
        <div className="flex h-full flex-col overflow-hidden rounded-[14px] border border-line bg-[#F7F4ED] text-[#1C1C1C] shadow-[0_24px_60px_-28px_rgba(21,25,26,0.4)]">
          <CabeceraProducto completa={completa} iniciales={d.usuario.iniciales} outreachRef={outreachRef} />
          <motion.div
            className={cn("flex min-h-0 flex-1 justify-center", completa ? "px-10 pt-10" : "px-4 pt-7")}
            animate={{ opacity: visible ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-full max-w-[640px]">
              <AnimatePresence mode="wait" initial={false}>
                {s.fase === "outreach" ? (
                  <motion.div
                    key="outreach"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col"
                  >
                    <p className="text-center text-[30px] font-semibold tracking-[-0.75px]">{d.bienvenida}</p>
                    <Compositor />
                    <p className="mt-7 text-[13px] font-semibold">{d.capacidadesTitulo}</p>
                    <div ref={listaRef} className={cn("mt-3 grid gap-x-6 gap-y-1", completa && "grid-cols-2")}>
                      {s.apollo === "si" && (
                        <Capacidad icono={d.nueva.icono} texto={d.nueva.texto} detalle={d.nueva.detalle} marca={d.nueva.marca} />
                      )}
                      {d.capacidades.slice(0, Math.min(s.filas, d.capacidades.length)).map((c) => (
                        <Capacidad key={c.texto} icono={c.icono} texto={c.texto} />
                      ))}
                    </div>
                    {s.apollo !== "si" && s.filas >= d.capacidades.length && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-4 flex items-start gap-3 rounded-md bg-[#F4F2EC] px-4 py-3 text-[13px] leading-[1.5] text-[#5F5F5D]"
                      >
                        <UserSearch className="mt-0.5 size-4 shrink-0" />
                        <p>
                          {d.aviso}{" "}
                          <motion.span
                            ref={linkRef}
                            animate={{ scale: s.presionado === "link" ? 0.95 : 1 }}
                            className="inline-block font-medium text-teal"
                          >
                            {d.avisoLink}
                          </motion.span>
                        </p>
                      </motion.div>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="cuentas"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col gap-5"
                  >
                    <div className="flex flex-col gap-2">
                      <p className="text-[30px] leading-none font-semibold tracking-[-0.75px]">{d.cuentas.titulo}</p>
                      <p className="text-[14px] leading-[1.5] text-[#5F5F5D]">{d.cuentas.bajada}</p>
                    </div>
                    <div className="overflow-hidden rounded-xl border border-[#ECEAE4] bg-[#FCFBF8]">
                      {d.cuentas.lista.map((c, i) => {
                        const Icono = ICONOS[c.icono]
                        const estado: Apollo = c.conectada ? "si" : s.apollo
                        return (
                          <motion.div
                            key={c.nombre}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.35, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                            className={cn("flex items-center gap-3 px-4 py-3", i > 0 && "border-t border-[#ECEAE4]")}
                          >
                            <span className="grid size-9 shrink-0 place-items-center rounded-md bg-[#1C1C1C]/[0.04]">
                              <Icono className="size-4 text-[#5F5F5D]" />
                            </span>
                            <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                              <p className="text-[14px] font-medium">{c.nombre}</p>
                              <p className="truncate text-[12px] text-[#5F5F5D]">{c.detalle}</p>
                            </div>
                            {estado === "si" ? (
                              <span className="flex shrink-0 items-center gap-1 text-[12px] text-teal">
                                <Check className="size-3.5" strokeWidth={2.5} /> {d.cuentas.conectada}
                              </span>
                            ) : (
                              <motion.div
                                ref={conectarRef}
                                animate={{ scale: s.presionado === "conectar" ? 0.94 : 1 }}
                                transition={{ duration: 0.12 }}
                                className="flex h-8 shrink-0 items-center gap-1.5 rounded-md border border-[#1C1C1C]/20 px-3 text-[13px]"
                              >
                                {estado === "conectando" && <LoaderCircle className="size-3.5 animate-spin text-[#5F5F5D]" />}
                                {estado === "conectando" ? d.cuentas.conectando : d.cuentas.conectar}
                              </motion.div>
                            )}
                          </motion.div>
                        )
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        <div ref={cursorRef} className="pointer-events-none absolute top-0 left-0 opacity-0">
          <Cursor clics={clics} />
        </div>
      </Marco>
    </Disposicion>
  )
}

function Capacidad({ icono, texto, detalle, marca }: { icono: string; texto: string; detalle?: string; marca?: string }) {
  const Icono = ICONOS[icono]
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={cn("flex items-start gap-3 rounded-md px-2 py-2", marca && "bg-teal/[0.07]")}
    >
      <Icono className={cn("mt-0.5 size-4 shrink-0", marca ? "text-teal" : "text-[#5F5F5D]")} />
      <div className="flex flex-col gap-0.5">
        <p className="text-[14px] leading-[1.4]">
          {texto}
          {marca && <span className="ml-2 rounded-full bg-teal px-1.5 py-px text-[11px] font-medium text-on-brand">{marca}</span>}
        </p>
        {detalle && <p className="text-[12px] text-[#5F5F5D]">{detalle}</p>}
      </div>
    </motion.div>
  )
}

/** El compositor del chat, quieto: en esta demo no se escribe. */
function Compositor() {
  return (
    <div className="mt-6 rounded-[20px] border border-[#1C1C1C]/20 bg-[#FCFBF8] p-4">
      <p className="min-h-[24px] text-[16px] leading-[1.5] text-[#5F5F5D]">{d.placeholder}</p>
      <div className="mt-3 flex items-center gap-2">
        <span className="grid size-8 place-items-center rounded-md border border-[#1C1C1C]/20">
          <Plus className="size-4" />
        </span>
        <span className="flex h-8 items-center gap-1.5 rounded-md bg-[#1C1C1C]/[0.04] px-2.5 text-[14px]">
          <Send className="size-4 text-[#5F5F5D]" />
          {d.agente}
        </span>
        <span className="ml-auto grid size-8 place-items-center rounded-full bg-teal/40 text-on-brand">
          <ArrowUp className="size-4" />
        </span>
      </div>
    </div>
  )
}
