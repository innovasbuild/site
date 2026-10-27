import { BandaFoto } from "@/components/banda-foto"
import { control as c } from "@/content/home"

/** Control: foto a sangre con velo oscuro, la frase en grande y cuatro garantías. */
export function BandaControl() {
  return <BandaFoto kicker={c.kicker} frase={c.frase} intro={c.intro} foto={c.foto} items={c.items} />
}
