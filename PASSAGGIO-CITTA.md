# Passaggio di consegne — Copibolo, la città interna

Ciao. Riprendi un lavoro avviato in un'altra chat. Leggi tutto prima di toccare codice.

## Chi e come
- Sono Andrea, designer e artista a Torino. Rispondimi in italiano: diretto, conciso, informale, senza muri di testo né troppa struttura. Correggo in tempo reale con messaggi brevi.
- **Progetto:** Copibolo (repo artista-osservatore, Instagram @esselave_osbrimi). È un agente artista procedurale che **non usa AI esterne**: ogni giorno fa tavole grafiche, le giudica e le pubblica.

## Regole che non si toccano
- **Mai chiedermi né maneggiare password o token.**
- **Niente AI esterne** dentro Copibolo.
- **Niente live senza il mio "vai live" esplicito.** Il giro live gira da `main` di `Artismi/artista-osservatore` (giro.yml, cron ogni 15 min). Lavora solo sul ramo `citta-interna` e non fare merge né push su `main`.
- **Non cancellare il lavoro vecchio.**
- **Attribuzione** quando servono i doodle: "Quick, Draw! Dataset — Google, CC BY 4.0".
- **stateyour:**
  - tutto nasce da leggi con una fonte, niente numeri messi a mano, mai allentare le soglie dei test;
  - la copia vendorizzata in `apps/artista/public/stateyour/camera/` non va modificata.

## Dove sta il lavoro (tutto su git, niente live)
- **Monorepo `Artismi/mader`, ramo `citta-interna`** (= `studio-agent` + 68 commit). Commit in testa: 88f74d6.
  - **Sorgente dell'agente:** `src/lib/studio-agent/`, sincronizzata con `node apps/artista/scripts/sync.mjs`. Il file `apps/artista/src/lib/studio-agent/giro.ts` esiste solo nell'app.
  - **Build:** `cd apps/artista && rm -rf .next && npx next build`, standalone.
- **Repo del giro `Artismi/artista-osservatore`, ramo `citta-interna`:**
  - pagina città: `citta.js` (client three r149 globale) e `citta.mjs` (genera `citta.html`/`citta.json` nella memoria);
  - `porto-vecchio/` (figure e vestiti, Quaternius CC0) e `app/` (build aggiornata);
  - `spunti/`: le immagini di riferimento, compresa `v2-sale-sospese-wireframe.png` (vedi sotto);
  - `strumenti/foto-citta.mjs`: screenshot della pagina servita in locale (playwright + chrome swiftshader, porta 3292; i percorsi /tmp vanno adattati).
- **Documento di progetto "Copibolo — la città interna":** https://claude.ai/artifact/SJ6hmaWWfxMSaKs9vShBRt (è un Doc). Ha tutte le sezioni filosofiche e di design. Leggilo con gli strumenti docs.
- **stateyour** (simulatore di universi, "madre dei generatori, biblioteca di Babele"):
  - repo `Artismi/stateyour`, ramo `claude/nice-galileo-diiwk4`;
  - leggi `PASSAGGIO.md`; il generatore di pattern sta in `pattern/`, Cristallo sul ramo `claude/pattern-cristallo`.

## Come provare in locale
1. Copia la build nel repo del giro: `.next/standalone/.next` → `app/.next`; `.next/static` → `app/.next/static`; `server.js` → `app/`; `public/.` → `app/public/`.
2. Prepara una memoria fresca: `git archive origin/memoria | tar -x -C /tmp/mem-citta`.
3. Lancia il giro: `MEMORIA=/tmp/mem-citta STUDI=0 SEQUENZA=no PUBBLICA=no BOTTEGA=no REEL=no node giro.mjs`. Con `OFFICINA=1` si forza l'officina.
4. Per vedere la pagina senza rifare il giro: copia `citta.js` nella memoria e lancia lo strumento foto.

## Cosa c'è già (funziona in locale)
- **Territorio:** concetti tf-idf + mani + feature visive, grafo kNN (i "fili"), layout di forze, quartieri Louvain.
- **Città** (`mind/citta.ts`):
  - **abitanti con carattere:** 8 mestieri, 6 teste, urbanista, archivio, saggista, curatore, 4 scienziati;
  - **ciclo giornaliero con salti fra celle:** cammino, piazza, biblioteca, ritorno, bottega, guardaroba, cantiere, sale, assemblea, archivio;
  - **sapere e decisioni:**
    - dibattito; saggisti che cercano su 23 fonti, mai provate in rete dal sandbox;
    - rete di memoria vettoriale con fiducia n/(n+8);
    - assemblea con voti e credito; decisioni verificate (frasi sospese, commissioni);
  - **officina:** programmi a catena di strumenti, rami tieni/butta/respinto.
- **Altri moduli:**
  - osservatorio (`mind/osservatorio.ts`): scienziati che usano stateyour `cosmo.js` per scoperte e ipotesi;
  - cantiere della città (`mind/cantiere_citta.ts`): sale, strade "come muffa", terreno coltivato che avanza su griglia 48×48, ponti, graffiti, rovine, nomi delle vie, correzioni dell'urbanista;
  - guardaroba: i vestiti di Porto Vecchio per carattere.
- **Sito città (`citta.js`, v7):**
  - camera ortografica assonometrica: 45° di imbardata, ~35° di inclinazione, trascina = sposta, destro = gira, rotella = zoom;
  - superficie infinita chiara e quasi piatta che sfuma attorno allo sguardo;
  - ogni tavola è un punto sul suolo e i 2 fili più forti e corti per tavola sono disegnati; archi neri tra sale con i concetti in comune; fili rossi tra tavole esposte legate;
  - sale ad angolo retto su basamenti (pianta, parete, colonna, strati), scostate perché non si sovrappongano;
  - figure di Porto Vecchio che camminano;
  - schede laterali: sala, tavola, piazza, verbale, osservatorio, abitante, "Come è cresciuta";
  - il monumento è un rilievo ricavato dalla luminosità della tavola.
- **Problemi noti:** gli archi partono ripidi dal centro del basamento; nella vista intera i nomi delle sale non si vedono.

## Storia delle mie reazioni sulla forma (in ordine)
1. Primo 3D "videogame vecchio": orribile. Va bene che gli agenti restino sfere di luce, il resto deve essere una mostra 3D/AR.
2. Poi: troppe linee di luce, pallini, bagliore; poca leggibilità; mancano titoli, pannelli, link.
3. Megastruttura sì, ma non piena e verticale: piani sovrapposti non si leggono. Meglio un diorama disteso che cresce come una muffa, aperto come un mondo, emergente: il "giardino dell'Eden della cognizione".
4. Niente modelli 3D di palazzi: erano una metafora.
5. Ancora troppo città, poco "castello mentale urbano di contesto". Dello spunto mi interessano solo la sensazione dello spazio e l'inquadratura assonometrica, non colori e geometrie.
6. **Niente modelli 3D importati** (alberi, sassi, pali): l'ambiente è fatto solo di immagini e codice, una superficie 3D infinita e modellabile. Il 3D, se c'è, viene dai generatori o da disegni resi 3D dal motore del sito.
7. Tavole a semicerchio sembrano buttate: servono disposizioni belle e leggibili, assonometriche, orizzontali o verticali. Gli abitanti tendono a rendere tutto più bello, completo, connesso e compreso. La mappa/rete dei concetti (il sistema vettoriale) è importante; il suolo conta meno.

## L'ultima indicazione (da fare adesso)
Riferimento: `spunti/v2-sale-sospese-wireframe.png`. Era una versione vecchia:
- sfondo nero, pavimento a griglia, volumi a fil di ferro con tavole luminose sospese dentro, abitanti come sfere di luce;
- leggeva male le immagini ma era più vicina all'idea, perché creava **spazi espositivi 3D flessibili**.

Cosa voglio adesso:
- **I solidi non sono solo muri con cose attaccate.** Sono anche **livelli**: piani a quote diverse su cui disporre, inclinare, illuminare, come nei livelli dei documenti/tavole a strati.
- **Ogni superficie e ogni area del pavimento è usabile** per un generatore, uno shader, un pattern decorativo o una composizione, come nelle tavole a livelli. **La città stessa è una tavola.**
- **Si interviene anche sulla forma dei solidi.** Cubi con pattern spigolosi che si scontrano agli spigoli non vanno: servono **smussi/raccordi** (bevel, fillet, superfici continue) per dipingere in modo omogeneo senza incontrare spigoli ovunque.
  - Pensa a volumi arrotondati o SDF, con una UV continua o proiezioni triplanari/levigate, così un pattern scorre sulla forma.
  - La forma la decidono gli abitanti (curatori, urbanista) e la disegnano con i generatori di Copibolo e di stateyour.
- **Tieni:** assonometria, rete dei concetti visibile, leggibilità delle tavole, schede e link.

## La mappa delle parole (aggiunta subito dopo)
- **Le parole (i concetti) sono oggetti tridimensionali nello spazio:** testo 3D, non etichette piatte.
- **Più una parola è importante, più è grande.** Per esempio: quante tavole la usano, quanti fili la attraversano, il peso tf-idf.
- **Accanto, se voluto, un paragrafo descrittivo**, scritto dagli abitanti (saggisti, archivio) con quello che sanno di quel concetto.
- **Le linee dei legami passano nell'aria** tra le parole, non solo sul suolo.
- **Le parole stanno a varie altezze, organizzate logicamente** come detto prima. La quota ha un senso: livello di astrazione, tempo, generalità, oppure strati del palazzo della memoria. La decidono gli abitanti e la si legge nel documento.
- **Le tavole stanno sotto e attorno alle loro parole**, così la città resta una mappa leggibile del sapere.

## Altre cose in sospeso
- **Abitanti che migliorano la città:** compito fisso nel cantiere (unire le tavole isolate, completare le sale, correggere sovrapposizioni, decidere forme e superfici).
- **Fotografo del cosmo:** fotografare il viewer vero di stateyour dentro il Chrome del giro per ricavare immagini, sfondi, mare, rocce e scene 3D da usare nelle tavole e nella città.
  - Il test in node di `superficiePianeta` ha dato un pianeta ghiacciato senza mare.
- **Tavole e strumenti:**
  - qualità del disegno, difetti dell'occhio, strumenti fluido e ascii, contorni geometrici;
  - filtri Risograph, Duotone e Holographic ancora rotti.
- **Curatori nel sito:** che spostano, decorano e concordano i confini tra sale.
- **Assemblea:** tema delle sequenze.
- **Al momento del "vai live":** merge dei rami `citta-interna` su `studio-agent`/`main` e aggiornamento di `app/` nel repo del giro.

Inizia leggendo il documento e i file indicati, guarda le immagini in `spunti/`, poi proponimi in due righe come intendi fare i solidi smussati e le superfici dipingibili, e procedi.
