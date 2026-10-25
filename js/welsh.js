/* Recetario U-MA: motor de 2 osciladores + ruido + LFO + LPF + 2 ADSR con el formato de ficha
   del "Welsh's Synthesizer Cookbook" (Fred Welsh). Patches propios + algunos ejemplos citados del libro. */
(function () {
  const A = UA, s = k => I18N.s(k), el = UI.el;
  const MAXD = 10, MAXR = 6;

  /* Curva dial% → Hz (filtro 24 dB): exponencial de 20 Hz a 20 kHz, 10 octavas en 100 pasos */
  function dialToHz(d) { d = Math.max(0, Math.min(100, d)); return 20 * Math.pow(1000, d / 100); }
  function hzToDial(hz) { hz = Math.max(20, Math.min(20000, hz)); return 100 * Math.log(hz / 20) / Math.log(1000); }
  const db = x => Math.pow(10, x / 20);

  /* forma de onda del esclavo sincronizado */
  const syncCache = {};
  function syncWave(ratio, shape, w) {
    const r = Math.round(ratio * 50) / 50, key = shape + w + ':' + r;
    if (syncCache[key]) return syncCache[key];
    const fn = p => { const q = (p * r) % 1; if (shape === 'saw') return 2 * q - 1; if (shape === 'tri') return 1 - 4 * Math.abs(q - 0.5); return q < (shape === 'sq' ? 0.5 : w) ? 1 : -1; };
    return (syncCache[key] = A.waveFromCycle(fn, 96));
  }
  function parseWave(wv) { if (!wv || wv === 'off') return { shape: 'off' }; if (wv.startsWith('pw')) return { shape: 'pw', w: (+wv.slice(2)) / 100 }; return { shape: wv, w: 0.5 }; }

  /* ---------- motor ---------- */
  function Engine(dest) {
    const c = A.ctx(); this.voices = {}; this.last = null; this.p = null;
    this.out = c.createGain(); this.out.gain.value = 0.5;
    this.trem = c.createGain(); this.trem.connect(this.out); this.out.connect(dest || A.out());
    this.timers = [];
  }
  Engine.prototype.load = function (patch, tweak) {
    const c = A.ctx(); this.allOff(true);
    this.p = Object.assign({}, patch, tweak || {});
    const p = this.p; this.timers.forEach(clearInterval); this.timers = [];
    if (this.lfo) { try { this.lfo.stop(); } catch (e) { } try { this.lfo.disconnect(); } catch (e) { } }
    this.routes = {}; this.lfo = null; this.jsl = { ph: 0, val: 0, last: performance.now() };
    const L = p.l;
    this.trem.gain.cancelScheduledValues(0); this.trem.gain.value = 1;
    if (L) {
      const [wv, rate, rs] = L;
      if (wv === 'noise') {
        this.lfo = c.createConstantSource(); this.lfo.offset.value = 0; this.lfo.start();
        const smooth = rate < 5, self = this;
        this.timers.push(setInterval(() => { const v = Math.random() * 2 - 1; self.jsl.val = v; smooth ? self.lfo.offset.setTargetAtTime(v, c.currentTime, 0.3 / rate) : self.lfo.offset.setValueAtTime(v, c.currentTime); }, 1000 / rate));
      } else { this.lfo = c.createOscillator(); this.lfo.type = wv; this.lfo.frequency.value = rate; this.lfo.start(); }
      rs.forEach(([to, d]) => {
        const g = c.createGain(); this.lfo.connect(g); this.routes[to] = { g, d };
        if (to === 'amp') { g.gain.value = d / 2; this.trem.gain.value = 1 - d / 2; g.connect(this.trem.gain); }
        else if (to === 'pitch' || to === 'pitch2') g.gain.value = d; // cents
        else if (to === 'cut') g.gain.value = d * 100 * 115; // dial% → cents aprox.
        else if (to === 'res') g.gain.value = d * 12;
        else g.gain.value = d; // pw, pw1, pw2, noise: se escalan por voz
      });
      // LFO en JS para barrer la sincronía (pitch2 con sync)
      if (p.sy && this.routes.pitch2) {
        const self = this;
        this.timers.push(setInterval(() => {
          const now = performance.now(), j = self.jsl; j.ph = (j.ph + (now - j.last) / 1000 * rate) % 1; j.last = now;
          const v = wv === 'noise' ? j.val : wv === 'square' ? (j.ph < 0.5 ? 1 : -1) : wv === 'sawtooth' ? 2 * j.ph - 1 : wv === 'sine' ? Math.sin(2 * Math.PI * j.ph) : 1 - 4 * Math.abs(j.ph - 0.5);
          const cents = v * self.routes.pitch2.d;
          for (const k in self.voices) { const vo = self.voices[k]; if (vo.slave) vo.slave.forEach(o => o.setPeriodicWave(syncWave(Math.max(1, vo.ratio * Math.pow(2, cents / 1200)), vo.sshape, vo.sw))); }
        }, 40));
      }
    }
  };
  Engine.prototype.voice = function (m, t) {
    const c = A.ctx(), p = this.p, self = this, R = this.routes, v = { nodes: [], m };
    const fNote = A.mtof(m), fromNote = this.last !== null && p.g ? A.mtof(this.last) : fNote; this.last = m;
    const t1 = p.o1 ? (p.o1[1] || 0) : 0, t2 = p.o2 ? (p.o2[1] || 0) : 0;
    const f1 = fNote * Math.pow(2, t1 / 1200), f1from = fromNote * Math.pow(2, t1 / 1200);
    const base2 = p.tr2 !== undefined ? A.mtof(p.tr2) : fNote, base2from = p.tr2 !== undefined ? base2 : fromNote;
    const f2 = base2 * Math.pow(2, t2 / 1200), f2from = base2from * Math.pow(2, t2 / 1200);
    const mix = c.createGain(); v.nodes.push(mix);
    const setF = (param, to, from) => { param.setValueAtTime(from, t); if (p.g && from !== to) param.exponentialRampToValueAtTime(to, t + p.g); else param.setValueAtTime(to, t); };
    const uni = p.u ? [-9, 0, 9] : [0];
    const pitchRoute = (o, idx) => { if (R.pitch) R.pitch.g.connect(o.detune); if (idx === 2 && R.pitch2 && !p.sy) R.pitch2.g.connect(o.detune); };
    function build(spec, idx) {
      if (!spec) return; const wv = parseWave(spec[0]); if (wv.shape === 'off') return;
      const lvl = db(spec[2] || 0) / Math.sqrt(uni.length) * 0.5; if (lvl < 0.012) return;
      const g = c.createGain(); g.gain.value = lvl; g.connect(mix); v.nodes.push(g);
      const f = idx === 1 ? f1 : f2, ff = idx === 1 ? f1from : f2from;
      const pwm = (R.pw || R['pw' + idx]) && (wv.shape === 'pw' || wv.shape === 'sq');
      uni.forEach(dt => {
        if (idx === 2 && p.sy) { // esclavo sincronizado: suena a la frecuencia del maestro
          const o = c.createOscillator(); v.ratio = Math.max(1, f2 / f1); v.sshape = wv.shape; v.sw = wv.w;
          o.setPeriodicWave(syncWave(v.ratio, wv.shape, wv.w)); setF(o.frequency, f1, f1from); o.detune.value = dt; pitchRoute(o, 2);
          o.connect(g); o.start(t); v.nodes.push(o); (v.slave = v.slave || []).push(o);
        } else if (wv.shape === 'pw' || pwm) { // pulso = sierra − sierra retardada (ancho modulable)
          const a = c.createOscillator(), b = c.createOscillator(), d = c.createDelay(0.2), inv = c.createGain(); a.type = b.type = 'sawtooth';
          [a, b].forEach(o => { setF(o.frequency, f, ff); o.detune.value = dt; pitchRoute(o, idx); });
          d.delayTime.value = wv.w / f; inv.gain.value = -1; a.connect(g); b.connect(d); d.connect(inv); inv.connect(g);
          const pr = R.pw || R['pw' + idx];
          if (pr) { const amp = Math.min(pr.d * 0.5, wv.w - 0.02, 0.98 - wv.w); const lg = c.createGain(); lg.gain.value = amp / f; self.lfo.connect(lg); lg.connect(d.delayTime); v.nodes.push(lg); }
          a.start(t); b.start(t); v.nodes.push(a, b, d, inv);
        } else {
          const o = c.createOscillator(); o.type = { saw: 'sawtooth', sq: 'square', tri: 'triangle' }[wv.shape] || 'sawtooth';
          setF(o.frequency, f, ff); o.detune.value = dt; pitchRoute(o, idx); o.connect(g); o.start(t); v.nodes.push(o);
        }
      });
    }
    build(p.o1, 1); build(p.o2, 2);
    if (p.nz !== undefined) {
      const n = A.noise('white'), ng = c.createGain(), lvl = db(p.nz) * 0.4; n.connect(ng); ng.connect(mix); n.start(t); v.nodes.push(n, ng);
      if (R.noise) { ng.gain.value = lvl * (1 - R.noise.d / 2); const lg = c.createGain(); lg.gain.value = lvl * R.noise.d / 2; self.lfo.connect(lg); lg.connect(ng.gain); v.nodes.push(lg); } else ng.gain.value = lvl;
    }
    // filtro pasa bajos 24 dB
    const f24a = c.createBiquadFilter(), f24b = c.createBiquadFilter(); f24a.type = f24b.type = 'lowpass';
    const dial = hzToDial(p.fc[0]), kt = p.kt === 0 ? 1 : Math.pow(fNote / 261.63, 0.5);
    const baseHz = Math.min(20000, dialToHz(dial) * kt);
    f24a.frequency.value = f24b.frequency.value = baseHz;
    f24a.Q.value = 0.6 + Math.pow((p.r || 0) / 100, 1.6) * 22; f24b.Q.value = 0.6;
    mix.connect(f24a); f24a.connect(f24b); v.nodes.push(f24a, f24b);
    if (R.cut) { R.cut.g.connect(f24a.detune); R.cut.g.connect(f24b.detune); }
    if (R.res) R.res.g.connect(f24a.Q);
    const env = (p.e || 0) / 100, fe = p.fe;
    if (env > 0 && fe) {
      const cents = d2 => 1200 * Math.log2(dialToHz(Math.min(100, dial + d2)) / dialToHz(dial));
      const peak = cents(env * 100), sus = cents(env * 100 * fe[2]);
      [f24a, f24b].forEach(fl => { const dp = fl.detune; dp.setValueAtTime(0, t); dp.linearRampToValueAtTime(peak, t + Math.max(0.003, fe[0])); dp.setTargetAtTime(sus, t + Math.max(0.003, fe[0]), Math.max(0.005, fe[1]) / 4); });
      v.fRel = fe[3];
    }
    // VCA
    const vca = c.createGain(), ae = p.ae; vca.gain.value = 0; f24b.connect(vca); vca.connect(this.trem); v.nodes.push(vca);
    vca.gain.setValueAtTime(0, t); vca.gain.linearRampToValueAtTime(1, t + Math.max(0.003, ae[0]));
    vca.gain.setTargetAtTime(ae[2], t + Math.max(0.003, ae[0]), Math.max(0.005, ae[1]) / 4);
    v.release = function (tt) {
      A.envOff(vca.gain, tt, 0, Math.max(0.01, ae[3]));
      if (v.fRel !== undefined) [f24a, f24b].forEach(fl => A.envOff(fl.detune, tt, 0, Math.max(0.01, v.fRel)));
      const end = tt + Math.max(0.02, ae[3]) * 3 + 0.1;
      v.nodes.forEach(n => { if (n.stop) try { n.stop(end); } catch (e) { } });
      setTimeout(() => v.nodes.forEach(n => { try { n.disconnect(); } catch (e) { } }), (end - c.currentTime) * 1000 + 200);
    };
    return v;
  };
  Engine.prototype.noteOn = function (m) {
    if (!this.p) return; const t = A.ctx().currentTime + 0.005;
    if (this.p.m) for (const k in this.voices) { this.voices[k].release(t); delete this.voices[k]; }
    if (this.voices[m]) { this.voices[m].release(t); delete this.voices[m]; }
    this.voices[m] = this.voice(m, t);
    const ks = Object.keys(this.voices); if (ks.length > 8) { this.voices[ks[0]].release(t); delete this.voices[ks[0]]; }
  };
  Engine.prototype.noteOff = function (m) { const v = this.voices[m]; if (!v) return; v.release(A.ctx().currentTime); delete this.voices[m]; };
  Engine.prototype.allOff = function () { for (const k in this.voices) this.noteOff(k); };
  Engine.prototype.destroy = function () { this.allOff(); this.timers.forEach(clearInterval); try { this.lfo && this.lfo.stop(); } catch (e) { } const o = this.out; setTimeout(() => { try { o.disconnect(); } catch (e) { } }, 8000); };

  /* ---------- patches ----------
     Fichas propias de U-MA para este motor. Las marcadas con src son ejemplos citados del
     Welsh's Synthesizer Cookbook (Fred Welsh) para estudiar su formato; el resto del recetario está en el libro. */
  const M = 'M', O = 1200, ST = 100;
  const T = v => v === M ? MAXD : v;
  const P = [];
  // add(cat, name, o1, o2, x) — o = [onda, afinación en cents, nivel dB]; x: tr2 (nota fija), sy, nz, l=[onda, Hz, [[destino, prof]]], g, u, m, fc=[24dB,12dB], r, e, fe, ae, n (nota), oct, src
  function add(cat, name, o1, o2, x) {
    const fix = a => a ? [T(a[0]), T(a[1]), a[2], a[3] === M ? MAXR : a[3]] : null;
    const p = Object.assign({ cat, name, o1, o2, r: 0, e: 0 }, x); p.fe = fix(p.fe); p.ae = fix(p.ae); P.push(p);
  }
  const tri = 'triangle', sine = 'sine', sq = 'square', saw = 'sawtooth';
  // CUERDAS
  add('str', ['Guitarra acústica', 'Acoustic guitar', 'Akustikgitarre', 'アコースティック・ギター'], ['pw30', 0, 0], ['saw', 7 * ST, -5], { sy: 1, fc: [2200, 1400], r: 10, e: 40, fe: [0, .3, 0, .4], ae: [0, 1.4, 0, .9], oct: 48 });
  add('str', ['Cuerdas de cámara', 'Chamber strings', 'Kammerstreicher', '室内弦楽'], ['saw', -6, 0], ['saw', 6, 0], { l: [sine, 5.5, [['pitch', 12]]], fc: [2200, 1500], r: 5, e: 20, fe: [.25, M, 1, .6], ae: [.35, M, 1, .7] });
  add('str', ['Pizzicato', 'Pizzicato', 'Pizzicato', 'ピチカート'], ['saw', 0, 0], ['pw25', O, -8], { fc: [700, 500], r: 15, e: 55, fe: [0, .18, 0, .2], ae: [0, .35, 0, .3] });
  add('str', ['Violonchelo', 'Cello', 'Cello', 'チェロ'], ['pw10', 0, 0], ['sq', 0, 0], { l: [sine, 7.5, [['amp', .05]]], fc: [40, 40], e: 90, fe: [0, 3.29, .78, M], ae: [.06, M, 1, .30], alt: 'cello', src: 1 });
  // VIENTOS MADERA
  add('ww', ['Clarinete', 'Clarinet', 'Klarinette', 'クラリネット'], ['pw45', 0, 0], null, { l: [sine, 7.5, [['pitch', 1]]], fc: [40, 40], e: 55, fe: [.15, M, 1, .32], ae: [0, M, 1, .32], src: 1 });
  add('ww', ['Flauta con aire', 'Breathy flute', 'Hauchige Flöte', '息まじりのフルート'], ['tri', 0, 0], null, { nz: -22, l: [sine, 4.5, [['pitch', 8]]], g: .02, fc: [1600, 1000], r: 5, e: 25, fe: [.08, M, 1, .3], ae: [.08, M, 1, .3], oct: 72 });
  add('ww', ['Caña doble', 'Double reed', 'Doppelrohrblatt', 'ダブルリード'], ['pw15', 0, 0], ['pw30', O, -10], { l: [sine, 6, [['pitch', 6]]], fc: [60, 50], r: 20, e: 70, fe: [.06, .4, .8, .2], ae: [.02, M, 1, .2] });
  // METALES
  add('br', ['Trompeta', 'Trumpet', 'Trompete', 'トランペット'], ['saw', 0, 0], ['saw', O, -14.4], { l: [tri, 7.5, [['amp', .05]]], fc: [50, 40], r: 15, e: 75, fe: [.08, M, 1, .19], ae: [0, M, 1, .19], src: 1 });
  add('br', ['Saxofón', 'Saxophone', 'Saxophon', 'サックス'], ['pw30', 0, 0], ['pw45', 8 * ST, -9.6], { sy: 1, l: [sine, 7.5, [['pitch', 10]]], fc: [40, 40], e: 90, fe: [.14, .37, .78, .30], ae: [0, M, 1, .30], oct: 48, src: 1 });
  add('br', ['Sección de metales', 'Brass section', 'Bläsersatz', 'ブラス・セクション'], ['saw', -4, 0], ['saw', O + 4, -6], { l: [sine, 5, [['pw', .3]]], fc: [200, 150], r: 5, e: 60, fe: [.12, .6, .6, .4], ae: [.06, M, 1, .4], oct: 48 });
  // TECLADOS
  add('key', ['Piano', 'Piano', 'Klavier', 'ピアノ'], ['saw', 0, -3], ['pw20', O + 7 * ST, -6], { sy: 1, fc: [900, 600], e: 55, fe: [0, .6, .1, .5], ae: [0, 2.2, 0, .6] });
  add('key', ['Clavecín', 'Harpsichord', 'Cembalo', 'チェンバロ'], ['pw15', 0, 0], ['pw35', 2 * O, -4], { sy: 1, fc: [3500, 2500], r: 15, e: 30, fe: [0, .15, 0, .3], ae: [0, 1.4, 0, .3] });
  add('key', ['Órgano de registros', 'Drawbar organ', 'Zugriegelorgel', 'ドローバー・オルガン'], ['tri', 0, 0], ['tri', O, -4], { l: [sine, 6.5, [['amp', .08]]], fc: [20000, 20000], ae: [.01, M, 1, .08] });
  add('key', ['Piano eléctrico', 'Electric piano', 'E-Piano', 'エレクトリック・ピアノ'], ['tri', 0, 0], ['sq', 2 * O, -14], { l: [sine, 4, [['amp', .15]]], fc: [1500, 900], e: 35, fe: [0, .4, 0, .5], ae: [0, 3, 0, .5] });
  // VOCES
  add('voc', ['Ángeles', 'Angels', 'Engel', 'エンジェル'], ['pw20', -6, 0], ['pw35', 6, -2], { l: [tri, 5, [['pitch', 10]]], fc: [1100, 800], r: 25, ae: [.4, M, 1, 1.1], oct: 72 });
  add('voc', ['Murmullo', 'Hum', 'Summen', 'ハミング'], ['tri', 0, 0], ['saw', 0, -16], { l: [sine, 5, [['pitch', 15]]], fc: [700, 500], r: 30, ae: [.2, M, 1, .6], oct: 48 });
  // PERCUSIÓN AFINADA
  add('tp', ['Campana', 'Bell', 'Glocke', 'ベル'], ['tri', 0, 0], ['sq', O + 6 * ST + 30, -14], { fc: [6000, 4000], ae: [0, 2.5, 0, 2.5], oct: 72 });
  add('tp', ['Marimba', 'Marimba', 'Marimba', 'マリンバ'], ['tri', 0, 0], ['tri', 2 * O, -12], { fc: [2500, 1500], e: 30, fe: [0, .1, 0, .1], ae: [0, .6, 0, .6] });
  add('tp', ['Tom', 'Tom', 'Tom', 'タム'], ['sq', -O, 0], null, { nz: -20, fc: [500, 300], r: 30, e: 45, fe: [0, .2, 0, .2], ae: [0, .7, 0, .7], oct: 36 });
  // PERCUSIÓN NO AFINADA
  add('up', ['Bombo', 'Kick drum', 'Bassdrum', 'キック'], ['tri', -2 * O, 0], null, { fc: [300, 200], r: 20, e: 80, fe: [0, .05, 0, .05], ae: [0, .3, 0, .3], oct: 48 });
  add('up', ['Caja', 'Snare', 'Snare', 'スネア'], ['tri', -O, -6], null, { nz: -6, fc: [5000, 3000], r: 10, e: 30, fe: [0, .08, 0, .1], ae: [0, .18, 0, .18] });
  add('up', ['Hi-hat cerrado', 'Closed hi-hat', 'Geschlossene Hi-Hat', 'クローズド・ハイハット'], null, null, { nz: 0, kt: 0, m: 1, fc: [12000, 9000], r: 30, ae: [0, .05, 0, .05] });
  add('up', ['Palmas', 'Clap', 'Klatschen', 'クラップ'], null, null, { nz: 0, l: [sq, 40, [['amp', .5]]], fc: [1400, 1000], r: 35, ae: [0, .12, 0, .12] });
  // LEADS
  add('lead', ['Lead sincronizado', 'Sync lead', 'Sync-Lead', 'シンク・リード'], ['saw', 0, 0], ['saw', O + 5 * ST, 0], { sy: 1, l: [tri, .5, [['pitch2', 300]]], g: .03, m: 1, fc: [6000, 4000], r: 10, ae: [0, M, 1, .3] });
  add('lead', ['Lead cuadrado', 'Square lead', 'Rechteck-Lead', 'スクエア・リード'], ['sq', 0, 0], ['sq', 7, -4], { l: [sine, 5, [['pitch', 14]]], g: .05, m: 1, fc: [2500, 1800], r: 20, e: 30, fe: [0, .3, .4, .3], ae: [0, M, 1, .3] });
  add('lead', ['Lead de quintas', 'Fifths lead', 'Quinten-Lead', '5度リード'], ['saw', 0, 0], ['saw', 7 * ST, -3], { u: 1, m: 1, fc: [4000, 3000], r: 15, ae: [0, M, 1, .25] });
  // BAJOS
  add('bass', 'Acid Bass', ['saw', 0, 0], null, { m: 1, g: .06, fc: [250, 200], r: 75, e: 60, fe: [0, .25, 0, .15], ae: [0, M, 1, .08], oct: 48 });
  add('bass', ['Sub bajo', 'Sub bass', 'Sub-Bass', 'サブベース'], ['tri', -O, 0], ['sq', -2 * O, -14], { m: 1, fc: [300, 200], ae: [.005, M, 1, .1], oct: 48 });
  add('bass', ['Bajo pulsado', 'Plucked bass', 'Gezupfter Bass', 'プラック・ベース'], ['pw25', -O, 0], ['saw', -O + 7, -4], { m: 1, fc: [200, 150], r: 30, e: 50, fe: [0, .3, 0, .2], ae: [0, .8, 0, .15], oct: 48 });
  // PADS
  add('pad', ['Cuerdas PWM', 'Strings PWM', 'PWM-Streicher', 'PWMストリングス'], ['sq', -8, 0], ['sq', 8, 0], { l: [sine, .6, [['pw', .45]]], fc: [2000, 1500], r: 5, e: 10, fe: [.5, M, 1, 1], ae: [.6, M, 1, 1.2] });
  add('pad', ['Niebla', 'Fog', 'Nebel', '霧'], ['sq', -12, 0], ['saw', O + 12, -6], { nz: -24, l: [tri, .15, [['pw1', .35]]], fc: [600, 400], r: 40, ae: [1.8, M, 1, 3] });
  add('pad', ['Pad de cristal', 'Glass pad', 'Glas-Pad', 'グラス・パッド'], ['tri', 0, 0], ['sq', 2 * O + 7 * ST, -16], { l: [sine, .3, [['pw2', .4]]], fc: [3000, 2000], r: 20, ae: [.9, M, 1, 2.5], oct: 72 });
  // EFECTOS
  add('sfx', ['Viento', 'Wind', 'Wind', '風'], null, null, { nz: 0, l: ['noise', .5, [['cut', .25]]], fc: [900, 600], r: 60, ae: [1, M, 1, 2] });
  add('sfx', ['Láser', 'Laser', 'Laser', 'レーザー'], ['sq', O, 0], null, { l: [saw, 3, [['pitch', -1800]]], m: 1, fc: [20000, 20000], ae: [0, .3, 0, .2] });
  add('sfx', ['Sirena', 'Siren', 'Sirene', 'サイレン'], ['saw', 0, 0], ['saw', 5, -3], { l: [tri, .4, [['pitch', 700]]], m: 1, fc: [3000, 2000], r: 10, ae: [.05, M, 1, .5] });
  add('sfx', ['Olas', 'Waves', 'Wellen', '波'], null, null, { nz: 0, l: [sine, .12, [['amp', .8], ['cut', .15]]], fc: [2500, 1500], r: 10, ae: [1, M, 1, 2] });

  const CATS = [['str', ['Cuerdas', 'Strings', 'Streicher', '弦楽器']], ['ww', ['Vientos madera', 'Woodwinds', 'Holzbläser', '木管楽器']], ['br', ['Metales', 'Brass', 'Blechbläser', '金管楽器']], ['key', ['Teclados', 'Keyboards', 'Tasteninstrumente', '鍵盤楽器']], ['voc', ['Voces', 'Vocals', 'Stimmen', 'ボーカル']], ['tp', ['Percusión afinada', 'Tuned percussion', 'Gestimmte Percussion', '有音程打楽器']], ['up', ['Percusión no afinada', 'Untuned percussion', 'Ungestimmte Percussion', '無音程打楽器']], ['lead', ['Leads', 'Leads', 'Leads', 'リード']], ['bass', ['Bajos', 'Bass', 'Bässe', 'ベース']], ['pad', ['Pads', 'Pads', 'Pads', 'パッド']], ['sfx', ['Efectos', 'Sound effects', 'Soundeffekte', '効果音']]];
  const nm = p => I18N.t(Array.isArray(p.name) ? p.name : [p.name]);

  /* frase de demostración según la familia */
  function demo(eng, p, timers) {
    const base = p.oct || (p.cat === 'bass' ? 48 : 60); let seq;
    if (p.cat === 'up') seq = [[base, 0, .15], [base, .5, .15], [base, .75, .15], [base, 1.0, .15]];
    else if (p.cat === 'tp') seq = [[base, 0, .2], [base + 4, .4, .2], [base + 7, .8, .2], [base + 12, 1.2, .6]];
    else if (p.cat === 'pad') seq = [[base, 0, 3], [base + 3, 0, 3], [base + 7, 0, 3], [base + 10, 0, 3]];
    else if (p.cat === 'bass') seq = [[base, 0, .2], [base, .3, .2], [base + 12, .6, .15], [base + 10, .9, .25], [base + 7, 1.2, .25], [base + 3, 1.5, .3]];
    else if (p.cat === 'sfx') seq = [[base, 0, 2]];
    else { const slow = p.ae[0] > .25; const d = slow ? 1 : .4; seq = [0, 2, 4, 5, 7].map((st, i) => [base + st, i * d, d * .9]).concat([[base + 12, 5 * d, d * 2]]); }
    seq.forEach(([m, at, dur]) => { timers.push(setTimeout(() => eng.noteOn(m), at * 1000)); timers.push(setTimeout(() => eng.noteOff(m), (at + dur) * 1000)); });
  }

  /* ficha del patch (tabla) */
  const WN = { saw: 'sawtooth', sq: 'square', tri: 'triangle', off: 'none' };
  const wname = wv => { if (!wv) return '—'; if (wv.startsWith('pw')) return 'PW ' + wv.slice(2) + '%'; return s(WN[wv] || wv); };
  const tname = c => { if (!c) return '0'; const sg = c < 0 ? '−' : '+'; c = Math.abs(c); const o = Math.floor(c / 1200), st = Math.floor((c % 1200) / 100), ct = c % 100; return sg + [o ? o + ' oct' : '', st ? st + ' st' : '', ct ? ct + '¢' : ''].filter(Boolean).join(' '); };
  const tf = v => v >= MAXD - .01 ? 'max' : UI.fmtS(v);
  const RT = { amp: 'amp', pitch: 'pitch', pitch2: 'pitch', cut: 'cutoff', res: 'res', pw: 'pwm', pw1: 'pwm', pw2: 'pwm', noise: 'noise' };
  function sheet(p) {
    const row = (k, v) => '<tr><th>' + k + '</th><td>' + v + '</td></tr>';
    let h = '<table class="sheet">';
    if (p.o1) h += row('OSC 1', wname(p.o1[0]) + ' · ' + tname(p.o1[1]) + ' · ' + p.o1[2] + ' dB');
    if (p.o2) h += row('OSC 2', wname(p.o2[0]) + ' · ' + (p.tr2 !== undefined ? UA.noteName(p.tr2) + ' (' + s('trackOff') + ')' : tname(p.o2[1])) + ' · ' + p.o2[2] + ' dB' + (p.sy ? ' · <b>SYNC</b>' : ''));
    if (p.nz !== undefined) h += row(s('noise'), p.nz + ' dB');
    if (p.l) h += row('LFO', s(p.l[0] === 'noise' ? 'random' : p.l[0]) + ' · ' + p.l[1] + ' Hz · ' + p.l[2].map(([to, d]) => s(RT[to]) + (to === 'pitch2' ? ' (OSC 2)' : to === 'pw1' ? ' (OSC 1)' : to === 'pw2' ? ' (OSC 2)' : '') + ' ' + (to.startsWith('pitch') ? d + '¢' : Math.round(d * 100) + '%')).join(', '));
    const ex = []; if (p.g) ex.push(s('glide') + ' ' + UI.fmtS(p.g)); if (p.u) ex.push('Unison'); ex.push(p.m ? 'Mono' : 'Poly'); h += row(s('voiceMode'), ex.join(' · '));
    h += row(s('filter') + ' LP', '24 dB: <b>' + UI.fmtHz(p.fc[0]) + '</b> (≈' + Math.round(hzToDial(p.fc[0])) + '%) · 12 dB: ' + UI.fmtHz(p.fc[1]) + ' · ' + s('res') + ' ' + p.r + '% · Env ' + p.e + '%');
    const adsr = a => a ? [tf(a[0]), tf(a[1]), Math.round(a[2] * 100) + '%', a[3] === MAXR ? 'max' : UI.fmtS(a[3])].join(' / ') : '—';
    if (p.fe) h += row(s('filtEnv'), adsr(p.fe));
    h += row(s('ampEnv'), adsr(p.ae));
    return h + '</table>';
  }

  /* laboratorio del recetario */
  LABS.cookbook = {
    t: ['Recetario de patches', 'Patch cookbook', 'Patch-Kochbuch', 'パッチ・レシピ集'],
    build(root) {
      const eng = new Engine(); let cat = 'str', cur = null, timers = [];
      const box = el('div', { class: 'sheetbox' });
      const csel = UI.select({ label: s('category'), options: CATS.map(([k, n]) => [k, I18N.t(n)]), value: cat, onChange: v => { cat = v; fillPatches(); } });
      const psel = el('select'); const pwrap = el('label', { class: 'ctl select' }, [el('span', { class: 'lbl', text: 'Patch' }), psel]);
      psel.addEventListener('change', () => pick(+psel.value));
      const tw = {};
      const tweakBox = UI.group(s('tweak'), [
        (tw.fc = UI.slider({ label: s('cutoff') + ' (24 dB)', min: 0, max: 100, step: 1, value: 50, fmt: v => Math.round(v) + '% ≈ ' + UI.fmtHz(dialToHz(v)), onInput: () => reload() })),
        (tw.r = UI.slider({ label: s('res'), min: 0, max: 100, step: 1, value: 0, fmt: v => v + '%', onInput: () => reload() })),
        (tw.e = UI.slider({ label: s('famt'), min: 0, max: 100, step: 1, value: 0, fmt: v => v + '%', onInput: () => reload() })),
        (tw.ar = UI.slider({ label: s('release') + ' (amp)', min: 0.01, max: 6, log: true, value: .3, fmt: UI.fmtS, onInput: () => reload() })),
        UI.button('↺ ' + s('original'), () => pick(cur), 'small')]);
      function fillPatches() { psel.innerHTML = ''; P.forEach((p, i) => { if (p.cat === cat) { const o = el('option', { value: i }); o.textContent = nm(p); psel.appendChild(o); } }); pick(+psel.value); }
      function reload() { if (cur === null) return; const p = P[cur]; eng.load(p, { fc: [dialToHz(tw.fc.get()), p.fc[1]], r: tw.r.get(), e: tw.e.get(), ae: [p.ae[0], p.ae[1], p.ae[2], tw.ar.get()] }); }
      function pick(i) {
        cur = i; const p = P[i]; eng.load(p);
        tw.fc.set(hzToDial(p.fc[0]), true); tw.r.set(p.r, true); tw.e.set(p.e, true); tw.ar.set(Math.max(.01, p.ae[3]), true);
        box.innerHTML = '<h3>' + nm(p) + '</h3>' + sheet(p) + (p.src ? '<p class="info">' + s('cbCited') + '</p>' : '') + (NOTES[p.alt || ''] ? '<p class="info">' + I18N.t(NOTES[p.alt]) + '</p>' : '');
        kb.setBase && kb.setBase((p.oct || (p.cat === 'bass' ? 48 : 60)) - 12);
      }
      const kb = UI.keyboard(m => eng.noteOn(m), m => eng.noteOff(m), { base: 48 });
      const play = UI.button('▶ Demo', () => { timers.forEach(clearTimeout); timers = []; eng.allOff(); UA.ctx(); demo(eng, P[cur], timers); }, 'accent');
      root.append(el('p', { class: 'info', html: s('cbIntro') }), el('div', { class: 'row wrap' }, [csel, pwrap]), el('div', { class: 'row' }, [play]), box, UI.vizPair(), tweakBox, kb);
      fillPatches();
      return () => { timers.forEach(clearTimeout); eng.destroy(); };
    }
  };
  const NOTES = { cello: { es: 'Alternativa del libro si tu sinte no tiene pulso variable: OSC 1 en diente de sierra.', en: 'Book alternative if your synth lacks variable pulse: OSC 1 sawtooth.', de: 'Alternative aus dem Buch ohne variable Pulsbreite: OSZ 1 Sägezahn.', ja: '可変パルスがない場合の本の代替案：OSC1をノコギリ波に。' } };

  window.WELSH = { P, CATS, Engine, demo, nm, dialToHz, hzToDial };
})();
