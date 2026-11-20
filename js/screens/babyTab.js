// 宝宝分栏：今天 3 句在最上面，下面 8 个生活场景和儿歌，点开都能听
import { todayPlan } from '../plan.js';
import { BABY_SCENES, RHYMES } from '../../data/baby.js';
import { h } from '../ui.js';
import { BABY, BABY_TAB } from '../copy.js';
import { babyCard, rhymeLines } from './baby.js';

const linkRow = (href, title, sub) => h('li', {},
  h('a', { class: 'item-row', href },
    h('div', { class: 'item-text' },
      h('div', { class: 'item-name wrap' }, title),
      sub ? h('div', { class: 'item-line' }, sub) : null),
    h('span', { class: 'item-go' }, BABY_TAB.more)));

// 子页：s1..s8 是场景，r1..r8 是儿歌
function detail(ctx, sub) {
  const i = Number(sub.slice(1)) - 1;
  const scene = sub[0] === 's' ? BABY_SCENES[i] : null;
  const rhyme = sub[0] === 'r' ? RHYMES[i] : null;
  if (scene) return { el: h('div', { class: 'page' }, scene.sentences.map((s) => babyCard(ctx, s))), title: scene.name };
  if (rhyme) return { el: h('div', { class: 'page' }, h('div', { class: 'card' }, rhymeLines(ctx, rhyme))), title: BABY_TAB.rhymes };
  return { el: h('div', { class: 'page' }, h('div', { class: 'card center' }, h('p', {}, BABY_TAB.notFound))), title: BABY_TAB.title };
}

export function render(ctx, sub) {
  if (sub) return detail(ctx, sub);
  const { baby } = todayPlan(ctx.state);
  const el = h('div', { class: 'page' },
    h('h3', { class: 'section-title' }, BABY_TAB.today),
    h('p', { class: 'muted small' }, BABY.scene(baby.scene.name)),
    baby.sentences.map((s) => babyCard(ctx, s)),
    h('h3', { class: 'section-title' }, BABY_TAB.scenes),
    h('ul', { class: 'items' }, BABY_SCENES.map((s, i) => linkRow(`#baby/s${i + 1}`, s.name, BABY_TAB.sceneCount(s.sentences.length)))),
    h('h3', { class: 'section-title' }, BABY_TAB.rhymes),
    h('ul', { class: 'items' }, RHYMES.map((r, i) => h('li', {},
      h('a', { class: 'item-row', href: `#baby/r${i + 1}` },
        h('div', { class: 'item-text' },
          h('div', { class: 'item-name en wrap', lang: 'en-GB' }, r.title),
          h('div', { class: 'item-line' }, BABY_TAB.rhymeLines(r.lines.length))),
        h('span', { class: 'item-go' }, BABY_TAB.more))))));
  return { el, title: BABY_TAB.title };
}
