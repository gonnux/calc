
const cacheName = 'calc-local';

const staticAssets = [
  './',
  './index.html',
  './js/app.js',
  './css/app.css',
  './js/materialize.min.js',
  './css/materialize.min.css',
];

self.addEventListener('install', async function () {
  const cache = await caches.open(cacheName);
  cache.addAll(staticAssets);
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);
  if (url.origin === location.origin) {
    event.respondWith(localFetch(request));
  } else {
    event.respondWith(remoteFetch(request));
  }
});

async function localFetch(request) {
  try {
    return await fetch(request)
  } catch {
    return await caches.match(request);
  }
}

async function remoteFetch(request) {
  const cache = await caches.open('calc-remote');
  try {
    const response = await fetch(request);
    cache.put(request, response.clone());
    return response;
  } catch (err) {
    console.log('remote fetch failed')
    const response = await cache.match(request);
    return response || '';
  }
}
