import loop from '../src/loop';
import Gameboard from '../src/model/Gameboard';

test('returns a modified gameboard', () => {
  const state = new Gameboard();
  const currentPlayer = 1;
  const coordinates = [0, 1];
  expect(loop(state, currentPlayer, coordinates)).toBeInstanceOf(Gameboard);
});
