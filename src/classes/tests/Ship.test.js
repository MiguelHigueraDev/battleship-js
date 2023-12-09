import shipTypes from '../../constants/shipTypes'
import Ship from '../Ship'

describe('Ship tests', () => {
  let testCarrier
  let testSubmarine
  beforeEach(() => {
    testCarrier = new Ship(shipTypes.CARRIER)
    testSubmarine = new Ship(shipTypes.SUBMARINE)
  })

  test('Hit carrier', () => {
    testCarrier.hit()
    expect(testCarrier.hits).toBe(1)
  })

  test('Submarine is of length 2', () => {
    expect(testSubmarine.type).toBe(2)
  })

  test('Hit submarine two times and check if sunk', () => {
    testSubmarine.hit()
    testSubmarine.hit()
    expect(testSubmarine.isSunk()).toBe(true)
  })

  test('Hit carrier three times and check if sunk', () => {
    testCarrier.hit()
    testCarrier.hit()
    testCarrier.hit()
    expect(testCarrier.isSunk()).toBe(false)
  })
})
