import '/style.css';
import * as THREE from 'three';

//PostProcessing
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
//TODO: FFXA

//Classes
import * as Page from '/project/scripts/APage';










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

// is this needed???? maybe
renderer.render(scene, camera);
// is this needed????

const renderScene = new RenderPass(scene, camera);
const composer = new EffectComposer(renderer);
composer.addPass(renderScene);






const currentPage = new Page.BreathPage(scene, camera, clock, composer);





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