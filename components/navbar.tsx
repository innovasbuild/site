"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { navLinks, navCta } from "@/content/global"

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-baseline gap-1.5 font-display text-xl font-bold text-ink">
          innov.as
          <span className="font-mono text-xs font-normal text-teal">[A→B]</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-teal",
                  isActive ? "text-teal" : "text-ink-70"
                )}
              >
                {link.label}
              </Link>
            )
          })}
          <Link
            href={navCta.href}
            className="rounded bg-teal px-5 py-2 text-sm font-bold text-on-brand transition-transform hover:-translate-y-0.5 hover:shadow-teal"
          >
            {navCta.label}
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="text-ink md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Abrir menú"
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {isMobileMenuOpen && (
        <div className="border-t border-line bg-paper px-6 py-6 md:hidden">
          <div className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-medium text-ink hover:text-teal"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={navCta.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-fit rounded bg-teal px-5 py-2 text-sm font-bold text-on-brand"
            >
              {navCta.label}
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
