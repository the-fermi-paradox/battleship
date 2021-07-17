import init from './init';
import Gameboard from './model/Gameboard';
import AI from './model/AI';

(() => {
  const startingState = init();
  const history = [];
  history.push(startingState);

  document.body.addEventListener('click', (event) => {
    if (event.target.classList.contains('cell')
    && event.target.classList.contains('ai')) {
      const coordinates = event.target.id.split('-');
      if (!Gameboard.checkValidAttack(coordinates)) { return; }

      // The player's turn is evaluated and a new board for the AI is generated
      const aiBoard = history[history - history.length][0].receiveAttack(coordinates);

      // It's now the AI's turn
      const randCoords = AI.generateRandomCoordinates();
      const playerBoard = history[history - history.length][1].receiveAttack(randCoords);

      history.push([aiBoard, playerBoard]);
    }
  });
})();
