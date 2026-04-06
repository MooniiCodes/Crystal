class M {
    constructor() {
        this.reset();
    }
    reset() {
        this.y = 30, this.lastY = 30, this.lastGroundPosY = 30, this.yVelocity = 0, this.onGround = true, this.canJump = true, this.isJumping = false, this.gravityFlipped = false, this.isFlying = false, this.wasBoosted = false, this.collideTop = 0, this.collideBottom = 0, this.onCeiling = false, this.upKeyDown = false, this.upKeyPressed = false, this.isDead = false;
    }
}
const P = ["GJ_WebSheet"];

function R(_0xfe584, _0x2da093) {
    for (let _0x15819b of P)
        if (_0xfe584.textures.exists(_0x15819b)) {
            if (_0xfe584.textures.get(_0x15819b).has(_0x2da093)) return {
                'atlas': _0x15819b,
                'frame': _0x2da093
            };
        } return null;
}

function L(_0x56b804, _0x310a42, _0x71aad, _0x4272eb) {
    let _0x4a4e1f = R(_0x56b804, _0x4272eb);
    return _0x4a4e1f ? _0x56b804.add.image(_0x310a42, _0x71aad, _0x4a4e1f.atlas, _0x4a4e1f.frame) : _0x56b804.textures.exists(_0x4272eb) ? _0x56b804.add.image(_0x310a42, _0x71aad, _0x4272eb) : null;
}
class O {
    constructor(_0x237587, _0x2693e7, _0x3e6e3c, _0x4adabc, _0x36363d) {
        this.type = _0x237587, this.x = _0x2693e7, this.y = _0x3e6e3c, this.w = _0x4adabc, this.h = _0x36363d, this.activated = false;
    }
}

export { M, P, R, L, O };
