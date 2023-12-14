import SIZES from '../constants/sizes'

const DIRECTIONS = {
  UP: 1,
  DOWN: 2,
  LEFT: 3,
  RIGHT: 4
}

const getRandomCoord = () => {
  return Math.floor(Math.random() * SIZES.BOARD_SIZE)
}

const getRandomDirection = () => {
  const keys = Object.keys(DIRECTIONS)
  return DIRECTIONS[keys[keys.length * Math.random() << 0]]
}

const getCoords = (ship, board) => {
  let x, y
  // Check if coords are already used
  do {
    x = getRandomCoord()
    y = getRandomCoord()
  } while (board[x][y].ship !== null)

  const direction = getRandomDirection()
  const shipLength = ship.type
  const coords = []

  if (direction === DIRECTIONS.UP) {
    for (let i = 0; i <= shipLength - 1; i++) {
      if (y + i > 9) return getCoords(ship, board)
      if (board[x][y + i].ship !== null) {
        return getCoords(ship, board)
      }
      coords.push([x, y + i])
    }
  } else if (direction === DIRECTIONS.DOWN) {
    for (let i = 0; i <= shipLength - 1; i++) {
      if (y - i < 0) return getCoords(ship, board)
      if (board[x][y - i].ship !== null) {
        return getCoords(ship, board)
      }
      coords.push([x, y - i])
    }
  } else if (direction === DIRECTIONS.RIGHT) {
    for (let i = 0; i <= shipLength - 1; i++) {
      if (x + i > 9) return getCoords(ship, board)
      if (board[x + i][y].ship !== null) {
        return getCoords(ship, board)
      }
      coords.push([x + i, y])
    }
  } else {
    for (let i = 0; i <= shipLength - 1; i++) {
      if (x - i < 0) return getCoords(ship, board)
      if (board[x - i][y].ship !== null) {
        return getCoords(ship, board)
      }
      coords.push([x - i, y])
    }
  }
  return coords
}

const randomUtils = {
  getCoords, getRandomCoord
}

export default randomUtils
