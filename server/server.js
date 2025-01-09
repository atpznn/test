import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import {
  readJSONFile,
  writeJSONFile,
  addNewItem,
  updateItem,
  deleteItem,
} from "./jsonManager.js";

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.get("/pencils", (req, res) => {
  const jsonData = readJSONFile();
  if (jsonData && jsonData.pencils) {
    res.json(jsonData.pencils);
  } else {
    res
      .status(500)
      .json({ error: "Error reading data or invalid JSON structure." });
  }
});

app.get("/pencils/:index", (req, res) => {
  const { index } = req.params;
  const jsonData = readJSONFile();
  if (jsonData && jsonData.pencils && jsonData.pencils[index]) {
    res.json(jsonData.pencils[index]);
  } else {
    res.status(404).json({ error: "Pencil not found at the given index." });
  }
});

app.put("/pencils/:index", (req, res) => {
  const { index } = req.params;
  const updatedPencil = req.body;
  try {
    updateItem(parseInt(index), updatedPencil);
    res.json({ message: "Pencil updated successfully.", updatedPencil });
  } catch (error) {
    res.status(500).json({ error: "Error updating pencil." });
  }
});

app.post("/pencils/:color", (req, res) => {
  const { color } = req.body;
  try {
    addNewItem({ color: color, qty: 1 });
    res.json({ message: "New pencil added successfully.", newPencil });
  } catch (error) {
    res.status(500).json({ error: "Error adding new pencil." });
  }
});

app.delete("/pencils/:color", (req, res) => {
  const { color } = req.params;
  try {
    const jsonData = readJSONFile();
    const index = jsonData.pencils.findIndex((x) => x.color == color);
    deleteItem(parseInt(index));
    res.json({ message: `Pencil at index ${index} deleted successfully.` });
  } catch (error) {
    res.status(500).json({ error: "Error deleting pencil." });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
