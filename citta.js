// La città interna come mostra. Ogni quartiere è una sala, allestita dal curatore che la abita (disposizione, luce,
// fondo: li decide lui, e li cambia). Le tavole si vedono bene: luce vera, niente bagliori. Titoli e schede sono
// testo vero, sopra la scena. Gli abitanti sono piccole luci che si muovono tra le sale e la piazza.
// Dati: citta.json (scritto dal giro).
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js'
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js'

const D = await (await fetch('citta.json', { cache: 'no-store' })).json()
const esc = t => String(t ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]))
const nomeDi = id => D.abitanti.find(a => a.id === id)?.nome ?? id
const da = n => n.replace(/^il /, 'dal ').replace(/^lo /, 'dallo ').replace(/^la /, 'dalla ').replace(/^l'/, "dall'").replace(/^chi /, 'da chi ')
let z0 = 917; const caso = () => { z0 = (z0 * 1664525 + 1013904223) >>> 0; return z0 / 4294967296 }
const tinta = q => new THREE.Color().setHSL(((q * 0.61803) % 1), 0.45, 0.55)
const S = 2.0, X = x => (x - 500) * S, Z = y => (y - 500) * S
const posDi = new Map(D.punti.map(p => [p.id, p]))

// ── motore ──────────────────────────────────────────────────────────────────────────────────────────────
const cv = document.getElementById('mondo')
const R = new THREE.WebGLRenderer({ canvas: cv, antialias: true })
R.setPixelRatio(Math.min(2, devicePixelRatio)); R.setSize(innerWidth, innerHeight)
R.toneMapping = THREE.ACESFilmicToneMapping; R.toneMappingExposure = 1.05
const scena = new THREE.Scene(); scena.fog = new THREE.Fog(0x06070a, 900, 2600)
const cam = new THREE.PerspectiveCamera(40, innerWidth / innerHeight, 1, 8000)
const P = new THREE.Vector3(X(D.piazza.x), 0, Z(D.piazza.y))
const ctl = new OrbitControls(cam, cv); ctl.enableDamping = true; ctl.dampingFactor = 0.07; ctl.maxPolarAngle = Math.PI * 0.49; ctl.minDistance = 25; ctl.maxDistance = 2200
const comp = new EffectComposer(R); comp.addPass(new RenderPass(scena, cam))
comp.addPass(new UnrealBloomPass(new THREE.Vector2(innerWidth, innerHeight), 0.35, 0.4, 0.92)) // solo le luci degli abitanti, non le tavole
comp.addPass(new OutputPass())
addEventListener('resize', () => { R.setSize(innerWidth, innerHeight); comp.setSize(innerWidth, innerHeight); cam.aspect = innerWidth / innerHeight; cam.updateProjectionMatrix() })
scena.add(new THREE.HemisphereLight(0x9aa6b8, 0x0b0b0d, 0.35))

// ── le sale: dove stanno (dal territorio), allontanate quel tanto che basta per non toccarsi ─────────────────
const perQ = new Map(); for (const p of D.punti.filter(p => p.img)) { if (!perQ.has(p.q)) perQ.set(p.q, []); perQ.get(p.q).push(p) }
const sale = D.quartieri.filter(q => perQ.has(q.id)).map(q => ({ q, c: new THREE.Vector3(X(q.x), 0, Z(q.y)), s: q.sala ?? { disposizione: 'parete', luce: 'calda', fondo: 'nero', quante: 7, curatore: null, perche: '' } }))
for (let it = 0; it < 80; it++) for (const a of sale) for (const b of sale) { if (a === b) continue; const d = a.c.distanceTo(b.c), min = 150; if (d < min) { const v = a.c.clone().sub(b.c).setY(0).normalize().multiplyScalar((min - d) / 2 + 0.01); a.c.add(v); b.c.sub(v) } }
for (const s of sale) { const v = s.c.clone().sub(P); if (v.length() < 140) s.c.copy(P).add(v.setLength(140)) }
function luceDi(s) {
  const L = s.s.luce, c = L === 'calda' ? 0xffd9b0 : L === 'fredda' ? 0xd2e4ff : L === 'colore' ? tinta(s.q.id).getHex() : 0xfff4e8
  return { colore: new THREE.Color(c), radente: L === 'radente', zenitale: L === 'zenitale' }
}

// ── il cielo e il pavimento: due shader calmi (le pozze di luce sotto le sale, una trama sottile, il cielo profondo) ─
const cieloMat = new THREE.ShaderMaterial({
  side: THREE.BackSide, depthWrite: false, uniforms: { t: { value: 0 } },
  vertexShader: 'varying vec3 vP; void main(){ vP = normalize(position); gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.); }',
  fragmentShader: `varying vec3 vP; uniform float t;
    float h(vec3 p){ return fract(sin(dot(p, vec3(12.9898,78.233,37.719)))*43758.5453); }
    float n(vec3 p){ vec3 i=floor(p), f=fract(p); f=f*f*(3.-2.*f); return mix(mix(mix(h(i),h(i+vec3(1,0,0)),f.x),mix(h(i+vec3(0,1,0)),h(i+vec3(1,1,0)),f.x),f.y),mix(mix(h(i+vec3(0,0,1)),h(i+vec3(1,0,1)),f.x),mix(h(i+vec3(0,1,1)),h(i+vec3(1,1,1)),f.x),f.y),f.z); }
    void main(){ float y = vP.y; vec3 c = mix(vec3(.035,.038,.05), vec3(.012,.013,.02), smoothstep(0.,.6,y));
      c += vec3(.05,.045,.04) * exp(-abs(y)*14.);
      float neb = n(vP*3.+t*.01)*.6 + n(vP*7.)*.4; c += vec3(.02,.025,.04) * smoothstep(.55,.9,neb) * smoothstep(0.,.3,y);
      gl_FragColor = vec4(c,1.); }`,
})
scena.add(new THREE.Mesh(new THREE.SphereGeometry(4000, 32, 16), cieloMat))
{
  const pos = [], col = []
  for (let i = 0; i < 32; i++) { const s = sale[i]; pos.push(s ? new THREE.Vector3(s.c.x, s.c.z, 1) : new THREE.Vector3(0, 0, 0)); col.push(s ? luceDi(s).colore.clone() : new THREE.Color(0)) }
  const pav = new THREE.Mesh(new THREE.PlaneGeometry(8000, 8000), new THREE.ShaderMaterial({
    uniforms: { pozze: { value: pos }, colori: { value: col }, piazza: { value: new THREE.Vector2(P.x, P.z) } },
    vertexShader: 'varying vec2 vW; void main(){ vec4 w = modelMatrix*vec4(position,1.); vW = w.xz; gl_Position = projectionMatrix*viewMatrix*w; }',
    fragmentShader: `varying vec2 vW; uniform vec3 pozze[32]; uniform vec3 colori[32]; uniform vec2 piazza;
      void main(){ vec3 c = vec3(.016,.017,.02);
        for (int i=0;i<32;i++){ if (pozze[i].z < .5) continue; float d = length(vW - pozze[i].xy); c += colori[i] * .09 * exp(-d*d/(2.*70.*70.)); }
        float dp = length(vW-piazza); c += vec3(.06,.058,.055) * exp(-dp*dp/(2.*60.*60.));
        vec2 g = abs(fract(vW/40.)-.5); float riga = smoothstep(.49,.5,max(g.x,g.y)); c += riga * .012 * exp(-dp/900.);
        gl_FragColor = vec4(c,1.); }`,
  }))
  pav.rotation.x = -Math.PI / 2; scena.add(pav)
}

// ── allestire una sala ──────────────────────────────────────────────────────────────────────────────────
const cliccabili = [], carica = new THREE.TextureLoader(), etichette = [], strato = document.getElementById('etichette')
const tavolaMat = (p) => { const m = new THREE.MeshStandardMaterial({ color: 0x777777, roughness: 0.62, metalness: 0 }); carica.load(`img/${p.id}.jpg`, t => { t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; m.map = t; m.color.set(0xffffff); m.emissiveMap = t; m.emissive.set(0x262626); m.needsUpdate = true }); return m }
function allestisci(s) {
  const g = new THREE.Group(); g.position.copy(s.c); g.lookAt(P.x, 0, P.z); scena.add(g)
  const tav = perQ.get(s.q.id).sort((a, b) => b.i - a.i).slice(0, Math.max(3, Math.min(12, s.s.quante ?? 7)))
  const L = luceDi(s), d = s.s.disposizione, h = 22, w = h * 0.8, gap = 7
  const posti = []
  if (d === 'griglia') { const col = Math.ceil(Math.sqrt(tav.length * 1.6)); tav.forEach((p, i) => posti.push([(i % col - (col - 1) / 2) * (w + gap), 12 + Math.floor(i / col) * (h + gap), 0, 0])) }
  else if (d === 'arco') { const n = tav.length, apre = Math.min(Math.PI * 0.9, n * 0.32); tav.forEach((p, i) => { const a = -apre / 2 + (n === 1 ? 0.5 : i / (n - 1)) * apre; posti.push([Math.sin(a) * 60, 14, -Math.cos(a) * 60 + 50, -a]) }) }
  else if (d === 'sospese') tav.forEach(() => posti.push([(caso() - 0.5) * 90, 10 + caso() * 40, (caso() - 0.5) * 30, (caso() - 0.5) * 0.5]))
  else if (d === 'colonna') tav.forEach((p, i) => posti.push([(i % 2 ? 1 : -1) * (w / 2 + 2), 10 + Math.floor(i / 2) * (h + 4), 0, 0]))
  else if (d === 'pavimento') { const col = Math.ceil(Math.sqrt(tav.length)); tav.forEach((p, i) => posti.push([(i % col - (col - 1) / 2) * (w + gap), 0.4, (Math.floor(i / col) - (col - 1) / 2) * (h + gap) + 10, 'terra'])) }
  else { let x = 0; const k = tav.map((p, i) => i === 0 ? 1.5 : 1), tot = k.reduce((a, b) => a + b * w + gap, -gap); tav.forEach((p, i) => { posti.push([x - tot / 2 + (k[i] * w) / 2, 12, 0, 0, k[i]]); x += k[i] * w + gap }) }
  const xs = posti.map(p => p[0]), ys = posti.map(p => p[1] + h * (p[4] ?? 1))
  const larga = Math.max(...xs) - Math.min(...xs) + w * 1.6 + 20, alta = Math.max(...ys) + 12
  // il fondo: una parete che regge le tavole (o niente, se il curatore non la vuole)
  if (s.s.fondo !== 'nessuno' && d !== 'pavimento' && d !== 'arco' && d !== 'sospese') {
    const colFondo = s.s.fondo === 'chiaro' ? 0xcfccc6 : s.s.fondo === 'colore' ? tinta(s.q.id).multiplyScalar(0.55).getHex() : 0x15161a
    const muro = new THREE.Mesh(new THREE.BoxGeometry(larga, alta, 2), new THREE.MeshStandardMaterial({ color: colFondo, roughness: 0.92 }))
    muro.position.set((Math.max(...xs) + Math.min(...xs)) / 2, alta / 2, -2.2); g.add(muro)
  }
  tav.forEach((p, i) => {
    const [x, y, z, r, k = 1] = posti[i], ww = w * k, hh = h * k
    const m = new THREE.Mesh(new THREE.PlaneGeometry(ww, hh), tavolaMat(p))
    if (r === 'terra') { m.rotation.x = -Math.PI / 2; m.position.set(x, y, z) } else { m.position.set(x, y + hh / 2, z); m.rotation.y = r }
    const cornice = new THREE.Mesh(new THREE.PlaneGeometry(ww + 0.8, hh + 0.8), new THREE.MeshStandardMaterial({ color: 0x0c0c0e, roughness: 0.5 }))
    cornice.position.copy(m.position); cornice.rotation.copy(m.rotation); cornice.translateZ(-0.15)
    g.add(cornice, m); m.userData = { tipo: 'tavola', p, sala: s }; cliccabili.push(m)
  })
  // la luce della sala: uno spot (dall'alto, di taglio, o di fronte), come in un museo
  g.updateMatrixWorld()
  const spot = new THREE.SpotLight(L.colore, 2.4, 0, Math.PI / 5, 0.55, 0)
  spot.position.copy(g.localToWorld(new THREE.Vector3(L.radente ? larga * 0.7 : 0, L.zenitale ? alta + 90 : alta + 45, L.radente ? 25 : L.zenitale ? 10 : 75)))
  spot.target.position.copy(g.localToWorld(new THREE.Vector3(0, d === 'pavimento' ? 0 : alta * 0.45, 0))); scena.add(spot, spot.target)
  const nomeCur = s.s.curatore ? nomeDi(s.s.curatore) : null
  const e = document.createElement('div'); e.className = 'et sala'
  e.innerHTML = `<div class="t">${esc(s.q.nome)}</div><div class="s">${s.q.n} tavole${nomeCur ? ` · curata ${esc(da(nomeCur))}` : ''}</div>`
  e.onclick = () => vaiA(s)
  strato.appendChild(e)
  etichette.push({ el: e, p: g.localToWorld(new THREE.Vector3(Math.min(...xs) - w / 2, d === 'pavimento' ? 2 : 6, 4)), lontano: 1100 })
  s.g = g; s.alta = alta; s.larga = larga
}
for (const s of sale) allestisci(s)

// ── la piazza: una pedana di pietra, il nome della città, la mostra e i cantieri ────────────────────────────
{
  const ped = new THREE.Mesh(new THREE.CylinderGeometry(52, 54, 1.5, 96), new THREE.MeshStandardMaterial({ color: 0x2a2a2e, roughness: 0.85 })); ped.position.set(P.x, 0.75, P.z); scena.add(ped)
  const luce = new THREE.SpotLight(0xfff1dd, 1.6, 0, Math.PI / 6, 0.7, 0); luce.position.set(P.x, 160, P.z + 20); luce.target.position.copy(P); scena.add(luce, luce.target)
  const opere = (D.mostre[0]?.opere ?? []).filter(o => posDi.get(o.id)?.img)
  opere.forEach((o, i) => {
    const a = (i / Math.max(1, opere.length)) * Math.PI * 2, p = posDi.get(o.id)
    const m = new THREE.Mesh(new THREE.PlaneGeometry(17, 21), tavolaMat(p)); m.position.set(P.x + Math.cos(a) * 30, 14, P.z + Math.sin(a) * 30); m.lookAt(P.x, 14, P.z); m.rotateY(Math.PI)
    scena.add(m); m.userData = { tipo: 'tavola', p, mostra: o }; cliccabili.push(m)
  })
  const e = document.createElement('div'); e.className = 'et'; e.innerHTML = `<div class="t">${esc(D.nome ?? 'La città senza nome')}</div><div class="s">la piazza${opere.length ? ` · in mostra ${opere.length} tavole della bottega` : ''}</div>`
  strato.appendChild(e); etichette.push({ el: e, p: new THREE.Vector3(P.x, 40, P.z), lontano: 2600 })
  D.cantieri.forEach((c, i) => {
    const a = 0.8 + i * 1.1, x = P.x + Math.cos(a) * 95, z = P.z + Math.sin(a) * 95, hh = 14 + c.passi.length * 9
    const imp = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(12, hh, 12, 1, c.passi.length, 1)), new THREE.LineBasicMaterial({ color: 0x8a8a8a, transparent: true, opacity: 0.6 })); imp.position.set(x, hh / 2, z); scena.add(imp)
    const el = document.createElement('div'); el.className = 'et'; el.innerHTML = `<div class="s">cantiere</div><div class="t" style="font-size:13px">${esc(c.cosa.slice(0, 70))}</div>`
    strato.appendChild(el); etichette.push({ el, p: new THREE.Vector3(x, hh + 4, z), lontano: 500 })
  })
}

// ── le note a mano: compaiono vicino alla loro sala quando ci si avvicina ───────────────────────────────────
const salaDi = new Map(); for (const s of sale) for (const p of perQ.get(s.q.id)) salaDi.set(p.id, s)
for (const a of D.annotazioni.slice(-24)) {
  const s = salaDi.get(a.tavola); if (!s?.g) continue
  const el = document.createElement('div'); el.className = 'et nota'; el.innerHTML = `<b>${esc(nomeDi(a.chi))}</b>${esc(a.testo)}`
  strato.appendChild(el)
  etichette.push({ el, p: s.g.localToWorld(new THREE.Vector3((caso() - 0.5) * s.larga, s.alta + 8 + caso() * 18, 6)), lontano: 260 })
}

// ── gli abitanti: piccole luci che vanno e vengono tra la loro casa e la piazza ─────────────────────────────
const passanti = []
const alone = (() => { const c = document.createElement('canvas'); c.width = c.height = 64; const g = c.getContext('2d'), gr = g.createRadialGradient(32, 32, 0, 32, 32, 32); gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(0.3, 'rgba(255,255,255,.25)'); gr.addColorStop(1, 'rgba(255,255,255,0)'); g.fillStyle = gr; g.fillRect(0, 0, 64, 64); return new THREE.CanvasTexture(c) })()
for (const a of D.abitanti) {
  const col = new THREE.Color(a.tipo === 'mestiere' ? '#ffcf9a' : a.tipo === 'testa' ? '#a9dcff' : a.tipo === 'scienziato' ? '#c9b6ff' : '#ffffff')
  const sf = new THREE.Mesh(new THREE.SphereGeometry(0.9, 16, 12), new THREE.MeshBasicMaterial({ color: col.clone().multiplyScalar(3), toneMapped: false }))
  const al = new THREE.Sprite(new THREE.SpriteMaterial({ map: alone, color: col, transparent: true, opacity: 0.35, depthWrite: false, blending: THREE.AdditiveBlending })); al.scale.set(7, 7, 1)
  const g = new THREE.Group(); g.add(sf, al); scena.add(g)
  const casa = new THREE.Vector3(X(a.casa.x), 0, Z(a.casa.y)), via = [casa, ...a.visti.map(id => posDi.get(id)).filter(Boolean).map(p => new THREE.Vector3(X(p.x), 0, Z(p.y))), P.clone()]
  passanti.push({ g, curva: new THREE.CatmullRomCurve3(via.length > 1 ? via : [casa, P.clone()]), v: 0.003 + caso() * 0.003, fase: caso(), alt: 26 + caso() * 20, a })
  sf.userData = { tipo: 'abitante', a }; cliccabili.push(sf)
}

// ── l'indice: le sale in ordine di grandezza, la piazza, l'osservatorio ────────────────────────────────────
const ind = document.getElementById('indice')
ind.innerHTML = `<h3>la piazza</h3><button data-k="piazza">${esc(D.nome ?? 'La città senza nome')}<small>${D.abitanti.length} abitanti · ${D.decisioni.filter(d => d.stato === 'in vigore').length} decisioni in vigore</small></button>
<h3>le sale</h3>${sale.slice().sort((a, b) => b.q.n - a.q.n).map(s => `<button data-q="${s.q.id}">${esc(s.q.nome)}<small>${s.q.n} tavole · ${esc(s.s.disposizione)}, luce ${esc(s.s.luce)}</small></button>`).join('')}
${D.osservatorio ? `<h3>l'osservatorio</h3><button data-k="oss">La biblioteca degli universi<small>${D.osservatorio.campioni} mondi misurati</small></button>` : ''}`
ind.onclick = e => { const b = e.target.closest('button'); if (!b) return; if (b.dataset.q) vaiA(sale.find(s => String(s.q.id) === b.dataset.q)); else if (b.dataset.k === 'piazza') { vola(P.clone().add(new THREE.Vector3(0, 70, 160)), P.clone().add(new THREE.Vector3(0, 14, 0))); scheda(schedaPiazza()) } else if (b.dataset.k === 'oss') scheda(schedaOss()) }

// ── le schede: testo vero, con i link ───────────────────────────────────────────────────────────────────
const sc = document.getElementById('scheda')
function scheda(html) { sc.innerHTML = `<button class="chiudi" aria-label="chiudi">×</button>${html}`; sc.style.display = 'block'; sc.querySelector('.chiudi').onclick = () => { sc.style.display = 'none' } }
function schedaTavola(p, extra = '') {
  const note = D.annotazioni.filter(a => a.tavola === p.id)
  return `<img src="img/${p.id}.jpg" alt=""><div class="meta">giorno ${p.g} · interesse ${Math.round((p.i ?? 0) * 100)}%</div><h2>${esc(p.t)}</h2>${D.tavole?.[p.id]?.testo ? `<p>${esc(D.tavole[p.id].testo)}…</p>` : ''}${extra}${note.length ? `<div class="meta" style="margin-top:16px">le note degli abitanti</div>${note.map(n => `<div class="riga"><b>${esc(nomeDi(n.chi))}</b> ${esc(n.testo)}</div>`).join('')}` : ''}<p><a href="giorni/${p.g}.html#${p.id}">la giornata in cui è nata →</a></p>`
}
function schedaSala(s) {
  const nomeCur = s.s.curatore ? nomeDi(s.s.curatore) : null
  return `<div class="meta">sala · ${s.q.n} tavole</div><h2>${esc(s.q.nome)}</h2><p>Le tavole che parlano di ${esc((s.q.concetti ?? []).join(', '))}.</p>${nomeCur ? `<p>La cura ${esc(nomeCur)}: ${esc(s.s.perche || s.s.disposizione)}.</p>` : ''}<div class="meta" style="margin-top:14px">in sala</div>${perQ.get(s.q.id).sort((a, b) => b.i - a.i).slice(0, 12).map(p => `<div class="riga"><a href="giorni/${p.g}.html#${p.id}">${esc(p.t || 'tavola')}</a> <span style="opacity:.5">giorno ${p.g}</span></div>`).join('')}`
}
function schedaPiazza() {
  const G = D.giornate[0]; let h = `<div class="meta">la piazza · giornata ${G?.cittaGiorno ?? ''}</div><h2>${esc(D.nome ?? 'La città senza nome')}</h2>`
  if (D.decisioni.length) h += `<div class="meta">decisioni</div>${D.decisioni.slice(0, 6).map(d => `<div class="riga">${esc(d.cosa)} <span style="opacity:.5">${esc(d.stato)}${d.esito ? ` · ${esc(d.esito)}` : ''}</span></div>`).join('')}`
  if (D.cantieri.length) h += `<div class="meta" style="margin-top:14px">cantieri</div>${D.cantieri.map(c => `<div class="riga">${esc(c.cosa)}<br><span style="opacity:.55">${c.passi.map(p => `${esc(p.testo)} (${esc(p.dove)}, ${esc(p.stato)})`).join(' · ')}</span></div>`).join('')}`
  if (D.officina.length) h += `<div class="meta" style="margin-top:14px">l'officina: i generatori scritti dalla città</div>${D.officina.map(o => `<div class="riga">${esc(o.nome)} <span style="opacity:.5">di ${esc(o.autore)}</span><br><span class="mono" style="font-size:11px;opacity:.6">${esc(o.testo)}</span></div>`).join('')}`
  return h
}
function schedaOss() {
  const O = D.osservatorio; if (!O) return ''
  return `<div class="meta">l'osservatorio · ${O.campioni} mondi misurati</div><h2>La biblioteca degli universi</h2><p>La chimica, l'astronoma, l'astrofisico e la filosofa della scienza sfogliano il simulatore di universi: misurano mondi, mettono alla prova ipotesi, portano in piazza le scoperte. I luoghi che trovano diventano pattern nelle tavole.</p>
  <div class="meta" style="margin-top:14px">scoperte</div>${O.scoperte.map(s => `<div class="riga"><b>mondo ${s.n}</b> <span style="opacity:.55">(${esc(nomeDi(s.chi))})</span><br>${esc(s.testo)}</div>`).join('')}
  ${O.ipotesi.length ? `<div class="meta" style="margin-top:14px">ipotesi messe alla prova</div>${O.ipotesi.map(h => `<div class="riga">${h.stato === 'regge' ? 'regge' : 'cade'} · ${esc(h.testo)} <span style="opacity:.5">fiducia ${Math.round(h.fiducia * 100)}%</span></div>`).join('')}` : ''}`
}
function schedaVerbale() {
  const G = D.giornate[0]; if (!G) return '<p>La città è appena nata.</p>'
  let h = `<div class="meta">il verbale · giornata ${G.cittaGiorno}</div><h2>Cosa si sono detti oggi</h2>`, fase = ''
  for (const b of G.verbale) { if (b.fase !== fase) { fase = b.fase; h += `<div class="meta" style="margin-top:14px">${esc(fase)}</div>` } h += `<div class="riga"><b>${esc(nomeDi(b.chi))}</b> ${esc(b.testo)}</div>` }
  return h
}
document.getElementById('apri').onclick = () => scheda(schedaVerbale())

// ── muoversi: volare verso una sala, toccare ─────────────────────────────────────────────────────────────
let volo = null
function vola(dove, guarda) { volo = { da: cam.position.clone(), a: dove, tda: ctl.target.clone(), ta: guarda, t0: performance.now() }; ctl.autoRotate = false }
function vaiA(s) {
  // la distanza giusta perché la sala entri tutta nello spazio libero (a sinistra la scheda non c'è, a destra sì)
  const pav = s.s.disposizione === 'pavimento', libero = (innerWidth - Math.min(470, innerWidth * 0.4)) / innerWidth
  const fov = cam.fov * Math.PI / 180, vert = 2 * Math.tan(fov / 2), oriz = vert * cam.aspect * libero
  const dist = Math.max((s.larga + 16) / oriz, (s.alta + 16) / vert) * 1.08
  const centro = s.g.localToWorld(new THREE.Vector3(0, pav ? 0 : s.alta * 0.5, 0))
  const dove = pav ? s.g.localToWorld(new THREE.Vector3(0, dist * 0.85, dist * 0.55)) : s.g.localToWorld(new THREE.Vector3(0, s.alta * 0.5 + dist * 0.08, dist))
  // la scheda copre la destra: il punto guardato si sposta a destra, così la sala finisce nel centro dello spazio libero
  const destra = new THREE.Vector3().subVectors(centro, dove).cross(new THREE.Vector3(0, 1, 0)).normalize().multiplyScalar(oriz * dist * (1 - libero) * 0.5 / libero * 0.9)
  vola(dove.clone().add(destra), centro.clone().add(destra))
  scheda(schedaSala(s))
  for (const b of ind.querySelectorAll('button')) b.classList.toggle('qui', b.dataset.q === String(s.q.id))
}
const ray = new THREE.Raycaster(), mouse = new THREE.Vector2()
let giu = null
cv.addEventListener('pointerdown', e => { giu = [e.clientX, e.clientY]; volo = null; ctl.autoRotate = false })
cv.addEventListener('pointerup', e => {
  if (!giu || Math.hypot(e.clientX - giu[0], e.clientY - giu[1]) > 6) return
  mouse.set(e.clientX / innerWidth * 2 - 1, -(e.clientY / innerHeight) * 2 + 1); ray.setFromCamera(mouse, cam)
  const o = ray.intersectObjects(cliccabili, false)[0]?.object; if (!o) return
  const u = o.userData
  if (u.tipo === 'tavola') { scheda(schedaTavola(u.p, u.mostra ? `<p style="opacity:.6">In mostra: ${esc(u.mostra.perche)}</p>` : '')); const w = o.getWorldPosition(new THREE.Vector3()), n = new THREE.Vector3(0, 0, 1).applyQuaternion(o.getWorldQuaternion(new THREE.Quaternion())); vola(w.clone().add(n.multiplyScalar(45)).add(new THREE.Vector3(0, 4, 0)), w) }
  else if (u.a) scheda(`<div class="meta">${esc(u.a.carica)}</div><h2>${esc(u.a.nome)}</h2><p>${u.a.n ? `${u.a.n} tavole nel suo insieme.` : 'Abita la piazza.'}</p>`)
})

// ── avvio: dall'alto sulla piazza, poi la città gira piano finché qualcuno non la tocca ───────────────────
cam.position.copy(P).add(new THREE.Vector3(0, 560, 260)); ctl.target.copy(P).add(new THREE.Vector3(0, 10, 0)); ctl.autoRotate = true; ctl.autoRotateSpeed = 0.15
const v3 = new THREE.Vector3()
function giro() {
  const t = performance.now() / 1000
  cieloMat.uniforms.t.value = t
  if (volo) { const k = Math.min(1, (performance.now() - volo.t0) / 1400), e = k * k * (3 - 2 * k); cam.position.lerpVectors(volo.da, volo.a, e); ctl.target.lerpVectors(volo.tda, volo.ta, e); if (k >= 1) volo = null }
  for (const p of passanti) { const u = Math.sin((t * p.v + p.fase) * Math.PI * 2) * 0.5 + 0.5, q = p.curva.getPointAt(u); p.g.position.set(q.x, p.alt + Math.sin(t * 0.7 + p.fase * 9) * 2, q.z) }
  ctl.update(); comp.render()
  // le etichette seguono la scena; spariscono quando sono dietro o troppo lontane
  const occupati = []
  const ordine = etichette.map(e => [e, cam.position.distanceTo(e.p)]).sort((a, b) => a[1] - b[1])
  for (const [e, d] of ordine) {
    v3.copy(e.p); v3.project(cam)
    let vis = v3.z < 1 && d < e.lontano && Math.abs(v3.x) < 1.1 && Math.abs(v3.y) < 1.1
    if (vis) { const x = (v3.x * 0.5 + 0.5) * innerWidth, y = (-v3.y * 0.5 + 0.5) * innerHeight, w = e.el.offsetWidth || 160, h = e.el.offsetHeight || 34, r = e.el.classList.contains('sala') ? [x, y, x + w, y + h] : [x - w / 2, y - h, x + w / 2, y]; if (r[0] < 270 || occupati.some(o => r[0] < o[2] && r[2] > o[0] && r[1] < o[3] && r[3] > o[1])) vis = false; else occupati.push(r) }
    e.el.style.opacity = vis ? String(Math.min(1, (e.lontano - d) / (e.lontano * 0.3))) : '0'
    e.el.style.pointerEvents = vis && e.el.classList.contains('sala') ? 'auto' : 'none'
    if (vis) e.el.style.transform = `translate(${(v3.x * 0.5 + 0.5) * innerWidth}px,${(-v3.y * 0.5 + 0.5) * innerHeight}px) ${e.el.classList.contains('sala') ? '' : 'translate(-50%,-100%)'}`
  }
  requestAnimationFrame(giro)
}
giro()
window.__citta = true
