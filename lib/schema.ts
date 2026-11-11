import { proyectos } from "@/content/proyectos"
import { global } from "@/content/global"
import { footerContact } from "@/content/shared"
import { seo } from "@/content/seo"
import { EN_LIVE, pathFor, type Locale } from "@/lib/i18n"

export const organizationSchema = (locale: Locale) => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "INNOV.AS",
  url: "https://innov.as",
  logo: "https://innov.as/brand/png/innovas-horizontal-ink.png",
  description: global[locale].footerInstitutional.description,
  email: footerContact.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Buenos Aires",
    addressCountry: "AR",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    email: footerContact.email,
    url: `https://innov.as${pathFor("/contacto", locale)}`,
    availableLanguage: EN_LIVE ? ["es", "en"] : ["es"],
    areaServed: global[locale].schemaText.areaServed,
  },
  areaServed: { "@type": "Place", name: global[locale].schemaText.areaServed },
  sameAs: [footerContact.linkedin],
})

export const productSchema = (locale: Locale) => ({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: locale === "en" ? "AI Central" : "Central IA",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description: seo[locale]["/"].description,
  provider: { "@type": "Organization", name: "INNOV.AS", url: "https://innov.as" },
  areaServed: global[locale].schemaText.areaServed,
})

export function buildServiceCatalogSchema(locale: Locale) {
  const { solutionTypes } = proyectos[locale]
  return {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: global[locale].schemaText.serviceCatalogName,
    itemListElement: solutionTypes.items.map((item) => ({
      "@type": "Service",
      name: item.title,
      description: item.description,
      provider: { "@type": "Organization", name: "INNOV.AS" },
      areaServed: global[locale].schemaText.areaServed,
    })),
  }
}
