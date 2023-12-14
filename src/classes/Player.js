import FLEET_COMPOSITION from '../constants/fleetComposition'
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
      // Add attack stack to keep track of hits so it plays smarter
      this.attackStack = []
    }
  }

  createFleet () {
    const ships = []
    for (const ship of FLEET_COMPOSITION) {
      const s = new Ship(ship[0])
      ships.push(s)
    }
    return ships
  }

  attack (x, y, enemyBoard) {
    // Check if cell was hit before
    if (enemyBoard.checkIfCellIsHit(x, y)) return
    enemyBoard.receiveAttack(x, y)
  }

  // x and y coordinates are inverted
  aiAttack (enemyBoard) {
    if (this.attackStack.length > 0) {
      // Check stacked attacks instead of trying a random attack
      const attack = this.attackStack.pop()
      // Check if cell is already hit
      console.log(attack)
      const attackResponse = enemyBoard.receiveAttack(...attack)
      if (attackResponse === 'hit') {
        const [x, y, direction] = attack
        // Check if direction doesn't go out of bounds, then attack direction again
        if (direction === 'up') {
          if (x - 1 >= 0) {
            this.attackStack.push([x - 1, y, 'up'])
          }
        }
        if (direction === 'down') {
          if (x + 1 <= 9) {
            this.attackStack.push([x + 1, y, 'down'])
          }
        }
        if (direction === 'left') {
          if (y - 1 >= 0) {
            this.attackStack.push([x, y - 1, 'left'])
          }
        }
        if (direction === 'right') {
          if (y + 1 <= 9) {
            this.attackStack.push([x, y + 1, 'right'])
          }
        }
      } else if (attackResponse === 'sunk') {
        // Clear remaining attacks if ship is already sunk
        this.attackStack = []
      }
      // console.log(JSON.parse(JSON.stringify(this.attackStack)))
    } else {
      // Stack is empty, perform random attack instead
      const x = randomUtils.getRandomCoord()
      const y = randomUtils.getRandomCoord()
      // If cell was already hit, attack another coordinate
      if (enemyBoard.checkIfCellIsHit(x, y)) return this.aiAttack(enemyBoard)
      // Check attack response, if ship is hit add attacks to stack
      const attackResponse = enemyBoard.receiveAttack(x, y)
      if (attackResponse === 'hit') {
        // Check all sides that don't go out of bounds
        if (x - 1 >= 0) {
          this.attackStack.push([x - 1, y, 'up'])
        }
        if (x + 1 <= 9) {
          this.attackStack.push([x + 1, y, 'down'])
        }
        if (y - 1 >= 0) {
          this.attackStack.push([x, y - 1, 'left'])
        }
        if (y + 1 <= 9) {
          this.attackStack.push([x, y + 1, 'right'])
        }
      }
    }
  }

  placeRandomShips () {
    for (const ship of this.ships) {
      this.board.autoPlaceShip(ship)
    }
  }
}

export default Player
