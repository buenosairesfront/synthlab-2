/* U-MA Síntesis — aplicación principal */
(function () {
  const s = k => I18N.s(k), t = o => I18N.t(o), el = UI.el;
  const KEY = 'uma_progress_v1';
  let P = { done: {}, quiz: {}, notes: {}, ear: { ok: 0, total: 0 }, last: null };
  try { P = Object.assign(P, JSON.parse(localStorage.getItem(KEY) || '{}')); } catch (e) { }
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(P)); } catch (e) { } };

  const App = window.App = {};
  App.recordEar = ok => { P.ear.total++; if (ok) P.ear.ok++; save(); };

  const main = document.getElementById('main'), titleEl = document.getElementById('title'), backBtn = document.getElementById('back');
  let dispose = null;
  const mods = () => window.COURSE;
  const modById = id => mods().find(m => m.id === id);

  function setTitle(x) { titleEl.textContent = x; }
  function navActive(name) { document.querySelectorAll('#nav a').forEach(a => a.classList.toggle('on', a.dataset.r === name)); }

  /* --- Inicio --- */
  function home() {
    setTitle('U-MA ' + s('appSub')); navActive('home');
    const doneN = mods().filter(m => P.done[m.id]).length;
    const last = P.last && modById(P.last);
    const meter = el('div', { class: 'meter', style: '--n:' + mods().length });
    mods().forEach(m => meter.append(el('i', { class: 'lv' + m.lv + (P.done[m.id] ? ' on' : ''), title: t(m.title) })));
    main.append(el('section', { class: 'hero' }, [
      el('div', { class: 'cmy' }, [el('i'), el('i'), el('i'), el('span', { text: 'サウンド' })]),
      el('h1', { html: s('appSub') }),
      el('p', { text: s('welcome') }),
      meter,
      el('small', { text: doneN + ' / ' + mods().length + ' · ' + s('modulesDone') }),
      el('div', { class: 'row' }, [UI.button((last ? s('continueL') + ': ' + t(last.title) : s('startL')) + ' →', () => go('#/m/' + (last ? last.id : mods()[0].id)), 'accent big')])
    ]));
    [1, 2, 3].forEach(lv => {
      const list = mods().filter(m => m.lv === lv); if (!list.length) return;
      main.append(el('h2', { class: 'lvl lv' + lv, 'data-n': String(lv), text: s('lv' + lv) + ' · ' + list.length }));
      const grid = el('div', { class: 'cards' });
      list.forEach(m => {
        const n = mods().indexOf(m) + 1;
        grid.append(el('a', { class: 'card lv' + m.lv + (P.done[m.id] ? ' done' : ''), href: '#/m/' + m.id }, [
          el('div', { class: 'num', text: String(n).padStart(2, '0') }),
          el('div', { class: 'ct' }, [el('h3', { text: t(m.title) }), el('p', { text: t(m.sum) }),
          el('div', { class: 'meta', text: [P.done[m.id] ? '✓ ' + s('done') : '', P.quiz[m.id] != null ? s('quiz') + ' ' + P.quiz[m.id] + '%' : ''].filter(Boolean).join(' · ') })])]));
      });
      main.append(grid);
    });
  }

  /* --- Módulo --- */
  function moduleView(id) {
    const m = modById(id); if (!m) return home();
    P.last = id; save(); navActive('home');
    const idx = mods().indexOf(m);
    setTitle(s('module') + ' ' + (idx + 1));
    const toc = el('nav', { class: 'toc' });
    const anchor = (k, label) => { toc.append(el('a', { href: 'javascript:void 0', text: label, onclick: () => { const x = document.getElementById('sec-' + k); x && x.scrollIntoView({ behavior: 'smooth' }); } })); };
    const head = el('header', { class: 'mhead lv' + m.lv }, [el('div', { class: 'bign', text: String(idx + 1).padStart(2, '0') }), el('small', { text: s('level') + ' ' + m.lv + ' · ' + s('lv' + m.lv) }), el('h1', { text: t(m.title) }), el('p', { class: 'lead', text: t(m.sum) }), toc]);
    main.append(head);
    // ideas clave
    anchor('key', s('keyIdeas'));
    main.append(el('section', { class: 'keybox', id: 'sec-key' }, [el('h2', { text: s('keyIdeas') }), el('ul', {}, t(m.key).map(k => el('li', { html: k })))]));
    // teoría
    anchor('th', s('theory'));
    const th = el('section', { id: 'sec-th', class: 'theory' });
    m.sec.forEach(sec => th.append(el('h2', { text: t(sec.h) }), el('div', { class: 'prose', html: t(sec.b) })));
    main.append(th);
    // laboratorio
    if (m.lab && m.lab.length) {
      anchor('lab', s('lab'));
      const lb = el('section', { id: 'sec-lab', class: 'labcards' }, [el('h2', { text: s('lab') })]);
      m.lab.forEach(l => LABS[l] && lb.append(el('a', { class: 'labcard', href: '#/lab/' + l }, [el('b', { text: t(LABS[l].t) }), el('span', { text: s('openLab') + ' →' })])));
      main.append(lb);
    }
    // práctica
    if (m.ex) {
      anchor('ex', s('practice'));
      main.append(el('section', { id: 'sec-ex', class: 'exbox' }, [el('h2', { text: s('exercises') }), el('ol', {}, t(m.ex).map(x => el('li', { html: x })))]));
    }
    // profundizar
    if (m.deep) {
      anchor('deep', s('deep'));
      const d = el('details', { id: 'sec-deep', class: 'deep' }, [el('summary', { text: s('deep') }), el('div', { class: 'prose', html: t(m.deep) })]);
      if (m.read) d.append(el('h3', { text: s('reading') }), el('ul', { class: 'refs' }, m.read.map(r => el('li', { html: r }))));
      main.append(d);
    }
    // quiz
    if (m.quiz && m.quiz.length) { anchor('quiz', s('quiz')); main.append(quizView(m)); }
    // notas
    anchor('notes', s('notes'));
    const ta = el('textarea', { placeholder: s('notesPh'), rows: 5 }); ta.value = P.notes[id] || '';
    const sv = el('small', { class: 'saved' }); let tm;
    ta.addEventListener('input', () => { P.notes[id] = ta.value; clearTimeout(tm); tm = setTimeout(() => { save(); sv.textContent = s('saved') + ' ✓'; setTimeout(() => sv.textContent = '', 1500); }, 400); });
    main.append(el('section', { id: 'sec-notes', class: 'notes' }, [el('h2', { text: s('notes') }), ta, sv]));
    // completar + navegación
    const doneBtn = UI.toggle({ label: '✓ ' + s('markDone'), value: !!P.done[id], onChange: v => { P.done[id] = v; save(); } });
    const nav = el('div', { class: 'row between' }, [
      idx > 0 ? UI.button('← ' + s('prev'), () => go('#/m/' + mods()[idx - 1].id), 'small') : el('span'),
      idx < mods().length - 1 ? UI.button(s('next') + ' →', () => go('#/m/' + mods()[idx + 1].id), 'small accent') : el('span')]);
    main.append(el('section', { class: 'endbox' }, [doneBtn, nav]));
  }

  function quizView(m) {
    const box = el('section', { id: 'sec-quiz', class: 'quiz' }, [el('h2', { text: s('quiz') + ' · ' + m.quiz.length + ' ' + s('questions') })]);
    const answers = {};
    m.quiz.forEach((q, qi) => {
      const opts = el('div', { class: 'qopts' });
      const exp = el('div', { class: 'qexp' });
      t(q.o).forEach((o, oi) => {
        const b = el('button', { class: 'qopt', type: 'button', html: o });
        b.addEventListener('click', () => {
          if (answers[qi] !== undefined) return; answers[qi] = oi === q.c;
          b.classList.add(oi === q.c ? 'ok' : 'bad'); opts.children[q.c].classList.add('ok');
          exp.innerHTML = '<b>' + (oi === q.c ? s('correct') : s('wrong')) + '</b> ' + t(q.x);
          if (Object.keys(answers).length === m.quiz.length) {
            const sc = Math.round(Object.values(answers).filter(Boolean).length / m.quiz.length * 100);
            P.quiz[m.id] = sc; save(); res.innerHTML = s('result') + ': <b>' + sc + '%</b>'; res.append(UI.button('↻ ' + s('retry'), () => { const n = quizView(m); box.replaceWith(n); }, 'small'));
          }
        });
        opts.append(b);
      });
      box.append(el('div', { class: 'q' }, [el('p', { class: 'qq', html: (qi + 1) + '. ' + t(q.q) }), opts, exp]));
    });
    const res = el('div', { class: 'qres' }); box.append(res);
    return box;
  }

  /* --- Labs --- */
  function labsView() {
    setTitle(s('allLabs')); navActive('labs');
    const grid = el('div', { class: 'cards labs' });
    Object.keys(LABS).filter(k => k !== 'ear').forEach((k, i) => {
      const usedIn = mods().filter(m => (m.lab || []).includes(k)).map(m => mods().indexOf(m) + 1);
      grid.append(el('a', { class: 'card lv' + (i % 3 + 1), href: '#/lab/' + k }, [el('div', { class: 'num', text: String(i + 1).padStart(2, '0') }), el('div', { class: 'ct' }, [el('h3', { text: t(LABS[k].t) }), el('div', { class: 'meta', text: usedIn.length ? s('module') + ' ' + usedIn.join(', ') : '' })])]));
    });
    main.append(el('p', { class: 'info', text: s('labHint') }), grid);
  }
  function labView(id) {
    const L = LABS[id]; if (!L) return labsView();
    setTitle(t(L.t)); navActive(id === 'ear' ? 'ear' : 'labs');
    const root = el('div', { class: 'lab' }); main.append(root);
    UA.ctx(); dispose = L.build(root) || null;
  }

  /* --- Glosario --- */
  function glossary() {
    setTitle(s('glossary')); navActive('glossary');
    const G = window.GLOSSARY.slice().sort((a, b) => t(a.t).localeCompare(t(b.t), I18N.lang));
    const inp = el('input', { type: 'search', class: 'search', placeholder: s('search') });
    const list = el('dl', { class: 'gloss' });
    function render() {
      const q = inp.value.trim().toLowerCase(); list.innerHTML = '';
      G.filter(g => !q || (t(g.t) + ' ' + t(g.d) + ' ' + (g.t.en || '')).toLowerCase().includes(q)).forEach(g => {
        list.append(el('dt', { text: t(g.t) + (I18N.lang !== 'en' && g.t.en && g.t.en !== t(g.t) ? '  ·  ' + g.t.en : '') }), el('dd', { html: t(g.d) }));
      });
    }
    inp.addEventListener('input', render); render();
    main.append(el('small', { class: 'info', text: G.length + ' ' + s('terms') }), inp, list);
  }

  /* --- Progreso + biblioteca --- */
  function progress() {
    setTitle(s('progress')); navActive('progress');
    const doneN = mods().filter(m => P.done[m.id]).length;
    const qs = Object.values(P.quiz); const avg = qs.length ? Math.round(qs.reduce((a, b) => a + b, 0) / qs.length) : 0;
    const stat = (n, l) => el('div', { class: 'stat' }, [el('b', { text: n }), el('span', { text: l })]);
    main.append(el('div', { class: 'stats' }, [stat(doneN + '/' + mods().length, s('modulesDone')), stat(avg + '%', s('quizAvg')), stat(P.ear.ok + '/' + P.ear.total, s('earScore'))]));
    const tbl = el('div', { class: 'plist' });
    mods().forEach((m, i) => tbl.append(el('a', { href: '#/m/' + m.id, class: 'prow' }, [el('span', { text: (P.done[m.id] ? '✓ ' : '○ ') + (i + 1) + '. ' + t(m.title) }), el('b', { text: P.quiz[m.id] != null ? P.quiz[m.id] + '%' : '—' })])));
    main.append(tbl);
    main.append(el('h2', { text: s('books') }), el('p', { class: 'info', text: s('booksNote') }));
    (window.BOOKS || []).forEach(b => main.append(el('details', { class: 'book' }, [el('summary', { text: b.title + ' — ' + b.author }), el('p', { class: 'info', text: t(b.sum) })])));
    main.append(el('h2', { text: s('library') }), el('p', { class: 'info', text: s('libTxt') }), el('ul', { class: 'refs' }, window.LIBRARY.map(r => el('li', { html: r }))));
    main.append(el('p', { class: 'about', text: s('about') }), UI.button(s('reset'), () => { if (confirm(s('confirmReset'))) { P = { done: {}, quiz: {}, notes: {}, ear: { ok: 0, total: 0 }, last: null }; save(); route(); } }, 'small danger'));
  }

  /* --- Idioma --- */
  function langMenu() {
    const dlg = el('div', { class: 'modal', onclick: e => { if (e.target === dlg) dlg.remove(); } }, [el('div', { class: 'sheet' }, [el('h3', { text: s('language') })].concat(I18N.LANGS.map(l => UI.button(I18N.names[l], () => { I18N.set(l); dlg.remove(); renderNav(); route(); }, l === I18N.lang ? 'accent' : ''))))]);
    document.body.append(dlg);
  }
  function renderNav() {
    const IC = {
      course: '<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 15v-3M12 15V8M17 15v-5"/></svg>',
      labs: '<svg viewBox="0 0 24 24"><path d="M6 3v18M12 3v18M18 3v18"/><rect x="3.5" y="13" width="5" height="3.5" rx="1"/><rect x="9.5" y="6" width="5" height="3.5" rx="1"/><rect x="15.5" y="10" width="5" height="3.5" rx="1"/></svg>',
      ear: '<svg viewBox="0 0 24 24"><path d="M2 12h3l2-5 3 10 3-14 3 12 2-3h4"/></svg>',
      glossary: '<svg viewBox="0 0 24 24"><path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 19V5M9 8h6M9 12h4"/></svg>',
      progress: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"/><path d="M12 4v3M12 12l4-3"/><circle cx="12" cy="12" r="1.2"/></svg>'
    };
    const items = [['home', '#/', 'course'], ['labs', '#/labs', 'labs'], ['ear', '#/lab/ear', 'ear'], ['glossary', '#/glossary', 'glossary'], ['progress', '#/progress', 'progress']];
    const nav = document.getElementById('nav'); nav.innerHTML = '';
    items.forEach(([r, h, k]) => nav.append(el('a', { href: h, 'data-r': r, 'aria-label': s(k) }, [el('i', { html: IC[k] }), el('span', { text: s(k) })])));
    document.getElementById('langbtn').textContent = I18N.lang.toUpperCase();
  }

  function go(h) { location.hash = h; }
  function route() {
    if (dispose) { try { dispose(); } catch (e) { console.error(e); } dispose = null; }
    main.innerHTML = ''; window.scrollTo(0, 0);
    const h = location.hash.replace(/^#\/?/, '').split('/');
    backBtn.style.visibility = h[0] ? 'visible' : 'hidden';
    try {
      if (h[0] === 'm') moduleView(h[1]);
      else if (h[0] === 'lab') labView(h[1]);
      else if (h[0] === 'labs') labsView();
      else if (h[0] === 'glossary') glossary();
      else if (h[0] === 'progress') progress();
      else home();
    } catch (e) { console.error(e); main.append(el('pre', { text: String(e && e.stack || e) })); }
  }
  backBtn.addEventListener('click', () => history.length > 1 ? history.back() : go('#/'));
  document.getElementById('langbtn').addEventListener('click', langMenu);
  // desbloquear audio con el primer toque
  document.addEventListener('pointerdown', () => UA.ctx(), { once: true });
  window.addEventListener('hashchange', route);
  document.documentElement.lang = I18N.lang;
  renderNav(); route();
})();
