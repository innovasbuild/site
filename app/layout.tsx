import type { Metadata } from "next"
import Script from "next/script"
import "./globals.css"
import { cn } from "@/lib/utils"
import { fraunces, inter, spaceMono } from "./fonts"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "INNOV.AS — Automatización agéntica y adopción de IA",
  description:
    "Soluciones de IA y datos para transformar tu operación, y el programa Desde Adentro para que tu equipo adopte el cambio. Años de proyectos con BM, BID y FAO.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={cn(fraunces.variable, inter.variable, spaceMono.variable)}>
      <body className="min-h-screen bg-paper text-ink font-sans antialiased selection:bg-teal/20">
        <Navbar />
        {children}
        <Footer />
        <Script
          id="hs-script"
          src={`//js.hs-scripts.com/${process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID}.js`}
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
