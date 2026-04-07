/*
    the scene where the actual game happens
    includes main game loop and title screen and all that stuff, in 1 scene
*/
import * as Phaser from 'phaser';
import { SCREEN_WIDTH, SCREEN_HEIGHT, o, PLAYER_GAME_CAMERA_X, u, c, d, JUMP_VELOCITY, COLOR_GREEN, COLOR_BLUE, y, x, w, GROUND_BOUNDS_Y, BLEND_ADD, b, setScreenWidth } from '../constants.js';
import { GameState } from '../systems/GameState.js';
import { us } from '../objects/Ground.js';
import { ps } from '../objects/Player.js';
import { ID_BACKGROUND_COLOR, ID_GROUND_COLOR, ColorManager } from '../systems/ColorManager.js';
import { ys } from '../systems/AudioManager.js';
import { _s, ws } from '../effects.js';

class gameScene extends Phaser.Scene {
    constructor() {
        super({
            'key': "GameScene"
        });
    }
    create() {
        this._bgSpeedX = 0.1, this._bgSpeedY = 0.1, this._menuCameraX = -PLAYER_GAME_CAMERA_X, this._prevCameraX = -PLAYER_GAME_CAMERA_X, this._bg = this.add.tileSprite(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT, "game_bg_01").setOrigin(0, 0).setScrollFactor(0).setDepth(-10);
        const _0x15d27a = this.textures.get('game_bg_01').source[0].height;
        this._bgInitY = _0x15d27a - SCREEN_HEIGHT - o, this._cameraX = -PLAYER_GAME_CAMERA_X, this._cameraY = 0, this._cameraXRef = {
            get 'value'() {
                return this._v;
            },
            '_v': -PLAYER_GAME_CAMERA_X
        }, this._state = new GameState(), this._level = new us(this, this._cameraXRef), this._player = new ps(this, this._state, this._level), this._colorManager = new ColorManager(), this._audio = new ys(this);
        let _0x591888 = this.cache.text.get("level_1");
        _0x591888 && this._level.loadLevel(_0x591888), this._level.createEndPortal(this), this._glitterCenterX = 0, this._glitterCenterY = GROUND_BOUNDS_Y, this._glitterEmitter = this.add.particles(0, 0, 'GJ_WebSheet', {
            'frame': 'square.png',
            'speed': 0,
            'scale': {
                'start': 0.375,
                'end': 0
            },
            'alpha': {
                'start': 1,
                'end': 0
            },
            'lifespan': {
                'min': 200,
                'max': 1800
            },
            'frequency': 60,
            'blendMode': BLEND_ADD,
            'tint': COLOR_GREEN,
            'emitting': false,
            'emitCallback': _0x3c2a3e => {
                _0x3c2a3e.x = this._glitterCenterX + (2 * Math.random() - 1) * (SCREEN_WIDTH / 1.8), _0x3c2a3e.y = this._glitterCenterY + 320 * (2 * Math.random() - 1);
            }
        }), this._level.additiveContainer.add(this._glitterEmitter), this._bg.setTint(this._colorManager.getHex(ID_BACKGROUND_COLOR)), this._level.setGroundColor(this._colorManager.getHex(ID_GROUND_COLOR)), this._level.additiveContainer.setVisible(false), this._level.container.setVisible(false), this._level.topContainer.setVisible(false), this._attempts = 1, this._bestPercent = 0, this._lastPercent = 0, this._endPortalGameY = 240, this._resetGameplayState(), this._totalJumps = 0, this._playTime = 0, this._menuActive = true, this._slideIn = false, this._slideGroundX = null, this._firstPlay = true, this._player.setCubeVisible(false), this._player.setShipVisible(false), (this._logo = this.add.image(0, 100, "GJ_WebSheet", "GJ_logo_001.png").setScrollFactor(0).setDepth(30), this._robLogo = this.add.image(160, 555, "GJ_WebSheet", 'RobTopLogoBig_001.png').setScrollFactor(0).setDepth(30).setScale(0.9), this._copyrightText = this.add.text(0, 625, "© 2026 RobTop Games · geometrydash.com", {
            'fontSize': "14px",
            'color': "#ffffff",
            'fontFamily': "Arial"
        }).setOrigin(1, 1).setScrollFactor(0).setDepth(30).setAlpha(0.3), this._tryMeImg = this.add.image(0, 182.5, "GJ_WebSheet", "tryMe_001.png").setScrollFactor(0).setDepth(30), this._downloadBtns = []);
        const _0x4fc67f = [{
            'key': 'downloadSteam_001',
            'url': "https://store.steampowered.com/app/322170/Geometry_Dash"
        }, {
            'key': 'downloadGoogle_001',
            'url': "https://play.google.com/store/apps/details?id=com.robtopx.geometryjump&hl=en"
        }, {
            'key': "downloadApple_001",
            'url': 'https://apps.apple.com/us/app/geometry-dash/id625334537'
        }];
        for (let _0xfeaf5c = 0; _0xfeaf5c < _0x4fc67f.length; _0xfeaf5c++) {
            const _0x1ce2a6 = _0x4fc67f[_0xfeaf5c],
                _0x6bf69f = 1 / 1.5,
                _0x1d293f = this.add.image(0, 0, "GJ_WebSheet", _0x1ce2a6.key + '.png').setScrollFactor(0).setDepth(30).setScale(_0x6bf69f).setInteractive();
            this._makeBouncyButton(_0x1d293f, _0x6bf69f, () => window.open(_0x1ce2a6.url, "_blank"), () => this._menuActive), this._downloadBtns.push(_0x1d293f);
        }
        const _0x28fa5b = this.scale.isFullscreen;
        this._menuFsBtn = this.add.image(33, 33, "GJ_WebSheet", _0x28fa5b ? 'toggleFullscreenOff_001.png' : "toggleFullscreenOn_001.png").setScrollFactor(0).setDepth(30).setScale(0.64).setAlpha(0.8).setTint(Phaser.Display.Color.GetColor(0, Math.round(102), 255)).setInteractive(), this._expandHitArea(this._menuFsBtn, 1.5), this._makeBouncyButton(this._menuFsBtn, 0.64, () => {
            const _0x26b7c = !this.scale.isFullscreen;
            this._menuFsBtn.setTexture("GJ_WebSheet", _0x26b7c ? "toggleFullscreenOff_001.png" : 'toggleFullscreenOn_001.png'), this._expandHitArea(this._menuFsBtn, 1.5), this._toggleFullscreen();
        }, () => this._menuActive), this._menuInfoBtn = this.add.image(SCREEN_WIDTH - 30 - 3, 33, "GJ_WebSheet", "GJ_infoIcon_001.png").setScrollFactor(0).setDepth(30).setScale(0.64).setAlpha(0.8).setTint(Phaser.Display.Color.GetColor(0, Math.round(102), 255)).setInteractive(), this._expandHitArea(this._menuInfoBtn, 1.5), this._makeBouncyButton(this._menuInfoBtn, 0.64, () => {
            this._buildInfoPopup();
        }, () => this._menuActive && !this._infoPopup), this._menuGlitter = this.add.particles(0, 0, "GJ_WebSheet", {
            'frame': "square.png",
            'speed': 0,
            'scale': {
                'start': 0.5,
                'end': 0
            },
            'alpha': {
                'start': 0.6,
                'end': 0.2
            },
            'lifespan': {
                'min': 1000,
                'max': 2000
            },
            'frequency': 35,
            'blendMode': BLEND_ADD,
            'tint': 20670,
            'x': {
                'min': -130,
                'max': 130
            },
            'y': {
                'min': -100,
                'max': 100
            }
        }).setScrollFactor(0).setDepth(29), this._playBtn = this.add.image(0, 0, "GJ_WebSheet", "GJ_playBtn_001.png").setScrollFactor(0).setDepth(30).setInteractive(), this._playBtnPressed = false, this._makeBouncyButton(this._playBtn, 1, () => {
            this._audio.playEffect("playSound_01", {
                'volume': 1
            }), this._startGame();
        }, () => this._menuActive && !this._playBtnPressed), this._positionMenuItems(), this._spaceWasDown = false, this._spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE), this._upKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP), this._pauseBtn = this.add.image(SCREEN_WIDTH - 30, 30, "GJ_WebSheet", "GJ_pauseBtn_clean_001.png").setScrollFactor(0).setDepth(30).setAlpha(75 / 255).setVisible(false), this._pauseBtn.setInteractive(), this._expandHitArea(this._pauseBtn, 2), this._pauseBtn.on("pointerdown", () => this._pauseGame()), this._escKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC), this._escKey.on("down", () => {
            this._paused ? this._resumeGame() : this._menuActive || this._slideIn || this._state.isDead || this._levelWon || this._pauseGame();
        }), this._paused = false, this._pauseContainer = null, this._sfxVolume = this.game.registry.get("userSfxVol") ?? 1, this.input.on("pointerdown", () => {
            this._menuActive || this._paused || this._pushButton();
        }), this.input.on("pointerup", () => {
            this._menuActive || this._paused || this._releaseButton();
        }), window.addEventListener("pointerup", () => this._releaseButton()), window.addEventListener("touchend", () => this._releaseButton()), this.scale.on("enterfullscreen", () => this._onFullscreenChange(true)), this.scale.on("leavefullscreen", () => this._onFullscreenChange(false)), this._buildHUD(), document.addEventListener("visibilitychange", () => {
            document.hidden ? this._audio.pauseMusic() : this._menuActive || this._paused || this._state.isDead || this._levelWon || this._audio.resumeMusic();
        }), window.addEventListener("orientationchange", () => {
            this.time.delayedCall(100, () => this.scale.refresh());
        }), window.addEventListener("resize", () => {
            this.scale.refresh();
        }), this.game.registry.get("fadeInFromBlack") && (this.game.registry.remove("fadeInFromBlack"), this.cameras.main.fadeIn(400, 0, 0, 0));
    }
    _buildHUD() {
        this._attemptsLabel = this.add.bitmapText(0, 0, "bigFont", 'Attempt\x201', 65).setOrigin(0.5, 0.5).setVisible(false), this._level.topContainer.add(this._attemptsLabel), this._positionAttemptsLabel(), this._fpsText = this.add.text(SCREEN_WIDTH - 20, 10, '', {
            'fontSize': "28px",
            'fill': "#ff0000",
            'fontFamily': "Arial"
        }).setOrigin(1, 0).setScrollFactor(0).setDepth(999).setVisible(false), this._fpsAccum = 0, this._fpsFrames = 0, this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H).on("down", () => {
            this._fpsText.setVisible(!this._fpsText.visible);
        });
    }
    toggleGlitter(_0x34c21a) {
        _0x34c21a ? this._glitterEmitter.start() : this._glitterEmitter.stop();
    }
    _setParticleTimeScale(_0x41fa6a) {
        const _0x2a8756 = _0x3d71c7 => {
            _0x3d71c7 && "ParticleEmitter" === _0x3d71c7.type && (_0x3d71c7.timeScale = _0x41fa6a), _0x3d71c7 && _0x3d71c7.list && _0x3d71c7.list.forEach(_0x2a8756);
        };
        _0x2a8756(this._level.container), _0x2a8756(this._level.topContainer), this._glitterEmitter && (this._glitterEmitter.timeScale = _0x41fa6a);
    }
    _pauseGame() {
        this._paused || this._menuActive || this._slideIn || this._state.isDead || this._levelWon || (this._paused = true, this._pauseBtn.setVisible(false), this._audio.pauseMusic(), this._setParticleTimeScale(0), this._buildPauseOverlay());
    }
    _resumeGame() {
        this._paused && (this._setParticleTimeScale(1), this._paused = false, this._pauseBtn.setVisible(true).setAlpha(75 / 255), this._audio.resumeMusic(), this._pauseContainer && (this._pauseContainer.destroy(), this._pauseContainer = null));
    }
    _buildPauseOverlay() {
        const _0x13af33 = SCREEN_WIDTH / 2,
            _0xf70e04 = 320,
            _0x4eb71b = SCREEN_WIDTH - 40;
        this._pauseContainer = this.add.container(0, 0).setScrollFactor(0).setDepth(100);
        const _0x505665 = this.add.rectangle(_0x13af33, _0xf70e04, SCREEN_WIDTH, SCREEN_HEIGHT, 0, 75 / 255);
        _0x505665.setInteractive(), this._pauseContainer.add(_0x505665);
        const _0x103191 = 0.325 * this.textures.get("square04_001").source[0].width,
            _0x954813 = this._drawScale9(_0x13af33, _0xf70e04, _0x4eb71b, 600, 'square04_001', _0x103191, 0, 150 / 255);
        this._pauseContainer.add(_0x954813);
        const _0x3874ed = this.scale.isFullscreen,
            _0x426993 = this.add.image(_0x13af33 - _0x4eb71b / 2 + 40, 60, 'GJ_WebSheet', _0x3874ed ? "toggleFullscreenOff_001.png" : 'toggleFullscreenOn_001.png').setScale(0.64).setInteractive();
        this._expandHitArea(_0x426993, 2.5), this._pauseContainer.add(_0x426993), this._makeBouncyButton(_0x426993, 0.64, () => {
            const _0x23c9e5 = !this.scale.isFullscreen;
            _0x426993.setTexture("GJ_WebSheet", _0x23c9e5 ? 'toggleFullscreenOff_001.png' : "toggleFullscreenOn_001.png"), this._expandHitArea(_0x426993, 2.5), this._toggleFullscreen();
        }), this._pauseContainer.add(this.add.bitmapText(_0x13af33, 65, 'bigFont', "Stereo Madness", 40).setOrigin(0.5, 0.5));
        const _0x21dacf = 170,
            _0x46bab2 = this._bestPercent || 0,
            _0x38b8d1 = this.add.image(_0x13af33, _0x21dacf, 'GJ_WebSheet', "GJ_progressBar_001.png").setTint(0).setAlpha(125 / 255);
        this._pauseContainer.add(_0x38b8d1);
        const _0x1d49a9 = this.textures.getFrame("GJ_WebSheet", "GJ_progressBar_001.png"),
            _0xb5ab6f = _0x1d49a9 ? _0x1d49a9.width : 680,
            _0x1e6502 = _0x1d49a9 ? _0x1d49a9.height : 40,
            _0x3782ca = Math.max(1, Math.floor(_0xb5ab6f * (_0x46bab2 / 100))),
            _0x3d0987 = this.add.image(0, 0, 'GJ_WebSheet', "GJ_progressBar_001.png").setTint(65280).setScale(0.992, 0.86).setOrigin(0, 0.5).setCrop(0, 0, _0x3782ca, _0x1e6502);
        _0x3d0987.setPosition(_0x13af33 - 0.992 * _0xb5ab6f / 2, _0x21dacf), this._pauseContainer.add(_0x3d0987), this._pauseContainer.add(this.add.bitmapText(_0x13af33, _0x21dacf, "bigFont", _0x46bab2 + '%', 30).setOrigin(0.5, 0.5).setScale(0.7)), this._pauseContainer.add(this.add.bitmapText(_0x13af33, 130, "bigFont", "Normal Mode", 30).setOrigin(0.5, 0.5).setScale(0.78));
        const _0x4791ac = [{
                'frame': "GJ_replayBtn_001.png",
                'action': () => {
                    this._resumeGame(), this._restartLevel();
                }
            }, {
                'frame': "GJ_playBtn2_001.png",
                'action': () => this._resumeGame()
            }, {
                'frame': "GJ_menuBtn_001.png",
                'action': () => {
                    this._audio.playEffect("quitSound_01"), this._audio.stopMusic(), this._resumeGame(), this.scene.restart();
                }
            }],
            _0x25aa59 = _0x4791ac.map(_0x120c08 => {
                const _0x44c01c = this.textures.getFrame("GJ_WebSheet", _0x120c08.frame);
                return _0x44c01c ? _0x44c01c.width : 246;
            });
        let _0x599a9b = _0x13af33 - (_0x25aa59.reduce((_0x53adf8, _0x10ae31) => _0x53adf8 + _0x10ae31, 0) + 40 * (_0x4791ac.length - 1)) / 2;
        for (let _0x18feee = 0; _0x18feee < _0x4791ac.length; _0x18feee++) {
            const _0x17809c = _0x4791ac[_0x18feee],
                _0x228482 = _0x25aa59[_0x18feee],
                _0x7f0786 = this.add.image(_0x599a9b + _0x228482 / 2, 330, "GJ_WebSheet", _0x17809c.frame).setInteractive();
            this._pauseContainer.add(_0x7f0786), this._makeBouncyButton(_0x7f0786, 1, _0x17809c.action), _0x599a9b += _0x228482 + 40;
        }
        const _0x1008ae = 500,
            _0x22b43a = 0.7,
            _0x41925a = this.textures.getFrame("GJ_WebSheet", "slidergroove.png"),
            _0x372782 = _0x41925a ? _0x41925a.width : 420,
            _0xe34699 = (_0x422be3, _0x4b32e0, _0xaaab25, _0x169b87) => {
                this._pauseContainer.add(this.add.image(_0x422be3 - 180 - 5, _0x1008ae, "GJ_WebSheet", _0x4b32e0).setScale(1.2));
                const _0x51c57b = (_0x372782 - 8) * _0x22b43a,
                    _0x34d1c1 = _0x422be3 - _0x372782 * _0x22b43a / 2 + 2.8,
                    _0xe86505 = _0xaaab25 * _0x51c57b,
                    _0x43dbf4 = this.add.tileSprite(_0x34d1c1, _0x1008ae, _0xe86505 > 0 ? _0xe86505 : 1, 11.2, "sliderBar").setOrigin(0, 0.5).setVisible(_0xe86505 > 0);
                this._pauseContainer.add(_0x43dbf4);
                const _0x4de88c = this.add.image(_0x422be3, _0x1008ae, 'GJ_WebSheet', "slidergroove.png").setScale(_0x22b43a);
                this._pauseContainer.add(_0x4de88c);
                const _0x106f98 = _0x34d1c1 + _0xaaab25 * _0x51c57b,
                    _0x441360 = this.add.image(_0x106f98, _0x1008ae, 'GJ_WebSheet', "sliderthumb.png").setScale(_0x22b43a).setInteractive({
                        'draggable': true,
                        'useHandCursor': true
                    });
                this._pauseContainer.add(_0x441360), _0x441360.on("pointerdown", () => _0x441360.setTexture("GJ_WebSheet", "sliderthumbsel.png")), _0x441360.on("pointerup", () => _0x441360.setTexture("GJ_WebSheet", "sliderthumb.png")), _0x441360.on("pointerout", () => _0x441360.setTexture("GJ_WebSheet", 'sliderthumb.png')), _0x441360.on("drag", (_0x1ac7f7, _0x35b64c) => {
                    _0x441360.x = Math.max(_0x34d1c1, Math.min(_0x34d1c1 + _0x51c57b, _0x35b64c));
                    const _0x4a1663 = (_0x441360.x - _0x34d1c1) / _0x51c57b,
                        _0x2bc46f = _0x4a1663 < 0.03 ? 0 : _0x4a1663;
                    _0x43dbf4.width = Math.max(1, _0x2bc46f * _0x51c57b), _0x43dbf4.setVisible(_0x2bc46f > 0), _0x169b87(_0x2bc46f);
                });
            };
        _0xe34699(_0x13af33 - 200, "gj_songIcon_001.png", this._audio.getUserMusicVolume(), _0x3ebce2 => this._audio.setUserMusicVolume(_0x3ebce2)), _0xe34699(_0x13af33 + 200, "GJ_sfxIcon_001.png", this._sfxVolume, _0x3224fb => {
            this._sfxVolume = _0x3224fb, this.game.registry.set("userSfxVol", _0x3224fb);
        });
    }
    _buildInfoPopup() {
        if (this._infoPopup) return;
        const _0xd1c6c2 = SCREEN_WIDTH / 2,
            _0x4c3182 = 320,
            _0xe2830b = 336;
        this._infoPopup = this.add.container(0, 0).setScrollFactor(0).setDepth(200);
        const _0x249eb7 = this.add.rectangle(_0xd1c6c2, _0x4c3182, SCREEN_WIDTH, SCREEN_HEIGHT, 0, 100 / 255);
        _0x249eb7.setInteractive(), this._infoPopup.add(_0x249eb7);
        const _0x14e46f = 0.325 * this.textures.get("GJ_square02").source[0].width,
            _0x2c64c2 = this._drawScale9(_0xd1c6c2, _0x4c3182, 480, _0xe2830b, 'GJ_square02', _0x14e46f, 16777215, 1);
        this._infoPopup.add(_0x2c64c2);
        const _0x5a0f88 = this.add.image(_0xd1c6c2 - 240 + 20, 172, 'GJ_WebSheet', "GJ_closeBtn_001.png").setScale(0.8).setInteractive();
        this._infoPopup.add(_0x5a0f88), this._expandHitArea(_0x5a0f88, 2), this._makeBouncyButton(_0x5a0f88, 0.8, () => this._closeInfoPopup());
        let _0x32bf66 = 206;
        const _0x302fca = this.add.bitmapText(_0xd1c6c2, _0x32bf66, "bigFont", "Credits", 40).setOrigin(0.5, 0.5);
        this._infoPopup.add(_0x302fca), _0x32bf66 += 70;
        const _0x22e4c7 = this.add.bitmapText(_0xd1c6c2, _0x32bf66, 'goldFont', "Made by RobTop Games", 40).setOrigin(0.5, 0.5).setScale(0.6);
        this._infoPopup.add(_0x22e4c7), _0x32bf66 += 60;
        const _0x534a78 = this.add.bitmapText(_0xd1c6c2, _0x32bf66, "goldFont", "Song: Stereo Madness", 40).setOrigin(0.5, 0.5).setScale(0.6);
        this._infoPopup.add(_0x534a78), _0x32bf66 += 30;
        const _0x3cdf70 = this.add.bitmapText(_0xd1c6c2 - 20, _0x32bf66, "goldFont", "by ForeverBound", 40).setOrigin(0.5, 0.5).setScale(0.6);
        this._infoPopup.add(_0x3cdf70);
        const _0x274c3e = _0xd1c6c2 - 10 + 0.6 * _0x3cdf70.width / 2,
            _0x16b125 = this.add.image(_0x274c3e + 20 + 50 - 10, _0x32bf66 + 2, "GJ_WebSheet", 'gj_ytIcon_001.png').setScale(0.5).setInteractive();
        this._infoPopup.add(_0x16b125), this._expandHitArea(_0x16b125, 2), this._makeBouncyButton(_0x16b125, 0.5, () => {
            window.open("https://www.youtube.com/watch?v=JhKyKEDxo8Q", "_blank");
        });
        const _0x8233c2 = this.add.text(_0xd1c6c2, 446, "© 2026 RobTop Games. All rights reserved.", {
            'fontSize': '12px',
            'color': "#000000",
            'fontFamily': "Arial"
        }).setOrigin(0.5, 0.5).setAlpha(0.7).setResolution(2);
        this._infoPopup.add(_0x8233c2);
        const _0x97b2a9 = this.add.text(_0xd1c6c2, 463, "Unauthorized copying, distribution, or hosting of this demo is prohibited.", {
            'fontSize': "12px",
            'color': '#000000',
            'fontFamily': "Arial"
        }).setOrigin(0.5, 0.5).setAlpha(0.7).setResolution(2);
        this._infoPopup.add(_0x97b2a9);
    }
    _closeInfoPopup() {
        this._infoPopup && (this._infoPopup.destroy(), this._infoPopup = null);
    }
    _expandHitArea(_0x122213, _0x37180a) {
        const _0x46ea45 = _0x122213.width,
            _0x43b461 = _0x122213.height,
            _0x960250 = _0x46ea45 * (_0x37180a - 1) / 2,
            _0x3f88a1 = _0x43b461 * (_0x37180a - 1) / 2;
        _0x122213.input.hitArea.setTo(-_0x960250, -_0x3f88a1, _0x46ea45 + 2 * _0x960250, _0x43b461 + 2 * _0x3f88a1);
    }
    _makeBouncyButton(_0x4b8c6e, _0x57b645, _0x2f13d0, _0xda0c21) {
        const _0x396ca0 = 1.26 * _0x57b645;
        return _0x4b8c6e.on("pointerdown", () => {
            _0xda0c21 && !_0xda0c21() || (_0x4b8c6e._pressed = true, this.tweens.killTweensOf(_0x4b8c6e, "scale"), this.tweens.add({
                'targets': _0x4b8c6e,
                'scale': _0x396ca0,
                duration: 300,
                ease: "Bounce.Out"
            }));
        }), _0x4b8c6e.on("pointerout", () => {
            _0x4b8c6e._pressed && (_0x4b8c6e._pressed = false, this.tweens.killTweensOf(_0x4b8c6e, "scale"), this.tweens.add({
                'targets': _0x4b8c6e,
                'scale': _0x57b645,
                duration: 400,
                ease: "Bounce.Out"
            }));
        }), _0x4b8c6e.on('pointerup', () => {
            _0x4b8c6e._pressed && (_0x4b8c6e._pressed = false, this.tweens.killTweensOf(_0x4b8c6e, "scale"), _0x4b8c6e.setScale(_0x57b645), _0x2f13d0());
        }), _0x4b8c6e;
    }
    _toggleFullscreen() {
        if (this.scale.isFullscreen) this.scale.stopFullscreen();
        else {
            this.scale.startFullscreen();
            try {
                screen.orientation.lock("landscape").catch(() => {});
            } catch (_0x22124f) {}
        }
    }
    _drawScale9(_0x147730, _0x4c8cbf, _0x58d136, _0x1ac13a, _0x24a44b, _0x143641, _0x590eba, _0x206735) {
        const _0x4080b2 = this.add.container(_0x147730, _0x4c8cbf),
            _0x2522df = this.textures.get(_0x24a44b),
            _0x401ec1 = _0x2522df.source[0],
            _0x3f82ec = _0x401ec1.width,
            _0x294746 = _0x401ec1.height,
            _0x2b09f1 = _0x58d136 - 2 * _0x143641,
            _0x990515 = _0x1ac13a - 2 * _0x143641,
            _0x1d065e = [{
                'sx': 0,
                'sy': 0,
                'sw': _0x143641,
                'sh': _0x143641,
                'dx': -_0x58d136 / 2,
                'dy': -_0x1ac13a / 2,
                'dw': _0x143641,
                'dh': _0x143641
            }, {
                'sx': _0x143641,
                'sy': 0,
                'sw': _0x3f82ec - 2 * _0x143641,
                'sh': _0x143641,
                'dx': -_0x58d136 / 2 + _0x143641,
                'dy': -_0x1ac13a / 2,
                'dw': _0x2b09f1,
                'dh': _0x143641
            }, {
                'sx': _0x3f82ec - _0x143641,
                'sy': 0,
                'sw': _0x143641,
                'sh': _0x143641,
                'dx': _0x58d136 / 2 - _0x143641,
                'dy': -_0x1ac13a / 2,
                'dw': _0x143641,
                'dh': _0x143641
            }, {
                'sx': 0,
                'sy': _0x143641,
                'sw': _0x143641,
                'sh': _0x294746 - 2 * _0x143641,
                'dx': -_0x58d136 / 2,
                'dy': -_0x1ac13a / 2 + _0x143641,
                'dw': _0x143641,
                'dh': _0x990515
            }, {
                'sx': _0x143641,
                'sy': _0x143641,
                'sw': _0x3f82ec - 2 * _0x143641,
                'sh': _0x294746 - 2 * _0x143641,
                'dx': -_0x58d136 / 2 + _0x143641,
                'dy': -_0x1ac13a / 2 + _0x143641,
                'dw': _0x2b09f1,
                'dh': _0x990515
            }, {
                'sx': _0x3f82ec - _0x143641,
                'sy': _0x143641,
                'sw': _0x143641,
                'sh': _0x294746 - 2 * _0x143641,
                'dx': _0x58d136 / 2 - _0x143641,
                'dy': -_0x1ac13a / 2 + _0x143641,
                'dw': _0x143641,
                'dh': _0x990515
            }, {
                'sx': 0,
                'sy': _0x294746 - _0x143641,
                'sw': _0x143641,
                'sh': _0x143641,
                'dx': -_0x58d136 / 2,
                'dy': _0x1ac13a / 2 - _0x143641,
                'dw': _0x143641,
                'dh': _0x143641
            }, {
                'sx': _0x143641,
                'sy': _0x294746 - _0x143641,
                'sw': _0x3f82ec - 2 * _0x143641,
                'sh': _0x143641,
                'dx': -_0x58d136 / 2 + _0x143641,
                'dy': _0x1ac13a / 2 - _0x143641,
                'dw': _0x2b09f1,
                'dh': _0x143641
            }, {
                'sx': _0x3f82ec - _0x143641,
                'sy': _0x294746 - _0x143641,
                'sw': _0x143641,
                'sh': _0x143641,
                'dx': _0x58d136 / 2 - _0x143641,
                'dy': _0x1ac13a / 2 - _0x143641,
                'dw': _0x143641,
                'dh': _0x143641
            }];
        for (let _0x24f653 = 0; _0x24f653 < _0x1d065e.length; _0x24f653++) {
            const _0x1fa377 = _0x1d065e[_0x24f653],
                _0xade586 = "_s9_" + _0x24f653;
            _0x2522df.has(_0xade586) || _0x2522df.add(_0xade586, 0, _0x1fa377.sx, _0x1fa377.sy, _0x1fa377.sw, _0x1fa377.sh);
            const _0x1145e5 = this.add.image(_0x1fa377.dx, _0x1fa377.dy, _0x24a44b, _0xade586).setOrigin(0, 0).setDisplaySize(_0x1fa377.dw, _0x1fa377.dh);
            undefined !== _0x590eba && _0x1145e5.setTint(_0x590eba), undefined !== _0x206735 && _0x1145e5.setAlpha(_0x206735), _0x4080b2.add(_0x1145e5);
        }
        return _0x4080b2;
    }
    _startGame() {
        if (!this._menuActive) return;
        if (this._menuActive = false, this._slideIn = true, this._menuGlitter && (this._menuGlitter.destroy(), this._menuGlitter = null), this._playBtn && (this.tweens.killTweensOf(this._playBtn), this.tweens.add({
                'targets': this._playBtn,
                'scale': 0.01,
                duration: 200,
                ease: "Quad.In",
                onComplete: () => {
                    this._playBtn.destroy(), this._playBtn = null;
                }
            })), this._robLogo && this.tweens.add({
                'targets': this._robLogo,
                'y': SCREEN_HEIGHT + this._robLogo.height,
                duration: 300,
                ease: "Quad.In",
                onComplete: () => {
                    this._robLogo.destroy(), this._robLogo = null;
                }
            }), this._copyrightText && this.tweens.add({
                'targets': this._copyrightText,
                'y': 680,
                duration: 300,
                ease: 'Quad.In',
                onComplete: () => {
                    this._copyrightText.destroy(), this._copyrightText = null;
                }
            }), this._menuFsBtn && this.tweens.add({
                'targets': this._menuFsBtn,
                'y': -this._menuFsBtn.height,
                duration: 300,
                ease: "Quad.In",
                onComplete: () => {
                    this._menuFsBtn.destroy(), this._menuFsBtn = null;
                }
            }), this._menuInfoBtn && this.tweens.add({
                'targets': this._menuInfoBtn,
                'y': -this._menuInfoBtn.height,
                duration: 300,
                ease: 'Quad.In',
                onComplete: () => {
                    this._menuInfoBtn.destroy(), this._menuInfoBtn = null;
                }
            }), this._closeInfoPopup(), this._tryMeImg && this.tweens.add({
                'targets': this._tryMeImg,
                'y': -this._tryMeImg.height,
                duration: 300,
                ease: "Quad.In",
                onComplete: () => {
                    this._tryMeImg.destroy(), this._tryMeImg = null;
                }
            }), this._downloadBtns) {
            for (const _0xaa3a95 of this._downloadBtns) this.tweens.killTweensOf(_0xaa3a95), this.tweens.add({
                'targets': _0xaa3a95,
                'y': SCREEN_HEIGHT + _0xaa3a95.height,
                duration: 300,
                ease: "Quad.In",
                onComplete: () => _0xaa3a95.destroy()
            });
            this._downloadBtns = null;
        }
        this._logo && this.tweens.add({
            'targets': this._logo,
            'y': -this._logo.height,
            duration: 300,
            ease: "Quad.In",
            onComplete: () => {
                this._logo.destroy(), this._logo = null;
            }
        }), this._cameraX = -PLAYER_GAME_CAMERA_X, this._cameraY = 0, this._cameraXRef._v = this._cameraX, this._prevCameraX = this._cameraX;
        const _0x22e36e = this._cameraX - (this._menuCameraX || 0);
        this._level.shiftGroundTiles(_0x22e36e), this._playerWorldX = this._cameraX, this._state.y = 30, this._state.onGround = true, this._level.additiveContainer.setVisible(true), this._level.container.setVisible(true), this._level.topContainer.setVisible(true), this._player.setCubeVisible(true), this._player.reset(), this._attemptsLabel.setVisible(this._attempts > 1), this._positionAttemptsLabel();
    }
    _pushButton() {
        if (this._menuActive) return this._audio.playEffect("playSound_01", {
            'volume': 1
        }), void this._startGame();
        this._slideIn || this._state.isDead || (this._state.upKeyDown = true, this._state.upKeyPressed = true, !this._state.isFlying && this._state.canJump && (this._player.updateJump(0), this._totalJumps++));
    }
    _releaseButton() {
        this._state.upKeyDown = false, this._state.upKeyPressed = false;
    }
    _positionMenuItems() {
        const _0x1e5db8 = SCREEN_WIDTH / 2;
        if (this._logo && (this._logo.x = _0x1e5db8), this._menuInfoBtn && (this._menuInfoBtn.x = SCREEN_WIDTH - 30 - 3), this._copyrightText && (this._copyrightText.x = SCREEN_WIDTH - 20), this._tryMeImg && (this._tryMeImg.x = _0x1e5db8 + 175), this._menuGlitter && (this._menuGlitter.x = _0x1e5db8, this._menuGlitter.y = 320), this._playBtn && (this._playBtn.x = _0x1e5db8, this.tweens.killTweensOf(this._playBtn, 'y'), this._playBtn.y = 320, this.tweens.add({
                'targets': this._playBtn,
                'y': 324,
                duration: 750,
                ease: 'Quad.InOut',
                'yoyo': true,
                'repeat': -1
            })), this._downloadBtns) {
            const _0x285ef7 = SCREEN_WIDTH - 130,
                _0x4a8263 = 555,
                _0x23d03e = 210;
            for (let _0x1bdfae = 0; _0x1bdfae < this._downloadBtns.length; _0x1bdfae++) this._downloadBtns[_0x1bdfae].setPosition(_0x285ef7 - _0x1bdfae * _0x23d03e, _0x4a8263);
        }
    }
    _positionAttemptsLabel() {
        let _0xdbdd91 = this._cameraX + SCREEN_WIDTH / 2;
        this._attempts > 1 && (_0xdbdd91 += 100), this._attemptsLabel.setPosition(_0xdbdd91, 150);
    }
    _resetGameplayState() {
        this._cameraX = -PLAYER_GAME_CAMERA_X, this._cameraY = 0, this._cameraXRef._v = -PLAYER_GAME_CAMERA_X, this._prevCameraX = -PLAYER_GAME_CAMERA_X, this._playerWorldX = 0, this._deltaBuffer = 0, this._deathTimer = 0, this._deathSoundPlayed = false, this._newBestShown = false, this._hadNewBest = false, this._levelWon = false, this._endCameraOverride = false, this._endCamTween = null, this._spaceWasDown = false;
    }
    _restartLevel() {
        this._attempts++;
        const _0x2ba78a = this._cameraX;
        this._resetGameplayState(), this._state.reset(), this._player.reset(), this._glitterEmitter.stop(), this._level.resetObjects(), this._level.shiftGroundTiles(this._cameraX - _0x2ba78a), this._level.resetGroundState(), this._level.resetColorTriggers(), this._level.resetEnterEffectTriggers(), this._level.resetVisibility(), this._colorManager.reset(), this._audio.reset(), this._audio.startMusic(), this._paused = false, this._pauseContainer && (this._pauseContainer.destroy(), this._pauseContainer = null), this._pauseBtn.setVisible(true).setAlpha(75 / 255), this._attemptsLabel.setText("Attempt " + this._attempts), this._attemptsLabel.setVisible(true), this._positionAttemptsLabel();
    }
    _onFullscreenChange(_0x310c5b) {
        _0x310c5b || setScreenWidth(1138), this.time.delayedCall(200, () => this._applyScreenResize());
    }
    _applyScreenResize() {
        if (this.scale.isFullscreen) {
            const _0x5bc34b = window.innerWidth / window.innerHeight;
            setScreenWidth(Math.round(SCREEN_HEIGHT * _0x5bc34b));
        }
        if (this.scale.setGameSize(SCREEN_WIDTH, SCREEN_HEIGHT), this.scale.refresh(), this._bg.setSize(SCREEN_WIDTH, SCREEN_HEIGHT), this._pauseBtn.x = SCREEN_WIDTH - 30, this._menuActive && this._positionMenuItems(), this._paused && this._pauseContainer && (this._pauseContainer.destroy(), this._pauseContainer = null, this._buildPauseOverlay()), this._level.resizeScreen(), !this._menuActive) {
            const _0x56287b = this._cameraX;
            this._cameraX = this._playerWorldX - PLAYER_GAME_CAMERA_X, this._cameraXRef._v = this._cameraX, this._level.additiveContainer.x = -this._cameraX, this._level.additiveContainer.y = this._cameraY, this._level.container.x = -this._cameraX, this._level.container.y = this._cameraY, this._level.topContainer.x = -this._cameraX, this._level.topContainer.y = this._cameraY, this._level.shiftGroundTiles(this._cameraX - _0x56287b), this._level.updateGroundTiles(this._cameraY), this._level.updateVisibility(this._cameraX), this._level.applyEnterEffects(this._cameraX);
            const _0xde8a1a = this._playerWorldX - this._cameraX;
            this._player.syncSprites(this._cameraX, this._cameraY, 0, _0xde8a1a);
        }
    }
    _updateBackground() {
        this._bg.tilePositionX += (this._cameraX - this._prevCameraX) * this._bgSpeedX, this._prevCameraX = this._cameraX, this._bg.tilePositionY = this._bgInitY - this._cameraY * this._bgSpeedY;
    }
    _updateCameraY(_0xc7c517) {
        let _0x29ed62 = this._cameraY,
            _0x1a27be = _0x29ed62;
        if (null !== this._level.flyCameraTarget) _0x1a27be = this._level.flyCameraTarget;
        else {
            let _0x2bc8fb = this._state.y,
                _0x259956 = 140,
                _0x5025ec = 80,
                _0x1f7976 = _0x29ed62 - o + 320;
            _0x2bc8fb > _0x1f7976 + _0x259956 ? _0x1a27be = _0x2bc8fb - 320 - _0x259956 + o : _0x2bc8fb < _0x1f7976 - _0x5025ec && (_0x1a27be = _0x2bc8fb - 320 + _0x5025ec + o);
        }(_0x1a27be < 0 && (_0x1a27be = 0), 0 !== _0xc7c517) && (_0x29ed62 += (_0x1a27be - _0x29ed62) / (10 / _0xc7c517), (_0x29ed62 < 0 && (_0x29ed62 = 0), this._cameraY = _0x29ed62));
    }
    _quantizeDelta(_0x654f39) {
        let _0x578d1b = _0x654f39 / 1000 + this._deltaBuffer,
            _0x53e02e = Math.round(_0x578d1b / u);
        _0x53e02e < 0 && (_0x53e02e = 0), _0x53e02e > 60 && (_0x53e02e = 60);
        let _0xd8019e = _0x53e02e * u;
        return this._deltaBuffer = _0x578d1b - _0xd8019e, 60 * _0xd8019e;
    }
    update(_0x54fa47, _0xaf2ffd) {
        if (this._fpsAccum += _0xaf2ffd, this._fpsFrames++, this._fpsAccum >= 250 && (this._fpsText.setText(Math.round(1000 * this._fpsFrames / this._fpsAccum)), this._fpsAccum = 0, this._fpsFrames = 0), this._paused) return void(this._deltaBuffer = 0);
        if (this._menuActive) {
            if ((this._spaceKey.isDown || this._upKey.isDown) && !this._spaceWasDown) return this._spaceWasDown = true, this._audio.playEffect("playSound_01", {
                'volume': 1
            }), void this._startGame();
            this._spaceWasDown = this._spaceKey.isDown || this._upKey.isDown;
            const _0x1e9cf4 = Math.min(_0xaf2ffd / 1000 * 60, 2),
                _0x2e19f3 = 0.25;
            this._menuCameraX = (this._menuCameraX || 0) + _0x1e9cf4 * c * d * _0x2e19f3;
            const _0x38afac = this._cameraX;
            return this._cameraX = this._menuCameraX, this._updateBackground(), this._cameraX = _0x38afac, this._prevCameraX = this._menuCameraX, this._cameraXRef._v = this._menuCameraX, this._level.stepGroundAnimation(_0xaf2ffd / 1000), void this._level.updateGroundTiles(this._cameraY);
        }
        if (this._slideIn) {
            const _0x3c9318 = this._quantizeDelta(_0xaf2ffd);
            this._playerWorldX += _0x3c9318 * c * d;
            const _0x4f81e7 = 0.25;
            this._slideGroundX = (this._slideGroundX || this._cameraX) + _0x3c9318 * c * d * _0x4f81e7, this._cameraXRef._v = this._slideGroundX;
            const _0x95cc4f = this._playerWorldX - this._cameraX;
            if (this._player.updateGroundRotation(_0x3c9318 * d), this._player.syncSprites(this._cameraX, this._cameraY, _0xaf2ffd / 1000, _0x95cc4f), this._level.additiveContainer.x = -this._cameraX, this._level.additiveContainer.y = this._cameraY, this._level.container.x = -this._cameraX, this._level.container.y = this._cameraY, this._level.topContainer.x = -this._cameraX, this._level.topContainer.y = this._cameraY, this._level.updateVisibility(this._cameraX), this._updateBackground(), this._level.stepGroundAnimation(_0xaf2ffd / 1000), this._level.updateGroundTiles(this._cameraY), this._playerWorldX >= 0) {
                this._slideIn = false, this._deltaBuffer = 0, this._playerWorldX = 0, this._cameraX = this._playerWorldX - PLAYER_GAME_CAMERA_X, this._cameraXRef._v = this._cameraX;
                const _0x490749 = this._cameraX - this._slideGroundX;
                this._level.shiftGroundTiles(_0x490749), this._firstPlay && (this._firstPlay = false, this._audio.startMusic()), this._pauseBtn.setVisible(true).setAlpha(0), this.tweens.add({
                    'targets': this._pauseBtn,
                    'alpha': 75 / 255,
                    duration: 500
                });
            }
            return;
        }
        let _0x368ad9 = this._spaceKey.isDown || this._upKey.isDown;
        if (_0x368ad9 && !this._spaceWasDown ? this._pushButton() : !_0x368ad9 && this._spaceWasDown && this._releaseButton(), this._spaceWasDown = _0x368ad9, !this.input.activePointer.isDown || this._state.upKeyDown || this._state.isDead || (this._state.upKeyDown = true), this._level.updateEndPortalY(this._cameraY, this._state.isFlying), !this._levelWon && !this._state.isDead && this._level.endXPos > 0) {
            const _0x448396 = 600;
            this._playerWorldX >= this._level.endXPos - _0x448396 && (this._levelWon = true, this._endPortalGameY = this._level._endPortalGameY || 240, this._triggerEndPortal());
        }
        if (this._levelWon) {
            if (this._deltaBuffer = 0, this._endCamTween) {
                const _0x3eb8cf = this._endCamTween;
                this._cameraX = _0x3eb8cf.fromX + (_0x3eb8cf.toX - _0x3eb8cf.fromX) * _0x3eb8cf.p, this._cameraY = _0x3eb8cf.fromY + (_0x3eb8cf.toY - _0x3eb8cf.fromY) * _0x3eb8cf.p;
            }
            return this._cameraXRef._v = this._cameraX, this._level.additiveContainer.x = -this._cameraX, this._level.additiveContainer.y = this._cameraY, this._level.container.x = -this._cameraX, this._level.container.y = this._cameraY, this._level.topContainer.x = -this._cameraX, this._level.topContainer.y = this._cameraY, this._updateBackground(), this._level.stepGroundAnimation(_0xaf2ffd / 1000), void this._level.updateGroundTiles(this._cameraY);
        }
        if (this._state.isDead) {
            if (this._deathSoundPlayed || (this._audio.stopMusic(), this._audio.playEffect("explode_11", {
                    'volume': 0.65
                }), this._deathSoundPlayed = true), !this._newBestShown) {
                this._newBestShown = true;
                let _0x435587 = this._level.endXPos || 6000,
                    _0x169d53 = this._playerWorldX;
                this._lastPercent = Math.min(99, Math.max(0, Math.floor(_0x169d53 / _0x435587 * 100))), this._lastPercent > this._bestPercent && (this._bestPercent = this._lastPercent, this._hadNewBest = true, this._showNewBest());
            }
            this._player.updateExplosionPieces(_0xaf2ffd), this._deathTimer += _0xaf2ffd;
            let _0x237728 = this._hadNewBest ? 1400 : 1000;
            return void(this._deathTimer > _0x237728 && this._restartLevel());
        }
        this._playTime += _0xaf2ffd / 1000, this._audio.update(_0xaf2ffd / 1000), this._level.updateAudioScale(this._audio.getMeteringValue());
        let _0x30fa5d = this._quantizeDelta(_0xaf2ffd),
            _0x5efc2d = _0x30fa5d > 0 ? Math.max(1, Math.round(4 * _0x30fa5d)) : 0;
        _0x5efc2d > 60 && (_0x5efc2d = 60);
        let _0x426602 = _0x5efc2d > 0 ? _0x30fa5d / _0x5efc2d : 0,
            _0x5caeb1 = _0x426602 * d;
        const _0x23505e = this._state.y;
        for (let _0x26d5d6 = 0; _0x26d5d6 < _0x5efc2d; _0x26d5d6++) this._state.lastY = this._state.y, this._player.updateJump(_0x5caeb1), this._state.y += this._state.yVelocity * _0x5caeb1, this._player.checkCollisions(this._playerWorldX - PLAYER_GAME_CAMERA_X), this._playerWorldX += _0x426602 * c * d, this._state.isFlying || (this._state.onGround ? this._player.updateGroundRotation(_0x5caeb1) : this._player.rotateActionActive && this._player.updateRotateAction(u));
        if (this._state.lastY = _0x23505e, !this._endCameraOverride) {
            const _0xe48698 = this._playerWorldX - PLAYER_GAME_CAMERA_X;
            if (this._level.endXPos > 0) {
                const _0x24670d = this._level.endXPos - SCREEN_WIDTH;
                if (_0xe48698 >= _0x24670d - 200) {
                    this._endCameraOverride = true, this._cameraX = _0xe48698;
                    const _0x2e3f0a = -140 + (this._level._endPortalGameY || 240),
                        _0x34bdb9 = 1.8,
                        _0x41f777 = _0x2aca75 => _0x2aca75 < 0.5 ? Math.pow(2 * _0x2aca75, _0x34bdb9) / 2 : 1 - Math.pow(2 * (1 - _0x2aca75), _0x34bdb9) / 2;
                    this._endCamTween = {
                        'p': 0,
                        'fromX': this._cameraX,
                        'toX': _0x24670d,
                        'fromY': this._cameraY,
                        'toY': _0x2e3f0a
                    }, this.tweens.add({
                        'targets': this._endCamTween,
                        'p': 1,
                        duration: 1200,
                        ease: _0x41f777
                    });
                } else this._cameraX = _0xe48698;
            } else this._cameraX = _0xe48698;
        }
        if (this._endCameraOverride && this._endCamTween) {
            const _0x490838 = this._endCamTween;
            this._cameraX = _0x490838.fromX + (_0x490838.toX - _0x490838.fromX) * _0x490838.p, this._cameraY = _0x490838.fromY + (_0x490838.toY - _0x490838.fromY) * _0x490838.p;
        }
        this._cameraXRef._v = this._cameraX, this._endCameraOverride || this._updateCameraY(_0x30fa5d), this._level.additiveContainer.x = -this._cameraX, this._level.additiveContainer.y = this._cameraY, this._level.container.x = -this._cameraX, this._level.container.y = this._cameraY, this._level.topContainer.x = -this._cameraX, this._level.topContainer.y = this._cameraY;
        let _0x5464ab = this._playerWorldX;
        for (let _0x2001f6 of this._level.checkColorTriggers(_0x5464ab)) this._colorManager.triggerColor(_0x2001f6.index, _0x2001f6.color, _0x2001f6.duration), _0x2001f6.tintGround && this._colorManager.triggerColor(ID_GROUND_COLOR, _0x2001f6.color, _0x2001f6.duration);
        this._colorManager.step(_0xaf2ffd / 1000), this._bg.setTint(this._colorManager.getHex(ID_BACKGROUND_COLOR)), this._level.setGroundColor(this._colorManager.getHex(ID_GROUND_COLOR)), this._level.updateVisibility(this._cameraX), this._level.checkEnterEffectTriggers(_0x5464ab), this._level.applyEnterEffects(this._cameraX), this._glitterCenterX = this._cameraX + SCREEN_WIDTH / 2, this._glitterCenterY = GROUND_BOUNDS_Y - this._cameraY, this._updateBackground(), this._level.stepGroundAnimation(_0xaf2ffd / 1000), this._level.updateGroundTiles(this._cameraY), this._state.isFlying && this._player.updateShipRotation(_0x30fa5d);
        const _0x259e68 = this._playerWorldX - this._cameraX;
        this._player.syncSprites(this._cameraX, this._cameraY, _0xaf2ffd / 1000, _0x259e68);
    }
    _showNewBest() {
        let _0x9f2437 = SCREEN_WIDTH / 2,
            _0x12bde3 = this.add.image(0, 0, "GJ_WebSheet", "GJ_newBest_001.png").setOrigin(0.5, 1),
            _0x544c9c = this.add.bitmapText(0, 2, "bigFont", this._lastPercent + '%', 65).setOrigin(0.5, 0).setScale(1.1),
            _0x326cb9 = this.add.container(_0x9f2437, 300, [_0x12bde3, _0x544c9c]).setScrollFactor(0).setDepth(60).setScale(0.01);
        this.tweens.add({
            'targets': _0x326cb9,
            'scale': 1,
            duration: 400,
            ease: 'Elastic.Out',
            'easeParams': [1, 0.6],
            onComplete: () => {
                this.tweens.add({
                    'targets': _0x326cb9,
                    'scale': 0.01,
                    duration: 200,
                    'delay': 700,
                    ease: 'Quad.In',
                    onComplete: () => {
                        _0x326cb9.setVisible(false), _0x326cb9.destroy();
                    }
                });
            }
        });
    }
    _triggerEndPortal() {
        this._player.playEndAnimation(this._level.endXPos, () => this._levelComplete(), this._endPortalGameY);
    }
    _levelComplete() {
        const _0x356782 = this._level.endXPos - this._cameraX,
            _0x2d967b = b(this._endPortalGameY) + this._cameraY;
        for (let _0x481f7c = 0; _0x481f7c < 5; _0x481f7c++) this.time.delayedCall(50 * _0x481f7c, () => _s(this, _0x356782, _0x2d967b, 10, SCREEN_WIDTH, 500, false, true, COLOR_GREEN));
        _s(this, _0x356782, _0x2d967b, 10, 1000, 500, true, false, COLOR_GREEN), this._showCompleteEffect();
    }
    _showCompleteEffect() {
        this._audio.fadeOutMusic(1500), this.sound.play("endStart_02", {
            'volume': 0.8
        }), (! function(_0x3f5321, _0x8f5267, _0x2f1e2d, _0x4b5e5b) {
            const _0x29d856 = 2,
                _0x1b2543 = 8,
                _0x2cc21f = 1 * _0x29d856,
                _0x26b2b1 = 30 * _0x29d856,
                _0x6f49c1 = 20 * _0x29d856,
                _0x232789 = Math.round(Math.sqrt(SCREEN_WIDTH ** 2 + 102400)) + 32.5 * _0x29d856,
                _0x1c105b = 180,
                _0x586720 = 40,
                _0x57b9ff = 195,
                _0x2b6612 = 40,
                _0x5ce50e = 40,
                _0x4da54f = 155 / 255,
                _0x20decf = 100 / 255,
                _0x576e6f = 400,
                _0x487fb1 = -135,
                _0x323ded = 90 / _0x1b2543,
                _0x44369e = Array.from({
                    'length': _0x1b2543
                }, (_0x18e51d, _0x59ebd4) => _0x487fb1 + _0x59ebd4 * _0x323ded);
            for (let _0x59890f = _0x44369e.length - 1; _0x59890f > 0; _0x59890f--) {
                const _0x2bf73b = Math.floor(Math.random() * (_0x59890f + 1));
                [_0x44369e[_0x59890f], _0x44369e[_0x2bf73b]] = [_0x44369e[_0x2bf73b], _0x44369e[_0x59890f]];
            }
            let _0x594d69 = 0;
            const _0x116c8c = [];
            for (let _0x104cbb = 0; _0x104cbb < _0x1b2543; _0x104cbb++) {
                const _0x1a79fc = _0x104cbb * _0x57b9ff + _0x2b6612 + _0x5ce50e * (2 * Math.random() - 1),
                    _0x6eb03a = _0x26b2b1 + _0x6f49c1 * (2 * Math.random() - 1),
                    _0x2e9531 = _0x1c105b + _0x586720 * (2 * Math.random() - 1),
                    _0x28e7b3 = Math.min(1, Math.max(0, _0x4da54f + _0x20decf * (2 * Math.random() - 1))),
                    _0x34147c = _0x44369e[_0x104cbb] + _0x323ded * Math.random() + 180,
                    _0xf33b0d = _0x3f5321.add.graphics().setScrollFactor(0).setDepth(-1).setBlendMode(BLEND_ADD).setPosition(_0x8f5267, _0x2f1e2d).setAngle(_0x34147c).setAlpha(_0x28e7b3).setVisible(false),
                    _0x496d96 = {
                        'PLAYER_GAME_CAMERA_X': 1,
                        'w': _0x2cc21f
                    };
                _0x3f5321.time.delayedCall(Math.max(0, _0x1a79fc), () => {
                    _0xf33b0d.setVisible(true), _0x3f5321.tweens.add({
                        'targets': _0x496d96,
                        'PLAYER_GAME_CAMERA_X': _0x232789,
                        'w': _0x6eb03a,
                        duration: _0x2e9531,
                        ease: "Quad.Out",
                        onUpdate: () => {
                            const _0x2db3d7 = _0x2cc21f + (_0x496d96.w - _0x2cc21f) / 4;
                            _0xf33b0d.clear(), _0xf33b0d.fillStyle(_0x4b5e5b, 1), _0xf33b0d.beginPath(), _0xf33b0d.moveTo(-_0x2db3d7 / 2, 0), _0xf33b0d.lineTo(_0x2db3d7 / 2, 0), _0xf33b0d.lineTo(_0x496d96.w / 2, _0x496d96.h), _0xf33b0d.lineTo(-_0x496d96.w / 2, _0x496d96.h), _0xf33b0d.closePath(), _0xf33b0d.fillPath();
                        }
                    });
                }), _0x1a79fc > _0x594d69 && (_0x594d69 = _0x1a79fc), _0x116c8c.push(_0xf33b0d);
            }
            _0x3f5321.time.delayedCall(_0x594d69 + _0x576e6f, () => {
                for (const _0x15b95e of _0x116c8c) {
                    const _0x51b5fc = 200 * Math.random(),
                        _0x3ed1de = 400 + 100 * (2 * Math.random() - 1);
                    _0x3f5321.tweens.add({
                        'targets': _0x15b95e,
                        'alpha': 0,
                        'delay': _0x51b5fc,
                        duration: _0x3ed1de,
                        onComplete: () => _0x15b95e.destroy()
                    });
                }
            });
        }(this, this._level.endXPos - this._cameraX + 60, b(this._endPortalGameY) + this._cameraY, COLOR_GREEN), this.cameras.main.shake(1950, 0.004), this.time.delayedCall(1950, () => this._showCompleteText()));
    }
    _showCompleteText() {
        const _0x56628c = SCREEN_WIDTH / 2,
            _0x45ab26 = this.add.image(_0x56628c, 250, 'GJ_WebSheet', "GJ_levelComplete_001.png").setScrollFactor(0).setDepth(60).setScale(0.01);
        this.tweens.add({
            'targets': _0x45ab26,
            'scale': 1.1,
            duration: 660,
            ease: 'Elastic.Out',
            'easeParams': [1, 0.6],
            onComplete: () => {
                this.tweens.add({
                    'targets': _0x45ab26,
                    'scale': 0.01,
                    duration: 220,
                    'delay': 880,
                    ease: 'Quad.In',
                    onComplete: () => {
                        _0x45ab26.setVisible(false), _0x45ab26.destroy();
                    }
                });
            }
        });
        const _0x2884ff = [COLOR_GREEN, 16777215];
        for (let _0x5f16c8 = 0; _0x5f16c8 < 2; _0x5f16c8++) this.add.particles(_0x56628c, 250, "GJ_WebSheet", {
            'frame': "square.png",
            'speed': {
                'min': 300,
                'max': 700
            },
            'angle': {
                'min': 0,
                'max': 360
            },
            'scale': {
                'start': 0.4,
                'end': 0.13
            },
            'lifespan': {
                'min': 0,
                'max': 1000
            },
            'quantity': 50,
            'stopAfter': 200,
            'blendMode': BLEND_ADD,
            'tint': _0x2884ff[_0x5f16c8],
            'x': {
                'min': -800,
                'max': 800
            },
            'y': {
                'min': -80,
                'max': 80
            }
        }).setScrollFactor(0).setDepth(59);
        const _0x2eadf2 = this._level.endXPos - this._cameraX,
            _0x380b24 = b(this._endPortalGameY) + this._cameraY;
        _s(this, _0x2eadf2, _0x380b24, 10, SCREEN_WIDTH, 800, true, false, COLOR_GREEN), _s(this, _0x56628c, 250, 10, 1000, 800, true, false, COLOR_GREEN);
        for (let _0x579e05 = 0; _0x579e05 < 5; _0x579e05++) this.time.delayedCall(50 * _0x579e05, () => _s(this, _0x2eadf2, _0x380b24, 10, SCREEN_WIDTH, 500, false, true, COLOR_GREEN));
        for (let _0x429722 = 0; _0x429722 < 10; _0x429722++) {
            const _0xbf7dd0 = 150 * _0x429722 + (160 * Math.random() - 80);
            this.time.delayedCall(Math.max(0, _0xbf7dd0), () => ws(this, COLOR_GREEN, COLOR_BLUE));
        }
        this.time.delayedCall(1500, () => this._showEndLayer());
    }
    _showEndLayer() {
        this._pauseBtn && this.tweens.add({
            'targets': this._pauseBtn,
            'alpha': 0,
            duration: 300
        });
        const _0x384f9e = SCREEN_WIDTH / 2,
            _0x1aa656 = 320;
        this._endLayerOverlay = this.add.rectangle(_0x384f9e, _0x1aa656, SCREEN_WIDTH, SCREEN_HEIGHT, 0, 0).setScrollFactor(0).setDepth(200).setInteractive(), (this._endLayerInternal = this.add.container(0, -640).setScrollFactor(0).setDepth(201), this.tweens.add({
            'targets': this._endLayerOverlay,
            'alpha': 100 / 255,
            duration: 1000
        }));
        const _0x59b9ab = {
            'p': 0
        };
        this.tweens.add({
            'targets': _0x59b9ab,
            'p': 1,
            duration: 1000,
            ease: "Bounce.Out",
            onUpdate: () => {
                this._endLayerInternal.y = 650 * _0x59b9ab.p - 640;
            },
            onComplete: () => this._playStarAward()
        });
        const _0x595215 = 712,
            _0x950c8d = 460,
            _0x2a115c = (SCREEN_WIDTH - _0x595215) / 2;
        this._endLayerInternal.add(this.add.rectangle(_0x2a115c + 356, 310, _0x595215, _0x950c8d, 0, 180 / 255));
        const _0x43f2e3 = this.textures.getFrame("GJ_WebSheet", "GJ_table_side_001.png"),
            _0x3feccc = _0x43f2e3 ? _0x950c8d / _0x43f2e3.height : 1;
        this._endLayerInternal.add(this.add.image(_0x2a115c - 40, 80, "GJ_WebSheet", 'GJ_table_side_001.png').setOrigin(0, 0).setScale(1, _0x3feccc)), this._endLayerInternal.add(this.add.image(_0x2a115c + _0x595215 + 40, 80, "GJ_WebSheet", 'GJ_table_side_001.png').setOrigin(1, 0).setFlipX(true).setScale(1, _0x3feccc));
        const _0x33b564 = this.add.image(_0x2a115c + 356, 70, "GJ_WebSheet", "GJ_table_top_001.png");
        this._endLayerInternal.add(_0x33b564), this._endLayerInternal.add(this.add.image(_0x2a115c + 356, 560, "GJ_WebSheet", "GJ_table_bottom_001.png"));
        const _0x3e9c79 = _0x33b564.y - 65;
        this._endLayerInternal.add(this.add.image(_0x384f9e - 312, _0x3e9c79, 'GJ_WebSheet', "chain_01_001.png").setOrigin(0.5, 1)), this._endLayerInternal.add(this.add.image(_0x384f9e + 312, _0x3e9c79, 'GJ_WebSheet', 'chain_01_001.png').setOrigin(0.5, 1)), this._endLayerInternal.add(this.add.image(_0x384f9e, 170, "GJ_WebSheet", "GJ_levelComplete_001.png").setScale(0.8));
        const _0x45b6e4 = 0.8;
        let _0xe44f6d = 250;
        const _0x2de55e = this.add.bitmapText(_0x384f9e, _0xe44f6d, 'goldFont', "Attempts: " + this._attempts, 40).setOrigin(0.5, 0.5).setScale(_0x45b6e4);
        this._endLayerInternal.add(_0x2de55e), _0xe44f6d += 48, this._endLayerInternal.add(this.add.bitmapText(_0x384f9e, _0xe44f6d, "goldFont", "Jumps: " + this._totalJumps, 40).setOrigin(0.5, 0.5).setScale(_0x45b6e4)), _0xe44f6d += 48;
        const _0x596450 = Math.floor(this._playTime),
            _0x30687e = Math.floor(_0x596450 / 3600),
            _0x52f8ee = Math.floor(_0x596450 % 3600 / 60),
            _0x2591d0 = _0x596450 % 60;
        let _0x2be782;
        _0x2be782 = _0x30687e > 0 ? String(_0x30687e).padStart(2, '0') + ':' + String(_0x52f8ee).padStart(2, '0') + ':' + String(_0x2591d0).padStart(2, '0') : String(_0x52f8ee).padStart(2, '0') + ':' + String(_0x2591d0).padStart(2, '0');
        const _0x241209 = _0xe44f6d;
        this._endLayerInternal.add(this.add.bitmapText(_0x384f9e, _0xe44f6d, "goldFont", "Time: " + _0x2be782, 40).setOrigin(0.5, 0.5).setScale(_0x45b6e4));
        const _0x452429 = ["Awesome!", "Good\nJob!", "Well\nDone!", "Impressive!", "Amazing!", 'Incredible!', "Skillful!", 'Brilliant!', "Not\nbad!", "Warp\nSpeed!", 'Challenge\x0aBreaker!', 'Reflex\x0aMaster!', "I am\nspeechless...", "You are...\nThe One!", "How is this\npossible!?", "You beat\nme..."],
            _0x165c06 = _0x452429[Math.floor(Math.random() * _0x452429.length)],
            _0x45540f = 225;
        this._endLayerInternal.add(this.add.bitmapText(_0x384f9e + _0x45540f, _0x241209, 'bigFont', _0x165c06, 40).setOrigin(0.5, 0.5).setScale(0.8).setCenterAlign()), this._endLayerInternal.add(this.add.image(_0x384f9e - _0x45540f, 352.5, "GJ_WebSheet", 'getIt_001.png').setScale(1 / 1.5));
        const _0x34b1bd = [{
            'key': "downloadApple_001",
            'url': "https://apps.apple.com/us/app/geometry-dash/id625334537"
        }, {
            'key': "downloadGoogle_001",
            'url': "https://play.google.com/store/apps/details?id=com.robtopx.geometryjump&hl=en"
        }, {
            'key': "downloadSteam_001",
            'url': "https://store.steampowered.com/app/322170/Geometry_Dash"
        }];
        for (let _0x10f8cc = 0; _0x10f8cc < _0x34b1bd.length; _0x10f8cc++) {
            const _0xd7310b = _0x34b1bd[_0x10f8cc],
                _0x1e3f82 = (_0x10f8cc - 1) * _0x45540f,
                _0x55a82e = 1 / 1.5,
                _0x4c7fb8 = this.add.image(_0x384f9e + _0x1e3f82, 437.5, "GJ_WebSheet", _0xd7310b.key + ".png").setScale(_0x55a82e).setInteractive();
            this._endLayerInternal.add(_0x4c7fb8), this._makeBouncyButton(_0x4c7fb8, _0x55a82e, () => window.open(_0xd7310b.url, "_blank"));
        }
        _0x2de55e.width, this._endStarX = _0x384f9e + _0x45540f, this._endStarY = _0x241209 - 77.5;
        const _0x45fc2b = [{
            'frame': 'GJ_replayBtn_001.png',
            'dx': -200,
            'action': () => this._hideEndLayer(() => this._restartLevel())
        }, {
            'frame': 'GJ_menuBtn_001.png',
            'dx': 200,
            'action': () => {
                this._audio.playEffect("quitSound_01"), this._audio.stopMusic(), this.game.registry.set("fadeInFromBlack", true), this.cameras.main.fadeOut(400, 0, 0, 0, (_0x53bf86, _0x15310d) => {
                    _0x15310d >= 1 && this.scene.restart();
                });
            }
        }];
        for (const _0x2d4335 of _0x45fc2b) {
            const _0xdde774 = this.add.image(_0x384f9e + _0x2d4335.dx, 555, "GJ_WebSheet", _0x2d4335.frame).setInteractive();
            this._endLayerInternal.add(_0xdde774), this._makeBouncyButton(_0xdde774, 1, _0x2d4335.action);
        }
    }
    _playStarAward() {
        if (!this._endLayerInternal) return;
        const _0x4edc03 = this._endStarX,
            _0x5a0e9 = this._endStarY,
            _0x453043 = this.add.image(_0x4edc03, _0x5a0e9, "GJ_WebSheet", "GJ_bigStar_001.png").setScale(3).setAlpha(0);
        this._endLayerInternal.add(_0x453043), this.tweens.add({
            'targets': _0x453043,
            'scale': 0.8,
            'alpha': 1,
            duration: 300,
            'delay': 0,
            ease: "Bounce.Out"
        }), this.time.delayedCall(100, () => {
            this._audio.playEffect("highscoreGet02");
            const _0x1204d3 = _0x4edc03,
                _0x96e3b2 = _0x5a0e9 + this._endLayerInternal.y;
            this.add.particles(_0x1204d3, _0x96e3b2, "GJ_WebSheet", {
                'frame': "square.png",
                'speed': {
                    'min': 200,
                    'max': 600
                },
                'angle': {
                    'min': 0,
                    'max': 360
                },
                'scale': {
                    'start': 0.5,
                    'end': 0
                },
                'alpha': {
                    'start': 1,
                    'end': 0
                },
                'lifespan': {
                    'min': 200,
                    'max': 600
                },
                'quantity': 30,
                'stopAfter': 30,
                'blendMode': BLEND_ADD,
                'tint': 16776960
            }).setScrollFactor(0).setDepth(202);
            const _0x43203f = this.add.graphics().setScrollFactor(0).setDepth(202).setBlendMode(BLEND_ADD),
                _0x403316 = {
                    't': 0
                };
            this.tweens.add({
                'targets': _0x403316,
                't': 1,
                duration: 400,
                ease: "Quad.Out",
                onUpdate: () => {
                    _0x43203f.clear(), _0x43203f.fillStyle(16776960, 1 - _0x403316.t), _0x43203f.fillCircle(_0x1204d3, _0x96e3b2, 20 + 200 * _0x403316.t);
                },
                onComplete: () => _0x43203f.destroy()
            });
        });
    }
    _hideEndLayer(_0x272eb1) {
        if (!this._endLayerInternal) return void(_0x272eb1 && _0x272eb1());
        const _0x1215e0 = {
            'p': 0
        };
        this.tweens.add({
            'targets': _0x1215e0,
            'p': 1,
            duration: 500,
            ease: _0xc1c75 => _0xc1c75 < 0.5 ? Math.pow(2 * _0xc1c75, 2) / 2 : 1 - Math.pow(2 * (1 - _0xc1c75), 2) / 2,
            onUpdate: () => {
                this._endLayerInternal.y = -640 * _0x1215e0.p;
            },
            onComplete: () => {
                this._endLayerInternal.destroy(), this._endLayerInternal = null, this._endLayerOverlay && (this._endLayerOverlay.destroy(), this._endLayerOverlay = null), _0x272eb1 && _0x272eb1();
            }
        }), this.tweens.add({
            'targets': this._endLayerOverlay,
            'alpha': 0,
            duration: 500
        });
    }
}

export { gameScene };
