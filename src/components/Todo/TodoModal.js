import React from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import { getMeta } from "./Todo.js";
import AddItemInput from "./AddItemInput";
import TodoItems from "./TodoItems";
import "./TodoModal.css";

function TodoModal({ todos, setTodos, completeTodo }) {
  const [, setPersistedTodoList] = useLocalStorage("todoList", []);
  const addTodo = todo => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }
    const newTodos = [...todos, todo];
    setTodos(newTodos);
    setPersistedTodoList(newTodos);
  };

  const removeTodo = id => {
    const aftTodos = [...todos].filter(todo => todo.id !== id);
    setTodos(aftTodos);
    setPersistedTodoList(aftTodos);
  };

  const updateTodo = (id, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }
    let updateTodos = todos.map(todo => {
      if (todo.id === id) {
        todo = newValue;
      }
      return todo;
    });
    setTodos(updateTodos);
    setPersistedTodoList(updateTodos);
  };

  const getItemsCountText = todos => {
    const meta = getMeta(todos);
    let itemCountText = "";
    if (meta.completed.length === 0) {
      itemCountText = "No completed items";
    } else {
      const pluralText = meta.completed.length === 1 ? "item" : "items";
      itemCountText = `${meta.completed.length} completed ${pluralText}`;
    }
    return itemCountText;
  };

  const itemCountText = getItemsCountText(todos);

  return (
    <div
      className='todo-modal'
      style={{
        maxHeight: "60vh",
        overflowY: "scroll",
      }}
    >
      <AddItemInput onSubmit={addTodo} />
      <div
        style={{
          display: "flex",
          position: "absolute",
          top: "12%",
          height: "86%",
          width: "97%",
          background: "#f0f0f088",
          borderRadius: "10px",
        }}
      >
        <span
          style={{
            width: "50%",
            background: "#f0f0f0",
            padding: "1% 1%",
            overflowY: "scroll",
            borderRadius: "10px",
          }}
        >
          <TodoItems
            todos={getMeta(todos).uncompleted}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
            updateTodo={updateTodo}
          />
        </span>
        {/* <hr className='todo-hr' />
      <h1 id='items-completed-header'>{itemCountText}</h1> */}
        <span style={{ width: "50%", padding: "1% 1%", overflowY: "scroll" }}>
          <TodoItems
            todos={getMeta(todos).completed}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
            updateTodo={updateTodo}
          />
        </span>
      </div>
    </div>
  );
}

export default TodoModal;
