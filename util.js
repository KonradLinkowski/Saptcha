const randomInt = (min, max) => Math.floor(Math.random() * (max - min) + min)
// const randomColor = () => ['#f00', '#0f0', '#00f', '#ff0', '#f0f', '#0ff', '#fff' ][Math.floor(Math.random() * 6)]
const randomColor = () => ((min, max) => `rgb(${randomInt(min, max)} ${randomInt(min, max)} ${randomInt(min, max)})`)(0, 256)
