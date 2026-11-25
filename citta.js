// La città interna come mostra: uno spazio buio, le tavole sospese e luminose raccolte in sale (i quartieri),
// architetture di sole linee, un pavimento lucido che riflette, le tavole senza immagine come polvere di dati,
// gli abitanti come sfere di luce. Dati: citta.json (scritto dal giro).
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js'
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js'

const D = await (await fetch('citta.json', { cache: 'no-store' })).json()
const NERO = 0x050608, LINEA = 0xdfe6ee
const S = 1.4, X = x => (x - 500) * S, Z = y => (y - 500) * S
const nomeDi = id => D.abitanti.find(a => a.id === id)?.nome ?? (id === 'saggista' ? 'la saggista' : id)
const esc = t => String(t ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]))
let z0 = 917; const caso = () => { z0 = (z0 * 1664525 + 1013904223) >>> 0; return z0 / 4294967296 }
const tinta = q => new THREE.Color().setHSL(((q * 0.61803) % 1), 0.55, 0.62)

// ── scena, camera, bagliore ──────────────────────────────────────────────────────────────────────────────
const cv = document.getElementById('mondo')
const R = new THREE.WebGLRenderer({ canvas: cv, antialias: true })
R.setPixelRatio(Math.min(2, devicePixelRatio)); R.setSize(innerWidth, innerHeight); R.toneMapping = THREE.ACESFilmicToneMapping
const scena = new THREE.Scene(); scena.background = new THREE.Color(NERO); scena.fog = new THREE.FogExp2(NERO, 0.0011)
const cam = new THREE.PerspectiveCamera(42, innerWidth / innerHeight, 1, 6000)
const P = { x: X(D.piazza.x), z: Z(D.piazza.y) }
cam.position.set(P.x + 120, 70, P.z + 330)
const ctl = new OrbitControls(cam, cv); ctl.target.set(P.x, 38, P.z); ctl.enableDamping = true; ctl.dampingFactor = 0.06
ctl.maxPolarAngle = Math.PI * 0.495; ctl.minDistance = 30; ctl.maxDistance = 1800; ctl.autoRotate = true; ctl.autoRotateSpeed = 0.18
cv.addEventListener('pointerdown', () => { ctl.autoRotate = false })
const comp = new EffectComposer(R); comp.addPass(new RenderPass(scena, cam))
const bloom = new UnrealBloomPass(new THREE.Vector2(innerWidth, innerHeight), 0.55, 0.6, 0.62); comp.addPass(bloom); comp.addPass(new OutputPass())
addEventListener('resize', () => { R.setSize(innerWidth, innerHeight); comp.setSize(innerWidth, innerHeight); cam.aspect = innerWidth / innerHeight; cam.updateProjectionMatrix() })

const alone = (() => { const c = document.createElement('canvas'); c.width = c.height = 128; const g = c.getContext('2d'), gr = g.createRadialGradient(64, 64, 0, 64, 64, 64); gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(0.25, 'rgba(255,255,255,.35)'); gr.addColorStop(1, 'rgba(255,255,255,0)'); g.fillStyle = gr; g.fillRect(0, 0, 128, 128); return new THREE.CanvasTexture(c) })()

// ── il pavimento: nero lucido (lascia passare i riflessi), una griglia sottile, all'orizzonte un rilievo di linee ─
{
  const pav = new THREE.Mesh(new THREE.PlaneGeometry(6000, 6000), new THREE.MeshBasicMaterial({ color: 0x07080b, transparent: true, opacity: 0.8, depthWrite: false }))
  pav.rotation.x = -Math.PI / 2; pav.renderOrder = 1; scena.add(pav)
  const griglia = new THREE.GridHelper(3000, 150, LINEA, LINEA); griglia.material.transparent = true; griglia.material.opacity = 0.05; griglia.position.y = 0.05; griglia.renderOrder = 2; scena.add(griglia)
  const N = 120, L = 3400, g = new THREE.PlaneGeometry(L, L, N, N); g.rotateX(-Math.PI / 2)
  const pos = g.attributes.position
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i), z = pos.getZ(i), d = Math.hypot(x, z)
    const fuori = Math.max(0, (d - 950) / 700), n = Math.sin(x * 0.011) * Math.cos(z * 0.013) + Math.sin(x * 0.027 + z * 0.019) * 0.6 + Math.sin(z * 0.043) * 0.3
    pos.setY(i, Math.max(0, fuori * fuori * (40 + n * 55 + 30)))
  }
  const rilievo = new THREE.LineSegments(new THREE.WireframeGeometry(g), new THREE.LineBasicMaterial({ color: LINEA, transparent: true, opacity: 0.08 }))
  rilievo.position.set(P.x, 0.1, P.z); scena.add(rilievo)
}

// ── scritte sottili, come le didascalie di una mostra ──────────────────────────────────────────────────────
function didascalia(righe, o = {}) {
  const f = o.font ?? '300 34px "JetBrains Mono", ui-monospace, monospace', pad = 6
  const c = document.createElement('canvas'), g = c.getContext('2d'); g.font = f
  const lh = parseInt(f.match(/(\d+)px/)[1]) * 1.35
  const largo = r => g.measureText(r).width + r.length * (o.spazio ?? 0)
  c.width = Math.ceil(Math.max(...righe.map(largo)) + pad * 2); c.height = Math.ceil(righe.length * lh + pad * 2)
  g.font = f; g.fillStyle = o.colore ?? '#e9ecf1'; g.textBaseline = 'top'
  righe.forEach((r, i) => { g.globalAlpha = i ? 0.55 : 1; let x = pad; for (const ch of r) { g.fillText(ch, x, pad + i * lh); x += g.measureText(ch).width + (o.spazio ?? 0) } })
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4
  const m = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ map: t, transparent: true, depthWrite: false, toneMapped: false, opacity: o.alfa ?? 0.9, side: THREE.DoubleSide }))
  const h = o.alto ?? 2; m.scale.set(h * c.width / c.height, h, 1)
  return m
}

// ── le tavole senza immagine: polvere di dati sul pavimento, colorata per quartiere ────────────────────────
{
  const sole = D.punti.filter(p => !p.img)
  const g = new THREE.BufferGeometry(), pos = new Float32Array(sole.length * 3), col = new Float32Array(sole.length * 3)
  sole.forEach((p, i) => { pos.set([X(p.x) + (caso() - 0.5) * 6, 0.8 + p.i * 3, Z(p.y) + (caso() - 0.5) * 6], i * 3); const c = tinta(p.q).multiplyScalar(0.5 + p.i * 0.6); col.set([c.r, c.g, c.b], i * 3) })
  g.setAttribute('position', new THREE.BufferAttribute(pos, 3)); g.setAttribute('color', new THREE.BufferAttribute(col, 3))
  const punti = new THREE.Points(g, new THREE.PointsMaterial({ size: 3, map: alone, vertexColors: true, transparent: true, opacity: 0.75, depthWrite: false, blending: THREE.AdditiveBlending }))
  punti.renderOrder = 3; scena.add(punti)
}

// ── le sale: ogni quartiere è una parete sospesa di tavole luminose, dentro una cornice di linee ──────────────
const cliccabili = [], carica = new THREE.TextureLoader()
const posDi = new Map(D.punti.map(p => [p.id, p]))
const perQ = new Map(); for (const p of D.punti.filter(p => p.img)) { if (!perQ.has(p.q)) perQ.set(p.q, []); perQ.get(p.q).push(p) }
const doveTavola = new Map()
function tavola(p, w, h, gr, x, y) {
  const mat = new THREE.MeshBasicMaterial({ color: 0x1a1a1a, toneMapped: false })
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat); m.position.set(x, y, 0)
  // il riflesso sotto il pavimento: la tavola capovolta, sbiadita e un po' allungata
  const rmat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.22, depthWrite: false, toneMapped: false })
  const rif = new THREE.Mesh(new THREE.PlaneGeometry(w, h), rmat); rif.position.set(x, -y * 1.05, 0); rif.scale.y = -1.15
  carica.load(`img/${p.id}.jpg`, t => { t.colorSpace = THREE.SRGBColorSpace; mat.map = t; mat.color.set(0xffffff); mat.needsUpdate = true; rmat.map = t; rmat.needsUpdate = true })
  // il bordo che fa luce: è lui che il bagliore allarga
  const bordo = new THREE.Mesh(new THREE.PlaneGeometry(w + 0.8, h + 0.8), new THREE.MeshBasicMaterial({ color: new THREE.Color(1.7, 1.75, 1.8), toneMapped: false }))
  bordo.position.set(x, y, -0.1)
  gr.add(bordo, m, rif)
  m.userData = { tipo: 'tavola', p }; cliccabili.push(m)
  return { x, y, w, h }
}
for (const q of D.quartieri) {
  const tav = (perQ.get(q.id) ?? []).sort((a, b) => b.i - a.i).slice(0, 24)
  if (!tav.length) continue
  const gr = new THREE.Group(); gr.position.set(X(q.x), 0, Z(q.y))
  // la parete: la tavola migliore al centro e grande, le altre attorno come una costellazione
  const pezzi = []
  tav.forEach((p, i) => {
    const grande = i === 0 ? 1 : i < 3 ? 0.62 : 0.3 + p.i * 0.22
    const h = 34 * grande, w = h * 0.8
    let x = 0, y = 40, prova = 0
    if (i) do { const a = caso() * Math.PI * 2, r = 14 + Math.sqrt(i) * 11 + caso() * 8; x = Math.cos(a) * r * 1.5; y = 40 + Math.sin(a) * r * 0.7; prova++ } while (prova < 60 && (y - h / 2 < 7 || pezzi.some(o => Math.abs(o.x - x) < (o.w + w) / 2 + 2.5 && Math.abs(o.y - y) < (o.h + h) / 2 + 2.5)))
    pezzi.push(tavola(p, w, h, gr, x, y)); doveTavola.set(p.id, gr)
  })
  // la cornice: una scatola di sole linee attorno alla parete, e la didascalia della sala
  const x0 = Math.min(...pezzi.map(o => o.x - o.w / 2)) - 8, x1 = Math.max(...pezzi.map(o => o.x + o.w / 2)) + 8
  const y1 = Math.max(...pezzi.map(o => o.y + o.h / 2)) + 10
  const box = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(x1 - x0, y1, 36)), new THREE.LineBasicMaterial({ color: LINEA, transparent: true, opacity: 0.3 }))
  box.position.set((x0 + x1) / 2, y1 / 2, -6); gr.add(box)
  const cap = didascalia([q.nome.toUpperCase(), `${q.n} tavole`], { alto: 4.2, spazio: 6 })
  cap.position.set(x0 + 0.5 * cap.scale.x, 3.4, 12.5); gr.add(cap)
  gr.lookAt(P.x, 0, P.z) // ogni sala guarda la piazza
  scena.add(gr)
}

// ── la piazza: un portale di linee, il nome della città, la mostra come ologrammi sospesi ────────────────────
const ologrammi = []
const OLO = new THREE.ShaderMaterial({
  transparent: true, depthWrite: false, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, toneMapped: false,
  uniforms: { map: { value: null }, t: { value: 0 }, tinta: { value: new THREE.Color('#7fe0ff') } },
  vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
  fragmentShader: `uniform sampler2D map; uniform float t; uniform vec3 tinta; varying vec2 vUv;
    void main(){
      float riga = 0.6 + 0.4*sin(vUv.y*520.0 - t*5.0);
      float s = 0.003 + 0.002*sin(t*1.3 + vUv.y*24.0);
      vec3 c = vec3(texture2D(map, vUv + vec2(s,0.)).r, texture2D(map, vUv).g, texture2D(map, vUv - vec2(s,0.)).b);
      float l = dot(c, vec3(.3,.59,.11));
      float bordo = smoothstep(0.,.03,vUv.x)*smoothstep(1.,.97,vUv.x)*smoothstep(0.,.02,vUv.y)*smoothstep(1.,.98,vUv.y);
      vec3 col = mix(c, tinta*(0.4+l), 0.45) * riga * (0.9 + 0.1*sin(t*11.0));
      gl_FragColor = vec4(col*1.3, (0.35 + 0.55*l) * bordo);
    }`,
})
function proietta(id, x, y, z, h) {
  const mat = OLO.clone(); mat.uniforms.tinta.value = new THREE.Color(caso() < 0.5 ? '#7fe0ff' : '#ff8fe6')
  const m = new THREE.Mesh(new THREE.PlaneGeometry(h * 0.8, h), mat); m.position.set(x, y, z); m.userData.guarda = true
  carica.load(`img/${id}.jpg`, t => { t.colorSpace = THREE.SRGBColorSpace; mat.uniforms.map.value = t })
  const fascio = new THREE.Mesh(new THREE.CylinderGeometry(h * 0.35, h * 0.05, y - h / 2, 32, 1, true), new THREE.MeshBasicMaterial({ color: mat.uniforms.tinta.value, transparent: true, opacity: 0.05, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide }))
  fascio.position.set(x, (y - h / 2) / 2, z)
  scena.add(m, fascio); ologrammi.push(mat); m.userData.tipo = 'tavola'; m.userData.p = posDi.get(id) ?? { id, t: '' }; cliccabili.push(m)
}
{
  const H = 120, W = 70
  const portale = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(W, H, W)), new THREE.LineBasicMaterial({ color: LINEA, transparent: true, opacity: 0.55 }))
  portale.position.set(P.x, H / 2, P.z); scena.add(portale)
  for (let i = 2; i < 5; i += 2) { // dentro il portale, cornici che si stringono: un corridoio di linee
    const k = 1 - i * 0.12, r = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(W * k, H * k, W * k)), new THREE.LineBasicMaterial({ color: LINEA, transparent: true, opacity: 0.1 }))
    r.position.set(P.x, H * k / 2, P.z); scena.add(r)
  }
  const nome = didascalia([(D.nome ?? 'una città senza nome').toUpperCase(), `giorno ${D.giorno} · ${D.abitanti.length} abitanti`], { alto: 6, spazio: 10 })
  nome.position.set(P.x, H + 12, P.z); nome.userData.guarda = true; scena.add(nome)
  const opere = (D.mostre[0]?.opere ?? []).filter(o => posDi.get(o.id)?.img)
  opere.forEach((o, i) => { const a = (i / Math.max(1, opere.length)) * Math.PI * 2; proietta(o.id, P.x + Math.cos(a) * 20, 48 + i * 10, P.z + Math.sin(a) * 20, 26) })
  // anche sopra le tavole più discusse sale un ologramma
  const annotate = [...new Set(D.annotazioni.map(a => a.tavola))].filter(id => doveTavola.has(id)).slice(-3)
  for (const id of annotate) { const v = new THREE.Vector3().setFromMatrixPosition(doveTavola.get(id).matrixWorld); proietta(id, v.x, 100 + caso() * 20, v.z, 24) }
  // i cantieri: impalcature di linee attorno alla piazza, una per idea in costruzione
  D.cantieri.forEach((c, i) => {
    const a = 0.7 + i * 1.05, x = P.x + Math.cos(a) * 120, z = P.z + Math.sin(a) * 120, n = c.passi.length, h = 18 + n * 14
    const imp = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(16, h, 16, 1, n, 1)), new THREE.LineBasicMaterial({ color: LINEA, transparent: true, opacity: 0.35 }))
    imp.position.set(x, h / 2, z); scena.add(imp)
    const d = didascalia(['CANTIERE', c.cosa.slice(0, 60)], { alto: 3.2 }); d.position.set(x, h + 5, z); d.userData.guarda = true; scena.add(d)
  })
}

// ── le annotazioni: un filo bianco dalla sala a una nota scritta a mano, sospesa ────────────────────────────
function spezza(t, n) { const out = []; let r = ''; for (const w of String(t).split(' ')) { if ((r + ' ' + w).trim().length > n && r) { out.push(r); r = w } else r = (r + ' ' + w).trim() } if (r) out.push(r); return out.slice(0, 4) }
for (const a of D.annotazioni.slice(-30)) {
  const p = posDi.get(a.tavola); if (!p) continue
  const gr = doveTavola.get(p.id)
  const base = gr ? new THREE.Vector3().setFromMatrixPosition(gr.matrixWorld).add(new THREE.Vector3(0, 62, 0)) : new THREE.Vector3(X(p.x), 3, Z(p.y))
  const fine = base.clone().add(new THREE.Vector3((caso() - 0.5) * 80, 20 + caso() * 40, (caso() - 0.5) * 80))
  const nota = didascalia([`${nomeDi(a.chi)} —`, ...spezza(a.testo, 34)], { font: 'italic 300 30px Georgia, "Times New Roman", serif', alto: 1.9, colore: '#f4efe6', alfa: 0.85 })
  nota.position.copy(fine); nota.userData = { tipo: 'nota', a, guarda: true }; scena.add(nota); cliccabili.push(nota)
  const curva = new THREE.QuadraticBezierCurve3(base, base.clone().lerp(fine, 0.5).add(new THREE.Vector3(0, 12, 0)), fine.clone().add(new THREE.Vector3(0, -nota.scale.y / 2, 0)))
  scena.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(curva.getPoints(30)), new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.25 })))
}

// ── gli abitanti: sfere di luce che vanno dalla loro casa alla piazza lasciando una scia ─────────────────────
const passanti = []
for (const a of D.abitanti) {
  const col = new THREE.Color(a.tipo === 'mestiere' ? '#ffb46b' : a.tipo === 'testa' ? '#8fd8ff' : '#ffffff')
  const sfera = new THREE.Mesh(new THREE.SphereGeometry(1.4, 20, 14), new THREE.MeshBasicMaterial({ color: col.clone().multiplyScalar(2.2), toneMapped: false }))
  const luce = new THREE.Sprite(new THREE.SpriteMaterial({ map: alone, color: col, transparent: true, opacity: 0.55, blending: THREE.AdditiveBlending, depthWrite: false })); luce.scale.set(14, 14, 1)
  const g = new THREE.Group(); g.add(sfera, luce); scena.add(g)
  let via = [a.casa, ...a.visti.map(id => posDi.get(id)).filter(Boolean), D.piazza].map(p => new THREE.Vector3(X(p.x), 0, Z(p.y)))
  if (a.tipo === 'figura') via = [0, 1, 2, 3].map(k => new THREE.Vector3(P.x + Math.cos(k * 1.7 + caso()) * 30, 0, P.z + Math.sin(k * 1.7 + caso()) * 30))
  const curva = via.length >= 2 ? new THREE.CatmullRomCurve3(via, a.tipo === 'figura') : null
  const N = 40, scia = new THREE.BufferGeometry(); scia.setAttribute('position', new THREE.BufferAttribute(new Float32Array(N * 3), 3))
  scena.add(new THREE.Line(scia, new THREE.LineBasicMaterial({ color: col, transparent: true, opacity: 0.35, blending: THREE.AdditiveBlending, toneMapped: false })))
  const p = { g, curva, v: 0.004 + caso() * 0.004, fase: caso(), alt: 14 + caso() * 30, scia, N, a }
  if (curva) { const q = curva.getPointAt(p.fase), arr = scia.attributes.position.array; for (let i = 0; i < N; i++) arr.set([q.x, p.alt, q.z], i * 3) }
  passanti.push(p)
  sfera.userData = { tipo: 'abitante', a }; cliccabili.push(sfera)
}

// ── il pannello: verbale, decisioni, officina, cantieri, mostra ────────────────────────────────────────────
{
  const pan = document.getElementById('pannello'), G = D.giornate[0]
  let h = ''
  if (G) { h += `<h2>Giornata ${G.cittaGiorno}</h2>`; let fase = ''; for (const b of G.verbale) { if (b.fase !== fase) { fase = b.fase; h += `<div class="fase">${esc(fase)}</div>` } h += `<p class="b"><span class="chi">${esc(nomeDi(b.chi))}</span> ${esc(b.testo)}</p>` } }
  if (D.decisioni.length) h += `<h2>Decisioni</h2>` + D.decisioni.map(d => `<p class="b">${esc(d.cosa)} <span style="opacity:.5">${esc(d.stato)}${d.esito ? ` · ${esc(d.esito)}` : ''}</span></p>`).join('')
  if (D.officina.length) h += `<h2>Officina</h2>` + D.officina.map(o => `<p class="b"><span class="chi">${esc(o.nome)}</span> — ${esc(o.autore)}<br><code>${esc(o.testo)}</code></p>`).join('')
  if (D.cantieri.length) h += `<h2>Cantieri</h2>` + D.cantieri.map(c => `<p class="b">${esc(c.cosa)}<br>${c.passi.map(p => `<span style="opacity:.55">— ${esc(p.testo)} · ${esc(p.dove)} · ${esc(p.stato)}</span>`).join('<br>')}</p>`).join('')
  if (D.mostre.length) h += `<h2>Mostra</h2>` + D.mostre[0].opere.map(o => `<p class="b">«${esc(o.titolo)}» <span style="opacity:.55">${esc(o.perche)}</span></p>`).join('')
  pan.innerHTML = h || '<p>La città è appena nata.</p>'
  pan.classList.add('chiuso')
  document.getElementById('apri').onclick = () => pan.classList.toggle('chiuso')
}

// ── toccare ──────────────────────────────────────────────────────────────────────────────────────────────
const ray = new THREE.Raycaster(), mouse = new THREE.Vector2(), etichetta = document.getElementById('etichetta'), scheda = document.getElementById('scheda')
const colpito = e => { mouse.set(e.clientX / innerWidth * 2 - 1, -(e.clientY / innerHeight) * 2 + 1); ray.setFromCamera(mouse, cam); return ray.intersectObjects(cliccabili, false)[0]?.object }
cv.addEventListener('pointermove', e => {
  const o = colpito(e); if (!o) { etichetta.style.display = 'none'; cv.style.cursor = ''; return }
  const u = o.userData; cv.style.cursor = 'pointer'
  etichetta.textContent = u.tipo === 'tavola' ? `${u.p.t || 'tavola'} — giorno ${u.p.g ?? ''}` : u.tipo === 'nota' ? `${nomeDi(u.a.chi)} · giorno ${u.a.giorno}` : u.a ? `${u.a.nome} · ${u.a.carica}` : ''
  etichetta.style.display = 'block'; etichetta.style.left = e.clientX + 14 + 'px'; etichetta.style.top = e.clientY + 12 + 'px'
})
let giu = null
cv.addEventListener('pointerdown', e => { giu = [e.clientX, e.clientY] })
cv.addEventListener('pointerup', e => {
  if (!giu || Math.hypot(e.clientX - giu[0], e.clientY - giu[1]) > 6) return
  const o = colpito(e); if (!o) { scheda.style.display = 'none'; return }
  const u = o.userData
  if (u.tipo === 'tavola') scheda.innerHTML = `${u.p.img ? `<img src="img/${u.p.id}.jpg" alt="">` : ''}${esc(u.p.t)}<br><span style="opacity:.55">giorno ${u.p.g} · interesse ${Math.round((u.p.i ?? 0) * 100)}%</span><br><a href="giorni/${u.p.g}.html#${u.p.id}">la sua giornata →</a>`
  else if (u.tipo === 'nota') scheda.innerHTML = `<span style="opacity:.55">${esc(nomeDi(u.a.chi))}, giorno ${u.a.giorno} della città</span><br>${esc(u.a.testo)}`
  else if (u.a) scheda.innerHTML = `${esc(u.a.nome)} <span style="opacity:.55">· ${esc(u.a.carica)}</span><br>${u.a.n ? `${u.a.n} tavole nel suo insieme` : 'abita la piazza'}`
  scheda.style.display = 'block'
})

// ── il tempo ─────────────────────────────────────────────────────────────────────────────────────────────
const t0 = performance.now(), lento = matchMedia('(prefers-reduced-motion: reduce)').matches
const guardano = []; scena.traverse(o => { if (o.userData?.guarda) guardano.push(o) })
function giro() {
  const t = (performance.now() - t0) / 1000
  for (const m of ologrammi) m.uniforms.t.value = t
  for (const p of passanti) {
    if (!p.curva) continue
    const u = lento ? p.fase : (p.a.tipo === 'figura' ? (t * p.v * 2 + p.fase) % 1 : Math.sin((t * p.v + p.fase) * Math.PI * 2) * 0.5 + 0.5)
    const q = p.curva.getPointAt(u), y = p.alt + Math.sin(t * 0.8 + p.fase * 9) * 3
    p.g.position.set(q.x, y, q.z)
    // la scia: i punti appena passati sulla stessa curva (non dipende da quanti fotogrammi riesce a fare il computer)
    const arr = p.scia.attributes.position.array, dir = Math.cos((t * p.v + p.fase) * Math.PI * 2) >= 0 || p.a.tipo === 'figura' ? 1 : -1
    for (let i = 0; i < p.N; i++) { const uu = Math.min(1, Math.max(0, u - dir * i * 0.0018)), qq = p.curva.getPointAt(p.a.tipo === 'figura' ? ((uu % 1) + 1) % 1 : uu); arr[i * 3] = qq.x; arr[i * 3 + 1] = p.alt + Math.sin((t - i * 0.05) * 0.8 + p.fase * 9) * 3; arr[i * 3 + 2] = qq.z }
    p.scia.attributes.position.needsUpdate = true
  }
  for (const o of guardano) o.lookAt(cam.position.x, o.position.y, cam.position.z)
  ctl.update(); comp.render(); requestAnimationFrame(giro)
}
giro()
window.__citta = true
