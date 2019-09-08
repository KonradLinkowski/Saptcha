(() => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('serviceWorker.js')
    .then(reg => {
      reg.addEventListener('updatefound', () => {
        newWorker = reg.installing
        newWorker.addEventListener('statechange', () => {
          switch (newWorker.state) {
            case 'installed':
              if (navigator.serviceWorker.controller) {
                newWorker.postMessage({ action: 'skipWaiting' })
              }
              break;
          }
        })
      })
    })
    .catch(error => {
      console.error('Service worker registration failed, error:', error)
    })
  }
})()
