(() => {
  const tilesContainer = document.querySelector('#tiles_container')
  const createTile = () => {
    const img = document.createElement('img')
    img.src = 'images/95.png'
    img.classList.add('tile')
    img.setAttribute('tabindex', 0)
    return img
  }
  const numberOfTiles = 16
  const tiles = Array(numberOfTiles).fill(0).map(createTile)
  tilesContainer.append(...tiles)
})()
