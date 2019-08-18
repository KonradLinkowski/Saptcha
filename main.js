(() => {
  'use strict'
  const tilesContainer = document.querySelector('#tiles_container')
  const tiles = []
  const verifyButton = document.querySelector('#verify_button')
  const skipButton = document.querySelector('#skip_button')
  const resetButton = document.querySelector('#reset_button')
  const objectsName = document.querySelector('#objects_name')
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = 64
  const ctx = canvas.getContext('2d')

  const selectTile = (el, value) => {
    selectedTiles[el.dataset.index] = el.classList.toggle('tile--selected', value)
    el.setAttribute('aria-checked', value)
    const someTilesSelected = selectedTiles.some(e => e)
    verifyButton.classList.toggle('hidden', !someTilesSelected)
    skipButton.classList.toggle('hidden', someTilesSelected)
  }

  const onSelectTile = e => {
    selectTile(e.currentTarget)
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
    wrapper.addEventListener('click', onSelectTile)
    wrapper.addEventListener('keypress', e => e.code == 'Space' && onSelectTile(e))
    wrapper.dataset.index = index
    tiles.push({
      wrapper,
      image: img,
      index
    })
    return wrapper
  }

  const renderGrid = columnSize => {
    const numberOfTiles = columnSize ** 2;
    const tiles = Array(numberOfTiles).fill((Math.sqrt(numberOfTiles))).map(createTile)
    tilesContainer.append(...tiles)
    const availableSizes = [3, 4]
    availableSizes.forEach(size => tilesContainer.classList.toggle(`tiles_container--${size}`, columnSize == size))
  }

  const drawImage = shapes => {
    ctx.fillStyle = '#eee'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    shapes.forEach(shape => {
      ctx.beginPath()
      ctx.fillStyle = randomColor()
      switch (shape.t) {
        case SHAPE.POLYGON:
          shape.p.forEach(([x, y], i) => {
            const fun = i == 0 ? ctx.moveTo.bind(ctx) : ctx.lineTo.bind(ctx)
            fun(x, y)
          })
        break
        case SHAPE.CIRCLE:
          ctx.arc(shape.x + randomInt(-5, 5), shape.y + randomInt(-5, 5), shape.r + randomInt(-2, 2), 0, Math.PI * 2)
        break
      }
      ctx.closePath()
      ctx.fill()
      ctx.fillStyle = '#000'
      ctx.stroke()
    })
    return canvas.toDataURL()
  }

  const newRound = () => {
    const { shapes, expected } = game.newRound()
    tiles.forEach(({ wrapper, image, index }) => {
      selectTile(wrapper, false)
      image.style.backgroundImage = `url(${drawImage(shapes[index])})`
    })
    objectsName.textContent = expected
  }

  const verifySelection = e => {
    const won = game.verify(selectedTiles)
    alert(won ? 'Won': 'Lose')
    newRound()
  }

  const skip = e => {
    newRound()
  }

  document.addEventListener('keypress', ({ code }) => code == 'Enter' && verifyButton.click())
  verifyButton.addEventListener('click', verifySelection)
  skipButton.addEventListener('click', skip)
  resetButton.addEventListener('click', skip)
  const columns = 4
  const selectedTiles = Array(columns ** 2).fill(false)
  const game = new Game(columns ** 2, 10)
  renderGrid(columns);
  newRound()
})()
