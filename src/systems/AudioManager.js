/*
    an audio that handles music, sfx, etc.
*/
class ys {
    constructor(_0x3627e5) {
        this._scene = _0x3627e5, this._music = null, this._userMusicVol = _0x3627e5.game.registry.get("userMusicVol") ?? 1, this._meteringEnabled = false, this._analyser = null, this._meterBuffer = null, this._meterValue = 0.1, this._lastAudio = 0.1, this._lastPeak = 0, this._silenceCounter = 0;
    }
    _effectiveVolume() {
        return 0.8 * this._userMusicVol;
    }
    startMusic() {
        this._music && (this._music.stop(), this._music.destroy()), this._music = this._scene.sound.add("stereo_madness", {
            'loop': true,
            'volume': this._effectiveVolume()
        }), this._music.play(), this._setupAnalyser();
    }
    stopMusic() {
        this._music && this._music.stop();
    }
    pauseMusic() {
        this._music && this._music.isPlaying && this._music.pause();
    }
    resumeMusic() {
        this._music && this._music.isPaused && this._music.resume();
    }
    getUserMusicVolume() {
        return this._userMusicVol;
    }
    setUserMusicVolume(_0x1fad3d) {
        this._userMusicVol = _0x1fad3d, this._scene.game.registry.set("userMusicVol", _0x1fad3d), this._music && (this._music.volume = this._effectiveVolume());
    }
    getMusicVolume() {
        return this._effectiveVolume();
    }
    setMusicVolume(_0x2ddbf6) {
        this.setUserMusicVolume(_0x2ddbf6 / 0.8);
    }
    fadeInMusic(_0x3eff28 = 1000) {
        this._music && (this._music.stop(), this._music.destroy()), this._music = this._scene.sound.add('stereo_madness', {
            'loop': true,
            'volume': 0
        }), this._music.play(), this._setupAnalyser(), this._scene.tweens.add({
            'targets': this._music,
            'volume': this._effectiveVolume(),
            duration: _0x3eff28
        });
    }
    fadeOutMusic(_0x43835d = 1500) {
        this._music && this._music.isPlaying && (this._music.setLoop(false), this._scene.tweens.add({
            'targets': this._music,
            'volume': 0,
            duration: _0x43835d,
            onComplete: () => {
                this._music && this._music.stop();
            }
        }));
    }
    playEffect(_0x344122, _0x20f8e7 = {}) {
        const _0x3b9c6b = undefined !== this._scene._sfxVolume ? this._scene._sfxVolume : 1;
        _0x20f8e7.volume = (_0x20f8e7.volume || 1) * _0x3b9c6b, this._scene.sound.play(_0x344122, _0x20f8e7);
    }
    _setupAnalyser() {
        const _0xc0d316 = this._scene.sound.context;
        _0xc0d316 && (this._analyser = _0xc0d316.createAnalyser(), this._analyser.fftSize = 2048, this._meterBuffer = new Float32Array(this._analyser.fftSize), this._scene.sound.masterVolumeNode.connect(this._analyser), this._meteringEnabled = true);
    }
    update(_0x34aeef) {
        if (!this._meteringEnabled || !this._analyser) return;
        this._analyser.getFloatTimeDomainData(this._meterBuffer);
        let _0x3059f5 = 0;
        for (let _0x462ecd = 0; _0x462ecd < this._meterBuffer.length; _0x462ecd++) {
            let _0x129c51 = Math.abs(this._meterBuffer[_0x462ecd]);
            _0x129c51 > _0x3059f5 && (_0x3059f5 = _0x129c51);
        }
        const _0x35ec51 = this._effectiveVolume();
        _0x35ec51 > 0 && (_0x3059f5 /= _0x35ec51), this._meterValue = 0.1 + _0x3059f5;
        const _0x1fbcd4 = 60 * _0x34aeef;
        this._silenceCounter < 3 || this._meterValue < 1.1 * this._lastAudio || this._meterValue < 0.95 * this._lastPeak && this._lastAudio > 0.2 * this._lastPeak ? this._meterValue = this._lastAudio * Math.pow(0.92, _0x1fbcd4) : (this._silenceCounter = 0, this._lastPeak = this._meterValue, this._meterValue *= Math.pow(1.46, _0x1fbcd4)), this._meterValue <= 0.1 && (this._lastPeak = 0), this._lastAudio = this._meterValue, this._silenceCounter++;
    }
    getMeteringValue() {
        return this._meterValue;
    }
    reset() {
        this._meterValue = 0.1, this._lastAudio = 0.1, this._lastPeak = 0, this._silenceCounter = 0, this.stopMusic();
    }
}
export { ys };
