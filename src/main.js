/*
    gbweb entry point
*/
import * as Phaser from 'phaser';
import { r, n } from './constants.js';
import { A } from './scenes/BootScene.js';
import { xs } from './scenes/GameScene.js';

const s = Phaser;

// this bit code prevents the game from running on other websites besides geometrydash.com
// it's probably here to prevent requiring the index-game.js on other domains, but the string encryption menthod sorta says otherwise
/* 
const Ts = window.location.hostname,
bs = [103, 101, 111, 109, 101, 116, 114, 121, 100, 97, 115, 104, 46, 99, 111, 109].map(_0x1c1bb4 => String.fromCharCode(_0x1c1bb4)).join('');
if (!(Ts === bs || Ts === "www." + bs || Ts.endsWith('.' + bs) || "localhost" === Ts)) throw document.body.innerHTML = '', new Error('');
*/
const Ss = {
    'type': s.AUTO,
    'width': r,
    'height': n,
    'resolution': 1,
    'fps': {
        'smoothStep': true
    },
    'backgroundColor': "#000000",
    'parent': document.body,
    'input': {
        'windowEvents': false
    },
    'render': {
        'powerPreference': "high-performance"
    },
    'scale': {
        'mode': s.Scale.FIT,
        'autoCenter': s.Scale.CENTER_BOTH
    },
    'scene': [A, xs]
};
new s[("Game")](Ss);
