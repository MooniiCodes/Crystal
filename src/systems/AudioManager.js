/*
    an audio that handles hardcoded music, sfx, etc.
*/
class AudioClass {
    constructor(scene) {
        this._scene = scene,
        this._music = null,
        this._userMusicVol = scene.game.registry.get("userMusicVol") ?? 1,
        this._meteringEnabled = false,
        this._analyser = null,
        this._meterBuffer = null,
        this._meterValue = 0.1,
        this._lastAudio = 0.1,
        this._lastPeak = 0,
        this._silenceCounter = 0;
    }
    _effectiveVolume() {
        return 0.8 * this._userMusicVol;
    }
    startMusic() {
        this._music && (
            this._music.stop(),
            this._music.destroy()
        ),
        this._music = this._scene.sound.add("stereo_madness", {
            'loop': true,
            'volume': this._effectiveVolume()
        }),
        this._music.play(),
        this._setupAnalyser();
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
    setUserMusicVolume(volume) {
        this._userMusicVol = volume,
        this._scene.game.registry.set("userMusicVol", volume),
        this._music && (this._music.volume = this._effectiveVolume());
    }
    getMusicVolume() {
        return this._effectiveVolume();
    }
    setMusicVolume(volume) {
        this.setUserMusicVolume(volume / 0.8);
    }
    // fades in music by ms duration
    fadeInMusic(duration = 1000) {
        this._music && (
            this._music.stop(),
            this._music.destroy()
        ),
        this._music = this._scene.sound.add('stereo_madness', { 'loop': true, 'volume': 0 }),
        this._music.play(),
        this._setupAnalyser(),
        this._scene.tweens.add({
            'targets': this._music,
            'volume': this._effectiveVolume(),
            duration: duration
        });
    }
    // fades out music by ms duration, then stops it
    fadeOutMusic(duration = 1500) {
        this._music && this._music.isPlaying && (
            this._music.setLoop(false),
            this._scene.tweens.add({
                'targets': this._music,
                'volume': 0,
                duration: duration,
                onComplete: () => {
                    this._music && this._music.stop();
                }
            })
        );
    }
    // plays a sound effect with the given key and config
    playEffect(soundKey, config = {}) {
        const sfxVolume = undefined !== this._scene._sfxVolume ? this._scene._sfxVolume : 1;
        
        config.volume = (config.volume || 1) * sfxVolume,
        this._scene.sound.play(soundKey, config);
    }
    // metering setup?
    _setupAnalyser() {
        const audioContext = this._scene.sound.context;
        audioContext && (this._analyser = audioContext.createAnalyser(),
        this._analyser.fftSize = 2048,
        this._meterBuffer = new Float32Array(this._analyser.fftSize),
        this._scene.sound.masterVolumeNode.connect(this._analyser),
        this._meteringEnabled = true);
    }
    update(deltaTime) {
        if (!this._meteringEnabled || !this._analyser) return;

        this._analyser.getFloatTimeDomainData(this._meterBuffer);
        let peak = 0;
        for (let i = 0; i < this._meterBuffer.length; i++) {
            let sample = Math.abs(this._meterBuffer[i]);
            sample > peak && (peak = sample);
        }

        const effectiveVolume = this._effectiveVolume();
        effectiveVolume > 0 && (
            peak /= effectiveVolume
        ),
        this._meterValue = 0.1 + peak;
        
        const tweenFactor = 60 * deltaTime;

        this._silenceCounter < 3 ||
        this._meterValue < 1.1 * this._lastAudio ||
        this._meterValue < 0.95 * this._lastPeak &&
        this._lastAudio > 0.2 * this._lastPeak ?
        // decay meter value during low volumes
        this._meterValue = this._lastAudio * Math.pow(0.92, tweenFactor)
        : (
            // otherwise, respond to peaks
            this._silenceCounter = 0,
            this._lastPeak = this._meterValue,
            this._meterValue *= Math.pow(1.46, tweenFactor)
        ),
        
        this._meterValue <= 0.1 && (this._lastPeak = 0),
        
        this._lastAudio = this._meterValue,
        this._silenceCounter++;
    }
    getMeteringValue() {
        return this._meterValue;
    }
    reset() {
        this._meterValue = 0.1,
        this._lastAudio = 0.1,
        this._lastPeak = 0,
        this._silenceCounter = 0,
        this.stopMusic();
    }
}
export { AudioClass };
