import shipTypes from '../constants/shipTypes'
import Gameboard from './Gameboard'
import Ship from './Ship'

class Player {
  constructor () {
    this.board = new Gameboard()
    this.ships = this.createFleet()
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
}

export default Player
