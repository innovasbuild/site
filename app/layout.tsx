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
      <Script id="gtm-script" strategy="beforeInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-TPB9XXZM');`}
      </Script>
      <body className="min-h-screen bg-paper text-ink font-sans antialiased selection:bg-teal/20">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TPB9XXZM"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <JsonLd data={organizationSchema} />
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
