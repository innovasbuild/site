#!/usr/bin/env python3
"""Arma un .pptx de INNOV.AS a partir de un JSON estructurado.

Uso:
    python3 scripts/build_pptx.py contenido.json salida.pptx

Lienzo 16:9 de 1280x720 px (13,33 x 7,5 pulgadas). Todas las medidas están en px sobre ese
lienzo y salen de references/soportes/slides.md. El logo sale siempre de assets/logo/png/:
horizontal en portada y cierre, isotipo en el pie de cada slide de contenido, misma esquina.
Requiere python-pptx.

Esquema del JSON:

{
  "nombre_corto": "Deck ejemplo",            # pie de cada slide
  "slides": [
    {"tipo": "portada", "etiqueta": "PRIMERA CONVERSACIÓN", "titulo": "la IA de tu empresa,",
     "destacada": "de punta a punta", "bajada": "Empresa S.A. · 2026-10-30", "oscura": true},
    {"tipo": "contenido", "etiqueta": "01 · CONTEXTO", "titulo": "lo que vemos hoy",
     "puntos": ["uno", "dos"], "texto": "párrafo opcional"},
    {"tipo": "ab", "etiqueta": "02 · MANIFIESTO", "titulo": "hoy ──→ con INNOV.AS",
     "pares": [["A", "B"]], "a": "hoy", "b": "con INNOV.AS"},
    {"tipo": "contadores", "etiqueta": "07 · QUIÉNES SOMOS", "titulo": "el equipo detrás",
     "items": [["25", "años", "transformando organizaciones"]]},
    {"tipo": "camino", "etiqueta": "04 · PROCESO", "titulo": "un proceso, no un proyecto",
     "pasos": ["Primera conversación", "Radar", "Ola cero", "Olas", "Operación continua"], "actual": 2},
    {"tipo": "poster", "etiqueta": "06 · CONTROL", "titulo": "tu gente decide,",
     "destacada": "los agentes ejecutan", "oscura": true},
    {"tipo": "cierre", "titulo": "empecemos por", "destacada": "la primera conversación",
     "contacto": "hola@innov.as · innov.as"}
  ]
}

Reglas que el script hace cumplir: como máximo 2 slides oscuras (avisa y aclara la tercera),
un titular póster por slide, logo siempre desde archivo.
"""
from __future__ import annotations

import json
import sys
from pathlib import Path

from pptx import Presentation
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE
from pptx.enum.text import MSO_ANCHOR, PP_ALIGN
from pptx.util import Emu, Pt

SKILL = Path(__file__).resolve().parent.parent
PNG = SKILL / "assets/logo/png"

# Paleta de slides.md (pptx no lee CSS)
PAPER = RGBColor(0xF6, 0xF4, 0xEF)
PAPER_SOFT = RGBColor(0xEC, 0xEA, 0xE3)
INK = RGBColor(0x15, 0x19, 0x1A)
INK_SOFT = RGBColor(0x1F, 0x25, 0x26)
TEAL = RGBColor(0x0F, 0x6B, 0x60)
TEAL_DARK = RGBColor(0x5C, 0xC4, 0xB0)
PLUM = RGBColor(0x4F, 0x6B, 0x00)
LIMA = RGBColor(0xD4, 0xF3, 0x6B)
TAUPE = RGBColor(0xA3, 0xA6, 0x9F)

DISPLAY, SANS, MONO = "Newsreader", "Schibsted Grotesk", "IBM Plex Mono"

M = 64            # margen
TITLE_Y = 112     # altura fija del título en slides de contenido
LABEL_Y = 72      # etiqueta de sección, arriba del título
FOOT_Y = 720 - 48


def px(v: float) -> Emu:
    return Emu(int(v * 9525))


def pt_from_px(v: float) -> Pt:
    return Pt(v * 0.75)


class Deck:
    def __init__(self, nombre: str):
        self.prs = Presentation()
        self.prs.slide_width, self.prs.slide_height = px(1280), px(720)
        self.blank = self.prs.slide_layouts[6]
        self.nombre = nombre
        self.oscuras = 0
        self.n = 0

    # ------------------------------------------------------------ primitivas
    def slide(self, oscura=False):
        if oscura and self.oscuras >= 2:
            print("aviso: ya hay 2 slides oscuras; esta va sobre papel", file=sys.stderr)
            oscura = False
        self.oscuras += oscura
        s = self.prs.slides.add_slide(self.blank)
        bg = s.background.fill
        bg.solid()
        bg.fore_color.rgb = INK if oscura else PAPER
        self.n += 1
        return s, oscura

    def text(self, s, x, y, w, h, runs, size, family=SANS, color=INK, bold=False,
             align=PP_ALIGN.LEFT, anchor=MSO_ANCHOR.TOP, line=1.15, caps=False):
        """runs: str o lista de (texto, {italic, color, bold}). Una lista de listas = varios párrafos."""
        tb = s.shapes.add_textbox(px(x), px(y), px(w), px(h))
        tf = tb.text_frame
        tf.word_wrap = True
        tf.vertical_anchor = anchor
        for side in ("margin_left", "margin_right", "margin_top", "margin_bottom"):
            setattr(tf, side, 0)
        paras = runs if isinstance(runs, list) and runs and isinstance(runs[0], list) else [runs]
        for i, pr in enumerate(paras):
            p = tf.paragraphs[0] if i == 0 else tf.add_paragraph()
            p.alignment = align
            p.line_spacing = line
            items = [(pr, {})] if isinstance(pr, str) else pr
            for txt, opt in items:
                r = p.add_run()
                r.text = txt.upper() if caps else txt
                f = r.font
                f.name = opt.get("family", family)
                f.size = pt_from_px(opt.get("size", size))
                f.bold = opt.get("bold", bold)
                f.italic = opt.get("italic", False)
                f.color.rgb = opt.get("color", color)
        return tb

    def rect(self, s, x, y, w, h, fill, line=None):
        sh = s.shapes.add_shape(MSO_SHAPE.RECTANGLE, px(x), px(y), px(w), px(h))
        sh.fill.solid()
        sh.fill.fore_color.rgb = fill
        if line is None:
            sh.line.fill.background()
        else:
            sh.line.color.rgb = line
            sh.line.width = Pt(0.75)
        # sin estilo de tema: así no hereda sombra difusa (la marca no usa sombras con blur)
        st = sh._element.find("{http://schemas.openxmlformats.org/presentationml/2006/main}style")
        if st is not None:
            sh._element.remove(st)
        return sh

    def hline(self, s, x, y, w, color=INK, weight=1):
        ln = s.shapes.add_connector(1, px(x), px(y), px(x + w), px(y))
        ln.line.color.rgb = color
        ln.line.width = Pt(weight * 0.75)
        return ln

    def logo(self, s, archivo, x, y, w=None, h=None):
        f = PNG / archivo
        if not f.exists():
            sys.exit(f"falta {f}: el deck no se arma sin el archivo del logo")
        return s.shapes.add_picture(str(f), px(x), px(y), px(w) if w else None, px(h) if h else None)

    def pie(self, s, oscura):
        """Isotipo abajo a la derecha (siempre la misma esquina), nombre y número a la izquierda."""
        col = PAPER if oscura else INK
        self.text(s, M, FOOT_Y, 600, 20, f"{self.nombre}  ·  {self.n:02d}", 14, MONO, TAUPE if not oscura else TAUPE)
        self.logo(s, "innovas-isotipo-paper.png" if oscura else "innovas-isotipo-teal.png", 1280 - M - 22, FOOT_Y - 8, h=28)

    def etiqueta(self, s, txt, oscura=False, y=LABEL_Y):
        if txt:
            self.text(s, M, y, 900, 22, txt, 15, MONO, TEAL_DARK if oscura else TEAL, caps=True)

    def titulo(self, s, titulo, destacada=None, oscura=False, size=52, y=TITLE_Y, w=1152, h=140, poster=False):
        col = PAPER if oscura else INK
        acento = LIMA if oscura else TEAL
        runs = [(titulo.rstrip() + (" " if destacada else ""), {})]
        if destacada:
            runs.append((destacada, {"italic": True, "color": acento}))
        self.text(s, M, y, w, h, runs, size, DISPLAY, col, bold=poster, line=0.98 if poster else 1.05)

    # ------------------------------------------------------------ tipos de slide
    def portada(self, d):
        s, osc = self.slide(d.get("oscura", True))
        if osc:
            self.logo(s, "innovas-horizontal-dark.png", M - 26, M - 24, w=220)
        else:
            # bloque lateral teal a sangre (único bloque de color a sangre del deck)
            self.rect(s, 1280 - 307, 0, 307, 720, TEAL)
            self.logo(s, "innovas-horizontal-ink.png", M - 26, M - 24, w=220)
        w = 1152 if osc else 860
        self.etiqueta(s, d.get("etiqueta"), osc, y=330)
        self.titulo(s, d["titulo"], d.get("destacada"), osc, size=84, y=362, w=w, h=230, poster=True)
        if d.get("bajada"):
            self.text(s, M, 720 - M - 26, w, 26, d["bajada"], 20, SANS, PAPER if osc else INK)

    def contenido(self, d):
        s, osc = self.slide(d.get("oscura", False))
        col = PAPER if osc else INK
        self.etiqueta(s, d.get("etiqueta"), osc)
        self.titulo(s, d["titulo"], d.get("destacada"), osc)
        y = 280
        if d.get("texto"):
            self.text(s, M, y, 900, 90, d["texto"], 24, SANS, col, line=1.3)
            y += 110
        if d.get("puntos"):
            paras = [[("──→  ", {"family": MONO, "color": TEAL_DARK if osc else TEAL, "size": 20}), (p, {})] for p in d["puntos"]]
            self.text(s, M, y, 1000, 300, paras, 22, SANS, col, line=1.5)
        self.pie(s, osc)

    def ab(self, d):
        s, osc = self.slide(False)
        self.etiqueta(s, d.get("etiqueta"))
        self.titulo(s, d["titulo"], d.get("destacada"))
        y0, colw, gap = 270, 500, 152
        self.text(s, M, y0, colw, 22, d.get("a", "hoy"), 15, MONO, TAUPE, caps=True)
        self.text(s, M + colw + gap, y0, colw, 22, d.get("b", "con INNOV.AS"), 15, MONO, TEAL, caps=True)
        self.hline(s, M, y0 + 34, 1152, INK, 1.5)
        row = min(84, 300 // max(1, len(d["pares"])))
        for i, (a, b) in enumerate(d["pares"]):
            y = y0 + 50 + i * row
            self.text(s, M, y, colw, row - 10, a, 22, SANS, INK, line=1.2)
            self.text(s, M + colw + 16, y, gap - 32, 30, "──→", 22, MONO, TEAL, align=PP_ALIGN.CENTER)
            self.text(s, M + colw + gap, y, colw, row - 10, b, 22, SANS, INK, bold=True, line=1.2)
            self.hline(s, M, y + row - 8, 1152, TAUPE, 1)
        self.pie(s, False)

    def contadores(self, d):
        s, osc = self.slide(False)
        self.etiqueta(s, d.get("etiqueta"))
        self.titulo(s, d["titulo"], d.get("destacada"))
        items = d["items"][:4]
        n = len(items)
        gap = 24
        w = (1152 - gap * (n - 1)) / n
        sola = n == 1
        for i, it in enumerate(items):
            cifra, unidad, contexto = (list(it) + ["", ""])[:3]
            x = M + i * (w + gap)
            self.rect(s, x, 290, w, 300, PAPER_SOFT)
            self.text(s, x + 28, 316, w - 56, 130, cifra, 96 if sola else 64, DISPLAY, INK)
            self.text(s, x + 28, 440, w - 56, 30, unidad, 22, SANS, INK, bold=True)
            self.text(s, x + 28, 474, w - 56, 90, contexto, 18, SANS, INK, line=1.25)
        self.pie(s, False)

    def camino(self, d):
        s, osc = self.slide(False)
        self.etiqueta(s, d.get("etiqueta"))
        self.titulo(s, d["titulo"], d.get("destacada"))
        pasos = d["pasos"]
        n = len(pasos)
        actual = d.get("actual", -1)
        w = 1152 / n
        y = 350
        self.hline(s, M, y, 1152, INK, 1.5)
        for i, p in enumerate(pasos):
            x = M + i * w
            on = i == actual
            dot = self.rect(s, x, y - 9, 18, 18, TEAL if on else PAPER, line=None if on else INK)
            self.text(s, x, y + 28, w - 16, 22, f"{i + 1:02d}" + ("  ──→" if i < n - 1 else ""), 15, MONO, TEAL if on else TAUPE)
            self.text(s, x, y + 58, w - 24, 90, p, 22, SANS, INK, bold=on, line=1.2)
        if d.get("texto"):
            self.text(s, M, 540, 900, 60, d["texto"], 20, SANS, INK, line=1.3)
        self.pie(s, False)

    def poster(self, d):
        s, osc = self.slide(d.get("oscura", False))
        self.etiqueta(s, d.get("etiqueta"), osc, y=250)
        self.titulo(s, d["titulo"], d.get("destacada"), osc, size=96, y=282, h=260, poster=True)
        self.pie(s, osc)

    def cierre(self, d):
        s, osc = self.slide(d.get("oscura", False))
        if not osc:
            self.rect(s, 1280 - 307, 0, 307, 720, TEAL)
        self.etiqueta(s, d.get("etiqueta", "SIGUIENTE PASO"), osc, y=250)
        self.titulo(s, d["titulo"], d.get("destacada"), osc, size=84, y=282, w=860, h=230, poster=True)
        if d.get("contacto"):
            self.text(s, M, 540, 860, 26, d["contacto"], 20, MONO, PAPER if osc else INK)
        self.logo(s, "innovas-horizontal-dark.png" if osc else "innovas-horizontal-ink.png", M - 26, 720 - M - 64, w=200)


def build(data: dict, out: Path):
    deck = Deck(data.get("nombre_corto", "INNOV.AS"))
    for d in data["slides"]:
        getattr(deck, d["tipo"])(d)
    deck.prs.core_properties.author = "INNOV.AS"
    deck.prs.core_properties.title = data.get("nombre_corto", "")
    deck.prs.save(out)
    return out


if __name__ == "__main__":
    if len(sys.argv) != 3:
        sys.exit(__doc__)
    print(build(json.loads(Path(sys.argv[1]).read_text(encoding="utf-8")), Path(sys.argv[2])))
