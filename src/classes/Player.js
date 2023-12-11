import shipTypes from '../constants/shipTypes'
import Gameboard from './Gameboard'
import Ship from './Ship'

class Player {
  constructor () {
    this.id = crypto.randomUUID()
    this.board = new Gameboard()
    this.ships = this.createFleet()
    this.placeDefaultShips()
  }

  createFleet () {
    const carrier = new Ship(shipTypes.CARRIER)
    const battleship = new Ship(shipTypes.BATTLESHIP)
    const cruiser = new Ship(shipTypes.CRUISER)
    const submarine1 = new Ship(shipTypes.SUBMARINE)
    const submarine2 = new Ship(shipTypes.SUBMARINE)
    return [carrier, battleship, cruiser, submarine1, submarine2]
  }

  attack (x, y, enemyBoard) {
    // Check if cell was hit before
    if (enemyBoard.checkIfCellIsHit(x, y)) return
    enemyBoard.receiveAttack(x, y)
  }

  placeDefaultShips () {
    this.board.placeShip(this.ships[0], [[1, 5], [2, 5], [3, 5], [4, 5], [5, 5]])
    this.board.placeShip(this.ships[1], [[1, 8], [2, 8], [3, 8], [4, 8]])
    this.board.placeShip(this.ships[2], [[7, 5], [7, 6], [7, 7]])
    this.board.placeShip(this.ships[3], [[1, 1], [1, 2]])
    this.board.placeShip(this.ships[4], [[5, 2], [6, 2]])
  }

  placeRandomShips () {

  }
}

export default Player
