import ShipPlacementMenu from './ShipPlacementMenu'

const board = document.querySelector('.setup-board')

const startGame = () => {
  console.log(ShipPlacementMenu.activeFleet)
}

const gameManager = {
  startGame
}

export default gameManager
