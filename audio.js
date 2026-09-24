// Web Audio API Synthesizer - Bekerja 100% offline tanpa perlu file MP3 eksternal
// Menghasilkan instrumen Lo-Fi / Music Box melodi Selamat Ulang Tahun yang manis dan romantis

class BirthdayAudio {
    constructor() {
        this.ctx = null;
        this.isPlaying = false;
        this.timeoutIds = [];
        this.customAudio = null;
    }

    init() {
        if (!this.ctx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AudioContext();
        }
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    // Mainkan nada piano / music box lembut
    playTone(freq, time, duration = 0.8, type = 'sine') {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        // Tambahkan harmonics lembut
        osc.type = type;
        osc.frequency.setValueAtTime(freq, time);

        // Envelope: Attack cepat, Decay lembut seperti celesta/music box
        gain.gain.setValueAtTime(0.001, time);
        gain.gain.exponentialRampToValueAtTime(0.2, time + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(time);
        osc.stop(time + duration);
    }

    // Sound effect pop / confetti
    playPop() {
        this.init();
        if (!this.ctx) return;
        const time = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(150, time);
        osc.frequency.exponentialRampToValueAtTime(600, time + 0.1);

        gain.gain.setValueAtTime(0.3, time);
        gain.gain.exponentialRampToValueAtTime(0.01, time + 0.15);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(time);
        osc.stop(time + 0.15);
    }

    // Sound effect tiup lilin (whoosh)
    playBlow() {
        this.init();
        if (!this.ctx) return;
        const bufferSize = this.ctx.sampleRate * 0.5;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);

        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }

        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.value = 800;
        filter.Q.value = 3.0;

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.6);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        noise.start();
    }

    // Melodi Happy Birthday (Music Box version)
    playBirthdayMelody() {
        // Cek jika ada custom audio MP3 diset di config
        if (window.CONFIG && window.CONFIG.customMusicUrl) {
            if (!this.customAudio) {
                this.customAudio = new Audio(window.CONFIG.customMusicUrl);
                this.customAudio.loop = true;
            }
            this.customAudio.play().catch(e => console.log("Audio play error:", e));
            this.isPlaying = true;
            return;
        }

        this.init();
        if (this.isPlaying) return;
        this.isPlaying = true;

        const N = {
            C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.00, A4: 440.00, B4: 493.88,
            C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99, A5: 880.00, Bb4: 466.16
        };

        const melody = [
            { note: N.C4, dur: 0.35, delay: 0 },
            { note: N.C4, dur: 0.25, delay: 0.35 },
            { note: N.D4, dur: 0.6, delay: 0.65 },
            { note: N.C4, dur: 0.6, delay: 1.3 },
            { note: N.F4, dur: 0.6, delay: 1.95 },
            { note: N.E4, dur: 1.1, delay: 2.6 },

            { note: N.C4, dur: 0.35, delay: 3.8 },
            { note: N.C4, dur: 0.25, delay: 4.15 },
            { note: N.D4, dur: 0.6, delay: 4.45 },
            { note: N.C4, dur: 0.6, delay: 5.1 },
            { note: N.G4, dur: 0.6, delay: 5.75 },
            { note: N.F4, dur: 1.1, delay: 6.4 },

            { note: N.C4, dur: 0.35, delay: 7.6 },
            { note: N.C4, dur: 0.25, delay: 7.95 },
            { note: N.C5, dur: 0.6, delay: 8.25 },
            { note: N.A4, dur: 0.6, delay: 8.9 },
            { note: N.F4, dur: 0.6, delay: 9.55 },
            { note: N.E4, dur: 0.6, delay: 10.2 },
            { note: N.D4, dur: 0.9, delay: 10.85 },

            { note: N.Bb4, dur: 0.35, delay: 11.9 },
            { note: N.Bb4, dur: 0.25, delay: 12.25 },
            { note: N.A4, dur: 0.6, delay: 12.55 },
            { note: N.F4, dur: 0.6, delay: 13.2 },
            { note: N.G4, dur: 0.6, delay: 13.85 },
            { note: N.F4, dur: 1.5, delay: 14.5 }
        ];

        const loopDuration = 16500;

        const playLoop = () => {
            if (!this.isPlaying) return;
            const startTime = this.ctx.currentTime + 0.1;

            melody.forEach(item => {
                this.playTone(item.note, startTime + item.delay, item.dur * 1.4, 'sine');
                this.playTone(item.note / 2, startTime + item.delay, item.dur * 1.1, 'triangle');
            });

            const tid = setTimeout(() => {
                if (this.isPlaying) playLoop();
            }, loopDuration);
            this.timeoutIds.push(tid);
        };

        playLoop();
    }

    stopBirthdayMelody() {
        this.isPlaying = false;
        if (this.customAudio) {
            this.customAudio.pause();
        }
        this.timeoutIds.forEach(id => clearTimeout(id));
        this.timeoutIds = [];
    }

    toggle() {
        if (this.isPlaying) {
            this.stopBirthdayMelody();
            return false;
        } else {
            this.playBirthdayMelody();
            return true;
        }
    }
}

window.bdayAudio = new BirthdayAudio();
