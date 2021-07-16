import _ from 'lodash';

class Ship {
  constructor(length) {
    this.hits = 0;
    this.length = length;
  }

  hit() {
    const clone = _.cloneDeep(this);
    clone.hits += 1;
    return clone;
  }

  isSunk() {
    return this.hits >= this.length;
  }
}
export default Ship;
