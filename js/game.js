/* global animals, randomInt */
class Game {
  constructor(size, reward, startingAnimals, unlockValue) {
    this.size = size
    this.reward = reward
    this.expectedObject = null
    this.points = 0
    this.round = 0
    this.images = null
    this.startingAnimals = startingAnimals
    this.unlockedCount = startingAnimals
    this.unlockValue = unlockValue
    this.unlockedAnimals = animals.slice(0, this.unlockedCount)
  }

  verify(selected) {
    const won = selected.map((e, i) => e && i).filter(e => e).join()
      === this.images.map((t, i) => t.name === this.expectedObject && i).filter(t => t).join()
    const nextPoints = this.points + this.reward * (won || -1)
    const currPoints = this.points
    this.points = nextPoints > 0 ? nextPoints : 0
    if (won
      && this.points > this.unlockValue * (this.unlockedCount - this.startingAnimals + 1)
      && this.unlockedCount < animals.length) {
      const newAnimal = animals[this.unlockedCount]
      this.unlockedAnimals.push(newAnimal)
      this.unlockedCount += 1
      return {
        curr: currPoints, next: this.points, newAnimal
      }
    }
    return {
      curr: currPoints, next: this.points
    }
  }

  newRound() {
    this.images = Array(this.size).fill(0).map(() =>
      this.unlockedAnimals[randomInt(0, this.unlockedAnimals.length)]
    )
    this.expectedObject = this.unlockedAnimals[randomInt(0, this.unlockedAnimals.length)].name
    return {
      comps: this.images.map(i => i.comps),
      expected: this.expectedObject
    }
  }
}

window.Game = Game
