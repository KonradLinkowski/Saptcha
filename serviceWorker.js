/* eslint-disable no-restricted-globals */
const cacheName = 'saptcha'

const preCachedFiles = [
  '',
  'index.html',
  'main.css',
  'js/shapes.js',
  'js/util.js',
  'js/main.js',
  'js/game.js',
  'images/checkmark.svg',
  'images/image.png',
  'manifest.json',
  'registerServiceWorker.js'
]

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName)
    .then(cache =>
      cache.addAll(preCachedFiles)
      .catch(error => {
        console.error('Could not cache files', error)
      })
    )
    .catch(error => {
      console.error('Could not open the cache', error)
    })
  )
})

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(matches => {
      const newData = fetch(event.request)
      .then(async response => {
        const cache = await caches.open(cacheName)
        cache.put(event.request, response.clone())
        return response
      })
      .catch(error => {
        console.error('Could not fetch', event.request, error)
      })
      return matches || newData
    })
  )
})

self.addEventListener('message', event => {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting()
  }
})
