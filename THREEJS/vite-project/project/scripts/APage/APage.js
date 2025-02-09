export default class APage
{
    pageMeshes = [];
    finishedLoading = false;

    constructor(scene, camera, clock, composer)
    {
        //TODO - CREATE ALL OF THESE THINGS HERE
        this.scene = scene;
        this.camera = camera;
        this.clock = clock;
        this.composer = composer;

        this.Init();
    }

    Init()
    {
        document.addEventListener("mousemove", this.OnMouseMove, false);
        document.addEventListener('mousedown', this.OnMouseDown, false);
        document.addEventListener('mouseup', this.OnMouseUp, false);
        document.body.onscroll = this.OnScroll;

        window.addEventListener('resize', OnWindowResize);

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
    }
    DoEnter() {}

    Exit()
    {
        this.pageMeshes.forEach(mesh => {
            mesh.visible = false;
        });

        this.DoExit();
    }
    DoExit() {}

    Update()
    {
        if(this.finishedLoading)
        {
            return this.DoUpdate();
        }
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

    OnScroll()
    {
        this.DoOnScroll();
    }
    DoOnScroll() {}
    

    // Window
    //TODO - This might not even work at all? First time testing it
    OnWindowResize()
    {
        //TODO - Remove this comment once this function works, windowHalfX & Y was being calculated for some reason?? code from a tutorial that never got deleted?

        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(window.innerWidth, window.innerHeight);
        //TODO - was:    this.postprocessing.composer
        this.composer.setSize(window.innerWidth, window.innerHeight);
        
        this.DoOnWIndowResize();
    }
    DoOnWIndowResize() {}
}