import Ship from '../src/model'

test('returns an object', () => {
  const ship = Ship(4);
  expect(typeof ship).toBe('object');
});

test('has a length', () => {
  const ship = Ship(4);
  expect(ship.length).toBe(4);
});

test('hit() marks position', () => {
  const ship = Ship(5);
  ship.hit(4);
  expect(ship.positions[4]).toBe(1);
}); 

test('isSunk() detects sunken ships', () => {
  const ship = Ship(4);
  ship.hit(0);
  ship.hit(1);
  ship.hit(2);
  ship.hit(3);
  expect(ship.isSunk()).toBe(true);
});

test('isSunk() detects normal ships', () => {
  const ship = Ship(4);
  ship.hit(0);
  ship.hit(1);
  ship.hit(2);
  expect(ship.isSunk()).toBe(false);
});
