// La città interna sul sito: una pagina 3D che si esplora (trascina per girare, rotella per avvicinarsi).
// Le tavole stanno dove le ha messe il territorio, i quartieri hanno il loro colore a terra, gli abitanti camminano
// dalla loro casa alla piazza, le annotazioni sono scritte a mano sopra le tavole, la mostra è un anello di ologrammi.
import { copyFileSync, existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createRequire } from 'node:module'

const QUI = dirname(fileURLToPath(import.meta.url))
const esc = t => String(t ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]))

/** cerca three nei node_modules (del giro o dell'app) e lo copia accanto alla pagina */
function vendor(MEM) {
  const dove = join(MEM, 'vendor'); mkdirSync(dove, { recursive: true })
  let base = null
  for (const p of [join(QUI, 'node_modules/three'), join(QUI, 'app/node_modules/three')]) if (existsSync(join(p, 'build/three.module.min.js'))) { base = p; break }
  if (!base) { try { base = dirname(dirname(createRequire(import.meta.url).resolve('three'))) } catch { /* niente */ } }
  if (!base) return false
  for (const f of ['three.module.min.js', 'three.core.min.js']) copyFileSync(join(base, 'build', f), join(dove, f))
  copyFileSync(join(base, 'examples/jsm/controls/OrbitControls.js'), join(dove, 'OrbitControls.js'))
  return true
}

export function scriviCitta(MEM, C, img, s) {
  if (!C) return
  if (!vendor(MEM)) { console.error('città: three non trovato, pagina non scritta'); return }
  copyFileSync(join(QUI, 'citta.js'), join(MEM, 'citta.js'))
  const dati = { ...C, punti: C.punti.map(p => ({ ...p, img: img.has(p.id) ? 1 : 0 })) }
  writeFileSync(join(MEM, 'citta.json'), JSON.stringify(dati))
  const st = s?.stile ?? {}
  const nome = C.nome ?? 'la città senza nome'
  const html = `<!doctype html><html lang="it"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(nome)} — ${esc(s?.nome ?? '')}</title>
<script type="importmap">{"imports":{"three":"./vendor/three.module.min.js","three/addons/":"./vendor/"}}</script>
<style>
:root{--bg:${st.bg ?? '#ebe6dc'};--ink:${st.ink ?? '#121212'};--acc:${st.acc ?? '#e3361b'}}
html,body{margin:0;height:100%;overflow:hidden;background:var(--bg);color:var(--ink);font:14px/1.45 'JetBrains Mono',ui-monospace,monospace}
canvas#mondo{position:fixed;inset:0;width:100vw;height:100vh;display:block}
header{position:fixed;left:16px;top:12px;z-index:5;pointer-events:none}header *{pointer-events:auto}
header h1{margin:0;font:700 26px/1.1 ${st.titoli ? `'${st.titoli}',` : ''}system-ui,sans-serif;background:var(--bg);display:inline-block;padding:2px 8px}
header .sotto{background:var(--bg);display:inline-block;padding:2px 8px;margin-top:4px}
header nav a{color:var(--ink);background:var(--bg);padding:2px 6px;margin-right:4px}
#pannello{position:fixed;right:0;top:0;bottom:0;width:min(380px,92vw);overflow:auto;background:color-mix(in srgb,var(--bg) 92%,transparent);border-left:1px solid var(--ink);padding:14px 16px;z-index:4;transform:translateX(0);transition:transform .3s}
#pannello.chiuso{transform:translateX(100%)}
#pannello h2{font-size:13px;letter-spacing:.06em;text-transform:uppercase;margin:18px 0 6px}
#pannello .b{margin:0 0 7px}#pannello .chi{font-weight:700}#pannello .fase{opacity:.55;font-size:11px;text-transform:uppercase;margin-top:10px}
#apri{position:fixed;right:12px;bottom:12px;z-index:6;font:inherit;background:var(--ink);color:var(--bg);border:0;padding:8px 12px;cursor:pointer}
#scheda{position:fixed;left:16px;bottom:16px;z-index:6;max-width:min(420px,80vw);background:var(--bg);border:1px solid var(--ink);padding:10px;display:none}
#scheda img{width:100%;display:block;margin-bottom:6px}
#etichetta{position:fixed;pointer-events:none;z-index:7;background:var(--ink);color:var(--bg);padding:2px 6px;font-size:12px;display:none;max-width:320px}
</style></head><body>
<canvas id="mondo"></canvas>
<header><h1>${esc(nome)}</h1><br><span class="sotto">la città interna di ${esc(s?.nome ?? '')} · giorno ${C.giorno}</span><br><nav><a href="index.html">parete</a><a href="archivio.html">opere</a><a href="diario.html">pensieri</a></nav></header>
<aside id="pannello"></aside><button id="apri">verbale</button><div id="scheda"></div><div id="etichetta"></div>
<script type="module" src="citta.js"></script>
</body></html>`
  writeFileSync(join(MEM, 'citta.html'), html)
}
