class Ship {
  constructor (type) {
    this.type = type
    this.hits = 0
    this.sunk = false
  }

  hit () {
    this.hits += 1
  }

  isSunk () {
    return this.hits >= this.type
  }
}

export default Ship
