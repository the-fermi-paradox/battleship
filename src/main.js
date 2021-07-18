import init from './init';
import Ship from './model/Ship';

(() => {
  const startingState = init();
  const history = [];
  const ships = {
    carrier: 5,
    battleship: 4,
    frigate: 3,
    cruiser: 2,
    patrol: 1,
  };
  const direction = 'column';
  let shipSelected = null;
  history.push(startingState);

  document.body.addEventListener('click', (event) => {
    if (event.target.classList.contains('ship')) {
      shipSelected = event.target.name;
      return;
    }

    if (event.target.classList.contains('cell')
      && shipSelected) {
      const [x, y] = event.target.id.split('-');
      const length = ships[shipSelected];
      const state = history[history.length - 1];

      if ((direction === 'row' && state[1].validateHorizontal([x, y], length))
      || (direction === 'column' && state[1].validateVertical([x, y], length))) {
        const ship = new Ship(length);
        const player = state[1].placeShip(ship, [x, y], direction);
        shipSelected = null;
        // TODO: AI places ship
        const temp = state[0];
        history.push([temp, player]);
        return;
      }
    }

    if (event.target.classList.contains('cell')
    && event.target.classList.contains('ai')) {
      const currentState = history[history.length - 1];
      const coordinates = event.target.id.split('-');
      if (currentState[0].checkValidAttack(coordinates)) { return; }

      // The player's turn is evaluated and a new board for the AI is generated
      const aiBoard = currentState[0].receiveAttack(coordinates);

      // It's now the AI's turn
      const randCoords = currentState[1].generateRandomCoordinates();
      const playerBoard = currentState[1].receiveAttack(randCoords);

      // Record our new state
      history.push([aiBoard, playerBoard]);
    }
  });
})();
