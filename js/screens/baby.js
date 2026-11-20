// 对宝宝说：今天 3 句大字卡，隔几天一首儿歌
import { todayPlan } from '../plan.js';
import { h, speakBtn, primary } from '../ui.js';
import { BABY } from '../copy.js';

// 一句话的大字卡（宝宝分栏里也用）
export function babyCard(ctx, s) {
  return h('div', { class: 'card baby' },
    h('div', { class: 'baby-en' }, h('span', { lang: 'en-GB' }, s.en), speakBtn(ctx, 'w', s.en, s.en, 'big')),
    h('p', { class: 'lead' }, s.zh),
    h('p', {}, h('span', { class: 'tag' }, BABY.when), s.when),
    h('p', {}, h('span', { class: 'tag' }, BABY.tip), s.tip));
}

// 一首儿歌：整首播放 + 每行点读
export function rhymeLines(ctx, rhyme) {
  return [
    h('div', { class: 'en-line' },
      speakBtn(ctx, 'w', rhyme.title, rhyme.lines.join(' ')),
      h('strong', { lang: 'en-GB' }, rhyme.title)),
    rhyme.lines.map((line) => h('div', { class: 'en-line small-line' },
      speakBtn(ctx, 'w', line, line), h('div', { class: 'en', lang: 'en-GB' }, line))),
  ];
}

export function render(ctx) {
  const { baby } = todayPlan(ctx.state);
  const el = h('div', { class: 'page' },
    h('p', { class: 'muted' }, BABY.scene(baby.scene.name)),
    baby.sentences.map((s) => babyCard(ctx, s)),
    baby.rhyme ? h('div', { class: 'card' }, h('h3', {}, BABY.rhyme), rhymeLines(ctx, baby.rhyme)) : null,
    h('div', { class: 'bottom-actions' }, primary(BABY.finish, () => ctx.finish('baby'))));
  return { el, title: BABY.title };
}
