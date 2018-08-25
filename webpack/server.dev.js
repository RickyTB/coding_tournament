const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const res = p => path.resolve(__dirname, p);

// if you're specifying externals to leave unbundled, you need to tell Webpack
// to still bundle `react-universal-component`, `webpack-flush-chunks` and
// `require-universal-module` so that they know they are running
// within Webpack and can properly make connections to client modules:
const externals = fs
    .readdirSync(res('../node_modules'))
    .filter(
        x =>
            !/\.bin|react-universal-component|require-universal-module|webpack-flush-chunks/.test(
                x
            )
    )
    .reduce((externals, mod) => {
        externals[mod] = `commonjs ${mod}`;
        return externals;
    }, {});

module.exports = {
    name: 'server',
    target: 'node',
    // devtool: 'source-map',
    devtool: 'eval',
    entry: ['babel-polyfill', 'fetch-everywhere', res('../serverRender/render.js')],
    externals,
    output: {
        path: res('../buildServer'),
        filename: '[name].js',
        libraryTarget: 'commonjs2',
        publicPath: '/static/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.s?css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: "css-loader",
                            options: {
                                modules: true,
                                importLoaders: 1,
                                localIdentName: '[name]__[local]__[hash:base64:5]'
                            }
                        },
                        {
                            loader: "postcss-loader",
                            options: {
                                ident: 'postcss',
                                plugins: () => [
                                    autoprefixer({
                                        browsers: [
                                            "> 1%",
                                            "last 2 versions"
                                        ]
                                    })
                                ]
                            }
                        },
                        {loader: "sass-loader"}
                    ]
                })
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    plugins: [
        new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 1
        }),
        new ExtractTextPlugin({
            filename:  (getPath) => {
                return getPath('../buildServer/main.css').replace('../js', '../css');
            },
            allChunks: true
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development')
            }
        })
    ]
};