// La città interna, esplorabile. Dati: citta.json (scritto dal giro). Nessuna libreria oltre a three.
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/OrbitControls.js'

const css = n => getComputedStyle(document.documentElement).getPropertyValue(n).trim()
const BG = css('--bg') || '#ebe6dc', INK = css('--ink') || '#121212', ACC = css('--acc') || '#e3361b'
const D = await (await fetch('citta.json', { cache: 'no-store' })).json()
const S = 1.25, X = x => (x - 500) * S, Z = y => (y - 500) * S
const nomeDi = id => D.abitanti.find(a => a.id === id)?.nome ?? (id === 'saggista' ? 'la saggista' : id)
const tinta = q => `hsl(${(q * 137.5) % 360} 38% 62%)`
const esc = t => String(t ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]))
let z0 = 12345; const caso = () => { z0 = (z0 * 1664525 + 1013904223) >>> 0; return z0 / 4294967296 }

// ── scena ────────────────────────────────────────────────────────────────────────────────────────────────
const cv = document.getElementById('mondo')
const R = new THREE.WebGLRenderer({ canvas: cv, antialias: true })
R.setPixelRatio(Math.min(2, devicePixelRatio)); R.setSize(innerWidth, innerHeight)
const scena = new THREE.Scene(); scena.background = new THREE.Color(BG); scena.fog = new THREE.Fog(BG, 700, 1700)
const cam = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 1, 4000)
const P = { x: X(D.piazza.x), z: Z(D.piazza.y) }
cam.position.set(P.x + 360, 420, P.z + 520)
const ctl = new OrbitControls(cam, cv); ctl.target.set(P.x, 0, P.z); ctl.enableDamping = true; ctl.maxPolarAngle = Math.PI * 0.47; ctl.minDistance = 40; ctl.maxDistance = 1500
scena.add(new THREE.HemisphereLight(0xffffff, 0xbbb5a8, 1.15))
const sole = new THREE.DirectionalLight(0xffffff, 0.7); sole.position.set(300, 600, 200); scena.add(sole)
addEventListener('resize', () => { R.setSize(innerWidth, innerHeight); cam.aspect = innerWidth / innerHeight; cam.updateProjectionMatrix() })

// ── il suolo: i quartieri come macchie di colore, i cerchi degli abitanti, la piazza ─────────────────────────
{
  const N = 2048, c = document.createElement('canvas'); c.width = c.height = N
  const L = 1500, g = c.getContext('2d'), k = N / L, o = N / 2
  const px = x => o + X(x) * k, py = y => o + Z(y) * k
  g.fillStyle = BG; g.fillRect(0, 0, N, N)
  g.globalAlpha = 0.16
  for (const p of D.punti) { g.fillStyle = tinta(p.q); g.beginPath(); g.arc(px(p.x), py(p.y), 26, 0, 7); g.fill() }
  g.globalAlpha = 1
  // le vie: i passi recenti degli abitanti verso la piazza
  g.strokeStyle = INK; g.globalAlpha = 0.09; g.lineWidth = 1.5
  const pos = new Map(D.punti.map(p => [p.id, p]))
  for (const a of D.abitanti) { const v = a.visti.map(id => pos.get(id)).filter(Boolean); if (v.length < 2) continue; g.beginPath(); g.moveTo(px(v[0].x), py(v[0].y)); for (const p of v.slice(1)) g.lineTo(px(p.x), py(p.y)); g.stroke() }
  g.globalAlpha = 1
  for (const a of D.abitanti.filter(a => a.tipo !== 'figura')) {
    g.strokeStyle = a.tipo === 'mestiere' ? 'rgba(180,40,30,.28)' : 'rgba(30,60,170,.25)'; g.lineWidth = 2; g.setLineDash(a.tipo === 'mestiere' ? [] : [14, 10])
    g.beginPath(); g.arc(px(a.casa.x), py(a.casa.y), a.raggio * S * k, 0, 7); g.stroke()
  }
  g.setLineDash([])
  g.fillStyle = INK; g.globalAlpha = 0.1; g.beginPath(); g.arc(px(D.piazza.x), py(D.piazza.y), 60, 0, 7); g.fill(); g.globalAlpha = 1
  var Lterra = L
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8
  const terra = new THREE.Mesh(new THREE.PlaneGeometry(L, L), new THREE.MeshLambertMaterial({ map: t }))
  terra.rotation.x = -Math.PI / 2; terra.position.set(0, 0, 0); scena.add(terra)
}

// ── scritte: un canvas per ogni etichetta ─────────────────────────────────────────────────────────────────
function scritta(testo, o = {}) {
  const f = o.font ?? '600 44px system-ui, sans-serif', pad = 14
  const c = document.createElement('canvas'), g = c.getContext('2d'); g.font = f
  const righe = []; let riga = ''
  for (const w of String(testo).split(' ')) { const pr = riga ? riga + ' ' + w : w; if (g.measureText(pr).width > (o.largo ?? 900) && riga) { righe.push(riga); riga = w } else riga = pr }
  if (riga) righe.push(riga)
  const lh = parseInt(f.match(/(\d+)px/)[1]) * 1.25
  c.width = Math.ceil(Math.max(...righe.map(r => g.measureText(r).width)) + pad * 2); c.height = Math.ceil(righe.length * lh + pad * 2)
  g.font = f; if (o.fondo) { g.fillStyle = o.fondo; g.fillRect(0, 0, c.width, c.height) }
  g.fillStyle = o.colore ?? INK; g.textBaseline = 'top'
  righe.forEach((r, i) => g.fillText(r, pad, pad + i * lh))
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace
  const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: t, transparent: true, depthWrite: false }))
  const h = o.alto ?? 10; sp.scale.set(h * c.width / c.height, h, 1)
  if (o.ruota) sp.material.rotation = o.ruota
  return sp
}

// ── i quartieri ───────────────────────────────────────────────────────────────────────────────────────────
for (const q of D.quartieri) { if (q.n < 25) continue; const s = scritta(q.nome, { font: '700 54px Georgia, serif', colore: INK, alto: 12 + Math.sqrt(q.n) * 0.7 }); s.position.set(X(q.x), 40 + Math.sqrt(q.n), Z(q.y)); scena.add(s) }

// ── le tavole: in piedi quelle che hanno un'immagine (rivolte verso la piazza), le altre a terra come tessere ─
const cliccabili = [], carica = new THREE.TextureLoader()
const tessera = new THREE.BoxGeometry(3, 0.4, 3)
for (const p of D.punti) {
  const x = X(p.x), z = Z(p.y)
  if (p.img) {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(14, 17.5), new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide }))
    carica.load(`img/${p.id}.jpg`, t => { t.colorSpace = THREE.SRGBColorSpace; m.material.map = t; m.material.needsUpdate = true })
    m.position.set(x, 10 + p.i * 6, z); m.lookAt(P.x, m.position.y, P.z); m.rotateY(Math.PI + (caso() - 0.5) * 0.5)
    m.userData = { tipo: 'tavola', p }; scena.add(m); cliccabili.push(m)
    const asta = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.25, m.position.y - 8.75), new THREE.MeshLambertMaterial({ color: INK })); asta.position.set(x, (m.position.y - 8.75) / 2, z); scena.add(asta)
  } else {
    const m = new THREE.Mesh(tessera, new THREE.MeshLambertMaterial({ color: new THREE.Color(tinta(p.q)).lerp(new THREE.Color(INK), p.k ? 0.15 : 0.5) }))
    m.position.set(x, 0.3, z); m.userData = { tipo: 'tavola', p }; scena.add(m); cliccabili.push(m)
  }
}
const posDi = new Map(D.punti.map(p => [p.id, p]))

// ── la piazza e la mostra: un anello di ologrammi ────────────────────────────────────────────────────────────
const ologramma = new THREE.ShaderMaterial({
  transparent: true, depthWrite: false, side: THREE.DoubleSide, blending: THREE.AdditiveBlending,
  uniforms: { map: { value: null }, t: { value: 0 }, tinta: { value: new THREE.Color('#5fd8ff') } },
  vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
  fragmentShader: `uniform sampler2D map; uniform float t; uniform vec3 tinta; varying vec2 vUv;
    void main(){
      float g = sin(vUv.y*420.0 - t*6.0)*0.5+0.5;                       // righe di scansione
      float s = 0.004 + 0.003*sin(t*1.7 + vUv.y*30.0);                    // la luce trema e si separa
      float r = texture2D(map, vUv + vec2(s,0.)).r, gg = texture2D(map, vUv).g, b = texture2D(map, vUv - vec2(s,0.)).b;
      float l = dot(vec3(r,gg,b), vec3(.3,.59,.11));
      float bordo = smoothstep(0.0,0.04,vUv.x)*smoothstep(1.0,0.96,vUv.x)*smoothstep(0.0,0.03,vUv.y)*smoothstep(1.0,0.97,vUv.y);
      float tremo = 0.85 + 0.15*sin(t*13.0 + vUv.y*3.0);
      vec3 c = mix(vec3(r,gg,b), tinta*l*1.6, 0.55) * (0.55 + 0.45*g) * tremo;
      gl_FragColor = vec4(c, (0.25 + 0.6*l) * bordo * (0.6+0.4*g));
    }`,
})
const ologrammi = []
function proietta(id, x, y, z, h, guarda) {
  const mat = ologramma.clone(); mat.uniforms.tinta.value = new THREE.Color(caso() < 0.5 ? '#5fd8ff' : '#ff6fd8')
  const m = new THREE.Mesh(new THREE.PlaneGeometry(h * 0.8, h), mat); m.position.set(x, y, z); m.lookAt(guarda.x, y, guarda.z)
  carica.load(`img/${id}.jpg`, t => { t.colorSpace = THREE.SRGBColorSpace; mat.uniforms.map.value = t })
  // il fascio dal pavimento
  const fascio = new THREE.Mesh(new THREE.ConeGeometry(h * 0.45, y - h / 2, 24, 1, true), new THREE.MeshBasicMaterial({ color: mat.uniforms.tinta.value, transparent: true, opacity: 0.07, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide }))
  fascio.position.set(x, (y - h / 2) / 2, z); fascio.rotation.x = Math.PI
  scena.add(m, fascio); ologrammi.push(mat); m.userData = { tipo: 'tavola', p: posDi.get(id) ?? { id, t: '' } }; cliccabili.push(m)
}
{
  const disco = new THREE.Mesh(new THREE.CylinderGeometry(58, 62, 1.2, 64), new THREE.MeshLambertMaterial({ color: new THREE.Color(BG).lerp(new THREE.Color(INK), 0.12) }))
  disco.position.set(P.x, 0.6, P.z); scena.add(disco)
  const titolo = scritta(D.nome ?? 'una città senza nome', { font: '700 64px Georgia, serif', alto: 14 }); titolo.position.set(P.x, 70, P.z); scena.add(titolo)
  const opere = (D.mostre[0]?.opere ?? []).filter(o => posDi.get(o.id)?.img)
  opere.forEach((o, i) => { const a = (i / Math.max(1, opere.length)) * Math.PI * 2; proietta(o.id, P.x + Math.cos(a) * 40, 34, P.z + Math.sin(a) * 40, 30, P) })
  // anche le tavole in piano possono avere il loro ologramma: in verticale sopra le ultime annotate
  const annotate = [...new Set(D.annotazioni.map(a => a.tavola))].map(id => posDi.get(id)).filter(p => p?.img).slice(-4)
  for (const p of annotate) proietta(p.id, X(p.x) + 10, 46, Z(p.y) + 10, 22, P)
  // i cantieri: impalcature attorno alla piazza
  D.cantieri.forEach((c, i) => { const a = 0.6 + i * 0.9, x = P.x + Math.cos(a) * 95, z = P.z + Math.sin(a) * 95; const h = 10 + c.passi.length * 6; const box = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(14, h, 14, 1, Math.max(1, c.passi.length), 1)), new THREE.LineBasicMaterial({ color: INK })); box.position.set(x, h / 2, z); scena.add(box); const s = scritta(`cantiere: ${c.cosa}`, { font: 'italic 34px Georgia, serif', alto: 5, largo: 520 }); s.position.set(x, h + 6, z); scena.add(s) })
}

// ── le annotazioni a penna: una nota sospesa e una freccia verso la tavola ─────────────────────────────────
for (const a of D.annotazioni.slice(-40)) {
  const p = posDi.get(a.tavola); if (!p) continue
  const x = X(p.x), z = Z(p.y), dx = (caso() - 0.5) * 40, dz = (caso() - 0.5) * 40, y = 42 + caso() * 30
  const s = scritta(`${nomeDi(a.chi)}: ${a.testo}`, { font: 'italic 32px "Comic Sans MS", "Segoe Print", "Bradley Hand", cursive', colore: ACC, alto: 6, largo: 600, ruota: (caso() - 0.5) * 0.12 })
  s.position.set(x + dx, y, z + dz); s.userData = { tipo: 'nota', a }; scena.add(s); cliccabili.push(s)
  const curva = new THREE.QuadraticBezierCurve3(new THREE.Vector3(x + dx, y - 4, z + dz), new THREE.Vector3(x + dx * 0.3, y * 0.8, z + dz * 0.3), new THREE.Vector3(x, p.img ? 22 : 2, z))
  scena.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(curva.getPoints(24)), new THREE.LineBasicMaterial({ color: ACC, transparent: true, opacity: 0.7 })))
}

// ── gli abitanti: piccole figure che vanno dalla loro casa alla piazza passando per le tavole che hanno visto ─
const passanti = []
for (const a of D.abitanti) {
  const col = a.tipo === 'mestiere' ? '#b4281e' : a.tipo === 'testa' ? '#1e3caa' : INK
  const corpo = new THREE.Group()
  const m = new THREE.MeshLambertMaterial({ color: col })
  const busto = new THREE.Mesh(new THREE.ConeGeometry(2.2, 7, 12), m); busto.position.y = 3.5
  const testa = new THREE.Mesh(new THREE.SphereGeometry(1.5, 12, 10), m); testa.position.y = 8.2
  const nome = scritta(a.nome, { font: '600 30px system-ui, sans-serif', alto: 3.2, colore: col }); nome.position.y = 12.5
  corpo.add(busto, testa, nome); scena.add(corpo)
  const via = [a.casa, ...a.visti.map(id => posDi.get(id)).filter(Boolean), D.piazza].map(p => new THREE.Vector3(X(p.x), 0, Z(p.y)))
  if (a.tipo === 'figura') via.splice(0, via.length, new THREE.Vector3(P.x + (caso() - 0.5) * 60, 0, P.z + (caso() - 0.5) * 60), new THREE.Vector3(P.x + (caso() - 0.5) * 60, 0, P.z + (caso() - 0.5) * 60))
  const curva = via.length >= 2 ? new THREE.CatmullRomCurve3(via) : null
  passanti.push({ corpo, curva, v: 0.012 + caso() * 0.01, fase: caso() })
  corpo.userData = { tipo: 'abitante', a }; cliccabili.push(busto); busto.userData = corpo.userData
}

// ── il pannello: il verbale dell'ultima giornata, le decisioni, l'officina, le sale ─────────────────────────
{
  const pan = document.getElementById('pannello'), G = D.giornate[0]
  let h = ''
  if (G) {
    h += `<h2>Giornata ${G.cittaGiorno}</h2>`
    let fase = ''
    for (const b of G.verbale) { if (b.fase !== fase) { fase = b.fase; h += `<div class="fase">${esc(fase)}</div>` } h += `<p class="b"><span class="chi">${esc(nomeDi(b.chi))}</span> ${esc(b.testo)}</p>` }
  }
  if (D.decisioni.length) h += `<h2>Decisioni</h2>` + D.decisioni.map(d => `<p class="b">${esc(d.cosa)} <i>(${esc(d.stato)}${d.esito ? `, ${esc(d.esito)}` : ''})</i></p>`).join('')
  if (D.officina.length) h += `<h2>Officina</h2>` + D.officina.map(o => `<p class="b"><span class="chi">${esc(o.nome)}</span> di ${esc(o.autore)}<br><code>${esc(o.testo)}</code></p>`).join('')
  if (D.cantieri.length) h += `<h2>Cantieri</h2>` + D.cantieri.map(c => `<p class="b">${esc(c.cosa)}<br>${c.passi.map(p => `· ${esc(p.testo)} (${esc(p.dove)}, ${esc(p.stato)})`).join('<br>')}</p>`).join('')
  if (D.mostre.length) h += `<h2>La mostra</h2>` + D.mostre[0].opere.map(o => `<p class="b">«${esc(o.titolo)}» — ${esc(o.perche)}</p>`).join('')
  pan.innerHTML = h || '<p>La città è appena nata.</p>'
  if (innerWidth < 700) pan.classList.add('chiuso')
  document.getElementById('apri').onclick = () => pan.classList.toggle('chiuso')
}

// ── toccare le cose ───────────────────────────────────────────────────────────────────────────────────────
const ray = new THREE.Raycaster(), mouse = new THREE.Vector2(), etichetta = document.getElementById('etichetta'), scheda = document.getElementById('scheda')
const colpito = e => { mouse.set(e.clientX / innerWidth * 2 - 1, -(e.clientY / innerHeight) * 2 + 1); ray.setFromCamera(mouse, cam); return ray.intersectObjects(cliccabili, false)[0]?.object }
cv.addEventListener('pointermove', e => {
  const o = colpito(e); if (!o) { etichetta.style.display = 'none'; return }
  const u = o.userData
  etichetta.textContent = u.tipo === 'tavola' ? `${u.p.t || 'tavola'} · giorno ${u.p.g ?? ''}` : u.tipo === 'nota' ? `${nomeDi(u.a.chi)}, giorno ${u.a.giorno}` : u.a ? `${u.a.nome} (${u.a.carica})` : ''
  etichetta.style.display = 'block'; etichetta.style.left = e.clientX + 14 + 'px'; etichetta.style.top = e.clientY + 10 + 'px'
})
let giu = null
cv.addEventListener('pointerdown', e => { giu = [e.clientX, e.clientY] })
cv.addEventListener('pointerup', e => {
  if (!giu || Math.hypot(e.clientX - giu[0], e.clientY - giu[1]) > 6) return
  const o = colpito(e); if (!o) { scheda.style.display = 'none'; return }
  const u = o.userData
  if (u.tipo === 'tavola') scheda.innerHTML = `${u.p.img ? `<img src="img/${u.p.id}.jpg" alt="">` : ''}<b>${esc(u.p.t)}</b><br>giorno ${u.p.g} · interesse ${Math.round((u.p.i ?? 0) * 100)}%<br><a href="giorni/${u.p.g}.html#${u.p.id}">la sua giornata →</a>`
  else if (u.tipo === 'nota') scheda.innerHTML = `<b>${esc(nomeDi(u.a.chi))}</b>, giorno ${u.a.giorno} della città<br>${esc(u.a.testo)}`
  else if (u.a) scheda.innerHTML = `<b>${esc(u.a.nome)}</b> — ${esc(u.a.carica)}<br>${u.a.n ? `${u.a.n} tavole nel suo insieme` : 'abita la piazza'}`
  scheda.style.display = 'block'
})

// ── il tempo ──────────────────────────────────────────────────────────────────────────────────────────────
const t0 = performance.now(), lento = matchMedia('(prefers-reduced-motion: reduce)').matches
function giro() {
  const t = (performance.now() - t0) / 1000
  for (const m of ologrammi) m.uniforms.t.value = t
  for (const p of passanti) {
    if (!p.curva) continue
    const u = lento ? p.fase : (Math.sin((t * p.v + p.fase) * Math.PI * 2) * 0.5 + 0.5) // avanti e indietro: casa → piazza → casa
    const q = p.curva.getPointAt(u), q2 = p.curva.getPointAt(Math.min(1, u + 0.002))
    p.corpo.position.copy(q); p.corpo.lookAt(q2.x, 0, q2.z)
  }
  ctl.update(); R.render(scena, cam); requestAnimationFrame(giro)
}
giro()
window.__citta = true
