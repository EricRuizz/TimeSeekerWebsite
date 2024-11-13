import * as THREE from 'three';
export default class APage
{
    pageMeshes = [];


    constructor(scene, camera, clock)
    {
        this.scene = scene;
        this.camera = camera;
        this.clock = clock;
    }

    init() {}

    sceneAdditions()
    {
        console.log("FFFFFF");
        pageMeshes.forEach(mesh => {
            console.log("ASDASD");
            this.scene.add(mesh);
        });
    }

    enter()
    {
        pageMeshes.forEach(mesh => {
            mesh.visible = true;
        });
        
        this.doEnter();
    }

    exit()
    {
        pageMeshes.forEach(mesh => {
            mesh.visible = false;
        });

        this.doExit();
    }

    doEnter() {}
    doExit() {}
}