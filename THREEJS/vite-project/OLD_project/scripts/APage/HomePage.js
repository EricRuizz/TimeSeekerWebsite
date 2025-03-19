import * as THREE from 'three';
import APage from "./APage";

import TWEEN from '@tweenjs/tween.js'

// PostProcessing
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass.js';

// Shader imports
import CustomShaderMaterial from "three-custom-shader-material/vanilla";

import {
  patchShadersCSM,
  Perlin,
  Simplex
} from "gl-noise"

import HomeBackgroundVS from '../../shaders/HomeBackgroundVertex.glsl';
import HomeBackgroundFS from '../../shaders/HomeBackgroundFragment.glsl';

export default class HomePage extends APage
{
    constructor(scene, camera, clock, composer)
    {
        super(scene, camera, clock, composer);
    }

    async Init()
    {
        
        this.initPostProcessing();
        
        await Promise.all([
            this.initBackground(),
        ]);
        
        this.initEnterAniamtion();
        this.initExitAnimation();

        super.SceneAdditions();
        super.Enter();
    }
    
    DoEnter()
    {
        history.replaceState({}, "", "/Home");

        this.backgroundEnterTween.start();
    }

    DoExit()
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
        //this.filmPass = new FilmPass(1, false);
        //this.composer.addPass(this.filmPass);
    }

    async initBackground()
    {
        this.backgroundSpeed = 1.0;
        
        const o_FS = {
            defines: "",
            header: "",
            main: HomeBackgroundFS,
        };
        const { defines, header, main } = await patchShadersCSM(o_FS, [Perlin, Simplex]);
        const s_FS = `${defines}${header}${main}`;

        const geometry = new THREE.PlaneGeometry(100, 100);
        const material = new CustomShaderMaterial({
            baseMaterial: THREE.MeshBasicMaterial,
            vertexShader: HomeBackgroundVS,
            fragmentShader: s_FS,
            uniforms: {
            uTime: { value: 15.0 },
            uEnterTransitionCoef: { value: 0.0 },
            uAnimStrength: { value: 1.0 },
            uAnimSpeed: { value: 0.25 },
            uFloor: { value: 0.25 },
            uIdleNoiseScrollSpeed: { value: 0.2 },
            uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
            uGreyscaleClamp: { value: new THREE.Vector2(0.0, 1.0) },
            maskTexture: { value: new THREE.TextureLoader().load('/project/textures/TimeSeeker_Logo_White_Transparent.png') },
            },
        });

        this.backgroundMesh = new THREE.Mesh(geometry, material);
        this.backgroundMesh.position.set(0, 0, -10);
        this.pageMeshes.push(this.backgroundMesh);
    }

    initEnterAniamtion()
    {
        this.backgroundEnterParamObject = { value: 0.0 };
        this.backgroundEnterTween = new TWEEN.Tween(this.backgroundEnterParamObject)
        .to({ value: 1.0 }, 3.0 * 1000)
        .easing(TWEEN.Easing.Sinusoidal.Out)
        .onUpdate(() => {
            this.backgroundMesh.material.uniforms.uEnterTransitionCoef.value = this.backgroundEnterParamObject.value;
        });
    }

    initExitAnimation()
    {
        //TODO
    }



    DoUpdate()
    {
        this.updateTweens();

        this.updateBackground();
    }

    updateTweens()
    {
        if(this.backgroundEnterTween.isPlaying())
        {
            this.backgroundEnterTween.update();
        }
    }

    updateBackground()
    {
        this.backgroundMesh.material.uniforms.uTime.value += this.clock.getDelta() * this.backgroundSpeed;
        //this.backgroundMesh.material.uniforms.uAnimSpeed.value = Math.sin(this.backgroundMesh.material.uniforms.uTime.value);
        //this.backgroundMesh.material.uniforms.uEnterTransitionCoef.value = Math.sin(this.backgroundMesh.material.uniforms.uTime.value);
    }



    startExitAnimation()
    {
        this.backgroundEnterTween.stop();
        this.backgroundExitTween.start();
    }

    

    OnMouseMove(mousePosition)
    {
        this.mousePosition = mousePosition;
    }
}