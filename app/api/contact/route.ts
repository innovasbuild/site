import { NextResponse } from "next/server"
import { contactFormSchema, type ContactFormValues } from "@/content/contacto"

function toHubspotFields(data: ContactFormValues) {
  return [
    { name: "firstname", value: data.nombre },
    { name: "email", value: data.email },
    { name: "company", value: data.empresa },
    { name: "country", value: data.pais },
    { name: "consulta", value: data.consulta },
  ]
}

export async function POST(request: Request) {
  const portalId = process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID
  const formId = process.env.HUBSPOT_FORM_ID

  if (!portalId || !formId) {
    return NextResponse.json({ ok: false, error: "Formulario no configurado." }, { status: 500 })
  }

  const body = await request.json()
  const parsed = contactFormSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Datos inválidos.", issues: parsed.error.issues }, { status: 400 })
  }

  try {
    const response = await fetch(`https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fields: toHubspotFields(parsed.data),
        context: {
          pageUri: request.headers.get("referer") ?? "https://innov.as/contacto",
          pageName: "INNOV.AS - Contacto",
        },
      }),
    })

    if (!response.ok) {
      const error = await response.json().catch(() => null)
      console.error("HubSpot error:", error)
      return NextResponse.json({ ok: false, error: "No pudimos enviar el formulario." }, { status: 502 })
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("Contact form submit failed:", error)
    return NextResponse.json({ ok: false, error: "No pudimos enviar el formulario." }, { status: 502 })
  }
}
