import { PHONICS_SCHEDULE } from '../data/phonics.js';
import { NCE1 } from '../data/nce1.js';
import { dayNum, dateOf } from './dates.js';

const PHONICS_END = PHONICS_SCHEDULE.length + 1; // 22 = 学完
const NCE_LAST = NCE1.length; // 144
const NCE_END = NCE_LAST + 1; // 145 = 学完
const IDS = ['review', 'new', 'listen', 'speak', 'baby'];

export function rollover(state, today) {
  if (today <= state.day.date) return state;
  let { phonicsDay, nceLesson } = state;
  if (state.day.done.new && !state.day.repeat) {
    if (phonicsDay < PHONICS_END) phonicsDay += 1;
    if (nceLesson < NCE_END) nceLesson = nceLesson + 2 <= NCE_LAST ? nceLesson + 2 : NCE_END;
  }
  return {
    ...state,
    phonicsDay,
    nceLesson,
    day: {
      date: today,
      done: { review: false, new: false, listen: false, speak: false, baby: false },
      repeat: false,
    },
  };
}

export function toggleItem(state, id) {
  const done = { ...state.day.done, [id]: !state.day.done[id] };
  const date = state.day.date;
  const rest = state.completedDates.filter((d) => d !== date);
  const completedDates = IDS.every((k) => done[k]) ? [...rest, date] : rest;
  return { ...state, day: { ...state.day, done }, completedDates };
}

export function repeatTomorrow(state) {
  return { ...state, day: { ...state.day, repeat: true } };
}

export function streak(state, today) {
  const set = new Set(state.completedDates);
  let n = dayNum(today);
  if (!set.has(dateOf(n))) n -= 1;
  let count = 0;
  while (set.has(dateOf(n))) {
    count += 1;
    n -= 1;
  }
  return count;
}

export function totalDays(state) {
  return state.completedDates.length;
}

export function isAllFinished(state) {
  return state.phonicsDay === PHONICS_END && state.nceLesson === NCE_END;
}
