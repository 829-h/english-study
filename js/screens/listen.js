// 听：今天的音标例词 + 两课重点句，逐条朗读，中间停 1.5 秒
import { todayPlan } from '../plan.js';
import { speakList, playbackPlan } from '../speech.js';
import { h, say, primary, secondary, toast } from '../ui.js';
import { LISTEN, COMMON } from '../copy.js';
import { PHONICS } from '../../data/phonics.js';

export function listenTexts(plan) {
  const out = [];
  const ph = plan.phonics;
  if (ph) {
    if (ph.isReviewDay) {
      for (const id of ph.reviewOf) out.push(PHONICS.find((p) => p.id === id).keyWord);
    } else {
      for (const c of ph.cards) for (const w of c.words) out.push(w.en);
    }
  }
  if (plan.nce) for (const l of plan.nce.lessons) for (const s of l.sentences) out.push(s.en);
  return [...new Set(out)];
}

export function render(ctx) {
  const texts = listenTexts(todayPlan(ctx.state));
  const el = h('div', { class: 'page' });
  let stop = null;
  let current = -1;
  let ended = false;

  const halt = () => { if (stop) { stop(); stop = null; } };

  const draw = () => {
    const playing = !!stop;
    const status = playing ? LISTEN.playing(current + 1, texts.length) : ended ? LISTEN.ended : LISTEN.intro;
    el.replaceChildren(...[
      h('p', { class: 'notice soft' }, LISTEN.nceTip),
      texts.length ? h('p', { class: 'muted' }, status) : h('div', { class: 'card center' }, h('p', {}, LISTEN.empty)),
      texts.length ? (playing
        ? secondary(LISTEN.stop, () => { halt(); draw(); })
        : primary(LISTEN.play, () => {
          ended = false;
          const rate = playbackPlan('s', '', ctx.state.settings.slow, () => null).rate;
          stop = speakList(texts, {
            rate,
            gap: 1500,
            onItem: (i) => { current = i; draw(); },
            onDone: () => { stop = null; ended = true; current = -1; draw(); },
          });
          if (!stop) toast(COMMON.noVoice, 6000);
          draw();
        })) : null,
      h('ol', { class: 'playlist' }, texts.map((t, i) => h('li', { class: i === current ? 'now' : '' },
        h('div', { class: 'en-line' },
          h('button', {
            class: 'speak', type: 'button', 'aria-label': COMMON.listenLabel,
            onclick: () => { halt(); say(ctx, 'w', t, t); current = i; draw(); },
          }, COMMON.listen),
          h('div', { class: 'en', lang: 'en-GB' }, t))))),
      h('div', { class: 'bottom-actions' }, primary(LISTEN.finish, () => { halt(); ctx.finish('listen'); })),
    ].filter(Boolean));
  };
  draw();
  return { el, title: LISTEN.title, cleanup: halt };
}
