import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass.js';
//TODO: Bokeh2, 

import * as dat from 'dat.gui';

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

const cameraBaseFov = 75;
const cameraFovRange = -2.5;
const cameraFovSpeed = 0.25;
const camera = new THREE.PerspectiveCamera(cameraBaseFov, window.innerWidth / window.innerHeight, 0.01, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.set(0, 0, 0);
const cameraBaseRotX = THREE.MathUtils.degToRad(-20);
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
moon.position.set(0, 100, 200);
moon.rotateX(THREE.MathUtils.degToRad(-40));
moon.rotateY(THREE.MathUtils.degToRad(90));

const cameraLookTarget = new THREE.Vector3().subVectors(moon.position, new THREE.Vector3(0, 10, 0));

scene.add(moon);



// Text

const textplaneGeometry = new THREE.PlaneGeometry(0.75, 0.75, 5, 5);
const textPlaneMaterial = new THREE.MeshStandardMaterial({ map: new THREE.TextureLoader().load('./project/textures/TimeSeeker_Transparent.png'), transparent: true });
const textplane = new THREE.Mesh(textplaneGeometry, textPlaneMaterial);
textplane.position.set(0, 1.5, 2.5);
textplane.lookAt(camera.position);
scene.add(textplane);



// Skybox

const skyboxGeometry = new THREE.SphereGeometry(500, 500, 500);
const skyboxMaterial = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./project/textures/NightSkyTexture_Dark.png'), side: THREE.BackSide });
const skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterial);
skybox.position.set(0, 0, 0);

//scene.add(skybox);



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
//pointLightA.intensity = 250;
pointLightA.intensity = 2500;
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
  // Base material properties
  flatShading: false
});
const waves = new THREE.Mesh(wavePlane, waveMaterial);
waves.position.set(0, 0, wavePlaneLength / 2);
waves.rotateX(THREE.MathUtils.degToRad(270));

scene.add(waves);



// Post-Processing

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

// Film
const filmPass = new FilmPass(1, false);
composer.addPass(filmPass);


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



// GUI

const params = {
  focus: 1.0,
  aperture: 0.25,
  maxblur: 0.01,
};

// Initialize dat.GUI
const gui = new dat.GUI();

// Add controls for each parameter
gui.add(params, 'focus', 10.0, 3000.0, 10).onChange(value => {
  bokehPass.uniforms['focus'] = value;
});

gui.add(params, 'aperture', 0, 10, 0.1).onChange(value => {
  bokehPass.uniforms['aperture'] = value * 0.00001;
});

gui.add(params, 'maxblur', 0.0, 0.01, 0.001).onChange(value => {
  bokehPass.uniforms['maxblur'] = value;
});
*/



// Helpers

//const lightHelper = new THREE.PointLightHelper(pointLight);
//scene.add(lightHelper);

//const gridHelper = new THREE.GridHelper(100, 50);
//scene.add(gridHelper);



// Controls

const controls = new OrbitControls(camera, renderer.domElement);



// Raycasting

var raycaster = new THREE.Raycaster();
var scribbleRaycastTargets = [];
scribbleRaycastTargets.push(textplane);



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

var mousePosition = new THREE.Vector2(0.0, 0.0);
var currentMouseFollowPos = new THREE.Vector2(0.0, 0.0);

function OnMouseMove(event)
{
  mousePosition.x = (event.clientX / window.innerWidth) * 2 - 1;
  mousePosition.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mousePosition, camera);
  const intersects = raycaster.intersectObjects(scribbleRaycastTargets, true);
    
  if (intersects.length > 0) {
    console.log(intersects);
  }
}
document.addEventListener("mousemove", OnMouseMove, false);

const mouseXCoef = 0.16;
const mouseYCoef = 0.09;



// Animation Variables

var cameraRotOffsetIdle = new THREE.Vector2(0.0, 0.0);

// Camera idle position
const cameraYMovementSpeed = 1.0;
const cameraYMovementRange = 0.025;
const cameraYOffset = 0.2 + cameraYMovementRange;

// Camera idle rotation
const cameraIdleYRotationSpeed = 1.0;
const cameraIdleXRotationSpeed = cameraIdleYRotationSpeed / 2.0;
const cameraIdleXRotationRange = 0.025;
const cameraIdleYRotationRange = 0.025;
const cameraIdleXRotationOffset = cameraIdleXRotationRange / 2.0 * -1;
const cameraIdleYRotationOffset = cameraIdleYRotationRange / 2.0 * -1;



// General

function animationUpdates()
{
  // Camera FOV
  camera.fov = Math.sin(clock.getElapsedTime() * cameraFovSpeed) * cameraFovRange + cameraBaseFov;

  // Camera Y movement
  camera.position.y = Math.sin(clock.getElapsedTime() * cameraYMovementSpeed) * cameraYMovementRange + cameraYOffset;

  // Camera rotation
  cameraRotOffsetIdle.x = Math.sin(clock.getElapsedTime() * cameraIdleXRotationSpeed) * cameraIdleXRotationRange + cameraIdleXRotationOffset;
  cameraRotOffsetIdle.y = Math.sin(clock.getElapsedTime() * cameraIdleYRotationSpeed) * cameraIdleYRotationRange + cameraIdleYRotationOffset;

  var goalMouseFollowPos = mousePosition.clone();
  goalMouseFollowPos.x = -mousePosition.x * mouseXCoef;
  goalMouseFollowPos.y = -mousePosition.y * mouseYCoef;

  var direction = new THREE.Vector2().subVectors(goalMouseFollowPos, currentMouseFollowPos);
  var distance = direction.length();
  direction.normalize();

  var speed = Math.min(distance * 0.2, 1);

  direction.multiplyScalar(speed);
  currentMouseFollowPos.add(direction);

  var cameraRotXOffset = cameraRotOffsetIdle.x + currentMouseFollowPos.x;
  var cameraRotYOffset = cameraRotOffsetIdle.y + currentMouseFollowPos.y;

  camera.rotation.x = cameraBaseRotX + cameraRotYOffset;
  camera.rotation.y = cameraBaseRotY + cameraRotXOffset;

  camera.updateProjectionMatrix();

  // Uniforms
  waveMaterial.uniforms.uTime.value += 0.002;

  // Skybox
  skybox.rotation.y += 0.0001;

  // Helpers
  moonLightHelper.update();
}

function animate() {
  //controls.update();

  animationUpdates();

  composer.render();
  requestAnimationFrame(animate);
}

animate();