import * as THREE from 'three/build/three.js';
import Stats from 'stats.js/build/stats.min.js';

var windowWidth, windowHeight;
var scene, camera, renderer;
var perspectiveCamera, perspectiveCameraHelper;

var cube;
var stats;

function loadContent() {
    init();
    animate();
}

function init() {
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;

    perspectiveCamera = new THREE.PerspectiveCamera(75, windowWidth / (windowHeight * 0.5), 10, 50);
    perspectiveCamera.rotation.x = (-45 * Math.PI) / 180;
    perspectiveCamera.position.y = 25;
    perspectiveCamera.position.z = 25;
    perspectiveCameraHelper = new THREE.CameraHelper(perspectiveCamera);

    cube = new THREE.Mesh(new THREE.BoxGeometry(5, 5, 5), new THREE.MeshBasicMaterial({ color: 'deeppink', wireframe: true }));
    cube.add(new THREE.AxisHelper(20));


    scene = new THREE.Scene();
    scene.add(perspectiveCamera);
    scene.add(perspectiveCameraHelper);
    scene.add(cube);
    scene.add(new THREE.GridHelper(100, 10, 'red').add(new THREE.AxisHelper(20)));

    // camera = new THREE.PerspectiveCamera(75, windowWidth / windowHeight, 1, 100);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(windowWidth, windowHeight);
    document.body.appendChild(renderer.domElement);

    stats = new Stats();
    document.body.appendChild(stats.dom);

    window.addEventListener('resize', onWindowResize, false);
}

function animate() {
    requestAnimationFrame(animate);

    render();
    stats.update();
}

function render() {
    perspectiveCameraHelper.visible = false;
    renderer.setViewport(0, 0, windowWidth, (windowHeight * 0.5));
    renderer.render(scene, perspectiveCamera);

    // renderer.render(scene, camera);
}

function onWindowResize() {
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;

    perspectiveCamera.aspect = windowWidth / (windowHeight * 0.5);
    perspectiveCamera.updateProjectionMatrix();
    perspectiveCameraHelper.update();

    // camera.aspect = 0.5 * aspect;
    // camera.updateProjectionMatrix();

    renderer.setSize(windowWidth, windowHeight);
}

function updateController(controller) {
    for (var transformation in controller.object) {
        for (var axis in controller.object[transformation]) {
            if (transformation === 'rotation') {
                cube[transformation][axis] = (controller.object[transformation][axis] * Math.PI) / 180;
            } else {
                cube[transformation][axis] = controller.object[transformation][axis];
            }
        }
    }

    for (var transformation in controller.camera) {
        for (var axis in controller.camera[transformation]) {
            if (transformation === 'rotation') {
                perspectiveCamera[transformation][axis] = (controller.camera[transformation][axis] * Math.PI) / 180;
            } else {
                perspectiveCamera[transformation][axis] = controller.camera[transformation][axis];
            }
        }
    }
}

export { loadContent, updateController };