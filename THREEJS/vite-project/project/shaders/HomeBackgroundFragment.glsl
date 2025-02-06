uniform float uTime;
uniform vec2 uResolution;
varying vec2 vUv;
            
void main()
{
    vec2 uv = gl_FragCoord.xy / uResolution;
    csm_DiffuseColor = vec4(sin(uv.x + uTime), cos(uv.y - uTime), sin(uTime), 1.0);
}