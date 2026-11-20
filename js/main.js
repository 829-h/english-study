// 入口：读进度、换天、按地址栏 # 后面的名字显示页面
import { loadState, saveState, hasSavedState } from './state.js';
import { rollover, toggleItem } from './progress.js';
import { markNewDone } from './plan.js';
import { h, toast } from './ui.js';
import { COMMON, TABS } from './copy.js';
import * as home from './screens/home.js';
import * as firstRun from './screens/firstRun.js';
import * as newScreen from './screens/new.js';
import * as review from './screens/review.js';
import * as listen from './screens/listen.js';
import * as speak from './screens/speak.js';
import * as baby from './screens/baby.js';
import * as settings from './screens/settings.js';
import * as phonicsTab from './screens/phonics.js';
import * as nceTab from './screens/nce.js';
import * as babyTab from './screens/babyTab.js';
import * as me from './screens/me.js';

const ITEM_SCREENS = { new: newScreen, review, listen, speak, baby };
// 底部分栏的 5 个页面；带 /子页 时（如 #nce/3）不显示分栏，左上角返回到分栏页
const TAB_SCREENS = { home, phonics: phonicsTab, nce: nceTab, baby: babyTab, me };

// 手机本地日期（不用 toISOString，那是格林尼治时间）
export function localToday(d = new Date()) {
  const p = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

const app = document.getElementById('app');
const isFirstRun = !hasSavedState();
const loaded = loadState(localToday());
let state = loaded.state;
let recovered = loaded.recovered;
let firstRunPending = isFirstRun;
let cleanup = null;
let renderedDate = null;

function persist() {
  if (!saveState(state)) toast(COMMON.saveFailed);
}

const ctx = {
  get state() { return state; },
  get today() { return state.day.date; },
  get recovered() { return recovered; },
  dismissRecovered() { recovered = false; },
  set(next) { state = next; persist(); },
  go(hash) {
    if (location.hash === hash) render();
    else location.hash = hash;
  },
  rerender: () => render(),
  finishFirstRun(next) {
    firstRunPending = false;
    state = next;
    persist();
    ctx.go('#home');
  },
  // 打勾（已经勾过就不动），然后回首页
  finish(id) {
    if (!state.day.done[id]) state = id === 'new' ? markNewDone(state) : toggleItem(state, id);
    persist();
    ctx.go('#home');
  },
};

function route() {
  const hash = location.hash.replace(/^#/, '');
  if (firstRunPending) return { screen: firstRun };
  const [a, b] = hash.split('/');
  if (a === 'item' && ITEM_SCREENS[b]) return { screen: ITEM_SCREENS[b], back: '#home' };
  if (a === 'settings') return { screen: settings, sub: b, back: b ? '#settings' : '#me' };
  if (TAB_SCREENS[a] && b) return { screen: TAB_SCREENS[a], sub: b, back: `#${a}` };
  if (TAB_SCREENS[a]) return { screen: TAB_SCREENS[a], tab: a };
  return { screen: home, tab: 'home' };
}

function tabBar(active) {
  return h('nav', { class: 'tabbar' },
    h('div', { class: 'tabbar-inner' }, TABS.map((t) => h('a', {
      class: `tab ${t.key === active ? 'on' : ''}`,
      href: `#${t.key}`,
      'aria-current': t.key === active ? 'page' : null,
    }, h('span', { class: 'tab-icon', 'aria-hidden': 'true' }, t.icon), h('span', { class: 'tab-label' }, t.label)))));
}

function speedToggle() {
  const slow = state.settings.slow !== false;
  return h('button', {
    class: 'speed',
    type: 'button',
    'aria-label': COMMON.speedHint,
    onclick: () => {
      state = { ...state, settings: { ...state.settings, slow: !slow } };
      if (!firstRunPending) persist();
      render();
    },
  }, h('span', { class: slow ? 'on' : '' }, COMMON.slow), h('span', { class: slow ? '' : 'on' }, COMMON.normal));
}

function render() {
  if (cleanup) { try { cleanup(); } catch {} cleanup = null; }
  const next = rollover(state, localToday());
  if (next !== state) state = next;
  if (!firstRunPending) persist(); // 第一次打开还没选好之前不存，刷新后还会再问

  renderedDate = state.day.date;

  const { screen, back, sub, tab } = route();
  const out = screen.render(ctx, sub);
  cleanup = out.cleanup || null;

  const header = h('header', { class: 'top' },
    back ? h('a', { class: 'back', href: back }, COMMON.back) : h('span'),
    h('h1', {}, out.title || ''),
    speedToggle());
  document.body.classList.toggle('has-tabs', !!tab);
  app.replaceChildren(...[header, out.el, tab && tabBar(tab)].filter(Boolean));
  window.scrollTo(0, 0);
}

window.addEventListener('hashchange', render);
// 从后台切回来时如果已经过了一天，自动换成今天的内容
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible' && localToday() !== renderedDate) render();
});
render();

// 离线可用：注册缓存脚本（不支持的浏览器直接跳过）
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('sw.js', { updateViaCache: 'none' }).catch(() => {}));
}
