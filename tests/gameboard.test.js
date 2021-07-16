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
  const gameboard2 = gameboard.placeShip(gameboard, ship);
  expect(gameboard2.ships.length).toBe(1);
  expect(gameboard2.coordinates[0][4]).toBe(expect.objectContaining({
    status: 'filled',
    ship: expect.objectContaining({
      length: 4,
    }),
  }));
});

test('receives attacks', () => {
  const gameboard = Gameboard();
  const gameboard2 = gameboard.receiveAttack(gameboard, [0, 0]);
  expect(gameboard2.coordinates[0][0].status).toBe('miss');
});
