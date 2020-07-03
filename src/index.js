import "./core_style.css";
import "./gear.css";

import 'phaser';
//import './phaser-custom.min.js';

import ResizeManager from "./game/PFHelper/resizeManager";
import ObjectRegister from "./game/PFHelper/objectRegister";
import ColorsHelper from "./game/PFHelper/colorsHelper";

import Main from './phaser_main';
import {
    gameScene,
    uiScene
} from './game/game.js';

var app = {};
window.app = app;

app.type = window.type;
if (!app.type) {
    app.type = null;
}

var data = {};

if (window.dashboardParams) {
    for (var prop in dashboardParams) {
        if (dashboardParams.hasOwnProperty(prop)) {
            if (dashboardParams[prop] !== undefined) {
                data[prop] = dashboardParams[prop];
            }
        }
    }
}

app.data = data;

var config = {
    width: 800, //800
    height: 800, //800
    platformType: app.type,
    totalTime: data.totalTime, ///data.totalTime,
    transparent: false,
    backgroundColor: 0xffffff,
    scene: [gameScene, uiScene],
    banner: false,
    plugins: {
        scene: [{
                key: "ResizeManager",
                plugin: ResizeManager,
                mapping: "resizeManager"
            },
            {
                key: "ObjectRegister",
                plugin: ObjectRegister,
                mapping: "objectRegister"
            },
            {
                key: "ColorsHelper",
                plugin: ColorsHelper,
                mapping: "colorsHelper"
            }
        ]
    }
    /*
    render: {
        antialias: true,
        pixelArt: false,
        roundPixels: false,
        transparent: false,
        
        //powerPreference: 'low-power', // 'high-performance', 'low-power' or 'default'
        clearBeforeRender: true,
        premultipliedAlpha: true,
        preserveDrawingBuffer: false,
        failIfMajorPerformanceCaveat: false,
        powerPreference: 'default', // 'high-performance', 'low-power' or 'default'
        batchSize: 2000,
        desynchronized: false,
    },
    */
    /*
     physics: {
         default: 'arcade',
         arcade: {
             debug: false,
             gravity: {
                 x: 0,
                 y: 0
             }
         }
     },
     */
}


var main = new Main(config);

app.main = main;