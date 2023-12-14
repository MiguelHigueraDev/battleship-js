import Player from '../classes/Player'
import ShipPlacementMenu from './ShipPlacementMenu'
import gameboardManager from './gameboardManager'

const setupBoard = document.querySelector('.setup-board-container')
const boards = document.querySelector('.boards')

const player1Gameboard = document.querySelector('.player-1-gameboard')
const player2Gameboard = document.querySelector('.player-2-gameboard')

const startGame = () => {
  const player = new Player(ShipPlacementMenu.activeFleet)
  player1Gameboard.setAttribute('data-player', player.id)
  const ai = new Player()
  player2Gameboard.setAttribute('data-player', ai.id)

  gameboardManager.loadGameboard(player)
  gameboardManager.loadGameboard(ai)
  toggleSetupVisibility()
}

const toggleSetupVisibility = () => {
  setupBoard.classList.add('hidden')
  boards.classList.remove('hidden')
}

const gameManager = {
  startGame
}

export default gameManager
