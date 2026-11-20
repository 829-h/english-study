// 朗读和录音。纯判断逻辑可在 node 里测，浏览器相关部分保持很薄。
import { audioFileFor } from './audio.js';

// ---- 纯逻辑 ----
export function playbackPlan(kind, key, slow, audioLookup = audioFileFor) {
  const src = audioLookup(kind, key);
  if (src) return { type: 'file', src, rate: slow ? 0.75 : 1.0 };
  return { type: 'speech', rate: slow ? 0.7 : 0.9 };
}

const norm = (l) => String(l || '').replace('_', '-').toLowerCase();

// 优先英式（en-GB），其次其他英语；同类里优先非 compact
export function chooseVoice(voices) {
  const list = Array.isArray(voices) ? voices : [];
  const pick = (arr) => arr.find((v) => !/compact/i.test(v.name || '')) || arr[0] || null;
  const gb = list.filter((v) => norm(v.lang) === 'en-gb');
  if (gb.length) return pick(gb);
  return pick(list.filter((v) => norm(v.lang).startsWith('en')));
}

// 录音放不出来时，只有它仍是“当前这条”才改用朗读（被新的一条顶掉的不补读）
export function shouldFallback(current, audio) {
  return current !== null && current === audio;
}

// ---- 朗读 ----
const synth = typeof speechSynthesis !== 'undefined' ? speechSynthesis : null;
let voices = [];
function loadVoices() { if (synth) voices = synth.getVoices(); }
if (synth) {
  loadVoices();
  synth.addEventListener?.('voiceschanged', loadVoices);
}

export function pickVoice() {
  if (!voices.length) loadVoices();
  return chooseVoice(voices);
}

export function speak(text, { rate = 0.9 } = {}) {
  if (!synth || typeof SpeechSynthesisUtterance === 'undefined') return false;
  const voice = pickVoice();
  if (!voice) return false;
  synth.cancel(); // 必须在点击事件里同步调用，别放到 await 之后
  const u = new SpeechSynthesisUtterance(text);
  u.voice = voice;
  u.lang = 'en-GB';
  u.rate = rate;
  synth.speak(u);
  return true;
}

let stopList = null; // 正在进行的连续朗读（点别的 🔊 时要先停掉它）

// 连续朗读一串句子，每条读完停 gap 毫秒；第一条必须在点击事件里同步开始。返回停止函数，没声音返回 null
export function speakList(texts, { rate = 0.9, gap = 1500, onItem, onDone } = {}) {
  if (!synth || typeof SpeechSynthesisUtterance === 'undefined') return null;
  const voice = pickVoice();
  if (!voice) return null;
  stopAll();
  let i = 0;
  let stopped = false;
  let timer = null;
  let live = null; // 留住引用，免得 iPhone 把还没读完的句子回收掉、不触发 onend
  const next = () => {
    if (stopped) return;
    if (i >= texts.length) { live = null; onDone?.(); return; }
    const idx = i++;
    onItem?.(idx);
    const u = new SpeechSynthesisUtterance(texts[idx]);
    u.voice = voice;
    u.lang = 'en-GB';
    u.rate = rate;
    u.onend = () => { if (!stopped) timer = setTimeout(next, gap); };
    u.onerror = u.onend;
    live = u;
    synth.speak(u);
  };
  const stop = () => {
    stopped = true; live = null; clearTimeout(timer);
    if (stopList === stop) stopList = null;
    synth.cancel();
  };
  stopList = stop;
  next();
  return stop;
}

// ---- 播放（录音优先，否则朗读） ----
let current = null;
function stopAll() {
  if (stopList) stopList();
  if (current) { try { current.pause(); } catch {} current = null; }
  if (synth) synth.cancel();
}

export function play(kind, key, text, slow = true) {
  stopAll();
  const plan = playbackPlan(kind, key, slow);
  if (plan.type === 'file') {
    const a = new Audio(plan.src);
    a.playbackRate = plan.rate;
    a.preservesPitch = true;
    a.webkitPreservesPitch = true;
    current = a;
    let fell = false;
    const fallback = () => {
      if (fell || !shouldFallback(current, a)) return;
      fell = true;
      current = null;
      speak(text, { rate: playbackPlan(kind, key, slow, () => null).rate });
    };
    a.addEventListener('error', fallback);
    a.play().catch(fallback);
    return true;
  }
  return speak(text, { rate: plan.rate });
}

// ---- 录音 ----
let recorder = null;
let chunks = [];
let stream = null;

export function canRecord() {
  return typeof navigator !== 'undefined' && !!navigator.mediaDevices?.getUserMedia
    && typeof MediaRecorder !== 'undefined';
}

function releaseMic() {
  stream?.getTracks().forEach((t) => t.stop());
  stream = null;
}

export async function startRecording() {
  if (!canRecord()) throw Object.assign(new Error('此设备不支持录音'), { reason: 'unsupported' });
  try {
    stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  } catch (e) {
    throw Object.assign(new Error('麦克风被拒绝'), { reason: 'denied' });
  }
  const opts = MediaRecorder.isTypeSupported?.('audio/mp4') ? { mimeType: 'audio/mp4' } : undefined;
  chunks = [];
  recorder = new MediaRecorder(stream, opts);
  recorder.ondataavailable = (e) => { if (e.data?.size) chunks.push(e.data); };
  recorder.start();
}

export function stopRecording() {
  return new Promise((resolve, reject) => {
    if (!recorder || recorder.state === 'inactive') {
      releaseMic();
      return reject(new Error('还没有开始录音'));
    }
    const r = recorder;
    r.onstop = () => {
      const blob = new Blob(chunks, { type: r.mimeType || 'audio/mp4' });
      recorder = null; chunks = [];
      releaseMic();
      resolve(blob);
    };
    r.stop();
  });
}
