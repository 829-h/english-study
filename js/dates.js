export function dayNum(s) {
  const [y, m, d] = s.split('-').map(Number);
  return Math.round(Date.UTC(y, m - 1, d) / 86400000);
}
export function dateOf(n) {
  return new Date(n * 86400000).toISOString().slice(0, 10);
}
export function addDays(s, n) {
  return dateOf(dayNum(s) + n);
}
export function daysBetween(from, to) {
  return dayNum(to) - dayNum(from);
}
