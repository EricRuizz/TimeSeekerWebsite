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
import PopupTextVS from '../../shaders/PopupTextVertex.glsl';
import PopupTextFS from '../../shaders/PopupTextFragment.glsl';

export default class HomePage extends APage
{
    constructor(scene, camera, clock)
    {
      super(scene, camera, clock);
    }

    async init()
    {
      await this.initMoon();
      await this.initSkybox();
      await this.initWaves();
      await this.initPopupText();

      this.intiRayasting();
      this.initCamera();
      this.initMouseMovement();

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

    async initMoon()
    {
      const moonGeometry = new THREE.SphereGeometry(10, 30, 30);
      const moonMaterial = new THREE.MeshStandardMaterial({ map: new THREE.TextureLoader().load('./project/textures/MoonTexture.jpg') });
      this.moon = new THREE.Mesh(moonGeometry, moonMaterial);
      this.moon.position.set(0, 150, 200);
      this.moon.rotateX(THREE.MathUtils.degToRad(-40));
      this.moon.rotateY(THREE.MathUtils.degToRad(90));

      this.pageMeshes.push(this.moon);
    }

    async initSkybox()
    {
      const skyboxGeometry = new THREE.SphereGeometry(500, 32, 32);
      const skyboxMaterial = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./project/textures/NightSkyTexture_Dark.png'), side: THREE.BackSide });
      this.skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterial);
      this.skybox.position.set(0, 0, 0);

      this.pageMeshes.push(this.skybox);
    }

    async initWaves()
    {
      const o_GerstnerVS = {
        defines: "",
        header: "",
        main: GerstnerVS,
      };
      const { defines, header, main } = await patchShadersCSM(o_GerstnerVS, [GerstnerWave, Perlin]);
      const s_GerstnerVS = `${defines}${header}${main}`;

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

    async initPopupText()
    {
      const oFS = {
        defines: "",
        header: "",
        main: PopupTextFS,
      };
      const { defines, header, main } = await patchShadersCSM(oFS, [Perlin]);
      const sFS = `${defines}${header}${main}`;
      
      const geometry = new THREE.PlaneGeometry(1.8, 0.3, 1, 1);
      const material = new CustomShaderMaterial({
        baseMaterial: THREE.MeshBasicMaterial,
        vertexShader: PopupTextVS,
        fragmentShader: sFS,
        transparent: true,
        uniforms: {
          uTime: { value: 0 },
          displayAlpha: { value: 1 },
          displacementScale: { value: 15 },
          displacementStrength: { value: 0.01 },
        },
        map: new THREE.TextureLoader().load('./project/textures/ClickToEnter.png'),
        transparent: true
      });
      
      this.popupText = new THREE.Mesh(geometry, material);
      this.popupText.position.set(0, 1.1, 2.5);
      this.popupText.lookAt(this.camera.position);
      
      this.pageMeshes.push(this.popupText);


      this.popupTextMouseY = 0.75;
      this.isPopupTextShown = false;
    }

    intiRayasting()
    {
      this.raycaster = new THREE.Raycaster();
      this.scrabbleRaycastTargets = [];
      this.scrabbleRaycastTargets.push(this.scrabbleLogo);
    }

    initCamera()
    {
      this.cameraBaseFov = this.camera.fov;
      this.cameraFovRange = -2.5;
      this.cameraFovSpeed = 0.25;
      this.cameraBaseRotX = THREE.MathUtils.degToRad(-20);
      this.cameraBaseRotY = THREE.MathUtils.degToRad(180);

      this.cameraRotOffsetIdle = new THREE.Vector2(0.0, 0.0);

      // Camera idle position
      this.cameraYMovementSpeed = 1.0;
      this.cameraYMovementRange = 0.025;
      this.cameraYOffset = 0.2 + this.cameraYMovementRange;

      // Camera idle rotation
      this.cameraIdleYRotationSpeed = 1.0;
      this.cameraIdleXRotationSpeed = this.cameraIdleYRotationSpeed / 2.0;
      this.cameraIdleXRotationRange = 0.025;
      this.cameraIdleYRotationRange = 0.025;
      this.cameraIdleXRotationOffset = this.cameraIdleXRotationRange / 2.0 * -1;
      this.cameraIdleYRotationOffset = this.cameraIdleYRotationRange / 2.0 * -1;
    }

    initMouseMovement()
    {
      this.mousePosition = new THREE.Vector2(0.0, 0.0);
      this.currentMouseFollowPos = new THREE.Vector2(0.0, 0.0);
            
      this.mouseXCoef = 0.30;
      this.mouseYCoef = 0.30;
    }

    doUpdate()
    {
      this.updateWaves()
      this.updateSkybox();
      this.updateCamera();
      this.updatePopupText();
    }

    updateWaves()
    {
      this.waves.material.uniforms.uTime.value += 0.0025;
    }

    updateSkybox()
    {
      this.skybox.rotation.y += 0.0002;
    }

    updateCamera()
    {
      // Camera FOV
      this.camera.fov = Math.sin(this.clock.getElapsedTime() * this.cameraFovSpeed) * this.cameraFovRange + this.cameraBaseFov;

      // Camera Y movement
      this.camera.position.y = Math.sin(this.clock.getElapsedTime() * this.cameraYMovementSpeed) * this.cameraYMovementRange + this.cameraYOffset;

      // Camera rotation
      this.cameraRotOffsetIdle.x = Math.sin(this.clock.getElapsedTime() * this.cameraIdleXRotationSpeed) * this.cameraIdleXRotationRange + this.cameraIdleXRotationOffset;
      this.cameraRotOffsetIdle.y = Math.sin(this.clock.getElapsedTime() * this.cameraIdleYRotationSpeed) * this.cameraIdleYRotationRange + this.cameraIdleYRotationOffset;

      var goalMouseFollowPos = this.mousePosition.clone();
      goalMouseFollowPos.x = -this.mousePosition.x * this.mouseXCoef;
      goalMouseFollowPos.y = -this.mousePosition.y * this.mouseYCoef;

      var direction = new THREE.Vector2().subVectors(goalMouseFollowPos, this.currentMouseFollowPos);
      var distance = direction.length();
      direction.normalize();

      var speed = Math.min(distance * 0.2, 1);

      direction.multiplyScalar(speed);
      this.currentMouseFollowPos.add(direction);

      var cameraRotXOffset = this.cameraRotOffsetIdle.x + this.currentMouseFollowPos.x;
      var cameraRotYOffset = this.cameraRotOffsetIdle.y + this.currentMouseFollowPos.y;

      this.camera.rotation.x = this.cameraBaseRotX + cameraRotYOffset;
      this.camera.rotation.y = this.cameraBaseRotY + cameraRotXOffset;

      this.camera.updateProjectionMatrix();
    }

    updatePopupText()
    {
      console.log(this.mousePosition.y);
      if(this.mousePosition.y > this.popupTextMouseY && !this.isPopupTextShown)
      {
        this.showPopupText();
      }
      else if(this.isPopupTextShown)
      {
        this.hidePopupText();
      }
    }

    showPopupText()
    {
      this.isPopupTextShown = true;
      //TODO - LERP
    }

    hidePopupText()
    {
      this.isPopupTextShown = false;
      //TODO - A
    }

    onMouseMove(mousePosition)
    {
      this.mousePosition = mousePosition;

      //TODO - Uncomment when fixed
      //raycaster.setFromCamera(mousePosition, camera);
      //const intersects = raycaster.intersectObjects(scribbleRaycastTargets, true);
        
      //if (intersects.length > 0) {
      //  console.log(intersects);
      //}
    }
}