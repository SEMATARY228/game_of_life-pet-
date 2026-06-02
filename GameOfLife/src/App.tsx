import { useState } from "react";
import "./App.css";

const ROWS = 25;
const COLS = 25;

function createEmptyGrid() {
  return Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => 0)
  );
}

function App() {
  const [grid, setGrid] = useState(createEmptyGrid());

  const toggleCell = (row: number, col: number) => {
    const newGrid = grid.map((arr) => [...arr]);

    newGrid[row][col] = grid[row][col] ? 0 : 1;

    setGrid(newGrid);
  };

  return (
    <div className="container">
      <h1>Conway's Game of Life</h1>

      <div
        className="grid"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${COLS}, 20px)`,
        }}
      >
        {grid.map((rows, rowIndex) =>
          rows.map((col, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              onClick={() => toggleCell(rowIndex, colIndex)}
              style={{
                width: 20,
                height: 20,
                border: "solid 1px #444",
                backgroundColor: grid[rowIndex][colIndex]
                  ? "#222"
                  : "#fff",
              }}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default App;