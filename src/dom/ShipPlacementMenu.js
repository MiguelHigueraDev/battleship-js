import FLEET_COMPOSITION from '../constants/fleetComposition'
import SIZES from '../constants/sizes'

const PLACEMENT_MODES = {
  VERTICAL: 'Vertical',
  HORIZONTAL: 'Horizontal'
}

class ShipPlacementMenu {
  static fleet = FLEET_COMPOSITION
  static activeFleet = []
  static mode = PLACEMENT_MODES.HORIZONTAL
  static cells = []

  static {
    for (let i = 0; i < SIZES.BOARD_SIZE; i++) {
      this.cells.push([])
      for (let j = 0; j < SIZES.BOARD_SIZE; j++) {
        this.cells[i].push({ ship: null, isHit: false, x: j, y: i })
      }
    }
  }

  static togglePlacementMode () {
    if (this.mode === PLACEMENT_MODES.VERTICAL) {
      this.mode = PLACEMENT_MODES.HORIZONTAL
    } else {
      this.mode = PLACEMENT_MODES.VERTICAL
    }
  }

  static getPlacementMode () {
    return this.mode
  }

  static getFleet () {
    return this.fleet
  }

  static setActiveShip (index) {
    for (const ship of this.fleet) {
      ship[1] = 'inactive'
    }
    this.fleet[index][1] = 'active'
  }

  static getShip (x, y) {
    if (this.cells[y][x].ship != null) return this.cells[y][x].ship
  }

  static getActiveShip () {
    return this.fleet.find((ship) => ship[1] === 'active')
  }

  static getActiveShipIndex () {
    return this.fleet.indexOf(this.fleet.find((ship) => ship[1] === 'active'))
  }

  static addShip (index, adjacentCells) {
    this.fleet[index][3] = adjacentCells
    this.activeFleet.push(this.fleet[index])
    this.fleet.splice(index, 1)
  }

  static removeShip (index) {
    this.activeFleet.splice(index, 1)
  }
}

export default ShipPlacementMenu
