// 复习：正面英文 + 🔊，点一下翻出中文，记得 / 忘了
import { dueCards, grade } from '../review.js';
import { PHONICS } from '../../data/phonics.js';
import { NCE1 } from '../../data/nce1.js';
import { h, speakBtn, primary, secondary } from '../ui.js';
import { REVIEW } from '../copy.js';

// 卡片 id：'p:音标' 或 'w:课号:单词'
export function cardContent(id) {
  if (id.startsWith('p:')) {
    const c = PHONICS.find((p) => p.id === id.slice(2));
    if (!c) return null;
    return { kind: 'p', key: c.id, front: c.symbol, say: c.keyWord, sub: c.keyWord, back: c.likeChinese, extra: REVIEW.phonicsBack(c.words.map((w) => `${w.en} ${w.zh}`).join(REVIEW.sep)) };
  }
  const rest = id.slice(2);
  const cut = rest.indexOf(':');
  const lesson = Number(rest.slice(0, cut));
  const en = rest.slice(cut + 1);
  const w = NCE1.find((l) => l.lesson === lesson)?.words.find((x) => x.en === en);
  if (!w) return null;
  return { kind: 'w', key: w.en, front: w.en, say: w.en, sub: null, back: w.zh, extra: null };
}

export function render(ctx) {
  const el = h('div', { class: 'page' });
  let flipped = false;
  let graded = 0;

  const draw = () => {
    const due = dueCards(ctx.state.reviewCards, ctx.today).filter((id) => cardContent(id));
    if (!due.length) {
      el.replaceChildren(
        h('div', { class: 'card center' }, h('p', { class: 'lead' }, graded ? REVIEW.allDone : REVIEW.none)),
        primary(REVIEW.check, () => ctx.finish('review')));
      return;
    }
    const id = due[0];
    const c = cardContent(id);
    const card = h('div', {
      class: `card flash ${flipped ? 'flipped' : ''}`,
      role: 'button',
      tabindex: '0',
      onclick: () => { flipped = !flipped; draw(); },
    },
      h('div', { class: 'flash-front', lang: 'en-GB' }, c.front),
      c.sub ? h('div', { class: 'en muted', lang: 'en-GB' }, c.sub) : null,
      speakBtn(ctx, c.kind, c.key, c.say, 'big'),
      flipped
        ? h('div', { class: 'flash-back' }, h('p', { class: 'lead' }, c.back), c.extra ? h('p', { class: 'muted' }, c.extra) : null)
        : h('p', { class: 'muted' }, REVIEW.tapFlip));
    const mark = (ok) => {
      ctx.set({ ...ctx.state, reviewCards: grade(ctx.state.reviewCards, id, ok, ctx.today) });
      graded += 1;
      flipped = false;
      draw();
    };
    el.replaceChildren(
      h('p', { class: 'muted' }, REVIEW.left(due.length)),
      card,
      h('div', { class: 'btn-row' },
        secondary(REVIEW.forgot, () => mark(false)),
        primary(REVIEW.remember, () => mark(true))));
  };
  draw();
  return { el, title: REVIEW.title };
}
