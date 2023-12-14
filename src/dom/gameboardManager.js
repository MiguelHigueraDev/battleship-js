import gameManager from './gameManager'

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
      // Only add click listener to AI board
      if (player.id === 'ai') cell.addEventListener('click', () => sendHit(cell, player))

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
      // Only show human player's ships
      if (player.id !== 'ai') {
        if (ce.ship !== null) cell.classList.add('cell-ship')
      }
      board.appendChild(cell)
    })
  })
}

const sendHit = (cell, targetPlayer) => {
  // Don't allow player to play after ending game
  if (gameManager.checkWinner()) return

  const x = cell.getAttribute('data-coord-x')
  const y = cell.getAttribute('data-coord-y')
  // Check if cell was already attacked
  if (targetPlayer.board.cells[y][x].isHit) return false
  targetPlayer.board.receiveAttack(y, x)
  // Check if player won
  if (!gameManager.checkWinner()) {
    // Make AI move after player move
    gameManager.nextAiTurn()
  }
  loadGameboard(targetPlayer)
}

const gameboardManager = {
  loadGameboard
}

export default gameboardManager
