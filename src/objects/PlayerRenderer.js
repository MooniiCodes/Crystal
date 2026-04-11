/*
    visual helper for player object
*/
import * as Phaser from 'phaser';
import { findAtlasFrame } from '../systems/GameState.js';

// a smooth fading trailing effect for the player (behind a point)
class StreakClass {
    constructor(scene, UNKNOWN_STRING_streak_01, fadeTime, minSegDist, strokeWidth, maxSegments, color = 0xFFFFFF, opacity = 1) {
        this._color = color,
        this._opacity = opacity,
        this._fadeDelta = 1 / fadeTime,
        this._minSegSq = minSegDist * minSegDist,
        this._maxSeg = maxSegments,
        this._maxPoints = 5 * Math.floor(60 * fadeTime + 2),
        this._stroke = strokeWidth,
        this._pts = [],
        this._posR = {
            x: 0,
            y: 0
        },
        this._posInit = false,
        this._active = false,
        this._gfx = scene.add.graphics(),
        this._gfx.setBlendMode(Phaser.BlendModes.ADD);
    }
    addToContainer(container, depth) {
        container.add(this._gfx),
        this._gfx.setDepth(depth);
    }
    setPosition(x, y) {
        this._posR.x = x,
        this._posR.y = y,
        this._posInit = true;
    }
    start() {
        this._active = true;
    }
    stop() {
        this._active = false;
    }
    reset() {
        this._pts = [],
        this._posInit = false,
        this._gfx.clear();
    }
    update(deltaTime) {
        if (!this._posInit) return void this._gfx.clear();

        const fadeDelta = deltaTime * this._fadeDelta;
        
        // update points, remove old ones
        let cursor = 0;
        for (let i = 0; i < this._pts.length; i++)
            this._pts[i].state -= fadeDelta,

            this._pts[i].state > 0 && (
                cursor !== i && (
                    this._pts[cursor] = this._pts[i]
                ),
                cursor++
            );

        // add new point if moved far enough since last one, and not too many points already
        if (this._pts.length = cursor, this._active && this._pts.length < this._maxPoints) {
            const count = this._pts.length;
            let shouldAdd = true;

            if (count > 0) {
                const last = this._pts[count - 1],
                    dx = this._posR.x - last.x,
                    dy = this._posR.y - last.y,
                    distanceSq = dx * dx + dy * dy;
                if (this._maxSeg > 0 && Math.sqrt(distanceSq) > this._maxSeg)
                    this._pts.length = 0;
                // else if
                else { if (distanceSq < this._minSegSq)
                    shouldAdd = false;
                    else { if (count > 1) {
                            const prev = this._pts[count - 2],
                                dx2 = this._posR.x - prev.x,
                                dy2 = this._posR.y - prev.y;
                            dx2 * dx2 + dy2 * dy2 < 2 * this._minSegSq && (
                                shouldAdd = false
                            );
                        }
                    }
                }
            }
            
            shouldAdd && this._pts.push({
                x: this._posR.x,
                y: this._posR.y,
                state: 1
            });
        }

        // draw
        this._gfx.clear();
        const numPoints = this._pts.length;

        if (!(numPoints < 2))
            for (let i = 0; i < numPoints - 1; i++) {
                const a = this._pts[i],
                    b = this._pts[i + 1],
                    alpha = 0.5 * (a.state + b.state) * this._opacity;
                this._gfx.lineStyle(this._stroke, this._color, alpha),
                this._gfx.lineBetween(a.x, a.y, b.x, b.y);
            }
    }
}

// creates different layers for different player sprites
function createSpriteLayer(scene, x, y, frame, depth, visible) {
    let frameMeta = findAtlasFrame(scene, frame);
    if (!frameMeta) return null;

    let sprite = scene.add.image(x, y, frameMeta.atlas, frameMeta.frame);
    return sprite.setDepth(depth),
    sprite.setVisible(visible), {
        sprite: sprite
    };
}
export { StreakClass, createSpriteLayer };
