import init from '../src/init';
import Gameboard from '../src/model/Gameboard';

test('gameboards exist', () => {
  const state = init();
  expect(state[0]).toBeInstanceOf(Gameboard);
});
