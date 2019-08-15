(() => {
  'use strict'
  const tilesContainer = document.querySelector('#tiles_container')
  const verifyButton = document.querySelector('#verify_button')

  const selectTile = e => {
    const el = e.currentTarget
    selectedTiles[el.dataset.index] = el.classList.toggle('tile--selected')
    el.setAttribute('aria-checked', selectedTiles[el.dataset.index])
    verifyButton.textContent = selectedTiles.some(e => e) ? 'Verify' : 'Skip'
  }

  const createTile = (col, index) => {
    const wrapper = document.createElement('div')
    const img = document.createElement('div')
    wrapper.appendChild(img)
    img.style.backgroundImage = 'url("images/95.png")'
    img.classList.add('tile__image')
    wrapper.classList.add('tile')
    wrapper.setAttribute('aria-checked', 'false')
    wrapper.setAttribute('role', 'checkbox')
    wrapper.setAttribute('tabindex', 0)
    wrapper.addEventListener('click', selectTile)
    wrapper.addEventListener('keypress', e => e.code == 'Space' && selectTile(e))
    wrapper.dataset.index = index
    return wrapper
  }

  const renderGrid = columnSize => {
    const numberOfTiles = columnSize ** 2;
    const tiles = Array(numberOfTiles).fill((Math.sqrt(numberOfTiles))).map(createTile)
    tilesContainer.append(...tiles)
    const availableSizes = [3, 4]
    availableSizes.forEach(size => tilesContainer.classList.toggle(`tiles_container--${size}`, columnSize == size))
  }

  const verifySelection = e => {
    console.log(`Selected ${selectedTiles.map((e, i) => e && i).filter(e => e)}`)
  }

  document.addEventListener('keypress', ({ code }) => code == 'Enter' && verifyButton.click())
  verifyButton.addEventListener('click', verifySelection)
  const columns = 4
  const selectedTiles = Array(columns ** 2).fill(false)
  renderGrid(columns)
})()
