uniform float uTime;
uniform vec2 uResolution;
varying vec2 vUv;
            
void main()
{
    vec2 uv = gl_FragCoord.xy / uResolution; //UV are not normalized, they are stretch so screen has 0->1
    csm_DiffuseColor = vec4(sin(uv.x + uTime), cos(uv.y - uTime), sin(uTime), 1.0);

    csm_DiffuseColor = vec4(uv, 0, 1);
    float noiseA = gln_simplex(uv * 1.0 + vec2(uTime * 0.1, uTime * 0.2));
    noiseA = gln_normalize(noiseA);
    csm_DiffuseColor = vec4(noiseA, noiseA, noiseA, 1);
}