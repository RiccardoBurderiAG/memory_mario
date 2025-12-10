const common = require('./webpack.common.js');
const { merge } = require('webpack-merge');
const WebpackPwaManifest = require('webpack-pwa-manifest');


module.exports = merge(common,{
    mode : 'production',
    devtool : 'source-map',
    plugins :[
        new WebpackPwaManifest({
          "filename" : "manifest.json",
          "short_name": "Magic Memory",
          "name": "Magic Memory: will you beat me?",
          "icons": [
              {
                  "src": "src/assets/16.png",
                  "type": "image/png",
                  "sizes": "192x192"
              },
              {
                  "src": "src/assets/16.png",
                  "type": "image/png",
                  "sizes": "144x144"
              }
          ],
          "background_color": "#3367D6",
          "display": "standalone",
          "theme_color": "#3367D6",
          "description": "Magic Memory forecast information",
          "start_url" : "/welcome/memory-game-riccardo/",
          "scope" : "/welcome/memory-game-riccardo/"
      }),
      ]
})