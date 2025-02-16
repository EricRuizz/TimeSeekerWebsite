import * as THREE from 'three';

import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';


export default class APage
{
    pageMeshes = [];

    constructor()
    {        
        this.scene = new THREE.Scene();
        
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 1000);

        this.renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#bg'),
        });

        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.camera.position.set(0, 0, 0);

        this.renderScene = new RenderPass(this.scene, this.camera);
        this.composer = new EffectComposer(this.renderer);
        this.composer.addPass(this.renderScene);

        this.clock = new THREE.Clock(true);

        this.Init();
    }


    Init()
    {
        this.mousePosition = new THREE.Vector2(0.0, 0.0);


        this.OnMouseMove = this.OnMouseMove.bind(this);
        this.OnMouseDown = this.OnMouseDown.bind(this);
        this.OnMouseUp = this.OnMouseUp.bind(this);
        
        this.OnScroll = this.OnScroll.bind(this);
        this.OnWheel = this.OnWheel.bind(this);
        this.OnWindowResize = this.OnWindowResize.bind(this);

        document.addEventListener("mousemove", this.OnMouseMove, false);
        document.addEventListener('mousedown', this.OnMouseDown, false);
        document.addEventListener('mouseup', this.OnMouseUp, false);

        window.addEventListener('scroll', this.OnScroll, false);
        window.addEventListener('wheel', this.OnWheel, false);
        window.addEventListener('resize', this.OnWindowResize, false);

        
        this.finishedLoading = false;
        this.DoInit();
    }
    DoInit() {}


    SceneAdditions()
    {
        this.pageMeshes.forEach(mesh => {
            this.scene.add(mesh);
            mesh.visible = false;
        });

        this.finishedLoading = true;
    }


    Enter()
    {
        this.pageMeshes.forEach(mesh => {
            mesh.visible = true;
        });
        
        this.DoEnter();
        this.Update();
    }
    DoEnter() {}

    Exit()
    {
        this.pageMeshes.forEach(mesh => {
            mesh.visible = false;
        });
        
        document.removeEventListener("mousemove", this.OnMouseMove, false);
        document.removeEventListener('mousedown', this.OnMouseDown, false);
        document.removeEventListener('mouseup', this.OnMouseUp, false);

        window.removeEventListener('scroll', this.OnScroll, false);
        window.removeEventListener('wheel', this.OnWheel, false);
        window.removeEventListener('resize', this.OnWindowResize, false);

        this.DoExit();
    }
    DoExit() {}


    Update()
    {
        if(this.finishedLoading)
        {
            this.DoUpdate();
        }

        this.composer.render();
        requestAnimationFrame(() => this.Update());
    }
    DoUpdate() {}


    // Document
    OnMouseMove(event)
    {
        this.mousePosition.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mousePosition.y = -(event.clientY / window.innerHeight) * 2 + 1;

        this.DoOnMouseMove(event);
    }
    DoOnMouseMove(event) {}

    OnMouseDown(event)
    {
        this.DoOnMouseDown(event);
    }
    DoOnMouseDown(event) {}

    OnMouseUp(event)
    {
        this.DoOnMouseUp(event);
    }
    DoOnMouseUp(event) {}

    OnScroll(event)
    {
        this.DoOnScroll(event);
    }
    DoOnScroll(event) {}

    OnWheel(event)
    {
        this.DoOnWheel(event);
    }
    DoOnWheel(event) {}
    

    // Window
    OnWindowResize()
    {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.composer.setSize(window.innerWidth, window.innerHeight);
        
        this.DoOnWIndowResize();
    }
    DoOnWIndowResize() {}
}