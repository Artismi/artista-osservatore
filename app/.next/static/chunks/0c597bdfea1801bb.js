(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,55088,e=>{"use strict";let a=["Normale","Moltiplica","Schermo","Sovrapponi","Luce soffusa","Aggiungi","Colore scherma","Colore"],o=(e,a=0)=>"number"==typeof e?e:Number(e??a)||a,t=(e,a,o,t,i)=>({key:e,label:a,type:"range",min:o,max:t,def:i}),i=(e,a,o)=>({key:e,label:a,type:"color",def:o}),l=(e,a,o=0)=>({key:e,label:a,type:"toggle",def:o}),r=(e,a,o,t=0)=>({key:e,label:a,type:"select",options:o,def:t}),c=[{id:"material3d",label:"Materiale 3D",cat:"3D",hint:"estrusione o gonfiaggio con riflessi: cromo, oro, vetro, plastica…",animated:!0,pad:e=>.9*o(e.depth,40)+o(e.bevel,6)+14,params:[r("material","Materiale",["Plastica lucida","Cromo","Oro","Vetro","Ceramica","Olografico","Metallo colorato"],1),r("shape","Forma",["Estrusa","Gonfia"],0),r("env","Ambiente",["Studio","Tramonto","Notte neon","Cielo"],0),t("depth","Spessore",2,200,40),t("bevel","Smusso",0,40,6),t("rx","Inclinazione",-70,70,18),t("ry","Rotazione",-70,70,-24),t("persp","Prospettiva",0,100,40),t("light","Luce",0,360,220),t("rough","Ruvidità",0,100,30),l("useColor","Colore proprio",0),i("color","Colore","#ff5a36"),t("spin","Rotazione continua",0,100,0)],variants:[{id:"cromo",label:"Cromo",p:{material:1,shape:0,env:3,depth:34,bevel:7}},{id:"studio",label:"Cromo studio",p:{material:1,shape:0,env:0,depth:34,bevel:9}},{id:"oro",label:"Oro",p:{material:2,shape:0,env:3,depth:34,bevel:8}},{id:"gonfio",label:"Gonfiabile",p:{material:0,shape:1,env:0,depth:60,bevel:14,rough:20}},{id:"vetro",label:"Vetro",p:{material:3,shape:0,env:3,depth:30,bevel:10}},{id:"olografico",label:"Olografico",p:{material:5,shape:1,env:0,depth:46,bevel:12}},{id:"ceramica",label:"Ceramica",p:{material:4,shape:0,env:0,depth:42,bevel:4,rough:70}},{id:"neon",label:"Metallo neon",p:{material:6,shape:0,env:2,depth:30,bevel:8}},{id:"tramonto",label:"Cromo tramonto",p:{material:1,shape:1,env:1,depth:50,bevel:12}}]},{id:"genFill",label:"Riempimento",cat:"Generativo",hint:"gradiente mesh, aurora, marmo, grana, topografia, bolle",animated:!0,params:[r("mode","Tipo",["Gradiente mesh","Aurora","Marmo liquido","Grana sfumata","Topografia","Bolle"],0),i("c1","Colore 1","#ff6b6b"),i("c2","Colore 2","#ffd93d"),i("c3","Colore 3","#6bcBef"),i("c4","Colore 4","#4d2c91"),t("scale","Scala",20,300,100),t("warp","Movimento forme",0,100,50),t("grain","Grana",0,100,20),t("keep","Conserva originale",0,100,0),t("speed","Animazione",0,100,0)],variants:[{id:"pesca",label:"Pesca",p:{mode:0,c1:"#ff9a8b",c2:"#ffd3a5",c3:"#a18cd1",c4:"#fbc2eb"}},{id:"aurora",label:"Aurora",p:{mode:1,c1:"#2cffb4",c2:"#7a5cff",c3:"#ffffff",c4:"#070b1f",grain:15}},{id:"marmo",label:"Marmo",p:{mode:2,c1:"#0f0c29",c2:"#ff6ec4",c3:"#7873f5",c4:"#f9f586",warp:70}},{id:"grana",label:"Grana",p:{mode:3,c1:"#ff5f6d",c2:"#ffc371",c3:"#6a82fb",c4:"#fc5c7d",grain:60}},{id:"topo",label:"Topografia",p:{mode:4,c1:"#f2efe6",c2:"#f2efe6",c3:"#1e3a5f",c4:"#13243b",warp:40}},{id:"bolle",label:"Bolle",p:{mode:5,c1:"#ff7eb3",c2:"#ffd0e0",c3:"#7afcff",c4:"#20124d"}},{id:"notte",label:"Notte",p:{mode:0,c1:"#0b1d51",c2:"#8c1eff",c3:"#ff2975",c4:"#00e5ff",grain:25}},{id:"menta",label:"Menta",p:{mode:3,c1:"#d4fc79",c2:"#96e6a1",c3:"#43cea2",c4:"#185a9d",grain:45}}]},{id:"dropShadow",label:"Ombra",cat:"Stile",hint:"ombra proiettata con distanza, espansione e morbidezza",noAmount:!0,pad:e=>o(e.distance,12)+o(e.spread)+1.3*o(e.size,20),params:[i("color","Colore","#000000"),t("opacity","Opacità",0,100,35),t("angle","Direzione",0,360,90),t("distance","Distanza",0,200,12),t("spread","Espansione",0,60,0),t("size","Morbidezza",0,120,20)],variants:[{id:"morbida",label:"Morbida",p:{opacity:30,distance:10,size:24,spread:0,color:"#000000"}},{id:"contatto",label:"Contatto",p:{opacity:45,distance:3,size:8,spread:0,color:"#000000"}},{id:"sollevata",label:"Sollevata",p:{opacity:28,distance:30,size:55,spread:0,color:"#1b1530"}},{id:"netta",label:"Netta",p:{opacity:100,distance:8,size:0,spread:0,color:"#111111",angle:45}},{id:"retro",label:"Retrò",p:{opacity:100,distance:10,size:0,spread:0,color:"#1d1a6e",angle:45}},{id:"colorata",label:"Colorata",p:{opacity:60,distance:14,size:28,spread:0,color:"#7c3aed"}}]},{id:"innerShadow",label:"Ombra interna",cat:"Stile",hint:"incavo: l’oggetto sembra scavato",noAmount:!0,params:[i("color","Colore","#000000"),t("opacity","Opacità",0,100,45),t("angle","Direzione",0,360,120),t("distance","Distanza",0,60,6),t("choke","Riduzione",0,40,0),t("size","Morbidezza",0,60,10)],variants:[{id:"incavo",label:"Incavo",p:{opacity:45,distance:6,size:10}},{id:"stampato",label:"Stampato",p:{opacity:70,distance:2,size:3}},{id:"profondo",label:"Profondo",p:{opacity:60,distance:14,size:24}},{id:"luce",label:"Luce interna",p:{opacity:55,distance:4,size:6,color:"#ffffff",angle:300}}]},{id:"outerGlow",label:"Bagliore",cat:"Stile",hint:"alone di luce attorno alla forma, anche a due colori",noAmount:!0,pad:e=>o(e.spread)+1.4*o(e.size,24),params:[i("color","Colore","#ffd166"),i("color2","Colore esterno","#ff6b6b"),l("two","Due colori",0),t("opacity","Opacità",0,100,80),t("spread","Espansione",0,40,0),t("size","Ampiezza",2,150,24)],variants:[{id:"caldo",label:"Caldo",p:{color:"#ffd166",two:0,size:24,opacity:80}},{id:"aura",label:"Aura",p:{color:"#ffffff",color2:"#a78bfa",two:1,size:70,opacity:70}},{id:"fuoco",label:"Fuoco",p:{color:"#fff3b0",color2:"#ff3d00",two:1,size:40,opacity:90}},{id:"ghiaccio",label:"Ghiaccio",p:{color:"#e0fbff",color2:"#00b4ff",two:1,size:34,opacity:85}},{id:"alone",label:"Alone stretto",p:{color:"#ffffff",two:0,size:8,spread:3,opacity:90}}]},{id:"innerGlow",label:"Bagliore interno",cat:"Stile",hint:"luce che parte dai bordi o dal centro",noAmount:!0,params:[i("color","Colore","#fff3c4"),t("opacity","Opacità",0,100,55),r("source","Origine",["Bordi","Centro"],0),t("choke","Riduzione",0,40,0),t("size","Ampiezza",1,80,5)],variants:[{id:"bordi",label:"Bordi",p:{source:0,size:5,opacity:55}},{id:"centro",label:"Centro",p:{source:1,size:12,opacity:45}},{id:"vetro",label:"Vetro",p:{source:0,size:3,color:"#ffffff",opacity:80}}]},{id:"bevel",label:"Rilievo",cat:"Stile",hint:"smusso con luce e ombra: plastica, metallo, cuscino",noAmount:!0,pad:e=>1===o(e.style)||2===o(e.style)?o(e.size,10)+2:0,params:[r("style","Stile",["Smusso interno","Smusso esterno","Rilievo","Cuscino"],0),r("technique","Tecnica",["Morbida","Scolpita"],0),t("depth","Profondità",1,300,100),t("size","Dimensione",1,60,10),t("soften","Ammorbidisci",0,20,2),t("angle","Luce · direzione",0,360,120),t("altitude","Luce · altezza",5,85,32),t("gloss","Lucido",0,100,0),i("hiColor","Colore luce","#ffffff"),t("hiOpacity","Opacità luce",0,100,75),i("shColor","Colore ombra","#000000"),t("shOpacity","Opacità ombra",0,100,60)],variants:[{id:"morbido",label:"Morbido",p:{style:0,technique:0,size:10,depth:100,gloss:0}},{id:"scolpito",label:"Scolpito",p:{style:0,technique:1,size:8,depth:160}},{id:"cuscino",label:"Cuscino",p:{style:3,technique:0,size:10,depth:120}},{id:"rilievo",label:"Rilievo",p:{style:2,technique:0,size:6,depth:140}},{id:"metallo",label:"Metallo",p:{style:0,technique:1,size:12,depth:220,gloss:70,hiColor:"#fff8e1",shColor:"#3b2a12",hiOpacity:90,shOpacity:70}},{id:"gonfio",label:"Gonfio",p:{style:0,technique:0,size:30,depth:80,soften:6,altitude:45}}]},{id:"stroke",label:"Contorno",cat:"Stile",hint:"bordo nitido fuori, dentro o al centro, anche sfumato",noAmount:!0,pad:e=>2===o(e.position)?0:o(e.size,6)+2,params:[r("position","Posizione",["Esterno","Centrato","Interno"],0),t("size","Spessore",1,80,6),i("color","Colore","#ffffff"),l("gradient","Sfumato",0),i("color2","Colore 2","#7c3aed"),t("gangle","Angolo sfumatura",0,360,90),t("opacity","Opacità",0,100,100)],variants:[{id:"sottile",label:"Sottile",p:{position:0,size:2,color:"#111111",gradient:0}},{id:"adesivo",label:"Adesivo",p:{position:0,size:16,color:"#ffffff",gradient:0}},{id:"spesso",label:"Spesso",p:{position:0,size:10,color:"#111111",gradient:0}},{id:"sfumato",label:"Sfumato",p:{position:0,size:8,color:"#ff5f6d",color2:"#ffc371",gradient:1}},{id:"interno",label:"Interno",p:{position:2,size:4,color:"#ffffff",gradient:0}}]},{id:"satin",label:"Raso",cat:"Stile",hint:"riflessi morbidi all’interno, come tessuto lucido",noAmount:!0,params:[i("color","Colore","#000000"),t("opacity","Opacità",0,100,40),t("angle","Angolo",0,360,19),t("distance","Distanza",1,100,14),t("size","Morbidezza",1,80,16),l("invert","Inverti",0)],variants:[{id:"scuro",label:"Scuro",p:{color:"#000000",opacity:40}},{id:"chiaro",label:"Chiaro",p:{color:"#ffffff",opacity:45,invert:1}},{id:"seta",label:"Seta",p:{color:"#3a1a5e",opacity:50,distance:24,size:30}}]},{id:"colorOverlay",label:"Colore",cat:"Stile",hint:"ricolora l’oggetto con un modo di fusione",noAmount:!0,params:[i("color","Colore","#ff5a5f"),r("blend","Fusione",a,0),t("opacity","Opacità",0,100,100)],variants:[{id:"pieno",label:"Pieno",p:{blend:0,opacity:100}},{id:"tinta",label:"Tinta",p:{blend:7,opacity:100}},{id:"velo",label:"Velo",p:{blend:4,opacity:70}}]},{id:"gradientOverlay",label:"Sfumatura",cat:"Stile",hint:"sfumatura lineare, radiale o riflessa sopra l’oggetto",noAmount:!0,params:[i("c1","Colore 1","#ff5f6d"),i("c2","Colore 2","#ffc371"),l("three","Tre colori",0),i("c3","Colore 3","#ffffff"),r("type","Tipo",["Lineare","Radiale","Riflessa","Conica"],0),t("angle","Angolo",0,360,90),t("scale","Scala",20,200,100),r("blend","Fusione",a,0),t("opacity","Opacità",0,100,100)],variants:[{id:"tramonto",label:"Tramonto",p:{c1:"#ff5f6d",c2:"#ffc371",three:0,type:0}},{id:"oceano",label:"Oceano",p:{c1:"#1a2a6c",c2:"#2bc0e4",three:0,type:0}},{id:"aurora",label:"Aurora",p:{c1:"#7f00ff",c2:"#00ffd5",c3:"#e1ff00",three:1,type:0,angle:120}},{id:"oro",label:"Oro",p:{c1:"#7a5310",c2:"#fff1b8",c3:"#b8860b",three:1,type:2,angle:90}},{id:"cromo",label:"Cromo",p:{c1:"#4a4a4a",c2:"#ffffff",c3:"#8a8a8a",three:1,type:2,angle:100}},{id:"olografico",label:"Olografico",p:{c1:"#ff9a9e",c2:"#a1c4fd",c3:"#c2ffd8",three:1,type:3}}]},{id:"textureOverlay",label:"Texture",cat:"Stile",hint:"carta, tela, grana o cemento sopra l’oggetto",noAmount:!0,params:[r("kind","Materiale",["Grana","Carta","Tela","Cemento","Graffi"],1),t("scale","Scala",10,300,100),r("blend","Fusione",a,3),t("opacity","Opacità",0,100,60)],variants:[{id:"carta",label:"Carta",p:{kind:1,blend:1,opacity:55}},{id:"tela",label:"Tela",p:{kind:2,blend:3,opacity:50}},{id:"grana",label:"Grana",p:{kind:0,blend:3,opacity:45}},{id:"cemento",label:"Cemento",p:{kind:3,blend:1,opacity:60}},{id:"graffi",label:"Usurato",p:{kind:4,blend:2,opacity:55}}]},{id:"neon",label:"Neon",cat:"Testo",hint:"tubo di luce: nucleo chiaro e alone a più strati",animated:!0,pad:e=>2.6*o(e.size,18),params:[i("color","Colore","#ff3cac"),t("size","Alone",2,80,18),t("intensity","Intensità",0,100,75),t("tube","Nucleo chiaro",0,100,65),t("flicker","Sfarfallio",0,100,0)],variants:[{id:"rosa",label:"Rosa",p:{color:"#ff3cac"}},{id:"ciano",label:"Ciano",p:{color:"#22f1ff"}},{id:"viola",label:"Viola",p:{color:"#9b5cff"}},{id:"acido",label:"Acido",p:{color:"#7dff3c"}},{id:"ambra",label:"Ambra",p:{color:"#ffb000"}},{id:"insegna",label:"Insegna",p:{color:"#ff2d55",flicker:35,intensity:85}}]},{id:"echo",label:"Eco",cat:"Testo",hint:"copie ripetute che sfumano dietro l’oggetto",pad:e=>o(e.count,4)*o(e.distance,8),params:[t("count","Copie",1,10,4),t("distance","Distanza",1,60,8),t("angle","Direzione",0,360,315),l("useColor","Colore proprio",0),i("color","Colore","#7c3aed"),t("fade","Dissolvenza",0,100,70)],variants:[{id:"scia",label:"Scia",p:{count:5,distance:6,useColor:0,fade:75}},{id:"colore",label:"Colorata",p:{count:3,distance:10,useColor:1,color:"#ff5a5f",fade:40}},{id:"pop",label:"Pop",p:{count:2,distance:14,useColor:1,color:"#00c2ff",fade:0,angle:45}}]},{id:"impressione",label:"Impressione",cat:"Stampa",hint:"testo impresso a secco, in rilievo, in lamina o a inchiostro su carta, pietra, pelle veri",pad:e=>o(e.mode)>3.5?0:3*o(e.size,8)+8,params:[r("mode","Tecnica",["A secco","In rilievo","Lamina","Inchiostro","Solo materiale"],0),r("material","Materiale",["Carta bianca","Carta grigia","Carta stropicciata","Cartoncino avana","Carta kraft","Carta paglia","Gesso","Intonaco","Cemento scuro","Marmo nero","Pelle","Tela","Metallo spazzolato","Metallo bianco","Lamina","Plastica"],0),i("tint","Tinta","#ffffff"),t("depth","Profondità",0,100,60),t("size","Smusso",1,30,8),t("light","Luce",0,360,135),t("micro","Grana materiale",0,100,60),t("scene","Luce di scena",0,100,60),t("scale","Scala materiale",30,300,100),i("ink","Inchiostro","#1d2a6b"),i("c1","Lamina scura","#6b4a10"),i("c2","Lamina chiara","#ffe9a8")],variants:[{id:"secco",label:"A secco su carta",p:{mode:0,material:0,size:9,depth:75}},{id:"rilievo",label:"Rilievo su gesso",p:{mode:1,material:6,depth:70,size:10}},{id:"oro",label:"Oro su carta",p:{mode:2,material:3,depth:40}},{id:"argento",label:"Argento su nero",p:{mode:2,material:9,depth:40,c1:"#4c4f57",c2:"#f4f6fa"}},{id:"pietra",label:"Inciso nella pietra",p:{mode:0,material:7,depth:95,size:12}},{id:"pelle",label:"Marchio su pelle",p:{mode:0,material:10,depth:85,size:7}},{id:"timbro",label:"Timbro su kraft",p:{mode:3,material:4,ink:"#1a1a1a",depth:25}}]},{id:"foil",label:"Lamina",cat:"Testo",hint:"lamina metallica stropicciata con smusso e riflessi",params:[i("c1","Ombra metallo","#7a5310"),i("c2","Luce metallo","#fff1b8"),t("crinkle","Stropicciatura",0,100,60),t("bevel","Smusso",0,20,4),t("light","Luce",0,360,220)],variants:[{id:"oro",label:"Oro",p:{c1:"#6b4a10",c2:"#ffe9a8"}},{id:"argento",label:"Argento",p:{c1:"#4c4f57",c2:"#f4f6fa"}},{id:"rame",label:"Rame",p:{c1:"#5a2412",c2:"#ffc29a"}},{id:"rosa",label:"Oro rosa",p:{c1:"#6e3b3b",c2:"#ffd9cf"}},{id:"olografico",label:"Olografica",p:{c1:"#5b6cff",c2:"#ffd1f4",crinkle:80}}]},{id:"stitch",label:"Ricamo",cat:"Testo",hint:"fili in diagonale e punto filo lungo il bordo, come una toppa",params:[l("useColor","Colore filo proprio",0),i("color","Filo","#e94f37"),i("stitch","Cucitura","#fff4e0"),t("density","Densità fili",20,140,70),t("inset","Distanza cucitura",2,14,5)],variants:[{id:"toppa",label:"Toppa",p:{}},{id:"fine",label:"Fine",p:{density:120,inset:3}},{id:"denim",label:"Denim",p:{useColor:1,color:"#2b4a7a",stitch:"#f2b84b"}}]},{id:"vetro",label:"Vetro scanalato",cat:"Ottica",hint:"ogni costa è una lente: rimpicciolisce e capovolge ciò che c’è dietro, con dispersione e satinatura",params:[t("width","Larghezza coste",4,120,22),t("strength","Lente",0,100,45),t("angle","Inclinazione",-90,90,0),t("dispersion","Dispersione colori",0,100,25),t("frost","Satinatura",0,100,25),t("highlight","Riflesso",0,100,45),t("shade","Volume coste",0,100,55)],variants:[{id:"porta",label:"Porta a righe",p:{}},{id:"fine",label:"Cannettato fine",p:{width:9,strength:60,frost:15}},{id:"larghe",label:"Coste larghe",p:{width:64,strength:70,highlight:60,dispersion:45}},{id:"satinato",label:"Satinato",p:{width:16,strength:35,frost:75,dispersion:10}},{id:"prisma",label:"Prisma",p:{width:30,strength:85,dispersion:100,angle:20}}]},{id:"specchi",label:"Mosaico a specchio",cat:"Ottica",hint:"tessere che rifrangono e riflettono, con fughe e luce propria",params:[t("size","Tessere",6,200,26),t("refraction","Rifrazione",0,100,35),t("grout","Fughe",0,30,6),i("groutColor","Colore fughe","#1a1a1a"),t("gloss","Lucentezza",0,100,50)],variants:[{id:"specchi",label:"Specchi",p:{}},{id:"ceramica",label:"Ceramica",p:{size:22,refraction:12,grout:12,groutColor:"#efe9df",gloss:70}},{id:"pixel",label:"Pixel rotti",p:{size:14,refraction:80,grout:0}}]},{id:"caleido",label:"Caleidoscopio",cat:"Ottica",hint:"un frammento ripetuto e specchiato attorno al centro",params:[t("segments","Spicchi",2,24,8),t("rotation","Rotazione",0,360,0),t("zoom","Zoom",20,300,100),t("cx","Centro X",0,100,50),t("cy","Centro Y",0,100,50)],variants:[{id:"sei",label:"Sei spicchi",p:{segments:6}},{id:"otto",label:"Otto",p:{segments:8}},{id:"specchio",label:"Specchio doppio",p:{segments:2}},{id:"rosone",label:"Rosone",p:{segments:16,zoom:60}}]},{id:"luceProiettata",label:"Luce proiettata",cat:"Luce",hint:"ombre di finestra, di foglie o caustiche d’acqua, come una luce vera nella stanza",params:[r("mode","Sorgente",["Finestra","Foglie","Caustiche"],0),t("angle","Angolo",-90,90,20),t("scale","Scala",30,300,100),t("soft","Morbidezza",0,100,50),t("strength","Intensità",0,100,70),i("warm","Calore luce","#ffd9a0")],variants:[{id:"finestra",label:"Finestra",p:{mode:0}},{id:"foglie",label:"Foglie",p:{mode:1}},{id:"acqua",label:"Caustiche",p:{mode:2,warm:"#bfe9ff",strength:60}},{id:"tramonto",label:"Finestra al tramonto",p:{mode:0,warm:"#ff9a4a",angle:35,strength:85}}]},{id:"colata",label:"Colatura",cat:"Luce",hint:"il colore cola in scie lunghe che sfumano, come un liquido o un neon che scivola",pad:e=>o(e.length,260)+10,params:[t("length","Lunghezza",20,900,260),t("angle","Direzione",0,360,90),t("fade","Dissolvenza",5,100,60),t("wobble","Ondulazione",0,100,30),t("glow","Bagliore",0,100,50),t("spectrum","Spettro",0,100,0)],variants:[{id:"giu",label:"Cola giù",p:{angle:90,length:320}},{id:"lunga",label:"Scia lunga",p:{angle:90,length:700,fade:35}},{id:"spettro",label:"Spettro",p:{angle:90,length:520,fade:45,spectrum:85,glow:80,wobble:20}},{id:"su",label:"Fiamma su",p:{angle:270,length:300,wobble:70}},{id:"lato",label:"Velocità",p:{angle:180,length:420,wobble:0,fade:50}}]},{id:"raggi",label:"Raggi di luce",cat:"Luce",hint:"fasci di luce che escono dalle lettere, radiali o orizzontali",pad:()=>220,params:[r("mode","Tipo",["Radiali","Orizzontali"],0),i("color","Colore","#7ab8ff"),t("intensity","Intensità",0,100,70),t("length","Lunghezza",5,100,60),t("cx","Centro X",0,100,50),t("cy","Centro Y",0,100,50)],variants:[{id:"blu",label:"Blu",p:{color:"#5aa2ff"}},{id:"oro",label:"Oro",p:{color:"#ffb547"}},{id:"acido",label:"Esplosione acida",p:{mode:0,color:"#9dff3c",length:75,intensity:85}},{id:"scia",label:"Scia orizzontale",p:{mode:1,color:"#ffffff",length:70}},{id:"fuoco",label:"Fuoco",p:{color:"#ff5a1f",intensity:85}}]},{id:"glitter",label:"Glitter",cat:"Testo",hint:"lettere fatte di scaglie che brillano, con polvere attorno",pad:()=>60,params:[l("useColor","Colore proprio",1),i("color","Colore","#c9ccd6"),t("size","Grana",1,12,4),t("sparkle","Scintille",0,100,70),t("dust","Polvere",0,100,50)],variants:[{id:"argento",label:"Argento",p:{color:"#c9ccd6"}},{id:"oro",label:"Oro",p:{color:"#d9b45a"}},{id:"rosa",label:"Rosa",p:{color:"#f2a1c7"}},{id:"nero",label:"Nero",p:{color:"#3a3a44",sparkle:90}}]},{id:"ascii",label:"ASCII",cat:"Schermo",hint:"la foto ridisegnata in caratteri: tono, contorni orientati, celle vuote nei neri, colore e bagliore",params:[t("style","Forza dello stile",0,100,65),t("cell","Corpo carattere",3,40,7),r("mode","Fondo",["Foto sfocata","Tinta piena","Carta","Trasparente"],0),r("charset","Caratteri",["Scala fine","Denso","Blocchi","Binario","Punti","Barre","Classico","Braille","Geometrici"],0),t("cutoff","Soglia del nero",0,80,18),t("glow","Bagliore",0,100,45),t("split","Sdoppiamento RGB",0,20,0),t("color","Colore della foto",0,100,100),t("saturation","Contrasto colore",0,100,60),t("brightness","Luminosità",-40,40,0),t("under","Fondo · intensità",0,100,55),t("backBlur","Fondo · sfocatura",0,60,14),t("contrast","Contrasto locale",0,100,50),t("edges","Contorni orientati",0,100,60),t("detail","Griglia e accenti",0,100,30),i("accent","Colore accento","#ff4d2e"),i("ink","Inchiostro","#f4f1ea"),i("bg","Tinta fondo","#07080a")],variants:[{id:"foto",label:"Glifi luminosi",p:{}},{id:"neon",label:"Neon su nero",p:{mode:1,glow:80,saturation:90,cutoff:25,split:4}},{id:"braille",label:"Braille",p:{charset:7,cell:6,edges:0,glow:35}},{id:"carta",label:"Stampa su carta",p:{mode:2,color:60,ink:"#16130f",bg:"#f1ece1",under:60,cell:6,contrast:70}},{id:"terminale",label:"Terminale",p:{mode:1,glow:70,color:0,ink:"#7dff9a",bg:"#020a04",under:10,saturation:0,cutoff:15}},{id:"micro",label:"Micro",p:{cell:4,edges:40,glow:30}},{id:"blocchi",label:"Blocchi su carta",p:{mode:2,charset:2,cell:6,edges:0,color:0,ink:"#1a1a1a",bg:"#efebe3",under:0,detail:20,cutoff:0}},{id:"binario",label:"Binario",p:{mode:3,charset:3,cell:6,color:0,ink:"#3b5bff",edges:0,detail:0}}]},{id:"linocut",label:"Incisione",cat:"Stampa",hint:"linee che avvolgono i volumi come in una banconota: spesse nelle ombre, sottili nelle luci",params:[t("mass","Masse di nero",0,100,50),t("wave","Onde da banconota",0,100,35),t("detail","Dettaglio di stampa",0,100,70),t("lines","Passo linee",2,30,4.5),t("angle","Direzione",0,180,30),t("flow","Curvatura sui volumi",0,100,55),t("cross","Tratteggio incrociato",0,100,60),t("color","Inchiostro a colori",0,100,0),t("threshold","Esposizione",10,90,50),t("rough","Ruvidità",0,100,20),i("ink","Inchiostro","#1d1915"),i("paper","Carta","#f3ecdc")],variants:[{id:"banconota",label:"Banconota",p:{lines:3.2,flow:85,wave:80,ink:"#1f3b2c",paper:"#eef0e4",cross:40}},{id:"nero",label:"Bulino nero",p:{}},{id:"colore",label:"A colori",p:{color:100,lines:3.5,cross:30}},{id:"rosso",label:"Rosso",p:{ink:"#c8321f",paper:"#f2e8d6",mass:75}},{id:"blu",label:"Blu",p:{ink:"#1b2f8f",paper:"#efe9dc",mass:75}},{id:"lino",label:"Linoleum",p:{lines:9,flow:25,cross:0,rough:70}}]},{id:"lowPoly",label:"Low-poly",cat:"Distorsione",hint:"faccette che si infittiscono sui dettagli, ognuna con il suo colore e la sua luce",params:[t("style","Forza dello stile",0,100,50),t("size","Faccette",6,160,26),t("detail","Più fitte sui dettagli",0,100,60),t("relief","Rilievo",0,100,40),t("jitter","Irregolarità",0,100,45),t("edge","Spigoli chiari",0,100,12),t("glow","Bagliore",0,100,15)],variants:[{id:"cristallo",label:"Cristallo",p:{}},{id:"fine",label:"Fine",p:{size:14,relief:45}},{id:"geometrico",label:"Geometrico",p:{size:44,jitter:0,detail:30,edge:50}},{id:"scolpito",label:"Scolpito",p:{size:30,relief:100}}]},{id:"pixelSort",label:"Pixel sorting",cat:"Schermo",hint:"i pixel dentro una fascia di luce vengono ordinati in strisce, il resto della foto resta",params:[t("threshold","Da luce",0,100,45),t("upper","A luce",0,100,100),t("length","Lunghezza massima",20,1600,420),t("angle","Direzione",0,360,90),t("vary","Strisce irregolari",0,100,70),l("reverse","Ordine inverso",0)],variants:[{id:"giu",label:"Verso il basso",p:{}},{id:"lato",label:"Di lato",p:{angle:0}},{id:"mezzetinte",label:"Mezze tinte",p:{threshold:25,upper:75,length:700}},{id:"forte",label:"Forte",p:{threshold:20,length:1100,vary:40}}]},{id:"grunge",label:"Usura",cat:"Stampa",hint:"inchiostro consumato con macchie e puntini, più forte sui bordi",params:[t("wear","Usura",0,100,45),t("scale","Scala",30,300,100),t("speck","Puntini",0,100,40)],variants:[{id:"leggera",label:"Leggera",p:{wear:30,speck:20}},{id:"timbro",label:"Timbro",p:{wear:50,speck:50}},{id:"rovinata",label:"Rovinata",p:{wear:62,speck:70,scale:70}}]},{id:"hollow",label:"Vuoto",cat:"Testo",hint:"solo il contorno, interno trasparente",params:[t("thickness","Spessore",1,30,3)],variants:[{id:"fine",label:"Fine",p:{thickness:2}},{id:"medio",label:"Medio",p:{thickness:4}},{id:"spesso",label:"Spesso",p:{thickness:8}}]},{id:"splice",label:"Spaccato",cat:"Testo",hint:"contorno vuoto con un riempimento sfalsato dietro",pad:e=>o(e.distance,8)+2,params:[t("thickness","Spessore",1,20,3),t("distance","Distanza",0,40,8),t("angle","Direzione",0,360,315),i("color","Colore","#ffd166")],variants:[{id:"giallo",label:"Giallo",p:{color:"#ffd166"}},{id:"rosa",label:"Rosa",p:{color:"#ff8fab"}},{id:"acqua",label:"Acqua",p:{color:"#72efdd"}}]},{id:"longShadow",label:"Ombra lunga",cat:"Testo",hint:"ombra piatta infinita, stile flat",pad:e=>o(e.length,120),params:[t("length","Lunghezza",10,500,120),t("angle","Direzione",0,360,45),i("color","Colore","#000000"),t("opacity","Opacità",0,100,35),t("fade","Dissolvenza",0,100,60)],variants:[{id:"flat",label:"Flat",p:{opacity:30,fade:0,length:200}},{id:"sfumata",label:"Sfumata",p:{opacity:45,fade:90,length:160}},{id:"colorata",label:"Colorata",p:{opacity:100,fade:0,length:60,color:"#ff8c42"}}]},{id:"extrude",label:"Estrusione 3D",cat:"Testo",hint:"volume solido dietro l’oggetto, stile retrò",pad:e=>o(e.depth,24)+2,params:[t("depth","Profondità",2,120,24),t("angle","Direzione",0,360,45),i("color","Colore","#2d1b69"),t("shade","Ombreggiatura",0,100,60),l("outline","Bordo scuro",1),t("bands","Strisce",0,8,0),i("c2","Striscia 2","#ffb000"),i("c3","Striscia 3","#ff3d00"),i("c4","Striscia 4","#7a1fa2")],variants:[{id:"arcobaleno",label:"Strisce anni 70",p:{depth:70,angle:60,bands:4,color:"#f2e7c4",c2:"#ffb000",c3:"#ff5a1f",c4:"#c2185b",shade:10}},{id:"party",label:"Strisce party",p:{depth:90,angle:90,bands:5,color:"#e63946",c2:"#f4a261",c3:"#2a9d8f",c4:"#264653",shade:0}},{id:"retro",label:"Retrò",p:{color:"#2d1b69",depth:24,angle:45}},{id:"arancio",label:"Arancio",p:{color:"#ff7a00",depth:18,angle:135}},{id:"profondo",label:"Profondo",p:{color:"#111111",depth:60,angle:60,shade:80}},{id:"pastello",label:"Pastello",p:{color:"#9ad1ff",depth:14,angle:45,outline:0,shade:30}}]},{id:"glitch",label:"Glitch",cat:"Testo",hint:"strisce spostate, canali separati, rumore digitale",animated:!0,pad:e=>6+.4*o(e.split,30)+.3*o(e.power,50),params:[t("power","Danno",0,100,50),t("split","Separazione RGB",0,100,30),t("slices","Strisce",4,60,18),t("noise","Rumore",0,100,20),t("speed","Velocità",0,100,0)],variants:[{id:"leggero",label:"Leggero",p:{power:25,split:18,slices:14,noise:8}},{id:"forte",label:"Forte",p:{power:80,split:55,slices:26,noise:30}},{id:"digitale",label:"Digitale",p:{power:60,split:30,slices:50,noise:45,speed:40}},{id:"rgb",label:"Solo RGB",p:{power:0,split:60,slices:18,noise:0}}]},{id:"bloom",label:"Bloom",cat:"Luce",hint:"le parti chiare irradiano luce morbida",pad:e=>1.5*o(e.size,30),params:[t("threshold","Soglia",0,100,60),t("intensity","Intensità",0,100,55),t("size","Ampiezza",2,120,30),t("warmth","Calore",-100,100,10)],variants:[{id:"sognante",label:"Sognante",p:{threshold:45,intensity:60,size:50}},{id:"scintille",label:"Scintille",p:{threshold:75,intensity:80,size:14}},{id:"calda",label:"Calda",p:{warmth:60}}]},{id:"lightLeak",label:"Luce filtrata",cat:"Luce",hint:"macchie di luce calda come una pellicola esposta",animated:!0,params:[i("c1","Colore 1","#ff6a00"),i("c2","Colore 2","#ff2d95"),t("position","Posizione",0,100,20),t("size","Ampiezza",10,100,55),t("speed","Movimento",0,100,0)],variants:[{id:"ambra",label:"Ambra",p:{c1:"#ff8a00",c2:"#ffcf33"}},{id:"rosa",label:"Rosa",p:{c1:"#ff2d95",c2:"#ff9a3c"}},{id:"freddo",label:"Freddo",p:{c1:"#3cc8ff",c2:"#a35cff"}}]},{id:"halftone",label:"Retino",cat:"Stampa",hint:"puntini di stampa: mono, a colori o quadricromia",params:[r("mode","Modo",["Inchiostro","Colori originali","Quadricromia CMYK"],1),r("shape","Forma",["Punti","Quadrati","Linee"],0),t("size","Retino",3,40,8),t("angle","Angolo",0,90,45),i("ink","Inchiostro","#111111"),l("paperOn","Carta",1),i("paper","Colore carta","#f5f0e6")],variants:[{id:"fumetto",label:"Fumetto",p:{mode:2,shape:0,size:7,paperOn:1}},{id:"giornale",label:"Giornale",p:{mode:0,shape:0,size:6,ink:"#1a1a1a",paperOn:1,paper:"#efe9dc"}},{id:"pop",label:"Pop",p:{mode:1,shape:0,size:12,paperOn:0}},{id:"linee",label:"Linee",p:{mode:0,shape:2,size:7,ink:"#1f3fbf",paperOn:1}}]},{id:"riso",label:"Risograph",cat:"Stampa",hint:"due inchiostri fuori registro, grana e sovrastampa",pad:e=>Math.max(o(e.reg1,3),o(e.reg2,6))+2,params:[i("ink1","Inchiostro 1","#ff48b0"),i("ink2","Inchiostro 2","#0078bf"),i("paper","Carta","#f3eee4"),r("screen","Trama",["Grana","Retino"],0),t("size","Grana",1,20,3),t("reg1","Registro 1",0,20,2),t("reg2","Registro 2",0,20,6),t("ink","Carico inchiostro",0,100,70),t("texture","Usura",0,100,45)],variants:[{id:"rosablu",label:"Rosa + Blu",p:{ink1:"#ff48b0",ink2:"#0078bf"}},{id:"arancioacqua",label:"Arancio + Acqua",p:{ink1:"#ff6c2f",ink2:"#00838a"}},{id:"rossonero",label:"Rosso + Nero",p:{ink1:"#ff665e",ink2:"#1a1a1a"}},{id:"giallo",label:"Giallo + Viola",p:{ink1:"#ffe800",ink2:"#765ba7"}},{id:"blu",label:"Solo blu",p:{ink1:"#3255a4",ink2:"#3255a4",reg2:1}}]},{id:"dither",label:"Dithering",cat:"Stampa",hint:"pochi colori e trama a pixel, stile 1-bit",params:[i("dark","Scuro","#0f380f"),i("light","Chiaro","#9bbc0f"),r("pattern","Trama",["Bayer 4×4","Bayer 8×8","Rumore"],1),t("size","Pixel",1,12,2),t("contrast","Contrasto",-50,100,20),l("levels4","Quattro toni",1)],variants:[{id:"gameboy",label:"Game Boy",p:{dark:"#0f380f",light:"#9bbc0f",levels4:1}},{id:"mac",label:"1-bit",p:{dark:"#000000",light:"#ffffff",levels4:0,pattern:1}},{id:"notte",label:"Notte",p:{dark:"#14112b",light:"#5ce1e6",levels4:1}},{id:"rosa",label:"Rosa",p:{dark:"#3b0a45",light:"#ffb3c6",levels4:1,pattern:2}}]},{id:"screenprint",label:"Serigrafia",cat:"Stampa",hint:"tre colori piatti con bordi d’inchiostro e carta",pad:()=>3,params:[i("c1","Scuro","#1d1d3b"),i("c2","Medio","#e94f37"),i("c3","Chiaro","#f6d8ae"),t("threshold","Soglia",0,100,50),t("rough","Bordi irregolari",0,100,40),t("offset","Fuori registro",0,10,2)],variants:[{id:"poster",label:"Poster",p:{c1:"#1d1d3b",c2:"#e94f37",c3:"#f6d8ae"}},{id:"warhol",label:"Pop art",p:{c1:"#1b1b1b",c2:"#ff3d7f",c3:"#ffe66d"}},{id:"verde",label:"Bosco",p:{c1:"#14281d",c2:"#5b8c5a",c3:"#e8e3c8"}}]},{id:"gradientMap",label:"Mappa sfumatura",cat:"Colore",hint:"le luci e le ombre diventano una sfumatura (duotone e oltre)",params:[i("c1","Ombre","#1d1a6e"),i("c2","Mezzitoni","#e0457b"),i("c3","Luci","#ffd29a"),l("three","Tre colori",1),t("contrast","Contrasto",-50,100,10)],variants:[{id:"pesca",label:"Pesca",p:{c1:"#3a0f4e",c2:"#e86a5c",c3:"#ffe0b5",three:1}},{id:"notte",label:"Notte",p:{c1:"#0b0f2e",c2:"#3a6ea5",c3:"#c9f1ff",three:1}},{id:"cyber",label:"Cyber",p:{c1:"#120458",c2:"#ff00a0",c3:"#00fff0",three:1}},{id:"duotone",label:"Duotone",p:{c1:"#1d1a6e",c2:"#ff7aa8",three:0}},{id:"oro",label:"Oro",p:{c1:"#1b1305",c2:"#9c6b16",c3:"#ffe9a8",three:1}},{id:"menta",label:"Menta",p:{c1:"#0d2b2b",c2:"#2fb39a",c3:"#f2ffe9",three:1}}]},{id:"posterize",label:"Poster",cat:"Colore",hint:"pochi livelli di colore, a tinte piatte",params:[t("levels","Livelli",2,12,4),l("dither","Retinatura",0),t("saturation","Saturazione",-50,100,15)],variants:[{id:"quattro",label:"4 livelli",p:{levels:4}},{id:"tre",label:"3 livelli",p:{levels:3,saturation:30}},{id:"retinato",label:"Retinato",p:{levels:4,dither:1}}]},{id:"tiltShift",label:"Tilt-shift",cat:"Foto",hint:"a fuoco solo una fascia: effetto plastico",params:[t("position","Fascia",0,100,50),t("width","Larghezza",0,60,18),t("feather","Passaggio",1,60,22),t("size","Sfocatura",1,60,16),t("angle","Angolo",-90,90,0)],variants:[{id:"classico",label:"Classico",p:{width:18,size:16}},{id:"stretto",label:"Stretto",p:{width:8,size:24}},{id:"verticale",label:"Verticale",p:{angle:90}}]},{id:"motionBlur",label:"Mosso",cat:"Foto",hint:"sfocatura di movimento in una direzione",pad:e=>o(e.length,30),params:[t("length","Lunghezza",1,200,30),t("angle","Direzione",0,180,0)],variants:[{id:"orizzontale",label:"Orizzontale",p:{angle:0}},{id:"verticale",label:"Verticale",p:{angle:90}},{id:"diagonale",label:"Diagonale",p:{angle:35,length:50}}]},{id:"zoomBlur",label:"Zoom",cat:"Foto",hint:"scia radiale verso il centro, velocità",params:[t("amount","Forza",1,100,25),t("cx","Centro X",0,100,50),t("cy","Centro Y",0,100,50)],variants:[{id:"leggero",label:"Leggero",p:{amount:12}},{id:"forte",label:"Forte",p:{amount:45}}]},{id:"wave",label:"Onda",cat:"Distorsione",hint:"ondulazione regolare",animated:!0,pad:e=>o(e.amp,10)+2,params:[t("amp","Ampiezza",0,60,10),t("length","Lunghezza d’onda",10,400,120),t("angle","Direzione",0,180,0),t("speed","Velocità",0,100,0)],variants:[{id:"dolce",label:"Dolce",p:{amp:8,length:160}},{id:"bandiera",label:"Bandiera",p:{amp:16,length:90,speed:30}},{id:"nervosa",label:"Nervosa",p:{amp:4,length:25}}]},{id:"ripple",label:"Increspatura",cat:"Distorsione",hint:"cerchi concentrici come acqua",animated:!0,params:[t("amp","Ampiezza",0,40,6),t("length","Distanza anelli",5,200,40),t("speed","Velocità",0,100,0)],variants:[{id:"goccia",label:"Goccia",p:{amp:6,length:40}},{id:"lago",label:"Lago",p:{amp:3,length:18,speed:30}}]},{id:"twirl",label:"Vortice",cat:"Distorsione",hint:"rotazione che cresce verso il centro",params:[t("angle","Rotazione",-720,720,180),t("radius","Raggio",10,100,60)],variants:[{id:"orario",label:"Orario",p:{angle:180}},{id:"antiorario",label:"Antiorario",p:{angle:-180}},{id:"forte",label:"Forte",p:{angle:540,radius:80}}]},{id:"bulge",label:"Lente",cat:"Distorsione",hint:"gonfia o pizzica il centro",params:[t("amount","Gonfia ↔ pizzica",-100,100,50),t("radius","Raggio",10,100,70)],variants:[{id:"gonfia",label:"Gonfia",p:{amount:60}},{id:"pizzica",label:"Pizzica",p:{amount:-60}}]},{id:"mosaic",label:"Mosaico",cat:"Distorsione",hint:"tessere quadrate o esagonali con fughe",params:[r("shape","Tessere",["Quadrate","Esagonali"],0),t("size","Dimensione",2,80,12),t("gap","Fughe",0,50,0)],variants:[{id:"pixel",label:"Pixel",p:{shape:0,size:10,gap:0}},{id:"piastrelle",label:"Piastrelle",p:{shape:0,size:18,gap:18}},{id:"alveare",label:"Alveare",p:{shape:1,size:14,gap:12}}]},{id:"chroma",label:"Aberrazione",cat:"Distorsione",hint:"canali di colore sfasati, come una lente economica",pad:e=>1.6*o(e.amount,6)+2,params:[t("amount","Sfasamento",0,40,6),t("distortion","Distorsione lente",-50,50,0),l("radial","Radiale",1)],variants:[{id:"leggera",label:"Leggera",p:{amount:4}},{id:"forte",label:"Forte",p:{amount:14}},{id:"lineare",label:"Lineare",p:{amount:8,radial:0}}]},{id:"vhs",label:"VHS",cat:"Schermo",hint:"videocassetta: colore che sbava, righe e tracking",animated:!0,pad:()=>6,params:[t("power","Usura",0,100,55),t("bleed","Sbavatura colore",0,100,50),t("lines","Righe",0,100,40),t("speed","Velocità",0,100,35)],variants:[{id:"nastro",label:"Nastro",p:{power:55}},{id:"rovinato",label:"Rovinato",p:{power:90,bleed:80,lines:70}},{id:"fermo",label:"Fermo immagine",p:{speed:0,power:60}}]},{id:"crt",label:"CRT",cat:"Schermo",hint:"vecchio monitor: righe, fosfori e curvatura",animated:!0,params:[t("scan","Righe",0,100,55),t("mask","Fosfori RGB",0,100,45),t("curve","Curvatura",0,100,25),t("glow","Bagliore",0,100,35),t("speed","Sfarfallio",0,100,0)],variants:[{id:"arcade",label:"Arcade",p:{scan:60,mask:55,curve:30}},{id:"terminale",label:"Terminale",p:{scan:70,mask:20,curve:15,glow:60}},{id:"piatto",label:"Piatto",p:{curve:0}}]}],u=e=>c.find(a=>a.id===e);function s(e,a){let o=u(e),t=a?o.variants.find(e=>e.id===a):o.variants[0];return{id:e,on:!0,amount:100,variant:t?.id,p:{...Object.fromEntries(o.params.map(e=>[e.key,e.def])),...t?.p??{}}}}let n={shadow:e=>({...s("dropShadow"),p:{...s("dropShadow").p,...e,size:e.blur??24}}),glow:e=>({...s("outerGlow"),p:{...s("outerGlow").p,color:e.color??"#ffd166",size:e.size??18}}),outline:e=>({...s("stroke"),p:{...s("stroke").p,size:e.width??6,color:e.color??"#ffffff"}}),duotone:e=>({...s("gradientMap","duotone"),p:{...s("gradientMap","duotone").p,c1:e.c1??"#1d1a6e",c2:e.c2??"#ff7aa8",three:0}}),pixel:e=>({...s("mosaic","pixel"),p:{...s("mosaic","pixel").p,size:e.size??10}})};function f(e){return e?e.map(e=>n[e.id]?{...n[e.id](e.p),on:e.on,amount:e.amount}:e).filter(e=>u(e.id)):e}e.s(["FX_DEFS",0,c,"HSL_BANDS",0,[{key:"red",label:"Rossi",hue:0,swatch:"#ff4b4b"},{key:"orange",label:"Arancioni",hue:30,swatch:"#ff9a3c"},{key:"yellow",label:"Gialli",hue:58,swatch:"#ffe14b"},{key:"green",label:"Verdi",hue:115,swatch:"#4bd463"},{key:"aqua",label:"Acqua",hue:180,swatch:"#3cd9d9"},{key:"blue",label:"Blu",hue:225,swatch:"#3c6bff"},{key:"purple",label:"Viola",hue:275,swatch:"#9b5cff"},{key:"magenta",label:"Magenta",hue:320,swatch:"#ff4bd2"}],"LOOKS",0,[{id:"luminoso",label:"Luminoso",family:"Naturali",adjust:{exposure:12,contrast:8,highlights:-18,shadows:15,vibrance:22}},{id:"morbido",label:"Morbido",family:"Naturali",adjust:{contrast:-18,highlights:-20,shadows:18,clarity:-15,vibrance:8,curve:5}},{id:"nitido",label:"Nitido",family:"Naturali",adjust:{contrast:12,clarity:35,sharpen:30,vibrance:12,blacks:-8}},{id:"vivace",label:"Vivace",family:"Naturali",adjust:{contrast:15,vibrance:40,saturation:10,curve:1,whites:8}},{id:"caldo",label:"Caldo",family:"Naturali",adjust:{temperature:28,tint:4,vibrance:10,gHi_h:40,gHi_s:18}},{id:"freddo",label:"Freddo",family:"Naturali",adjust:{temperature:-25,tint:-4,contrast:6,gSh_h:215,gSh_s:20}},{id:"portra",label:"Portra",family:"Pellicola",adjust:{temperature:10,contrast:-10,curve:3,fade:12,saturation:-8,hsl_orange_s:8,hsl_orange_l:6,hsl_green_h:18,hsl_green_s:-25,gSh_h:190,gSh_s:10,gHi_h:35,gHi_s:14,grain:22,grainSize:30,halation:10}},{id:"ektar",label:"Ektar",family:"Pellicola",adjust:{contrast:22,saturation:18,vibrance:15,curve:1,hsl_red_s:15,hsl_blue_s:20,hsl_blue_l:-10,blacks:-10,grain:15,grainSize:20}},{id:"fuji",label:"Fuji 400",family:"Pellicola",adjust:{temperature:-6,tint:6,curve:3,fade:10,hsl_green_h:-12,hsl_green_s:10,hsl_blue_h:-8,gSh_h:165,gSh_s:16,gHi_h:330,gHi_s:8,grain:25,grainSize:30}},{id:"cinestill",label:"Cinestill 800T",family:"Pellicola",adjust:{temperature:-30,tint:8,contrast:10,curve:4,halation:70,gSh_h:200,gSh_s:22,gHi_h:20,gHi_s:12,grain:35,grainSize:40,vignette:15}},{id:"kodachrome",label:"Kodachrome",family:"Pellicola",adjust:{contrast:25,saturation:12,curve:2,hsl_red_s:22,hsl_red_l:-8,hsl_yellow_h:-6,hsl_blue_l:-15,temperature:6,blacks:-12,grain:12}},{id:"polaroid",label:"Polaroid",family:"Pellicola",adjust:{fade:35,contrast:-12,saturation:-15,temperature:8,gSh_h:185,gSh_s:28,gHi_h:45,gHi_s:22,vignette:28,vigFeather:70,grain:18,curve:3}},{id:"scaduta",label:"Scaduta",family:"Pellicola",adjust:{fade:40,tint:22,temperature:12,saturation:-20,gSh_h:290,gSh_s:25,gHi_h:60,gHi_s:20,grain:55,grainSize:55,vignette:30,halation:25}},{id:"tealorange",label:"Teal & Orange",family:"Cinema",adjust:{contrast:18,gSh_h:190,gSh_s:38,gHi_h:32,gHi_s:30,hsl_orange_s:12,hsl_aqua_h:-10,hsl_blue_h:-25,saturation:-5,curve:4}},{id:"notturno",label:"Notturno",family:"Cinema",adjust:{exposure:-12,temperature:-35,contrast:15,saturation:-25,gSh_h:225,gSh_s:30,halation:30,vignette:30}},{id:"deserto",label:"Deserto",family:"Cinema",adjust:{temperature:30,contrast:10,hsl_green_s:-50,hsl_blue_s:-30,hsl_orange_s:10,gHi_h:38,gHi_s:25,fade:10,curve:4}},{id:"bleach",label:"Bleach bypass",family:"Cinema",adjust:{saturation:-55,contrast:40,clarity:25,blacks:-15,highlights:-15,curve:2,grain:18}},{id:"matrix",label:"Codice",family:"Cinema",adjust:{tint:-25,temperature:-10,contrast:20,gSh_h:140,gSh_s:30,gHi_h:100,gHi_s:15,saturation:-20,curve:4}},{id:"bn",label:"Bianco e nero",family:"Bianco e nero",adjust:{saturation:-100,contrast:12,clarity:10}},{id:"trix",label:"Tri-X",family:"Bianco e nero",adjust:{saturation:-100,contrast:35,curve:2,blacks:-15,grain:55,grainSize:45,clarity:15}},{id:"argento",label:"Argento",family:"Bianco e nero",adjust:{saturation:-100,exposure:15,contrast:-15,highlights:20,fade:15,curve:5}},{id:"noir",label:"Noir",family:"Bianco e nero",adjust:{saturation:-100,contrast:45,shadows:-25,curve:2,vignette:45,grain:30}},{id:"seppia",label:"Seppia",family:"Bianco e nero",adjust:{saturation:-100,gSh_h:30,gSh_s:35,gMid_h:35,gMid_s:30,gHi_h:45,gHi_s:20,fade:15,contrast:5}},{id:"cianotipia",label:"Cianotipia",family:"Bianco e nero",adjust:{saturation:-100,gSh_h:215,gSh_s:70,gMid_h:205,gMid_s:55,gHi_h:195,gHi_s:25,contrast:10,fade:10}},{id:"sogno",label:"Sogno",family:"Creativi",adjust:{exposure:10,contrast:-25,fade:25,clarity:-40,halation:40,gHi_h:330,gHi_s:18,gSh_h:260,gSh_s:15}},{id:"vapor",label:"Vaporwave",family:"Creativi",adjust:{gSh_h:270,gSh_s:45,gHi_h:180,gHi_s:40,saturation:15,contrast:10,hsl_blue_h:30,hsl_red_h:-20}},{id:"lomo",label:"Lomo",family:"Creativi",adjust:{contrast:35,saturation:30,vignette:60,vigFeather:40,curve:2,gSh_h:210,gSh_s:18}},{id:"pastello",label:"Pastello",family:"Creativi",adjust:{exposure:15,contrast:-30,saturation:-15,fade:30,gHi_h:340,gHi_s:12,gSh_h:200,gSh_s:12}},{id:"acido",label:"Acido",family:"Creativi",adjust:{saturation:40,contrast:25,hsl_green_h:-30,hsl_blue_h:40,hsl_red_h:25,tint:-15,clarity:20}},{id:"tramonto",label:"Tramonto",family:"Creativi",adjust:{temperature:45,tint:15,gSh_h:280,gSh_s:25,gHi_h:30,gHi_s:35,contrast:10,halation:20}}],"fxDef",0,u,"migrateFx",()=>f,"newFx",()=>s])},13738,85233,e=>{"use strict";let a=`#version 300 es
in vec2 aPos;
out vec2 vUv;
void main() { vUv = aPos * 0.5 + 0.5; gl_Position = vec4(aPos, 0.0, 1.0); }`,o=`#version 300 es
precision highp float;
precision highp int;
in vec2 vUv;
out vec4 o;
uniform vec2 uRes;      // dimensione dell'uscita in pixel
float luma(vec3 c) { return dot(c, vec3(0.2126, 0.7152, 0.0722)); }
vec4 unpre(vec4 c) { return c.a > 0.0 ? vec4(c.rgb / c.a, c.a) : vec4(0.0); }
vec4 pre(vec4 c) { return vec4(c.rgb * c.a, c.a); }
vec4 over(vec4 top, vec4 bot) { return top + bot * (1.0 - top.a); }
float hash12(vec2 p) { vec3 p3 = fract(vec3(p.xyx) * 0.1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
vec2 hash22(vec2 p) { vec3 p3 = fract(vec3(p.xyx) * vec3(0.1031, 0.1030, 0.0973)); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.xx + p3.yz) * p3.zy); }
float vnoise(vec2 p) {
  vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash12(i), hash12(i + vec2(1, 0)), f.x), mix(hash12(i + vec2(0, 1)), hash12(i + vec2(1, 1)), f.x), f.y);
}
float fbm(vec2 p) { float s = 0.0, a = 0.5; for (int i = 0; i < 5; i++) { s += a * vnoise(p); p = p * 2.03 + 17.1; a *= 0.5; } return s; }
vec3 rgb2hsv(vec3 c) {
  vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
  vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
  vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));
  float d = q.x - min(q.w, q.y); float e = 1.0e-10;
  return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}
vec3 hsv2rgb(vec3 c) { vec3 p = abs(fract(c.xxx + vec3(1.0, 2.0 / 3.0, 1.0 / 3.0)) * 6.0 - 3.0); return c.z * mix(vec3(1.0), clamp(p - 1.0, 0.0, 1.0), c.y); }
// modi di fusione su colori NON premoltiplicati: b = sotto, s = sopra
vec3 blend(vec3 b, vec3 s, float m) {
  if (m < 0.5) return s;                                              // normale
  if (m < 1.5) return b * s;                                          // moltiplica
  if (m < 2.5) return 1.0 - (1.0 - b) * (1.0 - s);                    // schermo
  if (m < 3.5) return mix(2.0 * b * s, 1.0 - 2.0 * (1.0 - b) * (1.0 - s), step(0.5, b)); // sovrapponi
  if (m < 4.5) return mix(2.0 * b * s + b * b * (1.0 - 2.0 * s), sqrt(b) * (2.0 * s - 1.0) + 2.0 * b * (1.0 - s), step(0.5, s)); // luce soffusa
  if (m < 5.5) return min(b + s, 1.0);                                // aggiungi
  if (m < 6.5) return b / max(1.0 - s, 1e-3);                         // colore scherma
  return hsv2rgb(vec3(rgb2hsv(s).xy, rgb2hsv(b).z));                  // colore
}
`,t=null,i=new Map,l=new Set,r=!1;class c{canvas;gl;floatOK;progs=new Map;pool=[];live=new Set;vao;static get(){if(r)return null;if(t&&!t.gl.isContextLost())return t;try{t=new c}catch(e){console.warn("[fx] WebGL2 non disponibile",e),r=!0,t=null}return t}constructor(){this.canvas=document.createElement("canvas"),this.canvas.width=this.canvas.height=2;const e=this.canvas.getContext("webgl2",{premultipliedAlpha:!0,alpha:!0,antialias:!1,preserveDrawingBuffer:!0});if(!e)throw Error("webgl2");this.gl=e,this.floatOK=!!e.getExtension("EXT_color_buffer_float"),e.getExtension("OES_texture_float_linear");const a=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,a),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),e.STATIC_DRAW),this.vao=e.createVertexArray(),e.bindVertexArray(this.vao),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,2,e.FLOAT,!1,0,0),e.disable(e.BLEND),this.canvas.addEventListener("webglcontextlost",()=>{t=null})}tex(e,a,o=this.floatOK?"rgba16f":"rgba8"){"rgba8"===o||this.floatOK||(o="rgba8");let t=this.pool.findIndex(t=>t.w===e&&t.h===a&&t.fmt===o);if(t>=0){let e=this.pool.splice(t,1)[0];return this.live.add(e),e}let i=this.gl,l=i.createTexture();i.bindTexture(i.TEXTURE_2D,l);let[r,c]="rgba32f"===o?[i.RGBA32F,i.FLOAT]:"rgba16f"===o?[i.RGBA16F,i.HALF_FLOAT]:[i.RGBA8,i.UNSIGNED_BYTE];i.texImage2D(i.TEXTURE_2D,0,r,e,a,0,i.RGBA,c,null);let u="rgba32f"===o?i.NEAREST:i.LINEAR;i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,u),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MAG_FILTER,u),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE);let s=i.createFramebuffer();i.bindFramebuffer(i.FRAMEBUFFER,s),i.framebufferTexture2D(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,l,0);let n={t:l,f:s,w:e,h:a,fmt:o};return this.live.add(n),n}release(...e){for(let a of e)a&&this.live.delete(a)&&this.pool.push(a);for(;this.pool.length>48;){let e=this.pool.shift();this.gl.deleteTexture(e.t),this.gl.deleteFramebuffer(e.f)}}releaseAll(){this.release(...this.live)}canvasTex(e,a){let o=i.get(e);if(!o?.tex){let t=a(),l=this.gl,r=l.createTexture();l.bindTexture(l.TEXTURE_2D,r),l.pixelStorei(l.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),l.texImage2D(l.TEXTURE_2D,0,l.RGBA8,l.RGBA,l.UNSIGNED_BYTE,t),l.texParameteri(l.TEXTURE_2D,l.TEXTURE_MIN_FILTER,l.LINEAR),l.texParameteri(l.TEXTURE_2D,l.TEXTURE_MAG_FILTER,l.LINEAR),l.texParameteri(l.TEXTURE_2D,l.TEXTURE_WRAP_S,l.CLAMP_TO_EDGE),l.texParameteri(l.TEXTURE_2D,l.TEXTURE_WRAP_T,l.CLAMP_TO_EDGE),o={tex:{t:r,f:null,w:t.width,h:t.height,fmt:"rgba8"}},i.set(e,o)}return o.tex}image(e){let a=i.get(e);if(!a){a={tex:null},i.set(e,a);let o=a,t=new Image;t.crossOrigin="anonymous",t.onload=()=>{let e=this.gl,a=e.createTexture();e.bindTexture(e.TEXTURE_2D,a),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,t),e.generateMipmap(e.TEXTURE_2D),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR_MIPMAP_LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.MIRRORED_REPEAT),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.MIRRORED_REPEAT),o.tex={t:a,f:null,w:t.width,h:t.height,fmt:"rgba8"},l.forEach(e=>e())},t.src=e}return a.tex}upload(e,a,o){let t=this.gl,i=this.tex(a,o,"rgba8");return t.bindTexture(t.TEXTURE_2D,i.t),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!0),t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,!1),t.texImage2D(t.TEXTURE_2D,0,t.RGBA8,a,o,0,t.RGBA,t.UNSIGNED_BYTE,e),i}program(e,o){let t=this.progs.get(e);if(t)return t;let i=this.gl,l=(a,o)=>{let t=i.createShader(a);if(i.shaderSource(t,o),i.compileShader(t),!i.getShaderParameter(t,i.COMPILE_STATUS))throw Error(`[fx] shader "${e}": ${i.getShaderInfoLog(t)}`);return t},r=i.createProgram();if(i.attachShader(r,l(i.VERTEX_SHADER,a)),i.attachShader(r,l(i.FRAGMENT_SHADER,o)),i.bindAttribLocation(r,0,"aPos"),i.linkProgram(r),!i.getProgramParameter(r,i.LINK_STATUS))throw Error(`[fx] link "${e}": ${i.getProgramInfoLog(r)}`);let c=new Map,u=i.getProgramParameter(r,i.ACTIVE_UNIFORMS);for(let e=0;e<u;e++){let a=i.getActiveUniform(r,e);c.set(a.name.replace(/\[0\]$/,""),{loc:i.getUniformLocation(r,a.name),type:a.type})}let s={p:r,u:c};return this.progs.set(e,s),s}run(e,a,o,t={},i){let l=this.gl,r=this.program(e,a);l.useProgram(r.p),l.bindVertexArray(this.vao);let[c,u]=o?[o.w,o.h]:i;l.bindFramebuffer(l.FRAMEBUFFER,o?o.f:null),l.viewport(0,0,c,u);let s=0;for(let[e,a]of Object.entries({uRes:[c,u],...t})){let o=r.u.get(e);o&&("object"!=typeof a||Array.isArray(a)?"number"==typeof a?o.type===l.INT||o.type===l.BOOL?l.uniform1i(o.loc,a):l.uniform1f(o.loc,a):2===a.length?l.uniform2fv(o.loc,a):3===a.length?l.uniform3fv(o.loc,a):4===a.length?l.uniform4fv(o.loc,a):l.uniform1fv(o.loc,a):(l.activeTexture(l.TEXTURE0+s),l.bindTexture(l.TEXTURE_2D,a.t),l.uniform1i(o.loc,s++)))}l.drawArrays(l.TRIANGLE_STRIP,0,4),l.activeTexture(l.TEXTURE0)}pass(e,a,o,t,i,l){let r=this.tex(o,t,l);return this.run(e,a,r,i),r}blur(e,a){let o=[],t=e,i=1;for(;a*i>6&&t.w>4&&t.h>4;){let e=this.pass("down",u,Math.max(1,Math.ceil(t.w/2)),Math.max(1,Math.ceil(t.h/2)),{uSrc:t,uTexel:[1/t.w,1/t.h]});o.push(e),t=e,i*=.5}let l=Math.max(.01,a*i/2.2),r=this.pass("gauss",n,t.w,t.h,{uSrc:t,uDir:[1/t.w,0],uSigma:l}),c=this.pass("gauss",n,t.w,t.h,{uSrc:r,uDir:[0,1/t.h],uSigma:l});this.release(r);let f=c;for(let a=o.length-2;a>=-1;a--){let t=a>=0?o[a]:e,i=this.pass("up",s,t.w,t.h,{uSrc:f,uHalf:[.5/f.w,.5/f.h]});this.release(f),f=i}return this.release(...o),f}sdf(e,a){if(!this.floatOK)return null;let{w:o,h:t}=e,i=this.pass("jfaInit",f,o,t,{uSrc:e},"rgba32f"),l=1;for(;l<Math.min(Math.max(o,t),Math.max(2,a));)l*=2;for(;l>=1;l=Math.floor(l/2)){let e=this.pass("jfaStep",v,o,t,{uSeed:i,uStep:l},"rgba32f");this.release(i),i=e}let r=this.pass("jfaStep",v,o,t,{uSeed:i,uStep:1},"rgba32f");this.release(i);let c=this.pass("jfaDist",p,o,t,{uSeed:r,uSrc:e});return this.release(r),c}present(e,a){(this.canvas.width<e.w||this.canvas.height<e.h)&&(this.canvas.width=Math.max(this.canvas.width,e.w),this.canvas.height=Math.max(this.canvas.height,e.h)),this.run("present",d,null,{uSrc:e},[e.w,e.h]),a.width=e.w,a.height=e.h;let o=a.getContext("2d");o.clearRect(0,0,e.w,e.h),o.drawImage(this.canvas,0,this.canvas.height-e.h,e.w,e.h,0,0,e.w,e.h)}}let u=o+`
uniform sampler2D uSrc; uniform vec2 uTexel;
void main() {
  vec2 uv = vUv;
  o = (texture(uSrc, uv) * 4.0
     + texture(uSrc, uv + vec2(-1.0, -1.0) * uTexel) + texture(uSrc, uv + vec2(1.0, -1.0) * uTexel)
     + texture(uSrc, uv + vec2(-1.0, 1.0) * uTexel) + texture(uSrc, uv + vec2(1.0, 1.0) * uTexel)) / 8.0;
}`,s=o+`
uniform sampler2D uSrc; uniform vec2 uHalf;
void main() {
  vec2 uv = vUv; vec2 h = uHalf;
  vec4 s = texture(uSrc, uv + vec2(-2.0 * h.x, 0.0)) + texture(uSrc, uv + vec2(2.0 * h.x, 0.0))
         + texture(uSrc, uv + vec2(0.0, -2.0 * h.y)) + texture(uSrc, uv + vec2(0.0, 2.0 * h.y));
  s += 2.0 * (texture(uSrc, uv + vec2(-h.x, h.y)) + texture(uSrc, uv + vec2(h.x, h.y))
            + texture(uSrc, uv + vec2(-h.x, -h.y)) + texture(uSrc, uv + vec2(h.x, -h.y)));
  o = s / 12.0;
}`,n=o+`
uniform sampler2D uSrc; uniform vec2 uDir; uniform float uSigma;
void main() {
  if (uSigma < 0.35) { o = texture(uSrc, vUv); return; }
  vec4 acc = vec4(0.0); float ws = 0.0;
  for (int i = -14; i <= 14; i++) {
    float x = float(i);
    float w = exp(-x * x / (2.0 * uSigma * uSigma));
    acc += texture(uSrc, vUv + uDir * x) * w; ws += w;
  }
  o = acc / ws;
}`,f=o+`
uniform sampler2D uSrc;
float A(ivec2 q) { ivec2 sz = textureSize(uSrc, 0); return texelFetch(uSrc, clamp(q, ivec2(0), sz - 1), 0).a; }
void main() {
  vec2 p = gl_FragCoord.xy; ivec2 ip = ivec2(p);
  float a = A(ip);
  bool inside = a >= 0.5;
  bool edge = (a > 0.02 && a < 0.98)
    || (A(ip + ivec2(1, 0)) >= 0.5) != inside || (A(ip - ivec2(1, 0)) >= 0.5) != inside
    || (A(ip + ivec2(0, 1)) >= 0.5) != inside || (A(ip - ivec2(0, 1)) >= 0.5) != inside;
  if (!edge) { o = vec4(-1.0); return; }
  // punto del bordo con precisione sub-pixel: dove la copertura vale 0.5 lungo il gradiente
  vec2 g = vec2(A(ip + ivec2(1, 0)) - A(ip - ivec2(1, 0)), A(ip + ivec2(0, 1)) - A(ip - ivec2(0, 1))) * 0.5
         + vec2(A(ip + ivec2(1, 1)) - A(ip + ivec2(-1, 1)) + A(ip + ivec2(1, -1)) - A(ip + ivec2(-1, -1)),
                A(ip + ivec2(1, 1)) - A(ip + ivec2(1, -1)) + A(ip + ivec2(-1, 1)) - A(ip + ivec2(-1, -1))) * 0.25;
  float gl = length(g);
  vec2 e = gl > 1e-4 ? p + g / gl * clamp((0.5 - a) / max(gl, 0.25), -1.0, 1.0) : p;
  o = vec4(e, e);
}`,v=o+`
uniform sampler2D uSeed; uniform float uStep;
void main() {
  vec2 p = gl_FragCoord.xy;
  ivec2 sz = textureSize(uSeed, 0);
  vec4 best = texelFetch(uSeed, ivec2(p), 0);
  float dIn = best.x < 0.0 ? 1e9 : distance(p, best.xy);
  float dOut = best.z < 0.0 ? 1e9 : distance(p, best.zw);
  for (int y = -1; y <= 1; y++) for (int x = -1; x <= 1; x++) {
    ivec2 q = ivec2(p) + ivec2(x, y) * int(uStep);
    if (q.x < 0 || q.y < 0 || q.x >= sz.x || q.y >= sz.y) continue;
    vec4 s = texelFetch(uSeed, q, 0);
    if (s.x >= 0.0) { float d = distance(p, s.xy); if (d < dIn) { dIn = d; best.xy = s.xy; } }
    if (s.z >= 0.0) { float d = distance(p, s.zw); if (d < dOut) { dOut = d; best.zw = s.zw; } }
  }
  o = best;
}`,p=o+`
uniform sampler2D uSeed; uniform sampler2D uSrc;
void main() {
  vec2 p = gl_FragCoord.xy;
  vec4 s = texelFetch(uSeed, ivec2(p), 0);
  float a = texelFetch(uSrc, ivec2(p), 0).a;
  // distanza dal bordo vero (sub-pixel), negativa dentro: curve lisce, niente faccette
  float d = s.x < 0.0 ? 1e4 : distance(p, s.xy);
  d = a >= 0.5 ? -d : d;
  o = vec4(d, a, 0.0, 1.0);
}`,d=o+`
uniform sampler2D uSrc;
void main() { o = clamp(texture(uSrc, vec2(vUv.x, 1.0 - vUv.y)), 0.0, 1.0); }`;e.s(["FxGL",()=>c,"LIB",0,o],13738);let m=o+`
uniform sampler2D uSrc; uniform sampler2D uOrig; uniform sampler2D uSdf;
uniform float uZ, uT, uAmt, uHasSdf;
float sd(vec2 uv) { return uHasSdf > 0.5 ? texture(uSdf, uv).r : 0.5 - texture(uOrig, uv).a; }
vec2 px() { return 1.0 / uRes; }
`,h=o+`uniform sampler2D uSdf; uniform float uE;
void main() { float m = clamp(0.5 - (texture(uSdf, vUv).r + uE), 0.0, 1.0); o = vec4(m); }`,g=o+`
uniform sampler2D uSrc, uBlurL, uBlurS;
uniform float uTemp, uTint, uExp, uCon, uHi, uSh, uWh, uBl, uClar, uVib, uSat, uSharp, uFade, uCurve, uBal;
uniform vec2 uGSh, uGMid, uGHi;
uniform float uHslH[8]; uniform float uHslS[8]; uniform float uHslL[8];
const float HUES[8] = float[8](0.0, 30.0, 58.0, 115.0, 180.0, 225.0, 275.0, 320.0);
float curveF(float x, float k) {
  if (k < 0.5) return x;
  if (k < 1.5) return mix(x, smoothstep(0.0, 1.0, x), 0.45);
  if (k < 2.5) return mix(x, smoothstep(0.0, 1.0, smoothstep(0.0, 1.0, x)), 0.5);
  if (k < 3.5) return 0.07 + 0.9 * mix(x, smoothstep(0.0, 1.0, x), 0.25);
  if (k < 4.5) { float s = mix(x, smoothstep(0.0, 1.0, x), 0.35); return 0.045 + s * (x > 0.75 ? 0.9 : 0.93); }
  return x <= 0.6 ? x : 0.6 + 0.4 * (1.0 - exp(-(x - 0.6) / 0.4 * 1.6)) / (1.0 - exp(-1.6));
}
vec3 tintOf(float hueDeg) { vec3 c = hsv2rgb(vec3(hueDeg / 360.0, 1.0, 1.0)); return c - vec3(luma(c)); }
void main() {
  vec4 s = texture(uSrc, vUv);
  if (s.a <= 0.0) { o = s; return; }
  vec3 c = s.rgb / s.a;
  if (uSharp > 0.0) { vec4 b = texture(uBlurS, vUv); vec3 bc = b.a > 0.0 ? b.rgb / b.a : c; c += (c - bc) * uSharp * 2.2; }
  if (uClar != 0.0) {
    vec4 b = texture(uBlurL, vUv); vec3 bc = b.a > 0.0 ? b.rgb / b.a : c;
    float L = luma(c), BL = luma(bc), mid = 1.0 - abs(L - 0.5) * 2.0;
    c += vec3((L - BL) * uClar * 1.1 * (0.25 + 0.75 * mid));
  }
  c = max(c, 0.0);
  c *= vec3(1.0 + 0.18 * uTemp, 1.0 + 0.03 * uTemp, 1.0 - 0.20 * uTemp);
  c *= vec3(1.0 + 0.07 * uTint, 1.0 - 0.12 * uTint, 1.0 + 0.07 * uTint);
  c *= exp2(uExp * 1.5);
  float k = uCon > 0.0 ? 1.0 + uCon * 1.1 : 1.0 + uCon * 0.7;
  c = (c - 0.5) * k + 0.5;
  float L = luma(clamp(c, 0.0, 1.0));
  c += uSh * 0.4 * (1.0 - smoothstep(0.0, 0.5, L)) * (1.0 - L)
     + uHi * 0.4 * smoothstep(0.5, 1.0, L) * L
     + uBl * 0.22 * (1.0 - smoothstep(0.0, 0.28, L))
     + uWh * 0.22 * smoothstep(0.72, 1.0, L);
  c = clamp(c, 0.0, 1.0);
  c = vec3(curveF(c.r, uCurve), curveF(c.g, uCurve), curveF(c.b, uCurve));
  // mixer per tonalit\xe0: pesi morbidi tra bande vicine, solo sui colori (non sui grigi)
  vec3 hsv = rgb2hsv(c);
  float hd = hsv.x * 360.0, dh = 0.0, ds = 0.0, dl = 0.0;
  for (int i = 0; i < 8; i++) {
    float d = abs(mod(hd - HUES[i] + 180.0, 360.0) - 180.0);
    float w = clamp(1.0 - d / 45.0, 0.0, 1.0); w = w * w * (3.0 - 2.0 * w);
    dh += uHslH[i] * w; ds += uHslS[i] * w; dl += uHslL[i] * w;
  }
  float sw = smoothstep(0.03, 0.3, hsv.y);
  hsv.x = fract(hsv.x + dh * sw * 30.0 / 360.0);
  hsv.y = clamp(hsv.y * (1.0 + ds * sw), 0.0, 1.0);
  c = hsv2rgb(hsv) * (1.0 + dl * sw * 0.45);
  L = luma(c);
  float mx = max(c.r, max(c.g, c.b)), mn = min(c.r, min(c.g, c.b));
  c = mix(vec3(L), c, 1.0 + uVib * (1.0 - (mx - mn)) * 1.4);
  c = mix(vec3(luma(c)), c, 1.0 + uSat);
  // color grading a tre zone (viraggio senza cambiare la luminanza)
  L = clamp(luma(c), 0.0, 1.0);
  float pivot = 0.5 + uBal * 0.25;
  float wS = 1.0 - smoothstep(0.0, pivot, L), wH = smoothstep(pivot, 1.0, L), wM = clamp(1.0 - wS - wH, 0.0, 1.0);
  c += tintOf(uGSh.x) * uGSh.y * 0.42 * wS + tintOf(uGMid.x) * uGMid.y * 0.32 * wM + tintOf(uGHi.x) * uGHi.y * 0.36 * wH;
  c = mix(c, vec3(0.08) + c * 0.86, uFade);
  o = vec4(clamp(c, 0.0, 1.0) * s.a, s.a);
}`,b=o+`uniform sampler2D uSrc; uniform float uTh;
void main() {
  vec4 s = texture(uSrc, vUv); vec3 c = s.a > 0.0 ? s.rgb / s.a : vec3(0.0);
  float m = smoothstep(uTh, 1.0, luma(c)) * s.a;
  o = vec4(vec3(1.0, 0.28, 0.1) * m, m);
}`,x=o+`uniform sampler2D uSrc, uB; uniform float uK;
void main() { vec4 s = texture(uSrc, vUv), h = texture(uB, vUv) * uK; o = clamp(vec4(s.rgb + h.rgb, max(s.a, min(1.0, h.a * 0.8))), 0.0, 1.0); }`,S=o+`uniform sampler2D uSrc; uniform float uVig, uVigF, uGrain, uGrainSize, uZ, uT;
void main() {
  vec4 s = texture(uSrc, vUv);
  if (s.a <= 0.0) { o = s; return; }
  vec3 c = s.rgb / s.a;
  float asp = uRes.x / uRes.y;
  float r = length((vUv - 0.5) * vec2(asp, 1.0)) / length(vec2(asp, 1.0) * 0.5);
  float f = smoothstep(mix(0.6, 0.05, uVigF), 1.05, r);
  if (uVig > 0.0) c *= 1.0 - f * uVig * 0.9; else c = mix(c, vec3(1.0), f * (-uVig) * 0.9);
  float gs = mix(0.7, 3.6, uGrainSize) * uZ;
  vec2 q = gl_FragCoord.xy / max(gs, 0.35) + fract(uT * 7.31) * vec2(91.7, 37.3);
  float n = (vnoise(q) * 2.0 - 1.0) * 0.65 + (vnoise(q * 2.13 + 5.2) * 2.0 - 1.0) * 0.35;
  float L = luma(c);
  c += n * uGrain * 0.24 * (0.25 + 3.0 * L * (1.0 - L));
  o = vec4(clamp(c, 0.0, 1.0) * s.a, s.a);
}`,C=o+`uniform sampler2D uSrc, uM; uniform vec2 uOff; uniform vec3 uCol; uniform float uOp;
void main() { float a = texture(uM, vUv - uOff).a * uOp; o = over(texture(uSrc, vUv), vec4(uCol * a, a)); }`,z=o+`uniform sampler2D uSrc, uM; uniform vec2 uOff; uniform vec3 uCol; uniform float uOp;
void main() {
  vec4 s = texture(uSrc, vUv);
  if (s.a <= 0.0) { o = s; return; }
  float k = (1.0 - texture(uM, vUv - uOff).a) * uOp;
  vec3 c = s.rgb / s.a;
  vec3 t = luma(uCol) > 0.5 ? blend(c, uCol, 2.0) : blend(c, uCol, 1.0);
  o = vec4(mix(c, t, k) * s.a, s.a);
}`,y=o+`uniform sampler2D uSrc, uM; uniform vec3 uCol, uCol2; uniform float uTwo, uOp;
void main() {
  float g = texture(uM, vUv).a;
  float a = clamp(g * 1.7, 0.0, 1.0) * uOp;
  vec3 col = uTwo > 0.5 ? mix(uCol2, uCol, smoothstep(0.05, 0.75, g)) : uCol;
  o = over(texture(uSrc, vUv), vec4(col * a, a));
}`,k=m+`uniform vec3 uCol; uniform float uOp, uCenter, uChoke, uSize;
void main() {
  vec4 s = texture(uSrc, vUv);
  if (s.a <= 0.0) { o = s; return; }
  float di = -sd(vUv);
  float g = uCenter > 0.5 ? smoothstep(uChoke, uChoke + uSize, di) : 1.0 - smoothstep(uChoke, uChoke + uSize, di);
  vec3 c = s.rgb / s.a;
  o = vec4(mix(c, blend(c, uCol, 2.0), g * uOp) * s.a, s.a);
}`,w=m+`uniform float uSize, uStyle, uTech;
float prof(float x) { x = clamp(x, 0.0, 1.0); return uTech > 0.5 ? x : sin(x * 1.5708); }
void main() {
  float d = sd(vUv), di = -d, h;
  if (uStyle < 0.5) h = d < 0.0 ? prof(di / uSize) : 0.0;
  else if (uStyle < 1.5) h = d > 0.0 ? 1.0 - prof(d / uSize) : 1.0;
  else if (uStyle < 2.5) h = prof((di + uSize * 0.5) / uSize);
  else h = d < 0.0 ? 1.0 - prof(di / uSize) : 1.0 - prof(d / uSize);
  o = vec4(h, h, h, 1.0);
}`,R=m+`uniform sampler2D uH; uniform float uSize, uStyle, uDepth, uAng, uAlt, uGloss, uHiOp, uShOp; uniform vec3 uHi, uShC;
void main() {
  vec4 s = texture(uSrc, vUv);
  vec2 e = px() * 1.5;
  float hx = (texture(uH, vUv + vec2(e.x, 0.0)).r - texture(uH, vUv - vec2(e.x, 0.0)).r) / 1.5;
  float hy = (texture(uH, vUv + vec2(0.0, e.y)).r - texture(uH, vUv - vec2(0.0, e.y)).r) / 1.5;
  float D = uSize * 0.5 * uDepth;
  vec3 n = normalize(vec3(-hx * D, -hy * D, 1.0));
  vec3 L = normalize(vec3(cos(uAng) * cos(uAlt), -sin(uAng) * cos(uAlt), sin(uAlt)));
  float sh0 = L.z, sl = dot(n, L);
  float hl = max(sl - sh0, 0.0) / (1.0 - sh0 + 1e-3);
  float dk = max(sh0 - sl, 0.0) / (sh0 + 1e-3);
  hl = mix(hl, 0.5 - 0.5 * cos(hl * 9.4248), uGloss);
  dk = mix(dk, 0.5 - 0.5 * cos(dk * 6.2832), uGloss * 0.6);
  float d = sd(vUv);
  bool inner = uStyle < 0.5 || uStyle > 1.5;
  vec4 res = s;
  if (s.a > 0.0 && (inner || uStyle < 1.5)) {
    vec3 c = s.rgb / s.a;
    c = mix(c, blend(c, uHi, 2.0), clamp(hl * uHiOp, 0.0, 1.0));
    c = mix(c, blend(c, uShC, 1.0), clamp(dk * uShOp, 0.0, 1.0));
    res = vec4(c * s.a, s.a);
  }
  // smusso esterno, rilievo e cuscino disegnano anche fuori dalla forma
  if (uStyle > 0.5 && d > 0.0 && d < uSize) {
    float ah = clamp(hl * uHiOp, 0.0, 1.0) * 0.75, ad = clamp(dk * uShOp, 0.0, 1.0) * 0.75;
    vec4 lay = ah > ad ? vec4(uHi * ah, ah) : vec4(uShC * ad, ad);
    res = over(res, lay);
  }
  o = res;
}`,A=m+`uniform float uPos, uSize, uGrad, uGAng, uOp; uniform vec3 uCol, uCol2;
void main() {
  vec4 s = texture(uSrc, vUv);
  float d = sd(vUv), w = uSize;
  vec3 col = uCol;
  if (uGrad > 0.5) { vec2 dir = vec2(cos(uGAng), sin(uGAng)); col = mix(uCol, uCol2, clamp(dot(vUv - 0.5, dir) + 0.5, 0.0, 1.0)); }
  if (uPos < 0.5) {           // esterno: sotto il riempimento, cos\xec il bordo interno resta pulito
    float cov = clamp(w - d + 0.5, 0.0, 1.0) * uOp;
    o = over(s, vec4(col * cov, cov));
  } else {
    float e1 = uPos < 1.5 ? -w * 0.5 : -w, e2 = uPos < 1.5 ? w * 0.5 : 0.0;
    float cov = clamp(e2 - d + 0.5, 0.0, 1.0) * clamp(d - e1 + 0.5, 0.0, 1.0) * uOp;
    if (uPos > 1.5) cov *= s.a;
    o = over(vec4(col * cov, cov), s);
  }
}`,T=o+`uniform sampler2D uSrc, uB; uniform vec2 uOff; uniform vec3 uCol; uniform float uOp, uInv;
void main() {
  vec4 s = texture(uSrc, vUv);
  if (s.a <= 0.0) { o = s; return; }
  float v = abs(texture(uB, vUv + uOff).a - texture(uB, vUv - uOff).a);
  v = uInv > 0.5 ? 1.0 - v : v;
  vec3 c = s.rgb / s.a;
  vec3 t = luma(uCol) > 0.5 ? blend(c, uCol, 2.0) : blend(c, uCol, 1.0);
  o = vec4(mix(c, t, clamp(v * 1.4, 0.0, 1.0) * uOp) * s.a, s.a);
}`,L=m+`uniform vec3 uCol; uniform float uMode, uOp;
void main() { vec4 s = texture(uSrc, vUv); if (s.a <= 0.0) { o = s; return; } vec3 c = s.rgb / s.a; o = vec4(mix(c, blend(c, uCol, uMode), uOp) * s.a, s.a); }`,M=m+`uniform vec3 uC1, uC2, uC3; uniform float uThree, uType, uAng, uScale, uMode, uOp;
void main() {
  vec4 s = texture(uSrc, vUv); if (s.a <= 0.0) { o = s; return; }
  vec2 p = (vUv - 0.5) * vec2(uRes.x / uRes.y, 1.0);
  vec2 dir = vec2(cos(uAng), sin(uAng));
  float t;
  if (uType < 0.5) t = dot(vUv - 0.5, dir) / uScale + 0.5;
  else if (uType < 1.5) t = length(p) / (0.6 * uScale);
  else if (uType < 2.5) t = 1.0 - abs(dot(vUv - 0.5, dir)) * 2.0 / uScale;
  else t = fract(atan(p.y, p.x) / 6.2832 + uAng / 6.2832);
  t = clamp(t, 0.0, 1.0);
  vec3 g = uThree > 0.5 ? (t < 0.5 ? mix(uC1, uC2, t * 2.0) : mix(uC2, uC3, t * 2.0 - 1.0)) : mix(uC1, uC2, t);
  vec3 c = s.rgb / s.a;
  o = vec4(mix(c, blend(c, g, uMode), uOp) * s.a, s.a);
}`,_=m+`uniform float uKind, uScale, uMode, uOp;
void main() {
  vec4 s = texture(uSrc, vUv); if (s.a <= 0.0) { o = s; return; }
  vec2 q = gl_FragCoord.xy / (uZ * uScale);
  float v;
  if (uKind < 0.5) v = 0.5 + (hash12(floor(q * 1.5)) - 0.5) * 0.9;
  else if (uKind < 1.5) { float f = fbm(q * vec2(0.012, 0.05)) * 0.6 + fbm(q * 0.08) * 0.4; v = 0.62 + (f - 0.5) * 0.55 + (hash12(floor(q)) - 0.5) * 0.08; }
  else if (uKind < 2.5) { float w = sin(q.x * 1.3) * sin(q.y * 1.3); v = 0.55 + w * 0.12 + (fbm(q * 0.15) - 0.5) * 0.3; }
  else if (uKind < 3.5) { v = 0.5 + (fbm(q * 0.05) - 0.5) * 0.7 + (fbm(q * 0.6) - 0.5) * 0.25; v -= step(0.985, hash12(floor(q * 0.5))) * 0.35; }
  else { float l = smoothstep(0.985, 1.0, vnoise(vec2(q.x * 0.02 + q.y * 0.2, q.y * 0.004) * 6.0)); v = 0.5 + l * 0.5 + (fbm(q * 0.08) - 0.5) * 0.15; }
  vec3 c = s.rgb / s.a;
  o = vec4(mix(c, clamp(blend(c, vec3(v), uMode), 0.0, 1.0), uOp) * s.a, s.a);
}`,U=m+`uniform sampler2D uB1, uB2, uB3; uniform vec3 uCol; uniform float uInt, uTube, uFlick, uEdge;
void main() {
  vec4 s = texture(uSrc, vUv);
  float fl = 1.0;
  if (uFlick > 0.0) { float tt = floor(uT * 14.0); fl = 1.0 - step(1.0 - uFlick * 0.35, hash12(vec2(tt, 3.7))) * 0.55; }
  float g = (texture(uB1, vUv).a * 0.9 + texture(uB2, vUv).a * 0.65 + texture(uB3, vUv).a * 0.45) * uInt * 1.35 * fl;
  g = clamp(g, 0.0, 1.0);
  vec4 glow = vec4(uCol * g, g);
  float A = s.a;
  float e = 1.0 - smoothstep(0.0, uEdge, -sd(vUv));
  vec3 core = mix(uCol, vec3(1.0), uTube * fl);
  vec3 fill = mix(core, uCol, e * 0.8);
  vec4 res = over(vec4(fill * A, A), glow);
  o = mix(s, res, uAmt);
}`,O=m+`uniform int uCount; uniform vec2 uOff; uniform float uUse, uFade; uniform vec3 uCol;
void main() {
  vec4 acc = vec4(0.0);
  for (int i = 10; i >= 1; i--) {
    if (i > uCount) continue;
    vec4 e = texture(uOrig, vUv - uOff * float(i));
    float k = 1.0 - uFade * float(i) / float(uCount + 1);
    vec3 col = uUse > 0.5 ? uCol : (e.a > 0.0 ? e.rgb / e.a : vec3(0.0));
    float a = e.a * k;
    acc = over(vec4(col * a, a), acc);
  }
  vec4 s = texture(uSrc, vUv);
  o = mix(s, over(s, acc), uAmt);
}`,E=m+`uniform float uW;
void main() {
  vec4 s = texture(uSrc, vUv);
  float d = sd(vUv);
  float band = clamp(d + uW + 0.5, 0.0, 1.0) * clamp(0.5 - d, 0.0, 1.0);
  vec3 c = s.a > 0.0 ? s.rgb / s.a : vec3(0.0);
  o = mix(s, vec4(c * band * s.a, band * s.a), uAmt);
}`,D=m+`uniform float uW; uniform vec2 uOff; uniform vec3 uCol;
void main() {
  vec4 s = texture(uSrc, vUv);
  float d = sd(vUv);
  float band = clamp(d + uW + 0.5, 0.0, 1.0) * clamp(0.5 - d, 0.0, 1.0) * s.a;
  vec3 c = s.a > 0.0 ? s.rgb / s.a : vec3(0.0);
  float a2 = texture(uOrig, vUv - uOff).a;
  o = mix(s, over(vec4(c * band, band), vec4(uCol * a2, a2)), uAmt);
}`,P=m+`uniform vec2 uDir; uniform vec3 uCol; uniform float uOp, uFade;
void main() {
  float acc = 0.0;
  for (int k = 1; k <= 128; k++) {
    float f = float(k) / 128.0;
    acc = max(acc, texture(uOrig, vUv - uDir * f).a * (1.0 - uFade * f));
  }
  float a = acc * uOp;
  vec4 s = texture(uSrc, vUv);
  o = mix(s, over(s, vec4(uCol * a, a)), uAmt);
}`,B=m+`uniform vec2 uDir; uniform vec3 uCol, uC2, uC3, uC4; uniform float uShade, uBands;
void main() {
  // la copia pi\xf9 vicina che copre davvero il pixel: fermarsi al primo bordo
  // sfumato (alfa bassa) dava un volume pallido e a righe
  float best = 0.0, bf = 0.0;
  for (int k = 1; k <= 96; k++) {
    float f = float(k) / 96.0;
    float a = texture(uOrig, vUv - uDir * f).a;
    if (a > best + 0.01) { best = a; bf = f; }
    if (best > 0.97) break;
  }
  vec3 col = uCol * (1.0 - uShade * 0.55 * bf) + vec3(0.06) * (1.0 - bf);
  if (uBands > 0.5) {
    // strisce di colore lungo il volume, con un filo scuro tra una fascia e l'altra
    float b = bf * uBands; int bi = int(floor(b)) % 4;
    vec3 bc = bi == 0 ? uCol : bi == 1 ? uC2 : bi == 2 ? uC3 : uC4;
    float edge = smoothstep(0.0, 0.08, fract(b)) * smoothstep(1.0, 0.92, fract(b));
    col = bc * mix(0.25, 1.0, edge) * (1.0 - uShade * 0.25 * bf);
  }
  vec4 lay = vec4(col * best, best);
  vec4 s = texture(uSrc, vUv);
  o = mix(s, over(s, lay), uAmt);
}`,I=m+`uniform float uPow, uSplit, uSlices, uNoise;
void main() {
  float t = floor(uT * 12.0) + 1.0;
  float row = floor(vUv.y * uSlices + hash12(vec2(t, 3.0)) * 2.0);
  float r1 = hash12(vec2(row, t));
  float shift = r1 > 1.0 - uPow * 0.6 ? (hash12(vec2(t, row * 1.7)) - 0.5) * uPow * 0.12 : 0.0;
  vec2 uv = vUv + vec2(shift, 0.0);
  vec2 blk = floor(vUv * vec2(6.0, uSlices * 0.5));
  if (hash12(blk + t) > 1.0 - uPow * 0.15) uv.x += (hash12(blk * 3.1 + t) - 0.5) * 0.08 * uPow;
  float sp = uSplit * 0.025;
  vec4 r = texture(uSrc, uv + vec2(sp, 0.0)), g = texture(uSrc, uv), b = texture(uSrc, uv - vec2(sp * 0.7, sp * 0.25));
  vec4 res = vec4(r.r, g.g, b.b, max(g.a, max(r.a, b.a)));
  vec2 cell = floor(gl_FragCoord.xy / (3.0 * uZ));
  if (hash12(cell + t * 1.3) < uNoise * 0.05) res.rgb = vec3(hash12(cell * 2.1 + t)) * res.a;
  res.rgb *= 1.0 - 0.14 * uPow * step(0.5, fract(gl_FragCoord.y / (2.0 * uZ)));
  o = mix(texture(uSrc, vUv), res, uAmt);
}`,F=o+`uniform sampler2D uSrc; uniform float uTh;
void main() { vec4 s = texture(uSrc, vUv); vec3 c = s.a > 0.0 ? s.rgb / s.a : vec3(0.0); float m = smoothstep(uTh, uTh + 0.25, luma(c)) * s.a; o = vec4(c * m, m); }`,H=m+`uniform sampler2D uB1, uB2; uniform float uInt, uWarm;
void main() {
  vec4 s = texture(uSrc, vUv);
  vec4 b = (texture(uB1, vUv) * 0.6 + texture(uB2, vUv) * 0.8) * uInt * 1.6;
  vec3 tint = mix(vec3(1.0), uWarm > 0.0 ? vec3(1.0, 0.82, 0.58) : vec3(0.62, 0.8, 1.0), abs(uWarm));
  vec4 res = vec4(min(s.rgb + b.rgb * tint, 1.0), clamp(max(s.a, b.a * 0.9), 0.0, 1.0));
  o = mix(s, res, uAmt);
}`,G=m+`uniform vec3 uC1, uC2; uniform float uPos, uSize, uSpeed;
void main() {
  vec4 s = texture(uSrc, vUv); if (s.a <= 0.0) { o = s; return; }
  float t = uT * 0.15 * (uSpeed > 0.0 ? 1.0 : 0.0);
  vec2 asp = vec2(uRes.x / uRes.y, 1.0);
  vec2 p1 = vec2(uPos + 0.12 * sin(t), 0.15 + 0.1 * cos(t * 1.3));
  vec2 p2 = vec2(1.0 - uPos * 0.6, 0.85 + 0.08 * sin(t * 0.7));
  float r = uSize * 0.9;
  float l1 = exp(-pow(length((vUv - p1) * asp) / r, 2.0) * 2.2);
  float l2 = exp(-pow(length((vUv - p2) * asp) / (r * 0.8), 2.0) * 2.6);
  vec3 light = uC1 * l1 + uC2 * l2 * 0.8;
  vec3 c = s.rgb / s.a;
  o = mix(s, vec4(blend(c, clamp(light, 0.0, 1.0), 2.0) * s.a, s.a), uAmt);
}`,q=m+`uniform float uMode, uShape, uSize, uAng, uPaperOn; uniform vec3 uInk, uPaper;
vec4 cellSample(vec2 pp, float ang, float cell, out vec2 f) {
  mat2 R = mat2(cos(ang), -sin(ang), sin(ang), cos(ang)), Rt = mat2(cos(ang), sin(ang), -sin(ang), cos(ang));
  vec2 p = R * pp; vec2 cc = (floor(p / cell) + 0.5) * cell; f = p - cc;
  return texture(uSrc, clamp((Rt * cc) / uRes, 0.0, 1.0));
}
float dotCov(vec2 f, float cell, float v) {
  float aa = 1.0 / cell; v = clamp(v, 0.0, 1.0);
  if (uShape < 0.5) return smoothstep(sqrt(v) * 0.72 + aa, sqrt(v) * 0.72 - aa, length(f) / cell);
  if (uShape < 1.5) return smoothstep(sqrt(v) * 0.5 + aa, sqrt(v) * 0.5 - aa, max(abs(f.x), abs(f.y)) / cell);
  return smoothstep(v * 0.5 + aa, v * 0.5 - aa, abs(f.y) / cell);
}
void main() {
  vec4 s = texture(uSrc, vUv);
  vec2 pp = vUv * uRes;
  float cell = max(uSize * uZ, 2.0);
  vec4 res;
  if (uMode > 1.5) {
    vec2 f; vec4 sc; vec3 cc; float kk;
    vec3 col = uPaperOn > 0.5 ? uPaper : vec3(1.0);
    float cov = 0.0;
    // quadricromia: quattro retini ad angoli diversi, inchiostri sottrattivi
    sc = cellSample(pp, radians(15.0), cell, f); cc = sc.a > 0.0 ? sc.rgb / sc.a : vec3(1.0); kk = 1.0 - max(cc.r, max(cc.g, cc.b));
    float cC = dotCov(f, cell, (1.0 - cc.r - kk) / max(1.0 - kk, 1e-3) * sc.a);
    sc = cellSample(pp, radians(75.0), cell, f); cc = sc.a > 0.0 ? sc.rgb / sc.a : vec3(1.0); kk = 1.0 - max(cc.r, max(cc.g, cc.b));
    float cM = dotCov(f, cell, (1.0 - cc.g - kk) / max(1.0 - kk, 1e-3) * sc.a);
    sc = cellSample(pp, radians(0.0), cell, f); cc = sc.a > 0.0 ? sc.rgb / sc.a : vec3(1.0); kk = 1.0 - max(cc.r, max(cc.g, cc.b));
    float cY = dotCov(f, cell, (1.0 - cc.b - kk) / max(1.0 - kk, 1e-3) * sc.a);
    sc = cellSample(pp, radians(45.0), cell, f); cc = sc.a > 0.0 ? sc.rgb / sc.a : vec3(1.0);
    float cK = dotCov(f, cell, (1.0 - max(cc.r, max(cc.g, cc.b))) * sc.a);
    col *= mix(vec3(1.0), vec3(0.0, 0.68, 0.94), cC) * mix(vec3(1.0), vec3(0.93, 0.0, 0.55), cM) * mix(vec3(1.0), vec3(1.0, 0.95, 0.0), cY) * mix(vec3(1.0), vec3(0.12), cK);
    cov = max(max(cC, cM), max(cY, cK));
    float a = uPaperOn > 0.5 ? s.a : cov * s.a;
    res = vec4(col * a, a);
  } else {
    vec2 f; vec4 sc = cellSample(pp, uAng, cell, f);
    vec3 cc = sc.a > 0.0 ? sc.rgb / sc.a : vec3(1.0);
    float v = uMode < 0.5 ? (1.0 - luma(cc)) : clamp(1.15 - luma(cc) * 0.85, 0.0, 1.0);
    float cov = dotCov(f, cell, v * sc.a);
    vec3 ink = uMode < 0.5 ? uInk : cc;
    if (uPaperOn > 0.5) res = vec4(mix(uPaper, ink, cov) * s.a, s.a);
    else { float a = cov * max(s.a, sc.a); res = vec4(ink * a, a); }
  }
  o = mix(s, res, uAmt);
}`,W=m+`uniform vec3 uInk1, uInk2, uPaper; uniform float uScreen, uSize, uReg1, uReg2, uLoad, uWear;
float sep(vec3 c, vec3 ink) { vec3 k = 1.0 - ink; return clamp(dot(1.0 - c, k) / max(dot(k, k), 1e-3), 0.0, 1.0); }
float b2(vec2 a) { a = floor(a); return fract(dot(a, vec2(0.5, a.y * 0.75))); }
float b4(vec2 a) { return b2(0.5 * a) * 0.25 + b2(a); }
float b8(vec2 a) { return b4(0.5 * a) * 0.25 + b2(a); }
float screenT(vec2 p, float ang) {
  if (uScreen < 0.5) {
    // trama della matrice Riso: ordinata ma "sporcata" da macchie morbide, mai rumore pixel per pixel
    vec2 c = floor(p / max(uSize * uZ, 1.0));
    return clamp(b8(c) * 0.6 + vnoise(c * 0.37) * 0.25 + hash12(c) * 0.15, 0.0, 1.0);
  }
  mat2 R = mat2(cos(ang), -sin(ang), sin(ang), cos(ang));
  float cell = max(uSize * uZ * 2.5, 2.0);
  vec2 q = R * p; vec2 f = fract(q / cell) - 0.5;
  return clamp(length(f) * 1.41, 0.0, 1.0);
}
void main() {
  vec4 s = texture(uSrc, vUv);
  vec2 p = vUv * uRes;
  vec2 o1 = vec2(-0.7, 0.45) * uReg1 * uZ / uRes, o2 = vec2(0.6, -0.5) * uReg2 * uZ / uRes;
  vec4 s1 = texture(uSrc, vUv - o1), s2 = texture(uSrc, vUv - o2);
  vec3 c1 = s1.a > 0.0 ? s1.rgb / s1.a : vec3(1.0), c2 = s2.a > 0.0 ? s2.rgb / s2.a : vec3(1.0);
  float v1 = pow(sep(c1, uInk1), 1.35) * s1.a * 0.92, v2 = pow(sep(c2, uInk2), 1.35) * s2.a * 0.92;
  // inchiostro steso in modo irregolare + carta che non lo prende tutto
  float wear = mix(1.0, 0.55 + 0.45 * fbm(p / (60.0 * uZ)), uWear) * mix(1.0, 0.8 + 0.2 * hash12(floor(p / max(uZ, 0.5))), uWear);
  float t1 = screenT(p, radians(15.0)), t2 = screenT(p + 31.7, radians(75.0));
  float k1 = smoothstep(t1 - 0.06, t1 + 0.06, v1 * uLoad * 1.15 * wear) * 0.94;
  float k2 = smoothstep(t2 - 0.06, t2 + 0.06, v2 * uLoad * 1.15 * wear) * 0.94;
  vec3 col = uPaper * mix(vec3(1.0), uInk1, k1) * mix(vec3(1.0), uInk2, k2);
  col *= 1.0 - (fbm(p / (9.0 * uZ)) - 0.5) * 0.06;
  float a = max(s.a, max(s1.a, s2.a));
  o = mix(s, vec4(col * a, a), uAmt);
}`,N=m+`uniform vec3 uDark, uLight; uniform float uPattern, uSize, uCon, uFour;
float b2(vec2 a) { a = floor(a); return fract(dot(a, vec2(0.5, a.y * 0.75))); }
float b4(vec2 a) { return b2(0.5 * a) * 0.25 + b2(a); }
float b8(vec2 a) { return b4(0.5 * a) * 0.25 + b2(a); }
void main() {
  vec4 s = texture(uSrc, vUv);
  float cs = max(uSize * uZ, 1.0);
  vec2 cell = floor(gl_FragCoord.xy / cs);
  vec2 uv = (cell + 0.5) * cs / uRes;
  vec4 sc = texture(uSrc, vec2(uv.x, uv.y));
  vec3 c = sc.a > 0.0 ? sc.rgb / sc.a : vec3(1.0);
  float L = clamp((luma(c) - 0.5) * (1.0 + uCon) + 0.5, 0.0, 1.0);
  float th = uPattern < 0.5 ? b4(cell) : uPattern < 1.5 ? b8(cell) : hash12(cell);
  vec3 col;
  if (uFour > 0.5) { float q = L * 3.0, base = floor(q); float lv = min(base + step(th, q - base), 3.0); col = mix(uDark, uLight, lv / 3.0); }
  else col = step(th, L) > 0.5 ? uLight : uDark;
  float a = step(0.5, sc.a);
  o = mix(s, vec4(col * a, a), uAmt);
}`,Z=m+`uniform vec3 uC1, uC2, uC3; uniform float uTh, uRough, uOffset;
void main() {
  vec4 s = texture(uSrc, vUv);
  vec2 p = vUv * uRes;
  float n = (fbm(p / (7.0 * uZ)) - 0.5) * uRough * 0.35;
  vec2 off = vec2(0.8, -0.5) * uOffset * uZ / uRes;
  vec4 sa = texture(uSrc, vUv - off), sb = texture(uSrc, vUv + off);
  float La = sa.a > 0.0 ? luma(sa.rgb / sa.a) : 1.0, Lb = sb.a > 0.0 ? luma(sb.rgb / sb.a) : 1.0;
  vec3 col = uC3;
  if (Lb < uTh + 0.18 + n && sb.a > 0.5) col = mix(col, uC2, 0.97);
  if (La < uTh - 0.18 + n && sa.a > 0.5) col = col * 0.25 + uC1 * 0.75;
  col *= 1.0 - (hash12(floor(p / max(uZ, 0.5))) - 0.5) * 0.05;
  float a = max(s.a, max(sa.a, sb.a) * 0.98);
  o = mix(s, vec4(col * a, a), uAmt);
}`,j=m+`uniform vec3 uC1, uC2, uC3; uniform float uThree, uCon;
void main() {
  vec4 s = texture(uSrc, vUv); if (s.a <= 0.0) { o = s; return; }
  vec3 c = s.rgb / s.a;
  float t = clamp((luma(c) - 0.5) * (1.0 + uCon) + 0.5, 0.0, 1.0);
  t = smoothstep(0.0, 1.0, t) * 0.6 + t * 0.4;
  vec3 g = uThree > 0.5 ? (t < 0.5 ? mix(uC1, uC2, t * 2.0) : mix(uC2, uC3, t * 2.0 - 1.0)) : mix(uC1, uC2, t);
  o = mix(s, vec4(g * s.a, s.a), uAmt);
}`,K=m+`uniform float uLevels, uDither, uSat;
float b2(vec2 a) { a = floor(a); return fract(dot(a, vec2(0.5, a.y * 0.75))); }
float b4(vec2 a) { return b2(0.5 * a) * 0.25 + b2(a); }
void main() {
  vec4 s = texture(uSrc, vUv); if (s.a <= 0.0) { o = s; return; }
  vec3 c = s.rgb / s.a;
  c = mix(vec3(luma(c)), c, 1.0 + uSat);
  float d = uDither > 0.5 ? (b4(gl_FragCoord.xy / max(uZ, 1.0)) - 0.5) / (uLevels - 1.0) : 0.0;
  vec3 p = floor(clamp(c + d, 0.0, 1.0) * (uLevels - 1.0) + 0.5) / (uLevels - 1.0);
  o = mix(s, vec4(p * s.a, s.a), uAmt);
}`,V=m+`uniform sampler2D uB; uniform float uPos, uWidth, uFeather, uAng;
void main() {
  vec2 n = vec2(-sin(uAng), cos(uAng));
  float d = abs(dot(vUv - vec2(0.5, uPos), n));
  float m = smoothstep(uWidth * 0.5, uWidth * 0.5 + uFeather, d);
  o = mix(texture(uSrc, vUv), mix(texture(uSrc, vUv), texture(uB, vUv), m), uAmt);
}`,X=m+`uniform vec2 uDir;
void main() {
  vec4 acc = vec4(0.0);
  for (int i = 0; i < 40; i++) acc += texture(uSrc, vUv + uDir * (float(i) / 39.0 - 0.5));
  o = mix(texture(uSrc, vUv), acc / 40.0, uAmt);
}`,Y=m+`uniform float uK; uniform vec2 uC;
void main() {
  vec4 acc = vec4(0.0);
  for (int i = 0; i < 40; i++) acc += texture(uSrc, uC + (vUv - uC) * (1.0 - uK * 0.45 * float(i) / 39.0));
  o = mix(texture(uSrc, vUv), acc / 40.0, uAmt);
}`,$=m+`uniform float uAmp, uLen, uAng, uSpeed;
void main() {
  vec2 pp = vUv * uRes;
  vec2 dir = vec2(cos(uAng), sin(uAng)), perp = vec2(-dir.y, dir.x);
  float ph = dot(pp, dir) / (uLen * uZ) * 6.2832 + uT * 3.0 * step(0.001, uSpeed);
  vec2 uv = vUv + perp * sin(ph) * uAmp * uZ / uRes;
  o = mix(texture(uSrc, vUv), texture(uSrc, uv), uAmt);
}`,J=m+`uniform float uAmp, uLen, uSpeed;
void main() {
  vec2 pp = vUv * uRes, c = 0.5 * uRes;
  float r = length(pp - c);
  float d = sin(r / (uLen * uZ) * 6.2832 - uT * 3.0 * step(0.001, uSpeed)) * uAmp * uZ * smoothstep(0.0, 30.0 * uZ, r);
  vec2 uv = vUv + normalize(pp - c + 1e-4) * d / uRes;
  o = mix(texture(uSrc, vUv), texture(uSrc, uv), uAmt);
}`,Q=m+`uniform float uAng, uR;
void main() {
  vec2 asp = vec2(uRes.x / uRes.y, 1.0);
  vec2 p = (vUv - 0.5) * asp;
  float R = uR * 0.5 * min(asp.x, 1.0) * 2.0;
  float r = length(p);
  vec2 q = p;
  if (r < R) { float a = uAng * pow(1.0 - r / R, 2.0); q = mat2(cos(a), -sin(a), sin(a), cos(a)) * p; }
  o = mix(texture(uSrc, vUv), texture(uSrc, q / asp + 0.5), uAmt);
}`,ee=m+`uniform float uK, uR;
void main() {
  vec2 asp = vec2(uRes.x / uRes.y, 1.0);
  vec2 p = (vUv - 0.5) * asp;
  float R = uR * 0.5 * max(asp.x, 1.0);
  float r = length(p);
  vec2 q = p;
  if (r < R && r > 0.0) { float e = uK >= 0.0 ? 1.0 + uK : 1.0 / (1.0 - uK); q = normalize(p) * R * pow(r / R, e); }
  o = mix(texture(uSrc, vUv), texture(uSrc, q / asp + 0.5), uAmt);
}`,ea=m+`uniform float uShape, uSize, uGap;
void main() {
  float cs = max(uSize * uZ, 1.0);
  vec2 pp = vUv * uRes;
  vec2 center; float edge;
  if (uShape < 0.5) {
    vec2 cell = floor(pp / cs); center = (cell + 0.5) * cs;
    vec2 f = abs(pp - center) / cs; edge = max(f.x, f.y) * 2.0;
  } else {
    vec2 r = vec2(1.0, 1.732) * cs;
    vec2 a = mod(pp, r) - r * 0.5, b = mod(pp - r * 0.5, r) - r * 0.5;
    vec2 g = dot(a, a) < dot(b, b) ? a : b;
    center = pp - g;
    vec2 q = abs(g) / cs; edge = max(q.x * 0.866 + q.y * 0.5, q.y) * 2.0 / 0.866;
  }
  vec4 c = texture(uSrc, center / uRes);
  float keep = 1.0 - smoothstep(1.0 - uGap - 1.0 / cs, 1.0 - uGap, edge);
  if (uGap <= 0.0) keep = 1.0;
  o = mix(texture(uSrc, vUv), c * keep, uAmt);
}`,eo=m+`uniform float uPx, uDist, uRadial;
void main() {
  vec2 d = vUv - 0.5;
  vec2 uv = 0.5 + d * (1.0 + uDist * dot(d, d) * 1.5);
  vec2 dir = uRadial > 0.5 ? (length(d) > 0.0 ? normalize(d) * (0.35 + length(d) * 1.3) : vec2(0.0)) : vec2(1.0, 0.0);
  vec2 off = dir * uPx * uZ / uRes;
  vec4 r = texture(uSrc, uv + off), g = texture(uSrc, uv), b = texture(uSrc, uv - off);
  o = mix(texture(uSrc, vUv), vec4(r.r, g.g, b.b, max(g.a, max(r.a, b.a))), uAmt);
}`,et=m+`uniform float uPow, uBleed, uLines;
vec3 yiq(vec3 c) { return mat3(0.299, 0.596, 0.211, 0.587, -0.274, -0.523, 0.114, -0.322, 0.312) * c; }
vec3 rgbq(vec3 c) { return mat3(1.0, 1.0, 1.0, 0.956, -0.272, -1.106, 0.621, -0.647, 1.703) * c; }
void main() {
  vec2 uv = vUv;
  float line = floor(gl_FragCoord.y / max(uZ, 0.5));
  float tt = floor(uT * 24.0);
  uv.x += (hash12(vec2(line, tt)) - 0.5) * 0.004 * uPow;
  float bd = abs(fract(uv.y - uT * 0.11 - 0.3) - 0.5);
  float band = 1.0 - smoothstep(0.0, 0.035, bd);
  uv.x += band * 0.012 * uPow * sin(uv.y * 160.0 + uT * 15.0);
  vec4 s = texture(uSrc, uv);
  vec3 Y = yiq(s.a > 0.0 ? s.rgb / s.a : vec3(0.0));
  // il colore (I, Q) sbava in orizzontale molto pi\xf9 della luminanza
  vec2 iq = vec2(0.0); float ws = 0.0;
  for (int i = -8; i <= 8; i++) {
    vec4 t = texture(uSrc, uv + vec2(float(i) * uBleed * 0.0035, 0.0));
    vec3 q = yiq(t.a > 0.0 ? t.rgb / t.a : vec3(0.0));
    float w = exp(-float(i * i) / 18.0) * t.a; iq += q.yz * w; ws += w;
  }
  if (ws > 0.0) Y.yz = iq / ws * 0.85;
  vec3 c = rgbq(Y);
  c *= 1.0 - uLines * 0.25 * (0.5 + 0.5 * sin(gl_FragCoord.y / max(uZ, 0.5) * 1.6));
  c += (hash12(vec2(line * 0.37, tt)) - 0.5) * 0.12 * uPow;
  c = mix(c, vec3(luma(c)), 0.12 * uPow);
  float a = s.a;
  o = mix(texture(uSrc, vUv), vec4(clamp(c, 0.0, 1.0) * a, a), uAmt);
}`,ei=m+`uniform sampler2D uB; uniform float uScan, uMask, uCurve, uGlow, uFlick;
void main() {
  vec2 d = vUv - 0.5;
  vec2 uv = 0.5 + d * (1.0 + uCurve * 0.35 * dot(d, d) * 4.0);
  if (uv.x < 0.0 || uv.y < 0.0 || uv.x > 1.0 || uv.y > 1.0) { o = mix(texture(uSrc, vUv), vec4(0.0), uAmt); return; }
  vec4 s = texture(uSrc, uv);
  vec3 c = s.a > 0.0 ? s.rgb / s.a : vec3(0.0);
  vec4 b = texture(uB, uv); vec3 bc = b.a > 0.0 ? b.rgb / b.a : vec3(0.0);
  c = blend(c, bc * uGlow, 2.0);
  float y = gl_FragCoord.y / max(uZ * 1.5, 0.5);
  c *= 1.0 - uScan * 0.45 * (0.5 - 0.5 * cos(y * 6.2832));
  float m = mod(floor(gl_FragCoord.x / max(uZ, 0.5)), 3.0);
  vec3 mask = m < 1.0 ? vec3(1.0, 0.7, 0.7) : m < 2.0 ? vec3(0.7, 1.0, 0.7) : vec3(0.7, 0.7, 1.0);
  c *= mix(vec3(1.0), mask * 1.15, uMask);
  c *= 1.0 - uFlick * 0.08 * hash12(vec2(floor(uT * 30.0), 1.0));
  float v = smoothstep(0.75, 0.35, length(d * vec2(1.0, 1.1)) * (0.6 + uCurve));
  c *= mix(1.0, v, uCurve);
  o = mix(texture(uSrc, vUv), vec4(clamp(c, 0.0, 1.0) * s.a, s.a), uAmt);
}`,el=o+`
uniform sampler2D uSrc; uniform sampler2D uS3;
uniform float uDepth, uBevel, uRx, uRy, uPersp, uMat, uShape, uUseCol, uEnv, uLightA, uRough, uZ;
uniform vec3 uCol;
float sd2(vec2 q) {
  vec2 uv = q / uRes + 0.5;
  if (uv.x < 0.0 || uv.y < 0.0 || uv.x > 1.0 || uv.y > 1.0) { vec2 e = max(abs(q) - uRes * 0.5, 0.0); return length(e) + 40.0; }
  return texture(uS3, uv).r;
}
float map(vec3 p) {
  float s = sd2(p.xy), hd = uDepth * 0.5;
  if (uShape < 0.5) {
    float b = min(uBevel, hd * 0.95);
    vec2 w = vec2(s + b, abs(p.z) - hd + b);
    return min(max(w.x, w.y), 0.0) + length(max(w, 0.0)) - b;
  }
  // gonfiato: il profilo sale come un cuscino dal bordo verso l'interno
  float R = max(uBevel * 2.5, 2.0);
  float t = clamp(-s / R, 0.0, 1.0);
  float h = hd * sqrt(t * (2.0 - t));
  return max(s, (abs(p.z) - h) * 0.55);
}
vec3 nrm(vec3 p) {
  vec2 e = vec2(1.0, -1.0) * 1.4;
  return normalize(e.xyy * map(p + e.xyy) + e.yyx * map(p + e.yyx) + e.yxy * map(p + e.yxy) + e.xxx * map(p + e.xxx));
}
mat3 rotX(float a) { return mat3(1.0, 0.0, 0.0, 0.0, cos(a), sin(a), 0.0, -sin(a), cos(a)); }
mat3 rotY(float a) { return mat3(cos(a), 0.0, -sin(a), 0.0, 1.0, 0.0, sin(a), 0.0, cos(a)); }
float box(vec3 d, vec3 c, float k) { return exp(-k * max(0.0, 1.0 - dot(d, normalize(c)))); }
// ambienti: lo spazio vista ha y verso il basso e la camera guarda +z (i riflessi frontali tornano verso -z)
vec3 env(vec3 d) {
  float up = -d.y;
  if (uEnv < 0.5) {            // studio fotografico: fondale chiaro, due softbox, pavimento grigio
    vec3 c = mix(vec3(0.16, 0.16, 0.17), vec3(0.92), smoothstep(-0.25, 0.4, up));
    c *= 1.0 - 0.55 * smoothstep(0.06, 0.0, abs(up + 0.02));
    c += vec3(1.0) * box(d, vec3(-0.55, -0.55, -0.62), 40.0) * 2.0;
    c += vec3(0.95, 0.97, 1.0) * box(d, vec3(0.7, -0.25, -0.65), 26.0) * 1.2;
    return c;
  }
  if (uEnv < 1.5) {            // tramonto
    vec3 sky = mix(vec3(1.0, 0.55, 0.25), vec3(0.42, 0.18, 0.52), smoothstep(0.0, 0.9, up));
    vec3 ground = mix(vec3(0.16, 0.06, 0.12), vec3(0.6, 0.25, 0.2), smoothstep(-0.6, 0.0, up));
    vec3 c = up > 0.0 ? sky : ground;
    c += vec3(1.0, 0.85, 0.55) * box(d, vec3(0.2, -0.12, -0.97), 60.0) * 2.5;
    return c;
  }
  if (uEnv < 2.5) {            // notte al neon: fasce magenta e ciano
    vec3 c = mix(vec3(0.05, 0.02, 0.12), vec3(0.35, 0.08, 0.4), smoothstep(-0.2, 0.6, up));
    c += vec3(1.0, 0.15, 0.7) * box(d, vec3(-0.8, -0.3, -0.5), 30.0) * 1.8;
    c += vec3(0.1, 0.9, 1.0) * box(d, vec3(0.8, -0.2, -0.55), 30.0) * 1.6;
    c += vec3(0.5, 0.3, 1.0) * smoothstep(0.03, 0.0, abs(up - 0.25)) * 0.8;
    return c;
  }
  // cielo e terra con orizzonte netto: il cromo classico da copertina anni '80
  vec3 c = mix(vec3(1.0), vec3(0.16, 0.38, 0.86), smoothstep(0.0, 0.8, up));
  if (up < 0.0) c = mix(vec3(0.16, 0.11, 0.08), vec3(0.93, 0.84, 0.72), smoothstep(-0.03, -0.75, up));
  c *= 1.0 - 0.8 * smoothstep(0.035, 0.0, abs(up));          // linea d'orizzonte scura e netta
  c += vec3(1.0, 0.97, 0.9) * box(d, vec3(-0.4, -0.8, -0.45), 80.0) * 3.0;
  return c;
}
vec4 albedo(vec2 q) {
  // sui fianchi si prende il colore del bordo pi\xf9 vicino
  float s = sd2(q);
  if (s > -1.0) {
    vec2 g = vec2(sd2(q + vec2(1.0, 0.0)) - sd2(q - vec2(1.0, 0.0)), sd2(q + vec2(0.0, 1.0)) - sd2(q - vec2(0.0, 1.0)));
    q -= normalize(g + 1e-5) * (s + 1.5);
  }
  vec4 c = texture(uSrc, q / uRes + 0.5);
  return c.a > 0.0 ? vec4(c.rgb / c.a, 1.0) : vec4(0.5, 0.5, 0.5, 1.0);
}
vec4 shade(vec3 p, vec3 rd, mat3 R) {
  vec3 n = R * nrm(p);
  vec3 v = -(R * rd);
  vec3 alb = uUseCol > 0.5 ? uCol : albedo(p.xy).rgb;
  vec3 L = normalize(vec3(cos(uLightA) * 0.65, -0.75, -0.6 + sin(uLightA) * 0.2));
  float dif = max(dot(n, L), 0.0);
  float shin = mix(220.0, 18.0, uRough);
  float spe = pow(max(dot(n, normalize(L + v)), 0.0), shin);
  float fr = 0.04 + 0.96 * pow(1.0 - max(dot(n, v), 0.0), 5.0);
  vec3 r = reflect(-v, n);
  float front = smoothstep(0.55, 0.9, abs(n.z));
  // sulle facce frontali il riflesso scorre lungo l'altezza della lettera: cielo sopra, orizzonte netto, terra sotto
  r.y = mix(r.y, (p.y / (uRes.y * 0.5)) * 1.9 - 0.08, front * 0.85);
  r = normalize(r);
  vec3 ev = env(r);
  vec3 c; float a = 1.0;
  if (uMat < 0.5) c = alb * (0.22 + 0.85 * dif) + spe * 0.9 + ev * fr * 0.55;                         // plastica lucida
  else if (uMat < 1.5) c = ev * mix(vec3(0.62), alb * 1.1, uUseCol * 0.35) + spe * 1.3;              // cromo
  else if (uMat < 2.5) { float l = luma(ev); c = mix(vec3(0.28, 0.14, 0.03), vec3(1.0, 0.86, 0.5), smoothstep(0.05, 0.85, l)) * (0.65 + 0.6 * l) + spe * vec3(1.0, 0.92, 0.65) * 1.2; } // oro: luce, non colore, del riflesso
  else if (uMat < 3.5) {                                                                            // vetro
    vec3 t = env(refract(-v, n, 0.66)) * mix(vec3(1.0), alb, 0.65);
    c = mix(t, ev, fr) + spe * 1.4; a = mix(0.6, 1.0, fr);
  }
  else if (uMat < 4.5) c = alb * (0.32 + 0.72 * dif) + spe * 0.12 + vec3(0.06) * pow(1.0 - max(dot(n, v), 0.0), 2.0); // ceramica opaca
  else if (uMat < 5.5) {                                                                            // olografico
    float h = fract(dot(n, vec3(0.35, 0.55, 0.25)) * 1.6 + fr * 0.8);
    c = mix(ev * 0.5, hsv2rgb(vec3(h, 0.5, 1.0)), 0.7) + spe;
  }
  else c = ev * alb * 1.35 + spe * mix(alb, vec3(1.0), 0.5);                                         // metallo colorato
  return vec4(clamp(c, 0.0, 1.0) * a, a);
}
void main() {
  vec2 q = gl_FragCoord.xy - uRes * 0.5;
  float D = max(uRes.x, uRes.y) * mix(7.0, 1.4, uPersp);
  vec3 ro = vec3(0.0, 0.0, -D), rd = normalize(vec3(q, D));
  mat3 R = rotY(uRy) * rotX(uRx);
  mat3 Ri = transpose(R);
  vec3 o2 = Ri * ro, d2 = Ri * rd;
  float hd = uDepth * 0.5 + 3.0;
  float t0 = 0.0, t1 = D * 2.5;
  if (abs(d2.z) > 1e-4) {
    float ta = (-hd - o2.z) / d2.z, tb = (hd - o2.z) / d2.z;
    t0 = max(min(ta, tb), 0.0); t1 = max(ta, tb);
  }
  float t = t0, md = 1e9, tm = t0;
  bool hit = false;
  for (int i = 0; i < 260; i++) {
    vec3 p = o2 + d2 * t;
    float d = map(p);
    if (d < md) { md = d; tm = t; }
    if (d < 0.15) { hit = true; break; }
    t += max(d * 0.7, 0.25);
    if (t > t1) break;
  }
  if (hit) { o = shade(o2 + d2 * t, d2, R); return; }
  // bordo antialias: il punto in cui il raggio \xe8 passato pi\xf9 vicino alla superficie
  float cov = clamp(0.6 - md, 0.0, 1.0);
  if (cov > 0.0) { vec4 c = shade(o2 + d2 * tm, d2, R); o = c * cov; return; }
  o = vec4(0.0);
}`,er=o+`
uniform sampler2D uSrc; uniform float uMode, uScale, uWarp, uGrain, uT, uZ, uAmt, uMix;
uniform vec3 uC1, uC2, uC3, uC4;
vec3 pal(float t) { t = fract(t); return t < 0.333 ? mix(uC1, uC2, t * 3.0) : t < 0.666 ? mix(uC2, uC3, t * 3.0 - 1.0) : mix(uC3, uC4, t * 3.0 - 2.0); }
vec2 warp(vec2 p, float k) { return p + k * vec2(fbm(p + vec2(0.0, uT * 0.07)), fbm(p + vec2(5.2, 1.3) - uT * 0.05)); }
void main() {
  vec4 s = texture(uSrc, vUv);
  vec2 asp = vec2(uRes.x / uRes.y, 1.0);
  vec2 p = (vUv - 0.5) * asp / uScale;
  vec3 c;
  if (uMode < 0.5) {                       // gradiente mesh: quattro punti colore che fluttuano
    vec2 q = warp(p * 1.4, uWarp * 0.8);
    vec2 a = vec2(-0.45, -0.35) + 0.08 * sin(uT * 0.3), b = vec2(0.5, -0.3), cc = vec2(-0.35, 0.45), d = vec2(0.45, 0.4) + 0.08 * cos(uT * 0.25);
    float wa = 1.0 / pow(length(q - a) + 0.15, 2.4), wb = 1.0 / pow(length(q - b) + 0.15, 2.4), wc = 1.0 / pow(length(q - cc) + 0.15, 2.4), wd = 1.0 / pow(length(q - d) + 0.15, 2.4);
    c = (uC1 * wa + uC2 * wb + uC3 * wc + uC4 * wd) / (wa + wb + wc + wd);
  } else if (uMode < 1.5) {                // aurora: tende di luce ondulate su fondo scuro
    vec2 q = warp(p * vec2(1.0, 2.2), uWarp * 0.6);
    float b1 = exp(-pow((q.y + 0.25 * sin(q.x * 2.2 + uT * 0.2)) * 3.0, 2.0));
    float b2 = exp(-pow((q.y - 0.3 + 0.2 * sin(q.x * 1.7 - uT * 0.15)) * 3.5, 2.0));
    c = uC4 * 0.9 + uC1 * b1 * 1.1 + uC2 * b2 * 0.9 + uC3 * pow(max(b1, b2), 3.0) * 0.6;
  } else if (uMode < 2.5) {                // marmo liquido: domain warping a due livelli
    vec2 q = p * 2.0;
    vec2 w1 = vec2(fbm(q + uT * 0.05), fbm(q + vec2(5.2, 1.3)));
    vec2 w2 = vec2(fbm(q + 3.0 * uWarp * w1 + vec2(1.7, 9.2)), fbm(q + 3.0 * uWarp * w1 + vec2(8.3, 2.8) + uT * 0.04));
    c = pal(fbm(q + 3.5 * w2) * 1.3);
  } else if (uMode < 3.5) {                // grana sfumata: gradiente morbido + grana forte
    vec2 q = warp(p, uWarp * 0.5);
    float t = smoothstep(-0.7, 0.7, q.x * 0.7 + q.y * 0.9);
    c = mix(mix(uC1, uC2, t), mix(uC3, uC4, t), smoothstep(-0.6, 0.6, q.y - q.x * 0.3));
  } else if (uMode < 4.5) {                // linee topografiche
    float h = fbm(p * 1.6 + uT * 0.03) * 22.0 * (0.5 + uWarp);
    float l = abs(fract(h) - 0.5) / max(fwidth(h), 1e-4);
    float line = 1.0 - smoothstep(0.6, 1.6, l);
    c = mix(mix(uC4, uC3, smoothstep(0.0, 22.0, h)), uC1, line * 0.9);
  } else {                                 // bolle: metaball morbide
    float f = 0.0;
    for (int i = 0; i < 7; i++) {
      float fi = float(i);
      vec2 c0 = vec2(sin(fi * 1.7 + uT * 0.2 * (1.0 + fi * 0.1)), cos(fi * 2.3 + uT * 0.17)) * 0.55;
      f += (0.06 + 0.02 * sin(fi)) / dot(p - c0, p - c0);
    }
    float m = smoothstep(0.9, 1.1, f);
    c = mix(mix(uC4, uC3, smoothstep(0.0, 0.9, f)), mix(uC1, uC2, smoothstep(1.0, 3.0, f)), m);
  }
  vec2 g = floor(gl_FragCoord.xy / max(uZ, 0.5));
  c += (hash12(g + fract(uT) * 31.0) - 0.5) * uGrain * 0.35;
  vec3 base = s.a > 0.0 ? s.rgb / s.a : vec3(0.0);
  c = mix(c, blend(base, c, 4.0), uMix);
  o = mix(s, vec4(clamp(c, 0.0, 1.0) * s.a, s.a), uAmt);
}`,ec=o+`uniform sampler2D uA, uB; uniform float uK;
void main() { o = mix(texture(uA, vUv), texture(uB, vUv), uK); }`,eu=m+`uniform float uWear, uScale, uSpeck;
void main() {
  vec4 s = texture(uSrc, vUv);
  if (s.a <= 0.0) { o = s; return; }
  vec2 p = vUv * uRes / (uZ * uScale);
  float n = fbm(p * 0.018) * 0.55 + fbm(p * 0.085 + 7.0) * 0.3 + vnoise(p * 0.6) * 0.15;
  float d = -sd(vUv) / uZ;
  float edge = smoothstep(0.0, 7.0, d);
  float keep = smoothstep(uWear - 0.06, uWear + 0.06, n + edge * 0.22);
  float spk = step(1.0 - uSpeck * 0.12, hash12(floor(p * 0.55)));
  keep *= 1.0 - spk;
  o = mix(s, s * keep, uAmt);
}`,es=m+`uniform vec3 uThread, uStitch; uniform float uUseColor, uDensity, uInset;
void main() {
  vec4 s = texture(uSrc, vUv);
  if (s.a <= 0.0) { o = s; return; }
  vec2 p = vUv * uRes / uZ;
  vec2 e = px();
  float d = -sd(vUv) / uZ;
  vec2 gr = vec2(sd(vUv + vec2(e.x, 0.0)) - sd(vUv - vec2(e.x, 0.0)), sd(vUv + vec2(0.0, e.y)) - sd(vUv - vec2(0.0, e.y)));
  vec2 tg = normalize(vec2(-gr.y, gr.x) + 1e-5);
  vec3 base = uUseColor > 0.5 ? uThread : s.rgb / s.a;
  float t = (p.x + p.y) * 0.7071;
  float fiber = 0.5 + 0.5 * sin(t * uDensity + vnoise(p * 0.12) * 4.0);
  float grain = vnoise(p * vec2(0.9, 0.25));
  vec3 col = base * (0.72 + 0.22 * fiber + 0.12 * grain);
  col *= 0.78 + 0.32 * smoothstep(0.0, 4.0, d);                 // il filo si arrotonda verso il bordo
  float band = 1.0 - smoothstep(0.7, 1.5, abs(d - uInset));
  float dash = smoothstep(0.35, 0.45, fract(dot(p, tg) / 6.0)) * (1.0 - smoothstep(0.85, 0.95, fract(dot(p, tg) / 6.0)));
  col = mix(col, uStitch, band * dash * 0.95);
  o = mix(s, vec4(col * s.a, s.a), uAmt);
}`,en=m+`uniform vec3 uA, uB; uniform float uCrinkle, uLight, uBevel;
float hgt(vec2 p) { return fbm(p * 0.03) * 0.6 + vnoise(p * 0.2) * 0.4 * uCrinkle; }
void main() {
  vec4 s = texture(uSrc, vUv);
  if (s.a <= 0.0) { o = s; return; }
  vec2 p = vUv * uRes / uZ;
  vec2 e = px();
  float h = hgt(p);
  vec2 g = vec2(hgt(p + vec2(1.0, 0.0)) - h, hgt(p + vec2(0.0, 1.0)) - h) * 26.0;
  float di = -sd(vUv) / uZ;
  vec2 sg = vec2(sd(vUv + vec2(e.x, 0.0)) - sd(vUv - vec2(e.x, 0.0)), sd(vUv + vec2(0.0, e.y)) - sd(vUv - vec2(0.0, e.y)));
  float bev = 1.0 - smoothstep(0.0, uBevel, di);
  vec3 n = normalize(vec3(-g + normalize(sg + 1e-5) * bev * 1.6, 1.0));
  vec3 L = normalize(vec3(cos(uLight), sin(uLight), 0.75));
  float dif = max(dot(n, L), 0.0);
  float spec = pow(max(dot(reflect(-L, n), vec3(0.0, 0.0, 1.0)), 0.0), 28.0);
  float band = 0.5 + 0.5 * sin((p.x * 0.6 + p.y) * 0.012 + dif * 3.0);
  vec3 col = mix(uA, uB, clamp(dif * 0.75 + band * 0.35, 0.0, 1.0)) + spec * 0.85;
  o = mix(s, vec4(col * s.a, s.a), uAmt);
}`,ef=m+`uniform sampler2D uMat, uNrm, uH, uHb; uniform float uHasMat, uMode, uDepth, uSize, uLight, uScale, uMicro, uScene;
uniform vec3 uInk, uFoilA, uFoilB, uTint;
// rilievo morbido: la forma sfocata, come la carta che si deforma sotto il clich\xe9
float hgt(vec2 uv) { float h = texture(uH, uv).a; return (uMode < 0.5 || uMode > 2.5) ? -h : h; }
void main() {
  vec4 s = texture(uSrc, vUv);
  vec2 p = vUv * uRes / uZ;
  vec2 tuv = p / (1024.0 * uScale);
  vec3 mat = uHasMat > 0.5 ? texture(uMat, tuv).rgb * uTint : uTint * 0.92;
  vec3 nm = uHasMat > 0.5 ? texture(uNrm, tuv).rgb * 2.0 - 1.0 : vec3(0.0, 0.0, 1.0);
  vec3 L = normalize(vec3(cos(uLight), -sin(uLight), 0.9));
  // luce di scena: pi\xf9 luce dal lato della lampada, caduta morbida verso i bordi
  vec2 q = vUv - 0.5;
  float scene = 1.0 + uScene * (dot(normalize(vec2(L.x, -L.y)), q) * 0.35 - dot(q, q) * 0.9);
  if (uMode > 3.5) {
    float micro = 1.0 + dot(nm.xy, L.xy) * uMicro * 0.35;
    o = mix(s, vec4(mat * micro * scene * s.a, s.a), uAmt); return;
  }
  // rilievo: normale dal campo d'altezza (lettera sfocata poco = spigolo netto)
  vec2 e = px() * max(1.0, uSize * uZ * 0.2);
  vec2 g = vec2(hgt(vUv + vec2(e.x, 0.0)) - hgt(vUv - vec2(e.x, 0.0)), hgt(vUv + vec2(0.0, e.y)) - hgt(vUv - vec2(0.0, e.y))) / (2.0 * max(1.0, uSize * uZ * 0.2));
  vec3 n = normalize(vec3(-g * uDepth * uSize * uZ * 1.5, 1.0));
  vec3 nmi = normalize(n + vec3(nm.xy * uMicro * 0.35, 0.0));
  float dif = dot(nmi, L) - L.z;
  float sgn = (uMode < 0.5 || uMode > 2.5) ? -1.0 : 1.0;
  // ombra portata stretta: il bordo della lettera fa ombra dentro (impresso) o fuori (rilievo)
  vec2 ldir = normalize(vec2(L.x, -L.y)) * px() * uSize * uZ * 0.45;
  float inside = texture(uOrig, vUv).a;
  float occl = texture(uH, vUv + ldir * sgn).a;
  float castSh = sgn < 0.0 ? clamp(inside - texture(uOrig, vUv - ldir).a, 0.0, 1.0) * inside
                           : clamp(occl - inside, 0.0, 1.0);
  float halo = texture(uHb, vUv).a;
  // faccia della lettera: il suo colore con la grana del materiale (niente toppe di texture)
  vec3 base = s.a > 0.0 ? s.rgb / s.a : uTint;
  float grain = uHasMat > 0.5 ? 0.9 + 0.2 * luma(texture(uMat, tuv).rgb) : 1.0;
  vec3 face = base * grain * (1.0 + dif * 0.85) * (1.0 - castSh * 0.45 * uDepth);
  if (uMode > 1.5 && uMode < 2.5) {
    float spec = pow(max(dot(reflect(-L, nmi), vec3(0.0, 0.0, 1.0)), 0.0), 26.0);
    float sweep = 0.5 + 0.5 * sin(p.x * 0.004 - p.y * 0.006 + nmi.x * 2.5);
    face = mix(uFoilA, uFoilB, clamp(0.3 + dif * 1.5 + sweep * 0.4, 0.0, 1.0)) * grain + spec * 0.7;
  } else if (uMode > 2.5) {
    float ink = (0.8 + 0.2 * vnoise(p * 0.35)) * smoothstep(0.15, 0.55, vnoise(p * 0.05) * 0.3 + 0.7);
    face = mix(face, uInk * (0.6 + 0.4 * grain) * (1.0 + dif * 0.5), ink);
  }
  face *= scene;
  // attorno: solo luce e ombra trasparenti, cos\xec il rilievo si posa su qualunque fondo
  float zone = clamp(halo * 2.2, 0.0, 1.0) * (1.0 - inside);
  float hiA = clamp(dif * 1.8, 0.0, 1.0) * 0.7 * uDepth * zone;
  float shA = clamp(-dif * 1.8, 0.0, 1.0) * 0.55 * uDepth * zone + castSh * 0.4 * uDepth * (1.0 - inside);
  vec4 around = vec4(vec3(hiA), clamp(hiA + shA, 0.0, 1.0));
  vec4 res = vec4(face * inside, inside) + around * (1.0 - inside);
  o = mix(s, res, uAmt);
}`,ev=m+`uniform vec2 uDir; uniform float uFade, uWobble, uGlow, uSpectrum;
// distanza (in frazione della scia) dalla lettera pi\xf9 vicina risalendo controcorrente, con rifinitura
float reach(vec2 uv0, out vec4 hit) {
  float lo = 0.0, hi = -1.0;
  for (int k = 1; k <= 96; k++) {
    float f = float(k) / 96.0;
    if (texture(uOrig, uv0 - uDir * f).a > 0.5) { hi = f; lo = float(k - 1) / 96.0; break; }
  }
  if (hi < 0.0) { hit = vec4(0.0); return 1.0; }
  for (int i = 0; i < 6; i++) { float m = (lo + hi) * 0.5; if (texture(uOrig, uv0 - uDir * m).a > 0.5) hi = m; else lo = m; }
  hit = texture(uSrc, uv0 - uDir * (hi + 1.5 / 96.0));
  return hi;
}
void main() {
  vec4 s = texture(uSrc, vUv);
  vec2 p = vUv * uRes / uZ;
  vec2 perp = normalize(vec2(-uDir.y, uDir.x) + 1e-6);
  float wob = (vnoise(vec2(dot(p, perp) * 0.03, 5.0)) - 0.5) * uWobble;
  vec3 col = vec3(0.0); float a = 0.0;
  // tre campioni affiancati: la scia \xe8 morbida, non a righe
  for (int j = -1; j <= 1; j++) {
    vec2 uv = vUv + perp * px() * (float(j) * 1.5 + wob * 40.0);
    vec4 hit; float f = reach(uv, hit);
    // ogni filo di luce ha la sua lunghezza: scie sottili e irregolari, non colonne piene
    float lane = dot(p, perp);
    float lv = vnoise(vec2(lane * 0.11, 9.0)) * 0.65 + vnoise(vec2(lane * 0.45, 3.0)) * 0.35;
    float fe = f / mix(0.3, 1.0, lv);
    float w = hit.a * pow(max(1.0 - fe, 0.0), uFade) * (0.55 + 0.45 * vnoise(vec2(lane * 0.8, 17.0)));
    vec3 c = hit.a > 0.0 ? hit.rgb / hit.a : vec3(0.0);
    // dispersione: ogni colonna prende una tinta dello spettro che scorre lungo la scia
    float hue = fract(vnoise(vec2(dot(p, perp) * 0.018, 1.0)) * 1.4 + f * 0.35);
    c = mix(c, hsv2rgb(vec3(hue, 0.9, 1.0)), uSpectrum * smoothstep(0.0, 0.25, f));
    c = mix(c, vec3(1.0), uGlow * pow(1.0 - f, 8.0) * 0.7);
    col += c * w; a += w;
  }
  col /= 3.0; a /= 3.0;
  vec4 tr = vec4(col, a);
  o = mix(s, over(s, tr), uAmt);
}`,ep=m+`uniform vec2 uCenter; uniform float uLen, uInt, uMode; uniform vec3 uCol;
void main() {
  vec4 s = texture(uSrc, vUv);
  vec2 dir = uMode < 0.5 ? (vUv - uCenter) : vec2(sign(vUv.x - uCenter.x) * 0.5, 0.0);
  float acc = 0.0, w = 1.0, tot = 0.0;
  for (int k = 0; k < 64; k++) {
    float f = float(k) / 64.0;
    vec2 uv = vUv - dir * f * uLen;
    acc += texture(uOrig, uv).a * w; tot += w;
    w *= 0.965;
  }
  float r = acc / tot;
  float n = 0.7 + 0.3 * vnoise(vec2(atan(vUv.y - uCenter.y, vUv.x - uCenter.x) * 40.0, 1.0));
  // scie orizzontali: ogni riga ha la sua intensit\xe0, come luce che scorre
  float row = vnoise(vec2(3.0, vUv.y * uRes.y / uZ * 0.12)) * 0.6 + vnoise(vec2(9.0, vUv.y * uRes.y / uZ * 0.5)) * 0.4;
  float m = uMode < 0.5 ? n : pow(row, 2.2) * 2.4;
  float dd = max(sd(vUv) / uZ, 0.0);
  float i = clamp(r * uInt * m * 2.2, 0.0, 1.0) * exp(-dd / (uLen * (uMode < 0.5 ? 700.0 : 380.0)));
  vec3 col = mix(uCol, vec3(1.0), pow(i, 2.0) * 0.8);
  vec4 glow = vec4(col * i, i * 0.9);
  // i raggi stanno dietro; sopra, le lettere restano piene (con un lieve alone chiaro)
  vec4 over1 = over(s, glow);
  o = mix(s, vec4(over1.rgb + uCol * i * 0.25 * s.a, over1.a), uAmt);
}`,ed=m+`uniform vec3 uBase; uniform float uUse, uSize, uSpark, uDust;
vec2 cellRnd(vec2 c) { return vec2(hash12(c), hash12(c + 17.3)); }
void main() {
  vec4 s = texture(uSrc, vUv);
  vec2 P = vUv * uRes / uZ;
  vec2 p = P / uSize;
  vec2 c = floor(p), f = fract(p);
  // scaglie: cella pi\xf9 vicina e seconda pi\xf9 vicina (per il filo scuro tra una e l'altra)
  float md = 9.0, md2 = 9.0; vec2 mc = c;
  for (int j = -1; j <= 1; j++) for (int i = -1; i <= 1; i++) {
    vec2 g = vec2(float(i), float(j)); vec2 o2 = cellRnd(c + g);
    float d = length(g + o2 - f);
    if (d < md) { md2 = md; md = d; mc = c + g; } else if (d < md2) md2 = d;
  }
  // ogni scaglia ha la sua inclinazione: riflette solo se \xe8 girata verso la luce,
  // e la luce scorre sulla parola, cos\xec le scaglie accese si raggruppano
  vec2 r2 = cellRnd(mc * 1.31) - 0.5;
  vec3 n = normalize(vec3(r2 * 1.5, 1.0));
  vec2 sweep = vec2(fbm(P * 0.004), fbm(P * 0.004 + 7.0)) - 0.5;
  vec3 H = normalize(vec3(sweep * 1.6 + vec2(-0.15, -0.2), 1.0));
  float spec = pow(max(dot(n, H), 0.0), 60.0);
  float h = hash12(mc * 1.7);
  float bright = 0.32 + 0.38 * h + spec * (1.2 + uSpark * 2.2);
  vec3 base = uUse > 0.5 ? uBase : (s.a > 0.0 ? s.rgb / s.a : uBase);
  vec3 col = base * bright + vec3(spec * spec) * uSpark * 0.8;
  col *= 0.7 + 0.3 * smoothstep(0.0, 0.12, md2 - md);
  // scintille a stella sulle scaglie pi\xf9 accese (si cercano anche nelle celle vicine)
  float star = 0.0;
  for (int j = -2; j <= 2; j++) for (int i = -2; i <= 2; i++) {
    vec2 cc = c + vec2(float(i), float(j));
    if (hash12(cc * 3.7) < 1.0 - 0.03 * uSpark) continue;
    vec2 sc = cc + cellRnd(cc);
    if (texture(uOrig, sc * uSize * uZ / uRes).a < 0.5) continue;   // solo scaglie della lettera
    vec2 d = (p - sc) * uSize;
    float k = 1.0 / (uSize * 2.2);
    star += exp(-abs(d.x) * k * 0.8) * exp(-abs(d.y) * k * 9.0) + exp(-abs(d.y) * k * 0.8) * exp(-abs(d.x) * k * 9.0);
  }
  col += vec3(star) * uSpark * 0.9;
  float inside = s.a;
  float dust = 0.0;
  float dd = sd(vUv) / uZ;
  if (dd > 0.0) { float r = hash12(floor(P / 1.5)); dust = step(1.0 - uDust * 0.05 * exp(-dd / 35.0), r) * (0.4 + 0.6 * hash12(floor(P / 1.5) + 3.0)); }
  float a = clamp(max(inside, max(dust, star * uSpark * 0.7)), 0.0, 1.0);
  o = mix(s, vec4(col * a, a), uAmt);
}`,em=m+`uniform sampler2D uFrostTex; uniform float uW, uStr, uAng, uHi, uShade, uDisp, uFrost;
vec4 lens(vec2 p, float k, float s, float mag, vec2 ax, vec2 nr) {
  // centro della costa + posizione locale ridotta/capovolta dalla lente
  vec2 q = ax * ((k + 0.5) * uW + s * uW * mag) + nr * dot(p, nr);
  vec2 uv = q * uZ / uRes;
  return mix(texture(uSrc, uv), texture(uFrostTex, uv), uFrost);
}
void main() {
  vec2 p = vUv * uRes / uZ;
  vec2 ax = vec2(cos(uAng), sin(uAng)), nr = vec2(-ax.y, ax.x);
  float u = dot(p, ax) / uW, k = floor(u), s = fract(u) - 0.5;
  float mag = 1.0 - uStr * 4.5;   // < 0: l'immagine dietro la costa si capovolge e si comprime
  vec4 c;
  c.ga = lens(p, k, s, mag, ax, nr).ga;
  c.r = lens(p, k, s, mag * (1.0 + uDisp), ax, nr).r;
  c.b = lens(p, k, s, mag * (1.0 - uDisp), ax, nr).b;
  // volume della costa: ombra ai lati, una luce stretta e un filo scuro di giunzione
  float bend = s * 2.0;
  float sh = 1.0 - uShade * 0.38 * bend * bend;
  float hi = exp(-pow((s - 0.26) * 16.0, 2.0)) * uHi * 0.55 + exp(-pow((s + 0.33) * 26.0, 2.0)) * uHi * 0.18;
  float seam = smoothstep(0.47, 0.5, abs(s)) * uShade * 0.35;
  c.rgb = c.rgb * sh * (1.0 - seam) + vec3(hi) * c.a;
  vec4 base = texture(uSrc, vUv);
  c = vec4(c.rgb + base.rgb * (1.0 - c.a), c.a + base.a * (1.0 - c.a));   // ai bordi non entra il vuoto
  c *= base.a / max(c.a, 1e-4);
  o = mix(base, c, uAmt);
}`,eh=m+`uniform sampler2D uAtlas, uCellTex, uWide, uLocal; uniform float uCell, uN, uMode, uColor, uUnder, uEdges, uCon, uSat, uInv, uStyle, uGrid, uCut, uSplit, uBright; uniform vec3 uInk, uBg, uAccent;
vec3 unp(vec4 c) { return c.a > 0.0 ? c.rgb / c.a : vec3(0.0); }
float glyph(float idx, vec2 f) { return texture(uAtlas, vec2((idx + clamp(f.x, 0.0, 1.0)) / (uN + 4.0), f.y)).r; }
void main() {
  vec2 p = vUv * uRes / uZ;
  vec2 cs = vec2(uCell * 0.62, uCell);
  vec2 cell = floor(p / cs), f = fract(p / cs);
  vec2 cuv = (cell + 0.5) * cs * uZ / uRes;
  vec4 cc = texture(uCellTex, cuv);
  float a = cc.a;
  vec3 col = unp(cc);
  float L = luma(col), Lb = luma(unp(texture(uLocal, cuv)));
  float t = clamp(L + (L - Lb) * uCon * 2.2 + uBright, 0.0, 1.0);
  t = clamp((t - 0.5) * (1.0 + uStyle * 0.6) + 0.5, 0.0, 1.0);
  float dens = uInv > 0.5 ? pow(1.0 - t, 0.85) : t;
  float idx = floor(clamp(dens, 0.0, 0.999) * uN);
  // contorni: differenza di gaussiane sul tono, direzione dal gradiente della versione morbida
  float dog = luma(col) - luma(unp(texture(uWide, cuv)));
  vec2 st = cs * uZ / uRes;
  float gx = luma(unp(texture(uWide, cuv + vec2(st.x, 0.0)))) - luma(unp(texture(uWide, cuv - vec2(st.x, 0.0))));
  float gy = luma(unp(texture(uWide, cuv + vec2(0.0, st.y)))) - luma(unp(texture(uWide, cuv - vec2(0.0, st.y))));
  if (uEdges > 0.0 && abs(dog) > 0.075 / uEdges && length(vec2(gx, gy)) > 0.02 && dens > 0.12) {
    float e = mod(floor((atan(gy, gx) + 3.14159) / 0.785398 + 0.5), 4.0);
    idx = uN + e;
  }
  // soglia del nero: la cella resta vuota, lo spazio negativo disegna
  float on = uInv > 0.5 ? step(uCut, 1.0 - t) : step(uCut, t);
  vec2 sp = vec2(uSplit / cs.x, 0.0);
  float g = glyph(idx, f) * on;
  vec3 gs = vec3(glyph(idx, f - sp), g / max(on, 1e-4), glyph(idx, f + sp)) * on;
  // dettagli: accenti nelle luci pi\xf9 forti, griglia capillare
  float accent = step(0.9, t) * step(0.55, hash12(cell)) * uGrid;
  vec2 fe = min(f, 1.0 - f) * cs * uZ;
  float grid = (1.0 - smoothstep(0.0, 0.9, min(fe.x, fe.y))) * uGrid * 0.18;
  // colore del carattere: la foto con contrasto di colore (saturazione) e luce propria
  vec3 sat = clamp(mix(vec3(L), col, 1.0 + uSat * 0.6), 0.0, 1.0);
  vec3 lit = sat * (0.75 + 0.75 * t) + 0.08 * t;
  vec3 ink = mix(uInk * (0.35 + 0.8 * t), lit, uColor);
  ink = mix(ink, uAccent, accent);
  vec3 res; float alpha = 1.0;
  if (uMode < 0.5) {            // foto sfocata sotto, caratteri luminosi sopra
    vec3 back = unp(texture(uLocal, vUv)) * uUnder * (1.0 - uStyle * 0.45);
    res = back * (1.0 - g * 0.85) + ink * gs;
  } else if (uMode < 1.5) {     // tinta piena (nero)
    vec3 back = mix(uBg, unp(texture(uLocal, vUv)) * 0.6, uUnder * 0.35);
    res = back * (1.0 - g * 0.9) + ink * gs;
  } else if (uMode < 2.5) {     // inchiostro su carta
    vec3 inkP = mix(uInk, col * 0.45 * (0.5 + 0.5 * t), uColor);
    vec3 paper = mix(uBg, uBg * (unp(texture(uLocal, vUv)) * 0.85 + 0.15), uUnder);
    paper *= 0.965 + 0.05 * fbm(p * 0.6);
    res = mix(paper, mix(inkP, uAccent, accent), g * (0.85 + 0.15 * vnoise(p * 1.7)));
  } else {                      // solo caratteri
    res = ink; alpha = max(max(gs.r, gs.g), gs.b);
  }
  res = mix(res, uMode > 1.5 && uMode < 2.5 ? res * 0.8 : res + 0.22 * (1.0 - res), grid * (1.0 - g));
  alpha = max(alpha, uMode > 2.5 ? grid * 0.5 : 0.0);
  alpha *= step(0.02, a);
  o = mix(texture(uSrc, vUv), vec4(res * alpha, alpha), uAmt);
}`,eg=m+`uniform sampler2D uFlowTex; uniform vec3 uInk, uPaper; uniform float uLines, uAng, uFlow, uCross, uColor, uRough, uTh, uMass, uDetail, uWave;
vec3 unp(vec4 c) { return c.a > 0.0 ? c.rgb / c.a : vec3(0.0); }
// una famiglia di linee: x = copertura, y = distanza normalizzata dal bordo della linea
vec2 lineInk(vec2 p, float ang, float dark, float phase) {
  vec2 ax = vec2(cos(ang), sin(ang)), nr = vec2(-ax.y, ax.x);
  float t = dot(p, ax) / uLines + phase;
  float tri = abs(fract(t) - 0.5) * 2.0;           // 0 al centro della linea
  float w = fwidth(t) * 1.1 + 0.015;
  float k = 1.0 - smoothstep(dark - w, dark + w, tri);
  // il bulino si interrompe: piccole pause lungo le linee nelle mezze tinte
  float along = dot(p, nr) / (uLines * 9.0) + hash12(vec2(floor(t), ang * 13.0)) * 7.0;
  float gap = smoothstep(0.0, 0.035, fract(along)) * smoothstep(0.0, 0.035, 1.0 - fract(along));
  k *= mix(1.0, gap, uDetail * smoothstep(0.85, 0.35, dark));
  return vec2(k, clamp((dark - tri) / max(dark, 0.05), 0.0, 1.0));
}
void main() {
  vec4 s = texture(uSrc, vUv);
  if (s.a <= 0.0) { o = s; return; }
  vec2 p = vUv * uRes / uZ;
  vec3 col = unp(s), fc = unp(texture(uFlowTex, vUv));
  float L = luma(col), Lf = luma(fc);
  float tone = clamp((L - uTh) * (1.55 + uMass * 1.6) + 0.5, 0.0, 1.0);
  float dark = pow(1.0 - tone, 1.1);
  float rough = (vnoise(p * 0.35) - 0.5) * uRough * 0.25;
  // le linee si piegano sul tono sfocato: avvolgono i volumi
  float phase = Lf * uFlow * 3.0 + fbm(p * 0.008) * 0.6;
  // le due onde lente delle banconote, incrociate, che fanno ondeggiare tutto il retino
  phase += (sin(dot(p, vec2(0.0061, 0.0023)) * 6.2832) * 0.6 + sin(dot(p, vec2(-0.0019, 0.0047)) * 6.2832 + 1.3) * 0.4) * uWave * 1.6;
  vec2 l1 = lineInk(p, uAng, dark * 0.95 + rough, phase);
  float ink = l1.x, edge = l1.y;
  if (uCross > 0.0) {
    float d2 = clamp((dark - 0.55) / 0.45, 0.0, 1.0) * uCross;
    ink = max(ink, lineInk(p, uAng + 1.0472, d2 * 0.9 + rough, phase * 0.6).x);
    float d3 = clamp((dark - 0.8) / 0.2, 0.0, 1.0) * uCross;
    ink = max(ink, lineInk(p, uAng - 1.0472, d3 * 0.8 + rough, phase * 0.4).x);
  }
  // masse: i neri profondi diventano inchiostro pieno, come una matrice scavata
  ink = max(ink, smoothstep(0.93 - uMass * 0.12, 0.99 - uMass * 0.1, dark) * uMass);
  // puntinato nelle luci, dove le linee spariscono
  vec2 g = p / (uLines * 0.9);
  vec2 gc = floor(g) + 0.5 + (hash22(floor(g)) - 0.5) * 0.6;
  float dotR = smoothstep(0.02, 0.2, dark) * (1.0 - smoothstep(0.2, 0.32, dark)) * 0.22;
  ink = max(ink, (1.0 - smoothstep(dotR - 0.05, dotR + 0.05, length(g - gc))) * uDetail * step(0.001, dotR));
  vec3 inkC = mix(uInk, col * 0.55 * (0.6 + 0.4 * tone) + uInk * 0.15, uColor);
  // l'inchiostro si accumula sul bordo del segno e resta pi\xf9 magro al centro
  inkC *= 1.0 + (edge - 0.5) * 0.18 * uDetail;
  vec3 paper = mix(uPaper, uPaper * (0.82 + 0.18 * col / max(L, 0.05)), uColor * 0.35);
  paper *= 1.0 - uDetail * 0.035 * fbm(p * 0.5);                  // fibra appena visibile
  o = mix(s, vec4(mix(paper, inkC, ink) * s.a, s.a), uAmt);
}`,eb=m+`uniform float uSize, uRefr, uGrout, uGloss; uniform vec3 uGroutCol;
void main() {
  vec2 p = vUv * uRes / uZ;
  vec2 cell = floor(p / uSize), f = fract(p / uSize);
  vec2 rnd = vec2(hash12(cell), hash12(cell + 7.1)) - 0.5;
  vec2 off = (rnd * uRefr + (f - 0.5) * uRefr * 0.6) * uSize * uZ / uRes;
  vec4 c = texture(uSrc, vUv + off);
  float e = min(min(f.x, 1.0 - f.x), min(f.y, 1.0 - f.y));
  float bev = smoothstep(0.0, 0.12, e);
  float light = 0.85 + 0.3 * dot(normalize(vec2(0.6, -0.8)), (f - 0.5) * 2.0) * (1.0 - bev) + rnd.x * 0.25;
  c.rgb *= light;
  // riflesso: un bagliore morbido in un angolo di ogni tessera, diverso per ognuna
  vec2 gp = vec2(0.22 + rnd.x * 0.3, 0.2 + rnd.y * 0.3);
  c.rgb += vec3(exp(-dot(f - gp, f - gp) * 40.0) * uGloss * 0.45) * c.a;
  float grout = 1.0 - smoothstep(uGrout * 0.5, uGrout * 0.5 + 0.02, e);
  c.rgb = mix(c.rgb, uGroutCol * c.a, grout);
  o = mix(texture(uSrc, vUv), c, uAmt);
}`,ex=m+`uniform float uMode, uAng, uScale, uSoft, uStr; uniform vec3 uWarm;
void main() {
  vec4 s = texture(uSrc, vUv);
  vec2 p = vUv * uRes / uZ / uScale;
  float ca = cos(uAng), sa = sin(uAng);
  vec2 q = vec2(ca * p.x + sa * p.y, -sa * p.x + ca * p.y);
  float lit;
  if (uMode < 0.5) {            // finestra: riquadri con montanti, prospettiva obliqua
    q.x += q.y * 0.35;
    vec2 g = fract(q / vec2(260.0, 330.0));
    float bar = min(min(g.x, 1.0 - g.x) * 260.0, min(g.y, 1.0 - g.y) * 330.0);
    lit = smoothstep(10.0, 10.0 + uSoft * 60.0, bar);
  } else if (uMode < 1.5) {     // foglie: macchie di luce e ombra
    float n = fbm(q * 0.006) * 0.7 + fbm(q * 0.02 + 3.0) * 0.3;
    lit = smoothstep(0.42 - uSoft * 0.2, 0.58 + uSoft * 0.2, n);
  } else {                      // caustiche: reticolo luminoso dell'acqua
    vec2 w = q * 0.012;
    float c = 0.0;
    for (int i = 0; i < 3; i++) { w += vec2(sin(w.y * 1.7 + float(i)), cos(w.x * 1.3 - float(i))) * 0.6; c += abs(sin(w.x + w.y)); }
    lit = pow(1.0 - c / 3.0, 3.0 - uSoft * 2.0) * 1.6;
  }
  vec3 col = s.a > 0.0 ? s.rgb / s.a : vec3(0.0);
  float L = luma(col), li = clamp(lit, 0.0, 1.0);
  // ombra fredda e profonda, luce calda che si accende di pi\xf9 sulle superfici chiare
  vec3 shadow = col * mix(vec3(1.0), vec3(0.55, 0.62, 0.8) * (1.0 - uStr * 0.55), uStr);
  vec3 shaded = mix(shadow, col, li) + uWarm * clamp(lit, 0.0, 1.5) * uStr * (0.12 + 0.35 * L) * col;
  shaded += uWarm * pow(clamp(lit, 0.0, 1.5), 3.0) * uStr * 0.08;
  o = mix(s, vec4(shaded * s.a, s.a), uAmt);
}`,eS=m+`uniform vec2 uDir; uniform float uLo, uHi, uVar, uRev;
float lu(vec4 c) { return luma(c.a > 0.0 ? c.rgb / c.a : vec3(0.0)); }
bool inside(float l) { return l >= uLo && l <= uHi; }
void main() {
  vec4 s = texture(uSrc, vUv);
  float l0 = lu(s);
  if (!inside(l0) || s.a < 0.01) { o = s; return; }
  vec2 px = vUv * uRes;
  vec2 dn = normalize(uDir * uRes);
  float row = floor(dot(px, vec2(-dn.y, dn.x)) / max(1.0, uZ));
  float maxLen = mix(1.0, 0.25 + 0.75 * hash12(vec2(row, 3.1)), uVar);
  vec2 stp = uDir * maxLen / 64.0;
  float b = 0.0, f = 0.0;
  for (int k = 1; k <= 64; k++) { vec4 c = texture(uSrc, vUv - stp * float(k)); if (!inside(lu(c)) || c.a < 0.01) break; b = float(k); }
  for (int k = 1; k <= 64; k++) { vec4 c = texture(uSrc, vUv + stp * float(k)); if (!inside(lu(c)) || c.a < 0.01) break; f = float(k); }
  float n = b + f;
  if (n < 2.0) { o = s; return; }
  vec4 cs[32]; float ls[32];
  for (int i = 0; i < 32; i++) { vec4 c = texture(uSrc, vUv + stp * (-b + n * (float(i) + 0.5) / 32.0)); cs[i] = c; ls[i] = lu(c); }
  float t = b / n; if (uRev > 0.5) t = 1.0 - t;
  int want = int(clamp(t * 32.0, 0.0, 31.0));
  vec4 pick = s;
  for (int i = 0; i < 32; i++) {
    int r = 0;
    for (int j = 0; j < 32; j++) r += (ls[j] < ls[i] || (ls[j] == ls[i] && j < i)) ? 1 : 0;
    if (r == want) { pick = cs[i]; break; }
  }
  o = mix(s, pick, uAmt);
}`,eC=m+`uniform sampler2D uSoft; uniform float uSize, uEdge, uDetail, uRelief, uJit;
vec3 unp(vec4 c) { return c.a > 0.0 ? c.rgb / c.a : vec3(0.0); }
vec2 warp(vec2 p) { return vec2(vnoise(p / (uSize * 2.3)), vnoise(p / (uSize * 2.3) + 31.7)) * uSize * uJit; }
vec2 toPx(vec2 v, float sz) { vec2 q = vec2(v.x + v.y * 0.5, v.y * 0.866) * sz; return q - warp(q); }
vec4 samp(vec2 q) { return texture(uSoft, q * uZ / uRes); }
void main() {
  vec2 p = vUv * uRes / uZ;
  vec2 pw = p + warp(p);
  float sz = uSize;
  vec2 v0, v1, v2, f; float up;
  for (int lv = 0; lv < 2; lv++) {
    vec2 g = pw / sz;
    vec2 sk = vec2(g.x - g.y * 0.57735, g.y * 1.1547);
    vec2 c = floor(sk); f = fract(sk);
    up = step(1.0, f.x + f.y);
    v0 = up > 0.5 ? c + vec2(1.0, 1.0) : c;
    v1 = c + vec2(1.0, 0.0); v2 = c + vec2(0.0, 1.0);
    if (lv == 1) break;
    vec3 a = unp(samp(toPx(v0, sz))), b = unp(samp(toPx(v1, sz))), d = unp(samp(toPx(v2, sz)));
    vec3 m = unp(samp(toPx((v0 + v1 + v2) / 3.0, sz)));
    float det = max(max(length(a - m), length(b - m)), length(d - m));
    if (det < 0.3 * (1.0 - uDetail) + 0.07) break;
    sz *= 0.5;
  }
  vec2 P0 = toPx(v0, sz), P1 = toPx(v1, sz), P2 = toPx(v2, sz);
  vec4 A = samp(P0), B = samp(P1), C = samp(P2), M = samp((P0 + P1 + P2) / 3.0);
  vec4 col = (A + B + C + M * 3.0) / 6.0;
  // normale della faccia: la luminosit\xe0 dei vertici fa da altezza
  vec3 e1 = vec3(P1 - P0, (luma(unp(B)) - luma(unp(A))) * sz * 2.2 * uRelief);
  vec3 e2 = vec3(P2 - P0, (luma(unp(C)) - luma(unp(A))) * sz * 2.2 * uRelief);
  vec3 nrm = normalize(cross(e1, e2)); if (nrm.z < 0.0) nrm = -nrm;
  float lit = dot(nrm, normalize(vec3(-0.5, -0.6, 0.62)));
  col.rgb *= 0.78 + 0.34 * lit + 0.06 * (hash12(v0 * 7.0 + up + sz) - 0.5);
  col.rgb += vec3(pow(max(lit, 0.0), 12.0) * 0.12 * uRelief) * col.a;
  float e = min(min(f.x, f.y), abs(1.0 - f.x - f.y));
  col.rgb = mix(col.rgb, col.rgb * 1.18 + 0.03 * col.a, uEdge * (1.0 - smoothstep(0.0, 0.035, e)));
  vec4 base = texture(uSrc, vUv);
  col = vec4(unp(col) * base.a, base.a);   // il contorno resta quello dell'immagine
  o = mix(base, col, uAmt);
}`,ez=m+`uniform float uSeg, uRot, uZoom; uniform vec2 uC;
void main() {
  vec2 q = (vUv - 0.5) * vec2(uRes.x / uRes.y, 1.0);
  float r = length(q) / uZoom, a = atan(q.y, q.x) + uRot;
  float seg = 6.2832 / uSeg;
  a = mod(a, seg); a = abs(a - seg * 0.5);
  vec2 uv = uC + vec2(cos(a), sin(a)) * r * vec2(uRes.y / uRes.x, 1.0);
  o = mix(texture(uSrc, vUv), texture(uSrc, clamp(uv, 0.0, 1.0)), uAmt);
}`,ey=o+`uniform sampler2D uSrc, uRef, uResB, uGlow; uniform float uK, uBloom, uGrain, uT;
vec3 unp(vec4 c) { return c.a > 0.0 ? c.rgb / c.a : vec3(0.0); }
float shoulder(float x) { return x < 0.78 ? x : 0.78 + 0.22 * (1.0 - exp(-(x - 0.78) / 0.22)); }
void main() {
  vec4 s = texture(uSrc, vUv);
  if (s.a <= 0.0) { o = s; return; }
  vec3 c = s.rgb / s.a;
  vec3 rc = unp(texture(uRef, vUv)), bc = unp(texture(uResB, vUv));
  float f = clamp((luma(rc) + 0.03) / (luma(bc) + 0.03), 0.6, 1.9);
  c *= mix(1.0, f, uK);
  // anche il colore medio torna quello della foto
  c += (rc - bc * f) * uK * 0.35;
  c += unp(texture(uGlow, vUv)) * uBloom;
  c = max(c, 0.0);
  c = vec3(shoulder(c.r), shoulder(c.g), shoulder(c.b));
  c += (hash12(vUv * uRes + fract(uT) * 91.0) - 0.5) * uGrain;
  o = vec4(clamp(c, 0.0, 1.0) * s.a, s.a);
}`;e.s(["ADJUST",0,g,"ASCII",0,eh,"BEVEL",0,R,"BEVEL_H",0,w,"BLOOM",0,H,"BLOOM_MASK",0,F,"BULGE",0,ee,"CHROMA",0,eo,"COLOR_OVERLAY",0,L,"CRT",0,ei,"DITHER",0,N,"ECHO",0,O,"EXTRUDE",0,B,"FINISH",0,S,"FLUTED",0,em,"FOIL",0,en,"GENFILL",0,er,"GLITCH",0,I,"GLITTER",0,ed,"GLOW_COMP",0,y,"GRAD_MAP",0,j,"GRAD_OVERLAY",0,M,"GRUNGE",0,eu,"HALFTONE",0,q,"HAL_ADD",0,x,"HAL_MASK",0,b,"HOLLOW",0,E,"IMPRESS",0,ef,"INNER_GLOW",0,k,"INNER_SHADOW",0,z,"KALEIDO",0,ez,"LIGHTCAST",0,ex,"LIGHT_LEAK",0,G,"LINOCUT",0,eg,"LONG_SHADOW",0,P,"LOWPOLY",0,eC,"MASK",0,h,"MASK_A",0,o+"uniform sampler2D uSrc; void main() { o = vec4(texture(uSrc, vUv).a); }","MAT3D",0,el,"MIRRORTILE",0,eb,"MIX_AMT",0,ec,"MOSAIC",0,ea,"MOTION",0,X,"NEON",0,U,"OVER_AB",0,o+"uniform sampler2D uA, uB; void main() { o = over(texture(uA, vUv), texture(uB, vUv)); }","PIXELSORT",0,eS,"POSTERIZE",0,K,"RAYS",0,ep,"RIPPLE",0,J,"RISO",0,W,"SATIN",0,T,"SCREENPRINT",0,Z,"SHADOW_COMP",0,C,"SMEAR",0,ev,"SPLICE",0,D,"STITCH",0,es,"STROKE",0,A,"TEX_OVERLAY",0,_,"TILT",0,V,"TONEMATCH",0,ey,"TWIRL",0,Q,"VHS",0,et,"WAVE",0,$,"ZOOM_BLUR",0,Y],85233)},68933,e=>{"use strict";var a=e.i(13738),o=e.i(85233),t=e.i(55088);let i=(e,a="#000000")=>{let o=String(e??a).replace("#",""),t=3===o.length?o.split("").map(e=>e+e).join(""):o.padEnd(6,"0");return[0,2,4].map(e=>parseInt(t.slice(e,e+2),16)/255)},l=(e,a=0)=>"number"==typeof e?e:void 0===e?a:Number(e)||a,r=e=>e*Math.PI/180;function c(e){let a={...e.adjust??{}},o=e.look&&t.LOOKS.find(a=>a.id===e.look.id);if(o){let t=(e.look.amount??100)/100;for(let[e,i]of Object.entries(o.adjust)){if("curve"===e){t>=.5&&!a.curve&&(a.curve=i);continue}if(/_h$|^gSh_h$|^gMid_h$|^gHi_h$/.test(e)&&!e.startsWith("hsl_")||"grainSize"===e||"vigFeather"===e){void 0===a[e]&&(a[e]=i);continue}a[e]=Math.max(-100,Math.min(100,(a[e]??0)+i*t))}}return a}function u(e){let a=0;for(let o of(0,t.migrateFx)(e.fx)??[])o.on&&(a=Math.max(a,(0,t.fxDef)(o.id)?.pad?.(o.p)??0));let o=c(e);return o.halation&&(a=Math.max(a,6+.25*o.halation)),Math.ceil(a)}function s(e){let a=0;for(let o of(0,t.migrateFx)(e.fx)??[])o.on&&(0,t.fxDef)(o.id)?.animated&&(a=Math.max(a,l(o.p.speed),l(o.p.flicker)));return a}let n=new WeakMap;function f(e,i,r,u,s){let f=a.FxGL.get();if(!f)return!1;let v=e.width,p=e.height;if(!v||!p)return!1;try{let a=f.upload(e,v,p),d=((0,t.migrateFx)(r.fx)??[]).filter(e=>e.on&&(0,t.fxDef)(e.id)),m=function(e){let a=0;for(let o of e){let e=o.p;switch(o.id){case"dropShadow":case"outerGlow":a=Math.max(a,l(e.spread)+1);break;case"innerShadow":a=Math.max(a,l(e.choke)+1);break;case"innerGlow":a=Math.max(a,l(e.choke)+l(e.size,14)+2);break;case"bevel":a=Math.max(a,l(e.size,10)+2);break;case"stroke":a=Math.max(a,l(e.size,6)+2);break;case"neon":a=Math.max(a,.15*l(e.size,18)+3);break;case"hollow":case"splice":a=Math.max(a,l(e.thickness,3)+2);break;case"material3d":a=Math.max(a,1e5);break;case"grunge":a=Math.max(a,10);break;case"glitter":a=Math.max(a,60);break;case"raggi":a=Math.max(a,400);break;case"impressione":break;case"stitch":a=Math.max(a,l(e.inset,5)+6);break;case"foil":a=Math.max(a,l(e.bevel,4)+4)}}return a}(d)*u,h=m>0?f.sdf(a,m+4):null,g={g:f,orig:a,W:v,H:p,z:u,t:s,sdf:h,stroke:function(e){let a=`${e.width}x${e.height}`,o=n.get(e);if(o&&o.key===a)return o.v;let t=Math.min(1,320/Math.max(e.width,e.height)),i=Math.max(1,Math.round(e.width*t)),l=Math.max(1,Math.round(e.height*t)),r=document.createElement("canvas");r.width=i,r.height=l;let c=r.getContext("2d",{willReadFrequently:!0});c.drawImage(e,0,0,i,l);let u=c.getImageData(0,0,i,l).data,s=0,f=0,v=(e,a)=>e>=0&&a>=0&&e<i&&a<l&&u[(a*i+e)*4+3]>127;for(let e=0;e<l;e++)for(let a=0;a<i;a++)v(a,e)&&(s++,v(a+1,e)&&v(a-1,e)&&v(a,e+1)&&v(a,e-1)||f++);let p=f?2*s/f/t:Math.max(e.width,e.height);return n.set(e,{key:a,v:p}),p}(e)/u,mask:e=>h?f.pass("mask",o.MASK,v,p,{uSdf:h,uE:e}):f.pass("maskA",o.MASK_A,v,p,{uSrc:a})},x=c(r),S=function(e,a,i){let{g:l,W:r,H:c,z:u}=e,s=e=>(i[e]??0)/100,n=a;i.blur&&(n=l.blur(a,.35*i.blur*u));let f=t.HSL_BANDS.some(e=>i[`hsl_${e.key}_h`]||i[`hsl_${e.key}_s`]||i[`hsl_${e.key}_l`]),v=!!(i.gSh_s||i.gMid_s||i.gHi_s);if(["temperature","tint","exposure","contrast","highlights","shadows","whites","blacks","clarity","vibrance","saturation","sharpen","fade","curve"].some(e=>i[e])||f||v){let e=i.clarity?l.blur(n,18*u):n,f=i.sharpen?l.blur(n,1.2*Math.max(1,u)):n,v=l.pass("adjust",o.ADJUST,r,c,{uSrc:n,uBlurL:e,uBlurS:f,uTemp:s("temperature"),uTint:s("tint"),uExp:s("exposure"),uCon:s("contrast"),uHi:s("highlights"),uSh:s("shadows"),uWh:s("whites"),uBl:s("blacks"),uClar:s("clarity"),uVib:s("vibrance"),uSat:s("saturation"),uSharp:s("sharpen"),uFade:s("fade"),uCurve:i.curve??0,uBal:s("gBal"),uGSh:[i.gSh_h??0,s("gSh_s")],uGMid:[i.gMid_h??0,s("gMid_s")],uGHi:[i.gHi_h??0,s("gHi_s")],uHslH:t.HSL_BANDS.map(e=>s(`hsl_${e.key}_h`)),uHslS:t.HSL_BANDS.map(e=>s(`hsl_${e.key}_s`)),uHslL:t.HSL_BANDS.map(e=>s(`hsl_${e.key}_l`))});e!==n&&l.release(e),f!==n&&l.release(f),n!==a&&l.release(n),n=v}if(i.halation){let e=l.pass("halMask",o.HAL_MASK,r,c,{uSrc:n,uTh:.62}),t=l.blur(e,(6+.35*i.halation)*u);l.release(e);let f=l.pass("halAdd",o.HAL_ADD,r,c,{uSrc:n,uB:t,uK:1.4*s("halation")});l.release(t),n!==a&&l.release(n),n=f}return n}(g,a,x);for(let e of d){let o=b[e.id];if(!o)continue;let t=o(g,S,e.p,e.amount/100);t!==S&&S!==a&&f.release(S),S=t}return S=function(e,a,t){if(!t.vignette&&!t.grain)return a;let i=e.g.pass("finish",o.FINISH,e.W,e.H,{uSrc:a,uVig:(t.vignette??0)/100,uVigF:(t.vigFeather??50)/100,uGrain:(t.grain??0)/100,uGrainSize:(t.grainSize??25)/100,uZ:e.z,uT:e.t});return a!==e.orig&&e.g.release(a),i}(g,S,x),f.present(S,i),!0}catch(e){return console.warn("[fx] render non riuscito",e),!1}finally{f.releaseAll()}}let v=(e,a,o)=>[Math.cos(r(a))*o*e.z/e.W,Math.sin(r(a))*o*e.z/e.H],p=(e,a,o,t={})=>({uSrc:a,uOrig:e.orig,uZ:e.z,uT:e.t,uAmt:o,...e.sdf?{uSdf:e.sdf}:{},uHasSdf:+!!e.sdf,...t}),d=(e,a,o)=>(t,i,l,r)=>t.g.pass(e,a,t.W,t.H,p(t,i,r,o(t,l))),m=[" .'`,-_:;~^\"+=<>*rcvszxoaeunmwqpdbkhXZOQ8#%&@"," .,:;irsXA253hMHGS#9B&@"," ░▒▓█"," 01"," ·•●"," ／＼｜＿＃"," .:-=+*#%@"," ⠁⠂⠃⠅⠇⠋⠏⠟⠿⡿⣟⣯⣷⣿"," .·:-=≡▪■█"],h=["carta-bianca","carta-grigia","carta-stropicciata","cartoncino-avana","carta-kraft","carta-paglia","gesso","intonaco","cemento-scuro","marmo-nero","pelle","tela","metallo-spazzolato","metallo-bianco","lamina","plastica"];function g(e,a,t,i,l,r=0,c=.025){let u=e.g.blur(t,i),s=e.g.blur(a,i),n=r>0?e.g.blur(a,.3*i):s,f=e.g.pass("tonematch",o.TONEMATCH,e.W,e.H,{uSrc:a,uRef:u,uResB:s,uGlow:n,uK:l,uBloom:r,uGrain:c,uT:e.t});return e.g.release(u,s,a),n!==s&&e.g.release(n),f}let b={dropShadow:(e,a,t)=>{let r=e.mask(-l(t.spread)*e.z),c=l(t.size,20)>0?e.g.blur(r,l(t.size,20)*e.z):r,u=e.g.pass("shadowComp",o.SHADOW_COMP,e.W,e.H,{uSrc:a,uM:c,uOff:v(e,l(t.angle,90),l(t.distance,12)),uCol:i(t.color),uOp:l(t.opacity,35)/100});return e.g.release(r,c),u},innerShadow:(e,a,t)=>{let r=e.mask(l(t.choke)*e.z),c=l(t.size,10)>0?e.g.blur(r,l(t.size,10)*e.z):r,u=e.g.pass("innerShadow",o.INNER_SHADOW,e.W,e.H,{uSrc:a,uM:c,uOff:v(e,l(t.angle,120),l(t.distance,6)),uCol:i(t.color),uOp:l(t.opacity,45)/100});return e.g.release(r,c),u},outerGlow:(e,a,t)=>{let r=e.mask(-l(t.spread)*e.z),c=e.g.blur(r,l(t.size,24)*e.z),u=e.g.pass("glowComp",o.GLOW_COMP,e.W,e.H,{uSrc:a,uM:c,uCol:i(t.color),uCol2:i(t.color2),uTwo:l(t.two),uOp:l(t.opacity,80)/100});return e.g.release(r,c),u},innerGlow:d("innerGlow",o.INNER_GLOW,(e,a)=>({uCol:i(a.color),uOp:l(a.opacity,70)/100,uCenter:l(a.source),uChoke:l(a.choke)*e.z,uSize:Math.max(1,l(a.size,14)*e.z)})),bevel:(e,a,t)=>{let c=Math.max(1,Math.min(l(t.size,10),.45*e.stroke)*e.z),u=e.g.pass("bevelH",o.BEVEL_H,e.W,e.H,p(e,a,1,{uSize:c,uStyle:l(t.style),uTech:l(t.technique)})),s=e.g.blur(u,(1.6+l(t.soften,2))*e.z);e.g.release(u);let n=e.g.pass("bevel",o.BEVEL,e.W,e.H,p(e,a,1,{uH:s,uSize:c,uStyle:l(t.style),uDepth:l(t.depth,100)/100,uAng:r(l(t.angle,120)),uAlt:r(l(t.altitude,32)),uGloss:l(t.gloss)/100,uHi:i(t.hiColor,"#ffffff"),uHiOp:l(t.hiOpacity,75)/100,uShC:i(t.shColor),uShOp:l(t.shOpacity,60)/100}));return e.g.release(s),n},stroke:d("stroke",o.STROKE,(e,a)=>({uPos:l(a.position),uSize:l(a.size,6)*e.z,uCol:i(a.color,"#ffffff"),uCol2:i(a.color2),uGrad:l(a.gradient),uGAng:r(l(a.gangle,90)),uOp:l(a.opacity,100)/100})),satin:(e,a,t)=>{let r=e.g.blur(e.orig,l(t.size,16)*e.z),c=e.g.pass("satin",o.SATIN,e.W,e.H,{uSrc:a,uB:r,uOff:v(e,l(t.angle,19),l(t.distance,14)),uCol:i(t.color),uOp:l(t.opacity,40)/100,uInv:l(t.invert)});return e.g.release(r),c},colorOverlay:d("colorOverlay",o.COLOR_OVERLAY,(e,a)=>({uCol:i(a.color),uMode:l(a.blend),uOp:l(a.opacity,100)/100})),gradientOverlay:d("gradOverlay",o.GRAD_OVERLAY,(e,a)=>({uC1:i(a.c1),uC2:i(a.c2),uC3:i(a.c3,"#ffffff"),uThree:l(a.three),uType:l(a.type),uAng:r(l(a.angle,90)),uScale:l(a.scale,100)/100,uMode:l(a.blend),uOp:l(a.opacity,100)/100})),textureOverlay:d("texOverlay",o.TEX_OVERLAY,(e,a)=>({uKind:l(a.kind,1),uScale:l(a.scale,100)/100,uMode:l(a.blend,3),uOp:l(a.opacity,60)/100})),neon:(e,a,t,r)=>{let c=l(t.size,18)*e.z,u=e.g.blur(e.orig,.3*c),s=e.g.blur(e.orig,c),n=e.g.blur(e.orig,2.2*c),f=e.g.pass("neon",o.NEON,e.W,e.H,p(e,a,r,{uB1:u,uB2:s,uB3:n,uCol:i(t.color),uInt:l(t.intensity,75)/100,uTube:l(t.tube,65)/100,uFlick:l(t.flicker)/100,uEdge:Math.max(1.5*e.z,.12*c)}));return e.g.release(u,s,n),f},echo:d("echo",o.ECHO,(e,a)=>({uCount:Math.round(l(a.count,4)),uOff:v(e,l(a.angle,315),l(a.distance,8)),uUse:l(a.useColor),uCol:i(a.color),uFade:l(a.fade,70)/100})),impressione:(e,a,t,r)=>{let c=h[l(t.material)]??h[0],u=e.g.image(`/assets/materials/${c}.jpg`),s=e.g.image(`/assets/materials/${c}-rilievo.jpg`),n=Math.max(1,Math.min(l(t.size,8),.42*e.stroke)),f=l(t.mode),v=f>3.5?e.orig:e.g.blur(e.orig,n*e.z*.35),d=f>3.5?e.orig:e.g.blur(e.orig,n*e.z*.9),m=e.g.pass("impress",o.IMPRESS,e.W,e.H,p(e,a,r,{uMat:u??a,uNrm:s??a,uH:v,uHb:d,uHasMat:u&&s?1:0,uMode:f,uDepth:l(t.depth,60)/100,uSize:n,uLight:l(t.light,135)*Math.PI/180,uScale:l(t.scale,100)/100,uMicro:l(t.micro,60)/100,uScene:l(t.scene,60)/100,uInk:i(t.ink,"#1d2a6b"),uFoilA:i(t.c1,"#6b4a10"),uFoilB:i(t.c2,"#ffe9a8"),uTint:i(t.tint,"#ffffff")}));return f<=3.5&&e.g.release(v,d),m},vetro:(e,a,t,i)=>{let c=Math.max(4,l(t.width,22)),u=e.g.blur(a,.35*c*e.z),s=e.g.pass("fluted",o.FLUTED,e.W,e.H,p(e,a,i,{uFrostTex:u,uW:c,uStr:l(t.strength,45)/100,uAng:r(l(t.angle,0)),uHi:l(t.highlight,45)/100,uShade:l(t.shade,55)/100,uDisp:l(t.dispersion,25)/100*.12,uFrost:l(t.frost,25)/100}));return e.g.release(u),s},ascii:(e,a,t,r)=>{let c=m[l(t.charset)]??m[0],u=new Set([...c]).size,s=e.g.canvasTex(`ascii4|${c}`,()=>{let e,a,o,t;return e=e=>{let a=document.createElement("canvas");a.width=40,a.height=64;let o=a.getContext("2d",{willReadFrequently:!0});o.fillStyle="#000",o.fillRect(0,0,40,64),o.fillStyle="#fff",o.textAlign="center",o.textBaseline="middle",o.font='700 51.2px "JetBrains Mono", "IBM Plex Mono", "DejaVu Sans Mono", "Noto Sans Symbols 2", "Segoe UI Symbol", monospace',o.fillText(e,20,34);let t=0,i=o.getImageData(0,0,40,64).data;for(let e=0;e<i.length;e+=4)t+=i[e];return{cv:a,cov:t/652800}},a=[...[...new Set([...c])].map(e).sort((e,a)=>e.cov-a.cov),...["|","/","-","\\"].map(e)],(o=document.createElement("canvas")).width=40*a.length,o.height=64,t=o.getContext("2d"),a.forEach((e,a)=>t.drawImage(e.cv,40*a,0)),o}),n=Math.max(3,l(t.cell,7)),f=e.g.blur(a,.35*n*e.z),v=e.g.blur(a,1.1*n*e.z),d=e.g.blur(a,Math.max(2*n,l(t.backBlur,14))*e.z),h=l(t.mode),b=l(t.style,65)/100,x=e.g.pass("ascii",o.ASCII,e.W,e.H,p(e,a,r,{uAtlas:s,uCellTex:f,uWide:v,uLocal:d,uCell:n,uN:u,uMode:h,uColor:l(t.color,100)/100,uUnder:l(t.under,55)/100,uEdges:l(t.edges,60)/100,uCon:l(t.contrast,50)/100,uSat:l(t.saturation,60)/100,uInv:+(2===h),uStyle:b,uGrid:l(t.detail,30)/100,uCut:l(t.cutoff,18)/100,uSplit:l(t.split,0)/10,uBright:l(t.brightness,0)/100,uAccent:i(t.accent,"#ff4d2e"),uInk:i(t.ink,"#f4f1ea"),uBg:i(t.bg,"#07080a")}));e.g.release(f,v,d);let S=l(t.glow,45)/100*(2===h?.15:.7*(3!==h)),C=.5*(1-b)*(0===h?1:1===h?.3:+(2===h));return C>0||S>0?g(e,x,a,1.4*n*e.z,C,S,.018*(3!==h)):x},linocut:(e,a,t,c)=>{let u=Math.max(2,l(t.lines,4.5)),s=e.g.blur(a,3*u*e.z),n=e.g.pass("linocut",o.LINOCUT,e.W,e.H,p(e,a,c,{uFlowTex:s,uInk:i(t.ink,"#1d1915"),uPaper:i(t.paper,"#f3ecdc"),uLines:u,uAng:r(l(t.angle,30)),uFlow:l(t.flow,55)/100,uCross:l(t.cross,60)/100,uColor:l(t.color,0)/100,uRough:l(t.rough,20)/100,uTh:l(t.threshold,50)/100,uMass:l(t.mass,50)/100,uDetail:l(t.detail,70)/100,uWave:l(t.wave,35)/100}));return e.g.release(s),n},specchi:d("mirrortile",o.MIRRORTILE,(e,a)=>({uSize:Math.max(6,l(a.size,26)),uRefr:l(a.refraction,35)/100,uGrout:l(a.grout,6)/100,uGloss:l(a.gloss,50)/100,uGroutCol:i(a.groutColor,"#1a1a1a")})),luceProiettata:d("lightcast",o.LIGHTCAST,(e,a)=>({uMode:l(a.mode),uAng:r(l(a.angle,20)),uScale:l(a.scale,100)/100,uSoft:l(a.soft,50)/100,uStr:l(a.strength,70)/100,uWarm:i(a.warm,"#ffd9a0")})),pixelSort:d("pixelsort",o.PIXELSORT,(e,a)=>({uDir:v(e,l(a.angle,90),l(a.length,420)),uLo:l(a.threshold,45)/100,uHi:l(a.upper,100)/100,uVar:l(a.vary,70)/100,uRev:l(a.reverse)})),lowPoly:(e,a,t,i)=>{let r=Math.max(4,l(t.size,26)),c=e.g.blur(a,.06*r*e.z),u=e.g.pass("lowpoly",o.LOWPOLY,e.W,e.H,p(e,a,i,{uSoft:c,uSize:r,uEdge:l(t.edge,12)/100,uDetail:l(t.detail,60)/100,uRelief:l(t.relief,40)/100*(1+l(t.style,50)/100*.8),uJit:l(t.jitter,45)/100}));return e.g.release(c),g(e,u,a,1.5*r*e.z,.5*(1-l(t.style,50)/100),l(t.glow,15)/100*.3,.02)},caleido:d("kaleido",o.KALEIDO,(e,a)=>({uSeg:Math.max(2,Math.round(l(a.segments,8))),uRot:r(l(a.rotation,0)),uZoom:l(a.zoom,100)/100,uC:[l(a.cx,50)/100,l(a.cy,50)/100]})),grunge:d("grunge",o.GRUNGE,(e,a)=>({uWear:l(a.wear,45)/100,uScale:l(a.scale,100)/100,uSpeck:l(a.speck,40)/100})),stitch:d("stitch",o.STITCH,(e,a)=>({uThread:i(a.color,"#e94f37"),uStitch:i(a.stitch,"#fff4e0"),uUseColor:l(a.useColor),uDensity:l(a.density,70)/40,uInset:l(a.inset,5)})),foil:d("foil",o.FOIL,(e,a)=>({uA:i(a.c1,"#7a5310"),uB:i(a.c2,"#fff1b8"),uCrinkle:l(a.crinkle,60)/100,uLight:l(a.light,220)*Math.PI/180,uBevel:l(a.bevel,4)})),hollow:d("hollow",o.HOLLOW,(e,a)=>({uW:l(a.thickness,3)*e.z})),splice:d("splice",o.SPLICE,(e,a)=>({uW:l(a.thickness,3)*e.z,uOff:v(e,l(a.angle,315),l(a.distance,8)),uCol:i(a.color)})),longShadow:d("longShadow",o.LONG_SHADOW,(e,a)=>({uDir:v(e,l(a.angle,45),l(a.length,120)),uCol:i(a.color),uOp:l(a.opacity,35)/100,uFade:l(a.fade,60)/100})),extrude:d("extrude",o.EXTRUDE,(e,a)=>({uDir:v(e,l(a.angle,45),l(a.depth,24)),uCol:i(a.color),uShade:l(a.shade,60)/100,uBands:l(a.bands),uC2:i(a.c2,"#ffb000"),uC3:i(a.c3,"#ff3d00"),uC4:i(a.c4,"#7a1fa2")})),colata:(e,a,t,i)=>{let r=e.g.pass("smear",o.SMEAR,e.W,e.H,p(e,a,i,{uDir:v(e,l(t.angle,90),l(t.length,260)),uFade:Math.max(.3,l(t.fade,60)/25),uWobble:l(t.wobble,30)/100,uGlow:l(t.glow,50)/100,uSpectrum:l(t.spectrum)/100})),c=e.g.blur(r,1.6*e.z),u=e.g.pass("overAB",o.OVER_AB,e.W,e.H,{uA:a,uB:c});return e.g.release(r,c),u},raggi:d("rays",o.RAYS,(e,a)=>({uCenter:[l(a.cx,50)/100,l(a.cy,50)/100],uLen:l(a.length,60)/100,uInt:l(a.intensity,70)/100,uMode:l(a.mode),uCol:i(a.color,"#7ab8ff")})),glitter:d("glitter",o.GLITTER,(e,a)=>({uBase:i(a.color,"#c9ccd6"),uUse:l(a.useColor,1),uSize:Math.max(.6,Math.min(l(a.size,4),.3*e.stroke)),uSpark:l(a.sparkle,70)/100,uDust:l(a.dust,50)/100})),glitch:d("glitch",o.GLITCH,(e,a)=>({uPow:l(a.power,50)/100,uSplit:l(a.split,30)/100,uSlices:l(a.slices,18),uNoise:l(a.noise,20)/100})),bloom:(e,a,t,i)=>{let r=e.g.pass("bloomMask",o.BLOOM_MASK,e.W,e.H,{uSrc:a,uTh:l(t.threshold,60)/100}),c=l(t.size,30)*e.z,u=e.g.blur(r,.35*c),s=e.g.blur(r,c);e.g.release(r);let n=e.g.pass("bloom",o.BLOOM,e.W,e.H,p(e,a,i,{uB1:u,uB2:s,uInt:l(t.intensity,55)/100,uWarm:l(t.warmth,10)/100}));return e.g.release(u,s),n},lightLeak:d("lightLeak",o.LIGHT_LEAK,(e,a)=>({uC1:i(a.c1),uC2:i(a.c2),uPos:l(a.position,20)/100,uSize:l(a.size,55)/100,uSpeed:l(a.speed)})),halftone:d("halftone",o.HALFTONE,(e,a)=>({uMode:l(a.mode,1),uShape:l(a.shape),uSize:l(a.size,8),uAng:r(l(a.angle,45)),uInk:i(a.ink,"#111111"),uPaperOn:l(a.paperOn,1),uPaper:i(a.paper,"#f5f0e6")})),riso:d("riso",o.RISO,(e,a)=>({uInk1:i(a.ink1),uInk2:i(a.ink2),uPaper:i(a.paper,"#f3eee4"),uScreen:l(a.screen),uSize:l(a.size,3),uReg1:l(a.reg1,2),uReg2:l(a.reg2,6),uLoad:l(a.ink,70)/100,uWear:l(a.texture,45)/100})),dither:d("dither",o.DITHER,(e,a)=>({uDark:i(a.dark),uLight:i(a.light,"#ffffff"),uPattern:l(a.pattern,1),uSize:l(a.size,2),uCon:l(a.contrast,20)/100,uFour:l(a.levels4,1)})),screenprint:d("screenprint",o.SCREENPRINT,(e,a)=>({uC1:i(a.c1),uC2:i(a.c2),uC3:i(a.c3),uTh:l(a.threshold,50)/100,uRough:l(a.rough,40)/100,uOffset:l(a.offset,2)})),gradientMap:d("gradMap",o.GRAD_MAP,(e,a)=>({uC1:i(a.c1),uC2:i(a.c2),uC3:i(a.c3,"#ffffff"),uThree:l(a.three,1),uCon:l(a.contrast,10)/100})),posterize:d("posterize",o.POSTERIZE,(e,a)=>({uLevels:Math.max(2,l(a.levels,4)),uDither:l(a.dither),uSat:l(a.saturation,15)/100})),tiltShift:(e,a,t,i)=>{let c=e.g.blur(a,l(t.size,16)*e.z),u=e.g.pass("tilt",o.TILT,e.W,e.H,p(e,a,i,{uB:c,uPos:l(t.position,50)/100,uWidth:l(t.width,18)/100,uFeather:l(t.feather,22)/100,uAng:r(l(t.angle))}));return e.g.release(c),u},motionBlur:d("motion",o.MOTION,(e,a)=>({uDir:v(e,l(a.angle),l(a.length,30))})),zoomBlur:d("zoomBlur",o.ZOOM_BLUR,(e,a)=>({uK:l(a.amount,25)/100,uC:[l(a.cx,50)/100,l(a.cy,50)/100]})),wave:d("wave",o.WAVE,(e,a)=>({uAmp:l(a.amp,10),uLen:l(a.length,120),uAng:r(l(a.angle)),uSpeed:l(a.speed)})),ripple:d("ripple",o.RIPPLE,(e,a)=>({uAmp:l(a.amp,6),uLen:l(a.length,40),uSpeed:l(a.speed)})),twirl:d("twirl",o.TWIRL,(e,a)=>({uAng:r(l(a.angle,180)),uR:l(a.radius,60)/100})),bulge:d("bulge",o.BULGE,(e,a)=>({uK:l(a.amount,50)/100,uR:l(a.radius,70)/100})),mosaic:d("mosaic",o.MOSAIC,(e,a)=>({uShape:l(a.shape),uSize:l(a.size,12),uGap:l(a.gap)/100})),chroma:d("chroma",o.CHROMA,(e,a)=>({uPx:l(a.amount,6),uDist:l(a.distortion)/100,uRadial:l(a.radial,1)})),vhs:d("vhs",o.VHS,(e,a)=>({uPow:l(a.power,55)/100,uBleed:l(a.bleed,50)/100,uLines:l(a.lines,40)/100})),material3d:(e,a,t,c)=>{if(!e.sdf)return a;let u=e.g.blur(e.sdf,(l(t.shape)>0?2:.8)*Math.max(1,e.z)),s=l(t.spin)>0?e.t*l(t.spin)*.04:0,n=e.g.pass("mat3d",o.MAT3D,e.W,e.H,{uSrc:a,uS3:u,uZ:e.z,uDepth:Math.min(l(t.depth,40),2.6*e.stroke)*e.z,uBevel:Math.min(l(t.bevel,6),.32*e.stroke)*e.z,uRx:r(l(t.rx,18)),uRy:r(l(t.ry,-24))+s,uPersp:l(t.persp,40)/100,uMat:l(t.material),uShape:l(t.shape),uUseCol:l(t.useColor),uCol:i(t.color,"#ff5a36"),uEnv:l(t.env),uLightA:r(l(t.light,220)),uRough:l(t.rough,30)/100});if(e.g.release(u),c>=1)return n;let f=e.g.pass("mixAmt",o.MIX_AMT,e.W,e.H,{uA:a,uB:n,uK:c});return e.g.release(n),f},genFill:d("genFill",o.GENFILL,(e,a)=>({uMode:l(a.mode),uScale:l(a.scale,100)/100,uWarp:l(a.warp,50)/100,uGrain:l(a.grain,20)/100,uMix:l(a.keep)/100,uC1:i(a.c1),uC2:i(a.c2),uC3:i(a.c3),uC4:i(a.c4)})),crt:(e,a,t,i)=>{let r=e.g.blur(a,3*e.z),c=e.g.pass("crt",o.CRT,e.W,e.H,p(e,a,i,{uB:r,uScan:l(t.scan,55)/100,uMask:l(t.mask,45)/100,uCurve:l(t.curve,25)/100,uGlow:l(t.glow,35)/100,uFlick:l(t.speed)/100}));return e.g.release(r),c}};e.s(["fxPadding",()=>u,"fxSpeed",()=>s,"isActive",0,e=>{let a=c(e);return!!((0,t.migrateFx)(e.fx)?.some(e=>e.on)||Object.entries(a).some(([e,a])=>a&&"grainSize"!==e&&"vigFeather"!==e))},"renderFx",()=>f])}]);