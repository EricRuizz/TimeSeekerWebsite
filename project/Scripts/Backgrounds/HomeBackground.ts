import * as THREE from 'three';

import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass.js';

import WaterRippleSimVS from "../../Shaders/WaterRippleSimVS.glsl";
import WaterRippleSimFS from "../../Shaders/WaterRippleSimFS.glsl";
import WaterRippleRenderFS from "../../Shaders/WaterRippleRenderFS.glsl";
import WaterRippleRenderVS from "../../Shaders/WaterRippleRenderVS.glsl";

/*
    Base implementation CREDITS:
    "Simple Water Ripple effect" by Polygon on Shadertoy
    Shader adaptation and js implementation by Codegrid
*/



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
    const resolutionProportion = width / height;
    const scale = 0.5;
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
            prevMouse: { value: new THREE.Vector2() },
            resolution: { value: new THREE.Vector2(width, height) },
            scale: { value: scale },
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
            resolution: { value: new THREE.Vector2(width, height) },
            resolutionProportion: { value: resolutionProportion },
            scale: { value: scale },
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


    //POSTPROCESSING
    const renderScene = new RenderPass(scene, camera);
    const composer = new EffectComposer(renderer);
    composer.addPass(renderScene);

    // Bloom
    var bloomPassLow = new UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight), //Resolution of the scene
        0.2,  //Intensity
        0.1,  //Radius
        0.1   //Which pixels are affected
    );
    composer.addPass(bloomPassLow);
          
    var bloomPass = new UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight), //Resolution of the scene
        0.9, //Intensity
        0.5,  //Radius
        5   //Which pixels are affected
    );
    //composer.addPass(bloomPass);
          
    // Film
    var filmPass = new FilmPass(2, false);
    composer.addPass(filmPass);
    //POSTPROCESSING


    window.addEventListener("resize", () =>
    {
        const newWidth = window.innerWidth * window.devicePixelRatio;
        const newHeight = window.innerHeight * window.devicePixelRatio;
        const resolutionProportion = newWidth / newHeight;

        renderer.setSize(window.innerWidth, window.innerHeight);
        rta.setSize(newWidth, newHeight);
        rtb.setSize(newWidth, newHeight);
        simMaterial.uniforms.resolution.value.set(newWidth, newHeight);
        renderMAterial.uniforms.resolution.value.set(newWidth, newHeight);
        renderMAterial.uniforms.resolutionProportion.value = resolutionProportion;

        logoTexture.needsUpdate = true;
    });

    let mouseInitialized = false;
    document.addEventListener("mousemove", (e) => {
        const x = e.clientX * window.devicePixelRatio;
        const y = (window.innerHeight - e.clientY) * window.devicePixelRatio;

        if (!mouseInitialized)
        {
            simMaterial.uniforms.prevMouse.value.set(x, y);
            mouseInitialized = true;
        } else {
            simMaterial.uniforms.prevMouse.value.copy(simMaterial.uniforms.mouse.value);
        }

        mousePosition.set(x, y);
    });

    document.addEventListener("mouseleave", () => {
        mousePosition.set(0, 0);
    });

    const animate = () => {
        simMaterial.uniforms.frame.value = frame++;
        simMaterial.uniforms.time.value = performance.now() / 1000;

        for (let i = 0; i < 4; i++)
        {
            simMaterial.uniforms.textureA.value = rta.texture;
            renderer.setRenderTarget(rtb);
            renderer.render(simScene, camera);
            [rta, rtb] = [rtb, rta];
        }

        renderMAterial.uniforms.textureA.value = rtb.texture;
        renderMAterial.uniforms.textureB.value = logoTexture;
        renderer.setRenderTarget(null);
        composer.render();

        requestAnimationFrame(animate);
    }

    animate();
});