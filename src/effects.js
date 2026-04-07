/*
    effects like the ring effect
*/
import { SCREEN_WIDTH, BLEND_ADD, BLEND_NORMAL } from './constants.js';

// an expanding circle effect (ring or filled), shows up when completing level
/* params:
    scene: the scene to add the effect to
    x, y: the center of the effect
    startRadius, endRadius: the starting and ending radius of the circle
    duration: how long the effect lasts in ms
    filled: whether the circle is filled or just an outline
    pingPong: TODO
    color: the color of the effect in hex (default: white)
*/
function emitCircleEffect(scene, x, y, startRadius, endRadius, duration, filled = false, pingPong = false, color = 0xFFFFFF) {
    const thisGraphics = scene.add.graphics()
        .setScrollFactor(0)
        .setDepth(55)
        .setBlendMode(BLEND_ADD),
        
        state = {
            r: startRadius,
            t: 0
        };

    scene.tweens.add({
        targets: state,
        r: endRadius,
        t: 1,
        duration: duration,
        ease: filled && !pingPong ? 'Quad.Out' : "Linear",
        onUpdate: () => {
            const progress = state.t,
                alpha = pingPong ? progress < 0.5 ? 2 * progress : 2 * (1 - progress) : 1 - progress;
            thisGraphics.clear(),
            
            filled ? (
                thisGraphics.fillStyle(color, Math.max(0, alpha)),
                thisGraphics.fillCircle(x, y, state.r)
            ) : (
                thisGraphics.lineStyle(4, color, Math.max(0, alpha)),
                thisGraphics.strokeCircle(x, y, state.r)
            );
        },
        onComplete: () => thisGraphics.destroy()
    });
}

// a burst of circles, shows up after the win animation plays
function emitWinBurst(scene, squareColor = 0xFFFFFF, colorCircle = 0xFFFFFF) {
    const margin = 200,
        burstX = margin + (SCREEN_WIDTH - 400) * Math.random(),
        burstY = margin + 240 * Math.random();
        
    emitCircleEffect(scene, burstX, burstY, 40, 140 + 60 * Math.random(), 500, true, true, colorCircle),
    
    // the particles that spawn inside the circle burst
    scene.add.particles(burstX, burstY, "GJ_WebSheet", {
        frame: "square.png",
        speed: {
            min: 520,
            max: 920
        },
        angle: {
            min: 0,
            max: 360
        },
        scale: {
            start: 0.4,
            end: 0.13
        },
        alpha: {
            start: 1,
            end: 0
        },
        lifespan: {
            min: 0,
            max: 500
        },
        stopAfter: 25,
        blendMode: BLEND_ADD,
        tint: squareColor,
        x: {
            min: -20,
            max: 20
        },
        y: {
            min: -20,
            max: 20
        }
    }).setScrollFactor(0).setDepth(57);
}

export { emitCircleEffect, emitWinBurst };
