import './style.css';
import * as THREE from 'three';

import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

//PostProcessing
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass.js';
import { BokehPass } from 'three/examples/jsm/Addons.js';
//TODO: Bokeh2, FFXA

//Classes
import * as Page from './project/scripts/Page';






// Setup

const scene = new THREE.Scene();

const cameraBaseFov = 75;
const camera = new THREE.PerspectiveCamera(cameraBaseFov, window.innerWidth / window.innerHeight, 0.01, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.set(0, 0, 0);

renderer.render(scene, camera);

const renderScene = new RenderPass(scene, camera);
const composer = new EffectComposer(renderer);
composer.addPass(renderScene);



// Clock

const clock = new THREE.Clock(true);



// Pages

const homePage = new Page.HomePage(scene, camera, clock);
homePage.init();

const currentPage = homePage;


// Lights

const ambientLight = new THREE.AmbientLight(0xffffff);
ambientLight.intensity = 1;
scene.add(ambientLight);

const pointLightA = new THREE.PointLight();
pointLightA.position.set(0, 10, 20);
//pointLightA.intensity = 250;
pointLightA.intensity = 2500;
pointLightA.color = new THREE.Color(0.75, 0.75, 1);
scene.add(pointLightA);






// Post-Processing

const postprocessing = {};

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
  10.5, //Intensity
  0.1,  //Radius
  2.5   //Which pixels are affected
);
composer.addPass(bloomPass);

// Film
const filmPass = new FilmPass(1, false);
composer.addPass(filmPass);

// Bokeh
const bokehPass = new BokehPass( scene, camera, {
  focus: 1.0,
  aperture: 0.025,
  maxblur: 0.01
} );
composer.addPass(bokehPass);
postprocessing.bokeh = bokehPass;

const effectController = {

  focus: 250.0,
  aperture: 1.5,
  maxblur: 0.01

};
const matChanger = function ( )
{
  postprocessing.bokeh.uniforms[ 'focus' ].value = effectController.focus;
  postprocessing.bokeh.uniforms[ 'aperture' ].value = effectController.aperture * 0.00001;
  postprocessing.bokeh.uniforms[ 'maxblur' ].value = effectController.maxblur;
};

const gui = new GUI();
gui.add( effectController, 'focus', 0.0, 3000.0, 10 ).onChange( matChanger );
gui.add( effectController, 'aperture', 0, 10, 0.1 ).onChange( matChanger );
gui.add( effectController, 'maxblur', 0.0, 1, 0.01 ).onChange( matChanger );
gui.close();

matChanger();



// Scroll
/*
function MoveCamera()
{
  const t = document.body.getBoundingClientRect().top;
}
document.body.onscroll = MoveCamera;*/



// Mouse movement

var mousePosition = new THREE.Vector2(0.0, 0.0);

function OnMouseMove(event)
{
  mousePosition.x = (event.clientX / window.innerWidth) * 2 - 1;
  mousePosition.y = -(event.clientY / window.innerHeight) * 2 + 1;

  currentPage.onMouseMove(mousePosition);
}
document.addEventListener("mousemove", OnMouseMove, false);

// TODO - APPLY THIS
function onWindowResize()
{
  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;

  width = window.innerWidth;
  height = window.innerHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize( width, height );
  postprocessing.composer.setSize( width, height );
}
window.addEventListener('resize', onWindowResize);
// TODO - APPLY THIS



function animate()
{
  currentPage.update();

  composer.render();
  requestAnimationFrame(animate);
  //renderer.render(scene, camera);
}

animate();