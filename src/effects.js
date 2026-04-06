/*
    effects like the ring effect
*/
import { r, S } from './constants.js';

function _s(_0xae9c8f, _0xe5190e, _0x399b97, _0x3f3165, _0x1f56bc, _0x560f20, _0xb730d4 = false, _0x550b4a = false, _0x4ee8d6 = 16777215) {
    const _0x18a510 = _0xae9c8f.add.graphics().setScrollFactor(0).setDepth(55).setBlendMode(S),
        _0x3dff3a = {
            'r': _0x3f3165,
            't': 0
        };
    _0xae9c8f.tweens.add({
        'targets': _0x3dff3a,
        'r': _0x1f56bc,
        't': 1,
        'duration': _0x560f20,
        'ease': _0xb730d4 && !_0x550b4a ? 'Quad.Out' : "Linear",
        'onUpdate': () => {
            const _0x25e581 = _0x3dff3a.t,
                _0x344671 = _0x550b4a ? _0x25e581 < 0.5 ? 2 * _0x25e581 : 2 * (1 - _0x25e581) : 1 - _0x25e581;
            _0x18a510.clear(), _0xb730d4 ? (_0x18a510.fillStyle(_0x4ee8d6, Math.max(0, _0x344671)), _0x18a510.fillCircle(_0xe5190e, _0x399b97, _0x3dff3a.r)) : (_0x18a510.lineStyle(4, _0x4ee8d6, Math.max(0, _0x344671)), _0x18a510.strokeCircle(_0xe5190e, _0x399b97, _0x3dff3a.r));
        },
        'onComplete': () => _0x18a510.destroy()
    });
}

function ws(_0x13c75c, _0x23c5aa = 16777215, _0x52bb5b = 16777215) {
    const _0x2076d4 = 200,
        _0x4eb200 = _0x2076d4 + (r - 400) * Math.random(),
        _0x126811 = _0x2076d4 + 240 * Math.random();
    _s(_0x13c75c, _0x4eb200, _0x126811, 40, 140 + 60 * Math.random(), 500, true, true, _0x52bb5b), _0x13c75c.add.particles(_0x4eb200, _0x126811, "GJ_WebSheet", {
        'frame': "square.png",
        'speed': {
            'min': 520,
            'max': 920
        },
        'angle': {
            'min': 0,
            'max': 360
        },
        'scale': {
            'start': 0.4,
            'end': 0.13
        },
        'alpha': {
            'start': 1,
            'end': 0
        },
        'lifespan': {
            'min': 0,
            'max': 500
        },
        'stopAfter': 25,
        'blendMode': S,
        'tint': _0x23c5aa,
        'x': {
            'min': -20,
            'max': 20
        },
        'y': {
            'min': -20,
            'max': 20
        }
    }).setScrollFactor(0).setDepth(57);
}

export { _s, ws };
