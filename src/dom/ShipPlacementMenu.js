import FLEET_COMPOSITION from '../constants/fleetComposition'

const PLACEMENT_MODES = {
  VERTICAL: 'VERTICAL',
  HORIZONTAL: 'HORIZONTAL'
}

class ShipPlacementMenu {
  constructor () {
    this.mode = PLACEMENT_MODES.VERTICAL
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

  static loadShipPlacementMenu () {
    const ships = FLEET_COMPOSITION
    for (const ship of ships) {
      console.log(ship)
    }
  }
}

export default ShipPlacementMenu
