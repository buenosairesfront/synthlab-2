/* U-MA Síntesis — motor de audio (Web Audio API) */
(function () {
  'use strict';
  const A = {};
  let ctx = null, master = null, analyser = null, limiter = null;

  A.ctx = function () {
    if (!ctx) {
      const C = window.AudioContext || window.webkitAudioContext;
      ctx = new C({ latencyHint: 'interactive' });
      limiter = ctx.createDynamicsCompressor();
      limiter.threshold.value = -6; limiter.knee.value = 6; limiter.ratio.value = 12;
      limiter.attack.value = 0.003; limiter.release.value = 0.15;
      master = ctx.createGain(); master.gain.value = 0.7;
      analyser = ctx.createAnalyser(); analyser.fftSize = 4096; analyser.smoothingTimeConstant = 0.6;
      master.connect(limiter); limiter.connect(analyser); analyser.connect(ctx.destination);
    }
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  };
  A.out = function () { A.ctx(); return master; };
  A.analyser = function () { A.ctx(); return analyser; };
  A.now = function () { return A.ctx().currentTime; };

  A.mtof = m => 440 * Math.pow(2, (m - 69) / 12);
  A.ftom = f => 69 + 12 * Math.log2(f / 440);
  const NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  A.noteName = m => { const r = Math.round(m); return NAMES[((r % 12) + 12) % 12] + (Math.floor(r / 12) - 1); };
  A.freqLabel = f => { const m = A.ftom(f); const r = Math.round(m); const cents = Math.round((m - r) * 100); return A.noteName(r) + (cents ? (cents > 0 ? ' +' : ' ') + cents + '¢' : ''); };

  /* ---------- tablas de onda ---------- */
  const waveCache = {};
  A.periodic = function (re, im) { const c = A.ctx(); return c.createPeriodicWave(new Float32Array(re), new Float32Array(im), { disableNormalization: false }); };
  A.harmonicWave = function (amps) { // amps[0] = fundamental (seno)
    const n = amps.length + 1, re = new Float32Array(n), im = new Float32Array(n);
    for (let i = 0; i < amps.length; i++) im[i + 1] = amps[i];
    return A.ctx().createPeriodicWave(re, im);
  };
  // onda a partir de un ciclo muestreado (FFT discreta simple)
  A.waveFromCycle = function (fn, harmonics) {
    harmonics = harmonics || 128; const N = 2048, s = new Float32Array(N);
    for (let i = 0; i < N; i++) s[i] = fn(i / N);
    const re = new Float32Array(harmonics + 1), im = new Float32Array(harmonics + 1);
    for (let k = 1; k <= harmonics; k++) {
      let a = 0, b = 0; for (let i = 0; i < N; i++) { const ph = 2 * Math.PI * k * i / N; a += s[i] * Math.cos(ph); b += s[i] * Math.sin(ph); }
      re[k] = 2 * a / N; im[k] = 2 * b / N;
    }
    return A.ctx().createPeriodicWave(re, im);
  };
  A.pulseWave = function (w) {
    const key = 'p' + w.toFixed(3); if (waveCache[key]) return waveCache[key];
    const n = 128, re = new Float32Array(n), im = new Float32Array(n);
    for (let k = 1; k < n; k++) { re[k] = (2 / (k * Math.PI)) * Math.sin(Math.PI * k * w); }
    return (waveCache[key] = A.ctx().createPeriodicWave(re, im));
  };
  A.syncWave = function (ratio) { // diente de sierra "hard-sync": esclavo reinicia con el maestro
    const key = 's' + ratio.toFixed(3); if (waveCache[key]) return waveCache[key];
    return (waveCache[key] = A.waveFromCycle(p => { const q = (p * ratio) % 1; return 2 * q - 1; }, 160));
  };
  A.setWave = function (osc, type) {
    if (type === 'sine' || type === 'square' || type === 'sawtooth' || type === 'triangle') osc.type = type;
    else if (type === 'pulse25') osc.setPeriodicWave(A.pulseWave(0.25));
    else if (type === 'pulse10') osc.setPeriodicWave(A.pulseWave(0.1));
    else osc.type = 'sawtooth';
  };

  /* ---------- ruido ---------- */
  const noiseBufs = {};
  A.noiseBuffer = function (color) {
    color = color || 'white'; if (noiseBufs[color]) return noiseBufs[color];
    const c = A.ctx(), len = c.sampleRate * 2, b = c.createBuffer(1, len, c.sampleRate), d = b.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0, last = 0;
    for (let i = 0; i < len; i++) {
      const w = Math.random() * 2 - 1;
      if (color === 'pink') {
        b0 = 0.99886 * b0 + w * 0.0555179; b1 = 0.99332 * b1 + w * 0.0750759; b2 = 0.969 * b2 + w * 0.153852;
        b3 = 0.8665 * b3 + w * 0.3104856; b4 = 0.55 * b4 + w * 0.5329522; b5 = -0.7616 * b5 - w * 0.016898;
        d[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + w * 0.5362) * 0.11; b6 = w * 0.115926;
      } else if (color === 'brown') { last = (last + 0.02 * w) / 1.02; d[i] = last * 3.5; }
      else d[i] = w;
    }
    return (noiseBufs[color] = b);
  };
  A.noise = function (color) { const s = A.ctx().createBufferSource(); s.buffer = A.noiseBuffer(color); s.loop = true; return s; };

  /* ---------- curvas de waveshaper ---------- */
  A.curve = function (kind, amount) {
    const n = 2048, c = new Float32Array(n), k = amount;
    for (let i = 0; i < n; i++) {
      const x = i * 2 / (n - 1) - 1; let y = x;
      if (kind === 'tanh') y = Math.tanh(x * (1 + k * 20)) / Math.tanh(1 + k * 20);
      else if (kind === 'hard') { const g = 1 + k * 20; y = Math.max(-1, Math.min(1, x * g)); }
      else if (kind === 'fold') { const g = 1 + k * 8; y = Math.sin(x * g * Math.PI / 2); }
      else if (kind === 'cheby') { const t = x; y = (1 - k) * t + k * (4 * t * t * t - 3 * t); }
      else if (kind === 'bits') { const steps = Math.max(2, Math.round(Math.pow(2, 1 + (1 - k) * 11))); y = Math.round(x * steps / 2) / (steps / 2); }
      else if (kind === 'rect') { y = (1 - k) * x + k * (Math.abs(x) * 2 - 1); }
      c[i] = y;
    }
    return c;
  };

  /* ---------- reverb (IR sintética) ---------- */
  A.impulse = function (seconds, decay) {
    const c = A.ctx(), len = Math.floor(c.sampleRate * seconds), b = c.createBuffer(2, len, c.sampleRate);
    for (let ch = 0; ch < 2; ch++) { const d = b.getChannelData(ch); for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, decay); }
    return b;
  };

  /* ---------- envolventes ---------- */
  A.envOn = function (param, t, base, peak, a, d, s) {
    if (param.cancelAndHoldAtTime) param.cancelAndHoldAtTime(t); else { param.cancelScheduledValues(t); param.setValueAtTime(param.value, t); }
    param.setValueAtTime(param.value === undefined ? base : param.value, t);
    param.linearRampToValueAtTime(peak, t + Math.max(0.002, a));
    param.setTargetAtTime(base + (peak - base) * s, t + Math.max(0.002, a), Math.max(0.001, d) / 4);
  };
  A.envOff = function (param, t, base, r) {
    if (param.cancelAndHoldAtTime) param.cancelAndHoldAtTime(t); else { const v = param.value; param.cancelScheduledValues(t); param.setValueAtTime(v, t); }
    param.setTargetAtTime(base, t, Math.max(0.002, r) / 4);
  };

  /* ---------- sintetizador sustractivo polifónico ---------- */
  A.defaultPatch = function () {
    return {
      w1: 'sawtooth', w2: 'sawtooth', oct2: 0, det2: 7, mix: 0.5, sub: 0, noise: 0,
      ftype: 'lowpass', slope: 24, cutoff: 1800, res: 4, kbd: 0.5, famt: 2, fa: 0.01, fd: 0.4, fs: 0.3, fr: 0.4,
      a: 0.01, d: 0.3, s: 0.7, r: 0.4, lrate: 5, lshape: 'sine', ldest: 'none', ldepth: 0, glide: 0, vol: 0.6, drive: 0, mono: false
    };
  };

  A.Synth = function (dest) {
    const c = A.ctx(); this.p = A.defaultPatch(); this.voices = {};
    this.out = c.createGain(); this.out.gain.value = this.p.vol;
    this.trem = c.createGain(); this.trem.gain.value = 1;
    this.shaper = c.createWaveShaper(); this.shaper.oversample = '4x'; this.shaper.curve = A.curve('tanh', 0);
    this.trem.connect(this.shaper); this.shaper.connect(this.out); this.out.connect(dest || A.out());
    this.lfo = c.createOscillator(); this.lfo.frequency.value = this.p.lrate; this.lfo.start();
    this.lfoPitch = c.createGain(); this.lfoCut = c.createGain(); this.lfoAmp = c.createGain(); this.lfoPwm = c.createGain();
    [this.lfoPitch, this.lfoCut, this.lfoAmp].forEach(g => { g.gain.value = 0; this.lfo.connect(g); });
    this.lfoAmp.connect(this.trem.gain);
    this.sh = c.createConstantSource(); this.sh.offset.value = 0; this.sh.start(); this.shTimer = null;
    this.lastNote = null;
  };
  A.Synth.prototype.set = function (k, v) {
    this.p[k] = v; const c = A.ctx(), t = c.currentTime;
    if (k === 'vol') this.out.gain.setTargetAtTime(v, t, 0.02);
    if (k === 'lrate') this.lfo.frequency.setTargetAtTime(v, t, 0.02);
    if (k === 'lshape' || (k === 'lrate' && this.p.lshape === 'sh')) this.setShape();
    if (k === 'drive') this.shaper.curve = A.curve('tanh', v);
    if (k === 'ldest' || k === 'ldepth' || k === 'lshape') this.routeLfo();
    if (k === 'cutoff' || k === 'res' || k === 'ftype') for (const n in this.voices) this.voices[n].updateFilter && this.voices[n].updateFilter();
    if (k === 'det2' || k === 'oct2') for (const n in this.voices) this.voices[n].updatePitch && this.voices[n].updatePitch();
    if (k === 'mix' || k === 'sub' || k === 'noise') for (const n in this.voices) this.voices[n].updateMix && this.voices[n].updateMix();
  };
  A.Synth.prototype.setShape = function () {
    const self = this, gains = [this.lfoPitch, this.lfoCut, this.lfoAmp];
    try { this.lfo.disconnect(); } catch (e) { } try { this.sh.disconnect(); } catch (e) { }
    clearInterval(this.shTimer); this.shTimer = null;
    if (this.p.lshape === 'sh') {
      gains.forEach(g => this.sh.connect(g));
      this.shTimer = setInterval(() => { if (ctx) self.sh.offset.setValueAtTime(Math.random() * 2 - 1, ctx.currentTime); }, 1000 / Math.max(0.1, this.p.lrate));
    } else { A.setWave(this.lfo, this.p.lshape); gains.forEach(g => this.lfo.connect(g)); }
  };
  A.Synth.prototype.load = function (patch) { const p = Object.assign(A.defaultPatch(), patch); for (const k in p) this.set(k, p[k]); };
  A.Synth.prototype.routeLfo = function () {
    const p = this.p, t = A.ctx().currentTime;
    this.lfoPitch.gain.setTargetAtTime(p.ldest === 'pitch' ? p.ldepth * 100 : 0, t, 0.02);
    this.lfoCut.gain.setTargetAtTime(p.ldest === 'cutoff' ? p.ldepth * 2400 : 0, t, 0.02);
    this.lfoAmp.gain.setTargetAtTime(p.ldest === 'amp' ? p.ldepth * 0.5 : 0, t, 0.02);
    this.trem.gain.setTargetAtTime(p.ldest === 'amp' ? 1 - p.ldepth * 0.5 : 1, t, 0.02);
  };
  A.Synth.prototype.makeVoice = function (m, vel, t) {
    const c = A.ctx(), p = this.p, self = this;
    const f = A.mtof(m), from = this.lastNote !== null ? A.mtof(this.lastNote) : f; this.lastNote = m;
    const v = {}; v.m = m;
    v.o1 = c.createOscillator(); A.setWave(v.o1, p.w1);
    v.o2 = c.createOscillator(); A.setWave(v.o2, p.w2);
    v.sub = c.createOscillator(); v.sub.type = 'square';
    v.n = A.noise('white');
    v.g1 = c.createGain(); v.g2 = c.createGain(); v.gs = c.createGain(); v.gn = c.createGain();
    v.f1 = c.createBiquadFilter(); v.f2 = c.createBiquadFilter(); v.vca = c.createGain(); v.vca.gain.value = 0;
    v.updateMix = function () { const tt = c.currentTime; v.g1.gain.setTargetAtTime(0.35 * (1 - self.p.mix), tt, 0.01); v.g2.gain.setTargetAtTime(0.35 * self.p.mix, tt, 0.01); v.gs.gain.setTargetAtTime(0.3 * self.p.sub, tt, 0.01); v.gn.gain.setTargetAtTime(0.3 * self.p.noise, tt, 0.01); };
    v.updatePitch = function () { v.o2.detune.setValueAtTime(self.p.oct2 * 1200 + self.p.det2, c.currentTime); };
    v.base = function () { return Math.min(20000, Math.max(20, self.p.cutoff * Math.pow(f / 261.63, self.p.kbd))); };
    v.updateFilter = function () {
      const tt = c.currentTime, b = v.base(), single = self.p.slope === 12;
      v.f1.type = self.p.ftype; v.f2.type = single ? 'allpass' : self.p.ftype;
      v.f1.Q.setTargetAtTime(self.p.res, tt, 0.01); v.f2.Q.setTargetAtTime(single ? 0.0001 : 0.7, tt, 0.01);
      v.f2.frequency.setTargetAtTime(single ? 20000 : b, tt, 0.01);
      if (!v.filtEnvActive) v.f1.frequency.setTargetAtTime(b, tt, 0.01);
    };
    [v.o1, v.o2, v.sub].forEach(o => self.lfoPitch.connect(o.detune));
    const glideTo = (o, ff, ffrom) => { if (p.glide > 0 && ffrom !== ff) { o.frequency.setValueAtTime(ffrom, t); o.frequency.exponentialRampToValueAtTime(ff, t + p.glide); } else o.frequency.setValueAtTime(ff, t); };
    glideTo(v.o1, f, from); glideTo(v.o2, f, from); glideTo(v.sub, f / 2, from / 2);
    v.updateMix(); v.updatePitch();
    v.o1.connect(v.g1); v.o2.connect(v.g2); v.sub.connect(v.gs); v.n.connect(v.gn);
    [v.g1, v.g2, v.gs, v.gn].forEach(g => g.connect(v.f1));
    v.f1.connect(v.f2); v.f2.connect(v.vca); v.vca.connect(this.trem);
    this.lfoCut.connect(v.f1.detune);
    v.updateFilter();
    const b = v.base(), peak = Math.min(20000, b * Math.pow(2, p.famt * vel)), sus = Math.min(20000, b * Math.pow(2, p.famt * vel * p.fs));
    v.filtEnvActive = true;
    v.f1.frequency.cancelScheduledValues(t); v.f1.frequency.setValueAtTime(b, t);
    v.f1.frequency.exponentialRampToValueAtTime(Math.max(20, peak), t + Math.max(0.003, p.fa));
    v.f1.frequency.setTargetAtTime(Math.max(20, sus), t + Math.max(0.003, p.fa), Math.max(0.002, p.fd) / 4);
    v.vca.gain.setValueAtTime(0, t);
    v.vca.gain.linearRampToValueAtTime(vel, t + Math.max(0.002, p.a));
    v.vca.gain.setTargetAtTime(vel * p.s, t + Math.max(0.002, p.a), Math.max(0.001, p.d) / 4);
    [v.o1, v.o2, v.sub, v.n].forEach(o => o.start(t));
    v.release = function (tt) {
      A.envOff(v.vca.gain, tt, 0, self.p.r);
      A.envOff(v.f1.frequency, tt, Math.max(20, v.base()), Math.max(self.p.fr, 0.01));
      const end = tt + Math.max(self.p.r, 0.02) * 2.5 + 0.05;
      [v.o1, v.o2, v.sub, v.n].forEach(o => { try { o.stop(end); } catch (e) { } });
      v.o1.onended = function () { try { v.vca.disconnect(); self.lfoCut.disconnect(v.f1.detune); [v.o1, v.o2, v.sub].forEach(o => self.lfoPitch.disconnect(o.detune)); } catch (e) { } };
    };
    v.kill = function (tt) { v.vca.gain.cancelScheduledValues(tt); v.vca.gain.setTargetAtTime(0, tt, 0.005); [v.o1, v.o2, v.sub, v.n].forEach(o => { try { o.stop(tt + 0.05); } catch (e) { } }); };
    return v;
  };
  A.Synth.prototype.noteOn = function (m, vel) {
    vel = vel === undefined ? 0.85 : vel;
    const t = A.ctx().currentTime + 0.005;
    if (this.p.mono) { for (const n in this.voices) { this.voices[n].kill(t); delete this.voices[n]; } }
    if (this.voices[m]) { this.voices[m].release(t); delete this.voices[m]; }
    this.voices[m] = this.makeVoice(m, vel, t);
    const keys = Object.keys(this.voices); if (keys.length > 10) { const k0 = keys[0]; this.voices[k0].kill(t); delete this.voices[k0]; }
  };
  A.Synth.prototype.noteOff = function (m, when) {
    const v = this.voices[m]; if (!v) return; const t = when || A.ctx().currentTime;
    v.release(t); delete this.voices[m];
  };
  A.Synth.prototype.trigger = function (m, dur, when, vel) { // nota programada con precisión (secuenciador)
    const t = Math.max(when || 0, A.ctx().currentTime + 0.002);
    const v = this.makeVoice(m, vel === undefined ? 0.85 : vel, t); v.release(t + dur);
  };
  A.Synth.prototype.allOff = function () { for (const n in this.voices) this.noteOff(+n); };
  A.Synth.prototype.destroy = function () { this.allOff(); clearInterval(this.shTimer); try { this.lfo.stop(); this.sh.stop(); } catch (e) { } setTimeout(() => { try { this.out.disconnect(); } catch (e) { } }, 3000); };

  /* ---------- presets (recetas clásicas) ---------- */
  A.presets = {
    init: {},
    bass: { w1: 'sawtooth', w2: 'square', oct2: -1, det2: 0, mix: 0.5, sub: 0.5, cutoff: 180, res: 6, famt: 3.5, fa: 0.003, fd: 0.25, fs: 0.1, a: 0.003, d: 0.4, s: 0.6, r: 0.08, kbd: 0.3, mono: true, glide: 0.04 },
    acid: { w1: 'sawtooth', w2: 'sawtooth', mix: 0, cutoff: 300, res: 18, slope: 24, famt: 4, fa: 0.003, fd: 0.18, fs: 0, a: 0.003, d: 0.2, s: 0.8, r: 0.05, mono: true, glide: 0.06, drive: 0.35 },
    lead: { w1: 'sawtooth', w2: 'square', det2: 9, mix: 0.45, cutoff: 2200, res: 3, famt: 1.5, fa: 0.01, fd: 0.3, fs: 0.5, a: 0.01, d: 0.2, s: 0.9, r: 0.2, ldest: 'pitch', ldepth: 0.18, lrate: 5.5, glide: 0.05, mono: true },
    pad: { w1: 'sawtooth', w2: 'sawtooth', det2: 12, mix: 0.5, cutoff: 900, res: 2, famt: 1.5, fa: 1.2, fd: 2, fs: 0.5, fr: 2, a: 1.4, d: 1.5, s: 0.85, r: 2.5, ldest: 'cutoff', ldepth: 0.15, lrate: 0.25 },
    strings: { w1: 'sawtooth', w2: 'sawtooth', det2: 6, mix: 0.5, cutoff: 2600, res: 1, slope: 12, famt: 0.5, a: 0.35, d: 0.5, s: 0.9, r: 0.8, ldest: 'pitch', ldepth: 0.08, lrate: 5 },
    brass: { w1: 'sawtooth', w2: 'sawtooth', det2: 5, mix: 0.5, cutoff: 500, res: 2, famt: 3, fa: 0.08, fd: 0.5, fs: 0.55, fr: 0.3, a: 0.05, d: 0.3, s: 0.85, r: 0.25 },
    pluck: { w1: 'sawtooth', w2: 'pulse25', det2: 4, mix: 0.4, cutoff: 300, res: 5, famt: 4.5, fa: 0.002, fd: 0.22, fs: 0, fr: 0.2, a: 0.002, d: 0.6, s: 0, r: 0.35 },
    organ: { w1: 'sine', w2: 'sine', oct2: 1, det2: 0, mix: 0.45, sub: 0.6, cutoff: 6000, res: 0.7, famt: 0, a: 0.005, d: 0.1, s: 1, r: 0.06, ldest: 'amp', ldepth: 0.25, lrate: 6.5 },
    bell: { w1: 'triangle', w2: 'sine', oct2: 2, det2: 14, mix: 0.6, cutoff: 5000, res: 1, famt: 0.5, a: 0.002, d: 2.5, s: 0, r: 2.5 },
    sweep: { w1: 'sawtooth', w2: 'sawtooth', det2: 15, mix: 0.5, noise: 0.15, cutoff: 400, res: 12, famt: 0, a: 0.6, d: 1, s: 0.9, r: 1.8, ldest: 'cutoff', ldepth: 0.9, lrate: 0.15 },
    reese: { w1: 'sawtooth', w2: 'sawtooth', det2: 22, mix: 0.5, sub: 0.4, cutoff: 700, res: 2, famt: 1, a: 0.01, d: 0.3, s: 1, r: 0.2, mono: true, drive: 0.3 }
  };

  /* ---------- percusión sintética ---------- */
  A.drum = function (kind, when, dest, vel) {
    const c = A.ctx(); when = when || c.currentTime; dest = dest || A.out(); vel = vel || 1;
    if (kind === 'kick') {
      const o = c.createOscillator(), g = c.createGain(); o.frequency.setValueAtTime(150, when); o.frequency.exponentialRampToValueAtTime(45, when + 0.12);
      g.gain.setValueAtTime(vel, when); g.gain.exponentialRampToValueAtTime(0.001, when + 0.45); o.connect(g); g.connect(dest); o.start(when); o.stop(when + 0.5);
    } else if (kind === 'snare') {
      const n = A.noise('white'), f = c.createBiquadFilter(), g = c.createGain(); f.type = 'highpass'; f.frequency.value = 1200;
      g.gain.setValueAtTime(0.6 * vel, when); g.gain.exponentialRampToValueAtTime(0.001, when + 0.2); n.connect(f); f.connect(g); g.connect(dest); n.start(when); n.stop(when + 0.25);
      const o = c.createOscillator(), og = c.createGain(); o.type = 'triangle'; o.frequency.setValueAtTime(220, when); o.frequency.exponentialRampToValueAtTime(160, when + 0.08);
      og.gain.setValueAtTime(0.5 * vel, when); og.gain.exponentialRampToValueAtTime(0.001, when + 0.12); o.connect(og); og.connect(dest); o.start(when); o.stop(when + 0.15);
    } else if (kind === 'hat') {
      const n = A.noise('white'), f = c.createBiquadFilter(), g = c.createGain(); f.type = 'highpass'; f.frequency.value = 7000;
      g.gain.setValueAtTime(0.35 * vel, when); g.gain.exponentialRampToValueAtTime(0.001, when + 0.05); n.connect(f); f.connect(g); g.connect(dest); n.start(when); n.stop(when + 0.08);
    } else if (kind === 'clap') {
      const n = A.noise('white'), f = c.createBiquadFilter(), g = c.createGain(); f.type = 'bandpass'; f.frequency.value = 1500; f.Q.value = 1;
      g.gain.setValueAtTime(0, when); [0, 0.01, 0.02].forEach(d => { g.gain.setValueAtTime(0.6 * vel, when + d); g.gain.exponentialRampToValueAtTime(0.05, when + d + 0.009); });
      g.gain.setValueAtTime(0.5 * vel, when + 0.03); g.gain.exponentialRampToValueAtTime(0.001, when + 0.25); n.connect(f); f.connect(g); g.connect(dest); n.start(when); n.stop(when + 0.3);
    }
  };

  /* ---------- visualizadores ---------- */
  function themeColor(name, fb) { const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim(); return v || fb; }
  A.scope = function (canvas, an, opts) {
    opts = opts || {}; an = an || A.analyser();
    const g = canvas.getContext('2d'), buf = new Float32Array(an.fftSize);
    function draw() {
      if (!canvas.isConnected) return;
      const w = canvas.width = canvas.clientWidth * devicePixelRatio, h = canvas.height = canvas.clientHeight * devicePixelRatio;
      an.getFloatTimeDomainData(buf);
      g.fillStyle = themeColor('--scope-bg', '#0c0f12'); g.fillRect(0, 0, w, h);
      g.strokeStyle = themeColor('--grid', '#1f2a30'); g.lineWidth = 1; g.beginPath();
      for (let i = 1; i < 4; i++) { g.moveTo(0, h * i / 4); g.lineTo(w, h * i / 4); } for (let i = 1; i < 8; i++) { g.moveTo(w * i / 8, 0); g.lineTo(w * i / 8, h); } g.stroke();
      // disparo en cruce por cero ascendente
      let start = 0; for (let i = 1; i < buf.length / 2; i++) if (buf[i - 1] < 0 && buf[i] >= 0) { start = i; break; }
      const span = opts.span || 1024;
      g.strokeStyle = opts.color || themeColor('--cyan', '#3fb8cc'); g.lineWidth = 2 * devicePixelRatio; g.beginPath();
      for (let i = 0; i < span; i++) { const x = i / span * w, y = h / 2 - buf[start + i] * h * 0.45 * (opts.gain || 1.4); i ? g.lineTo(x, y) : g.moveTo(x, y); }
      g.stroke(); requestAnimationFrame(draw);
    }
    draw();
  };
  A.spectrum = function (canvas, an, opts) {
    opts = opts || {}; an = an || A.analyser();
    const g = canvas.getContext('2d'), buf = new Float32Array(an.frequencyBinCount);
    function draw() {
      if (!canvas.isConnected) return;
      const w = canvas.width = canvas.clientWidth * devicePixelRatio, h = canvas.height = canvas.clientHeight * devicePixelRatio;
      an.getFloatFrequencyData(buf);
      g.fillStyle = themeColor('--scope-bg', '#0c0f12'); g.fillRect(0, 0, w, h);
      const sr = A.ctx().sampleRate, fmin = 20, fmax = 20000, lx = f => Math.log(f / fmin) / Math.log(fmax / fmin) * w;
      g.strokeStyle = themeColor('--grid', '#1f2a30'); g.fillStyle = themeColor('--muted', '#6b7a80'); g.font = (10 * devicePixelRatio) + 'px sans-serif'; g.lineWidth = 1; g.beginPath();
      [50, 100, 200, 500, 1000, 2000, 5000, 10000].forEach(f => { const x = lx(f); g.moveTo(x, 0); g.lineTo(x, h); g.fillText(f >= 1000 ? f / 1000 + 'k' : f, x + 2, h - 3); });
      g.stroke();
      const grad = g.createLinearGradient(0, 0, w, 0); grad.addColorStop(0, themeColor('--magenta', '#c8407a')); grad.addColorStop(0.5, themeColor('--cyan', '#3fb8cc')); grad.addColorStop(1, themeColor('--yellow', '#d4bf3c'));
      g.strokeStyle = grad; g.lineWidth = 1.5 * devicePixelRatio; g.beginPath();
      let first = true;
      for (let i = 1; i < buf.length; i++) {
        const f = i * sr / an.fftSize; if (f < fmin || f > fmax) continue;
        const x = lx(f), db = buf[i], y = h - (db + 110) / 100 * h;
        first ? g.moveTo(x, y) : g.lineTo(x, y); first = false;
      }
      g.stroke(); requestAnimationFrame(draw);
    }
    draw();
  };

  window.UA = A;
})();
