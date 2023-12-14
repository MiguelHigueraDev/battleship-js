import SIZES from '../constants/sizes'
import randomUtils from '../helpers/randomUtils'
import Ship from './Ship'

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

  autoPlaceShip (ship) {
    const coordinates = randomUtils.getCoords(ship, this.cells)
    for (const coordinate of coordinates) {
      const x = coordinate[1]
      const y = coordinate[0]
      // If there is a ship placed here one try placing it in other coordinates
      if (this.cells[x][y].ship !== null) {
        return this.autoPlaceShip(ship)
      }
      // Also check if there are directly adjacent ships, make sure there is at least 1 space between each ship
      // Cardinal directions
      if (y + 1 <= 9) if (this.cells[x][y + 1].ship !== null) return this.autoPlaceShip(ship)
      if (y - 1 >= 0) if (this.cells[x][y - 1].ship !== null) return this.autoPlaceShip(ship)
      if (x + 1 <= 9) if (this.cells[x + 1][y].ship !== null) return this.autoPlaceShip(ship)
      if (x - 1 >= 0) if (this.cells[x - 1][y].ship !== null) return this.autoPlaceShip(ship)
      // Diagonals
      if (y + 1 <= 9 && x - 1 >= 0) if (this.cells[x - 1][y + 1].ship !== null) return this.autoPlaceShip(ship) // NW
      if (y + 1 <= 9 && x + 1 <= 9) if (this.cells[x + 1][y + 1].ship !== null) return this.autoPlaceShip(ship) // NE
      if (y - 1 >= 0 && x - 1 >= 0) if (this.cells[x - 1][y - 1].ship !== null) return this.autoPlaceShip(ship) // SW
      if (y - 1 >= 0 && x + 1 <= 9) if (this.cells[x + 1][y - 1].ship !== null) return this.autoPlaceShip(ship) // SE
    }
    // Check successful. Push ship to board and also store it in array for areAllShipsSunk()
    for (const coordinate of coordinates) {
      this.cells[coordinate[1]][coordinate[0]].ship = ship
    }
    this.placedShips.push(ship)
    return true
  }

  placeShips (coords) {
    // Create ships
    for (const coord of coords) {
      const ship = new Ship(coord[0])
      for (const co of coord[3]) {
        this.cells[co[1]][co[0]].ship = ship
      }
      this.placedShips.push(ship)
    }
  }

  checkIfCellIsHit (x, y) {
    return this.cells[x][y].isHit
  }

  receiveAttack (x, y) {
    if (this.cells[x][y].isHit) return 'retry'
    this.cells[x][y].isHit = true

    if (this.cells[x][y].ship !== null) {
      this.cells[x][y].ship.hit()
      if (this.cells[x][y].ship.isSunk()) {
        this.cells[x][y].ship.sunk = true
        return 'sunk'
      } else {
        return 'hit'
      }
    } else {
      return 'miss'
    }
  }

  areAllShipsSunk () {
    return this.placedShips.every(ship => ship.isSunk())
  }
}

export default Gameboard
