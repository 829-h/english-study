// 页面共用的小工具：建元素、提示条、🔊 按钮
import { play } from './speech.js';
import { COMMON } from './copy.js';

export function h(tag, props = {}, ...children) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(props || {})) {
    if (v == null || v === false) continue;
    if (k === 'class') el.className = v;
    else if (k.startsWith('on')) el.addEventListener(k.slice(2).toLowerCase(), v);
    else if (k === 'text') el.textContent = v;
    else el.setAttribute(k, v === true ? '' : v);
  }
  for (const c of children.flat()) {
    if (c == null || c === false) continue;
    el.append(c instanceof Node ? c : document.createTextNode(String(c)));
  }
  return el;
}

let toastTimer = null;
export function toast(msg, ms = 4000) {
  let el = document.getElementById('toast');
  if (!el) {
    el = h('div', { id: 'toast', class: 'toast', role: 'status' });
    document.body.append(el);
  }
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), ms);
}

// 点了马上读（必须同步调用 play，iPhone 才肯出声）
export function say(ctx, kind, key, text) {
  if (!play(kind, key, text, ctx.state.settings.slow)) toast(COMMON.noVoice, 6000);
}

export function speakBtn(ctx, kind, key, text, cls = '') {
  return h('button', {
    class: `speak ${cls}`.trim(),
    type: 'button',
    'aria-label': COMMON.listenLabel,
    onclick: (e) => { e.stopPropagation(); say(ctx, kind, key, text); },
  }, COMMON.listen);
}

// 一行英文：🔊 + 英文 + 中文
export function enLine(ctx, kind, key, en, zh) {
  return h('div', { class: 'en-line' },
    speakBtn(ctx, kind, key, en),
    h('div', { class: 'en-text' },
      h('div', { class: 'en', lang: 'en-GB' }, en),
      zh ? h('div', { class: 'zh' }, zh) : null));
}

export function primary(label, onclick, extra = {}) {
  return h('button', { class: 'btn primary', type: 'button', onclick, ...extra }, label);
}

export function secondary(label, onclick, extra = {}) {
  return h('button', { class: 'btn', type: 'button', onclick, ...extra }, label);
}
