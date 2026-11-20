// 今天：打卡天数 + 「下一步」大卡片 + 今天进度 + 5 个板块
import { streak, totalDays } from '../progress.js';
import { todayPlan } from '../plan.js';
import { dueCards } from '../review.js';
import { ORDER, nextItem, doneCount } from '../catalog.js';
import { h } from '../ui.js';
import { HOME, ITEMS, FINISHED, APP_TITLE } from '../copy.js';
import { listenTexts } from './listen.js';

export function newLine(state, plan) {
  if (state.day.repeat) return HOME.repeatNote;
  const parts = [];
  if (plan.phonics) {
    parts.push(plan.phonics.isReviewDay
      ? HOME.newPhonicsReview
      : HOME.newPhonics(plan.phonics.cards.map((c) => c.symbol).join(' ')));
  }
  if (plan.nce) {
    const ls = plan.nce.lessons;
    parts.push(HOME.newNce(ls[0].lesson, ls[ls.length - 1].lesson));
  }
  return parts.length ? parts.join(HOME.newJoin) : HOME.newFinished;
}

function lineFor(id, state, plan) {
  if (id === 'review') {
    const n = dueCards(state.reviewCards, state.day.date).length;
    return n ? HOME.reviewLine(n) : HOME.reviewNone;
  }
  if (id === 'new') return newLine(state, plan);
  if (id === 'listen') return HOME.listenLine(listenTexts(plan).length);
  if (id === 'speak') return HOME.speakLine;
  return HOME.babyLine(plan.baby.scene.name);
}

function finishedPage(ctx) {
  return h('section', { class: 'card center finished' },
    h('div', { class: 'big-emoji' }, '🎉'),
    h('h2', {}, FINISHED.title),
    h('p', {}, FINISHED.body),
    h('button', {
      class: 'btn primary', type: 'button',
      onclick: () => { ctx.set({ ...ctx.state, finishedNotice: true }); ctx.rerender(); },
    }, FINISHED.ok));
}

export function render(ctx) {
  const state = ctx.state;
  const plan = todayPlan(state);
  const today = state.day.date;
  const done = state.day.done;
  const el = h('div', { class: 'page' });

  if (ctx.recovered) {
    el.append(h('div', { class: 'notice' }, HOME.recovered));
    ctx.dismissRecovered();
  }
  if (plan.finished && !state.finishedNotice) {
    el.append(finishedPage(ctx));
    return { el, title: APP_TITLE };
  }

  el.append(h('p', { class: 'stat-line center' },
    h('strong', {}, HOME.streak(streak(state, today))),
    h('span', { class: 'muted' }, ' · '),
    h('span', {}, HOME.total(totalDays(state)))));

  const next = nextItem(done);
  el.append(next
    ? h('section', { class: 'card next-card' },
      h('h2', {}, HOME.next(ITEMS[next].name)),
      h('p', { class: 'next-line' }, lineFor(next, state, plan)),
      h('p', { class: 'muted small' }, HOME.minutes(ITEMS[next].minutes)),
      h('a', { class: 'btn primary big', href: `#item/${next}` }, HOME.start))
    : h('section', { class: 'card center all-done' },
      h('h2', {}, HOME.allDone), h('p', { class: 'muted' }, HOME.allDoneSub)));

  const n = doneCount(done);
  el.append(h('div', { class: 'progress', 'aria-label': `${HOME.progress} ${HOME.progressCount(n, ORDER.length)}` },
    h('span', { class: 'muted' }, HOME.progress),
    h('span', { class: 'pips' }, ORDER.map((k) => h('span', { class: `pip ${done[k] ? 'on' : ''}` }))),
    h('strong', {}, HOME.progressCount(n, ORDER.length))));

  el.append(h('h3', { class: 'section-title' }, HOME.listTitle));
  el.append(h('ul', { class: 'items' }, ORDER.map((id) => h('li', {},
    h('a', { class: `item-row ${done[id] ? 'done' : ''}`, href: `#item/${id}` },
      h('div', { class: 'item-text' },
        h('div', { class: 'item-name' }, ITEMS[id].name),
        h('div', { class: 'item-line' }, lineFor(id, state, plan))),
      done[id]
        ? h('span', { class: 'item-done', 'aria-label': HOME.doneLabel }, HOME.doneMark)
        : h('span', { class: 'item-go' }, HOME.go))))));
  return { el, title: APP_TITLE };
}
