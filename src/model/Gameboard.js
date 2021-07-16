import _ from 'lodash';

const Gameboard = () => {
  const coordinates = Array(10).fill(0)
    .map(() => Array(10).fill({ status: 'empty', ship: {} }));

  const ships = [];
  const placeShip = (game, ship) => {
    const clone = _.cloneDeep(game);
    const cloneShip = _.cloneDeep(ship);
    clone.ships.push(cloneShip);
    return clone;
  };
  const receiveAttack = (game, [x, y]) => {
    const { status } = game.coordinates[x][y];
    const result = (status === 'empty') ? 'miss' : 'hit';
    const clone = _.cloneDeep(game);
    clone.coordinates[x][y].status = result;
    const ship = clone.coordinates[x][y]?.ship;
    console.log(ship);
    clone.coordinates[x][y].ship = ship?.hit(ship, [x, y]) || null;
    return clone;
  };
  return {
    coordinates,
    ships,
    receiveAttack,
    placeShip,
  };
};

export default Gameboard;
