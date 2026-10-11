import type { Illustration } from "./hand-drawn"

/** Las seis ilustraciones del home: tres dolores y tres piezas. Lienzo 400x300. */

const emptyWindows = [0, 72, 144].flatMap((dy, i) => [
  `M272 ${64 + dy} C272 ${60 + dy} 275 ${58 + dy} 279 ${58 + dy} L352 ${57 + dy + i} C357 ${57 + dy} 360 ${60 + dy} 360 ${64 + dy} L361 ${104 + dy} C361 ${108 + dy} 358 ${110 + dy} 354 ${110 + dy} L280 ${111 + dy - i} C275 ${111 + dy} 272 ${108 + dy} 272 ${104 + dy} Z`,
  `M273 ${71 + dy} L360 ${70 + dy}`,
  `M284 ${86 + dy} L284 ${98 + dy}`,
])

export const dolorAdopcion: Illustration = {
  label: "Una ventana de asistente llena de notas y tableros, y tres ventanas vacías que apuntan hacia ella",
  lines: [
    "M38 78 C36 70 42 64 50 64 L206 62 C215 62 220 67 220 76 L222 226 C222 235 217 240 208 240 L52 242 C43 242 38 237 38 228 Z",
    "M39 92 C90 90 160 91 221 90",
    "M51 78 L53 78",
    "M63 77 L65 77",
    "M75 78 L77 78",
    "M96 63 L92 44 L128 40 L131 62",
    "M101 52 L121 50",
    "M150 62 L146 34 L186 30 L190 60",
    "M156 44 L178 42",
    "M157 53 L172 52",
    "M56 110 L112 106 L115 146 L59 150 Z",
    "M66 120 L102 118",
    "M67 131 L94 130",
    "M130 152 L130 108",
    "M130 152 C150 151 175 151 198 150",
    "M144 151 L144 130",
    "M160 151 L160 118",
    "M176 150 L176 136",
    "M190 150 L190 112",
    "M58 172 L112 170",
    "M58 186 L104 185",
    "M58 200 L116 198",
    "M58 214 L96 213",
    ...emptyWindows,
    "M266 86 C250 84 240 96 232 112",
    "M232 112 L231 99",
    "M232 112 L244 107",
    "M266 158 C254 159 244 157 234 152",
    "M234 152 L244 148",
    "M234 152 L242 161",
    "M266 230 C252 226 242 210 235 194",
    "M235 194 L236 207",
    "M235 194 L246 199",
  ],
  accents: [
    { tone: "teal", rect: [134, 168, 46, 46, 7], at: 23 },
    {
      tone: "plum",
      rect: [322, 136, 30, 30, -6],
      at: 41,
      mark: "M331 146 C331 140 342 140 342 147 C342 151 337 151 337 156 M337 161 L337 161.5",
    },
  ],
}

export const dolorEscritura: Illustration = {
  label: "Un cuaderno abierto al que le llegan lápices desde todos lados, con renglones encimados y uno tachado",
  lines: [
    "M70 92 C110 82 160 84 200 98 C240 84 290 82 330 92 L332 232 C290 222 240 224 200 238 C160 224 110 222 68 232 Z",
    "M200 98 L200 238",
    "M88 122 C120 116 150 118 182 126",
    "M88 146 C120 140 150 142 182 150",
    "M88 170 C120 164 150 166 182 174",
    "M88 194 C120 188 150 190 182 198",
    "M218 126 C250 118 280 118 312 122",
    "M220 134 C250 144 285 122 314 138",
    "M218 154 L312 150",
    "M218 176 L312 172",
    "M222 180 L236 168 L246 182 L258 168 L270 182 L282 168 L296 182 L308 170",
    "M220 200 C250 194 285 196 312 200",
    // Lápiz desde arriba a la derecha.
    "M352 38 L300 98",
    "M364 48 L312 108",
    "M352 38 L364 48",
    "M300 98 L296 114 L312 108",
    // Lápiz desde abajo a la derecha.
    "M372 266 L322 214",
    "M362 276 L312 224",
    "M306 208 L322 214",
    "M306 208 L312 224",
    // Lápiz desde arriba a la izquierda.
    "M42 34 L100 92",
    "M30 46 L88 104",
    "M42 34 L30 46",
    "M100 92 L106 110 L88 104",
  ],
  accents: [
    { tone: "teal", rect: [140, 78, 40, 46, 5], at: 6 },
    { tone: "plum", rect: [355, 259, 22, 22, 44], at: 20 },
  ],
}

export const dolorFuga: Illustration = {
  label: "Un documento con el candado abierto sale de la empresa hacia burbujas de chat personales",
  lines: [
    // La empresa: un recinto con estantes, abierto a la derecha.
    "M150 40 L40 42 L40 262 L150 260",
    "M150 40 L150 104",
    "M150 206 L150 260",
    "M58 104 L132 103",
    "M66 103 L66 72 L82 72 L82 103",
    "M88 103 L88 62 L104 62 L104 103",
    "M110 103 L110 76 L124 76 L124 103",
    "M58 232 L132 231",
    "M66 231 L66 202 L84 202 L84 231",
    "M92 231 L92 192 L108 192 L108 231",
    // Estela del documento que sale.
    "M118 150 L144 146",
    "M112 166 L140 162",
    "M122 182 L146 178",
    // El documento, grande, cruzando la salida.
    "M168 118 L236 106 L250 190 L182 202 Z",
    "M184 132 L226 125",
    "M186 146 L230 139",
    "M188 160 L202 158",
    // Arco del candado: abierto, sin cerrar del lado derecho.
    "M213 162 L210 146 C207 128 236 124 239 140",
    // Burbujas de chat personales.
    "M300 70 C300 62 306 58 314 58 L356 58 C364 58 370 62 370 70 L370 92 C370 100 364 104 356 104 L326 104 L314 116 L316 104 L314 104 C306 104 300 100 300 92 Z",
    "M318 82 L320 82",
    "M334 82 L336 82",
    "M350 82 L352 82",
    "M292 188 C292 180 298 176 306 176 L350 176 C358 176 364 180 364 188 L364 208 C364 216 358 220 350 220 L318 220 L306 232 L308 220 L306 220 C298 220 292 216 292 208 Z",
    "M308 198 L310 198",
    "M326 198 L328 198",
    "M344 198 L346 198",
    // Flechas hacia afuera.
    "M256 128 C268 110 278 98 292 90",
    "M292 90 L280 90",
    "M292 90 L288 102",
    "M260 180 C272 186 280 192 286 200",
    "M286 200 L274 199",
    "M286 200 L284 188",
  ],
  accents: [
    { tone: "teal", rect: [205, 160, 40, 32, -8], at: 17, mark: "M225 171 L226 181" },
    { tone: "plum", rect: [350, 46, 24, 24, 8], at: 22 },
  ],
}

export const piezaBrain: Illustration = {
  label: "Un fichero con carpetas ordenadas del que salen dos hojas con un sello",
  lines: [
    "M82 152 L82 112 L96 112 L100 100 L138 100 L142 112 L318 112 L318 152",
    "M90 152 L90 126 L168 126 L172 114 L210 114 L214 126 L310 126 L310 152",
    "M98 152 L98 140 L236 140 L240 128 L278 128 L282 140 L302 140 L302 152",
    "M70 152 L330 152 L330 252 L70 252 Z",
    "M176 196 L176 210 L224 210 L224 196",
    "M90 174 L150 174",
    "M90 232 L310 232",
    // Flecha y hojas que salen.
    "M214 96 C222 80 232 70 244 64",
    "M244 64 L232 64",
    "M244 64 L240 76",
    "M254 42 L292 36 L298 86 L260 92 Z",
    "M264 54 L286 51",
    "M265 65 L288 62",
    "M266 76 L282 74",
    "M298 50 L338 50 L340 96 L300 96",
    "M308 84 L330 84",
  ],
  accents: [
    { tone: "teal", rect: [171, 110, 42, 18, -2], at: 2 },
    { tone: "plum", rect: [312, 56, 22, 22, -8], at: 15, mark: "M317 67 L322 72 L330 61" },
  ],
}

const checklistRows = [102, 142, 182].flatMap((y) => [
  `M122 ${y - 10} L142 ${y - 10} L142 ${y + 10} L122 ${y + 10} Z`,
  `M156 ${y} L270 ${y - 2}`,
  `M126 ${y} L131 ${y + 6} L140 ${y - 8}`,
])

export const piezaAgentes: Illustration = {
  label: "Una lista de tareas que se va tildando sola, con la última esperando la firma de una persona",
  lines: [
    "M110 62 L290 60 C296 60 300 64 300 70 L300 250 C300 256 296 260 290 260 L110 262 C104 262 100 258 100 252 L100 72 C100 66 104 62 110 62 Z",
    "M170 61 L170 46 L230 46 L230 60",
    "M184 46 C184 32 216 32 216 46",
    ...checklistRows,
    "M122 212 L142 212 L142 232 L122 232 Z",
    "M156 240 L262 238",
    "M164 232 C172 218 178 240 186 226 C192 216 198 238 208 228",
    // El agente trabajando: cursor y estela.
    "M316 150 L306 156",
    "M318 164 L308 172",
  ],
  accents: [
    { tone: "teal", rect: [322, 110, 44, 44, 7], at: 12, mark: "M335 122 L336 142 L342 137 L347 146 M335 122 L352 132 L342 137" },
    { tone: "plum", rect: [268, 208, 26, 26, -6], at: 15, mark: "M275 215 L287 227 M287 215 L275 227" },
  ],
}

const key = (x: number, y: number) => [
  `M${x - 5} ${y} C${x - 5} ${y - 6} ${x + 5} ${y - 6} ${x + 5} ${y} C${x + 5} ${y + 6} ${x - 5} ${y + 6} ${x - 5} ${y}`,
  `M${x} ${y + 6} L${x} ${y + 26}`,
  `M${x} ${y + 18} L${x + 6} ${y + 18}`,
  `M${x} ${y + 24} L${x + 5} ${y + 24}`,
]

export const piezaHerramientas: Illustration = {
  label: "Tres ventanas, correo, contactos y planilla, enchufadas a un mismo tablero, cada enchufe con su llave",
  lines: [
    "M150 112 L250 110 C256 110 260 114 260 120 L260 192 C260 198 256 202 250 202 L150 204 C144 204 140 200 140 194 L140 122 C140 116 144 112 150 112 Z",
    "M200 204 L200 244",
    "M168 244 L232 244",
    // Correo.
    "M30 112 L100 110 L100 172 L30 172 Z",
    "M30 112 L65 144 L100 110",
    "M100 150 L128 150",
    "M128 143 L140 143 L140 157 L128 157 Z",
    ...key(114, 172),
    // Contactos.
    "M165 22 L235 20 L235 72 L165 72 Z",
    "M179 40 C179 32 191 32 191 40 C191 48 179 48 179 40",
    "M200 36 L226 35",
    "M200 47 L220 46",
    "M176 60 L226 59",
    "M200 72 L200 98",
    "M193 98 L207 98 L207 111 L193 111 Z",
    // Planilla.
    "M300 112 L370 110 L370 172 L300 172 Z",
    "M300 132 L370 131",
    "M300 152 L370 151",
    "M324 111 L324 172",
    "M347 111 L347 172",
    "M300 150 L272 150",
    "M260 143 L272 143 L272 157 L260 157 Z",
    ...key(286, 172),
    // Llave del enchufe de arriba, acostada.
    "M222 80 C222 74 232 74 232 80 C232 86 222 86 222 80",
    "M232 80 L252 80",
    "M244 80 L244 86",
    "M250 80 L250 85",
  ],
  accents: [
    { tone: "teal", rect: [178, 135, 44, 44, 7], at: 3 },
    { tone: "plum", rect: [103, 200, 22, 22, -8], at: 11 },
  ],
}

export const homeIllustrations = {
  dolorAdopcion,
  dolorEscritura,
  dolorFuga,
  piezaBrain,
  piezaAgentes,
  piezaHerramientas,
}
