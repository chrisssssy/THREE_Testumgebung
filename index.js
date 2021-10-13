import * as THREE from './build/three.module.js';
import { TransformControls } from './examples/jsm/controls/TransformControls.js';
import { OrbitControls } from './examples/jsm/controls/OrbitControls.js';
import { EditorControls } from './editor/js/EditorControls.js';

import { UIPanel } from './editor/js/libs/ui.js';
import { ViewHelper } from './editor/js/Viewport.ViewHelper.js';

let camera, scene, renderer, container, viewHelper;
let geometry, material, mesh;
let orbitControls;

// init();

init2();

function init2() {

    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);
    camera.position.set(2,2,3);
    camera.lookAt(1,1,0);

    scene = new THREE.Scene();

    geometry = new THREE.BoxGeometry(1, 1, 1);
    material = new THREE.MeshNormalMaterial();

    mesh = new THREE.Mesh(geometry, material);
    mesh.name = "cube";
    scene.add(mesh);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    document.body.appendChild(renderer.domElement);






    let transformControls = new TransformControls(camera, renderer.domElement);
    scene.add(transformControls);

    transformControls.attach(mesh);

    renderer.domElement.addEventListener("mousemove", mousemove, false);
    renderer.domElement.addEventListener("mousedown", mousedown, false);


    let editorControls = new EditorControls(camera, renderer.domElement);
    editorControls.focus(mesh);

    transformControls.addEventListener("dragging-changed", event => editorControls.enabled = !event.value);

    

}



function init() {

    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);
    camera.position.set(2,2,3);
    camera.lookAt(1,1,0);

    scene = new THREE.Scene();

    geometry = new THREE.BoxGeometry(1, 1, 1);
    material = new THREE.MeshNormalMaterial();

    mesh = new THREE.Mesh(geometry, material);
    mesh.name = "cube";
    scene.add(mesh);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth*0.9, window.innerHeight*0.9);
    
    renderer.setAnimationLoop(animation);

    






    let transformControls = new TransformControls(camera, renderer.domElement);
    scene.add(transformControls);

    transformControls.attach(mesh);

    console.log(transformControls.getRaycaster());

    renderer.domElement.addEventListener("mousemove", mousemove, false);
    renderer.domElement.addEventListener("mousedown", mousedown, false);

    // orbitControls = new OrbitControls(camera, renderer.domElement);
    // orbitControls.target = new THREE.Vector3(0,1,0);

    let editorControls = new EditorControls(camera, renderer.domElement);
    editorControls.focus(mesh);

    transformControls.addEventListener("dragging-changed", event => editorControls.enabled = !event.value);

    container = new UIPanel();
    container.setId( 'viewport' );
	container.setPosition( 'absolute' );

    container.dom.appendChild( renderer.domElement );

    document.body.appendChild(container.dom);

    viewHelper = new ViewHelper( camera, container );
    viewHelper.controls = editorControls;

}

function mousedown(event) {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

	raycaster.setFromCamera( mouse, camera );
    // console.log(raycaster.params)

    let visibleObjects = [];


    scene.traverseVisible(obj => visibleObjects.push(obj));

    let hits = raycaster.intersectObjects(visibleObjects);


	console.log(hits.map(x => x.object));

}


function mousemove(event) {
}

var clock = new THREE.Clock(); // only used for animations

function animation(time) {

    // mesh.rotation.x = time / 2000;
    // mesh.rotation.y = time / 1000;

	var delta = clock.getDelta();

    if ( viewHelper.animating === true ) {

        viewHelper.update( delta );
    }

    renderer.setViewport( 0, 0, container.dom.offsetWidth, container.dom.offsetHeight );
    renderer.render(scene, camera);

    renderer.autoClear = false;
    viewHelper.render( renderer );
    renderer.autoClear = true;

}