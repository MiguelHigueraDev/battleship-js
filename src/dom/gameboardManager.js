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

const sendHit = (cell, targetPlayer) => {
  const x = cell.getAttribute('data-coord-x')
  const y = cell.getAttribute('data-coord-y')
  // Check if cell was already attacked
  if (targetPlayer.board.cells[y][x].isHit) return false
  targetPlayer.board.receiveAttack(y, x)
  loadGameboard(targetPlayer)
  return true
}

const gameboardManager = {
  loadGameboard
}

export default gameboardManager
