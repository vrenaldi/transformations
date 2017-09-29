import 'three/examples/js/controls/OrbitControls.js';
import Stats from 'stats.js/build/stats.min.js';

var windowWidth, windowHeight;
var cameraController, cameraControllerUpdated;

var scene, camera, renderer;
var perspectiveCamera, perspectiveCameraHelper;

var cube, grid, world;
var stats, controls;

function loadContent() {
    init();
    animate();
}

function init() {
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;

    cameraController = {};
    cameraControllerUpdated = false;

    perspectiveCamera = new THREE.PerspectiveCamera(45, windowWidth / (windowHeight * 0.5), 10, 50);
    perspectiveCameraHelper = new THREE.CameraHelper(perspectiveCamera);

    cube = new THREE.Mesh(new THREE.BoxGeometry(5, 5, 5), new THREE.MeshBasicMaterial({ color: 'deeppink', wireframe: true })).add(new THREE.AxisHelper(20));
    cube.position.z = -25;
    grid = new THREE.GridHelper(100, 10, 'red').add(new THREE.AxisHelper(20));
    world = new THREE.Group().add(cube).add(grid);


    scene = new THREE.Scene();
    scene.add(perspectiveCamera);
    scene.add(perspectiveCameraHelper);
    scene.add(world);

    camera = new THREE.PerspectiveCamera(75, windowWidth / (windowHeight * 0.5), 1, 1000);
    camera.rotation.x = (-45 * Math.PI) / 180;
    camera.position.y = 75;
    camera.position.z = 100;

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(windowWidth, windowHeight);
    renderer.autoClear = false;
    document.body.appendChild(renderer.domElement);

    stats = new Stats();
    document.body.appendChild(stats.dom);
    controls = new THREE.OrbitControls(camera, renderer.domElement);

    window.addEventListener('resize', onWindowResize, false);
    window.addEventListener('mousedown', onWindowMouseDown, false);
    window.addEventListener('mouseup', onWindowMouseUp, false);
}

function animate() {
    requestAnimationFrame(animate);

    render();
    stats.update();
    controls.update();
}

function render() {
    perspectiveCameraHelper.visible = false;
    showTheTruth(false);
    renderer.setViewport(0, 0, windowWidth, (windowHeight * 0.5));
    renderer.render(scene, perspectiveCamera);

    perspectiveCameraHelper.visible = true;
    showTheTruth(true);
    renderer.setViewport(0, (windowHeight * 0.5), windowWidth, (windowHeight * 0.5));
    renderer.render(scene, camera);
}

function showTheTruth(mode) {
    if (mode) {
        for (var transformation in cameraController) {
            for (var axis in cameraController[transformation]) {
                if (transformation === 'scale') {
                    world[transformation][axis] = (1 / cameraController[transformation][axis]);
                    perspectiveCamera[transformation][axis] = 1;
                } else if (transformation === 'rotation') {
                    world[transformation][axis] = ((-1 * cameraController[transformation][axis]) * Math.PI) / 180;
                    perspectiveCamera[transformation][axis] = 0;
                } else {
                    world[transformation][axis] = -1 * cameraController[transformation][axis];
                    perspectiveCamera[transformation][axis] = 0;
                }
            }
        }

        cameraControllerUpdated = false;
    } else {
        for (var transformation in cameraController) {
            for (var axis in cameraController[transformation]) {
                if (transformation === 'scale') {
                    perspectiveCamera[transformation][axis] = cameraController[transformation][axis];
                    world[transformation][axis] = 1;
                } else if (transformation === 'rotation') {
                    perspectiveCamera[transformation][axis] = (cameraController[transformation][axis] * Math.PI) / 180;
                    world[transformation][axis] = 0;
                } else {
                    perspectiveCamera[transformation][axis] = cameraController[transformation][axis];
                    world[transformation][axis] = 0;
                }
            }
        }
    }
}

function onWindowResize() {
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;

    perspectiveCamera.aspect = windowWidth / (windowHeight * 0.5);
    perspectiveCamera.updateProjectionMatrix();
    perspectiveCameraHelper.update();

    camera.aspect = windowWidth / (windowHeight * 0.5);
    camera.updateProjectionMatrix();

    renderer.setSize(windowWidth, windowHeight);
}

function onWindowMouseDown(event) {
    if (!((event.clientY > (windowHeight * 0.5)) && (event.clientY < windowHeight))) controls.enableRotate = false;
}

function onWindowMouseUp(event) {
    controls.enableRotate = true;
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

    if (!cameraController.hasOwnProperty('position')) cameraController = controller.camera;
    cameraControllerUpdated = true;
}

export { loadContent, updateController };