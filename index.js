// import * as THREE from './build/three.module.js';
import { TransformControls } from './examples/jsm/controls/TransformControls.js';
// import { OrbitControls } from './examples/jsm/controls/OrbitControls.js';
// import { EditorControls } from './editor/js/EditorControls.js';

import { UIPanel } from './editor/js/libs/ui.js';
import { ViewHelper } from './editor/js/Viewport.ViewHelper.js';

let camera, scene, renderer, container, viewHelper;
let geometry, material, mesh;
let orbitControls;
let SCREEN_WIDTH = window.innerWidth;
let SCREEN_HEIGHT = window.innerHeight;

// init();

init2();

function init2() {

    let cameraPerspective = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 1000);
    let cameraOrtho = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 1000);

    camera = cameraPerspective;
    camera.position.set(2, 2, 3);
    camera.lookAt(1, 1, 0);

    scene = new THREE.Scene();

    geometry = new THREE.BoxGeometry(1, 1, 1);
    material = new THREE.MeshNormalMaterial();

    mesh = new THREE.Mesh(geometry, material);
    mesh.name = "cube";
    scene.add(mesh);

    mesh2 = new THREE.Mesh(geometry, material);
    mesh2.name = "cube2";
    mesh2.translateX(-2);
    scene.add(mesh2);




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

    console.log(camera);



    orbitControls = new THREE.OrbitControls(camera, renderer.domElement);

    console.log(orbitControls.target);

    renderer.domElement.addEventListener("mousemove", mousemove, false);
    renderer.domElement.addEventListener("mousedown", mousedown, false);

    transformControls.addEventListener("dragging-changed", event => orbitControls.enabled = !event.value);
    orbitControls.addEventListener("start", event => transformControls.enabled = false);
    orbitControls.addEventListener("end", event => transformControls.enabled = true);
    orbitControls.addEventListener("change", event => transformControls.attach(event.newTarget));

    let editorControls = new EditorControls(camera, renderer.domElement);
    editorControls.focus(mesh);

    function onKeyDown(event) {

    container = new UIPanel();
    container.setId( 'viewport' );
	container.setPosition( 'absolute' );

    container.dom.appendChild( renderer.domElement );

    document.body.appendChild(container.dom);

    viewHelper = new ViewHelper( camera, container );
    viewHelper.controls = editorControls;

}

            case 79: /*O*/

                if (camera === cameraOrtho) return;

                cameraOrtho.setFromPerspective(cameraPerspective, orbitControls.target, 100)
                camera = cameraOrtho;

                break;

            case 80: /*P*/

                if (camera === cameraPerspective) return;

                cameraPerspective.setFromOrthographic(cameraOrtho, orbitControls.target);
                camera = cameraPerspective;

                break;

            case 49:

                orbitControls.focus(mesh);

                break;

            case 50:

                orbitControls.focus(mesh2);
                break;

        }

        orbitControls.object = camera;
        transformControls.camera = camera;


    }

}

function mousedown(event) {
}

function mousemove(event) {
}

var clock = new THREE.Clock(); // only used for animations

function animation(time) {

<<<<<<< HEAD
    // mesh.rotation.x = time / 2000;
    // mesh.rotation.y = time / 1000;

	var delta = clock.getDelta();

    if ( viewHelper.animating === true ) {

        viewHelper.update( delta );
    }

    renderer.setViewport( 0, 0, container.dom.offsetWidth, container.dom.offsetHeight );
=======
>>>>>>> 5f99feec696798ebf23356ac23008c08de9ef410
    renderer.render(scene, camera);

    renderer.autoClear = false;
    viewHelper.render( renderer );
    renderer.autoClear = true;

}