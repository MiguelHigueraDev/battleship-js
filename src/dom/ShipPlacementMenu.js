import FLEET_COMPOSITION from '../constants/fleetComposition'

const PLACEMENT_MODES = {
  VERTICAL: 'Vertical',
  HORIZONTAL: 'Horizontal'
}

class ShipPlacementMenu {
  static fleet = FLEET_COMPOSITION
  static mode = PLACEMENT_MODES.HORIZONTAL

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

  static getActiveShip () {
    return this.fleet.find((ship) => ship[1] === 'active')
  }
}

export default ShipPlacementMenu
