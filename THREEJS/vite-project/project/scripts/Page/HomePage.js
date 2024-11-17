import * as THREE from 'three';
import APage from "./APage";

// Shader imports
import CustomShaderMaterial from "three-custom-shader-material/vanilla";

import {
  patchShadersCSM,
  GerstnerWave,
  Perlin
} from "gl-noise"

import GerstnerVS from '../../shaders/GerstnerVertex.glsl';
import GerstnerFS from '../../shaders/GerstnerFragment.glsl';
import ScrabbleVS from '../../shaders/ScrabbleVertex.glsl';
import ScrabbleFS from '../../shaders/ScrabbleFragment.glsl';

export default class HomePage extends APage
{
    constructor(scene, camera, clock)
    {
        super(scene, camera, clock);
    }

    init()
    {
        const cubeTest = new THREE.SphereGeometry(70, 8, 8);
        const cubeTestMat = new THREE.MeshStandardMaterial({ color: new THREE.Color(0, 0, 0, 1) });
        const cTest = new THREE.Mesh(cubeTest, cubeTestMat);
        cTest.position.set(0, 100, 200);
        //this.pageMeshes.push(cTest);

        this.initWaves();
        this.initScribbleLogo();

        super.sceneAdditions();
    }

    doEnter()
    {
        console.log("doEnter");
    }

    doExit()
    {
        console.log("doExit");
    }

    async initWaves()
    {
        
    }

    async initScribbleLogo()
    {
        const o_ScrabbleFS = {
          defines: "",
          header: "",
          main: ScrabbleFS,
        };
        const { defines, header, main } = await patchShadersCSM(o_ScrabbleFS, [Perlin]);
        const s_ScrabbleFS = `${defines}${header}${main}`;
                
        const scrabbleLogoGeometry = new THREE.PlaneGeometry(0.75, 0.75, 1, 1);
        const scrabbleLogoMaterial = new CustomShaderMaterial({
          baseMaterial: THREE.MeshBasicMaterial,
          vertexShader: ScrabbleVS,
          fragmentShader: s_ScrabbleFS,
          transparent: true,
          uniforms: {
            uTime: { value: 0 },
            displayAlpha: { value: 0 },
            displacementScale: { value: 15 },
            displacementStrength: { value: 0.01 },
            texture: { value: new THREE.TextureLoader().load('./project/textures/TimeSeeker_Transparent.png') }
          },
          //transparent: true
          map: new THREE.TextureLoader().load('./project/textures/TimeSeeker_Transparent.png'),
          transparent: true
        });
      
        this.scrabbleLogo = new THREE.Mesh(scrabbleLogoGeometry, scrabbleLogoMaterial);
        this.scrabbleLogo.position.set(0, 1.5, 2.5);
        this.scrabbleLogo.lookAt(this.camera.position);
        
        this.pageMeshes.push(this.scrabbleLogo);
    }
}