import pako from 'pako';
import { g, v, y, x, _, Ji, Qi, $i, ts, es, is, ss, rs, ns, as } from '../constants.js';

function Ki(_0x493296) {
    let _0x8d0014 = _0x493296.split(','),
        _0x20f60e = {};
    for (let _0x4ea5b3 = 0; _0x4ea5b3 + 1 < _0x8d0014.length; _0x4ea5b3 += 2) {
        let _0x323e77 = parseInt(_0x8d0014[_0x4ea5b3], 10),
            _0x557e5c = _0x8d0014[_0x4ea5b3 + 1];
        _0x20f60e[_0x323e77] = _0x557e5c;
    }
    let _0x382b1e = parseInt(_0x20f60e[1] || '0', 10);
    return 0 === _0x382b1e ? null : {
        'id': _0x382b1e,
        'x': parseFloat(_0x20f60e[2] || '0'),
        'y': parseFloat(_0x20f60e[3] || '0'),
        'flipX': '1' === _0x20f60e[4],
        'flipY': '1' === _0x20f60e[5],
        'rot': parseFloat(_0x20f60e[6] || '0'),
        'scale': parseFloat(_0x20f60e[32] || '1'),
        'zLayer': parseInt(_0x20f60e[24] || '0', 10),
        'zOrder': parseInt(_0x20f60e[25] || '0', 10),
        'groups': _0x20f60e[57] || '',
        'color1': parseInt(_0x20f60e[21] || '0', 10),
        'color2': parseInt(_0x20f60e[22] || '0', 10),
        '_raw': _0x20f60e
    };
}

function Zi(_0x38fc47) {
    let _0x103676 = function(_0x510333) {
            let _0x48af37 = function(_0x597b77) {
                    let _0x4e5b39 = _0x597b77.replace(/-/g, '+').replace(/_/g, '/');
                    for (; _0x4e5b39.length % 4 != 0;) _0x4e5b39 += '=';
                    return _0x4e5b39;
                }(_0x510333.trim()),
                _0x2250c1 = atob(_0x48af37),
                _0xf8b0b1 = new Uint8Array(_0x2250c1.length);
            for (let _0x2490cf = 0; _0x2490cf < _0x2250c1.length; _0x2490cf++) _0xf8b0b1[_0x2490cf] = _0x2250c1.charCodeAt(_0x2490cf);
            let _0xf5265c = pako.inflate(_0xf8b0b1);
            return new TextDecoder().decode(_0xf5265c);
        }(_0x38fc47),
        _0x474b4a = _0x103676.split(';'),
        _0x1e582e = _0x474b4a.length > 0 ? _0x474b4a[0] : '',
        _0x2db146 = [];
    for (let _0x398bdc = 1; _0x398bdc < _0x474b4a.length; _0x398bdc++) {
        if (0 === _0x474b4a[_0x398bdc].length) continue;
        let _0x3f3897 = Ki(_0x474b4a[_0x398bdc]);
        _0x3f3897 && _0x2db146.push(_0x3f3897);
    }
    return {
        'settings': _0x1e582e,
        'objects': _0x2db146
    };
}
const os = {
        1: {
            'type': Ji,
            'frame': "square_01_001.png",
            'gridW': 1,
            'gridH': 1
        },
        2: {
            'type': Ji,
            'frame': "square_02_001.png",
            'gridW': 1,
            'gridH': 1
        },
        3: {
            'type': Ji,
            'frame': "square_03_001.png",
            'gridW': 1,
            'gridH': 1
        },
        4: {
            'type': Ji,
            'frame': "square_04_001.png",
            'gridW': 1,
            'gridH': 1
        },
        5: {
            'type': $i,
            'frame': 'square_05_001.png',
            'gridW': 1,
            'gridH': 1
        },
        6: {
            'type': Ji,
            'frame': "square_06_001.png",
            'gridW': 1,
            'gridH': 1
        },
        7: {
            'type': Ji,
            'frame': "square_07_001.png",
            'gridW': 1,
            'gridH': 1
        },
        83: {
            'type': Ji,
            'frame': "square_08_001.png",
            'gridW': 1,
            'gridH': 1
        },
        40: {
            'type': Ji,
            'frame': "plank_01_001.png",
            'gridW': 1,
            'gridH': 0.5,
            'children': [{
                'frame': "plank_01_color_001.png",
                'tint': 0
            }]
        },
        8: {
            'type': Qi,
            'frame': 'spike_01_001.png',
            'gridW': 1,
            'gridH': 1,
            'spriteW': 30,
            'spriteH': 30,
            'hitboxScaleX': 0.2,
            'hitboxScaleY': 0.4
        },
        39: {
            'type': Qi,
            'frame': "spike_02_001.png",
            'gridW': 1,
            'gridH': 1,
            'spriteW': 30,
            'spriteH': 14,
            'hitboxScaleX': 0.2,
            'hitboxScaleY': 0.4
        },
        103: {
            'type': Qi,
            'frame': 'spike_03_001.png',
            'gridW': 0.5,
            'gridH': 0.5,
            'spriteW': 20,
            'spriteH': 19,
            'hitboxScaleX': 0.2,
            'hitboxScaleY': 0.4
        },
        392: {
            'type': Qi,
            'frame': "spike_04_001.png",
            'gridW': 0.5,
            'gridH': 0.5,
            'spriteW': 13,
            'spriteH': 12,
            'hitboxScaleX': 0.2,
            'hitboxScaleY': 0.4
        },
        9: {
            'type': Qi,
            'frame': "pit_01_001.png",
            'gridW': 0,
            'gridH': 0,
            'black': true,
            'spriteW': 30,
            'spriteH': 27,
            'hitboxScaleX': 0.3,
            'hitboxScaleY': 0.4,
            'randomFrames': ["pit_01_001.png", 'pit_02_001.png', "pit_03_001.png"]
        },
        61: {
            'type': Qi,
            'frame': 'pit_04_001.png',
            'gridW': 0,
            'gridH': 0,
            'black': true,
            'spriteW': 30,
            'spriteH': 18,
            'hitboxScaleX': 0.3,
            'hitboxScaleY': 0.4
        },
        10: {
            'type': ts,
            'frame': "portal_01_front_001.png",
            'gridW': 1,
            'gridH': 3,
            'sub': 'gravity_flip'
        },
        11: {
            'type': ts,
            'frame': 'portal_02_front_001.png',
            'gridW': 1,
            'gridH': 3,
            'sub': "gravity_normal"
        },
        12: {
            'type': ts,
            'frame': "portal_03_front_001.png",
            'gridW': 1,
            'gridH': 3,
            'sub': as,
            'portalParticle': true,
            'portalParticleColor': 5111552
        },
        13: {
            'type': ts,
            'frame': "portal_04_front_001.png",
            'gridW': 1,
            'gridH': 3,
            'sub': ns,
            'portalParticle': true,
            'portalParticleColor': 16711935
        },
        45: {
            'type': ts,
            'frame': "portal_05_front_001.png",
            'gridW': 1,
            'gridH': 3,
            'sub': ns
        },
        46: {
            'type': ts,
            'frame': "portal_06_front_001.png",
            'gridW': 1,
            'gridH': 3,
            'sub': as
        },
        47: {
            'type': ts,
            'frame': 'portal_07_front_001.png',
            'gridW': 1,
            'gridH': 3,
            'sub': ns
        },
        200: {
            'type': rs,
            'frame': "portal_09_front_001.png",
            'gridW': 1,
            'gridH': 3,
            'sub': "slow"
        },
        201: {
            'type': rs,
            'frame': "portal_10_front_001.png",
            'gridW': 1,
            'gridH': 3,
            'sub': "normal"
        },
        202: {
            'type': rs,
            'frame': "portal_08_front_001.png",
            'gridW': 1,
            'gridH': 3,
            'sub': "fast"
        },
        203: {
            'type': rs,
            'frame': "portal_11_front_001.png",
            'gridW': 1,
            'gridH': 3,
            'sub': "very_fast"
        },
        35: {
            'type': es,
            'frame': "bump_01_001.png",
            'gridW': 1,
            'gridH': 1
        },
        67: {
            'type': es,
            'frame': "bump_02_001.png",
            'gridW': 1,
            'gridH': 1
        },
        140: {
            'type': es,
            'frame': "bump_03_001.png",
            'gridW': 1,
            'gridH': 1
        },
        36: {
            'type': is,
            'frame': 'ring_01_001.png',
            'gridW': 1,
            'gridH': 1
        },
        84: {
            'type': is,
            'frame': 'ring_02_001.png',
            'gridW': 1,
            'gridH': 1
        },
        141: {
            'type': is,
            'frame': "ring_03_001.png",
            'gridW': 1,
            'gridH': 1
        },
        62: {
            'type': Ji,
            'frame': "square_b_01_001.png",
            'gridW': 1,
            'gridH': 1
        },
        63: {
            'type': Ji,
            'frame': "square_b_02_001.png",
            'gridW': 1,
            'gridH': 1
        },
        64: {
            'type': Ji,
            'frame': "square_b_03_001.png",
            'gridW': 1,
            'gridH': 1
        },
        65: {
            'type': Ji,
            'frame': "square_b_04_001.png",
            'gridW': 1,
            'gridH': 1
        },
        66: {
            'type': Ji,
            'frame': "square_b_05_001.png",
            'gridW': 1,
            'gridH': 1
        },
        68: {
            'type': Ji,
            'frame': 'square_b_06_001.png',
            'gridW': 1,
            'gridH': 1
        },
        195: {
            'type': Ji,
            'frame': "square_01_001.png",
            'gridW': 0.5,
            'gridH': 0.5
        },
        196: {
            'type': Ji,
            'frame': "plank_01_001.png",
            'gridW': 0.5,
            'gridH': 0.25
        },
        48: {
            'type': $i,
            'frame': 'd_cloud_01_001.png',
            'gridW': 0,
            'gridH': 0
        },
        49: {
            'type': $i,
            'frame': 'd_cloud_02_001.png',
            'gridW': 0,
            'gridH': 0
        },
        129: {
            'type': $i,
            'frame': "d_cloud_03_001.png",
            'gridW': 0,
            'gridH': 0
        },
        130: {
            'type': $i,
            'frame': 'd_cloud_04_001.png',
            'gridW': 0,
            'gridH': 0
        },
        131: {
            'type': $i,
            'frame': "d_cloud_05_001.png",
            'gridW': 0,
            'gridH': 0
        },
        50: {
            'type': $i,
            'frame': "d_ball_01_001.png",
            'gridW': 0,
            'gridH': 0
        },
        51: {
            'type': $i,
            'frame': "d_ball_02_001.png",
            'gridW': 0,
            'gridH': 0
        },
        52: {
            'type': $i,
            'frame': 'd_ball_03_001.png',
            'gridW': 0,
            'gridH': 0
        },
        53: {
            'type': $i,
            'frame': "d_ball_04_001.png",
            'gridW': 0,
            'gridH': 0
        },
        54: {
            'type': $i,
            'frame': 'd_ball_05_001.png',
            'gridW': 0,
            'gridH': 0
        },
        55: {
            'type': $i,
            'frame': 'd_ball_06_001.png',
            'gridW': 0,
            'gridH': 0
        },
        56: {
            'type': $i,
            'frame': "d_ball_07_001.png",
            'gridW': 0,
            'gridH': 0
        },
        57: {
            'type': $i,
            'frame': 'd_ball_08_001.png',
            'gridW': 0,
            'gridH': 0
        },
        58: {
            'type': $i,
            'frame': 'd_ball_09_001.png',
            'gridW': 0,
            'gridH': 0
        },
        60: {
            'type': $i,
            'frame': "d_ball_06_001.png",
            'gridW': 0,
            'gridH': 0
        },
        125: {
            'type': $i,
            'frame': "d_smallBall_01_001.png",
            'gridW': 0,
            'gridH': 0
        },
        126: {
            'type': $i,
            'frame': "d_smallBall_02_001.png",
            'gridW': 0,
            'gridH': 0
        },
        127: {
            'type': $i,
            'frame': 'd_smallBall_03_001.png',
            'gridW': 0,
            'gridH': 0
        },
        128: {
            'type': $i,
            'frame': "d_smallBall_04_001.png",
            'gridW': 0,
            'gridH': 0
        },
        145: {
            'type': $i,
            'frame': 'd_smallBall_05_001.png',
            'gridW': 0,
            'gridH': 0
        },
        41: {
            'type': $i,
            'frame': "chain_01_001.png",
            'gridW': 0,
            'gridH': 0,
            'blend': "additive",
            'tint': v
        },
        123: {
            'type': $i,
            'frame': "d_thorn_01_001.png",
            'gridW': 0,
            'gridH': 0
        },
        124: {
            'type': $i,
            'frame': "d_thorn_02_001.png",
            'gridW': 0,
            'gridH': 0
        },
        15: {
            'type': $i,
            'frame': "rod_01_001.png",
            'gridW': 0,
            'gridH': 0,
            'z': -6,
            'children': [{
                'frame': 'rod_ball_01_001.png',
                'localDy': -62,
                'blend': "additive",
                'tint': v,
                'z': 1,
                'audioScale': true
            }]
        },
        16: {
            'type': $i,
            'frame': 'rod_02_001.png',
            'gridW': 0,
            'gridH': 0,
            'z': -6,
            'children': [{
                'frame': "rod_ball_01_001.png",
                'localDy': -46.5,
                'blend': "additive",
                'tint': v,
                'z': 1,
                'audioScale': true
            }]
        },
        17: {
            'type': $i,
            'frame': 'rod_03_001.png',
            'gridW': 0,
            'gridH': 0,
            'z': -6,
            'children': [{
                'frame': "rod_ball_01_001.png",
                'localDy': -32.5,
                'blend': "additive",
                'tint': v,
                'z': 1,
                'audioScale': true
            }]
        },
        132: {
            'type': $i,
            'frame': "d_arrow_01_001.png",
            'gridW': 0,
            'gridH': 0
        },
        133: {
            'type': $i,
            'frame': "d_exmark_01_001.png",
            'gridW': 0,
            'gridH': 0
        },
        136: {
            'type': $i,
            'frame': "d_qmark_01_001.png",
            'gridW': 0,
            'gridH': 0
        },
        151: {
            'type': $i,
            'frame': "d_spikeart_01_001.png",
            'gridW': 0,
            'gridH': 0,
            'blend': "additive",
            'tint': v
        },
        152: {
            'type': $i,
            'frame': 'd_spikeart_02_001.png',
            'gridW': 0,
            'gridH': 0,
            'blend': "additive",
            'tint': v
        },
        153: {
            'type': $i,
            'frame': "d_spikeart_03_001.png",
            'gridW': 0,
            'gridH': 0,
            'blend': "additive",
            'tint': v
        },
        88: {
            'type': Qi,
            'frame': 'sawblade_01_001.png',
            'gridW': 1,
            'gridH': 1
        },
        89: {
            'type': Qi,
            'frame': "sawblade_02_001.png",
            'gridW': 2,
            'gridH': 2
        },
        98: {
            'type': Qi,
            'frame': "sawblade_03_001.png",
            'gridW': 3,
            'gridH': 3
        },
        18: {
            'type': $i,
            'frame': "d_spikes_01_001.png",
            'gridW': 0,
            'gridH': 0,
            'blend': "additive",
            'tint': v
        },
        19: {
            'type': $i,
            'frame': "d_spikes_02_001.png",
            'gridW': 0,
            'gridH': 0,
            'blend': "additive",
            'tint': v
        },
        20: {
            'type': $i,
            'frame': "d_spikes_03_001.png",
            'gridW': 0,
            'gridH': 0,
            'blend': "additive",
            'tint': v
        },
        21: {
            'type': $i,
            'frame': 'd_spikes_04_001.png',
            'gridW': 0,
            'gridH': 0,
            'blend': 'additive',
            'tint': v
        },
        135: {
            'type': $i,
            'frame': "fakeSpike_01_001.png",
            'gridW': 0,
            'gridH': 0,
            'black': true
        },
        1889: {
            'type': $i,
            'frame': "fakeSpike_01_001.png",
            'gridW': 0,
            'gridH': 0,
            'black': true
        },
        1890: {
            'type': $i,
            'frame': "fakeSpike_02_001.png",
            'gridW': 0,
            'gridH': 0,
            'black': true
        },
        1891: {
            'type': $i,
            'frame': "fakeSpike_03_001.png",
            'gridW': 0,
            'gridH': 0,
            'black': true
        },
        1892: {
            'type': $i,
            'frame': "fakeSpike_04_001.png",
            'gridW': 0,
            'gridH': 0,
            'black': true
        },
        150: {
            'type': $i,
            'frame': 'd_cross_01_001.png',
            'gridW': 0,
            'gridH': 0
        },
        134: {
            'type': $i,
            'frame': "d_largeSquare_01_001.png",
            'gridW': 0,
            'gridH': 0
        },
        146: {
            'type': $i,
            'frame': "d_largeSquare_02_001.png",
            'gridW': 0,
            'gridH': 0
        },
        138: {
            'type': $i,
            'frame': "d_art_01_001.png",
            'gridW': 0,
            'gridH': 0
        },
        137: {
            'type': $i,
            'frame': "brick_02_001.png",
            'gridW': 0,
            'gridH': 0
        },
        139: {
            'type': $i,
            'frame': "d_brick_01_001.png",
            'gridW': 0,
            'gridH': 0
        },
        157: {
            'type': $i,
            'frame': "d_wave_01_001.png",
            'gridW': 0,
            'gridH': 0
        },
        158: {
            'type': $i,
            'frame': 'd_wave_02_001.png',
            'gridW': 0,
            'gridH': 0
        },
        159: {
            'type': $i,
            'frame': "d_wave_03_001.png",
            'gridW': 0,
            'gridH': 0
        },
        143: {
            'type': $i,
            'frame': 'd_circle_01_001.png',
            'gridW': 0,
            'gridH': 0
        },
        144: {
            'type': $i,
            'frame': 'd_circle_02_001.png',
            'gridW': 0,
            'gridH': 0
        },
        22: {
            'type': ss,
            'frame': null,
            'gridW': 0,
            'gridH': 0,
            'enterEffect': 0
        },
        23: {
            'type': ss,
            'frame': null,
            'gridW': 0,
            'gridH': 0,
            'enterEffect': 1
        },
        24: {
            'type': ss,
            'frame': null,
            'gridW': 0,
            'gridH': 0,
            'enterEffect': 2
        },
        25: {
            'type': ss,
            'frame': null,
            'gridW': 0,
            'gridH': 0,
            'enterEffect': 3
        },
        26: {
            'type': ss,
            'frame': null,
            'gridW': 0,
            'gridH': 0,
            'enterEffect': 4
        },
        27: {
            'type': ss,
            'frame': null,
            'gridW': 0,
            'gridH': 0,
            'enterEffect': 5
        },
        28: {
            'type': ss,
            'frame': null,
            'gridW': 0,
            'gridH': 0,
            'enterEffect': 6
        },
        29: {
            'type': ss,
            'frame': null,
            'gridW': 0,
            'gridH': 0,
            'colorIdx': 1000
        },
        30: {
            'type': ss,
            'frame': null,
            'gridW': 0,
            'gridH': 0,
            'colorIdx': 1001
        },
        104: {
            'type': ss,
            'frame': null,
            'gridW': 0,
            'gridH': 0
        },
        105: {
            'type': ss,
            'frame': null,
            'gridW': 0,
            'gridH': 0
        },
        221: {
            'type': ss,
            'frame': null,
            'gridW': 0,
            'gridH': 0
        },
        899: {
            'type': ss,
            'frame': null,
            'gridW': 0,
            'gridH': 0
        },
        901: {
            'type': ss,
            'frame': null,
            'gridW': 0,
            'gridH': 0
        },
        1006: {
            'type': ss,
            'frame': null,
            'gridW': 0,
            'gridH': 0
        },
        44: {
            'type': $i,
            'frame': null,
            'gridW': 0,
            'gridH': 0
        },
        142: {
            'type': $i,
            'frame': "secretCoin_01_001.png",
            'gridW': 1,
            'gridH': 1
        },
        1329: {
            'type': $i,
            'frame': "secretCoin_2_01_001.png",
            'gridW': 1,
            'gridH': 1
        }
    },
    hs = [1, 2, 3, 4, 6, 7, 83, 8, 39, 103, 392, 35, 36, 40, 140, 141, 62, 65, 66, 68, 195, 196];
for (let As of hs) os[As] && (os[As].glow = true);

function ls(_0x4339a6) {
    return os[_0x4339a6] || null;
}
export { Ki, Zi, ls, os };
