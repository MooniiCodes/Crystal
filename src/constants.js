import * as Phaser from 'phaser';

let SCREEN_WIDTH = Math.round(10240 / 9); // 1138
const SCREEN_HEIGHT = 640,
    a = 60, // tile size
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
    // object types
    OBJECT_TYPE_SOLID = "solid",
    OBJECT_TYPE_HAZARD = "hazard",
    OBJECT_TYPE_PORTAL_SHIP = "portal_fly",
    OBJECT_TYPE_PORTAL_CUBE = "portal_cube",
    // the camera clips to this y value
    GROUND_BOUNDS_Y = 460;

// converts a world y coordinate to a screen y coordinate
function worldYToScreenY(worldY) {
    return GROUND_BOUNDS_Y - worldY;
}

let BLEND_ADD = Phaser.BlendModes.ADD,
    BLEND_NORMAL = Phaser.BlendModes.NORMAL;

function setBlendModeAdd(newMode) {
    BLEND_ADD = newMode;
}
function setBlendModeNormal(newMode) {
    BLEND_NORMAL = newMode;
}

// stuff from level data used in both ground and, level data of course
const OBJECT_TYPE_2_SOLID = "solid",
    OBJECT_TYPE_2_HAZARD = "hazard",
    OBJECT_TYPE_2_DECORATIVE = "deco",
    OBJECT_TYPE_2_PORTAL = "portal",
    OBJECT_TYPE_2_PAD = "pad",
    OBJECT_TYPE_2_RING = "ring",
    OBJECT_TYPE_2_TRIGGER = "trigger",
    OBJECT_TYPE_2_SPEED = "speed",
    OBJECT_TYPE_2_FLY = "fly",
    OBJECT_TYPE_2_CUBE = "cube"

export {
        SCREEN_WIDTH, SCREEN_HEIGHT, a, o, PLAYER_GAME_CAMERA_X, setScreenWidth, u, c, d, JUMP_VELOCITY, FLY_CEILING, g, COLOR_GREEN, COLOR_BLUE, OBJECT_TYPE_SOLID, OBJECT_TYPE_HAZARD, OBJECT_TYPE_PORTAL_SHIP, OBJECT_TYPE_PORTAL_CUBE, GROUND_BOUNDS_Y, worldYToScreenY, BLEND_ADD, BLEND_NORMAL, setBlendModeAdd, setBlendModeNormal,
        OBJECT_TYPE_2_SOLID, OBJECT_TYPE_2_HAZARD, OBJECT_TYPE_2_DECORATIVE, OBJECT_TYPE_2_PORTAL, OBJECT_TYPE_2_PAD, OBJECT_TYPE_2_RING, OBJECT_TYPE_2_TRIGGER, OBJECT_TYPE_2_SPEED, OBJECT_TYPE_2_FLY, OBJECT_TYPE_2_CUBE
    };
