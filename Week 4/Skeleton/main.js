import * as THREE from "/build/three.module.js"
import {scene, camera, renderer, cube, setScene, setSceneElements, GenerateStrip, animateStrip} from "./setup.js"
import {OrbitControls} from "./build/controls/OrbitControls.js";

setScene();
setSceneElements(); //Now includes GenerateStrip()

addSphere();
addLighting();

let controls = new OrbitControls( camera, renderer.domElement );
renderer.setAnimationLoop(UpdateScene);

function UpdateScene() {
    controls.update();
    animateStrip();
    renderer.render(scene, camera);
}

function addSphere() {
    const sphere_geometry = new THREE.SphereGeometry();
    const sphere_material = new THREE.MeshPhongMaterial( {
        color: new THREE.Color(1,0,0),
        wireframe: false,
        shininess: 50,
    });
    scene.add(new THREE.Mesh(sphere_geometry, sphere_material));
}

function addLighting() {
    const cameraLight = new THREE.PointLight(new THREE.Color(1,1,1), 0.5);
    camera.add(cameraLight);
    scene.add(camera);

    const ambientLight = new THREE.AmbientLight(new THREE.Color(1,1,1), 0.2);
    scene.add(ambientLight);
}

//Event Listeners
function resize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width,height);
    camera.aspect = width/height;
    camera.updateProjectionMatrix();
    renderer.render(scene,camera);
}
window.addEventListener('resize', resize);