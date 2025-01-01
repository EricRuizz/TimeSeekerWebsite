export default class APage
{
    pageMeshes = [];
    finishedLoading = false;
    pageIndex = -1;

    constructor(scene, camera, clock, composer)
    {
        this.scene = scene;
        this.camera = camera;
        this.clock = clock;
        this.composer = composer;
    }

    init(autoEnter) {}

    initPageIndex(index)
    {
        this.pageIndex = index; 
        this.nextPageIndex = this.pageIndex; 
    }

    sceneAdditions()
    {
        this.pageMeshes.forEach(mesh => {
            this.scene.add(mesh);
            mesh.visible = false;
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
            return this.doUpdate();
        }
    }

    onMouseMove(mousePosition) {}
    onMouseDown(event) {}
    onMouseUp(event) {}
}