"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useAnimate } from "framer-motion"
import { Check, ChevronDown, Folder, LoaderCircle, Lock, X } from "lucide-react"
import { Aparece, correrGuion, Cursor, Disposicion, Marco, Pasos, ayudasDeGuion, useEscenario } from "@/components/demo-escenario"
import { cn } from "@/lib/utils"
import { demoPermisos as d } from "@/content/central-ia"

/**
 * Demo animada de permisos, armada sobre la pantalla "Alta · Carpetas · Propuesta" del diseño del producto (pen.dev),
 * con su tipografía (Geist) y sus tamaños. Leemos el sitio y aparecen las carpetas propuestas; el cursor pasa una
 * carpeta de abierta a restringida y las crea; al final, la misma lista vista por una persona del equipo, con su
 * nivel en cada carpeta. Corre solo mientras está en pantalla. Con movimiento reducido queda quieta en esa vista.
 */

const MEDIDAS = {
  completa: { w: 900, h: 690 },
  compacta: { w: 390, h: 740 },
}

type Fase = "leyendo" | "propuesta" | "miembro"

const INICIO = {
  fase: "leyendo" as Fase,
  filas: 0,
  menu: false,
  cambiada: false,
  resaltada: false,
  creadas: false,
  paso: -1,
  presionado: null as null | "acceso" | "opcion" | "crear",
}

export function DemoPermisos({ className }: { className?: string }) {
  const esc = useEscenario(MEDIDAS)
  const { escenarioRef, reducir, enPantalla, medido, completa, w, h } = esc
  const accesoRef = useRef<HTMLDivElement>(null)
  const opcionRef = useRef<HTMLDivElement>(null)
  const crearRef = useRef<HTMLDivElement>(null)
  const [cursorRef, animarCursor] = useAnimate<HTMLDivElement>()

  const [s, setS] = useState(INICIO)
  const [clics, setClics] = useState(0)
  const [visible, setVisible] = useState(true)

  // Con movimiento reducido: la vista de la persona del equipo, quieta.
  useEffect(() => {
    if (!reducir) return
    setS({ ...INICIO, fase: "miembro", filas: d.carpetas.length, cambiada: true, creadas: true, paso: 2 })
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
    const clic = async (sobre: (typeof INICIO)["presionado"]) => {
      setClics((c) => c + 1)
      actualizar({ presionado: sobre })
      await esperar(160)
      actualizar({ presionado: null })
    }
    const reposo = { x: w * 0.86, y: h * 0.5 }

    async function guion() {
      while (vivo) {
        setS(INICIO)
        await ubicar({ x: w * 0.8, y: h + 40, opacity: 1 })
        setVisible(true)

        // 1 · Armamos el Brain
        actualizar({ paso: 0 })
        await esperar(2200)
        actualizar({ fase: "propuesta" })
        for (let i = 1; i <= d.carpetas.length; i++) {
          await esperar(170)
          actualizar({ filas: i })
        }
        await esperar(1300)

        // 2 · Vos decidís quién ve
        actualizar({ paso: 1 })
        await mover(centro(accesoRef.current), 1.1)
        await clic("acceso")
        actualizar({ menu: true })
        await esperar(500)
        await mover(centro(opcionRef.current), 0.5)
        await esperar(250)
        await clic("opcion")
        actualizar({ menu: false, cambiada: true, resaltada: true })
        await esperar(900)
        actualizar({ resaltada: false })
        await mover(centro(crearRef.current), 0.9)
        await clic("crear")
        actualizar({ creadas: true })
        await esperar(700)
        await mover(reposo, 0.8)

        // 3 · Cada uno ve lo suyo
        actualizar({ paso: 2, fase: "miembro" })
        await esperar(4200)

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
          <CabeceraAlta pasos={s.fase !== "miembro"} />
          <motion.div
            className={cn("flex min-h-0 flex-1 justify-center pb-6", completa ? "px-10" : "px-4")}
            animate={{ opacity: visible ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex w-full max-w-[640px] flex-col self-start rounded-xl border border-[#ECEAE4] bg-[#FCFBF8] p-6">
              <AnimatePresence mode="wait" initial={false}>
                {s.fase === "leyendo" ? (
                  <motion.div
                    key="leyendo"
                    className="flex flex-col items-center gap-3 py-10 text-center"
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <LoaderCircle className="size-7 animate-spin text-teal" />
                    <p className="text-[20px] font-semibold">{d.leyendo}</p>
                    <p className="max-w-[440px] text-[14px] leading-[1.5] text-[#5F5F5D]">{d.leyendoDetalle}</p>
                  </motion.div>
                ) : (
                  <motion.div
                    key={s.fase}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col gap-5"
                  >
                    {s.fase === "miembro" ? <TituloMiembro /> : <TituloAlta />}
                    <div className="rounded-md border border-[#ECEAE4]">
                      {d.carpetas.slice(0, s.filas).map((carpeta, i) => (
                        <Fila
                          key={carpeta.nombre}
                          i={i}
                          nombre={carpeta.nombre}
                          detalle={carpeta.detalle}
                          restringida={carpeta.restringida || (i === d.cambia && s.cambiada)}
                          rol={carpeta.rol}
                          miembro={s.fase === "miembro"}
                          resaltada={i === d.cambia && s.resaltada}
                          menu={i === d.cambia && s.menu}
                          presionado={i === d.cambia && s.presionado === "acceso"}
                          accesoRef={i === d.cambia ? accesoRef : undefined}
                          opcionRef={opcionRef}
                        />
                      ))}
                    </div>
                    {s.fase === "propuesta" && s.filas === d.carpetas.length && (
                      <Aparece>
                        <motion.div
                          ref={crearRef}
                          animate={{ scale: s.presionado === "crear" ? 0.97 : 1 }}
                          transition={{ duration: 0.12 }}
                          className={cn(
                            "flex h-10 items-center justify-center gap-1.5 rounded-md text-[14px] text-on-brand transition-colors duration-200",
                            s.creadas ? "bg-teal/80" : "bg-teal"
                          )}
                        >
                          {s.creadas && <Check className="size-4" strokeWidth={2.5} />}
                          {s.creadas ? d.creadas : d.crear}
                        </motion.div>
                      </Aparece>
                    )}
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

/** "Central IA" y, durante el alta, la barra de pasos (paso 3 de 6). */
function CabeceraAlta({ pasos }: { pasos: boolean }) {
  return (
    <div className="flex shrink-0 flex-col items-center gap-2.5 pt-6 pb-5">
      <p className="text-[18px] font-semibold tracking-[-0.3px] text-teal">{d.producto}</p>
      <div className={cn("flex gap-1 transition-opacity duration-300", !pasos && "opacity-0")}>
        {Array.from({ length: 6 }, (_, i) => (
          <span key={i} className={cn("h-[3px] w-10 rounded-full", i < 3 ? "bg-teal" : "bg-[#1C1C1C]/15")} />
        ))}
      </div>
      <p className={cn("text-[12px] text-[#5F5F5D] transition-opacity duration-300", !pasos && "opacity-0")}>{d.pasoAlta}</p>
    </div>
  )
}

function TituloAlta() {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-[24px] leading-[1.25] font-semibold tracking-[-0.5px]">{d.titulo}</p>
      <p className="text-[14px] leading-[1.5] text-[#5F5F5D]">{d.bajada}</p>
    </div>
  )
}

function TituloMiembro() {
  return (
    <div className="flex items-center gap-3">
      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-teal/10 text-[14px] font-medium text-teal">
        {d.miembro.iniciales}
      </span>
      <div className="flex flex-col gap-0.5">
        <p className="text-[20px] leading-[1.25] font-semibold tracking-[-0.4px]">{d.miembro.titulo}</p>
        <p className="text-[14px] leading-[1.5] text-[#5F5F5D]">{d.miembro.bajada}</p>
      </div>
    </div>
  )
}

function Fila({
  i,
  nombre,
  detalle,
  restringida,
  rol,
  miembro,
  resaltada,
  menu,
  presionado,
  accesoRef,
  opcionRef,
}: {
  i: number
  nombre: string
  detalle: string
  restringida: boolean
  rol: string
  miembro: boolean
  resaltada: boolean
  menu: boolean
  presionado: boolean
  accesoRef?: React.RefObject<HTMLDivElement | null>
  opcionRef: React.RefObject<HTMLDivElement | null>
}) {
  const sinAcceso = miembro && rol === "Sin acceso"
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: sinAcceso ? 0.5 : 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "relative flex items-center gap-4 px-4 py-2.5 transition-colors duration-500 first:rounded-t-md last:rounded-b-md",
        menu && "z-20",
        resaltada ? "bg-teal/10" : i % 2 ? "bg-[#F4F2EC]" : "bg-[#FCFBF8]"
      )}
    >
      {restringida ? (
        <Lock className={cn("size-[18px] shrink-0", sinAcceso ? "text-[#5F5F5D]" : "text-teal")} />
      ) : (
        <Folder className="size-[18px] shrink-0 text-[#5F5F5D]" />
      )}
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <p className="text-[14px] font-medium">{nombre}</p>
        <p className="truncate text-[12px] text-[#5F5F5D]">{detalle}</p>
      </div>
      {miembro ? (
        <span
          className={cn(
            "flex h-7 shrink-0 items-center rounded-md px-2.5 text-[12px]",
            rol === "Editor" ? "bg-teal/10 font-medium text-teal" : rol === "Sin acceso" ? "text-[#5F5F5D]" : "bg-[#1C1C1C]/[0.05]"
          )}
        >
          {rol}
        </span>
      ) : (
        <>
          <motion.div
            ref={accesoRef}
            animate={{ scale: presionado ? 0.95 : 1 }}
            transition={{ duration: 0.12 }}
            className="flex h-7 shrink-0 items-center gap-1.5 rounded-md border border-[#1C1C1C]/20 bg-[#FCFBF8] px-2.5 text-[12px]"
          >
            {restringida ? d.restringida : d.abierta}
            <ChevronDown className="size-3.5 text-[#5F5F5D]" />
          </motion.div>
          <X className="size-4 shrink-0 text-[#5F5F5D]" />
          <AnimatePresence>
            {menu && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.18 }}
                className="absolute top-[calc(100%-6px)] right-10 z-10 flex w-[150px] flex-col rounded-md border border-[#ECEAE4] bg-white p-1 text-[12px] shadow-[0_8px_24px_-8px_rgba(21,25,26,0.3)]"
              >
                <div className="flex items-center justify-between rounded px-2 py-1.5">
                  {d.abierta} <Check className="size-3.5 text-teal" />
                </div>
                <div ref={opcionRef} className="flex items-center gap-1.5 rounded bg-[#1C1C1C]/[0.04] px-2 py-1.5">
                  <Lock className="size-3 text-teal" /> {d.restringida}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </motion.div>
  )
}
