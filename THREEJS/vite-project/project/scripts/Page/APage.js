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
        this.pageMeshes.forEach(mesh => {
            console.log("ASDASD");
            this.scene.add(mesh);
        });
    }

    enter()
    {
        this.pageMeshes.forEach(mesh => {
            mesh.visible = true;
        });
        
        this.doEnter();
    }

    exit()
    {
        this.pageMeshes.forEach(mesh => {
            mesh.visible = false;
        });

        this.doExit();
    }

    doEnter() {}
    doExit() {}
}