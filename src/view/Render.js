class Render {
  static drawGameboard(gameboard, player) {
    // Clear the old grid
    document.getElementById(player)?.remove();

    // Redraw
    const main = document.getElementById('main');
    const cells = gameboard.coordinates.map((cell) => Render.drawCell(cell, player));
    const grid = document.createElement('div');
    grid.id = player;
    grid.classList.add('grid', player);

    // Append
    grid.append(...cells);
    main.append(grid);

    // Return the newly created grid just in case.
    return grid;
  }

  static drawCell(cell, player) {
    const cellElement = document.createElement('div');
    cellElement.id = `${cell.coords[0]}-${cell.coords[1]}`;
    cellElement.classList.add('cell', cell.status, player);
    return cellElement;
  }
}

export default Render;
