export default class Board {
  constructor() {
    this.board = [];
  }

  renderBoard() {
    const fields = [];
    for (const [i, row] of this.board.entries()) {
      for (const j of row.entries()) {
        fields.push(`
          <div class="field" 
            style="grid-row:${i + 1};grid-column:${j + 1};">
          </div>
        `);
      }
    }

    const boardEl = document.getElementById('board');
    boardEl.innerHTML = fields.join('');
  }

  createBoard() {
    const size = 4;
    for (let i = 0; i < size; i += 1) {
      const boardRow = [];
      for (let j = 0; j < size; j += 1) {
        boardRow.push('');
      }
      this.board.push(boardRow);
    }
    this.renderBoard();
  }
}
