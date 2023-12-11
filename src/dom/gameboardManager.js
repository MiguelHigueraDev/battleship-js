import Player from '../classes/Player'

const player1Gameboard = document.querySelector('.player-1-gameboard')
const player2Gameboard = document.querySelector('.player-2-gameboard')

const initPlayers = () => {
  const player1 = new Player()
  player1Gameboard.setAttribute('data-player', player1.id)
  const player2 = new Player()
  player2Gameboard.setAttribute('data-player', player2.id)
  return [player1, player2]
}

const clearCells = (board) => {
  board.innerHTML = ''
}

const loadGameboard = (player) => {
  const board = document.querySelector(`[data-player="${player.id}"]`)
  clearCells(board)
  player.board.cells.forEach((c) => {
    c.forEach((ce) => {
      const cell = document.createElement('div')
      cell.classList.add('cell')
      cell.setAttribute('data-coord-x', ce.x)
      cell.setAttribute('data-coord-y', ce.y)
      cell.addEventListener('click', () => sendHit(cell, player))

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
      board.appendChild(cell)
    })
  })
}

const sendHit = (cell, player) => {
  const x = cell.getAttribute('data-coord-x')
  const y = cell.getAttribute('data-coord-y')
  // Check if cell was already attacked
  if (player.board.cells[x][y].isHit) return false
  player.board.receiveAttack(x, y)
  loadGameboard(player)
  return true
}

const gameboardManager = {
  loadGameboard, initPlayers
}

export default gameboardManager
