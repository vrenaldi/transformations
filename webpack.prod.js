const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    plugins: [
        new UglifyJSPlugin()
        // new UglifyJSPlugin({ sourceMap: true })        
    ],
    // devtool: 'source-map'
});