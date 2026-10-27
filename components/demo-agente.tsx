"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useAnimate } from "framer-motion"
import { ArrowUp, Check, ChevronDown, Ellipsis, LoaderCircle, Plus, Send, SquarePen } from "lucide-react"
import {
  Aparece,
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
import { demoAgente as d } from "@/content/central-ia"

/**
 * Demo animada de Central IA, armada sobre la pantalla "Chat · Hilo abierto" del diseño del producto (pen.dev),
 * con su tipografía (Geist) y sus tamaños. Un cursor escribe el pedido, el agente busca y redacta, y el cursor
 * aprueba el mail. A la izquierda, los tres pasos se marcan a medida que pasan.
 * En pantallas chicas usa una versión sin barra lateral. Corre solo mientras está en pantalla. Con movimiento
 * reducido queda quieta en la aprobación.
 */

const MEDIDAS = {
  completa: { w: 900, h: 620 },
  compacta: { w: 390, h: 600 },
}

type Fase = "vacio" | "enviado" | "respuesta" | "tarjeta" | "aprobado"

const INICIO = {
  fase: "vacio" as Fase,
  tipeado: "",
  herramientas: 0,
  listas: 0,
  palabras: 0,
  paso: -1,
  presionado: null as null | "enviar" | "aprobar",
  sobreAprobar: false,
}

const PALABRAS = d.respuesta.split(" ")

export function DemoAgente({ className }: { className?: string }) {
  const esc = useEscenario(MEDIDAS)
  const { escenarioRef, reducir, enPantalla, medido, completa, w, h } = esc
  const conversacionRef = useRef<HTMLDivElement>(null)
  const campoRef = useRef<HTMLDivElement>(null)
  const enviarRef = useRef<HTMLDivElement>(null)
  const aprobarRef = useRef<HTMLDivElement>(null)
  const [cursorRef, animarCursor] = useAnimate<HTMLDivElement>()

  const [s, setS] = useState(INICIO)
  const [clics, setClics] = useState(0)
  const [visible, setVisible] = useState(true)

  // Con movimiento reducido: la escena final, quieta.
  useEffect(() => {
    if (!reducir) return
    setS({ ...INICIO, fase: "tarjeta", herramientas: 3, listas: 3, palabras: PALABRAS.length, paso: 2 })
    requestAnimationFrame(() => conversacionRef.current?.scrollTo({ top: 1e4 }))
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
    const clic = async (sobre: "enviar" | "aprobar" | null = null) => {
      setClics((c) => c + 1)
      actualizar({ presionado: sobre })
      await esperar(160)
      actualizar({ presionado: null })
    }
    const alFondo = () => conversacionRef.current?.scrollTo({ top: 1e4, behavior: "smooth" })
    const reposo = { x: w * 0.82, y: h * 0.62 }

    async function guion() {
      while (vivo) {
        setS(INICIO)
        conversacionRef.current?.scrollTo({ top: 0 })
        await ubicar({ x: w * 0.7, y: h + 40, opacity: 1 })
        setVisible(true)
        await esperar(700)

        // 1 · Le pedís
        actualizar({ paso: 0 })
        await mover(centro(campoRef.current), 1)
        await clic()
        for (let i = 1; i <= d.pedido.length; i++) {
          actualizar({ tipeado: d.pedido.slice(0, i) })
          await esperar(18 + Math.random() * 30)
        }
        await esperar(350)
        await mover(centro(enviarRef.current), 0.6)
        await clic("enviar")
        actualizar({ fase: "enviado", tipeado: "", paso: 1 })
        await mover(reposo, 0.9)

        // 2 · Busca y redacta
        for (let i = 1; i <= d.herramientas.length; i++) {
          actualizar({ herramientas: i })
          await esperar(950)
          actualizar({ listas: i })
          await esperar(250)
        }
        actualizar({ fase: "respuesta" })
        for (let i = 1; i <= PALABRAS.length; i++) {
          actualizar({ palabras: i })
          await esperar(45)
        }
        await esperar(300)
        actualizar({ fase: "tarjeta" })
        await esperar(450)
        alFondo()
        await esperar(1800)

        // 3 · Vos aprobás
        actualizar({ paso: 2 })
        await mover(centro(aprobarRef.current), 1.1)
        actualizar({ sobreAprobar: true })
        await esperar(450)
        await clic("aprobar")
        actualizar({ fase: "aprobado", sobreAprobar: false })
        await esperar(300)
        alFondo()
        await mover(reposo, 1)
        await esperar(3200)

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

  const conTarjeta = s.fase === "tarjeta" || s.fase === "aprobado"

  return (
    <Disposicion className={className} pasos={<Pasos pasos={d.pasos} actual={s.paso} />}>
      <Marco esc={esc} label={d.label}>
        <div className="flex h-full flex-col overflow-hidden rounded-[14px] border border-line bg-[#F7F4ED] text-[#1C1C1C] shadow-[0_24px_60px_-28px_rgba(21,25,26,0.4)]">
          <CabeceraProducto completa={completa} iniciales={d.usuario.iniciales} />
          <motion.div
            className="flex min-h-0 flex-1 gap-6 px-6 pt-6"
            animate={{ opacity: visible ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            {completa && <Hilos conHilo={s.fase !== "vacio"} />}
            <div className="flex min-w-0 flex-1 flex-col">
              <div ref={conversacionRef} className="min-h-0 flex-1 overflow-hidden">
                <div className="mx-auto flex max-w-[600px] flex-col gap-6 pb-6">
                  {s.fase === "vacio" ? (
                    <p className="pt-[22%] text-center text-[30px] font-semibold tracking-[-0.75px]">{d.bienvenida}</p>
                  ) : (
                    <>
                      <Aparece className="flex justify-end">
                        <p className="max-w-[85%] rounded-xl bg-[#1C1C1C]/[0.04] px-4 py-2.5 text-[16px] leading-[1.5]">{d.pedido}</p>
                      </Aparece>
                      <div className="-mt-1 flex flex-col gap-1.5">
                        {d.herramientas.slice(0, s.herramientas).map((hta, i) => (
                          <Aparece key={hta.listo} className="flex items-center gap-2 text-[13px] text-[#5F5F5D]">
                            {i < s.listas ? (
                              <Check className="size-3.5 text-teal" strokeWidth={2.5} />
                            ) : (
                              <LoaderCircle className="size-3.5 animate-spin text-[#5F5F5D]/70" />
                            )}
                            {i < s.listas ? hta.listo : hta.trabajando}
                          </Aparece>
                        ))}
                      </div>
                      {s.palabras > 0 && <p className="text-[16px] leading-[1.6]">{PALABRAS.slice(0, s.palabras).join(" ")}</p>}
                      {conTarjeta && (
                        <Aparece>
                          <Aprobacion
                            aprobado={s.fase === "aprobado"}
                            sobre={s.sobreAprobar}
                            presionado={s.presionado === "aprobar"}
                            aprobarRef={aprobarRef}
                          />
                        </Aparece>
                      )}
                      {s.fase === "aprobado" && (
                        <Aparece className="flex items-center gap-2 text-[13px] text-[#5F5F5D]">
                          <span className="grid size-4 place-items-center rounded-full bg-teal text-on-brand">
                            <Check className="size-2.5" strokeWidth={3} />
                          </span>
                          {d.enviado}
                        </Aparece>
                      )}
                    </>
                  )}
                </div>
              </div>
              <Compositor
                campoRef={campoRef}
                enviarRef={enviarRef}
                texto={s.tipeado}
                placeholder={s.fase === "tarjeta" ? d.esperando : d.placeholder}
                presionado={s.presionado === "enviar"}
              />
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

function Hilos({ conHilo }: { conHilo: boolean }) {
  return (
    <div className="mb-6 flex w-[200px] shrink-0 flex-col gap-2 rounded-2xl border border-[#ECEAE4] bg-[#F9F6F0] p-3">
      <div className="flex h-9 items-center gap-2 rounded-md bg-[#1C1C1C]/[0.04] px-3 text-[14px]">
        <SquarePen className="size-4" /> Nuevo chat
      </div>
      <p className="px-3 pt-3 pb-1 text-[12px] text-[#5F5F5D]">Recientes</p>
      <div className="flex flex-col gap-0.5">
        <AnimatePresence initial={false}>
          {conHilo && (
            <motion.div
              key="nuevo"
              className="overflow-hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <Hilo titulo={d.tituloHilo} agente={d.agente} activo />
            </motion.div>
          )}
        </AnimatePresence>
        {d.hilos.map((hilo) => (
          <Hilo key={hilo.titulo} titulo={hilo.titulo} agente={hilo.agente} />
        ))}
      </div>
    </div>
  )
}

function Hilo({ titulo, agente, activo }: { titulo: string; agente: string; activo?: boolean }) {
  return (
    <div className={cn("flex items-start gap-1 rounded-md py-2 pr-1 pl-3", activo && "bg-[#1C1C1C]/[0.04]")}>
      <div className="min-w-0 flex-1">
        <p className={cn("text-[14px] leading-[1.3]", activo ? "font-medium text-[#1C1C1C]" : "text-[#5F5F5D]")}>{titulo}</p>
        <p className="text-[12px] text-[#5F5F5D]">{agente}</p>
      </div>
      <Ellipsis className="mt-1 size-4 text-[#5F5F5D]" />
    </div>
  )
}

function Aprobacion({
  aprobado,
  sobre,
  presionado,
  aprobarRef,
}: {
  aprobado: boolean
  sobre: boolean
  presionado: boolean
  aprobarRef: React.RefObject<HTMLDivElement | null>
}) {
  const a = d.aprobacion
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-[#ECEAE4] bg-[#FCFBF8] p-4">
      <p className="text-[14px] font-medium">{a.titulo}</p>
      <div className="flex flex-col gap-3 text-[14px]">
        <p className="flex gap-3">
          <span className="w-12 shrink-0 text-[#5F5F5D]">Para</span>
          {a.para}
        </p>
        <p className="flex gap-3">
          <span className="w-12 shrink-0 text-[#5F5F5D]">Asunto</span>
          {a.asunto}
        </p>
      </div>
      <p className="rounded-md border border-[#ECEAE4] bg-white p-4 text-[14px] leading-[1.6] whitespace-pre-line">{a.cuerpo}</p>
      <div className="flex items-center gap-2">
        <motion.div
          ref={aprobarRef}
          animate={{ scale: presionado ? 0.95 : 1 }}
          transition={{ duration: 0.12 }}
          className={cn(
            "flex h-9 items-center gap-1.5 rounded-md px-4 text-[14px] text-on-brand transition-colors duration-200",
            aprobado ? "bg-teal/80" : sobre ? "bg-[#0B564D]" : "bg-teal"
          )}
        >
          {aprobado && <Check className="size-4" strokeWidth={2.5} />}
          {aprobado ? "Enviado" : a.aprobar}
        </motion.div>
        {!aprobado && (
          <div className="flex h-9 items-center rounded-md border border-[#1C1C1C]/20 px-4 text-[14px]">{a.cancelar}</div>
        )}
      </div>
    </div>
  )
}

function Compositor({
  campoRef,
  enviarRef,
  texto,
  placeholder,
  presionado,
}: {
  campoRef: React.RefObject<HTMLDivElement | null>
  enviarRef: React.RefObject<HTMLDivElement | null>
  texto: string
  placeholder: string
  presionado: boolean
}) {
  return (
    <div className="mb-6 w-full max-w-[600px] shrink-0 self-center rounded-[20px] border border-[#1C1C1C]/20 bg-[#FCFBF8] p-4">
      <div ref={campoRef} className="min-h-[48px] text-[16px] leading-[1.5]">
        {texto ? (
          <span>
            {texto}
            <span className="ml-px inline-block h-[1.1em] w-px translate-y-[3px] animate-pulse bg-[#1C1C1C]" />
          </span>
        ) : (
          <span className="text-[#5F5F5D]">{placeholder}</span>
        )}
      </div>
      <div className="mt-3 flex items-center gap-2">
        <span className="grid size-8 place-items-center rounded-md border border-[#1C1C1C]/20">
          <Plus className="size-4" />
        </span>
        <span className="flex h-8 items-center gap-1.5 rounded-md bg-[#1C1C1C]/[0.04] px-2.5 text-[14px]">
          <Send className="size-4 text-[#5F5F5D]" />
          {d.agente}
          <ChevronDown className="size-3.5 text-[#5F5F5D]" />
        </span>
        <motion.div
          ref={enviarRef}
          animate={{ scale: presionado ? 0.88 : 1 }}
          transition={{ duration: 0.12 }}
          className={cn(
            "ml-auto grid size-8 place-items-center rounded-full text-on-brand transition-colors duration-200",
            texto ? "bg-teal" : "bg-teal/40"
          )}
        >
          <ArrowUp className="size-4" />
        </motion.div>
      </div>
    </div>
  )
}
