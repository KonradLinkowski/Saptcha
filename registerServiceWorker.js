if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('serviceWorker.js')
  .catch(error => {
    console.log('Service worker registration failed, error:', error)
  })
}
