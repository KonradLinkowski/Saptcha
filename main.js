(() => {
  'use strict'
  const tilesContainer = document.querySelector('#tiles_container')
  const selectTile = e => {
    e.currentTarget.classList.toggle('tile--selected')
  }
  const createTile = () => {
    const wrapper = document.createElement('div')
    const img = document.createElement('div')
    wrapper.appendChild(img)
    img.style.backgroundImage = 'url("images/95.png")'
    img.classList.add('tile__image')
    wrapper.classList.add('tile')
    wrapper.classList.add('tile--4')
    wrapper.setAttribute('tabindex', 0)
    wrapper.addEventListener('click', selectTile)
    return wrapper
  }
  const numberOfTiles = 16
  const tiles = Array(numberOfTiles).fill(0).map(createTile)
  tilesContainer.append(...tiles)
})()
