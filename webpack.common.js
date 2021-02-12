const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//const devMode = process.env.NODE_ENV !== 'production';
const WorkboxPlugin = require('workbox-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');

module.exports = {
    entry: {
        index :'./src/index.js',
        game : './src/game.js',
        ranklist: './src/ranklist.js',
        'data/carddata' : './src/data/index.js',
        'utils/localStorageMethods' : './src/utils/localStorageMethods.js'
    },
    output: {
        filename: '[name].main.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
        {
            test: /\.css$/i,
            use: [
                {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: './',
                    },
                },
                "css-loader"],
        },
        {
            test: /\.m?js$/,
            exclude: /(node_modules)/,
            use: {
                loader: 'babel-loader',
                options: {
                    "presets":[
                        [
                            "@babel/env",
                            {
                                "targets": {
                                    "edge": "17",
                                    "firefox": "60",
                                    "chrome": "67",
                                    "safari": "11.1"
                                },
                                "useBuiltIns": "usage",
                                "corejs": "3.6.5"
                            }
                        ]
                    ],
                    "plugins": ["@babel/plugin-syntax-optional-chaining"]
                }
            }
        },
        {
            test: /\.(png|jpe?g|gif)$/i,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'assets',
                    },
                },
            ],
        },
    ],
    },
    plugins : [
        new CleanWebpackPlugin(),
        new WebpackPwaManifest({
            "short_name": "Weather",
            "name": "Weather: Do I need an umbrella?",
            "icons": [
              {
                "src": "dist/assets/16.png",
                "type": "image/png",
                "sizes": "192x192"
              },
              {
                "src": "dist/assets/16.png",
                "type": "image/png",
                "sizes": "512x512"
              }
            ],
            "start_url": "./",
            "background_color": "#3367D6",
            "display": "standalone",
            "scope": "./dist",
            "theme_color": "#3367D6",
            "shortcuts": [],
            "description": "Weather forecast information",
            "screenshots": [
              {
                "src": "dist/assets/screenshot1.png",
                "type": "image/png",
                "sizes": "540x720"
              },
              {
                "src": "dist/assets/screenshot2.png",
                "type": "image/png",
                "sizes": "540x720"
              }
            ]
          }),
        new MiniCssExtractPlugin(
            {
                filename: '[name].css',
            }
        ),
        new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'src/index.html',
        chunks: ['index']
      }),
      new HtmlWebpackPlugin({
        filename: 'game.html',
        template: 'src/game.html',
        chunks: ['game']
      }),
      new HtmlWebpackPlugin({
        filename: 'ranklist.html',
        template: 'src/ranklist.html',
        chunks: ['ranklist']
      }),
      new WorkboxPlugin.GenerateSW({
        // these options encourage the ServiceWorkers to get in there fast
        // and not allow any straggling "old" SWs to hang around
        clientsClaim: true,
        skipWaiting: true,
      }),
    ]
}

/*  module: {
        rules: [
        {
            test: /\.css$/i,
            use: [MiniCssExtractPlugin.loader, "css-loader"],
        },
        {
            test: /\.m?js$/,
            exclude: /(node_modules)/,
            use: {
                loader: 'babel-loader',
                options: {
                    "presets":[
                        [
                            "@babel/env",
                            {
                                "targets": {
                                    "edge": "17",
                                    "firefox": "60",
                                    "chrome": "67",
                                    "safari": "11.1"
                                },
                                "useBuiltIns": "usage",
                                "corejs": "3.6.5"
                            }
                        ]
                    ],
                    "plugins": ["@babel/plugin-syntax-optional-chaining"]
                }
            }
        }
    ],
    },
    plugins : [
        new MiniCssExtractPlugin(
            {
                filename: '[name].css',
            }
        ),
        new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'src/index.html',
        chunks: ['index']
      }),
      new HtmlWebpackPlugin({
        filename: 'game.html',
        template: 'src/game.html',
        chunks: ['game']
      }),
      new HtmlWebpackPlugin({
        filename: 'ranklist.html',
        template: 'src/ranklist.html',
        chunks: ['ranklist']
      })
    ] */