import { BandaFoto } from "@/components/banda-foto"
import { home } from "@/content/home"
import { lang } from "next/root-params"
import type { Locale } from "@/lib/i18n"

/** Control: foto a sangre con velo oscuro, la frase en grande y cuatro garantías. */
export async function BandaControl() {
  const locale = (await lang()) as Locale
  const { control: c } = home[locale]
  return <BandaFoto kicker={c.kicker} frase={c.frase} intro={c.intro} foto={c.foto} items={c.items} />
}
