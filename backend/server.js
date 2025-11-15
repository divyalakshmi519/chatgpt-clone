const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5000;
const DATA_FILE = path.join(__dirname, "mockData.json");

app.use(cors());
app.use(express.json());

function readData() {
  try {
    const raw = fs.readFileSync(DATA_FILE, "utf8");
    return JSON.parse(raw);
  } catch (e) {
    return {};
  }
}

function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf8");
}


app.get("/api/sessions", (req, res) => {
  const data = readData();
  const list = Object.values(data).sort((a,b) => b.createdAt - a.createdAt);
  res.json(list);
});


app.get("/api/new-chat", (req, res) => {
  const data = readData();
  const id = Date.now().toString();
  data[id] = {
    id,
    title: `Session ${Object.keys(data).length + 1}`,
    createdAt: Date.now(),
    history: []
  };
  writeData(data);
  res.json({ id });
});


app.get("/api/session/:id", (req, res) => {
  const id = req.params.id;
  const data = readData();
  const session = data[id];
  if (!session) return res.status(404).json({ error: "Session not found" });
  res.json(session);
});


app.post("/api/chat/:id", (req, res) => {
  const id = req.params.id;
  const question = (req.body.question || "").trim();
  if (!question) return res.status(400).json({ error: "Question required" });

  const data = readData();
  if (!data[id]) {
    data[id] = { id, title: `Session ${id}`, createdAt: Date.now(), history: [] };
  }

  const answer = {
    description: `Mock answer for: "${question}"`,
    table: [
      { key: "Query", value: question.slice(0, 100) },
      { key: "Type", value: "Mock Data" },
      { key: "GeneratedAt", value: new Date().toLocaleString() }
    ]
  };

  answer.table.push({ key: "Confidence", value: `${Math.floor(Math.random()*30)+70}%` });

  data[id].history.push({ question, answer, feedback: null });

  writeData(data);
  res.json(answer);
});


app.post("/api/feedback/:id", (req, res) => {
  const id = req.params.id;
  const { index, feedback } = req.body; 
  const data = readData();
  if (!data[id]) return res.status(404).json({ error: "Session not found" });
  if (typeof index !== "number" || index < 0 || index >= data[id].history.length) {
    return res.status(400).json({ error: "Invalid index" });
  }
  data[id].history[index].feedback = feedback;
  writeData(data);
  res.json({ ok: true });
});


app.delete("/api/session/:id", (req, res) => {
  const id = req.params.id;
  const data = readData();
  if (!data[id]) return res.status(404).json({ error: "Session not found" });
  delete data[id];
  writeData(data);
  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
