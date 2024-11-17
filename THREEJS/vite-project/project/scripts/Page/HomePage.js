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

    async init()
    {
      await this.initWaves();
      await this.initScribbleLogo();

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
      // Wave CSM Setup

      const o_GerstnerVS = {
        defines: "",
        header: "",
        main: GerstnerVS,
      };
      const { defines, header, main } = await patchShadersCSM(o_GerstnerVS, [GerstnerWave, Perlin]);
      const s_GerstnerVS = `${defines}${header}${main}`;


      // Waves

      const wavePlaneWidth = 6;
      const wavePlaneLength = 4;
      const wavePlaneWidthSegments = 200;
      const wavePlaneLengthSegments = 200;

      const wavePlane = new THREE.PlaneGeometry(wavePlaneWidth, wavePlaneLength, wavePlaneWidthSegments, wavePlaneLengthSegments);
      const waveMaterial = new CustomShaderMaterial({
        baseMaterial: THREE.MeshStandardMaterial,
        vertexShader: s_GerstnerVS,
        fragmentShader: GerstnerFS,
        // Uniforms
        uniforms: {
          uTime: { value: 0 },
          uHeight: { value: 0 },
          waterColor: { value: new THREE.Vector3(0.0, 0.0, 0.0) },
          waterHighlight: { value: new THREE.Vector3(0.0, 0.0, 0.025) },
          offset: { value: 0 },
          contrast: { value: 0.5 },
          brightness: { value: 0.5 },
        },
      });

      this.waves = new THREE.Mesh(wavePlane, waveMaterial);
      this.waves.position.set(0, 0, wavePlaneLength / 2);
      this.waves.rotateX(THREE.MathUtils.degToRad(270));

      this.pageMeshes.push(this.waves);
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
        },
        map: new THREE.TextureLoader().load('./project/textures/TimeSeeker_Transparent.png'),
        transparent: true
      });
      
      this.scrabbleLogo = new THREE.Mesh(scrabbleLogoGeometry, scrabbleLogoMaterial);
      this.scrabbleLogo.position.set(0, 1.5, 2.5);
      this.scrabbleLogo.lookAt(this.camera.position);
      
      this.pageMeshes.push(this.scrabbleLogo);
    }
}