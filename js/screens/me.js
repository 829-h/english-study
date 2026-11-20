// 我的：本周圆点 + 打卡天数 + 音标/新概念进度 + 设置入口
import { streak, totalDays } from '../progress.js';
import { addDays } from '../dates.js';
import { PHONICS_SCHEDULE } from '../../data/phonics.js';
import { NCE1 } from '../../data/nce1.js';
import { h } from '../ui.js';
import { HOME, ME } from '../copy.js';

function weekDots(state) {
  const today = state.day.date;
  const [y, m, d] = today.split('-').map(Number);
  const idx = (new Date(y, m - 1, d).getDay() + 6) % 7; // 周一 = 0
  const done = new Set(state.completedDates);
  return h('div', { class: 'week', 'aria-label': HOME.weekLabel },
    HOME.weekDays.map((name, i) => {
      const date = addDays(today, i - idx);
      const cls = ['dot', done.has(date) ? 'filled' : '', date === today ? 'today' : ''].join(' ');
      return h('div', { class: 'day' }, h('span', { class: cls }), h('small', {}, name));
    }));
}

const row = (label, value) => h('div', { class: 'kv' }, h('span', {}, label), h('strong', {}, value));

const linkRow = (href, title, sub) => h('li', {},
  h('a', { class: 'item-row', href },
    h('div', { class: 'item-text' }, h('div', { class: 'item-name' }, title), h('div', { class: 'item-line' }, sub)),
    h('span', { class: 'item-go' }, '›')));

export function render(ctx) {
  const s = ctx.state;
  const phonicsDone = s.phonicsDay > PHONICS_SCHEDULE.length;
  const nceDone = s.nceLesson > NCE1.length;
  const el = h('div', { class: 'page' },
    h('section', { class: 'card center' },
      h('h3', {}, ME.week),
      weekDots(s),
      h('p', { class: 'stat-line' },
        h('strong', {}, HOME.streak(streak(s, s.day.date))),
        h('span', { class: 'muted' }, ' · '),
        h('span', {}, HOME.total(totalDays(s)))),
      h('p', { class: 'muted small' }, ME.weekNote)),
    h('section', { class: 'card' },
      h('h3', {}, ME.progressTitle),
      row(ME.phonics, phonicsDone ? ME.phonicsDone : ME.phonicsDay(s.phonicsDay)),
      row(ME.nce, nceDone ? ME.nceDone : ME.nceLesson(s.nceLesson))),
    h('ul', { class: 'items' },
      linkRow('#settings', ME.settings, ME.settingsSub),
      linkRow('#settings/credits', ME.credits, ME.creditsSub)));
  return { el, title: ME.title };
}
