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
  blinker: [
    [0, 0],
    [0, 1],
    [0, 2],
  ],
  toad: [
    [0, 1],
    [0, 2],
    [0, 3],
    [1, 0],
    [1, 1],
    [1, 2],
  ],
  beacon: [
    [0, 0],
    [0, 1],
    [1, 0],
    [2, 3],
    [3, 2],
    [3, 3],
  ],
  pulsar: [
    [0, 2],
    [0, 3],
    [0, 4],
    [0, 8],
    [0, 9],
    [0, 10],
    [2, 0],
    [2, 5],
    [2, 7],
    [2, 12],
    [3, 0],
    [3, 5],
    [3, 7],
    [3, 12],
    [4, 0],
    [4, 5],
    [4, 7],
    [4, 12],
    [4, 2],
    [4, 3],
    [4, 4],
    [4, 8],
    [4, 9],
    [4, 10],
    [6, 2],
    [6, 3],
    [6, 4],
    [6, 8],
    [6, 9],
    [6, 10],
    [7, 0],
    [7, 5],
    [7, 7],
    [7, 12],
    [8, 0],
    [8, 5],
    [8, 7],
    [8, 12],
    [9, 0],
    [9, 5],
    [9, 7],
    [9, 12],
    [10, 2],
    [10, 3],
    [10, 4],
    [10, 8],
    [10, 9],
    [10, 10],
  ],
};

function createEmptyGrid() {
  return Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => 0),
  );
}

function createRandomGrid() {
  return Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => (Math.random() > 0.7 ? 1 : 0)),
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

function getColor(age: number): string {
  if (age === 0) return "#fff";
  const intensity = Math.min(age, 20);
  const t = intensity / 20; // 0.0 → 1.0

  const r = Math.round(255 - t * (255 - 120)); // 255 → 120
  const g = Math.round(210 - t * 210); // 210 → 0
  const b = Math.round(0);

  return `rgb(${r}, ${g}, ${b})`;
}

function App() {
  const [grid, setGrid] = useState(createEmptyGrid());
  const [running, setRunning] = useState(false);

  const [generation, setGeneration] = useState(0);
  const [speed, setSpeed] = useState(200);
  const speedRef = useRef(speed);
  speedRef.current = speed;

  const runningRef = useRef(running);
  runningRef.current = running;

  const runSimulation = useCallback(() => {
    if (!runningRef.current) return;

    setGeneration((g) => g + 1);

    setGrid((g) => {
      const newGrid = g.map((arr) => [...arr]);

      for (let i = 0; i < ROWS; i++) {
        for (let j = 0; j < COLS; j++) {
          let neighbors = 0;

          operations.forEach(([x, y]) => {
            const newI = i + x;
            const newJ = j + y;

            if (newI >= 0 && newI < ROWS && newJ >= 0 && newJ < COLS) {
              neighbors += g[newI][newJ] > 0 ? 1 : 0;
            }
          });

          if (neighbors < 2 || neighbors > 3) {
            newGrid[i][j] = 0;
          } else if (g[i][j] === 0 && neighbors === 3) {
            newGrid[i][j] = 1;
          } else if (g[i][j] > 0) {
            newGrid[i][j] = g[i][j] + 1;
          }
        }
      }

      return newGrid;
    });

    setTimeout(runSimulation, speedRef.current);
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
            setGeneration(0);
          }}
        >
          Clear
        </button>

        <button
          onClick={() => {
            setGrid(createRandomGrid());
            setGeneration(0);
          }}
        >
          Random
        </button>
      </div>

      <button
        onClick={() => {
          setGrid(applyPattern(PATTERNS.glider, 5, 5));
          setGeneration(0);
        }}
      >
        Glider
      </button>

      <button
        onClick={() => {
          setGrid(applyPattern(PATTERNS.blinker, 12, 11));
          setGeneration(0);
        }}
      >
        blinker
      </button>

      <button
        onClick={() => {
          setGrid(applyPattern(PATTERNS.toad, 11, 10));
          setGeneration(0);
        }}
      >
        toad
      </button>

      <button
        onClick={() => {
          setGrid(applyPattern(PATTERNS.beacon, 10, 10));
          setGeneration(0);
        }}
      >
        beacon
      </button>

      <button
        onClick={() => {
          setGrid(applyPattern(PATTERNS.pulsar, 6, 6));
          setGeneration(0);
        }}
      >
        pulsar
      </button>
      <div
        style={{
          marginBottom: 10,
          display: "flex",
          gap: 20,
          alignItems: "center",
        }}
      >
        <span>Поколение: {generation}</span>
        <span>Живых: {grid.flat().filter((c) => c > 0).length}</span>
        <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
          Скорость:
          <input
            type="range"
            min={50}
            max={1000}
            step={50}
            value={speed}
            onChange={(e) => {
              const val = Number(e.target.value);
              setSpeed(val);
              speedRef.current = val;
            }}
          />
          {speed}мс
        </label>
      </div>

      <div
        className="grid"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${COLS}, 20px)`,
        }}
      >
        {grid.map((rows, rowIndex) =>
          rows.map((_, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              onClick={() => { toggleCell(rowIndex, colIndex); }}
              style={{
                width: 20,
                height: 20,
                border: "solid 1px #444",
                backgroundColor: getColor(grid[rowIndex][colIndex]),
              }}
            />
          )),
        )}
      </div>
    </div>
  );
}

export default App;
