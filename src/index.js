import './style.css'
import gameboardManager from './dom/gameboardManager'
import menuManager from './dom/menuManager'
const players = gameboardManager.initPlayers()
const player1 = players[0]
const player2 = players[1]

menuManager.loadShips()

menuManager.loadShipPlacementGrid()
gameboardManager.loadGameboard(player1)
gameboardManager.loadGameboard(player2)
// gameboardManager.loadPlayer2Gameboard(player2)
