class Gameboard {
  constructor (size = 10) {
    const cells = []
    for (let i = 0; i < size; i++) {
      cells.push([])
      for (let j = 0; j < size; j++) {
        cells[i].push({ ship: null, isHit: false, x: i, y: j })
      }
    }
    this.cells = cells
    this.placedShips = []
  }

  placeShip (ship, coordinates) {
    // check if shipType matches length
    if (coordinates.length !== ship.type) return 'invalid-length'
    for (const coordinate of coordinates) {
      // check if coordinates are outside of range
      if (coordinate[0] < 0 || coordinate[0] > 9) return 'invalid-coord'
      if (coordinate[1] < 0 || coordinate[1] > 9) return 'invalid-coord'
      // Check if there is already another ship placed in selected coordinates
      if (this.cells[coordinate[0]][coordinate[1]].ship !== null) return 'already-placed'
    }
    // All checks successfull. Push ship to board and also store it in array for areAllShipsSunk()
    for (const coordinate of coordinates) {
      this.cells[coordinate[0]][coordinate[1]].ship = ship
    }
    this.placedShips.push(ship)
    return true
  }

  checkIfCellIsHit (x, y) {
    return this.cells[x][y].isHit
  }

  receiveAttack (x, y) {
    // Check if coordinates were already attacked
    if (this.cells[x][y].isHit === false) this.cells[x][y].isHit = true

    if (this.cells[x][y].ship !== null) {
      this.cells[x][y].ship.hit()
      if (this.cells[x][y].ship.isSunk()) this.cells[x][y].ship.sunk = true
      this.cells[x][y].isHit = true
    }
  }

  areAllShipsSunk () {
    return this.placedShips.every(ship => ship.isSunk())
  }
}

export default Gameboard
