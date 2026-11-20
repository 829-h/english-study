// 第一次打开：只问音标学到哪了
import { freshState } from '../state.js';
import { PHONICS_SCHEDULE } from '../../data/phonics.js';
import { h } from '../ui.js';
import { FIRST_RUN, APP_TITLE } from '../copy.js';

export function render(ctx) {
  let picking = false;
  const el = h('div', { class: 'page' });
  const start = (day) => ctx.finishFirstRun({ ...freshState(ctx.today), phonicsDay: day });

  const draw = () => {
    const body = [
      h('h2', { class: 'center' }, FIRST_RUN.title),
      h('p', { class: 'center lead' }, FIRST_RUN.question),
      h('button', { class: 'btn primary big', type: 'button', onclick: () => start(1) }, FIRST_RUN.fromStart),
    ];
    if (!picking) {
      body.push(h('p', { class: 'center' },
        h('button', { class: 'link-btn', type: 'button', onclick: () => { picking = true; draw(); } }, FIRST_RUN.partly)));
    } else {
      body.push(h('p', { class: 'center muted' }, FIRST_RUN.pickDay));
      body.push(h('div', { class: 'grid3' },
        PHONICS_SCHEDULE.map((e) => h('button', {
          class: 'btn', type: 'button', onclick: () => start(e.day),
        }, FIRST_RUN.day(e.day)))));
    }
    body.push(h('p', { class: 'center muted small' }, FIRST_RUN.ncNote));
    el.replaceChildren(...body);
  };
  draw();
  return { el, title: APP_TITLE };
}
