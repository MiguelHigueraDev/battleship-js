import Player from '../classes/Player'

const player1Gameboard = document.querySelector('.player-1-gameboard')
const player2Gameboard = document.querySelector('.player-2-gameboard')

const initPlayers = () => {
  const player1 = new Player()
  const player2 = new Player()
  return [player1, player2]
}

const loadGameboard = (board, player) => {
  board.cells.forEach((c) => {
    c.forEach((ce) => {
      console.log(ce)
      const cell = document.createElement('div')
      cell.classList.add('cell')
      if (player === 'player1') {
        player1Gameboard.appendChild(cell)
      } else {
        player2Gameboard.appendChild(cell)
      }
    })
  })
}

const gameboardManager = {
  loadGameboard, initPlayers
}

export default gameboardManager
