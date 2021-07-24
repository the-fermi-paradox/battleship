import init from './init';
import Ship from './model/Ship';
import AI from './model/AI';
import Render from './view/Render';

(() => {
  const startingState = init();
  const history = [];
  const ships = [
    new Ship(6),
    new Ship(5),
    new Ship(4),
    new Ship(3),
    new Ship(2),
  ];
  let direction = 'column';
  let lastAIAttack = null;
  let ship = null;
  let gameStarted = false;
  history.push(startingState);
  const ai = new AI();
  Render.drawGameboard(startingState[1], 'player');
  Render.drawShips(ships);

  document.body.addEventListener('contextmenu', (event) => {
    if (ship) {
      const oldDirection = direction;
      event.preventDefault();
      direction = (direction === 'column')
        ? 'row'
        : 'column';
      if (event.target.closest('.cell')) {
        const [x, y] = event.target.closest('.cell').id.split('-').map((e) => parseInt(e, 10));
        Render.clearHighlight([x, y], ship, oldDirection);
        Render.addHighlight([x, y], ship, direction);
      }
    }
  });

  document.body.addEventListener('mouseover', (event) => {
    if (event.target.closest('.cell') && ship) {
      const [x, y] = event.target.closest('.cell').id.split('-').map((e) => parseInt(e, 10));
      Render.addHighlight([x, y], ship, direction);
    }
  });

  document.body.addEventListener('mouseout', (event) => {
    if (event.target.closest('.cell') && ship) {
      const [x, y] = event.target.closest('.cell').id.split('-').map((e) => parseInt(e, 10));
      Render.clearHighlight([x, y], ship, direction);
    }
  });

  document.body.addEventListener('click', (event) => {
    // Handles clicking on a ship to select it
    if (event.target.closest('.ship')) {
      ship = ships[event.target.closest('.ship').id];
      return;
    }

    // Handles clicking on the player grid to place a ship
    if (event.target.closest('.cell')
      && ship) {
      const self = event.target.closest('.cell');
      const [x, y] = self.id.split('-').map((e) => parseInt(e, 10));
      const [aiBoard, plBoard] = history[history.length - 1];
      const { length } = ship;
      if ((direction === 'row' && plBoard.validateHorizontal([x, y], length))
      || (direction === 'column' && plBoard.validateVertical([x, y], length))) {
        const newPlBoard = plBoard.placeShip(ship, [x, y], direction);
        Render.drawGameboard(newPlBoard, 'player');

        // Remove the placed ship from the array of player ships
        ships.splice(ships.indexOf(ship), 1);
        ship = null;
        Render.drawShips(ships);

        const newAiBoard = ai.placeAIShip(aiBoard);

        // TODO: Trigger next phase if ships are all placed
        if (ships.length === 0) {
          gameStarted = true;
          document.getElementById('ship-storage').remove();
          Render.drawGameboard(newPlBoard, 'player');
          Render.drawGameboard(newAiBoard, 'ai');
        }
        history.push([newAiBoard, newPlBoard]);
        return;
      }
    }

    // Don't handle these events if the game hasn't started yet
    if (!gameStarted) return;

    // Handles clicking on the AI grid to open fire
    if (event.target.classList.contains('cell')
    && event.target.classList.contains('ai')) {
      const [aiBoard, plBoard] = history[history.length - 1];
      const [x, y] = event.target.id.split('-').map((e) => parseInt(e, 10));
      if (!aiBoard.checkValidAttack([x, y])) { return; }

      // The player's turn is evaluated and a new board for the AI is generated
      const newAIBoard = aiBoard.receiveAttack([x, y]);
      // It's now the AI's turn
      const randCoords = plBoard.generateRandomCoordinates(lastAIAttack);
      const newPlBoard = plBoard.receiveAttack(randCoords);
      const lastAttack = newPlBoard.lookupCoords(randCoords);
      if (lastAttack.status === 'hit') {
        lastAIAttack = lastAttack;
      }

      if (newPlBoard.checkAllShipsSunk()) {
        Render.displayGameOver();
        return;
      }
      if (newAIBoard.checkAllShipsSunk()) {
        Render.displayVictory();
        return;
      }

      Render.drawGameboard(newPlBoard, 'player');
      Render.drawGameboard(newAIBoard, 'ai');
      // Record our new state
      history.push([newAIBoard, newPlBoard]);
    }
  });
})();
