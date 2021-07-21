class Render {
  static displayVictory() {
    document.getElementById('main').remove();
    const victoryText = document.createElement('h1');
    victoryText.textContent = 'You are victorious!';
    document.body.append(victoryText);
  }

  static displayGameOver() {
    document.getElementById('main').remove();
    const defeatText = document.createElement('h1');
    defeatText.textContent = 'Game Over';
    document.body.append(defeatText);
  }

  static clearHighlight([x, y], ship, direction) {
    for (let i = 0; i < ship.length; i += 1) {
      if (direction === 'row') {
        const result = document.getElementById(`${x}-${y + i}`);
        result?.classList?.remove('highlight');
      }
      if (direction === 'column') {
        const result = document.getElementById(`${x + i}-${y}`);
        result?.classList?.remove('highlight');
      }
    }
  }

  static addHighlight([x, y], ship, direction) {
    for (let i = 0; i < ship.length; i += 1) {
      if (direction === 'row') {
        const result = document.getElementById(`${x}-${y + i}`);
        result?.classList?.add('highlight');
      }
      if (direction === 'column') {
        const result = document.getElementById(`${x + i}-${y}`);
        result?.classList?.add('highlight');
      }
    }
  }

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

  static drawShips(ships) {
    document.getElementById('ship-storage')?.remove();

    const main = document.getElementById('main');
    const shipsDiv = document.createElement('div');
    shipsDiv.id = 'ship-storage';
    const shipsList = ships.map((ship, index) => Render.drawShip(ship, index));
    shipsDiv.append(...shipsList);
    shipsDiv.classList.add('ship-storage');
    main.append(shipsDiv);

    return shipsDiv;
  }

  static drawShip(ship, index) {
    const div = document.createElement('div');
    div.classList.add('ship');
    div.id = index;
    for (let i = 0; i < ship.length; i += 1) {
      const shipSquare = document.createElement('div');
      shipSquare.classList.add('ship-square');
      div.append(shipSquare);
    }
    return div;
  }

  static drawCell(cell, player) {
    const cellElement = document.createElement('div');
    cellElement.id = `${cell.coords[0]}-${cell.coords[1]}`;
    cellElement.classList.add('cell', cell.status, player);
    return cellElement;
  }
}

export default Render;
