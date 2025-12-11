const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// Temporary local data store (without database)
let students = [];

// Add data
app.post("/add", (req, res) => {
  const { name, rank } = req.body;
  students.push({ name, rank });
  res.json({ message: "Student added", students });
});

// Get all data
app.get("/students", (req, res) => {
  res.json(students);
});

app.get("/", (req, res) => {
  res.send("Backend running without database ✔️");
});

app.listen(5000, () => console.log("Server running on port 5000"));
