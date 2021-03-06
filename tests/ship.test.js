import Ship from '../src/model/Ship';

test('returns an object', () => {
  const ship = new Ship(4);
  expect(typeof ship).toBe('object');
});

test('has a length', () => {
  const ship = new Ship(4);
  expect(ship.length).toBe(4);
});

test('hit() increases number of hits', () => {
  const ship = new Ship(5);
  const clone = ship.hit().hit();
  expect(clone.hits).toBe(2);
});

test('sunk detects sunken ships', () => {
  const ship = new Ship(4);
  const clone = ship.hit(0).hit(1).hit(2).hit(3);
  expect(clone.isSunk()).toBe(true);
});

test('sunk detects normal ships', () => {
  const ship = new Ship(4);
  const clone = ship.hit(0).hit(1).hit(2);
  expect(clone.isSunk()).toBe(false);
});
