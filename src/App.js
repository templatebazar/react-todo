import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Header from "./components/layout/Header";
import Todos from "./components/todos/Todos";
import TodoForm from "./components/todos/TodoForm";

function App() {
  const [todos, setTodos] = useState([]);
  const [activeTodo, setActiveTodo] = useState(null);

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    const result = await axios.get("http://localhost:3004/todos");
    setTodos(result.data.reverse());
  };

  const addTodo = (todo) => {
    setTodos([todo, ...todos]);
  };

  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:3004/todos/${id}`);
    const deletedTodos = todos.filter((todo) => todo.id != id);
    setTodos(deletedTodos);
    setActiveTodo(null);
  };

  const completeTodo = async (id) => {
    const completedTodo = Object.assign(
      todos.find((todo) => todo.id == id),
      { completed: true }
    );
    const res = await axios.put(
      `http://localhost:3004/todos/${id}`,
      completedTodo
    );
    const updatedTodos = todos.map((todo) => (todo.id == id ? res.data : todo));

    setTodos(updatedTodos);
  };

  const onSetActiveTodo = (todo) => {
    setActiveTodo(todo);
    console.log(todo);
  };

  const updateTodo = (todo) => {
    const updatedTodos = todos.map((todoItem) =>
      todoItem.id == todo.id ? todo : todoItem
    );
    setTodos(updatedTodos);
    setActiveTodo(null);
  };

  return (
    <div className="App">
      <Header />
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-9">
              <Todos
                todos={todos}
                deleteTodo={deleteTodo}
                onSetActiveTodo={onSetActiveTodo}
                completeTodo={completeTodo}
              />
            </div>
            <div className="column is-3">
              <TodoForm
                addTodo={addTodo}
                activeTodo={activeTodo}
                updateTodo={updateTodo}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
