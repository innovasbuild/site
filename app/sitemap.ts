import type { MetadataRoute } from "next"
import { seo } from "@/content/seo"

const baseUrl = "https://innov.as"

export default function sitemap(): MetadataRoute.Sitemap {
  return Object.keys(seo)
    .filter((route) => !route.startsWith("/desde-adentro"))
    .map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
    }))
}
