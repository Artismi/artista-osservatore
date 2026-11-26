module.exports=[17396,a=>{"use strict";let b=class{applyTo(){}},c=(...a)=>{};function d(a,b=0,c=255){return Math.min(c,Math.max(b,a))}let e=`
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
`,f=`
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
`,g=`
  float gnoise(vec2 co){
    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
  }
`;class h extends b{static type="ThermalFilter";static uniformLocations=["uIntensity","uShift","uHaze","uThreshold","uTime"];uIntensity=1;uShift=0;uHaze=.6;uThreshold=1;uTime=0;constructor(a){super(),a?.uIntensity!==void 0&&(this.uIntensity=a.uIntensity),a?.uShift!==void 0&&(this.uShift=a.uShift),a?.uHaze!==void 0&&(this.uHaze=a.uHaze),a?.uThreshold!==void 0&&(this.uThreshold=a.uThreshold),a?.uTime!==void 0&&(this.uTime=a.uTime)}getFragmentSource(){return`
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
    `}sendUniformData(a,b){a.uniform1f(b.uIntensity,this.uIntensity),a.uniform1f(b.uShift,this.uShift),a.uniform1f(b.uHaze,this.uHaze),a.uniform1f(b.uThreshold,this.uThreshold),a.uniform1f(b.uTime,this.uTime)}applyTo2d({imageData:a}){let{data:b}=a,c=[[0,0,51],[0,0,255],[0,255,255],[0,230,0],[255,255,0],[255,51,0],[255,255,255]],d=[0,.15,.35,.55,.7,.85,1];for(let a=0;a<b.length;a+=4){let e=Math.min(1,Math.max(0,(.299*b[a]+.587*b[a+1]+.114*b[a+2])/255+this.uShift)),f=0;for(;f<d.length-2&&e>d[f+1];)f++;let g=(e-d[f])/(d[f+1]-d[f]),[h,i,j]=c[f],[k,l,m]=c[f+1],n=h+(k-h)*g,o=i+(l-i)*g,p=j+(m-j)*g;b[a]=b[a]*(1-this.uIntensity)+n*this.uIntensity,b[a+1]=b[a+1]*(1-this.uIntensity)+o*this.uIntensity,b[a+2]=b[a+2]*(1-this.uIntensity)+p*this.uIntensity}}}c(h,"ThermalFilter");class i extends b{static type="PrismFilter";static uniformLocations=["uDispersion","uDistortion","uRadius"];uDispersion=.5;uDistortion=.4;uRadius=1;constructor(a){super(),a?.uDispersion!==void 0&&(this.uDispersion=a.uDispersion),a?.uDistortion!==void 0&&(this.uDistortion=a.uDistortion),a?.uRadius!==void 0&&(this.uRadius=a.uRadius)}getFragmentSource(){return`
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
    `}sendUniformData(a,b){a.uniform1f(b.uDispersion,this.uDispersion),a.uniform1f(b.uDistortion,this.uDistortion),a.uniform1f(b.uRadius,this.uRadius)}applyTo2d({imageData:a}){let{data:b,width:c,height:d}=a,e=new Uint8ClampedArray(b),f=Math.round(10*this.uDispersion);for(let a=0;a<d;a++)for(let d=0;d<c;d++){let g=(a*c+d)*4,h=(a*c+Math.max(0,d-f))*4,i=(a*c+Math.min(c-1,d+f))*4;b[g]=e[h],b[g+2]=e[i]}}}c(i,"PrismFilter");class j extends b{static type="NeonGlow";static uniformLocations=["uIntensity","uGlowRange","uFlicker","uTime","uGlowTint"];uIntensity=.8;uGlowRange=1.5;uFlicker=.4;uTime=0;uGlowTint=[0,255,255];constructor(a){super(),a?.uIntensity!==void 0&&(this.uIntensity=a.uIntensity),a?.uGlowRange!==void 0&&(this.uGlowRange=a.uGlowRange),a?.uFlicker!==void 0&&(this.uFlicker=a.uFlicker),a?.uTime!==void 0&&(this.uTime=a.uTime),a?.uGlowTint!==void 0&&(this.uGlowTint=a.uGlowTint)}getFragmentSource(){return`
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
    `}sendUniformData(a,b){a.uniform1f(b.uIntensity,this.uIntensity),a.uniform1f(b.uGlowRange,this.uGlowRange),a.uniform1f(b.uFlicker,this.uFlicker),a.uniform1f(b.uTime,this.uTime),a.uniform3fv(b.uGlowTint,new Float32Array(this.uGlowTint.map(a=>a/255)))}applyTo2d({imageData:a}){let{data:b}=a,c=60*this.uIntensity;for(let a=0;a<b.length;a+=4){let d=(.299*b[a]+.587*b[a+1]+.114*b[a+2])/255;b[a]=Math.min(255,b[a]+c*(1-d)),b[a+1]=Math.min(255,b[a+1]+c*(1-d)),b[a+2]=Math.min(255,b[a+2]+c*(1-d))}}}c(j,"NeonGlow");class k extends b{static type="Holographic";static uniformLocations=["uThickness","uIridescence","uGlow","uTime","uScanlineSpeed","uBaseTint"];uThickness=1.5;uIridescence=.6;uGlow=.5;uTime=0;uScanlineSpeed=1;uBaseTint=[150,220,255];constructor(a){super(),a?.uThickness!==void 0&&(this.uThickness=a.uThickness),a?.uIridescence!==void 0&&(this.uIridescence=a.uIridescence),a?.uGlow!==void 0&&(this.uGlow=a.uGlow),a?.uTime!==void 0&&(this.uTime=a.uTime),a?.uScanlineSpeed!==void 0&&(this.uScanlineSpeed=a.uScanlineSpeed),a?.uBaseTint!==void 0&&(this.uBaseTint=a.uBaseTint)}getFragmentSource(){return`
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
        
        vec3 tint = uBaseTint; // gi\xe0 in 0..1 (sendUniformData divide per 255)
        vec3 base = color.rgb * tint;
        vec3 final = base + irid + vec3(scan + flicker) + vec3(fresnel * 0.5);
        float alpha = color.a * (0.8 + fresnel * 0.5);
        
        gl_FragColor = vec4(clamp(final, 0.0, 1.0) * alpha, alpha);
      }
    `}sendUniformData(a,b){a.uniform1f(b.uThickness,this.uThickness),a.uniform1f(b.uIridescence,this.uIridescence),a.uniform1f(b.uGlow,this.uGlow),a.uniform1f(b.uTime,this.uTime),a.uniform1f(b.uScanlineSpeed,this.uScanlineSpeed),a.uniform3fv(b.uBaseTint,new Float32Array(this.uBaseTint.map(a=>a/255)))}applyTo2d({imageData:a}){let{data:b}=a,c=.3*this.uIridescence;for(let a=0;a<b.length;a+=4){let e=(b[a]+b[a+1]+b[a+2])/3;b[a]=d(b[a]+255*Math.sin(.1*e)*c),b[a+1]=d(b[a+1]+255*Math.cos(.1*e)*c),b[a+2]=d(b[a+2]+255*c)}}}c(k,"Holographic");class l extends b{static type="BloomFilter";static uniformLocations=["uThreshold","uStrength","uRadius","uSoftness","uHighlightDrive","uTime","uGlowTint"];uThreshold=.5;uStrength=.8;uRadius=1.5;uSoftness=.2;uHighlightDrive=1.2;uTime=0;uGlowTint=[255,255,255];constructor(a){super(),a?.uThreshold!==void 0&&(this.uThreshold=a.uThreshold),a?.uStrength!==void 0&&(this.uStrength=a.uStrength),a?.uRadius!==void 0&&(this.uRadius=a.uRadius),a?.uSoftness!==void 0&&(this.uSoftness=a.uSoftness),a?.uHighlightDrive!==void 0&&(this.uHighlightDrive=a.uHighlightDrive),a?.uTime!==void 0&&(this.uTime=a.uTime),a?.uGlowTint!==void 0&&(this.uGlowTint=a.uGlowTint)}getFragmentSource(){return`
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
    `}sendUniformData(a,b){a.uniform1f(b.uThreshold,this.uThreshold),a.uniform1f(b.uStrength,this.uStrength),a.uniform1f(b.uRadius,this.uRadius),a.uniform1f(b.uSoftness,this.uSoftness),a.uniform1f(b.uHighlightDrive,this.uHighlightDrive),a.uniform1f(b.uTime,this.uTime),a.uniform3fv(b.uGlowTint,new Float32Array(this.uGlowTint.map(a=>a/255)))}}c(l,"BloomFilter");class m extends b{static type="PixelateFilter";static uniformLocations=["uBlockSize","uGridMode","uDither","uBevel"];uBlockSize=8;uGridMode=0;uDither=.4;uBevel=.5;constructor(a){super(),a?.uBlockSize!==void 0&&(this.uBlockSize=a.uBlockSize),a?.uGridMode!==void 0&&(this.uGridMode=a.uGridMode),a?.uDither!==void 0&&(this.uDither=a.uDither),a?.uBevel!==void 0&&(this.uBevel=a.uBevel)}getFragmentSource(){return`
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
    `}sendUniformData(a,b){a.uniform1f(b.uBlockSize,this.uBlockSize),a.uniform1f(b.uGridMode,this.uGridMode),a.uniform1f(b.uDither,this.uDither),a.uniform1f(b.uBevel,this.uBevel)}applyTo2d({imageData:a}){let{data:b}=a,c=Math.max(2,Math.round(this.uBlockSize));for(let d=0;d<a.width;d+=c)for(let e=0;e<a.height;e+=c){let f=(e*a.width+d)*4,g=b[f],h=b[f+1],i=b[f+2],j=b[f+3];for(let f=0;f<c;f++)for(let k=0;k<c;k++){let c=((e+k)*a.width+(d+f))*4;c<b.length&&(b[c]=g,b[c+1]=h,b[c+2]=i,b[c+3]=j)}}}}c(m,"PixelateFilter"),a.s(["BloomFilter",()=>l,"HolographicFilter",()=>k,"NeonGlowFilter",()=>j,"PixelateFilter",()=>m,"PrismFilter",()=>i,"ThermalFilter",()=>h],58285);var n=a.i(58285);class o extends b{static type="Glitch";static uniformLocations=["uAmount","uTime","uSeed"];uAmount=.4;uTime=0;uSeed=1;constructor(a){super(),a?.uAmount!==void 0&&(this.uAmount=a.uAmount),a?.uTime!==void 0&&(this.uTime=a.uTime),a?.uSeed!==void 0&&(this.uSeed=a.uSeed)}getFragmentSource(){return`
      precision highp float;
      varying vec2 vTexCoord;
      uniform sampler2D uTexture;
      uniform float uAmount;
      uniform float uTime;
      uniform float uSeed;

      ${g}

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
    `}sendUniformData(a,b){a.uniform1f(b.uAmount,this.uAmount),a.uniform1f(b.uTime,this.uTime),a.uniform1f(b.uSeed,this.uSeed)}applyTo2d({imageData:a}){let{data:b,width:c,height:e}=a,f=new Uint8ClampedArray(b),g=Math.round(5*this.uAmount);for(let a=0;a<e;a++){let e=Math.random()>.95-.1*this.uAmount?Math.round((Math.random()-.5)*c*.05*this.uAmount):0;for(let h=0;h<c;h++){let i=(a*c+h)*4,j=d(h+g+e,0,c-1),k=d(h-g+e,0,c-1);b[i]=f[(a*c+j)*4],b[i+1]=f[(a*c+d(h+e,0,c-1))*4+1],b[i+2]=f[(a*c+k)*4+2],b[i+3]=f[i+3]}}}}c(o,"Glitch");class p extends b{static type="Wavy";static uniformLocations=["uIntensity","uFrequency","uTime","uSpeed","uRefraction"];uIntensity=.5;uFrequency=4;uTime=0;uSpeed=.5;uRefraction=.4;constructor(a){super(),a?.uIntensity!==void 0&&(this.uIntensity=a.uIntensity),a?.uFrequency!==void 0&&(this.uFrequency=a.uFrequency),a?.uTime!==void 0&&(this.uTime=a.uTime),a?.uSpeed!==void 0&&(this.uSpeed=a.uSpeed),a?.uRefraction!==void 0&&(this.uRefraction=a.uRefraction)}getFragmentSource(){return`
      precision highp float;
      varying vec2 vTexCoord;
      uniform sampler2D uTexture;
      uniform float uIntensity, uFrequency, uTime, uSpeed, uRefraction;

      ${e}

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
    `}sendUniformData(a,b){a.uniform1f(b.uIntensity,this.uIntensity),a.uniform1f(b.uFrequency,this.uFrequency),a.uniform1f(b.uTime,this.uTime),a.uniform1f(b.uSpeed,this.uSpeed),a.uniform1f(b.uRefraction,this.uRefraction)}applyTo2d({imageData:a}){let{data:b,width:c,height:e}=a,f=new Uint8ClampedArray(b),g=12*this.uIntensity,h=this.uFrequency;for(let a=0;a<e;a++){let i=Math.round(Math.sin(a/e*h*Math.PI)*g);for(let e=0;e<c;e++){let g=(a*c+e)*4,h=d(e+i,0,c-1),j=(a*c+h)*4;b[g]=f[j],b[g+1]=f[j+1],b[g+2]=f[j+2]}}}}c(p,"Wavy");class q extends b{static type="LiquidMotion";static uniformLocations=["uIntensity","uViscosity","uComplexity","uTime","uSurfaceGlow"];uIntensity=.5;uViscosity=.4;uComplexity=3;uTime=0;uSurfaceGlow=.5;constructor(a){super(),a?.uIntensity!==void 0&&(this.uIntensity=a.uIntensity),a?.uViscosity!==void 0&&(this.uViscosity=a.uViscosity),a?.uComplexity!==void 0&&(this.uComplexity=a.uComplexity),a?.uTime!==void 0&&(this.uTime=a.uTime),a?.uSurfaceGlow!==void 0&&(this.uSurfaceGlow=a.uSurfaceGlow)}getFragmentSource(){return`
      precision highp float;
      varying vec2 vTexCoord;
      uniform sampler2D uTexture;
      uniform float uIntensity, uViscosity, uComplexity, uTime, uSurfaceGlow;

      ${e}

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
    `}sendUniformData(a,b){a.uniform1f(b.uIntensity,this.uIntensity),a.uniform1f(b.uViscosity,this.uViscosity),a.uniform1f(b.uComplexity,this.uComplexity),a.uniform1f(b.uTime,this.uTime),a.uniform1f(b.uSurfaceGlow,this.uSurfaceGlow)}applyTo2d({imageData:a}){let{data:b,width:c,height:d}=a,e=new Uint8ClampedArray(b),f=Math.round(this.uIntensity*c*.06);for(let a=0;a<d;a++){let g=Math.round(Math.sin(a/d*Math.PI*2)*f);for(let d=0;d<c;d++){let f=(a*c+d)*4,h=Math.min(c-1,Math.max(0,d+g)),i=(a*c+h)*4;b[f]=e[i],b[f+1]=e[i+1],b[f+2]=e[i+2]}}}}c(q,"LiquidMotion");class r extends b{static type="VHSFilter";static uniformLocations=["uIntensity","uBleed","uTracking","uTime"];uIntensity=.5;uBleed=.5;uTracking=.5;uTime=0;constructor(a){super(),a?.uIntensity!==void 0&&(this.uIntensity=a.uIntensity),a?.uBleed!==void 0&&(this.uBleed=a.uBleed),a?.uTracking!==void 0&&(this.uTracking=a.uTracking),a?.uTime!==void 0&&(this.uTime=a.uTime)}getFragmentSource(){return`
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
    `}sendUniformData(a,b){a.uniform1f(b.uIntensity,this.uIntensity),a.uniform1f(b.uBleed,this.uBleed),a.uniform1f(b.uTracking,this.uTracking),a.uniform1f(b.uTime,this.uTime)}applyTo2d({imageData:a}){let{data:b,width:c,height:e}=a,f=new Uint8ClampedArray(b),g=Math.round(8*this.uTracking);for(let a=0;a<e;a++){let h=Math.round(Math.sin(a/e*8)*g);for(let e=0;e<c;e++){let g=(a*c+e)*4,i=d(e+h,0,c-1),j=(a*c+i)*4;b[g]=f[j],b[g+1]=f[j+1],b[g+2]=f[j+2]}}}}c(r,"VHSFilter");class s extends b{static type="Matrix";static uniformLocations=["uIntensity","uTime"];uIntensity=.7;uTime=0;constructor(a){super(),a?.uIntensity!==void 0&&(this.uIntensity=a.uIntensity),a?.uTime!==void 0&&(this.uTime=a.uTime)}getFragmentSource(){return`
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
    `}sendUniformData(a,b){a.uniform1f(b.uIntensity,this.uIntensity),a.uniform1f(b.uTime,this.uTime)}applyTo2d({imageData:a}){let{data:b}=a;for(let a=0;a<b.length;a+=4)b[a]=Math.min(255,.3*b[a]),b[a+1]=Math.min(255,.8*b[a+1]+30*this.uIntensity),b[a+2]=Math.min(255,.3*b[a+2])}}c(s,"Matrix");class t extends b{static type="LiquidMetalFilter";static uniformLocations=["uIntensity","uTime"];uIntensity=.5;uTime=0;constructor(a){super(),a?.uIntensity!==void 0&&(this.uIntensity=a.uIntensity),a?.uTime!==void 0&&(this.uTime=a.uTime)}getFragmentSource(){return`
      precision highp float;
      varying vec2 vTexCoord;
      uniform sampler2D uTexture;
      uniform float uIntensity;
      uniform float uTime;
      ${f}
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
    `}sendUniformData(a,b){a.uniform1f(b.uIntensity,this.uIntensity),a.uniform1f(b.uTime,this.uTime)}applyTo2d({imageData:a}){let{data:b}=a;for(let a=0;a<b.length;a+=4){let c=.5*Math.sin((.299*b[a]+.587*b[a+1]+.114*b[a+2])/255*Math.PI*4*this.uIntensity)+.5,d=c>.8?255:c>.4?140:20;b[a]=d,b[a+1]=d,b[a+2]=d}}}c(t,"LiquidMetalFilter");class u extends b{static type="AdvancedCRT";static uniformLocations=["uMode","uMaskScale","uMaskIntensity","uScanlineIntensity","uDistortion","uConvergence","uBeamFocus","uPersistence","uBrightness","uTime"];uMode=1;uMaskScale=1;uMaskIntensity=.4;uScanlineIntensity=.5;uDistortion=.15;uConvergence=.3;uBeamFocus=.6;uPersistence=.4;uBrightness=1.1;uTime=0;constructor(a){super(),a?.uMode!==void 0&&(this.uMode=a.uMode),a?.uMaskScale!==void 0&&(this.uMaskScale=a.uMaskScale),a?.uMaskIntensity!==void 0&&(this.uMaskIntensity=a.uMaskIntensity),a?.uScanlineIntensity!==void 0&&(this.uScanlineIntensity=a.uScanlineIntensity),a?.uDistortion!==void 0&&(this.uDistortion=a.uDistortion),a?.uConvergence!==void 0&&(this.uConvergence=a.uConvergence),a?.uBeamFocus!==void 0&&(this.uBeamFocus=a.uBeamFocus),a?.uPersistence!==void 0&&(this.uPersistence=a.uPersistence),a?.uBrightness!==void 0&&(this.uBrightness=a.uBrightness),a?.uTime!==void 0&&(this.uTime=a.uTime)}getFragmentSource(){return`
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
    `}applyTo(a){let b=a.gl;this._persistenceTexture||(this._persistenceTexture=b.createTexture(),b.bindTexture(b.TEXTURE_2D,this._persistenceTexture),b.texImage2D(b.TEXTURE_2D,0,b.RGBA,a.sourceWidth,a.sourceHeight,0,b.RGBA,b.UNSIGNED_BYTE,null),b.texParameteri(b.TEXTURE_2D,b.TEXTURE_MIN_FILTER,b.LINEAR),b.texParameteri(b.TEXTURE_2D,b.TEXTURE_MAG_FILTER,b.LINEAR),b.texParameteri(b.TEXTURE_2D,b.TEXTURE_WRAP_S,b.CLAMP_TO_EDGE),b.texParameteri(b.TEXTURE_2D,b.TEXTURE_WRAP_T,b.CLAMP_TO_EDGE)),super.applyTo(a),b.bindTexture(b.TEXTURE_2D,this._persistenceTexture),b.copyTexImage2D(b.TEXTURE_2D,0,b.RGBA,0,0,a.sourceWidth,a.sourceHeight,0)}sendUniformData(a,b){a.uniform1f(b.uMode,this.uMode),a.uniform1f(b.uMaskScale,this.uMaskScale),a.uniform1f(b.uMaskIntensity,this.uMaskIntensity),a.uniform1f(b.uScanlineIntensity,this.uScanlineIntensity),a.uniform1f(b.uDistortion,this.uDistortion),a.uniform1f(b.uConvergence,this.uConvergence),a.uniform1f(b.uBeamFocus,this.uBeamFocus),a.uniform1f(b.uPersistence,this.uPersistence),a.uniform1f(b.uBrightness,this.uBrightness),a.uniform1f(b.uTime,this.uTime),this._persistenceTexture&&(a.activeTexture(a.TEXTURE1),a.bindTexture(a.TEXTURE_2D,this._persistenceTexture),a.uniform1i(b.uPersistenceBuffer,1),a.activeTexture(a.TEXTURE0))}}c(u,"AdvancedCRT"),a.s(["AdvancedCRTFilter",()=>u,"Glitch",()=>o,"LiquidMetalFilter",()=>t,"LiquidMotionFilter",()=>q,"MatrixFilter",()=>s,"VHSFilter",()=>r,"WavyFilter",()=>p],85475);var v=a.i(85475);class w extends b{static type="Risograph";static uniformLocations=["uDotSize","uMisregistration","uDotGain","uInk1","uInk2","uPaperColor"];uDotSize=1;uMisregistration=.2;uDotGain=.15;uInk1=[255,0,150];uInk2=[0,80,255];uPaperColor=[250,248,240];constructor(a){super(),a?.uDotSize!==void 0&&(this.uDotSize=a.uDotSize),a?.uMisregistration!==void 0&&(this.uMisregistration=a.uMisregistration),a?.uDotGain!==void 0&&(this.uDotGain=a.uDotGain),a?.uInk1!==void 0&&(this.uInk1=a.uInk1),a?.uInk2!==void 0&&(this.uInk2=a.uInk2),a?.uPaperColor!==void 0&&(this.uPaperColor=a.uPaperColor)}getFragmentSource(){return`
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

        vec3 paper = uPaperColor; // gi\xe0 in 0..1 (sendUniformData divide per 255)
        vec3 i1    = uInk1;
        vec3 i2    = uInk2;
        
        vec3 result = paper;
        result = mix(result, result * i1, mask1);
        result = mix(result, result * i2, mask2);
        
        gl_FragColor = vec4(result * color.a, color.a);
      }
    `}sendUniformData(a,b){a.uniform1f(b.uDotSize,this.uDotSize),a.uniform1f(b.uMisregistration,this.uMisregistration),a.uniform1f(b.uDotGain,this.uDotGain),a.uniform3fv(b.uInk1,new Float32Array(this.uInk1.map(a=>a/255))),a.uniform3fv(b.uInk2,new Float32Array(this.uInk2.map(a=>a/255))),a.uniform3fv(b.uPaperColor,new Float32Array(this.uPaperColor.map(a=>a/255)))}applyTo2d({imageData:a}){let{data:b}=a,c=this.uInk1,d=this.uInk2,e=this.uPaperColor;for(let a=0;a<b.length;a+=4){let f=Math.floor(2*((.299*b[a]+.587*b[a+1]+.114*b[a+2])/255))/2;f>.6?(b[a]=e[0],b[a+1]=e[1],b[a+2]=e[2]):f>.3?(b[a]=c[0],b[a+1]=c[1],b[a+2]=c[2]):(b[a]=d[0],b[a+1]=d[1],b[a+2]=d[2])}}}c(w,"Risograph");class x extends b{static type="EliteClay";static uniformLocations=["uInflate","uGlow","uMatte","uLightAngle","uTranslucency"];uInflate=.5;uGlow=.35;uMatte=.2;uLightAngle=135;uTranslucency=.4;constructor(a){super(),a?.uInflate!==void 0&&(this.uInflate=a.uInflate),a?.uGlow!==void 0&&(this.uGlow=a.uGlow),a?.uMatte!==void 0&&(this.uMatte=a.uMatte),a?.uLightAngle!==void 0&&(this.uLightAngle=a.uLightAngle),a?.uTranslucency!==void 0&&(this.uTranslucency=a.uTranslucency)}getFragmentSource(){return`
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
    `}sendUniformData(a,b){a.uniform1f(b.uInflate,this.uInflate),a.uniform1f(b.uGlow,this.uGlow),a.uniform1f(b.uMatte,this.uMatte),a.uniform1f(b.uLightAngle,this.uLightAngle),a.uniform1f(b.uTranslucency,this.uTranslucency)}applyTo2d({imageData:a}){let{data:b}=a,c=45*this.uGlow,e=18*this.uMatte;for(let a=0;a<b.length;a+=4){let f=(Math.random()-.5)*e;b[a]=d(b[a]+c+f),b[a+1]=d(b[a+1]+.85*c+f),b[a+2]=d(b[a+2]+.75*c+f)}}}c(x,"EliteClay");class y extends b{static type="OilPaint";static uniformLocations=["uRadius","uImpasto","uCoherence","uIntensity"];uRadius=4;uImpasto=.5;uCoherence=.8;uIntensity=1;constructor(a){super(),a?.uRadius!==void 0&&(this.uRadius=a.uRadius),a?.uImpasto!==void 0&&(this.uImpasto=a.uImpasto),a?.uCoherence!==void 0&&(this.uCoherence=a.uCoherence),a?.uIntensity!==void 0&&(this.uIntensity=a.uIntensity)}getFragmentSource(){return`
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
    `}sendUniformData(a,b){a.uniform1f(b.uRadius,this.uRadius),a.uniform1f(b.uImpasto,this.uImpasto),a.uniform1f(b.uCoherence,this.uCoherence),a.uniform1f(b.uIntensity,this.uIntensity)}applyTo2d({imageData:a}){let{data:b}=a;for(let a=0;a<b.length;a+=4)b[a]=d(b[a]*(1+.2*this.uImpasto)),b[a+1]=d(b[a+1]*(1+.2*this.uImpasto)),b[a+2]=d(b[a+2]*(1+.2*this.uImpasto))}}c(y,"OilPaint");class z extends b{static type="OutlineFilter";static uniformLocations=["uThickness","uSoftness","uInnerGlow","uOutlineColor"];uThickness=2;uSoftness=.1;uInnerGlow=.4;uOutlineColor=[255,255,255];constructor(a){super(),a?.uThickness!==void 0&&(this.uThickness=a.uThickness),a?.uSoftness!==void 0&&(this.uSoftness=a.uSoftness),a?.uInnerGlow!==void 0&&(this.uInnerGlow=a.uInnerGlow),a?.uOutlineColor!==void 0&&(this.uOutlineColor=a.uOutlineColor)}getFragmentSource(){return`
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
    `}sendUniformData(a,b){a.uniform1f(b.uThickness,this.uThickness),a.uniform1f(b.uSoftness,this.uSoftness),a.uniform1f(b.uInnerGlow,this.uInnerGlow),a.uniform3fv(b.uOutlineColor,new Float32Array(this.uOutlineColor.map(a=>a/255)))}applyTo2d({imageData:a}){let{data:b}=a,c=this.uOutlineColor,e=.1*this.uThickness;for(let a=0;a<b.length;a+=4)b[a+3]>0&&b[a+3]<255&&(b[a]=d(b[a]+(c[0]-b[a])*e),b[a+1]=d(b[a+1]+(c[1]-b[a+1])*e),b[a+2]=d(b[a+2]+(c[2]-b[a+2])*e))}}c(z,"OutlineFilter");class A extends b{static type="Duotone";static uniformLocations=["uShadowColor","uMidColor","uHighlightColor","uContrast","uIntensity"];uShadowColor=[0,10,60];uMidColor=[120,150,180];uHighlightColor=[255,230,200];uContrast=1;uIntensity=1;constructor(a){super(),a?.uShadowColor!==void 0&&(this.uShadowColor=a.uShadowColor),a?.uMidColor!==void 0&&(this.uMidColor=a.uMidColor),a?.uHighlightColor!==void 0&&(this.uHighlightColor=a.uHighlightColor),a?.uContrast!==void 0&&(this.uContrast=a.uContrast),a?.uIntensity!==void 0&&(this.uIntensity=a.uIntensity)}getFragmentSource(){return`
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
        
        vec3 graded = (shadowMask * uShadowColor) + (midMask * uMidColor) + (highlightMask * uHighlightColor); // i colori arrivano gi\xe0 in 0..1 (sendUniformData)
        gl_FragColor = vec4(mix(color.rgb, graded, uIntensity) * color.a, color.a);
      }
    `}sendUniformData(a,b){a.uniform3fv(b.uShadowColor,new Float32Array(this.uShadowColor.map(a=>a/255))),a.uniform3fv(b.uMidColor,new Float32Array(this.uMidColor.map(a=>a/255))),a.uniform3fv(b.uHighlightColor,new Float32Array(this.uHighlightColor.map(a=>a/255))),a.uniform1f(b.uContrast,this.uContrast),a.uniform1f(b.uIntensity,this.uIntensity)}applyTo2d({imageData:a}){let{data:b}=a,c=this.uShadowColor,d=this.uHighlightColor;for(let a=0;a<b.length;a+=4){let e=(.21*b[a]+.72*b[a+1]+.07*b[a+2])/255;b[a]=Math.round(c[0]+(d[0]-c[0])*e),b[a+1]=Math.round(c[1]+(d[1]-c[1])*e),b[a+2]=Math.round(c[2]+(d[2]-c[2])*e)}}}c(A,"Duotone");class B extends b{static type="PosterizeFilter";static uniformLocations=["uSteps","uDither","uVibrance","uThreshold"];uSteps=4;uDither=.5;uVibrance=.4;uThreshold=.5;constructor(a){super(),a?.uSteps!==void 0&&(this.uSteps=a.uSteps),a?.uDither!==void 0&&(this.uDither=a.uDither),a?.uVibrance!==void 0&&(this.uVibrance=a.uVibrance),a?.uThreshold!==void 0&&(this.uThreshold=a.uThreshold)}getFragmentSource(){return`
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
    `}sendUniformData(a,b){a.uniform1f(b.uSteps,this.uSteps),a.uniform1f(b.uDither,this.uDither),a.uniform1f(b.uVibrance,this.uVibrance),a.uniform1f(b.uThreshold,this.uThreshold)}applyTo2d({imageData:a}){let{data:b}=a,c=255/Math.max(1,this.uSteps-1);for(let a=0;a<b.length;a+=4)b[a]=Math.round(b[a]/c)*c,b[a+1]=Math.round(b[a+1]/c)*c,b[a+2]=Math.round(b[a+2]/c)*c}}c(B,"PosterizeFilter");class C extends b{static type="VignetteFilter";static uniformLocations=["uStrength","uRadius","uAspect","uAberration","uSaturationPreserve"];uStrength=.7;uRadius=.5;uAspect=1;uAberration=.3;uSaturationPreserve=.6;constructor(a){super(),a?.uStrength!==void 0&&(this.uStrength=a.uStrength),a?.uRadius!==void 0&&(this.uRadius=a.uRadius),a?.uAspect!==void 0&&(this.uAspect=a.uAspect),a?.uAberration!==void 0&&(this.uAberration=a.uAberration),a?.uSaturationPreserve!==void 0&&(this.uSaturationPreserve=a.uSaturationPreserve)}getFragmentSource(){return`
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
    `}sendUniformData(a,b){a.uniform1f(b.uStrength,this.uStrength),a.uniform1f(b.uRadius,this.uRadius),a.uniform1f(b.uAspect,this.uAspect),a.uniform1f(b.uAberration,this.uAberration),a.uniform1f(b.uSaturationPreserve,this.uSaturationPreserve)}applyTo2d({imageData:a}){let{data:b}=a,c=.5*this.uStrength;for(let a=0;a<b.length;a+=4){let e=(.21*b[a]+.72*b[a+1]+.07*b[a+2])/255;b[a]=d(b[a]-(255-b[a])*c*(1-e)),b[a+1]=d(b[a+1]-(255-b[a+1])*c*(1-e)),b[a+2]=d(b[a+2]-(255-b[a+2])*c*(1-e))}}}c(C,"VignetteFilter");class D extends b{static type="VolumetricDepthFilter";static uniformLocations=["uDepth","uOpacity","uAngle"];uDepth=.3;uOpacity=.72;uAngle=2.356;constructor(a){super(),a?.uDepth!==void 0&&(this.uDepth=a.uDepth),a?.uOpacity!==void 0&&(this.uOpacity=a.uOpacity),a?.uAngle!==void 0&&(this.uAngle=a.uAngle)}getFragmentSource(){return`
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
    `}sendUniformData(a,b){a.uniform1f(b.uDepth,this.uDepth),a.uniform1f(b.uOpacity,this.uOpacity),a.uniform1f(b.uAngle,this.uAngle)}applyTo2d({imageData:a}){let{data:b,width:c,height:d}=a,e=new Uint8ClampedArray(b),f=Math.round(this.uDepth*c*.06),g=Math.cos(this.uAngle),h=Math.sin(this.uAngle);for(let a=0;a<d;a++)for(let i=0;i<c;i++){let j=(a*c+i)*4,k=0,l=0,m=0,n=0;for(let b=8;b>=1;b--){let j=b/8,o=Math.round(i-g*j*f),p=Math.round(a-h*j*f);if(o<0||o>=c||p<0||p>=d)continue;let q=(p*c+o)*4,r=e[q+3]/255;if(r<.01)continue;let s=r*this.uOpacity*(.2+(1-j)*.45),t=n/255,u=s+t*(1-s);u>.001&&(k=(e[q]/255*(1-.72*j)*s+k/255*t*(1-s))/u*255,l=(e[q+1]/255*(1-.72*j)*s+l/255*t*(1-s))/u*255,m=(e[q+2]/255*(1-.72*j)*s+m/255*t*(1-s))/u*255,n=255*u)}let o=e[j+3]/255,p=n/255,q=o+p*(1-o);q>.001?(b[j]=(e[j]/255*o+k/255*p*(1-o))/q*255,b[j+1]=(e[j+1]/255*o+l/255*p*(1-o))/q*255,b[j+2]=(e[j+2]/255*o+m/255*p*(1-o))/q*255,b[j+3]=255*q):b[j]=b[j+1]=b[j+2]=b[j+3]=0}}}c(D,"VolumetricDepthFilter"),a.s(["DuotoneFilter",()=>A,"EliteClay",()=>x,"OilPaintFilter",()=>y,"OutlineFilter",()=>z,"PosterizeFilter",()=>B,"Risograph",()=>w,"VignetteFilter",()=>C,"VolumetricDepthFilter",()=>D],54232);var E=a.i(54232);class F extends b{static type="Grain";static uniformLocations=["uIntensity","uTime","uColorSaturation"];uIntensity=.4;uTime=0;uColorSaturation=.35;constructor(a){super(),a?.uIntensity!==void 0&&(this.uIntensity=a.uIntensity),a?.uTime!==void 0&&(this.uTime=a.uTime),a?.uColorSaturation!==void 0&&(this.uColorSaturation=a.uColorSaturation)}getFragmentSource(){return`
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
    `}sendUniformData(a,b){a.uniform1f(b.uIntensity,this.uIntensity),a.uniform1f(b.uTime,this.uTime),a.uniform1f(b.uColorSaturation,this.uColorSaturation)}applyTo2d({imageData:a}){let{data:b}=a,c=40*this.uIntensity;for(let a=0;a<b.length;a+=4){let e=(Math.random()-.5)*c;b[a]=d(b[a]+e),b[a+1]=d(b[a+1]+e),b[a+2]=d(b[a+2]+e)}}}c(F,"Grain");class G extends b{static type="Fiber";static uniformLocations=["uIntensity","uRoughness","uScale"];uIntensity=.4;uRoughness=.5;uScale=1;constructor(a){super(),a?.uIntensity!==void 0&&(this.uIntensity=a.uIntensity),a?.uRoughness!==void 0&&(this.uRoughness=a.uRoughness),a?.uScale!==void 0&&(this.uScale=a.uScale)}getFragmentSource(){return`
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
    `}sendUniformData(a,b){a.uniform1f(b.uIntensity,this.uIntensity),a.uniform1f(b.uRoughness,this.uRoughness),a.uniform1f(b.uScale,this.uScale)}applyTo2d({imageData:a}){let{data:b}=a,c=40*this.uIntensity;for(let a=0;a<b.length;a+=4){let e=(Math.random()-.5)*c;b[a]=d(b[a]+e),b[a+1]=d(b[a+1]+e),b[a+2]=d(b[a+2]+e)}}}c(G,"Fiber");class H extends b{static type="EliteHalftone";static uniformLocations=["uSize","uIntensity"];uSize=10;uIntensity=.5;constructor(a){super(),a?.uSize!==void 0&&(this.uSize=a.uSize),a?.uIntensity!==void 0&&(this.uIntensity=a.uIntensity)}getFragmentSource(){return`
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
    `}sendUniformData(a,b){a.uniform1f(b.uSize,this.uSize),a.uniform1f(b.uIntensity,this.uIntensity)}applyTo2d({imageData:a}){let{data:b,width:c,height:d}=a,e=Math.max(2,Math.round(this.uSize));for(let a=0;a<d;a+=e)for(let f=0;f<c;f+=e){let g=Math.min(f+Math.floor(e/2),c-1),h=(Math.min(a+Math.floor(e/2),d-1)*c+g)*4,i=e/2*(1-(.299*b[h]+.587*b[h+1]+.114*b[h+2])/255)*this.uIntensity;for(let g=0;g<e&&a+g<d;g++)for(let d=0;d<e&&f+d<c;d++){let j=((a+g)*c+(f+d))*4;Math.sqrt((d-e/2)**2+(g-e/2)**2)<i?(b[j]=b[h],b[j+1]=b[h+1],b[j+2]=b[h+2]):(b[j]=255,b[j+1]=255,b[j+2]=255)}}}}c(H,"EliteHalftone");class I extends b{static type="ASCIIFilter";cellSize=8;intensity=1;constructor(a){super(),a?.uSize!==void 0&&(this.cellSize=a.uSize),a?.intensity!==void 0&&(this.intensity=a.intensity)}applyTo2d({imageData:a}){let{data:b,width:c,height:d}=a,e=new Uint8ClampedArray(b),f="@#S%?*+;:,. ";for(let a=0;a<d;a+=this.cellSize)for(let g=0;g<c;g+=this.cellSize){let h=0,i=0,j=0,k=0,l=0;for(let b=0;b<this.cellSize&&a+b<d;b++)for(let d=0;d<this.cellSize&&g+d<c;d++){let f=((a+b)*c+(g+d))*4;i+=e[f],j+=e[f+1],k+=e[f+2],h+=.299*e[f]+.587*e[f+1]+.114*e[f+2],l++}let m=Math.floor((1-h/l/255)*(f.length-1)*this.intensity),n=i/l,o=j/l,p=k/l;for(let e=0;e<this.cellSize&&a+e<d;e++)for(let d=0;d<this.cellSize&&g+d<c;d++){let h=((a+e)*c+(g+d))*4;m<f.length/2?(b[h]=n,b[h+1]=o,b[h+2]=p):(b[h]=255,b[h+1]=255,b[h+2]=255)}}}}c(I,"ASCIIFilter");class J extends b{static type="Dithering";static uniformLocations=["uMode","uOpacity","uScale","uThreshold"];uMode=0;uOpacity=.4;uScale=1;uThreshold=.5;constructor(a){super(),a?.uMode!==void 0&&(this.uMode=a.uMode),a?.uOpacity!==void 0&&(this.uOpacity=a.uOpacity),a?.uScale!==void 0&&(this.uScale=a.uScale),a?.uThreshold!==void 0&&(this.uThreshold=a.uThreshold)}getFragmentSource(){return`
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
    `}sendUniformData(a,b){a.uniform1f(b.uMode,this.uMode),a.uniform1f(b.uOpacity,this.uOpacity),a.uniform1f(b.uScale,this.uScale),a.uniform1f(b.uThreshold,this.uThreshold)}}c(J,"Dithering"),a.s(["ASCIIFilter",()=>I,"DitheringFilter",()=>J,"EliteHalftone",()=>H,"FiberFilter",()=>G,"GrainFilter",()=>F],46247);var K=a.i(46247),L=a.i(11761);let M={...n,...v,...E,...K},N={Risograph:4,DuotoneFilter:3,HolographicFilter:.5,EliteHalftone:4,DitheringFilter:4,FiberFilter:4,GrainFilter:3,PosterizeFilter:3,OilPaintFilter:2,EliteClay:2,OutlineFilter:2,VignetteFilter:1,PixelateFilter:2,PrismFilter:2,BloomFilter:2,WavyFilter:2,LiquidMotionFilter:1.5,Glitch:1.5,VHSFilter:1.2,AdvancedCRTFilter:1,ASCIIFilter:.4,VolumetricDepthFilter:1,NeonGlowFilter:.5,ThermalFilter:.4,MatrixFilter:.3,LiquidMetalFilter:.6},O=Object.keys(N).filter(a=>"function"==typeof M[a]);function P(a,b,c={}){let d=M[b];if(!d)return null;let e=new d(c);for(let[a,b]of Object.entries(c))e[a]=b;let f=a.width,g=a.height;if(!e.getFragmentSource){if(!e.applyTo2d)return null;let b=(0,L.newCanvas)(f,g),c=b.getContext("2d");c.drawImage(a,0,0);let d=c.getImageData(0,0,f,g);return e.applyTo2d({imageData:d}),c.putImageData(d,0,0),b}let h=(0,L.newCanvas)(f,g),i=h.getContext("webgl",{premultipliedAlpha:!1,preserveDrawingBuffer:!0});if(!i)return null;let j=(a,b)=>{let c=i.createShader(a);if(i.shaderSource(c,b),i.compileShader(c),!i.getShaderParameter(c,i.COMPILE_STATUS))throw Error(i.getShaderInfoLog(c)??"shader");return c},k=i.createProgram();if(i.attachShader(k,j(i.VERTEX_SHADER,"attribute vec2 aPosition; varying vec2 vTexCoord; void main(){ vTexCoord = aPosition; gl_Position = vec4(aPosition * 2.0 - 1.0, 0.0, 1.0); }")),i.attachShader(k,j(i.FRAGMENT_SHADER,e.getFragmentSource())),i.linkProgram(k),!i.getProgramParameter(k,i.LINK_STATUS))return null;i.useProgram(k);let l=i.createBuffer();i.bindBuffer(i.ARRAY_BUFFER,l),i.bufferData(i.ARRAY_BUFFER,new Float32Array([0,0,1,0,0,1,0,1,1,0,1,1]),i.STATIC_DRAW);let m=i.getAttribLocation(k,"aPosition");i.enableVertexAttribArray(m),i.vertexAttribPointer(m,2,i.FLOAT,!1,0,0);let n=i.createTexture();for(let[b,c]of(i.bindTexture(i.TEXTURE_2D,n),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!0),i.texImage2D(i.TEXTURE_2D,0,i.RGBA,i.RGBA,i.UNSIGNED_BYTE,a),[[i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE],[i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE],[i.TEXTURE_MIN_FILTER,i.LINEAR],[i.TEXTURE_MAG_FILTER,i.LINEAR]]))i.texParameteri(i.TEXTURE_2D,b,c);let o={};for(let a of[...d.uniformLocations??[],"uTexture","uStepW","uStepH","uWidth","uHeight","uResolution"])o[a]=i.getUniformLocation(k,a);i.uniform1i(o.uTexture,0),o.uStepW&&i.uniform1f(o.uStepW,1/f),o.uStepH&&i.uniform1f(o.uStepH,1/g),o.uWidth&&i.uniform1f(o.uWidth,f),o.uHeight&&i.uniform1f(o.uHeight,g),o.uResolution&&i.uniform2f(o.uResolution,f,g),e.sendUniformData?.(i,o),i.viewport(0,0,f,g),i.clearColor(0,0,0,0),i.clear(i.COLOR_BUFFER_BIT),i.drawArrays(i.TRIANGLES,0,6);let p=(0,L.newCanvas)(f,g);return p.getContext("2d").drawImage(h,0,0),p}a.s(["FILTRI",0,O,"filtra",()=>P,"filtro",0,{id:"filtro",label:"Filtro del software",nature:"materia",pushes:{contrasto:.05,complessita:.05},available:a=>a.layers.length>0&&O.length>0,propose:(a,b)=>{let c=O.reduce((a,b)=>a+N[b],0),d=b.r()*c,e=O.find(a=>(d-=N[a])<=0)??O[0],f=M[e],g=new f,h={};for(let a of f.uniformLocations??[])"number"==typeof g[a]&&(h[a]="uTime"===a?20*b.r():g[a]*(.6+.8*b.r()));let i=a.layers.filter(a=>a.scale<.99);return{filtro:e,par:h,layer:(i.length&&.6>b.r()?i[Math.floor(b.r()*i.length)]:a.layers[Math.floor(b.r()*a.layers.length)]).id}},apply:async(a,b)=>{let c=a.layers.find(a=>a.id===b.layer);if(!c)return a;try{let d=P(c.canvas,b.filtro,b.par);return d?(0,L.replaceLayer)(a,c.id,{canvas:d}):a}catch{return a}}}],17396)}];

//# sourceMappingURL=src_lib_studio-agent_hands_filtri_ts_12e4432c._.js.map