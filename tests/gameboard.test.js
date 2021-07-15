import Gameboard from '../src/model/Gameboard';
import Ship from '../src/model/Ship';

test('returns an object', () => {
  const gameboard = Gameboard();
  expect(typeof gameboard).toBe('object');
});

test('has coordinates we can access', () => {
  const gameboard = Gameboard();
  expect(gameboard.coordinates[0][0].status).toBe('empty');
});

test('places ship at coordinates', () => {
  const gameboard = Gameboard();
  const ship = Ship(4);
  gameboard.placeShip(0, ship);
  expect(gameboard.ships).toContain(ship);
  expect(gameboard.coordinates[0, 4]).toBe(ship);
});

test('receives attacks', () => {
  const gameboard = Gameboard();
  expect(gameboard.receiveAttack([0, 0])).toBe('miss');
});
