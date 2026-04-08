/*
    ground and level objects
*/
import * as Phaser from 'phaser';
import { SCREEN_WIDTH, a, o, PLAYER_GAME_CAMERA_X, FLY_CEILING, g, COLOR_GREEN, OBJECT_TYPE_SOLID, OBJECT_TYPE_HAZARD, OBJECT_TYPE_PORTAL_SHIP, OBJECT_TYPE_PORTAL_CUBE, worldYToScreenY, BLEND_ADD, BLEND_NORMAL,
    OBJECT_TYPE_2_SOLID, OBJECT_TYPE_2_HAZARD, OBJECT_TYPE_2_DECORATIVE, OBJECT_TYPE_2_PORTAL, OBJECT_TYPE_2_PAD, OBJECT_TYPE_2_RING, OBJECT_TYPE_2_TRIGGER, OBJECT_TYPE_2_SPEED, OBJECT_TYPE_2_FLY, OBJECT_TYPE_2_CUBE
 } from '../constants.js';
import { findAtlasFrame, createImageFromAtlas, GameObject } from '../systems/GameState.js';
import { parseLevel, getObjectDefinition } from '../level/LevelData.js';

class us {
    constructor(_0x46dab3, _0x35fa95) {
        this._scene = _0x46dab3, this._cameraXRef = _0x35fa95, this.additiveContainer = _0x46dab3.add.container(0, 0).setDepth(-1), this.container = _0x46dab3.add.container(0, 0), this.topContainer = _0x46dab3.add.container(0, 0).setDepth(13), this.objects = [], this.endXPos = 0, this._groundY = 0, this._ceilingY = null, this._flyGroundActive = false, this._groundAnimFrom = 0, this._groundAnimTo = 0, this._groundAnimTime = 0, this._groundAnimDuration = 0, this._groundAnimating = false, this._groundTargetValue = 0, this._flyFloorY = 0, this._flyCeilingY = 0, this.flyCameraTarget = null, this._colorTriggers = [], this._colorTriggerIdx = 0, this._audioScaleSprites = [], this._enterEffectTriggers = [], this._enterEffectTriggerIdx = 0, this._activeEnterEffect = 0, this._activeExitEffect = 0, this._sections = [], this._sectionContainers = [], this._collisionSections = [], this._nearbyBuffer = [], this._visMinSec = -1, this._visMaxSec = -1, this._groundStartScreenY = worldYToScreenY(0), this._ceilingStartScreenY = 0, this._buildGround();
    }
    loadLevel(_0x335f1b) {
        let {
            objects: _0x1b4349
        } = parseLevel(_0x335f1b);
        this._spawnLevelObjects(_0x1b4349);
    }
    _buildGround() {
        const _0x73ae12 = this._scene,
            _0x3bff90 = _0x73ae12.textures.getFrame('GJ_WebSheet', 'groundSquare_01_001.png');
        this._tileW = _0x3bff90 ? _0x3bff90.width : 1012, this._groundTiles = [], this._ceilingTiles = [];
        let _0x5bf5f8 = Math.ceil(SCREEN_WIDTH / this._tileW) + 2,
            _0x428d85 = worldYToScreenY(0);
        const _0x239f13 = -PLAYER_GAME_CAMERA_X;
        for (let _0x3a0baf = 0; _0x3a0baf < _0x5bf5f8; _0x3a0baf++) {
            let _0x4cea14 = _0x239f13 + _0x3a0baf * this._tileW,
                _0x929a9b = _0x73ae12.add.image(0, _0x428d85, "GJ_WebSheet", 'groundSquare_01_001.png');
            _0x929a9b.setOrigin(0, 0), _0x929a9b.setTint(17578), _0x929a9b.setDepth(20), _0x929a9b._worldX = _0x4cea14, this._groundTiles.push(_0x929a9b);
            let _0x1b177f = _0x73ae12.add.image(0, _0x428d85, "GJ_WebSheet", "groundSquare_01_001.png");
            _0x1b177f.setOrigin(0, 1), _0x1b177f.setFlipY(true), _0x1b177f.setTint(17578), _0x1b177f.setDepth(20), _0x1b177f.setVisible(false), _0x1b177f._worldX = _0x4cea14, this._ceilingTiles.push(_0x1b177f);
        }
        this._maxGroundWorldX = _0x239f13 + (_0x5bf5f8 - 1) * this._tileW;
        const _0x42704c = _0x73ae12.textures.getFrame('GJ_WebSheet', "floorLine_01_001.png"),
            _0x37a2ff = _0x42704c ? _0x42704c.width : 888,
            _0x578262 = SCREEN_WIDTH / _0x37a2ff;
        this._groundLine = _0x73ae12.add.image(SCREEN_WIDTH / 2, _0x428d85 - 1, 'GJ_WebSheet', 'floorLine_01_001.png').setOrigin(0.5, 0).setScale(_0x578262, 1).setBlendMode(BLEND_ADD).setDepth(21).setScrollFactor(0), this._ceilingLine = _0x73ae12.add.image(SCREEN_WIDTH / 2, _0x428d85 + 1, "GJ_WebSheet", 'floorLine_01_001.png').setOrigin(0.5, 1).setScale(_0x578262, 1).setFlipY(true).setBlendMode(BLEND_ADD).setDepth(21).setScrollFactor(0).setVisible(false);
        const _0x4ff823 = 100 / 255;
        this._groundShadowL = _0x73ae12.add.image(-1, _0x428d85, "GJ_WebSheet", "groundSquareShadow_001.png").setOrigin(0, 0).setScrollFactor(0).setDepth(22).setAlpha(_0x4ff823).setScale(0.7, 1).setBlendMode(BLEND_NORMAL), this._groundShadowR = _0x73ae12.add.image(SCREEN_WIDTH + 1, _0x428d85, 'GJ_WebSheet', "groundSquareShadow_001.png").setOrigin(1, 0).setScrollFactor(0).setDepth(22).setAlpha(_0x4ff823).setScale(0.7, 1).setFlipX(true).setBlendMode(BLEND_NORMAL), this._ceilingShadowL = _0x73ae12.add.image(-1, _0x428d85, "GJ_WebSheet", 'groundSquareShadow_001.png').setOrigin(0, 1).setScrollFactor(0).setDepth(22).setAlpha(_0x4ff823).setScale(0.7, 1).setFlipY(true).setBlendMode(BLEND_NORMAL).setVisible(false), this._ceilingShadowR = _0x73ae12.add.image(SCREEN_WIDTH + 1, _0x428d85, "GJ_WebSheet", 'groundSquareShadow_001.png').setOrigin(1, 1).setScrollFactor(0).setDepth(22).setAlpha(_0x4ff823).setScale(0.7, 1).setFlipX(true).setFlipY(true).setBlendMode(BLEND_NORMAL).setVisible(false);
    }
    resizeScreen() {
        var _0xdc60af, _0x493047;
        const _0x1f0ac2 = this._scene,
            _0x495be2 = this._tileW,
            _0x546bad = Math.ceil(SCREEN_WIDTH / _0x495be2) + 2,
            _0x4f87d5 = worldYToScreenY(0);
        for (; this._groundTiles.length < _0x546bad;) {
            const _0x596be1 = this._maxGroundWorldX + _0x495be2;
            let _0x32bd97 = _0x1f0ac2.add.image(0, _0x4f87d5, 'GJ_WebSheet', "groundSquare_01_001.png");
            _0x32bd97.setOrigin(0, 0).setTint((null == (_0xdc60af = this._groundTiles[0]) ? undefined : _0xdc60af.tintTopLeft) || 17578).setDepth(20), _0x32bd97._worldX = _0x596be1, this._groundTiles.push(_0x32bd97);
            let _0x6e7d76 = _0x1f0ac2.add.image(0, _0x4f87d5, 'GJ_WebSheet', "groundSquare_01_001.png");
            _0x6e7d76.setOrigin(0, 1).setFlipY(true).setTint((null == (_0x493047 = this._groundTiles[0]) ? undefined : _0x493047.tintTopLeft) || 17578).setDepth(20).setVisible(false), _0x6e7d76._worldX = _0x596be1, this._ceilingTiles.push(_0x6e7d76), this._maxGroundWorldX = _0x596be1;
        }
        const _0x51125e = this._scene.textures.getFrame("GJ_WebSheet", "floorLine_01_001.png"),
            _0x1c38c3 = SCREEN_WIDTH / (_0x51125e ? _0x51125e.width : 888);
        this._groundLine.x = SCREEN_WIDTH / 2, this._groundLine.setScale(_0x1c38c3, 1), this._ceilingLine.x = SCREEN_WIDTH / 2, this._ceilingLine.setScale(_0x1c38c3, 1), this._groundShadowR.x = SCREEN_WIDTH + 1, this._ceilingShadowR.x = SCREEN_WIDTH + 1;
    }
    updateGroundTiles(_0x14aed2 = 0) {
        const _0x3d0974 = this._cameraXRef.value,
            _0x40fc27 = this._tileW;
        let _0x12b0b9, _0x3453a2, _0x5bf36e = this._maxGroundWorldX || -1 / 0;
        if (this._flyGroundActive && this._groundTargetValue > 0.001) {
            let _0x3ce536 = this._groundTargetValue,
                _0x3f1d55 = 620,
                _0x178745 = 20;
            _0x12b0b9 = this._groundStartScreenY + (_0x3f1d55 - this._groundStartScreenY) * _0x3ce536, _0x3453a2 = this._ceilingStartScreenY + (_0x178745 - this._ceilingStartScreenY) * _0x3ce536;
            let _0x518952 = worldYToScreenY(0) + _0x14aed2;
            _0x12b0b9 > _0x518952 && (_0x12b0b9 = _0x518952);
        } else _0x12b0b9 = worldYToScreenY(0) + _0x14aed2, _0x3453a2 = 0;
        for (let _0x2c7b79 = 0; _0x2c7b79 < this._groundTiles.length; _0x2c7b79++) {
            let _0x2d1a71 = this._groundTiles[_0x2c7b79],
                _0x20a50b = this._ceilingTiles[_0x2c7b79];
            _0x2d1a71._worldX + _0x40fc27 <= _0x3d0974 && (_0x2d1a71._worldX = _0x5bf36e + _0x40fc27, _0x20a50b._worldX = _0x2d1a71._worldX, _0x5bf36e = _0x2d1a71._worldX, this._maxGroundWorldX = _0x5bf36e);
            let _0x1ff1b3 = _0x2d1a71._worldX - _0x3d0974;
            _0x2d1a71.x = _0x1ff1b3, _0x2d1a71.y = _0x12b0b9, _0x20a50b.x = _0x1ff1b3, _0x20a50b.y = _0x3453a2, _0x20a50b.setVisible(this._flyGroundActive && this._groundTargetValue > 0);
        }
        this._groundLine.y = _0x12b0b9, this._flyGroundActive && this._groundTargetValue > 0 ? (this._ceilingLine.y = _0x3453a2, this._ceilingLine.setVisible(true)) : this._ceilingLine.setVisible(false), this._groundShadowL.y = _0x12b0b9, this._groundShadowR.y = _0x12b0b9;
        let _0x539bc2 = this._flyGroundActive && this._groundTargetValue > 0;
        this._ceilingShadowL.y = _0x3453a2, this._ceilingShadowR.y = _0x3453a2, this._ceilingShadowL.setVisible(_0x539bc2), this._ceilingShadowR.setVisible(_0x539bc2);
    }
    shiftGroundTiles(_0x47a8b8) {
        for (let _0x33fd12 = 0; _0x33fd12 < this._groundTiles.length; _0x33fd12++) this._groundTiles[_0x33fd12]._worldX += _0x47a8b8, this._ceilingTiles[_0x33fd12]._worldX += _0x47a8b8;
        this._maxGroundWorldX += _0x47a8b8;
    }
    resetGroundTiles(_0x460241) {
        const _0x4e210f = this._tileW;
        for (let _0x33c028 = 0; _0x33c028 < this._groundTiles.length; _0x33c028++) this._groundTiles[_0x33c028]._worldX = _0x460241 + _0x33c028 * _0x4e210f, this._ceilingTiles[_0x33c028]._worldX = _0x460241 + _0x33c028 * _0x4e210f;
        this._maxGroundWorldX = _0x460241 + (this._groundTiles.length - 1) * _0x4e210f, this.resetGroundState();
    }
    resetGroundState() {
        this._flyGroundActive = false, this._groundTargetValue = 0, this._groundAnimating = false, this._groundY = 0, this._ceilingY = null, this.flyCameraTarget = null;
    }
    _computeFlyBounds(_0x804885) {
        let _0x4dd75a = _0x804885 - 300;
        return _0x4dd75a = Math.floor(_0x4dd75a / a) * a, _0x4dd75a = Math.max(0, _0x4dd75a), {
            'floorY': _0x4dd75a,
            'ceilingY': _0x4dd75a + FLY_CEILING
        };
    }
    setFlyMode(_0x4a6d9a, _0x3a58e7) {
        if (_0x4a6d9a) {
            let _0x5b3ec5 = this._computeFlyBounds(_0x3a58e7);
            this._flyFloorY = _0x5b3ec5.floorY, this._flyCeilingY = _0x5b3ec5.ceilingY, this._flyGroundActive = true;
            let _0x15ff58 = this._flyFloorY + 300;
            this.flyCameraTarget = _0x15ff58 - 320 + o, this.flyCameraTarget < 0 && (this.flyCameraTarget = 0);
            let _0x3be4f1 = this._scene && this._scene._cameraY || 0;
            this._groundStartScreenY = worldYToScreenY(0) + _0x3be4f1, this._ceilingStartScreenY = 0, this._groundAnimFrom = this._groundTargetValue, this._groundAnimTo = 1, this._groundAnimTime = 0, this._groundAnimDuration = 0.5, this._groundAnimating = true;
        } else this.flyCameraTarget = null, this._groundAnimFrom = this._groundTargetValue, this._groundAnimTo = 0, this._groundAnimTime = 0, this._groundAnimDuration = 0.5, this._groundAnimating = true;
    }
    stepGroundAnimation(_0x4a003d) {
        if (!this._groundAnimating) return;
        this._groundAnimTime += _0x4a003d;
        let _0x4c9adc = this._groundAnimDuration > 0 ? Math.min(this._groundAnimTime / this._groundAnimDuration, 1) : 1;
        this._groundTargetValue = this._groundAnimFrom + (this._groundAnimTo - this._groundAnimFrom) * _0x4c9adc, _0x4c9adc >= 1 && (this._groundAnimating = false, this._groundTargetValue = this._groundAnimTo, 0 === this._groundAnimTo && (this._flyGroundActive = false));
    }
    getFloorY() {
        return this._flyGroundActive ? this._flyFloorY : 0;
    }
    getCeilingY() {
        return this._flyGroundActive ? this._flyCeilingY : null;
    }
    _applyVisualProps(_0x4feeca, _0x2d433c, _0x590e4f, _0x5eb2df, _0x450956 = null) {
        if (!_0x2d433c) return;
        let {
            dx: _0x4aea8a,
            dy: _0x545b71
        } = function(_0x221968, _0xce6477) {
            let _0x3a4f77 = findAtlasFrame(_0x221968, _0xce6477);
            if (!_0x3a4f77) return {
                'dx': 0,
                'dy': 0
            };
            let _0x225d39 = _0x221968.textures.get(_0x3a4f77.atlas).get(_0x3a4f77.frame);
            if (!_0x225d39) return {
                'dx': 0,
                'dy': 0
            };
            let _0x30be73 = _0x225d39.customData || {};
            if (_0x30be73.gjSpriteOffset) return {
                'dx': _0x30be73.gjSpriteOffset.x || 0,
                'dy': -(_0x30be73.gjSpriteOffset.y || 0)
            };
            let _0x535a10 = _0x225d39.realWidth,
                _0x796c4 = _0x225d39.realHeight,
                _0x62367d = _0x225d39.width,
                _0x244756 = _0x225d39.height,
                _0x58bd9c = 0,
                _0xedc3c7 = 0;
            return _0x30be73.spriteSourceSize && (_0x58bd9c = _0x30be73.spriteSourceSize.x || 0, _0xedc3c7 = _0x30be73.spriteSourceSize.y || 0), {
                'dx': _0x535a10 / 2 - (_0x58bd9c + _0x62367d / 2),
                'dy': _0x796c4 / 2 - (_0xedc3c7 + _0x244756 / 2)
            };
        }(_0x4feeca, _0x590e4f);
        _0x5eb2df.flipX && _0x2d433c.setFlipX(true), _0x5eb2df.flipY && _0x2d433c.setFlipY(true);
        let _0x249260 = (_0x2d433c.getData("gjBaseRotationDeg") || 0) + _0x5eb2df.rot;
        0 !== _0x249260 && _0x2d433c.setAngle(_0x249260), 1 !== _0x5eb2df.scale && _0x2d433c.setScale(_0x5eb2df.scale), _0x450956 && (undefined !== _0x450956.tint ? _0x2d433c.setTint(_0x450956.tint) : _0x450956.black && _0x2d433c.setTint(0));
    }
    _addVisualSprite(_0x2edd38, _0x55b8b6 = null) {
        _0x2edd38 && (_0x55b8b6 && "additive" === _0x55b8b6.blend ? (_0x2edd38.setBlendMode(BLEND_ADD), _0x2edd38._eeLayer = 0) : _0x55b8b6 && _0x55b8b6._portalFront ? _0x2edd38._eeLayer = 2 : _0x55b8b6 && undefined !== _0x55b8b6.z && _0x55b8b6.z < 0 ? _0x2edd38._eeLayer = 0 : _0x2edd38._eeLayer = 1);
    }
    _getGlowFrameName(_0x40f97f) {
        return _0x40f97f && _0x40f97f.endsWith("_001.png") ? _0x40f97f.replace('_001.png', '_glow_001.png') : null;
    }
    _addGlowSprite(_0x2fb4ca, _0xad3348, _0x5d6f6f, _0x3d09ed, _0x330e58, _0x3f8eef) {
        let _0xa6570d = this._getGlowFrameName(_0x3d09ed);
        if (!_0xa6570d) return;
        if (!findAtlasFrame(_0x2fb4ca, _0xa6570d) && !_0x2fb4ca.textures.exists(_0xa6570d)) return;
        let _0x3a5f29 = createImageFromAtlas(_0x2fb4ca, _0xad3348, _0x5d6f6f, _0xa6570d);
        _0x3a5f29 && (this._applyVisualProps(_0x2fb4ca, _0x3a5f29, _0xa6570d, _0x330e58), _0x3a5f29.setBlendMode(BLEND_ADD), _0x3a5f29._eeLayer = 0, undefined !== _0x3f8eef && (_0x3a5f29._eeWorldX = _0x3f8eef, _0x3a5f29._eeBaseY = _0x5d6f6f, this._addToSection(_0x3a5f29)));
    }
    _spawnLevelObjects(_0x35f1ae) {
        const _0xd15974 = this._scene;
        let _0x443c50 = new Set();
        this._lastObjectX = 0;
        for (let _0x1b937f of _0x35f1ae) {
            let _0x24471f = getObjectDefinition(_0x1b937f.id);
            if (_0x24471f && _0x24471f.type === OBJECT_TYPE_2_TRIGGER) {
                29 !== _0x1b937f.id && 30 !== _0x1b937f.id || this._colorTriggers.push({
                    'x': 2 * _0x1b937f.x,
                    'index': 29 === _0x1b937f.id ? 1000 : 1001,
                    'color': {
                        'r': parseInt(_0x1b937f._raw[7] ?? 255, 10),
                        'g': parseInt(_0x1b937f._raw[8] ?? 255, 10),
                        'b': parseInt(_0x1b937f._raw[9] ?? 255, 10)
                    },
                    duration: parseFloat(_0x1b937f._raw[10] ?? 0),
                    'tintGround': '1' === _0x1b937f._raw[14]
                }), _0x24471f.enterEffect && this._enterEffectTriggers.push({
                    'x': 2 * _0x1b937f.x,
                    'effect': _0x24471f.enterEffect
                });
                continue;
            }
            let _0x173c58 = 2 * _0x1b937f.x,
                _0x7ab528 = 2 * _0x1b937f.y;
            _0x173c58 > this._lastObjectX && (this._lastObjectX = _0x173c58);
            let _0x4c7589 = _0x24471f ? _0x24471f.frame : null;
            if (_0x24471f && _0x24471f.randomFrames && (_0x4c7589 = _0x24471f.randomFrames[Math.floor(Math.random() * _0x24471f.randomFrames.length)]), _0x4c7589) {
                let _0x2ddc05 = _0x173c58,
                    _0x1b10a0 = worldYToScreenY(_0x7ab528);
                const _0x501fde = (_0x24471f.type === OBJECT_TYPE_2_PORTAL || _0x24471f.type === OBJECT_TYPE_2_SPEED) && _0x4c7589.includes("_front_");
                if (_0x501fde) {
                    const _0x32e8a1 = _0x4c7589.replace('_front_', "_back_");
                    let _0x517b49 = createImageFromAtlas(_0xd15974, _0x2ddc05, _0x1b10a0, _0x32e8a1);
                    _0x517b49 && (this._applyVisualProps(_0xd15974, _0x517b49, _0x32e8a1, _0x1b937f), _0x517b49._eeLayer = 1, _0x517b49._eeWorldX = _0x173c58, _0x517b49._eeBaseY = _0x1b10a0, this._addToSection(_0x517b49));
                }
                _0x24471f.glow && this._addGlowSprite(_0xd15974, _0x2ddc05, _0x1b10a0, _0x4c7589, _0x1b937f, _0x173c58);
                const _0x36f679 = _0x501fde ? {
                    ..._0x24471f,
                    '_portalFront': true
                } : _0x24471f;
                let _0x554e0e = createImageFromAtlas(_0xd15974, _0x2ddc05, _0x1b10a0, _0x4c7589);
                if (_0x554e0e && (this._applyVisualProps(_0xd15974, _0x554e0e, _0x4c7589, _0x1b937f, _0x24471f), this._addVisualSprite(_0x554e0e, _0x36f679), _0x554e0e._eeWorldX = _0x173c58, _0x554e0e._eeBaseY = _0x1b10a0, this._addToSection(_0x554e0e)), _0x24471f && (_0x24471f.type === OBJECT_TYPE_2_SOLID || _0x24471f.type === OBJECT_TYPE_2_HAZARD)) {
                    let _0x47077e = _0x4c7589.replace("_001.png", "_2_001.png"),
                        _0xe3eaec = findAtlasFrame(_0xd15974, _0x47077e) ? createImageFromAtlas(_0xd15974, _0x2ddc05, _0x1b10a0, _0x47077e) : null;
                    _0xe3eaec && (this._applyVisualProps(_0xd15974, _0xe3eaec, _0x47077e, _0x1b937f), this._addVisualSprite(_0xe3eaec), _0xe3eaec._eeWorldX = _0x173c58, _0xe3eaec._eeBaseY = _0x1b10a0, this._addToSection(_0xe3eaec));
                }
                if (_0x24471f.children)
                    for (let _0x2ca803 of _0x24471f.children) {
                        let _0x3b4e8c = _0x2ca803.dx || 0,
                            _0x172131 = _0x2ca803.dy || 0;
                        if (undefined !== _0x2ca803.localDx || undefined !== _0x2ca803.localDy) {
                            let _0x38902b = _0x2ca803.localDx || 0,
                                _0x256a8e = _0x2ca803.localDy || 0;
                            _0x1b937f.flipX && (_0x38902b = -_0x38902b), _0x1b937f.flipY && (_0x256a8e = -_0x256a8e);
                            let _0x3e62f2 = (_0x1b937f.rot || 0) * Math.PI / 180;
                            _0x3b4e8c = _0x38902b * Math.cos(_0x3e62f2) - _0x256a8e * Math.sin(_0x3e62f2), _0x172131 = _0x38902b * Math.sin(_0x3e62f2) + _0x256a8e * Math.cos(_0x3e62f2);
                        }
                        let _0x42173e = createImageFromAtlas(_0xd15974, _0x2ddc05 + _0x3b4e8c, _0x1b10a0 + _0x172131, _0x2ca803.frame);
                        _0x42173e && (this._applyVisualProps(_0xd15974, _0x42173e, _0x2ca803.frame, _0x1b937f, _0x2ca803), _0x2ca803.audioScale && (_0x42173e.setScale(0.1), _0x42173e.setAlpha(0.9), _0x42173e._eeAudioScale = true, this._audioScaleSprites.push(_0x42173e)), (undefined !== _0x2ca803.z ? _0x2ca803.z : -1) < 0 ? (_0x42173e._eeLayer = 1, _0x42173e._eeBehindParent = true) : this._addVisualSprite(_0x42173e, _0x2ca803), _0x42173e._eeWorldX = _0x173c58 + _0x3b4e8c, _0x42173e._eeBaseY = _0x1b10a0 + _0x172131, this._addToSection(_0x42173e));
                    }
            } else _0x24471f || _0x443c50.add(_0x1b937f.id);
            if (_0x24471f && _0x24471f.portalParticle && _0x4c7589) {
                let _0x3a9438 = _0x173c58,
                    _0x2e9079 = worldYToScreenY(_0x7ab528);
                const _0x143187 = 2;
                let _0x5926ad = _0x3a9438 - 5 * _0x143187,
                    _0x1ebc69 = _0x2e9079;
                const _0x388526 = {
                        'getRandomPoint': _0x4ad804 => {
                            let _0x5b7fb4 = (190 * Math.random() + 85) * Math.PI / 180,
                                _0x2bc56f = 20 * _0x143187 + 40 * Math.random() * _0x143187;
                            return _0x4ad804.x = Math.cos(_0x5b7fb4) * _0x2bc56f, _0x4ad804.y = Math.sin(_0x5b7fb4) * _0x2bc56f, _0x4ad804;
                        }
                    },
                    _0x100649 = 20;
                let _0x1bed6b = _0xd15974.add.particles(_0x5926ad, _0x1ebc69, "GJ_WebSheet", {
                    'frame': "square.png",
                    'lifespan': {
                        'min': 200,
                        'max': 1000
                    },
                    'speed': 0,
                    'scale': {
                        'start': 0.75,
                        'end': 0.125
                    },
                    'alpha': {
                        'start': 0.5,
                        'end': 0
                    },
                    'tint': _0x24471f.portalParticleColor,
                    'blendMode': Phaser.BlendModes.ADD,
                    'frequency': 20,
                    'maxParticles': 0,
                    'emitting': true,
                    'emitZone': {
                        'type': "random",
                        'source': _0x388526
                    },
                    'emitCallback': _0x157c59 => {
                        let _0x30a90b = -_0x157c59.x,
                            _0x3e98bf = -_0x157c59.y,
                            _0x42124a = Math.sqrt(_0x30a90b * _0x30a90b + _0x3e98bf * _0x3e98bf) || 1,
                            _0x1d5ab8 = _0x157c59.life / 1000,
                            _0x1e162a = (_0x42124a - _0x100649) / (_0x1d5ab8 || 0.3);
                        _0x157c59.velocityX = _0x30a90b / _0x42124a * _0x1e162a, _0x157c59.velocityY = _0x3e98bf / _0x42124a * _0x1e162a;
                    }
                });
                _0x1bed6b.setDepth(14), _0x1bed6b._eeLayer = 2, _0x1bed6b._eeWorldX = _0x173c58, _0x1bed6b._eeBaseY = _0x1ebc69, this._addToSection(_0x1bed6b);
            }
            if (_0x24471f) {
                if (_0x24471f.type === OBJECT_TYPE_2_SOLID && _0x24471f.gridW > 0 && _0x24471f.gridH > 0) {
                    let _0x10e5ae = _0x24471f.gridW * a,
                        _0x11e08d = _0x24471f.gridH * a,
                        _0x4628ff = new GameObject(OBJECT_TYPE_SOLID, _0x173c58, _0x7ab528, _0x10e5ae, _0x11e08d);
                    this.objects.push(_0x4628ff), this._addCollisionToSection(_0x4628ff);
                } else {
                    if (_0x24471f.type === OBJECT_TYPE_2_HAZARD) {
                        let _0x3f8c4f = 0,
                            _0x2a123d = 0;
                        if (_0x24471f.spriteW > 0 && _0x24471f.spriteH > 0 && undefined !== _0x24471f.hitboxScaleX && undefined !== _0x24471f.hitboxScaleY ? (_0x3f8c4f = _0x24471f.spriteW * _0x24471f.hitboxScaleX * 2, _0x2a123d = _0x24471f.spriteH * _0x24471f.hitboxScaleY * 2) : _0x24471f.gridW > 0 && _0x24471f.gridH > 0 && (_0x3f8c4f = 12 * _0x24471f.gridW, _0x2a123d = 24 * _0x24471f.gridH), _0x3f8c4f > 0 && _0x2a123d > 0) {
                            let _0x3c84ad = new GameObject(OBJECT_TYPE_HAZARD, _0x173c58, _0x7ab528, _0x3f8c4f, _0x2a123d);
                            this.objects.push(_0x3c84ad), this._addCollisionToSection(_0x3c84ad);
                        }
                    } else {
                        if (_0x24471f.type === OBJECT_TYPE_2_PORTAL) {
                            let _0xad0974 = 90,
                                _0x2c2226 = _0x24471f.gridH * a,
                                _0x25452a = null;
                            if ("fly" === _0x24471f.sub ? _0x25452a = OBJECT_TYPE_PORTAL_SHIP : 'cube' === _0x24471f.sub && (_0x25452a = OBJECT_TYPE_PORTAL_CUBE), _0x25452a) {
                                let _0x4bd7bc = new GameObject(_0x25452a, _0x173c58, _0x7ab528, _0xad0974, _0x2c2226);
                                _0x4bd7bc.portalY = _0x7ab528, this.objects.push(_0x4bd7bc), this._addCollisionToSection(_0x4bd7bc);
                            }
                        }
                    }
                }
            }
        }
        _0x443c50.size, this._colorTriggers.sort((_0x359c7f, _0x28dd8b) => _0x359c7f.x - _0x28dd8b.x), this._enterEffectTriggers.sort((_0x3e43f2, _0x5e3d9a) => _0x3e43f2.x - _0x5e3d9a.x), this.endXPos = Math.max(SCREEN_WIDTH + 1200, this._lastObjectX + 680);
    }
    createEndPortal(_0x41fbdb) {
        var _0x400605;
        if (this.endXPos <= 0) return;
        const _0x3b56d4 = this.endXPos,
            _0x1c3aea = worldYToScreenY(240),
            _0x46064b = Math.round(16);
        this._endPortalContainer = _0x41fbdb.add.container(_0x3b56d4, _0x1c3aea);
        for (let _0x2a327c = 0; _0x2a327c < _0x46064b; _0x2a327c++) {
            const _0xacf7ef = _0x41fbdb.add.image(0, (_0x2a327c - Math.floor(_0x46064b / 2)) * a, "GJ_WebSheet", "square_02_001.png").setAngle(-90);
            this._endPortalContainer.add(_0xacf7ef);
        }
        this.container.add(this._endPortalContainer), this._endPortalShine = _0x41fbdb.add.image(_0x3b56d4 - 58, _0x1c3aea, 'GJ_WebSheet', 'gradientBar.png');
        const _0x3e25a9 = (null == (_0x400605 = _0x41fbdb.textures.getFrame("GJ_WebSheet", "gradientBar.png")) ? undefined : _0x400605.height) || 64;
        this._endPortalShine.setBlendMode(BLEND_ADD), this._endPortalShine.setTint(COLOR_GREEN), this._endPortalShine.setScale(1, 960 / _0x3e25a9), this.additiveContainer.add(this._endPortalShine);
        const _0x58cedb = _0x3b56d4 - 30,
            _0x4f52b7 = {
                'getRandomPoint': _0x4f04dd => {
                    const _0x53ec71 = (85 + 190 * Math.random()) * Math.PI / 180,
                        _0x42e60c = 320 + 80 * (2 * Math.random() - 1);
                    return _0x4f04dd.x = Math.cos(_0x53ec71) * _0x42e60c, _0x4f04dd.y = Math.sin(_0x53ec71) * _0x42e60c, _0x4f04dd;
                }
            };
        this._endPortalEmitter = _0x41fbdb.add.particles(_0x58cedb, _0x1c3aea, "GJ_WebSheet", {
            'frame': "square.png",
            'lifespan': {
                'min': 200,
                'max': 1000
            },
            'speed': 0,
            'scale': {
                'start': 0.75,
                'end': 0.125
            },
            'alpha': {
                'start': 1,
                'end': 0
            },
            'tint': COLOR_GREEN,
            'blendMode': Phaser.BlendModes.ADD,
            'frequency': 10,
            'maxParticles': 100,
            'emitting': true,
            'emitZone': {
                'type': "random",
                'source': _0x4f52b7
            },
            'emitCallback': _0x2daff4 => {
                const _0x5e30d8 = -_0x2daff4.x,
                    _0x17ba71 = -_0x2daff4.y,
                    _0x3c5c52 = Math.sqrt(_0x5e30d8 * _0x5e30d8 + _0x17ba71 * _0x17ba71) || 1,
                    _0x279521 = (_0x3c5c52 - 20) / (_0x2daff4.life / 1000 || 0.3);
                _0x2daff4.velocityX = _0x5e30d8 / _0x3c5c52 * _0x279521, _0x2daff4.velocityY = _0x17ba71 / _0x3c5c52 * _0x279521;
            }
        }), this._endPortalEmitter.setDepth(14), this.topContainer.add(this._endPortalEmitter), this._endPortalGameY = 240;
    }
    updateEndPortalY(_0x26f0ab, _0x43c4d1) {
        if (!this._endPortalContainer) return;
        const _0x50aa7d = 140 + _0x26f0ab;
        let _0x1be4c3;
        _0x1be4c3 = _0x43c4d1 ? _0x50aa7d : Math.max(240, _0x50aa7d);
        const _0x32e645 = worldYToScreenY(_0x1be4c3);
        this._endPortalContainer.y = _0x32e645, this._endPortalShine.y = _0x32e645, this._endPortalEmitter.y = _0x32e645, this._endPortalGameY = _0x1be4c3;
    }
    checkColorTriggers(_0x2b00ce) {
        let _0x24b030 = [];
        for (; this._colorTriggerIdx < this._colorTriggers.length;) {
            let _0x39c924 = this._colorTriggers[this._colorTriggerIdx];
            if (!(_0x39c924.x <= _0x2b00ce)) break;
            _0x24b030.push(_0x39c924), this._colorTriggerIdx++;
        }
        return _0x24b030;
    }
    resetColorTriggers() {
        this._colorTriggerIdx = 0;
    }
    _addToSection(_0x4413d3) {
        const _0x4ac40a = Math.max(0, Math.floor(_0x4413d3._eeWorldX / 400));
        this._sections[_0x4ac40a] || (this._sections[_0x4ac40a] = []), this._sections[_0x4ac40a].push(_0x4413d3);
        const _0x14d5f7 = undefined !== _0x4413d3._eeLayer ? _0x4413d3._eeLayer : 1;
        if (2 === _0x14d5f7) return void this.topContainer.add(_0x4413d3);
        if (!this._sectionContainers[_0x4ac40a]) {
            const _0xc1a93d = {
                'additive': this._scene.add.container(0, 0),
                'normal': this._scene.add.container(0, 0)
            };
            this.additiveContainer.add(_0xc1a93d.additive), this.container.add(_0xc1a93d.normal), this._sectionContainers[_0x4ac40a] = _0xc1a93d;
        }
        const _0x2157d3 = this._sectionContainers[_0x4ac40a];
        0 === _0x14d5f7 ? _0x2157d3.additive.add(_0x4413d3) : _0x4413d3._eeBehindParent ? _0x2157d3.normal.addAt(_0x4413d3, 0) : _0x2157d3.normal.add(_0x4413d3);
    }
    _addCollisionToSection(_0x3dce4b) {
        const _0x5cad3c = Math.max(0, Math.floor(_0x3dce4b.x / 400));
        this._collisionSections[_0x5cad3c] || (this._collisionSections[_0x5cad3c] = []), this._collisionSections[_0x5cad3c].push(_0x3dce4b);
    }
    _setSectionVisible(_0x2b0fa1, _0x488507) {
        const _0x141e9c = this._sectionContainers[_0x2b0fa1];
        _0x141e9c && (_0x141e9c.additive.visible = _0x488507, _0x141e9c.normal.visible = _0x488507);
    }
    updateVisibility(_0xa5f1e1) {
        const _0x1dce22 = this._sectionContainers.length - 1;
        if (_0x1dce22 < 0) return;
        const _0x5b29dd = Math.max(0, Math.floor((_0xa5f1e1 - 140) / 400)),
            _0x3b33db = Math.min(_0x1dce22, Math.floor((_0xa5f1e1 + SCREEN_WIDTH + 140) / 400)),
            _0x1800fc = this._visMinSec,
            _0xc31046 = this._visMaxSec;
        if (_0x1800fc < 0) {
            for (let _0x47dbe1 = 0; _0x47dbe1 <= _0x1dce22; _0x47dbe1++) this._setSectionVisible(_0x47dbe1, _0x47dbe1 >= _0x5b29dd && _0x47dbe1 <= _0x3b33db);
            return this._visMinSec = _0x5b29dd, void(this._visMaxSec = _0x3b33db);
        }
        if (_0x5b29dd !== _0x1800fc || _0x3b33db !== _0xc31046) {
            if (_0x5b29dd > _0x1800fc) {
                for (let _0x7da5df = _0x1800fc; _0x7da5df <= Math.min(_0x5b29dd - 1, _0xc31046); _0x7da5df++) this._setSectionVisible(_0x7da5df, false);
            }
            if (_0x3b33db < _0xc31046) {
                for (let _0x5b2d47 = Math.max(_0x3b33db + 1, _0x1800fc); _0x5b2d47 <= _0xc31046; _0x5b2d47++) this._setSectionVisible(_0x5b2d47, false);
            }
            if (_0x5b29dd < _0x1800fc) {
                for (let _0x3caab6 = _0x5b29dd; _0x3caab6 <= Math.min(_0x1800fc - 1, _0x3b33db); _0x3caab6++) this._setSectionVisible(_0x3caab6, true);
            }
            if (_0x3b33db > _0xc31046) {
                for (let _0x347412 = Math.max(_0xc31046 + 1, _0x5b29dd); _0x347412 <= _0x3b33db; _0x347412++) this._setSectionVisible(_0x347412, true);
            }
            this._visMinSec = _0x5b29dd, this._visMaxSec = _0x3b33db;
        }
    }
    getNearbySectionObjects(_0x2e85c7) {
        const _0x55d1b7 = Math.max(0, Math.floor(_0x2e85c7 / 400)),
            _0x31c345 = Math.max(0, _0x55d1b7 - 1),
            _0x5f1907 = Math.min(this._collisionSections.length - 1, _0x55d1b7 + 1),
            _0x28a7c0 = this._nearbyBuffer;
        _0x28a7c0.length = 0;
        for (let _0xe2cbfa = _0x31c345; _0xe2cbfa <= _0x5f1907; _0xe2cbfa++) {
            const _0x2171db = this._collisionSections[_0xe2cbfa];
            if (_0x2171db) {
                for (let _0x5cdca9 = 0; _0x5cdca9 < _0x2171db.length; _0x5cdca9++) _0x28a7c0.push(_0x2171db[_0x5cdca9]);
            }
        }
        return _0x28a7c0;
    }
    checkEnterEffectTriggers(_0x5d0838) {
        for (; this._enterEffectTriggerIdx < this._enterEffectTriggers.length;) {
            let _0x937c72 = this._enterEffectTriggers[this._enterEffectTriggerIdx];
            if (!(_0x937c72.x <= _0x5d0838)) break;
            this._activeEnterEffect = _0x937c72.effect, this._activeExitEffect = _0x937c72.effect, this._enterEffectTriggerIdx++;
        }
    }
    resetEnterEffectTriggers() {
        this._enterEffectTriggerIdx = 0, this._activeEnterEffect = 0, this._activeExitEffect = 0;
        for (let _0x17a21d = 0; _0x17a21d < this._sections.length; _0x17a21d++) {
            this._setSectionVisible(_0x17a21d, true);
            const _0x14a035 = this._sections[_0x17a21d];
            if (_0x14a035)
                for (let _0x13e116 = 0; _0x13e116 < _0x14a035.length; _0x13e116++) {
                    const _0x1e8f9f = _0x14a035[_0x13e116];
                    _0x1e8f9f._eeActive = false, _0x1e8f9f.visible = true, _0x1e8f9f.x = _0x1e8f9f._eeWorldX, _0x1e8f9f.y = _0x1e8f9f._eeBaseY, _0x1e8f9f._eeAudioScale || _0x1e8f9f.setScale(1), _0x1e8f9f.setAlpha(1);
                }
        }
    }
    applyEnterEffects(_0x2f36ed) {
        const _0x221c93 = 400,
            _0xa24372 = 140,
            _0x5e9f2a = 200,
            _0x29a51b = _0x2f36ed,
            _0x548004 = _0x2f36ed + SCREEN_WIDTH,
            _0x49c6d8 = _0x2f36ed + SCREEN_WIDTH / 2,
            _0x2d8f53 = Math.max(0, Math.floor((_0x29a51b - _0xa24372) / _0x221c93)),
            _0x2b19db = Math.min(this._sections.length - 1, Math.floor((_0x548004 + _0xa24372) / _0x221c93));
        for (let _0x1bd44f = _0x2d8f53; _0x1bd44f <= _0x2b19db; _0x1bd44f++) {
            const _0x2cff29 = this._sections[_0x1bd44f];
            if (!_0x2cff29) continue;
            const _0x20a3bb = _0x1bd44f * _0x221c93,
                _0x8f9d56 = _0x20a3bb >= _0x29a51b + _0xa24372 && _0x20a3bb + _0x221c93 <= _0x548004 - _0xa24372;
            for (let _0x54aba7 = 0; _0x54aba7 < _0x2cff29.length; _0x54aba7++) {
                const _0x2ae6ed = _0x2cff29[_0x54aba7];
                if (_0x8f9d56) {
                    _0x2ae6ed._eeActive && (_0x2ae6ed._eeActive = false, _0x2ae6ed.y = _0x2ae6ed._eeBaseY, _0x2ae6ed.x = _0x2ae6ed._eeWorldX, _0x2ae6ed._eeAudioScale || _0x2ae6ed.setScale(1), _0x2ae6ed.setAlpha(1));
                    continue;
                }
                const _0xeded99 = _0x2ae6ed._eeWorldX,
                    _0x1b2883 = _0xeded99 > _0x49c6d8;
                let _0x289aa2;
                if (_0x289aa2 = _0x1b2883 ? Math.max(0, Math.min(1, (_0x548004 - _0xeded99) / _0xa24372)) : Math.max(0, Math.min(1, (_0xeded99 - _0x29a51b) / _0xa24372)), _0x289aa2 >= 1) {
                    _0x2ae6ed._eeActive && (_0x2ae6ed._eeActive = false, _0x2ae6ed.y = _0x2ae6ed._eeBaseY, _0x2ae6ed.x = _0x2ae6ed._eeWorldX, _0x2ae6ed._eeAudioScale || _0x2ae6ed.setScale(1), _0x2ae6ed.setAlpha(1));
                    continue;
                }
                _0x2ae6ed._eeActive = true;
                const _0x453353 = _0x1b2883 ? this._activeEnterEffect : this._activeExitEffect,
                    _0x20804e = 1 - _0x289aa2;
                let _0x50e6d9 = _0x2ae6ed._eeBaseY,
                    _0x17437c = _0x2ae6ed._eeWorldX,
                    _0x2128bf = _0x289aa2,
                    _0x127ace = 1;
                switch (_0x453353) {
                    case 0:
                        break;
                    case 1:
                        _0x50e6d9 = _0x2ae6ed._eeBaseY + _0x5e9f2a * _0x20804e;
                        break;
                    case 2:
                        _0x50e6d9 = _0x2ae6ed._eeBaseY - _0x5e9f2a * _0x20804e;
                        break;
                    case 3:
                        _0x17437c = _0x2ae6ed._eeWorldX - _0x5e9f2a * _0x20804e;
                        break;
                    case 4:
                        _0x17437c = _0x2ae6ed._eeWorldX + _0x5e9f2a * _0x20804e;
                        break;
                    case 5:
                        _0x2ae6ed._eeAudioScale || (_0x127ace = _0x289aa2);
                        break;
                    case 6:
                        _0x2ae6ed._eeAudioScale || (_0x127ace = 1 + 0.75 * _0x20804e);
                }
                _0x2ae6ed.x !== _0x17437c && (_0x2ae6ed.x = _0x17437c), _0x2ae6ed.y !== _0x50e6d9 && (_0x2ae6ed.y = _0x50e6d9), _0x2ae6ed.alpha !== _0x2128bf && (_0x2ae6ed.alpha = _0x2128bf), _0x2ae6ed._eeAudioScale || _0x2ae6ed.scaleX === _0x127ace || _0x2ae6ed.setScale(_0x127ace);
            }
        }
    }
    setGroundColor(_0x3958eb) {
        for (let _0x46c21a of this._groundTiles) _0x46c21a.setTint(_0x3958eb);
        for (let _0x251562 of this._ceilingTiles) _0x251562.setTint(_0x3958eb);
    }
    updateAudioScale(_0x337bf7) {
        for (let _0x24afdb of this._audioScaleSprites) _0x24afdb.setScale(_0x337bf7);
    }
    resetVisibility() {
        this._visMinSec = -1, this._visMaxSec = -1;
    }
    resetObjects() {
        for (let _0x3d473e of this.objects) _0x3d473e.activated = false;
        for (let _0x5c5d9a of this._audioScaleSprites) _0x5c5d9a.setScale(0.1);
    }
}
export { us };
