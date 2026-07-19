import type { Metadata } from "next"
import type { SeoMeta } from "@/content/types"

const siteName = "INNOV.AS"
const defaultImage = "/images/home-hero.png"

export function buildMetadata(path: string, seo: SeoMeta, options?: { noindex?: boolean }): Metadata {
  return {
    title: seo.title,
    description: seo.description,
    alternates: { canonical: path },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: path,
      siteName,
      locale: "es_AR",
      type: "website",
      images: [{ url: defaultImage, width: 1200, height: 630, alt: seo.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: [defaultImage],
    },
    ...(options?.noindex ? { robots: { index: false, follow: false } } : {}),
  }
}
