import * as THREE from 'three';
import APage from "./APage";

import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import TWEEN from '@tweenjs/tween.js'

// PostProcessing
import { ShaderMaterial, Uniform } from 'three';
import { ShaderPass } from 'three/examples/jsm/Addons.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass.js';
import { BokehPass } from 'three/examples/jsm/Addons.js';
import { AfterimagePass } from 'three/addons/postprocessing/AfterimagePass.js';

// Shader imports
import CustomShaderMaterial from "three-custom-shader-material/vanilla";

import {
  patchShadersCSM,
  GerstnerWave,
  Perlin
} from "gl-noise"

import ContrastTransitionVS from '../../shaders/ContrastTransitionVertex.glsl';
import ContrastTransitionFS from '../../shaders/ContrastTransitionFragment.glsl';
import GerstnerVS from '../../shaders/GerstnerVertex.glsl';
import GerstnerFS from '../../shaders/GerstnerFragment.glsl';
import PopupTextVS from '../../shaders/PopupTextVertex.glsl';
import PopupTextFS from '../../shaders/PopupTextFragment.glsl';

export default class BreathPage extends APage
{
    constructor(scene, camera, clock, composer)
    {
      super(scene, camera, clock, composer);
    }

    async init(autoEnter)
    {
      super.initPageIndex(1);

      this.initPostProcessing();

      this.initEnterAniamtion();
      this.initExitAnimation();

      await Promise.all([
        this.initMoon(),
        this.initSkybox(),
        this.initWaves(),
        this.initPopupText(),
      ]);

      this.intiRayasting();
      this.initLights();
      this.initCamera();
      this.initMouseMovement();
      this.initHoldTransition();

      super.sceneAdditions();

      if(autoEnter) super.enter();

      return super.pageIndex;
    }

    doEnter()
    {
      this.EAApertureUp.start();
      this.contrastEnterTween.start();
    }

    doExit()
    {
      
    }



    initPostProcessing()
    {
      this.guiPostprocessing = {};
      
      // Bloom
      this.bloomPassLow = new UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight), //Resolution of the scene
        0.5,  //Intensity
        0.1,  //Radius
        0.1   //Which pixels are affected
      );
      this.composer.addPass(this.bloomPassLow);
      
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
      
      // Bokeh
      this.appertureCoef = 0.00001;
      this.bokehPass = new BokehPass( this.scene, this.camera, {
        focus: 1.0,
        aperture: 0.025,
        maxblur: 0.01
      } );
      this.composer.addPass(this.bokehPass);
      this.guiPostprocessing.bokeh = this.bokehPass;

      // Afterimage
      this.afterImagePass = new AfterimagePass();
      this.afterImagePass.uniforms.damp = { value: 0.0 };
      this.composer.addPass(this.afterImagePass);
      
      /*this.effectController = {
      
        focus: 250.0,
        aperture: 1.5,
        maxblur: 0.03
      
      };
      this.matChanger = ( ) =>
      {
        this.guiPostprocessing.bokeh.uniforms[ 'focus' ].value = this.effectController.focus;
        this.guiPostprocessing.bokeh.uniforms[ 'aperture' ].value = this.effectController.aperture * this.appertureCoef;
        this.guiPostprocessing.bokeh.uniforms[ 'maxblur' ].value = this.effectController.maxblur;
      };
      
      this.gui = new GUI();
      this.gui.add( this.effectController, 'focus', 0.0, 3000.0, 10 ).onChange( this.matChanger );
      this.gui.add( this.effectController, 'aperture', 0, 10, 0.1 ).onChange( this.matChanger );
      this.gui.add( this.effectController, 'maxblur', 0.0, 1, 0.01 ).onChange( this.matChanger );
      this.gui.close();
      
      this.matChanger();*/

      this.i_uContrast = 1.0;
      this.i_uSubtraction = 0.0;
      this.contrastTransitionMaterial = new ShaderMaterial(
      {
        defines: { LABEL: "value" },
        uniforms: { tDiffuse: new Uniform(null),
          uContrast: { value: this.i_uContrast },
          uSubtraction: { value: this.i_uSubtraction }
         },
        vertexShader: ContrastTransitionVS,
        fragmentShader: ContrastTransitionFS
      });
      
      this.contrastTransitionPass = new ShaderPass(this.contrastTransitionMaterial, "tDiffuse");
      this.composer.addPass(this.contrastTransitionPass);
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
      this.skybox.rotation.y = 180;

      this.pageMeshes.push(this.skybox);
    }

    initHoldTransition()
    {
      this.holdTimeToTransition = 3;
      this.isHoldTransitioning = false;
      this.inTransitionAnimation = false;

      this.initTransitionClock();

      // Animation
      this.transitionAnimationClock = new THREE.Clock(false);
      this.TACameraRotSpeed = 1;
      this.TACameraRotationGoal = THREE.MathUtils.DEG2RAD * 75;

      this.TARegularCameraRotationFadeClock = new THREE.Clock(false);
    }

    initTransitionClock()
    {
      this.holdTransitionClock = new THREE.Clock(false);
      this.stopHoldTransitionClock = new THREE.Clock(false);
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

      this.waveSpeed = 1;
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
        map: new THREE.TextureLoader().load('./project/textures/HoldToEnter.png'),
        transparent: true
      });
      
      this.popupText = new THREE.Mesh(geometry, material);
      this.popupText.position.set(0, 0.6, 2.5);
      this.popupText.lookAt(this.camera.position);
      
      this.pageMeshes.push(this.popupText);

      this.popupTextShowPosition = new THREE.Vector3(0, 1.1, 2.5);
      this.popupTextHidePosition = new THREE.Vector3(0, 0.6, 2.5);

      this.popupTextMouseY = 0.25;
      this.isPopupTextShown = false;

      this.popupTextSpeed = 2000.0;

      this.updateShowPopupTextTween();
      this.updateHidePopupTextTween();
    }

    intiRayasting()
    {
      this.raycaster = new THREE.Raycaster();
      this.scrabbleRaycastTargets = [];
      this.scrabbleRaycastTargets.push(this.scrabbleLogo);
    }

    initLights()
    {
      this.ambientLight = new THREE.AmbientLight(0xffffff);
      this.ambientLight.intensity = 1;
      this.scene.add(this.ambientLight);

      this.pointLightA = new THREE.PointLight();
      this.pointLightA.position.set(0, 10, 20);
      //this.pointLightA.intensity = 250;
      this.pointLightA.intensity = 2500;
      this.pointLightA.color = new THREE.Color(0.75, 0.75, 1);
      this.scene.add(this.pointLightA);
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
      this.cameraIdleXRotationSpeed = 1.0;
      this.cameraIdleYRotationSpeed = this.cameraIdleXRotationSpeed / 2.0;
      this.cameraIdleXRotationRange = 0.025;
      this.cameraIdleYRotationRange = 0.025;
      this.cameraIdleXRotationOffset = this.cameraIdleXRotationRange / 2.0 * -1;
      this.cameraIdleYRotationOffset = this.cameraIdleYRotationRange / 2.0 * -1;

      this.transitionFOVCoef = 0.0;
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
      this.updateTweens();

      this.updateTransition();
      this.updateWaves();
      this.updateSkybox();
      this.updateCamera();
      this.updatePopupText();
      return this.nextPageIndex;
    }

    updateTweens()
    {
      if(this.enterAnimationPlaying)
      {
        if(this.contrastEnterTween.isPlaying())
        {
          this.contrastEnterTween.update();
        }

        if(this.EAApertureUp.isPlaying())
        {
          this.EAApertureUp.update();
        }
        else if(this.EAApertureDown.isPlaying())
        {
          this.EAApertureDown.update();
        }
      }
    }

    updateTransition()
    {
      if(this.holdTransitionClock.getElapsedTime() >= this.holdTimeToTransition && !this.inTransitionAnimation)
      {
        this.startTransitionAnimation();
      }
      else if(this.inTransitionAnimation)
      {
        this.contrastExitTween.update();
      }

      if(this.isHoldTransitioning)
      {
        this.afterImageExitTween.update();
      }
    }

    startTransitionAnimation()
    {
      this.inTransitionAnimation = true;
      this.transitionAnimationClock.start();
      this.TARegularCameraRotationFadeClock.start();
      
      this.contrastExitTween.start();
    }

    updateWaves()
    {
      this.waves.material.uniforms.uTime.value += 0.0025; //TODO - use    this.waveSpeed
    }

    updateSkybox()
    {
      const skyboxTransitionRotation = 0.0;//THREE.MathUtils.clamp((this.holdTransitionClock.getElapsedTime() * 0.1) ** 3, 0, 0.05);
      const skyboxDefaultRotationOffset = this.clock.getDelta() * 0.01;

      const skyboxRotationOffset = skyboxDefaultRotationOffset + skyboxTransitionRotation;
      this.skybox.rotation.y += skyboxRotationOffset;
    }

    updateCamera()
    {
      // Camera FOV
      this.transitionFOVCoef = this.isHoldTransitioning ? this.holdTransitionClock.getElapsedTime() : this.holdTransitionClock.getElapsedTime() - this.stopHoldTransitionClock.getElapsedTime();
      this.transitionFOVCoef = THREE.MathUtils.clamp((this.transitionFOVCoef * 1.0) ** 3.0, 0.0, 40.0);
      this.camera.fov = Math.sin(this.clock.getElapsedTime() * this.cameraFovSpeed) * this.cameraFovRange + this.cameraBaseFov + this.transitionFOVCoef;

      // Camera Y movement
      this.camera.position.y = Math.sin(this.clock.getElapsedTime() * this.cameraYMovementSpeed) * this.cameraYMovementRange + this.cameraYOffset;

      if(!this.inTransitionAnimation)
      {
        this.updateCameraRotation();
      }
      
      this.camera.updateProjectionMatrix();
    }

    updateCameraRotation()
    {
      // Camera rotation
      this.cameraRotOffsetIdle.x = Math.sin(this.clock.getElapsedTime() * this.cameraIdleXRotationSpeed) * this.cameraIdleXRotationRange + this.cameraIdleXRotationOffset;
      this.cameraRotOffsetIdle.y = Math.sin(this.clock.getElapsedTime() * this.cameraIdleYRotationSpeed) * this.cameraIdleYRotationRange + this.cameraIdleYRotationOffset;

      var goalMouseFollowPos = this.mousePosition.clone();
      goalMouseFollowPos.y = -this.mousePosition.x * this.mouseXCoef;
      goalMouseFollowPos.x = -this.mousePosition.y * this.mouseYCoef;

      var direction = new THREE.Vector2().subVectors(goalMouseFollowPos, this.currentMouseFollowPos);
      var distance = direction.length();
      direction.normalize();

      var speed = Math.min(distance * 0.2, 1);

      direction.multiplyScalar(speed);
      this.currentMouseFollowPos.add(direction);

      var cameraRotXIdleOffset = this.cameraRotOffsetIdle.x + this.currentMouseFollowPos.x;
      var cameraRotYIdleOffset = this.cameraRotOffsetIdle.y + this.currentMouseFollowPos.y;

      var cameraRotXTransition = -THREE.MathUtils.clamp(this.transitionAnimationClock.getElapsedTime() * this.TACameraRotSpeed, 0, this.TACameraRotationGoal);
      var cameraRotYTransition = 0;

      var transitionIdleOffsetCoef = THREE.MathUtils.clamp(1 - this.TARegularCameraRotationFadeClock.getElapsedTime(), 0, 1);
      var cameraRotXOffset = (cameraRotXIdleOffset * transitionIdleOffsetCoef) + cameraRotXTransition;
      var cameraRotYOffset = (cameraRotYIdleOffset * transitionIdleOffsetCoef) + cameraRotYTransition;

      this.camera.rotation.x = this.cameraBaseRotX + cameraRotXOffset;
      this.camera.rotation.y = this.cameraBaseRotY + cameraRotYOffset;
    }

    updatePopupText()
    {
      this.popupTextChangeStateCheck();

      if(this.isPopupTextShown) {
        this.popupText_showTween.update();
      } else {
        this.popupText_hideTween.update();
      }
    }

    popupTextChangeStateCheck()
    {
      if(this.inTransitionAnimation) return;
      if(this.mousePosition.y > this.popupTextMouseY && !this.isPopupTextShown)
      {
        this.showPopupText();
      }
      else if(this.mousePosition.y <= this.popupTextMouseY && this.isPopupTextShown)
      {
        this.hidePopupText();
      }
    }

    showPopupText()
    {
      this.isPopupTextShown = true;
      
      this.updateShowPopupTextTween();
      this.popupText_showTween.start();
    }

    hidePopupText()
    {
      this.isPopupTextShown = false;

      this.updateHidePopupTextTween();
      this.popupText_hideTween.start();
    }

    updateShowPopupTextTween()
    {
      const completionTime = this.popupText.position.distanceTo(this.popupTextShowPosition) * this.popupTextSpeed;
      this.popupText_showTween = new TWEEN.Tween(this.popupText.position)
      .to(this.popupTextShowPosition, completionTime)
      .easing(TWEEN.Easing.Cubic.Out);
    }

    updateHidePopupTextTween()
    {
      const completionTime = this.popupText.position.distanceTo(this.popupTextHidePosition) * this.popupTextSpeed;
      this.popupText_hideTween = new TWEEN.Tween(this.popupText.position)
      .to(this.popupTextHidePosition, completionTime)
      .easing(TWEEN.Easing.Cubic.Out);
    }



    startHoldTransition()
    {
      this.initTransitionClock();
      this.isHoldTransitioning = true;

      this.holdTransitionClock.start();
      this.stopHoldTransitionClock.stop();

      this.afterImageExitObject = { value: 0.0 };
      this.afterImageExitTween = new TWEEN.Tween(this.afterImageExitObject)
      .to({ value: 0.95 }, 1.0 * 1000)
      .easing(TWEEN.Easing.Cubic.out)
      .onUpdate(() => {
        this.afterImagePass.uniforms.damp = { value: this.afterImageExitObject.value };
      });
      this.afterImageExitTween.start();
    }

    stopHoldTransition()
    {
      this.isHoldTransitioning = false;
      this.afterImagePass.uniforms.damp = { value: 0.0 };

      this.stopHoldTransitionClock.start();
      this.holdTransitionClock.stop();
      this.afterImageExitTween.stop();
      //TODO - TOCHECK - this.initTransitionCLock(); used to be called here
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

    onMouseDown(event)
    {
      if(this.isPopupTextShown && !this.isHoldTransitioning && !this.inTransitionAnimation)
      {
        this.startHoldTransition();
      }
    }

    onMouseUp(event)
    {
      if(this.isHoldTransitioning && !this.inTransitionAnimation)
      {
        this.stopHoldTransition();
      }
    }


  
    initEnterAniamtion()
    {
      this.enterAnimationPlaying = true;

      this.apertureObject = { value: this.guiPostprocessing.bokeh.uniforms['aperture'].value };

      //second tween
      this.EAApertureDown = new TWEEN.Tween(this.apertureObject)
      .to({value: 0}, 1.5 * 1000)
      .easing(TWEEN.Easing.Cubic.Out)
      .onUpdate(() => { this.guiPostprocessing.bokeh.uniforms['aperture'].value = this.apertureObject.value })
      .onComplete(() => {
        this.enterAnimationPlaying = false;
      });

      //first tween
      this.EAApertureUp = new TWEEN.Tween(this.apertureObject)
      .to({value: 5 * this.appertureCoef}, 1.0 * 1000)
      .easing(TWEEN.Easing.Cubic.Out)
      .onUpdate(() => { this.guiPostprocessing.bokeh.uniforms['aperture'].value = this.apertureObject.value })
      .onComplete(() => {
        this.EAApertureDown.start();
      });

      //Postprocessing tween
      this.contrastParamObject = { value: 0.0 };
      this.contrastEnterTween = new TWEEN.Tween(this.contrastParamObject)
      .to({ value: 1.0 }, 1.5 * 1000)
      .easing(TWEEN.Easing.Cubic.Out)
      .onUpdate(() => {
        this.contrastTransitionMaterial.uniforms.uContrast = { value: this.contrastParamObject.value };
        this.contrastTransitionMaterial.uniforms.uSubtraction = { value: 1.0 - this.contrastParamObject.value };
      });
    }

    initExitAnimation()
    {
      //Postprocessing tween
      this.contrastExitParamObject = { value: 0.0 };
      this.contrastExitTween = new TWEEN.Tween(this.contrastExitParamObject)
      .to({ value: 1.0 }, 1.0 * 1000)
      .easing(TWEEN.Easing.Cubic.Out)
      .onUpdate(() => {
        this.contrastTransitionMaterial.uniforms.uContrast = { value: 1.0 - this.contrastExitParamObject.value };
        this.contrastTransitionMaterial.uniforms.uSubtraction = { value: this.contrastExitParamObject.value };
      });
    }
}