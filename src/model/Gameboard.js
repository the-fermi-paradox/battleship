import _ from 'lodash';

class Gameboard {
  constructor() {
    this.coordinates = Array(10).fill(0)
      .map(() => Array(10).fill(0))
      .map((row, x) => row.map((cell, y) => ({ status: 'empty', ship: null, coords: [x, y] })))
      .flat();
    this.ships = [];
  }

  // Placing ships should only ever hapnen in the startup
  // phase; even so, we maintain our immutable doctrine here
  placeShip(ship, [x, y], direction) {
    const clone = _.cloneDeep(this);
    const cloneShip = _.cloneDeep(ship);
    clone.ships.push(cloneShip);
    const shipId = clone.ships.indexOf(cloneShip);
    // Now we handle placement. This depends on the direction
    // of the ship, which can be either horizontal or vertical.
    // TODO: break this out into its own function
    if (direction === 'row') {
      clone.coordinates = clone.coordinates.map((cell) => {
        if (cell.coords[0] === x && cell.coords[1] >= y && cell.coords[1] < y + ship.length) {
          const cellClone = _.cloneDeep(cell);
          cellClone.status = 'filled';
          cellClone.ship = shipId;
          return cellClone;
        }
        return cell;
      });
    }
    if (direction === 'column') {
      clone.coordinates = clone.coordinates.map((cell) => {
        if (cell.coords[1] === y && cell.coords[0] >= x && cell.coords[0] < x + ship.length) {
          const cellClone = _.cloneDeep(cell);
          cellClone.status = 'filled';
          cellClone.ship = shipId;
          return cellClone;
        }
        return cell;
      });
    }
    return clone;
  }

  lookupCoords([x, y]) {
    return this.coordinates
      .filter((ele) => ele.coords[0] === x && ele.coords[1] === y)[0];
  }

  // When we receive attacks, we deep copy the parent gameboard.
  // This ensures we only mutate the object locally.
  receiveAttack([x, y]) {
    const clone = _.cloneDeep(this);
    const cell = clone.lookupCoords([x, y]);
    const result = (cell.status === 'empty') ? 'miss' : 'hit';
    cell.status = result;

    if (result === 'hit') {
      const shipId = clone.lookupCoords([x, y]).ship;
      const ship = clone.ships[shipId];
      clone.ships[shipId] = ship.hit();
    }
    return clone;
  }

  checkAllShipsSunk() {
    return this.ships.filter((x) => x.isSunk()).length === this.ships.length;
  }

  checkValidAttack([x, y]) {
    const { status } = this.lookupCoords([x, y]);
    return status === 'empty' || status === 'filled';
  }

  generateRandomCoordinates(lastAIAttack) {
    if (lastAIAttack?.status === 'hit') {
      const targets = this.coordinates.filter((cell) => this.checkValidAttack(cell.coords)
        // These are the adjacent coordinates in our grid
        && ((cell.coords[0] === lastAIAttack.coords[0] + 1
          && cell.coords[1] === lastAIAttack.coords[1])
        || (cell.coords[0] === lastAIAttack.coords[0] - 1
          && cell.coords[1] === lastAIAttack.coords[1])
        || (cell.coords[1] === lastAIAttack.coords[1] + 1
          && cell.coords[0] === lastAIAttack.coords[0])
        || (cell.coords[1] === lastAIAttack.coords[1] - 1
          && cell.coords[0] === lastAIAttack.coords[0])
        ));
      if (targets.length) {
        return _.sample(targets).coords;
      }
    }
    return _.sample(this.coordinates.filter((cell) => this.checkValidAttack(cell.coords))).coords;
  }

  generateRandomShipCoordinates(direction, length) {
    return _.sample(this.coordinates.filter((cell) => {
      const [x, y] = cell.coords;
      return (direction === 'column')
        ? this.validateVertical([x, y], length)
        : this.validateHorizontal([x, y], length);
    })).coords;
  }

  // Check for out of bounds coordinates or cells that are already filled
  // Our grid is 10 x 10
  static checkValidCoordinates(cell) {
    const [x, y] = cell.coords;
    return x < 10 && y < 10 && x >= 0 && y >= 0 && cell.status !== 'filled';
  }

  validateVertical([x, y], length) {
    const toCheck = this.coordinates.filter((cell) =>
      cell.coords[0] < (x + length)
      && cell.coords[0] >= x
      && cell.coords[1] === y);
    const toReturn = toCheck.map((e) => Gameboard.checkValidCoordinates(e));
    return !toReturn.includes(false) && toReturn.length === length;
  }

  validateHorizontal([x, y], length) {
    const toCheck = this.coordinates.filter((cell) =>
      cell.coords[0] === x
      && cell.coords[1] >= y
      && cell.coords[1] < y + length);
    const toReturn = toCheck.map((e) => Gameboard.checkValidCoordinates(e));
    return !toReturn.includes(false) && toReturn.length === length;
  }
}

export default Gameboard;
