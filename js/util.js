const randomInt = (min, max) => Math.floor(Math.random() * (max - min) + min)
const randomAround = value => Math.floor(Math.random() * 2 * value - value)
const randomColor = () => ((min, max) => `rgb(${randomInt(min, max)} ${randomInt(min, max)} ${randomInt(min, max)})`)(0, 256)

window.randomInt = randomInt
window.randomAround = randomAround
window.randomColor = randomColor
