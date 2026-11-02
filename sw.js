'use strict';
const CACHE = 'jarce-offline-v1.1.0';
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.add('/offline.html')));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(
    keys.filter(key => key.startsWith('jarce-offline-') && key !== CACHE).map(key => caches.delete(key))
  )));
});
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  // Never intercept media, range requests, external requests or assets.
  if (event.request.method !== 'GET' || url.origin !== self.location.origin || event.request.mode !== 'navigate') return;
  event.respondWith(fetch(event.request).catch(async () => {
    return (await caches.match('/offline.html')) || new Response('Signal lost. Reconnect to continue.', {status:503,headers:{'Content-Type':'text/plain; charset=utf-8'}});
  }));
});
