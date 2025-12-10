const path = require('path');
const common = require('./webpack.common.js');
const { merge } = require('webpack-merge');
const WebpackPwaManifest = require('webpack-pwa-manifest');


module.exports = merge(common,{
    mode : 'development',
    devtool : 'inline-source-map',
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      port: 9000,
    },
    plugins :[
      new WebpackPwaManifest({
        "filename" : "manifest.json",
        "short_name": "Magic Memory",
        "name": "Magic Memory: will you beat me?",
        "icons": [
            {
                src: path.resolve('src/assets/16.png'),
                "type": "image/png",
                "sizes": "192x192"
            },
            {
                src: path.resolve('src/assets/16.png'),
                "type": "image/png",
                "sizes": "144x144"
            }
        ],
        "background_color": "#3367D6",
        "display": "standalone",
        "theme_color": "#3367D6",
        "description": "Magic Memory forecast information",
        "start_url" : "/dist/index.html",
        "scope" : "/dist/"
    }),
    ]
})