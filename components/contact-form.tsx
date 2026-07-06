"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  contactFormSchema,
  intents,
  tamanoEmpresaOptions,
  personasOptions,
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
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(contactFormSchema as never),
    defaultValues: { intent: "transformar" },
  })

  const intent = watch("intent")

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
        reset({ intent: data.intent })
      } else {
        setStatus({ type: "error", message: globalMicrocopy.submitError })
      }
    } catch {
      setStatus({ type: "error", message: globalMicrocopy.submitError })
    }
  }

  return (
    <div className="mx-auto max-w-2xl rounded border border-ink bg-paper-soft p-8 md:p-10">
      <ToggleGroup
        type="single"
        value={intent}
        onValueChange={(value) => value && setValue("intent", value as FormValues["intent"])}
        className="grid grid-cols-1 gap-2 sm:grid-cols-3"
      >
        {intents.map((item) => (
          <ToggleGroupItem
            key={item.value}
            value={item.value}
            className="flex h-auto flex-col items-start gap-1 rounded border border-ink p-3 text-left data-[state=on]:bg-teal data-[state=on]:text-on-brand"
          >
            <span className="font-mono text-xs uppercase">{item.label}</span>
            <span className="text-xs opacity-70">{item.description}</span>
          </ToggleGroupItem>
        ))}
      </ToggleGroup>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
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

        {intent === "transformar" && (
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Label htmlFor="proceso">¿Qué proceso o área querés transformar?</Label>
              <Textarea id="proceso" {...register("proceso")} className="mt-2" rows={3} />
              {errors.proceso && <p className="mt-1 text-xs text-danger">{errors.proceso.message}</p>}
            </div>
            <div>
              <Label htmlFor="tamanoEmpresa">Tamaño de la empresa</Label>
              <select
                id="tamanoEmpresa"
                {...register("tamanoEmpresa")}
                className="mt-2 w-full rounded border border-line bg-paper px-3 py-2 text-sm text-ink"
                defaultValue=""
              >
                <option value="" disabled>
                  Seleccioná una opción
                </option>
                {tamanoEmpresaOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {errors.tamanoEmpresa && <p className="mt-1 text-xs text-danger">{errors.tamanoEmpresa.message}</p>}
            </div>
          </div>
        )}

        {intent === "formar-equipo" && (
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <Label htmlFor="personas">¿Para cuántas personas?</Label>
              <select
                id="personas"
                {...register("personas")}
                className="mt-2 w-full rounded border border-line bg-paper px-3 py-2 text-sm text-ink"
                defaultValue=""
              >
                <option value="" disabled>
                  Seleccioná una opción
                </option>
                {personasOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {errors.personas && <p className="mt-1 text-xs text-danger">{errors.personas.message}</p>}
            </div>
            <div>
              <Label htmlFor="area">¿Qué área/s?</Label>
              <Input id="area" {...register("area")} className="mt-2" />
              {errors.area && <p className="mt-1 text-xs text-danger">{errors.area.message}</p>}
            </div>
          </div>
        )}

        {intent === "ser-trainer" && (
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Label htmlFor="linkedinOrCv">LinkedIn o CV (URL)</Label>
              <Input id="linkedinOrCv" {...register("linkedinOrCv")} className="mt-2" />
              {errors.linkedinOrCv && <p className="mt-1 text-xs text-danger">{errors.linkedinOrCv.message}</p>}
            </div>
            <div>
              <Label htmlFor="usoIA">¿Cómo usás IA hoy en tu trabajo?</Label>
              <Textarea id="usoIA" {...register("usoIA")} className="mt-2" rows={3} />
              {errors.usoIA && <p className="mt-1 text-xs text-danger">{errors.usoIA.message}</p>}
            </div>
            <div>
              <Label htmlFor="experiencia">Experiencia facilitando o enseñando</Label>
              <Textarea id="experiencia" {...register("experiencia")} className="mt-2" rows={3} />
              {errors.experiencia && <p className="mt-1 text-xs text-danger">{errors.experiencia.message}</p>}
            </div>
          </div>
        )}

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
