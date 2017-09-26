import * as THREE from 'three/build/three.js';
import Stats from 'stats.js/build/stats.min.js';

var scene, camera, renderer;
var cube;
var stats;

function loadContent() {
    init();
    animate();
}

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 100);
    renderer = new THREE.WebGLRenderer();

    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({ color: 'deeppink' });
    cube = new THREE.Mesh(geometry, material);
    // cube.position.z = -10;
    scene.add(cube);

    renderer.setSize(window.innerWidth, window.innerHeight);
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
    // cube.rotation.x += 0.1;
    // cube.rotation.y += 0.1;

    // scene.position.z = -10;
    camera.position.z = 10;

    renderer.render(scene, camera);


    // console.log(camera.matrixWorldInverse);
    // console.log(camera.matrixWorld);

    // var test = new THREE.Matrix4();
    // test.getInverse(camera.matrixWorldInverse);
    // console.log(test);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function updateController(controller){
    console.log(controller);
}

export { loadContent, updateController };