self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('captcha-game').then(cache => {
      return cache.addAll([
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
        'registerServiceWorker.js'
      ])
    })
  )
})

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request)
    })
  )
})
