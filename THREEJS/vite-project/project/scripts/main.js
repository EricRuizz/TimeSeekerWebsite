import '/style.css';
import * as THREE from 'three';

//PostProcessing
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
//TODO: FFXA

//Classes
import * as Page from '/project/scripts/APage';






// Generic - TODO (use this in loadingPage)

function isHardwareAccelerationEnabled() {
  const canvas = document.createElement("canvas");
  const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

  if (!gl) {
      console.warn("WebGL not supported. 'Hardware acceleration'/'Graphics rendering' might be off.");
      return false;
  }

  const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
  const renderer = debugInfo
      ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
      : "Unknown Renderer";

  console.log("Renderer:", renderer);

  // Check for typical software renderers
  const isSoftwareRenderer =
      renderer.toLowerCase().includes("software") ||
      renderer.toLowerCase().includes("swiftshader") ||
      renderer.toLowerCase().includes("llvmpipe");

  if (isSoftwareRenderer) {
      console.warn("Software rendering detected. 'Hardware acceleration'/'Graphics rendering' might be off.");
      return false;
  }

  return true;
}



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

//Loading page
//TODO - use isHardwareAccelerationEnabled() in order to bring the user to breathPage or to hubPage - OR not? since it is not done in US

// Home page
//const loadingPage = new Page.LoadingPage(scene, camera, clock, composer);
//var loadingPageIndex = loadingPage.init(false);
//const breathPage = new Page.BreathPage(scene, camera, clock, composer);
//var breathPageIndex = breathPage.init(true);
const homePage = new Page.HomePage(scene, camera, clock, composer);
var homePageIndex = homePage.init(true);

var currentPageIndex = homePageIndex;
const currentPage = homePage;







// Scroll
/*
function MoveCamera()
{
  const t = document.body.getBoundingClientRect().top;
}
document.body.onscroll = MoveCamera;*/



// Mouse movement

var mousePosition = new THREE.Vector2(0.0, 0.0);
/*
function OnMouseMove(event)
{
  mousePosition.x = (event.clientX / window.innerWidth) * 2 - 1;
  mousePosition.y = -(event.clientY / window.innerHeight) * 2 + 1;

  currentPage.onMouseMove(mousePosition);
}
document.addEventListener("mousemove", OnMouseMove, false);
*/
function OnMouseDown(event)
{
  currentPage.onMouseDown(event);
}
document.addEventListener('mousedown', OnMouseDown, false);

function OnMouseUp(event)
{
  currentPage.onMouseUp(event);
}
document.addEventListener('mouseup', OnMouseUp, false);



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



function switchCurrentScene(pageIndexResult)
{
  //TODO - scene switching - CALL EXIT() end ENTER() and all that kind of stuff
  if(pageIndexResult == 0)
  {

  }
  else if(pageIndexResult == 1)
  {

  }
  else if(pageIndexResult == 2)
  {

  }
}

function animate()
{
  var pageIndexResult = currentPage.update()
  if(pageIndexResult != currentPageIndex)
  {
    switchCurrentScene(pageIndexResult);
  }

  composer.render();
  requestAnimationFrame(animate);
  //renderer.render(scene, camera);
}

animate();