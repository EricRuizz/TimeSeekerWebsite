uniform sampler2D myTexture;
varying vec2 vUV;

void main()
{
    vec4 texColor = texture(myTexture, vUV);
    csm_DiffuseColor = texColor;
}