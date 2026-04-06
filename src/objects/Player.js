import { h, d, p, g, v, m, y, x, _, w, b, S } from '../constants.js';
import { R } from '../systems/GameState.js';
import { cs, ds } from './PlayerVisuals.js';

class ps {
    constructor(_0x5b73d2, _0x3f50cc, _0x2811e1) {
        this._scene = _0x5b73d2, this.p = _0x3f50cc, this._gameLayer = _0x2811e1, this._rotation = 0, this.rotateActionActive = false, this.rotateActionTime = 0, this.rotateActionDuration = 0, this.rotateActionStart = 0, this.rotateActionTotal = 0, this._showHitboxes = false, this._lastLandObject = null, this._lastXOffset = 0, this._lastCameraX = 0, this._lastCameraY = 0, this._createSprites(), this._initParticles(_0x5b73d2), _0x5b73d2.events.on("shutdown", () => this._cleanupExplosion());
    }
    _createSprites() {
        const _0x1872a7 = this._scene,
            _0x28689a = b(this.p.y),
            _0xf42f36 = h;
        if (this._playerGlowLayer = ds(_0x1872a7, _0xf42f36, _0x28689a, "player_01_glow_001.png", 9, false), this._playerSpriteLayer = ds(_0x1872a7, _0xf42f36, _0x28689a, 'player_01_001.png', 10, true), this._playerOverlayLayer = ds(_0x1872a7, _0xf42f36, _0x28689a, "player_01_2_001.png", 8, true), this._playerExtraLayer = ds(_0x1872a7, _0xf42f36, _0x28689a, "player_01_extra_001.png", 12, true), this._playerGlowLayer && (this._playerGlowLayer.sprite.setTint(m), this._playerGlowLayer.sprite._glowEnabled = false), this._playerSpriteLayer) this._playerSpriteLayer.sprite.setTint(v);
        else {
            let _0x3aecd9 = _0x1872a7.add.rectangle(_0xf42f36, _0x28689a, g, g, v);
            _0x3aecd9.setDepth(10), this._playerSpriteLayer = {
                'sprite': _0x3aecd9
            };
        }
        if (this._playerOverlayLayer && this._playerOverlayLayer.sprite.setTint(m), this._shipGlowLayer = ds(_0x1872a7, _0xf42f36, _0x28689a, "ship_01_glow_001.png", 9, false), this._shipSpriteLayer = ds(_0x1872a7, _0xf42f36, _0x28689a, "ship_01_001.png", 10, false), this._shipOverlayLayer = ds(_0x1872a7, _0xf42f36, _0x28689a, 'ship_01_2_001.png', 8, false), this._shipExtraLayer = ds(_0x1872a7, _0xf42f36, _0x28689a, "ship_01_extra_001.png", 12, false), this._shipGlowLayer && (this._shipGlowLayer.sprite.setTint(m), this._shipGlowLayer.sprite._glowEnabled = false), this._shipSpriteLayer) this._shipSpriteLayer.sprite.setTint(v);
        else {
            let _0x100643 = _0x1872a7.add.polygon(_0xf42f36, _0x28689a, [{
                'x': -72,
                'y': 40
            }, {
                'x': 72,
                'y': 0
            }, {
                'x': -72,
                'y': -40
            }, {
                'x': -40,
                'y': 0
            }], v);
            _0x100643.setDepth(10).setVisible(false), this._shipSpriteLayer = {
                'sprite': _0x100643
            };
        }
        this._shipOverlayLayer && this._shipOverlayLayer.sprite.setTint(m), this.playerSprite = this._playerSpriteLayer.sprite, this.shipSprite = this._shipSpriteLayer.sprite, this._playerLayers = [this._playerSpriteLayer, this._playerGlowLayer, this._playerOverlayLayer, this._playerExtraLayer], this._shipLayers = [this._shipSpriteLayer, this._shipGlowLayer, this._shipOverlayLayer, this._shipExtraLayer], this._allLayers = [...this._playerLayers, ...this._shipLayers];
    }
    _initParticles(_0x538533) {
        this._particleEmitter = _0x538533.add.particles(0, 0, "GJ_WebSheet", {
            'frame': "square.png",
            'speed': {
                'min': 110,
                'max': 190
            },
            'angle': {
                'min': 225,
                'max': 315
            },
            'lifespan': {
                'min': 150,
                'max': 450
            },
            'scale': {
                'start': 0.5,
                'end': 0
            },
            'gravityY': 600,
            'frequency': 1000 / 30,
            'blendMode': "ADD",
            'alpha': {
                'start': 1,
                'end': 0
            },
            'tint': v
        }), this._particleEmitter.stop(), this._particleEmitter.setDepth(9), this._gameLayer.container.add(this._particleEmitter), this._flyParticleEmitter = _0x538533.add.particles(0, 0, "GJ_WebSheet", {
            'frame': 'square.png',
            'speed': {
                'min': 22,
                'max': 38
            },
            'angle': {
                'min': 225,
                'max': 315
            },
            'lifespan': {
                'min': 150,
                'max': 450
            },
            'scale': {
                'start': 0.5,
                'end': 0
            },
            'gravityY': 600,
            'frequency': 1000 / 30,
            'blendMode': "ADD",
            'tint': {
                'start': 16737280,
                'end': 16711680
            },
            'alpha': {
                'start': 1,
                'end': 0
            }
        }), this._flyParticleEmitter.stop(), this._flyParticleEmitter.setDepth(9), this._gameLayer.container.add(this._flyParticleEmitter), this._flyParticle2Emitter = _0x538533.add.particles(0, 0, "GJ_WebSheet", {
            'frame': "square.png",
            'speed': {
                'min': 220,
                'max': 380
            },
            'angle': {
                'min': 180,
                'max': 360
            },
            'lifespan': {
                'min': 150,
                'max': 450
            },
            'scale': {
                'start': 0.75,
                'end': 0
            },
            'gravityY': 600,
            'frequency': 1000 / 30,
            'blendMode': "ADD",
            'tint': {
                'start': 16760320,
                'end': 16711680
            },
            'alpha': {
                'start': 1,
                'end': 0
            }
        }), this._flyParticle2Emitter.stop(), this._flyParticle2Emitter.setDepth(9), this._gameLayer.container.add(this._flyParticle2Emitter), this._shipDragEmitter = _0x538533.add.particles(0, 0, 'GJ_WebSheet', {
            'frame': "square.png",
            'x': {
                'min': -18,
                'max': 18
            },
            'speed': {
                'min': 149.2 * 1.5,
                'max': 229.2 * 1.5
            },
            'angle': {
                'min': 205,
                'max': 295
            },
            'lifespan': {
                'min': 80,
                'max': 220
            },
            'scale': {
                'start': 0.375,
                'end': 0
            },
            'gravityX': -700,
            'gravityY': 600,
            'frequency': 25,
            'blendMode': "ADD",
            'alpha': {
                'start': 1,
                'end': 0
            }
        }), this._shipDragEmitter.stop(), this._shipDragEmitter.setDepth(22), this._shipDragActive = false, this._particleActive = false, this._flyParticle2Active = false, this._flyParticleActive = false;
        const _0x57911a = {
            'frame': "square.png",
            'speed': {
                'min': 250,
                'max': 350
            },
            'angle': {
                'min': 210,
                'max': 330
            },
            'lifespan': {
                'min': 50,
                'max': 600
            },
            'scale': {
                'start': 0.625,
                'end': 0
            },
            'gravityY': 1000,
            'blendMode': "ADD",
            'alpha': {
                'start': 1,
                'end': 0
            },
            'tint': v,
            'emitting': false
        };
        this._landEmitter1 = _0x538533.add.particles(0, 0, 'GJ_WebSheet', {
            ..._0x57911a
        }), this._landEmitter2 = _0x538533.add.particles(0, 0, "GJ_WebSheet", {
            ..._0x57911a
        }), this._aboveContainer = _0x538533.add.container(0, 0), this._aboveContainer.setDepth(13), this._aboveContainer.add(this._landEmitter1), this._aboveContainer.add(this._landEmitter2), this._landIdx = false, this._streak = new cs(this._scene, "streak_01", 0.231, 10, 8, 100, m, 0.7), this._streak.addToContainer(this._gameLayer.container, 8);
    }
    _updateParticles(_0xc43238, _0x52b718, _0x5af874) {
        if (this.p.isDead) return;
        const _0x119eb7 = this._scene._playerWorldX,
            _0x519d38 = b(this.p.y);
        this._particleEmitter.particleX = _0x119eb7 - 20, this._particleEmitter.particleY = _0x519d38 + 26;
        const _0x4436ac = this.p.onGround && !this.p.isFlying;
        _0x4436ac && !this._particleActive ? (this._particleEmitter.start(), this._particleActive = true) : !_0x4436ac && this._particleActive && (this._particleEmitter.stop(), this._particleActive = false);
        {
            const _0xe76a85 = Math.cos(this._rotation),
                _0x26ec65 = Math.sin(this._rotation),
                _0x216018 = -24,
                _0x2baeac = 18,
                _0x75c380 = _0x119eb7 + _0x216018 * _0xe76a85 - _0x2baeac * _0x26ec65,
                _0x2b31d7 = _0x519d38 + _0x216018 * _0x26ec65 + _0x2baeac * _0xe76a85,
                _0x5d66f4 = 2 * (2 * Math.random() - 1) * 2;
            this._flyParticleEmitter.particleX = _0x75c380, this._flyParticleEmitter.particleY = _0x2b31d7 + _0x5d66f4, this._flyParticle2Emitter.particleX = _0x75c380, this._flyParticle2Emitter.particleY = _0x2b31d7 + _0x5d66f4, this._streak.setPosition(_0x75c380 + 8, _0x2b31d7);
        }
        this._streak.update(_0x5af874);
        const _0x3d69d2 = this.p.isFlying;
        _0x3d69d2 && !this._flyParticleActive ? (this._flyParticleEmitter.start(), this._flyParticleActive = true) : !_0x3d69d2 && this._flyParticleActive && (this._flyParticleEmitter.stop(), this._flyParticleActive = false);
        const _0x169e30 = this.p.isFlying && this.p.upKeyDown;
        _0x169e30 && !this._flyParticle2Active ? (this._flyParticle2Emitter.start(), this._flyParticle2Active = true) : !_0x169e30 && this._flyParticle2Active && (this._flyParticle2Emitter.stop(), this._flyParticle2Active = false), this._shipDragEmitter.x = h, this._shipDragEmitter.particleY = b(this.p.y) + _0x52b718 + 30;
        const _0x2ac9d0 = this.p.isFlying && this.p.onGround && !this.p.onCeiling;
        _0x2ac9d0 && !this._shipDragActive ? (this._shipDragEmitter.start(), this._shipDragActive = true) : !_0x2ac9d0 && this._shipDragActive && (this._shipDragEmitter.stop(), this._shipDragActive = false);
    }
    setCubeVisible(_0x411813) {
        this._playerSpriteLayer.sprite.setVisible(_0x411813), this._playerGlowLayer && this._playerGlowLayer.sprite.setVisible(_0x411813 && this._playerGlowLayer.sprite._glowEnabled), this._playerOverlayLayer && this._playerOverlayLayer.sprite.setVisible(_0x411813), this._playerExtraLayer && this._playerExtraLayer.sprite.setVisible(_0x411813);
    }
    setShipVisible(_0x1c5620) {
        this._shipSpriteLayer.sprite.setVisible(_0x1c5620), this._shipGlowLayer && this._shipGlowLayer.sprite.setVisible(_0x1c5620 && this._shipGlowLayer.sprite._glowEnabled), this._shipOverlayLayer && this._shipOverlayLayer.sprite.setVisible(_0x1c5620), this._shipExtraLayer && this._shipExtraLayer.sprite.setVisible(_0x1c5620);
    }
    syncSprites(_0x30c325, _0x3f0607, _0x3afedf, _0xbf2e45) {
        if (this._endAnimating) return;
        const _0x7f0705 = undefined !== _0xbf2e45 ? _0xbf2e45 : h,
            _0x1a433c = b(this.p.y) + _0x3f0607,
            _0x2907d3 = this._rotation;
        if (this._lastCameraX = _0x30c325, this._lastCameraY = _0x3f0607, this._aboveContainer.x = -_0x30c325, this._aboveContainer.y = _0x3f0607, this.p.isFlying) {
            const _0x3904f8 = 10,
                _0x285611 = Math.cos(_0x2907d3),
                _0x501bf9 = Math.sin(_0x2907d3),
                _0x1b1d28 = -_0x3904f8 * _0x501bf9,
                _0x185f91 = _0x3904f8 * _0x285611,
                _0x562424 = _0x3904f8 * _0x501bf9,
                _0x3011c9 = -_0x3904f8 * _0x285611;
            for (const _0x5dc75c of this._shipLayers) _0x5dc75c && (_0x5dc75c.sprite.x = _0x7f0705 + _0x1b1d28, _0x5dc75c.sprite.y = _0x1a433c + _0x185f91, _0x5dc75c.sprite.rotation = _0x2907d3);
            for (const _0x536f40 of this._playerLayers) _0x536f40 && (_0x536f40.sprite.x = _0x7f0705 + _0x562424, _0x536f40.sprite.y = _0x1a433c + _0x3011c9, _0x536f40.sprite.rotation = _0x2907d3);
        } else {
            for (const _0x2c61a1 of this._allLayers) _0x2c61a1 && (_0x2c61a1.sprite.x = _0x7f0705, _0x2c61a1.sprite.y = _0x1a433c, _0x2c61a1.sprite.rotation = _0x2907d3);
        }
        this._updateParticles(_0x30c325, _0x3f0607, _0x3afedf);
    }
    enterShipMode(_0xeb37c6 = null) {
        if (this.p.isFlying) return;
        this.p.isFlying = true, this._scene.toggleGlitter(true), this.p.yVelocity *= 0.5, this.p.onGround = false, this.p.canJump = false, this.p.isJumping = false, this.stopRotation(), this._rotation = 0, this._particleEmitter.stop(), this._flyParticle2Active = false, this._streak.reset(), this._streak.start(), this.setShipVisible(true);
        for (const _0xc1f7c3 of this._playerLayers) _0xc1f7c3 && _0xc1f7c3.sprite.setScale(0.55);
        let _0x17d728 = this.p.y;
        _0xeb37c6 && (_0x17d728 = undefined !== _0xeb37c6.portalY ? _0xeb37c6.portalY : _0xeb37c6.y), this._gameLayer.setFlyMode(true, _0x17d728);
    }
    exitShipMode() {
        if (this.p.isFlying) {
            this.p.isFlying = false, this._scene.toggleGlitter(false), this.p.yVelocity *= 0.5, this.p.onGround = false, this.p.canJump = false, this.p.isJumping = false, this.stopRotation(), this._rotation = 0, this._flyParticleEmitter.stop(), this._flyParticleActive = false, this._flyParticle2Emitter.stop(), this._flyParticle2Active = false, this._shipDragEmitter.stop(), this._shipDragActive = false, this._particleActive = false, this._streak.stop(), this._streak.reset(), this.setShipVisible(false), this.setCubeVisible(true);
            for (const _0xe1b715 of this._playerLayers) _0xe1b715 && _0xe1b715.sprite.setScale(1);
            this._gameLayer.setFlyMode(false, 0);
        }
    }
    hitGround() {
        const _0x4a38a5 = !this.p.onGround;
        if (this.p.isFlying || (this.p.lastGroundY = this.p.y), this.p.yVelocity = 0, this.p.onGround = true, this.p.canJump = true, this.p.isJumping = false, this.stopRotation(), _0x4a38a5 && !this.p.isFlying) {
            this._landIdx = !this._landIdx;
            const _0x31584b = this._landIdx ? this._landEmitter1 : this._landEmitter2,
                _0x2248d5 = this._lastCameraX + h,
                _0x17e0bb = b(this.p.y) + 30;
            _0x31584b.explode(10, _0x2248d5, _0x17e0bb);
        }
    }
    killPlayer() {
        if (this.p.isDead) return;
        this.p.isDead = true, this._scene.toggleGlitter(false), this._particleEmitter.stop(), this._particleActive = false, this._flyParticleEmitter.stop(), this._flyParticleActive = false, this._flyParticle2Emitter.stop(), this._flyParticle2Active = false, this._shipDragEmitter.stop(), this._shipDragActive = false, this._streak.stop(), this._streak.reset();
        const _0x3f4b84 = this._scene,
            _0x3f0446 = _0x3f4b84._playerWorldX - _0x3f4b84._cameraX,
            _0x53ac5b = b(this.p.y) + this._lastCameraY,
            _0x281e43 = 0.9;
        _0x3f4b84.add.particles(_0x3f0446, _0x53ac5b, 'GJ_WebSheet', {
            'frame': "square.png",
            'speed': {
                'min': 200,
                'max': 800
            },
            'angle': {
                'min': 0,
                'max': 360
            },
            'scale': {
                'start': 18 / 32,
                'end': 0
            },
            'alpha': {
                'start': 1,
                'end': 0
            },
            'lifespan': {
                'min': 50,
                'max': 800
            },
            'quantity': 100,
            'stopAfter': 100,
            'blendMode': S,
            'tint': v,
            'x': {
                'min': -20,
                'max': 20
            },
            'y': {
                'min': -20,
                'max': 20
            }
        }).setScrollFactor(0).setDepth(15);
        const _0x438d80 = _0x3f4b84.add.graphics().setScrollFactor(0).setDepth(15).setBlendMode(S),
            _0x4683eb = {
                't': 0
            };
        _0x3f4b84.tweens.add({
            'targets': _0x4683eb,
            't': 1,
            'duration': 500,
            'ease': 'Quad.Out',
            'onUpdate': () => {
                const _0x39f32 = 18 + 144 * _0x4683eb.t,
                    _0xc8c1 = 1 - _0x4683eb.t;
                _0x438d80.clear(), _0x438d80.fillStyle(v, _0xc8c1), _0x438d80.fillCircle(_0x3f0446, _0x53ac5b, _0x39f32);
            },
            'onComplete': () => _0x438d80.destroy()
        }), this._createExplosionPieces(_0x3f0446, _0x53ac5b, _0x281e43), this.setCubeVisible(false), this.setShipVisible(false);
    }
    _createExplosionPieces(_0x49be85, _0x13b56e, _0x349a09) {
        const _0x44acaf = this._scene,
            _0x4a9f23 = 40 * _0x349a09,
            _0x24dcea = Math.round(2 * _0x4a9f23),
            _0x26dcbd = _0x44acaf.make.renderTexture({
                'x': 0,
                'y': 0,
                'width': _0x24dcea,
                'height': _0x24dcea,
                'add': false
            }),
            _0x5c571a = [this._playerGlowLayer, this._playerOverlayLayer, this._shipGlowLayer, this._shipOverlayLayer, this._playerSpriteLayer, this._playerExtraLayer, this._shipSpriteLayer, this._shipExtraLayer];
        for (const _0x1f09e3 of _0x5c571a) {
            if (!_0x1f09e3 || !_0x1f09e3.sprite.visible) continue;
            const _0x53102a = _0x1f09e3.sprite;
            _0x26dcbd.draw(_0x53102a, _0x24dcea / 2 + (_0x53102a.x - _0x49be85), _0x24dcea / 2 + (_0x53102a.y - _0x13b56e));
        }
        const _0xd0201e = "__deathRT_" + Date.now();
        _0x26dcbd.saveTexture(_0xd0201e);
        const _0x5a2621 = _0x44acaf.textures.get(_0xd0201e);
        let _0x28c600 = 2 + Math.round(2 * Math.random()),
            _0x247253 = 2 + Math.round(2 * Math.random());
        const _0x5b9267 = Math.random();
        _0x5b9267 > 0.95 ? _0x28c600 = 1 : _0x5b9267 > 0.9 && (_0x247253 = 1);
        const _0x1e8c09 = 9.34740324 * 0.8,
            _0x422587 = 0.5 * _0x1e8c09,
            _0x1e87b0 = 1 * _0x1e8c09,
            _0x4dd9c4 = 0.45,
            _0x5e8097 = _0x24dcea / _0x28c600,
            _0x5af9d3 = _0x24dcea / _0x247253,
            _0xe9c860 = [],
            _0x3215fa = [],
            _0x416e63 = [0],
            _0x57d0dc = [0];
        let _0x44e1e1 = 0,
            _0x38011e = 0;
        for (let _0x3f4d44 = 0; _0x3f4d44 < _0x28c600 - 1; _0x3f4d44++) {
            const _0x5b2c12 = Math.round(_0x5e8097 * (0.55 + Math.random() * _0x4dd9c4 * 2));
            _0xe9c860.push(_0x5b2c12), _0x44e1e1 += _0x5b2c12, _0x416e63.push(_0x44e1e1);
        }
        _0xe9c860.push(_0x24dcea - _0x44e1e1);
        for (let _0x325ce1 = 0; _0x325ce1 < _0x247253 - 1; _0x325ce1++) {
            const _0x37f0ad = Math.round(_0x5af9d3 * (0.55 + Math.random() * _0x4dd9c4 * 2));
            _0x3215fa.push(_0x37f0ad), _0x38011e += _0x37f0ad, _0x57d0dc.push(_0x38011e);
        }
        _0x3215fa.push(_0x24dcea - _0x38011e), this._explosionPieces = [], this._explosionContainer = _0x44acaf.add.container(_0x49be85, _0x13b56e).setDepth(16);
        let _0x156c8b = 0;
        for (let _0x4cd06e = 0; _0x4cd06e < _0x28c600; _0x4cd06e++) {
            const _0x5c6aa9 = _0xe9c860[_0x4cd06e],
                _0x43a4e9 = _0x416e63[_0x4cd06e];
            for (let _0x5b14cf = 0; _0x5b14cf < _0x247253; _0x5b14cf++) {
                const _0x20847a = _0x3215fa[_0x5b14cf],
                    _0x20396e = _0x57d0dc[_0x5b14cf];
                if (_0x5c6aa9 <= 0 || _0x20847a <= 0) continue;
                _0x156c8b++;
                const _0x526d03 = 'piece_' + _0x4cd06e + '_' + _0x5b14cf;
                _0x5a2621.add(_0x526d03, 0, _0x43a4e9, _0x20396e, _0x5c6aa9, _0x20847a);
                const _0xba83f5 = _0x44acaf.add.image(0, 0, _0xd0201e, _0x526d03);
                _0xba83f5.x = _0x43a4e9 + _0x5c6aa9 / 2 - _0x24dcea / 2, _0xba83f5.y = -(_0x20396e + _0x20847a / 2 - _0x24dcea / 2), this._explosionContainer.add(_0xba83f5);
                let _0x298d34 = null;
                if (_0x156c8b % 2 == 0) {
                    const _0x367bdb = 200 + 200 * Math.random(),
                        _0x5e5fa8 = _0xba83f5;
                    _0x298d34 = _0x44acaf.add.particles(0, 0, "GJ_WebSheet", {
                        'frame': 'square.png',
                        'speed': 0,
                        'scale': {
                            'start': 0.5,
                            'end': 0
                        },
                        'alpha': {
                            'start': 1,
                            'end': 0
                        },
                        'lifespan': _0x367bdb,
                        'frequency': 25,
                        'quantity': 1,
                        'emitting': true,
                        'blendMode': S,
                        'tint': v,
                        'emitCallback': _0x2f7fc7 => {
                            _0x2f7fc7.x = _0x5e5fa8.x + 3 * (2 * Math.random() - 1) * 2, _0x2f7fc7.y = _0x5e5fa8.y + 3 * (2 * Math.random() - 1) * 2;
                        }
                    }), this._explosionContainer.addAt(_0x298d34, 0);
                }
                const _0x159cfa = {
                    'spr': _0xba83f5,
                    'particle': _0x298d34,
                    'xVel': _0x422587 + (2 * Math.random() - 1) * _0x1e87b0,
                    'yVel': -(12 + 6 * (2 * Math.random() - 1)),
                    'timer': 1.4,
                    'fadeTime': 0.5,
                    'rotDelta': 360 * (2 * Math.random() - 1) / 60,
                    'halfSize': Math.min(_0x5c6aa9, _0x20847a) / 2
                };
                this._explosionPieces.push(_0x159cfa);
            }
        }
        this._explosionGroundSY = b(0) + this._lastCameraY, this._explosionRT = _0x26dcbd, this._explosionTexKey = _0xd0201e;
    }
    updateExplosionPieces(_0x1c8c6d) {
        if (!this._explosionPieces || 0 === this._explosionPieces.length) return;
        const _0x1ed0a8 = _0x1c8c6d / 1000,
            _0x3e389c = Math.min(60 * _0x1ed0a8 * 0.9, 2),
            _0x59eafe = 0.5 * _0x3e389c * 2,
            _0x5a7549 = this._explosionGroundSY - this._explosionContainer.y;
        let _0x4284b0 = 0;
        for (; _0x4284b0 < this._explosionPieces.length;) {
            const _0x3fac01 = this._explosionPieces[_0x4284b0];
            if (_0x3fac01.timer -= _0x1ed0a8, _0x3fac01.timer > 0) {
                {
                    _0x3fac01.yVel += _0x59eafe, _0x3fac01.xVel *= 0.98 + 0.02 * (1 - _0x3e389c);
                    let _0x57034b = _0x3fac01.spr.x + _0x3fac01.xVel * _0x3e389c,
                        _0x4c0481 = _0x3fac01.spr.y + _0x3fac01.yVel * _0x3e389c;
                    const _0x3f6377 = _0x5a7549 - _0x3fac01.halfSize;
                    if (_0x4c0481 > _0x3f6377 && _0x3fac01.yVel > 0 && (_0x4c0481 = _0x3f6377, _0x3fac01.yVel *= -0.8, Math.abs(_0x3fac01.yVel) < 3 && (_0x3fac01.yVel = -3)), _0x3fac01.spr.x = _0x57034b, _0x3fac01.spr.y = _0x4c0481, _0x3fac01.spr.angle += _0x3fac01.rotDelta * _0x3e389c, _0x3fac01.timer < _0x3fac01.fadeTime) {
                        const _0x2d8b5f = _0x3fac01.timer / _0x3fac01.fadeTime;
                        _0x3fac01.spr.setAlpha(_0x2d8b5f), _0x3fac01.particle && _0x3fac01.particle.setAlpha(_0x2d8b5f);
                    }
                }
                _0x4284b0++;
            } else _0x3fac01.particle && (_0x3fac01.particle.stop(), _0x3fac01.particle.destroy()), _0x3fac01.spr.destroy(), this._explosionPieces.splice(_0x4284b0, 1);
        }
        0 === this._explosionPieces.length && this._cleanupExplosion();
    }
    _cleanupExplosion() {
        if (this._explosionPieces) {
            for (const _0x59172d of this._explosionPieces) _0x59172d.particle && (_0x59172d.particle.stop(), _0x59172d.particle.destroy()), _0x59172d.spr && _0x59172d.spr.destroy();
        }
        this._explosionContainer && (this._explosionContainer.destroy(), this._explosionContainer = null), this._explosionTexKey && (this._scene.textures.remove(this._explosionTexKey), this._explosionTexKey = null), this._explosionRT && (this._explosionRT.destroy(), this._explosionRT = null), this._explosionPieces = null;
    }
    _playPortalShine(_0x49e81f) {
        const _0x4ed8ff = this._scene,
            _0xf31b0d = _0x49e81f.x,
            _0x3824c0 = b(_0x49e81f.portalY),
            _0x19c6b0 = ["portalshine_02_front_001.png", "portalshine_02_back_001.png"],
            _0x5d636a = [this._gameLayer.topContainer, this._gameLayer.container];
        for (let _0x34fd8c = 0; _0x34fd8c < 2; _0x34fd8c++) {
            const _0x4bfe30 = R(_0x4ed8ff, _0x19c6b0[_0x34fd8c]);
            if (!_0x4bfe30) continue;
            const _0x34645e = _0x4ed8ff.add.image(_0xf31b0d, _0x3824c0, _0x4bfe30.atlas, _0x4bfe30.frame);
            _0x34645e.setBlendMode(S), _0x34645e.setAlpha(0), _0x5d636a[_0x34fd8c].add(_0x34645e), _0x4ed8ff.tweens.add({
                'targets': _0x34645e,
                'alpha': {
                    'from': 0,
                    'to': 1
                },
                'duration': 50,
                'onComplete': () => {
                    _0x4ed8ff.tweens.add({
                        'targets': _0x34645e,
                        'alpha': 0,
                        'duration': 400,
                        'onComplete': () => _0x34645e.destroy()
                    });
                }
            });
        }
    }
    _checkSnapJump(_0x1f801b) {
        const _0x483058 = [{
                'dx': 240,
                'dy': 60
            }, {
                'dx': 300,
                'dy': -60
            }, {
                'dx': 180,
                'dy': 120
            }],
            _0x2b806a = this._lastLandObject;
        if (_0x2b806a && _0x2b806a !== _0x1f801b && _0x2b806a.type === y) {
            const _0x34ef27 = _0x2b806a.x,
                _0x4652bb = _0x2b806a.y,
                _0x5de781 = _0x1f801b.x,
                _0x21ad88 = _0x1f801b.y,
                _0x1b1831 = this.p.gravityFlipped ? -1 : 1;
            let _0x372d4e = false;
            for (const _0x31d5e4 of _0x483058)
                if (Math.abs(_0x5de781 - (_0x34ef27 + _0x31d5e4.dx)) <= 2 && Math.abs(_0x21ad88 - (_0x4652bb + _0x31d5e4.dy * _0x1b1831)) <= 2) {
                    _0x372d4e = true;
                    break;
                } if (_0x372d4e) {
                const _0x4ca454 = _0x1f801b.x + this._lastXOffset,
                    _0x48aba3 = this._scene._playerWorldX;
                let _0x5f2847;
                _0x5f2847 = Math.abs(_0x4ca454 - _0x48aba3) <= 2 ? _0x4ca454 : _0x4ca454 > _0x48aba3 ? _0x48aba3 + 2 : _0x48aba3 - 2, this._scene._playerWorldX = _0x5f2847;
            }
        }
        this._lastLandObject = _0x1f801b, this._lastXOffset = this._scene._playerWorldX - _0x1f801b.x;
    }
    _isFallingPastThreshold() {
        return this.p.gravityFlipped ? this.p.yVelocity > 0.25 : this.p.yVelocity < -0.25;
    }
    flipMod() {
        return this.p.gravityFlipped ? -1 : 1;
    }
    runRotateAction() {
        this.rotateActionActive = true, this.rotateActionTime = 0, this.rotateActionDuration = 0.39 / d, this.rotateActionStart = this._rotation, this.rotateActionTotal = Math.PI * this.flipMod();
    }
    stopRotation() {
        this.rotateActionActive = false;
    }
    updateRotateAction(_0x98044d) {
        if (!this.rotateActionActive) return;
        this.rotateActionTime += _0x98044d, this.rotateActionTime >= this.rotateActionDuration && (this.rotateActionActive = false);
        let _0xb1cb91 = Math.min(this.rotateActionTime / this.rotateActionDuration, 1);
        this._rotation = this.rotateActionStart + this.rotateActionTotal * _0xb1cb91;
    }
    convertToClosestRotation() {
        let _0x5f531c = Math.PI / 2;
        return Math.round(this._rotation / _0x5f531c) * _0x5f531c;
    }
    slerp2D(_0x11f190, _0xf2c7b9, _0x8b3942) {
        let _0x4ee783 = _0xf2c7b9 - _0x11f190;
        for (; _0x4ee783 > Math.PI;) _0x4ee783 -= 2 * Math.PI;
        for (; _0x4ee783 < -Math.PI;) _0x4ee783 += 2 * Math.PI;
        return _0x11f190 + _0x4ee783 * _0x8b3942;
    }
    updateGroundRotation(_0x5c24f7) {
        let _0x183c2a = this.convertToClosestRotation(),
            _0x108955 = 0.1575 * 3,
            _0x17a9a6 = Math.min(1 * _0x5c24f7, _0x108955 * _0x5c24f7);
        this._rotation = this.slerp2D(this._rotation, _0x183c2a, _0x17a9a6);
    }
    updateShipRotation(_0x217ad3) {
        let _0x48f422 = -(this.p.y - this.p.lastY),
            _0x58cb3a = 10.3860036 * _0x217ad3;
        if (_0x58cb3a * _0x58cb3a + _0x48f422 * _0x48f422 >= 0.6 * _0x217ad3) {
            let _0x5e6a2b = Math.atan2(_0x48f422, _0x58cb3a),
                _0x2371ed = 0.15,
                _0x1857d4 = Math.min(1 * _0x217ad3, _0x2371ed * _0x217ad3);
            this._rotation = this.slerp2D(this._rotation, _0x5e6a2b, _0x1857d4);
        }
    }
    playerIsFalling() {
        return this.p.gravityFlipped ? this.p.yVelocity > 3.832796 : this.p.yVelocity < 3.832796;
    }
    updateJump(_0x3d1c6f) {
        if (this.p.isFlying) this._updateFlyJump(_0x3d1c6f);
        else {
            if (this.p.upKeyDown && this.p.canJump) this.p.isJumping = true, this.p.onGround = false, this.p.canJump = false, this.p.upKeyPressed = false, this.p.yVelocity = 22.360064 * this.flipMod(), this.runRotateAction();
            else {
                if (this.p.isJumping) this.p.yVelocity -= p * _0x3d1c6f * this.flipMod(), this.playerIsFalling() && (this.p.isJumping = false, this.p.onGround = false);
                else {
                    if (this.playerIsFalling() && (this.p.canJump = false), this.p.yVelocity -= p * _0x3d1c6f * this.flipMod(), this.p.gravityFlipped ? this.p.yVelocity = Math.min(this.p.yVelocity, 30) : this.p.yVelocity = Math.max(this.p.yVelocity, -30), this._isFallingPastThreshold() && !this.rotateActionActive && this.runRotateAction(), this.playerIsFalling()) {
                        let _0x47ed2a;
                        _0x47ed2a = this.p.gravityFlipped ? this.p.yVelocity > 4 : this.p.yVelocity < -4, _0x47ed2a && (this.p.onGround = false);
                    }
                }
            }
        }
    }
    _updateFlyJump(_0x130c46) {
        let _0x203040 = 0.8;
        this.p.upKeyDown && !this.p.wasBoosted && (_0x203040 = -1), this.p.upKeyDown || this.playerIsFalling() || (_0x203040 = 1.2);
        let _0x2d237f = 0.4;
        this.p.upKeyDown && this.playerIsFalling() && (_0x2d237f = 0.5), this.p.yVelocity -= p * _0x130c46 * this.flipMod() * _0x203040 * _0x2d237f, this.p.upKeyDown && (this.p.onGround = false), this.p.wasBoosted || (this.p.gravityFlipped ? (this.p.yVelocity = Math.max(this.p.yVelocity, -16), this.p.yVelocity = Math.min(this.p.yVelocity, 12.8)) : (this.p.yVelocity = Math.max(this.p.yVelocity, -12.8), this.p.yVelocity = Math.min(this.p.yVelocity, 16)));
    }
    checkCollisions(_0x2f5078) {
        const _0x6bfa06 = 30,
            _0x3c691e = _0x2f5078 + h,
            _0x8e0d28 = this.p.y,
            _0x37040a = this.p.lastY,
            _0x11ee2f = this.p.isFlying ? 12 : 20;
        this.p.collideTop = 0, this.p.collideBottom = 0, this.p.onCeiling = false;
        let _0x30410f = false;
        const _0x198534 = this._gameLayer.getNearbySectionObjects(_0x3c691e);
        for (let _0x1b13b8 of _0x198534) {
            let _0xf3791a = _0x1b13b8.x - _0x1b13b8.w / 2,
                _0x17dbc8 = _0x1b13b8.x + _0x1b13b8.w / 2,
                _0x2d2fa7 = _0x1b13b8.y - _0x1b13b8.h / 2,
                _0x8a8d9a = _0x1b13b8.y + _0x1b13b8.h / 2;
            if (!(_0x3c691e + 30 <= _0xf3791a || _0x3c691e - 30 >= _0x17dbc8 || _0x8e0d28 + _0x6bfa06 <= _0x2d2fa7 || _0x8e0d28 - _0x6bfa06 >= _0x8a8d9a)) {
                if (_0x1b13b8.type !== _) {
                    if (_0x1b13b8.type !== w) {
                        if (_0x1b13b8.type === x) return void this.killPlayer();
                        if (_0x1b13b8.type === y) {
                            let _0x146a97 = _0x8e0d28 - _0x6bfa06 + _0x11ee2f,
                                _0x869e42 = _0x37040a - _0x6bfa06 + _0x11ee2f,
                                _0x3e7199 = _0x8e0d28 + _0x6bfa06 - _0x11ee2f,
                                _0x135a9d = _0x37040a + _0x6bfa06 - _0x11ee2f;
                            const _0x55559d = 9,
                                _0x3c1654 = _0x3c691e + _0x55559d > _0xf3791a && _0x3c691e - _0x55559d < _0x17dbc8 && _0x8e0d28 + _0x55559d > _0x2d2fa7 && _0x8e0d28 - _0x55559d < _0x8a8d9a,
                                _0x2841ea = (this.p.yVelocity <= 0 || this.p.onGround) && (_0x146a97 >= _0x8a8d9a || _0x869e42 >= _0x8a8d9a);
                            if (_0x3c1654 && !_0x2841ea) return void this.killPlayer();
                            if (_0x3c691e + 30 - 5 > _0xf3791a && _0x3c691e - 30 + 5 < _0x17dbc8) {
                                if ((_0x146a97 >= _0x8a8d9a || _0x869e42 >= _0x8a8d9a) && (this.p.yVelocity <= 0 || this.p.onGround)) {
                                    this.p.y = _0x8a8d9a + _0x6bfa06, this.hitGround(), _0x30410f = true, this.p.collideBottom = _0x8a8d9a, this.p.isFlying || this._checkSnapJump(_0x1b13b8);
                                    continue;
                                }
                                if ((_0x3e7199 <= _0x2d2fa7 || _0x135a9d <= _0x2d2fa7) && (this.p.yVelocity >= 0 || this.p.onGround) && this.p.isFlying) {
                                    this.p.y = _0x2d2fa7 - _0x6bfa06, this.hitGround(), this.p.onCeiling = true, this.p.collideTop = _0x2d2fa7;
                                    continue;
                                }
                            }
                        }
                    } else _0x1b13b8.activated || (_0x1b13b8.activated = true, this._playPortalShine(_0x1b13b8), this.exitShipMode());
                } else _0x1b13b8.activated || (_0x1b13b8.activated = true, this._playPortalShine(_0x1b13b8), this.enterShipMode(_0x1b13b8));
            }
        }
        if (0 !== this.p.collideTop && 0 !== this.p.collideBottom) {
            if (Math.abs(this.p.collideTop - this.p.collideBottom) < 48) return void this.killPlayer();
        }
        let _0x3020c8 = this._gameLayer.getFloorY();
        _0x30410f || this.p.y <= _0x3020c8 + 30 && (this.p.y = _0x3020c8 + 30, this.hitGround());
        let _0x496456 = this._gameLayer.getCeilingY();
        if (null !== _0x496456 && this.p.y >= _0x496456 - 30 && (this.p.y = _0x496456 - 30, this.hitGround(), this.p.onCeiling = true), this.p.isFlying) {
            const _0x354b7c = this.p.y <= _0x3020c8 + 30,
                _0xdc296 = null !== _0x496456 && this.p.y >= _0x496456 - 30;
            _0x30410f || _0x354b7c || 0 !== this.p.collideTop || _0xdc296 || (this.p.onGround = false);
        }
    }
    drawHitboxes(_0x691b2a, _0x52bd8a, _0x5aece4) {
        if (_0x691b2a.clear(), !this._showHitboxes) return;
        const _0x5dd446 = 30,
            _0xce3c85 = 30,
            _0x2cf1c7 = _0x52bd8a + h,
            _0x5e3ebe = this.p.y,
            _0x51832d = this.p.isFlying ? 12 : 20,
            _0x286071 = this._gameLayer.getNearbySectionObjects(_0x2cf1c7);
        for (let _0x42ccb8 of _0x286071) {
            let _0x52deab = _0x42ccb8.x - _0x52bd8a,
                _0x3e179d = b(_0x42ccb8.y) + _0x5aece4,
                _0x17cd1a = 65280;
            _0x42ccb8.type === x ? _0x17cd1a = 16729156 : _0x42ccb8.type !== _ && _0x42ccb8.type !== w || (_0x17cd1a = 4491519), _0x691b2a.lineStyle(2, _0x17cd1a, 0.7), _0x691b2a.strokeRect(_0x52deab - _0x42ccb8.w / 2, _0x3e179d - _0x42ccb8.h / 2, _0x42ccb8.w, _0x42ccb8.h);
        }
        const _0x7a132d = h,
            _0x1e788a = b(_0x5e3ebe) + _0x5aece4;
        _0x691b2a.lineStyle(2, 65535, 0.8), _0x691b2a.strokeRect(_0x7a132d - _0x5dd446, _0x1e788a - _0xce3c85, g, g), _0x691b2a.lineStyle(2, 16776960, 0.8), _0x691b2a.strokeRect(_0x7a132d - _0x5dd446 + 5, _0x1e788a - _0xce3c85, 50, g), _0x691b2a.lineStyle(2, 16711680, 0.8), _0x691b2a.strokeRect(_0x7a132d - _0x5dd446, _0x1e788a - _0xce3c85 + 5, g, 50);
        let _0x1eec42 = b(_0x5e3ebe - _0xce3c85 + _0x51832d) + _0x5aece4,
            _0xf6f69b = b(_0x5e3ebe + _0xce3c85 - _0x51832d) + _0x5aece4;
        _0x691b2a.lineStyle(2, 16746496, 0.9), _0x691b2a.lineBetween(_0x7a132d - _0x5dd446 - 8, _0x1eec42, _0x7a132d + _0x5dd446 + 8, _0x1eec42), _0x691b2a.lineBetween(_0x7a132d - _0x5dd446 - 8, _0xf6f69b, _0x7a132d + _0x5dd446 + 8, _0xf6f69b), (_0x691b2a.lineStyle(2, 16777215, 1), _0x691b2a.strokeRect(_0x7a132d - 9, _0x1e788a - 9, 36, 18));
    }
    setShowHitboxes(_0x2133d2) {
        this._showHitboxes = _0x2133d2;
    }
    playEndAnimation(_0x24408e, _0x281588, _0x54bbf4) {
        this._endAnimating = true;
        const _0x3729ef = this._scene,
            _0x568b25 = _0x54bbf4 || 240,
            _0x4a45d7 = _0x3729ef._playerWorldX,
            _0x501b73 = this.p.y,
            _0x457676 = _0x24408e + 100,
            _0x3ade39 = _0x568b25 - 40,
            _0x1295ea = _0x4a45d7,
            _0x47ae60 = _0x501b73,
            _0x1f2e19 = _0x4a45d7 + 80,
            _0x8bc9f4 = _0x568b25 + 300,
            _0x11b580 = [this._playerSpriteLayer, this._playerGlowLayer, this._playerOverlayLayer, this._playerExtraLayer, this._shipSpriteLayer, this._shipGlowLayer, this._shipOverlayLayer, this._shipExtraLayer].filter(_0x3e9c62 => _0x3e9c62 && _0x3e9c62.sprite.visible).map(_0x5cedeb => _0x5cedeb.sprite);
        this._particleEmitter.stop(), this._flyParticleEmitter.stop(), this._flyParticle2Emitter.stop(), this._shipDragEmitter.stop();
        const _0x154798 = this.p.isFlying,
            _0x3793a4 = [this._shipSpriteLayer, this._shipGlowLayer, this._shipOverlayLayer, this._shipExtraLayer],
            _0xbd676f = [this._playerSpriteLayer, this._playerGlowLayer, this._playerOverlayLayer, this._playerExtraLayer],
            _0x3fc5a5 = _0x11b580.map(_0x5c0e81 => {
                let _0x5cbb0a = 0;
                if (_0x154798) {
                    const _0xff16eb = _0x3793a4.some(_0x40ef1e => _0x40ef1e && _0x40ef1e.sprite === _0x5c0e81),
                        _0x4fdb53 = _0xbd676f.some(_0x4ef5b5 => _0x4ef5b5 && _0x4ef5b5.sprite === _0x5c0e81);
                    _0xff16eb ? _0x5cbb0a = 10 : _0x4fdb53 && (_0x5cbb0a = -10);
                }
                return {
                    'spr': _0x5c0e81,
                    'localY': _0x5cbb0a
                };
            }),
            _0x3e35e7 = this._streak,
            _0x51c4a8 = {
                'val': 0
            };
        _0x3729ef.tweens.add({
            'targets': _0x51c4a8,
            'val': 1,
            'duration': 1000,
            'ease': _0x23df59 => Math.pow(_0x23df59, 1.2),
            'onUpdate': () => {
                const _0x3eda1c = _0x51c4a8.val,
                    _0x2478d6 = (1 - _0x3eda1c) ** 3 * _0x1295ea + 3 * (1 - _0x3eda1c) ** 2 * _0x3eda1c * _0x1295ea + 3 * (1 - _0x3eda1c) * _0x3eda1c ** 2 * _0x1f2e19 + _0x3eda1c ** 3 * _0x457676,
                    _0x148e69 = (1 - _0x3eda1c) ** 3 * _0x47ae60 + 3 * (1 - _0x3eda1c) ** 2 * _0x3eda1c * _0x47ae60 + 3 * (1 - _0x3eda1c) * _0x3eda1c ** 2 * _0x8bc9f4 + _0x3eda1c ** 3 * _0x3ade39,
                    _0x3d0365 = _0x2478d6 - _0x3729ef._cameraX,
                    _0x3790a9 = b(_0x148e69) + _0x3729ef._cameraY,
                    _0x1cb4d3 = 1 - _0x3eda1c * _0x3eda1c,
                    _0x1d2e2f = _0x3fc5a5[0].spr.rotation,
                    _0xd3cb2a = Math.cos(_0x1d2e2f),
                    _0x2f86c2 = Math.sin(_0x1d2e2f);
                for (const _0x2b394a of _0x3fc5a5) {
                    const _0xbd4f26 = -_0x2b394a.localY * _0x2f86c2,
                        _0x5b67fe = _0x2b394a.localY * _0xd3cb2a;
                    _0x2b394a.spr.setPosition(_0x3d0365 + _0xbd4f26, _0x3790a9 + _0x5b67fe), _0x2b394a.spr.setAlpha(_0x1cb4d3);
                }
                _0x3e35e7.setPosition(_0x2478d6, b(_0x148e69)), _0x3e35e7.update(_0x3729ef.game.loop.delta / 1000);
            },
            'onComplete': () => {
                for (const _0x4fce42 of _0x3fc5a5) _0x4fce42.spr.setVisible(false);
                _0x3e35e7.stop(), _0x3e35e7.reset(), _0x281588();
            }
        });
        for (const _0x25f8c5 of _0x11b580) _0x3729ef.tweens.add({
            'targets': _0x25f8c5,
            'angle': _0x25f8c5.angle + 360,
            'duration': 1000,
            'ease': _0x228c03 => Math.pow(_0x228c03, 1.5)
        });
    }
    reset() {
        this._cleanupExplosion(), this._endAnimating = false, this._lastLandObject = null, this._lastXOffset = 0, this.stopRotation(), this.rotateActionTime = 0, this._rotation = 0, this._lastCameraX = 0, this._lastCameraY = 0, this.setCubeVisible(true), this.setShipVisible(false);
        for (const _0x5a0fa9 of this._allLayers) _0x5a0fa9 && _0x5a0fa9.sprite.setAlpha(1);
        for (const _0x1e656c of this._playerLayers) _0x1e656c && _0x1e656c.sprite.setScale(1);
        this._particleEmitter.stop(), this._particleActive = false, this._flyParticleEmitter.stop(), this._flyParticleActive = false, this._flyParticle2Emitter.stop(), this._flyParticle2Active = false, this._shipDragEmitter.stop(), this._shipDragActive = false, this._streak.stop(), this._streak.reset();
    }
}
export { ps };
