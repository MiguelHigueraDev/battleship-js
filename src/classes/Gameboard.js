class Gameboard {
  constructor (size = 10) {
    const board = []
    for (let i = 0; i < size; i++) {
      board.push([])
      for (let j = 0; j < size; j++) {
        board[i].push([])
      }
    }
    this.board = board
    this.placedShips = []
  }

  placeShip (ship, coordinates) {
    // check if shipType matches length
    if (coordinates.length !== ship.type) return 'invalid-length'
    for (const coordinate of coordinates) {
      // check if coordinates are outside of range
      if (coordinate[0] < 0 || coordinate[0] > 9) return 'invalid-coord'
      if (coordinate[1] < 0 || coordinate[1] > 9) return 'invalid-coord'
      // Check if there is already another ship placed in selected coordinates
      if (this.board[coordinate[0]][coordinate[1]].length !== 0) return 'already-placed'
    }
    // All checks successfull. Push ship to board and also store it in array for areAllShipsSunk()
    for (const coordinate of coordinates) {
      this.board[coordinate[0]][coordinate[1]] = ship
    }
    this.placedShips.push(ship)
    return true
  }

  receiveAttack (x, y) {
    // Check if coordinates were already attacked
    if (this.board[x][y].length === 0) { // not attacked, no ship placed
      this.board[x][y] = 'X'
    } else if (this.board[x][y] === 'X') {
      return 'already-attacked'
    } else {
      this.board[x][y].hit()
      if (this.board[x][y].isSunk()) this.board[x][y].sunk = true
      this.board[x][y] = 'X'
    }
  }

  areAllShipsSunk () {
    return this.placedShips.every(ship => ship.isSunk())
  }
}

export default Gameboard
