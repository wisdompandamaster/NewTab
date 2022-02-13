import React from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { getMeta } from "./Todo.js";
import AddItemInput from "./AddItemInput";
import TodoItems from "./TodoItems";

function TodoModal({ todos, setTodos, completeTodo }) {
  const [, setPersistedTodoList] = useLocalStorage("todoList", []);
  const addTodo = (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }
    const newTodos = [...todos, todo];
    setTodos(newTodos);
    setPersistedTodoList(newTodos);
  };

  const removeTodo = (id) => {
    const aftTodos = [...todos].filter((todo) => todo.id !== id);
    setTodos(aftTodos);
    setPersistedTodoList(aftTodos);
  };

  const updateTodo = (id, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }
    let updateTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo = newValue;
      }
      return todo;
    });
    setTodos(updateTodos);
    setPersistedTodoList(updateTodos);
  };

  const getItemsCountText = (todos) => {
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
    <div className="todo-modal">
      <TodoItems
        todos={getMeta(todos).uncompleted}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
      <AddItemInput onSubmit={addTodo} />
      <hr className="todo-hr" />
      <h1 id="items-completed-header">{itemCountText}</h1>
      <TodoItems
        todos={getMeta(todos).completed}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
    </div>
  );
}

export default TodoModal;
