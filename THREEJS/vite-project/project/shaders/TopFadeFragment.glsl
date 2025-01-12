precision mediump float;

uniform sampler2D tDiffuse;
varying vec2 vUV;

uniform float uTopFadeCoef;

void main() {
    vec4 base = texture2D(tDiffuse, vUV);

    vec3 topFadeColor = vec3(0.8, 1.0, 1.0);
    float fadeParam = clamp((1.0 - (pow(vUV.y - 0.1, 7.0) * uTopFadeCoef)), 0.0, 1.0);
    vec3 contrastAdjustment = topFadeColor * (1.0 - fadeParam) + base.rgb * fadeParam;
    //vec3 contrastAdjustment = vec3(1.0, 0.0, 1.0) * (1.0 - (pow(vUV.y - 0.25, 1.0) * uTopFadeCoef));

    gl_FragColor = clamp(vec4(contrastAdjustment, base.a), 0.0, 1.0);
}