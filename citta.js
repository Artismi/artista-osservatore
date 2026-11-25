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
  // il diorama comprende solo quello che gli abitanti hanno costruito o coltivato (più un margine): cresce con loro
  const G48 = 48, pts0 = [[D.piazza.x, D.piazza.y], ...D.punti.map(p => [p.x, p.y]), ...costr.filter(c => c.pos?.x != null).map(c => [c.pos.x, c.pos.y]), ...(K.coltivato ?? []).map(k => [((k % G48) + 0.5) / G48 * 1000, (Math.floor(k / G48) + 0.5) / G48 * 1000])]
  const bx0 = Math.max(0, Math.min(...pts0.map(p => p[0])) - 70), bx1 = Math.min(1000, Math.max(...pts0.map(p => p[0])) + 70), by0 = Math.max(0, Math.min(...pts0.map(p => p[1])) - 70), by1 = Math.min(1000, Math.max(...pts0.map(p => p[1])) + 70)
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
  scena.add(new THREE.HemisphereLight(0xc8d2e0, 0x2a2622, 0.5))
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

  // ── il terreno: le colline sono dove la conoscenza si accumula (densità delle tavole, pesata con l'interesse) ──
  const NG = 64, dens = new Float32Array(NG * NG)
  for (const p of D.punti) { const gi = p.x / 1000 * (NG - 1), gj = p.y / 1000 * (NG - 1); for (let j = Math.max(0, Math.floor(gj - 4)); j <= Math.min(NG - 1, Math.ceil(gj + 4)); j++) for (let i = Math.max(0, Math.floor(gi - 4)); i <= Math.min(NG - 1, Math.ceil(gi + 4)); i++) { const d2 = (i - gi) ** 2 + (j - gj) ** 2; dens[j * NG + i] += (0.4 + p.i) * Math.exp(-d2 / 4.5) } }
  let dmax = 0; for (const v of dens) dmax = Math.max(dmax, v)
  const rum = (x, z) => Math.sin(x * 0.011) * Math.cos(z * 0.009) * 5 + Math.sin(x * 0.031 + z * 0.023) * 2.2
  // le terrazze del palazzo della memoria: ogni sala è un ripiano, più basso se il suo sapere è più antico
  const terrazze = [] // le sale ora poggiano su un basamento proprio: il suolo resta piano
  const morbido = (a, b, t) => { t = Math.min(1, Math.max(0, (t - a) / (b - a))); return t * t * (3 - 2 * t) }
  function suoloNudo(x, z) {
    const tx = x / S + cxT, ty = z / S + cyT, u = tx / 1000 * (NG - 1), v = ty / 1000 * (NG - 1)
    const i = Math.max(0, Math.min(NG - 2, Math.floor(u))), j = Math.max(0, Math.min(NG - 2, Math.floor(v))), fu = Math.min(1, Math.max(0, u - i)), fv = Math.min(1, Math.max(0, v - j)), a = (ii, jj) => dens[jj * NG + ii]
    const d = (a(i, j) * (1 - fu) + a(i + 1, j) * fu) * (1 - fv) + (a(i, j + 1) * (1 - fu) + a(i + 1, j + 1) * fu) * fv
    return Math.pow(d / dmax, 0.7) * 12 + rum(x, z) * 0.25 + 4
  }
  function altezza(x, z) {
    // la superficie non finisce: fuori da quello che hanno costruito torna lentamente una pianura che ondeggia
    const fuori = Math.max(0, Math.abs(x) - LX / 2, Math.abs(z) - LZ / 2), lontano = Math.min(1, fuori / 400)
    let h = suoloNudo(x, z) * (1 - lontano) + (rum(x * 0.6, z * 0.6) * 1.6 + 8) * lontano
    for (const t of terrazze) { const d = Math.hypot(x - t.x, z - t.z); if (d < t.r + 8) { const k = 1 - morbido(t.r, t.r + 8, d); h = h * (1 - k) + t.h * k } }
    return h
  }
  // le mappe del giardino e delle strade, dipinte su due tele che il terreno legge
  const TX = 1024
  const tGiardino = document.createElement('canvas'); tGiardino.width = tGiardino.height = TX
  { const g = tGiardino.getContext('2d'), G = 48, c = TX / G; g.fillStyle = '#000'; g.fillRect(0, 0, TX, TX); g.filter = 'blur(10px)'; g.fillStyle = '#fff'; for (const k of K.coltivato ?? []) { const i = k % G, j = Math.floor(k / G); g.beginPath(); g.arc((i + 0.5) * c, (j + 0.5) * c, c * 0.85, 0, 7); g.fill() } }
  const nodoXY = id => { if (id === 'piazza') return [D.piazza.x, D.piazza.y]; const c = costr.find(x => x.id === id); return c?.pos?.x != null ? [c.pos.x, c.pos.y] : null }
  const strade = costr.filter(c => c.tipo === 'strada').map(c => ({ c, a: nodoXY(c.a), b: nodoXY(c.b) })).filter(s => s.a && s.b)
  const curvaStrada = s => { const [ax, ay] = s.a, [bx, by] = s.b, mx = (ax + bx) / 2 + (ay - by) * 0.12, my = (ay + by) / 2 + (bx - ax) * 0.12; const pts = []; for (let k = 0; k <= 40; k++) { const t = k / 40, x = (1 - t) ** 2 * ax + 2 * (1 - t) * t * mx + t * t * bx, y = (1 - t) ** 2 * ay + 2 * (1 - t) * t * my + t * t * by; pts.push([x, y]) } return pts }
  const tStrade = document.createElement('canvas'); tStrade.width = tStrade.height = TX
  { const g = tStrade.getContext('2d'); g.fillStyle = '#000'; g.fillRect(0, 0, TX, TX); g.strokeStyle = '#fff'; g.lineCap = 'round'; g.lineJoin = 'round'; for (const s of strade) { g.lineWidth = 3 + Math.min(6, Math.log(1 + (s.c.dati?.fili ?? 1))); g.beginPath(); curvaStrada(s).forEach(([x, y], k) => k ? g.lineTo(x / 1000 * TX, y / 1000 * TX) : g.moveTo(x / 1000 * TX, y / 1000 * TX)); g.stroke() } }
  {
    const AMPIO = LATO + 2400, geo = new THREE.PlaneGeometry(AMPIO, AMPIO, 520, 520); geo.rotateX(-Math.PI / 2)
    const pos = geo.attributes.position; for (let i = 0; i < pos.count; i++) pos.setY(i, altezza(pos.getX(i), pos.getZ(i))); geo.computeVertexNormals()
    const mat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.95 })
    var occhio = { value: new THREE.Vector3() }
    const gT = new THREE.CanvasTexture(tGiardino), sT = new THREE.CanvasTexture(tStrade)
    mat.onBeforeCompile = sh => {
      sh.uniforms.giardino = { value: gT }; sh.uniforms.strade = { value: sT }; sh.uniforms.occhio = occhio
      sh.vertexShader = sh.vertexShader.replace('#include <common>', '#include <common>\nvarying vec3 vMondo;').replace('#include <begin_vertex>', '#include <begin_vertex>\nvMondo = (modelMatrix*vec4(position,1.)).xyz;')
      sh.fragmentShader = sh.fragmentShader.replace('#include <common>', `#include <common>
        varying vec3 vMondo; uniform sampler2D giardino; uniform sampler2D strade; uniform vec3 occhio;
        float hh(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453); }
        float nn(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.-2.*f); return mix(mix(hh(i),hh(i+vec2(1,0)),f.x),mix(hh(i+vec2(0,1)),hh(i+vec2(1,1)),f.x),f.y); }`)
        .replace('#include <color_fragment>', `#include <color_fragment>
        vec2 uv = vec2((vMondo.x / ${S.toFixed(3)} + ${cxT.toFixed(2)}) / 1000., (vMondo.z / ${S.toFixed(3)} + ${cyT.toFixed(2)}) / 1000.);
        float dentro = step(0., uv.x) * step(uv.x, 1.) * step(0., uv.y) * step(uv.y, 1.);
        float h = vMondo.y, gr = texture2D(giardino, uv).r * dentro, st = texture2D(strade, uv).r * dentro;
        float n = nn(vMondo.xz*0.05)*.6 + nn(vMondo.xz*0.2)*.4;
        // la terra nuda: strati di roccia e argilla secondo la quota (le curve di livello di un modello geologico)
        vec3 terra = mix(vec3(.60,.58,.55), vec3(.68,.66,.62), smoothstep(3., 16., h));
        terra *= .97 + .06*n; terra = mix(terra, terra*.93, smoothstep(.47,.5, abs(fract(h/2.)-.5)));
        float ripido = 1. - normalize(vNormal).y; terra = mix(terra, terra*.82, smoothstep(.25,.6,ripido)); // i tagli delle terrazze: gli strati
        // il giardino: verdi diversi, più fitto dove è cresciuto da più tempo
        vec3 verde = mix(vec3(.15,.25,.13), vec3(.26,.36,.17), n); verde = mix(verde, vec3(.55,.5,.3), smoothstep(.8,1.,nn(vMondo.xz*.03)) * .35);
        vec3 c = mix(terra, mix(terra, vec3(.52,.58,.46), .55), smoothstep(.25,.6,gr));
        c = mix(c, c*1.06, smoothstep(.25,.65,st));
        diffuseColor.rgb = c;`)
        // l'orizzonte non c'è: la superficie sfuma nel buio attorno a dove guardi, così sembra continuare per sempre
        .replace('#include <fog_fragment>', `#include <fog_fragment>
        gl_FragColor.rgb = mix(gl_FragColor.rgb, vec3(.102,.110,.125), smoothstep(occhio.z * .55, occhio.z * 1.25, length(vMondo.xz - occhio.xy)));`)
    }
    const terra = new THREE.Mesh(geo, mat); terra.receiveShadow = true; scena.add(terra)
    scena.background = new THREE.Color(0x1a1c20)
  }

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

  // ── le sale: radure di tavole in piedi, disposte dal curatore (parete, arco, griglia, sospese, colonna, a terra) ──
  const carica = new THREE.TextureLoader(), cliccabili = [], etichette = [], strato = document.getElementById('etichette')
  const etichetta = (html, p, lontano, cls = '') => { const el = document.createElement('div'); el.className = 'et ' + cls; el.innerHTML = html; strato.appendChild(el); const e = { el, p, lontano }; etichette.push(e); return e }
  const tavolaMat = id => { const m = new THREE.MeshStandardMaterial({ color: 0x666666, roughness: 0.65, side: THREE.DoubleSide }); carica.load(`img/${id}.jpg`, t => { t.encoding = THREE.sRGBEncoding; t.anisotropy = 8; m.map = t; m.color.set(0xffffff); m.needsUpdate = true }); return m }
  const perQ = new Map(); for (const p of D.punti.filter(p => p.img)) { if (!perQ.has(p.q)) perQ.set(p.q, []); perQ.get(p.q).push(p) }
  const quart = new Map(D.quartieri.map(q => [q.id, q]))
  const sale = []
  // ogni sala sta in squadra con gli assi del disegno: le tavole stese come una pianta, in parete, in colonna o a strati sospesi
  const ancoraDi = new Map(), posSala = new Map()
  { const cs = costr.filter(c => c.tipo === 'capsula' && c.pos?.x != null), P = cs.map(c => ({ c, x: X(c.pos.x), z: Z(c.pos.y), r: 30 + Math.sqrt(Math.min(12, (quart.get(c.q)?.sala?.quante ?? 8) + (c.moduli ?? 1))) * 14 }))
    for (let it = 0; it < 80; it++) for (let i = 0; i < P.length; i++) for (let j = i + 1; j < P.length; j++) { const a = P[i], b = P[j], dx = b.x - a.x, dz = b.z - a.z, d = Math.hypot(dx, dz) || 1, m = a.r + b.r + 8; if (d < m) { const k = (m - d) / 2 / d; a.x -= dx * k; a.z -= dz * k; b.x += dx * k; b.z += dz * k } }
    for (const p of P) posSala.set(p.c.id, p) }
  for (const c of costr.filter(c => c.tipo === 'capsula' && c.pos?.x != null)) {
    const q = quart.get(c.q), sala = q?.sala ?? { disposizione: 'griglia', quante: 8 }, rovina = c.stato === 'rovina'
    const cx = posSala.get(c.id).x, cz = posSala.get(c.id).z, cy = altezza(cx, cz), centro = new THREE.Vector3(cx, cy, cz)
    const v0 = Math.atan2(PZ.x - cx, PZ.z - cz), ax = Math.abs(Math.sin(v0)) > Math.abs(Math.cos(v0)) ? Math.PI / 2 : 0 // guarda verso la piazza, ma ad angolo retto
    const tav = (perQ.get(c.q) ?? []).sort((a, b) => b.i - a.i).slice(0, Math.min(12, Math.max(4, (sala.quante ?? 8) + (c.moduli ?? 1) - 1)))
    const h = 22, w = 17.6, gap = 4, d = sala.disposizione, n = tav.length
    const forma = d === 'parete' ? 'parete' : d === 'colonna' ? 'colonna' : d === 'sospese' ? 'strati' : 'pianta'
    const col = forma === 'pianta' ? Math.ceil(Math.sqrt(n)) : forma === 'parete' ? n : forma === 'colonna' ? Math.ceil(n / 2) : 3, righe = Math.ceil(n / col)
    const L = col * (w + gap) + 6, P = forma === 'pianta' ? righe * (h + gap) + 6 : forma === 'strati' ? h + 10 : 12
    const cs = Math.cos(ax), sn = Math.sin(ax), aMondo = (lx, lz) => [cx + lx * cs + lz * sn, cz - lx * sn + lz * cs]
    // il basamento: un foglio chiaro, il suolo della sala
    const base = new THREE.Mesh(new THREE.BoxGeometry(L, 1.4, P), new THREE.MeshStandardMaterial({ color: rovina ? 0xb9b3a8 : 0xefebe3, roughness: 0.9 })); base.position.set(cx, cy + 0.7, cz); base.rotation.y = ax; base.receiveShadow = true; scena.add(base)
    tav.forEach((p, i) => {
      const ci = i % col, ri = Math.floor(i / col), lx = (ci - (col - 1) / 2) * (w + gap)
      const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), tavolaMat(p.id)); let anc
      if (forma === 'pianta' || forma === 'strati') {
        const lz = forma === 'pianta' ? (ri - (righe - 1) / 2) * (h + gap) : 0, su = forma === 'strati' ? 8 + ri * 18 : 0, [x, z] = aMondo(lx, lz)
        m.rotation.set(-Math.PI / 2, 0, ax); m.position.set(x, cy + 1.5 + su, z); if (su) m.castShadow = true; anc = new THREE.Vector3(x, cy + 1.6 + su, z)
      } else {
        const su = forma === 'colonna' ? ri * (h + gap) : 0, [x, z] = aMondo(lx, 0)
        m.rotation.y = ax; m.position.set(x, cy + 1.4 + 1 + su + h / 2, z); m.castShadow = true; anc = new THREE.Vector3(x, cy + 1.5, z)
        const retro = new THREE.Mesh(new THREE.PlaneGeometry(w + 0.8, h + 0.8), new THREE.MeshStandardMaterial({ color: 0x1a1a1c, roughness: 0.6, side: THREE.DoubleSide })); retro.position.copy(m.position); retro.rotation.copy(m.rotation); retro.translateZ(-0.2); retro.castShadow = true; scena.add(retro)
      }
      if (rovina) m.rotation.z += (caso() - 0.5) * 0.15
      scena.add(m); m.userData = { tipo: 'tavola', p }; cliccabili.push(m); ancoraDi.set(p.id, anc)
    })
    const nomeCur = sala.curatore ? nomeDi(sala.curatore) : null
    const alto = forma === 'colonna' ? righe * (h + gap) + 10 : forma === 'parete' ? h + 10 : forma === 'strati' ? 8 + righe * 18 + 6 : 8
    const e = etichetta(`<div class="t">${esc(c.nome)}</div><div class="s">${q ? `${q.n} tavole` : ''}${rovina ? ' · abbandonata' : ''}${nomeCur ? ` · curata ${esc(da(nomeCur))}` : ''}</div>`, centro.clone().add(new THREE.Vector3(0, alto, 0)), 1500, 'sala')
    const rec = { c, q, sala, centro, verso: ax, n }
    e.el.onclick = () => vaiA(rec)
    sale.push(rec)
  }

  // ── la rete: ogni tavola è un punto sul suolo, ogni legame un filo; tra le sale, archi che dicono cosa le lega ──
  {
    const pts = D.punti, tutti = D.fili ?? [], col = new THREE.Color(0x2a2724)
    const lung = f => Math.hypot(pts[f[0]].x - pts[f[1]].x, pts[f[0]].y - pts[f[1]].y), ord = tutti.filter(f => pts[f[0]] && pts[f[1]]).map(lung).sort((a, b) => a - b), corto = ord[Math.floor(ord.length * 0.6)] ?? 1e9
    const migliori = new Map(); for (const f of tutti) for (const k of [f[0], f[1]]) { const l = migliori.get(k) ?? []; l.push(f); migliori.set(k, l) }
    const scelti = new Set(); for (const l of migliori.values()) for (const f of l.sort((a, b) => b[2] - a[2]).slice(0, 2)) scelti.add(f)
    const fili = tutti.filter(f => scelti.has(f) && pts[f[0]] && pts[f[1]] && lung(f) <= corto)
    const pos = new Float32Array(pts.length * 3); pts.forEach((p, i) => { const x = X(p.x), z = Z(p.y); pos.set([x, altezza(x, z) + 0.4, z], i * 3) })
    const gp = new THREE.BufferGeometry(); gp.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    scena.add(new THREE.Points(gp, new THREE.PointsMaterial({ color: col, size: 2.2, sizeAttenuation: false, transparent: true, opacity: 0.55 })))
    const smax = Math.max(1e-6, ...fili.map(f => f[2])), lin = [], alfa = []
    for (const [a, b, w] of fili) { if (!pts[a] || !pts[b]) continue; lin.push(...pos.subarray(a * 3, a * 3 + 3), ...pos.subarray(b * 3, b * 3 + 3)); const k = 0.07 + 0.28 * w / smax; alfa.push(k, k) }
    const gl = new THREE.BufferGeometry(); gl.setAttribute('position', new THREE.Float32BufferAttribute(lin, 3)); gl.setAttribute('alfa', new THREE.Float32BufferAttribute(alfa, 1))
    const ml = new THREE.ShaderMaterial({ transparent: true, depthWrite: false, vertexShader: 'attribute float alfa; varying float vA; void main(){ vA = alfa; gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.); }', fragmentShader: 'varying float vA; void main(){ gl_FragColor = vec4(.16,.15,.14, vA); }' })
    scena.add(new THREE.LineSegments(gl, ml))
    // tra le sale: quanto si toccano i loro quartieri (la somma dei fili che li attraversano)
    const tra = new Map(); for (const [a, b, w] of tutti) { const qa = pts[a]?.q, qb = pts[b]?.q; if (qa == null || qb == null || qa === qb) continue; const k = qa < qb ? qa + '|' + qb : qb + '|' + qa; tra.set(k, (tra.get(k) ?? 0) + w) }
    const salaDi = new Map(sale.map(r => [r.c.q, r])), visti = new Map(), tmax = Math.max(1e-6, ...tra.values())
    const archi = [...tra].sort((a, b) => b[1] - a[1]).filter(([k]) => { const [qa, qb] = k.split('|').map(Number); if (!salaDi.has(qa) || !salaDi.has(qb)) return false; const na = visti.get(qa) ?? 0, nb = visti.get(qb) ?? 0; if (na >= 3 && nb >= 3) return false; visti.set(qa, na + 1); visti.set(qb, nb + 1); return true })
    const nero = new THREE.MeshStandardMaterial({ color: 0x2a2724, roughness: 0.7 })
    for (const [k, w] of archi) {
      const [qa, qb] = k.split('|').map(Number), A = salaDi.get(qa).centro, B = salaDi.get(qb).centro, dist = A.distanceTo(B)
      const M = A.clone().lerp(B, 0.5); M.y = Math.max(A.y, B.y) + 6 + dist * 0.06
      const curva = new THREE.QuadraticBezierCurve3(A.clone().add(new THREE.Vector3(0, 2, 0)), M, B.clone().add(new THREE.Vector3(0, 2, 0)))
      scena.add(new THREE.Mesh(new THREE.TubeGeometry(curva, 48, 0.18 + 0.55 * w / tmax, 6, false), nero))
      const ca = quart.get(qa)?.concetti ?? [], cb = quart.get(qb)?.concetti ?? [], comuni = ca.filter(x => cb.includes(x))
      etichetta(`<div class="s" style="font-style:italic">${esc(comuni.length ? comuni.join(', ') : `${ca[0] ?? ''} ↔ ${cb[0] ?? ''}`)}</div>`, curva.getPoint(0.5).add(new THREE.Vector3(0, 3, 0)), 700, 'filo')
    }
    // le tavole esposte che si legano direttamente: un filo sospeso dall'una all'altra
    const idx = new Map(pts.map((p, i) => [i, p.id]))
    for (const [a, b] of tutti) { const A = ancoraDi.get(idx.get(a)), B = ancoraDi.get(idx.get(b)); if (!A || !B) continue; const M = A.clone().lerp(B, 0.5); M.y += A.distanceTo(B) * 0.08 + 3; const g = new THREE.BufferGeometry().setFromPoints(new THREE.QuadraticBezierCurve3(A, M, B).getPoints(24)); scena.add(new THREE.Line(g, new THREE.LineBasicMaterial({ color: 0x8a2a1a }))) }
  }
  // i graffiti: una tavola di un altro quartiere stesa di notte vicino alla sala, appena storta
  for (const c of costr.filter(c => c.tipo === 'graffito')) {
    const A = sale.find(s => s.c.id === c.a), p = posDi.get(c.dati?.tavola); if (!A || !p?.img) continue
    const x = A.centro.x + (caso() - 0.5) * 50, z = A.centro.z + (caso() - 0.5) * 50, y = altezza(x, z)
    const m = new THREE.Mesh(new THREE.PlaneGeometry(10, 12.5), tavolaMat(p.id)); m.position.set(x, y + 0.5, z); m.rotation.set(-Math.PI / 2, 0, Math.floor(caso() * 4) * Math.PI / 2 + (caso() - 0.5) * 0.2); scena.add(m)
    m.userData = { tipo: 'tavola', p, graffito: nomeDi(c.chi) }; cliccabili.push(m)
  }
  // il monumento: la tavola più amata, stesa in piazza e sollevata in rilievo
  for (const c of costr.filter(c => c.tipo === 'monumento' && c.dati?.tavola)) { const p = posDi.get(c.dati.tavola); if (!p?.img) continue; const m = rilievo(p.id, 40, 50, 9); m.rotation.x = -Math.PI / 2; m.position.set(PZ.x, PZ.y + 1.5, PZ.z); scena.add(m); m.userData = { tipo: 'tavola', p, monumento: true }; cliccabili.push(m) }
  // i mondi scoperti dall'osservatorio: solo un nome sul suolo, ai margini
  for (const c of costr.filter(c => c.tipo === 'torre')) { const a = c.pos?.angolo ?? caso() * 6.28, x = Math.max(-LX / 2 + 15, Math.min(LX / 2 - 15, PZ.x + Math.cos(a) * LX * 0.45)), z = Math.max(-LZ / 2 + 15, Math.min(LZ / 2 - 15, PZ.z + Math.sin(a) * LZ * 0.45)), y = altezza(x, z); etichetta(`<div class="s">un mondo scoperto</div><div class="t" style="font-size:12px">${esc(c.nome)}</div>`, new THREE.Vector3(x, y + 16, z), 700) }
  // il guardaroba: un posto in piazza dove si va a cambiarsi (un cerchio a terra e un appendiabiti)
  const GUARD = new THREE.Vector3(PZ.x - 40, 0, PZ.z + 34); GUARD.y = altezza(GUARD.x, GUARD.z)
  { etichetta('<div class="t" style="font-size:13px">il guardaroba</div><div class="s">qui ci si cambia</div>', GUARD.clone().add(new THREE.Vector3(0, 18, 0)), 600) }
  etichetta(`<div class="t">${esc(D.nome ?? 'La città senza nome')}</div><div class="s">la piazza · giorno ${D.giorno}</div>`, PZ.clone().add(new THREE.Vector3(0, 75, 0)), 4000)
  // i nomi delle strade
  for (const s of strade) { const nome = K.nomiVie?.[s.c.id]; if (!nome) continue; const pts = curvaStrada(s), [x, y] = pts[20], wx = X(x), wz = Z(y); etichetta(`<div class="s" style="font-style:italic;opacity:.8">${esc(nome)}</div>`, new THREE.Vector3(wx, altezza(wx, wz) + 4, wz), 650) }

  // ── gli abitanti: le figure di Porto Vecchio, vestite coi capi del guardaroba, che camminano per le strade ────
  const gente = []
  const viaPer = (a, b) => { const s = strade.find(s => (s.c.a === a && s.c.b === b) || (s.c.a === b && s.c.b === a)); if (!s) return null; const pts = curvaStrada(s).map(([x, y]) => { const wx = X(x), wz = Z(y); return new THREE.Vector3(wx, altezza(wx, wz), wz) }); return s.c.a === a ? pts : pts.reverse() }
  try {
    await Promise.all(['Casual', 'Casual_2', 'Casual_Hoodie', 'Formal', 'Worker'].map(f => Models.loadChar(f)))
    for (const a of D.abitanti) {
      const Dp = Personaggi.descrittore({ fem: !!a.fem }, null, { id: a.id }, a.vesti?.length ? a.vesti : undefined)
      const g = Personaggi.figura(Dp, null); if (!g) continue
      g.scale.setScalar(3.4); g.traverse(o => { if (o.isMesh) o.castShadow = true }); scena.add(g)
      // il percorso: dalla sua sala (se ne cura una) alla piazza per le strade, una sosta tra le tavole, ogni tanto il guardaroba
      const mia = sale.find(s => s.sala?.curatore === a.id) ?? sale.find(s => s.c.chi === a.id)
      let giro = []
      if (mia) {
        const via = viaPer(mia.c.id, 'piazza') ?? strade.map(s => s.c.a === mia.c.id ? viaPer(mia.c.id, s.c.b) : s.c.b === mia.c.id ? viaPer(mia.c.id, s.c.a) : null).find(Boolean)
        giro = [mia.centro.clone(), ...(via ?? [PZ.clone()]), ...(via ? via.slice().reverse() : [])]
      } else { for (let k = 0; k < 5; k++) { const an = caso() * Math.PI * 2, rr = 15 + caso() * (a.tipo === 'scienziato' ? 140 : 60); const x = PZ.x + Math.cos(an) * rr, z = PZ.z + Math.sin(an) * rr; giro.push(new THREE.Vector3(x, altezza(x, z), z)) } }
      if (caso() < 0.3) giro.splice(1, 0, GUARD.clone().add(new THREE.Vector3(0, 0, 8)))
      g.position.copy(giro[0])
      const presa = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.2, 2, 8), new THREE.MeshBasicMaterial({ visible: false })); presa.position.y = 0.9; g.add(presa); presa.userData = { tipo: 'abitante', a }; cliccabili.push(presa)
      gente.push({ g, a, giro, i: 1, sosta: caso() * 3, vel: 8 + caso() * 3 })
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
  function schedaTavola(p, extra = '') { const note = D.annotazioni.filter(a => a.tavola === p.id); return `<img src="img/${p.id}.jpg" alt=""><div class="meta">giorno ${p.g} · interesse ${Math.round((p.i ?? 0) * 100)}%</div><h2>${esc(p.t)}</h2>${D.tavole?.[p.id]?.testo ? `<p>${esc(D.tavole[p.id].testo)}…</p>` : ''}${extra}${note.length ? `<div class="meta" style="margin-top:16px">le note degli abitanti</div>${note.map(n => `<div class="riga"><b>${esc(nomeDi(n.chi))}</b> ${esc(n.testo)}</div>`).join('')}` : ''}<p><a href="giorni/${p.g}.html#${p.id}">la giornata in cui è nata →</a></p>` }
  function schedaSala(r) { const nomeCur = r.sala?.curatore ? nomeDi(r.sala.curatore) : null; const vie = strade.filter(s => s.c.a === r.c.id || s.c.b === r.c.id).map(s => K.nomiVie?.[s.c.id]).filter(Boolean); return `<div class="meta">sala · ${r.q?.n ?? 0} tavole</div><h2>${esc(r.c.nome)}</h2>${r.q ? `<p>Le tavole che parlano di ${esc((r.q.concetti ?? []).join(', '))}.</p>` : ''}${nomeCur ? `<p>La cura ${esc(nomeCur)}: ${esc(r.sala.perche || r.sala.disposizione)}.</p>` : ''}${vie.length ? `<p style="opacity:.7">Ci passano ${vie.map(esc).join(', ')}.</p>` : ''}<div class="meta" style="margin-top:14px">la sua storia</div>${(r.c.storia ?? []).map(h => `<div class="riga">giorno ${h.giorno} · ${esc(nomeDi(h.chi))} ${esc(h.cosa)}</div>`).join('')}<div class="meta" style="margin-top:14px">in sala</div>${(perQ.get(r.c.q) ?? []).sort((a, b) => b.i - a.i).slice(0, 12).map(p => `<div class="riga"><a href="giorni/${p.g}.html#${p.id}">${esc(p.t || 'tavola')}</a> <span style="opacity:.5">giorno ${p.g}</span></div>`).join('')}` }
  function schedaCantiere() { return `<div class="meta">come è cresciuta</div><h2>Nessuno ha il disegno intero</h2><p>Le colline sono dove le tavole si accumulano. Il giardino avanza ogni giorno verso le zone più fitte, come una muffa. Le strade nascono tra le sale più legate. Tutto quello che vedi l'hanno fatto gli abitanti, un pezzo alla volta.</p>${costr.slice().reverse().slice(0, 40).map(c => `<div class="riga"><b>${esc(c.tipo === 'capsula' ? 'sala' : c.tipo)}</b> ${esc(c.nome ?? K.nomiVie?.[c.id] ?? '')} <span style="opacity:.55">${esc((c.storia ?? []).map(h => `g.${h.giorno} ${nomeDi(h.chi)} ${h.cosa}`).join(' · '))}</span></div>`).join('')}` }
  function schedaPiazza() { const G = D.giornate[0]; let h = `<div class="meta">la piazza · giornata ${G?.cittaGiorno ?? ''}</div><h2>${esc(D.nome ?? 'La città senza nome')}</h2><p>Al centro la tavola più amata, stesa a terra e sollevata in rilievo dalla sua stessa luce. Qui si discute, si vota, si decide.</p>`; if (D.decisioni.length) h += `<div class="meta">decisioni</div>${D.decisioni.slice(0, 6).map(d => `<div class="riga">${esc(d.cosa)} <span style="opacity:.5">${esc(d.stato)}${d.esito ? ` · ${esc(d.esito)}` : ''}</span></div>`).join('')}`; if (D.cantieri.length) h += `<div class="meta" style="margin-top:14px">cantieri</div>${D.cantieri.map(c => `<div class="riga">${esc(c.cosa)}<br><span style="opacity:.55">${c.passi.map(p => `${esc(p.testo)} (${esc(p.dove)}, ${esc(p.stato)})`).join(' · ')}</span></div>`).join('')}`; if (D.officina.length) h += `<div class="meta" style="margin-top:14px">l'officina</div>${D.officina.map(o => `<div class="riga">${esc(o.nome)} <span style="opacity:.5">di ${esc(o.autore)}</span><br><span class="mono" style="font-size:11px;opacity:.6">${esc(o.testo)}</span></div>`).join('')}`; return h }
  function schedaOss() { const Os = D.osservatorio; if (!Os) return ''; return `<div class="meta">l'osservatorio · ${Os.campioni} mondi misurati</div><h2>La biblioteca degli universi</h2><p>La chimica, l'astronoma, l'astrofisico e la filosofa della scienza sfogliano il simulatore di universi: misurano mondi, mettono alla prova ipotesi, portano in piazza le scoperte. Ai margini, il nome di ogni mondo che somiglia al nostro.</p><div class="meta" style="margin-top:14px">scoperte</div>${Os.scoperte.map(s => `<div class="riga"><b>mondo ${s.n}</b> <span style="opacity:.55">(${esc(nomeDi(s.chi))})</span><br>${esc(s.testo)}</div>`).join('')}${Os.ipotesi.length ? `<div class="meta" style="margin-top:14px">ipotesi messe alla prova</div>${Os.ipotesi.map(h => `<div class="riga">${h.stato === 'regge' ? 'regge' : 'cade'} · ${esc(h.testo)} <span style="opacity:.5">fiducia ${Math.round(h.fiducia * 100)}%</span></div>`).join('')}` : ''}` }
  function schedaVerbale() { const G = D.giornate[0]; if (!G) return '<p>La città è appena nata.</p>'; let h = `<div class="meta">il verbale · giornata ${G.cittaGiorno}</div><h2>Cosa si sono detti oggi</h2>`, fase = ''; for (const b of G.verbale) { if (b.fase !== fase) { fase = b.fase; h += `<div class="meta" style="margin-top:14px">${esc(fase)}</div>` } h += `<div class="riga"><b>${esc(nomeDi(b.chi))}</b> ${esc(b.testo)}</div>` }; return h }
  function schedaAbitante(a) { return `<div class="meta">${esc(a.carica)}</div><h2>${esc(a.nome)}</h2><p>${a.n ? `${a.n} tavole nel suo insieme.` : 'Abita la piazza.'}</p>${a.vesti?.length ? `<div class="meta">addosso</div><p>${a.vesti.map(v => esc(v.id.replace(/_/g, ' '))).join(', ')}</p>` : ''}` }
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
    if (u.tipo === 'tavola') scheda(schedaTavola(u.p, u.graffito ? `<p style="opacity:.6">Lasciata di notte da ${esc(u.graffito)} in una radura che non era sua.</p>` : u.monumento ? '<p style="opacity:.6">Il monumento della città: la tavola più amata.</p>' : ''))
    else if (u.a) scheda(schedaAbitante(u.a))
  })

  // ── il tempo ──────────────────────────────────────────────────────────────────────────────────────────
  const v3 = new THREE.Vector3(); let prima = performance.now()
  O.t.set(0, 0, 0); O.dist = Math.max(LX, LZ) * 0.95
  function giro2() {
    const ora = performance.now(), dt = Math.min(0.05, (ora - prima) / 1000); prima = ora
    if (volo) { const k = Math.min(1, (ora - volo.t0) / 1500), e = k * k * (3 - 2 * k); O.t.lerpVectors(volo.da.t, volo.a.t, e); O.dist = volo.da.dist + (volo.a.dist - volo.da.dist) * e; O.pitch = volo.da.pitch + (volo.a.pitch - volo.da.pitch) * e; O.yaw = volo.da.yaw + (volo.a.yaw - volo.da.yaw) * e; if (k >= 1) volo = null }
    metti()
    for (const p of gente) {
      const meta = p.giro[p.i], d = meta.clone().sub(p.g.position).setY(0), dist = d.length()
      let speed = 0, anim = null
      if (p.sosta > 0) { p.sosta -= dt; anim = p.i === 1 || p.i === 0 ? { act: 'Interact' } : null }
      else if (dist < 1.2) { p.i = (p.i + 1) % p.giro.length; p.sosta = p.i <= 1 ? 2 + caso() * 5 : 0 }
      else { const passo = Math.min(dist, p.vel * dt); p.g.position.addScaledVector(d.normalize(), passo); p.g.position.y = altezza(p.g.position.x, p.g.position.z); p.g.rotation.y = Math.atan2(d.x, d.z); speed = 1.2 }
      try { Models.animPerson(p.g, { speed, anim }, dt) } catch (_) { /* resta ferma */ }
    }
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
