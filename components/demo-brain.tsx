"use client"

import { Fragment, useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useAnimate } from "framer-motion"
import { ChevronDown, ChevronRight, Ellipsis } from "lucide-react"
import {
  correrGuion,
  CabeceraProducto,
  Cursor,
  Disposicion,
  Marco,
  Pasos,
  ayudasDeGuion,
  useEscenario,
} from "@/components/demo-escenario"
import { cn } from "@/lib/utils"
import { demoBrain as d } from "@/content/central-ia"

/**
 * Demo animada del Brain, armada sobre las pantallas "Brain · Índice" y "Brain · Página" del diseño del producto
 * (pen.dev), con su tipografía (Geist) y sus tamaños. Se ven las carpetas, el cursor busca y abre una página, y al
 * abrir el historial se ve qué cambió y quién lo cambió. En pantallas chicas usa una versión sin el árbol de la
 * izquierda. Corre solo mientras está en pantalla. Con movimiento reducido queda quieta en el historial.
 */

const MEDIDAS = {
  completa: { w: 900, h: 620 },
  compacta: { w: 390, h: 640 },
}

type Fase = "indice" | "resultados" | "pagina"

const INICIO = {
  fase: "indice" as Fase,
  filas: 0,
  tipeado: "",
  resultados: 0,
  historial: false,
  diff: false,
  paso: -1,
  presionado: null as null | "buscar" | "resultado" | "historial",
}

export function DemoBrain({ className }: { className?: string }) {
  const esc = useEscenario(MEDIDAS)
  const { escenarioRef, reducir, enPantalla, medido, completa, w, h } = esc
  const listaRef = useRef<HTMLDivElement>(null)
  const campoRef = useRef<HTMLDivElement>(null)
  const buscarRef = useRef<HTMLDivElement>(null)
  const resultadoRef = useRef<HTMLDivElement>(null)
  const historialRef = useRef<HTMLDivElement>(null)
  const versionRef = useRef<HTMLDivElement>(null)
  const [cursorRef, animarCursor] = useAnimate<HTMLDivElement>()

  const [s, setS] = useState(INICIO)
  const [clics, setClics] = useState(0)
  const [visible, setVisible] = useState(true)

  // Con movimiento reducido: la página con el historial abierto, quieta.
  useEffect(() => {
    if (!reducir) return
    setS({ ...INICIO, fase: "pagina", filas: d.carpetas.length, historial: true, diff: true, paso: 2 })
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
        await ubicar({ x: w * 0.75, y: h + 40, opacity: 1 })
        setVisible(true)

        // 1 · Todo en un lugar
        actualizar({ paso: 0 })
        for (let i = 1; i <= d.carpetas.length; i++) {
          await esperar(150)
          actualizar({ filas: i })
        }
        const lista = centro(listaRef.current)
        await mover({ x: lista.x + 60, y: lista.y - 90 }, 1)
        await mover({ x: lista.x + 40, y: lista.y + 70 }, 1.4)
        await esperar(500)

        // 2 · Lo encontrás rápido
        actualizar({ paso: 1 })
        await mover(centro(campoRef.current), 0.8)
        await clic()
        for (let i = 1; i <= d.consulta.length; i++) {
          actualizar({ tipeado: d.consulta.slice(0, i) })
          await esperar(30 + Math.random() * 35)
        }
        await esperar(300)
        await mover(centro(buscarRef.current), 0.6)
        await clic("buscar")
        actualizar({ fase: "resultados" })
        for (let i = 1; i <= d.resultados.length; i++) {
          await esperar(160)
          actualizar({ resultados: i })
        }
        await esperar(1300)
        await mover(centro(resultadoRef.current), 0.8)
        await clic("resultado")
        actualizar({ fase: "pagina" })
        await esperar(1500)

        // 3 · Cada cambio queda
        actualizar({ paso: 2 })
        await mover(centro(historialRef.current), 0.9)
        await clic("historial")
        actualizar({ historial: true })
        await esperar(600)
        actualizar({ diff: true })
        await mover(centro(versionRef.current), 0.8)
        await esperar(3800)

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
          <CabeceraProducto completa={completa} iniciales={d.usuario.iniciales} />
          <motion.div
            className={cn("flex min-h-0 flex-1 gap-6 pt-6", completa ? "px-6" : "px-4")}
            animate={{ opacity: visible ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            {completa && <Arbol abierta={s.fase === "pagina"} />}
            <div className="relative min-w-0 flex-1">
              <AnimatePresence mode="wait" initial={false}>
                {s.fase === "pagina" ? (
                  <motion.div key="pagina" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                    <Pagina completa={completa} diff={s.diff} historialRef={historialRef} presionado={s.presionado === "historial"} />
                  </motion.div>
                ) : (
                  <motion.div key="indice" exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className="flex flex-col gap-5">
                    <div className="flex items-center justify-between">
                      <p className="text-[30px] leading-none font-semibold tracking-[-0.75px]">{d.titulo}</p>
                    </div>
                    <div className="flex gap-2">
                      <div
                        ref={campoRef}
                        className="flex h-9 min-w-0 flex-1 items-center rounded-md border border-[#1C1C1C]/20 bg-[#FCFBF8] px-3 text-[14px]"
                      >
                        {s.tipeado ? (
                          <span className="truncate">
                            {s.tipeado}
                            {s.fase === "indice" && (
                              <span className="ml-px inline-block h-[1.1em] w-px translate-y-[3px] animate-pulse bg-[#1C1C1C]" />
                            )}
                          </span>
                        ) : (
                          <span className="text-[#5F5F5D]">{d.buscarPlaceholder}</span>
                        )}
                      </div>
                      {completa && (
                        <div className="flex h-9 shrink-0 items-center gap-2 rounded-md border border-[#ECEAE4] bg-[#F7F4ED] px-3 text-[14px]">
                          {d.estado} <ChevronDown className="size-4 text-[#5F5F5D]" />
                        </div>
                      )}
                      <motion.div
                        ref={buscarRef}
                        animate={{ scale: s.presionado === "buscar" ? 0.94 : 1 }}
                        transition={{ duration: 0.12 }}
                        className="flex h-9 shrink-0 items-center rounded-md bg-[#1C1C1C]/[0.04] px-4 text-[14px]"
                      >
                        {d.buscar}
                      </motion.div>
                    </div>
                    <div ref={listaRef}>
                      {s.fase === "indice" ? (
                        <Carpetas filas={s.filas} />
                      ) : (
                        <Resultados
                          cantidad={s.resultados}
                          resultadoRef={resultadoRef}
                          presionado={s.presionado === "resultado"}
                        />
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {s.historial && (
                  <motion.div
                    initial={{ opacity: 0, x: completa ? 24 : 0, y: completa ? 0 : 24 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className={cn(
                      "absolute z-10 flex flex-col gap-1 rounded-lg border border-[#ECEAE4] bg-white p-3 shadow-[0_16px_40px_-16px_rgba(21,25,26,0.35)]",
                      completa ? "top-[52px] -right-2 w-[250px]" : "inset-x-0 bottom-6"
                    )}
                  >
                    <p className="px-2 pt-1 pb-2 text-[14px] font-medium">{d.historial.titulo}</p>
                    {d.historial.versiones.map((v, i) => (
                      <div
                        key={v.cuando}
                        ref={i === 0 ? versionRef : undefined}
                        className={cn("flex flex-col gap-0.5 rounded-md px-2 py-2", i === 0 && "bg-teal/[0.07]")}
                      >
                        <p className="text-[12px] text-[#5F5F5D]">
                          {v.cuando} · <span className="font-medium text-[#1C1C1C]">{v.quien}</span>
                        </p>
                        <p className="text-[13px] leading-[1.4]">{v.que}</p>
                      </div>
                    ))}
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

/** Árbol de carpetas de la izquierda; al abrir la página se despliega su carpeta. */
function Arbol({ abierta }: { abierta: boolean }) {
  return (
    <div className="mb-6 flex w-[200px] shrink-0 flex-col gap-2 rounded-2xl border border-[#ECEAE4] bg-[#F9F6F0] p-3">
      <div className="flex items-center justify-between px-1 text-[14px] font-medium">
        {d.titulo} <Ellipsis className="size-4 text-[#5F5F5D]" />
      </div>
      <div className="flex h-8 items-center rounded-md border border-[#1C1C1C]/20 px-3 text-[14px]">{d.nuevaPagina}</div>
      <div className="mt-1 flex flex-col">
        {d.carpetas.map((c) => {
          const desplegada = abierta && c.nombre === d.carpetaAbierta
          return (
            <Fragment key={c.nombre}>
              <div className="flex h-8 items-center gap-1 text-[14px]">
                {desplegada ? <ChevronDown className="size-4" /> : <ChevronRight className="size-4" />}
                {c.nombre}
              </div>
              <AnimatePresence initial={false}>
                {desplegada && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    {d.paginasCarpeta.map((p, i) => (
                      <p
                        key={p}
                        className={cn("truncate rounded-md py-1.5 pr-2 pl-5 text-[13px]", i === 0 ? "bg-[#1C1C1C]/[0.04] font-medium" : "text-[#5F5F5D]")}
                      >
                        {p}
                      </p>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </Fragment>
          )
        })}
      </div>
    </div>
  )
}

function Carpetas({ filas }: { filas: number }) {
  return (
    <div className="overflow-hidden rounded-xl border border-[#ECEAE4]">
      {d.carpetas.slice(0, filas).map((c, i) => (
        <motion.div
          key={c.nombre}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className={cn("flex items-center gap-4 px-4 py-2", i > 0 && "border-t border-[#ECEAE4]")}
        >
          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            <p className="text-[16px] font-medium">{c.nombre}</p>
            <p className="truncate text-[12px] text-[#5F5F5D]">{c.detalle}</p>
          </div>
          <span className="shrink-0 text-[12px] text-[#5F5F5D]">{c.paginas}</span>
        </motion.div>
      ))}
    </div>
  )
}

function Resultados({
  cantidad,
  resultadoRef,
  presionado,
}: {
  cantidad: number
  resultadoRef: React.RefObject<HTMLDivElement | null>
  presionado: boolean
}) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-[12px] text-[#5F5F5D]">{d.resultadosTitulo}</p>
      <div className="overflow-hidden rounded-xl border border-[#ECEAE4]">
        {d.resultados.slice(0, cantidad).map((r, i) => (
          <motion.div
            key={r.titulo}
            ref={i === 0 ? resultadoRef : undefined}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0, scale: i === 0 && presionado ? 0.985 : 1 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className={cn("flex flex-col gap-1 px-4 py-3", i > 0 && "border-t border-[#ECEAE4]", i === 0 && presionado && "bg-[#1C1C1C]/[0.04]")}
          >
            <div className="flex items-center gap-2">
              <p className="text-[16px] font-medium">{r.titulo}</p>
              <span className="rounded-full border border-[#ECEAE4] px-2 text-[12px]">{r.carpeta}</span>
            </div>
            <p className="text-[13px] leading-[1.5] text-[#5F5F5D]">
              {r.fragmento.split("**").map((t, j) =>
                j % 2 ? (
                  <mark key={j} className="rounded-sm bg-teal/10 px-0.5 font-medium text-[#1C1C1C]">
                    {t}
                  </mark>
                ) : (
                  <Fragment key={j}>{t}</Fragment>
                )
              )}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function Pagina({
  completa,
  diff,
  historialRef,
  presionado,
}: {
  completa: boolean
  diff: boolean
  historialRef: React.RefObject<HTMLDivElement | null>
  presionado: boolean
}) {
  const p = d.pagina
  const [editar, historial, detalles] = p.acciones
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <p className="min-w-0 flex-1 truncate text-[14px] text-[#5F5F5D]">{p.migas}</p>
        <span className="flex h-9 items-center rounded-md bg-teal px-4 text-[14px] text-on-brand">{editar}</span>
        <motion.div
          ref={historialRef}
          animate={{ scale: presionado ? 0.94 : 1 }}
          transition={{ duration: 0.12 }}
          className="flex h-9 items-center rounded-md border border-[#1C1C1C]/20 px-4 text-[14px]"
        >
          {historial}
        </motion.div>
        {completa && <span className="flex h-9 items-center rounded-md border border-[#1C1C1C]/20 px-4 text-[14px]">{detalles}</span>}
      </div>
      <div className={cn("flex flex-col gap-3 rounded-md border border-[#E4E1D8] bg-white", completa ? "p-8" : "p-5")}>
        <p className="text-[24px] leading-[1.2] font-semibold tracking-[-0.5px]">{p.titulo}</p>
        <p className="text-[15px] leading-[1.6]">{p.parrafo}</p>
        <p className="mt-1 text-[18px] font-semibold">{p.subtitulo}</p>
        <ul className="flex flex-col gap-1.5 text-[15px] leading-[1.5]">
          <li className="flex gap-2">
            <span>•</span>
            <span>
              {p.cambio.etiqueta}{" "}
              {diff && <span className="mr-1 rounded-sm bg-[#B23A48]/10 px-0.5 text-[#B23A48] line-through">{p.cambio.antes}</span>}
              <span className={cn("rounded-sm px-0.5 transition-colors duration-500", diff && "bg-teal/15 text-teal")}>{p.cambio.despues}</span>
            </span>
          </li>
          {p.items.map((item) => (
            <li key={item} className="flex gap-2">
              <span>•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
