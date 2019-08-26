const cacheName = 'captcha-game'

const preCachedFiles = [
  '',
  'index.html',
  'main.css',
  'shapes.js',
  'util.js',
  'main.js',
  'game.js',
  'images/checkmark.svg',
  'images/placeholder.png',
  'manifest.json',
  'registerServiceWorker.js',
  'serviceWorker.js'
]

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(preCachedFiles)
    }).catch(error => {
      console.log('Could not open the cache', error)
    })
  )
})

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      console.log('[Service Worker] Fetching resource:', event.request.url)
      return response || fetch(event.request).then(async response => {
        const cache = await caches.open(cacheName)
        console.log('[Service Worker] Caching new resource:', event.request.url)
        cache.put(event.request, response.clone())
        return response
      }).catch(error => {
        console.log('Could not fetch', event.request, error)
      })
    })
  )
})
