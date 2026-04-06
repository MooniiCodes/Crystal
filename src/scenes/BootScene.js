/*
    the loading screen upon starting the game
*/
import * as Phaser from 'phaser';
import { setS, setE } from '../constants.js';
import { C } from '../systems/BitmapFontParser.js';

class A extends Phaser.Scene {
    constructor() {
        super({
            'key': "BootScene"
        });
    }
    preload() {
        ! function(_0x3b96aa) {
            if (_0x3b96aa.renderer.type === Phaser.WEBGL) {
                let _0x47cabb = _0x3b96aa.renderer.gl;
                setS(_0x3b96aa.renderer.addBlendMode([_0x47cabb.SRC_ALPHA, _0x47cabb.ONE], _0x47cabb.FUNC_ADD)), setE(_0x3b96aa.renderer.addBlendMode([_0x47cabb.DST_COLOR, _0x47cabb.ONE_MINUS_SRC_ALPHA], _0x47cabb.FUNC_ADD));
            }
        }(this.game);
        let _0x236029 = this.cameras.main.width,
            _0x2a5a43 = this.cameras.main.height,
            _0xa68e08 = 0.6 * _0x236029,
            _0x1840c0 = this.add.rectangle(_0x236029 / 2, _0x2a5a43 / 2, _0xa68e08, 8, 65280).setOrigin(0.5, 0.5);
        _0x1840c0.scaleX = 0, this.load.on("progress", _0x374839 => {
            _0x1840c0.scaleX = _0x374839;
        }), this.load.on("loaderror", _0x550fba => {}), this.load.atlas("GJ_WebSheet", 'assets/GJ_WebSheet.png', 'assets/GJ_WebSheet.json'), this.load.image('bigFont', 'assets/bigFont.png'), this.load.text("bigFontFnt", "assets/bigFont.fnt"), this.load.image("goldFont", 'assets/goldFont.png'), this.load.text('goldFontFnt', "assets/goldFont.fnt"), this.load.image('game_bg_01', "assets/game_bg_01_001.png"), this.load.image("sliderBar", 'assets/sliderBar.png'), this.load.image('square04_001', "assets/square04_001.png"), this.load.image("GJ_square02", "assets/GJ_square02.png"), this.load.text("level_1", "assets/1.txt"), this.load.audio('stereo_madness', "assets/StereoMadness.mp3"), this.load.audio('explode_11', "assets/explode_11.ogg"), this.load.audio('endStart_02', 'assets/endStart_02.ogg'), this.load.audio("playSound_01", 'assets/playSound_01.ogg'), this.load.audio("quitSound_01", "assets/quitSound_01.ogg"), this.load.audio("highscoreGet02", "assets/highscoreGet02.ogg");
    }
    create() {
        this.cache.text.get("level_1");
        const _0x1362a5 = this.cache.text.get("bigFontFnt");
        _0x1362a5 && C(this, "bigFont", _0x1362a5);
        const _0x9a7483 = this.cache.text.get("goldFontFnt");
        _0x9a7483 && C(this, "goldFont", _0x9a7483), this.scene.start("GameScene");
    }
}

export { A };
