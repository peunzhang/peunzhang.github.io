/* 阿牛的速度 Service Worker
 * 策略：
 *   - HTML / 导航：网络优先（拿到最新代码），失败时走缓存（离线也能玩）
 *   - 其他静态资源（manifest / icon / svg）：缓存优先 + 后台更新
 * 升级：改 VERSION 即可强制清旧缓存。
 */
const VERSION = 'aniu-speed-2026-04-26-4';
const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon.svg'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(VERSION).then((cache) => cache.addAll(ASSETS).catch(() => {}))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const isHTML =
    req.mode === 'navigate' ||
    req.destination === 'document' ||
    (req.headers.get('accept') || '').includes('text/html');

  if (isHTML) {
    // 网络优先：永远拿最新 HTML，断网时回缓存
    event.respondWith(
      fetch(req, { cache: 'no-store' })
        .then((res) => {
          const copy = res.clone();
          caches.open(VERSION).then((c) => c.put(req, copy)).catch(() => {});
          return res;
        })
        .catch(() =>
          caches.match(req).then((r) => r || caches.match('./index.html') || caches.match('./'))
        )
    );
    return;
  }

  // 其他资源：缓存优先，后台静默更新（stale-while-revalidate）
  event.respondWith(
    caches.match(req).then((cached) => {
      const network = fetch(req)
        .then((res) => {
          if (res && res.ok) {
            const copy = res.clone();
            caches.open(VERSION).then((c) => c.put(req, copy)).catch(() => {});
          }
          return res;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});

self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
});
