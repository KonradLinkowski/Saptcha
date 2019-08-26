(() => {
  'use strict'
  const tilesContainer = document.querySelector('#tiles_container')
  const tiles = []
  const verifyButton = document.querySelector('#verify_button')
  const skipButton = document.querySelector('#skip_button')
  const resetButton = document.querySelector('#reset_button')
  const objectsName = document.querySelector('#objects_name')
  const pointsCounter = document.querySelector('#points_counter')
  const installButton = document.querySelector('#install_button')

  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = 128
  const ctx = canvas.getContext('2d')

  const install = event => {
    event.prompt();
    event.userChoice
    .then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }
    });
  }

  const countUp = (curr, max, jump, pad) => {
    let sum = curr
    let next = 0
    if (max > curr) {
      pointsCounter.classList.toggle('points__counter--win', true)
      sum += jump
      next = sum > max ? max : sum
    } else {
      pointsCounter.classList.toggle('points__counter--lose', true)
      sum -= jump
      next = sum < 0 ? 0 : sum
    }
    pointsCounter.textContent = next.toString().padStart(pad, '0')
    if (next != max) {
      setTimeout(countUp, 25, next, max, jump, pad)
    } else {
      pointsCounter.classList.remove('points__counter--win', 'points__counter--lose')
    }
  }

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
    img.style.backgroundImage = 'url("images/placeholder.png")'
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
    const numberOfTiles = columnSize ** 2
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
            fun(x + randomAround(1), y + randomAround(1))
          })
        break
        case SHAPE.CIRCLE:
          ctx.arc(shape.x + randomAround(shape.r / 8), shape.y + randomAround(shape.r / 8), shape.r + randomAround(shape.r / 8), 0, Math.PI * 2)
        break
      }
      ctx.closePath()
      ctx.fill()
      ctx.fillStyle = '#000'
      ctx.stroke()
    })
    return canvas.toDataURL()
  }

  const saveRecord = () => {
    const best = localStorage.getItem('captcha_game_best_record')
      if (best < game.points) {
        localStorage.setItem('captcha_game_best_record', game.points)
      }
    localStorage.setItem('captcha_game_last_record', game.points)
  }

  const loadStorage = () => {
    const lastPoints = localStorage.getItem('captcha_game_last_record')
    if (lastPoints) {
      game.points = +lastPoints
      countUp(0, +lastPoints, 5, 5)
    } else {
      localStorage.setItem('captcha_game_last_record', game.points)
    }
    const bestRecord = localStorage.getItem('captcha_game_best_record')
    if (!bestRecord) {
      localStorage.setItem('captcha_game_best_record', game.points)
    }
  }

  const newRound = () => {
    const { shapes, expected } = game.newRound()
    tiles.forEach(({ wrapper, image, index }) => {
      selectTile(wrapper, false)
      image.style.backgroundImage = `url(${drawImage(shapes[index])})`
    })
    objectsName.textContent = `${(expected.match(/^[aeuio]/i) ? 'an' : 'a')} ${expected}`
  }

  const verifySelection = e => {
    const { won, curr, next } = game.verify(selectedTiles)
    countUp(curr, next, 1, 5)
    saveRecord()
    newRound()
  }

  const skip = e => {
    newRound()
  }

  window.addEventListener("beforeinstallprompt", e => {
    installButton.classList.toggle('hidden', false)
    installButton.addEventListener('click', () => install(e))
  })
  window.addEventListener("appinstalled", () => installButton.classList.toggle('hidden', true))
  document.addEventListener('keypress', ({ code }) => code == 'Enter' && verifyButton.click())
  verifyButton.addEventListener('click', verifySelection)
  skipButton.addEventListener('click', skip)
  resetButton.addEventListener('click', skip)
  const columns = 4
  const selectedTiles = Array(columns ** 2).fill(false)
  const game = new Game(columns ** 2, 25)
  renderGrid(columns)
  loadStorage()
  newRound()
})()
