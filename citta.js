// La città interna come paesaggio: un diorama della conoscenza. Le colline sono dove le tavole si accumulano, il terreno
// coltivato (il giardino) avanza giorno dopo giorno come una muffa verso dove le tavole sono più fitte, le strade nascono
// tra le sale più legate come le reti di una muffa che collega il cibo. Le sale sono radure di tavole in piedi, disposte
// dal curatore che le abita. In piazza la tavola più amata, resa in rilievo. Niente modelli: solo le immagini e il codice che fa il suolo. Gli abitanti sono le figure di Porto Vecchio.
// Nessun edificio: le architetture sono metafore della crescita, non oggetti. Motore: il three di Porto Vecchio (globale).
(async function () {
  'use strict'
  const D = await (await fetch('citta.json', { cache: 'no-store' })).json()
  const esc = t => String(t ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]))
  const nomeDi = id => D.abitanti.find(a => a.id === id)?.nome ?? id
  const da = n => n.replace(/^il /, 'dal ').replace(/^lo /, 'dallo ').replace(/^la /, 'dalla ').replace(/^l'/, "dall'").replace(/^chi /, 'da chi ')
  let z0 = 917; const caso = () => { z0 = (z0 * 1664525 + 1013904223) >>> 0; return z0 / 4294967296 }
  const posDi = new Map(D.punti.map(p => [p.id, p]))
  const K = D.costruito ?? { costruzioni: [], nomiVie: {}, coltivato: [] }
  const costr = K.costruzioni ?? []
  // i territori respirano: ognuno sulla sua collina, con il prato attorno. I centri si scostano finché tra uno e l'altro
  // c'è aria; le tavole si raccolgono attorno al loro centro; tutto il resto (piazza, luoghi, case, sentieri) segue
  // lo spostamento dei territori vicini, come un tessuto che si allarga.
  {
    const Qs = D.quartieri ?? [], C0 = Qs.map(q => { const ps = D.punti.filter(p => p.q === q.id); const n = ps.length || 1; return { id: q.id, x: ps.length ? ps.reduce((s, p) => s + p.x, 0) / n : q.x, y: ps.length ? ps.reduce((s, p) => s + p.y, 0) / n : q.y, n, r: 12 + Math.sqrt(n) * 3.4 } })
    const P = C0.map(c => ({ ...c, x0: c.x, y0: c.y }))
    for (let it = 0; it < 240; it++) { for (let i = 0; i < P.length; i++) for (let j = i + 1; j < P.length; j++) { const a = P[i], b = P[j], dx = b.x - a.x, dy = b.y - a.y, d = Math.hypot(dx, dy) || 1, m = a.r + b.r + 70; if (d < m) { const k = (m - d) / 2 / d * 0.6; a.x -= dx * k; a.y -= dy * k; b.x += dx * k; b.y += dy * k } }
      for (const c of P) { c.x += (c.x0 - c.x) * 0.01; c.y += (c.y0 - c.y) * 0.01 } }
    const del = new Map(P.map(c => [c.id, [c.x - c.x0, c.y - c.y0, c]]))
    const campoSp = (x, y) => { let sx = 0, sy = 0, sw = 1e-6; for (const c of P) { const w = Math.exp(-((x - c.x0) ** 2 + (y - c.y0) ** 2) / (2 * 90 * 90)) * (c.r + 10); sx += (c.x - c.x0) * w; sy += (c.y - c.y0) * w; sw += w } return [sx / sw, sy / sw] }
    const sposta = o => { if (!o || o.x == null) return; const [dx, dy] = campoSp(o.x, o.y); o.x += dx; o.y += dy }
    for (const p of D.punti) { const d = del.get(p.q); if (!d) { sposta(p); continue } const c = d[2]; p.x = c.x + (p.x - c.x0) * 0.6; p.y = c.y + (p.y - c.y0) * 0.6 }
    for (const q of Qs) { const d = del.get(q.id); if (d) { q.x += d[0]; q.y += d[1] } }
    sposta(D.piazza)
    for (const c of D.costruito?.costruzioni ?? []) if (c.pos?.x != null) { const d = del.get(c.q); if (d) { c.pos.x += d[0]; c.pos.y += d[1] } else sposta(c.pos) }
    if (D.vita) { for (const l of D.vita.luoghi) { const d = l.q != null && l.tipo === 'sala' ? del.get(l.q) : null; if (d) { l.x += d[0]; l.y += d[1] } else sposta(l) } for (const t of D.vita.tracce) sposta(t)
      for (const v of Object.values(D.vita.ab)) for (const o of v.oggi ?? []) sposta(o) }
    D.__coltivatoSpostato = true
  }
  // il diorama comprende solo quello che gli abitanti hanno costruito o coltivato (più un margine): cresce con loro
  const G48 = 48, pts0 = [[D.piazza.x, D.piazza.y], ...D.punti.map(p => [p.x, p.y]), ...costr.filter(c => c.pos?.x != null).map(c => [c.pos.x, c.pos.y]), ...(K.coltivato ?? []).map(k => [((k % G48) + 0.5) / G48 * 1000, (Math.floor(k / G48) + 0.5) / G48 * 1000])]
  const bx0 = Math.min(...pts0.map(p => p[0])) - 70, bx1 = Math.max(...pts0.map(p => p[0])) + 70, by0 = Math.min(...pts0.map(p => p[1])) - 70, by1 = Math.max(...pts0.map(p => p[1])) + 70
  const cxT = (bx0 + bx1) / 2, cyT = (by0 + by1) / 2
  const S = 1.0, LX = (bx1 - bx0) * S, LZ = (by1 - by0) * S, LATO = Math.max(LX, LZ), X = x => (x - cxT) * S, Z = y => (y - cyT) * S

  // ── motore ────────────────────────────────────────────────────────────────────────────────────────────
  const cv = document.getElementById('mondo')
  const R = new THREE.WebGLRenderer({ canvas: cv, antialias: true })
  R.setPixelRatio(Math.min(2, devicePixelRatio)); R.setSize(innerWidth, innerHeight); R.outputEncoding = THREE.sRGBEncoding
  R.toneMapping = THREE.ACESFilmicToneMapping; R.toneMappingExposure = 1.0; R.shadowMap.enabled = true; R.shadowMap.type = THREE.PCFSoftShadowMap
  const scena = new THREE.Scene(); scena.fog = null
  // l'inquadratura assonometrica: una camera ortografica, a 45° sul piano e 35° dall'alto, come un disegno di progetto
  const cam = new THREE.OrthographicCamera(-1, 1, 1, -1, -6000, 6000)
  const inquadra = () => { const a = innerWidth / innerHeight, h = O.dist / 2; cam.left = -h * a; cam.right = h * a; cam.top = h; cam.bottom = -h; cam.updateProjectionMatrix() }
  addEventListener('resize', () => { R.setSize(innerWidth, innerHeight); inquadra() })
  // la luce di Porto Vecchio (DIREZIONE_ARTISTICA §4): un momento per ora, l'ombra sempre colorata dal cielo, mai nera.
  // Il cielo dell'ora riempie le ombre (oltremare e lilla di giorno, magenta-viola la sera, blu profondo la notte).
  const emi = new THREE.HemisphereLight(0x9cc4f2, 0xad9c84, 0.5); scena.add(emi)
  const MOMENTI = [ // ora, sole, ×, cielo, ×, terra, nebbia, cielo alto, fascia
    [7, 0xffd9a2, 1.36, 0x9cc4f2, 0.50, 0xad9c84, 0xe2dfd8, 0x3a5fc8, 0xf2c6b8],
    [15, 0xffdca8, 1.38, 0x9ec6f2, 0.48, 0xb09c82, 0xe4e0d8, 0x2a4cb8, 0xe8d4c8],
    [19.5, 0xffb47a, 1.0, 0x9a88c8, 0.60, 0xa8826a, 0xd8a0ac, 0x1f2f7a, 0xff8fa8],
    [23, 0x9ab0e0, 0.34, 0x2a3360, 0.40, 0x2a2230, 0x141a2c, 0x0d1430, 0x3a2a5a],
    [31, 0xffd9a2, 1.36, 0x9cc4f2, 0.50, 0xad9c84, 0xe2dfd8, 0x3a5fc8, 0xf2c6b8]]
  const cA = new THREE.Color(), cB = new THREE.Color(), mix3 = (a, b, t, out) => out.copy(cA.set(a)).lerp(cB.set(b), t)
  const nebbia = new THREE.Color(), cieloAlto = new THREE.Color(), fascia = new THREE.Color()
  const cv0 = document.createElement('canvas'); cv0.width = 2; cv0.height = 256; const g0 = cv0.getContext('2d'), cieloTx = new THREE.CanvasTexture(cv0); cieloTx.encoding = THREE.sRGBEncoding
  let ultimaLuce = -1
  function luce(h) {
    const hh = h < 7 ? h + 24 : h; let i = 0; while (i < MOMENTI.length - 2 && hh > MOMENTI[i + 1][0]) i++
    const A = MOMENTI[i], B = MOMENTI[i + 1], t = Math.max(0, Math.min(1, (hh - A[0]) / (B[0] - A[0]))), e = t * t * (3 - 2 * t)
    mix3(A[1], B[1], e, sole.color); sole.intensity = A[2] + (B[2] - A[2]) * e
    mix3(A[3], B[3], e, emi.color); emi.intensity = A[4] + (B[4] - A[4]) * e; mix3(A[5], B[5], e, emi.groundColor)
    mix3(A[6], B[6], e, nebbia); mix3(A[7], B[7], e, cieloAlto); mix3(A[8], B[8], e, fascia)
    const an = (hh - 6) / 24 * Math.PI * 2; sole.position.set(-Math.cos(an) * 900, 300 + Math.max(0.15, Math.sin(an * 0.5 + 0.3)) * 1000, 500)
    if (Math.abs(hh - ultimaLuce) > 0.05) { ultimaLuce = hh; const gr = g0.createLinearGradient(0, 0, 0, 256); gr.addColorStop(0, '#' + cieloAlto.getHexString()); gr.addColorStop(0.62, '#' + cieloAlto.clone().lerp(fascia, 0.35).getHexString()); gr.addColorStop(0.82, '#' + fascia.getHexString()); gr.addColorStop(1, '#' + nebbia.getHexString()); g0.fillStyle = gr; g0.fillRect(0, 0, 2, 256); cieloTx.needsUpdate = true }
  }
  const sole = new THREE.DirectionalLight(0xfff0dc, 0.95); sole.position.set(-700, 1100, 500); sole.castShadow = true
  sole.shadow.mapSize.set(2048, 2048); Object.assign(sole.shadow.camera, { left: -700, right: 700, top: 700, bottom: -700, near: 10, far: 3000 }); sole.shadow.bias = -0.0006; scena.add(sole)

  // ── orbita: trascina per girare, destro (o maiuscolo) per spostarti, rotella per avvicinarti ───────────────
  const O = { t: new THREE.Vector3(0, 20, 0), yaw: Math.PI / 4, pitch: 0.615, dist: 900, v: { yaw: 0, pitch: 0 }, auto: false }
  let tira = null, volo = null
  cv.addEventListener('pointerdown', e => { tira = { x: e.clientX, y: e.clientY, b: e.button, sh: e.shiftKey, mosso: 0 }; O.auto = false; volo = null; cv.setPointerCapture(e.pointerId) })
  cv.addEventListener('pointermove', e => {
    if (!tira) return; const dx = e.clientX - tira.x, dy = e.clientY - tira.y; tira.x = e.clientX; tira.y = e.clientY; tira.mosso += Math.abs(dx) + Math.abs(dy)
    // trascinare sposta il disegno (come una tavola sul tavolo); col destro o con maiuscolo si gira attorno
    if (tira.b === 2 || tira.sh) { O.v.yaw = -dx * 0.005 }
    else { const k = O.dist / innerHeight, ds = new THREE.Vector3(Math.cos(O.yaw), 0, -Math.sin(O.yaw)), fw = new THREE.Vector3(-Math.sin(O.yaw), 0, -Math.cos(O.yaw)); O.t.addScaledVector(ds, -dx * k).addScaledVector(fw, dy * k / Math.sin(O.pitch)) }
  })
  cv.addEventListener('pointerup', () => { setTimeout(() => { tira = null }, 0) })
  cv.addEventListener('contextmenu', e => e.preventDefault())
  cv.addEventListener('wheel', e => { e.preventDefault(); O.auto = false; volo = null; O.dist = Math.min(2600, Math.max(40, O.dist * Math.exp(e.deltaY * 0.0012))) }, { passive: false })
  const metti = () => {
    O.yaw += O.v.yaw; O.v.yaw *= 0.85
    O.t.x = Math.max(-LX / 2 - 600, Math.min(LX / 2 + 600, O.t.x)); O.t.z = Math.max(-LZ / 2 - 600, Math.min(LZ / 2 + 600, O.t.z)); if (typeof occhio !== 'undefined') occhio.value.set(O.t.x, O.t.z, O.dist * Math.max(1, innerWidth / innerHeight) * 0.6); O.t.y = 20
    cam.position.set(O.t.x + 2000 * Math.cos(O.pitch) * Math.sin(O.yaw), O.t.y + 2000 * Math.sin(O.pitch), O.t.z + 2000 * Math.cos(O.pitch) * Math.cos(O.yaw)); cam.lookAt(O.t); inquadra()
  }

  // ── le aree come placche: ogni quartiere è un campo che si allarga dove stanno le sue tavole e sotto le parole che
  // gli appartengono, anche in parte. Ogni punto del suolo è dell'area col campo più forte; dove due campi si equivalgono
  // c'è il confine, e com'è lo decidono i due curatori (si fondono, si separano con la carta, si scontrano). ──────────
  const QS = D.quartieri, NQ = QS.length, qIdx = new Map(QS.map((q, i) => [q.id, i]))
  // le parole: i concetti dei quartieri. Una parola appartiene alle aree in proporzione a quante tavole di ciascuna la nominano.
  const parole = new Map()
  for (const q of QS) for (const w of q.concetti ?? []) if (!parole.has(w)) parole.set(w, { w, da: q.id, dist: new Float32Array(NQ), tot: 0 })
  const radiceP = w => w.toLowerCase().slice(0, Math.max(4, w.length - 2))
  { const rad = [...parole.values()].map(p => [p, radiceP(p.w)]); for (const p of D.punti) { const t = (p.t ?? '').toLowerCase(), k = qIdx.get(p.q); if (k == null) continue; for (const [P, r] of rad) if (t.includes(r)) { P.dist[k]++; P.tot++ } } }
  const centroQ = QS.map(q => { const ps = D.punti.filter(p => p.q === q.id); return ps.length ? [ps.reduce((s, p) => s + p.x, 0) / ps.length, ps.reduce((s, p) => s + p.y, 0) / ps.length] : [q.x, q.y] })
  for (const P of parole.values()) {
    if (!P.tot) { P.dist[qIdx.get(P.da)] = 1; P.tot = 1 }
    let x = 0, y = 0, H = 0, n = 0; for (let k = 0; k < NQ; k++) { const s = P.dist[k] / P.tot; if (!s) continue; x += s * centroQ[k][0]; y += s * centroQ[k][1]; H -= s * Math.log(s); n++ }
    P.x = x; P.y = y; P.generale = NQ > 1 ? H / Math.log(NQ) : 0 // quanto la parola lega aree diverse: 0 = di una sola, 1 = di tutte
  }
  const pmax = Math.max(1, ...[...parole.values()].map(p => p.tot))
  // il campo di ogni area su una griglia sopra il territorio
  const PAD = 120, GX0 = -LX / 2 - PAD, GZ0 = -LZ / 2 - PAD, GLX = LX + 2 * PAD, GLZ = LZ + 2 * PAD, GN = 192
  const campo = QS.map(() => new Float32Array(GN * GN)), cella = x => x * GN
  const spruzza = (F, wx, wz, amp, sig) => { const ci = (wx - GX0) / GLX * GN, cj = (wz - GZ0) / GLZ * GN, R = Math.ceil(3 * sig / GLX * GN), s2 = 2 * (sig / GLX * GN) ** 2; for (let j = Math.max(0, Math.floor(cj - R)); j <= Math.min(GN - 1, Math.ceil(cj + R)); j++) for (let i = Math.max(0, Math.floor(ci - R)); i <= Math.min(GN - 1, Math.ceil(ci + R)); i++) F[j * GN + i] += amp * Math.exp(-((i - ci) ** 2 + (j - cj) ** 2) / s2) }
  for (const p of D.punti) { const k = qIdx.get(p.q); if (k != null) spruzza(campo[k], X(p.x), Z(p.y), 0.4 + (p.i ?? 0.5), 42) }
  // un'area si allunga sotto le parole che le appartengono anche se stanno altrove (lingue, penisole, isole)
  const pesoP = QS.map((_, k) => D.punti.filter(p => qIdx.get(p.q) === k).length)
  for (const P of parole.values()) for (let k = 0; k < NQ; k++) { const s = P.dist[k] / P.tot; if (s > 0.12) spruzza(campo[k], X(P.x), Z(P.y), s * pesoP[k] * 0.06 * (P.tot / pmax + 0.3), 55) }
  // i legami tra le aree (i fili che le attraversano) e l'accordo sui confini tra i loro curatori
  const legameQ = new Float32Array(NQ * NQ); for (const [a, b, w] of D.fili ?? []) { const ka = qIdx.get(D.punti[a]?.q), kb = qIdx.get(D.punti[b]?.q); if (ka == null || kb == null || ka === kb) continue; legameQ[ka * NQ + kb] += w; legameQ[kb * NQ + ka] += w }
  const lmax = Math.max(1e-6, ...legameQ), carDi = id => D.abitanti.find(a => a.id === id)?.carattere ?? {}
  const accordo = (a, b) => { const l = legameQ[a * NQ + b] / lmax, A = carDi(QS[a].sala?.curatore), B = carDi(QS[b].sala?.curatore); if (l > 0.5) return 0; return 1 } // 0 si fondono, 1 carta, 2 contrasto
  const tot = new Float32Array(GN * GN), maschere = QS.map(() => new Uint8Array(GN * GN))
  let fmax = 0; for (let c = 0; c < GN * GN; c++) { let s = 0; for (let k = 0; k < NQ; k++) s += campo[k][c]; tot[c] = s; fmax = Math.max(fmax, s) }
  const liscio = (a, b, t) => { t = Math.min(1, Math.max(0, (t - a) / (b - a))); return t * t * (3 - 2 * t) }
  const accordi = new Map()
  for (let c = 0; c < GN * GN; c++) {
    let b = -1, s = -1, fb = 0, fs = 0; for (let k = 0; k < NQ; k++) { const f = campo[k][c]; if (f > fb) { s = b; fs = fb; b = k; fb = f } else if (f > fs) { s = k; fs = f } }
    if (b < 0) continue
    const presenza = liscio(0.04, 0.16, fb / (fmax || 1)), m = (fb - fs) / (fb + fs + 1e-9), kk = s < 0 ? 1 : (accordi.get(b * NQ + s) ?? (accordi.set(b * NQ + s, accordo(b, s)), accordi.get(b * NQ + s)))
    let wb = 1, ws = 0
    if (s >= 0) { if (kk === 0) { wb = 0.5 + 0.5 * liscio(0, 0.35, m); ws = 1 - wb } else if (kk === 1) wb = liscio(0.0, 0.45, m); else wb = m > 0.015 ? 1 : 0 }
    maschere[b][c] = Math.round(255 * wb * presenza); if (s >= 0 && ws) maschere[s][c] = Math.round(255 * ws * presenza)
  }
  // il rilievo: dolce, più alto dove il sapere si accumula
  // la geologia di stateyour sotto la città: altezze, mari (dove la crosta non emerge), crinali (dove le placche spingono)
  const GEO = K.geologia, GL = GEO?.lato ?? 0
  const geoA = (x, z) => { if (!GL) return 0; const u = Math.min(GL - 1, Math.max(0, Math.floor((x / S + cxT) / 1000 * GL))), v = Math.min(GL - 1, Math.max(0, Math.floor((z / S + cyT) / 1000 * GL))); return GEO.alt[v * GL + u] }
  // oltre la città il mondo curva e scende nel buio, come un orizzonte vicino
  const RAGGIO = Math.max(LX, LZ) * 0.62
  function altezza(x, z) { const d = Math.hypot(x, z), giu = d > RAGGIO ? -((d - RAGGIO) ** 2) * 0.0016 : 0; return altezzaBase(x, z) + geoLiscia(x, z) + giu }
  function geoLiscia(x, z) { if (!GL) return 0; let s = 0; for (const [dx, dz] of [[0, 0], [12, 0], [-12, 0], [0, 12], [0, -12]]) s += geoA(x + dx, z + dz); return Math.max(-6, Math.min(10, s / 5 / 8000 * 14)) }
  function altezzaBase(x, z) {
    const u = (x - GX0) / GLX * (GN - 1), v = (z - GZ0) / GLZ * (GN - 1)
    if (u < 0 || v < 0 || u > GN - 1 || v > GN - 1) return 2 + Math.sin(x * 0.01) * Math.cos(z * 0.012) * 1.5
    const i = Math.min(GN - 2, Math.floor(u)), j = Math.min(GN - 2, Math.floor(v)), fu = u - i, fv = v - j, a = (ii, jj) => tot[jj * GN + ii]
    const d = (a(i, j) * (1 - fu) + a(i + 1, j) * fu) * (1 - fv) + (a(i, j + 1) * (1 - fu) + a(i + 1, j + 1) * fu) * fv
    return 2 + Math.pow(d / (fmax || 1), 0.6) * 26
  }
  const nodoXY = id => { if (id === 'piazza') return [D.piazza.x, D.piazza.y]; const c = costr.find(x => x.id === id); return c?.pos?.x != null ? [c.pos.x, c.pos.y] : null }
  const strade = costr.filter(c => c.tipo === 'strada').map(c => ({ c, a: nodoXY(c.a), b: nodoXY(c.b) })).filter(s => s.a && s.b)
  const curvaStrada = s => { const [ax, ay] = s.a, [bx, by] = s.b, mx = (ax + bx) / 2 + (ay - by) * 0.12, my = (ay + by) / 2 + (bx - ax) * 0.12; const pts = []; for (let k = 0; k <= 40; k++) { const t = k / 40, x = (1 - t) ** 2 * ax + 2 * (1 - t) * t * mx + t * t * bx, y = (1 - t) ** 2 * ay + 2 * (1 - t) * t * my + t * t * by; pts.push([x, y]) } return pts }
  // una toppa di suolo che segue il rilievo (per i fondi e per l'inchiostro)
  const toppa = (x0, z0, lx, lz, su, n = 160) => { const g = new THREE.PlaneGeometry(lx, lz, n, n); g.rotateX(-Math.PI / 2); g.translate(x0 + lx / 2, 0, z0 + lz / 2); const p = g.attributes.position; for (let i = 0; i < p.count; i++) p.setY(i, altezza(p.getX(i), p.getZ(i)) + su); return g }
  {
    // la carta: il suolo infinito, chiaro, che sfuma attorno allo sguardo
    const AMPIO = LATO + 2400, geo = new THREE.PlaneGeometry(AMPIO, AMPIO, 360, 360); geo.rotateX(-Math.PI / 2)
    const pos = geo.attributes.position; for (let i = 0; i < pos.count; i++) pos.setY(i, altezza(pos.getX(i), pos.getZ(i))); geo.computeVertexNormals()
    const mat = new THREE.MeshStandardMaterial({ color: 0x2f8a22, roughness: 0.92, metalness: 0 })
    var occhio = { value: new THREE.Vector3() }
    var geoTex = null
    { const cv = document.createElement('canvas'), N = Math.max(1, GL); cv.width = cv.height = N; const g = cv.getContext('2d'), im = g.createImageData(N, N)
      if (GL) for (let i = 0; i < N * N; i++) { im.data[i * 4] = GEO.cont[i] ? 0 : 255; im.data[i * 4 + 1] = Math.min(255, GEO.spinta[i] * 2.55); im.data[i * 4 + 2] = Math.min(255, GEO.fosse[i] * 2.55); im.data[i * 4 + 3] = 255 }
      g.putImageData(im, 0, 0); geoTex = new THREE.CanvasTexture(cv); geoTex.magFilter = THREE.LinearFilter }
    mat.onBeforeCompile = sh => {
      sh.uniforms.occhio = occhio; sh.uniforms.geo = { value: geoTex }; sh.uniforms.nebbia = { value: nebbia }
      sh.vertexShader = sh.vertexShader.replace('#include <common>', '#include <common>\nvarying vec3 vMondo;').replace('#include <begin_vertex>', '#include <begin_vertex>\nvMondo = (modelMatrix*vec4(position,1.)).xyz;')
      sh.fragmentShader = sh.fragmentShader.replace('#include <common>', `#include <common>
varying vec3 vMondo; uniform vec3 occhio; uniform sampler2D geo; uniform vec3 nebbia;
        // il prato di Porto Vecchio (render.js, prato9): fili, ciuffi, fughe fredde, punte calde, chiazze secche
        float ph9(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
        float pn9(vec2 p){ vec2 i = floor(p), f = fract(p); f = f*f*(3. - 2.*f); return mix(mix(ph9(i), ph9(i + vec2(1., 0.)), f.x), mix(ph9(i + vec2(0., 1.)), ph9(i + 1.), f.x), f.y); }
        vec3 prato9(vec3 base, vec2 p){
          vec2 fw = fwidth(p); float mpp = max(fw.x, fw.y);
          float aa = 1. - smoothstep(.025, .07, mpp), aa2 = 1. - smoothstep(.04, .12, mpp);
          float cl = pn9(p * 1.9) * .6 + pn9(p * 4.6 + 3.) * .4, zo = pn9(p * .21 + 11.), dryN = pn9(p * .55 + 31.);
          vec2 a = mat2(.96, .28, -.28, .96) * p, b = mat2(.93, -.37, .37, .93) * p;
          float s1 = pn9(a * vec2(19., 4.2)), s2 = pn9(b * vec2(29., 6.) + 5.), s3 = pn9(p * vec2(9., 2.4) + 17.);
          float bl = smoothstep(.55, .9, max(s1, s2 * .97)), gap = smoothstep(.32, .06, min(s1, s2));
          float tuft = smoothstep(.6, .85, s3) * smoothstep(.45, .7, cl);
          float k = .86 + (cl - .5) * .42 + (zo - .5) * .3;
          vec3 c = base * (k + (bl * .5 - gap * .38) * aa + tuft * .22 * aa2);
          c = mix(c, c * vec3(1.1, 1.07, .78), clamp(bl * aa * .55 + tuft * aa2 * .3, 0., 1.));
          c = mix(c, c * vec3(.8, .94, 1.12), gap * aa * .6);
          float dry = smoothstep(.7, .88, dryN) * (1. - tuft);
          c = mix(c, vec3(dot(c, vec3(.3, .59, .11))) * vec3(1.2, 1.15, .8), dry * .25);
          return c; }
        float fbm9(vec2 p){ return pn9(p) * .55 + pn9(p * 2.1 + 7.) * .28 + pn9(p * 4.3 + 13.) * .17; }`).replace('#include <color_fragment>', `#include <color_fragment>
        vec2 gu = vec2((vMondo.x/${S.toFixed(3)}+${cxT.toFixed(2)})/1000., (vMondo.z/${S.toFixed(3)}+${cyT.toFixed(2)})/1000.); vec3 g = texture2D(geo, gu).rgb * step(0., gu.x)*step(gu.x,1.)*step(0.,gu.y)*step(gu.y,1.);
        vec2 pm = vMondo.xz * .45;
        // il verde pastello, morbido: verde foglia con riflessi rosati e giallini che scorrono a macchie larghe
        float m1 = fbm9(vMondo.xz * .010), m2 = fbm9(vMondo.xz * .023 + 9.), m3 = fbm9(vMondo.xz * .006 + 21.);
        vec3 verde = mix(vec3(.30,.62,.30), vec3(.52,.78,.36), smoothstep(1., 22., vMondo.y));
        verde = mix(verde, vec3(.72,.80,.42), smoothstep(.52, .78, m1) * .55);   // riflessi giallini
        verde = mix(verde, vec3(.78,.62,.62), smoothstep(.55, .82, m2) * .35);   // riflessi rosati
        verde = mix(verde, vec3(.22,.56,.40), smoothstep(.6, .85, m3) * .4);     // verde foglia più fresco
        verde = pow(verde, vec3(2.2));                                           // i colori sono pensati in sRGB
        vec3 prato = mix(prato9(verde, pm), verde, .35);                         // la grana del prato, ma ammorbidita
        // la terra rosa come sabbia al tramonto: chiazze morbide che escono da sotto il prato, con l'orlo sfumato
        float n = fbm9(vMondo.xz * .009 + 3.) + (g.r - .5) * .12, orlo = (pn9(pm * 2.) - .5) * .05;
        float terra = smoothstep(.66, .80, n + orlo) * (1. - smoothstep(14., 26., vMondo.y));
        vec3 rosa = mix(vec3(.93,.66,.62), vec3(.98,.78,.66), pn9(vMondo.xz * .03)) * (.94 + .08 * pn9(pm * 5.)); rosa = pow(rosa, vec3(2.2));
        diffuseColor.rgb = mix(prato, rosa, terra);`)
        .replace('#include <fog_fragment>', `#include <fog_fragment>
        float lontano = length(vMondo.xz); gl_FragColor.rgb *= 1. - smoothstep(${(Math.max(LX, LZ) * 0.5).toFixed(1)}, ${(Math.max(LX, LZ) * 0.95).toFixed(1)}, lontano); gl_FragColor.rgb = mix(gl_FragColor.rgb, vec3(.004,.005,.006), smoothstep(occhio.z * 1.4, occhio.z * 2.6, length(vMondo.xz - occhio.xy)));`)
    }
    const terra = new THREE.Mesh(geo, mat); terra.receiveShadow = true; scena.add(terra)
    scena.background = new THREE.Color(0x030405) // attorno, il buio: la città è un'isola di luce
  }
  // i fondi delle aree: lo shader che il curatore ha composto (o raccolto), steso dentro il lotto dell'area
  const fondiVivi = []
  {
    const prova = (() => { const c = document.createElement('canvas'), gl = c.getContext('webgl'); return src => { if (!gl) return true; const s = gl.createShader(gl.FRAGMENT_SHADER); gl.shaderSource(s, src); gl.compileShader(s); const ok = gl.getShaderParameter(s, gl.COMPILE_STATUS); gl.deleteShader(s); return ok } })()
    QS.forEach((q, k) => {
      const F = q.sala?.suolo; if (!F?.codice) return
      let corpo = F.codice.replace(/#version[^\n]*\n/g, '').replace(/\bgl_FragCoord\b/g, 'vec4(vU*u_resolution,0.,1.)').replace(/void\s+main\s*\(\s*\)/, 'void fondo_main()')
      if (/mainImage\s*\(/.test(corpo)) corpo = corpo.replace(/void\s+fondo_main\s*\(\s*\)/, 'void fondo_main_x()') + '\nvoid fondo_main(){ vec4 c=vec4(0.); mainImage(c, vU*u_resolution); gl_FragColor=vec4(c.rgb,1.); }'
      const testa = `precision highp float;\nuniform float u_time; uniform vec2 u_resolution; uniform float u_seed; uniform sampler2D maschera; varying vec2 vU; varying vec2 vM;\n${/mainImage/.test(corpo) ? '#define iTime u_time\n#define iResolution vec3(u_resolution,1.)\n' : ''}`
      const frag = testa + corpo + '\nvoid main(){ fondo_main(); gl_FragColor.a = texture2D(maschera, vM).r * .3; }'
      if (!prova(frag)) return
      // la toppa copre solo dove la maschera dell'area c'è
      let i0 = GN, i1 = 0, j0 = GN, j1 = 0; const M = maschere[k]; for (let j = 0; j < GN; j++) for (let i = 0; i < GN; i++) if (M[j * GN + i] > 8) { i0 = Math.min(i0, i); i1 = Math.max(i1, i); j0 = Math.min(j0, j); j1 = Math.max(j1, j) }
      if (i1 < i0) return
      const x0 = GX0 + i0 / GN * GLX, z0 = GZ0 + j0 / GN * GLZ, lx = (i1 - i0 + 1) / GN * GLX, lz = (j1 - j0 + 1) / GN * GLZ
      const tm = new THREE.DataTexture(M, GN, GN, THREE.RedFormat, THREE.UnsignedByteType); tm.magFilter = tm.minFilter = THREE.LinearFilter; tm.needsUpdate = true
      const mat = new THREE.ShaderMaterial({ uniforms: { u_time: { value: 0 }, u_resolution: { value: new THREE.Vector2(lx * 2, lz * 2) }, u_seed: { value: k * 7.13 }, maschera: { value: tm } }, transparent: true, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -1 - k * 0.01, polygonOffsetUnits: -2,
        vertexShader: `varying vec2 vU; varying vec2 vM; void main(){ vec4 w = modelMatrix*vec4(position,1.); vU = vec2((w.x-(${x0.toFixed(2)}))/${lx.toFixed(2)}, 1.-(w.z-(${z0.toFixed(2)}))/${lz.toFixed(2)}); vM = vec2((w.x-(${GX0.toFixed(2)}))/${GLX.toFixed(2)}, (w.z-(${GZ0.toFixed(2)}))/${GLZ.toFixed(2)}); gl_Position = projectionMatrix*viewMatrix*w; }`,
        fragmentShader: frag.replace(/^precision highp float;\n/, '') })
      const m = new THREE.Mesh(toppa(x0, z0, lx, lz, 0.25, Math.min(160, Math.max(24, Math.round(Math.max(lx, lz) / 6)))), mat); m.renderOrder = 1; scena.add(m)
      fondiVivi.push(mat)
    })
  }
  var reteMat = null, cartMat = []

  const PZ = new THREE.Vector3(X(D.piazza.x), 0, Z(D.piazza.y)); PZ.y = altezza(PZ.x, PZ.z)
  // ── i disegni resi 3d dal motore: una tavola diventa rilievo, la luce dell'immagine diventa altezza ──────────
  function rilievo(id, w, h, alto) {
    const geo = new THREE.PlaneGeometry(w, h, 96, 120), mat = new THREE.MeshStandardMaterial({ color: 0x777777, roughness: 0.8, side: THREE.DoubleSide }), m = new THREE.Mesh(geo, mat)
    const im = new Image(); im.onload = () => {
      const cv = document.createElement('canvas'); cv.width = 97; cv.height = 121; const g = cv.getContext('2d'); g.filter = 'blur(1px)'; g.drawImage(im, 0, 0, 97, 121); const px = g.getImageData(0, 0, 97, 121).data, pos = geo.attributes.position
      for (let i = 0; i < pos.count; i++) { const k = i * 4, l = (px[k] * 0.3 + px[k + 1] * 0.59 + px[k + 2] * 0.11) / 255; pos.setZ(i, l * alto) }
      pos.needsUpdate = true; geo.computeVertexNormals(); const t = new THREE.Texture(im); t.encoding = THREE.sRGBEncoding; t.needsUpdate = true; mat.map = t; mat.color.set(0xffffff); mat.needsUpdate = true
    }; im.src = `img/${id}.jpg`
    m.castShadow = true; m.receiveShadow = true; return m
  }

  // ── le sale: il museo di ogni curatore. Le tavole formano una stanza in cui si entra (un'abside, un corridoio,
  // un recinto, una pianta da percorrere, strati sospesi), rivolte verso chi entra e l'una verso l'altra. Il curatore
  // mette la tavola più amata al posto d'onore e accosta le altre seguendo i fili che le legano. ──────────────────
  const carica = new THREE.TextureLoader(), cliccabili = [], etichette = [], strato = document.getElementById('etichette')
  const etichetta = (html, p, lontano, cls = '') => { const el = document.createElement('div'); el.className = 'et ' + cls; el.innerHTML = html; strato.appendChild(el); const e = { el, p, lontano }; etichette.push(e); return e }
  const texDi = new Map(), texture = id => { if (!texDi.has(id)) texDi.set(id, new Promise(ok => carica.load(`img/${id}.jpg`, t => { t.encoding = THREE.sRGBEncoding; t.anisotropy = 8; ok(t) }, undefined, () => ok(null)))); return texDi.get(id) }
  const tavolaMatDa = url => { const m = new THREE.MeshBasicMaterial({ color: 0x333333, side: THREE.DoubleSide }); carica.load(url, t => { t.encoding = THREE.sRGBEncoding; m.map = t; m.color.set(0xffffff); m.needsUpdate = true }); return m }
  const tavolaMat = (id, taglio) => { const m = new THREE.MeshBasicMaterial({ color: 0x333333, side: THREE.DoubleSide }); texture(id).then(t0 => { if (!t0) return; const t = taglio ? t0.clone() : t0; if (taglio) { t.offset.set(taglio[0], taglio[1]); t.repeat.set(taglio[2], taglio[3]); t.needsUpdate = true } m.map = t; m.color.set(0xffffff); m.needsUpdate = true }); return m }
  const materialeRiflesso = (id, alto, H) => { if (true) return new THREE.MeshBasicMaterial({ visible: false }); const mat = new THREE.ShaderMaterial({ uniforms: { mappa: { value: null } }, transparent: true, depthWrite: false,
    vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.); }',
    fragmentShader: `uniform sampler2D mappa; varying vec2 vUv; void main(){ vec3 c = vec3(0.); for (int i=-2;i<=2;i++) for (int j=-2;j<=2;j++) c += texture2D(mappa, vUv + vec2(float(i),float(j))*.012).rgb; c /= 25.; float f = smoothstep(0., 1., vUv.y) * ${(0.7 * Math.max(0.25, 1 - alto / 140)).toFixed(3)}; gl_FragColor = vec4(c, f); }` })
    texture(id).then(t => { mat.uniforms.mappa.value = t }); return mat }
  const perQ = new Map(); for (const p of D.punti.filter(p => p.img)) { if (!perQ.has(p.q)) perQ.set(p.q, []); perQ.get(p.q).push(p) }
  const quart = new Map(D.quartieri.map(q => [q.id, q]))
  const idxDi = new Map(D.punti.map((p, i) => [p.id, i])), filiDi = new Map(); for (const [a, b, w] of D.fili ?? []) { for (const [x, y] of [[a, b], [b, a]]) { if (!filiDi.has(x)) filiDi.set(x, new Map()); filiDi.get(x).set(y, w) } }
  const legame = (p, q) => filiDi.get(idxDi.get(p.id))?.get(idxDi.get(q.id)) ?? 0
  const sale = [], meshDi = new Map()
  const capsule = costr.filter(c => c.tipo === 'capsula' && c.pos?.x != null)
  // l'urbanista scosta le sale finché ci si cammina in mezzo
  const posSala = new Map()
  { const P = capsule.map(c => ({ c, x: X(c.pos.x), z: Z(c.pos.y), r: 40 + Math.sqrt(Math.min(12, (quart.get(c.q)?.sala?.quante ?? 8) + (c.moduli ?? 1))) * 12 }))
    for (let it = 0; it < 80; it++) for (let i = 0; i < P.length; i++) for (let j = i + 1; j < P.length; j++) { const a = P[i], b = P[j], dx = b.x - a.x, dz = b.z - a.z, d = Math.hypot(dx, dz) || 1, m = a.r + b.r + 10; if (d < m) { const k = (m - d) / 2 / d; a.x -= dx * k; a.z -= dz * k; b.x += dx * k; b.z += dz * k } }
    for (const p of P) posSala.set(p.c.id, p) }
  const FORMA = { griglia: 'abside', arco: 'abside', parete: 'corridoio', colonna: 'abside', pavimento: 'pianta', sospese: 'strati' }
  const smussato = (L, P, alto, r) => { const s = new THREE.Shape(), x = -L / 2, y = -P / 2; r = Math.min(r, L / 2, P / 2); s.moveTo(x + r, y); s.lineTo(x + L - r, y); s.quadraticCurveTo(x + L, y, x + L, y + r); s.lineTo(x + L, y + P - r); s.quadraticCurveTo(x + L, y + P, x + L - r, y + P); s.lineTo(x + r, y + P); s.quadraticCurveTo(x, y + P, x, y + P - r); s.lineTo(x, y + r); s.quadraticCurveTo(x, y, x + r, y); const g = new THREE.ExtrudeGeometry(s, { depth: alto, bevelEnabled: true, bevelThickness: alto * 0.6, bevelSize: alto * 0.6, bevelSegments: 4, curveSegments: 10 }); g.rotateX(-Math.PI / 2); return g }
  for (const c of capsule) {
    const q = quart.get(c.q), sala = q?.sala ?? { disposizione: 'griglia', quante: 8 }, rovina = c.stato === 'rovina'
    const cx = posSala.get(c.id).x, cz = posSala.get(c.id).z, cy = altezza(cx, cz), centro = new THREE.Vector3(cx, cy, cz)
    const v0 = Math.atan2(PZ.x - cx, PZ.z - cz), ax = Math.abs(Math.sin(v0)) > Math.abs(Math.cos(v0)) ? Math.PI / 2 : 0 // l'ingresso verso la piazza, ad angolo retto
    const scelte = (perQ.get(c.q) ?? []).sort((a, b) => b.i - a.i).slice(0, Math.min(12, Math.max(4, (sala.quante ?? 8) + (c.moduli ?? 1) - 1)))
    // l'ordine del curatore: la più amata prima, poi ogni volta quella più legata all'ultima messa
    const ord = scelte.length ? [scelte[0]] : [], resto = scelte.slice(1)
    while (resto.length) { const ult = ord[ord.length - 1]; resto.sort((a, b) => legame(ult, b) - legame(ult, a) || b.i - a.i); ord.push(resto.shift()) }
    const n = ord.length, h = 22, w = 17.6, gap = 4, st = w + gap, forma = FORMA[sala.disposizione] ?? 'abside'
    const cs = Math.cos(ax), sn = Math.sin(ax), aMondo = (lx, lz) => [cx + lx * cs + lz * sn, cz - lx * sn + lz * cs], verso = (dx, dz) => Math.atan2(dx * cs + dz * sn, -dx * sn + dz * cs)
    // l'allestimento a nuvola (come in un salone): il curatore appende le tavole su pareti invisibili, grandi quanto
    // le ama, la più amata al centro e più in alto, le altre attorno senza toccarsi; ogni tavola è una lightbox
    const imax = Math.max(1e-6, ...ord.map(p => p.i)), imin = Math.min(...ord.map(p => p.i))
    const scala = p => 0.65 + 0.9 * ((p.i - imin) / (imax - imin || 1)) ** 1.3
    // l'allestimento scritto dagli abitanti (dove sta ogni tavola, quanto è grande, quanto è girata): se c'è, si disegna quello
    const ALL = K.allestimenti?.[c.id], formaS = ALL?.forma ?? forma
    const pareti = formaS === 'corridoio' ? [{ o: [-16, 0], d: [1, 0], lungo: [0, 1] }, { o: [16, 0], d: [-1, 0], lungo: [0, 1] }]
      : formaS === 'abside' ? [{ o: [0, -26], d: [0, 1], lungo: [1, 0] }, { o: [-34, 6], d: [1, 0], lungo: [0, 1] }, { o: [34, 6], d: [-1, 0], lungo: [0, 1] }]
      : [{ o: [0, 0], d: [0, 1], lungo: [1, 0] }]
    const quote = formaS === 'corridoio' ? [1, 1] : formaS === 'abside' ? [2, 1, 1] : [1]
    const perParete = pareti.map(() => []); if (ALL) { const riserva = (perQ.get(c.q) ?? []).filter(p => !ALL.voci.some(v => v.id === p.id)).sort((a, b) => b.i - a.i); for (const vo of ALL.voci) { let p = posDi.get(vo.id); if (!p?.img) p = riserva.shift() /* la tavola scelta non ha immagine sul sito: al suo posto la più amata tra quelle che ce l'hanno */; if (p?.img && perParete[vo.parete]) perParete[vo.parete].push({ ...p, voce: vo }) } } else { let k = 0; const tot = quote.reduce((a, b) => a + b, 0); ord.forEach((p, i) => { const slot = i === 0 ? 0 : (() => { let acc = 0, x = (k++ * 0.618) % 1 * tot; for (let j = 0; j < quote.length; j++) { acc += quote[j]; if (x < acc) return j } return 0 })(); perParete[slot].push(p) }) }
    const piano = [80, 60]
    perParete.forEach((lista, pi) => {
      const P = pareti[pi], messe = []
      lista.forEach((p, i) => {
        const sc = p.voce ? p.voce.s : scala(p) * (i === 0 && pi === 0 ? 1.35 : 1), W = w * sc, H = h * sc
        // la spirale: dal centro della parete verso fuori, il primo posto libero (con un margine attorno)
        let u = 0, v = 0
        if (p.voce) { u = p.voce.u; v = p.voce.v } else for (let t = 0; t < 400; t++) { const a = t * 0.55, r = t * 0.9; u = Math.cos(a) * r * 1.4; v = Math.sin(a) * r * 0.8; if (!messe.some(m => Math.abs(m.u - u) < (m.W + W) / 2 + 3 && Math.abs(m.v - v) < (m.H + H) / 2 + 3)) break }
        messe.push({ u, v, W, H })
        const lx = P.o[0] + P.lungo[0] * u, lz = P.o[1] + P.lungo[1] * u, [x, z] = aMondo(lx, lz), y = cy + 30 + v
        const m = new THREE.Mesh(new THREE.PlaneGeometry(W, H), tavolaMat(p.id)); m.rotation.y = verso(P.d[0], P.d[1]) + (p.voce?.gira ?? 0); m.position.set(x, y, z)
        // la lightbox: una cornice bianca che fa luce, e dietro il buio
        const cornice = new THREE.Mesh(new THREE.PlaneGeometry(W + 1.4, H + 1.4), new THREE.MeshBasicMaterial({ color: 0xf2f4ff })); cornice.position.copy(m.position); cornice.rotation.copy(m.rotation); cornice.translateZ(-0.12); scena.add(cornice)
        const retro = new THREE.Mesh(new THREE.PlaneGeometry(W + 1.4, H + 1.4), new THREE.MeshBasicMaterial({ color: 0x101114 })); retro.position.copy(m.position); retro.rotation.copy(m.rotation); retro.translateZ(-0.25); retro.rotateY(Math.PI); scena.add(retro)
        // il riflesso sul pavimento lucido: la tavola capovolta sotto terra, sfocata e che svanisce
        const rif = new THREE.Mesh(new THREE.PlaneGeometry(W + 1.4, H + 1.4), materialeRiflesso(p.id, y - cy, H)); rif.position.set(x, cy - (y - cy), z); rif.rotation.copy(m.rotation); rif.scale.y = -1; rif.renderOrder = -1; scena.add(rif)
        if (rovina) m.rotation.z += (caso() - 0.5) * 0.12
        scena.add(m); m.userData = { tipo: 'tavola', p }; cliccabili.push(m); meshDi.set(p.id, { m, w: W, h: H, aTerra: false, cornice })
      })
      piano[0] = Math.max(piano[0], ...messe.map(m => Math.abs(m.u) * 2 + m.W)); piano[1] = Math.max(piano[1], ...messe.map(m => m.v + m.H / 2 + 30))
    })
    const nomeCur = sala.curatore ? nomeDi(sala.curatore) : null
    const e = etichetta(`<div class="t">${esc(c.nome)}</div><div class="s">${q ? `${q.n} tavole` : ''}${rovina ? ' · abbandonata' : ''}${nomeCur ? ` · curata ${esc(da(nomeCur))}` : ''}</div>`, centro.clone().add(new THREE.Vector3(0, piano[1] + 10, 0)), 700, 'sala')
    const rec = { c, q, sala, centro, verso: ax, n, forma, aMondo, piano }
    e.el.onclick = () => vaiA(rec)
    sale.push(rec)
  }

  // ── i territori sono stanze enormi: tutto quello che Copibolo ha fatto ci sta, finché qualcuno non lo cancella.
  // Ogni tavola resta nel suo punto del territorio (dove i suoi legami l'hanno messa), sospesa più in alto quanto più conta,
  // grande quanto conta; le più amate sono quelle che il curatore ha già appeso al centro. Chi ha un'immagine la mostra
  // (grande se recente, piccola per sempre); chi non ce l'ha più mostra il suo titolo, come un cartellino. ─────────
  {
    const fronte = 0 // tutte rivolte allo stesso verso, come le pagine di un atlante aperto
    const resto = D.punti.filter(p => !meshDi.has(p.id))
    for (const p of resto.filter(p => p.img || p.mini)) {
      const x = X(p.x), z = Z(p.y), k = 0.35 + (p.i ?? 0.3), W = 4 + 9 * k, H = W * 1.25, y = altezza(x, z) + H / 2 + 1 + 14 * (p.i ?? 0.3) ** 2
      const m = new THREE.Mesh(new THREE.PlaneGeometry(W, H), tavolaMatDa(p.img ? `img/${p.id}.jpg` : `mini/${p.id}.jpg`)); m.position.set(x, y, z); m.rotation.y = fronte
      const cornice = new THREE.Mesh(new THREE.PlaneGeometry(W + 0.7, H + 0.7), new THREE.MeshBasicMaterial({ color: 0xd9dbe6 })); cornice.position.copy(m.position); cornice.rotation.y = fronte; cornice.translateZ(-0.08)
      scena.add(cornice); scena.add(m); m.userData = { tipo: 'tavola', p }; cliccabili.push(m); meshDi.set(p.id, { m, w: W, h: H, aTerra: false, cornice })
    }
    // i cartellini: i titoli delle tavole senza immagine, su poche tele grandi (una per 192 cartellini), uniti in una geometria sola per tela
    const senza = resto.filter(p => !p.img && !p.mini).sort((a, b) => b.i - a.i).slice(0, 480), CW = 128, CH = 160, PER = 16 * 12
    for (let t = 0; t * PER < senza.length; t++) {
      const parte = senza.slice(t * PER, (t + 1) * PER), cv = document.createElement('canvas'); cv.width = 2048; cv.height = 1920; const g = cv.getContext('2d')
      const pos = [], uv = [], ind = []
      parte.forEach((p, i) => {
        const cx = (i % 16) * CW, cy = Math.floor(i / 16) * CH
        g.strokeStyle = 'rgba(232,226,214,.35)'; g.beginPath(); g.moveTo(cx + 9, cy + 6); g.lineTo(cx + 40, cy + 6); g.stroke()
        g.fillStyle = '#e8e2d6'; g.font = '600 15px Inter, sans-serif'; const parole = (p.t || 'senza titolo').split(/\s+/); let riga = '', yy = cy + 24
        for (const w of parole) { if (g.measureText(riga + ' ' + w).width > CW - 18) { g.fillText(riga, cx + 9, yy); riga = w; yy += 18; if (yy > cy + CH - 30) break } else riga = riga ? riga + ' ' + w : w }
        if (yy <= cy + CH - 30) g.fillText(riga, cx + 9, yy)
        g.fillStyle = 'rgba(232,226,214,.5)'; g.font = '11px JetBrains Mono, monospace'; g.fillText(`giorno ${p.g}`, cx + 9, cy + CH - 12)
        const x = X(p.x), z = Z(p.y), k = 0.3 + (p.i ?? 0.3), W = 3 + 6 * k, H = W * 1.25, y = altezza(x, z) + 8 + 34 * (p.i ?? 0.3), b = pos.length / 3
        pos.push(x - W / 2, y - H / 2, z, x + W / 2, y - H / 2, z, x + W / 2, y + H / 2, z, x - W / 2, y + H / 2, z)
        const u0 = cx / 2048, u1 = (cx + CW) / 2048, v0 = 1 - (cy + CH) / 1920, v1 = 1 - cy / 1920
        uv.push(u0, v0, u1, v0, u1, v1, u0, v1); ind.push(b, b + 1, b + 2, b, b + 2, b + 3)
      })
      const geo = new THREE.BufferGeometry(); geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); geo.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2)); geo.setIndex(ind)
      const tx = new THREE.CanvasTexture(cv); tx.encoding = THREE.sRGBEncoding; tx.anisotropy = 4
      const cm = new THREE.MeshBasicMaterial({ map: tx, side: THREE.DoubleSide, transparent: true, opacity: 0, depthWrite: false }); cartMat.push(cm); scena.add(new THREE.Mesh(geo, cm))
    }
  }

  // ── gli interventi dei cittadini: lavorano sui piani delle tavole, che sono muri invisibili. Rilievi, parole,
  // ritagli da altre aree, ologrammi: la sala diventa un pezzo di un'architettura-collage. ──────────────────────
  const scritta = (testo, alto, colore = '#121212', peso = 700) => {
    const cv = document.createElement('canvas'), g = cv.getContext('2d'), fs = 96; g.font = `${peso} ${fs}px ${D.stile?.titoli ?? 'Inter'}, Inter, sans-serif`
    const lw = Math.ceil(g.measureText(testo).width) + 16; cv.width = lw; cv.height = fs * 1.3; g.font = `${peso} ${fs}px ${D.stile?.titoli ?? 'Inter'}, Inter, sans-serif`; g.fillStyle = colore; g.textBaseline = 'middle'; g.shadowColor = 'rgba(0,0,0,.85)'; g.shadowBlur = 10; g.fillText(testo, 8, cv.height / 2)
    const t = new THREE.CanvasTexture(cv); t.encoding = THREE.sRGBEncoding; t.anisotropy = 8
    const m = new THREE.Mesh(new THREE.PlaneGeometry(alto * cv.width / cv.height, alto), new THREE.MeshBasicMaterial({ map: t, transparent: true, depthWrite: false, side: THREE.DoubleSide })); m.userData.largo = alto * cv.width / cv.height; return m
  }
  const ologrammi = []
  // i gesti per terra: ognuno col suo strumento (la mano del generatore) e il suo filtro, steso sul prato
  const gestoTela = d => {
    const cv = document.createElement('canvas'); cv.width = cv.height = 192; const g = cv.getContext('2d'); let h = 0; for (const ch of (d.gesto ?? '') + d.strumento) h = (h * 31 + ch.charCodeAt(0)) >>> 0
    const rr = () => ((h = (h * 1664525 + 1013904223) >>> 0) / 4294967296), col = d.colore ?? '#e3361b', due = ['#1b1b1b', '#e8e2d6', '#ff8fa8', '#3b6fd8'][h % 4]
    g.translate(96, 96); const st = d.strumento ?? 'materia'
    if (/albero|semina|acanto|spirale/.test(st)) { g.strokeStyle = col; const ramo = (x, y, a, l, n) => { const x2 = x + Math.cos(a) * l, y2 = y + Math.sin(a) * l; g.lineWidth = n; g.beginPath(); g.moveTo(x, y); g.lineTo(x2, y2); g.stroke(); if (n > 1) { ramo(x2, y2, a - 0.4 - rr() * 0.4, l * 0.72, n - 1); ramo(x2, y2, a + 0.4 + rr() * 0.4, l * 0.72, n - 1) } }; for (let k = 0; k < 5; k++) ramo(0, 0, k * 1.256, 26, 6) }
    else if (/muffa|cristallo|reazione|voronoi/.test(st)) { for (let k = 0; k < 160; k++) { const a = rr() * 6.28, d0 = Math.sqrt(rr()) * 86; g.fillStyle = k % 3 ? col : due; g.globalAlpha = 0.7; if (/cristallo/.test(st)) { g.save(); g.translate(Math.cos(a) * d0, Math.sin(a) * d0); g.rotate(a); g.fillRect(-3, -9, 6, 18); g.restore() } else { g.beginPath(); g.arc(Math.cos(a) * d0, Math.sin(a) * d0, 2 + rr() * 7, 0, 7); g.fill() } } }
    else if (/acqua|universo|fotocosmo|shader|metashader|marmor|frattale/.test(st)) { const gr = g.createRadialGradient(0, 0, 4, 0, 0, 92); gr.addColorStop(0, col); gr.addColorStop(0.6, due); gr.addColorStop(1, 'rgba(0,0,0,0)'); g.fillStyle = gr; g.beginPath(); g.arc(0, 0, 92, 0, 7); g.fill(); g.fillStyle = '#fff'; for (let k = 0; k < 60; k++) g.fillRect((rr() - 0.5) * 150, (rr() - 0.5) * 150, 1.5, 1.5) }
    else if (/pattern|ripeti|grana|ricetta|intreccio|arabesco|damasco|pied|moir/.test(st)) { g.fillStyle = col; for (let y = -90; y < 90; y += 10) for (let x = -90; x < 90; x += 10) if (Math.hypot(x, y) < 88) { g.beginPath(); g.arc(x, y, 1 + 3.5 * (0.5 + 0.5 * Math.sin(x * 0.07 + y * 0.05)), 0, 7); g.fill() } }
    else if (/geometria|taglia|togli|schiaccia|meandro|guilloch|rosone|cosmat|labirinto/.test(st)) { g.strokeStyle = col; g.lineWidth = 5; for (let k = 1; k < 7; k++) { g.rotate(0.12); g.strokeRect(-k * 13, -k * 13, k * 26, k * 26) } }
    else if (/traccia|scrivi|xilograf/.test(st) || !d.strumento) { g.fillStyle = col; g.font = '700 30px Inter, sans-serif'; g.textAlign = 'center'; g.fillText(d.parola ?? '', 0, 10); g.strokeStyle = due; g.lineWidth = 3; g.beginPath(); for (let k = 0; k < 40; k++) g.lineTo(Math.cos(k * 0.5) * (40 + k), Math.sin(k * 0.5) * (40 + k) * 0.6); g.stroke() }
    else { for (let k = 0; k < 9; k++) { g.fillStyle = k % 2 ? col : due; g.globalAlpha = 0.8; g.beginPath(); g.ellipse((rr() - 0.5) * 100, (rr() - 0.5) * 100, 14 + rr() * 40, 10 + rr() * 26, rr() * 3, 0, 7); g.fill() } }
    g.setTransform(1, 0, 0, 1, 0, 0); g.globalAlpha = 1
    // il filtro, a modo suo
    const f = d.filtro ?? ''
    if (/Risograph|Halftone|Dither/.test(f)) { const im = g.getImageData(0, 0, 192, 192); for (let y = 0; y < 192; y++) for (let x = 0; x < 192; x++) { const i = (y * 192 + x) * 4; if (((x >> 2) + (y >> 2)) % 2) im.data[i + 3] *= 0.45 } g.putImageData(im, 0, 0) }
    else if (/Glitch|VHS|Wavy|Liquid/.test(f)) { for (let k = 0; k < 14; k++) { const y = Math.floor(rr() * 180), hh = 2 + rr() * 8; g.drawImage(cv, 0, y, 192, hh, (rr() - 0.5) * 24, y, 192, hh) } }
    else if (/Pixelate|ASCII|Posterize/.test(f)) { const t = document.createElement('canvas'); t.width = t.height = 24; t.getContext('2d').drawImage(cv, 0, 0, 24, 24); g.clearRect(0, 0, 192, 192); g.imageSmoothingEnabled = false; g.drawImage(t, 0, 0, 192, 192) }
    else if (/Neon|Bloom|Holographic|Prism/.test(f)) { g.globalCompositeOperation = 'lighter'; g.filter = 'blur(6px)'; g.drawImage(cv, 0, 0); g.filter = 'none'; g.globalCompositeOperation = 'source-over' }
    const tx = new THREE.CanvasTexture(cv); tx.encoding = THREE.sRGBEncoding; return tx }
  for (const c of costr.filter(c => c.tipo === 'intervento' && c.nome === 'suolo' && c.stato !== 'tolto' && c.pos?.x != null).slice(-120)) {
    const d = c.dati ?? {}, x = X(c.pos.x), z = Z(c.pos.y), lato = 14 + (c.id.length % 5) * 3
    const m = new THREE.Mesh(toppa(x - lato / 2, z - lato / 2, lato, lato, 0.35, 16), new THREE.MeshBasicMaterial({ map: gestoTela(d), transparent: true, depthWrite: false }))
    m.geometry.attributes.uv && m.geometry.computeBoundingBox(); m.renderOrder = 2; scena.add(m)
  }
  for (const c of costr.filter(c => c.tipo === 'intervento' && c.nome !== 'suolo' && c.stato !== 'tolto')) {
    const R = sale.find(s => s.c.id === c.a), d = c.dati ?? {}; if (!R) continue
    const base = meshDi.get(d.su ?? d.tavola), chi = nomeDi(c.chi)
    if (d.tipo === 'rilievo') { const p = posDi.get(d.tavola); if (!p?.img) continue; const m = rilievo(p.id, 22, 27.5, 6); m.rotation.x = -Math.PI / 2; m.rotation.z = R.verso; const [x, z] = R.aMondo(0, R.piano[1] / 2 + 22); m.position.set(x, altezza(x, z) + 1.5, z); scena.add(m); m.userData = { tipo: 'tavola', p, nota: `Sollevata in rilievo da ${chi}.` }; cliccabili.push(m) }
    else if (d.tipo === 'parola' && base) { const m = scritta(d.parola ?? '', 5); m.position.copy(base.m.position); m.rotation.copy(base.m.rotation); m.translateX(base.w / 2 + m.userData.largo / 2 + 2); m.translateY(base.aTerra ? 0 : -base.h / 2 + 3); m.translateZ(base.aTerra ? 0.3 : 0.1); scena.add(m) }
    else if (d.tipo === 'ritaglio' && base) { const p = posDi.get(d.tavola); if (!p?.img) continue; const t = d.taglio ?? [0.25, 0.25, 0.5, 0.5], m = new THREE.Mesh(new THREE.PlaneGeometry(base.w * t[2] * 1.2, base.h * t[3] * 1.2), tavolaMat(p.id, t)); m.position.copy(base.m.position); m.rotation.copy(base.m.rotation); m.translateX(-(base.w / 2 + base.w * t[2] * 0.6 + 2)); m.translateY(base.h * 0.18); m.translateZ(0.2); scena.add(m); m.userData = { tipo: 'tavola', p, nota: `Ritaglio incollato qui da ${chi}: viene da un'altra area.` }; cliccabili.push(m) }
    else if (d.tipo === 'ologramma' && base) {
      const p = posDi.get(d.tavola); if (!p?.img) continue
      const mat = new THREE.ShaderMaterial({ uniforms: { mappa: { value: null }, t: { value: 0 } }, transparent: true, depthWrite: false, side: THREE.DoubleSide,
        vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.); }',
        fragmentShader: 'uniform sampler2D mappa; uniform float t; varying vec2 vUv; void main(){ vec3 c = texture2D(mappa, vUv).rgb; float l = dot(c, vec3(.3,.59,.11)); float riga = .6 + .4*step(.5, fract(vUv.y*90. - t*.6)); vec3 col = mix(vec3(.55,.75,.95), c, .45); gl_FragColor = vec4(col*riga, (.18 + .45*l) * (.75 + .25*sin(t*1.3 + vUv.y*6.))); }' })
      texture(p.id).then(tx => { mat.uniforms.mappa.value = tx })
      const m = new THREE.Mesh(new THREE.PlaneGeometry(base.w, base.h), mat)
      if (base.aTerra) { m.position.copy(base.m.position); m.position.y += base.h / 2 + 3; m.rotation.y = R.verso } // la tavola stesa: l'ologramma si alza in piedi sopra di lei
      else { m.position.copy(base.m.position); m.rotation.copy(base.m.rotation); m.position.y += base.h + 3 }
      scena.add(m); ologrammi.push(mat)
    }
  }

  // ── i piani: livelli trasparenti che gli abitanti mettono nello spazio (velari, soglie, fondali, tavole sospese)
  // e il colore che danno alle cornici. Ogni piano ha il suo autore e la sua ragione, nella scheda della sala. ──────
  const pianoSmussato = (L, H, r) => { const s = new THREE.Shape(), x = -L / 2, y = -H / 2; s.moveTo(x + r, y); s.lineTo(x + L - r, y); s.quadraticCurveTo(x + L, y, x + L, y + r); s.lineTo(x + L, y + H - r); s.quadraticCurveTo(x + L, y + H, x + L - r, y + H); s.lineTo(x + r, y + H); s.quadraticCurveTo(x, y + H, x, y + H - r); s.lineTo(x, y + r); s.quadraticCurveTo(x, y, x + r, y)
    const g = new THREE.ShapeGeometry(s, 12), p = g.attributes.position, uv = g.attributes.uv; for (let i = 0; i < p.count; i++) uv.setXY(i, (p.getX(i) + L / 2) / L, (p.getY(i) + H / 2) / H); return g }
  const motivo = codice => {
    let corpo = codice.replace(/#version[^\n]*\n/g, '').replace(/\bgl_FragCoord\b/g, 'vec4(vU*u_resolution,0.,1.)').replace(/void\s+main\s*\(\s*\)/, 'void fondo_main()')
    const frag = `uniform float u_time; uniform vec2 u_resolution; uniform float u_seed; uniform float opacita; varying vec2 vU;\n${corpo}\nvoid main(){ fondo_main(); gl_FragColor.a = opacita; }`
    const cv = document.createElement('canvas').getContext('webgl'); if (cv) { const sh = cv.createShader(cv.FRAGMENT_SHADER); cv.shaderSource(sh, 'precision highp float;\n' + frag); cv.compileShader(sh); if (!cv.getShaderParameter(sh, cv.COMPILE_STATUS)) return null }
    const mat = new THREE.ShaderMaterial({ uniforms: { u_time: { value: 0 }, u_resolution: { value: new THREE.Vector2(512, 512) }, u_seed: { value: 3.1 }, opacita: { value: 0.4 } }, transparent: true, depthWrite: false, side: THREE.DoubleSide,
      vertexShader: 'varying vec2 vU; void main(){ vU = uv; gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.); }', fragmentShader: frag })
    fondiVivi.push(mat); return mat
  }
  // una macchia di colore con l'orlo irregolare, come pigmento soffiato: mai un rettangolo
  const macchiaTx = (col, seme) => { const cv = document.createElement('canvas'); cv.width = cv.height = 128; const g = cv.getContext('2d'); let h = 0; for (const ch of String(seme)) h = (h * 31 + ch.charCodeAt(0)) >>> 0; const rr = () => ((h = (h * 1664525 + 1013904223) >>> 0) / 4294967296)
    for (let k = 0; k < 22; k++) { const x = 64 + (rr() - 0.5) * 70, y = 64 + (rr() - 0.5) * 70, rad = 14 + rr() * 30, gr = g.createRadialGradient(x, y, 0, x, y, rad); gr.addColorStop(0, col); gr.addColorStop(1, 'rgba(0,0,0,0)'); g.globalAlpha = 0.35; g.fillStyle = gr; g.beginPath(); g.arc(x, y, rad, 0, 7); g.fill() }
    const tx = new THREE.CanvasTexture(cv); tx.encoding = THREE.sRGBEncoding; return tx }
  for (const c of costr.filter(c => c.tipo === 'piano' && c.stato !== 'tolto')) {
    const R = sale.find(s => s.c.id === c.a), d = c.dati ?? {}; if (!R) continue
    if (d.contenuto === 'cornici') { for (const id of d.tavole ?? []) { const t = meshDi.get(id); if (t?.cornice) t.cornice.material = new THREE.MeshBasicMaterial({ color: new THREE.Color(d.colore ?? '#e3361b') }) } continue }
    const lz = d.avanti === 1 ? R.piano[1] * 0.5 + 6 : d.avanti === -1 ? -R.piano[1] * 0.5 - 6 : 0, [x, z] = R.aMondo(0, lz), y = R.centro.y + (d.quota ?? 30)
    const L = d.largo ?? 60, H = d.alto ?? 40, g = new THREE.PlaneGeometry(L, H)
    let mat
    // niente lastre di vetro: il piano è solo il gesto che ci sta sopra (uno strumento, una macchia di colore, una parola, una tavola)
    if (d.contenuto === 'parola') { if (!d.parola) continue; const sc = scritta(d.parola, 7, '#f1ece2', 600), o2 = new THREE.Group(); o2.position.set(x, y, z); o2.rotation.y = R.verso; o2.add(sc); scena.add(o2); continue }
    if (d.strumento && (d.contenuto === 'colore' || d.contenuto === 'motivo')) { mat = new THREE.MeshBasicMaterial({ map: gestoTela(d), transparent: true, side: THREE.DoubleSide, depthWrite: false }) }
    else if (d.contenuto === 'colore') { mat = new THREE.MeshBasicMaterial({ map: macchiaTx(d.colore ?? '#ff8fa8', c.id), transparent: true, opacity: 0.85, side: THREE.DoubleSide, depthWrite: false }) }
    if (d.contenuto === 'motivo' && d.tessuto) { mat = tavolaMatDa(`tessuti/${d.tessuto}.jpg`); mat.transparent = true; mat.opacity = Math.max(0.55, d.opacita ?? 0.4); mat.depthWrite = false } // tessuto con un generatore vero
    else if (d.contenuto === 'motivo') { mat = R.q?.sala?.suolo?.codice ? motivo(R.q.sala.suolo.codice) : null; if (mat) mat.uniforms.opacita.value = d.opacita ?? 0.4 }
    else if (d.contenuto === 'tavola') { const p = posDi.get(d.tavola); if (p?.img) { mat = tavolaMat(p.id); mat.transparent = true; mat.opacity = d.opacita ?? 0.6; mat.depthWrite = false } }
    if (!mat) mat = new THREE.MeshBasicMaterial({ map: macchiaTx(d.colore ?? '#ff8fa8', c.id), transparent: true, opacity: 0.8, side: THREE.DoubleSide, depthWrite: false })
    const m = new THREE.Mesh(g, mat), ordine = new THREE.Group(); ordine.position.set(x, y, z)
    if (d.verso === 'orizzontale') { m.rotation.x = -Math.PI / 2; ordine.rotation.y = R.verso } else ordine.rotation.y = R.verso
    ordine.add(m)
    m.renderOrder = 3; scena.add(ordine)
    if (d.contenuto === 'tavola') { m.userData = { tipo: 'tavola', p: posDi.get(d.tavola), nota: `Sospesa su un piano da ${nomeDi(c.chi)}.` }; cliccabili.push(m) }
  }

  // ── le parole: i concetti, in aria. Grandi quanto contano, più in alto quanto più legano aree diverse; uno spillo le
  // lega al suolo, i fili nell'aria le legano tra loro (quanto condividono le stesse aree). ──────────────────────
  const scritte = []
  {
    const lista = [...parole.values()].sort((a, b) => b.tot - a.tot).slice(0, 30), taglie = [14, 9, 6, 5]
    lista.forEach((P, i) => {
      const cl = i < 6 ? 0 : i < 14 ? 1 : 2, alto = taglie[cl], x = X(P.x), z = Z(P.y), y = altezza(x, z) + 115 + P.generale * 160 + (2 - cl) * 20
      const m = scritta(P.w, alto, cl === 0 ? '#f1ece2' : '#cfc9be', cl < 2 ? 600 : 500); m.position.set(x, y, z); m.renderOrder = 5; scena.add(m)
      m.userData = { tipo: 'parola', P, cl }; cliccabili.push(m); scritte.push(m); P.mesh = m; P.base = new THREE.Vector3(x, y - alto / 2 - 1, z)
      const spillo = new THREE.BufferGeometry().setFromPoints([P.base, new THREE.Vector3(x, altezza(x, z) + 0.6, z)])
      if (cl < 2) scena.add(new THREE.Line(spillo, new THREE.LineBasicMaterial({ color: 0xe8e2d6, transparent: true, opacity: cl ? 0.12 : 0.22 })))
    })
    // i fili tra le parole: quanto si somigliano le loro distribuzioni sulle aree
    const sim = (A, B) => { let s = 0, a = 0, b = 0; for (let k = 0; k < NQ; k++) { s += A.dist[k] * B.dist[k]; a += A.dist[k] ** 2; b += B.dist[k] ** 2 } return s / (Math.sqrt(a * b) || 1) }
    const fatti = new Set()
    for (const A of lista) {
      const vicini = lista.filter(B => B !== A).map(B => [B, sim(A, B)]).filter(([, s]) => s > 0.2).sort((a, b) => b[1] - a[1]).slice(0, 3)
      for (const [B, s] of vicini) {
        const k = [A.w, B.w].sort().join('|'); if (fatti.has(k)) continue; fatti.add(k)
        const M = A.base.clone().lerp(B.base, 0.5); M.y += A.base.distanceTo(B.base) * 0.12
        const g = new THREE.BufferGeometry().setFromPoints(new THREE.QuadraticBezierCurve3(A.base, M, B.base).getPoints(32))
        scena.add(new THREE.Line(g, new THREE.LineBasicMaterial({ color: s > 0.75 ? 0xe3361b : 0xe8e2d6, transparent: true, opacity: 0.06 + 0.25 * s })))
      }
    }
  }

  // i graffiti: una tavola di un altro quartiere stesa di notte vicino alla sala, appena storta
  for (const c of costr.filter(c => c.tipo === 'graffito')) {
    const A = sale.find(s => s.c.id === c.a), p = posDi.get(c.dati?.tavola); if (!A || !p?.img) continue
    const x = A.centro.x + (caso() - 0.5) * 50, z = A.centro.z + (caso() - 0.5) * 50, y = altezza(x, z)
    const m = new THREE.Mesh(new THREE.PlaneGeometry(10, 12.5), tavolaMat(p.id)); m.position.set(x, y + 16, z); m.rotation.set(0, Math.floor(caso() * 2) * Math.PI / 2, (caso() - 0.5) * 0.15); scena.add(m)
    m.userData = { tipo: 'tavola', p, graffito: nomeDi(c.chi) }; cliccabili.push(m)
  }
  // il monumento: la tavola più amata, stesa in piazza e sollevata in rilievo
  for (const c of costr.filter(c => c.tipo === 'monumento' && c.dati?.tavola)) { const p = posDi.get(c.dati.tavola); if (!p?.img) continue; const m = rilievo(p.id, 40, 50, 9); m.rotation.x = -Math.PI / 2; m.position.set(PZ.x, PZ.y + 1.5, PZ.z); scena.add(m); m.userData = { tipo: 'tavola', p, monumento: true }; cliccabili.push(m) }
  // i mondi scoperti dall'osservatorio: solo un nome sul suolo, ai margini
  for (const c of costr.filter(c => c.tipo === 'torre')) { const a = c.pos?.angolo ?? caso() * 6.28, x = Math.max(-LX / 2 + 15, Math.min(LX / 2 - 15, PZ.x + Math.cos(a) * LX * 0.45)), z = Math.max(-LZ / 2 + 15, Math.min(LZ / 2 - 15, PZ.z + Math.sin(a) * LZ * 0.45)), y = altezza(x, z); etichetta(`<div class="s">un mondo scoperto</div><div class="t" style="font-size:12px">${esc(c.nome)}</div>`, new THREE.Vector3(x, y + 16, z), 700) }
  // il guardaroba: un posto in piazza dove si va a cambiarsi (un cerchio a terra e un appendiabiti)
  const GUARD = new THREE.Vector3(PZ.x - 40, 0, PZ.z + 34); GUARD.y = altezza(GUARD.x, GUARD.z)
  if (!D.vita) etichetta('<div class="t" style="font-size:13px">il guardaroba</div><div class="s">qui ci si cambia</div>', GUARD.clone().add(new THREE.Vector3(0, 18, 0)), 600)
  etichetta(`<div class="t">${esc(D.nome ?? 'La città senza nome')}</div><div class="s">la piazza · giorno ${D.giorno}</div>`, PZ.clone().add(new THREE.Vector3(0, 75, 0)), 4000)
  // i nomi delle strade
  for (const s of strade) { const nome = K.nomiVie?.[s.c.id]; if (!nome) continue; const pts = curvaStrada(s), [x, y] = pts[20], wx = X(x), wz = Z(y); etichetta(`<div class="s" style="font-style:italic;opacity:.8">${esc(nome)}</div>`, new THREE.Vector3(wx, altezza(wx, wz) + 4, wz), 650) }

  // ── gli abitanti: le figure di Porto Vecchio, vestite coi capi del guardaroba, che camminano per le strade ────
  const gente = []
  const viaPer = (a, b) => { const s = strade.find(s => (s.c.a === a && s.c.b === b) || (s.c.a === b && s.c.b === a)); if (!s) return null; const pts = curvaStrada(s).map(([x, y]) => { const wx = X(x), wz = Z(y); return new THREE.Vector3(wx, altezza(wx, wz), wz) }); return s.c.a === a ? pts : pts.reverse() }
  // ── la vita: i luoghi dove vivono (piazza, mensa, biblioteca, bottega, officina, osservatorio, archivio, assemblea,
  // guardaroba, fontana, orto, le case, i confini, le strade), le vie che consumano camminando, e quello che lasciano.
  const VI = D.vita, LG = new Map(), W = l => { const x = X(l.x), z = Z(l.y); return new THREE.Vector3(x, altezza(x, z), z) }
  const LUOGHI = {}
  if (VI) for (const l of VI.luoghi) { const v = W(l); LG.set(l.id, { l, v }); LUOGHI[l.id] = v
    if (!['casa', 'strada', 'sala'].includes(l.tipo)) etichetta(`<div class="s" style="letter-spacing:.12em;text-transform:uppercase;opacity:.7">${esc(l.nome)}</div>`, v.clone().add(new THREE.Vector3(0, 10, 0)), l.tipo === 'confine' ? 420 : 900, 'luogo') }
  else Object.assign(LUOGHI, { piazza: PZ.clone() })
  if (VI) {
    // le vie: dove passano spesso diventano sentieri chiari, tanto più larghi quanto più battuti (desideri, non progetti)
    const vmax = Math.max(1, ...VI.vie.map(v => v[2]))
    const vg = [], vc = []
    for (const [a, b, n] of VI.vie.slice().sort((x, y) => y[2] - x[2]).slice(0, 70)) { const A = LG.get(a)?.v, B = LG.get(b)?.v; if (!A || !B || n < 3) continue
      const k = Math.log(1 + n) / Math.log(1 + vmax), M = A.clone().lerp(B, 0.5), off = new THREE.Vector3(-(B.z - A.z), 0, B.x - A.x).normalize().multiplyScalar(A.distanceTo(B) * 0.08 * (((a.length + b.length) % 3) - 1))
      M.add(off); const pts = new THREE.QuadraticBezierCurve3(A, M, B).getPoints(16)
      for (let t = 0; t < pts.length - 1; t++) { const P = pts[t], Q = pts[t + 1]; P.y = altezza(P.x, P.z) + 0.25; Q.y = altezza(Q.x, Q.z) + 0.25; vg.push(P.x, P.y, P.z, Q.x, Q.y, Q.z); const c = 0.55 + 0.4 * k; vc.push(c, c * 0.82, c * 0.5, c, c * 0.82, c * 0.5) } }
    const gv = new THREE.BufferGeometry(); gv.setAttribute('position', new THREE.Float32BufferAttribute(vg, 3)); gv.setAttribute('color', new THREE.Float32BufferAttribute(vc, 3))
    scena.add(new THREE.LineSegments(gv, new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.7, depthWrite: false })))
    // le cose lasciate: ognuna nel suo modo, grande quanto è stata ripetuta
    const hash = str => { let h = 2166136261; for (const ch of str) h = Math.imul(h ^ ch.charCodeAt(0), 16777619); return () => ((h = Math.imul(h ^ (h >>> 13), 1274126177)) >>> 0) / 4294967296 }
    const tela = (t, w, h) => { // una piccola composizione: il gesto di chi l'ha fatta, coi suoi colori, sempre diversa
      const cv = document.createElement('canvas'); cv.width = 128; cv.height = 160; const g = cv.getContext('2d'), rr = hash(t.id)
      g.fillStyle = '#e8e2d6'; g.fillRect(0, 0, 128, 160); g.fillStyle = t.colore ?? '#e3361b'
      const modo = ({ stampa: 'retino', scritta: 'segno', opera: 'collage', macchia: 'macchia', festa: 'righe' })[t.tipo] ?? 'collage'
      if (modo === 'retino') { for (let y = 6; y < 160; y += 8) for (let x = 6; x < 128; x += 8) { const r0 = 3.4 * (0.5 + 0.5 * Math.sin(x * 0.05 + y * 0.03 + rr() * 6)); g.beginPath(); g.arc(x, y, r0, 0, 7); g.fill() } }
      else if (modo === 'segno') { g.lineWidth = 6; g.strokeStyle = t.colore; g.beginPath(); let x = 10, y = 30 + rr() * 30; g.moveTo(x, y); for (let k = 0; k < 9; k++) { x += 12; y += (rr() - 0.5) * 50; g.lineTo(x, Math.max(10, Math.min(150, y))) } g.stroke() }
      else if (modo === 'righe') { for (let k = 0; k < 8; k++) { g.fillStyle = k % 2 ? t.colore : '#1b1b1b'; g.fillRect(0, k * 20, 128, 10) } }
      else for (let k = 0; k < 3 + t.volte % 5; k++) { g.fillStyle = k % 2 ? t.colore : ['#1b1b1b', '#3b6fd8', '#e8c547'][k % 3]; g.globalAlpha = 0.85; g.fillRect(rr() * 90, rr() * 120, 20 + rr() * 60, 14 + rr() * 50) }
      g.globalAlpha = 1; g.fillStyle = '#1b1b1b'; g.font = '600 11px Inter, sans-serif'; g.fillText((t.nome ?? '').slice(0, 20), 6, 152)
      const tx = new THREE.CanvasTexture(cv); tx.encoding = THREE.sRGBEncoding; return new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ map: tx, side: THREE.DoubleSide })) }
    const albero = (P, alto, col) => { // un alberello che cresce con le cure: rami che si dividono
      const lin = [], rr = hash(P.x.toFixed(1)), ramo = (a, dir, len, d) => { const b = a.clone().addScaledVector(dir, len); lin.push(a.x, a.y, a.z, b.x, b.y, b.z); if (d <= 0) return; for (let k = 0; k < 2 + (rr() < 0.3 ? 1 : 0); k++) { const nd = dir.clone().add(new THREE.Vector3((rr() - 0.5) * 1.2, 0.3 + rr() * 0.4, (rr() - 0.5) * 1.2)).normalize(); ramo(b, nd, len * 0.7, d - 1) } }
      ramo(P.clone(), new THREE.Vector3(0, 1, 0), alto * 0.35, Math.min(5, 2 + Math.floor(alto / 6)))
      const gg = new THREE.BufferGeometry(); gg.setAttribute('position', new THREE.Float32BufferAttribute(lin, 3)); scena.add(new THREE.LineSegments(gg, new THREE.LineBasicMaterial({ color: col, transparent: true, opacity: 0.85 }))) }
    // di ogni luogo restano in vista le cose più riprese e le più recenti (le altre restano nella storia), disposte attorno
    const perLuogo = new Map(), oggiG = D.giorno ?? 0
    const vive = VI.tracce.filter(t => t.volte >= 2 || oggiG - t.ultimo < 6).sort((a, b) => b.volte - a.volte).filter(t => { const n = perLuogo.get(t.luogo + t.tipo) ?? 0; perLuogo.set(t.luogo + t.tipo, n + 1); return n < (['opera', 'stampa', 'scritta'].includes(t.tipo) ? 6 : 3) })
    const giro = new Map()
    for (const t of vive) {
      if (['opera', 'stampa', 'scritta', 'festa'].includes(t.tipo)) { const n = giro.get(t.luogo) ?? 0; giro.set(t.luogo, n + 1); const L = LG.get(t.luogo)?.l; if (L) { const an = n * 2.39996, d = 10 + 3.2 * Math.sqrt(n) * 2; t.x = L.x + Math.cos(an) * d; t.y = L.y + Math.sin(an) * d } }
      const x = X(t.x), z = Z(t.y), y = altezza(x, z), k = Math.min(1, Math.log(1 + t.volte) / Math.log(30))
      if (t.tipo === 'pianta') albero(new THREE.Vector3(x, y, z), 4 + 16 * k, t.nome ? 0x9fd3a7 : 0x6fa37a)
      else if (t.tipo === 'macchia' || t.tipo === 'scavo') { const m = new THREE.Mesh(new THREE.CircleGeometry(2 + 7 * k, 24), new THREE.MeshBasicMaterial({ color: t.tipo === 'scavo' ? 0x3a3128 : t.colore, transparent: true, opacity: 0.55, depthWrite: false })); m.rotation.x = -Math.PI / 2; m.position.set(x, y + 0.2, z); scena.add(m) }
      else if (t.tipo === 'incontro') { const m = new THREE.Mesh(new THREE.RingGeometry(2 + 6 * k, 2.6 + 6 * k, 32), new THREE.MeshBasicMaterial({ color: 0xe8e2d6, transparent: true, opacity: 0.25, depthWrite: false })); m.rotation.x = -Math.PI / 2; m.position.set(x, y + 0.25, z); scena.add(m)
        const b = new THREE.Mesh(new THREE.BoxGeometry(4, 0.6, 1.2), new THREE.MeshStandardMaterial({ color: 0x8a7258 })); b.position.set(x, y + 0.9, z); scena.add(b) }
      else if (['opera', 'stampa', 'scritta', 'festa'].includes(t.tipo)) { // in piedi, appoggiate o appese: ognuna come l'ha voluta chi l'ha fatta
        const rr = hash(t.id), w = 2.5 + 3.5 * k, m = tela(t, w, w * 1.25); m.position.set(x, y + w * 0.62 + (t.tipo === 'festa' ? 8 : 0), z); m.rotation.y = rr() * Math.PI * 2; m.rotation.z = (rr() - 0.5) * 0.25
        if (t.tipo === 'opera' && rr() < 0.3) { m.rotation.x = -Math.PI / 2 + 0.2; m.position.y = y + 0.4 } // a terra, come un tappeto
        scena.add(m); m.userData = { tipo: 'traccia', t }; cliccabili.push(m) }
      else { const m = new THREE.Mesh(new THREE.SphereGeometry(0.6 + 1.2 * k, 10, 8), new THREE.MeshBasicMaterial({ color: t.colore ?? 0xe8e2d6 })); m.position.set(x, y + 3 + 2 * k, z); scena.add(m) }
    }
  }
  // l'orologio della città: un giorno intero ogni quattro minuti; ognuno va dove la sua giornata lo porta a quell'ora
  const OR = { el: document.createElement('div'), giorno: 240 }
  OR.el.style.cssText = 'position:fixed;top:18px;right:18px;font:12px/1.4 JetBrains Mono,monospace;color:#e8e2d6;opacity:.75;z-index:5;letter-spacing:.08em'; document.body.appendChild(OR.el)
  const oraFissa = +new URLSearchParams(location.search).get('ora') || null
  const oraCitta = () => oraFissa ?? ((performance.now() / 1000) % OR.giorno) / OR.giorno * 24
  try {
    await Promise.all(['Casual', 'Casual_2', 'Casual_Hoodie', 'Formal', 'Worker'].map(f => Models.loadChar(f)))
    for (const a of D.abitanti) {
      const Dp = Personaggi.descrittore({ fem: !!a.fem }, null, { id: a.id }, a.vesti?.length ? a.vesti : undefined)
      const g = Personaggi.figura(Dp, null); if (!g) continue
      g.scale.setScalar(9); g.traverse(o => { if (o.isMesh) { o.castShadow = true; if (o.material && 'emissive' in o.material) { o.material = o.material.clone(); o.material.emissive = o.material.color.clone().multiplyScalar(0.45) } } }); scena.add(g)
      const ore = VI?.ab?.[a.id]?.oggi ?? [], rr = caso, scarto = new THREE.Vector3((rr() - 0.5) * 9, 0, (rr() - 0.5) * 9)
      const posOra = h => { const o = ore[Math.floor(h) % 24]; const v = o ? (LUOGHI[o.luogo]?.clone() ?? W(o)) : PZ.clone(); v.add(scarto); v.y = altezza(v.x, v.z); return v }
      g.position.copy(posOra(oraCitta()))
      const presa = new THREE.Mesh(new THREE.CylinderGeometry(1.4, 1.4, 2.6, 8), new THREE.MeshBasicMaterial({ visible: false })); presa.position.y = 0.9; g.add(presa); presa.userData = { tipo: 'abitante', a }; cliccabili.push(presa)
      gente.push({ g, a, ore, posOra, vel: 16 + rr() * 6 })
    }
  } catch (e) { console.warn('figure di Porto Vecchio non caricate:', e) }

  // ── indice e schede ──────────────────────────────────────────────────────────────────────────────────────
  const ind = document.getElementById('indice'), sc = document.getElementById('scheda')
  const recs = sale.slice().sort((a, b) => (b.q?.n ?? 0) - (a.q?.n ?? 0))
  ind.innerHTML = `<h3>la città</h3><button data-k="piazza">${esc(D.nome ?? 'La città senza nome')}<small>la piazza · ${D.abitanti.length} abitanti</small></button><button data-k="cantiere">Come è cresciuta<small>${costr.length} cose fatte dagli abitanti · ${(K.coltivato ?? []).length} campi coltivati</small></button>
  <h3>le sale</h3>${recs.map(r => `<button data-c="${esc(r.c.id)}">${esc(r.c.nome)}<small>${r.q?.n ?? 0} tavole · ${esc(r.sala?.disposizione ?? '')}${r.c.stato === 'rovina' ? ' · abbandonata' : ''}</small></button>`).join('')}
  ${D.osservatorio ? `<h3>l'osservatorio</h3><button data-k="oss">La biblioteca degli universi<small>${D.osservatorio.campioni} mondi misurati</small></button>` : ''}`
  ind.onclick = e => { const b = e.target.closest('button'); if (!b) return; if (b.dataset.c) vaiA(sale.find(s => s.c.id === b.dataset.c)); else if (b.dataset.k === 'piazza') { vola(PZ.clone(), 240, 0.615); scheda(schedaPiazza()) } else if (b.dataset.k === 'cantiere') { vola(new THREE.Vector3(0, 0, 0), Math.max(LX, LZ) * 1.1, 0.615); scheda(schedaCantiere()) } else if (b.dataset.k === 'oss') scheda(schedaOss()) }
  function scheda(html) { sc.innerHTML = `<button class="chiudi" aria-label="chiudi">×</button>${html}`; sc.style.display = 'block'; sc.querySelector('.chiudi').onclick = () => { sc.style.display = 'none' } }
  function schedaParola(P) {
    const aree = [...P.dist].map((v, k) => [QS[k], v / P.tot]).filter(x => x[1] > 0.04).sort((a, b) => b[1] - a[1])
    const r = radiceP(P.w), tav = D.punti.filter(p => (p.t ?? '').toLowerCase().includes(r)).sort((a, b) => b.i - a.i).slice(0, 8)
    const note = D.annotazioni.filter(n => n.testo.toLowerCase().includes(r)).slice(0, 4)
    return `<div class="meta">parola · ${P.tot} tavole la nominano</div><h2>${esc(P.w)}</h2><p>${aree.length > 1 ? `Sta tra ${aree.slice(0, 3).map(([q, s]) => `«${esc(q.nome)}» (${Math.round(s * 100)}%)`).join(', ')}: per questo è ${P.generale > 0.5 ? 'alta, sopra più aree' : 'sul loro confine'}.` : `È di «${esc(aree[0]?.[0]?.nome ?? '')}».`}</p>${note.length ? `<div class="meta" style="margin-top:14px">cosa ne dicono</div>${note.map(n => `<div class="riga"><b>${esc(nomeDi(n.chi))}</b> ${esc(n.testo)}</div>`).join('')}` : ''}<div class="meta" style="margin-top:14px">le tavole</div>${tav.map(p => `<div class="riga"><a href="giorni/${p.g}.html#${p.id}">${esc(p.t || 'tavola')}</a> <span style="opacity:.5">giorno ${p.g}</span></div>`).join('')}`
  }
  function schedaTavola(p, extra = '') { const note = D.annotazioni.filter(a => a.tavola === p.id); return `<img src="img/${p.id}.jpg" alt=""><div class="meta">giorno ${p.g} · interesse ${Math.round((p.i ?? 0) * 100)}%</div><h2>${esc(p.t)}</h2>${D.tavole?.[p.id]?.testo ? `<p>${esc(D.tavole[p.id].testo)}…</p>` : ''}${extra}${note.length ? `<div class="meta" style="margin-top:16px">le note degli abitanti</div>${note.map(n => `<div class="riga"><b>${esc(nomeDi(n.chi))}</b> ${esc(n.testo)}</div>`).join('')}` : ''}<p><a href="giorni/${p.g}.html#${p.id}">la giornata in cui è nata →</a></p>` }
  function schedaSala(r) { const nomeCur = r.sala?.curatore ? nomeDi(r.sala.curatore) : null; const vie = strade.filter(s => s.c.a === r.c.id || s.c.b === r.c.id).map(s => K.nomiVie?.[s.c.id]).filter(Boolean); return `<div class="meta">sala · ${r.q?.n ?? 0} tavole</div><h2>${esc(r.c.nome)}</h2>${r.q ? `<p>Le tavole che parlano di ${esc((r.q.concetti ?? []).join(', '))}.</p>` : ''}${nomeCur ? `<p>La cura ${esc(nomeCur)}: ${esc(r.sala.perche || r.sala.disposizione)}.</p>` : ''}${vie.length ? `<p style="opacity:.7">Ci passano ${vie.map(esc).join(', ')}.</p>` : ''}<div class="meta" style="margin-top:14px">la sua storia</div>${(r.c.storia ?? []).map(h => `<div class="riga">giorno ${h.giorno} · ${esc(nomeDi(h.chi))} ${esc(h.cosa)}</div>`).join('')}<div class="meta" style="margin-top:14px">in sala</div>${(perQ.get(r.c.q) ?? []).sort((a, b) => b.i - a.i).slice(0, 12).map(p => `<div class="riga"><a href="giorni/${p.g}.html#${p.id}">${esc(p.t || 'tavola')}</a> <span style="opacity:.5">giorno ${p.g}</span></div>`).join('')}` }
  function schedaCantiere() { return `<div class="meta">come è cresciuta</div><h2>Nessuno ha il disegno intero</h2><p>Le colline sono dove le tavole si accumulano. Il giardino avanza ogni giorno verso le zone più fitte, come una muffa. Le strade nascono tra le sale più legate. Tutto quello che vedi l'hanno fatto gli abitanti, un pezzo alla volta.</p>${costr.slice().reverse().slice(0, 40).map(c => `<div class="riga"><b>${esc(c.tipo === 'capsula' ? 'sala' : c.tipo)}</b> ${esc(c.nome ?? K.nomiVie?.[c.id] ?? '')} <span style="opacity:.55">${esc((c.storia ?? []).map(h => `g.${h.giorno} ${nomeDi(h.chi)} ${h.cosa}`).join(' · '))}</span></div>`).join('')}` }
  function schedaPiazza() { const G = D.giornate[0]; let h = `<div class="meta">la piazza · giornata ${G?.cittaGiorno ?? ''}</div><h2>${esc(D.nome ?? 'La città senza nome')}</h2><p>Al centro la tavola più amata, stesa a terra e sollevata in rilievo dalla sua stessa luce. Qui si discute, si vota, si decide.</p>`; { const cariche = new Map(); for (const a of D.abitanti) { const k = a.carica || a.tipo; if (!cariche.has(k)) cariche.set(k, []); cariche.get(k).push(a.nome) } h += `<div class="meta">chi abita la città · ${D.abitanti.length}</div>${[...cariche].map(([k, l]) => `<div class="riga"><b>${esc(k)}</b> ${l.map(esc).join(', ')}</div>`).join('')}` } if (D.decisioni.length) h += `<div class="meta">decisioni</div>${D.decisioni.slice(0, 6).map(d => `<div class="riga">${esc(d.cosa)} <span style="opacity:.5">${esc(d.stato)}${d.esito ? ` · ${esc(d.esito)}` : ''}</span></div>`).join('')}`; if (D.cantieri.length) h += `<div class="meta" style="margin-top:14px">cantieri</div>${D.cantieri.map(c => `<div class="riga">${esc(c.cosa)}<br><span style="opacity:.55">${c.passi.map(p => `${esc(p.testo)} (${esc(p.dove)}, ${esc(p.stato)})`).join(' · ')}</span></div>`).join('')}`; if (D.officina.length) h += `<div class="meta" style="margin-top:14px">l'officina</div>${D.officina.map(o => `<div class="riga">${esc(o.nome)} <span style="opacity:.5">di ${esc(o.autore)}</span><br><span class="mono" style="font-size:11px;opacity:.6">${esc(o.testo)}</span></div>`).join('')}`; return h }
  function schedaOss() { const Os = D.osservatorio; if (!Os) return ''; return `<div class="meta">l'osservatorio · ${Os.campioni} mondi misurati</div><h2>La biblioteca degli universi</h2><p>La chimica, l'astronoma, l'astrofisico e la filosofa della scienza sfogliano il simulatore di universi: misurano mondi, mettono alla prova ipotesi, portano in piazza le scoperte. Ai margini, il nome di ogni mondo che somiglia al nostro.</p><div class="meta" style="margin-top:14px">scoperte</div>${Os.scoperte.map(s => `<div class="riga"><b>mondo ${s.n}</b> <span style="opacity:.55">(${esc(nomeDi(s.chi))})</span><br>${esc(s.testo)}</div>`).join('')}${Os.ipotesi.length ? `<div class="meta" style="margin-top:14px">ipotesi messe alla prova</div>${Os.ipotesi.map(h => `<div class="riga">${h.stato === 'regge' ? 'regge' : 'cade'} · ${esc(h.testo)} <span style="opacity:.5">fiducia ${Math.round(h.fiducia * 100)}%</span></div>`).join('')}` : ''}` }
  function schedaVerbale() { const G = D.giornate[0]; if (!G) return '<p>La città è appena nata.</p>'; let h = `<div class="meta">il verbale · giornata ${G.cittaGiorno}</div><h2>Cosa si sono detti oggi</h2>`, fase = ''; for (const b of G.verbale) { if (b.fase !== fase) { fase = b.fase; h += `<div class="meta" style="margin-top:14px">${esc(fase)}</div>` } h += `<div class="riga"><b>${esc(nomeDi(b.chi))}</b> ${esc(b.testo)}</div>` }; return h }
  function schedaAbitante0(a) { return `<div class="meta">${esc(a.carica)}</div><h2>${esc(a.nome)}</h2><p>${a.n ? `${a.n} tavole nel suo insieme.` : 'Abita la piazza.'}</p>${a.vesti?.length ? `<div class="meta">addosso</div><p>${a.vesti.map(v => esc(v.id.replace(/_/g, ' '))).join(', ')}</p>` : ''}` }
  function schedaAbitante(a) {
    const v = D.vita?.ab?.[a.id]; if (!v) return schedaAbitante0(a)
    const barra = (k, x) => `<div style="display:flex;gap:8px;align-items:center;font-size:12px"><span style="width:86px;opacity:.7">${k}</span><div style="flex:1;height:4px;background:rgba(232,226,214,.12)"><div style="height:4px;width:${Math.round(x * 100)}%;background:${x > 0.8 ? '#e3361b' : '#e8e2d6'}"></div></div></div>`
    const h = Math.floor(oraCitta()), ora = v.oggi?.[h]
    return schedaAbitante0(a) + `<div class="meta" style="margin-top:14px">adesso, ore ${h}</div><p>${esc(ora ? ora.fa : '')}${ora?.con?.length ? `, con ${ora.con.map(nomeDi).map(esc).join(', ')}` : ''}.</p>`
      + (v.pensiero ? `<p style="opacity:.8"><i>${esc(v.pensiero)}</i></p>` : '')
      + `<div class="meta">i bisogni</div>${Object.entries(v.bisogni).map(([k, x]) => barra(k, x)).join('')}`
      + (v.saperi ? `<div class="meta" style="margin-top:12px">cosa sa</div>${Object.entries(v.saperi).map(([k, x]) => barra(k, x)).join('')}` : '')
      + `<div class="meta" style="margin-top:12px">gli piacciono</div><p>${v.interessi.map(esc).join(', ')}</p>`
      + (v.amici.length ? `<div class="meta">amici</div><p>${v.amici.map(nomeDi).map(esc).join(', ')}</p>` : '') + (v.rivali.length ? `<div class="meta">non si prendono</div><p>${v.rivali.map(nomeDi).map(esc).join(', ')}</p>` : '')
      + (v.progetti.length ? `<div class="meta">progetti</div>${v.progetti.map(p => `<div class="riga">${esc(p.label)} <span style="opacity:.5">${esc(p.stato)} · ${p.passo}</span></div>`).join('')}` : '')
      + `<div class="meta" style="margin-top:12px">la sua giornata</div>${(v.oggi ?? []).filter((o, i, l) => !i || o.fa !== l[i - 1].fa).map(o => `<div class="riga"><span style="opacity:.5">${String(o.h).padStart(2, '0')}</span> ${esc(o.fa)}</div>`).join('')}`
      + (v.diario?.length ? `<div class="meta" style="margin-top:12px">il diario</div>${v.diario.map(d => `<div class="riga">${esc(d)}</div>`).join('')}` : '')
  }
  document.getElementById('apri').onclick = () => scheda(schedaVerbale())

  // ── volare e toccare ──────────────────────────────────────────────────────────────────────────────────
  function vola(t, dist, pitch, yaw) { volo = { t0: performance.now(), da: { t: O.t.clone(), dist: O.dist, pitch: O.pitch, yaw: O.yaw }, a: { t, dist, pitch, yaw: yaw ?? O.yaw } }; O.auto = false }
  function vaiA(r) {
    let dy = r.verso - O.yaw; dy = Math.atan2(Math.sin(dy), Math.cos(dy))
    // la radura si apre verso la piazza: ci si mette dalla parte della piazza, un po' a destra perché la scheda copre la destra
    vola(r.centro.clone(), 110 + r.n * 5, 0.615, O.yaw)
    scheda(schedaSala(r)); for (const b of ind.querySelectorAll('button')) b.classList.toggle('qui', b.dataset.c === r.c.id)
  }
  const ray = new THREE.Raycaster(), mouse = new THREE.Vector2()
  cv.addEventListener('click', e => {
    if (tira?.mosso > 6) return
    mouse.set(e.clientX / innerWidth * 2 - 1, -(e.clientY / innerHeight) * 2 + 1); ray.setFromCamera(mouse, cam)
    const o = ray.intersectObjects(cliccabili, false)[0]?.object; if (!o) return
    const u = o.userData
    if (u.tipo === 'parola') { scheda(schedaParola(u.P)); return }
    if (u.tipo === 'traccia') { const t = u.t, L = D.vita.luoghi.find(l => l.id === t.luogo), NOMI = { opera: "un'opera", stampa: 'una stampa', scritta: 'una scritta', festa: 'una festa' }; scheda(`<div class="meta">${NOMI[t.tipo] ?? t.tipo} · dal giorno ${t.dal}</div><h2>${esc(t.nome ?? (NOMI[t.tipo] ?? t.tipo))}</h2><p>${esc(L?.nome ?? '')}. Di ${t.chi.map(nomeDi).map(esc).join(', ')}. Ripresa ${t.volte} volte, l'ultima il giorno ${t.ultimo}.</p>`); return }
    if (u.tipo === 'tavola' && u.nota) { scheda(schedaTavola(u.p, `<p style="opacity:.6">${esc(u.nota)}</p>`)); return }
    if (u.tipo === 'tavola') scheda(schedaTavola(u.p, u.graffito ? `<p style="opacity:.6">Lasciata di notte da ${esc(u.graffito)} in una radura che non era sua.</p>` : u.monumento ? '<p style="opacity:.6">Il monumento della città: la tavola più amata.</p>' : ''))
    else if (u.a) scheda(schedaAbitante(u.a))
  })

  // ── il tempo ──────────────────────────────────────────────────────────────────────────────────────────
  // ── la redazione e il calendario: il discorso che la città sta preparando per fuori (una barra che si riempie:
  // prima il concetto, poi la grafica, poi pronto) e quando tocca a ogni forma uscire ─────────────────────────
  {
    const R = D.redazione ?? {}, P = R.attuale, cal = D.calendario, el = document.createElement('div')
    el.style.cssText = 'position:fixed;bottom:76px;right:18px;width:290px;background:rgba(12,13,16,.86);border:1px solid rgba(232,226,214,.18);padding:14px 16px;font:12px/1.45 Inter,sans-serif;color:#e8e2d6;z-index:5'
    const barra = (k, col = '#e8e2d6') => `<div style="height:5px;background:rgba(232,226,214,.12);margin:5px 0 9px"><div style="height:5px;width:${Math.round(Math.min(1, k) * 100)}%;background:${col}"></div></div>`
    const FASI = { concetto: 'il concetto', grafica: 'la grafica', pronto: 'pronto, aspetta l\'ora', uscito: 'uscito', lasciato: 'lasciato nel cassetto' }
    let h = `<div style="letter-spacing:.14em;text-transform:uppercase;opacity:.6;font-size:10px">la redazione</div>`
    if (P) h += `<div style="font-size:16px;margin-top:4px">«${esc(P.argomento)}»</div><div style="opacity:.7">${esc(FASI[P.stato] ?? P.stato ?? '')} · racconta ${esc(P.narratore?.nome ?? '')}</div>${barra(P.progresso ?? 0, P.stato === 'pronto' ? '#e3361b' : '#e8e2d6')}<div style="opacity:.75">${(P.tappe ?? []).map(t => `${t.voce ? '●' : '○'} ${esc(t.nome)}`).join('<br>')}</div>`
    else h += `<div style="opacity:.6;margin-top:4px">nessun discorso in preparazione</div>`
    if (cal?.ritardo) h += `<div style="letter-spacing:.14em;text-transform:uppercase;opacity:.6;font-size:10px;margin-top:12px">il calendario</div>` + Object.entries(cal.ritardo).map(([f, k]) => `<div style="display:flex;justify-content:space-between;margin-top:5px"><span>${f}</span><span style="opacity:.6">${k >= 1 ? 'tocca a lui' : Math.round(k * 100) + '%'}</span></div>${barra(k, k >= 1 ? '#e3361b' : '#9aa0aa')}`).join('')
    if (R.storico?.length) h += `<div style="letter-spacing:.14em;text-transform:uppercase;opacity:.6;font-size:10px;margin-top:8px">usciti e lasciati</div>${R.storico.slice(0, 4).map(x => `<div style="opacity:.7">${x.stato === 'lasciato' ? '○' : '●'} ${esc(x.argomento)}</div>`).join('')}`
    el.innerHTML = h; el.style.cursor = 'pointer'; document.body.appendChild(el)
    el.onclick = () => { if (!P) return; scheda(`<div class="meta">la redazione · dal giorno ${P.dal ?? P.giorno}</div><h2>«${esc(P.argomento)}»</h2><p>${esc(P.perche ?? '')}. Racconta ${esc(P.narratore?.nome ?? '')}.</p>${(P.tappe ?? []).map(t => `<div class="riga"><b>${esc(t.nome)}</b> ${t.voce ? `${esc(t.voce.nome)}: ${esc(t.voce.testo)}` : '<span style="opacity:.5">manca ancora una voce</span>'}</div>`).join('')}<div class="meta" style="margin-top:14px">come sta andando</div>${(P.diario ?? []).slice().reverse().map(d => `<div class="riga"><span style="opacity:.5">giorno ${d.giorno}</span> ${esc(d.testo)}</div>`).join('')}`) }
  }

  const v3 = new THREE.Vector3(); let prima = performance.now()
  O.t.set(0, 0, 0); O.dist = Math.max(LX, LZ) * 0.95
  function giro2() {
    const ora = performance.now(), dt = Math.min(0.05, (ora - prima) / 1000); prima = ora
    if (volo) { const k = Math.min(1, (ora - volo.t0) / 1500), e = k * k * (3 - 2 * k); O.t.lerpVectors(volo.da.t, volo.a.t, e); O.dist = volo.da.dist + (volo.a.dist - volo.da.dist) * e; O.pitch = volo.da.pitch + (volo.a.pitch - volo.da.pitch) * e; O.yaw = volo.da.yaw + (volo.a.yaw - volo.da.yaw) * e; if (k >= 1) volo = null }
    metti()
    { const h = oraCitta(); luce(h); OR.el.textContent = `ore ${String(Math.floor(h)).padStart(2, '0')}:${String(Math.floor((h % 1) * 60)).padStart(2, '0')} · giornata ${D.giorno ?? ''}`
      for (const p of gente) {
        const meta = p.posOra(h), d = meta.clone().sub(p.g.position).setY(0), dist = d.length(), o = p.ore[Math.floor(h) % 24]
        let speed = 0, anim = null
        if (dist > 1.2) { const passo = Math.min(dist, Math.max(p.vel, dist * 0.6) * dt); p.g.position.addScaledVector(d.normalize(), passo); p.g.position.y = altezza(p.g.position.x, p.g.position.z); p.g.rotation.y = Math.atan2(d.x, d.z); speed = 1.2 }
        else if (o && !/dorme/.test(o.fa)) anim = { act: 'Interact' }
        p.g.visible = !(o && /dorme/.test(o.fa) && dist < 1.2) // chi dorme è in casa
        try { Models.animPerson(p.g, { speed, anim }, dt) } catch (_) { /* resta ferma */ }
      } }
    { const vic = Math.max(0, Math.min(1, 1 - (O.dist - 150) / 350)); for (const m of cartMat) m.opacity = 0.9 * vic } // i cartellini si leggono solo da vicino
    const tt = ora / 1000; for (const m of fondiVivi) m.uniforms.u_time.value = tt; for (const m of ologrammi) m.uniforms.t.value = tt
    { const ry = Math.round((O.yaw - Math.PI / 4) / (Math.PI / 2)) * (Math.PI / 2); for (const m of scritte) m.rotation.y = ry }
    R.render(scena, cam)
    const occ = [], ord = etichette.map(e => [e, O.dist * 1.6 + e.p.distanceTo(O.t) * 0.3]).sort((a, b) => a[1] - b[1])
    for (const [e, d] of ord) {
      v3.copy(e.p); v3.project(cam)
      let vis = Math.abs(v3.z) < 1 && d < e.lontano && Math.abs(v3.x) < 1.1 && Math.abs(v3.y) < 1.1
      if (vis) { const x = (v3.x * 0.5 + 0.5) * innerWidth, y = (-v3.y * 0.5 + 0.5) * innerHeight, w = e.el.offsetWidth || 160, h = e.el.offsetHeight || 34, r = [x - w / 2, y - h, x + w / 2, y]; if (r[0] < 270 || occ.some(o => r[0] < o[2] && r[2] > o[0] && r[1] < o[3] && r[3] > o[1])) vis = false; else { occ.push(r); e.el.style.transform = `translate(${x}px,${y}px) translate(-50%,-100%)` } }
      e.el.style.opacity = vis ? String(Math.min(1, (e.lontano - d) / (e.lontano * 0.3))) : '0'
      e.el.style.pointerEvents = vis && e.el.classList.contains('sala') ? 'auto' : 'none'
    }
    requestAnimationFrame(giro2)
  }
  giro2()
  window.__citta = true
})().catch(e => { console.error(e); window.__cittaErrore = String(e) })
