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

    async Init(autoEnter)
    {
        super.InitPageIndex(2);
        
        this.initPostProcessing();
        
        await Promise.all([
            this.initBackground(),
        ]);

        this.initEnterAniamtion();
        this.initExitAnimation();
        
        super.SceneAdditions();
        if(autoEnter) super.Enter();
        return super.pageIndex;
    }
    
    DoEnter()
    {
        document.title = "Home";
        //TODO - window.location.href = "/home";
        //TODO - this.backgroundEnterTween.start();
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
            uIdleNoiseScrollSpeed: { value: 0.2 },
            uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
            maskTexture: { value: new THREE.TextureLoader().load('./project/textures/TimeSeeker_Logo_White_Transparent.png') },
            },
        });
        console.log(window.innerWidth + "          " + window.innerHeight);

        this.backgroundMesh = new THREE.Mesh(geometry, material);
        this.backgroundMesh.position.set(0, 0, -10);
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



    DoUpdate()
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
        this.backgroundMesh.material.uniforms.uTime.value += this.clock.getDelta() * this.backgroundSpeed;
    }



    startExitAnimation()
    {
        this.backgroundEnterTween.stop();
        this.backgroundExitTween.start();
    }

    

    OnMouseMove(mousePosition)
    {
        console.log("A");
        this.mousePosition = mousePosition;
    }
}