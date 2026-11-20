const KEY = 'english-study-state';

export function freshState(today) {
  return {
    version: 1,
    startDate: today,
    phonicsDay: 1,
    nceLesson: 3,
    day: {
      date: today,
      done: { review: false, new: false, listen: false, speak: false, baby: false },
      repeat: false,
    },
    completedDates: [],
    reviewCards: {},
    settings: { babyTime: '08:00', studyTime: '21:00', slow: true },
    finishedNotice: false,
  };
}

function isValidState(s) {
  return !!s && typeof s === 'object' && s.version === 1 && !!s.day && !!s.day.done && !!s.settings;
}

export function parseState(raw, today) {
  if (raw == null) return { state: freshState(today), recovered: false };
  try {
    const s = JSON.parse(raw);
    if (isValidState(s)) return { state: s, recovered: false };
  } catch {}
  return { state: freshState(today), recovered: true };
}

export function exportBackup(state) {
  return JSON.stringify({ app: 'english-study', exportedAt: new Date().toISOString(), state });
}

export function importBackup(text) {
  try {
    const o = JSON.parse(text);
    if (o && o.app === 'english-study' && isValidState(o.state)) return { ok: true, state: o.state };
  } catch {}
  return { ok: false };
}

export function loadState(today) {
  let raw = null;
  try { raw = globalThis.localStorage?.getItem(KEY) ?? null; } catch {}
  return parseState(raw, today);
}

export function hasSavedState() {
  try { return globalThis.localStorage?.getItem(KEY) != null; } catch { return false; }
}

export function saveState(state) {
  try { globalThis.localStorage?.setItem(KEY, JSON.stringify(state)); return true; } catch { return false; }
}
