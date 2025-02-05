import * as THREE from 'three';
import APage from "./APage";

import TWEEN from '@tweenjs/tween.js'

// PostProcessing
import { ShaderMaterial, Uniform } from 'three';
import { ShaderPass } from 'three/examples/jsm/Addons.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass.js';

// Shader imports
import CustomShaderMaterial from "three-custom-shader-material/vanilla";

import {
  patchShadersCSM,
  Perlin
} from "gl-noise"

import HomeBackgroundVS from '../../shaders/HomeBackgroundVertex.glsl';
import HomeBackgroundFS from '../../shaders/HomeBackgroundFragment.glsl';

export default class HomePage extends APage
{
    constructor(scene, camera, clock, composer)
    {
      super(scene, camera, clock, composer);
    }

    async init(autoEnter)
    {
        super.initPageIndex(2);
        
        this.initPostProcessing();
        
        await Promise.all([
            this.initBackground(),
        ]);

        // Test
        this.TestPlane();
        // Test

        this.initEnterAniamtion();
        this.initExitAnimation();
        
        super.sceneAdditions();
        if(autoEnter) super.enter();
        return super.pageIndex;
    }
    
    doEnter()
    {
        //TODO - window.location.href = "/home";
        //TODO - this.backgroundEnterTween.start();

        //this.camera.position.set(0, 0, 0);
        //this.camera.rotation.set(0, 0, 0);
    }

    doExit()
    {

    }



    initPostProcessing()
    {
        //Bloom
        this.bloomPass = new UnrealBloomPass(
            new THREE.Vector2(window.innerWidth, window.innerHeight), //Resolution of the scene
            10.5, //Intensity
            0.1,  //Radius
            2.5   //Which pixels are affected
        );
        this.composer.addPass(this.bloomPass);
        
        // Film
        this.filmPass = new FilmPass(1, false);
        this.composer.addPass(this.filmPass);
    }

    async initBackground()
    {
        this.backgroundSpeed = 1.0;

        /*

        const oFS = {
            defines: "",
            header: "",
            main: HomeBackgroundFS,
        };
        const { defines, header, main } = await patchShadersCSM(oFS, [Perlin]);
        const s_oFS = `${defines}${header}${main}`;

        this.backgroundMaterial = new CustomShaderMaterial({
            baseMaterial: THREE.MeshBasicMaterial,
            vertexShader: HomeBackgroundVS,
            fragmentShader: s_oFS,
            transparent: false,
            defines: { LABEL: "value" },
            uniforms: {
                tDiffuse: new Uniform(null),
                uTime: { value: 0 },
            },
        });

        this.backgroundPass = new ShaderPass(this.backgroundMaterial, "tDiffuse");
        this.composer.addPass(this.topFadePass);
        */
    }

    TestPlane()
    {
        const geometry = new THREE.PlaneGeometry(100, 100);
        const material = new THREE.ShaderMaterial({
        uniforms: {
            uTime: { value: 0 },
            uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
        },
        vertexShader: `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
        `,
        fragmentShader: `
            uniform float uTime;
            uniform vec2 uResolution;
            varying vec2 vUv;
            
            void main() {
                vec2 uv = gl_FragCoord.xy / uResolution;
                gl_FragColor = vec4(sin(uv.x + uTime), cos(uv.y - uTime), sin(uTime), 1.0);
            }
        `,
        });
        
        this.backgroundMesh = new THREE.Mesh(geometry, material);
        this.backgroundMesh.position.set(0, 0, -10);
        this.backgroundMesh.rotateX(THREE.MathUtils.degToRad(0));
        this.pageMeshes.push(this.backgroundMesh);
    }

    initEnterAniamtion()
    {
        //TODO
    }

    initExitAnimation()
    {
        //TODO
    }



    doUpdate()
    {
        this.updateTweens();

        this.updateBackground();

        return this.nextPageIndex;
    }

    updateTweens()
    {
        //TODO
    }

    updateBackground()
    {
        //this.backgroundMesh.material.uniforms.uTime.value += this.clock.getDelta() * this.backgroundSpeed;
    }



    startExitAnimation()
    {
        this.backgroundEnterTween.stop();
        this.backgroundExitTween.start();
    }
}