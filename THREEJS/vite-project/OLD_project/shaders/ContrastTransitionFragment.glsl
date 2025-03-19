precision mediump float;

uniform sampler2D tDiffuse;
varying vec2 vUV;

uniform float uContrast;
uniform float uSubtraction;

void main() {
    vec4 base = texture2D(tDiffuse, vUV);

    vec3 contrastAdjustment = ((base.rgb - 0.5) * uContrast + 0.5) - uSubtraction;

    gl_FragColor = clamp(vec4(contrastAdjustment, base.a), 0.0, 1.0);
}