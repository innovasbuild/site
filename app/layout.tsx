import type { Metadata } from "next"
import Script from "next/script"
import "./globals.css"
import { cn } from "@/lib/utils"
import { fraunces, inter, spaceMono } from "./fonts"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { JsonLd } from "@/components/json-ld"
import { seo } from "@/content/seo"
import { buildMetadata } from "@/lib/metadata"
import { organizationSchema } from "@/lib/schema"

export const metadata: Metadata = {
  metadataBase: new URL("https://innov.as"),
  ...buildMetadata("/", seo["/"]),
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={cn(fraunces.variable, inter.variable, spaceMono.variable)}>
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
      <body className="min-h-screen bg-paper text-ink font-sans antialiased selection:bg-teal/20">
        <JsonLd data={organizationSchema} />
        <Navbar />
        {children}
        <Footer />
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
