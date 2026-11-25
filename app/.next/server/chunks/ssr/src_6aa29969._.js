module.exports=[70911,a=>{"use strict";a.s(["finestra",0,(a,b,c,d=.5)=>{let e=d+(1-d)/Math.max(1,c);return Math.max(0,Math.min(1,(a-b/Math.max(1,c)*(1-e))/e))},"tempoDi",0,a=>({crescita:Math.max(0,Math.min(1,a?.tempo?.crescita??1)),fase:a?.tempo?.fase??0,a:+!!a?.tempo})])},71674,a=>{"use strict";let b=a=>a<=.04045?a/12.92:((a+.055)/1.055)**2.4,c=a=>a<=.0031308?12.92*a:1.055*a**(1/2.4)-.055;function d(a){let c=parseInt((4===a.length?a.replace(/(\w)/g,"$1$1"):a).slice(1,7),16),d=b((c>>16&255)/255),e=b((c>>8&255)/255),f=b((255&c)/255),g=Math.cbrt(.4122214708*d+.5363325363*e+.0514459929*f),h=Math.cbrt(.2119034982*d+.6806995451*e+.1073969566*f),i=Math.cbrt(.0883024619*d+.2817188376*e+.6299787005*f),j=1.9779984951*g-2.428592205*h+.4505937099*i,k=.0259040371*g+.7827717662*h-.808675766*i;return{l:.2104542553*g+.793617785*h-.0040720468*i,c:Math.hypot(j,k),h:(180*Math.atan2(k,j)/Math.PI+360)%360}}function e({l:a,c:b,h:d}){let e=b*Math.cos(d*Math.PI/180),f=b*Math.sin(d*Math.PI/180),g=(a+.3963377774*e+.2158037573*f)**3,h=(a-.1055613458*e-.0638541728*f)**3,i=(a-.0894841775*e-1.291485548*f)**3;return[c(4.0767416621*g-3.3077115913*h+.2309699292*i),c(-1.2684380046*g+2.6097574011*h-.3413193965*i),c(-.0041960863*g-.7034186147*h+1.707614701*i)]}function f(a){let b=Math.max(0,a.c),c=e({...a,c:b});for(let d=0;d<24&&c.some(a=>a<-.001||a>1.001);d++)b*=.9,c=e({...a,c:b});return"#"+c.map(a=>Math.round(255*Math.max(0,Math.min(1,a))).toString(16).padStart(2,"0")).join("")}let g=(a,b,c)=>f({l:a,c:b,h:(c%360+360)%360}),h=a=>(a%360+360)%360;function i(a,b=7){if(a.length<2)return a;let c=a.map(d),e=[];for(let a=0;a<b;a++){let d=a/(b-1)*(c.length-1),g=Math.min(c.length-2,Math.floor(d)),i=d-g,j=c[g],k=c[g+1],l=j.c<.02?k.h:j.h,m=(k.c<.02?j.h:k.h)-l;m>180&&(m-=360),m<-180&&(m+=360),e.push(f({l:j.l+(k.l-j.l)*i,c:j.c+(k.c-j.c)*i,h:h(l+m*i)}))}return e}function j(a,b,c,e){let f=d(a),h=Math.max(.06,f.c);switch(c){case"complementare":return[b,a,((a,b=.55*h)=>g(.26,b,a))(f.h+180),((a,b=.18*h)=>g(.84,b,a))(f.h+180)];case"analoga":return[b,a,((a,b=.6*h)=>g(.5,b,a))(f.h+28,.8*h),((a,b=.55*h)=>g(.26,b,a))(f.h-32)];case"triade":return[b,a,((a,b=.6*h)=>g(.5,b,a))(f.h+150,.35*h),((a,b=.55*h)=>g(.26,b,a))(f.h+210,.4*h)];case"acida":return[b,a,g(Math.min(.9,f.l+.12),Math.min(.3,1.1*h),f.h+100+60*e())];case"notturna":return[b,a,g(.18,.06,f.h+200),g(.34,.08,f.h+220)];default:return[b,a,g(Math.max(.2,f.l-.25),.8*h,f.h),g(Math.max(.12,f.l-.42),.5*h,f.h+12)]}}let k=[[g(.14,.05,285),g(.42,.16,300),g(.88,.05,310)],[g(.12,.03,25),g(.48,.17,30),g(.86,.08,60)],[g(.13,.04,200),g(.5,.11,175),g(.9,.06,150)],[g(.1,.02,260),g(.35,.1,255),g(.82,.04,240)],[g(.16,.06,340),g(.55,.18,355),g(.92,.04,20)],[g(.12,.01,90),g(.6,.06,85),g(.95,.02,90)]];function l(a,b,c){let e=[...a].sort((a,b)=>d(b).c-d(a).c)[0],f=b();if(!e||f>.8)return k[Math.floor(b()*k.length)];let h=d(e),i=Math.max(.05,h.c);return f<.35?c?[g(.16,.4*i,h.h),e,g(.93,.25*i,h.h+15)]:[g(.3,.7*i,h.h-10),e,g(.9,.3*i,h.h+10)]:f<.6?[e,g(h.l,.9*i,h.h+(.5>b()?35:-35))]:[g(c?.22:.35,.5*i,h.h+180),e]}a.s(["ASTRALI",0,k,"armoniaSu",()=>j,"hexToLch",()=>d,"lch",0,g,"rampa",()=>i,"sfumaturaDi",()=>l])},58243,76212,a=>{"use strict";var b=a.i(53413),c=a.i(70911),d=a.i(11761),e=a.i(71674);function f(a,b=[],c=!0){let d=(0,e.sfumaturaDi)(b,a,c),g=a();return{luce:g<.22?"mono":g<.55?"lineare":g<.88||d.length>2?"radiale":"iride",colori:d,angolo:a()*Math.PI*2,bagliore:c?.6>a()?.3+.7*a():0:.3*(.2>a()),grana:.4>a()?.05+.12*a():0}}function g(a,b){let c=a.width,f=a.height,g=(0,d.newCanvas)(c,f),h=g.getContext("2d"),i=(0,d.newCanvas)(c,f),j=i.getContext("2d");if(j.drawImage(a,0,0),"mono"!==b.luce&&b.colori.length>=2){let a;if(j.globalCompositeOperation="source-in","lineare"===b.luce){let d=Math.cos(b.angolo)*c/2,e=Math.sin(b.angolo)*f/2;a=j.createLinearGradient(c/2-d,f/2-e,c/2+d,f/2+e)}else a="radiale"===b.luce?j.createRadialGradient(c/2,f/2,0,c/2,f/2,Math.hypot(c,f)/2):j.createConicGradient(b.angolo,c/2,f/2);let d=(0,e.rampa)("iride"===b.luce?[...b.colori,b.colori[0]]:b.colori,9);d.forEach((b,c)=>a.addColorStop(c/(d.length-1),b)),j.fillStyle=a,j.fillRect(0,0,c,f),j.globalCompositeOperation="source-over"}if(b.bagliore>0&&(h.save(),h.filter=`blur(${Math.round(.012*c)}px)`,h.globalAlpha=Math.min(1,b.bagliore),h.globalCompositeOperation="lighter",h.drawImage(i,0,0),h.filter=`blur(${Math.round(.004*c)}px)`,h.drawImage(i,0,0),h.restore()),h.drawImage(i,0,0),b.grana>0){let a=h.getImageData(0,0,c,f),d=a.data,e=9301;for(let a=0;a<d.length;a+=4){if(d[a+3]<8)continue;let c=(((e=0x41c64e6d*e+12345>>>0)>>>16)/65535-.5)*255*b.grana*2;d[a]=Math.max(0,Math.min(255,d[a]+c)),d[a+1]=Math.max(0,Math.min(255,d[a+1]+c)),d[a+2]=Math.max(0,Math.min(255,d[a+2]+c))}h.putImageData(a,0,0)}return g}function h(a,b,c,f){let g=(0,d.newCanvas)(a,b),h=g.getContext("2d"),i=h.createRadialGradient(a*(.3+.4*c()),b*(.3+.4*c()),0,a/2,b/2,.7*Math.hypot(a,b)),j=(0,e.hexToLch)(f[0]??"#1a1633"),k=j.c<.02?270:j.h;i.addColorStop(0,(0,e.lch)(.2,.045,k)),i.addColorStop(.55,(0,e.lch)(.12,.025,k)),i.addColorStop(1,(0,e.lch)(.07,.01,k)),h.fillStyle=i,h.fillRect(0,0,a,b),h.save(),h.filter=`blur(${Math.round(.08*a)}px)`,h.globalCompositeOperation="lighter";for(let d=0;d<3;d++)h.globalAlpha=.08+.1*c(),h.fillStyle=f[d%f.length],h.beginPath(),h.ellipse(a*c(),b*c(),a*(.2+.3*c()),b*(.1+.2*c()),3*c(),0,6.283),h.fill();h.restore();for(let d=0;d<900;d++){let d=c();h.globalAlpha=.2+.8*d*d,h.fillStyle=d>.97?(0,e.lch)(.97,.03,k+60):(0,e.lch)(.88,.02,k);let f=d>.985?1.6:.6+.5*c();h.beginPath(),h.arc(c()*a,c()*b,f,0,6.283),h.fill()}return h.globalAlpha=1,g}e.ASTRALI,a.s(["fondoCosmico",()=>h,"vesteACaso",()=>f,"vesti",()=>g],76212);var i=a.i(12203);a.i(82065);var j=a.i(11737);let{disegnaCristallo:k,cercaCristalli:l}=i,{disegnaCamera:m,cercaCamere:n}=j,o=0,p={cristallo:{},camera:{}},q=(a,b,c)=>{let d="cristallo"===a?i:j,e=d["cristallo"===a?"descrittoreCristallo":"descrittoreCamera"]?.(b)??[];return[c??String(d["cristallo"===a?"famigliaCristallo":"famigliaCamera"]?.(b)??""),...e.slice(0,2).map(a=>Math.max(0,Math.min(2,Math.floor((a??0)*3))))].join("|")};function r(a,b,c=9e3){if(p=a.collezione?{cristallo:a.collezione.cristallo??{},camera:a.collezione.camera??{}}:{cristallo:{},camera:{}},a.collezione?.giorno!==b){for(let a of["cristallo","camera"]){let d=[];try{d="cristallo"===a?l(`g${b}`,16,c/2):n(`g${b}`,16,c/2)}catch{}let e=p[a];for(let b of d){let c=q(a,b.indirizzo,b.famiglia);(!e[c]||e[c].voto<b.voto)&&(e[c]={indirizzo:b.indirizzo,voto:b.voto,nicchia:c,usi:e[c]?.usi??0})}let f=Object.values(e).sort((a,b)=>b.voto-a.voto).slice(0,80);p[a]=Object.fromEntries(f.map(a=>[a.nicchia,a]))}a.collezione={...p,giorno:b}}}function s(a,b,c){if(a.collezione){for(let d of b.layers){let b=d.genera?.tool;if("cristallo"!==b&&"camera"!==b)continue;let e=String(d.genera.p.indirizzo??""),f=Object.values(a.collezione[b]??{}).find(a=>a.indirizzo===e);if(f)f.voto=Math.max(0,Math.min(2,f.voto+.15*(c-.5))),f.usi++;else if(c>.6){let d=q(b,e),f=a.collezione[b]??={};(!f[d]||f[d].voto<c)&&(f[d]={indirizzo:e,voto:c,nicchia:d,usi:1})}}p={cristallo:a.collezione.cristallo??{},camera:a.collezione.camera??{}}}}let t={cristallo:{giorno:"",indirizzi:[]},camera:{giorno:"",indirizzi:[]}};function u(a,c,d){let e=Object.values(p[a]);if(e.length>=6&&.82>c()){let a=e.map(a=>Math.max(.05,a.voto)/Math.sqrt(1+a.usi)),b=c()*a.reduce((a,b)=>a+b,0);for(let c=0;c<e.length;c++)if((b-=a[c])<=0)return e[c].indirizzo;return e[e.length-1].indirizzo}let f=function(a,b){let c=Object.values(p[a]);if(c.length>=6)return c.map(a=>a.indirizzo);let d=t[a];if(d.giorno!==b||!d.indirizzi.length){try{d.indirizzi=("cristallo"===a?l(`g${b}`,10,2500):n(`g${b}`,12,2500)).map(a=>a.indirizzo)}catch{d.indirizzi=[]}d.giorno=b}return d.indirizzi}(a,d);return f.length&&.7>c()?(0,b.pick)(c,f):String(Math.floor(1e8*c()))}function v(a){return{id:a,label:"cristallo"===a?"Cristallo: una pallina che corre nel reticolo":"Camera: le tracce delle particelle",nature:"segno",pushes:"cristallo"===a?{linee:.35,ripetizione:.3,complessita:.2}:{linee:.4,complessita:.3,curve:.2},available:()=>!0,propose:(c,d)=>{let e,g=.45>d.r();return{indirizzo:u(a,d.r,String(d.giorno??new Date().toISOString().slice(0,10))),colore:(0,b.pick)(d.r,[d.tone.ink,d.tone.ink,d.tone.acc].filter(Boolean)),pieno:g,scala:g?(0,b.range)(d.r,1.25,1.5):(0,b.range)(d.r,.35,.85),x:g?.5:(0,b.range)(d.r,.3,.7),y:g?.5:(0,b.range)(d.r,.3,.7),rot:g?0:(d.r()-.5)*.6,alpha:(0,b.range)(d.r,.7,1),spessore:(0,b.range)(d.r,1.4,4),veste:f(d.r,[d.tone.ink,d.tone.acc],.5>((e=(d.tone.bg??"").replace("#","")).length<6?.5:[0,2,4].reduce((a,b,c)=>a+[.2126,.7152,.0722][c]*parseInt(e.slice(b,b+2),16)/255,0))),blend:(0,b.pick)(d.r,["source-over","source-over","multiply","screen","overlay"])}},apply:async(b,e,f)=>{let h=(0,c.tempoDi)(f),i="cristallo"===a?k(e.indirizzo,{S:900,colore:e.colore,fondo:null,fino:h.crescita,spessore:e.spessore}):m(e.indirizzo,{S:900,colore:e.colore,fondo:null,fino:h.crescita}),j=e.veste?g(i,e.veste):i,l={id:`m${Date.now().toString(36)}${(o++).toString(36)}`,kind:a,canvas:j,x:e.x,y:e.y,scale:e.scala,rot:e.rot,alpha:e.alpha,blend:e.blend};return(0,d.withLayer)(b,l)}}}let w=v("cristallo"),x=v("camera");a.s(["MONDI",0,[w,x],"aggiornaCollezione",()=>r,"imparaCollezione",()=>s,"indirizzoPer",()=>u],58243)},97068,59547,a=>{"use strict";let b=`#version 300 es
in vec2 aPos;
out vec2 vUv;
void main() { vUv = aPos * 0.5 + 0.5; gl_Position = vec4(aPos, 0.0, 1.0); }`,c=`#version 300 es
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
`,d=null,e=new Map,f=new Set,g=!1;class h{canvas;gl;floatOK;progs=new Map;pool=[];live=new Set;vao;static get(){if(g)return null;if(d&&!d.gl.isContextLost())return d;try{d=new h}catch(a){console.warn("[fx] WebGL2 non disponibile",a),g=!0,d=null}return d}constructor(){this.canvas=document.createElement("canvas"),this.canvas.width=this.canvas.height=2;const a=this.canvas.getContext("webgl2",{premultipliedAlpha:!0,alpha:!0,antialias:!1,preserveDrawingBuffer:!0});if(!a)throw Error("webgl2");this.gl=a,this.floatOK=!!a.getExtension("EXT_color_buffer_float"),a.getExtension("OES_texture_float_linear");const b=a.createBuffer();a.bindBuffer(a.ARRAY_BUFFER,b),a.bufferData(a.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),a.STATIC_DRAW),this.vao=a.createVertexArray(),a.bindVertexArray(this.vao),a.enableVertexAttribArray(0),a.vertexAttribPointer(0,2,a.FLOAT,!1,0,0),a.disable(a.BLEND),this.canvas.addEventListener("webglcontextlost",()=>{d=null})}tex(a,b,c=this.floatOK?"rgba16f":"rgba8"){"rgba8"===c||this.floatOK||(c="rgba8");let d=this.pool.findIndex(d=>d.w===a&&d.h===b&&d.fmt===c);if(d>=0){let a=this.pool.splice(d,1)[0];return this.live.add(a),a}let e=this.gl,f=e.createTexture();e.bindTexture(e.TEXTURE_2D,f);let[g,h]="rgba32f"===c?[e.RGBA32F,e.FLOAT]:"rgba16f"===c?[e.RGBA16F,e.HALF_FLOAT]:[e.RGBA8,e.UNSIGNED_BYTE];e.texImage2D(e.TEXTURE_2D,0,g,a,b,0,e.RGBA,h,null);let i="rgba32f"===c?e.NEAREST:e.LINEAR;e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,i),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,i),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE);let j=e.createFramebuffer();e.bindFramebuffer(e.FRAMEBUFFER,j),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,f,0);let k={t:f,f:j,w:a,h:b,fmt:c};return this.live.add(k),k}release(...a){for(let b of a)b&&this.live.delete(b)&&this.pool.push(b);for(;this.pool.length>48;){let a=this.pool.shift();this.gl.deleteTexture(a.t),this.gl.deleteFramebuffer(a.f)}}releaseAll(){this.release(...this.live)}canvasTex(a,b){let c=e.get(a);if(!c?.tex){let d=b(),f=this.gl,g=f.createTexture();f.bindTexture(f.TEXTURE_2D,g),f.pixelStorei(f.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),f.texImage2D(f.TEXTURE_2D,0,f.RGBA8,f.RGBA,f.UNSIGNED_BYTE,d),f.texParameteri(f.TEXTURE_2D,f.TEXTURE_MIN_FILTER,f.LINEAR),f.texParameteri(f.TEXTURE_2D,f.TEXTURE_MAG_FILTER,f.LINEAR),f.texParameteri(f.TEXTURE_2D,f.TEXTURE_WRAP_S,f.CLAMP_TO_EDGE),f.texParameteri(f.TEXTURE_2D,f.TEXTURE_WRAP_T,f.CLAMP_TO_EDGE),c={tex:{t:g,f:null,w:d.width,h:d.height,fmt:"rgba8"}},e.set(a,c)}return c.tex}image(a){let b=e.get(a);if(!b){b={tex:null},e.set(a,b);let c=b,d=new Image;d.crossOrigin="anonymous",d.onload=()=>{let a=this.gl,b=a.createTexture();a.bindTexture(a.TEXTURE_2D,b),a.pixelStorei(a.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),a.texImage2D(a.TEXTURE_2D,0,a.RGBA8,a.RGBA,a.UNSIGNED_BYTE,d),a.generateMipmap(a.TEXTURE_2D),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,a.LINEAR_MIPMAP_LINEAR),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MAG_FILTER,a.LINEAR),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_S,a.MIRRORED_REPEAT),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_T,a.MIRRORED_REPEAT),c.tex={t:b,f:null,w:d.width,h:d.height,fmt:"rgba8"},f.forEach(a=>a())},d.src=a}return b.tex}upload(a,b,c){let d=this.gl,e=this.tex(b,c,"rgba8");return d.bindTexture(d.TEXTURE_2D,e.t),d.pixelStorei(d.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!0),d.pixelStorei(d.UNPACK_FLIP_Y_WEBGL,!1),d.texImage2D(d.TEXTURE_2D,0,d.RGBA8,b,c,0,d.RGBA,d.UNSIGNED_BYTE,a),e}program(a,c){let d=this.progs.get(a);if(d)return d;let e=this.gl,f=(b,c)=>{let d=e.createShader(b);if(e.shaderSource(d,c),e.compileShader(d),!e.getShaderParameter(d,e.COMPILE_STATUS))throw Error(`[fx] shader "${a}": ${e.getShaderInfoLog(d)}`);return d},g=e.createProgram();if(e.attachShader(g,f(e.VERTEX_SHADER,b)),e.attachShader(g,f(e.FRAGMENT_SHADER,c)),e.bindAttribLocation(g,0,"aPos"),e.linkProgram(g),!e.getProgramParameter(g,e.LINK_STATUS))throw Error(`[fx] link "${a}": ${e.getProgramInfoLog(g)}`);let h=new Map,i=e.getProgramParameter(g,e.ACTIVE_UNIFORMS);for(let a=0;a<i;a++){let b=e.getActiveUniform(g,a);h.set(b.name.replace(/\[0\]$/,""),{loc:e.getUniformLocation(g,b.name),type:b.type})}let j={p:g,u:h};return this.progs.set(a,j),j}run(a,b,c,d={},e){let f=this.gl,g=this.program(a,b);f.useProgram(g.p),f.bindVertexArray(this.vao);let[h,i]=c?[c.w,c.h]:e;f.bindFramebuffer(f.FRAMEBUFFER,c?c.f:null),f.viewport(0,0,h,i);let j=0;for(let[a,b]of Object.entries({uRes:[h,i],...d})){let c=g.u.get(a);c&&("object"!=typeof b||Array.isArray(b)?"number"==typeof b?c.type===f.INT||c.type===f.BOOL?f.uniform1i(c.loc,b):f.uniform1f(c.loc,b):2===b.length?f.uniform2fv(c.loc,b):3===b.length?f.uniform3fv(c.loc,b):4===b.length?f.uniform4fv(c.loc,b):f.uniform1fv(c.loc,b):(f.activeTexture(f.TEXTURE0+j),f.bindTexture(f.TEXTURE_2D,b.t),f.uniform1i(c.loc,j++)))}f.drawArrays(f.TRIANGLE_STRIP,0,4),f.activeTexture(f.TEXTURE0)}pass(a,b,c,d,e,f){let g=this.tex(c,d,f);return this.run(a,b,g,e),g}blur(a,b){let c=[],d=a,e=1;for(;b*e>6&&d.w>4&&d.h>4;){let a=this.pass("down",i,Math.max(1,Math.ceil(d.w/2)),Math.max(1,Math.ceil(d.h/2)),{uSrc:d,uTexel:[1/d.w,1/d.h]});c.push(a),d=a,e*=.5}let f=Math.max(.01,b*e/2.2),g=this.pass("gauss",k,d.w,d.h,{uSrc:d,uDir:[1/d.w,0],uSigma:f}),h=this.pass("gauss",k,d.w,d.h,{uSrc:g,uDir:[0,1/d.h],uSigma:f});this.release(g);let l=h;for(let b=c.length-2;b>=-1;b--){let d=b>=0?c[b]:a,e=this.pass("up",j,d.w,d.h,{uSrc:l,uHalf:[.5/l.w,.5/l.h]});this.release(l),l=e}return this.release(...c),l}sdf(a,b){if(!this.floatOK)return null;let{w:c,h:d}=a,e=this.pass("jfaInit",l,c,d,{uSrc:a},"rgba32f"),f=1;for(;f<Math.min(Math.max(c,d),Math.max(2,b));)f*=2;for(;f>=1;f=Math.floor(f/2)){let a=this.pass("jfaStep",m,c,d,{uSeed:e,uStep:f},"rgba32f");this.release(e),e=a}let g=this.pass("jfaStep",m,c,d,{uSeed:e,uStep:1},"rgba32f");this.release(e);let h=this.pass("jfaDist",n,c,d,{uSeed:g,uSrc:a});return this.release(g),h}present(a,b){(this.canvas.width<a.w||this.canvas.height<a.h)&&(this.canvas.width=Math.max(this.canvas.width,a.w),this.canvas.height=Math.max(this.canvas.height,a.h)),this.run("present",o,null,{uSrc:a},[a.w,a.h]),b.width=a.w,b.height=a.h;let c=b.getContext("2d");c.clearRect(0,0,a.w,a.h),c.drawImage(this.canvas,0,this.canvas.height-a.h,a.w,a.h,0,0,a.w,a.h)}}let i=c+`
uniform sampler2D uSrc; uniform vec2 uTexel;
void main() {
  vec2 uv = vUv;
  o = (texture(uSrc, uv) * 4.0
     + texture(uSrc, uv + vec2(-1.0, -1.0) * uTexel) + texture(uSrc, uv + vec2(1.0, -1.0) * uTexel)
     + texture(uSrc, uv + vec2(-1.0, 1.0) * uTexel) + texture(uSrc, uv + vec2(1.0, 1.0) * uTexel)) / 8.0;
}`,j=c+`
uniform sampler2D uSrc; uniform vec2 uHalf;
void main() {
  vec2 uv = vUv; vec2 h = uHalf;
  vec4 s = texture(uSrc, uv + vec2(-2.0 * h.x, 0.0)) + texture(uSrc, uv + vec2(2.0 * h.x, 0.0))
         + texture(uSrc, uv + vec2(0.0, -2.0 * h.y)) + texture(uSrc, uv + vec2(0.0, 2.0 * h.y));
  s += 2.0 * (texture(uSrc, uv + vec2(-h.x, h.y)) + texture(uSrc, uv + vec2(h.x, h.y))
            + texture(uSrc, uv + vec2(-h.x, -h.y)) + texture(uSrc, uv + vec2(h.x, -h.y)));
  o = s / 12.0;
}`,k=c+`
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
}`,l=c+`
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
}`,m=c+`
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
}`,n=c+`
uniform sampler2D uSeed; uniform sampler2D uSrc;
void main() {
  vec2 p = gl_FragCoord.xy;
  vec4 s = texelFetch(uSeed, ivec2(p), 0);
  float a = texelFetch(uSrc, ivec2(p), 0).a;
  // distanza dal bordo vero (sub-pixel), negativa dentro: curve lisce, niente faccette
  float d = s.x < 0.0 ? 1e4 : distance(p, s.xy);
  d = a >= 0.5 ? -d : d;
  o = vec4(d, a, 0.0, 1.0);
}`,o=c+`
uniform sampler2D uSrc;
void main() { o = clamp(texture(uSrc, vec2(vUv.x, 1.0 - vUv.y)), 0.0, 1.0); }`;a.s(["FxGL",()=>h,"LIB",0,c],97068);let p=c+`
uniform sampler2D uSrc; uniform sampler2D uOrig; uniform sampler2D uSdf;
uniform float uZ, uT, uAmt, uHasSdf;
float sd(vec2 uv) { return uHasSdf > 0.5 ? texture(uSdf, uv).r : 0.5 - texture(uOrig, uv).a; }
vec2 px() { return 1.0 / uRes; }
`,q=c+`uniform sampler2D uSdf; uniform float uE;
void main() { float m = clamp(0.5 - (texture(uSdf, vUv).r + uE), 0.0, 1.0); o = vec4(m); }`,r=c+`
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
}`,s=c+`uniform sampler2D uSrc; uniform float uTh;
void main() {
  vec4 s = texture(uSrc, vUv); vec3 c = s.a > 0.0 ? s.rgb / s.a : vec3(0.0);
  float m = smoothstep(uTh, 1.0, luma(c)) * s.a;
  o = vec4(vec3(1.0, 0.28, 0.1) * m, m);
}`,t=c+`uniform sampler2D uSrc, uB; uniform float uK;
void main() { vec4 s = texture(uSrc, vUv), h = texture(uB, vUv) * uK; o = clamp(vec4(s.rgb + h.rgb, max(s.a, min(1.0, h.a * 0.8))), 0.0, 1.0); }`,u=c+`uniform sampler2D uSrc; uniform float uVig, uVigF, uGrain, uGrainSize, uZ, uT;
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
}`,v=c+`uniform sampler2D uSrc, uM; uniform vec2 uOff; uniform vec3 uCol; uniform float uOp;
void main() { float a = texture(uM, vUv - uOff).a * uOp; o = over(texture(uSrc, vUv), vec4(uCol * a, a)); }`,w=c+`uniform sampler2D uSrc, uM; uniform vec2 uOff; uniform vec3 uCol; uniform float uOp;
void main() {
  vec4 s = texture(uSrc, vUv);
  if (s.a <= 0.0) { o = s; return; }
  float k = (1.0 - texture(uM, vUv - uOff).a) * uOp;
  vec3 c = s.rgb / s.a;
  vec3 t = luma(uCol) > 0.5 ? blend(c, uCol, 2.0) : blend(c, uCol, 1.0);
  o = vec4(mix(c, t, k) * s.a, s.a);
}`,x=c+`uniform sampler2D uSrc, uM; uniform vec3 uCol, uCol2; uniform float uTwo, uOp;
void main() {
  float g = texture(uM, vUv).a;
  float a = clamp(g * 1.7, 0.0, 1.0) * uOp;
  vec3 col = uTwo > 0.5 ? mix(uCol2, uCol, smoothstep(0.05, 0.75, g)) : uCol;
  o = over(texture(uSrc, vUv), vec4(col * a, a));
}`,y=p+`uniform vec3 uCol; uniform float uOp, uCenter, uChoke, uSize;
void main() {
  vec4 s = texture(uSrc, vUv);
  if (s.a <= 0.0) { o = s; return; }
  float di = -sd(vUv);
  float g = uCenter > 0.5 ? smoothstep(uChoke, uChoke + uSize, di) : 1.0 - smoothstep(uChoke, uChoke + uSize, di);
  vec3 c = s.rgb / s.a;
  o = vec4(mix(c, blend(c, uCol, 2.0), g * uOp) * s.a, s.a);
}`,z=p+`uniform float uSize, uStyle, uTech;
float prof(float x) { x = clamp(x, 0.0, 1.0); return uTech > 0.5 ? x : sin(x * 1.5708); }
void main() {
  float d = sd(vUv), di = -d, h;
  if (uStyle < 0.5) h = d < 0.0 ? prof(di / uSize) : 0.0;
  else if (uStyle < 1.5) h = d > 0.0 ? 1.0 - prof(d / uSize) : 1.0;
  else if (uStyle < 2.5) h = prof((di + uSize * 0.5) / uSize);
  else h = d < 0.0 ? 1.0 - prof(di / uSize) : 1.0 - prof(d / uSize);
  o = vec4(h, h, h, 1.0);
}`,A=p+`uniform sampler2D uH; uniform float uSize, uStyle, uDepth, uAng, uAlt, uGloss, uHiOp, uShOp; uniform vec3 uHi, uShC;
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
}`,B=p+`uniform float uPos, uSize, uGrad, uGAng, uOp; uniform vec3 uCol, uCol2;
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
}`,C=c+`uniform sampler2D uSrc, uB; uniform vec2 uOff; uniform vec3 uCol; uniform float uOp, uInv;
void main() {
  vec4 s = texture(uSrc, vUv);
  if (s.a <= 0.0) { o = s; return; }
  float v = abs(texture(uB, vUv + uOff).a - texture(uB, vUv - uOff).a);
  v = uInv > 0.5 ? 1.0 - v : v;
  vec3 c = s.rgb / s.a;
  vec3 t = luma(uCol) > 0.5 ? blend(c, uCol, 2.0) : blend(c, uCol, 1.0);
  o = vec4(mix(c, t, clamp(v * 1.4, 0.0, 1.0) * uOp) * s.a, s.a);
}`,D=p+`uniform vec3 uCol; uniform float uMode, uOp;
void main() { vec4 s = texture(uSrc, vUv); if (s.a <= 0.0) { o = s; return; } vec3 c = s.rgb / s.a; o = vec4(mix(c, blend(c, uCol, uMode), uOp) * s.a, s.a); }`,E=p+`uniform vec3 uC1, uC2, uC3; uniform float uThree, uType, uAng, uScale, uMode, uOp;
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
}`,F=p+`uniform float uKind, uScale, uMode, uOp;
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
}`,G=p+`uniform sampler2D uB1, uB2, uB3; uniform vec3 uCol; uniform float uInt, uTube, uFlick, uEdge;
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
}`,H=p+`uniform int uCount; uniform vec2 uOff; uniform float uUse, uFade; uniform vec3 uCol;
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
}`,I=p+`uniform float uW;
void main() {
  vec4 s = texture(uSrc, vUv);
  float d = sd(vUv);
  float band = clamp(d + uW + 0.5, 0.0, 1.0) * clamp(0.5 - d, 0.0, 1.0);
  vec3 c = s.a > 0.0 ? s.rgb / s.a : vec3(0.0);
  o = mix(s, vec4(c * band * s.a, band * s.a), uAmt);
}`,J=p+`uniform float uW; uniform vec2 uOff; uniform vec3 uCol;
void main() {
  vec4 s = texture(uSrc, vUv);
  float d = sd(vUv);
  float band = clamp(d + uW + 0.5, 0.0, 1.0) * clamp(0.5 - d, 0.0, 1.0) * s.a;
  vec3 c = s.a > 0.0 ? s.rgb / s.a : vec3(0.0);
  float a2 = texture(uOrig, vUv - uOff).a;
  o = mix(s, over(vec4(c * band, band), vec4(uCol * a2, a2)), uAmt);
}`,K=p+`uniform vec2 uDir; uniform vec3 uCol; uniform float uOp, uFade;
void main() {
  float acc = 0.0;
  for (int k = 1; k <= 128; k++) {
    float f = float(k) / 128.0;
    acc = max(acc, texture(uOrig, vUv - uDir * f).a * (1.0 - uFade * f));
  }
  float a = acc * uOp;
  vec4 s = texture(uSrc, vUv);
  o = mix(s, over(s, vec4(uCol * a, a)), uAmt);
}`,L=p+`uniform vec2 uDir; uniform vec3 uCol, uC2, uC3, uC4; uniform float uShade, uBands;
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
}`,M=p+`uniform float uPow, uSplit, uSlices, uNoise;
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
}`,N=c+`uniform sampler2D uSrc; uniform float uTh;
void main() { vec4 s = texture(uSrc, vUv); vec3 c = s.a > 0.0 ? s.rgb / s.a : vec3(0.0); float m = smoothstep(uTh, uTh + 0.25, luma(c)) * s.a; o = vec4(c * m, m); }`,O=p+`uniform sampler2D uB1, uB2; uniform float uInt, uWarm;
void main() {
  vec4 s = texture(uSrc, vUv);
  vec4 b = (texture(uB1, vUv) * 0.6 + texture(uB2, vUv) * 0.8) * uInt * 1.6;
  vec3 tint = mix(vec3(1.0), uWarm > 0.0 ? vec3(1.0, 0.82, 0.58) : vec3(0.62, 0.8, 1.0), abs(uWarm));
  vec4 res = vec4(min(s.rgb + b.rgb * tint, 1.0), clamp(max(s.a, b.a * 0.9), 0.0, 1.0));
  o = mix(s, res, uAmt);
}`,P=p+`uniform vec3 uC1, uC2; uniform float uPos, uSize, uSpeed;
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
}`,Q=p+`uniform float uMode, uShape, uSize, uAng, uPaperOn; uniform vec3 uInk, uPaper;
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
}`,R=p+`uniform vec3 uInk1, uInk2, uPaper; uniform float uScreen, uSize, uReg1, uReg2, uLoad, uWear;
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
}`,S=p+`uniform vec3 uDark, uLight; uniform float uPattern, uSize, uCon, uFour;
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
}`,T=p+`uniform vec3 uC1, uC2, uC3; uniform float uTh, uRough, uOffset;
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
}`,U=p+`uniform vec3 uC1, uC2, uC3; uniform float uThree, uCon;
void main() {
  vec4 s = texture(uSrc, vUv); if (s.a <= 0.0) { o = s; return; }
  vec3 c = s.rgb / s.a;
  float t = clamp((luma(c) - 0.5) * (1.0 + uCon) + 0.5, 0.0, 1.0);
  t = smoothstep(0.0, 1.0, t) * 0.6 + t * 0.4;
  vec3 g = uThree > 0.5 ? (t < 0.5 ? mix(uC1, uC2, t * 2.0) : mix(uC2, uC3, t * 2.0 - 1.0)) : mix(uC1, uC2, t);
  o = mix(s, vec4(g * s.a, s.a), uAmt);
}`,V=p+`uniform float uLevels, uDither, uSat;
float b2(vec2 a) { a = floor(a); return fract(dot(a, vec2(0.5, a.y * 0.75))); }
float b4(vec2 a) { return b2(0.5 * a) * 0.25 + b2(a); }
void main() {
  vec4 s = texture(uSrc, vUv); if (s.a <= 0.0) { o = s; return; }
  vec3 c = s.rgb / s.a;
  c = mix(vec3(luma(c)), c, 1.0 + uSat);
  float d = uDither > 0.5 ? (b4(gl_FragCoord.xy / max(uZ, 1.0)) - 0.5) / (uLevels - 1.0) : 0.0;
  vec3 p = floor(clamp(c + d, 0.0, 1.0) * (uLevels - 1.0) + 0.5) / (uLevels - 1.0);
  o = mix(s, vec4(p * s.a, s.a), uAmt);
}`,W=p+`uniform sampler2D uB; uniform float uPos, uWidth, uFeather, uAng;
void main() {
  vec2 n = vec2(-sin(uAng), cos(uAng));
  float d = abs(dot(vUv - vec2(0.5, uPos), n));
  float m = smoothstep(uWidth * 0.5, uWidth * 0.5 + uFeather, d);
  o = mix(texture(uSrc, vUv), mix(texture(uSrc, vUv), texture(uB, vUv), m), uAmt);
}`,X=p+`uniform vec2 uDir;
void main() {
  vec4 acc = vec4(0.0);
  for (int i = 0; i < 40; i++) acc += texture(uSrc, vUv + uDir * (float(i) / 39.0 - 0.5));
  o = mix(texture(uSrc, vUv), acc / 40.0, uAmt);
}`,Y=p+`uniform float uK; uniform vec2 uC;
void main() {
  vec4 acc = vec4(0.0);
  for (int i = 0; i < 40; i++) acc += texture(uSrc, uC + (vUv - uC) * (1.0 - uK * 0.45 * float(i) / 39.0));
  o = mix(texture(uSrc, vUv), acc / 40.0, uAmt);
}`,Z=p+`uniform float uAmp, uLen, uAng, uSpeed;
void main() {
  vec2 pp = vUv * uRes;
  vec2 dir = vec2(cos(uAng), sin(uAng)), perp = vec2(-dir.y, dir.x);
  float ph = dot(pp, dir) / (uLen * uZ) * 6.2832 + uT * 3.0 * step(0.001, uSpeed);
  vec2 uv = vUv + perp * sin(ph) * uAmp * uZ / uRes;
  o = mix(texture(uSrc, vUv), texture(uSrc, uv), uAmt);
}`,$=p+`uniform float uAmp, uLen, uSpeed;
void main() {
  vec2 pp = vUv * uRes, c = 0.5 * uRes;
  float r = length(pp - c);
  float d = sin(r / (uLen * uZ) * 6.2832 - uT * 3.0 * step(0.001, uSpeed)) * uAmp * uZ * smoothstep(0.0, 30.0 * uZ, r);
  vec2 uv = vUv + normalize(pp - c + 1e-4) * d / uRes;
  o = mix(texture(uSrc, vUv), texture(uSrc, uv), uAmt);
}`,_=p+`uniform float uAng, uR;
void main() {
  vec2 asp = vec2(uRes.x / uRes.y, 1.0);
  vec2 p = (vUv - 0.5) * asp;
  float R = uR * 0.5 * min(asp.x, 1.0) * 2.0;
  float r = length(p);
  vec2 q = p;
  if (r < R) { float a = uAng * pow(1.0 - r / R, 2.0); q = mat2(cos(a), -sin(a), sin(a), cos(a)) * p; }
  o = mix(texture(uSrc, vUv), texture(uSrc, q / asp + 0.5), uAmt);
}`,aa=p+`uniform float uK, uR;
void main() {
  vec2 asp = vec2(uRes.x / uRes.y, 1.0);
  vec2 p = (vUv - 0.5) * asp;
  float R = uR * 0.5 * max(asp.x, 1.0);
  float r = length(p);
  vec2 q = p;
  if (r < R && r > 0.0) { float e = uK >= 0.0 ? 1.0 + uK : 1.0 / (1.0 - uK); q = normalize(p) * R * pow(r / R, e); }
  o = mix(texture(uSrc, vUv), texture(uSrc, q / asp + 0.5), uAmt);
}`,ab=p+`uniform float uShape, uSize, uGap;
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
}`,ac=p+`uniform float uPx, uDist, uRadial;
void main() {
  vec2 d = vUv - 0.5;
  vec2 uv = 0.5 + d * (1.0 + uDist * dot(d, d) * 1.5);
  vec2 dir = uRadial > 0.5 ? (length(d) > 0.0 ? normalize(d) * (0.35 + length(d) * 1.3) : vec2(0.0)) : vec2(1.0, 0.0);
  vec2 off = dir * uPx * uZ / uRes;
  vec4 r = texture(uSrc, uv + off), g = texture(uSrc, uv), b = texture(uSrc, uv - off);
  o = mix(texture(uSrc, vUv), vec4(r.r, g.g, b.b, max(g.a, max(r.a, b.a))), uAmt);
}`,ad=p+`uniform float uPow, uBleed, uLines;
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
}`,ae=p+`uniform sampler2D uB; uniform float uScan, uMask, uCurve, uGlow, uFlick;
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
}`,af=c+`
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
}`,ag=c+`
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
}`,ah=c+`uniform sampler2D uA, uB; uniform float uK;
void main() { o = mix(texture(uA, vUv), texture(uB, vUv), uK); }`,ai=p+`uniform float uWear, uScale, uSpeck;
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
}`,aj=p+`uniform vec3 uThread, uStitch; uniform float uUseColor, uDensity, uInset;
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
}`,ak=p+`uniform vec3 uA, uB; uniform float uCrinkle, uLight, uBevel;
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
}`,al=p+`uniform sampler2D uMat, uNrm, uH, uHb; uniform float uHasMat, uMode, uDepth, uSize, uLight, uScale, uMicro, uScene;
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
}`,am=p+`uniform vec2 uDir; uniform float uFade, uWobble, uGlow, uSpectrum;
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
}`,an=p+`uniform vec2 uCenter; uniform float uLen, uInt, uMode; uniform vec3 uCol;
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
}`,ao=p+`uniform vec3 uBase; uniform float uUse, uSize, uSpark, uDust;
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
}`,ap=p+`uniform sampler2D uFrostTex; uniform float uW, uStr, uAng, uHi, uShade, uDisp, uFrost;
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
}`,aq=p+`uniform sampler2D uAtlas, uCellTex, uWide, uLocal; uniform float uCell, uN, uMode, uColor, uUnder, uEdges, uCon, uSat, uInv, uStyle, uGrid, uCut, uSplit, uBright; uniform vec3 uInk, uBg, uAccent;
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
}`,ar=p+`uniform sampler2D uFlowTex; uniform vec3 uInk, uPaper; uniform float uLines, uAng, uFlow, uCross, uColor, uRough, uTh, uMass, uDetail, uWave;
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
}`,as=p+`uniform float uSize, uRefr, uGrout, uGloss; uniform vec3 uGroutCol;
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
}`,at=p+`uniform float uMode, uAng, uScale, uSoft, uStr; uniform vec3 uWarm;
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
}`,au=p+`uniform vec2 uDir; uniform float uLo, uHi, uVar, uRev;
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
}`,av=p+`uniform sampler2D uSoft; uniform float uSize, uEdge, uDetail, uRelief, uJit;
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
}`,aw=p+`uniform float uSeg, uRot, uZoom; uniform vec2 uC;
void main() {
  vec2 q = (vUv - 0.5) * vec2(uRes.x / uRes.y, 1.0);
  float r = length(q) / uZoom, a = atan(q.y, q.x) + uRot;
  float seg = 6.2832 / uSeg;
  a = mod(a, seg); a = abs(a - seg * 0.5);
  vec2 uv = uC + vec2(cos(a), sin(a)) * r * vec2(uRes.y / uRes.x, 1.0);
  o = mix(texture(uSrc, vUv), texture(uSrc, clamp(uv, 0.0, 1.0)), uAmt);
}`,ax=c+`uniform sampler2D uSrc, uRef, uResB, uGlow; uniform float uK, uBloom, uGrain, uT;
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
}`;a.s(["ADJUST",0,r,"ASCII",0,aq,"BEVEL",0,A,"BEVEL_H",0,z,"BLOOM",0,O,"BLOOM_MASK",0,N,"BULGE",0,aa,"CHROMA",0,ac,"COLOR_OVERLAY",0,D,"CRT",0,ae,"DITHER",0,S,"ECHO",0,H,"EXTRUDE",0,L,"FINISH",0,u,"FLUTED",0,ap,"FOIL",0,ak,"GENFILL",0,ag,"GLITCH",0,M,"GLITTER",0,ao,"GLOW_COMP",0,x,"GRAD_MAP",0,U,"GRAD_OVERLAY",0,E,"GRUNGE",0,ai,"HALFTONE",0,Q,"HAL_ADD",0,t,"HAL_MASK",0,s,"HOLLOW",0,I,"IMPRESS",0,al,"INNER_GLOW",0,y,"INNER_SHADOW",0,w,"KALEIDO",0,aw,"LIGHTCAST",0,at,"LIGHT_LEAK",0,P,"LINOCUT",0,ar,"LONG_SHADOW",0,K,"LOWPOLY",0,av,"MASK",0,q,"MASK_A",0,c+"uniform sampler2D uSrc; void main() { o = vec4(texture(uSrc, vUv).a); }","MAT3D",0,af,"MIRRORTILE",0,as,"MIX_AMT",0,ah,"MOSAIC",0,ab,"MOTION",0,X,"NEON",0,G,"OVER_AB",0,c+"uniform sampler2D uA, uB; void main() { o = over(texture(uA, vUv), texture(uB, vUv)); }","PIXELSORT",0,au,"POSTERIZE",0,V,"RAYS",0,an,"RIPPLE",0,$,"RISO",0,R,"SATIN",0,C,"SCREENPRINT",0,T,"SHADOW_COMP",0,v,"SMEAR",0,am,"SPLICE",0,J,"STITCH",0,aj,"STROKE",0,B,"TEX_OVERLAY",0,F,"TILT",0,W,"TONEMATCH",0,ax,"TWIRL",0,_,"VHS",0,ad,"WAVE",0,Z,"ZOOM_BLUR",0,Y],59547)},51917,a=>{"use strict";let b=["Normale","Moltiplica","Schermo","Sovrapponi","Luce soffusa","Aggiungi","Colore scherma","Colore"],c=(a,b=0)=>"number"==typeof a?a:Number(a??b)||b,d=(a,b,c,d,e)=>({key:a,label:b,type:"range",min:c,max:d,def:e}),e=(a,b,c)=>({key:a,label:b,type:"color",def:c}),f=(a,b,c=0)=>({key:a,label:b,type:"toggle",def:c}),g=(a,b,c,d=0)=>({key:a,label:b,type:"select",options:c,def:d}),h=[{id:"material3d",label:"Materiale 3D",cat:"3D",hint:"estrusione o gonfiaggio con riflessi: cromo, oro, vetro, plastica…",animated:!0,pad:a=>.9*c(a.depth,40)+c(a.bevel,6)+14,params:[g("material","Materiale",["Plastica lucida","Cromo","Oro","Vetro","Ceramica","Olografico","Metallo colorato"],1),g("shape","Forma",["Estrusa","Gonfia"],0),g("env","Ambiente",["Studio","Tramonto","Notte neon","Cielo"],0),d("depth","Spessore",2,200,40),d("bevel","Smusso",0,40,6),d("rx","Inclinazione",-70,70,18),d("ry","Rotazione",-70,70,-24),d("persp","Prospettiva",0,100,40),d("light","Luce",0,360,220),d("rough","Ruvidità",0,100,30),f("useColor","Colore proprio",0),e("color","Colore","#ff5a36"),d("spin","Rotazione continua",0,100,0)],variants:[{id:"cromo",label:"Cromo",p:{material:1,shape:0,env:3,depth:34,bevel:7}},{id:"studio",label:"Cromo studio",p:{material:1,shape:0,env:0,depth:34,bevel:9}},{id:"oro",label:"Oro",p:{material:2,shape:0,env:3,depth:34,bevel:8}},{id:"gonfio",label:"Gonfiabile",p:{material:0,shape:1,env:0,depth:60,bevel:14,rough:20}},{id:"vetro",label:"Vetro",p:{material:3,shape:0,env:3,depth:30,bevel:10}},{id:"olografico",label:"Olografico",p:{material:5,shape:1,env:0,depth:46,bevel:12}},{id:"ceramica",label:"Ceramica",p:{material:4,shape:0,env:0,depth:42,bevel:4,rough:70}},{id:"neon",label:"Metallo neon",p:{material:6,shape:0,env:2,depth:30,bevel:8}},{id:"tramonto",label:"Cromo tramonto",p:{material:1,shape:1,env:1,depth:50,bevel:12}}]},{id:"genFill",label:"Riempimento",cat:"Generativo",hint:"gradiente mesh, aurora, marmo, grana, topografia, bolle",animated:!0,params:[g("mode","Tipo",["Gradiente mesh","Aurora","Marmo liquido","Grana sfumata","Topografia","Bolle"],0),e("c1","Colore 1","#ff6b6b"),e("c2","Colore 2","#ffd93d"),e("c3","Colore 3","#6bcBef"),e("c4","Colore 4","#4d2c91"),d("scale","Scala",20,300,100),d("warp","Movimento forme",0,100,50),d("grain","Grana",0,100,20),d("keep","Conserva originale",0,100,0),d("speed","Animazione",0,100,0)],variants:[{id:"pesca",label:"Pesca",p:{mode:0,c1:"#ff9a8b",c2:"#ffd3a5",c3:"#a18cd1",c4:"#fbc2eb"}},{id:"aurora",label:"Aurora",p:{mode:1,c1:"#2cffb4",c2:"#7a5cff",c3:"#ffffff",c4:"#070b1f",grain:15}},{id:"marmo",label:"Marmo",p:{mode:2,c1:"#0f0c29",c2:"#ff6ec4",c3:"#7873f5",c4:"#f9f586",warp:70}},{id:"grana",label:"Grana",p:{mode:3,c1:"#ff5f6d",c2:"#ffc371",c3:"#6a82fb",c4:"#fc5c7d",grain:60}},{id:"topo",label:"Topografia",p:{mode:4,c1:"#f2efe6",c2:"#f2efe6",c3:"#1e3a5f",c4:"#13243b",warp:40}},{id:"bolle",label:"Bolle",p:{mode:5,c1:"#ff7eb3",c2:"#ffd0e0",c3:"#7afcff",c4:"#20124d"}},{id:"notte",label:"Notte",p:{mode:0,c1:"#0b1d51",c2:"#8c1eff",c3:"#ff2975",c4:"#00e5ff",grain:25}},{id:"menta",label:"Menta",p:{mode:3,c1:"#d4fc79",c2:"#96e6a1",c3:"#43cea2",c4:"#185a9d",grain:45}}]},{id:"dropShadow",label:"Ombra",cat:"Stile",hint:"ombra proiettata con distanza, espansione e morbidezza",noAmount:!0,pad:a=>c(a.distance,12)+c(a.spread)+1.3*c(a.size,20),params:[e("color","Colore","#000000"),d("opacity","Opacità",0,100,35),d("angle","Direzione",0,360,90),d("distance","Distanza",0,200,12),d("spread","Espansione",0,60,0),d("size","Morbidezza",0,120,20)],variants:[{id:"morbida",label:"Morbida",p:{opacity:30,distance:10,size:24,spread:0,color:"#000000"}},{id:"contatto",label:"Contatto",p:{opacity:45,distance:3,size:8,spread:0,color:"#000000"}},{id:"sollevata",label:"Sollevata",p:{opacity:28,distance:30,size:55,spread:0,color:"#1b1530"}},{id:"netta",label:"Netta",p:{opacity:100,distance:8,size:0,spread:0,color:"#111111",angle:45}},{id:"retro",label:"Retrò",p:{opacity:100,distance:10,size:0,spread:0,color:"#1d1a6e",angle:45}},{id:"colorata",label:"Colorata",p:{opacity:60,distance:14,size:28,spread:0,color:"#7c3aed"}}]},{id:"innerShadow",label:"Ombra interna",cat:"Stile",hint:"incavo: l’oggetto sembra scavato",noAmount:!0,params:[e("color","Colore","#000000"),d("opacity","Opacità",0,100,45),d("angle","Direzione",0,360,120),d("distance","Distanza",0,60,6),d("choke","Riduzione",0,40,0),d("size","Morbidezza",0,60,10)],variants:[{id:"incavo",label:"Incavo",p:{opacity:45,distance:6,size:10}},{id:"stampato",label:"Stampato",p:{opacity:70,distance:2,size:3}},{id:"profondo",label:"Profondo",p:{opacity:60,distance:14,size:24}},{id:"luce",label:"Luce interna",p:{opacity:55,distance:4,size:6,color:"#ffffff",angle:300}}]},{id:"outerGlow",label:"Bagliore",cat:"Stile",hint:"alone di luce attorno alla forma, anche a due colori",noAmount:!0,pad:a=>c(a.spread)+1.4*c(a.size,24),params:[e("color","Colore","#ffd166"),e("color2","Colore esterno","#ff6b6b"),f("two","Due colori",0),d("opacity","Opacità",0,100,80),d("spread","Espansione",0,40,0),d("size","Ampiezza",2,150,24)],variants:[{id:"caldo",label:"Caldo",p:{color:"#ffd166",two:0,size:24,opacity:80}},{id:"aura",label:"Aura",p:{color:"#ffffff",color2:"#a78bfa",two:1,size:70,opacity:70}},{id:"fuoco",label:"Fuoco",p:{color:"#fff3b0",color2:"#ff3d00",two:1,size:40,opacity:90}},{id:"ghiaccio",label:"Ghiaccio",p:{color:"#e0fbff",color2:"#00b4ff",two:1,size:34,opacity:85}},{id:"alone",label:"Alone stretto",p:{color:"#ffffff",two:0,size:8,spread:3,opacity:90}}]},{id:"innerGlow",label:"Bagliore interno",cat:"Stile",hint:"luce che parte dai bordi o dal centro",noAmount:!0,params:[e("color","Colore","#fff3c4"),d("opacity","Opacità",0,100,55),g("source","Origine",["Bordi","Centro"],0),d("choke","Riduzione",0,40,0),d("size","Ampiezza",1,80,5)],variants:[{id:"bordi",label:"Bordi",p:{source:0,size:5,opacity:55}},{id:"centro",label:"Centro",p:{source:1,size:12,opacity:45}},{id:"vetro",label:"Vetro",p:{source:0,size:3,color:"#ffffff",opacity:80}}]},{id:"bevel",label:"Rilievo",cat:"Stile",hint:"smusso con luce e ombra: plastica, metallo, cuscino",noAmount:!0,pad:a=>1===c(a.style)||2===c(a.style)?c(a.size,10)+2:0,params:[g("style","Stile",["Smusso interno","Smusso esterno","Rilievo","Cuscino"],0),g("technique","Tecnica",["Morbida","Scolpita"],0),d("depth","Profondità",1,300,100),d("size","Dimensione",1,60,10),d("soften","Ammorbidisci",0,20,2),d("angle","Luce · direzione",0,360,120),d("altitude","Luce · altezza",5,85,32),d("gloss","Lucido",0,100,0),e("hiColor","Colore luce","#ffffff"),d("hiOpacity","Opacità luce",0,100,75),e("shColor","Colore ombra","#000000"),d("shOpacity","Opacità ombra",0,100,60)],variants:[{id:"morbido",label:"Morbido",p:{style:0,technique:0,size:10,depth:100,gloss:0}},{id:"scolpito",label:"Scolpito",p:{style:0,technique:1,size:8,depth:160}},{id:"cuscino",label:"Cuscino",p:{style:3,technique:0,size:10,depth:120}},{id:"rilievo",label:"Rilievo",p:{style:2,technique:0,size:6,depth:140}},{id:"metallo",label:"Metallo",p:{style:0,technique:1,size:12,depth:220,gloss:70,hiColor:"#fff8e1",shColor:"#3b2a12",hiOpacity:90,shOpacity:70}},{id:"gonfio",label:"Gonfio",p:{style:0,technique:0,size:30,depth:80,soften:6,altitude:45}}]},{id:"stroke",label:"Contorno",cat:"Stile",hint:"bordo nitido fuori, dentro o al centro, anche sfumato",noAmount:!0,pad:a=>2===c(a.position)?0:c(a.size,6)+2,params:[g("position","Posizione",["Esterno","Centrato","Interno"],0),d("size","Spessore",1,80,6),e("color","Colore","#ffffff"),f("gradient","Sfumato",0),e("color2","Colore 2","#7c3aed"),d("gangle","Angolo sfumatura",0,360,90),d("opacity","Opacità",0,100,100)],variants:[{id:"sottile",label:"Sottile",p:{position:0,size:2,color:"#111111",gradient:0}},{id:"adesivo",label:"Adesivo",p:{position:0,size:16,color:"#ffffff",gradient:0}},{id:"spesso",label:"Spesso",p:{position:0,size:10,color:"#111111",gradient:0}},{id:"sfumato",label:"Sfumato",p:{position:0,size:8,color:"#ff5f6d",color2:"#ffc371",gradient:1}},{id:"interno",label:"Interno",p:{position:2,size:4,color:"#ffffff",gradient:0}}]},{id:"satin",label:"Raso",cat:"Stile",hint:"riflessi morbidi all’interno, come tessuto lucido",noAmount:!0,params:[e("color","Colore","#000000"),d("opacity","Opacità",0,100,40),d("angle","Angolo",0,360,19),d("distance","Distanza",1,100,14),d("size","Morbidezza",1,80,16),f("invert","Inverti",0)],variants:[{id:"scuro",label:"Scuro",p:{color:"#000000",opacity:40}},{id:"chiaro",label:"Chiaro",p:{color:"#ffffff",opacity:45,invert:1}},{id:"seta",label:"Seta",p:{color:"#3a1a5e",opacity:50,distance:24,size:30}}]},{id:"colorOverlay",label:"Colore",cat:"Stile",hint:"ricolora l’oggetto con un modo di fusione",noAmount:!0,params:[e("color","Colore","#ff5a5f"),g("blend","Fusione",b,0),d("opacity","Opacità",0,100,100)],variants:[{id:"pieno",label:"Pieno",p:{blend:0,opacity:100}},{id:"tinta",label:"Tinta",p:{blend:7,opacity:100}},{id:"velo",label:"Velo",p:{blend:4,opacity:70}}]},{id:"gradientOverlay",label:"Sfumatura",cat:"Stile",hint:"sfumatura lineare, radiale o riflessa sopra l’oggetto",noAmount:!0,params:[e("c1","Colore 1","#ff5f6d"),e("c2","Colore 2","#ffc371"),f("three","Tre colori",0),e("c3","Colore 3","#ffffff"),g("type","Tipo",["Lineare","Radiale","Riflessa","Conica"],0),d("angle","Angolo",0,360,90),d("scale","Scala",20,200,100),g("blend","Fusione",b,0),d("opacity","Opacità",0,100,100)],variants:[{id:"tramonto",label:"Tramonto",p:{c1:"#ff5f6d",c2:"#ffc371",three:0,type:0}},{id:"oceano",label:"Oceano",p:{c1:"#1a2a6c",c2:"#2bc0e4",three:0,type:0}},{id:"aurora",label:"Aurora",p:{c1:"#7f00ff",c2:"#00ffd5",c3:"#e1ff00",three:1,type:0,angle:120}},{id:"oro",label:"Oro",p:{c1:"#7a5310",c2:"#fff1b8",c3:"#b8860b",three:1,type:2,angle:90}},{id:"cromo",label:"Cromo",p:{c1:"#4a4a4a",c2:"#ffffff",c3:"#8a8a8a",three:1,type:2,angle:100}},{id:"olografico",label:"Olografico",p:{c1:"#ff9a9e",c2:"#a1c4fd",c3:"#c2ffd8",three:1,type:3}}]},{id:"textureOverlay",label:"Texture",cat:"Stile",hint:"carta, tela, grana o cemento sopra l’oggetto",noAmount:!0,params:[g("kind","Materiale",["Grana","Carta","Tela","Cemento","Graffi"],1),d("scale","Scala",10,300,100),g("blend","Fusione",b,3),d("opacity","Opacità",0,100,60)],variants:[{id:"carta",label:"Carta",p:{kind:1,blend:1,opacity:55}},{id:"tela",label:"Tela",p:{kind:2,blend:3,opacity:50}},{id:"grana",label:"Grana",p:{kind:0,blend:3,opacity:45}},{id:"cemento",label:"Cemento",p:{kind:3,blend:1,opacity:60}},{id:"graffi",label:"Usurato",p:{kind:4,blend:2,opacity:55}}]},{id:"neon",label:"Neon",cat:"Testo",hint:"tubo di luce: nucleo chiaro e alone a più strati",animated:!0,pad:a=>2.6*c(a.size,18),params:[e("color","Colore","#ff3cac"),d("size","Alone",2,80,18),d("intensity","Intensità",0,100,75),d("tube","Nucleo chiaro",0,100,65),d("flicker","Sfarfallio",0,100,0)],variants:[{id:"rosa",label:"Rosa",p:{color:"#ff3cac"}},{id:"ciano",label:"Ciano",p:{color:"#22f1ff"}},{id:"viola",label:"Viola",p:{color:"#9b5cff"}},{id:"acido",label:"Acido",p:{color:"#7dff3c"}},{id:"ambra",label:"Ambra",p:{color:"#ffb000"}},{id:"insegna",label:"Insegna",p:{color:"#ff2d55",flicker:35,intensity:85}}]},{id:"echo",label:"Eco",cat:"Testo",hint:"copie ripetute che sfumano dietro l’oggetto",pad:a=>c(a.count,4)*c(a.distance,8),params:[d("count","Copie",1,10,4),d("distance","Distanza",1,60,8),d("angle","Direzione",0,360,315),f("useColor","Colore proprio",0),e("color","Colore","#7c3aed"),d("fade","Dissolvenza",0,100,70)],variants:[{id:"scia",label:"Scia",p:{count:5,distance:6,useColor:0,fade:75}},{id:"colore",label:"Colorata",p:{count:3,distance:10,useColor:1,color:"#ff5a5f",fade:40}},{id:"pop",label:"Pop",p:{count:2,distance:14,useColor:1,color:"#00c2ff",fade:0,angle:45}}]},{id:"impressione",label:"Impressione",cat:"Stampa",hint:"testo impresso a secco, in rilievo, in lamina o a inchiostro su carta, pietra, pelle veri",pad:a=>c(a.mode)>3.5?0:3*c(a.size,8)+8,params:[g("mode","Tecnica",["A secco","In rilievo","Lamina","Inchiostro","Solo materiale"],0),g("material","Materiale",["Carta bianca","Carta grigia","Carta stropicciata","Cartoncino avana","Carta kraft","Carta paglia","Gesso","Intonaco","Cemento scuro","Marmo nero","Pelle","Tela","Metallo spazzolato","Metallo bianco","Lamina","Plastica"],0),e("tint","Tinta","#ffffff"),d("depth","Profondità",0,100,60),d("size","Smusso",1,30,8),d("light","Luce",0,360,135),d("micro","Grana materiale",0,100,60),d("scene","Luce di scena",0,100,60),d("scale","Scala materiale",30,300,100),e("ink","Inchiostro","#1d2a6b"),e("c1","Lamina scura","#6b4a10"),e("c2","Lamina chiara","#ffe9a8")],variants:[{id:"secco",label:"A secco su carta",p:{mode:0,material:0,size:9,depth:75}},{id:"rilievo",label:"Rilievo su gesso",p:{mode:1,material:6,depth:70,size:10}},{id:"oro",label:"Oro su carta",p:{mode:2,material:3,depth:40}},{id:"argento",label:"Argento su nero",p:{mode:2,material:9,depth:40,c1:"#4c4f57",c2:"#f4f6fa"}},{id:"pietra",label:"Inciso nella pietra",p:{mode:0,material:7,depth:95,size:12}},{id:"pelle",label:"Marchio su pelle",p:{mode:0,material:10,depth:85,size:7}},{id:"timbro",label:"Timbro su kraft",p:{mode:3,material:4,ink:"#1a1a1a",depth:25}}]},{id:"foil",label:"Lamina",cat:"Testo",hint:"lamina metallica stropicciata con smusso e riflessi",params:[e("c1","Ombra metallo","#7a5310"),e("c2","Luce metallo","#fff1b8"),d("crinkle","Stropicciatura",0,100,60),d("bevel","Smusso",0,20,4),d("light","Luce",0,360,220)],variants:[{id:"oro",label:"Oro",p:{c1:"#6b4a10",c2:"#ffe9a8"}},{id:"argento",label:"Argento",p:{c1:"#4c4f57",c2:"#f4f6fa"}},{id:"rame",label:"Rame",p:{c1:"#5a2412",c2:"#ffc29a"}},{id:"rosa",label:"Oro rosa",p:{c1:"#6e3b3b",c2:"#ffd9cf"}},{id:"olografico",label:"Olografica",p:{c1:"#5b6cff",c2:"#ffd1f4",crinkle:80}}]},{id:"stitch",label:"Ricamo",cat:"Testo",hint:"fili in diagonale e punto filo lungo il bordo, come una toppa",params:[f("useColor","Colore filo proprio",0),e("color","Filo","#e94f37"),e("stitch","Cucitura","#fff4e0"),d("density","Densità fili",20,140,70),d("inset","Distanza cucitura",2,14,5)],variants:[{id:"toppa",label:"Toppa",p:{}},{id:"fine",label:"Fine",p:{density:120,inset:3}},{id:"denim",label:"Denim",p:{useColor:1,color:"#2b4a7a",stitch:"#f2b84b"}}]},{id:"vetro",label:"Vetro scanalato",cat:"Ottica",hint:"ogni costa è una lente: rimpicciolisce e capovolge ciò che c’è dietro, con dispersione e satinatura",params:[d("width","Larghezza coste",4,120,22),d("strength","Lente",0,100,45),d("angle","Inclinazione",-90,90,0),d("dispersion","Dispersione colori",0,100,25),d("frost","Satinatura",0,100,25),d("highlight","Riflesso",0,100,45),d("shade","Volume coste",0,100,55)],variants:[{id:"porta",label:"Porta a righe",p:{}},{id:"fine",label:"Cannettato fine",p:{width:9,strength:60,frost:15}},{id:"larghe",label:"Coste larghe",p:{width:64,strength:70,highlight:60,dispersion:45}},{id:"satinato",label:"Satinato",p:{width:16,strength:35,frost:75,dispersion:10}},{id:"prisma",label:"Prisma",p:{width:30,strength:85,dispersion:100,angle:20}}]},{id:"specchi",label:"Mosaico a specchio",cat:"Ottica",hint:"tessere che rifrangono e riflettono, con fughe e luce propria",params:[d("size","Tessere",6,200,26),d("refraction","Rifrazione",0,100,35),d("grout","Fughe",0,30,6),e("groutColor","Colore fughe","#1a1a1a"),d("gloss","Lucentezza",0,100,50)],variants:[{id:"specchi",label:"Specchi",p:{}},{id:"ceramica",label:"Ceramica",p:{size:22,refraction:12,grout:12,groutColor:"#efe9df",gloss:70}},{id:"pixel",label:"Pixel rotti",p:{size:14,refraction:80,grout:0}}]},{id:"caleido",label:"Caleidoscopio",cat:"Ottica",hint:"un frammento ripetuto e specchiato attorno al centro",params:[d("segments","Spicchi",2,24,8),d("rotation","Rotazione",0,360,0),d("zoom","Zoom",20,300,100),d("cx","Centro X",0,100,50),d("cy","Centro Y",0,100,50)],variants:[{id:"sei",label:"Sei spicchi",p:{segments:6}},{id:"otto",label:"Otto",p:{segments:8}},{id:"specchio",label:"Specchio doppio",p:{segments:2}},{id:"rosone",label:"Rosone",p:{segments:16,zoom:60}}]},{id:"luceProiettata",label:"Luce proiettata",cat:"Luce",hint:"ombre di finestra, di foglie o caustiche d’acqua, come una luce vera nella stanza",params:[g("mode","Sorgente",["Finestra","Foglie","Caustiche"],0),d("angle","Angolo",-90,90,20),d("scale","Scala",30,300,100),d("soft","Morbidezza",0,100,50),d("strength","Intensità",0,100,70),e("warm","Calore luce","#ffd9a0")],variants:[{id:"finestra",label:"Finestra",p:{mode:0}},{id:"foglie",label:"Foglie",p:{mode:1}},{id:"acqua",label:"Caustiche",p:{mode:2,warm:"#bfe9ff",strength:60}},{id:"tramonto",label:"Finestra al tramonto",p:{mode:0,warm:"#ff9a4a",angle:35,strength:85}}]},{id:"colata",label:"Colatura",cat:"Luce",hint:"il colore cola in scie lunghe che sfumano, come un liquido o un neon che scivola",pad:a=>c(a.length,260)+10,params:[d("length","Lunghezza",20,900,260),d("angle","Direzione",0,360,90),d("fade","Dissolvenza",5,100,60),d("wobble","Ondulazione",0,100,30),d("glow","Bagliore",0,100,50),d("spectrum","Spettro",0,100,0)],variants:[{id:"giu",label:"Cola giù",p:{angle:90,length:320}},{id:"lunga",label:"Scia lunga",p:{angle:90,length:700,fade:35}},{id:"spettro",label:"Spettro",p:{angle:90,length:520,fade:45,spectrum:85,glow:80,wobble:20}},{id:"su",label:"Fiamma su",p:{angle:270,length:300,wobble:70}},{id:"lato",label:"Velocità",p:{angle:180,length:420,wobble:0,fade:50}}]},{id:"raggi",label:"Raggi di luce",cat:"Luce",hint:"fasci di luce che escono dalle lettere, radiali o orizzontali",pad:()=>220,params:[g("mode","Tipo",["Radiali","Orizzontali"],0),e("color","Colore","#7ab8ff"),d("intensity","Intensità",0,100,70),d("length","Lunghezza",5,100,60),d("cx","Centro X",0,100,50),d("cy","Centro Y",0,100,50)],variants:[{id:"blu",label:"Blu",p:{color:"#5aa2ff"}},{id:"oro",label:"Oro",p:{color:"#ffb547"}},{id:"acido",label:"Esplosione acida",p:{mode:0,color:"#9dff3c",length:75,intensity:85}},{id:"scia",label:"Scia orizzontale",p:{mode:1,color:"#ffffff",length:70}},{id:"fuoco",label:"Fuoco",p:{color:"#ff5a1f",intensity:85}}]},{id:"glitter",label:"Glitter",cat:"Testo",hint:"lettere fatte di scaglie che brillano, con polvere attorno",pad:()=>60,params:[f("useColor","Colore proprio",1),e("color","Colore","#c9ccd6"),d("size","Grana",1,12,4),d("sparkle","Scintille",0,100,70),d("dust","Polvere",0,100,50)],variants:[{id:"argento",label:"Argento",p:{color:"#c9ccd6"}},{id:"oro",label:"Oro",p:{color:"#d9b45a"}},{id:"rosa",label:"Rosa",p:{color:"#f2a1c7"}},{id:"nero",label:"Nero",p:{color:"#3a3a44",sparkle:90}}]},{id:"ascii",label:"ASCII",cat:"Schermo",hint:"la foto ridisegnata in caratteri: tono, contorni orientati, celle vuote nei neri, colore e bagliore",params:[d("style","Forza dello stile",0,100,65),d("cell","Corpo carattere",3,40,7),g("mode","Fondo",["Foto sfocata","Tinta piena","Carta","Trasparente"],0),g("charset","Caratteri",["Scala fine","Denso","Blocchi","Binario","Punti","Barre","Classico","Braille","Geometrici"],0),d("cutoff","Soglia del nero",0,80,18),d("glow","Bagliore",0,100,45),d("split","Sdoppiamento RGB",0,20,0),d("color","Colore della foto",0,100,100),d("saturation","Contrasto colore",0,100,60),d("brightness","Luminosità",-40,40,0),d("under","Fondo · intensità",0,100,55),d("backBlur","Fondo · sfocatura",0,60,14),d("contrast","Contrasto locale",0,100,50),d("edges","Contorni orientati",0,100,60),d("detail","Griglia e accenti",0,100,30),e("accent","Colore accento","#ff4d2e"),e("ink","Inchiostro","#f4f1ea"),e("bg","Tinta fondo","#07080a")],variants:[{id:"foto",label:"Glifi luminosi",p:{}},{id:"neon",label:"Neon su nero",p:{mode:1,glow:80,saturation:90,cutoff:25,split:4}},{id:"braille",label:"Braille",p:{charset:7,cell:6,edges:0,glow:35}},{id:"carta",label:"Stampa su carta",p:{mode:2,color:60,ink:"#16130f",bg:"#f1ece1",under:60,cell:6,contrast:70}},{id:"terminale",label:"Terminale",p:{mode:1,glow:70,color:0,ink:"#7dff9a",bg:"#020a04",under:10,saturation:0,cutoff:15}},{id:"micro",label:"Micro",p:{cell:4,edges:40,glow:30}},{id:"blocchi",label:"Blocchi su carta",p:{mode:2,charset:2,cell:6,edges:0,color:0,ink:"#1a1a1a",bg:"#efebe3",under:0,detail:20,cutoff:0}},{id:"binario",label:"Binario",p:{mode:3,charset:3,cell:6,color:0,ink:"#3b5bff",edges:0,detail:0}}]},{id:"linocut",label:"Incisione",cat:"Stampa",hint:"linee che avvolgono i volumi come in una banconota: spesse nelle ombre, sottili nelle luci",params:[d("mass","Masse di nero",0,100,50),d("wave","Onde da banconota",0,100,35),d("detail","Dettaglio di stampa",0,100,70),d("lines","Passo linee",2,30,4.5),d("angle","Direzione",0,180,30),d("flow","Curvatura sui volumi",0,100,55),d("cross","Tratteggio incrociato",0,100,60),d("color","Inchiostro a colori",0,100,0),d("threshold","Esposizione",10,90,50),d("rough","Ruvidità",0,100,20),e("ink","Inchiostro","#1d1915"),e("paper","Carta","#f3ecdc")],variants:[{id:"banconota",label:"Banconota",p:{lines:3.2,flow:85,wave:80,ink:"#1f3b2c",paper:"#eef0e4",cross:40}},{id:"nero",label:"Bulino nero",p:{}},{id:"colore",label:"A colori",p:{color:100,lines:3.5,cross:30}},{id:"rosso",label:"Rosso",p:{ink:"#c8321f",paper:"#f2e8d6",mass:75}},{id:"blu",label:"Blu",p:{ink:"#1b2f8f",paper:"#efe9dc",mass:75}},{id:"lino",label:"Linoleum",p:{lines:9,flow:25,cross:0,rough:70}}]},{id:"lowPoly",label:"Low-poly",cat:"Distorsione",hint:"faccette che si infittiscono sui dettagli, ognuna con il suo colore e la sua luce",params:[d("style","Forza dello stile",0,100,50),d("size","Faccette",6,160,26),d("detail","Più fitte sui dettagli",0,100,60),d("relief","Rilievo",0,100,40),d("jitter","Irregolarità",0,100,45),d("edge","Spigoli chiari",0,100,12),d("glow","Bagliore",0,100,15)],variants:[{id:"cristallo",label:"Cristallo",p:{}},{id:"fine",label:"Fine",p:{size:14,relief:45}},{id:"geometrico",label:"Geometrico",p:{size:44,jitter:0,detail:30,edge:50}},{id:"scolpito",label:"Scolpito",p:{size:30,relief:100}}]},{id:"pixelSort",label:"Pixel sorting",cat:"Schermo",hint:"i pixel dentro una fascia di luce vengono ordinati in strisce, il resto della foto resta",params:[d("threshold","Da luce",0,100,45),d("upper","A luce",0,100,100),d("length","Lunghezza massima",20,1600,420),d("angle","Direzione",0,360,90),d("vary","Strisce irregolari",0,100,70),f("reverse","Ordine inverso",0)],variants:[{id:"giu",label:"Verso il basso",p:{}},{id:"lato",label:"Di lato",p:{angle:0}},{id:"mezzetinte",label:"Mezze tinte",p:{threshold:25,upper:75,length:700}},{id:"forte",label:"Forte",p:{threshold:20,length:1100,vary:40}}]},{id:"grunge",label:"Usura",cat:"Stampa",hint:"inchiostro consumato con macchie e puntini, più forte sui bordi",params:[d("wear","Usura",0,100,45),d("scale","Scala",30,300,100),d("speck","Puntini",0,100,40)],variants:[{id:"leggera",label:"Leggera",p:{wear:30,speck:20}},{id:"timbro",label:"Timbro",p:{wear:50,speck:50}},{id:"rovinata",label:"Rovinata",p:{wear:62,speck:70,scale:70}}]},{id:"hollow",label:"Vuoto",cat:"Testo",hint:"solo il contorno, interno trasparente",params:[d("thickness","Spessore",1,30,3)],variants:[{id:"fine",label:"Fine",p:{thickness:2}},{id:"medio",label:"Medio",p:{thickness:4}},{id:"spesso",label:"Spesso",p:{thickness:8}}]},{id:"splice",label:"Spaccato",cat:"Testo",hint:"contorno vuoto con un riempimento sfalsato dietro",pad:a=>c(a.distance,8)+2,params:[d("thickness","Spessore",1,20,3),d("distance","Distanza",0,40,8),d("angle","Direzione",0,360,315),e("color","Colore","#ffd166")],variants:[{id:"giallo",label:"Giallo",p:{color:"#ffd166"}},{id:"rosa",label:"Rosa",p:{color:"#ff8fab"}},{id:"acqua",label:"Acqua",p:{color:"#72efdd"}}]},{id:"longShadow",label:"Ombra lunga",cat:"Testo",hint:"ombra piatta infinita, stile flat",pad:a=>c(a.length,120),params:[d("length","Lunghezza",10,500,120),d("angle","Direzione",0,360,45),e("color","Colore","#000000"),d("opacity","Opacità",0,100,35),d("fade","Dissolvenza",0,100,60)],variants:[{id:"flat",label:"Flat",p:{opacity:30,fade:0,length:200}},{id:"sfumata",label:"Sfumata",p:{opacity:45,fade:90,length:160}},{id:"colorata",label:"Colorata",p:{opacity:100,fade:0,length:60,color:"#ff8c42"}}]},{id:"extrude",label:"Estrusione 3D",cat:"Testo",hint:"volume solido dietro l’oggetto, stile retrò",pad:a=>c(a.depth,24)+2,params:[d("depth","Profondità",2,120,24),d("angle","Direzione",0,360,45),e("color","Colore","#2d1b69"),d("shade","Ombreggiatura",0,100,60),f("outline","Bordo scuro",1),d("bands","Strisce",0,8,0),e("c2","Striscia 2","#ffb000"),e("c3","Striscia 3","#ff3d00"),e("c4","Striscia 4","#7a1fa2")],variants:[{id:"arcobaleno",label:"Strisce anni 70",p:{depth:70,angle:60,bands:4,color:"#f2e7c4",c2:"#ffb000",c3:"#ff5a1f",c4:"#c2185b",shade:10}},{id:"party",label:"Strisce party",p:{depth:90,angle:90,bands:5,color:"#e63946",c2:"#f4a261",c3:"#2a9d8f",c4:"#264653",shade:0}},{id:"retro",label:"Retrò",p:{color:"#2d1b69",depth:24,angle:45}},{id:"arancio",label:"Arancio",p:{color:"#ff7a00",depth:18,angle:135}},{id:"profondo",label:"Profondo",p:{color:"#111111",depth:60,angle:60,shade:80}},{id:"pastello",label:"Pastello",p:{color:"#9ad1ff",depth:14,angle:45,outline:0,shade:30}}]},{id:"glitch",label:"Glitch",cat:"Testo",hint:"strisce spostate, canali separati, rumore digitale",animated:!0,pad:a=>6+.4*c(a.split,30)+.3*c(a.power,50),params:[d("power","Danno",0,100,50),d("split","Separazione RGB",0,100,30),d("slices","Strisce",4,60,18),d("noise","Rumore",0,100,20),d("speed","Velocità",0,100,0)],variants:[{id:"leggero",label:"Leggero",p:{power:25,split:18,slices:14,noise:8}},{id:"forte",label:"Forte",p:{power:80,split:55,slices:26,noise:30}},{id:"digitale",label:"Digitale",p:{power:60,split:30,slices:50,noise:45,speed:40}},{id:"rgb",label:"Solo RGB",p:{power:0,split:60,slices:18,noise:0}}]},{id:"bloom",label:"Bloom",cat:"Luce",hint:"le parti chiare irradiano luce morbida",pad:a=>1.5*c(a.size,30),params:[d("threshold","Soglia",0,100,60),d("intensity","Intensità",0,100,55),d("size","Ampiezza",2,120,30),d("warmth","Calore",-100,100,10)],variants:[{id:"sognante",label:"Sognante",p:{threshold:45,intensity:60,size:50}},{id:"scintille",label:"Scintille",p:{threshold:75,intensity:80,size:14}},{id:"calda",label:"Calda",p:{warmth:60}}]},{id:"lightLeak",label:"Luce filtrata",cat:"Luce",hint:"macchie di luce calda come una pellicola esposta",animated:!0,params:[e("c1","Colore 1","#ff6a00"),e("c2","Colore 2","#ff2d95"),d("position","Posizione",0,100,20),d("size","Ampiezza",10,100,55),d("speed","Movimento",0,100,0)],variants:[{id:"ambra",label:"Ambra",p:{c1:"#ff8a00",c2:"#ffcf33"}},{id:"rosa",label:"Rosa",p:{c1:"#ff2d95",c2:"#ff9a3c"}},{id:"freddo",label:"Freddo",p:{c1:"#3cc8ff",c2:"#a35cff"}}]},{id:"halftone",label:"Retino",cat:"Stampa",hint:"puntini di stampa: mono, a colori o quadricromia",params:[g("mode","Modo",["Inchiostro","Colori originali","Quadricromia CMYK"],1),g("shape","Forma",["Punti","Quadrati","Linee"],0),d("size","Retino",3,40,8),d("angle","Angolo",0,90,45),e("ink","Inchiostro","#111111"),f("paperOn","Carta",1),e("paper","Colore carta","#f5f0e6")],variants:[{id:"fumetto",label:"Fumetto",p:{mode:2,shape:0,size:7,paperOn:1}},{id:"giornale",label:"Giornale",p:{mode:0,shape:0,size:6,ink:"#1a1a1a",paperOn:1,paper:"#efe9dc"}},{id:"pop",label:"Pop",p:{mode:1,shape:0,size:12,paperOn:0}},{id:"linee",label:"Linee",p:{mode:0,shape:2,size:7,ink:"#1f3fbf",paperOn:1}}]},{id:"riso",label:"Risograph",cat:"Stampa",hint:"due inchiostri fuori registro, grana e sovrastampa",pad:a=>Math.max(c(a.reg1,3),c(a.reg2,6))+2,params:[e("ink1","Inchiostro 1","#ff48b0"),e("ink2","Inchiostro 2","#0078bf"),e("paper","Carta","#f3eee4"),g("screen","Trama",["Grana","Retino"],0),d("size","Grana",1,20,3),d("reg1","Registro 1",0,20,2),d("reg2","Registro 2",0,20,6),d("ink","Carico inchiostro",0,100,70),d("texture","Usura",0,100,45)],variants:[{id:"rosablu",label:"Rosa + Blu",p:{ink1:"#ff48b0",ink2:"#0078bf"}},{id:"arancioacqua",label:"Arancio + Acqua",p:{ink1:"#ff6c2f",ink2:"#00838a"}},{id:"rossonero",label:"Rosso + Nero",p:{ink1:"#ff665e",ink2:"#1a1a1a"}},{id:"giallo",label:"Giallo + Viola",p:{ink1:"#ffe800",ink2:"#765ba7"}},{id:"blu",label:"Solo blu",p:{ink1:"#3255a4",ink2:"#3255a4",reg2:1}}]},{id:"dither",label:"Dithering",cat:"Stampa",hint:"pochi colori e trama a pixel, stile 1-bit",params:[e("dark","Scuro","#0f380f"),e("light","Chiaro","#9bbc0f"),g("pattern","Trama",["Bayer 4×4","Bayer 8×8","Rumore"],1),d("size","Pixel",1,12,2),d("contrast","Contrasto",-50,100,20),f("levels4","Quattro toni",1)],variants:[{id:"gameboy",label:"Game Boy",p:{dark:"#0f380f",light:"#9bbc0f",levels4:1}},{id:"mac",label:"1-bit",p:{dark:"#000000",light:"#ffffff",levels4:0,pattern:1}},{id:"notte",label:"Notte",p:{dark:"#14112b",light:"#5ce1e6",levels4:1}},{id:"rosa",label:"Rosa",p:{dark:"#3b0a45",light:"#ffb3c6",levels4:1,pattern:2}}]},{id:"screenprint",label:"Serigrafia",cat:"Stampa",hint:"tre colori piatti con bordi d’inchiostro e carta",pad:()=>3,params:[e("c1","Scuro","#1d1d3b"),e("c2","Medio","#e94f37"),e("c3","Chiaro","#f6d8ae"),d("threshold","Soglia",0,100,50),d("rough","Bordi irregolari",0,100,40),d("offset","Fuori registro",0,10,2)],variants:[{id:"poster",label:"Poster",p:{c1:"#1d1d3b",c2:"#e94f37",c3:"#f6d8ae"}},{id:"warhol",label:"Pop art",p:{c1:"#1b1b1b",c2:"#ff3d7f",c3:"#ffe66d"}},{id:"verde",label:"Bosco",p:{c1:"#14281d",c2:"#5b8c5a",c3:"#e8e3c8"}}]},{id:"gradientMap",label:"Mappa sfumatura",cat:"Colore",hint:"le luci e le ombre diventano una sfumatura (duotone e oltre)",params:[e("c1","Ombre","#1d1a6e"),e("c2","Mezzitoni","#e0457b"),e("c3","Luci","#ffd29a"),f("three","Tre colori",1),d("contrast","Contrasto",-50,100,10)],variants:[{id:"pesca",label:"Pesca",p:{c1:"#3a0f4e",c2:"#e86a5c",c3:"#ffe0b5",three:1}},{id:"notte",label:"Notte",p:{c1:"#0b0f2e",c2:"#3a6ea5",c3:"#c9f1ff",three:1}},{id:"cyber",label:"Cyber",p:{c1:"#120458",c2:"#ff00a0",c3:"#00fff0",three:1}},{id:"duotone",label:"Duotone",p:{c1:"#1d1a6e",c2:"#ff7aa8",three:0}},{id:"oro",label:"Oro",p:{c1:"#1b1305",c2:"#9c6b16",c3:"#ffe9a8",three:1}},{id:"menta",label:"Menta",p:{c1:"#0d2b2b",c2:"#2fb39a",c3:"#f2ffe9",three:1}}]},{id:"posterize",label:"Poster",cat:"Colore",hint:"pochi livelli di colore, a tinte piatte",params:[d("levels","Livelli",2,12,4),f("dither","Retinatura",0),d("saturation","Saturazione",-50,100,15)],variants:[{id:"quattro",label:"4 livelli",p:{levels:4}},{id:"tre",label:"3 livelli",p:{levels:3,saturation:30}},{id:"retinato",label:"Retinato",p:{levels:4,dither:1}}]},{id:"tiltShift",label:"Tilt-shift",cat:"Foto",hint:"a fuoco solo una fascia: effetto plastico",params:[d("position","Fascia",0,100,50),d("width","Larghezza",0,60,18),d("feather","Passaggio",1,60,22),d("size","Sfocatura",1,60,16),d("angle","Angolo",-90,90,0)],variants:[{id:"classico",label:"Classico",p:{width:18,size:16}},{id:"stretto",label:"Stretto",p:{width:8,size:24}},{id:"verticale",label:"Verticale",p:{angle:90}}]},{id:"motionBlur",label:"Mosso",cat:"Foto",hint:"sfocatura di movimento in una direzione",pad:a=>c(a.length,30),params:[d("length","Lunghezza",1,200,30),d("angle","Direzione",0,180,0)],variants:[{id:"orizzontale",label:"Orizzontale",p:{angle:0}},{id:"verticale",label:"Verticale",p:{angle:90}},{id:"diagonale",label:"Diagonale",p:{angle:35,length:50}}]},{id:"zoomBlur",label:"Zoom",cat:"Foto",hint:"scia radiale verso il centro, velocità",params:[d("amount","Forza",1,100,25),d("cx","Centro X",0,100,50),d("cy","Centro Y",0,100,50)],variants:[{id:"leggero",label:"Leggero",p:{amount:12}},{id:"forte",label:"Forte",p:{amount:45}}]},{id:"wave",label:"Onda",cat:"Distorsione",hint:"ondulazione regolare",animated:!0,pad:a=>c(a.amp,10)+2,params:[d("amp","Ampiezza",0,60,10),d("length","Lunghezza d’onda",10,400,120),d("angle","Direzione",0,180,0),d("speed","Velocità",0,100,0)],variants:[{id:"dolce",label:"Dolce",p:{amp:8,length:160}},{id:"bandiera",label:"Bandiera",p:{amp:16,length:90,speed:30}},{id:"nervosa",label:"Nervosa",p:{amp:4,length:25}}]},{id:"ripple",label:"Increspatura",cat:"Distorsione",hint:"cerchi concentrici come acqua",animated:!0,params:[d("amp","Ampiezza",0,40,6),d("length","Distanza anelli",5,200,40),d("speed","Velocità",0,100,0)],variants:[{id:"goccia",label:"Goccia",p:{amp:6,length:40}},{id:"lago",label:"Lago",p:{amp:3,length:18,speed:30}}]},{id:"twirl",label:"Vortice",cat:"Distorsione",hint:"rotazione che cresce verso il centro",params:[d("angle","Rotazione",-720,720,180),d("radius","Raggio",10,100,60)],variants:[{id:"orario",label:"Orario",p:{angle:180}},{id:"antiorario",label:"Antiorario",p:{angle:-180}},{id:"forte",label:"Forte",p:{angle:540,radius:80}}]},{id:"bulge",label:"Lente",cat:"Distorsione",hint:"gonfia o pizzica il centro",params:[d("amount","Gonfia ↔ pizzica",-100,100,50),d("radius","Raggio",10,100,70)],variants:[{id:"gonfia",label:"Gonfia",p:{amount:60}},{id:"pizzica",label:"Pizzica",p:{amount:-60}}]},{id:"mosaic",label:"Mosaico",cat:"Distorsione",hint:"tessere quadrate o esagonali con fughe",params:[g("shape","Tessere",["Quadrate","Esagonali"],0),d("size","Dimensione",2,80,12),d("gap","Fughe",0,50,0)],variants:[{id:"pixel",label:"Pixel",p:{shape:0,size:10,gap:0}},{id:"piastrelle",label:"Piastrelle",p:{shape:0,size:18,gap:18}},{id:"alveare",label:"Alveare",p:{shape:1,size:14,gap:12}}]},{id:"chroma",label:"Aberrazione",cat:"Distorsione",hint:"canali di colore sfasati, come una lente economica",pad:a=>1.6*c(a.amount,6)+2,params:[d("amount","Sfasamento",0,40,6),d("distortion","Distorsione lente",-50,50,0),f("radial","Radiale",1)],variants:[{id:"leggera",label:"Leggera",p:{amount:4}},{id:"forte",label:"Forte",p:{amount:14}},{id:"lineare",label:"Lineare",p:{amount:8,radial:0}}]},{id:"vhs",label:"VHS",cat:"Schermo",hint:"videocassetta: colore che sbava, righe e tracking",animated:!0,pad:()=>6,params:[d("power","Usura",0,100,55),d("bleed","Sbavatura colore",0,100,50),d("lines","Righe",0,100,40),d("speed","Velocità",0,100,35)],variants:[{id:"nastro",label:"Nastro",p:{power:55}},{id:"rovinato",label:"Rovinato",p:{power:90,bleed:80,lines:70}},{id:"fermo",label:"Fermo immagine",p:{speed:0,power:60}}]},{id:"crt",label:"CRT",cat:"Schermo",hint:"vecchio monitor: righe, fosfori e curvatura",animated:!0,params:[d("scan","Righe",0,100,55),d("mask","Fosfori RGB",0,100,45),d("curve","Curvatura",0,100,25),d("glow","Bagliore",0,100,35),d("speed","Sfarfallio",0,100,0)],variants:[{id:"arcade",label:"Arcade",p:{scan:60,mask:55,curve:30}},{id:"terminale",label:"Terminale",p:{scan:70,mask:20,curve:15,glow:60}},{id:"piatto",label:"Piatto",p:{curve:0}}]}],i=a=>h.find(b=>b.id===a);function j(a,b){let c=i(a),d=b?c.variants.find(a=>a.id===b):c.variants[0];return{id:a,on:!0,amount:100,variant:d?.id,p:{...Object.fromEntries(c.params.map(a=>[a.key,a.def])),...d?.p??{}}}}let k={shadow:a=>({...j("dropShadow"),p:{...j("dropShadow").p,...a,size:a.blur??24}}),glow:a=>({...j("outerGlow"),p:{...j("outerGlow").p,color:a.color??"#ffd166",size:a.size??18}}),outline:a=>({...j("stroke"),p:{...j("stroke").p,size:a.width??6,color:a.color??"#ffffff"}}),duotone:a=>({...j("gradientMap","duotone"),p:{...j("gradientMap","duotone").p,c1:a.c1??"#1d1a6e",c2:a.c2??"#ff7aa8",three:0}}),pixel:a=>({...j("mosaic","pixel"),p:{...j("mosaic","pixel").p,size:a.size??10}})};function l(a){return a?a.map(a=>k[a.id]?{...k[a.id](a.p),on:a.on,amount:a.amount}:a).filter(a=>i(a.id)):a}a.s(["FX_DEFS",0,h,"HSL_BANDS",0,[{key:"red",label:"Rossi",hue:0,swatch:"#ff4b4b"},{key:"orange",label:"Arancioni",hue:30,swatch:"#ff9a3c"},{key:"yellow",label:"Gialli",hue:58,swatch:"#ffe14b"},{key:"green",label:"Verdi",hue:115,swatch:"#4bd463"},{key:"aqua",label:"Acqua",hue:180,swatch:"#3cd9d9"},{key:"blue",label:"Blu",hue:225,swatch:"#3c6bff"},{key:"purple",label:"Viola",hue:275,swatch:"#9b5cff"},{key:"magenta",label:"Magenta",hue:320,swatch:"#ff4bd2"}],"LOOKS",0,[{id:"luminoso",label:"Luminoso",family:"Naturali",adjust:{exposure:12,contrast:8,highlights:-18,shadows:15,vibrance:22}},{id:"morbido",label:"Morbido",family:"Naturali",adjust:{contrast:-18,highlights:-20,shadows:18,clarity:-15,vibrance:8,curve:5}},{id:"nitido",label:"Nitido",family:"Naturali",adjust:{contrast:12,clarity:35,sharpen:30,vibrance:12,blacks:-8}},{id:"vivace",label:"Vivace",family:"Naturali",adjust:{contrast:15,vibrance:40,saturation:10,curve:1,whites:8}},{id:"caldo",label:"Caldo",family:"Naturali",adjust:{temperature:28,tint:4,vibrance:10,gHi_h:40,gHi_s:18}},{id:"freddo",label:"Freddo",family:"Naturali",adjust:{temperature:-25,tint:-4,contrast:6,gSh_h:215,gSh_s:20}},{id:"portra",label:"Portra",family:"Pellicola",adjust:{temperature:10,contrast:-10,curve:3,fade:12,saturation:-8,hsl_orange_s:8,hsl_orange_l:6,hsl_green_h:18,hsl_green_s:-25,gSh_h:190,gSh_s:10,gHi_h:35,gHi_s:14,grain:22,grainSize:30,halation:10}},{id:"ektar",label:"Ektar",family:"Pellicola",adjust:{contrast:22,saturation:18,vibrance:15,curve:1,hsl_red_s:15,hsl_blue_s:20,hsl_blue_l:-10,blacks:-10,grain:15,grainSize:20}},{id:"fuji",label:"Fuji 400",family:"Pellicola",adjust:{temperature:-6,tint:6,curve:3,fade:10,hsl_green_h:-12,hsl_green_s:10,hsl_blue_h:-8,gSh_h:165,gSh_s:16,gHi_h:330,gHi_s:8,grain:25,grainSize:30}},{id:"cinestill",label:"Cinestill 800T",family:"Pellicola",adjust:{temperature:-30,tint:8,contrast:10,curve:4,halation:70,gSh_h:200,gSh_s:22,gHi_h:20,gHi_s:12,grain:35,grainSize:40,vignette:15}},{id:"kodachrome",label:"Kodachrome",family:"Pellicola",adjust:{contrast:25,saturation:12,curve:2,hsl_red_s:22,hsl_red_l:-8,hsl_yellow_h:-6,hsl_blue_l:-15,temperature:6,blacks:-12,grain:12}},{id:"polaroid",label:"Polaroid",family:"Pellicola",adjust:{fade:35,contrast:-12,saturation:-15,temperature:8,gSh_h:185,gSh_s:28,gHi_h:45,gHi_s:22,vignette:28,vigFeather:70,grain:18,curve:3}},{id:"scaduta",label:"Scaduta",family:"Pellicola",adjust:{fade:40,tint:22,temperature:12,saturation:-20,gSh_h:290,gSh_s:25,gHi_h:60,gHi_s:20,grain:55,grainSize:55,vignette:30,halation:25}},{id:"tealorange",label:"Teal & Orange",family:"Cinema",adjust:{contrast:18,gSh_h:190,gSh_s:38,gHi_h:32,gHi_s:30,hsl_orange_s:12,hsl_aqua_h:-10,hsl_blue_h:-25,saturation:-5,curve:4}},{id:"notturno",label:"Notturno",family:"Cinema",adjust:{exposure:-12,temperature:-35,contrast:15,saturation:-25,gSh_h:225,gSh_s:30,halation:30,vignette:30}},{id:"deserto",label:"Deserto",family:"Cinema",adjust:{temperature:30,contrast:10,hsl_green_s:-50,hsl_blue_s:-30,hsl_orange_s:10,gHi_h:38,gHi_s:25,fade:10,curve:4}},{id:"bleach",label:"Bleach bypass",family:"Cinema",adjust:{saturation:-55,contrast:40,clarity:25,blacks:-15,highlights:-15,curve:2,grain:18}},{id:"matrix",label:"Codice",family:"Cinema",adjust:{tint:-25,temperature:-10,contrast:20,gSh_h:140,gSh_s:30,gHi_h:100,gHi_s:15,saturation:-20,curve:4}},{id:"bn",label:"Bianco e nero",family:"Bianco e nero",adjust:{saturation:-100,contrast:12,clarity:10}},{id:"trix",label:"Tri-X",family:"Bianco e nero",adjust:{saturation:-100,contrast:35,curve:2,blacks:-15,grain:55,grainSize:45,clarity:15}},{id:"argento",label:"Argento",family:"Bianco e nero",adjust:{saturation:-100,exposure:15,contrast:-15,highlights:20,fade:15,curve:5}},{id:"noir",label:"Noir",family:"Bianco e nero",adjust:{saturation:-100,contrast:45,shadows:-25,curve:2,vignette:45,grain:30}},{id:"seppia",label:"Seppia",family:"Bianco e nero",adjust:{saturation:-100,gSh_h:30,gSh_s:35,gMid_h:35,gMid_s:30,gHi_h:45,gHi_s:20,fade:15,contrast:5}},{id:"cianotipia",label:"Cianotipia",family:"Bianco e nero",adjust:{saturation:-100,gSh_h:215,gSh_s:70,gMid_h:205,gMid_s:55,gHi_h:195,gHi_s:25,contrast:10,fade:10}},{id:"sogno",label:"Sogno",family:"Creativi",adjust:{exposure:10,contrast:-25,fade:25,clarity:-40,halation:40,gHi_h:330,gHi_s:18,gSh_h:260,gSh_s:15}},{id:"vapor",label:"Vaporwave",family:"Creativi",adjust:{gSh_h:270,gSh_s:45,gHi_h:180,gHi_s:40,saturation:15,contrast:10,hsl_blue_h:30,hsl_red_h:-20}},{id:"lomo",label:"Lomo",family:"Creativi",adjust:{contrast:35,saturation:30,vignette:60,vigFeather:40,curve:2,gSh_h:210,gSh_s:18}},{id:"pastello",label:"Pastello",family:"Creativi",adjust:{exposure:15,contrast:-30,saturation:-15,fade:30,gHi_h:340,gHi_s:12,gSh_h:200,gSh_s:12}},{id:"acido",label:"Acido",family:"Creativi",adjust:{saturation:40,contrast:25,hsl_green_h:-30,hsl_blue_h:40,hsl_red_h:25,tint:-15,clarity:20}},{id:"tramonto",label:"Tramonto",family:"Creativi",adjust:{temperature:45,tint:15,gSh_h:280,gSh_s:25,gHi_h:30,gHi_s:35,contrast:10,halation:20}}],"fxDef",0,i,"migrateFx",()=>l,"newFx",()=>j])},85125,a=>{"use strict";var b=a.i(97068),c=a.i(59547),d=a.i(51917);let e=(a,b="#000000")=>{let c=String(a??b).replace("#",""),d=3===c.length?c.split("").map(a=>a+a).join(""):c.padEnd(6,"0");return[0,2,4].map(a=>parseInt(d.slice(a,a+2),16)/255)},f=(a,b=0)=>"number"==typeof a?a:void 0===a?b:Number(a)||b,g=a=>a*Math.PI/180,h=new WeakMap;function i(a,e,g,i,j){let k=b.FxGL.get();if(!k)return!1;let l=a.width,m=a.height;if(!l||!m)return!1;try{let b=k.upload(a,l,m),n=((0,d.migrateFx)(g.fx)??[]).filter(a=>a.on&&(0,d.fxDef)(a.id)),o=function(a){let b=0;for(let c of a){let a=c.p;switch(c.id){case"dropShadow":case"outerGlow":b=Math.max(b,f(a.spread)+1);break;case"innerShadow":b=Math.max(b,f(a.choke)+1);break;case"innerGlow":b=Math.max(b,f(a.choke)+f(a.size,14)+2);break;case"bevel":b=Math.max(b,f(a.size,10)+2);break;case"stroke":b=Math.max(b,f(a.size,6)+2);break;case"neon":b=Math.max(b,.15*f(a.size,18)+3);break;case"hollow":case"splice":b=Math.max(b,f(a.thickness,3)+2);break;case"material3d":b=Math.max(b,1e5);break;case"grunge":b=Math.max(b,10);break;case"glitter":b=Math.max(b,60);break;case"raggi":b=Math.max(b,400);break;case"impressione":break;case"stitch":b=Math.max(b,f(a.inset,5)+6);break;case"foil":b=Math.max(b,f(a.bevel,4)+4)}}return b}(n)*i,q=o>0?k.sdf(b,o+4):null,r={g:k,orig:b,W:l,H:m,z:i,t:j,sdf:q,stroke:function(a){let b=`${a.width}x${a.height}`,c=h.get(a);if(c&&c.key===b)return c.v;let d=Math.min(1,320/Math.max(a.width,a.height)),e=Math.max(1,Math.round(a.width*d)),f=Math.max(1,Math.round(a.height*d)),g=document.createElement("canvas");g.width=e,g.height=f;let i=g.getContext("2d",{willReadFrequently:!0});i.drawImage(a,0,0,e,f);let j=i.getImageData(0,0,e,f).data,k=0,l=0,m=(a,b)=>a>=0&&b>=0&&a<e&&b<f&&j[(b*e+a)*4+3]>127;for(let a=0;a<f;a++)for(let b=0;b<e;b++)m(b,a)&&(k++,m(b+1,a)&&m(b-1,a)&&m(b,a+1)&&m(b,a-1)||l++);let n=l?2*k/l/d:Math.max(a.width,a.height);return h.set(a,{key:b,v:n}),n}(a)/i,mask:a=>q?k.pass("mask",c.MASK,l,m,{uSdf:q,uE:a}):k.pass("maskA",c.MASK_A,l,m,{uSrc:b})},s=function(a){let b={...a.adjust??{}},c=a.look&&d.LOOKS.find(b=>b.id===a.look.id);if(c){let d=(a.look.amount??100)/100;for(let[a,e]of Object.entries(c.adjust)){if("curve"===a){d>=.5&&!b.curve&&(b.curve=e);continue}if(/_h$|^gSh_h$|^gMid_h$|^gHi_h$/.test(a)&&!a.startsWith("hsl_")||"grainSize"===a||"vigFeather"===a){void 0===b[a]&&(b[a]=e);continue}b[a]=Math.max(-100,Math.min(100,(b[a]??0)+e*d))}}return b}(g),t=function(a,b,e){let{g:f,W:g,H:h,z:i}=a,j=a=>(e[a]??0)/100,k=b;e.blur&&(k=f.blur(b,.35*e.blur*i));let l=d.HSL_BANDS.some(a=>e[`hsl_${a.key}_h`]||e[`hsl_${a.key}_s`]||e[`hsl_${a.key}_l`]),m=!!(e.gSh_s||e.gMid_s||e.gHi_s);if(["temperature","tint","exposure","contrast","highlights","shadows","whites","blacks","clarity","vibrance","saturation","sharpen","fade","curve"].some(a=>e[a])||l||m){let a=e.clarity?f.blur(k,18*i):k,l=e.sharpen?f.blur(k,1.2*Math.max(1,i)):k,m=f.pass("adjust",c.ADJUST,g,h,{uSrc:k,uBlurL:a,uBlurS:l,uTemp:j("temperature"),uTint:j("tint"),uExp:j("exposure"),uCon:j("contrast"),uHi:j("highlights"),uSh:j("shadows"),uWh:j("whites"),uBl:j("blacks"),uClar:j("clarity"),uVib:j("vibrance"),uSat:j("saturation"),uSharp:j("sharpen"),uFade:j("fade"),uCurve:e.curve??0,uBal:j("gBal"),uGSh:[e.gSh_h??0,j("gSh_s")],uGMid:[e.gMid_h??0,j("gMid_s")],uGHi:[e.gHi_h??0,j("gHi_s")],uHslH:d.HSL_BANDS.map(a=>j(`hsl_${a.key}_h`)),uHslS:d.HSL_BANDS.map(a=>j(`hsl_${a.key}_s`)),uHslL:d.HSL_BANDS.map(a=>j(`hsl_${a.key}_l`))});a!==k&&f.release(a),l!==k&&f.release(l),k!==b&&f.release(k),k=m}if(e.halation){let a=f.pass("halMask",c.HAL_MASK,g,h,{uSrc:k,uTh:.62}),d=f.blur(a,(6+.35*e.halation)*i);f.release(a);let l=f.pass("halAdd",c.HAL_ADD,g,h,{uSrc:k,uB:d,uK:1.4*j("halation")});f.release(d),k!==b&&f.release(k),k=l}return k}(r,b,s);for(let a of n){let c=p[a.id];if(!c)continue;let d=c(r,t,a.p,a.amount/100);d!==t&&t!==b&&k.release(t),t=d}return t=function(a,b,d){if(!d.vignette&&!d.grain)return b;let e=a.g.pass("finish",c.FINISH,a.W,a.H,{uSrc:b,uVig:(d.vignette??0)/100,uVigF:(d.vigFeather??50)/100,uGrain:(d.grain??0)/100,uGrainSize:(d.grainSize??25)/100,uZ:a.z,uT:a.t});return b!==a.orig&&a.g.release(b),e}(r,t,s),k.present(t,e),!0}catch(a){return console.warn("[fx] render non riuscito",a),!1}finally{k.releaseAll()}}let j=(a,b,c)=>[Math.cos(g(b))*c*a.z/a.W,Math.sin(g(b))*c*a.z/a.H],k=(a,b,c,d={})=>({uSrc:b,uOrig:a.orig,uZ:a.z,uT:a.t,uAmt:c,...a.sdf?{uSdf:a.sdf}:{},uHasSdf:+!!a.sdf,...d}),l=(a,b,c)=>(d,e,f,g)=>d.g.pass(a,b,d.W,d.H,k(d,e,g,c(d,f))),m=[" .'`,-_:;~^\"+=<>*rcvszxoaeunmwqpdbkhXZOQ8#%&@"," .,:;irsXA253hMHGS#9B&@"," ░▒▓█"," 01"," ·•●"," ／＼｜＿＃"," .:-=+*#%@"," ⠁⠂⠃⠅⠇⠋⠏⠟⠿⡿⣟⣯⣷⣿"," .·:-=≡▪■█"],n=["carta-bianca","carta-grigia","carta-stropicciata","cartoncino-avana","carta-kraft","carta-paglia","gesso","intonaco","cemento-scuro","marmo-nero","pelle","tela","metallo-spazzolato","metallo-bianco","lamina","plastica"];function o(a,b,d,e,f,g=0,h=.025){let i=a.g.blur(d,e),j=a.g.blur(b,e),k=g>0?a.g.blur(b,.3*e):j,l=a.g.pass("tonematch",c.TONEMATCH,a.W,a.H,{uSrc:b,uRef:i,uResB:j,uGlow:k,uK:f,uBloom:g,uGrain:h,uT:a.t});return a.g.release(i,j,b),k!==j&&a.g.release(k),l}let p={dropShadow:(a,b,d)=>{let g=a.mask(-f(d.spread)*a.z),h=f(d.size,20)>0?a.g.blur(g,f(d.size,20)*a.z):g,i=a.g.pass("shadowComp",c.SHADOW_COMP,a.W,a.H,{uSrc:b,uM:h,uOff:j(a,f(d.angle,90),f(d.distance,12)),uCol:e(d.color),uOp:f(d.opacity,35)/100});return a.g.release(g,h),i},innerShadow:(a,b,d)=>{let g=a.mask(f(d.choke)*a.z),h=f(d.size,10)>0?a.g.blur(g,f(d.size,10)*a.z):g,i=a.g.pass("innerShadow",c.INNER_SHADOW,a.W,a.H,{uSrc:b,uM:h,uOff:j(a,f(d.angle,120),f(d.distance,6)),uCol:e(d.color),uOp:f(d.opacity,45)/100});return a.g.release(g,h),i},outerGlow:(a,b,d)=>{let g=a.mask(-f(d.spread)*a.z),h=a.g.blur(g,f(d.size,24)*a.z),i=a.g.pass("glowComp",c.GLOW_COMP,a.W,a.H,{uSrc:b,uM:h,uCol:e(d.color),uCol2:e(d.color2),uTwo:f(d.two),uOp:f(d.opacity,80)/100});return a.g.release(g,h),i},innerGlow:l("innerGlow",c.INNER_GLOW,(a,b)=>({uCol:e(b.color),uOp:f(b.opacity,70)/100,uCenter:f(b.source),uChoke:f(b.choke)*a.z,uSize:Math.max(1,f(b.size,14)*a.z)})),bevel:(a,b,d)=>{let h=Math.max(1,Math.min(f(d.size,10),.45*a.stroke)*a.z),i=a.g.pass("bevelH",c.BEVEL_H,a.W,a.H,k(a,b,1,{uSize:h,uStyle:f(d.style),uTech:f(d.technique)})),j=a.g.blur(i,(1.6+f(d.soften,2))*a.z);a.g.release(i);let l=a.g.pass("bevel",c.BEVEL,a.W,a.H,k(a,b,1,{uH:j,uSize:h,uStyle:f(d.style),uDepth:f(d.depth,100)/100,uAng:g(f(d.angle,120)),uAlt:g(f(d.altitude,32)),uGloss:f(d.gloss)/100,uHi:e(d.hiColor,"#ffffff"),uHiOp:f(d.hiOpacity,75)/100,uShC:e(d.shColor),uShOp:f(d.shOpacity,60)/100}));return a.g.release(j),l},stroke:l("stroke",c.STROKE,(a,b)=>({uPos:f(b.position),uSize:f(b.size,6)*a.z,uCol:e(b.color,"#ffffff"),uCol2:e(b.color2),uGrad:f(b.gradient),uGAng:g(f(b.gangle,90)),uOp:f(b.opacity,100)/100})),satin:(a,b,d)=>{let g=a.g.blur(a.orig,f(d.size,16)*a.z),h=a.g.pass("satin",c.SATIN,a.W,a.H,{uSrc:b,uB:g,uOff:j(a,f(d.angle,19),f(d.distance,14)),uCol:e(d.color),uOp:f(d.opacity,40)/100,uInv:f(d.invert)});return a.g.release(g),h},colorOverlay:l("colorOverlay",c.COLOR_OVERLAY,(a,b)=>({uCol:e(b.color),uMode:f(b.blend),uOp:f(b.opacity,100)/100})),gradientOverlay:l("gradOverlay",c.GRAD_OVERLAY,(a,b)=>({uC1:e(b.c1),uC2:e(b.c2),uC3:e(b.c3,"#ffffff"),uThree:f(b.three),uType:f(b.type),uAng:g(f(b.angle,90)),uScale:f(b.scale,100)/100,uMode:f(b.blend),uOp:f(b.opacity,100)/100})),textureOverlay:l("texOverlay",c.TEX_OVERLAY,(a,b)=>({uKind:f(b.kind,1),uScale:f(b.scale,100)/100,uMode:f(b.blend,3),uOp:f(b.opacity,60)/100})),neon:(a,b,d,g)=>{let h=f(d.size,18)*a.z,i=a.g.blur(a.orig,.3*h),j=a.g.blur(a.orig,h),l=a.g.blur(a.orig,2.2*h),m=a.g.pass("neon",c.NEON,a.W,a.H,k(a,b,g,{uB1:i,uB2:j,uB3:l,uCol:e(d.color),uInt:f(d.intensity,75)/100,uTube:f(d.tube,65)/100,uFlick:f(d.flicker)/100,uEdge:Math.max(1.5*a.z,.12*h)}));return a.g.release(i,j,l),m},echo:l("echo",c.ECHO,(a,b)=>({uCount:Math.round(f(b.count,4)),uOff:j(a,f(b.angle,315),f(b.distance,8)),uUse:f(b.useColor),uCol:e(b.color),uFade:f(b.fade,70)/100})),impressione:(a,b,d,g)=>{let h=n[f(d.material)]??n[0],i=a.g.image(`/assets/materials/${h}.jpg`),j=a.g.image(`/assets/materials/${h}-rilievo.jpg`),l=Math.max(1,Math.min(f(d.size,8),.42*a.stroke)),m=f(d.mode),o=m>3.5?a.orig:a.g.blur(a.orig,l*a.z*.35),p=m>3.5?a.orig:a.g.blur(a.orig,l*a.z*.9),q=a.g.pass("impress",c.IMPRESS,a.W,a.H,k(a,b,g,{uMat:i??b,uNrm:j??b,uH:o,uHb:p,uHasMat:i&&j?1:0,uMode:m,uDepth:f(d.depth,60)/100,uSize:l,uLight:f(d.light,135)*Math.PI/180,uScale:f(d.scale,100)/100,uMicro:f(d.micro,60)/100,uScene:f(d.scene,60)/100,uInk:e(d.ink,"#1d2a6b"),uFoilA:e(d.c1,"#6b4a10"),uFoilB:e(d.c2,"#ffe9a8"),uTint:e(d.tint,"#ffffff")}));return m<=3.5&&a.g.release(o,p),q},vetro:(a,b,d,e)=>{let h=Math.max(4,f(d.width,22)),i=a.g.blur(b,.35*h*a.z),j=a.g.pass("fluted",c.FLUTED,a.W,a.H,k(a,b,e,{uFrostTex:i,uW:h,uStr:f(d.strength,45)/100,uAng:g(f(d.angle,0)),uHi:f(d.highlight,45)/100,uShade:f(d.shade,55)/100,uDisp:f(d.dispersion,25)/100*.12,uFrost:f(d.frost,25)/100}));return a.g.release(i),j},ascii:(a,b,d,g)=>{let h=m[f(d.charset)]??m[0],i=new Set([...h]).size,j=a.g.canvasTex(`ascii4|${h}`,()=>{let a,b,c,d;return a=a=>{let b=document.createElement("canvas");b.width=40,b.height=64;let c=b.getContext("2d",{willReadFrequently:!0});c.fillStyle="#000",c.fillRect(0,0,40,64),c.fillStyle="#fff",c.textAlign="center",c.textBaseline="middle",c.font='700 51.2px "JetBrains Mono", "IBM Plex Mono", "DejaVu Sans Mono", "Noto Sans Symbols 2", "Segoe UI Symbol", monospace',c.fillText(a,20,34);let d=0,e=c.getImageData(0,0,40,64).data;for(let a=0;a<e.length;a+=4)d+=e[a];return{cv:b,cov:d/652800}},b=[...[...new Set([...h])].map(a).sort((a,b)=>a.cov-b.cov),...["|","/","-","\\"].map(a)],(c=document.createElement("canvas")).width=40*b.length,c.height=64,d=c.getContext("2d"),b.forEach((a,b)=>d.drawImage(a.cv,40*b,0)),c}),l=Math.max(3,f(d.cell,7)),n=a.g.blur(b,.35*l*a.z),p=a.g.blur(b,1.1*l*a.z),q=a.g.blur(b,Math.max(2*l,f(d.backBlur,14))*a.z),r=f(d.mode),s=f(d.style,65)/100,t=a.g.pass("ascii",c.ASCII,a.W,a.H,k(a,b,g,{uAtlas:j,uCellTex:n,uWide:p,uLocal:q,uCell:l,uN:i,uMode:r,uColor:f(d.color,100)/100,uUnder:f(d.under,55)/100,uEdges:f(d.edges,60)/100,uCon:f(d.contrast,50)/100,uSat:f(d.saturation,60)/100,uInv:+(2===r),uStyle:s,uGrid:f(d.detail,30)/100,uCut:f(d.cutoff,18)/100,uSplit:f(d.split,0)/10,uBright:f(d.brightness,0)/100,uAccent:e(d.accent,"#ff4d2e"),uInk:e(d.ink,"#f4f1ea"),uBg:e(d.bg,"#07080a")}));a.g.release(n,p,q);let u=f(d.glow,45)/100*(2===r?.15:.7*(3!==r)),v=.5*(1-s)*(0===r?1:1===r?.3:+(2===r));return v>0||u>0?o(a,t,b,1.4*l*a.z,v,u,.018*(3!==r)):t},linocut:(a,b,d,h)=>{let i=Math.max(2,f(d.lines,4.5)),j=a.g.blur(b,3*i*a.z),l=a.g.pass("linocut",c.LINOCUT,a.W,a.H,k(a,b,h,{uFlowTex:j,uInk:e(d.ink,"#1d1915"),uPaper:e(d.paper,"#f3ecdc"),uLines:i,uAng:g(f(d.angle,30)),uFlow:f(d.flow,55)/100,uCross:f(d.cross,60)/100,uColor:f(d.color,0)/100,uRough:f(d.rough,20)/100,uTh:f(d.threshold,50)/100,uMass:f(d.mass,50)/100,uDetail:f(d.detail,70)/100,uWave:f(d.wave,35)/100}));return a.g.release(j),l},specchi:l("mirrortile",c.MIRRORTILE,(a,b)=>({uSize:Math.max(6,f(b.size,26)),uRefr:f(b.refraction,35)/100,uGrout:f(b.grout,6)/100,uGloss:f(b.gloss,50)/100,uGroutCol:e(b.groutColor,"#1a1a1a")})),luceProiettata:l("lightcast",c.LIGHTCAST,(a,b)=>({uMode:f(b.mode),uAng:g(f(b.angle,20)),uScale:f(b.scale,100)/100,uSoft:f(b.soft,50)/100,uStr:f(b.strength,70)/100,uWarm:e(b.warm,"#ffd9a0")})),pixelSort:l("pixelsort",c.PIXELSORT,(a,b)=>({uDir:j(a,f(b.angle,90),f(b.length,420)),uLo:f(b.threshold,45)/100,uHi:f(b.upper,100)/100,uVar:f(b.vary,70)/100,uRev:f(b.reverse)})),lowPoly:(a,b,d,e)=>{let g=Math.max(4,f(d.size,26)),h=a.g.blur(b,.06*g*a.z),i=a.g.pass("lowpoly",c.LOWPOLY,a.W,a.H,k(a,b,e,{uSoft:h,uSize:g,uEdge:f(d.edge,12)/100,uDetail:f(d.detail,60)/100,uRelief:f(d.relief,40)/100*(1+f(d.style,50)/100*.8),uJit:f(d.jitter,45)/100}));return a.g.release(h),o(a,i,b,1.5*g*a.z,.5*(1-f(d.style,50)/100),f(d.glow,15)/100*.3,.02)},caleido:l("kaleido",c.KALEIDO,(a,b)=>({uSeg:Math.max(2,Math.round(f(b.segments,8))),uRot:g(f(b.rotation,0)),uZoom:f(b.zoom,100)/100,uC:[f(b.cx,50)/100,f(b.cy,50)/100]})),grunge:l("grunge",c.GRUNGE,(a,b)=>({uWear:f(b.wear,45)/100,uScale:f(b.scale,100)/100,uSpeck:f(b.speck,40)/100})),stitch:l("stitch",c.STITCH,(a,b)=>({uThread:e(b.color,"#e94f37"),uStitch:e(b.stitch,"#fff4e0"),uUseColor:f(b.useColor),uDensity:f(b.density,70)/40,uInset:f(b.inset,5)})),foil:l("foil",c.FOIL,(a,b)=>({uA:e(b.c1,"#7a5310"),uB:e(b.c2,"#fff1b8"),uCrinkle:f(b.crinkle,60)/100,uLight:f(b.light,220)*Math.PI/180,uBevel:f(b.bevel,4)})),hollow:l("hollow",c.HOLLOW,(a,b)=>({uW:f(b.thickness,3)*a.z})),splice:l("splice",c.SPLICE,(a,b)=>({uW:f(b.thickness,3)*a.z,uOff:j(a,f(b.angle,315),f(b.distance,8)),uCol:e(b.color)})),longShadow:l("longShadow",c.LONG_SHADOW,(a,b)=>({uDir:j(a,f(b.angle,45),f(b.length,120)),uCol:e(b.color),uOp:f(b.opacity,35)/100,uFade:f(b.fade,60)/100})),extrude:l("extrude",c.EXTRUDE,(a,b)=>({uDir:j(a,f(b.angle,45),f(b.depth,24)),uCol:e(b.color),uShade:f(b.shade,60)/100,uBands:f(b.bands),uC2:e(b.c2,"#ffb000"),uC3:e(b.c3,"#ff3d00"),uC4:e(b.c4,"#7a1fa2")})),colata:(a,b,d,e)=>{let g=a.g.pass("smear",c.SMEAR,a.W,a.H,k(a,b,e,{uDir:j(a,f(d.angle,90),f(d.length,260)),uFade:Math.max(.3,f(d.fade,60)/25),uWobble:f(d.wobble,30)/100,uGlow:f(d.glow,50)/100,uSpectrum:f(d.spectrum)/100})),h=a.g.blur(g,1.6*a.z),i=a.g.pass("overAB",c.OVER_AB,a.W,a.H,{uA:b,uB:h});return a.g.release(g,h),i},raggi:l("rays",c.RAYS,(a,b)=>({uCenter:[f(b.cx,50)/100,f(b.cy,50)/100],uLen:f(b.length,60)/100,uInt:f(b.intensity,70)/100,uMode:f(b.mode),uCol:e(b.color,"#7ab8ff")})),glitter:l("glitter",c.GLITTER,(a,b)=>({uBase:e(b.color,"#c9ccd6"),uUse:f(b.useColor,1),uSize:Math.max(.6,Math.min(f(b.size,4),.3*a.stroke)),uSpark:f(b.sparkle,70)/100,uDust:f(b.dust,50)/100})),glitch:l("glitch",c.GLITCH,(a,b)=>({uPow:f(b.power,50)/100,uSplit:f(b.split,30)/100,uSlices:f(b.slices,18),uNoise:f(b.noise,20)/100})),bloom:(a,b,d,e)=>{let g=a.g.pass("bloomMask",c.BLOOM_MASK,a.W,a.H,{uSrc:b,uTh:f(d.threshold,60)/100}),h=f(d.size,30)*a.z,i=a.g.blur(g,.35*h),j=a.g.blur(g,h);a.g.release(g);let l=a.g.pass("bloom",c.BLOOM,a.W,a.H,k(a,b,e,{uB1:i,uB2:j,uInt:f(d.intensity,55)/100,uWarm:f(d.warmth,10)/100}));return a.g.release(i,j),l},lightLeak:l("lightLeak",c.LIGHT_LEAK,(a,b)=>({uC1:e(b.c1),uC2:e(b.c2),uPos:f(b.position,20)/100,uSize:f(b.size,55)/100,uSpeed:f(b.speed)})),halftone:l("halftone",c.HALFTONE,(a,b)=>({uMode:f(b.mode,1),uShape:f(b.shape),uSize:f(b.size,8),uAng:g(f(b.angle,45)),uInk:e(b.ink,"#111111"),uPaperOn:f(b.paperOn,1),uPaper:e(b.paper,"#f5f0e6")})),riso:l("riso",c.RISO,(a,b)=>({uInk1:e(b.ink1),uInk2:e(b.ink2),uPaper:e(b.paper,"#f3eee4"),uScreen:f(b.screen),uSize:f(b.size,3),uReg1:f(b.reg1,2),uReg2:f(b.reg2,6),uLoad:f(b.ink,70)/100,uWear:f(b.texture,45)/100})),dither:l("dither",c.DITHER,(a,b)=>({uDark:e(b.dark),uLight:e(b.light,"#ffffff"),uPattern:f(b.pattern,1),uSize:f(b.size,2),uCon:f(b.contrast,20)/100,uFour:f(b.levels4,1)})),screenprint:l("screenprint",c.SCREENPRINT,(a,b)=>({uC1:e(b.c1),uC2:e(b.c2),uC3:e(b.c3),uTh:f(b.threshold,50)/100,uRough:f(b.rough,40)/100,uOffset:f(b.offset,2)})),gradientMap:l("gradMap",c.GRAD_MAP,(a,b)=>({uC1:e(b.c1),uC2:e(b.c2),uC3:e(b.c3,"#ffffff"),uThree:f(b.three,1),uCon:f(b.contrast,10)/100})),posterize:l("posterize",c.POSTERIZE,(a,b)=>({uLevels:Math.max(2,f(b.levels,4)),uDither:f(b.dither),uSat:f(b.saturation,15)/100})),tiltShift:(a,b,d,e)=>{let h=a.g.blur(b,f(d.size,16)*a.z),i=a.g.pass("tilt",c.TILT,a.W,a.H,k(a,b,e,{uB:h,uPos:f(d.position,50)/100,uWidth:f(d.width,18)/100,uFeather:f(d.feather,22)/100,uAng:g(f(d.angle))}));return a.g.release(h),i},motionBlur:l("motion",c.MOTION,(a,b)=>({uDir:j(a,f(b.angle),f(b.length,30))})),zoomBlur:l("zoomBlur",c.ZOOM_BLUR,(a,b)=>({uK:f(b.amount,25)/100,uC:[f(b.cx,50)/100,f(b.cy,50)/100]})),wave:l("wave",c.WAVE,(a,b)=>({uAmp:f(b.amp,10),uLen:f(b.length,120),uAng:g(f(b.angle)),uSpeed:f(b.speed)})),ripple:l("ripple",c.RIPPLE,(a,b)=>({uAmp:f(b.amp,6),uLen:f(b.length,40),uSpeed:f(b.speed)})),twirl:l("twirl",c.TWIRL,(a,b)=>({uAng:g(f(b.angle,180)),uR:f(b.radius,60)/100})),bulge:l("bulge",c.BULGE,(a,b)=>({uK:f(b.amount,50)/100,uR:f(b.radius,70)/100})),mosaic:l("mosaic",c.MOSAIC,(a,b)=>({uShape:f(b.shape),uSize:f(b.size,12),uGap:f(b.gap)/100})),chroma:l("chroma",c.CHROMA,(a,b)=>({uPx:f(b.amount,6),uDist:f(b.distortion)/100,uRadial:f(b.radial,1)})),vhs:l("vhs",c.VHS,(a,b)=>({uPow:f(b.power,55)/100,uBleed:f(b.bleed,50)/100,uLines:f(b.lines,40)/100})),material3d:(a,b,d,h)=>{if(!a.sdf)return b;let i=a.g.blur(a.sdf,(f(d.shape)>0?2:.8)*Math.max(1,a.z)),j=f(d.spin)>0?a.t*f(d.spin)*.04:0,k=a.g.pass("mat3d",c.MAT3D,a.W,a.H,{uSrc:b,uS3:i,uZ:a.z,uDepth:Math.min(f(d.depth,40),2.6*a.stroke)*a.z,uBevel:Math.min(f(d.bevel,6),.32*a.stroke)*a.z,uRx:g(f(d.rx,18)),uRy:g(f(d.ry,-24))+j,uPersp:f(d.persp,40)/100,uMat:f(d.material),uShape:f(d.shape),uUseCol:f(d.useColor),uCol:e(d.color,"#ff5a36"),uEnv:f(d.env),uLightA:g(f(d.light,220)),uRough:f(d.rough,30)/100});if(a.g.release(i),h>=1)return k;let l=a.g.pass("mixAmt",c.MIX_AMT,a.W,a.H,{uA:b,uB:k,uK:h});return a.g.release(k),l},genFill:l("genFill",c.GENFILL,(a,b)=>({uMode:f(b.mode),uScale:f(b.scale,100)/100,uWarp:f(b.warp,50)/100,uGrain:f(b.grain,20)/100,uMix:f(b.keep)/100,uC1:e(b.c1),uC2:e(b.c2),uC3:e(b.c3),uC4:e(b.c4)})),crt:(a,b,d,e)=>{let g=a.g.blur(b,3*a.z),h=a.g.pass("crt",c.CRT,a.W,a.H,k(a,b,e,{uB:g,uScan:f(d.scan,55)/100,uMask:f(d.mask,45)/100,uCurve:f(d.curve,25)/100,uGlow:f(d.glow,35)/100,uFlick:f(d.speed)/100}));return a.g.release(g),h}};a.s(["renderFx",()=>i])},40322,63624,a=>{"use strict";function b(a,b,c,d,e){let f=function(a){if(!a||a.length>4e4||/#\s*(include|extension)/.test(a))return null;let b=a.replace(/#version[^\n]*\n/g,""),c=/mainImage\s*\(/.test(b),d=[/precision\s+(lowp|mediump|highp)\s+float/.test(b)?"":"precision highp float;",/uniform\s+float\s+u_time/.test(b)?"":"uniform float u_time;",/uniform\s+vec2\s+u_resolution/.test(b)?"":"uniform vec2 u_resolution;","uniform float u_seed;"];return c&&(d.push("#define iTime u_time","#define iResolution vec3(u_resolution, 1.0)"),b+="\nvoid main(){ vec4 c = vec4(0.0); mainImage(c, gl_FragCoord.xy); gl_FragColor = vec4(c.rgb, 1.0); }"),b=(b=b.replace(/\bout\s+vec4\s+(\w+)\s*;/g,(a,b)=>`#define ${b} gl_FragColor`)).replace(/\btexture\s*\(/g,"texture2D("),d.filter(Boolean).join("\n")+"\n"+b}(a);if(!f)return null;let g=document.createElement("canvas");g.width=b,g.height=c;let h=g.getContext("webgl",{preserveDrawingBuffer:!0});if(!h)return null;let i=(a,b)=>{let c=h.createShader(a);return h.shaderSource(c,b),h.compileShader(c),h.getShaderParameter(c,h.COMPILE_STATUS)?c:null},j=i(h.VERTEX_SHADER,"attribute vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }"),k=i(h.FRAGMENT_SHADER,f);if(!j||!k)return null;let l=h.createProgram();if(h.attachShader(l,j),h.attachShader(l,k),h.linkProgram(l),!h.getProgramParameter(l,h.LINK_STATUS))return null;h.useProgram(l);let m=h.createBuffer();h.bindBuffer(h.ARRAY_BUFFER,m),h.bufferData(h.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),h.STATIC_DRAW);let n=h.getAttribLocation(l,"p");h.enableVertexAttribArray(n),h.vertexAttribPointer(n,2,h.FLOAT,!1,0,0),h.uniform1f(h.getUniformLocation(l,"u_time"),d),h.uniform2f(h.getUniformLocation(l,"u_resolution"),b,c),h.uniform1f(h.getUniformLocation(l,"u_seed"),e),h.viewport(0,0,b,c),h.drawArrays(h.TRIANGLES,0,6);let o=h.getError(),p=document.createElement("canvas");return p.width=b,p.height=c,p.getContext("2d").drawImage(g,0,0),h.getExtension("WEBGL_lose_context")?.loseContext(),o===h.NO_ERROR?p:null}a.s(["runShader",()=>b],40322);var c=a.i(53413),d=a.i(53551),e=a.i(70911),f=a.i(47623),g=a.i(11761);let h=0,i=()=>`n${Date.now().toString(36)}${(h++).toString(36)}`,j=new Set(["testo","firma","piastra","mappa","etichette"]),k=a=>a.layers.filter(a=>!j.has(a.kind)),l=a=>a.colori?.length?a.colori:[a.tone.ink,a.tone.acc],m=a=>{let b=parseInt(a.replace("#","").slice(0,6),16);return[b>>16,b>>8&255,255&b]};function n(a){let b={...a,layers:k(a)};return{img:(0,g.flatten)(b),resto:a.layers.filter(a=>j.has(a.kind))}}let o=new WeakMap;function p(a){let b=o.get(a);if(void 0!==b)return b;let c=(0,g.newCanvas)(48,48).getContext("2d");c.drawImage(a,0,0,48,48);let d=c.getImageData(0,0,48,48).data,e=0,f=48,h=48,i=-1,j=-1;for(let a=0;a<2304;a++)if(d[4*a+3]>60){e++;let b=a%48,c=a/48|0;f=Math.min(f,b),h=Math.min(h,c),i=Math.max(i,b),j=Math.max(j,c)}let k=e?e/((i-f+1)*(j-h+1)):0;return o.set(a,k),k}let q=[{id:"ornato",label:"Ornato (ripetizione alla Day)",nature:"ripetizione",pushes:{simmetria:.4,elementi:.3,complessita:.1},available:a=>k(a).some(a=>a.scale<1.2),propose:(a,b)=>({layer:(0,c.pick)(b.r,k(a).filter(a=>a.scale<1.2)).id,sistema:(0,c.pick)(b.r,["quadrato","mezzosalto","mattone","diamante","triangolo","squame","ogiva","spolvero","fregio"]),op:(0,c.pick)(b.r,["nessuna","ribalta","gira"]),passo:(0,c.range)(b.r,.12,.3),scala:(0,c.range)(b.r,.55,.95),traliccio:(0,c.chance)(b.r,.35),colore:(0,c.pick)(b.r,l(b)),alpha:(0,c.range)(b.r,.6,1),sostituisci:(0,c.chance)(b.r,.3)}),apply:async(a,b,c)=>{let d=(0,e.tempoDi)(c),f=a.layers.find(a=>a.id===b.layer);if(!f)return a;let h=0,k=(0,g.newCanvas)(a.W,a.H),l=k.getContext("2d"),m=b.passo*a.W,n=b.scala*m,o=b.sistema,p=b.op,q=f.canvas.height/f.canvas.width,r=(Math.ceil(a.W/(b.passo*a.W))+3)*(Math.ceil(a.H/(b.passo*a.W))+3),s=(a,b,c,g)=>{let i=(0,e.finestra)(d.crescita,h++,r,.3);i<=0||(l.save(),l.translate(a,b),l.rotate(.06*Math.sin(6.283*d.fase+.7*c+1.1*g)*d.a),l.scale(i,i),"ribalta"===p&&(c+g)%2&&l.scale(-1,1),"gira"===p&&l.rotate((c+2*g)%4*Math.PI/2),("diamante"===o||"ogiva"===o)&&l.rotate(Math.PI/4*0),l.drawImage(f.canvas,-n/2,-(n*q)/2,n,n*q),l.restore())};l.globalAlpha=b.alpha;let t=Math.ceil(a.W/m)+2,u=Math.ceil(a.H/m)+2;if("fregio"===o){let b=Math.ceil(a.W/m)+1;for(let c=0;c<b;c++)s(c*m,.6*m,c,0),s(c*m+m/2,a.H-.6*m,c,1)}else{let c=7,d=()=>(c=1664525*c+0x3c6ef35f>>>0)/0x100000000;for(let a=-1;a<u;a++)for(let b=-1;b<t;b++){let c=b*m,e=a*m;"mezzosalto"===o&&b%2&&(e+=m/2),"mattone"===o&&a%2&&(c+=m/2),("diamante"===o||"triangolo"===o)&&(a%2&&(c+=m/2),e=a*m*("triangolo"===o?.866:.5)),"squame"===o&&(a%2&&(c+=m/2),e=a*m*.5),"ogiva"===o&&(a%2&&(c+=m/2),e=a*m*.6),"spolvero"===o&&(c+=(d()-.5)*m*.3,e+=(d()-.5)*m*.3,.25>d())||s(c,e,b,a)}if(b.traliccio){if(l.globalAlpha=.45,l.strokeStyle=b.colore,l.lineWidth=1.2,l.beginPath(),"diamante"===o||"squame"===o||"ogiva"===o||"triangolo"===o)for(let b=-a.H;b<a.W+a.H;b+=m)l.moveTo(b,0),l.lineTo(b-a.H,a.H),l.moveTo(b-a.H,0),l.lineTo(b,a.H);else{for(let b=0;b<a.W+m;b+=m)l.moveTo(b-m/2,0),l.lineTo(b-m/2,a.H);for(let b=0;b<a.H+m;b+=m)l.moveTo(0,b-m/2),l.lineTo(a.W,b-m/2)}l.stroke()}}let v=(0,g.fullLayer)(a,i(),"ornato",k);return b.sostituisci?{...a,layers:[...a.layers.filter(a=>a.id!==f.id&&!j.has(a.kind)).slice(0,1),v,...a.layers.filter(a=>j.has(a.kind))]}:(0,g.withLayer)(a,v)}},{id:"retino",label:"Retino",nature:"materia",pushes:{punti:.4,contrasto:.2},available:a=>k(a).length>0,propose:(a,b)=>({passo:Math.round((0,c.range)(b.r,6,16)),angolo:(0,c.pick)(b.r,[0,15,45,75]),colore:(0,c.pick)(b.r,l(b)),sostituisci:(0,c.chance)(b.r,.5),alpha:(0,c.range)(b.r,.6,1)}),apply:async(a,b,c)=>{let d=(0,e.tempoDi)(c),{img:f,resto:h}=n(a),j=f.getContext("2d").getImageData(0,0,f.width,f.height).data,k=(0,g.newCanvas)(a.W,a.H),l=k.getContext("2d"),m=b.passo,o=b.angolo*Math.PI/180;l.fillStyle=b.colore,l.translate(a.W/2,a.H/2),l.rotate(o),l.translate(-a.W,-a.H);for(let b=0;b<2*a.H;b+=m)for(let c=0;c<2*a.W;c+=m){let g=c-a.W,h=b-a.H,i=a.W/2+g*Math.cos(o)-h*Math.sin(o),k=a.H/2+g*Math.sin(o)+h*Math.cos(o);if(i<0||k<0||i>=a.W||k>=a.H)continue;let n=(Math.floor(k)*f.width+Math.floor(i))*4,p=(.3*j[n]+.59*j[n+1]+.11*j[n+2])/255,q=(0,e.finestra)(d.crescita,Math.floor(k/m),Math.ceil(a.H/m),.5),r=(1-p)*m*.62*q*(1+.12*d.a*Math.sin(6.283*d.fase+(i+k)*.01));r>.4&&(l.beginPath(),l.arc(c,b,r,0,2*Math.PI),l.fill())}let p=(0,g.fullLayer)(a,i(),"retino",k,"source-over",b.alpha);return b.sostituisci?{...a,layers:[p,...h]}:(0,g.withLayer)(a,{...p,blend:"multiply"})}},{id:"duotono",label:"Duotono",nature:"luce",pushes:{saturazione:-.2,contrasto:.2},available:a=>k(a).length>0,propose:(a,b)=>{let d=l(b);return{a:(0,c.pick)(b.r,[b.tone.bg,...d]),b:(0,c.pick)(b.r,d),soglia:(0,c.chance)(b.r,.3)}},apply:async(a,b)=>{let{img:c,resto:d}=n(a),e=c.getContext("2d"),f=e.getImageData(0,0,c.width,c.height),h=f.data,j=m(b.a),k=m(b.b);for(let a=0;a<h.length;a+=4){let c=(.3*h[a]+.59*h[a+1]+.11*h[a+2])/255;b.soglia&&(c=+(c>.5)),h[a]=j[0]*c+k[0]*(1-c),h[a+1]=j[1]*c+k[1]*(1-c),h[a+2]=j[2]*c+k[2]*(1-c),h[a+3]=255}return e.putImageData(f,0,0),{...a,layers:[(0,g.fullLayer)(a,i(),"duotono",c),...d]}}},{id:"deforma",label:"Deformazione",nature:"trasformazione",pushes:{diagonali:.1,complessita:.15},available:a=>k(a).length>0,propose:(a,b)=>({layer:(0,c.pick)(b.r,k(a)).id,modo:(0,c.pick)(b.r,["onda","scorri","torci","scala"]),forza:(0,c.range)(b.r,.02,.12),freq:(0,c.range)(b.r,2,12)}),apply:async(a,b,c)=>{(0,e.tempoDi)(c);let d=a.layers.find(a=>a.id===b.layer);if(!d)return a;let f=d.canvas.width,h=d.canvas.height,i=b.forza,j=b.freq,k=(0,g.newCanvas)(f,h),l=k.getContext("2d");if("onda"===b.modo||"scorri"===b.modo)for(let a=0;a<120;a++){let c=a*h/120,e="onda"===b.modo?Math.sin(a/120*Math.PI*j)*f*i:a%7<2?f*i*2:0;l.drawImage(d.canvas,0,c,f,h/120+1,e,c,f,h/120+1)}else if("torci"===b.modo)for(let a=0;a<90;a++){let b=a*h/90,c=1+Math.sin(a/90*Math.PI*j)*i*3;l.drawImage(d.canvas,0,b,f,h/90+1,(f-f*c)/2,b,f*c,h/90+1)}else for(let a=0;a<8;a++){let b=1-a*i;l.globalAlpha=1-.11*a,l.drawImage(d.canvas,(f-f*b)/2,(h-h*b)/2,f*b,h*b)}return(0,g.replaceLayer)(a,d.id,{canvas:k})}},{id:"caleido",label:"Caleidoscopio",nature:"ripetizione",pushes:{simmetria:.5,complessita:.2},available:a=>k(a).length>0,propose:(a,b)=>({spicchi:(0,c.pick)(b.r,[4,6,8,12]),cx:(0,c.range)(b.r,.35,.65),cy:(0,c.range)(b.r,.3,.6),sostituisci:(0,c.chance)(b.r,.4),alpha:(0,c.range)(b.r,.5,1),blend:(0,c.pick)(b.r,["source-over","screen","multiply","difference"])}),apply:async(a,b,c)=>{let d=(0,e.tempoDi)(c),{img:f,resto:h}=n(a),j=(0,g.newCanvas)(a.W,a.H),k=j.getContext("2d"),l=b.spicchi,m=2*Math.PI/l,o=Math.hypot(a.W,a.H),p=(b.cx+.04*Math.sin(6.283*d.fase)*d.a)*a.W,q=(b.cy+.04*Math.cos(6.283*d.fase)*d.a)*a.H;for(let b=0;b<Math.ceil(l*d.crescita);b++)k.save(),k.translate(a.W/2,a.H/2),k.rotate(b*m),b%2&&k.scale(1,-1),k.beginPath(),k.moveTo(0,0),k.arc(0,0,o,0,m+.01),k.closePath(),k.clip(),k.drawImage(f,-p,-q),k.restore();let r=(0,g.fullLayer)(a,i(),"caleido",j,b.blend,b.alpha);return b.sostituisci?{...a,layers:[r,...h]}:(0,g.withLayer)(a,r)}},{id:"flusso",label:"Campo di flusso",nature:"segno",pushes:{linee:.4,complessita:.25},available:()=>!0,propose:(a,b)=>({n:Math.round((0,c.range)(b.r,300,1400)),passi:Math.round((0,c.range)(b.r,20,80)),scala:(0,c.range)(b.r,.002,.012),giro:(0,c.range)(b.r,1,6),colori:l(b).slice(0,3),spessore:(0,c.range)(b.r,.6,3),alpha:(0,c.range)(b.r,.25,.8),seme:1e3*b.r()}),apply:async(a,b,c)=>{let d=(0,e.tempoDi)(c),f=(0,g.newCanvas)(a.W,a.H),h=f.getContext("2d"),j=b.scala,k=b.giro*(1+.04*d.a*Math.sin(6.283*d.fase)),l=b.seme,m=(a,b)=>(Math.sin(a*j+l)+Math.cos(b*j*1.3-l)+Math.sin((a+b)*j*.7))*k,n=Math.floor(1e6*b.seme)>>>0,o=()=>(n=1664525*n+0x3c6ef35f>>>0)/0x100000000;h.lineWidth=b.spessore,h.lineCap="round",h.globalAlpha=b.alpha;let p=b.colori;for(let c=0;c<b.n;c++){let f=o()*a.W,g=o()*a.H;h.strokeStyle=p[c%p.length],h.beginPath(),h.moveTo(f,g);let i=Math.round(b.passi*(0,e.finestra)(d.crescita,c,b.n,.7));if(!(i<1)){for(let a=0;a<i;a++){let a=m(f,g);f+=4*Math.cos(a),g+=4*Math.sin(a),h.lineTo(f,g)}h.stroke()}}return(0,g.withLayer)(a,(0,g.fullLayer)(a,i(),"flusso",f))}},{id:"tipografia",label:"Parola come immagine",nature:"parola",pushes:{contrasto:.2,orizzontali:.1},available:(a,b)=>!!b.tipoOk,propose:(a,b)=>({modo:(0,c.pick)(b.r,["gigante","tessitura","barra","colonna"]),testo:b.say().slice(0,140),face:(0,c.pick)(b.r,["condensato","espanso","grotesk","bodoni","gotico","mono"]),colore:(0,c.pick)(b.r,l(b)),barra:(0,c.pick)(b.r,[b.tone.acc,b.tone.ink,...l(b)]),y:(0,c.range)(b.r,.15,.85),blend:(0,c.pick)(b.r,["source-over","difference","multiply","overlay"])}),apply:async(a,b)=>{await (0,d.loadLabFonts)();let c=d.FACES[b.face]??d.FACES.grotesk,e=(0,g.newCanvas)(a.W,a.H),h=e.getContext("2d"),j=String(b.testo||"").trim();if(!j)return a;let k=j.split(/\s+/).sort((a,b)=>b.length-a.length)[0]??j,l=a=>(0,d.perCarattere)(c.upper?a.toUpperCase():a,c.family);switch(h.fillStyle=b.colore,h.textBaseline="middle",b.modo){case"gigante":{let d=.42*a.H;h.font=(0,f.fontCss)(c,d),h.save(),h.translate(.5*a.W,b.y*a.H),h.rotate(-Math.PI/2*(.3>Math.random())),h.textAlign="center",h.fillText(l(k),0,0),h.restore();break}case"tessitura":{let b=Math.round(.018*a.W);h.font=(0,f.fontCss)(c,b),h.globalAlpha=.55;let d=b,e=l(j)+" · ";for(;d<a.H;)h.fillText(e.repeat(6),-(7*d%200),d),d+=1.25*b;break}case"barra":{let d=Math.round(.06*a.W);h.font=(0,f.fontCss)(c,d);let e=l(j.split(/[.,;:]/)[0].slice(0,40)),g=h.measureText(e).width,i=b.y*a.H;h.fillStyle=b.barra,h.fillRect(.05*a.W,i-.7*d,g+d,1.4*d),h.fillStyle=b.colore===b.barra?"#f4f2ec":b.colore,h.fillText(e,.05*a.W+d/2,i);break}default:{let b=Math.round(.05*a.W);h.font=(0,f.fontCss)(c,b),l(j).split(/\s+/).slice(0,12).forEach((c,d)=>h.fillText(c,.08*a.W,b*(1.2+1.05*d)))}}return(0,g.withLayer)(a,{...(0,g.fullLayer)(a,i(),"tipografia",e,b.blend)})}},{id:"grafico",label:"Grafico",nature:"struttura",pushes:{verticali:.2,linee:.1},available:(a,b)=>(b.dati?.length??0)>=5,propose:(a,b)=>({tipo:(0,c.pick)(b.r,(b.dati?.length??0)>=8?["barre","punti","radiale"]:["punti","radiale"]),colore:(0,c.pick)(b.r,l(b)),x:(0,c.range)(b.r,.1,.25),y:(0,c.range)(b.r,.15,.5),w:(0,c.range)(b.r,.5,.8),h:(0,c.range)(b.r,.2,.4)}),apply:async(a,b,c)=>{let h=(c.dati??[]).slice(0,12);if(!h.length)return a;await (0,d.loadLabFonts)();let j=(0,g.newCanvas)(a.W,a.H),k=j.getContext("2d"),l=b.x*a.W,m=b.y*a.H,n=b.w*a.W,o=b.h*a.H,p=Math.max(...h.map(a=>a.v),1e-6);if(k.fillStyle=k.strokeStyle=b.colore,k.lineWidth=2,k.font=(0,f.fontCss)(d.FACES.mono,Math.round(.013*a.W)),k.textBaseline="top","radiale"===b.tipo){let a=l+n/2,b=m+o/2,c=Math.min(n,o)/2;h.forEach((d,e)=>{let f=e/h.length*Math.PI*2,g=d.v/p*c;k.beginPath(),k.moveTo(a,b),k.lineTo(a+Math.cos(f)*g,b+Math.sin(f)*g),k.stroke(),k.fillText(d.label.toUpperCase(),a+Math.cos(f)*(c+8),b+Math.sin(f)*(c+8))})}else{let a=n/h.length,d=(0,e.tempoDi)(c);h.forEach((c,f)=>{let g=c.v/p*o*(0,e.finestra)(d.crescita,f,h.length,.5)*(1+.04*d.a*Math.sin(6.283*d.fase+f));"barre"===b.tipo?k.fillRect(l+f*a+.15*a,m+o-g,.7*a,g):(k.beginPath(),k.arc(l+f*a+a/2,m+o-g,5,0,2*Math.PI),k.fill()),k.save(),k.translate(l+f*a+a/2,m+o+6),k.rotate(Math.PI/4),k.fillText(c.label.toUpperCase(),0,0),k.restore()}),k.beginPath(),k.moveTo(l,m+o),k.lineTo(l+n,m+o),k.stroke()}return(0,g.withLayer)(a,(0,g.fullLayer)(a,i(),"grafico",j))}},{id:"ombra",label:"Ombra / estrusione",nature:"struttura",pushes:{contrasto:.1,superfici:.1},available:a=>k(a).some(a=>a.scale<1.2&&p(a.canvas)>.18),propose:(a,b)=>({layer:(0,c.pick)(b.r,k(a).filter(a=>a.scale<1.2&&p(a.canvas)>.18).length?k(a).filter(a=>a.scale<1.2&&p(a.canvas)>.18):k(a)).id,passi:Math.round((0,c.range)(b.r,1,8)),dx:(0,c.range)(b.r,-.01,.01),dy:(0,c.range)(b.r,.003,.012),colore:(0,c.pick)(b.r,[b.tone.ink,"#000000",...l(b)])}),apply:async(a,b)=>{let c=a.layers.findIndex(a=>a.id===b.layer);if(c<0)return a;let d=a.layers[c],e=(0,g.newCanvas)(d.canvas.width,d.canvas.height),f=e.getContext("2d");f.drawImage(d.canvas,0,0),f.globalCompositeOperation="source-in",f.fillStyle=b.colore,f.fillRect(0,0,e.width,e.height);let h=[];for(let a=b.passi;a>=1;a--)h.push({...d,id:i(),kind:"ombra",canvas:e,x:d.x+b.dx*a,y:d.y+b.dy*a,alpha:b.passi>3?1:.6,blend:"source-over"});let j=a.layers.slice();return j.splice(c,0,...h),{...a,layers:j}}},{id:"sfasa",label:"Fuori registro",nature:"trasformazione",pushes:{complessita:.1,saturazione:.1},available:a=>k(a).length>0,propose:(a,b)=>({dx:Math.round((0,c.range)(b.r,4,22))*((0,c.chance)(b.r,.5)?1:-1),dy:Math.round((0,c.range)(b.r,-10,10))}),apply:async(a,b)=>{let{img:c,resto:d}=n(a),e=c.getContext("2d"),f=e.getImageData(0,0,c.width,c.height),h=e.createImageData(c.width,c.height),j=c.width,k=c.height,l=b.dx,m=b.dy;for(let a=0;a<k;a++)for(let b=0;b<j;b++){let c=(a*j+b)*4,d=Math.min(j-1,Math.max(0,b+l)),e=(Math.min(k-1,Math.max(0,a+m))*j+d)*4,g=Math.min(j-1,Math.max(0,b-l)),i=(Math.min(k-1,Math.max(0,a-m))*j+g)*4;h.data[c]=f.data[e],h.data[c+1]=f.data[c+1],h.data[c+2]=f.data[i+2],h.data[c+3]=255}return e.putImageData(h,0,0),{...a,layers:[(0,g.fullLayer)(a,i(),"sfasa",c),...d]}}}];a.s(["NUOVI",0,q],63624)},98413,a=>{"use strict";var b=a.i(64084),c=a.i(50565),d=a.i(17396),e=a.i(35645),f=a.i(42616),g=a.i(41655),h=a.i(41152),i=a.i(85125),j=a.i(51917),k=a.i(53551),l=a.i(47623),m=a.i(53413),n=a.i(70911),o=a.i(11761),p=a.i(40322),q=a.i(63624),r=a.i(58243);let s=0,t=()=>`l${Date.now().toString(36)}${(s++).toString(36)}`,u=(a,b)=>(0,m.pick)(b,[a.ink,a.ink,a.acc,a.bg]),v=new Set(["testo","firma","piastra","mappa","etichette"]),w=a=>{let b=a.layers.filter(a=>!v.has(a.kind));return b.length?b:a.layers},x=(a,b)=>{let c=w(a);return c[Math.floor(b()*c.length)]},y=j.FX_DEFS.filter(a=>"Testo"!==a.cat||"glitch"===a.id||"echo"===a.id);async function z(a,b){await (0,k.loadLabFonts)();let c=k.FACES[b.face]??k.FACES.grotesk,d=Math.max(8,Math.round(b.text.length>120?Math.min(b.sizePx,.03*a.W):b.text.length>60?Math.min(b.sizePx,.045*a.W):b.sizePx)),e=(0,k.perCarattere)(c.upper&&b.text.length<=40?b.text.toUpperCase():b.text,c.family),f=(0,o.newCanvas)(4,4).getContext("2d");f.font=(0,l.fontCss)(c,d);let g=function(a,b,c){let d=b.split(/\s+/).filter(Boolean),e=[],f="";for(let b of d){let d=f?f+" "+b:b;a.measureText(d).width>c&&f?(e.push(f),f=b):f=d}return f&&e.push(f),e.length?e:[""]}(f,e,a.W*(b.maxW??.8)),h=Math.max(...g.map(a=>f.measureText(a).width),10),i=(0,o.newCanvas)(h+d,g.length*d*1.15+d),j=i.getContext("2d"),m=b.align??"left";j.font=(0,l.fontCss)(c,d),j.fillStyle=b.color,j.textBaseline="top",j.textAlign=m;let n="left"===m?d/2:"right"===m?i.width-d/2:i.width/2;g.forEach((a,b)=>j.fillText(a,n,d/2+b*d*1.15));let p=Math.max(i.width,i.height)/Math.min(a.W,a.H);return(0,o.withLayer)(a,{id:t(),kind:b.kind??"testo",canvas:i,x:b.x,y:b.y,scale:p,rot:b.rot??0,alpha:1,blend:b.blend??"source-over",meta:{text:e,color:b.color,size:d}})}async function A(a,b,c,d){let e=new Set(b.layers.map(a=>a.id)),f=await a.apply(b,c,d);if(!B.has(a.id))return f;let g="retino"===a.id||"caleido"===a.id?(0,o.flatten)({...b,layers:b.layers.filter(a=>!v.has(a.kind))},.5):"ornato"===a.id?b.layers.find(a=>a.id===c.layer)?.canvas:void 0;return{...f,layers:f.layers.map(b=>e.has(b.id)?b:{...b,genera:{tool:a.id,p:c,fonte:g}})}}let B=new Set(["pattern","traccia","geometria","flusso","ornato","retino","caleido","grafico","cristallo","camera"]),C=[{id:"semina",label:"Ricetta",nature:"segno",pushes:{densita:.3,complessita:.2,elementi:.2},available:()=>!0,propose:(a,c)=>{let d=(0,m.pick)(c.r,(c.noText?b.RECIPES.filter(a=>!a.params.some(a=>"text"===a.type)):b.RECIPES).filter(a=>!b.RIPOSO.has(a.id))),e=Math.floor(1e9*c.r());return{recipe:d.id,seed:e,values:(0,b.shuffle)(d,(0,b.defaults)(d),e),piece:!c.noText&&(d.piece||(0,m.chance)(c.r,a.layers.length?.7:.3)),x:(0,m.range)(c.r,.2,.8),y:(0,m.range)(c.r,.2,.8),scale:(0,m.range)(c.r,.35,1.1),rot:(0,m.chance)(c.r,.3)?(0,m.range)(c.r,-.6,.6):0,blend:(0,m.chance)(c.r,.25)?(0,m.pick)(c.r,["multiply","screen","difference","overlay"]):"source-over"}},apply:async(a,c,d)=>{let e=b.RECIPES.find(a=>a.id===c.recipe);if(!e)return a;let f={...c.values};for(let a of e.params)"text"===a.type&&(f[a.key]=d.say());await (0,k.loadLabFonts)();let g=(0,b.runRecipe)(e,f,c.seed,c.piece?"pezzo":"4:5",d.quality);return c.piece?(0,o.withLayer)(a,{id:t(),kind:"ricetta",canvas:(0,o.sfuma)(g,.14),x:c.x,y:c.y,scale:c.scale,rot:c.rot,alpha:1,blend:c.blend}):(0,o.withLayer)(a,(0,o.fullLayer)(a,t(),"ricetta",g,c.blend))}},{id:"materia",label:"Effetto",nature:"materia",pushes:{complessita:.2,bordi:.1,saturazione:.1},available:a=>a.layers.length>0,propose:(a,b)=>{let c=(0,m.pick)(b.r,y),d=c.variants.length?(0,m.pick)(b.r,c.variants).id:void 0;return{layer:x(a,b.r).id,fx:c.id,variant:d,amount:Math.round((0,m.range)(b.r,50,100))}},apply:async(a,b)=>{let c=a.layers.find(a=>a.id===b.layer);if(!c)return a;let d={...(0,j.newFx)(b.fx,b.variant),amount:b.amount},e=(0,o.newCanvas)(c.canvas.width,c.canvas.height);return(0,i.renderFx)(c.canvas,e,{fx:[d]},1,0)?(0,o.replaceLayer)(a,c.id,{canvas:e}):a}},{id:"luce",label:"Look",nature:"luce",pushes:{saturazione:.1,contrasto:.1},available:a=>a.layers.length>0,propose:(a,b)=>({layer:x(a,b.r).id,look:(0,m.pick)(b.r,j.LOOKS).id,amount:Math.round((0,m.range)(b.r,40,100))}),apply:async(a,b)=>{let c=a.layers.find(a=>a.id===b.layer);if(!c)return a;let d=(0,o.newCanvas)(c.canvas.width,c.canvas.height);return(0,i.renderFx)(c.canvas,d,{look:{id:b.look,amount:b.amount}},1,0)?(0,o.replaceLayer)(a,c.id,{canvas:d}):a}},{id:"geometria",label:"Forma geometrica",nature:"struttura",pushes:{superfici:.3,simmetria:.1,bordi:.1},available:()=>!0,propose:(a,b)=>({shape:(0,m.pick)(b.r,["cerchio","cerchio","arco","linea","rettangolo","croce"]),x:(0,m.pick)(b.r,[1/3,.5,2/3]),y:(0,m.pick)(b.r,[1/3,.5,2/3]),size:(0,m.range)(b.r,.1,.38),rot:(0,m.pick)(b.r,[0,0,Math.PI/2,Math.PI/4]),fill:!1,stroke:(0,m.range)(b.r,1,3.5),color:u(b.tone,b.r),alpha:(0,m.range)(b.r,.6,1),blend:(0,m.chance)(b.r,.2)?"difference":"source-over"}),apply:async(a,b,c)=>{let d=(0,n.tempoDi)(c),e=(0,o.newCanvas)(1024,1024),f=e.getContext("2d");f.translate(512,512);let g=1+.03*Math.sin(6.283*d.fase);f.scale(g,g);let h=Math.min(1,d.crescita/.7),i=Math.max(0,(d.crescita-.6)/.4);f.fillStyle=f.strokeStyle=b.color,f.lineWidth=3*b.stroke,f.lineCap="butt";switch(f.beginPath(),b.shape){case"cerchio":f.arc(0,0,460.8,0,2*Math.PI);break;case"rettangolo":f.rect(-460.8,-285.696,921.6,571.392);break;case"linea":f.moveTo(-460.8,0),f.lineTo(460.8,0);break;case"triangolo":f.moveTo(0,-460.8),f.lineTo(400.896,230.4),f.lineTo(-400.896,230.4),f.closePath();break;case"arco":f.arc(0,0,460.8,.1*Math.PI,1.2*Math.PI);break;case"croce":f.moveTo(-460.8,0),f.lineTo(460.8,0),f.moveTo(0,-460.8),f.lineTo(0,460.8)}let j=b.fill&&"linea"!==b.shape&&"arco"!==b.shape&&"croce"!==b.shape;if(h<1||j&&i<1){let a=3686.4;f.save(),f.setLineDash([a*h,a]),f.lineWidth=Math.max(4,3*b.stroke),f.stroke(),f.restore(),j&&i>0&&(f.globalAlpha=i,f.fill())}else j?f.fill():f.stroke();return(0,o.withLayer)(a,{id:t(),kind:"geometria",canvas:e,x:b.x,y:b.y,scale:b.size,rot:b.rot,alpha:b.alpha,blend:b.blend})}},{id:"pattern",label:"Pattern",nature:"ripetizione",pushes:{complessita:.2,simmetria:.2,densita:.15},available:()=>!0,propose:(a,b)=>({kind:(0,m.pick)(b.r,["righe","punti","griglia","onde","tratteggio","scacchi"]),step:(0,m.range)(b.r,10,60),angle:(0,m.range)(b.r,0,Math.PI),weight:(0,m.range)(b.r,1,8),color:u(b.tone,b.r),alpha:(0,m.range)(b.r,.25,.9),region:(0,m.chance)(b.r,.5)?"tutto":(0,m.pick)(b.r,["sinistra","destra","alto","basso","centro"]),blend:(0,m.chance)(b.r,.3)?"multiply":"source-over"}),apply:async(a,b,c)=>{let d=(0,n.tempoDi)(c),e=(0,o.newCanvas)(a.W,a.H),f=e.getContext("2d");f.save();let g=b.region;"destra"===g&&a.W,"basso"===g&&a.H,a.W,a.H,f.translate(a.W/2,a.H/2),f.rotate(b.angle),f.translate(-a.W,-a.H),f.fillStyle=f.strokeStyle=b.color,f.lineWidth=b.weight;let h=b.step,i=2*Math.max(a.W,a.H),j=d.fase%1*h,k=Math.ceil(i/h);f.translate(0,j);let l=a=>(0,n.finestra)(d.crescita,a,k,.6);switch(b.kind){case"righe":for(let a=0,b=0;a<i;a+=h,b++){let c=l(b);c<=0||(f.beginPath(),f.moveTo(0,a),f.lineTo(i*c,a),f.stroke())}break;case"punti":for(let a=0,c=0;a<i;a+=h,c++){let e=l(c);if(!(e<=0))for(let c=0;c<i*e;c+=h)f.beginPath(),f.arc(c+a/h%2*h/2,a,1.2*b.weight*(1+.15*d.a*Math.sin(6.283*d.fase+.01*c)),0,2*Math.PI),f.fill()}break;case"griglia":for(let a=0,b=0;a<i;a+=h,b++){let c=l(b);c<=0||(f.beginPath(),f.moveTo(0,a),f.lineTo(i*c,a),f.moveTo(a,0),f.lineTo(a,i*c),f.stroke())}break;case"onde":for(let a=0,b=0;a<i;a+=h,b++){let c=l(b);if(!(c<=0)){f.beginPath();for(let b=0;b<=i*c;b+=8)f.lineTo(b,a+Math.sin(b/h+6.283*d.fase)*h*.35);f.stroke()}}break;case"tratteggio":for(let a=-i,b=0;a<i;a+=h,b++){let c=(0,n.finestra)(d.crescita,b,Math.ceil(2*i/h),.6);c<=0||(f.beginPath(),f.moveTo(a,0),f.lineTo(a+i*c,i*c),f.stroke(),f.beginPath(),f.moveTo(a+i,0),f.lineTo(a+i-i*c,i*c),f.stroke())}break;case"scacchi":for(let a=0,b=0;a<i;a+=h,b++){let c=l(b);if(!(c<=0))for(let b=0;b<i*c;b+=h)(b+a)/h%2==0&&f.fillRect(b,a,h,h)}}if(f.restore(),"tutto"!==g){f.globalCompositeOperation="destination-in";let b="alto"===g?f.createLinearGradient(0,0,0,a.H):"basso"===g?f.createLinearGradient(0,a.H,0,0):"sinistra"===g?f.createLinearGradient(0,0,a.W,0):"destra"===g?f.createLinearGradient(a.W,0,0,0):null;if(b)b.addColorStop(0,"rgba(0,0,0,1)"),b.addColorStop(.35,"rgba(0,0,0,1)"),b.addColorStop(.65,"rgba(0,0,0,0)"),b.addColorStop(1,"rgba(0,0,0,0)"),f.fillStyle=b;else{let b=f.createRadialGradient(a.W/2,a.H/2,0,a.W/2,a.H/2,.5*a.H);b.addColorStop(0,"rgba(0,0,0,1)"),b.addColorStop(.6,"rgba(0,0,0,1)"),b.addColorStop(1,"rgba(0,0,0,0)"),f.fillStyle=b}f.fillRect(0,0,a.W,a.H)}return(0,o.withLayer)(a,(0,o.fullLayer)(a,t(),"pattern",e,b.blend,b.alpha))}},{id:"traccia",label:"Pennello",nature:"segno",pushes:{linee:.3,diagonali:.1,bordi:.1},available:()=>!0,propose:(a,b)=>({strokes:Array.from({length:(0,m.chance)(b.r,.75)?1:2},()=>{let a=[],c=(0,m.range)(b.r,.05,.95),d=(0,m.range)(b.r,.05,.95),e=(0,m.range)(b.r,0,2*Math.PI),f=Math.floor((0,m.range)(b.r,25,60)),g=(0,m.range)(b.r,0,.22);for(let h=0;h<f;h++)a.push([c,d]),e+=(b.r()-.5)*g,c+=.025*Math.cos(e),d+=.025*Math.sin(e);return a}),width:(0,m.range)(b.r,1.2,6),taper:!0,color:u(b.tone,b.r),alpha:(0,m.range)(b.r,.6,1),dry:(0,m.chance)(b.r,.35)}),apply:async(a,b,c)=>{let d=(0,n.tempoDi)(c),e=(0,o.newCanvas)(a.W,a.H),f=e.getContext("2d");f.fillStyle=b.color;let g=9,h=()=>(g=1664525*g+0x3c6ef35f>>>0)/0x100000000,i=b.strokes;for(let[c,e]of i.entries()){let g=(0,n.finestra)(d.crescita,c,i.length,.5);if(g<=0)continue;let j=e.slice(0,Math.max(2,Math.ceil(e.length*g))).map(([a,b],e)=>[a+.002*Math.sin(6.283*d.fase+.9*e+c)*d.a,b+.002*Math.cos(6.283*d.fase+1.3*e+c)*d.a]);for(let c=0;c<j.length;c++){let d=c/Math.max(1,j.length-1),e=b.width*(b.taper?.9*Math.sin(Math.PI*d)+.1:1),[g,i]=j[c],[k,l]=j[Math.min(j.length-1,c+1)];for(let c=0;c<6;c++){let d=(g+(k-g)*c/6)*a.W,j=(i+(l-i)*c/6)*a.H;b.dry&&.3>h()||(f.beginPath(),f.arc(d,j,Math.max(.5,e/2),0,2*Math.PI),f.fill())}}}return(0,o.withLayer)(a,(0,o.fullLayer)(a,t(),"traccia",e,"source-over",b.alpha))}},{id:"scrivi",label:"Testo",nature:"parola",pushes:{orizzontali:.2,bordi:.15,linee:.1},available:(a,b)=>!b.noText&&"silenzio"!==b.intention.register,propose:(a,b)=>({text:b.say(),face:(0,m.pick)(b.r,Object.keys(k.FACES)),size:(0,m.range)(b.r,.03,.18),x:(0,m.range)(b.r,.1,.9),y:(0,m.range)(b.r,.1,.9),rot:(0,m.chance)(b.r,.25)?(0,m.range)(b.r,-Math.PI/2,Math.PI/2):0,color:u(b.tone,b.r),align:(0,m.pick)(b.r,["left","center","right"]),blend:(0,m.chance)(b.r,.2)?"difference":"source-over"}),apply:async(a,b)=>z(a,{text:String(b.text),face:b.face,sizePx:Math.round(b.size*Math.min(a.W,a.H)),color:b.color,x:b.x,y:b.y,rot:b.rot,align:b.align,blend:b.blend})},{id:"grana",label:"Grana",nature:"materia",pushes:{complessita:.25,entropia:.1},available:()=>!0,propose:(a,b)=>({amount:(0,m.range)(b.r,.05,.4),size:Math.floor((0,m.range)(b.r,1,4)),seed:Math.floor(1e9*b.r()),blend:(0,m.pick)(b.r,["overlay","multiply","screen","soft-light"])}),apply:async(a,b)=>{let c=b.size,d=Math.ceil(a.W/c),e=Math.ceil(a.H/c),f=(0,o.newCanvas)(d,e),g=f.getContext("2d"),h=g.createImageData(d,e),i=b.seed>>>0;for(let a=0;a<d*e;a++){let c=(i=1664525*i+0x3c6ef35f>>>0)/0x100000000*255;h.data[4*a]=h.data[4*a+1]=h.data[4*a+2]=c,h.data[4*a+3]=255*b.amount}g.putImageData(h,0,0);let j=(0,o.newCanvas)(a.W,a.H),k=j.getContext("2d");return k.imageSmoothingEnabled=!1,k.drawImage(f,0,0,a.W,a.H),(0,o.withLayer)(a,(0,o.fullLayer)(a,t(),"grana",j,b.blend))}},{id:"taglia",label:"Taglio",nature:"vuoto",pushes:{vuoto:.3,densita:-.2,bordi:.1},available:a=>a.layers.length>0,propose:(a,b)=>({layer:(0,m.chance)(b.r,.5)?"tutti":x(a,b.r).id,shape:(0,m.pick)(b.r,["rettangolo","cerchio","fascia","strappo"]),x:(0,m.range)(b.r,.1,.9),y:(0,m.range)(b.r,.1,.9),size:(0,m.range)(b.r,.1,.5),rot:(0,m.range)(b.r,0,Math.PI),seed:Math.floor(1e9*b.r())}),apply:async(a,b)=>({...a,layers:a.layers.map(c=>("tutti"!==b.layer||v.has(c.kind))&&c.id!==b.layer?c:(c=>{let d=(0,o.newCanvas)(c.canvas.width,c.canvas.height),e=d.getContext("2d");e.drawImage(c.canvas,0,0),e.globalCompositeOperation="destination-out";let f=Math.min(a.W,a.H)*c.scale,g=Math.max(c.canvas.width,c.canvas.height)/f,h=(b.x-c.x)*a.W,i=(b.y-c.y)*a.H,j=c.canvas.width/2+(h*Math.cos(-c.rot)-i*Math.sin(-c.rot))*g,k=c.canvas.height/2+(h*Math.sin(-c.rot)+i*Math.cos(-c.rot))*g,l=b.size*Math.min(a.W,a.H)*g;if(e.translate(j,k),e.rotate(b.rot),e.beginPath(),"cerchio"===b.shape)e.arc(0,0,l,0,2*Math.PI);else if("fascia"===b.shape)e.rect(-(4*l),-(.15*l),8*l,.3*l);else if("strappo"===b.shape){let a=b.seed>>>0;e.moveTo(-l,-l);for(let b=0;b<=20;b++)a=1664525*a+0x3c6ef35f>>>0,e.lineTo(-l+b*l/10,-(.2*l)+a/0x100000000*l*.4);e.lineTo(l,l),e.lineTo(-l,l),e.closePath()}else e.rect(-l,-(.7*l),2*l,1.4*l);return e.fill(),{...c,canvas:d}})(c))})},{id:"ripeti",label:"Ripetizione",nature:"ripetizione",pushes:{elementi:.2,simmetria:.1,densita:.15},available:a=>a.layers.some(a=>"grana"!==a.kind&&"pattern"!==a.kind&&!v.has(a.kind)),propose:(a,b)=>{let c=a.layers.filter(a=>"grana"!==a.kind&&"pattern"!==a.kind&&!v.has(a.kind));return{layer:(0,m.pick)(b.r,c).id,n:Math.floor((0,m.range)(b.r,2,7)),dx:(0,m.range)(b.r,-.2,.2),dy:(0,m.range)(b.r,-.2,.2),dscale:(0,m.range)(b.r,.75,1.15),drot:(0,m.chance)(b.r,.4)?(0,m.range)(b.r,-.5,.5):0,fade:(0,m.chance)(b.r,.5)}},apply:async(a,b)=>{let c=a.layers.find(a=>a.id===b.layer);if(!c)return a;let d=a;for(let a=1;a<=b.n;a++)d=(0,o.withLayer)(d,{...c,id:t(),x:c.x+b.dx*a,y:c.y+b.dy*a,scale:c.scale*Math.pow(b.dscale,a),rot:c.rot+b.drot*a,alpha:b.fade?c.alpha*Math.pow(.7,a):c.alpha});return d}},{id:"disponi",label:"Disposizione",nature:"trasformazione",pushes:{squilibrio:.1,terzi:.1},available:a=>a.layers.length>0,propose:(a,b)=>{let c=x(a,b.r),d=(0,m.pick)(b.r,["sposta","scala","ruota","specchia","fondi","terzi","centra","bordo"]);return{layer:c.id,mode:d,dx:(0,m.range)(b.r,-.25,.25),dy:(0,m.range)(b.r,-.25,.25),k:(0,m.range)(b.r,.6,1.6),drot:(0,m.range)(b.r,-.8,.8),blend:(0,m.pick)(b.r,["source-over","multiply","screen","difference","overlay","exclusion","color-dodge"]),tx:(0,m.pick)(b.r,[1/3,2/3]),ty:(0,m.pick)(b.r,[1/3,2/3]),edge:(0,m.pick)(b.r,["l","r","t","b"])}},apply:async(a,b)=>{let c=a.layers.find(a=>a.id===b.layer);if(!c)return a;switch(b.mode){case"sposta":return(0,o.replaceLayer)(a,c.id,{x:c.x+b.dx,y:c.y+b.dy});case"scala":return(0,o.replaceLayer)(a,c.id,{scale:c.scale*b.k});case"ruota":return(0,o.replaceLayer)(a,c.id,{rot:c.rot+b.drot});case"specchia":return(0,o.replaceLayer)(a,c.id,{flipX:!c.flipX});case"fondi":return(0,o.replaceLayer)(a,c.id,{blend:b.blend});case"terzi":return(0,o.replaceLayer)(a,c.id,{x:b.tx,y:b.ty});case"centra":return(0,o.replaceLayer)(a,c.id,{x:.5,y:.5});case"bordo":{let d=b.edge;return(0,o.replaceLayer)(a,c.id,"l"===d?{x:.05}:"r"===d?{x:.95}:"t"===d?{y:.05}:{y:.95})}}return a}},{id:"togli",label:"Togliere",nature:"vuoto",pushes:{vuoto:.2,densita:-.3,complessita:-.2},available:a=>w(a).filter(a=>"motivo"!==a.kind).length>1,propose:(a,b)=>{let c=w(a).filter(a=>"motivo"!==a.kind);return{layer:c[Math.floor(b.r()*c.length)].id}},apply:async(a,b)=>({...a,layers:a.layers.filter(a=>a.id!==b.layer)})},{id:"fondo",label:"Fondo",nature:"luce",pushes:{luminosita:.2},available:()=>!0,propose:(a,c)=>({tone:(0,m.pick)(c.r,b.TONES).id,use:(0,m.pick)(c.r,["bg","bg","ink","acc"])}),apply:async(a,c)=>{let d=b.TONES.find(a=>a.id===c.tone)??b.TONES[0];return{...a,bg:"ink"===c.use?d.ink:"acc"===c.use?d.acc:d.bg}}},{id:"shader",label:"Shader raccolto",nature:"materia",pushes:{complessita:.3,saturazione:.1},available:(a,b)=>b.shaders.some(a=>a.code),propose:(a,b)=>{let c=b.shaders.filter(a=>a.code);return{source:(0,m.pick)(b.r,c).id,time:(0,m.range)(b.r,0,60),seed:b.r(),blend:(0,m.pick)(b.r,["source-over","multiply","screen","overlay","difference"]),alpha:(0,m.range)(b.r,.4,1)}},apply:async(a,b,c)=>{let d=c.shaders.find(a=>a.id===b.source);if(!d?.code)return a;let e=(0,p.runShader)(d.code,Math.round(a.W/2),Math.round(a.H/2),b.time,b.seed);if(!e)return a;let f=(0,o.newCanvas)(a.W,a.H);return f.getContext("2d").drawImage(e,0,0,a.W,a.H),(0,o.withLayer)(a,(0,o.fullLayer)(a,t(),"shader",f,b.blend,b.alpha))}},{id:"schiaccia",label:"Unire i livelli",nature:"trasformazione",pushes:{},available:a=>a.layers.length>4,propose:()=>({}),apply:async a=>{let b=(0,o.flatten)(a);return{...a,layers:[(0,o.fullLayer)(a,t(),"unito",b)]}}},...q.NUOVI,...r.MONDI,c.acqua,d.filtro,e.luce3d,f.vetroTool,g.stiroTool,h.particelleTool,h.sciameTool];a.s(["ANIMABILI",0,B,"TOOLS",0,C,"applica",()=>A,"textLayer",()=>z,"toolById",0,a=>C.find(b=>b.id===a)])}];

//# sourceMappingURL=src_6aa29969._.js.map