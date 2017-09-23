import * as THREE from 'three';
import * as Stats from 'stats.js';

var camera, scene, renderer;
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
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({ color: 'deeppink' });
    cube = new THREE.Mesh(geometry, material);
    cube.position.z = -10;
    scene.add(cube);

    stats = new Stats();
    document.body.appendChild(stats.dom);

    window.addEventListener('resize', onWindowResize, false);

    console.log(cube.matrixWorld);
}

function animate() {
    requestAnimationFrame(animate);

    render();
    stats.update();
}

function render() {
    cube.rotation.x += 0.1;
    cube.rotation.y += 0.1;

    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

export { loadContent };