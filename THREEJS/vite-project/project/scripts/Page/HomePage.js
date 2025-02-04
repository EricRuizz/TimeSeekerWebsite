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

        this.initEnterAniamtion();
        this.initExitAnimation();
        
        super.sceneAdditions();
        if(autoEnter) super.enter();
        return super.pageIndex;
    }
    
    doEnter()
    {
        //TODO - window.location.href = "/home";
        this.backgroundEnterTween.start();
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
        /*
        this.backgroundSpeed = 1.0;


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
        this.test();
    }

    test()
    {
        const geometry = new THREE.PlaneGeometry(2, 2);
        const material = new THREE.ShaderMaterial({
        uniforms: {
            uTime: { value: 0 }
        },
        vertexShader: `
            void main() {
            gl_Position = vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            uniform float uTime;
            void main() {
            vec2 uv = gl_FragCoord.xy / vec2( window.innerWidth, window.innerHeight );
            gl_FragColor = vec4(sin(uv.x + uTime), cos(uv.y - uTime), sin(uTime), 1.0);
            }
        `,
        });
        const backgroundMesh = new THREE.Mesh(geometry, material);
        this.pageMeshes.push(backgroundMesh);
    }

    initEnterAniamtion()
    {
        //TODO
    }

    initExitAnimation()
    {
        //TODO
    }



    updateTweens()
    {
        //TODO
    }

    updateBackground()
    {
        this.backgroundMaterial.uniforms.uTime += this.clock.getDelta() * this.backgroundSpeed;
    }



    startExitAnimation()
    {
        this.backgroundEnterTween.stop();
        this.backgroundExitTween.start();
    }
}