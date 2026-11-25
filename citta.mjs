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
  for (const f of ['controls/OrbitControls.js', 'postprocessing/EffectComposer.js', 'postprocessing/Pass.js', 'postprocessing/RenderPass.js', 'postprocessing/ShaderPass.js', 'postprocessing/MaskPass.js', 'postprocessing/UnrealBloomPass.js', 'postprocessing/OutputPass.js', 'shaders/CopyShader.js', 'shaders/LuminosityHighPassShader.js', 'shaders/OutputShader.js']) {
    mkdirSync(join(dove, dirname(f)), { recursive: true }); copyFileSync(join(base, 'examples/jsm', f), join(dove, f))
  }
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
html,body{margin:0;height:100%;overflow:hidden;background:#050608;color:#e9ecf1;font:12px/1.5 'JetBrains Mono',ui-monospace,monospace;letter-spacing:.02em}
canvas#mondo{position:fixed;inset:0;width:100vw;height:100vh;display:block}
header{position:fixed;left:22px;top:18px;z-index:5;pointer-events:none;text-transform:uppercase}header *{pointer-events:auto}
header h1{margin:0;font:300 20px/1.2 'JetBrains Mono',ui-monospace,monospace;letter-spacing:.32em}
header .sotto{opacity:.55;font-size:11px;letter-spacing:.18em}
header nav{margin-top:10px}header nav a{color:#e9ecf1;opacity:.6;text-decoration:none;margin-right:14px;font-size:11px;letter-spacing:.18em}header nav a:hover{opacity:1}
#pannello{position:fixed;right:0;top:0;bottom:0;width:min(360px,92vw);overflow:auto;background:rgba(8,10,14,.72);backdrop-filter:blur(14px);border-left:1px solid rgba(255,255,255,.12);padding:18px 20px;z-index:4;transition:transform .35s}
#pannello.chiuso{transform:translateX(100%)}
#pannello h2{font-weight:400;font-size:10px;letter-spacing:.3em;text-transform:uppercase;opacity:.6;margin:22px 0 8px;border-top:1px solid rgba(255,255,255,.12);padding-top:10px}
#pannello .b{margin:0 0 8px;opacity:.88}#pannello .chi{color:#9fe3ff}#pannello .fase{opacity:.4;font-size:10px;letter-spacing:.25em;text-transform:uppercase;margin-top:12px}
#pannello code{font-size:10px;opacity:.6;word-break:break-word}
#apri{position:fixed;right:16px;bottom:16px;z-index:6;font:11px 'JetBrains Mono',monospace;letter-spacing:.2em;text-transform:uppercase;background:transparent;color:#e9ecf1;border:1px solid rgba(255,255,255,.35);padding:8px 12px;cursor:pointer}
#scheda{position:fixed;left:22px;bottom:22px;z-index:6;max-width:min(380px,80vw);background:rgba(8,10,14,.8);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,.18);padding:12px;display:none}
#scheda img{width:100%;display:block;margin-bottom:8px}#scheda a{color:#9fe3ff}
#etichetta{position:fixed;pointer-events:none;z-index:7;border:1px solid rgba(255,255,255,.4);background:rgba(5,6,8,.75);padding:3px 7px;font-size:11px;display:none;max-width:320px}
</style></head><body>
<canvas id="mondo"></canvas>
<header><h1>${esc(nome)}</h1><span class="sotto">la città interna di ${esc(s?.nome ?? '')} · giorno ${C.giorno}</span><br><nav><a href="index.html">parete</a><a href="archivio.html">opere</a><a href="diario.html">pensieri</a></nav></header>
<aside id="pannello"></aside><button id="apri">verbale</button><div id="scheda"></div><div id="etichetta"></div>
<script type="module" src="citta.js"></script>
</body></html>`
  writeFileSync(join(MEM, 'citta.html'), html)
}
