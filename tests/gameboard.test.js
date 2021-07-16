import Gameboard from '../src/model/Gameboard';
import Ship from '../src/model/Ship';

test('returns an object', () => {
  const gameboard = new Gameboard();
  expect(typeof gameboard).toBe('object');
});

test('has coordinates we can access', () => {
  const gameboard = new Gameboard();
  expect(gameboard.coordinates[0][0].status).toBe('empty');
});

test('places ship at coordinates', () => {
  const gameboard = new Gameboard();
  const ship = new Ship(4);
  expect(gameboard.placeShip(ship, [0, 0]).coordinates[0][3])
    .toEqual(expect.objectContaining({
      status: 'filled',
      ship: expect.objectContaining({
        length: 4,
      }),
    }));
});

test('receives attacks', () => {
  const gameboard = new Gameboard();
  const gameboard2 = gameboard.receiveAttack([0, 0]);
  expect(gameboard2.coordinates[0][0].status).toBe('miss');
});
