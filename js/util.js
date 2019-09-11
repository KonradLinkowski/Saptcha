const randomInt = (min, max) => Math.floor(Math.random() * (max - min) + min)
const randomAround = value => Math.floor(Math.random() * 2 * value - value)
const randomColor = () => ((min, max) => `rgb(${randomInt(min, max)} ${randomInt(min, max)} ${randomInt(min, max)})`)(0, 256)
const shuffle = array => {
  const newArray = [...array]
  for (let i = 0; i < newArray.length - 2; i += 1) {
    const j = randomInt(i, newArray.length)
    const temp = newArray[i]
    newArray[i] = newArray[j]
    newArray[j] = temp
  }
  return newArray
}
window.randomInt = randomInt
window.randomAround = randomAround
window.randomColor = randomColor
window.shuffle = shuffle
