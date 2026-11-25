(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,78832,e=>{"use strict";let t=class{applyTo(){}},i=(...e)=>{};function o(e,t=0,i=255){return Math.min(i,Math.max(t,e))}let r=`
  vec3 mod289_sn(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
  vec2 mod289_sn(vec2 x){return x-floor(x*(1.0/289.0))*289.0;}
  vec3 permute_sn(vec3 x){return mod289_sn(((x*34.0)+1.0)*x);}
  float snoise(vec2 v){
    const vec4 C=vec4(0.211324865405187,0.366025403784439,-0.577350269189626,0.024390243902439);
    vec2 i=floor(v+dot(v,C.yy));
    vec2 x0=v-i+dot(i,C.xx);
    vec2 i1=(x0.x>x0.y)?vec2(1.0,0.0):vec2(0.0,1.0);
    vec4 x12=x0.xyxy+C.xxzz;
    x12.xy-=i1;
    i=mod289_sn(i);
    vec3 p=permute_sn(permute_sn(i.y+vec3(0.0,i1.y,1.0))+i.x+vec3(0.0,i1.x,1.0));
    vec3 m=max(0.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.0);
    m=m*m;m=m*m;
    vec3 xv=2.0*fract(p*C.www)-1.0;
    vec3 h=abs(xv)-0.5;
    vec3 ox=floor(xv+0.5);
    vec3 a0=xv-ox;
    m*=1.79284291400159-0.85373472095314*(a0*a0+h*h);
    vec3 g;
    g.x=a0.x*x0.x+h.x*x0.y;
    g.yz=a0.yz*x12.xz+h.yz*x12.yw;
    return 130.0*dot(m,g);
  }
`,u=`
  float hashf(float n){return fract(sin(n)*43758.5453);}
  float vnoise(vec2 p){
    vec2 i=floor(p);vec2 f=fract(p);
    f=f*f*(3.0-2.0*f);
    float a=hashf(i.x+i.y*57.0);
    float b=hashf(i.x+1.0+i.y*57.0);
    float c=hashf(i.x+(i.y+1.0)*57.0);
    float d=hashf(i.x+1.0+(i.y+1.0)*57.0);
    return mix(mix(a,b,f.x),mix(c,d,f.x),f.y);
  }
`,a=`
  float gnoise(vec2 co){
    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
  }
`;class n extends t{static type="ThermalFilter";static uniformLocations=["uIntensity","uShift","uHaze","uThreshold","uTime"];uIntensity=1;uShift=0;uHaze=.6;uThreshold=1;uTime=0;constructor(e){super(),e?.uIntensity!==void 0&&(this.uIntensity=e.uIntensity),e?.uShift!==void 0&&(this.uShift=e.uShift),e?.uHaze!==void 0&&(this.uHaze=e.uHaze),e?.uThreshold!==void 0&&(this.uThreshold=e.uThreshold),e?.uTime!==void 0&&(this.uTime=e.uTime)}getFragmentSource(){return`
      precision highp float;
      varying vec2 vTexCoord;
      uniform sampler2D uTexture;
      uniform float uIntensity, uShift, uHaze, uThreshold, uTime;

      vec3 thermal_ramp(float t) {
          t = clamp(t, 0.0, 1.0);
          vec3 col = mix(vec3(0.0, 0.0, 0.2), vec3(0.0, 0.0, 1.0), smoothstep(0.0, 0.15, t));
          col = mix(col, vec3(0.0, 1.0, 1.0), smoothstep(0.15, 0.35, t));
          col = mix(col, vec3(0.0, 1.0, 0.0), smoothstep(0.35, 0.55, t));
          col = mix(col, vec3(1.0, 1.0, 0.0), smoothstep(0.55, 0.70, t));
          col = mix(col, vec3(1.0, 0.3, 0.0), smoothstep(0.70, 0.85, t));
          col = mix(col, vec3(1.0, 1.0, 1.0), smoothstep(0.85, 1.0, t));
          return col;
      }

      void main(){
        vec2 uv = vTexCoord;
        vec4 sampleColor = texture2D(uTexture, uv);
        float luma_ref = dot(sampleColor.rgb, vec3(0.299, 0.587, 0.114));
        
        float shimmer = sin(uv.x * 25.0 + uTime * 6.0) * 0.004 * uHaze * luma_ref;
        vec2 distortedUV = uv + vec2(0.0, shimmer);
        
        vec4 color = texture2D(uTexture, distortedUV);
        if (color.a < 0.01) discard;

        float luma = clamp((dot(color.rgb, vec3(0.299, 0.587, 0.114)) + uShift) * uThreshold, 0.0, 1.0);
        vec3 therm = thermal_ramp(luma);

        vec3 result = mix(color.rgb, therm, uIntensity);
        float glow = smoothstep(0.88, 1.0, luma) * 0.25 * uIntensity;
        result += vec3(glow);

        gl_FragColor = vec4(result * color.a, color.a);
      }
    `}sendUniformData(e,t){e.uniform1f(t.uIntensity,this.uIntensity),e.uniform1f(t.uShift,this.uShift),e.uniform1f(t.uHaze,this.uHaze),e.uniform1f(t.uThreshold,this.uThreshold),e.uniform1f(t.uTime,this.uTime)}applyTo2d({imageData:e}){let{data:t}=e,i=[[0,0,51],[0,0,255],[0,255,255],[0,230,0],[255,255,0],[255,51,0],[255,255,255]],o=[0,.15,.35,.55,.7,.85,1];for(let e=0;e<t.length;e+=4){let r=Math.min(1,Math.max(0,(.299*t[e]+.587*t[e+1]+.114*t[e+2])/255+this.uShift)),u=0;for(;u<o.length-2&&r>o[u+1];)u++;let a=(r-o[u])/(o[u+1]-o[u]),[n,s,l]=i[u],[c,f,h]=i[u+1],v=n+(c-n)*a,m=s+(f-s)*a,d=l+(h-l)*a;t[e]=t[e]*(1-this.uIntensity)+v*this.uIntensity,t[e+1]=t[e+1]*(1-this.uIntensity)+m*this.uIntensity,t[e+2]=t[e+2]*(1-this.uIntensity)+d*this.uIntensity}}}i(n,"ThermalFilter");class s extends t{static type="PrismFilter";static uniformLocations=["uDispersion","uDistortion","uRadius"];uDispersion=.5;uDistortion=.4;uRadius=1;constructor(e){super(),e?.uDispersion!==void 0&&(this.uDispersion=e.uDispersion),e?.uDistortion!==void 0&&(this.uDistortion=e.uDistortion),e?.uRadius!==void 0&&(this.uRadius=e.uRadius)}getFragmentSource(){return`
      precision highp float;
      varying vec2 vTexCoord;
      uniform sampler2D uTexture;
      uniform float uDispersion, uDistortion, uRadius;

      void main(){
        vec2 uv = vTexCoord;
        vec2 dir = uv - 0.5;
        float d = length(dir);
        
        vec2 distortedUV = uv + dir * (d * d) * uDistortion * uRadius;
        
        vec3 result = vec3(0.0);
        float totalWeight = 0.0;
        vec2 aberr = dir * uDispersion * 0.06;
        
        for(float i=0.0; i<5.0; i++) {
            float offset = (i / 4.0) - 0.5;
            vec4 s = texture2D(uTexture, clamp(distortedUV + aberr * offset, 0.001, 0.999));
            vec3 tint = vec3(
                max(0.0, 1.0 - abs(offset - 0.5) * 4.0), 
                max(0.0, 1.0 - abs(offset - 0.0) * 4.0), 
                max(0.0, 1.0 - abs(offset + 0.5) * 4.0)
            );
            result += s.rgb * tint;
            totalWeight += (tint.r + tint.g + tint.b) / 3.0;
        }
        
        result /= (totalWeight * 0.9);
        float fresnel = pow(d * 1.6, 5.0) * 0.15 * uDispersion;
        result += vec3(fresnel);

        vec4 orig = texture2D(uTexture, uv);
        gl_FragColor = vec4(clamp(result, 0.0, 1.0) * orig.a, orig.a);
      }
    `}sendUniformData(e,t){e.uniform1f(t.uDispersion,this.uDispersion),e.uniform1f(t.uDistortion,this.uDistortion),e.uniform1f(t.uRadius,this.uRadius)}applyTo2d({imageData:e}){let{data:t,width:i,height:o}=e,r=new Uint8ClampedArray(t),u=Math.round(10*this.uDispersion);for(let e=0;e<o;e++)for(let o=0;o<i;o++){let a=(e*i+o)*4,n=(e*i+Math.max(0,o-u))*4,s=(e*i+Math.min(i-1,o+u))*4;t[a]=r[n],t[a+2]=r[s]}}}i(s,"PrismFilter");class l extends t{static type="NeonGlow";static uniformLocations=["uIntensity","uGlowRange","uFlicker","uTime","uGlowTint"];uIntensity=.8;uGlowRange=1.5;uFlicker=.4;uTime=0;uGlowTint=[0,255,255];constructor(e){super(),e?.uIntensity!==void 0&&(this.uIntensity=e.uIntensity),e?.uGlowRange!==void 0&&(this.uGlowRange=e.uGlowRange),e?.uFlicker!==void 0&&(this.uFlicker=e.uFlicker),e?.uTime!==void 0&&(this.uTime=e.uTime),e?.uGlowTint!==void 0&&(this.uGlowTint=e.uGlowTint)}getFragmentSource(){return`
      precision highp float;
      varying vec2 vTexCoord;
      uniform sampler2D uTexture;
      uniform float uIntensity, uGlowRange, uFlicker, uTime;
      uniform vec3 uGlowTint;

      void main(){
        vec2 uv = vTexCoord;
        vec4 color = texture2D(uTexture, uv);
        
        vec3 glow = vec3(0.0);
        float noise = fract(sin(dot(uv, vec2(12.989, 78.233))) * 43758.5453 + uTime);
        
        float r = uGlowRange * 0.015;
        for(int i=0; i<8; i++){
          float angle = float(i) * 0.785398 + noise;
          vec2 off = vec2(cos(angle), sin(angle)) * r;
          vec4 s = texture2D(uTexture, clamp(uv + off, 0.0, 1.0));
          float d = length(off) * 60.0;
          float decay = 1.0 / (1.0 + d * d);
          float b = dot(s.rgb, vec3(0.299, 0.587, 0.114));
          glow += s.rgb * s.a * decay * smoothstep(0.1, 0.9, b);
        }
        glow /= 8.0;

        float hum = 1.0 + sin(uTime * 25.0 * uFlicker) * 0.04 * uFlicker;
        vec3 tint = uGlowTint / 255.0;
        vec3 spectralGlow = mix(tint, vec3(1.0, 1.0, 1.0), 0.2); 
        vec3 finalGlow = glow * spectralGlow * uIntensity * 12.0 * hum;
        vec3 core = color.rgb * (1.0 + uIntensity * 0.6);
        vec3 result = core + finalGlow;

        gl_FragColor = vec4(clamp(result, 0.0, 1.0) * color.a, color.a);
      }
    `}sendUniformData(e,t){e.uniform1f(t.uIntensity,this.uIntensity),e.uniform1f(t.uGlowRange,this.uGlowRange),e.uniform1f(t.uFlicker,this.uFlicker),e.uniform1f(t.uTime,this.uTime),e.uniform3fv(t.uGlowTint,new Float32Array(this.uGlowTint.map(e=>e/255)))}applyTo2d({imageData:e}){let{data:t}=e,i=60*this.uIntensity;for(let e=0;e<t.length;e+=4){let o=(.299*t[e]+.587*t[e+1]+.114*t[e+2])/255;t[e]=Math.min(255,t[e]+i*(1-o)),t[e+1]=Math.min(255,t[e+1]+i*(1-o)),t[e+2]=Math.min(255,t[e+2]+i*(1-o))}}}i(l,"NeonGlow");class c extends t{static type="Holographic";static uniformLocations=["uThickness","uIridescence","uGlow","uTime","uScanlineSpeed","uBaseTint"];uThickness=1.5;uIridescence=.6;uGlow=.5;uTime=0;uScanlineSpeed=1;uBaseTint=[150,220,255];constructor(e){super(),e?.uThickness!==void 0&&(this.uThickness=e.uThickness),e?.uIridescence!==void 0&&(this.uIridescence=e.uIridescence),e?.uGlow!==void 0&&(this.uGlow=e.uGlow),e?.uTime!==void 0&&(this.uTime=e.uTime),e?.uScanlineSpeed!==void 0&&(this.uScanlineSpeed=e.uScanlineSpeed),e?.uBaseTint!==void 0&&(this.uBaseTint=e.uBaseTint)}getFragmentSource(){return`
      precision highp float;
      varying vec2 vTexCoord;
      uniform sampler2D uTexture;
      uniform float uThickness, uIridescence, uGlow, uTime, uScanlineSpeed;
      uniform vec3 uBaseTint;

      vec3 irid_spectra(float delta) {
          vec3 col = vec3(0.5) + 0.5 * cos(6.28318 * (vec3(1.0, 0.66, 0.33) + delta));
          return clamp(col, 0.0, 1.0);
      }

      void main(){
        vec2 uv = vTexCoord;
        vec4 color = texture2D(uTexture, uv);
        if (color.a < 0.01) discard;

        vec2 dist = uv - 0.5;
        float l = length(dist);
        float fresnel = pow(l * 1.8, 3.5) * uGlow;
        
        float noise = fract(sin(dot(uv, vec2(12.9898, 78.233))) * 43758.5453);
        float phase = l * uThickness + noise * 0.06 + uTime * 0.12;
        vec3 irid = irid_spectra(phase) * uIridescence;

        float scan = sin(uv.y * 130.0 - uTime * 22.0 * uScanlineSpeed) * 0.06 * uIridescence;
        float flicker = step(0.992, fract(sin(uTime * 12.0))) * 0.12;
        
        vec3 tint = uBaseTint / 255.0;
        vec3 base = color.rgb * tint;
        vec3 final = base + irid + vec3(scan + flicker) + vec3(fresnel * 0.5);
        float alpha = color.a * (0.8 + fresnel * 0.5);
        
        gl_FragColor = vec4(clamp(final, 0.0, 1.0) * alpha, alpha);
      }
    `}sendUniformData(e,t){e.uniform1f(t.uThickness,this.uThickness),e.uniform1f(t.uIridescence,this.uIridescence),e.uniform1f(t.uGlow,this.uGlow),e.uniform1f(t.uTime,this.uTime),e.uniform1f(t.uScanlineSpeed,this.uScanlineSpeed),e.uniform3fv(t.uBaseTint,new Float32Array(this.uBaseTint.map(e=>e/255)))}applyTo2d({imageData:e}){let{data:t}=e,i=.3*this.uIridescence;for(let e=0;e<t.length;e+=4){let r=(t[e]+t[e+1]+t[e+2])/3;t[e]=o(t[e]+255*Math.sin(.1*r)*i),t[e+1]=o(t[e+1]+255*Math.cos(.1*r)*i),t[e+2]=o(t[e+2]+255*i)}}}i(c,"Holographic");class f extends t{static type="BloomFilter";static uniformLocations=["uThreshold","uStrength","uRadius","uSoftness","uHighlightDrive","uTime","uGlowTint"];uThreshold=.5;uStrength=.8;uRadius=1.5;uSoftness=.2;uHighlightDrive=1.2;uTime=0;uGlowTint=[255,255,255];constructor(e){super(),e?.uThreshold!==void 0&&(this.uThreshold=e.uThreshold),e?.uStrength!==void 0&&(this.uStrength=e.uStrength),e?.uRadius!==void 0&&(this.uRadius=e.uRadius),e?.uSoftness!==void 0&&(this.uSoftness=e.uSoftness),e?.uHighlightDrive!==void 0&&(this.uHighlightDrive=e.uHighlightDrive),e?.uTime!==void 0&&(this.uTime=e.uTime),e?.uGlowTint!==void 0&&(this.uGlowTint=e.uGlowTint)}getFragmentSource(){return`
      precision highp float;
      varying vec2 vTexCoord;
      uniform sampler2D uTexture;
      uniform float uThreshold, uStrength, uRadius, uSoftness, uHighlightDrive, uTime;
      uniform vec3 uGlowTint;

      void main(){
        vec2 uv = vTexCoord;
        vec4 color = texture2D(uTexture, uv);
        
        float luma = dot(color.rgb, vec3(0.2126, 0.7152, 0.0722));
        
        // Cinematic Soft Knee curve (Professional Grade)
        float knee = max(0.01, uSoftness);
        float soft = luma - uThreshold + knee;
        soft = clamp(soft, 0.0, 2.0 * knee);
        soft = soft * soft / (4.0 * knee);
        float brightness = max(soft, luma - uThreshold);
        brightness *= uHighlightDrive;

        vec3 glow = vec3(0.0);
        float noise = fract(sin(dot(uv, vec2(12.9, 78.2))) * 43758.5 + uTime);
        
        float r = uRadius * 0.015;
        // Multi-tap approximation for high-fidelity bleed
        for(int i=0; i<8; i++){
          float angle = float(i) * 0.785;
          vec2 off = vec2(cos(angle), sin(angle)) * r;
          vec4 s = texture2D(uTexture, clamp(uv + off, 0.001, 0.999));
          float sl = dot(s.rgb, vec3(0.21, 0.71, 0.07));
          glow += s.rgb * smoothstep(uThreshold - knee, uThreshold + knee, sl);
        }
        glow /= 8.0;

        // Subtle electric flicker as seen in Shader Lab
        float flicker = 1.0 + sin(uTime * 40.0) * 0.02;
        
        vec3 tint = uGlowTint / 255.0;
        vec3 finalGlow = glow * tint * uStrength * 6.0 * brightness * flicker;
        vec3 finalColor = color.rgb + finalGlow;
        
        gl_FragColor = vec4(clamp(finalColor, 0.0, 1.0) * color.a, color.a);
      }
    `}sendUniformData(e,t){e.uniform1f(t.uThreshold,this.uThreshold),e.uniform1f(t.uStrength,this.uStrength),e.uniform1f(t.uRadius,this.uRadius),e.uniform1f(t.uSoftness,this.uSoftness),e.uniform1f(t.uHighlightDrive,this.uHighlightDrive),e.uniform1f(t.uTime,this.uTime),e.uniform3fv(t.uGlowTint,new Float32Array(this.uGlowTint.map(e=>e/255)))}}i(f,"BloomFilter");class h extends t{static type="PixelateFilter";static uniformLocations=["uBlockSize","uGridMode","uDither","uBevel"];uBlockSize=8;uGridMode=0;uDither=.4;uBevel=.5;constructor(e){super(),e?.uBlockSize!==void 0&&(this.uBlockSize=e.uBlockSize),e?.uGridMode!==void 0&&(this.uGridMode=e.uGridMode),e?.uDither!==void 0&&(this.uDither=e.uDither),e?.uBevel!==void 0&&(this.uBevel=e.uBevel)}getFragmentSource(){return`
      precision highp float;
      varying vec2 vTexCoord;
      uniform sampler2D uTexture;
      uniform float uBlockSize, uGridMode, uDither, uBevel;

      float bayer4(vec2 p) {
          vec2 pos = mod(floor(p), 4.0);
          float idx = pos.x + pos.y * 4.0;
          if (idx < 1.0) return 0.0/16.0;  if (idx < 2.0) return 8.0/16.0;  if (idx < 3.0) return 2.0/16.0;  if (idx < 4.0) return 10.0/16.0;
          if (idx < 5.0) return 12.0/16.0; if (idx < 6.0) return 4.0/16.0;  if (idx < 7.0) return 14.0/16.0; if (idx < 8.0) return 6.0/16.0;
          if (idx < 9.0) return 3.0/16.0;  if (idx < 10.0) return 11.0/16.0; if (idx < 11.0) return 1.0/16.0;  if (idx < 12.0) return 9.0/16.0;
          if (idx < 13.0) return 15.0/16.0; if (idx < 14.0) return 7.0/16.0; if (idx < 15.0) return 13.0/16.0; return 5.0/16.0;
      }

      void main(){
        vec2 uv = vTexCoord;
        float res = 280.0 / max(uBlockSize, 1.0);
        vec2 gridUV = uv;
        
        if (uGridMode > 0.5 && uGridMode < 1.5) {
          gridUV.x += step(1.0, mod(uv.y * res * 0.866, 2.0)) * (0.5 / res);
        } else if (uGridMode >= 1.5) {
          gridUV.x += step(1.0, mod(uv.y * res, 2.0)) * (0.5 / res);
        }

        vec2 block = floor(gridUV * res + 0.5) / res;
        vec4 color = texture2D(uTexture, block);
        if (color.a < 0.01) discard;

        vec2 f = fract(gridUV * res);
        float bevel = smoothstep(0.0, 0.15, f.x) * smoothstep(1.0, 0.85, f.x) *
                      smoothstep(0.0, 0.15, f.y) * smoothstep(1.0, 0.85, f.y);
        vec3 col = color.rgb;
        col *= (0.9 + bevel * 0.15 * uBevel);
        
        float threshold = bayer4(uv * 1024.0);
        float dither = (threshold - 0.5) * uDither * 0.2;
        col = clamp(col + dither, 0.0, 1.0);

        float mask = texture2D(uTexture, uv).a;
        gl_FragColor = vec4(col * mask, mask);
      }
    `}sendUniformData(e,t){e.uniform1f(t.uBlockSize,this.uBlockSize),e.uniform1f(t.uGridMode,this.uGridMode),e.uniform1f(t.uDither,this.uDither),e.uniform1f(t.uBevel,this.uBevel)}applyTo2d({imageData:e}){let{data:t}=e,i=Math.max(2,Math.round(this.uBlockSize));for(let o=0;o<e.width;o+=i)for(let r=0;r<e.height;r+=i){let u=(r*e.width+o)*4,a=t[u],n=t[u+1],s=t[u+2],l=t[u+3];for(let u=0;u<i;u++)for(let c=0;c<i;c++){let i=((r+c)*e.width+(o+u))*4;i<t.length&&(t[i]=a,t[i+1]=n,t[i+2]=s,t[i+3]=l)}}}}i(h,"PixelateFilter"),e.s(["BloomFilter",()=>f,"HolographicFilter",()=>c,"NeonGlowFilter",()=>l,"PixelateFilter",()=>h,"PrismFilter",()=>s,"ThermalFilter",()=>n],26415);var v=e.i(26415);class m extends t{static type="Glitch";static uniformLocations=["uAmount","uTime","uSeed"];uAmount=.4;uTime=0;uSeed=1;constructor(e){super(),e?.uAmount!==void 0&&(this.uAmount=e.uAmount),e?.uTime!==void 0&&(this.uTime=e.uTime),e?.uSeed!==void 0&&(this.uSeed=e.uSeed)}getFragmentSource(){return`
      precision highp float;
      varying vec2 vTexCoord;
      uniform sampler2D uTexture;
      uniform float uAmount;
      uniform float uTime;
      uniform float uSeed;

      ${a}

      void main(){
        vec2 uv = vTexCoord;
        float t = floor(uTime * 18.0) * 0.1337 + uSeed;
        
        float grid = mix(16.0, 48.0, uAmount);
        vec2 block = floor(uv * grid) / grid;
        float n = gnoise(block + t);
        
        if (n < uAmount * 0.22) {
            float strength = uAmount * 0.15;
            uv.x += (gnoise(vec2(t, block.y)) - 0.5) * strength;
            uv.y += (gnoise(vec2(block.x, t)) - 0.5) * strength * 0.3;
        }

        vec2 distVec = uv - 0.5;
        float dist = dot(distVec, distVec);
        float aberr = uAmount * 0.025 * (0.5 + dist * 2.0);
        
        float r = texture2D(uTexture, clamp(uv + vec2(aberr, 0.0), 0.001, 0.999)).r;
        float g = texture2D(uTexture, clamp(uv,                   0.001, 0.999)).g;
        float b = texture2D(uTexture, clamp(uv - vec2(aberr, 0.0), 0.001, 0.999)).b;
        float a = texture2D(uTexture, clamp(uv,                   0.001, 0.999)).a;

        vec3 col = vec3(r, g, b);
        float stripChance = gnoise(vec2(t * 0.44, uv.y));
        if (stripChance > 0.985 - uAmount * 0.04) {
            col = 1.0 - col;
        }

        float scan = 1.0 - step(0.5, fract(uv.y * 240.0)) * 0.06 * uAmount;
        gl_FragColor = vec4(clamp(col * scan, 0.0, 1.0) * a, a);
      }
    `}sendUniformData(e,t){e.uniform1f(t.uAmount,this.uAmount),e.uniform1f(t.uTime,this.uTime),e.uniform1f(t.uSeed,this.uSeed)}applyTo2d({imageData:e}){let{data:t,width:i,height:r}=e,u=new Uint8ClampedArray(t),a=Math.round(5*this.uAmount);for(let e=0;e<r;e++){let r=Math.random()>.95-.1*this.uAmount?Math.round((Math.random()-.5)*i*.05*this.uAmount):0;for(let n=0;n<i;n++){let s=(e*i+n)*4,l=o(n+a+r,0,i-1),c=o(n-a+r,0,i-1);t[s]=u[(e*i+l)*4],t[s+1]=u[(e*i+o(n+r,0,i-1))*4+1],t[s+2]=u[(e*i+c)*4+2],t[s+3]=u[s+3]}}}}i(m,"Glitch");class d extends t{static type="Wavy";static uniformLocations=["uIntensity","uFrequency","uTime","uSpeed","uRefraction"];uIntensity=.5;uFrequency=4;uTime=0;uSpeed=.5;uRefraction=.4;constructor(e){super(),e?.uIntensity!==void 0&&(this.uIntensity=e.uIntensity),e?.uFrequency!==void 0&&(this.uFrequency=e.uFrequency),e?.uTime!==void 0&&(this.uTime=e.uTime),e?.uSpeed!==void 0&&(this.uSpeed=e.uSpeed),e?.uRefraction!==void 0&&(this.uRefraction=e.uRefraction)}getFragmentSource(){return`
      precision highp float;
      varying vec2 vTexCoord;
      uniform sampler2D uTexture;
      uniform float uIntensity, uFrequency, uTime, uSpeed, uRefraction;

      ${r}

      void main(){
        vec2 uv = vTexCoord;
        float t = uTime * uSpeed;
        
        vec2 flow = vec2(
            snoise(uv * uFrequency + t * 0.5),
            snoise(uv * uFrequency + vec2(1.7, 9.2) - t * 0.4)
        );
        
        vec2 warpedUV = uv + flow * uIntensity * 0.08;
        float noiseVal = snoise(warpedUV * uFrequency * 1.5 + t * 0.8);
        vec2 finalUV = uv + flow * noiseVal * uIntensity * 0.04;

        float aberr = uIntensity * 0.02 * abs(noiseVal);
        float r = texture2D(uTexture, clamp(finalUV + vec2(aberr, 0.0), 0.001, 0.999)).r;
        float g = texture2D(uTexture, clamp(finalUV, 0.001, 0.999)).g;
        float b = texture2D(uTexture, clamp(finalUV - vec2(aberr, 0.0), 0.001, 0.999)).b;
        vec3 col = vec3(r, g, b);

        float caustic = pow(clamp(noiseVal * 0.5 + 0.5, 0.0, 1.0), 4.0) * uRefraction * 2.0;
        col += caustic * vec3(0.85, 0.95, 1.0); 

        gl_FragColor = vec4(col * texture2D(uTexture, uv).a, texture2D(uTexture, uv).a);
      }
    `}sendUniformData(e,t){e.uniform1f(t.uIntensity,this.uIntensity),e.uniform1f(t.uFrequency,this.uFrequency),e.uniform1f(t.uTime,this.uTime),e.uniform1f(t.uSpeed,this.uSpeed),e.uniform1f(t.uRefraction,this.uRefraction)}applyTo2d({imageData:e}){let{data:t,width:i,height:r}=e,u=new Uint8ClampedArray(t),a=12*this.uIntensity,n=this.uFrequency;for(let e=0;e<r;e++){let s=Math.round(Math.sin(e/r*n*Math.PI)*a);for(let r=0;r<i;r++){let a=(e*i+r)*4,n=o(r+s,0,i-1),l=(e*i+n)*4;t[a]=u[l],t[a+1]=u[l+1],t[a+2]=u[l+2]}}}}i(d,"Wavy");class p extends t{static type="LiquidMotion";static uniformLocations=["uIntensity","uViscosity","uComplexity","uTime","uSurfaceGlow"];uIntensity=.5;uViscosity=.4;uComplexity=3;uTime=0;uSurfaceGlow=.5;constructor(e){super(),e?.uIntensity!==void 0&&(this.uIntensity=e.uIntensity),e?.uViscosity!==void 0&&(this.uViscosity=e.uViscosity),e?.uComplexity!==void 0&&(this.uComplexity=e.uComplexity),e?.uTime!==void 0&&(this.uTime=e.uTime),e?.uSurfaceGlow!==void 0&&(this.uSurfaceGlow=e.uSurfaceGlow)}getFragmentSource(){return`
      precision highp float;
      varying vec2 vTexCoord;
      uniform sampler2D uTexture;
      uniform float uIntensity, uViscosity, uComplexity, uTime, uSurfaceGlow;

      ${r}

      float fbm(vec2 p) {
          float v = 0.0;
          float a = 0.5;
          mat2 rot = mat2(1.6, 1.2, -1.2, 1.6);
          for (int i = 0; i < 3; i++) {
              v += a * snoise(p);
              p = rot * p * 2.0 + uTime * uViscosity * 0.2;
              a *= 0.5;
          }
          return v;
      }

      void main(){
        vec2 uv = vTexCoord;
        float t = uTime * uViscosity;
        
        vec2 q = vec2(fbm(uv * uComplexity + t), fbm(uv * uComplexity + vec2(5.2, 1.3)));
        vec2 r = vec2(fbm(uv * uComplexity + q * 4.0 + t * 0.5), fbm(uv * uComplexity + q * 4.0 + vec2(1.7, 9.2)));
        
        float n = fbm(uv * uComplexity + r * 3.5);
        vec2 finalUV = uv + r * uIntensity * 0.15;

        vec4 color = texture2D(uTexture, clamp(finalUV, 0.001, 0.999));
        
        float g = fbm(finalUV * 10.0 + t);
        float spec = pow(max(0.0, g), 8.0) * uSurfaceGlow * 1.5;
        vec3 col = color.rgb + spec * vec3(1.0, 0.9, 0.7);

        gl_FragColor = vec4(col * color.a, color.a);
      }
    `}sendUniformData(e,t){e.uniform1f(t.uIntensity,this.uIntensity),e.uniform1f(t.uViscosity,this.uViscosity),e.uniform1f(t.uComplexity,this.uComplexity),e.uniform1f(t.uTime,this.uTime),e.uniform1f(t.uSurfaceGlow,this.uSurfaceGlow)}applyTo2d({imageData:e}){let{data:t,width:i,height:o}=e,r=new Uint8ClampedArray(t),u=Math.round(this.uIntensity*i*.06);for(let e=0;e<o;e++){let a=Math.round(Math.sin(e/o*Math.PI*2)*u);for(let o=0;o<i;o++){let u=(e*i+o)*4,n=Math.min(i-1,Math.max(0,o+a)),s=(e*i+n)*4;t[u]=r[s],t[u+1]=r[s+1],t[u+2]=r[s+2]}}}}i(p,"LiquidMotion");class g extends t{static type="VHSFilter";static uniformLocations=["uIntensity","uBleed","uTracking","uTime"];uIntensity=.5;uBleed=.5;uTracking=.5;uTime=0;constructor(e){super(),e?.uIntensity!==void 0&&(this.uIntensity=e.uIntensity),e?.uBleed!==void 0&&(this.uBleed=e.uBleed),e?.uTracking!==void 0&&(this.uTracking=e.uTracking),e?.uTime!==void 0&&(this.uTime=e.uTime)}getFragmentSource(){return`
      precision highp float;
      varying vec2 vTexCoord;
      uniform sampler2D uTexture;
      uniform float uIntensity, uBleed, uTracking, uTime;

      const mat3 RGB_TO_YIQ = mat3(0.299, 0.587, 0.114, 0.596, -0.274, -0.322, 0.211, -0.523, 0.312);
      const mat3 YIQ_TO_RGB = mat3(1.0, 0.956, 0.621, 1.0, -0.272, -0.647, 1.0, -1.106, 1.703);

      float hashV(vec2 co){return fract(sin(dot(co,vec2(12.9898,78.233)))*43758.5453);}

      void main(){
        vec2 uv = vTexCoord;
        float t = uTime;
        
        float switchSize = 0.04 * uTracking;
        float isSwitch = step(1.0 - switchSize, uv.y);
        uv.x += isSwitch * (hashV(vec2(uv.y, floor(t * 30.0))) - 0.5) * 0.03 * uIntensity;

        float jitter = (sin(uv.y * 30.0 + t * 8.0) * 0.0012 + (hashV(vec2(t, 0.0)) - 0.5) * 0.002) * uTracking;
        uv.x += jitter;

        vec4 base = texture2D(uTexture, clamp(uv, 0.001, 0.999));
        vec3 yiq = RGB_TO_YIQ * base.rgb;
        
        float bSize = 0.012 * uBleed;
        vec3 i_sample = RGB_TO_YIQ * texture2D(uTexture, clamp(uv - vec2(bSize, 0.0), 0.0, 1.0)).rgb;
        vec3 q_sample = RGB_TO_YIQ * texture2D(uTexture, clamp(uv - vec2(bSize * 1.6, 0.0), 0.0, 1.0)).rgb;
        
        vec3 mixedYIQ = vec3(yiq.x, i_sample.y, q_sample.z);
        vec3 rgb = YIQ_TO_RGB * mixedYIQ;

        float grain = (hashV(uv + vec2(t * 0.1, t * 13.0)) - 0.5) * 0.1 * uIntensity;
        float scan = 1.0 - step(0.5, fract(uv.y * 240.0)) * 0.12 * uIntensity;

        float dropout = step(0.996, hashV(vec2(floor(uv.y * 100.0) / 100.0, floor(t * 12.0)))) * 0.4 * uIntensity;
        
        vec3 col = rgb * scan + grain - dropout;
        gl_FragColor = vec4(clamp(col, 0.0, 1.0) * base.a, base.a);
      }
    `}sendUniformData(e,t){e.uniform1f(t.uIntensity,this.uIntensity),e.uniform1f(t.uBleed,this.uBleed),e.uniform1f(t.uTracking,this.uTracking),e.uniform1f(t.uTime,this.uTime)}applyTo2d({imageData:e}){let{data:t,width:i,height:r}=e,u=new Uint8ClampedArray(t),a=Math.round(8*this.uTracking);for(let e=0;e<r;e++){let n=Math.round(Math.sin(e/r*8)*a);for(let r=0;r<i;r++){let a=(e*i+r)*4,s=o(r+n,0,i-1),l=(e*i+s)*4;t[a]=u[l],t[a+1]=u[l+1],t[a+2]=u[l+2]}}}}i(g,"VHSFilter");class x extends t{static type="Matrix";static uniformLocations=["uIntensity","uTime"];uIntensity=.7;uTime=0;constructor(e){super(),e?.uIntensity!==void 0&&(this.uIntensity=e.uIntensity),e?.uTime!==void 0&&(this.uTime=e.uTime)}getFragmentSource(){return`
      precision highp float;
      varying vec2 vTexCoord;
      uniform sampler2D uTexture;
      uniform float uIntensity;
      uniform float uTime;

      float hashM(float n){return fract(sin(n)*43758.5453);}

      void main(){
        vec2 uv=vTexCoord;
        vec4 color=texture2D(uTexture,uv);

        float cols=22.0; float rows=32.0;
        vec2 cell=vec2(floor(uv.x*cols),floor(uv.y*rows));

        float speed  = 0.4+hashM(cell.x*17.3)*1.8;
        float offset = hashM(cell.x*31.7+7.0);
        float headY  = fract(offset+uTime*speed*0.25);

        float relY   = fract(uv.y-headY);
        if(relY>0.5) relY=relY-1.0;
        float tailLen= 0.25+hashM(cell.x+2.0)*0.35;

        float trail  = relY<0.0 ? max(0.0,1.0+relY/tailLen) : 0.0;
        float head   = smoothstep(0.04,0.0,abs(relY));
        float flicker= hashM(cell.x+cell.y*137.0+floor(uTime*10.0)*7.3);
        trail       *= 0.5+flicker*0.5;

        vec3 headCol  = vec3(0.85,1.0,0.85);
        vec3 trailCol = vec3(0.0,1.0,0.3)*trail;
        vec3 matrix   = headCol*head + trailCol;

        vec3 ambient = vec3(0.0,0.05,0.0)*uIntensity;

        vec3 result = mix(color.rgb, matrix+ambient, min((trail+head)*uIntensity,1.0)*color.a);
        gl_FragColor=vec4(result,color.a);
      }
    `}sendUniformData(e,t){e.uniform1f(t.uIntensity,this.uIntensity),e.uniform1f(t.uTime,this.uTime)}applyTo2d({imageData:e}){let{data:t}=e;for(let e=0;e<t.length;e+=4)t[e]=Math.min(255,.3*t[e]),t[e+1]=Math.min(255,.8*t[e+1]+30*this.uIntensity),t[e+2]=Math.min(255,.3*t[e+2])}}i(x,"Matrix");class T extends t{static type="LiquidMetalFilter";static uniformLocations=["uIntensity","uTime"];uIntensity=.5;uTime=0;constructor(e){super(),e?.uIntensity!==void 0&&(this.uIntensity=e.uIntensity),e?.uTime!==void 0&&(this.uTime=e.uTime)}getFragmentSource(){return`
      precision highp float;
      varying vec2 vTexCoord;
      uniform sampler2D uTexture;
      uniform float uIntensity;
      uniform float uTime;
      ${u}
      void main(){
        vec2 uv=vTexCoord;
        vec4 color=texture2D(uTexture,uv);
        float lum=dot(color.rgb,vec3(0.299,0.587,0.114));
        float n=vnoise(uv*3.5+vec2(uTime*0.08,uTime*0.05));
        float band=fract(sin((lum+n*0.3)*12.566*uIntensity+uTime*0.4)*0.5+0.5);
        vec3 chrome;
        if(band<0.28)      chrome=mix(vec3(0.02,0.02,0.03),vec3(0.20,0.23,0.28),band/0.28);
        else if(band<0.55) chrome=mix(vec3(0.20,0.23,0.28),vec3(0.68,0.74,0.82),(band-0.28)/0.27);
        else if(band<0.80) chrome=mix(vec3(0.68,0.74,0.82),vec3(0.95,0.97,1.00),(band-0.55)/0.25);
        else               chrome=mix(vec3(0.95,0.97,1.00),vec3(1.0), (band-0.80)/0.20);
        float spec=step(0.96,band)*0.6;
        chrome=clamp(chrome+spec,0.0,1.0);
        gl_FragColor=vec4(chrome*color.a,color.a);
      }
    `}sendUniformData(e,t){e.uniform1f(t.uIntensity,this.uIntensity),e.uniform1f(t.uTime,this.uTime)}applyTo2d({imageData:e}){let{data:t}=e;for(let e=0;e<t.length;e+=4){let i=.5*Math.sin((.299*t[e]+.587*t[e+1]+.114*t[e+2])/255*Math.PI*4*this.uIntensity)+.5,o=i>.8?255:i>.4?140:20;t[e]=o,t[e+1]=o,t[e+2]=o}}}i(T,"LiquidMetalFilter");class y extends t{static type="AdvancedCRT";static uniformLocations=["uMode","uMaskScale","uMaskIntensity","uScanlineIntensity","uDistortion","uConvergence","uBeamFocus","uPersistence","uBrightness","uTime"];uMode=1;uMaskScale=1;uMaskIntensity=.4;uScanlineIntensity=.5;uDistortion=.15;uConvergence=.3;uBeamFocus=.6;uPersistence=.4;uBrightness=1.1;uTime=0;constructor(e){super(),e?.uMode!==void 0&&(this.uMode=e.uMode),e?.uMaskScale!==void 0&&(this.uMaskScale=e.uMaskScale),e?.uMaskIntensity!==void 0&&(this.uMaskIntensity=e.uMaskIntensity),e?.uScanlineIntensity!==void 0&&(this.uScanlineIntensity=e.uScanlineIntensity),e?.uDistortion!==void 0&&(this.uDistortion=e.uDistortion),e?.uConvergence!==void 0&&(this.uConvergence=e.uConvergence),e?.uBeamFocus!==void 0&&(this.uBeamFocus=e.uBeamFocus),e?.uPersistence!==void 0&&(this.uPersistence=e.uPersistence),e?.uBrightness!==void 0&&(this.uBrightness=e.uBrightness),e?.uTime!==void 0&&(this.uTime=e.uTime)}getFragmentSource(){return`
      precision highp float;
      varying vec2 vTexCoord;
      uniform sampler2D uTexture;
      uniform sampler2D uPersistenceBuffer;
      uniform float uMode, uMaskScale, uMaskIntensity, uScanlineIntensity;
      uniform float uDistortion, uConvergence, uBeamFocus, uPersistence;
      uniform float uBrightness, uTime;

      vec2 distort(vec2 coord, float amt) {
          vec2 cc = coord - 0.5;
          float dist = dot(cc, cc);
          return coord + cc * (dist * amt * 0.15);
      }

      void main() {
          vec2 uv = distort(vTexCoord, uDistortion);
          
          if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) {
              gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
              return;
          }

          // Radial Convergence
          vec2 direction = uv - 0.5;
          float distFromCenter = length(direction);
          vec2 radialOffset = direction * (uConvergence * distFromCenter * 0.01);
          
          float r = texture2D(uTexture, uv + radialOffset).r;
          float g = texture2D(uTexture, uv).g;
          float b = texture2D(uTexture, uv - radialOffset).b;
          float a = texture2D(uTexture, uv).a;
          
          // Master Slot Mask & Brick Pattern
          vec2 pos = gl_FragCoord.xy / max(1.0, uMaskScale);
          float col = mod(floor(pos.x), 3.0);
          vec3 mask = vec3(1.0);
          if (uMode > 0.5) {
              if (col == 0.0) mask = vec3(1.0, 0.2, 0.2);
              else if (col == 1.0) mask = vec3(0.2, 1.0, 0.2);
              else mask = vec3(0.2, 0.2, 1.0);
              float brick = mod(floor(pos.y) + floor(pos.x/3.0), 2.0);
              mask *= (0.7 + 0.3 * brick);
          }
          vec3 finalMask = mix(vec3(1.0), mask, uMaskIntensity);

          float scan = sin(uv.y * 800.0) * 0.05 * uScanlineIntensity;
          vec3 color = (vec3(r, g, b) * finalMask) - scan;
          color *= uBrightness;

          // Persistence (Temporal decay)
          vec3 prev = texture2D(uPersistenceBuffer, uv).rgb;
          color = max(color, prev * (uPersistence * 0.95));

          gl_FragColor = vec4(color * a, a);
      }
    `}applyTo(e){let t=e.gl;this._persistenceTexture||(this._persistenceTexture=t.createTexture(),t.bindTexture(t.TEXTURE_2D,this._persistenceTexture),t.texImage2D(t.TEXTURE_2D,0,t.RGBA,e.sourceWidth,e.sourceHeight,0,t.RGBA,t.UNSIGNED_BYTE,null),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE)),super.applyTo(e),t.bindTexture(t.TEXTURE_2D,this._persistenceTexture),t.copyTexImage2D(t.TEXTURE_2D,0,t.RGBA,0,0,e.sourceWidth,e.sourceHeight,0)}sendUniformData(e,t){e.uniform1f(t.uMode,this.uMode),e.uniform1f(t.uMaskScale,this.uMaskScale),e.uniform1f(t.uMaskIntensity,this.uMaskIntensity),e.uniform1f(t.uScanlineIntensity,this.uScanlineIntensity),e.uniform1f(t.uDistortion,this.uDistortion),e.uniform1f(t.uConvergence,this.uConvergence),e.uniform1f(t.uBeamFocus,this.uBeamFocus),e.uniform1f(t.uPersistence,this.uPersistence),e.uniform1f(t.uBrightness,this.uBrightness),e.uniform1f(t.uTime,this.uTime),this._persistenceTexture&&(e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,this._persistenceTexture),e.uniform1i(t.uPersistenceBuffer,1),e.activeTexture(e.TEXTURE0))}}i(y,"AdvancedCRT"),e.s(["AdvancedCRTFilter",()=>y,"Glitch",()=>m,"LiquidMetalFilter",()=>T,"LiquidMotionFilter",()=>p,"MatrixFilter",()=>x,"VHSFilter",()=>g,"WavyFilter",()=>d],93692);var S=e.i(93692);class D extends t{static type="Risograph";static uniformLocations=["uDotSize","uMisregistration","uDotGain","uInk1","uInk2","uPaperColor"];uDotSize=1;uMisregistration=.2;uDotGain=.15;uInk1=[255,0,150];uInk2=[0,80,255];uPaperColor=[250,248,240];constructor(e){super(),e?.uDotSize!==void 0&&(this.uDotSize=e.uDotSize),e?.uMisregistration!==void 0&&(this.uMisregistration=e.uMisregistration),e?.uDotGain!==void 0&&(this.uDotGain=e.uDotGain),e?.uInk1!==void 0&&(this.uInk1=e.uInk1),e?.uInk2!==void 0&&(this.uInk2=e.uInk2),e?.uPaperColor!==void 0&&(this.uPaperColor=e.uPaperColor)}getFragmentSource(){return`
      precision highp float;
      varying vec2 vTexCoord;
      uniform sampler2D uTexture;
      uniform float uDotSize, uMisregistration, uDotGain;
      uniform vec3 uInk1, uInk2, uPaperColor;

      void main(){
        vec2 uv = vTexCoord;
        vec4 color = texture2D(uTexture, uv);
        if (color.a < 0.01) discard;

        float luma = dot(color.rgb, vec3(0.299, 0.587, 0.114));
        float plate1 = smoothstep(0.35, 0.9, luma);         
        float plate2 = smoothstep(0.0, 0.55, 1.0 - luma);   

        vec2 off1 = vec2(0.0018 * uMisregistration, 0.0);
        vec2 off2 = vec2(-0.0012 * uMisregistration, 0.0008 * uMisregistration);
        
        float angle1 = 0.26; float angle2 = 1.30;
        mat2 rot1 = mat2(cos(angle1), -sin(angle1), sin(angle1), cos(angle1));
        mat2 rot2 = mat2(cos(angle2), -sin(angle2), sin(angle2), cos(angle2));
        
        vec2 st1 = rot1 * (uv + off1) * (140.0 / max(uDotSize, 0.1));
        vec2 st2 = rot2 * (uv + off2) * (120.0 / max(uDotSize, 0.1)); 
        
        float dist1 = length(fract(st1) - 0.5);
        float dist2 = length(fract(st2) - 0.5);

        float size1 = (1.0 - plate1) * 0.7 + uDotGain * 0.3;
        float size2 = plate2 * 0.7 + uDotGain * 0.3;
        
        float mask1 = 1.0 - smoothstep(size1 - 0.1, size1 + 0.1, dist1);
        float mask2 = 1.0 - smoothstep(size2 - 0.1, size2 + 0.1, dist2);

        vec3 paper = uPaperColor / 255.0;
        vec3 i1    = uInk1 / 255.0;
        vec3 i2    = uInk2 / 255.0;
        
        vec3 result = paper;
        result = mix(result, result * i1, mask1);
        result = mix(result, result * i2, mask2);
        
        gl_FragColor = vec4(result * color.a, color.a);
      }
    `}sendUniformData(e,t){e.uniform1f(t.uDotSize,this.uDotSize),e.uniform1f(t.uMisregistration,this.uMisregistration),e.uniform1f(t.uDotGain,this.uDotGain),e.uniform3fv(t.uInk1,new Float32Array(this.uInk1.map(e=>e/255))),e.uniform3fv(t.uInk2,new Float32Array(this.uInk2.map(e=>e/255))),e.uniform3fv(t.uPaperColor,new Float32Array(this.uPaperColor.map(e=>e/255)))}applyTo2d({imageData:e}){let{data:t}=e,i=this.uInk1,o=this.uInk2,r=this.uPaperColor;for(let e=0;e<t.length;e+=4){let u=Math.floor(2*((.299*t[e]+.587*t[e+1]+.114*t[e+2])/255))/2;u>.6?(t[e]=r[0],t[e+1]=r[1],t[e+2]=r[2]):u>.3?(t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2]):(t[e]=o[0],t[e+1]=o[1],t[e+2]=o[2])}}}i(D,"Risograph");class I extends t{static type="EliteClay";static uniformLocations=["uInflate","uGlow","uMatte","uLightAngle","uTranslucency"];uInflate=.5;uGlow=.35;uMatte=.2;uLightAngle=135;uTranslucency=.4;constructor(e){super(),e?.uInflate!==void 0&&(this.uInflate=e.uInflate),e?.uGlow!==void 0&&(this.uGlow=e.uGlow),e?.uMatte!==void 0&&(this.uMatte=e.uMatte),e?.uLightAngle!==void 0&&(this.uLightAngle=e.uLightAngle),e?.uTranslucency!==void 0&&(this.uTranslucency=e.uTranslucency)}getFragmentSource(){return`
      precision highp float;
      varying vec2 vTexCoord;
      uniform sampler2D uTexture;
      uniform float uInflate, uGlow, uMatte, uLightAngle, uTranslucency;

      void main(){
        vec2 uv = vTexCoord;
        vec4 color = texture2D(uTexture, uv);
        if (color.a < 0.01) discard;

        float s = 0.002 + (uInflate * 0.012); float s2 = s * 2.5;
        float aT = texture2D(uTexture, uv + vec2(0.0, s)).a;
        float aB = texture2D(uTexture, uv + vec2(0.0, -s)).a;
        float aL = texture2D(uTexture, uv + vec2(-s, 0.0)).a;
        float aR = texture2D(uTexture, uv + vec2(s, 0.0)).a;
        float aT2 = texture2D(uTexture, uv + vec2(0.0, s2)).a;
        float aB2 = texture2D(uTexture, uv + vec2(0.0, -s2)).a;
        float aL2 = texture2D(uTexture, uv + vec2(-s2, 0.0)).a;
        float aR2 = texture2D(uTexture, uv + vec2(s2, 0.0)).a;
        
        float dX = mix(aL - aR, aL2 - aR2, 0.6);
        float dY = mix(aB - aT, aB2 - aT2, 0.6);
        vec3 normal = normalize(vec3(dX, dY, 0.55 / max(uInflate, 0.05)));
        float thickness = smoothstep(0.0, 0.8, 1.0 - (abs(aL - aR) + abs(aT - aB)));

        float rad = uLightAngle * 0.0174533;
        vec3 L = normalize(vec3(cos(rad), sin(rad), 1.0));
        vec3 V = vec3(0.0, 0.0, 1.0); vec3 H = normalize(L + V);
        
        float wrap = 0.4;
        float diff = max(0.0, (dot(normal, L) + wrap) / (1.0 + wrap));
        float sss = pow(max(0.0, dot(V, -L)), 3.0) * (1.0 - thickness) * uTranslucency * 2.1;
        float saturationBoost = smoothstep(0.3, 0.7, diff) * (1.0 - diff) * uMatte * 2.2;

        float specSharp = pow(max(dot(normal, H), 0.0), 64.0) * uGlow * 1.8;
        float specSoft  = pow(max(dot(normal, H), 0.0), 12.0) * uGlow * 0.5;
        
        vec3 base = color.rgb;
        base = mix(base, base * vec3(1.15, 0.85, 0.75), saturationBoost);
        vec3 final = base * (0.32 + 0.68 * diff) + (sss * vec3(1.0, 0.25, 0.1)) + (specSharp + specSoft);
        
        float grain = (fract(sin(dot(uv, vec2(12.9898, 78.233))) * 43758.5453) - 0.5) * uMatte * 0.14;
        final += grain;

        gl_FragColor = vec4(clamp(final, 0.0, 1.0) * color.a, color.a);
      }
    `}sendUniformData(e,t){e.uniform1f(t.uInflate,this.uInflate),e.uniform1f(t.uGlow,this.uGlow),e.uniform1f(t.uMatte,this.uMatte),e.uniform1f(t.uLightAngle,this.uLightAngle),e.uniform1f(t.uTranslucency,this.uTranslucency)}applyTo2d({imageData:e}){let{data:t}=e,i=45*this.uGlow,r=18*this.uMatte;for(let e=0;e<t.length;e+=4){let u=(Math.random()-.5)*r;t[e]=o(t[e]+i+u),t[e+1]=o(t[e+1]+.85*i+u),t[e+2]=o(t[e+2]+.75*i+u)}}}i(I,"EliteClay");class C extends t{static type="OilPaint";static uniformLocations=["uRadius","uImpasto","uCoherence","uIntensity"];uRadius=4;uImpasto=.5;uCoherence=.8;uIntensity=1;constructor(e){super(),e?.uRadius!==void 0&&(this.uRadius=e.uRadius),e?.uImpasto!==void 0&&(this.uImpasto=e.uImpasto),e?.uCoherence!==void 0&&(this.uCoherence=e.uCoherence),e?.uIntensity!==void 0&&(this.uIntensity=e.uIntensity)}getFragmentSource(){return`
      precision highp float;
      varying vec2 vTexCoord;
      uniform sampler2D uTexture;
      uniform float uRadius, uImpasto, uCoherence, uIntensity;

      void main(){
        vec2 uv = vTexCoord;
        vec4 color = texture2D(uTexture, uv);
        float r = uRadius * 0.005;
        vec2 off[8];
        off[0]=vec2(-r,-r); off[1]=vec2(0.0,-r); off[2]=vec2(r,-r);  off[3]=vec2(r,0.0);
        off[4]=vec2(r,r);   off[5]=vec2(0.0,r);  off[6]=vec2(-r,r);  off[7]=vec2(-r,0.0);
        
        vec3 q0 = (texture2D(uTexture, clamp(uv + off[0], 0.0, 1.0)).rgb + texture2D(uTexture, clamp(uv + off[1], 0.0, 1.0)).rgb) * 0.5;
        vec3 q1 = (texture2D(uTexture, clamp(uv + off[2], 0.0, 1.0)).rgb + texture2D(uTexture, clamp(uv + off[3], 0.0, 1.0)).rgb) * 0.5;
        vec3 q2 = (texture2D(uTexture, clamp(uv + off[4], 0.0, 1.0)).rgb + texture2D(uTexture, clamp(uv + off[5], 0.0, 1.0)).rgb) * 0.5;
        vec3 q3 = (texture2D(uTexture, clamp(uv + off[6], 0.0, 1.0)).rgb + texture2D(uTexture, clamp(uv + off[7], 0.0, 1.0)).rgb) * 0.5;

        float d0 = length(q0 - color.rgb); float d1 = length(q1 - color.rgb);
        float d2 = length(q2 - color.rgb); float d3 = length(q3 - color.rgb);
        
        vec3 best = q0; float minD = d0;
        if(d1 < minD) { best = q1; minD = d1; }
        if(d2 < minD) { best = q2; minD = d2; }
        if(d3 < minD) { best = q3; minD = d3; }

        float hL = dot(texture2D(uTexture, uv + vec2(-0.002, 0.0)).rgb, vec3(0.33));
        float hR = dot(texture2D(uTexture, uv + vec2( 0.002, 0.0)).rgb, vec3(0.33));
        float hT = dot(texture2D(uTexture, uv + vec2( 0.0, -0.002)).rgb, vec3(0.33));
        float hB = dot(texture2D(uTexture, uv + vec2( 0.0,  0.002)).rgb, vec3(0.33));
        float hL2 = dot(texture2D(uTexture, uv + vec2(-0.006, 0.0)).rgb, vec3(0.33));
        float hR2 = dot(texture2D(uTexture, uv + vec2( 0.006, 0.0)).rgb, vec3(0.33));
        float hT2 = dot(texture2D(uTexture, uv + vec2( 0.0, -0.006)).rgb, vec3(0.33));
        float hB2 = dot(texture2D(uTexture, uv + vec2( 0.0,  0.006)).rgb, vec3(0.33));
        
        vec3 normal = normalize(vec3(mix(hL - hR, hL2 - hR2, 0.5), mix(hT - hB, hT2 - hB2, 0.5), 0.2 / max(0.01, uImpasto)));
        float diff = max(0.0, dot(normal, normalize(vec3(1.0, 1.0, 1.2))));
        
        vec3 paint = mix(color.rgb, best, uCoherence);
        vec3 shaded = paint * (0.85 + diff * 0.35);
        shaded += fract(sin(dot(uv, vec2(12.9898, 78.233))) * 43758.5453) * 0.05 * uImpasto;

        gl_FragColor = vec4(mix(color.rgb, shaded, uIntensity) * color.a, color.a);
      }
    `}sendUniformData(e,t){e.uniform1f(t.uRadius,this.uRadius),e.uniform1f(t.uImpasto,this.uImpasto),e.uniform1f(t.uCoherence,this.uCoherence),e.uniform1f(t.uIntensity,this.uIntensity)}applyTo2d({imageData:e}){let{data:t}=e;for(let e=0;e<t.length;e+=4)t[e]=o(t[e]*(1+.2*this.uImpasto)),t[e+1]=o(t[e+1]*(1+.2*this.uImpasto)),t[e+2]=o(t[e+2]*(1+.2*this.uImpasto))}}i(C,"OilPaint");class b extends t{static type="OutlineFilter";static uniformLocations=["uThickness","uSoftness","uInnerGlow","uOutlineColor"];uThickness=2;uSoftness=.1;uInnerGlow=.4;uOutlineColor=[255,255,255];constructor(e){super(),e?.uThickness!==void 0&&(this.uThickness=e.uThickness),e?.uSoftness!==void 0&&(this.uSoftness=e.uSoftness),e?.uInnerGlow!==void 0&&(this.uInnerGlow=e.uInnerGlow),e?.uOutlineColor!==void 0&&(this.uOutlineColor=e.uOutlineColor)}getFragmentSource(){return`
      precision highp float;
      varying vec2 vTexCoord;
      uniform sampler2D uTexture;
      uniform float uThickness, uSoftness, uInnerGlow;
      uniform vec3 uOutlineColor;

      void main(){
        vec2 uv = vTexCoord;
        vec4 color = texture2D(uTexture, uv);
        float t = uThickness * 0.0018;
        float tl = texture2D(uTexture, clamp(uv + vec2(-t, -t), 0.0, 1.0)).a;
        float tc = texture2D(uTexture, clamp(uv + vec2( 0.0, -t), 0.0, 1.0)).a;
        float tr = texture2D(uTexture, clamp(uv + vec2( t, -t), 0.0, 1.0)).a;
        float ml = texture2D(uTexture, clamp(uv + vec2(-t, 0.0), 0.0, 1.0)).a;
        float mr = texture2D(uTexture, clamp(uv + vec2( t, 0.0), 0.0, 1.0)).a;
        float bl = texture2D(uTexture, clamp(uv + vec2(-t, t), 0.0, 1.0)).a;
        float bc = texture2D(uTexture, clamp(uv + vec2( 0.0, t), 0.0, 1.0)).a;
        float br = texture2D(uTexture, clamp(uv + vec2( t, t), 0.0, 1.0)).a;
        
        float edge = sqrt(pow(-tl - 2.0*ml - bl + tr + 2.0*mr + br, 2.0) + pow(-tl - 2.0*tc - tr + bl + 2.0*bc + br, 2.0));
        float stroke = smoothstep(0.4 - uSoftness, 0.45 + uSoftness, edge);
        float inner = smoothstep(0.1, 0.7, edge) * color.a * uInnerGlow;
        
        vec3 tint = uOutlineColor / 255.0;
        vec3 result = mix(color.rgb, tint, stroke);
        result = mix(result, tint, inner * 0.5);

        float finalAlpha = max(color.a, stroke * 0.98);
        gl_FragColor = vec4(result * finalAlpha, finalAlpha);
      }
    `}sendUniformData(e,t){e.uniform1f(t.uThickness,this.uThickness),e.uniform1f(t.uSoftness,this.uSoftness),e.uniform1f(t.uInnerGlow,this.uInnerGlow),e.uniform3fv(t.uOutlineColor,new Float32Array(this.uOutlineColor.map(e=>e/255)))}applyTo2d({imageData:e}){let{data:t}=e,i=this.uOutlineColor,r=.1*this.uThickness;for(let e=0;e<t.length;e+=4)t[e+3]>0&&t[e+3]<255&&(t[e]=o(t[e]+(i[0]-t[e])*r),t[e+1]=o(t[e+1]+(i[1]-t[e+1])*r),t[e+2]=o(t[e+2]+(i[2]-t[e+2])*r))}}i(b,"OutlineFilter");class F extends t{static type="Duotone";static uniformLocations=["uShadowColor","uMidColor","uHighlightColor","uContrast","uIntensity"];uShadowColor=[0,10,60];uMidColor=[120,150,180];uHighlightColor=[255,230,200];uContrast=1;uIntensity=1;constructor(e){super(),e?.uShadowColor!==void 0&&(this.uShadowColor=e.uShadowColor),e?.uMidColor!==void 0&&(this.uMidColor=e.uMidColor),e?.uHighlightColor!==void 0&&(this.uHighlightColor=e.uHighlightColor),e?.uContrast!==void 0&&(this.uContrast=e.uContrast),e?.uIntensity!==void 0&&(this.uIntensity=e.uIntensity)}getFragmentSource(){return`
      precision highp float;
      varying vec2 vTexCoord;
      uniform sampler2D uTexture;
      uniform vec3 uShadowColor, uMidColor, uHighlightColor;
      uniform float uContrast, uIntensity;

      void main(){
        vec2 uv = vTexCoord;
        vec4 color = texture2D(uTexture, uv);
        float luma = pow(dot(color.rgb, vec3(0.2126, 0.7152, 0.0722)), uContrast);
        
        float shadowMask = 1.0 - smoothstep(0.0, 0.45, luma);
        float highlightMask = smoothstep(0.55, 1.0, luma);
        float midMask = 1.0 - shadowMask - highlightMask;
        
        vec3 graded = (shadowMask * uShadowColor/255.0) + (midMask * uMidColor/255.0) + (highlightMask * uHighlightColor/255.0);
        gl_FragColor = vec4(mix(color.rgb, graded, uIntensity) * color.a, color.a);
      }
    `}sendUniformData(e,t){e.uniform3fv(t.uShadowColor,new Float32Array(this.uShadowColor.map(e=>e/255))),e.uniform3fv(t.uMidColor,new Float32Array(this.uMidColor.map(e=>e/255))),e.uniform3fv(t.uHighlightColor,new Float32Array(this.uHighlightColor.map(e=>e/255))),e.uniform1f(t.uContrast,this.uContrast),e.uniform1f(t.uIntensity,this.uIntensity)}applyTo2d({imageData:e}){let{data:t}=e,i=this.uShadowColor,o=this.uHighlightColor;for(let e=0;e<t.length;e+=4){let r=(.21*t[e]+.72*t[e+1]+.07*t[e+2])/255;t[e]=Math.round(i[0]+(o[0]-i[0])*r),t[e+1]=Math.round(i[1]+(o[1]-i[1])*r),t[e+2]=Math.round(i[2]+(o[2]-i[2])*r)}}}i(F,"Duotone");class M extends t{static type="PosterizeFilter";static uniformLocations=["uSteps","uDither","uVibrance","uThreshold"];uSteps=4;uDither=.5;uVibrance=.4;uThreshold=.5;constructor(e){super(),e?.uSteps!==void 0&&(this.uSteps=e.uSteps),e?.uDither!==void 0&&(this.uDither=e.uDither),e?.uVibrance!==void 0&&(this.uVibrance=e.uVibrance),e?.uThreshold!==void 0&&(this.uThreshold=e.uThreshold)}getFragmentSource(){return`
      precision highp float;
      varying vec2 vTexCoord;
      uniform sampler2D uTexture;
      uniform float uSteps, uDither, uVibrance, uThreshold;

      float bayer4x4(vec2 p) {
          vec2 pos = floor(mod(p, 4.0));
          if (pos.y == 0.0) return (pos.x == 0.0 ? 0.0 : (pos.x == 1.0 ? 0.5 : (pos.x == 2.0 ? 0.125 : 0.625)));
          if (pos.y == 1.0) return (pos.x == 0.0 ? 0.75 : (pos.x == 1.0 ? 0.25 : (pos.x == 2.0 ? 0.875 : 0.375)));
          if (pos.y == 2.0) return (pos.x == 0.0 ? 0.1875 : (pos.x == 1.0 ? 0.6875 : (pos.x == 2.0 ? 0.0625 : 0.5625)));
          return (pos.x == 0.0 ? 0.9375 : (pos.x == 1.0 ? 0.4375 : (pos.x == 2.0 ? 0.8125 : 0.3125)));
      }

      void main(){
        vec2 uv = vTexCoord;
        vec4 color = texture2D(uTexture, uv);
        float edge = abs(dot(texture2D(uTexture, uv + 1.0/600.0).rgb, vec3(0.33)) - dot(color.rgb, vec3(0.33)));
        float stepSize = 1.0 / max(uSteps - 1.0, 1.0);
        vec3 post = floor((color.rgb + (bayer4x4(gl_FragCoord.xy) - 0.5) * uDither * 0.18) / stepSize + 0.5) * stepSize;
        vec3 result = mix(post, post * (1.0 + uVibrance * 0.5), uVibrance);
        gl_FragColor = vec4(clamp(mix(result, color.rgb, clamp(edge * 8.0 * (1.1 - uThreshold), 0.0, 1.0)), 0.0, 1.0), color.a);
      }
    `}sendUniformData(e,t){e.uniform1f(t.uSteps,this.uSteps),e.uniform1f(t.uDither,this.uDither),e.uniform1f(t.uVibrance,this.uVibrance),e.uniform1f(t.uThreshold,this.uThreshold)}applyTo2d({imageData:e}){let{data:t}=e,i=255/Math.max(1,this.uSteps-1);for(let e=0;e<t.length;e+=4)t[e]=Math.round(t[e]/i)*i,t[e+1]=Math.round(t[e+1]/i)*i,t[e+2]=Math.round(t[e+2]/i)*i}}i(M,"PosterizeFilter");class w extends t{static type="VignetteFilter";static uniformLocations=["uStrength","uRadius","uAspect","uAberration","uSaturationPreserve"];uStrength=.7;uRadius=.5;uAspect=1;uAberration=.3;uSaturationPreserve=.6;constructor(e){super(),e?.uStrength!==void 0&&(this.uStrength=e.uStrength),e?.uRadius!==void 0&&(this.uRadius=e.uRadius),e?.uAspect!==void 0&&(this.uAspect=e.uAspect),e?.uAberration!==void 0&&(this.uAberration=e.uAberration),e?.uSaturationPreserve!==void 0&&(this.uSaturationPreserve=e.uSaturationPreserve)}getFragmentSource(){return`
      precision highp float;
      varying vec2 vTexCoord;
      uniform sampler2D uTexture;
      uniform float uStrength, uRadius, uAspect, uAberration, uSaturationPreserve;

      void main(){
        vec2 uv = vTexCoord;
        vec2 distVec = (uv - 0.5); distVec.x *= uAspect;
        float d = length(distVec) * 2.0;
        float ca = uAberration * 0.015 * (d * d);
        vec2 caDir = normalize(uv - 0.5) * ca;
        vec3 col = vec3(texture2D(uTexture, clamp(uv + caDir, 0.0, 1.0)).r, texture2D(uTexture, uv).g, texture2D(uTexture, clamp(uv - caDir, 0.0, 1.0)).b);
        float falloff = clamp(1.0 - (pow(smoothstep(uRadius, uRadius + 0.65, d), 2.0) * uStrength), 0.0, 1.0);
        vec3 result = mix(col * falloff, col * falloff * 1.15, uSaturationPreserve * (1.0 - falloff));
        gl_FragColor = vec4(clamp(result, 0.0, 1.0), texture2D(uTexture, uv).a);
      }
    `}sendUniformData(e,t){e.uniform1f(t.uStrength,this.uStrength),e.uniform1f(t.uRadius,this.uRadius),e.uniform1f(t.uAspect,this.uAspect),e.uniform1f(t.uAberration,this.uAberration),e.uniform1f(t.uSaturationPreserve,this.uSaturationPreserve)}applyTo2d({imageData:e}){let{data:t}=e,i=.5*this.uStrength;for(let e=0;e<t.length;e+=4){let r=(.21*t[e]+.72*t[e+1]+.07*t[e+2])/255;t[e]=o(t[e]-(255-t[e])*i*(1-r)),t[e+1]=o(t[e+1]-(255-t[e+1])*i*(1-r)),t[e+2]=o(t[e+2]-(255-t[e+2])*i*(1-r))}}}i(w,"VignetteFilter");class k extends t{static type="VolumetricDepthFilter";static uniformLocations=["uDepth","uOpacity","uAngle"];uDepth=.3;uOpacity=.72;uAngle=2.356;constructor(e){super(),e?.uDepth!==void 0&&(this.uDepth=e.uDepth),e?.uOpacity!==void 0&&(this.uOpacity=e.uOpacity),e?.uAngle!==void 0&&(this.uAngle=e.uAngle)}getFragmentSource(){return`
      precision highp float;
      varying vec2 vTexCoord;
      uniform sampler2D uTexture;
      uniform float uDepth, uOpacity, uAngle;

      void main() {
        vec2 dir = vec2(cos(uAngle), sin(uAngle));
        float maxOff = uDepth * 0.06;
        vec4 stack = vec4(0.0);
        for (int i = 8; i >= 1; i--) {
          float t = float(i) / 8.0;
          vec4 c = texture2D(uTexture, vTexCoord - dir * t * maxOff);
          if (c.a < 0.01) continue;
          vec4 depthPx = vec4(c.rgb * (1.0 - t * 0.72), c.a * uOpacity * (0.20 + (1.0 - t) * 0.45));
          stack = depthPx + stack * (1.0 - depthPx.a);
        }
        vec4 front = texture2D(uTexture, vTexCoord);
        gl_FragColor = front + stack * (1.0 - front.a);
      }
    `}sendUniformData(e,t){e.uniform1f(t.uDepth,this.uDepth),e.uniform1f(t.uOpacity,this.uOpacity),e.uniform1f(t.uAngle,this.uAngle)}applyTo2d({imageData:e}){let{data:t,width:i,height:o}=e,r=new Uint8ClampedArray(t),u=Math.round(this.uDepth*i*.06),a=Math.cos(this.uAngle),n=Math.sin(this.uAngle);for(let e=0;e<o;e++)for(let s=0;s<i;s++){let l=(e*i+s)*4,c=0,f=0,h=0,v=0;for(let t=8;t>=1;t--){let l=t/8,m=Math.round(s-a*l*u),d=Math.round(e-n*l*u);if(m<0||m>=i||d<0||d>=o)continue;let p=(d*i+m)*4,g=r[p+3]/255;if(g<.01)continue;let x=g*this.uOpacity*(.2+(1-l)*.45),T=v/255,y=x+T*(1-x);y>.001&&(c=(r[p]/255*(1-.72*l)*x+c/255*T*(1-x))/y*255,f=(r[p+1]/255*(1-.72*l)*x+f/255*T*(1-x))/y*255,h=(r[p+2]/255*(1-.72*l)*x+h/255*T*(1-x))/y*255,v=255*y)}let m=r[l+3]/255,d=v/255,p=m+d*(1-m);p>.001?(t[l]=(r[l]/255*m+c/255*d*(1-m))/p*255,t[l+1]=(r[l+1]/255*m+f/255*d*(1-m))/p*255,t[l+2]=(r[l+2]/255*m+h/255*d*(1-m))/p*255,t[l+3]=255*p):t[l]=t[l+1]=t[l+2]=t[l+3]=0}}}i(k,"VolumetricDepthFilter"),e.s(["DuotoneFilter",()=>F,"EliteClay",()=>I,"OilPaintFilter",()=>C,"OutlineFilter",()=>b,"PosterizeFilter",()=>M,"Risograph",()=>D,"VignetteFilter",()=>w,"VolumetricDepthFilter",()=>k],7510);var R=e.i(7510);class G extends t{static type="Grain";static uniformLocations=["uIntensity","uTime","uColorSaturation"];uIntensity=.4;uTime=0;uColorSaturation=.35;constructor(e){super(),e?.uIntensity!==void 0&&(this.uIntensity=e.uIntensity),e?.uTime!==void 0&&(this.uTime=e.uTime),e?.uColorSaturation!==void 0&&(this.uColorSaturation=e.uColorSaturation)}getFragmentSource(){return`
      precision highp float;
      varying vec2 vTexCoord;
      uniform sampler2D uTexture;
      uniform float uIntensity, uTime, uColorSaturation;

      float hashGr(vec2 p){
        return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
      }

      void main(){
        vec4 color = texture2D(uTexture, vTexCoord);
        if (color.a < 0.01) discard;

        float luma = dot(color.rgb, vec3(0.299, 0.587, 0.114));
        float weight = 1.0 - pow(abs(luma - 0.35) * 1.6, 2.0);
        weight = clamp(weight, 0.15, 1.0) * uIntensity;

        vec2 p = vTexCoord * 1850.0 + uTime * 0.04;
        float nr = hashGr(p + 0.11);
        float ng = hashGr(p + 0.22);
        float nb = hashGr(p + 0.33);
        
        vec3 grain = vec3(nr, ng, nb);
        float mono = (nr + ng + nb) * 0.333;
        grain = mix(vec3(mono), grain, uColorSaturation);

        vec3 final = color.rgb;
        vec3 blend = grain;
        final = (vec3(1.0) - 2.0 * blend) * final * final + 2.0 * blend * final;
        final = mix(color.rgb, final, weight);

        gl_FragColor = vec4(clamp(final, 0.0, 1.0) * color.a, color.a);
      }
    `}sendUniformData(e,t){e.uniform1f(t.uIntensity,this.uIntensity),e.uniform1f(t.uTime,this.uTime),e.uniform1f(t.uColorSaturation,this.uColorSaturation)}applyTo2d({imageData:e}){let{data:t}=e,i=40*this.uIntensity;for(let e=0;e<t.length;e+=4){let r=(Math.random()-.5)*i;t[e]=o(t[e]+r),t[e+1]=o(t[e+1]+r),t[e+2]=o(t[e+2]+r)}}}i(G,"Grain");class A extends t{static type="Fiber";static uniformLocations=["uIntensity","uRoughness","uScale"];uIntensity=.4;uRoughness=.5;uScale=1;constructor(e){super(),e?.uIntensity!==void 0&&(this.uIntensity=e.uIntensity),e?.uRoughness!==void 0&&(this.uRoughness=e.uRoughness),e?.uScale!==void 0&&(this.uScale=e.uScale)}getFragmentSource(){return`
      precision highp float;
      varying vec2 vTexCoord;
      uniform sampler2D uTexture;
      uniform float uIntensity, uRoughness, uScale;

      float hashF(vec2 p){
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
      }

      float pulp_noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        float a = hashF(i);
        float b = hashF(i + vec2(1.0, 0.0));
        float c = hashF(i + vec2(0.0, 1.0));
        float d = hashF(i + vec2(1.0, 1.0));
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
      }

      void main(){
        vec2 uv = vTexCoord;
        vec4 color = texture2D(uTexture, uv);
        if (color.a < 0.01) discard;

        float warp = hashF(uv * 4.0) * 0.15;
        vec2 p = uv * 320.0 * uScale + warp;
        
        float f1 = pulp_noise(p);
        float f2 = pulp_noise(p * 2.2 + 8.0);
        float n = (f1 * 0.65 + f2 * 0.35);

        float tooth = smoothstep(0.42, 0.58, n);
        float shading = 1.0 - (tooth * 0.18 * uRoughness * uIntensity);
        
        vec3 final = color.rgb * shading;
        final += (1.0 - shading) * 0.05 * uIntensity;

        gl_FragColor = vec4(clamp(final, 0.0, 1.0) * color.a, color.a);
      }
    `}sendUniformData(e,t){e.uniform1f(t.uIntensity,this.uIntensity),e.uniform1f(t.uRoughness,this.uRoughness),e.uniform1f(t.uScale,this.uScale)}applyTo2d({imageData:e}){let{data:t}=e,i=40*this.uIntensity;for(let e=0;e<t.length;e+=4){let r=(Math.random()-.5)*i;t[e]=o(t[e]+r),t[e+1]=o(t[e+1]+r),t[e+2]=o(t[e+2]+r)}}}i(A,"Fiber");class _ extends t{static type="EliteHalftone";static uniformLocations=["uSize","uIntensity"];uSize=10;uIntensity=.5;constructor(e){super(),e?.uSize!==void 0&&(this.uSize=e.uSize),e?.uIntensity!==void 0&&(this.uIntensity=e.uIntensity)}getFragmentSource(){return`
      precision highp float;
      varying vec2 vTexCoord;
      uniform sampler2D uTexture;
      uniform float uSize;
      uniform float uIntensity;
      void main(){
        vec2 uv=vTexCoord;
        float cs=uSize*0.010;
        vec2 cell=floor(uv/cs)*cs+cs*0.5;
        vec4 cc=texture2D(uTexture,clamp(cell,0.0,1.0));
        float cl=dot(cc.rgb,vec3(0.299,0.587,0.114));
        vec2 grid=(uv-cell)/cs;
        float dist=length(grid);
        float radius=(1.0-cl)*0.52*uIntensity;
        float mask=smoothstep(radius+0.025,radius-0.025,dist);
        vec3 final=mix(vec3(1.0),cc.rgb,mask);
        gl_FragColor=vec4(final,texture2D(uTexture,uv).a);
      }
    `}sendUniformData(e,t){e.uniform1f(t.uSize,this.uSize),e.uniform1f(t.uIntensity,this.uIntensity)}applyTo2d({imageData:e}){let{data:t,width:i,height:o}=e,r=Math.max(2,Math.round(this.uSize));for(let e=0;e<o;e+=r)for(let u=0;u<i;u+=r){let a=Math.min(u+Math.floor(r/2),i-1),n=(Math.min(e+Math.floor(r/2),o-1)*i+a)*4,s=r/2*(1-(.299*t[n]+.587*t[n+1]+.114*t[n+2])/255)*this.uIntensity;for(let a=0;a<r&&e+a<o;a++)for(let o=0;o<r&&u+o<i;o++){let l=((e+a)*i+(u+o))*4;Math.sqrt((o-r/2)**2+(a-r/2)**2)<s?(t[l]=t[n],t[l+1]=t[n+1],t[l+2]=t[n+2]):(t[l]=255,t[l+1]=255,t[l+2]=255)}}}}i(_,"EliteHalftone");class B extends t{static type="ASCIIFilter";cellSize=8;intensity=1;constructor(e){super(),e?.uSize!==void 0&&(this.cellSize=e.uSize),e?.intensity!==void 0&&(this.intensity=e.intensity)}applyTo2d({imageData:e}){let{data:t,width:i,height:o}=e,r=new Uint8ClampedArray(t),u="@#S%?*+;:,. ";for(let e=0;e<o;e+=this.cellSize)for(let a=0;a<i;a+=this.cellSize){let n=0,s=0,l=0,c=0,f=0;for(let t=0;t<this.cellSize&&e+t<o;t++)for(let o=0;o<this.cellSize&&a+o<i;o++){let u=((e+t)*i+(a+o))*4;s+=r[u],l+=r[u+1],c+=r[u+2],n+=.299*r[u]+.587*r[u+1]+.114*r[u+2],f++}let h=Math.floor((1-n/f/255)*(u.length-1)*this.intensity),v=s/f,m=l/f,d=c/f;for(let r=0;r<this.cellSize&&e+r<o;r++)for(let o=0;o<this.cellSize&&a+o<i;o++){let n=((e+r)*i+(a+o))*4;h<u.length/2?(t[n]=v,t[n+1]=m,t[n+2]=d):(t[n]=255,t[n+1]=255,t[n+2]=255)}}}}i(B,"ASCIIFilter");class P extends t{static type="Dithering";static uniformLocations=["uMode","uOpacity","uScale","uThreshold"];uMode=0;uOpacity=.4;uScale=1;uThreshold=.5;constructor(e){super(),e?.uMode!==void 0&&(this.uMode=e.uMode),e?.uOpacity!==void 0&&(this.uOpacity=e.uOpacity),e?.uScale!==void 0&&(this.uScale=e.uScale),e?.uThreshold!==void 0&&(this.uThreshold=e.uThreshold)}getFragmentSource(){return`
      precision highp float;
      varying vec2 vTexCoord;
      uniform sampler2D uTexture;
      uniform float uMode, uOpacity, uScale, uThreshold;

      float bayer4(vec2 p) {
          vec2 pos = floor(mod(p, 4.0));
          float idx = pos.x + pos.y * 4.0;
          if (idx < 1.0) return 0.0/16.0;  if (idx < 2.0) return 8.0/16.0;  if (idx < 3.0) return 2.0/16.0;  if (idx < 4.0) return 10.0/16.0;
          if (idx < 5.0) return 12.0/16.0; if (idx < 6.0) return 4.0/16.0;  if (idx < 7.0) return 14.0/16.0; if (idx < 8.0) return 6.0/16.0;
          if (idx < 9.0) return 3.0/16.0;  if (idx < 10.0) return 11.0/16.0; if (idx < 11.0) return 1.0/16.0;  if (idx < 12.0) return 9.0/16.0;
          if (idx < 13.0) return 15.0/16.0; if (idx < 14.0) return 7.0/16.0; if (idx < 15.0) return 13.0/16.0; return 5.0/16.0;
      }

      float bayer8(vec2 p) {
        vec2 pos = floor(mod(p, 8.0));
        float x = pos.x; float y = pos.y;
        float res = 0.0;
        if (mod(x, 2.0) == 0.0 && mod(y, 2.0) == 0.0) res = bayer4(pos/2.0) * 0.25;
        else if (mod(x, 2.0) == 1.0 && mod(y, 2.0) == 1.0) res = bayer4(pos/2.0) * 0.25 + 0.5;
        else if (mod(x, 2.0) == 1.0 && mod(y, 2.0) == 0.0) res = bayer4(pos/2.0) * 0.25 + 0.75;
        else res = bayer4(pos/2.0) * 0.25 + 0.25;
        return res;
      }

      float blueNoise(vec2 p) {
        return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
      }

      void main() {
          vec2 uv = vTexCoord;
          vec4 color = texture2D(uTexture, uv);
          if (color.a < 0.01) discard;

          float luma = dot(color.rgb, vec3(0.299, 0.587, 0.114));
          float limit = 0.0;

          // Align with Master Code gl_FragCoord approach
          vec2 p = gl_FragCoord.xy / max(0.1, uScale);

          if (uMode < 0.5) limit = bayer4(p);
          else if (uMode < 1.5) limit = bayer8(p);
          else limit = blueNoise(p);

          // Master Dithering Step
          float dither = step(limit, luma);
          vec3 final = mix(color.rgb, vec3(dither), uOpacity);

          gl_FragColor = vec4(final * color.a, color.a);
      }
    `}sendUniformData(e,t){e.uniform1f(t.uMode,this.uMode),e.uniform1f(t.uOpacity,this.uOpacity),e.uniform1f(t.uScale,this.uScale),e.uniform1f(t.uThreshold,this.uThreshold)}}i(P,"Dithering"),e.s(["ASCIIFilter",()=>B,"DitheringFilter",()=>P,"EliteHalftone",()=>_,"FiberFilter",()=>A,"GrainFilter",()=>G],64618);var E=e.i(64618),L=e.i(55729);let U={...v,...S,...R,...E},z={EliteHalftone:4,DitheringFilter:4,FiberFilter:4,GrainFilter:3,PosterizeFilter:3,OilPaintFilter:2,EliteClay:2,OutlineFilter:2,VignetteFilter:1,PixelateFilter:2,PrismFilter:2,BloomFilter:2,WavyFilter:2,LiquidMotionFilter:1.5,Glitch:1.5,VHSFilter:1.2,AdvancedCRTFilter:1,ASCIIFilter:.4,VolumetricDepthFilter:1,NeonGlowFilter:.5,ThermalFilter:.4,MatrixFilter:.3,LiquidMetalFilter:.6},V=Object.keys(z).filter(e=>"function"==typeof U[e]);function O(e,t,i={}){let o=U[t];if(!o)return null;let r=new o(i);for(let[e,t]of Object.entries(i))r[e]=t;let u=e.width,a=e.height;if(!r.getFragmentSource){if(!r.applyTo2d)return null;let t=(0,L.newCanvas)(u,a),i=t.getContext("2d");i.drawImage(e,0,0);let o=i.getImageData(0,0,u,a);return r.applyTo2d({imageData:o}),i.putImageData(o,0,0),t}let n=(0,L.newCanvas)(u,a),s=n.getContext("webgl",{premultipliedAlpha:!1,preserveDrawingBuffer:!0});if(!s)return null;let l=(e,t)=>{let i=s.createShader(e);if(s.shaderSource(i,t),s.compileShader(i),!s.getShaderParameter(i,s.COMPILE_STATUS))throw Error(s.getShaderInfoLog(i)??"shader");return i},c=s.createProgram();if(s.attachShader(c,l(s.VERTEX_SHADER,"attribute vec2 aPosition; varying vec2 vTexCoord; void main(){ vTexCoord = aPosition; gl_Position = vec4(aPosition * 2.0 - 1.0, 0.0, 1.0); }")),s.attachShader(c,l(s.FRAGMENT_SHADER,r.getFragmentSource())),s.linkProgram(c),!s.getProgramParameter(c,s.LINK_STATUS))return null;s.useProgram(c);let f=s.createBuffer();s.bindBuffer(s.ARRAY_BUFFER,f),s.bufferData(s.ARRAY_BUFFER,new Float32Array([0,0,1,0,0,1,0,1,1,0,1,1]),s.STATIC_DRAW);let h=s.getAttribLocation(c,"aPosition");s.enableVertexAttribArray(h),s.vertexAttribPointer(h,2,s.FLOAT,!1,0,0);let v=s.createTexture();for(let[t,i]of(s.bindTexture(s.TEXTURE_2D,v),s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,!0),s.texImage2D(s.TEXTURE_2D,0,s.RGBA,s.RGBA,s.UNSIGNED_BYTE,e),[[s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE],[s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE],[s.TEXTURE_MIN_FILTER,s.LINEAR],[s.TEXTURE_MAG_FILTER,s.LINEAR]]))s.texParameteri(s.TEXTURE_2D,t,i);let m={};for(let e of[...o.uniformLocations??[],"uTexture","uStepW","uStepH","uWidth","uHeight","uResolution"])m[e]=s.getUniformLocation(c,e);s.uniform1i(m.uTexture,0),m.uStepW&&s.uniform1f(m.uStepW,1/u),m.uStepH&&s.uniform1f(m.uStepH,1/a),m.uWidth&&s.uniform1f(m.uWidth,u),m.uHeight&&s.uniform1f(m.uHeight,a),m.uResolution&&s.uniform2f(m.uResolution,u,a),r.sendUniformData?.(s,m),s.viewport(0,0,u,a),s.clearColor(0,0,0,0),s.clear(s.COLOR_BUFFER_BIT),s.drawArrays(s.TRIANGLES,0,6);let d=(0,L.newCanvas)(u,a);return d.getContext("2d").drawImage(n,0,0),d}e.s(["FILTRI",0,V,"filtra",()=>O,"filtro",0,{id:"filtro",label:"Filtro del software",nature:"materia",pushes:{contrasto:.05,complessita:.05},available:e=>e.layers.length>0&&V.length>0,propose:(e,t)=>{let i=V.reduce((e,t)=>e+z[t],0),o=t.r()*i,r=V.find(e=>(o-=z[e])<=0)??V[0],u=U[r],a=new u,n={};for(let e of u.uniformLocations??[])"number"==typeof a[e]&&(n[e]="uTime"===e?20*t.r():a[e]*(.6+.8*t.r()));let s=e.layers.filter(e=>e.scale<.99);return{filtro:r,par:n,layer:(s.length&&.6>t.r()?s[Math.floor(t.r()*s.length)]:e.layers[Math.floor(t.r()*e.layers.length)]).id}},apply:async(e,t)=>{let i=e.layers.find(e=>e.id===t.layer);if(!i)return e;try{let o=O(i.canvas,t.filtro,t.par);return o?(0,L.replaceLayer)(e,i.id,{canvas:o}):e}catch{return e}}}],78832)}]);