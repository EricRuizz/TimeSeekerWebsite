precision mediump float;

varying vec2 vUV;

void main() {
    vUV = uv;
    gl_Position = vec4(position, 1.0);
}