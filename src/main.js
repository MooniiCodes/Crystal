/*
    gbweb entry point
*/
import * as Phaser from 'phaser';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from './constants.js';
import { BootScene } from './scenes/BootScene.js';
import { GameScene } from './scenes/GameScene.js';

const PHASER = Phaser;

// this bit code prevents the game from running on other websites besides geometrydash.com
// it's probably here to prevent requiring the index-game.js on other domains, but the string encryption menthod sorta says otherwise
/* 
const HOSTNAME = window.location.hostname,
GEOMETRY_DASH_URL = [103, 101, 111, 109, 101, 116, 114, 121, 100, 97, 115, 104, 46, 99, 111, 109].map(code => String.fromCharCode(code)).join('');
if (!(HOSTNAME === GEOMETRY_DASH_URL || HOSTNAME === "www." + GEOMETRY_DASH_URL || HOSTNAME.endsWith('.' + GEOMETRY_DASH_URL) || "localhost" === HOSTNAME)) throw document.body.innerHTML = '', new Error('');
*/

// phaser game config
const phaserConfig = {
    type: PHASER.AUTO, // uses webgl if possible, otherwise canvas
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    resolution: 1,
    fps: {
        smoothStep: true
    },
    backgroundColor: "#000000",
    parent: document.body,
    input: {
        windowEvents: false
    },
    render: {
        powerPreference: "high-performance"
    },
    scale: {
        mode: PHASER.Scale.FIT,
        autoCenter: PHASER.Scale.CENTER_BOTH
    },
    scene: [BootScene, GameScene]
};

new PHASER[("Game")](phaserConfig);
