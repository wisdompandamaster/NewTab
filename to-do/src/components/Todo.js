import React, { useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import AddItemInput from "./AddItemInput";
import TodoItems from "./TodoItems";

function Todo() {
  const [persistedTodoList, setPersistedTodoList] = useLocalStorage(
    "todoList",
    []
  );
  const [todos, setTodos] = useState(persistedTodoList);

  const getMeta = (todos) => {
    const completed = todos.filter((todo) => todo.isCompleted);
    const uncompleted = todos.filter((todo) => !todo.isCompleted);
    return {
      completed: completed,
      uncompleted: uncompleted,
    };
  };

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

  const completeTodo = (id) => {
    let updateTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isCompleted = !todo.isCompleted;
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
    <div className="todo-app">
      <div id="todo-container">
        {/* <div id='list-container'>

                </div> */}
        <div id="items-container" className="scroll-bar">
          <TodoItems
            todos={getMeta(todos).uncompleted}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
            updateTodo={updateTodo}
          />
          <AddItemInput onSubmit={addTodo} />
          <hr className="todo-hr" />
          <div id="items-completed-header">
            <h1>{itemCountText}</h1>
          </div>
          <TodoItems
            todos={getMeta(todos).completed}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
            updateTodo={updateTodo}
          />
        </div>
      </div>
    </div>
  );
}

export default Todo;
