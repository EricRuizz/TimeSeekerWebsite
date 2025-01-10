precision mediump float;

uniform sampler2D tDiffuse;
varying vec2 vUV;

uniform float uTopFadeCoef;

void main() {
    vec4 base = texture2D(tDiffuse, vUV);

    vec3 contrastAdjustment = base.rgb - (pow(vUV.y - 0.25, 4.0) * uTopFadeCoef);

    gl_FragColor = clamp(vec4(contrastAdjustment, base.a), 0.0, 1.0);
}