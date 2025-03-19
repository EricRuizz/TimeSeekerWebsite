precision mediump float;

varying vec2 vUV;

uniform float uActive;
uniform float uTime;
uniform float uSpeed;
uniform vec3 uMainColor;

void main() {
    float sat = 0.25;
    vec4 temp = vec4(sat, sat, sat, 1.0);
    vec4 hiddenColor = vec4(0.0, 0.0, 0.0, 0.0);

    csm_DiffuseColor = hiddenColor;
}