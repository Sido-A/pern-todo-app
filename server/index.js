const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

// Middleware
app.use(cors());
app.use(express.json());

//Routes

//POST a todo
app.post("/create-todo", async (req, res) => {
  try {
    console.log(req.body);
  } catch (err) {
    console.error(err.message);
  }
});
//GET all todo

//GET a todo

//PUT a todo

//DELETE a todo

app.listen(3000, () => console.log("App listening on port 3000"));
