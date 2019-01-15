const staticAssets = [
  './',
  './index.html',
  './js/app.js',
  './css/app.css',
  './js/materialize.min.js',
  './css/materialize.min.css',
]

self.addEventListener('install', async function () {
  const cache = await caches.open('calc')
  cache.addAll(staticAssets)
})

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim())
})

self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url)
  event.respondWith(cachingFetch(request))
})

async function cachingFetch(request) {
  const cache = await caches.open('calc');
  try {
    const response = await fetch(request)
    cache.put(request, response.clone())
    return response
  } catch(err) {
    console.log(err)
    return await caches.match(request)
  }
}
