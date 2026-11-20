import { BABY_SCENES, RHYMES } from '../data/baby.js';
import { daysBetween } from './dates.js';

export function babyForDate(startDate, date) {
  const n = Math.max(0, daysBetween(startDate, date));
  const week = Math.floor(n / 7) % BABY_SCENES.length;
  const scene = BABY_SCENES[week];
  const from = ((n % 7) % 3) * 3;
  return {
    scene,
    sentences: scene.sentences.slice(from, from + 3),
    rhyme: n % 7 === 0 ? RHYMES[week % RHYMES.length] : null,
  };
}
