import type { MetadataRoute } from "next"
import { seo } from "@/content/seo"

const baseUrl = "https://innov.as"

export default function sitemap(): MetadataRoute.Sitemap {
  // /precios queda fuera mientras no esté publicada.
  return Object.keys(seo).filter((route) => route !== "/precios").map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }))
}
