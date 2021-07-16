import _ from 'lodash';

class Gameboard {
  constructor() {
    this.coordinates = Array(10).fill(0)
      .map(() => Array(10).fill({ status: 'empty', ship: null }));
    this.ships = [];
  }

  // Placing ships should only ever hapnen in the startup
  // phase; even so, we maintain our immutable doctrine here
  placeShip(ship, [x, y], direction) {
    const clone = _.cloneDeep(this);
    const cloneShip = _.cloneDeep(ship);
    clone.ships.push(cloneShip);
    // Now we handle placement. This depends on the direction
    // of the ship, which can be either horizontal or vertical.
    if (direction === 'row') {
      clone.coordinates[x] = clone.coordinates[x].map((col, index) => {
        if (index >= y && index < y + ship.length) {
          return {
            status: 'filled',
            ship: cloneShip,
          };
        }
        return col;
      });
    }
    if (direction === 'column') {
      clone.coordinates = clone.coordinates.map((row, index) => {
        if (index >= x && index < x + ship.length) {
          // Fit in our new column
          return [...row.slice(0, y), { status: 'filled', ship: cloneShip }, ...row.slice(y + 1)];
        }
        return row;
      });
    }
    return clone;
  }

  // When we receive attacks, we deep copy the parent gameboard.
  // This ensures we only mutate the object locally.
  receiveAttack([x, y]) {
    const { status } = this.coordinates[x][y];
    const result = (status === 'empty') ? 'miss' : 'hit';
    const clone = _.cloneDeep(this);
    clone.coordinates[x][y].status = result;
    const { ship } = clone.coordinates[x][y];
    clone.coordinates[x][y].ship = ship?.hit?.(2) || null;
    return clone;
  }
}

export default Gameboard;
