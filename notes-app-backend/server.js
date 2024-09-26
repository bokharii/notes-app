const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

const Note = mongoose.model("Note", noteSchema);

app.get("/", (req, res) => {
  res.send("Welcome to my Notes API!");
});

app.post("/api/notes", async (req, res) => {
  const { title, content } = req.body;
  const newNote = new Note({ title, content });
  try {
    await newNote.save();
    res.status(201).json(newNote);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
