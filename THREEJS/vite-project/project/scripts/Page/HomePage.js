import APage from "./APage";
//import GerstnerVS from '../../shaders/GerstnerVertex.glsl';
//import GerstnerFS from './project/shaders/GerstnerFragment.glsl';

export default class HomePage extends APage
{
    constructor()
    {
        super();
    }

    init()
    {
        
        const cubeTest = new THREE.SphereGeometry(100, 8, 8);
        const cubeTestMat = new THREE.MeshStandardMaterial({ color: new THREE.Color(0, 0, 0, 1) });
        const cTest = new THREE.Mesh(cubeTest, cubeTestMat);
        cTest.position.set(0, 100, 200);
        this.pageMeshes.push(cTest);

        super.sceneAdditions();
    }

    doEnter()
    {
        console.log("doEnter");
    }

    doExit()
    {
        console.log("doExit");
    }
}