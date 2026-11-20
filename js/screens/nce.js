// 新概念：144 课列表，今天那一对高亮；点开一课看重点词和句子
import { NCE1 } from '../../data/nce1.js';
import { lessonStatus } from '../catalog.js';
import { h } from '../ui.js';
import { NCE_TAB } from '../copy.js';
import { nceBlock } from './new.js';

function detail(ctx, n) {
  const l = NCE1.find((x) => x.lesson === n);
  const el = h('div', { class: 'page' },
    h('p', { class: 'notice soft' }, NCE_TAB.intro),
    l ? nceBlock(ctx, l) : h('div', { class: 'card center' }, h('p', {}, NCE_TAB.notFound)));
  return { el, title: l ? NCE_TAB.lesson(n) : NCE_TAB.title };
}

function badge(status) {
  if (status === 'today') return h('span', { class: 'badge-today' }, NCE_TAB.today);
  if (status === 'done') return h('span', { class: 'item-done', 'aria-label': NCE_TAB.doneLabel }, NCE_TAB.doneMark);
  return h('span', { class: 'item-go' }, '›');
}

export function render(ctx, sub) {
  if (sub) return detail(ctx, Number(sub));
  let first = null;
  const rows = NCE1.map((l) => {
    const st = lessonStatus(l.lesson, ctx.state);
    const li = h('li', {},
      h('a', { class: `item-row ${st}`, href: `#nce/${l.lesson}` },
        h('div', { class: 'item-text' },
          h('div', { class: 'muted small' }, NCE_TAB.lesson(l.lesson)),
          h('div', { class: 'item-name en wrap', lang: 'en-GB' }, l.title)),
        badge(st)));
    if (st === 'today' && !first) first = li;
    return li;
  });
  const el = h('div', { class: 'page' },
    h('p', { class: 'muted small' }, NCE_TAB.intro),
    h('ul', { class: 'items' }, rows));
  // 打开时把今天那一课滚到眼前
  if (first) requestAnimationFrame(() => first.scrollIntoView({ block: 'center' }));
  return { el, title: NCE_TAB.title };
}
