// 离线缓存：app/ 下所有文件在安装时一次缓存好，之后优先读缓存
importScripts('precache.js', 'sw-range.js');

const CACHE = 'english-' + self.PRECACHE.version;
const FILES = self.PRECACHE.files.map((f) => './' + f);

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE).then(async (c) => {
      // 绕过浏览器自带缓存取新文件，任何一个失败就整体安装失败
      await Promise.all(FILES.map(async (f) => {
        const r = await fetch(f, { cache: 'reload' });
        if (!r.ok) throw new Error(f + ' ' + r.status);
        await c.put(f, r);
      }));
      const idx = await c.match('./index.html');
      if (idx) await c.put('./', idx.clone());
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// iOS 播放音频会带 Range 头，缓存里是整份文件，要切成 206 再给
async function rangeResponse(req, cached) {
  const buf = await cached.arrayBuffer();
  const r = self.parseRange(req.headers.get('range'), buf.byteLength);
  if (!r) {
    return new Response(null, { status: 416, headers: { 'Content-Range': `bytes */${buf.byteLength}` } });
  }
  return new Response(buf.slice(r.start, r.end + 1), {
    status: 206,
    headers: {
      'Content-Type': cached.headers.get('Content-Type') || 'audio/mp4',
      'Content-Range': `bytes ${r.start}-${r.end}/${buf.byteLength}`,
      'Content-Length': String(r.end - r.start + 1),
      'Accept-Ranges': 'bytes',
    },
  });
}

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;
  e.respondWith((async () => {
    const c = await caches.open(CACHE);
    let cached = await c.match(req, { ignoreSearch: true });
    if (!cached && req.mode === 'navigate') cached = await c.match('./index.html');
    if (!cached) return fetch(req);
    if (req.headers.has('range')) return rangeResponse(req, cached);
    return cached;
  })());
});
