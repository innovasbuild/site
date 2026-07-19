"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  contactFormSchema,
  submitButtonLabel,
  submitNote,
  directEmailNote,
  directEmail,
  type ContactFormFieldValues,
} from "@/content/contacto"
import { globalMicrocopy } from "@/content/global"
import { cn } from "@/lib/utils"

type FormValues = ContactFormFieldValues

export function ContactForm() {
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(contactFormSchema),
  })

  const onSubmit = async (data: FormValues) => {
    setStatus(null)
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setStatus({ type: "success", message: globalMicrocopy.submitSuccess })
        reset()
      } else {
        setStatus({ type: "error", message: globalMicrocopy.submitError })
      }
    } catch {
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
            <Label htmlFor="empresa">Empresa / Organización</Label>
            <Input id="empresa" {...register("empresa")} className="mt-2" />
            {errors.empresa && <p className="mt-1 text-xs text-danger">{errors.empresa.message}</p>}
          </div>
          <div>
            <Label htmlFor="pais">País</Label>
            <Input id="pais" {...register("pais")} className="mt-2" />
            {errors.pais && <p className="mt-1 text-xs text-danger">{errors.pais.message}</p>}
          </div>
        </div>

        <div>
          <Label htmlFor="consulta">¿En qué podemos ayudarte?</Label>
          <Textarea id="consulta" {...register("consulta")} className="mt-2" rows={4} />
          {errors.consulta && <p className="mt-1 text-xs text-danger">{errors.consulta.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            "w-full rounded bg-teal px-6 py-3 text-base font-semibold text-on-brand transition-transform",
            "hover:-translate-y-0.5 hover:shadow-teal disabled:opacity-50"
          )}
        >
          {isSubmitting ? "Enviando..." : submitButtonLabel}
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
        <a href={`mailto:${directEmail}`} className="font-semibold text-teal hover:underline">
          {directEmail}
        </a>
      </p>
    </div>
  )
}
