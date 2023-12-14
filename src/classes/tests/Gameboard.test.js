import shipTypes from '../../constants/shipTypes'
import Gameboard from '../Gameboard'
import Ship from '../Ship'
// TODO: update tests to reflect new Gameboard class

describe('Gameboard structure', () => {
  test('Create board', () => {
    const board = new Gameboard()
    expect(board.cells.length).toBe(10)
  })
})

describe('Placing ships on gameboard', () => {
  let board
  let testSubmarine
  let testCruiser
  beforeEach(() => {
    board = new Gameboard()
    testSubmarine = new Ship(shipTypes.SUBMARINE)
    testCruiser = new Ship(shipTypes.CRUISER)
  })
  test('Place submarine', () => {
    board.placeShip(testSubmarine, [[1, 1], [1, 2]])
    expect(board.cells[1][1]).toEqual({ isHit: false, ship: testSubmarine })
    expect(board.cells[1][2]).toEqual({ isHit: false, ship: testSubmarine })
    expect(board.cells[0][0]).toEqual({ isHit: false, ship: null })
  })

  test('Place submarine and then try placing another one above it.', () => {
    board.placeShip(testSubmarine, [[1, 1], [1, 2]])
    board.placeShip(testCruiser, [[1, 1], [1, 2], [1, 3]])
    expect(board.cells[1][1]).toEqual({ isHit: false, ship: testSubmarine })
    expect(board.cells[1][2]).toEqual({ isHit: false, ship: testSubmarine })
    expect(board.cells[1][3]).toEqual({ isHit: false, ship: null })
  })

  test('Place cruiser outside range', () => {
    board.placeShip(testCruiser, [[8, 0], [9, 0], [10, 0]])
    expect(board.cells[8][0].ship).toBe(null)
    expect(board.cells[9][0].ship).toBe(null)
  })
})

describe('Attacking cruiser', () => {
  let board
  let testCruiser
  beforeEach(() => {
    board = new Gameboard()
    testCruiser = new Ship(shipTypes.CRUISER)
    board.placeShip(testCruiser, [[4, 3], [4, 4], [4, 5]])
  })

  test('Firing at cruiser 3 times to sink it', () => {
    board.receiveAttack(4, 3)
    expect(testCruiser.hits).toBe(1)
    board.receiveAttack(4, 4)
    expect(testCruiser.hits).toBe(2)
    board.receiveAttack(4, 5)
    expect(testCruiser.hits).toBe(3)
    expect(testCruiser.isSunk()).toBe(true)
  })
})

describe('Three sunken submarines', () => {
  let board
  let testSubmarine1
  let testSubmarine2
  let testSubmarine3
  beforeEach(() => {
    board = new Gameboard()
    testSubmarine1 = new Ship(shipTypes.SUBMARINE)
    board.placeShip(testSubmarine1, [[1, 1], [1, 2]])
    testSubmarine2 = new Ship(shipTypes.SUBMARINE)
    board.placeShip(testSubmarine2, [[1, 5], [1, 6]])
    testSubmarine3 = new Ship(shipTypes.SUBMARINE)
    board.placeShip(testSubmarine3, [[5, 6], [6, 6]])
  })

  test('Reports sunken board successfully', () => {
    board.receiveAttack(1, 1)
    board.receiveAttack(1, 2)
    board.receiveAttack(1, 5)
    board.receiveAttack(1, 6)
    board.receiveAttack(5, 6)
    board.receiveAttack(6, 6)
    expect(board.areAllShipsSunk()).toBe(true)
  })
})
