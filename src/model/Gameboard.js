import _ from 'lodash';

class Gameboard {
  constructor() {
    this.coordinates = Array(10).fill(0)
      .map(() => Array(10).fill({ status: 'empty', ship: {} }));
    this.ships = [];
  }

  placeShip(ship) {
    const clone = _.cloneDeep(this);
    const cloneShip = _.cloneDeep(ship);
    clone.ships.push(cloneShip);
    return clone;
  }

  receiveAttack([x, y]) {
    const { status } = this.coordinates[x][y];
    const result = (status === 'empty') ? 'miss' : 'hit';
    const clone = _.cloneDeep(this);
    clone.coordinates[x][y].status = result;
    const ship = clone.coordinates[x][y]?.ship;
    clone.coordinates[x][y].ship = ship?.hit(ship, [x, y]) || null;
    return clone;
  }
}

export default Gameboard;
