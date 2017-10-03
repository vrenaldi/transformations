import * as Detector from 'three/examples/js/Detector.js';
import '../css/main.css';

import { loadContent } from './content.js';
import { loadController } from './controller.js';

import { overrideStyles } from './styles.js';

main();

function main() {
    if (!Detector.webgl) {
        document.body.appendChild(Detector.getWebGLErrorMessage());
        return;
    }

    loadContent();
    loadController();
    overrideStyles();
}


console.log('Hello world!!');

// reference:
// https://threejs.org/docs/#api/math/Matrix4
// https://github.com/mrdoob/three.js/issues/1188

// https://github.com/webpack/webpack-dev-server/issues/1101