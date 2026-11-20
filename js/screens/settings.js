// 设置：提醒时间、新概念课号、备份、声音来源、添加到主屏幕
import { exportBackup, importBackup } from '../state.js';
import { NCE1 } from '../../data/nce1.js';
import { h, toast, primary, secondary } from '../ui.js';
import { SETTINGS } from '../copy.js';
import { IPA_FILE } from '../audio.js';

const SYMBOL_OF = Object.fromEntries(Object.entries(IPA_FILE).map(([sym, name]) => [name, sym]));
// audio/p/iy.m4a → /iː/；audio/w/cat.m4a → cat
function soundName(file) {
  const [, kind, base] = file.replace('.m4a', '').split('/');
  return kind === 'p' ? `/${SYMBOL_OF[base] || base}/` : base;
}

const NCE_LAST = NCE1.length;

// 维基共享资源的作者字段带一段固定套话，去掉只留名字
export function cleanAuthor(a) {
  return String(a || '')
    .replace('No machine-readable author provided. ', '')
    .replace(' assumed (based on copyright claims).', '')
    .trim();
}

function credits() {
  const list = h('div', {}, h('p', { class: 'muted' }, '…'));
  fetch('audio/credits.json')
    .then((r) => r.json())
    .then((items) => list.replaceChildren(...items.map((c) => h('div', { class: 'credit' },
      h('div', {}, h('strong', { lang: 'en-GB' }, soundName(c.file)),
        h('span', { class: 'muted small' }, ` · ${SETTINGS.creditsAccent[c.accent] || c.accent}`)),
      h('div', { class: 'small' }, `${SETTINGS.creditsAuthor} ${cleanAuthor(c.author)} · ${c.license}`),
      h('a', { class: 'small link wrap', href: c.url, target: '_blank', rel: 'noopener' }, c.url)))))
    .catch(() => list.replaceChildren(h('p', {}, SETTINGS.creditsLoadFail)));
  return h('div', { class: 'page' }, h('p', { class: 'muted' }, SETTINGS.creditsNote), h('div', { class: 'card' }, list));
}

function download(ctx) {
  const blob = new Blob([exportBackup(ctx.state)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = h('a', { href: url, download: `english-study-backup-${ctx.today}.json` });
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 10000);
  toast(SETTINGS.exported);
}

function shareIcon() {
  const ns = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(ns, 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('class', 'icon');
  svg.innerHTML = '<path d="M12 3v12M8 7l4-4 4 4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M6 11v9h12v-9" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>';
  return svg;
}

export function render(ctx, sub) {
  if (sub === 'credits') return { el: credits(), title: SETTINGS.creditsTitle };
  const s = ctx.state;
  const setSetting = (k, v) => ctx.set({ ...ctx.state, settings: { ...ctx.state.settings, [k]: v } });
  const time = (label, key) => h('label', { class: 'time-row' }, h('span', {}, label),
    h('input', { type: 'time', value: s.settings[key], onchange: (e) => { if (e.target.value) setSetting(key, e.target.value); } }));
  const moveNce = (d) => {
    const n = Math.min(Math.max(ctx.state.nceLesson + d, 1), NCE_LAST - 1);
    ctx.set({ ...ctx.state, nceLesson: n });
    toast(SETTINGS.nceSaved(n));
    ctx.rerender();
  };
  const fileInput = h('input', {
    type: 'file', accept: 'application/json,.json', class: 'hidden',
    onchange: async (e) => {
      const file = e.target.files && e.target.files[0];
      e.target.value = '';
      if (!file) return;
      const r = importBackup(await file.text());
      if (!r.ok) { toast(SETTINGS.importBad); return; }
      if (!confirm(SETTINGS.importConfirm)) return;
      ctx.set(r.state);
      toast(SETTINGS.imported);
      ctx.go('#home');
    },
  });
  const done = s.nceLesson > NCE_LAST;

  const el = h('div', { class: 'page' },
    h('section', { class: 'card' },
      h('h3', {}, SETTINGS.pushTitle),
      time(SETTINGS.babyTime, 'babyTime'),
      time(SETTINGS.studyTime, 'studyTime'),
      h('p', { class: 'muted small' }, SETTINGS.pushNote)),
    done ? null : h('section', { class: 'card' },
      h('h3', {}, SETTINGS.nceTitle),
      h('p', { class: 'lead center' }, SETTINGS.nceCurrent(s.nceLesson)),
      h('div', { class: 'btn-row' },
        secondary(SETTINGS.ncePrev, () => moveNce(-2), { disabled: s.nceLesson <= 1 }),
        secondary(SETTINGS.nceNext, () => moveNce(2), { disabled: s.nceLesson >= NCE_LAST - 1 }))),
    h('section', { class: 'card' },
      h('h3', {}, SETTINGS.backupTitle),
      h('p', { class: 'muted small' }, SETTINGS.backupNote),
      h('div', { class: 'btn-row' },
        primary(SETTINGS.exportBtn, () => download(ctx)),
        secondary(SETTINGS.importBtn, () => fileInput.click())),
      fileInput),
    h('section', { class: 'card' },
      h('h3', {}, SETTINGS.homeTitle),
      h('ol', { class: 'steps' }, SETTINGS.homeSteps.map((t, i) => h('li', {}, t, i === 1 ? shareIcon() : null))),
      h('p', { class: 'muted small' }, SETTINGS.homeNote)),
    h('a', { class: 'btn', href: '#settings/credits' }, SETTINGS.creditsBtn));
  return { el, title: SETTINGS.title };
}
