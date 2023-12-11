import Player from '../classes/Player'

const player1Gameboard = document.querySelector('.player-1-gameboard')
const player2Gameboard = document.querySelector('.player-2-gameboard')

const initPlayers = () => {
  const player1 = new Player()
  const player2 = new Player()
  return [player1, player2]
}

const clearCells = () => {
  player1Gameboard.innerHTML = ''
  player2Gameboard.innerHTML = ''
}

const loadGameboard = (board, player) => {
  clearCells()
  board.cells.forEach((c) => {
    c.forEach((ce) => {
      const cell = document.createElement('div')
      cell.classList.add('cell')
      cell.setAttribute('data-coord-x', ce.x)
      cell.setAttribute('data-coord-y', ce.y)
      cell.addEventListener('click', () => sendHit(cell, board))

      if (ce.isHit) {
        if (ce.ship !== null) {
          if (ce.ship.sunk) {
            cell.classList.add('cell-ship-sunk')
          } else {
            cell.classList.add('cell-ship-hit')
          }
        } else {
          cell.classList.add('cell-miss')
        }
      }
      if (ce.ship !== null) cell.classList.add('cell-ship')
      if (player === 'player1') {
        player1Gameboard.appendChild(cell)
      } else {
        player2Gameboard.appendChild(cell)
      }
    })
  })
}

const sendHit = (cell, board) => {
  const x = cell.getAttribute('data-coord-x')
  const y = cell.getAttribute('data-coord-y')
  // Check if cell was already attacked
  if (board.cells[x][y].isHit) return
  board.receiveAttack(x, y)
  loadGameboard(board)
}

const gameboardManager = {
  loadGameboard, initPlayers
}

export default gameboardManager
