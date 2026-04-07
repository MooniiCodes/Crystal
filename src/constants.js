import * as Phaser from 'phaser';

let SCREEN_WIDTH = Math.round(10240 / 9); // 1138
const SCREEN_HEIGHT = 640,
    a = 60,
    o = 180;

// the x screen position at which the player stays at 
let PLAYER_GAME_CAMERA_X = SCREEN_WIDTH / 2 - 150;

// changes screen width
function setScreenWidth(newWidth) {
    SCREEN_WIDTH = newWidth,
    PLAYER_GAME_CAMERA_X = newWidth / 2 - 150;
}

const
    u = 1 / 240,
    c = 11.540004,
    d = 0.9,
    JUMP_VELOCITY = 1.916398,
    FLY_CEILING = 600, // ceiling height when entering ship mode, from bottom of screen
    g = a,
    // player colors
    COLOR_GREEN = 0xFF00,
    COLOR_BLUE = 0xFFFF,
    y = "solid",
    x = "hazard",
    _ = "portal_fly",
    w = "portal_cube",
    // the camera clips to this y value
    GROUND_BOUNDS_Y = 460;

function b(_0x3ed2c6) {
    return GROUND_BOUNDS_Y - _0x3ed2c6;
}
let BLEND_ADD = Phaser.BlendModes.ADD,
    BLEND_NORMAL = Phaser.BlendModes.NORMAL;

function setBlendModeAdd(_0x) { BLEND_ADD = _0x; }
function setBlendModeNormal(_0x) { BLEND_NORMAL = _0x; }

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
        SCREEN_WIDTH, SCREEN_HEIGHT, a, o, PLAYER_GAME_CAMERA_X, setScreenWidth, u, c, d, JUMP_VELOCITY, FLY_CEILING, g, COLOR_GREEN, COLOR_BLUE, y, x, _, w, GROUND_BOUNDS_Y, b, BLEND_ADD, BLEND_NORMAL, setBlendModeAdd, setBlendModeNormal,
        Ji, Qi, $i, ts, es, is, ss, rs, ns, as
    };
