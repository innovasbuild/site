import { solutionTypes } from "@/content/soluciones"

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "INNOV.AS",
  url: "https://innov.as",
  logo: "https://innov.as/innovas-logo.png",
  description:
    "Diseñamos, construimos y operamos plataformas de datos, software a medida y procesos con IA para organismos internacionales y empresas en Latinoamérica.",
  areaServed: { "@type": "Place", name: "Latinoamérica" },
  sameAs: ["https://www.linkedin.com/company/innov-as"],
}

export function buildServiceCatalogSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: "Servicios de transformación con IA — INNOV.AS",
    itemListElement: solutionTypes.items.map((item) => ({
      "@type": "Service",
      name: item.title,
      description: item.description,
      provider: { "@type": "Organization", name: "INNOV.AS" },
      areaServed: "Latinoamérica",
    })),
  }
}
