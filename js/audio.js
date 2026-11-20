// 点读真人录音：音标 audio/p/<名>.m4a，例词 audio/w/<词>.m4a
// 哪些文件存在由 scripts/fetch-audio.mjs 写进 ../audio/available.js
import { AVAILABLE } from '../audio/available.js';

// 音标 id → 文件名（只用小写英文字母，iPhone 和电脑都不出错）
export const IPA_FILE = {
  'iː': 'iy', 'ɪ': 'ih', 'e': 'e', 'æ': 'ae', 'ɑː': 'aa', 'ʌ': 'uh',
  'ɔː': 'aw', 'ɒ': 'o', 'uː': 'uw', 'ʊ': 'uu', 'ɜː': 'er', 'ə': 'schwa',
  'eɪ': 'ei', 'aɪ': 'ai', 'ɔɪ': 'oi', 'aʊ': 'au', 'əʊ': 'ou',
  'ɪə': 'ia', 'eə': 'ea', 'ʊə': 'ua',
  'θ': 'th', 'ð': 'dh', 'ʃ': 'sh', 'ʒ': 'zh', 'tʃ': 'ch', 'dʒ': 'j',
  'ŋ': 'ng', 'j': 'y',
};

export function safeName(kind, key) {
  if (kind === 'p') return IPA_FILE[key] ?? key;
  return String(key).toLowerCase().replace(/[^a-z]/g, '');
}

// 返回相对 app/ 的路径；没有录音返回 null（界面退回手机朗读）
export function audioFileFor(kind, key) {
  const name = safeName(kind, key);
  return AVAILABLE[kind]?.includes(name) ? `audio/${kind}/${name}.m4a` : null;
}
