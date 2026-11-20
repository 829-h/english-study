// 分栏页面用的纯判断：下一步做哪个、音标学没学过、某课是什么状态
import { PHONICS, PHONICS_SCHEDULE } from '../data/phonics.js';
import { NCE1 } from '../data/nce1.js';

export const ORDER = ['review', 'new', 'listen', 'speak', 'baby'];

// 今天第一个没做完的板块；都做完了返回 null
export function nextItem(done) {
  return ORDER.find((k) => !done[k]) || null;
}

export function doneCount(done) {
  return ORDER.filter((k) => done[k]).length;
}

// 48 个音标按数据里的顺序分三组：12 单元音 / 8 双元音 / 28 辅音
export const PHONICS_GROUPS = [
  { key: 'mono', cards: PHONICS.slice(0, 12) },
  { key: 'diph', cards: PHONICS.slice(12, 20) },
  { key: 'cons', cards: PHONICS.slice(20) },
];

const DAY_OF = {};
for (const e of PHONICS_SCHEDULE) for (const id of e.ids) if (!(id in DAY_OF)) DAY_OF[id] = e.day;

// 排在今天之前的算学过；今天的要等「新内容」做完才算
export function phonicsLearned(id, state) {
  const d = DAY_OF[id];
  if (d == null) return false;
  return d < state.phonicsDay || (d === state.phonicsDay && !!state.day.done.new);
}

// 'done' 学过 / 'today' 今天这一对 / 'later' 还没学到
export function lessonStatus(n, state) {
  const cur = state.nceLesson;
  if (n < cur) return 'done';
  if (cur <= NCE1.length && n <= cur + 1) return 'today';
  return 'later';
}
