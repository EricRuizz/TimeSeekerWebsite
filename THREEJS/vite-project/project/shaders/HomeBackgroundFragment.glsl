uniform float uTime;
uniform float uAnimStrength;
uniform float uAnimSpeed;
uniform float uIdleNoiseScrollSpeed;
uniform vec2 uResolution;
varying vec2 vUv;
uniform sampler2D maskTexture;

// Gradient Colors
vec3 transitionColor = vec3(0.0);
vec3 color0 = vec3(0.0);
vec3 color1 = vec3(0.2, 0.02, 0.1);
vec3 color2 = vec3(0.83, 0.235, 0.4);
vec3 color3 = vec3(1.0, 0.5, 0.455);

// Graditn Segments
float gs0 = 0.1;
float gs1 = 0.6;
float gs2 = 0.8;

// General
float brightness = 0.5;


void main()
{
    vec2 uv = gl_FragCoord.xy / uResolution;
    float resolutionProportion = uResolution.x / uResolution.y;
    uv.x = uv.x * resolutionProportion - resolutionProportion / 4.0;


    float overallNoise = gln_normalize(gln_simplex((uv + uTime * 2.0) * 250.0)) * 0.05;


    float scrollTime = uTime * uIdleNoiseScrollSpeed;
    float maskA_NoiseA = gln_normalize(gln_simplex(uv * 0.3 + vec2(scrollTime * 0.1, scrollTime * 0.2)));
    float maskA_NoiseB = gln_normalize(gln_simplex(uv * 0.8 + vec2(scrollTime * -0.3, scrollTime * 0.1)));
    vec3 maskA = vec3(maskA_NoiseA * maskA_NoiseB);


    float maskT_NoiseA = gln_normalize(gln_simplex(uv * 0.7 + vec2(scrollTime * -0.15, scrollTime * 0.2)));
    float maskT_NoiseB = gln_normalize(gln_simplex(uv * 0.4 + vec2(scrollTime * 0.2, scrollTime * -0.3)));
    vec3 maskT = vec3(maskT_NoiseA * maskT_NoiseB);


    vec4 maskTexColor = texture(maskTexture, uv);
    vec3 gradientGrayscale = maskA.rgb * (1.0 - maskTexColor.a) + maskT.rgb * maskTexColor.a;

    float enterCoef = clamp(uTime - 15.5, 0.0, 1.0);
    gradientGrayscale *= clamp(abs(sin(uTime * uAnimStrengh) * uAnimSpeed), 0.0, 1.0) * enterCoef;

    vec3 gradientColor = mix(color0, color1, smoothstep(0.0, gs0, gradientGrayscale));
    gradientColor = mix(gradientColor, color2, smoothstep(gs0, gs1, gradientGrayscale));
    gradientColor = mix(gradientColor, color3, smoothstep(gs1, gs2, gradientGrayscale));


    csm_DiffuseColor = vec4((gradientColor - overallNoise) * brightness, 1);
}