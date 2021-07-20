import init from './init';
import Ship from './model/Ship';
import AI from './model/AI';
import Render from './view/Render';

(() => {
  const startingState = init();
  const history = [];
  const ships = [
    new Ship(5),
    new Ship(4),
    new Ship(3),
    new Ship(2),
  ];
  const direction = 'column';
  let ship = null;
  let gameStarted = false;
  history.push(startingState);
  const ai = new AI();
  Render.drawGameboard(startingState[0], 'ai');
  Render.drawGameboard(startingState[1], 'player');

  document.body.addEventListener('click', (event) => {
    // Handles clicking on a ship to select it
    if (event.target.classList.contains('ship')) {
      ship = ships[event.target.index];
      return;
    }

    // Handles clicking on the player grid to place a ship
    if (event.target.classList.contains('cell')
      && ship) {
      const [x, y] = event.target.id.split('-');
      const [aiBoard, plBoard] = history[history.length - 1];
      const { length } = ship;
      if ((direction === 'row' && plBoard.validateHorizontal([x, y], length))
      || (direction === 'column' && plBoard.validateVertical([x, y], length))) {
        const newPlBoard = plBoard.placeShip(ship, [x, y], direction);
        Render.drawGameboard(newPlBoard, 'player');

        // Remove the placed ship from the array of player ships
        ships.splice(ships.indexOf(ship), 1);
        ship = null;

        const newAiBoard = ai.placeAIShip(aiBoard);
        Render.drawGameboard(newAiBoard, 'ai');

        // TODO: Trigger next phase if ships are all placed
        if (ships.length === 0) {
          gameStarted = true;
        }
        history.push([newAiBoard, newPlBoard]);
      }
    }

    // Don't handle these events if the game hasn't started yet
    if (!gameStarted) return;

    // Handles clicking on the AI grid to open fire
    if (event.target.classList.contains('cell')
    && event.target.classList.contains('ai')) {
      const [aiBoard, plBoard] = history[history.length - 1];
      const coordinates = event.target.id.split('-');
      if (aiBoard.checkValidAttack(coordinates)) { return; }

      // The player's turn is evaluated and a new board for the AI is generated
      const newAIBoard = aiBoard.receiveAttack(coordinates);
      Render.drawGameboard(newAIBoard, 'ai');

      // It's now the AI's turn
      const randCoords = plBoard.generateRandomCoordinates();
      const newPlBoard = plBoard.receiveAttack(randCoords);
      Render.drawGameboard(newPlBoard, 'player');

      // Record our new state
      history.push([newAIBoard, newPlBoard]);
    }
  });
})();
