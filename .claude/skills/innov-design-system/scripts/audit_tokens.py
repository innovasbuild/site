#!/usr/bin/env python3
"""
audit_tokens.py — detecta valores de marca hardcodeados fuera del contrato de tokens.

Uso:
    python3 audit_tokens.py <archivo_o_carpeta> [<archivo_o_carpeta> ...]

Busca en archivos .tsx/.jsx/.ts/.js/.css:
  1. Colores hex sueltos (#fff, #0F6B60, #B23A48AA, etc.)
  2. font-family / fontFamily con nombres de fuente literales (en vez de var(--font-...)
     o clases Tailwind como font-display/font-sans/font-mono)

No es un linter genérico de CSS: es una verificación puntual de la regla "cero hex ni
fuentes hardcodeadas en JSX" del skill innov-design-system. Archivos de tokens
(globals.css, tailwind.config.ts) están exentos por diseño — ahí SÍ van los valores
literales, son la fuente de verdad.

Exit code 0 si no hay violaciones, 1 si encuentra alguna.
"""

import re
import sys
from pathlib import Path

CODE_EXTENSIONS = {".tsx", ".jsx", ".ts", ".js", ".css"}
EXEMPT_FILENAMES = {"globals.css", "tailwind.config.ts", "tailwind.config.js"}

HEX_PATTERN = re.compile(r"#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b")
FONT_FAMILY_PATTERN = re.compile(
    r"font-?[Ff]amily\s*[:=]\s*[\"'`]([^\"'`]+)[\"'`]"
)
# Fuentes que SÍ están en el contrato de tokens — si aparecen literal es sospechoso
# pero mucho menos grave que una fuente ajena al sistema.
KNOWN_TOKEN_FONTS = {"fraunces", "inter", "space mono", "georgia", "serif",
                     "system-ui", "-apple-system", "sans-serif", "ui-monospace",
                     "sf mono", "monospace"}


def iter_target_files(paths):
    for raw in paths:
        p = Path(raw)
        if p.is_dir():
            for ext in CODE_EXTENSIONS:
                yield from p.rglob(f"*{ext}")
        elif p.is_file():
            yield p


def audit_file(path: Path):
    violations = []
    if path.name in EXEMPT_FILENAMES:
        return violations

    try:
        text = path.read_text(encoding="utf-8", errors="ignore")
    except OSError:
        return violations

    for i, line in enumerate(text.splitlines(), start=1):
        stripped = line.strip()
        if stripped.startswith("//") or stripped.startswith("*"):
            continue

        for m in HEX_PATTERN.finditer(line):
            violations.append(
                (i, "hex-hardcodeado", m.group(0), line.strip()[:120])
            )

        for m in FONT_FAMILY_PATTERN.finditer(line):
            family = m.group(1).strip().lower()
            # separá por comas por si es una pila de fallback completa
            first = family.split(",")[0].strip().strip("'\"")
            if first not in KNOWN_TOKEN_FONTS or "var(" not in line:
                violations.append(
                    (i, "font-family-hardcodeada", m.group(1), line.strip()[:120])
                )

    return violations


def main():
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)

    targets = sys.argv[1:]
    files = list(iter_target_files(targets))

    if not files:
        print(f"No se encontraron archivos {sorted(CODE_EXTENSIONS)} en: {targets}")
        sys.exit(0)

    total_violations = 0
    for f in files:
        violations = audit_file(f)
        if violations:
            print(f"\n{f}")
            for line_no, kind, value, snippet in violations:
                print(f"  L{line_no} [{kind}] {value!r}  ::  {snippet}")
            total_violations += len(violations)

    print()
    if total_violations:
        print(f"❌ {total_violations} violación(es) encontradas en {len(files)} archivo(s) revisados.")
        print("   Reemplazá por var(--color-...)/var(--font-...) o su clase Tailwind mapeada")
        print("   (bg-paper, text-ink, text-teal, font-display, font-sans, font-mono, etc.).")
        print("   Si el valor no existe todavía como token, agregalo primero a globals.css.")
        sys.exit(1)
    else:
        print(f"✅ Sin violaciones en {len(files)} archivo(s) revisados.")
        sys.exit(0)


if __name__ == "__main__":
    main()
