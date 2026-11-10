import Script from "next/script"
import "./globals.css"
import { cn } from "@/lib/utils"
import { display, sans, mono } from "./fonts"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { JsonLd } from "@/components/json-ld"
import { LocaleProvider } from "@/components/locale-provider"
import { organizationSchema } from "@/lib/schema"
import type { Locale } from "@/lib/i18n"

/** Documento completo del sitio (html, scripts, barra, pie). Lo usan el layout de [lang] y la página 404 global. */
export function SiteShell({
  locale,
  children,
}: Readonly<{
  locale: Locale
  children: React.ReactNode
}>) {
  return (
    <html lang={locale} className={cn(display.variable, sans.variable, mono.variable)}>
      <head>
        <Script
          id="ga-script"
          src="https://www.googletagmanager.com/gtag/js?id=G-K7MEG32VYH"
          strategy="beforeInteractive"
        />
        <Script id="ga-init" strategy="beforeInteractive">
          {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-K7MEG32VYH');`}
        </Script>
      </head>
      <body className="min-h-screen bg-paper text-ink font-sans antialiased selection:bg-teal/20">
        <LocaleProvider locale={locale}>
          <JsonLd data={organizationSchema(locale)} />
          <Navbar />
          {children}
          <Footer locale={locale} />
        </LocaleProvider>
        <Script
          id="hs-script"
          src={`//js.hs-scripts.com/${process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID}.js`}
          strategy="afterInteractive"
        />
        <Script id="apollo-script" strategy="afterInteractive">
          {`function initApollo(){var n=Math.random().toString(36).substring(7),o=document.createElement("script");
          o.src="https://assets.apollo.io/micro/website-tracker/tracker.iife.js?nocache="+n,o.async=!0,o.defer=!0,
          o.onload=function(){window.trackingFunctions.onLoad({appId:"6aa41e70ba2fad001c6cbf36"})},
          document.head.appendChild(o)}initApollo();`}
        </Script>
      </body>
    </html>
  )
}
