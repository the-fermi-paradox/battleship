import Ship from './Ship';

class AI {
  constructor() {
    this.ships = [
      new Ship(5),
      new Ship(4),
      new Ship(3),
      new Ship(2),
    ];
  }

  placeAIShip(board) {
    let coords = [15, 15];
    const direction = Math.random() > 0.5 ? 'column' : 'row';
    const ship = this.ships.pop();
    while (!(direction === 'row' && board.validateHorizontal(coords, ship.length))
      || !(direction === 'column' && board.validateVertical(coords, ship.length))) {
      coords = board.generateRandomCoordinates();
    }
    return board.placeShip(ship, coords, direction);
  }
}

export default AI;
