// La città interna come paesaggio: un diorama della conoscenza. Le colline sono dove le tavole si accumulano, il terreno
// coltivato (il giardino) avanza giorno dopo giorno come una muffa verso dove le tavole sono più fitte, le strade nascono
// tra le sale più legate come le reti di una muffa che collega il cibo. Le sale sono radure di tavole in piedi, disposte
// dal curatore che le abita. In piazza la tavola più amata, resa in rilievo. Niente modelli: solo le immagini e il codice che fa il suolo. Gli abitanti sono le figure di Porto Vecchio.
// Nessun edificio: le architetture sono metafore della crescita, non oggetti. Motore: il three di Porto Vecchio (globale).
// un cartello mentre la città si costruisce (sul telefono ci mette un po'), e il motivo se non ce la fa
const CARTELLO = (() => { const d = document.createElement('div'); d.style.cssText = 'position:fixed;inset:0;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:10px;background:#06050a;color:#e8e2d6;font:13px/1.5 JetBrains Mono,monospace;letter-spacing:.08em;z-index:50;text-align:center;padding:24px;transition:opacity .6s'
  d.innerHTML = '<div style="font:500 18px Inter,sans-serif;letter-spacing:0">la città si sta costruendo</div><div class="passo" style="opacity:.6">i luoghi, le strade, le stanze, gli abitanti…</div>'; (document.body ? Promise.resolve() : new Promise(r => addEventListener('DOMContentLoaded', r))).then(() => document.body.appendChild(d))
  return { passo: t => { const q = d.querySelector('.passo'); if (q) q.textContent = t }, via: () => { d.style.opacity = 0; setTimeout(() => d.remove(), 700) }, errore: e => { d.querySelector('.passo').innerHTML = 'non ce l\'ha fatta: ' + String(e).replace(/[<>&]/g, '') + '<br><br>prova a riaprire la pagina (o dal computer)' } } })()
;(async function () {
  'use strict'
  CARTELLO.passo('scarico la memoria della città…')
  const D = await (await fetch('citta.json', { cache: 'no-store' })).json()
  if (D.vita?.popolo?.length) D.abitanti = [...D.abitanti, ...D.vita.popolo] // il popolo: tutti gli abitanti, non solo chi discute in piazza
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
    sposta(D.piazza); for (const w of Object.values(D.costruito?.parole ?? {})) sposta(w)
    for (const c of D.costruito?.costruzioni ?? []) if (c.pos?.x != null) { const d = del.get(c.q); if (d) { c.pos.x += d[0]; c.pos.y += d[1] } else sposta(c.pos) }
    if (D.vita) { for (const l of D.vita.luoghi) { const d = l.q != null && l.tipo === 'sala' ? del.get(l.q) : null; if (d) { l.x += d[0]; l.y += d[1] } else sposta(l) } for (const t of D.vita.tracce) sposta(t)
      for (const v of Object.values(D.vita.ab)) for (const o of v.oggi ?? []) sposta(o) }
    D.__coltivatoSpostato = true
  }
  // il diorama comprende solo quello che gli abitanti hanno costruito o coltivato (più un margine): cresce con loro
  const G48 = 48, pts0 = [[D.piazza.x, D.piazza.y], ...D.punti.map(p => [p.x, p.y]), ...costr.filter(c => c.pos?.x != null).map(c => [c.pos.x, c.pos.y]), ...(K.coltivato ?? []).map(k => [((k % G48) + 0.5) / G48 * 1000, (Math.floor(k / G48) + 0.5) / G48 * 1000])]
  const bx0 = Math.min(...pts0.map(p => p[0])) - 70, bx1 = Math.max(...pts0.map(p => p[0])) + 70, by0 = Math.min(...pts0.map(p => p[1])) - 70, by1 = Math.max(...pts0.map(p => p[1])) + 70
  const cxT = (bx0 + bx1) / 2, cyT = (by0 + by1) / 2
  const S = 2.0, LX = (bx1 - bx0) * S, LZ = (by1 - by0) * S, LATO = Math.max(LX, LZ), X = x => (x - cxT) * S, Z = y => (y - cyT) * S

  // ── motore ────────────────────────────────────────────────────────────────────────────────────────────
  const cv = document.getElementById('mondo')
  const R = new THREE.WebGLRenderer({ canvas: cv, antialias: true })
  const SENZA = new URLSearchParams(location.search).get('senza') ?? '' // per le prove di peso
  const LIBERABILI = new Set() // tele già caricate sulla scheda grafica, che dopo la prima volta non servono più in memoria
  const LEGGERA = matchMedia('(pointer: coarse)').matches || innerWidth < 900 // sul telefono (e nel browser di Instagram) la città si alleggerisce
  // sul telefono i pannelli non coprono la città: l'elenco delle sale si apre col bottone, la redazione e l'aiuto si nascondono
  if (innerWidth < 760) { const st = document.createElement('style'); st.textContent = `#indice{display:none!important}body.indice #indice{display:block!important;position:fixed;inset:0;overflow:auto;z-index:20;background:rgba(6,5,10,.94);padding:70px 22px 30px}
    #redazione,#aiuto{display:none!important}header p,header .sotto{display:none}header h1{font-size:20px!important}#apri{right:12px!important;bottom:12px!important;font-size:10px!important;padding:8px 10px!important}
    #sale-bt{position:fixed;left:12px;bottom:12px;z-index:21;font:500 10px 'JetBrains Mono',monospace;letter-spacing:.16em;text-transform:uppercase;background:rgba(12,13,17,.75);color:#e8e6e1;border:1px solid rgba(232,226,214,.3);padding:8px 10px}`; document.head.appendChild(st)
    const bt = document.createElement('button'); bt.id = 'sale-bt'; bt.textContent = 'le sale'; bt.onclick = () => { document.body.classList.toggle('indice'); bt.textContent = document.body.classList.contains('indice') ? 'la città' : 'le sale' }; document.body.appendChild(bt)
    document.addEventListener('click', e => { if (e.target.closest?.('#indice button')) { document.body.classList.remove('indice'); bt.textContent = 'le sale' } }) }
  R.setPixelRatio(Math.min(LEGGERA ? 1.25 : 2, devicePixelRatio)); R.setSize(innerWidth, innerHeight); R.outputEncoding = THREE.sRGBEncoding
  R.toneMapping = THREE.ACESFilmicToneMapping; R.toneMappingExposure = 1.0; R.shadowMap.enabled = !LEGGERA; R.shadowMap.type = THREE.PCFSoftShadowMap
  const scena = new THREE.Scene(); scena.fog = null
  // la luce a fasce di Porto Vecchio (render.js [fumetto], ricetta minima): due gradini netti nella luce diretta, un po' di blu nell'ombra
  { const DNL = 'float dotNL = saturate( dot( geometry.normal, directLight.direction ) );', C = THREE.ShaderChunk
    if (C.lights_physical_pars_fragment.includes(DNL) && !C.lights_physical_pars_fragment.includes("float cw = .02")) C.lights_physical_pars_fragment = C.lights_physical_pars_fragment.replace(DNL, DNL + `{ float cw = .02; dotNL = .45*smoothstep(.03-cw,.03+cw,dotNL) + .55*smoothstep(.34-cw,.34+cw,dotNL); }`)
    if (!C.lights_fragment_end.includes('vec3(.10,.07,.20)')) C.lights_fragment_end += `\nreflectedLight.indirectDiffuse += diffuseColor.rgb*vec3(.10,.07,.20);` } // l'ombra violetta, mai nera
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
  sole.shadow.mapSize.set(2048, 2048); Object.assign(sole.shadow.camera, { left: -700, right: 700, top: 700, bottom: -700, near: 10, far: 3000 }); sole.shadow.bias = -0.0006; scena.add(sole); scena.add(sole.target)

  // ── orbita: trascina per girare, destro (o maiuscolo) per spostarti, rotella per avvicinarti ───────────────
  const O = { t: new THREE.Vector3(0, 20, 0), yaw: Math.PI / 4, pitch: 0.615, dist: 560, v: { yaw: 0, pitch: 0 }, auto: false }
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
  // i comandi a vista: ruotare di un quarto di giro, avvicinarsi, allontanarsi, tornare all'insieme (anche coi tasti Q E + -)
  { const pan = document.createElement('div'); pan.style.cssText = 'position:fixed;left:50%;transform:translateX(-50%);bottom:44px;display:flex;gap:6px;z-index:6'
    const bt = (t, tit, fn) => { const b = document.createElement('button'); b.textContent = t; b.title = tit; b.style.cssText = 'width:38px;height:38px;border:1px solid rgba(232,226,214,.35);background:rgba(12,13,16,.8);color:#e8e2d6;font:16px Inter,sans-serif;cursor:pointer'; b.onclick = e => { e.stopPropagation(); O.auto = false; volo = null; fn() }; pan.appendChild(b) }
    const gira = k => { O.yaw += k * Math.PI / 4 }, zoom = k => { O.dist = Math.min(2600, Math.max(40, O.dist * k)) }
    bt('⟲', 'ruota a sinistra (Q)', () => gira(1)); bt('⟳', 'ruota a destra (E)', () => gira(-1)); bt('+', 'avvicina (+)', () => zoom(0.7)); bt('−', 'allontana (−)', () => zoom(1.4)); bt('◇', "torna all'insieme", () => { O.dist = 900; O.t.set(0, 20, 0); O.yaw = Math.PI / 4 })
    document.body.appendChild(pan)
    addEventListener('keydown', e => { if (e.target.tagName === 'INPUT') return; if (e.key === 'q' || e.key === 'Q') gira(1); else if (e.key === 'e' || e.key === 'E') gira(-1); else if (e.key === '+' || e.key === '=') zoom(0.8); else if (e.key === '-') zoom(1.25) })
    let prima = null
    cv.addEventListener('touchmove', e => { if (e.touches.length !== 2) { prima = null; return } e.preventDefault(); const [a, b] = e.touches, d = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY), an = Math.atan2(b.clientY - a.clientY, b.clientX - a.clientX)
      if (prima) { zoom(prima.d / d); O.yaw += (an - prima.an) } prima = { d, an } }, { passive: false })
    cv.addEventListener('touchend', () => { prima = null }) }
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
  function altezza(x, z) { return 0 } // la città sta in piano: un pavimento nero, le strade, i lotti (le colline restano nei conti del cantiere)
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
    const terra = new THREE.Mesh(geo, mat); terra.receiveShadow = true; terra.visible = false; scena.add(terra) // il prato è messo da parte: restano i luoghi, sospesi
    scena.background = new THREE.Color(0x030405) // attorno, il buio: la città è un'isola di luce
  }
  // i fondi delle aree: lo shader che il curatore ha composto (o raccolto), steso dentro il lotto dell'area
  const fondiVivi = []
  {
    const prova = (() => { const gl = (window.__glProva ??= document.createElement('canvas').getContext('webgl')); return src => { if (!gl) return true; const s = gl.createShader(gl.FRAGMENT_SHADER); gl.shaderSource(s, src); gl.compileShader(s); const ok = gl.getShaderParameter(s, gl.COMPILE_STATUS); gl.deleteShader(s); return ok } })()
    QS.forEach((q, k) => {
      const F = q.sala?.suolo; if (!F?.codice) return
      let corpo = F.codice.replace(/#version[^\n]*\n/g, '').replace(/\bgl_FragCoord\b/g, 'vec4(vU*u_resolution,0.,1.)').replace(/void\s+main\s*\(\s*\)/, 'void fondo_main()')
      if (/mainImage\s*\(/.test(corpo)) corpo = corpo.replace(/void\s+fondo_main\s*\(\s*\)/, 'void fondo_main_x()') + '\nvoid fondo_main(){ vec4 c=vec4(0.); mainImage(c, vU*u_resolution); gl_FragColor=vec4(c.rgb,1.); }'
      const testa = `precision highp float;\nuniform float u_time; uniform vec2 u_resolution; uniform float u_seed; uniform sampler2D maschera; varying vec2 vU; varying vec2 vM;\n${/mainImage/.test(corpo) ? '#define iTime u_time\n#define iResolution vec3(u_resolution,1.)\n' : ''}`
      const frag = testa + corpo + '\nvoid main(){ fondo_main(); gl_FragColor.a = texture2D(maschera, vM).r * .62; }'
      if (!prova(frag)) return
      // la toppa copre solo dove la maschera dell'area c'è
      let i0 = GN, i1 = 0, j0 = GN, j1 = 0; const M = maschere[k]; for (let j = 0; j < GN; j++) for (let i = 0; i < GN; i++) if (M[j * GN + i] > 8) { i0 = Math.min(i0, i); i1 = Math.max(i1, i); j0 = Math.min(j0, j); j1 = Math.max(j1, j) }
      if (i1 < i0) return
      const x0 = GX0 + i0 / GN * GLX, z0 = GZ0 + j0 / GN * GLZ, lx = (i1 - i0 + 1) / GN * GLX, lz = (j1 - j0 + 1) / GN * GLZ
      const tm = new THREE.DataTexture(M, GN, GN, THREE.RedFormat, THREE.UnsignedByteType); tm.magFilter = tm.minFilter = THREE.LinearFilter; tm.needsUpdate = true
      const mat = new THREE.ShaderMaterial({ uniforms: { u_time: { value: 0 }, u_resolution: { value: new THREE.Vector2(lx * 2, lz * 2) }, u_seed: { value: k * 7.13 }, maschera: { value: tm } }, transparent: true, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -1 - k * 0.01, polygonOffsetUnits: -2,
        vertexShader: `varying vec2 vU; varying vec2 vM; void main(){ vec4 w = modelMatrix*vec4(position,1.); vU = vec2((w.x-(${x0.toFixed(2)}))/${lx.toFixed(2)}, 1.-(w.z-(${z0.toFixed(2)}))/${lz.toFixed(2)}); vM = vec2((w.x-(${GX0.toFixed(2)}))/${GLX.toFixed(2)}, (w.z-(${GZ0.toFixed(2)}))/${GLZ.toFixed(2)}); gl_Position = projectionMatrix*viewMatrix*w; }`,
        fragmentShader: frag.replace(/^precision highp float;\n/, '') })
      const m = new THREE.Mesh(toppa(x0, z0, lx, lz, 0.25, Math.min(160, Math.max(24, Math.round(Math.max(lx, lz) / 6)))), mat); m.renderOrder = 1; m.visible = false; scena.add(m)
      fondiVivi.push(mat)
    })
  }
  var reteMat = null, cartMat = []

  const PZ = new THREE.Vector3(X(D.piazza.x), 0, Z(D.piazza.y)); PZ.y = altezza(PZ.x, PZ.z)
  CARTELLO.passo('traccio le strade dalle parole…'); await new Promise(r => setTimeout(r, 30))
  // ── le stanze di ogni luogo, composte da Porto Vecchio (interiors.js): servono già all'urbanista, per sapere quanto è grande
  // ogni lotto (fronte sulla strada e profondità), e poi all'arredatore. Una volta sola per luogo. ───────────────────────────
  const USI_P = { mensa: ['trattoria', ['sala_trattoria', 'cucina_trattoria']], biblioteca: ['biblioteca', ['lettura', 'scaffali', 'archivio']], bottega: ['tipografia', ['tipografia', 'ufficio']], officina: ['officina', ['officina']],
    osservatorio: ['cinema', ['sala_cinema']], archivio: ['biblioteca', ['scaffali', 'archivio']], assemblea: ['cultura', ['salone_cultura']], guardaroba: ['sartoria', ['sartoria', 'prova']], piazza: ['bar', ['sala_bar']], casa: ['casa', [], [/^camera/, /stanza_fam/, /cameretta/, /stanza_ospiti|salotto|soggiorno/, /cucina/]], confine: ['bottega', ['bottega', 'retro']] }
  const hashN0 = s => [...s].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7), STANZE_C = new Map()
  const stanzaDi = l => { if (STANZE_C.has(l.id)) return STANZE_C.get(l.id); let out = null; const u = USI_P[l.tipo === 'piazza' && l.id === 'piazza' ? 'piazza' : l.tipo], PVI = window.Interior
    if (u && PVI) try { const h = hashN0(l.id), bx = (h % 97) * 6, by = ((h >> 7) % 89) * 6, bid = 'citta:' + l.id, Lb = PVI.layout({ id: bid, i: bid, use: u[0], x: bx, y: by, w: 4, h: 4, fl: 1, door: [bx + 2, by + 4] }), f = Lb?.floors?.[0]
      if (f) { let idx = f.rooms.map((r, i) => u[1].includes(r.name) ? i : -1).filter(i => i >= 0); if (!idx.length && u[2]) for (const re of u[2]) { const i = f.rooms.findIndex(r => re.test(r.name)); if (i >= 0) { idx = [i]; break } }
        const rs = idx.map(i => f.rooms[i]); if (rs.length) { const x0 = Math.min(...rs.map(r => r.x)), x1 = Math.max(...rs.map(r => r.x + r.w)), y0 = Math.min(...rs.map(r => r.y)), y1 = Math.max(...rs.map(r => r.y + r.h))
          out = { f, idx, rs, x0, x1, y0, y1, cx: (x0 + x1) / 2, cy: (y0 + y1) / 2, W: (x1 - x0) * 4.5, H: (y1 - y0) * 4.5, fondo: /casa/.test(u[0]) ? 'assi' : 'cemento' } } } } catch (e) { console.warn('[interni]', l.id, e) }
    STANZE_C.set(l.id, out); return out }
  // ── l'urbanistica: la città è fatta di isolati su una griglia. Ogni luogo ha il suo lotto (la piazza e le sale un isolato
  // doppio, le case mezzo lotto, due per isolato); le strade corrono tra i lotti e nascono dove gli abitanti passano davvero:
  // ogni loro andare (le vie della vita) cerca il percorso più breve, preferendo le strade che ci sono già. Così le vie battute
  // diventano corsi larghi, le altre restano vie e sentieri. Lo costruiscono loro, giorno dopo giorno. ───────────────────────────
  const CELLA = 100, URB = { lotti: new Map(), lati: new Map(), strade: [], percorsi: new Map(), forma: 'griglia' }
  const FORMA_C = new URLSearchParams(location.search).get('forma') ?? 'una' // una città sola (griglia e muffa restano per le prove)
  function cittaGriglia() {
    const VIu = D.vita, occ = new Map(), k2 = (i, j) => i + ',' + j, mezze = []
    const libero = (i, j, w, h) => { for (let a = 0; a < w; a++) for (let b = 0; b < h; b++) if (occ.has(k2(i + a, j + b))) return false; return true }
    const prendi = (id, x, z, w, h, tipo) => {
      const i0 = Math.round(x / CELLA - (w - 1) / 2), j0 = Math.round(z / CELLA - (h - 1) / 2)
      for (let r = 0; r < 60; r++) {
        const cand = []; for (let a = -r; a <= r; a++) for (let b = -r; b <= r; b++) if (Math.max(Math.abs(a), Math.abs(b)) === r) cand.push([i0 + a, j0 + b])
        const cx = (i, j) => Math.hypot((i + (w - 1) / 2) * CELLA - x, (j + (h - 1) / 2) * CELLA - z); cand.sort((p, q) => cx(...p) - cx(...q))
        for (const [i, j] of cand) if (libero(i, j, w, h)) { for (let a = 0; a < w; a++) for (let b = 0; b < h; b++) occ.set(k2(i + a, j + b), id)
          const L = { id, tipo, i, j, w, h, x: (i + (w - 1) / 2) * CELLA, z: (j + (h - 1) / 2) * CELLA, lx: w * CELLA, lz: h * CELLA }; URB.lotti.set(id, L); return L }
      } }
    // la casa: mezzo isolato; si cerca prima un isolato di case con la metà libera lì vicino
    const prendiCasa = (id, x, z) => {
      const m = mezze.filter(q => !q.piena).sort((p, q) => Math.hypot(p.x - x, p.z - z) - Math.hypot(q.x - x, q.z - z))[0]
      if (m && Math.hypot(m.x - x, m.z - z) < CELLA * 1.6) { m.piena = true; const L = { id, tipo: 'casa', i: m.L.i, j: m.L.j, w: 1, h: 1, x: m.L.x + CELLA / 4, z: m.L.z, lx: CELLA / 2, lz: CELLA, mezza: 1 }; URB.lotti.set(id, L); return L }
      const L0 = prendi(id, x, z, 1, 1, 'casa'); const L = Object.assign(L0, { x: L0.x - CELLA / 4, lx: CELLA / 2, mezza: -1 }); mezze.push({ L: L0, x: L0.x + CELLA / 2, z: L0.z, piena: false }); return L }
    const WP = l => [X(l.x), Z(l.y)]
    const luoghi = VIu?.luoghi ?? [], per = t => luoghi.filter(l => l.tipo === t)
    prendi('piazza', PZ.x, PZ.z, 2, 2, 'piazza')
    const caps = costr.filter(c => c.tipo === 'capsula' && c.pos?.x != null).sort((a, b) => (quartN(b) - quartN(a)))
    function quartN(c) { return D.quartieri.find(q => q.id === c.q)?.n ?? 0 }
    for (const c of caps) { const L = prendi('capsula:' + c.id, X(c.pos.x), Z(c.pos.y), 2, 2, 'sala'); URB.lotti.set('sala:' + c.q, L) }
    for (const l of luoghi) if (['mensa', 'biblioteca', 'bottega', 'officina', 'osservatorio', 'archivio', 'assemblea', 'guardaroba', 'fontana', 'giardino'].includes(l.tipo)) prendi(l.id, ...WP(l), 1, 1, l.tipo)
    for (const l of per('sala')) if (!URB.lotti.has(l.id)) prendi(l.id, ...WP(l), 2, 2, 'sala')
    for (const l of per('confine')) prendi(l.id, ...WP(l), 1, 1, 'confine')
    for (const l of per('piazza')) if (l.id !== 'piazza') prendi(l.id, ...WP(l), 1, 1, 'piazzetta')
    for (const l of per('casa')) prendiCasa(l.id, ...WP(l))
    // le parole sono gli incroci: ogni concetto del database vettoriale prende l'angolo d'isolato più vicino al suo punto
    // (i più pesanti scelgono per primi). Le loro relazioni diventano i corsi: la città prende forma da lì.
    const KPu = D.costruito?.parole ?? {}, PW = Object.entries(KPu).map(([w, q]) => ({ w, x: X(q.x), z: Z(q.y), q, peso: (q.vett ?? []).reduce((a, b) => a + b, 0) })).sort((a, b) => b.peso - a.peso)
    URB.parole = new Map(); URB.relazioni = []
    { const presi = new Set(); for (const L of new Set(URB.lotti.values())) if (L.w === 2 && L.tipo !== 'piazza') presi.add(k2(L.i + 1, L.j + 1))
      for (const P of PW) { const a0 = Math.round(P.x / CELLA + 0.5), b0 = Math.round(P.z / CELLA + 0.5); let ok = null
        for (let r = 0; r < 12 && !ok; r++) for (let a = -r; a <= r && !ok; a++) for (let b = -r; b <= r && !ok; b++) if (Math.max(Math.abs(a), Math.abs(b)) === r && !presi.has(k2(a0 + a, b0 + b))) ok = [a0 + a, b0 + b]
        if (!ok) continue; presi.add(k2(...ok)); P.a = ok[0]; P.b = ok[1]; URB.parole.set(P.w, P) } }
    // la rete: i nodi sono gli angoli degli isolati, i lati i tratti di strada tra due angoli
    let i0 = 1e9, i1 = -1e9, j0 = 1e9, j1 = -1e9; for (const L of URB.lotti.values()) { i0 = Math.min(i0, L.i); j0 = Math.min(j0, L.j); i1 = Math.max(i1, L.i + L.w); j1 = Math.max(j1, L.j + L.h) }
    for (const P of URB.parole.values()) { i0 = Math.min(i0, P.a); j0 = Math.min(j0, P.b); i1 = Math.max(i1, P.a); j1 = Math.max(j1, P.b) }
    i0 -= 1; j0 -= 1; i1 += 1; j1 += 1
    const NX = i1 - i0 + 1, NZ = j1 - j0 + 1, nodo = (a, b) => (b - j0) * NX + (a - i0), nodoXZ = n => [((n % NX) + i0 - 0.5) * CELLA, (Math.floor(n / NX) + j0 - 0.5) * CELLA]
    URB.nodoXZ = nodoXZ
    const latoK = (n, m) => n < m ? n + '-' + m : m + '-' + n
    // dentro una sala (isolato doppio) non si passa; dentro la piazza sì, è tutta lastricata
    const chiusi = new Set(), piazzaL = URB.lotti.get('piazza')
    for (const L of new Set(URB.lotti.values())) if (L.w === 2 && L.tipo !== 'piazza') { const c = nodo(L.i + 1, L.j + 1); for (const n of [nodo(L.i + 1, L.j), nodo(L.i, L.j + 1), nodo(L.i + 2, L.j + 1), nodo(L.i + 1, L.j + 2)]) chiusi.add(latoK(c, n)) }
    const vicini = n => { const a = n % NX, b = Math.floor(n / NX), v = []; if (a > 0) v.push(n - 1); if (a < NX - 1) v.push(n + 1); if (b > 0) v.push(n - NX); if (b < NZ - 1) v.push(n + NX); return v }
    const bordo = L => { const s = []; for (let a = 0; a <= L.w; a++) for (let b = 0; b <= L.h; b++) if (a === 0 || b === 0 || a === L.w || b === L.h) s.push(nodo(L.i + a, L.j + b)); return s }
    const uso = new Map() // lato → quanto ci si passa
    const dijkstra = (da, a, costo) => { // dai nodi «da» al primo nodo di «a»
      const dist = new Map(), prev = new Map(), mete = new Set(a), H = []; const push = (n, d) => { H.push([d, n]); let i = H.length - 1; while (i > 0) { const p = (i - 1) >> 1; if (H[p][0] <= H[i][0]) break; [H[p], H[i]] = [H[i], H[p]]; i = p } }
      const pop = () => { const t = H[0], e = H.pop(); if (H.length) { H[0] = e; let i = 0; for (;;) { const l = 2 * i + 1, r = l + 1; let m = i; if (l < H.length && H[l][0] < H[m][0]) m = l; if (r < H.length && H[r][0] < H[m][0]) m = r; if (m === i) break; [H[m], H[i]] = [H[i], H[m]]; i = m } } return t }
      for (const n of da) { dist.set(n, 0); push(n, 0) }
      while (H.length) { const [d, n] = pop(); if (d > dist.get(n)) continue; if (mete.has(n)) { const via = [n]; let k = n; while (prev.has(k)) { k = prev.get(k); via.push(k) } return via.reverse() }
        for (const m of vicini(n)) { const c = costo(n, m); if (!isFinite(c)) continue; const nd = d + c; if (nd < (dist.get(m) ?? Infinity)) { dist.set(m, nd); prev.set(m, n); push(m, nd) } } }
      return null }
    const costoNuovo = (n, m) => { const k = latoK(n, m); if (chiusi.has(k)) return Infinity; return (uso.has(k) ? 0.55 : 1) }
    // prima le relazioni tra le parole: ognuna traccia il suo corso (pesa come una via battutissima)
    { const visti = new Set(); for (const P of URB.parole.values()) for (const v of P.q.vicini ?? []) { const Q = URB.parole.get(v); if (!Q) continue; const k = [P.w, Q.w].sort().join('|'); if (visti.has(k)) continue; visti.add(k)
        const via = dijkstra([nodo(P.a, P.b)], [nodo(Q.a, Q.b)], costoNuovo); if (!via) continue; for (let k = 1; k < via.length; k++) { const q = latoK(via[k - 1], via[k]); uso.set(q, (uso.get(q) ?? 0) + 40) } URB.relazioni.push({ A: P.w, B: Q.w, via, peso: P.peso + Q.peso }) } }
    for (const P of URB.parole.values()) P.n = nodo(P.a, P.b)
    URB.latoK = latoK
    const vie = (VIu?.vie ?? []).filter(v => v[2] >= 2 && URB.lotti.has(v[0]) && URB.lotti.has(v[1]) && URB.lotti.get(v[0]) !== URB.lotti.get(v[1])).sort((a, b) => b[2] - a[2]).slice(0, 520)
    for (const [a, b, n] of vie) { const via = dijkstra(bordo(URB.lotti.get(a)), bordo(URB.lotti.get(b)), costoNuovo); if (!via) continue; for (let k = 1; k < via.length; k++) { const q = latoK(via[k - 1], via[k]); uso.set(q, (uso.get(q) ?? 0) + n) } }
    // chi è rimasto fuori dalla rete ci si allaccia con un tratto nuovo (poco battuto)
    const inRete = () => { const s = new Set(); for (const k of uso.keys()) for (const n of k.split('-')) s.add(+n); return s }
    let rete = inRete()
    for (const L of new Set(URB.lotti.values())) { const b = bordo(L); if (b.some(n => rete.has(n)) || !rete.size) continue; const via = dijkstra(b, [...rete], costoNuovo); if (!via) continue; for (let k = 1; k < via.length; k++) { const q = latoK(via[k - 1], via[k]); uso.set(q, (uso.get(q) ?? 0) + 1) } via.forEach(n => rete.add(n)) }
    for (const P of URB.parole.values()) { if (rete.has(P.n) || !rete.size) continue; const via = dijkstra([P.n], [...rete], costoNuovo); if (!via) continue; for (let k = 1; k < via.length; k++) { const q = latoK(via[k - 1], via[k]); uso.set(q, (uso.get(q) ?? 0) + 6) } via.forEach(n => rete.add(n)) }
    // il rango: corso, via, sentiero (e i lati dentro la piazza sono lastricato)
    const valori = [...uso.values()].sort((a, b) => b - a), soglia = q => valori[Math.floor(valori.length * q)] ?? 0, sCorso = soglia(0.14), sVia = soglia(0.5)
    for (const [k, u] of uso) { const [n, m] = k.split('-').map(Number), [ax, az] = nodoXZ(n), [bx, bz] = nodoXZ(m)
      const rango = u >= sCorso ? 'corso' : u >= sVia ? 'via' : 'sentiero', largo = { corso: 14, via: 9, sentiero: 4.5 }[rango]
      const S0 = { k, n, m, a: [ax, az], b: [bx, bz], pts: [[ax, az], [bx, bz]], vis: [[ax, az], [bx, bz]], uso: u, rango, largo, oriz: az === bz, lati: [[], []] }; URB.lati.set(k, S0); URB.strade.push(S0) }
    // il percorso a piedi tra due nodi della rete: le strade larghe costano un po' meno
    const costoPiedi = (n, m) => { const S0 = URB.lati.get(latoK(n, m)); return S0 ? (S0.rango === 'corso' ? 0.8 : S0.rango === 'via' ? 0.9 : 1) : Infinity }
    // la porta di un lotto: il punto del suo bordo sulla strada più battuta che lo tocca
    const latiDel = L => { const out = []; for (let a = 0; a < L.w; a++) { out.push([nodo(L.i + a, L.j), nodo(L.i + a + 1, L.j), 'N'], [nodo(L.i + a, L.j + L.h), nodo(L.i + a + 1, L.j + L.h), 'S']) } for (let b = 0; b < L.h; b++) { out.push([nodo(L.i, L.j + b), nodo(L.i, L.j + b + 1), 'W'], [nodo(L.i + L.w, L.j + b), nodo(L.i + L.w, L.j + b + 1), 'E']) } return out }
    for (const L of new Set(URB.lotti.values())) {
      let best = null; for (const [n, m, lato] of latiDel(L)) { if (L.mezza && ((L.mezza < 0 && lato === 'E') || (L.mezza > 0 && lato === 'W'))) continue; const S0 = URB.lati.get(latoK(n, m)); if (S0 && (!best || S0.uso > best.S.uso)) best = { S: S0, lato, n, m } }
      if (!best) { const b = bordo(L).filter(n => rete.has(n)); L.porta = { lato: 'S', nodi: b.length ? b : bordo(L), p: [L.x, L.z + L.lz / 2] }; continue }
      const [ax, az] = nodoXZ(best.n), [bx, bz] = nodoXZ(best.m), oriz = az === bz
      const p = oriz ? [Math.max(Math.min(L.x, Math.max(ax, bx) - 8), Math.min(ax, bx) + 8), az] : [ax, Math.max(Math.min(L.z, Math.max(az, bz) - 8), Math.min(az, bz) + 8)]
      L.porta = { lato: best.lato, nodi: [best.n, best.m], p, S: best.S }
      // la stanza guarda la sua strada: +z locale verso la porta
      L.ry = { S: 0, N: Math.PI, E: Math.PI / 2, W: -Math.PI / 2 }[best.lato]
    }
    URB.nodoVicino = (x, z) => { let best = null, bd = Infinity; for (const n of rete) { const [a, b] = nodoXZ(n), d = Math.hypot(a - x, b - z); if (d < bd) { bd = d; best = n } } return best }
    // da un lotto a un altro: fuori dalla porta, lungo le strade, dentro dall'altra porta
    URB.percorso = (A, B) => {
      const k = A.id + '>' + B.id; if (URB.percorsi.has(k)) return URB.percorsi.get(k)
      let via = null; if (A !== B) via = dijkstra(A.porta.nodi, B.porta.nodi, costoPiedi)
      const pts = [A.porta.p]; if (via) for (const n of via) pts.push(nodoXZ(n)); pts.push(B.porta.p)
      URB.percorsi.set(k, pts); return pts }
    URB.inRete = rete
    URB.traNodi = (a, b) => (dijkstra([a], [b], costoPiedi) ?? [b]).map(nodoXZ)
    // i luoghi «strada» (la strada per…): stanno sul tratto di strada più vicino
    for (const l of per('strada')) { const [x, z] = WP(l); let best = null, bd = Infinity; for (const S0 of URB.strade) { const mx = (S0.a[0] + S0.b[0]) / 2, mz = (S0.a[1] + S0.b[1]) / 2, d = Math.hypot(mx - x, mz - z); if (d < bd) { bd = d; best = S0 } }
      if (best) { const mx = (best.a[0] + best.b[0]) / 2, mz = (best.a[1] + best.b[1]) / 2; URB.lotti.set(l.id, { id: l.id, tipo: 'strada', x: mx, z: mz, lx: 20, lz: 20, w: 0, h: 0, porta: { lato: 'S', nodi: [best.n, best.m], p: [mx, mz], S: best } }) } }
  }

  // ── la città come una muffa: niente griglia. I luoghi stanno dove li mette la memoria (il loro punto nel territorio),
  // scostati quel tanto che basta per non toccarsi; tra loro germinano spore, e la rete cresce come un fisaro: tra le
  // parole legate e lungo le vie della vita si rinforzano i tubi più battuti, gli altri non nascono nemmeno. Le strade
  // curvano, si gonfiano agli incroci, i luoghi ci stanno appesi come frutti, ognuno col suo peduncolo. ─────────────────────
  function cittaMuffa() {
    const VIu = D.vita, luoghi = VIu?.luoghi ?? [], per = t => luoghi.filter(l => l.tipo === t), WP = l => [X(l.x), Z(l.y)]
    const corpi = [] // i luoghi come dischi: x, z, raggio
    const metti = (id, x, z, r, tipo) => { const L = { id, tipo, x, z, r, lx: r * 2, lz: r * 2, w: 1, h: 1 }; URB.lotti.set(id, L); corpi.push(L); return L }
    metti('piazza', PZ.x, PZ.z, 105, 'piazza')
    for (const c of costr.filter(c => c.tipo === 'capsula' && c.pos?.x != null)) { const L = metti('capsula:' + c.id, X(c.pos.x), Z(c.pos.y), 92, 'sala'); URB.lotti.set('sala:' + c.q, L) }
    for (const l of luoghi) if (['mensa', 'biblioteca', 'bottega', 'officina', 'osservatorio', 'archivio', 'assemblea', 'guardaroba'].includes(l.tipo)) metti(l.id, ...WP(l), 52, l.tipo)
    for (const l of luoghi) if (['fontana', 'giardino'].includes(l.tipo)) metti(l.id, ...WP(l), 38, l.tipo)
    for (const l of per('sala')) if (!URB.lotti.has(l.id)) metti(l.id, ...WP(l), 92, 'sala')
    for (const l of per('confine')) metti(l.id, ...WP(l), 46, 'confine')
    for (const l of per('piazza')) if (l.id !== 'piazza') metti(l.id, ...WP(l), 24, 'piazzetta')
    for (const l of per('casa')) metti(l.id, ...WP(l), 24, 'casa')
    // si scostano finché non si toccano più (la piazza non si muove)
    for (let it = 0; it < 220; it++) { let mosso = false
      for (let i = 0; i < corpi.length; i++) for (let j = i + 1; j < corpi.length; j++) { const A = corpi[i], B = corpi[j], dx = B.x - A.x, dz = B.z - A.z, d = Math.hypot(dx, dz) || 0.01, m = A.r + B.r + 20; if (d >= m) continue; mosso = true
        const k = (m - d) / d, wa = A.id === 'piazza' ? 0 : B.id === 'piazza' ? 1 : 0.5, wb = 1 - wa; A.x -= dx * k * wa; A.z -= dz * k * wa; B.x += dx * k * wb; B.z += dz * k * wb }
      if (!mosso) break }
    // i nodi: le parole (incroci) e le spore che germinano negli spazi liberi tra i luoghi
    const NODI = [], tipoN = [], libero = (x, z, m) => corpi.every(L => Math.hypot(L.x - x, L.z - z) > L.r + m)
    const KPu = D.costruito?.parole ?? {}, PW = Object.entries(KPu).map(([w, q]) => ({ w, x: X(q.x), z: Z(q.y), q, peso: (q.vett ?? []).reduce((a, b) => a + b, 0) })).sort((a, b) => b.peso - a.peso)
    URB.parole = new Map(); URB.relazioni = []
    for (const P of PW) { let x = P.x, z = P.z; for (let r = 0; r < 400 && !(libero(x, z, 14) && NODI.every(([a, b]) => Math.hypot(a - x, b - z) > 30)); r += 6) { const a = r * 0.37; x = P.x + Math.cos(a) * r; z = P.z + Math.sin(a) * r }
      P.n = NODI.length; NODI.push([x, z]); tipoN.push('parola'); URB.parole.set(P.w, P) }
    let x0 = Infinity, x1 = -Infinity, z0 = Infinity, z1 = -Infinity; for (const L of corpi) { x0 = Math.min(x0, L.x - L.r); x1 = Math.max(x1, L.x + L.r); z0 = Math.min(z0, L.z - L.r); z1 = Math.max(z1, L.z + L.r) }
    let hs = 7; const rnd = () => ((hs = (hs * 1664525 + 1013904223) >>> 0) / 4294967296)
    for (let x = x0; x <= x1; x += 40) for (let z = z0; z <= z1; z += 40) { const px = x + (rnd() - 0.5) * 26, pz = z + (rnd() - 0.5) * 26
      if (!libero(px, pz, 7) || NODI.some(([a, b]) => Math.hypot(a - px, b - pz) < 26)) continue
      if (!corpi.some(L => Math.hypot(L.x - px, L.z - pz) < L.r + 140)) continue // solo dove c'è vita vicino
      NODI.push([px, pz]); tipoN.push('spora') }
    const nB = NODI.length // i luoghi vengono dopo: sono foglie, si raggiungono ma non si attraversano
    const taglia = (ax, az, bx, bz, salta) => corpi.some(L => { if (salta.includes(L)) return false; const ex = bx - ax, ez = bz - az, L2 = ex * ex + ez * ez || 1, t = Math.max(0, Math.min(1, ((L.x - ax) * ex + (L.z - az) * ez) / L2)); return Math.hypot(ax + ex * t - L.x, az + ez * t - L.z) < L.r + 4 })
    const adj = new Map(), cand = new Map(), latoK = (n, m) => n < m ? n + '-' + m : m + '-' + n
    const lega = (n, m) => { const k = latoK(n, m); if (cand.has(k)) return; const [ax, az] = NODI[n], [bx, bz] = NODI[m]; cand.set(k, { n, m, len: Math.hypot(bx - ax, bz - az) }); if (!adj.has(n)) adj.set(n, []); if (!adj.has(m)) adj.set(m, []); adj.get(n).push(m); adj.get(m).push(n) }
    for (let n = 0; n < nB; n++) { const [x, z] = NODI[n]; const vic = []; for (let m = 0; m < nB; m++) if (m !== n) vic.push([Math.hypot(NODI[m][0] - x, NODI[m][1] - z), m]); vic.sort((a, b) => a[0] - b[0])
      let k = 0; for (const [d, m] of vic) { if (k >= 6 || d > 190) break; if (taglia(x, z, NODI[m][0], NODI[m][1], [])) continue; lega(n, m); k++ } }
    const corpiN = new Map()
    // ogni luogo ha il suo peduncolo verso la spora o la parola più vicina che si raggiunge senza attraversare altri luoghi
    for (const L of new Set(URB.lotti.values())) { L.nodo = NODI.length; corpiN.set(L.nodo, L); NODI.push([L.x, L.z]); tipoN.push('luogo')
      const vic = []; for (let m = 0; m < nB; m++) vic.push([Math.hypot(NODI[m][0] - L.x, NODI[m][1] - L.z), m]); vic.sort((a, b) => a[0] - b[0])
      let k = 0; for (const [, m] of vic) { if (k >= (L.r > 60 ? 3 : 2)) break; if (taglia(L.x, L.z, NODI[m][0], NODI[m][1], [L])) continue; lega(L.nodo, m); k++ }
      if (!k && vic.length) lega(L.nodo, vic[0][1]) } // stretto tra gli altri: si allaccia comunque alla spora più vicina
    const uso = new Map()
    const dijkstra = (da, a, costo) => { const dist = new Map(), prev = new Map(), mete = new Set(a), H = []; const push = (n, d) => { H.push([d, n]); let i = H.length - 1; while (i > 0) { const p = (i - 1) >> 1; if (H[p][0] <= H[i][0]) break; [H[p], H[i]] = [H[i], H[p]]; i = p } }
      const pop = () => { const t = H[0], e = H.pop(); if (H.length) { H[0] = e; let i = 0; for (;;) { const l = 2 * i + 1, r = l + 1; let m = i; if (l < H.length && H[l][0] < H[m][0]) m = l; if (r < H.length && H[r][0] < H[m][0]) m = r; if (m === i) break; [H[m], H[i]] = [H[i], H[m]]; i = m } } return t }
      for (const n of da) { dist.set(n, 0); push(n, 0) }
      while (H.length) { const [d, n] = pop(); if (d > dist.get(n)) continue; if (mete.has(n)) { const via = [n]; let k = n; while (prev.has(k)) { k = prev.get(k); via.push(k) } return via.reverse() }
        if (n >= nB && !da.includes(n)) continue // dentro un luogo non si passa
        for (const m of adj.get(n) ?? []) { const c = costo(n, m); if (!isFinite(c)) continue; const nd = d + c; if (nd < (dist.get(m) ?? Infinity)) { dist.set(m, nd); prev.set(m, n); push(m, nd) } } }
      return null }
    // il fisaro: chi passa rinforza, e un tubo già grosso costa meno (così i percorsi si raccolgono in pochi tubi)
    const costoNuovo = (n, m) => { const c = cand.get(latoK(n, m)), u = uso.get(latoK(n, m)) ?? 0; return c.len * (1 / (1 + Math.log1p(u) * 0.35)) }
    const segna = (via, w) => { for (let k = 1; k < via.length; k++) { const q = latoK(via[k - 1], via[k]); uso.set(q, (uso.get(q) ?? 0) + w) } }
    { const visti = new Set(); for (const P of URB.parole.values()) for (const v of P.q.vicini ?? []) { const Q = URB.parole.get(v); if (!Q) continue; const k = [P.w, Q.w].sort().join('|'); if (visti.has(k)) continue; visti.add(k)
        const via = dijkstra([P.n], [Q.n], costoNuovo); if (!via) continue; segna(via, 40); URB.relazioni.push({ A: P.w, B: Q.w, via, peso: P.peso + Q.peso }) } }
    const vie = (VIu?.vie ?? []).filter(v => v[2] >= 2 && URB.lotti.has(v[0]) && URB.lotti.has(v[1]) && URB.lotti.get(v[0]) !== URB.lotti.get(v[1])).sort((a, b) => b[2] - a[2]).slice(0, 520)
    for (const [a, b, n] of vie) { const via = dijkstra([URB.lotti.get(a).nodo], [URB.lotti.get(b).nodo], costoNuovo); if (via) segna(via, n) }
    const rete = new Set(); for (const k of uso.keys()) for (const n of k.split('-')) rete.add(+n)
    for (const L of new Set(URB.lotti.values())) { if (rete.has(L.nodo) || !rete.size) continue; const via = dijkstra([L.nodo], [...rete].filter(n => n < nB), costoNuovo); if (!via) continue; segna(via, 1); via.forEach(n => rete.add(n)) }
    for (const P of URB.parole.values()) { if (rete.has(P.n) || !rete.size) continue; const via = dijkstra([P.n], [...rete].filter(n => n < nB), costoNuovo); if (!via) continue; segna(via, 6); via.forEach(n => rete.add(n)) }
    // i tubi: curve morbide (piegate un poco, sempre dallo stesso lato per la stessa coppia), larghe quanto sono battute
    const valori = [...uso.values()].sort((a, b) => b - a), soglia = q => valori[Math.floor(valori.length * q)] ?? 0, sCorso = soglia(0.14), sVia = soglia(0.5)
    for (const [k, u] of uso) { const [n, m] = k.split('-').map(Number), A = NODI[n], B = NODI[m]
      const rango = u >= sCorso ? 'corso' : u >= sVia ? 'via' : 'sentiero', largo = { corso: 12 + Math.min(8, Math.log1p(u)), via: 8, sentiero: 4.5 }[rango]
      const ex = B[0] - A[0], ez = B[1] - A[1], len = Math.hypot(ex, ez) || 1, h = ((n * 73856093) ^ (m * 19349663)) >>> 0, piega = (((h % 1000) / 1000) - 0.5) * 0.36 * len
      const cx = (A[0] + B[0]) / 2 - ez / len * piega, cz = (A[1] + B[1]) / 2 + ex / len * piega, pts = []
      for (let i = 0; i <= 12; i++) { const t = i / 12; pts.push([(1 - t) ** 2 * A[0] + 2 * (1 - t) * t * cx + t * t * B[0], (1 - t) ** 2 * A[1] + 2 * (1 - t) * t * cz + t * t * B[1]]) }
      // dentro il disco di un luogo il tubo non si vede: comincia dal suo bordo
      const dentro = (q, L) => L && Math.hypot(q[0] - L.x, q[1] - L.z) < L.r * 0.92, Ln = n >= nB ? corpiN.get(n) : null, Lm = m >= nB ? corpiN.get(m) : null
      const visibili = pts.filter(q => !dentro(q, Ln) && !dentro(q, Lm))
      const S0 = { k, n, m, pts, vis: visibili.length >= 2 ? visibili : pts, a: pts[0], b: pts[pts.length - 1], uso: u, rango, largo, lati: [[], []], pedu: n >= nB || m >= nB }; URB.lati.set(k, S0); URB.strade.push(S0) }
    // la porta di ogni luogo: dove il suo peduncolo più battuto tocca il bordo, e la stanza guarda da quella parte
    for (const L of new Set(URB.lotti.values())) { let best = null; for (const m of adj.get(L.nodo) ?? []) { const S0 = URB.lati.get(latoK(L.nodo, m)); if (S0 && (!best || S0.uso > best.uso)) best = S0 }
      const verso = best ? (best.n === L.nodo ? best.pts[3] : best.pts[best.pts.length - 4]) : [L.x, L.z + 1], dx = verso[0] - L.x, dz = verso[1] - L.z, d = Math.hypot(dx, dz) || 1
      L.ry = Math.atan2(dx, dz); L.porta = { nodi: [L.nodo], p: [L.x + dx / d * L.r * 0.9, L.z + dz / d * L.r * 0.9], S: best } }
    URB.nodoXZ = n => NODI[n]; URB.latoK = latoK; URB.inRete = new Set([...rete].filter(n => n < nB))
    URB.nodoVicino = (x, z) => { let best = null, bd = Infinity; for (const n of URB.inRete) { const d = Math.hypot(NODI[n][0] - x, NODI[n][1] - z); if (d < bd) { bd = d; best = n } } return best }
    const costoPiedi = (n, m) => { const S0 = URB.lati.get(latoK(n, m)); return S0 ? cand.get(latoK(n, m)).len * (S0.rango === 'corso' ? 0.8 : S0.rango === 'via' ? 0.9 : 1) : Infinity }
    const lungo = via => { const out = []; for (let k = 1; k < via.length; k++) { const S0 = URB.lati.get(latoK(via[k - 1], via[k])); if (!S0) continue; const p = S0.n === via[k - 1] ? S0.pts : S0.pts.slice().reverse(); out.push(...(out.length ? p.slice(1) : p)) } return out }
    URB.traNodi = (a, b) => { const via = dijkstra([a], [b], costoPiedi); return via ? lungo(via) : [NODI[b]] }
    URB.percorso = (A, B) => { const k = A.id + '>' + B.id; if (URB.percorsi.has(k)) return URB.percorsi.get(k); const via = A !== B ? dijkstra([A.nodo], [B.nodo], costoPiedi) : null
      const pts = via ? lungo(via) : [A.porta.p, B.porta.p]; URB.percorsi.set(k, pts); return pts }
    for (const l of per('strada')) { const [x, z] = WP(l); let best = null, bd = Infinity; for (const S0 of URB.strade) { if (S0.pedu) continue; const q = S0.pts[6], d = Math.hypot(q[0] - x, q[1] - z); if (d < bd) { bd = d; best = S0 } }
      if (best) { const q = best.pts[6]; URB.lotti.set(l.id, { id: l.id, tipo: 'strada', x: q[0], z: q[1], lx: 20, lz: 20, r: 10, w: 0, h: 0, nodo: best.n, porta: { nodi: [best.n], p: q, S: best } }) } }
    URB.forma = 'muffa'
  }
  // ── la città, una sola: cresce come una muffa e prende la forma della memoria. Le parole sono gli incroci, nel punto dove
  // stanno nello spazio dei concetti; tra loro germinano spore; la rete si rinforza dove passano le relazioni tra le parole e
  // le vie della vita (i tubi più battuti diventano corsi, gli altri vie e sentieri, gli altri ancora non nascono). Poi ogni
  // luogo si affaccia su una strada vicina al suo punto della memoria, a filo con i vicini: fronte sulla via, stanze dietro.
  // Così le strade hanno le loro facciate e la città è un tessuto unico, non stanze sparse. ──────────────────────────────────
  function cittaUna() {
    const VIu = D.vita, luoghi = VIu?.luoghi ?? [], per = t => luoghi.filter(l => l.tipo === t), WP = l => [X(l.x), Z(l.y)]
    const NODI = [], latoK = (n, m) => n < m ? n + '-' + m : m + '-' + n
    const KPu = D.costruito?.parole ?? {}, PW = Object.entries(KPu).map(([w, q]) => ({ w, x: X(q.x), z: Z(q.y), q, peso: (q.vett ?? []).reduce((a, b) => a + b, 0) })).sort((a, b) => b.peso - a.peso)
    URB.parole = new Map(); URB.relazioni = []
    const PIAZZA_R = 105, lontanoDallaPiazza = (x, z, m) => Math.hypot(x - PZ.x, z - PZ.z) > PIAZZA_R + m
    for (const P of PW) { let x = P.x, z = P.z; for (let r = 0; r < 600 && !(NODI.every(([a, b]) => Math.hypot(a - x, b - z) > 70) && lontanoDallaPiazza(x, z, 20)); r += 8) { const a = r * 0.37; x = P.x + Math.cos(a) * r; z = P.z + Math.sin(a) * r }
      P.n = NODI.length; NODI.push([x, z]); URB.parole.set(P.w, P) }
    // le spore: dove c'è memoria vicino (i luoghi, le parole), una ogni centinaio di unità, mai troppo vicine
    const memorie = [...luoghi.map(WP), ...PW.map(P => [P.x, P.z]), [PZ.x, PZ.z]]
    let x0 = Infinity, x1 = -Infinity, z0 = Infinity, z1 = -Infinity; for (const [x, z] of memorie) { x0 = Math.min(x0, x); x1 = Math.max(x1, x); z0 = Math.min(z0, z); z1 = Math.max(z1, z) }
    let hs = 11; const rnd = () => ((hs = (hs * 1664525 + 1013904223) >>> 0) / 4294967296)
    for (let x = x0 - 120; x <= x1 + 120; x += 105) for (let z = z0 - 120; z <= z1 + 120; z += 105) { const px = x + (rnd() - 0.5) * 60, pz = z + (rnd() - 0.5) * 60
      if (NODI.some(([a, b]) => Math.hypot(a - px, b - pz) < 78) || !lontanoDallaPiazza(px, pz, 10)) continue
      if (!memorie.some(([a, b]) => Math.hypot(a - px, b - pz) < 170)) continue
      NODI.push([px, pz]) }
    // il nodo della piazza: il suo centro (le strade la attraversano, è lastricata)
    const nPiazza = NODI.length; NODI.push([PZ.x, PZ.z])
    const adj = new Map(), cand = new Map()
    const lega = (n, m) => { const k = latoK(n, m); if (cand.has(k)) return; const [ax, az] = NODI[n], [bx, bz] = NODI[m]; cand.set(k, { n, m, len: Math.hypot(bx - ax, bz - az) }); if (!adj.has(n)) adj.set(n, []); if (!adj.has(m)) adj.set(m, []); adj.get(n).push(m); adj.get(m).push(n) }
    for (let n = 0; n < NODI.length; n++) { const [x, z] = NODI[n], vic = []; for (let m = 0; m < NODI.length; m++) if (m !== n) vic.push([Math.hypot(NODI[m][0] - x, NODI[m][1] - z), m]); vic.sort((a, b) => a[0] - b[0])
      let k = 0; for (const [d, m] of vic) { if (k >= 5 || d > 230) break; lega(n, m); k++ } }
    const dijkstra = (da, a, costo) => { const dist = new Map(), prev = new Map(), mete = new Set(a), H = []; const push = (n, d) => { H.push([d, n]); let i = H.length - 1; while (i > 0) { const p = (i - 1) >> 1; if (H[p][0] <= H[i][0]) break; [H[p], H[i]] = [H[i], H[p]]; i = p } }
      const pop = () => { const t = H[0], e = H.pop(); if (H.length) { H[0] = e; let i = 0; for (;;) { const l = 2 * i + 1, r = l + 1; let m = i; if (l < H.length && H[l][0] < H[m][0]) m = l; if (r < H.length && H[r][0] < H[m][0]) m = r; if (m === i) break; [H[m], H[i]] = [H[i], H[m]]; i = m } } return t }
      for (const n of da) { dist.set(n, 0); push(n, 0) }
      while (H.length) { const [d, n] = pop(); if (d > dist.get(n)) continue; if (mete.has(n)) { const via = [n]; let k = n; while (prev.has(k)) { k = prev.get(k); via.push(k) } return via.reverse() }
        for (const m of adj.get(n) ?? []) { const c = costo(n, m); if (!isFinite(c)) continue; const nd = d + c; if (nd < (dist.get(m) ?? Infinity)) { dist.set(m, nd); prev.set(m, n); push(m, nd) } } }
      return null }
    const uso = new Map(), costoNuovo = (n, m) => { const c = cand.get(latoK(n, m)), u = uso.get(latoK(n, m)) ?? 0; return c.len * (1 / (1 + Math.log1p(u) * 0.35)) }
    const segna = (via, w) => { for (let k = 1; k < via.length; k++) { const q = latoK(via[k - 1], via[k]); uso.set(q, (uso.get(q) ?? 0) + w) } }
    const nodoMemoria = (x, z) => { let best = 0, bd = Infinity; for (let n = 0; n < NODI.length; n++) { const d = Math.hypot(NODI[n][0] - x, NODI[n][1] - z); if (d < bd) { bd = d; best = n } } return best }
    const memoriaDi = new Map(luoghi.map(l => [l.id, l.id === 'piazza' ? nPiazza : nodoMemoria(...WP(l))]))
    { const visti = new Set(); for (const P of URB.parole.values()) for (const v of P.q.vicini ?? []) { const Q = URB.parole.get(v); if (!Q) continue; const k = [P.w, Q.w].sort().join('|'); if (visti.has(k)) continue; visti.add(k)
        const via = dijkstra([P.n], [Q.n], costoNuovo); if (!via) continue; segna(via, 40); URB.relazioni.push({ A: P.w, B: Q.w, via, peso: P.peso + Q.peso }) } }
    const vie = (VIu?.vie ?? []).filter(v => v[2] >= 2 && memoriaDi.has(v[0]) && memoriaDi.has(v[1]) && memoriaDi.get(v[0]) !== memoriaDi.get(v[1])).sort((a, b) => b[2] - a[2]).slice(0, 600)
    for (const [a, b, n] of vie) { const via = dijkstra([memoriaDi.get(a)], [memoriaDi.get(b)], costoNuovo); if (via) segna(via, n) }
    const rete = new Set(); for (const k of uso.keys()) for (const n of k.split('-')) rete.add(+n)
    for (const n of new Set([...memoriaDi.values(), ...[...URB.parole.values()].map(P => P.n)])) { if (rete.has(n) || !rete.size) continue; const via = dijkstra([n], [...rete], costoNuovo); if (!via) continue; segna(via, 3); via.forEach(q => rete.add(q)) }
    // i tubi: curve morbide, larghe quanto sono battute
    const valori = [...uso.values()].sort((a, b) => b - a), soglia = q => valori[Math.floor(valori.length * q)] ?? 0, sCorso = soglia(0.16), sVia = soglia(0.55)
    for (const [k, u] of uso) { const [n, m] = k.split('-').map(Number), A = NODI[n], B = NODI[m]
      const rango = u >= sCorso ? 'corso' : u >= sVia ? 'via' : 'sentiero', largo = { corso: 12 + Math.min(6, Math.log1p(u)), via: 8, sentiero: 5 }[rango]
      const ex = B[0] - A[0], ez = B[1] - A[1], len = Math.hypot(ex, ez) || 1, h = ((n * 73856093) ^ (m * 19349663)) >>> 0, piega = (((h % 1000) / 1000) - 0.5) * 0.3 * len
      const cx = (A[0] + B[0]) / 2 - ez / len * piega, cz = (A[1] + B[1]) / 2 + ex / len * piega, pts = []
      for (let i = 0; i <= 16; i++) { const t = i / 16; pts.push([(1 - t) ** 2 * A[0] + 2 * (1 - t) * t * cx + t * t * B[0], (1 - t) ** 2 * A[1] + 2 * (1 - t) * t * cz + t * t * B[1]]) }
      const cum = [0]; for (let i = 1; i < pts.length; i++) cum.push(cum[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]))
      const S0 = { k, n, m, pts, vis: pts, cumP: cum, Lp: cum[cum.length - 1], a: pts[0], b: pts[pts.length - 1], uso: u, rango, largo, lati: [[], []], fronti: [[], []] }; URB.lati.set(k, S0); URB.strade.push(S0) }
    // un indice spaziale dei tratti di strada, per sapere subito se un lotto ci finisce sopra
    const CS = 40, griglia = new Map(), kc = (x, z) => Math.floor(x / CS) + ',' + Math.floor(z / CS)
    for (const s of URB.strade) for (let i = 1; i < s.pts.length; i++) { const [ax, az] = s.pts[i - 1], [bx, bz] = s.pts[i]; for (let t = 0; t <= 1; t += 0.25) { const k = kc(ax + (bx - ax) * t, az + (bz - az) * t); if (!griglia.has(k)) griglia.set(k, new Set()); griglia.get(k).add(s.k + '|' + i) } }
    const suStrada = (x, z, m) => { const i0 = Math.floor(x / CS), j0 = Math.floor(z / CS); for (let a = -1; a <= 1; a++) for (let b = -1; b <= 1; b++) for (const q of griglia.get((i0 + a) + ',' + (j0 + b)) ?? []) { const [k, i] = q.split('|'), s = URB.lati.get(k), A = s.pts[+i - 1], B = s.pts[+i], ex = B[0] - A[0], ez = B[1] - A[1], L2 = ex * ex + ez * ez || 1, t = Math.max(0, Math.min(1, ((x - A[0]) * ex + (z - A[1]) * ez) / L2)); if (Math.hypot(A[0] + ex * t - x, A[1] + ez * t - z) < s.largo / 2 + m) return true } return false }
    const puntoSu = (s, l) => { let i = 1; while (i < s.pts.length - 1 && s.cumP[i] < l) i++; const a = s.pts[i - 1], b = s.pts[i], seg = (s.cumP[i] - s.cumP[i - 1]) || 1, t = (l - s.cumP[i - 1]) / seg; return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, (b[0] - a[0]) / seg, (b[1] - a[1]) / seg] }
    const vicinoSu = (s, x, z) => { let best = [Infinity, 0, 0]; for (let i = 1; i < s.pts.length; i++) { const a = s.pts[i - 1], b = s.pts[i], ex = b[0] - a[0], ez = b[1] - a[1], L2 = ex * ex + ez * ez || 1, t = Math.max(0, Math.min(1, ((x - a[0]) * ex + (z - a[1]) * ez) / L2)), d = Math.hypot(a[0] + ex * t - x, a[1] + ez * t - z)
        if (d < best[0]) best = [d, s.cumP[i - 1] + t * Math.sqrt(L2), (ex * (z - a[1]) - ez * (x - a[0])) > 0 ? 1 : 0] } return best }
    // i lotti: rettangoli orientati che non si sovrappongono (separazione sugli assi)
    const messi = [], angoli = L => { const c = Math.cos(L.ry), s = Math.sin(L.ry), hx = L.lx / 2, hz = L.lz / 2; return [[-hx, -hz], [hx, -hz], [hx, hz], [-hx, hz]].map(([a, b]) => [L.x + a * c + b * s, L.z - a * s + b * c]) }
    const separati = (A, B) => { if (Math.hypot(A.x - B.x, A.z - B.z) > (Math.hypot(A.lx, A.lz) + Math.hypot(B.lx, B.lz)) / 2 + 2) return true; const pa = angoli(A), pb = angoli(B)
      for (const P of [pa, pb]) for (let i = 0; i < 4; i++) { const [x1_, z1_] = P[i], [x2_, z2_] = P[(i + 1) % 4], nx = -(z2_ - z1_), nz = x2_ - x1_, ln = Math.hypot(nx, nz) || 1; const pr = Q => Q.map(([x, z]) => x * nx + z * nz), A1 = pr(pa), B1 = pr(pb); if (Math.max(...A1) + 2 * ln <= Math.min(...B1) || Math.max(...B1) + 2 * ln <= Math.min(...A1)) return true } return false }
    const sulLotto = L => { const c = Math.cos(L.ry), s = Math.sin(L.ry); for (const a of [-0.5, 0, 0.5]) for (const b of [-0.5, 0, 0.5]) { const x = L.x + a * L.lx * c + b * L.lz * s, z = L.z - a * L.lx * s + b * L.lz * c; if (suStrada(x, z, 1.5)) return true } return false }
    const piazzaL = { id: 'piazza', tipo: 'piazza', x: PZ.x, z: PZ.z, lx: PIAZZA_R * 2, lz: PIAZZA_R * 2, r: PIAZZA_R, ry: 0, w: 1, h: 1 }; URB.lotti.set('piazza', piazzaL); messi.push(piazzaL)
    const misure = l => { if (l.tipo === 'sala') return [118, 96]; if (l.tipo === 'fontana') return [52, 52]; if (l.tipo === 'giardino') return [74, 62]; if (l.tipo === 'piazza') return [40, 36]; const S = stanzaDi(l); return S ? [S.W + 4, S.H + 4] : [44, 40] }
    const affaccia = (id, tipo, x, z, F, Dp) => {
      const cands = URB.strade.map(s => [vicinoSu(s, x, z), s]).sort((a, b) => a[0][0] - b[0][0]).slice(0, 26)
      for (const [[, l0, lato], s] of cands) { const marg = F / 2 + 8; if (s.Lp < 2 * marg) continue
        for (const sd of [lato, 1 - lato]) for (let k = 0; k < 40; k++) { const l = l0 + (k % 2 ? 1 : -1) * Math.ceil(k / 2) * 7; if (l < marg || l > s.Lp - marg) continue
          if (s.fronti[sd].some(([a, b]) => l + F / 2 > a - 2 && l - F / 2 < b + 2)) continue
          const [px, pz, ux, uz] = puntoSu(s, l), nx = sd ? -uz : uz, nz = sd ? ux : -ux, off = s.largo / 2 + 5 + Dp / 2
          const L = { id, tipo, x: px + nx * off, z: pz + nz * off, lx: F, lz: Dp, ry: Math.atan2(-nx, -nz), w: 1, h: 1 }
          if (!messi.every(M2 => separati(L, M2)) || sulLotto(L)) continue
          s.fronti[sd].push([l - F / 2, l + F / 2]); L.r = Math.min(F, Dp) / 2; L.porta = { p: [px, pz], s, l, nodi: [s.n, s.m] }; messi.push(L); return L } }
      // nessuna strada ha posto: resta al suo punto, scostato quanto serve
      const L = { id, tipo, x, z, lx: F, lz: Dp, ry: 0, w: 1, h: 1, r: Math.min(F, Dp) / 2 }; for (let r = 0; r < 800 && !messi.every(M2 => separati(L, M2)); r += 10) { const a = r * 0.3; L.x = x + Math.cos(a) * r; L.z = z + Math.sin(a) * r } messi.push(L)
      const n = URB.nodoVicinoIn ? URB.nodoVicinoIn(L.x, L.z) : null; L.porta = { p: n != null ? NODI[n] : [L.x, L.z], nodi: n != null ? [n] : [] }; return L }
    URB.nodoVicinoIn = (x, z) => { let best = null, bd = Infinity; for (const n of rete) { const d = Math.hypot(NODI[n][0] - x, NODI[n][1] - z); if (d < bd) { bd = d; best = n } } return best }
    const ordine = [...costr.filter(c => c.tipo === 'capsula' && c.pos?.x != null).map(c => ({ id: 'capsula:' + c.id, tipo: 'sala', x: X(c.pos.x), z: Z(c.pos.y), c })),
      ...luoghi.filter(l => ['mensa', 'biblioteca', 'bottega', 'officina', 'osservatorio', 'archivio', 'assemblea', 'guardaroba', 'fontana', 'giardino'].includes(l.tipo)).map(l => ({ l })),
      ...per('sala').filter(l => !costr.some(c => c.tipo === 'capsula' && 'sala:' + c.q === l.id)).map(l => ({ l })), ...per('confine').map(l => ({ l })), ...per('piazza').filter(l => l.id !== 'piazza').map(l => ({ l })), ...per('casa').map(l => ({ l }))]
    for (const o of ordine) { if (o.c) { const L = affaccia(o.id, 'sala', o.x, o.z, 118, 96); URB.lotti.set(o.id, L); URB.lotti.set('sala:' + o.c.q, L); continue }
      const l = o.l, [x, z] = WP(l), [F, Dp] = misure(l), L = affaccia(l.id, l.tipo === 'piazza' ? 'piazzetta' : l.tipo, x, z, F, Dp); URB.lotti.set(l.id, L) }
    piazzaL.porta = { p: [PZ.x, PZ.z], nodi: [nPiazza] }
    URB.nodoXZ = n => NODI[n]; URB.latoK = latoK; URB.inRete = rete; URB.nodoVicino = URB.nodoVicinoIn
    const costoPiedi = (n, m) => { const S0 = URB.lati.get(latoK(n, m)); return S0 ? S0.Lp * (S0.rango === 'corso' ? 0.85 : S0.rango === 'via' ? 0.92 : 1) : Infinity }
    const lungo = via => { const out = []; for (let k = 1; k < via.length; k++) { const S0 = URB.lati.get(latoK(via[k - 1], via[k])); if (!S0) continue; const p = S0.n === via[k - 1] ? S0.pts : S0.pts.slice().reverse(); out.push(...(out.length ? p.slice(1) : p)) } return out }
    // un pezzo di strada dalla porta fino a un capo del tratto
    const tratto = (s, l, n) => { if (!s) return []; const out = []; if (n === s.n) { for (let i = s.pts.length - 1; i >= 0; i--) if (s.cumP[i] < l) out.push(s.pts[i]) } else { for (let i = 0; i < s.pts.length; i++) if (s.cumP[i] > l) out.push(s.pts[i]) } return out }
    URB.traNodi = (a, b) => { const via = dijkstra([a], [b], costoPiedi); return via ? lungo(via) : [NODI[b]] }
    URB.percorso = (A, B) => { const k = A.id + '>' + B.id; if (URB.percorsi.has(k)) return URB.percorsi.get(k); let pts
      if (A === B) pts = [A.porta.p]
      else if (A.porta.s && A.porta.s === B.porta.s) pts = [A.porta.p, B.porta.p]
      else { const via = dijkstra(A.porta.nodi, B.porta.nodi, costoPiedi); pts = via ? [A.porta.p, ...tratto(A.porta.s, A.porta.l, via[0]), ...lungo(via), ...tratto(B.porta.s, B.porta.l, via[via.length - 1]).reverse(), B.porta.p] : [A.porta.p, B.porta.p] }
      URB.percorsi.set(k, pts); return pts }
    for (const l of per('strada')) { const [x, z] = WP(l); let best = null, bd = Infinity; for (const S0 of URB.strade) { const q = S0.pts[8], d = Math.hypot(q[0] - x, q[1] - z); if (d < bd) { bd = d; best = S0 } }
      if (best) { const q = best.pts[8]; URB.lotti.set(l.id, { id: l.id, tipo: 'strada', x: q[0], z: q[1], lx: 20, lz: 20, r: 10, w: 0, h: 0, porta: { p: q, s: best, l: best.cumP[8], nodi: [best.n, best.m] } }) } }
    URB.forma = 'muffa'
  }
  if (FORMA_C === 'griglia') cittaGriglia(); else if (FORMA_C === 'muffa') cittaMuffa(); else cittaUna()
  { const L = URB.lotti.get('piazza'); if (L) PZ.set(L.x, 0, L.z) }
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
  const tavolaMat = (id, taglio) => { const m = new THREE.MeshBasicMaterial({ color: 0x333333, side: THREE.DoubleSide }); m.userData.tavola = true; texture(id).then(t0 => { if (!t0) return; const t = taglio ? t0.clone() : t0; if (taglio) { t.offset.set(taglio[0], taglio[1]); t.repeat.set(taglio[2], taglio[3]); t.needsUpdate = true } m.map = t; m.color.set(0xffffff); m.needsUpdate = true }); return m }
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
    const LS = URB.lotti.get('capsula:' + c.id), cx = LS?.x ?? posSala.get(c.id).x, cz = LS?.z ?? posSala.get(c.id).z, cy = altezza(cx, cz), centro = new THREE.Vector3(cx, cy, cz)
    const ax = LS?.ry ?? 0 // l'ingresso sulla strada più battuta che tocca il suo isolato
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
        const lx = P.o[0] + P.lungo[0] * u, lz = P.o[1] + P.lungo[1] * u, [x, z] = aMondo(lx, lz), y = cy + 18 + v
        const m = new THREE.Mesh(new THREE.PlaneGeometry(W, H), tavolaMat(p.id)); m.rotation.y = verso(P.d[0], P.d[1]) + (p.voce?.gira ?? 0); m.position.set(x, y, z)
        // la lightbox: una cornice bianca che fa luce, e dietro il buio
        const cornice = new THREE.Mesh(new THREE.PlaneGeometry(W + 1.4, H + 1.4), new THREE.MeshBasicMaterial({ color: 0xc9ccd6 })); cornice.position.copy(m.position); cornice.rotation.copy(m.rotation); cornice.translateZ(-0.12); scena.add(cornice)
        const retro = new THREE.Mesh(new THREE.PlaneGeometry(W + 1.4, H + 1.4), new THREE.MeshBasicMaterial({ color: 0x101114 })); retro.position.copy(m.position); retro.rotation.copy(m.rotation); retro.translateZ(-0.25); retro.rotateY(Math.PI); scena.add(retro)
        // il riflesso sul pavimento lucido: la tavola capovolta sotto terra, sfocata e che svanisce
        const rif = new THREE.Mesh(new THREE.PlaneGeometry(W + 1.4, H + 1.4), materialeRiflesso(p.id, y - cy, H)); rif.position.set(x, cy - (y - cy), z); rif.rotation.copy(m.rotation); rif.scale.y = -1; rif.renderOrder = -1; scena.add(rif)
        if (rovina) m.rotation.z += (caso() - 0.5) * 0.12
        scena.add(m); m.userData = { tipo: 'tavola', p }; cliccabili.push(m); meshDi.set(p.id, { m, w: W, h: H, aTerra: false, cornice })
      })
      piano[0] = Math.max(piano[0], ...messe.map(m => Math.abs(m.u) * 2 + m.W)); piano[1] = Math.max(piano[1], ...messe.map(m => m.v + m.H / 2 + 18))
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
    // lungo le strade: le tavole fanno le facciate della città. Una tavola che nomina due parole legate sta sul corso che le
    // unisce; se ne nomina una sola, sulle strade che partono dal suo incrocio, il più vicino possibile; le altre sul tratto
    // più vicino al loro punto del territorio. Rivolte verso chi passa, in file, una sopra l'altra quando il ciglio è pieno.
    const dSeg = (x, z, a, b) => { const ex = b[0] - a[0], ez = b[1] - a[1], L2 = ex * ex + ez * ez || 1, t = Math.max(0, Math.min(1, ((x - a[0]) * ex + (z - a[1]) * ez) / L2)); return Math.hypot(x - a[0] - ex * t, z - a[1] - ez * t) }
    const MARG = 16, PASSO = 1.6, FILE = 3, CAP = FILE * (CELLA - 2 * MARG)
    const PAR = [...URB.parole.values()].map(P => ({ P, r: radiceP(P.w) }))
    const lista = resto.map(p => { const con = !!(p.img || p.mini), k = 0.35 + (p.i ?? 0.3), W = con ? 6 + 8 * k : 4.2, t = (p.t ?? '').toLowerCase(); return { p, con, W, H: W * 1.25, x: X(p.x), z: Z(p.y), parole: PAR.filter(q => t.includes(q.r)).map(q => q.P) } })
      .sort((a, b) => (b.con - a.con) || (b.parole.length - a.parole.length) || ((b.p.i ?? 0) - (a.p.i ?? 0)))
    // una strada è una linea spezzata (dritta nella griglia, curva nella muffa): lunghezza, punto e normale a una data distanza
    for (const s of URB.strade) { s.cum = [0]; for (let i = 1; i < s.vis.length; i++) s.cum.push(s.cum[i - 1] + Math.hypot(s.vis[i][0] - s.vis[i - 1][0], s.vis[i][1] - s.vis[i - 1][1])); s.L = s.cum[s.cum.length - 1]
      const c = s.pedu || s.L < 2 * MARG + 8 ? 0 : FILE * (s.L - 2 * MARG); s.cap = [c, c] }
    const vicinoSu = (s, x, z) => { let best = [Infinity, 0, 0]; for (let i = 1; i < s.vis.length; i++) { const a = s.vis[i - 1], b = s.vis[i], ex = b[0] - a[0], ez = b[1] - a[1], L2 = ex * ex + ez * ez || 1, t = Math.max(0, Math.min(1, ((x - a[0]) * ex + (z - a[1]) * ez) / L2)), d = Math.hypot(a[0] + ex * t - x, a[1] + ez * t - z)
        if (d < best[0]) best = [d, s.cum[i - 1] + t * Math.sqrt(L2), (ex * (z - a[1]) - ez * (x - a[0])) > 0 ? 1 : 0] } return best } // [distanza, a che punto, da che lato]
    const puntoSu = (s, l) => { let i = 1; while (i < s.vis.length - 1 && s.cum[i] < l) i++; const a = s.vis[i - 1], b = s.vis[i], seg = (s.cum[i] - s.cum[i - 1]) || 1, t = (l - s.cum[i - 1]) / seg; return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, (b[0] - a[0]) / seg, (b[1] - a[1]) / seg] }
    const latoDi = (n, m) => URB.lati.get(URB.latoK(n, m)), perRel = new Map(URB.relazioni.map(R => [[R.A, R.B].sort().join('|'), R]))
    // le strade attorno a un incrocio, a due passi al massimo, dalla più vicina
    const attorno = n => { const out = [], visti = new Set([n]); let fronte = [n]; for (let d = 0; d < 3 && fronte.length; d++) { const nuovo = []; for (const a of fronte) for (const s of URB.strade) { if (s.n !== a && s.m !== a) continue; if (!out.includes(s)) out.push(s); const b = s.n === a ? s.m : s.n; if (!visti.has(b)) { visti.add(b); nuovo.push(b) } } fronte = nuovo } return out }
    const metti = (t, cands) => { for (const s of cands) { const [, lungoT, lato] = vicinoSu(s, t.x, t.z); t.l = lungoT; for (const sd of [lato, 1 - lato]) if (s.cap[sd] >= t.W + PASSO) { s.cap[sd] -= t.W + PASSO; s.lati[sd].push(t); t.s = s; return true } } return false }
    for (const t of lista) {
      let fatto = false
      if (t.parole.length >= 2) for (let i = 0; i < t.parole.length && !fatto; i++) for (let j = i + 1; j < t.parole.length && !fatto; j++) { const R = perRel.get([t.parole[i].w, t.parole[j].w].sort().join('|')); if (!R) continue
        const tratti = []; for (let k = 1; k < R.via.length; k++) { const s = latoDi(R.via[k - 1], R.via[k]); if (s) tratti.push(s) } tratti.sort((a, b) => (b.cap[0] + b.cap[1]) - (a.cap[0] + a.cap[1])); fatto = metti(t, tratti); if (fatto) t.rel = R }
      if (!fatto && t.parole.length) fatto = metti(t, attorno(t.parole[0].n))
      if (!fatto) fatto = metti(t, URB.strade.filter(s => !s.pedu).map(s => [dSeg(t.x, t.z, s.a, s.b), s]).sort((a, b) => a[0] - b[0]).slice(0, 24).map(x => x[1]))
    }
    for (const s of URB.strade) for (const sd of [0, 1]) { const L = s.lati[sd]; if (!L.length) continue
      const off = s.largo / 2 + 2.6
      L.sort((p, q) => (q.con - p.con) || ((p.l ?? 0) - (q.l ?? 0)))
      let c = MARG, alto = 0, rigaH = 0
      for (const t of L) { if (c + t.W > s.L - MARG) { c = MARG; alto += rigaH + 1.2; rigaH = 0 } const lungo = c + t.W / 2; c += t.W + PASSO; rigaH = Math.max(rigaH, t.H)
        const [px, pz, ux, uz] = puntoSu(s, lungo), nx = sd ? -uz : uz, nz = sd ? ux : -ux
        t.wx = px + nx * off; t.wz = pz + nz * off; t.wy = 1.4 + alto + t.H / 2; t.ry = Math.atan2(-nx, -nz) } }
    // le tavole con l'immagine: un piano e la sua cornice chiara
    for (const t of lista) { if (t.wx == null || !t.con || SENZA.includes('tavole')) continue; const { p, W, H } = t, x = t.wx, z = t.wz, y = t.wy, fronte = t.ry
      const m = new THREE.Mesh(new THREE.PlaneGeometry(W, H), tavolaMatDa(p.img ? `img/${p.id}.jpg` : `mini/${p.id}.jpg`)); m.position.set(x, y, z); m.rotation.y = fronte
      const cornice = new THREE.Mesh(new THREE.PlaneGeometry(W + 0.7, H + 0.7), new THREE.MeshBasicMaterial({ color: 0xd9dbe6 })); cornice.position.copy(m.position); cornice.rotation.y = fronte; cornice.translateZ(-0.08)
      scena.add(cornice); scena.add(m); m.userData = { tipo: 'tavola', p, nota: t.rel ? `Sta sul corso tra «${t.rel.A}» e «${t.rel.B}».` : '' }; cliccabili.push(m); meshDi.set(p.id, { m, w: W, h: H, aTerra: false, cornice })
    }
    // le tavole che hanno solo il titolo: cartellini di carta col titolo stampato, su poche tele grandi (192 per tela)
    const senza = lista.filter(t => t.wx != null && !t.con), CW = 128, CH = 160, PER = 16 * 12
    for (let tt = 0; tt * PER < senza.length; tt++) {
      const parte = senza.slice(tt * PER, (tt + 1) * PER), cv = document.createElement('canvas'); cv.width = 1024; cv.height = 960; const g = cv.getContext('2d'); g.scale(0.5, 0.5) // a metà risoluzione: 13 tele da 4 MB invece che da 16
      const pos = [], uv = [], ind = []
      parte.forEach((t, i) => { const p = t.p
        const cx = (i % 16) * CW, cy = Math.floor(i / 16) * CH
        g.fillStyle = '#d6ccb8'; g.fillRect(cx + 2, cy + 2, CW - 4, CH - 4); g.fillStyle = '#16121b'; g.fillRect(cx + 9, cy + 10, 30, 3)
        g.font = '600 15px Inter, sans-serif'; const parole = (p.t || 'senza titolo').split(/\s+/); let riga = '', yy = cy + 32
        for (const w of parole) { if (g.measureText(riga + ' ' + w).width > CW - 18) { g.fillText(riga, cx + 9, yy); riga = w; yy += 18; if (yy > cy + CH - 30) break } else riga = riga ? riga + ' ' + w : w }
        if (yy <= cy + CH - 30) g.fillText(riga, cx + 9, yy)
        g.fillStyle = 'rgba(22,18,27,.55)'; g.font = '11px JetBrains Mono, monospace'; g.fillText(`giorno ${p.g}`, cx + 9, cy + CH - 12)
        const W = t.W, H = t.H, c = Math.cos(t.ry), sn = Math.sin(t.ry), dx = c * W / 2, dz = -sn * W / 2, b = pos.length / 3 // il piano girato verso la strada
        pos.push(t.wx - dx, t.wy - H / 2, t.wz - dz, t.wx + dx, t.wy - H / 2, t.wz + dz, t.wx + dx, t.wy + H / 2, t.wz + dz, t.wx - dx, t.wy + H / 2, t.wz - dz)
        const u0 = cx / 2048, u1 = (cx + CW) / 2048, v0 = 1 - (cy + CH) / 1920, v1 = 1 - cy / 1920
        uv.push(u0, v0, u1, v0, u1, v1, u0, v1); ind.push(b, b + 1, b + 2, b, b + 2, b + 3)
      })
      const geo = new THREE.BufferGeometry(); geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); geo.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2)); geo.setIndex(ind)
      const tx = new THREE.CanvasTexture(cv); tx.encoding = THREE.sRGBEncoding; tx.anisotropy = 4; LIBERABILI.add(tx)
      scena.add(new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ map: tx, side: THREE.DoubleSide })))
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
    // il segno per terra sta nel lotto più vicino a dove è stato fatto, sul suo pavimento nero (mai in mezzo alla strada)
    const d = c.dati ?? {}, x0 = X(c.pos.x), z0 = Z(c.pos.y); let Lg = null, bd = Infinity; for (const L of URB.lotti.values()) { if (L.tipo === 'strada' || L.tipo === 'sala') continue; const dd = Math.hypot(L.x - x0, L.z - z0); if (dd < bd) { bd = dd; Lg = L } }
    if (!Lg) continue; const nG = (Lg.segni = (Lg.segni ?? 0) + 1) - 1, aG = nG * 2.39996 + 0.4, rG = Math.min(Lg.lx, Lg.lz) * (0.18 + 0.05 * (nG % 4)), x = Lg.x + Math.cos(aG) * rG, z = Lg.z + Math.sin(aG) * rG, lato = 9 + (c.id.length % 4) * 2
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
    const cv = (window.__glProva ??= document.createElement('canvas').getContext('webgl')); if (cv) { /* un solo contesto di prova per tutti */ const sh = cv.createShader(cv.FRAGMENT_SHADER); cv.shaderSource(sh, 'precision highp float;\n' + frag); cv.compileShader(sh); if (!cv.getShaderParameter(sh, cv.COMPILE_STATUS)) return null }
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

  // ── le parole: un database vettoriale nello spazio. Ogni concetto è un punto alla sua posizione (dove stanno le tavole
  // che lo nominano, più in alto quanto più lega aree diverse), dentro il suo riquadro con le coordinate, come un oggetto
  // tracciato; una rete di frecce sottili lo lega ai vicini più simili. ─────────────────────────────────────────────
  const scritte = []
  {
    const KP = K.parole && Object.keys(K.parole).length ? K.parole : null
    const lista = KP ? Object.entries(KP).map(([w, q]) => { const base = parole.get(w) ?? { dist: new Float32Array(NQ), tot: 0 }; return { w, dist: base.dist, tot: base.tot, x: q.x, y: q.y, generale: q.z, vicini: q.vicini ?? [], chi: q.chi, peso: (q.vett ?? []).reduce((a, b) => a + b, 0) } }).sort((a, b) => b.peso - a.peso) : [...parole.values()].sort((a, b) => b.tot - a.tot).slice(0, 48)
    const etichettaVett = (P, imp) => {
      const cv = document.createElement('canvas'), g = cv.getContext('2d'), fs = 26; cv.width = 420; cv.height = 92
      g.strokeStyle = 'rgba(240,244,250,.95)'; g.lineWidth = 2; const box = 22 + imp * 20; g.strokeRect(4, 46 - box / 2, box, box)
      g.fillStyle = '#fff'; g.beginPath(); g.arc(4 + box / 2, 46, 3.5, 0, 7); g.fill()
      g.font = `500 ${fs}px JetBrains Mono, monospace`; g.fillStyle = 'rgba(240,244,250,.95)'; g.textBaseline = 'alphabetic'
      g.fillText(P.w, box + 14, 40); g.font = `400 ${fs * 0.7}px JetBrains Mono, monospace`; g.fillStyle = 'rgba(240,244,250,.6)'
      const t = new THREE.CanvasTexture(cv); t.encoding = THREE.sRGBEncoding; t.anisotropy = 4
      const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: t, transparent: true, depthWrite: false })); sp.center.set((4 + box / 2) / 420, 0.5)
      const k = 0.11 + 0.1 * imp; sp.scale.set(420 * k, 92 * k, 1); return sp }
    // ogni parola è scritta per terra sul suo incrocio, grande quanto pesa: i corsi che ne partono sono le sue relazioni
    lista.forEach((P, i) => {
      const imp = 1 - i / lista.length, U = URB.parole.get(P.w); if (!U) return
      const [x, z] = URB.nodoXZ(U.n), sc = scritta(P.w, 5 + imp * 7, '#f1ece2', 600); sc.rotation.set(-Math.PI / 2, 0, 0); sc.position.set(x, 0.3, z); sc.renderOrder = 4; scena.add(sc)
      const anello = new THREE.Mesh(new THREE.RingGeometry(9 + imp * 4, 9.8 + imp * 4, 48), new THREE.MeshBasicMaterial({ color: 0xf1ece2, transparent: true, opacity: 0.5, depthWrite: false })); anello.rotation.x = -Math.PI / 2; anello.position.set(x, 0.25, z); scena.add(anello)
      sc.userData = { tipo: 'parola', P }; cliccabili.push(sc); P.mesh = sc; P.base = new THREE.Vector3(x, 0, z)
    })
    // i nomi dei corsi: le due parole che legano
    for (const R of URB.relazioni.slice().sort((a, b) => b.peso - a.peso)) { const n = R.via[Math.floor(R.via.length / 2)], m = R.via[Math.floor(R.via.length / 2) - 1] ?? n, [ax, az] = URB.nodoXZ(n), [bx, bz] = URB.nodoXZ(m)
      etichetta(`<div class="s" style="font-style:italic;opacity:.8">corso «${esc(R.A)}» e «${esc(R.B)}»</div>`, new THREE.Vector3((ax + bx) / 2, 3, (az + bz) / 2), 520) }
  }

  // ── i legami tra le tavole: scie sottili di luce, e lucine che ci corrono sopra (azzurre e ambra) ─────────────────
  const corse = []
  {
    const glow = (() => { const cv = document.createElement('canvas'); cv.width = cv.height = 64; const g = cv.getContext('2d'), gr = g.createRadialGradient(32, 32, 0, 32, 32, 32); gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(0.25, 'rgba(255,255,255,.55)'); gr.addColorStop(1, 'rgba(255,255,255,0)'); g.fillStyle = gr; g.fillRect(0, 0, 64, 64); return new THREE.CanvasTexture(cv) })()
    const coppie = (D.fili ?? []).filter(([a, b]) => meshDi.has(D.punti[a]?.id) && meshDi.has(D.punti[b]?.id)).sort((x, y) => y[2] - x[2]).slice(0, 60)
    const lin = [], col = [], COL = [new THREE.Color(0x8fd0ff), new THREE.Color(0xffb46a)]
    for (const [a, b, w] of coppie) {
      const A = meshDi.get(D.punti[a].id).m.position, B = meshDi.get(D.punti[b].id).m.position, M = A.clone().lerp(B, 0.5); M.y = Math.min(A.y, B.y) - 6 - A.distanceTo(B) * 0.08
      const pts = new THREE.QuadraticBezierCurve3(A.clone(), M, B.clone()).getPoints(24), c = COL[(a + b) % 2]
      for (let k = 0; k < pts.length - 1; k++) { lin.push(pts[k].x, pts[k].y, pts[k].z, pts[k + 1].x, pts[k + 1].y, pts[k + 1].z); col.push(c.r, c.g, c.b, c.r, c.g, c.b) }
      corse.push({ pts, t: Math.random(), v: 0.05 + Math.random() * 0.08, c })
    }
    const gl = new THREE.BufferGeometry(); gl.setAttribute('position', new THREE.Float32BufferAttribute(lin, 3)); gl.setAttribute('color', new THREE.Float32BufferAttribute(col, 3))
    scena.add(new THREE.LineSegments(gl, new THREE.LineBasicMaterial({ visible: false, vertexColors: true, transparent: true, opacity: 0.18, blending: THREE.AdditiveBlending, depthWrite: false }))) // i legami ora sono le strade
    const pos = new Float32Array(corse.length * 3), cc = new Float32Array(corse.length * 3); corse.forEach((q, i) => cc.set([q.c.r, q.c.g, q.c.b], i * 3))
    const gp = new THREE.BufferGeometry(); gp.setAttribute('position', new THREE.BufferAttribute(pos, 3)); gp.setAttribute('color', new THREE.BufferAttribute(cc, 3))
    var lucine = new THREE.Points(gp, new THREE.PointsMaterial({ visible: false, size: 14, map: glow, vertexColors: true, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, sizeAttenuation: false })); scena.add(lucine)
    var muoviLucine = dt => { const P = lucine.geometry.attributes.position; corse.forEach((q, i) => { q.t = (q.t + q.v * dt) % 1; const f = q.t * (q.pts.length - 1), k = Math.floor(f), u = f - k, A = q.pts[k], B = q.pts[Math.min(k + 1, q.pts.length - 1)]; P.setXYZ(i, A.x + (B.x - A.x) * u, A.y + (B.y - A.y) * u, A.z + (B.z - A.z) * u) }); P.needsUpdate = true }
  }

  // ── le tavole colorano il prato sotto di sé: la loro luce cade per terra, morbida ───────────────────────────────
  const macchieSotto = []
  {
    const cv = document.createElement('canvas'); cv.width = cv.height = 64; const g = cv.getContext('2d'), gr = g.createRadialGradient(32, 32, 0, 32, 32, 32); gr.addColorStop(0, '#fff'); gr.addColorStop(1, '#000'); g.fillStyle = gr; g.fillRect(0, 0, 64, 64); const alfa = new THREE.CanvasTexture(cv)
    for (const [, o] of meshDi) { if (!o.m.material?.isMeshBasicMaterial) continue
      const W = (o.w ?? 10) * 1.9, x = o.m.position.x, z = o.m.position.z
      const mm = new THREE.MeshBasicMaterial({ alphaMap: alfa, transparent: true, opacity: 0.6, blending: THREE.AdditiveBlending, depthWrite: false, color: 0x000000 })
      mm.userData.pieno = true; const d = new THREE.Mesh(toppa(x - W / 2, z - W / 2, W, W, 0.3, 6), mm); d.visible = false; d.renderOrder = 2; scena.add(d); macchieSotto.push({ d, src: o.m.material }) }
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
  // ── le strade: tratti tra gli angoli degli isolati. I corsi larghi lastricati col cordolo, le vie, i sentieri di terra
  // battuta; la piazza tutta lastricata. Sotto, il pavimento nero con la griglia degli isolati appena accennata. ─────────
  {
    // il suolo, ovunque: terra battuta calda, e le strade dipinte sopra come una sola forma morbida (una maschera disegnata
    // a pennello tondo lungo le strade: niente pezzi dritti e palle). I sentieri restano terra più chiara, le vie e i corsi
    // sono sampietrini, i corsi più battuti hanno al centro le lastre. Ai margini la terra sfuma nel buio.
    {
      let x0 = Infinity, x1 = -Infinity, z0 = Infinity, z1 = -Infinity
      for (const L of URB.lotti.values()) { const r = (L.r ?? Math.max(L.lx, L.lz) / 2); x0 = Math.min(x0, L.x - r); x1 = Math.max(x1, L.x + r); z0 = Math.min(z0, L.z - r); z1 = Math.max(z1, L.z + r) }
      for (const s of URB.strade) for (const [x, z] of s.pts) { x0 = Math.min(x0, x); x1 = Math.max(x1, x); z0 = Math.min(z0, z); z1 = Math.max(z1, z) }
      const cxS = (x0 + x1) / 2, czS = (z0 + z1) / 2, LS = Math.max(x1 - x0, z1 - z0) + 700, N = LEGGERA ? 1024 : 1536, k = N / LS
      const cv = document.createElement('canvas'); cv.width = cv.height = N; const g = cv.getContext('2d'); g.fillStyle = '#000'; g.fillRect(0, 0, N, N)
      const P = ([x, z]) => [(x - cxS + LS / 2) * k, (z - czS + LS / 2) * k]
      const traccia = (pts, w, col) => { g.strokeStyle = col; g.lineWidth = Math.max(1.5, w * k); g.beginPath(); const p0 = P(pts[0]); g.moveTo(...p0)
        if (pts.length === 2) g.lineTo(...P(pts[1])); else { for (let i = 1; i < pts.length - 1; i++) { const a = P(pts[i]), b = P(pts[i + 1]); g.quadraticCurveTo(a[0], a[1], (a[0] + b[0]) / 2, (a[1] + b[1]) / 2) } g.lineTo(...P(pts[pts.length - 1])) } g.stroke() }
      g.lineJoin = 'round'; g.lineCap = URB.forma === 'muffa' ? 'round' : 'square'; g.globalCompositeOperation = 'lighter'
      const ORD = { sentiero: 0, via: 1, corso: 2 }
      for (const s of URB.strade.slice().sort((a, b) => ORD[a.rango] - ORD[b.rango])) {
        traccia(s.pts, s.largo, s.rango === 'sentiero' ? 'rgb(110,0,0)' : 'rgb(255,0,0)')
        if (s.rango === 'corso') traccia(s.pts, s.largo * 0.45, 'rgb(0,255,0)') }
      const cv2 = document.createElement('canvas'); cv2.width = cv2.height = N; const g2 = cv2.getContext('2d'); g2.filter = 'blur(1.2px)'; g2.drawImage(cv, 0, 0); cv.width = cv.height = 1
      const maschera = new THREE.CanvasTexture(cv2); maschera.minFilter = THREE.LinearFilter; maschera.generateMipmaps = false; LIBERABILI.add(maschera)
      const mat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.96 })
      mat.onBeforeCompile = sh => {
        sh.uniforms.uMask = { value: maschera }; sh.uniforms.uB = { value: new THREE.Vector4(cxS - LS / 2, czS - LS / 2, LS, LS) }; sh.uniforms.uR = { value: new THREE.Vector4(cxS, czS, (LS - 700) * 0.5, LS * 0.48) }
        sh.vertexShader = sh.vertexShader.replace('#include <common>', '#include <common>\nvarying vec3 vMondo;').replace('#include <begin_vertex>', '#include <begin_vertex>\nvMondo = (modelMatrix*vec4(position,1.)).xyz;')
        sh.fragmentShader = sh.fragmentShader.replace('#include <common>', `#include <common>
varying vec3 vMondo; uniform sampler2D uMask; uniform vec4 uB; uniform vec4 uR;
float h21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float n21(vec2 p){ vec2 i = floor(p), f = fract(p); f = f*f*(3.-2.*f); return mix(mix(h21(i), h21(i+vec2(1.,0.)), f.x), mix(h21(i+vec2(0.,1.)), h21(i+1.), f.x), f.y); }
float fbm(vec2 p){ return n21(p)*.55 + n21(p*2.1+7.)*.28 + n21(p*4.3+13.)*.17; }`).replace('#include <color_fragment>', `#include <color_fragment>
        vec4 mk = texture2D(uMask, vec2((vMondo.x - uB.x)/uB.z, (vMondo.z - uB.y)/uB.w));
        float strada = smoothstep(.30, .62, mk.r), sentiero = smoothstep(.14, .36, mk.r) * (1. - strada), corso = smoothstep(.35, .7, mk.g);
        // la terra battuta: calda, a chiazze, con la grana
        float a1 = fbm(vMondo.xz*.012), a2 = fbm(vMondo.xz*.09 + 4.), a3 = n21(vMondo.xz*.9);
        vec3 terra = mix(vec3(.13,.115,.118), vec3(.185,.158,.145), a1) * (.88 + .22*a2) * (.94 + .1*a3);
        terra = mix(terra, terra*vec3(1.05,.92,1.08), smoothstep(.55,.8,fbm(vMondo.xz*.02+9.))*.6);   // un velo lilla
        vec3 battuta = mix(vec3(.25,.215,.19), vec3(.31,.27,.23), a2) * (.92 + .12*a3);
        // i sampietrini: file sfalsate di cubetti, ognuno della sua tinta, le fughe scure
        vec2 q = vMondo.xz / 2.3; q.x += .5*mod(floor(q.y), 2.); vec2 f = fract(q) - .5, id = floor(q); float hh = h21(id);
        float fuga = smoothstep(.36, .48, max(abs(f.x), abs(f.y)));
        vec3 pietra = mix(vec3(.46,.43,.40), vec3(.60,.55,.49), hh) * (1. - .55*fuga) * (.93 + .1*a3);
        // le lastre del corso: grandi, posate a correre
        vec2 l = vMondo.xz / vec2(6.5, 4.2); l.x += .5*mod(floor(l.y), 2.); vec2 fl = fract(l) - .5; float hl = h21(floor(l));
        float fugaL = smoothstep(.45, .49, max(abs(fl.x), abs(fl.y)));
        vec3 lastra = mix(vec3(.62,.58,.52), vec3(.72,.67,.60), hl) * (1. - .45*fugaL);
        vec3 c = mix(terra, battuta, sentiero);
        c = mix(c, pietra, strada); c = mix(c, lastra, corso * strada);
        float orlo = smoothstep(.18, .32, mk.r) * (1. - smoothstep(.32, .5, mk.r)); c *= 1. - .35*orlo;   // il bordo della strada, un poco in ombra
        float lontano = length(vMondo.xz - uR.xy); c *= 1. - smoothstep(uR.z, uR.w, lontano);
        diffuseColor.rgb = pow(c, vec3(2.2));`)
      }
      const suolo = new THREE.Mesh(new THREE.CircleGeometry(LS * 0.49, 96), mat); suolo.rotation.x = -Math.PI / 2; suolo.position.set(cxS, -0.05, czS); suolo.receiveShadow = true; scena.add(suolo)
      scena.background = new THREE.Color(0x06050a)
    }
    // la piazza: un lastricato a riquadri
    const LP = URB.lotti.get('piazza'); if (LP) { const cv = document.createElement('canvas'); cv.width = cv.height = 512; const g = cv.getContext('2d'); g.fillStyle = '#4b4741'; g.fillRect(0, 0, 512, 512)
      for (let y = 0; y < 512; y += 16) for (let x = (y / 16) % 2 ? 8 : 0; x < 512; x += 24) { g.fillStyle = `rgba(${200 + (x * 7 + y * 3) % 40},${190 + (x * 5) % 30},${170 + (y * 11) % 30},${0.05 + ((x * 13 + y * 7) % 9) / 90})`; g.fillRect(x + 1, y + 1, 22, 14) }
      g.strokeStyle = 'rgba(230,222,206,.22)'; g.lineWidth = 3; g.strokeRect(24, 24, 464, 464); g.beginPath(); g.arc(256, 256, 120, 0, 7); g.stroke()
      const tx = new THREE.CanvasTexture(cv); tx.encoding = THREE.sRGBEncoding; const m = new THREE.Mesh(URB.forma === 'muffa' ? new THREE.CircleGeometry(LP.r, 64) : new THREE.PlaneGeometry(LP.lx - 4, LP.lz - 4), new THREE.MeshStandardMaterial({ map: tx, roughness: 0.9 })); m.rotation.x = -Math.PI / 2; m.position.set(LP.x, 0.12, LP.z); m.receiveShadow = true; scena.add(m) }
    // (i nomi dei corsi sono le relazioni tra le parole, scritti più sotto)
  }

  // ── gli abitanti: le figure di Porto Vecchio, vestite coi capi del guardaroba, che camminano per le strade ────
  const gente = []
  // ── la vita: i luoghi dove vivono (piazza, mensa, biblioteca, bottega, officina, osservatorio, archivio, assemblea,
  // guardaroba, fontana, orto, le case, i confini, le strade), ognuno sul suo lotto, e quello che lasciano.
  const VI = D.vita, LG = new Map(), W = l => { const x = X(l.x), z = Z(l.y); return new THREE.Vector3(x, 0, z) }
  const LUOGHI = {}, POSTI = new Map()
  if (VI) for (const l of VI.luoghi) { const L = URB.lotti.get(l.id), v = L ? new THREE.Vector3(L.x, 0, L.z) : W(l); LG.set(l.id, { l, v, L }); LUOGHI[l.id] = v
    if (!['casa', 'strada', 'sala'].includes(l.tipo)) etichetta(`<div class="s" style="letter-spacing:.12em;text-transform:uppercase;opacity:.7">${esc(l.nome)}</div>`, v.clone().add(new THREE.Vector3(0, 14, 0)), l.tipo === 'confine' || l.tipo === 'piazza' && l.id !== 'piazza' ? 420 : 900, 'luogo') }
  else Object.assign(LUOGHI, { piazza: PZ.clone() })
  // ── gli arredi: gli interni veri di Porto Vecchio (interiors.js li compone come nel gioco: lo stesso programma, gli stessi
  // gruppi, gli stessi mobili), senza pareti né tetto, posati sul lotto e girati verso la loro strada. Le cose appese ai
  // muri che non ci sono restano nel gioco. Ogni luogo tiene i suoi posti: le sedie, i banchi da lavoro, i punti liberi. ─────
  if (VI) {
    const MB = new THREE.MeshStandardMaterial({ color: 0xe9e4da, roughness: 0.75 }), MS = new THREE.MeshStandardMaterial({ color: 0x2b2b30, roughness: 0.6 })
    const scatola = (g, w, h, d, x, y, z, m = MB) => { const o = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m); o.position.set(x, y + h / 2, z); o.castShadow = true; g.add(o); return o }
    const cil = (g, r, h, x, y, z, m = MB) => { const o = new THREE.Mesh(new THREE.CylinderGeometry(r, r, h, 16), m); o.position.set(x, y + h / 2, z); g.add(o); return o }
    const griglia = (g, lx, lz) => { const pts = []; for (let t = -lx / 2; t <= lx / 2 + 0.01; t += 4.5) pts.push(t, 0.03, -lz / 2, t, 0.03, lz / 2); for (let t = -lz / 2; t <= lz / 2 + 0.01; t += 4.5) pts.push(-lx / 2, 0.03, t, lx / 2, 0.03, t); const gg = new THREE.BufferGeometry(); gg.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3)); g.add(new THREE.LineSegments(gg, new THREE.LineBasicMaterial({ color: 0xe9e4da, transparent: true, opacity: 0.07, depthWrite: false }))) }
    const vasca = (g, x, z) => { const r0 = new THREE.Mesh(new THREE.TorusGeometry(9, 1.1, 10, 40), MB); r0.rotation.x = -Math.PI / 2; r0.position.set(x, 1.2, z); g.add(r0); const w = new THREE.Mesh(new THREE.CircleGeometry(8.5, 40), new THREE.MeshStandardMaterial({ color: 0x9ec3d6, roughness: 0.15, metalness: 0.2 })); w.rotation.x = -Math.PI / 2; w.position.set(x, 0.9, z); g.add(w); cil(g, 1, 7, x, 0, z) }
    const pergola = (g, x, z) => { for (const [a, b] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) scatola(g, 0.7, 13, 0.7, x + a * 12, 0, z + b * 8, MS); for (let k = -4; k <= 4; k++) scatola(g, 0.5, 0.5, 17, x + k * 2.8, 13, z, MS)
      for (let k = 0; k < 4; k++) for (let j = 0; j < 3; j++) { const o = new THREE.Mesh(new THREE.BoxGeometry(5, 0.5, 9), new THREE.MeshStandardMaterial({ color: 0x5e8a4e, roughness: 1 })); o.position.set(x - 21 + k * 14, 0.25, z + 22 + j * 0); g.add(o) } }
    const M = 4.5, PVI = window.Interior
    // il programma di Porto Vecchio per ogni luogo: che edificio è e quali stanze se ne tengono (bagni, ripostigli e corridoi no)
    const USI = { mensa: ['trattoria', ['sala_trattoria', 'cucina_trattoria']], biblioteca: ['biblioteca', ['lettura', 'scaffali', 'archivio']], bottega: ['tipografia', ['tipografia', 'ufficio']], officina: ['officina', ['officina']],
      osservatorio: ['cinema', ['sala_cinema']], archivio: ['biblioteca', ['scaffali', 'archivio']], assemblea: ['cultura', ['salone_cultura']], guardaroba: ['sartoria', ['sartoria', 'prova']], piazza: ['bar', ['sala_bar']], casa: ['casa', [], [/^camera/, /stanza_fam/, /cameretta/, /stanza_ospiti|salotto|soggiorno/, /cucina/]], confine: ['bottega', ['bottega', 'retro']] }
    const SEDILE = /^(chair|chairCushion|chairDesk|rc_seat|stoolBar|bench|ia_sgabello|ia_poltrona|ia_divano|loungeSofa|ia_panca|ia_sedia)/, BANCO = /banco|tavolo|table|desk|scrivania|ciclostile|macchina|torchio|pv_ponte|cavalletto|leggio|bancone|tipograf|fx_machine|rc_screen|telaio/
    const hashN = s => [...s].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7)
    const fatti = new Set(), attese = [], daUnire = [], bordi = []
    // i pavimenti di Porto Vecchio (interni_arte.js li dipinge: cementine, cotto, graniglia, palladiana, parquet, linoleum…)
    let PAVI = null; const ALIAS = { cementine: 'piastrelle', esagonette: 'cotto', seminato: 'graniglia', palladiana: 'marmo', ceramica70: 'piastrelle_b', quadrotte: 'parquet', mosaico: 'piastrelle', moquette: 'moquette_r', moquette_b: 'moquette_b' }, MATP = new Map()
    const pavimento = nome => { if (!PAVI) { PAVI = new Map(); try { for (const q of window.InterniArte?.materiali?.() ?? []) if (q.gruppo === 'Pavimenti') PAVI.set(q.nome, q) } catch (e) { console.warn('[pavimenti]', e) } }
      const n0 = (nome ?? 'cemento').split('|')[0], k = PAVI.has(n0) ? n0 : ALIAS[n0] ?? (/moquette/.test(n0) ? 'moquette_r' : 'cemento'), q = PAVI.get(k) ?? PAVI.get('cemento'); if (!q) return null
      if (!MATP.has(k)) { const t = new THREE.CanvasTexture(q.c); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.encoding = THREE.sRGBEncoding; t.anisotropy = 4; MATP.set(k, { mat: new THREE.MeshStandardMaterial({ map: t, roughness: 0.82 }), k: q.ppm / q.c.width }); LIBERABILI.add(t) } return MATP.get(k) }
    // tutti i mobili diventano poche geometrie, una per materiale: centinaia di stanze con migliaia di pezzi restano leggere
    // due tinte quasi uguali, due trame quasi uguali (le venature del legno di due sedie) diventano una: così si uniscono davvero
    const colQ = c => c ? [c.r, c.g, c.b].map(v => Math.round(v * 24)).join(',') : '', FIRME = new Map(), tela4 = document.createElement('canvas'); tela4.width = tela4.height = 4
    const firma = t => { if (!t) return ''; if (FIRME.has(t.uuid)) return FIRME.get(t.uuid); let f = t.uuid; const im = t.image
      if (im && (im.tagName === 'CANVAS' || im.width)) try { const g = tela4.getContext('2d', { willReadFrequently: true }); g.clearRect(0, 0, 4, 4); g.drawImage(im, 0, 0, 4, 4); const d = g.getImageData(0, 0, 4, 4).data; let q = ''; for (let i = 0; i < d.length; i += 4) q += (d[i] >> 5) + '' + (d[i + 1] >> 5) + (d[i + 2] >> 5) + (d[i + 3] >> 6); f = (im.width + 'x' + im.height) + ':' + q + ':' + t.repeat.x.toFixed(2) + ',' + t.repeat.y.toFixed(2) } catch (_) {}
      FIRME.set(t.uuid, f); return f }
    const unisci = radici => {
      const per = new Map(), via = []
      for (const r of radici) { r.updateWorldMatrix(true, true); r.traverse(o => { if (!o.isMesh || Array.isArray(o.material) || o.isSkinnedMesh || !o.geometry?.attributes?.position) return; const m = o.material
        const k = [m.type, colQ(m.color), firma(m.map), m.transparent ? m.opacity : 1, m.emissive?.getHexString() ?? '', m.emissiveIntensity ?? '', m.side, m.vertexColors ? 1 : 0, m.roughness ?? '', m.metalness ?? ''].join('|')
        if (!per.has(k)) per.set(k, { m, pezzi: [] }); per.get(k).pezzi.push([o.geometry, o.matrixWorld.clone()]); via.push(o) }) }
      for (const o of via) o.parent?.remove(o)
      const hsl = {}
      for (const { m, pezzi } of per.values()) {
        if (m.color && !m.map) { m.color.getHSL(hsl); if (hsl.s > 0.35) m.color.setHSL(hsl.h, 0.35 + (hsl.s - 0.35) * 0.3, hsl.l) } // i mobili pastello: il colore pieno resta alle persone e alle opere
        // unione con gli indici (i vertici condivisi restano condivisi) e direttamente in array tipizzati: molta meno memoria
        const conUv = !!m.map, conCol = !!m.vertexColors, pz = pezzi.map(([g0, mw]) => { const g1 = g0.clone(); g1.applyMatrix4(mw); if (!g1.attributes.normal) g1.computeVertexNormals(); return g1 })
        let nv = 0, ni = 0; for (const g1 of pz) { nv += g1.attributes.position.count; ni += g1.index ? g1.index.count : g1.attributes.position.count }
        const P = new Float32Array(nv * 3), N = new Float32Array(nv * 3), U = conUv ? new Float32Array(nv * 2) : null, C = conCol ? new Float32Array(nv * 3).fill(1) : null, I = new Uint32Array(ni)
        let ov = 0, oi = 0
        for (const g1 of pz) { const n = g1.attributes.position.count, pa = g1.attributes.position, na = g1.attributes.normal
          for (let i = 0; i < n; i++) { P[(ov + i) * 3] = pa.getX(i); P[(ov + i) * 3 + 1] = pa.getY(i); P[(ov + i) * 3 + 2] = pa.getZ(i); N[(ov + i) * 3] = na.getX(i); N[(ov + i) * 3 + 1] = na.getY(i); N[(ov + i) * 3 + 2] = na.getZ(i) }
          if (U && g1.attributes.uv) { const ua = g1.attributes.uv; for (let i = 0; i < n; i++) { U[(ov + i) * 2] = ua.getX(i); U[(ov + i) * 2 + 1] = ua.getY(i) } }
          if (C && g1.attributes.color?.itemSize >= 3) { const ca = g1.attributes.color; for (let i = 0; i < n; i++) { C[(ov + i) * 3] = ca.getX(i); C[(ov + i) * 3 + 1] = ca.getY(i); C[(ov + i) * 3 + 2] = ca.getZ(i) } }
          if (g1.index) { const ix = g1.index; for (let i = 0; i < ix.count; i++) I[oi + i] = ix.getX(i) + ov; oi += ix.count } else { for (let i = 0; i < n; i++) I[oi + i] = ov + i; oi += n }
          ov += n; g1.dispose() }
        const gg = new THREE.BufferGeometry(); gg.setAttribute('position', new THREE.BufferAttribute(P, 3)); gg.setAttribute('normal', new THREE.BufferAttribute(N, 3)); if (U) gg.setAttribute('uv', new THREE.BufferAttribute(U, 2)); if (C) gg.setAttribute('color', new THREE.BufferAttribute(C, 3)); gg.setIndex(new THREE.BufferAttribute(I, 1))
        if (m.map) LIBERABILI.add(m.map)
        gg.computeBoundingSphere(); gg.computeBoundingBox(); for (const a of [...Object.values(gg.attributes), gg.index]) a.onUpload(function () { this.array = null }) // caricati sulla scheda, i numeri non servono più qui
        const mesh = new THREE.Mesh(gg, m); mesh.castShadow = !m.transparent; mesh.receiveShadow = true; scena.add(mesh) } }
    CARTELLO.passo('arredo le stanze…'); await new Promise(r => setTimeout(r, 30))
    for (const [id, { l, L }] of LG) { if (SENZA.includes('arredi')) break
      if (!L || L.tipo === 'strada' || L.tipo === 'sala' || fatti.has(L)) continue; fatti.add(L)
      const g = new THREE.Group(); g.position.set(L.x, 0, L.z); g.rotation.y = L.ry ?? 0; scena.add(g)
      const posti = { sedie: [], banchi: [], liberi: [], L }; POSTI.set(l.id, posti)
      const loc = (x, z) => { const c = Math.cos(L.ry ?? 0), s = Math.sin(L.ry ?? 0); return [L.x + x * c + z * s, L.z - x * s + z * c] }
      const u = USI[l.tipo === 'piazza' && l.id === 'piazza' ? 'piazza' : l.tipo]
      if (u && PVI && window.Models?.furniture) {
        const SZ = stanzaDi(l), f = SZ?.f
        if (f) {
          const idx = SZ.idx, rs = SZ.rs
          if (rs.length) {
            const { x0, x1, y0, y1, cx, cy } = SZ, h = hashN(l.id)
            const sub = new THREE.Group(); sub.scale.setScalar(M); g.add(sub); daUnire.push(sub)
            // il pavimento vero di ogni stanza (quello che Porto Vecchio le ha dato), col bordo d'inchiostro: un'isola sul suolo
            { const pm = pavimento(SZ.fondo); if (pm) { const r = { x: x0, y: y0, w: x1 - x0, h: y1 - y0 }, gq = new THREE.PlaneGeometry(r.w, r.h), uv = gq.attributes.uv; for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) * r.w * pm.k, uv.getY(i) * r.h * pm.k)
              const fm = new THREE.Mesh(gq, pm.mat); fm.rotation.x = -Math.PI / 2; fm.position.set(0, 0.012, 0); sub.add(fm) } } // sotto tutto il lotto, il pavimento di servizio: il lotto è pieno
            for (const r of rs) { const pm = pavimento(r.floor); if (!pm) continue; const gq = new THREE.PlaneGeometry(r.w, r.h), uv = gq.attributes.uv; for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) * r.w * pm.k, uv.getY(i) * r.h * pm.k)
              const fm = new THREE.Mesh(gq, pm.mat); fm.rotation.x = -Math.PI / 2; fm.position.set(r.x + r.w / 2 - cx, 0.025, r.y + r.h / 2 - cy); sub.add(fm)
              const c4 = [[r.x, r.y], [r.x + r.w, r.y], [r.x + r.w, r.y + r.h], [r.x, r.y + r.h]].map(([a, b]) => loc((a - cx) * M, (b - cy) * M)); for (let i = 0; i < 4; i++) bordi.push(c4[i][0], 0.12, c4[i][1], c4[(i + 1) % 4][0], 0.12, c4[(i + 1) % 4][1]) }
            // le file infinite di poltrone (teatro, cinema) si riducono alle più vicine al palco o allo schermo
            const palco = f.furn.find(o => idx.includes(o.room) && /rc_screen|ia_palco/.test(o.id)), poltrone = f.furn.filter(o => idx.includes(o.room) && o.id === 'rc_seat')
            const tieni = new Set(palco && poltrone.length > 24 ? poltrone.sort((a, b) => Math.hypot(a.x - palco.x, a.y - palco.y) - Math.hypot(b.x - palco.x, b.y - palco.y)).slice(0, 24) : poltrone)
            for (const o of f.furn) { if (o.id === 'rc_seat' && !tieni.has(o)) continue
              if (!idx.includes(o.room) || o.decor || o.taken || /^st_(?!stufa)/.test(o.id)) continue
              if (LEGGERA && (o.onTop || (l.tipo === 'casa' && !/bed|letto|table|tavol|chair|sedia|tappeto|rug/i.test(o.id)))) continue // sul telefono: niente minuterie, le case col minimo
              const px = (o.x - cx) * M, pz = (o.y - cy) * M
              if (SEDILE.test(o.id)) { const [wx, wz] = loc(px, pz); posti.sedie.push({ x: wx, z: wz, yaw: (o.ry || 0) + (L.ry ?? 0), by: null }) }
              else if (BANCO.test(o.id) && !o.onTop && !(o.h > 0.3)) { const fx = Math.sin(o.ry || 0), fz = Math.cos(o.ry || 0), d = 0.9 * M, [wx, wz] = loc(px + fx * d, pz + fz * d); posti.banchi.push({ x: wx, z: wz, yaw: (o.ry || 0) + Math.PI + (L.ry ?? 0), by: null }) }
              attese.push(Models.furniture(o.id).then(m => { if (!m) return; m.position.set(o.x - cx, o.h || 0, o.y - cy); m.rotation.y = o.ry || 0; if (o.tilt) m.rotation.z = o.tilt; if (o.s) m.scale.multiplyScalar(o.s); sub.add(m) }).catch(() => {}))
            }
            const W0 = (x1 - x0) * M, H0 = (y1 - y0) * M
            for (let k = 0; k < 14; k++) { const r = ((h * (k + 3) * 2654435761) >>> 0) / 4294967296, r2 = ((h * (k + 7) * 40503) >>> 0) % 1000 / 1000, [wx, wz] = loc((r - 0.5) * W0 * 0.7, (r2 - 0.5) * H0 * 0.7); posti.liberi.push({ x: wx, z: wz, yaw: r * 6.28, by: null }) }
          }
        }
      }
      if (l.tipo === 'fontana') { vasca(g, 0, 0); for (const a of [0, 1.57, 3.14, 4.71]) { const [wx, wz] = loc(Math.sin(a) * 15, Math.cos(a) * 15); posti.liberi.push({ x: wx, z: wz, yaw: a + Math.PI, by: null }) } griglia(g, 50, 50) }
      if (l.tipo === 'giardino') { pergola(g, 0, -6); for (let k = 0; k < 8; k++) { const [wx, wz] = loc(-21 + (k % 4) * 14, 16 + Math.floor(k / 4) * 12); posti.liberi.push({ x: wx, z: wz, yaw: 0, by: null }) } griglia(g, 70, 70) }
      if (l.tipo === 'piazza' && l.id !== 'piazza' && window.Models?.furniture) { // la piazzetta: due panche che si guardano, una pianta
        for (const [x, z, ry] of [[-9, 0, Math.PI / 2], [9, 0, -Math.PI / 2]]) { attese.push(Models.furniture('bench').then(m => { if (!m) return; m.scale.setScalar(M); m.position.set(x, 0, z); m.rotation.y = ry; g.add(m); daUnire.push(m) }).catch(() => {})); const [wx, wz] = loc(x, z); posti.sedie.push({ x: wx, z: wz, yaw: ry + (L.ry ?? 0), by: null }) }
        attese.push(Models.furniture('pottedPlant').then(m => { if (!m) return; m.scale.setScalar(M * 1.4); m.position.set(0, 0, -10); g.add(m); daUnire.push(m) }).catch(() => {})); griglia(g, 40, 40) }
      if (!posti.liberi.length) for (let k = 0; k < 8; k++) { const a = k * 2.4, [wx, wz] = loc(Math.cos(a) * 12, Math.sin(a) * 12); posti.liberi.push({ x: wx, z: wz, yaw: a, by: null }) }
    }
    { const gg = new THREE.BufferGeometry(); gg.setAttribute('position', new THREE.Float32BufferAttribute(bordi, 3)); scena.add(new THREE.LineSegments(gg, new THREE.LineBasicMaterial({ color: 0x16121b }))) }
    await Promise.all(attese); try { unisci(daUnire) } catch (e) { console.warn('[arredi uniti]', e) }
  }
  if (VI) {
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
      // ogni cosa lasciata sta nel lotto del suo luogo, attorno al centro (a spirale), mai in mezzo alla strada
      const Lt = LG.get(t.luogo)?.L; if (!Lt || Lt.tipo === 'strada') continue
      const n = giro.get(Lt) ?? 0; giro.set(Lt, n + 1); const an = n * 2.39996 + 0.7, R = Math.min(Lt.lx, Lt.lz) / 2 - 8, dd = Math.min(R, 14 + 5 * Math.sqrt(n))
      const x = Lt.x + Math.cos(an) * dd, z = Lt.z + Math.sin(an) * dd, y = 0, k = Math.min(1, Math.log(1 + t.volte) / Math.log(30))
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
  // l'orologio della città: un giorno intero ogni ora, perché ogni cosa abbia il suo tempo; ognuno va dove la
  // sua giornata lo porta a quell'ora, a piedi, per le strade, e quando arriva si siede, lavora, legge, poi si rialza e va
  const OR = { el: document.createElement('div'), giorno: 3600 }
  OR.el.style.cssText = 'position:fixed;top:18px;right:18px;font:12px/1.4 JetBrains Mono,monospace;color:#e8e2d6;opacity:.75;z-index:5;letter-spacing:.08em'; document.body.appendChild(OR.el)
  const oraFissa = +new URLSearchParams(location.search).get('ora') || null
  const oraInizio = +new URLSearchParams(location.search).get('da') || 10, t0Citta = performance.now()
  const oraCitta = () => oraFissa ?? (oraInizio + ((performance.now() - t0Citta) / 1000) / OR.giorno * 24) % 24 // si arriva sempre di mattina, alle dieci
  // che cosa fa il corpo: dalla frase della giornata alla posa di Porto Vecchio
  const POSA = fa => /dorme/.test(fa) ? 'dorme' : /mangia|pranza|cena|colazione|beve|caff/.test(fa) ? 'tavola' : /legge|studia|scrive|annota|ascolta|consulta/.test(fa) ? 'legge'
    : /dipinge|disegna|graffit/.test(fa) ? 'disegna' : /scava|cura|coltiva|semina|innaffia|orto|pianta/.test(fa) ? 'zappa' : /guarda|osserva|cielo|telescop/.test(fa) ? 'osserva'
    : /passeggia|cammina|segue|gira/.test(fa) ? 'gira' : /^sta |parla|discute|chiacchier|aspetta|assemblea|ascolta/.test(fa) ? 'parla' : 'lavora'
  const caso2 = s => { let h = 2166136261; for (const ch of s) h = Math.imul(h ^ ch.charCodeAt(0), 16777619); return () => ((h = Math.imul(h ^ (h >>> 13), 1274126177)) >>> 0) / 4294967296 }
  // il posto dove mettersi in un luogo per fare una cosa: una sedia libera, un banco, un punto libero
  const prendiPosto = (p, luogo, posa) => {
    const P = POSTI.get(luogo); if (!P) { const v = LUOGHI[luogo]; return v ? { x: v.x + (p.rr() - 0.5) * 16, z: v.z + (p.rr() - 0.5) * 16, yaw: p.rr() * 6.28, tipo: 'libero' } : null }
    const vuole = posa === 'tavola' || posa === 'legge' ? ['sedie', 'liberi'] : posa === 'parla' ? (p.rr() < 0.6 ? ['sedie', 'liberi'] : ['liberi', 'sedie']) : posa === 'lavora' ? ['banchi', 'sedie', 'liberi'] : ['liberi', 'sedie']
    for (const k of vuole) { const liberi = P[k].filter(q => !q.by); if (!liberi.length) continue; const q = liberi[Math.floor(p.rr() * liberi.length)]; if (k !== 'liberi') q.by = p.a.id; return Object.assign({ q, tipo: k }, { x: q.x + (k === 'liberi' ? (p.rr() - 0.5) * 6 : 0), z: q.z + (k === 'liberi' ? (p.rr() - 0.5) * 6 : 0), yaw: q.yaw }) }
    return { x: P.L.x + (p.rr() - 0.5) * 20, z: P.L.z + (p.rr() - 0.5) * 20, yaw: p.rr() * 6.28, tipo: 'libero' } }
  const lascia = p => { if (p.posto?.q && p.posto.q.by === p.a.id) p.posto.q.by = null; p.posto = null }
  // la strada da dove si è al luogo: fuori dalla porta, per le vie, dentro dall'altra porta, fino al posto
  const strada = (p, luogo, posto) => {
    const A = URB.lotti.get(p.dove), B = URB.lotti.get(luogo), pts = []
    if (A?.porta && B?.porta) pts.push(...URB.percorso(A, B).map((q, i, v) => i > 0 && i < v.length - 1 ? [q[0] + p.corsia, q[1] + p.corsia] : q))
    else if (B?.porta) { const n = URB.nodoVicino(p.g.position.x, p.g.position.z); if (n != null) pts.push(URB.nodoXZ(n)); pts.push(B.porta.p) }
    pts.push([posto.x, posto.z]); return pts }
  // a spasso: da un angolo all'altro della rete lì vicino
  const spasso = p => { const ang = [...URB.inRete].filter(n => { const [x, z] = URB.nodoXZ(n); return Math.hypot(x - p.g.position.x, z - p.g.position.z) < 320 }); const n = ang[Math.floor(p.rr() * ang.length)], n0 = URB.nodoVicino(p.g.position.x, p.g.position.z); return n == null ? null : (n0 != null && URB.traNodi ? URB.traNodi(n0, n) : [URB.nodoXZ(n)]) }
  try {
    await Promise.all(['Casual', 'Casual_2', 'Casual_Hoodie', 'Formal', 'Worker'].map(f => Models.loadChar(f)))
    CARTELLO.passo('arrivano gli abitanti…')
    for (const a of D.abitanti) { if (SENZA.includes('figure')) break
      const Dp = Personaggi.descrittore({ fem: !!a.fem }, null, { id: a.id }, a.vesti?.length ? a.vesti : undefined)
      const g = Personaggi.figura(Dp, null); if (!g) continue
      g.scale.setScalar(4.5); g.traverse(o => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true } }); scena.add(g)
      const ore = VI?.ab?.[a.id]?.oggi ?? [], rr = caso2(a.id)
      const presa = new THREE.Mesh(new THREE.CylinderGeometry(1.4, 1.4, 2.6, 8), new THREE.MeshBasicMaterial({ visible: false })); presa.position.y = 0.9; g.add(presa); presa.userData = { tipo: 'abitante', a }; cliccabili.push(presa)
      // ognuno ha il suo passo (2,6–3,1 m/s: più svelto del vero, perché la giornata è corta) e la sua corsia sulla strada e il suo ritardo sull'ora
      const p = { g, a, ore, rr, vel: (2.6 + rr() * 0.5) * 4.5, ritardo: rr() * 0.2, corsia: (rr() - 0.5) * 5, via: null, k: 0, dove: null, meta: null, posto: null, posa: null, attesa: 0 }
      const o = p.ore[Math.floor(oraCitta() - p.ritardo + 24) % 24]
      const luogo = o?.luogo && (POSTI.has(o.luogo) || LUOGHI[o.luogo]) ? o.luogo : 'piazza', posa = POSA(o?.fa ?? 'sta')
      p.posto = prendiPosto(p, luogo, posa) ?? { x: PZ.x, z: PZ.z, yaw: 0 }; p.dove = luogo; p.meta = luogo; p.posa = posa
      g.position.set(p.posto.x, 0, p.posto.z); g.rotation.y = p.posto.yaw
      gente.push(p)
    }
  } catch (e) { console.warn('figure di Porto Vecchio non caricate:', e) }
  // ogni fotogramma: chi deve andare altrove si alza e parte; chi cammina segue la sua strada; chi è arrivato fa la sua cosa
  const muoviGente = (h, dt) => {
    for (const p of gente) {
      const o = p.ore[Math.floor(h - p.ritardo + 24) % 24], fa = o?.fa ?? 'sta', posa = POSA(fa)
      let luogo = o?.luogo && (POSTI.has(o.luogo) || LUOGHI[o.luogo] || URB.lotti.has(o.luogo)) ? o.luogo : p.meta
      if (posa === 'gira' && !p.via && (p.attesa -= dt) <= 0) { const v = spasso(p); if (v) { lascia(p); p.via = v; p.k = 0; p.dove = null; p.meta = 'giro'; p.attesa = 6 + p.rr() * 10 } }
      else if (posa !== 'gira' && luogo !== p.meta) { lascia(p); p.posto = prendiPosto(p, luogo, posa); if (p.posto) { p.via = strada(p, luogo, p.posto); p.k = 0; p.meta = luogo; p.dove = null } }
      else if (posa !== p.posa && !p.via && p.dove === luogo) { lascia(p); p.posto = prendiPosto(p, luogo, posa); if (p.posto) { p.via = [[p.posto.x, p.posto.z]]; p.k = 0 } } // nello stesso luogo, un'altra cosa: si sposta di posto
      p.posa = posa
      let speed = 0, anim = null
      if (p.via && !p.via[p.k]) { p.via = p.via.filter(Boolean); if (!p.via.length || p.k >= p.via.length) { p.via = null; if (p.meta !== 'giro') p.dove = p.meta } }
      if (p.via) {
        const [tx, tz] = p.via[p.k], dx = tx - p.g.position.x, dz = tz - p.g.position.z, d = Math.hypot(dx, dz), passo = p.vel * dt
        if (d <= passo + 0.05) { p.g.position.x = tx; p.g.position.z = tz; if (++p.k >= p.via.length) { p.via = null; if (p.meta !== 'giro') p.dove = p.meta } }
        else { p.g.position.x += dx / d * passo; p.g.position.z += dz / d * passo; const ry = Math.atan2(dx, dz); let dr = ry - p.g.rotation.y; dr = Math.atan2(Math.sin(dr), Math.cos(dr)); p.g.rotation.y += dr * Math.min(1, dt * 8) }
        speed = p.vel / 4.5
      } else if (p.posto) {
        let dr = p.posto.yaw - p.g.rotation.y; dr = Math.atan2(Math.sin(dr), Math.cos(dr)); p.g.rotation.y += dr * Math.min(1, dt * 4)
        const seduto = p.posto.tipo === 'sedie', parla = (o?.con?.length ?? 0) > 0
        anim = posa === 'tavola' ? (seduto ? { act: 'tavola' } : { upper: 'beve', talk: parla }) : posa === 'legge' ? (seduto ? { act: 'siede', upper: 'legge' } : { upper: 'legge' })
          : posa === 'parla' ? (seduto ? { act: 'siede', upper: 'parla', talk: true } : { upper: parla ? 'discute' : 'parla', talk: true }) : posa === 'lavora' ? (seduto ? { act: 'tavola' } : { act: 'lavora' })
          : posa === 'disegna' ? { act: 'disegna' } : posa === 'zappa' ? { act: 'zappa' } : posa === 'osserva' ? { act: 'osserva' } : null
      }
      p.g.visible = !(posa === 'dorme' && !p.via && p.dove === p.meta) // chi dorme è in casa
      if (p.g.visible) try { Models.animPerson(p.g, { speed, anim }, dt) } catch (_) { /* resta ferma */ }
    }
  }

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
    return `<div class="meta">parola · ${P.tot} tavole la nominano</div><h2>${esc(P.w)}</h2>${P.vicini?.length ? `<p>Vicini nello spazio (i più simili): ${P.vicini.map(w => `«${esc(w)}»`).join(', ')}.${P.chi ? ` L'ultimo a ritoccare la disposizione: ${esc(nomeDi(P.chi))}.` : ''}</p>` : ''}<p>${aree.length > 1 ? `Sta tra ${aree.slice(0, 3).map(([q, s]) => `«${esc(q.nome)}» (${Math.round(s * 100)}%)`).join(', ')}: per questo è ${P.generale > 0.5 ? 'alta, sopra più aree' : 'sul loro confine'}.` : `È di «${esc(aree[0]?.[0]?.nome ?? '')}».`}</p>${note.length ? `<div class="meta" style="margin-top:14px">cosa ne dicono</div>${note.map(n => `<div class="riga"><b>${esc(nomeDi(n.chi))}</b> ${esc(n.testo)}</div>`).join('')}` : ''}<div class="meta" style="margin-top:14px">le tavole</div>${tav.map(p => `<div class="riga"><a href="giorni/${p.g}.html#${p.id}">${esc(p.t || 'tavola')}</a> <span style="opacity:.5">giorno ${p.g}</span></div>`).join('')}`
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
    const R = D.redazione ?? {}, P = R.attuale, cal = D.calendario, el = document.createElement('div'); el.id = 'redazione'
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

  // ── chi c'è rende il mondo: attorno a ogni abitante (quanto più è all'opera, tanto più largo) le cose si vedono piene;
  // fuori, la città resta un ologramma, una nuvola di punti della stessa luce. Tutti i materiali passano di qui.
  const MAXO = 32, OCCHI = { value: Array.from({ length: MAXO }, () => new THREE.Vector4(0, 0, 0, 0)) }, NOCCHI = { value: 0 }
  const OLO_TESTA = `varying vec3 vMondoG; uniform vec4 uOcchi[${MAXO}]; uniform int uNOcchi;`
  const OLO_FINE = `{
      float vic = 0.;
      for (int i = 0; i < ${MAXO}; i++) { if (i >= uNOcchi) break; vec4 o = uOcchi[i]; float d = length(vMondoG.xz - o.xy); vic = max(vic, 1. - smoothstep(o.z * .55, o.z, d)); }
      if (uNOcchi > 0) { gl_FragColor.rgb *= mix(.05, 1., vic); gl_FragColor.a *= mix(.3, 1., vic); }
    }`
  const ologrammizza = m => {
    if (!m || m.userData.__olo || m.userData.tavola || m.userData.pieno || m.isSpriteMaterial || m.isRawShaderMaterial || m.isLineBasicMaterial || m.isPointsMaterial) return
    if (m.isShaderMaterial) { // i nostri shader (fondi, motivi): stessa regola, cucita a mano
      if (!/void main\s*\(\s*\)\s*\{/.test(m.fragmentShader) || !/void main\s*\(\s*\)\s*\{/.test(m.vertexShader)) return
      m.userData.__olo = true; m.uniforms.uOcchi = OCCHI; m.uniforms.uNOcchi = NOCCHI
      m.vertexShader = OLO_TESTA + '\n' + m.vertexShader.replace(/void main\s*\(\s*\)\s*\{/, 'void main(){ vMondoG = (modelMatrix * vec4(position, 1.)).xyz;')
      const f = m.fragmentShader, i = f.lastIndexOf('}'); m.fragmentShader = f.replace(/(precision [a-z]+ float;\n)?/, x => x + OLO_TESTA + '\n').slice(0, i + OLO_TESTA.length + 1) + OLO_FINE + '\n}'
      m.needsUpdate = true; return }
    m.userData.__olo = true; const prima = m.onBeforeCompile
    m.onBeforeCompile = (sh, ren) => {
      if (prima) prima.call(m, sh, ren)
      sh.uniforms.uOcchi = OCCHI; sh.uniforms.uNOcchi = NOCCHI
      sh.vertexShader = sh.vertexShader.replace('#include <common>', '#include <common>\n' + OLO_TESTA).replace('#include <project_vertex>', '#include <project_vertex>\nvMondoG = (modelMatrix * vec4(transformed, 1.)).xyz;')
      sh.fragmentShader = sh.fragmentShader.replace('#include <common>', '#include <common>\n' + OLO_TESTA).replace('#include <dithering_fragment>', '#include <dithering_fragment>\n' + OLO_FINE)
    }
    const k = m.customProgramCacheKey?.bind(m); m.customProgramCacheKey = () => (k ? k() : '') + '|olo'; m.needsUpdate = true
  }
  // la nuvola di punti (alla Gather): il prato campionato in punti veri sulla superficie, col suo colore, che derivano piano;
  // si vede dove nessuno sta rendendo il mondo, e sparisce nelle bolle degli abitanti
  let NUVOLA = null
  {
    const ph = (x, y) => { const v = Math.sin(x * 127.1 + y * 311.7) * 43758.5453; return v - Math.floor(v) }
    const pn = (x, y) => { const i = Math.floor(x), j = Math.floor(y); let f = x - i, g = y - j; f = f * f * (3 - 2 * f); g = g * g * (3 - 2 * g); const a = ph(i, j), b = ph(i + 1, j), c = ph(i, j + 1), d = ph(i + 1, j + 1); return (a + (b - a) * f) + ((c + (d - c) * f) - (a + (b - a) * f)) * g }
    const fbm = (x, y) => pn(x, y) * .55 + pn(x * 2.1 + 7, y * 2.1 + 7) * .28 + pn(x * 4.3 + 13, y * 4.3 + 13) * .17
    const R0 = Math.max(LX, LZ) * 0.9, passo = Math.max(1.6, R0 * 2 / 620), riga = passo * 1.7, pos = [], col = [], seme = []
    for (let z = -R0; z < R0; z += riga) { const ond = (pn(z * 0.05, 3.1) - 0.5) * riga * 2; for (let x = -R0; x < R0; x += passo * (0.7 + ph(x, z) * 0.6)) {
      const jx = x + (ph(x, z) - 0.5) * passo * 0.5, jz = z + ond + (pn(x * 0.04, z * 0.04) - 0.5) * riga * 1.2 + (ph(z, x) - 0.5) * riga * 0.25, d = Math.hypot(jx, jz); if (d > R0 || ph(jx * 1.3, jz * 0.7) < 0.12) continue
      const y = altezza(jx, jz); pos.push(jx, y + 0.6, jz)
      const m1 = fbm(jx * .010, jz * .010), m2 = fbm(jx * .023 + 9, jz * .023 + 9), t = Math.min(1, Math.max(0, (y - 1) / 21))
      let r = .30 + .22 * t, g = .62 + .16 * t, b = .30 + .06 * t
      if (m1 > .52) { const k = Math.min(1, (m1 - .52) / .26) * .55; r += (.72 - r) * k; g += (.80 - g) * k; b += (.42 - b) * k }
      if (m2 > .55) { const k = Math.min(1, (m2 - .55) / .27) * .35; r += (.78 - r) * k; g += (.62 - g) * k; b += (.62 - b) * k }
      const n = fbm(jx * .009 + 3, jz * .009 + 3); if (n > .66 && y < 20) { const k = Math.min(1, (n - .66) / .14); r += (.95 - r) * k; g += (.72 - g) * k; b += (.64 - b) * k }
      const fuori = 1 - Math.min(1, Math.max(0, (d - R0 * 0.55) / (R0 * 0.45))), lu = 0.75 + 0.5 * ph(jx * 2.7, jz * 1.9); col.push(r * fuori * lu, g * fuori * lu, b * fuori * lu); seme.push(ph(jz * 3, jx * 7))
    } }
    const geo = new THREE.BufferGeometry(); geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); geo.setAttribute('color', new THREE.Float32BufferAttribute(col, 3)); geo.setAttribute('seme', new THREE.Float32BufferAttribute(seme, 1))
    NUVOLA = new THREE.ShaderMaterial({ transparent: true, depthWrite: false, uniforms: { uOcchi: OCCHI, uNOcchi: NOCCHI, uT: { value: 0 }, uPx: { value: R.getPixelRatio() } },
      vertexShader: `attribute float seme; varying vec3 vC; varying float vA; uniform vec4 uOcchi[${MAXO}]; uniform int uNOcchi; uniform float uT; uniform float uPx;
        void main(){ vec3 p = position; float t = uT * .35 + seme * 6.283;
          p += vec3(sin(t) * .35, (sin(t * 1.3 + seme * 9.) * .5 + .5) * .5, cos(t * .8) * .35);       // la deriva, appena
          float vic = 0.; for (int i = 0; i < ${MAXO}; i++) { if (i >= uNOcchi) break; vec4 o = uOcchi[i]; float d = length(p.xz - o.xy); vic = max(vic, 1. - smoothstep(o.z * .45, o.z * .95, d)); }
          vC = color; vA = 1. - vic; gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.); gl_PointSize = (.9 + seme * .9) * uPx; }`,
      fragmentShader: `varying vec3 vC; varying float vA; void main(){ vec2 c = gl_PointCoord - .5; float r = length(c); if (r > .5) discard; gl_FragColor = vec4(vC * 1.35, vA * .9); }`,
      vertexColors: true })
    NUVOLA = null // la nuvola di punti è stata provata e messa da parte: rendeva la città illeggibile
  }
  const figure = new Set(gente.map(p => p.g)); for (const [, o] of meshDi) if (o.cornice?.material) o.cornice.material.userData.pieno = true
  // (l'ologramma fuori dalle bolle è spento: la città resta tutta piena)
  const aggiornaOcchi = () => { NOCCHI.value = 0 } // niente pozze di luce: gli abitanti si vedono per quello che sono

  // ── l'inchiostro: la scena si disegna su una tela, poi un passaggio a schermo intero traccia i contorni dove la profondità
  // salta (i mobili, le figure, le tavole contro il suolo), scurisce appena gli angoli e aggiunge un filo di grana ───────────
  const POST = LEGGERA || new URLSearchParams(location.search).get('post') === '0' ? null : (() => {
    try {
      const pr = R.getPixelRatio(), RT = new THREE.WebGLRenderTarget(innerWidth * pr, innerHeight * pr, { depthBuffer: true, encoding: THREE.sRGBEncoding })
      RT.isXRRenderTarget = true // così ogni materiale fa da sé tono e colore come quando disegna sullo schermo (le figure restano coi loro colori)
      RT.depthTexture = new THREE.DepthTexture(innerWidth * pr, innerHeight * pr); RT.depthTexture.type = THREE.UnsignedIntType
      const mat = new THREE.ShaderMaterial({ uniforms: { tC: { value: RT.texture }, tD: { value: RT.depthTexture }, px: { value: new THREE.Vector2(1 / (innerWidth * pr), 1 / (innerHeight * pr)) }, scala: { value: 12000 }, soglia: { value: 2 }, forza: { value: 0.85 }, t: { value: 0 }, spessore: { value: pr > 1.4 ? 1.5 : 1 } },
        vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0., 1.); }',
        fragmentShader: `uniform sampler2D tC; uniform sampler2D tD; uniform vec2 px; uniform float scala; uniform float soglia; uniform float forza; uniform float t; uniform float spessore; varying vec2 vUv;
          float D(vec2 u){ return texture2D(tD, u).x * scala; }
          float h(vec2 p){ return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
          void main(){
            vec3 c = texture2D(tC, vUv).rgb; float d = D(vUv), e = 0.;
            vec2 o = px * spessore;
            e = max(e, abs(D(vUv + vec2(o.x, 0.)) - d)); e = max(e, abs(D(vUv - vec2(o.x, 0.)) - d));
            e = max(e, abs(D(vUv + vec2(0., o.y)) - d)); e = max(e, abs(D(vUv - vec2(0., o.y)) - d));
            float ink = smoothstep(soglia, soglia * 2.5, e) * step(d, scala * .9999);
            c = mix(c, vec3(.0075, .0055, .011), ink * forza);
            vec2 q = vUv - .5; c *= 1. - .22 * smoothstep(.25, .85, dot(q, q) * 1.6);   // la vignettatura
            c += (h(vUv * 917. + t) - .5) * .012;                                        // la grana
            gl_FragColor = vec4(c, 1.); // la tela ha già i colori dello schermo: non si ricodifica
          }`, depthTest: false, depthWrite: false, toneMapped: false })
      const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), mat), sc = new THREE.Scene(), oc = new THREE.Camera(); quad.frustumCulled = false; sc.add(quad)
      const misura = () => { const pr2 = R.getPixelRatio(); RT.setSize(innerWidth * pr2, innerHeight * pr2); mat.uniforms.px.value.set(1 / (innerWidth * pr2), 1 / (innerHeight * pr2)) }
      addEventListener('resize', misura)
      return { disegna: () => {
        // la soglia in unità del mondo: proporzionale a quanto mondo copre un pixel (così da lontano non si annerisce tutto)
        mat.uniforms.soglia.value = Math.max(0.6, (O.dist / innerHeight) * 5.5); mat.uniforms.forza.value = Math.max(0.35, Math.min(0.85, 1.1 - O.dist / 1400)); mat.uniforms.t.value = (performance.now() / 1000) % 10
        R.setRenderTarget(RT); R.render(scena, cam); R.setRenderTarget(null); R.render(sc, oc) } }
    } catch (e) { console.warn('[inchiostro]', e); return null }
  })()
  const v3 = new THREE.Vector3(); let prima = performance.now()
  O.t.set(0, 0, 0); O.dist = Math.max(LX, LZ) * 0.95
  function giro2() {
    const ora = performance.now(), dt = Math.min(0.05, (ora - prima) / 1000); prima = ora
    if (volo) { const k = Math.min(1, (ora - volo.t0) / 1500), e = k * k * (3 - 2 * k); O.t.lerpVectors(volo.da.t, volo.a.t, e); O.dist = volo.da.dist + (volo.a.dist - volo.da.dist) * e; O.pitch = volo.da.pitch + (volo.a.pitch - volo.da.pitch) * e; O.yaw = volo.da.yaw + (volo.a.yaw - volo.da.yaw) * e; if (k >= 1) volo = null }
    metti()
    aggiornaOcchi(); if (NUVOLA) NUVOLA.uniforms.uT.value = ora / 1000; /* le lucine sui fili sono spente: sembravano gente che corre */
    for (const q of macchieSotto) if (!q.d.material.map && q.src.map) { q.d.material.map = q.src.map; q.d.material.color.set(0x9a9a9a); q.d.material.needsUpdate = true }
    { const h = oraCitta(); luce(h); sole.position.add(O.t); sole.target.position.copy(O.t); { const e = Math.min(1500, Math.max(160, O.dist * 0.8)), sc0 = sole.shadow.camera; if (Math.abs(sc0.right - e) > 1) { sc0.left = -e; sc0.right = e; sc0.top = e; sc0.bottom = -e; sc0.updateProjectionMatrix() } } OR.el.textContent = `ore ${String(Math.floor(h)).padStart(2, '0')}:${String(Math.floor((h % 1) * 60)).padStart(2, '0')} · giornata ${D.giorno ?? ''}`
      muoviGente(h, dt) }
    { const vic = Math.max(0, Math.min(1, 1 - (O.dist - 150) / 350)); for (const m of cartMat) m.opacity = 0.9 * vic } // i cartellini si leggono solo da vicino
    const tt = ora / 1000; for (const m of fondiVivi) m.uniforms.u_time.value = tt; for (const m of ologrammi) m.uniforms.t.value = tt
    { const ry = Math.round((O.yaw - Math.PI / 4) / (Math.PI / 2)) * (Math.PI / 2); for (const m of scritte) m.rotation.y = ry }
    if (POST) POST.disegna(); else R.render(scena, cam)
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
  window.__dbg = id => { const L = URB.lotti.get(id), P = POSTI.get(id); return JSON.stringify({ L: L && { x: L.x, z: L.z, tipo: L.tipo, ry: L.ry, mezza: L.mezza }, posti: P && { s: P.sedie.length, b: P.banchi.length, l: P.liberi.length }, qui: gente.filter(p => p.meta === id).map(p => [p.a.id, p.posa, Math.round(p.g.position.x), Math.round(p.g.position.z), p.g.visible, !!p.via]) }) }
  window.__muovi = muoviGente
  window.__vai = (id, d = 260) => { const L = URB.lotti.get(id); if (L) vola(new THREE.Vector3(L.x, 0, L.z), d, 0.615) }; window.__gente = () => gente.map(p => [p.a.id, p.meta, p.posa, !!p.via, p.posto?.tipo])
  // tutte le trame vanno sulla scheda grafica subito; poi le tele che non cambieranno più si svuotano (centinaia di MB in meno:
  // sul telefono e nel browser di Instagram è la differenza tra una pagina che si apre e una che si chiude da sola)
  try { const tutte = new Set(); scena.traverse(o => { for (const m of [].concat(o.material ?? [])) for (const k of ['map', 'emissiveMap', 'alphaMap']) if (m?.[k]?.isTexture) tutte.add(m[k]) })
    for (const t of tutte) R.initTexture(t)
    for (const t of LIBERABILI) { const c = t.image; if (c && c.tagName === 'CANVAS' && tutte.has(t)) { c.width = c.height = 1 } } } catch (e) { console.warn('[memoria]', e) }
  window.__R = R; window.__scena = scena; window.__citta = true; CARTELLO.via()
})().catch(e => { console.error(e); window.__cittaErrore = String(e); CARTELLO.errore(e) })
