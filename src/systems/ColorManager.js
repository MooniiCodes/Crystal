/*
    manages colors and such
    fs = background
    gs = ground
*/
const fs = 1000,
    gs = 1001;
class vs {
    constructor(_0x268d66, _0x3664f8, _0x4b756c) {
        this.from = {
            ..._0x268d66
        }, this.to = {
            ..._0x3664f8
        }, this.duration = _0x4b756c, this.elapsed = 0, this.done = _0x4b756c <= 0, this.current = _0x4b756c <= 0 ? {
            ..._0x3664f8
        } : {
            ..._0x268d66
        };
    }
    step(_0x4559d6) {
        if (this.done) return;
        this.elapsed += _0x4559d6;
        let _0xe145bf = this.duration > 0 ? Math.min(this.elapsed / this.duration, 1) : 1;
        _0xe145bf >= 1 ? (this.current = {
            ...this.to
        }, this.done = true) : this.current = {
            'r': Math.round(this.from.r + (this.to.r - this.from.r) * _0xe145bf),
            'g': Math.round(this.from.g + (this.to.g - this.from.g) * _0xe145bf),
            'b': Math.round(this.from.b + (this.to.b - this.from.b) * _0xe145bf)
        };
    }
}
class ms {
    constructor() {
        this.reset();
    }
    reset() {
        this._colors = {
            [fs]: {
                'r': 0,
                'g': 102,
                'b': 255
            },
            [gs]: {
                'r': 0,
                'g': 68,
                'b': 170
            }
        }, this._actions = {};
    }
    triggerColor(_0x917b29, _0x2cdda0, _0x10a755) {
        let _0x16f9f0 = {
            ...this.getColor(_0x917b29)
        };
        this._actions[_0x917b29] = new vs(_0x16f9f0, _0x2cdda0, _0x10a755), _0x10a755 <= 0 && (this._colors[_0x917b29] = {
            ..._0x2cdda0
        });
    }
    step(_0x15fa55) {
        for (let _0x2d0367 in this._actions) {
            let _0x26a8a0 = this._actions[_0x2d0367];
            _0x26a8a0.step(_0x15fa55), this._colors[_0x2d0367] = {
                ..._0x26a8a0.current
            }, _0x26a8a0.done && delete this._actions[_0x2d0367];
        }
    }
    getColor(_0xb3f1d9) {
        return this._colors[_0xb3f1d9] || {
            'r': 255,
            'g': 255,
            'b': 255
        };
    }
    getHex(_0x32378c) {
        let _0x25f448 = this.getColor(_0x32378c);
        return _0x25f448.r << 16 | _0x25f448.g << 8 | _0x25f448.b;
    }
}

export { fs, gs, vs, ms };
