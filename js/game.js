/* global animals, randomInt, clamp */
class Game {
  constructor(size, reward, penalty, animalsCount, startingAnimals, unlockValue) {
    this.size = size
    this.reward = reward
    this.penalty = penalty
    this.expectedObject = null
    this.points = 0
    this.round = 0
    this.images = null
    this.startingAnimals = startingAnimals
    this.unlockedCount = animalsCount
    this.unlockValue = unlockValue
    this.unlockedAnimals = animals.slice(0, this.unlockedCount)
  }

  verify(selected) {
    const won = selected.map((e, i) => e && i).filter(e => e).join()
      === this.images.map((t, i) => t.name === this.expectedObject && i).filter(t => t).join()
    const currPoints = this.points
    if (won) {
      this.points = this.points + this.reward
      if (this.points >= this.unlockValue * (this.unlockedCount - this.startingAnimals + 1)
        && this.unlockedCount < animals.length) {
        const newAnimal = animals[this.unlockedCount]
        this.unlockedAnimals.push(newAnimal)
        this.unlockedCount += 1
        return {
          curr: currPoints, next: this.points, newAnimal
        }
      }
    }
    this.points = clamp(this.points + this.penalty, 0, Number.MAX_SAFE_INTEGER)
    return {
      curr: currPoints, next: this.points
    }
  }

  newRound() {
    this.images = Array(this.size).fill(0).map(() =>
      this.unlockedAnimals[randomInt(0, this.unlockedAnimals.length)]
    )
    this.expectedObject = this.images[randomInt(0, this.images.length)].name
    return {
      comps: this.images.map(i => i.comps),
      expected: this.expectedObject
    }
  }
}

window.Game = Game
