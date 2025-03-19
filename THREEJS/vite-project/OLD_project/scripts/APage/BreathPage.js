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
//TODO: FFXA

// Shader imports
import CustomShaderMaterial from "three-custom-shader-material/vanilla";

import {
  patchShadersCSM,
  GerstnerWave,
  Perlin
} from "gl-noise"

import ContrastTransitionVS from '../../shaders/ContrastTransitionVertex.glsl';
import ContrastTransitionFS from '../../shaders/ContrastTransitionFragment.glsl';
//import TopFadeVS from '../../shaders/TopFadeVertex.glsl';
//import TopFadeFS from '../../shaders/TopFadeFragment.glsl';
//import BotFadeVS from '../../shaders/BotFadeVertex.glsl';
//import BotFadeFS from '../../shaders/BotFadeFragment.glsl';
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

    async DoInit()
    {
      this.InitPostProcessing();

      this.InitEnterAniamtion();
      this.InitExitAnimation();

      await Promise.all([
        this.InitMoon(),
        this.InitSkybox(),
        this.InitWaves(),
        //this.InitBotFade(),
        this.InitPopupText(),
      ]);

      this.IntiRayasting();
      this.InitLights();
      this.InitCamera();
      this.InitMouseMovement();
      this.InitHoldTransition();

      super.SceneAdditions();
      super.Enter();
    }

    DoEnter()
    {
      history.replaceState({}, "", "/Breath");

      this.EAApertureUp.start();
      this.contrastEnterTween.start();
    }

    DoExit()
    {
      window.location.href = 'project/pages/home.html';
    }



    InitPostProcessing()
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

      // Contrast & Subtraction (Custom)
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

      /*
      // Top fade (Custom)
      this.i_uTopFadeCoef = 0.0;
      this.topFadeMaterial = new ShaderMaterial(
      {
        defines: { LABEL: "value" },
        uniforms: { tDiffuse: new Uniform(null),
          uTopFadeCoef: { value: this.i_uTopFadeCoef }
         },
        vertexShader: TopFadeVS,
        fragmentShader: TopFadeFS
      });
      
      this.topFadePass = new ShaderPass(this.topFadeMaterial, "tDiffuse");
      this.composer.addPass(this.topFadePass);
      */

      // Tweens
      // TopFade Enter
      this.topFadeEnterParamObject = { value: 0.0 };
      this.topFadeEnterTween = new TWEEN.Tween(this.topFadeEnterParamObject)
      .to({ value: 1.0 }, 0.5 * 1000)
      .easing(TWEEN.Easing.Cubic.Out)
      .onUpdate(() => {
        //this.topFadeMaterial.uniforms.uTopFadeCoef = { value: this.topFadeEnterParamObject.value };
      });
      // TopFade Exit
      this.topFadeExitParamObject = { value: 1.0 };
      this.topFadeExitTween = new TWEEN.Tween(this.topFadeExitParamObject)
      .to({ value: 0.0 }, 0.5 * 1000)
      .easing(TWEEN.Easing.Cubic.Out)
      .onUpdate(() => {
        //this.topFadeMaterial.uniforms.uTopFadeCoef = { value: this.topFadeExitParamObject.value };
      });
    }

    async InitMoon()
    {
      const moonGeometry = new THREE.SphereGeometry(10, 30, 30);
      const moonMaterial = new THREE.MeshStandardMaterial({ map: new THREE.TextureLoader().load('./project/textures/MoonTexture.jpg') });
      this.moon = new THREE.Mesh(moonGeometry, moonMaterial);
      this.moon.position.set(0, 150, 200);
      this.moon.rotateX(THREE.MathUtils.degToRad(-40));
      this.moon.rotateY(THREE.MathUtils.degToRad(90));

      this.pageMeshes.push(this.moon);
    }

    async InitSkybox()
    {
      const skyboxGeometry = new THREE.SphereGeometry(500, 32, 32);
      const skyboxMaterial = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./project/textures/NightSkyTexture_Dark.png'), side: THREE.BackSide });
      this.skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterial);
      this.skybox.position.set(0, 0, 0);
      this.skybox.rotation.y = 180;

      this.pageMeshes.push(this.skybox);
    }

    InitHoldTransition()
    {
      this.holdTimeToTransition = 3;
      this.isHoldTransitioning = false;
      this.inTransitionAnimation = false;

      this.InitTransitionClock();

      // Animation
      this.transitionAnimationClock = new THREE.Clock(false);
      this.TACameraRotSpeed = 1;
      this.TACameraRotationGoal = THREE.MathUtils.DEG2RAD * 75;

      this.TARegularCameraRotationFadeClock = new THREE.Clock(false);
    }

    InitTransitionClock()
    {
      this.holdTransitionClock = new THREE.Clock(false);
      this.stopHoldTransitionClock = new THREE.Clock(false);
    }

    async InitWaves()
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

      this.waveSpeed = 1.0;
    }

    /*
    async InitBotFade()
    {
      const o_BotFadeFS = {
        defines: "",
        header: "",
        main: BotFadeFS,
      };
      const { defines, header, main } = await patchShadersCSM(o_BotFadeFS, [Perlin]);
      const s_BotFadeFS = `${defines}${header}${main}`;

      const botFadePlaneWidth = 200;
      const botFadePlaneLength = 10;
      const botFadePlaneWidthSegments = 1;
      const botFadePlaneLengthSegments = 1;

      const botFadePlane = new THREE.PlaneGeometry(botFadePlaneWidth, botFadePlaneLength, botFadePlaneWidthSegments, botFadePlaneLengthSegments);
      const botFadeMaterial = new CustomShaderMaterial({
        baseMaterial: THREE.MeshBasicMaterial,
        vertexShader: BotFadeVS,
        fragmentShader: s_BotFadeFS,
        transparent: true,
        // Uniforms
        uniforms: {
          uActive: { value: 0 },
          uTime: { value: 0 },
          uSpeed: { value: 0 },
          uMainColor: { value: new THREE.Vector3(0.0, 1.0, 1.0) },
        },
      });

      this.botFade = new THREE.Mesh(botFadePlane, botFadeMaterial);
      this.botFade.position.set(0, 7, 20);
      this.botFade.rotateX(THREE.MathUtils.degToRad(160));

      this.pageMeshes.push(this.botFade);
    }
    */

    async InitPopupText()
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

      this.UpdateShowPopupTextTween();
      this.UpdateHidePopupTextTween();
    }

    IntiRayasting()
    {
      this.raycaster = new THREE.Raycaster();
      this.scrabbleRaycastTargets = [];
      this.scrabbleRaycastTargets.push(this.scrabbleLogo);
    }

    InitLights()
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

    InitCamera()
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

    InitMouseMovement()
    {
      this.currentMouseFollowPos = new THREE.Vector2(0.0, 0.0);
            
      this.mouseXCoef = 0.30;
      this.mouseYCoef = 0.30;
    }



    DoUpdate()
    {
      this.UpdateTweens();

      this.UpdateTransition();
      this.UpdateWaves();
      //this.UpdateBotFade();
      this.UpdateSkybox();
      this.UpdateCamera();
      this.UpdatePopupText();
      return this.nextPageIndex;
    }

    UpdateTweens()
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

      if(this.topFadeEnterTween.isPlaying())
      {
        this.topFadeEnterTween.update();
      }
      else if(this.topFadeExitTween.isPlaying())
      {
        this.topFadeExitTween.update();
      }
    }

    UpdateTransition()
    {
      if(this.holdTransitionClock.getElapsedTime() >= this.holdTimeToTransition && !this.inTransitionAnimation)
      {
        this.StartTransitionAnimation();
      }
      else if(this.inTransitionAnimation)
      {
        this.contrastExitTween.update();
      }

      if(this.stopHoldTransitionClock.running && this.holdTransitionClock.getElapsedTime() - this.stopHoldTransitionClock.getElapsedTime() <= 0)
      {
        this.InitTransitionClock();
      }
      else if(this.holdTransitionClock.getElapsedTime() >= 3.0)
      {
        //TODO - DELETE super.Exit();
      }

      if(this.isHoldTransitioning)
      {
        this.afterImageExitTween.update();
      }
    }

    StartTransitionAnimation()
    {
      this.inTransitionAnimation = true;
      this.transitionAnimationClock.start();
      this.TARegularCameraRotationFadeClock.start();
      
      this.contrastExitTween.start();
    }

    UpdateWaves()
    {
      this.waves.material.uniforms.uTime.value += this.clock.getDelta() * 0.15;
    }

    UpdateBotFade()
    {
      this.botFade.material.uniforms.uTime.value += this.clock.getDelta();
    }

    UpdateSkybox()
    {
      const skyboxTransitionRotation = 0.0;//THREE.MathUtils.clamp((this.holdTransitionClock.getElapsedTime() * 0.1) ** 3, 0, 0.05);
      const skyboxDefaultRotationOffset = this.clock.getDelta() * 0.01;

      const skyboxRotationOffset = skyboxDefaultRotationOffset + skyboxTransitionRotation;
      this.skybox.rotation.y += skyboxRotationOffset;
    }

    UpdateCamera()
    {
      // Camera FOV
      this.transitionFOVCoef = this.isHoldTransitioning ? this.holdTransitionClock.getElapsedTime() : this.holdTransitionClock.getElapsedTime() - this.stopHoldTransitionClock.getElapsedTime();
      this.transitionFOVCoef = THREE.MathUtils.clamp((this.transitionFOVCoef * 2.0) ** 2.0, 0.0, 40.0);
      this.camera.fov = Math.sin(this.clock.getElapsedTime() * this.cameraFovSpeed) * this.cameraFovRange + this.cameraBaseFov + this.transitionFOVCoef;

      // Camera Y movement
      this.camera.position.y = Math.sin(this.clock.getElapsedTime() * this.cameraYMovementSpeed) * this.cameraYMovementRange + this.cameraYOffset;

      if(!this.inTransitionAnimation)
      {
        this.UpdateCameraRotation();
      }
      
      this.camera.updateProjectionMatrix();
    }

    UpdateCameraRotation()
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

    UpdatePopupText()
    {
      this.PopupTextChangeStateCheck();

      if(this.isPopupTextShown) {
        this.popupText_showTween.update();
      } else {
        this.popupText_hideTween.update();
      }
    }

    PopupTextChangeStateCheck()
    {
      if(this.inTransitionAnimation) return;
      if(this.mousePosition.y > this.popupTextMouseY && !this.isPopupTextShown)
      {
        this.ShowPopupText();
      }
      else if(this.mousePosition.y <= this.popupTextMouseY && this.isPopupTextShown)
      {
        this.HidePopupText();
      }
    }

    ShowPopupText()
    {
      this.isPopupTextShown = true;
      
      this.UpdateShowPopupTextTween();
      this.popupText_showTween.start();

      this.topFadeEnterTween.start();
      this.topFadeExitTween.stop();
    }

    HidePopupText()
    {
      this.isPopupTextShown = false;

      this.UpdateHidePopupTextTween();
      this.popupText_hideTween.start();

      this.topFadeEnterTween.stop();
      this.topFadeExitTween.start();
    }

    UpdateShowPopupTextTween()
    {
      const completionTime = this.popupText.position.distanceTo(this.popupTextShowPosition) * this.popupTextSpeed;
      this.popupText_showTween = new TWEEN.Tween(this.popupText.position)
      .to(this.popupTextShowPosition, completionTime)
      .easing(TWEEN.Easing.Cubic.Out);
    }

    UpdateHidePopupTextTween()
    {
      const completionTime = this.popupText.position.distanceTo(this.popupTextHidePosition) * this.popupTextSpeed;
      this.popupText_hideTween = new TWEEN.Tween(this.popupText.position)
      .to(this.popupTextHidePosition, completionTime)
      .easing(TWEEN.Easing.Cubic.Out);
    }



    StartHoldTransition()
    {
      this.InitTransitionClock();
      this.isHoldTransitioning = true;

      this.holdTransitionClock.start();
      this.stopHoldTransitionClock.stop();

      this.afterImageExitObject = { value: 0.0 };
      this.afterImageExitTween = new TWEEN.Tween(this.afterImageExitObject)
      .to({ value: 0.95 }, 1.0 * 1000)
      .easing(TWEEN.Easing.Cubic.Out)
      .onUpdate(() => {
        this.afterImagePass.uniforms.damp = { value: this.afterImageExitObject.value };
      });
      this.afterImageExitTween.start();
    }

    StopHoldTransition()
    {
      this.isHoldTransitioning = false;
      this.afterImagePass.uniforms.damp = { value: 0.0 };

      this.stopHoldTransitionClock.start();
      this.holdTransitionClock.stop();
      this.afterImageExitTween.stop();
    }



    DoOnMouseDown(event)
    {
      if(this.isPopupTextShown && !this.isHoldTransitioning && !this.inTransitionAnimation)
      {
        this.StartHoldTransition();
      }
    }

    DoOnMouseUp(event)
    {
      if(this.isHoldTransitioning && !this.inTransitionAnimation)
      {
        this.StopHoldTransition();
      }
    }


  
    InitEnterAniamtion()
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

    InitExitAnimation()
    {
      //Postprocessing tween
      this.contrastExitParamObject = { value: 0.0 };
      this.contrastExitTween = new TWEEN.Tween(this.contrastExitParamObject)
      .to({ value: 1.0 }, 1.0 * 1000)
      .easing(TWEEN.Easing.Cubic.Out)
      .onUpdate(() => {
        this.contrastTransitionMaterial.uniforms.uContrast = { value: 1.0 - this.contrastExitParamObject.value };
        this.contrastTransitionMaterial.uniforms.uSubtraction = { value: this.contrastExitParamObject.value };
      })
      .onComplete(() => {
        super.Exit();
      });
    }
}