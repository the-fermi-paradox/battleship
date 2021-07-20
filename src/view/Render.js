class Render {
  constructor(state) {
    [this.aiGameboard, this.playerGameboard] = state;
  }

  drawGameboard(gameboard) {
    const main = document.getElementById('main');
    const cells = this.playerGameboard.coordinates.map((cell) => this.drawCell(cell));
    const grid = document.createElement('div');
    grid.append(...cells);
    main.append(grid);
  }

  static drawCell(cell) {
    const cellElement = document.createElement('div');
    cellElement.id = `${cell.coords[0]}-${cell.coords[1]}`;
    cellElement.classList.add('cell', cell.status);
    return cellElement;
  }
}

export default Render;
