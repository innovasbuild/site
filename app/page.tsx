import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { Work } from "@/components/work"
import { ContactForm } from "@/components/contact-form"

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <Work />
      <ContactForm />
    </main>
  )
}
