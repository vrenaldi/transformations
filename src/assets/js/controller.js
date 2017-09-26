import dat from '../libs/dat.gui.min.js';
import { updateController } from './content.js';

function Transformations() {
    this.position = { x: 0, y: 0, z: 0 };
    this.quaternion = { x: 0, y: 0, z: 0 };
    this.scale = { x: 0, y: 0, z: 0 };
}

var controller = {
    object: new Transformations(),
    camera: new Transformations()
}

function loadController() {
    window.addEventListener('load', onWindowLoad, false);
}

function onWindowLoad() {
    var gui = new dat.GUI();

    var object = gui.addFolder('Object (Cube)');
    var camera = gui.addFolder('Camera');


    // TODO: find range, optimize assignment
    var objPosition = object.addFolder('Position');
    objPosition.add(controller.object.position, 'x', -5, 5).name('Position X').onChange(function (value) { updateController(controller); });
    objPosition.add(controller.object.position, 'y', -5, 5).name('Position Y').onChange(function (value) { updateController(controller); });
    objPosition.add(controller.object.position, 'z', -5, 5).name('Position Z').onChange(function (value) { updateController(controller); });

    var objQuaternion = object.addFolder('Quaternion');
    objQuaternion.add(controller.object.quaternion, 'x', -5, 5).name('Quaternion X').onChange(function (value) { updateController(controller); });
    objQuaternion.add(controller.object.quaternion, 'y', -5, 5).name('Quaternion Y').onChange(function (value) { updateController(controller); });
    objQuaternion.add(controller.object.quaternion, 'z', -5, 5).name('Quaternion Z').onChange(function (value) { updateController(controller); });

    var objScale = object.addFolder('Scale');
    objScale.add(controller.object.scale, 'x', -5, 5).name('Scale X').onChange(function (value) { updateController(controller); });
    objScale.add(controller.object.scale, 'y', -5, 5).name('Scale Y').onChange(function (value) { updateController(controller); });
    objScale.add(controller.object.scale, 'z', -5, 5).name('Scale Z').onChange(function (value) { updateController(controller); });


    var camPosition = camera.addFolder('Position');
    camPosition.add(controller.camera.position, 'x', -5, 5).name('Position X').onChange(function (value) { updateController(controller); });
    camPosition.add(controller.camera.position, 'y', -5, 5).name('Position Y').onChange(function (value) { updateController(controller); });
    camPosition.add(controller.camera.position, 'z', -5, 5).name('Position Z').onChange(function (value) { updateController(controller); });

    var camQuaternion = camera.addFolder('Quaternion');
    camQuaternion.add(controller.camera.quaternion, 'x', -5, 5).name('Quaternion X').onChange(function (value) { updateController(controller); });
    camQuaternion.add(controller.camera.quaternion, 'y', -5, 5).name('Quaternion Y').onChange(function (value) { updateController(controller); });
    camQuaternion.add(controller.camera.quaternion, 'z', -5, 5).name('Quaternion Z').onChange(function (value) { updateController(controller); });

    var camScale = camera.addFolder('Scale');
    camScale.add(controller.camera.scale, 'x', -5, 5).name('Scale X').onChange(function (value) { updateController(controller); });
    camScale.add(controller.camera.scale, 'y', -5, 5).name('Scale Y').onChange(function (value) { updateController(controller); });
    camScale.add(controller.camera.scale, 'z', -5, 5).name('Scale Z').onChange(function (value) { updateController(controller); });


    object.open();
    objPosition.open();
}

export { loadController };