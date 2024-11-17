import './style.css';
import * as THREE from 'three';

//PostProcessing
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass.js';
//TODO: Bokeh2, 

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
  10.5, //Intensity
  0.1,  //Radius
  2.5   //Which pixels are affected
);
composer.addPass(bloomPass);

// Film
const filmPass = new FilmPass(1, false);
//composer.addPass(filmPass);




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



function animate()
{
  currentPage.update();

  composer.render();
  requestAnimationFrame(animate);
  //renderer.render(scene, camera);
}

animate();