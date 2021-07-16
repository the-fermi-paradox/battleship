import _ from 'lodash';

class Ship {
  constructor(length) {
    this.positions = Array(length);
    this.length = length;
  }

  hit(int) {
    const clone = _.cloneDeep(this);
    clone.positions[int] = 1;
    return clone;
  }

  isSunk() {
    if (this.positions.includes(undefined)) {
      return false;
    }
    return true;
  }
}
export default Ship;
