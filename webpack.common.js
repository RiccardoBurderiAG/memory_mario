const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: {
        index :'./src/index.js',
        game : './src/game.js',
        ranklist: './src/ranklist.js',
        'data/carddata' : './src/data/index.js',
        'utils/localStorageMethods' : './src/utils/localStorageMethods.js'
    },
    output: {
        publicPath : "",
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
        new MiniCssExtractPlugin(
            {
                filename: '[name].css',
        }),
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
         new WebpackPwaManifest({
            "filename" : "manifest.json",
            "short_name": "Magic Memory",
            "name": "Magic Memory: will you beat me?",
            "icons": [
                {
                    src: path.resolve('src/assets/16.png'),
                    "type": "image/png",
                    "sizes": "192x192",
                    "destination" : "assets/"
                },
                {
                    src: path.resolve('src/assets/16.png'),
                    "type": "image/png",
                    "sizes": "144x144",
                    "destination" : "assets/"
                }
            ],
            "background_color": "#3367D6",
            "display": "standalone",
            "theme_color": "#3367D6",
            "description": "Magic Memory forecast information",
            "start_url" : "/dist",
            "scope" : "/"
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
      })
    ] */