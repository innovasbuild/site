#!/usr/bin/env python3
"""Arma un .docx de INNOV.AS a partir de un JSON estructurado.

Uso:
    python3 scripts/build_docx.py contenido.json salida.docx
    python3 scripts/build_docx.py --plantilla salida.docx   # solo estilos, portada y pie, sin contenido

El documento sale con fondo blanco, A4, márgenes de 25mm, logo horizontal en la portada,
isotipo en el encabezado de las páginas interiores y pie con nombre, fecha y página.
Todos los valores salen de references/soportes/documentos.md. Requiere python-docx.

Esquema del JSON (todas las claves salvo "titulo" son opcionales):

{
  "titulo": "la IA de tu empresa,",       # minúscula, parte normal del título
  "destacada": "de punta a punta",          # palabra o frase en itálica teal
  "etiqueta": "PROPUESTA · OLA CERO",       # mono caja alta sobre el título
  "bajada": "Para Empresa S.A.",
  "fecha": "2026-10-30",
  "nombre_corto": "Propuesta ola cero",     # va en el pie; si falta, se arma con el título
  "portada": true,                          # false para one-pager, contrato o anexo
  "bloques": [
    {"tipo": "etiqueta", "texto": "01 · RESUMEN"},
    {"tipo": "h1", "texto": "resumen ejecutivo"},
    {"tipo": "h2", "texto": "Alcance"},
    {"tipo": "p", "texto": "Texto con **negrita** opcional."},
    {"tipo": "lista", "items": ["uno", "dos"]},
    {"tipo": "ab", "pares": [["la IA quedó en dos personas", "toda la empresa trabaja con IA y con permisos"]]},
    {"tipo": "contadores", "items": [["25", "años", "transformando organizaciones"]]},
    {"tipo": "tabla", "encabezado": ["Ola", "Plazo"], "filas": [["Cero", "4 semanas"]]},
    {"tipo": "destacado", "texto": "Cuadro sobre #ECEAE3"},
    {"tipo": "nota", "texto": "Fuente: ..."},
    {"tipo": "salto"}
  ]
}
"""
from __future__ import annotations

import json
import re
import sys
from pathlib import Path

from docx import Document
from docx.enum.section import WD_SECTION
from docx.enum.style import WD_STYLE_TYPE
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.enum.text import WD_ALIGN_PARAGRAPH, WD_BREAK
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.shared import Mm, Pt, RGBColor

SKILL = Path(__file__).resolve().parent.parent
LOGO = SKILL / "assets/logo/png/innovas-horizontal-ink.png"
ISOTIPO = SKILL / "assets/logo/png/innovas-isotipo-teal.png"

# Paleta de documentos.md (los .docx no leen CSS: estos son los únicos hex permitidos, y salen de ahí)
INK = RGBColor(0x15, 0x19, 0x1A)
TEAL = RGBColor(0x0F, 0x6B, 0x60)
PLUM = RGBColor(0x4F, 0x6B, 0x00)
PAPER_SOFT = "ECEAE3"
TAUPE = "A3A69F"
INK_HEX = "15191A"
TEAL_HEX = "0F6B60"

DISPLAY = "Newsreader"
SANS = "Schibsted Grotesk"
MONO = "IBM Plex Mono"


# ---------------------------------------------------------------- utilidades de bajo nivel

def set_font(target, family: str):
    """Fija la familia en los cuatro slots de rFonts (si no, Word cae a la del tema)."""
    rpr = target.element.get_or_add_rPr() if hasattr(target, "element") else target
    rfonts = rpr.find(qn("w:rFonts"))
    if rfonts is None:
        rfonts = OxmlElement("w:rFonts")
        rpr.insert(0, rfonts)
    for slot in ("w:ascii", "w:hAnsi", "w:cs", "w:eastAsia"):
        rfonts.set(qn(slot), family)
    for slot in ("w:asciiTheme", "w:hAnsiTheme", "w:cstheme", "w:eastAsiaTheme"):
        if rfonts.get(qn(slot)) is not None:
            del rfonts.attrib[qn(slot)]


def style_font(style, family: str, size: float, color: RGBColor = INK, bold=False, italic=False, caps=False):
    f = style.font
    f.name = family
    f.size = Pt(size)
    f.color.rgb = color
    f.bold = bold
    f.italic = italic
    f.all_caps = caps
    set_font(style.element.get_or_add_rPr(), family)


def shade(cell_or_par, hex_fill: str):
    el = cell_or_par._tc if hasattr(cell_or_par, "_tc") else cell_or_par._p
    pr = el.get_or_add_tcPr() if hasattr(el, "get_or_add_tcPr") else el.get_or_add_pPr()
    shd = OxmlElement("w:shd")
    shd.set(qn("w:val"), "clear")
    shd.set(qn("w:color"), "auto")
    shd.set(qn("w:fill"), hex_fill)
    pr.append(shd)


def cell_borders(cell, color: str, sides=("top", "bottom"), size=6):
    tcpr = cell._tc.get_or_add_tcPr()
    borders = OxmlElement("w:tcBorders")
    for side in ("top", "left", "bottom", "right"):
        b = OxmlElement(f"w:{side}")
        if side in sides:
            b.set(qn("w:val"), "single")
            b.set(qn("w:sz"), str(size))
            b.set(qn("w:color"), color)
        else:
            b.set(qn("w:val"), "nil")
        borders.append(b)
    tcpr.append(borders)


def fixed_widths(tbl, widths):
    """Anchos fijos de columna (Word ignora cell.width si la tabla es autofit)."""
    tbl.autofit = False
    tblpr = tbl._tbl.tblPr
    layout = OxmlElement("w:tblLayout")
    layout.set(qn("w:type"), "fixed")
    tblpr.append(layout)
    grid = tbl._tbl.tblGrid
    for gc, w in zip(grid.findall(qn("w:gridCol")), widths):
        gc.set(qn("w:w"), str(int(w.twips)))
    for row in tbl.rows:
        for c, w in zip(row.cells, widths):
            c.width = w


def cell_padding(cell, mm=3):
    tcpr = cell._tc.get_or_add_tcPr()
    mar = OxmlElement("w:tcMar")
    for side in ("top", "left", "bottom", "right"):
        m = OxmlElement(f"w:{side}")
        m.set(qn("w:w"), str(int(Mm(mm).twips)))
        m.set(qn("w:type"), "dxa")
        mar.append(m)
    tcpr.append(mar)


def no_split(tbl):
    for row in tbl.rows:
        trpr = row._tr.get_or_add_trPr()
        cs = OxmlElement("w:cantSplit")
        cs.set(qn("w:val"), "true")
        trpr.append(cs)


def par_rule(par, color: str = INK_HEX, side="bottom", size=6, space=4):
    ppr = par._p.get_or_add_pPr()
    pbdr = OxmlElement("w:pBdr")
    b = OxmlElement(f"w:{side}")
    b.set(qn("w:val"), "single")
    b.set(qn("w:sz"), str(size))
    b.set(qn("w:space"), str(space))
    b.set(qn("w:color"), color)
    pbdr.append(b)
    ppr.append(pbdr)


def field(run, instr: str):
    """Inserta un campo de Word (PAGE, NUMPAGES)."""
    for kind, text in (("begin", None), (None, instr), ("end", None)):
        if kind:
            fc = OxmlElement("w:fldChar")
            fc.set(qn("w:fldCharType"), kind)
            run._r.append(fc)
        else:
            it = OxmlElement("w:instrText")
            it.set(qn("xml:space"), "preserve")
            it.text = f" {text} "
            run._r.append(it)


def rich(par, text: str, style_run=None):
    """Texto con **negrita** mínima. No interpreta otro markdown."""
    for i, chunk in enumerate(re.split(r"\*\*", text)):
        if not chunk:
            continue
        r = par.add_run(chunk)
        if i % 2:
            r.bold = True
        if style_run:
            style_run(r)
    return par


# ---------------------------------------------------------------- estilos

def build_styles(doc: Document):
    st = doc.styles

    normal = st["Normal"]
    style_font(normal, SANS, 10.5)
    normal.paragraph_format.space_after = Pt(6)
    normal.paragraph_format.line_spacing = 1.25

    # Que el tema no meta Calibri/Aptos por la puerta de atrás
    rpr_default = doc.styles.element.find(qn("w:docDefaults")).find(qn("w:rPrDefault")).find(qn("w:rPr"))
    set_font(rpr_default, SANS)

    title = st["Title"]
    style_font(title, DISPLAY, 28)
    title.paragraph_format.space_after = Pt(10)
    title.paragraph_format.line_spacing = 1.0
    _strip_border(title)

    h1 = st["Heading 1"]
    style_font(h1, DISPLAY, 19)
    h1.paragraph_format.space_before = Pt(18)
    h1.paragraph_format.space_after = Pt(6)
    h1.paragraph_format.keep_with_next = True

    h2 = st["Heading 2"]
    style_font(h2, SANS, 13.5, bold=True)
    h2.paragraph_format.space_before = Pt(12)
    h2.paragraph_format.space_after = Pt(4)
    h2.paragraph_format.keep_with_next = True

    sub = st["Subtitle"]
    style_font(sub, SANS, 13)
    sub.paragraph_format.space_after = Pt(4)

    def custom(name, family, size, color=INK, bold=False, caps=False, base="Normal"):
        s = st[name] if name in [x.name for x in st] else st.add_style(name, WD_STYLE_TYPE.PARAGRAPH)
        s.base_style = st[base]
        style_font(s, family, size, color, bold=bold, caps=caps)
        return s

    et = custom("Etiqueta", MONO, 8.5, TEAL, bold=False, caps=True)
    et.paragraph_format.space_before = Pt(14)
    et.paragraph_format.space_after = Pt(2)
    et.paragraph_format.keep_with_next = True

    nota = custom("Nota", SANS, 8)
    nota.paragraph_format.space_after = Pt(2)

    tabla = custom("Texto de tabla", SANS, 9)
    tabla.paragraph_format.space_after = Pt(0)
    tabla.paragraph_format.line_spacing = 1.1

    cifra = custom("Cifra", DISPLAY, 30)
    cifra.paragraph_format.space_after = Pt(0)
    cifra.paragraph_format.line_spacing = 1.0

    mono = custom("Notación", MONO, 9.5)
    mono.paragraph_format.space_after = Pt(3)

    for name in ("List Bullet", "List Number"):
        style_font(st[name], SANS, 10.5)


def _strip_border(style):
    ppr = style.element.find(qn("w:pPr"))
    if ppr is not None:
        b = ppr.find(qn("w:pBdr"))
        if b is not None:
            ppr.remove(b)


# ---------------------------------------------------------------- página

def setup_page(section):
    section.page_width, section.page_height = Mm(210), Mm(297)
    for side in ("left_margin", "right_margin", "top_margin", "bottom_margin"):
        setattr(section, side, Mm(25))
    section.header_distance = Mm(12)
    section.footer_distance = Mm(12)


def header_footer(doc, section, nombre: str, fecha: str, con_portada: bool):
    section.different_first_page_header_footer = con_portada

    # Encabezado interior: isotipo de 9mm de alto
    hp = section.header.paragraphs[0]
    hp.text = ""
    hp.add_run().add_picture(str(ISOTIPO), height=Mm(9))

    # Pie: nombre · fecha a la izquierda, página a la derecha (tabulación derecha)
    fp = section.footer.paragraphs[0]
    fp.text = ""
    fp.style = doc.styles["Nota"]
    usable = section.page_width - section.left_margin - section.right_margin
    fp.paragraph_format.tab_stops.add_tab_stop(usable, alignment=2)  # 2 = derecha
    fp.add_run(f"{nombre} · {fecha}\t")
    r = fp.add_run()
    field(r, "PAGE")
    fp.add_run(" / ")
    field(fp.add_run(), "NUMPAGES")
    par_rule(fp, TAUPE, side="top", size=4, space=6)


def portada(doc: Document, data: dict):
    doc.add_paragraph().add_run().add_picture(str(LOGO), width=Mm(48))
    for _ in range(6):
        doc.add_paragraph()
    if data.get("etiqueta"):
        doc.add_paragraph(data["etiqueta"], style="Etiqueta")
    titulo(doc, data)
    if data.get("bajada"):
        doc.add_paragraph(data["bajada"], style="Subtitle")
    if data.get("fecha"):
        doc.add_paragraph(data["fecha"], style="Notación")
    doc.add_paragraph().add_run().add_break(WD_BREAK.PAGE)


def titulo(doc: Document, data: dict):
    p = doc.add_paragraph(style="Title")
    p.add_run(data["titulo"].rstrip() + (" " if data.get("destacada") else ""))
    if data.get("destacada"):
        r = p.add_run(data["destacada"])
        r.italic = True
        r.font.color.rgb = TEAL


# ---------------------------------------------------------------- bloques

def bloque(doc: Document, b: dict):
    t = b["tipo"]
    if t == "etiqueta":
        doc.add_paragraph(b["texto"], style="Etiqueta")
    elif t == "h1":
        doc.add_paragraph(b["texto"], style="Heading 1")
    elif t == "h2":
        doc.add_paragraph(b["texto"], style="Heading 2")
    elif t == "p":
        rich(doc.add_paragraph(), b["texto"])
    elif t == "nota":
        doc.add_paragraph(b["texto"], style="Nota")
    elif t == "lista":
        for it in b["items"]:
            rich(doc.add_paragraph(style="List Number" if b.get("numerada") else "List Bullet"), it)
    elif t == "ab":
        ab(doc, b["pares"], b.get("a", "hoy"), b.get("b", "con INNOV.AS"))
    elif t == "contadores":
        contadores(doc, b["items"])
    elif t == "tabla":
        tabla(doc, b["encabezado"], b["filas"])
    elif t == "destacado":
        tbl = doc.add_table(rows=1, cols=1)
        c = tbl.cell(0, 0)
        shade(c, PAPER_SOFT)
        cell_borders(c, PAPER_SOFT, sides=())
        cell_padding(c, 4)
        fixed_widths(tbl, (Mm(160),))
        no_split(tbl)
        c.paragraphs[0].text = ""
        rich(c.paragraphs[0], b["texto"])
        doc.add_paragraph()
    elif t == "salto":
        doc.add_paragraph().add_run().add_break(WD_BREAK.PAGE)
    else:
        raise ValueError(f"tipo de bloque desconocido: {t}")


def ab(doc, pares, a_label, b_label):
    tbl = doc.add_table(rows=len(pares) + 1, cols=3)
    tbl.alignment = WD_TABLE_ALIGNMENT.LEFT
    widths = (Mm(72), Mm(16), Mm(72))
    fixed_widths(tbl, widths)
    no_split(tbl)
    head = (a_label.upper(), "", b_label.upper())
    for j, txt in enumerate(head):
        c = tbl.cell(0, j)
        c.width = widths[j]
        p = c.paragraphs[0]
        p.style = "Etiqueta"
        p.paragraph_format.space_before = Pt(0)
        p.text = txt
        cell_borders(c, INK_HEX, sides=("bottom",))
    for i, (a, b) in enumerate(pares, start=1):
        for j, txt in enumerate((a, "──→", b)):
            c = tbl.cell(i, j)
            c.width = widths[j]
            p = c.paragraphs[0]
            p.style = "Notación" if j == 1 else "Texto de tabla"
            p.text = txt
            if j == 1:
                p.alignment = WD_ALIGN_PARAGRAPH.CENTER
                p.runs[0].font.color.rgb = TEAL
            cell_borders(c, TAUPE, sides=("bottom",), size=4)
    doc.add_paragraph()


def contadores(doc, items):
    tbl = doc.add_table(rows=1, cols=len(items))
    fixed_widths(tbl, [Mm(160 / len(items))] * len(items))
    no_split(tbl)
    for j, it in enumerate(items):
        cifra, unidad, contexto = (list(it) + ["", ""])[:3]
        c = tbl.cell(0, j)
        shade(c, PAPER_SOFT)
        cell_borders(c, "FFFFFF", sides=("left", "right"), size=24)
        cell_padding(c, 3)
        p = c.paragraphs[0]
        p.style = "Cifra"
        p.text = cifra
        q = c.add_paragraph(style="Texto de tabla")
        r = q.add_run(unidad)
        r.bold = True
        if contexto:
            c.add_paragraph(contexto, style="Texto de tabla")
    doc.add_paragraph()


def tabla(doc, encabezado, filas):
    tbl = doc.add_table(rows=len(filas) + 1, cols=len(encabezado))
    for j, h in enumerate(encabezado):
        c = tbl.cell(0, j)
        p = c.paragraphs[0]
        p.style = "Texto de tabla"
        r = p.add_run(h)
        r.bold = True
        r.font.color.rgb = TEAL
        cell_borders(c, TEAL_HEX, sides=("bottom",), size=8)
    # Fila de encabezado marcada como tal (repetición y accesibilidad)
    trpr = tbl.rows[0]._tr.get_or_add_trPr()
    th = OxmlElement("w:tblHeader")
    th.set(qn("w:val"), "true")
    trpr.append(th)
    for i, fila in enumerate(filas, start=1):
        for j, v in enumerate(fila):
            c = tbl.cell(i, j)
            c.paragraphs[0].style = "Texto de tabla"
            rich(c.paragraphs[0], str(v))
            cell_borders(c, TAUPE, sides=("bottom",), size=4)
    doc.add_paragraph()


# ---------------------------------------------------------------- armado

def build(data: dict, out: Path):
    for f in (LOGO, ISOTIPO):
        if not f.exists():
            sys.exit(f"falta el logo {f}: el documento no se arma sin el archivo del logo")
    doc = Document()
    build_styles(doc)
    sec = doc.sections[0]
    setup_page(sec)
    con_portada = data.get("portada", True)
    nombre = data.get("nombre_corto") or (data["titulo"] + " " + data.get("destacada", "")).strip()
    fecha = data.get("fecha", "")
    header_footer(doc, sec, nombre, fecha, con_portada)

    if con_portada:
        portada(doc, data)
    else:
        doc.add_paragraph().add_run().add_picture(str(LOGO), width=Mm(36))
        if data.get("etiqueta"):
            doc.add_paragraph(data["etiqueta"], style="Etiqueta")
        titulo(doc, data)
        if data.get("bajada"):
            doc.add_paragraph(data["bajada"], style="Subtitle")

    for b in data.get("bloques", []):
        bloque(doc, b)

    core = doc.core_properties
    core.title = nombre
    core.author = "INNOV.AS"
    core.comments = "Generado con innov-design-system / build_docx.py"
    doc.save(out)
    return out


def main(argv):
    if len(argv) == 3 and argv[1] == "--plantilla":
        data = {
            "titulo": "título del documento,",
            "destacada": "palabra destacada",
            "etiqueta": "TIPO DE DOCUMENTO · CLIENTE",
            "bajada": "Bajada o destinatario",
            "fecha": "AAAA-MM-DD",
            "nombre_corto": "Nombre del documento",
            "bloques": [
                {"tipo": "etiqueta", "texto": "01 · SECCIÓN"},
                {"tipo": "h1", "texto": "título 1 en minúscula"},
                {"tipo": "p", "texto": "Cuerpo en Schibsted Grotesk 10.5pt. Usar siempre los estilos con nombre: Título, Título 1, Título 2, Etiqueta, Nota, Texto de tabla, Cifra y Notación."},
                {"tipo": "h2", "texto": "Título 2"},
                {"tipo": "p", "texto": "Texto."},
            ],
        }
        build(data, Path(argv[2]))
        return
    if len(argv) != 3:
        sys.exit(__doc__)
    data = json.loads(Path(argv[1]).read_text(encoding="utf-8"))
    print(build(data, Path(argv[2])))


if __name__ == "__main__":
    main(sys.argv)
