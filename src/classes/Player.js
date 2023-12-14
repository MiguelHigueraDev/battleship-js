import shipTypes from '../constants/shipTypes'
import randomUtils from '../helpers/randomUtils'
import Gameboard from './Gameboard'
import Ship from './Ship'

class Player {
  constructor (coords) {
    this.board = new Gameboard()
    this.ships = this.createFleet()
    if (coords !== undefined) {
      this.id = 'player'
      this.board.placeShips(coords)
    } else {
      this.id = 'ai'
      this.placeRandomShips()
    }
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

  randomAttack (enemyBoard) {
    const x = randomUtils.getRandomCoord()
    const y = randomUtils.getRandomCoord()
    // Check if cell was hit before
    if (enemyBoard.checkIfCellIsHit(x, y)) return this.randomAttack(enemyBoard)
    enemyBoard.receiveAttack(x, y)
  }

  placeRandomShips () {
    this.board.autoPlaceShip(this.ships[0])
    this.board.autoPlaceShip(this.ships[1])
    this.board.autoPlaceShip(this.ships[2])
    this.board.autoPlaceShip(this.ships[3])
    this.board.autoPlaceShip(this.ships[4])
  }
}

export default Player
