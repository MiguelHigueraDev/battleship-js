import './style.css'
import gameboardManager from './dom/gameboardManager'
import ShipPlacementMenu from './dom/ShipPlacementMenu'
const players = gameboardManager.initPlayers()
const player1 = players[0]
const player2 = players[1]

ShipPlacementMenu.togglePlacementMode()
ShipPlacementMenu.togglePlacementMode()
console.log(ShipPlacementMenu.getPlacementMode())
console.log(ShipPlacementMenu.loadShipPlacementMenu())

gameboardManager.loadShipPlacementGrid()
gameboardManager.loadGameboard(player1)
gameboardManager.loadGameboard(player2)
// gameboardManager.loadPlayer2Gameboard(player2)
