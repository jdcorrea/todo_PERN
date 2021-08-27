const express = require("express");
const cors = require("cors");
const app = express();
const pool = require("./db");

const defaultPort = 5000;

//middleware
app.use(cors());
app.use(express.json());

//Routes

//create a todo

app.post("/todos", async (req, res) => {
	try {
		const { description } = req.body;
		const newTodo = await pool.query(
			`INSERT INTO todo (description) 
          VALUES($1) RETURNING *`,
			[description]
		);
		res.json(newTodo.rows[0]);
	} catch (err) {
		console.log(err.message);
	}
});

//get all todo
app.get("/todos", async (req, res) => {
	try {
		const allTodos = await pool.query(`SELECT * FROM todo`);
		res.json(allTodos.rows);
	} catch (err) {
		console.log(err);
	}
});

//get a todo
app.get("/todos/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const todo = await pool.query(`SELECT * FROM todo WHERE todo_id = $1`, [
      id,
		]);
		res.json(todo.rows);
	} catch (err) {
    console.log(err);
	}
});

//update a todo
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
		const updateTodo = await pool.query(
			`UPDATE todo SET description = $1 WHERE todo_id = $2`,
			[description, id]
		);
		res.json(updateTodo.rows);
	} catch (err) {
		console.log(err);
	}
});

//delete a todo
app.delete("/todos/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const deleteTodo = await pool.query(`DELETE fROM todo WHERE todo_id = $1`, [
			id,
		]);
		res.json("todos was deleted");
	} catch (err) {
		console.log(err);
	}
});

app.listen(defaultPort, () => {
	console.log(`server has started on port ${defaultPort}`);
});
