'use strict';

const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StyleExtHtmlWebpackPlugin = require('style-ext-html-webpack-plugin');

const FileManagerPlugin = require('filemanager-webpack-plugin');

const TerserPlugin = require('terser-webpack-plugin');
const WaitPlugin = require('./WaitPlugin');

const exec = require('child_process').exec;

var appName = "game";


var themeNo = 1;
var hideConsolesOnBuild = true;

var iosLink = "https://apps.apple.com";
var androidLink = "https://play.google.com/";

var pathToHtml = 'build/htmls/' + appName + '_raw.html';
var generateBrotli = false;

///check for the -p
var isProduction = process.argv.indexOf('-p') !== -1;

////DO NOT TURN OFF GOOGLE AND VUNGLE
var buildVersions = [
    "dashboard",
    "test",
    //"applovin",
    //"dapi_iron",
    //"fb",
    //"google",
    //"google_exitapi",
    //"vungle",
    //"unity",
    //"lifestreet",
    //"tapjoy"
];

if (generateBrotli) {
    buildVersions.push("brotli");
}

if (!iosLink || iosLink == "") iosLink = "https://apps.apple.com/";
if (!androidLink || androidLink == "") androidLink = "https://play.google.com";

var buildData = pathToHtml + " " + iosLink + " " + androidLink + " " + buildVersions.join(",");

var debugPlugins = [
    new webpack.DefinePlugin({
        'CANVAS_RENDERER': JSON.stringify(true),
        'WEBGL_RENDERER': JSON.stringify(true),
        'THEME_NO': JSON.stringify(themeNo)
    }),
    new ExtractTextPlugin({
        filename: 'style.css'
    })
];


var filePluginConfig = {
    copy: [],
    archive: [],
    delete: []
};

if (buildVersions.indexOf("vungle") >= 0) {
    filePluginConfig.copy.push({
        source: './build/htmls/' + appName + '_vungle.html',
        destination: './build/htmls/vungle/ad.html',
        platform: "vungle"
    }, {
        source: './build/vungle_index.html',
        destination: './build/htmls/vungle',
        platform: "vungle"
    });

    filePluginConfig.archive.push({
        source: './build/htmls/vungle',
        destination: './build/htmls/' + appName + '_vungle.zip',
        platform: "vungle"
    });
    filePluginConfig.delete.push(
        './build/htmls/' + appName + '_vungle.html',
        './build/htmls/vungle'
    );
}


if (buildVersions.indexOf("google") >= 0) {

    filePluginConfig.archive.push({
        source: './build/htmls/' + appName + '_google.html',
        destination: './build/htmls/' + appName + '_google.zip',
        platform: "google"
    });
    filePluginConfig.delete.push(
        './build/htmls/' + appName + '_google.html',
    );
}

if (buildVersions.indexOf("google_exitapi") >= 0) {
    filePluginConfig.archive.push({
        source: './build/htmls/' + appName + '_google_exitapi.html',
        destination: './build/htmls/' + appName + '_google_exitapi.zip',
        platform: "google"
    });
    filePluginConfig.delete.push(
        './build/htmls/' + appName + '_google_exitapi.html',
    );
}


filePluginConfig.delete.push('./build/style.css')


var filePlugin = new FileManagerPlugin({
    onEnd: filePluginConfig
});


var buildPlugins = [

    new webpack.DefinePlugin({
        'CANVAS_RENDERER': JSON.stringify(true),
        'WEBGL_RENDERER': JSON.stringify(true),
        'THEME_NO': JSON.stringify(themeNo)
    }),

    new HtmlWebpackPlugin({
        title: appName,
        templateParameters: {
            type: null,
            iosLink: iosLink,
            androidLink: androidLink
        },
        inject: 'true',
        filename: 'htmls/' + appName + '_raw.html',
        template: './templates/template.html'
    }),

    /*
    new ScriptExtHtmlWebpackPlugin({
        inline: ['main'],
        removeInlinedAssets:false
    }),
    */

    new ExtractTextPlugin({
        filename: 'style.css'
    }),

    new StyleExtHtmlWebpackPlugin(),

    {
        apply: (compiler) => {
            compiler.hooks.afterEmit.tap('AfterEmit', (compilation) => {
                exec('node "./platformBuilder.js" ' + buildData, (err, stdout, stderr) => {
                    filePlugin.checkOptions('onEnd');
                    console.log("");
                    console.log("!!!DON'T FORGET CHECKING GAME LINKS!!!");
                    console.log("--------------------");
                    console.log("iosLink: " + iosLink);
                    console.log("androidLink: " + androidLink);
                    console.log("--------------------");
                    if (stdout) process.stdout.write(stdout);
                    if (stderr) process.stderr.write(stderr);
                });
            });
        }
    },


];


var normalConfig = {

    entry: './src/index.js',
    //entry: './src/game/coordinatFinder.js',

    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: '/build/',
        filename: 'main.js'
    },

    module: {
        rules: [
            //{ test: /\.bin$/, loader: 'arraybuffer-loader' },
            {
                test: [/\.vert$/, /\.frag$/],
                use: 'raw-loader'
            },
            {
                test: /\.(png|mp3|jpg|jpeg|m4a|ttf|otf|woff|gif|svg|mp4)$/,
                exclude: /models/,
                loader: 'url-loader',
                //use: [{ loader: 'url-loader'}]
            },
            // GLTF configuration: add this to rules
            {
                // match all .gltf files
                test: /\.(gltf)$/,
                loader: 'gltf-loader-2'
            },
            {
                // here I match only IMAGE and BIN files under the gltf folder
                test: /models.*\.(bin|png|jpg|jpeg|gif)$/,
                // or use url-loader if you would like to embed images in the source gltf
                loader: 'url-loader',
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader']
                })
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },

        ]
    },

    plugins: isProduction ? buildPlugins : debugPlugins

};


const brotliConfig = {
    entry: './src/brotli/index.js',

    output: {
        path: path.resolve(__dirname, 'build/htmls/brotli'),
        publicPath: '/build/htmls/brotli',
        filename: 'mainBrotli.js'
    },

    plugins: [
        new WaitPlugin('build/htmls/brotli/main.br'),
        {
            apply: (compiler) => {
                compiler.hooks.afterEmit.tap('AfterEmit', (compilation) => {
                    exec('node "./brotliBuilder.js" ' + buildData, (err, stdout, stderr) => {
                        filePlugin.checkOptions('onEnd');
                        if (stdout) process.stdout.write(stdout);
                        if (stderr) process.stderr.write(stderr);
                    });
                });
            }
        },
    ],

    module: {
        rules: [{
                test: [/\.vert$/, /\.frag$/],
                use: 'raw-loader'
            },

            {
                test: /\.(br)$/,
                loader: 'url-loader',
            },

            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },

        ]
    },
}

if (isProduction && generateBrotli) {
    module.exports = [normalConfig, brotliConfig];
} else {
    module.exports = normalConfig;
}

if (isProduction) {
    let optimization = {};
    if (hideConsolesOnBuild) {
        optimization.minimizer = [
            new TerserPlugin({
                //extractComments: true,
                cache: true,
                parallel: true,
                terserOptions: {
                    compress: {
                        drop_console: true,
                    },
                }
            }),
        ]

        module.exports.optimization = optimization;
    };
} else {
    module.exports.optimization = {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /node_modules|assets/,
                    name: "vendor",
                    chunks: "initial",
                }
            }
        }
    };
}