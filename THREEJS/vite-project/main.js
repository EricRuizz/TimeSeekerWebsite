import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';

import CustomShaderMaterial from "three-custom-shader-material/vanilla";

import GerstnerVS from './project/shaders/GerstnerVertex.glsl';
import GerstnerFS from './project/shaders/GerstnerFragment.glsl';

import {
  patchShadersCSM,
  GerstnerWave,
  Perlin
} from "gl-noise"



// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.set(0, 0, 0);
const cameraBaseRotX = THREE.MathUtils.degToRad(-10);
const cameraBaseRotY = THREE.MathUtils.degToRad(180);

renderer.render(scene, camera);

const renderScene = new RenderPass(scene, camera);
const composer = new EffectComposer(renderer);
composer.addPass(renderScene);



// Clock

const clock = new THREE.Clock(true);



// Moon (StandardMaterial = Affected by light  /  BasicMaterial = Not affected by light)

const moonGeometry = new THREE.SphereGeometry(10, 30, 30);
const moonMaterial = new THREE.MeshStandardMaterial({ map: new THREE.TextureLoader().load('./project/textures/MoonTexture.jpg') });
const moon = new THREE.Mesh(moonGeometry, moonMaterial);
moon.position.set(0, 40, 200);
moon.rotateX(THREE.MathUtils.degToRad(-40));
moon.rotateY(THREE.MathUtils.degToRad(90));

const cameraLookTarget = new THREE.Vector3().subVectors(moon.position, new THREE.Vector3(0, 10, 0));

scene.add(moon);



// Skybox

const skyboxGeometry = new THREE.SphereGeometry(500, 500, 500);
const skyboxMaterial = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./project/textures/NightSkyTexture_Dark.png'), side: THREE.BackSide });
const skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterial);
skybox.position.set(0, 0, 0);

scene.add(skybox);



// Lights

const ambientLight = new THREE.AmbientLight(0xffffff);
ambientLight.intensity = 1;
scene.add(ambientLight);

const moonLight = new THREE.SpotLight();
moonLight.position.set(0, 20, 200);
moonLight.intensity = 250000;
moonLight.angle = THREE.MathUtils.degToRad(0.5);
moonLight.penumbra = 1;
moonLight.color = new THREE.Color(1, 0.75, 0.75);
//scene.add(moonLight);

const moonLightHelper = new THREE.SpotLightHelper(moonLight);
//scene.add(moonLightHelper);

const moonLightTarget = new THREE.Object3D();
moonLightTarget.position.set(0, -1.0, 0);
moonLight.target = moonLightTarget;

const pointLightA = new THREE.PointLight();
pointLightA.position.set(0, 10, 20);
pointLightA.intensity = 250;
pointLightA.color = new THREE.Color(1, 0.75, 0.75);
scene.add(pointLightA);



// Stars

function AddStar()
{
  const geometry = new THREE.SphereGeometry(0.25, 8, 8);
  const material = new THREE.MeshStandardMaterial( { color:0xffffff } )
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(200));

  star.position.set(x, y, z);
  scene.add(star);
}
//Array(300).fill().forEach(AddStar);



// Wave CSM Setup

const o_GerstnerVS = {
     defines: "",
     header: "",
     main: GerstnerVS,
};
const { defines, header, main } = await patchShadersCSM(o_GerstnerVS, [GerstnerWave, Perlin]);
const s_GerstnerVS = `${defines}${header}${main}`;


// Waves

const wavePlaneWidth = 4;
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
  // Base material properties
  flatShading: false
});
const waves = new THREE.Mesh(wavePlane, waveMaterial);
waves.position.set(0, 0, wavePlaneLength / 2);
waves.rotateX(THREE.MathUtils.degToRad(270));

scene.add(waves);



// Bloom

const bloomPassLow = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight), //Resolution of the scene
  0.5,  //Intensity
  0.1,  //Radius
  0.1   //Which pixels are affected
);
composer.addPass(bloomPassLow);

const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight), //Resolution of the scene
  10.5,  //Intensity
  0.1,  //Radius
  2.5   //Which pixels are affected
);
composer.addPass(bloomPass);



// Examples

/*
// Normal map

const exampleTexture = new THREE.TextureLoader().load('example.png');
const exampleNormalTexture = new THREE.TextureLoader().load('exampleNormal.png');

const exampleMesh = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshStandardMaterial( { map: example, normalMap: exampleNormalTexture } )
);

scene.Add(exampleMesh);


// Textures to Shaders
const waveMaterial = new THREE.ShaderMaterial(
{
  vertexShader: GerstnerVertexShader,
  fragmentShader: GerstnerFragmentShader, 
  uniforms:
  {
    value: new THREE.TextureLoader().load('./project/textures/NightSkyTexture_Dark.png')
  }
});
*/



// Helpers

//const lightHelper = new THREE.PointLightHelper(pointLight);
//scene.add(lightHelper);

//const gridHelper = new THREE.GridHelper(100, 50);
//scene.add(gridHelper);



// Controls

const controls = new OrbitControls(camera, renderer.domElement);



// Scroll

function MoveCamera()
{
  const t = document.body.getBoundingClientRect().top;

  //camera.position.z = t * 1;
  //camera.position.x = t * 0.002;
  //camera.position.y = t * 0.002;
}
document.body.onscroll = MoveCamera;



// Mouse movement

var mousePosition = new THREE.Vector2();

function OnMouseMove(event)
{
  mousePosition.x = (event.clientX / window.innerWidth) * 2 - 1;
  mousePosition.y = (event.clientY / window.innerHeight) * 2 - 1;
}
document.addEventListener("mousemove", OnMouseMove, false);

const mouseXCoef = 0.1;
const mouseYCoef = 0.1;



// Animation Variables

const cameraYMovementSpeed = 1.0;
const cameraYMovementRange = 0.025;
const cameraYOffset = 0.2 + cameraYMovementRange;



// General

function animationUpdates()
{
  //Camera Y movement
  camera.position.y = Math.sin(clock.getElapsedTime() * cameraYMovementSpeed) * cameraYMovementRange + cameraYOffset;
  if(clock.getElapsedTime() < 1.0)
  {
    //camera.lookAt(cameraLookTarget);
  }

  //Camera rotation
  var cameraRotXOffsetIdle = 0.0;
  var cameraRotYOffsetIdle = 0.0;

  var cameraRotXOffsetMouse = -mousePosition.x * mouseXCoef;
  var cameraRotYOffsetMouse = mousePosition.y * mouseYCoef;

  var cameraRotXOffset = cameraRotXOffsetIdle + cameraRotXOffsetMouse;
  var cameraRotYOffset = cameraRotYOffsetIdle + cameraRotYOffsetMouse;

  camera.rotation.x = cameraBaseRotX + cameraRotYOffset;
  camera.rotation.y = cameraBaseRotY + cameraRotXOffset;

  //Uniforms
  waveMaterial.uniforms.uTime.value += 0.002;

  //Skybox
  skybox.rotation.y += 0.0001;

  //Helpers
  moonLightHelper.update();
}

function animate() {
  //controls.update();

  animationUpdates();

  composer.render();
  requestAnimationFrame(animate);
}

animate();