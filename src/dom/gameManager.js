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
  updateGameStatus('Click on enemy board to fire a shot')
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
  gameboardManager.loadGameboard(player)
  checkWinner()
}

const checkWinner = () => {
  if (player.board.areAllShipsSunk()) {
    removeInteraction()
    updateGameStatus('AI Wins!')
    return true
  }
  if (ai.board.areAllShipsSunk()) {
    removeInteraction()
    updateGameStatus('You win!')
    return true
  }
  return false
}

const removeInteraction = () => {
  const cells = player2Gameboard.querySelectorAll('div')
  cells.forEach((ce) => {
    // Remove hover class and event listeners
    ce.classList.remove('cell-hover')
    const clone = ce.cloneNode(true)
    ce.parentNode.replaceChild(clone, ce)
  })
  highlightRemainingAIShips()
}

const highlightRemainingAIShips = () => {
  gameboardManager.loadGameboard(ai, true)
}

const gameManager = {
  startGame, nextAiTurn, checkWinner, removeInteraction
}

export default gameManager
