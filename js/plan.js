import { PHONICS, PHONICS_SCHEDULE } from '../data/phonics.js';
import { NCE1 } from '../data/nce1.js';
import { PHRASES } from '../data/phrases.js';
import { babyForDate } from './baby.js';
import { addCards } from './review.js';
import { daysBetween } from './dates.js';
import { isAllFinished } from './progress.js';

const PHONICS_END = PHONICS_SCHEDULE.length + 1;
const NCE_END = NCE1.length + 1;

function phonicsToday(state) {
  if (state.phonicsDay >= PHONICS_END) return null;
  const e = PHONICS_SCHEDULE.find((x) => x.day === state.phonicsDay);
  const cards = e.ids.map((id) => PHONICS.find((p) => p.id === id));
  return { day: e.day, cards, isReviewDay: !!e.reviewOf, reviewOf: e.reviewOf || [] };
}

function nceToday(state) {
  if (state.nceLesson >= NCE_END) return null;
  const lessons = [state.nceLesson, state.nceLesson + 1]
    .map((n) => NCE1.find((l) => l.lesson === n))
    .filter(Boolean);
  return { lessons };
}

export function todayPlan(state) {
  const date = state.day.date;
  const n = Math.max(0, daysBetween(state.startDate, date));
  return {
    phonics: phonicsToday(state),
    nce: nceToday(state),
    baby: babyForDate(state.startDate, date),
    phrase: PHRASES[n % PHRASES.length],
    finished: isAllFinished(state),
  };
}

export function markNewDone(state) {
  const plan = todayPlan(state);
  const ids = [];
  if (plan.phonics) for (const c of plan.phonics.cards) ids.push(`p:${c.id}`);
  if (plan.nce) {
    for (const l of plan.nce.lessons) for (const w of l.words) ids.push(`w:${l.lesson}:${w.en}`);
  }
  const done = { ...state.day.done, new: true };
  const date = state.day.date;
  const all = ['review', 'new', 'listen', 'speak', 'baby'].every((k) => done[k]);
  const rest = state.completedDates.filter((d) => d !== date);
  return {
    ...state,
    day: { ...state.day, done },
    completedDates: all ? [...rest, date] : rest,
    reviewCards: addCards(state.reviewCards, ids, date),
  };
}
