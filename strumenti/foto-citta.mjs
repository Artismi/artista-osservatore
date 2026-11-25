import { chromium } from '/tmp/giro-repo/node_modules/playwright-core/index.mjs'
import { spawn } from 'node:child_process'
const srv = spawn('python3', ['-m', 'http.server', '3292'], { cwd: '/tmp/mem-citta', stdio: 'ignore' })
await new Promise(r => setTimeout(r, 1500))
const b = await chromium.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox', '--use-gl=swiftshader', '--enable-webgl', '--ignore-gpu-blocklist'] })
const p = await b.newPage({ viewport: { width: 1600, height: 1000 } })
p.on('pageerror', e => console.log('ERR', String(e).slice(0, 300)))
p.on('console', m => { if (m.type() === 'error' || m.type() === 'warning') console.log('C', m.text().slice(0, 200)) })
await p.goto('http://127.0.0.1:3292/citta.html')
await p.waitForFunction(() => window.__citta === true || window.__cittaErrore, null, { timeout: 180000 })
console.log(await p.evaluate(() => window.__cittaErrore || 'ok'))
await p.waitForTimeout(6000)
await p.screenshot({ path: '/tmp/terr/v4a.png' })
const btns = await p.$$('#indice button[data-c]'); if (btns[0]) { await btns[0].click(); await p.waitForTimeout(5000); await p.screenshot({ path: '/tmp/terr/v4b.png' }) }
await b.close(); srv.kill()
