// 新内容：音标好记卡 → 听音选对 → 新概念重点词句
import { todayPlan } from '../plan.js';
import { repeatTomorrow } from '../progress.js';
import { PHONICS, QUIZ_PAIRS } from '../../data/phonics.js';
import { h, say, speakBtn, enLine, primary, secondary, toast } from '../ui.js';
import { NEW } from '../copy.js';

// 这几个音的录音是整个例词（见 scripts/audio-sources.json 里 fallback: word）
const WORD_SOUND = new Set(['eɪ', 'aɪ', 'ɔɪ', 'aʊ', 'əʊ', 'ɪə', 'eə', 'ʊə', 'tr', 'dr']);

// 今天卡片里成对的音 → 最多 5 道题（几组轮流出）
export function quizFor(ids) {
  const groups = QUIZ_PAIRS.filter((g) => g.ids.every((id) => ids.includes(id)));
  const out = [];
  for (let i = 0; out.length < 5 && groups.some((g) => i < g.items.length); i++) {
    for (const g of groups) {
      if (i < g.items.length && out.length < 5) out.push({ ...g.items[i], options: g.ids });
    }
  }
  return out;
}

export function phonicsCard(ctx, c) {
  const wordSound = WORD_SOUND.has(c.id);
  const row = (label, content) => h('div', { class: 'row' }, h('div', { class: 'row-label' }, label), content);
  return h('div', { class: 'card phonics' },
    h('button', {
      class: 'symbol', type: 'button', lang: 'en-GB',
      onclick: () => say(ctx, 'p', c.id, c.keyWord),
    }, c.symbol, h('small', {}, `🔊 ${wordSound ? NEW.tapSymbolWord : NEW.tapSymbol}`)),
    row(NEW.how, h('p', {}, c.how)),
    row(NEW.like, h('p', {}, c.likeChinese)),
    row(NEW.mistake, h('p', {}, c.mistake)),
    row(NEW.words, h('div', {}, c.words.map((w) => enLine(ctx, 'w', w.en, w.en, w.zh)))),
    row(NEW.sentence, enLine(ctx, 's', c.sentence.en, c.sentence.en, c.sentence.zh)));
}

export function nceBlock(ctx, l) {
  return h('div', { class: 'card' },
    h('div', { class: 'muted' }, NEW.lesson(l.lesson)),
    h('h3', { class: 'wrap', lang: 'en-GB' }, l.title),
    l.words.length ? h('div', {}, h('h4', {}, NEW.keyWords), l.words.map((w) => enLine(ctx, 'w', w.en, w.en, w.zh))) : null,
    h('h4', {}, l.words.length ? NEW.keySentences : NEW.practice),
    l.sentences.map((s) => enLine(ctx, 's', s.en, s.en, s.zh)));
}

export function render(ctx) {
  const plan = todayPlan(ctx.state);
  const ph = plan.phonics;
  const cards = ph ? (ph.isReviewDay ? ph.reviewOf.map((id) => PHONICS.find((p) => p.id === id)) : ph.cards) : [];
  const quiz = quizFor(cards.map((c) => c.id));
  let stage = cards.length ? 'cards' : 'nce';
  let idx = 0;
  let q = { i: 0, picked: null, right: 0 };
  const el = h('div', { class: 'page' });

  const toNext = () => { stage = quiz.length ? 'quiz' : 'nce'; draw(); };
  const flip = (d) => {
    const n = idx + d;
    if (n >= 0 && n < cards.length) { idx = n; draw(); }
  };

  const drawCards = () => {
    const card = phonicsCard(ctx, cards[idx]);
    let x0 = null;
    card.addEventListener('touchstart', (e) => { x0 = e.touches[0].clientX; }, { passive: true });
    card.addEventListener('touchend', (e) => {
      if (x0 == null) return;
      const dx = e.changedTouches[0].clientX - x0;
      x0 = null;
      if (Math.abs(dx) > 60) flip(dx < 0 ? 1 : -1);
    });
    const last = idx === cards.length - 1;
    return [
      h('h2', {}, ph.isReviewDay ? NEW.phonicsReviewTitle : NEW.phonicsTitle),
      h('p', { class: 'muted' }, NEW.cardCount(idx + 1, cards.length)),
      card,
      h('div', { class: 'btn-row' },
        secondary(NEW.prev, () => flip(-1), { disabled: idx === 0 }),
        last ? primary(quiz.length ? NEW.toQuiz : NEW.toNce, toNext) : primary(NEW.next, () => flip(1))),
    ];
  };

  const drawQuiz = () => {
    const item = quiz[q.i];
    if (!item) {
      return [
        h('h2', {}, NEW.quizTitle),
        h('div', { class: 'card center' }, h('p', { class: 'lead' }, NEW.quizDone(q.right, quiz.length))),
        primary(NEW.toNce, () => { stage = 'nce'; draw(); }),
      ];
    }
    const answered = q.picked != null;
    const ok = q.picked === item.answer;
    return [
      h('h2', {}, NEW.quizTitle),
      h('p', { class: 'muted' }, `${NEW.quizCount(q.i + 1, quiz.length)} · ${NEW.quizHint}`),
      h('div', { class: 'card center' },
        speakBtn(ctx, 'w', item.en, item.en, 'huge'),
        h('div', { class: 'choices' }, item.options.map((opt) => h('button', {
          type: 'button',
          class: `btn choice ${answered && opt === item.answer ? 'right' : ''} ${answered && opt === q.picked && !ok ? 'wrong' : ''}`,
          disabled: answered,
          onclick: () => { q.picked = opt; if (opt === item.answer) q.right += 1; draw(); },
        }, `/${opt}/`))),
        answered ? h('p', { class: `feedback ${ok ? 'good' : 'bad'}` }, ok ? NEW.right : NEW.wrong(`/${item.answer}/`),
          h('span', { class: 'en', lang: 'en-GB' }, ` ${item.en}`)) : null),
      answered ? primary(NEW.quizNext, () => { q = { i: q.i + 1, picked: null, right: q.right }; draw(); }) : null,
    ];
  };

  const drawNce = () => {
    const out = [];
    if (plan.nce) {
      out.push(h('h2', {}, NEW.nceTitle), h('p', { class: 'notice soft' }, NEW.nceWhere));
      plan.nce.lessons.forEach((l) => out.push(nceBlock(ctx, l)));
    } else if (!cards.length) {
      out.push(h('div', { class: 'card center' }, h('p', {}, NEW.noNew)));
    }
    out.push(h('div', { class: 'bottom-actions' },
      primary(NEW.finish, () => ctx.finish('new')),
      secondary(NEW.again, () => {
        ctx.set(repeatTomorrow(ctx.state));
        toast(NEW.againDone);
        ctx.finish('new');
      })));
    return out;
  };

  const draw = () => {
    const parts = stage === 'cards' ? drawCards() : stage === 'quiz' ? drawQuiz() : drawNce();
    el.replaceChildren(...parts.filter(Boolean));
    window.scrollTo(0, 0);
  };
  draw();
  return { el, title: NEW.title };
}
