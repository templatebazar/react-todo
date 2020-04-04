import React, { Fragment, useState, useEffect, useRef } from "react";
import axios from "axios";
import classNames from "classnames";

const TodoForm = ({ addTodo, activeTodo, updateTodo }) => {
  const inputRef = useRef();
  const [text, setText] = useState("");

  useEffect(() => {
    if (activeTodo) {
      setText(activeTodo.title);
      inputRef.current.focus();
    } else {
      setText("");
    }
  }, [activeTodo]);

  const onSubmit = async (e) => {
    e.preventDefault();
    // check if todo for updatation or for new todo
    if (activeTodo) {
      const UpdtTodo = Object.assign(activeTodo, { title: text });
      const res = await axios.put(
        `http://localhost:3004/todos/${activeTodo.id}`,
        UpdtTodo
      );

      updateTodo(res.data);
    } else {
      let newTodo = {
        title: text,
        completed: false,
      };

      newTodo = await axios.post("http://localhost:3004/todos", newTodo);
      addTodo(newTodo.data);
    }

    setText("");
  };

  return (
    <Fragment>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="field">
          <label className="label">Todo</label>
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="Enter Your Todo"
              value={text}
              onChange={(e) => setText(e.currentTarget.value)}
              ref={inputRef}
            />
          </div>
        </div>

        <div className="field is-grouped">
          <div className="control">
            <button
              className={classNames("button", {
                "is-link": !activeTodo,
                "is-warning": activeTodo,
              })}
            >
              {activeTodo ? "Update Todo" : "Add Todo"}
            </button>
            {activeTodo && (
              <button
                className="button is-light"
                style={{ marginLeft: "10px" }}
              >
                cancel
              </button>
            )}
          </div>
        </div>
      </form>
    </Fragment>
  );
};

export default TodoForm;
