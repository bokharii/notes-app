const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

//middleware
app.use(cors());
app.use(bodyParser.json());

//connect to mongodb
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

const notesRouter = require('./routes/notes')
app.use('/api/notes', notesRouter)

app.get("/", (req, res) => {
  res.send("Welcome to my Notes API!");
});


const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`server is running on port: ${PORT}`);
});
