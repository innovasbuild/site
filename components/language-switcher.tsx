"use client"

import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { EN_LIVE, LOCALE_COOKIE, counterpart, locales, type Locale } from "@/lib/i18n"
import { global } from "@/content/global"
import { useLocale } from "@/components/locale-provider"

const NAMES: Record<Locale, string> = { es: "ES", en: "EN" }

/** ES / EN: el idioma actual resaltado, el otro es un enlace al par de la página. Guarda la elección en la cookie. */
export function LanguageSwitcher({ className, onDark }: { className?: string; onDark?: boolean }) {
  const locale = useLocale()
  const pathname = usePathname()
  if (!EN_LIVE) return null

  const current = onDark ? "text-teal-dark" : "text-teal"
  const other = onDark ? "text-paper/70 hover:text-paper" : "text-ink/60 hover:text-ink"

  return (
    <span
      role="group"
      aria-label={global[locale].languageSwitchLabel}
      className={cn("inline-flex items-center gap-1.5 font-mono text-xs tracking-wide", className)}
    >
      {locales.map((l, i) => (
        <span key={l} className="inline-flex items-center gap-1.5">
          {i > 0 && <span aria-hidden className="opacity-40">/</span>}
          {l === locale ? (
            <span aria-current="true" className={cn("font-bold", current)}>
              {NAMES[l]}
            </span>
          ) : (
            <a
              href={counterpart(pathname, l)}
              hrefLang={l}
              lang={l}
              onClick={(e) => {
                const secure = window.location.protocol === "https:" ? "; secure" : ""
                document.cookie = `${LOCALE_COOKIE}=${l}; path=/; max-age=31536000; samesite=lax${secure}`
                // Clic con modificador o botón del medio: el navegador abre el enlace como siempre (la cookie ya quedó).
                if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
                e.preventDefault()
                window.location.assign(counterpart(pathname, l) + window.location.search + window.location.hash)
              }}
              className={cn("transition-colors", other)}
            >
              {NAMES[l]}
            </a>
          )}
        </span>
      ))}
    </span>
  )
}
