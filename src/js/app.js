import Board from './Board';
import Game from './Game';

window.addEventListener('load', () => {
  const board = new Board();
  board.createBoard();

  const game = new Game();
  game.start();
});
