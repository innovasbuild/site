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
    areaServed: "Latinoamérica",
  },
  areaServed: { "@type": "Place", name: "Latinoamérica" },
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
  areaServed: "Latinoamérica",
})

export function buildServiceCatalogSchema(locale: Locale) {
  const { solutionTypes } = proyectos[locale]
  return {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: "Proyectos a medida de INNOV.AS",
    itemListElement: solutionTypes.items.map((item) => ({
      "@type": "Service",
      name: item.title,
      description: item.description,
      provider: { "@type": "Organization", name: "INNOV.AS" },
      areaServed: "Latinoamérica",
    })),
  }
}
