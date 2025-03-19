uniform sampler2D myTexture;
varying vec2 vUV;

uniform float uTime;

uniform float displacementScale;
uniform float displacementStrength;

void main()
{
    vec2 displacedUV = vUV + ((gln_perlin(vUV * displacementScale + vec2(uTime)) * displacementStrength));// - displacementStrength / 2.0);
    vec4 texColor = texture(myTexture, displacedUV);

    csm_DiffuseColor = texColor;
}