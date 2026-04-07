/*
    manages colors and such
*/

// enums
const ID_BACKGROUND_COLOR = 1000,
    ID_GROUND_COLOR = 1001;

// color transition class that interpolates between two colors over a duration
class ColorTransition {
    // from & to are colors
    constructor(from, to, duration) {
        this.from = {
            ...from
        },
        this.to = {
            ...to
        },
        this.duration = duration,
        this.elapsed = 0,
        this.done = duration <= 0,
        this.current = duration <= 0 ? { ...to } : { ...from };
    }
    step(deltaTime) {
        if (this.done) return;
        this.elapsed += deltaTime;
        let time = this.duration > 0 ? Math.min(this.elapsed / this.duration, 1) : 1;
        // nasty looking if else
        time >= 1 ? (
            this.current = { ...this.to }, 
            this.done = true
        )
        : this.current = {
            'r': Math.round(this.from.r + (this.to.r - this.from.r) * time),
            'g': Math.round(this.from.g + (this.to.g - this.from.g) * time),
            'b': Math.round(this.from.b + (this.to.b - this.from.b) * time)
        };
    }
}

// ColorManager class
class ColorManager {
    constructor() {
        this.reset();
    }
    reset() {
        this._colors = {
            // the default geometry dash blues we all luv 💖
            [ID_BACKGROUND_COLOR]: {
                r: 0, g: 102, b: 255
            },
            [ID_GROUND_COLOR]: {
                r: 0, g: 68, b: 170
            }
        },
        this._actions = {};
    }
    // triggers a color transition for a color id, from its current color to the target color, over the duration
    triggerColor(colorId, targetColor, duration) {
        // the color colorId corresponds to
        let from = { ...this.getColor(colorId) };
        this._actions[colorId] = new ColorTransition(from, targetColor, duration),
        duration <= 0 && (this._colors[colorId] = {
            ...targetColor
        });
    }
    step(deltaTime) {
        for (let colorId in this._actions) {
            let transition = this._actions[colorId];
            transition.step(deltaTime), this._colors[colorId] = {
                ...transition.current
            }, transition.done && delete this._actions[colorId];
        }
    }
    // get color by id, returns white if color doesn't exist
    getColor(colorId) {
        return this._colors[colorId] || {
            'r': 255,
            'g': 255,
            'b': 255
        };
    }
    // gets the color as a hex
    getHex(colorId) {
        let color = this.getColor(colorId);
        return color.r << 16 | color.g << 8 | color.b;
    }
}

export { ID_BACKGROUND_COLOR, ID_GROUND_COLOR, ColorTransition, ColorManager };
