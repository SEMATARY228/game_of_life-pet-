import { useCallback, useRef, useState } from "react";
import "./App.css";

const ROWS = 25;
const COLS = 25;

const operations = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0],
];

const PATTERNS = {
  glider: [
    [0, 1],
    [1, 2],
    [2, 0],
    [2, 1],
    [2, 2],
  ],
};

function createEmptyGrid() {
  return Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => 0),
  );
}

function createRandomGrid() {
  return Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => (Math.random() > 0.7 ? 1 : 0))
  );
}

function applyPattern(pattern: number[][], startRow: number, startCol: number) {
  const newGrid = createEmptyGrid();
  pattern.forEach(([r, c]) => {
    const row = startRow + r;
    const col = startCol + c;
    if (row < ROWS && col < COLS) {
      newGrid[row][col] = 1;
    }
  });
  return newGrid;
}

function App() {
  const [grid, setGrid] = useState(createEmptyGrid());
  const [running, setRunning] = useState(false);

  const runningRef = useRef(running);
  runningRef.current = running;

  const runSimulation = useCallback(() => {
    if (!runningRef.current) return;

    setGrid((g) => {
      const newGrid = g.map((arr) => [...arr]);

      for (let i = 0; i < ROWS; i++) {
        for (let j = 0; j < COLS; j++) {
          let neighbors = 0;

          operations.forEach(([x, y]) => {
            const newI = i + x;
            const newJ = j + y;

            if (newI >= 0 && newI < ROWS && newJ >= 0 && newJ < COLS) {
              neighbors += g[newI][newJ];
            }
          });

          if (neighbors < 2 || neighbors > 3) {
            newGrid[i][j] = 0;
          } else if (g[i][j] === 0 && neighbors === 3) {
            newGrid[i][j] = 1;
          }
        }
      }

      return newGrid;
    });

    setTimeout(runSimulation, 200);
  }, []);

  const toggleCell = (row: number, col: number) => {
    const newGrid = grid.map((arr) => [...arr]);

    newGrid[row][col] = grid[row][col] ? 0 : 1;

    setGrid(newGrid);
  };

  return (
    <div className="container">
      <h1>Conway's Game of Life</h1>

      <div style={{ marginBottom: 20 }}>
        <button
          onClick={() => {
            setRunning(true);
            runningRef.current = true;
            runSimulation();
          }}
        >
          Start
        </button>

        <button
          onClick={() => {
            setRunning(false);
          }}
        >
          Stop
        </button>

        <button
          onClick={() => {
            setGrid(createEmptyGrid());
          }}
        >
          Clear
        </button>

        <button
          onClick={() => {
            setGrid(createRandomGrid());
          }}
        >
          Random
        </button>
      </div>

      <button
        onClick={() => {
          setGrid(applyPattern(PATTERNS.glider, 5, 5));
        }}
      >
        Glider
      </button>

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
                backgroundColor: grid[rowIndex][colIndex] ? "#222" : "#fff",
              }}
            />
          )),
        )}
      </div>
    </div>
  );
}

export default App;
