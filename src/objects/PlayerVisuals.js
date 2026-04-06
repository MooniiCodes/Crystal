/*
    visual helper for player object
*/
import * as Phaser from 'phaser';
import { R } from '../systems/GameState.js';

class cs {
    constructor(_0x9c2356, _0x171c7f, _0x49d49a, _0xb01616, _0x5aac4b, _0x293ce3, _0x5c7bc5 = 16777215, _0x5a3e29 = 1) {
        this._color = _0x5c7bc5, this._opacity = _0x5a3e29, this._fadeDelta = 1 / _0x49d49a, this._minSegSq = _0xb01616 * _0xb01616, this._maxSeg = _0x293ce3, this._maxPoints = 5 * Math.floor(60 * _0x49d49a + 2), this._stroke = _0x5aac4b, this._pts = [], this._posR = {
            'x': 0,
            'y': 0
        }, this._posInit = false, this._active = false, this._gfx = _0x9c2356.add.graphics(), this._gfx.setBlendMode(Phaser.BlendModes.ADD);
    }
    addToContainer(_0xa23240, _0x4b05db) {
        _0xa23240.add(this._gfx), this._gfx.setDepth(_0x4b05db);
    }
    setPosition(_0x388397, _0x292e79) {
        this._posR.x = _0x388397, this._posR.y = _0x292e79, this._posInit = true;
    }
    start() {
        this._active = true;
    }
    stop() {
        this._active = false;
    }
    reset() {
        this._pts = [], this._posInit = false, this._gfx.clear();
    }
    update(_0x2acf4c) {
        if (!this._posInit) return void this._gfx.clear();
        const _0x1817b7 = _0x2acf4c * this._fadeDelta;
        let _0x56ab0b = 0;
        for (let _0x3ca060 = 0; _0x3ca060 < this._pts.length; _0x3ca060++) this._pts[_0x3ca060].state -= _0x1817b7, this._pts[_0x3ca060].state > 0 && (_0x56ab0b !== _0x3ca060 && (this._pts[_0x56ab0b] = this._pts[_0x3ca060]), _0x56ab0b++);
        if (this._pts.length = _0x56ab0b, this._active && this._pts.length < this._maxPoints) {
            const _0x89a79d = this._pts.length;
            let _0x3d12ca = true;
            if (_0x89a79d > 0) {
                const _0x2748e4 = this._pts[_0x89a79d - 1],
                    _0x3a1a00 = this._posR.x - _0x2748e4.x,
                    _0x4c247a = this._posR.y - _0x2748e4.y,
                    _0x1f9fea = _0x3a1a00 * _0x3a1a00 + _0x4c247a * _0x4c247a;
                if (this._maxSeg > 0 && Math.sqrt(_0x1f9fea) > this._maxSeg) this._pts.length = 0;
                else {
                    if (_0x1f9fea < this._minSegSq) _0x3d12ca = false;
                    else {
                        if (_0x89a79d > 1) {
                            const _0x375c40 = this._pts[_0x89a79d - 2],
                                _0x14c0c1 = this._posR.x - _0x375c40.x,
                                _0x2d01f0 = this._posR.y - _0x375c40.y;
                            _0x14c0c1 * _0x14c0c1 + _0x2d01f0 * _0x2d01f0 < 2 * this._minSegSq && (_0x3d12ca = false);
                        }
                    }
                }
            }
            _0x3d12ca && this._pts.push({
                'x': this._posR.x,
                'y': this._posR.y,
                'state': 1
            });
        }
        this._gfx.clear();
        const _0x49dac5 = this._pts.length;
        if (!(_0x49dac5 < 2))
            for (let _0x27c164 = 0; _0x27c164 < _0x49dac5 - 1; _0x27c164++) {
                const _0x398b7b = this._pts[_0x27c164],
                    _0x3b4326 = this._pts[_0x27c164 + 1],
                    _0x1c4c9d = 0.5 * (_0x398b7b.state + _0x3b4326.state) * this._opacity;
                this._gfx.lineStyle(this._stroke, this._color, _0x1c4c9d), this._gfx.lineBetween(_0x398b7b.x, _0x398b7b.y, _0x3b4326.x, _0x3b4326.y);
            }
    }
}

function ds(_0x415536, _0x592bc1, _0x4d69dc, _0xfb965c, _0x43d3fd, _0x5bbdf1) {
    let _0x221d10 = R(_0x415536, _0xfb965c);
    if (!_0x221d10) return null;
    let _0x38da45 = _0x415536.add.image(_0x592bc1, _0x4d69dc, _0x221d10.atlas, _0x221d10.frame);
    return _0x38da45.setDepth(_0x43d3fd), _0x38da45.setVisible(_0x5bbdf1), {
        'sprite': _0x38da45
    };
}
export { cs, ds };
