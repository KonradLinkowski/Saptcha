/* global Game, randomAround, shuffle, throttle */

(() => {
  'use strict'

  const canvas = document.createElement('canvas')
  canvas.width = 128
  canvas.height = 128
  const ctx = canvas.getContext('2d')

  const colors = [
    '#ef4040', '#40ef40', '#4040ef', '#efef40', '#ef40ef', '#40efef',
    '#ef8000', '#80ef40', '#8040ef', '#efef80', '#ef80ef', '#80efef',
    '#ef4080', '#40ef80', '#4080ef', '#ef8080', '#80ef80', '#8080ef'
  ]
  const columns = 4
  const selectedTiles = Array(columns ** 2).fill(false)
  const game = new Game(columns ** 2, 25)

  const pointsCounter = document.querySelector('#points_counter')
  const mainWindow = document.querySelector('#main_window')
  const modal = document.querySelector('#modal')

  const openModal = open => {
    modal.classList.toggle('hidden', !open)
    mainWindow.classList.toggle('covered', open)
    const isFirstTime = !localStorage.getItem('saptcha_first_time')
    if (isFirstTime) {
      localStorage.setItem('saptcha_first_time', new Date().toString())
    }
  }

  const countUp = (curr, max, jump, pad) => {
    let sum = curr
    let next = 0
    if (max > curr) {
      pointsCounter.classList.toggle('win', true)
      sum += jump
      next = sum > max ? max : sum
    } else {
      pointsCounter.classList.toggle('lose', true)
      sum -= jump
      next = sum < 0 ? 0 : sum
    }
    pointsCounter.textContent = next.toString().padStart(pad, '0')
    if (next !== max) {
      setTimeout(countUp, 25, next, max, jump, pad)
    } else {
      pointsCounter.classList.remove('win', 'lose')
    }
  }

  const loadStorage = () => {
    const isFirstTime = !localStorage.getItem('saptcha_first_time')
    if (isFirstTime) {
      openModal(true)
    }
    const lastPoints = localStorage.getItem('saptcha_last_record')
    if (lastPoints) {
      game.points = +lastPoints
      countUp(0, +lastPoints, 5, 5)
    } else {
      localStorage.setItem('saptcha_last_record', game.points)
    }
    const bestRecord = localStorage.getItem('saptcha_best_record')
    if (!bestRecord) {
      localStorage.setItem('saptcha_best_record', game.points)
    }
  }

  loadStorage()
  const tilesContainer = document.querySelector('#tiles_container')
  const tiles = []
  const verifyButton = document.querySelector('#verify_button')
  const skipButton = document.querySelector('#skip_button')
  const resetButton = document.querySelector('#reset_button')
  const objectsName = document.querySelector('#objects_name')
  const installButton = document.querySelector('#install_button')
  const infoButton = document.querySelector('#info_button')
  const clsoeButton = document.querySelector('#close_button')

  const install = event => {
    event.prompt()
    event.userChoice
    .then(choiceResult => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt')
      } else {
        console.log('User dismissed the A2HS prompt')
      }
    })
  }

  const selectTile = (el, value) => {
    selectedTiles[el.dataset.index] = el.classList.toggle('tile--selected', value)
    el.setAttribute('aria-checked', value)
    const someTilesSelected = selectedTiles.some(e => e)
    verifyButton.classList.toggle('undisplayed', !someTilesSelected)
    skipButton.classList.toggle('undisplayed', someTilesSelected)
  }

  const onSelectTile = e => {
    selectTile(e.currentTarget)
  }

  const createTile = (col, index) => {
    const wrapper = document.createElement('div')
    const img = document.createElement('div')
    wrapper.appendChild(img)
    img.style.backgroundImage = 'url("images/image.png")'
    img.classList.add('tile__image')
    wrapper.classList.add('tile')
    wrapper.setAttribute('aria-checked', 'false')
    wrapper.setAttribute('role', 'checkbox')
    wrapper.setAttribute('tabindex', 0)
    wrapper.addEventListener('click', onSelectTile)
    wrapper.addEventListener('keypress', e => e.code === 'Space' && onSelectTile(e))
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
    const tileElements = Array(numberOfTiles).fill((Math.sqrt(numberOfTiles))).map(createTile)
    tilesContainer.append(...tileElements)
    const availableSizes = [3, 4]
    availableSizes.forEach(size => tilesContainer.classList.toggle(`tiles_container--${size}`, columnSize === size))
  }

  const drawImage = components => {
    const shuffled = shuffle(colors)
    let colorIndex = 0
    ctx.fillStyle = '#eee'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    components.forEach(comp => {
      comp.forEach(shape => {
        ctx.beginPath()
        ctx.fillStyle = shuffled[colorIndex % shuffled.length]
        if (typeof shape[0] === 'number') {
          const [x, y, r] = shape
          ctx.arc(
            x + randomAround(r / 8),
            y + randomAround(r / 8),
            r + randomAround(r / 8),
            0, Math.PI * 2
          )
        } else {
          shape.forEach(([x, y], i) => {
            const fun = i === 0 ? ctx.moveTo.bind(ctx) : ctx.lineTo.bind(ctx)
            fun(x + randomAround(1), y + randomAround(1))
          })
        }
        ctx.closePath()
        ctx.fill()
        ctx.fillStyle = '#000'
        ctx.stroke()
        colorIndex += 1
      })
    })
    return canvas.toDataURL()
  }

  const saveRecord = () => {
    const best = localStorage.getItem('saptcha_best_record')
    if (best < game.points) {
      localStorage.setItem('saptcha_best_record', game.points)
    }
    localStorage.setItem('saptcha_last_record', game.points)
  }

  const newRound = () => {
    const { comps, expected } = game.newRound()
    tiles.forEach(({ wrapper, image, index }) => {
      selectTile(wrapper, false)
      // eslint-disable-next-line no-param-reassign
      image.style.backgroundImage = `url(${drawImage(comps[index])})`
    })
    objectsName.textContent = `${(expected.match(/^[aeiou]/i) ? 'an' : 'a')} ${expected}`
  }

  const verifySelection = () => {
    const { curr, next } = game.verify(selectedTiles)
    countUp(curr, next, 1, 5)
    saveRecord()
    newRound()
  }

  const skip = () => {
    newRound()
  }

  const moveToOtherTile = jump => {
    const index = Number(document.activeElement.dataset.index)
    const newIndex = (index + jump + tiles.length) % tiles.length || 0
    tiles.find(({ wrapper }) => Number(wrapper.dataset.index) === newIndex).wrapper.focus()
  }

  const handleKeyboard = ({ code }) => {
    switch (code) {
      case 'Enter':
        verifyButton.click()
        break
      case 'ArrowUp':
      case 'KeyW':
        moveToOtherTile(-columns)
        break
      case 'ArrowRight':
      case 'KeyD':
        moveToOtherTile(+1)
        break
      case 'ArrowDown':
      case 'KeyS':
        moveToOtherTile(+columns)
        break
      case 'ArrowLeft':
      case 'KeyA':
        moveToOtherTile(-1)
        break
      default:
        break
    }
  }

  window.addEventListener('beforeinstallprompt', e => {
    installButton.classList.toggle('undisplayed', false)
    installButton.addEventListener('click', () => install(e))
  })
  window.addEventListener('appinstalled', () => installButton.classList.toggle('undisplayed', true))
  window.addEventListener('keydown', handleKeyboard)
  verifyButton.addEventListener('click', verifySelection)
  skipButton.addEventListener('click', throttle(skip, 250))
  resetButton.addEventListener('click', throttle(skip, 250))
  infoButton.addEventListener('click', () => openModal(true))
  clsoeButton.addEventListener('click', () => openModal(false))
  renderGrid(columns)
  newRound()
})()
