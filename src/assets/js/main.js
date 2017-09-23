import * as Detector from 'three/examples/js/Detector.js'
import '../css/main.css';

import { loadContent } from './content.js'

main();

function main() {
    if (!Detector.webgl) {
        document.body.appendChild(Detector.getWebGLErrorMessage());
        return;
    }

    loadContent();
}


console.log('Hello world!!');

// https://github.com/webpack/webpack-dev-server/issues/1101