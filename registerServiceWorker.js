(() => {
  const randomId = Math.random().toString(36).substr(2, 9)
  const registerServiceWorker = () => {
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
  }
  const isAppOpen = localStorage.getItem('captcha_game_open')
  const text = document.querySelector('.loaded-container')
  if (isAppOpen && isAppOpen !== randomId) {
    text.classList.toggle('undisplayed', false)
  } else {
    localStorage.setItem('captcha_game_open', randomId)
    registerServiceWorker()
  }
  window.addEventListener('beforeunload', () => {
    const isAppOpen = localStorage.getItem('captcha_game_open')
    if (isAppOpen && isAppOpen === randomId) {
      localStorage.removeItem('captcha_game_open')
      return 'Are you sure you want to leave?'
    }
    return null
  })
})()
