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
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );
    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//GET all todo
app.get("/todos", async (req, res) => {
  try {
    const allTodo = await pool.query("SELECT * FROM todo");
    res.json(allTodo.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//GET a todo
app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query(`SELECT * FROM todo WHERE todo_id=$1`, [id]);
    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//PUT a todo
app.put("/todos/:id", async (req, res) => {
  try {
    const { description } = req.body;
    const { id } = req.params;
    const updateTodo = await pool.query(
      `UPDATE todo SET description=$1 WHERE todo_id=$2;`,
      [description, id]
    );
    res.json("Todo updated");
  } catch (err) {
    console.error(err.message);
  }
});

//DELETE a todo
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id=$1", [
      id,
    ]);
    res.json(`todo_id:${id}, has been deleted`);
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(3000, () => console.log("App listening on port"));
