import * as THREE from 'three';

import WaterRippleSimVS from "../../Shaders/WaterRippleSimVS.glsl";
import WaterRippleSimFS from "../../Shaders/WaterRippleSimFS.glsl";
import WaterRippleRenderFS from "../../Shaders/WaterRippleRenderFS.glsl";
import WaterRippleRenderVS from "../../Shaders/WaterRippleRenderVS.glsl";

/*
    CREDITS:
    Original Shader - "Simple Water Ripple effect" by Polygon on Shadertoy
    Shader adaptation and js implementation by Codegrid
*/


const backgroundColor = "#2774fb";

document.addEventListener("DOMContentLoaded", () =>
{
    const scene = new THREE.Scene();
    const simScene = new THREE.Scene();

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const renderer =new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        preserveDrawingBuffer: true,
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const mousePosition = new THREE.Vector2();
    let frame = 0;

    const width = window.innerWidth * window.devicePixelRatio;
    const height = window.innerHeight * window.devicePixelRatio;
    const options = {
        format: THREE.RGBAFormat,
        type: THREE.FloatType,
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        stencilBuffer: false,
        depthBuffer: false,
    };
    let rta = new THREE.WebGLRenderTarget(width, height, options);
    let rtb = new THREE.WebGLRenderTarget(width, height, options);

    const simMaterial = new THREE.ShaderMaterial({
        uniforms: {
            textureA: { value: null },
            mouse: { value: mousePosition },
            resolution: { value: new THREE.Vector2(width, height) },
            time: { value: 0 },
            frame: { value: 0 }
        },
        vertexShader: WaterRippleSimVS,
        fragmentShader: WaterRippleSimFS
    });

    const renderMAterial = new THREE.ShaderMaterial({
        uniforms: {
            textureA: { value: null },
            textureB: { value: null },
        },
        vertexShader: WaterRippleRenderVS,
        fragmentShader: WaterRippleRenderFS,
        transparent: true,
    });

    const plane = new THREE.PlaneGeometry(2, 2);
    const simQuad = new THREE.Mesh(plane, simMaterial);
    const renderQuad = new THREE.Mesh(plane, renderMAterial);

    simScene.add(simQuad);
    scene.add(renderQuad);

    const logoTexture = new THREE.TextureLoader().load('/project/Textures/TimeSeeker_Logo_White_Transparent.png');
    logoTexture.minFilter = THREE.LinearFilter;
    logoTexture.magFilter = THREE.LinearFilter;
    logoTexture.format = THREE.RGBAFormat;


    window.addEventListener("resize", () =>
    {
        const newWidth = window.innerWidth * window.devicePixelRatio;
        const newHeight = window.innerHeight * window.devicePixelRatio;

        renderer.setSize(window.innerWidth, window.innerHeight);
        rta.setSize(newWidth, newHeight);
        rtb.setSize(newWidth, newHeight);
        simMaterial.uniforms.resolution.value.set(newWidth, newHeight);

        logoTexture.needsUpdate = true;
    });

    renderer.domElement.addEventListener("mousemove", (e) => {
        mousePosition.x = e.clientX * window.devicePixelRatio;
        mousePosition.y = (window.innerHeight - e.clientY) * window.devicePixelRatio;
    });

    renderer.domElement.addEventListener("mouseleave", () => {
        mousePosition.set(0, 0);
    });

    const animate = () => {
        simMaterial.uniforms.frame.value = frame++;
        simMaterial.uniforms.time.value = performance.now() / 1000;

        simMaterial.uniforms.textureA.value = rta.texture;
        renderer.setRenderTarget(rtb);
        renderer.render(simScene, camera);

        renderMAterial.uniforms.textureA.value = rtb.texture;
        renderMAterial.uniforms.textureB.value = logoTexture;
        renderer.setRenderTarget(null);
        renderer.render(scene, camera);

        const temp = rta;
        rta = rtb;
        rtb = temp;

        requestAnimationFrame(animate);
    }

    animate();
});