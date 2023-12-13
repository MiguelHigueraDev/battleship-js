import ShipPlacementMenu from './ShipPlacementMenu'
import SIZES from '../constants/sizes'
import Ship from '../classes/Ship'

const orientationButton = document.querySelector('.switch-orientation')
const shipContainer = document.querySelector('.available-ships');

(function () {
  orientationButton.addEventListener('click', () => switchPlacementMode())
})()

const switchPlacementMode = () => {
  ShipPlacementMenu.togglePlacementMode()
  updatePlacementMode()
}

const updatePlacementMode = () => {
  const orientation = ShipPlacementMenu.getPlacementMode()
  orientationButton.textContent = orientation
}

const loadShipPlacementGrid = () => {
  const board = document.querySelector('.setup-board')
  board.addEventListener('mouseout', () => resetOutlines())
  for (let i = 0; i < SIZES.BOARD_SIZE; i++) {
    for (let j = 0; j < SIZES.BOARD_SIZE; j++) {
      const cell = document.createElement('div')
      cell.classList.add('cell')
      cell.classList.add('cell-placement')
      cell.setAttribute('data-coord-x', j)
      cell.setAttribute('data-coord-y', i)
      cell.addEventListener('click', (e) => placeShip(e))
      cell.addEventListener('mouseover', (e) => showShipOutline(e))
      board.appendChild(cell)
    }
  }
}

const loadShips = () => {
  shipContainer.innerHTML = ''
  const fleet = ShipPlacementMenu.getFleet()
  for (const ship of fleet) {
    const shipDiv = document.createElement('div')
    shipDiv.classList.add('ship')
    shipDiv.addEventListener('click', () => updateActiveShip(fleet.indexOf(ship)))
    for (let i = 0; i < ship[0]; i++) {
      const cell = document.createElement('div')
      if (ship[1] === 'active') {
        cell.classList.add('setup-cell-active')
      } else {
        cell.classList.add('setup-cell')
      }
      shipDiv.appendChild(cell)
    }
    shipContainer.appendChild(shipDiv)
  }
}

const updateActiveShip = (index) => {
  ShipPlacementMenu.setActiveShip(index)
  loadShips()
}

const placeShip = (e) => {
  const x = e.target.getAttribute('data-coord-x')
  const y = e.target.getAttribute('data-coord-y')
  const activeShip = ShipPlacementMenu.getActiveShip()
  console.log(ShipPlacementMenu.getActiveShip())
  console.log(x, y)
}

const showShipOutline = (e) => {
  resetOutlines()
  const x = e.target.getAttribute('data-coord-x')
  const y = e.target.getAttribute('data-coord-y')
  const orientation = ShipPlacementMenu.getPlacementMode()
  const activeShipLength = ShipPlacementMenu.getActiveShip()[0]
  const adjacentCells = getAdjacentCells(Number(x), Number(y), activeShipLength, orientation)
  for (const cell of adjacentCells) {
    const cellDiv = document.querySelector(`.cell-placement[data-coord-x="${cell[0]}"][data-coord-y="${cell[1]}"]`)
    if (cellDiv !== null) {
      cellDiv.classList.add('cell-highlight')
    }
  }
}

const getAdjacentCells = (x, y, length, orientation) => {
  const cells = []
  for (let i = 0; i < length; i++) {
    if (orientation === 'Horizontal') {
      cells.push([x + i, y])
    } else {
      cells.push([x, y + i])
    }
  }
  return cells
}

const resetOutlines = () => {
  const cells = document.querySelectorAll('.cell-placement')
  cells.forEach((c) => {
    c.classList.remove('cell-highlight')
  })
}

const menuManager = {
  updatePlacementMode, loadShips, loadShipPlacementGrid
}

export default menuManager
