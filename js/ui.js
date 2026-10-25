/* Componentes de interfaz para los laboratorios */
(function () {
  const s = k => I18N.s(k);
  const U = {};
  U.el = function (tag, attrs, kids) {
    const e = document.createElement(tag);
    if (attrs) for (const k in attrs) {
      if (k === 'class') e.className = attrs[k]; else if (k === 'html') e.innerHTML = attrs[k]; else if (k === 'text') e.textContent = attrs[k];
      else if (k.startsWith('on')) e.addEventListener(k.slice(2), attrs[k]); else e.setAttribute(k, attrs[k]);
    }
    (kids || []).forEach(c => c != null && e.appendChild(typeof c === 'string' ? document.createTextNode(c) : c));
    return e;
  };
  const el = U.el;

  // deslizador: opts {min,max,step,value,log,fmt,label,onInput}
  U.slider = function (o) {
    const toPos = v => o.log ? Math.log(v / o.min) / Math.log(o.max / o.min) * 1000 : v;
    const fromPos = p => o.log ? o.min * Math.pow(o.max / o.min, p / 1000) : +p;
    const inp = el('input', { type: 'range', min: o.log ? 0 : o.min, max: o.log ? 1000 : o.max, step: o.log ? 1 : (o.step || 0.01) });
    const val = el('span', { class: 'val' });
    const fmt = o.fmt || (v => (Math.round(v * 100) / 100).toString());
    const wrap = el('label', { class: 'ctl slider' }, [el('span', { class: 'lbl', text: o.label }), val, inp]);
    let cur = o.value;
    function show() { val.textContent = fmt(cur); const lo = +inp.min, hi = +inp.max, pos = +inp.value; inp.style.setProperty('--p', (hi > lo ? (pos - lo) / (hi - lo) * 100 : 0) + '%'); }
    inp.value = toPos(o.value); show();
    inp.addEventListener('input', () => { cur = fromPos(inp.value); if (o.step && !o.log) cur = +cur; show(); o.onInput && o.onInput(cur); });
    wrap.set = function (v, silent) { cur = v; inp.value = toPos(v); show(); if (!silent && o.onInput) o.onInput(v); };
    wrap.get = () => cur;
    return wrap;
  };
  U.select = function (o) { // {label, options:[[value,labelKeyOrText]], value, onChange}
    const sel = el('select');
    o.options.forEach(([v, l]) => { const op = el('option', { value: v }); op.textContent = (l && I18N.s(l) !== l) ? I18N.s(l) : (l || v); sel.appendChild(op); });
    sel.value = o.value;
    sel.addEventListener('change', () => o.onChange && o.onChange(sel.value));
    const wrap = el('label', { class: 'ctl select' }, [el('span', { class: 'lbl', text: o.label }), sel]);
    wrap.set = (v, silent) => { sel.value = v; if (!silent && o.onChange) o.onChange(v); };
    wrap.get = () => sel.value;
    return wrap;
  };
  U.toggle = function (o) {
    const b = el('button', { class: 'tog' + (o.value ? ' on' : ''), type: 'button', text: o.label });
    let v = !!o.value;
    b.addEventListener('click', () => { v = !v; b.classList.toggle('on', v); o.onChange && o.onChange(v); });
    b.set = (nv, silent) => { v = !!nv; b.classList.toggle('on', v); if (!silent && o.onChange) o.onChange(v); };
    b.get = () => v;
    return b;
  };
  U.button = function (label, fn, cls) { return el('button', { class: 'btn ' + (cls || ''), type: 'button', text: label, onclick: fn }); };
  U.group = function (title, kids, cls) { return el('fieldset', { class: 'grp ' + (cls || '') }, [el('legend', { text: title })].concat(kids)); };
  U.canvas = function (cls) { return el('canvas', { class: 'viz ' + (cls || '') }); };
  U.vizPair = function (an) {
    const c1 = U.canvas('scope'), c2 = U.canvas('spec');
    const box = el('div', { class: 'vizpair' }, [el('div', { class: 'vz' }, [el('span', { class: 'vzl', text: s('scope') }), c1]), el('div', { class: 'vz' }, [el('span', { class: 'vzl', text: s('spectrum') }), c2])]);
    requestAnimationFrame(() => { UA.scope(c1, an); UA.spectrum(c2, an); });
    return box;
  };

  // teclado táctil multitáctil
  U.keyboard = function (onOn, onOff, opts) {
    opts = opts || {};
    let base = opts.base || 48; const octs = opts.octaves || 2;
    const kb = el('div', { class: 'kb' });
    const keysBox = el('div', { class: 'keys' });
    const lab = el('span', { class: 'oct' });
    const down = U.button('−', () => { if (base > 24) { release(); base -= 12; render(); } }, 'small');
    const up = U.button('+', () => { if (base < 84) { release(); base += 12; render(); } }, 'small');
    const bar = el('div', { class: 'kbbar' }, [el('span', { class: 'lbl', text: s('octave') }), down, lab, up]);
    if (opts.extra) opts.extra.forEach(x => bar.appendChild(x));
    kb.appendChild(bar); kb.appendChild(keysBox);
    const active = {}; // pointerId -> midi
    function release() { for (const id in active) { onOff(active[id]); delete active[id]; } keysBox.querySelectorAll('.down').forEach(k => k.classList.remove('down')); }
    function render() {
      keysBox.innerHTML = ''; lab.textContent = UA.noteName(base);
      const whites = [0, 2, 4, 5, 7, 9, 11], blacks = { 1: 0, 3: 1, 6: 3, 8: 4, 10: 5 };
      const nW = octs * 7 + 1, ww = 100 / nW;
      for (let o = 0; o <= octs; o++) {
        whites.forEach((st, i) => {
          if (o === octs && i > 0) return;
          const m = base + o * 12 + st, idx = o * 7 + i;
          const k = el('div', { class: 'key w', 'data-m': m }); k.style.left = (idx * ww) + '%'; k.style.width = ww + '%';
          if (st === 0) k.appendChild(el('span', { text: UA.noteName(m) }));
          keysBox.appendChild(k);
        });
        if (o === octs) break;
        for (const st in blacks) {
          const m = base + o * 12 + (+st), idx = o * 7 + blacks[st];
          const k = el('div', { class: 'key b', 'data-m': m }); k.style.left = ((idx + 1) * ww - ww * 0.32) + '%'; k.style.width = (ww * 0.64) + '%';
          keysBox.appendChild(k);
        }
      }
    }
    function keyAt(x, y) { const e = document.elementFromPoint(x, y); return e && e.closest ? e.closest('.key') : null; }
    function press(id, key) {
      if (!key) return; const m = +key.dataset.m;
      if (active[id] === m) return;
      if (active[id] !== undefined) { onOff(active[id]); const old = keysBox.querySelector('.key[data-m="' + active[id] + '"]'); old && old.classList.remove('down'); }
      active[id] = m; key.classList.add('down'); UA.ctx(); onOn(m, opts.velocity ? opts.velocity() : 0.85);
    }
    function lift(id) { if (active[id] === undefined) return; const m = active[id]; delete active[id]; const k = keysBox.querySelector('.key[data-m="' + m + '"]'); k && k.classList.remove('down'); onOff(m); }
    keysBox.addEventListener('pointerdown', e => { e.preventDefault(); try { keysBox.setPointerCapture(e.pointerId); } catch (x) { } press(e.pointerId, keyAt(e.clientX, e.clientY)); });
    keysBox.addEventListener('pointermove', e => { if (active[e.pointerId] === undefined) return; const k = keyAt(e.clientX, e.clientY); if (k) press(e.pointerId, k); });
    ['pointerup', 'pointercancel'].forEach(ev => keysBox.addEventListener(ev, e => lift(e.pointerId)));
    keysBox.addEventListener('contextmenu', e => e.preventDefault());
    render();
    kb.release = release;
    kb.setBase = b => { release(); base = Math.max(24, Math.min(84, b)); render(); };
    return kb;
  };

  // gráfico de envolvente ADSR
  U.drawEnv = function (canvas, a, d, s_, r) {
    const g = canvas.getContext('2d'), w = canvas.width = canvas.clientWidth * devicePixelRatio, h = canvas.height = canvas.clientHeight * devicePixelRatio;
    const css = n => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
    g.fillStyle = css('--scope-bg'); g.fillRect(0, 0, w, h);
    const hold = 0.6, total = a + d + hold + r, X = t => 8 + t / total * (w - 16), Y = v => h - 8 - v * (h - 16);
    g.strokeStyle = css('--yellow'); g.lineWidth = 2.5 * devicePixelRatio; g.beginPath(); g.moveTo(X(0), Y(0));
    g.lineTo(X(a), Y(1));
    for (let i = 1; i <= 30; i++) { const t = d * i / 30; g.lineTo(X(a + t), Y(s_ + (1 - s_) * Math.exp(-4 * t / Math.max(d, 1e-4)))); }
    g.lineTo(X(a + d + hold), Y(s_));
    for (let i = 1; i <= 30; i++) { const t = r * i / 30; g.lineTo(X(a + d + hold + t), Y(s_ * Math.exp(-4 * t / Math.max(r, 1e-4)))); }
    g.stroke();
    g.fillStyle = css('--muted'); g.font = (11 * devicePixelRatio) + 'px sans-serif';
    [['A', a / 2], ['D', a + d / 2], ['S', a + d + hold / 2], ['R', a + d + hold + r / 2]].forEach(([l, t]) => g.fillText(l, X(t) - 4, 14 * devicePixelRatio));
  };

  U.fmtHz = v => v >= 1000 ? (v / 1000).toFixed(v >= 10000 ? 1 : 2) + ' kHz' : (v >= 100 ? Math.round(v) : v.toFixed(1)) + ' Hz';
  U.fmtS = v => v >= 1 ? v.toFixed(2) + ' s' : Math.round(v * 1000) + ' ms';
  U.fmtPct = v => Math.round(v * 100) + '%';
  U.fmtDb = v => v.toFixed(1) + ' dB';
  window.UI = U;
})();
