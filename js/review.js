import { addDays } from './dates.js';

export const INTERVALS = [1, 2, 4, 7, 15, 30];

export function addCards(cards, ids, today) {
  const out = { ...cards };
  for (const id of ids) {
    if (!out[id]) out[id] = { box: 0, due: addDays(today, 1) };
  }
  return out;
}

export function dueCards(cards, today, limit = 20) {
  return Object.keys(cards)
    .filter((id) => cards[id].due <= today)
    .sort((a, b) => (cards[a].due < cards[b].due ? -1 : cards[a].due > cards[b].due ? 1 : 0))
    .slice(0, limit);
}

export function grade(cards, id, remembered, today) {
  const cur = cards[id];
  if (!cur) return cards;
  const box = remembered ? Math.min(cur.box + 1, INTERVALS.length - 1) : 0;
  const due = addDays(today, remembered ? INTERVALS[box] : 1);
  return { ...cards, [id]: { box, due } };
}
