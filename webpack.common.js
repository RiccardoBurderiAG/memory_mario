const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
    entry: {
        index :'./src/index.js',
        game : './src/game.js',
        ranklist: './src/ranklist.js'
    },
    output: {
        filename: '[name].main.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
        {
            test: /\.css$/i,
            use: [MiniCssExtractPlugin.loader, "css-loader"],
        },
        //TODO add rule for png|jpg|fonts|..
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
                        name: './assets/[name].[ext]',
                      },
                },
            ],
        },
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