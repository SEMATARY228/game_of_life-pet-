const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
app.disable('x-powered-by');
app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:3001', 'https://game-of-life-pet-95w2.vercel.app'] }));
app.use(express.json({ limit: "2mb" }));

app.post("/api/boards", (req, res) => {
  const { name, grid, generation } = req.body;

  if (!name || !grid) {
    return res.status(400).json({ error: "name and grid are required" });
  }

  const stmt = db.prepare(
    "INSERT INTO boards (name, grid_data, generation) VALUES (?, ?, ?)"
  );
  const result = stmt.run(name, JSON.stringify(grid), generation || 0);

  res.status(201).json({ id: result.lastInsertRowid });
});

app.get("/api/boards", (req, res) => {
  const rows = db
    .prepare("SELECT id, name, generation, created_at FROM boards ORDER BY created_at DESC")
    .all();
  res.json(rows);
});

app.get("/api/boards/:id", (req, res) => {
  const row = db
    .prepare("SELECT * FROM boards WHERE id = ?")
    .get(req.params.id);

  if (!row) {
    return res.status(404).json({ error: "Board not found" });
  }

  res.json({
    id: row.id,
    name: row.name,
    grid: JSON.parse(row.grid_data),
    generation: row.generation,
    created_at: row.created_at,
  });
});

app.delete("/api/boards/:id", (req, res) => {
  const result = db.prepare("DELETE FROM boards WHERE id = ?").run(req.params.id);

  if (result.changes === 0) {
    return res.status(404).json({ error: "Board not found" });
  }

  res.status(204).send();
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
