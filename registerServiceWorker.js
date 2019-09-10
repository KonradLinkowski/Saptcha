(() => {
  const randomId = Math.random().toString(36).substr(2, 9)
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
  const isAppOpen = localStorage.getItem('saptcha_open')
  const text = document.querySelector('.loaded-container')
  if (isAppOpen && isAppOpen !== randomId) {
    text.classList.toggle('undisplayed', false)
  } else {
    localStorage.setItem('saptcha_open', randomId)
    registerServiceWorker()
  }
  window.addEventListener('beforeunload', () => {
    const isAppStillOpen = localStorage.getItem('saptcha_open')
    if (isAppStillOpen && isAppStillOpen === randomId) {
      localStorage.removeItem('saptcha_open')
      return 'Are you sure you want to leave?'
    }
    return null
  })
})()
