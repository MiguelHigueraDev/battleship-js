import Player from '../classes/Player'
import ShipPlacementMenu from './ShipPlacementMenu'
import gameboardManager from './gameboardManager'

const setupBoard = document.querySelector('.setup-board-container')
const boards = document.querySelector('.boards')

const player1Gameboard = document.querySelector('.player-1-gameboard')
const player2Gameboard = document.querySelector('.player-2-gameboard')

const startGameButton = document.querySelector('.setup-board-button')
const gameStatus = document.querySelector('.game-info')
const gameTips = document.querySelector('.game-tips')
let player
let ai

(function () {
  ai = new Player()
  player2Gameboard.setAttribute('data-player', ai.id)
  gameboardManager.loadGameboard(ai)
})()

const startGame = () => {
  player = new Player(ShipPlacementMenu.activeFleet)
  player1Gameboard.setAttribute('data-player', player.id)
  gameboardManager.loadGameboard(player)
  updateGameStatus('Click on enemy board to shoot')
  toggleSetupVisibility()
}

const toggleSetupVisibility = () => {
  setupBoard.classList.add('hidden')
  boards.classList.remove('hidden')
  startGameButton.classList.add('hidden')
  gameTips.classList.add('hidden')
}

const updateGameStatus = (str) => {
  gameStatus.textContent = str
}

const nextAiTurn = () => {
  ai.aiAttack(player.board)
  checkWinner()
  gameboardManager.loadGameboard(player)
}

const checkWinner = () => {
  if (player.board.areAllShipsSunk()) {
    // AI Wins
    alert('Ai wins!')
    return true
  }
  if (ai.board.areAllShipsSunk()) {
    // Player wins
    alert('Player wins!')
    return true
  }
  return false
}

const gameManager = {
  startGame, nextAiTurn, checkWinner
}

export default gameManager
