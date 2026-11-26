// La città interna sul sito: una pagina 3D che si esplora (trascina per girare, rotella per avvicinarsi).
// Le tavole stanno dove le ha messe il territorio, i quartieri hanno il loro colore a terra, gli abitanti camminano
// dalla loro casa alla piazza, le annotazioni sono scritte a mano sopra le tavole, la mostra è un anello di ologrammi.
import { copyFileSync, existsSync, mkdirSync, readdirSync, writeFileSync } from 'node:fs'
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

/** i personaggi di Porto Vecchio: script e modelli accanto alla pagina (assets/mc è il percorso che si aspetta models.js) */
function portoVecchio(MEM) {
  const da = join(QUI, 'porto-vecchio')
  if (!existsSync(da)) return false
  mkdirSync(join(MEM, 'pv'), { recursive: true }); mkdirSync(join(MEM, 'assets/mc'), { recursive: true })
  for (const f of readdirSync(join(da, 'src'))) copyFileSync(join(da, 'src', f), join(MEM, 'pv', f))
  for (const f of readdirSync(join(da, 'assets/mc'))) if (!existsSync(join(MEM, 'assets/mc', f))) copyFileSync(join(da, 'assets/mc', f), join(MEM, 'assets/mc', f))
  return true
}

export function scriviCitta(MEM, C, img, s) {
  if (!C) return
  if (!portoVecchio(MEM)) { console.error('città: mancano i personaggi di Porto Vecchio, pagina non scritta'); return }
  copyFileSync(join(QUI, 'citta.js'), join(MEM, 'citta.js'))
  // ogni tavola con un'immagine: grande se è recente (img/), piccola per sempre (mini/)
  const mini = new Set(existsSync(join(MEM, 'mini')) ? readdirSync(join(MEM, 'mini')).map(f => f.replace(/\.jpg$/, '')) : [])
  const dati = { ...C, punti: C.punti.map(p => ({ ...p, img: img.has(p.id) ? 1 : 0, mini: mini.has(p.id) ? 1 : 0 })) }
  writeFileSync(join(MEM, 'citta.json'), JSON.stringify(dati))
  const st = s?.stile ?? {}
  const nome = C.nome ?? 'la città senza nome'
  const html = `<!doctype html><html lang="it"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(nome)} — ${esc(s?.nome ?? '')}</title>

<style>
html,body{margin:0;height:100%;overflow:hidden;background:#06070a;color:#e8e6e1;font:13px/1.5 'Inter','Helvetica Neue',system-ui,sans-serif}
canvas#mondo{position:fixed;inset:0;width:100vw;height:100vh;display:block}
.mono{font-family:'JetBrains Mono',ui-monospace,monospace}
header{position:fixed;left:24px;top:20px;z-index:6;max-width:420px}
header h1{margin:0 0 4px;font:500 22px/1.15 'Inter',system-ui,sans-serif;letter-spacing:.01em}
header p{margin:0;opacity:.62;font-size:12px}
header nav{margin-top:10px}header nav a{color:#e8e6e1;opacity:.55;text-decoration:none;margin-right:14px;font-size:11px;letter-spacing:.12em;text-transform:uppercase}header nav a:hover{opacity:1}
#indice{position:fixed;left:0;top:118px;bottom:0;width:250px;padding:0 0 20px 24px;overflow:auto;z-index:6;scrollbar-width:thin;background:linear-gradient(90deg,rgba(6,7,10,.92) 70%,rgba(6,7,10,0))}
header{background:linear-gradient(180deg,rgba(6,7,10,.85),rgba(6,7,10,0));padding-bottom:10px}
#indice h3{font:500 10px/1 'JetBrains Mono',monospace;letter-spacing:.22em;text-transform:uppercase;opacity:.45;margin:16px 0 8px}
#indice button{display:block;width:100%;text-align:left;background:none;border:0;border-left:1px solid rgba(255,255,255,.14);color:#e8e6e1;padding:5px 10px;cursor:pointer;font:13px/1.3 'Inter',system-ui,sans-serif;opacity:.78}
#indice button:hover,#indice button.qui{opacity:1;border-left-color:#e8e6e1}
#indice button small{display:block;opacity:.5;font-size:11px}
.et{position:fixed;left:0;top:0;z-index:5;pointer-events:none;transform:translate(-50%,-100%);white-space:nowrap;transition:opacity .25s}
.et{text-shadow:0 1px 5px rgba(0,0,0,.85)}.et .t{font:500 15px/1.2 'Inter',system-ui,sans-serif;letter-spacing:.01em}
.et .s{font-size:11px;opacity:.6;margin-top:2px}
.et.sala{pointer-events:auto;cursor:pointer;text-align:center;text-shadow:0 1px 6px rgba(0,0,0,.8)}
.et.nota{font:italic 15px/1.3 'Segoe Print','Bradley Hand','Comic Neue',cursive;color:#f1d9a8;white-space:normal;width:220px;opacity:.9}
.et.nota b{font-style:normal;font-family:'Inter',system-ui,sans-serif;font-size:10px;letter-spacing:.12em;text-transform:uppercase;opacity:.7;display:block}
#scheda{position:fixed;right:24px;top:24px;bottom:24px;width:min(420px,90vw);overflow:auto;z-index:7;background:rgba(12,13,17,.9);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.1);padding:22px;display:none}
#scheda img{width:100%;display:block;margin:0 0 14px}
#scheda h2{font:500 19px/1.25 'Inter',system-ui,sans-serif;margin:0 0 6px}
#scheda .meta{opacity:.5;font-size:11px;letter-spacing:.08em;text-transform:uppercase;margin-bottom:12px}
#scheda p{opacity:.85}#scheda a{color:#f1d9a8}
#scheda .chiudi{position:absolute;right:14px;top:10px;background:none;border:0;color:#e8e6e1;font-size:20px;cursor:pointer;opacity:.6}
#scheda .riga{border-top:1px solid rgba(255,255,255,.1);padding:8px 0}
#apri{position:fixed;right:24px;bottom:22px;z-index:6;font:500 11px 'JetBrains Mono',monospace;letter-spacing:.18em;text-transform:uppercase;background:rgba(12,13,17,.7);color:#e8e6e1;border:1px solid rgba(255,255,255,.25);padding:9px 13px;cursor:pointer}
#aiuto{position:fixed;left:50%;bottom:22px;transform:translateX(-50%);z-index:6;font-size:11px;opacity:.45;letter-spacing:.06em}
</style></head><body>
<canvas id="mondo"></canvas>
<header><h1>${esc(nome)}</h1><p>La città interna di ${esc(s?.nome ?? '')}: le sue tavole raccolte in sale secondo quello che hanno in comune, allestite dagli abitanti che le curano. Giorno ${C.giorno}.</p><nav><a href="index.html">parete</a><a href="archivio.html">opere</a><a href="diario.html">pensieri</a></nav></header>
<nav id="indice"></nav><div id="etichette"></div><aside id="scheda"></aside><button id="apri">il verbale di oggi</button><div id="aiuto">trascina per spostarti · col destro giri · rotella per avvicinarti · tocca una sala o una tavola</div>
<script src="pv/three.min.js"></script><script src="pv/gltf_loader.js"></script><script src="pv/animazioni.js"></script><script src="pv/anim_vita.js"></script><script src="pv/oggetti3d.js"></script><script src="pv/roba3d.js"></script><script src="pv/anim_lotta.js"></script><script src="pv/anim_mano.js"></script><script src="pv/anim_gesti.js"></script><script src="pv/models.js"></script><script src="pv/sartoria.js"></script><script src="pv/pittura.js"></script><script src="pv/vestiario.js"></script><script src="pv/personaggi.js"></script>
<script src="citta.js"></script>
</body></html>`
  writeFileSync(join(MEM, 'citta.html'), html)
}
