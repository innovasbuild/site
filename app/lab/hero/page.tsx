import type { Metadata } from "next"
import { HeroLab } from "@/components/lab/hero-lab"

export const metadata: Metadata = {
  title: "Lab: hero con trama de puntos",
  robots: { index: false, follow: false },
}

export default function HeroLabPage() {
  return <HeroLab />
}
