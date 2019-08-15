(() => {
  'use strict'
  const tilesContainer = document.querySelector('#tiles_container')
  const selectTile = e => {
    e.currentTarget.classList.toggle('tile--selected')
  }
  const createTile = (col, index) => {
    const wrapper = document.createElement('div')
    const img = document.createElement('div')
    wrapper.appendChild(img)
    img.style.backgroundImage = 'url("images/95.png")'
    img.classList.add('tile__image')
    wrapper.classList.add('tile')
    wrapper.setAttribute('tabindex', 0)
    wrapper.addEventListener('click', selectTile)
    wrapper.dataset['index'] = index
    return wrapper
  }

  const renderGrid = columnSize => {
    const numberOfTiles = columnSize ** 2;
    const tiles = Array(numberOfTiles).fill((Math.sqrt(numberOfTiles))).map(createTile)
    tilesContainer.append(...tiles)
    const availableSizes = [3, 4]
    availableSizes.forEach(size => tilesContainer.classList.toggle(`tiles_container--${size}`, columnSize == size))
  }
  renderGrid(4)
})()
