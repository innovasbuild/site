"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  contactFormSchema,
  submitNote,
  directEmailNote,
  directEmail,
  tamanos,
  usosIA,
  type ContactFormValues,
} from "@/content/contacto"
import { globalMicrocopy } from "@/content/global"
import { cn } from "@/lib/utils"

const selectClass = "mt-2 block h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm text-ink"

export function ContactForm() {
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
  })

  const onSubmit = async (data: ContactFormValues) => {
    setStatus(null)

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const secret = process.env.NEXT_PUBLIC_CONTACT_FORM_SECRET

    if (!supabaseUrl || !secret) {
      console.error("Contact form no configurado: falta NEXT_PUBLIC_SUPABASE_URL o NEXT_PUBLIC_CONTACT_FORM_SECRET.")
      setStatus({ type: "error", message: globalMicrocopy.submitError })
      return
    }

    // La función contact_form recibe un mensaje libre: tamaño y uso de IA viajan ahí adentro.
    const message = [`Tamaño: ${data.tamano}`, `IA que usan hoy: ${data.usoIA}`, data.consulta].filter(Boolean).join("\n")

    try {
      const response = await fetch(`${supabaseUrl}/functions/v1/contact_form`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-contact-form-secret": secret,
        },
        body: JSON.stringify({
          name: data.nombre,
          email: data.email,
          company: data.empresa,
          country: data.pais,
          message,
        }),
      })

      if (response.ok) {
        window.gtag?.("event", "generate_lead", { method: "formulario" })
        setStatus({ type: "success", message: globalMicrocopy.submitSuccess })
        reset()
        return
      }

      if (response.status === 400) {
        const body = await response.json().catch(() => null)
        setStatus({ type: "error", message: body?.message || globalMicrocopy.submitError })
        return
      }

      console.error(`Contact form: respuesta inesperada del servidor (${response.status}).`)
      setStatus({ type: "error", message: globalMicrocopy.submitError })
    } catch (error) {
      console.error("Contact form submit failed:", error)
      setStatus({ type: "error", message: globalMicrocopy.submitError })
    }
  }

  return (
    <div className="mx-auto max-w-2xl rounded border border-ink bg-paper-soft p-8 md:p-10">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <Label htmlFor="nombre">Nombre</Label>
            <Input id="nombre" {...register("nombre")} className="mt-2" />
            {errors.nombre && <p className="mt-1 text-xs text-danger">{errors.nombre.message}</p>}
          </div>
          <div>
            <Label htmlFor="email">Email laboral</Label>
            <Input id="email" type="email" {...register("email")} className="mt-2" />
            {errors.email && <p className="mt-1 text-xs text-danger">{errors.email.message}</p>}
          </div>
          <div>
            <Label htmlFor="empresa">Empresa</Label>
            <Input id="empresa" {...register("empresa")} className="mt-2" />
            {errors.empresa && <p className="mt-1 text-xs text-danger">{errors.empresa.message}</p>}
          </div>
          <div>
            <Label htmlFor="pais">País</Label>
            <Input id="pais" {...register("pais")} className="mt-2" />
            {errors.pais && <p className="mt-1 text-xs text-danger">{errors.pais.message}</p>}
          </div>
          <div>
            <Label htmlFor="tamano">Cuántas personas son</Label>
            <select id="tamano" defaultValue="" {...register("tamano")} className={selectClass}>
              <option value="" disabled>Elegí una opción</option>
              {tamanos.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
            {errors.tamano && <p className="mt-1 text-xs text-danger">{errors.tamano.message}</p>}
          </div>
          <div>
            <Label htmlFor="usoIA">Qué IA usan hoy</Label>
            <select id="usoIA" defaultValue="" {...register("usoIA")} className={selectClass}>
              <option value="" disabled>Elegí una opción</option>
              {usosIA.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
            {errors.usoIA && <p className="mt-1 text-xs text-danger">{errors.usoIA.message}</p>}
          </div>
        </div>

        <div>
          <Label htmlFor="consulta">Algo que quieras contarnos antes (opcional)</Label>
          <Textarea id="consulta" {...register("consulta")} className="mt-2" rows={3} />
          {errors.consulta && <p className="mt-1 text-xs text-danger">{errors.consulta.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            "w-full rounded bg-teal px-6 py-3 text-base font-bold text-on-brand transition-transform",
            "hover:-translate-y-0.5 hover:shadow-teal disabled:opacity-50"
          )}
        >
          {isSubmitting ? "Enviando..." : globalMicrocopy.submitButton}
        </button>
        <p className="text-center text-xs text-ink-40">{submitNote}</p>

        {status && (
          <p
            className={cn(
              "rounded p-3 text-center text-sm",
              status.type === "success" ? "bg-teal/10 text-teal" : "bg-danger/10 text-danger"
            )}
          >
            {status.message}
          </p>
        )}
      </form>

      <p className="mt-6 text-center text-sm text-ink-70">
        {directEmailNote}{" "}
        <a href={`mailto:${directEmail}`} className="font-bold text-teal hover:underline">
          {directEmail}
        </a>
      </p>
    </div>
  )
}
