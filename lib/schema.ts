import { solutionTypes } from "@/content/proyectos"
import { footerInstitutional, footerContact } from "@/content/global"
import { seo } from "@/content/seo"

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "INNOV.AS",
  url: "https://innov.as",
  logo: "https://innov.as/brand/png/innovas-horizontal-ink.png",
  description: footerInstitutional.description,
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
    url: "https://innov.as/contacto",
    availableLanguage: ["es"],
    areaServed: "Latinoamérica",
  },
  areaServed: { "@type": "Place", name: "Latinoamérica" },
  sameAs: [footerContact.linkedin],
}

export const productSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Central IA",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description: seo["/"].description,
  provider: { "@type": "Organization", name: "INNOV.AS", url: "https://innov.as" },
  areaServed: "Latinoamérica",
}

export function buildServiceCatalogSchema() {
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
