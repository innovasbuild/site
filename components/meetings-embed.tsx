"use client"

import { useEffect } from "react"

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

/** Agenda de HubSpot Meetings embebida. Registra la reserva como conversión. */
export function MeetingsEmbed({ url }: { url: string }) {
  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== "https://meetings.hubspot.com") return
      if (event.data?.meetingBookSucceeded) window.gtag?.("event", "generate_lead", { method: "agenda" })
    }
    window.addEventListener("message", onMessage)
    return () => window.removeEventListener("message", onMessage)
  }, [])

  return (
    <iframe
      title="Agenda de INNOV.AS"
      src={`${url}${url.includes("?") ? "&" : "?"}embed=true`}
      className="h-[720px] w-full rounded border border-ink bg-paper-soft"
    />
  )
}
