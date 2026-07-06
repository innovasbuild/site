import Link from "next/link"
import { Linkedin } from "lucide-react"
import { footerColumns, footerInstitutional, footerContact, footerLegal } from "@/content/global"

export function Footer() {
  return (
    <footer className="border-t border-line bg-ink text-paper">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          <div>
            <Link href="/" className="font-display text-xl font-semibold text-paper">
              {footerInstitutional.name}
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-paper/60">
              {footerInstitutional.description}
            </p>
          </div>

          {footerColumns
            .filter((col) => col.heading)
            .map((col) => (
              <div key={col.heading}>
                <h4 className="font-mono text-xs uppercase tracking-wider text-paper/40">{col.heading}</h4>
                <ul className="mt-4 space-y-3">
                  {col.links?.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-sm text-paper/70 hover:text-paper">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider text-paper/40">Contacto</h4>
            <div className="mt-4 flex flex-col gap-3">
              <a href={`mailto:${footerContact.email}`} className="text-sm text-paper/70 hover:text-paper">
                {footerContact.email}
              </a>
              <a
                href={footerContact.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-sm text-paper/70 hover:text-paper"
              >
                <Linkedin className="h-4 w-4" /> LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-paper/10 pt-8 text-xs text-paper/40">{footerLegal}</div>
      </div>
    </footer>
  )
}
