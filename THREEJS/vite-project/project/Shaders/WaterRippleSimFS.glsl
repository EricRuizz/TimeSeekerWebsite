uniform sampler2D textureA;
uniform vec2 mouse;
uniform vec2 prevMouse;
uniform vec2 resolution;
uniform vec2 resolutionProportion;
uniform float scale;
uniform float time;
uniform int frame;
varying vec2 vUv;

const float delta = 1.4;

void main()
{
    vec2 uv = vUv;

    //TODO apply new fking UVs



    vec2 texelSize = 1.0 / resolution;

    // Initialize
    if(frame == 0) {
        gl_FragColor = vec4(0.0);
        return;
    }

    // Load current data
    vec4 data = texture2D(textureA, uv);
    float pressure = data.x;
    float pVel = data.y;

    // Neighboring pressures
    float p_right = texture2D(textureA, uv + vec2(texelSize.x, 0.0)).x;
    float p_left  = texture2D(textureA, uv - vec2(texelSize.x, 0.0)).x;
    float p_up    = texture2D(textureA, uv + vec2(0.0, texelSize.y)).x;
    float p_down  = texture2D(textureA, uv - vec2(0.0, texelSize.y)).x;

    // Boundary conditions
    if(uv.x <= texelSize.x) p_left = p_right;
    if(uv.x >= 1.0 - texelSize.x) p_right = p_left;
    if(uv.y <= texelSize.y) p_down = p_up;
    if(uv.y >= 1.0 - texelSize.y) p_up = p_down;

    // Wave propagation
    pVel += delta + (-2.0 * pressure + p_right + p_left) / 4.0;
    pVel += delta + (-2.0 * pressure + p_up + p_down) / 4.0;

    pressure += delta * pVel;
    pVel -= 0.005 * delta * pressure;

    // Apply decay
    pVel *= 0.995;
    pressure *= 0.9995;

    // Mouse-based force
    vec2 mouseUV = mouse / resolution;
    vec2 prevMouseUV = prevMouse / resolution;
    vec2 velocity = mouseUV - prevMouseUV;
    float speed = length(velocity);

    if(mouse.x > 0.0 && speed > 0.0001) {
        float dist = distance(uv, mouseUV);
        float radius = 0.035;
        if(dist < radius) {
            float falloff = smoothstep(radius, 0.0, dist);
            vec2 dir = velocity / (speed + 1e-6);
            vec2 push = dir * falloff * speed * 20.0;
            pVel += dot(normalize(uv - mouseUV), push);
        }
    }

    // Wind noise (ambient)
    float windStrength = 0.001;
    float wind = sin(time * 0.5 + uv.x * 10.0 + uv.y * 10.0) * windStrength;
    pVel += wind;

    // Curl effect (swirl)
    float vy_up    = texture2D(textureA, uv + vec2(0.0, texelSize.y)).y;
    float vy_down  = texture2D(textureA, uv - vec2(0.0, texelSize.y)).y;
    float vx_right = texture2D(textureA, uv + vec2(texelSize.x, 0.0)).y;
    float vx_left  = texture2D(textureA, uv - vec2(texelSize.x, 0.0)).y;

    float curl = (vy_up - vy_down - vx_right + vx_left) * 0.5;
    pVel += curl * 0.001;


    //TESTING
    //gl_FragColor = vec4(uv.x, uv.y, 0, 0);
    //return;
    //TESTING

    // Output: pressure, vertical velocity, dx, dy
    gl_FragColor = vec4(pressure, pVel,
                        (p_right - p_left) * 0.5,
                        (p_up - p_down) * 0.5);
}
