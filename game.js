class Game {
  constructor(size, reward) {
    this.size = size
    this.reward = reward
    this.expectedObject = null
    this.points = 0
    this.round = 0
    this.images = null
  }

  verify(selected) {
    const won = selected.map((e, i) => e && i).filter(e => e).join()
      == this.images.map((t, i) => t.name === this.expectedObject && i).filter(t => t).join()
      const nextPoints = this.points + this.reward * (won || -1)
    return {
      won, curr: this.points, next: this.points = nextPoints > 0 ? nextPoints : 0
    }
  }

  newRound() {
    this.images = Array(this.size).fill(0).map(() => shapes[randomInt(0, shapes.length)])
    this.expectedObject = shapes[randomInt(0, shapes.length)].name
    return {
      shapes: this.images.map(i => i.value),
      expected: this.expectedObject
    }
  }
}