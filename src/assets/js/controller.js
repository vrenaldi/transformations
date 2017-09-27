import dat from '../libs/dat.gui.min.js';
import { updateController } from './content.js';

function Transformations() {
    this.position = { x: 0, y: 0, z: 0 };
    this.rotation = { x: 0, y: 0, z: 0 };
    this.scale = { x: 1, y: 1, z: 1 };
}

var controller = {
    object: new Transformations(),
    camera: new Transformations()
}

function loadController() {
    controller.camera.rotation.x = -45;
    controller.camera.position.y = 25;
    controller.camera.position.z = 25;

    window.addEventListener('load', onWindowLoad, false);
}

function onWindowLoad() {
    var gui = new dat.GUI();

    var object = gui.addFolder('Object (Cube)');
    var camera = gui.addFolder('Camera');

    
    // TODO: optimize assignment
    var objPosition = object.addFolder('Position');
    objPosition.add(controller.object.position, 'x', -100, 100).step(1).name('Position X').onChange(function (value) { updateController(controller); });
    objPosition.add(controller.object.position, 'y', -100, 100).step(1).name('Position Y').onChange(function (value) { updateController(controller); });
    objPosition.add(controller.object.position, 'z', -100, 100).step(1).name('Position Z').onChange(function (value) { updateController(controller); });

    var objQuaternion = object.addFolder('Rotation');
    objQuaternion.add(controller.object.rotation, 'x', -360, 360).step(1).name('Rotation X').onChange(function (value) { updateController(controller); });
    objQuaternion.add(controller.object.rotation, 'y', -360, 360).step(1).name('Rotation Y').onChange(function (value) { updateController(controller); });
    objQuaternion.add(controller.object.rotation, 'z', -360, 360).step(1).name('Rotation Z').onChange(function (value) { updateController(controller); });

    var objScale = object.addFolder('Scale');
    objScale.add(controller.object.scale, 'x', -10, 10).name('Scale X').onChange(function (value) { updateController(controller); });
    objScale.add(controller.object.scale, 'y', -10, 10).name('Scale Y').onChange(function (value) { updateController(controller); });
    objScale.add(controller.object.scale, 'z', -10, 10).name('Scale Z').onChange(function (value) { updateController(controller); });


    var camPosition = camera.addFolder('Position');
    camPosition.add(controller.camera.position, 'x', -100, 100).name('Position X').onChange(function (value) { updateController(controller); });
    camPosition.add(controller.camera.position, 'y', -100, 100).name('Position Y').onChange(function (value) { updateController(controller); });
    camPosition.add(controller.camera.position, 'z', -100, 100).name('Position Z').onChange(function (value) { updateController(controller); });

    var camQuaternion = camera.addFolder('Rotation');
    camQuaternion.add(controller.camera.rotation, 'x', -360, 360).name('Rotation X').onChange(function (value) { updateController(controller); });
    camQuaternion.add(controller.camera.rotation, 'y', -360, 360).name('Rotation Y').onChange(function (value) { updateController(controller); });
    camQuaternion.add(controller.camera.rotation, 'z', -360, 360).name('Rotation Z').onChange(function (value) { updateController(controller); });

    var camScale = camera.addFolder('Scale');
    camScale.add(controller.camera.scale, 'x', -10, 10).name('Scale X').onChange(function (value) { updateController(controller); });
    camScale.add(controller.camera.scale, 'y', -10, 10).name('Scale Y').onChange(function (value) { updateController(controller); });
    camScale.add(controller.camera.scale, 'z', -10, 10).name('Scale Z').onChange(function (value) { updateController(controller); });


    object.open();
    objPosition.open();
}

export { loadController };