import Ship from '../src/model/Ship';

test('returns an object', () => {
  const ship = new Ship(4);
  expect(typeof ship).toBe('object');
});

test('has a length', () => {
  const ship = new Ship(4);
  expect(ship.length).toBe(4);
});

test('hit() marks position', () => {
  const ship = new Ship(5);
  const clone = ship.hit(4);
  expect(clone.positions[4]).toBe(1);
});

test('isSunk() detects sunken ships', () => {
  const ship = new Ship(4);
  const clone = ship.hit(0).hit(1).hit(2).hit(3);
  expect(clone.isSunk()).toBe(true);
});

test('isSunk() detects normal ships', () => {
  const ship = new Ship(4);
  const clone = ship.hit(0).hit(1).hit(2);
  expect(clone.isSunk()).toBe(false);
});
