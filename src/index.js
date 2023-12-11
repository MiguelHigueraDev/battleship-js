import './style.css'
import gameboardManager from './dom/gameboardManager'

const players = gameboardManager.initPlayers()
const player1 = players[0]
const player2 = players[1]
gameboardManager.loadGameboard(player1)
gameboardManager.loadGameboard(player2)
console.log(player1, player2)
// gameboardManager.loadPlayer2Gameboard(player2)
