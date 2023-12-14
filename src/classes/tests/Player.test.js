import FLEET_COMPOSITION from '../../constants/fleetComposition'
import Player from '../Player'

describe('Creating players', () => {
  test('Create human player', () => {
    const player = new Player()
    expect(player.ships.length).toBe(FLEET_COMPOSITION.length)
  })
})
