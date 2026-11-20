// 开口：今天 3 句，听标准 → 按住录音 → 听自己读的
import { todayPlan } from '../plan.js';
import { canRecord, startRecording, stopRecording } from '../speech.js';
import { h, enLine, primary, toast } from '../ui.js';
import { SPEAK, COMMON } from '../copy.js';

// 两课各取第一句重点句 + 一句常用短句，不够用音标句子补
export function speakSentences(plan) {
  const list = [];
  if (plan.nce) for (const l of plan.nce.lessons) if (l.sentences[0]) list.push(l.sentences[0]);
  if (plan.phonics) for (const c of plan.phonics.cards) list.push(c.sentence);
  list.splice(2, 0, plan.phrase);
  return list.slice(0, 3);
}

export function render(ctx) {
  const sentences = speakSentences(todayPlan(ctx.state));
  const urls = new Map(); // 句子序号 → 自己录音的地址
  const el = h('div', { class: 'page' });
  let active = null; // 正在录的句子序号
  let pending = null;
  const recordable = canRecord();

  const revokeAll = () => { for (const u of urls.values()) URL.revokeObjectURL(u); urls.clear(); };

  const begin = (i, e) => {
    e.preventDefault();
    if (active != null) return;
    active = i;
    pending = startRecording(); // 要在按下的那一刻就调用，手机才会弹出麦克风授权
    const btn = e.currentTarget;
    try { btn.setPointerCapture(e.pointerId); } catch {}
    btn.classList.add('recording'); // 不整页重画，免得手指下的按钮被换掉、收不到松开
    btn.textContent = SPEAK.recording;
  };
  const end = (i) => {
    if (active !== i || !pending) return;
    const p = pending;
    pending = null;
    p.then(() => stopRecording())
      .then((blob) => {
        if (urls.has(i)) URL.revokeObjectURL(urls.get(i));
        urls.set(i, URL.createObjectURL(blob));
      })
      .catch((err) => {
        if (err && err.reason === 'denied') toast(COMMON.noMic, 6000);
        else if (err && err.reason === 'unsupported') toast(COMMON.noRecord, 6000);
      })
      .finally(() => { active = null; draw(); });
  };

  const draw = () => {
    el.replaceChildren(...[
      h('p', { class: 'muted' }, SPEAK.intro),
      recordable ? null : h('p', { class: 'notice soft' }, COMMON.noRecord),
      ...sentences.map((s, i) => {
        const rec = active === i;
        return h('div', { class: 'card' },
          h('p', { class: 'muted small' }, SPEAK.count(i + 1, sentences.length)),
          enLine(ctx, 'w', s.en, s.en, s.zh),
          recordable ? h('button', {
            class: `btn hold ${rec ? 'recording' : ''}`,
            type: 'button',
            onpointerdown: (e) => begin(i, e),
            onpointerup: () => end(i),
            onpointercancel: () => end(i),
            oncontextmenu: (e) => e.preventDefault(),
          }, rec ? SPEAK.recording : `🎙 ${SPEAK.hold}`) : null,
          urls.has(i)
            ? h('div', { class: 'mine' }, h('span', { class: 'muted small' }, SPEAK.playMine),
              h('audio', { controls: true, src: urls.get(i), preload: 'auto' }))
            : (recordable ? h('p', { class: 'muted small' }, SPEAK.noMine) : null));
      }),
      h('div', { class: 'bottom-actions' }, primary(SPEAK.finish, () => ctx.finish('speak'))),
    ].filter(Boolean));
  };
  draw();
  return {
    el,
    title: SPEAK.title,
    cleanup: () => {
      if (pending) pending.then(() => stopRecording()).catch(() => {});
      revokeAll();
    },
  };
}
