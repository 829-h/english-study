// 音标：48 个按三组排成大按钮，点一下听，「看卡片」打开好记卡
import { PHONICS } from '../../data/phonics.js';
import { PHONICS_GROUPS, phonicsLearned } from '../catalog.js';
import { h, say } from '../ui.js';
import { PHONICS_TAB } from '../copy.js';
import { phonicsCard } from './new.js';

const cardHash = (id) => `#phonics/${encodeURIComponent(id)}`;

function cell(ctx, c) {
  let timer = null;
  let longPressed = false;
  const cancel = () => { clearTimeout(timer); timer = null; };
  return h('div', { class: `ph-cell ${phonicsLearned(c.id, ctx.state) ? '' : 'later'}` },
    h('button', {
      class: 'ph-btn', type: 'button', lang: 'en-GB',
      // 长按半秒打开卡片
      onpointerdown: () => { longPressed = false; cancel(); timer = setTimeout(() => { longPressed = true; ctx.go(cardHash(c.id)); }, 500); },
      onpointerup: cancel,
      onpointerleave: cancel,
      onpointercancel: cancel,
      oncontextmenu: (e) => e.preventDefault(),
      onclick: () => { if (!longPressed) say(ctx, 'p', c.id, c.keyWord); },
    }, c.symbol),
    h('a', { class: 'ph-card-link', href: cardHash(c.id) }, PHONICS_TAB.card));
}

function detail(ctx, id) {
  const c = PHONICS.find((p) => p.id === id);
  const el = h('div', { class: 'page' }, c ? phonicsCard(ctx, c) : h('div', { class: 'card center' }, h('p', {}, PHONICS_TAB.notFound)));
  return { el, title: PHONICS_TAB.cardTitle };
}

export function render(ctx, sub) {
  if (sub) return detail(ctx, decodeURIComponent(sub));
  const el = h('div', { class: 'page' },
    h('p', { class: 'muted small' }, PHONICS_TAB.intro),
    PHONICS_GROUPS.map((g) => h('section', { class: 'ph-group' },
      h('h3', { class: 'section-title' }, PHONICS_TAB.groups[g.key],
        h('span', { class: 'muted small' }, ` ${PHONICS_TAB.groupCount(g.cards.length)}`)),
      h('div', { class: 'ph-grid' }, g.cards.map((c) => cell(ctx, c))))));
  return { el, title: PHONICS_TAB.title };
}
