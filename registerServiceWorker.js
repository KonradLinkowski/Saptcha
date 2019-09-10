(() => {
  const registerServiceWorker = () => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('serviceWorker.js')
      .then(reg => {
        reg.addEventListener('updatefound', () => {
          const newWorker = reg.installing
          newWorker.addEventListener('statechange', () => {
            switch (newWorker.state) {
              case 'installed':
                if (navigator.serviceWorker.controller) {
                  newWorker.postMessage({ action: 'skipWaiting' })
                }
                break
              default:
                break
            }
          })
        })
      })
      .catch(error => {
        console.warn('Service worker registration failed, error:', error)
      })
    }
  }
  registerServiceWorker()
})()
