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
    const direction = Math.random() > 0.5 ? 'column' : 'row';
    const ship = this.ships.pop();
    const coords = board.generateRandomShipCoordinates(direction, ship.length);
    return board.placeShip(ship, coords, direction);
  }
}

export default AI;
