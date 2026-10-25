/* Laboratorios interactivos */
(function () {
  const s = k => I18N.s(k), el = UI.el, A = UA;
  const L = {};
  const WAVES = [['sine', 'sine'], ['triangle', 'triangle'], ['sawtooth', 'sawtooth'], ['square', 'square'], ['pulse25', 'pulse25'], ['pulse10', 'pulse10']];
  const BASIC = [['sine', 'sine'], ['triangle', 'triangle'], ['sawtooth', 'sawtooth'], ['square', 'square']];

  // voz monofónica genérica con compuerta (para labs de una sola voz)
  function Gate(dest, a, r) {
    const c = A.ctx(); const g = c.createGain(); g.gain.value = 0; g.connect(dest || A.out());
    return {
      node: g, a: a || 0.01, r: r || 0.15,
      on(level) { const t = c.currentTime; g.gain.cancelScheduledValues(t); g.gain.setValueAtTime(g.gain.value, t); g.gain.linearRampToValueAtTime(level || 0.8, t + this.a); },
      off() { const t = c.currentTime; g.gain.cancelScheduledValues(t); g.gain.setValueAtTime(g.gain.value, t); g.gain.setTargetAtTime(0, t, this.r / 4); }
    };
  }

  /* 1. Física del sonido */
  L.tone = {
    t: ['Tono puro, batidos y fase', 'Pure tone, beating and phase', 'Reiner Ton, Schwebung und Phase', '純音・うなり・位相'],
    build(root) {
      const c = A.ctx(); let o1, o2, g2, inv, running = false;
      const st = { f: 220, db: -12, t2: false, beat: 2, inv: false };
      const out = c.createGain(); out.gain.value = 0; out.connect(A.out());
      const info = el('div', { class: 'info big' });
      function upd() {
        const per = 1000 / st.f, wl = 343 / st.f;
        info.innerHTML = '<b>' + UI.fmtHz(st.f) + '</b> · ' + A.freqLabel(st.f) + '<br><small>T = ' + per.toFixed(per < 10 ? 2 : 1) + ' ms · λ = ' + (wl >= 1 ? wl.toFixed(2) + ' m' : (wl * 100).toFixed(1) + ' cm') + ' · ' + st.db.toFixed(0) + ' dBFS</small>';
        if (!running) return; const t = c.currentTime;
        o1.frequency.setTargetAtTime(st.f, t, 0.02); o2.frequency.setTargetAtTime(st.f + st.beat, t, 0.02);
        g2.gain.setTargetAtTime(st.t2 ? 1 : 0, t, 0.02); inv.gain.setTargetAtTime(st.inv ? -1 : 1, t, 0.005);
        out.gain.setTargetAtTime(Math.pow(10, st.db / 20) * (st.t2 ? 0.5 : 1), t, 0.03);
      }
      function start() {
        if (running) return; running = true;
        o1 = c.createOscillator(); o2 = c.createOscillator(); g2 = c.createGain(); inv = c.createGain();
        o1.connect(out); o2.connect(inv); inv.connect(g2); g2.connect(out); o1.start(); o2.start(); upd();
      }
      function stop() { if (!running) return; running = false; const t = c.currentTime; out.gain.setTargetAtTime(0, t, 0.03); const a = o1, b = o2; setTimeout(() => { a.stop(); b.stop(); }, 200); }
      const play = UI.toggle({ label: '▶ ' + s('play'), onChange: v => v ? start() : stop() });
      root.append(UI.vizPair(), info, el('div', { class: 'row' }, [play]),
        UI.group(s('freq'), [
          UI.slider({ label: s('freq'), min: 20, max: 8000, log: true, value: st.f, fmt: UI.fmtHz, onInput: v => { st.f = v; upd(); } }),
          UI.slider({ label: s('amp'), min: -48, max: 0, step: 1, value: st.db, fmt: UI.fmtDb, onInput: v => { st.db = v; upd(); } })]),
        UI.group(s('tone2'), [
          UI.toggle({ label: s('tone2'), onChange: v => { st.t2 = v; upd(); } }),
          UI.slider({ label: s('beat'), min: 0, max: 20, step: 0.1, value: st.beat, fmt: v => v.toFixed(1) + ' Hz', onInput: v => { st.beat = v; upd(); } }),
          UI.toggle({ label: s('invert'), onChange: v => { st.inv = v; upd(); } })]));
      upd();
      return () => { stop(); setTimeout(() => out.disconnect(), 300); };
    }
  };

  /* 2. Formas de onda */
  L.waves = {
    t: ['Formas de onda y ruido', 'Waveforms and noise', 'Wellenformen und Rauschen', '波形とノイズ'],
    build(root) {
      const c = A.ctx(); let src = null, freq = 110, wave = 'sawtooth';
      const gate = Gate(A.out(), 0.01, 0.2);
      const desc = el('div', { class: 'info' });
      const recipe = {
        sine: ['Solo la fundamental. Sin armónicos.', 'Fundamental only. No harmonics.', 'Nur Grundton. Keine Obertöne.', '基音のみ。倍音なし。'],
        triangle: ['Armónicos impares, amplitud 1/n² (caen muy rápido): suena suave, aflautado.', 'Odd harmonics at 1/n² (fall fast): soft, flute-like.', 'Ungerade Obertöne mit 1/n² (fallen schnell): weich, flötenartig.', '奇数倍音、振幅1/n²（急速に減衰）：柔らかくフルート的。'],
        sawtooth: ['Todos los armónicos, amplitud 1/n: brillante, ideal para cuerdas y metales.', 'All harmonics at 1/n: bright, ideal for strings and brass.', 'Alle Obertöne mit 1/n: hell, ideal für Streicher und Bläser.', '全倍音、振幅1/n：明るく、ストリングスやブラスに最適。'],
        square: ['Solo armónicos impares, 1/n: hueco, como un clarinete.', 'Odd harmonics only, 1/n: hollow, clarinet-like.', 'Nur ungerade Obertöne, 1/n: hohl, klarinettenartig.', '奇数倍音のみ、1/n：中空でクラリネット的。'],
        pulse25: ['Pulso 25%: faltan los armónicos múltiplos de 4. Más nasal.', '25% pulse: harmonics that are multiples of 4 are missing. More nasal.', '25%-Puls: Vielfache von 4 fehlen. Nasaler.', '25%パルス：4の倍数次倍音が欠ける。より鼻にかかった音。'],
        pulse10: ['Pulso 10%: faltan múltiplos de 10. Fino y "zumbón".', '10% pulse: multiples of 10 missing. Thin and buzzy.', '10%-Puls: Vielfache von 10 fehlen. Dünn und schnarrend.', '10%パルス：10の倍数次が欠ける。細くブザー的。'],
        white: ['Ruido blanco: igual energía por Hz (suena agudo, "ssss").', 'White noise: equal energy per Hz (sounds bright, "ssss").', 'Weißes Rauschen: gleiche Energie pro Hz (hell, „ssss").', 'ホワイトノイズ：Hzあたり等エネルギー（明るい「シャー」）。'],
        pink: ['Ruido rosa: igual energía por octava (−3 dB/oct). Más natural al oído.', 'Pink noise: equal energy per octave (−3 dB/oct). More natural to the ear.', 'Rosa Rauschen: gleiche Energie pro Oktave (−3 dB/Okt).', 'ピンクノイズ：オクターブあたり等エネルギー（−3dB/oct）。'],
        brown: ['Ruido marrón (browniano): −6 dB/oct. Grave, como un rumor o el mar.', 'Brown (Brownian) noise: −6 dB/oct. Deep, like rumble or surf.', 'Braunes Rauschen: −6 dB/Okt. Tief, wie Brandung.', 'ブラウンノイズ：−6dB/oct。低く、波の音のよう。']
      };
      function build() {
        if (src) { try { src.stop(); } catch (e) { } src.disconnect(); }
        if (['white', 'pink', 'brown'].includes(wave)) { src = A.noise(wave); }
        else { src = c.createOscillator(); A.setWave(src, wave); src.frequency.value = freq; }
        src.connect(gate.node); src.start(); desc.textContent = I18N.t(recipe[wave]);
      }
      build();
      const wsel = UI.select({ label: s('wave'), options: WAVES.concat([['white', 'white'], ['pink', 'pink'], ['brown', 'brown']]), value: wave, onChange: v => { wave = v; build(); } });
      const fs = UI.slider({ label: s('freq'), min: 30, max: 2000, log: true, value: freq, fmt: UI.fmtHz, onInput: v => { freq = v; if (src.frequency) src.frequency.setTargetAtTime(v, c.currentTime, 0.01); } });
      const hold = UI.toggle({ label: s('hold'), onChange: v => v ? gate.on(0.5) : gate.off() });
      const kb = UI.keyboard(m => { freq = A.mtof(m); fs.set(freq, true); if (src.frequency) src.frequency.setValueAtTime(freq, c.currentTime); gate.on(0.5); }, () => { if (!hold.get()) gate.off(); }, { base: 36 });
      root.append(UI.vizPair(), desc, UI.group(s('wave'), [wsel, fs, hold]), kb);
      return () => { gate.off(); setTimeout(() => { try { src.stop(); } catch (e) { } gate.node.disconnect(); }, 300); };
    }
  };

  /* 3. Aditiva */
  L.additive = {
    t: ['Síntesis aditiva: 16 armónicos', 'Additive synthesis: 16 harmonics', 'Additive Synthese: 16 Obertöne', '加算合成：16倍音'],
    build(root) {
      const c = A.ctx(); const N = 16; let amps = new Array(N).fill(0); amps[0] = 1;
      const voices = {}; const out = c.createGain(); out.gain.value = 0.5; out.connect(A.out());
      const sliders = [];
      function wave() { return A.harmonicWave(amps); }
      function refresh() { const w = wave(); for (const m in voices) voices[m].o.setPeriodicWave(w); }
      const grid = el('div', { class: 'harmgrid' });
      for (let i = 0; i < N; i++) {
        const sl = UI.slider({ label: (i + 1) + '×', min: 0, max: 1, step: 0.01, value: amps[i], fmt: v => v.toFixed(2), onInput: v => { amps[i] = v; refresh(); } });
        sliders.push(sl); grid.appendChild(sl);
      }
      const P = {
        sine: n => n === 1 ? 1 : 0, saw: n => 1 / n, square: n => n % 2 ? 1 / n : 0, triangle: n => n % 2 ? 1 / (n * n) : 0,
        organ: n => ({ 1: 1, 2: 0.8, 3: 0.6, 4: 0.5, 6: 0.4, 8: 0.35, 10: 0.2, 12: 0.2, 16: 0.15 })[n] || 0,
        hollow: n => n % 2 ? 0.9 / Math.sqrt(n) : 0.05, formant: n => Math.exp(-Math.pow((n - 7) / 2, 2)) + (n === 1 ? 0.5 : 0), random: () => Math.random() < 0.6 ? Math.random() : 0
      };
      const presetSel = UI.select({ label: s('preset'), options: [['sine', 'sine'], ['saw', 'sawtooth'], ['square', 'square'], ['triangle', 'triangle'], ['organ', 'Órgano / Organ'], ['hollow', 'Hueco / Hollow'], ['formant', 'Formante / Formant'], ['random', 'random']], value: 'sine', onChange: v => { for (let i = 0; i < N; i++) { amps[i] = +P[v](i + 1).toFixed(2); sliders[i].set(amps[i], true); } refresh(); } });
      const kb = UI.keyboard(m => {
        const o = c.createOscillator(), g = c.createGain(); o.setPeriodicWave(wave()); o.frequency.value = A.mtof(m); g.gain.value = 0;
        o.connect(g); g.connect(out); o.start(); g.gain.linearRampToValueAtTime(0.6, c.currentTime + 0.02); voices[m] = { o, g };
      }, m => { const v = voices[m]; if (!v) return; delete voices[m]; v.g.gain.setTargetAtTime(0, c.currentTime, 0.05); v.o.stop(c.currentTime + 0.4); }, { base: 48 });
      root.append(UI.vizPair(), UI.group(s('harmonics'), [presetSel, grid]), kb);
      return () => { for (const m in voices) voices[m].o.stop(); setTimeout(() => out.disconnect(), 300); };
    }
  };

  /* 4. Sintetizador completo */
  function synthPanel(root, synth, opts) {
    opts = opts || {}; const p = synth.p; const ctl = {};
    const S = (k, o) => (ctl[k] = UI.slider(Object.assign({ value: p[k], onInput: v => synth.set(k, v) }, o)));
    const Sel = (k, label, options) => (ctl[k] = UI.select({ label, options, value: p[k], onChange: v => synth.set(k, isNaN(+v) || v === '' ? v : +v) }));
    const T = (k, label) => (ctl[k] = UI.toggle({ label, value: p[k], onChange: v => synth.set(k, v) }));
    const groups = [
      UI.group(s('osc'), [Sel('w1', 'OSC 1', WAVES), Sel('w2', 'OSC 2', WAVES), S('oct2', { label: s('oct2'), min: -2, max: 2, step: 1, fmt: v => (v > 0 ? '+' : '') + v }),
      S('det2', { label: s('detune'), min: -50, max: 50, step: 1, fmt: v => v + '¢' }), S('mix', { label: s('mix') + ' 1↔2', min: 0, max: 1, step: 0.01, fmt: UI.fmtPct }),
      S('sub', { label: s('sub'), min: 0, max: 1, step: 0.01, fmt: UI.fmtPct }), S('noise', { label: s('noise'), min: 0, max: 1, step: 0.01, fmt: UI.fmtPct })]),
      UI.group(s('filter'), [Sel('ftype', s('ftype'), [['lowpass', 'lowpass'], ['highpass', 'highpass'], ['bandpass', 'bandpass'], ['notch', 'notch']]), Sel('slope', s('slope'), [['12', '12 dB/oct'], ['24', '24 dB/oct']]),
      S('cutoff', { label: s('cutoff'), min: 40, max: 18000, log: true, fmt: UI.fmtHz }), S('res', { label: s('res') + ' (Q)', min: 0.5, max: 25, step: 0.1, fmt: v => v.toFixed(1) }),
      S('kbd', { label: s('kbd'), min: 0, max: 1, step: 0.01, fmt: UI.fmtPct }), S('famt', { label: s('famt'), min: 0, max: 6, step: 0.1, fmt: v => '+' + v.toFixed(1) + ' oct' })]),
      UI.group(s('filtEnv'), [S('fa', { label: s('attack'), min: 0.001, max: 4, log: true, fmt: UI.fmtS }), S('fd', { label: s('decay'), min: 0.005, max: 6, log: true, fmt: UI.fmtS }),
      S('fs', { label: s('sustain'), min: 0, max: 1, step: 0.01, fmt: UI.fmtPct }), S('fr', { label: s('release'), min: 0.005, max: 6, log: true, fmt: UI.fmtS })]),
      UI.group(s('ampEnv'), [S('a', { label: s('attack'), min: 0.001, max: 4, log: true, fmt: UI.fmtS }), S('d', { label: s('decay'), min: 0.005, max: 6, log: true, fmt: UI.fmtS }),
      S('s', { label: s('sustain'), min: 0, max: 1, step: 0.01, fmt: UI.fmtPct }), S('r', { label: s('release'), min: 0.005, max: 6, log: true, fmt: UI.fmtS })]),
      UI.group(s('lfo'), [Sel('lshape', s('shape'), BASIC.concat([['sh', 'sh']])), S('lrate', { label: s('rate'), min: 0.05, max: 30, log: true, fmt: v => v.toFixed(2) + ' Hz' }),
      Sel('ldest', s('dest'), [['none', 'none'], ['pitch', 'pitch'], ['cutoff', 'cutoff'], ['amp', 'amp']]), S('ldepth', { label: s('depth'), min: 0, max: 1, step: 0.01, fmt: UI.fmtPct })]),
      UI.group('Global', [S('glide', { label: s('glide'), min: 0, max: 1, step: 0.01, fmt: UI.fmtS }), S('drive', { label: s('drive'), min: 0, max: 1, step: 0.01, fmt: UI.fmtPct }),
      S('vol', { label: s('vol'), min: 0, max: 1, step: 0.01, fmt: UI.fmtPct }), T('mono', s('mono'))])
    ];
    ctl.refresh = function () { for (const k in ctl) if (ctl[k].set && k !== 'refresh') ctl[k].set(k === 'slope' ? String(synth.p[k]) : synth.p[k], true); };
    return { groups, ctl };
  }
  L.synth = {
    t: ['Sintetizador sustractivo completo', 'Full subtractive synthesizer', 'Vollständiger subtraktiver Synth', 'フル減算シンセ'],
    build(root) {
      const syn = new A.Synth(); syn.load(A.presets.init);
      const panel = synthPanel(root, syn);
      const names = Object.keys(A.presets);
      const pre = UI.select({ label: s('preset'), options: names.map(n => [n, n.toUpperCase()]), value: 'init', onChange: v => { syn.allOff(); syn.load(A.presets[v]); panel.ctl.refresh(); } });
      const flow = el('div', { class: 'flow', html: '<span class="b c">VCO 1</span><span class="b c">VCO 2</span><span class="b c">SUB</span><span class="b c">NOISE</span><i>→</i><span class="b m">VCF</span><i>→</i><span class="b y">VCA</span><i>→</i><span class="b">OUT</span><div class="mods"><span class="b s">EG1→VCF</span><span class="b s">EG2→VCA</span><span class="b s">LFO→' + s('dest') + '</span></div>' });
      const kb = UI.keyboard(m => syn.noteOn(m), m => syn.noteOff(m), { base: 48 });
      root.append(UI.vizPair(), UI.group(s('flow'), [flow]), el('div', { class: 'row' }, [pre]), el('div', { class: 'grps' }, panel.groups), kb);
      return () => syn.destroy();
    }
  };

  /* 5. Osciladores: unísono, sync, PWM */
  L.osc = {
    t: ['Osciladores: unísono, sync y PWM', 'Oscillators: unison, sync and PWM', 'Oszillatoren: Unisono, Sync und PWM', 'オシレーター：ユニゾン・シンク・PWM'],
    build(root) {
      const c = A.ctx(); const st = { mode: 'unison', n: 5, spread: 20, wave: 'sawtooth', ratio: 2.5, sweep: false, width: 0.5, pwmLfo: false, prate: 0.8, pdepth: 0.35 };
      const gate = Gate(A.out(), 0.01, 0.25); let nodes = [], f = 110, sweepT = null, lfo = null;
      function clear() { nodes.forEach(n => { try { n.stop && n.stop(); } catch (e) { } try { n.disconnect(); } catch (e) { } }); nodes = []; clearInterval(sweepT); }
      function build() {
        clear();
        const mix = c.createGain(); mix.connect(gate.node); nodes.push(mix);
        if (st.mode === 'unison') {
          mix.gain.value = 0.9 / Math.sqrt(st.n);
          for (let i = 0; i < st.n; i++) { const o = c.createOscillator(); A.setWave(o, st.wave); o.frequency.value = f; o.detune.value = st.n === 1 ? 0 : (i / (st.n - 1) * 2 - 1) * st.spread; o.connect(mix); o.start(); nodes.push(o); }
        } else if (st.mode === 'sync') {
          const o = c.createOscillator(); o.setPeriodicWave(A.syncWave(st.ratio)); o.frequency.value = f; o.connect(mix); o.start(); nodes.push(o); mix.gain.value = 0.6;
          if (st.sweep) { let ph = 0; sweepT = setInterval(() => { ph += 0.04; const r = 1 + 3.5 * (1 - Math.cos(ph)) ; o.setPeriodicWave(A.syncWave(Math.round(r * 20) / 20)); }, 40); }
        } else {
          // pulso = sierra − sierra retardada (ancho = retardo/periodo)
          const a = c.createOscillator(), b = c.createOscillator(), inv = c.createGain(), d = c.createDelay(1);
          a.type = b.type = 'sawtooth'; a.frequency.value = b.frequency.value = f; inv.gain.value = -1; d.delayTime.value = st.width / f;
          a.connect(mix); b.connect(d); d.connect(inv); inv.connect(mix); mix.gain.value = 0.45; a.start(); b.start(); nodes.push(a, b, inv, d);
          if (st.pwmLfo) { lfo = c.createOscillator(); const lg = c.createGain(); lfo.frequency.value = st.prate; lg.gain.value = st.pdepth * 0.48 / f; lfo.connect(lg); lg.connect(d.delayTime); lfo.start(); nodes.push(lfo, lg); }
        }
      }
      function setF(nf) { f = nf; build(); }
      const modeSel = UI.select({ label: s('mode'), options: [['unison', 'unison'], ['sync', 'sync'], ['pwm', 'pwm']], value: st.mode, onChange: v => { st.mode = v; build(); show(); } });
      const gU = UI.group(s('unison'), [UI.select({ label: s('wave'), options: WAVES, value: st.wave, onChange: v => { st.wave = v; build(); } }),
      UI.slider({ label: s('unison'), min: 1, max: 9, step: 1, value: st.n, onInput: v => { st.n = v; build(); } }),
      UI.slider({ label: s('spread'), min: 0, max: 60, step: 1, value: st.spread, fmt: v => '±' + v + '¢', onInput: v => { st.spread = v; build(); } })]);
      const gS = UI.group(s('sync'), [UI.slider({ label: s('ratio') + ' (slave/master)', min: 1, max: 8, step: 0.05, value: st.ratio, fmt: v => v.toFixed(2), onInput: v => { st.ratio = v; build(); } }),
      UI.toggle({ label: s('sweepLfo'), onChange: v => { st.sweep = v; build(); } })]);
      const gP = UI.group(s('pwm'), [UI.slider({ label: s('pwm'), min: 0.02, max: 0.98, step: 0.01, value: st.width, fmt: UI.fmtPct, onInput: v => { st.width = v; build(); } }),
      UI.toggle({ label: s('pwmLfo'), onChange: v => { st.pwmLfo = v; build(); } }),
      UI.slider({ label: s('rate'), min: 0.05, max: 10, log: true, value: st.prate, fmt: v => v.toFixed(2) + ' Hz', onInput: v => { st.prate = v; build(); } }),
      UI.slider({ label: s('depth'), min: 0, max: 1, step: 0.01, value: st.pdepth, fmt: UI.fmtPct, onInput: v => { st.pdepth = v; build(); } })]);
      function show() { gU.style.display = st.mode === 'unison' ? '' : 'none'; gS.style.display = st.mode === 'sync' ? '' : 'none'; gP.style.display = st.mode === 'pwm' ? '' : 'none'; }
      const hold = UI.toggle({ label: s('hold'), onChange: v => { if (v) { build(); gate.on(0.6); } else gate.off(); } });
      const kb = UI.keyboard(m => { setF(A.mtof(m)); gate.on(0.6); }, () => { if (!hold.get()) gate.off(); }, { base: 36 });
      show(); build();
      root.append(UI.vizPair(), el('div', { class: 'row' }, [modeSel, hold]), gU, gS, gP, kb);
      return () => { gate.off(); setTimeout(() => { clear(); gate.node.disconnect(); }, 300); };
    }
  };

  /* 6. Filtros */
  L.filter = {
    t: ['Explorador de filtros', 'Filter explorer', 'Filter-Explorer', 'フィルター・エクスプローラー'],
    build(root) {
      const c = A.ctx(); const st = { src: 'sawtooth', type: 'lowpass', f: 800, q: 6, slope: 12, gain: 6, sweep: false, rate: 0.3 };
      let src = null, f0 = 110;
      const f1 = c.createBiquadFilter(), f2 = c.createBiquadFilter(), gate = Gate(A.out(), 0.01, 0.2);
      const lfo = c.createOscillator(), lg = c.createGain(); lg.gain.value = 0; lfo.frequency.value = st.rate; lfo.connect(lg); lg.connect(f1.detune); lg.connect(f2.detune); lfo.start();
      f1.connect(f2); f2.connect(gate.node);
      const resp = UI.canvas('resp');
      function draw() {
        if (!resp.isConnected) return;
        const g = resp.getContext('2d'), w = resp.width = resp.clientWidth * devicePixelRatio, h = resp.height = resp.clientHeight * devicePixelRatio;
        const css = n => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
        const N = 256, fr = new Float32Array(N), m1 = new Float32Array(N), m2 = new Float32Array(N), p = new Float32Array(N);
        for (let i = 0; i < N; i++) fr[i] = 20 * Math.pow(1000, i / (N - 1));
        f1.getFrequencyResponse(fr, m1, p); f2.getFrequencyResponse(fr, m2, p);
        g.fillStyle = css('--scope-bg'); g.fillRect(0, 0, w, h);
        g.strokeStyle = css('--grid'); g.lineWidth = 1; g.beginPath();
        [-48, -36, -24, -12, 0, 12, 24].forEach(db => { const y = h * (1 - (db + 54) / 84); g.moveTo(0, y); g.lineTo(w, y); }); g.stroke();
        g.fillStyle = css('--muted'); g.font = (10 * devicePixelRatio) + 'px sans-serif'; [-48, -24, 0, 24].forEach(db => g.fillText(db + 'dB', 3, h * (1 - (db + 54) / 84) - 2));
        g.strokeStyle = css('--magenta'); g.lineWidth = 2.5 * devicePixelRatio; g.beginPath();
        for (let i = 0; i < N; i++) { const db = 20 * Math.log10(Math.max(1e-6, m1[i] * m2[i])); const x = i / (N - 1) * w, y = h * (1 - (Math.max(-54, Math.min(30, db)) + 54) / 84); i ? g.lineTo(x, y) : g.moveTo(x, y); }
        g.stroke(); requestAnimationFrame(draw);
      }
      function apply() {
        const t = c.currentTime, two = st.slope === 24 && ['lowpass', 'highpass', 'bandpass', 'notch'].includes(st.type);
        f1.type = st.type; f2.type = two ? st.type : 'allpass';
        f1.frequency.setTargetAtTime(st.f, t, 0.02); f2.frequency.setTargetAtTime(two ? st.f : 20000, t, 0.02);
        f1.Q.setTargetAtTime(st.q, t, 0.02); f2.Q.setTargetAtTime(two ? 0.7 : 0.0001, t, 0.02);
        f1.gain.setTargetAtTime(st.gain, t, 0.02);
        lfo.frequency.setTargetAtTime(st.rate, t, 0.02); lg.gain.setTargetAtTime(st.sweep ? 2400 : 0, t, 0.05);
      }
      function build() {
        if (src) { try { src.stop(); } catch (e) { } src.disconnect(); }
        if (st.src === 'noise') src = A.noise('white'); else { src = c.createOscillator(); A.setWave(src, st.src); src.frequency.value = f0; }
        src.connect(f1); src.start();
      }
      build(); apply();
      const hold = UI.toggle({ label: s('hold'), onChange: v => v ? gate.on(0.5) : gate.off() });
      const kb = UI.keyboard(m => { f0 = A.mtof(m); if (src.frequency) src.frequency.setValueAtTime(f0, c.currentTime); gate.on(0.5); }, () => { if (!hold.get()) gate.off(); }, { base: 36 });
      root.append(UI.vizPair(), el('div', { class: 'vz' }, [el('span', { class: 'vzl', text: s('response') }), resp]),
        UI.group(s('filter'), [
          UI.select({ label: s('source'), options: [['sawtooth', 'sawtooth'], ['square', 'square'], ['pulse10', 'pulse10'], ['noise', 'noise']], value: st.src, onChange: v => { st.src = v; build(); } }),
          UI.select({ label: s('ftype'), options: [['lowpass', 'lowpass'], ['highpass', 'highpass'], ['bandpass', 'bandpass'], ['notch', 'notch'], ['peaking', 'peaking']], value: st.type, onChange: v => { st.type = v; apply(); } }),
          UI.select({ label: s('slope'), options: [['12', '12 dB/oct (2 polos)'], ['24', '24 dB/oct (4 polos)']], value: '12', onChange: v => { st.slope = +v; apply(); } }),
          UI.slider({ label: s('cutoff'), min: 30, max: 18000, log: true, value: st.f, fmt: UI.fmtHz, onInput: v => { st.f = v; apply(); } }),
          UI.slider({ label: s('res') + ' (Q)', min: 0.1, max: 40, log: true, value: st.q, fmt: v => v.toFixed(1), onInput: v => { st.q = v; apply(); } }),
          UI.slider({ label: 'Gain (peaking)', min: -24, max: 24, step: 0.5, value: st.gain, fmt: UI.fmtDb, onInput: v => { st.gain = v; apply(); } }),
          UI.toggle({ label: s('sweepLfo'), onChange: v => { st.sweep = v; apply(); } }),
          UI.slider({ label: s('rate'), min: 0.05, max: 8, log: true, value: st.rate, fmt: v => v.toFixed(2) + ' Hz', onInput: v => { st.rate = v; apply(); } }),
          hold]), kb);
      requestAnimationFrame(draw);
      return () => { gate.off(); setTimeout(() => { try { src.stop(); lfo.stop(); } catch (e) { } gate.node.disconnect(); }, 300); };
    }
  };

  /* 7. Envolventes */
  L.env = {
    t: ['Editor de envolventes ADSR', 'ADSR envelope editor', 'ADSR-Hüllkurveneditor', 'ADSRエンベロープ・エディター'],
    build(root) {
      const syn = new A.Synth(); const st = { a: 0.02, d: 0.4, s: 0.5, r: 0.6, dest: 'amp', vel: 0.85 };
      const cv = UI.canvas('envc');
      function apply() {
        const amp = st.dest !== 'filter', fil = st.dest !== 'amp';
        syn.load({ w1: 'sawtooth', w2: 'sawtooth', det2: 6, cutoff: fil ? 250 : 6000, res: fil ? 7 : 1, famt: fil ? 4.5 : 0, fa: st.a, fd: st.d, fs: st.s, fr: st.r,
          a: amp ? st.a : 0.003, d: amp ? st.d : 0.1, s: amp ? st.s : 1, r: amp ? st.r : Math.max(0.05, st.r), kbd: 0.5, vol: syn.p.vol });
        UI.drawEnv(cv, st.a, st.d, st.s, st.r);
      }
      const ctl = [
        UI.select({ label: s('dest'), options: [['amp', 'amp'], ['filter', 'filter'], ['both', 'Ambos / Both']], value: st.dest, onChange: v => { st.dest = v; apply(); } }),
        UI.slider({ label: s('attack'), min: 0.001, max: 4, log: true, value: st.a, fmt: UI.fmtS, onInput: v => { st.a = v; apply(); } }),
        UI.slider({ label: s('decay'), min: 0.005, max: 6, log: true, value: st.d, fmt: UI.fmtS, onInput: v => { st.d = v; apply(); } }),
        UI.slider({ label: s('sustain'), min: 0, max: 1, step: 0.01, value: st.s, fmt: UI.fmtPct, onInput: v => { st.s = v; apply(); } }),
        UI.slider({ label: s('release'), min: 0.005, max: 6, log: true, value: st.r, fmt: UI.fmtS, onInput: v => { st.r = v; apply(); } }),
        UI.slider({ label: s('velocity'), min: 0.1, max: 1, step: 0.01, value: st.vel, fmt: UI.fmtPct, onInput: v => { st.vel = v; } })];
      const kb = UI.keyboard(m => syn.noteOn(m, st.vel), m => syn.noteOff(m), { base: 48 });
      root.append(el('div', { class: 'vz' }, [el('span', { class: 'vzl', text: 'ADSR' }), cv]), UI.vizPair(), UI.group('ADSR', ctl), kb);
      requestAnimationFrame(apply);
      const onR = () => UI.drawEnv(cv, st.a, st.d, st.s, st.r); window.addEventListener('resize', onR);
      return () => { window.removeEventListener('resize', onR); syn.destroy(); };
    }
  };

  /* 8. LFO */
  L.lfo = {
    t: ['Modulación con LFO', 'LFO modulation', 'LFO-Modulation', 'LFOモジュレーション'],
    build(root) {
      const syn = new A.Synth(); syn.load({ w1: 'sawtooth', w2: 'square', det2: 5, cutoff: 900, res: 8, famt: 0, a: 0.02, s: 1, r: 0.3, ldest: 'cutoff', ldepth: 0.6, lrate: 2, lshape: 'sine' });
      const panel = synthPanel(root, syn);
      const kb = UI.keyboard(m => syn.noteOn(m), m => syn.noteOff(m), { base: 36 });
      const P = (name, patch) => UI.button(name, () => { syn.load(patch); panel.ctl.refresh(); }, 'small');
      const quick = el('div', { class: 'row wrap' }, [
        P('Vibrato', { ldest: 'pitch', ldepth: 0.2, lrate: 5.5, lshape: 'sine' }), P('Trémolo', { ldest: 'amp', ldepth: 0.8, lrate: 6, lshape: 'sine' }),
        P('Wah', { ldest: 'cutoff', ldepth: 0.7, lrate: 1.5, lshape: 'triangle', res: 10 }), P('Trino / Trill', { ldest: 'pitch', ldepth: 1, lrate: 7, lshape: 'square' }),
        P('S&H', { ldest: 'cutoff', ldepth: 0.9, lrate: 8, lshape: 'sh', res: 14 }), P('Sirena', { ldest: 'pitch', ldepth: 1, lrate: 0.4, lshape: 'sawtooth' })]);
      root.append(UI.vizPair(), quick, el('div', { class: 'grps' }, [panel.groups[4], panel.groups[1], panel.groups[0]]), kb);
      return () => syn.destroy();
    }
  };

  /* 9. Reto de igualación */
  L.match = {
    t: ['Reto: reproducí el sonido', 'Challenge: recreate the sound', 'Challenge: Klang nachbauen', 'チャレンジ：音を再現'],
    build(root) {
      const mine = new A.Synth(), tgt = new A.Synth();
      const keys = [['w1', 'wave'], ['cutoff', 'cutoff'], ['res', 'res'], ['famt', 'famt'], ['a', 'attack'], ['d', 'decay'], ['s', 'sustain'], ['r', 'release']];
      let target = null; const res = el('div', { class: 'info big' });
      const rnd = (a, b) => a + Math.random() * (b - a), lrnd = (a, b) => a * Math.pow(b / a, Math.random());
      function newTarget() {
        target = { w1: ['sawtooth', 'square', 'triangle', 'sine'][Math.floor(Math.random() * 4)], cutoff: lrnd(150, 6000), res: rnd(0.7, 15), famt: rnd(0, 5), a: lrnd(0.002, 1.2), d: lrnd(0.05, 1.5), s: rnd(0, 1), r: lrnd(0.02, 1.5) };
        tgt.load(Object.assign({ w2: 'sine', mix: 0, fa: 0.003, fd: 0.3, fs: 0, mono: true }, target, { fd: target.d, fs: target.s * 0.5 }));
        res.textContent = '';
      }
      mine.load({ w2: 'sine', mix: 0, fa: 0.003, fd: 0.3, fs: 0, mono: true, cutoff: 1000, res: 2, famt: 1 });
      function phrase(sy) { const t = A.now() + 0.05; [[45, 0, 0.7], [52, 0.9, 0.35], [57, 1.35, 0.35]].forEach(([m, o, d]) => sy.trigger(m, d, t + o)); }
      function score() {
        let sum = 0; const p = mine.p;
        sum += p.w1 === target.w1 ? 0 : 1;
        sum += Math.min(1, Math.abs(Math.log2(p.cutoff / target.cutoff)) / 3);
        sum += Math.min(1, Math.abs(p.res - target.res) / 10);
        sum += Math.min(1, Math.abs(p.famt - target.famt) / 3);
        ['a', 'd', 'r'].forEach(k => sum += Math.min(1, Math.abs(Math.log2(p[k] / target[k])) / 4));
        sum += Math.min(1, Math.abs(p.s - target.s) * 1.5);
        return Math.round(100 * (1 - sum / 8));
      }
      const ctl = {};
      const sync = () => mine.load({ fd: mine.p.d, fs: mine.p.s * 0.5 });
      const S = (k, o) => (ctl[k] = UI.slider(Object.assign({ value: mine.p[k], onInput: v => { mine.set(k, v); sync(); } }, o)));
      const groups = UI.group(s('synthL'), [
        (ctl.w1 = UI.select({ label: s('wave'), options: BASIC, value: mine.p.w1, onChange: v => mine.set('w1', v) })),
        S('cutoff', { label: s('cutoff'), min: 100, max: 10000, log: true, fmt: UI.fmtHz }), S('res', { label: s('res'), min: 0.5, max: 18, step: 0.1, fmt: v => v.toFixed(1) }),
        S('famt', { label: s('famt'), min: 0, max: 6, step: 0.1, fmt: v => v.toFixed(1) + ' oct' }),
        S('a', { label: s('attack'), min: 0.001, max: 2, log: true, fmt: UI.fmtS }), S('d', { label: s('decay'), min: 0.02, max: 3, log: true, fmt: UI.fmtS }),
        S('s', { label: s('sustain'), min: 0, max: 1, step: 0.01, fmt: UI.fmtPct }), S('r', { label: s('release'), min: 0.01, max: 3, log: true, fmt: UI.fmtS })]);
      newTarget();
      const btns = el('div', { class: 'row wrap' }, [
        UI.button('🎯 ' + s('target'), () => phrase(tgt), 'accent'), UI.button('🎛 ' + s('mine'), () => phrase(mine)),
        UI.button('✓ ' + s('check'), () => { const sc = score(); res.innerHTML = s('similarity') + ': <b>' + sc + '%</b>'; App.recordEar && App.recordEar(sc >= 80); }),
        UI.button(s('reveal'), () => { const T = target; res.innerHTML = keys.map(([k, l]) => s(l) + ': <b>' + (k === 'w1' ? s(T[k]) : k === 'cutoff' ? UI.fmtHz(T[k]) : ['a', 'd', 'r'].includes(k) ? UI.fmtS(T[k]) : k === 's' ? UI.fmtPct(T[k]) : T[k].toFixed(1)) + '</b>').join(' · '); }, 'small'),
        UI.button('↻ ' + s('newT'), newTarget, 'small')]);
      root.append(el('p', { class: 'info', text: s('challengeTxt') }), btns, res, UI.vizPair(), groups);
      return () => { mine.destroy(); tgt.destroy(); };
    }
  };

  /* 10. FM */
  L.fm = {
    t: ['Síntesis FM de 2 operadores', '2-operator FM synthesis', '2-Operator-FM-Synthese', '2オペレーターFM合成'],
    build(root) {
      const c = A.ctx(); const st = { ratio: 1, fine: 0, index: 3, envAmt: 4, envDec: 0.6, a: 0.005, r: 0.6, cw: 'sine', mw: 'sine' };
      const voices = {}; const out = c.createGain(); out.gain.value = 0.5; out.connect(A.out());
      const info = el('div', { class: 'info' });
      function ratio() { return st.ratio + st.fine; }
      function upd() {
        const r = ratio(), fc = 220, fm = fc * r; const sb = [];
        for (let k = -3; k <= 3; k++) { const f = fc + k * fm; sb.push((k === 0 ? '<b>' : '') + Math.abs(Math.round(f)) + (k === 0 ? '</b>' : '')); }
        const harm = Math.abs(r * 2 - Math.round(r * 2)) < 0.001 || Math.abs(1 / r - Math.round(1 / r)) < 0.001;
        info.innerHTML = 'C:M = 1 : ' + r.toFixed(3) + ' → ' + (harm ? s('harmonic') : s('inharmonic')) + '<br><small>fc ± k·fm (fc = 220 Hz): ' + sb.join(' · ') + ' Hz · BW ≈ 2(I+1)fm = ' + Math.round(2 * (st.index + 1) * fm) + ' Hz</small>';
        const t = c.currentTime; for (const m in voices) { const v = voices[m]; v.mod.frequency.setTargetAtTime(v.f * r, t, 0.01); }
      }
      const kb = UI.keyboard(m => {
        const t = c.currentTime, f = A.mtof(m), r = ratio();
        const car = c.createOscillator(), mod = c.createOscillator(), mg = c.createGain(), vca = c.createGain();
        A.setWave(car, st.cw); A.setWave(mod, st.mw); car.frequency.value = f; mod.frequency.value = f * r;
        mod.connect(mg); mg.connect(car.frequency); car.connect(vca); vca.connect(out);
        const fmHz = f * r; mg.gain.setValueAtTime((st.index + st.envAmt) * fmHz, t); mg.gain.setTargetAtTime(st.index * fmHz, t, st.envDec / 3);
        vca.gain.setValueAtTime(0, t); vca.gain.linearRampToValueAtTime(0.5, t + st.a);
        car.start(t); mod.start(t); voices[m] = { car, mod, mg, vca, f };
      }, m => { const v = voices[m]; if (!v) return; delete voices[m]; const t = c.currentTime; A.envOff(v.vca.gain, t, 0, st.r); v.car.stop(t + st.r * 2 + 0.1); v.mod.stop(t + st.r * 2 + 0.1); }, { base: 48 });
      const P = (name, o) => UI.button(name, () => { Object.assign(st, o); for (const k in ctl) ctl[k].set(st[k], true); upd(); }, 'small');
      const ctl = {
        ratio: UI.slider({ label: s('ratio') + ' M/C', min: 0.5, max: 12, step: 0.5, value: st.ratio, fmt: v => v.toFixed(1), onInput: v => { st.ratio = v; upd(); } }),
        fine: UI.slider({ label: s('fine'), min: -0.5, max: 0.5, step: 0.001, value: st.fine, fmt: v => (v >= 0 ? '+' : '') + v.toFixed(3), onInput: v => { st.fine = v; upd(); } }),
        index: UI.slider({ label: s('index') + ' (I)', min: 0, max: 20, step: 0.1, value: st.index, fmt: v => v.toFixed(1), onInput: v => { st.index = v; upd(); for (const m in voices) voices[m].mg.gain.setTargetAtTime(v * voices[m].f * ratio(), c.currentTime, 0.02); } }),
        envAmt: UI.slider({ label: s('envAmt'), min: 0, max: 20, step: 0.1, value: st.envAmt, fmt: v => '+' + v.toFixed(1), onInput: v => { st.envAmt = v; } }),
        envDec: UI.slider({ label: s('decay'), min: 0.02, max: 4, log: true, value: st.envDec, fmt: UI.fmtS, onInput: v => { st.envDec = v; } }),
        r: UI.slider({ label: s('release'), min: 0.02, max: 4, log: true, value: st.r, fmt: UI.fmtS, onInput: v => { st.r = v; } })
      };
      const quick = el('div', { class: 'row wrap' }, [
        P('E.Piano', { ratio: 1, fine: 0, index: 1.2, envAmt: 5, envDec: 0.8, r: 0.8 }), P('Bell 1:3.5', { ratio: 3.5, fine: 0, index: 2, envAmt: 6, envDec: 2.5, r: 2.5 }),
        P('Bass 1:1', { ratio: 1, fine: 0, index: 2.5, envAmt: 6, envDec: 0.25, r: 0.15 }), P('Brass 1:1', { ratio: 1, fine: 0, index: 1.5, envAmt: 3, envDec: 0.4, r: 0.3 }),
        P('Clarinete 1:2', { ratio: 2, fine: 0, index: 1.8, envAmt: 1, envDec: 0.3, r: 0.2 }), P('Metal 1:1.414', { ratio: 1, fine: 0.414, index: 6, envAmt: 8, envDec: 1.5, r: 1.5 })]);
      upd();
      root.append(UI.vizPair(), info, quick, UI.group('FM', Object.values(ctl)), kb);
      return () => { for (const m in voices) { voices[m].car.stop(); voices[m].mod.stop(); } setTimeout(() => out.disconnect(), 300); };
    }
  };

  /* 11. Ring / AM / waveshaping */
  L.shaper = {
    t: ['Anillo, AM y conformado de onda', 'Ring, AM and waveshaping', 'Ring, AM und Waveshaping', 'リング・AM・ウェーブシェイピング'],
    build(root) {
      const c = A.ctx(); const st = { mod: 'ring', mf: 330, mw: 'sine', depth: 1, curve: 'tanh', amt: 0.3, pre: 1, wave: 'sine', follow: false, mratio: 1.5 };
      let f = 220; const car = c.createOscillator(); car.type = st.wave; car.frequency.value = f;
      const vca = c.createGain(); const modO = c.createOscillator(); modO.frequency.value = st.mf; const modG = c.createGain();
      modO.connect(modG); modG.connect(vca.gain);
      const pre = c.createGain(), sh = c.createWaveShaper(); sh.oversample = '4x'; const post = c.createGain(); post.gain.value = 0.5;
      const gate = Gate(A.out(), 0.01, 0.2);
      car.connect(vca); vca.connect(pre); pre.connect(sh); sh.connect(post); post.connect(gate.node); car.start(); modO.start();
      const cv = UI.canvas('curve');
      function apply() {
        const t = c.currentTime;
        if (st.mod === 'off') { vca.gain.setValueAtTime(1, t); modG.gain.setValueAtTime(0, t); }
        else if (st.mod === 'ring') { vca.gain.setValueAtTime(0, t); modG.gain.setTargetAtTime(st.depth, t, 0.01); }
        else { vca.gain.setValueAtTime(1 - st.depth / 2, t); modG.gain.setTargetAtTime(st.depth / 2, t, 0.01); }
        modO.frequency.setTargetAtTime(st.follow ? f * st.mratio : st.mf, t, 0.01); A.setWave(modO, st.mw);
        pre.gain.setTargetAtTime(st.pre, t, 0.01);
        const curve = st.curve === 'off' ? null : A.curve(st.curve, st.amt); sh.curve = curve; drawCurve(curve);
      }
      function drawCurve(curve) {
        if (!cv.isConnected) return;
        const g = cv.getContext('2d'), w = cv.width = cv.clientWidth * devicePixelRatio, h = cv.height = cv.clientHeight * devicePixelRatio;
        const css = n => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
        g.fillStyle = css('--scope-bg'); g.fillRect(0, 0, w, h); g.strokeStyle = css('--grid'); g.beginPath(); g.moveTo(w / 2, 0); g.lineTo(w / 2, h); g.moveTo(0, h / 2); g.lineTo(w, h / 2); g.stroke();
        g.strokeStyle = css('--yellow'); g.lineWidth = 2.5 * devicePixelRatio; g.beginPath();
        const n = curve ? curve.length : 2; for (let i = 0; i < n; i++) { const x = i / (n - 1) * w, y = h / 2 - (curve ? curve[i] : (i ? 1 : -1)) * h * 0.45; i ? g.lineTo(x, y) : g.moveTo(x, y); } g.stroke();
      }
      const hold = UI.toggle({ label: s('hold'), onChange: v => v ? gate.on(0.6) : gate.off() });
      const kb = UI.keyboard(m => { f = A.mtof(m); car.frequency.setValueAtTime(f, c.currentTime); apply(); gate.on(0.6); }, () => { if (!hold.get()) gate.off(); }, { base: 36 });
      root.append(UI.vizPair(),
        UI.group(s('mode'), [
          UI.select({ label: s('carrier'), options: BASIC, value: st.wave, onChange: v => { car.type = v; } }),
          UI.select({ label: s('mode'), options: [['off', 'none'], ['ring', 'ring'], ['am', 'am']], value: st.mod, onChange: v => { st.mod = v; apply(); } }),
          UI.select({ label: s('modulator'), options: BASIC, value: st.mw, onChange: v => { st.mw = v; apply(); } }),
          UI.slider({ label: s('modulator') + ' Hz', min: 0.5, max: 3000, log: true, value: st.mf, fmt: UI.fmtHz, onInput: v => { st.mf = v; apply(); } }),
          UI.toggle({ label: s('kbd') + ' (' + s('ratio') + ')', onChange: v => { st.follow = v; apply(); } }),
          UI.slider({ label: s('ratio'), min: 0.25, max: 8, step: 0.01, value: st.mratio, fmt: v => v.toFixed(2), onInput: v => { st.mratio = v; apply(); } }),
          UI.slider({ label: s('depth'), min: 0, max: 1, step: 0.01, value: st.depth, fmt: UI.fmtPct, onInput: v => { st.depth = v; apply(); } })]),
        UI.group(s('shaper'), [el('div', { class: 'vz small' }, [el('span', { class: 'vzl', text: s('curveT') }), cv]),
          UI.select({ label: s('curveT'), options: [['off', 'none'], ['tanh', 'Tanh (soft clip)'], ['hard', 'Hard clip'], ['fold', 'Wavefolder'], ['cheby', 'Chebyshev T3'], ['rect', 'Rectifier'], ['bits', 'Bitcrush']], value: st.curve, onChange: v => { st.curve = v; apply(); } }),
          UI.slider({ label: s('amount'), min: 0, max: 1, step: 0.01, value: st.amt, fmt: UI.fmtPct, onInput: v => { st.amt = v; apply(); } }),
          UI.slider({ label: s('inputGain'), min: 0.1, max: 4, step: 0.01, value: st.pre, fmt: v => v.toFixed(2) + '×', onInput: v => { st.pre = v; apply(); } })]),
        hold, kb);
      requestAnimationFrame(apply);
      return () => { gate.off(); setTimeout(() => { car.stop(); modO.stop(); gate.node.disconnect(); }, 300); };
    }
  };

  /* 12. Wavetable */
  L.wavetable = {
    t: ['Wavetable: barrido de formas', 'Wavetable scanning', 'Wavetable-Scanning', 'ウェーブテーブル・スキャン'],
    build(root) {
      const c = A.ctx();
      const frames = [
        ['Sine', p => Math.sin(2 * Math.PI * p)], ['Tri', p => 1 - 4 * Math.abs(((p + 0.25) % 1) - 0.5)], ['Saw', p => 2 * ((p + 0.5) % 1) - 1], ['Square', p => p < 0.5 ? 1 : -1],
        ['Pulse', p => p < 0.15 ? 1 : -0.3], ['Formant', p => Math.sin(2 * Math.PI * p * 7) * Math.pow(Math.sin(Math.PI * p), 2)], ['Sync', p => 2 * ((p * 3.3) % 1) - 1], ['Fold', p => Math.sin(Math.PI * 3 * Math.sin(2 * Math.PI * p))]
      ];
      const waves = frames.map(([, fn]) => A.waveFromCycle(fn, 96));
      const st = { pos: 0, scan: false, rate: 0.2 }; let f = 110;
      const gate = Gate(A.out(), 0.01, 0.25); const oscs = [], gains = [];
      frames.forEach((fr, i) => { const o = c.createOscillator(), g = c.createGain(); o.setPeriodicWave(waves[i]); o.frequency.value = f; g.gain.value = 0; o.connect(g); g.connect(gate.node); o.start(); oscs.push(o); gains.push(g); });
      const cv = UI.canvas('wt'), lab = el('div', { class: 'info' });
      function setPos(p, smooth) {
        st.pos = p; const t = c.currentTime;
        gains.forEach((g, i) => { const w = Math.max(0, 1 - Math.abs(p - i)); g.gain.setTargetAtTime(Math.sin(w * Math.PI / 2) * 0.5, t, smooth ? 0.03 : 0.005); });
        const i0 = Math.floor(p), i1 = Math.min(frames.length - 1, i0 + 1), fr = p - i0;
        lab.textContent = frames[i0][0] + (fr > 0.01 && i1 !== i0 ? ' → ' + frames[i1][0] + ' (' + Math.round(fr * 100) + '%)' : '');
        if (!cv.isConnected) return;
        const g = cv.getContext('2d'), w = cv.width = cv.clientWidth * devicePixelRatio, h = cv.height = cv.clientHeight * devicePixelRatio;
        const css = n => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
        g.fillStyle = css('--scope-bg'); g.fillRect(0, 0, w, h);
        // pila 3D de frames
        frames.forEach((frm, i) => {
          const oy = h * 0.82 - i * h * 0.075, ox = i * w * 0.035, ww = w * 0.7; g.globalAlpha = Math.abs(i - p) < 1 ? 1 : 0.25;
          g.strokeStyle = Math.abs(i - p) < 0.5 ? css('--yellow') : css('--cyan'); g.lineWidth = 1.2 * devicePixelRatio; g.beginPath();
          for (let k = 0; k <= 80; k++) { const ph = k / 80, x = ox + 10 + ph * ww, y = oy - frm[1](ph) * h * 0.1; k ? g.lineTo(x, y) : g.moveTo(x, y); } g.stroke();
        });
        g.globalAlpha = 1;
      }
      let raf = null, ph = 0, last = performance.now();
      function scan(now) { if (!st.scan || !cv.isConnected) return; const dt = (now - last) / 1000; last = now; ph += dt * st.rate; setPos((1 - Math.cos(ph * 2 * Math.PI)) / 2 * (frames.length - 1), true); posS.set(st.pos, true); raf = requestAnimationFrame(scan); }
      const posS = UI.slider({ label: s('morph'), min: 0, max: frames.length - 1, step: 0.01, value: 0, fmt: v => v.toFixed(2), onInput: v => setPos(v, true) });
      const hold = UI.toggle({ label: s('hold'), onChange: v => v ? gate.on(0.7) : gate.off() });
      const kb = UI.keyboard(m => { f = A.mtof(m); oscs.forEach(o => o.frequency.setValueAtTime(f, c.currentTime)); gate.on(0.7); }, () => { if (!hold.get()) gate.off(); }, { base: 36 });
      root.append(el('div', { class: 'vz' }, [el('span', { class: 'vzl', text: 'Wavetable' }), cv]), lab, UI.vizPair(),
        UI.group('Wavetable', [posS, UI.toggle({ label: s('scan'), onChange: v => { st.scan = v; if (v) { last = performance.now(); raf = requestAnimationFrame(scan); } } }),
          UI.slider({ label: s('rate'), min: 0.02, max: 4, log: true, value: st.rate, fmt: v => v.toFixed(2) + ' Hz', onInput: v => { st.rate = v; } }), hold]), kb);
      requestAnimationFrame(() => setPos(0));
      return () => { st.scan = false; gate.off(); setTimeout(() => { oscs.forEach(o => o.stop()); gate.node.disconnect(); }, 300); };
    }
  };

  /* 13. Granular */
  let grainSrc = null;
  function makeGrainSource() {
    if (grainSrc) return grainSrc;
    const c = A.ctx(), sr = c.sampleRate, dur = 4, len = sr * dur, b = c.createBuffer(1, len, sr), d = b.getChannelData(0);
    const notes = [[0, 57, [700, 1100]], [1, 60, [300, 900]], [2, 64, [450, 2200]], [3, 55, [600, 1000]]];
    const F = (fq, fc, bw) => Math.exp(-Math.pow((fq - fc) / bw, 2));
    for (const [st, m, fm] of notes) {
      const f0 = A.mtof(m), s0 = st * sr, n = sr;
      const amps = []; for (let k = 1; k * f0 < 5000; k++) amps.push((F(k * f0, fm[0], 180) + 0.7 * F(k * f0, fm[1], 300) + 0.15 / k));
      for (let i = 0; i < n; i++) {
        const t = i / sr, env = Math.min(1, t * 30) * Math.min(1, (1 - t) * 8), vib = 1 + 0.006 * Math.sin(2 * Math.PI * 5 * t);
        let v = 0; for (let k = 0; k < amps.length; k++) v += amps[k] * Math.sin(2 * Math.PI * f0 * (k + 1) * t * vib);
        d[s0 + i] += v * env * 0.12;
      }
    }
    return (grainSrc = b);
  }
  L.granular = {
    t: ['Síntesis granular', 'Granular synthesis', 'Granularsynthese', 'グラニュラー合成'],
    build(root) {
      const c = A.ctx(), buf = makeGrainSource(); const st = { pos: 0.3, size: 0.08, dens: 25, spray: 0.02, pitch: 0, pr: 0, on: false };
      const out = c.createGain(); out.gain.value = 0.7; out.connect(A.out());
      const win = new Float32Array(64); for (let i = 0; i < 64; i++) win[i] = Math.sin(Math.PI * i / 63) ** 2;
      let next = 0, timer = null; const marks = [];
      function grain(t) {
        const src = c.createBufferSource(), g = c.createGain(); src.buffer = buf;
        src.playbackRate.value = Math.pow(2, (st.pitch + (Math.random() * 2 - 1) * st.pr) / 12);
        const start = Math.max(0, Math.min(buf.duration - st.size, st.pos * buf.duration + (Math.random() * 2 - 1) * st.spray * buf.duration));
        g.gain.setValueAtTime(0, t); g.gain.setValueCurveAtTime(win, t, st.size);
        src.connect(g); g.connect(out); src.start(t, start, st.size * src.playbackRate.value + 0.01); src.stop(t + st.size + 0.02);
        marks.push({ x: start / buf.duration, t: performance.now() });
      }
      function sched() { const now = c.currentTime; if (next < now) next = now + 0.01; while (next < now + 0.1) { grain(next); next += 1 / st.dens * (0.8 + Math.random() * 0.4); } }
      function play(v) { st.on = v; clearInterval(timer); if (v) { next = 0; timer = setInterval(sched, 25); } }
      const cv = UI.canvas('gran'); const data = buf.getChannelData(0);
      function draw() {
        if (!cv.isConnected) return;
        const g = cv.getContext('2d'), w = cv.width = cv.clientWidth * devicePixelRatio, h = cv.height = cv.clientHeight * devicePixelRatio;
        const css = n => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
        g.fillStyle = css('--scope-bg'); g.fillRect(0, 0, w, h); g.fillStyle = css('--cyan');
        const step = Math.floor(data.length / w); for (let x = 0; x < w; x++) { let mx = 0; for (let i = 0; i < step; i += 8) mx = Math.max(mx, Math.abs(data[x * step + i])); g.fillRect(x, h / 2 - mx * h * 0.45, 1, mx * h * 0.9); }
        g.fillStyle = 'rgba(212,191,60,0.25)'; g.fillRect((st.pos - st.spray) * w, 0, Math.max(2, st.spray * 2 * w), h);
        g.fillStyle = css('--yellow'); g.fillRect(st.pos * w - 1, 0, 2 * devicePixelRatio, h);
        const now = performance.now(); g.fillStyle = css('--magenta');
        while (marks.length && now - marks[0].t > 400) marks.shift();
        marks.forEach(m => { g.globalAlpha = 1 - (now - m.t) / 400; g.beginPath(); g.arc(m.x * w, h * (0.2 + Math.random() * 0.6), 3 * devicePixelRatio, 0, 7); g.fill(); }); g.globalAlpha = 1;
        requestAnimationFrame(draw);
      }
      const ctl = [
        UI.toggle({ label: '▶ ' + s('play'), onChange: play }),
        UI.slider({ label: s('position'), min: 0, max: 1, step: 0.001, value: st.pos, fmt: UI.fmtPct, onInput: v => st.pos = v }),
        UI.slider({ label: s('size'), min: 0.005, max: 0.5, log: true, value: st.size, fmt: UI.fmtS, onInput: v => st.size = v }),
        UI.slider({ label: s('density'), min: 1, max: 120, log: true, value: st.dens, fmt: v => v.toFixed(0) + ' /s', onInput: v => st.dens = v }),
        UI.slider({ label: s('spray'), min: 0, max: 0.3, step: 0.001, value: st.spray, fmt: UI.fmtPct, onInput: v => st.spray = v }),
        UI.slider({ label: s('grainPitch'), min: -24, max: 24, step: 1, value: st.pitch, fmt: v => (v > 0 ? '+' : '') + v + ' st', onInput: v => st.pitch = v }),
        UI.slider({ label: s('pitchR'), min: 0, max: 12, step: 0.1, value: st.pr, fmt: v => '±' + v.toFixed(1) + ' st', onInput: v => st.pr = v })];
      const kb = UI.keyboard(m => { st.pitch = m - 60; ctl[5].set(st.pitch, true); if (!st.on) { ctl[0].set(true); } }, () => { }, { base: 48 });
      root.append(el('div', { class: 'vz' }, [el('span', { class: 'vzl', text: s('source') }), cv]), UI.vizPair(), UI.group('Granular', ctl), kb);
      requestAnimationFrame(draw);
      return () => { play(false); setTimeout(() => out.disconnect(), 800); };
    }
  };

  /* 14. Karplus-Strong */
  L.karplus = {
    t: ['Modelado físico: Karplus-Strong', 'Physical modeling: Karplus-Strong', 'Physical Modeling: Karplus-Strong', '物理モデリング：カープラス・ストロング'],
    build(root) {
      const c = A.ctx(); const st = { decay: 0.996, damp: 0.5, bright: 0.8, pick: 0.13, len: 3 };
      const out = c.createGain(); out.gain.value = 0.8; out.connect(A.out());
      function pluck(m) {
        const sr = c.sampleRate, f = A.mtof(m), L = sr / f, n = Math.floor(sr * st.len), y = new Float32Array(n);
        const P = Math.floor(L); const x = new Float32Array(P + 2); let lp = 0;
        for (let i = 0; i < P; i++) { const w = Math.random() * 2 - 1; lp = lp + st.bright * (w - lp); x[i] = lp; }
        const pk = Math.max(1, Math.round(st.pick * P)); const ex = new Float32Array(P); for (let i = 0; i < P; i++) ex[i] = x[i] - (i >= pk ? x[i - pk] : 0);
        const D = L - 0.5, Di = Math.floor(D), fr = D - Di; let prev = 0;
        for (let i = 0; i < n; i++) {
          const a = i - Di >= 0 ? y[i - Di] : 0, b = i - Di - 1 >= 0 ? y[i - Di - 1] : 0; const yd = a * (1 - fr) + b * fr;
          const filt = (1 - st.damp) * yd + st.damp * prev; prev = yd;
          y[i] = (i < P ? ex[i] : 0) + st.decay * filt;
        }
        let mx = 0; for (let i = 0; i < n; i++) mx = Math.max(mx, Math.abs(y[i])); const k = mx > 0 ? 0.6 / mx : 1;
        const b = c.createBuffer(1, n, sr), d = b.getChannelData(0); for (let i = 0; i < n; i++) d[i] = y[i] * k * Math.min(1, (n - i) / 400);
        const src = c.createBufferSource(); src.buffer = b; src.connect(out); src.start();
      }
      const ctl = [
        UI.slider({ label: s('decay') + ' (g)', min: 0.95, max: 0.9995, step: 0.0005, value: st.decay, fmt: v => v.toFixed(4), onInput: v => st.decay = v }),
        UI.slider({ label: s('damping'), min: 0.05, max: 0.95, step: 0.01, value: st.damp, fmt: v => v.toFixed(2), onInput: v => st.damp = v }),
        UI.slider({ label: s('bright') + ' (exc.)', min: 0.05, max: 1, step: 0.01, value: st.bright, fmt: UI.fmtPct, onInput: v => st.bright = v }),
        UI.slider({ label: s('pick'), min: 0.02, max: 0.5, step: 0.01, value: st.pick, fmt: UI.fmtPct, onInput: v => st.pick = v }),
        UI.slider({ label: s('time'), min: 0.5, max: 6, step: 0.1, value: st.len, fmt: UI.fmtS, onInput: v => st.len = v })];
      const strum = UI.button('🎸 Strum E-A-D-G-B-E', () => { [40, 45, 50, 55, 59, 64].forEach((m, i) => setTimeout(() => pluck(m), i * 35)); }, 'accent');
      const kb = UI.keyboard(m => pluck(m), () => { }, { base: 40 });
      root.append(UI.vizPair(), el('div', { class: 'row' }, [strum]), UI.group('Karplus-Strong', ctl), kb);
      return () => setTimeout(() => out.disconnect(), 5000);
    }
  };

  /* 15. Efectos */
  L.fx = {
    t: ['Rack de efectos', 'Effects rack', 'Effekt-Rack', 'エフェクト・ラック'],
    build(root) {
      const c = A.ctx(); const input = c.createGain(); const out = c.createGain(); out.connect(A.out());
      function stage(build) { const i = c.createGain(), o = c.createGain(), dry = c.createGain(), wet = c.createGain(); i.connect(dry); dry.connect(o); const fx = build(i, wet); wet.connect(o); wet.gain.value = 0; return { i, o, dry, wet, fx }; }
      const ch = stage((i, wet) => { const d = c.createDelay(0.1), l = c.createOscillator(), lg = c.createGain(); d.delayTime.value = 0.018; l.frequency.value = 0.7; lg.gain.value = 0.004; l.connect(lg); lg.connect(d.delayTime); l.start(); i.connect(d); d.connect(wet); return { l, lg, d }; });
      const ph = stage((i, wet) => { const l = c.createOscillator(), lg = c.createGain(); l.frequency.value = 0.4; lg.gain.value = 700; l.connect(lg); l.start(); let n = i; const aps = []; for (let k = 0; k < 6; k++) { const a = c.createBiquadFilter(); a.type = 'allpass'; a.frequency.value = 900; a.Q.value = 0.6; lg.connect(a.frequency); n.connect(a); n = a; aps.push(a); } n.connect(wet); return { l, lg }; });
      const dl = stage((i, wet) => { const d = c.createDelay(2), fb = c.createGain(), lp = c.createBiquadFilter(); d.delayTime.value = 0.375; fb.gain.value = 0.45; lp.frequency.value = 3500; i.connect(d); d.connect(lp); lp.connect(fb); fb.connect(d); lp.connect(wet); return { d, fb }; });
      const rv = stage((i, wet) => { const cv = c.createConvolver(); cv.buffer = A.impulse(2.8, 3); i.connect(cv); cv.connect(wet); return { cv }; });
      input.connect(ch.i); ch.o.connect(ph.i); ph.o.connect(dl.i); dl.o.connect(rv.i); rv.o.connect(out);
      const syn = new A.Synth(input); syn.load(A.presets.pluck); syn.set('vol', 0.5);
      let loop = null, step = 0, nextT = 0; const pat = [57, 64, 69, 72, 64, 69, 76, 72], bpm = 112;
      function tick() { const now = c.currentTime; if (nextT < now) nextT = now + 0.05; while (nextT < now + 0.12) { const sp = 60 / bpm / 2; syn.trigger(pat[step % 8], sp * 0.6, nextT); if (step % 4 === 0) A.drum('kick', nextT, input, 0.8); if (step % 4 === 2) A.drum('snare', nextT, input, 0.6); A.drum('hat', nextT, input, 0.4); step++; nextT += sp; } }
      const wetMix = (stg, v, on) => stg.wet.gain.setTargetAtTime(on ? v : 0, c.currentTime, 0.03);
      const st = { ch: [false, 0.6], ph: [false, 0.7], dl: [false, 0.4], rv: [false, 0.35] };
      const S = { ch, ph, dl, rv };
      const block = (k, title, extra) => UI.group(title, [UI.toggle({ label: s('on'), onChange: v => { st[k][0] = v; wetMix(S[k], st[k][1], v); } }),
      UI.slider({ label: s('wet'), min: 0, max: 1, step: 0.01, value: st[k][1], fmt: UI.fmtPct, onInput: v => { st[k][1] = v; wetMix(S[k], v, st[k][0]); } })].concat(extra));
      const kb = UI.keyboard(m => syn.noteOn(m), m => syn.noteOff(m), { base: 48 });
      root.append(UI.vizPair(),
        el('div', { class: 'row' }, [UI.toggle({ label: '▶ ' + s('loop'), onChange: v => { clearInterval(loop); if (v) { nextT = 0; loop = setInterval(tick, 25); } } }),
        UI.select({ label: s('preset'), options: Object.keys(A.presets).map(n => [n, n.toUpperCase()]), value: 'pluck', onChange: v => { syn.load(A.presets[v]); syn.set('vol', 0.5); } })]),
        el('div', { class: 'grps' }, [
          block('ch', s('chorus'), [UI.slider({ label: s('rate'), min: 0.05, max: 5, log: true, value: 0.7, fmt: v => v.toFixed(2) + ' Hz', onInput: v => ch.fx.l.frequency.value = v }), UI.slider({ label: s('depth'), min: 0, max: 0.01, step: 0.0001, value: 0.004, fmt: v => (v * 1000).toFixed(1) + ' ms', onInput: v => ch.fx.lg.gain.value = v })]),
          block('ph', s('phaser'), [UI.slider({ label: s('rate'), min: 0.05, max: 5, log: true, value: 0.4, fmt: v => v.toFixed(2) + ' Hz', onInput: v => ph.fx.l.frequency.value = v })]),
          block('dl', s('delay'), [UI.slider({ label: s('time'), min: 0.02, max: 1.5, log: true, value: 0.375, fmt: UI.fmtS, onInput: v => dl.fx.d.delayTime.setTargetAtTime(v, c.currentTime, 0.05) }), UI.slider({ label: s('feedback'), min: 0, max: 0.95, step: 0.01, value: 0.45, fmt: UI.fmtPct, onInput: v => dl.fx.fb.gain.value = v })]),
          block('rv', s('reverb'), [UI.slider({ label: s('size'), min: 0.3, max: 8, step: 0.1, value: 2.8, fmt: UI.fmtS, onInput: v => { rv.fx.cv.buffer = A.impulse(v, 3); } })])]), kb);
      return () => { clearInterval(loop); syn.destroy(); setTimeout(() => out.disconnect(), 4000); };
    }
  };

  /* 16. Secuenciador */
  L.seq = {
    t: ['Secuenciador de 16 pasos', '16-step sequencer', '16-Step-Sequencer', '16ステップ・シーケンサー'],
    build(root) {
      const c = A.ctx(); const syn = new A.Synth(); syn.load(A.presets.acid);
      const SC = { minpent: [0, 3, 5, 7, 10], major: [0, 2, 4, 5, 7, 9, 11], minor: [0, 2, 3, 5, 7, 8, 10], dorian: [0, 2, 3, 5, 7, 9, 10], phrygian: [0, 1, 3, 5, 7, 8, 10], chromatic: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] };
      const st = { bpm: 124, swing: 0, scale: 'minpent', root: 36, steps: Array.from({ length: 16 }, (_, i) => ({ on: [0, 3, 6, 8, 10, 12, 14].includes(i), n: [0, 0, 2, 0, 4, 0, 1, 0, 5, 0, 3, 0, 7, 0, 2, 0][i], acc: i % 4 === 0 })), drums: { kick: [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0], snare: [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0], hat: [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1] } };
      const note = i => { const sc = SC[st.scale], k = st.steps[i].n; return st.root + 12 * Math.floor(k / sc.length) + sc[k % sc.length]; };
      let timer = null, cur = 0, nextT = 0; const q = [];
      function tick() {
        const now = c.currentTime; if (nextT < now) nextT = now + 0.05;
        while (nextT < now + 0.12) {
          const sp = 60 / st.bpm / 4, t = nextT + (cur % 2 ? st.swing * sp * 0.5 : 0), S = st.steps[cur];
          if (S.on) syn.trigger(note(cur), sp * 0.55, t, S.acc ? 1 : 0.6);
          for (const d in st.drums) if (st.drums[d][cur]) A.drum(d, t, A.out(), d === 'hat' ? 0.6 : 0.9);
          q.push([cur, t]); cur = (cur + 1) % 16; nextT += sp;
        }
      }
      const grid = el('div', { class: 'seqgrid' }), cells = [];
      function render() {
        grid.innerHTML = ''; cells.length = 0;
        st.steps.forEach((S, i) => {
          const lbl = el('span', { class: 'nn', text: A.noteName(note(i)) });
          const cell = el('div', { class: 'step' + (S.on ? ' on' : '') + (S.acc ? ' acc' : '') + (i % 4 === 0 ? ' beat' : '') }, [
            el('button', { class: 'up', text: '▲', onclick: e => { e.stopPropagation(); S.n = Math.min(SC[st.scale].length * 3 - 1, S.n + 1); lbl.textContent = A.noteName(note(i)); } }),
            lbl,
            el('button', { class: 'dn', text: '▼', onclick: e => { e.stopPropagation(); S.n = Math.max(0, S.n - 1); lbl.textContent = A.noteName(note(i)); } }),
            el('button', { class: 'ac', text: 'ACC', onclick: e => { e.stopPropagation(); S.acc = !S.acc; cell.classList.toggle('acc', S.acc); } })]);
          cell.addEventListener('click', () => { S.on = !S.on; cell.classList.toggle('on', S.on); });
          grid.appendChild(cell); cells.push(cell);
        });
        for (const d in st.drums) {
          const row = el('div', { class: 'drow' }, [el('span', { class: 'dl', text: d })]);
          st.drums[d].forEach((v, i) => { const b = el('button', { class: 'dstep' + (v ? ' on' : '') + (i % 4 === 0 ? ' beat' : '') }); b.addEventListener('click', () => { st.drums[d][i] = st.drums[d][i] ? 0 : 1; b.classList.toggle('on'); }); row.appendChild(b); });
          grid.appendChild(row);
        }
      }
      function euclid(k, n) { const r = []; for (let i = 0; i < n; i++) r.push(Math.floor((i * k) / n) !== Math.floor(((i - 1) * k) / n) ? 1 : 0); return r; }
      let raf; function hl() { if (!grid.isConnected) return; const now = c.currentTime; while (q.length && q[0][1] <= now) { const [i] = q.shift(); cells.forEach((cl, j) => cl.classList.toggle('play', j === i)); } raf = requestAnimationFrame(hl); }
      render();
      let pulses = 5;
      root.append(el('p', { class: 'info', text: s('seqHelp') }),
        el('div', { class: 'row wrap' }, [UI.toggle({ label: '▶ ' + s('play'), onChange: v => { clearInterval(timer); if (v) { nextT = 0; timer = setInterval(tick, 25); } } }),
        UI.button('🎲 ' + s('random'), () => { st.steps.forEach(S => { S.on = Math.random() < 0.6; S.n = Math.floor(Math.random() * SC[st.scale].length * 2); S.acc = Math.random() < 0.25; }); render(); }, 'small'),
        UI.button(s('clear'), () => { st.steps.forEach(S => S.on = false); for (const d in st.drums) st.drums[d].fill(0); render(); }, 'small')]),
        grid,
        UI.group(s('tempo'), [UI.slider({ label: s('tempo'), min: 60, max: 180, step: 1, value: st.bpm, fmt: v => v + ' BPM', onInput: v => st.bpm = v }),
        UI.slider({ label: s('swing'), min: 0, max: 0.6, step: 0.01, value: 0, fmt: UI.fmtPct, onInput: v => st.swing = v }),
        UI.select({ label: s('scale'), options: Object.keys(SC).map(k => [k, k]), value: st.scale, onChange: v => { st.scale = v; render(); } }),
        UI.slider({ label: 'Root', min: 24, max: 60, step: 1, value: st.root, fmt: v => A.noteName(v), onInput: v => { st.root = v; render(); } }),
        UI.select({ label: s('preset'), options: Object.keys(A.presets).map(n => [n, n.toUpperCase()]), value: 'acid', onChange: v => syn.load(A.presets[v]) }),
        UI.slider({ label: s('cutoff'), min: 80, max: 8000, log: true, value: syn.p.cutoff, fmt: UI.fmtHz, onInput: v => syn.set('cutoff', v) }),
        UI.slider({ label: s('res'), min: 0.5, max: 25, step: 0.1, value: syn.p.res, fmt: v => v.toFixed(1), onInput: v => syn.set('res', v) }),
        UI.slider({ label: s('famt'), min: 0, max: 6, step: 0.1, value: syn.p.famt, fmt: v => v.toFixed(1) + ' oct', onInput: v => syn.set('famt', v) })]),
        UI.group(s('euclid'), [UI.slider({ label: s('pulses') + ' (kick)', min: 1, max: 16, step: 1, value: pulses, onInput: v => pulses = v }),
        UI.button('E(k,16) → kick', () => { st.drums.kick = euclid(pulses, 16); render(); }, 'small'), UI.button('E(k,16) → hat', () => { st.drums.hat = euclid(pulses, 16); render(); }, 'small'), UI.button('E(k,16) → synth', () => { const e = euclid(pulses, 16); st.steps.forEach((S, i) => S.on = !!e[i]); render(); }, 'small')]),
        UI.vizPair());
      raf = requestAnimationFrame(hl);
      return () => { clearInterval(timer); syn.destroy(); };
    }
  };

  /* 17. DSP: aliasing y bitcrusher */
  L.dsp = {
    t: ['Digital: aliasing y cuantización', 'Digital: aliasing and quantization', 'Digital: Aliasing und Quantisierung', 'デジタル：エイリアシングと量子化'],
    build(root) {
      const c = A.ctx(); let cur = null;
      function stopCur() { if (cur) { try { cur.stop(); } catch (e) { } cur = null; } }
      function naiveSweep() {
        stopCur(); const sr = c.sampleRate, dur = 6, n = sr * dur, b = c.createBuffer(1, n, sr), d = b.getChannelData(0); let ph = 0;
        for (let i = 0; i < n; i++) { const f = 100 * Math.pow(120, i / n); ph += f / sr; ph -= Math.floor(ph); d[i] = (2 * ph - 1) * 0.3 * Math.min(1, (n - i) / 2000); }
        const s0 = c.createBufferSource(); s0.buffer = b; s0.connect(A.out()); s0.start(); cur = s0;
      }
      function blSweep() {
        stopCur(); const o = c.createOscillator(), g = c.createGain(); o.type = 'sawtooth'; const t = c.currentTime; o.frequency.setValueAtTime(100, t); o.frequency.exponentialRampToValueAtTime(12000, t + 6);
        g.gain.value = 0.3; o.connect(g); g.connect(A.out()); o.start(); o.stop(t + 6); cur = o;
      }
      // bitcrusher con ScriptProcessor
      const st = { bits: 16, ds: 1 }; const syn = new A.Synth(); const crush = c.createScriptProcessor(1024, 1, 1);
      let hold = 0, cnt = 0;
      crush.onaudioprocess = e => { const i = e.inputBuffer.getChannelData(0), o = e.outputBuffer.getChannelData(0), q = Math.pow(2, st.bits - 1); for (let k = 0; k < i.length; k++) { if (cnt++ % st.ds === 0) hold = Math.round(i[k] * q) / q; o[k] = hold; } };
      syn.out.disconnect(); syn.out.connect(crush); crush.connect(A.out()); syn.load(A.presets.lead); syn.set('mono', false);
      const kb = UI.keyboard(m => syn.noteOn(m), m => syn.noteOff(m), { base: 48 });
      root.append(UI.vizPair(),
        UI.group('Aliasing (' + s('nyquist') + ' = ' + Math.round(c.sampleRate / 2) + ' Hz)', [el('div', { class: 'row wrap' }, [UI.button('▶ ' + s('naive'), naiveSweep, 'accent'), UI.button('▶ ' + s('bandlimited'), blSweep), UI.button('■ ' + s('stop'), stopCur, 'small')])]),
        UI.group('Bitcrusher', [UI.slider({ label: s('bits'), min: 1, max: 16, step: 1, value: 16, onInput: v => st.bits = v }),
        UI.slider({ label: s('downsample'), min: 1, max: 40, step: 1, value: 1, fmt: v => '÷' + v + ' (' + Math.round(c.sampleRate / v) + ' Hz)', onInput: v => st.ds = v })]), kb);
      return () => { stopCur(); syn.destroy(); setTimeout(() => { crush.disconnect(); crush.onaudioprocess = null; }, 3000); };
    }
  };

  /* Entrenamiento auditivo */
  L.ear = {
    t: ['Entrenamiento auditivo', 'Ear training', 'Gehörbildung', '耳のトレーニング'],
    build(root) {
      const c = A.ctx(); const syn = new A.Synth(); let cur = null, streak = 0, weng = null;
      const box = el('div', { class: 'earbox' }), fb = el('div', { class: 'info big' });
      const types = {
        wave() { const opts = ['sine', 'triangle', 'sawtooth', 'square']; const ans = opts[Math.floor(Math.random() * 4)]; return { q: s('q_wave'), opts: opts.map(o => [o, s(o)]), ans, play: () => { syn.load({ w1: ans, mix: 0, cutoff: 18000, res: 0.7, famt: 0, a: 0.01, s: 1, r: 0.1, ldest: 'none' }); syn.trigger(57, 1.2); } }; },
        filter() { const opts = ['lowpass', 'highpass', 'bandpass', 'notch']; const ans = opts[Math.floor(Math.random() * 4)]; return { q: s('q_filter'), opts: opts.map(o => [o, s(o)]), ans, play: () => { const n = A.noise('white'), f = c.createBiquadFilter(), g = c.createGain(); f.type = ans; f.frequency.value = 1000; f.Q.value = ans === 'bandpass' ? 4 : ans === 'notch' ? 0.4 : 0.9; g.gain.value = 0.35; n.connect(f); f.connect(g); g.connect(A.out()); n.start(); n.stop(c.currentTime + 1.5); } }; },
        attack() { const ans = Math.random() < 0.5 ? 'fast' : 'slow'; return { q: s('q_attack'), opts: [['fast', s('fast')], ['slow', s('slow')]], ans, play: () => { syn.load({ w1: 'sawtooth', w2: 'sawtooth', det2: 6, cutoff: 3000, famt: 0, a: ans === 'fast' ? 0.004 : 0.35, d: 0.3, s: 0.8, r: 0.3, ldest: 'none' }); syn.trigger(57, 1.2); } }; },
        interval() { const I = [['octaveI', 12], ['fifth', 7], ['fourth', 5], ['major3', 4], ['minor3', 3]]; const pick = I[Math.floor(Math.random() * I.length)]; const r = 50 + Math.floor(Math.random() * 10); return { q: s('q_interval'), opts: I.map(([k]) => [k, s(k)]), ans: pick[0], play: () => { syn.load({ w1: 'triangle', w2: 'sine', cutoff: 5000, famt: 0, a: 0.01, s: 0.8, r: 0.2, ldest: 'none' }); const t = A.now() + 0.05; syn.trigger(r, 0.6, t); syn.trigger(r + pick[1], 0.6, t + 0.7); syn.trigger(r, 0.9, t + 1.4); syn.trigger(r + pick[1], 0.9, t + 1.4); } }; },
        fm() { const harm = Math.random() < 0.5; const ratio = harm ? [1, 2, 3][Math.floor(Math.random() * 3)] : [1.414, 2.76, 3.33][Math.floor(Math.random() * 3)]; return { q: s('q_fm'), opts: [['harmonic', s('harmonic')], ['inharmonic', s('inharmonic')]], ans: harm ? 'harmonic' : 'inharmonic', play: () => { const t = c.currentTime, f = 220, ca = c.createOscillator(), mo = c.createOscillator(), mg = c.createGain(), v = c.createGain(); ca.frequency.value = f; mo.frequency.value = f * ratio; mg.gain.setValueAtTime(5 * f * ratio, t); mg.gain.exponentialRampToValueAtTime(0.5 * f * ratio, t + 1.5); v.gain.setValueAtTime(0.4, t); v.gain.exponentialRampToValueAtTime(0.001, t + 1.8); mo.connect(mg); mg.connect(ca.frequency); ca.connect(v); v.connect(A.out()); ca.start(); mo.start(); ca.stop(t + 1.9); mo.stop(t + 1.9); } }; },
        cookbook() {
          const W = window.WELSH, pool = W.P.filter(p => p.cat !== 'up'), pick = [];
          while (pick.length < 4) { const p = pool[Math.floor(Math.random() * pool.length)]; if (!pick.includes(p) && !pick.some(q => q.cat === p.cat)) pick.push(p); }
          const ans = pick[Math.floor(Math.random() * 4)], tm = [];
          return { q: s('q_cb'), opts: pick.map(p => [W.P.indexOf(p), W.nm(p)]), ans: W.P.indexOf(ans), play: () => { if (!weng) weng = new W.Engine(); weng.allOff(); weng.load(ans); W.demo(weng, ans, tm); } };
        },
        cutoff() { const lo = 300 + Math.random() * 400, hi = lo * (2.5 + Math.random() * 3); const aHi = Math.random() < 0.5; return { q: s('q_cut'), opts: [['A', 'A'], ['B', 'B']], ans: aHi ? 'A' : 'B', play: () => { const t = A.now() + 0.05; syn.load({ w1: 'sawtooth', w2: 'sawtooth', det2: 4, famt: 0, res: 2, a: 0.01, s: 1, r: 0.1, cutoff: aHi ? hi : lo, kbd: 0, ldest: 'none' }); syn.trigger(45, 0.8, t); setTimeout(() => { syn.load({ cutoff: aHi ? lo : hi }); syn.trigger(45, 0.8); }, 1100); } }; }
      };
      const tsel = UI.select({ label: s('mode'), options: [['wave', 'wave'], ['filter', 'ftype'], ['attack', 'attack'], ['interval', 'q_interval'], ['fm', 'FM'], ['cutoff', 'cutoff'], ['cookbook', 'cbMode']], value: 'wave', onChange: () => nextQ() });
      function nextQ() {
        cur = types[tsel.get()](); fb.textContent = ''; box.innerHTML = '';
        box.append(el('h3', { text: cur.q }), UI.button('🔊 ' + s('listen'), () => { UA.ctx(); cur.play(); }, 'accent big'));
        const opts = el('div', { class: 'opts' });
        cur.opts.forEach(([v, l]) => opts.appendChild(UI.button(l, e => {
          if (cur.done) return; cur.done = true; const ok = String(v) === String(cur.ans); streak = ok ? streak + 1 : 0;
          e.target.classList.add(ok ? 'ok' : 'bad'); if (!ok) opts.querySelectorAll('button').forEach(b => { if (b.dataset.v === String(cur.ans)) b.classList.add('ok'); });
          fb.innerHTML = (ok ? s('correct') : s('wrong')) + ' · ' + s('streak') + ': <b>' + streak + '</b>'; App.recordEar(ok);
        }, 'opt')));
        opts.querySelectorAll('button').forEach((b, i) => b.dataset.v = cur.opts[i][0]);
        box.append(opts, UI.button('→ ' + s('nextQ'), nextQ, 'small'));
      }
      root.append(el('p', { class: 'info', text: s('earIntro') }), tsel, box, fb);
      nextQ();
      return () => { syn.destroy(); weng && weng.destroy(); };
    }
  };

  window.LABS = L;
})();
