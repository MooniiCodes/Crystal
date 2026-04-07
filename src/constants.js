import * as Phaser from 'phaser';

let r = Math.round(10240 / 9); // 1138
const n = 640,
    a = 60,
    o = 180;
let h = r / 2 - 150;

function l(_0x2b5712) {
    r = _0x2b5712, h = _0x2b5712 / 2 - 150;
}

const u = 1 / 240,
    c = 11.540004,
    d = 0.9,
    p = 1.916398,
    f = 600,
    g = a,
    v = 65280,
    m = 65535,
    y = "solid",
    x = "hazard",
    _ = "portal_fly",
    w = "portal_cube",
    T = 460;

function b(_0x3ed2c6) {
    return T - _0x3ed2c6;
}
let S = Phaser.BlendModes.ADD,
    E = Phaser.BlendModes.NORMAL;

function setBlendModeAdd(_0x) { S = _0x; }
function setBlendModeNormal(_0x) { E = _0x; }

// stuff from level data used in both ground and, level data of course
const Ji = "solid",
    Qi = "hazard",
    $i = "deco",
    ts = "portal",
    es = "pad",
    is = "ring",
    ss = "trigger",
    rs = "speed",
    ns = "fly",
    as = "cube"

export {
        r, n, a, o, h, l, u, c, d, p, f, g, v, m, y, x, _, w, T, b, S, E, setBlendModeAdd, setBlendModeNormal,
        Ji, Qi, $i, ts, es, is, ss, rs, ns, as
    };
