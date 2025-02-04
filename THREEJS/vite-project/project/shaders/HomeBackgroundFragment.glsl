uniform sampler2D myTexture;
varying vec2 vUV;

uniform float uTime;

uniform float uDisplacementScale;
uniform float uDisplacementStrength;

void main()
{
    vec2 displacedUV = vUV + ((gln_perlin(vUV * displacementScale + vec2(uTime)) * displacementStrength));
    vec4 color = texture(myTexture, displacedUV);

    csm_DiffuseColor = color;
}