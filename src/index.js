import './style.css'
import gameboardManager from './dom/gameboardManager'
import setupManager from './dom/setupManager'
const players = gameboardManager.initPlayers()
const player1 = players[0]
const player2 = players[1]

setupManager.loadShips()

setupManager.loadShipPlacementGrid()
gameboardManager.loadGameboard(player1)
gameboardManager.loadGameboard(player2)
// gameboardManager.loadPlayer2Gameboard(player2)
