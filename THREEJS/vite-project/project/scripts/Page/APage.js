export default class APage
{
    pageMeshes = [];
    finishedLoading = false;

    constructor(scene, camera, clock)
    {
        this.scene = scene;
        this.camera = camera;
        this.clock = clock;
    }

    init() {}

    sceneAdditions()
    {
        console.log("Scene Additions");
        this.pageMeshes.forEach(mesh => {
            console.log("Mesh added to scene");
            this.scene.add(mesh);
        });

        this.finishedLoading = true;
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

    doUpdate() {}

    update()
    {
        if(this.finishedLoading)
        {
            this.doUpdate();
        }
    }

    onMouseMove(mousePosition) {}
    onMouseDown(event) {}
    onMouseUp(event) {}
}