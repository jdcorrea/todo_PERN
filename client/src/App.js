import React, { Fragment } from "react";
import "./App.css";

//components
import InputTodo from "./components/InputTodo";
import ListTodos from "./components/ListTodos";

function App() {
	return (
		<Fragment>
			<section className="container">
				<InputTodo />
				<ListTodos />
			</section>
		</Fragment>
	);
}

export default App;
