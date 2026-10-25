/* Laboratorios v3 — basados en los libros de Simon Cann (How To Make A Noise), Ashley Hewitt
   (How To Program Any Synthesizer) y Dean Friedman (Synthesizer Basics). Implementación propia. */
(function () {
  const A = window.UA, UI = window.UI, el = UI.el, L = window.LABS;
  const s = k => I18N.s(k), tr = a => I18N.t(a);
  const W = (es, en, de, ja) => [es, en, de, ja];

  /* ---------- utilidades ---------- */
  function scheduler(fn) { // bucle con anticipación (lookahead) para tiempos precisos
    const id = setInterval(fn, 25); return () => clearInterval(id);
  }
  function fraction(r) { // aproxima r con una fracción simple p/q
    let best = [1, 1], err = 1e9;
    for (let q = 1; q <= 12; q++) { const p = Math.round(r * q); if (p < 1) continue; const e = Math.abs(p / q - r) / r; if (e < err - 1e-9) { err = e; best = [p, q]; } }
    return { p: best[0], q: best[1], err };
  }

  /* ======================================================================
     1. FM por relación C:M (Cann, cap. 7)
     ====================================================================== */
  const FMT = {
    alg: W('Algoritmo', 'Algorithm', 'Algorithmus', 'アルゴリズム'),
    simple: W('Simple: M1 → P', 'Simple: M1 → C', 'Einfach: M1 → T', 'シンプル：M1 → C'),
    parallel: W('Moduladores paralelos: M1 + M2 → P', 'Parallel modulators: M1 + M2 → C', 'Parallele Modulatoren: M1 + M2 → T', '並列モジュレーター：M1 + M2 → C'),
    cascade: W('Cascada: M2 → M1 → P', 'Cascade: M2 → M1 → C', 'Kaskade: M2 → M1 → T', 'カスケード：M2 → M1 → C'),
    semis: W('semitonos vs. portadora', 'semitones vs. carrier', 'Halbtöne zum Träger', 'キャリアとの半音差'),
    hold: W('Hold', 'Hold', 'Hold', 'ホールド'),
    lag: W('Ataque más lento que P', 'Attack lag behind C', 'Attack später als T', 'Cより遅いアタック'),
    susM: W('Nivel sostenido', 'Sustain level', 'Sustain-Pegel', 'サステイン・レベル'),
    carrier: W('Portadora (P)', 'Carrier (C)', 'Träger (T)', 'キャリア（C）'),
    touch: W('Fuerza de toque', 'Touch strength', 'Anschlagstärke', 'タッチの強さ'),
    clean: W('relación 1:entero → tono limpio, sin metal', '1:integer ratio → clean tone, no metal', 'Verhältnis 1:ganzzahlig → sauberer Ton, kein Metall', '1:整数比 → きれいな音、金属感なし'),
    intRatio: W('relación entera → armónico', 'integer ratio → harmonic', 'ganzzahliges Verhältnis → harmonisch', '整数比 → 倍音的'),
    metal: W('relación no entera → metálico / campana', 'non-integer ratio → metallic / bell', 'nicht ganzzahlig → metallisch / Glocke', '非整数比 → 金属的／ベル'),
    pitchMod: W('el modulador está a menos del doble de la portadora: la altura percibida la marca el modulador', 'modulator is below twice the carrier: the modulator sets the perceived pitch', 'Modulator unter dem Doppelten des Trägers: Er bestimmt die wahrgenommene Tonhöhe', 'モジュレーターがキャリアの2倍未満：知覚される音高はモジュレーターが決める'),
    pitchCar: W('el modulador está al doble o más: la portadora marca la altura', 'modulator is at twice or more: the carrier sets the pitch', 'Modulator beim Doppelten oder mehr: Der Träger bestimmt die Tonhöhe', 'モジュレーターが2倍以上：音高はキャリアが決める'),
    p_sine: W('Seno → seno 1:1 (caña, órgano)', 'Sine → sine 1:1 (reedy, organ)', 'Sinus → Sinus 1:1 (Rohrblatt, Orgel)', 'サイン→サイン 1:1（リード、オルガン）'),
    p_bass2: W('Bajo: mod −12 (C:M 2:1)', 'Bass: mod −12 (C:M 2:1)', 'Bass: Mod −12 (C:M 2:1)', 'ベース：モジュレーター −12（C:M 2:1）'),
    p_bass19: W('Bajo: mod −19 (3:1, ¡suena en otra nota!)', 'Bass: mod −19 (3:1, plays another note!)', 'Bass: Mod −19 (3:1, klingt auf anderem Ton!)', 'ベース：−19（3:1、別の音に聞こえる！）'),
    p_metal7: W('Metálico +7 (2:3)', 'Metallic +7 (2:3)', 'Metallisch +7 (2:3)', '金属的 +7（2:3）'),
    p_metal17: W('Muy metálico +17 (3:8)', 'Very metallic +17 (3:8)', 'Sehr metallisch +17 (3:8)', 'とても金属的 +17（3:8）'),
    p_bell21: W('Campana DX: +21 con hold de 15 ms', 'DX bell: +21 with 15 ms hold', 'DX-Glocke: +21 mit 15 ms Hold', 'DXベル：+21、ホールド15 ms'),
    p_bell34: W('Campana brillante 1:7 (+34)', 'Bright bell 1:7 (+34)', 'Helle Glocke 1:7 (+34)', '明るいベル 1:7（+34）'),
    p_brass: W('Metales: "spit" con el modulador más lento', 'Brass: "spit" from a slower modulator', 'Blech: „Spit" durch langsameren Modulator', 'ブラス：遅いモジュレーターによる「スピット」'),
    p_ep: W('Piano eléctrico: madera 1:1 + campana', 'Electric piano: wood 1:1 + bell', 'E-Piano: Holz 1:1 + Glocke', 'エレピ：木の1:1＋ベル'),
    p_casc: W('Cascada seno-seno-seno (clarinete)', 'Sine-sine-sine cascade (clarinet)', 'Sinus-Sinus-Sinus-Kaskade (Klarinette)', 'サイン3段カスケード（クラリネット）'),
    p_drop: W('Level drop: 1:4 que se apaga en 10 s', 'Level drop: 1:4 fading over 10 s', 'Level Drop: 1:4, verklingt über 10 s', 'レベル・ドロップ：1:4が10秒で消える')
  };
  const FMP = {
    sine: { alg: 'simple', m1: 0, i1: 2.5, d1: 9, s1: 1, h1: 0, lag1: 0, m2: 12, i2: 0, d2: 1, s2: 0, ca: 0.004, cd: 9, cs: 1, cr: 0.4 },
    bass2: { alg: 'simple', m1: -12, i1: 2.2, d1: 0.9, s1: 0.25, h1: 0, lag1: 0, m2: 12, i2: 0, d2: 1, s2: 0, ca: 0.003, cd: 1.6, cs: 0.25, cr: 0.15 },
    bass19: { alg: 'simple', m1: -19, i1: 2.6, d1: 0.9, s1: 0.3, h1: 0, lag1: 0, m2: 12, i2: 0, d2: 1, s2: 0, ca: 0.003, cd: 1.6, cs: 0.25, cr: 0.15 },
    metal7: { alg: 'simple', m1: 7, i1: 3, d1: 9, s1: 1, h1: 0, lag1: 0, m2: 12, i2: 0, d2: 1, s2: 0, ca: 0.004, cd: 9, cs: 1, cr: 0.4 },
    metal17: { alg: 'simple', m1: 17, i1: 4, d1: 9, s1: 1, h1: 0, lag1: 0, m2: 12, i2: 0, d2: 1, s2: 0, ca: 0.004, cd: 9, cs: 1, cr: 0.4 },
    bell21: { alg: 'simple', m1: 21, i1: 5, d1: 2.2, s1: 0, h1: 15, lag1: 0, m2: 12, i2: 0, d2: 1, s2: 0, ca: 0.002, cd: 5, cs: 0, cr: 3 },
    bell34: { alg: 'simple', m1: 34, i1: 2.2, d1: 1, s1: 0, h1: 0, lag1: 0, m2: 12, i2: 0, d2: 1, s2: 0, ca: 0.002, cd: 7, cs: 0, cr: 3 },
    brass: { alg: 'simple', m1: 0, i1: 3.2, d1: 0.7, s1: 0.65, h1: 30, lag1: 8, m2: 12, i2: 0, d2: 1, s2: 0, ca: 0.045, cd: 0.6, cs: 0.85, cr: 0.25 },
    ep: { alg: 'parallel', m1: 0, i1: 1.3, d1: 2.5, s1: 0.15, h1: 0, lag1: 0, m2: 41, i2: 1.6, d2: 0.25, s2: 0, ca: 0.002, cd: 3.5, cs: 0.1, cr: 0.5 },
    casc: { alg: 'cascade', m1: 0, i1: 1.6, d1: 9, s1: 1, h1: 0, lag1: 0, m2: 0, i2: 1.6, d2: 9, s2: 1, ca: 0.03, cd: 9, cs: 1, cr: 0.3 },
    drop: { alg: 'simple', m1: 24, i1: 4, d1: 10, s1: 0, h1: 0, lag1: 0, m2: 12, i2: 0, d2: 1, s2: 0, ca: 0.003, cd: 14, cs: 1, cr: 1 }
  };
  L.fmcm = {
    t: W('FM práctica: relación C:M, algoritmos y envolventes', 'Practical FM: C:M ratio, algorithms and envelopes', 'FM-Praxis: C:M-Verhältnis, Algorithmen und Hüllkurven', '実践FM：C:M比、アルゴリズム、エンベロープ'),
    build(root) {
      const c = A.ctx(); const out = c.createGain(); out.gain.value = 0.45; out.connect(A.out());
      const st = Object.assign({ vel: 0.85 }, FMP.bell21); const voices = {};
      const info = el('div', { class: 'info big' });
      const r1 = () => Math.pow(2, st.m1 / 12), r2 = () => Math.pow(2, st.m2 / 12);
      function upd() {
        const r = r1(), fr = fraction(r); const isInt = Math.abs(r - Math.round(r)) < 0.01 || Math.abs(1 / r - Math.round(1 / r)) < 0.01;
        const exact = fr.err < 0.012;
        const txt = (exact ? 'C:M = ' + fr.q + ':' + fr.p : 'C:M ≈ 1:' + r.toFixed(3)) + ' — ' + (isInt ? (r >= 1 ? tr(FMT.clean) : tr(FMT.intRatio)) : tr(FMT.metal));
        info.innerHTML = '<b>' + txt + '</b><br><small>' + (r < 2 ? tr(FMT.pitchMod) : tr(FMT.pitchCar)) + '</small>';
        const t = c.currentTime; for (const m in voices) { const v = voices[m]; v.m1.frequency.setTargetAtTime(v.f * r1(), t, 0.01); v.m2.frequency.setTargetAtTime(v.f * r2(), t, 0.01); }
      }
      function modEnv(g, peak, t, lag, hold, dec, sus) {
        g.gain.cancelScheduledValues(t); g.gain.setValueAtTime(0, t);
        const ta = t + Math.max(0.002, st.ca + lag); g.gain.linearRampToValueAtTime(peak, ta);
        g.gain.setValueAtTime(peak, ta + hold); g.gain.setTargetAtTime(peak * sus, ta + hold, Math.max(0.005, dec) / 4);
      }
      function on(m) {
        if (voices[m]) off(m);
        const t = c.currentTime + 0.005, f = A.mtof(m), v = { f };
        v.car = c.createOscillator(); v.car.frequency.value = f;
        v.m1 = c.createOscillator(); v.m1.frequency.value = f * r1(); v.g1 = c.createGain();
        v.m2 = c.createOscillator(); v.m2.frequency.value = f * r2(); v.g2 = c.createGain();
        v.vca = c.createGain(); v.vca.gain.value = 0;
        v.m1.connect(v.g1); v.g1.connect(v.car.frequency);
        v.m2.connect(v.g2); if (st.alg === 'parallel') v.g2.connect(v.car.frequency); else if (st.alg === 'cascade') v.g2.connect(v.m1.frequency);
        v.car.connect(v.vca); v.vca.connect(out);
        const vel = st.vel;
        modEnv(v.g1, st.i1 * f * r1() * vel, t, st.lag1 / 1000, st.h1 / 1000, st.d1, st.s1);
        modEnv(v.g2, st.alg === 'simple' ? 0 : st.i2 * f * r2() * vel, t, 0, 0, st.d2, st.s2);
        v.vca.gain.setValueAtTime(0, t); v.vca.gain.linearRampToValueAtTime(0.5 + 0.5 * vel, t + Math.max(0.002, st.ca));
        v.vca.gain.setTargetAtTime((0.5 + 0.5 * vel) * st.cs, t + Math.max(0.002, st.ca), Math.max(0.005, st.cd) / 4);
        [v.car, v.m1, v.m2].forEach(o => o.start(t)); voices[m] = v;
      }
      function off(m) {
        const v = voices[m]; if (!v) return; delete voices[m]; const t = c.currentTime;
        A.envOff(v.vca.gain, t, 0, st.cr); const end = t + st.cr * 2.5 + 0.1; [v.car, v.m1, v.m2].forEach(o => { try { o.stop(end); } catch (e) { } });
      }
      const sl = {};
      const S = (k, label, min, max, step, fmt, log) => (sl[k] = UI.slider({ label, min, max, step, value: st[k], fmt, log, onInput: x => { st[k] = x; upd(); } }));
      const semi = x => (x > 0 ? '+' : '') + x + ' st';
      const algSel = UI.select({ label: tr(FMT.alg), options: [['simple', tr(FMT.simple)], ['parallel', tr(FMT.parallel)], ['cascade', tr(FMT.cascade)]], value: st.alg, onChange: x => st.alg = x });
      const pre = UI.select({
        label: s('preset'), options: Object.keys(FMP).map(k => [k, tr(FMT['p_' + k])]), value: 'bell21',
        onChange: k => { Object.assign(st, FMP[k]); algSel.set(st.alg, true); for (const kk in sl) sl[kk].set(st[kk], true); upd(); }
      });
      const g1 = UI.group('M1 — ' + s('modulator'), [S('m1', tr(FMT.semis), -48, 48, 1, semi), S('i1', s('index'), 0, 10, 0.1, x => x.toFixed(1)), S('lag1', tr(FMT.lag), 0, 60, 1, x => x + ' ms'), S('h1', tr(FMT.hold), 0, 100, 1, x => x + ' ms'), S('d1', s('decay'), 0.02, 12, 0.01, UI.fmtS, true), S('s1', tr(FMT.susM), 0, 1, 0.01, UI.fmtPct)]);
      const g2 = UI.group('M2 — ' + s('modulator'), [S('m2', tr(FMT.semis), -48, 48, 1, semi), S('i2', s('index'), 0, 10, 0.1, x => x.toFixed(1)), S('d2', s('decay'), 0.02, 12, 0.01, UI.fmtS, true), S('s2', tr(FMT.susM), 0, 1, 0.01, UI.fmtPct)]);
      const gc = UI.group(tr(FMT.carrier), [S('ca', s('attack'), 0.001, 1, 0.001, UI.fmtS, true), S('cd', s('decay'), 0.05, 15, 0.01, UI.fmtS, true), S('cs', s('sustain'), 0, 1, 0.01, UI.fmtPct), S('cr', s('release'), 0.02, 5, 0.01, UI.fmtS, true), S('vel', tr(FMT.touch), 0.1, 1, 0.01, UI.fmtPct)]);
      const kb = UI.keyboard(on, off, { base: 48 });
      root.append(UI.vizPair(), info, el('div', { class: 'row wrap' }, [pre, algSel]), kb, g1, g2, gc);
      upd();
      return () => { for (const m in voices) off(m); setTimeout(() => out.disconnect(), 4000); };
    }
  };

  /* ======================================================================
     2. Batería sintética (Cann, Refill #3) — seno "maltratado" + ruido filtrado
     ====================================================================== */
  const DT = {
    kick: W('Bombo', 'Kick', 'Bassdrum', 'キック'), snare: W('Caja', 'Snare', 'Snare', 'スネア'), hatC: W('Hat cerrado', 'Closed hat', 'Closed Hat', 'クローズド・ハット'),
    hatO: W('Hat abierto', 'Open hat', 'Open Hat', 'オープン・ハット'), clap: W('Palmas', 'Clap', 'Clap', 'クラップ'), rim: W('Rim shot', 'Rim shot', 'Rimshot', 'リムショット'),
    cow: W('Cencerro', 'Cowbell', 'Kuhglocke', 'カウベル'), syn: W('Syn drum', 'Syn drum', 'Syndrum', 'シンドラム'), tom: W('Tom', 'Tom', 'Tom', 'タム'),
    tune: W('Afinación', 'Tune', 'Stimmung', 'チューン'), pAmt: W('Golpe de pitch (oct)', 'Pitch hit (oct)', 'Pitch-Schlag (Okt.)', 'ピッチ・ヒット（oct）'), pTime: W('Tiempo del golpe', 'Hit time', 'Schlagzeit', 'ヒット時間'),
    hold: W('Hold (pegada)', 'Hold (punch)', 'Hold (Punch)', 'ホールド（パンチ）'), dec: W('Caída del cuerpo', 'Body decay', 'Körper-Decay', 'ボディの減衰'),
    body2: W('2º seno grave', '2nd low sine', '2. tiefer Sinus', '2つ目の低いサイン'), dec2: W('Caída 2º seno', '2nd sine decay', 'Decay 2. Sinus', '2つ目のサインの減衰'),
    nLev: W('Ruido', 'Noise', 'Rauschen', 'ノイズ'), nFreq: W('Filtro del ruido', 'Noise filter', 'Rauschfilter', 'ノイズ・フィルター'), nQ: W('Resonancia', 'Resonance', 'Resonanz', 'レゾナンス'),
    nDec: W('Caída del ruido', 'Noise decay', 'Rausch-Decay', 'ノイズの減衰'), rate: W('Velocidad de impactos (LFO)', 'Burst rate (LFO)', 'Impulsrate (LFO)', 'バースト速度（LFO）'),
    sq: W('Cuadrada filtrada (ataque)', 'Filtered square (attack)', 'Gefilterter Rechteck (Attack)', 'フィルターした矩形波（アタック）'), atk: W('Ataque (suavidad)', 'Attack (softness)', 'Attack (Weichheit)', 'アタック（柔らかさ）'),
    groove: W('▶ Groove', '▶ Groove', '▶ Groove', '▶ グルーヴ'), stop: W('■ Parar', '■ Stop', '■ Stopp', '■ 停止'),
    pads: W('Tocá un pad para oírlo y editarlo; el teclado lo toca afinado.', 'Tap a pad to hear and edit it; the keyboard plays it pitched.', 'Tippe ein Pad zum Hören und Bearbeiten; die Tastatur spielt es gestimmt.', 'パッドをタップして聴き、編集。鍵盤では音程付きで鳴ります。')
  };
  const DP = {
    kick: { tune: 52, pAmt: 2.3, pTime: 0.03, hold: 0.02, dec: 0.58, atk: 0.001, body2: 0.35 },
    snare: { tune: 185, pAmt: 2.5, pTime: 0.01, dec: 0.15, body2: 0.22, dec2: 0.29, nLev: 0.55, nFreq: 2000, nQ: 6, nDec: 0.15 },
    hatC: { nFreq: 7500, nQ: 1.2, nDec: 0.11, nLev: 0.6 },
    hatO: { nFreq: 7500, nQ: 2.5, nDec: 1.32, nLev: 0.5 },
    clap: { nFreq: 2034, nQ: 2, nDec: 0.25, rate: 40, nLev: 0.8 },
    rim: { nFreq: 2000, nQ: 14, nDec: 0.18, nLev: 0.7 },
    cow: { tune: 540, nFreq: 650, nQ: 6, dec: 0.34 },
    syn: { tune: 140, pAmt: 1.6, pTime: 0.77, dec: 1.47 },
    tom: { tune: 120, pAmt: 0.3, pTime: 0.12, dec: 0.84, sq: 0.6, nFreq: 605, nQ: 12 }
  };
  const DSL = { // [clave, mín, máx, paso, log]
    kick: [['tune', 30, 120, 1, 1], ['pAmt', 0, 4, 0.05], ['pTime', 0.005, 0.2, 0.001, 1], ['hold', 0, 0.1, 0.001], ['dec', 0.05, 2, 0.01, 1], ['atk', 0.001, 0.02, 0.001], ['body2', 0, 1, 0.01]],
    snare: [['tune', 80, 400, 1, 1], ['pAmt', 0, 4, 0.05], ['dec', 0.03, 0.6, 0.01, 1], ['body2', 0, 1, 0.01], ['dec2', 0.03, 0.8, 0.01, 1], ['nLev', 0, 1, 0.01], ['nFreq', 500, 8000, 1, 1], ['nQ', 0.5, 20, 0.1], ['nDec', 0.03, 0.6, 0.01, 1]],
    hatC: [['nFreq', 1000, 14000, 1, 1], ['nQ', 0.5, 10, 0.1], ['nDec', 0.02, 0.4, 0.005, 1], ['nLev', 0, 1, 0.01]],
    hatO: [['nFreq', 1000, 14000, 1, 1], ['nQ', 0.5, 10, 0.1], ['nDec', 0.2, 3, 0.01, 1], ['nLev', 0, 1, 0.01]],
    clap: [['nFreq', 600, 6000, 1, 1], ['nQ', 0.5, 10, 0.1], ['rate', 10, 120, 1], ['nDec', 0.05, 0.8, 0.01, 1], ['nLev', 0, 1, 0.01]],
    rim: [['nFreq', 600, 6000, 1, 1], ['nQ', 1, 30, 0.1], ['nDec', 0.03, 0.5, 0.005, 1], ['nLev', 0, 1, 0.01]],
    cow: [['tune', 300, 1200, 1, 1], ['nFreq', 300, 3000, 1, 1], ['nQ', 0.5, 20, 0.1], ['dec', 0.05, 1.5, 0.01, 1]],
    syn: [['tune', 50, 600, 1, 1], ['pAmt', 0, 4, 0.05], ['pTime', 0.05, 2, 0.01, 1], ['dec', 0.1, 3, 0.01, 1]],
    tom: [['tune', 50, 400, 1, 1], ['pAmt', 0, 2, 0.05], ['pTime', 0.02, 0.5, 0.01, 1], ['dec', 0.1, 2, 0.01, 1], ['sq', 0, 1, 0.01], ['nFreq', 200, 3000, 1, 1], ['nQ', 0.5, 25, 0.1]]
  };
  function drumPlay(kind, p, t, semis, dest) {
    const c = A.ctx(), k = Math.pow(2, (semis || 0) / 12);
    const expEnv = (g, lvl, a, hold, dec) => { g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(lvl, t + a); g.gain.setValueAtTime(lvl, t + a + hold); g.gain.exponentialRampToValueAtTime(0.0001, t + a + hold + dec); };
    const sine = (f0, pAmt, pTime, lvl, a, hold, dec, type) => {
      const o = c.createOscillator(), g = c.createGain(); o.type = type || 'sine';
      o.frequency.setValueAtTime(f0 * Math.pow(2, pAmt), t); o.frequency.exponentialRampToValueAtTime(f0, t + Math.max(0.003, pTime));
      expEnv(g, lvl, a, hold, dec); o.connect(g); g.connect(dest); o.start(t); o.stop(t + a + hold + dec + 0.05); return o;
    };
    const noise = (ftype, f, q, lvl, dec, a) => {
      const n = A.noise('white'), fl = c.createBiquadFilter(), g = c.createGain(); fl.type = ftype; fl.frequency.value = f; fl.Q.value = q;
      expEnv(g, lvl, a || 0.001, 0, dec); n.connect(fl); fl.connect(g); g.connect(dest); n.start(t); n.stop(t + dec + 0.1); return g;
    };
    if (kind === 'kick') {
      sine(p.tune, p.pAmt, p.pTime, 1, p.atk, p.hold, p.dec);
      if (p.body2 > 0) { // capa de pulso grave filtrada (peso, no tono)
        const o = c.createOscillator(), f = c.createBiquadFilter(), g = c.createGain(); o.type = 'square'; o.frequency.value = p.tune * k; f.type = 'lowpass'; f.frequency.value = 83; f.Q.value = 6;
        expEnv(g, p.body2 * 0.6, 0.002, 0, p.dec); o.connect(f); f.connect(g); g.connect(dest); o.start(t); o.stop(t + p.dec + 0.1);
      }
    } else if (kind === 'snare') {
      sine(p.tune * k, p.pAmt, p.pTime, 0.75, 0.001, 0, p.dec);
      if (p.body2 > 0) sine(p.tune * k * 0.595, p.pAmt, p.pTime, p.body2, 0.001, 0, p.dec2);
      noise('bandpass', p.nFreq, p.nQ, p.nLev * 1.6, p.nDec);
    } else if (kind === 'hatC' || kind === 'hatO') {
      noise('bandpass', p.nFreq * k, p.nQ, p.nLev, p.nDec); noise('highpass', p.nFreq * k, 0.7, p.nLev * 0.4, p.nDec);
    } else if (kind === 'clap') {
      const g = noise('bandpass', p.nFreq * k, p.nQ, p.nLev * 1.4, p.nDec); // ruido 1 con "LFO de pulso" en el nivel
      const per = 1 / p.rate; for (let i = 0; i < 4; i++) { const tt = t + i * per; g.gain.setValueAtTime(p.nLev * 1.4, tt); g.gain.setValueAtTime(p.nLev * 0.15, tt + per * 0.5); }
      g.gain.setValueAtTime(p.nLev * 1.2, t + 4 * per); g.gain.exponentialRampToValueAtTime(0.0001, t + 4 * per + p.nDec);
      noise('bandpass', p.nFreq * k * 0.896, p.nQ, p.nLev * 0.5, p.nDec * 0.8, 0.004);
    } else if (kind === 'rim') {
      noise('lowpass', p.nFreq * k, p.nQ, p.nLev, p.nDec);
    } else if (kind === 'cow') {
      const f = c.createBiquadFilter(), g = c.createGain(); f.type = 'bandpass'; f.frequency.value = p.nFreq * k; f.Q.value = p.nQ;
      [1, 1.4815].forEach(r => { const o = c.createOscillator(); o.type = 'square'; o.frequency.value = p.tune * k * r; o.connect(f); o.start(t); o.stop(t + p.dec + 0.1); });
      expEnv(g, 0.9, 0.001, 0, p.dec); f.connect(g); g.connect(dest);
    } else if (kind === 'syn') {
      sine(p.tune * k, p.pAmt, p.pTime, 0.9, 0.001, 0, p.dec, 'triangle');
    } else if (kind === 'tom') {
      sine(p.tune * k, p.pAmt, p.pTime, 0.75, 0.001, 0, p.dec);
      if (p.sq > 0) { // cuadrada resonante solo en el ataque
        const o = c.createOscillator(), f = c.createBiquadFilter(), g = c.createGain(); o.type = 'square'; o.frequency.value = p.tune * k; f.type = 'lowpass'; f.frequency.value = p.nFreq; f.Q.value = p.nQ;
        expEnv(g, p.sq * 0.5, 0.001, 0, 0.04); o.connect(f); f.connect(g); g.connect(dest); o.start(t); o.stop(t + 0.1);
      }
    }
  }
  L.drumsynth = {
    t: W('Batería sintética: bombo, caja, hats, palmas…', 'Synthetic drums: kick, snare, hats, clap…', 'Synthetische Drums: Bassdrum, Snare, Hats, Clap…', 'シンセ・ドラム：キック、スネア、ハット、クラップ…'),
    build(root) {
      const c = A.ctx(); const out = c.createGain(); out.gain.value = 0.8; out.connect(A.out());
      const P = JSON.parse(JSON.stringify(DP)); let cur = 'kick';
      const pads = el('div', { class: 'pads' }), edit = el('div');
      const hit = k => drumPlay(k, P[k], c.currentTime + 0.005, 0, out);
      function renderEdit() {
        edit.innerHTML = '';
        const ctl = DSL[cur].map(([k, mn, mx, st, lg]) => UI.slider({
          label: tr(DT[k]), min: mn, max: mx, step: st, log: !!lg, value: P[cur][k],
          fmt: /Freq|tune/.test(k) ? UI.fmtHz : (/dec|time|hold|atk/i.test(k) ? UI.fmtS : (k === 'pAmt' ? (x => x.toFixed(2) + ' oct') : (k === 'rate' ? (x => Math.round(x) + ' Hz') : (k === 'nQ' ? (x => x.toFixed(1)) : UI.fmtPct)))),
          onInput: x => { P[cur][k] = x; }
        }));
        edit.append(UI.group(tr(DT[cur]), ctl.concat([UI.button('↺ ' + s('reset'), () => { P[cur] = JSON.parse(JSON.stringify(DP[cur])); renderEdit(); }, 'small')])));
      }
      Object.keys(DP).forEach(k => pads.append(el('button', { class: 'pad' + (k === cur ? ' on' : ''), type: 'button', 'data-k': k, text: tr(DT[k]), onclick: e => { cur = k; pads.querySelectorAll('.pad').forEach(b => b.classList.toggle('on', b.dataset.k === k)); renderEdit(); hit(k); } })));
      // groove de 1 compás (16 pasos)
      const PAT = { kick: [0, 3, 8, 10], snare: [4, 12], hatC: [0, 2, 4, 6, 8, 10, 12], hatO: [14], clap: [12], rim: [7], cow: [6, 15], tom: [], syn: [] };
      let stop = null, step = 0, nextT = 0;
      const gbtn = UI.button(tr(DT.groove), () => {
        if (stop) { stop(); stop = null; gbtn.textContent = tr(DT.groove); return; }
        step = 0; nextT = c.currentTime + 0.05; gbtn.textContent = tr(DT.stop);
        stop = scheduler(() => { const sp = 60 / 112 / 4; while (nextT < c.currentTime + 0.12) { for (const k in PAT) if (PAT[k].includes(step)) drumPlay(k, P[k], nextT, 0, out); step = (step + 1) % 16; nextT += sp; } });
      }, 'accent');
      const kb = UI.keyboard(m => drumPlay(cur, P[cur], c.currentTime + 0.005, m - 60, out), () => { }, { base: 48 });
      root.append(UI.vizPair(), el('p', { class: 'info', text: tr(DT.pads) }), pads, el('div', { class: 'row' }, [gbtn]), edit, kb);
      renderEdit();
      return () => { if (stop) stop(); setTimeout(() => out.disconnect(), 3000); };
    }
  };

  /* ======================================================================
     3. Arpegiador + trancegate (Friedman cap. 6; Cann Refill #1)
     ====================================================================== */
  const AT = {
    arpOn: W('Arpegiador', 'Arpeggiator', 'Arpeggiator', 'アルペジエーター'), latch: W('Latch (retener)', 'Latch (hold)', 'Latch (halten)', 'ラッチ（保持）'),
    tg: W('Trancegate', 'Trancegate', 'Trancegate', 'トランスゲート'), pattern: W('Patrón', 'Pattern', 'Muster', 'パターン'),
    up: W('Arriba', 'Up', 'Aufwärts', '上昇'), down: W('Abajo', 'Down', 'Abwärts', '下降'), updown: W('Arriba-abajo', 'Up-down', 'Auf-ab', '上下'),
    order: W('Orden tocado', 'As played', 'Gespielte Reihenfolge', '弾いた順'), rnd: W('Aleatorio', 'Random', 'Zufällig', 'ランダム'),
    octs: W('Octavas', 'Octaves', 'Oktaven', 'オクターブ'), div: W('División', 'Division', 'Teilung', '分割'), gate: W('Largo de nota (gate)', 'Note length (gate)', 'Notenlänge (Gate)', '音の長さ（ゲート）'),
    contour: W('Suavidad del gate', 'Gate smoothness', 'Gate-Glättung', 'ゲートの滑らかさ'),
    help: W('Mantené un acorde en el teclado (o activá Latch). Con el arpegiador apagado, el trancegate corta los acordes sostenidos en 16 pasos: tocá los cuadros para editar el patrón.', 'Hold a chord on the keyboard (or enable Latch). With the arpeggiator off, the trancegate chops held chords into 16 steps: tap the boxes to edit the pattern.', 'Halte einen Akkord (oder aktiviere Latch). Bei ausgeschaltetem Arpeggiator zerhackt das Trancegate gehaltene Akkorde in 16 Schritte: Tippe die Felder an, um das Muster zu ändern.', '鍵盤で和音を押さえる（またはラッチ）。アルペジエーターをオフにすると、トランスゲートが持続和音を16ステップで刻みます。マスをタップしてパターンを編集。')
  };
  L.arp = {
    t: W('Arpegiador y trancegate', 'Arpeggiator and trancegate', 'Arpeggiator und Trancegate', 'アルペジエーターとトランスゲート'),
    build(root) {
      const c = A.ctx(); const gateG = c.createGain(); gateG.connect(A.out());
      const syn = new A.Synth(gateG); syn.load(A.presets.pluck);
      const st = { bpm: 124, div: 16, pat: 'up', oct: 2, gate: 0.5, arp: true, latch: false, tg: false, contour: 0.004, tgs: [1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1] };
      let held = [], phys = 0, idx = 0, dir = 1, nextA = 0, nextG = 0, gstep = 0;
      const nowLbl = el('div', { class: 'info big' });
      const cells = st.tgs.map((v, i) => el('button', { class: 'gstep' + (v ? ' on' : '') + (i % 4 === 0 ? ' beat' : ''), type: 'button', onclick: e => { st.tgs[i] = st.tgs[i] ? 0 : 1; e.target.classList.toggle('on', !!st.tgs[i]); } }));
      const grid = el('div', { class: 'gategrid' }, cells);
      function seq() {
        if (!held.length) return [];
        const base = st.pat === 'order' ? held.slice() : held.slice().sort((a, b) => a - b); const out = [];
        for (let o = 0; o < st.oct; o++) base.forEach(n => out.push(n + 12 * o));
        return out;
      }
      function nextNote() {
        const sq = seq(); if (!sq.length) return null;
        if (st.pat === 'rnd') return sq[Math.floor(Math.random() * sq.length)];
        if (st.pat === 'down') { idx = ((idx % sq.length) + sq.length) % sq.length; const n = sq[sq.length - 1 - idx]; idx++; return n; }
        if (st.pat === 'updown') {
          if (sq.length === 1) return sq[0];
          if (idx >= sq.length) { idx = sq.length - 2; dir = -1; } if (idx < 0) { idx = 1; dir = 1; }
          const n = sq[idx]; idx += dir; if (idx >= sq.length) { idx = sq.length - 2; dir = -1; } else if (idx < 0) { idx = 1; dir = 1; } return n;
        }
        idx = idx % sq.length; return sq[idx++];
      }
      const stopFn = scheduler(() => {
        const now = c.currentTime;
        if (nextA < now) nextA = now + 0.03; if (nextG < now) nextG = now + 0.03;
        const sp = 60 / st.bpm * 4 / st.div;
        while (nextA < now + 0.12) {
          if (st.arp && held.length) { const n = nextNote(); if (n != null) { syn.trigger(n, sp * st.gate, nextA, 0.85); const tt = nextA; setTimeout(() => { nowLbl.textContent = '♪ ' + A.noteName(n); }, Math.max(0, (tt - now) * 1000)); } }
          nextA += sp;
        }
        const gs = 60 / st.bpm / 4;
        while (nextG < now + 0.12) {
          const v = st.tg ? (st.tgs[gstep] ? 1 : 0) : 1; gateG.gain.setTargetAtTime(v, nextG, st.contour);
          const cell = cells[gstep], tt = nextG; setTimeout(() => { cells.forEach(x => x.classList.remove('cur')); if (st.tg) cell.classList.add('cur'); }, Math.max(0, (tt - now) * 1000));
          gstep = (gstep + 1) % 16; nextG += gs;
        }
      });
      function press(m) {
        phys++;
        if (st.arp) { if (st.latch && phys === 1) held = []; if (!held.includes(m)) held.push(m); }
        else syn.noteOn(m);
      }
      function release(m) {
        phys = Math.max(0, phys - 1);
        if (st.arp) { if (!st.latch) held = held.filter(x => x !== m); if (!held.length) idx = 0; }
        else if (!st.latch) syn.noteOff(m);
      }
      const tArp = UI.toggle({ label: tr(AT.arpOn), value: true, onChange: v => { st.arp = v; syn.allOff(); held = []; } });
      const tLatch = UI.toggle({ label: tr(AT.latch), value: false, onChange: v => { st.latch = v; if (!v) { held = []; syn.allOff(); } } });
      const tTg = UI.toggle({ label: tr(AT.tg), value: false, onChange: v => { st.tg = v; if (!v) cells.forEach(x => x.classList.remove('cur')); } });
      const presets = ['pluck', 'acid', 'bass', 'lead', 'organ', 'strings', 'pad', 'brass', 'bell'];
      const ctl = [
        UI.select({ label: s('preset'), options: presets.map(p => [p, p.toUpperCase()]), value: 'pluck', onChange: p => syn.load(A.presets[p]) }),
        UI.select({ label: tr(AT.pattern), options: [['up', tr(AT.up)], ['down', tr(AT.down)], ['updown', tr(AT.updown)], ['order', tr(AT.order)], ['rnd', tr(AT.rnd)]], value: st.pat, onChange: v => { st.pat = v; idx = 0; dir = 1; } }),
        UI.select({ label: tr(AT.div), options: [['8', '1/8'], ['16', '1/16'], ['32', '1/32'], ['12', '1/8T']], value: '16', onChange: v => st.div = +v }),
        UI.slider({ label: tr(AT.octs), min: 1, max: 3, step: 1, value: st.oct, fmt: x => x, onInput: v => st.oct = v }),
        UI.slider({ label: tr(AT.gate), min: 0.05, max: 1, step: 0.01, value: st.gate, fmt: UI.fmtPct, onInput: v => st.gate = v }),
        UI.slider({ label: s('tempo'), min: 60, max: 180, step: 1, value: st.bpm, fmt: x => Math.round(x) + ' BPM', onInput: v => st.bpm = v }),
        UI.slider({ label: tr(AT.contour), min: 0.001, max: 0.05, step: 0.001, value: st.contour, fmt: UI.fmtS, onInput: v => st.contour = v })
      ];
      const kb = UI.keyboard(press, release, { base: 48 });
      root.append(UI.vizPair(), el('p', { class: 'info', text: tr(AT.help) }), el('div', { class: 'row wrap' }, [tArp, tLatch, tTg]), nowLbl, kb, UI.group(tr(AT.tg) + ' (16 × 1/16)', [grid]), UI.group(tr(AT.arpOn), ctl));
      return () => { stopFn(); syn.destroy(); setTimeout(() => gateG.disconnect(), 3000); };
    }
  };

  /* ======================================================================
     4. Bajo en contexto: bajo + bombo (Cann Refill #4, Hewitt caps. 17–19)
     ====================================================================== */
  const GT = {
    role: W('Función del bajo', 'Bass role', 'Rolle des Basses', 'ベースの役割'),
    rhythm: W('Rítmico (con el bombo)', 'Rhythmic (with the kick)', 'Rhythmisch (mit der Bassdrum)', 'リズム（キックと）'),
    offbeat: W('Contratiempo house', 'House offbeat', 'House-Offbeat', 'ハウスの裏打ち'),
    harmony: W('Armónico: C → A bajo el acorde C', 'Harmonic: C → A under a C chord', 'Harmonisch: C → A unter C-Dur', 'ハーモニー：Cコードの下でC → A'),
    kick: W('Bombo', 'Kick', 'Bassdrum', 'キック'), chords: W('Acorde C-E-G', 'C-E-G chord', 'C-E-G-Akkord', 'C-E-Gコード'),
    side: W('Sidechain (bombeo)', 'Sidechain (pumping)', 'Sidechain (Pumpen)', 'サイドチェイン（ポンピング）'),
    boost: W('Realce de fundamental (HP resonante que sigue la nota)', 'Fundamental boost (key-tracked resonant HP)', 'Grundton-Anhebung (mitlaufender resonanter HP)', '基音ブースト（キー追従レゾナントHP）'),
    sine: W('Seno sub', 'Sine sub', 'Sinus-Sub', 'サイン・サブ'), sqsub: W('Sub cuadrada −1 oct', 'Square sub −1 oct', 'Rechteck-Sub −1 Okt.', '矩形サブ −1オクターブ'),
    presence: W('Presencia (distorsión)', 'Presence (distortion)', 'Präsenz (Verzerrung)', '存在感（ディストーション）'),
    fenv: W('Envolvente del filtro (define el largo de la nota)', 'Filter envelope (sets the note length)', 'Filterhüllkurve (bestimmt die Notenlänge)', 'フィルター・エンベロープ（音の長さを決める）'),
    help: W('Ejercicio de Cann: escuchá solo bajo + bombo y ajustá únicamente decay, sustain y cantidad de la envolvente del filtro hasta que la línea "groovee". Si no groovea, el problema es la parte, no el sonido.', 'Cann\'s exercise: listen to bass + kick only and adjust just the filter envelope\'s decay, sustain and amount until the line grooves. If it doesn\'t, the problem is the part, not the sound.', 'Canns Übung: Nur Bass + Bassdrum hören und nur Decay, Sustain und Menge der Filterhüllkurve einstellen, bis die Linie groovt. Wenn nicht, liegt es an der Stimme, nicht am Klang.', 'キャンの練習：ベースとキックだけを聴き、フィルター・エンベロープのディケイ、サステイン、量だけを調整してラインがグルーヴするまで追い込む。グルーヴしないなら、問題は音色ではなくフレーズ。')
  };
  const PATS = {
    rhythm: [[0, 0, 1], [3, 0, 1], [6, 12, 1], [8, 0, 1], [10, 0, 1], [11, 3, 1], [14, 7, 1], [16, 0, 1], [19, 0, 1], [22, 12, 1], [24, 0, 1], [26, 10, 1], [28, 7, 1], [30, 5, 1]],
    offbeat: [[2, 0, 1.5], [6, 0, 1.5], [10, 0, 1.5], [14, 0, 1.5], [18, -2, 1.5], [22, -2, 1.5], [26, -2, 1.5], [30, -2, 1.5]],
    harmony: [[0, 0, 7], [8, 0, 7], [16, -3, 7], [24, -3, 7]]
  };
  L.groove = {
    t: W('El bajo en contexto: bajo + bombo', 'Bass in context: bass + kick', 'Bass im Kontext: Bass + Bassdrum', '文脈の中のベース：ベース＋キック'),
    build(root) {
      const c = A.ctx();
      const duck = c.createGain(); duck.connect(A.out());
      const boost = c.createBiquadFilter(); boost.type = 'peaking'; boost.Q.value = 5; boost.gain.value = 0; boost.connect(duck);
      const syn = new A.Synth(boost); syn.load({ w1: 'sawtooth', w2: 'sawtooth', det2: 6, mix: 0.3, cutoff: 120, res: 5, famt: 4, fa: 0.003, fd: 0.18, fs: 0.05, fr: 0.1, a: 0.003, d: 0.4, s: 0.9, r: 0.06, kbd: 0.3, vol: 0.6 });
      const subG = c.createGain(); subG.gain.value = 0; subG.connect(duck);
      const sub = new A.Synth(subG); sub.load({ w1: 'sine', w2: 'sine', mix: 0, cutoff: 18000, res: 0.5, famt: 0, a: 0.004, d: 0.2, s: 1, r: 0.06, vol: 0.9 });
      const padG = c.createGain(); padG.gain.value = 0.28; padG.connect(A.out());
      const pad = new A.Synth(padG); pad.load(A.presets.strings);
      const st = { bpm: 122, pat: 'rhythm', kick: true, side: false, chords: false, boost: false, root: 36 };
      let step = 0, nextT = 0;
      const stopFn = scheduler(() => {
        const now = c.currentTime; if (nextT < now) nextT = now + 0.05;
        const sp = 60 / st.bpm / 4;
        while (nextT < now + 0.12) {
          const t = nextT;
          if (step % 4 === 0 && st.kick) {
            A.drum('kick', t, A.out(), 1);
            if (st.side) { duck.gain.setValueAtTime(0.15, t); duck.gain.setTargetAtTime(1, t + 0.02, 0.07); }
          }
          if (step % 4 === 2) A.drum('hat', t, A.out(), 0.35);
          PATS[st.pat].forEach(([s0, semi, len]) => {
            if (s0 !== step) return; const m = st.root + semi, d = len * sp * 0.92;
            syn.trigger(m, d, t, 0.9); sub.trigger(m - 12, d, t, 0.9);
            if (st.boost) boost.frequency.setValueAtTime(A.mtof(m), t);
          });
          if (st.chords && step % 16 === 0) [60, 64, 67].forEach(m => pad.trigger(m, sp * 15, t, 0.6));
          step = (step + 1) % 32; nextT += sp;
        }
      });
      const P = (k, label, mn, mx, stp, fmt, lg) => UI.slider({ label, min: mn, max: mx, step: stp, value: syn.p[k], fmt, log: lg, onInput: v => syn.set(k, v) });
      const fenv = UI.group(tr(GT.fenv), [P('fd', s('decay'), 0.02, 1.5, 0.01, UI.fmtS, true), P('fs', s('sustain'), 0, 1, 0.01, UI.fmtPct), P('famt', s('envAmt'), 0, 6, 0.05, x => x.toFixed(1) + ' oct'), P('cutoff', s('cutoff'), 40, 3000, 1, UI.fmtHz, true), P('res', s('res'), 0.5, 20, 0.1, x => x.toFixed(1)), P('a', s('attack'), 0.002, 0.3, 0.001, UI.fmtS, true)]);
      const thick = UI.group('+ ' + tr(GT.sine) + ' / ' + tr(GT.presence), [
        UI.slider({ label: tr(GT.sine), min: 0, max: 1, step: 0.01, value: 0, fmt: UI.fmtPct, onInput: v => subG.gain.setTargetAtTime(v * 0.9, c.currentTime, 0.02) }),
        UI.slider({ label: tr(GT.sqsub), min: 0, max: 1, step: 0.01, value: 0, fmt: UI.fmtPct, onInput: v => syn.set('sub', v) }),
        UI.slider({ label: tr(GT.presence), min: 0, max: 1, step: 0.01, value: 0, fmt: UI.fmtPct, onInput: v => syn.set('drive', v) }),
        UI.toggle({ label: tr(GT.boost), value: false, onChange: v => { st.boost = v; boost.gain.setTargetAtTime(v ? 10 : 0, c.currentTime, 0.02); } })
      ]);
      const rowT = el('div', { class: 'row wrap' }, [
        UI.toggle({ label: tr(GT.kick), value: true, onChange: v => st.kick = v }),
        UI.toggle({ label: tr(GT.side), value: false, onChange: v => { st.side = v; if (!v) duck.gain.setTargetAtTime(1, c.currentTime, 0.02); } }),
        UI.toggle({ label: tr(GT.chords), value: false, onChange: v => st.chords = v })]);
      const sel = UI.select({ label: tr(GT.role), options: [['rhythm', tr(GT.rhythm)], ['offbeat', tr(GT.offbeat)], ['harmony', tr(GT.harmony)]], value: 'rhythm', onChange: v => { st.pat = v; if (v === 'harmony') { syn.set('a', 0.04); syn.set('famt', 1.6); syn.set('res', 7); } } });
      const tempo = UI.slider({ label: s('tempo'), min: 80, max: 150, step: 1, value: st.bpm, fmt: x => Math.round(x) + ' BPM', onInput: v => st.bpm = v });
      root.append(UI.vizPair(), el('p', { class: 'info', text: tr(GT.help) }), sel, rowT, tempo, fenv, thick);
      return () => { stopFn(); syn.destroy(); sub.destroy(); pad.destroy(); setTimeout(() => { duck.disconnect(); padG.disconnect(); }, 3000); };
    }
  };
})();
