import ShipPlacementMenu from './ShipPlacementMenu'
import gameManager from './gameManager'

const orientationButton = document.querySelector('.switch-orientation')
const shipContainer = document.querySelector('.available-ships')
const board = document.querySelector('.setup-board')
const startGameButton = document.querySelector('.setup-board-button');

(function () {
  orientationButton.addEventListener('click', () => switchPlacementMode())
  startGameButton.addEventListener('click', () => startGame())
  document.addEventListener('keydown', (e) => handleKeyPresses(e))
})()

const switchPlacementMode = () => {
  ShipPlacementMenu.togglePlacementMode()
  updatePlacementMode()
}

const updatePlacementMode = () => {
  const orientation = ShipPlacementMenu.getPlacementMode()
  orientationButton.textContent = orientation
}

const clearShipPlacementGrid = () => {
  board.innerHTML = ''
}

const loadShipPlacementGrid = () => {
  clearShipPlacementGrid()
  board.addEventListener('mouseout', () => resetHighlights())
  ShipPlacementMenu.cells.forEach((c) => {
    c.forEach((ce) => {
      const cell = document.createElement('div')
      cell.classList.add('cell')
      cell.classList.add('cell-placement')
      cell.setAttribute('data-coord-x', ce.x)
      cell.setAttribute('data-coord-y', ce.y)
      cell.addEventListener('click', (e) => placeShip(e))
      cell.addEventListener('mouseover', (e) => showShipOutline(e))

      if (ce.ship !== null) {
        cell.classList.add('cell-ship')
        cell.addEventListener('click', (e) => removeShip(e))
      }
      board.appendChild(cell)
    })
  })
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
  toggleStartGameButton()
}

const toggleStartGameButton = () => {
  const fleet = ShipPlacementMenu.getFleet()
  if (fleet.length === 0) {
    startGameButton.classList.remove('invisible')
  } else {
    startGameButton.classList.add('invisible')
  }
}

const updateActiveShip = (index) => {
  ShipPlacementMenu.setActiveShip(index)
  loadShips()
}

const placeShip = (e) => {
  if (ShipPlacementMenu.fleet.length < 1) return
  const x = e.target.getAttribute('data-coord-x')
  const y = e.target.getAttribute('data-coord-y')
  const orientation = ShipPlacementMenu.getPlacementMode()
  const activeShipLength = ShipPlacementMenu.getActiveShip()[0]
  const adjacentCells = getAdjacentCells(Number(x), Number(y), activeShipLength, orientation)

  let valid = true
  for (const cell of adjacentCells) {
    const [cellX, cellY] = cell
    if (cellX < 0 || cellX > 9 || cellY < 0 || cellY > 9) {
      // Check if ship goes out of bounds
      valid = false
    } else {
      // Check if there is already another ship placed in one of the coordinate pairs
      if (ShipPlacementMenu.cells[cellY][cellX].ship !== null) valid = false

      // Also check that there are no ships adjacent to it making sure there is one space free in all directions
      valid = checkDirections(cellX, cellY)
      // Break loop if one of directions returns false
      if (!valid) return
    }
  }
  if (valid) {
    // Add ship
    for (const coordinate of adjacentCells) {
      ShipPlacementMenu.cells[coordinate[1]][coordinate[0]].ship = ShipPlacementMenu.getActiveShip()
    }
    ShipPlacementMenu.addShip(ShipPlacementMenu.getActiveShipIndex(), adjacentCells)
    loadShipPlacementGrid()
    if (ShipPlacementMenu.fleet.length > 0) updateActiveShip(0)
    loadShips()
  }
}

const checkDirections = (x, y) => {
  if (x > 9 || x < 0 || y > 9 || x < 0) return false
  // Cardinal directions
  if (y + 1 <= 9) if (ShipPlacementMenu.cells[y + 1][x].ship !== null) return false // right
  if (y - 1 >= 0) if (ShipPlacementMenu.cells[y - 1][x].ship !== null) return false // left
  if (x + 1 <= 9) if (ShipPlacementMenu.cells[y][x + 1].ship !== null) return false // down
  if (x - 1 >= 0) if (ShipPlacementMenu.cells[y][x - 1].ship !== null) return false // up
  // Diagonals
  if (y + 1 <= 9 && x - 1 >= 0) if (ShipPlacementMenu.cells[y + 1][x - 1].ship !== null) return false // SW
  if (y + 1 <= 9 && x + 1 <= 9) if (ShipPlacementMenu.cells[y + 1][x + 1].ship !== null) return false // SE
  if (y - 1 >= 0 && x - 1 >= 0) if (ShipPlacementMenu.cells[y - 1][x - 1].ship !== null) return false // NW
  if (y - 1 >= 0 && x + 1 <= 9) if (ShipPlacementMenu.cells[y - 1][x + 1].ship !== null) return false // NE
  return true
}

const removeShip = (e) => {
  const x = e.target.getAttribute('data-coord-x')
  const y = e.target.getAttribute('data-coord-y')
  const ship = ShipPlacementMenu.getShip(x, y)
  // Remove active status
  ship[1] = 'inactive'
  // Add ship back to fleet
  ShipPlacementMenu.fleet.push(ship)
  // Remove ship from active fleet
  const shipIndex = ShipPlacementMenu.activeFleet.findIndex(s => s[2] === ship[2])
  ShipPlacementMenu.removeShip(shipIndex)
  // Remove ship from DOM
  ShipPlacementMenu.cells.forEach((c) => {
    c.forEach((ce) => {
      if (ce.ship === ship) ce.ship = null
    })
  })
  if (ShipPlacementMenu.fleet.length > 0) updateActiveShip(0)
  loadShipPlacementGrid()
  loadShips()
}

const showShipOutline = (e) => {
  resetHighlights()
  const x = e.target.getAttribute('data-coord-x')
  const y = e.target.getAttribute('data-coord-y')
  const orientation = ShipPlacementMenu.getPlacementMode()
  // Fixes bug in case there are no ships to add
  if (ShipPlacementMenu.getActiveShip() === undefined) return
  if (ShipPlacementMenu.cells[y][x].ship !== null) {
    // Todo: Highlight ship to be removed
    return
  }
  const activeShipLength = ShipPlacementMenu.getActiveShip()[0]
  const adjacentCells = getAdjacentCells(Number(x), Number(y), activeShipLength, orientation)
  for (const cell of adjacentCells) {
    const [x, y] = cell
    const cellDiv = document.querySelector(`.cell-placement[data-coord-x="${x}"][data-coord-y="${y}"]`)
    if (checkDirections(x, y)) {
      if (cellDiv !== null) {
        cellDiv.classList.add('cell-highlight')
      }
    } else {
      if (cellDiv !== null) {
        cellDiv.classList.add('cell-highlight-error')
      }
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

const resetHighlights = () => {
  const cells = document.querySelectorAll('.cell-placement')
  cells.forEach((c) => {
    c.classList.remove('cell-highlight')
    c.classList.remove('cell-highlight-error')
  })
}

const handleKeyPresses = (e) => {
  if (e.key === 'r') switchPlacementMode()
}

const startGame = () => {
  gameManager.startGame()
}

const setupManager = {
  updatePlacementMode, loadShips, loadShipPlacementGrid
}

export default setupManager
