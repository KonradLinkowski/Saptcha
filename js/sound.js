/* global ZZFX */

const soundOnButton = document.querySelector('#sound_on')
const soundOffButton = document.querySelector('#sound_off')

let musicEnabled = false

const playSound = (sound, options) => {
  if (musicEnabled && window.AudioContext) {
    ZZFX.z(sound, options)
  }
}

const Sound = {}


Sound.OPEN_MODAL = 'openModal'
Sound.CLOSE_MODAL = 'closeModal'
Sound.SELECT_TILE = 'selectTile'
Sound.UNLOCK_CAROUSEL = 'unlockCarousel'
Sound.NEW_ANIMAL = 'newAnimal'
Sound.ENABLE = 'enable'
Sound.VERIFY = 'verify'
Sound.SKIP = 'skip'

const sounds = {
  [Sound.SELECT_TILE]: [6982, { volume: 1, frequency: 99, length: 0.5 }],
  openModal: [55789, {
    volume: 1,
    frequency: 150,
    length: 0.5,
    attack: 0.4,
    slide: 0,
    modulation: 0,
    modulationPhase: 0.1
  }],
  [Sound.CLOSE_MODAL]: [77070, {
    volume: 1,
    frequency: 70,
    length: 0.5,
    attack: 0.1,
    slide: 0,
    modulationPhase: 0.1
  }],
  [Sound.NEW_ANIMAL]: [8464, { volume: 1, length: 0.5, modulation: 0 }],
  [Sound.UNLOCK_CAROUSEL]: [77070, {
    volume: 1,
    frequency: 130,
    length: 0.5,
    attack: 0.1,
    slide: 0,
    modulationPhase: 0.1
  }],
  [Sound.VERIFY]: [44781, { frequency: 99, volume: 1 }],
  [Sound.SKIP]: [76284, { volume: 1, frequency: 99, length: 0.5 }],
  [Sound.ENABLE]: [98452, {
    volume: 1, frequency: 99, length: 0.5, modulation: 0
  }]
}

Sound.play = sound => {
  playSound(...sounds[sound])
}
Sound.enableSound = enable => {
  soundOffButton.classList.toggle('undisplayed', !enable)
  soundOnButton.classList.toggle('undisplayed', enable)
  musicEnabled = enable
  localStorage.setItem('saptcha_sound_enabled', enable)
  if (enable) {
    Sound.play(Sound.ENABLE)
  }
}

const soundEnabled = localStorage.getItem('saptcha_sound_enabled') === 'true'
Sound.enableSound(soundEnabled)

soundOffButton.addEventListener('click', () => Sound.enableSound(false))
soundOnButton.addEventListener('click', () => Sound.enableSound(true))

window.Sound = Sound
