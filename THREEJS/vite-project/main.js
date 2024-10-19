import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { mx_hash_int_3 } from 'three/src/nodes/materialx/lib/mx_noise.js';

import vertexShader from './project/shaders/GerstnerVertex.glsl'


// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.set(0, 0.5, 0);

renderer.render(scene, camera);

const renderScene = new RenderPass(scene, camera);
const composer = new EffectComposer(renderer);
composer.addPass(renderScene);



// Moon (StandardMaterial = Affected by light  /  BasicMaterial = Not affected by light)

const moonGeometry = new THREE.SphereGeometry(10, 30, 30);
const moonMaterial = new THREE.MeshStandardMaterial({ map: new THREE.TextureLoader().load('./project/textures/MoonTexture_Red.png') });
const moon = new THREE.Mesh(moonGeometry, moonMaterial);
moon.position.set(0, 100, 200);

const cameraLookTarget = new THREE.Vector3().subVectors(moon.position, new THREE.Vector3(0, 50, 0));

scene.add(moon);



// Skybox

const skyboxGeometry = new THREE.SphereGeometry(500, 500, 500);
const skyboxMaterial = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./project/textures/NightSkyTexture_Dark.png'), side: THREE.BackSide });
const skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterial);
skybox.position.set(0, 0, 0);

scene.add(skybox);



// Lights

const ambientLight = new THREE.AmbientLight(0xffffff);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(0, 0, -20);
pointLight.intensity = 250;
pointLight.color = new THREE.Color(1, 0.75, 0.75);

scene.add(ambientLight, pointLight);



// Stars

function AddStar()
{
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial( { color:0xffffff } )
  const star = new THREE.Mesh(geometry, material);

  const x = 1;
  const [y, z] = Array(2).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  //scene.add(star);
}
//Array(200).fill().forEach(AddStar);



// Waves

const wavePlaneWidth = 100;
const wavePlaneLength = 100;
const wavePlaneWidthSegments = 10;
const wavePlaneLengthSegments = 10;

const wavePlane = new THREE.PlaneGeometry(wavePlaneWidth, wavePlaneLength, wavePlaneWidthSegments, wavePlaneLengthSegments);
const waveMaterial = new THREE.ShaderMaterial({ vertexShader: , fragmentShader: });
const waves = new THREE.Mesh(wavePlane, waveMaterial);
waves.position.set(0, 0, wavePlaneLength / 2);
waves.rotateX(THREE.MathUtils.degToRad(270));

scene.add(waves);



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



// Normal map example

/*
const exampleTexture = new THREE.TextureLoader().load('example.png');
const exampleNormalTexture = new THREE.TextureLoader().load('exampleNormal.png');

const exampleMesh = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshStandardMaterial( { map: example, normalMap: exampleNormalTexture } )
);

scene.Add(exampleMesh);
*/



// Helpers

//const lightHelper = new THREE.PointLightHelper(pointLight);
//scene.add(lightHelper);

//const gridHelper = new THREE.GridHelper(100, 50);
//scene.add(gridHelper);


// General

function animationUpdates()
{
  moon.rotation.x += 0.01;
  moon.rotation.y += 0.005;
  moon.rotation.z += 0.01;

  camera.lookAt(cameraLookTarget);

  skybox.rotation.y += 0.0001;
}

function animate() {
  controls.update();

  animationUpdates();

  //renderer.render(scene, camera);
  composer.render();
  requestAnimationFrame(animate);
}

animate();