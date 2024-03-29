/* global Game, randomAround, shuffle, throttle, clamp, ZZFX */

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
  let game = null

  let musicEnabled = false

  const winScore = 35
  const loseScore = 25

  const pointsCounter = document.querySelector('#points_counter')
  const mainWindow = document.querySelector('#main_window')
  const modal = document.querySelector('#modal')

  const bestScore = document.querySelector('#best-score')
  const winText = document.querySelector('#win-text')
  const loseText = document.querySelector('#lose-text')
  const winArrow = document.querySelector('#win-arrow')
  const loseArrow = document.querySelector('#lose-arrow')

  const playSound = (sound, options) => {
    if (musicEnabled && window.AudioContext) {
      ZZFX.z(sound, options)
    }
  }

  const openModal = (open, force = false) => {
    if (!force) {
      if (open) {
        playSound(55789, {
          volume: 1,
          frequency: 150,
          length: 0.5,
          attack: 0.4,
          slide: 0,
          modulation: 0,
          modulationPhase: 0.1
        })
      } else {
        playSound(77070, {
          volume: 1,
          frequency: 70,
          length: 0.5,
          attack: 0.1,
          slide: 0,
          modulationPhase: 0.1
        })
      }
    }
    winText.textContent = winScore
    loseText.textContent = loseScore
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
      winArrow.classList.toggle('undisplayed', false)
      sum += jump
      next = sum > max ? max : sum
    } else {
      pointsCounter.classList.toggle('lose', true)
      loseArrow.classList.toggle('undisplayed', false)
      sum -= jump
      next = sum < 0 ? 0 : sum
    }
    pointsCounter.textContent = next.toString().padStart(pad, '0')
    if (next !== max) {
      setTimeout(countUp, 45, next, max, jump, pad)
    } else {
      winArrow.classList.toggle('undisplayed', true)
      loseArrow.classList.toggle('undisplayed', true)
      pointsCounter.classList.remove('win', 'lose')
    }
  }

  const updateBestRecord = () => {
    const bestRecord = Number(localStorage.getItem('saptcha_best_record'))
    const newBestRecord = game.points > bestRecord ? game.points : bestRecord
    localStorage.setItem('saptcha_best_record', newBestRecord)
    bestScore.textContent = bestRecord.toString().padStart(5, '0')
  }

  const loadStorage = () => {
    const unlockedAnimals = localStorage.getItem('saptcha_unlocked_animals')
    let animalsCount = 3
    if (unlockedAnimals) {
      animalsCount = Number(unlockedAnimals)
    } else {
      localStorage.setItem('saptcha_unlocked_animals', 3)
    }
    game = new Game(columns ** 2, winScore, loseScore, animalsCount, 3, 100)
    const isFirstTime = !localStorage.getItem('saptcha_first_time')
    if (isFirstTime) {
      openModal(true, true)
    }
    const lastPoints = localStorage.getItem('saptcha_last_record')
    if (lastPoints) {
      game.points = +lastPoints
      countUp(0, +lastPoints, 26, 5)
    } else {
      localStorage.setItem('saptcha_last_record', game.points)
    }
    updateBestRecord()
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
  const closeButton = document.querySelector('#close_button')
  const unlockCloseButton = document.querySelector('#unlock_close_button')
  const unlockModal = document.querySelector('#unlock_modal')
  const unlockImage = document.querySelector('#unlock_image')
  const unlockName = document.querySelector('#unlock_name')
  const unlockContinueButton = document.querySelector('#unlock_continue')
  const soundOnButton = document.querySelector('#sound_on')
  const soundOffButton = document.querySelector('#sound_off')

  let unlockInterval = null

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
    playSound(6982, { volume: 1, frequency: 99, length: 0.5 })
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
          if (shape.length === 3) {
            const [x, y, r] = shape
            ctx.arc(
              clamp(x + randomAround(r / 8), 0, 128),
              clamp(y + randomAround(r / 8), 0, 128),
              clamp(r + randomAround(r / 8), 0, 128),
              0, Math.PI * 2
            )
          } else {
            const [x, y, rX, rY, a] = shape
            const m = Math.min(rX, rY)
            ctx.ellipse(
              clamp(x + randomAround(m / 8), 0, 128),
              clamp(y + randomAround(m / 8), 0, 128),
              clamp(rX + randomAround(m / 8), 0, 128),
              clamp(rY + randomAround(m / 8), 0, 128),
              (a + randomAround(5)) * (Math.PI / 180),
              0, Math.PI * 2
            )
          }
        } else {
          shape.forEach(([x, y], i) => {
            const fun = i === 0 ? ctx.moveTo.bind(ctx) : ctx.lineTo.bind(ctx)
            fun(x + randomAround(4), y + randomAround(2))
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

  const openUnlockModal = (open, name, comp) => {
    if (!open) {
      playSound(77070, {
        volume: 1,
        frequency: 70,
        length: 0.5,
        attack: 0.1,
        slide: 0,
        modulationPhase: 0.1
      })
      unlockModal.classList.toggle('hidden', true)
      clearInterval(unlockInterval)
      unlockInterval = null
      return
    }
    playSound(8464, { volume: 1, length: 0.5, modulation: 0 })
    unlockModal.classList.toggle('hidden', false)
    const genImage = () => {
      unlockImage.style.backgroundImage = `url(${drawImage(comp)})`
      unlockName.textContent = `${(name.match(/^[aeiou]/i) ? 'an' : 'a')} ${name}`
      playSound(77070, {
        volume: 1,
        frequency: 130,
        length: 0.5,
        attack: 0.1,
        slide: 0,
        modulationPhase: 0.1
      })
    }
    genImage()
    unlockInterval = setInterval(genImage, 500)
  }

  const saveRecord = () => {
    const best = localStorage.getItem('saptcha_best_record')
    if (best < game.points) {
      localStorage.setItem('saptcha_best_record', game.points)
    }
    localStorage.setItem('saptcha_last_record', game.points)
    localStorage.setItem('saptcha_unlocked_animals', game.unlockedCount)
    updateBestRecord()
  }

  const newRound = () => {
    const { comps, expected } = game.newRound()
    const fullName = `${(expected.match(/^[aeiou]/i) ? 'an' : 'a')} ${expected}`
    tiles.forEach(({ wrapper, image, index }) => {
      selectTile(wrapper, false)
      // eslint-disable-next-line no-param-reassign
      image.style.backgroundImage = `url(${drawImage(comps[index])})`
    })
    objectsName.textContent = fullName
  }

  const enableSoundButtons = () => {
    soundOnButton.removeAttribute('disabled')
  }

  const verifySelection = () => {
    playSound(44781, { frequency: 99, volume: 1 })
    const { curr, next, newAnimal } = game.verify(selectedTiles)
    countUp(curr, next, 1, 5)
    saveRecord()
    if (newAnimal) {
      openUnlockModal(true, newAnimal.name, newAnimal.comps)
    }
    newRound()
  }

  const skip = () => {
    playSound(76284, { volume: 1, frequency: 99, length: 0.5 })
    newRound()
  }

  const enableMusic = (turnOn, force = false) => {
    soundOffButton.classList.toggle('undisplayed', !turnOn)
    soundOnButton.classList.toggle('undisplayed', turnOn)
    musicEnabled = turnOn
    localStorage.setItem('saptcha_sound_enabled', turnOn)
    if (turnOn && !force) {
      playSound(98452, {
        volume: 1, frequency: 99, length: 0.5, modulation: 0
      })
    }
  }

  const enableSound = () => {
    const soundEnabled = Boolean(localStorage.getItem('saptcha_sound_enabled'))
    enableMusic(soundEnabled, true)
    enableSoundButtons()
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
    installButton.classList.toggle('hidden', false)
    installButton.addEventListener('click', () => install(e))
  })
  window.addEventListener('appinstalled', () => installButton.classList.toggle('hidden', true))
  window.addEventListener('keydown', handleKeyboard)
  verifyButton.addEventListener('click', verifySelection)
  skipButton.addEventListener('click', throttle(skip, 250))
  resetButton.addEventListener('click', throttle(skip, 250))
  infoButton.addEventListener('click', () => openModal(true))
  closeButton.addEventListener('click', () => openModal(false))
  unlockCloseButton.addEventListener('click', () => openUnlockModal(false))
  unlockContinueButton.addEventListener('click', () => openUnlockModal(false))
  soundOffButton.addEventListener('click', () => enableMusic(false))
  soundOnButton.addEventListener('click', () => enableMusic(true))
  enableSound()

  renderGrid(columns)
  newRound()
})()
