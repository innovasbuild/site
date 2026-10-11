import { solutionTypes } from "@/content/proyectos"
import { footerInstitutional } from "@/content/global"
import { seo } from "@/content/seo"

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "INNOV.AS",
  url: "https://innov.as",
  logo: "https://innov.as/innovas-logo.png",
  description: footerInstitutional.description,
  areaServed: { "@type": "Place", name: "Latinoamérica" },
  sameAs: ["https://www.linkedin.com/company/innov-as"],
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
