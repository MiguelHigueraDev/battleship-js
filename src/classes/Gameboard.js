import SIZES from '../constants/sizes'
import randomUtils from '../helpers/randomUtils'

class Gameboard {
  constructor () {
    const cells = []
    for (let i = 0; i < SIZES.BOARD_SIZE; i++) {
      cells.push([])
      for (let j = 0; j < SIZES.BOARD_SIZE; j++) {
        cells[i].push({ ship: null, isHit: false, x: j, y: i })
      }
    }
    this.cells = cells
    this.placedShips = []
  }

  placeShip (ship) {
    const coordinates = randomUtils.getCoords(ship, this.cells)
    // check if shipType matches length
    if (coordinates.length !== ship.type) return 'invalid-length'
    for (const coordinate of coordinates) {
      const x = coordinate[1]
      const y = coordinate[0]
      // check if coordinates are outside of range
      if (y < 0 || y > 9) return 'invalid-coord'
      if (x < 0 || x > 9) return 'invalid-coord'
      // Check if there is already another ship placed in selected coordinates
      // If there is one try placing it in another coordinates
      if (this.cells[x][y].ship !== null) {
        return this.placeShip(ship)
      }
    }
    // All checks successfull. Push ship to board and also store it in array for areAllShipsSunk()
    for (const coordinate of coordinates) {
      this.cells[coordinate[1]][coordinate[0]].ship = ship
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
