/**
 * Shader único de las escenas animadas (laboratorio).
 * Un vocabulario de formas compartido por todas las escenas:
 *   agente = bot con ojos que mira al cursor · persona = esfera · herramienta = bloque
 *   brain = esfera de conocimiento · cables y anillos = conexiones y permisos.
 * Tres estilos de render sobre las mismas escenas: 0 volumen, 1 trama, 2 constelación.
 * Materiales: 1 neutro · 2 teal (plataforma) · 3 plum (gente) · 4 apagado · 5 cable.
 */
export const SCENES = ["dolorAdopcion", "dolorEscritura", "dolorFuga", "piezaBrain", "piezaAgentes", "piezaHerramientas"] as const
export type SceneName = (typeof SCENES)[number]

export const STYLES = ["volumen", "trama", "constelacion"] as const
export type SceneStyle = (typeof STYLES)[number]

export const SCENE_SHADER = /* wgsl */ `
struct Params {
  res: vec2f,
  mouse: vec2f,
  time: f32,
  scene: f32,
  style: f32,
  hover: f32,
  bg: vec3f,
  paper: vec3f,
  ink: vec3f,
  inkSoft: vec3f,
  teal: vec3f,
  plum: vec3f,
  taupe: vec3f,
  tealDark: vec3f,
  plumDark: vec3f,
}
@group(0) @binding(0) var<uniform> params: Params;

var<private> gD: f32;
var<private> gMat: f32;
var<private> gLocal: vec3f;
var<private> gEye: f32;
var<private> gMouse: vec2f;
var<private> gYaw: f32;
var<private> gPitch: f32;

const PI = 3.14159265;

fn rotY(p: vec3f, a: f32) -> vec3f { let c = cos(a); let s = sin(a); return vec3f(c * p.x - s * p.z, p.y, s * p.x + c * p.z); }
fn rotX(p: vec3f, a: f32) -> vec3f { let c = cos(a); let s = sin(a); return vec3f(p.x, c * p.y - s * p.z, s * p.y + c * p.z); }
fn rotZ(p: vec3f, a: f32) -> vec3f { let c = cos(a); let s = sin(a); return vec3f(c * p.x - s * p.y, s * p.x + c * p.y, p.z); }

fn sdBox(p: vec3f, b: vec3f, r: f32) -> f32 {
  let q = abs(p) - b;
  return length(max(q, vec3f(0.0))) + min(max(q.x, max(q.y, q.z)), 0.0) - r;
}
fn sdTorus(p: vec3f, R: f32, r: f32) -> f32 { return length(vec2f(length(p.xz) - R, p.y)) - r; }
fn sdSeg(p: vec3f, a: vec3f, b: vec3f, r: f32) -> f32 {
  let pa = p - a; let ba = b - a;
  let h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
  return length(pa - ba * h) - r;
}

fn hash31(p: vec3f) -> f32 {
  var q = fract(p * 0.1031);
  q += dot(q, q.zyx + 31.32);
  return fract((q.x + q.y) * q.z);
}
fn hash21(p: vec2f) -> f32 { return hash31(vec3f(p, 7.0)); }
fn noise3(p: vec3f) -> f32 {
  let i = floor(p); let f = fract(p); let u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(mix(hash31(i), hash31(i + vec3f(1.0, 0.0, 0.0)), u.x), mix(hash31(i + vec3f(0.0, 1.0, 0.0)), hash31(i + vec3f(1.0, 1.0, 0.0)), u.x), u.y),
    mix(mix(hash31(i + vec3f(0.0, 0.0, 1.0)), hash31(i + vec3f(1.0, 0.0, 1.0)), u.x), mix(hash31(i + vec3f(0.0, 1.0, 1.0)), hash31(i + vec3f(1.0, 1.0, 1.0)), u.x), u.y),
    u.z);
}

fn put(d: f32, mat: f32, lp: vec3f, eye: f32) {
  if (d < gD) { gD = d; gMat = mat; gLocal = lp; gEye = eye; }
}

// Hacia dónde mira algo ubicado en c: el cursor, o un vaivén suave si no hay cursor.
fn lookAt(c: vec3f) -> vec2f {
  let t = params.time;
  let idle = vec2f(sin(t * 0.7 + c.x * 1.7) * 0.3, sin(t * 0.5 + c.y * 2.3) * 0.18);
  let v = tanh((gMouse - c.xy) * 0.45) * vec2f(0.8, 0.9);
  return mix(idle, v, params.hover);
}

// Agente: cuerpo redondeado con ojos en la cara frontal. shape 0 píldora, 1 esfera, 2 rombo.
fn bot(p: vec3f, c: vec3f, s: f32, shape: f32, mat: f32, phase: f32, antenna: f32) {
  let cc = c + vec3f(0.0, sin(params.time * 1.4 + phase) * 0.05 * s, 0.0);
  let lk = lookAt(cc);
  var lp = rotY(p - cc, lk.x * 0.5);
  lp = rotX(lp, lk.y * 0.35);
  var d: f32;
  if (shape < 0.5) {
    d = sdBox(lp, vec3f(0.34, 0.22, 0.2) * s, 0.27 * s);
  } else if (shape < 1.5) {
    d = length(lp * vec3f(1.0, 1.08, 1.0)) - 0.52 * s;
  } else {
    d = sdBox(rotZ(lp, PI * 0.25), vec3f(0.27, 0.27, 0.2) * s, 0.15 * s);
  }
  put(d, mat, lp, s);
  if (antenna > 0.5) {
    let top = vec3f(0.0, 0.74 * s, 0.0);
    put(sdSeg(lp, vec3f(0.0, 0.4 * s, 0.0), top, 0.028 * s), 5.0, lp, 0.0);
    put(length(lp - top) - 0.1 * s, 3.0, lp - top, 0.0);
  }
}

// 0 · La IA quedó en una o dos personas: una persona con su agente, el resto apagado.
fn sceneAdopcion(p: vec3f) {
  let t = params.time;
  let person = vec3f(-0.62, -0.3, 0.0);
  put(length(p - person) - 0.36, 3.0, p - person, 0.0);
  bot(p, vec3f(0.25, -0.02, 0.3), 0.66, 0.0, 2.0, 0.0, 0.0);
  for (var i = 0; i < 3; i++) {
    let a = t * 0.8 + f32(i) * 2.094;
    let c = vec3f(-0.18 + cos(a) * 1.05, -0.1 + sin(a) * 0.2, 0.1 + sin(a) * 0.55);
    put(length(p - c) - 0.055, 2.0, p - c, 0.0);
  }
  var others = array<vec3f, 5>(
    vec3f(1.4, -0.6, -0.5), vec3f(1.55, 0.55, -1.0), vec3f(-1.5, 0.6, -0.8),
    vec3f(0.7, 0.9, -1.3), vec3f(-1.45, -0.68, -0.3));
  for (var i = 0; i < 5; i++) {
    let c = others[i] + vec3f(0.0, sin(t * 0.9 + f32(i) * 1.3) * 0.03, 0.0);
    put(length(p - c) - 0.25, 4.0, p - c, 0.0);
  }
}

// 1 · Cualquiera le enseña a la IA: el conocimiento se deforma con lo que le tiran.
fn sceneEscritura(p: vec3f) {
  let t = params.time;
  let amp = 0.07 + 0.07 * (0.5 + 0.5 * sin(t * 0.6));
  let n = noise3(p * 2.6 + vec3f(t * 0.45, t * 0.2, 0.0)) - 0.5;
  put((length(p) - 0.74 + n * amp * 2.0) * 0.7, 2.0, p, 0.0);
  for (var i = 0; i < 6; i++) {
    let fi = f32(i);
    let a = t * 0.32 + fi * 1.047;
    var c = vec3f(cos(a) * 1.6, sin(a * 2.0 + fi) * 0.22, sin(a) * 0.8);
    c.y += c.z * 0.25;
    put(length(p - c) - 0.17, select(1.0, 3.0, i == 0), p - c, 0.0);
    let f = fract(t * 0.45 + fi * 0.37);
    let k = mix(c, vec3f(0.0), f);
    put(length(p - k) - 0.06 * (1.0 - f * 0.4), 4.0, p - k, 0.0);
  }
}

// 2 · Lo confidencial en cuentas personales: paquetes que salen de la empresa hacia cuentas sueltas.
fn sceneFuga(p: vec3f) {
  let t = params.time;
  let home = vec3f(-1.05, -0.08, 0.0);
  put(sdBox(rotY(p - home, 0.35 + sin(t * 0.3) * 0.1), vec3f(0.36), 0.14), 1.0, rotY(p - home, 0.35), 0.0);
  let a = vec3f(1.38, 0.55, -0.2);
  let b = vec3f(1.48, -0.58, 0.25);
  put(sdBox(rotZ(p - a, 0.15), vec3f(0.2, 0.1, 0.08), 0.12), 3.0, p - a, 0.0);
  put(sdBox(rotZ(p - b, -0.12), vec3f(0.2, 0.1, 0.08), 0.12), 3.0, p - b, 0.0);
  for (var i = 0; i < 6; i++) {
    let fi = f32(i);
    let f = fract(t * 0.32 + fi / 6.0);
    let goal = select(b, a, i % 2 == 0);
    let start = home + vec3f(0.5, 0.0, 0.0);
    var k = mix(start, goal, f);
    k.y += sin(f * PI) * select(-0.3, 0.38, i % 2 == 0);
    let s = 0.085 * smoothstep(0.0, 0.12, f) * smoothstep(1.0, 0.82, f);
    let lp = rotY(rotX(p - k, t + fi), t * 1.3 + fi);
    put(sdBox(lp, vec3f(s * 0.6), s * 0.4), 2.0, lp, 0.0);
  }
}

// 3 · Brain: el conocimiento al centro, la gente y los agentes en órbita conectados.
fn sceneBrain(p: vec3f) {
  let t = params.time;
  let w = sin(p.x * 7.0 + t) * sin(p.y * 7.0 - t * 0.7) * sin(p.z * 7.0) * 0.018;
  put(length(p) - 0.72 + w, 2.0, p, 0.0);
  let pr = rotX(rotZ(p, 0.3), 0.42);
  put(sdTorus(pr, 1.35, 0.016), 5.0, pr, 0.0);
  for (var i = 0; i < 5; i++) {
    let a = t * 0.28 + f32(i) * 1.2566;
    let node = vec3f(cos(a) * 1.35, 0.0, sin(a) * 1.35);
    put(length(pr - node) - 0.15, select(1.0, 3.0, i == 2), pr - node, 0.0);
    put(sdSeg(pr, node, vec3f(0.0), 0.012), 5.0, pr, 0.0);
  }
}

// 4 · Agentes: tres trabajadores distintos, el del medio con antena plum.
fn sceneAgentes(p: vec3f) {
  bot(p, vec3f(-1.38, -0.18, -0.2), 0.64, 1.0, 1.0, 1.3, 0.0);
  bot(p, vec3f(0.0, -0.02, 0.25), 0.92, 0.0, 2.0, 0.0, 1.0);
  bot(p, vec3f(1.38, -0.18, -0.2), 0.64, 2.0, 1.0, 2.6, 0.0);
}

// 5 · Herramientas: el hub al centro, cuatro herramientas conectadas, una con permiso.
fn sceneHerramientas(p: vec3f) {
  let t = params.time;
  put(sdBox(rotY(p, t * 0.18), vec3f(0.28), 0.17), 2.0, rotY(p, t * 0.18), 0.0);
  var tools = array<vec3f, 4>(vec3f(-1.3, 0.55, -0.2), vec3f(1.3, 0.55, -0.3), vec3f(-1.25, -0.62, 0.15), vec3f(1.28, -0.6, 0.1));
  for (var i = 0; i < 4; i++) {
    let fi = f32(i);
    let c = tools[i] + vec3f(0.0, sin(t * 0.8 + fi * 1.7) * 0.04, 0.0);
    let lp = rotY(rotX(p - c, 0.3), t * 0.25 + fi);
    put(sdBox(lp, vec3f(0.17), 0.08), 1.0, lp, 0.0);
    put(sdSeg(p, c, vec3f(0.0), 0.02), 5.0, p, 0.0);
    let f = fract(t * 0.45 + fi * 0.25);
    let k = mix(c, vec3f(0.0), f);
    put(length(p - k) - 0.055 * smoothstep(1.0, 0.75, f), 2.0, p - k, 0.0);
    if (i == 1) {
      let rp = rotX(p - c, PI * 0.5 + sin(t * 0.6) * 0.2);
      put(sdTorus(rp, 0.42, 0.035), 3.0, rp, 0.0);
    }
  }
}

fn map(pw: vec3f) -> f32 {
  gD = 1e5; gMat = 0.0; gEye = 0.0;
  let p = rotX(rotY(pw, gYaw), gPitch);
  let s = params.scene;
  if (s < 0.5) { sceneAdopcion(p); }
  else if (s < 1.5) { sceneEscritura(p); }
  else if (s < 2.5) { sceneFuga(p); }
  else if (s < 3.5) { sceneBrain(p); }
  else if (s < 4.5) { sceneAgentes(p); }
  else { sceneHerramientas(p); }
  return gD;
}

fn calcNormal(p: vec3f) -> vec3f {
  let e = vec2f(1.0, -1.0) * 0.0015;
  return normalize(e.xyy * map(p + e.xyy) + e.yyx * map(p + e.yyx) + e.yxy * map(p + e.yxy) + e.xxx * map(p + e.xxx));
}

fn softShadow(ro: vec3f, rd: vec3f) -> f32 {
  var res = 1.0;
  var t = 0.03;
  for (var i = 0; i < 22; i++) {
    let h = map(ro + rd * t);
    res = min(res, 9.0 * h / t);
    t += clamp(h, 0.03, 0.3);
    if (res < 0.002 || t > 4.0) { break; }
  }
  return clamp(res, 0.0, 1.0);
}

fn calcAO(p: vec3f, n: vec3f) -> f32 {
  var occ = 0.0;
  var sca = 1.0;
  for (var i = 0; i < 4; i++) {
    let h = 0.02 + 0.11 * f32(i);
    occ += (h - map(p + n * h)) * sca;
    sca *= 0.8;
  }
  return clamp(1.0 - 2.2 * occ, 0.0, 1.0);
}

// x: distancia recorrida · y: distancia mínima · z: material más cercano · w: 1 si pegó.
fn march(ro: vec3f, rd: vec3f) -> vec4f {
  var t = 0.0;
  var md = 1e5;
  var mm = 0.0;
  for (var i = 0; i < 90; i++) {
    let d = map(ro + rd * t);
    if (d < md) { md = d; mm = gMat; }
    if (d < 0.0015) { return vec4f(t, md, mm, 1.0); }
    t += d;
    if (t > 10.0) { break; }
  }
  return vec4f(t, md, mm, 0.0);
}

fn matLight(m: f32) -> vec3f {
  if (m < 1.5) { return mix(params.paper, vec3f(1.0), 0.2); }
  if (m < 2.5) { return params.teal; }
  if (m < 3.5) { return params.plum; }
  if (m < 4.5) { return mix(params.taupe, params.paper, 0.3); }
  return params.ink;
}
fn matDot(m: f32) -> vec3f {
  if (m < 1.5) { return params.ink; }
  if (m < 2.5) { return params.teal; }
  if (m < 3.5) { return params.plum; }
  if (m < 4.5) { return params.taupe; }
  return params.ink;
}
fn matDark(m: f32) -> vec3f {
  if (m < 1.5) { return params.paper * 0.9; }
  if (m < 2.5) { return params.tealDark; }
  if (m < 3.5) { return params.plumDark; }
  if (m < 4.5) { return params.taupe * 0.85; }
  return params.taupe * 0.7;
}

// Cara de agente sobre su frente: x visor oscuro, y ojos encendidos (con parpadeo).
fn face(lp: vec3f, s: f32) -> vec2f {
  if (s <= 0.0 || lp.z < 0.08 * s) { return vec2f(0.0); }
  let aa = 0.014 * s;
  let vq = abs(lp.xy - vec2f(0.0, 0.03 * s)) - vec2f(0.2, 0.08) * s;
  let vd = length(max(vq, vec2f(0.0))) + min(max(vq.x, vq.y), 0.0) - 0.08 * s;
  let visor = 1.0 - smoothstep(-aa, aa, vd);
  let blink = select(1.0, 0.15, fract(params.time * 0.21 + s * 3.1) > 0.965);
  var eye = 0.0;
  for (var k = 0; k < 2; k++) {
    let e = vec2f(select(-0.115, 0.115, k == 1) * s, 0.035 * s);
    let q = (lp.xy - e) / vec2f(0.048 * s, 0.066 * s * blink);
    eye = max(eye, 1.0 - smoothstep(0.8, 1.0, length(q)));
  }
  return vec2f(visor, eye * visor);
}

struct Shade { col: vec3f, hit: f32, mat: f32, visor: f32, eye: f32, base: vec3f }

const LIGHT = vec3f(-0.45, 0.85, 0.55);
const FOCAL = 3.3;

fn eyeGlow() -> vec3f { return mix(params.tealDark, params.paper, 0.55); }

fn shadeLight(ro: vec3f, rd: vec3f) -> Shade {
  var o: Shade;
  let L = normalize(LIGHT);
  let h = march(ro, rd);
  if (h.w < 0.5) {
    var bg = params.bg;
    if (rd.y < 0.0) {
      let tp = (-1.2 - ro.y) / rd.y;
      let gp = ro + rd * tp;
      let sh = softShadow(gp + vec3f(0.0, 0.01, 0.0), normalize(vec3f(-0.25, 1.0, 0.3)));
      let fade = 1.0 - smoothstep(1.5, 3.5, length(gp.xz));
      bg *= mix(1.0, mix(0.82, 1.0, sh), fade);
    }
    o.col = bg; o.hit = 0.0; o.mat = 0.0; o.visor = 0.0; o.eye = 0.0; o.base = bg;
    return o;
  }
  let pos = ro + rd * h.x;
  let n = calcNormal(pos);
  map(pos);
  let mat = gMat; let lp = gLocal; let eyeS = gEye;
  let base = matLight(mat);
  let dif = clamp(dot(n, L), 0.0, 1.0);
  let sh = softShadow(pos + n * 0.01, L);
  let occ = calcAO(pos, n);
  let hemi = 0.55 + 0.45 * n.y;
  let fres = pow(1.0 - clamp(dot(n, -rd), 0.0, 1.0), 3.0);
  var col = base * (0.5 * hemi * occ + 0.62 * dif * sh);
  col += mix(params.paper, base, 0.3) * fres * 0.25 * occ;
  let spec = pow(clamp(dot(n, normalize(L - rd)), 0.0, 1.0), 60.0) * sh;
  col += vec3f(spec * 0.12);
  let fc = face(lp, eyeS);
  col = mix(col, params.ink * 0.9 + vec3f(spec * 0.25), fc.x);
  col = mix(col, eyeGlow(), fc.y);
  o.col = col; o.hit = 1.0; o.mat = mat; o.visor = fc.x; o.eye = fc.y; o.base = base;
  return o;
}

fn lum(c: vec3f) -> f32 { return dot(c, vec3f(0.299, 0.587, 0.114)); }

@fragment fn fs_main(@location(0) uv: vec2f) -> @location(0) vec4f {
  let res = params.res;
  let px = uv * res;
  let t = params.time;

  // Mouse en coordenadas del mundo (plano z = 0) y leve giro de toda la escena.
  let ms = (params.mouse * res - 0.5 * res) / res.y * vec2f(2.0, -2.0);
  gMouse = ms * (5.25 / FOCAL);
  gYaw = clamp(ms.x, -2.0, 2.0) * 0.12 * params.hover + sin(t * 0.25) * 0.08;
  gPitch = -clamp(ms.y, -1.5, 1.5) * 0.06 * params.hover;

  let ro = vec3f(0.0, 0.75, 5.2);
  let ww = normalize(vec3f(0.0, -0.05, 0.0) - ro);
  let uu = normalize(cross(ww, vec3f(0.0, 1.0, 0.0)));
  let vv = cross(uu, ww);
  let mousePx = params.mouse * res;
  let cursor = (1.0 - smoothstep(0.0, 120.0, distance(px, mousePx))) * params.hover;

  // 1 · Trama: semitono sobre papel, el mismo lenguaje que el hero.
  if (params.style > 0.5 && params.style < 1.5) {
    let cell = 6.0;
    let center = (floor(px / cell) + 0.5) * cell;
    let s = (center - 0.5 * res) / res.y * vec2f(2.0, -2.0);
    let rd = normalize(s.x * uu + s.y * vv + FOCAL * ww);
    let sh = shadeLight(ro, rd);
    var r: f32;
    var ink: vec3f;
    if (sh.hit > 0.5) {
      // tono relativo al color del material: luz = punto chico, sombra = punto lleno
      let tone = clamp(1.0 - lum(sh.col) / lum(sh.base), 0.0, 1.0);
      r = cell * 0.5 * (0.2 + 0.95 * tone);
      ink = matDot(sh.mat);
      ink = mix(ink, params.ink, sh.visor);
      r = mix(r, cell * 0.62, sh.visor);
      r = mix(r, cell * 0.12, sh.eye);
      ink = mix(ink, params.teal, sh.eye);
    } else {
      let dark = clamp(1.0 - lum(sh.col) / lum(params.bg), 0.0, 1.0);
      r = cell * 0.5 * (0.1 + 1.15 * sqrt(dark));
      ink = mix(params.taupe, params.ink, smoothstep(0.08, 0.4, dark) * 0.7);
    }
    r *= 1.0 + 0.5 * cursor;
    let m = 1.0 - smoothstep(r - 0.6, r + 0.6, length(px - center));
    return vec4f(mix(params.bg, ink, m), 1.0);
  }

  let s = (px - 0.5 * res) / res.y * vec2f(2.0, -2.0);
  let rd = normalize(s.x * uu + s.y * vv + FOCAL * ww);

  // 2 · Constelación: las formas hechas de puntos de luz sobre tinta.
  if (params.style > 1.5) {
    var col = mix(params.inkSoft, params.ink, smoothstep(0.2, 1.6, length(s)));
    let dc = floor(px / 24.0);
    let dh = hash21(dc);
    if (dh > 0.84) {
      let dp = (dc + 0.5 + (vec2f(hash21(dc + 3.1), hash21(dc + 7.7)) - 0.5) * 0.6) * 24.0;
      let tw = 0.5 + 0.5 * sin(t * 1.3 + dh * 40.0);
      col += params.taupe * 0.4 * tw * (1.0 - smoothstep(0.4, 1.3, distance(px, dp)));
    }
    let h = march(ro, rd);
    col += matDark(h.z) * exp(-h.y * 7.0) * 0.32;
    if (h.w > 0.5) {
      let pos = ro + rd * h.x;
      let n = calcNormal(pos);
      map(pos);
      let mat = gMat; let lp = gLocal; let eyeS = gEye;
      let base = matDark(mat);
      let L = normalize(LIGHT);
      let dif = 0.4 + 0.6 * clamp(dot(n, L), 0.0, 1.0);
      let fres = pow(1.0 - clamp(dot(n, -rd), 0.0, 1.0), 2.0);
      let q = lp * 15.0;
      let id = floor(q);
      let jit = vec3f(hash31(id), hash31(id + 1.7), hash31(id + 3.3)) - 0.5;
      let f = fract(q) - 0.5 + jit * 0.3;
      let rad = 0.32 + 0.08 * sin(t * 2.2 + hash31(id) * 6.28);
      let dotM = 1.0 - smoothstep(rad * 0.4, rad, length(f));
      col = mix(col, base * 0.28 * dif, 0.9);
      col += base * dotM * dif * (1.6 + cursor * 1.0);
      col += base * fres * 0.7;
      let fc = face(lp, eyeS);
      col = mix(col, params.ink * 0.6, fc.x);
      col = mix(col, eyeGlow() * 1.15, fc.y);
    }
    col += params.tealDark * cursor * 0.06;
    return vec4f(col, 1.0);
  }

  // 0 · Volumen: formas mate con luz suave y sombra de contacto.
  let sh = shadeLight(ro, rd);
  var col = sh.col;
  if (sh.hit > 0.5) {
    col += mix(params.paper, sh.base, 0.5) * cursor * 0.1 * (1.0 - sh.visor);
  }
  return vec4f(col, 1.0);
}
`
