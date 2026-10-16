/* Dengar & Kenal Bunyi – DSKP Pendidikan Muzik Tahun 1, SK 3.1.2 */
const DATA = [
  {e:'🐱',n:'Kucing',s:'Meow meow',c:'Haiwan'},{e:'🐶',n:'Anjing',s:'Hong hong',c:'Haiwan'},
  {e:'🐮',n:'Lembu',s:'Moooo',c:'Haiwan'},{e:'🐔',n:'Ayam',s:'Kok kok kok',c:'Haiwan'},
  {e:'🐸',n:'Katak',s:'Kuak kuak',c:'Haiwan'},{e:'🐑',n:'Kambing',s:'Mbeeek',c:'Haiwan'},
  {e:'😄',n:'Ketawa',s:'Ha ha ha',c:'Manusia'},{e:'😭',n:'Menangis',s:'Huu huu huu',c:'Manusia'},
  {e:'👏',n:'Tepuk tangan',s:'Prok prok prok',c:'Manusia'},{e:'🤧',n:'Bersin',s:'Atchoo',c:'Manusia'},
  {e:'😴',n:'Berdengkur',s:'Grrr zzz',c:'Manusia'},{e:'🥱',n:'Menguap',s:'Haaa aam',c:'Manusia'},
  {e:'🚗',n:'Kereta',s:'Pin pin',c:'Kenderaan'},{e:'🏍️',n:'Motosikal',s:'Vroom vroom',c:'Kenderaan'},
  {e:'🚑',n:'Ambulans',s:'Nino nino',c:'Kenderaan'},{e:'🚂',n:'Kereta api',s:'Tut tut',c:'Kenderaan'},
  {e:'🚒',n:'Bomba',s:'Wiu wiu wiu',c:'Kenderaan'},{e:'✈️',n:'Kapal terbang',s:'Wuuusshh',c:'Kenderaan'}
];
const CATS = ['Haiwan','Manusia','Kenderaan'];
const CAT_IC = {Haiwan:'🐾',Manusia:'🧑',Kenderaan:'🚦'};
const CFG = {
  mudah:{label:'🌱 Mudah',opts:3,rounds:4,pairs:3,dd:[2,2],tf:4,seq:3,puz:1},
  sederhana:{label:'🌟 Sederhana',opts:4,rounds:5,pairs:4,dd:[3,2],tf:5,seq:4,puz:2},
  mencabar:{label:'🚀 Mencabar',opts:6,rounds:6,pairs:6,dd:[3,3],tf:6,seq:5,puz:3}
};
const ACTS = [
  {id:'mengecam',name:'Mengecam',ic:'👂',fn:aMengecam},
  {id:'padanan',name:'Padanan',ic:'🔗',fn:aPadanan},
  {id:'drag',name:'Seret & Lepas',ic:'🧺',fn:aDrag},
  {id:'memori',name:'Memori',ic:'🃏',fn:aMemori},
  {id:'tf',name:'Betul & Salah',ic:'✅',fn:aTF},
  {id:'urutan',name:'Susun Urutan',ic:'🔢',fn:aUrutan},
  {id:'puzzle',name:'Puzzle 4 Gambar',ic:'🧩',fn:aPuzzle}
];
const $ = id => document.getElementById(id);
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.random() * (i + 1) | 0; [a[i], a[j]] = [a[j], a[i]]; } return a; };
const sleep = ms => new Promise(r => setTimeout(r, ms));
let level = null, cfg = null, cur = null, S = {pts: 0, mis: 0}, run = 0;
const progress = {mudah: {}, sederhana: {}, mencabar: {}};

/* ---------- Bunyi & kesan ---------- */
let actx;
function beep(good) {
  try {
    actx = actx || new (window.AudioContext || window.webkitAudioContext)();
    const notes = good ? [523, 659, 784] : [220, 165];
    notes.forEach((f, i) => {
      const o = actx.createOscillator(), g = actx.createGain();
      o.type = good ? 'triangle' : 'sawtooth'; o.frequency.value = f;
      g.gain.setValueAtTime(.15, actx.currentTime + i * .12);
      g.gain.exponentialRampToValueAtTime(.001, actx.currentTime + i * .12 + .2);
      o.connect(g); g.connect(actx.destination);
      o.start(actx.currentTime + i * .12); o.stop(actx.currentTime + i * .12 + .22);
    });
  } catch (e) {}
}
function speak(t) {
  return new Promise(res => {
    if (!('speechSynthesis' in window)) return setTimeout(res, 900);
    const u = new SpeechSynthesisUtterance(t); u.lang = 'ms-MY'; u.rate = .8; u.pitch = 1.3;
    let d = false; const f = () => { if (!d) { d = true; res(); } };
    u.onend = f; u.onerror = f; setTimeout(f, 3000); speechSynthesis.speak(u);
  });
}
function confetti() {
  const em = ['🎉', '⭐', '🎈', '🌟', '🎵', '💖'];
  for (let i = 0; i < 28; i++) {
    const s = document.createElement('span'); s.className = 'confetti';
    s.textContent = em[i % em.length]; s.style.left = Math.random() * 100 + 'vw';
    s.style.animationDelay = Math.random() * .8 + 's'; document.body.appendChild(s);
    setTimeout(() => s.remove(), 3500);
  }
}
const good = () => { S.pts++; $('actScore').textContent = '⭐ ' + S.pts; beep(true); };
const bad = () => { S.mis++; beep(false); };
const flash = (el, cls) => { el.classList.remove('right', 'wrong'); void el.offsetWidth; el.classList.add(cls); };

/* ---------- Navigasi ---------- */
function show(id) { document.querySelectorAll('.screen').forEach(s => s.classList.toggle('active', s.id === id)); window.scrollTo(0, 0); }
function buildMenu() {
  $('lvLabel').textContent = 'Tahap: ' + cfg.label;
  $('actGrid').innerHTML = '';
  ACTS.forEach(a => {
    const st = progress[level][a.id] || 0;
    const b = document.createElement('button');
    b.className = 'big act' + (st ? ' done' : '');
    b.innerHTML = `<span class="ic">${a.ic}</span>${a.name}<span class="stars">${st ? '⭐'.repeat(st) : '☆☆☆'}</span>`;
    b.onclick = () => start(a); $('actGrid').appendChild(b);
  });
}
function start(a) {
  cur = a; run++; S = {pts: 0, mis: 0}; speechSynthesis && speechSynthesis.cancel();
  $('actTitle').textContent = a.ic + ' ' + a.name; $('actScore').textContent = '⭐ 0';
  show('s-act'); a.fn($('stage'), run);
}
function finish(total) {
  const st = S.mis === 0 ? 3 : S.mis <= Math.ceil(total / 2) ? 2 : 1;
  progress[level][cur.id] = Math.max(progress[level][cur.id] || 0, st);
  const msg = ['', 'Bagus! Cuba lagi ya!', 'Hebat! Kamu pandai!', 'Cemerlang! Kamu bintang!'][st];
  $('stage').innerHTML = `<div class="final"><div class="bigemoji">🏆</div><p class="q">${msg}</p>
    <p class="stars" style="font-size:3rem">${'⭐'.repeat(st)}${'☆'.repeat(3 - st)}</p>
    <div class="center"><button class="btn ok" id="again">🔁 Main Lagi</button> <button class="btn" id="tomenu">🏠 Menu</button></div></div>`;
  $('again').onclick = () => start(cur); $('tomenu').onclick = () => { buildMenu(); show('s-menu'); };
  confetti(); speak(msg);
}
const alive = id => id === run;

/* ---------- Bantuan data ---------- */
function choices(t, n) {
  let o = shuffle(DATA.filter(x => x !== t));
  if (level === 'mudah') o = o.filter(x => x.c !== t.c);
  if (level === 'mencabar') o.sort((a, b) => (b.c === t.c) - (a.c === t.c));
  return shuffle([t, ...o.slice(0, n - 1)]);
}

/* ---------- 1. Mengecam ---------- */
function aMengecam(st, id) {
  const N = cfg.rounds, deck = shuffle(DATA).slice(0, N); let i = 0;
  (function next() {
    if (i >= N) return finish(N);
    const t = deck[i], opts = choices(t, cfg.opts); let tried = false;
    st.innerHTML = `<p class="q">Bunyi apa ini? (${i + 1}/${N})</p><button class="speaker" aria-label="Dengar bunyi">🔊</button>
      <div class="say"></div><p class="hint">${level === 'mudah' ? 'Petunjuk: ' + t.c : '&nbsp;'}</p><div class="opts"></div>`;
    const say = st.querySelector('.say'), play = () => { speak(t.s); if (level !== 'mencabar') say.textContent = t.s; };
    st.querySelector('.speaker').onclick = play; play();
    opts.forEach(o => {
      const b = document.createElement('button'); b.className = 'opt';
      b.innerHTML = `<span class="e">${o.e}</span>${level === 'mencabar' ? '' : o.n}`;
      b.onclick = () => {
        if (o === t) { if (!tried) good(); flash(b, 'right'); speak(t.n); i++; setTimeout(() => alive(id) && next(), 1400); st.querySelectorAll('.opt').forEach(x => x.disabled = true); }
        else { tried = true; bad(); flash(b, 'wrong'); }
      };
      st.querySelector('.opts').appendChild(b);
    });
  })();
}

/* ---------- 2. Padanan ---------- */
function aPadanan(st) {
  const items = shuffle(DATA).slice(0, cfg.pairs); let sel = null, left = items.length;
  st.innerHTML = `<p class="q">Padankan gambar dengan nama!</p><div class="match"><div class="col" id="L"></div><div class="col" id="R"></div></div>`;
  const mk = (it, side) => {
    const b = document.createElement('button'); b.className = 'mc' + (side === 'L' ? ' e' : '');
    b.textContent = side === 'L' ? it.e : it.n; b.dataset.k = it.n;
    b.onclick = () => {
      if (side === 'L') { st.querySelectorAll('#L .mc').forEach(x => x.classList.remove('sel')); b.classList.add('sel'); sel = b; speak(it.n); return; }
      if (!sel) { flash(b, 'wrong'); return; }
      if (sel.dataset.k === b.dataset.k) {
        good(); flash(b, 'right'); flash(sel, 'right'); const a = sel; sel = null; left--;
        setTimeout(() => { a.classList.add('gone'); b.classList.add('gone'); if (!left) finish(items.length); }, 600);
      } else { bad(); flash(b, 'wrong'); flash(sel, 'wrong'); }
    };
    return b;
  };
  shuffle(items).forEach(it => $('L').appendChild(mk(it, 'L')));
  shuffle(items).forEach(it => $('R').appendChild(mk(it, 'R')));
}

/* ---------- 3. Seret & Lepas ---------- */
function aDrag(st) {
  const cats = shuffle(CATS).slice(0, cfg.dd[0]);
  const items = shuffle(cats.flatMap(c => shuffle(DATA.filter(d => d.c === c)).slice(0, cfg.dd[1])));
  let left = items.length, picked = null;
  st.innerHTML = `<p class="q">Seret gambar ke bakul yang betul!</p><div class="drops"></div><div class="tray"></div>`;
  cats.forEach(c => {
    const d = document.createElement('div'); d.className = 'drop'; d.dataset.c = c;
    d.innerHTML = `<div class="ph">${CAT_IC[c]} ${c}</div><div class="in"></div>`;
    d.onclick = () => picked && drop(picked.chip, picked.it, d); st.querySelector('.drops').appendChild(d);
  });
  function drop(chip, it, zone) {
    if (zone && zone.dataset.c === it.c) {
      good(); flash(zone, 'right'); zone.querySelector('.in').insertAdjacentHTML('beforeend', `<span>${it.e}</span>`);
      chip.remove(); picked = null; speak(it.n); if (!--left) setTimeout(() => finish(items.length), 700);
    } else { bad(); chip.style.opacity = 1; flash(chip, 'wrong'); if (zone) flash(zone, 'wrong'); }
  }
  items.forEach(it => {
    const chip = document.createElement('div'); chip.className = 'chip'; chip.textContent = it.e;
    let ghost = null, sx = 0, sy = 0, moved = false;
    chip.onpointerdown = e => {
      chip.setPointerCapture(e.pointerId); sx = e.clientX; sy = e.clientY; moved = false;
      ghost = chip.cloneNode(true); ghost.classList.add('drag'); document.body.appendChild(ghost); mv(e); chip.style.opacity = .3;
    };
    const mv = e => { ghost.style.left = e.clientX - 36 + 'px'; ghost.style.top = e.clientY - 36 + 'px'; };
    chip.onpointermove = e => {
      if (!ghost) return; mv(e); if (Math.abs(e.clientX - sx) + Math.abs(e.clientY - sy) > 8) moved = true;
      document.querySelectorAll('.drop').forEach(z => z.classList.remove('over'));
      const z = document.elementFromPoint(e.clientX, e.clientY)?.closest('.drop'); z && z.classList.add('over');
    };
    chip.onpointerup = e => {
      if (!ghost) return; ghost.remove(); ghost = null; chip.style.opacity = 1;
      document.querySelectorAll('.drop').forEach(z => z.classList.remove('over'));
      if (!moved) { picked = {chip, it}; st.querySelectorAll('.chip').forEach(c => c.style.outline = ''); chip.style.outline = '4px solid #7c5cff'; speak(it.n); return; }
      drop(chip, it, document.elementFromPoint(e.clientX, e.clientY)?.closest('.drop'));
    };
    chip.onpointercancel = () => { ghost && ghost.remove(); ghost = null; chip.style.opacity = 1; };
    st.querySelector('.tray').appendChild(chip);
  });
}

/* ---------- 4. Memori ---------- */
function aMemori(st, id) {
  const items = shuffle(DATA).slice(0, cfg.pairs);
  const cards = shuffle(items.flatMap(it => [{it, t: 0}, {it, t: 1}]));
  st.innerHTML = `<p class="q">Cari pasangan gambar dan nama!</p><div class="mem" style="grid-template-columns:repeat(${cfg.pairs <= 3 ? 3 : 4},1fr)"></div>`;
  let first = null, lock = false, found = 0;
  cards.forEach(c => {
    const b = document.createElement('button'); b.className = 'card';
    b.innerHTML = `<div class="in"><div class="b">❓</div><div class="f ${c.t ? 't' : ''}">${c.t ? c.it.n : c.it.e}</div></div>`;
    b.onclick = () => {
      if (lock || b.classList.contains('flip')) return;
      b.classList.add('flip'); speak(c.it.n);
      if (!first) { first = {b, c}; return; }
      if (first.c.it === c.it && first.c.t !== c.t) {
        good(); [first.b, b].forEach(x => x.classList.add('ok')); first = null;
        if (++found === items.length) setTimeout(() => finish(items.length), 900);
      } else {
        bad(); lock = true; const a = first.b; first = null;
        setTimeout(() => { a.classList.remove('flip'); b.classList.remove('flip'); lock = false; }, 1100);
      }
    };
    st.querySelector('.mem').appendChild(b);
  });
}

/* ---------- 5. Betul & Salah ---------- */
function aTF(st, id) {
  const N = cfg.tf, deck = shuffle(DATA).slice(0, N); let i = 0;
  (function next() {
    if (i >= N) return finish(N);
    const t = deck[i], truth = Math.random() < .5, other = shuffle(DATA.filter(x => x.n !== t.n && (level !== 'sederhana' || x.c !== t.c)))[0];
    let claim;
    if (level === 'mudah') claim = `Ini ialah <b>${truth ? t.n : other.n}</b>.`;
    else if (level === 'sederhana') claim = `Ini ialah <b>${truth ? t.c : other.c}</b>.`;
    else claim = `Bunyi ini ialah bunyi <b>${truth ? t.n : other.n}</b>.`;
    st.innerHTML = `<p class="q">Betul atau Salah? (${i + 1}/${N})</p>` +
      (level === 'mencabar' ? `<button class="speaker">🔊</button>` : `<div class="bigemoji">${t.e}</div>`) +
      `<p class="claim">${claim}</p><div class="tf"><button class="btn ok">✅ Betul</button><button class="btn alt">❌ Salah</button></div>`;
    if (level === 'mencabar') { st.querySelector('.speaker').onclick = () => speak(t.s); speak(t.s); } else speak(t.n);
    const [yes, no] = st.querySelectorAll('.tf .btn');
    const ans = v => {
      yes.disabled = no.disabled = true;
      if (v === truth) { good(); flash(v ? yes : no, 'right'); speak('Betul!'); i++; setTimeout(() => alive(id) && next(), 1200); }
      else { bad(); flash(v ? yes : no, 'wrong'); setTimeout(() => { yes.disabled = no.disabled = false; }, 600); }
    };
    yes.onclick = () => ans(true); no.onclick = () => ans(false);
  })();
}

/* ---------- 6. Susun Urutan ---------- */
async function aUrutan(st, id) {
  const seq = shuffle(DATA).slice(0, cfg.seq), n = seq.length;
  let pool = seq.slice(); if (level === 'mencabar') pool.push(shuffle(DATA.filter(d => !seq.includes(d)))[0]);
  let pos = 0;
  st.innerHTML = `<p class="q">Dengar urutan bunyi, kemudian susun gambar mengikut urutan!</p>
    <div class="slots" id="guide"></div><div class="center"><button class="btn" id="rep">🔊 Dengar Urutan</button></div>
    <div class="slots" id="ans"></div><div class="pool" id="pool"></div>`;
  const guide = $('guide'), ans = $('ans');
  const mkSlots = (box, fn) => { box.innerHTML = ''; seq.forEach((s, k) => { const d = document.createElement('div'); d.className = 'slot'; fn(d, s, k); box.appendChild(d); }); };
  mkSlots(guide, (d, s, k) => { d.innerHTML = '🎧'; });
  mkSlots(ans, (d, s, k) => { d.innerHTML = `<i>${k + 1}</i>`; });
  let busy = false;
  async function play(reveal) {
    busy = true; const slots = guide.children;
    for (let k = 0; k < n; k++) {
      if (!alive(id)) return; slots[k].classList.add('right');
      if (reveal || level === 'mudah') slots[k].textContent = seq[k].e;
      await speak(seq[k].s); await sleep(250); slots[k].classList.remove('right');
    }
    if (level !== 'mudah' && reveal) { await sleep(900); for (let k = 0; k < n; k++) slots[k].textContent = '🎧'; }
    busy = false;
  }
  $('rep').onclick = () => !busy && play(false);
  shuffle(pool).forEach(it => {
    const b = document.createElement('button'); b.className = 'chip'; b.textContent = it.e;
    b.onclick = () => {
      if (busy) return;
      if (it === seq[pos]) {
        good(); const s = ans.children[pos]; s.classList.add('filled'); s.textContent = it.e; b.remove(); speak(it.n);
        if (++pos === n) setTimeout(() => finish(n), 900);
      } else { bad(); flash(b, 'wrong'); }
    };
    $('pool').appendChild(b);
  });
  await play(true);
}

/* ---------- 7. Puzzle 4 Gambar ---------- */
function aPuzzle(st, id) {
  const N = cfg.puz, deck = shuffle(DATA).slice(0, N); let i = 0;
  (function next() {
    if (i >= N) return finish(N * 2);
    const t = deck[i]; let order; let sel = null;
    do order = shuffle([0, 1, 2, 3]); while (order.every((v, k) => v === k));
    const clue = level === 'mudah' ? `<p class="ref">Gambar: ${t.e}</p>` : level === 'sederhana' ? `<p class="hint">Petunjuk: ${t.n}</p>` : `<button class="speaker" style="width:70px;height:70px;font-size:2rem">🔊</button>`;
    st.innerHTML = `<p class="q">Susun 4 keping menjadi satu gambar! (${i + 1}/${N})</p>${clue}<div class="puz"></div><p class="hint">Sentuh dua keping untuk menukar tempat</p>`;
    const sp = st.querySelector('.speaker'); if (sp) { sp.onclick = () => speak(t.s); speak(t.s); }
    const box = st.querySelector('.puz');
    function draw() {
      box.innerHTML = '';
      order.forEach((q, k) => {
        const b = document.createElement('button'); b.className = 'tile' + (sel === k ? ' sel' : '');
        b.innerHTML = `<span class="pic" style="--c:${q % 2};--r:${q >> 1}">${t.e}</span>`;
        b.onclick = () => {
          if (sel === null) { sel = k; draw(); return; }
          if (sel !== k) { [order[sel], order[k]] = [order[k], order[sel]]; beep(true); }
          sel = null; draw();
          if (order.every((v, j) => v === j)) {
            S.pts += 1; $('actScore').textContent = '⭐ ' + S.pts; speak(t.n); confetti(); i++;
            box.querySelectorAll('.tile').forEach(x => x.classList.add('right'));
            setTimeout(() => alive(id) && next(), 1800);
          }
        };
        box.appendChild(b);
      });
    }
    draw();
  })();
}

/* ---------- Mula ---------- */
document.querySelectorAll('[data-level]').forEach(b => b.onclick = () => {
  level = b.dataset.level; cfg = CFG[level]; buildMenu(); show('s-menu'); beep(true);
});
$('menuBack').onclick = () => show('s-level');
$('actBack').onclick = () => { run++; speechSynthesis && speechSynthesis.cancel(); buildMenu(); show('s-menu'); };
const info = v => () => $('modal').classList.toggle('show', v);
$('btnInfo').onclick = $('btnInfo2').onclick = info(true);
$('closeInfo').onclick = info(false);
$('modal').onclick = e => { if (e.target.id === 'modal') info(false)(); };
(function floaters() {
  const em = ['🐱', '🐶', '🚗', '🎵', '👏', '🚑', '🐸', '🎶', '🚂', '🐮', '😄', '✈️'];
  em.forEach((e, k) => {
    const s = document.createElement('span'); s.textContent = e; s.style.left = (k * 8.5 + Math.random() * 4) + 'vw';
    s.style.animationDuration = 14 + Math.random() * 14 + 's'; s.style.animationDelay = -Math.random() * 20 + 's';
    $('floaters').appendChild(s);
  });
})();
