const express = require("express");
const Note = require("../models/notes");
const router = express.Router();

router.get("/", (req, res) => {
  try {
    res.send("Welcome to my Notes API!");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  const { title, content } = req.body;
  const newNote = new Note({ title, content });
  try {
    await newNote.save();
    res.status(201).json(newNote);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;