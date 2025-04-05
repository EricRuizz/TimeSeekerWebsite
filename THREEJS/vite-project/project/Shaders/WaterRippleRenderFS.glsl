uniform sampler2D textureA;
uniform sampler2D textureB;
uniform vec2 resolution;
uniform float resolutionProportion;
uniform float scale;
varying vec2 vUv;

void main()
{
    vec2 uv = vUv.xy / scale;
    uv.x *= resolutionProportion;
    
    vec2 effectiveSize = vec2(1.0 / scale);
    effectiveSize.x *= resolutionProportion;

    vec2 offset = (1.0 - effectiveSize) * 0.5;
    uv += offset;

    vec4 data = texture2D(textureA, uv);

    vec2 distortion = 0.3 * data.zw;
    vec4 color = texture2D(textureB, uv + distortion);

    vec3 normal = normalize(vec3(-data.z * 2.0, 0.5, -data.w * 2.0));
    vec3 lightDir = normalize(vec3(-3.0, 10.0, 3.0));
    float specular = pow(max(0.0, dot(normal, lightDir)), 60.0) * 1.5; //1.5 to 10.5 + diturb water, wait, and see (WRRFS.glsl)

    //TESTING
    //gl_FragColor = vec4(uv.x, uv.y, 0, 1);
    //return;
    //TESTING

    gl_FragColor = color + vec4(specular);
}