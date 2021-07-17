import init from './init';
import loop from './loop';
import Gameboard from './model/Gameboard';

(() => {
  const startingState = init();
  const history = [];
  history.push(startingState);
  let round = 0;
  let player = 0;

  document.body.addEventListener('click', (event) => {
    if (event.target.classList.includes('cell')) {
      const coordinates = event.target.id.split('-');
      Gameboard.checkValidAttack(coordinates);
      const state = loop(history[history.length - 1], player, coordinates);
      // update our closure variables
      history.push(state);
      round += 1;
      player = round % 2;
    }
  });
})();
