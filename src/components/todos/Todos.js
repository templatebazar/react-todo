import React, { Fragment } from "react";
import classNames from "classnames";

const Todos = ({ todos, deleteTodo, completeTodo, onSetActiveTodo }) => {
  return (
    <table className="table is-bordered  is-fullwidth">
      <thead>
        <tr>
          <th>#</th>
          <th>todo</th>
          <th>completed</th>
          <th>actions</th>
        </tr>
      </thead>
      <tbody>
        {todos.map((todo) => (
          <tr key={todo.id}>
            <td>{todo.id}</td>
            <td className={classNames({ completed: todo.completed })}>
              {todo.title}
            </td>
            <td>
              {todo.completed ? (
                <span className="tag is-success">yes</span>
              ) : (
                <Fragment>
                  <label className="checkbox">
                    <input
                      type="checkbox"
                      onClick={() => completeTodo(todo.id)}
                    />
                    <span className="tag is-light">no</span>
                  </label>
                </Fragment>
              )}
            </td>
            <td>
              <button
                className="button margin-right-small"
                disabled={todo.completed}
                onClick={() => onSetActiveTodo(todo)}
              >
                edit
              </button>
              <button className="button" onClick={() => deleteTodo(todo.id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Todos;
